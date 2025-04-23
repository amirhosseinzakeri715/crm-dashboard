export default function UserTable({ users }) {
  const users = [
      { name: "Ali Rezaei", email: "ali@example.com", joined: "2025-04-15" },
      { name: "Sara Mohammadi", email: "sara@example.com", joined: "2025-04-14" },
      { name: "Reza Ahmadi", email: "reza@example.com", joined: "2025-04-13" },
    ];
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Latest Users</h3>
      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-600 dark:text-gray-300 text-sm border-b border-gray-200 dark:border-gray-700">
            <th className="py-2">Name</th>
            <th>Email</th>
            <th>Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="text-gray-700 dark:text-gray-200 text-sm border-b border-gray-100 dark:border-gray-700">
              <td className="py-2">{user.name}</td>
              <td>{user.email}</td>
              <td>{user.joined}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}