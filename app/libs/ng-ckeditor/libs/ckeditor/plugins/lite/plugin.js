/* Source version: 1.2.26 */
(function(g, s) {
    var y = {
            Events: {
                INIT: "lite:init",
                ACCEPT: "lite:accept",
                REJECT: "lite:reject",
                SHOW_HIDE: "lite:showHide",
                TRACKING: "lite:tracking",
                CHANGE: "lite:change",
                HOVER_IN: "lite:hover-in",
                HOVER_OUT: "lite:hover-out"
            },
            Commands: {
                TOGGLE_TRACKING: "lite-toggletracking",
                TOGGLE_SHOW: "lite-toggleshow",
                ACCEPT_ALL: "lite-acceptall",
                REJECT_ALL: "lite-rejectall",
                ACCEPT_ONE: "lite-acceptone",
                REJECT_ONE: "lite-rejectone",
                TOGGLE_TOOLTIPS: "lite-toggletooltips"
            }
        },
        r = {
            show: true,
            path: "js/opentip-adapter.js",
            classPath: "OpentipAdapter",
            cssPath: "css/opentip.css",
            delay: 500
        },
        v = null,
        f = {
            deleteTag: "del",
            insertTag: "ins",
            deleteClass: "ice-del",
            insertClass: "ice-ins",
            attributes: {
                changeId: "data-cid",
                userId: "data-userid",
                userName: "data-username",
                sessionId: "data-session-id",
                changeData: "data-changedata",
                time: "data-time",
                lastTime: "data-last-change-time"
            },
            stylePrefix: "ice-cts",
            preserveOnPaste: "p",
            css: "css/lite.css"
        },
        v = "%a by %u %t",
        n = null,
        h = /^[\s\r\n]*$/,
        A = [{
            regex: /[\s]*title=\"[^\"]+\"/g,
            replace: ""
        }, {
            regex: /[\s]*data-selected=\"[^\"]+\"/g,
            replace: ""
        }],
        m = [],
        z = [g.CTRL + 88, g.CTRL + 120, g.SHIFT + 46],
        i = false;

    function d(J) {
        var F, E, I, H, D, K;
        if (J.nodeType === n.dom.ELEMENT_NODE) {
            var G = J.childNodes;
            for (H = 0; H < G.length; ++H) {
                K = G[H];
                d(K);
                E = K.nodeName.toLowerCase();
                if (E === f.insertTag || E === f.deleteTag) {
                    while (K.firstChild) {
                        J.insertBefore(K.firstChild, K)
                    }
                    J.removeChild(K)
                }
            }
        }
        E = J.nodeName.toLowerCase();
        if (E === "ins" || E === "del") {
            F = jQuery.makeArray(J.childNodes)
        } else {
            F = [J]
        }
        return F
    }

    function j(D) {
        if (!D || !D.length) {
            return []
        }
        var E = [];
        D.forEach(function(F) {
            E = E.concat(d(F))
        });
        return E
    }

    function q(D) {
        return z.indexOf(D) >= 0
    }

    function l(D) {
        if (D && D.$ && (typeof D.getDocument === "function")) {
            return D.$
        }
        return D
    }

    function o(E) {
        for (var D = m.length; D--;) {
            var F = m[D];
            if (F.editor === E) {
                return D
            }
        }
        return -1
    }

    function c(D) {
        var E = o(D);
        return E >= 0 ? m[E] : null
    }

    function p(D) {
        var E = c(D);
        return E && E.plugin
    }

    function u(D, E) {
        m.push({
            plugin: E,
            editor: D
        })
    }

    function x(F, G, D, I) {
        if (null === F || (typeof(F) === "undefined")) {
            F = ""
        } else {
            F = String(F)
        }
        D = String(D);
        var H = D.length;
        for (var E = F.length; E < G; E += H) {
            if (I) {
                F += D
            } else {
                F = D + F
            }
        }
        return F
    }

    function B(D, E) {
        return x(D, E, "0")
    }

    function a(G, F) {
        var E = new Date(),
            K = E.getDate(),
            I = E.getMonth(),
            J = E.getFullYear(),
            H, L;
        var M = typeof(G);
        if (M === "string" || M === "number") {
            G = new Date(G)
        }
        var D = F.MONTHS;
        if (K == G.getDate() && I == G.getMonth() && J == G.getFullYear()) {
            H = Math.floor((E.getTime() - G.getTime()) / 60000);
            if (H < 1) {
                return F.NOW
            } else {
                if (H < 2) {
                    return F.MINUTE_AGO
                } else {
                    if (H < 60) {
                        return (F.MINUTES_AGO.replace("xMinutes", H))
                    } else {
                        L = G.getHours();
                        H = G.getMinutes();
                        return F.AT + " " + B(L, 2) + ":" + B(H, 2, "0")
                    }
                }
            }
        } else {
            if (J == G.getFullYear()) {
                return F.ON + " " + F.LITE_LABELS_DATE(G.getDate(), G.getMonth())
            } else {
                return F.ON + " " + F.LITE_LABELS_DATE(G.getDate(), G.getMonth(), G.getFullYear())
            }
        }
    }
    var w = function() {
        var D = parseFloat(g.version);
        i = isNaN(D) || D < 4.4;
        w = function() {}
    };

    function C(F, G) {
        var E, D = G && G.length;
        if (!F || !D) {
            return false
        }
        for (E = 0; E < D; ++E) {
            if (F.is(G[E])) {
                return true
            }
        }
        return false
    }
    g.plugins.add("lite", {
        icons: "lite-acceptall,lite-acceptone,lite-rejectall,lite-rejectone,lite-toggleshow,lite-toggletracking",
        hidpi: true,
        lang: ["en", "de"],
        _scriptsLoaded: null,
        init: function(K) {
            w();
            var H = c(K);
            if (H) {
                return
            }
            var P = this.path,
                J = new e(P),
                D = g.tools.extend({}, K.config.lite || {}),
                M = D.tooltips;
            if (undefined === M) {
                M = true
            }
            if (M === true) {
                M = r
            }
            D.tooltips = M;
            u(K, J);
            J.init(K, D);
            K.on("destroy", (function(Q) {
                var R = o(Q);
                if (R >= 0) {
                    m.splice(R, 1)
                }
            }).bind(this));
            if (this._scriptsLoaded) {
                J._onScriptsLoaded();
                return
            } else {
                if (this._scriptsLoaded === false) {
                    return
                }
            }
            this._scriptsLoaded = false;
            var E = (typeof(jQuery) === "function"),
                O = this,
                F = D.jQueryPath || "js/jquery.min.js",
                G = (D.includeType ? D["includes_" + D.includeType] : D.includes) || ["lite-includes.js"];
            G = G.slice();
            for (var I = 0, L = G.length; I < L; ++I) {
                G[I] = P + G[I]
            }
            if (!E) {
                G.splice(0, 0, this.path + F)
            }
            if (M.path) {
                G.push(this.path + M.path)
            }
            var N = function() {
                if (G.length < 1) {
                    O._scriptsLoaded = true;
                    n = s.ice;
                    if (!E) {
                        jQuery.noConflict()
                    }
                    jQuery.each(m, (function(R, S) {
                        S.plugin._onScriptsLoaded()
                    }))
                } else {
                    var Q = G.shift();
                    g.scriptLoader.load(Q, function() {
                        N()
                    }, O)
                }
            };
            N(G)
        },
        findPlugin: function(D) {
            return p(D)
        },
        startNewSession: function(D) {
            var E = p(D);
            if (E) {
                E.startNewSession()
            } else {
                b("startNewSession: plugin not found")
            }
        }
    });
    var e = function(D) {
        this.path = D
    };
    e.prototype = {
        init: function(L, H) {
            var F = L.lang.lite;
            this._editor = L;
            this._domLoaded = false;
            this._editor = null;
            this._tracker = null;
            this._isVisible = true;
            this._liteCommandNames = [];
            this._canAcceptReject = true;
            this._removeBindings = [];
            if (!v) {
                v = "%a " + F.lite.BY + " %u %t"
            }
            L.ui.addToolbarGroup("lite");
            this._setPluginFeatures(L, f);
            this._changeTimeout = null;
            this._notifyChange = this._notifyChange.bind(this);
            this._notifyTextChange = this._notifyTextChange.bind(this);
            this._config = H;
            var D = H.acceptRejectInReadOnly === true;
            var E = [{
                command: y.Commands.TOGGLE_TRACKING,
                exec: this._onToggleTracking,
                title: F.TOGGLE_TRACKING,
                trackingOnly: false
            }, {
                command: y.Commands.TOGGLE_SHOW,
                exec: this._onToggleShow,
                title: F.TOGGLE_SHOW,
                readOnly: true
            }, {
                command: y.Commands.ACCEPT_ALL,
                exec: this._onAcceptAll,
                title: F.ACCEPT_ALL,
                readOnly: D
            }, {
                command: y.Commands.REJECT_ALL,
                exec: this._onRejectAll,
                title: F.REJECT_ALL,
                readOnly: D
            }, {
                command: y.Commands.ACCEPT_ONE,
                exec: this._onAcceptOne,
                title: F.ACCEPT_ONE,
                readOnly: D
            }, {
                command: y.Commands.REJECT_ONE,
                exec: this._onRejectOne,
                title: F.REJECT_ONE,
                readOnly: D
            }, {
                command: y.Commands.TOGGLE_TOOLTIPS,
                exec: this._onToggleTooltips,
                readOnly: true
            }];
            this._isTracking = H.isTracking !== false;
            this._trackingState = null;
            this._eventsBounds = false;
            L.on("contentDom", (function(P) {
                this._onDomLoaded(P)
            }).bind(this));
            L.on("dataReady", (function(P) {
                this._onAfterSetData(P)
            }).bind(this));
            var O = this.path;
            var G = H.commands || [y.Commands.TOGGLE_TRACKING, y.Commands.TOGGLE_SHOW, y.Commands.ACCEPT_ALL, y.Commands.REJECT_ALL, y.Commands.ACCEPT_ONE, y.Commands.REJECT_ONE];
            var N = this;

            function K(Q) {
                L.addCommand(Q.command, {
                    exec: Q.exec.bind(N),
                    readOnly: Q.readOnly || false
                });
                if (Q.title && G.indexOf(Q.command) >= 0) {
                    var P = N._commandNameToUIName(Q.command);
                    L.ui.addButton(P, {
                        label: Q.title,
                        command: Q.command,
                        toolbar: "lite"
                    });
                    if (Q.trackingOnly !== false) {
                        N._liteCommandNames.push(Q.command)
                    }
                }
            }
            for (var J = 0, M = E.length; J < M; ++J) {
                K(E[J])
            }
            if (H.contextMenu !== false) {
                if (L.addMenuItems) {
                    L.addMenuGroup("lite", 50);
                    var I = {};
                    if (G.indexOf(y.Commands.ACCEPT_ONE) >= 0) {
                        I[y.Commands.ACCEPT_ONE] = {
                            label: F.ACCEPT_ONE,
                            command: y.Commands.ACCEPT_ONE,
                            group: "lite",
                            order: 1
                        }
                    }
                    if (G.indexOf(y.Commands.REJECT_ONE) >= 0) {
                        I[y.Commands.REJECT_ONE] = {
                            label: F.REJECT_ONE,
                            command: y.Commands.REJECT_ONE,
                            group: "lite",
                            order: 2
                        }
                    }
                    L.addMenuItems(I)
                }
                if (L.contextMenu) {
                    L.contextMenu.addListener((function(Q) {
                        if (Q && this._tracker && this._tracker.currentChangeNode(Q)) {
                            var P = {};
                            P[y.Commands.ACCEPT_ONE] = g.TRISTATE_OFF;
                            P[y.Commands.REJECT_ONE] = g.TRISTATE_OFF;
                            return P
                        } else {
                            return null
                        }
                    }).bind(this))
                }
            }
        },
        toggleTracking: function(D, E) {
            if ("boolean" === typeof E) {
                E = {
                    notify: E
                }
            }
            E = E || {};
            var K = (undefined === D) ? !this._isTracking : D,
                I = this._editor,
                J = this._editor.lang.lite,
                H = E && E.force;
            if (!K && this._isTracking && !H) {
                var F = this._tracker.countChanges({
                    verify: true
                });
                if (F) {
                    return window.alert(J.PENDING_CHANGES)
                }
            }
            this._isTracking = K;
            this._setCommandsState(this._liteCommandNames, K ? g.TRISTATE_OFF : g.TRISTATE_DISABLED);
            this._updateTrackingState();
            this.toggleShow(K, false);
            this._setCommandsState(y.Commands.TOGGLE_TRACKING, K ? g.TRISTATE_ON : g.TRISTATE_OFF);
            var G = I.ui.get(this._commandNameToUIName(y.Commands.TOGGLE_TRACKING));
            if (G) {
                this._setButtonTitle(G, K ? J.STOP_TRACKING : J.START_TRACKING)
            }
            if (E.notify !== false) {
                I.fire(y.Events.TRACKING, {
                    tracking: K,
                    lite: this
                })
            }
        },
        toggleShow: function(D, E) {
            var G = (typeof(D) === "undefined") ? (!this._isVisible) : D,
                H = this._editor.lang.lite;
            this._isVisible = G;
            if (this._isTracking) {
                this._setCommandsState(y.Commands.TOGGLE_SHOW, G ? g.TRISTATE_ON : g.TRISTATE_OFF)
            }
            this._tracker.setShowChanges(G && this._isTracking);
            var F = this._editor.ui.get(this._commandNameToUIName(y.Commands.TOGGLE_SHOW));
            if (F) {
                this._setButtonTitle(F, G ? H.HIDE_TRACKED : H.SHOW_TRACKED)
            }
            if (E !== false) {
                this._editor.fire(y.Events.SHOW_HIDE, {
                    show: G,
                    lite: this
                })
            }
        },
        isVisible: function() {
            return this._isVisible
        },
        isTracking: function() {
            return this._isTracking
        },
        acceptAll: function(D) {
            this._tracker.acceptAll(D);
            this._cleanup();
            this._editor.fire(y.Events.ACCEPT, {
                lite: this,
                options: D
            })
        },
        rejectAll: function(D) {
            this._tracker.rejectAll(D);
            this._cleanup();
            this._editor.fire(y.Events.REJECT, {
                lite: this,
                options: D
            })
        },
        setUserInfo: function(D) {
            D = D || {};
            this._config.userId = String(D.id);
            this._config.userName = D.name || "";
            if (this._tracker) {
                this._tracker.setCurrentUser({
                    id: this._config.userId,
                    name: this._config.userName
                })
            }
        },
        getUserInfo: function() {
            return this._tracker ? this._tracker.getCurrentUser() : {
                name: "",
                id: ""
            }
        },
        countChanges: function(D) {
            return (this._tracker && this._tracker.countChanges(D)) || 0
        },
        enableAcceptReject: function(D) {
            this._canAcceptReject = Boolean(D);
            this._onIceChange()
        },
        filterIceElement: function(D) {
            if (!D) {
                return true
            }
            try {
                if (D.hasClass(f.insertClass) || D.hasClass(f.deleteClass)) {
                    return false
                }
            } catch (D) {}
            return true
        },
        startNewSession: function() {
            var D = new Date();
            this._sessionId = String.fromCharCode(65 + Math.round(Math.random() * 26)) + D.getDate() + D.getDay() + D.getHours() + D.getMinutes() + D.getMilliseconds();
            if (this._tracker) {
                this._tracker.setSessionId(this._sessionId)
            }
        },
        getCleanMarkup: function(E) {
            if (null === E || undefined === E) {
                E = (this._editor && this._editor.getData()) || ""
            }
            for (var D = A.length - 1; D >= 0; --D) {
                E = E.replace(A[D].regex, A[D].replace)
            }
            return E
        },
        getCleanText: function() {
            var H = this._getDocument();
            if (!H) {
                return ""
            }
            var G = this._editor.getData(),
                D = H.createElement("DIV");
            D.innerHTML = G;
            var F = [];
            F.push("");
            var E = this._tracker.getDeleteClass();
            this._getCleanText(D, F, E);
            var I = F.join("\n");
            I = I.replace(/&nbsp(;)?/ig, " ");
            return I
        },
        acceptChange: function(D) {
            D = l(D);
            if (D && this._tracker) {
                this._tracker.acceptChange(D);
                this._cleanup();
                this._editor.fire(y.Events.ACCEPT, {
                    lite: this
                });
                this._onSelectionChanged(null)
            }
        },
        rejectChange: function(D) {
            D = l(D);
            if (D && this._tracker) {
                this._tracker.rejectChange(D);
                this._cleanup();
                this._editor.fire(y.Events.REJECT, {
                    lite: this
                });
                this._onSelectionChanged(null)
            }
        },
        getChanges: function(D) {
            return (this._tracker && this._tracker.getChanges(D)) || {}
        },
        _getCleanText: function(I, H, G) {
            var F = I.getAttribute("class");
            if (F && F.indexOf(G) >= 0) {
                return
            }
            var D;
            if (D = ((I.nodeName && I.nodeName.toUpperCase() === "BR") || ("block" === jQuery(I).css("display")))) {
                if (h.test(H[H.length - 1])) {
                    H[H.length - 1] = ""
                } else {
                    H.push("")
                }
            }
            for (var J = I.firstChild; J; J = J.nextSibling) {
                var E = J.nodeType;
                if (3 == E) {
                    H[H.length - 1] += String(J.nodeValue)
                } else {
                    if (1 == E || 9 == E || 11 == E) {
                        this._getCleanText(J, H, G)
                    }
                }
            }
            if (D) {
                H.push("")
            }
        },
        _onDomLoaded: function(E) {
            this._domLoaded = true;
            this._editor = E.editor;
            var D = this._editor.editable();
            D.attachListener(D, "mousedown", this._onMouseDown, this, null, 1);
            D.attachListener(D, "keypress", this._onKeyPress, this, null, 1);
            this._hideTooltip();
            this._onReady()
        },
        _onScriptsLoaded: function() {
            this._scriptsLoaded = true;
            this._onReady()
        },
        _loadCSS: function(I, D) {
            var F = I.getElementsByTagName("head")[0],
                E = D.cssPath,
                G = this.path;

            function H(K, L) {
                if (!K) {
                    return
                }
                var J = jQuery(F).find("#" + L);
                if (!J.length) {
                    J = I.createElement("link");
                    J.setAttribute("rel", "stylesheet");
                    J.setAttribute("type", "text/css");
                    J.setAttribute("id", L);
                    J.setAttribute("href", G + K);
                    F.appendChild(J)
                }
            }
            if (E !== false) {
                H(E || D.defaultCssPath, "__lite__css__")
            }
            if (this._config.tooltips.cssPath) {
                H(this._config.tooltips.cssPath, "__lite_tt_css__")
            }
        },
        _onReady: function() {
            if (!this._scriptsLoaded || !this._domLoaded) {
                return
            }
            setTimeout(this._afterReady.bind(this), 5)
        },
        _getBody: function() {
            try {
                return this._editor.editable().$
            } catch (D) {
                return null
            }
        },
        _getDocument: function() {
            return this._editor && this._editor.document && this._editor.document.$
        },
        _afterReady: function() {
            var K = this._editor,
                J = K.document.$,
                D = this._getBody(),
                G = this._config,
                E = (G && G.debug) || {};
            this._loadCSS(J, {
                cssPath: G.cssPath,
                defaultCssPath: "css/lite.css"
            });
            if (!this._eventsBounds) {
                this._eventsBounds = true;
                var I = this._onPaste.bind(this);
                K.on("afterCommandExec", this._onAfterCommand.bind(this));
                K.on("beforeCommandExec", this._onBeforeCommand.bind(this));
                if (this._config.handlePaste) {
                    K.on("paste", I, null, null, 1)
                }
                K.on("beforeGetData", this._onBeforeGetData.bind(this));
                K.on("beoreUndoImage", this._onBeforeGetData.bind(this));
                K.on("insertHtml", I, null, null, 1);
                K.on("insertText", I, null, null, 1);
                K.on("insertElement", I, null, null, 1);
                K.on("mode", this._onModeChange.bind(this), null, null, 1);
                K.on("readOnly", this._onReadOnly.bind(this))
            }
            if (this._tracker) {
                if (D != this._tracker.getContentElement()) {
                    this._tracker.stopTracking(true);
                    jQuery(this._tracker).unbind();
                    this._tracker = null
                }
            }
            if (this._tracker) {
                return
            }
            var F = {
                element: D,
                mergeBlocks: false,
                currentUser: {
                    id: G.userId || "",
                    name: G.userName || ""
                },
                userStyles: G.userStyles,
                changeTypes: {
                    insertType: {
                        tag: f.insertTag,
                        alias: f.insertClass,
                        action: "Inserted"
                    },
                    deleteType: {
                        tag: f.deleteTag,
                        alias: f.deleteClass,
                        action: "Deleted"
                    }
                },
                hostMethods: {
                    getHostRange: this._getHostRange.bind(this),
                    getHostRangeData: this._getHostRangeData.bind(this),
                    makeHostElement: function(L) {
                        return new g.dom.element(L)
                    },
                    getHostNode: function(L) {
                        return L && L.$
                    },
                    setHostRange: this._setHostRange.bind(this),
                    hostCopy: this._hostCopy.bind(this),
                    beforeEdit: this._beforeEdit.bind(this)
                }
            };
            if (E.log) {
                F.hostMethods.logError = b
            }
            F.tooltips = G.tooltips.show;
            if (F.tooltips) {
                var H = this._hideTooltip.bind(this);
                F.hostMethods.showTooltip = this._showTooltip.bind(this);
                F.hostMethods.hideTooltip = H;
                F.hostMethods.beforeDelete = F.hostMethods.beforeInsert = H;
                if (G.tooltips.classPath) {
                    try {
                        this._tooltipsHandler = new window[G.tooltips.classPath]();
                        F.tooltipsDelay = G.tooltips.delay
                    } catch (K) {}
                    if (!this._tooltipsHandler) {
                        b("Unable to create tooltip handler", G.tooltips.classPath)
                    } else {
                        this._tooltipsHandler.init(G.tooltips)
                    }
                }
            }
            jQuery.extend(F, f);
            this._tracker = new n.InlineChangeEditor(F);
            try {
                this._tracker.startTracking();
                this.toggleTracking(this._isTracking, false);
                this._updateTrackingState();
                jQuery(this._tracker).on("change", this._onIceChange.bind(this)).on("textChange", this._onIceTextChanged.bind(this));
                K.fire(y.Events.INIT, {
                    lite: this
                });
                this._onSelectionChanged(null);
                this._onIceChange(null)
            } catch (K) {
                b("ICE plugin init:", K)
            }
        },
        _onToggleShow: function() {
            this.toggleShow()
        },
        _onToggleTracking: function() {
            this.toggleTracking()
        },
        _onRejectAll: function() {
            this.rejectAll()
        },
        _onAcceptAll: function() {
            this.acceptAll()
        },
        _onAcceptOne: function() {
            var D = this._tracker.currentChangeNode();
            return this.acceptChange(D)
        },
        _onRejectOne: function() {
            var D = this._tracker.currentChangeNode();
            return this.rejectChange(D)
        },
        _onToggleTooltips: function() {
            this._tracker && this._tracker.toggleTooltips()
        },
        _cleanup: function() {
            var D = this._getBody(),
                E = jQuery(D).find(self.insertSelector + ":empty," + self.deleteSelector + ":empty");
            E.remove();
            this._onSelectionChanged(null)
        },
        _setButtonTitle: function(D, F) {
            var E = jQuery("#" + D._.id);
            E.attr("title", F)
        },
        _onAfterCommand: function(E) {
            var D = this._tracker && this._isTracking && E.data && E.data.name;
            if ("undo" === D || "redo" === D) {
                this._tracker.reload()
            }
        },
        _onBeforeCommand: function(E) {
            var D = this._tracker && this._tracker.isTracking() && E.data && E.data.name;
            if ("cut" === D) {
                if (k(this._editor, "copy")) {
                    this._tracker.prepareToCut()
                }
            } else {
                if ("copy" === D) {
                    if (k(this._editor, "copy")) {
                        this._tracker.prepareToCopy()
                    }
                }
            }
        },
        _onModeChange: function(D) {
            this._updateTrackingState();
            setTimeout(this._onIceChange.bind(this), 0)
        },
        _onKeyPress: function(D) {
            var E = D && D.data && D.data.getKeystroke();
            if (q(E)) {
                D.stop()
            }
        },
        _onKeyDown: function(D) {
            if (!this._tracker || !this._tracker.isTracking()) {
                return
            }
            var E = D.data.keyCode;
            if (q(E)) {
                if (this._tracker.tryToCut()) {
                    D.stop()
                }
            }
        },
        _onMouseDown: function() {
            this._hideTooltip()
        },
        _onBeforeGetData: function() {
            this._hideTooltip()
        },
        _onAfterSetData: function() {
            this._hideTooltip();
            this._processContent();
            if (this._tracker) {
                this._tracker.reload()
            }
        },
        _onReadOnly: function() {
            this._updateTrackingState()
        },
        _updateTrackingState: function() {
            if (this._tracker) {
                var D = this._isTracking && this._editor.mode === "wysiwyg" && !this._editor.readOnly;
                if (D === this._trackingState) {
                    return
                }
                this._trackingState = D;
                this._tracker.toggleChangeTracking(D);
                for (var F = this._removeBindings.length - 1; F >= 0; --F) {
                    this._removeBindings[F].removeListener()
                }
                this._removeBindings = [];
                this._tracker.unlistenToEvents();
                if (D) {
                    var G = this._onSelectionChanged.bind(this),
                        E = this._editor.editable();
                    if (i) {
                        this._tracker.listenToEvents()
                    } else {
                        this._removeBindings.push(this._editor.on("key", function(I) {
                            if (this._tracker) {
                                var H = I.data.domEvent && I.data.domEvent.$;
                                return H ? this._tracker.handleEvent(H) : true
                            }
                            return true
                        }.bind(this)))
                    }
                    this._removeBindings.push(E.on("keyup", this._onSelectionChanged.bind(this, null, false)));
                    this._removeBindings.push(E.on("click", G));
                    this._removeBindings.push(this._editor.on("selectionChange", G))
                }
            }
        },
        _onPaste: function(M) {
            if (!this._tracker || !this._isTracking || !M) {
                return true
            }
            var F = M.data || {},
                H = null,
                L = ["[data-track-changes-ignore]"].concat(this._config.ignoreSelectors || []),
                G = window.jQuery,
                E = (M.name == "insertElement") && F.$;
            if (!F) {
                return
            }
            if ("string" === typeof F) {
                F = {
                    dataValue: F,
                    type: "text"
                }
            }
            if (F.dataValue && ("html" === (F.type || F.mode))) {
                try {
                    E = jQuery(F.dataValue)
                } catch (I) {}
            }
            if ("string" === typeof F.dataValue) {
                try {
                    var K = this._editor.document.$,
                        D = K.createElement("div");
                    D.innerHTML = String(F.dataValue);
                    D = this._tracker.getCleanDOM(D);
                    if (!D.innerHTML) {
                        return true
                    }
                    H = jQuery.makeArray(D.childNodes)
                } catch (I) {
                    b("ice plugin paste:", I)
                }
            } else {
                if (E) {
                    H = [E]
                } else {
                    return true
                }
            }
            if (H && L.length) {
                H = H.filter(function(N) {
                    return !C(G(N), L)
                })
            }
            if (H && H.length) {
                H = j(H);
                var J = this._editor.focusManager.hasFocus;
                this._beforeInsert();
                this._tracker.insert({
                    nodes: H
                });
                this._afterInsert();
                if (J) {
                    this._editor.editable().focus()
                }
                M.stop()
            }
            return true
        },
        _setCommandsState: function(D, G) {
            if (typeof(D) === "string") {
                D = D.split(",")
            }
            for (var E = D.length - 1; E >= 0; --E) {
                var F = this._editor.getCommand(D[E]);
                if (F) {
                    F.setState(G)
                }
            }
        },
        _onSelectionChanged: function(F, D) {
            var E = this._isTracking && this._tracker && this._tracker.isInsideChange(null, null, D),
                G = E && this._canAcceptReject ? g.TRISTATE_OFF : g.TRISTATE_DISABLED;
            this._setCommandsState([y.Commands.ACCEPT_ONE, y.Commands.REJECT_ONE], G)
        },
        _onIceChange: function(F) {
            var D = this._isTracking && this._tracker && this._tracker.hasChanges();
            var E = D && this._canAcceptReject ? g.TRISTATE_OFF : g.TRISTATE_DISABLED;
            this._setCommandsState([y.Commands.ACCEPT_ALL, y.Commands.REJECT_ALL], E);
            this._onSelectionChanged();
            if (F) {
                this._triggerChange()
            }
        },
        _onIceTextChanged: function(D) {
            this._editor.fire("change");
            this._editor.fire("saveSnapshot")
        },
        _triggerChange: function() {
            if (!this._changeTimeout) {
                this._changeTimeout = setTimeout(this._notifyChange, 1)
            }
        },
        _notifyChange: function() {
            this._changeTimeout = null;
            this._editor.fire(y.Events.CHANGE, {
                lite: this
            })
        },
        _notifyTextChange: function() {
            this._changeTimeout = null;
            this._editor.fire("change", {
                lite: this
            })
        },
        _processContent: function() {
            var D = this._getBody(),
                G = window.jQuery,
                J = f.insertTag,
                F = f.deleteTag,
                E, H;
            if (!D) {
                return
            }
            H = D.ownerDocument;

            function I(N, K) {
                var M = N.parentNode,
                    L = H.createElement(K);
                G.each(N.attributes, function(P, O) {
                    L.setAttribute(O.name, O.value)
                });
                L.className = N.className || "";
                G(N).contents().appendTo(L);
                M.insertBefore(L, N);
                M.removeChild(N)
            }
            if (J !== "span") {
                E = G(D).find("span." + f.insertClass);
                E.each(function(K, L) {
                    I(L, J)
                })
            }
            if (F !== "span") {
                E = G(D).find("span." + f.deleteClass);
                E.each(function(K, L) {
                    I(L, F)
                })
            }
        },
        _commandNameToUIName: function(D) {
            return D.replace(".", "_")
        },
        _setPluginFeatures: function(I, K) {
            function G() {
                return [K.deleteClass, K.insertClass, K.stylePrefix + "*"]
            }

            function D() {
                var M = ["title"];
                for (var N in K.attributes) {
                    if (K.attributes.hasOwnProperty(N)) {
                        var O = K.attributes[N];
                        if ((typeof O === "string") && O.indexOf("data-") === 0) {
                            M.push(O)
                        }
                    }
                }
                return M
            }

            function F(M) {
                var N = {};
                M.forEach(function(O) {
                    N[O] = true
                });
                return N
            }
            if (!I || !I.filter || !I.filter.addFeature) {
                return
            }
            try {
                var E = [],
                    L, H;
                L = {};
                H = {};
                H.classes = F(G());
                H.attributes = F(D());
                L[K.insertTag] = H;
                L[K.deleteTag] = g.tools.clone(H);
                L.br = g.tools.clone(H);
                L.br.propertiesOnly = true;
                L.span = g.tools.clone(H);
                I.filter.addFeature({
                    name: "lite-features",
                    allowedContent: L
                })
            } catch (J) {
                b(J)
            }
        },
        _setHostRange: function(D) {
            var E = this._editor && this._editor.getSelection();
            if (E) {
                E.selectRanges([D])
            }
        },
        _beforeEdit: function() {
            g.iscutting = true;
            var E = this._editor,
                D = function() {
                    E.fire("saveSnapshot")
                };
            D();
            setTimeout(function() {
                g.iscutting = false
            }, 100)
        },
        _hostCopy: function() {
            try {
                if (g.env.ie) {
                    t(this._editor, "copy")
                } else {
                    this._editor.document.$.execCommand("copy", false, null)
                }
            } catch (D) {
                b(D)
            }
        },
        _getHostRange: function() {
            var F = this._editor && this._editor.getSelection(),
                D = F && F.getRanges(),
                E = D && D[0];
            return E || null
        },
        _getHostRangeData: function(D) {
            D = D || this._getHostRange();
            if (!D) {
                return null
            }
            return {
                startContainer: D.startContainer && D.startContainer.$,
                endContainer: D.endContainer && D.endContainer.$,
                startOffset: D.startOffset,
                endOffset: D.endOffset
            }
        },
        _showTooltip: function(E, G) {
            var D = this._config.tooltips;
            if (D.events) {
                return this._editor && this._editor.fire(y.Events.HOVER_IN, {
                        lite: this,
                        node: E,
                        changeId: G.changeId
                    })
            }
            if (D.show) {
                var F = this._makeTooltipTitle(G);
                if (this._tooltipsHandler) {
                    this._tooltipsHandler.hideAll(this._getBody());
                    this._tooltipsHandler.showTooltip(E, F, this._editor.container.$)
                } else {
                    E.setAttribute("title", F)
                }
            }
        },
        _hideTooltip: function(F) {
            var E = this._config.tooltips;
            if (E.events) {
                return this._editor && this._editor.fire(y.Events.HOVER_OUT, {
                        lite: this,
                        node: F
                    })
            }
            if (this._tooltipsHandler) {
                if (F) {
                    this._tooltipsHandler.hideTooltip(F)
                } else {
                    this._tooltipsHandler.hideAll(this._getBody())
                }
            } else {
                if (this._tracker) {
                    if (F) {
                        F.removeAttribute("title")
                    } else {
                        var D = this._tracker.getIceNodes();
                        if (D) {
                            D.removeAttr("title")
                        }
                    }
                }
            }
        },
        _beforeInsert: function() {
            this._editor.fire("saveSnapshot")
        },
        _afterInsert: function() {
            var D = this._editor;
            D.getSelection().scrollIntoView()
        },
        _makeTooltipTitle: function(H) {
            var G = this._config.tooltipTemplate || v,
                E = new Date(H.time),
                D = new Date(H.lastTime),
                F = this._editor.lang.lite;
            G = G.replace(/%a/g, "insert" === H.type ? F.CHANGE_TYPE_ADDED : F.CHANGE_TYPE_DELETED);
            G = G.replace(/%t/g, a(E, F));
            G = G.replace(/%u/g, H.userName);
            G = G.replace(/%dd/g, B(E.getDate(), 2));
            G = G.replace(/%d/g, E.getDate());
            G = G.replace(/%mm/g, B(E.getMonth() + 1, 2));
            G = G.replace(/%m/g, E.getMonth() + 1);
            G = G.replace(/%yy/g, B(E.getYear() - 100, 2));
            G = G.replace(/%y/g, E.getFullYear());
            G = G.replace(/%nn/g, B(E.getMinutes(), 2));
            G = G.replace(/%n/g, E.getMinutes());
            G = G.replace(/%hh/g, B(E.getHours(), 2));
            G = G.replace(/%h/g, E.getHours());
            G = G.replace(/%T/g, a(D, F));
            G = G.replace(/%DD/g, B(D.getDate(), 2));
            G = G.replace(/%D/g, D.getDate());
            G = G.replace(/%MM/g, B(D.getMonth() + 1, 2));
            G = G.replace(/%M/g, D.getMonth() + 1);
            G = G.replace(/%YY/g, B(D.getYear() - 100, 2));
            G = G.replace(/%Y/g, D.getFullYear());
            G = G.replace(/%NN/g, B(D.getMinutes(), 2));
            G = G.replace(/%N/g, D.getMinutes());
            G = G.replace(/%HH/g, B(D.getHours(), 2));
            G = G.replace(/%H/g, D.getHours());
            return G
        }
    };

    function b() {
        var D = window.console;
        if (D && D.error) {
            D.error.apply(D, [].slice.call(arguments))
        }
    }

    function k(D, F) {
        if (g.env.ie) {
            return t(D, F)
        }
        try {
            return D.document.$.execCommand(F, false, null)
        } catch (E) {
            return false
        }
    }

    function t(F, I) {
        var G = F.document,
            D = G.getBody(),
            E = false,
            H, J = function() {
                E = true
            };
        D.on(I, J);
        H = (g.env.version > 7 ? G.$ : G.$.selection.createRange())["execCommand"](I, false);
        D.removeListener(I, J);
        return H || E
    }
})(window.CKEDITOR, this || window);
/* Copyright (C) 2015 LoopIndex - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the LoopIndex Comments CKEditor plugin license.
 *
 * You should have received a copy of the LoopIndex Comments CKEditor plugin license with
 * this file. If not, please write to: loopindex@gmail.com, or visit http://www.loopindex.com
 * written by (David *)Frenkiel (https://github.com/imdfl)
 */