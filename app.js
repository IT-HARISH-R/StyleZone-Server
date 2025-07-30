import express from 'express'
import cors from 'cors'
import notFound from './middlewares/notFound.js';
// import { URL } from './utils/config.js';


// const url = URL ? URL : 'http://localhost:5173'
// console.log(url)
const app = express();

app.use(express.json());
app.use(cors( 
    {
        // origin: url,
        credentials: true,
    }
))



app.use('/hello', async (req, res) => {
    res.json({ message: 'Hello' })
})

app.use(notFound); 

export default app

