let Note = {};

Note.draw = () => {
    let SvgNote = createSvg("svg",{x:"200",y:"100"});

    SvgNote.appendChild(createSvg("rect", {width:"300",height:"200",fill:"green",stroke:"brown"}));
    let Text = createSvg("text", {x:"100",y:"100",fill:"blue"});
    Text.appendChild(document.createTextNode("Blue to play"));
    SvgNote.appendChild(Text);

    return SvgNote;
}