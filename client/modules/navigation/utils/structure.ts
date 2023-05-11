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

export const navigationStructure: navigationElement[] = [
    new Directory('My projects', [
        new Link('Morse code translator', 'https://translator-morse-code.vercel.app', true),
        new Link('Music platform', 'https://music-platform.up.railway.app', true)
    ]),
    new Directory('Skills', [new Link('Animations', '#Animations'), new Link('Redux', '#Redux')])
]