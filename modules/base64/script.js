(function() {
    'use strict';

    var encodedTextarea = document.getElementById('base64__encoded');
    var decodedTextarea = document.getElementById('base64__decoded');

    encodedTextarea.addEventListener('input', function() {
        try {
            decodedTextarea.value = atob(encodedTextarea.value);
        } catch (e) {
            decodedTextarea.value = 'Invalid Base64 string';
        }
    });

    decodedTextarea.addEventListener('input', function() {
        encodedTextarea.value = btoa(decodedTextarea.value);
    });
}());
