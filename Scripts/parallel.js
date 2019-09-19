/**
 *  Script to demonstrate parallel collection runs using async.
 */
var path = require('path'),
    async = require('async'),
    newman = require('newman');

// Runs the Postman sample collection thrice, in parallel.
async.parallel([
    function (cb) {
        newman.run({
            collection: require('../Collection/Scripts.postman_collection.json'),
            environment: require('../Environment/Dev.postman_environment.json'),
            globals: require('../Data/Workspace.postman_globals.json'),
            reporters: ['cli', 'html', 'json'],
            reporter: {
                html: {
                    export: './Report/html/ParallelExecution_ScriptsReport.html',
                    template: './Template/customTemplate.hbs'
                },
                json: {
                    export: './Report/json/ParallelExecution_ScriptsReport.json'
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
    },
    function (cb) {
        newman.run({
            collection: require('../Collection/ZipCode.postman_collection.json'),
            environment: require('../Environment/Dev.postman_environment.json'),
            globals: require('../Data/Workspace.postman_globals.json'),
            reporters: ['cli', 'html', 'json'],
            reporter: {
                html: {
                    export: './Report/html/ParallelExecution_ZipCodeReport.html',
                    template: './Template/customTemplate.hbs'
                },
                json: {
                    export: './Report/json/ParallelExecution_ZipCodeReport.json'
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
    },
    function (cb) {
        newman.run({
            collection: require('../Collection/httpbin_org.postman_collection.json'),
            reporters: ['junit', 'cli', 'json'],
            reporter: {
                junit: {
                    export: './report/junit/ParallelExecution_HttpbinReport.xml' 
                },
                json: {
                    export: './report/json/ParallelExecution_HttpbinReport.json' 
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
    }
],

function (err, results) {
    err && console.error(err);
    results.forEach(function (result) {
        var failures = result.run.failures;
        console.info(failures.length ? JSON.stringify(failures.failures, null, 2) :
        `${result.collection.name} ran successfully.`);
    });
});