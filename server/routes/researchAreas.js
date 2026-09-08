import ResearchArea from '../models/ResearchArea.js'
import { makeCrudRouter } from '../utils/crudRouter.js'

export default makeCrudRouter(ResearchArea, { sort: 'Title' })
