import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Department } from '../departments/department.model';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity({ name: 'employees' })
export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Column()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  lastName: string;

  @Column()
  date: Date;

  @IsNotEmpty()
  @IsString()
  @Column()
  company: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  position: string;

  @ManyToOne(() => Department, (department) => department.employees)
  department: Department;

  constructor(
    firstName: string,
    lastName: string,
    date: Date,
    company: string,
    position: string,
    department: Department,
  ) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.date = date;
    this.company = company;
    this.position = position;
    this.department = department;
  }
}
