import { AppError } from "./app.error.js";
import { ErrorStatusCodes } from "./error.status.codes.js";

export class API500Error extends AppError{

    constructor(
        name,
        statusCode = ErrorStatusCodes.INTERNAL_SERVER_ERROR,
        description = 'Internal server error',
        isOperational = true
    ){
        super(name, statusCode, description, isOperational);
    }

}

export class API400Error extends AppError{

    constructor(
        name,
        statusCode = ErrorStatusCodes.BAD_REQUEST,
        description = 'Bad request',
        isOperational = true
    ){
        super(name, statusCode, description, isOperational);
    }

}

export class API404Error extends AppError{

    constructor(
        name,
        statusCode = ErrorStatusCodes.NOT_FOUND,
        description = 'Not found',
        isOperational = true
    ){
        super(name, statusCode, description, isOperational);
    }

}