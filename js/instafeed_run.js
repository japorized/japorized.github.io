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
            });
        },
        // template: '<a href="{{link}}" target="_tab"><img src="{{image}}" /><div class="likes">{{likes}} <span class="fa fa-heart"></span> {{comments}} <span class="fa fa-comments"></span></div></a>' (will only uncomment this once the images can load)
    });

        
// bind the load more button
loadButton.addEventListener('click', function() {
    userFeed.next();
});    
    
// run the feed
userFeed.run();