import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ToDoService } from './to-do.service';
import { Response } from 'express';

@Controller('todos')
export class ToDoController {
  constructor(private readonly toDoService: ToDoService) {}

  // @Get()
  // async getAllTasks(@Res() res: Response): Promise<any> {
  //   try {
  //     const tasks = await this.toDoService.getAllTasks();
  //     return res.json({
  //       tasks,
  //       success: true,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).json({
  //       message: 'Erro ao buscar as tarefas',
  //       error: error.message,
  //     });
  //   }
  // }

  @Get()
  getTodos(): string {
    return 'Lista de To-Dos';
  }
  
  @Get('list')
  getListTasks(): string {
    return 'Lista de To-Dos';
  }

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