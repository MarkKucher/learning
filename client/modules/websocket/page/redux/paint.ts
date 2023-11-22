import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "@/modules/redux/store/configureStore";
import Tool from "@/modules/websocket/page/tools/Tool";


interface paintState {
    tool: Tool;
    canvas: HTMLCanvasElement;
    socket: WebSocket;
    sessionId: null | string;
    undoList: any[];
    redoList: any[];
    width: number;
    height: number;
    imgDataUrl: string | null;
}

const initialState: paintState = {
    tool: {} as Tool,
    canvas: {} as HTMLCanvasElement,
    socket: {} as WebSocket,
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
            // @ts-ignore
            state.tool = action.payload
        },
        setCanvas(state, action: PayloadAction<HTMLCanvasElement>) {
            // @ts-ignore
            state.canvas = action.payload
        },
        setFillColor(state, action: PayloadAction<string>) {
            if(state.tool) state.tool.fillColor = action.payload;
        },
        setStrokeColor(state, action: PayloadAction<string>) {
            if(state.tool) state.tool.strokeColor = action.payload;
        },
        setLineWidth(state, action: PayloadAction<number>) {
            if(state.tool) state.tool.lineWidth = action.payload;
        },
        setSocket(state, action: PayloadAction<WebSocket>) {
            state.socket = action.payload;
        },
        setSessionId(state, action: PayloadAction<null | string>) {
            state.sessionId = action.payload;
        },
        setWidth(state, action: PayloadAction<number>) {
            state.width = action.payload
        },
        setHeight(state, action: PayloadAction<number>) {
            state.height = action.payload
        },
    }
})

export const selectPaint = (state: RootState) => state.paint;

export const {setTool, setCanvas, setFillColor, setStrokeColor, setLineWidth, setWidth, setHeight, setSocket, setSessionId} = paintSlice.actions;

export default paintSlice.reducer;