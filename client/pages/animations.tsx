import React from 'react';
import MainLayout from "@/components/layout/MainLayout";
import AnimationsBlock from "@/modules/animations/AnimationsBlock";
import Header from "@/modules/header/Header";

const Animations = () => {
    return (
        <MainLayout>
            <Header/>
            <AnimationsBlock/>
        </MainLayout>
    );
};

export default Animations;