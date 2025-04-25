import { Ship } from "../../modules/ship"

it("Ship increase hit count",()=>{
    let ship = new Ship(3);
    ship.hit();
    expect(ship.hitCount).toBe(1);
})

it("Ship sunked",()=>{
    let ship = new Ship(3);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
})