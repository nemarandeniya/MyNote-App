import express from 'express';
import cors from 'cors'
import connectMongoDb from './db/db.js';
import auth from './routes/auth.js'
import note from './routes/note.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/auth', auth)
app.use('/note', note)

app.listen(5000, () => {
    connectMongoDb()
    console.log("Server is listening");
})

