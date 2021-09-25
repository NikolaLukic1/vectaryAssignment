import { ConnectionOptions } from 'typeorm'
import env from '../../envConfig'

const config : ConnectionOptions = {
    'type': 'postgres',
    'host': env.TYPEORM_HOST,
    'port': Number(env.TYPEORM_PORT),
    'username': env.TYPEORM_USERNAME,
    'password': env.TYPEORM_PASSWORD,
    'database': env.TYPEORM_DATABASE,
    'synchronize': false,
    'logging': true,
    'entities': [env.ENTITIES ? env.ENTITIES : 'src/connection/entities/*.ts'],
    'migrations': [env.MIGRATIONS ? env.MIGRATIONS :'src/connection/migrations/**/*.ts'],
    'subscribers': ['src/connection/subscriber/**/*.ts',
        'build/src/connection/subscriber/**/*.*'],
    'cli': {
        'entitiesDir' : 'src/connection/entities',
        'migrationsDir' : 'src/connection/migrations',
        'subscribersDir' : 'src/connection/subscriber'
    }

}

export = config;