const Men = {};

Men.getValues = (Colors,Path) => {
    Men.Colors = Colors;
    Men.Path = Path;
}

Men.drawMan = (Color,Place) => {
    const Coordinates = Place.split(",");
    const SvgMan = document.createElementNS(SVG_NS,"svg");
    SvgMan.setAttribute("x",(+Coordinates[0]-15).toString());
    SvgMan.setAttribute("y",(+Coordinates[1]-35).toString());
    SvgMan.setAttribute("width","30")
    
    const Ellipse = document.createElementNS(SVG_NS, "ellipse");
    Ellipse.setAttribute("cx","15");
    Ellipse.setAttribute("cy","40");
    Ellipse.setAttribute("rx","15");
    Ellipse.setAttribute("ry","5");
    Ellipse.setAttribute("fill",Color);
    SvgMan.appendChild(Ellipse);
    const Head = document.createElementNS(SVG_NS, "circle");
    Head.setAttribute("cx","15");
    Head.setAttribute("cy","15");
    Head.setAttribute("r","10");
    Head.setAttribute("fill",Color);
    SvgMan.appendChild(Head);
    const Polygon = document.createElementNS(SVG_NS, "polygon");
    Polygon.setAttribute("points","0,40 30,40 15,15");
    Polygon.setAttribute("fill",Color);
    SvgMan.appendChild(Polygon);
    const Line = document.createElementNS(SVG_NS, "line");
    Line.setAttribute("x1","3");
    Line.setAttribute("y1","40");
    Line.setAttribute("x2","27");
    Line.setAttribute("y2","40");
    Line.setAttribute("stroke", Color);
    Line.setAttribute("stroke-width", "4");
    SvgMan.appendChild(Line);
    const Circle = document.createElementNS(SVG_NS, "circle");
    Circle.setAttribute("cx","15");
    Circle.setAttribute("cy","15");
    Circle.setAttribute("r","7");
    Circle.setAttribute("fill",Color);
    Circle.setAttribute("stroke",Color);
    SvgMan.appendChild(Circle);
    const Light = document.createElementNS(SVG_NS, "polygon");
    Light.setAttribute("points","8,38 12,39 13,25");
    Light.setAttribute("fill","white");
    Light.setAttribute("stroke","white")
    SvgMan.appendChild(Light);
    return SvgMan;
}

Men.create = () => {
    for (const Color of Men.Colors) {
        Men[Color] = [{},{},{},{}];
        for (let index = 0; index < 4; index++) {
            Men[Color][index].picture = Men.drawMan(Color,Men.Path[Color][index]);
            Men[Color][index].place = index;
            Men[Color][index].color = Color;
        }
    }
}



Men.draw = () => {
    const SvgMen = document.createElementNS(SVG_NS,"svg");
    for (const Color of Men.Colors) {
        for (let index = 0; index < 4; index++) {
            SvgMen.appendChild(Men[Color][index].picture);
        }
    }
    return SvgMen;
}

Men.move = (Man,Place) => {
    const Coordinates = Men.Path[Man.color][Place].split(",");
    Man.picture.setAttribute("x",(+Coordinates[0]-15).toString());
    Man.picture.setAttribute("y",(+Coordinates[1]-35).toString());
    Man.place = Place;
}

Men.throwOut = (Man) => {
    for (const Color of Men.Colors) {
        if (!(Color === Man.color)) {
            for (const [index,OtherMan] of Men.Path[Color].entries()) {
                if (Men.Path[Man.color][Man.place] === Men.Path[Color][OtherMan.place]) {
                    Men.move(OtherMan,index);
                }
            }
        }
    }
}

Men.finished = (Color) => {
    for (const Man of Men[Color]) {
        if (Man.place < 44) {return false;}
    }
    return true;
}

Men.whoCanMove = (Color,DiceNumber) => {
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





//!!! zavolat najskor Men.getValues(Colors,Path) s hodnotami z casti Plan
//volat Men.draw, vystup je svg, ktore treba pripnut k hernemu planu
//Men.move(Man,Place) pohne panacika na miesto
//Men.throwOut(Man) vyhodi panacika ak je nejaky na mieste, kam stupi Man
//Men.finished(Color) zisti, ci hrac danej farby ma vsetkych panacikov v cieli, vrati true alebo false
