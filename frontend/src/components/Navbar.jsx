import {
  Link,
  useNavigate
} from "react-router-dom";

function Navbar() {

  const navigate =
    useNavigate();

  const userName =
    localStorage.getItem("name") ||
    "User";

  const logout = () => {

    localStorage.clear();

    navigate("/");

  };

  return (

    <nav className="bg-blue-600 text-white p-4 shadow">

      <div className="flex justify-between items-center">

        <h1 className="text-2xl font-bold">
          Government Exam Tracker
        </h1>

        <div className="flex gap-6 items-center">

          <span className="font-semibold">
            Welcome, {userName}
          </span>

          <Link to="/dashboard">
            Dashboard
          </Link>

          <Link to="/notifications">
            Notifications
          </Link>

          <Link to="/important">
            Important
          </Link>

          <Link to="/profile">
            Preferences
          </Link>

          <Link to="/stats">
            Statistics
          </Link>

          <button
            onClick={logout}
            className="bg-red-500 px-3 py-1 rounded"
          >
            Logout
          </button>

        </div>

      </div>

    </nav>

  );

}

export default Navbar;