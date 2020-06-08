const DivHra = document.createElement("div");
DivHra.className = "divHra";
// const SVG_NS = 'http://www.w3.org/2000/svg';
const SvgClovece = document.createElementNS(SVG_NS, "svg");
    SvgClovece.setAttribute("class","svgHra");
    SvgClovece.setAttribute("height","100%");
    SvgClovece.setAttribute("width","100%");

document.body.appendChild(DivHra);
DivHra.appendChild(SvgClovece);

Men.getValues(Plan.Colors,Plan.Path);
Player.getValues(Plan.Colors);

SvgClovece.appendChild(Plan.draw());
SvgClovece.appendChild(Dice.draw());
Men.create();
SvgClovece.appendChild(Men.draw());

Dice.roll(Player.move);

