import React, { useRef, useEffect, useState } from "react";
import { fabric } from "fabric";
import ButtonConfig from "./ButtonConfig";
import './CardForm.css'
import SaveCard from "./CardSubmit";

let checker = 0
const CardForm = () => {
    const [canvas, setCanvas] = useState("");

    const handleAddText = (canv) => {
        addText(canv);
    };

    const addNewText = (canv) => {
        var addTextBtn = document.querySelector("#btn-addText");
        addTextBtn.onclick = () => {
            handleAddText(canv);
        };
        // handleAddText(canv);

    };

    const addText = (canv) => {
        var textbox = new fabric.Textbox("New Text", {
            originY: "center",
            originX: "center",
            left: 305,
            top: 330,
            width: 320,
            fontSize: 28,
            fill: "#000",
            fontWeight: 800,
            objectCaching: false,
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

        if (checker === 0) {
            const mainCanvas = new fabric.Canvas("mainCanvas", {
                height: 400,
                width: 600,
                centeredScaling: true,
                backgroundColor: "#ffede8",
                preserveObjectStacking: true,
                controlsAboveOverlay: true
            });

            addNewText(mainCanvas)

            checker = checker + 1
            return mainCanvas;
        }
        else { return }
    };

    useEffect(() => {
        setCanvas(initCanvas());
    }, []);

    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerColor = '#00dba1';
    fabric.Object.prototype.borderColor = '#b8b8b8';
    fabric.Object.prototype.cornerStyle = 'circle';
    fabric.Object.prototype.controls.deleteControl = new fabric.Control({
        x: 0.5,
        y: -0.5,
        offsetY: -20,
        offsetX: 20,
        cursorStyle: 'pointer',
        mouseUpHandler: deleteObject,
        render: renderIcon,
        cornerSize: 24
    });
    fabric.Textbox.prototype.controls.deleteControl = new fabric.Control({
        x: 0.5,
        y: -0.5,
        offsetY: -20,
        offsetX: 20,
        cursorStyle: 'pointer',
        mouseUpHandler: deleteObject,
        render: renderIcon,
        cornerSize: 24
    });
    var deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";
    var img = document.createElement('img');
    img.src = deleteIcon;

    function deleteObject(eventData, transform) {
        var target = transform.target;
        var canvas = target.canvas;
        canvas.remove(target);
        canvas.requestRenderAll();
    }

    function renderIcon(ctx, left, top, styleOverride, fabricObject) {
        var size = this.cornerSize;
        ctx.save();
        ctx.translate(left, top);
        ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
        ctx.drawImage(img, -size / 2, -size / 2, size, size);
        ctx.restore();
    }

    return (

        <div className="canvas-container">
            <canvas id="mainCanvas"></canvas>
            <ButtonConfig />
            <SaveCard />
        </div>
    );
};

export default CardForm;
