// Grade Calculation Logic

function getGrade(marks) {
    if (marks === "" || marks === null || marks === undefined || isNaN(marks) || Number(marks) < 0 || Number(marks) > 100) {
        return "Invalid marks";
    }
    const num = Number(marks);
    if (num >= 90) {
        return "A";
    } else if (num >= 80) {
        return "B";
    } else if (num >= 70) {
        return "C";
    } else if (num >= 60) {
        return "D";
    } else {
        return "F";
    }
}


function checkGrade() {
    const name = document.getElementById("studentName").value.trim();
    const marks = document.getElementById("marks").value;
    const grade = getGrade(marks);

    if (name) {
        document.getElementById("result").innerHTML = `${name}'s grade is ${grade}`;
    } else {
        document.getElementById("result").innerHTML = `Your grade is ${grade}`;
    }

}

if (typeof module !== "undefined") {
    module.exports = { getGrade };
}