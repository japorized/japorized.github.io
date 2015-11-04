$(function() {
    
    /* LazyLoad 1.9.3 */
    // nothing here for now
    
    /* qTip tooltips */
    $('[title!=""]').qtip({
        style: {
            classes: 'qtip-dark qtip-shadow qtip-rounded'
        }
    });
    
    $('[data-tooltip!=""]').qtip({ // grab data-tooltip
        content: {
            attr: 'data-tooltip'
        },
        style: {
            classes: 'qtip-dark qtip-shadow qtip-rounded'
        }
    });
    
    /* Twitter Feed */
    !function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0],
            p = /^http:/.test(d.location) ? 'http' : 'https';
        if (!d.getElementById(id)) {
            js = d.createElement(s);
            js.id = id;
            js.src = p + "://platform.twitter.com/widgets.js";
            fjs.parentNode.insertBefore(js, fjs);
        }
    }(document, "script", "twitter-wjs");
});