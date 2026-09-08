import Publication from '../models/Publication.js'
import { makeCrudRouter } from '../utils/crudRouter.js'

export default makeCrudRouter(Publication, { sort: '-PublicationYear' })
