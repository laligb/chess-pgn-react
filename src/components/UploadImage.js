import React, {useState} from 'react'
import Chess from "chess.js";
import LoadPGN from "./LoadPGN";
import { useChess } from "../contexts/ChessContext";
//import returnMissedMove from 'src/javascript/chessMissedMove.js';

function UploadImage() {
  // const [file, setFile] = useState();
  // const [imgSrc, setImgSrc] = useState(null);
  // const [fens, setFens] = useState([]);
  // const [responsePGN, setResponsePGN] = useState([])

  //console.log(typeof(returnMissedMove))

  const {imgSrc, fens,  loading, responsePGN, file, dispatch,OnClick} = useChess();


  function handleChange(e) {
    console.log(e.target.files);
    const image_file = URL.createObjectURL(e.target.files[0])
    dispatch({type: "file/set", payload: image_file});
    dispatch({type: "imgSrc/set", payload: image_file});
    console.log(imgSrc);
}



  return (
    <div  className="row flex items-center">
      <div className="upload btn-container mt-4">
          <h2>Upload Chess Scoresheet:</h2>
          <input type="file" onChange={handleChange} className='rounded bg-slate-300 px-4 py-2 text-black'/>
          <div className='row '>
          <div className='col-lg-3 col-md-10 col-sm-10'></div>
            <img src={file} className='col-lg-6 col-md-10 col-sm-10'/>
          </div>
      </div>

      <div className="btn-container mt-4">
        <button
              onClick={OnClick}
              className="rounded bg-slate-300 px-4 py-2 text-black"
        >
        API request
        </button>
      </div>

    </div>
  )
}

export default UploadImage
