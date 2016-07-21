$.smVersion = "0.5.8",
    +function(a) {
        "use strict";
        var b = {
            autoInit: !1,
            showPageLoadingIndicator: !0,
            router: !0,
            swipePanel: "left",
            swipePanelOnlyClose: !0,
            pushAnimationDuration: 400
        };
        a.smConfig = a.extend(b, a.config)
    }(Zepto),
    +function(a) {
        "use strict";
        a.compareVersion = function(a, b) {
            var c = a.split(".")
                , d = b.split(".");
            if (a === b)
                return 0;
            for (var e = 0; e < c.length; e++) {
                var f = parseInt(c[e]);
                if (!d[e])
                    return 1;
                var g = parseInt(d[e]);
                if (g > f)
                    return -1;
                if (f > g)
                    return 1
            }
            return -1
        }
            ,
            a.getCurrentPage = function() {
                return a(".page-current")[0] || a(".page")[0] || document.body
            }
    }(Zepto),
    function(a) {
        "use strict";
        ["width", "height"].forEach(function(b) {
            var c = b.replace(/./, function(a) {
                return a[0].toUpperCase()
            });
            a.fn["outer" + c] = function(a) {
                var c = this;
                if (c) {
                    var d = c[b]()
                        , e = {
                            width: ["left", "right"],
                            height: ["top", "bottom"]
                        };
                    return e[b].forEach(function(b) {
                        a && (d += parseInt(c.css("margin-" + b), 10))
                    }),
                        d
                }
                return null
            }
        }),
            a.support = function() {
                var a = {
                    touch: !!("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch)
                };
                return a
            }(),
            a.touchEvents = {
                start: a.support.touch ? "touchstart" : "mousedown",
                move: a.support.touch ? "touchmove" : "mousemove",
                end: a.support.touch ? "touchend" : "mouseup"
            },
            a.getTranslate = function(a, b) {
                var c, d, e, f;
                return "undefined" == typeof b && (b = "x"),
                    e = window.getComputedStyle(a, null ),
                    window.WebKitCSSMatrix ? f = new WebKitCSSMatrix("none" === e.webkitTransform ? "" : e.webkitTransform) : (f = e.MozTransform || e.OTransform || e.MsTransform || e.msTransform || e.transform || e.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"),
                        c = f.toString().split(",")),
                "x" === b && (d = window.WebKitCSSMatrix ? f.m41 : 16 === c.length ? parseFloat(c[12]) : parseFloat(c[4])),
                "y" === b && (d = window.WebKitCSSMatrix ? f.m42 : 16 === c.length ? parseFloat(c[13]) : parseFloat(c[5])),
                d || 0
            }
            ,
            a.requestAnimationFrame = function(a) {
                return window.requestAnimationFrame ? window.requestAnimationFrame(a) : window.webkitRequestAnimationFrame ? window.webkitRequestAnimationFrame(a) : window.mozRequestAnimationFrame ? window.mozRequestAnimationFrame(a) : window.setTimeout(a, 1e3 / 60)
            }
            ,
            a.cancelAnimationFrame = function(a) {
                return window.cancelAnimationFrame ? window.cancelAnimationFrame(a) : window.webkitCancelAnimationFrame ? window.webkitCancelAnimationFrame(a) : window.mozCancelAnimationFrame ? window.mozCancelAnimationFrame(a) : window.clearTimeout(a)
            }
            ,
            a.fn.transitionEnd = function(a) {
                function b(f) {
                    if (f.target === this)
                        for (a.call(this, f),
                                 c = 0; c < d.length; c++)
                            e.off(d[c], b)
                }
                var c, d = ["webkitTransitionEnd", "transitionend"], e = this;
                if (a)
                    for (c = 0; c < d.length; c++)
                        e.on(d[c], b);
                return this
            }
            ,
            a.fn.dataset = function() {
                var b = this[0];
                if (b) {
                    var c = {};
                    if (b.dataset)
                        for (var d in b.dataset)
                            c[d] = b.dataset[d];
                    else
                        for (var e = 0; e < b.attributes.length; e++) {
                            var f = b.attributes[e];
                            /^data-/.test(f.name) && (c[a.toCamelCase(f.name.split("data-")[1])] = f.value)
                        }
                    for (var g in c)
                        "false" === c[g] ? c[g] = !1 : "true" === c[g] ? c[g] = !0 : parseFloat(c[g]) === 1 * c[g] && (c[g] = 1 * c[g]);
                    return c
                }
            }
            ,
            a.fn.data = function(b, c) {
                if ("undefined" == typeof b)
                    return a(this).dataset();
                {
                    if ("undefined" != typeof c) {
                        for (var d = 0; d < this.length; d++) {
                            var e = this[d];
                            e.smElementDataStorage || (e.smElementDataStorage = {}),
                                e.smElementDataStorage[b] = c
                        }
                        return this
                    }
                    if (this[0] && this[0].getAttribute) {
                        var f = this[0].getAttribute("data-" + b);
                        return f ? f : this[0].smElementDataStorage && b in this[0].smElementDataStorage ? this[0].smElementDataStorage[b] : void 0
                    }
                }
            }
            ,
            a.fn.animationEnd = function(a) {
                function b(f) {
                    for (a(f),
                             c = 0; c < d.length; c++)
                        e.off(d[c], b)
                }
                var c, d = ["webkitAnimationEnd", "animationend"], e = this;
                if (a)
                    for (c = 0; c < d.length; c++)
                        e.on(d[c], b);
                return this
            }
            ,
            a.fn.transition = function(a) {
                "string" != typeof a && (a += "ms");
                for (var b = 0; b < this.length; b++) {
                    var c = this[b].style;
                    c.webkitTransitionDuration = c.MsTransitionDuration = c.msTransitionDuration = c.MozTransitionDuration = c.OTransitionDuration = c.transitionDuration = a
                }
                return this
            }
            ,
            a.fn.transform = function(a) {
                for (var b = 0; b < this.length; b++) {
                    var c = this[b].style;
                    c.webkitTransform = c.MsTransform = c.msTransform = c.MozTransform = c.OTransform = c.transform = a
                }
                return this
            }
            ,
            a.fn.prevAll = function(b) {
                var c = []
                    , d = this[0];
                if (!d)
                    return a([]);
                for (; d.previousElementSibling; ) {
                    var e = d.previousElementSibling;
                    b ? a(e).is(b) && c.push(e) : c.push(e),
                        d = e
                }
                return a(c)
            }
            ,
            a.fn.nextAll = function(b) {
                var c = []
                    , d = this[0];
                if (!d)
                    return a([]);
                for (; d.nextElementSibling; ) {
                    var e = d.nextElementSibling;
                    b ? a(e).is(b) && c.push(e) : c.push(e),
                        d = e
                }
                return a(c)
            }
            ,
            a.fn.show = function() {
                function a(a) {
                    var c, d;
                    return b[a] || (c = document.createElement(a),
                        document.body.appendChild(c),
                        d = getComputedStyle(c, "").getPropertyValue("display"),
                        c.parentNode.removeChild(c),
                    "none" === d && (d = "block"),
                        b[a] = d),
                        b[a]
                }
                var b = {};
                return this.each(function() {
                    "none" === this.style.display && (this.style.display = ""),
                    "none" === getComputedStyle(this, "").getPropertyValue("display"),
                        this.style.display = a(this.nodeName)
                })
            }
    }(Zepto),
    function(a) {
        "use strict";
        var b = {}
            , c = navigator.userAgent
            , d = c.match(/(Android);?[\s\/]+([\d.]+)?/)
            , e = c.match(/(iPad).*OS\s([\d_]+)/)
            , f = c.match(/(iPod)(.*OS\s([\d_]+))?/)
            , g = !e && c.match(/(iPhone\sOS)\s([\d_]+)/);
        if (b.ios = b.android = b.iphone = b.ipad = b.androidChrome = !1,
            d && (b.os = "android",
                b.osVersion = d[2],
                b.android = !0,
                b.androidChrome = c.toLowerCase().indexOf("chrome") >= 0),
            (e || g || f) && (b.os = "ios",
                b.ios = !0),
            g && !f && (b.osVersion = g[2].replace(/_/g, "."),
                b.iphone = !0),
            e && (b.osVersion = e[2].replace(/_/g, "."),
                b.ipad = !0),
            f && (b.osVersion = f[3] ? f[3].replace(/_/g, ".") : null ,
                b.iphone = !0),
            b.ios && b.osVersion && c.indexOf("Version/") >= 0 && "10" === b.osVersion.split(".")[0] && (b.osVersion = c.toLowerCase().split("version/")[1].split(" ")[0]),
                b.webView = (g || e || f) && c.match(/.*AppleWebKit(?!.*Safari)/i),
            b.os && "ios" === b.os) {
            var h = b.osVersion.split(".");
            b.minimalUi = !b.webView && (f || g) && (1 * h[0] === 7 ? 1 * h[1] >= 1 : 1 * h[0] > 7) && a('meta[name="viewport"]').length > 0 && a('meta[name="viewport"]').attr("content").indexOf("minimal-ui") >= 0
        }
        var i = a(window).width()
            , j = a(window).height();
        b.statusBar = !1,
            b.webView && i * j === screen.width * screen.height ? b.statusBar = !0 : b.statusBar = !1;
        var k = [];
        if (b.pixelRatio = window.devicePixelRatio || 1,
                k.push("pixel-ratio-" + Math.floor(b.pixelRatio)),
            b.pixelRatio >= 2 && k.push("retina"),
            b.os && (k.push(b.os, b.os + "-" + b.osVersion.split(".")[0], b.os + "-" + b.osVersion.replace(/\./g, "-")),
            "ios" === b.os))
            for (var l = parseInt(b.osVersion.split(".")[0], 10), m = l - 1; m >= 6; m--)
                k.push("ios-gt-" + m);
        b.statusBar ? k.push("with-statusbar-overlay") : a("html").removeClass("with-statusbar-overlay"),
        k.length > 0 && a("html").addClass(k.join(" ")),
            b.isWeixin = /MicroMessenger/i.test(c),
            a.device = b
    }(Zepto),
    function() {
        "use strict";
        function a(b, d) {
            function e(a, b) {
                return function() {
                    return a.apply(b, arguments)
                }
            }
            var f;
            if (d = d || {},
                    this.trackingClick = !1,
                    this.trackingClickStart = 0,
                    this.targetElement = null ,
                    this.touchStartX = 0,
                    this.touchStartY = 0,
                    this.lastTouchIdentifier = 0,
                    this.touchBoundary = d.touchBoundary || 10,
                    this.layer = b,
                    this.tapDelay = d.tapDelay || 200,
                    this.tapTimeout = d.tapTimeout || 700,
                    !a.notNeeded(b)) {
                for (var g = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], h = this, i = 0, j = g.length; j > i; i++)
                    h[g[i]] = e(h[g[i]], h);
                c && (b.addEventListener("mouseover", this.onMouse, !0),
                    b.addEventListener("mousedown", this.onMouse, !0),
                    b.addEventListener("mouseup", this.onMouse, !0)),
                    b.addEventListener("click", this.onClick, !0),
                    b.addEventListener("touchstart", this.onTouchStart, !1),
                    b.addEventListener("touchmove", this.onTouchMove, !1),
                    b.addEventListener("touchend", this.onTouchEnd, !1),
                    b.addEventListener("touchcancel", this.onTouchCancel, !1),
                Event.prototype.stopImmediatePropagation || (b.removeEventListener = function(a, c, d) {
                    var e = Node.prototype.removeEventListener;
                    "click" === a ? e.call(b, a, c.hijacked || c, d) : e.call(b, a, c, d)
                }
                    ,
                    b.addEventListener = function(a, c, d) {
                        var e = Node.prototype.addEventListener;
                        "click" === a ? e.call(b, a, c.hijacked || (c.hijacked = function(a) {
                            a.propagationStopped || c(a)
                        }
                        ), d) : e.call(b, a, c, d)
                    }
                ),
                "function" == typeof b.onclick && (f = b.onclick,
                    b.addEventListener("click", function(a) {
                        f(a)
                    }, !1),
                    b.onclick = null )
            }
        }
        var b = navigator.userAgent.indexOf("Windows Phone") >= 0
            , c = navigator.userAgent.indexOf("Android") > 0 && !b
            , d = /iP(ad|hone|od)/.test(navigator.userAgent) && !b
            , e = d && /OS 4_\d(_\d)?/.test(navigator.userAgent)
            , f = d && /OS [6-7]_\d/.test(navigator.userAgent)
            , g = navigator.userAgent.indexOf("BB10") > 0
            , h = !1;
        a.prototype.needsClick = function(a) {
            for (var b = a; b && "BODY" !== b.tagName.toUpperCase(); ) {
                if ("LABEL" === b.tagName.toUpperCase() && (h = !0,
                        /\bneedsclick\b/.test(b.className)))
                    return !0;
                b = b.parentNode
            }
            switch (a.nodeName.toLowerCase()) {
                case "button":
                case "select":
                case "textarea":
                    if (a.disabled)
                        return !0;
                    break;
                case "input":
                    if (d && "file" === a.type || a.disabled)
                        return !0;
                    break;
                case "label":
                case "iframe":
                case "video":
                    return !0
            }
            return /\bneedsclick\b/.test(a.className)
        }
            ,
            a.prototype.needsFocus = function(a) {
                switch (a.nodeName.toLowerCase()) {
                    case "textarea":
                        return !0;
                    case "select":
                        return !c;
                    case "input":
                        switch (a.type) {
                            case "button":
                            case "checkbox":
                            case "file":
                            case "image":
                            case "radio":
                            case "submit":
                                return !1
                        }
                        return !a.disabled && !a.readOnly;
                    default:
                        return /\bneedsfocus\b/.test(a.className)
                }
            }
            ,
            a.prototype.sendClick = function(a, b) {
                var c, d;
                document.activeElement && document.activeElement !== a && document.activeElement.blur(),
                    d = b.changedTouches[0],
                    c = document.createEvent("MouseEvents"),
                    c.initMouseEvent(this.determineEventType(a), !0, !0, window, 1, d.screenX, d.screenY, d.clientX, d.clientY, !1, !1, !1, !1, 0, null ),
                    c.forwardedTouchEvent = !0,
                    a.dispatchEvent(c)
            }
            ,
            a.prototype.determineEventType = function(a) {
                return c && "select" === a.tagName.toLowerCase() ? "mousedown" : "click"
            }
            ,
            a.prototype.focus = function(a) {
                var b, c = ["date", "time", "month", "number", "email"];
                d && a.setSelectionRange && -1 === c.indexOf(a.type) ? (b = a.value.length,
                    a.setSelectionRange(b, b)) : a.focus()
            }
            ,
            a.prototype.updateScrollParent = function(a) {
                var b, c;
                if (b = a.fastClickScrollParent,
                    !b || !b.contains(a)) {
                    c = a;
                    do {
                        if (c.scrollHeight > c.offsetHeight) {
                            b = c,
                                a.fastClickScrollParent = c;
                            break
                        }
                        c = c.parentElement
                    } while (c)
                }
                b && (b.fastClickLastScrollTop = b.scrollTop)
            }
            ,
            a.prototype.getTargetElementFromEventTarget = function(a) {
                return a.nodeType === Node.TEXT_NODE ? a.parentNode : a
            }
            ,
            a.prototype.onTouchStart = function(a) {
                var b, c, f;
                if (a.targetTouches.length > 1)
                    return !0;
                if (b = this.getTargetElementFromEventTarget(a.target),
                        c = a.targetTouches[0],
                        d) {
                    if (f = window.getSelection(),
                        f.rangeCount && !f.isCollapsed)
                        return !0;
                    if (!e) {
                        if (c.identifier && c.identifier === this.lastTouchIdentifier)
                            return a.preventDefault(),
                                !1;
                        this.lastTouchIdentifier = c.identifier,
                            this.updateScrollParent(b)
                    }
                }
                return this.trackingClick = !0,
                    this.trackingClickStart = a.timeStamp,
                    this.targetElement = b,
                    this.touchStartX = c.pageX,
                    this.touchStartY = c.pageY,
                a.timeStamp - this.lastClickTime < this.tapDelay && a.preventDefault(),
                    !0
            }
            ,
            a.prototype.touchHasMoved = function(a) {
                var b = a.changedTouches[0]
                    , c = this.touchBoundary;
                return Math.abs(b.pageX - this.touchStartX) > c || Math.abs(b.pageY - this.touchStartY) > c ? !0 : !1
            }
            ,
            a.prototype.onTouchMove = function(a) {
                return this.trackingClick ? ((this.targetElement !== this.getTargetElementFromEventTarget(a.target) || this.touchHasMoved(a)) && (this.trackingClick = !1,
                    this.targetElement = null ),
                    !0) : !0
            }
            ,
            a.prototype.findControl = function(a) {
                return void 0 !== a.control ? a.control : a.htmlFor ? document.getElementById(a.htmlFor) : a.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
            }
            ,
            a.prototype.onTouchEnd = function(a) {
                var b, g, h, i, j, k = this.targetElement;
                if (!this.trackingClick)
                    return !0;
                if (a.timeStamp - this.lastClickTime < this.tapDelay)
                    return this.cancelNextClick = !0,
                        !0;
                if (a.timeStamp - this.trackingClickStart > this.tapTimeout)
                    return !0;
                var l = ["date", "time", "month"];
                if (-1 !== l.indexOf(a.target.type))
                    return !1;
                if (this.cancelNextClick = !1,
                        this.lastClickTime = a.timeStamp,
                        g = this.trackingClickStart,
                        this.trackingClick = !1,
                        this.trackingClickStart = 0,
                    f && (j = a.changedTouches[0],
                        k = document.elementFromPoint(j.pageX - window.pageXOffset, j.pageY - window.pageYOffset) || k,
                        k.fastClickScrollParent = this.targetElement.fastClickScrollParent),
                        h = k.tagName.toLowerCase(),
                    "label" === h) {
                    if (b = this.findControl(k)) {
                        if (this.focus(k),
                                c)
                            return !1;
                        k = b
                    }
                } else if (this.needsFocus(k))
                    return a.timeStamp - g > 100 || d && window.top !== window && "input" === h ? (this.targetElement = null ,
                        !1) : (this.focus(k),
                        this.sendClick(k, a),
                    d && "select" === h || (this.targetElement = null ,
                        a.preventDefault()),
                        !1);
                return d && !e && (i = k.fastClickScrollParent,
                i && i.fastClickLastScrollTop !== i.scrollTop) ? !0 : (this.needsClick(k) || (a.preventDefault(),
                    this.sendClick(k, a)),
                    !1)
            }
            ,
            a.prototype.onTouchCancel = function() {
                this.trackingClick = !1,
                    this.targetElement = null
            }
            ,
            a.prototype.onMouse = function(a) {
                return this.targetElement ? a.forwardedTouchEvent ? !0 : a.cancelable && (!this.needsClick(this.targetElement) || this.cancelNextClick) ? (a.stopImmediatePropagation ? a.stopImmediatePropagation() : a.propagationStopped = !0,
                    a.stopPropagation(),
                h || a.preventDefault(),
                    !1) : !0 : !0
            }
            ,
            a.prototype.onClick = function(a) {
                var b;
                return this.trackingClick ? (this.targetElement = null ,
                    this.trackingClick = !1,
                    !0) : "submit" === a.target.type && 0 === a.detail ? !0 : (b = this.onMouse(a),
                b || (this.targetElement = null ),
                    b)
            }
            ,
            a.prototype.destroy = function() {
                var a = this.layer;
                c && (a.removeEventListener("mouseover", this.onMouse, !0),
                    a.removeEventListener("mousedown", this.onMouse, !0),
                    a.removeEventListener("mouseup", this.onMouse, !0)),
                    a.removeEventListener("click", this.onClick, !0),
                    a.removeEventListener("touchstart", this.onTouchStart, !1),
                    a.removeEventListener("touchmove", this.onTouchMove, !1),
                    a.removeEventListener("touchend", this.onTouchEnd, !1),
                    a.removeEventListener("touchcancel", this.onTouchCancel, !1)
            }
            ,
            a.notNeeded = function(a) {
                var b, d, e, f;
                if ("undefined" == typeof window.ontouchstart)
                    return !0;
                if (d = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
                    if (!c)
                        return !0;
                    if (b = document.querySelector("meta[name=viewport]")) {
                        if (-1 !== b.content.indexOf("user-scalable=no"))
                            return !0;
                        if (d > 31 && document.documentElement.scrollWidth <= window.outerWidth)
                            return !0
                    }
                }
                if (g && (e = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/),
                    e[1] >= 10 && e[2] >= 3 && (b = document.querySelector("meta[name=viewport]")))) {
                    if (-1 !== b.content.indexOf("user-scalable=no"))
                        return !0;
                    if (document.documentElement.scrollWidth <= window.outerWidth)
                        return !0
                }
                return "none" === a.style.msTouchAction || "manipulation" === a.style.touchAction ? !0 : (f = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1],
                    f >= 27 && (b = document.querySelector("meta[name=viewport]"),
                    b && (-1 !== b.content.indexOf("user-scalable=no") || document.documentElement.scrollWidth <= window.outerWidth)) ? !0 : "none" === a.style.touchAction || "manipulation" === a.style.touchAction ? !0 : !1)
            }
            ,
            a.attach = function(b, c) {
                return new a(b,c)
            }
            ,
            a.attach(document.body)
    }(),
    +function(a) {
        "use strict";
        var b = function(b, c, d) {
                var e = a(b);
                if (2 === arguments.length && "boolean" == typeof c && (d = c),
                    0 === e.length)
                    return !1;
                if (e.hasClass("active"))
                    return d && e.trigger("show"),
                        !1;
                var f = e.parent(".tabs");
                if (0 === f.length)
                    return !1;
                var g = f.children(".tab.active").removeClass("active");
                if (e.addClass("active"),
                        e.trigger("show"),
                        c ? c = a(c) : (c = a("string" == typeof b ? '.tab-link[href="' + b + '"]' : '.tab-link[href="#' + e.attr("id") + '"]'),
                        (!c || c && 0 === c.length) && a("[data-tab]").each(function() {
                            e.is(a(this).attr("data-tab")) && (c = a(this))
                        })),
                    0 !== c.length) {
                    var h;
                    if (g && g.length > 0) {
                        var i = g.attr("id");
                        i && (h = a('.tab-link[href="#' + i + '"]')),
                        (!h || h && 0 === h.length) && a("[data-tab]").each(function() {
                            g.is(a(this).attr("data-tab")) && (h = a(this))
                        })
                    }
                    return c && c.length > 0 && c.addClass("active"),
                    h && h.length > 0 && h.removeClass("active"),
                        !0
                }
            }
            , c = a.showTab;
        a.showTab = b,
            a.showTab.noConflict = function() {
                return a.showTab = c,
                    this
            }
            ,
            a(document).on("click", ".tab-link", function(c) {
                c.preventDefault();
                var d = a(this);
                b(d.data("tab") || d.attr("href"), d)
            })
    }(Zepto),
    +function(a) {
        "use strict";
        function b(b) {
            var c, e = a(this), f = (e.attr("href"),
                e.dataset());
            e.hasClass("open-popup") && (c = f.popup ? f.popup : ".popup",
                a.popup(c)),
            e.hasClass("close-popup") && (c = f.popup ? f.popup : ".popup.modal-in",
                a.closeModal(c)),
            e.hasClass("modal-overlay") && (a(".modal.modal-in").length > 0 && d.modalCloseByOutside && a.closeModal(".modal.modal-in"),
            a(".actions-modal.modal-in").length > 0 && d.actionsCloseByOutside && a.closeModal(".actions-modal.modal-in")),
            e.hasClass("popup-overlay") && a(".popup.modal-in").length > 0 && d.popupCloseByOutside && a.closeModal(".popup.modal-in")
        }
        var c = document.createElement("div");
        a.modalStack = [],
            a.modalStackClearQueue = function() {
                a.modalStack.length && a.modalStack.shift()()
            }
            ,
            a.modal = function(b) {
                b = b || {};
                var e = ""
                    , f = "";
                if (b.buttons && b.buttons.length > 0)
                    for (var g = 0; g < b.buttons.length; g++)
                        f += '<span class="modal-button' + (b.buttons[g].bold ? " modal-button-bold" : "") + '">' + b.buttons[g].text + "</span>";
                var h = b.extraClass || ""
                    , i = b.title ? '<div class="modal-title">' + b.title + "</div>" : ""
                    , j = b.text ? '<div class="modal-text">' + b.text + "</div>" : ""
                    , k = b.afterText ? b.afterText : ""
                    , l = b.buttons && 0 !== b.buttons.length ? "" : "modal-no-buttons"
                    , m = b.verticalButtons ? "modal-buttons-vertical" : "";
                e = '<div class="modal ' + h + " " + l + '"><div class="modal-inner">' + (i + j + k) + '</div><div class="modal-buttons ' + m + '">' + f + "</div></div>",
                    c.innerHTML = e;
                var n = a(c).children();
                return a(d.modalContainer).append(n[0]),
                    n.find(".modal-button").each(function(c, d) {
                        a(d).on("click", function(d) {
                            b.buttons[c].close !== !1 && a.closeModal(n),
                            b.buttons[c].onClick && b.buttons[c].onClick(n, d),
                            b.onClick && b.onClick(n, c)
                        })
                    }),
                    a.openModal(n),
                    n[0]
            }
            ,
            a.alert = function(b, c, e) {
                return "function" == typeof c && (e = arguments[1],
                    c = void 0),
                    a.modal({
                        text: b || "",
                        title: "undefined" == typeof c ? d.modalTitle : c,
                        buttons: [{
                            text: d.modalButtonOk,
                            bold: !0,
                            onClick: e
                        }]
                    })
            }
            ,
            a.confirm = function(b, c, e, f) {
                return "function" == typeof c && (f = arguments[2],
                    e = arguments[1],
                    c = void 0),
                    a.modal({
                        text: b || "",
                        title: "undefined" == typeof c ? d.modalTitle : c,
                        buttons: [{
                            text: d.modalButtonCancel,
                            onClick: f
                        }, {
                            text: d.modalButtonOk,
                            bold: !0,
                            onClick: e
                        }]
                    })
            }
            ,
            a.prompt = function(b, c, e, f) {
                return "function" == typeof c && (f = arguments[2],
                    e = arguments[1],
                    c = void 0),
                    a.modal({
                        text: b || "",
                        title: "undefined" == typeof c ? d.modalTitle : c,
                        afterText: '<input type="text" class="modal-text-input">',
                        buttons: [{
                            text: d.modalButtonCancel
                        }, {
                            text: d.modalButtonOk,
                            bold: !0
                        }],
                        onClick: function(b, c) {
                            0 === c && f && f(a(b).find(".modal-text-input").val()),
                            1 === c && e && e(a(b).find(".modal-text-input").val())
                        }
                    })
            }
            ,
            a.modalLogin = function(b, c, e, f) {
                return "function" == typeof c && (f = arguments[2],
                    e = arguments[1],
                    c = void 0),
                    a.modal({
                        text: b || "",
                        title: "undefined" == typeof c ? d.modalTitle : c,
                        afterText: '<input type="text" name="modal-username" placeholder="' + d.modalUsernamePlaceholder + '" class="modal-text-input modal-text-input-double"><input type="password" name="modal-password" placeholder="' + d.modalPasswordPlaceholder + '" class="modal-text-input modal-text-input-double">',
                        buttons: [{
                            text: d.modalButtonCancel
                        }, {
                            text: d.modalButtonOk,
                            bold: !0
                        }],
                        onClick: function(b, c) {
                            var d = a(b).find('.modal-text-input[name="modal-username"]').val()
                                , g = a(b).find('.modal-text-input[name="modal-password"]').val();
                            0 === c && f && f(d, g),
                            1 === c && e && e(d, g)
                        }
                    })
            }
            ,
            a.modalPassword = function(b, c, e, f) {
                return "function" == typeof c && (f = arguments[2],
                    e = arguments[1],
                    c = void 0),
                    a.modal({
                        text: b || "",
                        title: "undefined" == typeof c ? d.modalTitle : c,
                        afterText: '<input type="password" name="modal-password" placeholder="' + d.modalPasswordPlaceholder + '" class="modal-text-input">',
                        buttons: [{
                            text: d.modalButtonCancel
                        }, {
                            text: d.modalButtonOk,
                            bold: !0
                        }],
                        onClick: function(b, c) {
                            var d = a(b).find('.modal-text-input[name="modal-password"]').val();
                            0 === c && f && f(d),
                            1 === c && e && e(d)
                        }
                    })
            }
            ,
            a.showPreloader = function(b) {
                return a.hidePreloader(),
                    a.showPreloader.preloaderModal = a.modal({
                        title: b || d.modalPreloaderTitle,
                        text: '<div class="preloader"></div>'
                    }),
                    a.showPreloader.preloaderModal
            }
            ,
            a.hidePreloader = function() {
                a.closeModal(a.showPreloader.preloaderModal)
            }
            ,
            a.showIndicator = function() {
                a(".preloader-indicator-modal")[0] || a(d.modalContainer).append('<div class="preloader-indicator-overlay"></div><div class="preloader-indicator-modal"><span class="preloader preloader-white"></span></div>')
            }
            ,
            a.hideIndicator = function() {
                a(".preloader-indicator-overlay, .preloader-indicator-modal").remove()
            }
            ,
            a.actions = function(b) {
                var e, f, g;
                b = b || [],
                b.length > 0 && !a.isArray(b[0]) && (b = [b]);
                for (var h, i = "", j = 0; j < b.length; j++)
                    for (var k = 0; k < b[j].length; k++) {
                        0 === k && (i += '<div class="actions-modal-group">');
                        var l = b[j][k]
                            , m = l.label ? "actions-modal-label" : "actions-modal-button";
                        l.bold && (m += " actions-modal-button-bold"),
                        l.color && (m += " color-" + l.color),
                        l.bg && (m += " bg-" + l.bg),
                        l.disabled && (m += " disabled"),
                            i += '<span class="' + m + '">' + l.text + "</span>",
                        k === b[j].length - 1 && (i += "</div>")
                    }
                h = '<div class="actions-modal">' + i + "</div>",
                    c.innerHTML = h,
                    e = a(c).children(),
                    a(d.modalContainer).append(e[0]),
                    f = ".actions-modal-group",
                    g = ".actions-modal-button";
                var n = e.find(f);
                return n.each(function(c, d) {
                    var f = c;
                    a(d).children().each(function(c, d) {
                        var h, i = c, j = b[f][i];
                        a(d).is(g) && (h = a(d)),
                        h && h.on("click", function(b) {
                            j.close !== !1 && a.closeModal(e),
                            j.onClick && j.onClick(e, b)
                        })
                    })
                }),
                    a.openModal(e),
                    e[0]
            }
            ,
            a.popup = function(b, c) {
                if ("undefined" == typeof c && (c = !0),
                    "string" == typeof b && b.indexOf("<") >= 0) {
                    var e = document.createElement("div");
                    if (e.innerHTML = b.trim(),
                            !(e.childNodes.length > 0))
                        return !1;
                    b = e.childNodes[0],
                    c && b.classList.add("remove-on-close"),
                        a(d.modalContainer).append(b)
                }
                return b = a(b),
                    0 === b.length ? !1 : (b.show(),
                        b.find(".content").scroller("refresh"),
                    b.find("." + d.viewClass).length > 0 && a.sizeNavbars(b.find("." + d.viewClass)[0]),
                        a.openModal(b),
                        b[0])
            }
            ,
            a.pickerModal = function(b, c) {
                if ("undefined" == typeof c && (c = !0),
                    "string" == typeof b && b.indexOf("<") >= 0) {
                    if (b = a(b),
                            !(b.length > 0))
                        return !1;
                    c && b.addClass("remove-on-close"),
                        a(d.modalContainer).append(b[0])
                }
                return b = a(b),
                    0 === b.length ? !1 : (b.show(),
                        a.openModal(b),
                        b[0])
            }
            ,
            a.loginScreen = function(b) {
                return b || (b = ".login-screen"),
                    b = a(b),
                    0 === b.length ? !1 : (b.show(),
                    b.find("." + d.viewClass).length > 0 && a.sizeNavbars(b.find("." + d.viewClass)[0]),
                        a.openModal(b),
                        b[0])
            }
            ,
            a.toast = function(b, c, d) {
                var e = a('<div class="modal toast ' + (d || "") + '">' + b + "</div>").appendTo(document.body);
                a.openModal(e, function() {
                    setTimeout(function() {
                        a.closeModal(e)
                    }, c || 2e3)
                })
            }
            ,
            a.openModal = function(b, c) {
                b = a(b);
                var e = b.hasClass("modal")
                    , f = !b.hasClass("toast");
                if (a(".modal.modal-in:not(.modal-out)").length && d.modalStack && e && f)
                    return void a.modalStack.push(function() {
                        a.openModal(b, c)
                    });
                var g = b.hasClass("popup")
                    , h = b.hasClass("login-screen")
                    , i = b.hasClass("picker-modal")
                    , j = b.hasClass("toast");
                e && (b.show(),
                    b.css({
                        marginTop: -Math.round(b.outerHeight() / 2) + "px"
                    })),
                j && b.css({
                    marginLeft: -Math.round(b.outerWidth() / 2 / 1.185) + "px"
                });
                var k;
                h || i || j || (0 !== a(".modal-overlay").length || g || a(d.modalContainer).append('<div class="modal-overlay"></div>'),
                0 === a(".popup-overlay").length && g && a(d.modalContainer).append('<div class="popup-overlay"></div>'),
                    k = a(g ? ".popup-overlay" : ".modal-overlay"));
                b[0].clientLeft;
                return b.trigger("open"),
                i && a(d.modalContainer).addClass("with-picker-modal"),
                h || i || j || k.addClass("modal-overlay-visible"),
                    b.removeClass("modal-out").addClass("modal-in").transitionEnd(function(a) {
                        b.hasClass("modal-out") ? b.trigger("closed") : b.trigger("opened")
                    }),
                "function" == typeof c && c.call(this),
                    !0
            }
            ,
            a.closeModal = function(b) {
                if (b = a(b || ".modal-in"),
                    "undefined" == typeof b || 0 !== b.length) {
                    var c = b.hasClass("modal")
                        , e = b.hasClass("popup")
                        , f = b.hasClass("toast")
                        , g = b.hasClass("login-screen")
                        , h = b.hasClass("picker-modal")
                        , i = b.hasClass("remove-on-close")
                        , j = a(e ? ".popup-overlay" : ".modal-overlay");
                    return e ? b.length === a(".popup.modal-in").length && j.removeClass("modal-overlay-visible") : h || f || j.removeClass("modal-overlay-visible"),
                        b.trigger("close"),
                    h && (a(d.modalContainer).removeClass("with-picker-modal"),
                        a(d.modalContainer).addClass("picker-modal-closing")),
                        b.removeClass("modal-in").addClass("modal-out").transitionEnd(function(c) {
                            b.hasClass("modal-out") ? b.trigger("closed") : b.trigger("opened"),
                            h && a(d.modalContainer).removeClass("picker-modal-closing"),
                                e || g || h ? (b.removeClass("modal-out").hide(),
                                i && b.length > 0 && b.remove()) : b.remove()
                        }),
                    c && d.modalStack && a.modalStackClearQueue(),
                        !0
                }
            }
            ,
            a(document).on("click", " .modal-overlay, .popup-overlay, .close-popup, .open-popup, .close-picker", b);
        var d = a.modal.prototype.defaults = {
            modalStack: !0,
            modalButtonOk: "确定",
            modalButtonCancel: "取消",
            modalPreloaderTitle: "加载中",
            modalContainer: document.body
        }
    }(Zepto),
    +function(a) {
        "use strict";
        var b = !1
            , c = function(c) {
                function d(a) {
                    a = new Date(a);
                    var b = a.getFullYear()
                        , c = a.getMonth()
                        , d = c + 1
                        , e = a.getDate()
                        , f = a.getDay();
                    return h.params.dateFormat.replace(/yyyy/g, b).replace(/yy/g, (b + "").substring(2)).replace(/mm/g, 10 > d ? "0" + d : d).replace(/m/g, d).replace(/MM/g, h.params.monthNames[c]).replace(/M/g, h.params.monthNamesShort[c]).replace(/dd/g, 10 > e ? "0" + e : e).replace(/d/g, e).replace(/DD/g, h.params.dayNames[f]).replace(/D/g, h.params.dayNamesShort[f])
                }
                function e(b) {
                    if (b.preventDefault(),
                        a.device.isWeixin && a.device.android && h.params.inputReadOnly && (this.focus(),
                            this.blur()),
                        !h.opened && (h.open(),
                            h.params.scrollToInput)) {
                        var c = h.input.parents(".content");
                        if (0 === c.length)
                            return;
                        var d, e = parseInt(c.css("padding-top"), 10), f = parseInt(c.css("padding-bottom"), 10), g = c[0].offsetHeight - e - h.container.height(), i = c[0].scrollHeight - e - h.container.height(), j = h.input.offset().top - e + h.input[0].offsetHeight;
                        if (j > g) {
                            var k = c.scrollTop() + j - g;
                            k + g > i && (d = k + g - i + f,
                            g === i && (d = h.container.height()),
                                c.css({
                                    "padding-bottom": d + "px"
                                })),
                                c.scrollTop(k, 300)
                        }
                    }
                }
                function f(b) {
                    h.input && h.input.length > 0 ? b.target !== h.input[0] && 0 === a(b.target).parents(".picker-modal").length && h.close() : 0 === a(b.target).parents(".picker-modal").length && h.close()
                }
                function g() {
                    h.opened = !1,
                    h.input && h.input.length > 0 && h.input.parents(".content").css({
                        "padding-bottom": ""
                    }),
                    h.params.onClose && h.params.onClose(h),
                        h.destroyCalendarEvents()
                }
                var h = this
                    , i = {
                        monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                        monthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                        dayNames: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
                        dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
                        firstDay: 1,
                        weekendDays: [0, 6],
                        multiple: !1,
                        dateFormat: "yyyy-mm-dd",
                        direction: "horizontal",
                        minDate: null ,
                        maxDate: null ,
                        touchMove: !0,
                        animate: !0,
                        closeOnSelect: !0,
                        monthPicker: !0,
                        monthPickerTemplate: '<div class="picker-calendar-month-picker"><a href="#" class="link icon-only picker-calendar-prev-month"><i class="icon icon-prev"></i></a><div class="current-month-value"></div><a href="#" class="link icon-only picker-calendar-next-month"><i class="icon icon-next"></i></a></div>',
                        yearPicker: !0,
                        yearPickerTemplate: '<div class="picker-calendar-year-picker"><a href="#" class="link icon-only picker-calendar-prev-year"><i class="icon icon-prev"></i></a><span class="current-year-value"></span><a href="#" class="link icon-only picker-calendar-next-year"><i class="icon icon-next"></i></a></div>',
                        weekHeader: !0,
                        scrollToInput: !0,
                        inputReadOnly: !0,
                        toolbar: !0,
                        toolbarCloseText: "Done",
                        toolbarTemplate: '<div class="toolbar"><div class="toolbar-inner">{{monthPicker}}{{yearPicker}}</div></div>'
                    };
                c = c || {};
                for (var j in i)
                    "undefined" == typeof c[j] && (c[j] = i[j]);
                h.params = c,
                    h.initialized = !1,
                    h.inline = h.params.container ? !0 : !1,
                    h.isH = "horizontal" === h.params.direction;
                var k = h.isH && b ? -1 : 1;
                return h.animating = !1,
                    h.addValue = function(a) {
                        if (h.params.multiple) {
                            h.value || (h.value = []);
                            for (var b, c = 0; c < h.value.length; c++)
                                new Date(a).getTime() === new Date(h.value[c]).getTime() && (b = c);
                            "undefined" == typeof b ? h.value.push(a) : h.value.splice(b, 1),
                                h.updateValue()
                        } else
                            h.value = [a],
                                h.updateValue()
                    }
                    ,
                    h.setValue = function(a) {
                        h.value = a,
                            h.updateValue()
                    }
                    ,
                    h.updateValue = function() {
                        h.wrapper.find(".picker-calendar-day-selected").removeClass("picker-calendar-day-selected");
                        var b, c;
                        for (b = 0; b < h.value.length; b++) {
                            var e = new Date(h.value[b]);
                            h.wrapper.find('.picker-calendar-day[data-date="' + e.getFullYear() + "-" + e.getMonth() + "-" + e.getDate() + '"]').addClass("picker-calendar-day-selected")
                        }
                        if (h.params.onChange && h.params.onChange(h, h.value, h.value.map(d)),
                            h.input && h.input.length > 0) {
                            if (h.params.formatValue)
                                c = h.params.formatValue(h, h.value);
                            else {
                                for (c = [],
                                         b = 0; b < h.value.length; b++)
                                    c.push(d(h.value[b]));
                                c = c.join(", ")
                            }
                            a(h.input).val(c),
                                a(h.input).trigger("change")
                        }
                    }
                    ,
                    h.initCalendarEvents = function() {
                        function c(a) {
                            i || g || (g = !0,
                                j = n = "touchstart" === a.type ? a.targetTouches[0].pageX : a.pageX,
                                l = n = "touchstart" === a.type ? a.targetTouches[0].pageY : a.pageY,
                                o = (new Date).getTime(),
                                u = 0,
                                x = !0,
                                w = void 0,
                                q = r = h.monthsTranslate)
                        }
                        function d(a) {
                            if (g) {
                                if (m = "touchmove" === a.type ? a.targetTouches[0].pageX : a.pageX,
                                        n = "touchmove" === a.type ? a.targetTouches[0].pageY : a.pageY,
                                    "undefined" == typeof w && (w = !!(w || Math.abs(n - l) > Math.abs(m - j))),
                                    h.isH && w)
                                    return void (g = !1);
                                if (a.preventDefault(),
                                        h.animating)
                                    return void (g = !1);
                                x = !1,
                                i || (i = !0,
                                    s = h.wrapper[0].offsetWidth,
                                    t = h.wrapper[0].offsetHeight,
                                    h.wrapper.transition(0)),
                                    a.preventDefault(),
                                    v = h.isH ? m - j : n - l,
                                    u = v / (h.isH ? s : t),
                                    r = 100 * (h.monthsTranslate * k + u),
                                    h.wrapper.transform("translate3d(" + (h.isH ? r : 0) + "%, " + (h.isH ? 0 : r) + "%, 0)")
                            }
                        }
                        function e(a) {
                            return g && i ? (g = i = !1,
                                p = (new Date).getTime(),
                                300 > p - o ? Math.abs(v) < 10 ? h.resetMonth() : v >= 10 ? b ? h.nextMonth() : h.prevMonth() : b ? h.prevMonth() : h.nextMonth() : -.5 >= u ? b ? h.prevMonth() : h.nextMonth() : u >= .5 ? b ? h.nextMonth() : h.prevMonth() : h.resetMonth(),
                                void setTimeout(function() {
                                    x = !0
                                }, 100)) : void (g = i = !1)
                        }
                        function f(b) {
                            if (x) {
                                var c = a(b.target).parents(".picker-calendar-day");
                                if (0 === c.length && a(b.target).hasClass("picker-calendar-day") && (c = a(b.target)),
                                    0 !== c.length && (!c.hasClass("picker-calendar-day-selected") || h.params.multiple) && !c.hasClass("picker-calendar-day-disabled")) {
                                    c.hasClass("picker-calendar-day-next") && h.nextMonth(),
                                    c.hasClass("picker-calendar-day-prev") && h.prevMonth();
                                    var d = c.attr("data-year")
                                        , e = c.attr("data-month")
                                        , f = c.attr("data-day");
                                    h.params.onDayClick && h.params.onDayClick(h, c[0], d, e, f),
                                        h.addValue(new Date(d,e,f).getTime()),
                                    h.params.closeOnSelect && h.close()
                                }
                            }
                        }
                        var g, i, j, l, m, n, o, p, q, r, s, t, u, v, w, x = !0;
                        h.container.find(".picker-calendar-prev-month").on("click", h.prevMonth),
                            h.container.find(".picker-calendar-next-month").on("click", h.nextMonth),
                            h.container.find(".picker-calendar-prev-year").on("click", h.prevYear),
                            h.container.find(".picker-calendar-next-year").on("click", h.nextYear),
                            h.wrapper.on("click", f),
                        h.params.touchMove && (h.wrapper.on(a.touchEvents.start, c),
                            h.wrapper.on(a.touchEvents.move, d),
                            h.wrapper.on(a.touchEvents.end, e)),
                            h.container[0].f7DestroyCalendarEvents = function() {
                                h.container.find(".picker-calendar-prev-month").off("click", h.prevMonth),
                                    h.container.find(".picker-calendar-next-month").off("click", h.nextMonth),
                                    h.container.find(".picker-calendar-prev-year").off("click", h.prevYear),
                                    h.container.find(".picker-calendar-next-year").off("click", h.nextYear),
                                    h.wrapper.off("click", f),
                                h.params.touchMove && (h.wrapper.off(a.touchEvents.start, c),
                                    h.wrapper.off(a.touchEvents.move, d),
                                    h.wrapper.off(a.touchEvents.end, e))
                            }
                    }
                    ,
                    h.destroyCalendarEvents = function(a) {
                        "f7DestroyCalendarEvents" in h.container[0] && h.container[0].f7DestroyCalendarEvents()
                    }
                    ,
                    h.daysInMonth = function(a) {
                        var b = new Date(a);
                        return new Date(b.getFullYear(),b.getMonth() + 1,0).getDate()
                    }
                    ,
                    h.monthHTML = function(a, b) {
                        a = new Date(a);
                        var c = a.getFullYear()
                            , d = a.getMonth();
                        a.getDate();
                        "next" === b && (a = 11 === d ? new Date(c + 1,0) : new Date(c,d + 1,1)),
                        "prev" === b && (a = 0 === d ? new Date(c - 1,11) : new Date(c,d - 1,1)),
                        ("next" === b || "prev" === b) && (d = a.getMonth(),
                            c = a.getFullYear());
                        var e = h.daysInMonth(new Date(a.getFullYear(),a.getMonth()).getTime() - 864e6)
                            , f = h.daysInMonth(a)
                            , g = new Date(a.getFullYear(),a.getMonth()).getDay();
                        0 === g && (g = 7);
                        var i, j, k, l = [], m = 6, n = 7, o = "", p = 0 + (h.params.firstDay - 1), q = (new Date).setHours(0, 0, 0, 0), r = h.params.minDate ? new Date(h.params.minDate).getTime() : null , s = h.params.maxDate ? new Date(h.params.maxDate).getTime() : null ;
                        if (h.value && h.value.length)
                            for (j = 0; j < h.value.length; j++)
                                l.push(new Date(h.value[j]).setHours(0, 0, 0, 0));
                        for (j = 1; m >= j; j++) {
                            var t = "";
                            for (k = 1; n >= k; k++) {
                                var u = k;
                                p++;
                                var v = p - g
                                    , w = "";
                                0 > v ? (v = e + v + 1,
                                    w += " picker-calendar-day-prev",
                                    i = new Date(0 > d - 1 ? c - 1 : c,0 > d - 1 ? 11 : d - 1,v).getTime()) : (v += 1,
                                    v > f ? (v -= f,
                                        w += " picker-calendar-day-next",
                                        i = new Date(d + 1 > 11 ? c + 1 : c,d + 1 > 11 ? 0 : d + 1,v).getTime()) : i = new Date(c,d,v).getTime()),
                                i === q && (w += " picker-calendar-day-today"),
                                l.indexOf(i) >= 0 && (w += " picker-calendar-day-selected"),
                                h.params.weekendDays.indexOf(u - 1) >= 0 && (w += " picker-calendar-day-weekend"),
                                (r && r > i || s && i > s) && (w += " picker-calendar-day-disabled"),
                                    i = new Date(i);
                                var x = i.getFullYear()
                                    , y = i.getMonth();
                                t += '<div data-year="' + x + '" data-month="' + y + '" data-day="' + v + '" class="picker-calendar-day' + w + '" data-date="' + (x + "-" + y + "-" + v) + '"><span>' + v + "</span></div>"
                            }
                            o += '<div class="picker-calendar-row">' + t + "</div>"
                        }
                        return o = '<div class="picker-calendar-month" data-year="' + c + '" data-month="' + d + '">' + o + "</div>"
                    }
                    ,
                    h.animating = !1,
                    h.updateCurrentMonthYear = function(a) {
                        "undefined" == typeof a ? (h.currentMonth = parseInt(h.months.eq(1).attr("data-month"), 10),
                            h.currentYear = parseInt(h.months.eq(1).attr("data-year"), 10)) : (h.currentMonth = parseInt(h.months.eq("next" === a ? h.months.length - 1 : 0).attr("data-month"), 10),
                            h.currentYear = parseInt(h.months.eq("next" === a ? h.months.length - 1 : 0).attr("data-year"), 10)),
                            h.container.find(".current-month-value").text(h.params.monthNames[h.currentMonth]),
                            h.container.find(".current-year-value").text(h.currentYear)
                    }
                    ,
                    h.onMonthChangeStart = function(a) {
                        h.updateCurrentMonthYear(a),
                            h.months.removeClass("picker-calendar-month-current picker-calendar-month-prev picker-calendar-month-next");
                        var b = "next" === a ? h.months.length - 1 : 0;
                        h.months.eq(b).addClass("picker-calendar-month-current"),
                            h.months.eq("next" === a ? b - 1 : b + 1).addClass("next" === a ? "picker-calendar-month-prev" : "picker-calendar-month-next"),
                        h.params.onMonthYearChangeStart && h.params.onMonthYearChangeStart(h, h.currentYear, h.currentMonth)
                    }
                    ,
                    h.onMonthChangeEnd = function(a, b) {
                        h.animating = !1;
                        var c, d, e;
                        h.wrapper.find(".picker-calendar-month:not(.picker-calendar-month-prev):not(.picker-calendar-month-current):not(.picker-calendar-month-next)").remove(),
                        "undefined" == typeof a && (a = "next",
                            b = !0),
                            b ? (h.wrapper.find(".picker-calendar-month-next, .picker-calendar-month-prev").remove(),
                                d = h.monthHTML(new Date(h.currentYear,h.currentMonth), "prev"),
                                c = h.monthHTML(new Date(h.currentYear,h.currentMonth), "next")) : e = h.monthHTML(new Date(h.currentYear,h.currentMonth), a),
                        ("next" === a || b) && h.wrapper.append(e || c),
                        ("prev" === a || b) && h.wrapper.prepend(e || d),
                            h.months = h.wrapper.find(".picker-calendar-month"),
                            h.setMonthsTranslate(h.monthsTranslate),
                        h.params.onMonthAdd && h.params.onMonthAdd(h, "next" === a ? h.months.eq(h.months.length - 1)[0] : h.months.eq(0)[0]),
                        h.params.onMonthYearChangeEnd && h.params.onMonthYearChangeEnd(h, h.currentYear, h.currentMonth)
                    }
                    ,
                    h.setMonthsTranslate = function(a) {
                        a = a || h.monthsTranslate || 0,
                        "undefined" == typeof h.monthsTranslate && (h.monthsTranslate = a),
                            h.months.removeClass("picker-calendar-month-current picker-calendar-month-prev picker-calendar-month-next");
                        var b = 100 * -(a + 1) * k
                            , c = 100 * -a * k
                            , d = 100 * -(a - 1) * k;
                        h.months.eq(0).transform("translate3d(" + (h.isH ? b : 0) + "%, " + (h.isH ? 0 : b) + "%, 0)").addClass("picker-calendar-month-prev"),
                            h.months.eq(1).transform("translate3d(" + (h.isH ? c : 0) + "%, " + (h.isH ? 0 : c) + "%, 0)").addClass("picker-calendar-month-current"),
                            h.months.eq(2).transform("translate3d(" + (h.isH ? d : 0) + "%, " + (h.isH ? 0 : d) + "%, 0)").addClass("picker-calendar-month-next")
                    }
                    ,
                    h.nextMonth = function(b) {
                        ("undefined" == typeof b || "object" == typeof b) && (b = "",
                        h.params.animate || (b = 0));
                        var c = parseInt(h.months.eq(h.months.length - 1).attr("data-month"), 10)
                            , d = parseInt(h.months.eq(h.months.length - 1).attr("data-year"), 10)
                            , e = new Date(d,c)
                            , f = e.getTime()
                            , g = h.animating ? !1 : !0;
                        if (h.params.maxDate && f > new Date(h.params.maxDate).getTime())
                            return h.resetMonth();
                        if (h.monthsTranslate--,
                            c === h.currentMonth) {
                            var i = 100 * -h.monthsTranslate * k
                                , j = a(h.monthHTML(f, "next")).transform("translate3d(" + (h.isH ? i : 0) + "%, " + (h.isH ? 0 : i) + "%, 0)").addClass("picker-calendar-month-next");
                            h.wrapper.append(j[0]),
                                h.months = h.wrapper.find(".picker-calendar-month"),
                            h.params.onMonthAdd && h.params.onMonthAdd(h, h.months.eq(h.months.length - 1)[0])
                        }
                        h.animating = !0,
                            h.onMonthChangeStart("next");
                        var l = 100 * h.monthsTranslate * k;
                        h.wrapper.transition(b).transform("translate3d(" + (h.isH ? l : 0) + "%, " + (h.isH ? 0 : l) + "%, 0)"),
                        g && h.wrapper.transitionEnd(function() {
                            h.onMonthChangeEnd("next")
                        }),
                        h.params.animate || h.onMonthChangeEnd("next")
                    }
                    ,
                    h.prevMonth = function(b) {
                        ("undefined" == typeof b || "object" == typeof b) && (b = "",
                        h.params.animate || (b = 0));
                        var c = parseInt(h.months.eq(0).attr("data-month"), 10)
                            , d = parseInt(h.months.eq(0).attr("data-year"), 10)
                            , e = new Date(d,c + 1,-1)
                            , f = e.getTime()
                            , g = h.animating ? !1 : !0;
                        if (h.params.minDate && f < new Date(h.params.minDate).getTime())
                            return h.resetMonth();
                        if (h.monthsTranslate++,
                            c === h.currentMonth) {
                            var i = 100 * -h.monthsTranslate * k
                                , j = a(h.monthHTML(f, "prev")).transform("translate3d(" + (h.isH ? i : 0) + "%, " + (h.isH ? 0 : i) + "%, 0)").addClass("picker-calendar-month-prev");
                            h.wrapper.prepend(j[0]),
                                h.months = h.wrapper.find(".picker-calendar-month"),
                            h.params.onMonthAdd && h.params.onMonthAdd(h, h.months.eq(0)[0])
                        }
                        h.animating = !0,
                            h.onMonthChangeStart("prev");
                        var l = 100 * h.monthsTranslate * k;
                        h.wrapper.transition(b).transform("translate3d(" + (h.isH ? l : 0) + "%, " + (h.isH ? 0 : l) + "%, 0)"),
                        g && h.wrapper.transitionEnd(function() {
                            h.onMonthChangeEnd("prev")
                        }),
                        h.params.animate || h.onMonthChangeEnd("prev")
                    }
                    ,
                    h.resetMonth = function(a) {
                        "undefined" == typeof a && (a = "");
                        var b = 100 * h.monthsTranslate * k;
                        h.wrapper.transition(a).transform("translate3d(" + (h.isH ? b : 0) + "%, " + (h.isH ? 0 : b) + "%, 0)")
                    }
                    ,
                    h.setYearMonth = function(a, b, c) {
                        "undefined" == typeof a && (a = h.currentYear),
                        "undefined" == typeof b && (b = h.currentMonth),
                        ("undefined" == typeof c || "object" == typeof c) && (c = "",
                        h.params.animate || (c = 0));
                        var d;
                        if (d = a < h.currentYear ? new Date(a,b + 1,-1).getTime() : new Date(a,b).getTime(),
                            h.params.maxDate && d > new Date(h.params.maxDate).getTime())
                            return !1;
                        if (h.params.minDate && d < new Date(h.params.minDate).getTime())
                            return !1;
                        var e = new Date(h.currentYear,h.currentMonth).getTime()
                            , f = d > e ? "next" : "prev"
                            , g = h.monthHTML(new Date(a,b));
                        h.monthsTranslate = h.monthsTranslate || 0;
                        var i, j, l = h.monthsTranslate, m = h.animating ? !1 : !0;
                        d > e ? (h.monthsTranslate--,
                        h.animating || h.months.eq(h.months.length - 1).remove(),
                            h.wrapper.append(g),
                            h.months = h.wrapper.find(".picker-calendar-month"),
                            i = 100 * -(l - 1) * k,
                            h.months.eq(h.months.length - 1).transform("translate3d(" + (h.isH ? i : 0) + "%, " + (h.isH ? 0 : i) + "%, 0)").addClass("picker-calendar-month-next")) : (h.monthsTranslate++,
                        h.animating || h.months.eq(0).remove(),
                            h.wrapper.prepend(g),
                            h.months = h.wrapper.find(".picker-calendar-month"),
                            i = 100 * -(l + 1) * k,
                            h.months.eq(0).transform("translate3d(" + (h.isH ? i : 0) + "%, " + (h.isH ? 0 : i) + "%, 0)").addClass("picker-calendar-month-prev")),
                        h.params.onMonthAdd && h.params.onMonthAdd(h, "next" === f ? h.months.eq(h.months.length - 1)[0] : h.months.eq(0)[0]),
                            h.animating = !0,
                            h.onMonthChangeStart(f),
                            j = 100 * h.monthsTranslate * k,
                            h.wrapper.transition(c).transform("translate3d(" + (h.isH ? j : 0) + "%, " + (h.isH ? 0 : j) + "%, 0)"),
                        m && h.wrapper.transitionEnd(function() {
                            h.onMonthChangeEnd(f, !0)
                        }),
                        h.params.animate || h.onMonthChangeEnd(f)
                    }
                    ,
                    h.nextYear = function() {
                        h.setYearMonth(h.currentYear + 1)
                    }
                    ,
                    h.prevYear = function() {
                        h.setYearMonth(h.currentYear - 1)
                    }
                    ,
                    h.layout = function() {
                        var a, b = "", c = "", d = h.value && h.value.length ? h.value[0] : (new Date).setHours(0, 0, 0, 0), e = h.monthHTML(d, "prev"), f = h.monthHTML(d), g = h.monthHTML(d, "next"), i = '<div class="picker-calendar-months"><div class="picker-calendar-months-wrapper">' + (e + f + g) + "</div></div>", j = "";
                        if (h.params.weekHeader) {
                            for (a = 0; 7 > a; a++) {
                                var k = a + h.params.firstDay > 6 ? a - 7 + h.params.firstDay : a + h.params.firstDay
                                    , l = h.params.dayNamesShort[k];
                                j += '<div class="picker-calendar-week-day ' + (h.params.weekendDays.indexOf(k) >= 0 ? "picker-calendar-week-day-weekend" : "") + '"> ' + l + "</div>"
                            }
                            j = '<div class="picker-calendar-week-days">' + j + "</div>"
                        }
                        c = "picker-modal picker-calendar " + (h.params.cssClass || "");
                        var m = h.params.toolbar ? h.params.toolbarTemplate.replace(/{{closeText}}/g, h.params.toolbarCloseText) : "";
                        h.params.toolbar && (m = h.params.toolbarTemplate.replace(/{{closeText}}/g, h.params.toolbarCloseText).replace(/{{monthPicker}}/g, h.params.monthPicker ? h.params.monthPickerTemplate : "").replace(/{{yearPicker}}/g, h.params.yearPicker ? h.params.yearPickerTemplate : "")),
                            b = '<div class="' + c + '">' + m + '<div class="picker-modal-inner">' + j + i + "</div></div>",
                            h.pickerHTML = b
                    }
                    ,
                h.params.input && (h.input = a(h.params.input),
                h.input.length > 0 && (h.params.inputReadOnly && h.input.prop("readOnly", !0),
                h.inline || h.input.on("click", e))),
                h.inline || a("html").on("click", f),
                    h.opened = !1,
                    h.open = function() {
                        var b = !1;
                        h.opened || (h.value || h.params.value && (h.value = h.params.value,
                            b = !0),
                            h.layout(),
                            h.inline ? (h.container = a(h.pickerHTML),
                                h.container.addClass("picker-modal-inline"),
                                a(h.params.container).append(h.container)) : (h.container = a(a.pickerModal(h.pickerHTML)),
                                a(h.container).on("close", function() {
                                    g()
                                })),
                            h.container[0].f7Calendar = h,
                            h.wrapper = h.container.find(".picker-calendar-months-wrapper"),
                            h.months = h.wrapper.find(".picker-calendar-month"),
                            h.updateCurrentMonthYear(),
                            h.monthsTranslate = 0,
                            h.setMonthsTranslate(),
                            h.initCalendarEvents(),
                        b && h.updateValue()),
                            h.opened = !0,
                            h.initialized = !0,
                        h.params.onMonthAdd && h.months.each(function() {
                            h.params.onMonthAdd(h, this)
                        }),
                        h.params.onOpen && h.params.onOpen(h)
                    }
                    ,
                    h.close = function() {
                        h.opened && !h.inline && a.closeModal(h.container)
                    }
                    ,
                    h.destroy = function() {
                        h.close(),
                        h.params.input && h.input.length > 0 && h.input.off("click", e),
                            a("html").off("click", f)
                    }
                    ,
                h.inline && h.open(),
                    h
            }
            ;
        a.fn.calendar = function(b) {
            return this.each(function() {
                var d = a(this);
                if (d[0]) {
                    var e = {};
                    "INPUT" === d[0].tagName.toUpperCase() ? e.input = d : e.container = d,
                        new c(a.extend(e, b))
                }
            })
        }
            ,
            a.initCalendar = function(b) {
                var c = a(b ? b : document.body);
                c.find("[data-toggle='date']").each(function() {
                    a(this).calendar()
                })
            }
    }(Zepto),
    +function(a) {
        "use strict";
        var b = function(b) {
                function c() {
                    if (g.opened)
                        for (var a = 0; a < g.cols.length; a++)
                            g.cols[a].divider || (g.cols[a].calcSize(),
                                g.cols[a].setValue(g.cols[a].value, 0, !1))
                }
                function d(b) {
                    if (b.preventDefault(),
                        a.device.isWeixin && a.device.android && g.params.inputReadOnly && (this.focus(),
                            this.blur()),
                        !g.opened && (g.open(),
                            g.params.scrollToInput)) {
                        var c = g.input.parents(".content");
                        if (0 === c.length)
                            return;
                        var d, e = parseInt(c.css("padding-top"), 10), f = parseInt(c.css("padding-bottom"), 10), h = c[0].offsetHeight - e - g.container.height(), i = c[0].scrollHeight - e - g.container.height(), j = g.input.offset().top - e + g.input[0].offsetHeight;
                        if (j > h) {
                            var k = c.scrollTop() + j - h;
                            k + h > i && (d = k + h - i + f,
                            h === i && (d = g.container.height()),
                                c.css({
                                    "padding-bottom": d + "px"
                                })),
                                c.scrollTop(k, 300)
                        }
                    }
                }
                function e(b) {
                    g.input && g.input.length > 0 ? b.target !== g.input[0] && 0 === a(b.target).parents(".picker-modal").length && g.close() : 0 === a(b.target).parents(".picker-modal").length && g.close()
                }
                function f() {
                    g.opened = !1,
                    g.input && g.input.length > 0 && g.input.parents(".content").css({
                        "padding-bottom": ""
                    }),
                    g.params.onClose && g.params.onClose(g),
                        g.container.find(".picker-items-col").each(function() {
                            g.destroyPickerCol(this)
                        })
                }
                var g = this
                    , h = {
                        updateValuesOnMomentum: !1,
                        updateValuesOnTouchmove: !0,
                        rotateEffect: !1,
                        momentumRatio: 7,
                        freeMode: !1,
                        scrollToInput: !0,
                        inputReadOnly: !0,
                        toolbar: !0,
                        toolbarCloseText: "确定",
                        toolbarTemplate: '<header class="bar bar-nav">                <button class="button button-link pull-right close-picker">确定</button>                <h1 class="title">请选择</h1>                </header>'
                    };
                b = b || {};
                for (var i in h)
                    "undefined" == typeof b[i] && (b[i] = h[i]);
                g.params = b,
                    g.cols = [],
                    g.initialized = !1,
                    g.inline = g.params.container ? !0 : !1;
                var j = a.device.ios || navigator.userAgent.toLowerCase().indexOf("safari") >= 0 && navigator.userAgent.toLowerCase().indexOf("chrome") < 0 && !a.device.android;
                return g.setValue = function(a, b) {
                    for (var c = 0, d = 0; d < g.cols.length; d++)
                        g.cols[d] && !g.cols[d].divider && (g.cols[d].setValue(a[c], b),
                            c++)
                }
                    ,
                    g.updateValue = function() {
                        for (var b = [], c = [], d = 0; d < g.cols.length; d++)
                            g.cols[d].divider || (b.push(g.cols[d].value),
                                c.push(g.cols[d].displayValue));
                        b.indexOf(void 0) >= 0 || (g.value = b,
                            g.displayValue = c,
                        g.params.onChange && g.params.onChange(g, g.value, g.displayValue),
                        g.input && g.input.length > 0 && (a(g.input).val(g.params.formatValue ? g.params.formatValue(g, g.value, g.displayValue) : g.value.join(" ")),
                            a(g.input).trigger("change")))
                    }
                    ,
                    g.initPickerCol = function(b, c) {
                        function d() {
                            s = a.requestAnimationFrame(function() {
                                m.updateItems(void 0, void 0, 0),
                                    d()
                            })
                        }
                        function e(b) {
                            u || t || (b.preventDefault(),
                                t = !0,
                                v = w = "touchstart" === b.type ? b.targetTouches[0].pageY : b.pageY,
                                x = (new Date).getTime(),
                                F = !0,
                                z = B = a.getTranslate(m.wrapper[0], "y"))
                        }
                        function f(b) {
                            if (t) {
                                b.preventDefault(),
                                    F = !1,
                                    w = "touchmove" === b.type ? b.targetTouches[0].pageY : b.pageY,
                                u || (a.cancelAnimationFrame(s),
                                    u = !0,
                                    z = B = a.getTranslate(m.wrapper[0], "y"),
                                    m.wrapper.transition(0)),
                                    b.preventDefault();
                                var c = w - v;
                                B = z + c,
                                    A = void 0,
                                q > B && (B = q - Math.pow(q - B, .8),
                                    A = "min"),
                                B > r && (B = r + Math.pow(B - r, .8),
                                    A = "max"),
                                    m.wrapper.transform("translate3d(0," + B + "px,0)"),
                                    m.updateItems(void 0, B, 0, g.params.updateValuesOnTouchmove),
                                    D = B - C || B,
                                    E = (new Date).getTime(),
                                    C = B
                            }
                        }
                        function h(b) {
                            if (!t || !u)
                                return void (t = u = !1);
                            t = u = !1,
                                m.wrapper.transition(""),
                            A && ("min" === A ? m.wrapper.transform("translate3d(0," + q + "px,0)") : m.wrapper.transform("translate3d(0," + r + "px,0)")),
                                y = (new Date).getTime();
                            var c, e;
                            y - x > 300 ? e = B : (c = Math.abs(D / (y - E)),
                                e = B + D * g.params.momentumRatio),
                                e = Math.max(Math.min(e, r), q);
                            var f = -Math.floor((e - r) / o);
                            g.params.freeMode || (e = -f * o + r),
                                m.wrapper.transform("translate3d(0," + parseInt(e, 10) + "px,0)"),
                                m.updateItems(f, e, "", !0),
                            g.params.updateValuesOnMomentum && (d(),
                                m.wrapper.transitionEnd(function() {
                                    a.cancelAnimationFrame(s)
                                })),
                                setTimeout(function() {
                                    F = !0
                                }, 100)
                        }
                        function i(b) {
                            if (F) {
                                a.cancelAnimationFrame(s);
                                var c = a(this).attr("data-picker-value");
                                m.setValue(c)
                            }
                        }
                        var k = a(b)
                            , l = k.index()
                            , m = g.cols[l];
                        if (!m.divider) {
                            m.container = k,
                                m.wrapper = m.container.find(".picker-items-col-wrapper"),
                                m.items = m.wrapper.find(".picker-item");
                            var n, o, p, q, r;
                            m.replaceValues = function(a, b) {
                                m.destroyEvents(),
                                    m.values = a,
                                    m.displayValues = b;
                                var c = g.columnHTML(m, !0);
                                m.wrapper.html(c),
                                    m.items = m.wrapper.find(".picker-item"),
                                    m.calcSize(),
                                    m.setValue(m.values[0], 0, !0),
                                    m.initEvents()
                            }
                                ,
                                m.calcSize = function() {
                                    g.params.rotateEffect && (m.container.removeClass("picker-items-col-absolute"),
                                    m.width || m.container.css({
                                        width: ""
                                    }));
                                    var b, c;
                                    b = 0,
                                        c = m.container[0].offsetHeight,
                                        n = m.wrapper[0].offsetHeight,
                                        o = m.items[0].offsetHeight,
                                        p = o * m.items.length,
                                        q = c / 2 - p + o / 2,
                                        r = c / 2 - o / 2,
                                    m.width && (b = m.width,
                                    parseInt(b, 10) === b && (b += "px"),
                                        m.container.css({
                                            width: b
                                        })),
                                    g.params.rotateEffect && (m.width || (m.items.each(function() {
                                        var c = a(this);
                                        c.css({
                                            width: "auto"
                                        }),
                                            b = Math.max(b, c[0].offsetWidth),
                                            c.css({
                                                width: ""
                                            })
                                    }),
                                        m.container.css({
                                            width: b + 2 + "px"
                                        })),
                                        m.container.addClass("picker-items-col-absolute"))
                                }
                                ,
                                m.calcSize(),
                                m.wrapper.transform("translate3d(0," + r + "px,0)").transition(0);
                            var s;
                            m.setValue = function(b, c, e) {
                                "undefined" == typeof c && (c = "");
                                var f = m.wrapper.find('.picker-item[data-picker-value="' + b + '"]').index();
                                if ("undefined" != typeof f && -1 !== f) {
                                    var h = -f * o + r;
                                    m.wrapper.transition(c),
                                        m.wrapper.transform("translate3d(0," + h + "px,0)"),
                                    g.params.updateValuesOnMomentum && m.activeIndex && m.activeIndex !== f && (a.cancelAnimationFrame(s),
                                        m.wrapper.transitionEnd(function() {
                                            a.cancelAnimationFrame(s)
                                        }),
                                        d()),
                                        m.updateItems(f, h, c, e)
                                }
                            }
                                ,
                                m.updateItems = function(b, c, d, e) {
                                    "undefined" == typeof c && (c = a.getTranslate(m.wrapper[0], "y")),
                                    "undefined" == typeof b && (b = -Math.round((c - r) / o)),
                                    0 > b && (b = 0),
                                    b >= m.items.length && (b = m.items.length - 1);
                                    var f = m.activeIndex;
                                    m.activeIndex = b,
                                        m.wrapper.find(".picker-selected").removeClass("picker-selected"),
                                    g.params.rotateEffect && m.items.transition(d);
                                    var h = m.items.eq(b).addClass("picker-selected").transform("");
                                    if ((e || "undefined" == typeof e) && (m.value = h.attr("data-picker-value"),
                                            m.displayValue = m.displayValues ? m.displayValues[b] : m.value,
                                        f !== b && (m.onChange && m.onChange(g, m.value, m.displayValue),
                                            g.updateValue())),
                                            g.params.rotateEffect) {
                                        (c - (Math.floor((c - r) / o) * o + r)) / o;
                                        m.items.each(function() {
                                            var b = a(this)
                                                , d = b.index() * o
                                                , e = r - c
                                                , f = d - e
                                                , g = f / o
                                                , h = Math.ceil(m.height / o / 2) + 1
                                                , i = -18 * g;
                                            i > 180 && (i = 180),
                                            -180 > i && (i = -180),
                                                Math.abs(g) > h ? b.addClass("picker-item-far") : b.removeClass("picker-item-far"),
                                                b.transform("translate3d(0, " + (-c + r) + "px, " + (j ? -110 : 0) + "px) rotateX(" + i + "deg)")
                                        })
                                    }
                                }
                                ,
                            c && m.updateItems(0, r, 0);
                            var t, u, v, w, x, y, z, A, B, C, D, E, F = !0;
                            m.initEvents = function(b) {
                                var c = b ? "off" : "on";
                                m.container[c](a.touchEvents.start, e),
                                    m.container[c](a.touchEvents.move, f),
                                    m.container[c](a.touchEvents.end, h),
                                    m.items[c]("click", i)
                            }
                                ,
                                m.destroyEvents = function() {
                                    m.initEvents(!0)
                                }
                                ,
                                m.container[0].f7DestroyPickerCol = function() {
                                    m.destroyEvents()
                                }
                                ,
                                m.initEvents()
                        }
                    }
                    ,
                    g.destroyPickerCol = function(b) {
                        b = a(b),
                        "f7DestroyPickerCol" in b[0] && b[0].f7DestroyPickerCol()
                    }
                    ,
                    a(window).on("resize", c),
                    g.columnHTML = function(a, b) {
                        var c = ""
                            , d = "";
                        if (a.divider)
                            d += '<div class="picker-items-col picker-items-col-divider ' + (a.textAlign ? "picker-items-col-" + a.textAlign : "") + " " + (a.cssClass || "") + '">' + a.content + "</div>";
                        else {
                            for (var e = 0; e < a.values.length; e++)
                                c += '<div class="picker-item" data-picker-value="' + a.values[e] + '">' + (a.displayValues ? a.displayValues[e] : a.values[e]) + "</div>";
                            d += '<div class="picker-items-col ' + (a.textAlign ? "picker-items-col-" + a.textAlign : "") + " " + (a.cssClass || "") + '"><div class="picker-items-col-wrapper">' + c + "</div></div>"
                        }
                        return b ? c : d
                    }
                    ,
                    g.layout = function() {
                        var a, b = "", c = "";
                        g.cols = [];
                        var d = "";
                        for (a = 0; a < g.params.cols.length; a++) {
                            var e = g.params.cols[a];
                            d += g.columnHTML(g.params.cols[a]),
                                g.cols.push(e)
                        }
                        c = "picker-modal picker-columns " + (g.params.cssClass || "") + (g.params.rotateEffect ? " picker-3d" : ""),
                            b = '<div class="' + c + '">' + (g.params.toolbar ? g.params.toolbarTemplate.replace(/{{closeText}}/g, g.params.toolbarCloseText) : "") + '<div class="picker-modal-inner picker-items">' + d + '<div class="picker-center-highlight"></div></div></div>',
                            g.pickerHTML = b
                    }
                    ,
                g.params.input && (g.input = a(g.params.input),
                g.input.length > 0 && (g.params.inputReadOnly && g.input.prop("readOnly", !0),
                g.inline || g.input.on("click", d))),
                g.inline || a("html").on("click", e),
                    g.opened = !1,
                    g.open = function() {
                        g.opened || (g.layout(),
                            g.inline ? (g.container = a(g.pickerHTML),
                                g.container.addClass("picker-modal-inline"),
                                a(g.params.container).append(g.container)) : (g.container = a(a.pickerModal(g.pickerHTML)),
                                a(g.container).on("close", function() {
                                    f()
                                })),
                            g.container[0].f7Picker = g,
                            g.container.find(".picker-items-col").each(function() {
                                var a = !0;
                                (!g.initialized && g.params.value || g.initialized && g.value) && (a = !1),
                                    g.initPickerCol(this, a)
                            }),
                            g.initialized ? g.value && g.setValue(g.value, 0) : g.params.value && g.setValue(g.params.value, 0)),
                            g.opened = !0,
                            g.initialized = !0,
                        g.params.onOpen && g.params.onOpen(g)
                    }
                    ,
                    g.close = function() {
                        g.opened && !g.inline && a.closeModal(g.container)
                    }
                    ,
                    g.destroy = function() {
                        g.close(),
                        g.params.input && g.input.length > 0 && g.input.off("click", d),
                            a("html").off("click", e),
                            a(window).off("resize", c)
                    }
                    ,
                g.inline && g.open(),
                    g
            }
            ;
        a(document).on("click", ".close-picker", function() {
            var b = a(".picker-modal.modal-in");
            a.closeModal(b)
        }),
            a.fn.picker = function(c) {
                var d = arguments;
                return this.each(function() {
                    if (this) {
                        var e = a(this)
                            , f = e.data("picker");
                        if (!f) {
                            var g = a.extend({
                                input: this,
                                value: e.val() ? e.val().split(" ") : ""
                            }, c);
                            f = new b(g),
                                e.data("picker", f)
                        }
                        "string" == typeof c && f[c].apply(f, Array.prototype.slice.call(d, 1))
                    }
                })
            }
    }(Zepto),
    +function(a) {
        "use strict";
        var b = new Date
            , c = function(a) {
                for (var b = [], c = 1; (a || 31) >= c; c++)
                    b.push(10 > c ? "0" + c : c);
                return b
            }
            , d = function(a, b) {
                var d = new Date(b,parseInt(a) + 1 - 1,1)
                    , e = new Date(d - 1);
                return c(e.getDate())
            }
            , e = function(a) {
                return 10 > a ? "0" + a : a
            }
            , f = "01 02 03 04 05 06 07 08 09 10 11 12".split(" ")
            , g = function() {
                for (var a = [], b = 1950; 2030 >= b; b++)
                    a.push(b);
                return a
            }()
            , h = {
                rotateEffect: !1,
                value: [b.getFullYear(), e(b.getMonth() + 1), e(b.getDate()), b.getHours()],
                onChange: function(a, b, c) {
                    var e = d(a.cols[1].value, a.cols[0].value)
                        , f = a.cols[2].value;
                    f > e.length && (f = e.length),
                        a.cols[2].setValue(f)
                },
                formatValue: function(a, b, c) {
                    return c[0] + "-" + b[1] + "-" + b[2] 
                },
                cols: [{
                    values: g
                }, {
                    values: f
                }, {
                    values: c()
                }]
            };
        a.fn.datetimePicker = function(b) {
            return this.each(function() {
                if (this) {
                    var c = a.extend(h, b);
                    a(this).picker(c),
                    //console.log(c.formatValue(c, c.value, c.value)),
                    b.value && a(this).val(c.formatValue(c.values[0], c.values[1],c.values[2]))
                }
            })
        }
    }(Zepto),
    +function(a) {
        "use strict";
        function b(a, b) {
            this.wrapper = "string" == typeof a ? document.querySelector(a) : a,
                this.scroller = $(this.wrapper).find(".content-inner")[0],
                this.scrollerStyle = this.scroller && this.scroller.style,
                this.options = {
                    resizeScrollbars: !0,
                    mouseWheelSpeed: 20,
                    snapThreshold: .334,
                    startX: 0,
                    startY: 0,
                    scrollY: !0,
                    directionLockThreshold: 5,
                    momentum: !0,
                    bounce: !0,
                    bounceTime: 600,
                    bounceEasing: "",
                    preventDefault: !0,
                    preventDefaultException: {
                        tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
                    },
                    HWCompositing: !0,
                    useTransition: !0,
                    useTransform: !0,
                    eventPassthrough: void 0
                };
            for (var c in b)
                this.options[c] = b[c];
            this.translateZ = this.options.HWCompositing && f.hasPerspective ? " translateZ(0)" : "",
                this.options.useTransition = f.hasTransition && this.options.useTransition,
                this.options.useTransform = f.hasTransform && this.options.useTransform,
                this.options.eventPassthrough = this.options.eventPassthrough === !0 ? "vertical" : this.options.eventPassthrough,
                this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault,
                this.options.scrollY = "vertical" === this.options.eventPassthrough ? !1 : this.options.scrollY,
                this.options.scrollX = "horizontal" === this.options.eventPassthrough ? !1 : this.options.scrollX,
                this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough,
                this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold,
                this.options.bounceEasing = "string" == typeof this.options.bounceEasing ? f.ease[this.options.bounceEasing] || f.ease.circular : this.options.bounceEasing,
                this.options.resizePolling = void 0 === this.options.resizePolling ? 60 : this.options.resizePolling,
            this.options.tap === !0 && (this.options.tap = "tap"),
            "scale" === this.options.shrinkScrollbars && (this.options.useTransition = !1),
                this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1,
            3 === this.options.probeType && (this.options.useTransition = !1),
                this.x = 0,
                this.y = 0,
                this.directionX = 0,
                this.directionY = 0,
                this._events = {},
                this._init(),
                this.refresh(),
                this.scrollTo(this.options.startX, this.options.startY),
                this.enable()
        }
        function c(a, b, c) {
            var d = document.createElement("div")
                , e = document.createElement("div");
            return c === !0 && (d.style.cssText = "position:absolute;z-index:9999",
                e.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px"),
                e.className = "iScrollIndicator",
                "h" === a ? (c === !0 && (d.style.cssText += ";height:5px;left:2px;right:2px;bottom:0",
                    e.style.height = "100%"),
                    d.className = "iScrollHorizontalScrollbar") : (c === !0 && (d.style.cssText += ";width:5px;bottom:2px;top:2px;right:1px",
                    e.style.width = "100%"),
                    d.className = "iScrollVerticalScrollbar"),
                d.style.cssText += ";overflow:hidden",
            b || (d.style.pointerEvents = "none"),
                d.appendChild(e),
                d
        }
        function d(b, c) {
            this.wrapper = "string" == typeof c.el ? document.querySelector(c.el) : c.el,
                this.wrapperStyle = this.wrapper.style,
                this.indicator = this.wrapper.children[0],
                this.indicatorStyle = this.indicator.style,
                this.scroller = b,
                this.options = {
                    listenX: !0,
                    listenY: !0,
                    interactive: !1,
                    resize: !0,
                    defaultScrollbars: !1,
                    shrink: !1,
                    fade: !1,
                    speedRatioX: 0,
                    speedRatioY: 0
                };
            for (var d in c)
                this.options[d] = c[d];
            this.sizeRatioX = 1,
                this.sizeRatioY = 1,
                this.maxPosX = 0,
                this.maxPosY = 0,
            this.options.interactive && (this.options.disableTouch || (f.addEvent(this.indicator, "touchstart", this),
                f.addEvent(a, "touchend", this)),
            this.options.disablePointer || (f.addEvent(this.indicator, f.prefixPointerEvent("pointerdown"), this),
                f.addEvent(a, f.prefixPointerEvent("pointerup"), this)),
            this.options.disableMouse || (f.addEvent(this.indicator, "mousedown", this),
                f.addEvent(a, "mouseup", this))),
            this.options.fade && (this.wrapperStyle[f.style.transform] = this.scroller.translateZ,
                this.wrapperStyle[f.style.transitionDuration] = f.isBadAndroid ? "0.001s" : "0ms",
                this.wrapperStyle.opacity = "0")
        }
        var e = a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame || a.oRequestAnimationFrame || a.msRequestAnimationFrame || function(b) {
                    a.setTimeout(b, 1e3 / 60)
                }
            , f = function() {
                function b(a) {
                    return f === !1 ? !1 : "" === f ? a : f + a.charAt(0).toUpperCase() + a.substr(1)
                }
                var c = {}
                    , d = document.createElement("div").style
                    , f = function() {
                        for (var a, b = ["t", "webkitT", "MozT", "msT", "OT"], c = 0, e = b.length; e > c; c++)
                            if (a = b[c] + "ransform",
                                a in d)
                                return b[c].substr(0, b[c].length - 1);
                        return !1
                    }();
                c.getTime = Date.now || function() {
                    return (new Date).getTime()
                }
                    ,
                    c.extend = function(a, b) {
                        for (var c in b)
                            a[c] = b[c]
                    }
                    ,
                    c.addEvent = function(a, b, c, d) {
                        a.addEventListener(b, c, !!d)
                    }
                    ,
                    c.removeEvent = function(a, b, c, d) {
                        a.removeEventListener(b, c, !!d)
                    }
                    ,
                    c.prefixPointerEvent = function(b) {
                        return a.MSPointerEvent ? "MSPointer" + b.charAt(9).toUpperCase() + b.substr(10) : b
                    }
                    ,
                    c.momentum = function(a, b, c, d, f, g, h) {
                        function i() {
                            +new Date - o > 50 && (h._execEvent("scroll"),
                                o = +new Date),
                            +new Date - n < k && e(i)
                        }
                        var j, k, l = a - b, m = Math.abs(l) / c;
                        m /= 2,
                            m = m > 1.5 ? 1.5 : m,
                            g = void 0 === g ? 6e-4 : g,
                            j = a + m * m / (2 * g) * (0 > l ? -1 : 1),
                            k = m / g,
                            d > j ? (j = f ? d - f / 2.5 * (m / 8) : d,
                                l = Math.abs(j - a),
                                k = l / m) : j > 0 && (j = f ? f / 2.5 * (m / 8) : 0,
                                l = Math.abs(a) + j,
                                k = l / m);
                        var n = +new Date
                            , o = n;
                        return e(i),
                        {
                            destination: Math.round(j),
                            duration: k
                        }
                    }
                ;
                var g = b("transform");
                return c.extend(c, {
                    hasTransform: g !== !1,
                    hasPerspective: b("perspective") in d,
                    hasTouch: "ontouchstart" in a,
                    hasPointer: a.PointerEvent || a.MSPointerEvent,
                    hasTransition: b("transition") in d
                }),
                    c.isBadAndroid = /Android /.test(a.navigator.appVersion) && !/Chrome\/\d/.test(a.navigator.appVersion) && !1,
                    c.extend(c.style = {}, {
                        transform: g,
                        transitionTimingFunction: b("transitionTimingFunction"),
                        transitionDuration: b("transitionDuration"),
                        transitionDelay: b("transitionDelay"),
                        transformOrigin: b("transformOrigin")
                    }),
                    c.hasClass = function(a, b) {
                        var c = new RegExp("(^|\\s)" + b + "(\\s|$)");
                        return c.test(a.className)
                    }
                    ,
                    c.addClass = function(a, b) {
                        if (!c.hasClass(a, b)) {
                            var d = a.className.split(" ");
                            d.push(b),
                                a.className = d.join(" ")
                        }
                    }
                    ,
                    c.removeClass = function(a, b) {
                        if (c.hasClass(a, b)) {
                            var d = new RegExp("(^|\\s)" + b + "(\\s|$)","g");
                            a.className = a.className.replace(d, " ")
                        }
                    }
                    ,
                    c.offset = function(a) {
                        for (var b = -a.offsetLeft, c = -a.offsetTop; a = a.offsetParent; )
                            b -= a.offsetLeft,
                                c -= a.offsetTop;
                        return {
                            left: b,
                            top: c
                        }
                    }
                    ,
                    c.preventDefaultException = function(a, b) {
                        for (var c in b)
                            if (b[c].test(a[c]))
                                return !0;
                        return !1
                    }
                    ,
                    c.extend(c.eventType = {}, {
                        touchstart: 1,
                        touchmove: 1,
                        touchend: 1,
                        mousedown: 2,
                        mousemove: 2,
                        mouseup: 2,
                        pointerdown: 3,
                        pointermove: 3,
                        pointerup: 3,
                        MSPointerDown: 3,
                        MSPointerMove: 3,
                        MSPointerUp: 3
                    }),
                    c.extend(c.ease = {}, {
                        quadratic: {
                            style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                            fn: function(a) {
                                return a * (2 - a)
                            }
                        },
                        circular: {
                            style: "cubic-bezier(0.1, 0.57, 0.1, 1)",
                            fn: function(a) {
                                return Math.sqrt(1 - --a * a)
                            }
                        },
                        back: {
                            style: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                            fn: function(a) {
                                var b = 4;
                                return (a -= 1) * a * ((b + 1) * a + b) + 1
                            }
                        },
                        bounce: {
                            style: "",
                            fn: function(a) {
                                return (a /= 1) < 1 / 2.75 ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375
                            }
                        },
                        elastic: {
                            style: "",
                            fn: function(a) {
                                var b = .22
                                    , c = .4;
                                return 0 === a ? 0 : 1 === a ? 1 : c * Math.pow(2, -10 * a) * Math.sin((a - b / 4) * (2 * Math.PI) / b) + 1
                            }
                        }
                    }),
                    c.tap = function(a, b) {
                        var c = document.createEvent("Event");
                        c.initEvent(b, !0, !0),
                            c.pageX = a.pageX,
                            c.pageY = a.pageY,
                            a.target.dispatchEvent(c)
                    }
                    ,
                    c.click = function(a) {
                        var b, c = a.target;
                        /(SELECT|INPUT|TEXTAREA)/i.test(c.tagName) || (b = document.createEvent("MouseEvents"),
                            b.initMouseEvent("click", !0, !0, a.view, 1, c.screenX, c.screenY, c.clientX, c.clientY, a.ctrlKey, a.altKey, a.shiftKey, a.metaKey, 0, null ),
                            b._constructed = !0,
                            c.dispatchEvent(b))
                    }
                    ,
                    c
            }();
        b.prototype = {
            version: "5.1.3",
            _init: function() {
                this._initEvents(),
                (this.options.scrollbars || this.options.indicators) && this._initIndicators(),
                this.options.mouseWheel && this._initWheel(),
                this.options.snap && this._initSnap(),
                this.options.keyBindings && this._initKeys()
            },
            destroy: function() {
                this._initEvents(!0),
                    this._execEvent("destroy")
            },
            _transitionEnd: function(a) {
                a.target === this.scroller && this.isInTransition && (this._transitionTime(),
                this.resetPosition(this.options.bounceTime) || (this.isInTransition = !1,
                    this._execEvent("scrollEnd")))
            },
            _start: function(a) {
                if ((1 === f.eventType[a.type] || 0 === a.button) && this.enabled && (!this.initiated || f.eventType[a.type] === this.initiated)) {
                    !this.options.preventDefault || f.isBadAndroid || f.preventDefaultException(a.target, this.options.preventDefaultException) || a.preventDefault();
                    var b, c = a.touches ? a.touches[0] : a;
                    this.initiated = f.eventType[a.type],
                        this.moved = !1,
                        this.distX = 0,
                        this.distY = 0,
                        this.directionX = 0,
                        this.directionY = 0,
                        this.directionLocked = 0,
                        this._transitionTime(),
                        this.startTime = f.getTime(),
                        this.options.useTransition && this.isInTransition ? (this.isInTransition = !1,
                            b = this.getComputedPosition(),
                            this._translate(Math.round(b.x), Math.round(b.y)),
                            this._execEvent("scrollEnd")) : !this.options.useTransition && this.isAnimating && (this.isAnimating = !1,
                            this._execEvent("scrollEnd")),
                        this.startX = this.x,
                        this.startY = this.y,
                        this.absStartX = this.x,
                        this.absStartY = this.y,
                        this.pointX = c.pageX,
                        this.pointY = c.pageY,
                        this._execEvent("beforeScrollStart")
                }
            },
            _move: function(a) {
                if (this.enabled && f.eventType[a.type] === this.initiated) {
                    this.options.preventDefault && a.preventDefault();
                    var b, c, d, e, g = a.touches ? a.touches[0] : a, h = g.pageX - this.pointX, i = g.pageY - this.pointY, j = f.getTime();
                    if (this.pointX = g.pageX,
                            this.pointY = g.pageY,
                            this.distX += h,
                            this.distY += i,
                            d = Math.abs(this.distX),
                            e = Math.abs(this.distY),
                            !(j - this.endTime > 300 && 10 > d && 10 > e)) {
                        if (this.directionLocked || this.options.freeScroll || (d > e + this.options.directionLockThreshold ? this.directionLocked = "h" : e >= d + this.options.directionLockThreshold ? this.directionLocked = "v" : this.directionLocked = "n"),
                            "h" === this.directionLocked) {
                            if ("vertical" === this.options.eventPassthrough)
                                a.preventDefault();
                            else if ("horizontal" === this.options.eventPassthrough)
                                return void (this.initiated = !1);
                            i = 0
                        } else if ("v" === this.directionLocked) {
                            if ("horizontal" === this.options.eventPassthrough)
                                a.preventDefault();
                            else if ("vertical" === this.options.eventPassthrough)
                                return void (this.initiated = !1);
                            h = 0
                        }
                        h = this.hasHorizontalScroll ? h : 0,
                            i = this.hasVerticalScroll ? i : 0,
                            b = this.x + h,
                            c = this.y + i,
                        (b > 0 || b < this.maxScrollX) && (b = this.options.bounce ? this.x + h / 3 : b > 0 ? 0 : this.maxScrollX),
                        (c > 0 || c < this.maxScrollY) && (c = this.options.bounce ? this.y + i / 3 : c > 0 ? 0 : this.maxScrollY),
                            this.directionX = h > 0 ? -1 : 0 > h ? 1 : 0,
                            this.directionY = i > 0 ? -1 : 0 > i ? 1 : 0,
                        this.moved || this._execEvent("scrollStart"),
                            this.moved = !0,
                            this._translate(b, c),
                        j - this.startTime > 300 && (this.startTime = j,
                            this.startX = this.x,
                            this.startY = this.y,
                        1 === this.options.probeType && this._execEvent("scroll")),
                        this.options.probeType > 1 && this._execEvent("scroll")
                    }
                }
            },
            _end: function(a) {
                if (this.enabled && f.eventType[a.type] === this.initiated) {
                    this.options.preventDefault && !f.preventDefaultException(a.target, this.options.preventDefaultException) && a.preventDefault();
                    var b, c, d = f.getTime() - this.startTime, e = Math.round(this.x), g = Math.round(this.y), h = Math.abs(e - this.startX), i = Math.abs(g - this.startY), j = 0, k = "";
                    if (this.isInTransition = 0,
                            this.initiated = 0,
                            this.endTime = f.getTime(),
                            !this.resetPosition(this.options.bounceTime)) {
                        if (this.scrollTo(e, g),
                                !this.moved)
                            return this.options.tap && f.tap(a, this.options.tap),
                            this.options.click && f.click(a),
                                void this._execEvent("scrollCancel");
                        if (this._events.flick && 200 > d && 100 > h && 100 > i)
                            return void this._execEvent("flick");
                        if (this.options.momentum && 300 > d && (b = this.hasHorizontalScroll ? f.momentum(this.x, this.startX, d, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration, this) : {
                                destination: e,
                                duration: 0
                            },
                                c = this.hasVerticalScroll ? f.momentum(this.y, this.startY, d, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration, this) : {
                                    destination: g,
                                    duration: 0
                                },
                                e = b.destination,
                                g = c.destination,
                                j = Math.max(b.duration, c.duration),
                                this.isInTransition = 1),
                                this.options.snap) {
                            var l = this._nearestSnap(e, g);
                            this.currentPage = l,
                                j = this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(e - l.x), 1e3), Math.min(Math.abs(g - l.y), 1e3)), 300),
                                e = l.x,
                                g = l.y,
                                this.directionX = 0,
                                this.directionY = 0,
                                k = this.options.bounceEasing
                        }
                        return e !== this.x || g !== this.y ? ((e > 0 || e < this.maxScrollX || g > 0 || g < this.maxScrollY) && (k = f.ease.quadratic),
                            void this.scrollTo(e, g, j, k)) : void this._execEvent("scrollEnd")
                    }
                }
            },
            _resize: function() {
                var a = this;
                clearTimeout(this.resizeTimeout),
                    this.resizeTimeout = setTimeout(function() {
                        a.refresh()
                    }, this.options.resizePolling)
            },
            resetPosition: function(b) {
                var c = this.x
                    , d = this.y;
                if (b = b || 0,
                        !this.hasHorizontalScroll || this.x > 0 ? c = 0 : this.x < this.maxScrollX && (c = this.maxScrollX),
                        !this.hasVerticalScroll || this.y > 0 ? d = 0 : this.y < this.maxScrollY && (d = this.maxScrollY),
                    c === this.x && d === this.y)
                    return !1;
                if (this.options.ptr && this.y > 44 && -1 * this.startY < $(a).height() && !this.ptrLock) {
                    d = this.options.ptrOffset || 44,
                        this._execEvent("ptr"),
                        this.ptrLock = !0;
                    var e = this;
                    setTimeout(function() {
                        e.ptrLock = !1
                    }, 500)
                }
                return this.scrollTo(c, d, b, this.options.bounceEasing),
                    !0
            },
            disable: function() {
                this.enabled = !1
            },
            enable: function() {
                this.enabled = !0
            },
            refresh: function() {
                this.wrapperWidth = this.wrapper.clientWidth,
                    this.wrapperHeight = this.wrapper.clientHeight,
                    this.scrollerWidth = this.scroller.offsetWidth,
                    this.scrollerHeight = this.scroller.offsetHeight,
                    this.maxScrollX = this.wrapperWidth - this.scrollerWidth,
                    this.maxScrollY = this.wrapperHeight - this.scrollerHeight,
                    this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0,
                    this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0,
                this.hasHorizontalScroll || (this.maxScrollX = 0,
                    this.scrollerWidth = this.wrapperWidth),
                this.hasVerticalScroll || (this.maxScrollY = 0,
                    this.scrollerHeight = this.wrapperHeight),
                    this.endTime = 0,
                    this.directionX = 0,
                    this.directionY = 0,
                    this.wrapperOffset = f.offset(this.wrapper),
                    this._execEvent("refresh"),
                    this.resetPosition()
            },
            on: function(a, b) {
                this._events[a] || (this._events[a] = []),
                    this._events[a].push(b)
            },
            off: function(a, b) {
                if (this._events[a]) {
                    var c = this._events[a].indexOf(b);
                    c > -1 && this._events[a].splice(c, 1)
                }
            },
            _execEvent: function(a) {
                if (this._events[a]) {
                    var b = 0
                        , c = this._events[a].length;
                    if (c)
                        for (; c > b; b++)
                            this._events[a][b].apply(this, [].slice.call(arguments, 1))
                }
            },
            scrollBy: function(a, b, c, d) {
                a = this.x + a,
                    b = this.y + b,
                    c = c || 0,
                    this.scrollTo(a, b, c, d)
            },
            scrollTo: function(a, b, c, d) {
                d = d || f.ease.circular,
                    this.isInTransition = this.options.useTransition && c > 0,
                    !c || this.options.useTransition && d.style ? (this._transitionTimingFunction(d.style),
                        this._transitionTime(c),
                        this._translate(a, b)) : this._animate(a, b, c, d.fn)
            },
            scrollToElement: function(a, b, c, d, e) {
                if (a = a.nodeType ? a : this.scroller.querySelector(a)) {
                    var g = f.offset(a);
                    g.left -= this.wrapperOffset.left,
                        g.top -= this.wrapperOffset.top,
                    c === !0 && (c = Math.round(a.offsetWidth / 2 - this.wrapper.offsetWidth / 2)),
                    d === !0 && (d = Math.round(a.offsetHeight / 2 - this.wrapper.offsetHeight / 2)),
                        g.left -= c || 0,
                        g.top -= d || 0,
                        g.left = g.left > 0 ? 0 : g.left < this.maxScrollX ? this.maxScrollX : g.left,
                        g.top = g.top > 0 ? 0 : g.top < this.maxScrollY ? this.maxScrollY : g.top,
                        b = void 0 === b || null  === b || "auto" === b ? Math.max(Math.abs(this.x - g.left), Math.abs(this.y - g.top)) : b,
                        this.scrollTo(g.left, g.top, b, e)
                }
            },
            _transitionTime: function(a) {
                if (a = a || 0,
                        this.scrollerStyle[f.style.transitionDuration] = a + "ms",
                    !a && f.isBadAndroid && (this.scrollerStyle[f.style.transitionDuration] = "0.001s"),
                        this.indicators)
                    for (var b = this.indicators.length; b--; )
                        this.indicators[b].transitionTime(a)
            },
            _transitionTimingFunction: function(a) {
                if (this.scrollerStyle[f.style.transitionTimingFunction] = a,
                        this.indicators)
                    for (var b = this.indicators.length; b--; )
                        this.indicators[b].transitionTimingFunction(a)
            },
            _translate: function(a, b) {
                if (this.options.useTransform ? this.scrollerStyle[f.style.transform] = "translate(" + a + "px," + b + "px)" + this.translateZ : (a = Math.round(a),
                        b = Math.round(b),
                        this.scrollerStyle.left = a + "px",
                        this.scrollerStyle.top = b + "px"),
                        this.x = a,
                        this.y = b,
                        this.indicators)
                    for (var c = this.indicators.length; c--; )
                        this.indicators[c].updatePosition()
            },
            _initEvents: function(b) {
                var c = b ? f.removeEvent : f.addEvent
                    , d = this.options.bindToWrapper ? this.wrapper : a;
                c(a, "orientationchange", this),
                    c(a, "resize", this),
                this.options.click && c(this.wrapper, "click", this, !0),
                this.options.disableMouse || (c(this.wrapper, "mousedown", this),
                    c(d, "mousemove", this),
                    c(d, "mousecancel", this),
                    c(d, "mouseup", this)),
                f.hasPointer && !this.options.disablePointer && (c(this.wrapper, f.prefixPointerEvent("pointerdown"), this),
                    c(d, f.prefixPointerEvent("pointermove"), this),
                    c(d, f.prefixPointerEvent("pointercancel"), this),
                    c(d, f.prefixPointerEvent("pointerup"), this)),
                f.hasTouch && !this.options.disableTouch && (c(this.wrapper, "touchstart", this),
                    c(d, "touchmove", this),
                    c(d, "touchcancel", this),
                    c(d, "touchend", this)),
                    c(this.scroller, "transitionend", this),
                    c(this.scroller, "webkitTransitionEnd", this),
                    c(this.scroller, "oTransitionEnd", this),
                    c(this.scroller, "MSTransitionEnd", this)
            },
            getComputedPosition: function() {
                var b, c, d = a.getComputedStyle(this.scroller, null );
                return this.options.useTransform ? (d = d[f.style.transform].split(")")[0].split(", "),
                    b = +(d[12] || d[4]),
                    c = +(d[13] || d[5])) : (b = +d.left.replace(/[^-\d.]/g, ""),
                    c = +d.top.replace(/[^-\d.]/g, "")),
                {
                    x: b,
                    y: c
                }
            },
            _initIndicators: function() {
                function a(a) {
                    for (var b = h.indicators.length; b--; )
                        a.call(h.indicators[b])
                }
                var b, e = this.options.interactiveScrollbars, f = "string" != typeof this.options.scrollbars, g = [], h = this;
                this.indicators = [],
                this.options.scrollbars && (this.options.scrollY && (b = {
                    el: c("v", e, this.options.scrollbars),
                    interactive: e,
                    defaultScrollbars: !0,
                    customStyle: f,
                    resize: this.options.resizeScrollbars,
                    shrink: this.options.shrinkScrollbars,
                    fade: this.options.fadeScrollbars,
                    listenX: !1
                },
                    this.wrapper.appendChild(b.el),
                    g.push(b)),
                this.options.scrollX && (b = {
                    el: c("h", e, this.options.scrollbars),
                    interactive: e,
                    defaultScrollbars: !0,
                    customStyle: f,
                    resize: this.options.resizeScrollbars,
                    shrink: this.options.shrinkScrollbars,
                    fade: this.options.fadeScrollbars,
                    listenY: !1
                },
                    this.wrapper.appendChild(b.el),
                    g.push(b))),
                this.options.indicators && (g = g.concat(this.options.indicators));
                for (var i = g.length; i--; )
                    this.indicators.push(new d(this,g[i]));
                this.options.fadeScrollbars && (this.on("scrollEnd", function() {
                    a(function() {
                        this.fade()
                    })
                }),
                    this.on("scrollCancel", function() {
                        a(function() {
                            this.fade()
                        })
                    }),
                    this.on("scrollStart", function() {
                        a(function() {
                            this.fade(1)
                        })
                    }),
                    this.on("beforeScrollStart", function() {
                        a(function() {
                            this.fade(1, !0)
                        })
                    })),
                    this.on("refresh", function() {
                        a(function() {
                            this.refresh()
                        })
                    }),
                    this.on("destroy", function() {
                        a(function() {
                            this.destroy()
                        }),
                            delete this.indicators
                    })
            },
            _initWheel: function() {
                f.addEvent(this.wrapper, "wheel", this),
                    f.addEvent(this.wrapper, "mousewheel", this),
                    f.addEvent(this.wrapper, "DOMMouseScroll", this),
                    this.on("destroy", function() {
                        f.removeEvent(this.wrapper, "wheel", this),
                            f.removeEvent(this.wrapper, "mousewheel", this),
                            f.removeEvent(this.wrapper, "DOMMouseScroll", this)
                    })
            },
            _wheel: function(a) {
                if (this.enabled) {
                    a.preventDefault(),
                        a.stopPropagation();
                    var b, c, d, e, f = this;
                    if (void 0 === this.wheelTimeout && f._execEvent("scrollStart"),
                            clearTimeout(this.wheelTimeout),
                            this.wheelTimeout = setTimeout(function() {
                                f._execEvent("scrollEnd"),
                                    f.wheelTimeout = void 0
                            }, 400),
                        "deltaX" in a)
                        1 === a.deltaMode ? (b = -a.deltaX * this.options.mouseWheelSpeed,
                            c = -a.deltaY * this.options.mouseWheelSpeed) : (b = -a.deltaX,
                            c = -a.deltaY);
                    else if ("wheelDeltaX" in a)
                        b = a.wheelDeltaX / 120 * this.options.mouseWheelSpeed,
                            c = a.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
                    else if ("wheelDelta" in a)
                        b = c = a.wheelDelta / 120 * this.options.mouseWheelSpeed;
                    else {
                        if (!("detail" in a))
                            return;
                        b = c = -a.detail / 3 * this.options.mouseWheelSpeed
                    }
                    if (b *= this.options.invertWheelDirection,
                            c *= this.options.invertWheelDirection,
                        this.hasVerticalScroll || (b = c,
                            c = 0),
                            this.options.snap)
                        return d = this.currentPage.pageX,
                            e = this.currentPage.pageY,
                            b > 0 ? d-- : 0 > b && d++,
                            c > 0 ? e-- : 0 > c && e++,
                            void this.goToPage(d, e);
                    d = this.x + Math.round(this.hasHorizontalScroll ? b : 0),
                        e = this.y + Math.round(this.hasVerticalScroll ? c : 0),
                        d > 0 ? d = 0 : d < this.maxScrollX && (d = this.maxScrollX),
                        e > 0 ? e = 0 : e < this.maxScrollY && (e = this.maxScrollY),
                        this.scrollTo(d, e, 0),
                        this._execEvent("scroll")
                }
            },
            _initSnap: function() {
                this.currentPage = {},
                "string" == typeof this.options.snap && (this.options.snap = this.scroller.querySelectorAll(this.options.snap)),
                    this.on("refresh", function() {
                        var a, b, c, d, e, f, g = 0, h = 0, i = 0, j = this.options.snapStepX || this.wrapperWidth, k = this.options.snapStepY || this.wrapperHeight;
                        if (this.pages = [],
                            this.wrapperWidth && this.wrapperHeight && this.scrollerWidth && this.scrollerHeight) {
                            if (this.options.snap === !0)
                                for (c = Math.round(j / 2),
                                         d = Math.round(k / 2); i > -this.scrollerWidth; ) {
                                    for (this.pages[g] = [],
                                             a = 0,
                                             e = 0; e > -this.scrollerHeight; )
                                        this.pages[g][a] = {
                                            x: Math.max(i, this.maxScrollX),
                                            y: Math.max(e, this.maxScrollY),
                                            width: j,
                                            height: k,
                                            cx: i - c,
                                            cy: e - d
                                        },
                                            e -= k,
                                            a++;
                                    i -= j,
                                        g++
                                }
                            else
                                for (f = this.options.snap,
                                         a = f.length,
                                         b = -1; a > g; g++)
                                    (0 === g || f[g].offsetLeft <= f[g - 1].offsetLeft) && (h = 0,
                                        b++),
                                    this.pages[h] || (this.pages[h] = []),
                                        i = Math.max(-f[g].offsetLeft, this.maxScrollX),
                                        e = Math.max(-f[g].offsetTop, this.maxScrollY),
                                        c = i - Math.round(f[g].offsetWidth / 2),
                                        d = e - Math.round(f[g].offsetHeight / 2),
                                        this.pages[h][b] = {
                                            x: i,
                                            y: e,
                                            width: f[g].offsetWidth,
                                            height: f[g].offsetHeight,
                                            cx: c,
                                            cy: d
                                        },
                                    i > this.maxScrollX && h++;
                            this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0),
                                this.options.snapThreshold % 1 === 0 ? (this.snapThresholdX = this.options.snapThreshold,
                                    this.snapThresholdY = this.options.snapThreshold) : (this.snapThresholdX = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold),
                                    this.snapThresholdY = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold))
                        }
                    }),
                    this.on("flick", function() {
                        var a = this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(this.x - this.startX), 1e3), Math.min(Math.abs(this.y - this.startY), 1e3)), 300);
                        this.goToPage(this.currentPage.pageX + this.directionX, this.currentPage.pageY + this.directionY, a)
                    })
            },
            _nearestSnap: function(a, b) {
                if (!this.pages.length)
                    return {
                        x: 0,
                        y: 0,
                        pageX: 0,
                        pageY: 0
                    };
                var c = 0
                    , d = this.pages.length
                    , e = 0;
                if (Math.abs(a - this.absStartX) < this.snapThresholdX && Math.abs(b - this.absStartY) < this.snapThresholdY)
                    return this.currentPage;
                for (a > 0 ? a = 0 : a < this.maxScrollX && (a = this.maxScrollX),
                         b > 0 ? b = 0 : b < this.maxScrollY && (b = this.maxScrollY); d > c; c++)
                    if (a >= this.pages[c][0].cx) {
                        a = this.pages[c][0].x;
                        break
                    }
                for (d = this.pages[c].length; d > e; e++)
                    if (b >= this.pages[0][e].cy) {
                        b = this.pages[0][e].y;
                        break
                    }
                return c === this.currentPage.pageX && (c += this.directionX,
                    0 > c ? c = 0 : c >= this.pages.length && (c = this.pages.length - 1),
                    a = this.pages[c][0].x),
                e === this.currentPage.pageY && (e += this.directionY,
                    0 > e ? e = 0 : e >= this.pages[0].length && (e = this.pages[0].length - 1),
                    b = this.pages[0][e].y),
                {
                    x: a,
                    y: b,
                    pageX: c,
                    pageY: e
                }
            },
            goToPage: function(a, b, c, d) {
                d = d || this.options.bounceEasing,
                    a >= this.pages.length ? a = this.pages.length - 1 : 0 > a && (a = 0),
                    b >= this.pages[a].length ? b = this.pages[a].length - 1 : 0 > b && (b = 0);
                var e = this.pages[a][b].x
                    , f = this.pages[a][b].y;
                c = void 0 === c ? this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(e - this.x), 1e3), Math.min(Math.abs(f - this.y), 1e3)), 300) : c,
                    this.currentPage = {
                        x: e,
                        y: f,
                        pageX: a,
                        pageY: b
                    },
                    this.scrollTo(e, f, c, d)
            },
            next: function(a, b) {
                var c = this.currentPage.pageX
                    , d = this.currentPage.pageY;
                c++,
                c >= this.pages.length && this.hasVerticalScroll && (c = 0,
                    d++),
                    this.goToPage(c, d, a, b)
            },
            prev: function(a, b) {
                var c = this.currentPage.pageX
                    , d = this.currentPage.pageY;
                c--,
                0 > c && this.hasVerticalScroll && (c = 0,
                    d--),
                    this.goToPage(c, d, a, b)
            },
            _initKeys: function() {
                var b, c = {
                    pageUp: 33,
                    pageDown: 34,
                    end: 35,
                    home: 36,
                    left: 37,
                    up: 38,
                    right: 39,
                    down: 40
                };
                if ("object" == typeof this.options.keyBindings)
                    for (b in this.options.keyBindings)
                        "string" == typeof this.options.keyBindings[b] && (this.options.keyBindings[b] = this.options.keyBindings[b].toUpperCase().charCodeAt(0));
                else
                    this.options.keyBindings = {};
                for (b in c)
                    this.options.keyBindings[b] = this.options.keyBindings[b] || c[b];
                f.addEvent(a, "keydown", this),
                    this.on("destroy", function() {
                        f.removeEvent(a, "keydown", this)
                    })
            },
            _key: function(a) {
                if (this.enabled) {
                    var b, c = this.options.snap, d = c ? this.currentPage.pageX : this.x, e = c ? this.currentPage.pageY : this.y, g = f.getTime(), h = this.keyTime || 0, i = .25;
                    switch (this.options.useTransition && this.isInTransition && (b = this.getComputedPosition(),
                        this._translate(Math.round(b.x), Math.round(b.y)),
                        this.isInTransition = !1),
                        this.keyAcceleration = 200 > g - h ? Math.min(this.keyAcceleration + i, 50) : 0,
                        a.keyCode) {
                        case this.options.keyBindings.pageUp:
                            this.hasHorizontalScroll && !this.hasVerticalScroll ? d += c ? 1 : this.wrapperWidth : e += c ? 1 : this.wrapperHeight;
                            break;
                        case this.options.keyBindings.pageDown:
                            this.hasHorizontalScroll && !this.hasVerticalScroll ? d -= c ? 1 : this.wrapperWidth : e -= c ? 1 : this.wrapperHeight;
                            break;
                        case this.options.keyBindings.end:
                            d = c ? this.pages.length - 1 : this.maxScrollX,
                                e = c ? this.pages[0].length - 1 : this.maxScrollY;
                            break;
                        case this.options.keyBindings.home:
                            d = 0,
                                e = 0;
                            break;
                        case this.options.keyBindings.left:
                            d += c ? -1 : 5 + this.keyAcceleration >> 0;
                            break;
                        case this.options.keyBindings.up:
                            e += c ? 1 : 5 + this.keyAcceleration >> 0;
                            break;
                        case this.options.keyBindings.right:
                            d -= c ? -1 : 5 + this.keyAcceleration >> 0;
                            break;
                        case this.options.keyBindings.down:
                            e -= c ? 1 : 5 + this.keyAcceleration >> 0;
                            break;
                        default:
                            return
                    }
                    if (c)
                        return void this.goToPage(d, e);
                    d > 0 ? (d = 0,
                        this.keyAcceleration = 0) : d < this.maxScrollX && (d = this.maxScrollX,
                        this.keyAcceleration = 0),
                        e > 0 ? (e = 0,
                            this.keyAcceleration = 0) : e < this.maxScrollY && (e = this.maxScrollY,
                            this.keyAcceleration = 0),
                        this.scrollTo(d, e, 0),
                        this.keyTime = g
                }
            },
            _animate: function(a, b, c, d) {
                function g() {
                    var m, n, o, p = f.getTime();
                    return p >= l ? (h.isAnimating = !1,
                        h._translate(a, b),
                        void (h.resetPosition(h.options.bounceTime) || h._execEvent("scrollEnd"))) : (p = (p - k) / c,
                        o = d(p),
                        m = (a - i) * o + i,
                        n = (b - j) * o + j,
                        h._translate(m, n),
                    h.isAnimating && e(g),
                        void (3 === h.options.probeType && h._execEvent("scroll")))
                }
                var h = this
                    , i = this.x
                    , j = this.y
                    , k = f.getTime()
                    , l = k + c;
                this.isAnimating = !0,
                    g()
            },
            handleEvent: function(a) {
                switch (a.type) {
                    case "touchstart":
                    case "pointerdown":
                    case "MSPointerDown":
                    case "mousedown":
                        this._start(a);
                        break;
                    case "touchmove":
                    case "pointermove":
                    case "MSPointerMove":
                    case "mousemove":
                        this._move(a);
                        break;
                    case "touchend":
                    case "pointerup":
                    case "MSPointerUp":
                    case "mouseup":
                    case "touchcancel":
                    case "pointercancel":
                    case "MSPointerCancel":
                    case "mousecancel":
                        this._end(a);
                        break;
                    case "orientationchange":
                    case "resize":
                        this._resize();
                        break;
                    case "transitionend":
                    case "webkitTransitionEnd":
                    case "oTransitionEnd":
                    case "MSTransitionEnd":
                        this._transitionEnd(a);
                        break;
                    case "wheel":
                    case "DOMMouseScroll":
                    case "mousewheel":
                        this._wheel(a);
                        break;
                    case "keydown":
                        this._key(a);
                        break;
                    case "click":
                        a._constructed || (a.preventDefault(),
                            a.stopPropagation())
                }
            }
        },
            d.prototype = {
                handleEvent: function(a) {
                    switch (a.type) {
                        case "touchstart":
                        case "pointerdown":
                        case "MSPointerDown":
                        case "mousedown":
                            this._start(a);
                            break;
                        case "touchmove":
                        case "pointermove":
                        case "MSPointerMove":
                        case "mousemove":
                            this._move(a);
                            break;
                        case "touchend":
                        case "pointerup":
                        case "MSPointerUp":
                        case "mouseup":
                        case "touchcancel":
                        case "pointercancel":
                        case "MSPointerCancel":
                        case "mousecancel":
                            this._end(a)
                    }
                },
                destroy: function() {
                    this.options.interactive && (f.removeEvent(this.indicator, "touchstart", this),
                        f.removeEvent(this.indicator, f.prefixPointerEvent("pointerdown"), this),
                        f.removeEvent(this.indicator, "mousedown", this),
                        f.removeEvent(a, "touchmove", this),
                        f.removeEvent(a, f.prefixPointerEvent("pointermove"), this),
                        f.removeEvent(a, "mousemove", this),
                        f.removeEvent(a, "touchend", this),
                        f.removeEvent(a, f.prefixPointerEvent("pointerup"), this),
                        f.removeEvent(a, "mouseup", this)),
                    this.options.defaultScrollbars && this.wrapper.parentNode.removeChild(this.wrapper)
                },
                _start: function(b) {
                    var c = b.touches ? b.touches[0] : b;
                    b.preventDefault(),
                        b.stopPropagation(),
                        this.transitionTime(),
                        this.initiated = !0,
                        this.moved = !1,
                        this.lastPointX = c.pageX,
                        this.lastPointY = c.pageY,
                        this.startTime = f.getTime(),
                    this.options.disableTouch || f.addEvent(a, "touchmove", this),
                    this.options.disablePointer || f.addEvent(a, f.prefixPointerEvent("pointermove"), this),
                    this.options.disableMouse || f.addEvent(a, "mousemove", this),
                        this.scroller._execEvent("beforeScrollStart")
                },
                _move: function(a) {
                    var b, c, d, e, g = a.touches ? a.touches[0] : a, h = f.getTime();
                    this.moved || this.scroller._execEvent("scrollStart"),
                        this.moved = !0,
                        b = g.pageX - this.lastPointX,
                        this.lastPointX = g.pageX,
                        c = g.pageY - this.lastPointY,
                        this.lastPointY = g.pageY,
                        d = this.x + b,
                        e = this.y + c,
                        this._pos(d, e),
                        1 === this.scroller.options.probeType && h - this.startTime > 300 ? (this.startTime = h,
                            this.scroller._execEvent("scroll")) : this.scroller.options.probeType > 1 && this.scroller._execEvent("scroll"),
                        a.preventDefault(),
                        a.stopPropagation()
                },
                _end: function(b) {
                    if (this.initiated) {
                        if (this.initiated = !1,
                                b.preventDefault(),
                                b.stopPropagation(),
                                f.removeEvent(a, "touchmove", this),
                                f.removeEvent(a, f.prefixPointerEvent("pointermove"), this),
                                f.removeEvent(a, "mousemove", this),
                                this.scroller.options.snap) {
                            var c = this.scroller._nearestSnap(this.scroller.x, this.scroller.y)
                                , d = this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(this.scroller.x - c.x), 1e3), Math.min(Math.abs(this.scroller.y - c.y), 1e3)), 300);
                            (this.scroller.x !== c.x || this.scroller.y !== c.y) && (this.scroller.directionX = 0,
                                this.scroller.directionY = 0,
                                this.scroller.currentPage = c,
                                this.scroller.scrollTo(c.x, c.y, d, this.scroller.options.bounceEasing))
                        }
                        this.moved && this.scroller._execEvent("scrollEnd")
                    }
                },
                transitionTime: function(a) {
                    a = a || 0,
                        this.indicatorStyle[f.style.transitionDuration] = a + "ms",
                    !a && f.isBadAndroid && (this.indicatorStyle[f.style.transitionDuration] = "0.001s")
                },
                transitionTimingFunction: function(a) {
                    this.indicatorStyle[f.style.transitionTimingFunction] = a
                },
                refresh: function() {
                    this.transitionTime(),
                        this.options.listenX && !this.options.listenY ? this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? "block" : "none" : this.options.listenY && !this.options.listenX ? this.indicatorStyle.display = this.scroller.hasVerticalScroll ? "block" : "none" : this.indicatorStyle.display = this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? "block" : "none",
                        this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll ? (f.addClass(this.wrapper, "iScrollBothScrollbars"),
                            f.removeClass(this.wrapper, "iScrollLoneScrollbar"),
                        this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "8px" : this.wrapper.style.bottom = "8px")) : (f.removeClass(this.wrapper, "iScrollBothScrollbars"),
                            f.addClass(this.wrapper, "iScrollLoneScrollbar"),
                        this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "2px" : this.wrapper.style.bottom = "2px")),
                    this.options.listenX && (this.wrapperWidth = this.wrapper.clientWidth,
                        this.options.resize ? (this.indicatorWidth = Math.max(Math.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8),
                            this.indicatorStyle.width = this.indicatorWidth + "px") : this.indicatorWidth = this.indicator.clientWidth,
                        this.maxPosX = this.wrapperWidth - this.indicatorWidth,
                        "clip" === this.options.shrink ? (this.minBoundaryX = -this.indicatorWidth + 8,
                            this.maxBoundaryX = this.wrapperWidth - 8) : (this.minBoundaryX = 0,
                            this.maxBoundaryX = this.maxPosX),
                        this.sizeRatioX = this.options.speedRatioX || this.scroller.maxScrollX && this.maxPosX / this.scroller.maxScrollX),
                    this.options.listenY && (this.wrapperHeight = this.wrapper.clientHeight,
                        this.options.resize ? (this.indicatorHeight = Math.max(Math.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8),
                            this.indicatorStyle.height = this.indicatorHeight + "px") : this.indicatorHeight = this.indicator.clientHeight,
                        this.maxPosY = this.wrapperHeight - this.indicatorHeight,
                        "clip" === this.options.shrink ? (this.minBoundaryY = -this.indicatorHeight + 8,
                            this.maxBoundaryY = this.wrapperHeight - 8) : (this.minBoundaryY = 0,
                            this.maxBoundaryY = this.maxPosY),
                        this.maxPosY = this.wrapperHeight - this.indicatorHeight,
                        this.sizeRatioY = this.options.speedRatioY || this.scroller.maxScrollY && this.maxPosY / this.scroller.maxScrollY),
                        this.updatePosition()
                },
                updatePosition: function() {
                    var a = this.options.listenX && Math.round(this.sizeRatioX * this.scroller.x) || 0
                        , b = this.options.listenY && Math.round(this.sizeRatioY * this.scroller.y) || 0;
                    this.options.ignoreBoundaries || (a < this.minBoundaryX ? ("scale" === this.options.shrink && (this.width = Math.max(this.indicatorWidth + a, 8),
                        this.indicatorStyle.width = this.width + "px"),
                        a = this.minBoundaryX) : a > this.maxBoundaryX ? "scale" === this.options.shrink ? (this.width = Math.max(this.indicatorWidth - (a - this.maxPosX), 8),
                        this.indicatorStyle.width = this.width + "px",
                        a = this.maxPosX + this.indicatorWidth - this.width) : a = this.maxBoundaryX : "scale" === this.options.shrink && this.width !== this.indicatorWidth && (this.width = this.indicatorWidth,
                        this.indicatorStyle.width = this.width + "px"),
                        b < this.minBoundaryY ? ("scale" === this.options.shrink && (this.height = Math.max(this.indicatorHeight + 3 * b, 8),
                            this.indicatorStyle.height = this.height + "px"),
                            b = this.minBoundaryY) : b > this.maxBoundaryY ? "scale" === this.options.shrink ? (this.height = Math.max(this.indicatorHeight - 3 * (b - this.maxPosY), 8),
                            this.indicatorStyle.height = this.height + "px",
                            b = this.maxPosY + this.indicatorHeight - this.height) : b = this.maxBoundaryY : "scale" === this.options.shrink && this.height !== this.indicatorHeight && (this.height = this.indicatorHeight,
                            this.indicatorStyle.height = this.height + "px")),
                        this.x = a,
                        this.y = b,
                        this.scroller.options.useTransform ? this.indicatorStyle[f.style.transform] = "translate(" + a + "px," + b + "px)" + this.scroller.translateZ : (this.indicatorStyle.left = a + "px",
                            this.indicatorStyle.top = b + "px")
                },
                _pos: function(a, b) {
                    0 > a ? a = 0 : a > this.maxPosX && (a = this.maxPosX),
                        0 > b ? b = 0 : b > this.maxPosY && (b = this.maxPosY),
                        a = this.options.listenX ? Math.round(a / this.sizeRatioX) : this.scroller.x,
                        b = this.options.listenY ? Math.round(b / this.sizeRatioY) : this.scroller.y,
                        this.scroller.scrollTo(a, b)
                },
                fade: function(a, b) {
                    if (!b || this.visible) {
                        clearTimeout(this.fadeTimeout),
                            this.fadeTimeout = null ;
                        var c = a ? 250 : 500
                            , d = a ? 0 : 300;
                        a = a ? "1" : "0",
                            this.wrapperStyle[f.style.transitionDuration] = c + "ms",
                            this.fadeTimeout = setTimeout(function(a) {
                                this.wrapperStyle.opacity = a,
                                    this.visible = +a
                            }
                                .bind(this, a), d)
                    }
                }
            },
            b.utils = f,
            a.IScroll = b
    }(window),
    +function(a) {
        "use strict";
        function b(b) {
            var c = Array.apply(null , arguments);
            c.shift();
            var e;
            return this.each(function() {
                var f = a(this)
                    , g = a.extend({}, f.dataset(), "object" == typeof b && b)
                    , h = f.data("scroller");
                return h || f.data("scroller", h = new d(this,g)),
                    "string" == typeof b && "function" == typeof h[b] && (e = h[b].apply(h, c),
                    void 0 !== e) ? !1 : void 0
            }),
                void 0 !== e ? e : this
        }
        var c = {
            scrollTop: a.fn.scrollTop,
            scrollLeft: a.fn.scrollLeft
        };
        !function() {
            a.extend(a.fn, {
                scrollTop: function(a, b) {
                    if (this.length) {
                        var d = this.data("scroller");
                        return d && d.scroller ? d.scrollTop(a, b) : c.scrollTop.apply(this, arguments)
                    }
                }
            }),
                a.extend(a.fn, {
                    scrollLeft: function(a, b) {
                        if (this.length) {
                            var d = this.data("scroller");
                            return d && d.scroller ? d.scrollLeft(a, b) : c.scrollLeft.apply(this, arguments)
                        }
                    }
                })
        }();
        var d = function(b, c) {
                var d = this.$pageContent = a(b);
                this.options = a.extend({}, this._defaults, c);
                var e = this.options.type
                    , f = "js" === e || "auto" === e && a.device.android && a.compareVersion("4.4.0", a.device.osVersion) > -1 || a.device.ios && a.compareVersion("6.0.0", a.device.osVersion) > -1;
                if (f) {
                    var g = d.find(".content-inner");
                    if (!g[0]) {
                        var h = d.children();
                        h.length < 1 ? d.children().wrapAll('<div class="content-inner"></div>') : d.html('<div class="content-inner">' + d.html() + "</div>")
                    }
                    d.hasClass("pull-to-refresh-content") && d.find(".content-inner").css("min-height", a(window).height() + 20 + "px");
                    var i = a(b).hasClass("pull-to-refresh-content")
                        , j = {
                            probeType: 1,
                            mouseWheel: !0,
                            click: !0
                        };
                    i && (j.ptr = !0,
                        j.ptrOffset = 44),
                        this.scroller = new IScroll(b,j),
                        this._bindEventToDomWhenJs(),
                        a.initPullToRefresh = a._pullToRefreshJSScroll.initPullToRefresh,
                        a.pullToRefreshDone = a._pullToRefreshJSScroll.pullToRefreshDone,
                        a.pullToRefreshTrigger = a._pullToRefreshJSScroll.pullToRefreshTrigger,
                        a.destroyToRefresh = a._pullToRefreshJSScroll.destroyToRefresh,
                        d.addClass("javascript-scroll");
                    var k = this.$pageContent[0].scrollTop;
                    k && (this.$pageContent[0].scrollTop = 0,
                        this.scrollTop(k))
                } else
                    d.addClass("native-scroll")
            }
            ;
        d.prototype = {
            _defaults: {
                type: "native"
            },
            _bindEventToDomWhenJs: function() {
                if (this.scroller) {
                    var a = this;
                    this.scroller.on("scrollStart", function() {
                        a.$pageContent.trigger("scrollstart")
                    }),
                        this.scroller.on("scroll", function() {
                            a.$pageContent.trigger("scroll")
                        }),
                        this.scroller.on("scrollEnd", function() {
                            a.$pageContent.trigger("scrollend")
                        })
                }
            },
            scrollTop: function(a, b) {
                return this.scroller ? void 0 === a ? -1 * this.scroller.getComputedPosition().y : (this.scroller.scrollTo(0, -1 * a, b),
                    this) : this.$pageContent.scrollTop(a, b)
            },
            scrollLeft: function(a, b) {
                return this.scroller ? void 0 === a ? -1 * this.scroller.getComputedPosition().x : (this.scroller.scrollTo(-1 * a, 0),
                    this) : this.$pageContent.scrollTop(a, b)
            },
            on: function(a, b) {
                return this.scroller ? this.scroller.on(a, function() {
                    b.call(this.wrapper)
                }) : this.$pageContent.on(a, b),
                    this
            },
            off: function(a, b) {
                return this.scroller ? this.scroller.off(a, b) : this.$pageContent.off(a, b),
                    this
            },
            refresh: function() {
                return this.scroller && this.scroller.refresh(),
                    this
            },
            scrollHeight: function() {
                return this.scroller ? this.scroller.scrollerHeight : this.$pageContent[0].scrollHeight
            }
        };
        var e = a.fn.scroller;
        a.fn.scroller = b,
            a.fn.scroller.Constructor = d,
            a.fn.scroller.noConflict = function() {
                return a.fn.scroller = e,
                    this
            }
            ,
            a(function() {
                a('[data-toggle="scroller"]').scroller()
            }),
            a.refreshScroller = function(b) {
                b ? a(b).scroller("refresh") : a(".javascript-scroll").each(function() {
                    a(this).scroller("refresh")
                })
            }
            ,
            a.initScroller = function(b) {
                this.options = a.extend({}, "object" == typeof b && b),
                    a('[data-toggle="scroller"],.content').scroller(b)
            }
            ,
            a.getScroller = function(b) {
                return b ? a(b).data("scroller") : a(".content.javascript-scroll").data("scroller")
            }
            ,
            a.detectScrollerType = function(b) {
                return b ? a(b).data("scroller") && a(b).data("scroller").scroller ? "js" : "native" : void 0
            }
    }(Zepto),
    +function(a) {
        "use strict";
        var b = 0
            , c = function(c) {
                function d() {
                    j.hasClass("refreshing") || (-1 * i.scrollTop() >= 44 ? j.removeClass("pull-down").addClass("pull-up") : j.removeClass("pull-up").addClass("pull-down"))
                }
                function e() {
                    j.hasClass("refreshing") || (j.removeClass("pull-down pull-up"),
                        j.addClass("refreshing transitioning"),
                        j.trigger("refresh", {
                            done: function() {
                                a.pullToRefreshDone(j)
                            }
                        }),
                        b = +new Date)
                }
                function f() {
                    i.off("scroll", d),
                        i.scroller.off("ptr", e)
                }
                var g = a(c);
                if (g.hasClass("pull-to-refresh-content") || (g = g.find(".pull-to-refresh-content")),
                    g && 0 !== g.length) {
                    var h = g.hasClass("content") ? g : g.parents(".content")
                        , i = a.getScroller(h[0]);
                    if (i) {
                        var j = g;
                        i.on("scroll", d),
                            i.scroller.on("ptr", e),
                            g[0].destroyPullToRefresh = f
                    }
                }
            }
            , d = function(c) {
                if (c = a(c),
                    0 === c.length && (c = a(".pull-to-refresh-content.refreshing")),
                    0 !== c.length) {
                    var d = +new Date - b
                        , e = d > 1e3 ? 0 : 1e3 - d
                        , f = a.getScroller(c);
                    setTimeout(function() {
                        f.refresh(),
                            c.removeClass("refreshing"),
                            c.transitionEnd(function() {
                                c.removeClass("transitioning")
                            })
                    }, e)
                }
            }
            , e = function(b) {
                if (b = a(b),
                    0 === b.length && (b = a(".pull-to-refresh-content")),
                        !b.hasClass("refreshing")) {
                    b.addClass("refreshing");
                    var c = a.getScroller(b);
                    c.scrollTop(45, 200),
                        b.trigger("refresh", {
                            done: function() {
                                a.pullToRefreshDone(b)
                            }
                        })
                }
            }
            , f = function(b) {
                b = a(b);
                var c = b.hasClass("pull-to-refresh-content") ? b : b.find(".pull-to-refresh-content");
                0 !== c.length && c[0].destroyPullToRefresh && c[0].destroyPullToRefresh()
            }
            ;
        a._pullToRefreshJSScroll = {
            initPullToRefresh: c,
            pullToRefreshDone: d,
            pullToRefreshTrigger: e,
            destroyPullToRefresh: f
        }
    }(Zepto),
    +function(a) {
        "use strict";
        a.initPullToRefresh = function(b) {
            function c(b) {
                if (h) {
                    if (!a.device.android)
                        return;
                    if ("targetTouches" in b && b.targetTouches.length > 1)
                        return
                }
                i = !1,
                    h = !0,
                    j = void 0,
                    p = void 0,
                    s.x = "touchstart" === b.type ? b.targetTouches[0].pageX : b.pageX,
                    s.y = "touchstart" === b.type ? b.targetTouches[0].pageY : b.pageY,
                    l = (new Date).getTime(),
                    m = a(this)
            }
            function d(b) {
                if (h) {
                    var c = "touchmove" === b.type ? b.targetTouches[0].pageX : b.pageX
                        , d = "touchmove" === b.type ? b.targetTouches[0].pageY : b.pageY;
                    if ("undefined" == typeof j && (j = !!(j || Math.abs(d - s.y) > Math.abs(c - s.x))),
                            !j)
                        return void (h = !1);
                    if (o = m[0].scrollTop,
                        "undefined" == typeof p && 0 !== o && (p = !0),
                            !i) {
                        if (m.removeClass("transitioning"),
                            o > m[0].offsetHeight)
                            return void (h = !1);
                        r && (q = m.attr("data-ptr-distance"),
                        q.indexOf("%") >= 0 && (q = m[0].offsetHeight * parseInt(q, 10) / 100)),
                            v = m.hasClass("refreshing") ? q : 0,
                            u = m[0].scrollHeight !== m[0].offsetHeight && a.device.ios ? !1 : !0,
                            u = !0
                    }
                    return i = !0,
                        k = d - s.y,
                        k > 0 && 0 >= o || 0 > o ? (a.device.ios && parseInt(a.device.osVersion.split(".")[0], 10) > 7 && 0 === o && !p && (u = !0),
                        u && (b.preventDefault(),
                            n = Math.pow(k, .85) + v,
                            m.transform("translate3d(0," + n + "px,0)")),
                            u && Math.pow(k, .85) > q || !u && k >= 2 * q ? (t = !0,
                                m.addClass("pull-up").removeClass("pull-down")) : (t = !1,
                                m.removeClass("pull-up").addClass("pull-down")),
                            void 0) : (m.removeClass("pull-up pull-down"),
                            void (t = !1))
                }
            }
            function e() {
                return h && i ? (n && (m.addClass("transitioning"),
                    n = 0),
                    m.transform(""),
                    t ? (m.addClass("refreshing"),
                        m.trigger("refresh", {
                            done: function() {
                                a.pullToRefreshDone(m)
                            }
                        })) : m.removeClass("pull-down"),
                    h = !1,
                    void (i = !1)) : (h = !1,
                    void (i = !1))
            }
            function f() {
                g.off(a.touchEvents.start, c),
                    g.off(a.touchEvents.move, d),
                    g.off(a.touchEvents.end, e)
            }
            var g = a(b);
            if (g.hasClass("pull-to-refresh-content") || (g = g.find(".pull-to-refresh-content")),
                g && 0 !== g.length) {
                var h, i, j, k, l, m, n, o, p, q, r, s = {}, t = !1, u = !1, v = 0;
                m = g,
                    m.attr("data-ptr-distance") ? r = !0 : q = 44,
                    g.on(a.touchEvents.start, c),
                    g.on(a.touchEvents.move, d),
                    g.on(a.touchEvents.end, e),
                    g[0].destroyPullToRefresh = f
            }
        }
            ,
            a.pullToRefreshDone = function(b) {
                a(window).scrollTop(0),
                    b = a(b),
                0 === b.length && (b = a(".pull-to-refresh-content.refreshing")),
                    b.removeClass("refreshing").addClass("transitioning"),
                    b.transitionEnd(function() {
                        b.removeClass("transitioning pull-up pull-down")
                    })
            }
            ,
            a.pullToRefreshTrigger = function(b) {
                b = a(b),
                0 === b.length && (b = a(".pull-to-refresh-content")),
                b.hasClass("refreshing") || (b.addClass("transitioning refreshing"),
                    b.trigger("refresh", {
                        done: function() {
                            a.pullToRefreshDone(b)
                        }
                    }))
            }
            ,
            a.destroyPullToRefresh = function(b) {
                b = a(b);
                var c = b.hasClass("pull-to-refresh-content") ? b : b.find(".pull-to-refresh-content");
                0 !== c.length && c[0].destroyPullToRefresh && c[0].destroyPullToRefresh()
            }
    }(Zepto),
    +function(a) {
        "use strict";
        function b() {
            var b, c = a(this), d = a.getScroller(c), e = d.scrollTop(), f = d.scrollHeight(), g = c[0].offsetHeight, h = c[0].getAttribute("data-distance"), i = c.find(".virtual-list"), j = c.hasClass("infinite-scroll-top");
            if (h || (h = 50),
                "string" == typeof h && h.indexOf("%") >= 0 && (h = parseInt(h, 10) / 100 * g),
                h > g && (h = g),
                    j)
                h > e && c.trigger("infinite");
            else if (e + g >= f - h) {
                if (i.length > 0 && (b = i[0].f7VirtualList,
                    b && !b.reachEnd))
                    return;
                c.trigger("infinite")
            }
        }
        a.attachInfiniteScroll = function(c) {
            a.getScroller(c).on("scroll", b)
        }
            ,
            a.detachInfiniteScroll = function(c) {
                a.getScroller(c).off("scroll", b)
            }
            ,
            a.initInfiniteScroll = function(b) {
                function c() {
                    a.detachInfiniteScroll(d),
                        b.off("pageBeforeRemove", c)
                }
                b = a(b);
                var d = b.hasClass("infinite-scroll") ? b : b.find(".infinite-scroll");
                0 !== d.length && (a.attachInfiniteScroll(d),
                    b.forEach(function(b) {
                        if (a(b).hasClass("infinite-scroll-top")) {
                            var c = b.scrollHeight - b.clientHeight;
                            a(b).scrollTop(c)
                        }
                    }),
                    b.on("pageBeforeRemove", c))
            }
    }(Zepto),
    +function(a) {
        "use strict";
        a(function() {
            a(document).on("focus", ".searchbar input", function(b) {
                var c = a(b.target);
                c.parents(".searchbar").addClass("searchbar-active")
            }),
                a(document).on("click", ".searchbar-cancel", function(b) {
                    var c = a(b.target);
                    c.parents(".searchbar").removeClass("searchbar-active")
                }),
                a(document).on("blur", ".searchbar input", function(b) {
                    var c = a(b.target);
                    c.parents(".searchbar").removeClass("searchbar-active")
                })
        })
    }(Zepto),
    +function(a) {
        "use strict";
        a.allowPanelOpen = !0,
            a.openPanel = function(b) {
                function c() {
                    f.transitionEnd(function(d) {
                        d.target === f[0] ? (b.hasClass("active") ? b.trigger("opened") : b.trigger("closed"),
                            a.allowPanelOpen = !0) : c()
                    })
                }
                if (!a.allowPanelOpen)
                    return !1;
                ("left" === b || "right" === b) && (b = ".panel-" + b),
                    b = b ? a(b) : a(".panel").eq(0);
                var d = b.hasClass("panel-right") ? "right" : "left";
                if (0 === b.length || b.hasClass("active"))
                    return !1;
                a.closePanel(),
                    a.allowPanelOpen = !1;
                var e = b.hasClass("panel-reveal") ? "reveal" : "cover";
                b.css({
                    display: "block"
                }).addClass("active"),
                    b.trigger("open");
                var f = (b[0].clientLeft,
                    "reveal" === e ? a(a.getCurrentPage()) : b);
                return c(),
                    a(document.body).addClass("with-panel-" + d + "-" + e),
                    !0
            }
            ,
            a.closePanel = function() {
                var b = a(".panel.active");
                if (0 === b.length)
                    return !1;
                var c = b.hasClass("panel-reveal") ? "reveal" : "cover"
                    , d = b.hasClass("panel-left") ? "left" : "right";
                b.removeClass("active");
                var e = "reveal" === c ? a(".page") : b;
                b.trigger("close"),
                    a.allowPanelOpen = !1,
                    e.transitionEnd(function() {
                        b.hasClass("active") || (b.css({
                            display: ""
                        }),
                            b.trigger("closed"),
                            a("body").removeClass("panel-closing"),
                            a.allowPanelOpen = !0)
                    }),
                    a("body").addClass("panel-closing").removeClass("with-panel-" + d + "-" + c)
            }
            ,
            a(document).on("click", ".open-panel", function(b) {
                var c = a(b.target).data("panel");
                a.openPanel(c)
            }),
            a(document).on("click", ".close-panel, .panel-overlay", function(b) {
                a.closePanel()
            }),
            a.initSwipePanels = function() {
                function b(b) {
                    if (a.allowPanelOpen && (g || h) && !m && !(a(".modal-in, .photo-browser-in").length > 0) && (i || h || !(a(".panel.active").length > 0) || e.hasClass("active"))) {
                        if (x.x = "touchstart" === b.type ? b.targetTouches[0].pageX : b.pageX,
                                x.y = "touchstart" === b.type ? b.targetTouches[0].pageY : b.pageY,
                            i || h) {
                            if (a(".panel.active").length > 0)
                                f = a(".panel.active").hasClass("panel-left") ? "left" : "right";
                            else {
                                if (h)
                                    return;
                                f = g
                            }
                            if (!f)
                                return
                        }
                        if (e = a(".panel.panel-" + f),
                                e[0]) {
                            if (s = e.hasClass("active"),
                                j && !s) {
                                if ("left" === f && x.x > j)
                                    return;
                                if ("right" === f && x.x < window.innerWidth - j)
                                    return
                            }
                            n = !1,
                                m = !0,
                                o = void 0,
                                p = (new Date).getTime(),
                                v = void 0
                        }
                    }
                }
                function c(b) {
                    if (m && e[0] && !b.f7PreventPanelSwipe) {
                        var c = "touchmove" === b.type ? b.targetTouches[0].pageX : b.pageX
                            , d = "touchmove" === b.type ? b.targetTouches[0].pageY : b.pageY;
                        if ("undefined" == typeof o && (o = !!(o || Math.abs(d - x.y) > Math.abs(c - x.x))),
                                o)
                            return void (m = !1);
                        if (!v && (v = c > x.x ? "to-right" : "to-left",
                            "left" === f && "to-left" === v && !e.hasClass("active") || "right" === f && "to-right" === v && !e.hasClass("active")))
                            return void (m = !1);
                        if (l) {
                            var g = (new Date).getTime() - p;
                            return 300 > g && ("to-left" === v && ("right" === f && a.openPanel(f),
                            "left" === f && e.hasClass("active") && a.closePanel()),
                            "to-right" === v && ("left" === f && a.openPanel(f),
                            "right" === f && e.hasClass("active") && a.closePanel())),
                                m = !1,
                                console.log(3),
                                void (n = !1)
                        }
                        n || (u = e.hasClass("panel-cover") ? "cover" : "reveal",
                        s || (e.show(),
                            w.show()),
                            t = e[0].offsetWidth,
                            e.transition(0)),
                            n = !0,
                            b.preventDefault();
                        var h = s ? 0 : -k;
                        "right" === f && (h = -h),
                            q = c - x.x + h,
                            "right" === f ? (r = q - (s ? t : 0),
                            r > 0 && (r = 0),
                            -t > r && (r = -t)) : (r = q + (s ? t : 0),
                            0 > r && (r = 0),
                            r > t && (r = t)),
                            "reveal" === u ? (y.transform("translate3d(" + r + "px,0,0)").transition(0),
                                w.transform("translate3d(" + r + "px,0,0)")) : e.transform("translate3d(" + r + "px,0,0)").transition(0);
                    }
                }
                function d(b) {
                    if (!m || !n)
                        return m = !1,
                            void (n = !1);
                    m = !1,
                        n = !1;
                    var c, d = (new Date).getTime() - p, g = 0 === r || Math.abs(r) === t;
                    if (c = s ? r === -t ? "reset" : 300 > d && Math.abs(r) >= 0 || d >= 300 && Math.abs(r) <= t / 2 ? "left" === f && r === t ? "reset" : "swap" : "reset" : 0 === r ? "reset" : 300 > d && Math.abs(r) > 0 || d >= 300 && Math.abs(r) >= t / 2 ? "swap" : "reset",
                        "swap" === c && (a.allowPanelOpen = !0,
                            s ? (a.closePanel(),
                            g && (e.css({
                                display: ""
                            }),
                                a("body").removeClass("panel-closing"))) : a.openPanel(f),
                        g && (a.allowPanelOpen = !0)),
                        "reset" === c)
                        if (s)
                            a.allowPanelOpen = !0,
                                a.openPanel(f);
                        else if (a.closePanel(),
                                g)
                            a.allowPanelOpen = !0,
                                e.css({
                                    display: ""
                                });
                        else {
                            var h = "reveal" === u ? y : e;
                            a("body").addClass("panel-closing"),
                                h.transitionEnd(function() {
                                    a.allowPanelOpen = !0,
                                        e.css({
                                            display: ""
                                        }),
                                        a("body").removeClass("panel-closing")
                                })
                        }
                    "reveal" === u && (y.transition(""),
                        y.transform("")),
                        e.transition("").transform(""),
                        w.css({
                            display: ""
                        }).transform("")
                }
                var e, f, g = a.smConfig.swipePanel, h = a.smConfig.swipePanelOnlyClose, i = !0, j = !1, k = 2, l = !1;
                if (g || h) {
                    var m, n, o, p, q, r, s, t, u, v, w = a(".panel-overlay"), x = {}, y = a(".page");
                    a(document).on(a.touchEvents.start, b),
                        a(document).on(a.touchEvents.move, c),
                        a(document).on(a.touchEvents.end, d)
                }
            }
            ,
            a.initSwipePanels()
    }(Zepto),
    +function(a) {
        "use strict";
        window.CustomEvent || (window.CustomEvent = function(a, b) {
            b = b || {
                bubbles: !1,
                cancelable: !1,
                detail: void 0
            };
            var c = document.createEvent("CustomEvent");
            return c.initCustomEvent(a, b.bubbles, b.cancelable, b.detail),
                c
        }
            ,
            window.CustomEvent.prototype = window.Event.prototype);
        var b = function() {
                this.state = sessionStorage,
                    this.state.setItem("stateid", parseInt(this.state.getItem("stateid") || 1) + 1),
                    this.state.setItem("currentStateID", this.state.getItem("stateid")),
                    this.stack = sessionStorage,
                    this.stack.setItem("back", "[]"),
                    this.stack.setItem("forward", "[]"),
                    this.init(),
                    this.xhr = null ,
                    this.newLoaded = !0
            }
            ;
        b.prototype.defaults = {},
            b.prototype.init = function() {
                var b = this.getCurrentPage()
                    , c = a(".page").eq(0);
                b[0] || (b = c.addClass("page-current"));
                var d = location.hash;
                if (b[0] && !b[0].id && (b[0].id = d ? d.slice(1) : this.genRandomID()),
                        !b[0])
                    throw new Error("can't find .page element");
                var e = a(d);
                !e[0] || !e.hasClass("page") || b[0] && d.slice(1) === b[0].id || (b.removeClass("page-current"),
                    e.addClass("page-current"),
                    b = e);
                var f = this.genStateID()
                    , g = location.href
                    , h = g.split("#")[0];
                history.replaceState({
                    url: g,
                    id: f
                }, "", g),
                    this.setCurrentStateID(f),
                    this.pushBack({
                        url: h,
                        pageid: "#" + c[0].id,
                        id: f
                    }),
                    window.addEventListener("popstate", a.proxy(this.onpopstate, this))
            }
            ,
            b.prototype.loadPage = function(b) {
                this.newLoaded && (this.newLoaded = !1),
                    this.getPage(b, function (c) {
                        var d = this.getCurrentPage()[0].id;
                        this.pushBack({
                            url: b,
                            pageid: "#" + d,
                            id: this.getCurrentStateID()
                        });
                        //for (var e = JSON.parse(this.state.getItem("forward") || "[]"), f = 0; f < e.length; f++)
                        //    a(e[f].pageid).each(function() {
                        //        var b = a(this);
                        //        b.data("page-remote") && b.remove()
                        //    });

                        this.state.setItem("forward", "[]");
                        if (!c.parents("body").length) {
                            c.insertAfter(a(".page")[0]);
                        }
                        this.animatePages(this.getCurrentPage(), c);
                        var g = this.genStateID();
                        this.setCurrentStateID(g),
                            this.pushState(b, g),
                            this.forwardStack = []
                    })
            }
            ,
            b.prototype.animatePages = function(a, b, c) {
                var d = "page-current"
                    , e = ["page-from-center-to-left", "page-from-center-to-right", "page-from-right-to-center", "page-from-left-to-center"].join(" ");
                c ? (a.trigger("pageAnimationStart", [b[0].id, b]),
                    a.removeClass(e).addClass(d).addClass("page-from-left-to-center"),
                    b.removeClass(e).removeClass(d).addClass("page-from-center-to-right"),
                    a.animationEnd(function() {
                        a.removeClass(e),
                            a.trigger("pageAnimationEnd", [a[0].id, a]),
                            a.trigger("pageReinit", [a[0].id, a])
                    }),
                    b.animationEnd(function() {
                        b.removeClass(e)
                    })) : (b.trigger("pageAnimationStart", [b[0].id, b]),
                    a.removeClass(e).removeClass(d).addClass("page-from-center-to-left"),
                    b.removeClass(e).addClass(d).addClass("page-from-right-to-center"),
                    a.animationEnd(function() {
                        a.removeClass(e)
                    }),
                    b.animationEnd(function() {
                        b.removeClass(e),
                            b.trigger("pageAnimationEnd", [b[0].id, b]),
                            b.trigger("pageInitInternal", [b[0].id, b])
                    }))
            }
            ,
            b.prototype.getCurrentPage = function() {
                return a(".page-current")
            }
            ,
            b.prototype.forward = function(a) {
                var b = JSON.parse(this.stack.getItem("forward"));
                b.length ? history.forward() : location.href = a
            }
            ,
            b.prototype.back = function(a) {
                var b = JSON.parse(this.stack.getItem("back"));
                b.length ? history.back() : a ? location.href = a : console.warn("[router.back]: can not back")
            }
            ,
            b.prototype._back = function(b) {
                var c = this.popBack()
                    , d = this.getCurrentPage()
                    , e = a(c.pageid);
                e[0] && (this.pushForward({
                    url: location.href,
                    pageid: "#" + d[0].id,
                    id: this.getCurrentStateID()
                }),
                    this.setCurrentStateID(c.id),
                    this.animatePages(e, d, !0))
            }
            ,
            b.prototype._forward = function() {
                var b = this.popForward()
                    , c = this.getCurrentPage()
                    , d = a(b.pageid);
                d[0] && (this.pushBack({
                    url: location.href,
                    pageid: "#" + c[0].id,
                    id: this.getCurrentStateID()
                }),
                    this.setCurrentStateID(b.id),
                    this.animatePages(c, d))
            }
            ,
            b.prototype.pushState = function(a, b) {
                history.pushState({
                    url: a,
                    id: b
                }, "", a)
            }
            ,
            b.prototype.onpopstate = function(a) {
                var b = a.state;
                if (!b || this.newLoaded)
                    return void (this.newLoaded = !1);
                if (b.id === this.getCurrentStateID())
                    return !1;
                var c = b.id > this.getCurrentStateID();
                c ? this._forward() : this._back(b.url)
            }
            ,
            b.prototype.getPage = function(b, c) {
                if ("#" === b[0])
                    return c.apply(this, [a(b)]);

                this.dispatch("pageLoadStart");
                var page=$('.page[page-url="'+b+'"]');
                if(page.length>0) {
                    c.apply(this, [page]);
                    return;
                }


                this.xhr && this.xhr.readyState < 4 && (this.xhr.onreadystatechange = function() {}
                    ,
                    this.xhr.abort(),
                    this.dispatch("pageLoadCancel"));
                var d = this,
                    url=b;
                this.xhr = a.ajax({
                    url: b,
                    success: a.proxy(function(a, b, d) {
                        var e = this.parseXHR(d);
                        e[0].id || (e[0].id = this.genRandomID()),
                            e.attr("page-url",url),
                            e.data("page-remote", 1),
                            c.apply(this, [e])
                    }, this),
                    error: function() {
                        d.dispatch("pageLoadError")
                    },
                    complete: function() {
                        d.dispatch("pageLoadComplete")
                    }
                })
            }
            ,
            b.prototype.getScript = function(a,b) {
                var c = document.createElement("script");
                c.type = "text/javascript",
                    c.async = !0,
                    c.onload = b,
                    c.src = a,
                    document.body.appendChild(c)
            },
            b.prototype.parseXHR = function(b) {
                var c = ""
                    , d = b.responseText
                    , e = d.match(/<body[^>]*>([\s\S.]*)<\/body>/i);
                c = e ? e[1] : d,
                    c = "<div>" + c + "</div>";
                var f = a(c);
                f.find(".popup, .panel, .panel-overlay").appendTo(document.body);
                var g = f.find(".page");
                var script = f.find("#jsconfig");
                //this.getScript(script);
                return g[0] || (g = f.addClass("page")),
                    g
            }
            ,
            b.prototype.genStateID = function() {
                var a = parseInt(this.state.getItem("stateid")) + 1;
                return this.state.setItem("stateid", a),
                    a
            }
            ,
            b.prototype.getCurrentStateID = function() {
                return parseInt(this.state.getItem("currentStateID"))
            }
            ,
            b.prototype.setCurrentStateID = function(a) {
                this.state.setItem("currentStateID", a)
            }
            ,
            b.prototype.genRandomID = function() {
                return "page-" + +new Date
            }
            ,
            b.prototype.popBack = function() {
                var a = JSON.parse(this.stack.getItem("back"));
                if (!a.length)
                    return null ;
                var b = a.splice(a.length - 1, 1)[0];
                return this.stack.setItem("back", JSON.stringify(a)),
                    b
            }
            ,
            b.prototype.pushBack = function(a) {
                var b = JSON.parse(this.stack.getItem("back"));
                b.push(a),
                    this.stack.setItem("back", JSON.stringify(b))
            }
            ,
            b.prototype.popForward = function() {
                var a = JSON.parse(this.stack.getItem("forward"));
                if (!a.length)
                    return null ;
                var b = a.splice(a.length - 1, 1)[0];
                return this.stack.setItem("forward", JSON.stringify(a)),
                    b
            }
            ,
            b.prototype.pushForward = function(a) {
                var b = JSON.parse(this.stack.getItem("forward"));
                b.push(a),
                    this.stack.setItem("forward", JSON.stringify(b))
            }
            ,
            b.prototype.dispatch = function(a) {
                var b = new CustomEvent(a,{
                    bubbles: !0,
                    cancelable: !0
                });
                window.dispatchEvent(b)
            }
            ,
            a(function() {
                if (a.smConfig.router) {
                    var c = a.router = new b;
                    a(document).on("click", "a", function(b) {
                        var d = a(b.currentTarget);
                        if (!(d.hasClass("external") || d[0].hasAttribute("external") || d.hasClass("tab-link") || d.hasClass("open-popup") || d.hasClass("open-panel"))) {
                            b.preventDefault();
                            var e = d.attr("href");
                            return d.hasClass("back") ? void c.back(e) : void (e && "#" !== e && c.loadPage(e))
                        }
                    })
                }
            })
    }(Zepto),
    +function(a) {
        "use strict";
        var b = function() {
                var b = a(".page-current");
                return b[0] || (b = a(".page").addClass("page-current")),
                    b
            }
            ;
        a.initPage = function(c) {
            var d = b();
            d[0] || (d = a(document.body));
            var e = d.hasClass("content") ? d : d.find(".content");
            e.scroller(),
                a.initPullToRefresh(e),
                a.initInfiniteScroll(e),
                a.initCalendar(e),
            a.initSwiper && a.initSwiper(e)
        }
            ,
        a.smConfig.showPageLoadingIndicator && (a(window).on("pageLoadStart", function() {
            a.showIndicator()
        }),
            a(document).on("pageAnimationStart", function() {
                a.hideIndicator()
            }),
            a(window).on("pageLoadCancel", function() {
                a.hideIndicator()
            }),
            a(window).on("pageLoadError", function() {
                a.hideIndicator(),
                    a.toast("加载失败")
            })),
            a.init = function() {
                var c = b()
                    , d = c[0].id;
                a.initPage(),
                    c.trigger("pageInit", [d, c])
            }
            ,
            a(function() {
                a.smConfig.autoInit && a.init(),
                    a(document).on("pageInitInternal", function(b, c, d) {
                        a.init()
                    })
            })
    }(Zepto),
    +function(a) {
        a.cookie = {
            getCookie: function (c_name) {
                if (document.cookie.length > 0) {
                    c_start = document.cookie.indexOf(c_name + "=");
                    if (c_start != -1) {
                        c_start = c_start + c_name.length + 1;　　　　
                        c_end = document.cookie.indexOf(";", c_start);　　 //其实我刚看见indexOf()第二个参数的时候猛然有点晕，后来想起来表示指定的开始索引的位置...这句是为了得到值的结束位置。因为需要考虑是否是最后一项，所以通过";"号是否存在来判断 					　　　　　　　　
                        if (c_end == -1) {
                            c_end = document.cookie.length;
                        }
                        return unescape(document.cookie.substring(c_start, c_end));　 //通过substring()得到了值。想了解unescape()得先知道escape()是做什么的，都是很重要的基础，想了解的可以搜索下，在文章结尾处也会进行讲解cookie编码细节 					　　　　　　
                    }
                }
                return "";
            },
            setCookie: function (c_name, value, expiredays) {
                var exdate = new Date();
                exdate.setDate(exdate.getDate() + expiredays);
                document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
            }

        };

    }(Zepto),
    +function(_){
        _.templateSettings = {
            evaluate    : /<%([\s\S]+?)%>/g,
            interpolate : /<%=([\s\S]+?)%>/g,
            escape      : /<%-([\s\S]+?)%>/g
        };
        var noMatch = /(.)^/;
        var escapes = {
            "'":      "'",
            '\\':     '\\',
            '\r':     'r',
            '\n':     'n',
            '\u2028': 'u2028',
            '\u2029': 'u2029'
        };

        var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

        var escapeChar = function(match) {
            return '\\' + escapes[match];
        };


        _.template = function(text, settings, oldSettings) {
            if (!settings && oldSettings) settings = oldSettings;
            settings = settings|| _.templateSettings;

            var matcher = RegExp([
                (settings.escape || noMatch).source,
                (settings.interpolate || noMatch).source,
                (settings.evaluate || noMatch).source
            ].join('|') + '|$', 'g');


            var index = 0;
            var source = "__p+='";
            text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
                source += text.slice(index, offset).replace(escaper, escapeChar);
                index = offset + match.length;

                if (escape) {
                    source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
                } else if (interpolate) {
                    source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
                } else if (evaluate) {
                    source += "';\n" + evaluate + "\n__p+='";
                }
                return match;
            });
            source += "';\n";

            if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

            source = "var __t,__p='',__j=Array.prototype.join," +
            "print=function(){__p+=__j.call(arguments,'');};\n" +
            source + 'return __p;\n';

            try {
                var render = new Function(settings.variable || 'obj', '_', source);
            } catch (e) {
                e.source = source;
                throw e;
            }

            var template = function (data) {
                return render.call(this, data, _);
            };
            var argument = settings.variable || 'obj';
            template.source = 'function(' + argument + '){\n' + source + '}';

            return template;
        }

    }(Zepto),
    +function(a) {
        "use strict";
        a.getQueryString= function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                if(name=='category'){
                    return decodeURIComponent(r[2]);
                }else{
                    return unescape(r[2]);
                }
            }
            return null;
        }

    }(Zepto),
    +function(a) {
        "use strict";
        if (a.device.ios) {
            var b = function (a) {
                    var b, c;
                    a = a || document.querySelector(a),
                    a && a.addEventListener("touchstart", function (d) {
                        b = d.touches[0].pageY,
                            c = a.scrollTop,
                        0 >= c && (a.scrollTop = 1),
                        c + a.offsetHeight >= a.scrollHeight && (a.scrollTop = a.scrollHeight - a.offsetHeight - 1)
                    }, !1)
                }
                , c = function () {
                    var c = a(".page-current").length > 0 ? ".page-current " : ""
                        , d = a(c + ".content");
                    new b(d[0])
                }
                ;
            a(document).on(a.touchEvents.move, ".page-current .bar", function () {
                event.preventDefault()
            }),
                a(document).on("pageLoadComplete", function () {
                    c()
                }),
                a(document).on("pageAnimationEnd", function () {
                    c()
                }),
                c()
        }
    }(Zepto),
    +function(a){
        var separator = /^(\S+)\s*(.*)$/;
        a.delegateEvents=function(Event){
            for (var evt in Event.events) {
                var r = Event[Event.events[evt]];
                var i = evt.match(separator)
                    , o = i[1]
                    , s = i[2];
                $(document).on(o, s, r);
            }
        }
    }(Zepto),
    +function(a){
        function Promise() {
            this._callbacks = [];
        }

        Promise.prototype.then = function(func, context) {
            var p;
            if (this._isdone) {
                p = func.apply(context, this.result);
            } else {
                p = new Promise();
                this._callbacks.push(function () {
                    var res = func.apply(context, arguments);
                    if (res && typeof res.then === 'function')
                        res.then(p.done, p);
                });
            }
            return p;
        };

        Promise.prototype.done = function() {
            this.result = arguments;
            this._isdone = true;
            for (var i = 0; i < this._callbacks.length; i++) {
                this._callbacks[i].apply(null, arguments);
            }
            this._callbacks = [];
        };

        function join(promises) {
            var p = new Promise();
            var results = [];

            if (!promises || !promises.length) {
                p.done(results);
                return p;
            }

            var numdone = 0;
            var total = promises.length;

            function notifier(i) {
                return function() {
                    numdone += 1;
                    results[i] = Array.prototype.slice.call(arguments);
                    if (numdone === total) {
                        p.done(results);
                    }
                };
            }

            for (var i = 0; i < total; i++) {
                promises[i].then(notifier(i));
            }

            return p;
        }

        function chain(funcs, args) {
            var p = new Promise();
            if (funcs.length === 0) {
                p.done.apply(p, args);
            } else {
                funcs[0].apply(null, args).then(function() {
                    funcs.splice(0, 1);
                    chain(funcs, arguments).then(function() {
                        p.done.apply(p, arguments);
                    });
                });
            }
            return p;
        }

        /*
         * AJAX requests
         */

        function _encode(data) {
            var payload = "";
            if (typeof data === "string") {
                payload = data;
            } else {
                var e = encodeURIComponent;
                var params = [];

                for (var k in data) {
                    if (data.hasOwnProperty(k)) {
                        params.push(e(k) + '=' + e(data[k]));
                    }
                }
                payload = params.join('&')
            }
            return payload;
        }

        function new_xhr() {
            var xhr;
            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                try {
                    xhr = new ActiveXObject("Msxml2.XMLHTTP");
                } catch (e) {
                    xhr = new ActiveXObject("Microsoft.XMLHTTP");
                }
            }
            return xhr;
        }


        function ajax(method, url, data, headers) {
            var p = new Promise();
            var xhr, payload;
            data = data || {};
            headers = headers || {};

            try {
                xhr = new_xhr();
            } catch (e) {
                p.done(promise.ENOXHR, "");
                return p;
            }

            payload = _encode(data);
            if (method === 'GET' && payload) {
                url += '?' + payload;
                payload = null;
            }

            xhr.open(method, url);

            var content_type = 'application/x-www-form-urlencoded';
            for (var h in headers) {
                if (headers.hasOwnProperty(h)) {
                    if (h.toLowerCase() === 'content-type')
                        content_type = headers[h];
                    else
                        xhr.setRequestHeader(h, headers[h]);
                }
            }
            xhr.setRequestHeader('Content-type', content_type);


            function onTimeout() {
                xhr.abort();
                p.done(promise.ETIMEOUT, "", xhr);
            }

            var timeout = promise.ajaxTimeout;
            if (timeout) {
                var tid = setTimeout(onTimeout, timeout);
            }

            xhr.onreadystatechange = function() {
                if (timeout) {
                    clearTimeout(tid);
                }
                if (xhr.readyState === 4) {
                    var err = (!xhr.status ||
                    (xhr.status < 200 || xhr.status >= 300) &&
                    xhr.status !== 304);
                    p.done(err, xhr.responseText, xhr);
                }
            };

            xhr.send(payload);
            return p;
        }

        function _ajaxer(method) {
            return function(url, data, headers) {
                return ajax(method, url, data, headers);
            };
        }

        $.promise = {
            Promise: Promise,
            join: join,
            chain: chain,
            ajax: ajax,
            get: _ajaxer('GET'),
            post: _ajaxer('POST'),
            put: _ajaxer('PUT'),
            del: _ajaxer('DELETE'),

            /* Error codes */
            ENOXHR: 1,
            ETIMEOUT: 2,

            /**
             * Configuration parameter: time in milliseconds after which a
             * pending AJAX request is considered unresponsive and is
             * aborted. Useful to deal with bad connectivity (e.g. on a
             * mobile network). A 0 value disables AJAX timeouts.
             *
             * Aborted requests resolve the promise with a ETIMEOUT error
             * code.
             */
            ajaxTimeout: 0
        }
     }(Zepto);


