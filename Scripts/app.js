var newman = require('newman'); // require newman in your project

// call newman.run to pass `options` object and wait for callback
newman.run({
    collection: require('../Collection/Scripts.postman_collection.json'),
    environment: require('../Environment/Dev.postman_environment.json'),
    globals: require('../Data/Workspace.postman_globals.json'),
    reporters: ['cli', 'html', 'json'],
    reporter: {
        html: {
            export: './Report/html/htmlReport.html',
            template: './Template/customTemplate.hbs'
        },
        json: {
            export: './Report/json/jsonReport.json'
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