const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { validate, memberExpression } = require("@babel/types");

const employeeList = [];
const html = "";

const validateId = async (data) => {
    if (html.includes(data) === true) {
        return 'That ID number is taken. Please enter another one.';
    }
    return true;
};

    function addEmployee(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'role',
            message: 'What kind of employee would you like to add?',
            choices: ["Engineer", "Intern", "None"],
        },
    ]).then(choice => {
        switch (choice.role) {
            case "Engineer":
                inquirer.prompt([
                    {
                        type: "input",
                        name: "name",
                        message: "What is the engineer's name?",
                    },
                    {
                        type: "input",
                        name: "id",
                        message: "What is the engineer's ID?",
                        validate: validateId
                    },
                    {
                        type: "input",
                        name: "email",
                        message: "What is your engineer's Email",
                    },
                    {
                        type: "input",
                        name: "github",
                        message: "What is the engineer's gitHub?",
                    },
                    {
                        type: "list",
                        name: "addAnother",
                        message: "which type of team member will you add?",
                        choices: ["Engineer", "Intern", "None"],
                    }
    ]).then(data => {
    const engineer = new Engineer(data.name, data.id, data.email, data.github);
    employeeList.push(engineer);
    html.push(data.id);
    if (data.addAnother === true) {
        addEmployee();
    } else {
    fs.writeFile(outputPath, render(employeeList), (err) => {
        if (err) throw err;
        });
            return
        }
    })
    break;
    case "Intern":
        inquirer.prompt([
                        {
                            type: "input",
                            name: "name",
                            message: "What is the intern's name?",
                        },
                        {
                            type: "input",
                            name: "id",
                            message: "What is the intern's ID?", 
                            validate: validateId, 
                        },
                        {
                            type: "input",
                            name: "email",
                            message: "What is your intern's Email",
                        },
                        {
                            type: "input",
                            name: "school",
                            message: "What is the intern's school name?",
                        },
                        {
                            type: "list",
                            name: "addAnother",
                            message: "which type of team member will you add?",
                            choices: ["Engineer", "Intern", "None"],
                        }
            
                    ]).then(data => {
                        const intern = new Intern(data.name, data.id, data.email, data.school);
                        employeeList.push(intern);
                        html.push(data.id);
                        if (data.addAnother === true) {
                            addEmployee();
                        } else {
                            fs.writeFile(outputPath, render(employeeList), (err) => {
                                if (err) throw err;
                            }
                            ); 
                            return;
                        }
                    }) break;

                        // default:
                        // //     break;
                    }
                })
        }

        inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "What is the manager's name?",
            },
            {
                type: "input",
                name: "id",
                message: "What is the manager's ID?",
            },
            {
                type: "input",
                name: "email",
                message: "What is your manager's Email",
            },
            
            {
                type: "number",
                name: "officeNumber",
                message: "What is your office number?",
            },
            {
                type: "list",
                name: "role",
                message: "What type of employee are you?",
                choices: ["Engineer", "Intern", "None"]
            }
        ]).then(data => {
            const manager = new Manager(data.name, data.id, data.email, data.officeNumber);
            employeeList.push(manager);
            html.push(data.id);
            addEmployee();
        })
        
   
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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
