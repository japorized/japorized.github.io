$(document).ready(function(){
    
    /* iFrame Wrappers */
        // Tags
    var youtube_tag = "<br /><span class=\"fa fa-youtube\"></span> YouTube",
        vimeo_tag = "<br /><span class=\"fa fa-vimeo\"></span> Vimeo";
    
    $('#youtube').each(function(){
        $(this).wrap("<div class='embed' id='youtube_tag'></div>");
        $('#youtube_tag').append(youtube_tag);
    });
    
    $('#vimeo').each(function(){
        $(this).wrap("<div class='embed' id='vimeo_tag'></div>");
        $('#vimeo_tag').append(vimeo_tag);
    });
    
});