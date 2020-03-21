var divHra = document.createElement("div");
divHra.className = "divHra";
    
var Centers = [
    "50,290","110,290","170,290","230,290","290,290",
    "290,230","290,170","290,110","290,50",
    "350,50","410,50",
    "410,110","410,170","410,230","410,290",
    "470,290","530,290","590,290","650,290",
    "650,350","650,410",
    "590,410","530,410","470,410","410,410",
    "410,470","410,530","410,590","410,650",
    "350,650","290,650",
    "290,590","290,530","290,470","290,410",
    "230,410","170,410","110,410","50,410",
    "50,350"];
// var CentersRed = []
// var CentersGreen
// var CentersBlue
// var CentersYellow
// var Homes

var polygonPoints = Centers[0];
for (let index = 1; index < Centers.length; index++) {
    polygonPoints = polygonPoints + " " + Centers[index];
    }

const SVG_NS = 'http://www.w3.org/2000/svg';
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

svgHra.appendChild(planCiara);

for (let index = 0; index < Centers.length; index++) {
    let X = Centers[index].split(",");
    let planCircle = document.createElementNS(SVG_NS, "circle");
        planCircle.setAttribute("cx",X[0]);
        planCircle.setAttribute("cy",X[1]);
        planCircle.setAttribute("r","25");
        planCircle.setAttribute("fill", "white");
        planCircle.setAttribute("stroke", "black");
        planCircle.setAttribute("stroke-width", "3");

    svgHra.appendChild(planCircle);
}

