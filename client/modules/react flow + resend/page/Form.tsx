import React, {useCallback, useEffect, useMemo, useState} from 'react';
import styles from "@/styles/EmailAutomationSystem.module.scss";
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
    const [isProcessing, setIsProcessing] = useState(false);
    const initialNodes = useSelector(selectNodes);
    const initialEdges = useSelector(selectEdges);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const nodeTypes = useMemo(() => ({task: Task}), []);

    useEffect(() => {
        const process = async () => {
            setEmail("");
            setSubject("");
            const tasks = nodes.map(node => node.data.value);

            for (let i = 0; i < tasks.length; i++) {
                axios.post("/api/send", {
                    body: JSON.stringify({
                        email,
                        subject,
                        text: tasks[i], // map all nodes to a string array
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "Allow": "GET, POST, PUT, DELETE, OPTIONS"
                    },
                }).catch((err) => {
                        alert(`Encountered an error ❌`);
                        console.error(err);
                    });
                await timer(300000)
            }

            setIsProcessing(false)
        }
        if(isProcessing) {
            process()
        }
    }, [isProcessing])

    useEffect(() => {
        setNodes(initialNodes)
        setEdges(initialEdges)
    }, [initialNodes, setNodes, initialEdges, setEdges])

    const onConnect = useCallback(
        (params: any) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    )


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsProcessing(true);
        alert('Sent to processing. Closing page will stop automation')
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
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
            <label style={{marginTop: '25px'}} className={styles.label} htmlFor={'subject'}>Subject</label>
            <input
                name={'subject'}
                id={'subject'}
                className={styles.input}
                value={subject}
                onChange={(e) => {setSubject(e.target.value)}}
                required
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
            <button className={styles.submitBtn}>
                START AUTOMATION
            </button>
        </form>
    );
};

export default Form;