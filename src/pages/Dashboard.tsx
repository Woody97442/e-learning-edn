import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fakeGetUserInfo } from "../scripts/fakeApi";

export default function Dashboard({ token, onLogout }: DashboardProps) {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fakeGetUserInfo(token)
      .then(setUserInfo)
      .catch(() => {
        onLogout();
        navigate("/login");
      });
  }, [token, onLogout, navigate]);

  if (!userInfo) return <p>Chargement...</p>;

  return (
    <div className="p-4 items-center flex flex-col">
      <img
        src="/EDN_logo-CMJN-bleu-vertical.jpg"
        alt="EDN - Ecole Du Numérique"
        className="max-w-xs "
      />
      <span className="text-xs text-center">
        Retrouvez les formations disponibles dans le menu à votre gauche.
      </span>
    </div>
  );
}
