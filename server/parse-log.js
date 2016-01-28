parseLog = function(fullPath) {
    try {
        var data = NpmFileSystem.readFileSync(fullPath, 'utf8');
        Log.remove({
            source: fullPath
        });
        Log.insert({
            source: fullPath,
            text: data
        });
        console.log('updated source: ' + fullPath);
    } catch (exception) {
        console.log('failed to update source: ' + fullPath);
    }
}