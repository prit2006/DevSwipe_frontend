import React from 'react'
import NavBar from "./NavBar";
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

function Body() {
  return (

     <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
           <NavBar/>
           <Outlet/>
      </main>
      <Footer />
    </div>
  
 

  )
}

export default Body