package com.ayoubjamouhi.demo.student;

import com.fasterxml.jackson.core.util.RequestPayload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/student")
public class StudentController {

    final private StudentService studentService;
    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }
    @GetMapping
    public List<Student> getStudents() {
        return this.studentService.getStudents();
    }
    @PostMapping
    public Student RegisterNewStudent(@RequestBody Student student){
        return this.studentService.addNewStudent(student);

    }
    @DeleteMapping(path = "{studentId}")
    public void deleteStudent(@PathVariable Long studentId){
        this.studentService.deleteStudent(studentId);
    }

    @PutMapping(path="{studentId}")
    // RquestParam means ?name=xxx&email=xxx
    public void editStudent(@PathVariable Long studentId, @RequestParam String name, @RequestParam String email){
       this.studentService.updateStudent(studentId, name, email);
    }
}
