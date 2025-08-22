import Banner from "@/components/banner/banner";
import UserTab from "@/components/tab/user-tab";

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <Banner title="Tableau de bord" />
      <div className="flex flex-col gap-4 my-4">
        <h1 className="text-xl font-bold">
          Liste des formations des utilisateurs
        </h1>
        <UserTab />
      </div>
    </div>
  );
}
