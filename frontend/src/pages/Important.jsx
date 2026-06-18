import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import API from "../services/api";

function Important() {

  const [notifications,
    setNotifications] =
    useState([]);

  useEffect(() => {

    fetchNotifications();

  }, []);

  const fetchNotifications =
    async () => {

      try {

        const res =
          await API.get(
            "/notifications"
          );

        const important =
          res.data.filter(
            (item) => {

              const exam =
                item.examName
                  ?.toUpperCase() || "";

              return (
                exam.includes("CGL") ||
                exam.includes("CHSL") ||
                exam.includes("NDA") ||
                exam.includes("CSE") ||
                exam.includes("GROUP 2") ||
                exam.includes("GROUP 4")
              );

            }
          );

        setNotifications(
          important
        );

      } catch (error) {

        console.error(error);

      }

    };

  return (
    <>
      <Navbar />

      <div className="p-8">

        <h1 className="text-3xl font-bold mb-6">
          ⭐ Important Notifications
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

          {notifications.map((item) => (

            <div
              key={item._id}
              className="bg-white shadow rounded p-5"
            >

              <h2 className="font-bold text-lg mb-2">
                {item.examName}
              </h2>

              <p>
                {item.organization}
              </p>

              <Link
                to={`/notification/${item._id}`}
                className="text-blue-600 underline"
              >
                View Details
              </Link>

            </div>

          ))}

        </div>

      </div>
    </>
  );

}

export default Important;