export default function UserTab() {
  const users = [
    {
      email: "julie.martin@example.com",
      formation: "Formation 1",
      score: "50%",
      badge: "",
      status: "fail",
    },
    {
      email: "contact.formaweb@example.org",
      formation: "Cybersécurité",
      score: "87%",
      badge: "Cybersécurité",
      status: "success",
    },
    {
      email: "leo.dupuis@example.net",
      formation: "Big Data",
      score: "74%",
      badge: "Big Data",
      status: "success",
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead className="edn-degraded text-white text-left">
          <tr>
            <th className="px-4 py-2">Utilisateurs</th>
            <th className="px-4 py-2">Formations</th>
            <th className="px-4 py-2">Scores</th>
            <th className="px-4 py-2">Badges</th>
            <th className="px-4 py-2">Échec en condition</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {users.map((user, idx) => (
            <tr
              key={idx}
              className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.formation}</td>
              <td className="px-4 py-2">{user.score}</td>
              <td className="px-4 py-2">{user.badge}</td>
              <td className="px-4 py-2 text-center">
                {user.status === "success" ? (
                  <span className="text-green-500 text-xl">✔️</span>
                ) : (
                  <span className="text-red-500 text-xl">❌</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
