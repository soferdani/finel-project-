import { makeObservable, observable } from 'mobx'

export default class Todo {
    constructor(todo) {
        this.id = todo.id
        this.type = todo.type
        this.task = todo.task
        this.isComplete = todo.isComplete
        this.img = todo.img

        makeObservable(this, {
            id: observable,
            type: observable,
            task: observable,
            isComplet: observable,
            img: observable,
        })
    }
}