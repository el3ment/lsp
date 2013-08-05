window.setWindowChanged = window.setWindowChanged || $.noop;
window.validate_field = window.validate_field || $.noop;
window.selectAndFocusField = window.selectAndFocusField || $.noop;
window.page_init = window.page_init || $.noop;
window.process_currency_field_value = window.process_currency_field_value || $.noop;

window.console = window.console || {
	log: function(){ }
}