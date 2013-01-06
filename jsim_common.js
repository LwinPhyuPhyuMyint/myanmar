//////////////////////////////////
//
//    JS IM Common Library
//        by Colspan (Miyoshi)
//         http://colspan.net/
//
// ported from prototype.js

var JSIM_Common = {
  version : "",
  author : "Colspan",
  Browser: {
  IE:     !!(window.attachEvent && !window.opera),
	Opera:  !!window.opera,
	WebKit: navigator.userAgent.indexOf('AppleWebKit/') > -1,
    WebKit_iPhone: ( navigator.userAgent.indexOf('iPhone') > -1 ) && this.WebKit,
	Gecko:  navigator.userAgent.indexOf('Gecko') > -1 && navigator.userAgent.indexOf('KHTML') == -1,
	MobileSafari: !!navigator.userAgent.match(/Apple.*Mobile.*Safari/)
  },
  $: function( element ){
	element = document.getElementById(element);
	return element;
  },
  cloneObj: function(source) {
	destination = {};
	for (var property in source)
	destination[property] = source[property];
	return destination;
  },
  cumulativeOffset: function(element) {
	var valueT = 0, valueL = 0;
	do {
	  valueT += element.offsetTop  || 0;
	  valueL += element.offsetLeft || 0;
	  element = element.offsetParent;
	} while (element);
	return { left:valueL, top:valueT };
  },
  camelize: function( targetString ) {
	var parts = targetString.split('-'), len = parts.length;
	if (len == 1) return parts[0];

	var camelized = targetString.charAt(0) == '-'
	  ? parts[0].charAt(0).toUpperCase() + parts[0].substring(1)
	  : parts[0];

	for (var i = 1; i < len; i++)
	  camelized += parts[i].charAt(0).toUpperCase() + parts[i].substring(1);

	return camelized;
  },
  getStyle: function(element, style) {
	style = style == 'float' ? 'cssFloat' : JSIM_Common.camelize(style);
	var value = element.style[style];
	if (!value) {
	  var css = document.defaultView.getComputedStyle(element, null);
	  value = css ? css[style] : null;
	}
	if (style == 'opacity') return value ? parseFloat(value) : 1.0;
	return value == 'auto' ? null : value;
  },
  stripTags: function(targetString) {
	return targetString.replace(/<\/?[^>]+>/gi, '');
  },
  addEvent: function(obj, type, func, flag){
    if(obj.addEventListener){ obj.addEventListener(type, func, false); }
    else{ if(obj.attachEvent) obj.attachEvent('on' + type, func); }
  }

};
var Class = {
  create: function() {
	return function () {
	  this.initialize.apply(this, arguments);
	};
  }
};

var JSIM_dummyCommand = function( a ){
	return null;
}
