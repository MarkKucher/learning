export type navigationElement = Directory | Link;

interface Directory {
    title: string;
    children: navigationElement[];
    isLink: false;
}

interface Link {
    title: string;
    link: string;
    isLink: true;
}

class Directory {
    title: string;
    children: navigationElement[];
    isLink: false;
    constructor(title: string, children: navigationElement[]) {
        this.title = title;
        this.children = children;
        this.isLink = false;
    }
}

class Link {
    title: string;
    link: string;
    isLink: true;
    shouldOpenInNewTab: boolean | undefined;
    constructor(title: string, link: string, shouldOpenInNewTab?: boolean) {
        this.title = title;
        this.link = link;
        this.isLink = true;
        this.shouldOpenInNewTab = shouldOpenInNewTab
    }
}

export const defaultStructure: navigationElement[] = [
    new Link('Home', '/', false),
    new Directory('My projects', [
        new Link('Morse code translator', 'https://translator-morse-code.vercel.app', true),
        new Link('Music platform', 'https://music-platform-nu.vercel.app', true)
    ]),
]

export const pageNavigationElements = {
    '/': [
        new Directory('Skills', [
            new Directory('Animations', [
                new Link('example', '#Animations'),
                new Link('page', '/animations', false)
            ]),
            new Directory('Redux', [
                new Link('example', '#Redux'),
                new Link('page', '/redux', false)
            ]),
            new Directory('Websocket', [
                new Link('example', '#Websocket'),
                new Link('page', `/websocket/f${(+new Date).toString(16)}`, false)
            ]),
            new Directory('React flow + resend', [
                new Link('example', '#React flow + resend'),
                new Link('page', '/react-flow+resend', false)
            ]),
            new Directory('ChatGPT', [
                new Link('example', '#ChatGPT'),
                new Link('page', '/chatGPT')
            ])
        ])
    ],
    '/animations': [
        new Directory('Framer motion', [
            new Link('Animation', '#Animation'),
            new Link('Variants', '#Variants'),
            new Link('Gestures', '#Gestures'),
            new Link('Drag', '#Drag'),
            new Link('Scroll', '#Scroll'),
            new Link('Path', '#Path')
        ])
    ],
    '/redux': [
        new Directory('Redux toolkit', [
            new Link('Create theme', '#Create theme'),
            new Link('Todo', '#Todo'),
            new Link('Thunk', '#Thunk')
        ]),
        new Link('RTK Query', '#RTK Query')
    ],
    '/websocket': [],
    '/react-flow+resend': [],
    '/chatGPT': []
}