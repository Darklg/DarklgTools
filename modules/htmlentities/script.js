(function() {
    'use strict';

    var encodedTextarea = document.getElementById('htmlentities__encoded');
    var decodedTextarea = document.getElementById('htmlentities__decoded');

    function _html_encode(input) {
        if (typeof input !== 'string') {
            return '';
        }

        const namedEntities = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&apos;',
            '©': '&copy;',
            '®': '&reg;',
            '€': '&euro;',
            '£': '&pound;',
            '¥': '&yen;',
            '¢': '&cent;',
            '§': '&sect;',
            '°': '&deg;',
            '±': '&plusmn;',
            'µ': '&micro;',
            '¶': '&para;',
            '·': '&middot;',
            '«': '&laquo;',
            '»': '&raquo;',
            '×': '&times;',
            '÷': '&divide;',

            // accented lowercase
            'à': '&agrave;',
            'á': '&aacute;',
            'â': '&acirc;',
            'ä': '&auml;',
            'ã': '&atilde;',
            'å': '&aring;',
            'ç': '&ccedil;',
            'è': '&egrave;',
            'é': '&eacute;',
            'ê': '&ecirc;',
            'ë': '&euml;',
            'ì': '&igrave;',
            'í': '&iacute;',
            'î': '&icirc;',
            'ï': '&iuml;',
            'ñ': '&ntilde;',
            'ò': '&ograve;',
            'ó': '&oacute;',
            'ô': '&ocirc;',
            'ö': '&ouml;',
            'õ': '&otilde;',
            'ù': '&ugrave;',
            'ú': '&uacute;',
            'û': '&ucirc;',
            'ü': '&uuml;',
            'ý': '&yacute;',
            'ÿ': '&yuml;',

            // accented uppercase
            'À': '&Agrave;',
            'Á': '&Aacute;',
            'Â': '&Acirc;',
            'Ä': '&Auml;',
            'Ã': '&Atilde;',
            'Å': '&Aring;',
            'Ç': '&Ccedil;',
            'È': '&Egrave;',
            'É': '&Eacute;',
            'Ê': '&Ecirc;',
            'Ë': '&Euml;',
            'Ì': '&Igrave;',
            'Í': '&Iacute;',
            'Î': '&Icirc;',
            'Ï': '&Iuml;',
            'Ñ': '&Ntilde;',
            'Ò': '&Ograve;',
            'Ó': '&Oacute;',
            'Ô': '&Ocirc;',
            'Ö': '&Ouml;',
            'Õ': '&Otilde;',
            'Ù': '&Ugrave;',
            'Ú': '&Uacute;',
            'Û': '&Ucirc;',
            'Ü': '&Uuml;',
            'Ý': '&Yacute;',
        };

        return input.replace(/[\s\S]/g, (char) => {
            if (namedEntities[char]) {
                return namedEntities[char];
            }

            const code = char.charCodeAt(0);
            return code > 127 ? `&#${code};` : char;
        });
    }



    function _html_decode(str) {
        var txt = document.createElement('textarea');
        txt.innerHTML = str;
        return txt.value;
    }

    encodedTextarea.addEventListener('input', function() {
        decodedTextarea.value = _html_decode(encodedTextarea.value);
    });
    decodedTextarea.addEventListener('input', function() {
        encodedTextarea.value = _html_encode(decodedTextarea.value);
    });
}());
