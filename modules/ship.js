class Ship{
    constructor(name,length){
        this.name = name;
        this.length = length;
        this.hitCount = 0;
    }

    hit(){
        this.hitCount++;
    }

    isSunk(){
        return this.length === this.hitCount
    }
}


export {Ship}