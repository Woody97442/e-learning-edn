import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Banner from "@/components/banner/banner";
import { Separator } from "@/components/ui/separator";
import Badge from "@/components/succes/badge";

export default function QuizzPage() {
  const { formationId, quizzId } = useParams();
  const [formation, setFormation] = useState<Formation | null>(null);
  const [quizz, setQuizz] = useState<Quizz | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);

  useEffect(() => {
    fetch("/data/getFormationList.json")
      .then((res) => res.json())
      .then((data: Formation[]) => {
        const foundFormation = data.find((f) => f.id === Number(formationId));
        setFormation(foundFormation || null);

        if (foundFormation && quizzId) {
          const foundQuizz = foundFormation.quizzes?.find(
            (q) => q.id === Number(quizzId)
          );
          setQuizz(foundQuizz || null);

          if (foundQuizz) {
            // Sélection aléatoire de N questions sans doublons
            const shuffled = [...foundQuizz.questions].sort(
              () => 0.5 - Math.random()
            );
            const chosen = shuffled.slice(
              0,
              Math.min(foundQuizz.numberOfQuestions, shuffled.length)
            );
            setSelectedQuestions(chosen);
          }
        }
      });
  }, [formationId, quizzId]);

  if (!formation || !quizz) return <p className="p-4">Quizz introuvable 🚫</p>;

  const handleSelect = (questionId: number, answerId: number) => {
    setAnswers({ ...answers, [questionId]: answerId });
  };

  const handleSubmit = () => {
    setShowResult(true);
    const score = selectedQuestions.reduce((acc, q) => {
      const selected = answers[q.id];
      if (selected) {
        const answerObj = q.answers.find((a) => a.id === selected);
        if (answerObj?.isCorrect) return acc + 1;
      }
      return acc;
    }, 0);
    const percent = Math.round((score / selectedQuestions.length) * 100);

    // Simuler la mise à jour du profil utilisateur
    console.log({
      formationId: formation.id,
      score: percent,
      passed: percent >= 80,
    });
  };

  const score = selectedQuestions.reduce((acc, q) => {
    const selected = answers[q.id];
    if (selected) {
      const answerObj = q.answers.find((a) => a.id === selected);
      if (answerObj?.isCorrect) return acc + 1;
    }
    return acc;
  }, 0);
  const percent = Math.round((score / selectedQuestions.length) * 100);

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <Banner title={`${quizz.title}`} />

      {!showResult ? (
        <div className="mt-8 space-y-6">
          {selectedQuestions.map((q, index) => (
            <div
              key={q.id}
              className="p-4 ">
              <h2 className="font-semibold mb-2">
                {index + 1}. {q.question}
              </h2>
              <Separator />
              <div className="space-y-2">
                {q.answers.map((a) => (
                  <label
                    key={a.id}
                    className="flex items-center space-x-2 p-1 cursor-pointer ">
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={a.id}
                      checked={answers[q.id] === a.id}
                      onChange={() => handleSelect(q.id, a.id)}
                    />
                    <span>{a.text}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <button
            onClick={handleSubmit}
            disabled={selectedQuestions.some(
              (q) => answers[q.id] === undefined
            )}
            className={`mt-6 px-6 py-2 text-white rounded ${
              selectedQuestions.some((q) => answers[q.id] === undefined)
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500"
            }`}>
            Passer au résultat
          </button>
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          {percent >= 80 ? (
            <div className="mt-4 space-y-4 text-center">
              <p className=" text-xl font-bold">Félicitations</p>
              <Badge
                formationTitle={formation.title}
                score={percent}
              />
              <p>
                Vous avez complété le quiz de la formation{" "}
                <span className="font-bold">{formation.title}</span>. En
                récompense, vous obtenez un Badge.
              </p>
            </div>
          ) : (
            <>
              <div className="text-red-600 text-xl font-bold flex flex-col text-center">
                <span>😔 Désolé, vous n'avez pas atteint 80%.</span>
                <span>Score : {percent}%</span>
              </div>
              <div className="mt-4 space-y-4">
                {selectedQuestions
                  .filter((q) => {
                    const selected = answers[q.id];
                    const answerObj = q.answers.find((a) => a.id === selected);
                    return !answerObj?.isCorrect;
                  })
                  .map((q) => (
                    <div
                      key={q.id}
                      className="p-4 border bg-red-50">
                      <h3 className="font-semibold">{q.question}</h3>
                      <p>
                        Votre réponse :{" "}
                        {q.answers.find((a) => a.id === answers[q.id])?.text}
                      </p>
                      <p>
                        Bonne réponse :{" "}
                        {q.answers.find((a) => a.isCorrect)?.text}
                      </p>
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
