import express from 'express'  //dodaje express
import {Request, Response} from 'express'  //dodaje express
import { Note } from '../modules/note'  //dodaje model notatki
import { Tag } from '../modules/tag'  //dodaje model tagu
import  {readStorage, updateStorage} from '../src/index'

const app = express()
app.use(express.json())



//#region API Notatki
// Dodanie notatki
 const CreateNote = async (req: Request, res: Response) => {  // metoda post 
	console.log('Tworzenie...') //wyświetla
	console.log(req.headers.authorization)
	console.log(req.body)
	await readStorage('./modules/notes.json').then(async notesData => { // poczekaj na zawartość z notes
		await readStorage('./modules/tags.json').then(async tagsData => { // poczekaj na zawartość z tags
			const notes: Note[] = notesData
			const tags: Tag[] = tagsData
			const title = req.body.tite
			const content = req.body.content
			const tagsNames = req.body.tags?.split(',')
			const user = req.body.user
			const pub = req.body.pub

			if (title == null && content == null) { // gdy brakuje tytułu i zawartości, wyświetl błąd 400 i wiad
				res.status(400).send('Uzupełnij tytuł i zawratość.')
				return
			}

			const note = new Note(title, content,user, pub)
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
			await updateStorage(JSON.stringify(notes, null, 2), './modules/notes.json')
			await updateStorage(JSON.stringify(tags, null, 2), './modules/tags.json')

			const index = notes.findIndex(x => x.id == note.id) // dodaje id notatki do zmiennej index
			res.status(201).send('Utworzono nową notatkę o ID: ' + note.id + ' (' + index + ')') //wyświetla
		})
	})
 }

// Odczytanie notatki
 const ReadNote = async (req: Request, res: Response) => { //metoda get
	console.log('Pobranie notatki..') 
	console.log(req.headers.authorization)
	console.log(req.body)
	const id = parseInt(req.params.id) // parsuje podane id do int
	await readStorage('./modules/notes.json').then(async notesData => { //zczytuje zawartość
		const notes: Note[] = notesData
		const note = notes.find(x => x.id == id)  // znajduje id
		if (note == null) res.status(404).send('Nie odnaleziono notatki z podanym ID.')
		else {
			res.status(200).send(note)
		}
	})
}

// Edycja notatki
	const EditNote = async (req: Request, res: Response) => {
	console.log('Edycja notatki..')
	console.log(req.headers.authorization)
	console.log(req.body)
	const id = parseInt(req.params.id)
	await readStorage('./modules/notes.json').then(async notesData => {
		await readStorage('./modules/tags.json').then(async tagsData => {
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
			await updateStorage(JSON.stringify(notes, null, 2), './modules/notes.json')
			await updateStorage(JSON.stringify(tags, null, 2), './modules/tags.json')

			notes[index] = note
			res.status(204).send()
		})
	})
	}

// Usunięnice notatki
 const DeleteNote = async (req: Request, res: Response) => { //znajduje notatkę po id i usuwa
	console.log('Usuwanie notatki..')
	console.log(req.headers.authorization)
	console.log(req.body)
	const id = parseInt(req.params.id)
	await readStorage('./modules/notes.json').then(async notesData => {
		const notes: Note[] = notesData
		const index = notes.findIndex(x => x.id == id)
		if (notes[index] != null) {
			notes.splice(index, 1)
			await updateStorage(JSON.stringify(notes, null, 2), './modules/notes.json')
			res.status(204).send('Notatka została usunięta.')
		} else res.status(400).send('Nie odnaleziono notatki z podanym ID.')
	})
 }

// Pobranie wszystkich notatek
 const IndexNote = async (req: Request, res: Response) => { // wyświetla tabele z notatkami
	console.log('Pobieram liste notatek..')
	console.log(req.headers.authorization)
	console.log(req.body)
	await readStorage('./modules/notes.json').then(async notesData => {
		const notes: Note[] = notesData
		if (notes.length > 0) res.status(200).send(notes)
		else res.status(404).send('Nie ma żadnych notatek.')
	})
 }
//pobranie wszystkich notatek użytkownika
 const IndexUserNote = async (req: Request, res: Response) => { // wyświetla tabele z notatkami
	console.log('Pobieram liste notatek użytkownika..')
	console.log(req.headers.authorization)
	console.log(req.body)
	await readStorage('./modules/notes.json').then(async notesData => {
		const notes: Note[] = notesData
		const note = notes.filter(x => x.user == req.params.user)
		if (note.length > 0) res.status(200).send(notes)
		else res.status(404).send('Nie ma żadnych notatek.')
	})
}

//#endregion
module.exports = {
	CreateNote,ReadNote, EditNote, DeleteNote, IndexNote, IndexUserNote
}