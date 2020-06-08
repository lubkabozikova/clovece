const Dice = {};

Dice.Dots = [
        {cx: "30", cy: "30"},
        {cx: "20", cy: "40"},
        {cx: "40", cy: "20"},
        {cx: "20", cy: "20"},
        {cx: "40", cy: "40"},
        {cx: "20", cy: "30"},
        {cx: "40", cy: "30"},
    ];

Dice.Number = 1;

Dice.create = () => {
    const SvgDice = document.createElementNS(SVG_NS, "svg");
        SvgDice.setAttribute("x","320");
        SvgDice.setAttribute("y","320");

    const Rect = document.createElementNS(SVG_NS,"rect");
        Rect.setAttribute("x","5");        
        Rect.setAttribute("y","5");
        Rect.setAttribute("width","50");
        Rect.setAttribute("height","50");
        Rect.setAttribute("rx","10");
        Rect.setAttribute("ry","10");
        Rect.setAttribute("stroke","#b35900");
        Rect.setAttribute("stroke-width","5");
        Rect.setAttribute("fill","#ffcc99");
    SvgDice.appendChild(Rect);
    
    for (const Dot of Dice.Dots) {
        Dot.svgElement = document.createElementNS(SVG_NS,"circle");
            Dot.svgElement.setAttribute("r","2");
            Dot.svgElement.setAttribute("cx", Dot.cx);
            Dot.svgElement.setAttribute("cy", Dot.cy);
        SvgDice.appendChild(Dot.svgElement);
    }
    Dice.set();
    return SvgDice;
}

Dice.set = () => {
    const VisibleDots = {
        1: [0],
        2: [1,2],
        3: [0,1,2],
        4: [1,2,3,4],
        5: [0,1,2,3,4],
        6: [1,2,3,4,5,6] 
    };
    for (const DotNumber of [0,1,2,3,4,5,6]){
        Dice.Dots[DotNumber].svgElement.setAttribute("opacity","0");
    }
    for (const DotNumber of VisibleDots[Dice.Number]) {
        Dice.Dots[DotNumber].svgElement.setAttribute("opacity","1");
    }
}

Dice.Svg = Dice.create();

Dice.draw = () => {
    return Dice.Svg;
}

Dice.roll = (callback) => {
    let DiceRuns = false;
    let RunDice = null;

    function click () {
        if(DiceRuns){
            clearInterval(RunDice);
            DiceRuns = false;
            Dice.Svg.removeEventListener("click",click);
            callback(Dice.Number);
        } else {
            RunDice = setInterval(() => {
                Dice.Number++;
                if (Dice.Number === 7) {Dice.Number = 1};
                Dice.set();
            },10);
            DiceRuns = true;
        }
    }
    Dice.Svg.addEventListener("click",click);
}

// volat iba Dice.draw, vystup je svg, ktore treba pripnut k hernemu planu
// a Dice.roll, kde callback ma za parameter cislo ktore padlo na kocke