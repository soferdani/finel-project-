import { makeObservable, observable } from 'mobx'

export default class Todo {
    constructor(todo) {
        this.id = todo.t_id
        this.type = todo.type
        this.task = todo.task
        this.complete = todo.complete
        this.img = todo.img
        this.date = todo.date

        makeObservable(this, {
            id: observable,
            type: observable,
            task: observable,
            isComplete: observable,
            img: observable,
        })
    }
}