import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from '../departments/department.model';
import { Employee } from '../employees/employee.model';
import { EmployeeAndDepartmentSeederService } from './employee.service';
import { Seeder } from './seeder';

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
  providers: [Seeder, Logger, EmployeeAndDepartmentSeederService],
})
export class SeederModule {}
