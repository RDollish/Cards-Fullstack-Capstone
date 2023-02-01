import React, { useRef, useEffect, useState } from "react";
import { fabric } from "fabric";
import ButtonConfig from "./ButtonConfig";
import './CardForm.css'

const CardForm = () => {
    const [canvas, setCanvas] = useState("");

    const handleAddText = (canv) => {
        addText(canv, "New Text");
    };

    const addNewText = (canv) => {
        var addTextBtn = document.querySelector("#btn-addText");
        addTextBtn.onclick = () => {
            handleAddText(canv);
        };
        handleAddText(canv);
    };

    const addText = (canv, text) => {
        var textbox = new fabric.Textbox(text, {
            originY: "center",
            originX: "center",
            left: 400,
            top: 530,
            width: 320,
            fontSize: 28,
            fill: "#000",
            fontWeight: 800,
            textAlign: "center",
            cornerSize: 12,
            transparentCorners: false,
            selectable: true
        });
        canv.add(textbox);
        canv.setActiveObject(textbox);
        return textbox;
    };


    const initCanvas = () => {
        const mainCanvas = new fabric.Canvas("mainCanvas", {
            height: 800,
            width: 800,
            backgroundColor: "#ffede8",
            preserveObjectStacking: true,
            controlsAboveOverlay: true
        });

        addNewText(mainCanvas);

        return mainCanvas;
    };

    useEffect(() => {
        canvas === ""? setCanvas(initCanvas()): console.log("poo");
    }, []);

    return (
        <div className="canvas-container">
            <canvas id="mainCanvas"/ >
 
            <ButtonConfig />
        </div>
    );
};

export default CardForm;
