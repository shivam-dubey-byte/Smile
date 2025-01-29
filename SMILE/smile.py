from deepface import DeepFace

def get_emotion_score(image_path):
    # Analyze the image for emotions
    analysis = DeepFace.analyze(img_path=image_path, actions=['emotion'])

    # Extract the 'happy' score
    emotion_data = analysis[0]['emotion']

    smile_score = emotion_data['happy']
    return smile_score


image_path = "./Zico_0003.jpg"
emotion_smile_score = get_emotion_score(image_path)
print(f"Smile score from emotion analysis: {emotion_smile_score:.2f}")
