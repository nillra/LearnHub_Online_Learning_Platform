import { useEffect, useState } from "react";
import API from "../common/AxiosInstance";

function AdminHome() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get("/admin/users")
      .then((res) => setUsers(res.data))
      .catch(() => alert("Unauthorized"));
  }, []);

  return (
    <div className="page">
      <h2>Admin Dashboard</h2>

      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminHome;
