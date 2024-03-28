import React, {useCallback, useEffect, useMemo, useState} from 'react';
import styles from "styles/EmailAutomationSystem.module.scss";
import ReactFlow, {addEdge, Background, Controls, useEdgesState, useNodesState} from "reactflow";
import {useSelector} from "react-redux";
import {selectEdges, selectNodes} from "@/modules/react flow + resend/redux/nodes";
import Task from "@/modules/react flow + resend/components/Task";
import "reactflow/dist/style.css"
import axios from "axios";
import {timer} from "@/helpers/timer";

const Form = () => {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const initialNodes = useSelector(selectNodes);
    const initialEdges = useSelector(selectEdges);
    const [isProcessing, setIsProcessing] = useState(false);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const nodeTypes = useMemo(() => ({task: Task}), []);
    const [delay, setDelay] = useState(60);

    const sendEmail = async () => {
        setEmail("");
        setSubject("");
        setIsProcessing(true);

        const tasks = nodes.map(node => node.data.value);

        for (let i = 0; i < tasks.length; i++) {
            axios.post("/api/send", {
                body: JSON.stringify({
                    email,
                    subject,
                    text: tasks[i],
                }),
                headers: {
                    "Content-Type": "application/json",
                    "Allow": "GET, POST, PUT, DELETE, OPTIONS"
                },
            }).catch((err) => {
                alert(`Encountered an error ❌`);
                console.error(err);
            });
            await timer(delay * 1000)
        }
        setIsProcessing(false)
    }

    useEffect(() => {
        setNodes(initialNodes)
        setEdges(initialEdges)
    }, [initialNodes, setNodes, initialEdges, setEdges])

    const onConnect = useCallback(
        (params: any) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    )

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        sendEmail()
        alert('Sent to processing. Closing page will stop automation')
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <label className={styles.label} htmlFor={'email'}>Email</label>
            <input
                id={'email'}
                name={'email'}
                type={'email'}
                className={styles.input}
                value={email}
                onChange={(e) => {setEmail(e.target.value)}}
                required
            />
            <label className={styles.label} htmlFor={'subject'}>Subject</label>
            <input
                name={'subject'}
                id={'subject'}
                className={styles.input}
                value={subject}
                onChange={(e) => {setSubject(e.target.value)}}
                required
            />
            <label className={styles.label} htmlFor={'delay'}>Delay (in seconds)</label>
            <input
                name={'delay'}
                id={'delay'}
                type={'number'}
                className={styles.input}
                value={delay}
                onChange={(e) => {setDelay(Number(e.target.value))}}
                min={0}
                max={9999}
            />
            <div className={styles.nodes}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                >
                    <Controls/>
                    <Background gap={12} size={5} />
                </ReactFlow>
            </div>
            <button disabled={isProcessing} className={styles.submitBtn}>
                {!isProcessing ? 'START AUTOMATION' : 'PROCESSING'}
            </button>
        </form>
    );
};

export default Form;