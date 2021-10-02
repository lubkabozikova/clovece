function createPlan () {
    const Plan = {};
    let getValues = () => {
        Plan.Colors = ["red","green","blue","yellow"],
        Plan.Centers = [
            "50,290","110,290","170,290","230,290",
            "290,290","290,230","290,170","290,110",
            "290,50","350,50",
            "410,50","410,110","410,170","410,230",
            "410,290","470,290","530,290","590,290",
            "650,290","650,350",
            "650,410","590,410","530,410","470,410",
            "410,410","410,470","410,530","410,590",
            "410,650","350,650",
            "290,650","290,590","290,530","290,470",
            "290,410","230,410","170,410","110,410",
            "50,410","50,350"
        ],
        Plan.Homes = ["110,180","520,110","590,520","180,590"],
        Plan.StartGoals = [
            ["50,290","110,350","170,350","230,350","290,350"],
            ["410,50","350,110","350,170","350,230","350,290"],
            ["650,410","590,350","530,350","470,350","410,350"],
            ["290,650","350,590","350,530","350,470","350,410"]
        ]
    }

    
    const Path = {};
    let createPath = () => {
        const SmallCircleOffset = 28;
        for (const [index,Color] of Plan.Colors.entries()) {
            Path[Color] = [];
            const Coordinates = Plan.Homes[index].split(",");
            Path[Color].push((+Coordinates[0] -SmallCircleOffset).toString() +","+ (+Coordinates[1] -SmallCircleOffset).toString());   
            Path[Color].push((+Coordinates[0] -SmallCircleOffset).toString() +","+ (+Coordinates[1] +SmallCircleOffset).toString());
            Path[Color].push((+Coordinates[0] +SmallCircleOffset).toString() +","+ (+Coordinates[1] -SmallCircleOffset).toString());
            Path[Color].push((+Coordinates[0] +SmallCircleOffset).toString() +","+ (+Coordinates[1] +SmallCircleOffset).toString());
            const Start = Plan.Centers.findIndex((Place) => Place === Plan.StartGoals[index][0]);
            Path[Color] = [...Path[Color], ...Plan.Centers.slice(Start,Plan.Centers.length), ...Plan.Centers.slice(0,Start)];
            Path[Color] = [...Path[Color], ...Plan.StartGoals[index].slice(1,5)];
        }
    }
    
    
    let SvgPlan = null;
    let create = () => {
        //encapsulating svg
        SvgPlan = createSvg("svg",{});
        // ciara, zaklad planu
        let PolygonPoints = Plan.Centers[0];
        for (const Center of Plan.Centers) {
            PolygonPoints = PolygonPoints + " " + Center;
        }
        SvgPlan.appendChild(createSvg("polygon",{points:PolygonPoints, "fill-opacity":"0"}));
        
        function newCircle(cx, cy, r, fill){
            SvgPlan.appendChild(createSvg("circle",{"cx":cx,"cy":cy,"r":r,"fill":fill}));
        }
        
        // kruzky na plane
        for (const Center of Plan.Centers) {
            const Coordinates = Center.split(",");
            newCircle(Coordinates[0],Coordinates[1],"25","white");
        }
        // farebne kruzky
        for (let index = 0; index < Plan.Colors.length; index++) {
            const Coordinates = Plan.Homes[index].split(",");
            //velky kruh s domcekmi
            newCircle(Coordinates[0],Coordinates[1],"70",Plan.Colors[index]);
            const SmallCircleOffset = 28;
            //domceky
            newCircle((+Coordinates[0] -SmallCircleOffset).toString(),(+Coordinates[1] -SmallCircleOffset).toString(),"25","white");
            newCircle((+Coordinates[0] -SmallCircleOffset).toString(),(+Coordinates[1] +SmallCircleOffset).toString(),"25","white");
            newCircle((+Coordinates[0] +SmallCircleOffset).toString(),(+Coordinates[1] -SmallCircleOffset).toString(),"25","white");
            newCircle((+Coordinates[0] +SmallCircleOffset).toString(),(+Coordinates[1] +SmallCircleOffset).toString(),"25","white");
            //ciele
            for (let j = 0; j < Plan.StartGoals[index].length; j++) {
                const GoalCoordinates = Plan.StartGoals[index][j].split(",");
                newCircle(GoalCoordinates[0],GoalCoordinates[1],"25",Plan.Colors[index]);
            }
        }
    }
    
    this.path = () => {
        return Path;
    }
    this.colors = () => {
        return Plan.Colors;
    }
    
    let constructor = () => {
        getValues();
        createPath();
        create();
        Clovece.appendToPlan(SvgPlan);
    }

    constructor();
}