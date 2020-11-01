import { makeObservable, observable } from 'mobx'

export default class Todo {
    constructor(todo) {
        this.id = todo.t_id
        this.type = todo.type
        this.task = todo.task
        this.complete = todo.complete ? true : false
        this.img = todo.img
        this.date = todo.date

        makeObservable(this, {
            id: observable,
            type: observable,
            task: observable,
            complete: observable,
            img: observable,
        })
    }
}