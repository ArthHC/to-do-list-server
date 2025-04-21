import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ToDoService {
  constructor(private readonly prisma: PrismaService) {}

  async addToDo(title: string) {
    const task = await this.prisma.to_do_list.create({
      data: {
        title,
      },
    });

    return { message: 'To-do item added', task };
  }

  listAllTasks() {
    return this.prisma.to_do_list.findMany();
  }
}