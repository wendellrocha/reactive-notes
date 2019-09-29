import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import '../../collections/note/note.js';

Meteor.methods({
    /**
     * 
     * @param {*} personId 
     * @param {*} title 
     * @param {*} content 
     * @param {*} background_color 
     */
    addNote(personId, title, content, background_color) {
        if (this.userId) {
            try {
                check(personId, String);
                check(title, Match.Maybe(String));
                check(content, String);
                check(background_color, Match.Maybe(String));

                let id = note.insert({ 'personId': personId, 'title': title, 'content': content, 'background_color': background_color });

                return id;
            } catch (error) {
                if (error instanceof Match.Error) {
                    throw new Meteor.Error(400, 'Some field was filled incorrectly');
                } else {
                    throw new Meteor.Error(400, 'Something went wrong, try again.');
                }
            }
        } else {
            throw new Meteor.Error(401, 'Not authorized');
        }
    },

    /**
     * 
     * @param {*} doc 
     */
    updateNote(doc) {
        if (this.userId) {
            try {
                check(doc, Object);

                let id = note.update({ _id: doc._id }, { $set: { doc } });

                return id;
            } catch (error) {
                throw new Meteor.Error(400, 'Something went wrong, try again');
            }
        } else {
            throw new Meteor.Error(401, 'Not authorized')
        }
    },

    /**
     * 
     * @param {*} doc 
     */
    removeNote(doc) {
        if (this.userId) {
            try {
                check(doc, Object);

                let id = note.remove({ _id: doc._id });

                return id;
            } catch (error) {
                throw new Meteor.Error(400, 'Something went wrong, try again');
            }
        } else {
            throw new Meteor.Error(401, 'Not authorized');
        }
    }
});