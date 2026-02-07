import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./AxiosInstance";   // ✅ correct path

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/users/login", {
        email,
        password,
      });

      // save auth data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.type);

      // redirect by role
      if (res.data.user.type === "teacher") {
        navigate("/teacher");
      } else if (res.data.user.type === "student") {
        navigate("/student");
      } else {
        navigate("/admin");
      }

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="mb-4 text-center">Login</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="btn btn-dark w-100"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
