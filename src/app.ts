import express from 'express'
import authRoute from './routes/globals/auth/authRoute'
import instituteRoute from './routes/institute/instituteRoute'
import courseRoute from './routes/institute/course/courseRoute'
import categoryRoute from './routes/institute/course/category/categoryRoute'
import teacherInstituteRoute from './routes/institute/teacher/teacherRoute'
import teacherRoute from './routes/teacher/teacherRoute'
 const app=express()

app.use(express.json())

//institute routes
app.use('/api',authRoute)
app.use('/api/institute',instituteRoute)
app.use('/api/institute/course',courseRoute)
app.use('/api/institute/category',categoryRoute)
app.use('/api/institute/teacher/',teacherInstituteRoute)

//teacherRoute

app.use('/api/teacher',teacherRoute)


export default app