import { Container } from 'inversify'
import TYPES from './constants'
import { Five, Xiaoming, Zhangsan } from './entities'
import { Classroom, Student, Teacher } from './interface'

const container = new Container()
container.bind<Student>(TYPES.Student).to(Xiaoming)
container.bind<Teacher>(TYPES.Teacher).to(Zhangsan)
container.bind<Classroom>(TYPES.Classroom).to(Five)

export default container