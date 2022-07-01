import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'src/prisma-service/prisma-service.service';

@Injectable()
export class TodosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTodoDto: CreateTodoDto) {
    const todo = await this.prisma.todo.create({
      data: {
        title: createTodoDto.title,
        completed: createTodoDto.completed,
      },
    });
    return todo;
  }

  async findAll() {
    const todos = await this.prisma.todo.findMany();
    return todos;
  }

  async findOne(id: number) {
    const todo = await this.prisma.todo.findUnique({
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
    const todo = await this.prisma.todo.update({
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
    const todo = await this.prisma.todo.update({
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
    const todo = await this.prisma.todo.delete({
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
