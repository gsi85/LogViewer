Template.quickFilter.events({
    "click #all-filter-button": function(event) {
        quickFilterEventModule.allFilterButtonPressed(event.target);
    },
    "click .filter-button": function(event) {
        quickFilterEventModule.filterButtonPressed(event.target);
    }
});

var quickFilterEventModule = (function() {
    var quickFilterEvent = {};
    
    quickFilters = {};

    ALL_FILTER_BUTTON_ID = "#all-filter-button";
    SUBMIT_BUTTON_PUSHED_CLASS = ".submit-button-pushed";
    SUBMIT_BUTTON_CLASS = ".submit-button";
    FILTER_BUTTON_CLASS = ".filter-button";
    SUBMIT_BUTTON_PUSHED = "submit-button-pushed";
    SUBMIT_BUTTON = "submit-button";

    quickFilterEvent.allFilterButtonPressed = function(button) {
        setAllSelectedState(button);
        Session.set("quickFilters", quickFilters);
    };

    quickFilterEvent.filterButtonPressed = function(button) {
        togleButtonStyle(button);
        if (isAllSelectedStateEligable(button)) {
            setAllSelectedState(button);
        } else {
            removeAllSelectedState(button);
        }
        Session.set("quickFilters", quickFilters);
    };

    function isAllSelectedStateEligable(button) {
        var filterContainer = $(button).parent();
        return filterContainer.find(SUBMIT_BUTTON_PUSHED_CLASS).not().length == 0 || filterContainer.find(SUBMIT_BUTTON_CLASS).not(ALL_FILTER_BUTTON_ID).length == 0;
    };

    function setAllSelectedState(button) {
        $(button).parent().find(FILTER_BUTTON_CLASS).each(function(index) {
            $(this).removeClass(SUBMIT_BUTTON_PUSHED);
            if (!$(this).hasClass(SUBMIT_BUTTON)) {
                $(this).addClass(SUBMIT_BUTTON);
            }
        });
        if (!$(button).parent().find(ALL_FILTER_BUTTON_ID).hasClass(SUBMIT_BUTTON_PUSHED)) {
            $(button).parent().find(ALL_FILTER_BUTTON_ID).addClass(SUBMIT_BUTTON_PUSHED);
        }
        $(button).parent().find(ALL_FILTER_BUTTON_ID).removeClass(SUBMIT_BUTTON);
        allSelectedQuickFilterState(button);
    };

    function togleButtonStyle(button) {
        $(button).toggleClass(SUBMIT_BUTTON_PUSHED);
        $(button).toggleClass(SUBMIT_BUTTON);
        alterQuickFilterState(button);
    };

    function removeAllSelectedState(button) {
        if (!$(button).parent().find(ALL_FILTER_BUTTON_ID).hasClass(SUBMIT_BUTTON)) {
            $(button).parent().find(ALL_FILTER_BUTTON_ID).addClass(SUBMIT_BUTTON);
        }
        $(button).parent().find(ALL_FILTER_BUTTON_ID).removeClass(SUBMIT_BUTTON_PUSHED);
    }

    function alterQuickFilterState(button) {
        var filterCategory = $(button).parent().find("span:first-child").text();
        var filteredValue = $(button).text();
        if ($(button).hasClass(SUBMIT_BUTTON_PUSHED)) {
            if (quickFilters[filterCategory]) {
                quickFilters[filterCategory].push(filteredValue);
            } else {
                quickFilters[filterCategory] = [filteredValue];
            }
        } else {
            quickFilters[filterCategory].splice(quickFilters[filterCategory].indexOf(filteredValue), 1);
        }
    }

    function allSelectedQuickFilterState(button) {
        var filterCategory = $(button).parent().find("span:first-child").text();
        delete quickFilters[filterCategory];
    }

    return quickFilterEvent;

}());