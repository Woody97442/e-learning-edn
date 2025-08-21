import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Banner from "@/components/banner/banner";

export default function ModulePage() {
  const { formationId, moduleId } = useParams();
  const navigate = useNavigate();
  const [formation, setFormation] = useState<Formation | null>(null);
  const [module, setModule] = useState<Module | null>(null);

  useEffect(() => {
    fetch("/data/getFormationList.json")
      .then((res) => res.json())
      .then((data: Formation[]) => {
        const foundFormation = data.find((f) => f.id === Number(formationId));
        setFormation(foundFormation || null);

        if (foundFormation) {
          const foundModule = foundFormation.modules.find(
            (m) => m.id === Number(moduleId)
          );
          setModule(foundModule || null);
        }
      });
  }, [formationId, moduleId]);

  if (!formation || !module) {
    return <p className="p-4">Module introuvable 🚫</p>;
  }

  // Gestion du module suivant ou du quizz
  const currentIndex = formation.modules.findIndex((m) => m.id === module.id);
  const isLastModule = currentIndex === formation.modules.length - 1;

  const handleNext = () => {
    if (!isLastModule) {
      const nextModule = formation.modules[currentIndex + 1];
      navigate(`/formation/${formation.id}/module/${nextModule.id}`);
    } else {
      // Redirige vers le premier quizz si présent
      if (formation.quizzes && formation.quizzes.length > 0) {
        navigate(`/formation/${formation.id}/quizz/${formation.quizzes[0].id}`);
      }
    }
  };

  return (
    <div className="p-10 max-w-4xl mx-auto relative">
      <Banner title={`${formation.title} - ${module.title}`} />

      {/* Vidéo */}
      {module.urlIllustration && (
        <div className="mt-6 flex justify-center">
          <iframe
            width="100%"
            height="400"
            src={module.urlIllustration}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen></iframe>
        </div>
      )}

      {/* Contenu du module */}
      {module.content && module.content.length > 0 && (
        <div className="mt-8 space-y-6">
          {module.content.map((item) => (
            <div key={item.id}>
              <h2 className="text-xl font-semibold mb-2">{item.subtitle}</h2>
              <p className="text-gray-700 whitespace-pre-line">{item.text}</p>
            </div>
          ))}
        </div>
      )}

      {/* Bouton suivant */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
          {isLastModule
            ? formation.quizzes && formation.quizzes.length > 0
              ? "Passer au Quizz"
              : "Fin de la formation"
            : "Module suivant"}
        </button>
      </div>
    </div>
  );
}
