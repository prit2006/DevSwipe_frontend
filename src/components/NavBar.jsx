import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/const';
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const user = useSelector(store => store.user)
  console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

    const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/auth/logout", {}, { withCredentials: true });
      dispatch(removeUser());
     // dispatch(removeFeed());
     navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-3xl">DevSwipe</Link>
      </div>
      <div className="flex gap-2">
{user && (
          <div className="flex items-center gap-4">
            {/* Welcome Message */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-green-400 font-semibold px-4 py-2 rounded-xl shadow-md text-center">
              👋 Welcome, {user.firstname}!
            </div>

            {/* Profile Dropdown */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar hover:bg-gray-700 transition"
              >
                <div className="w-10 rounded-full border border-gray-500">
                  <img alt="User Photo" src={user.photoURL} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-gray-900 text-gray-300 border border-gray-700 rounded-md shadow-lg mt-3 w-52 p-2 right-0 z-50"
              >
                <li>
                  <Link to="/profile" className="justify-between hover:bg-gray-800 rounded-md p-2">
                    Profile <span className="badge badge-success">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/connections" className="justify-between hover:bg-gray-800 rounded-md p-2">
                    Connections <span className="badge badge-error">💗</span>
                  </Link>
                </li>
                <li>
                  <Link to="/requests" className="justify-between hover:bg-gray-800 rounded-md p-2">
                    Requests <span className="badge badge-warning">👁️</span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-400 hover:text-red-300 hover:bg-gray-800 w-full p-2 rounded-md"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}

   {/* {user && (
        <div className="dropdown dropdown-end mx-5 flex items-center ">
          <div className=''>
             <p className='px-4  '>Welcome, {user.firstname}</p>
          </div>
         
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ">

              <div className="w-10 rounded-full">

                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover mt-2"
                />
              </div>

          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
              <Link to="/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li><a>Settings</a></li>
            <li>   <button
                    onClick={handleLogout}
                    className="text-red-400 hover:text-red-300 hover:bg-gray-800 w-full p-2 rounded-md"
                  >
                    Logout
                  </button>
            </li>
          </ul>
        </div>)} */}
      </div>
    </div>
  )
}

export default NavBar