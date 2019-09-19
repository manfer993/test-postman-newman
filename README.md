# Automation Framework using Postman and Newman
Node Application to run the Postman Collection and respective Environments and generate Newman Reports

## Configuration

1. Postman - Version 7.6.0
2. Newman - Version 4.5.0
3. Node - Version 10.15.0
4. NPM - Version 6.4.1
5. Newman Reporter Html - Version 1.0.3

## Node Application Execution of Collections

### Configure the JavaScript and the package

Create a new js file(app.js) and you can pass your options as below

```javascript
var newman = require('newman'); 
// require newman in your project

// call newman.run to pass `options` object and wait for callback
newman.run({
    collection: require('../Collection/Scripts.postman_collection.json'),
    environment: require('../Environment/Dev.postman_environment.json'),
    globals: require('../Data/Workspace.postman_globals.json'),
    reporters: ['cli','html','json'],
    reporter : { 
        html : { 
            export : './Report/html/htmlReport.html', 
            template: './Template/customTemplate.hbs'
        }, 
        json: { 
            export: '../Report/json/jsonReport.json'
        }
    },
    insecure: true, // allow self-signed certs, required in postman too
    timeout: 180000  // set time out
}).on('start', function (err, args) { // on start of run, log to console
    console.log('running a collection...');
}).on('done', function (err, summary) {
    if (err || summary.error) {
        console.error('collection run encountered an error.');
    }
    else {
        console.log('collection run completed.');
    }
});
```

Add the script into the package.json file as below

```json
"scripts": {
    "test": "node Scripts/app.js"
},
```

### Run the Collection as Node app

To run the Collection as Node application. Open the Node terminal and run the app.js or run the script

```terminal
$ node app.js
$ npm run test
```