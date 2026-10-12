// =====================================================
// STUDENT PLACEMENT MANAGEMENT SYSTEM
// =====================================================


// ===============================
// API CONFIGURATION
// ===============================

const API_URL = "http://localhost:8080/students";

let auth = "";

let editingStudentId = null;

let currentPage = 0;

const pageSize = 3;


// ===============================
// LOGIN
// ===============================

function login() {

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value;

    const loginError =
        document.getElementById("loginError");


    if (username === "" || password === "") {

        loginError.textContent =
            "Please enter username and password";

        return;
    }


    auth =
        "Basic " + btoa(username + ":" + password);


    testLogin();
}


// ===============================
// TEST LOGIN
// ===============================

async function testLogin() {

    const loginError =
        document.getElementById("loginError");

    try {

        const response = await fetch(
            API_URL,
            {
                method: "GET",

                headers: {
                    "Authorization": auth
                }
            }
        );


        if (!response.ok) {

            loginError.textContent =
                "Invalid username or password";

            auth = "";

            return;
        }


        // Hide login

        document.getElementById("loginSection")
            .style.display = "none";


        // Show dashboard

        document.getElementById("dashboard")
            .style.display = "block";


        // Load students

        loadStudents();

    } catch (error) {

        console.error(error);

        loginError.textContent =
            "Unable to connect to server";
    }
}


// ===============================
// LOGOUT
// ===============================

function logout() {

    auth = "";

    editingStudentId = null;

    currentPage = 0;


    document.getElementById("dashboard")
        .style.display = "none";


    document.getElementById("loginSection")
        .style.display = "flex";


    document.getElementById("username").value = "";

    document.getElementById("password").value = "";

    document.getElementById("loginError").textContent = "";

}


// ===============================
// LOAD ALL STUDENTS
// ===============================

async function loadStudents() {

    try {

        const response = await fetch(
            API_URL,
            {
                method: "GET",

                headers: {
                    "Authorization": auth
                }
            }
        );


        if (!response.ok) {

            throw new Error(
                "Failed to load students"
            );
        }


        const students =
            await response.json();


        displayStudents(students);


    } catch (error) {

        console.error(error);

        showMessage(
            "Unable to load students"
        );
    }
}


// ===============================
// DISPLAY STUDENTS
// ===============================

