function createDice () {

    let Dots = [
            {cx:"30", cy:"30", r:"2"},
            {cx:"20", cy:"40", r:"2"},
            {cx:"40", cy:"20", r:"2"},
            {cx:"20", cy:"20", r:"2"},
            {cx:"40", cy:"40", r:"2"},
            {cx:"20", cy:"30", r:"2"},
            {cx:"40", cy:"30", r:"2"}
        ];
    
    let DiceNumber = 1;
    let SvgDice = null;
    
    let create = () => {
        SvgDice = createSvg("svg",{x:"320", y:"320"})
    
        const Rect = {
            x:"5", y:"5", rx:"10", ry:"10", width:"50", height:"50",
            stroke:"#b35900", fill:"#ffcc99", "stroke-width": "5"
        }
        SvgDice.appendChild(createSvg("rect",Rect));
        
        
        for (const Dot of Dots) {
            Dot.svgElement = createSvg("circle",Dot);
            SvgDice.appendChild(Dot.svgElement);
        }
    }

    let set = () => {
        const VisibleDots = {
            1: [0],
            2: [1,2],
            3: [0,1,2],
            4: [1,2,3,4],
            5: [0,1,2,3,4],
            6: [1,2,3,4,5,6] 
        };
        for (const DotNumber of [0,1,2,3,4,5,6]){
            Dots[DotNumber].svgElement.setAttribute("opacity","0");
        }
        for (const DotNumber of VisibleDots[DiceNumber]) {
            Dots[DotNumber].svgElement.setAttribute("opacity","1");
        }
    }
    
    this.roll = (Color,callback) => {
        let DiceRuns = false;
        let RunDice = null;
        setTimeout( ()=>{Note.showToPlay(Color);},100);
        
        function click () {
            
            if(DiceRuns){
                clearInterval(RunDice);
                DiceRuns = false;
                SvgDice.removeEventListener("click",click);
                callback(DiceNumber);
            } else {
                Note.hideToPlay();
                RunDice = setInterval(() => {
                    DiceNumber++;
                    if (DiceNumber === 7) {DiceNumber = 1};
                    set();
                },10);
                DiceRuns = true;
            }
        }
        SvgDice.addEventListener("click",click);
    }

    let constructor = () => {
        create();
        set();
        Clovece.appendToPlan(SvgDice);
    }

    constructor();
}