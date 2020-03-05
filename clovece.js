var divHra = document.createElement("div");
divHra.className = "divHra";
    
const SVG_NS = 'http://www.w3.org/2000/svg';
var svgHra = document.createElementNS(SVG_NS, "svg");
svgHra.className = "svgHra";

var planCircle = document.createElementNS(SVG_NS, "circle");
    // // planCircle.className = "plan";
    // planCircle.cx = "10";
    // planCircle.cy = "10";
    // planCircle.r = "5";

document.body.appendChild(divHra);
divHra.appendChild(svgHra);

// svgHra.setAttribute("width", "100");
// svgHra.setAttribute("height", "100");
svgHra.appendChild(planCircle);
planCircle.setAttribute("cx", "10");
planCircle.setAttribute("cy", "10");
planCircle.setAttribute("r", "5");
planCircle.setAttribute("fill", "white");
planCircle.setAttribute("stroke", "black");
planCircle.setAttribute("stroke-width", "2");
