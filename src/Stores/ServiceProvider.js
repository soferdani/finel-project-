import { 
    makeObservable, 
    observable, 
    action, 
    computed 
} from 'mobx'
import User from './User'

export default class ServiceProvider extends User {
    constructor() {

        super()

        makeObservable(this, {
        })
    }
}