var mongoose = require('mongoose');
const config = require('./config');

const Excel = require('exceljs');

const Activity = require('./models/activity');
const Keystroke = require('./models/keystroke');
const Machine = require('./models/machine');
const Organization = require('./models/organization');
const TypingProfile = require('./models/typingProfile');
const User = require('./models/user');
const confirm = require('confirm-cli');
const testGaussian = require('./test-gaussian');
let testModel = require('./ensemble-c-2.json');
testModel.model = JSON.stringify(testModel.model)
testModel.weights = JSON.stringify(testModel.weights)
testModel.reset = JSON.stringify(testModel.reset)


// read from a file
var workbook = new Excel.Workbook();
workbook.xlsx.readFile('dummy-data.xlsx')
    .then(() => {
        // Parse Data
        let data = {}
        workbook.eachSheet((worksheet, sheetId) => {
            data[worksheet.name] = [];
            let headers = [];
            worksheet.eachRow((row, rowNumber) => {
                if (rowNumber == 1) headers = row.values;
                else {
                    let newVal = {};
                    row.values.forEach((element, i) => {
                        let h = headers[i];
                        if (h != null) {
                            newVal[h] = element;
                        }
                    });
                    data[worksheet.name].push(newVal);
                }
            });
        });
        
    });
 


confirm("This will delete all current data, do you want to proceed?", function() {
    var workbook = new Excel.Workbook();
    workbook.xlsx.readFile('dummy-data.xlsx')
    .then(() => {
        // Parse Data
        let data = {}
        workbook.eachSheet((worksheet, sheetId) => {
            data[worksheet.name] = [];
            let headers = [];
            worksheet.eachRow((row, rowNumber) => {
                if (rowNumber == 1) headers = row.values;
                else {
                    let newVal = {};
                    row.values.forEach((element, i) => {
                        let h = headers[i];
                        if (h != null) {
                            if (h == 'challengeStrategies') element = element.split(',');
                            newVal[h] = element;
                        }
                    });
                    data[worksheet.name].push(newVal);
                }
            });
        });

        // Insert data
        mongoose.Promise = global.Promise;
        mongoose.connect(process.env.MONGO_URI || config.mongoURI[process.env.NODE_ENV || 'development'], { useMongoClient: true })
        .then(db => {
            db.dropDatabase();

            let organizations = data['organizations'];
            let machines = data['machines'];
            let users = data['users'];
            let typingProfiles = data['typingProfiles']
            let activities = data['activities']

            Organization.create(organizations, function(err, newOrganizations) {
                if (err) throw err;
                organizations = newOrganizations;

                console.log("Created " + organizations.length + " Organizations");

                machines = machines.map(m => {
                    m.organization = organizations.find(o => o.name == m.organization)._id;
                    return m;
                });

                Machine.create(machines, function(err, newMachines) {
                    if (err) throw err;
                    machines = newMachines;

                    console.log("Created " + machines.length + " Machines");

                    users = users.map(u => {
                        u.organization = organizations.find(o => o.name == u.organization)._id;
                        return u;
                    })

                    User.create(users, function(err, newUsers) {
                        if (err) throw err;
                        users = newUsers;

                        console.log("Created " + users.length + " Users");

                        typingProfiles = typingProfiles.map(tp => {
                            tp.user = users.find(u => u.name == tp.user)._id;
                            return tp;
                        });

                        typingProfiles = typingProfiles.map(tp => {
                            tp.machine = machines.find(m => m.mac == tp.machine)._id;
                            return tp;
                        });

                        TypingProfile.create(typingProfiles, function(err, newTypingProfiles) {
                            if (err) throw err;
                            typingProfiles = newTypingProfiles;

                            console.log("Created " + typingProfiles.length + " TypingProfiles");

                                activities = activities.map(a => {
                                    let params = a.typingProfile.split(':');
                                    let user = users.find(u => u.name == params[0])._id;
                                    let machine = machines.find(m => m.mac == params[1])._id;
                                    a.typingProfile = typingProfiles.find(tp => tp.user == user && tp.machine == machine)._id;
                                    return a;
                                });

                                Activity.create(activities, function(err, newActivities) {
                                    if (err) throw err;
                                    activities = newActivities;

                                    console.log("Created " + activities.length + " Activities");

                                    mongoose.connection.close()
                                });
                        });
                    });
                });
            });
        }).catch(err => {
            console.error('Error connecting to the database. ' + err);
        });
    });
    
});
