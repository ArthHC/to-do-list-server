import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ToDoService {
  constructor(private readonly prisma: PrismaService) {}

  async addToDo(title: string) {
    if (!title || title.trim() === '') {
      throw new InternalServerErrorException('Title cannot be empty');
    }
  
    try {
      const task = await this.prisma.to_do_list.create({
        data: {
          title,
        },
      });
  
      return { message: 'To-do item added successfully', task };
    } catch (error) {
      console.error('Error adding to-do item:', error);
      throw new InternalServerErrorException('Could not add to-do item');
    }
  }

  listAllTasks() {
    return this.prisma.to_do_list.findMany();
  }

  async removeTask(id: number) {
    try {
      const task = await this.prisma.to_do_list.findUnique({
        where: { id },
      });

      if (!task) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }

      await this.prisma.to_do_list.delete({
        where: { id },
      });

      return { message: 'Task removed successfully', task };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error removing task:', error);
      throw new InternalServerErrorException('Could not remove task');
    }
  }
}