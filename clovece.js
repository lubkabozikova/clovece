const DivHra = document.createElement("div");
DivHra.className = "divHra";
const SVG_NS = 'http://www.w3.org/2000/svg';
const SvgClovece = document.createElementNS(SVG_NS, "svg");
    SvgClovece.setAttribute("class","svgHra");
    SvgClovece.setAttribute("height","100%");
    SvgClovece.setAttribute("width","100%");

document.body.appendChild(DivHra);
DivHra.appendChild(SvgClovece);

function getPlanValues () {
    const PlanValues = {
        Colors : ["red","green","blue","yellow"],
        Centers : [
            "50,290","110,290","170,290","230,290",
            "290,290","290,230","290,170","290,110",
            "290,50","350,50",
            "410,50","410,110","410,170","410,230",
            "410,290","470,290","530,290","590,290",
            "650,290","650,350",
            "650,410","590,410","530,410","470,410",
            "410,410","410,470","410,530","410,590",
            "410,650","350,650",
            "290,650","290,590","290,530","290,470",
            "290,410","230,410","170,410","110,410",
            "50,410","50,350"
        ],
        Homes : ["110,180","520,110","590,520","180,590"],
        StartGoals : [
            ["50,290","110,350","170,350","230,350","290,350"],
            ["410,50","350,110","350,170","350,230","350,290"],
            ["650,410","590,350","530,350","470,350","410,350"],
            ["290,650","350,590","350,530","350,470","350,410"]
        ]
    };
    PlanValues.Path = {};
    const SmallCircleOffset = 28;
    for (const [index,Color] of PlanValues.Colors.entries()) {
        PlanValues.Path[Color] = [];
        const Coordinates = PlanValues.Homes[index].split(",");
        PlanValues.Path[Color].push((+Coordinates[0] -SmallCircleOffset).toString() +","+ (+Coordinates[1] -SmallCircleOffset).toString());   
        PlanValues.Path[Color].push((+Coordinates[0] -SmallCircleOffset).toString() +","+ (+Coordinates[1] +SmallCircleOffset).toString());
        PlanValues.Path[Color].push((+Coordinates[0] +SmallCircleOffset).toString() +","+ (+Coordinates[1] -SmallCircleOffset).toString());
        PlanValues.Path[Color].push((+Coordinates[0] +SmallCircleOffset).toString() +","+ (+Coordinates[1] +SmallCircleOffset).toString());
        const Start = PlanValues.Centers.findIndex((Place) => Place === PlanValues.StartGoals[index][0]);
        PlanValues.Path[Color] = [...PlanValues.Path[Color], ...PlanValues.Centers.slice(Start,PlanValues.Centers.length), ...PlanValues.Centers.slice(0,Start)];
        PlanValues.Path[Color] = [...PlanValues.Path[Color], ...PlanValues.StartGoals[index].slice(1,5)];
    }
    return PlanValues;
}

function drawPlan (PlanValues) {
        //encapsulating svg
    const svgPlan = document.createElementNS(SVG_NS,"svg");
        // ciara, zaklad planu
    let PolygonPoints = PlanValues.Centers[0];
    for (const Center of PlanValues.Centers) {
        PolygonPoints = PolygonPoints + " " + Center;
        }
    const PlanCiara = document.createElementNS(SVG_NS, "polygon");
        PlanCiara.setAttribute("points",PolygonPoints);
        PlanCiara.setAttribute("fill-opacity","0");
    svgPlan.appendChild(PlanCiara);

    function newCircle(cx, cy, r, fill){
        const PlanCircle = document.createElementNS(SVG_NS, "circle");
            PlanCircle.setAttribute("cx",cx);
            PlanCircle.setAttribute("cy",cy);
            PlanCircle.setAttribute("r",r);
            PlanCircle.setAttribute("fill", fill);
        svgPlan.appendChild(PlanCircle);
    }

        // kruzky na plane
    for (const Center of PlanValues.Centers) {
        const Coordinates = Center.split(",");
        newCircle(Coordinates[0],Coordinates[1],"25","white");
    }
        // farebne kruzky
    for (let index = 0; index < PlanValues.Colors.length; index++) {
        const Coordinates = PlanValues.Homes[index].split(",");
            //velky kruh s domcekmi
        newCircle(Coordinates[0],Coordinates[1],"70",PlanValues.Colors[index]);
        const SmallCircleOffset = 28;
            //domceky
        newCircle((+Coordinates[0] -SmallCircleOffset).toString(),(+Coordinates[1] -SmallCircleOffset).toString(),"25","white");
        newCircle((+Coordinates[0] -SmallCircleOffset).toString(),(+Coordinates[1] +SmallCircleOffset).toString(),"25","white");
        newCircle((+Coordinates[0] +SmallCircleOffset).toString(),(+Coordinates[1] -SmallCircleOffset).toString(),"25","white");
        newCircle((+Coordinates[0] +SmallCircleOffset).toString(),(+Coordinates[1] +SmallCircleOffset).toString(),"25","white");
            //ciele
        for (let j = 0; j < PlanValues.StartGoals[index].length; j++) {
            const GoalCoordinates = PlanValues.StartGoals[index][j].split(",");
            newCircle(GoalCoordinates[0],GoalCoordinates[1],"25",PlanValues.Colors[index]);
        }
    }
    return svgPlan;
}

