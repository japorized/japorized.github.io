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
    
});