export class Message {

    texts: string[];
    style: string;
    isAutoClose: boolean = true;

    title?: string;
    icon?: string;

    constructor(texts: string[], style: string, isAutoClose: boolean, title?: string, icon?: string) {
        this.texts = texts;
        this.style = style;
        this.isAutoClose = isAutoClose;

        this.title = title;
        this.icon = icon;
    }

}
