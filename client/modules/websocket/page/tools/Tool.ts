export default class Tool {
    canvas;
    ctx;
    rect;
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.rect = this.canvas.getBoundingClientRect();
        this.destroyEvents();
    }

    static sendImage(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
        socket.readyState === socket.OPEN && socket.send(JSON.stringify({
            id: id,
            method: 'draw',
            src: canvas.toDataURL()
        }))
    }

    set fillColor(color: string) {
        if(this.ctx) this.ctx.fillStyle = color
    }

    set strokeColor(color: string) {
        if(this.ctx) this.ctx.strokeStyle = color
    }

    set lineWidth(width: number) {
        if(this.ctx) this.ctx.lineWidth = width;
    }

    destroyEvents() {
        if(this.canvas) {
            this.canvas.onmousedown = null;
            this.canvas.onmouseup = null;
            this.canvas.onmousemove = null;
            this.canvas.onmouseleave = null;
            this.canvas.onclick = null;
            this.canvas.ontouchstart = null;
            this.canvas.ontouchend = null;
        }
    }
}