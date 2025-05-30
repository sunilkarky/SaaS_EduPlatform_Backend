import { Sequelize } from "sequelize";  //{} class ho so initializz and orm
import { envConfig } from "../config/config";

const sequelize= new Sequelize({
    database:envConfig.database,
    username:envConfig.userName,
    password:envConfig.password,
    host:envConfig.host,
    dialect:"mysql" , //which db oracle msaccess
    port:Number(envConfig.port)
})

sequelize.authenticate()
.then(()=>{
    console.log("Authenticated connected to database successfully")
})
.catch((error)=>{
    console.log(error)
})