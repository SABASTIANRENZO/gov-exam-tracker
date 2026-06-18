import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Stats() {

  const [stats, setStats] = useState({
    totalNotifications: 0,
    tnpsc: 0,
    upsc: 0,
    ssc: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {

      const res =
        await API.get("/dashboard");

      setStats(res.data);

    } catch (error) {

      console.error(error);

    }
  };

  return (
    <>
      <Navbar />

      <div className="p-8">

        <h1 className="text-3xl font-bold mb-6">
          Statistics Dashboard
        </h1>

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-white p-5 rounded shadow">
            <h2>Total Notifications</h2>
            <p className="text-3xl font-bold">
              {stats.totalNotifications}
            </p>
          </div>

          <div className="bg-white p-5 rounded shadow">
            <h2>TNPSC</h2>
            <p className="text-3xl font-bold">
              {stats.tnpsc}
            </p>
          </div>

          <div className="bg-white p-5 rounded shadow">
            <h2>UPSC</h2>
            <p className="text-3xl font-bold">
              {stats.upsc}
            </p>
          </div>

          <div className="bg-white p-5 rounded shadow">
            <h2>SSC</h2>
            <p className="text-3xl font-bold">
              {stats.ssc}
            </p>
          </div>

        </div>

      </div>
    </>
  );
}

export default Stats;