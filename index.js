document.addEventListener('dragstart', function(event) {
  event.preventDefault();
});

const knightMoves = (start, end) => {
    let _start = convertToDecimals(start);
    let _end = convertToDecimals(end);
    adjacencyList = createAdjacencyList();
   
    const shortestPath = (bfsPath(adjacencyList, _start, _end));

    function bfsPath(adjacencyList, start, end) {
        let queue = [[start, [start]]]; // Initialize the queue with the start node and path
        let visited = new Set(); // Set to keep track of visited nodes
      
        while (queue.length > 0) {
          let [cell, path] = queue.shift(); // Dequeue a node and its path from the queue
      
          if (cell === end) {
            return path.map((cell) => convertToCoordinates(cell));
          }; // If it's the endpoint, return the path
      
          adjacencyList[cell].forEach(adjCell => {
            if (!visited.has(adjCell)) { // If the adjacent cell hasn't been visited
              visited.add(adjCell); // Mark the adjacent cell as visited
              queue.push([adjCell, [...path, adjCell]]); // Enqueue the adjacent cell along with the updated path
            }
          });
        }
      
        return []; // Return an empty array if the endpoint is not reachable
      }
    

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

    function convertToDecimals([x, y]){
      return x * 8 + y;
    }

return shortestPath;
}

const updateDOM = () => {
  createBoard();

  function createBoard(){
    const container = document.querySelector(".container");
    // Delete content
    container.textContent = "";
    let _start = [];
    let _end = [];
    let _clickCount = 0;
    const board = document.createElement("div");
    board.classList.add("board");
    board.classList.add("clickableStart");
    board.classList.add("clickableEnd");
    container.appendChild(board);

    // Create a button for the travail
    const travailButton = document.createElement("button");
    travailButton.classList.add("btn");
    travailButton.textContent = "TRAVAIL";
    container.appendChild(travailButton);

    travailButton.addEventListener("click", () => {
      if (!_start?.length || !_end?.length) return;
      let shortestPath = knightMoves(_start, _end);
      console.log(shortestPath);
      shortestPath.forEach((coord, i) => {
        if (i === 0) return;
        // Mark each cell
        let cell = document.querySelector(`[data-row="${coord[0]}"][data-column="${coord[1]}"]`);
        cell.textContent = i;
        cell.style.background = "green";
      })
    })

    // Create resetButton
    const resetButton = document.createElement("button");
    resetButton.classList.add("btn");
    resetButton.textContent = "RESET";
    container.appendChild(resetButton);
    resetButton.addEventListener("click", () => {
      createBoard();
    });

    for(let i = 0; i < 8; i++){
      let row = document.createElement("div");
      row.classList.add("row");
      for(let j = 0; j < 8; j++){
        let cell = document.createElement("div");
        let horsePNG = document.createElement("img");
        horsePNG.src = "./assets/knight.png";
        horsePNG.classList.add("horse");
        cell.appendChild(horsePNG);
        cell.classList.add("cell");
        cell.dataset.row = i;
        cell.dataset.column = j;
    
        row.appendChild(cell);
      }
      board.appendChild(row);
    }

    board.addEventListener("click", (e) => {
      if (_clickCount > 2) return;
      let target = e.target.classList.contains("horse") ? e.target.parentNode : e.target;

      console.log(target);
      // firstClick
      if (_clickCount === 0){
        // Remove the clickableStart from board
        board.classList.remove("clickableStart");
        // Make the click horse visible
        target.firstChild.style.opacity = 1;
        // Add clickedStart to the cell
        target.classList.add("clickedStart");
        _clickCount++;
        _start[0] = +target.dataset.row;
        _start[1] = +target.dataset.column;
        console.log(_start);
        return;
      }
      // SecondClick
      if (_clickCount === 1){
        // Remove the clickableEnd from board
        board.classList.remove("clickableEnd");
        // Add clickedEnd to the cell
        target.classList.add("clickedEnd");
        _clickCount++;
        _end[0] = +target.dataset.row;
        _end[1] = +target.dataset.column;
        console.log(_end);
        return;
      }
    
    });
  }
}

updateDOM();










