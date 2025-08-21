import Banner from "@/components/banner/banner";
import Badge from "@/components/succes/badge";
import { fakeGetUserInfo } from "@/scripts/fakeApi";
import { useEffect, useState } from "react";

export default function BadgesPage({ token }: { token: string }) {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     fetch("/api/badges", { credentials: "include" }) // récupère depuis ton backend
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setBadges(data.badges || []);
  //         setLoading(false);
  //       })
  //       .catch(() => setLoading(false));
  //   }, []);

  useEffect(() => {
    async function loadBadges() {
      try {
        const user = await fakeGetUserInfo(token);
        setBadges(user.badges || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadBadges();
  }, [token]);

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="p-6">
      <Banner title="Mes badges" />
      <div className="p-6 flex flex-col items-center">
        {badges.length === 0 ? (
          <p>Aucun badge obtenu pour le moment.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center w-full max-w-3xl">
            {badges.map((badge) => (
              <li
                key={badge.id}
                className="flex justify-center">
                <Badge
                  formationTitle={badge.title}
                  score={badge.score}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
