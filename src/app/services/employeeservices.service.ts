import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../shared/employee';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {

   }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}Employee`);
  }

  getEmployeeById(empId: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}Employee/${empId}`);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}Employee`, employee);
  }

  updateEmployee(empId: number, employee: Employee): Observable<Employee> {
    debugger;
    return this.http.put<Employee>(`${this.apiUrl}Employee/${empId}`, employee);
  }

  deleteEmployee(empId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}Employee/${empId}`);
  }
}
