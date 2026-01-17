// src/screens/PostureScan.jsx
import React, { useState, useRef, useEffect } from 'react';
import Screen from '../components/Screen';
import { PrimaryButton, HamburgerButton } from '../components/Button';
import { Pose } from '@mediapipe/pose';
import * as cam from '@mediapipe/camera_utils';

const PostureScan = ({ activeScreen, goToScreen, dailyInput, setDailyInput, onCalculateResults }) => {
    const [scanStatus, setScanStatus] = useState('idle'); // idle, scanning, captured, denied
    const [currentScore, setCurrentScore] = useState(0);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const poseRef = useRef(null);
    const cameraRef = useRef(null);
    const scoresRef = useRef([]);
    const isScanningRef = useRef(false);

    useEffect(() => {
        if (activeScreen === 3 && !poseRef.current) {
            const pose = new Pose({
                locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
            });

            pose.setOptions({
                modelComplexity: 1,
                smoothLandmarks: true,
                minDetectionConfidence: 0.5,
                minTrackingConfidence: 0.5
            });

            pose.onResults(onResults);
            poseRef.current = pose;
        }

        return () => {
            if (cameraRef.current) {
                cameraRef.current.stop();
                cameraRef.current = null;
            }
        };
    }, [activeScreen]);

    const onResults = (results) => {
        if (!canvasRef.current || !videoRef.current) return;

        const canvasCtx = canvasRef.current.getContext('2d');
        const h = canvasRef.current.height;
        const w = canvasRef.current.width;

        canvasCtx.save();
        canvasCtx.clearRect(0, 0, w, h);

        // Mirror the canvas to match the video
        canvasCtx.translate(w, 0);
        canvasCtx.scale(-1, 1);

        canvasCtx.drawImage(results.image, 0, 0, w, h);

        if (results.poseLandmarks) {
            const lm = results.poseLandmarks;

            // 11: L_Shoulder, 12: R_Shoulder, 23: L_Hip, 24: R_Hip, 0: Nose
            const lSh = lm[11];
            const rSh = lm[12];
            const lHip = lm[23];
            const rHip = lm[24];
            const nose = lm[0];

            // Calculate Metrics (Same logic as backend)
            const shoulderScore = Math.max(0, 10 - Math.abs(lSh.y - rSh.y) * 50);

            const midShX = (lSh.x + rSh.x) / 2;
            const midShY = (lSh.y + rSh.y) / 2;
            const midHipX = (lHip.x + rHip.x) / 2;
            const spineScore = Math.max(0, 10 - Math.abs(midShX - midHipX) * 50);

            const headHOffset = Math.abs(nose.x - midShX);
            const headVDist = midShY - nose.y;
            const vPenalty = headVDist < 0.15 ? Math.max(0, (0.15 - headVDist) * 40) : 0;
            const headScore = Math.max(0, 10 - (headHOffset * 40 + vPenalty));

            const finalScore = (shoulderScore * 0.3 + spineScore * 0.4 + headScore * 0.3) * 10; // Scale to 0-100

            setCurrentScore(Math.round(finalScore));
            if (isScanningRef.current) {
                scoresRef.current.push(finalScore);
            }

            // Draw Landmarks
            drawLandmarks(canvasCtx, results.poseLandmarks, w, h);
            drawMetricsLines(canvasCtx, lSh, rSh, midShX, midShY, midHipX, (lHip.y + rHip.y) / 2, w, h);
        }
        canvasCtx.restore();
    };

    const drawLandmarks = (ctx, landmarks, w, h) => {
        ctx.fillStyle = "#2463eb";
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        landmarks.forEach(lm => {
            ctx.beginPath();
            ctx.arc(lm.x * w, lm.y * h, 4, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
        });
    };

    const drawMetricsLines = (ctx, lSh, rSh, midShX, midShY, midHipX, midHipY, w, h) => {
        // Shoulder Line (Blue)
        ctx.strokeStyle = "#2463eb";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(lSh.x * w, lSh.y * h);
        ctx.lineTo(rSh.x * w, rSh.y * h);
        ctx.stroke();

        // Spine Line (Red)
        ctx.strokeStyle = "#ef4444";
        ctx.beginPath();
        ctx.moveTo(midShX * w, midShY * h);
        ctx.lineTo(midHipX * w, midHipY * h);
        ctx.stroke();
    };

    const startPostureScan = async () => {
        if (scanStatus === 'scanning' || scanStatus === 'captured') return;

        setScanStatus('scanning');
        scoresRef.current = [];

        try {
            if (!cameraRef.current) {
                cameraRef.current = new cam.Camera(videoRef.current, {
                    onFrame: async () => {
                        await poseRef.current.send({ image: videoRef.current });
                    },
                    width: 640,
                    height: 480
                });
            }
            await cameraRef.current.start();
            isScanningRef.current = true;

            // Run scan for 5 seconds
            setTimeout(() => {
                isScanningRef.current = false;
                const avgScore = scoresRef.current.length > 0
                    ? scoresRef.current.reduce((a, b) => a + b) / scoresRef.current.length
                    : 0;

                const finalResult = Math.round(avgScore);
                setDailyInput(prev => ({ ...prev, postureScore: finalResult }));
                setScanStatus('captured');

                if (cameraRef.current) {
                    cameraRef.current.stop();
                }
            }, 5000);

        } catch (err) {
            console.error(err);
            setScanStatus('denied');
        }
    };

    const skipCamera = () => {
        if (cameraRef.current) cameraRef.current.stop();
        isScanningRef.current = false;
        setDailyInput(prev => ({ ...prev, postureScore: 0 }));
        setScanStatus('skipped');
    };

    const getScanButtonText = () => {
        if (scanStatus === 'scanning') return `🔍 Scanning... (${currentScore}%)`;
        if (scanStatus === 'captured') return `✓ Posture: ${dailyInput.postureScore}%`;
        if (scanStatus === 'skipped') return `✓ Skipped (0%)`;
        if (scanStatus === 'denied') return '❌ Access Denied';
        return 'Start 5s Posture Scan';
    };

    return (
        <Screen screenId={3} activeScreen={activeScreen}>
            <HamburgerButton onClick={() => goToScreen(1)} />
            <h1>Posture Check</h1>
            <p style={{ color: '#666', marginBottom: '15px' }}>
                {scanStatus === 'scanning' ? 'Remain still for 5 seconds' : 'Position yourself in front of camera'}
            </p>

            <div className="posture-preview">
                <div className="posture-image" style={{ position: 'relative', overflow: 'hidden', background: '#000' }}>
                    <video ref={videoRef} style={{ display: 'none' }} playsInline></video>
                    <canvas ref={canvasRef} width="640" height="480"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: scanStatus === 'idle' ? 'none' : 'block'
                        }}>
                    </canvas>
                    {scanStatus === 'idle' && (
                        <div style={{ fontSize: '64px' }}>🧍</div>
                    )}
                </div>

                <button
                    className="scan-btn"
                    onClick={startPostureScan}
                    disabled={scanStatus === 'scanning'}
                    style={{
                        background: scanStatus === 'scanning' ? '#f0f4f8' : (scanStatus === 'captured' ? '#10b981' : '#2463eb'),
                        color: scanStatus === 'scanning' ? '#2463eb' : 'white'
                    }}
                >
                    {getScanButtonText()}
                </button>

                <button className="scan-btn" onClick={skipCamera}
                    style={{ background: 'transparent', color: '#666', border: '1px solid #ddd', marginTop: '10px' }}>
                    Skip (Use 82%)
                </button>
            </div>

            <PrimaryButton onClick={onCalculateResults} disabled={scanStatus === 'scanning'}>
                View Detailed Report
            </PrimaryButton>
        </Screen>
    );
};

export default PostureScan;