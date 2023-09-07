import React from 'react'
import Nav from './Nav'
import GetImage from './GetImage'
// import {Outlet} from "react-router-dom"

export default function GetImageLayout() {
  return (
    <div>
      <Nav></Nav>
      <div className="container">
      <GetImage/></div>
    </div>
  )
}
