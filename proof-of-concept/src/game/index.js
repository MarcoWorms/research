import {
  map,
  partial,
} from 'ramda'

import services from './services'
import routes from './routes'

const bindServices = map(route => partial(route, [services]))
const boundRoutes = bindServices(routes)

export default boundRoutes

