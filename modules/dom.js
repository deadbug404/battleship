function getName(e){
    e.preventDefault();
    let playerName = document.querySelector("#playerName");
    let names = document.querySelectorAll(".name");
    names.forEach(name => {
        let changedName = playerName.value.replace(/ /g, "_") + "@server:~$ ";
        name.textContent = changedName;
    })
    return playerName.value;
}

function selectColor(ship){
    switch (ship.name) {
        case "Carrier":
            return "red";
        case "Battleship":
            return "pink";
        case "Cruiser":
            return "yellow";
        case "Submarine":
            return "orange";
        case "Destroyer":
            return "blue";
        default:
            return "black";
    }
}

function isShipUndefined(ship){
    if(ship === undefined){
        let confirmButton = document.querySelector("#confirmButton");
        confirmButton.disabled = false;
        return true
    }
    return false
}

function isColumnOccupied(column){
    if(column.className.includes("occupied")){
        return true;
    }
}

function isColumnStreamValid(columns,axis,validXAxis){
    for(let i = 0; i < columns.length;i++){
        if(columns[i] == undefined || columns[i].className.includes("occupied")){
            return false
        }
    }
    if(axis === "x" && validXAxis === false){
        return false
    }
    return true
}

function getColumnsYAxis(e,currentShip){
    let nthElementCol = e.target.id[0];
    let nthElementRow = e.target.id[1];
    let arr = []
    for(let i = 0; i < currentShip.length; i++){
        let col = document.getElementById(`${parseInt(nthElementCol)+i}${nthElementRow}`)
        arr.push(col);
    }

    return arr;
}

function getColumnsXAxis(columns, index, endPoint){
    return Array.from(columns).slice(index,endPoint+1);
}

function previewGameBoard(player,gameboard,gameboardModal,ingame=false){
    let board = player.gameboard.board;
    gameboard.textContent = "";
    gameboardModal.style.display = "flex";
    for(let i =0;i<10;i++){
        let row = document.createElement("div");
        row.classList.add("row")
        for(let j =0;j<10;j++){
            let column = document.createElement("div");
            column.classList.add("column");
            column.id = `${[i]}${[j]}`;
            let ship = board[i][j];
            if(ship){
                column.classList.add("occupied");
            }
            if(ship == "hit"){column.textContent = "o"}
            if(ship == "miss"){column.textContent = "x"}
            ingame ? column.style.backgroundColor = "black" : column.style.backgroundColor = selectColor(ship);
            row.appendChild(column);
        }
        gameboard.appendChild(row);
    }

}

function refreshGameBoard(gameboard, player){
    let gameboardDiv = document.querySelector("#gameboard");
    gameboardDiv.textContent = "";
    let gameboardModal = document.querySelector("#gameboardModal");

    previewGameBoard(player,gameboardDiv,gameboardModal);
    if(!isShipUndefined(player.shipsAvailable[0])){
        setPlaceListener(gameboard,player);
    }
}

function previewShipsListener(gameboard,player){
    gameboard.addEventListener("mouseover",e=>{
        if(e.target.classList.contains("column")){
            const columns = document.querySelectorAll(".column");
            const axis = document.querySelector("#axisButton").className;
            const currentShip = player.shipsAvailable[0];
            const index = Array.from(columns).indexOf(e.target);

            if(currentShip !== undefined){
                columns.forEach(column=>{
                    if(!isColumnOccupied(column)){
                        column.style.backgroundColor = "black"
                    }
                });

                if(axis == "x"){
                    const endPoint = index+currentShip.length-1;
                    if(columns[endPoint] !== undefined && columns[index].parentNode === columns[endPoint].parentNode){
                        let columnsArr = getColumnsXAxis(columns, index, endPoint);
                        if(isColumnStreamValid(columnsArr)){
                            columnsArr.forEach(column => column.style.backgroundColor = selectColor(currentShip));
                        }
                    }
                }else{
                    let columnsArr = getColumnsYAxis(e,currentShip);
                    if(isColumnStreamValid(columnsArr)){
                        columnsArr.forEach(column => column.style.backgroundColor = selectColor(currentShip));
                    }
                }
            }
        }
    })
}

