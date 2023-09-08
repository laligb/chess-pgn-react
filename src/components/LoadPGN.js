import React, {useState} from 'react';
import {Chess} from "chess.js";
import { Chessboard } from "react-chessboard";
import { useChess } from '../contexts/ChessContext';

function LoadPGN({ fens }) {
  const {responsePGN} = useChess()



  // const PGN = [
  //   '[Event "Casual Game"]',
  //   '[Site "Berlin GER"]',
  //   '[Date "1852.??.??"]',
  //   '[EventDate "?"]',
  //   '[Round "?"]',
  //   '[Result "1-0"]',
  //   '[White "Adolf Anderssen"]',
  //   '[Black "Jean Dufresne"]',
  //   '[ECO "C52"]',
  //   '[WhiteElo "?"]',
  //   '[BlackElo "?"]',
  //   '[PlyCount "47"]',
  //   '',
  //   '1.e4 e5 2.Nf3 Nc6 3.Bc4 Bc5 4.b4 Bxb4 5.c3 Ba5 6.d4 exd4 7.O-O',
  //   'd3 8.Qb3 Qf6 9.e5 Qg6 10.Re1 Nge7 11.Ba3 b5 12.Qxb5 Rb8 13.Qa4',
  //   'Bb6 14.Nbd2 Bb7 15.Ne4 Qf5 16.Bxd3 Qh5 17.Nf6+ gxf6 18.exf6',
  //   'Rg8 19.Rad1 Qxf3 20.Rxe7+ Nxe7 21.Qxd7+ Kxd7 22.Bf5+ Ke8',
  //   '23.Bd7+ Kf8 24.Bxe7# 1-0',
  // ]

  //console.log(restoreGame(responsePGN))

  const [game, setGame] = useState(new Chess());
  const [moveIndex, setMoveIndex] = useState(0);
  console.log(responsePGN);
  console.log(setGame);

  try {
    console.log(responsePGN);
     game.load_pgn(responsePGN.join('\n'));
  }
  catch {
    //let moves_pgn = game.load_pgn(PGN.join('\n'));

  }

  const moves = game.history({ verbose: true });

  const handlePreviousMove = () => {
    if (moveIndex > 0) {
      setMoveIndex(moveIndex - 1);
    }
  };

  const handleNextMove = () => {
    if (moveIndex < fens.length) {
      setMoveIndex(moveIndex + 1);
    }
  };

  const {dispatch} = useChess()

  function updateCamera() {
    console.log('Onclick Works')
    dispatch({type:"reset"})

  };


  function downloadFile({responsePGN}){

      if (typeof responsePGN !== 'undefined' && responsePGN !== null){
        console.log(responsePGN)
        const blob = new Blob([responsePGN], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "chess-games.txt";
        link.href = url;
        console.log('download link',link)
        link.click();
      }

  };

  //   game.move(moves[i], { sloppy: true });
      //   fenList.push(game.fen());


  return (
    <div className='row d-flex justify-content-center'>

      {/* <div className="col-lg-6 col-md-6 col-sm-10"> */}
      <div className="col-lg-6 col-md-6 col-sm-10">
       <div className='chessboard'>
        <Chessboard
          position={fens[moveIndex]}
        />
        </div>

      <div className="mt-2">
        <button
          onClick={handlePreviousMove}
          className="mr-2 rounded bg-slate-300 px-4 py-2 text-black"
          disabled={moveIndex === 0}
        >
          〈
        </button>
        <button
          onClick={handleNextMove}
          className="rounded bg-slate-300 px-4 py-2 text-black"
          disabled={moveIndex === fens.length - 1}
        >
          〉
        </button>

        <button
            onClick={() => downloadFile(responsePGN)}
            className="rounded bg-slate-300 px-4 py-2 text-black">
            Download game
          </button>

          <button onClick={()=> updateCamera()}
            className="rounded bg-slate-300 px-4 py-2 text-black reset">
            Reset
          </button>
      </div>

         <div className='notation'>{moves[moveIndex]?.san}</div>
        </div>

      <div className="col-lg-6 col-md-6 col-sm-10">
        <p>{responsePGN}</p>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-10"></div>
    </div>
  )
}

export default LoadPGN
