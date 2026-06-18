import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Register() {
  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const navigate = useNavigate();

  const handleRegister =
    async (e) => {

      e.preventDefault();

      try {

        await API.post(
          "/users/register",
          {
            name,
            email,
            password,
          }
        );

        alert(
          "Registration Successful"
        );

        navigate("/");

      } catch (error) {

        alert(
          error.response?.data?.message ||
          "Registration Failed"
        );

      }

    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-xl shadow w-96"
      >

        <h1 className="text-3xl font-bold mb-6 text-center">
          Register
        </h1>

        <input
          type="text"
          placeholder="Name"
          className="w-full border p-3 mb-4 rounded"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 mb-4 rounded"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 mb-4 rounded"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="w-full bg-green-500 text-white p-3 rounded"
        >
          Register
        </button>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-blue-500"
          >
            Login
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Register;