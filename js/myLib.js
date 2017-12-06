// Object "length"
Object.size = function(obj) {
  return Object.keys(obj).length;
}

// Type of Object
function type(obj) {
    return Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase();
}

/*
 * GET request using AJAX for JSON
 */
function getJSON(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

/* 
 * GET request using AJAX
 */
function AJAXget(path, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', path, true);
  xhr.onload = function() {
    if ( xhr.status >= 200 && xhr.status < 400 ) {
      if (success)
        success(xhr.responseText);
    } else {
      console.error("Target server " + path + " was reached but an error was returned.");
    }
  };
  xhr.onerror = function() {
    error(xhr);
  };
  xhr.send();
}
