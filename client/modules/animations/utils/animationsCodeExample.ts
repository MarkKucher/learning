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
    gestures: '',
    path: '',
}