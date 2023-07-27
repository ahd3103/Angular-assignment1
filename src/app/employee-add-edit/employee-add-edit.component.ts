import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../services/employeeservices.service';
import { Skill } from '../shared/employee';


@Component({
  selector: 'app-employee-add-edit',
  templateUrl: './employee-add-edit.component.html',
  styleUrls: ['./employee-add-edit.component.scss']
})
export class EmployeeAddEditComponent implements OnInit {
  employeeForm: FormGroup;
  experienceOptions: number[] = [1, 2, 3 ,4 ,5 ,6 ,7 ,10 ,11 ,12 ,13 ,14 ,15];
  isEditMode: boolean = false;
  employeeId:number=0;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
     contactNumber: ['', Validators.required],
     email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      skills: this.fb.array([])
    });
  }

  ngOnInit(): void {
    const empId = this.route.snapshot.paramMap.get('id');
    this.employeeId=Number(empId);

    if (empId) {
      this.isEditMode = true;
      this.getEmployeeById(+empId);
    } else {
      this.addSkill();
    }
  }

  getEmployeeById(empId: number): void {
    this.employeeService.getEmployeeById(empId).subscribe(
      (employee:any) => {
        this.employeeForm.patchValue(employee);
        if(employee.skills != null)
        employee.skills.forEach((skill: Skill) => this.addSkill(skill));
        //employee.skills.forEach((skill) => this.addSkill(skill));
      },
      (error) => {
        console.error('Error fetching employee:', error);
      }
    );
  }

  get skills() {
    return this.employeeForm.get('skills') as FormArray;
  }

  onSubmit(): void {
    debugger;
    const formValue = this.employeeForm.value;
    if (this.isEditMode) {
      this.employeeService.updateEmployee(this.employeeId, formValue).subscribe(
        () => {
          this.router.navigate(['/employees']);
        },
        (error) => {
          console.error('Error updating employee:', error);
        }
      );
    } else {
      this.employeeService.addEmployee(formValue).subscribe(
        () => {
          this.router.navigate(['/employees']);
        },
        (error) => {
          console.error('Error adding employee:', error);
        }
      );
    }
  }

  addSkill(skill?: Skill): void {
    const skillFormGroup = this.fb.group({
      skillName: [skill ? skill.skillName : '', Validators.required],
      skillExperience: [skill ? skill.skillExperience : '', Validators.required]
    });

    this.skills.push(skillFormGroup);
  }

  removeSkill(index: number): void {
    if (this.skills.length > 0) {
      this.skills.removeAt(index);
    }
  }
}

