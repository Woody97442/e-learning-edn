import Banner from "@/components/banner/banner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";

export default function AdminCreateFormation() {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      question: "Exemple de question ?",
      answers: [
        { id: 1, text: "Réponse 1", isCorrect: false },
        { id: 2, text: "Réponse 2", isCorrect: true },
      ],
    },
  ]);

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

  const [editingQuestionIndex, setEditingQuestionIndex] = useState<
    number | null
  >(null);

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

  const handleAddQuestion = () => {
    const nextId = questions.length
      ? Math.max(...questions.map((q) => q.id)) + 1
      : 1;
    const newQuestion: Question = {
      id: nextId,
      question: "",
      answers: [{ id: 1, text: "", isCorrect: false }],
    };
    setQuestions([...questions, newQuestion]);
    setEditingQuestionIndex(questions.length);
  };

  const handleEditQuestion = (index: number) => {
    setEditingQuestionIndex(index);
  };

  const handleChangeQuestion = (value: string) => {
    if (editingQuestionIndex === null) return;
    setQuestions((prev) => {
      const newQ = [...prev];
      newQ[editingQuestionIndex].question = value;
      return newQ;
    });
  };

  const handleAddAnswer = () => {
    if (editingQuestionIndex === null) return;
    setQuestions((prev) => {
      const newQ = [...prev];
      const current = newQ[editingQuestionIndex];
      const nextId = current.answers.length
        ? Math.max(...current.answers.map((a) => a.id)) + 1
        : 1;
      current.answers.push({ id: nextId, text: "", isCorrect: false });
      return newQ;
    });
  };

  const handleChangeAnswer = (text: string, answerIndex: number) => {
    if (editingQuestionIndex === null) return;
    setQuestions((prev) => {
      const newQ = [...prev];
      newQ[editingQuestionIndex].answers[answerIndex].text = text;
      return newQ;
    });
  };

  const handleSetCorrectAnswer = (answerIndex: number) => {
    if (editingQuestionIndex === null) return;
    setQuestions((prev) => {
      const newQ = [...prev];
      newQ[editingQuestionIndex].answers = newQ[
        editingQuestionIndex
      ].answers.map((a, idx) => ({ ...a, isCorrect: idx === answerIndex }));
      return newQ;
    });
  };

  const handleRemoveAnswer = (answerIndex: number) => {
    if (editingQuestionIndex === null) return;
    setQuestions((prev) => {
      const newQ = [...prev];
      newQ[editingQuestionIndex].answers = newQ[
        editingQuestionIndex
      ].answers.filter((_, idx) => idx !== answerIndex);
      return newQ;
    });
  };

  const handleRemoveQuestion = (questionIndex: number) => {
    setQuestions((prev) => prev.filter((_, idx) => idx !== questionIndex));
    if (editingQuestionIndex === questionIndex) setEditingQuestionIndex(null);
  };

  return (
    <div className="p-6">
      <Banner title="Création ou modification de formation" />
      <div className="flex flex-col gap-6 m-4">
        <p className="my-2 text-xs">
          Bienvenue sur la page de création et de modification de formation !
          <br />
          Ici, vous pouvez concevoir une nouvelle formation ou mettre à jour une
          formation existante, ajouter autant de modules de cours que
          nécessaire, et associer à chaque formation un quiz pour évaluer les
          apprenants.{" "}
        </p>
        <h2 className="text-xl font-bold">Information de la formation :</h2>
        <div className="flex flex-row gap-4 justify-between">
          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="formationTitle">Nom de la formation</Label>
            <Input
              id="formationTitle"
              type="text"
              placeholder="La cybersécurité"
              className="border-none bg-gray-100 rounded-none"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="formationDescription">Description courte</Label>
            <Input
              id="formationDescription"
              type="text"
              placeholder="Sensibilisation aux attaques de phishing et autres dans la cybersécurité."
              className="border-none bg-gray-100 rounded-none"
            />
          </div>
        </div>
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
                    onChange={(e) =>
                      handleChangeModule("title", e.target.value)
                    }
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
                        handleChangeModule(
                          "contentSubtitle",
                          e.target.value,
                          idx
                        )
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
        <div className="flex flex-col gap-4 my-4">
          {/* Liste des questions */}
          <div className="flex flex-row items-center justify-between">
            <h2 className="text-xl font-bold">Liste des questions :</h2>
            <Button
              variant="edn_hover"
              onClick={handleAddQuestion}>
              <FaPlus className="inline mr-2" /> Ajouter une question
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-200">
              <thead className="edn-degraded text-white text-left">
                <tr>
                  <th className="px-4 py-2 text-center">Question</th>
                  <th className="px-4 py-2 text-center">Nb réponses</th>
                  <th className="px-4 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {questions.map((q, idx) => (
                  <tr
                    key={q.id}
                    className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-4 py-2">
                      {q.question || "Nouvelle question"}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {q.answers.length}
                    </td>
                    <td className="px-4 py-2 text-center space-x-2">
                      <FaEdit
                        className="inline cursor-pointer text-blue-500 hover:text-blue-700"
                        onClick={() => handleEditQuestion(idx)}
                      />
                      <FaTrash
                        className="inline cursor-pointer text-red-500 hover:text-red-700"
                        onClick={() => handleRemoveQuestion(idx)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Formulaire de la question et ses réponses */}
          {editingQuestionIndex !== null && (
            <div className="mt-6 p-4">
              <h2 className="text-xl font-bold mb-4">
                Édition de la question :
              </h2>

              <div className="mb-4">
                <Input
                  type="text"
                  value={questions[editingQuestionIndex].question}
                  onChange={(e) => handleChangeQuestion(e.target.value)}
                  placeholder="Texte de la question..."
                  className="border-none bg-gray-100 rounded-none w-full"
                />
              </div>

              <div className="flex flex-row items-center justify-between mb-2">
                <h3 className="font-semibold">Réponses :</h3>
                <Button
                  variant="edn_hover"
                  onClick={handleAddAnswer}>
                  <FaPlus className="inline mr-2" /> Ajouter une réponse
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-200">
                  <thead className="edn-degraded text-white text-left">
                    <tr>
                      <th className="px-4 py-2 text-center">Réponse</th>
                      <th className="px-4 py-2 text-center">Correct</th>
                      <th className="px-4 py-2 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {questions[editingQuestionIndex].answers.map((a, idx) => (
                      <tr
                        key={a.id}
                        className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-4 py-2">
                          <Input
                            type="text"
                            value={a.text}
                            onChange={(e) =>
                              handleChangeAnswer(e.target.value, idx)
                            }
                            className="border-none bg-gray-100 rounded-none w-full"
                          />
                        </td>
                        <td className="px-4 py-2 text-center">
                          <input
                            type="radio"
                            name={`correct-${questions[editingQuestionIndex].id}`}
                            checked={a.isCorrect}
                            onChange={() => handleSetCorrectAnswer(idx)}
                          />
                        </td>
                        <td className="px-4 py-2 text-center">
                          <FaTrash
                            className="inline cursor-pointer text-red-500 hover:text-red-700"
                            onClick={() => handleRemoveAnswer(idx)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
