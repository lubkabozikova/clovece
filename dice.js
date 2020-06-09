const Dice = {};

Dice.Dots = [
        {cx:"30", cy:"30", r:"2"},
        {cx:"20", cy:"40", r:"2"},
        {cx:"40", cy:"20", r:"2"},
        {cx:"20", cy:"20", r:"2"},
        {cx:"40", cy:"40", r:"2"},
        {cx:"20", cy:"30", r:"2"},
        {cx:"40", cy:"30", r:"2"}
    ];

Dice.Number = 1;

Dice.create = () => {
    const SvgDice = createSvg("svg",{x:"320", y:"320"})

    const Rect = {
        x:"5", y:"5", rx:"10", ry:"10", width:"50", height:"50",
        stroke:"#b35900", fill:"#ffcc99", "stroke-width": "5"
    }
    SvgDice.appendChild(createSvg("rect",Rect));
    
    for (const Dot of Dice.Dots) {
        Dot.svgElement = createSvg("circle",Dot);
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