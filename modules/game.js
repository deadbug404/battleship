import { getName, previewGameBoard, previewSettingShipsListener, setAxisListener, setPlaceListener} from "../modules/dom";
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
        
        console.log(this.playerHuman);
        console.log(this.playerComputer);
    }

    getAxis(){
        const axis = document.querySelector("#axisButton");
        return axis.className;
    }

    setShips(){
        let player = this.playerHuman;
        let gameboardObj = this.playerHuman.gameboard;
        let gameboard = document.querySelector("#gameboard");
        previewGameBoard(player);
        setAxisListener();
        previewSettingShipsListener(gameboard,player);
        setPlaceListener(gameboardObj,player);
    }
}

export {Game}