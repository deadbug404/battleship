import "../styles/index.css";
import { Game } from "../modules/game";

const setNameForm = document.querySelector("#setNameForm");
const setNameModal = document.querySelector("#setNameModal");
const confirmButton = document.querySelector("#confirmButton");

setNameForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    setNameModal.style.display = "none";

    let gameObject = new Game(e);
    gameObject.setShipsComputer();
    gameObject.setShips();
    confirmButton.addEventListener("click", e => gameObject.start());
})

//isColumnStreamValid x axis bug



