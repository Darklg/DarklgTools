(function() {
    'use strict';

    var tagsInput = document.getElementById('strip-tags__tags');
    var attrsInput = document.getElementById('strip-tags__attrs');
    var inputTextarea = document.getElementById('strip-tags__input');
    var outputTextarea = document.getElementById('strip-tags__output');

    /* Tag body, skipping ">" inside quoted attribute values */
    var TAG_BODY = '(?:"[^"]*"|\'[^\']*\'|[^\'">])*>';

    function _split_list(value) {
        return value.split(',').map(function(item) {
            return item.trim().toLowerCase();
        }).filter(Boolean);
    }

    function _strip_tags(html, tags) {
        tags = _split_list(tags).map(function(tag) {
            return tag.replace(/[^a-z0-9-]/g, '');
        }).filter(Boolean);

        if (!tags.length) {
            return html;
        }

        var tag = '<\\/?(?:' + tags.join('|') + ')\\b' + TAG_BODY;

        return html
            .replace(new RegExp('^[ \\t]*' + tag + '[ \\t]*(?:\\r?\\n|$)', 'gim'), '')
            .replace(new RegExp(tag, 'gi'), '');
    }

    function _strip_attrs(html, attrs) {
        attrs = _split_list(attrs);

        if (!attrs.length) {
            return html;
        }

        /* Each match consumes a whole attribute, so names inside values are never hit */
        var attrRegex = /\s+([^\s"'>\/=]+)(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'>]+))?/g;

        return html.replace(new RegExp('<[a-z]' + TAG_BODY, 'gi'), function(tag) {
            return tag.replace(attrRegex, function(match, name) {
                return attrs.indexOf(name.toLowerCase()) > -1 ? '' : match;
            });
        });
    }

    function update() {
        outputTextarea.value = _strip_attrs(_strip_tags(inputTextarea.value, tagsInput.value), attrsInput.value);
    }

    tagsInput.addEventListener('input', update);
    attrsInput.addEventListener('input', update);
    inputTextarea.addEventListener('input', update);
}());
