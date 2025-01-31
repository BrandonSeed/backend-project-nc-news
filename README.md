# Northcoders News API
---

Project Overview

This project is a hosted api with basic social media features such as comments and user accounts. It allows users to comment on articles posted. 

Using a GET /api request will provide an overview of all functionality.

The main use of this porject was to develop backend developer skills.

Coding language: Javascript

Minimum Node version: v22.9.0
Minimum Postgres version: 16.6

---

Hosted Version 

https://backend-project-nc-news-4tvn.onrender.com

---

Dependcies Install

Running 'npm install' or 'npm i' in the terminal will install all necessary packages to run a non-dev instance of the project.

For a dev instance of the project required to run tests, the following will be needed at minimum version:
    jest - version 27.5.1,
    jest-extended - version 2.00,
    supertest - version 7.0.0 

---

Environments needed

Environment files are not included in clone, therefor .env files must be set on cloning.
.env.test --> test environment 
.env.development --> dev environment

---

Seeding local database

To create and seed local databases, run the following in the terminal separately: 
    'npm setup-db',
    'npm seed'

---

Running tests

To run tests for the whole project: run 'npm run test' in the terminal.

To run tests for the util functions: run 'npm run test utils' in the terminal.

to run tests for the server application: run 'npm run test app' in the terminal.

---

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
