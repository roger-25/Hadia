import { Sequelize } from 'sequelize';
import { DB_CONNECTION_STRING } from '../config/index.js';
export const sequelize = new Sequelize(DB_CONNECTION_STRING, {
    dialect: 'mysql'
});