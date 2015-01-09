!function(){define(["utilities/global","controllers/application"],function(){var a=window.LSP.utilities,b=function(){var b={},c=window.LSP,d=(c.models.api,{validationInputs:'*[class*="validation-"]:input:not([disabled])'}),e={required:{defaultMessage:"This field is required",pattern:/^.+/},alphaOnly:{defaultMessage:"Letters only",pattern:/^[A-Za-z]*$/},numericOnly:{defaultMessage:"Numbers only",pattern:/^[0-9]*$/},alphaNumeric:{defaultMessage:"Numbers, letters, and spaces only",pattern:/[A-Za-z ]*/},emailAddress:{defaultMessage:"This dosen't look like an email address",pattern:/^[a-zA-Z0-9_\-\.]{2,}@[a-zA-Z0-9_\-\.]{2,}\.[a-zA-Z]{2,}$/},creditCardNumber:{defaultMessage:"Invalid credit card number",pattern:/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/}};return b={name:"validation",events:{application:{onAttachEvents:function(a,c){$(d.validationInputs,c.selector).each(function(a,c){$(c).off("validation").on("keyup.lsp.validation",function(a){return 9!==a.which&&16!==a.which&&13!==a.which&&b.validate(c),!0})}),$("form",c.selector).off("validation").on("submit.lsp.validation",function(a){var c=b.validateForm($(this));return c?($(this).triggerHandler("afterValidation"),!0):(a.preventDefault(),!1)})}}},assets:{},getValidationMessage:function(a,b){var c=$(a).data("validation-message-"+b),d=e[b].defaultMessage;return c?c:d},getPattern:function(a){if(e[a])return e[a];throw new Error(a+" is an invalid validation type")},isValid:function(a,c){return b.getPattern(c).pattern.test(a)},validateForm:function(c){for(var e,f=!1,g=$(d.validationInputs,c),h=0;h<g.length;h++)if(!b.validate(g[h])){f=!0,e=g[h];break}return f===!0&&a.scrollTo(e),!f},isValidForm:function(a){for(var c=$(d.validationInputs,a),e=0;e<c.length;e++)if(!b.validate(c[e]))return!1;return!0},validate:function(a){$(a).removeClass("validation-valid","validation-invalid");var c="radio"==$(a).prop("type")?$("input[name="+$(a).prop("name")+"]:checked").val()||"":$(a).val();console.log(c);var d=b.parseInvalid(c,$(a).attr("class").split(/\s+/));return d.length>0?(b.displayInvalid(a,d),!1):(b.displayValid(a),!0)},parseInvalid:function(a,c){for(var d=[],e=0;e<c.length;e++)if(c[e].indexOf("validation-")>-1&&"validation-valid"!==c[e]&&"validation-invalid"!==c[e]){var f=c[e].replace("validation-",""),g=b.getPattern(f);a.match(g.pattern)||(""===a||"required"===f)&&"required"!==f||d.push(f)}return d},displayInvalid:function(a,b){var c=$(a).parent(".validation-container");if(!c.length)var c=$(a).parent().addClass("validation-container");c.attr("data-validation-invalidTypes",b.join(" "))},displayValid:function(a){$(a).parent(".validation-container").removeAttr("data-validation-invalidTypes")}}}();a.register("controller","validation",b)})}();