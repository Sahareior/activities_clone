// lib/poseDetection.js
import * as posenet from '@tensorflow-models/posenet';

export async function detectPose(imageElement) {
  const net = await posenet.load();
  const pose = await net.estimateSinglePose(imageElement, {
    flipHorizontal: false,
  });
  return pose;
}