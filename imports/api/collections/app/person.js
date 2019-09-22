import SimpleSchema from 'simpl-schema';

person = new Mongo.Collection('person').vermongo({
    timestamps: true,
    userId: 'userId_change'
});

person.attachSchema(new SimpleSchema({
    meteor_UserId: {
        type: String,
        label: 'Meteor User ID'
    },
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.EmailWithTLD,
        label: 'E-mail'
    },
    name: {
        type: String,
        label: 'Name'
    },
    userId_change: {
        type: String,
        label: 'Edited by',
        autoValue: function () {
            if (Meteor.isTest) {
                return Random.id();
            }
            return Meteor.userId();
        }
    }
}));

if (Meteor.isServer) {
    Meteor.publish('Person', function (id) {
        if (id) {
            return person.find({ _id: id });
        } else {
            return person.find({});
        }
    })
}