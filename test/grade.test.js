const test = require("node:test");
const assert = require("node:assert");

const { getGrade } = require("../script");

test("Grade A", () => {
    assert.strictEqual(getGrade(95), "A");
    assert.strictEqual(getGrade(90), "A");
})

test("Grade B", () => {
    assert.strictEqual(getGrade(89), "B");
    assert.strictEqual(getGrade(80), "B");

})

test("Grade C", () => {
    assert.strictEqual(getGrade(79), "C");
    assert.strictEqual(getGrade(70), "C");
})

test("Grade D", () => {
    assert.strictEqual(getGrade(69), "D");
    assert.strictEqual(getGrade(60), "D");
})

test("Grade F", () => {
    assert.strictEqual(getGrade(59), "F");
    assert.strictEqual(getGrade(0), "F");
})

test("Invalid Marks", () => {
    assert.strictEqual(getGrade(-1), "Invalid marks");
    assert.strictEqual(getGrade(101), "Invalid marks");

})
console.log("All tests passed!");