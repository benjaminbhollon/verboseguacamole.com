import 'dotenv/config'
import { koa } from './components/router'

const port = parseInt(process.env.HTTP_PORT!) || 3000
koa.listen(port, process.env.HTTP_HOST)

for (let route of ['static-pages']) {
	require('./routes/' + route)?.init?.()
}