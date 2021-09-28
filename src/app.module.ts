import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { DashboardService } from './app.service';
import { DepartmentsController } from './departments/departments.controller';
import { EmployeesController } from './employees/employees.controller';
import { DepartmentsService } from './departments/departments.service';
import { EmployeesService } from './employees/employees.service';
import { Employee } from './employees/employee.model';
import { Department } from './departments/department.model';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'test',
      database: 'jsskill',
      logging: false,
      synchronize: false,
      entities: [Employee, Department],
      keepConnectionAlive: true,
    }),
  ],
  controllers: [AppController, DepartmentsController, EmployeesController],
  providers: [DashboardService, DepartmentsService, EmployeesService],
})
export class AppModule {}
