import Tool from "@/modules/websocket/page/tools/Tool";

export default class Fill extends Tool {
    prevMode: GlobalCompositeOperation = this?.ctx?.globalCompositeOperation || 'source-over';

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.listen();
    }

    listen() {
        this.canvas.onclick = this.clickHandler.bind(this);
    }

    clickHandler(e: MouseEvent) {
        //e.clientX - this.rect.left, e.clientY - this.rect.top
        if(this.ctx) {
            this.ctx.fill()
        }
    }
}