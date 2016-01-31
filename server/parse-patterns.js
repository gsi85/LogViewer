parsePatterns = function() {

    var logPatterns = JSON.parse(Assets.getText("patterns/LogPatterns.json"));

    logPatterns.forEach(function(pattern) {
        LogPatterns.insert(pattern);
        console.log('Loaded pattern with name: ' + pattern.name);
    });

};