(function(){

define([], function(){
	
	return function(date, formatString){

		date = (typeof date === 'string' && date.indexOf(':') < 0 ? date.replace(/-/g, '/') : date);
		date = (typeof date === 'string' ? new Date(date) : date); // replace - with / for safari
		date = date || new Date();
		formatString = formatString || 'l, F jS Y g:ia';
		var returnStr = '';
		var replace = {
			shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			longMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
			shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
			longDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		
			// Day
			d: function(c) { return (c.getDate() < 10 ? '0' : '') + c.getDate(); },
			D: function(c) { return this.shortDays[c.getDay()]; },
			j: function(c) { return c.getDate(); },
			l: function(c) { return this.longDays[c.getDay()]; },
			N: function(c) { return c.getDay() + 1; },
			S: function(c) { return (c.getDate() % 10 == 1 && c.getDate() != 11 ? 'st' : (c.getDate() % 10 == 2 && c.getDate() != 12 ? 'nd' : (c.getDate() % 10 == 3 && c.getDate() != 13 ? 'rd' : 'th'))); },
			w: function(c) { return c.getDay(); },
			z: function(c) { var d = new Date(c.getFullYear(),0,1); return Math.ceil((c - d) / 86400000); }, // Fixed now
			// Week
			W: function(c) { var d = new Date(c.getFullYear(), 0, 1); return Math.ceil((((c - d) / 86400000) + d.getDay() + 1) / 7); }, // Fixed now
			// Month
			F: function(c) { return this.longMonths[c.getMonth()]; },
			m: function(c) { return (c.getMonth() < 9 ? '0' : '') + (c.getMonth() + 1); },
			M: function(c) { return this.shortMonths[c.getMonth()]; },
			n: function(c) { return c.getMonth() + 1; },
			t: function(c) { var d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 0).getDate() }, // Fixed now, gets #days of date
			// Year
			L: function(c) { var year = c.getFullYear(); return (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)); },   // Fixed now
			o: function(c) { var d  = new Date(c.valueOf());  d.setDate(d.getDate() - ((c.getDay() + 6) % 7) + 3); return d.getFullYear();}, //Fixed now
			Y: function(c) { return c.getFullYear(); },
			y: function(c) { return ('' + c.getFullYear()).substr(2); },
			// Time
			a: function(c) { return c.getHours() < 12 ? 'am' : 'pm'; },
			A: function(c) { return c.getHours() < 12 ? 'AM' : 'PM'; },
			B: function(c) { return Math.floor((((c.getUTCHours() + 1) % 24) + c.getUTCMinutes() / 60 + c.getUTCSeconds() / 3600) * 1000 / 24); }, // Fixed now
			g: function(c) { return c.getHours() % 12 || 12; },
			G: function(c) { return c.getHours(); },
			h: function(c) { return ((c.getHours() % 12 || 12) < 10 ? '0' : '') + (c.getHours() % 12 || 12); },
			H: function(c) { return (c.getHours() < 10 ? '0' : '') + c.getHours(); },
			i: function(c) { return (c.getMinutes() < 10 ? '0' : '') + c.getMinutes(); },
			s: function(c) { return (c.getSeconds() < 10 ? '0' : '') + c.getSeconds(); },
			u: function(c) { var m = c.getMilliseconds(); return (m < 10 ? '00' : (m < 100 ? '0' : '')) + m; },
			// Timezone
			O: function(c) { return (-c.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(c.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(c.getTimezoneOffset() / 60)) + '00'; },
			P: function(c) { return (-c.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(c.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(c.getTimezoneOffset() / 60)) + ':00'; }, // Fixed now
			T: function(c) { var m = c.getMonth(); c.setMonth(0); var result = c.toTimeString().replace(/^.+ \(?([^\)]+)\)?$/, '$1'); c.setMonth(m); return result;},
			Z: function(c) { return -c.getTimezoneOffset() * 60; },
			// Full Date/Time
			c: function(c) { return c.format("Y-m-d\\TH:i:sP"); }, // Fixed now
			r: function(c) { return c.toString(); },
			U: function(c) { return c.getTime() / 1000; }
		};
		
		for (var i = 0; i < formatString.length; i++) {
			var curChar = formatString.charAt(i);
			if (i - 1 >= 0 && formatString.charAt(i - 1) == "\\") {
				returnStr += curChar;
			}else if (replace[curChar]) {
				returnStr += replace[curChar](date);
			}else if (curChar != "\\"){
				returnStr += curChar;
			}
		}
		return returnStr;
	};


});

}())	
	