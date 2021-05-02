package com.ayoubjamouhi.demo.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class StudentService {
    final private StudentRepository studentRepository;

    @Autowired
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public List<Student> getStudents() {
        return studentRepository.findAll();
    }

    public Student addNewStudent(Student student) {
        Optional<Student> studentByEmail = studentRepository.findStudentByEmail(student.getEmail());
        if (studentByEmail.isPresent()) {
            throw new IllegalStateException("email taken");
        }
        return this.studentRepository.save(student);
    }

    public void deleteStudent(Long id) {
        boolean exist = studentRepository.existsById(id);
        if (!exist) {
            throw new IllegalStateException("student not exist at id = " + id);
        }
        studentRepository.deleteById(id);
    }

    @Transactional
    public void updateStudent(Long studentId, String name, String email) {
        Optional<Student> studentById = Optional.ofNullable(studentRepository.findById(studentId).orElseThrow(() -> new IllegalStateException("Not exist")));
        if (studentById.isPresent() && !name.equals(studentById.get().getName())) {
            studentById.get().setName(name);
        }
        if (studentById.isPresent() && !email.equals(studentById.get().getEmail())) {

            studentById.get().setEmail(email);
        }
    }
}
