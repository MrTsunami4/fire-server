import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class TodosService {
  async create(createTodoDto: CreateTodoDto) {
    const todo = await prisma.todo.create({
      data: {
        title: createTodoDto.title,
        completed: createTodoDto.completed,
      },
    });
    return todo;
  }

  async findAll() {
    const todos = await prisma.todo.findMany();
    return todos;
  }

  async findOne(id: number) {
    const todo = await prisma.todo.findUnique({
      where: {
        id,
      },
    });
    if (!todo) {
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }
    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = await prisma.todo.update({
      where: {
        id,
      },
      data: {
        title: updateTodoDto.title,
        completed: updateTodoDto.completed,
      },
    });
    if (!todo) {
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }
    return todo;
  }

  async complete(id: number) {
    const todo = await prisma.todo.update({
      where: {
        id,
      },
      data: {
        completed: true,
      },
    });
    if (!todo) {
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }
    return todo;
  }

  async remove(id: number) {
    const todo = await prisma.todo.delete({
      where: {
        id,
      },
    });
    if (!todo) {
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }
    return todo;
  }
}
