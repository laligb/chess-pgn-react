import React from 'react'
import { Link } from 'react-router-dom'


function Nav() {

return (

  <>
    {/* <nav className="navbar navbar-expand-lg navbar-dark bg-success"> */}

    <header className="">

    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">

    <div className="container-fluid">
    <logo className="nav-items">
        <Link to={"/"}><img src={require('../logo.png')} className=" rounded logo" alt='logo' /></Link>
        </logo>
        <h1 className="navbar-brand">Digitization Handwritten Chess Game Scoresheets</h1>
        <div className=''>
        <Link to="/" className=" symbol me-2" >Camera</Link>
        {/* <Link to="/upload" className="me-2">Upload Scoresheet</Link> */}
        <Link
          to="https://docs.google.com/presentation/d/1iTzYNTvwiY2zQe1F5oXYlJ-SuYl84hvOaCwS4CbMx68/edit?usp=sharing"
          className="me-2"
          target="_blank">
          Slides
        </Link>
        </div>
      </div>

  </nav>
  </header>

  </>

)
}

export default Nav
