import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "@/modules/redux/store/configureStore";

interface Node {
    id: string;
    type: string;
    position: {
        x: number;
        y: number;
    }
    data: {
        value: string;
    }
}

interface Edge {
    id: string;
    source: string;
    target: string;
}

const addNode = (object: Node): Node => ({
    id: `${Number(object.id) + 1}`,
    type: "task",
    position: {x: 0, y: object.position.y + 120},
    data: {value: ""}
});

const addEdge = (object: Node): Edge => ({
    id: `${object.id}->${Number(object.id) + 1}`,
    source: `${object.id}`,
    target: `${Number(object.id) + 1}`
})

interface nodesState {
    nodes: Node[];
    edges: Edge[];
}

const initialState: nodesState = {
    nodes: [
        {
            id: "1",
            type: "task",
            position: {x: 0, y: 0},
            data: { value: "" }
        }
    ],
    edges: []
}

export const nodeSlice = createSlice({
    name: "nodes",
    initialState,
    reducers: {
        pushToNodes: (state) => {
            let nodes = state.nodes;
            state.nodes = [...state.nodes, addNode(nodes[nodes.length - 1])]
            state.edges = [...state.edges, addEdge(nodes[nodes.length - 1])]
        },
        updateNodeValue: (state, action: PayloadAction<{id: string, value: string}>) => {
            let nodes = [...state.nodes];
            let objectIndex = nodes.findIndex((obj) => obj.id === action.payload.id);
            if(objectIndex !== -1) {
                state.nodes[objectIndex] = {
                    ...nodes[objectIndex],
                    data: {value: action.payload.value}
                }
            }
        }
    }
})

export const {updateNodeValue, pushToNodes} = nodeSlice.actions;

export const selectNodesState = (state: RootState) => state.nodes;

export const selectNodes = (state: RootState) => state.nodes.nodes;

export const selectEdges = (state: RootState) => state.nodes.edges;

export default nodeSlice.reducer;