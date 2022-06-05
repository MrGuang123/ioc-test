import 'reflect-metadata'
import './ioc/loader'

import { InversifyKoaServer } from 'inversify-koa-utils'
import { Container } from 'inversify'
import { buildProviderModule } from 'inversify-binding-decorators'

const container = new Container()
container.load(buildProviderModule())
const server = new InversifyKoaServer(container)
const app = server.build()

app.listen(3000, () => {
  console.log('Inversify Server start success at 3000');

})