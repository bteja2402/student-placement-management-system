# Student Placement Management System

A full-stack web application for managing student information and placement status using Spring Boot, MySQL, Spring Security, HTML, CSS and JavaScript.

## 📌 Project Overview

The Student Placement Management System allows administrators to manage student placement information through a web-based dashboard.

The application provides CRUD operations, student search and filtering, CGPA-based filtering, sorting, pagination, authentication, validation and exception handling.

## 🚀 Features

- Admin login and logout
- Add student
- View all students
- View student by ID
- Update student details
- Partially update student details
- Delete student
- Search students by name
- Filter students by branch
- Filter students by placement status
- Filter students by minimum CGPA
- Filter students by CGPA range
- Sort students by CGPA
- Sort students by branch and CGPA
- Search using multiple conditions
- Pagination
- Quick placement-status update
- Form validation
- Global exception handling
- Spring Security authentication
- ADMIN authorization
- Responsive frontend
- Dashboard statistics

## 🛠️ Technologies Used

### Backend
- Java 25
- Spring Boot 4.1.1
- Spring Data JPA
- Spring Security
- REST API
- Maven

### Database
- MySQL
- Hibernate / JPA

### Frontend
- HTML5
- CSS3
- JavaScript

### Tools
- Visual Studio Code
- Thunder Client
- Git
- GitHub

## 🏗️ Project Structure

```text
student-placement-system
│
├── src
│   └── main
│       ├── java
│       │   └── com
│       │       └── placement
│       │           └── studentplacement
│       │               ├── Student.java
│       │               ├── StudentUpdateRequest.java
│       │               │
│       │               ├── controller
│       │               │   └── StudentController.java
│       │               │
│       │               ├── service
│       │               │   └── StudentService.java
│       │               │
│       │               ├── repository
│       │               │   └── StudentRepository.java
│       │               │
│       │               ├── exception
│       │               │   ├── ErrorResponse.java
│       │               │   ├── GlobalExceptionHandler.java
│       │               │   └── StudentNotFoundException.java
│       │               │
│       │               └── security
│       │                   └── SecurityConfig.java
│       │
│       └── resources
│
├── frontend
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── pom.xml
└── README.md