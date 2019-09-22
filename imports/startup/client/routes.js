import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/master/master.js'
import '../../ui/pages/home/home.js';
import '../../ui/pages/not-found/not-found.js';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'Reactive Notes',
  action() {
    BlazeLayout.render('master', { main: 'home' });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('master', { main: 'notFound' });
  },
};
