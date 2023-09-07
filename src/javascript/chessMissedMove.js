// Algorithm to find missed move
const { Chess } = require("chess.js");
//const fs = require('fs');


// let pgnHeader = [
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
// ]


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

//Missed move #10
const missedPGN= [
  '[Event "Casual Game"]',
  '[Site "Berlin GER"]',
  '[Date "1852.??.??"]',
  '[EventDate "?"]',
  '[Round "?"]',
  '[Result "1-0"]',
  '[White "Adolf Anderssen"]',
  '[Black "Jean Dufresne"]',
  '[ECO "C52"]',
  '[WhiteElo "?"]',
  '[BlackElo "?"]',
  '[PlyCount "47"]',
  '',
  '1.e4 e5 2.Nf3 Nc6 3.Bc4 Bc5 4.b4 Bxb4 5.c3 Ba5 6.d4 exd4 7.O-O',
  'd3 8.Qb3 Qf6 9.e5 Qg6 10.missed Nge7 11.Ba3 b5 12.Qxb5 Rb8 13.Qa4',
  'Bb6 14.Nbd2 Bb7 15.Ne4 Qf5 16.Bxd3 Qh5 17.Nf6+ gxf6 18.exf6',
  'Rg8 19.Rad1 Qxf3 20.Rxe7+ Nxe7 21.Qxd7+ Kxd7 22.Bf5+ Ke8',
  '23.Bd7+ Kf8 24.Bxe7# 1-0',
]

// const pgn_david = [
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
//   '1.e4 e6 2.d4 d5 3.Nc3 missed 4.missed Bf5 5.Bd3 e6 6.Nf3 Nd7 7.Bg5 Qa5 8.c3 h6 9.Bh4 missed 10.missed Nf6 11.Bd3 Be8 12.O-O O-O 13.Qb3 Qb6 14.Ne5 missed 15.axb3 missed 16.missed Nd5 17.h3 Rd1 18.Rd7 missed 19.f6 missed 20.Kg7 Bb2 21.b5 Bc4 22.Re3 Bb3 23.missed Ra6 24.Bf8 Rf1 25.g5 g4 26.Be7 Ra2 27.Bd8 f3 28.Kf2 Bb6 29.Kg2 Re8 30.h4 f5 31.e5 Rh8 32.f4 Re5 33.Kf6 Bg1 34.missed g4 35.missed g3 36.Rg4 missed 37.c3 g4 38.g3 g4 39.c3 c4 40.missed g4 41.b3 d4 42.missed c3 43.missed c4 44.missed d4 45.missed c3 46.missed b3 47.g4 c4 48.missed c5 49.g4 c5 50.g4 d4 51.g4 g4 52.missed a3 53.g4 g3 54.g4 g4 55.g4 c3 56.g4 g3 57.g4 g3 58.g4 d4 59.g4 g4 60.c3 g4 61.g3'
// ];

//console.log(pgn_david.join('\n'));


function returnMissedMove(pgn){

  let pgnString = pgn;
  if (Array.isArray(pgn)){
    pgnString = pgn.join('\n');
  }

  let gamesVersion = "";
  let restoredPGN ="";
  //let [bestVersion, bestMove] = ['', '']

    const missedGame = new Chess();
    missedGame.load_pgn(pgnString, { strict: true })

    const missedFull = missedGame.history({verbose: true})
    console.log("index of missed move ", Math.floor(missedFull.length/2 + 1))
    let indexOfMissedMove = missedFull.length;

    let legalMoves = missedGame.moves()


    console.log("All legal moves: ", legalMoves)
    gamesVersion = allMovesToGames(missedGame, pgnString, legalMoves, indexOfMissedMove);
    const [bestVersion, bestMove] =  findBestMove(gamesVersion, indexOfMissedMove,legalMoves);
    restoredPGN = createNewPGN(pgnString, indexOfMissedMove, bestVersion);

    pgnString = restoredPGN;

    console.log(bestMove)

    console.log('Best Version', bestVersion);
    console.log(restoredPGN);



  return [restoredPGN, bestVersion] ;
}

// Returns all possible games with legal moves
function allMovesToGames(missedGame, pgn, legalMoves, indexOfMissedMove){
  let gamesVersion = []
  for (let i=0; i<legalMoves.length; i++){
    const copiedMissedGame = new Chess();
    copiedMissedGame.load(missedGame.fen());
    let copiedMissPGN = pgn;

    //let moveNumber = Math.floor(indexOfMissedMove/2) + 1;

    copiedMissPGN = copiedMissPGN.replace(`missed`, `${legalMoves[i]}`);

    copiedMissedGame.load_pgn(copiedMissPGN)

    gamesVersion.push(copiedMissedGame)

  }

  return gamesVersion;
}

// Finds Best Move and returns best version of game
function findBestMove(gamesVersion, indexOfMissedMove,legalMoves ){
  let length =0;
  let version = [];
  let bestMove = '';
  let histograms = [];
  for (let i=0; i<legalMoves.length; i++){
    let versionHistory = gamesVersion[i].history({ verbose: false })
    console.log("version", versionHistory)
    histograms.push(versionHistory.length)
    if (versionHistory.length > length){
      length = versionHistory.length;
      version = versionHistory;
      bestMove = version[indexOfMissedMove]
    }

  }

  return [version, bestMove];
}

// Combine to PGN file
function createNewPGN(initialPGN, indexOfMissedMove, bestMove){
  let finalPGN = "";
  let moveNumber = Math.floor(indexOfMissedMove/2) + 1;
  console.log(moveNumber)


  finalPGN = initialPGN.replace(`missed`, `${bestMove}`);


  // fs.writeFile('public/games/game.pgn', finalPGN, err => {
  //   if (err) {
  //     console.error(err); // Handle the error if one occurs
  //   } else {
  //     //console.log('Data has been written to the file.'); // File written successfully
  //   }
  // });
  return finalPGN;
}

returnMissedMove(missedPGN)


// while (game.includes("missed")){
//   game = returnMissedMove(game)
// }
// console.log(typeof(game))



// let david = returnMissedMove(pgn_david)
