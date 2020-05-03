var divHra = document.createElement("div");
divHra.className = "divHra";
const SVG_NS = 'http://www.w3.org/2000/svg';
var svgHra = document.createElementNS(SVG_NS, "svg");
    // svgHra.className = "svgHra";
    svgHra.setAttribute("height","100%");
    svgHra.setAttribute("width","100%");

document.body.appendChild(divHra);
divHra.appendChild(svgHra);

var Colors = ["red","green","blue","yellow"];
var Centers = [
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
];
var Homes = ["110,180","520,110","590,520","180,590"];
var StartGoals = [
    ["50,290","110,350","170,350","230,350","290,350"],
    ["410,50","350,110","350,170","350,230","350,290"],
    ["650,410","590,350","530,350","470,350","410,350"],
    ["290,650","350,590","350,530","350,470","350,410"]
];



function drawPlan(Colors, Centers, Homes, StartGoals){
    //encapsulating svg
    var svgPlan = document.createElementNS(SVG_NS,"svg");
    svgHra.appendChild(svgPlan);
    // ciara, zaklad planu
    var polygonPoints = Centers[0];
    for (let index = 1; index < Centers.length; index++) {
        polygonPoints = polygonPoints + " " + Centers[index];
        }
    var planCiara = document.createElementNS(SVG_NS, "polygon");
        planCiara.setAttribute("points",polygonPoints);
        planCiara.setAttribute("fill-opacity","0");
        planCiara.setAttribute("stroke","black");
        planCiara.setAttribute("stroke-width","3");

    function newCircle(cx, cy, r, fill){
        var planCircle = document.createElementNS(SVG_NS, "circle");
            planCircle.setAttribute("cx",cx);
            planCircle.setAttribute("cy",cy);
            planCircle.setAttribute("r",r);
            planCircle.setAttribute("fill", fill);
            planCircle.setAttribute("stroke", "black");
            planCircle.setAttribute("stroke-width", "3");
        svgPlan.appendChild(planCircle);
    }

    svgPlan.appendChild(planCiara);

        // kruzky na plane
    for (let index = 0; index < Centers.length; index++) {
        let Coordinates = Centers[index].split(",");
        newCircle(Coordinates[0],Coordinates[1],"25","white");
    }
        // farebne kruzky
    for (let index = 0; index < Colors.length; index++) {
        let Coordinates = Homes[index].split(",");
        newCircle(Coordinates[0],Coordinates[1],"70",Colors[index]);
        const a = 28;
        newCircle((+Coordinates[0] -a).toString(),(+Coordinates[1] -a).toString(),"25","white");
        newCircle((+Coordinates[0] -a).toString(),(+Coordinates[1] +a).toString(),"25","white");
        newCircle((+Coordinates[0] +a).toString(),(+Coordinates[1] -a).toString(),"25","white");
        newCircle((+Coordinates[0] +a).toString(),(+Coordinates[1] +a).toString(),"25","white");
        for (let j = 0; j < StartGoals[index].length; j++) {
            let Coordinates = StartGoals[index][j].split(",");
            newCircle(Coordinates[0],Coordinates[1],"25",Colors[index]);
        }
    }
}

var svgMan = [[],[],[],[]];
function drawMan(Place,ColorNumber,ManNumber){
    var Coordinates = Place.split(",");
    
    svgMan[ManNumber][ColorNumber] = document.createElementNS(SVG_NS, "svg");
        svgMan[ManNumber][ColorNumber].setAttribute("x",(+Coordinates[0]-15).toString());
        svgMan[ManNumber][ColorNumber].setAttribute("y",(+Coordinates[1]-35).toString());
        svgMan[ManNumber][ColorNumber].setAttribute("width","30")
    svgHra.appendChild(svgMan[ManNumber][ColorNumber]);

    var Color = Colors[ColorNumber];
    var Ellipse = document.createElementNS(SVG_NS, "ellipse");
        Ellipse.setAttribute("cx","15");
        Ellipse.setAttribute("cy","40");
        Ellipse.setAttribute("rx","15");
        Ellipse.setAttribute("ry","5");
        Ellipse.setAttribute("fill",Color);
        Ellipse.setAttribute("stroke","black");
        Ellipse.setAttribute("stroke-width","3");
    svgMan[ManNumber][ColorNumber].appendChild(Ellipse);
    var Head = document.createElementNS(SVG_NS, "circle");
        Head.setAttribute("cx","15");
        Head.setAttribute("cy","15");
        Head.setAttribute("r","10");
        Head.setAttribute("fill",Color);
        Head.setAttribute("stroke","black");
        Head.setAttribute("stroke-width","3");
    svgMan[ManNumber][ColorNumber].appendChild(Head);
    var Polygon = document.createElementNS(SVG_NS, "polygon");
        Polygon.setAttribute("points","0,40 30,40 15,15");
        Polygon.setAttribute("fill",Color);
        Polygon.setAttribute("stroke","black");
        Polygon.setAttribute("stroke-width","3");
    svgMan[ManNumber][ColorNumber].appendChild(Polygon);
    var Line = document.createElementNS(SVG_NS, "line");
        Line.setAttribute("x1","3");
        Line.setAttribute("y1","40");
        Line.setAttribute("x2","27");
        Line.setAttribute("y2","40");
        Line.setAttribute("stroke", Color);
        Line.setAttribute("stroke-width", "4");
    svgMan[ManNumber][ColorNumber].appendChild(Line);
    var Circle = document.createElementNS(SVG_NS, "circle");
        Circle.setAttribute("cx","15");
        Circle.setAttribute("cy","15");
        Circle.setAttribute("r","7");
        Circle.setAttribute("fill",Color);
        Circle.setAttribute("stroke",Color);
        Circle.setAttribute("stroke-width","3");
    svgMan[ManNumber][ColorNumber].appendChild(Circle);
    var Light = document.createElementNS(SVG_NS, "polygon");
        Light.setAttribute("points","8,38 12,39 13,25");
        Light.setAttribute("fill","white");
        Light.setAttribute("stroke","white")
    svgMan[ManNumber][ColorNumber].appendChild(Light);
}



function moveMan(Man,Place){
    var Coordinates = Place.split(",");
    Man.setAttribute("x",(+Coordinates[0]-15).toString());
    Man.setAttribute("y",(+Coordinates[1]-35).toString());
}

drawPlan(Colors, Centers, Homes, StartGoals);
drawMan(Centers[0],0,0);

// i = 0;
// setInterval(() => {
//     moveMan(svgMan,Centers[i]);
//     i++;
//     if (i===Centers.length){i = 0};
// } , 500);