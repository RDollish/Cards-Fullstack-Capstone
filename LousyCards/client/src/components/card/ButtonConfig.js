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
      </div>
      </div>
    );
  }
  
  export default ButtonConfig;