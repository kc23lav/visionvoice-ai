import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import DocumentReader from "./pages/DocumentReader";
import SceneUnderstanding from "./pages/SceneUnderstanding";
import MedicineDetector from "./pages/MedicineDetector";
import EmergencySOS from "./pages/EmergencySOS";

import { Routes, Route } from "react-router-dom";

import { useEffect } from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import axios from "axios";

import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const handleVoiceCommand = async (audioBlob) => {

  const formData = new FormData();

  formData.append(
    "audio",
    audioBlob,
    "voice.webm"
  );

  try {

    const res = await axios.post(
      "http://127.0.0.1:5000/voice-command",
      formData
    );

    console.log(
      "WHISPER:",
      res.data.text
    );

    const command =
  res.data.text.toLowerCase();

if (command.includes("document")) {

  window.speechSynthesis.speak(
    new SpeechSynthesisUtterance(
      "Opening document reader"
    )
  );

  navigate("/document");
}

if (command.includes("scene")) {

  window.speechSynthesis.speak(
    new SpeechSynthesisUtterance(
      "Opening scene understanding"
    )
  );

  navigate("/scene");
}

if (command.includes("medicine")) {

  window.speechSynthesis.speak(
    new SpeechSynthesisUtterance(
      "Opening medicine detector"
    )
  );

  navigate("/medicine");
}

if (
  command.includes("sos") ||
  command.includes("emergency")
) {

  window.speechSynthesis.speak(
    new SpeechSynthesisUtterance(
      "Opening emergency assistance"
    )
  );

  navigate("/sos");
}

if (
  command.includes("home") ||
  command.includes("dashboard")
) {

  window.speechSynthesis.speak(
    new SpeechSynthesisUtterance(
      "Returning to dashboard"
    )
  );

  navigate("/");
}
  } catch (err) {

    console.log(err);

  }

};

 return (
    <div className="min-h-screen flex flex-col bg-slate-950">

      <Header />

      <div className="flex flex-1">

        <Sidebar />

        <main className="flex-1 p-6 bg-slate-900 text-white">

          <ReactMediaRecorder
  audio
  onStop={(blobUrl, blob) => {

  if (!blob || blob.size < 1000) {
    return;
  }

  handleVoiceCommand(blob);
}}
  render={({ startRecording, stopRecording }) => (
    <div
      className="
      fixed
      bottom-8
      right-8
      z-50
      "
    >

      <button
        onMouseDown={startRecording}
        onMouseUp={stopRecording}
        className="
        w-20
        h-20
        rounded-full
        bg-cyan-500
        text-white
        text-3xl
        shadow-[0_0_40px_rgba(34,211,238,0.8)]
        animate-pulse
        hover:scale-110
        transition
        "
      >
        🎤
      </button>

    </div>
  )}
/>

          <Routes>

            <Route path="/" element={<Dashboard />} />

            <Route
              path="/document"
              element={<DocumentReader />}
            />

            <Route
              path="/scene"
              element={<SceneUnderstanding />}
            />

            <Route
              path="/medicine"
              element={<MedicineDetector />}
            />

            <Route
              path="/sos"
              element={<EmergencySOS />}
            />

          </Routes>

        </main>

      </div>

      <Footer />

    </div>
  );
}

export default App;