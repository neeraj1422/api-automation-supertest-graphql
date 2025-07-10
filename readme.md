# Supertest framework for GraphQL APIs


### Get Started

Clone Repository

Install packages:

```bash
npm install
```

Run tests:
The repo has tests from 2 different graphql api endpoints.The tests exeute based on environment variable set.
Setting the env variable frm CLI <BR>Windows Powershell
```bash
$env:ENV = "dev"
```
```bash
npm run test
```

Mac
```bash 
ENV=dev npm test
```
Alternatively:
<BR>Set the values in the .env file and run tests
```bash
npm test
```