function displayStudents(students) {

    const tableBody =
        document.getElementById(
            "studentTableBody"
        );


    tableBody.innerHTML = "";


    // ===============================
    // DASHBOARD STATISTICS
    // ===============================

    const totalStudents =
        students.length;


    const placedStudents =
        students.filter(
            student =>
                student.placementStatus === "Placed"
        ).length;


    const notPlacedStudents =
        students.filter(
            student =>
                student.placementStatus === "Not Placed"
        ).length;


    document.getElementById(
        "totalStudents"
    ).textContent = totalStudents;


    document.getElementById(
        "placedStudents"
    ).textContent = placedStudents;


    document.getElementById(
        "notPlacedStudents"
    ).textContent = notPlacedStudents;


    // ===============================
    // DISPLAY TABLE ROWS
    // ===============================

    students.forEach(student => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>${student.id}</td>

            <td>${student.name}</td>

            <td>${student.email}</td>

            <td>${student.phone}</td>

            <td>${student.branch}</td>

            <td>${student.cgpa}</td>

            <td>${student.placementStatus}</td>

            <td>

                <button
                    onclick="editStudent(${student.id})"
                >
                    Edit
                </button>


                <button
                    onclick="deleteStudent(${student.id})"
                >
                    Delete
                </button>


                <button
                    onclick="quickUpdateStatus(
                        ${student.id},
                        '${student.placementStatus}'
                    )"
                >
                    Change Status
                </button>

            </td>

        `;


        tableBody.appendChild(row);

    });
}


// ===============================
// ADD / UPDATE STUDENT
// ===============================

document.getElementById(
    "studentForm"
).addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const student = {

            name:
                document.getElementById(
                    "name"
                ).value.trim(),


            email:
                document.getElementById(
                    "email"
                ).value.trim(),


            phone:
                document.getElementById(
                    "phone"
                ).value.trim(),


            branch:
                document.getElementById(
                    "branch"
                ).value.trim(),


            cgpa:
                parseFloat(
                    document.getElementById(
                        "cgpa"
                    ).value
                ),


            placementStatus:
                document.getElementById(
                    "placementStatus"
                ).value

        };


        // ===============================
        // UPDATE STUDENT
        // ===============================

        if (editingStudentId !== null) {

            try {

                const response =
                    await fetch(
                        `${API_URL}/${editingStudentId}`,
                        {
                            method: "PUT",

                            headers: {
                                "Authorization": auth,
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(student)
                        }
                    );


                if (!response.ok) {

                    throw new Error(
                        "Failed to update student"
                    );
                }


                await response.json();


                showMessage(
                    "Student updated successfully!"
                );


                editingStudentId = null;


                document.getElementById(
                    "studentForm"
                ).reset();


                document.querySelector(
                    "#studentForm button"
                ).textContent =
                    "Add Student";


                loadStudents();


            } catch (error) {

                console.error(error);

                showMessage(
                    "Unable to update student"
                );
            }


            return;
        }


        // ===============================
        // ADD STUDENT
        // ===============================

        try {

            const response =
                await fetch(
                    API_URL,
                    {
                        method: "POST",

                        headers: {
                            "Authorization": auth,
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(student)
                    }
                );


            if (!response.ok) {

                throw new Error(
                    "Failed to add student"
                );
            }


            await response.json();


            showMessage(
                "Student added successfully!"
            );


            document.getElementById(
                "studentForm"
            ).reset();


            loadStudents();


        } catch (error) {

            console.error(error);

            showMessage(
                "Unable to add student"
            );
        }

    }
);


// ===============================
// EDIT STUDENT
// ===============================

async function editStudent(id) {

    try {

        const response =
            await fetch(
                `${API_URL}/${id}`,
                {
                    method: "GET",

                    headers: {
                        "Authorization": auth
                    }
                }
            );


        if (!response.ok) {

            throw new Error(
                "Failed to get student"
            );
        }


        const student =
            await response.json();


        editingStudentId = id;


        // Fill form

        document.getElementById(
            "name"
        ).value = student.name;


        document.getElementById(
            "email"
        ).value = student.email;


        document.getElementById(
            "phone"
        ).value = student.phone;


        document.getElementById(
            "branch"
        ).value = student.branch;


        document.getElementById(
            "cgpa"
        ).value = student.cgpa;


        document.getElementById(
            "placementStatus"
        ).value =
            student.placementStatus;


        // Change button

        document.querySelector(
            "#studentForm button"
        ).textContent =
            "Update Student";


        // Scroll to form

        document.querySelector(
            ".student-form"
        ).scrollIntoView({
            behavior: "smooth"
        });


    } catch (error) {

        console.error(error);

        showMessage(
            "Unable to load student"
        );
    }
}


// ===============================
// DELETE STUDENT
// ===============================

async function deleteStudent(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this student?"
        );


    if (!confirmDelete) {

        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/${id}`,
                {
                    method: "DELETE",

                    headers: {
                        "Authorization": auth
                    }
                }
            );


        if (!response.ok) {

            throw new Error(
                "Failed to delete student"
            );
        }


        showMessage(
            "Student deleted successfully!"
        );


        loadStudents();


    } catch (error) {

        console.error(error);

        showMessage(
            "Unable to delete student"
        );
    }
}


// ===============================
// QUICK UPDATE STATUS
// ===============================

async function quickUpdateStatus(
    id,
    currentStatus
) {

    const newStatus =
        currentStatus === "Placed"
            ? "Not Placed"
            : "Placed";


    try {

        const response =
            await fetch(
                `${API_URL}/${id}`,
                {
                    method: "PATCH",

                    headers: {
                        "Authorization": auth,
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        placementStatus: newStatus
                    })
                }
            );


        if (!response.ok) {

            throw new Error(
                "Failed to update status"
            );
        }


        showMessage(
            "Placement status updated successfully!"
        );


        loadStudents();


    } catch (error) {

        console.error(error);

        showMessage(
            "Unable to update placement status"
        );
    }
}


// ===============================
// SEARCH STUDENTS BY NAME
// ===============================

async function searchStudents() {

    const name =
        document.getElementById(
            "searchName"
        ).value.trim();


    if (name === "") {

        loadStudents();

        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/search/name?name=${encodeURIComponent(name)}`,
                {
                    method: "GET",

                    headers: {
                        "Authorization": auth
                    }
                }
            );


        if (!response.ok) {

            throw new Error(
                "Failed to search students"
            );
        }


        const students =
            await response.json();


        displayStudents(students);


    } catch (error) {

        console.error(error);

        showMessage(
            "Unable to search students"
        );
    }
}


// ===============================
// FILTER BY PLACEMENT STATUS
// ===============================

async function filterByStatus() {

    const status =
        document.getElementById(
            "statusFilter"
        ).value;


    if (status === "") {

        loadStudents();

        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/status/${encodeURIComponent(status)}`,
                {
                    method: "GET",

                    headers: {
                        "Authorization": auth
                    }
                }
            );


        if (!response.ok) {

            throw new Error(
                "Failed to filter students"
            );
        }


        const students =
            await response.json();


        displayStudents(students);


    } catch (error) {

        console.error(error);

        showMessage(
            "Unable to filter students"
        );
    }
}


