function createClovece () {
    const DivHra = document.createElement("div");
    DivHra.className = "divHra";
    const SvgClovece = createSvg("svg", {class:"svgHra",height:"100%",width:"100%"});

    document.body.appendChild(DivHra);
    DivHra.appendChild(SvgClovece);
    
    this.appendToPlan = (Svg) => {
        SvgClovece.appendChild(Svg);
    }
    
    this.removeFromPlan = (Svg) => {
        SvgClovece.removeChild(Svg);
    }

    let constructor = () => {
    }

    constructor();
}

