"""
posture.py

Provide a `get_posture_score()` function but avoid importing heavy
dependencies at module import time. The CV and MediaPipe imports are
done lazily inside the function so the module can be imported in
environments without those packages (useful for the API server).
"""

def calculate_posture_metrics(landmarks, mp_pose):
    """
    Calculate individual posture metrics from landmarks.
    
    Args:
        landmarks: MediaPipe Pose landmarks
        mp_pose: MediaPipe pose module
        
    Returns:
        dict: Scores for shoulder, spine, and head.
    """
    # Key Landmarks
    left_shoulder = landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value]
    right_shoulder = landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value]
    left_hip = landmarks[mp_pose.PoseLandmark.LEFT_HIP.value]
    right_hip = landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value]
    nose = landmarks[mp_pose.PoseLandmark.NOSE.value]

    # 1. Shoulder Levelness (Horizontal)
    shoulder_diff = abs(left_shoulder.y - right_shoulder.y)
    shoulder_score = max(0, 10 - shoulder_diff * 50)

    # 2. Spine Alignment (Verticality)
    mid_shoulder_x = (left_shoulder.x + right_shoulder.x) / 2
    mid_shoulder_y = (left_shoulder.y + right_shoulder.y) / 2
    mid_hip_x = (left_hip.x + right_hip.x) / 2
    
    spine_offset = abs(mid_shoulder_x - mid_hip_x)
    spine_score = max(0, 10 - spine_offset * 50)

    # 3. Head Position
    head_h_offset = abs(nose.x - mid_shoulder_x)
    head_v_dist = mid_shoulder_y - nose.y 
    v_penalty = max(0, (0.15 - head_v_dist) * 40) if head_v_dist < 0.15 else 0
    head_score = max(0, 10 - (head_h_offset * 40 + v_penalty))

    return {
        "shoulder_score": shoulder_score,
        "spine_score": spine_score,
        "head_score": head_score,
        "mid_shoulder": (mid_shoulder_x, mid_shoulder_y),
        "mid_hip": (mid_hip_x, (left_hip.y + right_hip.y) / 2)
    }

def compute_final_score(metrics):
    """Weighted average of posture metrics."""
    return (metrics["shoulder_score"] * 0.3) + \
           (metrics["spine_score"] * 0.4) + \
           (metrics["head_score"] * 0.3)

def get_posture_score(duration=10):
    """Compute a posture score (0-10) using webcam and MediaPipe."""
    try:
        import time
        import cv2
        import mediapipe as mp
        import numpy as np
    except Exception as e:
        raise ImportError(f"posture dependencies missing: {e}")

    mp_pose = mp.solutions.pose
    mp_drawing = mp.solutions.drawing_utils

    cap = cv2.VideoCapture(0)
    time.sleep(2)
    pose = mp_pose.Pose(
        min_detection_confidence=0.5, 
        min_tracking_confidence=0.5,
        model_complexity=1
    )
    scores = []
    start_time = time.time()

    while True:
        ret, frame = cap.read()
        if not ret:
            continue

        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = pose.process(frame_rgb)

        if results.pose_landmarks:
            metrics = calculate_posture_metrics(results.pose_landmarks.landmark, mp_pose)
            final_frame_score = compute_final_score(metrics)
            scores.append(final_frame_score)

            # --- Visualizations ---
            h, w, _ = frame.shape
            mp_drawing.draw_landmarks(frame, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)
            
            # Shoulder Alignment Line (Blue)
            left_shoulder = results.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_SHOULDER.value]
            right_shoulder = results.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_SHOULDER.value]
            sh_l_px = (int(left_shoulder.x * w), int(left_shoulder.y * h))
            sh_r_px = (int(right_shoulder.x * w), int(right_shoulder.y * h))
            cv2.line(frame, sh_l_px, sh_r_px, (255, 0, 0), 3) 
            
            # Spine Alignment Line (Red)
            spine_start = (int(metrics["mid_shoulder"][0] * w), int(metrics["mid_shoulder"][1] * h))
            spine_end = (int(metrics["mid_hip"][0] * w), int(metrics["mid_hip"][1] * h))
            cv2.line(frame, spine_start, spine_end, (0, 0, 255), 3)

            cv2.putText(frame, f"Posture Score: {round(final_frame_score, 1)}", (10, 30), 
                        cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)

        cv2.imshow('Posture Detection', frame)
        if (cv2.waitKey(1) & 0xFF == 27) or (time.time() - start_time > duration):
            break

    cap.release()
    cv2.destroyAllWindows()

    return round(np.mean(scores), 2) if scores else 0
