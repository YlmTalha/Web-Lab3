# Web Programming — Assignment 3

Talha Yılmaz — Web Programming, Fall 2026

A small university course management system in plain JavaScript. Run it with:

```
node main.js
```

## File organization

```
models.js      Student class, with the read-only id
database.js    fetchStudents(callback) — fake server, 2 second setTimeout
analytics.js   calculateClassAverage, findTopStudent, filterStudents
main.js        entry point, runs everything and prints the report
package.json   only here so Node treats the .js files as ES modules
```

`main.js` imports from the other three. `database.js` and `analytics.js` do not know about each
other — `main.js` is the only file that connects them.

## Challenges I faced

**The id assignment threw instead of failing silently.** `Object.defineProperty` with
`writable: false` makes the property read-only, but what happens when you assign to it depends on
the mode. ES modules always run in strict mode, so `students[0].id = 999` throws a TypeError
instead of being ignored. I wrapped it in try/catch, otherwise the script dies before printing the
report.

**Running ES modules in Node.** `import` / `export` in a `.js` file makes Node throw "Cannot use
import statement outside a module". The fix is either renaming everything to `.mjs` or adding
`"type": "module"` to a package.json. I went with package.json so the file names stay as the
assignment asks.

**reduce() for the top student.** `reduce` without a starting value uses the first element as the
accumulator, which is exactly what you want here — you are comparing students to each other, not
to some empty object. Getting that right made the function three lines.

**Average of a course nobody took.** `calculateClassAverage` divides by the number of grades, so an
unknown courseId would divide by zero and give NaN. I filter first and return 0 if the list is
empty.
