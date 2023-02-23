const inquirer = require('inquirer');
const {writeFile} = require('fs/promises');
const {Circle, Triangle, Square } = require('./lib/shapes');
const Svg = require("./lib/svg");
const questions = [
    {
        type: 'input',
        name: 'text',
        message: 'Enter up to three characters for the logo:',
        validate: function(values){
            if (values.length > 3 ){
                return 'Text must be less than or equal to three characters';
            }
            return true;
        }
    },
    {
        type: 'input',
        name: 'textColor',
        message: 'Enter the text color (keyword or color#):'
    },
    {
        type: 'list',
        name: 'shapeType',
        message: 'Select a shape:',
        choices: ['Circle', 'Triangle', 'Square']

    },
    {
        type: 'input',
        name: 'shapeColor',
        message: 'Enter the shape color (keyword or color#):'
    }
    
];
inquirer
.prompt(questions)
.then(({text,textColor, shapeType, shapeColor})=>{
    let shape;
    switch (shapeType){
        case 'Circle':
            shape = new Circle();
            break;
        case 'Triangle':
            shape= new Triangle();
            break;
        default: 
        shape = new Square();
        break;
    }
    shape.setColor(shapeColor)
    const svg = new Svg()
    svg.setText(text, textColor)
    svg.setShape(shape)
    return writeFile("./logo-page/logo.svg", svg.render())
})
.then(()=> console.log("Generated logo.svg"))
.catch(err => console.log(err));