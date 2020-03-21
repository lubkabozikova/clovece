var divHra = document.createElement("div");
divHra.className = "divHra";

const SVG_NS = 'http://www.w3.org/2000/svg';

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
var Colors = ["red","green","blue","yellow"];
var Homes = ["110,180","520,110","590,520","180,590"];
var SpecialCenters = [
    ["50,290","110,350","170,350","230,350","290,350"],
    ["410,50","350,110","350,170","350,230","350,290"],
    ["650,410","590,350","530,350","470,350","410,350"],
    ["290,650","350,590","350,530","350,470","350,410"]
];

var polygonPoints = Centers[0];
for (let index = 1; index < Centers.length; index++) {
    polygonPoints = polygonPoints + " " + Centers[index];
    }

var svgHra = document.createElementNS(SVG_NS, "svg");
svgHra.className = "svgHra";
    svgHra.setAttribute("height","100%");
    svgHra.setAttribute("width","100%");

document.body.appendChild(divHra);
divHra.appendChild(svgHra);

var planCiara = document.createElementNS(SVG_NS, "polygon");
    planCiara.setAttribute("points",polygonPoints);
    planCiara.setAttribute("fill-opacity","0");
    planCiara.setAttribute("stroke","black");
    planCiara.setAttribute("stroke-width","3");

function newCircle(cx, cy, r, fill){
    let planCircle = document.createElementNS(SVG_NS, "circle");
        planCircle.setAttribute("cx",cx);
        planCircle.setAttribute("cy",cy);
        planCircle.setAttribute("r",r);
        planCircle.setAttribute("fill", fill);
        planCircle.setAttribute("stroke", "black");
        planCircle.setAttribute("stroke-width", "3");
    svgHra.appendChild(planCircle);
}

svgHra.appendChild(planCiara);

for (let index = 0; index < Centers.length; index++) {
    let X = Centers[index].split(",");
    newCircle(X[0],X[1],"25","white");
}

for (let index = 0; index < Colors.length; index++) {
    let X = Homes[index].split(",");
    newCircle(X[0],X[1],"70",Colors[index]);
    const a = 28;
    newCircle((+X[0] -a).toString(),(+X[1] -a).toString(),"25","white");
    newCircle((+X[0] -a).toString(),(+X[1] +a).toString(),"25","white");
    newCircle((+X[0] +a).toString(),(+X[1] -a).toString(),"25","white");
    newCircle((+X[0] +a).toString(),(+X[1] +a).toString(),"25","white");
    for (let j = 0; j < SpecialCenters[index].length; j++) {
        X = SpecialCenters[index][j].split(",");
        newCircle(X[0],X[1],"25",Colors[index]);
    }
}

