import { fluentProvide } from "inversify-binding-decorators";

const provideThrowable = (identifier, name) => {
  return fluentProvide(identifier).whenTargetNamed(name).done()
}

export {
  provideThrowable
}