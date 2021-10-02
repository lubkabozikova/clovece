const Clovece = new createClovece();

const Note = new createNote();
const Plan = new createPlan();
const Men = new createMen(Plan.colors(),Plan.path());
const Dice = new createDice();
const Player = new createPlayer(Plan.colors());

Dice.roll(Plan.colors()[0],Player.move);