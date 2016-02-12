Template.quickFilter.events({
    "click #all-filter-button": function(event) {
        setAllSelectedState(event.target);
    },
    "click .filter-button": function(event) {
        var button = event.target;
        togleButtonStyle(button);
        if (isAllSelectedStateEligable(button)) {
            setAllSelectedState(button);
        } else {
            removeAllSelectedState(button);
        }
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
}

var togleButtonStyle = function(button) {
    $(button).toggleClass("submit-button-pushed");
    $(button).toggleClass("submit-button");
}

var removeAllSelectedState = function(button) {
    if (!$(button).parent().find("#all-filter-button").hasClass("submit-button")) {
        $(button).parent().find("#all-filter-button").addClass("submit-button");
    }
    $(button).parent().find("#all-filter-button").removeClass("submit-button-pushed");
}