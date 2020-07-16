// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Intern extends Employee {
  constructor(id, email, name, school) {
    super(name, id, email);
    // this.id = id;
    // this.email = email;
    // this.name = name;
    this.school = school;
  }
  getSchool() {
    return this.school;
  }
  getRole() {
    return "Intern";
  }
}
module.exports = Intern;
