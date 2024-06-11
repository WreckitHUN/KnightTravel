const knightMoves = (start, end) => {
  adjacencyList = createAdjacencyList();
  let set = new Set();

  console.log(adjacencyList);

  function createAdjacencyList (){
    // Create the board as a 1 dimensional array
    const board = [...Array(64)].map((a, i) => i);
    // The moves made by the knight
    const moves = [-17, -15, -10, -6, 17, 15, 10, 6];

    let list = [];

    board.forEach((cell) => {
        let adjElements = [];
        // Iterate through each move
        moves.forEach((move) => {
            // If the move is out of bound return
            if (cell + move < 0 || cell + move > 63) return;
            // Also because I am a bit weird I will compare the distance between the moves and the cell
            let pointA =  convertToCoordinates(cell);
            let pointB = convertToCoordinates(cell + move);
            let dx = pointA[0] - pointB[0];
            let dy = pointA[1] - pointB[1];
            if (Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2)) !== Math.sqrt(5)) return;
            // If it is a  valid adjacent cell
            adjElements.push(cell + move);
        })

        list.push(adjElements);
    })

    return list;
  }

  function convertToCoordinates (num){
    let x = Math.floor(num / 8);
    let y = num % 8;

    return [x, y];
}


}

knightMoves();









