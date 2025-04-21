import { Module } from '@nestjs/common';
import { ToDoController } from './to-do.controller';
import { ToDoService } from './to-do.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ToDoController],
  providers: [ToDoService, PrismaService],
})
export class ToDoModule {}