(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.store = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
    (function (global){
        "use strict";module.exports=function(){function e(){try{return o in n&&n[o]}catch(e){return!1}}var t,r={},n="undefined"!=typeof window?window:global,i=n.document,o="localStorage",a="script";if(r.disabled=!1,r.version="1.3.20",r.set=function(e,t){},r.get=function(e,t){},r.has=function(e){return void 0!==r.get(e)},r.remove=function(e){},r.clear=function(){},r.transact=function(e,t,n){null==n&&(n=t,t=null),null==t&&(t={});var i=r.get(e,t);n(i),r.set(e,i)},r.getAll=function(){},r.forEach=function(){},r.serialize=function(e){return JSON.stringify(e)},r.deserialize=function(e){if("string"==typeof e)try{return JSON.parse(e)}catch(t){return e||void 0}},e())t=n[o],r.set=function(e,n){return void 0===n?r.remove(e):(t.setItem(e,r.serialize(n)),n)},r.get=function(e,n){var i=r.deserialize(t.getItem(e));return void 0===i?n:i},r.remove=function(e){t.removeItem(e)},r.clear=function(){t.clear()},r.getAll=function(){var e={};return r.forEach(function(t,r){e[t]=r}),e},r.forEach=function(e){for(var n=0;n<t.length;n++){var i=t.key(n);e(i,r.get(i))}};else if(i&&i.documentElement.addBehavior){var c,u;try{u=new ActiveXObject("htmlfile"),u.open(),u.write("<"+a+">document.w=window</"+a+'><iframe src="/favicon.ico"></iframe>'),u.close(),c=u.w.frames[0].document,t=c.createElement("div")}catch(l){t=i.createElement("div"),c=i.body}var f=function(e){return function(){var n=Array.prototype.slice.call(arguments,0);n.unshift(t),c.appendChild(t),t.addBehavior("#default#userData"),t.load(o);var i=e.apply(r,n);return c.removeChild(t),i}},d=new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]","g"),s=function(e){return e.replace(/^d/,"___$&").replace(d,"___")};r.set=f(function(e,t,n){return t=s(t),void 0===n?r.remove(t):(e.setAttribute(t,r.serialize(n)),e.save(o),n)}),r.get=f(function(e,t,n){t=s(t);var i=r.deserialize(e.getAttribute(t));return void 0===i?n:i}),r.remove=f(function(e,t){t=s(t),e.removeAttribute(t),e.save(o)}),r.clear=f(function(e){var t=e.XMLDocument.documentElement.attributes;e.load(o);for(var r=t.length-1;r>=0;r--)e.removeAttribute(t[r].name);e.save(o)}),r.getAll=function(e){var t={};return r.forEach(function(e,r){t[e]=r}),t},r.forEach=f(function(e,t){for(var n,i=e.XMLDocument.documentElement.attributes,o=0;n=i[o];++o)t(n.name,r.deserialize(e.getAttribute(n.name)))})}try{var v="__storejs__";r.set(v,v),r.get(v)!=v&&(r.disabled=!0),r.remove(v)}catch(l){r.disabled=!0}return r.enabled=!r.disabled,r}();
    }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});

