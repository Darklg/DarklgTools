(function() {
    var $input = document.getElementById('text-stats__input');
    var $results = document.getElementById('text-stats__results');

    function computeStats(text) {
        var charCount = text.length;
        var wordCount = text.trim().split(/\s+/).filter(Boolean).length;
        var lineCount = text.split('\n').length;

        return {
            characters: charCount,
            words: wordCount,
            lines: lineCount
        };
    }

    function displayStats(stats) {
        $results.textContent =
            'Characters: ' + stats.characters + '\n' +
            'Words: ' + stats.words + '\n' +
            'Lines: ' + stats.lines;
    }

    $input.addEventListener('input', function() {
        var text = $input.value;
        var stats = computeStats(text);
        displayStats(stats);
    });
}());
