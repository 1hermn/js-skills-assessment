import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Employee } from 'src/employees/employee.model';

@Entity({ name: 'departments' })
export class Department extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  date: Date;

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
