import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Employee } from '../employees/employee.model';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity({ name: 'departments' })
export class Department extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Column()
  name: string;

  @Column()
  date: Date;

  @IsNotEmpty()
  @IsString()
  @Column()
  description: string;

  @OneToMany(() => Employee, (employee) => employee.department)
  employees: Employee[];

  constructor(name: string, date: Date, description: string) {
    super();
    this.name = name;
    this.date = date;
    this.description = description;
  }
}
