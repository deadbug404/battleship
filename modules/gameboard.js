class Gameboard{
    constructor(){
        this.board = [];
        this.init();
    }

    init(){
        for(let i=0;i<10;i++){
            let row = [];
            for(let j =0;j<10;j++){
                row.push("");
            }
            this.board.push(row);
        }
    }

    place(startCoordinate,ship,axis){
        let row = parseInt(startCoordinate[0]);
        let col = parseInt(startCoordinate[1]);
        let shipLength = ship.length;

        if(axis === "x"){
            for(let i=col;i<col+shipLength;i++){
                this.board[row][i] = ship
            }
        }else{
            for(let i=row;i<row+shipLength;i++){
                this.board[i][col] = ship
            }
        }
    }

    receiveAttack(coordinate){
        let row = parseInt(coordinate[0]);
        let col = parseInt(coordinate[1]);
        let target = this.board[row][col];
        if(target == "hit" || target == "miss"){return}
        if(target != ""){
            target.hit(); 
            this.board[row][col] = "hit";
        }else{
            this.board[row][col] = "miss";
        }
    }

    areAllSunk(){
        for(let i=0;i<10;i++){
            for(let j=0;j<10;j++){
                if(typeof this.board[i][j] === "object"){
                    return false
                }
            }
        }
        return true
    }
}

export {Gameboard}