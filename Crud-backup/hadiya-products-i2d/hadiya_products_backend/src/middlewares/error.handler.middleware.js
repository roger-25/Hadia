import { AppError, ErrorStatusCodes } from '../utils/errors/index.js'

export const isOperational = (error) => {
    if(error instanceof AppError){
        return error.isOperational;
    }
    else{
        return false;
    }
}

export const ErrorHandler = (error, req, res, next) => {

    // throw unhandled promises as exceptions
    process.on('unhandledRejection', (reason, promise) => {
        console.log(reason, 'UNHANDLED');
        throw reason;
    })

    // catch uncaught exceptions and if they are operational (known) errors, then restart.
    process.on('uncaughtException', (error) => {
        if(isOperational(error)){
            process.exit(1);
        }
    });

    if(error){
        if(isOperational(error)){
            res.status(error.statusCode).json({message: error.message});
        }
        else{
            res.status(500).json({message: "internal server error"});
        }
        

    }

}
