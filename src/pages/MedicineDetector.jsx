import { useState, useEffect } from "react";
import axios from "axios";
export default function MedicineDetector() {

  
  const [image, setImage] = useState(null);
  const [medicineInfo, setMedicineInfo] = useState("");
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {

  window.speechSynthesis.cancel();

  const speech =
    new SpeechSynthesisUtterance(
      "Medicine detector opened. Upload a medicine image and I will identify it for you."
    );

  window.speechSynthesis.speak(speech);

}, []);
  
  useEffect(() => {

  if (!medicineInfo) return;

  window.speechSynthesis.cancel();

  const speech = new SpeechSynthesisUtterance(
    medicineInfo
  );

  speech.rate = 1;

  window.speechSynthesis.speak(speech);

}, [medicineInfo]);
  
  const handleMedicineUpload = async (e) => {

  const file = e.target.files[0];

  if (!file) return;

  setImage(URL.createObjectURL(file));

  window.speechSynthesis.cancel();

window.speechSynthesis.speak(
  new SpeechSynthesisUtterance(
    "Medicine image uploaded successfully. Analyzing medicine."
  )
);

  const formData = new FormData();
  formData.append("image", file);

  try {

    setLoading(true);

    const res = await axios.post(
      "http://127.0.0.1:5000/medicine-detector",
      formData
    );

    setMedicineInfo(res.data.medicine_info);

  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="space-y-6">

      <h1 className="text-4xl font-bold text-cyan-400">
        💊 Medicine Detector
      </h1>

      <p className="text-gray-400">
        Upload a medicine image to identify its name,
        purpose and important warnings.
      </p>

      <div className="bg-slate-800 p-6 rounded-2xl">

        <input
  type="file"
  accept="image/*"
  onChange={handleMedicineUpload}
  className="bg-slate-700 p-3 rounded-lg"
/>

{image && (
  <img
    src={image}
    alt="medicine"
    className="mt-4 rounded-xl max-h-[300px]"
  />
)}
      </div>

      <div className="bg-slate-800 p-6 rounded-2xl">

        <h2 className="text-2xl font-bold text-cyan-400 mb-4">
          Medicine Information
        </h2>

        {loading ? (
  <p className="text-cyan-400 font-semibold animate-pulse">
    🔍 Analyzing Medicine...
  </p>
) : (
  <div className="bg-slate-700 p-4 rounded-xl">

  <h3 className="text-cyan-400 font-bold mb-3">
    🤖 AI Assistant
  </h3>

  <p className="text-gray-300 whitespace-pre-line">
    {medicineInfo || "Upload a medicine image to begin analysis."}
  </p>

</div>
)}

      </div>

    </div>
  );
}