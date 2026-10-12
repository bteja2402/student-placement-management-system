package com.placement.studentplacement.controller;

import com.placement.studentplacement.StudentUpdateRequest;
import org.springframework.data.domain.Page;
import com.placement.studentplacement.Student;
import com.placement.studentplacement.service.StudentService;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("/students")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping
    public Student addStudent(@Valid @RequestBody Student student) {
        return studentService.addStudent(student);
    }

    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("/search/name")
    public List<Student> searchStudentsByName(@RequestParam String name) {
        return studentService.searchStudentsByName(name);
    }
 
    @GetMapping("/branch/{branch}")
    public List<Student> getStudentsByBranch(@PathVariable String branch) {
        return studentService.getStudentsByBranch(branch);
    }

    @GetMapping("/status/{placementStatus}")
    public List<Student> getStudentsByPlacementStatus(@PathVariable String placementStatus) {
        return studentService.getStudentsByPlacementStatus(placementStatus);
    }

    @GetMapping("/cgpa/above/{cgpa}")
    public List<Student> getStudentsByCgpaAbove(@PathVariable Double cgpa) {
        return studentService.getStudentsByCgpaAbove(cgpa);
    }

    @GetMapping("/cgpa/between/{minCgpa}/{maxCgpa}")
    public List<Student> getStudentsByCgpaBetween(
        @PathVariable Double minCgpa,
        @PathVariable Double maxCgpa) {

        return studentService.getStudentsByCgpaBetween(minCgpa, maxCgpa);
    }

    @GetMapping("/sort/cgpa")
    public List<Student> getStudentsSortedByCgpa() { 
       return studentService.getStudentsSortedByCgpa();
    }

    @GetMapping("/page/sort/cgpa")
    public Page<Student> getStudentsPageSortedByCgpa(
        @RequestParam int page,
        @RequestParam int size) {

        return studentService.getStudentsPageSortedByCgpa(page, size);
    }

    @GetMapping("/search")
    public List<Student> searchStudents(
        @RequestParam String branch,
        @RequestParam Double minCgpa) {

        return studentService.searchStudentsByBranchAndCgpa(
            branch,
            minCgpa
        );
    }

    @GetMapping("/search/filter")
    public List<Student> searchStudentsByMultipleConditions(
        @RequestParam String branch,
        @RequestParam Double minCgpa,
        @RequestParam String status) {

        return studentService.searchStudentsByMultipleConditions(
            branch,
            minCgpa,
            status
        );
    }

    @GetMapping("/sort/branch-cgpa")
    public List<Student> getStudentsSortedByBranchAndCgpa() {
        return studentService.getStudentsSortedByBranchAndCgpa();
    }

    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id);
    }

    @PatchMapping("/{id}")
    public Student partialUpdateStudent(
        @PathVariable Long id,
        @RequestBody StudentUpdateRequest request) {
            return studentService.partialUpdateStudent(id, request);
    }

    @GetMapping("/page")
    public Page<Student> getStudentsByPage(
        @RequestParam int page,
        @RequestParam int size) {
        return studentService.getStudentsByPage(page, size);
    }
    
    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable Long id, @Valid @RequestBody Student student) {
        return studentService.updateStudent(id, student);
    }

    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return "Student deleted successfully";
    }
}