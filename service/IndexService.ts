import { provide } from "inversify-binding-decorators";
import TAGS from "../constants/tags";
import { IIndex } from "../interface/IIndex";
import { Model } from "../models/User";

@provide(TAGS.IndexService)
export class IndexService implements IIndex {
  private userStore: Model.User[] = [
    {
      email: '11@22.com',
      name: 'hello'
    },
    {
      email: '33@22.com',
      name: 'world'
    },
  ]
  getUser(id: number): Model.User {
    const result: Model.User = this.userStore[id]

    return result
  }
}