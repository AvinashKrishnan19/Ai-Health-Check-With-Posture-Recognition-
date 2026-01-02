CREATE DATABASE ai_health;

USE ai_health;

CREATE TABLE user_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sleep FLOAT,
    activity INT,
    water FLOAT,
    screen FLOAT,
    mood INT,
    bmi FLOAT,
    posture_score INT,
    obesity VARCHAR(10),
    cardio VARCHAR(10),
    hypertension VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
