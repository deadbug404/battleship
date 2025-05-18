import "../styles/index.css";
import { Game } from "../modules/game";

let setNameForm = document.querySelector("#setNameForm");
let setNameModal = document.querySelector("#setNameModal");
let confirmButton = document.querySelector("#confirmButton");

setNameForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    setNameModal.style.display = "none";

    let gameObject = new Game(e);
    gameObject.setShipsComputer();
    gameObject.setShips();
    confirmButton.addEventListener("click", e => gameObject.start());
})

//optimize code
//in game features



