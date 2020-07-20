const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const asyncWriteFile = util.promisify(fs.writeFile);
const render = require("./lib/htmlRenderer");
const Choices = require("inquirer/lib/objects/choices");
const employees = [];

function makeGroup() {
  const Results = render(employees);
  asyncWriteFile(outputPath, Results);
}
function addAnother() {
  return inquirer.prompt({
    type: "confirm",
    name: "answer",
    message: "Would you like to set up another employee?",
    default: true
  });
}
function promptRole() {
  return inquirer.prompt({
    type: "checkbox",
    name: "role",
    message: "What is your Role?",
    choices: ["Intern", "Engineer", "Manager"]
  });
}
function promptEngineer() {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?"
    },
    {
      type: "input",
      name: "id",
      message: "What is your ID number?"
    },
    {
      type: "input",
      name: "email",
      message: "What is your e-mail?"
    },
    {
      type: "input",
      name: "github",
      message: "what is your gitHub URL?"
    }
  ]);
}
function promptManager() {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?"
    },
    {
      type: "input",
      name: "id",
      message: "What is your ID number?"
    },
    {
      type: "input",
      name: "email",
      message: "What is your e-mail?"
    },
    {
      type: "input",
      name: "officeNumber",
      message: "what is your office number?"
    }
  ]);
}
function promptIntern() {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?"
    },
    {
      type: "input",
      name: "id",
      message: "What is your ID number?"
    },
    {
      type: "input",
      name: "email",
      message: "What is your e-mail?"
    },
    {
      type: "input",
      name: "school",
      message: "What is your current school name?"
    }
  ]);
}
function build() {
  promptRole()
    .then(function (data) {
      // console.log(data.role[0]);
      if (data.role[0] === "Intern") {
        promptIntern().then(function (answers) {
          const internObj = new Intern(
            answers.id,
            answers.email,
            answers.name,
            answers.school
          );
          employees.push(internObj);
          makeGroup();
          addAnother().then(function (answers) {
            if (answers.answer === true) {
              build();
            }
          });

          // return console.table(employees);
        });
      } else if (data.role[0] === "Manager") {
        promptManager().then(function (answers) {
          const managerObj = new Manager(
            answers.id,
            answers.email,
            answers.name,
            answers.officeNumber
          );
          employees.push(managerObj);
          makeGroup();
          addAnother().then(function (answers) {
            if (answers.answer === true) {
              build();
            }
          });
        });
      } else if (data.role[0] === "Engineer") {
        promptEngineer().then(function (answers) {
          const engineerObj = new Engineer(
            answers.id,
            answers.email,
            answers.name,
            answers.github
          );
          employees.push(engineerObj);
          makeGroup();
          addAnother().then(function (answers) {
            if (answers.answer === true) {
              build();
            }
          });
        });
      }
    })

    .catch(function (err) {
      console.log(err);
    });
}
build();
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
