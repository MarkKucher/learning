export const framerMotionCodeExamples = {
    animation: 'const animation = {\n' +
        '        play: {\n' +
        '            rotate: [0, 360],\n' +
        '            scale: [0.8, 1.2, 0.8],\n' +
        '            borderRadius: [\'40%\', \'30%\', \'40%\'],\n' +
        '            transition: {\n' +
        '                repeat: Infinity,\n' +
        '                duration: 2,\n' +
        '            }\n' +
        '        },\n' +
        '        pause: {\n' +
        '            borderRadius: \'30%\',\n' +
        '            scale: 1,\n' +
        '        }\n' +
        '    }',
    variants: 'const container = {\n' +
        '    hidden: {\n' +
        '        opacity: 0\n' +
        '    },\n' +
        '    visible: {\n' +
        '        opacity: 1,\n' +
        '        transition: {\n' +
        '            delayChildren: 0.3,\n' +
        '            staggerChildren: 0.2\n' +
        '        }\n' +
        '    },\n' +
        '}\n' +
        '\n' +
        'const items = {\n' +
        '    hidden: {\n' +
        '        scale: 1,\n' +
        '        borderRadius: \'50%\',\n' +
        '        rotate: \'-90deg\',\n' +
        '        transition: {\n' +
        '            delay: 0.2\n' +
        '        }\n' +
        '    },\n' +
        '    visible: {\n' +
        '        scale: 1.3,\n' +
        '        borderRadius: \'10%\',\n' +
        '        rotate: \'0deg\',\n' +
        '        transition: {\n' +
        '            duration: 0.3,\n' +
        '            delayChildren: 1\n' +
        '        }\n' +
        '    }\n' +
        '}\n' +
        '\n' +
        'const mockContent = {\n' +
        '    hidden: {\n' +
        '        opacity: 0,\n' +
        '        transition: {\n' +
        '            duration: 0.1\n' +
        '        }\n' +
        '    },\n' +
        '    visible: {\n' +
        '        opacity: 1\n' +
        '    }\n' +
        '}',
    gestures: '' +
        '<motion.div\n' +
        '    transition={{stiffness: 200}}\n' +
        '    whileHover={{\n' +
        '       scale: 0.9,\n' +
        '       rotate: \'45deg\'\n' +
        '    }}\n' +
        '    whileTap={{\n' +
        '       scale: 0.8,\n' +
        '       rotate: \'90deg\'\n' +
        '    }}\n' +
        '/>',
    drag: '' +
        'const x = useMotionValue(0);\n' +
        'const y = useMotionValue(0);\n' +
        'const innerBackground = useTransform(x, [-150, 0, 150], [\'rgb(200, 50, 50)\', \'rgb(50, 200, 50)\', \'rgb(50, 50, 200)\'])\n' +
        'const outerBackground = useTransform(y, [-150, 0, 150], [\'rgb(50, 200, 50)\', \'rgb(50, 50, 200)\', \'rgb(200, 50, 50)\'])\n' +
        '\n' +
        'return (\n' +
        '    <div className={blockStyles.pageExample}>\n' +
        '        <motion.div\n' +
        '            style={{background: outerBackground, borderColor: innerBackground}}\n' +
        '            ref={constraintsRef}\n' +
        '            className={styles.constraints}\n' +
        '        >\n' +
        '            <motion.div\n' +
        '                style={{background: innerBackground, x, y}}\n' +
        '                className={styles.circle}\n' +
        '                drag\n' +
        '                dragConstraints={constraintsRef}\n' +
        '            />\n' +
        '        </motion.div>\n' +
        '    </div>\n' +
        ');',
    scroll: '' +
        '    const { scrollYProgress } = useScroll();\n' +
        '    const scale = useTransform(scrollYProgress, [0, 1], [0.2, 4]);\n' +
        '    const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);\n' +
        '    const move = useTransform(scrollYProgress, [0, 1], [30, 0]);\n' +
        '\n' +
        '    return (\n' +
        '        <div className={blockStyles.pageExample}>\n' +
        '            <motion.div\n' +
        '                style={{scale}}\n' +
        '            >\n' +
        '                <motion.div\n' +
        '                    style={{\n' +
        '                        rotate,\n' +
        '                        bottom: move,\n' +
        '                        right: move\n' +
        '                    }}\n' +
        '                />\n' +
        '            </motion.div>\n' +
        '        </div>\n' +
        '    );',
    path: '',
}