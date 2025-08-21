import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Banner from "@/components/banner/banner";

export default function ModulePage() {
  const { formationId, moduleId } = useParams();
  const [formation, setFormation] = useState<Formation | null>(null);
  const [module, setModule] = useState<Module | null>(null);

  useEffect(() => {
    fetch("/data/getFormationList.json") // fichier dans public/
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

  return (
    <div className="p-10 max-w-4xl mx-auto">
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
    </div>
  );
}
