import Tool from "@/modules/websocket/page/tools/Tool";

export default class Brush extends Tool {
    mouseDown: boolean = false;

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.listen();
    }

    listen() {
        this.canvas.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas.ontouchstart = this.touchStartHandler.bind(this);
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
        this.canvas.ontouchmove = this.touchMoveHandler.bind(this);
        this.canvas.onmouseup = this.canvas.onmouseover = this.canvas.ontouchcancel = this.canvas.ontouchend = this.mouseLoose.bind(this);
    }

    mouseLoose() {
        this.mouseDown = false;
    }

    mouseDownHandler(e: MouseEvent) {
        if(this.ctx) {
            this.mouseDown = true
            let rect = this.canvas.getBoundingClientRect()
            this.ctx.beginPath()
            this.ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top)
        }
    }

    mouseMoveHandler(e: MouseEvent) {
        if(this.mouseDown) {
            let rect = this.canvas.getBoundingClientRect()
            this.draw(e.clientX - rect.left, e.clientY - rect.top)
        }
    }

    touchStartHandler(e: TouchEvent) {
        if(this.ctx) {
            this.mouseDown = true
            let rect = this.canvas.getBoundingClientRect()
            this.ctx.beginPath()
            this.ctx.moveTo(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top)
        }
        return false;
    }

    touchMoveHandler(e: TouchEvent) {
        if(this.mouseDown) {
            let rect = this.canvas.getBoundingClientRect()
            this.draw(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top)
        }
    }

    draw(x: number, y: number) {
        if(this.ctx) {
            this.ctx.lineTo(x, y)
            this.ctx.stroke()
        }
    }
}