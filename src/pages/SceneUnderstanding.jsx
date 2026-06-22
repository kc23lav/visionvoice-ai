import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function SceneUnderstanding() {

  const [image, setImage] = useState(null);
  const [cameraImage, setCameraImage] = useState(null);
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const videoRef = useRef(null);

 useEffect(() => {
  if (desc) {
    const speech = new SpeechSynthesisUtterance(desc);
    speech.rate = 1;
    window.speechSynthesis.speak(speech);
  }
}, [desc]);

  const startCamera = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true
  });

  videoRef.current.srcObject = stream;
};

  const captureImage = async () => {
  const canvas = document.createElement("canvas");
  const video = videoRef.current;

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  const imageData = canvas.toDataURL("image/png");

  setImage(imageData);

  // convert base64 → file
  const res = await fetch(imageData);
  const blob = await res.blob();

  const formData = new FormData();
  formData.append("image", blob, "capture.png");

  const response = await axios.post(
    "http://127.0.0.1:5000/scene-understanding",
    formData
  );

  setDesc(response.data.description);
};

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);

      const res = await axios.post(
        "http://127.0.0.1:5000/scene-understanding",
        formData
      );

      setDesc(res.data.description);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="space-y-6">

    <h1 className="text-4xl font-bold text-cyan-400">
      👁 Scene Understanding
    </h1>

    {/* Upload */}
    <input
      type="file"
      accept="image/*"
      onChange={handleUpload}
      className="bg-slate-800 p-3 rounded-lg"
    />

    {/* Camera */}
    <div className="space-y-4">

      <button
        onClick={startCamera}
        className="bg-cyan-500 px-4 py-2 rounded-lg font-bold"
      >
        📷 Start Camera
      </button>

      <button
  onClick={captureImage}
  className="bg-green-500 px-4 py-2 rounded-lg font-bold mt-2"
>
  📸 Capture & Analyze
</button>

      <video
        ref={videoRef}
        autoPlay
        className="rounded-xl max-h-[400px]"
      />

    </div>

    {/* Image preview */}
    {image && (
      <img
        src={image}
        alt="Scene Preview"
        className="rounded-xl max-h-[400px]"
      />
    )}

    {/* Description */}
    <div className="bg-slate-800 p-6 rounded-2xl">

      <h2 className="text-2xl font-bold text-cyan-400 mb-3">
        AI Description
      </h2>

      {loading ? (
        <p>Analyzing scene...</p>
      ) : (
        <p className="text-gray-300">
          {desc || "No description yet"}
        </p>
      )}

    </div>

  </div>
);
}