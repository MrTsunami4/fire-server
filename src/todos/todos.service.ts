import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  private readonly todos: Todo[] = [];

  create(createTodoDto: CreateTodoDto) {
    this.todos.push(createTodoDto);
  }

  findAll() {
    if (this.todos.length === 0) {
      throw new HttpException('No todos found', HttpStatus.NOT_FOUND);
    }
    return this.todos;
  }

  findOne(id: number) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }
    return todo;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = this.findOne(id);
    todo.title = updateTodoDto.title;
    todo.completed = updateTodoDto.completed;
    return todo;
  }

  remove(id: number) {
    const todo = this.findOne(id);
    this.todos.splice(this.todos.indexOf(todo), 1);
    return todo;
  }
}
