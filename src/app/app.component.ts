import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public employees: Employee[];
  public editEmployee: Employee; //represents employee clicked to be edited
  public deleteEmployee: Employee; //represents employee clicked to be deleted

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

  public searchEmployees(key: string): void {

    console.log(key);

    //create an array to store the filtered result of employees based on user's search input
    const results: Employee[] = [];

    //looping through the list of all employees to find the match with user's search input
    for (const employee of this.employees) {

      //using Array.prototype.indexOf
      //The indexOf() method returns the first index at which a given element can be found in the array, or -1 if it is not present.
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }

    }

    this.employees = results;

    if (results.length === 0 || !key) {
      this.getEmployees();
    }

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
      //when modal is opened through edit button - set employee to the employee to be edited
      this.editEmployee = employee;
      //data-target will be id 'updateEmployeeModal' - same in app.component.html
      button.setAttribute('data-target', '#updateEmployeeModal');
    }

    //if button is delete employee
    if(mode === 'delete'){
      this.deleteEmployee = employee;
      //data-target will be id 'deleteEmployeeModal' - same in app.component.html
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }

    //add the button to the 'main-container' in app.component.html
    //now the button exists in the html
    container.appendChild(button);
    button.click();
  }

  public onAddEmployee(addForm:NgForm): void {

    //close the Add Employee window
    document.getElementById('add-employee-form').click();

    //call on employeeService addEmployee method and pass on the angular form's input
    //wait for response if any error
    this.employeeService.addEmployee(addForm.value).subscribe(

      (response: Employee) => {
        console.log(response);
        //reload and show original and newly added employee
        this.getEmployees();

        //reset to clear out previously filled out fields
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    )
  }

  public onUpdateEmployee(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteEmployee(employeeId: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
