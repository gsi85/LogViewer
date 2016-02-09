parsePatterns = function() {

    var logPatterns = JSON.parse(Assets.getText("patterns/LogPatterns.json"));

    logPatterns.forEach(function(pattern) {
        LogPatterns.insert(pattern);
        console.log('loaded pattern with name: ' + pattern.name);
    });

};