Template.quickFilter.events({
    "click .all-filter-button": function(evt) {
        togleButtonStyle(evt.target);
    },
    "click .filter-button": function(evt) {
        togleButtonStyle(evt.target);
    }
});

var togleButtonStyle = function(button) {
    $(button).toggleClass("submit-button-pushed");
    $(button).toggleClass("submit-button");
}