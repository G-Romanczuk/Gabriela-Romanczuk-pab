import express from 'express'  //dodaje express
import {Request, Response} from 'express'  //dodaje express
import { Tag } from '../modules/tag'  //dodaje model tagu
import  {readStorage, updateStorage} from '../src/index'

const app = express()
app.use(express.json())
//#region API TagÓW
// Dodanie nowego tagu
 const CreateTag = async (req: Request, res: Response)=> {
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
 }

// Odczytanie tagu
 const ReadTag = async (req: Request, res: Response)=> {
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
}

// Edycja tagu
 const EditTag = async (req: Request, res: Response)=> {
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
}

// Usunięnice tagu
 const DeleteTag =async (req: Request, res: Response)=> {
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
}

// Pobranie wszystkich tagów
 const IndexTag = async (req: Request, res: Response) => {
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
}
//#endregion

module.exports = {
	CreateTag, ReadTag, EditTag, DeleteTag, IndexTag
}