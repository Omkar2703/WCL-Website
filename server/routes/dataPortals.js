import DataPortal from '../models/DataPortal.js'
import { makeCrudRouter } from '../utils/crudRouter.js'

export default makeCrudRouter(DataPortal, { sort: 'Title' })
