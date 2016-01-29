Template.body.events({
    "submit .new-file": function(event) {
        event.preventDefault();

        var filePath = event.target.filePath.value;

        if (filePath.trim() != "") {
            WatchedFile.insert({
                filePath: filePath,
                alias: event.target.alias.value.trim()
            });
        }

        event.target.filePath.value = "";
        event.target.alias.value = "";
    }
});

Template.watchedFile.events({
    "click .delete": function() {
        WatchedFile.remove(this._id);
    }
});