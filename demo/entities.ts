import { inject, injectable } from 'inversify'
import { Student, Teacher, Classroom } from './interface'
import TYPES from './constants'

@injectable()
class Xiaoming implements Student {
  learn(): string {
    return 'study hard'
  }
}

@injectable()
class Zhangsan implements Teacher {
  teaching(): string {
    return 'series teach'
  }
}

@injectable()
class Five implements Classroom {
  private _xiaoming: Xiaoming;
  private _zhangsan: Zhangsan;
  constructor(@inject(TYPES.Student) xiaoming: Student, @inject(TYPES.Teacher) zhangsan: Teacher) {
    this._xiaoming = xiaoming
    this._zhangsan = zhangsan
  }
  study(): string {
    return this._xiaoming.learn() + this._zhangsan.teaching()
  }
}

export { Xiaoming, Zhangsan, Five }