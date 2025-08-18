import { createLogger, transports, format } from 'winston';
import ecsFormat from '@elastic/ecs-winston-format'
import 'winston-daily-rotate-file';
import { AppError } from './errors/app.error.js';
import { Formatter } from './formatter.js';

const dailyRotateTransport = new transports.DailyRotateFile({
    filename: 'products-api-logs-%DATE%.log',
    datePattern: 'DD-MM-YYYY',
    zippedArchive: true,
    dirname: 'logs'
  });

export const Logger = createLogger({
    level: 'debug',
    format: ecsFormat({ convertReqRes: true }),
    transports: [
        dailyRotateTransport,
        new transports.Console()
    ]
})

export class InfoLogger {
    static log(message) {
        Logger.log(
            'info',
            message,
            { env:process.env.NODE_ENV }
        );
    }
}

export class HttpLogger{
    static log(message, {req, res}) {
        Logger.log('info', message, { req, res, env:process.env.NODE_ENV })
    }
}

export class ErrorLogger{
    constructor(){}

    static log(err){
        console.log("=================START ERROR LOGGER=================");
        Logger.log(
            'error',
            {
                timestamp: new Date(),
                error: JSON.stringify(err),
                trace: JSON.stringify(err.stack)
            },
                
        );
        console.log("=================END ERROR LOGGER=================");
        return false;
    }

    async isOperational(error) {
        if(error instanceof AppError){
            return error.isOperational();
        }
        else{
            return false;
        }
    }
}