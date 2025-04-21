import { Module } from '@nestjs/common';
import { ToDoController } from './to-do.controller';
import { ToDoService } from './to-do.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ToDoController],
  providers: [ToDoService],
})
export class ToDoModule {}