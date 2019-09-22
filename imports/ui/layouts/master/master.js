import './master.html';

import '../../components/navbar/navbar.js';

Template.master.onRendered(() => {

    app = new Framework7({
        root: '#app',
        router: false,
        statusbar: {
            iosOverlaysWebView: false,
            iosBackgroundColor: "#0C1E30",
            iosTextColor: "white",
            androidBackgroundColor: "#0C1E30",
            androidTextColor: "white",
        },
        navbar: {
            iosCenterTitle: true,
        }
    });

    mainView = app.views.create('.view-main', {
        pushState: true,
        master: true,
        reloadDetail: true
    });
});