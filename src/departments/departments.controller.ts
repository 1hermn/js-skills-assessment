import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Redirect } from '@nestjs/common';
import { DepartmentsService } from './departments.service';

@Controller('departments')
export class DepartmentsController {
    constructor(private readonly departmentService: DepartmentsService) {}
    @Get()
    getDepartments() : object {
        return this.departmentService.getDepartments();
    }
    @Get(':departmentId')
    getDepartment(@Param('departmentId', ParseIntPipe) departmentId: number) {
        return this.departmentService.getDepartment(departmentId);
    }
    @Post()
    add(@Body() body: any): void {
        return this.departmentService.add(body);
    }
    @Delete()
    delete(@Body() body: any): void {
        return this.departmentService.delete(body);
    }
    @Post('edit/:id')
    edit(@Body() body: any): void {
        return this.departmentService.edit(body);
    }
    @Post(':departmentId')
    addEmployee(@Body() body: any, @Param('departmentId', ParseIntPipe) departmentId: number): void {
        return this.departmentService.addEmployee(body, departmentId);
    }
    @Delete(':departmentId/:employeeId')
    deleteEmployee(@Param('employeeId', ParseIntPipe) employeeId: number, @Param('departmentId', ParseIntPipe) departmentId: number): void {
        return this.departmentService.deleteEmployee(employeeId, departmentId)
    }
}
