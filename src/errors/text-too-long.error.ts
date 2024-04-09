class TextTooLongError extends Error {
    constructor(field: string, maxLength: number) {
        super(`${field} - Text too long! Maximum number of characters: ${maxLength}`);
    }
}

export default TextTooLongError;
