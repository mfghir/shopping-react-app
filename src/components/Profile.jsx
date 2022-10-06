import React from "react";
import { useAuth } from "../provider/AuthProvider";
import "../common/Profile.css";
import {TbUserCircle,TbBuildingStore,TbArrowNarrowRight} from "react-icons/tb";
import { Link } from "react-router-dom";

const Profile = () => {
  const auth = useAuth();

  return (
    <div className="profile-container">
      <h2>
        <TbUserCircle /> Profile
      </h2>

      <ul>
        <li>
          <strong>Name:</strong> <p>{auth.name}</p>
        </li>
        <li>
          <strong>Email:</strong> <p>{auth.email}</p>
        </li>
        <li>
          <strong>Phone:</strong> <p>{auth.phoneNumber}</p>
        </li>
      </ul>

      <Link to="/">
        Back to Shop <TbArrowNarrowRight /> <TbBuildingStore />
      </Link>
    </div>
  );
};

export default Profile;
