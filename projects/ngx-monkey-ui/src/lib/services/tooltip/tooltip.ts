/**
 * Represents a Tooltip object.
 */
export class Tooltip {

    /**
     * The starting offset value for the tooltip.
     */
    private START_OFFSET: number = 20;

    /**
     * The style of the tooltip.
     */
    style: string = '';

    /**
     * The text content of the tooltip.
     */
    text: string = '';

    /**
     * The starting position of the tooltip.
     */
    startPosition: { x: number, y: number } = { x: 0, y: 0 };

    /**
     * Indicates whether the tooltip should be positioned to the right of the mouse cursor.
     */
    toRight: boolean = true;

    /**
     * Creates a new Tooltip instance.
     * @param style - The style of the tooltip.
     * @param text - The text content of the tooltip.
     * @param mousePosition - The current mouse position.
     */
    constructor(style: string, text: string, mousePosition: { x: number, y: number } = { x: 0, y: 0 }) {
        this.style = style;
        this.text = text;
        this.setDirection(mousePosition);
    }

    /**
     * Sets the direction of the tooltip based on the mouse position.
     * @param mousePosition - The current mouse position.
     */
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
