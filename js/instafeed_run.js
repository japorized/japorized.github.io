var loadButton = document.getElementById('load-more'),
    userFeed = new Instafeed({
        get: 'user',
        target: 'instagram',
        userId: 305260790,
        accessToken: '305260790.467ede5.e2395ce0efe44fddbba6dfd3c7a0462b',
        link: 'true',
        limit: '4',
        resolution: 'thumbnail',
        after: function() {
            // disable button if no more results to load
            if (!this.hasNext()) {
                loadButton.style.display = "none";
            }
            
            // adding animations
            var images = $("#instagram").find('a');
            $.each(images, function(index, image) {
                var delay = (index * 75) + 'ms';
                $(image).css('-webkit-animation-delay', delay);
                $(image).css('-moz-animation-delay', delay);
                $(image).css('-ms-animation-delay', delay);
                $(image).css('-o-animation-delay', delay);
                $(image).css('animation-delay', delay);
                
                $(image).find('img').lazyload({
                    effect : "fadeIn"
                });
                
            });
            
            
            
             $.each(images, function(index, image) {
                 if ( $(image).attr('data-caption') != "" ) {
                    $(image).qtip({
                        content: {
                            text: $(this).attr('data-caption')
                        },
                        style: {
                            classes: 'qtip-dark qtip-shadow qtip-rounded'
                        },
                        position: {
                            my: 'top center',  // Position my top left...
                            at: 'bottom center', // at the bottom right of...
                            target: $(image) // my target
                        }
                    });
                 }
            });
        },
        template: '<div class="col-md-3 col-sm-3 col-xs-12"><a href="{{link}}" target="_tab" data-caption="{{caption}}"><img src="{{image}}" /><div class="likes">{{likes}} <span class="fa fa-heart"></span> {{comments}} <span class="fa fa-comments"></span></div></a></div>'
    });

        
// bind the load more button
loadButton.addEventListener('click', function() {
    userFeed.next();
});    
    
// run the feed
userFeed.run();