import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import API from "../services/api";

function Notifications() {

  const [notifications,
    setNotifications] =
    useState([]);

  const [search,
    setSearch] =
    useState("");

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

        setNotifications(
          res.data
        );

      } catch (error) {

        console.error(error);

      }

    };

  const filtered =
    notifications.filter(
      (item) =>
        item.examName
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <>
      <Navbar />

      <div className="p-8">

        <h1 className="text-3xl font-bold mb-6">
          All Notifications
        </h1>

        <input
          type="text"
          placeholder="Search Notification..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="border p-3 w-full rounded mb-6"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

          {filtered.map((item) => (

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

export default Notifications;