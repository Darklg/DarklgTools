(function() {
    'use strict';

    var encodedTextarea = document.getElementById('urlencode-urldecode__encoded');
    var decodedTextarea = document.getElementById('urlencode-urldecode__decoded');

    encodedTextarea.addEventListener('input', function() {
        decodedTextarea.value = decodeURIComponent(encodedTextarea.value);
    });

    decodedTextarea.addEventListener('input', function() {
        encodedTextarea.value = encodeURIComponent(decodedTextarea.value);
    });

}());
