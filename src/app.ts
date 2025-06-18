import express from 'express'
import authRoute from './routes/globals/auth/authRoute'
import instituteRoute from './routes/institute/instituteRoute'
import courseRoute from './routes/institute/course/courseRoute'
 const app=express()

app.use(express.json())

 app.use('/api',authRoute)
 app.use('/api/institute',instituteRoute)
 app.use('/api/institute/course',courseRoute)



export default app