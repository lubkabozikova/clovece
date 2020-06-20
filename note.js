function createNote () {
    
    let SvgToplay = null;
    let TextToPlay = createSvg("text", {});

    let createTextToPlay = (Color) => {
        let Line1 = createSvg("tspan",{x:"150",y:"50",style:"font: 40px arial",fill:Color,stroke:Color,"text-anchor":"middle"});
        Line1.appendChild(document.createTextNode(Color + " to play"));
        TextToPlay.appendChild(Line1);
        let Line2 = createSvg("tspan",{x:"150",y:"100",style:"font: 30px arial","text-anchor":"middle"});
        Line2.appendChild(document.createTextNode("click the dice"));
        TextToPlay.appendChild(Line2);
    }
    
    let createToPlay = () => {
        let Color = null;
        SvgToplay = createSvg("svg",{x:"200",y:"120",opacity:"0.70"});
        SvgToplay.appendChild(createSvg("rect", {width:"300",height:"200",fill:"orange",stroke:"brown"}));
        let Dart = createSvg("polygon",{points:"150,190 135,170 145,175 140,115 160,115 155,175 165,170",fill:"red",stroke:"red"});
        SvgToplay.appendChild(Dart);
        SvgToplay.appendChild(TextToPlay);
        createTextToPlay(Color);
    }

    this.showToPlay = (Color) => {
        TextToPlay.removeChild(TextToPlay.childNodes[0]);
        TextToPlay.removeChild(TextToPlay.childNodes[0]);
        createTextToPlay(Color);
        Clovece.appendToPlan(SvgToplay);
    }

    this.hideToPlay = () => {
        Clovece.removeFromPlan(SvgToplay);
    }

    let SvgWinner = null;
    let WinnerAnimationInterval = null;

    let createWinner = (Color) => {
        SvgWinner = createSvg("svg",{x:"100",y:"100",opacity:"0.9"});
        SvgWinner.appendChild(createSvg("rect", {width:"500",height:"300",fill:"orange",stroke:"brown"}));
        let Text = {
            Winner : {
                properties : {x:"250",y:"80",style:"font: 60px arial",fill:Color,stroke:Color,"text-anchor":"middle"},
                text : Color.toString() + " has won!!!"
            },
            PlayAgain : {
                properties : {x:"260",y:"150",style:"font: 40px arial"},
                text : "Play again"
            }
        }
        for (TextElement in Text) {
            Text[TextElement].SvgElement = createSvg("text", Text[TextElement].properties);
            Text[TextElement].SvgElement.appendChild(document.createTextNode(Text[TextElement].text));
            SvgWinner.appendChild(Text[TextElement].SvgElement);
        }
        Text.PlayAgain.SvgElement.addEventListener("click", () => {
            clearInterval(WinnerAnimationInterval);
            Clovece.removeFromPlan(SvgWinner);
            Men.set();
            Dice.roll(Plan.colors()[0],Player.move);
        })
    }

    let createWinnerAnimation = (Color) => {
        let WinnerAnimation = createSvg("svg",{x:"50",y:"100","text-anchor":"middle"});
        WinnerAnimation.appendChild(createSvg("path",{d:"M 50,170 a 30,5 0 0,0 60,0 l -23,-74 a 18,18 0 1,0 -14,0 Z",fill:Color}));
        WinnerAnimation.appendChild(createSvg("polygon", {points:"62,165 71,168 77,100",fill:"white",stroke:"white"}));
        let MovingHands = {
            Down : {
                Left : "M 70,110 L 45,90 L 60,60 L 45,90 Z",
                Right : "M 90,110 L 115,90 L 100,60 L 115,90 Z",
                Cup : "M 44,57 v -30 a 50,30 0 0,1 35,18 l 20,2 l 3,-20 l 0,40 l -3,-20 l -20,2 a 50,30 0 0,1 -35,18 Z"
            },
            Up : {
                Left : "M 70,110 L 50,85 L 60,55 L 50,85 Z",
                Right : "M 90,110 L 110,85 L 100,55 L 110,85 Z",
                Cup : "M 44,52 v -30 a 50,30 0 0,1 35,18 l 20,2 l 3,-20 l 0,40 l -3,-20 l -20,2 a 50,30 0 0,1 -35,18 Z"
            },
            SvgElement : {}
        };
        for (Part in MovingHands.Down) {
            MovingHands.SvgElement[Part] = createSvg("path",{d:MovingHands.Down[Part]});
            WinnerAnimation.appendChild(MovingHands.SvgElement[Part]);
        }
        MovingHands.SvgElement.Left.setAttribute("stroke-width","5");
        MovingHands.SvgElement.Right.setAttribute("stroke-width","5");
        MovingHands.SvgElement.Cup.setAttribute("fill","yellow");
        SvgWinner.appendChild(WinnerAnimation);

        let State = "Down";
        function change () {
            if (State === "Down") {State = "Up";}
            else {if (State === "Up") {State = "Down";}}
            for (Part in MovingHands[State]) {
                MovingHands.SvgElement[Part].setAttribute("d",MovingHands[State][Part]);
            }
        }
        WinnerAnimationInterval = setInterval(()=>{change();},200);
        
    }
    
    
    this.showWinner = (Color) => {
        createWinner(Color);
        createWinnerAnimation(Color);
        
        Clovece.appendToPlan(SvgWinner);
    }

    

    let constructor = () => {
        createToPlay();
    }
    constructor();
}