import express from 'express'  //dodaje express
import {Request, Response} from 'express'  //dodaje express
import { Note } from './note'  //dodaje model notatki
import { Tag } from './tags'  //dodaje model tagu
import { Login } from './login'
import fs from 'fs'
import jwt from 'jsonwebtoken'
import { sign } from 'jsonwebtoken';

const app = express()
app.use(express.json())

app.get('/', function (req, res) {
    res.send("don't worry it's working")
})

async function readStorage(filePath: string) {
	try {
		const data = await fs.promises.readFile(filePath, 'utf-8')
		return JSON.parse(data)
	} catch (err) {
		console.log(err)
	}
}

async function updateStorage(dataToSave: string, filePath: string): Promise<void> {
	try {
		await fs.promises.writeFile(filePath, dataToSave)
	} catch (err) {
		console.log(err)
	}
}





//#region API Notatki
// Dodanie notatki
app.post('/note', async function (req: Request, res: Response) {  // metoda post 
	console.log('Tworzenie...') //wyświetla
	console.log(req.headers.authorization)
	console.log(req.body)
	await readStorage('data/notes.json').then(async notesData => { // poczekaj na zawartość z notes
		await readStorage('data/tags.json').then(async tagsData => { // poczekaj na zawartość z tags
			const notes: Note[] = notesData
			const tags: Tag[] = tagsData
			const title = req.body.tite
			const content = req.body.content
			const tagsNames = req.body.tags?.split(',')

			if (title == null && content == null) { // gdy brakuje tytułu i zawartości, wyświetl błąd 400 i wiad
				res.status(400).send('Uzupełnij tytuł i zawratość.')
				return
			}

			const note = new Note(title, content)
			let noteTags: Tag[] = []

			if (tagsNames?.length > 0) { //jeżeli nazwa tagu jest >0
				tagsNames.forEach((tagName: string) => {  //foreach po tagach
					let existingTag = tags.find(x => x.name.toLowerCase() == tagName.toLowerCase().trim()) //nowa zmienna, zwraca pierwszą wartość z tabeli gdzie 
					if (existingTag == null) {  //jeżeli jest puste
						existingTag = new Tag(tagName.trim())  //uznaj existingtag jako nazwę tagu bez białych znaków
						tags.push(existingTag) //dodaje existing tag do tabeli tags
					}
					noteTags.push(existingTag) //dodaje do tabeli noteTags
				})
				note.tags = noteTags
			}
			notes.push(note) //dodaje notatkę do tabeli Notes
			await updateStorage(JSON.stringify(notes, null, 2), 'data/notes.json')
			await updateStorage(JSON.stringify(tags, null, 2), 'data/tags.json')

			const index = notes.findIndex(x => x.id == note.id) // dodaje id notatki do zmiennej index
			res.status(201).send('Utworzono nową notatkę o ID: ' + note.id + ' (' + index + ')') //wyświetla
		})
	})
})

// Odczytanie notatki
app.get('/note/:id', async function (req: Request, res: Response) { //metoda get
	console.log('Pobranie notatki..') 
	console.log(req.headers.authorization)
	console.log(req.body)
	const id = parseInt(req.params.id) // parsuje podane id do int
	await readStorage('data/notes.json').then(async notesData => { //zczytuje zawartość
		const notes: Note[] = notesData
		const note = notes.find(x => x.id == id)  // znajduje id
		if (note == null) res.status(404).send('Nie odnaleziono notatki z podanym ID.')
		else res.status(200).send(note)
	})
})

// Edycja notatki
app.put('/note/:id', async function (req: Request, res: Response) {
	console.log('Edycja notatki..')
	console.log(req.headers.authorization)
	console.log(req.body)
	const id = parseInt(req.params.id)
	await readStorage('data/notes.json').then(async notesData => {
		await readStorage('data/tags.json').then(async tagsData => {
			const notes: Note[] = notesData
			const tags: Tag[] = tagsData
			const index = notes.findIndex(x => x.id == id)
			const note = notes[index]

			if (note == null) {
				res.status(404).send('Nie odnaleziono notatki z podanym ID.')
				return
			}

			if (req.body.title != null) { //zmienia tytuł
				note.title = req.body.title
			}

			if (req.body.content != null) note.content = req.body.content //zmienia zawartość

			if (req.body.tagsNames != null) {
				const tagsNames = req.body.tagsNames.split(',')
				let noteTags: Tag[] = []
				tagsNames.forEach((tagName: string) => {
					let existingTag = tags.find(x => x.name.toLowerCase() == tagName.toLowerCase().trim())
					if (existingTag == null) {
						existingTag = new Tag(tagName.trim())
						tags.push(existingTag)
					}
					noteTags.push(existingTag)
				})
				note.tags = noteTags
			}
			notes.push(note)
			await updateStorage(JSON.stringify(notes, null, 2), 'data/notes.json')
			await updateStorage(JSON.stringify(tags, null, 2), 'data/tags.json')

			notes[index] = note
			res.status(204).send()
		})
	})
})

