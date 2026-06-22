from flask import Flask, request, jsonify
from flask_cors import CORS
import easyocr
import os
from dotenv import load_dotenv
from google import genai
from PIL import Image
import whisper

load_dotenv()

app = Flask(__name__)
CORS(app)

reader = easyocr.Reader(['en'])

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

whisper_model = whisper.load_model("tiny")

@app.route("/")
def home():
    return {"message": "VisionVoice AI Backend Running 🚀"}

@app.route("/health")
def health():
    return {"status": "healthy"}

@app.route("/extract-text", methods=["POST"])
def extract_text():

    file = request.files["image"]

    file_path = "temp.jpg"
    file.save(file_path)

    results = reader.readtext(
        file_path,
        detail=0,
        paragraph=True
    )

    text = " ".join(results)
    cleaned_text = " ".join(text.split())

    prompt = f"""
You are an accessibility assistant for visually impaired users.

Explain the OCR text in simple language.

Rules:
- Do not use markdown.
- Do not use ** symbols.
- Use plain English.
- Keep the response under 4 sentences.

OCR Text:
{cleaned_text}
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    summary = response.text

    return jsonify({
        "ocr_text": cleaned_text,
        "summary": summary
    })

@app.route("/scene-understanding", methods=["POST"])
def scene_understanding():

    file = request.files["image"]

    file_path = "scene.jpg"
    file.save(file_path)

    prompt = """
    You are an AI assistant for visually impaired users.
    Describe what you see in this image in simple, short sentences.
    Focus on important objects, people, and safety-related details.
    """

    image = Image.open(file_path)

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[
            prompt,
            image
        ]
    )

    return jsonify({
        "description": response.text
    })

@app.route("/medicine-detector", methods=["POST"])
def medicine_detector():

    file = request.files["image"]

    file_path = "medicine.jpg"
    file.save(file_path)

    results = reader.readtext(
        file_path,
        detail=0,
        paragraph=True
    )

    text = " ".join(results)

    prompt = f"""
You are a medicine assistant for visually impaired users.

Identify the medicine from the text below.

Explain:
- Medicine name
- Purpose
- Important warnings

Keep it simple and easy to understand.

Medicine Text:
{text}
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    return jsonify({
        "medicine_info": response.text
    })

@app.route("/voice-command", methods=["POST"])
def voice_command():

    audio = request.files["audio"]

    audio_path = "voice.webm"
    audio.save(audio_path)

    result = whisper_model.transcribe(audio_path)

    return jsonify({
        "text": result["text"]
    })

if __name__ == "__main__":
    app.run(debug=True)