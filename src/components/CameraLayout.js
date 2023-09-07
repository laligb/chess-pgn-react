import React from 'react'
import Nav from './Nav'
import Camera from './Camera'
// import {Outlet} from "react-router-dom"

export default function CameraLayout() {
  return (
    <div>
      <Nav></Nav>
      <div className="container">
      <Camera/></div>
    </div>
  )
}
