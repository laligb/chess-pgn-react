import React from 'react'
import Webcam from "react-webcam";
import { useChess } from "../contexts/ChessContext";
import LoadPGN from './LoadPGN';
import { useRef } from 'react';
import Spinner from './Spinner';


function GetImage() {

  const webcamRef = useRef(null);

  const {apiLoad, fens,  loading, file, dispatch, OnClick, isBoard, takePhoto, resetFile} = useChess();

  // Upload Image
  function handleChange(e) {
    console.log(e.target.files);
    const image_file = URL.createObjectURL(e.target.files[0])
    dispatch({type: "file/set", payload: image_file});
    dispatch({type: "imgSrc/set", payload: image_file});

}

return (
  <>
    {apiLoad ? (
      <Spinner />
    ) : (
      <>
        {isBoard ? (
          <div>
            {loading ? (
              <div className="mt-4 flex items-center justify-center">
                <progress className="progress-bar w-full" max="100"></progress>
                <div className="ml-4">Processing...</div>
              </div>
            ) : null}
            <LoadPGN fens={fens} />
          </div>
        ) : (
          <div>
            {file ? (
              <>
                <div className='row flex items-center'>
                  <h2>Uploaded Chess Scoresheet:</h2>
                  <div className='col-lg-4 col-md-10 col-sm-10'></div>
                  <img alt="scoresheet" src={file} className='col-lg-4 col-md-10 col-sm-10' />
                  <div className="btn-container mt-4">
                    <button
                      onClick={() => OnClick()}
                      className="rounded bg-slate-300 px-4 py-2 text-black"
                    >
                      🔮 DO MAGIC!
                    </button>
                    <button className="rounded bg-slate-300 px-4 py-2 text-black" onClick={resetFile}>Try again</button>
                  </div>
                </div>
              </>
            ) : (
              <div className="row camera flex items-center">
                {/* <h2>Take a Photo</h2>
                <div>
                  <Webcam
                    height={600}
                    width={600}
                    ref={webcamRef}
                    screenshotFormat="image/png"
                  />
                  <div className="btn-container mt-4">
                    <button
                      onClick={() => takePhoto({ webcamRef })}
                      className="rounded bg-slate-300 px-4 py-2 text-black"
                    >
                      Capture photo
                    </button>
                  </div> */}
                {/* </div> */}

                <div className="row flex items-center">
                  <div className="upload btn-container mt-4">
                    <h2>Upload Chess Scoresheet:</h2>
                    <input
                      type="file"
                      onChange={handleChange}
                      className='rounded bg-slate-300 px-4 py-2 text-black'
                    />
                    <div className='row '>
                      {/* Add any additional elements or components here */}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </>
    )}
  </>
);
            }

export default GetImage
