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

    this.drawToPlay = (Color) => {
        TextToPlay.removeChild(TextToPlay.childNodes[0]);
        TextToPlay.removeChild(TextToPlay.childNodes[0]);
        createTextToPlay(Color);

        return SvgToplay;
    }

    this.drawWinner = (Color) => {
        let SvgWinner = createSvg("svg",{x:"100",y:"100",opacity:"0.9"});
        SvgWinner.appendChild(createSvg("rect", {width:"500",height:"300",fill:"orange",stroke:"brown"}));
        let Text = createSvg("text", {x:"250",y:"80",style:"font: 60px arial",fill:Color,stroke:Color,"text-anchor":"middle"})
        Text.appendChild(document.createTextNode(Color + " has won!!!"));
        SvgWinner.appendChild(Text);
        
        return SvgWinner;
    }

    

    let constructor = () => {
        createToPlay();
    }
    constructor();
}