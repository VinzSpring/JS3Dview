import {Camera} from "./Camera.js";


export class Controller {

    constructor(canvas, camera) {
        this.canvas = canvas;
        this.camera = camera;
        canvas.onkeydown = (e)=>this.on_key_down(e);
        this.sensitivity = 0.05;
    }

    static to_key_code(char) {

        return char.toUpperCase().charCodeAt(0);
    }

    on_key_down(e) {
        console.log("!!!!");
        switch (e.keyCode) {
            case 38:
                this.on_arrow_up();
                break;
            case 40:
                this.on_arrow_down();
                break;
            case 39:
                this.on_arrow_right();
                break;
            case 37:
                this.on_arrow_left();
                break;
            case Controller.to_key_code('S'):
                this.on_camera_down();
                break;
            case Controller.to_key_code('W'):
                console.log("w");
                this.on_camera_up();
                break;
            case Controller.to_key_code('A'):
                this.on_camera_left();
                break;
            case Controller.to_key_code('D'):
                this.on_camera_right();
                break;

        }
    }

    on_arrow_up() {
        let n = this.camera.rotate(30, 0, 0, this.camera.rotation[0], this.camera.rotation[1], this.camera.rotation[2]);
        console.log(n);
        this.camera.position[0] += n[0];
        this.camera.position[1] += n[1];
        this.camera.position[2] += n[2];
        console.log("up");
    }

    on_arrow_down() {
        let n = this.camera.rotate(30, 0, 0, this.camera.rotation[0], this.camera.rotation[1], this.camera.rotation[2]);
        console.log(n);
        this.camera.position[0] -= n[0];
        this.camera.position[1] -= n[1];
        this.camera.position[2] -= n[2];
    }

    on_arrow_left() {
        this.camera.position[1] += 5;
    }

    on_camera_up() {
        this.camera.rotation[0] += this.sensitivity;
    }

    on_camera_down() {
        this.camera.rotation[0] -= this.sensitivity;
    }

    on_camera_right() {
        this.camera.rotation[1] += this.sensitivity;
    }

    on_camera_left() {
        this.camera.rotation[1] -= this.sensitivity;
    }


    on_arrow_right() {
        this.camera.position[1] -= 5;
    }
}


export class Renderer {

    constructor(canvas) {
        this.canvas = canvas;
        this.camera = new Camera(250);
        this.ctx = canvas.getContext("2d");
        this.line_buffer = [];
        this.controller = new Controller(canvas, this.camera);
    }

    commit(lines) {

        this.line_buffer.push(...lines)
    }

    flush() {
        this.line_buffer = [];
    }

    draw() {

        let lines_transformed = [];
        for (let line of this.line_buffer) {

            lines_transformed.push(
                [
                    this.camera.project(this.canvas, line[0][0], line[0][1], line[0][2]),
                    this.camera.project(this.canvas, line[1][0], line[1][1], line[1][2])
                ]
            )
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.beginPath();
        this.ctx.strokeStyle="white";
        for (let line of lines_transformed) {

            if (line[0] == null || line[1] == null || line[0][0] == null || line[1][1] == null) {
                continue;
            }

            this.ctx.moveTo(line[0][0], line[0][1]);
            this.ctx.lineTo(line[1][0], line[1][1]);
        }
        this.ctx.stroke();
    }
}