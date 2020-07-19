var inquirer = require("inquirer");
var axios = require("axios");
var fs = require("fs")

const questions = [
    {
        type: 'input',
        name: 'Github_username',
        message: "What's your Github username?",
      },
      {
          type: 'input',
          name: 'Project_title',
          message: "What is your project title?",
      },
      {
        type: 'input',
        name: 'Project_installation',
        message: "What are the installation instructions?",
    }
];

function writeToFile(fileName, data) {
}

function init() {
    inquirer.prompt(questions).then((answers) => {
        axios.get(`https://api.github.com/users/${answers.Github_username}`).then((response) => {
            fs.writeFile("README.md", "**Email:** " + response.data.email +  "\n\n", function (err) {
                if (err) return console.log(err);
                //console.log(response)
            })
            fs.appendFile("README.md", "![](" + response.data.avatar_url + ")\n\n", function (err) {
                if (err) return console.log(err);
            });
            fs.appendFile("README.md", "**Project Title:** " + answers.Project_title +  "\n\n", function (err) {
                if (err) return console.log(err);
            });
            axios.get(`https://api.github.com/repos/${answers.Github_username}/${answers.Project_title}`).then((response) => {
            fs.appendFile("README.md", "**Project Description:** " + response.data.description +  "\n\n", function (err) {
                if (err) return console.log(err);
            });
            fs.appendFile("README.md", "**License:** " + response.data.license +  "\n\n", function (err) {
                if (err) return console.log(err);
            });
            fs.appendFile("README.md", "**Installation Instructions:** " + answers.Project_installation +  "\n\n", function (err) {
                if (err) return console.log(err);
            });
        })
        
      });
     });
      
}

init();