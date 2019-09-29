import './home.html';
import '../../components/navbar/navbar.js';
import '../../components/note/note.js';

Template.home.onCreated(function () {
    import 'framework7/components/popup';
    var self = this;
    self.autorun(() => {
        self.subscribe('Person', null);
    });
});

Template.home.helpers({});

Template.home.events({
    'click .addNote': function (event) {
        event.preventDefault();

        var _addPopup = app.popup.create({
            el: '.notes-add',
            swipeToClose: true,
            on: {
                open: function (e, popup) {
                    $(document).find("form#notesAdd").submit(function (event) {
                        $(this).submit(function () {
                            return false;
                        });

                        event.preventDefault();

                        const target = event.target;
                        let insertDoc = $(target).serializeObject();
                        let _person = person.findOne({ meteor_userId: Meteor.userId() })

                        Meteor.call('addNote', _person, insertDoc.title, insertDoc.content, function (error, result) {
                            if (error) {
                                toast(error);
                            } else {
                                toast();
                                _addPopup.close(true);
                            }
                        });
                    });
                }
            }
        });

        _addPopup.open(true);
    },
});

Template.home.onRendered(function () { });