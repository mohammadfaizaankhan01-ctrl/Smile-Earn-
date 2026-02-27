import React, { useEffect, useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera, RefreshCw, Zap, CheckCircle } from 'lucide-react';
// Import as namespace/default to handle potential export structure mismatch from CDN
import * as FaceMeshPkg from '@mediapipe/face_mesh';
import * as cam from '@mediapipe/camera_utils';
import canvasConfetti from 'canvas-confetti';
import { Button } from './ui/Button';
import { calculateSmileScore, isGenuineSmile } from '../services/smileDetection';
import { recordSmile } from '../services/mockBackend';
import { User } from '../types';

// Safe access to FaceMesh class handling default export or named export
const FaceMesh = (FaceMeshPkg as any).FaceMesh || (FaceMeshPkg as any).default?.FaceMesh || (FaceMeshPkg as any).default;

interface SmileCamProps {
  onEarn: (amount: number) => void;
  user: User;
}

export const SmileCam: React.FC<SmileCamProps> = ({ onEarn, user }) => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isProcessing, setIsProcessing] = useState(true);
  const [smileScore, setSmileScore] = useState(0);
  const [lastCaptureTime, setLastCaptureTime] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState("Waiting for face...");

  const processResults = useCallback(async (results: any) => {
    if (!results.multiFaceLandmarks || results.multiFaceLandmarks.length === 0) {
      setFeedback("No face detected");
      setSmileScore(0);
      return;
    }

    const landmarks = results.multiFaceLandmarks[0];
    const score = calculateSmileScore(landmarks);
    setSmileScore(score);

    // Draw mesh
    const canvas = canvasRef.current;
    if (canvas && webcamRef.current?.video) {
        const video = webcamRef.current.video;
        const videoWidth = video.videoWidth;
        const videoHeight = video.videoHeight;

        canvas.width = videoWidth;
        canvas.height = videoHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.save();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = '#22D3EE';
            ctx.lineWidth = 1;
            
            // Draw simplified mesh (lips)
            const lipIndices = [61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291, 308, 324, 318, 402, 317, 14, 87, 178, 88, 95, 78, 191, 80, 81, 82, 13, 312, 311, 310, 415, 308];
            
            ctx.beginPath();
            lipIndices.forEach((index, i) => {
                const point = landmarks[index];
                const x = point.x * videoWidth;
                const y = point.y * videoHeight;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            });
            ctx.closePath();
            ctx.stroke();

            // Dynamic glow based on score
            if (score > 50) {
               ctx.shadowBlur = 20;
               ctx.shadowColor = '#A78BFA';
            }
            ctx.restore();
        }
    }

    // Capture Logic
    const now = Date.now();
    if (isGenuineSmile(score) && now - lastCaptureTime > 3000) {
      setLastCaptureTime(now);
      handleSuccess(score);
    } else if (score > 30) {
        setFeedback("Almost there! Smile bigger!");
    } else {
        setFeedback("Show us a genuine smile");
    }
  }, [lastCaptureTime]);

  const handleSuccess = async (score: number) => {
    setFeedback("Genuine Smile Detected!");
    
    // Confetti
    canvasConfetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#22D3EE', '#A78BFA', '#F472B6']
    });

    // Capture Image
    const imageSrc = webcamRef.current?.getScreenshot();
    
    if (imageSrc) {
       // Mock Backend Call
       const { reward } = await recordSmile(score, imageSrc);
       onEarn(reward);
       setStreak(s => s + 1);
    }
  };

  useEffect(() => {
    if (!FaceMesh) {
      console.error("FaceMesh module not loaded correctly");
      setFeedback("Error loading AI model");
      return;
    }

    const faceMesh = new FaceMesh({
      locateFile: (file: string) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
      },
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    faceMesh.onResults(processResults);

    let camera: any = null;

    if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null) {
      // Handle camera utils safely
      const CameraClass = (cam as any).Camera || (cam as any).default?.Camera;
      
      if (CameraClass && webcamRef.current.video) {
        camera = new CameraClass(webcamRef.current.video, {
          onFrame: async () => {
            if (webcamRef.current?.video) {
              await faceMesh.send({ image: webcamRef.current.video });
            }
          },
          width: 640,
          height: 480,
        });
        camera.start();
      }
    }
    
    // Cleanup function
    return () => {
       // Stop camera if possible or cleanup resources
    };
  }, [processResults]);

  return (
    <div className="pt-24 pb-32 px-4 max-w-4xl mx-auto flex flex-col items-center">
        <div className="w-full mb-8 flex items-center justify-between glass-card p-4 rounded-xl">
             <div className="flex items-center gap-4">
                 <div className={`w-3 h-3 rounded-full ${isProcessing ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                 <span className="text-sm font-medium text-slate-300">AI Detection Active</span>
             </div>
             <div className="flex items-center gap-2 text-cyan-400">
                 <Zap size={18} fill="currentColor" />
                 <span className="font-bold">{streak} Smile Streak</span>
             </div>
        </div>

        <div className="relative w-full max-w-2xl aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black">
            <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                className="absolute inset-0 w-full h-full object-cover mirror"
                style={{ transform: "scaleX(-1)" }} 
            />
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                style={{ transform: "scaleX(-1)" }} 
            />
            
            {/* UI Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-end justify-between">
                    <div>
                        <div className="text-sm text-slate-300 mb-1">Confidence</div>
                        <div className="w-48 h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-200"
                                style={{ width: `${smileScore}%` }}
                            ></div>
                        </div>
                    </div>
                    <div className="text-right">
                         <h2 className="text-2xl font-bold text-white mb-1">
                             {feedback}
                         </h2>
                         {smileScore > 65 && (
                             <div className="inline-flex items-center gap-1 text-green-400 text-sm">
                                 <CheckCircle size={14} /> Recording
                             </div>
                         )}
                    </div>
                </div>
            </div>
        </div>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            <div className="glass-card p-4 rounded-xl text-center">
                 <div className="text-xs text-slate-400 uppercase">Session Earned</div>
                 <div className="text-xl font-bold text-green-400">{(streak * 0.01).toFixed(2)} USDC</div>
            </div>
            <div className="glass-card p-4 rounded-xl text-center">
                 <div className="text-xs text-slate-400 uppercase">Quality Score</div>
                 <div className="text-xl font-bold text-purple-400">{Math.round(smileScore)}%</div>
            </div>
             <div className="glass-card p-4 rounded-xl text-center md:col-span-2">
                 <div className="text-xs text-slate-400 uppercase">Status</div>
                 <div className="text-sm font-medium text-white flex items-center justify-center gap-2 h-7">
                     {smileScore > 65 ? "Mining Rewards..." : "Adjusting..."}
                 </div>
            </div>
        </div>
    </div>
  );
};