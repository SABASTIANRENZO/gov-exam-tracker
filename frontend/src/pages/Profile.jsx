import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

function Profile() {

  const [preferences, setPreferences] =
    useState([]);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await API.get(
            "/users/profile",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setPreferences(
          res.data.preferences || []
        );

      } catch (error) {

        console.error(error);

      }

    };

  const handleChange =
    (value) => {

      if (
        preferences.includes(value)
      ) {

        setPreferences(
          preferences.filter(
            (item) =>
              item !== value
          )
        );

      } else {

        setPreferences([
          ...preferences,
          value,
        ]);

      }

    };

  const savePreferences =
    async () => {

      try {

        console.log(
          "Selected Preferences:",
          preferences
        );

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await API.put(
            "/users/preferences",
            {
              preferences,
            },
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        console.log(
          res.data
        );

        alert(
          "Preferences Saved Successfully"
        );

      } catch (error) {

        console.error(error);

        alert(
          error.response?.data
            ?.message ||
          "Failed to Save Preferences"
        );

      }

    };

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        My Preferences
      </h1>

      <div className="space-y-3">

        <h2 className="text-xl font-bold">
          TNPSC Exams
        </h2>

        <label>
          <input
            type="checkbox"
            checked={preferences.includes("GROUP 1")}
            onChange={() =>
              handleChange("GROUP 1")
            }
          />
          {" "}TNPSC Group 1
        </label>

        <br />

        <label>
          <input
            type="checkbox"
            checked={preferences.includes("GROUP 2")}
            onChange={() =>
              handleChange("GROUP 2")
            }
          />
          {" "}TNPSC Group 2
        </label>

        <br />

        <label>
          <input
            type="checkbox"
            checked={preferences.includes("GROUP 2A")}
            onChange={() =>
              handleChange("GROUP 2A")
            }
          />
          {" "}TNPSC Group 2A
        </label>

        <br />

        <label>
          <input
            type="checkbox"
            checked={preferences.includes("GROUP 4")}
            onChange={() =>
              handleChange("GROUP 4")
            }
          />
          {" "}TNPSC Group 4
        </label>

        <br />

        <label>
          <input
            type="checkbox"
            checked={preferences.includes("VAO")}
            onChange={() =>
              handleChange("VAO")
            }
          />
          {" "}TNPSC VAO
        </label>

        <br /><br />

        <h2 className="text-xl font-bold">
          SSC Exams
        </h2>

        <label>
          <input
            type="checkbox"
            checked={preferences.includes("CGL")}
            onChange={() =>
              handleChange("CGL")
            }
          />
          {" "}SSC CGL
        </label>

        <br />

        <label>
          <input
            type="checkbox"
            checked={preferences.includes("CHSL")}
            onChange={() =>
              handleChange("CHSL")
            }
          />
          {" "}SSC CHSL
        </label>

        <br />

        <label>
          <input
            type="checkbox"
            checked={preferences.includes("MTS")}
            onChange={() =>
              handleChange("MTS")
            }
          />
          {" "}SSC MTS
        </label>

        <br />

        <label>
          <input
            type="checkbox"
            checked={preferences.includes("GD")}
            onChange={() =>
              handleChange("GD")
            }
          />
          {" "}SSC GD
        </label>

        <br />

        <label>
          <input
            type="checkbox"
            checked={preferences.includes("CPO")}
            onChange={() =>
              handleChange("CPO")
            }
          />
          {" "}SSC CPO
        </label>

        <br />

        <label>
          <input
            type="checkbox"
            checked={preferences.includes("JE")}
            onChange={() =>
              handleChange("JE")
            }
          />
          {" "}SSC JE
        </label>

        <br /><br />

        <h2 className="text-xl font-bold">
          UPSC Exams
        </h2>

        <label>
          <input
            type="checkbox"
            checked={preferences.includes("CSE")}
            onChange={() =>
              handleChange("CSE")
            }
          />
          {" "}UPSC CSE
        </label>

        <br />

        <label>
          <input
            type="checkbox"
            checked={preferences.includes("NDA")}
            onChange={() =>
              handleChange("NDA")
            }
          />
          {" "}UPSC NDA
        </label>

        <br />

        <label>
          <input
            type="checkbox"
            checked={preferences.includes("CDS")}
            onChange={() =>
              handleChange("CDS")
            }
          />
          {" "}UPSC CDS
        </label>

        <br />

        <label>
          <input
            type="checkbox"
            checked={preferences.includes("CAPF")}
            onChange={() =>
              handleChange("CAPF")
            }
          />
          {" "}UPSC CAPF
        </label>

        <br />

        <label>
          <input
            type="checkbox"
            checked={preferences.includes("IES")}
            onChange={() =>
              handleChange("IES")
            }
          />
          {" "}UPSC IES
        </label>

        <br />

        <label>
          <input
            type="checkbox"
            checked={preferences.includes("CMS")}
            onChange={() =>
              handleChange("CMS")
            }
          />
          {" "}UPSC CMS
        </label>

      </div>

      <br />

      <button
        onClick={savePreferences}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save Preferences
      </button>

    </div>
  );
}

export default Profile;