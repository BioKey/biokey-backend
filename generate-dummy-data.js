var mongoose = require('mongoose');
const config = require('./config');

const Activity = require('./models/activity');
const Keystroke = require('./models/keystroke');
const Machine = require('./models/machine');
const Organization = require('./models/organization');
const TypingProfile = require('./models/typingProfile');
const User = require('./models/user');
const confirm = require('confirm-cli');

confirm("This will delete all current data, do you want to proceed?", function() {
    mongoose.Promise = global.Promise;
    mongoose.connect(config.mongoURI[process.env.NODE_ENV || 'development'], { useMongoClient: true })
        .then(db => {
            db.dropDatabase();

            let organizations = [{ name: "A", maxUsers: 10, defaultChallengeStrategies: ["GoogleAuth", "TextMessage"], defaultThreshold: [0.3] }, { name: "B", maxUsers: 20, defaultChallengeStrategies: ["GoogleAuth", "TextMessage"], defaultThreshold: [0.7] }]
            let machines = [{ mac: "ABC", organization: "A" }, { mac: "DEF", organization: "A" }, { mac: "GHI", organization: "A" }, { mac: "JKL", organization: "B" }]
            let users = [{ email: "a@a.com", name: "A", password: "a", isAdmin: false, phoneNumber: "1234567890", organization: "A" }, { email: "b@b.com", name: "B", password: "b", isAdmin: true, phoneNumber: "1234567890", organization: "A" }, { email: "c@c.com", name: "C", password: "c", isAdmin: false, phoneNumber: "1234567890", organization: "A" }, { email: "d@d.com", name: "D", password: "d", isAdmin: false, phoneNumber: "1234567890", organization: "B" }]
            let typingProfiles = [{ user: "A", machine: "ABC", isLocked: false, tensorFlowModel: "modelA", endpoint: "pointA", challengeStrategies: ["GoogleAuth", "TextMessage"], threshold: [0.3], lastHeartbeat: 1}, { user: "B", machine: "DEF", isLocked: false, tensorFlowModel: "modelB", endpoint: "pointB", challengeStrategies: ["GoogleAuth", "TextMessage"], threshold: [0.3], lastHeartbeat: 1 }, { user: "C", machine: "GHI", isLocked: false, tensorFlowModel: "modelC", endpoint: "pointC", challengeStrategies: ["GoogleAuth", "TextMessage"], threshold: [0.3], lastHeartbeat: 1 }, { user: "D", machine: "JKL", isLocked: false, tensorFlowModel: "modelD", endpoint: "pointD", challengeStrategies: ["GoogleAuth", "TextMessage"], threshold: [0.3], lastHeartbeat: 1 }]
            let activities = [{ timestamp: 1, typingProfile: "A-ABC", activityType: "LOCK" }, { timestamp: 2, typingProfile: "B-DEF", activityType: "UNLOCK" }, { timestamp: 3, typingProfile: "C-GHI", activityType: "INFO" }, { timestamp: 4, typingProfile: "D-JKL", activityType: "UNLOCK" }, { timestamp: 5, typingProfile: "A-ABC", activityType: "INFO" }, { timestamp: 6, typingProfile: "B-DEF", activityType: "LOCK" }, { timestamp: 7, typingProfile: "C-GHI", activityType: "UNLOCK" }, { timestamp: 8, typingProfile: "D-JKL", activityType: "INFO" }, { timestamp: 9, typingProfile: "A-ABC", activityType: "INFO" }, { timestamp: 10, typingProfile: "B-DEF", activityType: "INFO" }, { timestamp: 11, typingProfile: "C-GHI", activityType: "INFO" }, { timestamp: 12, typingProfile: "D-JKL", activityType: "INFO" }]
            let keystrokes = [{ character: "A", timestamp: 10, keyDown: true, typingProfile: "A-ABC" }, { character: "B", timestamp: 11, keyDown: false, typingProfile: "B-DEF" }, { character: "C", timestamp: 12, keyDown: true, typingProfile: "C-GHI" }, { character: "D", timestamp: 13, keyDown: false, typingProfile: "D-JKL" }, { character: "e", timestamp: 14, keyDown: true, typingProfile: "A-ABC" }, { character: "f", timestamp: 15, keyDown: false, typingProfile: "B-DEF" }, { character: "g", timestamp: 16, keyDown: true, typingProfile: "C-GHI" }, { character: "h", timestamp: 17, keyDown: false, typingProfile: "D-JKL" }, { character: "i", timestamp: 18, keyDown: true, typingProfile: "A-ABC" }, { character: "j", timestamp: 19, keyDown: false, typingProfile: "B-DEF" }, { character: "k", timestamp: 20, keyDown: true, typingProfile: "C-GHI" }, { character: "l", timestamp: 21, keyDown: false, typingProfile: "D-JKL" }, { character: "m", timestamp: 22, keyDown: true, typingProfile: "A-ABC" }, { character: "n", timestamp: 23, keyDown: false, typingProfile: "B-DEF" }, { character: "o", timestamp: 24, keyDown: true, typingProfile: "C-GHI" }, { character: "p", timestamp: 25, keyDown: false, typingProfile: "D-JKL" }, { character: "q", timestamp: 26, keyDown: true, typingProfile: "A-ABC" }, { character: "r", timestamp: 27, keyDown: false, typingProfile: "B-DEF" }, { character: "s", timestamp: 28, keyDown: true, typingProfile: "C-GHI" }, { character: "t", timestamp: 29, keyDown: false, typingProfile: "D-JKL" }, { character: "u", timestamp: 30, keyDown: true, typingProfile: "A-ABC" }, { character: "v", timestamp: 31, keyDown: false, typingProfile: "B-DEF" }, { character: "w", timestamp: 32, keyDown: true, typingProfile: "C-GHI" }, { character: "x", timestamp: 33, keyDown: false, typingProfile: "D-JKL" }, { character: "y", timestamp: 34, keyDown: true, typingProfile: "A-ABC" }, { character: "z", timestamp: 35, keyDown: false, typingProfile: "B-DEF" }]

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
                                    let params = a.typingProfile.split('-');
                                    let user = users.find(u => u.name == params[0])._id;
                                    let machine = machines.find(m => m.mac == params[1])._id;
                                    a.typingProfile = typingProfiles.find(tp => tp.user == user && tp.machine == machine)._id;
                                    return a;
                                });

                                Activity.create(activities, function(err, newActivities) {
                                    if (err) throw err;
                                    activities = newActivities;

                                    console.log("Created " + activities.length + " Activities");

                                    keystrokes = keystrokes.map(k => {
                                        let params = k.typingProfile.split('-');
                                        let user = users.find(u => u.name == params[0])._id;
                                        let machine = machines.find(m => m.mac == params[1])._id;
                                        k.typingProfile = typingProfiles.find(tp => tp.user == user && tp.machine == machine)._id;
                                        return k;
                                    });


                                    Keystroke.create(keystrokes, function(err, newKeystrokes) {
                                        if (err) throw err;
                                        keystrokes = newKeystrokes

                                        console.log("Created " + keystrokes.length + " Keystrokes");

                                        mongoose.connection.close()
                                    });
                                });
                        });
                    });
                });
            });
        }).catch(err => {
            console.error('Error connecting to the database. ' + err);
        });
});