function drawMan (Place,Color) {
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

function moveMan (MoveMan,MovePath,MovePlace) {
    const Coordinates = MovePath[MovePlace].split(",");
    MoveMan.picture.setAttribute("x",(+Coordinates[0]-15).toString());
    MoveMan.picture.setAttribute("y",(+Coordinates[1]-35).toString());
    MoveMan.place = MovePlace;
}

function throwOut (ThrowMan,ThrowPlan,ThrowColor) {
    for (const Color of ThrowPlan.Colors) {
        if (!(Color === ThrowColor)) {
            for (const Man of ThrowPlan.Men[Color]) {
                if (ThrowPlan.Path[ThrowColor][ThrowMan.place] === ThrowPlan.Path[Color][Man.place]) {
                    for (const index of [0,1,2,3]) {
                        let FreeSpace = true;
                        for (const OtherMan of ThrowPlan.Men[Color]) {
                            if (OtherMan.place === index) {FreeSpace = false;}
                        }
                        if (FreeSpace) {
                            moveMan(Man,ThrowPlan.Path[Color],index);
                            return;
                        }
                    }
                }
            }
        }
    }
}

function dice (DicePlan,callback) {
    const SvgDice = document.createElementNS(SVG_NS, "svg");
        SvgDice.setAttribute("x","320");
        SvgDice.setAttribute("y","320");
    SvgClovece.appendChild(SvgDice);

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
    
    const Dots = [
        {cx: "30", cy: "30"},
        {cx: "20", cy: "40"},
        {cx: "40", cy: "20"},
        {cx: "20", cy: "20"},
        {cx: "40", cy: "40"},
        {cx: "20", cy: "30"},
        {cx: "40", cy: "30"},
    ];
    for (const Dot of Dots) {
        Dot.svgElement = document.createElementNS(SVG_NS,"circle");
            Dot.svgElement.setAttribute("r","2");
            // Dot.svgElement.setAttribute("opacity","0");
            Dot.svgElement.setAttribute("cx", Dot.cx);
            Dot.svgElement.setAttribute("cy", Dot.cy);
        SvgDice.appendChild(Dot.svgElement);
    }
    
    function drawDice(Number){
        const visibleDots = {
            1: [0],
            2: [1,2],
            3: [0,1,2],
            4: [1,2,3,4],
            5: [0,1,2,3,4],
            6: [1,2,3,4,5,6] 
        };
        for (const DotNumber of [0,1,2,3,4,5,6]){
            Dots[DotNumber].svgElement.setAttribute("opacity","0");
        }
        for (const DotNumber of visibleDots[Number]) {
            Dots[DotNumber].svgElement.setAttribute("opacity","1");
        }
    }
    drawDice(1);

    let NumberOnDice = 1;
    let DiceRuns = false;
    let DiceCanGo = true;
    let PlayerToMove = 0;
    let HowManyTimesToRoll = 3;
    let RunDice = null;

    SvgDice.onclick = () => {
        if(!DiceCanGo){return;}
        if(DiceRuns){
            clearInterval(RunDice);
            DiceRuns = false;
            DiceCanGo = false;

            function afterPlayerHasPlayed (HasMoved,WasSix) {
                DiceCanGo = true;

                if (HasMoved && !WasSix) {
                    PlayerToMove++;
                    if (PlayerToMove === 4) {PlayerToMove = 0;}
                    HowManyTimesToRoll = 3;
                }
                if (!HasMoved) {
                    HowManyTimesToRoll = HowManyTimesToRoll - 1;
                    if (HowManyTimesToRoll === 0) {
                        PlayerToMove++;
                        if (PlayerToMove === 4) {PlayerToMove = 0;}
                        HowManyTimesToRoll = 3;
                    }
                }
            }
            callback(PlayerToMove,DicePlan,NumberOnDice,afterPlayerHasPlayed);
        } else {
            RunDice = setInterval(() => {
                NumberOnDice++;
                if (NumberOnDice === 7) {NumberOnDice = 1};
                drawDice(NumberOnDice);
            },10); 
            DiceRuns = true;
        }
    };
}

function player(PlayerPlayerToMove,PlayerPlan,DiceNumber,callback){

        const Color = PlayerPlan.Colors[PlayerPlayerToMove];

        //find out which men can move
        let MenThatCanMove = [];
        for (const Man of PlayerPlan.Men[Color]) {
            let FreeToGo = true;
            if (Man.place < 4) {
                if (DiceNumber < 6) {FreeToGo = false;}
                for (const OtherMan of PlayerPlan.Men[Color]) {
                    if (OtherMan.place === 4) {FreeToGo = false;}
                }
            }
            else {
                const PlaceToGo = Man.place + DiceNumber;
                if (PlaceToGo > 48) {FreeToGo = false;}
                for (const OtherMan of PlayerPlan.Men[Color]) {
                    if (OtherMan.place === PlaceToGo) {FreeToGo = false;}
                }
            }
            if (FreeToGo) {MenThatCanMove.push(Man);}
        }
        if (MenThatCanMove.length === 0) {callback(false,false);}
        //highlight them
        let Stroke = "orange";
        let Highlight = setInterval(() => {
            if (Stroke === "black") {Stroke = "orange";}
            else {Stroke = "black";}
            for (const Man of MenThatCanMove) {
                Man.picture.setAttribute("stroke",Stroke);
            }    
        },300);
        //stop highlight and move selected man
        for (const Man of MenThatCanMove) {
            Man.picture.onclick = () => {
                clearInterval(Highlight);
                for (const OneMan of MenThatCanMove) {
                    OneMan.picture.setAttribute("stroke","black");
                    OneMan.picture.onclick = () => {};
                }
                //move selected man

                // let WhereToMove = null;

                if (Man.place < 4) {
                    // WhereToMove = PlayerPlan.Path[Color][4];
                    
                    moveMan(Man,PlayerPlan.Path[Color],4);
                    throwOut(Man,PlayerPlan,Color);
                }
                else {
                    // WhereToMove = PlayerPlan.Path[Color][Man.place + DiceNumber];
                    let MovedBy = 0;
                    let IntervalMove = null;
                    IntervalMove = setInterval ( () => {
                        moveMan(Man,PlayerPlan.Path[Color],Man.place + 1);
                        MovedBy++;
                        if (MovedBy === DiceNumber) {
                            clearInterval(IntervalMove);
                            throwOut(Man,PlayerPlan,Color);
                        }
                    }
                    ,300);
                }
                
                if (DiceNumber === 6) {callback(true,true);}
                else {callback(true,false);}
            }
        }
    };

    // objekt vsetkych panacikov

function game(){

    const Plan = getPlanValues();
    
    SvgClovece.appendChild(drawPlan(Plan));
    Plan.Men = {};
    for (const Color of Plan.Colors) {
        Plan.Men[Color] = [{},{},{},{}];
        for (let index = 0; index < 4; index++) {
            Plan.Men[Color][index].picture = drawMan(Plan.Path[Color][index],Color);
            SvgClovece.appendChild(Plan.Men[Color][index].picture);
            Plan.Men[Color][index].place = index;
        }
    }
    
    dice(Plan,player);
}

game();