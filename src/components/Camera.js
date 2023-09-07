import Webcam from "react-webcam";
import React, { useRef } from "react";
import Chess from "chess.js";
import LoadPGN from "./LoadPGN";

import { useChess } from "../contexts/ChessContext";

function Camera() {
  const webcamRef = useRef(null);

  const {imgSrc, fens,  loading, dispatch} = useChess();


  async function OnClick() {
    console.log("Starting the callback");
    const imageSrc = webcamRef.current.getScreenshot();
    dispatch({type: "imgSrc/set", payload: imageSrc});
    dispatch({type: "loading/set", payload: true});

    try {
      const imageBlob = await (await fetch(imageSrc)).blob();

      const formData = new FormData();
      formData.append("img", imageBlob);


      const response = await fetch(
        "https://chess-yarc62mhna-ew.a.run.app/upload",
        {
          method: "POST",
          body: formData,

        },
      );
      console.log(response)

      const pgn = await response.json();
      console.log(pgn);
      dispatch({type: "responsePGN/set", payload: pgn});

      const game = new Chess();
      const fenList = [];
      const replacedPgn = pgn
        .replace(/0-0-0/g, "O-O-O")
        .replace(/0-0/g, "O-O")
        .trim();
      const cleanPgn = replacedPgn
        .replace(/\d+\./g, "")
        .replace(/[\r\n]+/g, " ");
      const moves = cleanPgn.split(" ");


      for (let i = 0; i < moves.length; i++) {
        game.move(moves[i], { sloppy: true });
        fenList.push(game.fen());
      }
      dispatch({type: "fens/set", payload: fenList});
      console.log(fenList);
      if (response.ok) {
        console.log("Image uploaded successfully");
      } else {
        console.log("Image upload failed");
      }
    } catch (error) {
      console.log("Error:", error.message);
    } finally {
      console.log("Finished fetch");
      dispatch({type: "loading/set", payload: false});
    }
  }


  return (
    <>
      {imgSrc ? (
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
        <div className="row camera flex items-center">
            <div>
          <Webcam
            height={600}
            width={600}
            ref={webcamRef}
            screenshotFormat="image/png"
          />
          <div className="btn-container mt-4">
            <button
              onClick={OnClick}
              className="rounded bg-slate-300 px-4 py-2 text-black"
            >
              Capture photo
            </button>
            </div>



          </div>
        </div>
      )}
    </>
  );
}
export default Camera;
