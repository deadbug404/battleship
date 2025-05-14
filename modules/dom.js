function getName(e){
    e.preventDefault();
    let playerName = document.querySelector("#playerName");
    return playerName.value;
}

function selectColor(ship){
    switch (ship.name) {
        case "Carrier":
            return "red";
        case "Battleship":
            return "green";
        case "Cruiser":
            return "yellow";
        case "Submarine":
            return "orange";
        case "Destroyer":
            return "blue";
        default:
            return "white";
    }
}

function previewGameBoard(player){
    let board = player.gameboard.board;
    let gameboard = document.querySelector("#gameboard");
    let gameboardModal = document.querySelector("#gameboardModal");
    gameboardModal.style.display = "block";
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
            column.style.backgroundColor = selectColor(ship);
            row.appendChild(column);
        }
        gameboard.appendChild(row);
    }
}

function resetGameBoard(){
    let gameboard = document.querySelector("#gameboard");
    gameboard.textContent = "";
}

function isColumnOccupied(column){
    if(column.className.includes("occupied")){
        return true;
    }
}

function isColumnStreamValid(columns){
    for(let i = 0; i < columns.length;i++){
        if(columns[i] == undefined || columns[i].className.includes("occupied")){
            return false
        }
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

function previewSettingShipsListener(gameboard,player){
    gameboard.addEventListener("mouseover",e=>{
        if(e.target.classList.contains("column")){
            const columns = document.querySelectorAll(".column");
            const axis = document.querySelector("#axisButton").className;
            const currentShip = player.shipsAvailable[0];
            const index = Array.from(columns).indexOf(e.target);

            if(currentShip !== undefined){
                columns.forEach(column=>{
                    if(!isColumnOccupied(column)){
                        column.style.backgroundColor = "white"
                    }
                });

                if(axis == "x"){
                    const endPoint = index+currentShip.length-1;
                    if(columns[endPoint] !== undefined && columns[index].parentNode === columns[endPoint].parentNode){
                        let columnsArr = getColumnsXAxis(columns, index, endPoint);
                        if(isColumnStreamValid(columnsArr)){
                            columnsArr.forEach(column => column.style.backgroundColor = "yellow");
                        }
                    }
                }else{
                    let columnsArr = getColumnsYAxis(e,currentShip);
                    if(isColumnStreamValid(columnsArr)){
                        columnsArr.forEach(column => column.style.backgroundColor = "yellow");
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
            e.target.textContent = "Axis: Y";
        }else{
            e.target.className = "x";
            e.target.textContent = "Axis: X";
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
            let startCoordinate = e.target.id;
            let columnsArr;

            if(axis == "x"){
                columnsArr = getColumnsXAxis(columns, index, endPoint);
            }else{
                columnsArr = getColumnsYAxis(e,currentShip);
            }
            
            try{
                if(isColumnStreamValid(columnsArr)){
                    gameboard.place(startCoordinate,currentShip,axis);
                    console.log(gameboard);
                    player.shipsAvailable.shift();
                    resetGameBoard();
                    previewGameBoard(player);
                    setPlaceListener(gameboard,player);
                }
            }catch(e){
                console.log("all ships have been set!")
            }
        })
    })
}

export {getName, previewGameBoard, previewSettingShipsListener, setAxisListener, setPlaceListener}