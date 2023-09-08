import { createContext, useContext, useReducer } from "react";
import { Chess } from 'chess.js';

const chessContext = createContext();
const initialState = {
  imgSrc : null,
  fens : [],
  loading : false,
  responsePGN : [],
  file: null,
  isBoard:false,
  apiLoad:false

}

function reducer(state, action){
  switch (action.type) {
    case "imgSrc/set":
      return {...state, imgSrc: action.payload };
    case "fens/set":
      return {...state, fens: action.payload, imgSrc:true };
    case "loading/set":
      return {...state, loading: action.payload };
    case "responsePGN/set":
      return {...state, responsePGN: action.payload };
    case "file/set":
      return {...state, file: action.payload };
    case "set/isBoard":
      return {...state, isBoard:true}
    case "reset":
      return initialState
    case "reset/file":
      return {...state, file:action.payload}
    case "set/apiLoad":
      return {...state, apiLoad:action.payload}

    default:
      throw new Error (`Not known action type ${action.type}`)
  }
}

//Pseudocomnonent = Provider!
function ChessProvider({children}){
  const [state, dispatch] = useReducer(reducer, initialState);
  const {imgSrc, fens,  loading, responsePGN, file, isBoard, apiLoad} = state; //Unpacked state
  //Dispach is function which updates all these states

  async function OnClick() {
    console.log("Starting the OnClickEventimgSrc");
    dispatch({type: "set/apiLoad", payload: true});

    try {
      const imageBlob = await (await fetch(imgSrc)).blob();

      const formData = new FormData();
      formData.append("img", imageBlob);
      formData.append("filename", "image.png");

      const response = await fetch(
        "https://chess-yarc62mhna-ew.a.run.app/upload",
        {
          method: "POST",
          body: formData,
        },
      );
      // const pgn = '1.e4 e6 2.d4 d5 3.Nc3 missed 4.missed Bf5 5.Bd3 e6 6.Nf3 Nd7 7.Bg5 Qa5 8.c3 h6 9.Bh4 missed 10.missed Nf6 11.Bd3 Be8 12.O-O O-O 13.Qb3 Qb6 14.Ne5 missed 15.axb3 missed 16.missed Nd5 17.h3 Rd1 18.Rd7 missed 19.f6 missed 20.Kg7 Bb2 21.b5 Bc4 22.Re3 Bb3 23.missed Ra6 24.Bf8 Rf1 25.g5 g4 26.Be7 Ra2 27.Bd8 f3 28.Kf2 Bb6 29.Kg2 Re8 30.h4 f5 31.e5 Rh8 32.f4 Re5 33.Kf6 Bg1 34.missed g4 35.missed g3 36.Rg4 missed 37.c3 g4 38.g3 g4 39.c3 c4 40.missed g4 41.b3 d4 42.missed c3 43.missed c4 44.missed d4 45.missed c3 46.missed b3 47.g4 c4 48.missed c5 49.g4 c5 50.g4 d4 51.g4 g4 52.missed a3 53.g4 g3 54.g4 g4 55.g4 c3 56.g4 g3 57.g4 g3 58.g4 d4 59.g4 g4 60.c3 g4 61.g3'
      const responsePgn = await response.json()
      const pgn = responsePgn['pgn']
      console.log(pgn, "Pgn inside")

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
        let validMoves = game.moves();
        if (validMoves.includes(moves[i])) {
          game.move(moves[i], { sloppy: true });
          fenList.push(game.fen());
        } else {
          console.log(`Invalid move ${moves[i]} encountered at index ${i}`);
        }
      }




      dispatch({type: "fens/set", payload: fenList})
      dispatch({type:"set/isBoard", payload:true})
      console.log(fenList);
      if (response.ok) {
        console.log("Image uploaded successfully");
      } else {
        console.log("Image upload failed");
      }
    } catch (error) {
      console.log("Error:", error.message);
    } finally {
      dispatch({type: "set/apiLoad", payload: false});
      console.log("Finished fetch");

    }
  }

  function takePhoto({webcamRef}) {
    const imageSrc = webcamRef.current.getScreenshot();
    dispatch({type: "imgSrc/set", payload: imageSrc});
    dispatch({type: "loading/set", payload: true});
    dispatch({type: "file/set", payload:imageSrc})
  }

  function resetFile() {
    dispatch({type: "reset/file", payload: null});


  }

  return (
    <chessContext.Provider value={{imgSrc, fens,  loading, responsePGN, file,isBoard, dispatch, OnClick,takePhoto, resetFile,apiLoad}}>
      {children}
    </chessContext.Provider>
  )
}

function useChess(){
  const context = useContext(chessContext);
  return context;
}

export {ChessProvider, useChess};