// ===============================
// FILTER BY MINIMUM CGPA
// ===============================

async function filterByCgpa() {

    const cgpa =
        document.getElementById(
            "minCgpa"
        ).value;


    if (cgpa === "") {

        loadStudents();

        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/cgpa/above/${cgpa}`,
                {
                    method: "GET",

                    headers: {
                        "Authorization": auth
                    }
                }
            );


        if (!response.ok) {

            throw new Error(
                "Failed to filter by CGPA"
            );
        }


        const students =
            await response.json();


        displayStudents(students);


    } catch (error) {

        console.error(error);

        showMessage(
            "Unable to filter by CGPA"
        );
    }
}


// ===============================
// FILTER BY CGPA RANGE
// ===============================

async function filterByCgpaRange() {

    const minCgpa =
        document.getElementById(
            "minCgpaRange"
        ).value;


    const maxCgpa =
        document.getElementById(
            "maxCgpaRange"
        ).value;


    if (
        minCgpa === "" ||
        maxCgpa === ""
    ) {

        showMessage(
            "Please enter both minimum and maximum CGPA"
        );

        return;
    }


    if (
        parseFloat(minCgpa) >
        parseFloat(maxCgpa)
    ) {

        showMessage(
            "Minimum CGPA cannot be greater than maximum CGPA"
        );

        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/cgpa/between/${minCgpa}/${maxCgpa}`,
                {
                    method: "GET",

                    headers: {
                        "Authorization": auth
                    }
                }
            );


        if (!response.ok) {

            throw new Error(
                "Failed to filter by CGPA range"
            );
        }


        const students =
            await response.json();


        displayStudents(students);


    } catch (error) {

        console.error(error);

        showMessage(
            "Unable to filter by CGPA range"
        );
    }
}


// ===============================
// SORT BY CGPA
// ===============================

async function sortByCgpa() {

    try {

        const response =
            await fetch(
                `${API_URL}/sort/cgpa`,
                {
                    method: "GET",

                    headers: {
                        "Authorization": auth
                    }
                }
            );


        if (!response.ok) {

            throw new Error(
                "Failed to sort by CGPA"
            );
        }


        const students =
            await response.json();


        displayStudents(students);


    } catch (error) {

        console.error(error);

        showMessage(
            "Unable to sort students"
        );
    }
}


// ===============================
// SORT BY BRANCH + CGPA
// ===============================

async function sortByBranchAndCgpa() {

    try {

        const response =
            await fetch(
                `${API_URL}/sort/branch-cgpa`,
                {
                    method: "GET",

                    headers: {
                        "Authorization": auth
                    }
                }
            );


        if (!response.ok) {

            throw new Error(
                "Failed to sort students"
            );
        }


        const students =
            await response.json();


        displayStudents(students);


    } catch (error) {

        console.error(error);

        showMessage(
            "Unable to sort students"
        );
    }
}


// ===============================
// LOAD PAGINATED STUDENTS
// ===============================

async function loadPage() {

    try {

        const response =
            await fetch(
                `${API_URL}/page?page=${currentPage}&size=${pageSize}`,
                {
                    method: "GET",

                    headers: {
                        "Authorization": auth
                    }
                }
            );


        if (!response.ok) {

            throw new Error(
                "Failed to load page"
            );
        }


        const data =
            await response.json();


        displayStudents(
            data.content
        );


        document.getElementById(
            "pageNumber"
        ).textContent =
            `Page ${currentPage + 1} of ${data.totalPages}`;


        // Previous button

        document.querySelector(
            ".pagination button:first-child"
        ).disabled = data.first;


        // Next button

        document.querySelector(
            ".pagination button:last-child"
        ).disabled = data.last;


    } catch (error) {

        console.error(error);

        showMessage(
            "Unable to load page"
        );
    }
}


// ===============================
// PREVIOUS PAGE
// ===============================

function previousPage() {

    if (currentPage > 0) {

        currentPage--;

        loadPage();
    }
}


// ===============================
// NEXT PAGE
// ===============================

function nextPage() {

    currentPage++;

    loadPage();
}


// ===============================
// SHOW MESSAGE
// ===============================

function showMessage(message) {

    const messageBox =
        document.getElementById(
            "messageBox"
        );


    if (!messageBox) {

        alert(message);

        return;
    }


    messageBox.textContent =
        message;


    messageBox.style.display =
        "block";


    setTimeout(() => {

        messageBox.style.display =
            "none";

    }, 3000);
}