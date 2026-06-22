import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";
export default function EmergencySOS() {
  const [alertSent, setAlertSent] = useState(false);
  return (
    <div className="space-y-6">

      <h1 className="text-4xl font-bold text-red-500">
        🚨 Emergency SOS
      </h1>

      <p className="text-gray-400">
        In case of emergency, quickly alert your
        trusted contact and request assistance.
      </p>

      <div className="bg-slate-800 p-6 rounded-2xl">

        <h2 className="text-xl font-bold text-cyan-400 mb-2">
          📍 Current Location
        </h2>

        <MapContainer
  center={[29.4727, 77.7085]}
  zoom={13}
  style={{
    height: "300px",
    width: "100%",
    borderRadius: "15px"
  }}
>

  <TileLayer
    attribution='&copy; OpenStreetMap contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />

  <Marker position={[29.4727, 77.7085]}>
    <Popup>
      Current Location
    </Popup>
  </Marker>

</MapContainer>

      </div>

      <div className="bg-slate-800 p-6 rounded-2xl">

        <h2 className="text-xl font-bold text-cyan-400 mb-2">
          👤 Emergency Contact
        </h2>

        <p className="text-gray-300">
          +91 XXXXX XXXXX
        </p>

      </div>

    <div className="flex justify-center">

  <button
  onClick={() => setAlertSent(true)}
  className="
  w-48
  h-48
  rounded-full
  bg-red-600
  text-white
  text-3xl
  font-bold
  shadow-[0_0_50px_rgba(239,68,68,0.8)]
  hover:scale-110
  transition-all
  duration-300
  "
>
  🚨 SOS
</button>

</div>

{alertSent && (

  <div className="bg-green-600 p-4 rounded-xl text-center">

    ✅ Emergency Alert Sent Successfully

  </div>

)}

    </div>
  );
}