function setAxisListener(){
    const axisButton = document.querySelector("#axisButton");
    axisButton.addEventListener("click",e=>{
        if(e.target.className == "x"){
            e.target.className = "y";
            e.target.textContent = "AXIS: Y";
        }else{
            e.target.className = "x";
            e.target.textContent = "AXIS: X";
        }
    })
}

function setPlaceListener(gameboard,player){
    const columns = document.querySelectorAll(".column");
    const currentShip = player.shipsAvailable[0];
    columns.forEach(column=>{
        column.addEventListener("click",e=>{
            const index = Array.from(columns).indexOf(e.target);
            const endPoint = index+currentShip.length-1;
            const axis = document.querySelector("#axisButton").className;
            let validXAxis;
            let startCoordinate = e.target.id;
            let columnsArr;
            

            if(axis == "x"){
                columnsArr = getColumnsXAxis(columns, index, endPoint);
                validXAxis = columns[index].parentNode === columns[endPoint].parentNode;
            }else{
                columnsArr = getColumnsYAxis(e,currentShip);
            }

            try{
                if(isColumnStreamValid(columnsArr,axis,validXAxis)){
                    gameboard.place(startCoordinate,currentShip,axis);
                    player.shipsAvailable.shift();
                    refreshGameBoard(gameboard, player);
                }
            }catch(e){
                console.log(`${e}`);
            }
        })
    })
}

function selectRandomCoordinate(player){
    let coordinates = "0123456789";
    let randomCoordinate = "";

    while(randomCoordinate == ""){
        let row = parseInt(coordinates[Math.floor(Math.random() * coordinates.length)]);
        let col = parseInt(coordinates[Math.floor(Math.random() * coordinates.length)]);
        let value = player.gameboard.board[row][col];
        console.log(value);
        if(value !== "hit" && value !== "miss"){randomCoordinate = `${row}${col}`}else{console.log(`${row}${col}`)};
    }

    return randomCoordinate;
}

function setAttackListener(computer, player,mainGameModal){
    let computerBoard = computer.gameboard;
    let playerBoard = player.gameboard;
    const computerBoardDiv = document.querySelector("#computerGameBoardDiv");
    const playerBoardDiv = document.querySelector("#playerGameBoardDiv");

    computerBoardDiv.addEventListener("click",function(e){
        if(e.target.classList.contains("column") && e.target.textContent !== "x" && e.target.textContent !== "o"){
            computerBoard.receiveAttack(e.target.id);
            if(computerBoard.areAllSunk()){winScreen(player);return}
            computerBoardDiv.textContent = "";
            previewGameBoard(computer, computerBoardDiv, mainGameModal, true);
            let randomCoordinate = selectRandomCoordinate(player)
            playerBoard.receiveAttack(randomCoordinate);
            if(playerBoard.areAllSunk()){winScreen(computer);return}
            playerBoardDiv.textContent = "";
            previewGameBoard(player, playerBoardDiv, mainGameModal, true);
        }
    })
}

function winScreen(player){
    const mainGameModal = document.querySelector("#mainGameModal");
    mainGameModal.style.display = "none";

    let winScreen = document.querySelector("#winScreen");
    winScreen.textContent = `${player.name} Win`;
    winScreen.style.display = "flex";
}

function showCurrentGameBoards(player,computer){
    const gameboardModal = document.querySelector("#gameboardModal");
    gameboardModal.style.display = "none";
    let mainGameModal = document.querySelector("#mainGameModal");

    let playerGameboardDiv = document.querySelector("#playerGameBoardDiv");
    let computerGameboardDiv = document.querySelector("#computerGameBoardDiv");

    previewGameBoard(player,playerGameboardDiv,mainGameModal,true);
    previewGameBoard(computer,computerGameboardDiv,mainGameModal,true);
    setAttackListener(computer,player,mainGameModal);
}

export {getName, previewShipsListener, setAxisListener, refreshGameBoard, showCurrentGameBoards}