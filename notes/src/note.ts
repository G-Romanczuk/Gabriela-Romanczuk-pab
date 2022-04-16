import { Tag } from './tags'

export class Note {
	title: string
	content: string
	createDate: string
	tags: Tag[]
	id: number
	user: string
	pub: boolean

	constructor(title: string, content: string, user: string, pub: boolean ) {
		this.title = title
		this.content = content
		this.createDate = new Date().toISOString()
		this.id = Date.now()
		this.tags = []
		this.user = user
		this.pub = pub
	}
}