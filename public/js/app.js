/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/alpinejs/dist/alpine.js":
/*!**********************************************!*\
  !*** ./node_modules/alpinejs/dist/alpine.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():undefined}(this,(function(){"use strict";function e(){return navigator.userAgent.includes("Node.js")||navigator.userAgent.includes("jsdom")}function t(e,n,i=!0){if(e.hasAttribute("x-data")&&!i)return;n(e);let a=e.firstElementChild;for(;a;)t(a,n,!1),a=a.nextElementSibling}function n(e,t,n={}){return new Function(["$data",...Object.keys(n)],`var result; with($data) { result = ${e} }; return result`)(t,...Object.values(n))}function i(e){return/x-(on|bind|data|text|html|model|if|show|cloak|transition|ref)/.test(e.name)}function a(e,t){return Array.from(e.attributes).filter(i).map(e=>{const t=e.name.match(/x-(on|bind|data|text|html|model|if|show|cloak|transition|ref)/),n=e.name.match(/:([a-zA-Z\-]+)/),i=e.name.match(/\.[^.\]]+(?=[^\]]*$)/g)||[];return{type:t?t[1]:null,value:n?n[1]:null,modifiers:i.map(e=>e.replace(".","")),expression:e.value}}).filter(e=>!t||e.type===t)}function s(e,t,n=!1){n&&t();const i=a(e,"transition");i.length<1&&t(),o(e,(i.find(e=>"enter"===e.value)||{expression:""}).expression.split(" ").filter(e=>""!==e),(i.find(e=>"enter-start"===e.value)||{expression:""}).expression.split(" ").filter(e=>""!==e),(i.find(e=>"enter-end"===e.value)||{expression:""}).expression.split(" ").filter(e=>""!==e),t,()=>{})}function r(e,t,n=!1){n&&t();const i=a(e,"transition");i.length<1&&t(),o(e,(i.find(e=>"leave"===e.value)||{expression:""}).expression.split(" ").filter(e=>""!==e),(i.find(e=>"leave-start"===e.value)||{expression:""}).expression.split(" ").filter(e=>""!==e),(i.find(e=>"leave-end"===e.value)||{expression:""}).expression.split(" ").filter(e=>""!==e),()=>{},t)}function o(e,t,n,i,a,s){e.classList.add(...n),e.classList.add(...t),requestAnimationFrame(()=>{const r=1e3*Number(getComputedStyle(e).transitionDuration.replace("s",""));a(),requestAnimationFrame(()=>{e.classList.remove(...n),e.classList.add(...i),setTimeout(()=>{s(),e.isConnected&&(e.classList.remove(...t),e.classList.remove(...i))},r)})})}class l{constructor(e){this.el=e;const t=n(this.el.getAttribute("x-data"),{});t.$refs=this.getRefsProxy(),this.data=this.wrapDataInObservable(t),this.initialize(),this.listenForNewElementsToInitialize()}wrapDataInObservable(e){this.concernedData=[];var t=this;const n=e=>({set(n,i,a){const s=e?`${e}.${i}`:i,r=Reflect.set(n,i,a);return-1===t.concernedData.indexOf(s)&&t.concernedData.push(s),t.refresh(),r},get(t,i){if("object"==typeof t[i]&&null!==t[i]){const a=e?`${e}.${i}`:i;return new Proxy(t[i],n(a))}return t[i]}});return new Proxy(e,n())}initialize(){t(this.el,e=>{this.initializeElement(e)})}initializeElement(e){a(e).forEach(({type:t,value:n,modifiers:i,expression:a})=>{switch(t){case"on":var s=n;this.registerListener(e,s,i,a);break;case"model":s="select"===e.tagName.toLowerCase()||["checkbox","radio"].includes(e.type)||i.includes("lazy")?"change":"input";const t=this.generateExpressionForXModelListener(e,i,a);this.registerListener(e,s,i,t);var r="value",{output:o}=this.evaluateReturnExpression(a);this.updateAttributeValue(e,r,o);break;case"bind":r=n;var{output:o}=this.evaluateReturnExpression(a);this.updateAttributeValue(e,r,o);break;case"text":var{output:o}=this.evaluateReturnExpression(a);this.updateTextValue(e,o);break;case"html":var{output:o}=this.evaluateReturnExpression(a);this.updateHtmlValue(e,o);break;case"show":var{output:o}=this.evaluateReturnExpression(a);this.updateVisibility(e,o,!0);break;case"if":var{output:o}=this.evaluateReturnExpression(a);this.updatePresence(e,o);break;case"cloak":e.removeAttribute("x-cloak")}})}listenForNewElementsToInitialize(){const e=this.el;new MutationObserver(e=>{for(let t=0;t<e.length;t++){if(!e[t].target.closest("[x-data]").isSameNode(this.el))return;if("attributes"===e[t].type&&"x-data"===e[t].attributeName){const i=n(e[t].target.getAttribute("x-data"),{});Object.keys(i).forEach(e=>{this.data[e]!==i[e]&&(this.data[e]=i[e])})}e[t].addedNodes.length>0&&e[t].addedNodes.forEach(e=>{1===e.nodeType&&(e.matches("[x-data]")||a(e).length>0&&this.initializeElement(e))})}}).observe(e,{childList:!0,attributes:!0,subtree:!0})}refresh(){var e=this;const n={model:({el:t,output:n})=>{e.updateAttributeValue(t,"value",n)},bind:({el:t,attrName:n,output:i})=>{e.updateAttributeValue(t,n,i)},text:({el:t,output:n})=>{e.updateTextValue(t,n)},html:({el:t,output:n})=>{e.updateHtmlValue(t,n)},show:({el:t,output:n})=>{e.updateVisibility(t,n)},if:({el:t,output:n})=>{e.updatePresence(t,n)}};var i,s,r,o;(i=(n,i)=>{t(n,i),e.concernedData=[]},s=5,function(){var e=this,t=arguments,n=function(){o=null,r||i.apply(e,t)},a=r&&!o;clearTimeout(o),o=setTimeout(n,s),a&&i.apply(e,t)})(this.el,(function(t){a(t).forEach(({type:i,value:a,expression:s})=>{if(n[i]){var{output:r,deps:o}=e.evaluateReturnExpression(s);e.concernedData.filter(e=>o.includes(e)).length>0&&n[i]({el:t,attrName:a,output:r})}})}))}generateExpressionForXModelListener(e,t,n){var i="";return i="checkbox"===e.type?Array.isArray(this.data[n])?`$event.target.checked ? ${n}.concat([$event.target.value]) : ${n}.filter(i => i !== $event.target.value)`:"$event.target.checked":"select"===e.tagName.toLowerCase()&&e.multiple?t.includes("number")?"Array.from($event.target.selectedOptions).map(option => { return parseFloat(option.value || option.text) })":"Array.from($event.target.selectedOptions).map(option => { return option.value || option.text })":t.includes("number")?"parseFloat($event.target.value)":t.includes("trim")?"$event.target.value.trim()":"$event.target.value","radio"===e.type&&(e.hasAttribute("name")||e.setAttribute("name",n)),`${n} = ${i}`}registerListener(e,t,n,i){if(n.includes("away")){const a=s=>{e.contains(s.target)||e.offsetWidth<1&&e.offsetHeight<1||(this.runListenerHandler(i,s),n.includes("once")&&document.removeEventListener(t,a))};document.addEventListener(t,a)}else{const a=n.includes("window")?window:n.includes("document")?document:e,s=e=>{const r=n.filter(e=>"window"!==e).filter(e=>"document"!==e);"keydown"===t&&r.length>0&&!r.includes(e.key.replace(/([a-z])([A-Z])/g,"$1-$2").replace(/[_\s]/,"-").toLowerCase())||(n.includes("prevent")&&e.preventDefault(),n.includes("stop")&&e.stopPropagation(),this.runListenerHandler(i,e),n.includes("once")&&a.removeEventListener(t,s))};a.addEventListener(t,s)}}runListenerHandler(e,t){this.evaluateCommandExpression(e,{$event:t})}evaluateReturnExpression(e){var t=[];const i=e=>({get(n,a){if("symbol"==typeof a)return;const s=e?`${e}.${a}`:a;return"object"!=typeof n[a]||null===n[a]||Array.isArray(n[a])?(t.push(s),n[a]):new Proxy(n[a],i(s))}});return{output:n(e,new Proxy(this.data,i())),deps:t}}evaluateCommandExpression(e,t){!function(e,t,n={}){new Function(["$data",...Object.keys(n)],`with($data) { ${e} }`)(t,...Object.values(n))}(e,this.data,t)}updateTextValue(e,t){e.innerText=t}updateHtmlValue(e,t){e.innerHTML=t}updateVisibility(e,t,n=!1){t?s(e,()=>{1===e.style.length&&""!==e.style.display?e.removeAttribute("style"):e.style.removeProperty("display")},n):r(e,()=>{e.style.display="none"},n)}updatePresence(e,t){"template"!==e.nodeName.toLowerCase()&&console.warn("Alpine: [x-if] directive should only be added to <template> tags.");const n=e.nextElementSibling&&!0===e.nextElementSibling.__x_inserted_me;if(t&&!n){const t=document.importNode(e.content,!0);e.parentElement.insertBefore(t,e.nextElementSibling),e.nextElementSibling.__x_inserted_me=!0,s(e.nextElementSibling,()=>{})}else!t&&n&&r(e.nextElementSibling,()=>{e.nextElementSibling.remove()})}updateAttributeValue(e,t,n){if("value"===t)if("radio"===e.type)e.checked=e.value==n;else if("checkbox"===e.type)if(Array.isArray(n)){let t=!1;n.forEach(n=>{n==e.value&&(t=!0)}),e.checked=t}else e.checked=!!n;else"SELECT"===e.tagName?this.updateSelect(e,n):e.value=n;else"class"===t?Array.isArray(n)?e.setAttribute("class",n.join(" ")):Object.keys(n).forEach(t=>{n[t]?t.split(" ").forEach(t=>e.classList.add(t)):t.split(" ").forEach(t=>e.classList.remove(t))}):["disabled","readonly","required","checked","hidden"].includes(t)?n?e.setAttribute(t,""):e.removeAttribute(t):e.setAttribute(t,n)}updateSelect(e,t){const n=[].concat(t).map(e=>e+"");Array.from(e.options).forEach(e=>{e.selected=n.includes(e.value||e.text)})}getRefsProxy(){var e=this;return new Proxy({},{get(n,i){var a;return t(e.el,e=>{e.hasAttribute("x-ref")&&e.getAttribute("x-ref")===i&&(a=e)}),a}})}}const u={start:async function(){e()||await new Promise(e=>{"loading"==document.readyState?document.addEventListener("DOMContentLoaded",e):e()}),this.discoverComponents(e=>{this.initializeComponent(e)}),document.addEventListener("turbolinks:load",()=>{this.discoverUninitializedComponents(e=>{this.initializeComponent(e)})}),this.listenForNewUninitializedComponentsAtRunTime(e=>{this.initializeComponent(e)})},discoverComponents:function(e){document.querySelectorAll("[x-data]").forEach(t=>{e(t)})},discoverUninitializedComponents:function(e){const t=document.querySelectorAll("[x-data]");Array.from(t).filter(e=>void 0===e.__x).forEach(t=>{e(t)})},listenForNewUninitializedComponentsAtRunTime:function(e){const t=document.querySelector("body");new MutationObserver(t=>{for(let n=0;n<t.length;n++)t[n].addedNodes.length>0&&t[n].addedNodes.forEach(t=>{1===t.nodeType&&t.matches("[x-data]")&&e(t)})}).observe(t,{childList:!0,attributes:!0,subtree:!0})},initializeComponent:function(e){e.__x=new l(e)}};return e()||(window.Alpine=u,window.Alpine.start()),u}));
//# sourceMappingURL=alpine.js.map


/***/ }),

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var alpinejs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! alpinejs */ "./node_modules/alpinejs/dist/alpine.js");
/* harmony import */ var alpinejs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(alpinejs__WEBPACK_IMPORTED_MODULE_0__);


/***/ }),

/***/ "./src/scss/app.scss":
/*!***************************!*\
  !*** ./src/scss/app.scss ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*************************************************!*\
  !*** multi ./src/js/app.js ./src/scss/app.scss ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/collin/code/ngs/hooligan-hymnal-server/src/js/app.js */"./src/js/app.js");
module.exports = __webpack_require__(/*! /Users/collin/code/ngs/hooligan-hymnal-server/src/scss/app.scss */"./src/scss/app.scss");


/***/ })

/******/ });