function createMen (Colors,Path) {
    let drawMan = (Color,Place) => {
        const Coordinates = Place.split(",");
        const SvgMan = createSvg("svg", {width:"30",x:(+Coordinates[0]-15).toString(),y:(+Coordinates[1]-35).toString()});
        SvgMan.appendChild(createSvg("ellipse", {cx:"15",cy:"40",rx:"15",ry:"5",fill:Color}));
        SvgMan.appendChild(createSvg("circle", {cx:"15",cy:"15",r:"10",fill:Color}));
        SvgMan.appendChild(createSvg("polygon", {points:"0,40 30,40 15,15",fill:Color}));
        SvgMan.appendChild(createSvg("line", {x1:"3",y1:"40",x2:"27",y2:"40",stroke:Color,"stroke-width":"4"}));
        SvgMan.appendChild(createSvg("circle", {cx:"15",cy:"15",r:"7",fill:Color,stroke:Color}));
        SvgMan.appendChild(createSvg("polygon", {points:"8,38 12,39 13,25",fill:"white",stroke:"white"}));
        return SvgMan;
    }
    
    const Men = {};
    let SvgMen = null;
    let create = () => {
        SvgMen = createSvg("svg", {});
        for (const Color of Colors) {
            Men[Color] = [{},{},{},{}];
            for (let index = 0; index < 4; index++) {
                Men[Color][index].picture = drawMan(Color,Path[Color][index]);
                Men[Color][index].place = index;
                Men[Color][index].color = Color;
                SvgMen.appendChild(Men[Color][index].picture);
            }
        }
    }
    
    // this.draw = () => {
    //     return SvgMen;
    // }
    
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