import { Student } from "./models.js";
import { fetchStudents } from "./database.js";
import { calculateClassAverage, findTopStudent, filterStudents } from "./analytics.js";

console.log("Fetching data from database...");

fetchStudents(rawData => {
  console.log("Data received!");

  const students = rawData.map(row => new Student(row.id, row.name, row.courses));

  console.log("\nTesting Immutability:");
  console.log("Original ID:", students[0].id);
  console.log("Attempting to change ID to 999...");

  try {
    students[0].id = 999;
  } catch (error) {
    console.log("Assignment rejected:", error.message);
  }

  const changed = students[0].id !== 1;
  console.log(`Final ID: ${students[0].id} (${changed ? "Failed" : "Success"}: ID did not change)`);

  console.log("\n--- Analytics Report ---");

  const average101 = calculateClassAverage(students, 101);
  console.log(`Class Average for Course 101: ${average101.toFixed(2)}`);

  const top = findTopStudent(students);
  console.log(`Top Student: ${top.name} (Average: ${Number(top.getAverage().toFixed(2))})`);

  const inCourse102 = filterStudents(students, student =>
    student.courses.some(course => course.courseId === 102)
  );
  console.log(`Students in Course 102: ${inCourse102.map(s => s.name).join(", ")}`);
});
