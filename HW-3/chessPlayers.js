//█▀ █░█ █▄▄ ░░█ █▀█ █▀▀ ▀█▀
//▄█ █▄█ █▄█ █▄█ ██▄ █▄▄ ░█░
//============================================================
// We have number of chess players and some finished matches,
// you should write a function and find out which players should play together

// The matches should be returned in an sorted array, with each match stored as [m-i, m-j], where m-i < m-j

// Example
// For chessPlayers = 4 and finishedMatches = [[0, 1], [1, 2], [2, 0]]
// the output should be
// solution(chessPlayers, finishedMatches) = [[0, 3], [1, 3], [2, 3]]

// const solution = (chessPlayers, finishedMatches) => {
//     // your code
//   };

// █▀ █▀█ █░░ █░█ ▀█▀ █ █▀█ █▄░█
// ▄█ █▄█ █▄▄ █▄█ ░█░ █ █▄█ █░▀█
//============================================================
const validation = (chessPlayers, finishedMatches) => {
    /*
    Checking input values valid or not ...
    */
    if (chessPlayers <= 1)
        throw new RangeError("Need menimum 2 players !");
    for (let match of finishedMatches){
        if (match.length !== 2){
            throw new RangeError("Something went wrong, please cheack the finished matches values!");
        }
    }
}

const solution = (chessPlayers, finishedMatches) => {
    /*
    if input is valid will find out which players should play together. (Will return array)
    */
    // your code
    validation(chessPlayers, finishedMatches);
    let result = [];
    let includes1;
    let includes2;
  
    for (let i = 0; i < chessPlayers; i++) {
      for (let j = i + 1; j < chessPlayers; j++) {
        includes1 = finishedMatches.some((a) =>
          [i, j].every((v, z) => v === a[z])
        );
  
        includes2 = finishedMatches.some((a) =>
          [j, i].every((v, z) => v === a[z])
        );
  
        if (!includes1 && !includes2) {
          result.push([i, j]);
        }
      }
    }
    return result;
};

//============================================================
const finishedMatches = [[0, 1], [1, 2], [2, 0]];
chessPlayers = 4;
console.log(solution(chessPlayers, finishedMatches)); // [[ 0, 3 ],[ 1, 3 ],[ 2, 3 ]]