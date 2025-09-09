/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/.pnpm/@babel+runtime@7.26.10/node_modules/@babel/runtime/helpers/esm/classCallCheck.js":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@babel+runtime@7.26.10/node_modules/@babel/runtime/helpers/esm/classCallCheck.js ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ _classCallCheck)\n/* harmony export */ });\nfunction _classCallCheck(a, n) {\n  if (!(a instanceof n)) throw new TypeError(\"Cannot call a class as a function\");\n}\n\n\n//# sourceURL=webpack://theme-raed/./node_modules/.pnpm/@babel+runtime@7.26.10/node_modules/@babel/runtime/helpers/esm/classCallCheck.js?");

/***/ }),

/***/ "./node_modules/.pnpm/@babel+runtime@7.26.10/node_modules/@babel/runtime/helpers/esm/createClass.js":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@babel+runtime@7.26.10/node_modules/@babel/runtime/helpers/esm/createClass.js ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ _createClass)\n/* harmony export */ });\n/* harmony import */ var _toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toPropertyKey.js */ \"./node_modules/.pnpm/@babel+runtime@7.26.10/node_modules/@babel/runtime/helpers/esm/toPropertyKey.js\");\n\nfunction _defineProperties(e, r) {\n  for (var t = 0; t < r.length; t++) {\n    var o = r[t];\n    o.enumerable = o.enumerable || !1, o.configurable = !0, \"value\" in o && (o.writable = !0), Object.defineProperty(e, (0,_toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(o.key), o);\n  }\n}\nfunction _createClass(e, r, t) {\n  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, \"prototype\", {\n    writable: !1\n  }), e;\n}\n\n\n//# sourceURL=webpack://theme-raed/./node_modules/.pnpm/@babel+runtime@7.26.10/node_modules/@babel/runtime/helpers/esm/createClass.js?");

/***/ }),

/***/ "./node_modules/.pnpm/@babel+runtime@7.26.10/node_modules/@babel/runtime/helpers/esm/toPrimitive.js":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@babel+runtime@7.26.10/node_modules/@babel/runtime/helpers/esm/toPrimitive.js ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ toPrimitive)\n/* harmony export */ });\n/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ \"./node_modules/.pnpm/@babel+runtime@7.26.10/node_modules/@babel/runtime/helpers/esm/typeof.js\");\n\nfunction toPrimitive(t, r) {\n  if (\"object\" != (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(t) || !t) return t;\n  var e = t[Symbol.toPrimitive];\n  if (void 0 !== e) {\n    var i = e.call(t, r || \"default\");\n    if (\"object\" != (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(i)) return i;\n    throw new TypeError(\"@@toPrimitive must return a primitive value.\");\n  }\n  return (\"string\" === r ? String : Number)(t);\n}\n\n\n//# sourceURL=webpack://theme-raed/./node_modules/.pnpm/@babel+runtime@7.26.10/node_modules/@babel/runtime/helpers/esm/toPrimitive.js?");

/***/ }),

/***/ "./node_modules/.pnpm/@babel+runtime@7.26.10/node_modules/@babel/runtime/helpers/esm/toPropertyKey.js":
/*!************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@babel+runtime@7.26.10/node_modules/@babel/runtime/helpers/esm/toPropertyKey.js ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ toPropertyKey)\n/* harmony export */ });\n/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ \"./node_modules/.pnpm/@babel+runtime@7.26.10/node_modules/@babel/runtime/helpers/esm/typeof.js\");\n/* harmony import */ var _toPrimitive_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toPrimitive.js */ \"./node_modules/.pnpm/@babel+runtime@7.26.10/node_modules/@babel/runtime/helpers/esm/toPrimitive.js\");\n\n\nfunction toPropertyKey(t) {\n  var i = (0,_toPrimitive_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(t, \"string\");\n  return \"symbol\" == (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(i) ? i : i + \"\";\n}\n\n\n//# sourceURL=webpack://theme-raed/./node_modules/.pnpm/@babel+runtime@7.26.10/node_modules/@babel/runtime/helpers/esm/toPropertyKey.js?");

/***/ }),

/***/ "./node_modules/.pnpm/@babel+runtime@7.26.10/node_modules/@babel/runtime/helpers/esm/typeof.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@babel+runtime@7.26.10/node_modules/@babel/runtime/helpers/esm/typeof.js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ _typeof)\n/* harmony export */ });\nfunction _typeof(o) {\n  \"@babel/helpers - typeof\";\n\n  return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) {\n    return typeof o;\n  } : function (o) {\n    return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o;\n  }, _typeof(o);\n}\n\n\n//# sourceURL=webpack://theme-raed/./node_modules/.pnpm/@babel+runtime@7.26.10/node_modules/@babel/runtime/helpers/esm/typeof.js?");

