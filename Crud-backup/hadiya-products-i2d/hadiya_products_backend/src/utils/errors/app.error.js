export class AppError extends Error{
    constructor(name, statusCode, description, isOperational){
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.statusCode = statusCode;
        this.description = description;
        this.isOperational = isOperational;
        Error.captureStackTrace(this);
    }
}