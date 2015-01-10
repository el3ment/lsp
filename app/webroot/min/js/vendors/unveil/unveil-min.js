/**
 * jQuery Unveil
 * A very lightweight jQuery plugin to lazy load images
 * http://luis-almeida.github.com/unveil
 *
 * Licensed under the MIT license.
 * Copyright 2013 Luís Almeida
 * https://github.com/luis-almeida
 */

define([],function(){(function(e){e.fn.unveil=function(t,n){function f(){var t=u.filter(function(){var t=e(this);if(t.is(":hidden"))return;var n=r.scrollTop(),s=n+r.height(),o=t.offset().top,u=o+t.height();return u>=n-i&&o<=s+i});a=t.trigger("unveil"),u=u.not(a)}var r=e(window),i=t||0,s=window.devicePixelRatio>1,o=s?"data-src-retina":"data-src",u=this,a;return this.attr("src","data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"),this.one("unveil",function(){var t=this.getAttribute(o);t=t||this.getAttribute("data-src"),t&&(this.nodeName==="IMG"?this.setAttribute("src",t):e(this).css("background-image","url("+t+")"),typeof n=="function"&&n.call(this),this.removeAttribute("data-src"),this.removeAttribute("data-src-retina"))}),r.scroll(f),r.resize(f),f(),this}})(window.jQuery||window.Zepto)});