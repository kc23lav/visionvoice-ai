import { FaMicrophone } from "react-icons/fa";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
export default function Dashboard() {

  const navigate = useNavigate();

  const cards = [
  {
    title: "Read Document",
    icon: "📄",
    desc: "Convert documents into speech",
    route: "/document"
  },
  {
    title: "Scene Understanding",
    icon: "👁",
    desc: "Describe surroundings",
    route: "/scene"
  },
  {
    title: "Medicine Detector",
    icon: "💊",
    desc: "Identify medicines",
    route: "/medicine"
  },
  {
    title: "Emergency SOS",
    icon: "🚨",
    desc: "Emergency assistance",
    route: "/sos"
  }
];

  return (
    <div>

      {/* Hero Section */}

      <div className="mb-10">

        <div className="bg-slate-800 rounded-3xl p-10 shadow-xl">
  <div className="flex justify-center mb-6">

  <div
  className="
  w-24
  h-24
  rounded-full
  bg-cyan-500
  flex
  items-center
  justify-center
  shadow-[0_0_40px_rgba(34,211,238,0.8)]
  "
>

    <FaMicrophone
      className="text-4xl text-white"
    />

  </div>

</div>

          <h1 className="text-5xl font-bold mb-4 text-cyan-400">
            🎤 VisionVoice AI
          </h1>

         <p className="text-xl text-gray-300 mb-2 uppercase tracking-wider">
  A Voice-First Accessibility Assistant
</p>

<p className="text-xl text-gray-300 mb-8 uppercase tracking-wider">
  For Visually Impaired Users
</p>

<h2 className="text-4xl font-bold text-white mb-6">
  SEE THE WORLD THROUGH VOICE 🎤
</h2>

          <p className="text-gray-300 mb-6">
            VisionVoice AI combines document reading,
scene understanding, medicine identification,
and emergency assistance into a single
voice-powered accessibility platform.
          </p>

          <button
  className="bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-xl font-bold text-lg"
>
  🎤 Voice Assistant Active
</button>

        </div>

      </div>

      {/* Feature Cards */}

      <div className="grid grid-cols-2 gap-6">

        {cards.map((card, index) => (

          <div
  key={index}
  onClick={() => {
  console.log("clicked", card.route);
  navigate(card.route);
}}
  className="
bg-slate-800
border
border-cyan-500/30
p-6
rounded-2xl
cursor-pointer
transition-all
duration-300
hover:scale-105
hover:border-cyan-400
hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]
hover:-translate-y-2
"
>

            <div className="text-6xl mb-4 animate-pulse">
              {card.icon}
            </div>

            <h2 className="text-2xl font-bold">
              {card.title}
            </h2>

            <p className="mt-2 text-gray-400">
              {card.desc}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}