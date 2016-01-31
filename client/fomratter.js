$('.log-entry').html(function() {
    return this.innerHTML.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
});