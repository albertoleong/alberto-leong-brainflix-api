import express from 'express'
import cors from 'cors'
import { videoRoutes } from './routes/videos.js'
import dotenv from 'dotenv';
dotenv.config();

const app = express()

const PORT = process.env.PORT || 8080

app.use(express.static('public/images'))

app.use(cors({ origin: process.env.FRONTEND_BASE_URL }))
app.use(express.json())

app.use('/', videoRoutes)

app.listen(PORT, () => {
    console.log("running on port 8080")
})