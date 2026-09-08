import Person from '../models/Person.js'
import { makeCrudRouter } from '../utils/crudRouter.js'

export default makeCrudRouter(Person, { sort: 'Name' })
