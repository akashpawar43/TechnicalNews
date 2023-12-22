import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleNavbar = () => {
    setShowNavbar(!showNavbar)
  }


  const Menus = [
    { title: "Home", link: "/" },
    { title: "Business", link: "/business" },
    { title: "Entertainment", link: "/entertainment" },
    { title: "Health", link: "/health" },
    { title: "Science", link: "/science" },
    { title: "Sports", link: "/sports" },
    { title: "Technology", link: "/technology" },
  ];
  return (
    <nav className="w-full bg-black border-b border-gray-500 z-50 top-0 sticky">
      <div className='container mx-auto flex flex-col md:flex-row p-4 justify-between'>
        <div className='flex justify-between'>
          <div className="text-white text-xl p-1">
            Technical<p className=' inline-block p-1 text-center bg-red-600 rounded-md ml-1'>15</p>
          </div>
          <button className='flex flex-col md:hidden sm:flex border-2 border-black hover:border-red-600 rounded-base m-2 ' onClick={handleNavbar}>
            <div className='w-7 h-0.5 m-1 bg-white'></div>
            <div className='w-7 h-0.5 m-1 bg-white'></div>
            <div className='w-7 h-0.5 m-1 bg-white'></div>
          </button>
        </div>
        <ul className={`flex-col md:flex md:flex-row ${showNavbar ? "flex" : "hidden"}`}>
          {Menus.map((menus, i) => (
            <li className='flex text-center justify-center items-center' key={i}>
              <Link to={menus.link} className=" text-white text-lg p-1 ">
                <span className='flex-1 md:ms-3 whitespace-nowrap text-white hover:text-red-600' >{menus.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
