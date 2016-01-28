if (Meteor.isServer) {
    Meteor.startup(function() {
        Log.remove({});

        var filePath = NpmPath.join('e:\\Laci', 'clintonma.txt')

        NpmFileSystem.watchFile(filePath, Meteor.bindEnvironment(function() {
            parseLog(filePath);
        }));
    });
}