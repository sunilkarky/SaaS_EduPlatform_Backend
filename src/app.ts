import express from 'express'
import router from './routes/globals/auth/authRoute'
 const app=express()


 app.use('/api',router)



export default app