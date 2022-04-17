import express, { NextFunction } from 'express'  //dodaje express
import {Request, Response} from 'express'  //dodaje express
import { Note } from '../modules/note'  //dodaje model notatki
import fs from 'fs'

const dot =require('dotenv').config()
const jwt = require('jsonwebtoken')
const app = express()
app.use(express.json())

//#region routes
const noteController = require('../Controllers/noteController')
const tagController = require('../Controllers/TagController')
//#endregion

//#region noteRouter
app.post('/note', noteController.CreateNote)
app.get('/note/:id',authenticateToken, noteController.ReadNote)
app.put('/note/:id', noteController.EditNote)
app.delete('/note/:id', noteController.DeleteNote)
app.get('/notes', noteController.IndexNote)
app.get('/notes/user/:user',authenticateToken, noteController.IndexUserNote)
//#endregion

//#region tagRouter
app.post('/tag', tagController.CreateTag)
app.get('/tag/:id', tagController.ReadTag)
app.put('/tag/:id', tagController.EditTag)
app.delete('/tag/:id', tagController.DeleteTag)
app.get('/tags', tagController.IndexTag)
//#endregion

//#region loginRouter



const users: { name: string; password: string }[] = []

app.get('/users', (req,res)=> { //wyświetla użytkowników
	res.json(users)
})

app.post('/users', async (req, res) => { // rejestracja użytkownika
	try {
	  const password: string = req.body.password
	  const name: string = req.body.name
	  const user = { name: name, password: password }
	  users.push(user)
	  res.status(200).send('works')
	} catch {
	  res.status(401).send('doesnt')
	}
  })
  
  app.post('/login', async (req, res) => { //logowanie użytkownika, zwraca token po sukcesie
	const user = users.find(user => user.name === req.body.name)
	if (user == null) {
	  return res.status(400).send('Cannot find user')
	}
	try {
	  if(req.body.password == user.password) {
		const accessToken: string = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
		res.status(200).send('Success token:  ' + accessToken)		
		
	  } else {
		res.status(401).send('Not Allowed')
	  }
	} catch {
	  res.status(401).send('no success')
	}
  })

//#endregion




app.get('/', function (req, res) {
    res.send("don't worry it's working")
})

export async function readStorage(filePath: string) {
	try {
		const data = await fs.promises.readFile(filePath, 'utf-8')
		return JSON.parse(data)
	} catch (err) {
		console.log(err)
	}
}

export async function updateStorage(dataToSave: string, filePath: string): Promise<void> {
	try {
		await fs.promises.writeFile(filePath, dataToSave)
	} catch (err) {
		console.log(err)
	}
}


export function authenticateToken(req: Request, res: Response, next: NextFunction) //funkcja do autoryzacji
{ 
	const pub = req.body.pub
	
	if(pub == true) next  //jeżeli notatka jest publiczna, nie musimy nic robić
	else
	{
	//zczytaj token
		const authHeader = req.headers['authorization'] 
		const token = authHeader && authHeader.split(' ')[1]
		if (token == null) return res.sendStatus(401)

  //sprawdź token
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: Error, user: Object) => {
	  		console.log(err)
			 if (err) return res.sendStatus(403)
	
			readStorage('data/notes.json').then(async notesData => { //zczytuje zawartość
			const notes: Note[] = notesData
			const note = notes.find(x => x.user == user)
			return note;  //zwraca notatki użytkownika
			})

		})
	}
}
  //#endregion

  
  app.listen(3000 , () => {
	  console.log("running server...")
  });