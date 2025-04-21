import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ToDoModule } from './to-do-list/to-do.module';
import { ToDoController } from './to-do-list/to-do.controller';
import { ToDoService } from './to-do-list/to-do.service';

@Module({
  imports: [ToDoModule],
  controllers: [AppController, ToDoController],
  providers: [AppService, ToDoService],
})
export class AppModule {}
