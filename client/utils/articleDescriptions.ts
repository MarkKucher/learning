interface articleDescriptionType {
    [key: string]: string
}

export const articleDescriptions: articleDescriptionType = {
    animations: 'Animations can be created via simple css, framer motion, ' +
        'react-spring and react-transition-group. Here is one example.' +
        ' This animation is done by using react state and css classes. ' +
        'Link leads to page with more examples.',
    redux: 'Redux is a library that helps manage states across all application. ' +
        'In this example you can see that small container affects a big one thanks to redux.' +
        'Detail page contains more examples of using redux-toolkit and RTK Query.',
    websocket: 'WebSocket is a protocol designed to exchange information between a browser and a web ws-server in real time.' +
        ' In this example you can see how much visitors are on this page.' +
        ' You can tap link and share someone unique URL to draw together.',
    'react flow + resend': 'React flow is a highly customizable React' +
        ' component for building node-based editors and interactive diagrams.' +
        ' Resend is the new email API for developers. It is designed ' +
        'for you to build, test, and send transactional emails at scale.',
    chatGPT: 'ChatGPT is an artificial intelligence (AI) chatbot that uses' +
        ' natural language processing to create humanlike conversational dialogue.' +
        ' The language model can respond to questions and compose various written content,' +
        ' including articles, social media posts, essays, code and emails.'
};