import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http'
import { Student } from './Student';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiBaseUrl = environment.apiBaseUrl;
  private url: string;
  constructor(private http: HttpClient) { }

  public getStudents(): Observable<Student[]> {
    this.url = `${this.apiBaseUrl}/api/v1/student`;
    console.log(this.url);
    return this.http.get<Student[]>(this.url);
  }

  public addStudent(student: Student): Observable<Student> {
    this.url = `${this.apiBaseUrl}/api/v1/student`
    return this.http.post<Student>(this.url, student);
  }

  public updateStudent(student: Student, id: number): Observable<Student> {
    this.url = `${this.apiBaseUrl}/api/v1/student/${id}`
    return this.http.put<Student>(this.url, {}, {params: {name: student.name, email: student.email, dob: student.dob}});
  }

  public deleteStudent(id: number): Observable<Student> {
    this.url = `${this.apiBaseUrl}/api/v1/student/${id}`
    return this.http.delete<Student>(this.url);
  }
}
