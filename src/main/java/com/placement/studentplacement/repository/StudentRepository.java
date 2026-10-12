package com.placement.studentplacement.repository;

import com.placement.studentplacement.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Long> {

    List<Student> findByBranch(String branch);
    List<Student> findByPlacementStatus(String placementStatus);
    List<Student> findByCgpaGreaterThan(Double cgpa);
    List<Student> findByCgpaBetween(Double minCgpa, Double maxCgpa);
    List<Student> findAllByOrderByCgpaDesc();
    List<Student> findByNameContainingIgnoreCase(String name);
    List<Student> findByBranchAndCgpaGreaterThan(
        String branch,
        Double cgpa
    );
    List<Student> findByBranchAndCgpaGreaterThanAndPlacementStatus(
        String branch,
        Double cgpa,
        String placementStatus
    );
    List<Student> findAllByOrderByBranchAscCgpaDesc();

}