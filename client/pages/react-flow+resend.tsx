import React from 'react';
import MainLayout from "@/components/layout/MainLayout";
import Header from "@/modules/header/Header";
import EmailAutomationSystem from "@/modules/react flow + resend/page/EmailAutomationSystem";

const ReactFlowResend = () => {
    return (
        <MainLayout>
            <Header/>
            <EmailAutomationSystem/>
        </MainLayout>
    );
};

export default ReactFlowResend;