/***/ }),

/***/ "./src/assets/js/recently-viewed.js":
/*!******************************************!*\
  !*** ./src/assets/js/recently-viewed.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ RecentlyViewed)\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/.pnpm/@babel+runtime@7.26.10/node_modules/@babel/runtime/helpers/esm/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/.pnpm/@babel+runtime@7.26.10/node_modules/@babel/runtime/helpers/esm/createClass.js\");\n\n\nvar RecentlyViewed = /*#__PURE__*/function () {\n  function RecentlyViewed() {\n    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, RecentlyViewed);\n    this.storageKey = \"salla_recently_viewed\";\n    this.maxItems = 12;\n    this.init();\n  }\n  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(RecentlyViewed, [{\n    key: \"init\",\n    value: function init() {\n      // Track current product if on product page\n      if (window.location.pathname.includes(\"/product/\") || window.location.pathname.includes(\"/p/\")) {\n        this.trackProduct();\n      }\n\n      // Display recently viewed on home page\n      if (document.querySelector(\".recently-viewed-section\")) {\n        this.displayProducts();\n      }\n    }\n  }, {\n    key: \"trackProduct\",\n    value: function trackProduct() {\n      var _this = this;\n      // Wait for product data\n      document.addEventListener(\"salla:product.fetched\", function (event) {\n        var _product$image, _product$images;\n        var product = event.detail;\n        var productData = {\n          id: product.id,\n          name: product.name,\n          url: product.url,\n          image: ((_product$image = product.image) === null || _product$image === void 0 ? void 0 : _product$image.url) || ((_product$images = product.images) === null || _product$images === void 0 || (_product$images = _product$images[0]) === null || _product$images === void 0 ? void 0 : _product$images.url),\n          price: product.price,\n          sale_price: product.sale_price,\n          currency: product.currency,\n          timestamp: Date.now()\n        };\n        _this.saveProduct(productData);\n      });\n    }\n  }, {\n    key: \"saveProduct\",\n    value: function saveProduct(productData) {\n      var products = this.getProducts();\n      products = products.filter(function (p) {\n        return p.id !== productData.id;\n      });\n      products.unshift(productData);\n      products = products.slice(0, this.maxItems);\n      localStorage.setItem(this.storageKey, JSON.stringify(products));\n    }\n  }, {\n    key: \"getProducts\",\n    value: function getProducts() {\n      try {\n        var stored = localStorage.getItem(this.storageKey);\n        if (!stored) return [];\n        var products = JSON.parse(stored);\n        var oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;\n        return products.filter(function (p) {\n          return p.timestamp > oneDayAgo;\n        });\n      } catch (e) {\n        return [];\n      }\n    }\n  }, {\n    key: \"displayProducts\",\n    value: function displayProducts() {\n      var _document$querySelect;\n      var products = this.getProducts();\n      if (products.length < 2) return;\n      var container = document.querySelector(\".recently-viewed-products\");\n      if (!container) return;\n      (_document$querySelect = document.querySelector(\".recently-viewed-section\")) === null || _document$querySelect === void 0 || _document$querySelect.classList.remove(\"hidden\");\n      container.innerHTML = products.map(function (product) {\n        return \"\\n      <div class=\\\"swiper-slide\\\">\\n        <div class=\\\"product-card\\\">\\n          <a href=\\\"\".concat(product.url, \"\\\">\\n            <img src=\\\"\").concat(product.image, \"\\\" alt=\\\"\").concat(product.name, \"\\\" class=\\\"w-full h-48 object-cover rounded-lg mb-3\\\">\\n            <h3 class=\\\"text-sm font-semibold mb-2\\\">\").concat(product.name, \"</h3>\\n            <div class=\\\"flex items-center gap-2\\\">\\n              \").concat(product.sale_price ? \"\\n                <span class=\\\"text-red-500 font-bold\\\">\".concat(product.sale_price, \" \").concat(product.currency, \"</span>\\n                <span class=\\\"text-gray-400 line-through text-sm\\\">\").concat(product.price, \" \").concat(product.currency, \"</span>\\n              \") : \"\\n                <span class=\\\"font-bold\\\">\".concat(product.price, \" \").concat(product.currency, \"</span>\\n              \"), \"\\n            </div>\\n          </a>\\n        </div>\\n      </div>\\n    \");\n      }).join(\"\");\n    }\n  }]);\n}();\n\n\n//# sourceURL=webpack://theme-raed/./src/assets/js/recently-viewed.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/assets/js/recently-viewed.js");
/******/ 	
/******/ })()
;