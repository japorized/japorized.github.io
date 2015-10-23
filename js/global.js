$(function() {
    // qTip tooltips
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
    })
    
});