export class Tooltip {
    private START_OFFSET: number = 20;

    style: string = '';
    text: string = '';
    startPosition: { x: number, y: number } = { x: 0, y: 0 };
    toRight: boolean = true;

    constructor(style: string, text: string, mousePosition: { x: number, y: number } = { x: 0, y: 0 }) {
        this.style = style;
        this.text = text;
        this.setDirection(mousePosition);
    }

    private setDirection(mousePosition: { x: number, y: number }) {
        if (!mousePosition || !mousePosition.x || !mousePosition.y) {
            return;
        }

        if (this.toRight = mousePosition.x <= window.innerWidth / 2) {
            this.startPosition = { x: mousePosition.x + this.START_OFFSET, y: mousePosition.y };
        } else {
            this.startPosition = { x: (window.innerWidth - mousePosition.x) + this.START_OFFSET, y: mousePosition.y };
        }

    }
}
