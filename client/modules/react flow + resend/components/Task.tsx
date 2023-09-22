import React, {useState} from 'react';
import styles from "../../../styles/EmailAutomationSystem.module.scss";
import {selectNodes, updateNodeValue, pushToNodes} from "@/modules/react flow + resend/redux/nodes";
import {useDispatch, useSelector} from "react-redux";
import {Handle, Position} from "reactflow";

const Task: React.FC<{id: string}> = ({id}) => {
    const initialNodes = useSelector(selectNodes);
    const [value, setValue] = useState("");
    const dispatch = useDispatch();

    return (
        <>
            <Handle type={"target"} position={Position.Top}/>
            <div className={styles.task} id={'a'}>
                <input
                    type={'text'}
                    className={styles.taskValue}
                    required
                    onChange={(e) => {
                        setValue(e.target.value);
                        dispatch(updateNodeValue({id, value: e.target.value}))
                    }}
                    value={value}
                />
                {Number(id) === initialNodes.length && (
                    <button onClick={() => dispatch(pushToNodes())} className={styles.addBtn}>
                        ADD NODE
                    </button>
                )}
            </div>
            <Handle type={"source"} position={Position.Bottom} id={"a"}/>
        </>
    );
};

export default Task;