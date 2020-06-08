let Player = {};

Player.getValues = (Colors) => {
    Player.Colors = Colors;
}

Player.ToMove = 0;
Player.HowManyRollsIfUnsuccessfull = 3;

Player.afterMove = (HasMoved,WasSix) => {
    if (Men.finished(Player.Colors[Player.ToMove])) {
        console.log("VICTORY!!!");
        return;
    }
    if (HasMoved && !WasSix) {
        Player.ToMove++;
        if (Player.ToMove === 4) {Player.ToMove = 0;}
        Player.HowManyRollsIfUnsuccessfull = 3;
    }
    if (!HasMoved) {
        Player.HowManyRollsIfUnsuccessfull = Player.HowManyRollsIfUnsuccessfull - 1;
        if (Player.HowManyRollsIfUnsuccessfull === 0) {
            Player.ToMove++;
            if (Player.ToMove === 4) {Player.ToMove = 0;}
            Player.HowManyRollsIfUnsuccessfull = 3;
        }
    }
    Dice.roll(Player.move);
}

Player.move = (DiceNumber) =>{
    const Color = Player.Colors[Player.ToMove];
    const MenThatCanMove = Men.whoCanMove(Color,DiceNumber); 
    if (MenThatCanMove.length === 0) {Player.afterMove(false,false);}
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
            if (Man.place < 4) {
                Men.move(Man,4);
                Men.throwOut(Man);
                Player.afterMove(true,true);
            }
            else {
                let MovedBy = 0;
                let IntervalMove = null;
                IntervalMove = setInterval ( () => {
                    Men.move(Man,Man.place + 1);
                    MovedBy++;
                    if (MovedBy === DiceNumber) {
                        clearInterval(IntervalMove);
                        Men.throwOut(Man);
                        if (DiceNumber === 6) {Player.afterMove(true,true);}
                        else {Player.afterMove(true,false);}
                    }
                }
                ,300);
            }
        }
    }
}




// najskor Player.getValues(Colors) s Plan.Colors
// Player.move pouzit do Dice.roll ako callback