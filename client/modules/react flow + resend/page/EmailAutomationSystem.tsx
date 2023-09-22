import React from 'react';
import TopicBlock from "@/modules/example/TopicBlock";
import styles from "../../../styles/EmailAutomationSystem.module.scss";
import Form from "@/modules/react flow + resend/page/Form";

const EmailAutomationSystem = () => {


    return (
        <TopicBlock title={'Email automation system'} id={'EmailAutomationSystem'}>
            <main className={styles.main}>
                <header className={styles.header}>
                    <h1>
                        Email Outreach with ReactFlow and Resend
                    </h1>
                </header>
                <Form/>
            </main>
        </TopicBlock>
    );
};

export default EmailAutomationSystem;