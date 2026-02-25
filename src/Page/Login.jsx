import { useState } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  
const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔹 Spring Security expects form-urlencoded with keys: username, password
    const formData = new URLSearchParams();
    formData.append("username", name);
    formData.append("password", password);

    try {
      const response = await fetch("http://localhost:8081/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
        credentials: "include",
      });

      if (response.ok) {
        navigate("/homepage");
      
        // optional redirect
        // window.location.href = "/home";
      }
    } catch (error) {
      console.error(error);
      
    }
  };

  return (
    <div className="login-card flex font-my-font text-sm">
      <div className="image w-1/2 h-screen bg-[url('./assets/image/login-page.png')] bg-cover bg-center" />

      <form
        className="login w-1/2 flex flex-col items-center justify-center"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-login-header">Login Here</h1>

          {/* Name */}
          <div className="flex flex-col gap-1">
            <label className="font-login-label">Name:</label>
            <input
              type="text"
              className="border rounded-lg w-80 border-gray-300 h-7 px-3 py-3"
              placeholder="Enter your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="font-login-label">Password:</label>
            <input
              type="password"
              className="border rounded-lg w-80 border-gray-300 h-7 px-3 py-3"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="forget">
            Forget password?{" "}
            <a href="http://localhost:5173/signup" className="text-blue-700">
              click here
            </a>
          </div>

          <button
            type="submit"
            className="bg-[#f27d33] text-white px-4 py-2 rounded-lg font-login-label"
          >
            Login
          </button>

          <div className="forget">
            Don't have an account?{" "}
            <a href="http://localhost:5173/signup" className="text-blue-700">
              Signup
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
