import CardForm from "./CardForm";

function ConfigBtn(props) {
    const btnClass = "fa fa-" + props.icon + " btn";
    return (
      <button 
        className={btnClass}
        id={props.id}
        onClick={(props.click)? props.click:undefined}
      >
        <span>{props.text}</span>
      </button>
    )
  }

//   const handleSave = () => {
//     const canvasData = JSON.stringify(canvas.toJSON());
//     // save canvasData to your database 
// }

function ButtonConfig(props) {
    return (
    <div className="navigation-bar">
      <div className="App-Config">         
            <ConfigBtn icon="plus-circle" id="btn-addText" text=" TEXT"/>
            <ConfigBtn icon="plus-circle" id="btn-addParty" text="🥳"/>
            <ConfigBtn icon="plus-circle" id="btn-addHeart" text="❤️"/>
            <ConfigBtn icon="plus-circle" id="btn-addKiss" text="😘"/>
            <ConfigBtn icon="plus-circle" id="btn-addAww" text="🥺"/>
            <ConfigBtn icon="plus-circle" id="btn-addSurprise" text="🙀"/>
            <ConfigBtn icon="plus-circle" id="btn-addLol" text="😹"/>
            <ConfigBtn icon="plus-circle" id="btn-addHands" text="🙌"/>
            <ConfigBtn icon="plus-circle" id="btn-addHurt" text="🤕"/>
            <ConfigBtn icon="plus-circle" id="btn-addHug" text="🤗"/>
      </div>
      </div>
    );
  }
  
  export default ButtonConfig;