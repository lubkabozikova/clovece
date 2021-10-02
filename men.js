function createMen (Colors,Path) {
    let drawMan = (Color,Place) => {
        const Coordinates = Place.split(",");
        const SvgMan = createSvg("svg", {width:"30",x:(+Coordinates[0]-15).toString(),y:(+Coordinates[1]-35).toString()});
        SvgMan.appendChild(createSvg("path", {d:"M 0,40 a 15,5 0 1,0 30,0 l -10,-16 a 11,11 0 1,0 -10,0 Z",fill:Color}));
        SvgMan.appendChild(createSvg("polygon", {points:"8,38 12,39 13,25",fill:"white",stroke:"white"}));
        return SvgMan;
    }
    
    const Men = {};
    let SvgMen = null;
    let create = () => {
        SvgMen = createSvg("svg", {});
        for (const Color of Colors) {
            Men[Color] = [{},{},{},{}];
            for (index of [0,1,2,3]) {
                Men[Color][index].picture = drawMan(Color,Path[Color][index]);
                Men[Color][index].place = index;
                Men[Color][index].color = Color;
                SvgMen.appendChild(Men[Color][index].picture);
            }
        }
    }

    this.set = () => {
        for (const Color of Colors) {
            for (index of [0,1,2,3]) {
                this.move(Men[Color][index],index);
            }
        }
    }
    
    this.throwOut = (Man) => {
        for (const Color of Colors) {
            if (!(Color === Man.color)) {
                for (const [index,OtherMan] of Men[Color].entries()) {
                    if (Path[Man.color][Man.place] === Path[Color][OtherMan.place]) {
                        this.move(OtherMan,index);
                    }
                }
            }
        }
    }
    
    this.move = (Man,Place) => {
        const Coordinates = Path[Man.color][Place].split(",");
        Man.picture.setAttribute("x",(+Coordinates[0]-15).toString());
        Man.picture.setAttribute("y",(+Coordinates[1]-35).toString());
        Man.place = Place;
    }
    
    this.finished = (Color) => {
        for (const Man of Men[Color]) {
            if (Man.place < 44) {return false;}
        }
        return true;
    }
    
    this.whoCanMove = (Color,DiceNumber) => {
        let MenThatCanMove = [];
        for (const Man of Men[Color]) {
            let FreeToGo = true;
            if (Man.place < 4) {
                if (DiceNumber === 6) {
                    for (const OtherMan of Men[Color]) {
                        if (OtherMan.place === 4) {FreeToGo = false;}
                    }
                }
                else {FreeToGo = false;}
            }
            else {
                const PlaceToGo = Man.place + DiceNumber;
                if (PlaceToGo > 47) {FreeToGo = false;}
                for (const OtherMan of Men[Color]) {
                    if (OtherMan.place === PlaceToGo) {FreeToGo = false;}
                }
            }
            if (FreeToGo) {MenThatCanMove.push(Man);}
        }
        return MenThatCanMove;
    }
    
    let constructor = () => {
        create();
        Clovece.appendToPlan(SvgMen);
    }
    
    constructor();
}