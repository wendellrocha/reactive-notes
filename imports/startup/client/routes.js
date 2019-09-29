import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/master/master.js'
import '../../ui/pages/home/home.js';
import '../../ui/pages/not-found/not-found.js';

// Set up all routes in the app
const app = FlowRouter.group({
  triggersEnter: [function () {
    $('html, body').animate({
      scrollTop: 0
    }, 1200);
  }]
})

app.route('/', {
  name: 'Reactive Notes',
  titulo: 'Notes',
  action: function () {
    BlazeLayout.render('master', {
      page: 'home'
    });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('master', { page: 'notFound' });
  },
};
