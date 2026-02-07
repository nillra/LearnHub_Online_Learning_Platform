import { useState } from "react";
import API from "./AxiosInstance";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    type: "student",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/users/register", form);
      alert("Registration successful");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow">
            <div className="card-body">
              <h4 className="text-center mb-3">Register</h4>

              <form onSubmit={handleSubmit}>
                <input
                  className="form-control mb-3"
                  name="name"
                  placeholder="Name"
                  onChange={handleChange}
                  required
                />

                <input
                  className="form-control mb-3"
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={handleChange}
                  required
                />

                <input
                  className="form-control mb-3"
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                  required
                />

                <select
                  className="form-select mb-3"
                  name="type"
                  onChange={handleChange}
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>

                <button className="btn btn-primary w-100">
                  Register
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
