var quickFilters = {};

Template.quickFilter.events({
    "click #all-filter-button": function(event) {
        setAllSelectedState(event.target);
        Session.set("quickFilters", quickFilters);
    },
    "click .filter-button": function(event) {
        var button = event.target;
        togleButtonStyle(button);
        if (isAllSelectedStateEligable(button)) {
            setAllSelectedState(button);
        } else {
            removeAllSelectedState(button);
        }
        Session.set("quickFilters", quickFilters);
    }
});

var isAllSelectedStateEligable = function(button) {
    var filterContainer = $(button).parent();
    return filterContainer.find(".submit-button-pushed").not("#all-filter-button").length == 0 || filterContainer.find(".submit-button").not("#all-filter-button").length == 0;
}

var setAllSelectedState = function(button) {
    $(button).parent().find(".filter-button").each(function(index) {
        $(this).removeClass("submit-button-pushed");
        if (!$(this).hasClass("submit-button")) {
            $(this).addClass("submit-button");
        }
    });
    if (!$(button).parent().find("#all-filter-button").hasClass("submit-button-pushed")) {
        $(button).parent().find("#all-filter-button").addClass("submit-button-pushed");
    }
    $(button).parent().find("#all-filter-button").removeClass("submit-button");
    allSelectedQuickFilterState(button);
}

var togleButtonStyle = function(button) {
    $(button).toggleClass("submit-button-pushed");
    $(button).toggleClass("submit-button");
    alterQuickFilterState(button);
}

var removeAllSelectedState = function(button) {
    if (!$(button).parent().find("#all-filter-button").hasClass("submit-button")) {
        $(button).parent().find("#all-filter-button").addClass("submit-button");
    }
    $(button).parent().find("#all-filter-button").removeClass("submit-button-pushed");
}

var alterQuickFilterState = function(button) {
    var filterCategory = $(button).parent().find("span:first-child").text();
    var filteredValue = $(button).text();
    if ($(button).hasClass("submit-button-pushed")) {
        if (quickFilters[filterCategory]) {
            quickFilters[filterCategory].push(filteredValue);
        } else {
            quickFilters[filterCategory] = [filteredValue];
        }
    } else {
        quickFilters[filterCategory].splice(quickFilters[filterCategory].indexOf(filteredValue), 1);
    }
}

var allSelectedQuickFilterState = function(button) {
    var filterCategory = $(button).parent().find("span:first-child").text();
    delete quickFilters[filterCategory];
}