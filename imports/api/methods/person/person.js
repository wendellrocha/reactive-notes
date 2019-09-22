import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import '../../collections/app/person.js';

Meteor.methods({
    accountCreate(email, password, name) {
        try {
            check(email, String);
            check(password, String);
            check(name, String);

            let _email = email;
            let _password = password;
            let _name = name;

            let id = Accounts.createUser({
                email: _email,
                password: _password,
                name: _name
            });

            return id;
        } catch (error) {
            if (error instanceof Match.Error) {
                throw new Meteor.Error(400, 'Some field was filled incorrectly');
            } else {
                throw new Meteor.Error(400, 'Something went wrong, try again');
            }
        }
    }
});

Accounts.onCreateUser(function (options, user) {
    let _doc = {
        email: options.email,
        name: options.name
    }

    let person_user = person.findOne({ meteor_UserId: user._id });

    if (person_user != null) {
        person.update({ meteor_UserId: user._id }, { $set: { _doc } });
    } else {
        person.insert(_doc);
    }

    return user;
});