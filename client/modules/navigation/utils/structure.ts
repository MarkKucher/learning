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
        new Link('Music platform', 'https://music-platform.up.railway.app', true)
    ]),
]

export const pageNavigationElements = {
    '/': [
        new Directory('Skills', [
            new Directory('Animations', [
                new Link('Animation example', '#Animations'),
                new Link('Animations page', '/animations', false)
            ]),
            new Directory('Redux', [
                new Link('Redux example', '#Redux'),
                new Link('Redux page', '/redux', false)
            ])
        ])
    ],
    '/animations': [
        new Directory('Framer motion', [
            new Link('Animation', '#Animation')
        ])
    ],
    '/redux': [
        new Directory('Redux toolkit', [
            new Link('Create theme', '#Create theme')
        ])
    ]
}