// Usunięnice notatki
app.delete('/note/:id', async function (req: Request, res: Response) { //znajduje notatkę po id i usuwa
	console.log('Usuwanie notatki..')
	console.log(req.headers.authorization)
	console.log(req.body)
	const id = parseInt(req.params.id)
	await readStorage('data/notes.json').then(async notesData => {
		const notes: Note[] = notesData
		const index = notes.findIndex(x => x.id == id)
		if (notes[index] != null) {
			notes.splice(index, 1)
			await updateStorage(JSON.stringify(notes, null, 2), 'data/notes.json')
			res.status(204).send('Notatka została usunięta.')
		} else res.status(400).send('Nie odnaleziono notatki z podanym ID.')
	})
})

// Pobranie wszystkich notatek
app.get('/notes', async function (req: Request, res: Response) { // wyświetla tabele z notatkami
	console.log('Pobieram liste notatek..')
	console.log(req.headers.authorization)
	console.log(req.body)
	await readStorage('data/notes.json').then(async notesData => {
		const notes: Note[] = notesData
		if (notes.length > 0) res.status(200).send(notes)
		else res.status(404).send('Nie ma żadnych notatek.')
	})
})
//#endregion

//#region API TagÓW
// Dodanie nowego tagu
app.post('/tag', async function (req: Request, res: Response) {
	console.log('Tworzenie tagu..')
	console.log(req.headers.authorization)
	console.log(req.body)
	const name: string = req.body.name

	if (name == null) {
		res.status(400).send('Podano niewłaściwy tag. Proszę uzupełnić nazwę.')
		return
	}

	await readStorage('data/tags.json').then(async tagsData => {
		const tags: Tag[] = tagsData
		const sameTag = tags.find(x => x.name?.toLocaleLowerCase() == name.toLocaleLowerCase().trim())
		if (sameTag != null) {
			res.status(400).send('Podany tag już istnieje.')
			return
		}

		const tag = new Tag(name.trim())
		tags.push(tag)
		await updateStorage(JSON.stringify(tags, null, 2), 'data/tags.json')

		const index = tags.findIndex(x => x.id == tag.id)
		res.status(201).send('Utworzono nowy tag o ID: ' + tag.id + ' (' + index + ')')
	})
})

// Odczytanie tagu
app.get('/tag/:id', async function (req: Request, res: Response) {
	console.log('Pobranie tagu..')
	console.log(req.headers.authorization)
	console.log(req.body)
	const id = parseInt(req.params.id)
	await readStorage('data/tags.json').then(async tagsData => {
		const tags: Tag[] = tagsData
		const tag = tags.find(x => x.id == id)
		if (tag == null) res.status(404).send('Nie odnaleziono tagu z podanym ID.')
		else res.status(200).send(tag)
	})
})

// Edycja tagu
app.put('/tag/:id', async function (req: Request, res: Response) {
	console.log('Edycja tagu..')
	console.log(req.headers.authorization)
	console.log(req.body)
	const id = parseInt(req.params.id)
	await readStorage('data/tags.json').then(async tagsData => {
		const tags: Tag[] = tagsData
		const index = tags.findIndex(x => x.id == id)
		const tag = tags[index]

		if (tag == null) {
			res.status(404).send('Nie odnaleziono tagu z podanym ID.')
			return
		}

		if (req.body.name != null) {
			tag.name = req.body.name
		}

		tags[index] = tag
		await updateStorage(JSON.stringify(tags, null, 2), 'data/tags.json')

		res.status(204).send(tag)
	})
})

// Usunięnice tagu
app.delete('/tag/:id', async function (req: Request, res: Response) {
	console.log('Usuwanie tagu..')
	console.log(req.headers.authorization)
	console.log(req.body)
	const id = parseInt(req.params.id)
	await readStorage('data/tags.json').then(async tagsData => {
		const tags: Tag[] = tagsData
		const index = tags.findIndex(x => x.id == id)
		if (tags[index] != null) {
			tags.splice(index, 1)
			await updateStorage(JSON.stringify(tags, null, 2), 'data/tags.json')
			res.status(204).send('Tag został usunięty.')
		} else res.status(400).send('Nie odnaleziono tagu z podanym ID.')
	})
})

// Pobranie wszystkich tagów
app.get('/tags', async function (req: Request, res: Response) {
	console.log('Pobieram liste tagów..')
	console.log(req.headers.authorization)
	console.log(req.body)
	await readStorage('data/tags.json').then(async tagsData => {
		const tags: Tag[] = tagsData
		if (tags.length > 0) {
			console.log(req.body)
			res.status(200).send(tags)
		} else res.status(404).send('Nie ma żadnych tagów.')
	})
})
//#endregion

//#loginregion

const users: { name: string; password: string }[] = []

app.get('/users', (req,res)=> {
	res.json(users)
})

app.post('/users', (req,res)=> {
	const user = { name: req.body.name, password: req.body.password}
	users.push(user)
	res.status(201).send()
})


  app.listen(4000 , () => {
	  console.log("running server...")
  });