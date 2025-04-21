import { Body, Controller, Post, Res } from '@nestjs/common';
import { ToDoService } from './to-do.service';
import { Response } from 'express';

@Controller('todos')
export class ToDoController {
  constructor(private readonly toDoService: ToDoService) {}

  @Post()
  async createTask(@Body() { title }: { title: string }, @Res() res: Response): Promise<any> {
    try {
      const result = await this.toDoService.addToDo(title);
      return res.json({
        ...result,
        success: true,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Erro ao criar a tarefa',
        error: error.message,
      });
    }
  }
}