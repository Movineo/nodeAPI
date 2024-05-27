import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { createUser, signin } from './handlers/user';
import { protect } from './modules/auth';
import router from './router';

// Custom middleware
// app.use((req, res, next) => {
//     req.myData = 'This is my data';
//     next();
// });

//custom middleware
// const myMiddleware = (req, res, next) => {
//     req.myData = 'This is my data';
//     next();
// };
// app.use(myMiddleware);

//cors middleware -- cross origin resource sharing middleware 
//cors is a middleware that allows or disallows cross origin requests


const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use((req, res, next) => {
	req.myData = 'This is my data'
	next()
}
)
app.get('/', (req, res) =>{
	res.json({message: 'hello'})

})


app.use('/api', protect, router)
app.post('/user', createUser)
app.post('/signin', signin)

app.use((err, req, res, next) => {
	if(err.type==='auth'){
		res.status(401).json({message: "Unauthorized"})
	}else if(err.type==='input'){
		res.status(400).json({message: "Invalid input"})
	}else{
		res.status(500).json({message: "Something went wrong"})
	}
}
)


export default app


