import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}
  @Get()
  getEmployees(@Query('name') name: string) {
    return this.employeesService.getEmployees(name);
  }
  @Get(':id')
  getEmployee(@Param('id') id: number) {
    return this.employeesService.getEmployee(id);
  }
  @Post()
  addEmployee(@Body() body: any) {
    return this.employeesService.addEmployee(body);
  }
  @Delete(':id')
  async deleteEmployee(@Param('id', ParseIntPipe) employeeId: number) {
    return this.employeesService.deleteEmployee(employeeId);
  }
}
