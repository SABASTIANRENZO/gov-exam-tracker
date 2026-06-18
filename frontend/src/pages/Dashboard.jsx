import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Dashboard() {

  const [stats, setStats] = useState({
    totalNotifications: 0,
    tnpsc: 0,
    upsc: 0,
    ssc: 0,
  });

  useEffect(() => {

    const fetchDashboard = async () => {

      const res = await axios.get(
        "http://localhost:5000/api/dashboard"
      );

      setStats(res.data);
    };

    fetchDashboard();

  }, []);

  return (
    <><Navbar />
    <div className="p-8">

      <div className="flex justify-between items-center mb-6">

  <h1 className="text-4xl font-bold">
    Government Exam Tracker
  </h1>

  <button
    onClick={() => {
      localStorage.removeItem("token");
      window.location.href = "/";
    }}
    className="bg-red-500 text-white px-4 py-2 rounded"
  >
    Logout
  </button>

</div>

      <div className="grid grid-cols-4 gap-4">

        <div className="border p-4 rounded">
          <h2>Total Notifications</h2>
          <p className="text-2xl font-bold">
            {stats.totalNotifications}
          </p>
        </div>

        <div className="border p-4 rounded">
          <h2>TNPSC</h2>
          <p className="text-2xl font-bold">
            {stats.tnpsc}
          </p>
        </div>

        <div className="border p-4 rounded">
          <h2>UPSC</h2>
          <p className="text-2xl font-bold">
            {stats.upsc}
          </p>
        </div>

        <div className="border p-4 rounded">
          <h2>SSC</h2>
          <p className="text-2xl font-bold">
            {stats.ssc}
          </p>
        </div>

      </div>

    </div>
    </>
  );
}

export default Dashboard;