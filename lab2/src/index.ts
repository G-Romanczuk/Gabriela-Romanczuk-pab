import express from 'express'
import {Request, Response} from 'express'
import {Note} from '../models/note'
import {Tag} from '../models/tag'
const app = express()

app.use(express.json())

app.get('/', function (req: Request, res: Response) {
  res.send('GET Hello World')
})
app.post('/', function (req: Request, res: Response) {
  console.log(req.body) // e.x. req.body.title 
  res.status(200).send('POST Hello World')
})


const notes: Note[] = [
  {
    title: "test1",
    content: "one",
    createDate: "1-01-2022",
    tags: ["a", "b", "c"],
    id: 1,
  },
  {
    title: "test2",
    content: "two",
    createDate: "2-02-2022",
    tags: ["a", "c"],
    id: 2,
  },
];



//#region notes
app.post("/note", (req: Request, res: Response) => {
  if (req.body.title && req.body.content) {
    const note: Note = {
      title: req.body.title,
      content: req.body.content,
      createDate: new Date().toISOString(),
      tags: req.body.tags,
      id: notes.length + 1,
    };

    notes.push(note);
    res.sendStatus(201);
  } else {
    res.status(400).send("Not Created");
  }
});


app.get("/note/:id", function (req: Request, res: Response) {
  const note = notes.find((a) => a.id === parseInt(req.params.id));
  if (note) {
    res.status(200).send(note);
  } else {
    res.status(404).send("Not Found");
  }
});

app.put("/note/:id", (req: Request, res: Response) => {
  const note = notes.find((a) => a.id === parseInt(req.params.id));
  if (!note) {
    res.status(404).send("Not Found");
  }
  else {
    const newnote: Note = {
      title: req.body.title,
      content: req.body.content,
      createDate: note.createDate ?? new Date().toISOString(),
      tags: !req.body.tags ? note.tags : req.body.tags,
      id: note.id,
    };
    const index = notes.indexOf(note);
    notes[index] = newnote;
    res.status(204).send("Updated");
  }
});

app.delete("/note/:id", (req: Request, res: Response) => {
  const note = notes.find((a) => a.id === parseInt(req.params.id));
  if (!note) {
    res.status(400).send("Not Found");
  }
  else {
    const index = notes.indexOf(note);
    notes.splice(index, 1);
    res.status(204).send("Deleted");
  }
});app.delete("/note/:id", (req: Request, res: Response) => {
  const note = notes.find((a) => a.id === parseInt(req.params.id));
  if (!note) {
    res.status(400).send("Not Found");
  }
  else {
    const index = notes.indexOf(note);
    notes.splice(index, 1);
    res.status(204).send("Deleted");
  }
});

app.get("/notes",  (req: Request, res: Response) => {
  
}); 
// export async function readStorage(filePath: string) {
// 	try {
// 		const data = await fs.promises.readFile(filePath, 'utf-8')
// 		return JSON.parse(data)
// 	} catch (err) {
// 		console.log(err)
// 	}
// }

// export async function updateStorage(dataToSave: string, filePath: string): Promise<void> {
// 	try {
// 		await fs.promises.writeFile(filePath, dataToSave)
// 	} catch (err) {
// 		console.log(err)
// 	}
// }

//#endregion

//#region Przydamisie
// generowanie daty w TS: const date = new Date(). Generowanie isostring z daty: date.toISOString()
// tworzenie "unikalnych" id-kow: Date.now()
// tworzenie JSON-a z obiektu: const jsonData = JSON.stringify(data).
// tworzenie obiektu z JSON-a: const data = JSON.parse(jsonData) jeśli chcesz wysłać jsona (np. z zapytania GET o notatkę), to nie musisz tworzyć JSON-a - express zrobi to za Ciebie (czyli np. res.send(note))

app.listen(5000)