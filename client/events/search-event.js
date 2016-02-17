Template.body.events({
    "input .search-input": function(event) {
        Session.set("searchRegex", event.currentTarget.value);
    }
});