import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Student } from './Student';
import { StudentService } from './student.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  public students: Student[]
  public editstudent: Student
  public deletedId: number
  constructor(private studentService: StudentService){}

  ngOnInit(): void {
    this.getStudents()
  }

  public getStudents() {
    this.studentService.getStudents().subscribe((response: Student[]) => {
      this.students= response
    }, (error: HttpErrorResponse) => {
      alert(error.message)
    });
  }

  public addStudent(addForm: NgForm) {
    console.log(addForm.value)
    this.studentService.addStudent(addForm.value).subscribe(
      (response: Student) => {
        console.log(response)
        this.closeModal('create')
          this.getStudents()
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public editStudent(student: Student, id: number) {
    console.log(student,id)
    this.studentService.updateStudent(student, id).subscribe(
      (response: Student) => {
        this.getStudents()
        this.closeModal('edit')
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public removeStudent(id: number) {
    console.log(id)
    this.studentService.deleteStudent(id).subscribe(
      (response: Student) => {
        this.getStudents()
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public showModal(student: Student, modalID: string) {
    const container = document.getElementById("container")
    const button  = document.createElement('button')
    button.type = "button"
    button.style.display = "none"
    if(modalID == 'edit') {
      console.log(student)
      this.editstudent = student
      //this.editStudent(this.editstudent)
    }
    if(modalID == 'delete') {
      console.log('delete')
      this.deletedId = student.id
    }
    container.appendChild(button)
    this.toggleModal(modalID)
  }

  public toggleModal(modalID: string) {
      document.getElementById(modalID)?.classList.toggle("hidden");
      document.getElementById(modalID + "-backdrop")?.classList.toggle("hidden");
      document.getElementById(modalID)?.classList.toggle("flex");
      document.getElementById(modalID + "-backdrop")?.classList.toggle("flex")
  }
  public closeModal(modalID: string) {
      document.getElementById(modalID)?.classList.toggle("hidden");
      document.getElementById(modalID + "-backdrop")?.classList.toggle("hidden");
      document.getElementById(modalID)?.classList.toggle("flex");
      document.getElementById(modalID + "-backdrop")?.classList.toggle("flex")
  }
}
