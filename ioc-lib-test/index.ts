import { parseScript } from 'esprima'
import { Pattern } from 'estree'
import 'reflect-metadata'

import CreateIoc from './ioc'

const container = new CreateIoc()

interface ITypes {
  [key: string]: Symbol
}
const TYPES: ITypes = {
  indexService: Symbol.for('indexService')
}

interface IIndexService {
  log(str: string): void;
}

class IndexService implements IIndexService {
  log(str: string) {
    console.log('str:', str);
  }
}

container.bind(TYPES.indexService, () => new IndexService())

function getParams(fn: Function) {
  const ast = parseScript(fn.toString())
  const node = ast.body[0]
  let fnParams: Pattern[] = []

  if (node.type === 'FunctionDeclaration') {
    fnParams = node.params
  }

  let validParams: string[] = []
  fnParams.forEach(obj => {
    if (obj.type === 'Identifier') {
      validParams.push(obj.name)
    }
  })

  return validParams
}

function hasKey<O extends Object>(obj: O, key: keyof any): key is keyof O {
  return obj.hasOwnProperty(key)
}

function inject(serviceIndentity: Symbol): Function {
  return (target: Function, targetKey: string, index: number) => {
    if (!targetKey) {
      Reflect.defineMetadata(serviceIndentity, container.get(serviceIndentity), target)
    }
  }
}

function controller<T extends { new(...args: any[]): {} }>(constructor: T) {
  class Controller extends constructor {
    constructor(...args: any[]) {
      super(args)
      const _params = getParams(constructor)
      let indentity: string
      for (indentity of _params) {
        if (hasKey(this, indentity)) {
          // this[indentity] = container.get(TYPES[indentity])
          this[indentity] = Reflect.getMetadata(TYPES[indentity], constructor)
        }
      }
      console.log('📚', _params);

    }
  }

  return Controller
}

@controller
class IndexController {
  private indexService: IndexService
  constructor(@inject(TYPES.indexService) indexService?: IIndexService) {
    this.indexService = indexService!
  }

  info() {
    this.indexService.log('hello world 🏮')
  }
}

const indexController = new IndexController()
indexController.info()