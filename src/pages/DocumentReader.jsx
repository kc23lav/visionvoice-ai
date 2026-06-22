import { useState, useEffect } from "react";
import axios from "axios";

export default function DocumentReader() {

  const [image, setImage] = useState(null);
  const [ocrText, setOcrText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  // 🎤 AUTO VOICE OUTPUT
  useEffect(() => {
    if (summary) {
      const speech = new SpeechSynthesisUtterance(
        "Document processed successfully. " + summary
      );

      speech.rate = 1;
      speech.pitch = 1;

      window.speechSynthesis.speak(speech);
    }
  }, [summary]);

  // 📤 IMAGE UPLOAD + OCR + AI
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);

      const res = await axios.post(
        "http://127.0.0.1:5000/extract-text",
        formData
      );

      setOcrText(res.data.ocr_text);
      setSummary(res.data.summary);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* 🌟 HEADER */}
      <h1 className="text-4xl font-bold text-cyan-400">
        📄 Document Reader
      </h1>

      <p className="text-gray-400">
        Upload any document image and VisionVoice AI will read and explain it for you automatically.
      </p>

      {/* 📁 FILE INPUT */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="bg-slate-800 p-3 rounded-lg"
      />

      {/* 🖼 IMAGE PREVIEW */}
      <div className="bg-slate-800 rounded-2xl p-6">

        <h2 className="text-2xl font-bold mb-4">
          Document Preview
        </h2>

        {image && (
          <img
            src={image}
            alt="Preview"
            className="rounded-xl max-h-[400px]"
          />
        )}

      </div>

      {/* 📜 OCR + AI OUTPUT */}
      <div className="bg-slate-800 p-6 rounded-2xl">

        <h2 className="text-xl font-bold mb-2">
          Extracted Text
        </h2>

        <p className="text-gray-300 mb-6">
          {ocrText}
        </p>

        <h2 className="text-2xl font-bold mb-4 text-cyan-400">
          🤖 AI Summary
        </h2>

        {loading ? (
          <p className="text-gray-400">Generating summary...</p>
        ) : (
          <p className="text-gray-300">
            {summary || "No summary available yet."}
          </p>
        )}

      </div>

    </div>
  );
}