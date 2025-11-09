import { useState, useEffect } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";

const EditProfile = ({ user = {} }) => {
  // safely destructure user
  const {
    firstName: initialFirstName = "",
    lastName: initialLastName = "",
    age: initialAge = "",
    gender: initialGender = "",
    about: initialAbout = "",
    photoUrl: initialPhotoUrl = "",
  } = user;

  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);
  const [age, setAge] = useState(initialAge);
  const [gender, setGender] = useState(initialGender);
  const [about, setAbout] = useState(initialAbout);
  const [photoUrl, setPhotoUrl] = useState(initialPhotoUrl);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  // auto-hide toast safely
  useEffect(() => {
    let timer;
    if (showToast) {
      timer = setTimeout(() => setShowToast(false), 3000);
    }
    return () => clearTimeout(timer);
  }, [showToast]);

  const validateInputs = () => {
    if (!firstName.trim() || !lastName.trim())
      return "First name and Last name are required";
    if (!age || isNaN(age) || age <= 0)
      return "Please enter a valid numeric age";
    if (!photoUrl.trim())
      return "Photo URL cannot be empty";
    return "";
  };

  const saveProfile = async () => {
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setError("");
      setLoading(true);
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        { firstName, lastName, photoUrl, age, gender, about },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      dispatch(addUser(res.data));
      setShowToast(true);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center my-10 flex-wrap">
        <div className="flex justify-center items-center mx-6">
          <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  className="input"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  className="input"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Photo URL</legend>
                <input
                  type="text"
                  className="input"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Age</legend>
                <input
                  type="number"
                  className="input"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Gender</legend>
                <details className="dropdown">
                  <summary className="btn m-1">
                    {gender || "Select Gender"}
                  </summary>
                  <ul className="menu dropdown-content bg-base-100 rounded-box z-10 w-52 p-2 shadow-sm">
                    <li>
                      <button type="button" onClick={() => setGender("male")}>
                        Male
                      </button>
                    </li>
                    <li>
                      <button type="button" onClick={() => setGender("female")}>
                        Female
                      </button>
                    </li>
                  </ul>
                </details>
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">About</legend>
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="textarea textarea-md w-full"
                />
              </fieldset>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div className="card-actions justify-center">
                <button
                  className={`btn btn-primary ${loading ? "loading" : ""}`}
                  onClick={saveProfile}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Profile"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
      </div>

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully!</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
