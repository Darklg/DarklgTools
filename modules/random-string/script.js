(function() {
    'use strict';

    function generateRandomString() {
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

        if($_string_numbers.checked) {
            characters += '0123456789';
        }
        if($_string_specialchars.checked) {
            characters += '!$%^&*()_+[]{}|;:,.<>?';
        }

        var result = '';
        var charactersLength = characters.length;
        var maxLen = $string_length_el.valueAsNumber || 8;

        for (var i = 0; i < maxLen; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    document.querySelectorAll('.random-string__opt').forEach(function($el) {
        $el.addEventListener('change', updateRandomStrings);
        $el.addEventListener('input', updateRandomStrings);
    });

    var $string_length_el = document.getElementById('random-string__length'),
        $_string_specialchars = document.getElementById('random-string__specialchars'),
        $_string_numbers = document.getElementById('random-string__numbers');

    function updateRandomStrings() {
        document.getElementById('random-string__result').textContent = generateRandomString();
    }
    updateRandomStrings();
}());
