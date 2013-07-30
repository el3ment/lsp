(function(){
	
	var _util = window.LSP.utilities;
	
	_util.register('controller', 'netsuite', (function(){
		var _this = {};
		var _app = window.LSP;

		_this = {
			
			events : {
				application : {
					onReady : function(e, data){
						_this.attachEnterKey();
						_this.fixSignInUrlForRedirection();
						_this.injectRedirectInput();
					}
				},
				netsuite : {
					onInit : function(e, data){
						_this.handlePostSignInRedirection();
					}
				}
			},
			
			assets : {},

			// Takes a url parameter and adds it to the login form
			injectRedirectInput : function(){
				var params = _util.getURLParameters();
				if(params.lsppassthrough && document.forms.login){
					$(document.forms.login).prepend('<input type="hidden" name="redirect" value="' + params.lsppassthrough + '">');
				}
			},

			// Sigh..
			fixSignInUrlForRedirection : function(){

				var redirectUrl = (document.location.href.indexOf('lsppassthrough=') === -1 ? encodeURIComponent(document.location.href) : _util.findBetween('lsppassthrough=', '&', document.location.href));
				
				$('a[href*="login=T"]').each(function(i, e){
					var link = $(e);
					if(redirectUrl.indexOf('login=T') === -1){
						link.attr('href', link.attr('href') + '&lsppassthrough=' + redirectUrl);
					}
				});
			},


			handlePostSignInRedirection : function(){
				if(parseInt($('.page-generic').data('uid'), 10) > 0){
					var params = _util.getURLParameters();
					if(params.lspredirectto){
						document.location = params.lspredirectto;
					}
				}
			},

			attachEnterKey : function(){

				// Check nested tables to ensure we attach only to netsuite inputs
				$('.page-generic table table table input').off('.submitter').on('keyup.lsp.submitter', function(e){
					// If it's an enter key and was not preceded by an enter key
					switch(e.which){
						case 13:
							if($(this).data('isDirty')){
								$(this).parents().each(function(i, element){
									var submit = $(element).find('#tbl_submitter *[onclick]')[0];
									if(submit){
										submit.click();
										e.stopPropagation();
										return false;
									}
								});

								// Prevents firing this event if the user hit enter
								// last time. This is a problem when you hit enter to
								// close the beautiful alert box netsuite generates
								$(this).data('isDirty', false);
							}
							break;
						case 40:
						case 38:
							//noop - in autocomplete
							$(this).data('isDirty', false);
							break;
						default:
							$(this).data('isDirty', true);
					}

				}).data('isDirty', true);
			}
		};
		
		return _this;

	})());

})();