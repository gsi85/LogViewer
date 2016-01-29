var lastLengths = [];

parseLog = function(fullPath, firstTimeRun) {
    var currentTime = new Date().getTime();

    try {
        var data = NpmFileSystem.readFileSync(fullPath, 'utf8');
        if (firstTimeRun || lastLengths[fullPath] != data.length) {
            lastLengths[fullPath] = data.length;
            Log.remove({
                source: fullPath
            });
            Log.insert({
                source: fullPath,
                text: data
            });
            console.log('updated source: ' + fullPath);
        }
    } catch (exception) {
        console.log('failed to update source: ' + fullPath + ", with reason: " + exception);
    }
}