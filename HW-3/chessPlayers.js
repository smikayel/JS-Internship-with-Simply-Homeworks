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
    let players = chessPlayers;
    const countMatcheAll = [];

    while (chessPlayers-- > 0){
        const countMatches = [];
        countMatches.push(chessPlayers);
        for (let matche of finishedMatches){
            if (matche[0] === chessPlayers)
                countMatches.push(matche[1]);
            else if (matche[1] === chessPlayers)
                countMatches.push(matche[0]);
        }
        countMatcheAll[chessPlayers] = countMatches;
    }
    const resoult = [];
    let playerNumber = 0;
    for (let match of countMatcheAll){
        let i = 0;
        while (i < players){
            if (!match.includes(i)){
                if (playerNumber < i){
                    resoult.push([playerNumber, i])
                    break ;
                }
            }
            i++;
        }
        playerNumber++;
    }
    return resoult;
};

//============================================================
finishedMatches = [[0, 1], [1, 2], [2, 0]];
chessPlayers = 4;
console.log(solution(chessPlayers, finishedMatches)); // [[ 0, 3 ],[ 1, 3 ],[ 2, 3 ]]