export class ValidationException extends Error {
    public status: number;
    public field: string;
    public message: string;

    constructor(field: string, message: string) {
        super(message);
        this.status = 400;
        this.field = field;
        this.message = message;
        Object.setPrototypeOf(this, ValidationException.prototype);  // https://github.com/microsoft/TypeScript/issues/13965
    }
}