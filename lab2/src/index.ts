import express from 'express'
import { Request, Response } from 'express'
import { Note } from './note'

const app = express()

const notes: Note[] = []

app.use(express.json())

// Dodanie notatki
app.post('/note', function (req: Request, res: Response) {
	console.log('Tworzenie notatki..')
	console.log(req.body)
  const exampleNote = { title: "Testowa notatka", content: "Treść notatki testowej"}
	res.status(200).send(exampleNote)
})

// Odczytanie notatki
app.get('/note/:id', function (req: Request, res: Response) {
	console.log('Pobranie notatki..')
	console.log(req.body) // e.x. req.body.title
	res.status(200).send('GET Hello World')
})

// Edycja notatki
app.put('/note/:id', function (req: Request, res: Response) {
	console.log('Edycja notatki..')
	console.log(req.body)
	res.status(204).send('PUT Hello World')
})

// Usunięnice notatki
app.delete('/note/:id', function (req: Request, res: Response) {
	console.log('Usuwanie notatki..')
	console.log(req.body) // e.x. req.body.title
	res.status(204).send('Delete Hello World')
})

app.listen(3000)