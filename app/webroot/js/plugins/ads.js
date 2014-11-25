(function(){

define(['utilities/global', 'controllers/application'], function(){
	
	var _app = window.LSP;
	var _util = _app.utilities;

	_util.register('model', 'ads', {

		events : {
			home : {
				onEngageAd : function(e, data){
					 _gaq.push(['_setCustomVar',
						  1,
						  'Clicked Ad',
						  data.selector.data('context') || 'Yes',
						  2
					   ]);
					 // Force the Custom Var to be set
					_gaq.push(['_trackEvent', 'advertisement', 'click', data.selector.data('context'), 1, true]);
				}
			}
		}
	});
});

}());