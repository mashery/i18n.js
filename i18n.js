var i18n = (function () {

	'use strict';

	//
	// Variables
	//

	var exp = {};
	var dict;
	var current;
	var rtlLangs;


	//
	// Methods
	//

	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
	}

	var toggleVisibility = function (lang) {
		var elems = Array.prototype.slice.call(document.querySelectorAll('[class*="lang-"]'));
		elems.forEach(function (elem) {
			if (elem.classList.contains('lang-' + lang)) {
				elem.removeAttribute('hidden');
			} else {
				elem.setAttribute('hidden', true);
			}
		});
	};

	var setCurrent = function (lang) {
		current = lang;
		localStorage.setItem('portalLang', lang);
		document.documentElement.lang = lang;
	};

	var getSelected = function () {
		var lang = localStorage.getItem('portalLang');
		return lang;
	}

	exp.getCurrent = function () {
		return current;
	};

	var translateText = function (elem, lang) {
		if (elem.nodeType === 1 || elem.nodeType === 3) {
			var temp = elem.textContent;
			dict.forEach(function (def) {
				if (!def[current] || !def[lang]) return;
				temp = temp.replace(new RegExp(def[current], 'g'), def[lang]);
			});
			elem.textContent = temp;
		}
	};

	var rtl = function (lang) {
		if (rtlLangs.indexOf(lang) < 0) {
			document.documentElement.dir = 'ltr';
		} else {
			document.documentElement.dir = 'rtl';
		}
	};

	var translate = function (elem, lang) {
		toggleVisibility(lang);
		rtl(lang);
		var elems = Array.prototype.slice.call(elem.childNodes);
		if (elem.matches && elem.matches('[class*="lang-"]')) return;
		if (elems.length < 1) {
			translateText(elem, lang);
		} else {
			elems.forEach(function (elem) {
				translate(elem, lang);
			});
		}
	};

	var eventHandler = function (event) {
		var toggle = event.target.closest('[data-lang], [data-lang-select]');
		if (!toggle) return;
		var lang = toggle.getAttribute('data-lang') || toggle.value;
		translate(document.body, lang);
		setCurrent(lang);
	};

	var setToggle = function (lang) {
		var toggles = Array.prototype.slice.call(document.querySelectorAll('[data-lang-select]'));
		toggles.forEach(function (toggle) {
			toggle.value = lang;
		});
	};

	var setInitialLang = function (def) {
		current = def;
		var selected = getSelected();
		var lang = selected ? selected : current;
		exp.setLang(lang);
		setToggle(lang);
	};

	exp.setLang = function (lang) {
		lang = lang ? lang : current;
		translate(document.body, lang);
		setCurrent(lang);
	};

	exp.init = function (def, dictionary, rtl) {
		if (!def || !dictionary) return;
		dict = dictionary.slice();
		rtlLangs = rtl ? rtl.slice() : [];
		setInitialLang(def);
		document.addEventListener('click', eventHandler);
		document.addEventListener('change', eventHandler);
	};


	//
	// Return Public Methods
	//

	return exp;

})();