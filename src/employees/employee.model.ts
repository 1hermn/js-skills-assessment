import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Department } from "src/departments/department.model";

@Entity({name: "employees"})
export class Employee extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    firstName: string;
    
    @Column()
    lastName: string;

    @Column()
    date: Date;
    
    @Column()
    company: string;

    @Column()
    position: string;

    @ManyToOne(type => Department, department => department.employees)
    department: Department;

    constructor(firstName: string, lastName: string, date: Date, company: string, position: string, department: Department, id?: number){
        super()
        this.firstName = firstName;
        this.lastName = lastName;
        this.date = date;
        this.company = company;
        this.position = position;
        this.department = department;
    }
}