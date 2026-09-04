# Student Grade Checker - Analysis & Proposed Changes

> [!NOTE]
> **Repository Status**: Currently on branch `feature-add-student-name` (synced with `main` at `adb7052`). Working tree is clean. No code changes have been applied yet.

---

## 1. Project Architecture Overview

| Component | File Path | Current Role |
| :--- | :--- | :--- |
| **Markup (UI)** | [index.html](file:///c:/Users/Archanaa/Desktop/Vibe%20Codimg/Git_Projects/Student-Grade-Checker/index.html) | Single score input (`#marks`), submit button, and `#result` header. |
| **Logic** | [script.js](file:///c:/Users/Archanaa/Desktop/Vibe%20Codimg/Git_Projects/Student-Grade-Checker/script.js) | Grade evaluation [`getGrade()`](file:///c:/Users/Archanaa/Desktop/Vibe%20Codimg/Git_Projects/Student-Grade-Checker/script.js#L3-L18) and DOM controller [`checkGrade()`](file:///c:/Users/Archanaa/Desktop/Vibe%20Codimg/Git_Projects/Student-Grade-Checker/script.js#L20-L24). |
| **Unit Tests** | [test/grade.test.js](file:///c:/Users/Archanaa/Desktop/Vibe%20Codimg/Git_Projects/Student-Grade-Checker/test/grade.test.js) | Node test suite (`node --test`) with 6 test cases for grades A–F and basic range checks (`-1`, `101`). |
| **Styles** | [style.css](file:///c:/Users/Archanaa/Desktop/Vibe%20Codimg/Git_Projects/Student-Grade-Checker/style.css) | Flexbox card layout with basic button/input styling. |
| **CI/CD** | [.github/workflows/ci.yml](file:///c:/Users/Archanaa/Desktop/Vibe%20Codimg/Git_Projects/Student-Grade-Checker/.github/workflows/ci.yml)<br>[.github/workflows/cd.yml](file:///c:/Users/Archanaa/Desktop/Vibe%20Codimg/Git_Projects/Student-Grade-Checker/.github/workflows/cd.yml) | Automated test execution on PRs/pushes and deployment to GitHub Pages. |

---

## 2. Deep Dive: Findings for the 3 Requested Changes

### Change [1]: Add Student Name
* **Goal**: Add an input text field for the student's name and display the student's name alongside the grade in the output result.

#### Findings & Planned Modifications:
1. **[index.html](file:///c:/Users/Archanaa/Desktop/Vibe%20Codimg/Git_Projects/Student-Grade-Checker/index.html)**:
   - Currently, there is only `<input type="number" id="marks" ...>`.
   - Add a text input field above the score input:
     ```html
     <input type="text" id="studentName" placeholder="Enter student name">
     ```
2. **[script.js](file:///c:/Users/Archanaa/Desktop/Vibe%20Codimg/Git_Projects/Student-Grade-Checker/script.js)**:
   - Currently, [`checkGrade()`](file:///c:/Users/Archanaa/Desktop/Vibe%20Codimg/Git_Projects/Student-Grade-Checker/script.js#L20-L24) only reads `#marks` and sets `document.getElementById("result").innerHTML = "Your grade is " + grade;`.
   - Update [`checkGrade()`](file:///c:/Users/Archanaa/Desktop/Vibe%20Codimg/Git_Projects/Student-Grade-Checker/script.js#L20-L24) to retrieve `#studentName` value and construct the result message:
     ```javascript
     const name = document.getElementById("studentName").value.trim();
     const marks = document.getElementById("marks").value;
     const grade = getGrade(marks);
     
     if (name) {
         document.getElementById("result").innerHTML = `${name}'s grade is ${grade}`;
     } else {
         document.getElementById("result").innerHTML = `Your grade is ${grade}`;
     }
     ```

---

### Change [2]: Score Must Be a Number & Validation
* **Goal**: Ensure score input is numerical in the UI and rigorously validated against invalid/non-numeric inputs in code.

#### Findings & Planned Modifications:
1. **[index.html](file:///c:/Users/Archanaa/Desktop/Vibe%20Codimg/Git_Projects/Student-Grade-Checker/index.html)**:
   - `<input type="number" id="marks" placeholder="Enter your marks here" min="0" max="100">` is already configured with `type="number"`.
2. **[script.js](file:///c:/Users/Archanaa/Desktop/Vibe%20Codimg/Git_Projects/Student-Grade-Checker/script.js)**:
   - **Bug identified**: In [`getGrade(marks)`](file:///c:/Users/Archanaa/Desktop/Vibe%20Codimg/Git_Projects/Student-Grade-Checker/script.js#L3-L18):
     ```javascript
     if (marks < 0 || marks > 100) {
         return "Invalid marks";
     }
     ```
     When a non-numeric value (such as `"abc"`, `NaN`, or empty string `""`) is passed, expressions like `"abc" < 0` and `"abc" > 100` evaluate to `false`. The function skips all grade boundaries and falls through to the final `else`, returning **`"F"`** instead of **`"Invalid marks"`**.
   - **Fix**: Add explicit numeric verification in [`getGrade(marks)`](file:///c:/Users/Archanaa/Desktop/Vibe%20Codimg/Git_Projects/Student-Grade-Checker/script.js#L3-L18):
     ```javascript
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
     ```

---

### Change [3]: Add Test Case for the New Validation
* **Goal**: Add unit test coverage verifying that non-numeric, invalid, or malformed score inputs return `"Invalid marks"`.

#### Findings & Planned Modifications:
1. **[test/grade.test.js](file:///c:/Users/Archanaa/Desktop/Vibe%20Codimg/Git_Projects/Student-Grade-Checker/test/grade.test.js)**:
   - Currently, the `"Invalid Marks"` test suite only checks boundary values `-1` and `101`:
     ```javascript
     test("Invalid Marks", () => {
         assert.strictEqual(getGrade(-1), "Invalid marks");
         assert.strictEqual(getGrade(101), "Invalid marks");
     });
     ```
   - **Update**: Add test assertions for non-numeric values (e.g. string text `"abc"`, `NaN`, `null`, `""`):
     ```javascript
     test("Invalid Marks", () => {
         assert.strictEqual(getGrade(-1), "Invalid marks");
         assert.strictEqual(getGrade(101), "Invalid marks");
         assert.strictEqual(getGrade("abc"), "Invalid marks");
         assert.strictEqual(getGrade(NaN), "Invalid marks");
     });
     ```

---

## 3. Summary of Files to Touch

```
Student-Grade-Checker/
├── index.html          # Add #studentName input element
├── script.js           # Add isNaN validation in getGrade() & format result in checkGrade()
└── test/
    └── grade.test.js   # Add test cases for non-numeric & invalid inputs
```
