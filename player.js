function createPlayer (Colors) {

    let PlayerToMove = 0;
    let HowManyRollsIfUnsuccessfull = 3;

    let afterMove = (HasMoved,WasSix) => {
        if (Men.finished(Colors[PlayerToMove])) {
            Clovece.appendToPlan(Note.drawWinner(Colors[PlayerToMove]));
            return;
        }
        if (HasMoved && !WasSix) {
            PlayerToMove++;
            if (PlayerToMove === 4) {PlayerToMove = 0;}
            HowManyRollsIfUnsuccessfull = 3;
        }
        if (!HasMoved) {
            HowManyRollsIfUnsuccessfull = HowManyRollsIfUnsuccessfull - 1;
            if (HowManyRollsIfUnsuccessfull === 0) {
                PlayerToMove++;
                if (PlayerToMove === 4) {PlayerToMove = 0;}
                HowManyRollsIfUnsuccessfull = 3;
            }
        }
        Dice.roll(Colors[PlayerToMove],this.move);
    }

    this.move = (DiceNumber) =>{
        const Color = Colors[PlayerToMove];
        const MenThatCanMove = Men.whoCanMove(Color,DiceNumber); 
        if (MenThatCanMove.length === 0) {afterMove(false,false);}
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
                    afterMove(true,true);
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
                            if (DiceNumber === 6) {afterMove(true,true);}
                            else {afterMove(true,false);}
                        }
                    }
                    ,300);
                }
            }
        }
    }

    let constructor = () => {}
    constructor();
}