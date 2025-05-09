import "../styles/index.css";
import { Game } from "../modules/game";

let setNameForm = document.querySelector("#setNameForm");
let setNameModal = document.querySelector("#setNameModal");

setNameForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    setNameModal.style.display = "none";

    let gameObject = new Game(e);
    gameObject.setShips();
})

//optimize code



