import './note.html';

Template.note.onCreated(function () {
    import 'framework7/components/card';

    var self = this;
    self.autorun(() => {
        let id = ((Meteor.userId() != null) ? Meteor.userId : false);

        self.subscribe('Notes', id);
    });
});

Template.note.helpers({
    note: function () {
        let doc = note.find({}).fetch();

        if (doc) {
            doc['createdAt'] = moment(doc.createdAt).format("MM/DD/YYYY [at] HH:mm");

            doc['modifiedAt'] = moment(doc.modifiedAt).format("MM/DD/YYYY [at] HH:mm");
        }

        return doc;
    }
});

Template.note.events({});

Template.note.onRendered(function () { });