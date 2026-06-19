import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Dashboard() {

  const [stats, setStats] = useState({
    totalNotifications: 0,
    tnpsc: 0,
    upsc: 0,
    ssc: 0,
  });

  useEffect(() => {

  const fetchDashboard = async () => {

    try {

      const res =
        await API.get(
          "/dashboard"
        );

      setStats(res.data);

    } catch (error) {

      console.error(error);

    }

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