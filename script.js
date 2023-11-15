require('dotenv').config();
const inquirer = require('inquirer');  
const { OpenAI } = require('langchain/llms/openai');
const { PromptTemplate } = require("langchain/prompts");

// Create a new instance of the OpenAI class
const model = new OpenAI({
    openAIkey: process.env.OPENAI_API_KEY,
    temperature: 0,
    model: 'gpt-3.5-turbo'
});

// Function to send a prompt to the OpenAI model
const promptFunc = async (input) => { 
    try {
        // Instantiate a new object called "prompt" using the "PromptTemplate" class
        const prompt = new PromptTemplate({
            template: "You are a javascript expert and will answer the user’s coding questions as thoroughly as possible.\n{question}",
            inputVariables: ["question"],
        });

        // Format the user's question using the prompt template
        const promptInput = await prompt.format({ question: input });

        // Call the OpenAI model with the formatted input
        const res = await model.call(promptInput);
        console.log({ res });
    }
    catch (error) {
        console.error('Error calling the model:', error);
    }
};

// Initialization function that uses inquirer to prompt the user
const init = () => {
    inquirer.prompt([   
        {
            type: 'input',
            name: 'question',
            message: 'Ask a coding question:',
        },
    ]).then((inquirerResponse) => {
        promptFunc(inquirerResponse.question);
    });
};

// Function call to initialize script
init();
