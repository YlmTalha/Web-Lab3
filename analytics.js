export function calculateClassAverage(students, courseId) {
  const grades = students
    .map(student => student.courses.find(course => course.courseId === courseId))
    .filter(course => course !== undefined)
    .map(course => course.grade);

  if (grades.length === 0) {
    return 0;
  }

  return grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
}

export function findTopStudent(students) {
  if (students.length === 0) {
    return null;
  }

  return students.reduce((best, student) =>
    student.getAverage() > best.getAverage() ? student : best
  );
}

export function filterStudents(students, criteriaFn) {
  return students.filter(student => criteriaFn(student));
}
