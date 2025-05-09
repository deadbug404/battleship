class Player{
    constructor(name,type,gameboard,ships){
        this.name = name;
        this.type = type;
        this.gameboard = gameboard;
        this.shipsAvailable = ships;
    }
}

export {Player}