"use client";

import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function FormationTab() {
  const [formations, setFormations] = useState([
    { title: "Big Data", module: 3, questions: 25, isActive: true },
    { title: "Cybersécurité", module: 2, questions: 12, isActive: true },
    { title: "HTML/CSS", module: 2, questions: 20, isActive: false },
  ]);

  const toggleActive = (index: number) => {
    const newFormations = [...formations];
    newFormations[index].isActive = !newFormations[index].isActive;
    setFormations(newFormations);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead className="edn-degraded text-white text-left">
          <tr>
            <th className="px-4 py-2">Formations</th>
            <th className="px-4 py-2">Modules</th>
            <th className="px-4 py-2">Questions</th>
            <th className="px-4 py-2">Actif</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {formations.map((formation, idx) => (
            <tr
              key={idx}
              className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="px-4 py-2">{formation.title}</td>
              <td className="px-4 py-2">{formation.module}</td>
              <td className="px-4 py-2">{formation.questions}</td>
              <td className="px-4 py-2">
                <label className="inline-flex relative items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={formation.isActive}
                    onChange={() => toggleActive(idx)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-teal-400 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </td>
              <td className="px-4 py-2 text-center space-x-2">
                <FaEdit className="inline cursor-pointer text-blue-500 hover:text-blue-700" />
                <FaTrash className="inline cursor-pointer text-red-500 hover:text-red-700" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
