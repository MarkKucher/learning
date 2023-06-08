export const reduxDescription = {
    createTheme: 'In this example, thanks to redux toolkit you can create theme to this  site. Additionally redux persist store your' +
        ' theme in local storage. Here are also some error handlers.',
    todo: 'I am too lazy to write description for this one.'
}

export const reduxCodeExamples = {
    createTheme: 'const create = () => {\n' +
        '        if(!name) {\n' +
        '            setError(\'Theme must have name\')\n' +
        '            return null;\n' +
        '        }\n' +
        '        if(themes.find(t => t.name === name)) {\n' +
        '            setError(\'This name is already used\')\n' +
        '            return null;\n' +
        '        }\n' +
        '        if(!isValidColor(mainGradient)) {\n' +
        '            setError(\'Main gradient is not a color\')\n' +
        '            return null;\n' +
        '        }\n' +
        '        if(!isValidColor(subGradient)) {\n' +
        '            setError(\'Sub gradient is not a color\')\n' +
        '            return null;\n' +
        '        }\n' +
        '        if(!isValidColor(bodyBackground)) {\n' +
        '            setError(\'Body background is not a color\')\n' +
        '            return null;\n' +
        '        }\n' +
        '        if(!isValidColor(text)) {\n' +
        '            setError(\'Text color is not a color\')\n' +
        '            return null;\n' +
        '        }\n' +
        '        if(!isValidColor(description)) {\n' +
        '            setError(\'Description color is not a color\')\n' +
        '            return null;\n' +
        '        }\n' +
        '        if(!isValidColor(mainScrollbarBackground)) {\n' +
        '            setError(\'Main scrollbar background is not a color\')\n' +
        '            return null;\n' +
        '        }\n' +
        '        if(!isValidColor(subScrollbarBackground)) {\n' +
        '            setError(\'Sub scrollbar background is not a color\')\n' +
        '            return null;\n' +
        '        }\n' +
        '        const theme: DefaultTheme = new Theme(name, mainGradient, subGradient, text, description, bodyBackground, mainScrollbarBackground, subScrollbarBackground, true)\n' +
        '        dispatch(createTheme(theme))\n' +
        '        setError(\'\')\n' +
        '        setName(\'\')\n' +
        '        setMainGradient(\'\')\n' +
        '        setSubGradient(\'\')\n' +
        '        setBodyBackground(\'\')\n' +
        '        setText(\'\')\n' +
        '        setDescription(\'\')\n' +
        '        setMainScrollbarBackground(\'\')\n' +
        '        setSubScrollbarBackground(\'\')\n' +
        '    }'
}