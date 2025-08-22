"use client";

import { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function QuestionTab() {
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

  const [editingQuestionIndex, setEditingQuestionIndex] = useState<
    number | null
  >(null);

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
                <td className="px-4 py-2 text-center">{q.answers.length}</td>
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
          <h2 className="text-xl font-bold mb-4">Édition de la question :</h2>

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
  );
}
