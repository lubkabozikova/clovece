const DivHra = document.createElement("div");
DivHra.className = "divHra";
const SvgClovece = createSvg("svg", {class:"svgHra",height:"100%",width:"100%"});

document.body.appendChild(DivHra);
DivHra.appendChild(SvgClovece);

Men.getValues(Plan.Colors,Plan.Path);
Player.getValues(Plan.Colors);

SvgClovece.appendChild(Plan.draw());
SvgClovece.appendChild(Dice.draw());
Men.create();
SvgClovece.appendChild(Men.draw());

SvgClovece.appendChild(Note.draw());

// Dice.roll(Player.move);

