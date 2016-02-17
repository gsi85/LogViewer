Template.registerHelper('logs', function() {

    if (Session.get("quickFilters") && Object.keys(Session.get("quickFilters")).length > 0) {
        return Log.find({
            $and: [{
                $or: buildQuickFilterSelector()
            }, {
                text: {
                    $regex: getSearchRegex()
                }
            }]

        }, {
            sort: {
                "headers.timeStamp": -1
            }
        });
    } else {
        return Log.find({
            text: {
                $regex: getSearchRegex()
            }
        }, {
            sort: {
                "headers.timeStamp": -1
            }
        });
    };


    function buildQuickFilterSelector() {
        var quickFilters = Session.get("quickFilters");
        var filterConditions = [];
        for (var category in quickFilters) {
            quickFilters[category].forEach(function(filterValue) {
                var filterCondition = {};
                filterCondition["headers." + category] = filterValue;
                filterConditions.push(filterCondition);
            });
        }
        return filterConditions;
    };

    function getSearchRegex() {
        return Session.get('searchRegex') ? Session.get('searchRegex') : "";
    };

});

Template.registerHelper('watchedFiles', function() {
    return WatchedFile.find({});
});

Template.registerHelper('logPatterns', function() {
    return LogPatterns.find({});
});

Template.registerHelper('formatDate', function(date) {
    return moment(date).format('YYYY-MM-DD HH:mm:ss,SSS');
});

Template.registerHelper('quickFilters', function() {
    return QuickFilters.find({});
});