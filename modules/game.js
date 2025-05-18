import { getName, previewShipsListener, refreshGameBoard, setAxisListener, showCurrentGameBoards} from "../modules/dom";
import { Player } from "../modules/player";
import { Gameboard } from "../modules/gameboard";
import { Ship } from "./ship";

class Game{
    constructor(e){
        this.playerHuman;
        this.playerComputer;
        this.createGame(e);
    }

    createShips(){
        let lengths = [5,4,3,3,2];
        let names = ["Carrier","Battleship","Cruiser","Submarine","Destroyer"];
        let ships = [];
        for(let i = 0;i<5;i++){
            let ship = new Ship(names[i],lengths[i]);
            ships.push(ship);
        }
        return ships
    }

    createGame(e){
        let gameboardHuman = new Gameboard();
        let playerHuman = new Player(getName(e),"human",gameboardHuman,this.createShips());
        let gameboardComputer = new Gameboard();
        let playerComputer = new Player("Computer","computer",gameboardComputer,this.createShips());
        this.playerHuman = playerHuman;
        this.playerComputer = playerComputer;
    }

    getValidStartingCoordinate(coordinate,shipLength,axis){
        let board = this.playerComputer.gameboard.board;
        while(1){
            let row = parseInt(coordinate[Math.floor(Math.random() * coordinate.length)]);
            let col = parseInt(coordinate[Math.floor(Math.random() * coordinate.length)]);
            let columns = [];

            for(let i = 0; i < shipLength;i++){
                let colValue;
                if(axis == "x"){
                    try{
                        colValue = board[row][col+i];
                    }catch(e){
                        colValue = undefined;
                    }
                }else{
                    try{
                        colValue = board[row+i][col];
                    }catch(e){
                        colValue = undefined;
                    }
                    
                }
                columns.push(colValue);
            }
            //check if index is out of bounds or is already occupied
            if(columns.includes(undefined) || columns.some(value => {return typeof value == "object"})){continue}
            
            return `${row}${col}`;
        }

    }

    setShipsComputer(){
        let axis = ["x","y"];
        let coordinates = "0123456789";
        let gameboardObj = this.playerComputer.gameboard;

        while(this.playerComputer.shipsAvailable[0] !== undefined){
            let currentShip = this.playerComputer.shipsAvailable[0];
            let randomAxis = axis[Math.floor(Math.random() * axis.length)];
            let validStartingCoordinate = this.getValidStartingCoordinate(coordinates,currentShip.length,randomAxis);
            gameboardObj.place(validStartingCoordinate,currentShip,randomAxis);
            this.playerComputer.shipsAvailable.shift();
        }
        console.log(gameboardObj);
    }

    setShips(){
        let player = this.playerHuman;
        let gameboardObj = this.playerHuman.gameboard;
        let gameboardDiv = document.querySelector("#gameboard");
        setAxisListener();
        previewShipsListener(gameboardDiv,player);
        refreshGameBoard(gameboardObj,player);
    }

    start(){
        showCurrentGameBoards(this.playerHuman,this.playerComputer);
    }
}

export {Game}