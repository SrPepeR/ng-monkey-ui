import { MonkeyStyle } from "../../../bases/monkey-style";

/**
 * Represents a message to be displayed in an alert.
 */
export class Message {
    /**
     * The texts to be displayed in the message.
     */
    texts: string[];

    /**
     * The style of the message.
     */
    style: MonkeyStyle;

    /**
     * Indicates whether the message should automatically close.
     */
    isAutoClose: boolean = true;

    /**
     * The title of the message.
     */
    title?: string;

    /**
     * The icon to be displayed with the message.
     */
    icon?: string;

    /**
     * Creates a new instance of the Message class.
     * @param texts The texts to be displayed in the message.
     * @param style The style of the message.
     * @param isAutoClose Indicates whether the message should automatically close.
     * @param title The title of the message.
     * @param icon The icon to be displayed with the message.
     */
    constructor(
        texts: string[],
        style: MonkeyStyle,
        isAutoClose: boolean,
        title?: string,
        icon?: string
    ) {
        this.texts = texts;
        this.style = style;
        this.isAutoClose = isAutoClose;
        this.title = title;
        this.icon = icon;
    }
}
