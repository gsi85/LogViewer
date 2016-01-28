if (Meteor.isClient) {

    Template.body.helpers({
        logs: function() {
            return Log.find({});
        }
    });

}