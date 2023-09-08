import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route } from "react-router-dom";
import { ChessProvider } from './contexts/ChessContext';

import GetImageLayout from './components/GetImageLayout';

function App() {
  return (

    <div className="App">

          <ChessProvider>
          <Routes>

            {/* <Route path="/upload" element= { <UploadImageLayout/>}/> */}
            <Route path="/" element= { <GetImageLayout/>}/>
          </Routes>
          </ChessProvider>

          {/* <PlayRandomMoveEngine /> */}

      <footer className='footer navbar-custom'>
          <p>Lali Bibilashvili, Amanda Aurora, David Rosillo</p>
          <p>2023</p>
        </footer>
    </div>
  );
}

export default App;
