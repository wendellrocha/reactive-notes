import SimpleSchema from 'simpl-schema';

note = new Mongo.Collection('note').vermongo({
    timestamps: true,
    userId: 'userId_change'
});

note.attachSchema(new SimpleSchema({
    title: {
        type: String,
        label: 'Title',
        optional: true
    },
    content: {
        type: String,
        label: 'Content'
    },
    archived: {
        type: Boolean,
        label: 'Archived',
        autoValue: function () {
            if (this.isInsert) {
                return false;
            } else {
                this.unset();
            }
        },
        optional: true
    },
    personId: {
        type: String,
        label: 'Person'
    },
    background_color: {
        type: String,
        optional: true
    },
    userId_change: {
        type: String,
        label: 'Edited by',
        autoValue: function () {
            if (Meteor.isTest) {
                return Randon.id();
            }
            return Meteor.userId();
        }
    }
}));

if (Meteor.isServer) {
    Meteor.publish('Notes', function (id) {
        if (id) {
            return note.find({ _id: id });
        } else {
            return note.find({});
        }
    });
}