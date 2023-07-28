import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "@/modules/redux/store/configureStore";
import Tool from "@/modules/websocket/page/tools/Tool";


interface paintState {
    tool: null | Tool;
    canvas: null | HTMLCanvasElement;
    socket: null | WebSocket;
    sessionId: null | string;
    undoList: any[];
    redoList: any[];
    width: number;
    height: number;
    imgDataUrl: string | null;
}

const initialState: paintState = {
    tool: null,
    canvas: null,
    socket: null,
    sessionId: null,
    undoList: [],
    redoList: [],
    width: 500,
    height: 500,
    imgDataUrl: null
}

export const paintSlice = createSlice({
    name: 'paint',
    initialState,
    reducers: {
        setTool(state, action: PayloadAction<Tool>) {
            return {...state, tool: action.payload}
        },
        setCanvas(state, action: PayloadAction<HTMLCanvasElement>) {
            return {...state, canvas: action.payload}
        },
        setFillColor(state, action: PayloadAction<string>) {
            state.tool.fillColor = action.payload;
        },
        setStrokeColor(state, action: PayloadAction<string>) {
            state.tool.strokeColor = action.payload;
        },
        setLineWidth(state, action: PayloadAction<number>) {
            state.tool.lineWidth = action.payload;
        },
        setSocket(state, action: PayloadAction<null | WebSocket>) {
            state.socket = action.payload;
        },
        setSessionId(state, action: PayloadAction<null | string>) {
            state.sessionId = action.payload;
        },
        pushToUndo(state, action: PayloadAction<any>) {
            state.undoList.push(action.payload);
        },
        pushToRedo(state, action: PayloadAction<any>) {
            state.redoList.push(action.payload);
        },
        setWidth(state, action: PayloadAction<number>) {
            state.width = action.payload
        },
        setHeight(state, action: PayloadAction<number>) {
            state.height = action.payload
        },
        setImgDataUrl(state, action: PayloadAction<string>) {
          state.imgDataUrl = action.payload
        },
        undo({canvas, undoList, redoList}, action) {
            if(!canvas) return;
            let ctx = canvas.getContext('2d')
            if(!ctx) return;
            if(undoList.length > 0) {
                let dataUrl = undoList.pop()
                redoList.push(canvas.toDataURL())
                let img = new Image();
                img.src = dataUrl;
                img.onload = () => {
                    if(ctx) {
                        ctx.clearRect(0, 0, canvas.width, canvas.height)
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
                    }
                }
            }
        },
        redo({canvas, undoList, redoList}, action) {
            if(!canvas) return;
            let ctx = canvas.getContext('2d')
            if(redoList.length > 0) {
                let dataUrl = redoList.pop()
                undoList.push(canvas.toDataURL())
                let img = new Image();
                img.src = dataUrl;
                img.onload = () => {
                    if(ctx) {
                        ctx.clearRect(0, 0, canvas.width, canvas.height)
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
                    }
                }
            }
        }
    }
})

export const selectPaint = (state: RootState) => state.paint;

export const {setTool, setCanvas, setFillColor, setStrokeColor, setLineWidth, setWidth, setHeight, setImgDataUrl, pushToRedo, pushToUndo, undo, redo, setSocket, setSessionId} = paintSlice.actions;

export default paintSlice.reducer;