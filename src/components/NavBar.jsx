import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

function NavBar() {
  const user = useSelector(store => store.user)
  console.log(user);
  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-3xl">DevSwipe</Link>
      </div>
      <div className="flex gap-2">
        {!user && (
    <Link to="/Login" className="justify-between">
                Login
              </Link>
        )}
   {user && (
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
            <li><a>Logout</a></li>
          </ul>
        </div>)}
      </div>
    </div>
  )
}

export default NavBar