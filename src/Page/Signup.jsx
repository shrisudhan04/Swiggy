import { useState } from "react";
import "../index.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");   // ⭐ NEW

  const [show, setShow] = useState(false); // summa
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8081/signup-api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          role, // ⭐ send role
        }),
      });

      if (response.ok) {
        alert("Signup successful");
      } else {
        alert("Signup failed");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  const showpop=()=>{
    setShow(true);
  }

  const closepop=()=>{
    setShow(false);
  }
  return (
    <div className="login-card flex font-my-font text-sm">
      <div className="image w-1/2 h-screen bg-[url('./assets/image/login-page.png')] bg-cover bg-center" />
      
      <form
        className="login w-1/2 flex flex-col items-center justify-center"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-login-header">Get Started</h1>

          {/* Name */}
          <div className="flex flex-col gap-1">
            <label className="font-login-label">Name:</label>
            <input
              type="text"
              className="border rounded-lg w-80 border-gray-300 h-7 px-3 py-3"
              placeholder="Enter your Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="font-login-label">Email:</label>
            <input
              type="email"
              className="border rounded-lg w-80 border-gray-300 h-7 px-3 py-3"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          {/* ⭐ Role */}
          <div className="flex flex-col gap-1">
            <label className="font-login-label">Role:</label>
            <select
              className="border rounded-lg w-80 border-gray-300 h-10 px-3 text-sm font-grey-500"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select role</option>
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-[#f27d33] text-white px-4 py-2 rounded-lg font-login-label"
            onClick={showpop}
          >
            Sign Up
          </button>

          <div className="login-link">
            Already have an account? <a href="http://localhost:5173/login" className="text-blue-700"> Login Here</a>
            </div>
        </div>
      </form>

        {/* summa */}
        {show && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                <div className="bg-white w-90 h-40 rounded-lg">
                    <br />
                    <h1 className="px-10 mb-2 font-login-header text-2xl text-green-700">Success</h1>
                    <div className="px-10">Signed in successfully!</div>
                    <button className="px-4 py-2 !ml-70 bg-orange-400 !rounded-lg h-10 text-white" onClick={closepop}>OK</button>
                </div>
            </div>
        )}
      
    </div>
  );
}

export default Signup;
