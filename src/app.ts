import express from 'express'
import authRoute from './routes/globals/auth/authRoute'
import instituteRoute from './routes/institute/instituteRoute'
 const app=express()

app.use(express.json())

 app.use('/api',authRoute)
 app.use('/api/institute',instituteRoute)



export default app