import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-service/prisma-service.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(name: string): Promise<any> {
    return this.prisma.user.findFirst({
      where: {
        name,
      },
    });
  }

  async findAll(): Promise<any> {
    return this.prisma.user.findMany();
  }

  async addOne(name: string, password: string): Promise<any> {
    return this.prisma.user.create({
      data: {
        name,
        password,
      },
    });
  }
}
