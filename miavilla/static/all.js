function forceRendering() {
    "use strict";
    $("body")
        .css("overflow", "hidden")
        .height(), $("body")
        .css("overflow", "auto")
}
window.console || (window.console = function() {
        function exec_callback(args) {
            !callback_func || !callback_force && con && con.log || callback_func.apply(window, args)
        }

        function is_level(level) {
            return log_level > 0 ? log_level > level : log_methods.length + log_level <= level
        }
        for (var callback_func, callback_force, window = this, aps = Array.prototype.slice, con = window.console, that = {}, log_level = 9, log_methods = ["error", "warn", "info", "debug", "log"], pass_methods = "assert clear count dir dirxml exception group groupCollapsed groupEnd profile profileEnd table time timeEnd trace".split(" "), idx = pass_methods.length, logs = []; --idx >= 0;) ! function(method) {
            that[method] = function() {
                0 !== log_level && con && con[method] && con[method].apply(con, arguments)
            }
        }(pass_methods[idx]);
        for (idx = log_methods.length; --idx >= 0;) ! function(idx, level) {
            that[level] = function() {
                var args = aps.call(arguments),
                    log_arr = [level].concat(args);
                logs.push(log_arr), exec_callback(log_arr), con && is_level(idx) && (con.firebug ? con[level].apply(window, args) : con[level] ? con[level](args) : con.log(args))
            }
        }(idx, log_methods[idx]);
        return that.setLevel = function(level) {
            log_level = "number" == typeof level ? level : 9
        }, that.setCallback = function() {
            var args = aps.call(arguments),
                max = logs.length,
                i = max;
            for (callback_func = args.shift() || null, callback_force = "boolean" == typeof args[0] ? args.shift() : !1, i -= "number" == typeof args[0] ? args.shift() : max; max > i;) exec_callback(logs[i++])
        }, that
    }()),
    function(window, undefined) {
        function isArraylike(obj) {
            var length = obj.length,
                type = jQuery.type(obj);
            return jQuery.isWindow(obj) ? !1 : 1 === obj.nodeType && length ? !0 : "array" === type || "function" !== type && (0 === length || "number" == typeof length && length > 0 && length - 1 in obj)
        }

        function createOptions(options) {
            var object = optionsCache[options] = {};
            return jQuery.each(options.match(core_rnotwhite) || [], function(_, flag) {
                object[flag] = !0
            }), object
        }

        function internalData(elem, name, data, pvt) {
            if (jQuery.acceptData(elem)) {
                var ret, thisCache, internalKey = jQuery.expando,
                    isNode = elem.nodeType,
                    cache = isNode ? jQuery.cache : elem,
                    id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;
                if (id && cache[id] && (pvt || cache[id].data) || data !== undefined || "string" != typeof name) return id || (id = isNode ? elem[internalKey] = core_deletedIds.pop() || jQuery.guid++ : internalKey), cache[id] || (cache[id] = isNode ? {} : {
                    toJSON: jQuery.noop
                }), ("object" == typeof name || "function" == typeof name) && (pvt ? cache[id] = jQuery.extend(cache[id], name) : cache[id].data = jQuery.extend(cache[id].data, name)), thisCache = cache[id], pvt || (thisCache.data || (thisCache.data = {}), thisCache = thisCache.data), data !== undefined && (thisCache[jQuery.camelCase(name)] = data), "string" == typeof name ? (ret = thisCache[name], null == ret && (ret = thisCache[jQuery.camelCase(name)])) : ret = thisCache, ret
            }
        }

        function internalRemoveData(elem, name, pvt) {
            if (jQuery.acceptData(elem)) {
                var thisCache, i, isNode = elem.nodeType,
                    cache = isNode ? jQuery.cache : elem,
                    id = isNode ? elem[jQuery.expando] : jQuery.expando;
                if (cache[id]) {
                    if (name && (thisCache = pvt ? cache[id] : cache[id].data)) {
                        jQuery.isArray(name) ? name = name.concat(jQuery.map(name, jQuery.camelCase)) : name in thisCache ? name = [name] : (name = jQuery.camelCase(name), name = name in thisCache ? [name] : name.split(" ")), i = name.length;
                        for (; i--;) delete thisCache[name[i]];
                        if (pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache)) return
                    }(pvt || (delete cache[id].data, isEmptyDataObject(cache[id]))) && (isNode ? jQuery.cleanData([elem], !0) : jQuery.support.deleteExpando || cache != cache.window ? delete cache[id] : cache[id] = null)
                }
            }
        }

        function dataAttr(elem, key, data) {
            if (data === undefined && 1 === elem.nodeType) {
                var name = "data-" + key.replace(rmultiDash, "-$1")
                    .toLowerCase();
                if (data = elem.getAttribute(name), "string" == typeof data) {
                    try {
                        data = "true" === data ? !0 : "false" === data ? !1 : "null" === data ? null : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data
                    } catch (e) {}
                    jQuery.data(elem, key, data)
                } else data = undefined
            }
            return data
        }

        function isEmptyDataObject(obj) {
            var name;
            for (name in obj)
                if (("data" !== name || !jQuery.isEmptyObject(obj[name])) && "toJSON" !== name) return !1;
            return !0
        }

        function returnTrue() {
            return !0
        }

        function returnFalse() {
            return !1
        }

        function safeActiveElement() {
            try {
                return document.activeElement
            } catch (err) {}
        }

        function sibling(cur, dir) {
            do cur = cur[dir]; while (cur && 1 !== cur.nodeType);
            return cur
        }

        function winnow(elements, qualifier, not) {
            if (jQuery.isFunction(qualifier)) return jQuery.grep(elements, function(elem, i) {
                return !!qualifier.call(elem, i, elem) !== not
            });
            if (qualifier.nodeType) return jQuery.grep(elements, function(elem) {
                return elem === qualifier !== not
            });
            if ("string" == typeof qualifier) {
                if (isSimple.test(qualifier)) return jQuery.filter(qualifier, elements, not);
                qualifier = jQuery.filter(qualifier, elements)
            }
            return jQuery.grep(elements, function(elem) {
                return jQuery.inArray(elem, qualifier) >= 0 !== not
            })
        }

        function createSafeFragment(document) {
            var list = nodeNames.split("|"),
                safeFrag = document.createDocumentFragment();
            if (safeFrag.createElement)
                for (; list.length;) safeFrag.createElement(list.pop());
            return safeFrag
        }

        function manipulationTarget(elem, content) {
            return jQuery.nodeName(elem, "table") && jQuery.nodeName(1 === content.nodeType ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem
        }

        function disableScript(elem) {
            return elem.type = (null !== jQuery.find.attr(elem, "type")) + "/" + elem.type, elem
        }

        function restoreScript(elem) {
            var match = rscriptTypeMasked.exec(elem.type);
            return match ? elem.type = match[1] : elem.removeAttribute("type"), elem
        }

        function setGlobalEval(elems, refElements) {
            for (var elem, i = 0; null != (elem = elems[i]); i++) jQuery._data(elem, "globalEval", !refElements || jQuery._data(refElements[i], "globalEval"))
        }

        function cloneCopyEvent(src, dest) {
            if (1 === dest.nodeType && jQuery.hasData(src)) {
                var type, i, l, oldData = jQuery._data(src),
                    curData = jQuery._data(dest, oldData),
                    events = oldData.events;
                if (events) {
                    delete curData.handle, curData.events = {};
                    for (type in events)
                        for (i = 0, l = events[type].length; l > i; i++) jQuery.event.add(dest, type, events[type][i])
                }
                curData.data && (curData.data = jQuery.extend({}, curData.data))
            }
        }

        function fixCloneNodeIssues(src, dest) {
            var nodeName, e, data;
            if (1 === dest.nodeType) {
                if (nodeName = dest.nodeName.toLowerCase(), !jQuery.support.noCloneEvent && dest[jQuery.expando]) {
                    data = jQuery._data(dest);
                    for (e in data.events) jQuery.removeEvent(dest, e, data.handle);
                    dest.removeAttribute(jQuery.expando)
                }
                "script" === nodeName && dest.text !== src.text ? (disableScript(dest)
                    .text = src.text, restoreScript(dest)) : "object" === nodeName ? (dest.parentNode && (dest.outerHTML = src.outerHTML), jQuery.support.html5Clone && src.innerHTML && !jQuery.trim(dest.innerHTML) && (dest.innerHTML = src.innerHTML)) : "input" === nodeName && manipulation_rcheckableType.test(src.type) ? (dest.defaultChecked = dest.checked = src.checked, dest.value !== src.value && (dest.value = src.value)) : "option" === nodeName ? dest.defaultSelected = dest.selected = src.defaultSelected : ("input" === nodeName || "textarea" === nodeName) && (dest.defaultValue = src.defaultValue)
            }
        }

        function getAll(context, tag) {
            var elems, elem, i = 0,
                found = typeof context.getElementsByTagName !== core_strundefined ? context.getElementsByTagName(tag || "*") : typeof context.querySelectorAll !== core_strundefined ? context.querySelectorAll(tag || "*") : undefined;
            if (!found)
                for (found = [], elems = context.childNodes || context; null != (elem = elems[i]); i++) !tag || jQuery.nodeName(elem, tag) ? found.push(elem) : jQuery.merge(found, getAll(elem, tag));
            return tag === undefined || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], found) : found
        }

        function fixDefaultChecked(elem) {
            manipulation_rcheckableType.test(elem.type) && (elem.defaultChecked = elem.checked)
        }

        function vendorPropName(style, name) {
            if (name in style) return name;
            for (var capName = name.charAt(0)
                    .toUpperCase() + name.slice(1), origName = name, i = cssPrefixes.length; i--;)
                if (name = cssPrefixes[i] + capName, name in style) return name;
            return origName
        }

        function isHidden(elem, el) {
            return elem = el || elem, "none" === jQuery.css(elem, "display") || !jQuery.contains(elem.ownerDocument, elem)
        }

        function showHide(elements, show) {
            for (var display, elem, hidden, values = [], index = 0, length = elements.length; length > index; index++) elem = elements[index], elem.style && (values[index] = jQuery._data(elem, "olddisplay"), display = elem.style.display, show ? (values[index] || "none" !== display || (elem.style.display = ""), "" === elem.style.display && isHidden(elem) && (values[index] = jQuery._data(elem, "olddisplay", css_defaultDisplay(elem.nodeName)))) : values[index] || (hidden = isHidden(elem), (display && "none" !== display || !hidden) && jQuery._data(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"))));
            for (index = 0; length > index; index++) elem = elements[index], elem.style && (show && "none" !== elem.style.display && "" !== elem.style.display || (elem.style.display = show ? values[index] || "" : "none"));
            return elements
        }

        function setPositiveNumber(elem, value, subtract) {
            var matches = rnumsplit.exec(value);
            return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value
        }

        function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
            for (var i = extra === (isBorderBox ? "border" : "content") ? 4 : "width" === name ? 1 : 0, val = 0; 4 > i; i += 2) "margin" === extra && (val += jQuery.css(elem, extra + cssExpand[i], !0, styles)), isBorderBox ? ("content" === extra && (val -= jQuery.css(elem, "padding" + cssExpand[i], !0, styles)), "margin" !== extra && (val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles))) : (val += jQuery.css(elem, "padding" + cssExpand[i], !0, styles), "padding" !== extra && (val += jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles)));
            return val
        }

        function getWidthOrHeight(elem, name, extra) {
            var valueIsBorderBox = !0,
                val = "width" === name ? elem.offsetWidth : elem.offsetHeight,
                styles = getStyles(elem),
                isBorderBox = jQuery.support.boxSizing && "border-box" === jQuery.css(elem, "boxSizing", !1, styles);
            if (0 >= val || null == val) {
                if (val = curCSS(elem, name, styles), (0 > val || null == val) && (val = elem.style[name]), rnumnonpx.test(val)) return val;
                valueIsBorderBox = isBorderBox && (jQuery.support.boxSizingReliable || val === elem.style[name]), val = parseFloat(val) || 0
            }
            return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px"
        }

        function css_defaultDisplay(nodeName) {
            var doc = document,
                display = elemdisplay[nodeName];
            return display || (display = actualDisplay(nodeName, doc), "none" !== display && display || (iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")
                    .css("cssText", "display:block !important"))
                .appendTo(doc.documentElement), doc = (iframe[0].contentWindow || iframe[0].contentDocument)
                .document, doc.write("<!doctype html><html><body>"), doc.close(), display = actualDisplay(nodeName, doc), iframe.detach()), elemdisplay[nodeName] = display), display
        }

        function actualDisplay(name, doc) {
            var elem = jQuery(doc.createElement(name))
                .appendTo(doc.body),
                display = jQuery.css(elem[0], "display");
            return elem.remove(), display
        }

        function buildParams(prefix, obj, traditional, add) {
            var name;
            if (jQuery.isArray(obj)) jQuery.each(obj, function(i, v) {
                traditional || rbracket.test(prefix) ? add(prefix, v) : buildParams(prefix + "[" + ("object" == typeof v ? i : "") + "]", v, traditional, add)
            });
            else if (traditional || "object" !== jQuery.type(obj)) add(prefix, obj);
            else
                for (name in obj) buildParams(prefix + "[" + name + "]", obj[name], traditional, add)
        }

        function addToPrefiltersOrTransports(structure) {
            return function(dataTypeExpression, func) {
                "string" != typeof dataTypeExpression && (func = dataTypeExpression, dataTypeExpression = "*");
                var dataType, i = 0,
                    dataTypes = dataTypeExpression.toLowerCase()
                    .match(core_rnotwhite) || [];
                if (jQuery.isFunction(func))
                    for (; dataType = dataTypes[i++];) "+" === dataType[0] ? (dataType = dataType.slice(1) || "*", (structure[dataType] = structure[dataType] || [])
                            .unshift(func)) : (structure[dataType] = structure[dataType] || [])
                        .push(func)
            }
        }

        function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
            function inspect(dataType) {
                var selected;
                return inspected[dataType] = !0, jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
                    var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                    return "string" != typeof dataTypeOrTransport || seekingTransport || inspected[dataTypeOrTransport] ? seekingTransport ? !(selected = dataTypeOrTransport) : void 0 : (options.dataTypes.unshift(dataTypeOrTransport), inspect(dataTypeOrTransport), !1)
                }), selected
            }
            var inspected = {},
                seekingTransport = structure === transports;
            return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*")
        }

        function ajaxExtend(target, src) {
            var deep, key, flatOptions = jQuery.ajaxSettings.flatOptions || {};
            for (key in src) src[key] !== undefined && ((flatOptions[key] ? target : deep || (deep = {}))[key] = src[key]);
            return deep && jQuery.extend(!0, target, deep), target
        }

        function ajaxHandleResponses(s, jqXHR, responses) {
            for (var firstDataType, ct, finalDataType, type, contents = s.contents, dataTypes = s.dataTypes;
                "*" === dataTypes[0];) dataTypes.shift(), ct === undefined && (ct = s.mimeType || jqXHR.getResponseHeader("Content-Type"));
            if (ct)
                for (type in contents)
                    if (contents[type] && contents[type].test(ct)) {
                        dataTypes.unshift(type);
                        break
                    }
            if (dataTypes[0] in responses) finalDataType = dataTypes[0];
            else {
                for (type in responses) {
                    if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                        finalDataType = type;
                        break
                    }
                    firstDataType || (firstDataType = type)
                }
                finalDataType = finalDataType || firstDataType
            }
            return finalDataType ? (finalDataType !== dataTypes[0] && dataTypes.unshift(finalDataType), responses[finalDataType]) : void 0
        }

        function ajaxConvert(s, response, jqXHR, isSuccess) {
            var conv2, current, conv, tmp, prev, converters = {},
                dataTypes = s.dataTypes.slice();
            if (dataTypes[1])
                for (conv in s.converters) converters[conv.toLowerCase()] = s.converters[conv];
            for (current = dataTypes.shift(); current;)
                if (s.responseFields[current] && (jqXHR[s.responseFields[current]] = response), !prev && isSuccess && s.dataFilter && (response = s.dataFilter(response, s.dataType)), prev = current, current = dataTypes.shift())
                    if ("*" === current) current = prev;
                    else if ("*" !== prev && prev !== current) {
                if (conv = converters[prev + " " + current] || converters["* " + current], !conv)
                    for (conv2 in converters)
                        if (tmp = conv2.split(" "), tmp[1] === current && (conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]])) {
                            conv === !0 ? conv = converters[conv2] : converters[conv2] !== !0 && (current = tmp[0], dataTypes.unshift(tmp[1]));
                            break
                        }
                if (conv !== !0)
                    if (conv && s["throws"]) response = conv(response);
                    else try {
                        response = conv(response)
                    } catch (e) {
                        return {
                            state: "parsererror",
                            error: conv ? e : "No conversion from " + prev + " to " + current
                        }
                    }
            }
            return {
                state: "success",
                data: response
            }
        }

        function createStandardXHR() {
            try {
                return new window.XMLHttpRequest
            } catch (e) {}
        }

        function createActiveXHR() {
            try {
                return new window.ActiveXObject("Microsoft.XMLHTTP")
            } catch (e) {}
        }

        function createFxNow() {
            return setTimeout(function() {
                fxNow = undefined
            }), fxNow = jQuery.now()
        }

        function createTween(value, prop, animation) {
            for (var tween, collection = (tweeners[prop] || [])
                    .concat(tweeners["*"]), index = 0, length = collection.length; length > index; index++)
                if (tween = collection[index].call(animation, prop, value)) return tween
        }

        function Animation(elem, properties, options) {
            var result, stopped, index = 0,
                length = animationPrefilters.length,
                deferred = jQuery.Deferred()
                .always(function() {
                    delete tick.elem
                }),
                tick = function() {
                    if (stopped) return !1;
                    for (var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index = 0, length = animation.tweens.length; length > index; index++) animation.tweens[index].run(percent);
                    return deferred.notifyWith(elem, [animation, percent, remaining]), 1 > percent && length ? remaining : (deferred.resolveWith(elem, [animation]), !1)
                },
                animation = deferred.promise({
                    elem: elem,
                    props: jQuery.extend({}, properties),
                    opts: jQuery.extend(!0, {
                        specialEasing: {}
                    }, options),
                    originalProperties: properties,
                    originalOptions: options,
                    startTime: fxNow || createFxNow(),
                    duration: options.duration,
                    tweens: [],
                    createTween: function(prop, end) {
                        var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                        return animation.tweens.push(tween), tween
                    },
                    stop: function(gotoEnd) {
                        var index = 0,
                            length = gotoEnd ? animation.tweens.length : 0;
                        if (stopped) return this;
                        for (stopped = !0; length > index; index++) animation.tweens[index].run(1);
                        return gotoEnd ? deferred.resolveWith(elem, [animation, gotoEnd]) : deferred.rejectWith(elem, [animation, gotoEnd]), this
                    }
                }),
                props = animation.props;
            for (propFilter(props, animation.opts.specialEasing); length > index; index++)
                if (result = animationPrefilters[index].call(animation, elem, props, animation.opts)) return result;
            return jQuery.map(props, createTween, animation), jQuery.isFunction(animation.opts.start) && animation.opts.start.call(elem, animation), jQuery.fx.timer(jQuery.extend(tick, {
                    elem: elem,
                    anim: animation,
                    queue: animation.opts.queue
                })), animation.progress(animation.opts.progress)
                .done(animation.opts.done, animation.opts.complete)
                .fail(animation.opts.fail)
                .always(animation.opts.always)
        }

        function propFilter(props, specialEasing) {
            var index, name, easing, value, hooks;
            for (index in props)
                if (name = jQuery.camelCase(index), easing = specialEasing[name], value = props[index], jQuery.isArray(value) && (easing = value[1], value = props[index] = value[0]), index !== name && (props[name] = value, delete props[index]), hooks = jQuery.cssHooks[name], hooks && "expand" in hooks) {
                    value = hooks.expand(value), delete props[name];
                    for (index in value) index in props || (props[index] = value[index], specialEasing[index] = easing)
                } else specialEasing[name] = easing
        }

        function defaultPrefilter(elem, props, opts) {
            var prop, value, toggle, tween, hooks, oldfire, anim = this,
                orig = {},
                style = elem.style,
                hidden = elem.nodeType && isHidden(elem),
                dataShow = jQuery._data(elem, "fxshow");
            opts.queue || (hooks = jQuery._queueHooks(elem, "fx"), null == hooks.unqueued && (hooks.unqueued = 0, oldfire = hooks.empty.fire, hooks.empty.fire = function() {
                hooks.unqueued || oldfire()
            }), hooks.unqueued++, anim.always(function() {
                anim.always(function() {
                    hooks.unqueued--, jQuery.queue(elem, "fx")
                        .length || hooks.empty.fire()
                })
            })), 1 === elem.nodeType && ("height" in props || "width" in props) && (opts.overflow = [style.overflow, style.overflowX, style.overflowY], "inline" === jQuery.css(elem, "display") && "none" === jQuery.css(elem, "float") && (jQuery.support.inlineBlockNeedsLayout && "inline" !== css_defaultDisplay(elem.nodeName) ? style.zoom = 1 : style.display = "inline-block")), opts.overflow && (style.overflow = "hidden", jQuery.support.shrinkWrapBlocks || anim.always(function() {
                style.overflow = opts.overflow[0], style.overflowX = opts.overflow[1], style.overflowY = opts.overflow[2]
            }));
            for (prop in props)
                if (value = props[prop], rfxtypes.exec(value)) {
                    if (delete props[prop], toggle = toggle || "toggle" === value, value === (hidden ? "hide" : "show")) continue;
                    orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop)
                }
            if (!jQuery.isEmptyObject(orig)) {
                dataShow ? "hidden" in dataShow && (hidden = dataShow.hidden) : dataShow = jQuery._data(elem, "fxshow", {}), toggle && (dataShow.hidden = !hidden), hidden ? jQuery(elem)
                    .show() : anim.done(function() {
                        jQuery(elem)
                            .hide()
                    }), anim.done(function() {
                        var prop;
                        jQuery._removeData(elem, "fxshow");
                        for (prop in orig) jQuery.style(elem, prop, orig[prop])
                    });
                for (prop in orig) tween = createTween(hidden ? dataShow[prop] : 0, prop, anim), prop in dataShow || (dataShow[prop] = tween.start, hidden && (tween.end = tween.start, tween.start = "width" === prop || "height" === prop ? 1 : 0))
            }
        }

        function Tween(elem, options, prop, end, easing) {
            return new Tween.prototype.init(elem, options, prop, end, easing)
        }

        function genFx(type, includeWidth) {
            var which, attrs = {
                    height: type
                },
                i = 0;
            for (includeWidth = includeWidth ? 1 : 0; 4 > i; i += 2 - includeWidth) which = cssExpand[i], attrs["margin" + which] = attrs["padding" + which] = type;
            return includeWidth && (attrs.opacity = attrs.width = type), attrs
        }

        function getWindow(elem) {
            return jQuery.isWindow(elem) ? elem : 9 === elem.nodeType ? elem.defaultView || elem.parentWindow : !1
        }
        var readyList, rootjQuery, core_strundefined = typeof undefined,
            location = window.location,
            document = window.document,
            docElem = document.documentElement,
            _jQuery = window.jQuery,
            _$ = window.$,
            class2type = {},
            core_deletedIds = [],
            core_version = "1.10.2",
            core_concat = core_deletedIds.concat,
            core_push = core_deletedIds.push,
            core_slice = core_deletedIds.slice,
            core_indexOf = core_deletedIds.indexOf,
            core_toString = class2type.toString,
            core_hasOwn = class2type.hasOwnProperty,
            core_trim = core_version.trim,
            jQuery = function(selector, context) {
                return new jQuery.fn.init(selector, context, rootjQuery)
            },
            core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            core_rnotwhite = /\S+/g,
            rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
            rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
            rvalidchars = /^[\],:{}\s]*$/,
            rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
            rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
            rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
            rmsPrefix = /^-ms-/,
            rdashAlpha = /-([\da-z])/gi,
            fcamelCase = function(all, letter) {
                return letter.toUpperCase()
            },
            completed = function(event) {
                (document.addEventListener || "load" === event.type || "complete" === document.readyState) && (detach(), jQuery.ready())
            },
            detach = function() {
                document.addEventListener ? (document.removeEventListener("DOMContentLoaded", completed, !1), window.removeEventListener("load", completed, !1)) : (document.detachEvent("onreadystatechange", completed), window.detachEvent("onload", completed))
            };
        jQuery.fn = jQuery.prototype = {
                jquery: core_version,
                constructor: jQuery,
                init: function(selector, context, rootjQuery) {
                    var match, elem;
                    if (!selector) return this;
                    if ("string" == typeof selector) {
                        if (match = "<" === selector.charAt(0) && ">" === selector.charAt(selector.length - 1) && selector.length >= 3 ? [null, selector, null] : rquickExpr.exec(selector), !match || !match[1] && context) return !context || context.jquery ? (context || rootjQuery)
                            .find(selector) : this.constructor(context)
                            .find(selector);
                        if (match[1]) {
                            if (context = context instanceof jQuery ? context[0] : context, jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, !0)), rsingleTag.test(match[1]) && jQuery.isPlainObject(context))
                                for (match in context) jQuery.isFunction(this[match]) ? this[match](context[match]) : this.attr(match, context[match]);
                            return this
                        }
                        if (elem = document.getElementById(match[2]), elem && elem.parentNode) {
                            if (elem.id !== match[2]) return rootjQuery.find(selector);
                            this.length = 1, this[0] = elem
                        }
                        return this.context = document, this.selector = selector, this
                    }
                    return selector.nodeType ? (this.context = this[0] = selector, this.length = 1, this) : jQuery.isFunction(selector) ? rootjQuery.ready(selector) : (selector.selector !== undefined && (this.selector = selector.selector, this.context = selector.context), jQuery.makeArray(selector, this))
                },
                selector: "",
                length: 0,
                toArray: function() {
                    return core_slice.call(this)
                },
                get: function(num) {
                    return null == num ? this.toArray() : 0 > num ? this[this.length + num] : this[num]
                },
                pushStack: function(elems) {
                    var ret = jQuery.merge(this.constructor(), elems);
                    return ret.prevObject = this, ret.context = this.context, ret
                },
                each: function(callback, args) {
                    return jQuery.each(this, callback, args)
                },
                ready: function(fn) {
                    return jQuery.ready.promise()
                        .done(fn), this
                },
                slice: function() {
                    return this.pushStack(core_slice.apply(this, arguments))
                },
                first: function() {
                    return this.eq(0)
                },
                last: function() {
                    return this.eq(-1)
                },
                eq: function(i) {
                    var len = this.length,
                        j = +i + (0 > i ? len : 0);
                    return this.pushStack(j >= 0 && len > j ? [this[j]] : [])
                },
                map: function(callback) {
                    return this.pushStack(jQuery.map(this, function(elem, i) {
                        return callback.call(elem, i, elem)
                    }))
                },
                end: function() {
                    return this.prevObject || this.constructor(null)
                },
                push: core_push,
                sort: [].sort,
                splice: [].splice
            }, jQuery.fn.init.prototype = jQuery.fn, jQuery.extend = jQuery.fn.extend = function() {
                var src, copyIsArray, copy, name, options, clone, target = arguments[0] || {},
                    i = 1,
                    length = arguments.length,
                    deep = !1;
                for ("boolean" == typeof target && (deep = target, target = arguments[1] || {}, i = 2), "object" == typeof target || jQuery.isFunction(target) || (target = {}), length === i && (target = this, --i); length > i; i++)
                    if (null != (options = arguments[i]))
                        for (name in options) src = target[name], copy = options[name], target !== copy && (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy))) ? (copyIsArray ? (copyIsArray = !1, clone = src && jQuery.isArray(src) ? src : []) : clone = src && jQuery.isPlainObject(src) ? src : {}, target[name] = jQuery.extend(deep, clone, copy)) : copy !== undefined && (target[name] = copy));
                return target
            }, jQuery.extend({
                expando: "jQuery" + (core_version + Math.random())
                    .replace(/\D/g, ""),
                noConflict: function(deep) {
                    return window.$ === jQuery && (window.$ = _$), deep && window.jQuery === jQuery && (window.jQuery = _jQuery), jQuery
                },
                isReady: !1,
                readyWait: 1,
                holdReady: function(hold) {
                    hold ? jQuery.readyWait++ : jQuery.ready(!0)
                },
                ready: function(wait) {
                    if (wait === !0 ? !--jQuery.readyWait : !jQuery.isReady) {
                        if (!document.body) return setTimeout(jQuery.ready);
                        jQuery.isReady = !0, wait !== !0 && --jQuery.readyWait > 0 || (readyList.resolveWith(document, [jQuery]), jQuery.fn.trigger && jQuery(document)
                            .trigger("ready")
                            .off("ready"))
                    }
                },
                isFunction: function(obj) {
                    return "function" === jQuery.type(obj)
                },
                isArray: Array.isArray || function(obj) {
                    return "array" === jQuery.type(obj)
                },
                isWindow: function(obj) {
                    return null != obj && obj == obj.window
                },
                isNumeric: function(obj) {
                    return !isNaN(parseFloat(obj)) && isFinite(obj)
                },
                type: function(obj) {
                    return null == obj ? String(obj) : "object" == typeof obj || "function" == typeof obj ? class2type[core_toString.call(obj)] || "object" : typeof obj
                },
                isPlainObject: function(obj) {
                    var key;
                    if (!obj || "object" !== jQuery.type(obj) || obj.nodeType || jQuery.isWindow(obj)) return !1;
                    try {
                        if (obj.constructor && !core_hasOwn.call(obj, "constructor") && !core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) return !1
                    } catch (e) {
                        return !1
                    }
                    if (jQuery.support.ownLast)
                        for (key in obj) return core_hasOwn.call(obj, key);
                    for (key in obj);
                    return key === undefined || core_hasOwn.call(obj, key)
                },
                isEmptyObject: function(obj) {
                    var name;
                    for (name in obj) return !1;
                    return !0
                },
                error: function(msg) {
                    throw new Error(msg)
                },
                parseHTML: function(data, context, keepScripts) {
                    if (!data || "string" != typeof data) return null;
                    "boolean" == typeof context && (keepScripts = context, context = !1), context = context || document;
                    var parsed = rsingleTag.exec(data),
                        scripts = !keepScripts && [];
                    return parsed ? [context.createElement(parsed[1])] : (parsed = jQuery.buildFragment([data], context, scripts), scripts && jQuery(scripts)
                        .remove(), jQuery.merge([], parsed.childNodes))
                },
                parseJSON: function(data) {
                    return window.JSON && window.JSON.parse ? window.JSON.parse(data) : null === data ? data : "string" == typeof data && (data = jQuery.trim(data), data && rvalidchars.test(data.replace(rvalidescape, "@")
                        .replace(rvalidtokens, "]")
                        .replace(rvalidbraces, ""))) ? new Function("return " + data)() : void jQuery.error("Invalid JSON: " + data)
                },
                parseXML: function(data) {
                    var xml, tmp;
                    if (!data || "string" != typeof data) return null;
                    try {
                        window.DOMParser ? (tmp = new DOMParser, xml = tmp.parseFromString(data, "text/xml")) : (xml = new ActiveXObject("Microsoft.XMLDOM"), xml.async = "false", xml.loadXML(data))
                    } catch (e) {
                        xml = undefined
                    }
                    return xml && xml.documentElement && !xml.getElementsByTagName("parsererror")
                        .length || jQuery.error("Invalid XML: " + data), xml
                },
                noop: function() {},
                globalEval: function(data) {
                    data && jQuery.trim(data) && (window.execScript || function(data) {
                        window.eval.call(window, data)
                    })(data)
                },
                camelCase: function(string) {
                    return string.replace(rmsPrefix, "ms-")
                        .replace(rdashAlpha, fcamelCase)
                },
                nodeName: function(elem, name) {
                    return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase()
                },
                each: function(obj, callback, args) {
                    var value, i = 0,
                        length = obj.length,
                        isArray = isArraylike(obj);
                    if (args) {
                        if (isArray)
                            for (; length > i && (value = callback.apply(obj[i], args), value !== !1); i++);
                        else
                            for (i in obj)
                                if (value = callback.apply(obj[i], args), value === !1) break
                    } else if (isArray)
                        for (; length > i && (value = callback.call(obj[i], i, obj[i]), value !== !1); i++);
                    else
                        for (i in obj)
                            if (value = callback.call(obj[i], i, obj[i]), value === !1) break; return obj
                },
                trim: core_trim && !core_trim.call("п»їВ ") ? function(text) {
                    return null == text ? "" : core_trim.call(text)
                } : function(text) {
                    return null == text ? "" : (text + "")
                        .replace(rtrim, "")
                },
                makeArray: function(arr, results) {
                    var ret = results || [];
                    return null != arr && (isArraylike(Object(arr)) ? jQuery.merge(ret, "string" == typeof arr ? [arr] : arr) : core_push.call(ret, arr)), ret
                },
                inArray: function(elem, arr, i) {
                    var len;
                    if (arr) {
                        if (core_indexOf) return core_indexOf.call(arr, elem, i);
                        for (len = arr.length, i = i ? 0 > i ? Math.max(0, len + i) : i : 0; len > i; i++)
                            if (i in arr && arr[i] === elem) return i
                    }
                    return -1
                },
                merge: function(first, second) {
                    var l = second.length,
                        i = first.length,
                        j = 0;
                    if ("number" == typeof l)
                        for (; l > j; j++) first[i++] = second[j];
                    else
                        for (; second[j] !== undefined;) first[i++] = second[j++];
                    return first.length = i, first
                },
                grep: function(elems, callback, inv) {
                    var retVal, ret = [],
                        i = 0,
                        length = elems.length;
                    for (inv = !!inv; length > i; i++) retVal = !!callback(elems[i], i), inv !== retVal && ret.push(elems[i]);
                    return ret
                },
                map: function(elems, callback, arg) {
                    var value, i = 0,
                        length = elems.length,
                        isArray = isArraylike(elems),
                        ret = [];
                    if (isArray)
                        for (; length > i; i++) value = callback(elems[i], i, arg), null != value && (ret[ret.length] = value);
                    else
                        for (i in elems) value = callback(elems[i], i, arg), null != value && (ret[ret.length] = value);
                    return core_concat.apply([], ret)
                },
                guid: 1,
                proxy: function(fn, context) {
                    var args, proxy, tmp;
                    return "string" == typeof context && (tmp = fn[context], context = fn, fn = tmp), jQuery.isFunction(fn) ? (args = core_slice.call(arguments, 2), proxy = function() {
                        return fn.apply(context || this, args.concat(core_slice.call(arguments)))
                    }, proxy.guid = fn.guid = fn.guid || jQuery.guid++, proxy) : undefined
                },
                access: function(elems, fn, key, value, chainable, emptyGet, raw) {
                    var i = 0,
                        length = elems.length,
                        bulk = null == key;
                    if ("object" === jQuery.type(key)) {
                        chainable = !0;
                        for (i in key) jQuery.access(elems, fn, i, key[i], !0, emptyGet, raw)
                    } else if (value !== undefined && (chainable = !0, jQuery.isFunction(value) || (raw = !0), bulk && (raw ? (fn.call(elems, value), fn = null) : (bulk = fn, fn = function(elem, key, value) {
                            return bulk.call(jQuery(elem), value)
                        })), fn))
                        for (; length > i; i++) fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
                    return chainable ? elems : bulk ? fn.call(elems) : length ? fn(elems[0], key) : emptyGet
                },
                now: function() {
                    return (new Date)
                        .getTime()
                },
                swap: function(elem, options, callback, args) {
                    var ret, name, old = {};
                    for (name in options) old[name] = elem.style[name], elem.style[name] = options[name];
                    ret = callback.apply(elem, args || []);
                    for (name in options) elem.style[name] = old[name];
                    return ret
                }
            }), jQuery.ready.promise = function(obj) {
                if (!readyList)
                    if (readyList = jQuery.Deferred(), "complete" === document.readyState) setTimeout(jQuery.ready);
                    else if (document.addEventListener) document.addEventListener("DOMContentLoaded", completed, !1), window.addEventListener("load", completed, !1);
                else {
                    document.attachEvent("onreadystatechange", completed), window.attachEvent("onload", completed);
                    var top = !1;
                    try {
                        top = null == window.frameElement && document.documentElement
                    } catch (e) {}
                    top && top.doScroll && ! function doScrollCheck() {
                        if (!jQuery.isReady) {
                            try {
                                top.doScroll("left")
                            } catch (e) {
                                return setTimeout(doScrollCheck, 50)
                            }
                            detach(), jQuery.ready()
                        }
                    }()
                }
                return readyList.promise(obj)
            }, jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
                class2type["[object " + name + "]"] = name.toLowerCase()
            }), rootjQuery = jQuery(document),
            function(window, undefined) {
                function Sizzle(selector, context, results, seed) {
                    var match, elem, m, nodeType, i, groups, old, nid, newContext, newSelector;
                    if ((context ? context.ownerDocument || context : preferredDoc) !== document && setDocument(context), context = context || document, results = results || [], !selector || "string" != typeof selector) return results;
                    if (1 !== (nodeType = context.nodeType) && 9 !== nodeType) return [];
                    if (documentIsHTML && !seed) {
                        if (match = rquickExpr.exec(selector))
                            if (m = match[1]) {
                                if (9 === nodeType) {
                                    if (elem = context.getElementById(m), !elem || !elem.parentNode) return results;
                                    if (elem.id === m) return results.push(elem), results
                                } else if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) return results.push(elem), results
                            } else {
                                if (match[2]) return push.apply(results, context.getElementsByTagName(selector)), results;
                                if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) return push.apply(results, context.getElementsByClassName(m)), results
                            }
                        if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                            if (nid = old = expando, newContext = context, newSelector = 9 === nodeType && selector, 1 === nodeType && "object" !== context.nodeName.toLowerCase()) {
                                for (groups = tokenize(selector), (old = context.getAttribute("id")) ? nid = old.replace(rescape, "\\$&") : context.setAttribute("id", nid), nid = "[id='" + nid + "'] ", i = groups.length; i--;) groups[i] = nid + toSelector(groups[i]);
                                newContext = rsibling.test(selector) && context.parentNode || context, newSelector = groups.join(",")
                            }
                            if (newSelector) try {
                                return push.apply(results, newContext.querySelectorAll(newSelector)), results
                            } catch (qsaError) {} finally {
                                old || context.removeAttribute("id")
                            }
                        }
                    }
                    return select(selector.replace(rtrim, "$1"), context, results, seed)
                }

                function createCache() {
                    function cache(key, value) {
                        return keys.push(key += " ") > Expr.cacheLength && delete cache[keys.shift()], cache[key] = value
                    }
                    var keys = [];
                    return cache
                }

                function markFunction(fn) {
                    return fn[expando] = !0, fn
                }

                function assert(fn) {
                    var div = document.createElement("div");
                    try {
                        return !!fn(div)
                    } catch (e) {
                        return !1
                    } finally {
                        div.parentNode && div.parentNode.removeChild(div), div = null
                    }
                }

                function addHandle(attrs, handler) {
                    for (var arr = attrs.split("|"), i = attrs.length; i--;) Expr.attrHandle[arr[i]] = handler
                }

                function siblingCheck(a, b) {
                    var cur = b && a,
                        diff = cur && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
                    if (diff) return diff;
                    if (cur)
                        for (; cur = cur.nextSibling;)
                            if (cur === b) return -1;
                    return a ? 1 : -1
                }

                function createInputPseudo(type) {
                    return function(elem) {
                        var name = elem.nodeName.toLowerCase();
                        return "input" === name && elem.type === type
                    }
                }

                function createButtonPseudo(type) {
                    return function(elem) {
                        var name = elem.nodeName.toLowerCase();
                        return ("input" === name || "button" === name) && elem.type === type
                    }
                }

                function createPositionalPseudo(fn) {
                    return markFunction(function(argument) {
                        return argument = +argument, markFunction(function(seed, matches) {
                            for (var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length; i--;) seed[j = matchIndexes[i]] && (seed[j] = !(matches[j] = seed[j]))
                        })
                    })
                }

                function setFilters() {}

                function tokenize(selector, parseOnly) {
                    var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
                    if (cached) return parseOnly ? 0 : cached.slice(0);
                    for (soFar = selector, groups = [], preFilters = Expr.preFilter; soFar;) {
                        (!matched || (match = rcomma.exec(soFar))) && (match && (soFar = soFar.slice(match[0].length) || soFar), groups.push(tokens = [])), matched = !1, (match = rcombinators.exec(soFar)) && (matched = match.shift(), tokens.push({
                            value: matched,
                            type: match[0].replace(rtrim, " ")
                        }), soFar = soFar.slice(matched.length));
                        for (type in Expr.filter) !(match = matchExpr[type].exec(soFar)) || preFilters[type] && !(match = preFilters[type](match)) || (matched = match.shift(), tokens.push({
                            value: matched,
                            type: type,
                            matches: match
                        }), soFar = soFar.slice(matched.length));
                        if (!matched) break
                    }
                    return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups)
                        .slice(0)
                }

                function toSelector(tokens) {
                    for (var i = 0, len = tokens.length, selector = ""; len > i; i++) selector += tokens[i].value;
                    return selector
                }

                function addCombinator(matcher, combinator, base) {
                    var dir = combinator.dir,
                        checkNonElements = base && "parentNode" === dir,
                        doneName = done++;
                    return combinator.first ? function(elem, context, xml) {
                        for (; elem = elem[dir];)
                            if (1 === elem.nodeType || checkNonElements) return matcher(elem, context, xml)
                    } : function(elem, context, xml) {
                        var data, cache, outerCache, dirkey = dirruns + " " + doneName;
                        if (xml) {
                            for (; elem = elem[dir];)
                                if ((1 === elem.nodeType || checkNonElements) && matcher(elem, context, xml)) return !0
                        } else
                            for (; elem = elem[dir];)
                                if (1 === elem.nodeType || checkNonElements)
                                    if (outerCache = elem[expando] || (elem[expando] = {}), (cache = outerCache[dir]) && cache[0] === dirkey) {
                                        if ((data = cache[1]) === !0 || data === cachedruns) return data === !0
                                    } else if (cache = outerCache[dir] = [dirkey], cache[1] = matcher(elem, context, xml) || cachedruns, cache[1] === !0) return !0
                    }
                }

                function elementMatcher(matchers) {
                    return matchers.length > 1 ? function(elem, context, xml) {
                        for (var i = matchers.length; i--;)
                            if (!matchers[i](elem, context, xml)) return !1;
                        return !0
                    } : matchers[0]
                }

                function condense(unmatched, map, filter, context, xml) {
                    for (var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = null != map; len > i; i++)(elem = unmatched[i]) && (!filter || filter(elem, context, xml)) && (newUnmatched.push(elem), mapped && map.push(i));
                    return newUnmatched
                }

                function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
                    return postFilter && !postFilter[expando] && (postFilter = setMatcher(postFilter)), postFinder && !postFinder[expando] && (postFinder = setMatcher(postFinder, postSelector)), markFunction(function(seed, results, context, xml) {
                        var temp, i, elem, preMap = [],
                            postMap = [],
                            preexisting = results.length,
                            elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),
                            matcherIn = !preFilter || !seed && selector ? elems : condense(elems, preMap, preFilter, context, xml),
                            matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
                        if (matcher && matcher(matcherIn, matcherOut, context, xml), postFilter)
                            for (temp = condense(matcherOut, postMap), postFilter(temp, [], context, xml), i = temp.length; i--;)(elem = temp[i]) && (matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem));
                        if (seed) {
                            if (postFinder || preFilter) {
                                if (postFinder) {
                                    for (temp = [], i = matcherOut.length; i--;)(elem = matcherOut[i]) && temp.push(matcherIn[i] = elem);
                                    postFinder(null, matcherOut = [], temp, xml)
                                }
                                for (i = matcherOut.length; i--;)(elem = matcherOut[i]) && (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1 && (seed[temp] = !(results[temp] = elem))
                            }
                        } else matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut), postFinder ? postFinder(null, results, matcherOut, xml) : push.apply(results, matcherOut)
                    })
                }

                function matcherFromTokens(tokens) {
                    for (var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i = leadingRelative ? 1 : 0, matchContext = addCombinator(function(elem) {
                            return elem === checkContext
                        }, implicitRelative, !0), matchAnyContext = addCombinator(function(elem) {
                            return indexOf.call(checkContext, elem) > -1
                        }, implicitRelative, !0), matchers = [function(elem, context, xml) {
                            return !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context)
                                .nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml))
                        }]; len > i; i++)
                        if (matcher = Expr.relative[tokens[i].type]) matchers = [addCombinator(elementMatcher(matchers), matcher)];
                        else {
                            if (matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches), matcher[expando]) {
                                for (j = ++i; len > j && !Expr.relative[tokens[j].type]; j++);
                                return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1)
                                        .concat({
                                            value: " " === tokens[i - 2].type ? "*" : ""
                                        }))
                                    .replace(rtrim, "$1"), matcher, j > i && matcherFromTokens(tokens.slice(i, j)), len > j && matcherFromTokens(tokens = tokens.slice(j)), len > j && toSelector(tokens))
                            }
                            matchers.push(matcher)
                        }
                    return elementMatcher(matchers)
                }

                function matcherFromGroupMatchers(elementMatchers, setMatchers) {
                    var matcherCachedRuns = 0,
                        bySet = setMatchers.length > 0,
                        byElement = elementMatchers.length > 0,
                        superMatcher = function(seed, context, xml, results, expandContext) {
                            var elem, j, matcher, setMatched = [],
                                matchedCount = 0,
                                i = "0",
                                unmatched = seed && [],
                                outermost = null != expandContext,
                                contextBackup = outermostContext,
                                elems = seed || byElement && Expr.find.TAG("*", expandContext && context.parentNode || context),
                                dirrunsUnique = dirruns += null == contextBackup ? 1 : Math.random() || .1;
                            for (outermost && (outermostContext = context !== document && context, cachedruns = matcherCachedRuns); null != (elem = elems[i]); i++) {
                                if (byElement && elem) {
                                    for (j = 0; matcher = elementMatchers[j++];)
                                        if (matcher(elem, context, xml)) {
                                            results.push(elem);
                                            break
                                        }
                                    outermost && (dirruns = dirrunsUnique, cachedruns = ++matcherCachedRuns)
                                }
                                bySet && ((elem = !matcher && elem) && matchedCount--, seed && unmatched.push(elem))
                            }
                            if (matchedCount += i, bySet && i !== matchedCount) {
                                for (j = 0; matcher = setMatchers[j++];) matcher(unmatched, setMatched, context, xml);
                                if (seed) {
                                    if (matchedCount > 0)
                                        for (; i--;) unmatched[i] || setMatched[i] || (setMatched[i] = pop.call(results));
                                    setMatched = condense(setMatched)
                                }
                                push.apply(results, setMatched), outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1 && Sizzle.uniqueSort(results)
                            }
                            return outermost && (dirruns = dirrunsUnique, outermostContext = contextBackup), unmatched
                        };
                    return bySet ? markFunction(superMatcher) : superMatcher
                }

                function multipleContexts(selector, contexts, results) {
                    for (var i = 0, len = contexts.length; len > i; i++) Sizzle(selector, contexts[i], results);
                    return results
                }

                function select(selector, context, results, seed) {
                    var i, tokens, token, type, find, match = tokenize(selector);
                    if (!seed && 1 === match.length) {
                        if (tokens = match[0] = match[0].slice(0), tokens.length > 2 && "ID" === (token = tokens[0])
                            .type && support.getById && 9 === context.nodeType && documentIsHTML && Expr.relative[tokens[1].type]) {
                            if (context = (Expr.find.ID(token.matches[0].replace(runescape, funescape), context) || [])[0], !context) return results;
                            selector = selector.slice(tokens.shift()
                                .value.length)
                        }
                        for (i = matchExpr.needsContext.test(selector) ? 0 : tokens.length; i-- && (token = tokens[i], !Expr.relative[type = token.type]);)
                            if ((find = Expr.find[type]) && (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && context.parentNode || context))) {
                                if (tokens.splice(i, 1), selector = seed.length && toSelector(tokens), !selector) return push.apply(results, seed), results;
                                break
                            }
                    }
                    return compile(selector, match)(seed, context, !documentIsHTML, results, rsibling.test(selector)), results
                }
                var i, support, cachedruns, Expr, getText, isXML, compile, outermostContext, sortInput, setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando = "sizzle" + -new Date,
                    preferredDoc = window.document,
                    dirruns = 0,
                    done = 0,
                    classCache = createCache(),
                    tokenCache = createCache(),
                    compilerCache = createCache(),
                    hasDuplicate = !1,
                    sortOrder = function(a, b) {
                        return a === b ? (hasDuplicate = !0, 0) : 0
                    },
                    strundefined = typeof undefined,
                    MAX_NEGATIVE = 1 << 31,
                    hasOwn = {}.hasOwnProperty,
                    arr = [],
                    pop = arr.pop,
                    push_native = arr.push,
                    push = arr.push,
                    slice = arr.slice,
                    indexOf = arr.indexOf || function(elem) {
                        for (var i = 0, len = this.length; len > i; i++)
                            if (this[i] === elem) return i;
                        return -1
                    },
                    booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                    whitespace = "[\\x20\\t\\r\\n\\f]",
                    characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                    identifier = characterEncoding.replace("w", "w#"),
                    attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace + "*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",
                    pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace(3, 8) + ")*)|.*)\\)|)",
                    rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
                    rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
                    rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
                    rsibling = new RegExp(whitespace + "*[+~]"),
                    rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*)" + whitespace + "*\\]", "g"),
                    rpseudo = new RegExp(pseudos),
                    ridentifier = new RegExp("^" + identifier + "$"),
                    matchExpr = {
                        ID: new RegExp("^#(" + characterEncoding + ")"),
                        CLASS: new RegExp("^\\.(" + characterEncoding + ")"),
                        TAG: new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
                        ATTR: new RegExp("^" + attributes),
                        PSEUDO: new RegExp("^" + pseudos),
                        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
                        bool: new RegExp("^(?:" + booleans + ")$", "i"),
                        needsContext: new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
                    },
                    rnative = /^[^{]+\{\s*\[native \w/,
                    rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                    rinputs = /^(?:input|select|textarea|button)$/i,
                    rheader = /^h\d$/i,
                    rescape = /'|\\/g,
                    runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
                    funescape = function(_, escaped, escapedWhitespace) {
                        var high = "0x" + escaped - 65536;
                        return high !== high || escapedWhitespace ? escaped : 0 > high ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, 1023 & high | 56320)
                    };
                try {
                    push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes), arr[preferredDoc.childNodes.length].nodeType
                } catch (e) {
                    push = {
                        apply: arr.length ? function(target, els) {
                            push_native.apply(target, slice.call(els))
                        } : function(target, els) {
                            for (var j = target.length, i = 0; target[j++] = els[i++];);
                            target.length = j - 1
                        }
                    }
                }
                isXML = Sizzle.isXML = function(elem) {
                    var documentElement = elem && (elem.ownerDocument || elem)
                        .documentElement;
                    return documentElement ? "HTML" !== documentElement.nodeName : !1
                }, support = Sizzle.support = {}, setDocument = Sizzle.setDocument = function(node) {
                    var doc = node ? node.ownerDocument || node : preferredDoc,
                        parent = doc.defaultView;
                    return doc !== document && 9 === doc.nodeType && doc.documentElement ? (document = doc, docElem = doc.documentElement, documentIsHTML = !isXML(doc), parent && parent.attachEvent && parent !== parent.top && parent.attachEvent("onbeforeunload", function() {
                        setDocument()
                    }), support.attributes = assert(function(div) {
                        return div.className = "i", !div.getAttribute("className")
                    }), support.getElementsByTagName = assert(function(div) {
                        return div.appendChild(doc.createComment("")), !div.getElementsByTagName("*")
                            .length
                    }), support.getElementsByClassName = assert(function(div) {
                        return div.innerHTML = "<div class='a'></div><div class='a i'></div>", div.firstChild.className = "i", 2 === div.getElementsByClassName("i")
                            .length
                    }), support.getById = assert(function(div) {
                        return docElem.appendChild(div)
                            .id = expando, !doc.getElementsByName || !doc.getElementsByName(expando)
                            .length
                    }), support.getById ? (Expr.find.ID = function(id, context) {
                        if (typeof context.getElementById !== strundefined && documentIsHTML) {
                            var m = context.getElementById(id);
                            return m && m.parentNode ? [m] : []
                        }
                    }, Expr.filter.ID = function(id) {
                        var attrId = id.replace(runescape, funescape);
                        return function(elem) {
                            return elem.getAttribute("id") === attrId
                        }
                    }) : (delete Expr.find.ID, Expr.filter.ID = function(id) {
                        var attrId = id.replace(runescape, funescape);
                        return function(elem) {
                            var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
                            return node && node.value === attrId
                        }
                    }), Expr.find.TAG = support.getElementsByTagName ? function(tag, context) {
                        return typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName(tag) : void 0
                    } : function(tag, context) {
                        var elem, tmp = [],
                            i = 0,
                            results = context.getElementsByTagName(tag);
                        if ("*" === tag) {
                            for (; elem = results[i++];) 1 === elem.nodeType && tmp.push(elem);
                            return tmp
                        }
                        return results
                    }, Expr.find.CLASS = support.getElementsByClassName && function(className, context) {
                        return typeof context.getElementsByClassName !== strundefined && documentIsHTML ? context.getElementsByClassName(className) : void 0
                    }, rbuggyMatches = [], rbuggyQSA = [], (support.qsa = rnative.test(doc.querySelectorAll)) && (assert(function(div) {
                        div.innerHTML = "<select><option selected=''></option></select>", div.querySelectorAll("[selected]")
                            .length || rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")"), div.querySelectorAll(":checked")
                            .length || rbuggyQSA.push(":checked")
                    }), assert(function(div) {
                        var input = doc.createElement("input");
                        input.setAttribute("type", "hidden"), div.appendChild(input)
                            .setAttribute("t", ""), div.querySelectorAll("[t^='']")
                            .length && rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")"), div.querySelectorAll(":enabled")
                            .length || rbuggyQSA.push(":enabled", ":disabled"), div.querySelectorAll("*,:x"), rbuggyQSA.push(",.*:")
                    })), (support.matchesSelector = rnative.test(matches = docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) && assert(function(div) {
                        support.disconnectedMatch = matches.call(div, "div"), matches.call(div, "[s!='']:x"), rbuggyMatches.push("!=", pseudos)
                    }), rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|")), rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|")), contains = rnative.test(docElem.contains) || docElem.compareDocumentPosition ? function(a, b) {
                        var adown = 9 === a.nodeType ? a.documentElement : a,
                            bup = b && b.parentNode;
                        return a === bup || !(!bup || 1 !== bup.nodeType || !(adown.contains ? adown.contains(bup) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(bup)))
                    } : function(a, b) {
                        if (b)
                            for (; b = b.parentNode;)
                                if (b === a) return !0;
                        return !1
                    }, sortOrder = docElem.compareDocumentPosition ? function(a, b) {
                        if (a === b) return hasDuplicate = !0, 0;
                        var compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition(b);
                        return compare ? 1 & compare || !support.sortDetached && b.compareDocumentPosition(a) === compare ? a === doc || contains(preferredDoc, a) ? -1 : b === doc || contains(preferredDoc, b) ? 1 : sortInput ? indexOf.call(sortInput, a) - indexOf.call(sortInput, b) : 0 : 4 & compare ? -1 : 1 : a.compareDocumentPosition ? -1 : 1
                    } : function(a, b) {
                        var cur, i = 0,
                            aup = a.parentNode,
                            bup = b.parentNode,
                            ap = [a],
                            bp = [b];
                        if (a === b) return hasDuplicate = !0, 0;
                        if (!aup || !bup) return a === doc ? -1 : b === doc ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf.call(sortInput, a) - indexOf.call(sortInput, b) : 0;
                        if (aup === bup) return siblingCheck(a, b);
                        for (cur = a; cur = cur.parentNode;) ap.unshift(cur);
                        for (cur = b; cur = cur.parentNode;) bp.unshift(cur);
                        for (; ap[i] === bp[i];) i++;
                        return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0
                    }, doc) : document
                }, Sizzle.matches = function(expr, elements) {
                    return Sizzle(expr, null, null, elements)
                }, Sizzle.matchesSelector = function(elem, expr) {
                    if ((elem.ownerDocument || elem) !== document && setDocument(elem), expr = expr.replace(rattributeQuotes, "='$1']"), !(!support.matchesSelector || !documentIsHTML || rbuggyMatches && rbuggyMatches.test(expr) || rbuggyQSA && rbuggyQSA.test(expr))) try {
                        var ret = matches.call(elem, expr);
                        if (ret || support.disconnectedMatch || elem.document && 11 !== elem.document.nodeType) return ret
                    } catch (e) {}
                    return Sizzle(expr, document, null, [elem])
                        .length > 0
                }, Sizzle.contains = function(context, elem) {
                    return (context.ownerDocument || context) !== document && setDocument(context), contains(context, elem)
                }, Sizzle.attr = function(elem, name) {
                    (elem.ownerDocument || elem) !== document && setDocument(elem);
                    var fn = Expr.attrHandle[name.toLowerCase()],
                        val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;
                    return val === undefined ? support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null : val
                }, Sizzle.error = function(msg) {
                    throw new Error("Syntax error, unrecognized expression: " + msg)
                }, Sizzle.uniqueSort = function(results) {
                    var elem, duplicates = [],
                        j = 0,
                        i = 0;
                    if (hasDuplicate = !support.detectDuplicates, sortInput = !support.sortStable && results.slice(0), results.sort(sortOrder), hasDuplicate) {
                        for (; elem = results[i++];) elem === results[i] && (j = duplicates.push(i));
                        for (; j--;) results.splice(duplicates[j], 1)
                    }
                    return results
                }, getText = Sizzle.getText = function(elem) {
                    var node, ret = "",
                        i = 0,
                        nodeType = elem.nodeType;
                    if (nodeType) {
                        if (1 === nodeType || 9 === nodeType || 11 === nodeType) {
                            if ("string" == typeof elem.textContent) return elem.textContent;
                            for (elem = elem.firstChild; elem; elem = elem.nextSibling) ret += getText(elem)
                        } else if (3 === nodeType || 4 === nodeType) return elem.nodeValue
                    } else
                        for (; node = elem[i]; i++) ret += getText(node);
                    return ret
                }, Expr = Sizzle.selectors = {
                    cacheLength: 50,
                    createPseudo: markFunction,
                    match: matchExpr,
                    attrHandle: {},
                    find: {},
                    relative: {
                        ">": {
                            dir: "parentNode",
                            first: !0
                        },
                        " ": {
                            dir: "parentNode"
                        },
                        "+": {
                            dir: "previousSibling",
                            first: !0
                        },
                        "~": {
                            dir: "previousSibling"
                        }
                    },
                    preFilter: {
                        ATTR: function(match) {
                            return match[1] = match[1].replace(runescape, funescape), match[3] = (match[4] || match[5] || "")
                                .replace(runescape, funescape), "~=" === match[2] && (match[3] = " " + match[3] + " "), match.slice(0, 4)
                        },
                        CHILD: function(match) {
                            return match[1] = match[1].toLowerCase(), "nth" === match[1].slice(0, 3) ? (match[3] || Sizzle.error(match[0]), match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * ("even" === match[3] || "odd" === match[3])), match[5] = +(match[7] + match[8] || "odd" === match[3])) : match[3] && Sizzle.error(match[0]), match
                        },
                        PSEUDO: function(match) {
                            var excess, unquoted = !match[5] && match[2];
                            return matchExpr.CHILD.test(match[0]) ? null : (match[3] && match[4] !== undefined ? match[2] = match[4] : unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, !0)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length) && (match[0] = match[0].slice(0, excess), match[2] = unquoted.slice(0, excess)), match.slice(0, 3))
                        }
                    },
                    filter: {
                        TAG: function(nodeNameSelector) {
                            var nodeName = nodeNameSelector.replace(runescape, funescape)
                                .toLowerCase();
                            return "*" === nodeNameSelector ? function() {
                                return !0
                            } : function(elem) {
                                return elem.nodeName && elem.nodeName.toLowerCase() === nodeName
                            }
                        },
                        CLASS: function(className) {
                            var pattern = classCache[className + " "];
                            return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
                                return pattern.test("string" == typeof elem.className && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "")
                            })
                        },
                        ATTR: function(name, operator, check) {
                            return function(elem) {
                                var result = Sizzle.attr(elem, name);
                                return null == result ? "!=" === operator : operator ? (result += "", "=" === operator ? result === check : "!=" === operator ? result !== check : "^=" === operator ? check && 0 === result.indexOf(check) : "*=" === operator ? check && result.indexOf(check) > -1 : "$=" === operator ? check && result.slice(-check.length) === check : "~=" === operator ? (" " + result + " ")
                                    .indexOf(check) > -1 : "|=" === operator ? result === check || result.slice(0, check.length + 1) === check + "-" : !1) : !0
                            }
                        },
                        CHILD: function(type, what, argument, first, last) {
                            var simple = "nth" !== type.slice(0, 3),
                                forward = "last" !== type.slice(-4),
                                ofType = "of-type" === what;
                            return 1 === first && 0 === last ? function(elem) {
                                return !!elem.parentNode
                            } : function(elem, context, xml) {
                                var cache, outerCache, node, diff, nodeIndex, start, dir = simple !== forward ? "nextSibling" : "previousSibling",
                                    parent = elem.parentNode,
                                    name = ofType && elem.nodeName.toLowerCase(),
                                    useCache = !xml && !ofType;
                                if (parent) {
                                    if (simple) {
                                        for (; dir;) {
                                            for (node = elem; node = node[dir];)
                                                if (ofType ? node.nodeName.toLowerCase() === name : 1 === node.nodeType) return !1;
                                            start = dir = "only" === type && !start && "nextSibling"
                                        }
                                        return !0
                                    }
                                    if (start = [forward ? parent.firstChild : parent.lastChild], forward && useCache) {
                                        for (outerCache = parent[expando] || (parent[expando] = {}), cache = outerCache[type] || [], nodeIndex = cache[0] === dirruns && cache[1], diff = cache[0] === dirruns && cache[2], node = nodeIndex && parent.childNodes[nodeIndex]; node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop();)
                                            if (1 === node.nodeType && ++diff && node === elem) {
                                                outerCache[type] = [dirruns, nodeIndex, diff];
                                                break
                                            }
                                    } else if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) diff = cache[1];
                                    else
                                        for (;
                                            (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) && ((ofType ? node.nodeName.toLowerCase() !== name : 1 !== node.nodeType) || !++diff || (useCache && ((node[expando] || (node[expando] = {}))[type] = [dirruns, diff]), node !== elem)););
                                    return diff -= last, diff === first || diff % first === 0 && diff / first >= 0
                                }
                            }
                        },
                        PSEUDO: function(pseudo, argument) {
                            var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
                            return fn[expando] ? fn(argument) : fn.length > 1 ? (args = [pseudo, pseudo, "", argument], Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
                                for (var idx, matched = fn(seed, argument), i = matched.length; i--;) idx = indexOf.call(seed, matched[i]), seed[idx] = !(matches[idx] = matched[i])
                            }) : function(elem) {
                                return fn(elem, 0, args)
                            }) : fn
                        }
                    },
                    pseudos: {
                        not: markFunction(function(selector) {
                            var input = [],
                                results = [],
                                matcher = compile(selector.replace(rtrim, "$1"));
                            return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
                                for (var elem, unmatched = matcher(seed, null, xml, []), i = seed.length; i--;)(elem = unmatched[i]) && (seed[i] = !(matches[i] = elem))
                            }) : function(elem, context, xml) {
                                return input[0] = elem, matcher(input, null, xml, results), !results.pop()
                            }
                        }),
                        has: markFunction(function(selector) {
                            return function(elem) {
                                return Sizzle(selector, elem)
                                    .length > 0
                            }
                        }),
                        contains: markFunction(function(text) {
                            return function(elem) {
                                return (elem.textContent || elem.innerText || getText(elem))
                                    .indexOf(text) > -1
                            }
                        }),
                        lang: markFunction(function(lang) {
                            return ridentifier.test(lang || "") || Sizzle.error("unsupported lang: " + lang), lang = lang.replace(runescape, funescape)
                                .toLowerCase(),
                                function(elem) {
                                    var elemLang;
                                    do
                                        if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) return elemLang = elemLang.toLowerCase(), elemLang === lang || 0 === elemLang.indexOf(lang + "-");
                                    while ((elem = elem.parentNode) && 1 === elem.nodeType);
                                    return !1
                                }
                        }),
                        target: function(elem) {
                            var hash = window.location && window.location.hash;
                            return hash && hash.slice(1) === elem.id
                        },
                        root: function(elem) {
                            return elem === docElem
                        },
                        focus: function(elem) {
                            return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex)
                        },
                        enabled: function(elem) {
                            return elem.disabled === !1
                        },
                        disabled: function(elem) {
                            return elem.disabled === !0
                        },
                        checked: function(elem) {
                            var nodeName = elem.nodeName.toLowerCase();
                            return "input" === nodeName && !!elem.checked || "option" === nodeName && !!elem.selected
                        },
                        selected: function(elem) {
                            return elem.parentNode && elem.parentNode.selectedIndex, elem.selected === !0
                        },
                        empty: function(elem) {
                            for (elem = elem.firstChild; elem; elem = elem.nextSibling)
                                if (elem.nodeName > "@" || 3 === elem.nodeType || 4 === elem.nodeType) return !1;
                            return !0
                        },
                        parent: function(elem) {
                            return !Expr.pseudos.empty(elem)
                        },
                        header: function(elem) {
                            return rheader.test(elem.nodeName)
                        },
                        input: function(elem) {
                            return rinputs.test(elem.nodeName)
                        },
                        button: function(elem) {
                            var name = elem.nodeName.toLowerCase();
                            return "input" === name && "button" === elem.type || "button" === name
                        },
                        text: function(elem) {
                            var attr;
                            return "input" === elem.nodeName.toLowerCase() && "text" === elem.type && (null == (attr = elem.getAttribute("type")) || attr.toLowerCase() === elem.type)
                        },
                        first: createPositionalPseudo(function() {
                            return [0]
                        }),
                        last: createPositionalPseudo(function(matchIndexes, length) {
                            return [length - 1]
                        }),
                        eq: createPositionalPseudo(function(matchIndexes, length, argument) {
                            return [0 > argument ? argument + length : argument]
                        }),
                        even: createPositionalPseudo(function(matchIndexes, length) {
                            for (var i = 0; length > i; i += 2) matchIndexes.push(i);
                            return matchIndexes
                        }),
                        odd: createPositionalPseudo(function(matchIndexes, length) {
                            for (var i = 1; length > i; i += 2) matchIndexes.push(i);
                            return matchIndexes
                        }),
                        lt: createPositionalPseudo(function(matchIndexes, length, argument) {
                            for (var i = 0 > argument ? argument + length : argument; --i >= 0;) matchIndexes.push(i);
                            return matchIndexes
                        }),
                        gt: createPositionalPseudo(function(matchIndexes, length, argument) {
                            for (var i = 0 > argument ? argument + length : argument; ++i < length;) matchIndexes.push(i);
                            return matchIndexes
                        })
                    }
                }, Expr.pseudos.nth = Expr.pseudos.eq;
                for (i in {
                        radio: !0,
                        checkbox: !0,
                        file: !0,
                        password: !0,
                        image: !0
                    }) Expr.pseudos[i] = createInputPseudo(i);
                for (i in {
                        submit: !0,
                        reset: !0
                    }) Expr.pseudos[i] = createButtonPseudo(i);
                setFilters.prototype = Expr.filters = Expr.pseudos, Expr.setFilters = new setFilters, compile = Sizzle.compile = function(selector, group) {
                        var i, setMatchers = [],
                            elementMatchers = [],
                            cached = compilerCache[selector + " "];
                        if (!cached) {
                            for (group || (group = tokenize(selector)), i = group.length; i--;) cached = matcherFromTokens(group[i]), cached[expando] ? setMatchers.push(cached) : elementMatchers.push(cached);
                            cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers))
                        }
                        return cached
                    }, support.sortStable = expando.split("")
                    .sort(sortOrder)
                    .join("") === expando, support.detectDuplicates = hasDuplicate, setDocument(), support.sortDetached = assert(function(div1) {
                        return 1 & div1.compareDocumentPosition(document.createElement("div"))
                    }), assert(function(div) {
                        return div.innerHTML = "<a href='#'></a>", "#" === div.firstChild.getAttribute("href")
                    }) || addHandle("type|href|height|width", function(elem, name, isXML) {
                        return isXML ? void 0 : elem.getAttribute(name, "type" === name.toLowerCase() ? 1 : 2)
                    }), support.attributes && assert(function(div) {
                        return div.innerHTML = "<input/>", div.firstChild.setAttribute("value", ""), "" === div.firstChild.getAttribute("value")
                    }) || addHandle("value", function(elem, name, isXML) {
                        return isXML || "input" !== elem.nodeName.toLowerCase() ? void 0 : elem.defaultValue
                    }), assert(function(div) {
                        return null == div.getAttribute("disabled")
                    }) || addHandle(booleans, function(elem, name, isXML) {
                        var val;
                        return isXML ? void 0 : (val = elem.getAttributeNode(name)) && val.specified ? val.value : elem[name] === !0 ? name.toLowerCase() : null
                    }), jQuery.find = Sizzle, jQuery.expr = Sizzle.selectors, jQuery.expr[":"] = jQuery.expr.pseudos, jQuery.unique = Sizzle.uniqueSort, jQuery.text = Sizzle.getText, jQuery.isXMLDoc = Sizzle.isXML, jQuery.contains = Sizzle.contains
            }(window);
        var optionsCache = {};
        jQuery.Callbacks = function(options) {
            options = "string" == typeof options ? optionsCache[options] || createOptions(options) : jQuery.extend({}, options);
            var firing, memory, fired, firingLength, firingIndex, firingStart, list = [],
                stack = !options.once && [],
                fire = function(data) {
                    for (memory = options.memory && data, fired = !0, firingIndex = firingStart || 0, firingStart = 0, firingLength = list.length, firing = !0; list && firingLength > firingIndex; firingIndex++)
                        if (list[firingIndex].apply(data[0], data[1]) === !1 && options.stopOnFalse) {
                            memory = !1;
                            break
                        }
                    firing = !1, list && (stack ? stack.length && fire(stack.shift()) : memory ? list = [] : self.disable())
                },
                self = {
                    add: function() {
                        if (list) {
                            var start = list.length;
                            ! function add(args) {
                                jQuery.each(args, function(_, arg) {
                                    var type = jQuery.type(arg);
                                    "function" === type ? options.unique && self.has(arg) || list.push(arg) : arg && arg.length && "string" !== type && add(arg)
                                })
                            }(arguments), firing ? firingLength = list.length : memory && (firingStart = start, fire(memory))
                        }
                        return this
                    },
                    remove: function() {
                        return list && jQuery.each(arguments, function(_, arg) {
                            for (var index;
                                (index = jQuery.inArray(arg, list, index)) > -1;) list.splice(index, 1), firing && (firingLength >= index && firingLength--, firingIndex >= index && firingIndex--)
                        }), this
                    },
                    has: function(fn) {
                        return fn ? jQuery.inArray(fn, list) > -1 : !(!list || !list.length)
                    },
                    empty: function() {
                        return list = [], firingLength = 0, this
                    },
                    disable: function() {
                        return list = stack = memory = undefined, this
                    },
                    disabled: function() {
                        return !list
                    },
                    lock: function() {
                        return stack = undefined, memory || self.disable(), this
                    },
                    locked: function() {
                        return !stack
                    },
                    fireWith: function(context, args) {
                        return !list || fired && !stack || (args = args || [], args = [context, args.slice ? args.slice() : args], firing ? stack.push(args) : fire(args)), this
                    },
                    fire: function() {
                        return self.fireWith(this, arguments), this
                    },
                    fired: function() {
                        return !!fired
                    }
                };
            return self
        }, jQuery.extend({
            Deferred: function(func) {
                var tuples = [
                        ["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
                        ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
                        ["notify", "progress", jQuery.Callbacks("memory")]
                    ],
                    state = "pending",
                    promise = {
                        state: function() {
                            return state
                        },
                        always: function() {
                            return deferred.done(arguments)
                                .fail(arguments), this
                        },
                        then: function() {
                            var fns = arguments;
                            return jQuery.Deferred(function(newDefer) {
                                    jQuery.each(tuples, function(i, tuple) {
                                        var action = tuple[0],
                                            fn = jQuery.isFunction(fns[i]) && fns[i];
                                        deferred[tuple[1]](function() {
                                            var returned = fn && fn.apply(this, arguments);
                                            returned && jQuery.isFunction(returned.promise) ? returned.promise()
                                                .done(newDefer.resolve)
                                                .fail(newDefer.reject)
                                                .progress(newDefer.notify) : newDefer[action + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments)
                                        })
                                    }), fns = null
                                })
                                .promise()
                        },
                        promise: function(obj) {
                            return null != obj ? jQuery.extend(obj, promise) : promise
                        }
                    },
                    deferred = {};
                return promise.pipe = promise.then, jQuery.each(tuples, function(i, tuple) {
                    var list = tuple[2],
                        stateString = tuple[3];
                    promise[tuple[1]] = list.add, stateString && list.add(function() {
                        state = stateString
                    }, tuples[1 ^ i][2].disable, tuples[2][2].lock), deferred[tuple[0]] = function() {
                        return deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments), this
                    }, deferred[tuple[0] + "With"] = list.fireWith
                }), promise.promise(deferred), func && func.call(deferred, deferred), deferred
            },
            when: function(subordinate) {
                var progressValues, progressContexts, resolveContexts, i = 0,
                    resolveValues = core_slice.call(arguments),
                    length = resolveValues.length,
                    remaining = 1 !== length || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0,
                    deferred = 1 === remaining ? subordinate : jQuery.Deferred(),
                    updateFunc = function(i, contexts, values) {
                        return function(value) {
                            contexts[i] = this, values[i] = arguments.length > 1 ? core_slice.call(arguments) : value, values === progressValues ? deferred.notifyWith(contexts, values) : --remaining || deferred.resolveWith(contexts, values)
                        }
                    };
                if (length > 1)
                    for (progressValues = new Array(length), progressContexts = new Array(length), resolveContexts = new Array(length); length > i; i++) resolveValues[i] && jQuery.isFunction(resolveValues[i].promise) ? resolveValues[i].promise()
                        .done(updateFunc(i, resolveContexts, resolveValues))
                        .fail(deferred.reject)
                        .progress(updateFunc(i, progressContexts, progressValues)) : --remaining;
                return remaining || deferred.resolveWith(resolveContexts, resolveValues), deferred.promise()
            }
        }), jQuery.support = function(support) {
            var all, a, input, select, fragment, opt, eventName, isSupported, i, div = document.createElement("div");
            if (div.setAttribute("className", "t"), div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", all = div.getElementsByTagName("*") || [], a = div.getElementsByTagName("a")[0], !a || !a.style || !all.length) return support;
            select = document.createElement("select"), opt = select.appendChild(document.createElement("option")), input = div.getElementsByTagName("input")[0], a.style.cssText = "top:1px;float:left;opacity:.5", support.getSetAttribute = "t" !== div.className, support.leadingWhitespace = 3 === div.firstChild.nodeType, support.tbody = !div.getElementsByTagName("tbody")
                .length, support.htmlSerialize = !!div.getElementsByTagName("link")
                .length, support.style = /top/.test(a.getAttribute("style")), support.hrefNormalized = "/a" === a.getAttribute("href"), support.opacity = /^0.5/.test(a.style.opacity), support.cssFloat = !!a.style.cssFloat, support.checkOn = !!input.value, support.optSelected = opt.selected, support.enctype = !!document.createElement("form")
                .enctype, support.html5Clone = "<:nav></:nav>" !== document.createElement("nav")
                .cloneNode(!0)
                .outerHTML, support.inlineBlockNeedsLayout = !1, support.shrinkWrapBlocks = !1, support.pixelPosition = !1, support.deleteExpando = !0, support.noCloneEvent = !0, support.reliableMarginRight = !0, support.boxSizingReliable = !0, input.checked = !0, support.noCloneChecked = input.cloneNode(!0)
                .checked, select.disabled = !0, support.optDisabled = !opt.disabled;
            try {
                delete div.test
            } catch (e) {
                support.deleteExpando = !1
            }
            input = document.createElement("input"), input.setAttribute("value", ""), support.input = "" === input.getAttribute("value"), input.value = "t", input.setAttribute("type", "radio"), support.radioValue = "t" === input.value, input.setAttribute("checked", "t"), input.setAttribute("name", "t"), fragment = document.createDocumentFragment(), fragment.appendChild(input), support.appendChecked = input.checked, support.checkClone = fragment.cloneNode(!0)
                .cloneNode(!0)
                .lastChild.checked, div.attachEvent && (div.attachEvent("onclick", function() {
                        support.noCloneEvent = !1
                    }), div.cloneNode(!0)
                    .click());
            for (i in {
                    submit: !0,
                    change: !0,
                    focusin: !0
                }) div.setAttribute(eventName = "on" + i, "t"), support[i + "Bubbles"] = eventName in window || div.attributes[eventName].expando === !1;
            div.style.backgroundClip = "content-box", div.cloneNode(!0)
                .style.backgroundClip = "", support.clearCloneStyle = "content-box" === div.style.backgroundClip;
            for (i in jQuery(support)) break;
            return support.ownLast = "0" !== i, jQuery(function() {
                var container, marginDiv, tds, divReset = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
                    body = document.getElementsByTagName("body")[0];
                body && (container = document.createElement("div"), container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", body.appendChild(container)
                    .appendChild(div), div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", tds = div.getElementsByTagName("td"), tds[0].style.cssText = "padding:0;margin:0;border:0;display:none", isSupported = 0 === tds[0].offsetHeight, tds[0].style.display = "", tds[1].style.display = "none", support.reliableHiddenOffsets = isSupported && 0 === tds[0].offsetHeight, div.innerHTML = "", div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", jQuery.swap(body, null != body.style.zoom ? {
                        zoom: 1
                    } : {}, function() {
                        support.boxSizing = 4 === div.offsetWidth
                    }), window.getComputedStyle && (support.pixelPosition = "1%" !== (window.getComputedStyle(div, null) || {})
                        .top, support.boxSizingReliable = "4px" === (window.getComputedStyle(div, null) || {
                            width: "4px"
                        })
                        .width, marginDiv = div.appendChild(document.createElement("div")), marginDiv.style.cssText = div.style.cssText = divReset, marginDiv.style.marginRight = marginDiv.style.width = "0", div.style.width = "1px", support.reliableMarginRight = !parseFloat((window.getComputedStyle(marginDiv, null) || {})
                            .marginRight)), typeof div.style.zoom !== core_strundefined && (div.innerHTML = "", div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1", support.inlineBlockNeedsLayout = 3 === div.offsetWidth, div.style.display = "block", div.innerHTML = "<div></div>", div.firstChild.style.width = "5px", support.shrinkWrapBlocks = 3 !== div.offsetWidth, support.inlineBlockNeedsLayout && (body.style.zoom = 1)), body.removeChild(container), container = div = tds = marginDiv = null)
            }), all = select = fragment = opt = a = input = null, support
        }({});
        var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
            rmultiDash = /([A-Z])/g;
        jQuery.extend({
            cache: {},
            noData: {
                applet: !0,
                embed: !0,
                object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
            },
            hasData: function(elem) {
                return elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando], !!elem && !isEmptyDataObject(elem)
            },
            data: function(elem, name, data) {
                return internalData(elem, name, data)
            },
            removeData: function(elem, name) {
                return internalRemoveData(elem, name)
            },
            _data: function(elem, name, data) {
                return internalData(elem, name, data, !0)
            },
            _removeData: function(elem, name) {
                return internalRemoveData(elem, name, !0)
            },
            acceptData: function(elem) {
                if (elem.nodeType && 1 !== elem.nodeType && 9 !== elem.nodeType) return !1;
                var noData = elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()];
                return !noData || noData !== !0 && elem.getAttribute("classid") === noData
            }
        }), jQuery.fn.extend({
            data: function(key, value) {
                var attrs, name, data = null,
                    i = 0,
                    elem = this[0];
                if (key === undefined) {
                    if (this.length && (data = jQuery.data(elem), 1 === elem.nodeType && !jQuery._data(elem, "parsedAttrs"))) {
                        for (attrs = elem.attributes; i < attrs.length; i++) name = attrs[i].name, 0 === name.indexOf("data-") && (name = jQuery.camelCase(name.slice(5)), dataAttr(elem, name, data[name]));
                        jQuery._data(elem, "parsedAttrs", !0)
                    }
                    return data
                }
                return "object" == typeof key ? this.each(function() {
                    jQuery.data(this, key)
                }) : arguments.length > 1 ? this.each(function() {
                    jQuery.data(this, key, value)
                }) : elem ? dataAttr(elem, key, jQuery.data(elem, key)) : null
            },
            removeData: function(key) {
                return this.each(function() {
                    jQuery.removeData(this, key)
                })
            }
        }), jQuery.extend({
            queue: function(elem, type, data) {
                var queue;
                return elem ? (type = (type || "fx") + "queue", queue = jQuery._data(elem, type), data && (!queue || jQuery.isArray(data) ? queue = jQuery._data(elem, type, jQuery.makeArray(data)) : queue.push(data)), queue || []) : void 0
            },
            dequeue: function(elem, type) {
                type = type || "fx";
                var queue = jQuery.queue(elem, type),
                    startLength = queue.length,
                    fn = queue.shift(),
                    hooks = jQuery._queueHooks(elem, type),
                    next = function() {
                        jQuery.dequeue(elem, type)
                    };
                "inprogress" === fn && (fn = queue.shift(), startLength--), fn && ("fx" === type && queue.unshift("inprogress"), delete hooks.stop, fn.call(elem, next, hooks)), !startLength && hooks && hooks.empty.fire()
            },
            _queueHooks: function(elem, type) {
                var key = type + "queueHooks";
                return jQuery._data(elem, key) || jQuery._data(elem, key, {
                    empty: jQuery.Callbacks("once memory")
                        .add(function() {
                            jQuery._removeData(elem, type + "queue"), jQuery._removeData(elem, key)
                        })
                })
            }
        }), jQuery.fn.extend({
            queue: function(type, data) {
                var setter = 2;
                return "string" != typeof type && (data = type, type = "fx", setter--), arguments.length < setter ? jQuery.queue(this[0], type) : data === undefined ? this : this.each(function() {
                    var queue = jQuery.queue(this, type, data);
                    jQuery._queueHooks(this, type), "fx" === type && "inprogress" !== queue[0] && jQuery.dequeue(this, type)
                })
            },
            dequeue: function(type) {
                return this.each(function() {
                    jQuery.dequeue(this, type)
                })
            },
            delay: function(time, type) {
                return time = jQuery.fx ? jQuery.fx.speeds[time] || time : time, type = type || "fx", this.queue(type, function(next, hooks) {
                    var timeout = setTimeout(next, time);
                    hooks.stop = function() {
                        clearTimeout(timeout)
                    }
                })
            },
            clearQueue: function(type) {
                return this.queue(type || "fx", [])
            },
            promise: function(type, obj) {
                var tmp, count = 1,
                    defer = jQuery.Deferred(),
                    elements = this,
                    i = this.length,
                    resolve = function() {
                        --count || defer.resolveWith(elements, [elements])
                    };
                for ("string" != typeof type && (obj = type, type = undefined), type = type || "fx"; i--;) tmp = jQuery._data(elements[i], type + "queueHooks"), tmp && tmp.empty && (count++, tmp.empty.add(resolve));
                return resolve(), defer.promise(obj)
            }
        });
        var nodeHook, boolHook, rclass = /[\t\r\n\f]/g,
            rreturn = /\r/g,
            rfocusable = /^(?:input|select|textarea|button|object)$/i,
            rclickable = /^(?:a|area)$/i,
            ruseDefault = /^(?:checked|selected)$/i,
            getSetAttribute = jQuery.support.getSetAttribute,
            getSetInput = jQuery.support.input;
        jQuery.fn.extend({
            attr: function(name, value) {
                return jQuery.access(this, jQuery.attr, name, value, arguments.length > 1)
            },
            removeAttr: function(name) {
                return this.each(function() {
                    jQuery.removeAttr(this, name)
                })
            },
            prop: function(name, value) {
                return jQuery.access(this, jQuery.prop, name, value, arguments.length > 1)
            },
            removeProp: function(name) {
                return name = jQuery.propFix[name] || name, this.each(function() {
                    try {
                        this[name] = undefined, delete this[name]
                    } catch (e) {}
                })
            },
            addClass: function(value) {
                var classes, elem, cur, clazz, j, i = 0,
                    len = this.length,
                    proceed = "string" == typeof value && value;
                if (jQuery.isFunction(value)) return this.each(function(j) {
                    jQuery(this)
                        .addClass(value.call(this, j, this.className))
                });
                if (proceed)
                    for (classes = (value || "")
                        .match(core_rnotwhite) || []; len > i; i++)
                        if (elem = this[i], cur = 1 === elem.nodeType && (elem.className ? (" " + elem.className + " ")
                                .replace(rclass, " ") : " ")) {
                            for (j = 0; clazz = classes[j++];) cur.indexOf(" " + clazz + " ") < 0 && (cur += clazz + " ");
                            elem.className = jQuery.trim(cur)
                        }
                return this
            },
            removeClass: function(value) {
                var classes, elem, cur, clazz, j, i = 0,
                    len = this.length,
                    proceed = 0 === arguments.length || "string" == typeof value && value;
                if (jQuery.isFunction(value)) return this.each(function(j) {
                    jQuery(this)
                        .removeClass(value.call(this, j, this.className))
                });
                if (proceed)
                    for (classes = (value || "")
                        .match(core_rnotwhite) || []; len > i; i++)
                        if (elem = this[i], cur = 1 === elem.nodeType && (elem.className ? (" " + elem.className + " ")
                                .replace(rclass, " ") : "")) {
                            for (j = 0; clazz = classes[j++];)
                                for (; cur.indexOf(" " + clazz + " ") >= 0;) cur = cur.replace(" " + clazz + " ", " ");
                            elem.className = value ? jQuery.trim(cur) : ""
                        }
                return this
            },
            toggleClass: function(value, stateVal) {
                var type = typeof value;
                return "boolean" == typeof stateVal && "string" === type ? stateVal ? this.addClass(value) : this.removeClass(value) : this.each(jQuery.isFunction(value) ? function(i) {
                    jQuery(this)
                        .toggleClass(value.call(this, i, this.className, stateVal), stateVal)
                } : function() {
                    if ("string" === type)
                        for (var className, i = 0, self = jQuery(this), classNames = value.match(core_rnotwhite) || []; className = classNames[i++];) self.hasClass(className) ? self.removeClass(className) : self.addClass(className);
                    else(type === core_strundefined || "boolean" === type) && (this.className && jQuery._data(this, "__className__", this.className), this.className = this.className || value === !1 ? "" : jQuery._data(this, "__className__") || "")
                })
            },
            hasClass: function(selector) {
                for (var className = " " + selector + " ", i = 0, l = this.length; l > i; i++)
                    if (1 === this[i].nodeType && (" " + this[i].className + " ")
                        .replace(rclass, " ")
                        .indexOf(className) >= 0) return !0;
                return !1
            },
            val: function(value) {
                var ret, hooks, isFunction, elem = this[0]; {
                    if (arguments.length) return isFunction = jQuery.isFunction(value), this.each(function(i) {
                        var val;
                        1 === this.nodeType && (val = isFunction ? value.call(this, i, jQuery(this)
                            .val()) : value, null == val ? val = "" : "number" == typeof val ? val += "" : jQuery.isArray(val) && (val = jQuery.map(val, function(value) {
                            return null == value ? "" : value + ""
                        })), hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()], hooks && "set" in hooks && hooks.set(this, val, "value") !== undefined || (this.value = val))
                    });
                    if (elem) return hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()], hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined ? ret : (ret = elem.value, "string" == typeof ret ? ret.replace(rreturn, "") : null == ret ? "" : ret)
                }
            }
        }), jQuery.extend({
            valHooks: {
                option: {
                    get: function(elem) {
                        var val = jQuery.find.attr(elem, "value");
                        return null != val ? val : elem.text
                    }
                },
                select: {
                    get: function(elem) {
                        for (var value, option, options = elem.options, index = elem.selectedIndex, one = "select-one" === elem.type || 0 > index, values = one ? null : [], max = one ? index + 1 : options.length, i = 0 > index ? max : one ? index : 0; max > i; i++)
                            if (option = options[i], !(!option.selected && i !== index || (jQuery.support.optDisabled ? option.disabled : null !== option.getAttribute("disabled")) || option.parentNode.disabled && jQuery.nodeName(option.parentNode, "optgroup"))) {
                                if (value = jQuery(option)
                                    .val(), one) return value;
                                values.push(value)
                            }
                        return values
                    },
                    set: function(elem, value) {
                        for (var optionSet, option, options = elem.options, values = jQuery.makeArray(value), i = options.length; i--;) option = options[i], (option.selected = jQuery.inArray(jQuery(option)
                            .val(), values) >= 0) && (optionSet = !0);
                        return optionSet || (elem.selectedIndex = -1), values
                    }
                }
            },
            attr: function(elem, name, value) {
                var hooks, ret, nType = elem.nodeType;
                if (elem && 3 !== nType && 8 !== nType && 2 !== nType) return typeof elem.getAttribute === core_strundefined ? jQuery.prop(elem, name, value) : (1 === nType && jQuery.isXMLDoc(elem) || (name = name.toLowerCase(), hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook)), value === undefined ? hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : (ret = jQuery.find.attr(elem, name), null == ret ? undefined : ret) : null !== value ? hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined ? ret : (elem.setAttribute(name, value + ""), value) : void jQuery.removeAttr(elem, name))
            },
            removeAttr: function(elem, value) {
                var name, propName, i = 0,
                    attrNames = value && value.match(core_rnotwhite);
                if (attrNames && 1 === elem.nodeType)
                    for (; name = attrNames[i++];) propName = jQuery.propFix[name] || name, jQuery.expr.match.bool.test(name) ? getSetInput && getSetAttribute || !ruseDefault.test(name) ? elem[propName] = !1 : elem[jQuery.camelCase("default-" + name)] = elem[propName] = !1 : jQuery.attr(elem, name, ""), elem.removeAttribute(getSetAttribute ? name : propName)
            },
            attrHooks: {
                type: {
                    set: function(elem, value) {
                        if (!jQuery.support.radioValue && "radio" === value && jQuery.nodeName(elem, "input")) {
                            var val = elem.value;
                            return elem.setAttribute("type", value), val && (elem.value = val), value
                        }
                    }
                }
            },
            propFix: {
                "for": "htmlFor",
                "class": "className"
            },
            prop: function(elem, name, value) {
                var ret, hooks, notxml, nType = elem.nodeType;
                if (elem && 3 !== nType && 8 !== nType && 2 !== nType) return notxml = 1 !== nType || !jQuery.isXMLDoc(elem), notxml && (name = jQuery.propFix[name] || name, hooks = jQuery.propHooks[name]), value !== undefined ? hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined ? ret : elem[name] = value : hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : elem[name]
            },
            propHooks: {
                tabIndex: {
                    get: function(elem) {
                        var tabindex = jQuery.find.attr(elem, "tabindex");
                        return tabindex ? parseInt(tabindex, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : -1
                    }
                }
            }
        }), boolHook = {
            set: function(elem, value, name) {
                return value === !1 ? jQuery.removeAttr(elem, name) : getSetInput && getSetAttribute || !ruseDefault.test(name) ? elem.setAttribute(!getSetAttribute && jQuery.propFix[name] || name, name) : elem[jQuery.camelCase("default-" + name)] = elem[name] = !0, name
            }
        }, jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
            var getter = jQuery.expr.attrHandle[name] || jQuery.find.attr;
            jQuery.expr.attrHandle[name] = getSetInput && getSetAttribute || !ruseDefault.test(name) ? function(elem, name, isXML) {
                var fn = jQuery.expr.attrHandle[name],
                    ret = isXML ? undefined : (jQuery.expr.attrHandle[name] = undefined) != getter(elem, name, isXML) ? name.toLowerCase() : null;
                return jQuery.expr.attrHandle[name] = fn, ret
            } : function(elem, name, isXML) {
                return isXML ? undefined : elem[jQuery.camelCase("default-" + name)] ? name.toLowerCase() : null
            }
        }), getSetInput && getSetAttribute || (jQuery.attrHooks.value = {
            set: function(elem, value, name) {
                return jQuery.nodeName(elem, "input") ? void(elem.defaultValue = value) : nodeHook && nodeHook.set(elem, value, name)
            }
        }), getSetAttribute || (nodeHook = {
            set: function(elem, value, name) {
                var ret = elem.getAttributeNode(name);
                return ret || elem.setAttributeNode(ret = elem.ownerDocument.createAttribute(name)), ret.value = value += "", "value" === name || value === elem.getAttribute(name) ? value : undefined
            }
        }, jQuery.expr.attrHandle.id = jQuery.expr.attrHandle.name = jQuery.expr.attrHandle.coords = function(elem, name, isXML) {
            var ret;
            return isXML ? undefined : (ret = elem.getAttributeNode(name)) && "" !== ret.value ? ret.value : null
        }, jQuery.valHooks.button = {
            get: function(elem, name) {
                var ret = elem.getAttributeNode(name);
                return ret && ret.specified ? ret.value : undefined
            },
            set: nodeHook.set
        }, jQuery.attrHooks.contenteditable = {
            set: function(elem, value, name) {
                nodeHook.set(elem, "" === value ? !1 : value, name)
            }
        }, jQuery.each(["width", "height"], function(i, name) {
            jQuery.attrHooks[name] = {
                set: function(elem, value) {
                    return "" === value ? (elem.setAttribute(name, "auto"), value) : void 0
                }
            }
        })), jQuery.support.hrefNormalized || jQuery.each(["href", "src"], function(i, name) {
            jQuery.propHooks[name] = {
                get: function(elem) {
                    return elem.getAttribute(name, 4)
                }
            }
        }), jQuery.support.style || (jQuery.attrHooks.style = {
            get: function(elem) {
                return elem.style.cssText || undefined
            },
            set: function(elem, value) {
                return elem.style.cssText = value + ""
            }
        }), jQuery.support.optSelected || (jQuery.propHooks.selected = {
            get: function(elem) {
                var parent = elem.parentNode;
                return parent && (parent.selectedIndex, parent.parentNode && parent.parentNode.selectedIndex), null
            }
        }), jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
            jQuery.propFix[this.toLowerCase()] = this
        }), jQuery.support.enctype || (jQuery.propFix.enctype = "encoding"), jQuery.each(["radio", "checkbox"], function() {
            jQuery.valHooks[this] = {
                set: function(elem, value) {
                    return jQuery.isArray(value) ? elem.checked = jQuery.inArray(jQuery(elem)
                        .val(), value) >= 0 : void 0
                }
            }, jQuery.support.checkOn || (jQuery.valHooks[this].get = function(elem) {
                return null === elem.getAttribute("value") ? "on" : elem.value
            })
        });
        var rformElems = /^(?:input|select|textarea)$/i,
            rkeyEvent = /^key/,
            rmouseEvent = /^(?:mouse|contextmenu)|click/,
            rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
            rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
        jQuery.event = {
            global: {},
            add: function(elem, types, handler, data, selector) {
                var tmp, events, t, handleObjIn, special, eventHandle, handleObj, handlers, type, namespaces, origType, elemData = jQuery._data(elem);
                if (elemData) {
                    for (handler.handler && (handleObjIn = handler, handler = handleObjIn.handler, selector = handleObjIn.selector), handler.guid || (handler.guid = jQuery.guid++), (events = elemData.events) || (events = elemData.events = {}), (eventHandle = elemData.handle) || (eventHandle = elemData.handle = function(e) {
                            return typeof jQuery === core_strundefined || e && jQuery.event.triggered === e.type ? undefined : jQuery.event.dispatch.apply(eventHandle.elem, arguments)
                        }, eventHandle.elem = elem), types = (types || "")
                        .match(core_rnotwhite) || [""], t = types.length; t--;) tmp = rtypenamespace.exec(types[t]) || [], type = origType = tmp[1], namespaces = (tmp[2] || "")
                        .split(".")
                        .sort(), type && (special = jQuery.event.special[type] || {}, type = (selector ? special.delegateType : special.bindType) || type, special = jQuery.event.special[type] || {}, handleObj = jQuery.extend({
                            type: type,
                            origType: origType,
                            data: data,
                            handler: handler,
                            guid: handler.guid,
                            selector: selector,
                            needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                            namespace: namespaces.join(".")
                        }, handleObjIn), (handlers = events[type]) || (handlers = events[type] = [], handlers.delegateCount = 0, special.setup && special.setup.call(elem, data, namespaces, eventHandle) !== !1 || (elem.addEventListener ? elem.addEventListener(type, eventHandle, !1) : elem.attachEvent && elem.attachEvent("on" + type, eventHandle))), special.add && (special.add.call(elem, handleObj), handleObj.handler.guid || (handleObj.handler.guid = handler.guid)), selector ? handlers.splice(handlers.delegateCount++, 0, handleObj) : handlers.push(handleObj), jQuery.event.global[type] = !0);
                    elem = null
                }
            },
            remove: function(elem, types, handler, selector, mappedTypes) {
                var j, handleObj, tmp, origCount, t, events, special, handlers, type, namespaces, origType, elemData = jQuery.hasData(elem) && jQuery._data(elem);
                if (elemData && (events = elemData.events)) {
                    for (types = (types || "")
                        .match(core_rnotwhite) || [""], t = types.length; t--;)
                        if (tmp = rtypenamespace.exec(types[t]) || [], type = origType = tmp[1], namespaces = (tmp[2] || "")
                            .split(".")
                            .sort(), type) {
                            for (special = jQuery.event.special[type] || {}, type = (selector ? special.delegateType : special.bindType) || type, handlers = events[type] || [], tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)"), origCount = j = handlers.length; j--;) handleObj = handlers[j], !mappedTypes && origType !== handleObj.origType || handler && handler.guid !== handleObj.guid || tmp && !tmp.test(handleObj.namespace) || selector && selector !== handleObj.selector && ("**" !== selector || !handleObj.selector) || (handlers.splice(j, 1), handleObj.selector && handlers.delegateCount--, special.remove && special.remove.call(elem, handleObj));
                            origCount && !handlers.length && (special.teardown && special.teardown.call(elem, namespaces, elemData.handle) !== !1 || jQuery.removeEvent(elem, type, elemData.handle), delete events[type])
                        } else
                            for (type in events) jQuery.event.remove(elem, type + types[t], handler, selector, !0);
                    jQuery.isEmptyObject(events) && (delete elemData.handle, jQuery._removeData(elem, "events"))
                }
            },
            trigger: function(event, data, elem, onlyHandlers) {
                var handle, ontype, cur, bubbleType, special, tmp, i, eventPath = [elem || document],
                    type = core_hasOwn.call(event, "type") ? event.type : event,
                    namespaces = core_hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
                if (cur = tmp = elem = elem || document, 3 !== elem.nodeType && 8 !== elem.nodeType && !rfocusMorph.test(type + jQuery.event.triggered) && (type.indexOf(".") >= 0 && (namespaces = type.split("."), type = namespaces.shift(), namespaces.sort()), ontype = type.indexOf(":") < 0 && "on" + type, event = event[jQuery.expando] ? event : new jQuery.Event(type, "object" == typeof event && event), event.isTrigger = onlyHandlers ? 2 : 3, event.namespace = namespaces.join("."), event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, event.result = undefined, event.target || (event.target = elem), data = null == data ? [event] : jQuery.makeArray(data, [event]), special = jQuery.event.special[type] || {}, onlyHandlers || !special.trigger || special.trigger.apply(elem, data) !== !1)) {
                    if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                        for (bubbleType = special.delegateType || type, rfocusMorph.test(bubbleType + type) || (cur = cur.parentNode); cur; cur = cur.parentNode) eventPath.push(cur), tmp = cur;
                        tmp === (elem.ownerDocument || document) && eventPath.push(tmp.defaultView || tmp.parentWindow || window)
                    }
                    for (i = 0;
                        (cur = eventPath[i++]) && !event.isPropagationStopped();) event.type = i > 1 ? bubbleType : special.bindType || type, handle = (jQuery._data(cur, "events") || {})[event.type] && jQuery._data(cur, "handle"), handle && handle.apply(cur, data), handle = ontype && cur[ontype], handle && jQuery.acceptData(cur) && handle.apply && handle.apply(cur, data) === !1 && event.preventDefault();
                    if (event.type = type, !onlyHandlers && !event.isDefaultPrevented() && (!special._default || special._default.apply(eventPath.pop(), data) === !1) && jQuery.acceptData(elem) && ontype && elem[type] && !jQuery.isWindow(elem)) {
                        tmp = elem[ontype], tmp && (elem[ontype] = null), jQuery.event.triggered = type;
                        try {
                            elem[type]()
                        } catch (e) {}
                        jQuery.event.triggered = undefined, tmp && (elem[ontype] = tmp)
                    }
                    return event.result
                }
            },
            dispatch: function(event) {
                event = jQuery.event.fix(event);
                var i, ret, handleObj, matched, j, handlerQueue = [],
                    args = core_slice.call(arguments),
                    handlers = (jQuery._data(this, "events") || {})[event.type] || [],
                    special = jQuery.event.special[event.type] || {};
                if (args[0] = event, event.delegateTarget = this, !special.preDispatch || special.preDispatch.call(this, event) !== !1) {
                    for (handlerQueue = jQuery.event.handlers.call(this, event, handlers), i = 0;
                        (matched = handlerQueue[i++]) && !event.isPropagationStopped();)
                        for (event.currentTarget = matched.elem, j = 0;
                            (handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped();)(!event.namespace_re || event.namespace_re.test(handleObj.namespace)) && (event.handleObj = handleObj, event.data = handleObj.data, ret = ((jQuery.event.special[handleObj.origType] || {})
                                .handle || handleObj.handler)
                            .apply(matched.elem, args), ret !== undefined && (event.result = ret) === !1 && (event.preventDefault(), event.stopPropagation()));
                    return special.postDispatch && special.postDispatch.call(this, event), event.result
                }
            },
            handlers: function(event, handlers) {
                var sel, handleObj, matches, i, handlerQueue = [],
                    delegateCount = handlers.delegateCount,
                    cur = event.target;
                if (delegateCount && cur.nodeType && (!event.button || "click" !== event.type))
                    for (; cur != this; cur = cur.parentNode || this)
                        if (1 === cur.nodeType && (cur.disabled !== !0 || "click" !== event.type)) {
                            for (matches = [], i = 0; delegateCount > i; i++) handleObj = handlers[i], sel = handleObj.selector + " ", matches[sel] === undefined && (matches[sel] = handleObj.needsContext ? jQuery(sel, this)
                                .index(cur) >= 0 : jQuery.find(sel, this, null, [cur])
                                .length), matches[sel] && matches.push(handleObj);
                            matches.length && handlerQueue.push({
                                elem: cur,
                                handlers: matches
                            })
                        }
                return delegateCount < handlers.length && handlerQueue.push({
                    elem: this,
                    handlers: handlers.slice(delegateCount)
                }), handlerQueue
            },
            fix: function(event) {
                if (event[jQuery.expando]) return event;
                var i, prop, copy, type = event.type,
                    originalEvent = event,
                    fixHook = this.fixHooks[type];
                for (fixHook || (this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {}), copy = fixHook.props ? this.props.concat(fixHook.props) : this.props, event = new jQuery.Event(originalEvent), i = copy.length; i--;) prop = copy[i], event[prop] = originalEvent[prop];
                return event.target || (event.target = originalEvent.srcElement || document), 3 === event.target.nodeType && (event.target = event.target.parentNode), event.metaKey = !!event.metaKey, fixHook.filter ? fixHook.filter(event, originalEvent) : event
            },
            props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
            fixHooks: {},
            keyHooks: {
                props: "char charCode key keyCode".split(" "),
                filter: function(event, original) {
                    return null == event.which && (event.which = null != original.charCode ? original.charCode : original.keyCode), event
                }
            },
            mouseHooks: {
                props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function(event, original) {
                    var body, eventDoc, doc, button = original.button,
                        fromElement = original.fromElement;
                    return null == event.pageX && null != original.clientX && (eventDoc = event.target.ownerDocument || document, doc = eventDoc.documentElement, body = eventDoc.body, event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0), event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)), !event.relatedTarget && fromElement && (event.relatedTarget = fromElement === event.target ? original.toElement : fromElement), event.which || button === undefined || (event.which = 1 & button ? 1 : 2 & button ? 3 : 4 & button ? 2 : 0), event
                }
            },
            special: {
                load: {
                    noBubble: !0
                },
                focus: {
                    trigger: function() {
                        if (this !== safeActiveElement() && this.focus) try {
                            return this.focus(), !1
                        } catch (e) {}
                    },
                    delegateType: "focusin"
                },
                blur: {
                    trigger: function() {
                        return this === safeActiveElement() && this.blur ? (this.blur(), !1) : void 0
                    },
                    delegateType: "focusout"
                },
                click: {
                    trigger: function() {
                        return jQuery.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                    },
                    _default: function(event) {
                        return jQuery.nodeName(event.target, "a")
                    }
                },
                beforeunload: {
                    postDispatch: function(event) {
                        event.result !== undefined && (event.originalEvent.returnValue = event.result)
                    }
                }
            },
            simulate: function(type, elem, event, bubble) {
                var e = jQuery.extend(new jQuery.Event, event, {
                    type: type,
                    isSimulated: !0,
                    originalEvent: {}
                });
                bubble ? jQuery.event.trigger(e, null, elem) : jQuery.event.dispatch.call(elem, e), e.isDefaultPrevented() && event.preventDefault()
            }
        }, jQuery.removeEvent = document.removeEventListener ? function(elem, type, handle) {
            elem.removeEventListener && elem.removeEventListener(type, handle, !1)
        } : function(elem, type, handle) {
            var name = "on" + type;
            elem.detachEvent && (typeof elem[name] === core_strundefined && (elem[name] = null), elem.detachEvent(name, handle))
        }, jQuery.Event = function(src, props) {
            return this instanceof jQuery.Event ? (src && src.type ? (this.originalEvent = src, this.type = src.type, this.isDefaultPrevented = src.defaultPrevented || src.returnValue === !1 || src.getPreventDefault && src.getPreventDefault() ? returnTrue : returnFalse) : this.type = src, props && jQuery.extend(this, props), this.timeStamp = src && src.timeStamp || jQuery.now(), void(this[jQuery.expando] = !0)) : new jQuery.Event(src, props)
        }, jQuery.Event.prototype = {
            isDefaultPrevented: returnFalse,
            isPropagationStopped: returnFalse,
            isImmediatePropagationStopped: returnFalse,
            preventDefault: function() {
                var e = this.originalEvent;
                this.isDefaultPrevented = returnTrue, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
            },
            stopPropagation: function() {
                var e = this.originalEvent;
                this.isPropagationStopped = returnTrue, e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
            },
            stopImmediatePropagation: function() {
                this.isImmediatePropagationStopped = returnTrue, this.stopPropagation()
            }
        }, jQuery.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        }, function(orig, fix) {
            jQuery.event.special[orig] = {
                delegateType: fix,
                bindType: fix,
                handle: function(event) {
                    var ret, target = this,
                        related = event.relatedTarget,
                        handleObj = event.handleObj;
                    return (!related || related !== target && !jQuery.contains(target, related)) && (event.type = handleObj.origType, ret = handleObj.handler.apply(this, arguments), event.type = fix), ret
                }
            }
        }), jQuery.support.submitBubbles || (jQuery.event.special.submit = {
            setup: function() {
                return jQuery.nodeName(this, "form") ? !1 : void jQuery.event.add(this, "click._submit keypress._submit", function(e) {
                    var elem = e.target,
                        form = jQuery.nodeName(elem, "input") || jQuery.nodeName(elem, "button") ? elem.form : undefined;
                    form && !jQuery._data(form, "submitBubbles") && (jQuery.event.add(form, "submit._submit", function(event) {
                        event._submit_bubble = !0
                    }), jQuery._data(form, "submitBubbles", !0))
                })
            },
            postDispatch: function(event) {
                event._submit_bubble && (delete event._submit_bubble, this.parentNode && !event.isTrigger && jQuery.event.simulate("submit", this.parentNode, event, !0))
            },
            teardown: function() {
                return jQuery.nodeName(this, "form") ? !1 : void jQuery.event.remove(this, "._submit")
            }
        }), jQuery.support.changeBubbles || (jQuery.event.special.change = {
            setup: function() {
                return rformElems.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (jQuery.event.add(this, "propertychange._change", function(event) {
                    "checked" === event.originalEvent.propertyName && (this._just_changed = !0)
                }), jQuery.event.add(this, "click._change", function(event) {
                    this._just_changed && !event.isTrigger && (this._just_changed = !1), jQuery.event.simulate("change", this, event, !0)
                })), !1) : void jQuery.event.add(this, "beforeactivate._change", function(e) {
                    var elem = e.target;
                    rformElems.test(elem.nodeName) && !jQuery._data(elem, "changeBubbles") && (jQuery.event.add(elem, "change._change", function(event) {
                        !this.parentNode || event.isSimulated || event.isTrigger || jQuery.event.simulate("change", this.parentNode, event, !0)
                    }), jQuery._data(elem, "changeBubbles", !0))
                })
            },
            handle: function(event) {
                var elem = event.target;
                return this !== elem || event.isSimulated || event.isTrigger || "radio" !== elem.type && "checkbox" !== elem.type ? event.handleObj.handler.apply(this, arguments) : void 0
            },
            teardown: function() {
                return jQuery.event.remove(this, "._change"), !rformElems.test(this.nodeName)
            }
        }), jQuery.support.focusinBubbles || jQuery.each({
            focus: "focusin",
            blur: "focusout"
        }, function(orig, fix) {
            var attaches = 0,
                handler = function(event) {
                    jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), !0)
                };
            jQuery.event.special[fix] = {
                setup: function() {
                    0 === attaches++ && document.addEventListener(orig, handler, !0)
                },
                teardown: function() {
                    0 === --attaches && document.removeEventListener(orig, handler, !0)
                }
            }
        }), jQuery.fn.extend({
            on: function(types, selector, data, fn, one) {
                var type, origFn;
                if ("object" == typeof types) {
                    "string" != typeof selector && (data = data || selector, selector = undefined);
                    for (type in types) this.on(type, selector, data, types[type], one);
                    return this
                }
                if (null == data && null == fn ? (fn = selector, data = selector = undefined) : null == fn && ("string" == typeof selector ? (fn = data, data = undefined) : (fn = data, data = selector, selector = undefined)), fn === !1) fn = returnFalse;
                else if (!fn) return this;
                return 1 === one && (origFn = fn, fn = function(event) {
                    return jQuery()
                        .off(event), origFn.apply(this, arguments)
                }, fn.guid = origFn.guid || (origFn.guid = jQuery.guid++)), this.each(function() {
                    jQuery.event.add(this, types, fn, data, selector)
                })
            },
            one: function(types, selector, data, fn) {
                return this.on(types, selector, data, fn, 1)
            },
            off: function(types, selector, fn) {
                var handleObj, type;
                if (types && types.preventDefault && types.handleObj) return handleObj = types.handleObj, jQuery(types.delegateTarget)
                    .off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler), this;
                if ("object" == typeof types) {
                    for (type in types) this.off(type, selector, types[type]);
                    return this
                }
                return (selector === !1 || "function" == typeof selector) && (fn = selector, selector = undefined), fn === !1 && (fn = returnFalse), this.each(function() {
                    jQuery.event.remove(this, types, fn, selector)
                })
            },
            trigger: function(type, data) {
                return this.each(function() {
                    jQuery.event.trigger(type, data, this)
                })
            },
            triggerHandler: function(type, data) {
                var elem = this[0];
                return elem ? jQuery.event.trigger(type, data, elem, !0) : void 0
            }
        });
        var isSimple = /^.[^:#\[\.,]*$/,
            rparentsprev = /^(?:parents|prev(?:Until|All))/,
            rneedsContext = jQuery.expr.match.needsContext,
            guaranteedUnique = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
        jQuery.fn.extend({
            find: function(selector) {
                var i, ret = [],
                    self = this,
                    len = self.length;
                if ("string" != typeof selector) return this.pushStack(jQuery(selector)
                    .filter(function() {
                        for (i = 0; len > i; i++)
                            if (jQuery.contains(self[i], this)) return !0
                    }));
                for (i = 0; len > i; i++) jQuery.find(selector, self[i], ret);
                return ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret), ret.selector = this.selector ? this.selector + " " + selector : selector, ret
            },
            has: function(target) {
                var i, targets = jQuery(target, this),
                    len = targets.length;
                return this.filter(function() {
                    for (i = 0; len > i; i++)
                        if (jQuery.contains(this, targets[i])) return !0
                })
            },
            not: function(selector) {
                return this.pushStack(winnow(this, selector || [], !0))
            },
            filter: function(selector) {
                return this.pushStack(winnow(this, selector || [], !1))
            },
            is: function(selector) {
                return !!winnow(this, "string" == typeof selector && rneedsContext.test(selector) ? jQuery(selector) : selector || [], !1)
                    .length
            },
            closest: function(selectors, context) {
                for (var cur, i = 0, l = this.length, ret = [], pos = rneedsContext.test(selectors) || "string" != typeof selectors ? jQuery(selectors, context || this.context) : 0; l > i; i++)
                    for (cur = this[i]; cur && cur !== context; cur = cur.parentNode)
                        if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : 1 === cur.nodeType && jQuery.find.matchesSelector(cur, selectors))) {
                            cur = ret.push(cur);
                            break
                        }
                return this.pushStack(ret.length > 1 ? jQuery.unique(ret) : ret)
            },
            index: function(elem) {
                return elem ? "string" == typeof elem ? jQuery.inArray(this[0], jQuery(elem)) : jQuery.inArray(elem.jquery ? elem[0] : elem, this) : this[0] && this[0].parentNode ? this.first()
                    .prevAll()
                    .length : -1
            },
            add: function(selector, context) {
                var set = "string" == typeof selector ? jQuery(selector, context) : jQuery.makeArray(selector && selector.nodeType ? [selector] : selector),
                    all = jQuery.merge(this.get(), set);
                return this.pushStack(jQuery.unique(all))
            },
            addBack: function(selector) {
                return this.add(null == selector ? this.prevObject : this.prevObject.filter(selector))
            }
        }), jQuery.each({
            parent: function(elem) {
                var parent = elem.parentNode;
                return parent && 11 !== parent.nodeType ? parent : null
            },
            parents: function(elem) {
                return jQuery.dir(elem, "parentNode")
            },
            parentsUntil: function(elem, i, until) {
                return jQuery.dir(elem, "parentNode", until)
            },
            next: function(elem) {
                return sibling(elem, "nextSibling")
            },
            prev: function(elem) {
                return sibling(elem, "previousSibling")
            },
            nextAll: function(elem) {
                return jQuery.dir(elem, "nextSibling")
            },
            prevAll: function(elem) {
                return jQuery.dir(elem, "previousSibling")
            },
            nextUntil: function(elem, i, until) {
                return jQuery.dir(elem, "nextSibling", until)
            },
            prevUntil: function(elem, i, until) {
                return jQuery.dir(elem, "previousSibling", until)
            },
            siblings: function(elem) {
                return jQuery.sibling((elem.parentNode || {})
                    .firstChild, elem)
            },
            children: function(elem) {
                return jQuery.sibling(elem.firstChild)
            },
            contents: function(elem) {
                return jQuery.nodeName(elem, "iframe") ? elem.contentDocument || elem.contentWindow.document : jQuery.merge([], elem.childNodes)
            }
        }, function(name, fn) {
            jQuery.fn[name] = function(until, selector) {
                var ret = jQuery.map(this, fn, until);
                return "Until" !== name.slice(-5) && (selector = until), selector && "string" == typeof selector && (ret = jQuery.filter(selector, ret)), this.length > 1 && (guaranteedUnique[name] || (ret = jQuery.unique(ret)), rparentsprev.test(name) && (ret = ret.reverse())), this.pushStack(ret)
            }
        }), jQuery.extend({
            filter: function(expr, elems, not) {
                var elem = elems[0];
                return not && (expr = ":not(" + expr + ")"), 1 === elems.length && 1 === elem.nodeType ? jQuery.find.matchesSelector(elem, expr) ? [elem] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
                    return 1 === elem.nodeType
                }))
            },
            dir: function(elem, dir, until) {
                for (var matched = [], cur = elem[dir]; cur && 9 !== cur.nodeType && (until === undefined || 1 !== cur.nodeType || !jQuery(cur)
                        .is(until));) 1 === cur.nodeType && matched.push(cur), cur = cur[dir];
                return matched
            },
            sibling: function(n, elem) {
                for (var r = []; n; n = n.nextSibling) 1 === n.nodeType && n !== elem && r.push(n);
                return r
            }
        });
        var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
            rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
            rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
            rleadingWhitespace = /^\s+/,
            rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
            rtagName = /<([\w:]+)/,
            rtbody = /<tbody/i,
            rhtml = /<|&#?\w+;/,
            rnoInnerhtml = /<(?:script|style|link)/i,
            manipulation_rcheckableType = /^(?:checkbox|radio)$/i,
            rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
            rscriptType = /^$|\/(?:java|ecma)script/i,
            rscriptTypeMasked = /^true\/(.*)/,
            rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
            wrapMap = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                legend: [1, "<fieldset>", "</fieldset>"],
                area: [1, "<map>", "</map>"],
                param: [1, "<object>", "</object>"],
                thead: [1, "<table>", "</table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: jQuery.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
            },
            safeFragment = createSafeFragment(document),
            fragmentDiv = safeFragment.appendChild(document.createElement("div"));
        wrapMap.optgroup = wrapMap.option, wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead, wrapMap.th = wrapMap.td, jQuery.fn.extend({
            text: function(value) {
                return jQuery.access(this, function(value) {
                    return value === undefined ? jQuery.text(this) : this.empty()
                        .append((this[0] && this[0].ownerDocument || document)
                            .createTextNode(value))
                }, null, value, arguments.length)
            },
            append: function() {
                return this.domManip(arguments, function(elem) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var target = manipulationTarget(this, elem);
                        target.appendChild(elem)
                    }
                })
            },
            prepend: function() {
                return this.domManip(arguments, function(elem) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var target = manipulationTarget(this, elem);
                        target.insertBefore(elem, target.firstChild)
                    }
                })
            },
            before: function() {
                return this.domManip(arguments, function(elem) {
                    this.parentNode && this.parentNode.insertBefore(elem, this)
                })
            },
            after: function() {
                return this.domManip(arguments, function(elem) {
                    this.parentNode && this.parentNode.insertBefore(elem, this.nextSibling)
                })
            },
            remove: function(selector, keepData) {
                for (var elem, elems = selector ? jQuery.filter(selector, this) : this, i = 0; null != (elem = elems[i]); i++) keepData || 1 !== elem.nodeType || jQuery.cleanData(getAll(elem)), elem.parentNode && (keepData && jQuery.contains(elem.ownerDocument, elem) && setGlobalEval(getAll(elem, "script")), elem.parentNode.removeChild(elem));
                return this
            },
            empty: function() {
                for (var elem, i = 0; null != (elem = this[i]); i++) {
                    for (1 === elem.nodeType && jQuery.cleanData(getAll(elem, !1)); elem.firstChild;) elem.removeChild(elem.firstChild);
                    elem.options && jQuery.nodeName(elem, "select") && (elem.options.length = 0)
                }
                return this
            },
            clone: function(dataAndEvents, deepDataAndEvents) {
                return dataAndEvents = null == dataAndEvents ? !1 : dataAndEvents, deepDataAndEvents = null == deepDataAndEvents ? dataAndEvents : deepDataAndEvents, this.map(function() {
                    return jQuery.clone(this, dataAndEvents, deepDataAndEvents)
                })
            },
            html: function(value) {
                return jQuery.access(this, function(value) {
                    var elem = this[0] || {},
                        i = 0,
                        l = this.length;
                    if (value === undefined) return 1 === elem.nodeType ? elem.innerHTML.replace(rinlinejQuery, "") : undefined;
                    if (!("string" != typeof value || rnoInnerhtml.test(value) || !jQuery.support.htmlSerialize && rnoshimcache.test(value) || !jQuery.support.leadingWhitespace && rleadingWhitespace.test(value) || wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()])) {
                        value = value.replace(rxhtmlTag, "<$1></$2>");
                        try {
                            for (; l > i; i++) elem = this[i] || {}, 1 === elem.nodeType && (jQuery.cleanData(getAll(elem, !1)), elem.innerHTML = value);
                            elem = 0
                        } catch (e) {}
                    }
                    elem && this.empty()
                        .append(value)
                }, null, value, arguments.length)
            },
            replaceWith: function() {
                var args = jQuery.map(this, function(elem) {
                        return [elem.nextSibling, elem.parentNode]
                    }),
                    i = 0;
                return this.domManip(arguments, function(elem) {
                    var next = args[i++],
                        parent = args[i++];
                    parent && (next && next.parentNode !== parent && (next = this.nextSibling), jQuery(this)
                        .remove(), parent.insertBefore(elem, next))
                }, !0), i ? this : this.remove()
            },
            detach: function(selector) {
                return this.remove(selector, !0)
            },
            domManip: function(args, callback, allowIntersection) {
                args = core_concat.apply([], args);
                var first, node, hasScripts, scripts, doc, fragment, i = 0,
                    l = this.length,
                    set = this,
                    iNoClone = l - 1,
                    value = args[0],
                    isFunction = jQuery.isFunction(value);
                if (isFunction || !(1 >= l || "string" != typeof value || jQuery.support.checkClone) && rchecked.test(value)) return this.each(function(index) {
                    var self = set.eq(index);
                    isFunction && (args[0] = value.call(this, index, self.html())), self.domManip(args, callback, allowIntersection)
                });
                if (l && (fragment = jQuery.buildFragment(args, this[0].ownerDocument, !1, !allowIntersection && this), first = fragment.firstChild, 1 === fragment.childNodes.length && (fragment = first), first)) {
                    for (scripts = jQuery.map(getAll(fragment, "script"), disableScript), hasScripts = scripts.length; l > i; i++) node = fragment, i !== iNoClone && (node = jQuery.clone(node, !0, !0), hasScripts && jQuery.merge(scripts, getAll(node, "script"))), callback.call(this[i], node, i);
                    if (hasScripts)
                        for (doc = scripts[scripts.length - 1].ownerDocument, jQuery.map(scripts, restoreScript), i = 0; hasScripts > i; i++) node = scripts[i], rscriptType.test(node.type || "") && !jQuery._data(node, "globalEval") && jQuery.contains(doc, node) && (node.src ? jQuery._evalUrl(node.src) : jQuery.globalEval((node.text || node.textContent || node.innerHTML || "")
                            .replace(rcleanScript, "")));
                    fragment = first = null
                }
                return this
            }
        }), jQuery.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(name, original) {
            jQuery.fn[name] = function(selector) {
                for (var elems, i = 0, ret = [], insert = jQuery(selector), last = insert.length - 1; last >= i; i++) elems = i === last ? this : this.clone(!0), jQuery(insert[i])[original](elems), core_push.apply(ret, elems.get());
                return this.pushStack(ret)
            }
        }), jQuery.extend({
            clone: function(elem, dataAndEvents, deepDataAndEvents) {
                var destElements, node, clone, i, srcElements, inPage = jQuery.contains(elem.ownerDocument, elem);
                if (jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test("<" + elem.nodeName + ">") ? clone = elem.cloneNode(!0) : (fragmentDiv.innerHTML = elem.outerHTML, fragmentDiv.removeChild(clone = fragmentDiv.firstChild)), !(jQuery.support.noCloneEvent && jQuery.support.noCloneChecked || 1 !== elem.nodeType && 11 !== elem.nodeType || jQuery.isXMLDoc(elem)))
                    for (destElements = getAll(clone), srcElements = getAll(elem), i = 0; null != (node = srcElements[i]); ++i) destElements[i] && fixCloneNodeIssues(node, destElements[i]);
                if (dataAndEvents)
                    if (deepDataAndEvents)
                        for (srcElements = srcElements || getAll(elem), destElements = destElements || getAll(clone), i = 0; null != (node = srcElements[i]); i++) cloneCopyEvent(node, destElements[i]);
                    else cloneCopyEvent(elem, clone);
                return destElements = getAll(clone, "script"), destElements.length > 0 && setGlobalEval(destElements, !inPage && getAll(elem, "script")), destElements = srcElements = node = null, clone
            },
            buildFragment: function(elems, context, scripts, selection) {
                for (var j, elem, contains, tmp, tag, tbody, wrap, l = elems.length, safe = createSafeFragment(context), nodes = [], i = 0; l > i; i++)
                    if (elem = elems[i], elem || 0 === elem)
                        if ("object" === jQuery.type(elem)) jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
                        else if (rhtml.test(elem)) {
                    for (tmp = tmp || safe.appendChild(context.createElement("div")), tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase(), wrap = wrapMap[tag] || wrapMap._default, tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2], j = wrap[0]; j--;) tmp = tmp.lastChild;
                    if (!jQuery.support.leadingWhitespace && rleadingWhitespace.test(elem) && nodes.push(context.createTextNode(rleadingWhitespace.exec(elem)[0])), !jQuery.support.tbody)
                        for (elem = "table" !== tag || rtbody.test(elem) ? "<table>" !== wrap[1] || rtbody.test(elem) ? 0 : tmp : tmp.firstChild, j = elem && elem.childNodes.length; j--;) jQuery.nodeName(tbody = elem.childNodes[j], "tbody") && !tbody.childNodes.length && elem.removeChild(tbody);
                    for (jQuery.merge(nodes, tmp.childNodes), tmp.textContent = ""; tmp.firstChild;) tmp.removeChild(tmp.firstChild);
                    tmp = safe.lastChild
                } else nodes.push(context.createTextNode(elem));
                for (tmp && safe.removeChild(tmp), jQuery.support.appendChecked || jQuery.grep(getAll(nodes, "input"), fixDefaultChecked), i = 0; elem = nodes[i++];)
                    if ((!selection || -1 === jQuery.inArray(elem, selection)) && (contains = jQuery.contains(elem.ownerDocument, elem), tmp = getAll(safe.appendChild(elem), "script"), contains && setGlobalEval(tmp), scripts))
                        for (j = 0; elem = tmp[j++];) rscriptType.test(elem.type || "") && scripts.push(elem);
                return tmp = null, safe
            },
            cleanData: function(elems, acceptData) {
                for (var elem, type, id, data, i = 0, internalKey = jQuery.expando, cache = jQuery.cache, deleteExpando = jQuery.support.deleteExpando, special = jQuery.event.special; null != (elem = elems[i]); i++)
                    if ((acceptData || jQuery.acceptData(elem)) && (id = elem[internalKey], data = id && cache[id])) {
                        if (data.events)
                            for (type in data.events) special[type] ? jQuery.event.remove(elem, type) : jQuery.removeEvent(elem, type, data.handle);
                        cache[id] && (delete cache[id], deleteExpando ? delete elem[internalKey] : typeof elem.removeAttribute !== core_strundefined ? elem.removeAttribute(internalKey) : elem[internalKey] = null, core_deletedIds.push(id))
                    }
            },
            _evalUrl: function(url) {
                return jQuery.ajax({
                    url: url,
                    type: "GET",
                    dataType: "script",
                    async: !1,
                    global: !1,
                    "throws": !0
                })
            }
        }), jQuery.fn.extend({
            wrapAll: function(html) {
                if (jQuery.isFunction(html)) return this.each(function(i) {
                    jQuery(this)
                        .wrapAll(html.call(this, i))
                });
                if (this[0]) {
                    var wrap = jQuery(html, this[0].ownerDocument)
                        .eq(0)
                        .clone(!0);
                    this[0].parentNode && wrap.insertBefore(this[0]), wrap.map(function() {
                            for (var elem = this; elem.firstChild && 1 === elem.firstChild.nodeType;) elem = elem.firstChild;
                            return elem
                        })
                        .append(this)
                }
                return this
            },
            wrapInner: function(html) {
                return this.each(jQuery.isFunction(html) ? function(i) {
                    jQuery(this)
                        .wrapInner(html.call(this, i))
                } : function() {
                    var self = jQuery(this),
                        contents = self.contents();
                    contents.length ? contents.wrapAll(html) : self.append(html)
                })
            },
            wrap: function(html) {
                var isFunction = jQuery.isFunction(html);
                return this.each(function(i) {
                    jQuery(this)
                        .wrapAll(isFunction ? html.call(this, i) : html)
                })
            },
            unwrap: function() {
                return this.parent()
                    .each(function() {
                        jQuery.nodeName(this, "body") || jQuery(this)
                            .replaceWith(this.childNodes)
                    })
                    .end()
            }
        });
        var iframe, getStyles, curCSS, ralpha = /alpha\([^)]*\)/i,
            ropacity = /opacity\s*=\s*([^)]*)/,
            rposition = /^(top|right|bottom|left)$/,
            rdisplayswap = /^(none|table(?!-c[ea]).+)/,
            rmargin = /^margin/,
            rnumsplit = new RegExp("^(" + core_pnum + ")(.*)$", "i"),
            rnumnonpx = new RegExp("^(" + core_pnum + ")(?!px)[a-z%]+$", "i"),
            rrelNum = new RegExp("^([+-])=(" + core_pnum + ")", "i"),
            elemdisplay = {
                BODY: "block"
            },
            cssShow = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            cssNormalTransform = {
                letterSpacing: 0,
                fontWeight: 400
            },
            cssExpand = ["Top", "Right", "Bottom", "Left"],
            cssPrefixes = ["Webkit", "O", "Moz", "ms"];
        jQuery.fn.extend({
            css: function(name, value) {
                return jQuery.access(this, function(elem, name, value) {
                    var len, styles, map = {},
                        i = 0;
                    if (jQuery.isArray(name)) {
                        for (styles = getStyles(elem), len = name.length; len > i; i++) map[name[i]] = jQuery.css(elem, name[i], !1, styles);
                        return map
                    }
                    return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name)
                }, name, value, arguments.length > 1)
            },
            show: function() {
                return showHide(this, !0)
            },
            hide: function() {
                return showHide(this)
            },
            toggle: function(state) {
                return "boolean" == typeof state ? state ? this.show() : this.hide() : this.each(function() {
                    isHidden(this) ? jQuery(this)
                        .show() : jQuery(this)
                        .hide()
                })
            }
        }), jQuery.extend({
            cssHooks: {
                opacity: {
                    get: function(elem, computed) {
                        if (computed) {
                            var ret = curCSS(elem, "opacity");
                            return "" === ret ? "1" : ret
                        }
                    }
                }
            },
            cssNumber: {
                columnCount: !0,
                fillOpacity: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {
                "float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
            },
            style: function(elem, name, value, extra) {
                if (elem && 3 !== elem.nodeType && 8 !== elem.nodeType && elem.style) {
                    var ret, type, hooks, origName = jQuery.camelCase(name),
                        style = elem.style;
                    if (name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName)), hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], value === undefined) return hooks && "get" in hooks && (ret = hooks.get(elem, !1, extra)) !== undefined ? ret : style[name];
                    if (type = typeof value, "string" === type && (ret = rrelNum.exec(value)) && (value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name)), type = "number"), !(null == value || "number" === type && isNaN(value) || ("number" !== type || jQuery.cssNumber[origName] || (value += "px"), jQuery.support.clearCloneStyle || "" !== value || 0 !== name.indexOf("background") || (style[name] = "inherit"), hooks && "set" in hooks && (value = hooks.set(elem, value, extra)) === undefined))) try {
                        style[name] = value
                    } catch (e) {}
                }
            },
            css: function(elem, name, extra, styles) {
                var num, val, hooks, origName = jQuery.camelCase(name);
                return name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName)), hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], hooks && "get" in hooks && (val = hooks.get(elem, !0, extra)), val === undefined && (val = curCSS(elem, name, styles)), "normal" === val && name in cssNormalTransform && (val = cssNormalTransform[name]), "" === extra || extra ? (num = parseFloat(val), extra === !0 || jQuery.isNumeric(num) ? num || 0 : val) : val
            }
        }), window.getComputedStyle ? (getStyles = function(elem) {
            return window.getComputedStyle(elem, null)
        }, curCSS = function(elem, name, _computed) {
            var width, minWidth, maxWidth, computed = _computed || getStyles(elem),
                ret = computed ? computed.getPropertyValue(name) || computed[name] : undefined,
                style = elem.style;
            return computed && ("" !== ret || jQuery.contains(elem.ownerDocument, elem) || (ret = jQuery.style(elem, name)), rnumnonpx.test(ret) && rmargin.test(name) && (width = style.width, minWidth = style.minWidth, maxWidth = style.maxWidth, style.minWidth = style.maxWidth = style.width = ret, ret = computed.width, style.width = width, style.minWidth = minWidth, style.maxWidth = maxWidth)), ret
        }) : document.documentElement.currentStyle && (getStyles = function(elem) {
            return elem.currentStyle
        }, curCSS = function(elem, name, _computed) {
            var left, rs, rsLeft, computed = _computed || getStyles(elem),
                ret = computed ? computed[name] : undefined,
                style = elem.style;
            return null == ret && style && style[name] && (ret = style[name]), rnumnonpx.test(ret) && !rposition.test(name) && (left = style.left, rs = elem.runtimeStyle, rsLeft = rs && rs.left, rsLeft && (rs.left = elem.currentStyle.left), style.left = "fontSize" === name ? "1em" : ret, ret = style.pixelLeft + "px", style.left = left, rsLeft && (rs.left = rsLeft)), "" === ret ? "auto" : ret
        }), jQuery.each(["height", "width"], function(i, name) {
            jQuery.cssHooks[name] = {
                get: function(elem, computed, extra) {
                    return computed ? 0 === elem.offsetWidth && rdisplayswap.test(jQuery.css(elem, "display")) ? jQuery.swap(elem, cssShow, function() {
                        return getWidthOrHeight(elem, name, extra)
                    }) : getWidthOrHeight(elem, name, extra) : void 0
                },
                set: function(elem, value, extra) {
                    var styles = extra && getStyles(elem);
                    return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, jQuery.support.boxSizing && "border-box" === jQuery.css(elem, "boxSizing", !1, styles), styles) : 0)
                }
            }
        }), jQuery.support.opacity || (jQuery.cssHooks.opacity = {
            get: function(elem, computed) {
                return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : computed ? "1" : ""
            },
            set: function(elem, value) {
                var style = elem.style,
                    currentStyle = elem.currentStyle,
                    opacity = jQuery.isNumeric(value) ? "alpha(opacity=" + 100 * value + ")" : "",
                    filter = currentStyle && currentStyle.filter || style.filter || "";
                style.zoom = 1, (value >= 1 || "" === value) && "" === jQuery.trim(filter.replace(ralpha, "")) && style.removeAttribute && (style.removeAttribute("filter"), "" === value || currentStyle && !currentStyle.filter) || (style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : filter + " " + opacity)
            }
        }), jQuery(function() {
            jQuery.support.reliableMarginRight || (jQuery.cssHooks.marginRight = {
                get: function(elem, computed) {
                    return computed ? jQuery.swap(elem, {
                        display: "inline-block"
                    }, curCSS, [elem, "marginRight"]) : void 0
                }
            }), !jQuery.support.pixelPosition && jQuery.fn.position && jQuery.each(["top", "left"], function(i, prop) {
                jQuery.cssHooks[prop] = {
                    get: function(elem, computed) {
                        return computed ? (computed = curCSS(elem, prop), rnumnonpx.test(computed) ? jQuery(elem)
                            .position()[prop] + "px" : computed) : void 0
                    }
                }
            })
        }), jQuery.expr && jQuery.expr.filters && (jQuery.expr.filters.hidden = function(elem) {
            return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 || !jQuery.support.reliableHiddenOffsets && "none" === (elem.style && elem.style.display || jQuery.css(elem, "display"))
        }, jQuery.expr.filters.visible = function(elem) {
            return !jQuery.expr.filters.hidden(elem)
        }), jQuery.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(prefix, suffix) {
            jQuery.cssHooks[prefix + suffix] = {
                expand: function(value) {
                    for (var i = 0, expanded = {}, parts = "string" == typeof value ? value.split(" ") : [value]; 4 > i; i++) expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
                    return expanded
                }
            }, rmargin.test(prefix) || (jQuery.cssHooks[prefix + suffix].set = setPositiveNumber)
        });
        var r20 = /%20/g,
            rbracket = /\[\]$/,
            rCRLF = /\r?\n/g,
            rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
            rsubmittable = /^(?:input|select|textarea|keygen)/i;
        jQuery.fn.extend({
            serialize: function() {
                return jQuery.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                        var elements = jQuery.prop(this, "elements");
                        return elements ? jQuery.makeArray(elements) : this
                    })
                    .filter(function() {
                        var type = this.type;
                        return this.name && !jQuery(this)
                            .is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !manipulation_rcheckableType.test(type))
                    })
                    .map(function(i, elem) {
                        var val = jQuery(this)
                            .val();
                        return null == val ? null : jQuery.isArray(val) ? jQuery.map(val, function(val) {
                            return {
                                name: elem.name,
                                value: val.replace(rCRLF, "\r\n")
                            }
                        }) : {
                            name: elem.name,
                            value: val.replace(rCRLF, "\r\n")
                        }
                    })
                    .get()
            }
        }), jQuery.param = function(a, traditional) {
            var prefix, s = [],
                add = function(key, value) {
                    value = jQuery.isFunction(value) ? value() : null == value ? "" : value, s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value)
                };
            if (traditional === undefined && (traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional), jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) jQuery.each(a, function() {
                add(this.name, this.value)
            });
            else
                for (prefix in a) buildParams(prefix, a[prefix], traditional, add);
            return s.join("&")
                .replace(r20, "+")
        }, jQuery.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(i, name) {
            jQuery.fn[name] = function(data, fn) {
                return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name)
            }
        }), jQuery.fn.extend({
            hover: function(fnOver, fnOut) {
                return this.mouseenter(fnOver)
                    .mouseleave(fnOut || fnOver)
            },
            bind: function(types, data, fn) {
                return this.on(types, null, data, fn)
            },
            unbind: function(types, fn) {
                return this.off(types, null, fn)
            },
            delegate: function(selector, types, data, fn) {
                return this.on(types, selector, data, fn)
            },
            undelegate: function(selector, types, fn) {
                return 1 === arguments.length ? this.off(selector, "**") : this.off(types, selector || "**", fn)
            }
        });
        var ajaxLocParts, ajaxLocation, ajax_nonce = jQuery.now(),
            ajax_rquery = /\?/,
            rhash = /#.*$/,
            rts = /([?&])_=[^&]*/,
            rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
            rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            rnoContent = /^(?:GET|HEAD)$/,
            rprotocol = /^\/\//,
            rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
            _load = jQuery.fn.load,
            prefilters = {},
            transports = {},
            allTypes = "*/".concat("*");
        try {
            ajaxLocation = location.href
        } catch (e) {
            ajaxLocation = document.createElement("a"), ajaxLocation.href = "", ajaxLocation = ajaxLocation.href
        }
        ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [], jQuery.fn.load = function(url, params, callback) {
            if ("string" != typeof url && _load) return _load.apply(this, arguments);
            var selector, response, type, self = this,
                off = url.indexOf(" ");
            return off >= 0 && (selector = url.slice(off, url.length), url = url.slice(0, off)), jQuery.isFunction(params) ? (callback = params, params = undefined) : params && "object" == typeof params && (type = "POST"), self.length > 0 && jQuery.ajax({
                    url: url,
                    type: type,
                    dataType: "html",
                    data: params
                })
                .done(function(responseText) {
                    response = arguments, self.html(selector ? jQuery("<div>")
                        .append(jQuery.parseHTML(responseText))
                        .find(selector) : responseText)
                })
                .complete(callback && function(jqXHR, status) {
                    self.each(callback, response || [jqXHR.responseText, status, jqXHR])
                }), this
        }, jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(i, type) {
            jQuery.fn[type] = function(fn) {
                return this.on(type, fn)
            }
        }), jQuery.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: ajaxLocation,
                type: "GET",
                isLocal: rlocalProtocol.test(ajaxLocParts[1]),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": allTypes,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /xml/,
                    html: /html/,
                    json: /json/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": jQuery.parseJSON,
                    "text xml": jQuery.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function(target, settings) {
                return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target)
            },
            ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
            ajaxTransport: addToPrefiltersOrTransports(transports),
            ajax: function(url, options) {
                function done(status, nativeStatusText, responses, headers) {
                    var isSuccess, success, error, response, modified, statusText = nativeStatusText;
                    2 !== state && (state = 2, timeoutTimer && clearTimeout(timeoutTimer), transport = undefined, responseHeadersString = headers || "", jqXHR.readyState = status > 0 ? 4 : 0, isSuccess = status >= 200 && 300 > status || 304 === status, responses && (response = ajaxHandleResponses(s, jqXHR, responses)), response = ajaxConvert(s, response, jqXHR, isSuccess), isSuccess ? (s.ifModified && (modified = jqXHR.getResponseHeader("Last-Modified"), modified && (jQuery.lastModified[cacheURL] = modified), modified = jqXHR.getResponseHeader("etag"), modified && (jQuery.etag[cacheURL] = modified)), 204 === status || "HEAD" === s.type ? statusText = "nocontent" : 304 === status ? statusText = "notmodified" : (statusText = response.state, success = response.data, error = response.error, isSuccess = !error)) : (error = statusText, (status || !statusText) && (statusText = "error", 0 > status && (status = 0))), jqXHR.status = status, jqXHR.statusText = (nativeStatusText || statusText) + "", isSuccess ? deferred.resolveWith(callbackContext, [success, statusText, jqXHR]) : deferred.rejectWith(callbackContext, [jqXHR, statusText, error]), jqXHR.statusCode(statusCode), statusCode = undefined, fireGlobals && globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]), completeDeferred.fireWith(callbackContext, [jqXHR, statusText]), fireGlobals && (globalEventContext.trigger("ajaxComplete", [jqXHR, s]), --jQuery.active || jQuery.event.trigger("ajaxStop")))
                }
                "object" == typeof url && (options = url, url = undefined), options = options || {};
                var parts, i, cacheURL, responseHeadersString, timeoutTimer, fireGlobals, transport, responseHeaders, s = jQuery.ajaxSetup({}, options),
                    callbackContext = s.context || s,
                    globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,
                    deferred = jQuery.Deferred(),
                    completeDeferred = jQuery.Callbacks("once memory"),
                    statusCode = s.statusCode || {},
                    requestHeaders = {},
                    requestHeadersNames = {},
                    state = 0,
                    strAbort = "canceled",
                    jqXHR = {
                        readyState: 0,
                        getResponseHeader: function(key) {
                            var match;
                            if (2 === state) {
                                if (!responseHeaders)
                                    for (responseHeaders = {}; match = rheaders.exec(responseHeadersString);) responseHeaders[match[1].toLowerCase()] = match[2];
                                match = responseHeaders[key.toLowerCase()]
                            }
                            return null == match ? null : match
                        },
                        getAllResponseHeaders: function() {
                            return 2 === state ? responseHeadersString : null
                        },
                        setRequestHeader: function(name, value) {
                            var lname = name.toLowerCase();
                            return state || (name = requestHeadersNames[lname] = requestHeadersNames[lname] || name, requestHeaders[name] = value), this
                        },
                        overrideMimeType: function(type) {
                            return state || (s.mimeType = type), this
                        },
                        statusCode: function(map) {
                            var code;
                            if (map)
                                if (2 > state)
                                    for (code in map) statusCode[code] = [statusCode[code], map[code]];
                                else jqXHR.always(map[jqXHR.status]);
                            return this
                        },
                        abort: function(statusText) {
                            var finalText = statusText || strAbort;
                            return transport && transport.abort(finalText), done(0, finalText), this
                        }
                    };
                if (deferred.promise(jqXHR)
                    .complete = completeDeferred.add, jqXHR.success = jqXHR.done, jqXHR.error = jqXHR.fail, s.url = ((url || s.url || ajaxLocation) + "")
                    .replace(rhash, "")
                    .replace(rprotocol, ajaxLocParts[1] + "//"), s.type = options.method || options.type || s.method || s.type, s.dataTypes = jQuery.trim(s.dataType || "*")
                    .toLowerCase()
                    .match(core_rnotwhite) || [""], null == s.crossDomain && (parts = rurl.exec(s.url.toLowerCase()), s.crossDomain = !(!parts || parts[1] === ajaxLocParts[1] && parts[2] === ajaxLocParts[2] && (parts[3] || ("http:" === parts[1] ? "80" : "443")) === (ajaxLocParts[3] || ("http:" === ajaxLocParts[1] ? "80" : "443")))), s.data && s.processData && "string" != typeof s.data && (s.data = jQuery.param(s.data, s.traditional)), inspectPrefiltersOrTransports(prefilters, s, options, jqXHR), 2 === state) return jqXHR;
                fireGlobals = s.global, fireGlobals && 0 === jQuery.active++ && jQuery.event.trigger("ajaxStart"), s.type = s.type.toUpperCase(), s.hasContent = !rnoContent.test(s.type), cacheURL = s.url, s.hasContent || (s.data && (cacheURL = s.url += (ajax_rquery.test(cacheURL) ? "&" : "?") + s.data, delete s.data), s.cache === !1 && (s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + ajax_nonce++) : cacheURL + (ajax_rquery.test(cacheURL) ? "&" : "?") + "_=" + ajax_nonce++)), s.ifModified && (jQuery.lastModified[cacheURL] && jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]), jQuery.etag[cacheURL] && jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL])), (s.data && s.hasContent && s.contentType !== !1 || options.contentType) && jqXHR.setRequestHeader("Content-Type", s.contentType), jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + ("*" !== s.dataTypes[0] ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
                for (i in s.headers) jqXHR.setRequestHeader(i, s.headers[i]);
                if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === !1 || 2 === state)) return jqXHR.abort();
                strAbort = "abort";
                for (i in {
                        success: 1,
                        error: 1,
                        complete: 1
                    }) jqXHR[i](s[i]);
                if (transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR)) {
                    jqXHR.readyState = 1, fireGlobals && globalEventContext.trigger("ajaxSend", [jqXHR, s]), s.async && s.timeout > 0 && (timeoutTimer = setTimeout(function() {
                        jqXHR.abort("timeout")
                    }, s.timeout));
                    try {
                        state = 1, transport.send(requestHeaders, done)
                    } catch (e) {
                        if (!(2 > state)) throw e;
                        done(-1, e)
                    }
                } else done(-1, "No Transport");
                return jqXHR
            },
            getJSON: function(url, data, callback) {
                return jQuery.get(url, data, callback, "json")
            },
            getScript: function(url, callback) {
                return jQuery.get(url, undefined, callback, "script")
            }
        }), jQuery.each(["get", "post"], function(i, method) {
            jQuery[method] = function(url, data, callback, type) {
                return jQuery.isFunction(data) && (type = type || callback, callback = data, data = undefined), jQuery.ajax({
                    url: url,
                    type: method,
                    dataType: type,
                    data: data,
                    success: callback
                })
            }
        }), jQuery.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /(?:java|ecma)script/
            },
            converters: {
                "text script": function(text) {
                    return jQuery.globalEval(text), text
                }
            }
        }), jQuery.ajaxPrefilter("script", function(s) {
            s.cache === undefined && (s.cache = !1), s.crossDomain && (s.type = "GET", s.global = !1)
        }), jQuery.ajaxTransport("script", function(s) {
            if (s.crossDomain) {
                var script, head = document.head || jQuery("head")[0] || document.documentElement;
                return {
                    send: function(_, callback) {
                        script = document.createElement("script"), script.async = !0, s.scriptCharset && (script.charset = s.scriptCharset), script.src = s.url, script.onload = script.onreadystatechange = function(_, isAbort) {
                            (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) && (script.onload = script.onreadystatechange = null, script.parentNode && script.parentNode.removeChild(script), script = null, isAbort || callback(200, "success"))
                        }, head.insertBefore(script, head.firstChild)
                    },
                    abort: function() {
                        script && script.onload(undefined, !0)
                    }
                }
            }
        });
        var oldCallbacks = [],
            rjsonp = /(=)\?(?=&|$)|\?\?/;
        jQuery.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var callback = oldCallbacks.pop() || jQuery.expando + "_" + ajax_nonce++;
                return this[callback] = !0, callback
            }
        }), jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
            var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== !1 && (rjsonp.test(s.url) ? "url" : "string" == typeof s.data && !(s.contentType || "")
                .indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");
            return jsonProp || "jsonp" === s.dataTypes[0] ? (callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback, jsonProp ? s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName) : s.jsonp !== !1 && (s.url += (ajax_rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName), s.converters["script json"] = function() {
                return responseContainer || jQuery.error(callbackName + " was not called"), responseContainer[0]
            }, s.dataTypes[0] = "json", overwritten = window[callbackName], window[callbackName] = function() {
                responseContainer = arguments
            }, jqXHR.always(function() {
                window[callbackName] = overwritten, s[callbackName] && (s.jsonpCallback = originalSettings.jsonpCallback, oldCallbacks.push(callbackName)), responseContainer && jQuery.isFunction(overwritten) && overwritten(responseContainer[0]), responseContainer = overwritten = undefined
            }), "script") : void 0
        });
        var xhrCallbacks, xhrSupported, xhrId = 0,
            xhrOnUnloadAbort = window.ActiveXObject && function() {
                var key;
                for (key in xhrCallbacks) xhrCallbacks[key](undefined, !0)
            };
        jQuery.ajaxSettings.xhr = window.ActiveXObject ? function() {
            return !this.isLocal && createStandardXHR() || createActiveXHR()
        } : createStandardXHR, xhrSupported = jQuery.ajaxSettings.xhr(), jQuery.support.cors = !!xhrSupported && "withCredentials" in xhrSupported, xhrSupported = jQuery.support.ajax = !!xhrSupported, xhrSupported && jQuery.ajaxTransport(function(s) {
            if (!s.crossDomain || jQuery.support.cors) {
                var callback;
                return {
                    send: function(headers, complete) {
                        var handle, i, xhr = s.xhr();
                        if (s.username ? xhr.open(s.type, s.url, s.async, s.username, s.password) : xhr.open(s.type, s.url, s.async), s.xhrFields)
                            for (i in s.xhrFields) xhr[i] = s.xhrFields[i];
                        s.mimeType && xhr.overrideMimeType && xhr.overrideMimeType(s.mimeType), s.crossDomain || headers["X-Requested-With"] || (headers["X-Requested-With"] = "XMLHttpRequest");
                        try {
                            for (i in headers) xhr.setRequestHeader(i, headers[i])
                        } catch (err) {}
                        xhr.send(s.hasContent && s.data || null), callback = function(_, isAbort) {
                            var status, responseHeaders, statusText, responses;
                            try {
                                if (callback && (isAbort || 4 === xhr.readyState))
                                    if (callback = undefined, handle && (xhr.onreadystatechange = jQuery.noop, xhrOnUnloadAbort && delete xhrCallbacks[handle]), isAbort) 4 !== xhr.readyState && xhr.abort();
                                    else {
                                        responses = {}, status = xhr.status, responseHeaders = xhr.getAllResponseHeaders(), "string" == typeof xhr.responseText && (responses.text = xhr.responseText);
                                        try {
                                            statusText = xhr.statusText
                                        } catch (e) {
                                            statusText = ""
                                        }
                                        status || !s.isLocal || s.crossDomain ? 1223 === status && (status = 204) : status = responses.text ? 200 : 404
                                    }
                            } catch (firefoxAccessException) {
                                isAbort || complete(-1, firefoxAccessException)
                            }
                            responses && complete(status, statusText, responses, responseHeaders)
                        }, s.async ? 4 === xhr.readyState ? setTimeout(callback) : (handle = ++xhrId, xhrOnUnloadAbort && (xhrCallbacks || (xhrCallbacks = {}, jQuery(window)
                            .unload(xhrOnUnloadAbort)), xhrCallbacks[handle] = callback), xhr.onreadystatechange = callback) : callback()
                    },
                    abort: function() {
                        callback && callback(undefined, !0)
                    }
                }
            }
        });
        var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/,
            rfxnum = new RegExp("^(?:([+-])=|)(" + core_pnum + ")([a-z%]*)$", "i"),
            rrun = /queueHooks$/,
            animationPrefilters = [defaultPrefilter],
            tweeners = {
                "*": [function(prop, value) {
                    var tween = this.createTween(prop, value),
                        target = tween.cur(),
                        parts = rfxnum.exec(value),
                        unit = parts && parts[3] || (jQuery.cssNumber[prop] ? "" : "px"),
                        start = (jQuery.cssNumber[prop] || "px" !== unit && +target) && rfxnum.exec(jQuery.css(tween.elem, prop)),
                        scale = 1,
                        maxIterations = 20;
                    if (start && start[3] !== unit) {
                        unit = unit || start[3], parts = parts || [], start = +target || 1;
                        do scale = scale || ".5", start /= scale, jQuery.style(tween.elem, prop, start + unit); while (scale !== (scale = tween.cur() / target) && 1 !== scale && --maxIterations)
                    }
                    return parts && (start = tween.start = +start || +target || 0, tween.unit = unit, tween.end = parts[1] ? start + (parts[1] + 1) * parts[2] : +parts[2]), tween
                }]
            };
        jQuery.Animation = jQuery.extend(Animation, {
            tweener: function(props, callback) {
                jQuery.isFunction(props) ? (callback = props, props = ["*"]) : props = props.split(" ");
                for (var prop, index = 0, length = props.length; length > index; index++) prop = props[index], tweeners[prop] = tweeners[prop] || [], tweeners[prop].unshift(callback)
            },
            prefilter: function(callback, prepend) {
                prepend ? animationPrefilters.unshift(callback) : animationPrefilters.push(callback)
            }
        }), jQuery.Tween = Tween, Tween.prototype = {
            constructor: Tween,
            init: function(elem, options, prop, end, easing, unit) {
                this.elem = elem, this.prop = prop, this.easing = easing || "swing", this.options = options, this.start = this.now = this.cur(), this.end = end, this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px")
            },
            cur: function() {
                var hooks = Tween.propHooks[this.prop];
                return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this)
            },
            run: function(percent) {
                var eased, hooks = Tween.propHooks[this.prop];
                return this.pos = eased = this.options.duration ? jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration) : percent, this.now = (this.end - this.start) * eased + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), hooks && hooks.set ? hooks.set(this) : Tween.propHooks._default.set(this), this
            }
        }, Tween.prototype.init.prototype = Tween.prototype, Tween.propHooks = {
            _default: {
                get: function(tween) {
                    var result;
                    return null == tween.elem[tween.prop] || tween.elem.style && null != tween.elem.style[tween.prop] ? (result = jQuery.css(tween.elem, tween.prop, ""), result && "auto" !== result ? result : 0) : tween.elem[tween.prop]
                },
                set: function(tween) {
                    jQuery.fx.step[tween.prop] ? jQuery.fx.step[tween.prop](tween) : tween.elem.style && (null != tween.elem.style[jQuery.cssProps[tween.prop]] || jQuery.cssHooks[tween.prop]) ? jQuery.style(tween.elem, tween.prop, tween.now + tween.unit) : tween.elem[tween.prop] = tween.now
                }
            }
        }, Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
            set: function(tween) {
                tween.elem.nodeType && tween.elem.parentNode && (tween.elem[tween.prop] = tween.now)
            }
        }, jQuery.each(["toggle", "show", "hide"], function(i, name) {
            var cssFn = jQuery.fn[name];
            jQuery.fn[name] = function(speed, easing, callback) {
                return null == speed || "boolean" == typeof speed ? cssFn.apply(this, arguments) : this.animate(genFx(name, !0), speed, easing, callback)
            }
        }), jQuery.fn.extend({
            fadeTo: function(speed, to, easing, callback) {
                return this.filter(isHidden)
                    .css("opacity", 0)
                    .show()
                    .end()
                    .animate({
                        opacity: to
                    }, speed, easing, callback)
            },
            animate: function(prop, speed, easing, callback) {
                var empty = jQuery.isEmptyObject(prop),
                    optall = jQuery.speed(speed, easing, callback),
                    doAnimation = function() {
                        var anim = Animation(this, jQuery.extend({}, prop), optall);
                        (empty || jQuery._data(this, "finish")) && anim.stop(!0)
                    };
                return doAnimation.finish = doAnimation, empty || optall.queue === !1 ? this.each(doAnimation) : this.queue(optall.queue, doAnimation)
            },
            stop: function(type, clearQueue, gotoEnd) {
                var stopQueue = function(hooks) {
                    var stop = hooks.stop;
                    delete hooks.stop, stop(gotoEnd)
                };
                return "string" != typeof type && (gotoEnd = clearQueue, clearQueue = type, type = undefined), clearQueue && type !== !1 && this.queue(type || "fx", []), this.each(function() {
                    var dequeue = !0,
                        index = null != type && type + "queueHooks",
                        timers = jQuery.timers,
                        data = jQuery._data(this);
                    if (index) data[index] && data[index].stop && stopQueue(data[index]);
                    else
                        for (index in data) data[index] && data[index].stop && rrun.test(index) && stopQueue(data[index]);
                    for (index = timers.length; index--;) timers[index].elem !== this || null != type && timers[index].queue !== type || (timers[index].anim.stop(gotoEnd), dequeue = !1, timers.splice(index, 1));
                    (dequeue || !gotoEnd) && jQuery.dequeue(this, type)
                })
            },
            finish: function(type) {
                return type !== !1 && (type = type || "fx"), this.each(function() {
                    var index, data = jQuery._data(this),
                        queue = data[type + "queue"],
                        hooks = data[type + "queueHooks"],
                        timers = jQuery.timers,
                        length = queue ? queue.length : 0;
                    for (data.finish = !0, jQuery.queue(this, type, []), hooks && hooks.stop && hooks.stop.call(this, !0), index = timers.length; index--;) timers[index].elem === this && timers[index].queue === type && (timers[index].anim.stop(!0), timers.splice(index, 1));
                    for (index = 0; length > index; index++) queue[index] && queue[index].finish && queue[index].finish.call(this);
                    delete data.finish
                })
            }
        }), jQuery.each({
            slideDown: genFx("show"),
            slideUp: genFx("hide"),
            slideToggle: genFx("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(name, props) {
            jQuery.fn[name] = function(speed, easing, callback) {
                return this.animate(props, speed, easing, callback)
            }
        }), jQuery.speed = function(speed, easing, fn) {
            var opt = speed && "object" == typeof speed ? jQuery.extend({}, speed) : {
                complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
                duration: speed,
                easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
            };
            return opt.duration = jQuery.fx.off ? 0 : "number" == typeof opt.duration ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default, (null == opt.queue || opt.queue === !0) && (opt.queue = "fx"), opt.old = opt.complete, opt.complete = function() {
                jQuery.isFunction(opt.old) && opt.old.call(this), opt.queue && jQuery.dequeue(this, opt.queue)
            }, opt
        }, jQuery.easing = {
            linear: function(p) {
                return p
            },
            swing: function(p) {
                return .5 - Math.cos(p * Math.PI) / 2
            }
        }, jQuery.timers = [], jQuery.fx = Tween.prototype.init, jQuery.fx.tick = function() {
            var timer, timers = jQuery.timers,
                i = 0;
            for (fxNow = jQuery.now(); i < timers.length; i++) timer = timers[i], timer() || timers[i] !== timer || timers.splice(i--, 1);
            timers.length || jQuery.fx.stop(), fxNow = undefined
        }, jQuery.fx.timer = function(timer) {
            timer() && jQuery.timers.push(timer) && jQuery.fx.start()
        }, jQuery.fx.interval = 13, jQuery.fx.start = function() {
            timerId || (timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval))
        }, jQuery.fx.stop = function() {
            clearInterval(timerId), timerId = null
        }, jQuery.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, jQuery.fx.step = {}, jQuery.expr && jQuery.expr.filters && (jQuery.expr.filters.animated = function(elem) {
            return jQuery.grep(jQuery.timers, function(fn) {
                    return elem === fn.elem
                })
                .length
        }), jQuery.fn.offset = function(options) {
            if (arguments.length) return options === undefined ? this : this.each(function(i) {
                jQuery.offset.setOffset(this, options, i)
            });
            var docElem, win, box = {
                    top: 0,
                    left: 0
                },
                elem = this[0],
                doc = elem && elem.ownerDocument;
            if (doc) return docElem = doc.documentElement, jQuery.contains(docElem, elem) ? (typeof elem.getBoundingClientRect !== core_strundefined && (box = elem.getBoundingClientRect()), win = getWindow(doc), {
                top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
                left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)
            }) : box
        }, jQuery.offset = {
            setOffset: function(elem, options, i) {
                var position = jQuery.css(elem, "position");
                "static" === position && (elem.style.position = "relative");
                var curTop, curLeft, curElem = jQuery(elem),
                    curOffset = curElem.offset(),
                    curCSSTop = jQuery.css(elem, "top"),
                    curCSSLeft = jQuery.css(elem, "left"),
                    calculatePosition = ("absolute" === position || "fixed" === position) && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
                    props = {},
                    curPosition = {};
                calculatePosition ? (curPosition = curElem.position(), curTop = curPosition.top, curLeft = curPosition.left) : (curTop = parseFloat(curCSSTop) || 0, curLeft = parseFloat(curCSSLeft) || 0), jQuery.isFunction(options) && (options = options.call(elem, i, curOffset)), null != options.top && (props.top = options.top - curOffset.top + curTop), null != options.left && (props.left = options.left - curOffset.left + curLeft), "using" in options ? options.using.call(elem, props) : curElem.css(props)
            }
        }, jQuery.fn.extend({
            position: function() {
                if (this[0]) {
                    var offsetParent, offset, parentOffset = {
                            top: 0,
                            left: 0
                        },
                        elem = this[0];
                    return "fixed" === jQuery.css(elem, "position") ? offset = elem.getBoundingClientRect() : (offsetParent = this.offsetParent(), offset = this.offset(), jQuery.nodeName(offsetParent[0], "html") || (parentOffset = offsetParent.offset()), parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", !0), parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", !0)), {
                        top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", !0),
                        left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", !0)
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var offsetParent = this.offsetParent || docElem; offsetParent && !jQuery.nodeName(offsetParent, "html") && "static" === jQuery.css(offsetParent, "position");) offsetParent = offsetParent.offsetParent;
                    return offsetParent || docElem
                })
            }
        }), jQuery.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(method, prop) {
            var top = /Y/.test(prop);
            jQuery.fn[method] = function(val) {
                return jQuery.access(this, function(elem, method, val) {
                    var win = getWindow(elem);
                    return val === undefined ? win ? prop in win ? win[prop] : win.document.documentElement[method] : elem[method] : void(win ? win.scrollTo(top ? jQuery(win)
                        .scrollLeft() : val, top ? val : jQuery(win)
                        .scrollTop()) : elem[method] = val)
                }, method, val, arguments.length, null)
            }
        }), jQuery.each({
            Height: "height",
            Width: "width"
        }, function(name, type) {
            jQuery.each({
                padding: "inner" + name,
                content: type,
                "": "outer" + name
            }, function(defaultExtra, funcName) {
                jQuery.fn[funcName] = function(margin, value) {
                    var chainable = arguments.length && (defaultExtra || "boolean" != typeof margin),
                        extra = defaultExtra || (margin === !0 || value === !0 ? "margin" : "border");
                    return jQuery.access(this, function(elem, type, value) {
                        var doc;
                        return jQuery.isWindow(elem) ? elem.document.documentElement["client" + name] : 9 === elem.nodeType ? (doc = elem.documentElement, Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name])) : value === undefined ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra)
                    }, type, chainable ? margin : undefined, chainable, null)
                }
            })
        }), jQuery.fn.size = function() {
            return this.length
        }, jQuery.fn.andSelf = jQuery.fn.addBack, "object" == typeof module && module && "object" == typeof module.exports ? module.exports = jQuery : (window.jQuery = window.$ = jQuery, "function" == typeof define && define.amd && define("jquery", [], function() {
            return jQuery
        }))
    }(window),
    function(win) {
        function isLocalStorageNameSupported() {
            var testKey = "test",
                storage = window.sessionStorage;
            try {
                return storage.setItem(testKey, "1"), storage.removeItem(testKey), !0
            } catch (error) {
                return !1
            }
        }

        function withIEStorage(storeFunction) {
            return function() {
                var args = Array.prototype.slice.call(arguments, 0);
                args.unshift(storage), storageOwner.appendChild(storage), storage.addBehavior("#default#userData"), storage.load(localStorageName);
                var result = storeFunction.apply(store, args);
                return storageOwner.removeChild(storage), result
            }
        }

        function ieKeyFix(key) {
            return key.replace(/^d/, "___$&")
                .replace(forbiddenCharsRegex, "___")
        }
        var storage, store = {},
            doc = win.document,
            localStorageName = "localStorage",
            scriptTag = "script";
        if (store.disabled = !1, store.set = function() {}, store.get = function() {}, store.remove = function() {}, store.clear = function() {}, store.transact = function(key, defaultVal, transactionFn) {
                var val = store.get(key);
                null == transactionFn && (transactionFn = defaultVal, defaultVal = null), "undefined" == typeof val && (val = defaultVal || {}), transactionFn(val), store.set(key, val)
            }, store.getAll = function() {}, store.forEach = function() {}, store.serialize = function(value) {
                return JSON.stringify(value)
            }, store.deserialize = function(value) {
                if ("string" != typeof value) return void 0;
                try {
                    return JSON.parse(value)
                } catch (e) {
                    return value || void 0
                }
            }, isLocalStorageNameSupported()) storage = win[localStorageName], store.set = function(key, val) {
            return void 0 === val ? store.remove(key) : (storage.setItem(key, store.serialize(val)), val)
        }, store.get = function(key) {
            return store.deserialize(storage.getItem(key))
        }, store.remove = function(key) {
            storage.removeItem(key)
        }, store.clear = function() {
            storage.clear()
        }, store.getAll = function() {
            var ret = {};
            return store.forEach(function(key, val) {
                ret[key] = val
            }), ret
        }, store.forEach = function(callback) {
            for (var i = 0; i < storage.length; i++) {
                var key = storage.key(i);
                callback(key, store.get(key))
            }
        };
        else if (doc.documentElement.addBehavior) {
            var storageOwner, storageContainer;
            try {
                storageContainer = new ActiveXObject("htmlfile"), storageContainer.open(), storageContainer.write("<" + scriptTag + ">document.w=window</" + scriptTag + '><iframe src="/favicon.ico"></iframe>'), storageContainer.close(), storageOwner = storageContainer.w.frames[0].document, storage = storageOwner.createElement("div")
            } catch (e) {
                storage = doc.createElement("div"), storageOwner = doc.body
            }
            var forbiddenCharsRegex = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g");
            store.set = withIEStorage(function(storage, key, val) {
                return key = ieKeyFix(key), void 0 === val ? store.remove(key) : (storage.setAttribute(key, store.serialize(val)), storage.save(localStorageName), val)
            }), store.get = withIEStorage(function(storage, key) {
                return key = ieKeyFix(key), store.deserialize(storage.getAttribute(key))
            }), store.remove = withIEStorage(function(storage, key) {
                key = ieKeyFix(key), storage.removeAttribute(key), storage.save(localStorageName)
            }), store.clear = withIEStorage(function(storage) {
                var attributes = storage.XMLDocument.documentElement.attributes;
                storage.load(localStorageName);
                for (var attr, i = 0; attr = attributes[i]; i++) storage.removeAttribute(attr.name);
                storage.save(localStorageName)
            }), store.getAll = function() {
                var ret = {};
                return store.forEach(function(key, val) {
                    ret[key] = val
                }), ret
            }, store.forEach = withIEStorage(function(storage, callback) {
                for (var attr, attributes = storage.XMLDocument.documentElement.attributes, i = 0; attr = attributes[i]; ++i) callback(attr.name, store.deserialize(storage.getAttribute(attr.name)))
            })
        }
        try {
            var testKey = "__storejs__";
            store.set(testKey, testKey), store.get(testKey) != testKey && (store.disabled = !0), store.remove(testKey)
        } catch (e) {
            store.disabled = !0
        }
        store.enabled = !store.disabled, "undefined" != typeof module && module.exports && this.module !== module ? module.exports = store : "function" == typeof define && define.amd ? define(store) : win.store = store
    }(Function("return this")()),
    function($) {
        function check() {
            for (var docReady = $.isReady, i = checklist.length - 1; i >= 0; --i) {
                var el = document.getElementById(checklist[i].id);
                if (el) {
                    var fn = checklist[i].fn;
                    checklist[i] = checklist[checklist.length - 1], checklist.pop(), fn.apply(el, [$])
                }
            }
            docReady && (clearInterval(interval), interval = null)
        }
        var interval = null,
            checklist = [];
        $.elementReady = function(id, fn) {
            return checklist.push({
                id: id,
                fn: fn
            }), interval || (interval = setInterval(check, $.elementReady.interval_ms)), this
        }, $.elementReady.interval_ms = 23
    }(jQuery),
    function() {
        $.fn.refresh = function() {
            var elems = $(this.selector);
            return this.splice(0, this.length), this.push.apply(this, elems), this
        }
    }(window),
    function($) {
        var ajaxQueue = $({});
        $.ajaxQueue = function(ajaxOpts) {
            var jqXHR, dfd = $.Deferred(),
                promise = dfd.promise(),
                doRequest = function(next) {
                    jqXHR = $.ajax(ajaxOpts), jqXHR.done(dfd.resolve)
                        .fail(dfd.reject)
                        .then(next, next)
                };
            return ajaxQueue.queue(doRequest), promise.abort = function(statusText) {
                if (jqXHR) return jqXHR.abort(statusText);
                var queue = ajaxQueue.queue(),
                    index = $.inArray(doRequest, queue);
                return index > -1 && queue.splice(index, 1), dfd.rejectWith(ajaxOpts.context || ajaxOpts, [promise, statusText, ""]), promise
            }, promise
        }
    }(jQuery),
    function($) {
        $.ua = {
            browser: {
                name: "",
                version: 0
            },
            os: {
                name: "",
                version: ""
            }
        };
        var name, version, engine, os, osversion, ua = navigator.userAgent.toLowerCase(),
            info = {};
        ua.replace(/[\(\)]/g, ";")
            .replace(/\s*(\w*?\ ?\w+[\:\s\;]?[^\d\s]*?)[\/\ ]([\d\.]*)/g, function(f, key, value) {
                info[key] = info[key] || value || !0
            }), $.each(["msie", "opera", "firefox", "seamonkey", "arora", "iron", "chrome", "safari"], function() {
                !name && info[this] && (name = this)
            }), version = info.version || info[name] || "", $.each(["trident", "gecko", "webkit", "presto"], function() {
                !engine && info[this] && (engine = this)
            }), $.extend($.ua.browser, {
                name: name,
                version: parseFloat(version),
                versionDetail: version.split("."),
                engine: {
                    name: engine,
                    version: info[engine]
                }
            }), $.each(["windows nt", "windows", "intel mac", "ppc mac", "linux"], function() {
                !os && info[this] && (os = this)
            }), "windows nt" == os ? (osversion = {
                "4.0": "nt",
                "5.0": "2000",
                5.1: "xp",
                5.2: "2003",
                "6.0": "vista",
                6.1: "7"
            }[info[os]], os = "windows") : "intel mac" == os ? (os = "mac os", osversion = "intel") : "ppc mac" == os && (os = "mac os", osversion = "ppc"), $.extend($.ua.os, {
                name: os,
                version: osversion,
                "64bit": /\ (wow64|win64|x64)/.test(ua),
                ospatchlevel: /windows\ nt\ 5\.1.*sv1/.test(ua) ? "sp2" : null
            }), /msie\ (\d+).*trident[ \/](\d+)/.test(ua) && $.extend($.ua.browser, {
                version: 1 * RegExp.$2 + 4,
                renderMode: 1 * RegExp.$1
            }), $.ua.browser[name] = $.ua.browser.version, $.ua.browser[engine] = info[engine]
    }(jQuery),
    function($) {
        $.fn.selectOrDie = function(method) {
            "use strict";
            var $_sodFilterTimeout, $_sodViewportTimeout, $defaults = {
                    customID: null,
                    customClass: "",
                    placeholder: null,
                    prefix: null,
                    cycle: !1,
                    links: !1,
                    linksExternal: !1,
                    size: 0,
                    tabIndex: 0,
                    onChange: $.noop
                },
                $_settings = {},
                _private = {
                    initSoD: function(options) {
                        return $_settings = $.extend({}, $defaults, options), this.each(function() {
                            if ($(this)
                                .parent()
                                .hasClass("sod_select")) console.log("Select or Die: It looks like the SoD already exists");
                            else {
                                var $sod, $sodListWrapper, $sodList, $select = $(this),
                                    $settingsId = $_settings.customID ? $_settings.customID : $select.data("custom-id") ? $select.data("custom-id") : $_settings.customID,
                                    $settingsClass = $_settings.customClass ? $_settings.customClass : $select.data("custom-class") ? $select.data("custom-class") : $_settings.customClass,
                                    $settingsPrefix = $_settings.prefix ? $_settings.prefix : $select.data("prefix") ? $select.data("prefix") : $_settings.prefix,
                                    $settingsPlaceholder = $_settings.placeholder ? $_settings.placeholder : $select.data("placeholder") ? $select.data("placeholder") : $_settings.placeholder,
                                    $settingsCycle = $_settings.cycle || $select.data("cycle") ? !0 : $_settings.cycle,
                                    $settingsLinks = $_settings.links || $select.data("links") ? !0 : $_settings.links,
                                    $settingsLinksExternal = $_settings.linksExternal || $select.data("links-external") ? !0 : $_settings.linksExternal,
                                    $settingsSize = $_settings.size ? $_settings.size : $select.data("size") ? $select.data("size") : $_settings.size,
                                    $settingsTabIndex = $_settings.tabIndex ? $_settings.tabIndex : $select.data("tabindex") ? $select.data("tabindex") : $select.attr("tabindex") ? $select.attr("tabindex") : $_settings.tabIndex,
                                    $selectTitle = $select.prop("title") ? $select.prop("title") : null,
                                    $selectDisabled = $select.is(":disabled") ? " disabled" : "",
                                    $sodPrefix = "",
                                    $sodHtml = "",
                                    $sodHeight = 0;
                                $settingsPrefix && ($sodPrefix = '<span class="sod_prefix">' + $settingsPrefix + "</span> "), $sodHtml += $settingsPlaceholder && !$settingsPrefix ? '<span class="sod_label sod_placeholder">' + $settingsPlaceholder + "</span>" : '<span class="sod_label">' + $sodPrefix + "</span>", $sod = $("<span/>", {
                                        id: $settingsId,
                                        "class": "sod_select " + $settingsClass + $selectDisabled,
                                        title: $selectTitle,
                                        tabindex: $settingsTabIndex,
                                        html: $sodHtml,
                                        "data-cycle": $settingsCycle,
                                        "data-links": $settingsLinks,
                                        "data-links-external": $settingsLinksExternal,
                                        "data-placeholder": $settingsPlaceholder,
                                        "data-prefix": $settingsPrefix,
                                        "data-filter": ""
                                    })
                                    .insertAfter(this), _private.isTouch() && $sod.addClass("touch"), $sodListWrapper = $("<span/>", {
                                        "class": "sod_list_wrapper"
                                    })
                                    .appendTo($sod), $sodList = $("<span/>", {
                                        "class": "sod_list"
                                    })
                                    .appendTo($sodListWrapper), $("option, optgroup", $select)
                                    .each(function() {
                                        _private.populateSoD($(this), $sodList, $sod)
                                    }), $settingsSize && ($sodListWrapper.show(), $(".sod_option:lt(" + $settingsSize + ")", $sodList)
                                        .each(function() {
                                            $sodHeight += $(this)
                                                .outerHeight()
                                        }), $sodListWrapper.removeAttr("style"), $sodList.css({
                                            "max-height": $sodHeight
                                        })), $select.appendTo($sod), $sod.on("focusin", _private.focusSod)
                                    .on("click", _private.triggerSod)
                                    .on("click", ".sod_option", _private.optionClick)
                                    .on("mousemove", ".sod_option", _private.optionHover)
                                    .on("keydown keypress", _private.keyboardUse), $select.on("change", _private.selectChange), $("html")
                                    .on("click", function() {
                                        _private.blurSod($sod)
                                    }), $(document)
                                    .on("click", "label[for='" + $select.attr("id") + "']", function(e) {
                                        e.preventDefault(), $sod.focus()
                                    })
                            }
                        })
                    },
                    populateSoD: function($option, $sodList, $sod) {
                        var $sodPlaceholder = $sod.data("placeholder"),
                            $sodPrefix = $sod.data("prefix"),
                            $optionParent = $option.parent(),
                            $optionText = $option.text(),
                            $optionHTML = $option.data("item-html") ? $option.data("item-html") : $option.text(),
                            $optionValue = $option.val(),
                            $optionCustomId = $option.data("custom-id") ? $option.data("custom-id") : null,
                            $optionCustomClass = $option.data("custom-class") ? $option.data("custom-class") : "",
                            $optionIsDisabled = $option.is(":disabled") ? " disabled " : "",
                            $optionIsSelected = $option.is(":selected") ? " selected active " : "",
                            $optionLink = $option.data("link") ? " link " : "",
                            $optionLinkExternal = $option.data("link-external") ? " linkexternal" : "";
                        $option.is("option, li") ? ($("<span/>", {
                                    "class": "sod_option " + $optionCustomClass + $optionIsDisabled + $optionIsSelected + $optionLink + $optionLinkExternal,
                                    id: $optionCustomId,
                                    title: $optionText,
                                    html: $optionHTML,
                                    "data-value": $optionValue
                                })
                                .appendTo($sodList), ($optionIsSelected && !$sodPlaceholder || $optionIsSelected && $sodPrefix) && $sod.find(".sod_label")
                                .append($optionHTML), $optionIsSelected && $sodPlaceholder && !$sodPrefix ? $sod.data("label", $sodPlaceholder) : $optionIsSelected && $sod.data("label", $optionText), $optionParent.is("optgroup") && ($sodList.find(".sod_option:last")
                                    .addClass("groupchild"), $optionParent.is(":disabled") && $sodList.find(".sod_option:last")
                                    .addClass("disabled"))) : $("<span/>", {
                                "class": "sod_option optgroup " + $optionIsDisabled,
                                title: $option.prop("label"),
                                html: $option.prop("label"),
                                "data-label": $option.prop("label")
                            })
                            .appendTo($sodList)
                    },
                    focusSod: function() {
                        var $sod = $(this),
                            $sodInFocus = $(".sod_select.focus");
                        $sod.hasClass("disabled") ? _private.blurSod($sod) : (_private.blurSod($sodInFocus), $sod.addClass("focus"))
                    },
                    triggerSod: function(e) {
                        e.stopPropagation();
                        var $sod = $(this),
                            $sodList = $sod.find(".sod_list"),
                            $sodPlaceholder = $sod.data("placeholder"),
                            $optionSelected = $sod.find(".selected");
                        $sod.hasClass("disabled") || $sod.hasClass("open") || $sod.hasClass("touch") ? (clearTimeout($_sodViewportTimeout), $sod.removeClass("open above")) : ($sod.addClass("open"), $(".sod_select")
                            .not(this)
                            .removeClass("open focus"), $sodPlaceholder && !$sod.data("prefix") && $sod.find(".sod_label")
                            .addClass("sod_placeholder")
                            .html($sodPlaceholder), _private.listScroll($sodList, $optionSelected), _private.checkViewport($sod, $sodList))
                    },
                    keyboardUse: function(e) {
                        var $sodFilterHit, $optionNext, $optionCycle, $sod = $(this),
                            $sodList = $sod.find(".sod_list"),
                            $sodOptions = $sod.find(".sod_option"),
                            $sodLabel = $sod.find(".sod_label"),
                            $sodCycle = $sod.data("cycle"),
                            $optionActive = $sodOptions.filter(".active");
                        return 0 !== e.which && 0 !== e.charCode && (clearTimeout($_sodFilterTimeout), $sod.data("filter", $sod.data("filter") + String.fromCharCode(e.keyCode | e.charCode)), $sodFilterHit = $sodOptions.filter(function() {
                                return 0 === $(this)
                                    .text()
                                    .toLowerCase()
                                    .indexOf($sod.data("filter")
                                        .toLowerCase())
                            })
                            .not(".disabled, .optgroup")
                            .first(), $sodFilterHit.length && ($optionActive.removeClass("active"), $sodFilterHit.addClass("active"), _private.listScroll($sodList, $sodFilterHit), $sodLabel.get(0)
                                .lastChild.nodeValue = $sodFilterHit.text()), $_sodFilterTimeout = setTimeout(function() {
                                $sod.data("filter", "")
                            }, 500)), e.which > 36 && e.which < 41 ? (37 === e.which || 38 === e.which ? ($optionNext = $optionActive.prevAll(":not('.disabled, .optgroup')")
                            .first(), $optionCycle = $sodOptions.not(".disabled, .optgroup")
                            .last()) : (39 === e.which || 40 === e.which) && ($optionNext = $optionActive.nextAll(":not('.disabled, .optgroup')")
                            .first(), $optionCycle = $sodOptions.not(".disabled, .optgroup")
                            .first()), !$optionNext.hasClass("sod_option") && $sodCycle && ($optionNext = $optionCycle), ($optionNext.hasClass("sod_option") || $sodCycle) && ($optionActive.removeClass("active"), $optionNext.addClass("active"), $sodLabel.get(0)
                            .lastChild.nodeValue = $optionNext.text(), _private.listScroll($sodList, $optionNext)), !1) : void(13 === e.which || 32 === e.which && $sod.hasClass("open") && "" === $sod.data("filter") ? (e.preventDefault(), $optionActive.click()) : 32 !== e.which || $sod.hasClass("open") || "" !== $sod.data("filter") ? 27 === e.which && _private.blurSod($sod) : (e.preventDefault(), $sod.click()))
                    },
                    optionHover: function() {
                        var $option = $(this);
                        $option.hasClass("disabled") || $option.hasClass("optgroup") || $option.siblings()
                            .removeClass("active")
                            .end()
                            .addClass("active")
                    },
                    optionClick: function(e) {
                        e.stopPropagation();
                        var $clicked = $(this),
                            $sod = $clicked.closest(".sod_select"),
                            $optionDisabled = $clicked.hasClass("disabled"),
                            $optionOptgroup = $clicked.hasClass("optgroup"),
                            $optionIndex = $sod.find(".sod_option:not('.optgroup')")
                            .index(this);
                        $sod.hasClass("touch") || ($optionDisabled || $optionOptgroup || ($sod.find(".selected, .sod_placeholder")
                            .removeClass("selected sod_placeholder"), $clicked.addClass("selected"), $sod.find("select option")[$optionIndex].selected = !0, $sod.find("select")
                            .change()), clearTimeout($_sodViewportTimeout), $sod.removeClass("open above"))
                    },
                    selectChange: function() {
                        var $select = $(this),
                            $optionSelected = $select.find(":selected"),
                            $optionText = $optionSelected.text(),
                            $optionHTML = $optionSelected.data("item-html") ? $optionSelected.data("item-html") : $optionSelected.text(),
                            $sod = $select.closest(".sod_select");
                        $sod.find(".sod_label")
                            .eq(0)
                            .html($optionHTML), $sod.data("label", $optionText), $_settings.onChange.call(this), !$sod.data("links") && !$optionSelected.data("link") || $optionSelected.data("link-external") ? ($sod.data("links-external") || $optionSelected.data("link-external")) && window.open($optionSelected.val(), "_blank") : window.location.href = $optionSelected.val()
                    },
                    blurSod: function($sod) {
                        if ($("body")
                            .find($sod)
                            .length) {
                            var $sodLabel = $sod.data("label"),
                                $optionActive = $sod.find(".active"),
                                $optionSelected = $sod.find(".selected");
                            clearTimeout($_sodViewportTimeout), $sod.hasClass("focus") && !$sod.hasClass("open") ? $optionActive.click() : $optionActive.hasClass("selected") || ($sod.find(".sod_label")
                                .get(0)
                                .lastChild.nodeValue = $sodLabel, $optionActive.removeClass("active"), $optionSelected.addClass("active")), $sod.removeClass("open focus above"), $sod.blur()
                        }
                    },
                    checkViewport: function($sod, $sodList) {
                        var $sodPosition = $sod[0].getBoundingClientRect(),
                            $sodListHeight = $sodList.outerHeight();
                        $sodPosition.bottom + $sodListHeight + 10 > $(window)
                            .height() && $sodPosition.top - $sodListHeight > 10 ? $sod.addClass("above") : $sod.removeClass("above"), $_sodViewportTimeout = setTimeout(function() {
                                _private.checkViewport($sod, $sodList)
                            }, 200)
                    },
                    listScroll: function($sodList, $option) {
                        var $scrollList = $sodList[0].getBoundingClientRect(),
                            $scrollOption = $option[0].getBoundingClientRect();
                        $scrollList.top > $scrollOption.top ? $sodList.scrollTop($sodList.scrollTop() - $scrollList.top + $scrollOption.top) : $scrollList.bottom < $scrollOption.bottom && $sodList.scrollTop($sodList.scrollTop() - $scrollList.bottom + $scrollOption.bottom)
                    },
                    isTouch: function() {
                        return "ontouchstart" in window || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
                    }
                },
                methods = {
                    destroy: function() {
                        return this.each(function() {
                            var $select = $(this),
                                $sod = $select.parent();
                            $sod.hasClass("sod_select") ? ($select.off("change"), $sod.find("span")
                                .remove(), $select.unwrap()) : console.log("Select or Die: There's no SoD to destroy")
                        })
                    },
                    update: function() {
                        return this.each(function() {
                            var $select = $(this),
                                $sod = $select.parent(),
                                $sodList = $sod.find(".sod_list:first");
                            $sod.hasClass("sod_select") ? ($sodList.empty(), $sod.find(".sod_label")
                                .get(0)
                                .lastChild.nodeValue = "", $select.is(":disabled") && $sod.addClass("disabled"), $("option, optgroup", $select)
                                .each(function() {
                                    _private.populateSoD($(this), $sodList, $sod)
                                })) : console.log("There's no SoD to update")
                        })
                    },
                    disable: function($value) {
                        return this.each(function() {
                            var $select = $(this),
                                $sod = $select.parent();
                            $sod.hasClass("sod_select") ? "undefined" != typeof $value ? ($sod.find(".sod_list:first .sod_option[data-value='" + $value + "']")
                                .addClass("disabled"), $sod.find(".sod_list:first .sod_option[data-label='" + $value + "']")
                                .nextUntil(":not(.groupchild)")
                                .addClass("disabled"), $("option[value='" + $value + "'], optgroup[label='" + $value + "']", this)
                                .prop("disabled", !0)) : $sod.hasClass("sod_select") && ($sod.addClass("disabled"), $select.prop("disabled", !0)) : console.log("Select or Die: There's no SoD to disable")
                        })
                    },
                    enable: function($value) {
                        return this.each(function() {
                            var $select = $(this),
                                $sod = $select.parent();
                            $sod.hasClass("sod_select") ? "undefined" != typeof $value ? ($sod.find(".sod_list:first .sod_option[data-value='" + $value + "']")
                                .removeClass("disabled"), $sod.find(".sod_list:first .sod_option[data-label='" + $value + "']")
                                .nextUntil(":not(.groupchild)")
                                .removeClass("disabled"), $("option[value='" + $value + "'], optgroup[label='" + $value + "']", this)
                                .prop("disabled", !1)) : $sod.hasClass("sod_select") && ($sod.removeClass("disabled"), $select.prop("disabled", !1)) : console.log("Select or Die: There's no SoD to enable")
                        })
                    }
                };
            return methods[method] ? methods[method].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof method && method ? void $.error('Select or Die: Oh no! No such method "' + method + '" for the SoD instance') : _private.initSoD.apply(this, arguments)
        }
    }(jQuery);
var SimpleComponentLoader = function($elem, options, callback, failCallback) {
    if (this.$elem = $elem || null, this.options = {
            parameters: {}
        }, this.callback = callback, this.failCallback = failCallback, this.loaderIndicator = this.$elem ? new LoaderOverlay(this.$elem, !0)
        .hide() : null, this.requestURL = (this.$elem.data("url") ? shop.url.base + this.$elem.data("url") : "")
        .replace("//", "/"), this.states = {
            isLoaded: !1,
            hasError: !1,
            textStatus: ""
        }, void 0 !== options)
        for (var i in options) this.options.hasOwnProperty(i) && (this.options[i] = options[i]);
    this.options.parameters.componentUid = this.$elem.data("uid"), $elem && this.load()
};
SimpleComponentLoader.prototype = {
        _setStates: function(hasError, isLoaded, textStatus) {
            this.states.hasError = hasError, this.states.isLoaded = isLoaded, this.states.textStatus = textStatus
        },
        _injectHtml: function(html) {
            $(this.$elem)
                .append(html)
        },
        load: function() {
            var self = this;
            return $.ajaxQueue({
                    url: self.requestURL,
                    data: self.options.parameters,
                    cache: !1,
                    type: "GET",
                    beforeSend: function() {
                        self.loaderIndicator.show()
                    }
                })
                .fail(function(jqXHR, textStatus) {
                    return self._setStates(!0, !1, textStatus), self.loaderIndicator.remove(), self.failCallback && $.isFunction(self.failCallback) ? self.failCallback(self.states) : void 0
                })
                .done(function(data, textStatus) {
                    return self._setStates(!1, !0, textStatus), self.loaderIndicator.remove(), self._injectHtml(data), self.callback && $.isFunction(self.callback) ? self.callback() : void 0
                }), this
        }
    },
    function($) {
        $.fn.delayKeyup = function(callback, ms) {
            return $(this)
                .keyup(function(event) {
                    var srcEl = event.currentTarget;
                    srcEl.delayTimer && clearTimeout(srcEl.delayTimer), srcEl.delayTimer = setTimeout(function() {
                        callback($(srcEl))
                    }, ms)
                }), $(this)
        }
    }(jQuery),
    function($) {
        $.url = function(url) {
            for (var uriDecode = function(text) {
                        return decodeURIComponent(text || "")
                            .replace(/\+/g, " ")
                    }, urlparser = /^([^:\/\?#\.]*:?)(\/\/([^\/\?#:]*))?:?(\d*)(\.*\/[^?#]*)(\\?[^#]*)?(#.*)?$/, urlkey = ["href", "protocol", "base", "hostname", "port", "pathname", "search", "hash"], urlobj = {
                        params: {}
                    }, urldata = (url || location.href)
                    .match(urlparser), i = urlkey.length; i--;) urlobj[urlkey[i]] = urldata[i] || "";
            return urlobj.host = urlobj.hostname + ("" != urlobj.port ? ":" : "") + urlobj.port, urlobj.host.match(/^\.\.?$/) && (urlobj.path = urlobj.host + urlobj.path, urlobj.host = ""), urlobj.search.replace(/([^\?&=]+)=?([^&]*)?/g, function(full, key, data) {
                key && (urlobj.params[uriDecode(key)] = uriDecode(data))
            }), urlobj.toString = function(baseurl) {
                var params = $.param(urlobj.params);
                if (baseurl === !1 || "" != urlobj.protocol && "" != urlobj.host) return urlobj.protocol + ("" != urlobj.host ? "//" : "") + urlobj.host + urlobj.pathname + (params ? "?" + params : "") + urlobj.hash;
                var base = $.url(baseurl || location.href),
                    abspath = urlobj.pathname;
                if (!urlobj.pathname.match(/^\//))
                    for (abspath = (base.pathname.replace(/[^\/]*$/, "") + urlobj.pathname)
                        .replace(/\/\.\//, "/"); abspath.match(/\.\./);) abspath = abspath.replace(/\/[^\/]*\/\.\.\//g, "/");
                return base.protocol + "//" + base.host + abspath + (params ? "?" + params : "") + urlobj.hash
            }, urlobj
        }, $.extend($.url, $.url())
    }(jQuery),
    function() {
        var Mobify = window.Mobify = window.Mobify || {},
            $ = Mobify.$ = Mobify.$ || window.$ || window.Zepto || window.jQuery;
        Mobify.UI = Mobify.UI || {
            classPrefix: "m-"
        };
        var $ = window.Mobify ? Mobify.$ : window.$;
        Mobify.UI.Magnifik = function() {
            var defaults = {
                    stage: void 0,
                    classNames: {
                        zooming: "zooming",
                        close: "close",
                        control: "magnifikControl",
                        canvas: "magnifikCanvas",
                        thumb: "magnifikThumb",
                        full: "magnifikFull"
                    },
                    ratio: 2,
                    seekImage: !0,
                    clickCloses: !0,
                    activationEvent: "click",
                    canvasStyle: {
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        overflow: "auto"
                    },
                    imageStyle: {
                        position: "absolute",
                        top: "0",
                        left: "0",
                        maxWidth: "none",
                        maxHeight: "none"
                    },
                    stageHTML: function() {
                        return '<div class="' + this._getClass("canvas") + '"><img class="' + this._getClass("thumb") + '"><img class="' + this._getClass("full") + '"></div>'
                    },
                    globalStyle: function() {
                        var zooming = "." + this._getClass("zooming");
                        return zooming + " { overflow: hidden; }" + zooming + " > * { display: none !important; }" + zooming + " > ." + this._getClass("control") + " { display: block !important; }"
                    }
                },
                Magnifik = function(element, options) {
                    this.options = $.extend({}, Magnifik.defaults, options), this.options.classNames = $.extend(defaults.classNames, this.options.classNames), this.options.imageStyle.width = 100 * this.options.ratio + "%", this.options.stage || (this.options.stage = $("body"), this.options.global = !0), this.$element = $(element), this.bind()
                };
            return Magnifik.defaults = defaults, Magnifik.prototype.unbind = function() {
                return this.bind(!0)
            }, Magnifik.prototype.makeElems = function() {
                if (this.$stage = this.options.stage, this.$canvas = $(this.options.stageHTML.call(this))
                    .addClass(this._getClass("control")), this.$canvas.first()
                    .css(this.options.canvasStyle), this.$thumb = this.$canvas.find("." + this._getClass("thumb"))
                    .css(this.options.imageStyle), this.$full = this.$canvas.find("." + this._getClass("full"))
                    .css(this.options.imageStyle), this.options.clickCloses && this.$canvas.first()
                    .addClass(this._getClass("close")), this.options.global) {
                    if (!$('style[data-magnifik="' + this._getClass("zooming") + '"]')
                        .length) {
                        var style = document.createElement("style"),
                            css = this.options.globalStyle.call(this);
                        style.setAttribute("type", "text/css"), style.styleSheet ? style.styleSheet.cssText = css : style.appendChild(document.createTextNode(css)), $("head")[0].appendChild(style)
                    }
                } else this.$stage.css("position", "relative");
                var closeSelector = "." + this._getClass("close");
                this.$close = this.$canvas.find(closeSelector)
                    .add(this.$canvas.filter(closeSelector)), this.bindClose("bind")
            }, Magnifik.prototype.close = function() {
                this.isOpen && (this.isOpen = !1, this.$element.trigger("closing.magnifik"), this.$canvas.detach(), this.$stage.removeClass(this._getClass("zooming")), this.options.global && (document.body.scrollTop = this.oldScrollTop), this.$element.trigger("close.magnifik"))
            }, Magnifik.prototype.open = function(event) {
                if (event.preventDefault(), !this.isOpen) {
                    this.isOpen = !0, this.$element.trigger("opening.magnifik"), this.$stage || this.makeElems();
                    var $link, $parent, src, leftRatio = .5,
                        topRatio = .5,
                        $img = $(event.target);
                    if ("IMG" !== event.target.tagName) {
                        var $parents = this.$element;
                        this.options.seekImage && ($parents = $parents.add(this.$element.parents()));
                        for (var i = 0; i < $parents.length; ++i)
                            if ($parent = $($parents[i])
                                .find("img"), $parent.length) {
                                $img = $parent;
                                break
                            }
                    } else leftRatio = event.offsetX / $img.prop("offsetWidth"), topRatio = event.offsetY / $img.prop("offsetHeight");
                    $link = $img.filter("[href]")
                        .add($img.parent("[href]")), src = $link.attr("href") || $img.attr("src") || $img.data("zoom-image"), this.$thumb.attr("src", $img.attr("src")), this.$full.attr("src", src), this.options.global && (this.oldScrollTop = document.body.scrollTop), this.$stage.append(this.$canvas), this.$stage.addClass(this._getClass("zooming"));
                    var imgAspect = $img.prop("naturalHeight") / $img.prop("naturalWidth"),
                        thumbWidth = this.$thumb.prop("offsetWidth"),
                        smallWidth = this.$canvas.prop("offsetWidth"),
                        bigWidth = thumbWidth,
                        smallHeight = this.$canvas.prop("offsetHeight"),
                        bigHeight = thumbWidth * imgAspect,
                        thus = this;
                    this.$thumb.one("load", function() {
                        thus.$canvas.prop("scrollLeft", Math.max(0, Math.min(bigWidth - smallWidth, bigWidth * leftRatio - smallWidth / 2))), thus.$canvas.prop("scrollTop", Math.max(0, Math.min(bigHeight - smallHeight, bigHeight * topRatio - smallHeight / 2))), thus.$element.trigger("open.magnifik")
                    })
                }
            }, Magnifik.prototype.bindClose = function(op) {
                this.$close && this.$close[op](this.options.activationEvent, this.boundClose)
            }, Magnifik.prototype.bind = function(undo) {
                var self = this,
                    op = undo ? "unbind" : "bind";
                this.boundClose = this.boundClose || function() {
                    return self.close.apply(self, arguments)
                }, this.boundOpen = this.boundOpen || function() {
                    return self.open.apply(self, arguments)
                }, this.$element[op](this.options.activationEvent, this.boundOpen), this.bindClose(op)
            }, Magnifik.prototype._getClass = function(id) {
                var classPrefix = this.options.classPrefix;
                return "undefined" == typeof classPrefix && (classPrefix = Mobify.UI.classPrefix), classPrefix + this.options.classNames[id]
            }, Magnifik
        }(), $.fn.magnifik = function(action, options) {
            var name = "Mobify.UI.Magnifik",
                initOptions = $.extend({}, $.fn.magnifik.defaults);
            return "object" == typeof action && (initOptions = action, options = null, action = null), this.each(function() {
                var $this = $(this),
                    magnifik = $this.data(name);
                magnifik || (magnifik = new Mobify.UI.Magnifik(this, initOptions)), action && (magnifik[action](options), "destroy" === action && ($this.data(name, null), $this.$canvas.remove())), $this.data(name, magnifik)
            }), this
        }
    }(),
    function($, window, document, undefined) {
        var $window = $(window);
        $.fn.lazyload = function(options) {
            function update() {
                var counter = 0;
                elements.each(function() {
                    var $this = $(this);
                    if (!settings.skip_invisible || $this.is(":visible"))
                        if ($.abovethetop(this, settings) || $.leftofbegin(this, settings));
                        else if ($.belowthefold(this, settings) || $.rightoffold(this, settings)) {
                        if (++counter > settings.failure_limit) return !1
                    } else $this.trigger("appear"), counter = 0
                })
            }
            var $container, elements = this,
                settings = {
                    threshold: 0,
                    failure_limit: 0,
                    event: "scroll",
                    effect: "show",
                    container: window,
                    data_attribute: "original",
                    skip_invisible: !0,
                    appear: null,
                    load: null,
                    placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
                };
            return options && (undefined !== options.failurelimit && (options.failure_limit = options.failurelimit, delete options.failurelimit), undefined !== options.effectspeed && (options.effect_speed = options.effectspeed, delete options.effectspeed), $.extend(settings, options)), $container = settings.container === undefined || settings.container === window ? $window : $(settings.container), 0 === settings.event.indexOf("scroll") && $container.bind(settings.event, function() {
                    return update()
                }), this.each(function() {
                    var self = this,
                        $self = $(self);
                    self.loaded = !1, ($self.attr("src") === undefined || $self.attr("src") === !1) && $self.is("img") && $self.attr("src", settings.placeholder), $self.one("appear", function() {
                        if (!this.loaded) {
                            if (settings.appear) {
                                var elements_left = elements.length;
                                settings.appear.call(self, elements_left, settings)
                            }
                            $("<img />")
                                .bind("load", function() {
                                    var original = $self.attr("data-" + settings.data_attribute);
                                    $self.hide(), $self.is("img") ? $self.attr("src", original) : $self.css("background-image", "url('" + original + "')"), $self[settings.effect](settings.effect_speed), self.loaded = !0;
                                    var temp = $.grep(elements, function(element) {
                                        return !element.loaded
                                    });
                                    if (elements = $(temp), settings.load) {
                                        var elements_left = elements.length;
                                        settings.load.call(self, elements_left, settings)
                                    }
                                })
                                .attr("src", $self.attr("data-" + settings.data_attribute))
                        }
                    }), 0 !== settings.event.indexOf("scroll") && $self.bind(settings.event, function() {
                        self.loaded || $self.trigger("appear")
                    })
                }), $window.bind("resize", function() {
                    update()
                }), /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion) && $window.bind("pageshow", function(event) {
                    event.originalEvent && event.originalEvent.persisted && elements.each(function() {
                        $(this)
                            .trigger("appear")
                    })
                }), $(document)
                .ready(function() {
                    update()
                }), this
        }, $.belowthefold = function(element, settings) {
            var fold;
            return fold = settings.container === undefined || settings.container === window ? (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop() : $(settings.container)
                .offset()
                .top + $(settings.container)
                .height(), fold <= $(element)
                .offset()
                .top - settings.threshold
        }, $.rightoffold = function(element, settings) {
            var fold;
            return fold = settings.container === undefined || settings.container === window ? $window.width() + $window.scrollLeft() : $(settings.container)
                .offset()
                .left + $(settings.container)
                .width(), fold <= $(element)
                .offset()
                .left - settings.threshold
        }, $.abovethetop = function(element, settings) {
            var fold;
            return fold = settings.container === undefined || settings.container === window ? $window.scrollTop() : $(settings.container)
                .offset()
                .top, fold >= $(element)
                .offset()
                .top + settings.threshold + $(element)
                .height()
        }, $.leftofbegin = function(element, settings) {
            var fold;
            return fold = settings.container === undefined || settings.container === window ? $window.scrollLeft() : $(settings.container)
                .offset()
                .left, fold >= $(element)
                .offset()
                .left + settings.threshold + $(element)
                .width()
        }, $.inviewport = function(element, settings) {
            return !($.rightoffold(element, settings) || $.leftofbegin(element, settings) || $.belowthefold(element, settings) || $.abovethetop(element, settings))
        }, $.extend($.expr[":"], {
            "below-the-fold": function(a) {
                return $.belowthefold(a, {
                    threshold: 0
                })
            },
            "above-the-top": function(a) {
                return !$.belowthefold(a, {
                    threshold: 0
                })
            },
            "right-of-screen": function(a) {
                return $.rightoffold(a, {
                    threshold: 0
                })
            },
            "left-of-screen": function(a) {
                return !$.rightoffold(a, {
                    threshold: 0
                })
            },
            "in-viewport": function(a) {
                return $.inviewport(a, {
                    threshold: 0
                })
            },
            "above-the-fold": function(a) {
                return !$.belowthefold(a, {
                    threshold: 0
                })
            },
            "right-of-fold": function(a) {
                return $.rightoffold(a, {
                    threshold: 0
                })
            },
            "left-of-fold": function(a) {
                return !$.rightoffold(a, {
                    threshold: 0
                })
            }
        })
    }(jQuery, window, document),
    function(window, undefined) {
        "use strict";

        function setup() {
            Hammer.READY || (Hammer.event.determineEventTypes(), Hammer.utils.each(Hammer.gestures, function(gesture) {
                Hammer.detection.register(gesture)
            }), Hammer.event.onTouch(Hammer.DOCUMENT, Hammer.EVENT_MOVE, Hammer.detection.detect), Hammer.event.onTouch(Hammer.DOCUMENT, Hammer.EVENT_END, Hammer.detection.detect), Hammer.READY = !0)
        }

        function setupPlugin(Hammer, $) {
            Hammer.event.bindDom = function(element, eventTypes, handler) {
                $(element)
                    .on(eventTypes, function(ev) {
                        var data = ev.originalEvent || ev;
                        data.pageX === undefined && (data.pageX = ev.pageX, data.pageY = ev.pageY), data.target || (data.target = ev.target), data.which === undefined && (data.which = data.button), data.preventDefault || (data.preventDefault = ev.preventDefault), data.stopPropagation || (data.stopPropagation = ev.stopPropagation), handler.call(this, data)
                    })
            }, Hammer.Instance.prototype.on = function(types, handler) {
                return $(this.element)
                    .on(types, handler)
            }, Hammer.Instance.prototype.off = function(types, handler) {
                return $(this.element)
                    .off(types, handler)
            }, Hammer.Instance.prototype.trigger = function(gesture, eventData) {
                var el = $(this.element);
                return el.has(eventData.target)
                    .length && (el = $(eventData.target)), el.trigger({
                        type: gesture,
                        gesture: eventData
                    })
            }, $.fn.hammer = function(options) {
                return this.each(function() {
                    var el = $(this),
                        inst = el.data("hammer");
                    inst ? inst && options && Hammer.utils.extend(inst.options, options) : el.data("hammer", new Hammer(this, options || {}))
                })
            }
        }
        var Hammer = function(element, options) {
            return new Hammer.Instance(element, options || {})
        };
        Hammer.defaults = {
            stop_browser_behavior: {
                userSelect: "none",
                touchAction: "none",
                touchCallout: "none",
                contentZooming: "none",
                userDrag: "none",
                tapHighlightColor: "rgba(0,0,0,0)"
            }
        }, Hammer.HAS_POINTEREVENTS = window.navigator.pointerEnabled || window.navigator.msPointerEnabled, Hammer.HAS_TOUCHEVENTS = "ontouchstart" in window, Hammer.MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android|silk/i, Hammer.NO_MOUSEEVENTS = Hammer.HAS_TOUCHEVENTS && window.navigator.userAgent.match(Hammer.MOBILE_REGEX), Hammer.EVENT_TYPES = {}, Hammer.DIRECTION_DOWN = "down", Hammer.DIRECTION_LEFT = "left", Hammer.DIRECTION_UP = "up", Hammer.DIRECTION_RIGHT = "right", Hammer.POINTER_MOUSE = "mouse", Hammer.POINTER_TOUCH = "touch", Hammer.POINTER_PEN = "pen", Hammer.UPDATE_VELOCITY_INTERVAL = 16, Hammer.EVENT_START = "start", Hammer.EVENT_MOVE = "move", Hammer.EVENT_END = "end", Hammer.DOCUMENT = window.document, Hammer.plugins = Hammer.plugins || {}, Hammer.gestures = Hammer.gestures || {}, Hammer.READY = !1, Hammer.utils = {
            extend: function(dest, src, merge) {
                for (var key in src) dest[key] !== undefined && merge || (dest[key] = src[key]);
                return dest
            },
            each: function(obj, iterator, context) {
                var i, o;
                if ("forEach" in obj) obj.forEach(iterator, context);
                else if (obj.length !== undefined) {
                    for (i = -1; o = obj[++i];)
                        if (iterator.call(context, o, i, obj) === !1) return
                } else
                    for (i in obj)
                        if (obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj) === !1) return
            },
            hasParent: function(node, parent) {
                for (; node;) {
                    if (node == parent) return !0;
                    node = node.parentNode
                }
                return !1
            },
            getCenter: function(touches) {
                var valuesX = [],
                    valuesY = [];
                return Hammer.utils.each(touches, function(touch) {
                    valuesX.push("undefined" != typeof touch.clientX ? touch.clientX : touch.pageX), valuesY.push("undefined" != typeof touch.clientY ? touch.clientY : touch.pageY)
                }), {
                    pageX: (Math.min.apply(Math, valuesX) + Math.max.apply(Math, valuesX)) / 2,
                    pageY: (Math.min.apply(Math, valuesY) + Math.max.apply(Math, valuesY)) / 2
                }
            },
            getVelocity: function(delta_time, delta_x, delta_y) {
                return {
                    x: Math.abs(delta_x / delta_time) || 0,
                    y: Math.abs(delta_y / delta_time) || 0
                }
            },
            getAngle: function(touch1, touch2) {
                var y = touch2.pageY - touch1.pageY,
                    x = touch2.pageX - touch1.pageX;
                return 180 * Math.atan2(y, x) / Math.PI
            },
            getDirection: function(touch1, touch2) {
                var x = Math.abs(touch1.pageX - touch2.pageX),
                    y = Math.abs(touch1.pageY - touch2.pageY);
                return x >= y ? touch1.pageX - touch2.pageX > 0 ? Hammer.DIRECTION_LEFT : Hammer.DIRECTION_RIGHT : touch1.pageY - touch2.pageY > 0 ? Hammer.DIRECTION_UP : Hammer.DIRECTION_DOWN
            },
            getDistance: function(touch1, touch2) {
                var x = touch2.pageX - touch1.pageX,
                    y = touch2.pageY - touch1.pageY;
                return Math.sqrt(x * x + y * y)
            },
            getScale: function(start, end) {
                return start.length >= 2 && end.length >= 2 ? this.getDistance(end[0], end[1]) / this.getDistance(start[0], start[1]) : 1
            },
            getRotation: function(start, end) {
                return start.length >= 2 && end.length >= 2 ? this.getAngle(end[1], end[0]) - this.getAngle(start[1], start[0]) : 0
            },
            isVertical: function(direction) {
                return direction == Hammer.DIRECTION_UP || direction == Hammer.DIRECTION_DOWN
            },
            toggleDefaultBehavior: function(element, css_props, toggle) {
                css_props && element && element.style && (Hammer.utils.each(["webkit", "moz", "Moz", "ms", "o", ""], function(vendor) {
                    Hammer.utils.each(css_props, function(value, prop) {
                        vendor && (prop = vendor + prop.substring(0, 1)
                            .toUpperCase() + prop.substring(1)), prop in element.style && (element.style[prop] = !toggle && value)
                    })
                }), "none" == css_props.userSelect && (element.onselectstart = !toggle && function() {
                    return !1
                }), "none" == css_props.userDrag && (element.ondragstart = !toggle && function() {
                    return !1
                }))
            }
        }, Hammer.Instance = function(element, options) {
            var self = this;
            return setup(), this.element = element, this.enabled = !0, this.options = Hammer.utils.extend(Hammer.utils.extend({}, Hammer.defaults), options || {}), this.options.stop_browser_behavior && Hammer.utils.toggleDefaultBehavior(this.element, this.options.stop_browser_behavior, !1), this.eventStartHandler = Hammer.event.onTouch(element, Hammer.EVENT_START, function(ev) {
                self.enabled && Hammer.detection.startDetect(self, ev)
            }), this.eventHandlers = [], this
        }, Hammer.Instance.prototype = {
            on: function(gesture, handler) {
                var gestures = gesture.split(" ");
                return Hammer.utils.each(gestures, function(gesture) {
                    this.element.addEventListener(gesture, handler, !1), this.eventHandlers.push({
                        gesture: gesture,
                        handler: handler
                    })
                }, this), this
            },
            off: function(gesture, handler) {
                var i, eh, gestures = gesture.split(" ");
                return Hammer.utils.each(gestures, function(gesture) {
                    for (this.element.removeEventListener(gesture, handler, !1), i = -1; eh = this.eventHandlers[++i];) eh.gesture === gesture && eh.handler === handler && this.eventHandlers.splice(i, 1)
                }, this), this
            },
            trigger: function(gesture, eventData) {
                eventData || (eventData = {});
                var event = Hammer.DOCUMENT.createEvent("Event");
                event.initEvent(gesture, !0, !0), event.gesture = eventData;
                var element = this.element;
                return Hammer.utils.hasParent(eventData.target, element) && (element = eventData.target), element.dispatchEvent(event), this
            },
            enable: function(state) {
                return this.enabled = state, this
            },
            dispose: function() {
                var i, eh;
                for (this.options.stop_browser_behavior && Hammer.utils.toggleDefaultBehavior(this.element, this.options.stop_browser_behavior, !0), i = -1; eh = this.eventHandlers[++i];) this.element.removeEventListener(eh.gesture, eh.handler, !1);
                return this.eventHandlers = [], Hammer.event.unbindDom(this.element, Hammer.EVENT_TYPES[Hammer.EVENT_START], this.eventStartHandler), null
            }
        };
        var last_move_event = null,
            enable_detect = !1,
            touch_triggered = !1;
        Hammer.event = {
            bindDom: function(element, type, handler) {
                var types = type.split(" ");
                Hammer.utils.each(types, function(type) {
                    element.addEventListener(type, handler, !1)
                })
            },
            unbindDom: function(element, type, handler) {
                var types = type.split(" ");
                Hammer.utils.each(types, function(type) {
                    element.removeEventListener(type, handler, !1)
                })
            },
            onTouch: function(element, eventType, handler) {
                var self = this,
                    bindDomOnTouch = function(ev) {
                        var srcEventType = ev.type.toLowerCase();
                        if (!srcEventType.match(/mouse/) || !touch_triggered) {
                            srcEventType.match(/touch/) || srcEventType.match(/pointerdown/) || srcEventType.match(/mouse/) && 1 === ev.which ? enable_detect = !0 : srcEventType.match(/mouse/) && !ev.which && (enable_detect = !1), srcEventType.match(/touch|pointer/) && (touch_triggered = !0);
                            var count_touches = 0;
                            enable_detect && (Hammer.HAS_POINTEREVENTS && eventType != Hammer.EVENT_END ? count_touches = Hammer.PointerEvent.updatePointer(eventType, ev) : srcEventType.match(/touch/) ? count_touches = ev.touches.length : touch_triggered || (count_touches = srcEventType.match(/up/) ? 0 : 1), count_touches > 0 && eventType == Hammer.EVENT_END ? eventType = Hammer.EVENT_MOVE : count_touches || (eventType = Hammer.EVENT_END), (count_touches || null === last_move_event) && (last_move_event = ev), handler.call(Hammer.detection, self.collectEventData(element, eventType, self.getTouchList(last_move_event, eventType), ev)), Hammer.HAS_POINTEREVENTS && eventType == Hammer.EVENT_END && (count_touches = Hammer.PointerEvent.updatePointer(eventType, ev))), count_touches || (last_move_event = null, enable_detect = !1, touch_triggered = !1, Hammer.PointerEvent.reset())
                        }
                    };
                return this.bindDom(element, Hammer.EVENT_TYPES[eventType], bindDomOnTouch), bindDomOnTouch
            },
            determineEventTypes: function() {
                var types;
                types = Hammer.HAS_POINTEREVENTS ? Hammer.PointerEvent.getEvents() : Hammer.NO_MOUSEEVENTS ? ["touchstart", "touchmove", "touchend touchcancel"] : ["touchstart mousedown", "touchmove mousemove", "touchend touchcancel mouseup"], Hammer.EVENT_TYPES[Hammer.EVENT_START] = types[0], Hammer.EVENT_TYPES[Hammer.EVENT_MOVE] = types[1], Hammer.EVENT_TYPES[Hammer.EVENT_END] = types[2]
            },
            getTouchList: function(ev) {
                return Hammer.HAS_POINTEREVENTS ? Hammer.PointerEvent.getTouchList() : ev.touches ? ev.touches : (ev.identifier = 1, [ev])
            },
            collectEventData: function(element, eventType, touches, ev) {
                var pointerType = Hammer.POINTER_TOUCH;
                return (ev.type.match(/mouse/) || Hammer.PointerEvent.matchType(Hammer.POINTER_MOUSE, ev)) && (pointerType = Hammer.POINTER_MOUSE), {
                    center: Hammer.utils.getCenter(touches),
                    timeStamp: (new Date)
                        .getTime(),
                    target: ev.target,
                    touches: touches,
                    eventType: eventType,
                    pointerType: pointerType,
                    srcEvent: ev,
                    preventDefault: function() {
                        this.srcEvent.preventManipulation && this.srcEvent.preventManipulation(), this.srcEvent.preventDefault && this.srcEvent.preventDefault()
                    },
                    stopPropagation: function() {
                        this.srcEvent.stopPropagation()
                    },
                    stopDetect: function() {
                        return Hammer.detection.stopDetect()
                    }
                }
            }
        }, Hammer.PointerEvent = {
            pointers: {},
            getTouchList: function() {
                var self = this,
                    touchlist = [];
                return Hammer.utils.each(self.pointers, function(pointer) {
                    touchlist.push(pointer)
                }), touchlist
            },
            updatePointer: function(type, pointerEvent) {
                return type == Hammer.EVENT_END ? delete this.pointers[pointerEvent.pointerId] : (pointerEvent.identifier = pointerEvent.pointerId, this.pointers[pointerEvent.pointerId] = pointerEvent), Object.keys(this.pointers)
                    .length
            },
            matchType: function(pointerType, ev) {
                if (!ev.pointerType) return !1;
                var pt = ev.pointerType,
                    types = {};
                return types[Hammer.POINTER_MOUSE] = pt === ev.MSPOINTER_TYPE_MOUSE || pt === Hammer.POINTER_MOUSE, types[Hammer.POINTER_TOUCH] = pt === ev.MSPOINTER_TYPE_TOUCH || pt === Hammer.POINTER_TOUCH, types[Hammer.POINTER_PEN] = pt === ev.MSPOINTER_TYPE_PEN || pt === Hammer.POINTER_PEN, types[pointerType]
            },
            getEvents: function() {
                return ["pointerdown MSPointerDown", "pointermove MSPointerMove", "pointerup pointercancel MSPointerUp MSPointerCancel"]
            },
            reset: function() {
                this.pointers = {}
            }
        }, Hammer.detection = {
            gestures: [],
            current: null,
            previous: null,
            stopped: !1,
            startDetect: function(inst, eventData) {
                this.current || (this.stopped = !1, this.current = {
                    inst: inst,
                    startEvent: Hammer.utils.extend({}, eventData),
                    lastEvent: !1,
                    lastVEvent: !1,
                    velocity: !1,
                    name: ""
                }, this.detect(eventData))
            },
            detect: function(eventData) {
                if (this.current && !this.stopped) {
                    eventData = this.extendEventData(eventData);
                    var inst_options = this.current.inst.options;
                    return Hammer.utils.each(this.gestures, function(gesture) {
                        return this.stopped || inst_options[gesture.name] === !1 || gesture.handler.call(gesture, eventData, this.current.inst) !== !1 ? void 0 : (this.stopDetect(), !1)
                    }, this), this.current && (this.current.lastEvent = eventData), eventData.eventType == Hammer.EVENT_END && !eventData.touches.length - 1 && this.stopDetect(), eventData
                }
            },
            stopDetect: function() {
                this.previous = Hammer.utils.extend({}, this.current), this.current = null, this.stopped = !0
            },
            extendEventData: function(ev) {
                var startEv = this.current.startEvent,
                    lastVEv = this.current.lastVEvent;
                !startEv || ev.touches.length == startEv.touches.length && ev.touches !== startEv.touches || (startEv.touches = [], Hammer.utils.each(ev.touches, function(touch) {
                    startEv.touches.push(Hammer.utils.extend({}, touch))
                }));
                var interimAngle, interimDirection, delta_time = ev.timeStamp - startEv.timeStamp,
                    delta_x = ev.center.pageX - startEv.center.pageX,
                    delta_y = ev.center.pageY - startEv.center.pageY,
                    velocity = this.current.velocity;
                return lastVEv !== !1 && ev.timeStamp - lastVEv.timeStamp > Hammer.UPDATE_VELOCITY_INTERVAL ? (velocity = Hammer.utils.getVelocity(ev.timeStamp - lastVEv.timeStamp, ev.center.pageX - lastVEv.center.pageX, ev.center.pageY - lastVEv.center.pageY), this.current.lastVEvent = ev, velocity.x > 0 && velocity.y > 0 && (this.current.velocity = velocity)) : this.current.velocity === !1 && (velocity = Hammer.utils.getVelocity(delta_time, delta_x, delta_y), this.current.velocity = velocity, this.current.lastVEvent = ev), ev.eventType == Hammer.EVENT_END ? (interimAngle = this.current.lastEvent && this.current.lastEvent.interimAngle, interimDirection = this.current.lastEvent && this.current.lastEvent.interimDirection) : (interimAngle = this.current.lastEvent && Hammer.utils.getAngle(this.current.lastEvent.center, ev.center), interimDirection = this.current.lastEvent && Hammer.utils.getDirection(this.current.lastEvent.center, ev.center)), Hammer.utils.extend(ev, {
                    deltaTime: delta_time,
                    deltaX: delta_x,
                    deltaY: delta_y,
                    velocityX: velocity.x,
                    velocityY: velocity.y,
                    distance: Hammer.utils.getDistance(startEv.center, ev.center),
                    angle: Hammer.utils.getAngle(startEv.center, ev.center),
                    interimAngle: interimAngle,
                    direction: Hammer.utils.getDirection(startEv.center, ev.center),
                    interimDirection: interimDirection,
                    scale: Hammer.utils.getScale(startEv.touches, ev.touches),
                    rotation: Hammer.utils.getRotation(startEv.touches, ev.touches),
                    startEvent: startEv
                }), ev
            },
            register: function(gesture) {
                var options = gesture.defaults || {};
                return options[gesture.name] === undefined && (options[gesture.name] = !0), Hammer.utils.extend(Hammer.defaults, options, !0), gesture.index = gesture.index || 1e3, this.gestures.push(gesture), this.gestures.sort(function(a, b) {
                    return a.index < b.index ? -1 : a.index > b.index ? 1 : 0
                }), this.gestures
            }
        }, Hammer.gestures.Drag = {
            name: "drag",
            index: 50,
            defaults: {
                drag_min_distance: 10,
                correct_for_drag_min_distance: !0,
                drag_max_touches: 1,
                drag_block_horizontal: !1,
                drag_block_vertical: !1,
                drag_lock_to_axis: !1,
                drag_lock_min_distance: 25
            },
            triggered: !1,
            handler: function(ev, inst) {
                if (Hammer.detection.current.name != this.name && this.triggered) return inst.trigger(this.name + "end", ev), void(this.triggered = !1);
                if (!(inst.options.drag_max_touches > 0 && ev.touches.length > inst.options.drag_max_touches)) switch (ev.eventType) {
                    case Hammer.EVENT_START:
                        this.triggered = !1;
                        break;
                    case Hammer.EVENT_MOVE:
                        if (ev.distance < inst.options.drag_min_distance && Hammer.detection.current.name != this.name) return;
                        if (Hammer.detection.current.name != this.name && (Hammer.detection.current.name = this.name, inst.options.correct_for_drag_min_distance && ev.distance > 0)) {
                            var factor = Math.abs(inst.options.drag_min_distance / ev.distance);
                            Hammer.detection.current.startEvent.center.pageX += ev.deltaX * factor, Hammer.detection.current.startEvent.center.pageY += ev.deltaY * factor, ev = Hammer.detection.extendEventData(ev)
                        }(Hammer.detection.current.lastEvent.drag_locked_to_axis || inst.options.drag_lock_to_axis && inst.options.drag_lock_min_distance <= ev.distance) && (ev.drag_locked_to_axis = !0);
                        var last_direction = Hammer.detection.current.lastEvent.direction;
                        ev.drag_locked_to_axis && last_direction !== ev.direction && (ev.direction = Hammer.utils.isVertical(last_direction) ? ev.deltaY < 0 ? Hammer.DIRECTION_UP : Hammer.DIRECTION_DOWN : ev.deltaX < 0 ? Hammer.DIRECTION_LEFT : Hammer.DIRECTION_RIGHT), this.triggered || (inst.trigger(this.name + "start", ev), this.triggered = !0), inst.trigger(this.name, ev), inst.trigger(this.name + ev.direction, ev);
                        var is_vertical = Hammer.utils.isVertical(ev.direction);
                        (inst.options.drag_block_vertical && is_vertical || inst.options.drag_block_horizontal && !is_vertical) && ev.preventDefault();
                        break;
                    case Hammer.EVENT_END:
                        this.triggered && inst.trigger(this.name + "end", ev), this.triggered = !1
                }
            }
        }, Hammer.gestures.Hold = {
            name: "hold",
            index: 10,
            defaults: {
                hold_timeout: 500,
                hold_threshold: 1
            },
            timer: null,
            handler: function(ev, inst) {
                switch (ev.eventType) {
                    case Hammer.EVENT_START:
                        clearTimeout(this.timer), Hammer.detection.current.name = this.name, this.timer = setTimeout(function() {
                            "hold" == Hammer.detection.current.name && inst.trigger("hold", ev)
                        }, inst.options.hold_timeout);
                        break;
                    case Hammer.EVENT_MOVE:
                        ev.distance > inst.options.hold_threshold && clearTimeout(this.timer);
                        break;
                    case Hammer.EVENT_END:
                        clearTimeout(this.timer)
                }
            }
        }, Hammer.gestures.Release = {
            name: "release",
            index: 1 / 0,
            handler: function(ev, inst) {
                ev.eventType == Hammer.EVENT_END && inst.trigger(this.name, ev)
            }
        }, Hammer.gestures.Swipe = {
            name: "swipe",
            index: 40,
            defaults: {
                swipe_min_touches: 1,
                swipe_max_touches: 1,
                swipe_velocity: .7
            },
            handler: function(ev, inst) {
                if (ev.eventType == Hammer.EVENT_END) {
                    if (ev.touches.length < inst.options.swipe_min_touches || ev.touches.length > inst.options.swipe_max_touches) return;
                    (ev.velocityX > inst.options.swipe_velocity || ev.velocityY > inst.options.swipe_velocity) && (inst.trigger(this.name, ev), inst.trigger(this.name + ev.direction, ev))
                }
            }
        }, Hammer.gestures.Tap = {
            name: "tap",
            index: 100,
            defaults: {
                tap_max_touchtime: 250,
                tap_max_distance: 10,
                tap_always: !0,
                doubletap_distance: 20,
                doubletap_interval: 300
            },
            has_moved: !1,
            handler: function(ev, inst) {
                var prev, since_prev, did_doubletap;
                ev.eventType == Hammer.EVENT_START ? this.has_moved = !1 : ev.eventType != Hammer.EVENT_MOVE || this.moved ? ev.eventType == Hammer.EVENT_END && "touchcancel" != ev.srcEvent.type && ev.deltaTime < inst.options.tap_max_touchtime && !this.has_moved && (prev = Hammer.detection.previous, since_prev = prev && ev.timeStamp - prev.lastEvent.timeStamp, did_doubletap = !1, prev && "tap" == prev.name && since_prev && since_prev < inst.options.doubletap_interval && ev.distance < inst.options.doubletap_distance && (inst.trigger("doubletap", ev), did_doubletap = !0), (!did_doubletap || inst.options.tap_always) && (Hammer.detection.current.name = "tap", inst.trigger(Hammer.detection.current.name, ev))) : this.has_moved = ev.distance > inst.options.tap_max_distance
            }
        }, Hammer.gestures.Touch = {
            name: "touch",
            index: -1 / 0,
            defaults: {
                prevent_default: !1,
                prevent_mouseevents: !1
            },
            handler: function(ev, inst) {
                return inst.options.prevent_mouseevents && ev.pointerType == Hammer.POINTER_MOUSE ? void ev.stopDetect() : (inst.options.prevent_default && ev.preventDefault(), void(ev.eventType == Hammer.EVENT_START && inst.trigger(this.name, ev)))
            }
        }, Hammer.gestures.Transform = {
            name: "transform",
            index: 45,
            defaults: {
                transform_min_scale: .01,
                transform_min_rotation: 1,
                transform_always_block: !1,
                transform_within_instance: !1
            },
            triggered: !1,
            handler: function(ev, inst) {
                if (Hammer.detection.current.name != this.name && this.triggered) return inst.trigger(this.name + "end", ev), void(this.triggered = !1);
                if (!(ev.touches.length < 2)) {
                    if (inst.options.transform_always_block && ev.preventDefault(), inst.options.transform_within_instance)
                        for (var i = -1; ev.touches[++i];)
                            if (!Hammer.utils.hasParent(ev.touches[i].target, inst.element)) return;
                    switch (ev.eventType) {
                        case Hammer.EVENT_START:
                            this.triggered = !1;
                            break;
                        case Hammer.EVENT_MOVE:
                            var scale_threshold = Math.abs(1 - ev.scale),
                                rotation_threshold = Math.abs(ev.rotation);
                            if (scale_threshold < inst.options.transform_min_scale && rotation_threshold < inst.options.transform_min_rotation) return;
                            Hammer.detection.current.name = this.name, this.triggered || (inst.trigger(this.name + "start", ev), this.triggered = !0), inst.trigger(this.name, ev), rotation_threshold > inst.options.transform_min_rotation && inst.trigger("rotate", ev), scale_threshold > inst.options.transform_min_scale && (inst.trigger("pinch", ev), inst.trigger("pinch" + (ev.scale < 1 ? "in" : "out"), ev));
                            break;
                        case Hammer.EVENT_END:
                            this.triggered && inst.trigger(this.name + "end", ev), this.triggered = !1
                    }
                }
            }
        }, window.Hammer = Hammer, "object" == typeof module && module.exports && (module.exports = Hammer), "function" == typeof define && define.amd ? define(["hammerjs", "jquery"], setupPlugin) : setupPlugin(window.Hammer, window.jQuery || window.Zepto)
    }(window),
    function($) {
        function getVendorPropertyName(prop) {
            if (prop in div.style) return prop;
            var prefixes = ["Moz", "Webkit", "O", "ms"],
                prop_ = prop.charAt(0)
                .toUpperCase() + prop.substr(1);
            if (prop in div.style) return prop;
            for (var i = 0; i < prefixes.length; ++i) {
                var vendorProp = prefixes[i] + prop_;
                if (vendorProp in div.style) return vendorProp
            }
        }

        function checkTransform3dSupport() {
            return div.style[support.transform] = "", div.style[support.transform] = "rotateY(90deg)", "" !== div.style[support.transform]
        }

        function Transform(str) {
            return "string" == typeof str && this.parse(str), this
        }

        function callOrQueue(self, queue, fn) {
            queue === !0 ? self.queue(fn) : queue ? self.queue(queue, fn) : fn()
        }

        function getProperties(props) {
            var re = [];
            return $.each(props, function(key) {
                key = $.camelCase(key), key = $.transit.propertyMap[key] || $.cssProps[key] || key, key = uncamel(key), -1 === $.inArray(key, re) && re.push(key)
            }), re
        }

        function getTransition(properties, duration, easing, delay) {
            var props = getProperties(properties);
            $.cssEase[easing] && (easing = $.cssEase[easing]);
            var attribs = "" + toMS(duration) + " " + easing;
            parseInt(delay, 10) > 0 && (attribs += " " + toMS(delay));
            var transitions = [];
            return $.each(props, function(i, name) {
                transitions.push(name + " " + attribs)
            }), transitions.join(", ")
        }

        function registerCssHook(prop, isPixels) {
            isPixels || ($.cssNumber[prop] = !0), $.transit.propertyMap[prop] = support.transform, $.cssHooks[prop] = {
                get: function(elem) {
                    var t = $(elem)
                        .css("transit:transform");
                    return t.get(prop)
                },
                set: function(elem, value) {
                    var t = $(elem)
                        .css("transit:transform");
                    t.setFromString(prop, value), $(elem)
                        .css({
                            "transit:transform": t
                        })
                }
            }
        }

        function uncamel(str) {
            return str.replace(/([A-Z])/g, function(letter) {
                return "-" + letter.toLowerCase()
            })
        }

        function unit(i, units) {
            return "string" != typeof i || i.match(/^[\-0-9\.]+$/) ? "" + i + units : i
        }

        function toMS(duration) {
            var i = duration;
            return $.fx.speeds[i] && (i = $.fx.speeds[i]), unit(i, "ms")
        }
        $.transit = {
            version: "0.9.9",
            propertyMap: {
                marginLeft: "margin",
                marginRight: "margin",
                marginBottom: "margin",
                marginTop: "margin",
                paddingLeft: "padding",
                paddingRight: "padding",
                paddingBottom: "padding",
                paddingTop: "padding"
            },
            enabled: !0,
            useTransitionEnd: !1
        };
        var div = document.createElement("div"),
            support = {},
            isChrome = navigator.userAgent.toLowerCase()
            .indexOf("chrome") > -1;
        support.transition = getVendorPropertyName("transition"), support.transitionDelay = getVendorPropertyName("transitionDelay"), support.transform = getVendorPropertyName("transform"), support.transformOrigin = getVendorPropertyName("transformOrigin"), support.transform3d = checkTransform3dSupport();
        var eventNames = {
                transition: "transitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd",
                WebkitTransition: "webkitTransitionEnd",
                msTransition: "MSTransitionEnd"
            },
            transitionEnd = support.transitionEnd = eventNames[support.transition] || null;
        for (var key in support) support.hasOwnProperty(key) && "undefined" == typeof $.support[key] && ($.support[key] = support[key]);
        div = null, $.cssEase = {
            _default: "ease",
            "in": "ease-in",
            out: "ease-out",
            "in-out": "ease-in-out",
            snap: "cubic-bezier(0,1,.5,1)",
            easeOutCubic: "cubic-bezier(.215,.61,.355,1)",
            easeInOutCubic: "cubic-bezier(.645,.045,.355,1)",
            easeInCirc: "cubic-bezier(.6,.04,.98,.335)",
            easeOutCirc: "cubic-bezier(.075,.82,.165,1)",
            easeInOutCirc: "cubic-bezier(.785,.135,.15,.86)",
            easeInExpo: "cubic-bezier(.95,.05,.795,.035)",
            easeOutExpo: "cubic-bezier(.19,1,.22,1)",
            easeInOutExpo: "cubic-bezier(1,0,0,1)",
            easeInQuad: "cubic-bezier(.55,.085,.68,.53)",
            easeOutQuad: "cubic-bezier(.25,.46,.45,.94)",
            easeInOutQuad: "cubic-bezier(.455,.03,.515,.955)",
            easeInQuart: "cubic-bezier(.895,.03,.685,.22)",
            easeOutQuart: "cubic-bezier(.165,.84,.44,1)",
            easeInOutQuart: "cubic-bezier(.77,0,.175,1)",
            easeInQuint: "cubic-bezier(.755,.05,.855,.06)",
            easeOutQuint: "cubic-bezier(.23,1,.32,1)",
            easeInOutQuint: "cubic-bezier(.86,0,.07,1)",
            easeInSine: "cubic-bezier(.47,0,.745,.715)",
            easeOutSine: "cubic-bezier(.39,.575,.565,1)",
            easeInOutSine: "cubic-bezier(.445,.05,.55,.95)",
            easeInBack: "cubic-bezier(.6,-.28,.735,.045)",
            easeOutBack: "cubic-bezier(.175, .885,.32,1.275)",
            easeInOutBack: "cubic-bezier(.68,-.55,.265,1.55)"
        }, $.cssHooks["transit:transform"] = {
            get: function(elem) {
                return $(elem)
                    .data("transform") || new Transform
            },
            set: function(elem, v) {
                var value = v;
                value instanceof Transform || (value = new Transform(value)), elem.style[support.transform] = "WebkitTransform" !== support.transform || isChrome ? value.toString() : value.toString(!0), $(elem)
                    .data("transform", value)
            }
        }, $.cssHooks.transform = {
            set: $.cssHooks["transit:transform"].set
        }, $.fn.jquery < "1.8" && ($.cssHooks.transformOrigin = {
            get: function(elem) {
                return elem.style[support.transformOrigin]
            },
            set: function(elem, value) {
                elem.style[support.transformOrigin] = value
            }
        }, $.cssHooks.transition = {
            get: function(elem) {
                return elem.style[support.transition]
            },
            set: function(elem, value) {
                elem.style[support.transition] = value
            }
        }), registerCssHook("scale"), registerCssHook("translate"), registerCssHook("rotate"), registerCssHook("rotateX"), registerCssHook("rotateY"), registerCssHook("rotate3d"), registerCssHook("perspective"), registerCssHook("skewX"), registerCssHook("skewY"), registerCssHook("x", !0), registerCssHook("y", !0), Transform.prototype = {
            setFromString: function(prop, val) {
                var args = "string" == typeof val ? val.split(",") : val.constructor === Array ? val : [val];
                args.unshift(prop), Transform.prototype.set.apply(this, args)
            },
            set: function(prop) {
                var args = Array.prototype.slice.apply(arguments, [1]);
                this.setter[prop] ? this.setter[prop].apply(this, args) : this[prop] = args.join(",")
            },
            get: function(prop) {
                return this.getter[prop] ? this.getter[prop].apply(this) : this[prop] || 0
            },
            setter: {
                rotate: function(theta) {
                    this.rotate = unit(theta, "deg")
                },
                rotateX: function(theta) {
                    this.rotateX = unit(theta, "deg")
                },
                rotateY: function(theta) {
                    this.rotateY = unit(theta, "deg")
                },
                scale: function(x, y) {
                    void 0 === y && (y = x), this.scale = x + "," + y
                },
                skewX: function(x) {
                    this.skewX = unit(x, "deg")
                },
                skewY: function(y) {
                    this.skewY = unit(y, "deg")
                },
                perspective: function(dist) {
                    this.perspective = unit(dist, "px")
                },
                x: function(x) {
                    this.set("translate", x, null)
                },
                y: function(y) {
                    this.set("translate", null, y)
                },
                translate: function(x, y) {
                    void 0 === this._translateX && (this._translateX = 0), void 0 === this._translateY && (this._translateY = 0), null !== x && void 0 !== x && (this._translateX = unit(x, "px")), null !== y && void 0 !== y && (this._translateY = unit(y, "px")), this.translate = this._translateX + "," + this._translateY
                }
            },
            getter: {
                x: function() {
                    return this._translateX || 0
                },
                y: function() {
                    return this._translateY || 0
                },
                scale: function() {
                    var s = (this.scale || "1,1")
                        .split(",");
                    return s[0] && (s[0] = parseFloat(s[0])), s[1] && (s[1] = parseFloat(s[1])), s[0] === s[1] ? s[0] : s
                },
                rotate3d: function() {
                    for (var s = (this.rotate3d || "0,0,0,0deg")
                            .split(","), i = 0; 3 >= i; ++i) s[i] && (s[i] = parseFloat(s[i]));
                    return s[3] && (s[3] = unit(s[3], "deg")), s
                }
            },
            parse: function(str) {
                var self = this;
                str.replace(/([a-zA-Z0-9]+)\((.*?)\)/g, function(x, prop, val) {
                    self.setFromString(prop, val)
                })
            },
            toString: function(use3d) {
                var re = [];
                for (var i in this)
                    if (this.hasOwnProperty(i)) {
                        if (!support.transform3d && ("rotateX" === i || "rotateY" === i || "perspective" === i || "transformOrigin" === i)) continue;
                        "_" !== i[0] && re.push(use3d && "scale" === i ? i + "3d(" + this[i] + ",1)" : use3d && "translate" === i ? i + "3d(" + this[i] + ",0)" : i + "(" + this[i] + ")")
                    }
                return re.join(" ")
            }
        }, $.fn.transition = $.fn.transit = function(properties, duration, easing, callback) {
            var self = this,
                delay = 0,
                queue = !0;
            "function" == typeof duration && (callback = duration, duration = void 0), "function" == typeof easing && (callback = easing, easing = void 0), "undefined" != typeof properties.easing && (easing = properties.easing, delete properties.easing), "undefined" != typeof properties.duration && (duration = properties.duration, delete properties.duration), "undefined" != typeof properties.complete && (callback = properties.complete, delete properties.complete), "undefined" != typeof properties.queue && (queue = properties.queue, delete properties.queue), "undefined" != typeof properties.delay && (delay = properties.delay, delete properties.delay), "undefined" == typeof duration && (duration = $.fx.speeds._default), "undefined" == typeof easing && (easing = $.cssEase._default), duration = toMS(duration);
            var transitionValue = getTransition(properties, duration, easing, delay),
                work = $.transit.enabled && support.transition,
                i = work ? parseInt(duration, 10) + parseInt(delay, 10) : 0;
            if (0 === i) {
                var fn = function(next) {
                    self.css(properties), callback && callback.apply(self), next && next()
                };
                return callOrQueue(self, queue, fn), self
            }
            var oldTransitions = {},
                run = function(nextCall) {
                    var bound = !1,
                        cb = function() {
                            bound && self.unbind(transitionEnd, cb), i > 0 && self.each(function() {
                                this.style[support.transition] = oldTransitions[this] || null
                            }), "function" == typeof callback && callback.apply(self), "function" == typeof nextCall && nextCall()
                        };
                    i > 0 && transitionEnd && $.transit.useTransitionEnd ? (bound = !0, self.bind(transitionEnd, cb)) : window.setTimeout(cb, i), self.each(function() {
                        i > 0 && (this.style[support.transition] = transitionValue), $(this)
                            .css(properties)
                    })
                },
                deferredRun = function(next) {
                    this.offsetWidth, run(next)
                };
            return callOrQueue(self, queue, deferredRun), this
        }, $.transit.getTransitionValue = getTransition
    }(jQuery),
    function() {
        eTrackerCommerceAPI = function() {
            return this instanceof eTrackerCommerceAPI ? (this.__ORDER__ = "order", this.__VIEW_PRODUCT__ = "viewProduct", this.__INSERT_TO_BASKET__ = "insertToBasket", void(this.__REMOVE_FROM_BASKET__ = "removeFromBasket")) : new eTrackerCommerceAPI
        }, eTrackerCommerceAPI.prototype = {
            _sendEvent: function(type, product, quantity) {
                var _isLegalQuantity = !!quantity;
                new Log({
                    type: "info",
                    message: "Call: eTrackerCommerceAPI._sendEvent( " + type + ", " + (JSON.stringify(product) + (_isLegalQuantity ? ", " + quantity : "")) + ")",
                    level: 1
                }), _isLegalQuantity || type !== this.__INSERT_TO_BASKET__ && type !== this.__REMOVE_FROM_BASKET__ || new Log({
                    type: "error",
                    message: 'Could not send Event! "' + type + '" Events need a quantity!',
                    level: 4
                });
                try {
                    return _isLegalQuantity ? etCommerce.sendEvent(type, product, parseInt(quantity, 10)) : etCommerce.sendEvent(type, product)
                } catch (error) {
                    new Log({
                        type: "error",
                        message: "etCommerce not defined",
                        level: 4
                    })
                }
            },
            viewProduct: function(product) {
                return this._sendEvent(this.__VIEW_PRODUCT__, product)
            },
            insertToBasket: function(product, quantity) {
                return this._sendEvent(this.__INSERT_TO_BASKET__, product, quantity)
            },
            removeFromBasket: function(product, quantity) {
                return this._sendEvent(this.__REMOVE_FROM_BASKET__, product, quantity)
            },
            order: function(order) {
                var products = order.basket.products || null;
                if (products && $.isArray(order.basket.products)) {
                    for (var i = 0, l = products.length; l > i; i++) products[i].product && (products[i].product = this._encodeProductJson(products[i].product));
                    order.basket.products = products
                }
                return this._sendEvent(this.__ORDER__, order)
            },
            getProductBySku: function(sku) {
                sku || new Log({
                    type: "error",
                    message: 'Argument "SKU" could not be empty',
                    level: 4
                });
                var i = 0,
                    o = shop.etracker.products,
                    l = o.length;
                for (i; l > i; i++)
                    if (o[i].id === sku) return o[i];
                return !1
            },
            getProductByAjax: function(sku, quantity, error) {
                var self = this;
                return quantity = quantity ? quantity : 1, self.product = !1, self.error = error ? !0 : !1, $.ajax({
                    url: shop.url.origin + shop.url.base + "eTracker/getJsonProduct/" + sku + "?quantity=" + quantity,
                    type: "GET",
                    cache: !0,
                    async: !1,
                    success: function(data) {
                        self.product = data
                    },
                    error: function() {
                        return self.error ? void 0 : (self.error = !0, self.getProductByAjax("l" + sku, quantity, !0))
                    }
                }), self.product
            },
            _encodeProductJson: function(productObj) {
                if (productObj && $.isPlainObject(productObj))
                    for (var prop in productObj)
                        if ($.isArray(productObj[prop]))
                            for (var i = 0, l = productObj[prop].length; l > i; i++) productObj[prop][i] = shop.encodeRfc3986(productObj[prop][i]);
                        else if ($.isPlainObject(productObj[prop])) {
                    var newObj = {};
                    for (var propInObj in productObj[prop]) newObj[propInObj] = shop.encodeRfc3986(productObj[prop][propInObj]);
                    productObj[prop] = newObj
                } else productObj[prop] = shop.encodeRfc3986(productObj[prop]);
                return productObj
            },
            getProductJSON: function(sku, quantity) {
                var product = this.getProductBySku(sku),
                    productObj = quantity || !product ? this.getProductByAjax(sku, quantity) : product;
                return this._encodeProductJson(productObj)
            }
        }
    }(),
    function($) {
        var ocNavMoving = !1,
            ocNavOpened = !1,
            privateMethods = {
                isUrl: function(str) {
                    var pattern = new RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$", "i");
                    return pattern.test(str) ? !0 : !1
                },
                loadContent: function($menu, content) {
                    $menu.html(content)
                },
                addPrefix: function($element) {
                    var elementId = $element.attr("id"),
                        elementClass = $element.attr("class");
                    "string" == typeof elementId && "" !== elementId && $element.attr("id", elementId.replace(/([A-Za-z0-9_.\-]+)/g, "ocNav-id-$1")), "string" == typeof elementClass && "" !== elementClass && "ocNav-inner" !== elementClass && $element.attr("class", elementClass.replace(/([A-Za-z0-9_.\-]+)/g, "ocNav-class-$1")), $element.removeAttr("style")
                },
                execute: function(action, name, callback) {
                    "function" == typeof name ? (callback = name, name = "ocNav") : name || (name = "ocNav");
                    var bodyAnimation, menuAnimation, scrollTop, $menu = $("#" + name),
                        $body = $($menu.data("body")),
                        $html = $("html"),
                        menuWidth = $menu.outerWidth(!0),
                        speed = $menu.data("speed"),
                        side = $menu.data("side"),
                        displace = $menu.data("displace"),
                        onOpen = $menu.data("onOpen"),
                        onClose = $menu.data("onClose"),
                        bodyClass = "ocNav" === name ? "ocNav-open" : "ocNav-open " + name + "-open";
                    if ("open" === action || "toggle" === action && !$menu.is(":visible")) {
                        if ($menu.is(":visible") || ocNavMoving) return;
                        if (ocNavOpened !== !1) return void methods.close(ocNavOpened, function() {
                            methods.open(name)
                        });
                        ocNavMoving = !0, "left" === side ? (bodyAnimation = {
                                left: menuWidth + "px"
                            }, menuAnimation = {
                                left: "0px"
                            }) : (bodyAnimation = {
                                right: menuWidth + "px"
                            }, menuAnimation = {
                                right: "0px"
                            }), $body.is("body") && (scrollTop = $html.scrollTop(), $html.css("overflow-x", "hidden")
                                .scrollTop(scrollTop)), displace ? $body.addClass("ocNav-animating")
                            .css({
                                width: $body.width(),
                                position: "absolute",
                                overflow: "hidden"
                            })
                            .animate(bodyAnimation, speed, function() {
                                $(this)
                                    .addClass(bodyClass)
                            }) : setTimeout(function() {
                                $(this)
                                    .addClass(bodyClass)
                            }, speed), $menu.css("display", "block")
                            .animate(menuAnimation, speed, function() {
                                ocNavMoving = !1, ocNavOpened = name, "function" == typeof callback && callback(name), $body.removeClass("ocNav-animating")
                            }), onOpen()
                    } else {
                        if (!$menu.is(":visible") || ocNavMoving) return;
                        ocNavMoving = !0, "left" === side ? (bodyAnimation = {
                                left: 0
                            }, menuAnimation = {
                                left: "-" + menuWidth + "px"
                            }) : (bodyAnimation = {
                                right: 0
                            }, menuAnimation = {
                                right: "-" + menuWidth + "px"
                            }), $body.is("body") && (scrollTop = $html.scrollTop(), $html.removeAttr("style")
                                .scrollTop(scrollTop)), $body.addClass("ocNav-animating")
                            .animate(bodyAnimation, speed)
                            .removeClass(bodyClass), $menu.animate(menuAnimation, speed, function() {
                                $menu.removeAttr("style")
                                    .hide(), $body.removeAttr("style"), $("html")
                                    .removeAttr("style"), ocNavMoving = !1, ocNavOpened = !1, "function" == typeof callback && callback(name), $body.removeClass("ocNav-animating")
                            }), onClose()
                    }
                }
            },
            methods = {
                open: function(name, callback) {
                    privateMethods.execute("open", name, callback)
                },
                close: function(name, callback) {
                    privateMethods.execute("close", name, callback)
                },
                toggle: function(name, callback) {
                    privateMethods.execute("toggle", name, callback)
                },
                toogle: function(name, callback) {
                    privateMethods.execute("toggle", name, callback)
                }
            };
        $.ocNav = function(method) {
            return methods[method] ? methods[method].apply(this, Array.prototype.slice.call(arguments, 1)) : "function" != typeof method && "string" != typeof method && method ? void $.error("Method " + method + " does not exist on jQuery.ocNav") : methods.toggle.apply(this, arguments)
        }, $.fn.ocNav = function(options) {
            var settings = $.extend({
                    name: "ocNav",
                    speed: 200,
                    side: "left",
                    source: null,
                    renaming: !0,
                    body: "body",
                    displace: !0,
                    onOpen: function() {},
                    onClose: function() {}
                }, options),
                name = settings.name,
                $sideMenu = $("#" + name);
            if (0 === $sideMenu.length && ($sideMenu = $("<div />")
                    .attr("id", name)
                    .appendTo($("body"))), $sideMenu.addClass("ocNav")
                .addClass(settings.side)
                .data({
                    speed: settings.speed,
                    side: settings.side,
                    body: settings.body,
                    displace: settings.displace,
                    onOpen: settings.onOpen,
                    onClose: settings.onClose
                }), "function" == typeof settings.source) {
                var newContent = settings.source(name);
                privateMethods.loadContent($sideMenu, newContent)
            } else if ("string" == typeof settings.source && privateMethods.isUrl(settings.source)) $.get(settings.source, function(data) {
                privateMethods.loadContent($sideMenu, data)
            });
            else if ("string" == typeof settings.source) {
                var htmlContent = "",
                    selectors = settings.source.split(",");
                if ($.each(selectors, function(index, element) {
                        htmlContent += '<div class="ocNav-inner">' + $(element)
                            .html() + "</div>"
                    }), settings.renaming) {
                    var $htmlContent = $("<div />")
                        .html(htmlContent);
                    $htmlContent.find("*")
                        .each(function(index, element) {
                            var $element = $(element);
                            privateMethods.addPrefix($element)
                        }), htmlContent = $htmlContent.html()
                }
                privateMethods.loadContent($sideMenu, htmlContent)
            } else null !== settings.source && $.error("Invalid ocNav Source");
            return this.each(function() {
                var $this = $(this),
                    data = $this.data("ocNav");
                data || ($this.data("ocNav", name), $this.hammer()
                    .on("touch tab click", function(e) {
                        "click" === e.type && e.preventDefault(), e.gesture.preventDefault(), e.gesture.stopPropagation(), "click" !== e.type && methods.toggle(name)
                    }))
            })
        }
    }(jQuery);
var PrudsysApi;
! function() {
    "use strict";
    PrudsysApi = function(amountOfAllCarousels) {
        this.initalProducts = "", this.amountOfAllCarousels = amountOfAllCarousels, this.currentCarouselsLoaded = 0, this.allCarouselLoaded = !1, this.$carousels = null
    }, PrudsysApi.prototype = {
        _validateProductData: function(data) {
            var newData = data || null;
            return newData && (newData = $.trim(newData.replace(/undefined,\s|undefined,/g, "")), newData.lastIndexOf(",") === newData.length - 1 && (newData = newData.slice(0, data.length - 2))), newData
        },
        send: function(data) {
            var url = shop.url.base + "tracking/prudsysRecommitEvent";
            data = this._validateProductData(data), data && "" !== data && $.ajaxQueue({
                type: "POST",
                url: url,
                data: {
                    orderNumbers: data,
                    CSRFToken: shop.config.CSRFToken
                }
            })
        },
        count: function() {
            this.allCarouselLoaded || (this.currentCarouselsLoaded += 1, this.amountOfAllCarousels === this.currentCarouselsLoaded && (this.allCarouselLoaded = !0)), this.allCarouselLoaded, this.allCarouselLoaded && this.initalProducts && this.send(this.initalProducts)
        },
        add: function(productData) {
            productData && (this.initalProducts += productData)
        }
    }
}(),
function() {
    "use strict";
    $(function() {
        window.shop && (window.shop.encodeRfc3986 = function(string) {
            var encodeString = "",
                replaceSigns = ",";
            return string && (string = string.replace(replaceSigns, "_"), window.et_escape ? encodeString = et_escape(string) : window.escape ? encodeString = escape(string) : window.encodeURIComponent && (encodeString = encodeURIComponent(string))), encodeString
        })
    })
}();
var featuredimagezoomer = {
    loadinggif: "spinningred.gif",
    magnifycursor: "crosshair"
};
! function($) {
    $("head")
        .append('<style type="text/css">.featuredimagezoomerhidden {visibility: hidden!important;}</style>'), $.fn.multizoomhide = function() {
            return $('<style type="text/css">' + this.selector + " {visibility: hidden;}</style>")
                .appendTo("head")
        }, $.fn.addmultizoom = function(options) {
            function loadfunction() {
                var lnkd, lnkt, lnko, w, h, lnk = this,
                    styleobj1 = {},
                    styleobj2 = {};
                (lnkd = lnk.getAttribute("data-dims")) && (lnkd = lnkd.split(splitre), w = lnkd[0], h = lnkd[1]), $(new Image)
                    .error(function() {
                        lnk.tagName && !options.notmulti && (alert("Error: I couldn't find the image:\n\n" + lnk.href + ((lnkt = lnk.getAttribute("data-title")) ? '\n\n"' + lnkt + '"' : "")), (lnko = $imgObj.data("last-trigger")) && (first = !0, $(lnko)
                            .trigger("click")))
                    })
                    .load(function() {
                        var $parent, opacity = $imgObj.css("opacity"),
                            combinedoptions = {};
                        isNaN(opacity) && (opacity = 1), (options.notmulti || !indoptions.largeimage) && (w = options.width || $imgObj.width(), h = options.height || $imgObj.height()), $imgObj.attr("src", this.src)
                            .css({
                                width: w || options.width || this.width,
                                height: h = +(h || options.height || this.height)
                            }), $imgObj.data("added") && $imgObj.data("added")
                            .remove(), $imgObj.data("last-trigger", lnk), options.imagevertcenter && (styleobj1 = {
                                top: ($imgObj.parent()
                                    .innerHeight() - h) / 2
                            }), $imgObj.css(styleobj1)
                            .addimagezoom($.extend(combinedoptions, options, indoptions))
                            .data("added", $(".magnifyarea:last" + (combinedoptions.cursorshade ? ", .cursorshade:last" : "") + ", .zoomstatus:last, .zoomtracker:last")), options.magvertcenter && $(".magnifyarea:last")
                            .css({
                                marginTop: (h - $(".magnifyarea:last")
                                    .height()) / 2
                            }), options.descpos && ($parent = $imgObj.parent(), styleobj2 = {
                                left: $parent.offset()
                                    .left + ($parent.outerWidth() - $parent.width()) / 2,
                                top: h + $imgObj.offset()
                                    .top
                            }), options.notmulti ? $descArea.css(styleobj2) : $descArea.css(styleobj2)
                            .empty()
                            .append(lnk.getAttribute("data-title") || ""), 1 > +opacity && $imgObj.add($descArea)
                            .animate({
                                opacity: 1
                            }, options.speed)
                    })
                    .attr("src", $imgObj.data("src"))
            }
            var indoptions = {
                    largeimage: options.largeimage
                },
                $imgObj = $(options.imgObj + ':not(".thumbs")'),
                $descArea = $(options.descArea),
                first = !0,
                splitre = /, ?/;
            return options = $.extend({
                    speed: "slow",
                    initzoomablefade: !0,
                    zoomablefade: !0
                }, options), this.click(function(e) {
                    e.preventDefault();
                    var src = $imgObj.attr("src"),
                        ms, zr, cs, opacityObj = {
                            opacity: 0
                        };
                    (first || src !== this.href && src !== this.getAttribute("href")) && ((first && !options.initzoomablefade || !options.zoomablefade) && (opacityObj = {}), first = !1, indoptions.largeimage = this.getAttribute("data-large") || options.largeimage || "", "none" === indoptions.largeimage && (indoptions.largeimage = ""), (ms = this.getAttribute("data-magsize")) || options.magnifiersize ? indoptions.magnifiersize = (ms ? ms.split(splitre) : "") || options.magnifiersize : delete indoptions.magnifiersize, indoptions.zoomrange = ((zr = this.getAttribute("data-zoomrange")) ? zr = zr.split(splitre) : "") || options.zoomrange || "", zr && (zr[0] = +zr[0], zr[1] = +zr[1]), indoptions.cursorshade = ((cs = this.getAttribute("data-lens")) ? cs : "") || options.cursorshade || "", cs && (indoptions.cursorshade = eval(cs)), $imgObj.data("added") && $imgObj.stop(!0, !0)
                        .data("added")
                        .not(".zoomtracker")
                        .remove()
                        .end()
                        .css({
                            background: "url(" + featuredimagezoomer.loadinggif + ") center no-repeat"
                        }), $imgObj.css($.extend({
                            visibility: "visible"
                        }, $imgObj.data("added") && options.zoomablefade ? {
                            opacity: .25
                        } : opacityObj))
                        .data("src", this.href), $descArea.css($.extend({
                            visibility: "visible"
                        }, opacityObj)), loadfunction.call(this))
                })
                .eq(0)
                .trigger("click"), this
        }, $.extend(featuredimagezoomer, {
            dsetting: {
                magnifierpos: "right",
                magnifiersize: [200, 200],
                cursorshadecolor: "#fff",
                cursorshadeopacity: .3,
                cursorshadeborder: "1px solid black",
                cursorshade: !1,
                leftoffset: 15,
                rightoffset: 10
            },
            isie: function() {
                return !1
            }(),
            showimage: function($tracker, $mag, showstatus) {
                var specs = $tracker.data("specs"),
                    d = specs.magpos,
                    fiz = this,
                    coords = $tracker.data("specs")
                    .coords;
                specs.windimensions = {
                    w: $(window)
                        .width(),
                    h: $(window)
                        .height()
                };
                var magcoords = {};
                magcoords.left = coords.left + ("left" === d ? -specs.magsize.w - specs.lo : $tracker.width() + specs.ro), "left" !== d && magcoords.left + specs.magsize.w + specs.lo >= specs.windimensions.w && coords.left - specs.magsize.w >= specs.lo ? magcoords.left = coords.left - specs.magsize.w - specs.lo : "left" === d && magcoords.left < specs.ro && (magcoords.left = coords.left + $tracker.width() + specs.ro), $mag.css({
                        left: magcoords.left,
                        top: coords.top
                    })
                    .show(), specs.$statusdiv.html("Current Zoom: " + specs.curpower + '<div style="font-size:80%">Use Mouse Wheel to Zoom In/Out</div>'), showstatus && fiz.showstatusdiv(specs, 400, 2e3)
            },
            hideimage: function($tracker, $mag, showstatus) {
                var specs = $tracker.data("specs");
                $mag.hide(), showstatus && this.hidestatusdiv(specs)
            },
            showstatusdiv: function(specs, fadedur, showdur) {
                clearTimeout(specs.statustimer), specs.$statusdiv.css({
                        visibility: "visible"
                    })
                    .fadeIn(fadedur), specs.statustimer = setTimeout(function() {
                        featuredimagezoomer.hidestatusdiv(specs)
                    }, showdur)
            },
            hidestatusdiv: function(specs) {
                specs.$statusdiv.stop(!0, !0)
                    .hide()
            },
            getboundary: function(b, val, specs) {
                if ("left" == b) {
                    var rb = -specs.imagesize.w * specs.curpower + specs.magsize.w;
                    return val > 0 ? 0 : rb > val ? rb : val
                }
                var tb = -specs.imagesize.h * specs.curpower + specs.magsize.h;
                return val > 0 ? 0 : tb > val ? tb : val
            },
            moveimage: function($tracker, $maginner, $cursorshade, e) {
                var specs = $tracker.data("specs"),
                    csw = Math.round(specs.magsize.w / specs.curpower),
                    csh = Math.round(specs.magsize.h / specs.curpower),
                    csb = specs.csborder,
                    fiz = this,
                    imgcoords = specs.coords,
                    pagex = e.pageX || specs.lastpagex,
                    pagey = e.pageY || specs.lastpagey,
                    x = pagex - imgcoords.left,
                    y = pagey - imgcoords.top;
                $cursorshade.css({
                    visibility: "",
                    width: csw,
                    height: csh,
                    top: Math.min(specs.imagesize.h - csh - csb, Math.max(0, y - (csb + csh) / 2)) + imgcoords.top,
                    left: Math.min(specs.imagesize.w - csw - csb, Math.max(0, x - (csb + csw) / 2)) + imgcoords.left
                });
                var newx = -x * specs.curpower + specs.magsize.w / 2,
                    newy = -y * specs.curpower + specs.magsize.h / 2;
                $maginner.css({
                    left: fiz.getboundary("left", newx, specs),
                    top: fiz.getboundary("top", newy, specs)
                }), specs.$statusdiv.css({
                    left: pagex - 10,
                    top: pagey + 20
                }), specs.lastpagex = pagex, specs.lastpagey = pagey
            },
            magnifyimage: function($tracker, e, zoomrange) {
                e.detail || e.wheelDelta || (e = e.originalEvent);
                var delta = e.detail ? -120 * e.detail : e.wheelDelta,
                    zoomdir = -120 >= delta ? "out" : "in",
                    specs = $tracker.data("specs"),
                    magnifier = specs.magnifier,
                    od = specs.imagesize,
                    power = specs.curpower,
                    newpower = "in" == zoomdir ? Math.min(power + 1, zoomrange[1]) : Math.max(power - 1, zoomrange[0]),
                    nd = [od.w * newpower, od.h * newpower];
                magnifier.$image.css({
                    width: nd[0],
                    height: nd[1]
                }), specs.curpower = newpower, specs.$statusdiv.html("Current Zoom: " + specs.curpower), this.showstatusdiv(specs, 0, 500), $tracker.trigger("mousemove")
            },
            highestzindex: function($img) {
                var elz, z = 0,
                    $els = $img.parents()
                    .add($img);
                return $els.each(function() {
                    elz = $(this)
                        .css("zIndex"), elz = isNaN(elz) ? 0 : +elz, z = Math.max(z, elz)
                }), z
            },
            init: function($img, options) {
                function getspecs($maginner, $bigimage) {
                    var magsize = {
                            w: $magnifier.width(),
                            h: $magnifier.height()
                        },
                        imagesize = {
                            w: w,
                            h: h
                        },
                        power = setting.zoomrange ? setting.zoomrange[0] : ($bigimage.width() / w)
                        .toFixed(5);
                    $tracker.data("specs", {
                        $statusdiv: $statusdiv,
                        statustimer: null,
                        magnifier: {
                            $outer: $magnifier,
                            $inner: $maginner,
                            $image: $bigimage
                        },
                        magsize: magsize,
                        magpos: setting.magnifierpos,
                        imagesize: imagesize,
                        curpower: power,
                        coords: getcoords(),
                        csborder: $cursorshade.outerWidth(),
                        lo: setting.leftoffset,
                        ro: setting.rightoffset
                    })
                }

                function getcoords() {
                    var offset = $tracker.offset();
                    return {
                        left: offset.left,
                        top: offset.top
                    }
                }
                var $tracker, $cursorshade, $statusdiv, $magnifier, setting = $.extend({}, this.dsetting, options),
                    w = $img.width(),
                    h = $img.height(),
                    o = $img.offset(),
                    fiz = this,
                    lastpage = {
                        pageX: 0,
                        pageY: 0
                    },
                    basezindex = setting.zIndex || this.highestzindex($img);
                return 0 === h || 0 === w ? void $(new Image)
                    .load(function() {
                        featuredimagezoomer.init($img, options)
                    })
                    .attr("src", $img.attr("src")) : ($img.css({
                            visibility: "visible"
                        }), setting.largeimage = setting.largeimage || $img.get(0)
                        .src, $magnifier = $('<div class="magnifyarea" style="position:absolute;z-index:' + basezindex + ";width:" + setting.magnifiersize[0] + "px;height:" + setting.magnifiersize[1] + 'px;left:-10000px;top:-10000px;visibility:hidden;overflow:hidden;border:1px solid black;" />')
                        .append('<div style="position:relative;left:0;top:0;z-index:' + basezindex + ';" />')
                        .appendTo(document.body), $cursorshade = setting.cursorshade ? $('<div class="cursorshade" style="visibility:hidden;position:absolute;left:0;top:0;z-index:' + basezindex + ';" />')
                        .css({
                            border: setting.cursorshadeborder,
                            opacity: setting.cursorshadeopacity,
                            backgroundColor: setting.cursorshadecolor
                        })
                        .appendTo(document.body) : $("<div />"), $statusdiv = $('<div class="zoomstatus preloadevt" style="position:absolute;visibility:hidden;left:0;top:0;z-index:' + basezindex + ';" />')
                        .html('<img src="' + this.loadinggif + '" />')
                        .appendTo(document.body), $tracker = $('<div class="zoomtracker" style="cursor:progress;position:absolute;z-index:' + basezindex + ";left:" + o.left + "px;top:" + o.top + "px;height:" + h + "px;width:" + w + 'px;" />')
                        .css({
                            backgroundImage: this.isie ? "url(cannotbe)" : "none"
                        })
                        .appendTo(document.body), $(window)
                        .bind("load resize", function() {
                            var $parent, o = $img.offset();
                            $tracker.css({
                                left: o.left,
                                top: o.top
                            }), options.descpos && options.descArea && ($parent = $img.parent(), $(options.descArea)
                                .css({
                                    left: $parent.offset()
                                        .left + ($parent.outerWidth() - $parent.width()) / 2,
                                    top: $img.height() + o.top
                                }))
                        }), $tracker.mouseover(function() {
                            $cursorshade.add($magnifier)
                                .add($statusdiv)
                                .removeClass("featuredimagezoomerhidden"), $tracker.data("premouseout", !1)
                        })
                        .mouseout(function() {
                            $cursorshade.add($magnifier)
                                .add($statusdiv.not(".preloadevt"))
                                .addClass("featuredimagezoomerhidden"), $tracker.data("premouseout", !0)
                        })
                        .mousemove(function(e) {
                            lastpage.pageX = e.pageX, lastpage.pageY = e.pageY
                        }), void $tracker.one("mouseover", function() {
                            var $maginner = $magnifier.find("div:eq(0)"),
                                $bigimage = $('<img src="' + setting.largeimage + '"/>')
                                .appendTo($maginner),
                                largeloaded = featuredimagezoomer.loaded[$('<a href="' + setting.largeimage + '"></a>')
                                    .get(0)
                                    .href],
                                showstatus = setting.zoomrange && setting.zoomrange[1] > setting.zoomrange[0],
                                imgcoords = getcoords();
                            largeloaded || ($img.stop(!0, !0)
                                    .css({
                                        opacity: .1
                                    }), $statusdiv.css({
                                        left: imgcoords.left + w / 2 - $statusdiv.width() / 2,
                                        top: imgcoords.top + h / 2 - $statusdiv.height() / 2,
                                        visibility: "visible"
                                    })), $bigimage.bind("loadevt", function(event, e) {
                                    if ("error" === e.type) {
                                        $img.css({
                                                opacity: 1
                                            })
                                            .data("added")
                                            .remove();
                                        var src = $('<a href="' + $bigimage.attr("src") + '"></a>')
                                            .get(0)
                                            .href;
                                        return void(window.console && console.error ? console.error("Cannot find Featured Image Zoomer larger image: " + src) : alert("Cannot find Featured Image Zoomer larger image:\n\n" + src))
                                    }
                                    if (featuredimagezoomer.loaded[this.src] = !0, $img.css({
                                            opacity: 1
                                        }), $statusdiv.empty()
                                        .css({
                                            border: "1px solid black",
                                            background: "#C0C0C0",
                                            padding: "4px",
                                            font: "bold 13px Arial",
                                            opacity: .8
                                        })
                                        .hide()
                                        .removeClass("preloadevt"), $tracker.data("premouseout") && $statusdiv.addClass("featuredimagezoomerhidden"), setting.zoomrange) {
                                        var nd = [w * setting.zoomrange[0], h * setting.zoomrange[0]];
                                        $bigimage.css({
                                            width: nd[0],
                                            height: nd[1]
                                        })
                                    }
                                    getspecs($maginner, $bigimage), $magnifier.css({
                                            display: "none",
                                            visibility: "visible"
                                        }), $tracker.mouseover(function() {
                                            $tracker.data("specs")
                                                .coords = getcoords(), fiz.showimage($tracker, $magnifier, showstatus)
                                        }), $tracker.mousemove(function(e) {
                                            fiz.moveimage($tracker, $maginner, $cursorshade, e)
                                        }), $tracker.data("premouseout") || (fiz.showimage($tracker, $magnifier, showstatus), fiz.moveimage($tracker, $maginner, $cursorshade, lastpage)), $tracker.mouseout(function() {
                                            fiz.hideimage($tracker, $magnifier, showstatus)
                                        })
                                        .css({
                                            cursor: fiz.magnifycursor
                                        }), setting.zoomrange && setting.zoomrange[1] > setting.zoomrange[0] ? $tracker.bind("DOMMouseScroll mousewheel", function(e) {
                                            fiz.magnifyimage($tracker, e, setting.zoomrange), e.preventDefault()
                                        }) : setting.disablewheel && $tracker.bind("DOMMouseScroll mousewheel", function(e) {
                                            e.preventDefault()
                                        })
                                }), $bigimage.get(0)
                                .complete ? $bigimage.trigger("loadevt", {
                                    type: "load"
                                }) : $bigimage.bind("load error", function(e) {
                                    $bigimage.trigger("loadevt", e)
                                })
                        }))
            },
            iname: function() {
                var itag = $("<img />"),
                    iname = itag.get(0)
                    .tagName;
                return itag.remove(), iname
            }(),
            loaded: {},
            hashre: /^#/
        }), $.fn.addimagezoom = function(options) {
            var sel = this.selector,
                $thumbs = $(sel.replace(featuredimagezoomer.hashre, ".") + ".thumbs a");
            return options = options || {}, null !== options.multizoom && $thumbs.size() ? ($thumbs.addmultizoom($.extend(options, {
                imgObj: sel,
                multizoom: null
            })), this) : options.multizoom ? ($(options.multizoom)
                .addmultizoom($.extend(options, {
                    imgObj: sel,
                    multizoom: null
                })), this) : this.each(null !== options.multizoom ? function() {
                return this.tagName !== featuredimagezoomer.iname ? !0 : void $('<a href="' + this.src + '"></a>')
                    .addmultizoom($.extend(options, {
                        imgObj: sel,
                        multizoom: null,
                        notmulti: !0
                    }))
            } : function() {
                return this.tagName !== featuredimagezoomer.iname ? !0 : void featuredimagezoomer.init($(this), options)
            })
        }
}(jQuery),
function(a) {
    a.fn.etalage = function(b) {
        var c = a.extend({
            align: "left",
            thumb_image_width: 300,
            thumb_image_height: 400,
            source_image_width: 900,
            source_image_height: 1200,
            zoom_area_width: 600,
            zoom_area_height: "justify",
            zoom_area_distance: 10,
            zoom_easing: !0,
            click_to_zoom: !1,
            zoom_element: "auto",
            show_descriptions: !0,
            description_location: "bottom",
            description_opacity: .7,
            small_thumbs: 3,
            smallthumb_inactive_opacity: .4,
            smallthumb_hide_single: !0,
            smallthumb_select_on_hover: !1,
            smallthumbs_position: "bottom",
            show_begin_end_smallthumb: !0,
            magnifier_opacity: .5,
            magnifier_invert: !0,
            show_icon: !0,
            icon_offset: 20,
            hide_cursor: !1,
            show_hint: !1,
            hint_offset: 15,
            speed: 600,
            autoplay: !0,
            autoplay_interval: 6e3,
            keyboard: !0,
            right_to_left: !1,
            click_callback: function() {
                return !0
            },
            change_callback: function() {
                return !0
            }
        }, b);
        return a.each(this, function() {
            function aP(a2) {
                z = z ? z - 1 : 0, ai = !0;
                var a3, j, a5, a4, a1 = aG.find(".etalage_smallthumb_first")
                    .removeClass("etalage_smallthumb_first"),
                    i = aG.find(".etalage_smallthumb_last")
                    .removeClass("etalage_smallthumb_last");
                "left" === a2 ? (a3 = a1.prev()
                    .addClass("etalage_smallthumb_first"), j = i.prev()
                    .addClass("etalage_smallthumb_last"), a5 = a1) : (a3 = a1.next()
                    .addClass("etalage_smallthumb_first"), j = i.next()
                    .addClass("etalage_smallthumb_last"), a5 = i), z ? "left" === a2 ? a3.trigger("click") : j.trigger("click") : (a4 = "vert" === aF ? a3.position()
                    .top : a3.position()
                    .left, G(a4, a3, j, a5))
            }

            function m(a5) {
                ai = !0; {
                    var a2, j, a4;
                    aG.find(".etalage_smallthumb_first")
                        .removeClass("etalage_smallthumb_first"), aG.find(".etalage_smallthumb_last")
                        .removeClass("etalage_smallthumb_last")
                }
                "end" === a5 ? (a2 = aV.eq(y - aj)
                    .addClass("etalage_smallthumb_first"), j = aV.eq(y - 1)
                    .addClass("etalage_smallthumb_last"), a4 = j, j.hasClass("etalage_smallthumb_navtostart") && (a4 = j.prev())) : (a2 = aV.eq(0)
                    .addClass("etalage_smallthumb_first"), j = aV.eq(aj - 1)
                    .addClass("etalage_smallthumb_last"), a4 = a2, a2.hasClass("etalage_smallthumb_navtoend") && (a4 = a2.next()));
                var a3 = "vert" === aF ? a2.position()
                    .top : a2.position()
                    .left;
                G(a3, a2, j, a4)
            }

            function ac() {
                m("start")
            }

            function F() {
                m("end")
            }
            var aG = a(this);
            if (aG.is("ul") && aG.children("li")
                .length && aG.find("img.etalage_source_image")
                .length) {
                var ad, ab, Q, I, aq, t, f, aS, aL, aw, aR = aG.attr("id"),
                    aZ = Math.floor(.7 * c.speed),
                    aC = Math.round(c.speed / 100),
                    ai = !1,
                    z = 0,
                    e = !1,
                    ao = !0,
                    A = !1,
                    x = 0,
                    al = 0,
                    ak = 0,
                    Y = 0,
                    X = 0,
                    aF = "hori";
                "undefined" != typeof aR && aR || (aR = "[no id]"), ("left" === c.smallthumbs_position || "right" === c.smallthumbs_position) && (aF = "vert"), "object" == typeof a.browser && a.browser.msie && a.browser.version < 9 && (ao = !1, a.browser.version < 7 && (e = !0)), aG.addClass("etalage")
                    .show();
                var w = aG.children("li")
                    .addClass("etalage_thumb");
                w.first()
                    .show()
                    .addClass("etalage_thumb_active");
                var q = w.length,
                    aJ = c.autoplay;
                2 > q && (aJ = !1), "right" === c.align && aG.addClass("etalage_right"), a.each(w, function(a1) {
                    a1 += 1;
                    var a4 = a(this),
                        j = a4.find(".etalage_thumb_image")
                        .removeAttr("alt")
                        .show(),
                        a3 = a4.find(".etalage_source_image"),
                        a2 = a4.find("a");
                    a4.data("id", a1)
                        .addClass("thumb_" + a1), !j.length && a3.length ? a4.prepend('<img class="etalage_thumb_image" src="' + a3.attr("src") + '" />') : j.length || a3.length || a4.remove(), a2.length && a4.find(".etalage_thumb_image")
                        .data("anchor", a2.attr("href"))
                });
                var av = w.find(".etalage_thumb_image")
                    .css({
                        width: c.thumb_image_width,
                        height: c.thumb_image_height
                    })
                    .show();
                a.each(av, function() {
                    a(this)
                        .data("src", this.src)
                });
                var aO = a('<li class="etalage_magnifier"><div><img /></div></li>')
                    .appendTo(aG),
                    aa = aO.children("div"),
                    h = aa.children("img"),
                    E = a('<li class="etalage_icon">&nbsp;</li>')
                    .appendTo(aG);
                c.show_icon && E.show();
                var r;
                c.show_hint && (r = a('<li class="etalage_hint">&nbsp;</li>')
                    .appendTo(aG)
                    .show());
                var K, s = c.zoom_element;
                "auto" !== s && s && a(s)
                    .length ? K = a(s)
                    .addClass("etalage_zoom_area")
                    .html('<div><img class="etalage_zoom_img" /></div>') : (s = "auto", K = a('<li class="etalage_zoom_area"><div><img class="etalage_zoom_img" /></div></li>')
                        .appendTo(aG));
                var an, W = K.children("div");
                ao && (an = a('<img class="etalage_zoom_preview" />')
                    .css({
                        width: c.source_image_width,
                        height: c.source_image_height,
                        opacity: .3
                    })
                    .prependTo(W)
                    .show());
                var az, aB = W.children(".etalage_zoom_img")
                    .css({
                        width: c.source_image_width,
                        height: c.source_image_height
                    });
                c.show_descriptions && (az = a('<div class="etalage_description' + (c.right_to_left ? " rtl" : "") + '"></div>')
                    .prependTo(K));
                var aQ, l, aV, u, y, aj = c.small_thumbs;
                (q > 1 || !c.smallthumb_hide_single) && (aQ = a('<li class="etalage_small_thumbs"><ul></ul></li>')
                    .appendTo(aG), l = aQ.children("ul"), a.each(av, function() {
                        var i = a(this);
                        Q = i.data("src"), I = i.parents(".etalage_thumb")
                            .data("id"), a('<li><img class="etalage_small_thumb" src="' + Q + '" /></li>')
                            .data("thumb_id", I)
                            .appendTo(l)
                    }), aV = l.children("li")
                    .css({
                        opacity: c.smallthumb_inactive_opacity
                    }), 3 > aj && (aj = 3), q > aj ? (c.show_begin_end_smallthumb ? (Q = av.eq(q - 1)
                            .data("src"), I = w.eq(q - 1)
                            .data("id"), a('<li class="etalage_smallthumb_first etalage_smallthumb_navtoend"><img class="etalage_small_thumb" src="' + Q + '" /></li>')
                            .data("src", Q)
                            .data("thumb_id", I)
                            .css({
                                opacity: c.smallthumb_inactive_opacity
                            })
                            .prependTo(l), Q = av.eq(0)
                            .data("src"), I = w.eq(0)
                            .data("id"), a('<li class="etalage_smallthumb_navtostart"><img class="etalage_small_thumb" src="' + Q + '" /></li>')
                            .data("src", Q)
                            .data("thumb_id", I)
                            .css({
                                opacity: c.smallthumb_inactive_opacity
                            })
                            .appendTo(l), aV = l.children("li"), aV.eq(1)
                            .addClass("etalage_smallthumb_active")
                            .css({
                                opacity: 1
                            })) : aV.eq(0)
                        .addClass("etalage_smallthumb_first etalage_smallthumb_active")
                        .css({
                            opacity: 1
                        }), aV.eq(aj - 1)
                        .addClass("etalage_smallthumb_last")) : aV.eq(0)
                    .addClass("etalage_smallthumb_active")
                    .css({
                        opacity: 1
                    }), a.each(aV, function(j) {
                        a(this)
                            .data("id", j + 1)
                    }), u = aV.children("img"), y = aV.length, "vert" === aF && aV.addClass("vertical")), aq = c.magnifier_invert ? 1 : c.magnifier_opacity;
                var aN = parseInt(w.css("borderLeftWidth"), 10) + parseInt(w.css("borderRightWidth"), 10) + parseInt(av.css("borderLeftWidth"), 10) + parseInt(av.css("borderRightWidth"), 10),
                    Z = parseInt(w.css("marginLeft"), 10) + parseInt(w.css("marginRight"), 10),
                    B = parseInt(w.css("paddingLeft"), 10) + parseInt(w.css("paddingRight"), 10) + parseInt(av.css("marginLeft"), 10) + parseInt(av.css("marginRight"), 10) + parseInt(av.css("paddingLeft"), 10) + parseInt(av.css("paddingRight"), 10),
                    N = c.thumb_image_width + aN + Z + B,
                    O = c.thumb_image_height + aN + Z + B,
                    aE = 0,
                    P = 0,
                    ax = 0,
                    ag = 0,
                    aD = 0,
                    o = 0,
                    aH = 0;
                (q > 1 || !c.smallthumb_hide_single) && (aE = parseInt(aV.css("borderLeftWidth"), 10) + parseInt(aV.css("borderRightWidth"), 10) + parseInt(u.css("borderLeftWidth"), 10) + parseInt(u.css("borderRightWidth"), 10), P = parseInt(aV.css("marginTop"), 10), ax = parseInt(aV.css("paddingLeft"), 10) + parseInt(aV.css("paddingRight"), 10) + parseInt(u.css("marginLeft"), 10) + parseInt(u.css("marginRight"), 10) + parseInt(u.css("paddingLeft"), 10) + parseInt(u.css("paddingRight"), 10), "vert" === aF ? (aD = Math.round((O - (aj - 1) * P) / aj) - (aE + ax), ag = Math.round(c.thumb_image_width * aD / c.thumb_image_height), o = ag + aE + ax, aH = aD + aE + ax) : (ag = Math.round((N - (aj - 1) * P) / aj) - (aE + ax), aD = Math.round(c.thumb_image_height * ag / c.thumb_image_width), o = ag + aE + ax, aH = aD + aE + ax));
                var T, a0, d = parseInt(K.css("borderTopWidth"), 10),
                    aA = parseInt(c.zoom_area_distance, 10),
                    J = parseInt(K.css("paddingTop"), 10);
                T = c.zoom_area_width - 2 * d - 2 * J > c.source_image_width ? c.source_image_width : c.zoom_area_width - 2 * d - 2 * J, a0 = "justify" === c.zoom_area_height ? O + P + aH - 2 * d - 2 * J : c.zoom_area_height - 2 * d - 2 * J, a0 > c.source_image_height && (a0 = c.source_image_height);
                var aX, at, v, ar;
                c.show_descriptions && (aX = parseInt(az.css("borderLeftWidth"), 10) + parseInt(az.css("borderRightWidth"), 10), at = parseInt(az.css("marginLeft"), 10) + parseInt(az.css("marginRight"), 10), v = parseInt(az.css("paddingLeft"), 10) + parseInt(az.css("paddingRight"), 10), ar = T - aX - at - v);
                var aM;
                e && (aM = a('<iframe marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="javascript:\'<html></html>\'"></iframe>')
                    .css({
                        position: "absolute",
                        zIndex: 1
                    })
                    .prependTo(K));
                var S = parseInt(aO.css("borderTopWidth"), 10),
                    aK = parseInt(w.css("borderTopWidth"), 10) + parseInt(w.css("marginTop"), 10) + parseInt(w.css("paddingTop"), 10) + parseInt(av.css("borderTopWidth"), 10) + parseInt(av.css("marginTop"), 10) - S,
                    am = av.offset()
                    .left - aG.offset()
                    .left - S;
                "left" === c.smallthumbs_position ? am = am + o + P : "top" === c.smallthumbs_position && (aK = aK + aH + P);
                var H, C, V = Math.round(T * (c.thumb_image_width / c.source_image_width)),
                    R = Math.round(a0 * (c.thumb_image_height / c.source_image_height)),
                    M = aK + c.thumb_image_height - R,
                    p = am + c.thumb_image_width - V,
                    af = Math.round(V / 2),
                    ae = Math.round(R / 2);
                if (c.show_hint && (H = parseInt(c.hint_offset, 10) + parseInt(r.css("marginTop"), 10), C = parseInt(c.hint_offset, 10) + parseInt(r.css("marginRight"), 10), "right" === c.smallthumbs_position && (C = C - o - P)), "vert" === aF ? (aS = N + P + o, aG.css({
                        width: aS,
                        height: O
                    })) : (aS = N, aG.css({
                        width: aS,
                        height: O + P + aH
                    })), c.show_icon && (aw = {
                        top: O - E.outerHeight(!0) - parseInt(c.icon_offset, 10),
                        left: parseInt(c.icon_offset, 10)
                    }, "left" === c.smallthumbs_position ? aw.left = o + P + parseInt(c.icon_offset, 10) : "top" === c.smallthumbs_position && (aw.top += aH + P), E.css(aw)), c.show_hint && r.css({
                        margin: 0,
                        top: -H,
                        right: -C
                    }), h.css({
                        margin: 0,
                        padding: 0,
                        width: c.thumb_image_width,
                        height: c.thumb_image_height
                    }), aa.css({
                        margin: 0,
                        padding: 0,
                        width: V,
                        height: R
                    }), aw = {
                        margin: 0,
                        padding: 0,
                        left: (p - am) / 2,
                        top: (M - aK) / 2
                    }, "left" === c.smallthumbs_position ? aw.left = "+=" + o + P : "top" === c.smallthumbs_position && (aw.top = "+=" + aH + P), aO.css(aw)
                    .hide(), W.css({
                        width: T,
                        height: a0
                    }), aw = {
                        margin: 0,
                        opacity: 0
                    }, "right" === c.align && "auto" === s ? aw.left = -(T + 2 * d + 2 * J + aA) : "auto" === s && (aw.left = aS + aA), K.css(aw)
                    .hide(), c.show_descriptions && (aw = {
                            width: ar,
                            bottom: J,
                            left: J,
                            opacity: c.description_opacity
                        }, "top" === c.description_location && (aw.top = J, aw.bottom = "auto"), az.css(aw)
                        .hide()), q > 1 || !c.smallthumb_hide_single)
                    if ("vert" === aF ? (aw = {
                                top: 0,
                                height: O
                            }, "left" === c.smallthumbs_position ? w.css({
                                left: o + P
                            }) : aw.marginLeft = N + P, aQ.css(aw), l.css({
                                height: aH * y + y * P + 100
                            }), u.css({
                                width: ag,
                                height: aD
                            })
                            .attr("height", aD), aV.css({
                                margin: 0,
                                marginBottom: P
                            })) : (aw = {
                                width: N
                            }, "top" === c.smallthumbs_position ? w.css({
                                top: aH + P
                            }) : aw.top = O + P, aQ.css(aw), l.css({
                                width: o * y + y * P + 100
                            }), u.css({
                                width: ag,
                                height: aD
                            })
                            .attr("width", ag), aV.css({
                                margin: 0,
                                marginRight: P
                            })), aL = "vert" === aF ? aH * aj + (aj - 1) * P - O : o * aj + (aj - 1) * P - N, aL > 0)
                        for (ad = 1; y - 1 >= ad; ad += aj - 1)
                            for (ab = 1; aL >= ab; ab += 1) aV.eq(ad + ab - 1)
                                .css("vert" === aF ? {
                                    marginBottom: P - 1
                                } : {
                                    marginRight: P - 1
                                });
                    else if (0 > aL)
                    for (ad = 1; y - 1 >= ad; ad += aj - 1)
                        for (ab = 1; - aL >= ab; ab += 1) "vert" === aF ? (aV.eq(ad + ab - 1)
                            .css({
                                marginBottom: P + 1
                            }), l.css({
                                height: parseInt(l.css("height"), 10) + 1
                            })) : (aV.eq(ad + ab - 1)
                            .css({
                                marginRight: P + 1
                            }), l.css({
                                width: parseInt(l.css("width"), 10) + 1
                            }));
                c.show_icon && !c.magnifier_invert && aO.css({
                        background: aO.css("background-color") + " " + E.css("background-image") + " center no-repeat"
                    }), c.hide_cursor && aO.add(E)
                    .css({
                        cursor: "none"
                    }), e && aM.css({
                        width: W.css("width"),
                        height: W.css("height")
                    });
                var ay = w.first()
                    .find(".etalage_thumb_image"),
                    ap = w.first()
                    .find(".etalage_source_image");
                c.magnifier_invert && h.attr("src", ay.data("src"))
                    .show(), ao && an.attr("src", ay.data("src")), aB.attr("src", ap.attr("src")), c.show_descriptions && (f = ap.attr("title"), f && az.html(f)
                        .show());
                var D = function() {
                        t && (clearInterval(t), t = !1)
                    },
                    k = function() {
                        t && D(), t = setInterval(function() {
                            au()
                        }, c.autoplay_interval)
                    },
                    U = function() {
                        aO.stop()
                            .fadeTo(aZ, aq), E.stop()
                            .animate({
                                opacity: 0
                            }, aZ), K.stop()
                            .show()
                            .animate({
                                opacity: 1
                            }, aZ), c.magnifier_invert && ay.stop()
                            .animate({
                                opacity: c.magnifier_opacity
                            }, aZ), aJ && D()
                    },
                    aW = function() {
                        aO.stop()
                            .fadeOut(c.speed), E.stop()
                            .animate({
                                opacity: 1
                            }, c.speed), K.stop()
                            .animate({
                                opacity: 0
                            }, c.speed, function() {
                                a(this)
                                    .hide()
                            }), c.magnifier_invert && ay.stop()
                            .animate({
                                opacity: 1
                            }, c.speed, function() {
                                c.click_to_zoom && (A = !1)
                            }), clearTimeout(x), aJ && k()
                    },
                    g = function(a3, a1) {
                        var j, a2, i = aG.find(".etalage_smallthumb_active")
                            .removeClass("etalage_smallthumb_active");
                        a3.addClass("etalage_smallthumb_active"), aO.stop()
                            .hide(), K.stop()
                            .hide(), a1 || (ai = !0, i.stop(!0, !0)
                                .animate({
                                    opacity: c.smallthumb_inactive_opacity
                                }, aZ), a3.stop(!0, !0)
                                .animate({
                                    opacity: 1
                                }, aZ, function() {
                                    ai = !1
                                })), aG.find(".etalage_thumb_active")
                            .removeClass("etalage_thumb_active")
                            .stop()
                            .animate({
                                opacity: 0
                            }, c.speed, function() {
                                a(this)
                                    .hide()
                            }), j = w.filter(".thumb_" + a3.data("thumb_id"))
                            .addClass("etalage_thumb_active")
                            .show()
                            .stop()
                            .css({
                                opacity: 0
                            })
                            .animate({
                                opacity: 1
                            }, c.speed), ay = j.find(".etalage_thumb_image"), ap = j.find(".etalage_source_image"), c.magnifier_invert && h.attr("src", ay.data("src")), ao && an.attr("src", ay.data("src")), aB.attr("src", ap.attr("src")), c.show_descriptions && (f = ap.attr("title"), f ? az.html(f)
                                .show() : az.hide()), aJ && (D(), k()), a2 = a3.data("id"), q >= aj && a2--, ah(a2)
                    },
                    G = function(a2, j, i, a1) {
                        a.each(aV, function() {
                            var a4 = a(this),
                                a3 = {
                                    opacity: c.smallthumb_inactive_opacity
                                };
                            a4.data("id") === a1.data("id") && (a3.opacity = 1), "vert" === aF ? a3.top = "-=" + a2 : a3.left = "-=" + a2, a4.animate(a3, aZ, "swing", function() {
                                ai && (a1.addClass("etalage_smallthumb_active"), ai = !1)
                            })
                        }), g(a1, !0)
                    },
                    aY = function() {
                        var a2 = Y - al,
                            a1 = X - ak,
                            j = -a2 / aC,
                            i = -a1 / aC;
                        al -= j, ak -= i, 1 > a2 && a2 > -1 && (al = Y), 1 > a1 && a1 > -1 && (ak = X), aB.css({
                            left: al,
                            top: ak
                        }), ao && an.css({
                            left: al,
                            top: ak
                        }), (a2 > 1 || a1 > 1 || 1 > a2 || 1 > a1) && (x = setTimeout(function() {
                            aY()
                        }, 25))
                    },
                    L = function() {
                        var i;
                        if (c.magnifier_invert && aG.find(".etalage_thumb_active")
                            .mouseleave(), c.right_to_left) {
                            if (i = aG.find(".etalage_smallthumb_active")
                                .next(), !i.length) return q > aj ? ac() : aV.first()
                                .trigger("click"), !0
                        } else if (i = aG.find(".etalage_smallthumb_active")
                            .prev(), !i.length) return q > aj ? F() : aV.last()
                            .trigger("click"), !0;
                        i.trigger("click")
                    },
                    au = function() {
                        var i;
                        if (c.magnifier_invert && aG.find(".etalage_thumb_active")
                            .mouseleave(), c.right_to_left) {
                            if (i = aG.find(".etalage_smallthumb_active")
                                .prev(), !i.length) return q > aj ? F() : aV.last()
                                .trigger("click"), !0
                        } else if (i = aG.find(".etalage_smallthumb_active")
                            .next(), !i.length) return q > aj ? ac() : aV.first()
                            .trigger("click"), !0;
                        i.trigger("click")
                    },
                    n = function(a2) {
                        (aj >= q || !c.show_begin_end_smallthumb) && (a2 -= 1);
                        var a6 = aV.eq(a2);
                        if (a6.length && !ai) {
                            var j, a5 = aG.find(".etalage_smallthumb_active"),
                                a1 = a5.data("id") - 1;
                            if (a1 > a2) {
                                z = a1 - a2;
                                var a3 = aG.find(".etalage_smallthumb_first"),
                                    a7 = a3.data("id");
                                a7 > a2 ? (j = a1 - a7, z -= j, a3.trigger("click")) : g(a6, !1)
                            } else if (a2 > a1) {
                                z = a2 - a1;
                                var a4 = aG.find(".etalage_smallthumb_last"),
                                    i = a4.data("id") - 1;
                                a2 >= i ? (j = i - a1 - 1, z -= j, a4.trigger("click")) : g(a6, !1)
                            }
                        }
                    };
                window[aR + "_previous"] = function() {
                    L()
                }, window[aR + "_next"] = function() {
                    au()
                }, window[aR + "_show"] = function(i) {
                    n(i)
                };
                var aI = function(i) {
                        return c.click_callback(i, aR) ? "function" == typeof etalage_click_callback ? (etalage_click_callback(i, aR), !1) : !0 : !1
                    },
                    ah = function(i) {
                        c.change_callback(i, aR) && "function" == typeof etalage_change_callback && etalage_change_callback(i, aR)
                    };
                w.add(aO)
                    .add(E)
                    .mouseenter(function() {
                        c.show_hint && r.hide(), (!c.click_to_zoom || A) && U()
                    })
                    .mouseleave(function() {
                        aW()
                    });
                var aU = -(c.source_image_width - T),
                    aT = -(c.source_image_height - a0);
                w.add(aO)
                    .add(E)
                    .mousemove(function(a5) {
                        var j = Math.round(a5.pageX - ay.offset()
                                .left + am),
                            i = Math.round(a5.pageY - ay.offset()
                                .top + aK),
                            a4 = j - af,
                            a3 = i - ae;
                        if (am > a4 && (a4 = am), a4 > p && (a4 = p), aK > a3 && (a3 = aK), a3 > M && (a3 = M), aO.css({
                                left: a4,
                                top: a3
                            }), c.magnifier_invert) {
                            var a2 = a4 - am,
                                a1 = a3 - aK;
                            h.css({
                                left: -a2,
                                top: -a1
                            })
                        }
                        Y = -((a4 - am) * (1 / (c.thumb_image_width / c.source_image_width))), X = -((a3 - aK) * (1 / (c.thumb_image_height / c.source_image_height))), aU > Y && (Y = aU), aT > X && (X = aT), c.zoom_easing ? (clearTimeout(x), aY()) : (ao && an.css({
                            left: Y,
                            top: X
                        }), aB.css({
                            left: Y,
                            top: X
                        }))
                    }), (q > 1 || !c.smallthumb_hide_single) && (aV.click(function() {
                        var a7 = a(this);
                        if (!a7.hasClass("etalage_smallthumb_active") && (!ai || z))
                            if (a7.hasClass("etalage_smallthumb_first") && a7.prev()
                                .length) aP("left");
                            else if (a7.hasClass("etalage_smallthumb_navtoend")) F();
                        else if (a7.hasClass("etalage_smallthumb_last") && a7.next()
                            .length) aP("right");
                        else if (a7.hasClass("etalage_smallthumb_navtostart")) ac();
                        else {
                            if (z && !a(this)
                                .next()
                                .length) return F(), !0;
                            if (z && !a(this)
                                .prev()
                                .length) return ac(), !0;
                            g(a7, !1)
                        }
                    }), c.smallthumb_select_on_hover && aV.mouseenter(function() {
                        a(this)
                            .trigger("click")
                    })), c.click_to_zoom ? w.click(function() {
                        A = !0, U()
                    }) : aO.click(function() {
                        var i = ay.data("anchor");
                        i && aI(i) && (window.location = i)
                    }), q > 1 && c.keyboard && a(document)
                    .keydown(function(i) {
                        (39 === i.keyCode || "39" === i.keyCode) && (c.right_to_left ? L() : au()), (37 === i.keyCode || "37" === i.keyCode) && (c.right_to_left ? au() : L())
                    }), a(window)
                    .bind("load", function() {
                        w.css({
                            "background-image": "none"
                        }), K.css({
                            "background-image": "none"
                        }), ao && (ao = !1, an.remove())
                    }), aJ && k()
            }
        }), this
    }
}(jQuery), window.Modernizr = function(window, document, undefined) {
        function setCss(str) {
            mStyle.cssText = str
        }

        function is(obj, type) {
            return typeof obj === type
        }

        function contains(str, substr) {
            return !!~("" + str)
                .indexOf(substr)
        }

        function testProps(props, prefixed) {
            for (var i in props) {
                var prop = props[i];
                if (!contains(prop, "-") && mStyle[prop] !== undefined) return "pfx" == prefixed ? prop : !0
            }
            return !1
        }

        function testDOMProps(props, obj, elem) {
            for (var i in props) {
                var item = obj[props[i]];
                if (item !== undefined) return elem === !1 ? props[i] : is(item, "function") ? item.bind(elem || obj) : item
            }
            return !1
        }

        function testPropsAll(prop, prefixed, elem) {
            var ucProp = prop.charAt(0)
                .toUpperCase() + prop.slice(1),
                props = (prop + " " + cssomPrefixes.join(ucProp + " ") + ucProp)
                .split(" ");
            return is(prefixed, "string") || is(prefixed, "undefined") ? testProps(props, prefixed) : (props = (prop + " " + domPrefixes.join(ucProp + " ") + ucProp)
                .split(" "), testDOMProps(props, prefixed, elem))
        }

        function webforms() {
            Modernizr.input = function(props) {
                for (var i = 0, len = props.length; len > i; i++) attrs[props[i]] = !!(props[i] in inputElem);
                return attrs.list && (attrs.list = !(!document.createElement("datalist") || !window.HTMLDataListElement)), attrs
            }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")), Modernizr.inputtypes = function(props) {
                for (var bool, inputElemType, defaultView, i = 0, len = props.length; len > i; i++) inputElem.setAttribute("type", inputElemType = props[i]), bool = "text" !== inputElem.type, bool && (inputElem.value = smile, inputElem.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(inputElemType) && inputElem.style.WebkitAppearance !== undefined ? (docElement.appendChild(inputElem), defaultView = document.defaultView, bool = defaultView.getComputedStyle && "textfield" !== defaultView.getComputedStyle(inputElem, null)
                    .WebkitAppearance && 0 !== inputElem.offsetHeight, docElement.removeChild(inputElem)) : /^(search|tel)$/.test(inputElemType) || (bool = /^(url|email)$/.test(inputElemType) ? inputElem.checkValidity && inputElem.checkValidity() === !1 : inputElem.value != smile)), inputs[props[i]] = !!bool;
                return inputs
            }("search tel url email datetime date month week time datetime-local number range color".split(" "))
        }
        var featureName, hasOwnProp, version = "2.7.0",
            Modernizr = {},
            enableClasses = !0,
            docElement = document.documentElement,
            mod = "modernizr",
            modElem = document.createElement(mod),
            mStyle = modElem.style,
            inputElem = document.createElement("input"),
            smile = ":)",
            toString = {}.toString,
            prefixes = " -webkit- -moz- -o- -ms- ".split(" "),
            omPrefixes = "Webkit Moz O ms",
            cssomPrefixes = omPrefixes.split(" "),
            domPrefixes = omPrefixes.toLowerCase()
            .split(" "),
            ns = {
                svg: "http://www.w3.org/2000/svg"
            },
            tests = {},
            inputs = {},
            attrs = {},
            classes = [],
            slice = classes.slice,
            injectElementWithStyles = function(rule, callback, nodes, testnames) {
                var style, ret, node, docOverflow, div = document.createElement("div"),
                    body = document.body,
                    fakeBody = body || document.createElement("body");
                if (parseInt(nodes, 10))
                    for (; nodes--;) node = document.createElement("div"), node.id = testnames ? testnames[nodes] : mod + (nodes + 1), div.appendChild(node);
                return style = ["&#173;", '<style id="s', mod, '">', rule, "</style>"].join(""), div.id = mod, (body ? div : fakeBody)
                    .innerHTML += style, fakeBody.appendChild(div), body || (fakeBody.style.background = "", fakeBody.style.overflow = "hidden", docOverflow = docElement.style.overflow, docElement.style.overflow = "hidden", docElement.appendChild(fakeBody)), ret = callback(div, rule), body ? div.parentNode.removeChild(div) : (fakeBody.parentNode.removeChild(fakeBody), docElement.style.overflow = docOverflow), !!ret
            },
            isEventSupported = function() {
                function isEventSupported(eventName, element) {
                    element = element || document.createElement(TAGNAMES[eventName] || "div"), eventName = "on" + eventName;
                    var isSupported = eventName in element;
                    return isSupported || (element.setAttribute || (element = document.createElement("div")), element.setAttribute && element.removeAttribute && (element.setAttribute(eventName, ""), isSupported = is(element[eventName], "function"), is(element[eventName], "undefined") || (element[eventName] = undefined), element.removeAttribute(eventName))), element = null, isSupported
                }
                var TAGNAMES = {
                    select: "input",
                    change: "input",
                    submit: "form",
                    reset: "form",
                    error: "img",
                    load: "img",
                    abort: "img"
                };
                return isEventSupported
            }(),
            _hasOwnProperty = {}.hasOwnProperty;
        hasOwnProp = is(_hasOwnProperty, "undefined") || is(_hasOwnProperty.call, "undefined") ? function(object, property) {
            return property in object && is(object.constructor.prototype[property], "undefined")
        } : function(object, property) {
            return _hasOwnProperty.call(object, property)
        }, Function.prototype.bind || (Function.prototype.bind = function(that) {
            var target = this;
            if ("function" != typeof target) throw new TypeError;
            var args = slice.call(arguments, 1),
                bound = function() {
                    if (this instanceof bound) {
                        var F = function() {};
                        F.prototype = target.prototype;
                        var self = new F,
                            result = target.apply(self, args.concat(slice.call(arguments)));
                        return Object(result) === result ? result : self
                    }
                    return target.apply(that, args.concat(slice.call(arguments)))
                };
            return bound
        }), tests.touch = function() {
            var bool;
            return "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch ? bool = !0 : injectElementWithStyles(["@media (", prefixes.join("touch-enabled),("), mod, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(node) {
                bool = 9 === node.offsetTop
            }), bool
        }, tests.postmessage = function() {
            return !!window.postMessage
        }, tests.hashchange = function() {
            return isEventSupported("hashchange", window) && (document.documentMode === undefined || document.documentMode > 7)
        }, tests.cssanimations = function() {
            return testPropsAll("animationName")
        }, tests.cssgradients = function() {
            var str1 = "background-image:",
                str2 = "gradient(linear,left top,right bottom,from(#9f9),to(white));",
                str3 = "linear-gradient(left top,#9f9, white);";
            return setCss((str1 + "-webkit- ".split(" ")
                    .join(str2 + str1) + prefixes.join(str3 + str1))
                .slice(0, -str1.length)), contains(mStyle.backgroundImage, "gradient")
        }, tests.csstransitions = function() {
            return testPropsAll("transition")
        }, tests.fontface = function() {
            var bool;
            return injectElementWithStyles('@font-face {font-family:"font";src:url("https://")}', function(node, rule) {
                var style = document.getElementById("smodernizr"),
                    sheet = style.sheet || style.styleSheet,
                    cssText = sheet ? sheet.cssRules && sheet.cssRules[0] ? sheet.cssRules[0].cssText : sheet.cssText || "" : "";
                bool = /src/i.test(cssText) && 0 === cssText.indexOf(rule.split(" ")[0])
            }), bool
        }, tests.generatedcontent = function() {
            var bool;
            return injectElementWithStyles(["#", mod, "{font:0/0 a}#", mod, ':after{content:"', smile, '";visibility:hidden;font:3px/1 a}'].join(""), function(node) {
                bool = node.offsetHeight >= 3
            }), bool
        }, tests.video = function() {
            var elem = document.createElement("video"),
                bool = !1;
            try {
                (bool = !!elem.canPlayType) && (bool = new Boolean(bool), bool.ogg = elem.canPlayType('video/ogg; codecs="theora"')
                    .replace(/^no$/, ""), bool.h264 = elem.canPlayType('video/mp4; codecs="avc1.42E01E"')
                    .replace(/^no$/, ""), bool.webm = elem.canPlayType('video/webm; codecs="vp8, vorbis"')
                    .replace(/^no$/, ""))
            } catch (e) {}
            return bool
        }, tests.localstorage = function() {
            try {
                return localStorage.setItem(mod, mod), localStorage.removeItem(mod), !0
            } catch (e) {
                return !1
            }
        }, tests.svg = function() {
            return !!document.createElementNS && !!document.createElementNS(ns.svg, "svg")
                .createSVGRect
        }, tests.inlinesvg = function() {
            var div = document.createElement("div");
            return div.innerHTML = "<svg/>", (div.firstChild && div.firstChild.namespaceURI) == ns.svg
        }, tests.svgclippaths = function() {
            return !!document.createElementNS && /SVGClipPath/.test(toString.call(document.createElementNS(ns.svg, "clipPath")))
        };
        for (var feature in tests) hasOwnProp(tests, feature) && (featureName = feature.toLowerCase(), Modernizr[featureName] = tests[feature](), classes.push((Modernizr[featureName] ? "" : "no-") + featureName));
        return Modernizr.input || webforms(), Modernizr.addTest = function(feature, test) {
                if ("object" == typeof feature)
                    for (var key in feature) hasOwnProp(feature, key) && Modernizr.addTest(key, feature[key]);
                else {
                    if (feature = feature.toLowerCase(), Modernizr[feature] !== undefined) return Modernizr;
                    test = "function" == typeof test ? test() : test, "undefined" != typeof enableClasses && enableClasses && (docElement.className += " " + (test ? "" : "no-") + feature), Modernizr[feature] = test
                }
                return Modernizr
            }, setCss(""), modElem = inputElem = null,
            function(window, document) {
                function addStyleSheet(ownerDocument, cssText) {
                    var p = ownerDocument.createElement("p"),
                        parent = ownerDocument.getElementsByTagName("head")[0] || ownerDocument.documentElement;
                    return p.innerHTML = "x<style>" + cssText + "</style>", parent.insertBefore(p.lastChild, parent.firstChild)
                }

                function getElements() {
                    var elements = html5.elements;
                    return "string" == typeof elements ? elements.split(" ") : elements
                }

                function getExpandoData(ownerDocument) {
                    var data = expandoData[ownerDocument[expando]];
                    return data || (data = {}, expanID++, ownerDocument[expando] = expanID, expandoData[expanID] = data), data
                }

                function createElement(nodeName, ownerDocument, data) {
                    if (ownerDocument || (ownerDocument = document), supportsUnknownElements) return ownerDocument.createElement(nodeName);
                    data || (data = getExpandoData(ownerDocument));
                    var node;
                    return node = data.cache[nodeName] ? data.cache[nodeName].cloneNode() : saveClones.test(nodeName) ? (data.cache[nodeName] = data.createElem(nodeName))
                        .cloneNode() : data.createElem(nodeName), !node.canHaveChildren || reSkip.test(nodeName) || node.tagUrn ? node : data.frag.appendChild(node)
                }

                function createDocumentFragment(ownerDocument, data) {
                    if (ownerDocument || (ownerDocument = document), supportsUnknownElements) return ownerDocument.createDocumentFragment();
                    data = data || getExpandoData(ownerDocument);
                    for (var clone = data.frag.cloneNode(), i = 0, elems = getElements(), l = elems.length; l > i; i++) clone.createElement(elems[i]);
                    return clone
                }

                function shivMethods(ownerDocument, data) {
                    data.cache || (data.cache = {}, data.createElem = ownerDocument.createElement, data.createFrag = ownerDocument.createDocumentFragment, data.frag = data.createFrag()), ownerDocument.createElement = function(nodeName) {
                        return html5.shivMethods ? createElement(nodeName, ownerDocument, data) : data.createElem(nodeName)
                    }, ownerDocument.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + getElements()
                        .join()
                        .replace(/[\w\-]+/g, function(nodeName) {
                            return data.createElem(nodeName), data.frag.createElement(nodeName), 'c("' + nodeName + '")'
                        }) + ");return n}")(html5, data.frag)
                }

                function shivDocument(ownerDocument) {
                    ownerDocument || (ownerDocument = document);
                    var data = getExpandoData(ownerDocument);
                    return !html5.shivCSS || supportsHtml5Styles || data.hasCSS || (data.hasCSS = !!addStyleSheet(ownerDocument, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), supportsUnknownElements || shivMethods(ownerDocument, data), ownerDocument
                }
                var supportsHtml5Styles, supportsUnknownElements, version = "3.7.0",
                    options = window.html5 || {},
                    reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
                    saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
                    expando = "_html5shiv",
                    expanID = 0,
                    expandoData = {};
                ! function() {
                    try {
                        var a = document.createElement("a");
                        a.innerHTML = "<xyz></xyz>", supportsHtml5Styles = "hidden" in a, supportsUnknownElements = 1 == a.childNodes.length || function() {
                            document.createElement("a");
                            var frag = document.createDocumentFragment();
                            return "undefined" == typeof frag.cloneNode || "undefined" == typeof frag.createDocumentFragment || "undefined" == typeof frag.createElement
                        }()
                    } catch (e) {
                        supportsHtml5Styles = !0, supportsUnknownElements = !0
                    }
                }();
                var html5 = {
                    elements: options.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
                    version: version,
                    shivCSS: options.shivCSS !== !1,
                    supportsUnknownElements: supportsUnknownElements,
                    shivMethods: options.shivMethods !== !1,
                    type: "default",
                    shivDocument: shivDocument,
                    createElement: createElement,
                    createDocumentFragment: createDocumentFragment
                };
                window.html5 = html5, shivDocument(document)
            }(this, document), Modernizr._version = version, Modernizr._prefixes = prefixes, Modernizr._domPrefixes = domPrefixes, Modernizr._cssomPrefixes = cssomPrefixes, Modernizr.hasEvent = isEventSupported, Modernizr.testProp = function(prop) {
                return testProps([prop])
            }, Modernizr.testAllProps = testPropsAll, Modernizr.testStyles = injectElementWithStyles, Modernizr.prefixed = function(prop, obj, elem) {
                return obj ? testPropsAll(prop, obj, elem) : testPropsAll(prop, "pfx")
            }, docElement.className = docElement.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (enableClasses ? " js " + classes.join(" ") : ""), Modernizr
    }(this, this.document),
    function(a, b, c) {
        function d(a) {
            return "[object Function]" == o.call(a)
        }

        function e(a) {
            return "string" == typeof a
        }

        function f() {}

        function g(a) {
            return !a || "loaded" == a || "complete" == a || "uninitialized" == a
        }

        function h() {
            var a = p.shift();
            q = 1, a ? a.t ? m(function() {
                ("c" == a.t ? B.injectCss : B.injectJs)(a.s, 0, a.a, a.x, a.e, 1)
            }, 0) : (a(), h()) : q = 0
        }

        function i(a, c, d, e, f, i, j) {
            function k(b) {
                if (!o && g(l.readyState) && (u.r = o = 1, !q && h(), l.onload = l.onreadystatechange = null, b)) {
                    "img" != a && m(function() {
                        t.removeChild(l)
                    }, 50);
                    for (var d in y[c]) y[c].hasOwnProperty(d) && y[c][d].onload()
                }
            }
            var j = j || B.errorTimeout,
                l = b.createElement(a),
                o = 0,
                r = 0,
                u = {
                    t: d,
                    s: c,
                    e: f,
                    a: i,
                    x: j
                };
            1 === y[c] && (r = 1, y[c] = []), "object" == a ? l.data = c : (l.src = c, l.type = a), l.width = l.height = "0", l.onerror = l.onload = l.onreadystatechange = function() {
                k.call(this, r)
            }, p.splice(e, 0, u), "img" != a && (r || 2 === y[c] ? (t.insertBefore(l, s ? null : n), m(k, j)) : y[c].push(l))
        }

        function j(a, b, c, d, f) {
            return q = 0, b = b || "j", e(a) ? i("c" == b ? v : u, a, b, this.i++, c, d, f) : (p.splice(this.i++, 0, a), 1 == p.length && h()), this
        }

        function k() {
            var a = B;
            return a.loader = {
                load: j,
                i: 0
            }, a
        }
        var A, B, l = b.documentElement,
            m = a.setTimeout,
            n = b.getElementsByTagName("script")[0],
            o = {}.toString,
            p = [],
            q = 0,
            r = "MozAppearance" in l.style,
            s = r && !!b.createRange()
            .compareNode,
            t = s ? l : n.parentNode,
            l = a.opera && "[object Opera]" == o.call(a.opera),
            l = !!b.attachEvent && !l,
            u = r ? "object" : l ? "script" : "img",
            v = l ? "script" : u,
            w = Array.isArray || function(a) {
                return "[object Array]" == o.call(a)
            },
            x = [],
            y = {},
            z = {
                timeout: function(a, b) {
                    return b.length && (a.timeout = b[0]), a
                }
            };
        B = function(a) {
            function b(a) {
                var e, f, g, a = a.split("!"),
                    b = x.length,
                    c = a.pop(),
                    d = a.length,
                    c = {
                        url: c,
                        origUrl: c,
                        prefixes: a
                    };
                for (f = 0; d > f; f++) g = a[f].split("="), (e = z[g.shift()]) && (c = e(c, g));
                for (f = 0; b > f; f++) c = x[f](c);
                return c
            }

            function g(a, e, f, g, h) {
                var i = b(a),
                    j = i.autoCallback;
                i.url.split(".")
                    .pop()
                    .split("?")
                    .shift(), i.bypass || (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("/")
                        .pop()
                        .split("?")[0]]), i.instead ? i.instead(a, e, f, g, h) : (y[i.url] ? i.noexec = !0 : y[i.url] = 1, f.load(i.url, i.forceCSS || !i.forceJS && "css" == i.url.split(".")
                        .pop()
                        .split("?")
                        .shift() ? "c" : c, i.noexec, i.attrs, i.timeout), (d(e) || d(j)) && f.load(function() {
                        k(), e && e(i.origUrl, h, g), j && j(i.origUrl, h, g), y[i.url] = 2
                    })))
            }

            function h(a, b) {
                function c(a, c) {
                    if (a) {
                        if (e(a)) c || (j = function() {
                            var a = [].slice.call(arguments);
                            k.apply(this, a), l()
                        }), g(a, j, b, 0, h);
                        else if (Object(a) === a)
                            for (n in m = function() {
                                    var c, b = 0;
                                    for (c in a) a.hasOwnProperty(c) && b++;
                                    return b
                                }(), a) a.hasOwnProperty(n) && (!c && !--m && (d(j) ? j = function() {
                                var a = [].slice.call(arguments);
                                k.apply(this, a), l()
                            } : j[n] = function(a) {
                                return function() {
                                    var b = [].slice.call(arguments);
                                    a && a.apply(this, b), l()
                                }
                            }(k[n])), g(a[n], j, b, n, h))
                    } else !c && l()
                }
                var m, n, h = !!a.test,
                    i = a.load || a.both,
                    j = a.callback || f,
                    k = j,
                    l = a.complete || f;
                c(h ? a.yep : a.nope, !!i), i && c(i)
            }
            var i, j, l = this.yepnope.loader;
            if (e(a)) g(a, 0, l, 0);
            else if (w(a))
                for (i = 0; i < a.length; i++) j = a[i], e(j) ? g(j, 0, l, 0) : w(j) ? B(j) : Object(j) === j && h(j, l);
            else Object(a) === a && h(a, l)
        }, B.addPrefix = function(a, b) {
            z[a] = b
        }, B.addFilter = function(a) {
            x.push(a)
        }, B.errorTimeout = 1e4, null == b.readyState && b.addEventListener && (b.readyState = "loading", b.addEventListener("DOMContentLoaded", A = function() {
            b.removeEventListener("DOMContentLoaded", A, 0), b.readyState = "complete"
        }, 0)), a.yepnope = k(), a.yepnope.executeStack = h, a.yepnope.injectJs = function(a, c, d, e, i, j) {
            var l, o, k = b.createElement("script"),
                e = e || B.errorTimeout;
            k.src = a;
            for (o in d) k.setAttribute(o, d[o]);
            c = j ? h : c || f, k.onreadystatechange = k.onload = function() {
                !l && g(k.readyState) && (l = 1, c(), k.onload = k.onreadystatechange = null)
            }, m(function() {
                l || (l = 1, c(1))
            }, e), i ? k.onload() : n.parentNode.insertBefore(k, n)
        }, a.yepnope.injectCss = function(a, c, d, e, g, i) {
            var j, e = b.createElement("link"),
                c = i ? h : c || f;
            e.href = a, e.rel = "stylesheet", e.type = "text/css";
            for (j in d) e.setAttribute(j, d[j]);
            g || (n.parentNode.insertBefore(e, n), m(c, 0))
        }
    }(this, document), Modernizr.load = function() {
        yepnope.apply(window, [].slice.call(arguments, 0))
    },
    function(window, navigator) {
        function Detectizr(opt) {
            var i, j, k, l, alias, plugin, resizeTimeoutId, re, oldOrientation, extend = function(obj, extObj) {
                    var a, b, i;
                    if (arguments.length > 2)
                        for (a = 1, b = arguments.length; b > a; a += 1) extend(obj, arguments[a]);
                    else
                        for (i in extObj) extObj.hasOwnProperty(i) && (obj[i] = extObj[i]);
                    return obj
                },
                that = this,
                device = Modernizr.Detectizr.device,
                docElement = document.documentElement,
                deviceTypes = ["tv", "tablet", "mobile", "desktop"],
                plugins2detect = {
                    java: {
                        substrs: ["Java"],
                        progIds: ["JavaWebStart.isInstalled"]
                    },
                    acrobat: {
                        substrs: ["Adobe", "Acrobat"],
                        progIds: ["AcroPDF.PDF", "PDF.PDFCtrl.5"]
                    },
                    flash: {
                        substrs: ["Shockwave", "Flash"],
                        progIds: ["ShockwaveFlash.ShockwaveFlash"]
                    },
                    mediaplayer: {
                        substrs: ["Windows Media"],
                        progIds: ["MediaPlayer.MediaPlayer"]
                    },
                    silverlight: {
                        substrs: ["Silverlight"],
                        progIds: ["AgControl.AgControl"]
                    }
                };
            if (options = extend({}, options, opt || {}), that.is = function(key) {
                    return device.userAgent.indexOf(key) > -1
                }, that.test = function(regex) {
                    return regex.test(device.userAgent)
                }, that.exec = function(regex) {
                    return regex.exec(device.userAgent)
                }, that.toCamel = function(string) {
                    return null === string || void 0 === string ? "" : String(string)
                        .replace(/((\s|\-|\.)+[a-z0-9])/g, function($1) {
                            return $1.toUpperCase()
                                .replace(/(\s|\-|\.)/g, "")
                        })
                }, that.addVersionTest = function(mainTest, version, maxLength) {
                    null !== version && void 0 !== version && "" !== version && (version = that.toCamel(version), "" !== version && (void 0 !== maxLength && maxLength > 0 && (version = version.substr(0, maxLength)), that.addConditionalTest(mainTest + version, !0)))
                }, that.checkOrientation = function() {
                    window.clearTimeout(resizeTimeoutId), resizeTimeoutId = window.setTimeout(function() {
                        oldOrientation = device.orientation, device.orientation = window.innerHeight > window.innerWidth ? "portrait" : "landscape", that.addConditionalTest(device.orientation, !0), oldOrientation !== device.orientation && that.addConditionalTest(oldOrientation, !1)
                    }, 10)
                }, that.addConditionalTest = function(feature, test) {
                    null !== feature && void 0 !== feature && "" !== feature && (options.addAllFeaturesAsClass ? Modernizr.addTest(feature, test) : (test = "function" == typeof test ? test() : test, test ? Modernizr.addTest(feature, !0) : (delete Modernizr[feature], re = new RegExp("\\b" + feature + "\\b"), docElement.className = docElement.className.replace(re, ""))))
                }, options.detectDevice) {
                for (that.test(/GoogleTV|SmartTV|Internet.TV|NetCast|NETTV|AppleTV|boxee|Kylo|Roku|DLNADOC|CE\-HTML/i) ? (device.type = deviceTypes[0], device.model = "smartTv") : that.test(/Xbox|PLAYSTATION.3|Wii/i) ? (device.type = deviceTypes[0], device.model = "gameConsole") : that.test(/iP(a|ro)d/i) ? (device.type = deviceTypes[1], device.model = "ipad") : that.test(/tablet/i) && !that.test(/RX-34/i) || that.test(/FOLIO/i) ? (device.type = deviceTypes[1], device.model = String(that.exec(/playbook/))) : that.test(/Linux/i) && that.test(/Android/i) && !that.test(/Fennec|mobi|HTC.Magic|HTCX06HT|Nexus.One|SC-02B|fone.945/i) ? (device.type = deviceTypes[1], device.model = "android") : that.test(/Kindle/i) || that.test(/Mac.OS/i) && that.test(/Silk/i) ? (device.type = deviceTypes[1], device.model = "kindle") : that.test(/GT-P10|SC-01C|SHW-M180S|SGH-T849|SCH-I800|SHW-M180L|SPH-P100|SGH-I987|zt180|HTC(.Flyer|\_Flyer)|Sprint.ATP51|ViewPad7|pandigital(sprnova|nova)|Ideos.S7|Dell.Streak.7|Advent.Vega|A101IT|A70BHT|MID7015|Next2|nook/i) || that.test(/MB511/i) && that.test(/RUTEM/i) ? (device.type = deviceTypes[1], device.model = "android") : that.test(/BB10/i) ? (device.type = deviceTypes[1], device.model = "blackberry") : (device.model = that.exec(/iphone|ipod|android|blackberry|opera mini|opera mobi|skyfire|maemo|windows phone|palm|iemobile|symbian|symbianos|fennec|j2me/i), null !== device.model ? (device.type = deviceTypes[2], device.model = String(device.model)) : (device.model = "", that.test(/BOLT|Fennec|Iris|Maemo|Minimo|Mobi|mowser|NetFront|Novarra|Prism|RX-34|Skyfire|Tear|XV6875|XV6975|Google.Wireless.Transcoder/i) ? device.type = deviceTypes[2] : that.test(/Opera/i) && that.test(/Windows.NT.5/i) && that.test(/HTC|Xda|Mini|Vario|SAMSUNG\-GT\-i8000|SAMSUNG\-SGH\-i9/i) ? device.type = deviceTypes[2] : that.test(/Windows.(NT|XP|ME|9)/i) && !that.test(/Phone/i) || that.test(/Win(9|.9|NT)/i) || that.test(/\(Windows 8\)/i) ? device.type = deviceTypes[3] : that.test(/Macintosh|PowerPC/i) && !that.test(/Silk/i) ? device.type = deviceTypes[3] : that.test(/Linux/i) && that.test(/X11/i) ? device.type = deviceTypes[3] : that.test(/Solaris|SunOS|BSD/i) ? device.type = deviceTypes[3] : that.test(/Bot|Crawler|Spider|Yahoo|ia_archiver|Covario-IDS|findlinks|DataparkSearch|larbin|Mediapartners-Google|NG-Search|Snappy|Teoma|Jeeves|TinEye/i) && !that.test(/Mobile/i) ? (device.type = deviceTypes[3], device.model = "crawler") : device.type = deviceTypes[2])), i = 0, j = deviceTypes.length; j > i; i += 1) that.addConditionalTest(deviceTypes[i], device.type === deviceTypes[i]);
                options.detectDeviceModel && that.addConditionalTest(that.toCamel(device.model), !0), (device.type === deviceTypes[1] || device.type === deviceTypes[2]) && (window.onresize = function(event) {
                    that.checkOrientation(event)
                }, that.checkOrientation())
            }
            if (options.detectScreen && Modernizr.mq && (that.addConditionalTest("smallScreen", Modernizr.mq("only screen and (max-width: 480px)")), that.addConditionalTest("verySmallScreen", Modernizr.mq("only screen and (max-width: 320px)")), that.addConditionalTest("veryVerySmallScreen", Modernizr.mq("only screen and (max-width: 240px)"))), options.detectOS && ("" !== device.model && ("ipad" === device.model || "iphone" === device.model || "ipod" === device.model ? (device.osVersion = that.test(/os\s(\d+)_/) ? RegExp.$1 : "", device.os = "ios", device.osVersionFull = that.test(/os ([^\s]+)/) ? RegExp.$1.replace(/_/g, ".") : "") : "android" === device.model ? (device.osVersion = (that.test(/os\s(\d+)_/) ? RegExp.$1 : "")
                    .substr(0, 2), device.osVersion || (device.osVersion = that.test(/android\s(\d+)\./) ? RegExp.$1 : "", device.osVersionFull = that.test(/android ([^\s]+)/) ? RegExp.$1.replace(/_/g, ".") : ""), device.os = "android") : "blackberry" === device.model ? (device.osVersion = that.test(/version\/([^\s]+)/) ? RegExp.$1 : "", device.os = "blackberry") : "playbook" === device.model && (device.osVersion = that.test(/os ([^\s]+)/) ? RegExp.$1.replace(";", "") : "", device.os = "blackberry")), "" === device.os && (that.is("win") || that.is("16bit") ? (device.os = "windows", that.is("windows nt 6.3") ? (device.osVersion = "8", device.osVersionFull = "8.1") : that.is("windows nt 6.2") || that.test(/\(windows 8\)/) ? device.osVersion = "8" : that.is("windows nt 6.1") ? device.osVersion = "7" : that.is("windows nt 6.0") ? device.osVersion = "vista" : that.is("windows nt 5.2") || that.is("windows nt 5.1") || that.is("windows xp") ? device.osVersion = "xp" : that.is("windows nt 5.0") || that.is("windows 2000") ? device.osVersion = "2k" : that.is("winnt") || that.is("windows nt") ? device.osVersion = "nt" : that.is("win98") || that.is("windows 98") ? device.osVersion = "98" : (that.is("win95") || that.is("windows 95")) && (device.osVersion = "95")) : that.is("mac") || that.is("darwin") ? (device.os = "mac", that.is("68k") || that.is("68000") ? device.osVersion = "68k" : that.is("ppc") || that.is("powerpc") ? device.osVersion = "ppc" : that.is("os x") && (device.osVersion = "os x")) : that.is("webtv") ? device.os = "webtv" : that.is("x11") || that.is("inux") ? device.os = "linux" : that.is("sunos") ? device.os = "sun" : that.is("irix") ? device.os = "irix" : that.is("freebsd") ? device.os = "freebsd" : that.is("bsd") && (device.os = "bsd")), "" !== device.os && (!device.osVersionFull && device.osVersion && (device.osVersionFull = device.osVersion), that.addConditionalTest(device.os, !0), that.addVersionTest(device.os, device.osVersionFull.replace(/\./g, "_")), that.addVersionTest(device.os, device.osVersion))), options.detectBrowser && (that.test(/opera|webtv/i) || !that.test(/msie\s([0-9]{1,})/) && !that.is("trident") ? that.is("firefox") ? (device.browserEngine = "gecko", device.browser = "firefox", device.browserVersion = (that.test(/firefox\/(\d+(\.?\d+)*)/) ? RegExp.$1 : "")
                    .substr(0, 2)) : that.is("gecko/") ? device.browserEngine = "gecko" : that.is("opera") ? (device.browser = "opera", device.browserEngine = "presto", device.browserVersion = that.test(/version\/(\d+)/) ? RegExp.$1 : that.test(/opera(\s|\/)(\d+)/) ? RegExp.$2 : "") : that.is("konqueror") ? device.browser = "konqueror" : that.is("chrome") ? (device.browserEngine = "webkit", device.browser = "chrome", device.browserVersion = that.test(/chrome\/(\d+)/) ? RegExp.$1 : "") : that.is("iron") ? (device.browserEngine = "webkit", device.browser = "iron") : that.is("applewebkit/") ? (device.browser = "safari", device.browserEngine = "webkit", device.browserVersion = that.test(/version\/(\d+)/) ? RegExp.$1 : "") : that.is("mozilla/") && (device.browserEngine = "gecko") : (device.browser = "ie", device.browserVersion = !window.addEventListener && document.documentMode && 7 === document.documentMode ? "8compat" : that.test(/trident.*rv[ :](\d+)\./) ? RegExp.$1 : that.test(/trident\/4\.0/) ? "8" : RegExp.$1), "" !== device.browser && (that.addConditionalTest(device.browser, !0), "" !== device.browserVersion && that.addVersionTest(device.browser, device.browserVersion)), that.addConditionalTest(device.browserEngine, !0)), options.detectPlugins) {
                that.detectPlugin = function(substrs) {
                    if (navigator.plugins)
                        for (i = 0, j = navigator.plugins.length; j > i; i += 1) {
                            var plugin = navigator.plugins[i],
                                haystack = plugin.name + plugin.description,
                                found = 0;
                            for (k = 0, l = substrs.length; l > k; k += 1) - 1 !== haystack.indexOf(substrs[k]) && (found += 1);
                            if (found === substrs.length) return !0
                        }
                    return !1
                }, that.detectObject = function(progIds, fns) {
                    if (window.ActiveXObject)
                        for (i = 0, j = progIds.length; j > i; i += 1) try {
                            var obj = new ActiveXObject(progIds[i]);
                            if (obj) return fns && fns[i] ? fns[i].call(obj) : !0
                        } catch (e) {}
                    return !1
                };
                for (alias in plugins2detect) plugins2detect.hasOwnProperty(alias) && (plugin = plugins2detect[alias], (that.detectPlugin(plugin.substrs) || that.detectObject(plugin.progIds, plugin.fns)) && (device.browserPlugins.push(alias), that.addConditionalTest(alias, !0)))
            }
        }

        function init() {
            void 0 !== Modernizr && (Modernizr.Detectizr = Modernizr.Detectizr || {}, Modernizr.Detectizr.device = {
                type: "",
                model: "",
                orientation: "",
                browser: "",
                browserEngine: "",
                browserPlugins: [],
                browserVersion: "",
                os: "",
                osVersion: "",
                osVersionFull: "",
                userAgent: (navigator.userAgent || navigator.vendor || window.opera)
                    .toLowerCase()
            }, Modernizr.Detectizr.detect = function(settings) {
                return new Detectizr(settings)
            })
        }
        var Modernizr = window.Modernizr,
            options = {
                addAllFeaturesAsClass: !1,
                detectDevice: !0,
                detectDeviceModel: !0,
                detectScreen: !0,
                detectOS: !0,
                detectBrowser: !0,
                detectPlugins: !0
            };
        init()
    }(this, navigator);
var Log = function(object) {
        if ("object" != typeof object) return !1;
        if ((object.level || 0) < shop.code.log.level) return !1;
        if (shop.code.log.frontend && window.console) switch (object.type) {
            case "log":
                console.log(object.message);
                break;
            case "warn":
                console.warn(object.message);
                break;
            case "error":
                console.error(object.message);
                break;
            case "table":
                console.table(object.message);
                break;
            case "dir":
                console.dir(object.message);
                break;
            default:
            case "info":
                console.info(object.message)
        }
        shop.code.log.backend && ("string" != typeof message && (message = JSON.stringify(object.message)), (new Image)
            .src = shop.url.base + shop.code.log.url + "?l=" + object.type + "&u=" + encodeURIComponent(document.location.pathname) + "&t=" + encodeURIComponent(shop.url.template) + "&m=" + encodeURIComponent(message) + "&_=" + 1 * new Date)
    },
    Template = function() {
        this.placeholder = !1, this.exceptions = !1, this.template = !1, this.output = !1
    };
Template.prototype = {
        setPlaceholder: function(placeholder) {
            return "object" != typeof placeholder ? (Log({
                level: 4,
                message: "Template.setOlaceholder: Error placeholder is not an object",
                type: "error"
            }), !1) : (this.placeholder = placeholder, this)
        },
        setExceptions: function(exceptions) {
            return exceptions && "object" != typeof exceptions ? (Log({
                level: 4,
                message: "Template.setExceptions: Error exception(s) is not an object",
                type: "error"
            }), !1) : (this.exceptions = exceptions, this)
        },
        setTemplate: function(template) {
            var _templatePath = document.getElementById(template);
            return template && "" === template && !_templatePath ? (Log({
                level: 4,
                message: "Template.setTemplate: Error template is not a string or is empty",
                type: "error"
            }), !1) : (_templatePath && (this.template = _templatePath.innerHTML), this)
        },
        render: function() {
            return this.template && this.placeholder && (this.output = this.template.replace(new RegExp("{{([a-zA-Z0-9_:]+)}}", "gi"), function(context) {
                return function(a, b) {
                    var content, ixOf = b.indexOf(":"),
                        modMethod = ixOf > 0 ? b.substr(0, ixOf) : "",
                        b = ixOf >= 0 ? b.substr(ixOf + 1) : b;
                    return content = context.exceptions && "function" == typeof context.exceptions[b] ? context.exceptions[b](context.placeholder[b]) : b in context.placeholder ? context.placeholder[b] : "", "escape" === modMethod && (content = window.shop.escapeHTML(content)), content
                }
            }(this))), this.output
        }
    }, jQuery.base64 = function() {
        function _getbyte64(s, i) {
            var idx = _ALPHA.indexOf(s.charAt(i));
            if (-1 === idx) throw "Cannot decode base64";
            return idx
        }

        function _decode(s) {
            var i, b10, pads = 0,
                imax = s.length,
                x = [];
            if (s = String(s), 0 === imax) return s;
            if (imax % 4 !== 0) throw "Cannot decode base64";
            for (s.charAt(imax - 1) === _PADCHAR && (pads = 1, s.charAt(imax - 2) === _PADCHAR && (pads = 2), imax -= 4), i = 0; imax > i; i += 4) b10 = _getbyte64(s, i) << 18 | _getbyte64(s, i + 1) << 12 | _getbyte64(s, i + 2) << 6 | _getbyte64(s, i + 3), x.push(String.fromCharCode(b10 >> 16, b10 >> 8 & 255, 255 & b10));
            switch (pads) {
                case 1:
                    b10 = _getbyte64(s, i) << 18 | _getbyte64(s, i + 1) << 12 | _getbyte64(s, i + 2) << 6, x.push(String.fromCharCode(b10 >> 16, b10 >> 8 & 255));
                    break;
                case 2:
                    b10 = _getbyte64(s, i) << 18 | _getbyte64(s, i + 1) << 12, x.push(String.fromCharCode(b10 >> 16))
            }
            return x.join("")
        }

        function _getbyte(s, i) {
            var x = s.charCodeAt(i);
            if (x > 255) throw "INVALID_CHARACTER_ERR: DOM Exception 5";
            return x
        }

        function _encode(s) {
            if (1 !== arguments.length) throw "SyntaxError: exactly one argument required";
            s = String(s);
            var i, b10, x = [],
                imax = s.length - s.length % 3;
            if (0 === s.length) return s;
            for (i = 0; imax > i; i += 3) b10 = _getbyte(s, i) << 16 | _getbyte(s, i + 1) << 8 | _getbyte(s, i + 2), x.push(_ALPHA.charAt(b10 >> 18)), x.push(_ALPHA.charAt(b10 >> 12 & 63)), x.push(_ALPHA.charAt(b10 >> 6 & 63)), x.push(_ALPHA.charAt(63 & b10));
            switch (s.length - imax) {
                case 1:
                    b10 = _getbyte(s, i) << 16, x.push(_ALPHA.charAt(b10 >> 18) + _ALPHA.charAt(b10 >> 12 & 63) + _PADCHAR + _PADCHAR);
                    break;
                case 2:
                    b10 = _getbyte(s, i) << 16 | _getbyte(s, i + 1) << 8, x.push(_ALPHA.charAt(b10 >> 18) + _ALPHA.charAt(b10 >> 12 & 63) + _ALPHA.charAt(b10 >> 6 & 63) + _PADCHAR)
            }
            return x.join("")
        }
        var _PADCHAR = "=",
            _ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
            _VERSION = "1.0";
        return {
            decode: _decode,
            encode: _encode,
            VERSION: _VERSION
        }
    }(jQuery),
    function($) {
        "use strict";
        $.extend($.fn, {
            pstrength: function(options) {
                var options = $.extend({
                    verdicts: ["sehr schwach", "schwach", "mittel", "stark", "sehr stark"],
                    colors: ["#f00", "#c06", "#f60", "#3c0", "#3f0"],
                    scores: [10, 15, 30, 40],
                    minchar: 5,
                    tooShort: "nicht ausreichend"
                }, options);
                return this.each(function() {
                    var infoarea = $(this)
                        .attr("id"),
                        infoareaIndexOfPoint = infoarea.indexOf("."); - 1 !== infoareaIndexOfPoint && (infoarea = infoarea.substr(infoareaIndexOfPoint + 1)), $(this)
                        .after('<div class="pstrength"><div class="pstrength-info" id="' + infoarea + '_text"></div><div class="pstrength-bar" id="' + infoarea + '_bar"></div></div>'), "" !== $(this)
                        .val() && $.fn.runPassword($(this)
                            .val(), infoarea, options), $(this)
                        .keyup(function() {
                            $.fn.runPassword($(this)
                                .val(), infoarea, options)
                        })
                })
            },
            runPassword: function(password, infoarea, options) {
                var strColor, strText, nPerc = $.fn.checkPassword(password, options),
                    ctlBar = "#" + infoarea + "_bar",
                    ctlText = "#" + infoarea + "_text",
                    containsANumberRegex = /[0-9]+/,
                    containsThreeDifferentLettersRegex = /([a-zA-Z][^a-zA-Z]*){3,}/;
                0 > nPerc || !containsANumberRegex.test(password) || !containsThreeDifferentLettersRegex.test(password) ? (strColor = "#ccc", strText = options.tooShort, $(ctlBar)
                        .css({
                            width: "5%"
                        })) : nPerc <= options.scores[0] ? (strColor = options.colors[0], strText = options.verdicts[0], $(ctlBar)
                        .css({
                            width: "10%"
                        })) : nPerc > options.scores[0] && nPerc <= options.scores[1] ? (strColor = options.colors[1], strText = options.verdicts[1], $(ctlBar)
                        .css({
                            width: "20%"
                        })) : nPerc > options.scores[1] && nPerc <= options.scores[2] ? (strColor = options.colors[2], strText = options.verdicts[2], $(ctlBar)
                        .css({
                            width: "40%"
                        })) : nPerc > options.scores[2] && nPerc <= options.scores[3] ? (strColor = options.colors[3], strText = options.verdicts[3], $(ctlBar)
                        .css({
                            width: "60%"
                        })) : (strColor = options.colors[4], strText = options.verdicts[4], $(ctlBar)
                        .css({
                            width: "80%"
                        })), $(ctlBar)
                    .css({
                        backgroundColor: strColor
                    }), $(ctlText)
                    .html("<span style='color: " + strColor + ";'>" + strText + "</span>")
            },
            checkPassword: function(password, options) {
                {
                    var intScore = 0;
                    options.verdicts[0]
                }
                return password.length < options.minchar ? intScore -= 100 : password.length >= options.minchar && password.length <= options.minchar + 2 ? intScore += 6 : password.length >= options.minchar + 3 && password.length <= options.minchar + 4 ? intScore += 12 : password.length >= options.minchar + 5 && (intScore += 18), password.match(/[a-z]/) && (intScore += 1), password.match(/[A-Z]/) && (intScore += 5), password.match(/\d+/) && (intScore += 5), password.match(/(.*[0-9].*[0-9].*[0-9])/) && (intScore += 7), password.match(/.[!,@,#,$,%,^,&,*,?,_,~]/) && (intScore += 5), password.match(/(.*[!,@,#,$,%,^,&,*,?,_,~].*[!,@,#,$,%,^,&,*,?,_,~])/) && (intScore += 7), password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/) && (intScore += 2), password.match(/([a-zA-Z])/) && password.match(/([0-9])/) && (intScore += 3), password.match(/([a-zA-Z0-9].*[!,@,#,$,%,^,&,*,?,_,~])|([!,@,#,$,%,^,&,*,?,_,~].*[a-zA-Z0-9])/) && (intScore += 3), intScore
            }
        })
    }(jQuery), ImageErrorHandler = function(object) {
        "use strict";
        return "object" != typeof object ? !1 : object.hasOwnProperty("selector") || "" == object.selector ? object.hasOwnProperty("replace") || "" == object.replace ? void $(function() {
            $(object.selector)
                .on("error", function(event) {
                    $(this)
                        .hide()
                        .attr("src", object.replace)
                        .fadeIn()
                        .unbind("error"), "function" == typeof object.callback && object.callback(), Log({
                            type: "error",
                            level: 0,
                            message: event
                        })
                })
        }) : (Log({
            type: "error",
            level: 0,
            message: "object.replace not set"
        }), !1) : (Log({
            type: "error",
            level: 0,
            message: "object.selector not set"
        }), !1)
    }(function(root, undefined) {
        function isString(obj) {
            return !!("" === obj || obj && obj.charCodeAt && obj.substr)
        }

        function isArray(obj) {
            return nativeIsArray ? nativeIsArray(obj) : "[object Array]" === toString.call(obj)
        }

        function isObject(obj) {
            return obj && "[object Object]" === toString.call(obj)
        }

        function defaults(object, defs) {
            var key;
            object = object || {}, defs = defs || {};
            for (key in defs) defs.hasOwnProperty(key) && null == object[key] && (object[key] = defs[key]);
            return object
        }

        function map(obj, iterator, context) {
            var i, j, results = [];
            if (!obj) return results;
            if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
            for (i = 0, j = obj.length; j > i; i++) results[i] = iterator.call(context, obj[i], i, obj);
            return results
        }

        function checkPrecision(val, base) {
            return val = Math.round(Math.abs(val)), isNaN(val) ? base : val
        }

        function checkCurrencyFormat(format) {
            var defaults = lib.settings.currency.format;
            return "function" == typeof format && (format = format()), isString(format) && format.match("%v") ? {
                pos: format,
                neg: format.replace("-", "")
                    .replace("%v", "-%v"),
                zero: format
            } : format && format.pos && format.pos.match("%v") ? format : isString(defaults) ? lib.settings.currency.format = {
                pos: defaults,
                neg: defaults.replace("%v", "-%v"),
                zero: defaults
            } : defaults
        }
        var lib = {};
        lib.version = "0.4.1", lib.settings = {
            currency: {
                symbol: "$",
                format: "%s%v",
                decimal: ".",
                thousand: ",",
                precision: 2,
                grouping: 3
            },
            number: {
                precision: 0,
                grouping: 3,
                thousand: ",",
                decimal: "."
            }
        };
        var nativeMap = Array.prototype.map,
            nativeIsArray = Array.isArray,
            toString = Object.prototype.toString,
            unformat = lib.unformat = lib.parse = function(value, decimal) {
                if (isArray(value)) return map(value, function(val) {
                    return unformat(val, decimal)
                });
                if (value = value || 0, "number" == typeof value) return value;
                decimal = decimal || lib.settings.number.decimal;
                var regex = new RegExp("[^0-9-" + decimal + "]", ["g"]),
                    unformatted = parseFloat(("" + value)
                        .replace(/\((.*)\)/, "-$1")
                        .replace(regex, "")
                        .replace(decimal, "."));
                return isNaN(unformatted) ? 0 : unformatted
            },
            toFixed = lib.toFixed = function(value, precision) {
                precision = checkPrecision(precision, lib.settings.number.precision);
                var power = Math.pow(10, precision);
                return (Math.round(lib.unformat(value) * power) / power)
                    .toFixed(precision)
            },
            formatNumber = lib.formatNumber = lib.format = function(number, precision, thousand, decimal) {
                if (isArray(number)) return map(number, function(val) {
                    return formatNumber(val, precision, thousand, decimal)
                });
                number = unformat(number);
                var opts = defaults(isObject(precision) ? precision : {
                        precision: precision,
                        thousand: thousand,
                        decimal: decimal
                    }, lib.settings.number),
                    usePrecision = checkPrecision(opts.precision),
                    negative = 0 > number ? "-" : "",
                    base = parseInt(toFixed(Math.abs(number || 0), usePrecision), 10) + "",
                    mod = base.length > 3 ? base.length % 3 : 0;
                return negative + (mod ? base.substr(0, mod) + opts.thousand : "") + base.substr(mod)
                    .replace(/(\d{3})(?=\d)/g, "$1" + opts.thousand) + (usePrecision ? opts.decimal + toFixed(Math.abs(number), usePrecision)
                        .split(".")[1] : "")
            },
            formatMoney = lib.formatMoney = function(number, symbol, precision, thousand, decimal, format) {
                if (isArray(number)) return map(number, function(val) {
                    return formatMoney(val, symbol, precision, thousand, decimal, format)
                });
                number = unformat(number);
                var opts = defaults(isObject(symbol) ? symbol : {
                        symbol: symbol,
                        precision: precision,
                        thousand: thousand,
                        decimal: decimal,
                        format: format
                    }, lib.settings.currency),
                    formats = checkCurrencyFormat(opts.format),
                    useFormat = number > 0 ? formats.pos : 0 > number ? formats.neg : formats.zero;
                return useFormat.replace("%s", opts.symbol)
                    .replace("%v", formatNumber(Math.abs(number), checkPrecision(opts.precision), opts.thousand, opts.decimal))
            };
        lib.formatColumn = function(list, symbol, precision, thousand, decimal, format) {
            if (!list) return [];
            var opts = defaults(isObject(symbol) ? symbol : {
                    symbol: symbol,
                    precision: precision,
                    thousand: thousand,
                    decimal: decimal,
                    format: format
                }, lib.settings.currency),
                formats = checkCurrencyFormat(opts.format),
                padAfterSymbol = formats.pos.indexOf("%s") < formats.pos.indexOf("%v") ? !0 : !1,
                maxLength = 0,
                formatted = map(list, function(val) {
                    if (isArray(val)) return lib.formatColumn(val, opts);
                    val = unformat(val);
                    var useFormat = val > 0 ? formats.pos : 0 > val ? formats.neg : formats.zero,
                        fVal = useFormat.replace("%s", opts.symbol)
                        .replace("%v", formatNumber(Math.abs(val), checkPrecision(opts.precision), opts.thousand, opts.decimal));
                    return fVal.length > maxLength && (maxLength = fVal.length), fVal
                });
            return map(formatted, function(val) {
                return isString(val) && val.length < maxLength ? padAfterSymbol ? val.replace(opts.symbol, opts.symbol + new Array(maxLength - val.length + 1)
                        .join(" ")) : new Array(maxLength - val.length + 1)
                    .join(" ") + val : val
            })
        }, "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = lib), exports.accounting = lib) : "function" == typeof define && define.amd ? define([], function() {
            return lib
        }) : (lib.noConflict = function(oldAccounting) {
            return function() {
                return root.accounting = oldAccounting, lib.noConflict = undefined, lib
            }
        }(root.accounting), root.accounting = lib)
    }(this));
var Slider = function(element, options) {
    var self = this;
    if (element || Log({
            level: 4,
            message: "Slider: Element " + element + " not found",
            type: "error"
        }), this.options = {
            orientation: "horizontal",
            intervalTime: 5e3,
            transitionTime: 1,
            pagerSteps: 1,
            startPosition: 0,
            auto: !0,
            autoDirection: "next",
            pauseOnHover: !0,
            showControls: !0,
            height: null,
            width: null,
            wrapper: ".slider-wrapper",
            productcarousel: !1,
            animation: "slide",
            initPrudsysEvent: !0,
            halfslider: !1,
            contentSlider: !1
        }, void 0 !== options)
        for (var i in options) this.options.hasOwnProperty(i) && (this.options[i] = options[i]);
    self.init(element)
};
Slider.prototype = {
        init: function(element) {
            var loadFn, self = this;
            this.element = $(element), this.prudsysProductData = (this.element.data("prudsys-products") || "") + "", this.prudsysProductArray = this.prudsysProductData.length <= 0 ? [] : this.prudsysProductData.split(","), this.wrapper = $(this.options.wrapper, this.element), this.imgs = this.element.find("img"), this.imgHeight = this.imgs.eq(0)
                .height(), this.imgWidth = this.imgs.eq(0)
                .width(), this.intervalWrapper = void 0, this.imgs.eq(0)
                .length > 0 && (loadFn = function() {
                        if (self.itemCount = self.getSliderItemCount(), self.stageWidth = self.getRealStageWidth(), "fade" === self.options.animation) self.hideOtherSlides(), self.stageHeight = self.options.height, self.element.addClass("slider-component-fade"), self.element.height(self.stageHeight), self.setMaxSteps(Math.ceil(self.itemCount * self.getItemHeight() / self.options.height)), self.setCurrentStep(1), self.fade(), self.options.showControls && self.appendControls(), self.options.pauseOnHover && self.pauseOnHover();
                        else {
                            if (self.stageHeight = self.getRealStageHeight(), self.options.height ? (self.element.addClass("slider-component-vertical"), self.setMaxSteps(self.itemCount / Math.floor(self.stageHeight / self.getItemHeight()) === 1 ? 1 : Math.ceil(self.itemCount / self.options.pagerSteps)), self.setPagingDimension()) : (self.setDimensions(), self.setPagingDimension(), self.setMaxSteps(self.isOrientationVertical() ? Math.ceil(self.itemCount * self.getItemHeight() / self.getRealStageHeight()) : self.options.halfslider ? self.itemCount : Math.ceil(self.itemCount * self.getItemWidth() / self.options.width))), self.setCurrentStep(1), self.setTransistionTime(self.options.transitionTime), self.options.showControls && self.appendControls(), self.options.startPosition > 0 && self.options.startPosition < self.imgs.length - 1) {
                                "VIDEO" === self.imgs.eq(self.options.startPosition)
                                    .data("product-media-type") && self.options.startPosition++;
                                for (var i = 0, l = self.options.startPosition; l > i; i++) self.next()
                            }
                            self.options.auto && (self.setAutoDirection(self.options.autoDirection), self.startAutoPlay()), self.options.pauseOnHover && self.pauseOnHover()
                        }
                    }, self.options.contentSlider || (this.imgs.eq(0)
                        .attr("height") || "")
                    .length > 0 ? loadFn() : this.imgs.eq(0)
                    .on("load", loadFn), this.sendPrudsysRecommitEvent(this.options.initPrudsysEvent)), this.sendPrudsysRecommitEvent(this.options.initPrudsysEvent)
        },
        getOrderNumbersFromView: function() {
            var i, l, pagerSteps = this.options.pagerSteps,
                currentStep = this.getCurrentStep(),
                maxSteps = this.getMaxSteps(),
                startAtIndex = (currentStep - 1) * pagerSteps,
                pArray = this.prudsysProductArray,
                totalItems = this.getSliderItemCount(),
                dataString = "";
            for (currentStep === maxSteps && totalItems > pagerSteps ? startAtIndex = totalItems - pagerSteps : pagerSteps > totalItems && (pagerSteps = totalItems), i = startAtIndex, l = startAtIndex + pagerSteps; l > i; i++) dataString += pArray[i] + ",";
            return dataString
        },
        sendPrudsysRecommitEvent: function(init) {
            var prudsysData = this.prudsysProductArray.length > 0 ? this.getOrderNumbersFromView() : null;
            !init && prudsysData ? shop.prudsysTracking.send(prudsysData) : init && prudsysData && shop.prudsysTracking.add(prudsysData)
        },
        appendControls: function() {
            if (1 == this.getMaxSteps()) return !1;
            if (this.element.prepend('<a href="#prev" class="js-slider-prev slider-controls prev hide"></a><a href="#next" class="js-slider-next slider-controls next"></a>'), "fade" === this.options.animation && this.element.find(".js-slider-prev")
                .removeClass("hide"), $(".js-slider-prev", this.element)
                .on("click.slider", function(self) {
                    return function(event) {
                        event.preventDefault(), self.prev()
                    }
                }(this)), $(".js-slider-next", this.element)
                .on("click.slider", function(self) {
                    return function(event) {
                        event.preventDefault(), self.next()
                    }
                }(this)), shop.device.hasTouch) {
                var touchConfObj = {
                        swipe_velocity: .2
                    },
                    gestures = "";
                this.isOrientationVertical() ? (gestures = "dragup dragdown dragend swipeup swipedown", this.element.hammer(touchConfObj)
                    .off(gestures), this.element.hammer(touchConfObj)
                    .on(gestures, function(self) {
                        return function(event) {
                            event.gesture.stopPropagation(), event.gesture.preventDefault(), "dragend" === event.type && (event.gesture.deltaY >= 20 ? self.prev() : event.gesture.deltaY <= -20 && self.next())
                        }
                    }(this))) : (gestures = "dragleft dragright dragend swipeleft swiperight", this.element.hammer(touchConfObj)
                    .off(gestures), this.element.hammer(touchConfObj)
                    .on(gestures, function(self) {
                        return function(event) {
                            event.gesture.stopPropagation(), event.gesture.preventDefault(), "dragend" === event.type && (event.gesture.deltaX >= 20 ? self.prev() : event.gesture.deltaX <= -20 && self.next())
                        }
                    }(this)))
            }
        },
        _showOrHideControls: function() {
            var _currentStep = this.getCurrentStep(),
                _maxSteps = this.getMaxSteps(),
                $next = $(".next", this.element),
                $prev = $(".prev", this.element),
                $controlls = $next.add($prev);
            this.options.showControls && _currentStep !== _maxSteps ? 0 === _currentStep || 1 === _currentStep ? ($prev.addClass("hide"), $next.removeClass("hide")) : _currentStep >= 2 && ($prev.removeClass("hide"), $next.removeClass("hide")) : this.options.showControls && _currentStep === _maxSteps ? ($next.addClass("hide"), $prev.removeClass("hide")) : this.options.showControls || $controlls.addClass("hide")
        },
        next: function() {
            var _currentStep = this.getCurrentStep(),
                _maxSteps = this.getMaxSteps(),
                _leftoverItem = this.getSliderItemCount() % this.options.pagerSteps,
                _nextStep = _currentStep + 1 > this.getMaxSteps() ? 1 : _currentStep + 1,
                _fadeInterval = 800,
                _self = this.element;
            if ("fade" === this.options.animation) $(".slider-item:nth-child(" + _currentStep + ")", this.element)
                .stop(!1, !0)
                .removeClass("fadein"), $(".slider-item:nth-child(" + _nextStep + ")", this.element)
                .stop(!1, !0)
                .addClass("fadein")
                .fadeIn(_fadeInterval, function() {
                    $(".slider-item:nth-child(" + _currentStep + ")", _self)
                        .stop(!1, !0)
                        .hide()
                }), this.setCurrentStep(_nextStep);
            else {
                if (_maxSteps > _currentStep) {
                    if (this.isProductCarousel())
                        if (this.isOrientationVertical() || this.getCurrentStep() !== parseInt(_maxSteps - 1, 10) || 0 === _leftoverItem)
                            if (this.isProductCarousel() && this.getCurrentStep() === parseInt(_maxSteps - 1, 10) && 0 !== _leftoverItem) this.wrapper.css(this.getAnimationProperty(), "-" + parseInt(parseInt(_currentStep - 1, 10) * this.getPagingDimensions() + _leftoverItem * this.getItemHeight(), 10) + "px");
                            else if (this.isOrientationVertical() && this.getCurrentStep() === parseInt(_maxSteps - 1, 10)) {
                        var calculateHeight = Math.abs(_currentStep * this.getPagingDimensions() - this.options.pagerSteps * this.getItemHeight()) + _leftoverItem * this.getItemHeight();
                        this.wrapper.css(this.getAnimationProperty(), "-" + parseInt(calculateHeight, 10) + "px")
                    } else this.options.halfslider ? this.wrapper.css(this.getAnimationProperty(), "-" + parseInt(_currentStep * this.getItemWidth() - this.getItemWidth() / 2, 10) + "px") : this.wrapper.css(this.getAnimationProperty(), "-" + parseInt(_currentStep * this.getPagingDimensions(), 10) + "px");
                    else this.options.halfslider ? this.wrapper.css(this.getAnimationProperty(), "-" + parseInt((parseInt(_currentStep - 1, 10) * this.getPagingDimensions() + _leftoverItem * this.getItemWidth()) / 2, 10) + "px") : this.wrapper.css(this.getAnimationProperty(), "-" + parseInt(parseInt(_currentStep - 1, 10) * this.getPagingDimensions() + _leftoverItem * this.getItemWidth(), 10) + "px");
                    else {
                        var _pagingDimension = _currentStep * this.getItemHeight() * this.options.pagerSteps;
                        if (_currentStep + 1 === _maxSteps) {
                            _leftoverItem = 0 === _leftoverItem ? 3 : _leftoverItem;
                            var calculateHeight = _pagingDimension - (this.options.height - _leftoverItem * this.getItemHeight());
                            this.wrapper.css(this.getAnimationProperty(), "-" + parseInt(calculateHeight, 10) + "px")
                        } else this.wrapper.css(this.getAnimationProperty(), "-" + parseInt(_pagingDimension, 10) + "px")
                    }
                    this.setCurrentStep(_currentStep + 1)
                }
                this._showOrHideControls()
            }
            this.sendPrudsysRecommitEvent()
        },
        prev: function() {
            var _currentStep = this.getCurrentStep(),
                _prevStep = 0 >= _currentStep - 1 ? this.getMaxSteps() : _currentStep - 1,
                _fadeInterval = 800,
                _self = this.element;
            "fade" === this.options.animation ? ($(".slider-item:nth-child(" + _currentStep + ")", this.element)
                .stop(!1, !0)
                .removeClass("fadein"), $(".slider-item:nth-child(" + _prevStep + ")", this.element)
                .stop(!1, !0)
                .addClass("fadein")
                .fadeIn(_fadeInterval, function() {
                    $(".slider-item:nth-child(" + _currentStep + ")", _self)
                        .stop(!1, !0)
                        .hide()
                }), this.setCurrentStep(_prevStep)) : (_currentStep - 1 > 0 && (this.options.height ? this.wrapper.css(this.getAnimationProperty(), "-" + parseInt((_currentStep - 2) * this.getItemHeight() * this.options.pagerSteps, 10) + "px") : this.options.halfslider ? this.wrapper.css(this.getAnimationProperty(), +parseInt(-1 * ((_currentStep - 2) * this.getItemWidth() - this.getItemWidth() / 2), 10) + "px") : this.wrapper.css(this.getAnimationProperty(), "-" + parseInt((_currentStep - 2) * this.getPagingDimensions(), 10) + "px"), this.setCurrentStep(_currentStep - 1)), this._showOrHideControls()), this.sendPrudsysRecommitEvent()
        },
        pauseOnHover: function() {
            this.element.on("mouseover.slider", function(self) {
                    return function() {
                        self.stopAutoPlay()
                    }
                }(this))
                .on("mouseleave.slider", {
                    test: this
                }, function(self) {
                    return function() {
                        "fade" === self.options.animation ? self.fade() : self.startAutoPlay()
                    }
                }(this))
        },
        startAutoPlay: function() {
            void 0 === this.intervalWrapper && (this.intervalWrapper = window.setInterval(function(self) {
                return function() {
                    "next" == self.getAutoDirection() && (self.getCurrentStep() < self.getMaxSteps() ? self.next() : self.setAutoDirection("prev")), "prev" == self.getAutoDirection() && (self.getCurrentStep() > 0 && self.prev(), 1 == self.getCurrentStep() && self.setAutoDirection("next"))
                }
            }(this), this.options.intervalTime))
        },
        stopAutoPlay: function() {
            void 0 !== this.intervalWrapper && (this.intervalWrapper = clearInterval(this.intervalWrapper))
        },
        setDimensions: function() {
            var _stageDimension = 0,
                _maxItemHeight = 0;
            if (this.isOrientationVertical()) $(".slider-item", this.element)
                .each(function(_index, _element) {
                    var $_element = $(_element),
                        _elementHeight = $_element.outerHeight();
                    _stageDimension = 0 !== _stageDimension ? parseInt(_stageDimension + _elementHeight, 10) : _elementHeight, _maxItemHeight = _elementHeight > _maxItemHeight ? _elementHeight : _maxItemHeight
                }), this.stageDimension = _stageDimension, this.isProductCarousel() ? (this.element.addClass("slider-component-vertical")
                    .height(this.itemCount <= this.options.pagerSteps ? this.getItemHeight() * this.itemCount : this.getItemHeight() * this.options.pagerSteps), this.wrapper.height(this.stageDimension + "px"), this.wrapper.width(this.getItemWidth() + "px"), this.wrapper.css(this.getAnimationProperty(), "-0px")) : (this.wrapper.height(this.getRealStageWidth() + "px"), this.element.addClass("slider-component-vertical")
                    .height(_maxItemHeight + "px"));
            else {
                var _elementWidth = this.options.width ? this.options.width : this.element.width();
                $(".slider-item", this.element)
                    .width(_elementWidth / this.options.pagerSteps + "px")
                    .each(function(_index, _element) {
                        _stageDimension = 0 !== _stageDimension ? parseInt(_stageDimension + $(_element)
                                .outerWidth(), 10) : $(_element)
                            .outerWidth(), _maxItemHeight = $(_element)
                            .outerHeight() > _maxItemHeight ? $(_element)
                            .outerHeight() : _maxItemHeight
                    }), this._stageDimension = _stageDimension, this.wrapper.width(_elementWidth / this.options.pagerSteps * this.itemCount + "px"), this.element.height(_maxItemHeight + "px"), this.options.halfslider ? this.wrapper.css(this.getAnimationProperty(), this.getItemWidth() / 2 + "px") : this.wrapper.css(this.getAnimationProperty(), "-0px")
            }
        },
        setPagingDimension: function() {
            this.options.height ? this.pagingDimension = this.isOrientationVertical() ? this.options.height : parseInt(this.getItemHeight(), 10) : (this.pagingDimension = parseInt(this.options.pagerSteps * this.getItemWidth(), 10), this.isOrientationVertical() && (this.pagingDimension = parseInt(this.options.pagerSteps * this.getItemHeight(), 10)))
        },
        fade: function() {
            void 0 === this.intervalWrapper && (this.intervalWrapper = window.setInterval(function(self) {
                return function() {
                    self.next()
                }
            }(this), this.options.intervalTime))
        },
        setCurrentStep: function(step) {
            this.element.attr("data-slider-current", parseInt(step, 10))
        },
        setMaxSteps: function(steps) {
            this.element.attr("data-slider-max", parseInt(steps, 10))
        },
        setAutoDirection: function(direction) {
            return this.element.attr("data-slider-direction", direction) ? !0 : !1
        },
        setTransistionTime: function(time) {
            return this.wrapper.css("transitionDuration", time + "s") ? !0 : !1
        },
        getCurrentStep: function() {
            return parseInt(this.element.attr("data-slider-current"), 10)
        },
        getMaxSteps: function() {
            return parseInt(this.element.attr("data-slider-max"), 10)
        },
        getAutoDirection: function() {
            return this.element.attr("data-slider-direction")
        },
        getAnimationProperty: function() {
            return this.isOrientationVertical() ? "top" : "left"
        },
        getOrientation: function() {
            return this.options.orientation
        },
        getSliderItemCount: function() {
            return parseInt($(".slider-item", this.element)
                .length, 10)
        },
        getRealStageWidth: function() {
            return parseInt(this.element.width(), 10)
        },
        getRealStageHeight: function() {
            return parseInt(this.element.height(), 10)
        },
        getPagingDimensions: function() {
            return parseInt(this.pagingDimension, 10)
        },
        getItemHeight: function() {
            return parseInt($(".slider-item", this.element)
                .outerHeight(), 10)
        },
        getWrapperHeight: function() {
            return parseInt($(this.wrapper, this.element)
                .outerHeight(), 10)
        },
        getItemWidth: function() {
            return parseInt($(".slider-item", this.element)
                .outerWidth(), 10)
        },
        isOrientationVertical: function() {
            return "vertical" === this.getOrientation() ? !0 : !1
        },
        isProductCarousel: function() {
            return this.options.productcarousel
        },
        remove: function() {
            this.element.find(".slider-controls")
                .remove(), this.element.find(".slider-component-vertical")
                .removeClass("slider-component-vertical"), this.wrapper.css("top", 0)
        },
        hideOtherSlides: function() {
            $(".slider-item", this.element)
                .each(function(_index, _element) {
                    _index > 0 && $(_element)
                        .hide()
                })
        },
        updateSlider: function(options) {
            if (void 0 !== options)
                for (var i in options) this.options.hasOwnProperty(i) && (this.options[i] = options[i]);
            $(".slider-item", this.element)
                .width(this.options.width / this.options.pagerSteps + "px"), this.setPagingDimension(), this.setMaxSteps(Math.ceil(this.itemCount * this.getItemWidth() / this.options.width)), this.wrapper.width(this.options.width / this.options.pagerSteps * this.itemCount + "px"), this.setCurrentStep(1), this.wrapper.css(this.getAnimationProperty(), "0px"), this._showOrHideControls()
        }
    }, $(function() {
        var $contentSlider = $("#content-slider"),
            $contentSliderLI = $contentSlider.find("ul > li"),
            $contentSliderFirstImg = $contentSlider.find("img")
            .eq(0),
            contentSliderHeight = 400;
        $contentSlider.height(contentSliderHeight), $contentSliderLI.length > 1 ? ($contentSlider.find("ul > li:not(:first-child)")
            .hide(), ($contentSliderFirstImg.length || 0) > 0 && $contentSliderFirstImg.attr("src", $contentSliderFirstImg.attr("src") + "?" + (new Date)
                .getTime()), $contentSliderFirstImg.load(function() {
                if ("1" !== $contentSlider.data("sliderEnabled")) {
                    {
                        new Slider($contentSlider, {
                            width: "960",
                            height: $contentSliderFirstImg.height() || contentSliderHeight,
                            animation: "fade",
                            contentSlider: !0
                        })
                    }
                    $contentSlider.data("sliderEnabled", "1")
                }
            })) : 1 === $contentSliderLI.length ? ($contentSlider.find("ul")
            .css("position", "static"), $contentSliderFirstImg.load(function() {
                $contentSlider.height($contentSliderFirstImg.height())
            })) : $contentSlider.remove()
    }),
    function() {
        Overlay = function(element, options, callback) {
            if (this.element = "" !== element || null != element ? $(element) : "", this.options = {
                    event: this.element.attr("data-overlay-event") ? this.element.attr("data-overlay-event") : "click",
                    src: this.element.attr(this.element.attr("data-overlay-src") ? "data-overlay-src" : "href"),
                    content: this.element.attr("data-overlay-content") ? this.element.attr("data-overlay-content") : "Keine Content ausgewГ¤hlt",
                    height: parseInt(this.element.attr("data-overlay-height"), 10) > 0 ? parseInt(this.element.attr("data-overlay-height"), 10) : 200,
                    width: parseInt(this.element.attr("data-overlay-width"), 10) > 0 ? parseInt(this.element.attr("data-overlay-width"), 10) : 200,
                    type: this.element.attr("data-overlay-type") ? this.element.attr("data-overlay-type") : "div",
                    title: this.element.attr(this.element.attr("data-overlay-title") ? "data-overlay-title" : "title"),
                    confirm: this.element.attr("data-overlay-confirm") ? this.element.attr("data-overlay-confirm") : !1,
                    timeout: !1,
                    "class": "js-has-element",
                    styleClass: "overlay-standard",
                    closeAlways: !0,
                    header: !0,
                    showGlobalMessages: !1
                }, this.callback = callback || null, this.topPos = parseInt(this.options.height / 2.5, 10), void 0 !== options)
                for (var i in options) options.hasOwnProperty(i) && (this.options[i] = options[i]);
            return this.element.on(this.options.event, {
                self: this
            }, function(event) {
                event.data.self.options.closeAlways === !0 && event.preventDefault(), event.stopPropagation();
                var self = event.data.self;
                Log({
                    level: 1,
                    message: "Overlay: open",
                    type: "info"
                }), self.wrap()
            }), this
        }, Overlay.prototype = {
            showGlobalOverlayMessage: function() {
                $(".global-overlay-messages")
                    .removeClass("hidden")
            },
            hideGlobalOverlayMessage: function() {
                $(".global-overlay-messages")
                    .addClass("hidden")
            },
            executeCallback: function() {
                $.isFunction(this.callback) && this.callback(this)
            },
            setTopPos: function(pos) {
                $overlayContainer = $(".overlay-container"), this.topPos = pos, $overlayContainer.css("margin-top", "-" + this.topPos + "px")
            },
            bindCloseEvent: function() {
                var closeClass = ".js-overlay-close",
                    self = this,
                    $overlayWrapper = $(".overlay-background");
                this.options.timeout && setTimeout(function() {
                        self.close()
                    }, 3e3), $overlayWrapper.hammer()
                    .on("touch click", {
                        self: this
                    }, function(event) {
                        var self = event.data.self,
                            $target = $(event.target);
                        (0 === $target.closest(".overlay-container")
                            .length || $target.closest(closeClass)
                            .length > 0) && (shop.device.hasTouch ? event.gesture.preventDefault() : event.preventDefault(), self.close())
                    }), $overlayWrapper.add(".overlay-container")
                    .each(function() {
                        $(this)
                            .init.prototype.close = function() {
                                self.close()
                            }, $(this)
                            .init.prototype.showGlobalMessage = function() {
                                self.showGlobalOverlayMessage()
                            }, $(this)
                            .init.prototype.hideGlobalMessage = function() {
                                self.hideGlobalOverlayMessage()
                            }
                    })
            },
            bindResizeEvent: function() {
                var $overlayer = $(".overlay-container"),
                    self = this,
                    positionTopClass = "position-top";
                $(window)
                    .on("resize", function() {
                        var overlayerHeight = $overlayer.height(),
                            deathZone = 50,
                            innerWindowHeight = window.innerHeight - deathZone,
                            $overlayContainer = $(".overlay-container");
                        overlayerHeight >= innerWindowHeight || shop.device.isMobile ? $overlayer.addClass(positionTopClass)
                            .css("margin-top", "0") : $overlayer.hasClass(positionTopClass) && ($overlayer.removeClass(positionTopClass), self.setTopPos($overlayContainer.height() / 2.5))
                    })
            },
            close: function() {
                Log({
                        level: 1,
                        message: "Overlay: CLOSE",
                        type: "info"
                    }), $("body")
                    .removeClass("js-has-overlay"), $(".overlay-background")
                    .remove()
            },
            wrap: function() {
                var $overlayContainer, _html = this.buildBackground(),
                    self = this,
                    $body = $("body");
                "div" === this.options.type && (Log({
                        level: 1,
                        message: "Overlay: WRAP | div",
                        type: "info"
                    }), _html = _html.replace("{{replace}}", this.buildDivContainer())), "iframe" === this.options.type && (Log({
                        level: 1,
                        message: "Overlay: WRAP | iframe",
                        type: "info"
                    }), _html = _html.replace("{{replace}}", this.buildIframeContainer())), $body.addClass("js-has-overlay")
                    .append(_html), $overlayContainer = $(".overlay-container"), $overlayContainer.find("iframe")
                    .load(function() {
                        var $body = $("body");
                        $body.scrollTop($body.scrollTop() - 1)
                            .scrollTop($body.scrollTop() + 1)
                    }), this.setTopPos($overlayContainer.height() / 2.5), setTimeout(function() {
                        self.setTopPos($overlayContainer.height() / 2.5)
                    }, 25), this.bindCloseEvent(), this.bindResizeEvent(), this.executeCallback()
            },
            show: this.wrap,
            buildBackground: function() {
                var withConfirmBtn = this.options.confirm === !0 ? '<div class="overlay-btn-container p-t-m p-b-m"><a class="overlay-confirm js-overlay-close btn radius-m gradient-grey">OK</a></div>' : "",
                    documentHeight = $(document)
                    .height(),
                    windowHeight = $(window)
                    .height(),
                    windowWidth = $(window)
                    .width(),
                    containerHeight = this.options.height > windowHeight ? windowHeight : this.options.height,
                    containerWidth = this.options.width > windowWidth ? windowWidth : this.options.width,
                    getGlobalMessageHTML = function(show) {
                        return '<div class="global-overlay-messages' + (show ? "" : " hidden") + '">' + $("#global-messages")
                            .html() + "</div>"
                    },
                    withHeader = this.options.header === !0 ? '<div class="overlay-header"><strong class="overlay-headline">' + (this.options.title ? this.options.title.replace("|", "") : "") + '</strong><a href="#close" class="overlay-close js-overlay-close"><i class="fa fa-times"></i></a></div>' : "";
                return '<div class="overlay-background overlay-type-' + this.options.type + " " + this.options.styleClass + '" style="height:' + (windowHeight > documentHeight ? windowHeight : documentHeight) + 'px"><div class="overlay-container" style="width:' + containerWidth + "px; margin-left:-" + parseInt(containerWidth / 2, 10) + 'px">' + withHeader + '<div class="overlay-content" style="max-height:' + parseInt(containerHeight - $(".overlay-header")
                    .height(), 10) + "px" + ("webkit" === shop.device.browserEngine && shop.device.hasTouch ? '; overflow:auto; -webkit-overflow-scrolling: touch">' : '">') + '<div class="overlay-content-container">' + getGlobalMessageHTML(this.options.showGlobalMessages) + "{{replace}}</div>" + withConfirmBtn + "</div></div></div>"
            },
            buildDivContainer: function() {
                return $(this.options.content)
                    .html()
            },
            buildIframeContainer: function() {
                var windowHeight = $(window)
                    .height(),
                    windowWidth = $(window)
                    .width(),
                    containerHeight = this.options.height > windowHeight ? windowHeight : this.options.height,
                    containerWidth = this.options.width > windowWidth ? windowWidth : this.options.width;
                return '<iframe height="' + containerHeight + '" width="' + containerWidth + '" style="height:' + containerHeight + "px; width:" + containerWidth + "px; width:" + containerWidth + 'px" src="' + this.options.src + '"></iframe>'
            }
        }
    }(), $(function() {
        "use strict";
        $(document)
            .on("createOverlay", function() {
                var overlaySelector = ".overlay",
                    $overlayElems = $(overlaySelector),
                    overlayElemsCounter = $overlayElems.length || 0;
                overlayElemsCounter > 0 && (shop.overlays = {}, $.each($overlayElems, function() {
                    var overlayObjCounter = shop.overlays.length || 0;
                    shop.overlays["anchorOverlay" + (overlayObjCounter + 1)] = new Overlay($(this))
                }))
            }), $(document)
            .trigger("createOverlay")
    }),
    function($) {
        "use strict";
        $(document)
            .ready(function() {
                "msie" == $.ua.browser.name && $.ua.browser.version < 10 && $("[placeholder]")
                    .focus(function() {
                        var i = $(this);
                        i.val() === i.attr("placeholder") && i.val("")
                            .removeClass("placeholder")
                    })
                    .blur(function() {
                        var i = $(this);
                        ("" === i.val() || i.val() === i.attr("placeholder")) && i.addClass("placeholder")
                            .val(i.attr("placeholder"))
                    })
                    .blur()
                    .parents("form")
                    .submit(function() {
                        $(this)
                            .find("[placeholder]")
                            .each(function() {
                                var i = $(this);
                                i.val() === i.attr("placeholder") && i.val("")
                            })
                    })
            })
    }(jQuery);
var LoaderOverlay = function($) {
        "use strict";
        var LoaderOverlay = function($targetElement, isSimpleLoader) {
            this.$targetElement = $($targetElement || $("body")), this.targetElementPosition = "body" === this.$targetElement.prop("tagName")
                .toLowerCase() ? "fixed" : "absolute", this._classNameForTarget = "loader-overlay", this.cssClass = {
                    load: "on-load",
                    loadReady: "load-ready"
                }, console.log("create"), this._create(isSimpleLoader)
        };
        return LoaderOverlay.prototype = {
            _create: function(isSimpleLoader) {
                if (this.$targetElement.length > 0 && !this.$targetElement.hasClass(this._classNameForTarget)) {
                    var windowHeight = $(window)
                        .height(),
                        self = this,
                        targetElementHeight = "fixed" === this.targetElementPosition && windowHeight > this.$targetElement.height() ? windowHeight : this.$targetElement.height(),
                        loaderOverlayHtml = '<div class="loader-overlay-bg' + (isSimpleLoader === !0 ? "-simple" : "") + ' js" style="height:' + targetElementHeight + 'px"><span class="loader-container" style="position: ' + this.targetElementPosition + ' "><i class="fa fa-spinner fa-spin loader"></i></span></div>';
                    this.$targetElement.append(loaderOverlayHtml), this.$targetElement.addClass(this._classNameForTarget), $(window)
                        .load(function() {
                            self._refreshBgHeight()
                        })
                }
            },
            _refreshBgHeight: function() {
                var windowHeight = $(window)
                    .height(),
                    targetElementHeight = "fixed" === this.targetElementPosition && windowHeight > this.$targetElement.outerHeight() ? windowHeight : this.$targetElement.outerHeight();
                this.$targetElement.find(".loader-overlay-bg, .loader-overlay-bg-simple")
                    .css({
                        height: targetElementHeight
                    })
            },
            hide: function() {
                return this.$targetElement.hasClass(this._classNameForTarget) && (this._refreshBgHeight(), this.$targetElement.find(".loader-overlay-bg, .loader-overlay-bg-simple")
                    .addClass("loader-hide")
                    .removeClass("loader-show")), this
            },
            show: function() {
                return this.$targetElement.hasClass(this._classNameForTarget) ? (this._refreshBgHeight(), this.$targetElement.addClass(this.cssClass.load), this.$targetElement.find(".loader-overlay-bg, .loader-overlay-bg-simple")
                    .addClass("loader-show")
                    .removeClass("loader-hide")) : this._createLoader(), this
            },
            remove: function() {
                this.$targetElement.removeClass(this._classNameForTarget + " " + this.cssClass.load)
                    .addClass(this.cssClass.loadReady), this.$targetElement.find(".loader-overlay-bg, .loader-overlay-bg-simple")
                    .remove()
            }
        }, LoaderOverlay
    }(jQuery),
    AjaxForm = function(elemID, callbackAfterAjaxRequest, callbackBeforeAjaxRequest) {
        this.elementName = elemID, this.elemID = "#" + this.elementName, this._eventsWithNamespace = "", this.singleItem = ".ajax-item-js", this.formElement = ".ajax-form-js", this.$globalMessages = $("#global-messages"), this._callbackAfterAjaxRequest = callbackAfterAjaxRequest, this._callbackBeforeAjaxRequest = callbackBeforeAjaxRequest, this.bindEventHandlers($(this.elemID + " " + this.singleItem))
    };
AjaxForm.prototype = {
        handleNewDataController: function(data, $currentElem) {
            var pageMessages = data.messages || null,
                pageMessagesTypeAndTextObj = pageMessages ? pageMessages.conf ? {
                    type: "conf",
                    msg: pageMessages.conf,
                    headline: pageMessages.headlines.conf,
                    confirmBtn: pageMessages.confirmBtn.conf,
                    width: pageMessages.width,
                    height: pageMessages.height
                } : pageMessages.error ? {
                    type: "error",
                    msg: pageMessages.error,
                    headline: pageMessages.headlines.error,
                    confirmBtn: pageMessages.confirmBtn.error,
                    width: pageMessages.width,
                    height: pageMessages.height
                } : pageMessages.info ? {
                    type: "info",
                    msg: pageMessages.info,
                    headline: pageMessages.headlines.info,
                    confirmBtn: pageMessages.confirmBtn.info,
                    width: pageMessages.width,
                    height: pageMessages.height
                } : null : null,
                globalMessages = data.globalMessages || null,
                globalMessagesTypeAndTextObj = globalMessages ? globalMessages.conf ? {
                    type: "conf",
                    msg: globalMessages.conf
                } : globalMessages.error ? {
                    type: "error",
                    msg: globalMessages.error
                } : globalMessages.info ? {
                    type: "info",
                    msg: globalMessages.info
                } : null : null,
                pageTags = null != data.tags && "" !== data.tags ? data.tags : null,
                pageTagsItem = null !== pageTags && null != pageTags.item && "" !== pageTags.item ? pageTags.item : null,
                updateWholeItems = data.tags.updateWholeItems || !1,
                replaceDomIDsObj = data.tags.replaceDomIDs,
                updateShopObject = data.updateShopObject || null,
                $itemContainer = $currentElem.closest(this.singleItem),
                $itemsContainer = $currentElem.closest(this.formElement);
            if (pageTagsItem && (updateWholeItems === !1 ? this.replaceElem($itemContainer, pageTags.item, !1) : this.replaceElem($itemsContainer, pageTags.item, !0), this.bindEventHandlers($(this.elemID + " " + this.singleItem)), window.shop.clearElementOrphans()), updateShopObject)
                for (var prop in updateShopObject) shop.add(prop, updateShopObject[prop]);
            if (this.replaceDomIDs(replaceDomIDsObj), null !== globalMessagesTypeAndTextObj && this.showGlobalMsg(globalMessagesTypeAndTextObj), null !== pageMessagesTypeAndTextObj && this.showMsgLayer(pageMessagesTypeAndTextObj), this._callbackAfterAjaxRequest) {
                var functions = this._callbackAfterAjaxRequest.split(",");
                this.lastRequest = data, this.lastTarget = $currentElem;
                for (var i = 0, l = functions.length; l > i; i++) Function(functions[i])()
            }
        },
        replaceDomIDs: function(objWithDomIDs) {
            if (objWithDomIDs)
                for (var prop in objWithDomIDs) {
                    var newContentForElem = objWithDomIDs[prop],
                        $findDomID = $("#" + prop);
                    $findDomID.length > 0 && newContentForElem.length > 0 && $findDomID.replaceWith(newContentForElem)
                }
        },
        replaceElem: function($target, $newElem, wholeItems) {
            wholeItems === !1 || null == wholeItems ? $target.replaceWith($newElem) : $target.children()
                .remove()
                .end()
                .append($newElem)
        },
        loadNewPageJSON: function(requestURL, parameters) {
            var formMethod = "get" === (parameters.method || "")
                .toLowerCase() ? "GET" : "POST",
                request = $.ajax({
                    url: requestURL,
                    data: parameters,
                    dataType: "json",
                    type: formMethod,
                    async: !0,
                    context: this,
                    beforeSend: function() {
                        if (this._callbackBeforeAjaxRequest)
                            for (var functions = this._callbackBeforeAjaxRequest.split(","), i = 0, l = functions.length; l > i; i++) Function(functions[i])()
                    }
                });
            return request
        },
        showGlobalMsg: function(typeAndMessageObj) {
            var msgText, msgType;
            shop.globalMessage.hide(), msgText = typeAndMessageObj.msg, msgType = typeAndMessageObj.type, "info" === msgType || "conf" === msgType ? shop.globalMessage.success(msgText) : shop.globalMessage.error(msgText)
        },
        showMsgLayer: function(typeAndMessageObj) {
            var msgOverlay, msgOverlayContent = "<div>" + typeAndMessageObj.msg + "</div>",
                msgOverlayStyleType = "overlay-" + typeAndMessageObj.type,
                msgOverlayHeadline = typeAndMessageObj.headline,
                msgOverlayConfirmBtn = typeAndMessageObj.confirmBtn ? typeAndMessageObj.confirmBtn : !1,
                msgOverlayWidth = typeAndMessageObj.width ? typeAndMessageObj.width : 400,
                msgOverlayHeight = typeAndMessageObj.height ? typeAndMessageObj.height : 250,
                msgTimeout = "info" === typeAndMessageObj.type ? !0 : !1;
            msgOverlay = new Overlay("", {
                    title: msgOverlayHeadline,
                    type: "div",
                    styleClass: msgOverlayStyleType,
                    width: msgOverlayWidth,
                    height: msgOverlayHeight,
                    content: msgOverlayContent,
                    confirm: msgOverlayConfirmBtn,
                    timeout: msgTimeout
                })
                .wrap()
        },
        getElementEvents: function(elem) {
            for (var eventsWithNamespaces = "", events = void 0 !== elem.attr("data-events") ? elem.attr("data-events")
                    .split(",") : null, i = 0, l = events.length; l > i; i++) eventsWithNamespaces += events[i] + "." + this.elementName + " ";
            return eventsWithNamespaces
        },
        bindEventHandlers: function(elem) {
            var self = this,
                loaderOverlay = loaderOverlay || new LoaderOverlay;
            $(elem)
                .find(".ajax-item-event-js")
                .not(".has-event-js")
                .each(function() {
                    var $this = $(this),
                        events = self.getElementEvents($this),
                        val = $this.val();
                    val && $this.attr("data-init-value", val), $this.addClass("has-event-js"), $this.off(events)
                        .on(events, function(e) {
                            e.preventDefault(), e.stopPropagation();
                            var requestData, $this = $(this),
                                formURL = $this.closest("form")
                                .attr("action"),
                                formParameters = $this.closest("form")
                                .serializeArray(),
                                initVal = $this.attr("data-init-value");
                            return formParameters.method = $this.closest("form")
                                .attr("method"), shop.globalMessage.hide(), ($this.is('a,button,input[type="submit"]') || initVal !== $this.val()) && (loaderOverlay.show(), self.lastElement = $(this), requestData = self.loadNewPageJSON(formURL, formParameters, $(this)), requestData.done(function(data) {
                                    window.setTimeout(function() {
                                        loaderOverlay.hide()
                                    }, 500), self.handleNewDataController(data, $this)
                                }), requestData.fail(function() {
                                    loaderOverlay.hide()
                                })), !1
                        })
                }), $('input[type="number"]')
                .on("input", function() {
                    $(this)
                        .focus()
                }), $("input.quantity-input")
                .on("input", function() {
                    var $this = $(this);
                    $this.val() < 0 && $this.val("0")
                }), $("input.quantity-input", "html.ie8")
                .on("change", function(e) {
                    var $this = $(this);
                    $this.val() < 0 && (e.preventDefault(), $this.val("0"))
                })
        }
    },
    function($) {
        "use strict";
        var ajaxFormFactory = function(elemSelector) {
            var elem = elemSelector,
                objInShopObj = "ajaxForms";
            $(elem)
                .length > 0 && (shop.add(objInShopObj, {}), $(elem)
                    .each(function(i) {
                        var $this = $(this),
                            id = $this.attr("id") || null,
                            callbackFn = $(this)
                            .attr("data-callbackFn") ? $(this)
                            .attr("data-callbackFn") : null,
                            beforeCallbackFn = $(this)
                            .attr("data-beforeCallbackFn") ? $(this)
                            .attr("data-beforeCallbackFn") : null;
                        if (!id) {
                            var newIDName = "ajaxForm" + i;
                            $this.attr("id", newIDName), id = newIDName
                        }
                        shop[objInShopObj][id] = new AjaxForm($this.attr("id"), callbackFn, beforeCallbackFn)
                    }))
        };
        $(function() {
            ajaxFormFactory(".ajax-form-js")
        })
    }(jQuery);
var AddToCart = function(list, area, productObject) {
    "use strict";
    this.listType = list ? list : "", this.addToWatchlistButtonSelector = ".js-add-to-watchlist", this.areaSelector = area ? area : "", this.productObject = productObject ? productObject : "", this.bindEvents()
};
AddToCart.prototype = {
        handelAjaxRequest: function(requestURL, parameters, doneHandler, failHandler) {
            "use strict";
            var formMethod = "get" === (parameters.method || "")
                .toLowerCase() ? "GET" : "POST";
            $.ajax({
                url: requestURL,
                data: parameters,
                dataType: "json",
                type: formMethod,
                async: !0,
                context: this,
                success: function(data) {
                    doneHandler(data)
                },
                error: function(xhr) {
                    failHandler(xhr.responseText)
                }
            })
        },
        updateMiniCart: function(miniCart) {
            "use strict";
            shop.miniCart && shop.miniCart.add(miniCart, $("#minicart")
                .parent())
        },
        animateAddToCart: function(callbackAfterAnimation) {
            "use strict";
            var $zoomImg = $("#product-image-detail")
                .find("img.js-display-variant-primary-image"),
                $animatedImg = $zoomImg.clone()
                .css({
                    position: "absolute",
                    "z-index": "2000"
                })
                .addClass("js-animate-pds-image"),
                $target = $("#minicart"),
                animation = {
                    step1: {
                        speed: 800
                    },
                    step2: {
                        speed: 600
                    },
                    step3: {
                        speed: 140,
                        width: 30
                    }
                },
                zoomImgLeftOffset = ($target.width() - animation.step3.width) / 2,
                zoomImgOffset = $zoomImg.offset(),
                targetOffset = $target.offset(),
                methodForAnimation = Modernizr.csstransitions ? "transit" : "animate";
            $zoomImg.length > 0 ? ($("html, body")
                .animate({
                    scrollTop: 0
                }, 150), $animatedImg.css({
                    top: zoomImgOffset.top,
                    left: zoomImgOffset.left,
                    width: $zoomImg.width()
                })
                .prependTo("body")[methodForAnimation]({
                    top: targetOffset.top - $target.height(),
                    left: targetOffset.left + zoomImgLeftOffset,
                    width: animation.step3.width
                }, animation.step1.speed, function() {
                    $animatedImg[methodForAnimation]({
                        top: targetOffset.top + 2,
                        opacity: .25
                    }, animation.step2.speed, function() {
                        $animatedImg[methodForAnimation]({
                            opacity: 0
                        }, animation.step3.speed, function() {
                            $animatedImg.remove(), callbackAfterAnimation && "function" == typeof callbackAfterAnimation && callbackAfterAnimation()
                        })
                    })
                })) : callbackAfterAnimation && "function" == typeof callbackAfterAnimation && callbackAfterAnimation()
        },
        showOverlay: function(popup) {
            "use strict";
            var overlayContent = "<div>" + popup.content + "</div>",
                $addToCartSlot = (new Overlay("", {
                        title: popup.headline,
                        type: "div",
                        width: "600",
                        height: "550",
                        content: overlayContent
                    })
                    .wrap(), $(".js-add-to-cart-slot")),
                newSlider = function($elem, optionObj) {
                    return new Slider($elem, optionObj)
                },
                loadSlider = function($elem, callback) {
                    var prudsysItemIdList = shop.prudsysItemIdList || null;
                    return new SimpleComponentLoader($elem, {
                        parameters: {
                            prudsysItemIdList: prudsysItemIdList
                        }
                    }, callback)
                };
            $addToCartSlot.length > 0 && !shop.device.isMobile ? ($addToCartSlot.addClass("active"), loadSlider($addToCartSlot.find(".js-async-carousel"), function() {
                    newSlider($addToCartSlot.find(".pcarousel-smallArticle"), {
                            orientation: "horizontal",
                            pagerSteps: 4,
                            auto: !1,
                            wrapper: ".pcarousel-wrapper",
                            width: "520",
                            productcarousel: !0,
                            initPrudsysEvent: !1
                        }), $(".js-add-to-cart-slot .pcarousel .star-rating")
                        .makeStars()
                })) : $addToCartSlot.addClass("hide"), $(".add-to-cart-content .review-bar-rating ")
                .makeStars()
        },
        showErrorOverlay: function() {
            "use strict"; {
                var overlayMessage = "<div>Es ist ein Fehler aufgetreten.</div>";
                new Overlay("", {
                        title: "Hinweis",
                        type: "div",
                        width: "450",
                        height: "150",
                        content: overlayMessage
                    })
                    .wrap()
            }
        },
        bindEvents: function() {
            "use strict";
            var self = this,
                loaderOverlay = loaderOverlay || new LoaderOverlay,
                buttonSelector = "",
                eventType = "click",
                sizeValidation = !0;
            "cart" === self.listType ? (eventType = "submit", buttonSelector = "#add-to-cart-form") : "watchlist" === self.listType && (buttonSelector = self.addToWatchlistButtonSelector), $(this.areaSelector)
                .on(eventType, buttonSelector, function(e) {
                    e.preventDefault(), e.stopPropagation();
                    var $quantityInput = $("#qty"),
                        quantityVal = $quantityInput.val();
                    if (quantityVal >= 1)
                        if ("cart" === self.listType && (sizeValidation = self.productObject.isSizeVariant(), $(".js-product-size-error")
                                .addClass("hide")), sizeValidation) {
                            var etracker = new eTrackerCommerceAPI;
                            etracker.insertToBasket(etracker.getProductJSON(self.productObject.getVariantIdentifier(), $quantityInput.val()), $quantityInput.val() || 1);
                            var formURL = $(this)
                                .attr("watchlist" === self.listType ? "data-url" : "action"),
                                formParameters = $(this)
                                .closest("form")
                                .serializeArray();
                            formParameters.method = $(this)
                                .attr("method"), loaderOverlay.show(), self.handelAjaxRequest(formURL, formParameters, function(data) {
                                    loaderOverlay.hide(), "cart" === self.listType ? self.animateAddToCart(function() {
                                        self.updateMiniCart(data.miniCart), self.showOverlay(data.addToPopup)
                                    }) : self.showOverlay(data.addToPopup)
                                }, function(data) {
                                    loaderOverlay.hide(), self.showErrorOverlay(data)
                                })
                        } else $(".js-product-size-error")
                            .removeClass("hide");
                    else $quantityInput.val(1);
                    return !1
                })
        }
    },
    function() {
        Cache = function(namespace) {
            return this instanceof Cache ? (this.namespace = namespace, "" === namespace ? (Log({
                level: 4,
                message: "Cache: No Namespace given",
                type: "error"
            }), !1) : this) : new Cache(namespace)
        }, Cache.prototype = {
            save: function(id, value) {
                return this._itemExists(id) ? (Log({
                        level: 4,
                        message: "Cache: Item allready exisits",
                        type: "info"
                    }), !1) : $("body")
                    .append('<script id="' + this._getChecksum(id) + '" type="x-cache">' + value + "</script>") ? this : !1
            },
            load: function(id) {
                return this._itemExists(id) ? this.getCacheElement(id)
                    .html() : !1
            },
            "delete": function(id) {
                return this.getCacheElement(id)
                    .remove() ? this : !1
            },
            getCacheElement: function(id) {
                return $("#" + this._getChecksum(id))
            },
            _getChecksum: function(id) {
                return "js-cache-" + this.namespace + "-" + id
            },
            _itemExists: function(id) {
                return $("#" + this._getChecksum(id))
                    .length > 0 ? !0 : !1
            }
        }
    }(),
    function() {
        Mobile = function() {
            return this instanceof Mobile ? (this.__MOBILE__ = "mobile", this.__TABLET__ = "tablet", this.__LARGE__ = "large", this.__FORCE_COOKIE__ = "force-default-view=true;", this._paramForDesktop = "desktopSwitch=true", this._paramForDeviceDetection = "clear=true", void(this.$deviceSwitchBtn = $("#deviceSwitchBtn"))) : new Mobile
        }, Mobile.prototype = {
            initOnDomReady: function() {
                !shop.device.isMobile && this.getForceDefaultView() ? this.$deviceSwitchBtn.removeClass("hide-desktop")
                    .appendTo("#page-footer") : shop.device.isMobile && this.$deviceSwitchBtn.addClass("btn big gradient-green radius-l"), this.bindEventHandler()
            },
            bindEventHandler: function() {
                var self = this;
                this.$deviceSwitchBtn.on("click", function(e) {
                    e.preventDefault(), self.deviceSwitchController()
                })
            },
            viewport: function(name) {
                var reference, name = name || "",
                    indicator = window.getComputedStyle(document.getElementsByTagName("html")[0], ":before")
                    .content;
                if (console.log("print name: " + window.getComputedStyle(document.getElementsByTagName("html")[0], ":before")
                        .content), 0 === name.length) return reference;
                switch (name.toLowerCase()) {
                    case "mobile":
                        reference = this.__MOBILE__;
                        break;
                    case "tablet":
                        reference = this.__TABLET__;
                        break;
                    case "large":
                        reference = this.__LARGE__
                }
                return indicator !== reference || this.getForceDefaultView() ? !1 : !0
            },
            _getUrlParamToke: function(url) {
                return url.indexOf("?") > 0 ? "&" : "?"
            },
            _getUrl: function() {
                var currentUrl = window.location.href,
                    regexp = new RegExp("(\\?|&)(" + this._paramForDeviceDetection + "|" + this._paramForDesktop + ")", "g");
                return currentUrl = currentUrl.replace(regexp, "")
            },
            _switchToMobile: function() {
                var url = this._getUrl();
                url += this._getUrlParamToke(url) + this._paramForDeviceDetection, this.setForceDefaultView(), window.location.href = url
            },
            _switchToDesktop: function() {
                var url = this._getUrl();
                url += this._getUrlParamToke(url) + this._paramForDesktop, this.setForceDefaultView(), window.location.href = url
            },
            deviceSwitchController: function() {
                shop.device.isMobile ? this._switchToDesktop() : this._switchToMobile()
            },
            removeStyleSheets: function() {
                $("#breakpoint-mobile, #breakpoint-tablet, #breakpoint-large")
                    .each(function() {
                        var $item = $(this);
                        $item.attr("data-href", $item.attr("href"))
                            .attr("href", "")
                    })
            },
            insertStyleSheets: function() {
                $("#breakpoint-mobile, #breakpoint-tablet, #breakpoint-large")
                    .each(function() {
                        var $item = $(this);
                        $item.attr("href", $item.attr("data-href"))
                    })
            },
            getBreakpointColor: function() {
                return $("html")
                    .css("fill") || ""
            },
            setForceDefaultView: function() {
                var expires = new Date;
                return date = expires.getTime() + 432e6, expires.setTime(date), document.cookie = this.__FORCE_COOKIE__ + " expires=" + expires.toGMTString(), this
            },
            getForceDefaultView: function() {
                return -1 !== document.cookie.indexOf(this.__FORCE_COOKIE__) ? !0 : !1
            },
            scrollbarWidth: function() {
                if (jQuery(document)
                    .height() > jQuery(window)
                    .height()) {
                    jQuery("body")
                        .append('<div id="fakescrollbar" style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"></div>'), fakeScrollBar = jQuery("#fakescrollbar"), fakeScrollBar.append('<div style="height:100px;">&nbsp;</div>');
                    var w1 = fakeScrollBar.find("div")
                        .innerWidth();
                    fakeScrollBar.css("overflow-y", "scroll");
                    var w2 = jQuery("#fakescrollbar")
                        .find("div")
                        .html("html is required to init new width.")
                        .innerWidth();
                    return fakeScrollBar.remove(), w1 - w2
                }
                return 0
            },
            detectViewPort: function(scrollBarWidth) {
                var scrollBarWidth = scrollBarWidth || 0,
                    viewPortWidth = jQuery(window)
                    .width();
                return viewPortWidth + scrollBarWidth
            }
        }, $(function() {
            window.device = new Mobile, window.device.initOnDomReady();
            new Overlay(".filter-overlay", {
                width: "98%",
                styleClass: "filter-overlay",
                closeAlways: !1
            }, function() {})
        })
    }();
var Product = function(element) {
    if (this.currentVariantCode = null, this.currentVariantSizeCode = null, this.currentSpecialOfferDiscount = null, this.baseProductCode = null, this.cacheNamespace = "productView", this.miniProductDetails = !1, this.__SELECTED__ = "selected", this.__SOLDOUT__ = "soldout", this.__AVAILABLE__ = "available", this.hasWaConfigurator = $("#waCalculatorBox")
        .length > 0, this.showOtherPrices = shop.net && "true" === shop.url.parameters.PLA, this.defaultPriceFormat = {
            symbol: "в‚¬",
            format: "%s %v",
            decimal: ".",
            thousand: ",",
            precision: 2
        }, this.__FORMAT_THUMBNAIL__ = "thumbnail", this.__FORMAT_ZOOM__ = "zoom", this.__FORMAT_PRODUCT__ = "product", this.__STATE_VISIBLE__ = "state-product-fadeable-visible", this.$element = $(element), this.$galleryElement = $(".slider-wrapper", this.$element), this.lastSendViewProduct = "", accounting.settings.currency = this.defaultPriceFormat, !shop.page.article) {
        console.log("Injecting shop.page.article for Standard-Variant");
        var firstSizeVariant = shop.product.variantOptions[0].sizeVariantOptions[0];
        this.isStandardSizeVariant(shop.product.variantOptions[0].sizeVariantOptions[0]) && (shop.page.article = firstSizeVariant.code)
    }
    this.setVariantCode(), this.setVariantSizeCode(), this.setBaseProductCode(), this.bindEvents()
};
Product.prototype = {
    displayVariantSize: function() {
        return this.setStateInvisible()
            ._setVariantArticleCode()
            .setVariantSizeCode(this.getVariantCode())
            ._displayVariantPrice()
            .setVariantLocationUrl()
            ._displayActiveVariantSize()
            ._displayVariantAvailability()
            ._displayVariantUserGuide()
            .setStateVisible()
            ._updateWaConfigurator(), this._sendViewProduct(), this
    },
    displayVariant: function() {
        return this.setStateInvisible()
            ._setVariantArticleCode()
            ._hideVariantAvailability()
            ._displayVariantPrice()
            .setVariantLocationUrl()
            ._displayVariantArticleNumber()
            ._displayProductName()
            ._displayVariantColorSelector()
            ._displayActiveVariantColor()
            ._displayVariantSizeSelector()
            .setStateVisible()
            ._displayPrimaryImage()
            ._displayVariantGallery()
            ._updateWaConfigurator()
            ._cacheSaveCurrentGallery()
            ._displayVariantSocialSharing(), this.isSizeVariant() || this._sendViewProduct(), this
    },
    _updateWaConfigurator: function(state) {
        return this.hasWaConfigurator && shop.waConfigurator && shop.waConfigurator.updateCalculator(state), this
    },
    _displayVariantPrice: function() {
        var $priceElem = $(".js-display-variant-price", this.$element),
            $quantity = $("#qty"),
            volumePriceDropdownID = "js-volume-dropdown";
        return this.isSizeVariant() && this.hasSizeVariantVolumePrices() && !this.isMiniProductDetails() ? ($priceElem.html(this.getVariantVolumePriceDropdownHTML(volumePriceDropdownID, $quantity.val())), this._bindVolumePriceEventListener($("#" + volumePriceDropdownID), $quantity)) : $priceElem.html(this.getVariantPriceHTML()), this._displaySpecialOfferDiscount(), this._displayShippingCosts(), this
    },
    _displayShippingCosts: function() {
        if (0 != $(".product-shipping-costs")
            .length) {
            var $plaGrossPriceElem = $(".pla-gross-price");
            $(".product-shipping-costs.js-clone")
                .remove(), $plaGrossPriceElem.length > 0 && $plaGrossPriceElem.append(this.getFreightCostHTML(this.showOtherPrices)), $(".js-display-variant-price")
                .after(this.getFreightCostHTML()), this.hasFreightCost() ? $(".js-display-variant-freight-cost", this.$element)
                .removeClass("hide") : $(".js-display-variant-freight-cost", this.$element)
                .addClass("hide")
        }
        return this
    },
    displayVariantForMiniProductDetails: function() {
        return this.setMiniProductDetails(), this.setStateInvisible()
            ._setVariantArticleCode()
            ._hideVariantAvailability()
            ._displayVariantPrice()
            ._displayVariantArticleNumber()
            ._displayProductName()
            ._displayVariantColorSelector(!0)
            ._displayActiveVariantColor()
            ._displayVariantSizeSelector(!0)
            .setStateVisible()
            ._displayPrimaryImage(), this
    },
    displayVariantSizeForMiniProductDetails: function() {
        return this.setStateInvisible()
            ._setVariantArticleCode()
            .setVariantSizeCode(this.getVariantCode())
            ._displayVariantPrice()
            ._displayActiveVariantSize(!0)
            ._displayVariantAvailability()
            .setStateVisible(), this
    },
    _displayVariantUserGuide: function() {
        "use strict";
        var _$userGuideSelector = $(".js-display-user-guide", this.$element),
            _$userGuideLinkSelector = $(".js-product-user-guide-link", this.$element);
        return this.hasVariantUserGuide() ? (_$userGuideLinkSelector.attr("href", this.getVariantUserGuide()), _$userGuideSelector.show()) : _$userGuideSelector.hide(), this
    },
    _displayVariantAvailability: function() {
        var _preOrderDate = void 0 != this.getVariantPreOrderDate() ? this.getVariantPreOrderDate() : "",
            _showPreOrder = void 0 != this.isVariantPreOrder() ? this.isVariantPreOrder() : !1,
            _preOrderText = $(".js-display-variant-availability-text", this.$element)
            .attr("data-pre-order-text"),
            _preOrderDateText = $(".js-display-variant-availability-text", this.$element)
            .attr("data-pre-order-date-text"),
            _deliveryTo = $(".js-display-variant-availability-text", this.$element)
            .attr("data-delivery-to-text"),
            _deliveryNotTo = $(".js-display-variant-availability-text", this.$element)
            .attr("data-delivery-not-to-text"),
            _$availabilityLightSelector = $(".js-display-variant-availability-light", this.$element),
            _$availabilityTextSelector = $(".js-display-variant-availability-text", this.$element);
        if ($(".product-availability", this.$element)
            .removeClass("hide"), _showPreOrder && "" !== _preOrderDate) _$availabilityLightSelector.hide(), _$availabilityTextSelector.addClass("preorder-text")
            .html(_preOrderDateText + _preOrderDate);
        else if (_showPreOrder && "" === _preOrderDate) _$availabilityLightSelector.hide(), _$availabilityTextSelector.addClass("preorder-text")
            .html(_preOrderText);
        else {
            var _$showDeliveryCommitment = this.showDeliveryCommitmentForVariant();
            null != _$showDeliveryCommitment ? _$availabilityTextSelector.html(_$showDeliveryCommitment ? this.getVariantAvailabilityText() + "<span>" + _deliveryTo + "</span>" : this.getVariantAvailabilityText() + "<span>" + _deliveryNotTo + "</span>") : _$availabilityTextSelector.removeClass("preorder-text")
                .html(this.getVariantAvailabilityText()), _$availabilityLightSelector.show()
                .removeClass("availability availability-green availability-yellow availability-red")
                .addClass(this.getVariantAvailabilityLight())
        }
        return this
    },
    _hideVariantAvailability: function() {
        var _availabilitySelector = $(".product-availability", this.$element);
        return _availabilitySelector.hasClass("hide") || _availabilitySelector.addClass("hide"), this
    },
    _displayVariantArticleNumber: function() {
        return $(".js-display-variant-number", this.$element)
            .html(this.getVariantOrderNumber()), this
    },
    _setVariantArticleCode: function() {
        return $(".js-variant-code", this.$element)
            .val(this.isStandardSizeVariant() ? this.getVariantSizeCode() : this.getVariantCode()), this
    },
    _displayProductName: function() {
        return $(".js-display-product-name", this.$element)
            .html(this.getProductName()), this
    },
    _displayVariantGallery: function() {
        var _item, _return = this._cacheLoadGallery(),
            _gallery = this.getVariantThumbnails(),
            _galleryCount = _gallery.length,
            _template = new Template;
        if (this.$galleryElement.html(""), _return) this.$galleryElement.append(_return);
        else {
            _template.setTemplate("template-product-image-carrousel");
            for (var i = 0; _galleryCount > i; i++) _item = _gallery[i], _item.productImage = this.getProductImage(_item.galleryIndex)
                .url, _item.productMediaType = this.getProductImage(_item.galleryIndex)
                .creatradeImageType, _item.zoomImage = "VIDEO" !== this.getProductImage(_item.galleryIndex)
                .creatradeImageType && void 0 != this.getZoomImage(_item.galleryIndex) ? this.getZoomImage(_item.galleryIndex)
                .url : "", this.$galleryElement.append(_template.setPlaceholder(_item)
                    .render())
        }
        return this.gallery && (this.gallery.remove(), this._bindGallery()), this
    },
    _displayPrimaryImage: function(url, zoomUrl, mediaType) {
        var _url = url ? url : this.getVariantPrimaryProductImage()
            .url,
            _fallbackZoomUrl = void 0 != this.getZoomImage(0) ? this.getZoomImage(0)
            .url : "",
            _zoom = zoomUrl ? zoomUrl : _fallbackZoomUrl,
            $_image = $(".js-display-variant-primary-image"),
            $_video = $(".js-display-variant-video");
        return "https:" === location.protocol && (_url = url ? url : this.getVariantPrimaryProductImage()
                .httpsUrl, _fallbackZoomUrl = void 0 != this.getZoomImage(0) ? this.getZoomImage(0)
                .httpsUrl : "", _zoom = zoomUrl ? zoomUrl : _fallbackZoomUrl), "VIDEO" !== mediaType ? ($_video.hide(), $_image.show()
                .attr("src", _url)
                .attr("data-zoom-image", _zoom), shop.device.isMobile || this._bindZoomOverlay($_image, _url), this.isMiniProductDetails() || ($_image.attr("data-zoom-image", _zoom), this._bindZoomOverlay($_image, _zoom || _url))) : ($_image.hide(), $_video.show()
                .html("<iframe width='490' height='400' src='" + _url + "' ></iframe>")), $.removeData($_image, "elevateZoom"), $(".zoomContainer")
            .remove(), "VIDEO" === mediaType || shop.device.isMobile || this.isMiniProductDetails() || this._bindZoomImage(), this
    },
    _getSpecialOfferDiscountHTML: function(value) {
        var _template = new Template;
        return value ? _template.setTemplate("template-special-offer-discount")
            .setPlaceholder({
                specialOfferDiscount: value,
                discountBadgeSizeClass: value.indexOf(".") >= 0 ? "small" : ""
            })
            .render() : ""
    },
    _getSpecialOfferDiscountTextHTML: function(value) {
        var _template = new Template;
        return value ? _template.setTemplate("template-special-offer-discount-text")
            .setPlaceholder({
                specialOfferDiscount: value,
                waExcludedText: this.hasProductWaFlag() ? this._getSpecialOfferDiscountWaExcludedTextHTML() : ""
            })
            .render() : ""
    },
    _getSpecialOfferDiscountWaExcludedTextHTML: function() {
        var _template = new Template;
        return _template.setTemplate("template-special-offer-discount-waExcluded")
            .setPlaceholder({})
            .render()
    },
    _displaySpecialOfferDiscount: function() {
        var specialOfferDiscount = this.getVariantSizeVariantSpecialOfferDiscount(),
            $element = $(shop.device.isMobile ? "#product-information" : "#product-image-detail"),
            $productShippingCosts = $("#product-shipping-costs", "#product-information"),
            discountBadgeSelector = ".discount-badge",
            discountTextSelector = ".discount-text";
        return specialOfferDiscount ? ($element.find(discountBadgeSelector)
            .remove()
            .end()
            .append(this._getSpecialOfferDiscountHTML(specialOfferDiscount)), $productShippingCosts.find(discountTextSelector)
            .remove()
            .end()
            .prepend(this._getSpecialOfferDiscountTextHTML(specialOfferDiscount))) : ($element.find(discountBadgeSelector)
            .remove(), $productShippingCosts.find(discountTextSelector)
            .remove()), this
    },
    _displayVariantSocialSharing: function() {
        var _return = this._cacheLoadSocialSharer(),
            _template = new Template,
            _$element = $(".js-display-product-social-sharing");
        return this._cacheSaveCurrentSocialSharer(), _return ? _$element = _return : _$element.html(_template.setTemplate("template-product-social-sharing")
            .setPlaceholder({
                url: encodeURIComponent(window.location.href)
            })
            .render()), this
    },
    _checkDropdownDisabledState: function($elem) {
        $elem.each(function() {
            var $this = $(this),
                $thisLiSize = $this.find("ul li")
                .length,
                disabledClass = "disabled";
            $thisLiSize > 1 ? $this.removeClass(disabledClass) : $this.addClass(disabledClass)
        })
    },
    _displayVariantColorSelector: function(noTiles) {
        if (!this.isStandardColorVariant()) {
            for (var _tileTemplate, _variants = this.getVariantColorVariants(), _displayType = this.getProductStyleVariantSelectorDisplayType(), _displayTiles = "TILES" === _displayType && !noTiles, _template = _displayTiles ? new Template : (new Template)
                    .setTemplate("template-product-color-variants-dropdown"), _displayVariantSelector = $(_displayTiles ? ".js-display-product-color-variants-tiles" : ".js-display-product-color-variants-dropdown")
                    .html(""), i = 0, l = _variants.length; l > i; i++) _displayTiles && (_tileTemplate = "" !== _variants[i].hex3 ? "template-product-color-variants-tiles-three" : "" !== _variants[i].hex2 ? "template-product-color-variants-tiles-two" : "" !== _variants[i].hex ? "template-product-color-variants-tiles" : "" != _variants[i].image ? "template-product-color-variants-tiles-image" : !1, _tileTemplate && _template.setTemplate(_tileTemplate)), _displayVariantSelector.append(_template.setPlaceholder(_variants[i])
                .render());
            _displayTiles || this._checkDropdownDisabledState(_displayVariantSelector.closest("#product-color-dropdown"))
        }
        return this
    },
    _displayActiveVariantColor: function() {
        return this.isStandardColorVariant() || $(".js-display-chosen-color", this.$element)
            .html(this.getVariantColorVariant()
                .color), this
    },
    _displayVariantSizeSelector: function(noTiles) {
        if (!this.isStandardSizeVariant()) {
            var _displayVariantSelector, _variants = this.getVariantSizeVariants(),
                _variantsLength = _variants.length,
                _template = new Template,
                _item = {},
                _displayType = this.getProductStyleVariantSelectorDisplayType(),
                _chosenSize = "",
                _noTiles = void 0 != noTiles ? noTiles : !1;
            "TILES" === _displayType & !_noTiles ? (_displayVariantSelector = $(".js-display-product-size-variants-tiles", this.$element), _chosenSize = $(".js-display-product-size-variants-tiles .selected", this.$element)
                .attr("data-variant-size"), _template.setTemplate("template-product-size-variants-tiles")) : (_displayVariantSelector = $(".js-display-product-size-variants-dropdown", this.$element), _chosenSize = $(".js-display-chosen-size", this.$element)
                .attr("data-variant-size"), $(".js-display-chosen-size", this.$element)
                .html($(".js-display-chosen-size", this.$element)
                    .attr("data-default-text")), _template.setTemplate("template-product-size-variants-dropdown")), _displayVariantSelector.html("");
            for (var i = 0; _variantsLength > i; i++) _item.code = _variants[i].code, _item.url = _variants[i].url, _item.active = this.getVariantSizeCode() === _item.code ? this.__SELECTED__ : "", _item.availability = "RED" === _variants[i].availabilityStatus.trafficLight ? this.__SOLDOUT__ : this.__AVAILABLE__, _item.soldoutText = void 0 !== _variants[i].availabilityStatus.displayText && "RED" === _variants[i].availabilityStatus.trafficLight ? " - " + _variants[i].availabilityStatus.displayText : "", _item.size = "size" === _variants[i].variantOptionQualifiers[0].qualifier ? _variants[i].variantOptionQualifiers[0].value : _variants[i].variantOptionQualifiers[1].value, _displayVariantSelector.append(_template.setPlaceholder(_item)
                .render()), _chosenSize === _item.size && this.isAvailableSizeVariant(_item.code) && this.setAndDisplayVariantSize(_item.code);
            this._checkDropdownDisabledState(_displayVariantSelector.closest("#product-size-dropdown"))
        }
        return this
    },
    _displayActiveVariantSize: function(noTiles) {
        var _noTiles = void 0 != noTiles ? noTiles : !1;
        if (!this.isStandardSizeVariant() && null !== this.getVariantSizeCode()) {
            var _size = "size" === this.getVariantSizeVariant()
                .variantOptionQualifiers[0].qualifier ? this.getVariantSizeVariant()
                .variantOptionQualifiers[0].value : this.getVariantSizeVariant()
                .variantOptionQualifiers[1].value,
                _code = this.getVariantSizeCode();
            "TILES" !== this.getProductStyleVariantSelectorDisplayType() || _noTiles ? $(".js-display-chosen-size", this.$element)
                .attr("data-variant-size", _size)
                .html(_size) : $(".js-display-product-size-variants-tiles li", this.$element)
                .removeClass("selected")
                .each(function() {
                    $(this)
                        .attr("data-variant-code") === _code && $(this)
                        .attr("data-variant-size", _size)
                        .addClass("selected")
                })
        }
        return this
    },
    _cacheSaveCurrentGallery: function() {
        return Cache(this.cacheNamespace)
            .save(this._getCacheGalleryName(), this.$galleryElement.html()), this
    },
    _cacheLoadGallery: function() {
        return Cache(this.cacheNamespace)
            .load(this._getCacheGalleryName())
    },
    _cacheSaveCurrentSocialSharer: function() {
        return Cache(this.cacheNamespace)
            .save(this._getCacheSocialShareName(), $(".js-display-product-social-sharing")
                .html()), this
    },
    _cacheLoadSocialSharer: function() {
        return Cache(this.cacheNamespace)
            .load(this._getCacheSocialShareName(), $(".js-display-product-social-sharing")
                .html())
    },
    _getCacheGalleryName: function() {
        return this.getVariantColorCode() + "-gallery"
    },
    _getCacheSocialShareName: function() {
        return this.getVariantColorCode() + "-social"
    },
    bindEvents: function() {
        var self = this,
            eventHandler = shop.device.hasTouch ? "tab.product touch.product" : "mousedown.product";
        return $(function() {
                self._bindGallery()
            }), self.$galleryElement.on("click.product", "img", function(self) {
                return function(event) {
                    if (event.preventDefault(), event.stopPropagation(), self.$galleryElement.find("img")
                        .removeClass("active"), $(this)
                        .addClass("active"), self._displayPrimaryImage($(this)
                            .attr("data-product-image"), $(this)
                            .attr("data-zoom-image"), $(this)
                            .attr("data-product-media-type")), shop.device.isMobile) {
                        var $navDetailSliderItem = $("#nav-detail-media-gallery")
                            .width($(window)
                                .width())
                            .find(".slider-item");
                        $.ocNav("nav-detail-media-gallery", "open"), $navDetailSliderItem.on("click", "img", function(e) {
                            e.preventDefault(), $navDetailSliderItem.find("img")
                                .removeClass("active"), $(this)
                                .addClass("active"), self._displayPrimaryImage($(this)
                                    .attr("data-product-image"), $(this)
                                    .attr("data-zoom-image"), $(this)
                                    .attr("data-product-media-type"))
                        })
                    }
                }
            }(self)), this._bindDropDownToggle(eventHandler)
            ._bindVariantColorDropdownSelector(eventHandler)
            ._bindVariantSizeDropdownSelector(eventHandler)
            ._bindVariantColorTileSelector()
            ._bindVariantSizeTileSelector()
            ._bindVariantUrl(), this
    },
    _setSendViewProduct: function(code) {
        code && (this.lastSendViewProduct = code)
    },
    _getSendViewProduct: function() {
        return this.lastSendViewProduct
    },
    _sendViewProduct: function() {
        var etracker, identifier = this.getVariantIdentifier(),
            quantity = $("#qty")
            .val();
        this._getSendViewProduct() !== identifier && (etracker = new eTrackerCommerceAPI, etracker.viewProduct(etracker.getProductJSON(this.getVariantIdentifier(), quantity))), this._setSendViewProduct(identifier)
    },
    _bindVolumePriceEventListener: function($volumePriceDropdown, $quantity) {
        var self = this;
        $volumePriceDropdown.selectOrDie({
            cycle: !0,
            onChange: function() {
                $quantity.val($(this)
                    .find(":selected")
                    .val()), self._updateWaConfigurator("change"), self.showOtherPrices && ($(".pla-net-price-value")
                    .text($(this)
                        .find(":selected")
                        .data("formatted-price")), $(".pla-net-print-price-value")
                    .text($(this)
                        .find(":selected")
                        .data("formatted-print-price")))
            }
        }), $quantity.delayKeyup(function() {
            self._displayVariantPrice()
        })
    },
    _bindGallery: function() {
        var $mediaGallery = $("#media-gallery"),
            detailMediaGalleryName = "detail-media-gallery",
            $productImageDetail = $("#product-image-detail");
        shop.device.isMobile ? ($("#" + detailMediaGalleryName)
            .remove(), $mediaGallery.clone()
            .attr({
                id: detailMediaGalleryName,
                style: ""
            })
            .addClass("m-t-l")
            .find("ul")
            .attr("style", "")
            .end()
            .appendTo($productImageDetail), this.gallery = new Slider($mediaGallery, {
                orientation: "horizontal",
                pagerSteps: 2,
                startPosition: 0,
                auto: !1,
                width: $mediaGallery.width(),
                productcarousel: !0,
                halfslider: !0
            }), $mediaGallery.height($mediaGallery.find("img")
                .eq(0)
                .attr("height") + 10), $productImageDetail.ocNav({
                name: "nav-" + detailMediaGalleryName,
                renaming: !1,
                side: "left",
                source: "#product-image-detail",
                onOpen: function() {
                    shop.disableScrolling("#page-wrapper", !0)
                },
                onClose: function() {
                    shop.disableScrolling("#page-wrapper", !1)
                }
            }), $(".js-pds-close")
            .on("click", function(e) {
                e.preventDefault(), e.stopPropagation(), $.ocNav("nav-detail-media-gallery", "close")
            })) : this.gallery = new Slider($mediaGallery, {
            orientation: "vertical",
            pagerSteps: 3,
            height: 585,
            auto: !1
        })
    },
    _bindZoomImage: function() {
        return "tablet" !== shop.device.type && "mobile" !== shop.device.type ? $(".js-display-variant-primary-image", this.$element)
            .elevateZoom({
                cursor: "crosshair",
                easing: !0,
                easingAmount: 4,
                zoomWindowFadeIn: 200,
                zoomWindowFadeOut: 200,
                zoomWindowWidth: 480,
                zoomWindowHeight: 585
            }) : $(".js-display-variant-primary-image")
            .magnifik({
                ratio: 1
            }), this
    },
    _bindZoomOverlay: function(_image, _url) {
        return "tablet" !== shop.device.type && "mobile" !== shop.device.type && (_image.off("click.zoomImage"), $(".js-zoom-image-overlay")
            .remove(), _image.on("click.zoomImage", function() {
                {
                    var zoomImageOverlayContent = '<div><img class="zoom-image-overlay" src="' + _url + '"/></div>';
                    new Overlay(".js-zoom-image-overlay", {
                            type: "div",
                            width: "500px",
                            height: "500px",
                            styleClass: "js-zoom-image-overlay",
                            content: zoomImageOverlayContent,
                            closeAlways: !0
                        }, function() {
                            $(".zoom-image-overlay")
                                .on("load", function() {
                                    {
                                        var $img = $(this);
                                        $img.closest(".overlay-container")
                                    }
                                    $img.css({
                                        height: $(window)
                                            .height() - 200,
                                        "min-height": $(window)
                                            .height() / 2
                                    }), $overlayContainer.css({
                                        left: ($(window)
                                            .width() - $(this)
                                            .width()) / 2 + "px",
                                        "margin-top": "-" + $overlayContainer.height() / 2.5 + "px"
                                    })
                                })
                        })
                        .wrap()
                }
            })), this
    },
    _bindVariantUrl: function() {
        return history.pushState && $(window)
            .on("popstate.product", function(self) {
                return function(event) {
                    event.preventDefault();
                    var _code = event.originalEvent.state ? event.originalEvent.state.code : "";
                    self.isVariantActive(_code) || self.setVariantCode(_code)
                }
            }(this)), this
    },
    _bindVariantColorDropdownSelector: function(eventHandler) {
        var elementSelector = "li." + this.__AVAILABLE__;
        return $(".js-event-select-color-variant")
            .hammer()
            .on(eventHandler, elementSelector, function(self) {
                var $activeDropDown = $("#product-color-dropdown");
                return function(event) {
                    shop.device.hasTouch ? (event.gesture.preventDefault(), event.gesture.stopPropagation(), window.setTimeout(function() {
                            $activeDropDown.css("margin-bottom", $activeDropDown.data("margin-bottom"))
                        }, 1e3)) : (event.stopPropagation(), event.preventDefault()), $(this)
                        .parents("ul")
                        .hide()
                        .removeClass("drop-down-active"), $(".js-product-size-error")
                        .addClass("hide");
                    var _code = $(this)
                        .attr("data-variant-code");
                    self.setAndDisplayVariant(_code)
                }
            }(this)), this
    },
    _bindVariantSizeDropdownSelector: function(eventHandler) {
        var elementSelector = "li." + this.__AVAILABLE__;
        return $(".js-event-select-size-variant")
            .hammer()
            .on(eventHandler, elementSelector, function(self) {
                var $activeDropDown = $("#product-size-dropdown");
                return function(event) {
                    shop.device.hasTouch ? (event.gesture.preventDefault(), event.gesture.stopPropagation(), window.setTimeout(function() {
                            $activeDropDown.css("margin-bottom", $activeDropDown.data("margin-bottom"))
                        }, 1e3)) : (event.stopPropagation(), event.preventDefault()), $(this)
                        .parents("ul")
                        .hide()
                        .removeClass("drop-down-active"), $(".js-product-size-error")
                        .addClass("hide");
                    var _code = $(this)
                        .attr("data-variant-code");
                    self.setAndDisplayVariantSize(_code)
                }
            }(this)), this
    },
    _bindVariantColorTileSelector: function() {
        var elementSelector = "li." + this.__AVAILABLE__;
        return $(".js-event-select-color-tile-variant")
            .on("click.product", elementSelector, function(self) {
                return function(event) {
                    event.stopPropagation(), event.preventDefault(), $(".js-product-size-error")
                        .addClass("hide");
                    var _code = $(this)
                        .attr("data-variant-code");
                    self.setAndDisplayVariant(_code)
                }
            }(this)), this
    },
    _bindVariantSizeTileSelector: function() {
        var elementSelector = "li." + this.__AVAILABLE__;
        return $(".js-event-select-size-tile-variant")
            .on("click.product", elementSelector, function(self) {
                return function(event) {
                    event.stopPropagation(), event.preventDefault(), $(".js-product-size-error")
                        .addClass("hide");
                    var _code = $(this)
                        .attr("data-variant-code");
                    self.setAndDisplayVariantSize(_code)
                }
            }(this)), this
    },
    _bindDropDownToggle: function(eventHandler) {
        var $sizeDropDown = $("#product-size-dropdown"),
            $colorDropDown = $("#product-color-dropdown"),
            $dropDowns = $()
            .add($colorDropDown)
            .add($sizeDropDown);
        return $sizeDropDown.data("margin-bottom", $sizeDropDown.css("margin-bottom")), $colorDropDown.data("margin-bottom", $colorDropDown.css("margin-bottom")), $(".variant-options")
            .hammer()
            .on(eventHandler, ".js-event-toggle-drop-down", function() {
                return function(event) {
                    shop.device.hasTouch ? (event.gesture.preventDefault(), event.gesture.stopPropagation()) : (event.stopPropagation(), event.preventDefault());
                    var $ul = $(this)
                        .nextAll("ul"),
                        ulItemsSize = $ul.find("li")
                        .length,
                        $activeDropDown = $(this)
                        .closest("#product-color-dropdown, #product-size-dropdown");
                    ulItemsSize > 1 && ($ul.hasClass("drop-down-active") ? ($(document)
                        .off("mousedown.js-event-toggle-drop-down"), $(".drop-down-active")
                        .each(function() {
                            $(this)
                                .show()
                                .addClass("drop-down-active")
                        }), shop.device.hasTouch && $dropDowns.css("margin-bottom", ""), $ul.hide()
                        .removeClass("drop-down-active")) : ($(".drop-down-active")
                        .each(function() {
                            $(this)
                                .hide()
                                .removeClass("drop-down-active")
                        }), $(this)
                        .nextAll("ul")
                        .show()
                        .addClass("drop-down-active"), shop.device.hasTouch && $activeDropDown.css("margin-bottom", $(".drop-down-active")
                            .height() + 10), $(document)
                        .on("mousedown.js-event-toggle-drop-down", function() {
                            0 === $(this)
                                .closest(".js-event-toggle-drop-down")
                                .length && $(".drop-down-active")
                                .each(function() {
                                    shop.device.hasTouch && $dropDowns.css("margin-bottom", ""), $(this)
                                        .hide()
                                        .removeClass("drop-down-active")
                                })
                        })))
                }
            }(this)), this
    },
    setZoomImage: function(image) {
        var newImage = new Image;
        return newImage.src = image, newImage.onload = function() {
            $(".zoomWindow")
                .css({
                    "background-image": "url(" + image + ")",
                    "background-size": newImage.width + "px " + newImage.height + "px"
                })
        }, this
    },
    setVariantLocationUrl: function() {
        return history.pushState && history.replaceState({
            code: this.getVariantCode()
        }, this.getVariantCode(), this.getShopBaseUrl() + this.getVariantUrl() + location.search), this
    },
    setStateVisible: function() {
        return $("body")
            .addClass(this.__STATE_VISIBLE__), $("#add-to-cart-button")
            .attr("disabled", !1)
            .prop("disabled", !1), $("#add-to-watchlist-button")
            .attr("disabled", !1)
            .prop("disabled", !1), this
    },
    setStateInvisible: function() {
        return $("body")
            .removeClass(this.__STATE_VISIBLE__), $("#add-to-cart-button")
            .attr("disabled", !0)
            .prop("disabled", !0), $("#add-to-watchlist-button")
            .attr("disabled", !0)
            .prop("disabled", !0), this
    },
    getProduct: function() {
        return shop.hasOwnProperty("product") ? shop.product : {}
    },
    getProductVariants: function() {
        return this.getProduct()
            .hasOwnProperty("variantOptions") ? this.getProduct()
            .variantOptions : {}
    },
    getProductCode: function() {
        return this.getObjectPath(this.getProduct()
            .code)
    },
    getProductName: function() {
        return this.getObjectPath(this.getProduct()
            .name)
    },
    getProductVariantType: function() {
        return this.getObjectPath(this.getProduct()
            .variantType)
    },
    getProductUrl: function() {
        return this.getObjectPath(this.getProduct()
            .url)
    },
    getProductStyleVariantSelectorDisplayType: function() {
        return this.getObjectPath(this.getProduct()
            .styleVariantSelectorDisplayType)
    },
    _getEquivalentImage: function(image, type) {
        for (var _reference = "object" == typeof image ? this.getImageIndex() : image, _images = void 0 != this.getVariant()
                .galleryImages ? this.getVariant()
                .galleryImages : [], _imageCount = _images.length, i = 0; _imageCount > i; i++)
            if (_images[i].format == type && _images[i].galleryIndex === _reference) return _images[i]
    },
    getProductImage: function(image) {
        return this._getEquivalentImage(image, this.__FORMAT_PRODUCT__)
    },
    getThumbnail: function(image) {
        return this._getEquivalentImage(image, this.__FORMAT_THUMBNAIL__)
    },
    getZoomImage: function(image) {
        return this._getEquivalentImage(image, this.__FORMAT_ZOOM__)
    },
    getImageIndex: function(image) {
        return image && image.hasOwnProperty("galleryIndex") ? parseInt(image.galleryIndex, 10) : null
    },
    getObjectPath: function(path) {
        try {
            return path
        } catch (e) {
            return Log({
                level: 4,
                message: e,
                type: "error"
            }), !1
        }
    },
    setMiniProductDetails: function(isMini) {
        return this.miniProductDetails = isMini ? isMini : !0, this
    },
    isMiniProductDetails: function() {
        return this.miniProductDetails
    },
    setBaseProductCode: function(code) {
        return this.baseProductCode = code ? code : shop.page.baseProduct, this
    },
    setVariantCode: function(code) {
        var shopPageVariantCode = this.isAvailableColorVariant(shop.page.variant) ? shop.page.variant : this.getNextAvailableColorVariant();
        return this.currentVariantCode = code ? code : shopPageVariantCode, this
    },
    setVariantCodeAndResetSizeCode: function(code) {
        var shopPageVariantCode = this.isAvailableColorVariant(shop.page.variant) ? shop.page.variant : this.getNextAvailableColorVariant();
        return this.currentVariantCode = code ? code : shopPageVariantCode, this.resetVariantSizeCode(), this
    },
    isAvailableColorVariant: function(code) {
        for (var _colorVariant, _sizeVariant, _sizeVariantsLength, _colorVariantsLength = this.getProductVariants()
                .length, _itemAvailable = !1, i = 0; _colorVariantsLength > i; i++)
            if (_colorVariant = this.getProductVariants()[i], _colorVariant.code === code) {
                _sizeVariantsLength = _colorVariant.sizeVariantOptions.length;
                for (var j = 0; _sizeVariantsLength > j; j++) _sizeVariant = _colorVariant.sizeVariantOptions[j], "RED" !== _sizeVariant.availabilityStatus.trafficLight && (_itemAvailable = !0)
            }
        return _itemAvailable
    },
    getNextAvailableColorVariant: function() {
        for (var _colorVariant, _sizeVariant, _sizeVariantsLength, _colorVariantsLength = this.getProductVariants()
                .length, i = 0; _colorVariantsLength > i; i++) {
            _colorVariant = this.getProductVariants()[i], _sizeVariantsLength = _colorVariant.sizeVariantOptions.length;
            for (var j = 0; _sizeVariantsLength > j; j++)
                if (_sizeVariant = _colorVariant.sizeVariantOptions[j], "RED" !== _sizeVariant.availabilityStatus.trafficLight) return _colorVariant.code
        }
        return null
    },
    getNextAvailableSizeVariant: function() {
        for (var i = 0; i < this.getVariantSizeVariants()
            .length; i++)
            if ("RED" !== this.getVariantSizeVariants()[i].availabilityStatus.trafficLight) return this.getVariantSizeVariants()[i].code;
        return null
    },
    setVariantSizeCode: function(sizeCode) {
        var shopPageArticle = this.isAvailableSizeVariant(shop.page.article) ? shop.page.article : null;
        return "" === shopPageArticle && (shopPageArticle = null), this.currentVariantSizeCode = this.isAvailableSizeVariant(sizeCode) ? sizeCode : shopPageArticle ? shopPageArticle : this.isStandardSizeVariant() ? this.getNextAvailableSizeVariant() : null, this
    },
    isAvailableSizeVariant: function(sizeCode) {
        for (var _sizeVariant, _sizeVariantsLength = this.getVariant()
                .sizeVariantOptions.length, _sizeAvailable = !1, i = 0; _sizeVariantsLength > i; i++) _sizeVariant = this.getVariant()
            .sizeVariantOptions[i], _sizeVariant.code === sizeCode && "RED" !== _sizeVariant.availabilityStatus.trafficLight && (_sizeAvailable = !0);
        return _sizeAvailable
    },
    resetVariantSizeCode: function() {
        return this.currentVariantSizeCode = null, this
    },
    setAndDisplayVariant: function(code) {
        this.isVariantActive(code) || (this.setVariantCodeAndResetSizeCode(code), this.isMiniProductDetails() ? this.displayVariantForMiniProductDetails() : this.displayVariant()), this.isStandardSizeVariant() && this.setAndDisplayVariantSize(this.getVariant()
            .sizeVariantOptions[0].code)
    },
    setAndDisplayVariantSize: function(code) {
        this.isVariantActive(code) || (this.setVariantSizeCode(code), this.isMiniProductDetails() ? this.displayVariantSizeForMiniProductDetails() : this.displayVariantSize())
    },
    getVariant: function() {
        for (var _return = !1, i = 0; i < this.getProductVariants()
            .length; i++)(this.getProductVariants()[i].code === this.getVariantColorCode() || this.getProductVariants()[i].code === this.getBaseProductCode()) && (_return = this.getProductVariants()[i]);
        return _return
    },
    getBaseProductCode: function() {
        return this.baseProductCode
    },
    getVariantCode: function() {
        return this.isSizeVariant() ? this.getVariantSizeCode() : this.getVariantColorCode()
    },
    getVariantColorCode: function() {
        return this.currentVariantCode
    },
    getVariantSizeCode: function() {
        return this.currentVariantSizeCode
    },
    getVariantUrl: function(parent) {
        return this.getObjectPath(this.isSizeVariant() && parent !== !0 ? this.getVariantSizeVariant()
            .url : this.getVariant()
            .url)
    },
    getVariantPreOrderDate: function() {
        return this.getObjectPath(this.getVariant()
            .preOrderDate)
    },
    isVariantPreOrder: function() {
        return this.getObjectPath(this.getVariant()
            .preOrderable)
    },
    getVariantColorUrl: function() {
        return this.getVariantUrl(!0)
    },
    getVariantSizeUrl: function() {
        return this.getVariantUrl(!1)
    },
    _getVariantTaxRate: function() {
        return parseFloat(this.isSizeVariant() ? this.getObjectPath(this.getVariantSizeVariant()
            .taxRate) : this.getObjectPath(this.getVariant()
            .taxRate))
    },
    _getTaxForPrice: function(netPrice) {
        var taxRate = this._getVariantTaxRate() || null;
        return netPrice && taxRate ? netPrice / 100 * taxRate : 0
    },
    _getVariantPriceData: function(parent, amount) {
        return this.isSizeVariant() && parent !== !0 ? this.hasSizeVariantVolumePrices() ? this.getVariantSizeVariantVolumePrice(amount ? amount : 1) : this.getVariantSizeVariant()
            .priceData : this.getVariant()
            .priceData
    },
    getFormattedPrice: function(price, formatObj) {
        var newPrice;
        return newPrice = formatObj ? accounting.formatMoney(price, formatObj.symbol, formatObj.precision, formatObj.thousand, formatObj.decimal) : accounting.formatMoney(price, this.defaultPriceFormat.symbol, this.defaultPriceFormat.precision, this.defaultPriceFormat.thousand, this.defaultPriceFormat.decimal, this.defaultPriceFormat.format)
    },
    getFormattedPricePlusTax: function(price, formatObj) {
        return this.getFormattedPrice(price + this._getTaxForPrice(price), formatObj)
    },
    getFormattedGrossOrNetPrice: function(price, formattedPrice, formatOptionObj, netOrGross) {
        return "gross" === netOrGross && price || this.showOtherPrices && price && !netOrGross ? this.getFormattedPricePlusTax(price, formatOptionObj) : "net" === netOrGross && formattedPrice || formattedPrice && !netOrGross ? formattedPrice : void 0
    },
    getPrintPrice: function(printPriceObj, netOrGross) {
        return printPriceObj ? this.getFormattedGrossOrNetPrice(printPriceObj.value, printPriceObj.formattedValue, {
            symbol: printPriceObj.currencySymbol,
            decimal: printPriceObj.formatDecimalSeparator,
            thousand: printPriceObj.formatGroupingSeparator,
            precision: printPriceObj.formatDecimalDigits
        }, netOrGross) : ""
    },
    getVariantPriceDropdownItemHTML: function(itemObj, amount) {
        var selectItemTemplate = new Template,
            printPriceObj = itemObj.printPriceData,
            self = this;
        return selectItemTemplate.setTemplate("template-product-volume-price-dropdown-item"), selectItemTemplate.setPlaceholder(itemObj)
            .setExceptions({
                getVolumeItemPrice: function() {
                    return self.getFormattedGrossOrNetPrice(itemObj.value, itemObj.formattedValue, {
                        symbol: itemObj.currencySymbol,
                        decimal: itemObj.formatDecimalSeparator,
                        thousand: itemObj.formatGroupingSeparator,
                        precision: itemObj.formatDecimalDigits
                    })
                },
                getItemPrintPrice: function() {
                    return self.getPrintPrice(printPriceObj)
                },
                getFormattedPrintValue: function() {
                    return self.getPrintPrice(printPriceObj, "net")
                },
                getOptionPrintPrice: function() {
                    var printPrice = self.getPrintPrice(printPriceObj);
                    return "" !== printPrice ? "+" + printPrice : ""
                },
                getPriceClass: function() {
                    return printPriceObj && self.hasProductWaFlag() ? "visible" : "hidden"
                },
                getSeperator: function() {
                    return itemObj.maxQuantity ? " - " : ""
                },
                isSelected: function() {
                    return itemObj.minQuantity <= amount && (itemObj.maxQuantity ? itemObj.maxQuantity : amount) >= amount ? 'selected="selected"' : ""
                }
            }), selectItemTemplate.render()
    },
    getVariantVolumePriceDropdownHTML: function(customID, amount) {
        var priceArray = this.getVariantSizeVariantVolumePrices(),
            selectTemplate = new Template,
            priceTemplate = new Template,
            $price = $(".js-display-variant-price"),
            txtObj = $price.data() || {},
            txt = {
                gross: void 0 !== txtObj.priceGrossText ? txtObj.priceGrossText : "",
                net: void 0 !== txtObj.priceNetText ? txtObj.priceNetText : ""
            },
            amount = amount ? amount : 1,
            self = this,
            dropdownTemplate = "",
            hasVolumePricesPrintData = this.hasVolumePricesPrintData() ? "visible" : "hidden";
        return selectTemplate.setTemplate("template-product-volume-price-dropdown"), selectTemplate.setPlaceholder({
                customID: customID ? customID : "js-volume-price-selector"
            })
            .setExceptions({
                getPrintPriceDataClass: function() {
                    return hasVolumePricesPrintData
                },
                getOptionItems: function() {
                    for (var itemsHTML = "", i = 0, l = priceArray.length; l > i; i++) itemsHTML += self.getVariantPriceDropdownItemHTML(priceArray[i], amount);
                    return itemsHTML
                }
            }), this.showOtherPrices ? (selectTemplate = selectTemplate.render(), priceTemplate.setTemplate("template-pla-price"), priceTemplate.setPlaceholder({
                    txtGross: txt.gross,
                    priceHTML: selectTemplate,
                    txtNet: txt.net + " ",
                    variantPriceDataFormattedValue: $(selectTemplate)
                        .find(":selected")
                        .data("formattedPrice"),
                    variantPrintPriceDataFormattedValue: $(selectTemplate)
                        .find(":selected")
                        .data("formattedPrintPrice")
                })
                .setExceptions({
                    getNetPrintPriceDataClass: function() {
                        return hasVolumePricesPrintData
                    }
                }), dropdownTemplate = priceTemplate.render()) : dropdownTemplate = selectTemplate.render(), dropdownTemplate
    },
    getVariantPriceHTML: function(parent) {
        var $price = $(".js-display-variant-price"),
            txtObj = $price.data(),
            variantPriceData = this._getVariantPriceData(parent),
            priceTemplate = new Template,
            hasVolumePricesPrintData = this.hasVolumePricesPrintData() ? "visible" : "hidden",
            priceHTML = {
                merged: "",
                formatted: "",
                old: "",
                base: "",
                save: "",
                print: ""
            },
            priceFormatObj = {
                symbol: variantPriceData.currencySymbol,
                decimal: variantPriceData.formatDecimalSeparator,
                thousand: variantPriceData.formatGroupingSeparator,
                precision: variantPriceData.formatDecimalDigits
            },
            txt = {
                fromPrice: void 0 !== txtObj.priceFromText ? txtObj.priceFromText : "",
                topOffer: void 0 !== txtObj.priceTopOfferText ? txtObj.priceTopOfferText : "",
                basePrice: void 0 !== txtObj.priceBaseText ? txtObj.priceBaseText : "",
                oldPrice: void 0 !== txtObj.priceOldText ? txtObj.priceOldText : "",
                savePrice: void 0 !== txtObj.priceSave ? txtObj.priceSave : "",
                gross: void 0 !== txtObj.priceGrossText ? txtObj.priceGrossText : "",
                net: void 0 !== txtObj.priceNetText ? txtObj.priceNetText : "",
                print: void 0 !== txtObj.pricePrint ? txtObj.pricePrint : ""
            },
            type = {
                price: variantPriceData.priceType,
                topOffer: variantPriceData.showTopOfferHint
            };
        return priceHTML.formatted = "FROM" === type.price ? void 0 !== variantPriceData.formattedValue ? '<span class="price-from-tag">' + txt.fromPrice + "</span> " + this.getFormattedGrossOrNetPrice(variantPriceData.value, variantPriceData.formattedValue, priceFormatObj) : "" : void 0 !== variantPriceData.formattedValue ? '<span class="price-formatted clearfix left">' + this.getFormattedGrossOrNetPrice(variantPriceData.value, variantPriceData.formattedValue, priceFormatObj) + "</span>" : "", priceHTML.old = void 0 !== variantPriceData.formattedOldPriceValue ? '<span class="price-old-tag left clearfix">' + txt.oldPrice + '</span> <span class="price-old left m-l-s">' + this.getFormattedGrossOrNetPrice(variantPriceData.oldPriceValue, variantPriceData.formattedOldPriceValue, priceFormatObj) + "</span>" : "", priceHTML.base = void 0 !== variantPriceData.formattedBasePrice ? '<span class="price-base left m-b-s">' + txt.basePrice + " " + this.getFormattedGrossOrNetPrice(variantPriceData.basePriceValue, variantPriceData.formattedBasePrice, priceFormatObj) + "</span>" : "", priceHTML.save = void 0 !== variantPriceData.formattedSaveValue ? '<span class="price-save left"><span class="price-save-tag">' + txt.savePrice + "</span> " + this.getFormattedGrossOrNetPrice(variantPriceData.saveValue, variantPriceData.formattedSaveValue, priceFormatObj) + "</span>" : "", priceHTML.print = void 0 !== variantPriceData.printPriceData && this.hasProductWaFlag() ? '<span class="print-price clearfix left"> + ' + this.getFormattedGrossOrNetPrice(variantPriceData.printPriceData.value, variantPriceData.printPriceData.formattedValue, priceFormatObj) + " (" + txt.print + ") </span>" : "", priceHTML.merged = type.topOffer ? priceHTML.base + '<span class="price-top-offer">' + priceHTML.formatted + '</span><span class="price-top-offer-tag">' + txt.topOffer + "</span>" + priceHTML.print : "" !== priceHTML.old ? priceHTML.base + priceHTML.old + '<span class="price-new clearfix left m-t-s">' + priceHTML.formatted + "</span>" + priceHTML.save + priceHTML.print : priceHTML.base + priceHTML.formatted + priceHTML.print, this.showOtherPrices && (priceTemplate.setTemplate("template-pla-price"), priceTemplate.setPlaceholder({
                txtGross: txt.gross,
                priceHTML: priceHTML.merged,
                txtNet: txt.net + " ",
                variantPriceDataFormattedValue: variantPriceData.formattedValue
            })
            .setExceptions({
                getNetPrintPriceDataClass: function() {
                    return hasVolumePricesPrintData
                }
            }), priceHTML.merged = priceTemplate.render()), this.getObjectPath(priceHTML.merged)
    },
    _getFreightCost: function(showOtherPrice) {
        var freightCostValue, variantPriceData = this._getVariantPriceData(parent),
            formatObj = {
                symbol: variantPriceData.currencySymbol,
                decimal: variantPriceData.formatDecimalSeparator,
                thousand: variantPriceData.formatGroupingSeparator,
                precision: variantPriceData.formatDecimalDigits
            };
        return freightCostValue = showOtherPrice ? this.getFormattedPricePlusTax(variantPriceData.freightCostValue, formatObj) : variantPriceData.formattedFreightCostValue, this.getObjectPath(freightCostValue)
    },
    getFreightCostHTML: function(showOtherPrice) {
        var $elem = $("#product-shipping-costs"),
            textSelector = ".js-shipping-cost-text",
            txtObj = $elem.data(),
            $htmlElem = $elem.clone(!0, !0)
            .removeAttr("id")
            .removeClass("hide", "left")
            .removeClass("left")
            .addClass("js-clone");
        return $htmlElem.find(textSelector)
            .text(showOtherPrice ? shop.net ? txtObj.taxTextGross : txtObj.taxTextNet : shop.net ? txtObj.taxTextNet : txtObj.taxTextGross), $htmlElem.find(".js-display-variant-freight-cost-value")
            .html(this._getFreightCost(showOtherPrice)), $htmlElem
    },
    hasFreightCost: function(parent) {
        var variantPriceData = this._getVariantPriceData(parent);
        return void 0 !== variantPriceData.formattedFreightCostValue
    },
    getVariantOrderNumber: function() {
        return this.getObjectPath(this.getVariant()
            .ordernumber)
    },
    getVariantUserGuide: function() {
        var _userGuide = this.hasVariantUserGuide() ? this.getVariantSizeVariant()
            .userGuide : null;
        return this.getObjectPath(_userGuide)
    },
    hasVariantUserGuide: function() {
        return void 0 != this.getVariantSizeVariant()
            .userGuide
    },
    getVariantAvailabilityText: function() {
        return this.getObjectPath(this.getVariantSizeVariant()
            .availabilityStatus.displayText)
    },
    showDeliveryCommitmentForVariant: function() {
        return this.getObjectPath(this.getVariantSizeVariant()
            .deliveryCommitmentData.showDeliveryCommitment)
    },
    getVariantAvailabilityLight: function() {
        var _light = this.getVariantSizeVariant()
            .availabilityStatus.trafficLight,
            _return = "";
        switch (_light) {
            case "GREEN":
                _return = "availability availability-green";
                break;
            case "YELLOW":
                _return = "availability availability-yellow";
                break;
            case "RED":
                _return = "availability availability-red"
        }
        return this.getObjectPath(_return)
    },
    getVariantQualifierObject: function(parent) {
        var _object = {};
        return _object = this.getObjectPath(this.isSizeVariant() && parent !== !0 ? this.getVariantSizeVariant()
            .variantOptionQualifiers : this.getVariant()
            .variantOptionQualifiers)
    },
    getVariantQualifier: function(qualifier, value, parent) {
        for (var _qualifierObject = this.getVariantQualifierObject(parent), _return = !1, i = 0; i < _qualifierObject.length; i++) _qualifierObject[i].qualifier === qualifier && (_return = _qualifierObject[i]);
        return value && _return.hasOwnProperty(value) ? _return = _return[value] : parent && this.isSizeVariant() ? _return = this.getVariantQualifier(qualifier, value, !1) : Log({
            level: 1,
            message: "Key in Qulifier not found",
            type: "error"
        }), _return
    },
    _getVariantImagesByType: function(type) {
        for (var _return = [], _images = void 0 != this.getObjectPath(this.getVariant()
                .galleryImages) ? this.getObjectPath(this.getVariant()
                .galleryImages) : [], _imageCount = _images.length, i = 0; _imageCount > i; i++) _images[i].format == type && _return.push(_images[i]);
        return _return
    },
    getVariantThumbnails: function() {
        return this._getVariantImagesByType(this.__FORMAT_THUMBNAIL__)
    },
    getVariantProductImages: function() {
        return this._getVariantImagesByType(this.__FORMAT_PRODUCT__)
    },
    getVariantZoomImages: function() {
        return this._getVariantImagesByType(this.__FORMAT_ZOOM__)
    },
    getVariantPrimaryImages: function() {
        return this.getObjectPath(this.getVariant()
            .primaryImages)
    },
    getVariantPrimaryProductImage: function() {
        for (var _return = [], _images = void 0 != this.getVariantPrimaryImages() ? this.getVariantPrimaryImages() : [], _imageCount = _images.length, i = 0; _imageCount > i; i++) _images[i].format == this.__FORMAT_PRODUCT__ && (_return = _images[i]);
        return _return
    },
    getVariantPrimaryZoomImage: function() {
        for (var _return = [], _images = this.getVariantPrimaryImages(), _imageCount = _images.length, i = 0; _imageCount > i; i++) _images[i].format == this.__FORMAT_ZOOM__ && (_return = _images[i]);
        return _return
    },
    getVariantSizeVariants: function() {
        return this.getObjectPath(this.getVariant()
            .sizeVariantOptions)
    },
    getCurrentVariantCode: function() {
        var getCode = function(variant) {
                return variant ? variant.replace(/Variant_|Article_/g, "") : null
            },
            sizeVariant = this.getVariantSizeVariant() || (this.getVariantSizeVariants() || [""])[0] || null,
            sizeVariantCode = sizeVariant ? getCode(sizeVariant.code) : null,
            colorVariantCode = getCode(this.getVariantColorCode() || null);
        return sizeVariantCode || colorVariantCode || null
    },
    getVariantSizeVariant: function() {
        for (var _return = !1, i = 0; i < this.getVariantSizeVariants()
            .length; i++)
            if (this.getVariantSizeVariants()[i].code === this.getVariantSizeCode()) return this.getVariantSizeVariants()[i];
        return _return
    },
    getVariantSizeVariantSpecialOfferDiscount: function() {
        return this.isSizeVariant() ? this.getObjectPath(this.getVariantSizeVariant()
            .specialOfferDiscount) : null
    },
    getVariantSizeVariantVolumePrices: function() {
        return this.isSizeVariant() ? this.getObjectPath(this.getVariantSizeVariant()
            .volumePrices) : void 0
    },
    getVariantSizeVariantVolumePrice: function(amount) {
        for (var currentVolPriceObj, _return = !1, i = 0, l = this.getVariantSizeVariantVolumePrices()
                .length; l > i; i++)
            if (currentVolPriceObj = this.getVariantSizeVariantVolumePrices()[i], currentVolPriceObj.minQuantity <= amount && currentVolPriceObj.maxQuantity >= amount) return currentVolPriceObj;
        return _return
    },
    getVariantSizeVariantPrintPrice: function() {
        for (var currentVolPriceObj, _return = !1, i = 0, l = this.getVariantSizeVariantVolumePrices()
                .length; l > i; i++) return currentVolPriceObj = this.getVariantSizeVariantVolumePrices()[i];
        return _return
    },
    getColorVariantHexCodes: function(colorVariant) {
        var _hexCodesLength, _hexCode = null != colorVariant.variantOptionQualifiers[0].hexCode ? colorVariant.variantOptionQualifiers[0].hexCode : "",
            _hexCodes = [];
        if (-1 !== _hexCode.search(/\//g)) {
            _hexCodes = _hexCode.split("/"), _hexCodesLength = _hexCodes.length;
            for (var i = 0; _hexCodesLength > i; i++) - 1 === _hexCodes[i].indexOf("#") && (_hexCodes[i] = "")
        } else _hexCodes.push(_hexCode);
        return this.getObjectPath(_hexCodes)
    },
    getVariantColorVariants: function() {
        for (var _item, _itemAvailable, _sizeItem, _tmp, _arrayOfHexcodes, _arrayOfHexcodesLength, _colorTilePartWidth, _return = [], _colorObject = this.getProductVariants(), _colorObjectLength = _colorObject.length, i = 0; _colorObjectLength > i; i++) {
            _item = _colorObject[i], _itemAvailable = !1, _arrayOfHexcodes = this.getColorVariantHexCodes(_item), _arrayOfHexcodesLength = _arrayOfHexcodes.length, _colorTilePartWidth = Math.floor(100 / _arrayOfHexcodesLength);
            for (var j = 0; j < _item.sizeVariantOptions.length; j++) _sizeItem = _item.sizeVariantOptions[j], "RED" !== _sizeItem.availabilityStatus.trafficLight && (_itemAvailable = !0);
            "style" === _item.variantOptionQualifiers[0].qualifier && (_tmp = {
                color: _item.variantOptionQualifiers[0].value,
                hex: void 0 !== _arrayOfHexcodes[0] ? _arrayOfHexcodes[0] : "",
                hex2: void 0 !== _arrayOfHexcodes[1] ? _arrayOfHexcodes[1] : "",
                hex3: void 0 !== _arrayOfHexcodes[2] ? _arrayOfHexcodes[2] : "",
                hexWidth: _colorTilePartWidth + "%",
                code: _item.code,
                url: this.getShopBaseUrl() + _item.url,
                active: this.getVariantColorCode() === _item.code ? this.__SELECTED__ : "",
                image: void 0 !== _item.variantOptionQualifiers[0].image ? " url('" + _item.variantOptionQualifiers[0].image.url + "')" : "",
                availability: _itemAvailable ? this.__AVAILABLE__ : this.__SOLDOUT__,
                soldoutText: _itemAvailable ? "" : " - " + _item.sizeVariantOptions[0].availabilityStatus.displayText,
                awesomeCross: _itemAvailable ? "" : "fa fa-times"
            }, _return.push(_tmp))
        }
        return _return
    },
    getVariantColorVariant: function() {
        for (var _return = !1, _colorVariantsLength = this.getVariantColorVariants()
                .length, i = 0; _colorVariantsLength > i; i++)
            if (this.getVariantColorVariants()[i].code === this.getVariantColorCode()) return this.getVariantColorVariants()[i];
        return _return
    },
    getShopBaseUrl: function() {
        return this.getObjectPath(shop.url.base.substring(0, parseInt(shop.url.base.length - 1, 10)))
    },
    getVariantIdentifier: function() {
        return this.getVariantCode()
            .replace(/\D/g, "")
    },
    isSizeVariant: function() {
        return null !== this.currentVariantSizeCode
    },
    hasSizeVariantVolumePrices: function() {
        return this.getVariantSizeVariantVolumePrices() ? !0 : !1
    },
    hasVolumePricesPrintData: function() {
        var volPricesArray = this.getVariantSizeVariantVolumePrices();
        if (this.hasProductWaFlag() && volPricesArray)
            for (var i = 0, l = volPricesArray.length; l > i; i++)
                if (volPricesArray[i].hasOwnProperty("printPriceData")) return !0;
        return !1
    },
    hasProductWaFlag: function() {
        var waFlagObj = this.getProduct()
            .waFlag || null;
        return waFlagObj && "NONE" !== waFlagObj.code ? !0 : !1
    },
    isVariantActive: function(code) {
        return this.getVariantCode() == code
    },
    isStandardSizeVariant: function(sizeVariantOption) {
        sizeVariantOption = sizeVariantOption ? sizeVariantOption : this.getVariant()
            .sizeVariantOptions[0];
        for (var variantOptionQualifiers = sizeVariantOption.variantOptionQualifiers, variantOptionQualifiersLength = variantOptionQualifiers.length, isStandard = !1, i = 0; variantOptionQualifiersLength > i; i++) "size" === variantOptionQualifiers[i].qualifier && "Standard" === variantOptionQualifiers[i].value && (isStandard = !0);
        return isStandard
    },
    isStandardColorVariant: function() {
        return "Standard" === this.getVariant()
            .variantOptionQualifiers[0].value
    }
}, $(function() {
    function initTooltip() {
        var $t = $(this);
        if (null === $t.data("tooltip")) {
            $t.data("tooltip", $t.attr("title")), $t.removeAttr("title");
            var ttq = $t.data("tooltip-query");
            if (ttq ? $t.data("tooltip", $t.find(ttq)
                    .html()) : (ttq = $t.data("tooltip-query-global"), ttq && $t.data("tooltip", $(ttq)
                    .html())), $t.is(".hover")) {
                var src = $t.attr("src"),
                    idx = src.lastIndexOf(".");
                $t.data("n", src), $t.data("h", src.substr(0, idx) + "_hover" + src.substr(idx))
            }
        }
    }
    var $tt = $('<div class="tooltip-enlarged tooltip-bottom-left"><div class="tooltip-wrapper"></div>')
        .hide()
        .appendTo("body"),
        $currentElement = null,
        mobileDeviceEvent = "mouseup";
    $(function() {
            $(".tooltip")
                .each(initTooltip)
        }), shop.device.hasTouch ? $(document)
        .on(mobileDeviceEvent, ".tooltip", function() {
            var $t = $(this),
                pos = $t.offset(),
                spaceTop = parseInt($(document)
                    .scrollTop(), 10),
                dw = parseInt($("body")
                    .width(), 10),
                sides = "x" == $t.attr("data-tooltip-align") ? !0 : !1,
                force = $t.attr("data-tooltip-force"),
                forceBottom = "true" === $t.attr("data-tooltip-force-bottom") ? !0 : !1,
                href = $t.attr("data-href") ? $t.attr("data-href") : null;
            $currentElement = null === $currentElement ? $(this) : $currentElement, $tt.is(":visible") && $(this)
                .hasClass("tt-visible") ? href ? location.href = href : href && "#" !== href || ($tt.stop(!0, !1)
                    .hide(), $(this)
                    .removeClass("tt-visible")) : ($(this)
                    .addClass("tt-visible"), $tt.stop()
                    .show(), !$currentElement.is($(this)) && $currentElement.hasClass("tt-visible") && $currentElement.removeClass("tt-visible")), $t.data("tooltip-query") ? ($ttq = $currentElement.find($t.data("tooltip-query")), $tt.find(".tooltip-wrapper")
                    .children()
                    .each(function() {
                        $(this)
                            .appendTo($ttq)
                    })) : $currentElement.data("tooltip-query-global") ? ($ttq = $($currentElement.data("tooltip-query-global")), $tt.find(".tooltip-wrapper")
                    .children()
                    .each(function() {
                        $(this)
                            .appendTo($ttq)
                    })) : $tt.find(".tooltip-wrapper")
                .html(""), $currentElement = $(this), $tt.removeClass("tooltip-bottom-left")
                .removeClass("tooltip-bottom-right")
                .removeClass("tooltip-left-bottom")
                .removeClass("tooltip-left-top")
                .removeClass("tooltip-top-left")
                .removeClass("tooltip-top-right")
                .removeClass("tooltip-right-top")
                .removeClass("tooltip-right-bottom"), $t.data("tooltip-query") ? ($ttq = $t.find($t.data("tooltip-query")), $ttq.children()
                    .each(function() {
                        $(this)
                            .appendTo($tt.find(".tooltip-wrapper"))
                    })) : $t.data("tooltip-query-global") ? ($ttq = $($t.data("tooltip-query-global")), $ttq.children()
                    .each(function() {
                        $(this)
                            .appendTo($tt.find(".tooltip-wrapper"))
                    })) : $tt.find(".tooltip-wrapper")
                .html($t.data("tooltip")), sides ? ((parseInt(pos.left + $tt.width() + $t.width(), 10) >= dw && "bottom" !== forceBottom || "top" == forceBottom) && ($tt.css("left", parseInt(pos.left - $tt.width() - 20, 10)), parseInt(pos.top - spaceTop, 10) < $tt.height() || forceBottom ? $tt.addClass("tooltip-right-top")
                    .css("top", parseInt(pos.top - 30, 10)) : $tt.addClass("tooltip-right-bottom")
                    .css("top", parseInt(pos.top - $tt.height() + 30, 10))), (parseInt(pos.left + $tt.width() + $t.width(), 10) < dw && "top" !== forceBottom || "bottom" == forceBottom) && ($tt.css("left", parseInt(pos.left + $t.width(), 10)), parseInt(pos.top - spaceTop, 10) < $tt.height() || forceBottom ? $tt.addClass("tooltip-left-top")
                    .css("top", parseInt(pos.top - 30, 10)) : $tt.addClass("tooltip-left-bottom")
                    .css("top", parseInt(pos.top - $tt.height() + 30, 10)))) : (parseInt(pos.top - spaceTop, 10) < $tt.height() && "top" != force && ($tt.css("top", parseInt(pos.top + 20, 10)), parseInt(pos.left + $tt.width() + 40, 10) >= dw ? $tt.addClass("tooltip-top-right")
                    .css("left", pos.left + $t.width() - $tt.width() - 10) : $tt.addClass("tooltip-top-left")
                    .css("left", pos.left - 10)), parseInt(pos.top - spaceTop, 10) > $tt.height() && "bottom" != force && ($tt.css("top", parseInt(pos.top - $tt.height() - 16, 10)), parseInt(pos.left + $tt.width() + 40, 10) >= dw ? $tt.addClass("tooltip-bottom-right")
                    .css("left", parseInt(pos.left + $t.width() - $tt.width() - 10, 10)) : $tt.addClass("tooltip-bottom-left")
                    .css("left", parseInt(pos.left - 10, 10)))), $t.is(".hover") && $t.attr("src", $t.data("h"))
        }) : $(document)
        .on({
            mouseup: function() {
                var $t = $(this),
                    href = $t.attr("data-href") ? $t.attr("data-href") : null;
                $currentElement.hasClass("tt-visible") && null !== href && ($currentElement.removeClass("tt-visible"), $tt.stop(!0, !1)
                    .hide(), location.href = href)
            },
            mouseenter: function() {
                var $t = $(this),
                    pos = $t.offset(),
                    spaceTop = parseInt($(document)
                        .scrollTop(), 10),
                    dw = window.innerWidth,
                    sides = "x" == $t.attr("data-tooltip-align") ? !0 : !1,
                    force = $t.attr("data-tooltip-force") ? $t.attr("data-tooltip-force") : "left",
                    forceBottom = "true" === $t.attr("data-tooltip-force-bottom") ? "top" : "bottom";
                $currentElement = $(this), $tt.removeClass("tooltip-bottom-left")
                    .removeClass("tooltip-bottom-right")
                    .removeClass("tooltip-left-bottom")
                    .removeClass("tooltip-left-top")
                    .removeClass("tooltip-top-left")
                    .removeClass("tooltip-top-right")
                    .removeClass("tooltip-right-top")
                    .removeClass("tooltip-right-bottom"), $t.data("tooltip-query") ? ($ttq = $t.find($t.data("tooltip-query")), $ttq.children()
                        .each(function() {
                            $(this)
                                .appendTo($tt.find(".tooltip-wrapper"))
                        })) : $t.data("tooltip-query-global") ? ($ttq = $($t.data("tooltip-query-global")), $ttq.children()
                        .each(function() {
                            $(this)
                                .appendTo($tt.find(".tooltip-wrapper"))
                        })) : $tt.find(".tooltip-wrapper")
                    .html($t.data("tooltip")), sides ? ((parseInt(pos.left + $tt.width() + $t.width(), 10) >= dw && "left" != force || "right" == force) && ($tt.css("left", parseInt(pos.left - $tt.width() - 20, 10)), parseInt(pos.top - spaceTop, 10) < $tt.height() || forceBottom ? $tt.addClass("tooltip-right-top")
                        .css("top", parseInt(pos.top - 30, 10)) : $tt.addClass("tooltip-right-bottom")
                        .css("top", parseInt(pos.top - $tt.height() + 30, 10))), (parseInt(pos.left + $tt.width() + $t.width(), 10) < dw && "right" != force || "left" == force) && ($tt.css("left", parseInt(pos.left + $t.width(), 10)), parseInt(pos.top - spaceTop, 10) < $tt.height() || forceBottom ? $tt.addClass("tooltip-left-top")
                        .css("top", parseInt(pos.top - 30, 10)) : $tt.addClass("tooltip-left-bottom")
                        .css("top", parseInt(pos.top - $tt.height() + 30, 10)))) : ((parseInt(pos.top - spaceTop, 10) < $tt.height() && "bottom" !== forceBottom || "top" == forceBottom) && ($tt.css("top", parseInt(pos.top + 20, 10)), parseInt(pos.left + $tt.width() + 40, 10) >= dw ? $tt.addClass("tooltip-top-right")
                        .css("left", pos.left + $t.width() - $tt.width() - 10) : $tt.addClass("tooltip-top-left")
                        .css("left", pos.left - 10)), (parseInt(pos.top - spaceTop, 10) > $tt.height() && "top" !== forceBottom || "bottom" == forceBottom) && ($tt.css("top", parseInt(pos.top - $tt.height() - 16, 10)), parseInt(pos.left + $tt.width() + 40, 10) >= dw ? $tt.addClass("tooltip-bottom-right")
                        .css("left", parseInt(pos.left + $t.width() - $tt.width() - 10, 10)) : $tt.addClass("tooltip-bottom-left")
                        .css("left", parseInt(pos.left - 10, 10)))), $tt.stop()
                    .show(), $(this)
                    .addClass("tt-visible"), $t.is(".hover") && $t.attr("src", $t.data("h"))
            },
            mouseleave: function(ev) {
                var $t = $(this);
                return $(ev.toElement || ev.relatedTarget || ev.delegateTarget)
                    .closest(".tooltip-enlarged")
                    .size() > 0 ? ($tt.unbind("mouseleave"), void $tt.bind("mouseleave", function() {
                        $t.trigger("mouseleave")
                    })) : ($t.data("tooltip-query") ? ($ttq = $t.find($t.data("tooltip-query")), $tt.find(".tooltip-wrapper")
                            .children()
                            .each(function() {
                                $(this)
                                    .appendTo($ttq)
                            })) : $t.data("tooltip-query-global") ? ($ttq = $($t.data("tooltip-query-global")), $tt.find(".tooltip-wrapper")
                            .children()
                            .each(function() {
                                $(this)
                                    .appendTo($ttq)
                            })) : $tt.find(".tooltip-wrapper")
                        .html(""), $tt.stop(!0, !1)
                        .hide(), $(this)
                        .removeClass("tt-visible"), void($t.is(".hover") && $t.attr("src", $t.data("n"))))
            }
        }, ".tooltip")
});
var GlobalMessage = function() {
    "use strict";
    var $globalMessageID = $("#global-messages");
    this.globalMessageSelector = void 0 != $globalMessageID || void 0 != $(".global-overlay-messages") ? "#global-messages, .global-overlay-messages" : null, this.defaultErrorMessage = $globalMessageID ? $globalMessageID.data("error-message") : ""
};
GlobalMessage.prototype = {
        error: function(message) {
            "use strict";
            null != this.globalMessageSelector && (message || (message = this.defaultErrorMessage), $(this.globalMessageSelector)
                .each(function() {
                    $(this)
                        .html('<div class="information_message negative"><span class="single"></span><p>' + message + "</p></div>")
                }))
        },
        success: function(message) {
            "use strict";
            null != this.globalMessageSelector && $(this.globalMessageSelector)
                .each(function() {
                    $(this)
                        .html('<div class="information_message positive"><span class="single"></span><p>' + message + "</p></div>")
                })
        },
        hide: function() {
            "use strict";
            $(this.globalMessageSelector)
                .find(".js-message")
                .each(function(ix, element) {
                    var attr = $(element)
                        .attr("data-connected-with-elements");
                    ("undefined" == typeof attr || "" === attr) && $(element)
                        .remove()
                })
        }
    }, $(function() {
        "use strict";
        shop.add("globalMessage", {}), shop.globalMessage = new GlobalMessage
    }), "function" != typeof Object.create && (Object.create = function(obj) {
        function F() {}
        return F.prototype = obj, new F
    }),
    function($) {
        var ElevateZoom = {
            init: function(options, elem) {
                var self = this;
                self.elem = elem, self.$elem = $(elem), self.imageSrc = self.$elem.attr(self.$elem.attr("data-zoom-image") ? "data-zoom-image" : "src"), self.options = $.extend({}, $.fn.elevateZoom.options, options), self.options.tint && (self.options.lensColour = "none", self.options.lensOpacity = "1"), "inner" == self.options.zoomType && (self.options.showLens = !1), self.$elem.parent()
                    .removeAttr("title")
                    .removeAttr("alt"), self.zoomImage = self.imageSrc, self.refresh(1), $("#" + self.options.gallery + " a")
                    .click(function(e) {
                        return self.options.galleryActiveClass && ($("#" + self.options.gallery + " a")
                                .removeClass(self.options.galleryActiveClass), $(this)
                                .addClass(self.options.galleryActiveClass)), e.preventDefault(), self.zoomImagePre = $(this)
                            .data($(this)
                                .data("zoom-image") ? "zoom-image" : "image"), self.swaptheimage($(this)
                                .data("image"), self.zoomImagePre), !1
                    })
            },
            refresh: function(length) {
                var self = this;
                setTimeout(function() {
                    self.fetch(self.imageSrc)
                }, length || self.options.refresh)
            },
            fetch: function(imgsrc) {
                var self = this,
                    newImg = new Image;
                newImg.onload = function() {
                    self.largeWidth = newImg.width, self.largeHeight = newImg.height, self.startZoom(), self.currentImage = self.imageSrc, self.options.onZoomedImageLoaded(self.$elem)
                }, newImg.src = imgsrc
            },
            startZoom: function() {
                var self = this;
                if (self.nzWidth = self.$elem.width(), self.nzHeight = self.$elem.height(), self.isWindowActive = !1, self.isLensActive = !1, self.isTintActive = !1, self.overWindow = !1, self.options.imageCrossfade && (self.zoomWrap = self.$elem.wrap('<div style="height:' + self.nzHeight + "px;width:" + self.nzWidth + 'px;" class="zoomWrapper" />'), self.$elem.css("position", "absolute")), self.zoomLock = 1, self.scrollingLock = !1, self.changeBgSize = !1, self.currentZoomLevel = self.options.zoomLevel, self.nzOffset = self.$elem.offset(), self.widthRatio = self.largeWidth / self.currentZoomLevel / self.nzWidth, self.heightRatio = self.largeHeight / self.currentZoomLevel / self.nzHeight, "window" == self.options.zoomType && (self.zoomWindowStyle = "overflow: hidden;background-position: 0px 0px;text-align:center;background-color: " + String(self.options.zoomWindowBgColour) + ";width: " + String(self.options.zoomWindowWidth) + "px;height: " + String(self.options.zoomWindowHeight) + "px;float: left;background-size: " + self.largeWidth / self.currentZoomLevel + "px " + self.largeHeight / self.currentZoomLevel + "px;display: none;z-index:200;;background-repeat: no-repeat;position: absolute;"), "inner" == self.options.zoomType) {
                    var borderWidth = self.$elem.css("border-left-width");
                    self.zoomWindowStyle = "overflow: hidden;margin-left: " + String(borderWidth) + ";margin-top: " + String(borderWidth) + ";background-position: 0px 0px;width: " + String(self.nzWidth) + "px;height: " + String(self.nzHeight) + "px;float: left;display: none;cursor:" + self.options.cursor + ";px solid " + self.options.borderColour + ";background-repeat: no-repeat;position: absolute;"
                }
                "window" == self.options.zoomType && (lensHeight = self.nzHeight < self.options.zoomWindowWidth / self.widthRatio ? self.nzHeight : String(self.options.zoomWindowHeight / self.heightRatio), lensWidth = self.largeWidth < self.options.zoomWindowWidth ? self.nzWidth : self.options.zoomWindowWidth / self.widthRatio, self.lensStyle = "background-position: 0px 0px;width: " + String(self.options.zoomWindowWidth / self.widthRatio) + "px;height: " + String(self.options.zoomWindowHeight / self.heightRatio) + "px;float: right;display: none;overflow: hidden;z-index: 100;-webkit-transform: translateZ(0);opacity:" + self.options.lensOpacity + ";filter: alpha(opacity = " + 100 * self.options.lensOpacity + "); zoom:1;width:" + lensWidth + "px;height:" + lensHeight + "px;background-color:" + self.options.lensColour + ";cursor:" + self.options.cursor + ";border: " + self.options.lensBorderSize + "px solid " + self.options.lensBorderColour + ";background-repeat: no-repeat;position: absolute;"), self.tintStyle = "display: block;position: absolute;background-color: " + self.options.tintColour + ";filter:alpha(opacity=0);opacity: 0;width: " + self.nzWidth + "px;height: " + self.nzHeight + "px;", self.lensRound = "", "lens" == self.options.zoomType && (self.lensStyle = "background-position: 0px 0px;float: left;display: none;border: " + String(self.options.borderSize) + "px solid " + self.options.borderColour + ";width:" + String(self.options.lensSize) + "px;height:" + String(self.options.lensSize) + "px;background-repeat: no-repeat;position: absolute;"), "round" == self.options.lensShape && (self.lensRound = "border-top-left-radius: " + String(self.options.lensSize / 2 + self.options.borderSize) + "px;border-top-right-radius: " + String(self.options.lensSize / 2 + self.options.borderSize) + "px;border-bottom-left-radius: " + String(self.options.lensSize / 2 + self.options.borderSize) + "px;border-bottom-right-radius: " + String(self.options.lensSize / 2 + self.options.borderSize) + "px;"), self.zoomContainer = $('<div class="zoomContainer" style="-webkit-transform: translateZ(0);position:absolute;left:' + self.nzOffset.left + "px;top:" + self.nzOffset.top + "px;height:" + self.nzHeight + "px;width:" + self.nzWidth + 'px;z-index:1"></div>'), $("body")
                    .append(self.zoomContainer), self.options.containLensZoom && "lens" == self.options.zoomType && self.zoomContainer.css("overflow", "hidden"), "inner" != self.options.zoomType && (self.zoomLens = $("<div class='zoomLens' style='" + self.lensStyle + self.lensRound + "'>&nbsp;</div>")
                        .appendTo(self.zoomContainer)
                        .click(function() {
                            self.$elem.trigger("click")
                        }), self.options.tint && (self.tintContainer = $("<div/>")
                            .addClass("tintContainer"), self.zoomTint = $("<div class='zoomTint' style='" + self.tintStyle + "'></div>"), self.zoomLens.wrap(self.tintContainer), self.zoomTintcss = self.zoomLens.after(self.zoomTint), self.zoomTintImage = $('<img style="position: absolute; left: 0px; top: 0px; max-width: none; width: ' + self.nzWidth + "px; height: " + self.nzHeight + 'px;" src="' + self.imageSrc + '">')
                            .appendTo(self.zoomLens)
                            .click(function() {
                                self.$elem.trigger("click")
                            }))), self.zoomWindow = isNaN(self.options.zoomWindowPosition) ? $("<div style='z-index:100;left:" + self.windowOffsetLeft + "px;top:" + self.windowOffsetTop + "px;" + self.zoomWindowStyle + "' class='zoomWindow'>&nbsp;</div>")
                    .appendTo("body")
                    .click(function() {
                        self.$elem.trigger("click")
                    }) : $("<div style='z-index:100;left:" + self.windowOffsetLeft + "px;top:" + self.windowOffsetTop + "px;" + self.zoomWindowStyle + "' class='zoomWindow'>&nbsp;</div>")
                    .appendTo(self.zoomContainer)
                    .click(function() {
                        self.$elem.trigger("click")
                    }), self.zoomWindowContainer = $("<div/>")
                    .addClass("zoomWindowContainer")
                    .css("width", self.options.zoomWindowWidth), self.zoomWindow.wrap(self.zoomWindowContainer), "lens" == self.options.zoomType && self.zoomLens.css({
                        backgroundImage: "url('" + self.imageSrc + "')"
                    }), "window" == self.options.zoomType && self.zoomWindow.css({
                        backgroundImage: "url('" + self.imageSrc + "')"
                    }), "inner" == self.options.zoomType && self.zoomWindow.css({
                        backgroundImage: "url('" + self.imageSrc + "')"
                    }), self.$elem.bind("touchmove", function(e) {
                        e.preventDefault();
                        var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                        self.setPosition(touch)
                    }), self.zoomContainer.bind("touchmove", function(e) {
                        "inner" == self.options.zoomType && self.showHideWindow("show"), e.preventDefault();
                        var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                        self.setPosition(touch)
                    }), self.zoomContainer.bind("touchend", function() {
                        self.showHideWindow("hide"), self.options.showLens && self.showHideLens("hide"), self.options.tint && "inner" != self.options.zoomType && self.showHideTint("hide")
                    }), self.$elem.bind("touchend", function() {
                        self.showHideWindow("hide"), self.options.showLens && self.showHideLens("hide"), self.options.tint && "inner" != self.options.zoomType && self.showHideTint("hide")
                    }), self.options.showLens && (self.zoomLens.bind("touchmove", function(e) {
                        e.preventDefault();
                        var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                        self.setPosition(touch)
                    }), self.zoomLens.bind("touchend", function() {
                        self.showHideWindow("hide"), self.options.showLens && self.showHideLens("hide"), self.options.tint && "inner" != self.options.zoomType && self.showHideTint("hide")
                    }));
                var msEvents = "drag mousemove",
                    touchConfObj = {
                        swipe_velocity: .2
                    };
                self.$elem.hammer(touchConfObj)
                    .on(msEvents, function(e) {
                        0 == self.overWindow && self.setElements("show"), (self.lastX !== e.clientX || self.lastY !== e.clientY) && (self.setPosition(e), self.currentLoc = e), self.lastX = e.clientX, self.lastY = e.clientY
                    }), self.zoomContainer.hammer(touchConfObj)
                    .on(msEvents, function(e) {
                        0 == self.overWindow && self.setElements("show"), (self.lastX !== e.clientX || self.lastY !== e.clientY) && (self.setPosition(e), self.currentLoc = e), self.lastX = e.clientX, self.lastY = e.clientY
                    }), "inner" != self.options.zoomType && self.zoomLens.hammer(touchConfObj)
                    .on(msEvents, function(e) {
                        (self.lastX !== e.clientX || self.lastY !== e.clientY) && (self.setPosition(e), self.currentLoc = e), self.lastX = e.clientX, self.lastY = e.clientY
                    }), self.options.tint && "inner" != self.options.zoomType && self.zoomTint.hammer(touchConfObj)
                    .on(msEvents, function(e) {
                        (self.lastX !== e.clientX || self.lastY !== e.clientY) && (self.setPosition(e), self.currentLoc = e), self.lastX = e.clientX, self.lastY = e.clientY
                    }), "inner" == self.options.zoomType && self.zoomWindow.hammer(touchConfObj)
                    .on(msEvents, function(e) {
                        (self.lastX !== e.clientX || self.lastY !== e.clientY) && (self.setPosition(e), self.currentLoc = e), self.lastX = e.clientX, self.lastY = e.clientY
                    }), self.zoomContainer.add(self.$elem)
                    .mouseenter(function() {
                        0 == self.overWindow && self.setElements("show")
                    })
                    .mouseleave(function() {
                        self.scrollLock || self.setElements("hide")
                    }), "inner" != self.options.zoomType && self.zoomWindow.mouseenter(function() {
                        self.overWindow = !0, self.setElements("hide")
                    })
                    .mouseleave(function() {
                        self.overWindow = !1
                    }), 1 != self.options.zoomLevel, self.minZoomLevel = self.options.minZoomLevel ? self.options.minZoomLevel : 2 * self.options.scrollZoomIncrement, self.options.scrollZoom && self.zoomContainer.add(self.$elem)
                    .bind("mousewheel DOMMouseScroll MozMousePixelScroll", function(e) {
                        self.scrollLock = !0, clearTimeout($.data(this, "timer")), $.data(this, "timer", setTimeout(function() {
                            self.scrollLock = !1
                        }, 250));
                        var theEvent = e.originalEvent.wheelDelta || -1 * e.originalEvent.detail;
                        return e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault(), theEvent / 120 > 0 ? self.currentZoomLevel >= self.minZoomLevel && self.changeZoomLevel(self.currentZoomLevel - self.options.scrollZoomIncrement) : self.options.maxZoomLevel ? self.currentZoomLevel <= self.options.maxZoomLevel && self.changeZoomLevel(parseFloat(self.currentZoomLevel) + self.options.scrollZoomIncrement) : self.changeZoomLevel(parseFloat(self.currentZoomLevel) + self.options.scrollZoomIncrement), !1
                    })
            },
            setElements: function(type) {
                var self = this;
                return self.options.zoomEnabled ? ("show" == type && self.isWindowSet && ("inner" == self.options.zoomType && self.showHideWindow("show"), "window" == self.options.zoomType && self.showHideWindow("show"), self.options.showLens && self.showHideLens("show"), self.options.tint && "inner" != self.options.zoomType && self.showHideTint("show")), void("hide" == type && ("window" == self.options.zoomType && self.showHideWindow("hide"), self.options.tint || self.showHideWindow("hide"), self.options.showLens && self.showHideLens("hide"), self.options.tint && self.showHideTint("hide")))) : !1
            },
            setPosition: function(e) {
                var self = this;
                return self.options.zoomEnabled ? (self.nzHeight = self.$elem.height(), self.nzWidth = self.$elem.width(), self.nzOffset = self.$elem.offset(), self.options.tint && "inner" != self.options.zoomType && (self.zoomTint.css({
                    top: 0
                }), self.zoomTint.css({
                    left: 0
                })), self.options.responsive && !self.options.scrollZoom && self.options.showLens && (lensHeight = self.nzHeight < self.options.zoomWindowWidth / self.widthRatio ? self.nzHeight : String(self.options.zoomWindowHeight / self.heightRatio), lensWidth = self.largeWidth < self.options.zoomWindowWidth ? self.nzWidth : self.options.zoomWindowWidth / self.widthRatio, self.widthRatio = self.largeWidth / self.nzWidth, self.heightRatio = self.largeHeight / self.nzHeight, "lens" != self.options.zoomType && (lensHeight = self.nzHeight < self.options.zoomWindowWidth / self.widthRatio ? self.nzHeight : String(self.options.zoomWindowHeight / self.heightRatio), lensWidth = self.options.zoomWindowWidth < self.options.zoomWindowWidth ? self.nzWidth : self.options.zoomWindowWidth / self.widthRatio, self.zoomLens.css("width", lensWidth), self.zoomLens.css("height", lensHeight), self.options.tint && (self.zoomTintImage.css("width", self.nzWidth), self.zoomTintImage.css("height", self.nzHeight))), "lens" == self.options.zoomType && self.zoomLens.css({
                    width: String(self.options.lensSize) + "px",
                    height: String(self.options.lensSize) + "px"
                })), self.zoomContainer.css({
                    top: self.nzOffset.top
                }), self.zoomContainer.css({
                    left: self.nzOffset.left
                }), self.mouseLeft = parseInt(e.pageX - self.nzOffset.left), self.mouseTop = parseInt(e.pageY - self.nzOffset.top), "window" == self.options.zoomType && (self.Etoppos = self.mouseTop < self.zoomLens.height() / 2, self.Eboppos = self.mouseTop > self.nzHeight - self.zoomLens.height() / 2 - 2 * self.options.lensBorderSize, self.Eloppos = self.mouseLeft < 0 + self.zoomLens.width() / 2, self.Eroppos = self.mouseLeft > self.nzWidth - self.zoomLens.width() / 2 - 2 * self.options.lensBorderSize), "inner" == self.options.zoomType && (self.Etoppos = self.mouseTop < self.nzHeight / 2 / self.heightRatio, self.Eboppos = self.mouseTop > self.nzHeight - self.nzHeight / 2 / self.heightRatio, self.Eloppos = self.mouseLeft < 0 + self.nzWidth / 2 / self.widthRatio, self.Eroppos = self.mouseLeft > self.nzWidth - self.nzWidth / 2 / self.widthRatio - 2 * self.options.lensBorderSize), self.mouseLeft <= 0 || self.mouseTop < 0 || self.mouseLeft > self.nzWidth || self.mouseTop > self.nzHeight ? void self.setElements("hide") : (self.options.showLens && (self.lensLeftPos = String(self.mouseLeft - self.zoomLens.width() / 2), self.lensTopPos = String(self.mouseTop - self.zoomLens.height() / 2)), self.Etoppos && (self.lensTopPos = 0), self.Eloppos && (self.windowLeftPos = 0, self.lensLeftPos = 0, self.tintpos = 0), "window" == self.options.zoomType && (self.Eboppos && (self.lensTopPos = Math.max(self.nzHeight - self.zoomLens.height() - 2 * self.options.lensBorderSize, 0)), self.Eroppos && (self.lensLeftPos = self.nzWidth - self.zoomLens.width() - 2 * self.options.lensBorderSize)), "inner" == self.options.zoomType && (self.Eboppos && (self.lensTopPos = Math.max(self.nzHeight - 2 * self.options.lensBorderSize, 0)), self.Eroppos && (self.lensLeftPos = self.nzWidth - self.nzWidth - 2 * self.options.lensBorderSize)), "lens" == self.options.zoomType && (self.windowLeftPos = String(-1 * ((e.pageX - self.nzOffset.left) * self.widthRatio - self.zoomLens.width() / 2)), self.windowTopPos = String(-1 * ((e.pageY - self.nzOffset.top) * self.heightRatio - self.zoomLens.height() / 2)), self.zoomLens.css({
                    backgroundPosition: self.windowLeftPos + "px " + self.windowTopPos + "px"
                }), self.changeBgSize && (self.nzHeight > self.nzWidth ? ("lens" == self.options.zoomType && self.zoomLens.css({
                    "background-size": self.largeWidth / self.newvalueheight + "px " + self.largeHeight / self.newvalueheight + "px"
                }), self.zoomWindow.css({
                    "background-size": self.largeWidth / self.newvalueheight + "px " + self.largeHeight / self.newvalueheight + "px"
                })) : ("lens" == self.options.zoomType && self.zoomLens.css({
                    "background-size": self.largeWidth / self.newvaluewidth + "px " + self.largeHeight / self.newvaluewidth + "px"
                }), self.zoomWindow.css({
                    "background-size": self.largeWidth / self.newvaluewidth + "px " + self.largeHeight / self.newvaluewidth + "px"
                })), self.changeBgSize = !1), self.setWindowPostition(e)), self.options.tint && "inner" != self.options.zoomType && self.setTintPosition(e), "window" == self.options.zoomType && self.setWindowPostition(e), "inner" == self.options.zoomType && self.setWindowPostition(e), self.options.showLens && (self.fullwidth && "lens" != self.options.zoomType && (self.lensLeftPos = 0), self.zoomLens.css({
                    left: self.lensLeftPos + "px",
                    top: self.lensTopPos + "px"
                })), void 0)) : !1
            },
            showHideWindow: function(change) {
                var self = this;
                "show" == change && (self.isWindowActive || (self.options.zoomWindowFadeIn ? self.zoomWindow.stop(!0, !0, !1)
                    .fadeIn(self.options.zoomWindowFadeIn) : self.zoomWindow.show(), self.isWindowActive = !0)), "hide" == change && self.isWindowActive && (self.options.zoomWindowFadeOut ? self.zoomWindow.stop(!0, !0)
                    .fadeOut(self.options.zoomWindowFadeOut) : self.zoomWindow.hide(), self.isWindowActive = !1)
            },
            showHideLens: function(change) {
                var self = this;
                "show" == change && (self.isLensActive || (self.options.lensFadeIn ? self.zoomLens.stop(!0, !0, !1)
                    .fadeIn(self.options.lensFadeIn) : self.zoomLens.show(), self.isLensActive = !0)), "hide" == change && self.isLensActive && (self.options.lensFadeOut ? self.zoomLens.stop(!0, !0)
                    .fadeOut(self.options.lensFadeOut) : self.zoomLens.hide(), self.isLensActive = !1)
            },
            showHideTint: function(change) {
                var self = this;
                "show" == change && (self.isTintActive || (self.options.zoomTintFadeIn ? self.zoomTint.css({
                        opacity: self.options.tintOpacity
                    })
                    .animate()
                    .stop(!0, !0)
                    .fadeIn("slow") : (self.zoomTint.css({
                            opacity: self.options.tintOpacity
                        })
                        .animate(), self.zoomTint.show()), self.isTintActive = !0)), "hide" == change && self.isTintActive && (self.options.zoomTintFadeOut ? self.zoomTint.stop(!0, !0)
                    .fadeOut(self.options.zoomTintFadeOut) : self.zoomTint.hide(), self.isTintActive = !1)
            },
            setLensPostition: function() {},
            setWindowPostition: function(e) {
                var self = this;
                if (isNaN(self.options.zoomWindowPosition)) self.externalContainer = $("#" + self.options.zoomWindowPosition), self.externalContainerWidth = self.externalContainer.width(), self.externalContainerHeight = self.externalContainer.height(), self.externalContainerOffset = self.externalContainer.offset(), self.windowOffsetTop = self.externalContainerOffset.top, self.windowOffsetLeft = self.externalContainerOffset.left;
                else switch (self.options.zoomWindowPosition) {
                    case 1:
                        self.windowOffsetTop = self.options.zoomWindowOffety, self.windowOffsetLeft = +self.nzWidth;
                        break;
                    case 2:
                        self.options.zoomWindowHeight > self.nzHeight && (self.windowOffsetTop = -1 * (self.options.zoomWindowHeight / 2 - self.nzHeight / 2), self.windowOffsetLeft = self.nzWidth);
                        break;
                    case 3:
                        self.windowOffsetTop = self.nzHeight - self.zoomWindow.height() - 2 * self.options.borderSize, self.windowOffsetLeft = self.nzWidth;
                        break;
                    case 4:
                        self.windowOffsetTop = self.nzHeight, self.windowOffsetLeft = self.nzWidth;
                        break;
                    case 5:
                        self.windowOffsetTop = self.nzHeight, self.windowOffsetLeft = self.nzWidth - self.zoomWindow.width() - 2 * self.options.borderSize;
                        break;
                    case 6:
                        self.options.zoomWindowHeight > self.nzHeight && (self.windowOffsetTop = self.nzHeight, self.windowOffsetLeft = -1 * (self.options.zoomWindowWidth / 2 - self.nzWidth / 2 + 2 * self.options.borderSize));
                        break;
                    case 7:
                        self.windowOffsetTop = self.nzHeight, self.windowOffsetLeft = 0;
                        break;
                    case 8:
                        self.windowOffsetTop = self.nzHeight, self.windowOffsetLeft = -1 * (self.zoomWindow.width() + 2 * self.options.borderSize);
                        break;
                    case 9:
                        self.windowOffsetTop = self.nzHeight - self.zoomWindow.height() - 2 * self.options.borderSize, self.windowOffsetLeft = -1 * (self.zoomWindow.width() + 2 * self.options.borderSize);
                        break;
                    case 10:
                        self.options.zoomWindowHeight > self.nzHeight && (self.windowOffsetTop = -1 * (self.options.zoomWindowHeight / 2 - self.nzHeight / 2), self.windowOffsetLeft = -1 * (self.zoomWindow.width() + 2 * self.options.borderSize));
                        break;
                    case 11:
                        self.windowOffsetTop = self.options.zoomWindowOffety, self.windowOffsetLeft = -1 * (self.zoomWindow.width() + 2 * self.options.borderSize);
                        break;
                    case 12:
                        self.windowOffsetTop = -1 * (self.zoomWindow.height() + 2 * self.options.borderSize), self.windowOffsetLeft = -1 * (self.zoomWindow.width() + 2 * self.options.borderSize);
                        break;
                    case 13:
                        self.windowOffsetTop = -1 * (self.zoomWindow.height() + 2 * self.options.borderSize), self.windowOffsetLeft = 0;
                        break;
                    case 14:
                        self.options.zoomWindowHeight > self.nzHeight && (self.windowOffsetTop = -1 * (self.zoomWindow.height() + 2 * self.options.borderSize), self.windowOffsetLeft = -1 * (self.options.zoomWindowWidth / 2 - self.nzWidth / 2 + 2 * self.options.borderSize));
                        break;
                    case 15:
                        self.windowOffsetTop = -1 * (self.zoomWindow.height() + 2 * self.options.borderSize), self.windowOffsetLeft = self.nzWidth - self.zoomWindow.width() - 2 * self.options.borderSize;
                        break;
                    case 16:
                        self.windowOffsetTop = -1 * (self.zoomWindow.height() + 2 * self.options.borderSize), self.windowOffsetLeft = self.nzWidth;
                        break;
                    default:
                        self.windowOffsetTop = self.options.zoomWindowOffety, self.windowOffsetLeft = self.nzWidth
                }
                self.isWindowSet = !0, self.windowOffsetTop = self.windowOffsetTop + self.options.zoomWindowOffety, self.windowOffsetLeft = self.windowOffsetLeft + self.options.zoomWindowOffetx, self.zoomWindow.css({
                    top: self.windowOffsetTop
                }), self.zoomWindow.css({
                    left: self.windowOffsetLeft
                }), "inner" == self.options.zoomType && (self.zoomWindow.css({
                    top: 0
                }), self.zoomWindow.css({
                    left: 0
                })), self.windowLeftPos = String(-1 * ((e.pageX - self.nzOffset.left) * self.widthRatio - self.zoomWindow.width() / 2)), self.windowTopPos = String(-1 * ((e.pageY - self.nzOffset.top) * self.heightRatio - self.zoomWindow.height() / 2)), self.Etoppos && (self.windowTopPos = 0), self.Eloppos && (self.windowLeftPos = 0), self.Eboppos && (self.windowTopPos = -1 * (self.largeHeight / self.currentZoomLevel - self.zoomWindow.height())), self.Eroppos && (self.windowLeftPos = -1 * (self.largeWidth / self.currentZoomLevel - self.zoomWindow.width())), self.fullheight && (self.windowTopPos = 0), self.fullwidth && (self.windowLeftPos = 0), ("window" == self.options.zoomType || "inner" == self.options.zoomType) && (1 == self.zoomLock && (self.widthRatio <= 1 && (self.windowLeftPos = 0), self.heightRatio <= 1 && (self.windowTopPos = 0)), self.largeHeight < self.options.zoomWindowHeight && (self.windowTopPos = 0), self.largeWidth < self.options.zoomWindowWidth && (self.windowLeftPos = 0), self.options.easing ? (self.xp || (self.xp = 0), self.yp || (self.yp = 0), self.loop || (self.loop = setInterval(function() {
                    self.xp += (self.windowLeftPos - self.xp) / self.options.easingAmount, self.yp += (self.windowTopPos - self.yp) / self.options.easingAmount, self.scrollingLock ? (clearInterval(self.loop), self.xp = self.windowLeftPos, self.yp = self.windowTopPos, self.xp = -1 * ((e.pageX - self.nzOffset.left) * self.widthRatio - self.zoomWindow.width() / 2), self.yp = -1 * ((e.pageY - self.nzOffset.top) * self.heightRatio - self.zoomWindow.height() / 2), self.changeBgSize && (self.nzHeight > self.nzWidth ? ("lens" == self.options.zoomType && self.zoomLens.css({
                        "background-size": self.largeWidth / self.newvalueheight + "px " + self.largeHeight / self.newvalueheight + "px"
                    }), self.zoomWindow.css({
                        "background-size": self.largeWidth / self.newvalueheight + "px " + self.largeHeight / self.newvalueheight + "px"
                    })) : ("lens" != self.options.zoomType && self.zoomLens.css({
                        "background-size": self.largeWidth / self.newvaluewidth + "px " + self.largeHeight / self.newvalueheight + "px"
                    }), self.zoomWindow.css({
                        "background-size": self.largeWidth / self.newvaluewidth + "px " + self.largeHeight / self.newvaluewidth + "px"
                    })), self.changeBgSize = !1), self.zoomWindow.css({
                        backgroundPosition: self.windowLeftPos + "px " + self.windowTopPos + "px"
                    }), self.scrollingLock = !1, self.loop = !1) : (self.changeBgSize && (self.nzHeight > self.nzWidth ? ("lens" == self.options.zoomType && self.zoomLens.css({
                        "background-size": self.largeWidth / self.newvalueheight + "px " + self.largeHeight / self.newvalueheight + "px"
                    }), self.zoomWindow.css({
                        "background-size": self.largeWidth / self.newvalueheight + "px " + self.largeHeight / self.newvalueheight + "px"
                    })) : ("lens" != self.options.zoomType && self.zoomLens.css({
                        "background-size": self.largeWidth / self.newvaluewidth + "px " + self.largeHeight / self.newvaluewidth + "px"
                    }), self.zoomWindow.css({
                        "background-size": self.largeWidth / self.newvaluewidth + "px " + self.largeHeight / self.newvaluewidth + "px"
                    })), self.changeBgSize = !1), self.zoomWindow.css({
                        backgroundPosition: self.xp + "px " + self.yp + "px"
                    }))
                }, 16))) : (self.changeBgSize && (self.nzHeight > self.nzWidth ? ("lens" == self.options.zoomType && self.zoomLens.css({
                    "background-size": self.largeWidth / self.newvalueheight + "px " + self.largeHeight / self.newvalueheight + "px"
                }), self.zoomWindow.css({
                    "background-size": self.largeWidth / self.newvalueheight + "px " + self.largeHeight / self.newvalueheight + "px"
                })) : ("lens" == self.options.zoomType && self.zoomLens.css({
                    "background-size": self.largeWidth / self.newvaluewidth + "px " + self.largeHeight / self.newvaluewidth + "px"
                }), self.zoomWindow.css(self.largeHeight / self.newvaluewidth < self.options.zoomWindowHeight ? {
                    "background-size": self.largeWidth / self.newvaluewidth + "px " + self.largeHeight / self.newvaluewidth + "px"
                } : {
                    "background-size": self.largeWidth / self.newvalueheight + "px " + self.largeHeight / self.newvalueheight + "px"
                })), self.changeBgSize = !1), self.zoomWindow.css({
                    backgroundPosition: self.windowLeftPos + "px " + self.windowTopPos + "px"
                })))
            },
            setTintPosition: function(e) {
                var self = this;
                self.nzOffset = self.$elem.offset(), self.tintpos = String(-1 * (e.pageX - self.nzOffset.left - self.zoomLens.width() / 2)), self.tintposy = String(-1 * (e.pageY - self.nzOffset.top - self.zoomLens.height() / 2)), self.Etoppos && (self.tintposy = 0), self.Eloppos && (self.tintpos = 0), self.Eboppos && (self.tintposy = -1 * (self.nzHeight - self.zoomLens.height() - 2 * self.options.lensBorderSize)), self.Eroppos && (self.tintpos = -1 * (self.nzWidth - self.zoomLens.width() - 2 * self.options.lensBorderSize)), self.options.tint && (self.fullheight && (self.tintposy = 0), self.fullwidth && (self.tintpos = 0), self.zoomTintImage.css({
                    left: self.tintpos + "px"
                }), self.zoomTintImage.css({
                    top: self.tintposy + "px"
                }))
            },
            swaptheimage: function(smallimage, largeimage) {
                var self = this,
                    newImg = new Image;
                self.options.loadingIcon && (self.spinner = $("<div style=\"background: url('" + self.options.loadingIcon + "') no-repeat center;height:" + self.nzHeight + "px;width:" + self.nzWidth + 'px;z-index: 150;position: absolute; background-position: center center;"></div>'), self.$elem.after(self.spinner)), self.options.onImageSwap(self.$elem), newImg.onload = function() {
                    self.largeWidth = newImg.width, self.largeHeight = newImg.height, self.zoomImage = largeimage, self.zoomWindow.css({
                        "background-size": self.largeWidth + "px " + self.largeHeight + "px"
                    }), self.zoomWindow.css({
                        "background-size": self.largeWidth + "px " + self.largeHeight + "px"
                    }), self.swapAction(smallimage, largeimage)
                }, newImg.src = largeimage
            },
            swapAction: function(smallimage, largeimage) {
                var self = this,
                    newImg2 = new Image;
                if (newImg2.onload = function() {
                        self.nzHeight = newImg2.height, self.nzWidth = newImg2.width, self.options.onImageSwapComplete(self.$elem), self.doneCallback()
                    }, newImg2.src = smallimage, self.currentZoomLevel = self.options.zoomLevel, self.options.maxZoomLevel = !1, "lens" == self.options.zoomType && self.zoomLens.css({
                        backgroundImage: "url('" + largeimage + "')"
                    }), "window" == self.options.zoomType && self.zoomWindow.css({
                        backgroundImage: "url('" + largeimage + "')"
                    }), "inner" == self.options.zoomType && self.zoomWindow.css({
                        backgroundImage: "url('" + largeimage + "')"
                    }), self.currentImage = largeimage, self.options.imageCrossfade) {
                    var oldImg = self.$elem,
                        newImg = oldImg.clone();
                    if (self.$elem.attr("src", smallimage), self.$elem.after(newImg), newImg.stop(!0)
                        .fadeOut(self.options.imageCrossfade, function() {
                            $(this)
                                .remove()
                        }), self.$elem.width("auto")
                        .removeAttr("width"), self.$elem.height("auto")
                        .removeAttr("height"), oldImg.fadeIn(self.options.imageCrossfade), self.options.tint && "inner" != self.options.zoomType) {
                        var oldImgTint = self.zoomTintImage,
                            newImgTint = oldImgTint.clone();
                        self.zoomTintImage.attr("src", largeimage), self.zoomTintImage.after(newImgTint), newImgTint.stop(!0)
                            .fadeOut(self.options.imageCrossfade, function() {
                                $(this)
                                    .remove()
                            }), oldImgTint.fadeIn(self.options.imageCrossfade), self.zoomTint.css({
                                height: self.$elem.height()
                            }), self.zoomTint.css({
                                width: self.$elem.width()
                            })
                    }
                    self.zoomContainer.css("height", self.$elem.height()), self.zoomContainer.css("width", self.$elem.width()), "inner" == self.options.zoomType && (self.options.constrainType || (self.zoomWrap.parent()
                        .css("height", self.$elem.height()), self.zoomWrap.parent()
                        .css("width", self.$elem.width()), self.zoomWindow.css("height", self.$elem.height()), self.zoomWindow.css("width", self.$elem.width()))), self.options.imageCrossfade && (self.zoomWrap.css("height", self.$elem.height()), self.zoomWrap.css("width", self.$elem.width()))
                } else self.$elem.attr("src", smallimage), self.options.tint && (self.zoomTintImage.attr("src", largeimage), self.zoomTintImage.attr("height", self.$elem.height()), self.zoomTintImage.css({
                    height: self.$elem.height()
                }), self.zoomTint.css({
                    height: self.$elem.height()
                })), self.zoomContainer.css("height", self.$elem.height()), self.zoomContainer.css("width", self.$elem.width()), self.options.imageCrossfade && (self.zoomWrap.css("height", self.$elem.height()), self.zoomWrap.css("width", self.$elem.width()));
                self.options.constrainType && ("height" == self.options.constrainType && (self.zoomContainer.css("height", self.options.constrainSize), self.zoomContainer.css("width", "auto"), self.options.imageCrossfade ? (self.zoomWrap.css("height", self.options.constrainSize), self.zoomWrap.css("width", "auto"), self.constwidth = self.zoomWrap.width()) : (self.$elem.css("height", self.options.constrainSize), self.$elem.css("width", "auto"), self.constwidth = self.$elem.width()), "inner" == self.options.zoomType && (self.zoomWrap.parent()
                    .css("height", self.options.constrainSize), self.zoomWrap.parent()
                    .css("width", self.constwidth), self.zoomWindow.css("height", self.options.constrainSize), self.zoomWindow.css("width", self.constwidth)), self.options.tint && (self.tintContainer.css("height", self.options.constrainSize), self.tintContainer.css("width", self.constwidth), self.zoomTint.css("height", self.options.constrainSize), self.zoomTint.css("width", self.constwidth), self.zoomTintImage.css("height", self.options.constrainSize), self.zoomTintImage.css("width", self.constwidth))), "width" == self.options.constrainType && (self.zoomContainer.css("height", "auto"), self.zoomContainer.css("width", self.options.constrainSize), self.options.imageCrossfade ? (self.zoomWrap.css("height", "auto"), self.zoomWrap.css("width", self.options.constrainSize), self.constheight = self.zoomWrap.height()) : (self.$elem.css("height", "auto"), self.$elem.css("width", self.options.constrainSize), self.constheight = self.$elem.height()), "inner" == self.options.zoomType && (self.zoomWrap.parent()
                    .css("height", self.constheight), self.zoomWrap.parent()
                    .css("width", self.options.constrainSize), self.zoomWindow.css("height", self.constheight), self.zoomWindow.css("width", self.options.constrainSize)), self.options.tint && (self.tintContainer.css("height", self.constheight), self.tintContainer.css("width", self.options.constrainSize), self.zoomTint.css("height", self.constheight), self.zoomTint.css("width", self.options.constrainSize), self.zoomTintImage.css("height", self.constheight), self.zoomTintImage.css("width", self.options.constrainSize))))
            },
            doneCallback: function() {
                var self = this;
                self.options.loadingIcon && self.spinner.hide(), self.nzOffset = self.$elem.offset(), self.nzWidth = self.$elem.width(), self.nzHeight = self.$elem.height(), self.currentZoomLevel = self.options.zoomLevel, self.widthRatio = self.largeWidth / self.nzWidth, self.heightRatio = self.largeHeight / self.nzHeight, "window" == self.options.zoomType && (lensHeight = self.nzHeight < self.options.zoomWindowWidth / self.widthRatio ? self.nzHeight : String(self.options.zoomWindowHeight / self.heightRatio), lensWidth = self.options.zoomWindowWidth < self.options.zoomWindowWidth ? self.nzWidth : self.options.zoomWindowWidth / self.widthRatio, self.zoomLens && (self.zoomLens.css("width", lensWidth), self.zoomLens.css("height", lensHeight)))
            },
            getCurrentImage: function() {
                var self = this;
                return self.zoomImage
            },
            getGalleryList: function() {
                var self = this;
                return self.gallerylist = [], self.options.gallery ? $("#" + self.options.gallery + " a")
                    .each(function() {
                        var img_src = "";
                        $(this)
                            .data("zoom-image") ? img_src = $(this)
                            .data("zoom-image") : $(this)
                            .data("image") && (img_src = $(this)
                                .data("image")), img_src == self.zoomImage ? self.gallerylist.unshift({
                                href: "" + img_src,
                                title: $(this)
                                    .find("img")
                                    .attr("title")
                            }) : self.gallerylist.push({
                                href: "" + img_src,
                                title: $(this)
                                    .find("img")
                                    .attr("title")
                            })
                    }) : self.gallerylist.push({
                        href: "" + self.zoomImage,
                        title: $(this)
                            .find("img")
                            .attr("title")
                    }), self.gallerylist
            },
            changeZoomLevel: function(value) {
                var self = this;
                self.scrollingLock = !0, self.newvalue = parseFloat(value)
                    .toFixed(2), newvalue = parseFloat(value)
                    .toFixed(2), maxheightnewvalue = self.largeHeight / (self.options.zoomWindowHeight / self.nzHeight * self.nzHeight), maxwidthtnewvalue = self.largeWidth / (self.options.zoomWindowWidth / self.nzWidth * self.nzWidth), "inner" != self.options.zoomType && (newvalue >= maxheightnewvalue ? (self.heightRatio = self.largeHeight / maxheightnewvalue / self.nzHeight, self.newvalueheight = maxheightnewvalue, self.fullheight = !0) : (self.heightRatio = self.largeHeight / newvalue / self.nzHeight, self.newvalueheight = newvalue, self.fullheight = !1), newvalue >= maxwidthtnewvalue ? (self.widthRatio = self.largeWidth / maxwidthtnewvalue / self.nzWidth, self.newvaluewidth = maxwidthtnewvalue, self.fullwidth = !0) : (self.widthRatio = self.largeWidth / newvalue / self.nzWidth, self.newvaluewidth = newvalue, self.fullwidth = !1), "lens" == self.options.zoomType && (newvalue >= maxheightnewvalue ? (self.fullwidth = !0, self.newvaluewidth = maxheightnewvalue) : (self.widthRatio = self.largeWidth / newvalue / self.nzWidth, self.newvaluewidth = newvalue, self.fullwidth = !1))), "inner" == self.options.zoomType && (maxheightnewvalue = parseFloat(self.largeHeight / self.nzHeight)
                        .toFixed(2), maxwidthtnewvalue = parseFloat(self.largeWidth / self.nzWidth)
                        .toFixed(2), newvalue > maxheightnewvalue && (newvalue = maxheightnewvalue), newvalue > maxwidthtnewvalue && (newvalue = maxwidthtnewvalue), newvalue >= maxheightnewvalue ? (self.heightRatio = self.largeHeight / newvalue / self.nzHeight, self.newvalueheight = newvalue > maxheightnewvalue ? maxheightnewvalue : newvalue, self.fullheight = !0) : (self.heightRatio = self.largeHeight / newvalue / self.nzHeight, self.newvalueheight = newvalue > maxheightnewvalue ? maxheightnewvalue : newvalue, self.fullheight = !1), newvalue >= maxwidthtnewvalue ? (self.widthRatio = self.largeWidth / newvalue / self.nzWidth, self.newvaluewidth = newvalue > maxwidthtnewvalue ? maxwidthtnewvalue : newvalue, self.fullwidth = !0) : (self.widthRatio = self.largeWidth / newvalue / self.nzWidth, self.newvaluewidth = newvalue, self.fullwidth = !1)), scrcontinue = !1, "inner" == self.options.zoomType && (self.nzWidth > self.nzHeight && (self.newvaluewidth <= maxwidthtnewvalue ? scrcontinue = !0 : (scrcontinue = !1, self.fullheight = !0, self.fullwidth = !0)), self.nzHeight > self.nzWidth && (self.newvaluewidth <= maxwidthtnewvalue ? scrcontinue = !0 : (scrcontinue = !1, self.fullheight = !0, self.fullwidth = !0))), "inner" != self.options.zoomType && (scrcontinue = !0), scrcontinue && (self.zoomLock = 0, self.changeZoom = !0, self.options.zoomWindowHeight / self.heightRatio <= self.nzHeight && (self.currentZoomLevel = self.newvalueheight, "lens" != self.options.zoomType && "inner" != self.options.zoomType && (self.changeBgSize = !0, self.zoomLens.css({
                        height: String(self.options.zoomWindowHeight / self.heightRatio) + "px"
                    })), ("lens" == self.options.zoomType || "inner" == self.options.zoomType) && (self.changeBgSize = !0)), self.options.zoomWindowWidth / self.widthRatio <= self.nzWidth && ("inner" != self.options.zoomType && self.newvaluewidth > self.newvalueheight && (self.currentZoomLevel = self.newvaluewidth), "lens" != self.options.zoomType && "inner" != self.options.zoomType && (self.changeBgSize = !0, self.zoomLens.css({
                        width: String(self.options.zoomWindowWidth / self.widthRatio) + "px"
                    })), ("lens" == self.options.zoomType || "inner" == self.options.zoomType) && (self.changeBgSize = !0)), "inner" == self.options.zoomType && (self.changeBgSize = !0, self.nzWidth > self.nzHeight && (self.currentZoomLevel = self.newvaluewidth), self.nzHeight > self.nzWidth && (self.currentZoomLevel = self.newvaluewidth))), self.setPosition(self.currentLoc)
            },
            closeAll: function() {
                self.zoomWindow && self.zoomWindow.hide(), self.zoomLens && self.zoomLens.hide(), self.zoomTint && self.zoomTint.hide()
            },
            changeState: function(value) {
                var self = this;
                "enable" == value && (self.options.zoomEnabled = !0), "disable" == value && (self.options.zoomEnabled = !1)
            }
        };
        $.fn.elevateZoom = function(options) {
            return this.each(function() {
                var elevate = Object.create(ElevateZoom);
                elevate.init(options, this), $.data(this, "elevateZoom", elevate)
            })
        }, $.fn.elevateZoom.options = {
            zoomActivation: "hover",
            zoomEnabled: !0,
            preloading: 1,
            zoomLevel: 1,
            scrollZoom: !1,
            scrollZoomIncrement: .1,
            minZoomLevel: !1,
            maxZoomLevel: !1,
            easing: !1,
            easingAmount: 12,
            lensSize: 200,
            zoomWindowWidth: 400,
            zoomWindowHeight: 400,
            zoomWindowOffetx: 0,
            zoomWindowOffety: 0,
            zoomWindowPosition: 1,
            zoomWindowBgColour: "#fff",
            lensFadeIn: !1,
            lensFadeOut: !1,
            debug: !1,
            zoomWindowFadeIn: !1,
            zoomWindowFadeOut: !1,
            zoomWindowAlwaysShow: !1,
            zoomTintFadeIn: !1,
            zoomTintFadeOut: !1,
            borderSize: 4,
            showLens: !0,
            borderColour: "#888",
            lensBorderSize: 1,
            lensBorderColour: "#000",
            lensShape: "square",
            zoomType: "window",
            containLensZoom: !1,
            lensColour: "white",
            lensOpacity: .4,
            lenszoom: !1,
            tint: !1,
            tintColour: "#333",
            tintOpacity: .4,
            gallery: !1,
            galleryActiveClass: "zoomGalleryActive",
            imageCrossfade: !1,
            constrainType: !1,
            constrainSize: !1,
            loadingIcon: !1,
            cursor: "default",
            responsive: !0,
            onComplete: $.noop,
            onZoomedImageLoaded: function() {},
            onImageSwap: $.noop,
            onImageSwapComplete: $.noop
        }
    }(jQuery, window, document),
    function($) {
        "use strict";
        if ($.zepto && !$.fn.removeData) throw new ReferenceError("Zepto is loaded without the data module.");
        $.fn.noUiSlider = function(options, rebuild) {
            function fromPercentage(range, value) {
                return 100 * value / (range[1] - range[0])
            }

            function toPercentage(range, value) {
                return fromPercentage(range, range[0] < 0 ? value + Math.abs(range[0]) : value - range[0])
            }

            function isPercentage(range, value) {
                return value * (range[1] - range[0]) / 100 + range[0]
            }

            function isInstance(a) {
                return a instanceof $ || $.zepto && $.zepto.isZ(a)
            }

            function isNumeric(a) {
                return !isNaN(parseFloat(a)) && isFinite(a)
            }

            function call(functions, scope) {
                $.isArray(functions) || (functions = [functions]), $.each(functions, function() {
                    "function" == typeof this && this.call(scope)
                })
            }

            function setN(target, number) {
                return function() {
                    var val = [null, null];
                    val[number] = $(this)
                        .val(), target.val(val, !0)
                }
            }

            function closest(value, to) {
                return Math.round(value / to) * to
            }

            function format(value, options) {
                return value = value.toFixed(options.decimals), 0 === parseFloat(value) && (value = value.replace("-0", "0")), value.replace(".", options.serialization.mark)
            }

            function closestHandle(handles, location, style) {
                if (1 === handles.length) return handles[0];
                var total = handles[0].offset()[style] + handles[1].offset()[style];
                return handles[total / 2 > location ? 0 : 1]
            }

            function digits(value, round) {
                return parseFloat(value.toFixed(round))
            }

            function fixEvent(e) {
                e.preventDefault();
                var x, y, touch = 0 === e.type.indexOf("touch"),
                    mouse = 0 === e.type.indexOf("mouse"),
                    pointer = 0 === e.type.indexOf("pointer"),
                    event = e;
                return 0 === e.type.indexOf("MSPointer") && (pointer = !0), e.originalEvent && (e = e.originalEvent), touch && (x = e.changedTouches[0].pageX, y = e.changedTouches[0].pageY), (mouse || pointer) && (pointer || void 0 !== window.pageXOffset || (window.pageXOffset = document.documentElement.scrollLeft, window.pageYOffset = document.documentElement.scrollTop), x = e.clientX + window.pageXOffset, y = e.clientY + window.pageYOffset), $.extend(event, {
                    pointX: x,
                    pointY: y,
                    cursor: mouse
                })
            }

            function attach(events, element, callback, pass) {
                var target = pass.target;
                return events = events.replace(/\s/g, namespace + " ") + namespace, element.on(events, function(e) {
                    var disabled = target.attr("disabled");
                    return disabled = !(void 0 === disabled || null === disabled), target.hasClass("noUi-state-tap") || disabled ? !1 : void callback(fixEvent(e), pass, target.data("base")
                        .data("options"))
                })
            }

            function serialize(a) {
                var target = this.target;
                return void 0 === a ? this.element.data("value") : (a === !0 ? a = this.element.data("value") : this.element.data("value", a), void(void 0 !== a && $.each(this.elements, function() {
                    "function" == typeof this ? this.call(target, a) : this[0][this[1]](a)
                })))
            }

            function storeElement(handle, item, number) {
                if (isInstance(item)) {
                    var elements = [],
                        target = handle.data("target");
                    return handle.data("options")
                        .direction && (number = number ? 0 : 1), item.each(function() {
                            $(this)
                                .on("change" + namespace, setN(target, number)), elements.push([$(this), "val"])
                        }), elements
                }
                return "string" == typeof item && (item = [$('<input type="hidden" name="' + item + '">')
                    .appendTo(handle)
                    .addClass(clsList[3])
                    .change(function(e) {
                        e.stopPropagation()
                    }), "val"
                ]), [item]
            }

            function store(handle, i, serialization) {
                var elements = [];
                return $.each(serialization.to[i], function(index) {
                    elements = elements.concat(storeElement(handle, serialization.to[i][index], i))
                }), {
                    element: handle,
                    elements: elements,
                    target: handle.data("target"),
                    val: serialize
                }
            }

            function block(base, stateless) {
                var target = base.data("target");
                target.hasClass(clsList[14]) || (stateless || (target.addClass(clsList[15]), setTimeout(function() {
                    target.removeClass(clsList[15])
                }, 450)), target.addClass(clsList[14]), call(base.data("options")
                    .block, target))
            }

            function placeHandle(handle, to) {
                var settings = handle.data("options");
                to = digits(to, 7), handle.data("target")
                    .removeClass(clsList[14]), handle.css(settings.style, to + "%")
                    .data("pct", to), handle.is(":first-child") && handle.toggleClass(clsList[13], to > 50), settings.direction && (to = 100 - to), handle.data("store")
                    .val(format(isPercentage(settings.range, to), settings))
            }

            function setHandle(handle, to) {
                var base = handle.data("base"),
                    settings = base.data("options"),
                    handles = base.data("handles"),
                    lower = 0,
                    upper = 100;
                return isNumeric(to) ? (settings.step && (to = closest(to, settings.step)), handles.length > 1 && (handle[0] !== handles[0][0] ? lower = digits(handles[0].data("pct") + settings.margin, 7) : upper = digits(handles[1].data("pct") - settings.margin, 7)), to = Math.min(Math.max(to, lower), 0 > upper ? 100 : upper), to === handle.data("pct") ? [lower ? lower : !1, 100 === upper ? !1 : upper] : (placeHandle(handle, to), !0)) : !1
            }

            function jump(base, handle, to, callbacks) {
                base.addClass(clsList[5]), setTimeout(function() {
                        base.removeClass(clsList[5])
                    }, 300), setHandle(handle, to), call(callbacks, base.data("target")), base.data("target")
                    .change()
            }

            function move(event, Dt, Op) {
                var limits, handles = Dt.handles,
                    proposal = event[Dt.point] - Dt.start[Dt.point];
                if (proposal = 100 * proposal / Dt.size, 1 === handles.length) {
                    if (limits = setHandle(handles[0], Dt.positions[0] + proposal), limits !== !0) return void($.inArray(handles[0].data("pct"), limits) >= 0 && block(Dt.base, !Op.margin))
                } else {
                    var l1, u1, l2, u2;
                    if (Op.step && (proposal = closest(proposal, Op.step)), l1 = l2 = Dt.positions[0] + proposal, u1 = u2 = Dt.positions[1] + proposal, 0 > l1 ? (u1 += -1 * l1, l1 = 0) : u1 > 100 && (l1 -= u1 - 100, u1 = 100), 0 > l2 && !l1 && !handles[0].data("pct")) return;
                    if (100 === u1 && u2 > 100 && 100 === handles[1].data("pct")) return;
                    placeHandle(handles[0], l1), placeHandle(handles[1], u1)
                }
                call(Op.slide, Dt.target)
            }

            function end(event, Dt, Op) {
                1 === Dt.handles.length && Dt.handles[0].data("grab")
                    .removeClass(clsList[4]), event.cursor && body.css("cursor", "")
                    .off(namespace), doc.off(namespace), Dt.target.removeClass(clsList[14] + " " + clsList[20])
                    .change(), call(Op.set, Dt.target)
            }

            function start(event, Dt, Op) {
                1 === Dt.handles.length && Dt.handles[0].data("grab")
                    .addClass(clsList[4]), event.stopPropagation(), attach(actions.move, doc, move, {
                        start: event,
                        base: Dt.base,
                        target: Dt.target,
                        handles: Dt.handles,
                        positions: [Dt.handles[0].data("pct"), Dt.handles[Dt.handles.length - 1].data("pct")],
                        point: Op.orientation ? "pointY" : "pointX",
                        size: Op.orientation ? Dt.base.height() : Dt.base.width()
                    }), attach(actions.end, doc, end, {
                        target: Dt.target,
                        handles: Dt.handles
                    }), event.cursor && (body.css("cursor", $(event.target)
                        .css("cursor")), Dt.handles.length > 1 && Dt.target.addClass(clsList[20]), body.on("selectstart" + namespace, function() {
                        return !1
                    }))
            }

            function tap(event, Dt, Op) {
                var handle, to, point, size, base = Dt.base;
                event.stopPropagation(), Op.orientation ? (point = event.pointY, size = base.height()) : (point = event.pointX, size = base.width()), handle = closestHandle(base.data("handles"), point, Op.style), to = 100 * (point - base.offset()[Op.style]) / size, jump(base, handle, to, [Op.slide, Op.set])
            }

            function edge(event, Dt, Op) {
                var to, i, handles = Dt.base.data("handles");
                i = Op.orientation ? event.pointY : event.pointX, i = i < Dt.base.offset()[Op.style], to = i ? 0 : 100, i = i ? 0 : handles.length - 1, jump(Dt.base, handles[i], to, [Op.slide, Op.set])
            }

            function test(input, sliders) {
                function values(a) {
                    return 2 !== a.length ? !1 : (a = [parseFloat(a[0]), parseFloat(a[1])], isNumeric(a[0]) && isNumeric(a[1]) ? a[1] < a[0] ? !1 : a : !1)
                }
                var serialization = {
                        resolution: function(q, o) {
                            switch (q) {
                                case 1:
                                case .1:
                                case .01:
                                case .001:
                                case 1e-4:
                                case 1e-5:
                                    q = q.toString()
                                        .split("."), o.decimals = "1" === q[0] ? 0 : q[1].length;
                                    break;
                                case void 0:
                                    o.decimals = 2;
                                    break;
                                default:
                                    return !1
                            }
                            return !0
                        },
                        mark: function(q, o, w) {
                            if (!q) return o[w].mark = ".", !0;
                            switch (q) {
                                case ".":
                                case ",":
                                    return !0;
                                default:
                                    return !1
                            }
                        },
                        to: function(q, o, w) {
                            function ser(r) {
                                return isInstance(r) || "string" == typeof r || "function" == typeof r || r === !1 || isInstance(r[0]) && "function" == typeof r[0][r[1]]
                            }

                            function filter(value) {
                                var items = [
                                    [],
                                    []
                                ];
                                return ser(value) ? items[0].push(value) : $.each(value, function(i, val) {
                                    i > 1 || (ser(val) ? items[i].push(val) : items[i] = items[i].concat(val))
                                }), items
                            }
                            if (q) {
                                var i, j;
                                for (q = filter(q), o.direction && q[1].length && q.reverse(), i = 0; i < o.handles; i++)
                                    for (j = 0; j < q[i].length; j++) {
                                        if (!ser(q[i][j])) return !1;
                                        q[i][j] || q[i].splice(j, 1)
                                    }
                                o[w].to = q
                            } else o[w].to = [
                                [],
                                []
                            ];
                            return !0
                        }
                    },
                    tests = {
                        handles: {
                            r: !0,
                            t: function(q) {
                                return q = parseInt(q, 10), 1 === q || 2 === q
                            }
                        },
                        range: {
                            r: !0,
                            t: function(q, o, w) {
                                return o[w] = values(q), o[w] && o[w][0] !== o[w][1]
                            }
                        },
                        start: {
                            r: !0,
                            t: function(q, o, w) {
                                return 1 === o.handles ? ($.isArray(q) && (q = q[0]), q = parseFloat(q), o.start = [q], isNumeric(q)) : (o[w] = values(q), !!o[w])
                            }
                        },
                        connect: {
                            r: !0,
                            t: function(q, o, w) {
                                if ("lower" === q) o[w] = 1;
                                else if ("upper" === q) o[w] = 2;
                                else if (q === !0) o[w] = 3;
                                else {
                                    if (q !== !1) return !1;
                                    o[w] = 0
                                }
                                return !0
                            }
                        },
                        orientation: {
                            t: function(q, o, w) {
                                switch (q) {
                                    case "horizontal":
                                        o[w] = 0;
                                        break;
                                    case "vertical":
                                        o[w] = 1;
                                        break;
                                    default:
                                        return !1
                                }
                                return !0
                            }
                        },
                        margin: {
                            r: !0,
                            t: function(q, o, w) {
                                return q = parseFloat(q), o[w] = fromPercentage(o.range, q), isNumeric(q)
                            }
                        },
                        direction: {
                            r: !0,
                            t: function(q, o, w) {
                                switch (q) {
                                    case "ltr":
                                        o[w] = 0;
                                        break;
                                    case "rtl":
                                        o[w] = 1, o.connect = [0, 2, 1, 3][o.connect];
                                        break;
                                    default:
                                        return !1
                                }
                                return !0
                            }
                        },
                        behaviour: {
                            r: !0,
                            t: function(q, o, w) {
                                return o[w] = {
                                        tap: q !== (q = q.replace("tap", "")),
                                        extend: q !== (q = q.replace("extend", "")),
                                        drag: q !== (q = q.replace("drag", "")),
                                        fixed: q !== (q = q.replace("fixed", ""))
                                    }, !q.replace("none", "")
                                    .replace(/\-/g, "")
                            }
                        },
                        serialization: {
                            r: !0,
                            t: function(q, o, w) {
                                return serialization.to(q.to, o, w) && serialization.resolution(q.resolution, o) && serialization.mark(q.mark, o, w)
                            }
                        },
                        slide: {
                            t: function(q) {
                                return $.isFunction(q)
                            }
                        },
                        set: {
                            t: function(q) {
                                return $.isFunction(q)
                            }
                        },
                        block: {
                            t: function(q) {
                                return $.isFunction(q)
                            }
                        },
                        step: {
                            t: function(q, o, w) {
                                return q = parseFloat(q), o[w] = fromPercentage(o.range, q), isNumeric(q)
                            }
                        }
                    };
                $.each(tests, function(name, test) {
                    var value = input[name],
                        isSet = void 0 !== value;
                    if (test.r && !isSet || isSet && !test.t(value, input, name)) throw console && console.log && console.group && (console.group("Invalid noUiSlider initialisation:"), console.log("Option:	", name), console.log("Value:	", value), console.log("Slider(s):	", sliders), console.groupEnd()), new RangeError("noUiSlider")
                })
            }

            function create(options) {
                return this.data("options", $.extend(!0, {}, options)), options = $.extend({
                    handles: 2,
                    margin: 0,
                    connect: !1,
                    direction: "ltr",
                    behaviour: "tap",
                    orientation: "horizontal"
                }, options), options.serialization = options.serialization || {}, test(options, this), options.style = options.orientation ? "top" : "left", this.each(function() {
                    var i, dragable, handle, target = $(this),
                        handles = [],
                        base = $("<div/>")
                        .appendTo(target);
                    if (target.data("base")) throw new Error("Slider was already initialized.");
                    for (target.data("base", base)
                        .addClass([clsList[6], clsList[16 + options.direction], clsList[10 + options.orientation]].join(" ")), i = 0; i < options.handles; i++) handle = $("<div><div/></div>")
                        .appendTo(base), handle.addClass(clsList[1]), handle.children()
                        .addClass([clsList[2], clsList[2] + clsList[7 + options.direction + (options.direction ? -1 * i : i)]].join(" ")), handle.data({
                            base: base,
                            target: target,
                            options: options,
                            grab: handle.children(),
                            pct: -1
                        })
                        .attr("data-style", options.style), handle.data({
                            store: store(handle, i, options.serialization)
                        }), handles.push(handle);
                    switch (options.connect) {
                        case 1:
                            target.addClass(clsList[9]), handles[0].addClass(clsList[12]);
                            break;
                        case 3:
                            handles[1].addClass(clsList[12]);
                        case 2:
                            handles[0].addClass(clsList[9]);
                        case 0:
                            target.addClass(clsList[12])
                    }
                    if (base.addClass(clsList[0])
                        .data({
                            target: target,
                            options: options,
                            handles: handles
                        }), target.val(options.start), !options.behaviour.fixed)
                        for (i = 0; i < handles.length; i++) attach(actions.start, handles[i].children(), start, {
                            base: base,
                            target: target,
                            handles: [handles[i]]
                        });
                    options.behaviour.tap && attach(actions.start, base, tap, {
                        base: base,
                        target: target
                    }), options.behaviour.extend && (target.addClass(clsList[19]), options.behaviour.tap && attach(actions.start, target, edge, {
                        base: base,
                        target: target
                    })), options.behaviour.drag && (dragable = base.find("." + clsList[9])
                        .addClass(clsList[18]), options.behaviour.fixed && (dragable = dragable.add(base.children()
                            .not(dragable)
                            .data("grab"))), attach(actions.start, dragable, start, {
                            base: base,
                            target: target,
                            handles: handles
                        }))
                })
            }

            function getValue() {
                var base = $(this)
                    .data("base"),
                    answer = [];
                return $.each(base.data("handles"), function() {
                        answer.push($(this)
                            .data("store")
                            .val())
                    }), 1 === answer.length ? answer[0] : base.data("options")
                    .direction ? answer.reverse() : answer
            }

            function setValue(args, set) {
                return $.isArray(args) || (args = [args]), this.each(function() {
                    var to, i, b = $(this)
                        .data("base"),
                        handles = Array.prototype.slice.call(b.data("handles"), 0),
                        settings = b.data("options");
                    for (handles.length > 1 && (handles[2] = handles[0]), settings.direction && args.reverse(), i = 0; i < handles.length; i++) to = args[i % 2], null !== to && void 0 !== to && ("string" === $.type(to) && (to = to.replace(",", ".")), to = toPercentage(settings.range, parseFloat(to)), settings.direction && (to = 100 - to), setHandle(handles[i], to) !== !0 && handles[i].data("store")
                        .val(!0), set === !0 && call(settings.set, $(this)))
                })
            }

            function destroy(target) {
                var elements = [
                    [target, ""]
                ];
                $.each(target.data("base")
                        .data("handles"),
                        function() {
                            elements = elements.concat($(this)
                                .data("store")
                                .elements)
                        }), $.each(elements, function() {
                        this.length > 1 && this[0].off(namespace)
                    }), target.removeClass(clsList.join(" ")), target.empty()
                    .removeData("base options")
            }

            function build(options) {
                return this.each(function() {
                    var values = $(this)
                        .val() || !1,
                        current = $(this)
                        .data("options"),
                        setup = $.extend({}, current, options);
                    values !== !1 && destroy($(this)), options && ($(this)
                        .noUiSlider(setup), values !== !1 && setup.start === current.start && $(this)
                        .val(values))
                })
            }
            var doc = $(document),
                body = $("body"),
                namespace = ".nui",
                $VAL = $.fn.val,
                clsList = ["noUi-base", "noUi-origin", "noUi-handle", "noUi-input", "noUi-active", "noUi-state-tap", "noUi-target", "-lower", "-upper", "noUi-connect", "noUi-horizontal", "noUi-vertical", "noUi-background", "noUi-stacking", "noUi-block", "noUi-state-blocked", "noUi-ltr", "noUi-rtl", "noUi-dragable", "noUi-extended", "noUi-state-drag"],
                actions = window.navigator.pointerEnabled ? {
                    start: "pointerdown",
                    move: "pointermove",
                    end: "pointerup"
                } : window.navigator.msPointerEnabled ? {
                    start: "MSPointerDown",
                    move: "MSPointerMove",
                    end: "MSPointerUp"
                } : {
                    start: "mousedown touchstart",
                    move: "mousemove touchmove",
                    end: "mouseup touchend"
                };
            return $.fn.val = function() {
                    return this.hasClass(clsList[6]) ? arguments.length ? setValue.apply(this, arguments) : getValue.apply(this) : $VAL.apply(this, arguments)
                }, (rebuild ? build : create)
                .call(this, options)
        }
    }(window.jQuery || window.Zepto), JSON.stringify = JSON.stringify || function(obj) {
        var t = typeof obj;
        if ("object" != t || null === obj) return "string" == t && (obj = '"' + obj + '"'), String(obj);
        var n, v, json = [],
            arr = obj && obj.constructor == Array;
        for (n in obj) v = obj[n], t = typeof v, "string" == t ? v = '"' + v + '"' : "object" == t && null !== v && (v = JSON.stringify(v)), json.push((arr ? "" : '"' + n + '":') + String(v));
        return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}")
    };
var RootNavigationElement = function($element) {
    "use strict";
    this.navigationElement = $element, this.hoverBackground = void 0 != $element.attr("data-background-hover") ? $element.attr("data-background-hover") : null, this.hoverColor = void 0 != $element.attr("data-color-hover") ? $element.attr("data-color-hover") : null, this.normalBackground = void 0 != $element.attr("data-background-normal") ? $element.attr("data-background-normal") : $element.css("background"), this.normalColor = void 0 != $element.attr("data-color-normal") ? $element.attr("data-color-normal") : $element.find(".deco")
        .first()
        .css("color"), this.activeBackground = void 0 != $element.attr("data-background-active") ? $element.attr("data-background-active") : null, this.activeColor = void 0 != $element.attr("data-color-active") ? $element.attr("data-color-active") : null, this.configureNavigationElement()
};
RootNavigationElement.prototype = {
    _setNormalAndActiveColors: function() {
        "use strict";
        return this.navigationElement.hasClass("active") && this.activeColor ? this.navigationElement.find(".deco")
            .first()
            .css("color", this.activeColor) : void 0 != this.navigationElement.attr("data-color-normal") && this.navigationElement.find(".deco")
            .first()
            .css("color", this.normalColor), this.navigationElement.hasClass("active") && this.activeBackground && this.navigationElement.css("background", this.activeBackground), this
    },
    _setHoverColors: function() {
        "use strict";
        var self = this;
        return (this.hoverBackground || this.hoverColor) && this.navigationElement.hover(function() {
            self.hoverBackground && $(this)
                .css("background", self.hoverBackground), self.hoverColor && $(this)
                .find(".deco")
                .first()
                .css("color", self.hoverColor)
        }, function() {
            $(this)
                .hasClass("active") ? (self.activeBackground ? $(this)
                    .css("background", self.activeBackground) : $(this)
                    .css("background", self.normalBackground), self.activeColor ? $(this)
                    .find(".deco")
                    .first()
                    .css("color", self.activeColor) : $(this)
                    .find(".deco")
                    .first()
                    .css("color", self.normalColor)) : ($(this)
                    .css("background", self.normalBackground), $(this)
                    .find(".deco")
                    .first()
                    .css("color", self.normalColor))
        }), this
    },
    configureNavigationElement: function() {
        "use strict";
        return this._setNormalAndActiveColors(), this._setHoverColors(), this
    }
};
var ValidateForm = function() {
    "use strict";
    this.formElement = ".js-form-common", this.requiredElementSelector = ".js-required-element", this.emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/, this.postalcodeRegex = /.*[0-9].*/, this.containsANumberRegex = /[0-9]+/, this.containsThreeDifferentLettersRegex = /([a-zA-Z][^a-zA-Z]*){3,}/, this.acceptOnlyNumbersRegex = /^\d*$/, this.acceptOnlyNumbersAndWhitespacesRegex = /^[\d\s]*$/, this.bindValidationEvents()
};
ValidateForm.prototype = {
        _validate: function($element) {
            "use strict";
            var elementName = $element.attr("name"),
                elementIndexOfPoint = elementName.indexOf("."),
                elementType = $element.attr("type"),
                elementValue = $element.val();
            if (-1 !== elementIndexOfPoint && (elementName = elementName.substr(elementIndexOfPoint + 1)), "text" === elementType) switch (elementName) {
                    case "email":
                    case "newEmail":
                    case "newUid":
                        this._validateEmail($element);
                        break;
                    case "checkNewEmail":
                        var newEmail = void 0 != $(this.formElement)
                            .find(".js-new-email-validation") ? $(this.formElement)
                            .find(".js-new-email-validation")
                            .val() : "";
                        this._validateEmail($element), newEmail !== $element.val() && this._showError($element);
                        break;
                    case "birthdateDay":
                        elementValue >= 1 && 31 >= elementValue ? this._validateNumeric($element, 1, 2) : this._showError($element);
                        break;
                    case "birthdateMonth":
                        elementValue >= 1 && 12 >= elementValue ? this._validateNumeric($element, 1, 2) : this._showError($element);
                        break;
                    case "birthdateYear":
                        var date = new Date;
                        elementValue >= 1900 && elementValue <= date.getFullYear() ? this._validateNumeric($element, 4, 4) : this._showError($element);
                        break;
                    case "bonusCode":
                        this._validateNumeric($element, 0, 6);
                        break;
                    case "additionToAddress":
                        this._validateInput($element, 0, 100);
                        break;
                    case "mobileNr":
                        this._validateNumeric($element, 1, 50, !0);
                        break;
                    case "phoneNumber":
                        this._validateNumeric($element, 0, 50, !0);
                        break;
                    case "additionToCompany":
                        this._validateInput($element, 0);
                        break;
                    case "department":
                        this._validateInput($element, 0, 35);
                        break;
                    case "companyName":
                        $(".js-company-area")
                            .is(":visible") && this._validateInput($element);
                        break;
                    case "dpCustomerId":
                    case "packstationId":
                        this._validateNumeric($element, 1, 10);
                        break;
                    case "postcode":
                        $element.parents()
                            .hasClass("js-packstation") ? this._validateNumeric($element, 5, 5) : this._validatePostalcode($element, 1, 10);
                        break;
                    case "oldUid":
                        this._validateInput($element, 1, 255, !0);
                        break;
                    case "company":
                        $(".js-company-area")
                            .is(":visible") && this._validateInput($element, 1, 255, !0);
                        break;
                    case "ustId":
                        $(".js-company-area")
                            .is(":visible") && !$('input[name="ustIdNotAvailable"]')
                            .is(":checked") && this._validateInput($element, 1, 255, !0);
                        break;
                    default:
                        this._validateInput($element)
                } else if ("password" === elementType) this._validatePassword($element);
                else if ("checkbox" === elementType) $element.is(":checked") ? this._hideError($element, !0) : this._showError($element);
            else if ("radio" === elementType) {
                if ("titleCode" === elementName) {
                    for (var titles = $(this.formElement)
                            .find(".js-title-validation"), titlesLength = titles.length, isTitleChecked = !1, i = 0; titlesLength > i; i++) $(titles[i])
                        .is(":checked") && (isTitleChecked = !0);
                    isTitleChecked ? this._hideError($element, !0) : this._showError($element)
                }
            } else "feedback" === elementName ? this._validateInput($element, 1, 400) : "subject" === elementName && (null === elementValue ? this._showError($element) : this._hideError($element, !0));
            return this
        },
        _showError: function(element) {
            "use strict";
            return element.removeClass("validate-success")
                .addClass("validate-error"), element.parents(".form_field-input")
                .next()
                .hasClass("form_field_error-message") || element.parents(".form_field-input")
                .after('<div class="form_field_error-message"><span>' + element.attr("data-error-message") + "</span></div>"), this
        },
        _hideError: function(element, noSuccessImage) {
            "use strict";
            return element.removeClass("validate-error"), noSuccessImage ? element.removeClass("validate-success") : element.addClass("validate-success"), element.parents(".form_field-input")
                .next()
                .hasClass("form_field_error-message") && element.parents(".form_field-input")
                .next()
                .remove(), this
        },
        _validateEmail: function(emailElement) {
            "use strict";
            var email = emailElement.val();
            return email.match(this.emailRegex) ? this._hideError(emailElement) : this._showError(emailElement), this
        },
        _validatePassword: function(element) {
            "use strict";
            var $password = $(this.formElement)
                .find(".js-password-validation:visible"),
                $checkPassword = $(this.formElement)
                .find(".js-check-password-validation:visible"),
                passwordValue = void 0 != $password ? $password.val() : "",
                checkPasswordValue = void 0 != $checkPassword ? $checkPassword.val() : "";
            return element.hasClass("js-check-password-validation") ? passwordValue === checkPasswordValue && 0 !== passwordValue.length && 0 !== checkPasswordValue.length ? this._hideError(element) : this._showError(element) : element.hasClass("js-password-validation") ? passwordValue.length > 4 && this.containsANumberRegex.test(passwordValue) && this.containsThreeDifferentLettersRegex.test(passwordValue) ? this._hideError(element) : this._showError(element) : this._validateInput(element, 1, 255, !0), this
        },
        _validateNumeric: function(element, minLength, maxLength, allowWhitespaces) {
            "use strict";
            var elementValue = element.val(),
                elementValueLength = element.val()
                .length,
                regexpOnlyNumbers = this.acceptOnlyNumbersRegex;
            return allowWhitespaces && (regexpOnlyNumbers = this.acceptOnlyNumbersAndWhitespacesRegex), void 0 == minLength && (minLength = 1), void 0 == maxLength && (maxLength = 255), minLength > elementValueLength || elementValueLength > maxLength || !regexpOnlyNumbers.test(elementValue) ? this._showError(element) : 0 === minLength && 0 === elementValueLength ? this._hideError(element, !0) : this._hideError(element), this
        },
        _validateInput: function(element, minLength, maxLength, noSuccessImage) {
            "use strict";
            var elementValueLength = element.val()
                .length;
            return void 0 == minLength && (minLength = 1), void 0 == maxLength && (maxLength = 255), minLength > elementValueLength || elementValueLength > maxLength ? this._showError(element) : 0 === minLength && 0 === elementValueLength || noSuccessImage ? this._hideError(element, !0) : this._hideError(element), this
        },
        _validatePostalcode: function(element, minLength, maxLength) {
            "use strict";
            var elementValue = element.val(),
                elementValueLength = element.val()
                .length;
            return void 0 == minLength && (minLength = 1), void 0 == maxLength && (maxLength = 255), minLength > elementValueLength || elementValueLength > maxLength ? this._showError(element) : elementValue.match(this.postalcodeRegex) ? 0 === minLength && 0 === elementValueLength ? this._hideError(element, !0) : this._hideError(element) : this._showError(element), this
        },
        bindRequiredElement: function() {
            "use strict";
            $(this.formElement)
                .off("blur", this.requiredElementSelector), $(this.formElement)
                .on("blur", this.requiredElementSelector, function(self) {
                    return function() {
                        self._validate($(this))
                    }
                }(this))
        },
        bindSubmitForm: function(callbackOnSubmitError) {
            "use strict";
            $(this.formElement)
                .on("submit", function(self) {
                    return function(event) {
                        var hasErrors, requiredElements = $(this)
                            .find(self.requiredElementSelector);
                        requiredElements.each(function() {
                            $(this)
                                .is(":visible") && self._validate($(this))
                        }), requiredElements.each(function() {
                            $(this)
                                .is(":visible") && $(this)
                                .hasClass("validate-error") && (hasErrors = !0)
                        }), hasErrors ? (event.preventDefault(), event.stopPropagation(), shop.globalMessage.error(), function() {
                            callbackOnSubmitError && "function" == typeof callbackOnSubmitError && callbackOnSubmitError()
                        }()) : shop.globalMessage.hide()
                    }
                }(this))
        },
        bindValidationEvents: function(callbackOnSubmitError) {
            "use strict";
            this.bindRequiredElement(), this.bindSubmitForm(callbackOnSubmitError)
        },
        bindValidationForOverlay: function(callbackOnSubmitError) {
            this.bindValidationEvents(callbackOnSubmitError);
            var $passwordInput = $(".overlay-container")
                .find(".js-strength");
            0 != $passwordInput.length && ($(".pstrength")
                .remove(), $passwordInput.pstrength(), "" !== $passwordInput.val() && $(".pstrength")
                .show(), $passwordInput.on("keyup", function() {
                    "" !== $passwordInput.val() ? $(".pstrength")
                        .show() : $(".pstrength")
                        .hide()
                }))
        }
    },
    function($) {
        "use strict";

        function advancedDeviceDetection() {
            var hasTouch;
            return "ie" === Modernizr.Detectizr.device.browser && Modernizr.Detectizr.device.browserVersion >= "10" && "tablet" === Modernizr.Detectizr.device.type ? (hasTouch = !0, $("html")
                .removeClass("no-touch")
                .addClass("touch")) : hasTouch = Modernizr.touch, hasTouch
        }
        Modernizr.Detectizr.detect(), window.shop.add("device", Modernizr.Detectizr.device), window.shop.add("device", {
                hasTouch: advancedDeviceDetection()
            }), $(window)
            .on("load", function() {
                "complete" != document.readyState && $(document)
                    .trigger("ready")
            })
    }(jQuery),
    function($) {
        "use strict";

        function createSuggestBox($suggest) {
            if (!($suggest.length < 1)) {
                var _suggestTermsSnippet, _suggestProductsSnippet, _highlight, _suggests, _term, $searchForm = $suggest.closest("form"),
                    $searchField = $searchForm.find(".js-search-suggest"),
                    $searchWrapper = $searchForm.closest(".search"),
                    _suggestMessage = $searchForm.attr("data-first-suggest"),
                    _searchWrapperHeight = $searchWrapper.outerHeight(),
                    _KEY_UP = 38,
                    _KEY_DOWN = 40,
                    _KEY_RIGHT = 39,
                    _KEY_LEFT = 37,
                    _KEY_ENTER = 13,
                    currentColumn = ".suggest-terms",
                    selectItem = function(isNext, $currentItem, currentColumn) {
                        var $nextActive;
                        $("li", $suggest.find(currentColumn))
                            .hasClass("active") ? ($nextActive = isNext ? $currentItem.next() : $currentItem.prev(), $currentItem.removeClass("active"), $nextActive.addClass("active")) : isNext ? $("li:first-child", $suggest.find(currentColumn))
                            .addClass("active") : $("li:last-child", $suggest.find(currentColumn))
                            .addClass("active")
                    },
                    checkSuggestElements = function() {
                        var cssHalfWidth = "full-width";
                        2 === $suggest.children("div")
                            .length ? $suggest.addClass(cssHalfWidth) : $suggest.removeClass(cssHalfWidth)
                    };
                $suggest.css({
                        top: _searchWrapperHeight + "px"
                    }), $(document)
                    .mouseup(function(e) {
                        0 === $(e.target)
                            .closest(".search")
                            .length && $suggest.hide()
                    }), $searchField.on("keyup", function(e) {
                        if (e.preventDefault(), e.stopPropagation(), $searchField.val()
                            .length > 2 || $searchField.val()
                            .length >= 1 && $suggest.is(":visible")) {
                            var $currentActive = $("li.active", $suggest.find(currentColumn)),
                                _href = "";
                            e.which === _KEY_UP ? selectItem(!1, $currentActive, currentColumn) : e.which === _KEY_DOWN ? selectItem(!0, $currentActive, currentColumn) : e.which === _KEY_RIGHT || e.which === _KEY_LEFT ? (currentColumn = ".suggest-terms" === currentColumn ? ".suggest-products" : ".suggest-terms", $currentActive.removeClass("active"), $currentActive = $("li:first-child", $suggest.find(currentColumn)), $currentActive.addClass("active")) : e.which === _KEY_ENTER ? (null !== store.get("collapse") && store.remove("collapse"), $currentActive.length > 0 && (_href = $("a", $currentActive)
                                .attr("href"), window.location.href = _href)) : (_term = $searchField.val(), $.ajax({
                                url: $searchField.attr("data-suggest-url") + "?" + $searchField.attr("name") + "=" + encodeURIComponent(_term),
                                type: "GET",
                                cache: !0,
                                success: function(data) {
                                    $suggest.show(), _suggestTermsSnippet = "", _suggestProductsSnippet = "", _suggests = jQuery.parseJSON(data), (_suggests.terms.length > 0 || _suggests.products.length > 0) && ($searchWrapper.attr("data-suggest-has-response", "true"), _highlight = new RegExp(_term, "i")), _suggests.terms.length > 0 ? createTermsSuggestColumn($suggest, _suggests, $searchForm, $searchField, _suggestTermsSnippet, _suggestMessage) : $suggest.find(".suggest-terms")
                                        .remove(), _suggests.products.length > 0 ? createProductsSuggestColumn($suggest, _suggests, $searchField, _suggestProductsSnippet) : $suggest.find(".suggest-products")
                                        .remove(), _suggests.products.length <= 0 && _suggests.terms.length <= 0 && $suggest.hide(), checkSuggestElements()
                                }
                            }))
                        }
                    }), $suggest.on("mouseover", "li", function(e) {
                        $("li", $suggest)
                            .removeClass("active"), $(e.target)
                            .closest("li")
                            .addClass("active")
                    }), $suggest.on("focus", function() {
                        "true" === $searchWrapper.attr("data-suggest-has-response") && $searchField.show()
                    })
            }
        }

        function createTermsSuggestColumn($suggestSelector, suggestsData, $searchFormSelector, $searchFieldSelector, suggestTermsHTML, suggestMessageInit) {
            var itemUrl, parentCategory, typeDisplay, i;
            for (i in suggestsData.terms) {
                var seperator = "?"; - 1 != suggestsData.terms[i].url.indexOf("?") && (seperator = "&"), itemUrl = $searchFormSelector.attr("data-result-url") + suggestsData.terms[i].url + seperator + "queryFromSuggest=true&userInput=" + encodeURIComponent($searchFieldSelector.val()), parentCategory = suggestsData.terms[i].parentCategory, typeDisplay = "", void 0 != parentCategory && "" != parentCategory ? (-1 != parentCategory.indexOf("/") && (parentCategory = parentCategory.split("/")[0]), typeDisplay = parentCategory + " > " + suggestsData.terms[i].typeName) : typeDisplay = suggestsData.terms[i].typeName, suggestTermsHTML += '<li><a href="' + itemUrl + '">' + suggestsData.terms[i].term.replace(new RegExp($searchFieldSelector.val(), "i"), function(a) {
                    return "<b>" + a + "</b>"
                }) + '<span class="info">' + typeDisplay + "</span></a></li>"
            }
            $suggestSelector.html('<div class="suggest-terms"><span class="suggests-headline">' + suggestMessageInit + "</span><ul>" + suggestTermsHTML + "</ul></div>")
        }

        function createProductsSuggestColumn($suggestSelector, suggestsData, $searchFieldSelector, suggestProductsHTML) {
            var imageUrl, itemUrl, prodDescription, initProdDescription, brandName, prodTerm, i, $suggestProductsUl = $(".suggest-products")
                .find("ul"),
                adjustedImageUrl = "";
            for (i in suggestsData.products) imageUrl = suggestsData.products[i].imageUrl, itemUrl = suggestsData.products[i].url, prodDescription = suggestsData.products[i].description, initProdDescription = suggestsData.products[i].description, brandName = suggestsData.products[i].brandName, prodTerm = suggestsData.products[i].term, void 0 != imageUrl && (adjustedImageUrl = imageUrl.replace("w_1200,f_auto", "h_78")), prodDescription.length > 92 && (prodDescription = prodDescription.slice(0, 90) + " ... "), brandName = brandName ? brandName.replace(new RegExp($searchFieldSelector.val(), "i"), function(a) {
                return "<b>" + a + "</b>"
            }) : "", suggestProductsHTML += '<li><a href="' + itemUrl + '"><span class="suggest-img"><img src="' + adjustedImageUrl + '"/></span><span class="suggest-product-text"><strong class="suggest-headline">' + brandName + '</strong><span class="suggest-term">' + suggestsData.products[i].term.replace(new RegExp($searchFieldSelector.val(), "i"), function(a) {
                return "<b>" + a + "</b>"
            }) + '</span><span class="suggest-description" title="' + initProdDescription + '">' + prodDescription + "</span></span></a></li>";
            $suggestProductsUl.length > 0 ? $suggestProductsUl.html(suggestProductsHTML) : $suggestSelector.append('<div class="suggest-products"><span class="suggests-headline">' + suggestsData.productsHeader + "</span><ul>" + suggestProductsHTML + "</ul></div>")
        }
        $(function() {
            var $suggestHeader = $("#suggest");
            createSuggestBox($suggestHeader)
        })
    }(jQuery),
    function($) {
        "use strict";
        var fixWatermarksInInputFields = function() {
            $("body")
                .find("label[for]")
                .removeAttr("for")
        };
        "android" === shop.device.os && "safari" === shop.device.browser && $(function() {
            fixWatermarksInInputFields()
        })
    }(jQuery),
    function($, s) {
        "use strict";
        var showErrorOverlay = function(errorMessage) {
                var overlayMessage = "<div>" + (errorMessage || "Es ist ein Fehler aufgetreten.") + "</div>",
                    overlay = overlay || new Overlay("", {
                        title: "Hinweis",
                        styleClass: "overlay-error",
                        type: "div",
                        width: "450",
                        height: "150",
                        confirm: !0,
                        content: overlayMessage
                    })
                    .wrap()
            },
            showOverlay = function(popup) {
                var overlayContent = "<div>" + popup.content + "</div>",
                    overlay = overlay || new Overlay("", {
                        title: popup.headline,
                        type: "div",
                        width: "600",
                        height: "550",
                        content: overlayContent
                    })
                    .wrap();
                window.setTimeout(function() {
                        var $addToCartSlot = $addToCartSlot || $(".js-add-to-cart-slot"),
                            newSlider = function($elem, optionObj) {
                                return new Slider($elem, optionObj)
                            },
                            loadSlider = function($elem, callback) {
                                return new SimpleComponentLoader($elem, callback)
                            };
                        $addToCartSlot.show(), $addToCartSlot.length > 0 && !shop.device.isMobile ? ($addToCartSlot.addClass("active"), loadSlider($addToCartSlot.find(".js-async-carousel"), function() {
                                newSlider($addToCartSlot.find(".pcarousel-smallArticle"), {
                                        orientation: "horizontal",
                                        pagerSteps: 3,
                                        auto: !1,
                                        wrapper: ".pcarousel-wrapper",
                                        width: "405",
                                        productcarousel: !0,
                                        initPrudsysEvent: !1
                                    }), $(".js-add-to-cart-slot .pcarousel .star-rating")
                                    .makeStars()
                            }), $(".js-add-to-cart-slot .pcarousel .star-rating")
                            .makeStars()) : $addToCartSlot.addClass("hide")
                    }, 500), $(".add-to-cart-content .review-bar-rating ")
                    .makeStars()
            },
            evaluateRequest = function(requestData) {
                var loaderOverlay = loaderOverlay || new LoaderOverlay;
                loaderOverlay.show(), requestData.done(function(data) {
                    loaderOverlay.hide(), s.miniCart && s.miniCart.add(data.miniCart), showOverlay(data.addToPopup)
                }), requestData.fail(function() {
                    loaderOverlay.hide(), showErrorOverlay()
                })
            };
        shop.addProductToCart = function(orderNumber) {
            var requestData, checkedOrderNumber = "number" != typeof orderNumber ? parseInt(orderNumber, 10) : orderNumber,
                requestURL = s.url.base + "cart/directorder-ajax",
                requestParameters = "n=" + checkedOrderNumber + "&cp=true";
            "NaN" !== checkedOrderNumber.toString() ? (requestData = $.ajax({
                url: requestURL,
                data: requestParameters,
                dataType: "json",
                type: "GET",
                async: !0
            }), evaluateRequest(requestData)) : showErrorOverlay("Keine gГјltige Bestellnummer.")
        }, shop.addWaProductToCart = function(jsonData) {
            var requestData, requestURL = s.url.base + "cart/add-wa-to-cart";
            null !== jsonData ? (requestData = $.ajax({
                url: requestURL,
                data: {
                    CSRFToken: shop.config.CSRFToken,
                    json: jsonData
                },
                dataType: "json",
                type: "POST",
                async: !0
            }), shop.waConfigurator.closeConfigurator(), shop.addToCartPDS ? shop.addToCartPDS.animateAddToCart(function() {
                evaluateRequest(requestData)
            }) : evaluateRequest(requestData)) : showErrorOverlay("Fehler bei Гњbernahme der Werbeanbringungs-Informationen.")
        }
    }(jQuery, shop);
var addProductToCart = shop.addProductToCart;
! function() {
    "use strict";
    var disableMaxymiser = function() {
        if (Log({
                level: 1,
                message: "MAXYMISER : DISABLED",
                type: "info"
            }), "undefined" != typeof mmcore) mmcore.SetCookie("gm", "2", 256), alert("Deakivierung erfolgreich"), location.reload();
        else {
            var lp = window.location.protocol;
            "http" != lp.substr(0, 4) && (lp = "http:"), window.open(lp + "//www.maxymiser.com/cookie_optout.htm", "optout", "width=620,height=350,menubar=no,resizable=no,scrollbars=no,toolbar=no")
        }
        return !1
    };
    $(function() {
        $('.js-disable-mmc, a[href="#js-disable-mmc"]')
            .on("click", function(e) {
                e.preventDefault(), disableMaxymiser()
            })
    })
}(),
function($) {
    "use strict";
    var calcFooterHeight = function() {
        var spaceToBottom = 10,
            $footerMain = $("#footer-main-wrapper"),
            $allFooterCells = $footerMain.find(".slot");
        shop.device.isMobile ? $allFooterCells.each(function(i) {
            var $thisCell = $(this),
                $nextCell = $thisCell.parent()
                .next(".footer-cell")
                .find(".slot"),
                thisCellHeight = $thisCell.outerHeight(!0, !0),
                nextCellHeight = $nextCell.outerHeight(!0, !0);
            (i + 1) % 2 !== 0 && $thisCell.add($nextCell)
                .height(thisCellHeight > nextCellHeight ? thisCellHeight + spaceToBottom : nextCellHeight + spaceToBottom)
        }) : $allFooterCells.css("height", $footerMain.height() + spaceToBottom + "px")
    };
    $(function() {
        calcFooterHeight()
    })
}(jQuery),
function($) {
    "use strict";
    var eventNamespace = "etracker",
        lastCartProduct = function(articleIdentifier, entrynumber, quantity) {
            return shop.etracker.lastCartProduct || (shop.etracker.lastCartProduct = {}), articleIdentifier || entrynumber || quantity ? void(shop.etracker.lastCartProduct = {
                articleIdentifier: articleIdentifier || 0,
                entrynumber: entrynumber || 0,
                quantity: quantity || 0
            }) : 0 === shop.etracker.lastCartProduct.articleIdentifier ? null : shop.etracker.lastCartProduct
        },
        eTrackerInsertToBasket = function(articleIdentifier, quantity, callback) {
            var etracker = new eTrackerCommerceAPI,
                encodedData = etracker.getProductJSON(articleIdentifier);
            return etracker.insertToBasket(encodedData, quantity), callback && $.isFunction(callback) ? callback() : void 0
        };
    shop.etracker.beforeUpdateCard = function() {
        var etracker = new eTrackerCommerceAPI,
            $elem = $(shop.ajaxForms.cart_form.lastElement),
            $wrapper = $elem.parents(".article-container"),
            articleIdentifier = $wrapper.attr("data-article-id") ? $wrapper.attr("data-article-id")
            .replace(/\D/g, "") : null,
            entrynumber = parseInt($("input[name=entryNumber]", $wrapper)
                .val(), 10),
            $quantityElem = $("#quantity" + entrynumber),
            quantity = void 0 != $quantityElem.attr("data-old-value") ? $quantityElem.attr("data-old-value") : $quantityElem.val();
        articleIdentifier && $elem.hasClass("cart-remove-js") || articleIdentifier && 0 == $quantityElem.val() ? (lastCartProduct(0, 0, 0), etracker.removeFromBasket(etracker.getProductJSON(articleIdentifier), quantity)) : lastCartProduct(articleIdentifier, entrynumber, quantity)
    }, shop.etracker.afterUpdateCard = function() {
        if (!$(shop.ajaxForms.cart_form.lastTarget)
            .hasClass("remove cart-remove-js")) {
            var etracker = new eTrackerCommerceAPI,
                lastProduct = lastCartProduct(),
                $wrapper = $(shop.ajaxForms.cart_form.lastRequest.tags.item),
                articleIdentifier = $wrapper.attr("data-article-id") ? $wrapper.attr("data-article-id")
                .replace(/\D/g, "") : null,
                entrynumber = parseInt($("input[name=entryNumber]", $wrapper)
                    .val(), 10),
                $quantityElem = $("#quantity" + entrynumber),
                quantity = $quantityElem.val(),
                quantityDif = (quantity - lastProduct.quantity)
                .toString(),
                insertOrRemove = void 0 !== quantityDif && "0" !== quantityDif ? "-" === quantityDif[0] ? "remove" : "insert" : lastProduct && articleIdentifier !== lastProduct.articleIdentifier && lastProduct.entrynumber === entrynumber ? "insertAndRemove" : null;
            articleIdentifier && ("insert" === insertOrRemove ? eTrackerInsertToBasket(articleIdentifier, quantityDif) : "remove" === insertOrRemove ? etracker.removeFromBasket(etracker.getProductJSON(articleIdentifier), quantityDif.replace("-", "")) : "insertAndRemove" === insertOrRemove && (eTrackerInsertToBasket(articleIdentifier, quantity), etracker.removeFromBasket(etracker.getProductJSON(lastProduct.articleIdentifier), lastProduct.quantity)))
        }
    }, shop.etracker.afterOrderPrintCatalog = function() {
        var et, prop, i, l, etrackerVarObj = $(".print-catalog-overlay")
            .data(),
            etrackerSecureCode = $("#_etLoader")
            .data("secure-code") || null;
        for (prop in etrackerVarObj) prop && -1 !== prop.indexOf("et_") && (window[prop] = etrackerVarObj[prop]);
        for (et = [window.etrackerSecureCode || "", window.et_pagename || "", window.et_areas || "", window.et_ilevel || "", window.et_url || "", window.et_target || "", window.et_tval || "", window.et_ordernr || "", window.et_tsale || "", window.et_cust || "", window.et_basket || "", window.et_lpage || "", window.et_trig || "", window.et_tag || "", window.et_sub || ""], i = 0, l = et.length; l > i; i++) et[i] = shop.encodeRfc3986($.trim(et[i]));
        et_eC_Wrapper && etrackerSecureCode && et_eC_Wrapper(et[0], et[1], et[2], et[3], et[4], et[5], et[6], et[7], et[8], et[9], et[10], et[11], et[12], et[13], et[14])
    }, $(function() {
        $(document)
            .on("mousedown." + eventNamespace, "a[data-etracker-campaign], area[data-etracker-campaign]", function(event) {
                if ("object" == typeof ET_Event) {
                    var campaign = $(event.currentTarget)
                        .attr("data-etracker-campaign");
                    this.href += (this.href.match(/\?/g) ? "&" : "?") + campaign, $(this)
                        .removeAttr("data-etracker-campaign")
                }
            }), $(document)
            .on("mousedown." + eventNamespace, "[data-etracker-event]", function(event) {
                event.preventDefault();
                var i, $currentTarget = $(event.currentTarget),
                    dataArray = ($currentTarget.data("etracker-event") + "" || "")
                    .split(","),
                    target = $currentTarget.attr("href") ? shop.encodeRfc3986($currentTarget.attr("href")) : "",
                    dataArrayLength = dataArray.length || 0;
                if (dataArrayLength >= 3) {
                    for (i = 0; dataArrayLength > i; i++) dataArray[i] = shop.encodeRfc3986($.trim(dataArray[i] || ""));
                    ET_Event.eventStart(dataArray[0], dataArray[1], dataArray[2], dataArray[3] || "")
                } else 1 === dataArrayLength ? ET_Event.eventStart(shop.brand, dataArray[0], target, "") : console.log("Missing required eTracker parameter")
            }), $(document)
            .on("mousedown." + eventNamespace, "[data-etracker-general-event]", function(e) {
                e.preventDefault();
                var i, l, eTrackerData = $(this)
                    .attr("data-etracker-general-event"),
                    dataArray = eTrackerData ? eTrackerData.split(",") : null;
                if (dataArray && 4 === dataArray.length) {
                    for (i = 0, l = dataArray.length; l > i; i++) dataArray[i] = shop.encodeRfc3986($.trim(dataArray[i]));
                    new Log({
                        type: "info",
                        message: "Call: ET_Event.eventStart(" + dataArray[0] + ", " + dataArray[1] + ", " + dataArray[2] + ", " + dataArray[3] + ")",
                        level: 1
                    }), ET_Event.eventStart(dataArray[0], dataArray[1], dataArray[2], dataArray[3])
                }
            }), $(document)
            .on("click." + eventNamespace, "[data-etracker-addcart-event]", function(e) {
                e.preventDefault();
                var $this = $(this),
                    href = $this.attr("href") || null,
                    eTrackerData = $this.attr("data-etracker-addcart-event"),
                    dataArray = eTrackerData ? eTrackerData.split(",") : null,
                    gotoUrl = function(url) {
                        window.location.href = url
                    };
                dataArray ? eTrackerInsertToBasket(dataArray[0].replace(/\D/g, ""), dataArray[1], function() {
                    gotoUrl(href)
                }) : href && gotoUrl(href)
            })
    }), ("Cart Page" === shop.page.name || "Checkout Summary Page" === shop.page.name) && $(function() {
        $("#direct-order")
            .on("submit.etracker", function() {
                var etracker = new eTrackerCommerceAPI,
                    articleIdentifier = $("#direct-order-field")
                    .val();
                etracker.insertToBasket(etracker.getProductJSON(articleIdentifier), 1)
            })
    }), "Checkout Confirmation Page" === shop.page.name && $(function() {
        (new eTrackerCommerceAPI)
        .order(shop.etracker.order)
    })
}(jQuery),
function($) {
    "use strict";
    var toolifyInputForEditability, changeFormActionOnClick, toggleEditability = function(target, editable) {
            var $target = $(target);
            $target.is(":input") || ($target = $target.find(":input")), $target.length > 0 && (editable ? $target.attr("disabled", !1)
                .prop("disabled", !1) : $target.attr("disabled", !0)
                .prop("disabled", !0))
        },
        toogleRequiredState = function($invoker, $target) {
            var requiredClass = "js-required-element";
            $invoker.is(':input[type="checkbox"]') && $invoker.on("change", function() {
                $target.toggleClass(requiredClass), shop.formValidation._hideError($target, !0), shop.formValidation.bindValidationEvents()
            })
        };
    window.shop && (window.shop.toggleEditability = toggleEditability), toolifyInputForEditability = function($invoker, $target, uneditable) {
        if (uneditable = uneditable || !1, null !== $invoker || null !== $target) {
            if (null === $target) {
                var targetSelector = $invoker.data("editability-toggle-for");
                $target = $(targetSelector)
            } else if (null === $invoker) {
                var invokerSelector = $target.data("editability-toggle-by");
                $invoker = $(invokerSelector)
            }
            if ($invoker.is(":radio")) {
                var $others = $("input[name='" + $invoker.attr("name") + "']");
                $others.each(function(ix, element) {
                    var $element = $(element);
                    $element.val() != $invoker.val() && $element.on("change.editablity-toggle", function() {
                        uneditable ? window.shop.toggleEditability($target, !$invoker.is(":checked")) : window.shop.toggleEditability($target, $invoker.is(":checked"))
                    })
                })
            }
            $invoker.on("change.editablity-toggle", function() {
                uneditable ? window.shop.toggleEditability($target, !$invoker.is(":checked")) : window.shop.toggleEditability($target, $invoker.is(":checked"))
            })
        }
    }, changeFormActionOnClick = function($elem) {
        $elem.on("click.changeForm", function() {
            var data = $elem.data("change-form-action") || null;
            data && $elem.prop("disable", !0)
                .closest("form")
                .attr("action", data)
                .submit()
        })
    }, $(function() {
        $("[data-editability-toggle-for]")
            .each(function(ix, element) {
                var $invoker = $(element);
                toolifyInputForEditability($invoker), $invoker.trigger("change")
            }), $("[data-editability-toggle-by]")
            .each(function(ix, element) {
                var $target = $(element),
                    $invoker = $($target.data("editability-toggle-by"));
                toolifyInputForEditability($invoker, $target), $invoker.trigger("change")
            }), $("[data-uneditability-toggle-by]")
            .each(function(ix, element) {
                var $target = $(element),
                    $invoker = $($target.data("uneditability-toggle-by"));
                toolifyInputForEditability($invoker, $target, !0), $invoker.trigger("change")
            }), $("[data-change-form-action]")
            .each(function() {
                changeFormActionOnClick($(this))
            }), $("[data-change-required-state-for]")
            .each(function(ix, element) {
                var $invoker = $(element),
                    target = $(this)
                    .data("change-required-state-for") || 0;
                target.length > 0 && toogleRequiredState($invoker, $('[id="' + target + '"]'))
            });
        var commonFormSelector = $(".js-form-common"),
            commonFormErrorSelector = ".form_field_error input, .form_field_error select";
        commonFormSelector.on("blur.form", commonFormErrorSelector, function() {
            if ("" !== $(this)
                .val()) {
                var formFieldErrorSelector = $(this)
                    .parents(".form_field_error");
                formFieldErrorSelector.find(".form_field_error-message")
                    .hide(), formFieldErrorSelector.removeClass("form_field_error")
            }
        }), shop.add("formValidation", {}), shop.formValidation = new ValidateForm
    })
}(jQuery),
function($) {
    "use strict";
    var _eventNamespace = "comments",
        reviewTemplate = new Template,
        generateReviewItem = function(reviewItem, $reviewElement, kindOfTemplate) {
            var usefulText = $reviewElement.attr("data-review-useful-text"),
                bySelfText = $reviewElement.attr("data-review-by-self-text"),
                bySelfUrl = $reviewElement.attr("data-review-by-self-url"),
                reviewReportedText = $reviewElement.attr("data-review-reported-text"),
                typeOfTemplate = reviewItem.reported === !1 || null === reviewItem.reported || "AccountReviewsPage" === shop.page.name || "AccountReviewDetailPage" === shop.page.name ? "review-html-template" : "review-reported-html-template",
                reviewHtmlTemplate = null != kindOfTemplate ? typeOfTemplate + "-" + kindOfTemplate : typeOfTemplate;
            reviewTemplate.setTemplate(reviewHtmlTemplate)
                .setPlaceholder(reviewItem)
                .setExceptions({
                    rating: function(rating) {
                        for (var _html = "", i = 0; 5 > i; i++) _html += rating > i ? '<li><span><i class="fa fa-star fa-star-active"></i></span></li>' : '<li><span><i class="fa fa-star"></i></span></li>';
                        return _html
                    },
                    getPrivateReviewReportedHeadline: function() {
                        return reviewItem.reported ? '<div class="reported-headline">' + reviewReportedText + "</div>" : ""
                    },
                    headline: function(headline) {
                        return null != headline ? headline : ""
                    },
                    responseHtml: function() {
                        var responseTemplate = new Template;
                        return reviewItem.response ? (responseTemplate.setTemplate("response-html-template")
                            .setPlaceholder(reviewItem.response)
                            .setExceptions({
                                comment: function(comment) {
                                    return comment ? comment : ""
                                },
                                user: function(user) {
                                    return user.name ? user.name : ""
                                },
                                creationTimeFormated: function(creationTimeFormated) {
                                    return creationTimeFormated ? creationTimeFormated : ""
                                }
                            }), responseTemplate.render()) : ""
                    },
                    usefulPercentageText: function(usefulPercentageText) {
                        return "" == usefulPercentageText || void 0 == usefulPercentageText ? "" : '<span class="bold">' + usefulPercentageText + "</span>&nbsp;<span>" + usefulText + "</span>"
                    },
                    byText: function(byText) {
                        return byText == bySelfText && "" != bySelfUrl ? '<a href="' + bySelfUrl + '">' + bySelfText + "</a>" : byText
                    }
                }), $reviewElement.append(reviewTemplate.render()), $("#report-review-popup")
                .length > 0 ? $(".overlay.js-report-review")
                .each(function() {
                    if ($(this)
                        .data("allow-review-report") === !0) {
                        var $this = $(this),
                            overlayNamespace = "js-has-overlay";
                        $this.hasClass(overlayNamespace) || (new Overlay($this), $this.addClass(overlayNamespace))
                    }
                }) : $(".overlay.js-report-review")
                .hide()
        },
        extendCustomerReview = function(customerReview) {
            if (null != customerReview.product) {
                for (var j = 0; j < customerReview.product.images.length; j++) "cartIcon" === customerReview.product.images[j].format && (customerReview.productImage = customerReview.product.images[j].httpsUrl);
                var reviewDate = new Date(customerReview.date);
                customerReview.numericRating = customerReview.rating, customerReview.dateISO8601 = reviewDate.getDate() + "-" + (reviewDate.getMonth() + 1) + "-" + reviewDate.getFullYear(), customerReview.productBrandName = null != customerReview.product.manufacturer ? customerReview.product.manufacturer : "", customerReview.productName = null != customerReview.product.name ? customerReview.product.name : "", customerReview.productAverageRating = null != customerReview.product.averageRating ? customerReview.product.averageRating : "", customerReview.productFormattedPrice = null != customerReview.product.price ? customerReview.product.price.formattedValue : "", customerReview.productUrl = null != customerReview.product.url ? shop.url.base.substring(0, parseInt(shop.url.base.length - 1, 10)) + customerReview.product.url : "", customerReview.numberOfReviews = null != customerReview.product.numberOfReviews ? customerReview.product.numberOfReviews : "", customerReview.numberOfReviewsText = "1" == customerReview.product.numberOfReviews ? "" : customerReview.product.numberOfReviews, customerReview.hideProduct = ""
            } else customerReview.hideProduct = "hide"
        },
        setVoteHelpfulPanel = function($reviewElement) {
            var reviewFromCurrentUser = $reviewElement.attr("data-review-from-current-user"),
                wasHelpfulVoteDelivered = $reviewElement.attr("data-was-helpful-vote-delivered");
            "false" === reviewFromCurrentUser && "false" === wasHelpfulVoteDelivered && $reviewElement.find(".js-customer-review-helpful")
                .removeClass("hide")
                .on("click." + _eventNamespace, ".js-helpful-review-button", function() {
                    var isLoggedIn = $(".prodreview")
                        .attr("data-login-status");
                    "true" === isLoggedIn ? sendHelpful($(this)) : ($(".helpful-missing-login-error")
                        .addClass("hide"), $(this)
                        .nextAll(".helpful-missing-login-error")
                        .removeClass("hide"))
                })
        },
        bindCreateReviewButton = function() {
            var commentsReviewBar = ".review-bar",
                commentsReviewBarErrorMessage = "> .review-error-messages",
                commentsWriteReviewButtonSelector = "#js-comments-write_button_review";
            $(commentsWriteReviewButtonSelector)
                .on("click", function(event) {
                    return event.preventDefault(), $(commentsWriteReviewButtonSelector)
                        .hasClass("disabled") ? ($(commentsReviewBar + commentsReviewBarErrorMessage)
                            .html('<i class="fa fa-exclamation-circle"></i>&nbsp;' + $(commentsWriteReviewButtonSelector)
                                .attr("data-status-login")), $(commentsReviewBar + commentsReviewBarErrorMessage)
                            .show(), !0) : void(location.href = $(commentsWriteReviewButtonSelector)
                            .attr("data-create-review-url"))
                })
        },
        fillRating = function($elem) {
            var $commentsStarRatingButtonSelector = $elem.parent(),
                starsArray = $commentsStarRatingButtonSelector.find("label");
            starsArray.sort(function(a, b) {
                var aName = $(a)
                    .attr("for"),
                    bName = $(b)
                    .attr("for");
                if (aName && bName) {
                    if (aName = aName.toLowerCase(), bName = bName.toLowerCase(), aName > bName) return -1;
                    if (bName > aName) return 1
                }
                return 1
            });
            var starClicked = parseInt($elem.attr("data-input"), 10);
            if (starsArray.length > 0 && starClicked <= starsArray.length) {
                starsArray.removeClass("fa-star-active")
                    .next("input")
                    .removeAttr("checked");
                for (var i = -1; starClicked > i; i++) starsArray[i] && ($(starsArray[i])
                    .addClass("fa-star-active"), i === starClicked - 1 && $(starsArray[i])
                    .next("input")
                    .attr("checked", "checked"))
            }
        },
        loadServiceReviews = function() {
            var $reviewElement = $(".prodreview"),
                $moreReviewsSpinner = $(".js-more-reviews-bar").find(".js-review-show-loading"),
                url = $reviewElement.attr("data-review-url"),
                reviewOffset = $reviewElement.attr("data-review-offset"),
                reviewPager = $reviewElement.attr("data-review-pager"),
                pager = parseInt(null != reviewPager ? reviewPager : 0, 10),
                offset = parseInt(null != reviewOffset ? reviewOffset : 0, 10),
                sort = $reviewElement.attr("data-review-sort");
            return url ? void $.ajax({
                url: url,
                type: "GET",
                cache: !0,
                data: {
                    currentOffset: offset,
                    size: pager,
                    orderBy: sort
                },
                beforeSend: function() {
                    $(".js-get-reviews")
                        .hide(), $moreReviewsSpinner.show()
                },
                success: function(data) {
					console.dir(data);
                    if ("undefined" == typeof data.serviceReviews) return new Log({
                            level: 4,
                            message: "loadReviews: Response Error",
                            type: "error"
                        }), $(".more-reviews-bar")
                        .remove(), !1;
                    for (var i = 0, l = data.serviceReviews ? data.serviceReviews.length : 0; l > i; i++) {
                        var _serviceReview = data.serviceReviews[i];
                        _serviceReview.reported = !1, generateReviewItem(_serviceReview, $reviewElement), $reviewElement.attr("data-review-pager", 10), $reviewElement.attr("data-review-offset", data.currentOffset), $moreReviewsSpinner.hide(), $(".js-get-reviews")
                            .show(), data.end && $(".more-reviews-bar")
                            .remove()
                    }
                },
                complete: function() {
                    {
                        var $reviewBarRating = $reviewElement.find(".review-bar-rating");
                        $reviewElement.find(".review-item")
                    }
                    $reviewBarRating.length > 0 && $reviewBarRating.makeStars()
                }
            }) : !1
        },
        loadReviews = function() {
			 var $reviewElement = $(".prodreview"),
                $moreReviewsSpinner = $(".js-more-reviews-bar")
					.find(".js-review-show-loading"),
                url = $reviewElement.attr("data-review-url"),
                reviewOffset = $reviewElement.attr("data-review-offset"),
                reviewPager = $reviewElement.attr("data-review-pager"),
                pager = parseInt(null != reviewPager ? reviewPager : 0, 10),
                offset = parseInt(null != reviewOffset ? reviewOffset : 0, 10),
                sort = $reviewElement.attr("data-review-sort");
            return url ? void $.ajax({
                url: url,
                type: "GET",
                cache: !0,
                data: {
                    currentOffset: offset,
                    size: pager,
                    orderBy: sort
                },
                beforeSend: function() {
                    $(".js-get-reviews")
                        .hide(), $moreReviewsSpinner.show()
                },
                success: function(data) {
					 data = jQuery.parseJSON(data);
					 if ("undefined" == typeof data.customerReviews) {
						return new Log({
							level: 4,
							message: "loadReviews: Response Error",
							type: "error"
						}), $(".more-reviews-bar").remove(), !1;
					 }
				   for (var i = 0, l = data.customerReviews ? data.customerReviews.length : 0; l > i; i++) {
                        var _customerReview = data.customerReviews[i];
                        extendCustomerReview(_customerReview), generateReviewItem(_customerReview, $reviewElement), $reviewElement.attr("data-review-pager", 10), $reviewElement.attr("data-review-offset", data.currentOffset), $moreReviewsSpinner.hide(), $(".js-get-reviews")
                            .show(), data.end && $(".more-reviews-bar")
                            .remove()
                    }
                },
                complete: function() {
                    var $reviewBarRating = $reviewElement.find(".review-bar-rating"),
                        $reviewItems = $reviewElement.find(".review-item");
                    $reviewBarRating.length > 0 && $reviewBarRating.makeStars(), $reviewItems.each(function() {
                        setVoteHelpfulPanel($(this))
                    })
                }
            }) : !1
        },
        loadHelpfulReviews = function() {
            var $helpfulReviewElements = $(".prodreview-helpful");
            $helpfulReviewElements.each(function() {
                var $helpfulReview = $(this),
                    kindOfHelpful = $helpfulReview.attr("data-review-kind-of-helpful"),
                    url = $helpfulReview.attr("data-review-url"),
                    $kindOfReview = $helpfulReview.parent(),
                    noReviewMessage = $kindOfReview.attr("data-no-review-message");
                url && $.ajax({
                    url: url,
                    type: "GET",
                    cache: !0,
                    data: {
                        kindOfHelpful: kindOfHelpful
                    },
                    success: function(data) {
                        return "undefined" == typeof data.pk ? (new Log({
                                level: 4,
                                message: "loadHelpfulReviews: Response Error",
                                type: "error"
                            }), $kindOfReview.addClass("no-review")
                            .append(noReviewMessage)
                            .next(".helpful-negative")
                            .addClass("only-negative"), !1) : (extendCustomerReview(data), void generateReviewItem(data, $helpfulReview, kindOfHelpful))
                    },
                    complete: function() {
                        var $reviewBarRating = $helpfulReview.find(".review-bar-rating"),
                            $reviewItem = $helpfulReview.find(".review-item");
                        $reviewBarRating.length > 0 && $reviewBarRating.makeStars(), setVoteHelpfulPanel($reviewItem)
                    }
                })
            })
        },
        sendHelpful = function($helpfulButton) {
            var _$customerReviewHelpfulDiv = $helpfulButton.parent(),
                _wasHelpful = $helpfulButton.attr("data-helpful"),
                _responseMessage = _$customerReviewHelpfulDiv.attr("data-response"),
                _customerReviewPk = _$customerReviewHelpfulDiv.attr("data-custome-review-pk"),
                _url = _$customerReviewHelpfulDiv.attr("data-url"),
                _$loadingSpinner = _$customerReviewHelpfulDiv.next(".js-review-show-loading");
            $.ajax({
                url: _url,
                type: "GET",
                data: {
                    wasHelpful: _wasHelpful,
                    customerReviewPk: _customerReviewPk
                },
                beforeSend: function() {
                    _$customerReviewHelpfulDiv.hide(), _$loadingSpinner.show()
                },
                success: function() {
                    _$customerReviewHelpfulDiv.html(_responseMessage), _$loadingSpinner.hide(), _$customerReviewHelpfulDiv.show()
                }
            })
        },
        submitReviewReportedFn = function($formElem) {
            var $reviewReportedTemplate, formData = $formElem.serialize(),
                $self = $formElem;
            $.ajax({
                type: "POST",
                cache: !1,
                url: $self.attr("action"),
                data: formData,
                success: function(data) {
                    $reviewReportedTemplate = $((new Template)
                            .setTemplate("review-reported-html-template")
                            .template), $(".overlay-container")
                        .close(), $(".review-item-default", "#review-" + data)
                        .find(".review-useful-text")
                        .remove()
                        .end()
                        .removeClass("review-item-default")
                        .addClass("review-item-reported")
                        .find(".review-content")
                        .replaceWith($reviewReportedTemplate.find(".review-content"))
                }
            })
        };
    $(function() {
        var $reviewErrorMessages = $(".review-error-messages");
        if ($reviewErrorMessages.text()
            .search(/\w/) >= 0 && $reviewErrorMessages.show(), "Service Reviews Page" == shop.page.name && (loadServiceReviews(), $(".js-get-reviews")
                .on("click." + _eventNamespace, function(event) {
                    event.preventDefault(), loadServiceReviews()
                })), ("ProductDetailsPage" == shop.page.name || "AccountReviewsPage" == shop.page.name || "AccountReviewDetailPage" == shop.page.name || "Product Review Aggregation Page" === shop.page.name) && (bindCreateReviewButton(), loadReviews(), $(".js-get-reviews")
                .on("click." + _eventNamespace, function(event) {
                    event.preventDefault(), loadReviews()
                }), $(".prodreview")
                .on("mousedown", ".js-report-review", function() {
                    var $this = $(this);
                    $this.data("allow-review-report") === !0 ? $("#review-report-code")
                        .val($this.data("review-code")) : ($(".review-missing-login-error")
                            .addClass("hide"), $this.siblings(".review-missing-login-error")
                            .removeClass("hide"))
                }), $(document)
                .on("submit click", '#reportReviewForm button.btn[type="submit"]', function(e) {
                    e.preventDefault(), submitReviewReportedFn($("#reportReviewForm"))
                })), "Product Review Aggregation Page" === shop.page.name) $("#product-review-helpful-reviews")
            .length > 0 && loadHelpfulReviews();
        else if ("Product Review Create Page" === shop.page.name) {
            var $starRatingBar = $(".js-comments-stars-wrapper"),
                $checkedRatingStar = $starRatingBar.find('input[checked="checked"]'),
                $usernameSelection = $(".review-username-selection"),
                $usernameRadio = $usernameSelection.find("input:last"),
                $usernameTextInput = $(".review-username-input")
                .find("input"),
                $serviceForm = $(".review-form-service"),
                $serviceTextInput = $serviceForm.find("input:last"),
                $serviceOwnArea = $(".review-checkbox-own"),
                $serviceOwnCheckbox = $serviceOwnArea.find("input:first"),
                $serviceStarsContainer = $serviceForm.find(".js-comments-stars-container");
            $starRatingBar.on("mousedown." + _eventNamespace, "label", function() {
                    var id = $(this)
                        .attr("data-input"),
                        $container = $(this)
                        .parents(".js-comments-stars-container");
                    $container.hasClass("disabled") || (fillRating($(this)), $container.find(".rating-star-text")
                        .hide(), $container.find(".rating-star-text-" + id)
                        .show())
                }), $(".js-review-form-send")
                .on("click", function(e) {
                    e.preventDefault(), $starRatingBar.find('input[checked="checked"]')
                        .prev("label")
                        .click(), $("#reviewForm")
                        .submit()
                }), $checkedRatingStar.length > 0 && $checkedRatingStar.each(function() {
                    $(this)
                        .prev("label")
                        .click()
                }), $usernameRadio.is(":checked") && $usernameTextInput.prop("disabled", !1), $usernameSelection.on("click." + _eventNamespace, "input:last", function() {
                    $usernameTextInput.prop("disabled", !1)
                }), $usernameSelection.on("click." + _eventNamespace, "input:first", function() {
                    $usernameTextInput.prop("disabled", !0)
                        .val("")
                }), $serviceOwnCheckbox.is(":checked") && ($serviceTextInput.prop("disabled", !1), $serviceStarsContainer.removeClass("disabled")), $serviceOwnArea.on("click." + _eventNamespace, "input:first", function() {
                    $serviceTextInput.prop("disabled") ? ($serviceTextInput.prop("disabled", !1), $serviceStarsContainer.removeClass("disabled")) : ($serviceTextInput.prop("disabled", !0)
                        .val(""), $serviceStarsContainer.addClass("disabled")
                        .find(".rating-star-text")
                        .hide(), $serviceStarsContainer.find("label")
                        .removeClass("fa-star-active"), $serviceStarsContainer.find("input")
                        .removeAttr("checked"))
                })
        }
    })
}(jQuery),
function($) {
    "use strict";

    function Up() {
        $(".brand-to-top")
            .on("click", "i", function() {
                $("html,body")
                    .animate({
                        scrollTop: 0
                    }, 300)
            })
    }
    $(function() {
        Up()
    })
}(jQuery),
function($) {
    "use strict";
    var brandSlider = function(elem) {
            var touchConfObj, elemOuterWidth, leftWidthIndicator, restWidthIndicator, rightIndicatorFlag, ANIMATION_SPEED_NORMAL = 1,
                ANIMATION_SPEED_FAST = 11,
                $container = elem.target,
                $innerContainer = $container.children(".brand-mask"),
                $arrowPrev = $container.parent()
                .find(".js-scroller-prev"),
                $arrowNext = $container.parent()
                .find(".js-scroller-next"),
                $arrows = $arrowPrev.add($arrowNext),
                containerWidth = elem.width,
                containerContent = $container.find("li"),
                clickLeftOrRight = function(e) {
                    $(e.target)
                        .hasClass("scroller-next") ? rightClick() : $(e.target)
                        .hasClass("scroller-prev") && leftClick()
                },
                maxElementWidth = 0,
                elemWidthSum = 0,
                containerMarginLeft = 0,
                frameOffset = ANIMATION_SPEED_NORMAL,
                targetItems = 0,
                hovering = !1,
                movingLeft = !1,
                movingRight = !1,
                mouseenter = function() {
                    hovering = !0
                },
                mouseleave = function() {
                    hovering = !1
                },
                leftClick = function() {
                    movingLeft = !0
                },
                rightClick = function() {
                    movingRight = !0
                };
            $container.data("has-slider", !0);
            for (var i = 0; i < containerContent.length; i++) elemOuterWidth = $(containerContent[i])
                .outerWidth(), elemOuterWidth > maxElementWidth && (maxElementWidth = elemOuterWidth), elemWidthSum += elemOuterWidth;
            if (containerWidth > elemWidthSum) return void $innerContainer.width(elem.width);
            $container.width(elem.width), $container.height(elem.height), $innerContainer.width(2 * elem.width), $arrows.css("display", "block"), shop.device.hasTouch ? $arrows.on("click", function(e) {
                    e.preventDefault(), clickLeftOrRight(e)
                }) : $arrows.hammer()
                .on("touch tap", function(e) {
                    e.gesture.stopPropagation(), e.gesture.preventDefault(), clickLeftOrRight(e)
                }), $innerContainer.append(containerContent.clone()), shop.device.hasTouch ? (touchConfObj = {
                        swipe_velocity: .2
                    }, $container.hammer()
                    .on("touch", mouseenter), $container.hammer()
                    .on("release", mouseleave), $container.hammer(touchConfObj)
                    .on("dragleft dragright dragend", function(e) {
                        e.gesture.stopPropagation(), e.gesture.preventDefault(), "dragend" === e.type && (e.gesture.deltaX >= 20 ? leftClick() : e.gesture.deltaX <= -20 && rightClick())
                    })) : ($innerContainer.on("mouseenter", mouseenter), $innerContainer.on("mouseleave", mouseleave)), elemOuterWidth = $innerContainer.children(":first")
                .outerWidth();
            var tick = function() {
                if (!hovering) {
                    if ((-containerMarginLeft > 4 * elemWidthSum || containerMarginLeft > 0) && (containerMarginLeft = 0), elemOuterWidth -= frameOffset, 0 === elemOuterWidth) {
                        if (restWidthIndicator) {
                            for (var i = 0; targetItems > i; i++) elemOuterWidth = $innerContainer.children(":first"), containerMarginLeft += elemOuterWidth.outerWidth(), $innerContainer.append(elemOuterWidth.remove());
                            restWidthIndicator = !1, targetItems = 0, elemOuterWidth = $innerContainer.children(":first")
                                .outerWidth()
                        } else if (leftWidthIndicator) {
                            if (targetItems = 0, elemOuterWidth = -leftWidthIndicator, -200 > containerMarginLeft - leftWidthIndicator) return elemOuterWidth = containerMarginLeft - leftWidthIndicator, void(elemOuterWidth -= elemOuterWidth % ANIMATION_SPEED_FAST);
                            leftWidthIndicator = !1
                        } else elemOuterWidth = $innerContainer.children(":first"), containerMarginLeft += elemOuterWidth.outerWidth(), $innerContainer.append(elemOuterWidth.remove()), elemOuterWidth = $innerContainer.children(":first")
                            .outerWidth();
                        frameOffset = ANIMATION_SPEED_NORMAL
                    }
                    if (movingLeft) {
                        for (elemOuterWidth = $innerContainer.children(":first")
                            .outerWidth() - elemOuterWidth, frameOffset = -ANIMATION_SPEED_FAST, restWidthIndicator = elem.width - $innerContainer.children(":first")
                            .outerWidth(), elemOuterWidth += restWidthIndicator; restWidthIndicator > 0;) leftWidthIndicator = $($innerContainer.children("li")[$innerContainer.children("li")
                                .length - 1]), restWidthIndicator -= $(leftWidthIndicator)
                            .outerWidth(), containerMarginLeft -= $(leftWidthIndicator)
                            .outerWidth(), $innerContainer.prepend($(leftWidthIndicator)
                                .remove());
                        return elemOuterWidth -= elemOuterWidth % ANIMATION_SPEED_FAST, elemOuterWidth = -elemOuterWidth, leftWidthIndicator = restWidthIndicator, restWidthIndicator = !1, movingLeft = !1, void(rightIndicatorFlag = -1)
                    }
                    if (movingRight) {
                        frameOffset = ANIMATION_SPEED_FAST, restWidthIndicator = elemOuterWidth, targetItems++;
                        for (var i = 1; i < $innerContainer.children("li")
                            .length && (elemOuterWidth = $innerContainer.children("li")[i], restWidthIndicator + $(elemOuterWidth)
                                .outerWidth() < containerWidth); i++) targetItems++, restWidthIndicator += $(elemOuterWidth)
                            .outerWidth();
                        elemOuterWidth = restWidthIndicator, elemOuterWidth -= elemOuterWidth % ANIMATION_SPEED_FAST, movingRight = !1, rightIndicatorFlag = 1
                    }
                    containerMarginLeft -= frameOffset, $innerContainer.css("margin-left", containerMarginLeft + "px")
                }
            };
            setInterval(tick, 20)
        },
        initBrandCountainer = function() {
            $(".brand-container")
                .each(function(index, item) {
                    var loadingImagesCounter, $images, interval, retryCount = 10,
                        $item = $(item),
                        mobileContainerWidth = $item.parent()
                        .width() - $item.siblings(".js-scroller-prev")
                        .width() - $item.siblings(".js-scroller-next")
                        .width() - parseInt($item.css("margin-left"), 10) - parseInt($item.css("margin-right"), 10),
                        desktopContainerWidth = 900,
                        checkSliderStart = function() {
                            return loadingImagesCounter && retryCount ? void retryCount-- : (brandSlider({
                                target: $item,
                                width: shop.device.isMobile ? mobileContainerWidth : desktopContainerWidth,
                                height: 90
                            }), void clearInterval(interval))
                        };
                    $(item)
                        .data("has-slider") || ($images = $(item)
                            .children(".brand-mask")
                            .children()
                            .children()
                            .children(), loadingImagesCounter = $images.length, $images.on("load", function() {
                                loadingImagesCounter--
                            }), interval = setInterval(checkSliderStart, 300))
                })
        };
    $(function() {
        initBrandCountainer(), shop.device.isMobile && $(window)
            .on("orientationchange resize", function() {
                $(".brand-container")
                    .each(function() {
                        var $item = $(this),
                            mobileContainerWidth = $item.parent()
                            .width() - $item.siblings(".js-scroller-prev")
                            .width() - $item.siblings(".js-scroller-next")
                            .width() - parseInt($item.css("margin-left"), 10) - parseInt($item.css("margin-right"), 10);
                        $(this)
                            .width(mobileContainerWidth)
                    })
            })
    })
}(jQuery),
function($) {
    "use strict";
    $(function() {
        cookieWarningMsg()
    });
    var cookieWarningMsg = function() {
        var $pageWrapperSelector = $("#page-wrapper"),
            $messageSelector = $(".js-disabled-cookie-msg"),
            $linkSelector = $(".js-site-reload"),
            messageId = "disabled-cookie-warning",
            errorMessageHTML = "",
            propertyMessage = "";
        navigator.cookieEnabled || (propertyMessage = $messageSelector.data("disabled-cookie-msg"), errorMessageHTML = '<div id="' + messageId + '" class="slot"><div class="property-content"><p>' + propertyMessage + "</p></div></div>", $pageWrapperSelector.before(errorMessageHTML), $linkSelector.on("click", "a", function() {
            location.reload()
        }))
    }
}(jQuery),
function($) {
    "use strict";
    $(function() {
        if ($(".noUiSlider")
            .length > 0) {
            var $sliderElement = $(".noUiSlider"),
                $displayLeftValue = $("#s-value-left"),
                $displayRightValue = $("#s-value-right"),
                $submitPrice = $("#price-filter-button"),
                sliderSelectedMin = parseFloat(Math.floor($sliderElement.data("slider-selected-min"))),
                sliderSelectedMax = parseFloat(Math.round($sliderElement.data("slider-selected-max"))),
                sliderAbsMin = parseFloat(Math.floor($sliderElement.data("slider-abs-min"))),
                sliderAbsMax = parseFloat(Math.round($sliderElement.data("slider-abs-max")));
            sliderAbsMin === sliderAbsMax && (sliderAbsMax += 1), sliderSelectedMin === sliderSelectedMax && (sliderSelectedMax += 1), void 0 !== sliderSelectedMin && void 0 !== sliderSelectedMax && void 0 !== sliderAbsMin && void 0 !== sliderAbsMax && ($sliderElement.noUiSlider({
                range: [sliderAbsMin, sliderAbsMax],
                start: [sliderSelectedMin, sliderSelectedMax],
                handles: 2,
                set: function() {
                    $submitPrice.attr("data-etracker-general-event", "Produktfilter, Preisbereich, " + $(this)
                        .val()[0] + "-" + $(this)
                        .val()[1] + ", ''")
                },
                serialization: {
                    resolution: 1,
                    to: [
                        [$displayLeftValue, "html"],
                        [$displayRightValue, "html"]
                    ]
                }
            }), $submitPrice.on("click.filterSlider", function() {
                for (var search = window.location.search, items = search.split("&"), PS = "filterPreisSlider", PSA = "filterPreisSliderAbsolute", hasPS = !1, hasPSA = !1, i = 0; i < items.length; i++) - 1 !== items[i].indexOf(PS) && (-1 !== items[i].indexOf(PSA) ? (hasPSA = !0, items[i] = PSA + "=" + sliderAbsMin + "+-+" + sliderAbsMax) : (hasPS = !0, items[i] = PS + "=" + $displayLeftValue.text() + "+-+" + $displayRightValue.text()));
                hasPS || items.push(PS + "=" + $displayLeftValue.text() + "+-+" + $displayRightValue.text()), hasPSA || items.push(PSA + "=" + sliderAbsMin + "+-+" + sliderAbsMax), search = items.join("&"), "?" !== search[0] && (search = "?" + search), window.location = window.location.protocol + "//" + window.location.host + window.location.pathname + search
            }))
        }
    })
}(jQuery),
function($) {
    "use strict";
    $(function() {})
}(jQuery),
function($, store, shop) {
    "use strict";
    if ("Search result Page" === shop.page.name) {
        var setSelectedFilterPositions = function() {
                $(".facet-block", "#search-left-column")
                    .each(function() {
                        var $this = $(this),
                            $lastSelectedElem = $this.find("li.selected")
                            .not('[class*="indent-2"]')
                            .last();
                        $lastSelectedElem.length > 0 && $this.scrollTop($lastSelectedElem.offset()
                            .top - $this.offset()
                            .top)
                    })
            },
            getCollapseState = function() {
                return store.get("collapse") ? store.get("collapse") : {}
            },
            clearCollapseStates = function() {
                store.remove("collapse"), store.set("collapse", {
                    forQuery: shop.searchresult.freeTextSearch,
                    states: {}
                })
            },
            setCollapseState = function(index) {
                var collapse = getCollapseState();
                collapse.states[index] = collapse.states.hasOwnProperty(index) && 1 == collapse.states[index] ? 0 : 1, store.remove("collapse"), store.set("collapse", collapse)
            },
            filterHeadBehavior = function() {
                var $separateCategory = $(".category"),
                    arrowClassName = "category-arrow-down",
                    borderClassName = "last-category";
                $separateCategory.on("click", function(e) {
                        e.preventDefault(), $(this)
                            .parent()
                            .find("ul")
                            .toggle(), $(this)
                            .toggleClass(arrowClassName), shop.searchResultPage.view.updateFilterMenuOffset()
                    }), $separateCategory.last()
                    .on("click", function(e) {
                        e.preventDefault(), $(this)
                            .toggleClass(borderClassName), shop.searchResultPage.view.updateFilterMenuOffset()
                    })
            },
            filterColorBoxGenerator = function() {
                var i, $hexSpan = $(".facet-hex"),
                    $hexImg = $(".facet-img"),
                    hexColorClass = "facet-hex-css",
                    indent0Class = "color-indent-0";
                for (i = 0; i < $hexSpan.length; i++) "" !== $hexSpan.eq(i)
                    .text() && ($hexSpan.eq(i)
                        .closest("a")
                        .closest("li")
                        .removeClass(indent0Class), $hexSpan.eq(i)
                        .prev(".facet-name")
                        .remove(), $hexSpan.eq(i)
                        .addClass(hexColorClass), $hexSpan.eq(i)
                        .closest("a")
                        .find(".remove-item-link")
                        .remove(), $hexSpan.eq(i)
                        .css("background", $hexSpan.eq(i)
                            .text()), $hexSpan.eq(i)
                        .text(""));
                for (i = 0; i < $hexImg.length; i++) "" !== $hexImg.eq(i)
                    .attr("src") && ($hexImg.eq(i)
                        .closest("a")
                        .closest("li")
                        .removeClass(indent0Class), $hexImg.eq(i)
                        .next(".facet-name")
                        .remove(), $hexImg.eq(i)
                        .addClass(hexColorClass), $hexImg.eq(i)
                        .closest("a")
                        .find(".remove-item-link")
                        .remove()), "" === $hexImg.eq(i)
                    .attr("src") && $hexImg.eq(i)
                    .remove()
            },
            addStarClasses = function() {
                var $searchFilterItem = $(".filter-item"),
                    $starContainerLine = ($searchFilterItem.find(".search-star-rating"), $(".star-rating")),
                    activeStarClass = "fa-star-active";
                $starContainerLine.each(function() {
                    for (var c = $(this)
                            .parent()
                            .prop("class")
                            .split("-"), i = 0; i < c[c.length - 1]; i++) $(this)
                        .children()
                        .eq(i)
                        .addClass(activeStarClass)
                })
            },
            addCSSClasses = function() {
                for (var lastLiItemClass = "li-last-item", initCSSClass = "linklist-indent-", finalCSSClass = "", categoryLiLevelAmount = 5, i = 0; categoryLiLevelAmount > i; i++) finalCSSClass = initCSSClass + i, $("li")
                    .hasClass(finalCSSClass) && $("li." + finalCSSClass)
                    .last()
                    .addClass(lastLiItemClass)
            };
        $(function() {
            filterHeadBehavior(), filterColorBoxGenerator(), addStarClasses(), addCSSClasses(), $(".filter-nav-content .filter-item")
                .on("click.collapse", ".category", function(event) {
                    setCollapseState($(event.delegateTarget)
                        .index())
                })
        }), $.elementReady("search-right-column", function() {
            var collapse = getCollapseState();
            collapse.forQuery != shop.searchresult.freeTextSearch && (clearCollapseStates(), collapse = getCollapseState());
            for (var item in collapse.states) {
                var $currentBox, currentIndex = collapse.states[item];
                1 === currentIndex && ($currentBox = $(".filter-nav-content .filter-item")
                    .eq(item), $(".category", $currentBox)
                    .addClass("category-arrow-down"), $(".facet-block", $currentBox)
                    .hide())
            }
            $(".filter-nav-content")
                .show(), setSelectedFilterPositions()
        })
    }
}(jQuery, window.store, window.shop),
function($) {
    "use strict";
    var log = function(optionObj) {
            return $.isPlainObject() ? new Log(optionObj) : void 0
        },
        SearchResultView = {
            init: function(parentClass) {
                return this._parentClass = parentClass, this.$body = $("body"), this.$searchResultPage = $("#search-result-page"), this.$resultContainer = $("#product-result-container"), this.$filterMenu = $("#search-left-column"), this.$stickySortBox = $("#sort_form1"), this.text_fromPrice = this.$resultContainer.attr("data-text_fromprice"), this.text_basePrice = this.$resultContainer.attr("data-text_baseprice"), this._eventhandlerNameSpace = this.$searchResultPage.attr("id"), this.viewportHeight = this.getViewportHeight(), this.lastScrollPosition = this.getScrollPosition(), this.updateResultContainerOffset = !0, this.resultContainerOffset = this.getResultContainerOffsetBottom(), this.filterMenuOffsetBottom = this.getFilterMenuOffsetBottom(), this.isStickySortBoxVisible = !1, this.isFooterVisible = !0, this.factFinderErrorCounter = 0, this._reloadPageWhenErrorCounterIs = 3, this._bindEventHandler(), $('<div id="result-page-loader"></div>')
                    .insertAfter(this.$resultContainer), this.resultLoader = new LoaderOverlay("#result-page-loader", !0), this.resultLoader.hide(), this.calcStickySortBoxPos(), delete this.init, this
            },
            _bindEventHandler: function() {
                var self = this;
                $(window)
                    .on("resize", function() {
                        self.viewportHeight = self.getViewportHeight(), self.calcStickySortBoxPos()
                    }), this.$resultContainer.on("mousedown." + this._eventhandlerNameSpace, ".result-thumb", function(e) {
                        var $this = $(this);
                        if (!$this.parent()
                            .hasClass("tooltip") || $this.parent()
                            .hasClass("tooltip") && $this.parent()
                            .hasClass("tt-visible")) {
                            var closestProductID = $this.closest("[id$=-tooltip], .search-result-item")
                                .attr("id")
                                .replace("-tooltip", "");
                            self._parentClass.cache.save(closestProductID), $this.parent()
                                .hasClass("tooltip") || 3 === e.which || 2 === e.which || (location.href = $this.closest(".productMainLink ")
                                    .attr("data-href") || $this.closest(".productMainLink ")
                                    .attr("href"))
                        }
                    }), this.$resultContainer.on("mousedown." + this._eventhandlerNameSpace, ".go-to-product", function(e) {
                        e.preventDefault();
                        var $this = $(this),
                            closestProductID = $this.closest("[id$=-tooltip], .search-result-item")
                            .attr("id")
                            .replace("-tooltip", "");
                        self._parentClass.cache.save(closestProductID), 3 !== e.which && 2 !== e.which && (location.href = $this.attr("href"))
                    }), this.$body.on("click." + this._eventhandlerNameSpace, ".tooltip-wrapper .available-colors-and-sizes a", function(e) {
                        e.preventDefault();
                        var $this = $(this),
                            closestProductID = $this.closest("[id$=-tooltip], .search-result-item")
                            .attr("id")
                            .replace("-tooltip", "");
                        self._parentClass.cache.save(closestProductID), location.href = $this.attr("href") + "?fromSearch=true"
                    })
            },
            getViewportHeight: function() {
                return window.innerHeight || document.documentElement.clientHeight
            },
            getResultContainerHeight: function() {
                return this.$resultContainer.height()
            },
            getResultContainerOffsetBottom: function() {
                var resultContainerOffset;
                return this.updateResultContainerOffset ? (resultContainerOffset = this.$resultContainer.offset()
                    .top + this.$resultContainer.height(), this.updateResultContainerOffset = !1, this.resultContainerOffset = resultContainerOffset) : resultContainerOffset = this.resultContainerOffset, resultContainerOffset
            },
            getFilterMenuOffsetBottom: function() {
                return this.updateFilterMenuOffset()
            },
            updateFilterMenuOffset: function() {
                return this.filterMenuOffsetBottom = this.$filterMenu.offset()
                    .top + this.$filterMenu.height(), this.filterMenuOffsetBottom
            },
            getScrollPosition: function() {
                return $(window)
                    .scrollTop()
            },
            setLastScrollPosition: function() {
                this.lastScrollPosition = this.getScrollPosition()
            },
            getScrollPositionFromBottomOfView: function() {
                return this.getScrollPosition() + this.viewportHeight
            },
            scrollToElement: function(elementID) {
                var offset = elementID ? $("#" + elementID)
                    .offset()
                    .top : 0,
                    e = elementID ? document.getElementById(elementID) : null;
                null !== e && e.scrollIntoView ? window.setTimeout(function() {
                    e.scrollIntoView()
                }, 500) : window.scroll(0, offset)
            },
            _initLazyLoaderForNewImages: function() {
                var deviceEffectObj = "ie" === shop.device.browser && "8" === shop.device.browserVersion || "tablet" === shop.device.type ? null : {
                    effect: "fadeIn"
                };
                this.$resultContainer.find("img.lazy")
                    .lazyload(deviceEffectObj)
                    .removeClass("lazy")
            },
            _appendToInternalCache: function(html) {
                html && (html = html.replace(/\s{2}/g, ""), this._parentClass.cache.internalViewCache += html)
            },
            append: function(html, restoreFromCache) {
                this.$resultContainer.append(html), restoreFromCache === !0 ? this.$resultContainer.find("img.lazy")
                    .each(function() {
                        $(this)
                            .attr({
                                src: $(this)
                                    .attr("data-original")
                            })
                            .removeClass("lazy")
                            .removeAttr("data-original")
                    }) : this._initLazyLoaderForNewImages(), this._appendToInternalCache(html), this.updateResultContainerOffset = !0
            },
            getDistanceToTopOfFilterMenu: function(getPercentValue) {
                var distanceInPercent, distanceInPixel;
                return getPercentValue ? (distanceInPercent = 100 - Math.floor(100 / this.getFilterMenuOffsetBottom() * this.getScrollPositionFromBottomOfView()), 0 >= distanceInPercent ? 0 : distanceInPercent) : (distanceInPixel = this.getScrollPositionFromBottomOfView() - this.getFilterMenuOffsetBottom(), 0 >= distanceInPixel ? 0 : distanceInPixel)
            },
            getDistanceToBottomOfResults: function(getPercentValue) {
                var distanceInPercent, distanceInPixel;
                return getPercentValue ? (distanceInPercent = 100 - Math.floor(100 / this.getResultContainerOffsetBottom() * this.getScrollPositionFromBottomOfView()), 0 >= distanceInPercent ? 0 : distanceInPercent) : (distanceInPixel = this.getResultContainerOffsetBottom() - this.getScrollPositionFromBottomOfView(), 0 >= distanceInPixel ? 0 : distanceInPixel)
            },
            showFooter: function() {
                this.$body.removeClass("state-hide-footer"), this.isFooterVisible = !0
            },
            hideFooter: function() {
                this.$body.addClass("state-hide-footer"), this.isFooterVisible = !1
            },
            showStickySortBox: function() {
                this.$body.addClass("state-sticky-sort-form"), this.isStickySortBoxVisible = !0
            },
            hideStickySortBox: function() {
                this.$body.removeClass("state-sticky-sort-form"), this.isStickySortBoxVisible = !1
            },
            calcStickySortBoxPos: function() {
                this.$stickySortBox.css({
                    left: this.$searchResultPage.offset()
                        .left
                })
            },
            reloadOnError: function() {
                var $resultItems, lastProductID;
                log({
                    level: 1,
                    message: "FACTFINDER IS NOT REACHABLE! FactFinder throws an error during the loading-process of new searchResult-items",
                    type: "error"
                }), this.factFinderErrorCounter += 1, this.factFinderErrorCounter === this._reloadPageWhenErrorCounterIs && ($resultItems = this.$resultContainer.find(".search-result-item"), lastProductID = $resultItems.eq($resultItems.length - 1)
                    .attr("id"), this._parentClass.cache.save(lastProductID), location.reload(!0))
            }
        },
        SearchResultCache = {
            init: function(parentClass) {
                return parentClass && (this._parentClass = parentClass, this.currentCacheURL = location.href, this.currentDate = (new Date)
                    .getTime(), this.internalViewCache = ""), this.keyNameInStorage = "searchResultCache", this.isLocalStorageEnable = !!store.enabled, this.lastCachedObj = void 0 !== (this.isLocalStorageEnable ? store.get(this.keyNameInStorage) : null) ? store.get(this.keyNameInStorage) : null, delete this.init, this
            },
            isCacheAvailable: function() {
                if (this.isLocalStorageEnable && null !== this.lastCachedObj) {
                    var cacheObj = this.lastCachedObj,
                        jumpBackURL = null === cacheObj ? null : cacheObj.jumpBackURL,
                        hoursBetweenCaching = this._getDaysBetweenTwoDates(this.currentDate, cacheObj.cachingDate),
                        cachingLiveTime = this._parentClass.options.cachingLiveTime;
                    return cachingLiveTime > hoursBetweenCaching && jumpBackURL === this.currentCacheURL ? !0 : (this.clearCache(), this._parentClass.view.scrollToElement(), !1)
                }
                return this._parentClass.view.scrollToElement(), !1
            },
            _getDaysBetweenTwoDates: function(date1_ms, date2_ms) {
                var ONE_HOUR = 36e5,
                    difference_ms = Math.abs(date1_ms - date2_ms);
                return Math.round(difference_ms / ONE_HOUR)
            },
            save: function(elementID) {
                var cacheObj = {
                    _createdItems: this._parentClass._createdItems,
                    loadNextPageNumber: this._parentClass.loadNextPageNumber,
                    currentSearchObject: this._parentClass.currentSearchObject,
                    cachedHtml: this.internalViewCache,
                    cachingDate: this.currentDate,
                    jumpBackURL: this.currentCacheURL,
                    scrollToID: elementID
                };
                store.set(this.keyNameInStorage, cacheObj)
            },
            clearCache: function() {
                store.remove(this.keyNameInStorage)
            },
            restoreCache: function() {
                if (this.isCacheAvailable()) {
                    var cacheObj = this.lastCachedObj,
                        currentCacheURL = this.currentCacheURL,
                        jumpBackURL = null === cacheObj ? null : cacheObj.jumpBackURL,
                        self = this;
                    jumpBackURL === currentCacheURL && (this._parentClass._createdItems = cacheObj._createdItems, this._parentClass.loadNextPageNumber = cacheObj.loadNextPageNumber, this._parentClass.currentSearchObject = cacheObj.currentSearchObject, this._parentClass.view.append(cacheObj.cachedHtml, !0), self._parentClass.view.scrollToElement(cacheObj.scrollToID), this.clearCache())
                }
            }
        },
        SearchResultClass = function() {
            this.currentSearchObject = shop.searchresult || null, this._paginationObject = "", this._CURRENTQUERYOBJECT = shop.searchresult.currentQuery, this._productResultObjects = "", this.currentQueryULR = "", this.currentPageNumber = null, this.loadNextPageNumber = 0, this.currentProductsOnPage = null, this._createdItems = 0, this.numberOfPages = null, this.totalNumberOfResults = null, this.currentJSONQueryURL = null, this.isNextSearchResultLoading = !1, this.view = SearchResultView.init(this), this.cache = SearchResultCache.init(this), this._checkScrollPositionIntervall = 100, this.options = {
                preloadNextItemsAtDistance: this.view.viewportHeight / 2,
                checkScrollPositionMaxIntervall: 1e3,
                checkScrollPositionMinIntervall: 100,
                showFilterBoxAtDistance: 400,
                cachingLiveTime: 6
            }, null !== this.currentSearchObject && (this.cache.isCacheAvailable() && (this.cache.restoreCache(), this._updateSearchClassData(this.currentSearchObject)), null === this.numberOfPages && this._handleNewDataController(this.currentSearchObject)), this.view.hideFooter(), this._checkScrollPositionController()
        };
    SearchResultClass.prototype = {
        _updateSearchClassData: function(newJSONData) {
            this.currentSearchObject = newJSONData || this.currentSearchObject, this._paginationObject = this.currentSearchObject.pagination, this._productResultObjects = this.currentSearchObject.results, this.currentQueryULR = this.getCurrentQueryULR(this._CURRENTQUERYOBJECT), this.currentPageNumber = this.getCurrentPageNumber(this._paginationObject), this.currentProductsOnPage = this.getCurrentProductsOnPage(this._paginationObject), this.numberOfPages = this.getNumberOfPages(this._paginationObject), this.totalNumberOfResults = this.getTotalNumberOfResults(this._paginationObject), this.loadNextPageNumber = this.getCurrentPageNumber() + 1, this.currentJSONQueryURL = this.getCurrentJSONQueryURL()
        },
        _getCreatedItems: function() {
            return this._createdItems
        },
        _setCreatedItems: function(number) {
            this._createdItems = number
        },
        getCurrentQueryULR: function(currentQueryObject) {
            return currentQueryObject.url || location.pathname
        },
        getProductResultObjects: function() {
            return this._productResultObjects && $.isArray(this._productResultObjects) ? this._productResultObjects : void 0
        },
        getCurrentPageNumber: function(currentPaginationObject) {
            return currentPaginationObject ? currentPaginationObject.currentPage : this.currentPageNumber
        },
        getNumberOfPages: function(currentPaginationObject) {
            return null !== currentPaginationObject ? currentPaginationObject.numberOfPages : this.numberOfPages
        },
        getCurrentProductsOnPage: function(currentPaginationObject) {
            return null !== currentPaginationObject ? currentPaginationObject.pageSize : this.currentProductsOnPage
        },
        getTotalNumberOfResults: function(currentPaginationObject) {
            return null !== currentPaginationObject ? currentPaginationObject.totalNumberOfResults : this.totalNumberOfResults
        },
        getCurrentJSONQueryURL: function() {
            var jsonURL = this.currentQueryULR.replace("/s", "s/results"),
                jsonURLHasParameters = jsonURL.indexOf("?") > 0 ? !0 : !1,
                attributeForPageNumber = jsonURLHasParameters ? "&page=" : "?page=",
                loadPageNumber = 0 === this.loadNextPageNumber ? this.currentPageNumber : this.loadNextPageNumber;
            return jsonURL = this.prependBaseURLTo(jsonURL + attributeForPageNumber + loadPageNumber)
        },
        getAltBaseURL: function() {
            var pathArray = $.grep((location.pathname || "")
                    .split("/"),
                    function(val) {
                        return val
                    })
                .slice(0, 2);
            return "/" + pathArray[0] + "/" + pathArray[1] + "/"
        },
        prependBaseURLTo: function(targetURL) {
            var baseURL = shop.url.base || this.getAltBaseURL();
            return baseURL.lastIndexOf("/") === baseURL.length - 1 && 0 === targetURL.indexOf("/") && (targetURL = targetURL.substr(1, targetURL.length + 1)), baseURL + targetURL
        },
        _handleNewDataController: function(newJSONData) {
            if ($.isPlainObject(newJSONData))
                if (newJSONData.results) {
                    var newProductResultItemsHTML;
                    this._updateSearchClassData(newJSONData), newProductResultItemsHTML = this._getNextProductItemsHTML(this.getProductResultObjects()), this.view.append(newProductResultItemsHTML)
                } else this.view.reloadOnError()
        },
        _loadNewSearchResultsJSON: function() {
            if (this.isNextSearchResultLoading) return !1;
            var self = this,
                request = $.ajax({
                    url: self.currentJSONQueryURL,
                    dataType: "json",
                    type: "GET",
                    async: !0,
                    beforeSend: function() {
                        self.view.resultLoader.show(), self.isNextSearchResultLoading = !0
                    }
                });
            request.done(function(data) {
                self.view.resultLoader.hide(), self._handleNewDataController(data), self.isNextSearchResultLoading = !1
            }), request.fail(function() {
                self.isNextSearchResultLoading = !1, log({
                    level: 4,
                    message: "Response error from SearchResultClass._loadNewSearchResultsJSON",
                    type: "error"
                })
            })
        },
        _getColorTileForTooltipHTML: function(object) {
            for (var tileURL = object.url ? this.prependBaseURLTo(object.url) : null, outOfStockClass = object.outOfStockBoolean ? "out-of-stock fa fa-times" : "", divOrAnchor = null !== tileURL ? "a" : "div", tileHTML = "<" + divOrAnchor + ' class="p-color ' + outOfStockClass + '" title="' + (object.name || "Color") + '"' + (null !== tileURL ? ' href="' + tileURL + '"' : "") + ">", colorArray = null !== object.hexCode ? object.hexCode.split("/") : [object.name || "Color"], colorArrayLength = colorArray.length, colorIcon = null !== object.colorIconUrl ? object.colorIconUrl : null, colorTilePartWidth = Math.floor(100 / colorArrayLength), currentHexColor = "", i = 0; colorArrayLength > i; i++) currentHexColor = colorArray[i], currentHexColor.indexOf("#") >= 0 ? tileHTML += '<span class="tile-hex-part" style="background-color:' + currentHexColor + "; width:" + colorTilePartWidth + '%"></span>' : colorIcon ? tileHTML += '<span class="tile-text-part ' + currentHexColor + '" style="width:' + colorTilePartWidth + "%; background-image: url('" + colorIcon + "')\"></span>" : colorIcon || (tileHTML += '<span class="tile-text-part ' + currentHexColor + '" style="width:' + colorTilePartWidth + '%"></span>');
            return tileHTML += "</" + divOrAnchor + ">"
        },
        _getSizeTileForTooltipHTML: function(object) {
            var tileURL = object.url ? this.prependBaseURLTo(object.url) : null,
                tileHTML = '<a class="size-tile" title="' + (object.value || "Size") + '"' + (null !== tileURL ? ' href="' + tileURL + '"' : "") + ">" + object.value + "</a>";
            return tileHTML
        },
        _getTooltipAlignmentClass: function() {
            var itemCount = this._getCreatedItems(),
                alignmentClass = "";
            return alignmentClass = 0 === itemCount || itemCount % 3 === 1 ? "left" : 0 !== itemCount && itemCount % 3 === 0 ? "right" : "middle"
        },
        _productHasTooltip: function(typeOfTooltip) {
            return null !== typeOfTooltip && "singlevariant" !== typeOfTooltip ? !0 : !1
        },
        _getNewTooltipHTML: function(objectArray) {
            var variantsSizeObjectArray, tooltipTemplate = new Template,
                tooltipTemplateObject = {
                    title: objectArray.title || "",
                    tooltipType: objectArray.typeOfTooltip,
                    csp_orderNumber: objectArray.csp_orderNumber
                },
                typeOfTooltip = objectArray.typeOfTooltip || null,
                variantsColorObjectArray = objectArray.styleVariants || null,
                variantColumnHTML = "",
                wrapLI = function(html, cssClass) {
                    return "<li " + (cssClass ? 'class="' + cssClass + '"' : "") + ">" + html + "</li>"
                },
                getStockCssClass = function(currentSizeObject) {
                    var outOfStockBoolean;
                    return currentSizeObject && (outOfStockBoolean = shop.strictAvailability ? currentSizeObject.outOfStockStrict : currentSizeObject.outOfStock), outOfStockBoolean ? "out-of-stock" : ""
                };
            if (this._productHasTooltip(typeOfTooltip)) {
                for (var i = 0, variantsColorObjectArrayLength = variantsColorObjectArray.length; variantsColorObjectArrayLength > i; i++) {
                    var variantsSizeObjectArrayLength, currentSizeObject, j, currentColorObject = {
                        code: variantsColorObjectArray[i].code || null,
                        hexCode: variantsColorObjectArray[i].hexCode || null,
                        name: variantsColorObjectArray[i].name || null,
                        colorIconUrl: variantsColorObjectArray[i].colorIconUrl || null,
                        outOfStockBoolean: variantsColorObjectArray[i].outOfStock || !1,
                        url: null
                    };
                    switch (variantsSizeObjectArray = variantsColorObjectArray[i].sizeVariants, variantsSizeObjectArrayLength = variantsSizeObjectArray.length, typeOfTooltip) {
                        case "colorOnly":
                            for (j = 0; variantsSizeObjectArrayLength > j; j++) currentSizeObject = variantsSizeObjectArray[j], currentColorObject.url = this.prependBaseURLTo(currentSizeObject.url), variantColumnHTML += this._getColorTileForTooltipHTML(currentColorObject);
                            break;
                        case "colorAndSizes":
                            for (variantColumnHTML += "<li>", variantColumnHTML += this._getColorTileForTooltipHTML(currentColorObject), variantColumnHTML += '<ul class="sizes">', j = 0, variantsSizeObjectArrayLength = variantsSizeObjectArray.length; variantsSizeObjectArrayLength > j; j++) currentSizeObject = variantsSizeObjectArray[j], variantColumnHTML += wrapLI(this._getSizeTileForTooltipHTML(currentSizeObject), getStockCssClass(currentSizeObject));
                            variantColumnHTML += "</ul>", variantColumnHTML += "</li>";
                            break;
                        case "sizesOnly":
                            for (variantColumnHTML += '<ul class="sizes">', j = 0; variantsSizeObjectArrayLength > j; j++) currentSizeObject = variantsSizeObjectArray[j], variantColumnHTML += wrapLI(this._getSizeTileForTooltipHTML(currentSizeObject), getStockCssClass(currentSizeObject));
                            variantColumnHTML += "</ul>";
                            break;
                        case "termAndSizes":
                            for (variantColumnHTML += "<li>", variantColumnHTML += '<p class="tooltip-column-headline">' + currentColorObject.name + "</p>", variantColumnHTML += '<ul class="sizes">', j = 0; variantsSizeObjectArrayLength > j; j++) currentSizeObject = variantsSizeObjectArray[j], variantColumnHTML += wrapLI(this._getSizeTileForTooltipHTML(currentSizeObject), getStockCssClass(currentSizeObject));
                            variantColumnHTML += "</ul>", variantColumnHTML += "</li>";
                            break;
                        case "termOnly":
                            for (j = 0; variantsSizeObjectArrayLength > j; j++) currentSizeObject = variantsSizeObjectArray[j], currentSizeObject.value = currentColorObject.name, variantColumnHTML += wrapLI(this._getSizeTileForTooltipHTML(currentSizeObject), getStockCssClass(currentSizeObject));
                            break;
                        default:
                            log({
                                level: 4,
                                message: "Wrong type of tooltip: " + typeOfTooltip,
                                type: "error"
                            })
                    }
                }
                return this._productHasTooltip(typeOfTooltip) ? (("colorOnly" === typeOfTooltip || "sizesOnly" === typeOfTooltip) && (variantColumnHTML = wrapLI(variantColumnHTML)), tooltipTemplate.setTemplate("template-search-result-item-tooltip")
                    .setPlaceholder(tooltipTemplateObject)
                    .setExceptions({
                        getTootipItemsHTML: function() {
                            return variantColumnHTML
                        }
                    }), tooltipTemplate.render()) : ""
            }
            return ""
        },
        _getSimpleTemplateHTML: function(object, useTemplate) {
            if ($.isPlainObject(object) && null !== object) {
                var template = new Template;
                return template.setTemplate(useTemplate)
                    .setPlaceholder(object), template.render()
            }
            return ""
        },
        _getSpecialOfferDiscountHTML: function(object) {
            return this._getSimpleTemplateHTML(object, "template-search-result-special-offer-discount")
        },
        _getNewProductActionImgHTML: function(object) {
            return this._getSimpleTemplateHTML(object, "template-search-result-item-action-img")
        },
        _getNewHoverImgHTML: function(object) {
            return this._getSimpleTemplateHTML(object, "template-search-result-item-hover-img")
        },
        _getNewPriceHTML: function(object) {
            return object.csp_showTopOfferHint ? this._getSimpleTemplateHTML(object, "template-search-result-item-price-top-product") : this._getSimpleTemplateHTML(object, null !== object.csp_oldPrice ? "template-search-result-item-price-old-best" : "template-search-result-item-price-single")
        },
        _getNewBasePriceHTML: function(object) {
            return this._getSimpleTemplateHTML(object, "template-search-result-base-price")
        },
        _getNewStarRatingHTML: function(object) {
            var ratingAmount = object.csp_averageRating || 0,
                MAXSTARS = 5;
            return object.starScalerWidth = 100 / MAXSTARS * ratingAmount, object.starsVisibility = ratingAmount > 0 ? "rating-visible" : "", this._getSimpleTemplateHTML(object, "template-search-result-item-product-rating")
        },
        _getNextProductItemsHTML: function(objectArray) {
            var i, l, productItemTemplate = new Template,
                productItemsHTML = "",
                imgHeight = shop.searchresult.imgSize.HEIGHT,
                imgWidth = shop.searchresult.imgSize.WIDTH,
                self = this;
            if (productItemTemplate.setTemplate("template-search-result-item"), objectArray) {
                for (i = 0, l = objectArray.length; l > i; i++) {
                    var currentProductObject = objectArray[i],
                        currentItemHTML = "",
                        currentFloatingTeaserHTML = "",
                        currentProductTooltipObject = currentProductObject.csp_variantsJSON ? $.parseJSON(currentProductObject.csp_variantsJSON) : null,
                        isFloatingTeaser = currentProductObject.csp_floatingTeaser ? !0 : !1;
                    this._setCreatedItems(this._getCreatedItems() + 1), isFloatingTeaser ? (currentFloatingTeaserHTML = document.getElementById("template-floating-teaser-" + currentProductObject.csp_floatingTeaserId), currentItemHTML = currentFloatingTeaserHTML ? currentFloatingTeaserHTML.innerHTML : "") : (currentProductObject.csp_URL = currentProductObject.csp_URL ? this.prependBaseURLTo(currentProductObject.csp_URL) : null, currentProductObject.csp_imgWidth = imgWidth, currentProductObject.csp_imgHeight = imgHeight, currentProductObject.csp_brand = null !== currentProductObject.csp_brand ? currentProductObject.csp_brand + " - " : "", currentProductObject.csp_brandAndName = currentProductObject.csp_brand + (null != currentProductObject.csp_name ? currentProductObject.csp_name : ""), currentProductObject.csp_brandAndName = currentProductObject.csp_brandAndName.length > 70 ? currentProductObject.csp_brandAndName.slice(0, 64) + "..." : currentProductObject.csp_brandAndName, currentProductObject.hasTooltip = null === currentProductTooltipObject ? "" : this._productHasTooltip(currentProductTooltipObject.typeOfTooltip) !== !0 || shop.device.isMobile ? "" : "tooltip", currentProductObject.csp_URL ? (null !== currentProductTooltipObject && (delete currentProductObject.csp_variantsJSON, currentProductTooltipObject.csp_orderNumber = currentProductObject.csp_orderNumber), productItemTemplate.setPlaceholder(currentProductObject)
                        .setExceptions({
                            getTagForDevice: function() {
                                return "tablet" === shop.device.type ? "div" : "a"
                            },
                            getTagAttrForDevice: function() {
                                return "tablet" === shop.device.type ? "data-href" : "href"
                            },
                            getProductID: function() {
                                return currentProductObject.csp_orderNumber
                            },
                            getNewFlagCssClass: function() {
                                return currentProductObject.csp_newFlag !== !1 ? "visible" : "hidden"
                            },
                            getSpecialOfferDiscount: function() {
                                var discount = currentProductObject.csp_specialOfferDiscount;
                                return discount ? self._getSpecialOfferDiscountHTML({
                                    csp_specialOfferDiscount: discount,
                                    discountBadgeSizeClass: discount.indexOf(".") >= 0 ? "small" : ""
                                }) : ""
                            },
                            getSaleFlagCssClass: function() {
                                return currentProductObject.csp_saleFlag !== !1 ? "visible" : "hidden"
                            },
                            getTopFlagCssClass: function() {
                                return currentProductObject.csp_showTopOfferHint !== !1 ? "visible" : "hidden"
                            },
                            getProductActionFlagImg: function() {
                                if (null !== currentProductObject.csp_flagUrl) {
                                    var imgURL = self._getNewProductActionImgHTML({
                                        csp_flagUrl: currentProductObject.csp_flagUrl
                                    });
                                    return imgURL
                                }
                                return ""
                            },
                            getProductHoverImgHTML: function() {
                                if (null !== currentProductObject.csp_hoverImgURL && "" !== currentProductObject.csp_hoverImgURL) {
                                    var hoverImgHTML = self._getNewHoverImgHTML({
                                        csp_hoverImgURL: currentProductObject.csp_hoverImgURL,
                                        csp_orderNumber: currentProductObject.csp_orderNumber,
                                        csp_imgWidth: imgWidth,
                                        csp_imgHeight: imgHeight
                                    });
                                    return hoverImgHTML
                                }
                                return ""
                            },
                            getTooltipAlignment: function() {
                                return self._getTooltipAlignmentClass()
                            },
                            getProductTooltipHTML: function() {
                                return currentProductTooltipObject ? self._getNewTooltipHTML(currentProductTooltipObject) : void 0
                            },
                            getProductPriceHTML: function() {
                                var priceHTML = self._getNewPriceHTML({
                                    csp_price: currentProductObject.csp_price,
                                    csp_oldPrice: currentProductObject.csp_oldPrice || null,
                                    csp_priceType: currentProductObject.csp_priceType && "from" === currentProductObject.csp_priceType.toLowerCase() ? self.view.text_fromPrice + " " : "",
                                    csp_currency: currentProductObject.csp_currency,
                                    csp_showTopOfferHint: currentProductObject.csp_showTopOfferHint
                                });
                                return priceHTML
                            },
                            getBasePriceHTML: function() {
                                var basePriceHTML = self._getNewBasePriceHTML({
                                    csp_basePrice: currentProductObject.csp_basePrice ? self.view.text_basePrice + " " + currentProductObject.csp_basePrice : ""
                                });
                                return basePriceHTML
                            },
                            getProductRating: function() {
                                return self._getNewStarRatingHTML({
                                    csp_averageRating: currentProductObject.csp_averageRating
                                })
                            }
                        }), currentItemHTML = productItemTemplate.render()) : self._setCreatedItems(self._getCreatedItems() - 1)), productItemsHTML += currentItemHTML
                }
                return productItemsHTML
            }
        },
        _calcIntervallSpeed: function(distanceToTop, distanceToBottom, intervallMinSpeed, intervallMaxSpeed, deathZone, isElementVisible) {
            if (isElementVisible) {
                var distanceToElement = Math.min(distanceToTop, distanceToBottom);
                if (deathZone > distanceToElement) {
                    var percentageDistance = 100 / deathZone * distanceToElement,
                        speed = intervallMaxSpeed / 100 * percentageDistance;
                    return intervallMinSpeed > speed ? intervallMinSpeed : speed > intervallMaxSpeed ? intervallMaxSpeed : parseInt(speed, 10)
                }
                return intervallMaxSpeed
            }
            return intervallMaxSpeed
        },
        _checkScrollPositionController: function() {
            var self = this,
                viewPortHeight = this.view.viewportHeight,
                showStickySortBoxAtDistance = this.options.showFilterBoxAtDistance,
                preloadNextItemsAtDistance = 0,
                calcPreloadNextItemsAtDistance = function() {
                    return Math.ceil(self.view.viewportHeight / 100 * self.options.preloadNextItemsAtDistance)
                };
            setInterval(function() {
                    var loadNextPageNumber, distanceToTopOfFilterMenu = self.view.getDistanceToTopOfFilterMenu(),
                        distanceToBottomOfResults = self.view.getDistanceToBottomOfResults(),
                        isStickySortBoxVisible = self.view.isStickySortBoxVisible,
                        isFooterVisible = self.view.isFooterVisible,
                        totalPagesToLoad = self.numberOfPages;
                    if (self._checkScrollPositionIntervall = self._calcIntervallSpeed(distanceToTopOfFilterMenu, isFooterVisible ? distanceToBottomOfResults : distanceToTopOfFilterMenu, self.options.checkScrollPositionMinIntervall, self.options.checkScrollPositionMaxIntervall, 2 * viewPortHeight, isStickySortBoxVisible), distanceToTopOfFilterMenu > showStickySortBoxAtDistance && !isStickySortBoxVisible && 0 !== distanceToBottomOfResults ? self.view.showStickySortBox() : showStickySortBoxAtDistance > distanceToTopOfFilterMenu && isStickySortBoxVisible ? self.view.hideStickySortBox() : isFooterVisible && 0 === distanceToBottomOfResults && self.view.hideStickySortBox(), !self.isNextSearchResultLoading)
                        if (loadNextPageNumber = self.loadNextPageNumber, totalPagesToLoad >= loadNextPageNumber) {
                            var currentScrollPos = self.view.getScrollPosition(),
                                lastScrollPos = self.view.lastScrollPosition;
                            preloadNextItemsAtDistance >= distanceToBottomOfResults && currentScrollPos >= lastScrollPos ? (self._loadNewSearchResultsJSON(), self.view.setLastScrollPosition()) : lastScrollPos > currentScrollPos && self.view.setLastScrollPosition()
                        } else self.view.showFooter()
                }, self._checkScrollPositionIntervall), preloadNextItemsAtDistance = calcPreloadNextItemsAtDistance(), $(window)
                .on("resize", function() {
                    preloadNextItemsAtDistance = calcPreloadNextItemsAtDistance()
                })
        }
    }, $(function() {
        if ("Search result Page" === shop.page.name && shop.searchresult) shop.add("searchResultPage", {}), shop.searchResultPage = new SearchResultClass;
        else if ("ProductDetailsPage" === shop.page.name || $("#pds_product_details_pager")
            .length > 0 || "Product Review Aggregation Page" === shop.page.name) shop.add("searchResultCache", {}), shop.searchResultCache.init = SearchResultCache.init, shop.searchResultCache.init();
        else {
            if ("Product Review Aggregation Page" === shop.page.name) return;
            shop.add("searchResultCache", {}), shop.searchResultCache.init = SearchResultCache.init, shop.searchResultCache.clearCache = SearchResultCache.clearCache, shop.searchResultCache.init(), null !== shop.searchResultCache.lastCachedObj && shop.searchResultCache.clearCache()
        }
    })
}(jQuery),
function($) {
    "use strict";
    $(function() {
        function resetFlyout() {
            rootNavigationElement.removeClass("touch"), $(rootNavigationLayer)
                .each(function() {
                    $(this)
                        .removeClass("activeLayer")
                })
        }
        var rootNavigationSelector = $("#root-nav"),
            rootNavigationElement = rootNavigationSelector.find("li.La"),
            customRootNavigationElements = rootNavigationSelector.find("li.La.custom"),
            rootNavigationAnchor = rootNavigationElement.find(" > a"),
            rootNavigationLayer = rootNavigationSelector.find("ul.Lb"),
            flyOutdelayTime = 300;
        customRootNavigationElements.each(function(index) {
                var navigationElement = "navigationElement" + index;
                shop.add(navigationElement, new RootNavigationElement($(this)))
            }), shop.device.hasTouch ? (resetFlyout(), "ie" === shop.device.browser && $(rootNavigationAnchor)
                .on("click", function(e) {
                    e.preventDefault()
                }), $(rootNavigationAnchor)
                .hammer()
                .on("touch tab", function(e) {
                    e.gesture.preventDefault();
                    var $this = $(this),
                        $naviLayer = $this.next(rootNavigationLayer);
                    $naviLayer.hasClass("activeLayer") || 0 === $naviLayer.length ? location.href = $this.attr("href") : (resetFlyout(), $naviLayer.addClass("activeLayer"), $this.parent()
                            .addClass("touch")), $(document)
                        .hammer()
                        .on("touch", function(e) {
                            0 === $(e.target)
                                .closest(rootNavigationSelector)
                                .length && resetFlyout()
                        })
                })) : "msie" !== $.ua.browser.name || $.ua.browser.version > 9 ? $(rootNavigationLayer, rootNavigationSelector)
            .addClass("css3only") : (rootNavigationSelector.on("mouseenter.rootNavigation", rootNavigationAnchor, function() {
                var $this = $(this);
                $this.parent()
                    .hasClass("no-hover") || $this.parent()
                    .find(rootNavigationLayer)
                    .delay(flyOutdelayTime)
                    .show(0)
            }), rootNavigationSelector.on("mouseleave.rootNavigation", rootNavigationAnchor, function() {
                var $this = $(this);
                $this.parent()
                    .hasClass("no-hover") || $this.parent()
                    .find(rootNavigationLayer)
                    .hide(0)
            }))
    })
}(jQuery),
function($, w) {
    var newSlider = function($elem, optionObj) {
            return new w.Slider($elem, optionObj)
        },
        loadSlider = function($elem, options, callback, failCallback) {
            return new SimpleComponentLoader($elem, options, callback, failCallback)
        },
        buildCarousel = function($rootElem) {
            var $pCarouselOverlay = $rootElem.find(".pcarousel-overlay"),
                $carouselBigArticle = $rootElem.find(".pcarousel-bigArticle"),
                $carouselSmallArticle = $rootElem.find(".pcarousel-smallArticle"),
                $carouselPushedProducts = $rootElem.hasClass("pcarousel--pushed-product") ? $rootElem : $rootElem.find(".pcarousel--pushed-product"),
                $searchRightCarouselSmallArticle = $("#search-right-column")
                .find($rootElem)
                .find(".pcarousel-smallArticle"),
                $searchRightCarouselBigArticle = $("#search-right-column")
                .find($rootElem)
                .find(".pcarousel-bigArticle"),
                $searchLeftCarouselBigArticle = $("#search-left-column")
                .find($rootElem)
                .find(".pcarousel-bigArticle"),
                $searchLeftCarouselSmallArticle = $("#search-left-column")
                .find($rootElem)
                .find(".pcarousel-smallArticle"),
                searchLeftRightSelector = "#search-left-column, #search-right-column",
                viewPortWidth = parseInt($(window)
                    .width() + (window.mobile ? mobile.scrollbarWidth() : 0), 10),
                mobileSize1 = 651,
                mobileSize2 = 401,
                isMobileSize1 = mobileSize1 > viewPortWidth && shop.device.isMobile,
                isMobileSize2 = mobileSize2 > viewPortWidth && shop.device.isMobile;
            return $carouselBigArticle.length > 0 && $carouselBigArticle.closest(searchLeftRightSelector)
                .length < 1 && newSlider($carouselBigArticle, {
                    orientation: "horizontal",
                    pagerSteps: isMobileSize1 ? 3 : isMobileSize2 ? 2 : 5,
                    auto: !1,
                    width: isMobileSize1 || isMobileSize2 ? $carouselBigArticle.width() : "905",
                    wrapper: ".pcarousel-wrapper",
                    productcarousel: !0
                }), $carouselSmallArticle.length > 0 && $carouselSmallArticle.closest(searchLeftRightSelector)
                .length < 1 && newSlider($carouselSmallArticle, {
                    orientation: "horizontal",
                    pagerSteps: isMobileSize1 ? 3 : isMobileSize2 ? 2 : 7,
                    auto: !1,
                    width: isMobileSize1 || isMobileSize2 ? $carouselSmallArticle.width() : "905",
                    wrapper: ".pcarousel-wrapper",
                    productcarousel: !0
                }), $carouselPushedProducts.length > 0 && newSlider($carouselPushedProducts, {
                    orientation: "horizontal",
                    pagerSteps: isMobileSize2 ? 2 : 3,
                    auto: !1,
                    width: isMobileSize1 || isMobileSize2 ? $carouselPushedProducts.width() : "760",
                    wrapper: ".pushed-product--wrapper",
                    productcarousel: !0
                }), $searchRightCarouselSmallArticle.length > 0 && newSlider($searchRightCarouselSmallArticle, {
                    orientation: "horizontal",
                    pagerSteps: isMobileSize1 ? 3 : isMobileSize2 ? 2 : 4,
                    auto: !1,
                    width: isMobileSize1 || isMobileSize2 ? $searchRightCarouselSmallArticle.width() : "608",
                    wrapper: ".pcarousel-wrapper",
                    productcarousel: !0
                }), $searchRightCarouselBigArticle.length > 0 && newSlider($searchRightCarouselBigArticle, {
                    orientation: "horizontal",
                    pagerSteps: isMobileSize1 ? 3 : isMobileSize2 ? 2 : 4,
                    auto: !1,
                    width: isMobileSize1 || isMobileSize2 ? $searchRightCarouselBigArticle.width() : "612",
                    wrapper: ".pcarousel-wrapper",
                    productcarousel: !0
                }), $searchLeftCarouselBigArticle.length > 0 && newSlider($searchLeftCarouselBigArticle, {
                    orientation: "vertical",
                    pagerSteps: 4,
                    auto: !1,
                    wrapper: ".pcarousel-wrapper",
                    productcarousel: !0
                }), $searchLeftCarouselSmallArticle.length > 0 && newSlider($searchLeftCarouselSmallArticle, {
                    orientation: "vertical",
                    pagerSteps: 4,
                    auto: !1,
                    wrapper: ".pcarousel-wrapper",
                    productcarousel: !0
                }), $("#search-right-column")
                .css("min-height", $("#search-left-column")
                    .height()), $(".pcarousel .star-rating", $rootElem)
                .makeStars(), $pCarouselOverlay.length > 0 ? new Overlay($pCarouselOverlay, {
                    width: "400",
                    height: "300",
                    styleClass: "pcarousel-overlay",
                    closeAlways: !1
                }, function() {
                    $(".js-remove-last-items")
                        .on("click", function(e) {
                            e.preventDefault();
                            var url = $(this)
                                .attr("href");
                            $.ajax({
                                url: url,
                                type: "GET",
                                success: function(data) {
                                    var result = $.parseJSON(data);
                                    result.LastSeenProductsDeleted && window.location.reload(!1)
                                }
                            })
                        })
                }) : void 0
        };
    $(function() {
        var $carousels = $(".js-async-carousel"),
            amountOfAllCarousels = $carousels.length || 0;
        $(".pcarousel--pushed-product")
            .length > 0 && buildCarousel($(".pcarousel--pushed-product")), shop.prudsysTracking || (shop.prudsysTracking = new PrudsysApi(amountOfAllCarousels)), $carousels.each(function() {
                var $self = $(this),
                    prudsysItemIdList = shop.prudsysItemIdList || null;
                loadSlider($self, {
                    parameters: {
                        prudsysItemIdList: prudsysItemIdList
                    }
                }, function() {
                    $self.children()
                        .length > 0 && buildCarousel($self), shop.prudsysTracking.count()
                })
            })
    })
}(jQuery, window),
function($) {
    "use strict";
    $(function() {
        if ("ProductDetailsPage" === shop.page.name) {
            var $pds = $("#product-details"),
                isEnabled = !!$pds.data("vivocha-enabled");
            isEnabled && ! function() {
                var t = document.createElement("script");
                t.type = "text/javascript", t.async = !0, t.src = "//www.vivocha.com/a/schneider/api/vivocha.js";
                var n = document.getElementsByTagName("script")[0];
                n.parentNode.insertBefore(t, n)
            }()
        }
    })
}(jQuery),
function() {
    "use strict";
    ("ProductDetailsPage" === shop.page.name || "OutOfStockProductDetailsPage" === shop.page.name || "Product Review Aggregation Page" === shop.page.name) && $(function() {
        var $pdsPager = $("#pds_product_details_pager");
        if ($pdsPager.length > 0) {
            var $backToResults = $pdsPager.find(".back-to-results"),
                $pdsBack = $pdsPager.find(".js-pds-back"),
                $backToResultsAnchor = $backToResults ? $backToResults.find("a")
                .length > 0 ? $backToResults.find("a") : $backToResults : null;
            $backToResultsAnchor.length > 0 && 0 === $pdsBack.length && (shop.searchResultCache ? !!shop.searchResultCache.lastCachedObj : !1) ? $backToResultsAnchor.attr("href", shop.searchResultCache.lastCachedObj.jumpBackURL) : ($backToResultsAnchor.length > 0 || $pdsBack.length > 0) && ($backToResultsAnchor.attr("href", "javascript:history.back()"), $pdsBack.attr("href", "javascript:history.back()"))
        }
    })
}(),
function($) {
    "use strict";
    var registerAccountNavEvents = function() {
        var $accountNav = $("#account-nav"),
            $accountFlyoutBtn = $accountNav.find(".my-account-flyout-btn");
        $accountFlyoutBtn.length > 0 && shop.device.hasTouch && $accountFlyoutBtn.hammer()
            .on("click touch tab", function(e) {
                e.preventDefault(), e.stopPropagation(), e.gesture.preventDefault(), e.gesture.stopPropagation(), $accountFlyoutBtn.toggleClass("touch"), $(document)
                    .hammer()
                    .on("touch", function(e) {
                        0 === $(e.target)
                            .closest($accountNav)
                            .length && $accountFlyoutBtn.removeClass("touch")
                    })
            })
    };
    $(function() {
        registerAccountNavEvents()
    })
}(jQuery),
function($) {
    "use strict";
    "Checkout Summary Page" === shop.page.name && $(window)
        .on("load", function() {
            try {
                $("#adDegree-hash")
                    .val(atrk_get_uid())
            } catch (e) {
                new Log({
                    level: 4,
                    type: "error",
                    message: "Could not create AdDegree Hash. AdDegree not loaded!"
                })
            }
        })
}(jQuery),
function($) {
    $(function() {
        !($.ua.browser.opera && $.ua.browser.opera < shop.browserUpdate.version.opera || $.ua.browser.firefox && $.ua.browser.firefox < shop.browserUpdate.version.firefox || $.ua.browser.safari && $.ua.browser.safari < shop.browserUpdate.version.safari || $.ua.browser.chrome && $.ua.browser.chrome < shop.browserUpdate.version.chrome || $.ua.browser.ie && $.ua.browser.ie < shop.browserUpdate.version.ie) || document.getElementById("emergency") && "ios" != shop.device.os && "andriod" != shop.device.os || $(".message", "#browser-update")
            .attr("href", shop.browserUpdate.href)
            .html(shop.browserUpdate.message)
            .parent()
            .show()
    })
}(jQuery),
function($) {
    "use strict";
    var loadNewPageJSON = function(requestURL, parameters) {
        var request = $.ajax({
            url: requestURL,
            data: parameters,
            dataType: "json",
            type: "POST",
            async: !0,
            context: this
        });
        return request
    };
    $.fn.equalHeights = function(inner) {
        return $(this)
            .each(function() {
                var currentTallest = 130;
                inner ? ($(this)
                    .children()
                    .each(function() {
                        $(this)
                            .children()
                            .height() > currentTallest && (currentTallest = $(this)
                                .children()
                                .height())
                    }), $(this)
                    .children()
                    .children("div")
                    .css({
                        "min-height": currentTallest
                    })) : ($(this)
                    .children()
                    .each(function() {
                        $(this)
                            .height() > currentTallest && (currentTallest = $(this)
                                .height())
                    }), $(this)
                    .children("div")
                    .css({
                        "min-height": currentTallest
                    }))
            }), this
    }, $(function() {
        var $paymentForm = $("#paymentDetailsForm");
        if (null !== $paymentForm) {
            var $paymentFormButton = $("#paymentFormButton"),
                movePaymentModeButton = function($newParent) {
                    null !== $newParent && ($paymentFormButton.remove(), $paymentFormButton.show()
                        .prop("disabled", !1), $newParent.append($paymentFormButton))
                };
            window.shop && (window.shop.movePaymentModeButton = movePaymentModeButton);
            var paymentModeToolify = function() {
                var paymentModeCallBack = function() {
                        var requestData, formURL = $(this)
                            .closest("form")
                            .data("ajax-action"),
                            formParameters = $(this)
                            .closest("form")
                            .serializeArray(),
                            $self = $(this);
                        requestData = loadNewPageJSON(formURL, formParameters), requestData.done(function(data) {
                            "" !== data.tags.naviCart && (window.shop.movePaymentModeButton($self.parent(".paymentmode")), $("#naviCart")
                                .replaceWith(data.tags.naviCart))
                        })
                    },
                    $radios = $paymentForm.find("input[type=radio][name=paymentModeCode]");
                $radios.on("click.paymentmode-movebutton", paymentModeCallBack), $radios.is(":checked") || $paymentFormButton.hide()
                    .prop("disabled", !0), $radios.filter(":checked")
                    .click()
            };
            paymentModeToolify(), $(".checkout-step--address .address-box--same-height")
                .equalHeights(!0), $(".checkout-step--payment .address-box--same-height")
                .equalHeights(), $(".checkout-step--summary .address-box--same-height")
                .equalHeights(), $(".address-content .address-box--same-height")
                .equalHeights(!0)
        }
        if ($(".checkout-step--payment .paymentmode:last-of-type")
            .addClass("last-element"), $("#voucher_box .voucher-code")
            .length) {
            $('#paymentDetailsForm input:radio[value="klarnaaccount"]')
                .attr({
                    "data-overlay-content": "#klarnaaccount-overlay",
                    "data-overlay-title": " ",
                    "data-overlay-confirm": !0
                }); {
                new Overlay('#paymentDetailsForm input:radio[value="klarnaaccount"]', {
                    width: "400",
                    styleClass: "klarnaaccount-overlay"
                }, function() {
                    $("#voucher_box_wrapper")
                        .show()
                })
            }
        }
        $("#payment-klarnaActionCode option")
            .each(function() {
                var optionVal = $(this)
                    .val();
                $(this)
                    .addClass("js-klarna-" + optionVal)
            })
    })
}(jQuery),
function() {}(jQuery),
function($) {
    $(document)
        .ready(function() {
            $(".expandable-banner-head")
                .on("click.expandable-banner", function() {
                    $(this)
                        .next(".expandable-banner-body")
                        .slideToggle(), $(this)
                        .find(".expandable-banner-open, .expandable-banner-close")
                        .toggle()
                })
        })
}(jQuery),
function($) {
    "use strict";
    var toggleVisibility = function(target, visible) {
            var $target = $(target);
            visible ? $target.show() : $target.hide()
        },
        disableScrolling = function(target, disableScroll) {
            var $target = $(target);
            disableScroll ? $target.css({
                    overflow: "hidden",
                    height: window.innerHeight
                })
                .hammer()
                .on("touch tap gesture", function(e) {
                    e.gesture.preventDefault()
                }) : $target.css({
                    overflow: "visible",
                    height: "auto",
                    "touch-action": "initial"
                })
                .hammer()
                .off("touch tap gesture")
        };
    window.shop && (window.shop.toggleVisibility = toggleVisibility, window.shop.disableScrolling = disableScrolling);
    var toolifyInputForVisibility = function($invoker, $target, invisible) {
        if (invisible = invisible || !1, null !== $invoker || null !== $target) {
            if (null === $target) {
                var targetSelector = $invoker.data("visibility-toggle-for");
                $target = $(targetSelector)
            } else if (null === $invoker) {
                var invokerSelector = $target.data("visibility-toggle-by");
                $invoker = $(invokerSelector)
            }
            if ($invoker.is(":radio")) {
                var $others = $("input[name='" + $invoker.attr("name") + "']");
                $others.each(function(ix, element) {
                    var $element = $(element);
                    $element.val() != $invoker.val() && $element.on("change.visibility-toggle", function() {
                        invisible ? window.shop.toggleVisibility($target, !$invoker.is(":checked")) : window.shop.toggleVisibility($target, $invoker.is(":checked"))
                    })
                })
            } else if ($invoker.is("option")) {
                var $others = $invoker.siblings();
                $others.each(function(ix, element) {
                        var $element = $(element)
                            .parent("select");
                        $element.val() != $invoker.val() && $element.on("change.visibility-toggle", function() {
                            invisible ? window.shop.toggleVisibility($target, !$invoker.is(":checked")) : window.shop.toggleVisibility($target, $invoker.is(":checked"))
                        })
                    }), $invoker.parent("select")
                    .on("change.visibility-toggle", function() {
                        invisible ? window.shop.toggleVisibility($target, !$invoker.is(":checked")) : window.shop.toggleVisibility($target, $invoker.is(":checked"))
                    })
            }
            $invoker.on("change.visibility-toggle", function() {
                invisible ? window.shop.toggleVisibility($target, !$invoker.is(":checked")) : window.shop.toggleVisibility($target, $invoker.is(":checked"))
            })
        }
    };
    $.fn.makeStars = function() {
        var $this = $(this);
        $(function() {
            $this.each(function() {
                var rating = $(this)
                    .data("rating"),
                    starNumber = $(this)
                    .children()
                    .length,
                    fullStars = Math.floor(rating),
                    halfStarPerc = 100 * (rating - fullStars);
                if (rating > 0 && $(this)
                    .children()
                    .each(function(index) {
                        return $(this)
                            .addClass("fa-star-active"), fullStars > index + 1
                    }), 0 !== halfStarPerc && starNumber > fullStars) {
                    var halfStar = $(this)
                        .children(":nth-child(" + parseInt(fullStars + 1, 10) + ")");
                    $('<i class="fa fa-star fa-star-active fa-star-percentage"></i>')
                        .width(halfStarPerc + "%")
                        .appendTo(halfStar)
                }
                if ("ie" === shop.device.browser && shop.device.browserVersion < 10) {
                    var $style, $this = $(this);
                    return $style = $('<style type="text/css">:before,:after{content:none !important}</style>'), $("head")
                        .append($style), setTimeout(function() {
                            return $this.hide(function() {
                                $this.show("50ms")
                            }), $style.remove()
                        }, 0)
                }
            })
        })
    }, $(function() {
        $(".js-backbutton")
            .click(function(e) {
                e = e || window.event, e.preventDefault(), window.history.back()
            })
    }), $(function() {
        $("[data-visibility-toggle-for]")
            .each(function(ix, element) {
                var $invoker = $(element);
                toolifyInputForVisibility($invoker), $invoker.trigger("change")
            }), $("[data-visibility-toggle-by]")
            .each(function(ix, element) {
                var $target = $(element),
                    $invoker = $($target.data("visibility-toggle-by"));
                toolifyInputForVisibility($invoker, $target), $invoker.trigger("change")
            }), $("[data-invisibility-toggle-by]")
            .each(function(ix, element) {
                var $target = $(element),
                    $invoker = $($target.data("invisibility-toggle-by"));
                toolifyInputForVisibility($invoker, $target, !0), $invoker.trigger("change")
            }), $('input[type="number"]')
            .on("input", function() {
                $(this)
                    .focus()
            })
    });
    var entityMap = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
            "/": "&#x2F;"
        },
        escapeHtml = function(string) {
            return String(string)
                .replace(/[&<>"'\/]/g, function(s) {
                    return entityMap[s]
                })
        };
    window.shop && (window.shop.escapeHTML = escapeHtml);
    var clearElementOrphans = function() {
        $("[data-connected-with-elements]")
            .each(function(ix, elem) {
                var $elem = $(elem),
                    elementsSelector = $elem.attr("data-connected-with-elements");
                "" !== elementsSelector && 0 === $(elementsSelector)
                    .length && $elem.remove()
            })
    };
    window.shop && (window.shop.clearElementOrphans = clearElementOrphans)
}(jQuery),
function($, shop) {
    "use strict";
    var KingCampaingBanner = function(elem) {
        elem.length > 0 && (this.namespace = "KingCampaingBanner", this.$elem = $(elem), this.requestParameters = {
            componentCode: this.$elem.data("uid")
        }, this.requestURL = location.protocol + "//" + location.host + shop.url.base + "componentweight", this.bindEventHandler(this.$elem))
    };
    KingCampaingBanner.prototype = {
        bindEventHandler: function($elem) {
            var self = this,
                hitCounter = 0;
            $elem.on("click." + this.namespace + " contextmenu." + this.namespace, function(e) {
                var $self = $(this),
                    gotoTarget = function() {
                        location.href = $self.attr("href")
                    };
                "contextmenu" !== e.type && e.preventDefault(), 0 === hitCounter ? (hitCounter++, self.sendCampaign(function() {
                    "click" === e.type && gotoTarget()
                })) : hitCounter > 0 && "click" === e.type && gotoTarget()
            })
        },
        sendCampaign: function(successCallback) {
            $.ajax({
                type: "get",
                url: this.requestURL,
                data: this.requestParameters,
                success: function() {
                    return successCallback && $.isFunction(successCallback) ? successCallback() : void 0
                }
            })
        }
    }, $(function() {
        $(".king-campaign-banner")
            .each(function(i) {
                shop.add("banner"), shop.banner["kingCampaingBanner" + i] = new KingCampaingBanner($(this))
            })
    })
}(jQuery, window.shop),
function() {
    "use strict";
    var mailtoToolify = function() {
            var mailtoCallback = function(e) {
                e.preventDefault();
                var decodedMail = window.shop.mailtoDecode($(this)
                    .data("mail"));
                window.top.location = decodedMail
            };
            $(function() {
                $("[data-mail]")
                    .on("click.mailto-decode", mailtoCallback)
            })
        },
        mailtoDecode = function(base64mail) {
            return "mailto:" + $.base64.decode(base64mail)
        };
    window.shop && (window.shop.mailtoDecode = mailtoDecode), mailtoToolify()
}(),
function($) {
    "use strict";
    var MiniCart = function(elementID) {
        this.$miniCartContainer = $(elementID), this.$miniCartAnchor = this.$miniCartContainer.find("a.minicart-icon"), this.$miniCartAmountBubble = this.$miniCartContainer.find(".minicart-amount"), this.$miniCartData = this.$miniCartContainer.find("#minicart-data"), this.miniCartAnimationSpeed = "1000", this.miniCartAnimationDelay = "1000", this.isTouchDeviceBoolean = shop.device.hasTouch, this.isLowerThanIE10Boolean = !!("ie" === shop.device.browser && shop.device.browserVersion < 10), this.eventHandlerArray = this.isTouchDeviceBoolean ? ["click"] : ["mouseover", "mouseout"], this.amount = this._getAmount(), this.amountIsVisible = this.amount > 0, this.isVisible = !1, this._bindEventHandlerController(this.$miniCartAnchor, this.eventHandlerArray, this.isTouchDeviceBoolean, this.isLowerThanIE10Boolean)
    };
    MiniCart.prototype = {
        add: function(html, $replaceElement) {
            html = $($.parseHTML(html))
                .find("#minicart_items")
                .html(), ($replaceElement || this.$miniCartData)
                .find("#minicart_items")
                .children()
                .remove()
                .end()
                .append(html), this._refreshMiniCartController()
        },
        showOrHide: function(showOrHide) {
            if ("show" === showOrHide || "hide" === showOrHide) {
                switch (showOrHide) {
                    case "show":
                        this.isVisible = !0, this.isLowerThanIE10Boolean && this._showLowerThanIE10(this.miniCartAnimationSpeed, this.miniCartAnimationDelay);
                        break;
                    case "hide":
                        this.isVisible = !1, this.isLowerThanIE10Boolean && this._hideLowerThanIE10(this.miniCartAnimationSpeed, this.miniCartAnimationDelay)
                }
                this.$miniCartContainer.removeClass("show-js hide-js")
                    .addClass(showOrHide + "-js")
            }
        },
        _showLowerThanIE10: function(speed, delay) {
            this.$miniCartData.stop(!0, !0)
                .delay(delay)
                .slideDown(speed)
        },
        _hideLowerThanIE10: function(speed, delay) {
            this.$miniCartData.stop(!0, !0)
                .delay(delay)
                .slideUp(speed)
        },
        _showAmount: function() {
            this.amountIsVisible !== !0 && (this.$miniCartAmountBubble.removeClass("amount-hidden")
                .addClass("amount-visible"), this.amountIsVisible = !1)
        },
        _hideAmount: function() {
            this.amountIsVisible !== !1 && (this.$miniCartAmountBubble.removeClass("amount-visible")
                .addClass("amount-hidden"), this.amountIsVisible = !1)
        },
        _updateMiniCartMobile: function() {
            $("#minicart_items-mobile")
                .children()
                .remove(), $("#minicart_items")
                .clone(!0)
                .appendTo("#minicart_items-mobile"), shop.mobileMiniCart.init()
        },
        _refreshMiniCartController: function() {
            this._refreshAmount(), shop.device.isMobile && this._updateMiniCartMobile()
        },
        _getAmount: function() {
            return parseInt(this.$miniCartContainer.find(".items")
                .attr("data-cart-amount"), 10)
        },
        _refreshAmount: function() {
            this.amount = this._getAmount(), this.$miniCartAmountBubble.text(this.amount), this.amount > 0 ? this._showAmount() : this._hideAmount()
        },
        _getEventHandlerForElementAndDevice: function($element, eventHandlerArray) {
            var i, eventHandlerArrayLength, elementID = $element.attr("class"),
                eventHandler = "";
            for (i = 0, eventHandlerArrayLength = eventHandlerArray.length; eventHandlerArrayLength > i; i++) eventHandler += eventHandlerArray[i] + "." + elementID + " ";
            return eventHandler
        },
        _bindEventHandlerController: function($element, eventHandlerArray, isTouchDeviceBoolean, isLowerThanIE10Boolean) {
            isTouchDeviceBoolean && !shop.device.isMobile || isLowerThanIE10Boolean && !shop.device.isMobile ? isTouchDeviceBoolean ? this._bindEventHandlerForTouchDevices($element, eventHandlerArray) : isLowerThanIE10Boolean && this._bindHandlerForLowerThanIE10Event($element, eventHandlerArray) : delete this._bindEventHandlerController
        },
        _bindEventHandlerForTouchDevices: function($element, eventHandlerArray) {
            var eventHandler = this._getEventHandlerForElementAndDevice($element, eventHandlerArray),
                self = this;
            $element.on(eventHandler, function(e) {
                e.preventDefault(), e.stopPropagation(), self.isVisible ? window.location.href = $(this)
                    .attr("href") : (self.showOrHide("show"), $(document)
                        .hammer()
                        .on("touch", function(e) {
                            0 === $(e.target)
                                .closest(self.$miniCartContainer)
                                .length && self.showOrHide("hide")
                        }))
            })
        },
        _bindHandlerForLowerThanIE10Event: function($element, eventHandlerArray) {
            var eventHandler = this._getEventHandlerForElementAndDevice($element, eventHandlerArray),
                $element = $element.add(this.$miniCartData),
                self = this;
            $element.on(eventHandler, function(e) {
                switch (e.type) {
                    case "mouseover":
                        self.showOrHide("show");
                        break;
                    case "mouseout":
                        self.showOrHide("hide")
                }
            })
        }
    }, $(function() {
        $("#minicart")
            .length > 0 && (shop.miniCart = new MiniCart("#minicart"))
    })
}(jQuery),
function() {}(jQuery),
function($) {
    "use strict";
    var toggleAddressFields = function(show, $selector, $inputs, $area) {
        show ? ($area.show(), $inputs.attr("disabled", !1)
            .prop("disabled", !1), $selector.val("true")) : ($area.hide(), $inputs.attr("disabled", !0)
            .prop("disabled", !0), $selector.val("false"))
    };
    window.shop && (window.shop.toggleAddressFields = toggleAddressFields), $(document)
        .ready(function() {
            var $addressForm = $("#addressForm");
            $addressForm.length > 0 && $(window)
                .load(function() {
                    $("html, body")
                        .animate({
                            scrollTop: $addressForm.offset()
                                .top
                        }, 250)
                })
        })
}(jQuery),
function() {
    "use strict";
    $(function() {
        if ("AccountReviewDetailPage" === shop.page.name) {
            var $reviewBarRating = $("#product-details-mini")
                .find(".review-bar-rating"),
                $accountReviewRating = $(".review-details-top")
                .find(".star-rating");
            $reviewBarRating.length > 0 && $reviewBarRating.makeStars(), $accountReviewRating.length > 0 && $accountReviewRating.makeStars()
        }
    })
}(),
function($) {
    "use strict";
    $(function() {
        if (1 !== $("#waCalculator")
            .length) return !1;
        var hasFlash = !1;
        try {
            var fo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
            fo && (hasFlash = !0)
        } catch (e) {
            void 0 !== navigator.mimeTypes["application/x-shockwave-flash"] && (hasFlash = !0)
        }
        hasFlash || ($("#waCalculator, #waCalculatorBox")
            .hide(), $("#waCalculator")
            .after('<div class="information_message negative wa-config-no-flash">' + shop.waConfigurator.noFlashMessage + "</div>"))
    })
}(jQuery),
function() {
    "use strict";
    $(function() {
        var $reviewBarRating;
        "Product Review Aggregation Page" === shop.page.name ? (shop.add("productDetailsPageMini", {}), shop.productDetailsPageMini = new Product("#product-details-mini"), shop.productDetailsPageMini.displayVariantForMiniProductDetails(), null !== shop.productDetailsPageMini.getVariantSizeCode() && shop.productDetailsPageMini.displayVariantSizeForMiniProductDetails(), shop.add("addToCartPDSMini", {}), shop.addToCartPDSMini = new AddToCart("cart", "#product-details-mini", shop.productDetailsPageMini), shop.add("addToWatchlistPDSMini", {}), shop.addToWatchlistPDSMini = new AddToCart("watchlist", "#product-details-mini", shop.productDetailsPageMini), $reviewBarRating = $("#product-review-aggregation")
            .find(".review-bar-rating"), $reviewBarRating.length > 0 && $reviewBarRating.makeStars()) : "Product Review Create Page" === shop.page.name && ($reviewBarRating = $("#product-details-mini")
            .find(".review-bar-rating"), $reviewBarRating.length > 0 && $reviewBarRating.makeStars())
    })
}(),
function() {
    "use strict";
    "ProductDetailsPage" === shop.page.name && $(function() {
        shop.add("productDetailsPage", {}), shop.productDetailsPage = new Product("#product-details"), shop.productDetailsPage.displayVariant(), null !== shop.productDetailsPage.getVariantSizeCode() && shop.productDetailsPage.displayVariantSize(), shop.add("addToCartPDS", {}), shop.addToCartPDS = new AddToCart("cart", "#product-details", shop.productDetailsPage), shop.add("addToWatchlistPDS", {}), shop.addToWatchlistPDS = new AddToCart("watchlist", "#product-details", shop.productDetailsPage), "" != $(".pcarousel-wrapper li a .star-rating")
            .text() && $(".pcarousel-wrapper li a .star-rating")
            .makeStars(), $("#product-information .review-bar-rating")
            .length > 0 && $("#product-information .review-bar-rating")
            .makeStars(), $(".review-bar .review-bar-rating")
            .length > 0 && $(".review-bar .review-bar-rating")
            .makeStars(), $(".add-to-cart-content .review-bar-rating")
            .makeStars()
    })
}(),
function($) {
    "use strict";
    $(function() {
        var $passwordInput = $(".js-strength");
        $passwordInput.pstrength(), "" !== $passwordInput.val() && $(".pstrength")
            .show(), $passwordInput.on("keyup", function() {
                "" !== $passwordInput.val() ? $(".pstrength")
                    .show() : $(".pstrength")
                    .hide()
            })
    })
}(jQuery),
function() {
    "use strict";
    $(function() {
        var $reviewBarRatingService = $("#service-reviews")
            .find(".js-review-bar-rating");
        $reviewBarRatingService.length > 0 && $reviewBarRatingService.makeStars()
    })
}(),
function($) {
    "use strict";

    function ScrollToTop() {
        $("#go-to-top-button")
            .on("click", function(e) {
                e.preventDefault(), $("html,body")
                    .animate({
                        scrollTop: 0
                    }, 600)
            })
    }
    $(function() {
        var $sortBox = $("#sort_form1"),
            $sortBoxWrapper = $sortBox.find(".form-wrapper"),
            $sortBoxLabel = $sortBox.find("label");
        shop.device.hasTouch && $sortBox.length > 0 && $sortBoxLabel.hammer()
            .on("touch", function() {
                $sortBoxWrapper.toggleClass("touch")
            }), "Search result Page" === shop.page.name && ScrollToTop()
    })
}(jQuery),
function($) {
    $(function() {
        shop.device.hasTouch && $(".tooltip-icon")
            .each(function() {
                $(this)
                    .hammer()
                    .on("release", function(e) {
                        e.gesture.preventDefault(), e.gesture.stopPropagation(), $(this)
                            .toggleClass("js-touch")
                    })
            }), "ie" === shop.device.browser && "8" === shop.device.browserVersion && $(".review-bar-rating.tooltip")
            .on("mouseover", function() {
                $(".ratingbox-inner")
                    .each(function() {
                        var $this = $(this);
                        $this.css("opacity", "0.5"), setTimeout(function() {
                            $this.css("opacity", "1"), setTimeout(function() {
                                $this.css("visibility", "hidden"), $this.css("visibility", "visible")
                            }, 50)
                        }, 250)
                    })
            })
    })
}(jQuery),
function($) {
    "use strict";
    var defaultWaConfigurator = {
        lastVariantCode: null,
        addConfiguratorDataToCart: function(data) {
            shop.addWaProductToCart(data)
        },
        closeConfigurator: function() {
            null !== this.currentOverlay && (this.currentOverlay.close(), this.currentOverlay = null)
        },
        openConfigurator: function(data) {
            var article = void 0 != data.article ? data.article : shop.productDetailsPage.getCurrentVariantCode(),
                amount = void 0 != data.amount ? data.amount : $("#qty")
                .value,
                channel = void 0 != data.channel ? data.channel : shop.waConfigurator.channel,
                requestURLwQuery = this.configuratorURL + "?channel=" + channel + "&article=" + article + (void 0 != amount ? "&amount=" + amount : "");
            this.presetConfiguration && (requestURLwQuery += "&configuration=" + this.presetConfiguration, this.presetConfiguration = ""), shop.waConfigurator.lastVariantCode = article, this.currentOverlay = new Overlay(null, {
                src: requestURLwQuery,
                type: "iframe",
                width: 980,
                height: 710,
                header: !1
            }), this.currentOverlay.wrap()
        },
        openCalculator: function(target) {
            var $target = $(target),
                $waCalculatorButton = $("#waCalculator"),
                waButtonTextCancel = $waCalculatorButton.attr("data-button-text-cancel"),
                waButtonTextNormal = $waCalculatorButton.attr("data-button-text-normal");
            if ($target.find("#waCalculatorIFrame")
                .length > 0) $target.find("#waCalculatorIFrame")
                .remove(), $target.addClass("hide"), $waCalculatorButton.html(waButtonTextNormal);
            else {
                var article = shop.productDetailsPage.getCurrentVariantCode(),
                    channel = this.channel,
                    amount = parseInt($("#qty")
                        .val()) > 0 ? parseInt($("#qty")
                        .val()) : 1,
                    requestURLwQuery = this.calculatorURL + "?channel=" + channel + "&article=" + article + "&amount=" + amount,
                    $iframe = $('<iframe id="waCalculatorIFrame" src="' + requestURLwQuery + '"/>');
                shop.waConfigurator.lastVariantCode = article, $iframe.width("260px"), $iframe.height("400px"), $target.append($iframe), $target.removeClass("hide"), $waCalculatorButton.html(waButtonTextCancel)
            }
        },
        updateCalculator: function(state) {
            var article = shop.productDetailsPage.getCurrentVariantCode(),
                channel = this.channel,
                amount = parseInt($("#qty")
                    .val()) > 0 ? parseInt($("#qty")
                    .val()) : 1,
                requestURLwQuery = this.calculatorURL + "?channel=" + channel + "&article=" + article + "&amount=" + amount;
            (article !== shop.waConfigurator.lastVariantCode || state) && (shop.waConfigurator.lastVariantCode = article, $("#waCalculatorIFrame")
                .attr("src", requestURLwQuery))
        }
    };
    shop.add("waConfigurator", defaultWaConfigurator), window.waConfigurator = window.shop.waConfigurator, $(function() {
        var $waCalculator = $("#waCalculator"),
            $waCalculatorBox = $("#waCalculatorBox"),
            isWaAvailable = $waCalculatorBox.length > 0 || $waCalculator.length > 0,
            $waCalculatorOpen = $(".js-waCalculatorOpen");
        isWaAvailable && (shop.waConfigurator.isWaAvailable = isWaAvailable, $waCalculator.click(function(e) {
                e.preventDefault(), shop.waConfigurator.openCalculator($waCalculator.data("target"))
            })), (shop.waConfigurator.presetConfiguration || shop.url.parameters.openConfigurator) && shop.waConfigurator.openConfigurator({}), $waCalculatorOpen.data("force-open") && shop.waConfigurator.openCalculator($waCalculatorOpen), $("#qty")
            .on("change", function() {
                1 === $("#waCalculatorIFrame")
                    .length && shop.waConfigurator.updateCalculator("change")
            })
    })
}(jQuery),
function() {
    "use strict";
    $(function() {
        $("#watchlist .review-bar-rating")
            .makeStars()
    })
}(),
function() {
    "use strict";
    $(function() {
        var $reviewBarRatingService = $(".service-rating-component")
            .find(".js-review-bar-rating");
        $reviewBarRatingService.length > 0 && $reviewBarRatingService.makeStars()
    })
}();