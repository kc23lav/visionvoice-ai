import { Link } from "react-router-dom";
import {
  FaHome,
  FaFileAlt,
  FaEye,
  FaPills,
  FaExclamationTriangle,
} from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white p-5">

      <div className="mb-10">
        <h2 className="text-xl font-bold text-cyan-400">
          Navigation
        </h2>
      </div>

      <ul className="space-y-5">

        <li>
          <Link
            to="/"
            className="flex items-center gap-3 hover:text-cyan-400"
          >
            <FaHome />
            Dashboard
          </Link>
        </li>

        <li>
          <Link
            to="/document"
            className="flex items-center gap-3 hover:text-cyan-400"
          >
            <FaFileAlt />
            Read Document
          </Link>
        </li>

        <li>
          <Link
            to="/scene"
            className="flex items-center gap-3 hover:text-cyan-400"
          >
            <FaEye />
            Scene Understanding
          </Link>
        </li>

        <li>
          <Link
            to="/medicine"
            className="flex items-center gap-3 hover:text-cyan-400"
          >
            <FaPills />
            Medicine Detector
          </Link>
        </li>

        <li>
          <Link
            to="/sos"
            className="flex items-center gap-3 hover:text-red-400"
          >
            <FaExclamationTriangle />
            Emergency SOS
          </Link>
        </li>

      </ul>

    </aside>
  );
}