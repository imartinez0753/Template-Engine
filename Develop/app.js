const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Choices = require("inquirer/lib/objects/choices");
const employees = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
// function promptEmployee() {
//   return inquirer.prompt([
//     {
//       type: "input",
//       name: "name",
//       message: "What is your name?"
//     },
//     {
//       type: "input",
//       name: "id",
//       message: "What is your ID number?"
//     },
//     {
//       type: "input",
//       name: "email",
//       message: "What is your e-mail?"
//     }
//   ]);
// }
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
async function askQuestions() {
  try {
    promptRole().then(function (data) {
      console.log(data.role[0]);
      if (data.role[0] === "Intern") {
        promptIntern().then(function (answers) {
          console.log("reached Prompt Intern");
          const internObj = new Intern(
            answers.id,
            answers.email,
            answers.name,
            answers.school
          );
          employees.push(internObj);

          // return console.table(employees);
        });
      }
      if (data.role[0] === "Manager") {
        promptManager().then(function (answers) {
          const managerObj = new Manager(
            answers.id,
            answers.email,
            answers.name,
            answers.officeNumber
          );
          employees.push(managerObj);
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
        });
      }
    });

    // .then(function () {
    await render(employees);
    console.table(employees);
    // })
  } catch (err) {
    console.log(err);
  }
}
askQuestions();
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
