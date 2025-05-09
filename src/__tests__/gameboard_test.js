import { Gameboard } from "../../modules/gameboard";
import { Ship } from "../../modules/ship";

it("Gameboard matrix",()=>{
    let gameboard = new Gameboard()
    expect(gameboard.board).toEqual(
        [
            ["","","","","","","","","",""],
            ["","","","","","","","","",""],
            ["","","","","","","","","",""],
            ["","","","","","","","","",""],
            ["","","","","","","","","",""],
            ["","","","","","","","","",""],
            ["","","","","","","","","",""],
            ["","","","","","","","","",""],
            ["","","","","","","","","",""],
            ["","","","","","","","","",""]
        ]
    )
})

it("Place ship in x axis",()=>{
    let gameboard = new Gameboard();
    let ship = new Ship(3);
    gameboard.place("00",ship,"x");
    expect(gameboard.board).toContainEqual([ship,ship,ship,"","","","","","",""]);
})

it("Place ship in y axis",()=>{
    let gameboard = new Gameboard();
    let ship = new Ship(3);
    gameboard.place("00",ship,"y");
    expect(gameboard.board).toContainEqual(
        [ship,"","","","","","","","",""],
        [ship,"","","","","","","","",""],
        [ship,"","","","","","","","",""]
    );
})

it("Received attack hit", ()=>{
    let gameboard = new Gameboard();
    let ship = new Ship(3);
    gameboard.place("00",ship,"x");
    gameboard.receiveAttack("01");
    expect(ship.hitCount).toBe(1);
    expect(gameboard.board).toContainEqual(
        [ship,"hit",ship,"","","","","","",""]
    );
})

it("Received attack miss", ()=>{
    let gameboard = new Gameboard();
    let ship = new Ship(3);
    gameboard.place("00",ship,"x");
    gameboard.receiveAttack("03");
    expect(gameboard.board).toContainEqual(
        [ship,ship,ship,"miss","","","","","",""]
    );
})

it("All ships sunk",()=>{
    let gameboard = new Gameboard();
    let ship = new Ship(3);
    gameboard.place("00",ship,"x");
    gameboard.receiveAttack("00");
    gameboard.receiveAttack("01");
    gameboard.receiveAttack("02");
    expect(gameboard.areAllSunk()).toBe(true);
})

it("Not all ships sunk",()=>{
    let gameboard = new Gameboard();
    let ship = new Ship(3);
    gameboard.place("00",ship,"x");
    gameboard.receiveAttack("00");
    gameboard.receiveAttack("01");
    expect(gameboard.areAllSunk()).toBe(false);
})