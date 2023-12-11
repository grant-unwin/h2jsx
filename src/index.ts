#!/usr/bin/env node
import { readFile, existsSync, PathOrFileDescriptor } from 'fs';
import { transformTags } from './mappers/tags';
const figlet = require("figlet");
console.log(figlet.textSync("Handlbars 2 JSX"));
console.log("Thank you for choosing us to convert your handlebars to JSX today!\n ");

// ----------------- 1. Import the required modules -----------------

type TransformFunction = (content: string) => string;


// Transform Handlebars {{ variable }} to JSX { variable }
const transformVariable: TransformFunction = (content) => {
  return content.replace(/\{\{(.+?)\}\}/g, '{$1}');
};

// Transform Handlebars {{#if condition}} to JSX {condition && (
const transformIfStatement: TransformFunction = (content) => {
  return content.replace(/\{\{#if (.+?)\}\}/g, '{($1) && (');
};

// Transform Handlebars {{else}} to JSX ) || (
const transformElseStatement: TransformFunction = (content) => {
  return content.replace(/\{\{else\}\}/g, ') || (');
};

// Transform Handlebars {{/if}} to JSX )}
const transformEndIfStatement: TransformFunction = (content) => {
  return content.replace(/\{\{\/if\}\}/g, ')}');
};


// Define your transformation functions here
const transformations = [
  transformTags,
  transformVariable,
  transformIfStatement,
  transformElseStatement,
  transformEndIfStatement,
];

// Function to apply transformations to the text
const applyTransformations = (text: string, transformers: any[]) => {
  return transformers.reduce((result: any, transformer: (arg0: any) => any) => transformer(result), text);
};

// Function to read the file and apply transformations
const processFile = (filePath: PathOrFileDescriptor) => {
  readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err.message);
    } else {
      const transformedText = applyTransformations(data, transformations);
      console.log('Transformed Text:\n', transformedText);
    }
  });
};

// Get the file path from the command line arguments
const filePath = process.argv[2];

// Check if a file path is provided
if (!filePath) {
  console.error('Please provide a file location as a parameter.');
  process.exit(1);
}

// Check if the file exists
if (!existsSync(filePath)) {
  console.error('File not found:', filePath);
  process.exit(1);
}

// Process the file
processFile(filePath);
