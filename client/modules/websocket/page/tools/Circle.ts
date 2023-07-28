import Tool from "@/modules/websocket/page/tools/Tool";

export default class Circle extends Tool {
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
        if(this.canvas) {
            this.canvas.onmousedown = this.mouseDownHandler.bind(this);
            this.canvas.ontouchstart = this.touchStartHandler.bind(this);
            this.canvas.onmouseup = this.canvas.ontouchend = this.canvas.ontouchcancel = this.mouseUpHandler.bind(this);
            this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
            this.canvas.ontouchmove = this.touchMoveHandler.bind(this);
        }
    }

    mouseUpHandler() {
        this.mouseDown = false
    }
    mouseDownHandler(e: MouseEvent) {
        if(!this.ctx) return;
        this.mouseDown = true;
        let rect = this.canvas.getBoundingClientRect()
        this.ctx.beginPath()
        this.startX = e.clientX - rect.left;
        this.startY = e.clientY - rect.top;
        this.saved = this.canvas.toDataURL();
    }

    touchStartHandler(e: TouchEvent) {
        if(!this.ctx) return;
        this.mouseDown = true;
        let rect = this.canvas.getBoundingClientRect()
        this.ctx.beginPath()
        this.startX = e.touches[0].clientX - rect.left;
        this.startY = e.touches[0].clientY - rect.top;
        this.saved = this.canvas.toDataURL();
        return false;
    }

    mouseMoveHandler(e: MouseEvent) {
        if(this.mouseDown) {
            let rect = this.canvas.getBoundingClientRect()
            let currentX = e.clientX - rect.left;
            let currentY = e.clientY - rect.top;
            let width = currentX - this.startX;
            let height = currentY - this.startY;
            let radius = Math.pow(width, 2) + Math.pow(height, 2);
            radius = Math.sqrt(radius);
            this.draw(this.startX, this.startY, radius)
        }
    }

    touchMoveHandler(e: TouchEvent) {
        if(this.mouseDown) {
            let rect = this.canvas.getBoundingClientRect()
            let currentX = e.touches[0].clientX - rect.left;
            let currentY = e.touches[0].clientY - rect.top;
            let width = currentX - this.startX;
            let height = currentY - this.startY;
            let radius = Math.pow(width, 2) + Math.pow(height, 2);
            radius = Math.sqrt(radius);
            this.draw(this.startX, this.startY, radius)
        }
    }

    draw(x: number, y: number, r: number) {
        if(this.ctx) {
            const img = new Image();
            img.src = this.saved;
            img.onload = () => {
                if(this.ctx) {
                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                    this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
                    this.ctx.beginPath();
                    this.ctx.arc(x, y, r, 0, 2 * Math.PI);
                    this.ctx.fill();
                    this.ctx.stroke();
                }

            }
        }
    }
}