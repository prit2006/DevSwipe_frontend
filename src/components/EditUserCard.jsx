import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/const";
import { removeUserFromFeed } from "../utils/feedSlice";

const EditUserCard = ({ user }) => {
  const dispatch = useDispatch();

  if (!user) return null;

  const {
    _id,
    firstname,
    lastname,
    age,
    gender,
    about,
    photoURL,
    skills = [],
  } = user;

  return (
    <div className="card bg-base-300 w-96 shadow-xl p-4">
      <figure>
        <img
          src={photoURL || "https://via.placeholder.com/300"}
          alt="User"
          className="rounded-xl"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">
          {firstname} {lastname}
        </h2>

        {age && gender && (
          <p className="text-sm text-gray-500">
            {age}, {gender}
          </p>
        )}

        {about && <p>{about}</p>}

        {skills.length > 0 && (
          <div className="mt-2">
            <h3 className="font-semibold mb-1">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-200 text-blue-700 px-2 py-1 rounded-lg text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

      
      </div>
    </div>
  );
};

export default EditUserCard;
