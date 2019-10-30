# i18n.js
i18n.js in an internationalization plugin that adds multi-language support to your Mashery portal.


## Getting Started

### 1. Add i18n.js to your portal

You can add the file inline in one of the `Inline JavaScript` sections under `Manage` > `Portal` > `Portal Setup` in Control Center. Or, you can include it in an external JavaScript file.

### 2. Add a language picker

Somewhere in your markup, add a language picker users can use to select their preferred language. You can use buttons or a select menu.

**Buttons**

If you use buttons, add the `[data-lang]` attribute to each one, with the language as its value.

```html
<button data-lang="en">English</button>
<button data-lang="ar">عربى</button>
```

**Select Menu**

If you use a select menu, add the `[data-lang-select]` attribute to it, and use the language as each option's value.

```html
<select data-lang-select>
	<option value="en">English</option>
	<option value="ar">عربى</option>
</select>
```

### 3. Add language classes to translated content

For content in your documentation and custom pages, wrap translations in a `div` with the `.lang-*` class, where `*` is the language for that content.

```html
<div class="lang-en">
	<h2>Hello World!</h2>
	<p>This content is in English.</p>
</div>

<div class="lang-ar">
	<h2>مرحبا بالعالم!</h2>
	<p>هذا المحتوى باللغة العربية.</p>
</div>
```

### 4. Create a dictionary of translation strings

For areas of the Portal where you cannot directly control the markup, you can create in a dictionary of phrases and their translations.

This should be an array of objects. Each object should contain language keys, and the strings that go with them.

```js
var dictionary = [{
	en: 'Translations Demo',
	ar: 'ترجمات التجريبي'
}, {
	en: 'Interactive API',
	ar: 'API التفاعلية'
}, {
	en: 'Documentation',
	ar: 'توثيق'
}, {
	en: 'My Account',
	ar: 'حسابي'
}, {
	en: 'Sign Out',
	ar: 'خروج'
}];
```

### 5. Initialize i18n.js

After your Portal's content has loaded, initialize i18n.js with the `i18n.init()` method. Pass in your default language as the first argument, and your `dictionary` as the second.

**Blackbeard**

New Mashery portals, or ones that have gone through a recent design refresh, should use the `portalAfterRender` method to initialize i18n.js.

```js
window.addEventListener('portalAfterRender', function () {
	i18n.init('en', dictionary);
});
```

**Sparrow**

Portals built with Sparrow should use the `portalReady()` method to run the initialization after the Portal content is rendered.

```js
portalReady(function () {
	i18n.init('en', dictionary);
});
```

**Older Portals**

Older portals can call this outright in the `Inline JavaScript` > `Body JavaScript` section of `Manage` > `Portal` > `Portal Setup` in Control Center.

```js
i18n.init('en', dictionary);
```



## Single-Language Translations

If you want to render your Mashery portal in a single language that's not English, and do not need multi-language support, i18n.js can still help you.

You do **not** need to add a language picker or wrap your content in an element with the `.lang-*` class, so you can skip steps 2 and 3 in the Getting Started section.

You only need to create a dictionary for the areas that cannot be directly modified.



## RTL Support

If your language is RTL, like Arabic or Hebrew, pass in an array of RTL languages as a third argument to `i18n.init()`.

```js
i18n.init('en', dictionary, ['ar']);
```

If one of those languages is the one selected, i18n.js will add `dir=rtl` to the HTML element. i18n.js also updates the `lang` property.



## License

The code is available under a [BSD-type license](LICENSE.md).