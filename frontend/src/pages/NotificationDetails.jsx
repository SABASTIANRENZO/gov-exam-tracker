import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import API from "../services/api";

function NotificationDetails() {

  const { id } =
    useParams();

  const [notification,
    setNotification] =
    useState(null);

  useEffect(() => {

    fetchNotification();

  }, []);

  const fetchNotification =
    async () => {

      try {

        const res =
          await API.get(
            `/notifications/${id}`
          );

        setNotification(
          res.data
        );

      } catch (error) {

        console.error(error);

      }

    };

  if (!notification) {

    return (
      <div className="p-8">
        Loading...
      </div>
    );

  }

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-4">
        {notification.examName}
      </h1>

      <p>
        <strong>
          Organization:
        </strong>{" "}
        {notification.organization}
      </p>

      <br />

      <a
        href={
          notification.officialLink
        }
        target="_blank"
        rel="noreferrer"
        className="text-blue-600 underline"
      >
        Official Website
      </a>

      <br />
      <br />

      <p>
        <strong>
          Created:
        </strong>{" "}
        {
          notification.createdAt
            ? new Date(
                notification.createdAt
              ).toLocaleString()
            : "N/A"
        }
      </p>

    </div>
  );

}

export default NotificationDetails;