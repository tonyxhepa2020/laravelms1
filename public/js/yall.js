/**
 * yall - yet another lazyload library using intersection observer
 * @author José Moreira @ <https://github.com/giventofly/pixelit>
 **/

"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,e){for(var r=0;r<e.length;r++){var o=e[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function _createClass(t,e,r){return e&&_defineProperties(t.prototype,e),r&&_defineProperties(t,r),t}var yall=function(){function t(){var e=this,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};_classCallCheck(this,t),this.target=r.target||"yall_lazy",this.classToLoad=r.classToLoad||"yall_loaded",this.threshold=r.threshold||0,this.root=document.querySelector(r.root),this.rootMargin=r.rootMargin||"0px 0px 100px 0px",this.callback=r.callback||null,this.useLoading=r.useLoading||!1,this.options={threshold:this.threshold,root:this.root,rootMargin:this.rootMargin},"IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"intersectionRatio"in window.IntersectionObserverEntry.prototype&&"isIntersecting"in window.IntersectionObserverEntry.prototype&&("loading"in HTMLImageElement.prototype||!this.useLoading)||(this.fsafari=!0,Array.from(document.querySelectorAll("."+this.target+":not(."+this.classToLoad+")")).forEach(function(t){e.loadElem(t)}))}return _createClass(t,[{key:"loadElem",value:function(t){var e=t.dataset.src,r=t.dataset.srcset;e&&(t.src=e),r&&(t.srcset=r),t.classList.add(this.classToLoad),this.callback&&window[this.callback](t)}},{key:"run",value:function(){var t=this;if(!this.safari){var e=new IntersectionObserver(function(e,r){e.forEach(function(e){e.isIntersecting&&(t.loadElem(e.target),r.unobserve(e.target))})},this.options);Array.from(document.querySelectorAll("."+this.target+":not(."+this.classToLoad+")")).forEach(function(t){e.observe(t)})}}}]),t}();
