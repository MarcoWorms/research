import injectGlobalRamda from './injectGlobalRamda'
import services from './services'
import routes from './routes'

injectGlobalRamda()

const bindServices = map(route => partial(route, [services]))
const boundRoutes = bindServices(routes)

export default boundRoutes

