import { Body, Controller, Delete, Get, Param, Post, Res } from '@nestjs/common';
import { ToDoService } from './to-do.service';
import { Response } from 'express';

@Controller('todos')
export class ToDoController {
  constructor(private readonly toDoService: ToDoService) { }

  @Get()
  async getAllTasks(@Res() res: Response): Promise<any> {
    try {
      const tasks = await this.toDoService.listAllTasks();
      return res.json({
        tasks,
        success: true,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Erro ao buscar as tarefas',
        error: error.message,
      });
    }
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

  @Delete(':id')
  async deleteTask(@Param('id') id: number, @Res() res: Response): Promise<any> {
    try {
      const result = await this.toDoService.removeTask(Number(id)); // Converta o id para número
      return res.json({
        ...result,
        success: true,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Erro ao deletar a tarefa',
        error: error.message,
      });
    }
  }
}