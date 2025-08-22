"use client";

import { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export default function ModuleTab() {
  const [modules, setModules] = useState<Module[]>([
    {
      id: 1,
      title: "Introduction au Big Data",
      position: 1,
      href: "",
      urlIllustration: "",
      content: [{ id: 1, subtitle: "Intro", text: "Contenu initial..." }],
    },
  ]);

  const [editingModuleIndex, setEditingModuleIndex] = useState<number | null>(
    null
  );

  const handleAddModule = () => {
    const nextId = modules.length
      ? Math.max(...modules.map((m) => m.id)) + 1
      : 1;
    const newModule: Module = {
      id: nextId,
      title: "Nouveau module",
      position: modules.length + 1,
      href: "",
      urlIllustration: "",
      content: [{ id: 1, subtitle: "", text: "" }],
    };
    setModules([...modules, newModule]);
    setEditingModuleIndex(modules.length);
  };

  const handleEditModule = (index: number) => {
    setEditingModuleIndex(index);
  };

  const handleChangeModule = (
    field:
      | "title"
      | "href"
      | "urlIllustration"
      | "contentSubtitle"
      | "contentText",
    value: string,
    contentIndex?: number
  ) => {
    if (editingModuleIndex === null) return;

    setModules((prevModules) => {
      const newModules = [...prevModules];
      const current = newModules[editingModuleIndex];

      switch (field) {
        case "title":
          current.title = value;
          break;
        case "href":
          current.href = value;
          break;
        case "urlIllustration":
          current.urlIllustration = value;
          break;
        case "contentSubtitle":
          if (contentIndex !== undefined && current.content) {
            current.content[contentIndex].subtitle = value;
          }
          break;
        case "contentText":
          if (contentIndex !== undefined && current.content) {
            current.content[contentIndex].text = value;
          }
          break;
      }

      return newModules;
    });
  };

  const handleAddContent = () => {
    if (editingModuleIndex === null) return;
    setModules((prevModules) => {
      const newModules = [...prevModules];
      const current = newModules[editingModuleIndex];
      const nextId = current.content
        ? Math.max(...current.content.map((c) => c.id)) + 1
        : 1;
      const newContent: ModuleContent = { id: nextId, subtitle: "", text: "" };
      current.content = current.content
        ? [...current.content, newContent]
        : [newContent];
      return newModules;
    });
  };

  const handleRemoveContent = (contentIndex: number) => {
    if (editingModuleIndex === null) return;
    setModules((prevModules) => {
      const newModules = [...prevModules];
      const current = newModules[editingModuleIndex];
      if (current.content) {
        current.content = current.content.filter(
          (_, idx) => idx !== contentIndex
        );
      }
      return newModules;
    });
  };

  return (
    <div className="flex flex-col gap-4 my-4">
      {/* Liste des modules */}
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-xl font-bold">Liste des Modules :</h2>
        <Button
          variant="edn_hover"
          onClick={handleAddModule}>
          <FaPlus className="inline mr-2" /> Ajouter un module
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead className="edn-degraded text-white text-left">
            <tr>
              <th className="px-4 py-2 text-center">position</th>
              <th className="px-4 py-2 ">Titre</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {modules.map((mod, idx) => (
              <tr
                key={mod.id}
                className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="px-4 py-2 text-center">{mod.position}</td>
                <td className="px-4 py-2">{mod.title}</td>
                <td className="px-4 py-2 text-center space-x-2">
                  <FaEdit
                    className="inline cursor-pointer text-blue-500 hover:text-blue-700"
                    onClick={() => handleEditModule(idx)}
                  />
                  <FaTrash className="inline cursor-pointer text-red-500 hover:text-red-700" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Formulaire et aperçu du module */}
      {editingModuleIndex !== null && (
        <div className="mt-6 p-4 ">
          <h2 className="text-xl font-bold mb-4">
            Édition du module : {modules[editingModuleIndex].title}
          </h2>
          <div className="flex flex-row gap-4 justify-between my-4">
            <div className="grid w-full max-w-sm items-center gap-3">
              <Label>Titre du module</Label>
              <Input
                type="text"
                value={modules[editingModuleIndex].title}
                onChange={(e) => handleChangeModule("title", e.target.value)}
                className="border-none bg-gray-100 rounded-none"
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-3">
              <Label>URL illustration</Label>
              <Input
                type="text"
                value={modules[editingModuleIndex].urlIllustration}
                onChange={(e) =>
                  handleChangeModule("urlIllustration", e.target.value)
                }
                className="border-none bg-gray-100 rounded-none"
              />
            </div>
          </div>

          <div className="grid w-full gap-3 mb-4">
            <Label>Contenus du module</Label>
            {modules[editingModuleIndex].content?.map((item, idx) => (
              <div
                key={item.id}
                className="mb-2 border p-2 grid w-full gap-3 relative">
                <Button
                  variant="ghost"
                  className="absolute top-0 right-0 text-red-500 hover:text-red-700"
                  onClick={() => handleRemoveContent(idx)}>
                  X
                </Button>
                <Label>Sous-titre</Label>
                <Input
                  type="text"
                  value={item.subtitle}
                  onChange={(e) =>
                    handleChangeModule("contentSubtitle", e.target.value, idx)
                  }
                  className="border-none bg-gray-100 rounded-none"
                />
                <Label>Texte</Label>
                <Textarea
                  value={item.text}
                  placeholder="Texte du module..."
                  onChange={(e) =>
                    handleChangeModule("contentText", e.target.value, idx)
                  }
                  className="border-none bg-gray-100 rounded-none"
                />
              </div>
            ))}
            <Button
              variant="edn_hover"
              className="mt-2"
              onClick={handleAddContent}>
              <FaPlus className="inline mr-2" /> Ajouter un contenu
            </Button>
          </div>

          <h2 className="text-xl font-bold mt-4 mb-2">Aperçu :</h2>
          {modules[editingModuleIndex].urlIllustration && (
            <div className="mt-2 mb-4 flex justify-center">
              <iframe
                width="100%"
                height={400}
                src={modules[editingModuleIndex].urlIllustration}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen></iframe>
            </div>
          )}

          <div className="space-y-4">
            {modules[editingModuleIndex].content?.map((item) => (
              <div
                key={item.id}
                className="space-y-2">
                <h3 className="font-semibold">{item.subtitle}</h3>
                <p className="whitespace-pre-line">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
