import {config} from 'dotenv'

config()

export const envConfig={
    portNumber:process.env.PORT,
    database:process.env.DB_NAME,
    userName:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,

}
