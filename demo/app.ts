import 'reflect-metadata'
import container from './inversify.config'
import TYPES from './constants'
import { Classroom } from './interface'

const classroom = container.get<Classroom>(TYPES.Classroom)
console.log(classroom.study())