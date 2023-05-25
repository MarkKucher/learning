import {ReactNode} from "react";

export const loadSeveralItems = (item: ReactNode, times: number): ReactNode[] => {
    const items = [];
    for (let i = 0; i < times; i++) {
        items.push(item)
    }
    return items;
}