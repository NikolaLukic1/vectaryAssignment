import {createConnection} from 'typeorm';
import config from './ormconfig'

export const connection = createConnection(config).then(async conn => {
    await conn.runMigrations({transaction : 'each'});
});