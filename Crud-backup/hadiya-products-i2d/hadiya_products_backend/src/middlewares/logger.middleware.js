import { ErrorLogger } from '../utils/logger.js';

export const LogHandler = async (err, _req, _res, next) => {
    ErrorLogger.log(err)
    next(err);
}