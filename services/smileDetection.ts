/**
 * Calculates a smile score based on facial landmarks.
 * Using MediaPipe FaceMesh indexing.
 * 
 * Key Landmarks:
 * 0: Upper lip top center
 * 17: Lower lip bottom center
 * 61: Left mouth corner
 * 291: Right mouth corner
 * 13: Upper lip inner center
 * 14: Lower lip inner center
 */

import type { Results } from '@mediapipe/face_mesh';

// Simple Euclidean distance
const distance = (p1: {x: number, y: number}, p2: {x: number, y: number}) => {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
};

export const calculateSmileScore = (landmarks: any[]): number => {
  if (!landmarks || landmarks.length === 0) return 0;

  const leftCorner = landmarks[61];
  const rightCorner = landmarks[291];
  const topLip = landmarks[13];
  const bottomLip = landmarks[14];
  const upperLipTop = landmarks[0];
  const noseTip = landmarks[1]; // Using nose tip as a stable reference anchor

  // 1. Width of mouth
  const mouthWidth = distance(leftCorner, rightCorner);

  // 2. Openness of mouth (for big smiles)
  const mouthOpen = distance(topLip, bottomLip);

  // 3. Upward curvature (corners vs center)
  // We check if corners are higher (lower y value) than the center of the lip relative to the nose
  // Normalized by face size
  const faceWidth = distance(landmarks[234], landmarks[454]); // Face width (ear to ear approx)
  
  if (faceWidth === 0) return 0;

  const normalizedMouthWidth = mouthWidth / faceWidth;
  const normalizedMouthOpen = mouthOpen / faceWidth;

  // Curvature check: Average Y of corners vs Y of upper lip
  const cornersY = (leftCorner.y + rightCorner.y) / 2;
  const centerY = topLip.y;
  
  // In screen coords, Y increases downwards. So if cornersY < centerY, it's a smile (corners are higher).
  const smileCurve = centerY - cornersY; 
  const normalizedCurve = smileCurve / faceWidth;

  // Heuristic Formula
  // A genuine smile typically has width, some openness, and significant upward curve.
  let score = 0;

  // Base score on curve
  if (normalizedCurve > 0.02) {
    score += normalizedCurve * 500; // Weight the curve heavily
  }

  // Bonus for width
  if (normalizedMouthWidth > 0.4) {
    score += (normalizedMouthWidth - 0.4) * 200;
  }

  // Bonus for openness (teeth showing)
  if (normalizedMouthOpen > 0.02 && normalizedMouthOpen < 0.2) {
     score += normalizedMouthOpen * 100;
  }

  // Clamp 0-100
  return Math.min(Math.max(score, 0), 100);
};

export const isGenuineSmile = (score: number): boolean => {
  return score > 65; // Threshold for "Genuine"
};