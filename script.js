// Grade Calculation Logic

function getGrade(marks) {
    if (marks < 0 || marks > 100) {
        return "Invalid marks";
    } else if (marks >= 90) {
        return "A";
    } else if (marks >= 80) {
        return "B";
    } else if (marks >= 70) {
        return "C";
    } else if (marks >= 60) {
        return "D";
    } else {
        // Assign grade F if marks are less than 60
        return "F";
    }
}

function checkGrade() {
    const marks = document.getElementById("marks").value;
    const grade = getGrade(marks);
    document.getElementById("result").innerHTML = "Your grade is " + grade;
}

if (typeof module !== "undefined") {
    module.exports = { getGrade };
}