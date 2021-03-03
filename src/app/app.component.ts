import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public employees: Employee[];

  constructor(private employeeService: EmployeeService) { }

  //ngOnInit will call on getEmployees method and set response of type Employee[]
  ngOnInit(){
    this.getEmployees();
  }

  public getEmployees(): void{
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(employee: Employee, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    //if button is add employee
    if(mode === 'add'){
      //data-target will be id 'addEmployeeModal' - same in app.component.html
      button.setAttribute('data-target', '#addEmployeeModal');
    }

    //if button is edit employee
    if(mode === 'edit'){
      //data-target will be id 'updateEmployeeModal' - same in app.component.html
      button.setAttribute('data-target', '#updateEmployeeModal');
    }

    //of button is delete employee
    if(mode === 'delete'){
      //data-target will be id 'deleteEmployeeModal' - same in app.component.html
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }

    //add the button to the 'main-container' in app.component.html
    //now the button exists in the html
    container.appendChild(button);
    button.click();
  }
}
