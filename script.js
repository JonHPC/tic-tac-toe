const gameController = (() => {
    //will be used to end the game/allow restarts
    let gameActive = true;
    //store the current player text
    let currentPlayer = "X";
    //create a blank board
    let boardArray = ["", "", "", "", "", "", "", "", ""];

    const winningMessage = () => `Player ${currentPlayer} win!`;
    const drawMessage = () => `It's a draw!`;
    const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

    let turnText = document.getElementById('turnText');
    turnText.innerHTML = currentPlayerTurn();

    
    //possible winning combinations
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    document.querySelectorAll('.space').forEach(space => space.addEventListener('click', handleSpaceClick));
    function handleSpaceClick(e){
        const clickedSpace = e.target;
        const clickedSpaceIndex = parseInt(clickedSpace.getAttribute('data-space'));
        if(boardArray[clickedSpaceIndex] !== "" || !gameActive){
            return;
        }

        handleSpacePlayed(clickedSpace, clickedSpaceIndex);
        handleResultValidation();
    };
    


    function handleSpacePlayed(clickedSpace, clickedSpaceIndex){
        boardArray[clickedSpaceIndex] = currentPlayer;
        clickedSpace.innerHTML = currentPlayer;
    };

    function handleResultValidation(){
        let roundWon = false;
        for(let i = 0; i <= 7; i++){
            const winCondition = winningConditions[i];
            let a = boardArray[winCondition[0]];
            let b = boardArray[winCondition[1]];
            let c = boardArray[winCondition[2]];
            if(a === '' || b === '' || c === ''){
                continue;
            }
            if(a === b && b === c){
                roundWon = true;
                break
            }
        }
        if(roundWon){
            turnText.innerHTML = winningMessage();
            gameActive = false;
            return;
        }

        let roundDraw = !boardArray.includes("");
        if(roundDraw){
            turnText.innerHTML = drawMessage();
            gameActive = false;
            return;
        }

        handlePlayerChange();
    };

    function handlePlayerChange(){
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        turnText.innerHTML = currentPlayerTurn();
    }

    document.querySelector('#restartBtn').addEventListener('click', handleRestartGame);
    function handleRestartGame(){
        gameActive = true;
        currentPlayer = "X";
        boardArray = ["", "", "", "", "", "", "", "", ""];
        turnText.innerHTML = currentPlayerTurn();
        document.querySelectorAll('.space').forEach(space => space.innerHTML = "");
    }

})();