package com.placement.studentplacement.service;

import com.placement.studentplacement.Student;
import com.placement.studentplacement.StudentUpdateRequest;
import com.placement.studentplacement.exception.StudentNotFoundException;
import com.placement.studentplacement.repository.StudentRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    // Add student
    public Student addStudent(Student student) {
        return studentRepository.save(student);
    }

    // Get all students
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // Search students by name
    public List<Student> searchStudentsByName(String name) {
        return studentRepository.findByNameContainingIgnoreCase(name);
    }

    // Get students by branch
    public List<Student> getStudentsByBranch(String branch) {
        return studentRepository.findByBranch(branch);
    }

    // Get students by placement status
    public List<Student> getStudentsByPlacementStatus(String placementStatus) {
        return studentRepository.findByPlacementStatus(placementStatus);
    }

    // Get students with CGPA greater than given value
    public List<Student> getStudentsByCgpaAbove(Double cgpa) {
        return studentRepository.findByCgpaGreaterThan(cgpa);
    }

    // Get students between CGPA range
    public List<Student> getStudentsByCgpaBetween(
            Double minCgpa,
            Double maxCgpa) {

        return studentRepository.findByCgpaBetween(minCgpa, maxCgpa);
    }

    // Sort students by CGPA descending
    public List<Student> getStudentsSortedByCgpa() {
        return studentRepository.findAllByOrderByCgpaDesc();
    }

    // Search by branch and minimum CGPA
    public List<Student> searchStudentsByBranchAndCgpa(
            String branch,
            Double cgpa) {

        return studentRepository.findByBranchAndCgpaGreaterThan(
                branch,
                cgpa
        );
    }

    // Search using multiple conditions
    public List<Student> searchStudentsByMultipleConditions(
            String branch,
            Double minCgpa,
            String placementStatus) {

        return studentRepository
                .findByBranchAndCgpaGreaterThanAndPlacementStatus(
                        branch,
                        minCgpa,
                        placementStatus
                );
    }

    // Sort by branch ascending and CGPA descending
    public List<Student> getStudentsSortedByBranchAndCgpa() {
        return studentRepository.findAllByOrderByBranchAscCgpaDesc();
    }

    // Get student by ID
    public Student getStudentById(Long id) {

        return studentRepository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException(
                        "Student not found with id: " + id
                ));
    }

    // Pagination
    public Page<Student> getStudentsByPage(int page, int size) {

        return studentRepository.findAll(
                PageRequest.of(page, size)
        );
    }

    // Pagination + CGPA descending
    public Page<Student> getStudentsPageSortedByCgpa(
            int page,
            int size) {

        PageRequest pageRequest = PageRequest.of(
                page,
                size,
                Sort.by("cgpa").descending()
        );

        return studentRepository.findAll(pageRequest);
    }

    // Delete student
    public void deleteStudent(Long id) {

        Student existingStudent = studentRepository.findById(id)
            .orElseThrow(() -> new StudentNotFoundException(
                    "Student not found with id: " + id
            ));

        studentRepository.delete(existingStudent);
    }

    // Full update
    public Student updateStudent(Long id, Student student) {

        Student existingStudent = studentRepository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException(
                        "Student not found with id: " + id
                ));

        existingStudent.setName(student.getName());
        existingStudent.setEmail(student.getEmail());
        existingStudent.setPhone(student.getPhone());
        existingStudent.setBranch(student.getBranch());
        existingStudent.setCgpa(student.getCgpa());
        existingStudent.setPlacementStatus(student.getPlacementStatus());

        return studentRepository.save(existingStudent);
    }

    // Partial update
    public Student partialUpdateStudent(
            Long id,
            StudentUpdateRequest request) {

        Student existingStudent = studentRepository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException(
                        "Student not found with id: " + id
                ));

        if (request.getName() != null) {
            existingStudent.setName(request.getName());
        }

        if (request.getEmail() != null) {
            existingStudent.setEmail(request.getEmail());
        }

        if (request.getPhone() != null) {
            existingStudent.setPhone(request.getPhone());
        }

        if (request.getBranch() != null) {
            existingStudent.setBranch(request.getBranch());
        }

        if (request.getCgpa() != null) {
            existingStudent.setCgpa(request.getCgpa());
        }

        if (request.getPlacementStatus() != null) {
            existingStudent.setPlacementStatus(
                    request.getPlacementStatus()
            );
        }

        return studentRepository.save(existingStudent);
    }
}