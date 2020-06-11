// const DivHra = document.createElement("div");
// DivHra.className = "divHra";
// const SvgClovece = createSvg("svg", {class:"svgHra",height:"100%",width:"100%"});

// document.body.appendChild(DivHra);
// DivHra.appendChild(SvgClovece);

const Clovece = new createClovece();
const Dice = new createDice();
const Plan = new createPlan();
const Men = new createMen(Plan.colors(),Plan.path());
const Player = new createPlayer(Plan.colors());
const Note = new createNote();

// SvgClovece.appendChild(Plan.draw());
// SvgClovece.appendChild(Men.draw());
// SvgClovece.appendChild(Dice.draw());

Dice.roll(Plan.colors()[0],Player.move);
// SvgClovece.appendChild(Note.drawWinner("red"));
