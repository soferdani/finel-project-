import { makeObservable, observable } from 'mobx'

export default class Todo {
    constructor(todo) {
        this.id = todo.t_id
        this.type = todo.type_name
        this.task = todo.task
        this.isComplete = todo.is_complete
        this.img = todo.img
        this.date = todo.create_date

        makeObservable(this, {
            id: observable,
            type: observable,
            task: observable,
            isComplete: observable,
            img: observable,
        })
    }
}