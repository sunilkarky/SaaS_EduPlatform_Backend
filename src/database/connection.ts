import { Sequelize } from "sequelize-typescript";  //{} class ho so initializz and orm
import { envConfig } from "../config/config";

const sequelize= new Sequelize({
    database:envConfig.database,
    username:envConfig.userName,
    password:envConfig.password,
    host:envConfig.host,
    dialect:"mysql" , //which db oracle msaccess
    port:Number(envConfig.port),
    models:[__dirname+'/models'] //location dinu parxa to access model
})

sequelize.authenticate()
.then(()=>{
    console.log("Authenticated connected to database successfully")
})
.catch((error)=>{
    console.log(error)
})

//migrate //push
sequelize.sync({force:false})
.then(()=>{
    console.log("Migration success") 
})

export default sequelize