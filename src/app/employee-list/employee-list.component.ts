import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employeeservices.service';
import { Employee } from '../shared/employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(
      (employees) => {
        debugger;
        this.employees = employees;
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  onDeleteEmployee(empId: number): void {
    this.employeeService.deleteEmployee(empId).subscribe(
      () => {
        this.getEmployees(); // Refresh the employee list after deletion
      },
      (error) => {
        console.error('Error deleting employee:', error);
      }
    );
  }
}

