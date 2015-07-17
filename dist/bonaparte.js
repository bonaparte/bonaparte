(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Polyfill for creating CustomEvents on IE9/10/11

// code pulled from:
// https://github.com/d4tocchini/customevent-polyfill
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent#Polyfill

try {
  new CustomEvent("test");
} catch(e) {
 var CustomEvent = function(event, params) {
      var evt;
      params = params || {
          bubbles: false,
          cancelable: false,
          detail: undefined
      };

      evt = document.createEvent("CustomEvent");
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
  };

  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent; // expose definition to window
}
},{}],2:[function(require,module,exports){
/*! (C) WebReflection Mit Style License */
(function(e,t,n,r){"use strict";function rt(e,t){for(var n=0,r=e.length;n<r;n++)dt(e[n],t)}function it(e){for(var t=0,n=e.length,r;t<n;t++)r=e[t],nt(r,b[ot(r)])}function st(e){return function(t){j(t)&&(dt(t,e),rt(t.querySelectorAll(w),e))}}function ot(e){var t=e.getAttribute("is"),n=e.nodeName.toUpperCase(),r=S.call(y,t?v+t.toUpperCase():d+n);return t&&-1<r&&!ut(n,t)?-1:r}function ut(e,t){return-1<w.indexOf(e+'[is="'+t+'"]')}function at(e){var t=e.currentTarget,n=e.attrChange,r=e.prevValue,i=e.newValue;Q&&t.attributeChangedCallback&&e.attrName!=="style"&&t.attributeChangedCallback(e.attrName,n===e[a]?null:r,n===e[l]?null:i)}function ft(e){var t=st(e);return function(e){X.push(t,e.target)}}function lt(e){K&&(K=!1,e.currentTarget.removeEventListener(h,lt)),rt((e.target||t).querySelectorAll(w),e.detail===o?o:s),B&&pt()}function ct(e,t){var n=this;q.call(n,e,t),G.call(n,{target:n})}function ht(e,t){D(e,t),et?et.observe(e,z):(J&&(e.setAttribute=ct,e[i]=Z(e),e.addEventListener(p,G)),e.addEventListener(c,at)),e.createdCallback&&Q&&(e.created=!0,e.createdCallback(),e.created=!1)}function pt(){for(var e,t=0,n=F.length;t<n;t++)e=F[t],E.contains(e)||(F.splice(t,1),dt(e,o))}function dt(e,t){var n,r=ot(e);-1<r&&(tt(e,b[r]),r=0,t===s&&!e[s]?(e[o]=!1,e[s]=!0,r=1,B&&S.call(F,e)<0&&F.push(e)):t===o&&!e[o]&&(e[s]=!1,e[o]=!0,r=1),r&&(n=e[t+"Callback"])&&n.call(e))}if(r in t)return;var i="__"+r+(Math.random()*1e5>>0),s="attached",o="detached",u="extends",a="ADDITION",f="MODIFICATION",l="REMOVAL",c="DOMAttrModified",h="DOMContentLoaded",p="DOMSubtreeModified",d="<",v="=",m=/^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,g=["ANNOTATION-XML","COLOR-PROFILE","FONT-FACE","FONT-FACE-SRC","FONT-FACE-URI","FONT-FACE-FORMAT","FONT-FACE-NAME","MISSING-GLYPH"],y=[],b=[],w="",E=t.documentElement,S=y.indexOf||function(e){for(var t=this.length;t--&&this[t]!==e;);return t},x=n.prototype,T=x.hasOwnProperty,N=x.isPrototypeOf,C=n.defineProperty,k=n.getOwnPropertyDescriptor,L=n.getOwnPropertyNames,A=n.getPrototypeOf,O=n.setPrototypeOf,M=!!n.__proto__,_=n.create||function vt(e){return e?(vt.prototype=e,new vt):this},D=O||(M?function(e,t){return e.__proto__=t,e}:L&&k?function(){function e(e,t){for(var n,r=L(t),i=0,s=r.length;i<s;i++)n=r[i],T.call(e,n)||C(e,n,k(t,n))}return function(t,n){do e(t,n);while((n=A(n))&&!N.call(n,t));return t}}():function(e,t){for(var n in t)e[n]=t[n];return e}),P=e.MutationObserver||e.WebKitMutationObserver,H=(e.HTMLElement||e.Element||e.Node).prototype,B=!N.call(H,E),j=B?function(e){return e.nodeType===1}:function(e){return N.call(H,e)},F=B&&[],I=H.cloneNode,q=H.setAttribute,R=H.removeAttribute,U=t.createElement,z=P&&{attributes:!0,characterData:!0,attributeOldValue:!0},W=P||function(e){J=!1,E.removeEventListener(c,W)},X,V=e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||e.msRequestAnimationFrame||function(e){setTimeout(e,10)},$=!1,J=!0,K=!0,Q=!0,G,Y,Z,et,tt,nt;O||M?(tt=function(e,t){N.call(t,e)||ht(e,t)},nt=ht):(tt=function(e,t){e[i]||(e[i]=n(!0),ht(e,t))},nt=tt),B?(J=!1,function(){var e=k(H,"addEventListener"),t=e.value,n=function(e){var t=new CustomEvent(c,{bubbles:!0});t.attrName=e,t.prevValue=this.getAttribute(e),t.newValue=null,t[l]=t.attrChange=2,R.call(this,e),this.dispatchEvent(t)},r=function(e,t){var n=this.hasAttribute(e),r=n&&this.getAttribute(e),i=new CustomEvent(c,{bubbles:!0});q.call(this,e,t),i.attrName=e,i.prevValue=n?r:null,i.newValue=t,n?i[f]=i.attrChange=1:i[a]=i.attrChange=0,this.dispatchEvent(i)},s=function(e){var t=e.currentTarget,n=t[i],r=e.propertyName,s;n.hasOwnProperty(r)&&(n=n[r],s=new CustomEvent(c,{bubbles:!0}),s.attrName=n.name,s.prevValue=n.value||null,s.newValue=n.value=t[r]||null,s.prevValue==null?s[a]=s.attrChange=0:s[f]=s.attrChange=1,t.dispatchEvent(s))};e.value=function(e,o,u){e===c&&this.attributeChangedCallback&&this.setAttribute!==r&&(this[i]={className:{name:"class",value:this.className}},this.setAttribute=r,this.removeAttribute=n,t.call(this,"propertychange",s)),t.call(this,e,o,u)},C(H,"addEventListener",e)}()):P||(E.addEventListener(c,W),E.setAttribute(i,1),E.removeAttribute(i),J&&(G=function(e){var t=this,n,r,s;if(t===e.target){n=t[i],t[i]=r=Z(t);for(s in r){if(!(s in n))return Y(0,t,s,n[s],r[s],a);if(r[s]!==n[s])return Y(1,t,s,n[s],r[s],f)}for(s in n)if(!(s in r))return Y(2,t,s,n[s],r[s],l)}},Y=function(e,t,n,r,i,s){var o={attrChange:e,currentTarget:t,attrName:n,prevValue:r,newValue:i};o[s]=e,at(o)},Z=function(e){for(var t,n,r={},i=e.attributes,s=0,o=i.length;s<o;s++)t=i[s],n=t.name,n!=="setAttribute"&&(r[n]=t.value);return r})),t[r]=function(n,r){p=n.toUpperCase(),$||($=!0,P?(et=function(e,t){function n(e,t){for(var n=0,r=e.length;n<r;t(e[n++]));}return new P(function(r){for(var i,s,o=0,u=r.length;o<u;o++)i=r[o],i.type==="childList"?(n(i.addedNodes,e),n(i.removedNodes,t)):(s=i.target,Q&&s.attributeChangedCallback&&i.attributeName!=="style"&&s.attributeChangedCallback(i.attributeName,i.oldValue,s.getAttribute(i.attributeName)))})}(st(s),st(o)),et.observe(t,{childList:!0,subtree:!0})):(X=[],V(function E(){while(X.length)X.shift().call(null,X.shift());V(E)}),t.addEventListener("DOMNodeInserted",ft(s)),t.addEventListener("DOMNodeRemoved",ft(o))),t.addEventListener(h,lt),t.addEventListener("readystatechange",lt),t.createElement=function(e,n){var r=U.apply(t,arguments),i=""+e,s=S.call(y,(n?v:d)+(n||i).toUpperCase()),o=-1<s;return n&&(r.setAttribute("is",n=n.toLowerCase()),o&&(o=ut(i.toUpperCase(),n))),Q=!t.createElement.innerHTMLHelper,o&&nt(r,b[s]),r},H.cloneNode=function(e){var t=I.call(this,!!e),n=ot(t);return-1<n&&nt(t,b[n]),e&&it(t.querySelectorAll(w)),t});if(-2<S.call(y,v+p)+S.call(y,d+p))throw new Error("A "+n+" type is already registered");if(!m.test(p)||-1<S.call(g,p))throw new Error("The type "+n+" is invalid");var i=function(){return f?t.createElement(l,p):t.createElement(l)},a=r||x,f=T.call(a,u),l=f?r[u].toUpperCase():p,c=y.push((f?v:d)+p)-1,p;return w=w.concat(w.length?",":"",f?l+'[is="'+n.toLowerCase()+'"]':l),i.prototype=b[c]=T.call(a,"prototype")?a.prototype:_(H),rt(t.querySelectorAll(w),s),i}})(window,document,Object,"registerElement");
},{}],3:[function(require,module,exports){
/*global define:false */
/**
 * Copyright 2015 Craig Campbell
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Mousetrap is a simple keyboard shortcut library for Javascript with
 * no external dependencies
 *
 * @version 1.5.3
 * @url craig.is/killing/mice
 */
(function(window, document, undefined) {

    /**
     * mapping of special keycodes to their corresponding keys
     *
     * everything in this dictionary cannot use keypress events
     * so it has to be here to map to the correct keycodes for
     * keyup/keydown events
     *
     * @type {Object}
     */
    var _MAP = {
        8: 'backspace',
        9: 'tab',
        13: 'enter',
        16: 'shift',
        17: 'ctrl',
        18: 'alt',
        20: 'capslock',
        27: 'esc',
        32: 'space',
        33: 'pageup',
        34: 'pagedown',
        35: 'end',
        36: 'home',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        45: 'ins',
        46: 'del',
        91: 'meta',
        93: 'meta',
        224: 'meta'
    };

    /**
     * mapping for special characters so they can support
     *
     * this dictionary is only used incase you want to bind a
     * keyup or keydown event to one of these keys
     *
     * @type {Object}
     */
    var _KEYCODE_MAP = {
        106: '*',
        107: '+',
        109: '-',
        110: '.',
        111 : '/',
        186: ';',
        187: '=',
        188: ',',
        189: '-',
        190: '.',
        191: '/',
        192: '`',
        219: '[',
        220: '\\',
        221: ']',
        222: '\''
    };

    /**
     * this is a mapping of keys that require shift on a US keypad
     * back to the non shift equivelents
     *
     * this is so you can use keyup events with these keys
     *
     * note that this will only work reliably on US keyboards
     *
     * @type {Object}
     */
    var _SHIFT_MAP = {
        '~': '`',
        '!': '1',
        '@': '2',
        '#': '3',
        '$': '4',
        '%': '5',
        '^': '6',
        '&': '7',
        '*': '8',
        '(': '9',
        ')': '0',
        '_': '-',
        '+': '=',
        ':': ';',
        '\"': '\'',
        '<': ',',
        '>': '.',
        '?': '/',
        '|': '\\'
    };

    /**
     * this is a list of special strings you can use to map
     * to modifier keys when you specify your keyboard shortcuts
     *
     * @type {Object}
     */
    var _SPECIAL_ALIASES = {
        'option': 'alt',
        'command': 'meta',
        'return': 'enter',
        'escape': 'esc',
        'plus': '+',
        'mod': /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? 'meta' : 'ctrl'
    };

    /**
     * variable to store the flipped version of _MAP from above
     * needed to check if we should use keypress or not when no action
     * is specified
     *
     * @type {Object|undefined}
     */
    var _REVERSE_MAP;

    /**
     * loop through the f keys, f1 to f19 and add them to the map
     * programatically
     */
    for (var i = 1; i < 20; ++i) {
        _MAP[111 + i] = 'f' + i;
    }

    /**
     * loop through to map numbers on the numeric keypad
     */
    for (i = 0; i <= 9; ++i) {
        _MAP[i + 96] = i;
    }

    /**
     * cross browser add event method
     *
     * @param {Element|HTMLDocument} object
     * @param {string} type
     * @param {Function} callback
     * @returns void
     */
    function _addEvent(object, type, callback) {
        if (object.addEventListener) {
            object.addEventListener(type, callback, false);
            return;
        }

        object.attachEvent('on' + type, callback);
    }

    /**
     * takes the event and returns the key character
     *
     * @param {Event} e
     * @return {string}
     */
    function _characterFromEvent(e) {

        // for keypress events we should return the character as is
        if (e.type == 'keypress') {
            var character = String.fromCharCode(e.which);

            // if the shift key is not pressed then it is safe to assume
            // that we want the character to be lowercase.  this means if
            // you accidentally have caps lock on then your key bindings
            // will continue to work
            //
            // the only side effect that might not be desired is if you
            // bind something like 'A' cause you want to trigger an
            // event when capital A is pressed caps lock will no longer
            // trigger the event.  shift+a will though.
            if (!e.shiftKey) {
                character = character.toLowerCase();
            }

            return character;
        }

        // for non keypress events the special maps are needed
        if (_MAP[e.which]) {
            return _MAP[e.which];
        }

        if (_KEYCODE_MAP[e.which]) {
            return _KEYCODE_MAP[e.which];
        }

        // if it is not in the special map

        // with keydown and keyup events the character seems to always
        // come in as an uppercase character whether you are pressing shift
        // or not.  we should make sure it is always lowercase for comparisons
        return String.fromCharCode(e.which).toLowerCase();
    }

    /**
     * checks if two arrays are equal
     *
     * @param {Array} modifiers1
     * @param {Array} modifiers2
     * @returns {boolean}
     */
    function _modifiersMatch(modifiers1, modifiers2) {
        return modifiers1.sort().join(',') === modifiers2.sort().join(',');
    }

    /**
     * takes a key event and figures out what the modifiers are
     *
     * @param {Event} e
     * @returns {Array}
     */
    function _eventModifiers(e) {
        var modifiers = [];

        if (e.shiftKey) {
            modifiers.push('shift');
        }

        if (e.altKey) {
            modifiers.push('alt');
        }

        if (e.ctrlKey) {
            modifiers.push('ctrl');
        }

        if (e.metaKey) {
            modifiers.push('meta');
        }

        return modifiers;
    }

    /**
     * prevents default for this event
     *
     * @param {Event} e
     * @returns void
     */
    function _preventDefault(e) {
        if (e.preventDefault) {
            e.preventDefault();
            return;
        }

        e.returnValue = false;
    }

    /**
     * stops propogation for this event
     *
     * @param {Event} e
     * @returns void
     */
    function _stopPropagation(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
            return;
        }

        e.cancelBubble = true;
    }

    /**
     * determines if the keycode specified is a modifier key or not
     *
     * @param {string} key
     * @returns {boolean}
     */
    function _isModifier(key) {
        return key == 'shift' || key == 'ctrl' || key == 'alt' || key == 'meta';
    }

    /**
     * reverses the map lookup so that we can look for specific keys
     * to see what can and can't use keypress
     *
     * @return {Object}
     */
    function _getReverseMap() {
        if (!_REVERSE_MAP) {
            _REVERSE_MAP = {};
            for (var key in _MAP) {

                // pull out the numeric keypad from here cause keypress should
                // be able to detect the keys from the character
                if (key > 95 && key < 112) {
                    continue;
                }

                if (_MAP.hasOwnProperty(key)) {
                    _REVERSE_MAP[_MAP[key]] = key;
                }
            }
        }
        return _REVERSE_MAP;
    }

    /**
     * picks the best action based on the key combination
     *
     * @param {string} key - character for key
     * @param {Array} modifiers
     * @param {string=} action passed in
     */
    function _pickBestAction(key, modifiers, action) {

        // if no action was picked in we should try to pick the one
        // that we think would work best for this key
        if (!action) {
            action = _getReverseMap()[key] ? 'keydown' : 'keypress';
        }

        // modifier keys don't work as expected with keypress,
        // switch to keydown
        if (action == 'keypress' && modifiers.length) {
            action = 'keydown';
        }

        return action;
    }

    /**
     * Converts from a string key combination to an array
     *
     * @param  {string} combination like "command+shift+l"
     * @return {Array}
     */
    function _keysFromString(combination) {
        if (combination === '+') {
            return ['+'];
        }

        combination = combination.replace(/\+{2}/g, '+plus');
        return combination.split('+');
    }

    /**
     * Gets info for a specific key combination
     *
     * @param  {string} combination key combination ("command+s" or "a" or "*")
     * @param  {string=} action
     * @returns {Object}
     */
    function _getKeyInfo(combination, action) {
        var keys;
        var key;
        var i;
        var modifiers = [];

        // take the keys from this pattern and figure out what the actual
        // pattern is all about
        keys = _keysFromString(combination);

        for (i = 0; i < keys.length; ++i) {
            key = keys[i];

            // normalize key names
            if (_SPECIAL_ALIASES[key]) {
                key = _SPECIAL_ALIASES[key];
            }

            // if this is not a keypress event then we should
            // be smart about using shift keys
            // this will only work for US keyboards however
            if (action && action != 'keypress' && _SHIFT_MAP[key]) {
                key = _SHIFT_MAP[key];
                modifiers.push('shift');
            }

            // if this key is a modifier then add it to the list of modifiers
            if (_isModifier(key)) {
                modifiers.push(key);
            }
        }

        // depending on what the key combination is
        // we will try to pick the best event for it
        action = _pickBestAction(key, modifiers, action);

        return {
            key: key,
            modifiers: modifiers,
            action: action
        };
    }

    function _belongsTo(element, ancestor) {
        if (element === null || element === document) {
            return false;
        }

        if (element === ancestor) {
            return true;
        }

        return _belongsTo(element.parentNode, ancestor);
    }

    function Mousetrap(targetElement) {
        var self = this;

        targetElement = targetElement || document;

        if (!(self instanceof Mousetrap)) {
            return new Mousetrap(targetElement);
        }

        /**
         * element to attach key events to
         *
         * @type {Element}
         */
        self.target = targetElement;

        /**
         * a list of all the callbacks setup via Mousetrap.bind()
         *
         * @type {Object}
         */
        self._callbacks = {};

        /**
         * direct map of string combinations to callbacks used for trigger()
         *
         * @type {Object}
         */
        self._directMap = {};

        /**
         * keeps track of what level each sequence is at since multiple
         * sequences can start out with the same sequence
         *
         * @type {Object}
         */
        var _sequenceLevels = {};

        /**
         * variable to store the setTimeout call
         *
         * @type {null|number}
         */
        var _resetTimer;

        /**
         * temporary state where we will ignore the next keyup
         *
         * @type {boolean|string}
         */
        var _ignoreNextKeyup = false;

        /**
         * temporary state where we will ignore the next keypress
         *
         * @type {boolean}
         */
        var _ignoreNextKeypress = false;

        /**
         * are we currently inside of a sequence?
         * type of action ("keyup" or "keydown" or "keypress") or false
         *
         * @type {boolean|string}
         */
        var _nextExpectedAction = false;

        /**
         * resets all sequence counters except for the ones passed in
         *
         * @param {Object} doNotReset
         * @returns void
         */
        function _resetSequences(doNotReset) {
            doNotReset = doNotReset || {};

            var activeSequences = false,
                key;

            for (key in _sequenceLevels) {
                if (doNotReset[key]) {
                    activeSequences = true;
                    continue;
                }
                _sequenceLevels[key] = 0;
            }

            if (!activeSequences) {
                _nextExpectedAction = false;
            }
        }

        /**
         * finds all callbacks that match based on the keycode, modifiers,
         * and action
         *
         * @param {string} character
         * @param {Array} modifiers
         * @param {Event|Object} e
         * @param {string=} sequenceName - name of the sequence we are looking for
         * @param {string=} combination
         * @param {number=} level
         * @returns {Array}
         */
        function _getMatches(character, modifiers, e, sequenceName, combination, level) {
            var i;
            var callback;
            var matches = [];
            var action = e.type;

            // if there are no events related to this keycode
            if (!self._callbacks[character]) {
                return [];
            }

            // if a modifier key is coming up on its own we should allow it
            if (action == 'keyup' && _isModifier(character)) {
                modifiers = [character];
            }

            // loop through all callbacks for the key that was pressed
            // and see if any of them match
            for (i = 0; i < self._callbacks[character].length; ++i) {
                callback = self._callbacks[character][i];

                // if a sequence name is not specified, but this is a sequence at
                // the wrong level then move onto the next match
                if (!sequenceName && callback.seq && _sequenceLevels[callback.seq] != callback.level) {
                    continue;
                }

                // if the action we are looking for doesn't match the action we got
                // then we should keep going
                if (action != callback.action) {
                    continue;
                }

                // if this is a keypress event and the meta key and control key
                // are not pressed that means that we need to only look at the
                // character, otherwise check the modifiers as well
                //
                // chrome will not fire a keypress if meta or control is down
                // safari will fire a keypress if meta or meta+shift is down
                // firefox will fire a keypress if meta or control is down
                if ((action == 'keypress' && !e.metaKey && !e.ctrlKey) || _modifiersMatch(modifiers, callback.modifiers)) {

                    // when you bind a combination or sequence a second time it
                    // should overwrite the first one.  if a sequenceName or
                    // combination is specified in this call it does just that
                    //
                    // @todo make deleting its own method?
                    var deleteCombo = !sequenceName && callback.combo == combination;
                    var deleteSequence = sequenceName && callback.seq == sequenceName && callback.level == level;
                    if (deleteCombo || deleteSequence) {
                        self._callbacks[character].splice(i, 1);
                    }

                    matches.push(callback);
                }
            }

            return matches;
        }

        /**
         * actually calls the callback function
         *
         * if your callback function returns false this will use the jquery
         * convention - prevent default and stop propogation on the event
         *
         * @param {Function} callback
         * @param {Event} e
         * @returns void
         */
        function _fireCallback(callback, e, combo, sequence) {

            // if this event should not happen stop here
            if (self.stopCallback(e, e.target || e.srcElement, combo, sequence)) {
                return;
            }

            if (callback(e, combo) === false) {
                _preventDefault(e);
                _stopPropagation(e);
            }
        }

        /**
         * handles a character key event
         *
         * @param {string} character
         * @param {Array} modifiers
         * @param {Event} e
         * @returns void
         */
        self._handleKey = function(character, modifiers, e) {
            var callbacks = _getMatches(character, modifiers, e);
            var i;
            var doNotReset = {};
            var maxLevel = 0;
            var processedSequenceCallback = false;

            // Calculate the maxLevel for sequences so we can only execute the longest callback sequence
            for (i = 0; i < callbacks.length; ++i) {
                if (callbacks[i].seq) {
                    maxLevel = Math.max(maxLevel, callbacks[i].level);
                }
            }

            // loop through matching callbacks for this key event
            for (i = 0; i < callbacks.length; ++i) {

                // fire for all sequence callbacks
                // this is because if for example you have multiple sequences
                // bound such as "g i" and "g t" they both need to fire the
                // callback for matching g cause otherwise you can only ever
                // match the first one
                if (callbacks[i].seq) {

                    // only fire callbacks for the maxLevel to prevent
                    // subsequences from also firing
                    //
                    // for example 'a option b' should not cause 'option b' to fire
                    // even though 'option b' is part of the other sequence
                    //
                    // any sequences that do not match here will be discarded
                    // below by the _resetSequences call
                    if (callbacks[i].level != maxLevel) {
                        continue;
                    }

                    processedSequenceCallback = true;

                    // keep a list of which sequences were matches for later
                    doNotReset[callbacks[i].seq] = 1;
                    _fireCallback(callbacks[i].callback, e, callbacks[i].combo, callbacks[i].seq);
                    continue;
                }

                // if there were no sequence matches but we are still here
                // that means this is a regular match so we should fire that
                if (!processedSequenceCallback) {
                    _fireCallback(callbacks[i].callback, e, callbacks[i].combo);
                }
            }

            // if the key you pressed matches the type of sequence without
            // being a modifier (ie "keyup" or "keypress") then we should
            // reset all sequences that were not matched by this event
            //
            // this is so, for example, if you have the sequence "h a t" and you
            // type "h e a r t" it does not match.  in this case the "e" will
            // cause the sequence to reset
            //
            // modifier keys are ignored because you can have a sequence
            // that contains modifiers such as "enter ctrl+space" and in most
            // cases the modifier key will be pressed before the next key
            //
            // also if you have a sequence such as "ctrl+b a" then pressing the
            // "b" key will trigger a "keypress" and a "keydown"
            //
            // the "keydown" is expected when there is a modifier, but the
            // "keypress" ends up matching the _nextExpectedAction since it occurs
            // after and that causes the sequence to reset
            //
            // we ignore keypresses in a sequence that directly follow a keydown
            // for the same character
            var ignoreThisKeypress = e.type == 'keypress' && _ignoreNextKeypress;
            if (e.type == _nextExpectedAction && !_isModifier(character) && !ignoreThisKeypress) {
                _resetSequences(doNotReset);
            }

            _ignoreNextKeypress = processedSequenceCallback && e.type == 'keydown';
        };

        /**
         * handles a keydown event
         *
         * @param {Event} e
         * @returns void
         */
        function _handleKeyEvent(e) {

            // normalize e.which for key events
            // @see http://stackoverflow.com/questions/4285627/javascript-keycode-vs-charcode-utter-confusion
            if (typeof e.which !== 'number') {
                e.which = e.keyCode;
            }

            var character = _characterFromEvent(e);

            // no character found then stop
            if (!character) {
                return;
            }

            // need to use === for the character check because the character can be 0
            if (e.type == 'keyup' && _ignoreNextKeyup === character) {
                _ignoreNextKeyup = false;
                return;
            }

            self.handleKey(character, _eventModifiers(e), e);
        }

        /**
         * called to set a 1 second timeout on the specified sequence
         *
         * this is so after each key press in the sequence you have 1 second
         * to press the next key before you have to start over
         *
         * @returns void
         */
        function _resetSequenceTimer() {
            clearTimeout(_resetTimer);
            _resetTimer = setTimeout(_resetSequences, 1000);
        }

        /**
         * binds a key sequence to an event
         *
         * @param {string} combo - combo specified in bind call
         * @param {Array} keys
         * @param {Function} callback
         * @param {string=} action
         * @returns void
         */
        function _bindSequence(combo, keys, callback, action) {

            // start off by adding a sequence level record for this combination
            // and setting the level to 0
            _sequenceLevels[combo] = 0;

            /**
             * callback to increase the sequence level for this sequence and reset
             * all other sequences that were active
             *
             * @param {string} nextAction
             * @returns {Function}
             */
            function _increaseSequence(nextAction) {
                return function() {
                    _nextExpectedAction = nextAction;
                    ++_sequenceLevels[combo];
                    _resetSequenceTimer();
                };
            }

            /**
             * wraps the specified callback inside of another function in order
             * to reset all sequence counters as soon as this sequence is done
             *
             * @param {Event} e
             * @returns void
             */
            function _callbackAndReset(e) {
                _fireCallback(callback, e, combo);

                // we should ignore the next key up if the action is key down
                // or keypress.  this is so if you finish a sequence and
                // release the key the final key will not trigger a keyup
                if (action !== 'keyup') {
                    _ignoreNextKeyup = _characterFromEvent(e);
                }

                // weird race condition if a sequence ends with the key
                // another sequence begins with
                setTimeout(_resetSequences, 10);
            }

            // loop through keys one at a time and bind the appropriate callback
            // function.  for any key leading up to the final one it should
            // increase the sequence. after the final, it should reset all sequences
            //
            // if an action is specified in the original bind call then that will
            // be used throughout.  otherwise we will pass the action that the
            // next key in the sequence should match.  this allows a sequence
            // to mix and match keypress and keydown events depending on which
            // ones are better suited to the key provided
            for (var i = 0; i < keys.length; ++i) {
                var isFinal = i + 1 === keys.length;
                var wrappedCallback = isFinal ? _callbackAndReset : _increaseSequence(action || _getKeyInfo(keys[i + 1]).action);
                _bindSingle(keys[i], wrappedCallback, action, combo, i);
            }
        }

        /**
         * binds a single keyboard combination
         *
         * @param {string} combination
         * @param {Function} callback
         * @param {string=} action
         * @param {string=} sequenceName - name of sequence if part of sequence
         * @param {number=} level - what part of the sequence the command is
         * @returns void
         */
        function _bindSingle(combination, callback, action, sequenceName, level) {

            // store a direct mapped reference for use with Mousetrap.trigger
            self._directMap[combination + ':' + action] = callback;

            // make sure multiple spaces in a row become a single space
            combination = combination.replace(/\s+/g, ' ');

            var sequence = combination.split(' ');
            var info;

            // if this pattern is a sequence of keys then run through this method
            // to reprocess each pattern one key at a time
            if (sequence.length > 1) {
                _bindSequence(combination, sequence, callback, action);
                return;
            }

            info = _getKeyInfo(combination, action);

            // make sure to initialize array if this is the first time
            // a callback is added for this key
            self._callbacks[info.key] = self._callbacks[info.key] || [];

            // remove an existing match if there is one
            _getMatches(info.key, info.modifiers, {type: info.action}, sequenceName, combination, level);

            // add this call back to the array
            // if it is a sequence put it at the beginning
            // if not put it at the end
            //
            // this is important because the way these are processed expects
            // the sequence ones to come first
            self._callbacks[info.key][sequenceName ? 'unshift' : 'push']({
                callback: callback,
                modifiers: info.modifiers,
                action: info.action,
                seq: sequenceName,
                level: level,
                combo: combination
            });
        }

        /**
         * binds multiple combinations to the same callback
         *
         * @param {Array} combinations
         * @param {Function} callback
         * @param {string|undefined} action
         * @returns void
         */
        self._bindMultiple = function(combinations, callback, action) {
            for (var i = 0; i < combinations.length; ++i) {
                _bindSingle(combinations[i], callback, action);
            }
        };

        // start!
        _addEvent(targetElement, 'keypress', _handleKeyEvent);
        _addEvent(targetElement, 'keydown', _handleKeyEvent);
        _addEvent(targetElement, 'keyup', _handleKeyEvent);
    }

    /**
     * binds an event to mousetrap
     *
     * can be a single key, a combination of keys separated with +,
     * an array of keys, or a sequence of keys separated by spaces
     *
     * be sure to list the modifier keys first to make sure that the
     * correct key ends up getting bound (the last key in the pattern)
     *
     * @param {string|Array} keys
     * @param {Function} callback
     * @param {string=} action - 'keypress', 'keydown', or 'keyup'
     * @returns void
     */
    Mousetrap.prototype.bind = function(keys, callback, action) {
        var self = this;
        keys = keys instanceof Array ? keys : [keys];
        self._bindMultiple.call(self, keys, callback, action);
        return self;
    };

    /**
     * unbinds an event to mousetrap
     *
     * the unbinding sets the callback function of the specified key combo
     * to an empty function and deletes the corresponding key in the
     * _directMap dict.
     *
     * TODO: actually remove this from the _callbacks dictionary instead
     * of binding an empty function
     *
     * the keycombo+action has to be exactly the same as
     * it was defined in the bind method
     *
     * @param {string|Array} keys
     * @param {string} action
     * @returns void
     */
    Mousetrap.prototype.unbind = function(keys, action) {
        var self = this;
        return self.bind.call(self, keys, function() {}, action);
    };

    /**
     * triggers an event that has already been bound
     *
     * @param {string} keys
     * @param {string=} action
     * @returns void
     */
    Mousetrap.prototype.trigger = function(keys, action) {
        var self = this;
        if (self._directMap[keys + ':' + action]) {
            self._directMap[keys + ':' + action]({}, keys);
        }
        return self;
    };

    /**
     * resets the library back to its initial state.  this is useful
     * if you want to clear out the current keyboard shortcuts and bind
     * new ones - for example if you switch to another page
     *
     * @returns void
     */
    Mousetrap.prototype.reset = function() {
        var self = this;
        self._callbacks = {};
        self._directMap = {};
        return self;
    };

    /**
     * should we stop this event before firing off callbacks
     *
     * @param {Event} e
     * @param {Element} element
     * @return {boolean}
     */
    Mousetrap.prototype.stopCallback = function(e, element) {
        var self = this;

        // if the element has the class "mousetrap" then no need to stop
        if ((' ' + element.className + ' ').indexOf(' mousetrap ') > -1) {
            return false;
        }

        if (_belongsTo(element, self.target)) {
            return false;
        }

        // stop for input, select, and textarea
        return element.tagName == 'INPUT' || element.tagName == 'SELECT' || element.tagName == 'TEXTAREA' || element.isContentEditable;
    };

    /**
     * exposes _handleKey publicly so it can be overwritten by extensions
     */
    Mousetrap.prototype.handleKey = function() {
        var self = this;
        return self._handleKey.apply(self, arguments);
    };

    /**
     * Init the global mousetrap functions
     *
     * This method is needed to allow the global mousetrap functions to work
     * now that mousetrap is a constructor function.
     */
    Mousetrap.init = function() {
        var documentMousetrap = Mousetrap(document);
        for (var method in documentMousetrap) {
            if (method.charAt(0) !== '_') {
                Mousetrap[method] = (function(method) {
                    return function() {
                        return documentMousetrap[method].apply(documentMousetrap, arguments);
                    };
                } (method));
            }
        }
    };

    Mousetrap.init();

    // expose mousetrap to the global object
    window.Mousetrap = Mousetrap;

    // expose as a common js module
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Mousetrap;
    }

    // expose mousetrap as an AMD module
    if (typeof define === 'function' && define.amd) {
        define(function() {
            return Mousetrap;
        });
    }
}) (window, document);

},{}],4:[function(require,module,exports){
var MutationObserver = window.MutationObserver
  || window.WebKitMutationObserver
  || window.MozMutationObserver;

/*
 * Copyright 2012 The Polymer Authors. All rights reserved.
 * Use of this source code is goverened by a BSD-style
 * license that can be found in the LICENSE file.
 */

var WeakMap = window.WeakMap;

if (typeof WeakMap === 'undefined') {
  var defineProperty = Object.defineProperty;
  var counter = Date.now() % 1e9;

  WeakMap = function() {
    this.name = '__st' + (Math.random() * 1e9 >>> 0) + (counter++ + '__');
  };

  WeakMap.prototype = {
    set: function(key, value) {
      var entry = key[this.name];
      if (entry && entry[0] === key)
        entry[1] = value;
      else
        defineProperty(key, this.name, {value: [key, value], writable: true});
      return this;
    },
    get: function(key) {
      var entry;
      return (entry = key[this.name]) && entry[0] === key ?
          entry[1] : undefined;
    },
    'delete': function(key) {
      var entry = key[this.name];
      if (!entry) return false;
      var hasValue = entry[0] === key;
      entry[0] = entry[1] = undefined;
      return hasValue;
    },
    has: function(key) {
      var entry = key[this.name];
      if (!entry) return false;
      return entry[0] === key;
    }
  };
}

var registrationsTable = new WeakMap();

// We use setImmediate or postMessage for our future callback.
var setImmediate = window.msSetImmediate;

// Use post message to emulate setImmediate.
if (!setImmediate) {
  var setImmediateQueue = [];
  var sentinel = String(Math.random());
  window.addEventListener('message', function(e) {
    if (e.data === sentinel) {
      var queue = setImmediateQueue;
      setImmediateQueue = [];
      queue.forEach(function(func) {
        func();
      });
    }
  });
  setImmediate = function(func) {
    setImmediateQueue.push(func);
    window.postMessage(sentinel, '*');
  };
}

// This is used to ensure that we never schedule 2 callas to setImmediate
var isScheduled = false;

// Keep track of observers that needs to be notified next time.
var scheduledObservers = [];

/**
 * Schedules |dispatchCallback| to be called in the future.
 * @param {MutationObserver} observer
 */
function scheduleCallback(observer) {
  scheduledObservers.push(observer);
  if (!isScheduled) {
    isScheduled = true;
    setImmediate(dispatchCallbacks);
  }
}

function wrapIfNeeded(node) {
  return window.ShadowDOMPolyfill &&
      window.ShadowDOMPolyfill.wrapIfNeeded(node) ||
      node;
}

function dispatchCallbacks() {
  // http://dom.spec.whatwg.org/#mutation-observers

  isScheduled = false; // Used to allow a new setImmediate call above.

  var observers = scheduledObservers;
  scheduledObservers = [];
  // Sort observers based on their creation UID (incremental).
  observers.sort(function(o1, o2) {
    return o1.uid_ - o2.uid_;
  });

  var anyNonEmpty = false;
  observers.forEach(function(observer) {

    // 2.1, 2.2
    var queue = observer.takeRecords();
    // 2.3. Remove all transient registered observers whose observer is mo.
    removeTransientObserversFor(observer);

    // 2.4
    if (queue.length) {
      observer.callback_(queue, observer);
      anyNonEmpty = true;
    }
  });

  // 3.
  if (anyNonEmpty)
    dispatchCallbacks();
}

function removeTransientObserversFor(observer) {
  observer.nodes_.forEach(function(node) {
    var registrations = registrationsTable.get(node);
    if (!registrations)
      return;
    registrations.forEach(function(registration) {
      if (registration.observer === observer)
        registration.removeTransientObservers();
    });
  });
}

/**
 * This function is used for the "For each registered observer observer (with
 * observer's options as options) in target's list of registered observers,
 * run these substeps:" and the "For each ancestor ancestor of target, and for
 * each registered observer observer (with options options) in ancestor's list
 * of registered observers, run these substeps:" part of the algorithms. The
 * |options.subtree| is checked to ensure that the callback is called
 * correctly.
 *
 * @param {Node} target
 * @param {function(MutationObserverInit):MutationRecord} callback
 */
function forEachAncestorAndObserverEnqueueRecord(target, callback) {
  for (var node = target; node; node = node.parentNode) {
    var registrations = registrationsTable.get(node);

    if (registrations) {
      for (var j = 0; j < registrations.length; j++) {
        var registration = registrations[j];
        var options = registration.options;

        // Only target ignores subtree.
        if (node !== target && !options.subtree)
          continue;

        var record = callback(options);
        if (record)
          registration.enqueue(record);
      }
    }
  }
}

var uidCounter = 0;

/**
 * The class that maps to the DOM MutationObserver interface.
 * @param {Function} callback.
 * @constructor
 */
function JsMutationObserver(callback) {
  this.callback_ = callback;
  this.nodes_ = [];
  this.records_ = [];
  this.uid_ = ++uidCounter;
}

JsMutationObserver.prototype = {
  observe: function(target, options) {
    target = wrapIfNeeded(target);

    // 1.1
    if (!options.childList && !options.attributes && !options.characterData ||

        // 1.2
        options.attributeOldValue && !options.attributes ||

        // 1.3
        options.attributeFilter && options.attributeFilter.length &&
            !options.attributes ||

        // 1.4
        options.characterDataOldValue && !options.characterData) {

      throw new SyntaxError();
    }

    var registrations = registrationsTable.get(target);
    if (!registrations)
      registrationsTable.set(target, registrations = []);

    // 2
    // If target's list of registered observers already includes a registered
    // observer associated with the context object, replace that registered
    // observer's options with options.
    var registration;
    for (var i = 0; i < registrations.length; i++) {
      if (registrations[i].observer === this) {
        registration = registrations[i];
        registration.removeListeners();
        registration.options = options;
        break;
      }
    }

    // 3.
    // Otherwise, add a new registered observer to target's list of registered
    // observers with the context object as the observer and options as the
    // options, and add target to context object's list of nodes on which it
    // is registered.
    if (!registration) {
      registration = new Registration(this, target, options);
      registrations.push(registration);
      this.nodes_.push(target);
    }

    registration.addListeners();
  },

  disconnect: function() {
    this.nodes_.forEach(function(node) {
      var registrations = registrationsTable.get(node);
      for (var i = 0; i < registrations.length; i++) {
        var registration = registrations[i];
        if (registration.observer === this) {
          registration.removeListeners();
          registrations.splice(i, 1);
          // Each node can only have one registered observer associated with
          // this observer.
          break;
        }
      }
    }, this);
    this.records_ = [];
  },

  takeRecords: function() {
    var copyOfRecords = this.records_;
    this.records_ = [];
    return copyOfRecords;
  }
};

/**
 * @param {string} type
 * @param {Node} target
 * @constructor
 */
function MutationRecord(type, target) {
  this.type = type;
  this.target = target;
  this.addedNodes = [];
  this.removedNodes = [];
  this.previousSibling = null;
  this.nextSibling = null;
  this.attributeName = null;
  this.attributeNamespace = null;
  this.oldValue = null;
}

function copyMutationRecord(original) {
  var record = new MutationRecord(original.type, original.target);
  record.addedNodes = original.addedNodes.slice();
  record.removedNodes = original.removedNodes.slice();
  record.previousSibling = original.previousSibling;
  record.nextSibling = original.nextSibling;
  record.attributeName = original.attributeName;
  record.attributeNamespace = original.attributeNamespace;
  record.oldValue = original.oldValue;
  return record;
};

// We keep track of the two (possibly one) records used in a single mutation.
var currentRecord, recordWithOldValue;

/**
 * Creates a record without |oldValue| and caches it as |currentRecord| for
 * later use.
 * @param {string} oldValue
 * @return {MutationRecord}
 */
function getRecord(type, target) {
  return currentRecord = new MutationRecord(type, target);
}

/**
 * Gets or creates a record with |oldValue| based in the |currentRecord|
 * @param {string} oldValue
 * @return {MutationRecord}
 */
function getRecordWithOldValue(oldValue) {
  if (recordWithOldValue)
    return recordWithOldValue;
  recordWithOldValue = copyMutationRecord(currentRecord);
  recordWithOldValue.oldValue = oldValue;
  return recordWithOldValue;
}

function clearRecords() {
  currentRecord = recordWithOldValue = undefined;
}

/**
 * @param {MutationRecord} record
 * @return {boolean} Whether the record represents a record from the current
 * mutation event.
 */
function recordRepresentsCurrentMutation(record) {
  return record === recordWithOldValue || record === currentRecord;
}

/**
 * Selects which record, if any, to replace the last record in the queue.
 * This returns |null| if no record should be replaced.
 *
 * @param {MutationRecord} lastRecord
 * @param {MutationRecord} newRecord
 * @param {MutationRecord}
 */
function selectRecord(lastRecord, newRecord) {
  if (lastRecord === newRecord)
    return lastRecord;

  // Check if the the record we are adding represents the same record. If
  // so, we keep the one with the oldValue in it.
  if (recordWithOldValue && recordRepresentsCurrentMutation(lastRecord))
    return recordWithOldValue;

  return null;
}

/**
 * Class used to represent a registered observer.
 * @param {MutationObserver} observer
 * @param {Node} target
 * @param {MutationObserverInit} options
 * @constructor
 */
function Registration(observer, target, options) {
  this.observer = observer;
  this.target = target;
  this.options = options;
  this.transientObservedNodes = [];
}

Registration.prototype = {
  enqueue: function(record) {
    var records = this.observer.records_;
    var length = records.length;

    // There are cases where we replace the last record with the new record.
    // For example if the record represents the same mutation we need to use
    // the one with the oldValue. If we get same record (this can happen as we
    // walk up the tree) we ignore the new record.
    if (records.length > 0) {
      var lastRecord = records[length - 1];
      var recordToReplaceLast = selectRecord(lastRecord, record);
      if (recordToReplaceLast) {
        records[length - 1] = recordToReplaceLast;
        return;
      }
    } else {
      scheduleCallback(this.observer);
    }

    records[length] = record;
  },

  addListeners: function() {
    this.addListeners_(this.target);
  },

  addListeners_: function(node) {
    var options = this.options;
    if (options.attributes)
      node.addEventListener('DOMAttrModified', this, true);

    if (options.characterData)
      node.addEventListener('DOMCharacterDataModified', this, true);

    if (options.childList)
      node.addEventListener('DOMNodeInserted', this, true);

    if (options.childList || options.subtree)
      node.addEventListener('DOMNodeRemoved', this, true);
  },

  removeListeners: function() {
    this.removeListeners_(this.target);
  },

  removeListeners_: function(node) {
    var options = this.options;
    if (options.attributes)
      node.removeEventListener('DOMAttrModified', this, true);

    if (options.characterData)
      node.removeEventListener('DOMCharacterDataModified', this, true);

    if (options.childList)
      node.removeEventListener('DOMNodeInserted', this, true);

    if (options.childList || options.subtree)
      node.removeEventListener('DOMNodeRemoved', this, true);
  },

  /**
   * Adds a transient observer on node. The transient observer gets removed
   * next time we deliver the change records.
   * @param {Node} node
   */
  addTransientObserver: function(node) {
    // Don't add transient observers on the target itself. We already have all
    // the required listeners set up on the target.
    if (node === this.target)
      return;

    this.addListeners_(node);
    this.transientObservedNodes.push(node);
    var registrations = registrationsTable.get(node);
    if (!registrations)
      registrationsTable.set(node, registrations = []);

    // We know that registrations does not contain this because we already
    // checked if node === this.target.
    registrations.push(this);
  },

  removeTransientObservers: function() {
    var transientObservedNodes = this.transientObservedNodes;
    this.transientObservedNodes = [];

    transientObservedNodes.forEach(function(node) {
      // Transient observers are never added to the target.
      this.removeListeners_(node);

      var registrations = registrationsTable.get(node);
      for (var i = 0; i < registrations.length; i++) {
        if (registrations[i] === this) {
          registrations.splice(i, 1);
          // Each node can only have one registered observer associated with
          // this observer.
          break;
        }
      }
    }, this);
  },

  handleEvent: function(e) {
    // Stop propagation since we are managing the propagation manually.
    // This means that other mutation events on the page will not work
    // correctly but that is by design.
    e.stopImmediatePropagation();

    switch (e.type) {
      case 'DOMAttrModified':
        // http://dom.spec.whatwg.org/#concept-mo-queue-attributes

        var name = e.attrName;
        var namespace = e.relatedNode.namespaceURI;
        var target = e.target;

        // 1.
        var record = new getRecord('attributes', target);
        record.attributeName = name;
        record.attributeNamespace = namespace;

        // 2.
        var oldValue =
            e.attrChange === MutationEvent.ADDITION ? null : e.prevValue;

        forEachAncestorAndObserverEnqueueRecord(target, function(options) {
          // 3.1, 4.2
          if (!options.attributes)
            return;

          // 3.2, 4.3
          if (options.attributeFilter && options.attributeFilter.length &&
              options.attributeFilter.indexOf(name) === -1 &&
              options.attributeFilter.indexOf(namespace) === -1) {
            return;
          }
          // 3.3, 4.4
          if (options.attributeOldValue)
            return getRecordWithOldValue(oldValue);

          // 3.4, 4.5
          return record;
        });

        break;

      case 'DOMCharacterDataModified':
        // http://dom.spec.whatwg.org/#concept-mo-queue-characterdata
        var target = e.target;

        // 1.
        var record = getRecord('characterData', target);

        // 2.
        var oldValue = e.prevValue;


        forEachAncestorAndObserverEnqueueRecord(target, function(options) {
          // 3.1, 4.2
          if (!options.characterData)
            return;

          // 3.2, 4.3
          if (options.characterDataOldValue)
            return getRecordWithOldValue(oldValue);

          // 3.3, 4.4
          return record;
        });

        break;

      case 'DOMNodeRemoved':
        this.addTransientObserver(e.target);
        // Fall through.
      case 'DOMNodeInserted':
        // http://dom.spec.whatwg.org/#concept-mo-queue-childlist
        var target = e.relatedNode;
        var changedNode = e.target;
        var addedNodes, removedNodes;
        if (e.type === 'DOMNodeInserted') {
          addedNodes = [changedNode];
          removedNodes = [];
        } else {

          addedNodes = [];
          removedNodes = [changedNode];
        }
        var previousSibling = changedNode.previousSibling;
        var nextSibling = changedNode.nextSibling;

        // 1.
        var record = getRecord('childList', target);
        record.addedNodes = addedNodes;
        record.removedNodes = removedNodes;
        record.previousSibling = previousSibling;
        record.nextSibling = nextSibling;

        forEachAncestorAndObserverEnqueueRecord(target, function(options) {
          // 2.1, 3.2
          if (!options.childList)
            return;

          // 2.2, 3.3
          return record;
        });

    }

    clearRecords();
  }
};

if (!MutationObserver) {
  MutationObserver = JsMutationObserver;
}

module.exports = MutationObserver;

},{}],5:[function(require,module,exports){
/*! 
 * objct - v0.x (https://github.com/greenish/js-objct)
 * 
 * Copyright (c) 2015 Philipp Adrian (www.philippadrian.com)
 *
 * The MIT Licence (http://opensource.org/licenses/MIT)
 */
////////////////////////////////////////////////////////////////////////////////
(function(commonJSmodule, undefined){
"use strict";

////////////////////////////////////////////////////////////////////////////////
var Objct = function(){};
var NewObj = function(){return {};};
var hash = "jmuMMRs6AUUG293HXcs8Z0ofQlkG0hqiNAJlZq2hHYakBQmyfnRuCsh2yf-d7n";
var testExecutable = new RegExp("\\b"+hash+"\\b");
var strFunction = "function";
var strObject = "object";
var strArray = Array.toString();
var objectKeys = Object.keys || Objct;
////////////////////////////////////////////////////////////////////////////////
var checkType = function(value){
	var	type = typeof value;
	return type === strFunction || (type === strObject && !factory.isArray(value));
};
////////////////////////////////////////////////////////////////////////////////
var instantiateFunction = function(fn, args){
	Objct.prototype = fn.prototype;
	var f = new Objct();
	Objct.prototype = null;
	var r = fn.apply(f, args);
	if(checkType(r)) return r;
	return f;		
};
////////////////////////////////////////////////////////////////////////////////
var decoratedProperty = function(target, source, k, data) {
	target[k] = typeof source[k] === strFunction && source[k].hash === hash?
		source[k].call(data.i, {
			args:data.a, 
			modules:data.m, 
			target:target,
			key:k
		}):
		source[k];
};
////////////////////////////////////////////////////////////////////////////////
var decoratedModule = function(module, data, instance) {
	return typeof module === strFunction && module.hash === hash ?
		module.call(instance, {
			args:data.a, 
			modules:data.m, 
		}):
		module;
}
////////////////////////////////////////////////////////////////////////////////
var mixinObject = function(target, source, data, keys) {
	var k = -1, length;
	keys = keys || objectKeys(source);
	if(typeof keys === strObject) {
		length = keys.length;	
		if(data.d) 
			while(++k < length) 
				decoratedProperty(target, source, keys[k], data);
		else 
			while(++k < length) 
				target[keys[k]]=source[keys[k]];
	}
	else {
		if(data.d) 
			for(k in source) 
				decoratedProperty(target, source, k, data);
		else 
			for(k in source) 
				target[k]=source[k];
	}
};
////////////////////////////////////////////////////////////////////////////////
var mixinFunction = function(target, fn, data){
	var proto = fn.prototype;
	var instance, keys;

	mixinObject(target, proto, data);

	if(!data.d) {
		fn.apply(target, data.a);
		return;
	}

	fn.prototype = target;
	instance = instantiateFunction(fn, data.a);
	fn.prototype = proto;

	keys = typeof Object.getOwnPropertyNames === strFunction ?
		Object.getOwnPropertyNames(instance):
		undefined;
	
	mixinObject(target, instance, data, keys);
};
////////////////////////////////////////////////////////////////////////////////
var build = function(modules, data){
	var isFunction, i=-1;
	var instance, obj, length = modules.length;

	while(++i<length) {
		obj = data.d ?
			decoratedModule(modules[i].obj, data, data.i):
			modules[i].obj;

		// first Module
		if(i === 0) {
			// very first module
			if(data.i === null) {
				data.i = obj === NewObj ? 
					NewObj():
					typeof obj === strFunction ?
						instantiateFunction(obj, data.a):
						obj;
				// call first modules decorators
				data.d && mixinObject(data.i, data.i, data);
				continue;
			}
			else if(obj === NewObj) continue;
		} 

		//module is factory? -> call it
		modules[i].isFactory ?
			obj.call({hash:hash}, modules[i], data):
			// module is function?
			typeof obj === strFunction ?
				mixinFunction(data.i, obj, data):
				// module is object
				mixinObject(data.i, obj, data);
	}

	return data.i;
};
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
var factory = function(){
	Array.prototype.unshift.call(arguments, NewObj);
	return factory.extend.call({
		hash:hash,
		i : this instanceof factory,
		d : false,
		arguments : arguments
	});
};
//////////////////////////////////////////////////////////////////////////////
factory.e = function(){
	Array.prototype.unshift.call(arguments, NewObj);
	return factory.extend.call({
		hash:hash,
		i : this instanceof factory.e,
		d : true,
		arguments : arguments
	});
};
//////////////////////////////////////////////////////////////////////////////
factory.e.extend = function(){
	return factory.extend.call({
		hash:hash,
		i : this instanceof factory.e.extend,
		d : true,
		arguments : arguments
	});
};
//////////////////////////////////////////////////////////////////////////////
factory.extend = function(){
	////////////////////////////////////////////////////////////////////////
	var Executable = function Executable(module, data){
		"jmuMMRs6AUUG293HXcs8Z0ofQlkG0hqiNAJlZq2hHYakBQmyfnRuCsh2yf-d7n";
		var that = this || {};

		//////////////////////////
		// Continue building process
		//////////////////////////
		if(that && typeof that.hash === "string" && that.hash === hash) {
			// pass up modules
			module.m = thisData.m;
			return build(thisData.m, data);
		}
		//////////////////////////
		// Start building process
		//////////////////////////
		
		thisData.a = arguments;
		return build(thisData.m, thisData);
	};
	////////////////////////////////////////////////////////////////////////
	var that = this || {};
	var thisData = {
		a : [], // args
		m : [], // modules
		i : null, // instance
		d : that.hash === hash ? that.d : false, // decorated
	};
	var type;
	var args = arguments.length > 0 ? arguments : that.arguments;
	var instant = this instanceof factory.extend || that.i;

	//setup modules
	var i=-1;
	while(++i < args.length) {
		type = typeof args[i];
		if(!checkType(args[i])) {
			if(type !== strObject) {
				throw("objct: Unexpected '"+type+"'! Only 'functions' and 'objects' can be used with objct.");
			}
			else {
				Array.prototype.splice.apply(args, [i,1].concat(args[i]));
				i--;
				continue;
			}
		}

		thisData.m.push({ 
			obj : args[i],
			isFactory : type === strFunction && testExecutable.test(args[i])
		});

		// if module is a function and not a decorator, copy static properties to Executable
		if(!instant && type === strFunction && args[i].hash !== hash) {
			mixinObject(Executable, args[i], thisData);
		}

	}	
	return instant ? new Executable() : Executable;
};
////////////////////////////////////////////////////////////////////////////////
factory.e.decorator = function(fn){
	var type = typeof fn;
	if(type !== strFunction) 
		throw("objct.decorator: Unexpected '"+type+"'! Objct.decorator only takes one function as argument.");
	return function(){
		var args = Array.prototype.slice.call(arguments);
		var f = function(decoratorData){
			return fn.apply(this, [decoratorData].concat(args));
		};
		f.hash=hash;
		return f;
	};
};
////////////////////////////////////////////////////////////////////////////////
factory.isObjct = function(obj){
  return testExecutable.test(obj);
};
////////////////////////////////////////////////////////////////////////////////
// isArray fallback for ie<9
factory.isArray = Array.isArray || function (obj) {
	return (typeof obj == strObject 
		&& Object.prototype.toString.call(obj) === "[object Array]")
		|| ("constructor" in obj && String(obj.constructor) === strArray);
};
////////////////////////////////////////////////////////////////////////////////

// Connect to Environment 
commonJSmodule.exports = factory;

////////////////////////////////////////////////////////////////////////////////
})(typeof module === "undefined"? {} : module);
},{}],6:[function(require,module,exports){
var panel = require("./tags/panel-bonaparte");
var scroll = require("./tags/scroll-bonaparte");
var sidebar = require("./tags/sidebar-bonaparte");
var toolbar = require("./tags/toolbar-bonaparte");
var cornerstone = require("./tags/cornerstone-bonaparte");
var button = require("./tags/button-bonaparte");

// toolbar.mixin({
//   test:function(){
//     alert("test")
//   }
// });

panel.register();
scroll.register();
sidebar.register();
cornerstone.register();
toolbar.register();
button.register();

document.registerElement('content-bonaparte');

},{"./tags/button-bonaparte":13,"./tags/cornerstone-bonaparte":14,"./tags/panel-bonaparte":15,"./tags/scroll-bonaparte":16,"./tags/sidebar-bonaparte":17,"./tags/toolbar-bonaparte":18}],7:[function(require,module,exports){
var util = require("./utility");

///////////////////////////////////////////////////////////////////////////////
// Public

module.exports = events;

///////////////////////////////////////////////////////////////////////////////
function events(tag){

///////////////////////////////////////////////////////////////////////////////
// Public

  this.triggerEvent = triggerEvent;

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

  function triggerEvent(event, data, bubbles, cancelable){
    util.triggerEvent(tag, "bonaparte."+event, {
        bubbles: bubbles || false,
        cancelable: cancelable || false,
        detail: data
    });
  }

///////////////////////////////////////////////////////////////////////////////


}




},{"./utility":11}],8:[function(require,module,exports){
var objct = require("objct");
///////////////////////////////////////////////////////////////////////////////
// Public

var globals = module.exports = {
  global : {}
};
},{"objct":5}],9:[function(require,module,exports){
var objct = require("objct");

var registeredMixins = {};

///////////////////////////////////////////////////////////////////////////////
// Public

module.exports = mixins;

///////////////////////////////////////////////////////////////////////////////
function mixins(tag){

  registeredMixins[tag.tagName] = registeredMixins[tag.tagName] || [];
  new objct.extend(tag.bonaparte, registeredMixins[tag.tagName]);

///////////////////////////////////////////////////////////////////////////////
// Public

  this.mixin = mixin;

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

  function mixin(mixin){
    if( typeof mixin !== "function" ) throw "Unexpected type of "+(typeof mixin)+"! Expected function.";

    // Save mixin
    registeredMixins[tag.tagName].push(mixin);

    // apply mixin to current tag.
    new objct.extend(tag.bonaparte, mixin);

  }

///////////////////////////////////////////////////////////////////////////////

}
},{"objct":5}],10:[function(require,module,exports){
var objct = require("objct");
var util = require("./utility");

///////////////////////////////////////////////////////////////////////////////
// Polyfills

require("document-register-element");
require("custom-event-polyfill");

if (!("MutationObserver" in document)) {
  MutationObserver = require("mutation-observer");
};

if (Element && !Element.prototype.matches) {
    var proto = Element.prototype;
    proto.matches = proto.matchesSelector ||
        proto.mozMatchesSelector || proto.msMatchesSelector ||
        proto.oMatchesSelector || proto.webkitMatchesSelector;
}

///////////////////////////////////////////////////////////////////////////////

var registeredTags = {};

///////////////////////////////////////////////////////////////////////////////
// Public 

module.exports = registerTag;

///////////////////////////////////////////////////////////////////////////////

function registerTag(name, definition, mixins, nativeBaseElement){
  var definitionType = (objct.isArray(definition) && "array") || typeof definition;
  if(definitionType !== "object" && definitionType !== "function")
    throw "Bonaparte - registerTag: Unexpected "+definitionType+". Expected Function or Object."

  nativeBaseElement = nativeBaseElement || HTMLElement;
  mixins = mixins || [];
///////////////////////////////////////////////////////////////////////////////
// Public
  
  function tagFactory(){};
  tagFactory.register = register;
  tagFactory.initialize = initialize;
  tagFactory.mixin = mixin;

///////////////////////////////////////////////////////////////////////////////

  definition = objct(tagFactory, definition);
  return definition;

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

  function register(){ 
    registeredTags[name+"-bonaparte"] = registeredTags[name+"-bonaparte"] !== undefined ?
      registeredTags[name+"-bonaparte"]:
      document.registerElement(name+"-bonaparte", {
        prototype : Object.create( nativeBaseElement.prototype , {
          createdCallback : { value: createdCallback },
          attachedCallback : { value: attachedCallback },
          detachedCallback : { value: detachedCallback },
          attributeChangedCallback : { value: attributeChangedCallback }
        })
      });

    return registeredTags[name+"-bonaparte"];
  }

///////////////////////////////////////////////////////////////////////////////

  function mixin(mixin){
    definition = objct(definition, mixin);
  }

///////////////////////////////////////////////////////////////////////////////

  function initialize(element){
    
    apply(element);  
    util.observe(element); 

  }

///////////////////////////////////////////////////////////////////////////////

  function createdCallback() {

    apply(this);
    this.bonaparte.registered = true;
    this.bonaparte.triggerEvent("tag.created", null);
  }

///////////////////////////////////////////////////////////////////////////////

  function apply(element) {
    var modules = [
      require("./globals"),
      require("./events"),
      mixins,
      definition, 
      require("./mixins")
    ];

    // Create bonaparte namespace
    element.bonaparte = element.bonaparte || {};

    // Create and mixin tag instance
    objct.extend(element.bonaparte, modules)(element);
  }

///////////////////////////////////////////////////////////////////////////////

}

///////////////////////////////////////////////////////////////////////////////

function attachedCallback() {

  this.bonaparte.triggerEvent("tag.attached", null);

}

///////////////////////////////////////////////////////////////////////////////

function detachedCallback() {
  
  this.bonaparte.triggerEvent("tag.detached", null);
}

///////////////////////////////////////////////////////////////////////////////

function attributeChangedCallback(name, old, value) {
  
  data = {
    name : name,
    previousValue : old,
    newValue : value
  };

  this.bonaparte.triggerEvent("tag.attributeChanged", data);
  this.bonaparte.triggerEvent("tag.attributeUpdated", data);

}

///////////////////////////////////////////////////////////////////////////////


},{"./events":7,"./globals":8,"./mixins":9,"./utility":11,"custom-event-polyfill":1,"document-register-element":2,"mutation-observer":4,"objct":5}],11:[function(require,module,exports){
var objct = require("objct");
// var easing = require("./easing");

///////////////////////////////////////////////////////////////////////////////
// Public

module.exports = {
  nodeContains : nodeContains,
  getAttribute : getAttribute,
  matchAttribute : matchAttribute,
  setAttribute : setAttribute,
  removeAttribute : removeAttribute,
  getClosest : getClosest,
  triggerEvent : triggerEvent,
  observe : observe,
  map : map
};

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
var observedElements = [];

function observe(element){
  if(observedElements.indexOf(element)>=0) return;
  if(typeof element.bonaparte === "object" && element.bonaparte.registered) return;

  element.bonaparte = element.bonaparte || {};
  element.bonaparte.observer = new MutationObserver(mutationHandler);

  element.bonaparte.observer.observe(element, {
    attributes:true,
    attributeOldValue:true
  });
  observedElements.push(element);

}

///////////////////////////////////////////////////////////////////////////////

function mutationHandler(mutations){
  var attribute, data, tag;
  
  for(var i=0; i<mutations.length; i++) {
    attribute = mutations[i].attributeName;
    tag = mutations[i].target;
    if(typeof tag.attributes[attribute] === "undefined") continue;

    data = {
      name : attribute,
      previousValue : mutations[i].oldValue,
      newValue : tag.attributes[attribute].value
    };

    triggerEvent(tag, "bonaparte.tag.attributeChanged", {detail:data});
    triggerEvent(tag, "bonaparte.tag.attributeUpdated", {detail:data});
  }
 
}

///////////////////////////////////////////////////////////////////////////////

function triggerEvent(tag, event, params){
    var newEvent = new CustomEvent(event, params);
    tag.dispatchEvent(newEvent);
}

///////////////////////////////////////////////////////////////////////////////


function nodeContains(parent, child) {
  while((child=child.parentNode)&&child!==parent); 
  return !!child; 
};

///////////////////////////////////////////////////////////////////////////////

function getClosest(tag, name){
  while((tag=tag.parentNode)&&tag.nodeName.toUpperCase()!==name.toUpperCase()); 
  return tag ? tag:false; 

}

///////////////////////////////////////////////////////////////////////////////

function getAttribute(tag, name){
  var attribute = tag.attributes[name] || tag.attributes["data-"+name];
  return attribute ? attribute.value : undefined; 
}
///////////////////////////////////////////////////////////////////////////////

function matchAttribute(patterns, name){
  var pattern, dataPattern;
  if(!objct.isArray(patterns)) patterns = [patterns];

  for(var i=0; i<patterns.length; i++) {
    pattern = patterns[i];
    dataPattern = new RegExp("data-"+pattern.source);
    if(pattern.test(name) ||  dataPattern.test(name)) 
      return true;
  }
  return false;
}

///////////////////////////////////////////////////////////////////////////////

function setAttribute(tag, name, value) {
  name = tag.hasAttribute("data-"+name) ? "data-"+name : name;
  var oldValue = getAttribute(tag, name);

  tag.setAttribute(name, value);

  if(oldValue === value) {
    tag.bonaparte.triggerEvent("tag.attributeUpdated",{
      name:name,
      previousValue : oldValue,
      newValue: value
    });
  }  
}

///////////////////////////////////////////////////////////////////////////////

function removeAttribute(tag, name) {
  if(typeof tag.attributes[name] !== "object") return;

  var data = {
    name : name,
    previousValue : tag.attributes[name].value,
    newValue : null
  }
  // remove attribute
  tag.removeAttribute(name);
  tag.removeAttribute("data-"+name);

  // trigger Mutation event if not "native" bonaparte element
  if(typeof tag.bonaparte !== "object" || !tag.bonaparte.registered) {
    triggerEvent(tag, "bonaparte.tag.attributeChanged", {detail:data});
    triggerEvent(tag, "bonaparte.tag.attributeUpdated", {detail:data});
  }
}

///////////////////////////////////////////////////////////////////////////////
// x: current Value, 
// cMin: current range min, 
// cMax: current range max, 
// tMin: target range min, 
// tMax: target range max, 
// easingFunction: easingFunction (string)

function map(x, cMin, cMax, tMin, tMax, easingFunction) {
  easingFunction = typeof easing === "object" && easing[easingFunction] !== undefined ? 
    easing[easingFunction] : 
    function (t, b, c, d) { return b+c*(t/=d) };
  if(x===0) return tMin;
  return easingFunction(x-cMin, tMin, tMax-tMin, cMax-cMin);  
}
///////////////////////////////////////////////////////////////////////////////

},{"objct":5}],12:[function(require,module,exports){
var util = require("../core/utility");

///////////////////////////////////////////////////////////////////////////////
// Public 

module.exports = toggleMixin;

///////////////////////////////////////////////////////////////////////////////

function toggleMixin(tag){

  this.toggle = toggle;

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

  function toggle(attribute){
    var newValue = util.getAttribute(tag, attribute) === "true" ? "false" : "true";
    util.setAttribute(tag, attribute, newValue);
  }
}

},{"../core/utility":11}],13:[function(require,module,exports){
var util = require("../core/utility");
var registerTag = require("../core/tag");
var mousetrap = require("mousetrap");

///////////////////////////////////////////////////////////////////////////////
// Public

module.exports = registerTag("button", button, [], HTMLButtonElement);

///////////////////////////////////////////////////////////////////////////////
function button(tag){
  var action = undefined;
  var targets = [];
  var attributes = {};
  var toggles = [];
  var shortcuts = [];
  var toggle = false;
  var active;

  if(document.readyState === "complete") init();
  else window.addEventListener("load", init);

///////////////////////////////////////////////////////////////////////////////

  tag.addEventListener("bonaparte.tag.attributeChanged", attributeChangedCallback);  

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

  function init(){
    setEvents();
    setToggles();
    setTargets();
    setAttributes();
    setShortcut();
  }

///////////////////////////////////////////////////////////////////////////////

  function attributeChangedCallback(data){
    if(util.matchAttribute(/action/, data.name)) setEvents();
    if(util.matchAttribute(/toggle/, data.name)) setToggles();
    if(util.matchAttribute(/target/, data.name)) setTargets();
    if(util.matchAttribute(/target-.*/, data.name)) setAttributes();
    if(util.matchAttribute(/shortcut/, data.name)) setKeyEvents();
  }

///////////////////////////////////////////////////////////////////////////////

  function targetAttributeChangedCallback(data) {
    setTimeout(checkAttributes,0);
  }

///////////////////////////////////////////////////////////////////////////////

  function eventHandler(e){
    syncAttributes();
    triggerEvents();

    if(util.getAttribute(tag, "bubbles") === "false") e.stopPropagation();
  }

///////////////////////////////////////////////////////////////////////////////

  function triggerEvents(){
    var trigger = util.getAttribute(tag, "trigger");
   
    if(trigger === undefined) return; 
    for(var i = 0; i < targets.length; i++){
      target = targets[i];
      util.triggerEvent(target.tag, trigger)
    }
  }

///////////////////////////////////////////////////////////////////////////////

  function checkValues(name, targetValue, attributeValue){

    if(targetValue === attributeValue) return true;
    if(name !== "style" || targetValue === undefined || attributeValue === undefined) return false;

    // IE handling from here on out

    attributeValue = attributeValue.replace(/\s*;\s*/g,";").split(";").sort().join(";");
    attributeValue += attributeValue.slice(-1) === ";" ? "":";";

    targetValue = targetValue.replace(/\s/g, "\\s*");

    return (new RegExp( targetValue )).test(attributeValue);

  }

///////////////////////////////////////////////////////////////////////////////

  function checkAttributes(){
    var target, targetValue;
    active = undefined;

    // for each target
    for(var i =0; i< targets.length; i++){
      target = targets[i];
      
      // check attributes
      for(var name in attributes) {
        targetValue = util.getAttribute(target.tag, name);

        if(!checkValues(name, targetValue, attributes[name])) {
          active = false;
          target.values[name] = targetValue;
        }

        if(active !== false) active = true;
      }

      // check toggles
      for(var k=0; k<toggles.length; k++) {
        if(util.getAttribute(target.tag, toggles[k]) !== "true")
          active=false;

        if(active !== false) active = true;
      }     
 
    } 

    if(active === true){
      tag.classList.add("active");
    }
    else {
      tag.classList.remove("active");
    }
  }

///////////////////////////////////////////////////////////////////////////////

  function syncAttributes(){
    var target, targetValue;
    for(var i = 0; i < targets.length; i++){
      target = targets[i];

      // toggle attributes
      for(var k=0; k<toggles.length; k++) {
        targetValue = util.getAttribute(target.tag, toggles[k]) === "true" ? 
          "false":"true";
        util.setAttribute(target.tag, toggles[k], targetValue); 
      }
      
      // sync attributes
      for(var name in attributes) {
        targetValue = active === true && toggle === true ? 
          target.values[name] : attributes[name];
        if(targetValue !== undefined) 
          util.setAttribute(target.tag, name, targetValue); 
        else 
          util.removeAttribute(target.tag, name);
      }
    }
  }
  
///////////////////////////////////////////////////////////////////////////////

  function setShortcut(){
    var newShortcuts = util.getAttribute(tag, "shortcut");

    mousetrap.unbind(shortcuts);

    if(typeof newShortcuts === "undefined") return;

    shortcuts = newShortcuts.split(",");

    for(var i=0; i<shortcuts.length; i++) {
      shortcuts[i] = shortcuts[i].trim();
    }

    mousetrap.bind(shortcuts, eventHandler);

  }

///////////////////////////////////////////////////////////////////////////////

  function setToggles(){
    var toggleValue = util.getAttribute(tag, "toggle");

    toggles = [];
    toggle = false;

    if(toggleValue === undefined) return;

    toggleValue = toggleValue.replace(/\s+/g, " ").split(" ");

    for(var i=0; i < toggleValue.length; i++) {
      if(toggleValue[i] === "true" || toggleValue[i] === "false") {
        toggle = toggleValue[i] === "true";
      }
      else if(toggleValue[i] !== "") {
        toggles.push(toggleValue[i]);
      }
    }
  }

///////////////////////////////////////////////////////////////////////////////

  function setAttributes(){
    var attributeBase;
    attributes = [];
    for(var i=0; i < tag.attributes.length; i++) {
      if(util.matchAttribute(/target-.*/, tag.attributes[i].name)) {
        attributeBase = tag.attributes[i].name.match(/(?:data-)?target-(.*)/)[1];
        attributes[attributeBase] = tag.attributes[i].value;
      }
    }
    checkAttributes();
  }

///////////////////////////////////////////////////////////////////////////////

  function setTargets(){
    var selector = util.getAttribute(tag, "target");

    // Remove old target event handlers
    for(var i = 0; i < targets.length; i++){
      targets[i].removeEventListener("bonaparte.tag.attributeChanged", targetAttributeChangedCallback);
    }

    if(selector === undefined) return;

    var potentialSidebar = tag.parentNode; 
    var potentialToolbar = potentialSidebar.parentNode;


    // restrict button by parent toolbar in general
    // var context = util.getClosest(tag, "toolbar-bonaparte") || document;

    // only restrict button in toolbar sidebars.
    var potentialToolbar = util.getClosest(tag, "toolbar-bonaparte");
    var context = potentialToolbar && util.nodeContains(potentialToolbar.firstElementChild, tag)?
      potentialToolbar : document;

     
    var newTargets = context.querySelectorAll(selector);
    if(context !== document && context.matches(selector)) {
      newTargets=Array.prototype.slice.call(newTargets);
      newTargets.push(context);
    }

    targets = [];
    for(var i=0; i < newTargets.length; i++) {
      targets.push({
        tag : newTargets[i],
        values : {}
      });
      util.observe(newTargets[i]);
      newTargets[i].addEventListener("bonaparte.tag.attributeChanged", targetAttributeChangedCallback);
    }
  }

///////////////////////////////////////////////////////////////////////////////

  function setEvents(){
    var newAction = util.getAttribute(tag, "action");

    if(action === newAction) return false;

    if(action !== undefined)
      tag.removeEventListener(action, eventHandler);

    if(newAction !== undefined)
      tag.addEventListener(newAction, eventHandler);

    action=newAction;

    return action !== undefined;
  }

///////////////////////////////////////////////////////////////////////////////

}

 ///////////////////////////////////////////////////////////////////////////////
},{"../core/tag":10,"../core/utility":11,"mousetrap":3}],14:[function(require,module,exports){
var util = require("../core/utility");
var registerTag = require("../core/tag");

///////////////////////////////////////////////////////////////////////////////
// Public

module.exports = registerTag("cornerstone", cornerstone);

///////////////////////////////////////////////////////////////////////////////
function cornerstone(tag){
  var toolbar = tag.parentNode;

  updateCornerstonePadding();
///////////////////////////////////////////////////////////////////////////////
  
  tag.addEventListener("bonaparte.tag.attributeChanged", updateCornerstonePadding);
  toolbar.addEventListener("bonaparte.tag.attributeChanged", updateCornerstonePadding);
  
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
  
  function updateCornerstonePadding(){
    var cornerStonePosition = util.getAttribute(toolbar, "cornerstone").match(/(\w+)/g);
    var sidebarPosition = util.getAttribute(toolbar, "sidebar");
    
    toolbar.firstElementChild.style.padding="";
    
    if(cornerStonePosition.indexOf("outside") >= 0) return;

    var sidebarPositionIndex = cornerStonePosition.indexOf(sidebarPosition);

    if(sidebarPositionIndex < 0) return;
    else cornerStonePosition.splice(sidebarPositionIndex,1);

    var paddingSide = cornerStonePosition[0];

    var paddingValue = paddingSide === "left" || paddingSide === "right"?
      tag.offsetWidth:
      tag.offsetHeight;

    paddingSide=paddingSide.charAt(0).toUpperCase() + paddingSide.slice(1);

    toolbar.firstElementChild.style["padding"+paddingSide]=paddingValue+"px";

  }

///////////////////////////////////////////////////////////////////////////////

}

///////////////////////////////////////////////////////////////////////////////
},{"../core/tag":10,"../core/utility":11}],15:[function(require,module,exports){
var util = require("../core/utility");
var registerTag = require("../core/tag");

///////////////////////////////////////////////////////////////////////////////
// Public

module.exports = registerTag("panel", panel, [
  require("../mixins/toggle")
]);

///////////////////////////////////////////////////////////////////////////////
function panel(tag){
  var locked = false;

///////////////////////////////////////////////////////////////////////////////
// Public 

  this.open = open;
  this.close = close;

///////////////////////////////////////////////////////////////////////////////
// Eventlisteners

  window.addEventListener("click", clickHandler);
  window.addEventListener("bonaparte.internal.closePanels", closePanels);
  tag.addEventListener("bonaparte.tag.attributeUpdated", attributeChangedCallback);

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

  function clickHandler(e){
    if(e.target === tag || util.nodeContains(tag, e.target)) return;
    closePanels();
  }

///////////////////////////////////////////////////////////////////////////////

  function attributeChangedCallback(data){
    if(util.matchAttribute(/open/, data.detail.name)){
      if(data.detail.newValue == "true") {
        lock();

        tag.bonaparte.triggerEvent("internal.closePanels", null, true);
        tag.bonaparte.triggerEvent("panel.open", null, true);
      }
      else { 
        tag.bonaparte.triggerEvent("panel.close", null, true);
      }
    };    
  }

///////////////////////////////////////////////////////////////////////////////

  function closePanels(){
    if(locked) return;
    close();
  }

///////////////////////////////////////////////////////////////////////////////

  function close() {
    util.setAttribute(tag, "open", "false");
  }

///////////////////////////////////////////////////////////////////////////////

  function open(e) {    
    util.setAttribute(tag, "open", "true");
  }
///////////////////////////////////////////////////////////////////////////////

  function lock(){
    locked=true;
    setTimeout(function(){ locked=false; },0);
  }
}

///////////////////////////////////////////////////////////////////////////////
},{"../core/tag":10,"../core/utility":11,"../mixins/toggle":12}],16:[function(require,module,exports){
var util   = require("../core/utility");
var registerTag = require("../core/tag");

var scrollBarWidth = false;

///////////////////////////////////////////////////////////////////////////////
// Public

module.exports = registerTag("scroll", scroll);

///////////////////////////////////////////////////////////////////////////////
function scroll(tag){
  var content =  tag.firstElementChild;
  var slider, scrollbar, scrollBarVisible;

  if(util.getAttribute(tag, "scrollbar") === "native") return;

  setupScroller();

///////////////////////////////////////////////////////////////////////////////
// Public 
 
  this.update = update;

///////////////////////////////////////////////////////////////////////////////
// Eventlisteners

  if(util.getAttribute(tag, "resize") !== "false")
    window.addEventListener("resize", update);
  
  content.addEventListener("scroll", updatePosition);

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

  function update(){
    var containerHeight = tag.offsetHeight;
    var scrollHeight = content.scrollHeight;

    // VISIBILITY
    if(scrollHeight <= containerHeight) {
      if(scrollBarVisible !== false) {
        scrollbar.style.opacity = 0.01;
        scrollBarVisible = false;
      }
    }
    else {
      if(scrollBarVisible !== true) {
        scrollbar.style.opacity = "";
        scrollBarVisible = true;
      }
    } 

    // SLIDER SIZE / POSITION
    updatePosition();

  }

///////////////////////////////////////////////////////////////////////////////

  function updatePosition(){
    var containerHeight = tag.offsetHeight;
    var scrollHeight = content.scrollHeight;

    var sliderSize = Math.min(1, Math.max( 0.05, util.map(scrollHeight/containerHeight, 1, 5, 1, 0.05)));

    var position = scrollHeight-containerHeight > 0 ? content.scrollTop / (scrollHeight-containerHeight) : 0;
    var top = util.map(position, 0, 1, 0, containerHeight-(containerHeight*sliderSize));

    slider.style.height=(100*sliderSize)+"%";
    slider.style.top=top+"px";
  }

///////////////////////////////////////////////////////////////////////////////

  function setupScroller(){
    // Remove/Hide native Scrollbar
    scrollBarWidth = scrollBarWidth || getScrollBarWidth();
    content.style.marginRight = -scrollBarWidth+"px";
    content.style.paddingRight = scrollBarWidth+"px";
  
    slider = document.createElement("div")
    slider.setAttribute("class", "slider");

    scrollbar = document.createElement("div")
    scrollbar.setAttribute("class", "scrollbar");
    scrollbar.appendChild(slider);

    update();

    tag.appendChild(scrollbar);

  }

///////////////////////////////////////////////////////////////////////////////

}

///////////////////////////////////////////////////////////////////////////////

function getScrollBarWidth(){
  var width = document.body.clientWidth;
  var overflow = document.documentElement.style.overflow;
  document.documentElement.style.overflow = "scroll";
  width -= document.body.clientWidth;
  document.documentElement.style.overflow = overflow;
  return width;
}
},{"../core/tag":10,"../core/utility":11}],17:[function(require,module,exports){
var util = require("../core/utility");
var registerTag = require("../core/tag");

///////////////////////////////////////////////////////////////////////////////
// Public

module.exports = registerTag("sidebar", sidebar);

///////////////////////////////////////////////////////////////////////////////
function sidebar(tag){
  updateSize();

///////////////////////////////////////////////////////////////////////////////

  tag.addEventListener("bonaparte.tag.attributeChanged", attributeChangedCallback);
  
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

  function attributeChangedCallback(data){
    if(util.matchAttribute(/size/, data.detail.name)) updateSize();
  }


///////////////////////////////////////////////////////////////////////////////

  function updateSize(data){
    var size = util.getAttribute(tag, "size");
    var style = sidebar === "left" || sidebar==="right" ? "min-width" : "min-height";
    if(size === undefined) 
      tag.firstElementChild.style[style] = "";
    else 
      tag.firstElementChild.style[style] = size;
  }

}

///////////////////////////////////////////////////////////////////////////////
},{"../core/tag":10,"../core/utility":11}],18:[function(require,module,exports){
var util = require("../core/utility");
var registerTag = require("../core/tag");

///////////////////////////////////////////////////////////////////////////////
// Public

module.exports = registerTag("toolbar", toolbar, [
  require("./sidebar-bonaparte.js")
]);

///////////////////////////////////////////////////////////////////////////////
function toolbar(tag){


  window.addEventListener("load", initializeButtons)

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
  
  function initializeButtons(){
    var groups = tag.firstElementChild.children;
    var buttons=[];
    for(var i=0; i<  groups.length; i++) {
      for(var k=0; k<groups[i].children.length; k++) {

        if(groups[i].children[k].nodeName.toUpperCase() !== "BUTTON-BONAPARTE")
          buttons.push(groups[i].children[k]);
      }

    }

    for(var i = 0; i< buttons.length; i++){
      require("./button-bonaparte").initialize(buttons[i]);
    }


  }
///////////////////////////////////////////////////////////////////////////////

}

///////////////////////////////////////////////////////////////////////////////
},{"../core/tag":10,"../core/utility":11,"./button-bonaparte":13,"./sidebar-bonaparte.js":17}]},{},[6]);
