import Tool from "@/modules/websocket/page/tools/Tool";

export default class Line extends Tool {
    mouseDown: boolean = false;
    rect = this.canvas.getBoundingClientRect();
    saved: any;
    startX: number = 0;
    startY: number = 0;

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
        this.mouseDown = false
    }

    mouseDownHandler(e: MouseEvent) {
        this.mouseDown = true;
        let rect = this.canvas.getBoundingClientRect()
        this.startX = e.clientX - rect.left;
        this.startY = e.clientY - rect.top;
        if(this.ctx) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.startX, this.startY)
        }
        this.saved = this.canvas.toDataURL();
    }

    touchStartHandler(e: TouchEvent) {
        this.mouseDown = true;
        let rect = this.canvas.getBoundingClientRect()
        this.startX = e.touches[0].clientX - rect.left;
        this.startY = e.touches[0].clientY - rect.top;
        if(this.ctx) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.startX, this.startY)
        }
        this.saved = this.canvas.toDataURL();
        return false;
    }

    mouseMoveHandler(e: MouseEvent) {
        if(this.mouseDown) {
            let rect = this.canvas.getBoundingClientRect()
            let currentX = e.clientX - rect.left;
            let currentY = e.clientY - rect.top;
            this.draw(currentX, currentY)
        }
    }

    touchMoveHandler(e: TouchEvent) {
        if(this.mouseDown) {
            let rect = this.canvas.getBoundingClientRect()
            let currentX = e.touches[0].clientX - rect.left;
            let currentY = e.touches[0].clientY - rect.top;
            this.draw(currentX, currentY)
        }
    }

    draw(x: number, y: number) {
        if(this.ctx) {
            const img = new Image();
            img.src = this.saved;
            img.onload = () => {
                if(this.ctx) {
                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                    this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.startX, this.startY)
                    this.ctx.lineTo(x, y);
                    this.ctx.stroke();
                }

            }
        }
    }
}