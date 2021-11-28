const t1 = window.ShadowRoot && (void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, e7 = Symbol(), n5 = new Map;
class s5 {
    constructor(t, n){
        if (this._$cssResult$ = !0, n !== e7) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
        this.cssText = t;
    }
    get styleSheet() {
        let e = n5.get(this.cssText);
        return t1 && void 0 === e && (n5.set(this.cssText, e = new CSSStyleSheet), e.replaceSync(this.cssText)), e;
    }
    toString() {
        return this.cssText;
    }
}
const o = (t)=>new s5("string" == typeof t ? t : t + "", e7)
, r = (t, ...n)=>{
    const o = 1 === t.length ? t[0] : n.reduce((e, n, s)=>e + ((t)=>{
            if (!0 === t._$cssResult$) return t.cssText;
            if ("number" == typeof t) return t;
            throw Error("Value passed to 'css' function must be a 'css' function result: " + t + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
        })(n) + t[s + 1]
    , t[0]);
    return new s5(o, e7);
}, i1 = (e, n)=>{
    t1 ? e.adoptedStyleSheets = n.map((t)=>t instanceof CSSStyleSheet ? t : t.styleSheet
    ) : n.forEach((t)=>{
        const n = document.createElement("style"), s = window.litNonce;
        void 0 !== s && n.setAttribute("nonce", s), n.textContent = t.cssText, e.appendChild(n);
    });
}, S = t1 ? (t)=>t
 : (t)=>t instanceof CSSStyleSheet ? ((t)=>{
        let e = "";
        for (const n of t.cssRules)e += n.cssText;
        return o(e);
    })(t) : t
;
var s1;
const e1 = window.trustedTypes, r1 = e1 ? e1.emptyScript : "", h = window.reactiveElementPolyfillSupport, o1 = {
    toAttribute (t, i) {
        switch(i){
            case Boolean:
                t = t ? r1 : null;
                break;
            case Object:
            case Array:
                t = null == t ? t : JSON.stringify(t);
        }
        return t;
    },
    fromAttribute (t, i) {
        let s = t;
        switch(i){
            case Boolean:
                s = null !== t;
                break;
            case Number:
                s = null === t ? null : Number(t);
                break;
            case Object:
            case Array:
                try {
                    s = JSON.parse(t);
                } catch (t2) {
                    s = null;
                }
        }
        return s;
    }
}, n1 = (t, i)=>i !== t && (i == i || t == t)
, l = {
    attribute: !0,
    type: String,
    converter: o1,
    reflect: !1,
    hasChanged: n1
};
class a extends HTMLElement {
    constructor(){
        super(), this._$Et = new Map, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Ei = null, this.o();
    }
    static addInitializer(t) {
        var i;
        null !== (i = this.l) && void 0 !== i || (this.l = []), this.l.push(t);
    }
    static get observedAttributes() {
        this.finalize();
        const t = [];
        return this.elementProperties.forEach((i, s)=>{
            const e = this._$Eh(s, i);
            void 0 !== e && (this._$Eu.set(e, s), t.push(e));
        }), t;
    }
    static createProperty(t, i = l) {
        if (i.state && (i.attribute = !1), this.finalize(), this.elementProperties.set(t, i), !i.noAccessor && !this.prototype.hasOwnProperty(t)) {
            const s = "symbol" == typeof t ? Symbol() : "__" + t, e = this.getPropertyDescriptor(t, s, i);
            void 0 !== e && Object.defineProperty(this.prototype, t, e);
        }
    }
    static getPropertyDescriptor(t, i, s) {
        return {
            get () {
                return this[i];
            },
            set (e) {
                const r = this[t];
                this[i] = e, this.requestUpdate(t, r, s);
            },
            configurable: !0,
            enumerable: !0
        };
    }
    static getPropertyOptions(t) {
        return this.elementProperties.get(t) || l;
    }
    static finalize() {
        if (this.hasOwnProperty("finalized")) return !1;
        this.finalized = !0;
        const t = Object.getPrototypeOf(this);
        if (t.finalize(), this.elementProperties = new Map(t.elementProperties), this._$Eu = new Map, this.hasOwnProperty("properties")) {
            const t = this.properties, i = [
                ...Object.getOwnPropertyNames(t),
                ...Object.getOwnPropertySymbols(t)
            ];
            for (const s of i)this.createProperty(s, t[s]);
        }
        return this.elementStyles = this.finalizeStyles(this.styles), !0;
    }
    static finalizeStyles(i) {
        const s = [];
        if (Array.isArray(i)) {
            const e = new Set(i.flat(1 / 0).reverse());
            for (const i2 of e)s.unshift(S(i2));
        } else void 0 !== i && s.push(S(i));
        return s;
    }
    static _$Eh(t, i) {
        const s = i.attribute;
        return !1 === s ? void 0 : "string" == typeof s ? s : "string" == typeof t ? t.toLowerCase() : void 0;
    }
    o() {
        var t;
        this._$Ep = new Promise((t)=>this.enableUpdating = t
        ), this._$AL = new Map, this._$Em(), this.requestUpdate(), null === (t = this.constructor.l) || void 0 === t || t.forEach((t)=>t(this)
        );
    }
    addController(t) {
        var i, s;
        (null !== (i = this._$Eg) && void 0 !== i ? i : this._$Eg = []).push(t), void 0 !== this.renderRoot && this.isConnected && (null === (s = t.hostConnected) || void 0 === s || s.call(t));
    }
    removeController(t) {
        var i;
        null === (i = this._$Eg) || void 0 === i || i.splice(this._$Eg.indexOf(t) >>> 0, 1);
    }
    _$Em() {
        this.constructor.elementProperties.forEach((t, i)=>{
            this.hasOwnProperty(i) && (this._$Et.set(i, this[i]), delete this[i]);
        });
    }
    createRenderRoot() {
        var t;
        const s = null !== (t = this.shadowRoot) && void 0 !== t ? t : this.attachShadow(this.constructor.shadowRootOptions);
        return i1(s, this.constructor.elementStyles), s;
    }
    connectedCallback() {
        var t;
        void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), null === (t = this._$Eg) || void 0 === t || t.forEach((t)=>{
            var i;
            return null === (i = t.hostConnected) || void 0 === i ? void 0 : i.call(t);
        });
    }
    enableUpdating(t) {
    }
    disconnectedCallback() {
        var t;
        null === (t = this._$Eg) || void 0 === t || t.forEach((t)=>{
            var i;
            return null === (i = t.hostDisconnected) || void 0 === i ? void 0 : i.call(t);
        });
    }
    attributeChangedCallback(t, i, s) {
        this._$AK(t, s);
    }
    _$ES(t, i, s = l) {
        var e, r;
        const h = this.constructor._$Eh(t, s);
        if (void 0 !== h && !0 === s.reflect) {
            const n = (null !== (r = null === (e = s.converter) || void 0 === e ? void 0 : e.toAttribute) && void 0 !== r ? r : o1.toAttribute)(i, s.type);
            this._$Ei = t, null == n ? this.removeAttribute(h) : this.setAttribute(h, n), this._$Ei = null;
        }
    }
    _$AK(t, i) {
        var s, e, r;
        const h = this.constructor, n = h._$Eu.get(t);
        if (void 0 !== n && this._$Ei !== n) {
            const t = h.getPropertyOptions(n), l = t.converter, a = null !== (r = null !== (e = null === (s = l) || void 0 === s ? void 0 : s.fromAttribute) && void 0 !== e ? e : "function" == typeof l ? l : null) && void 0 !== r ? r : o1.fromAttribute;
            this._$Ei = n, this[n] = a(i, t.type), this._$Ei = null;
        }
    }
    requestUpdate(t, i, s) {
        let e = !0;
        void 0 !== t && (((s = s || this.constructor.getPropertyOptions(t)).hasChanged || n1)(this[t], i) ? (this._$AL.has(t) || this._$AL.set(t, i), !0 === s.reflect && this._$Ei !== t && (void 0 === this._$E_ && (this._$E_ = new Map), this._$E_.set(t, s))) : e = !1), !this.isUpdatePending && e && (this._$Ep = this._$EC());
    }
    async _$EC() {
        this.isUpdatePending = !0;
        try {
            await this._$Ep;
        } catch (t) {
            Promise.reject(t);
        }
        const t2 = this.scheduleUpdate();
        return null != t2 && await t2, !this.isUpdatePending;
    }
    scheduleUpdate() {
        return this.performUpdate();
    }
    performUpdate() {
        var t;
        if (!this.isUpdatePending) return;
        this.hasUpdated, this._$Et && (this._$Et.forEach((t, i)=>this[i] = t
        ), this._$Et = void 0);
        let i = !1;
        const s = this._$AL;
        try {
            i = this.shouldUpdate(s), i ? (this.willUpdate(s), null === (t = this._$Eg) || void 0 === t || t.forEach((t)=>{
                var i;
                return null === (i = t.hostUpdate) || void 0 === i ? void 0 : i.call(t);
            }), this.update(s)) : this._$EU();
        } catch (t2) {
            throw i = !1, this._$EU(), t2;
        }
        i && this._$AE(s);
    }
    willUpdate(t) {
    }
    _$AE(t) {
        var i;
        null === (i = this._$Eg) || void 0 === i || i.forEach((t)=>{
            var i;
            return null === (i = t.hostUpdated) || void 0 === i ? void 0 : i.call(t);
        }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
    }
    _$EU() {
        this._$AL = new Map, this.isUpdatePending = !1;
    }
    get updateComplete() {
        return this.getUpdateComplete();
    }
    getUpdateComplete() {
        return this._$Ep;
    }
    shouldUpdate(t) {
        return !0;
    }
    update(t) {
        void 0 !== this._$E_ && (this._$E_.forEach((t, i)=>this._$ES(i, this[i], t)
        ), this._$E_ = void 0), this._$EU();
    }
    updated(t) {
    }
    firstUpdated(t) {
    }
}
a.finalized = !0, a.elementProperties = new Map, a.elementStyles = [], a.shadowRootOptions = {
    mode: "open"
}, null == h || h({
    ReactiveElement: a
}), (null !== (s1 = globalThis.reactiveElementVersions) && void 0 !== s1 ? s1 : globalThis.reactiveElementVersions = []).push("1.0.2");
var t2;
const i2 = globalThis.trustedTypes, s2 = i2 ? i2.createPolicy("lit-html", {
    createHTML: (t)=>t
}) : void 0, e2 = `lit$${(Math.random() + "").slice(9)}$`, o2 = "?" + e2, n2 = `<${o2}>`, l1 = document, h1 = (t = "")=>l1.createComment(t)
, r2 = (t)=>null === t || "object" != typeof t && "function" != typeof t
, d = Array.isArray, u = (t)=>{
    var i;
    return d(t) || "function" == typeof (null === (i = t) || void 0 === i ? void 0 : i[Symbol.iterator]);
}, c = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, v = /-->/g, a1 = />/g, f = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g, _ = /'/g, m2 = /"/g, g = /^(?:script|style|textarea)$/i, $ = (t)=>(i, ...s)=>({
            _$litType$: t,
            strings: i,
            values: s
        })
, p = $(1), y = $(2), b = Symbol.for("lit-noChange"), T = Symbol.for("lit-nothing"), x = new WeakMap, w = (t, i, s)=>{
    var e, o;
    const n = null !== (e = null == s ? void 0 : s.renderBefore) && void 0 !== e ? e : i;
    let l = n._$litPart$;
    if (void 0 === l) {
        const t = null !== (o = null == s ? void 0 : s.renderBefore) && void 0 !== o ? o : null;
        n._$litPart$ = l = new N(i.insertBefore(h1(), t), t, void 0, null != s ? s : {
        });
    }
    return l._$AI(t), l;
}, A = l1.createTreeWalker(l1, 129, null, !1), C = (t, i)=>{
    const o = t.length - 1, l = [];
    let h, r = 2 === i ? "<svg>" : "", d = c;
    for(let i3 = 0; i3 < o; i3++){
        const s = t[i3];
        let o, u, $ = -1, p = 0;
        for(; p < s.length && (d.lastIndex = p, u = d.exec(s), null !== u);)p = d.lastIndex, d === c ? "!--" === u[1] ? d = v : void 0 !== u[1] ? d = a1 : void 0 !== u[2] ? (g.test(u[2]) && (h = RegExp("</" + u[2], "g")), d = f) : void 0 !== u[3] && (d = f) : d === f ? ">" === u[0] ? (d = null != h ? h : c, $ = -1) : void 0 === u[1] ? $ = -2 : ($ = d.lastIndex - u[2].length, o = u[1], d = void 0 === u[3] ? f : '"' === u[3] ? m2 : _) : d === m2 || d === _ ? d = f : d === v || d === a1 ? d = c : (d = f, h = void 0);
        const y = d === f && t[i3 + 1].startsWith("/>") ? " " : "";
        r += d === c ? s + n2 : $ >= 0 ? (l.push(o), s.slice(0, $) + "$lit$" + s.slice($) + e2 + y) : s + e2 + (-2 === $ ? (l.push(void 0), i3) : y);
    }
    const u = r + (t[o] || "<?>") + (2 === i ? "</svg>" : "");
    return [
        void 0 !== s2 ? s2.createHTML(u) : u,
        l
    ];
};
class P {
    constructor({ strings: t , _$litType$: s  }, n){
        let l;
        this.parts = [];
        let r = 0, d = 0;
        const u = t.length - 1, c = this.parts, [v, a] = C(t, s);
        if (this.el = P.createElement(v, n), A.currentNode = this.el.content, 2 === s) {
            const t = this.el.content, i = t.firstChild;
            i.remove(), t.append(...i.childNodes);
        }
        for(; null !== (l = A.nextNode()) && c.length < u;){
            if (1 === l.nodeType) {
                if (l.hasAttributes()) {
                    const t = [];
                    for (const i of l.getAttributeNames())if (i.endsWith("$lit$") || i.startsWith(e2)) {
                        const s = a[d++];
                        if (t.push(i), void 0 !== s) {
                            const t = l.getAttribute(s.toLowerCase() + "$lit$").split(e2), i = /([.?@])?(.*)/.exec(s);
                            c.push({
                                type: 1,
                                index: r,
                                name: i[2],
                                strings: t,
                                ctor: "." === i[1] ? M : "?" === i[1] ? H : "@" === i[1] ? I : S1
                            });
                        } else c.push({
                            type: 6,
                            index: r
                        });
                    }
                    for (const i1 of t)l.removeAttribute(i1);
                }
                if (g.test(l.tagName)) {
                    const t = l.textContent.split(e2), s = t.length - 1;
                    if (s > 0) {
                        l.textContent = i2 ? i2.emptyScript : "";
                        for(let i1 = 0; i1 < s; i1++)l.append(t[i1], h1()), A.nextNode(), c.push({
                            type: 2,
                            index: ++r
                        });
                        l.append(t[s], h1());
                    }
                }
            } else if (8 === l.nodeType) if (l.data === o2) c.push({
                type: 2,
                index: r
            });
            else {
                let t = -1;
                for(; -1 !== (t = l.data.indexOf(e2, t + 1));)c.push({
                    type: 7,
                    index: r
                }), t += e2.length - 1;
            }
            r++;
        }
    }
    static createElement(t, i) {
        const s = l1.createElement("template");
        return s.innerHTML = t, s;
    }
}
function V(t, i, s = t, e) {
    var o, n, l, h;
    if (i === b) return i;
    let d = void 0 !== e ? null === (o = s._$Cl) || void 0 === o ? void 0 : o[e] : s._$Cu;
    const u = r2(i) ? void 0 : i._$litDirective$;
    return (null == d ? void 0 : d.constructor) !== u && (null === (n = null == d ? void 0 : d._$AO) || void 0 === n || n.call(d, !1), void 0 === u ? d = void 0 : (d = new u(t), d._$AT(t, s, e)), void 0 !== e ? (null !== (l = (h = s)._$Cl) && void 0 !== l ? l : h._$Cl = [])[e] = d : s._$Cu = d), void 0 !== d && (i = V(t, d._$AS(t, i.values), d, e)), i;
}
class E {
    constructor(t, i){
        this.v = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
    }
    get parentNode() {
        return this._$AM.parentNode;
    }
    get _$AU() {
        return this._$AM._$AU;
    }
    p(t) {
        var i;
        const { el: { content: s  } , parts: e  } = this._$AD, o = (null !== (i = null == t ? void 0 : t.creationScope) && void 0 !== i ? i : l1).importNode(s, !0);
        A.currentNode = o;
        let n = A.nextNode(), h = 0, r = 0, d = e[0];
        for(; void 0 !== d;){
            if (h === d.index) {
                let i;
                2 === d.type ? i = new N(n, n.nextSibling, this, t) : 1 === d.type ? i = new d.ctor(n, d.name, d.strings, this, t) : 6 === d.type && (i = new L(n, this, t)), this.v.push(i), d = e[++r];
            }
            h !== (null == d ? void 0 : d.index) && (n = A.nextNode(), h++);
        }
        return o;
    }
    m(t) {
        let i = 0;
        for (const s of this.v)void 0 !== s && (void 0 !== s.strings ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
    }
}
class N {
    constructor(t, i, s, e){
        var o;
        this.type = 2, this._$AH = T, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = e, this._$Cg = null === (o = null == e ? void 0 : e.isConnected) || void 0 === o || o;
    }
    get _$AU() {
        var t, i;
        return null !== (i = null === (t = this._$AM) || void 0 === t ? void 0 : t._$AU) && void 0 !== i ? i : this._$Cg;
    }
    get parentNode() {
        let t = this._$AA.parentNode;
        const i = this._$AM;
        return void 0 !== i && 11 === t.nodeType && (t = i.parentNode), t;
    }
    get startNode() {
        return this._$AA;
    }
    get endNode() {
        return this._$AB;
    }
    _$AI(t, i = this) {
        t = V(this, t, i), r2(t) ? t === T || null == t || "" === t ? (this._$AH !== T && this._$AR(), this._$AH = T) : t !== this._$AH && t !== b && this.$(t) : void 0 !== t._$litType$ ? this.T(t) : void 0 !== t.nodeType ? this.S(t) : u(t) ? this.M(t) : this.$(t);
    }
    A(t, i = this._$AB) {
        return this._$AA.parentNode.insertBefore(t, i);
    }
    S(t) {
        this._$AH !== t && (this._$AR(), this._$AH = this.A(t));
    }
    $(t) {
        this._$AH !== T && r2(this._$AH) ? this._$AA.nextSibling.data = t : this.S(l1.createTextNode(t)), this._$AH = t;
    }
    T(t) {
        var i;
        const { values: s , _$litType$: e  } = t, o = "number" == typeof e ? this._$AC(t) : (void 0 === e.el && (e.el = P.createElement(e.h, this.options)), e);
        if ((null === (i = this._$AH) || void 0 === i ? void 0 : i._$AD) === o) this._$AH.m(s);
        else {
            const t = new E(o, this), i = t.p(this.options);
            t.m(s), this.S(i), this._$AH = t;
        }
    }
    _$AC(t) {
        let i = x.get(t.strings);
        return void 0 === i && x.set(t.strings, i = new P(t)), i;
    }
    M(t) {
        d(this._$AH) || (this._$AH = [], this._$AR());
        const i = this._$AH;
        let s, e = 0;
        for (const o of t)e === i.length ? i.push(s = new N(this.A(h1()), this.A(h1()), this, this.options)) : s = i[e], s._$AI(o), e++;
        e < i.length && (this._$AR(s && s._$AB.nextSibling, e), i.length = e);
    }
    _$AR(t = this._$AA.nextSibling, i) {
        var s;
        for(null === (s = this._$AP) || void 0 === s || s.call(this, !1, !0, i); t && t !== this._$AB;){
            const i = t.nextSibling;
            t.remove(), t = i;
        }
    }
    setConnected(t) {
        var i;
        void 0 === this._$AM && (this._$Cg = t, null === (i = this._$AP) || void 0 === i || i.call(this, t));
    }
}
class S1 {
    constructor(t, i, s, e, o){
        this.type = 1, this._$AH = T, this._$AN = void 0, this.element = t, this.name = i, this._$AM = e, this.options = o, s.length > 2 || "" !== s[0] || "" !== s[1] ? (this._$AH = Array(s.length - 1).fill(new String), this.strings = s) : this._$AH = T;
    }
    get tagName() {
        return this.element.tagName;
    }
    get _$AU() {
        return this._$AM._$AU;
    }
    _$AI(t, i = this, s, e) {
        const o = this.strings;
        let n = !1;
        if (void 0 === o) t = V(this, t, i, 0), n = !r2(t) || t !== this._$AH && t !== b, n && (this._$AH = t);
        else {
            const e = t;
            let l, h;
            for(t = o[0], l = 0; l < o.length - 1; l++)h = V(this, e[s + l], i, l), h === b && (h = this._$AH[l]), n || (n = !r2(h) || h !== this._$AH[l]), h === T ? t = T : t !== T && (t += (null != h ? h : "") + o[l + 1]), this._$AH[l] = h;
        }
        n && !e && this.k(t);
    }
    k(t) {
        t === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t ? t : "");
    }
}
class M extends S1 {
    constructor(){
        super(...arguments), this.type = 3;
    }
    k(t) {
        this.element[this.name] = t === T ? void 0 : t;
    }
}
const k = i2 ? i2.emptyScript : "";
class H extends S1 {
    constructor(){
        super(...arguments), this.type = 4;
    }
    k(t) {
        t && t !== T ? this.element.setAttribute(this.name, k) : this.element.removeAttribute(this.name);
    }
}
class I extends S1 {
    constructor(t, i, s, e, o){
        super(t, i, s, e, o), this.type = 5;
    }
    _$AI(t, i = this) {
        var s;
        if ((t = null !== (s = V(this, t, i, 0)) && void 0 !== s ? s : T) === b) return;
        const e = this._$AH, o = t === T && e !== T || t.capture !== e.capture || t.once !== e.once || t.passive !== e.passive, n = t !== T && (e === T || o);
        o && this.element.removeEventListener(this.name, this, e), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
    }
    handleEvent(t) {
        var i, s;
        "function" == typeof this._$AH ? this._$AH.call(null !== (s = null === (i = this.options) || void 0 === i ? void 0 : i.host) && void 0 !== s ? s : this.element, t) : this._$AH.handleEvent(t);
    }
}
class L {
    constructor(t, i, s){
        this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
    }
    get _$AU() {
        return this._$AM._$AU;
    }
    _$AI(t) {
        V(this, t);
    }
}
const R = {
    P: "$lit$",
    V: e2,
    L: o2,
    I: 1,
    N: C,
    R: E,
    D: u,
    j: V,
    H: N,
    O: S1,
    F: H,
    B: I,
    W: M,
    Z: L
}, z = window.litHtmlPolyfillSupport;
null == z || z(P, N), (null !== (t2 = globalThis.litHtmlVersions) && void 0 !== t2 ? t2 : globalThis.litHtmlVersions = []).push("2.0.2");
var l2, o3;
class s3 extends a {
    constructor(){
        super(...arguments), this.renderOptions = {
            host: this
        }, this._$Dt = void 0;
    }
    createRenderRoot() {
        var t, e;
        const i = super.createRenderRoot();
        return null !== (t = (e = this.renderOptions).renderBefore) && void 0 !== t || (e.renderBefore = i.firstChild), i;
    }
    update(t) {
        const i = this.render();
        this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Dt = w(i, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
        var t;
        super.connectedCallback(), null === (t = this._$Dt) || void 0 === t || t.setConnected(!0);
    }
    disconnectedCallback() {
        var t;
        super.disconnectedCallback(), null === (t = this._$Dt) || void 0 === t || t.setConnected(!1);
    }
    render() {
        return b;
    }
}
s3.finalized = !0, s3._$litElement$ = !0, null === (l2 = globalThis.litElementHydrateSupport) || void 0 === l2 || l2.call(globalThis, {
    LitElement: s3
});
const n3 = globalThis.litElementPolyfillSupport;
null == n3 || n3({
    LitElement: s3
});
(null !== (o3 = globalThis.litElementVersions) && void 0 !== o3 ? o3 : globalThis.litElementVersions = []).push("3.0.2");
const t3 = {
    ATTRIBUTE: 1,
    CHILD: 2,
    PROPERTY: 3,
    BOOLEAN_ATTRIBUTE: 4,
    EVENT: 5,
    ELEMENT: 6
}, e3 = (t)=>(...e)=>({
            _$litDirective$: t,
            values: e
        })
;
class i3 {
    constructor(t){
    }
    get _$AU() {
        return this._$AM._$AU;
    }
    _$AT(t, e, i) {
        this._$Ct = t, this._$AM = e, this._$Ci = i;
    }
    _$AS(t, e) {
        return this.update(t, e);
    }
    update(t, e) {
        return this.render(...e);
    }
}
const { H: i4  } = R, e4 = ()=>document.createComment("")
, u1 = (o, t, n)=>{
    var v;
    const l = o._$AA.parentNode, d = void 0 === t ? o._$AB : t._$AA;
    if (void 0 === n) {
        const t = l.insertBefore(e4(), d), v = l.insertBefore(e4(), d);
        n = new i4(t, v, o, o.options);
    } else {
        const i = n._$AB.nextSibling, t = n._$AM, r = t !== o;
        if (r) {
            let i;
            null === (v = n._$AQ) || void 0 === v || v.call(n, o), n._$AM = o, void 0 !== n._$AP && (i = o._$AU) !== t._$AU && n._$AP(i);
        }
        if (i !== d || r) {
            let o = n._$AA;
            for(; o !== i;){
                const i = o.nextSibling;
                l.insertBefore(o, d), o = i;
            }
        }
    }
    return n;
}, c1 = (o, i, t = o)=>(o._$AI(i, t), o)
, f1 = {
}, s4 = (o, i = f1)=>o._$AH = i
, a2 = (o)=>o._$AH
, m1 = (o)=>{
    var i;
    null === (i = o._$AP) || void 0 === i || i.call(o, !1, !0);
    let t = o._$AA;
    const n = o._$AB.nextSibling;
    for(; t !== n;){
        const o = t.nextSibling;
        t.remove(), t = o;
    }
};
const u2 = (e, s, t)=>{
    const r = new Map;
    for(let l = s; l <= t; l++)r.set(e[l], l);
    return r;
}, c2 = e3(class extends i3 {
    constructor(e){
        if (super(e), e.type !== t3.CHILD) throw Error("repeat() can only be used in text expressions");
    }
    dt(e, s, t) {
        let r;
        void 0 === t ? t = s : void 0 !== s && (r = s);
        const l = [], o = [];
        let i = 0;
        for (const s5 of e)l[i] = r ? r(s5, i) : i, o[i] = t(s5, i), i++;
        return {
            values: o,
            keys: l
        };
    }
    render(e, s, t) {
        return this.dt(e, s, t).values;
    }
    update(s, [t, r, c]) {
        var d;
        const a3 = a2(s), { values: p , keys: v  } = this.dt(t, r, c);
        if (!Array.isArray(a3)) return this.ct = v, p;
        const h = null !== (d = this.ct) && void 0 !== d ? d : this.ct = [], m = [];
        let y, x, j = 0, k = a3.length - 1, w = 0, A = p.length - 1;
        for(; j <= k && w <= A;)if (null === a3[j]) j++;
        else if (null === a3[k]) k--;
        else if (h[j] === v[w]) m[w] = c1(a3[j], p[w]), j++, w++;
        else if (h[k] === v[A]) m[A] = c1(a3[k], p[A]), k--, A--;
        else if (h[j] === v[A]) m[A] = c1(a3[j], p[A]), u1(s, m[A + 1], a3[j]), j++, A--;
        else if (h[k] === v[w]) m[w] = c1(a3[k], p[w]), u1(s, a3[j], a3[k]), k--, w++;
        else if (void 0 === y && (y = u2(v, w, A), x = u2(h, j, k)), y.has(h[j])) if (y.has(h[k])) {
            const e = x.get(v[w]), t = void 0 !== e ? a3[e] : null;
            if (null === t) {
                const e = u1(s, a3[j]);
                c1(e, p[w]), m[w] = e;
            } else m[w] = c1(t, p[w]), u1(s, a3[j], t), a3[e] = null;
            w++;
        } else m1(a3[k]), k--;
        else m1(a3[j]), j++;
        for(; w <= A;){
            const e = u1(s, m[A + 1]);
            c1(e, p[w]), m[w++] = e;
        }
        for(; j <= k;){
            const e = a3[j++];
            null !== e && m1(e);
        }
        return this.ct = v, s4(s, m), b;
    }
});
const s6 = Symbol();
class h2 {
    constructor(t, i, s){
        this.t = [], this.i = 0, this.status = 0, this.h = t, this.h.addController(this), this.o = i, this.l = s, this.taskComplete = new Promise((t, i)=>{
            this.u = t, this.v = i;
        });
    }
    hostUpdated() {
        this.m();
    }
    async m() {
        const t = this.l();
        if (this.p(t)) {
            let i, h;
            2 !== this.status && 3 !== this.status || (this.taskComplete = new Promise((t, i)=>{
                this.u = t, this.v = i;
            })), this.status = 1, this.I = void 0, this.P = void 0, this.h.requestUpdate();
            const e = ++this.i;
            try {
                i = await this.o(t);
            } catch (t4) {
                h = t4;
            }
            this.i === e && (i === s6 ? this.status = 0 : (void 0 === h ? (this.status = 2, this.u(i)) : (this.status = 3, this.v(h)), this.P = i, this.I = h), this.h.requestUpdate());
        }
    }
    get value() {
        return this.P;
    }
    get error() {
        return this.I;
    }
    render(t) {
        var i, s, h, e;
        switch(this.status){
            case 0:
                return null === (i = t.initial) || void 0 === i ? void 0 : i.call(t);
            case 1:
                return null === (s = t.pending) || void 0 === s ? void 0 : s.call(t);
            case 2:
                return null === (h = t.complete) || void 0 === h ? void 0 : h.call(t, this.value);
            case 3:
                return null === (e = t.error) || void 0 === e ? void 0 : e.call(t, this.error);
            default:
                this.status;
        }
    }
    p(i) {
        let s = 0;
        const h = this.t;
        this.t = i;
        for (const e of i){
            if (n1(e, h[s])) return !0;
            s++;
        }
        return !1;
    }
}
var __extends;
var __assign;
var __rest;
var __decorate1;
var __param;
var __metadata;
var __awaiter;
var __generator;
var __exportStar;
var __values;
var __read;
var __spread;
var __spreadArrays;
var __spreadArray;
var __await;
var __asyncGenerator;
var __asyncDelegator;
var __asyncValues;
var __makeTemplateObject;
var __importStar;
var __importDefault;
var __classPrivateFieldGet;
var __classPrivateFieldSet;
var __createBinding;
(function(factory) {
    var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {
    };
    if (typeof define === "function" && define.amd) {
        define("tslib", [
            "exports"
        ], function(exports) {
            factory(createExporter(root, createExporter(exports)));
        });
    } else if (typeof module === "object" && typeof module.exports === "object") {
        factory(createExporter(root, createExporter(module.exports)));
    } else {
        factory(createExporter(root));
    }
    function createExporter(exports, previous) {
        if (exports !== root) {
            if (typeof Object.create === "function") {
                Object.defineProperty(exports, "__esModule", {
                    value: true
                });
            } else {
                exports.__esModule = true;
            }
        }
        return function(id, v) {
            return exports[id] = previous ? previous(id, v) : v;
        };
    }
})(function(exporter) {
    var extendStatics = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(d, b) {
        d.__proto__ = b;
    } || function(d, b) {
        for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    __extends = function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    __assign = Object.assign || function(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    __rest = function(s, e) {
        var t = {
        };
        for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function") for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++){
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
        }
        return t;
    };
    __decorate1 = function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    __param = function(paramIndex, decorator) {
        return function(target, key) {
            decorator(target, key, paramIndex);
        };
    };
    __metadata = function(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    };
    __awaiter = function(thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P ? value : new P(function(resolve) {
                resolve(value);
            });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    __generator = function(thisArg, body) {
        var _ = {
            label: 0,
            sent: function() {
                if (t[0] & 1) throw t[1];
                return t[1];
            },
            trys: [],
            ops: []
        }, f, y, t, g;
        return g = {
            next: verb(0),
            "throw": verb(1),
            "return": verb(2)
        }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
            return this;
        }), g;
        function verb(n) {
            return function(v) {
                return step([
                    n,
                    v
                ]);
            };
        }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while(_)try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [
                    op[0] & 2,
                    t.value
                ];
                switch(op[0]){
                    case 0:
                    case 1:
                        t = op;
                        break;
                    case 4:
                        _.label++;
                        return {
                            value: op[1],
                            done: false
                        };
                    case 5:
                        _.label++;
                        y = op[1];
                        op = [
                            0
                        ];
                        continue;
                    case 7:
                        op = _.ops.pop();
                        _.trys.pop();
                        continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;
                            continue;
                        }
                        if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                            _.label = op[1];
                            break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];
                            t = op;
                            break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];
                            _.ops.push(op);
                            break;
                        }
                        if (t[2]) _.ops.pop();
                        _.trys.pop();
                        continue;
                }
                op = body.call(thisArg, _);
            } catch (e) {
                op = [
                    6,
                    e
                ];
                y = 0;
            } finally{
                f = t = 0;
            }
            if (op[0] & 5) throw op[1];
            return {
                value: op[0] ? op[1] : void 0,
                done: true
            };
        }
    };
    __exportStar = function(m, o) {
        for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
    };
    __createBinding = Object.create ? function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
            enumerable: true,
            get: function() {
                return m[k];
            }
        });
    } : function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    };
    __values = function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function() {
                if (o && i >= o.length) o = void 0;
                return {
                    value: o && o[i++],
                    done: !o
                };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    __read = function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
        } catch (error) {
            e = {
                error: error
            };
        } finally{
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            } finally{
                if (e) throw e.error;
            }
        }
        return ar;
    };
    __spread = function() {
        for(var ar = [], i = 0; i < arguments.length; i++)ar = ar.concat(__read(arguments[i]));
        return ar;
    };
    __spreadArrays = function() {
        for(var s = 0, i = 0, il = arguments.length; i < il; i++)s += arguments[i].length;
        for(var r = Array(s), k = 0, i = 0; i < il; i++)for(var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)r[k] = a[j];
        return r;
    };
    __spreadArray = function(to, from, pack) {
        if (pack || arguments.length === 2) for(var i = 0, l = from.length, ar; i < l; i++){
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    };
    __await = function(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    };
    __asyncGenerator = function(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {
        }, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
            return this;
        }, i;
        function verb(n) {
            if (g[n]) i[n] = function(v) {
                return new Promise(function(a, b) {
                    q.push([
                        n,
                        v,
                        a,
                        b
                    ]) > 1 || resume(n, v);
                });
            };
        }
        function resume(n, v) {
            try {
                step(g[n](v));
            } catch (e) {
                settle(q[0][3], e);
            }
        }
        function step(r) {
            r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
        }
        function fulfill(value) {
            resume("next", value);
        }
        function reject(value) {
            resume("throw", value);
        }
        function settle(f, v) {
            if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
        }
    };
    __asyncDelegator = function(o) {
        var i, p;
        return i = {
        }, verb("next"), verb("throw", function(e) {
            throw e;
        }), verb("return"), i[Symbol.iterator] = function() {
            return this;
        }, i;
        function verb(n, f) {
            i[n] = o[n] ? function(v) {
                return (p = !p) ? {
                    value: __await(o[n](v)),
                    done: n === "return"
                } : f ? f(v) : v;
            } : f;
        }
    };
    __asyncValues = function(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {
        }, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
            return this;
        }, i);
        function verb(n) {
            i[n] = o[n] && function(v) {
                return new Promise(function(resolve, reject) {
                    v = o[n](v), settle(resolve, reject, v.done, v.value);
                });
            };
        }
        function settle(resolve, reject, d, v) {
            Promise.resolve(v).then(function(v) {
                resolve({
                    value: v,
                    done: d
                });
            }, reject);
        }
    };
    __makeTemplateObject = function(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", {
                value: raw
            });
        } else {
            cooked.raw = raw;
        }
        return cooked;
    };
    var __setModuleDefault = Object.create ? function(o, v) {
        Object.defineProperty(o, "default", {
            enumerable: true,
            value: v
        });
    } : function(o, v) {
        o["default"] = v;
    };
    __importStar = function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {
        };
        if (mod != null) {
            for(var k in mod)if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
    };
    __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : {
            "default": mod
        };
    };
    __classPrivateFieldGet = function(receiver, state, kind, f) {
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    __classPrivateFieldSet = function(receiver, state, value, kind, f) {
        if (kind === "m") throw new TypeError("Private method is not writable");
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
    };
    exporter("__extends", __extends);
    exporter("__assign", __assign);
    exporter("__rest", __rest);
    exporter("__decorate", __decorate1);
    exporter("__param", __param);
    exporter("__metadata", __metadata);
    exporter("__awaiter", __awaiter);
    exporter("__generator", __generator);
    exporter("__exportStar", __exportStar);
    exporter("__createBinding", __createBinding);
    exporter("__values", __values);
    exporter("__read", __read);
    exporter("__spread", __spread);
    exporter("__spreadArrays", __spreadArrays);
    exporter("__spreadArray", __spreadArray);
    exporter("__await", __await);
    exporter("__asyncGenerator", __asyncGenerator);
    exporter("__asyncDelegator", __asyncDelegator);
    exporter("__asyncValues", __asyncValues);
    exporter("__makeTemplateObject", __makeTemplateObject);
    exporter("__importStar", __importStar);
    exporter("__importDefault", __importDefault);
    exporter("__classPrivateFieldGet", __classPrivateFieldGet);
    exporter("__classPrivateFieldSet", __classPrivateFieldSet);
});
const n4 = (n)=>(e6)=>"function" == typeof e6 ? ((n, e)=>(window.customElements.define(n, e), e)
        )(n, e6) : ((n, e5)=>{
            const { kind: t , elements: i  } = e5;
            return {
                kind: t,
                elements: i,
                finisher (e) {
                    window.customElements.define(n, e);
                }
            };
        })(n, e6)
;
const i5 = (i, e)=>"method" === e.kind && e.descriptor && !("value" in e.descriptor) ? {
        ...e,
        finisher (n) {
            n.createProperty(e.key, i);
        }
    } : {
        kind: "field",
        key: Symbol(),
        placement: "own",
        descriptor: {
        },
        originalKey: e.key,
        initializer () {
            "function" == typeof e.initializer && (this[e.key] = e.initializer.call(this));
        },
        finisher (n) {
            n.createProperty(e.key, i);
        }
    }
;
function e5(e) {
    return (n, t)=>void 0 !== t ? ((i, e, n)=>{
            e.constructor.createProperty(n, i);
        })(e, n, t) : i5(e, n)
    ;
}
function t4(t) {
    return e5({
        ...t,
        state: !0
    });
}
const o4 = ({ finisher: e , descriptor: t  })=>(o, n)=>{
        var r;
        if (void 0 === n) {
            const n = null !== (r = o.originalKey) && void 0 !== r ? r : o.key, i = null != t ? {
                kind: "method",
                placement: "prototype",
                key: n,
                descriptor: t(o.key)
            } : {
                ...o,
                key: n
            };
            return null != e && (i.finisher = function(t) {
                e(t, n);
            }), i;
        }
        {
            const r = o.constructor;
            void 0 !== t && Object.defineProperty(o, n, t(n)), null == e || e(r, n);
        }
    }
;
function e6(e) {
    return o4({
        finisher: (r, t)=>{
            Object.assign(r.prototype[t], e);
        }
    });
}
function i6(i, n) {
    return o4({
        descriptor: (o)=>{
            const t = {
                get () {
                    var o, n;
                    return null !== (n = null === (o = this.renderRoot) || void 0 === o ? void 0 : o.querySelector(i)) && void 0 !== n ? n : null;
                },
                enumerable: !0,
                configurable: !0
            };
            if (n) {
                const n = "symbol" == typeof o ? Symbol() : "__" + o;
                t.get = function() {
                    var o, t;
                    return void 0 === this[n] && (this[n] = null !== (t = null === (o = this.renderRoot) || void 0 === o ? void 0 : o.querySelector(i)) && void 0 !== t ? t : null), this[n];
                };
            }
            return t;
        }
    });
}
function e8(e) {
    return o4({
        descriptor: (r)=>({
                async get () {
                    var r;
                    return await this.updateComplete, null === (r = this.renderRoot) || void 0 === r ? void 0 : r.querySelector(e);
                },
                enumerable: !0,
                configurable: !0
            })
    });
}
function o5(o = "", n = !1, t = "") {
    return o4({
        descriptor: (e)=>({
                get () {
                    var e, r, l;
                    const i = "slot" + (o ? `[name=${o}]` : ":not([name])");
                    let u = null !== (l = null === (r = null === (e = this.renderRoot) || void 0 === e ? void 0 : e.querySelector(i)) || void 0 === r ? void 0 : r.assignedNodes({
                        flatten: n
                    })) && void 0 !== l ? l : [];
                    return t && (u = u.filter((e)=>e.nodeType === Node.ELEMENT_NODE && e.matches(t)
                    )), u;
                },
                enumerable: !0,
                configurable: !0
            })
    });
}
function matches(element, selector) {
    var nativeMatches = element.matches || element.webkitMatchesSelector || element.msMatchesSelector;
    return nativeMatches.call(element, selector);
}
const isNodeElement = (node)=>{
    return node.nodeType === Node.ELEMENT_NODE;
};
function addHasRemoveClass(element) {
    return {
        addClass: (className)=>{
            element.classList.add(className);
        },
        removeClass: (className)=>{
            element.classList.remove(className);
        },
        hasClass: (className)=>element.classList.contains(className)
    };
}
let supportsPassive = false;
const fn = ()=>{
};
const optionsBlock = {
    get passive () {
        supportsPassive = true;
        return false;
    }
};
document.addEventListener('x', fn, optionsBlock);
document.removeEventListener('x', fn);
const supportsPassiveEventListener = supportsPassive;
const deepActiveElementPath = (doc = window.document)=>{
    let activeElement = doc.activeElement;
    const path = [];
    if (!activeElement) {
        return path;
    }
    while(activeElement){
        path.push(activeElement);
        if (activeElement.shadowRoot) {
            activeElement = activeElement.shadowRoot.activeElement;
        } else {
            break;
        }
    }
    return path;
};
const doesElementContainFocus = (element)=>{
    const activePath = deepActiveElementPath();
    if (!activePath.length) {
        return false;
    }
    const deepActiveElement = activePath[activePath.length - 1];
    const focusEv = new Event('check-if-focused', {
        bubbles: true,
        composed: true
    });
    let composedPath = [];
    const listener = (ev)=>{
        composedPath = ev.composedPath();
    };
    document.body.addEventListener('check-if-focused', listener);
    deepActiveElement.dispatchEvent(focusEv);
    document.body.removeEventListener('check-if-focused', listener);
    return composedPath.indexOf(element) !== -1;
};
class BaseElement extends s3 {
    click() {
        if (this.mdcRoot) {
            this.mdcRoot.focus();
            this.mdcRoot.click();
            return;
        }
        super.click();
    }
    createFoundation() {
        if (this.mdcFoundation !== undefined) {
            this.mdcFoundation.destroy();
        }
        if (this.mdcFoundationClass) {
            this.mdcFoundation = new this.mdcFoundationClass(this.createAdapter());
            this.mdcFoundation.init();
        }
    }
    firstUpdated() {
        this.createFoundation();
    }
}
var MDCFoundation = function() {
    function MDCFoundation(adapter) {
        if (adapter === void 0) {
            adapter = {
            };
        }
        this.adapter = adapter;
    }
    Object.defineProperty(MDCFoundation, "cssClasses", {
        get: function() {
            return {
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCFoundation, "strings", {
        get: function() {
            return {
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCFoundation, "numbers", {
        get: function() {
            return {
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCFoundation, "defaultAdapter", {
        get: function() {
            return {
            };
        },
        enumerable: false,
        configurable: true
    });
    MDCFoundation.prototype.init = function() {
    };
    MDCFoundation.prototype.destroy = function() {
    };
    return MDCFoundation;
}();
var cssClasses = {
    BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
    FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
    FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation',
    ROOT: 'mdc-ripple-upgraded',
    UNBOUNDED: 'mdc-ripple-upgraded--unbounded'
};
var strings = {
    VAR_FG_SCALE: '--mdc-ripple-fg-scale',
    VAR_FG_SIZE: '--mdc-ripple-fg-size',
    VAR_FG_TRANSLATE_END: '--mdc-ripple-fg-translate-end',
    VAR_FG_TRANSLATE_START: '--mdc-ripple-fg-translate-start',
    VAR_LEFT: '--mdc-ripple-left',
    VAR_TOP: '--mdc-ripple-top'
};
var numbers = {
    DEACTIVATION_TIMEOUT_MS: 225,
    FG_DEACTIVATION_MS: 150,
    INITIAL_ORIGIN_SCALE: 0.6,
    PADDING: 10,
    TAP_DELAY_MS: 300
};
function getNormalizedEventCoords(evt, pageOffset, clientRect) {
    if (!evt) {
        return {
            x: 0,
            y: 0
        };
    }
    var x = pageOffset.x, y = pageOffset.y;
    var documentX = x + clientRect.left;
    var documentY = y + clientRect.top;
    var normalizedX;
    var normalizedY;
    if (evt.type === 'touchstart') {
        var touchEvent = evt;
        normalizedX = touchEvent.changedTouches[0].pageX - documentX;
        normalizedY = touchEvent.changedTouches[0].pageY - documentY;
    } else {
        var mouseEvent = evt;
        normalizedX = mouseEvent.pageX - documentX;
        normalizedY = mouseEvent.pageY - documentY;
    }
    return {
        x: normalizedX,
        y: normalizedY
    };
}
var ACTIVATION_EVENT_TYPES = [
    'touchstart',
    'pointerdown',
    'mousedown',
    'keydown', 
];
var POINTER_DEACTIVATION_EVENT_TYPES = [
    'touchend',
    'pointerup',
    'mouseup',
    'contextmenu', 
];
var activatedTargets = [];
var MDCRippleFoundation = function(_super) {
    __extends(MDCRippleFoundation, _super);
    function MDCRippleFoundation(adapter) {
        var _this = _super.call(this, __assign(__assign({
        }, MDCRippleFoundation.defaultAdapter), adapter)) || this;
        _this.activationAnimationHasEnded = false;
        _this.activationTimer = 0;
        _this.fgDeactivationRemovalTimer = 0;
        _this.fgScale = '0';
        _this.frame = {
            width: 0,
            height: 0
        };
        _this.initialSize = 0;
        _this.layoutFrame = 0;
        _this.maxRadius = 0;
        _this.unboundedCoords = {
            left: 0,
            top: 0
        };
        _this.activationState = _this.defaultActivationState();
        _this.activationTimerCallback = function() {
            _this.activationAnimationHasEnded = true;
            _this.runDeactivationUXLogicIfReady();
        };
        _this.activateHandler = function(e) {
            _this.activateImpl(e);
        };
        _this.deactivateHandler = function() {
            _this.deactivateImpl();
        };
        _this.focusHandler = function() {
            _this.handleFocus();
        };
        _this.blurHandler = function() {
            _this.handleBlur();
        };
        _this.resizeHandler = function() {
            _this.layout();
        };
        return _this;
    }
    Object.defineProperty(MDCRippleFoundation, "cssClasses", {
        get: function() {
            return cssClasses;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCRippleFoundation, "strings", {
        get: function() {
            return strings;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCRippleFoundation, "numbers", {
        get: function() {
            return numbers;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCRippleFoundation, "defaultAdapter", {
        get: function() {
            return {
                addClass: function() {
                    return undefined;
                },
                browserSupportsCssVars: function() {
                    return true;
                },
                computeBoundingRect: function() {
                    return {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        width: 0,
                        height: 0
                    };
                },
                containsEventTarget: function() {
                    return true;
                },
                deregisterDocumentInteractionHandler: function() {
                    return undefined;
                },
                deregisterInteractionHandler: function() {
                    return undefined;
                },
                deregisterResizeHandler: function() {
                    return undefined;
                },
                getWindowPageOffset: function() {
                    return {
                        x: 0,
                        y: 0
                    };
                },
                isSurfaceActive: function() {
                    return true;
                },
                isSurfaceDisabled: function() {
                    return true;
                },
                isUnbounded: function() {
                    return true;
                },
                registerDocumentInteractionHandler: function() {
                    return undefined;
                },
                registerInteractionHandler: function() {
                    return undefined;
                },
                registerResizeHandler: function() {
                    return undefined;
                },
                removeClass: function() {
                    return undefined;
                },
                updateCssVariable: function() {
                    return undefined;
                }
            };
        },
        enumerable: false,
        configurable: true
    });
    MDCRippleFoundation.prototype.init = function() {
        var _this = this;
        var supportsPressRipple = this.supportsPressRipple();
        this.registerRootHandlers(supportsPressRipple);
        if (supportsPressRipple) {
            var _a = MDCRippleFoundation.cssClasses, ROOT_1 = _a.ROOT, UNBOUNDED_1 = _a.UNBOUNDED;
            requestAnimationFrame(function() {
                _this.adapter.addClass(ROOT_1);
                if (_this.adapter.isUnbounded()) {
                    _this.adapter.addClass(UNBOUNDED_1);
                    _this.layoutInternal();
                }
            });
        }
    };
    MDCRippleFoundation.prototype.destroy = function() {
        var _this = this;
        if (this.supportsPressRipple()) {
            if (this.activationTimer) {
                clearTimeout(this.activationTimer);
                this.activationTimer = 0;
                this.adapter.removeClass(MDCRippleFoundation.cssClasses.FG_ACTIVATION);
            }
            if (this.fgDeactivationRemovalTimer) {
                clearTimeout(this.fgDeactivationRemovalTimer);
                this.fgDeactivationRemovalTimer = 0;
                this.adapter.removeClass(MDCRippleFoundation.cssClasses.FG_DEACTIVATION);
            }
            var _a = MDCRippleFoundation.cssClasses, ROOT_2 = _a.ROOT, UNBOUNDED_2 = _a.UNBOUNDED;
            requestAnimationFrame(function() {
                _this.adapter.removeClass(ROOT_2);
                _this.adapter.removeClass(UNBOUNDED_2);
                _this.removeCssVars();
            });
        }
        this.deregisterRootHandlers();
        this.deregisterDeactivationHandlers();
    };
    MDCRippleFoundation.prototype.activate = function(evt) {
        this.activateImpl(evt);
    };
    MDCRippleFoundation.prototype.deactivate = function() {
        this.deactivateImpl();
    };
    MDCRippleFoundation.prototype.layout = function() {
        var _this = this;
        if (this.layoutFrame) {
            cancelAnimationFrame(this.layoutFrame);
        }
        this.layoutFrame = requestAnimationFrame(function() {
            _this.layoutInternal();
            _this.layoutFrame = 0;
        });
    };
    MDCRippleFoundation.prototype.setUnbounded = function(unbounded) {
        var UNBOUNDED = MDCRippleFoundation.cssClasses.UNBOUNDED;
        if (unbounded) {
            this.adapter.addClass(UNBOUNDED);
        } else {
            this.adapter.removeClass(UNBOUNDED);
        }
    };
    MDCRippleFoundation.prototype.handleFocus = function() {
        var _this = this;
        requestAnimationFrame(function() {
            return _this.adapter.addClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
        });
    };
    MDCRippleFoundation.prototype.handleBlur = function() {
        var _this = this;
        requestAnimationFrame(function() {
            return _this.adapter.removeClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
        });
    };
    MDCRippleFoundation.prototype.supportsPressRipple = function() {
        return this.adapter.browserSupportsCssVars();
    };
    MDCRippleFoundation.prototype.defaultActivationState = function() {
        return {
            activationEvent: undefined,
            hasDeactivationUXRun: false,
            isActivated: false,
            isProgrammatic: false,
            wasActivatedByPointer: false,
            wasElementMadeActive: false
        };
    };
    MDCRippleFoundation.prototype.registerRootHandlers = function(supportsPressRipple) {
        var e_1, _a;
        if (supportsPressRipple) {
            try {
                for(var ACTIVATION_EVENT_TYPES_1 = __values(ACTIVATION_EVENT_TYPES), ACTIVATION_EVENT_TYPES_1_1 = ACTIVATION_EVENT_TYPES_1.next(); !ACTIVATION_EVENT_TYPES_1_1.done; ACTIVATION_EVENT_TYPES_1_1 = ACTIVATION_EVENT_TYPES_1.next()){
                    var evtType = ACTIVATION_EVENT_TYPES_1_1.value;
                    this.adapter.registerInteractionHandler(evtType, this.activateHandler);
                }
            } catch (e_1_1) {
                e_1 = {
                    error: e_1_1
                };
            } finally{
                try {
                    if (ACTIVATION_EVENT_TYPES_1_1 && !ACTIVATION_EVENT_TYPES_1_1.done && (_a = ACTIVATION_EVENT_TYPES_1.return)) _a.call(ACTIVATION_EVENT_TYPES_1);
                } finally{
                    if (e_1) throw e_1.error;
                }
            }
            if (this.adapter.isUnbounded()) {
                this.adapter.registerResizeHandler(this.resizeHandler);
            }
        }
        this.adapter.registerInteractionHandler('focus', this.focusHandler);
        this.adapter.registerInteractionHandler('blur', this.blurHandler);
    };
    MDCRippleFoundation.prototype.registerDeactivationHandlers = function(evt) {
        var e_2, _a;
        if (evt.type === 'keydown') {
            this.adapter.registerInteractionHandler('keyup', this.deactivateHandler);
        } else {
            try {
                for(var POINTER_DEACTIVATION_EVENT_TYPES_1 = __values(POINTER_DEACTIVATION_EVENT_TYPES), POINTER_DEACTIVATION_EVENT_TYPES_1_1 = POINTER_DEACTIVATION_EVENT_TYPES_1.next(); !POINTER_DEACTIVATION_EVENT_TYPES_1_1.done; POINTER_DEACTIVATION_EVENT_TYPES_1_1 = POINTER_DEACTIVATION_EVENT_TYPES_1.next()){
                    var evtType = POINTER_DEACTIVATION_EVENT_TYPES_1_1.value;
                    this.adapter.registerDocumentInteractionHandler(evtType, this.deactivateHandler);
                }
            } catch (e_2_1) {
                e_2 = {
                    error: e_2_1
                };
            } finally{
                try {
                    if (POINTER_DEACTIVATION_EVENT_TYPES_1_1 && !POINTER_DEACTIVATION_EVENT_TYPES_1_1.done && (_a = POINTER_DEACTIVATION_EVENT_TYPES_1.return)) _a.call(POINTER_DEACTIVATION_EVENT_TYPES_1);
                } finally{
                    if (e_2) throw e_2.error;
                }
            }
        }
    };
    MDCRippleFoundation.prototype.deregisterRootHandlers = function() {
        var e_3, _a;
        try {
            for(var ACTIVATION_EVENT_TYPES_2 = __values(ACTIVATION_EVENT_TYPES), ACTIVATION_EVENT_TYPES_2_1 = ACTIVATION_EVENT_TYPES_2.next(); !ACTIVATION_EVENT_TYPES_2_1.done; ACTIVATION_EVENT_TYPES_2_1 = ACTIVATION_EVENT_TYPES_2.next()){
                var evtType = ACTIVATION_EVENT_TYPES_2_1.value;
                this.adapter.deregisterInteractionHandler(evtType, this.activateHandler);
            }
        } catch (e_3_1) {
            e_3 = {
                error: e_3_1
            };
        } finally{
            try {
                if (ACTIVATION_EVENT_TYPES_2_1 && !ACTIVATION_EVENT_TYPES_2_1.done && (_a = ACTIVATION_EVENT_TYPES_2.return)) _a.call(ACTIVATION_EVENT_TYPES_2);
            } finally{
                if (e_3) throw e_3.error;
            }
        }
        this.adapter.deregisterInteractionHandler('focus', this.focusHandler);
        this.adapter.deregisterInteractionHandler('blur', this.blurHandler);
        if (this.adapter.isUnbounded()) {
            this.adapter.deregisterResizeHandler(this.resizeHandler);
        }
    };
    MDCRippleFoundation.prototype.deregisterDeactivationHandlers = function() {
        var e_4, _a;
        this.adapter.deregisterInteractionHandler('keyup', this.deactivateHandler);
        try {
            for(var POINTER_DEACTIVATION_EVENT_TYPES_2 = __values(POINTER_DEACTIVATION_EVENT_TYPES), POINTER_DEACTIVATION_EVENT_TYPES_2_1 = POINTER_DEACTIVATION_EVENT_TYPES_2.next(); !POINTER_DEACTIVATION_EVENT_TYPES_2_1.done; POINTER_DEACTIVATION_EVENT_TYPES_2_1 = POINTER_DEACTIVATION_EVENT_TYPES_2.next()){
                var evtType = POINTER_DEACTIVATION_EVENT_TYPES_2_1.value;
                this.adapter.deregisterDocumentInteractionHandler(evtType, this.deactivateHandler);
            }
        } catch (e_4_1) {
            e_4 = {
                error: e_4_1
            };
        } finally{
            try {
                if (POINTER_DEACTIVATION_EVENT_TYPES_2_1 && !POINTER_DEACTIVATION_EVENT_TYPES_2_1.done && (_a = POINTER_DEACTIVATION_EVENT_TYPES_2.return)) _a.call(POINTER_DEACTIVATION_EVENT_TYPES_2);
            } finally{
                if (e_4) throw e_4.error;
            }
        }
    };
    MDCRippleFoundation.prototype.removeCssVars = function() {
        var _this = this;
        var rippleStrings = MDCRippleFoundation.strings;
        var keys = Object.keys(rippleStrings);
        keys.forEach(function(key) {
            if (key.indexOf('VAR_') === 0) {
                _this.adapter.updateCssVariable(rippleStrings[key], null);
            }
        });
    };
    MDCRippleFoundation.prototype.activateImpl = function(evt) {
        var _this = this;
        if (this.adapter.isSurfaceDisabled()) {
            return;
        }
        var activationState = this.activationState;
        if (activationState.isActivated) {
            return;
        }
        var previousActivationEvent = this.previousActivationEvent;
        var isSameInteraction = previousActivationEvent && evt !== undefined && previousActivationEvent.type !== evt.type;
        if (isSameInteraction) {
            return;
        }
        activationState.isActivated = true;
        activationState.isProgrammatic = evt === undefined;
        activationState.activationEvent = evt;
        activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : evt !== undefined && (evt.type === 'mousedown' || evt.type === 'touchstart' || evt.type === 'pointerdown');
        var hasActivatedChild = evt !== undefined && activatedTargets.length > 0 && activatedTargets.some(function(target) {
            return _this.adapter.containsEventTarget(target);
        });
        if (hasActivatedChild) {
            this.resetActivationState();
            return;
        }
        if (evt !== undefined) {
            activatedTargets.push(evt.target);
            this.registerDeactivationHandlers(evt);
        }
        activationState.wasElementMadeActive = this.checkElementMadeActive(evt);
        if (activationState.wasElementMadeActive) {
            this.animateActivation();
        }
        requestAnimationFrame(function() {
            activatedTargets = [];
            if (!activationState.wasElementMadeActive && evt !== undefined && (evt.key === ' ' || evt.keyCode === 32)) {
                activationState.wasElementMadeActive = _this.checkElementMadeActive(evt);
                if (activationState.wasElementMadeActive) {
                    _this.animateActivation();
                }
            }
            if (!activationState.wasElementMadeActive) {
                _this.activationState = _this.defaultActivationState();
            }
        });
    };
    MDCRippleFoundation.prototype.checkElementMadeActive = function(evt) {
        return evt !== undefined && evt.type === 'keydown' ? this.adapter.isSurfaceActive() : true;
    };
    MDCRippleFoundation.prototype.animateActivation = function() {
        var _this = this;
        var _a = MDCRippleFoundation.strings, VAR_FG_TRANSLATE_START = _a.VAR_FG_TRANSLATE_START, VAR_FG_TRANSLATE_END = _a.VAR_FG_TRANSLATE_END;
        var _b = MDCRippleFoundation.cssClasses, FG_DEACTIVATION = _b.FG_DEACTIVATION, FG_ACTIVATION = _b.FG_ACTIVATION;
        var DEACTIVATION_TIMEOUT_MS = MDCRippleFoundation.numbers.DEACTIVATION_TIMEOUT_MS;
        this.layoutInternal();
        var translateStart = '';
        var translateEnd = '';
        if (!this.adapter.isUnbounded()) {
            var _c = this.getFgTranslationCoordinates(), startPoint = _c.startPoint, endPoint = _c.endPoint;
            translateStart = startPoint.x + "px, " + startPoint.y + "px";
            translateEnd = endPoint.x + "px, " + endPoint.y + "px";
        }
        this.adapter.updateCssVariable(VAR_FG_TRANSLATE_START, translateStart);
        this.adapter.updateCssVariable(VAR_FG_TRANSLATE_END, translateEnd);
        clearTimeout(this.activationTimer);
        clearTimeout(this.fgDeactivationRemovalTimer);
        this.rmBoundedActivationClasses();
        this.adapter.removeClass(FG_DEACTIVATION);
        this.adapter.computeBoundingRect();
        this.adapter.addClass(FG_ACTIVATION);
        this.activationTimer = setTimeout(function() {
            _this.activationTimerCallback();
        }, DEACTIVATION_TIMEOUT_MS);
    };
    MDCRippleFoundation.prototype.getFgTranslationCoordinates = function() {
        var _a = this.activationState, activationEvent = _a.activationEvent, wasActivatedByPointer = _a.wasActivatedByPointer;
        var startPoint;
        if (wasActivatedByPointer) {
            startPoint = getNormalizedEventCoords(activationEvent, this.adapter.getWindowPageOffset(), this.adapter.computeBoundingRect());
        } else {
            startPoint = {
                x: this.frame.width / 2,
                y: this.frame.height / 2
            };
        }
        startPoint = {
            x: startPoint.x - this.initialSize / 2,
            y: startPoint.y - this.initialSize / 2
        };
        var endPoint = {
            x: this.frame.width / 2 - this.initialSize / 2,
            y: this.frame.height / 2 - this.initialSize / 2
        };
        return {
            startPoint: startPoint,
            endPoint: endPoint
        };
    };
    MDCRippleFoundation.prototype.runDeactivationUXLogicIfReady = function() {
        var _this = this;
        var FG_DEACTIVATION = MDCRippleFoundation.cssClasses.FG_DEACTIVATION;
        var _a = this.activationState, hasDeactivationUXRun = _a.hasDeactivationUXRun, isActivated = _a.isActivated;
        var activationHasEnded = hasDeactivationUXRun || !isActivated;
        if (activationHasEnded && this.activationAnimationHasEnded) {
            this.rmBoundedActivationClasses();
            this.adapter.addClass(FG_DEACTIVATION);
            this.fgDeactivationRemovalTimer = setTimeout(function() {
                _this.adapter.removeClass(FG_DEACTIVATION);
            }, numbers.FG_DEACTIVATION_MS);
        }
    };
    MDCRippleFoundation.prototype.rmBoundedActivationClasses = function() {
        var FG_ACTIVATION = MDCRippleFoundation.cssClasses.FG_ACTIVATION;
        this.adapter.removeClass(FG_ACTIVATION);
        this.activationAnimationHasEnded = false;
        this.adapter.computeBoundingRect();
    };
    MDCRippleFoundation.prototype.resetActivationState = function() {
        var _this = this;
        this.previousActivationEvent = this.activationState.activationEvent;
        this.activationState = this.defaultActivationState();
        setTimeout(function() {
            return _this.previousActivationEvent = undefined;
        }, MDCRippleFoundation.numbers.TAP_DELAY_MS);
    };
    MDCRippleFoundation.prototype.deactivateImpl = function() {
        var _this = this;
        var activationState = this.activationState;
        if (!activationState.isActivated) {
            return;
        }
        var state = __assign({
        }, activationState);
        if (activationState.isProgrammatic) {
            requestAnimationFrame(function() {
                _this.animateDeactivation(state);
            });
            this.resetActivationState();
        } else {
            this.deregisterDeactivationHandlers();
            requestAnimationFrame(function() {
                _this.activationState.hasDeactivationUXRun = true;
                _this.animateDeactivation(state);
                _this.resetActivationState();
            });
        }
    };
    MDCRippleFoundation.prototype.animateDeactivation = function(_a) {
        var wasActivatedByPointer = _a.wasActivatedByPointer, wasElementMadeActive = _a.wasElementMadeActive;
        if (wasActivatedByPointer || wasElementMadeActive) {
            this.runDeactivationUXLogicIfReady();
        }
    };
    MDCRippleFoundation.prototype.layoutInternal = function() {
        var _this = this;
        this.frame = this.adapter.computeBoundingRect();
        var maxDim = Math.max(this.frame.height, this.frame.width);
        var getBoundedRadius = function() {
            var hypotenuse = Math.sqrt(Math.pow(_this.frame.width, 2) + Math.pow(_this.frame.height, 2));
            return hypotenuse + MDCRippleFoundation.numbers.PADDING;
        };
        this.maxRadius = this.adapter.isUnbounded() ? maxDim : getBoundedRadius();
        var initialSize = Math.floor(maxDim * MDCRippleFoundation.numbers.INITIAL_ORIGIN_SCALE);
        if (this.adapter.isUnbounded() && initialSize % 2 !== 0) {
            this.initialSize = initialSize - 1;
        } else {
            this.initialSize = initialSize;
        }
        this.fgScale = "" + this.maxRadius / this.initialSize;
        this.updateLayoutCssVars();
    };
    MDCRippleFoundation.prototype.updateLayoutCssVars = function() {
        var _a = MDCRippleFoundation.strings, VAR_FG_SIZE = _a.VAR_FG_SIZE, VAR_LEFT = _a.VAR_LEFT, VAR_TOP = _a.VAR_TOP, VAR_FG_SCALE = _a.VAR_FG_SCALE;
        this.adapter.updateCssVariable(VAR_FG_SIZE, this.initialSize + "px");
        this.adapter.updateCssVariable(VAR_FG_SCALE, this.fgScale);
        if (this.adapter.isUnbounded()) {
            this.unboundedCoords = {
                left: Math.round(this.frame.width / 2 - this.initialSize / 2),
                top: Math.round(this.frame.height / 2 - this.initialSize / 2)
            };
            this.adapter.updateCssVariable(VAR_LEFT, this.unboundedCoords.left + "px");
            this.adapter.updateCssVariable(VAR_TOP, this.unboundedCoords.top + "px");
        }
    };
    return MDCRippleFoundation;
}(MDCFoundation);
const o6 = e3(class extends i3 {
    constructor(t1){
        var i;
        if (super(t1), t1.type !== t3.ATTRIBUTE || "class" !== t1.name || (null === (i = t1.strings) || void 0 === i ? void 0 : i.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
    }
    render(t) {
        return " " + Object.keys(t).filter((i)=>t[i]
        ).join(" ") + " ";
    }
    update(i, [s]) {
        var r, o;
        if (void 0 === this.st) {
            this.st = new Set, void 0 !== i.strings && (this.et = new Set(i.strings.join(" ").split(/\s/).filter((t)=>"" !== t
            )));
            for(const t in s)s[t] && !(null === (r = this.et) || void 0 === r ? void 0 : r.has(t)) && this.st.add(t);
            return this.render(s);
        }
        const e = i.element.classList;
        this.st.forEach((t)=>{
            t in s || (e.remove(t), this.st.delete(t));
        });
        for(const t in s){
            const i = !!s[t];
            i === this.st.has(t) || (null === (o = this.et) || void 0 === o ? void 0 : o.has(t)) || (i ? (e.add(t), this.st.add(t)) : (e.remove(t), this.st.delete(t)));
        }
        return b;
    }
});
const i7 = e3(class extends i3 {
    constructor(t1){
        var e;
        if (super(t1), t1.type !== t3.ATTRIBUTE || "style" !== t1.name || (null === (e = t1.strings) || void 0 === e ? void 0 : e.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
    }
    render(t) {
        return Object.keys(t).reduce((e, r)=>{
            const s = t[r];
            return null == s ? e : e + `${r = r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s};`;
        }, "");
    }
    update(e, [r]) {
        const { style: s  } = e.element;
        if (void 0 === this.ut) {
            this.ut = new Set;
            for(const t in r)this.ut.add(t);
            return this.render(r);
        }
        this.ut.forEach((t)=>{
            null == r[t] && (this.ut.delete(t), t.includes("-") ? s.removeProperty(t) : s[t] = "");
        });
        for(const t in r){
            const e = r[t];
            null != e && (this.ut.add(t), t.includes("-") ? s.setProperty(t, e) : s[t] = e);
        }
        return b;
    }
});
class RippleBase extends BaseElement {
    constructor(){
        super(...arguments);
        this.primary = false;
        this.accent = false;
        this.unbounded = false;
        this.disabled = false;
        this.activated = false;
        this.selected = false;
        this.internalUseStateLayerCustomProperties = false;
        this.hovering = false;
        this.bgFocused = false;
        this.fgActivation = false;
        this.fgDeactivation = false;
        this.fgScale = '';
        this.fgSize = '';
        this.translateStart = '';
        this.translateEnd = '';
        this.leftPos = '';
        this.topPos = '';
        this.mdcFoundationClass = MDCRippleFoundation;
    }
    get isActive() {
        return matches(this.parentElement || this, ':active');
    }
    createAdapter() {
        return {
            browserSupportsCssVars: ()=>true
            ,
            isUnbounded: ()=>this.unbounded
            ,
            isSurfaceActive: ()=>this.isActive
            ,
            isSurfaceDisabled: ()=>this.disabled
            ,
            addClass: (className)=>{
                switch(className){
                    case 'mdc-ripple-upgraded--background-focused':
                        this.bgFocused = true;
                        break;
                    case 'mdc-ripple-upgraded--foreground-activation':
                        this.fgActivation = true;
                        break;
                    case 'mdc-ripple-upgraded--foreground-deactivation':
                        this.fgDeactivation = true;
                        break;
                    default:
                        break;
                }
            },
            removeClass: (className)=>{
                switch(className){
                    case 'mdc-ripple-upgraded--background-focused':
                        this.bgFocused = false;
                        break;
                    case 'mdc-ripple-upgraded--foreground-activation':
                        this.fgActivation = false;
                        break;
                    case 'mdc-ripple-upgraded--foreground-deactivation':
                        this.fgDeactivation = false;
                        break;
                    default:
                        break;
                }
            },
            containsEventTarget: ()=>true
            ,
            registerInteractionHandler: ()=>undefined
            ,
            deregisterInteractionHandler: ()=>undefined
            ,
            registerDocumentInteractionHandler: ()=>undefined
            ,
            deregisterDocumentInteractionHandler: ()=>undefined
            ,
            registerResizeHandler: ()=>undefined
            ,
            deregisterResizeHandler: ()=>undefined
            ,
            updateCssVariable: (varName, value)=>{
                switch(varName){
                    case '--mdc-ripple-fg-scale':
                        this.fgScale = value;
                        break;
                    case '--mdc-ripple-fg-size':
                        this.fgSize = value;
                        break;
                    case '--mdc-ripple-fg-translate-end':
                        this.translateEnd = value;
                        break;
                    case '--mdc-ripple-fg-translate-start':
                        this.translateStart = value;
                        break;
                    case '--mdc-ripple-left':
                        this.leftPos = value;
                        break;
                    case '--mdc-ripple-top':
                        this.topPos = value;
                        break;
                    default:
                        break;
                }
            },
            computeBoundingRect: ()=>(this.parentElement || this).getBoundingClientRect()
            ,
            getWindowPageOffset: ()=>({
                    x: window.pageXOffset,
                    y: window.pageYOffset
                })
        };
    }
    startPress(ev) {
        this.waitForFoundation(()=>{
            this.mdcFoundation.activate(ev);
        });
    }
    endPress() {
        this.waitForFoundation(()=>{
            this.mdcFoundation.deactivate();
        });
    }
    startFocus() {
        this.waitForFoundation(()=>{
            this.mdcFoundation.handleFocus();
        });
    }
    endFocus() {
        this.waitForFoundation(()=>{
            this.mdcFoundation.handleBlur();
        });
    }
    startHover() {
        this.hovering = true;
    }
    endHover() {
        this.hovering = false;
    }
    waitForFoundation(fn) {
        if (this.mdcFoundation) {
            fn();
        } else {
            this.updateComplete.then(fn);
        }
    }
    update(changedProperties) {
        if (changedProperties.has('disabled')) {
            if (this.disabled) {
                this.endHover();
            }
        }
        super.update(changedProperties);
    }
    render() {
        const shouldActivateInPrimary = this.activated && (this.primary || !this.accent);
        const shouldSelectInPrimary = this.selected && (this.primary || !this.accent);
        const classes = {
            'mdc-ripple-surface--accent': this.accent,
            'mdc-ripple-surface--primary--activated': shouldActivateInPrimary,
            'mdc-ripple-surface--accent--activated': this.accent && this.activated,
            'mdc-ripple-surface--primary--selected': shouldSelectInPrimary,
            'mdc-ripple-surface--accent--selected': this.accent && this.selected,
            'mdc-ripple-surface--disabled': this.disabled,
            'mdc-ripple-surface--hover': this.hovering,
            'mdc-ripple-surface--primary': this.primary,
            'mdc-ripple-surface--selected': this.selected,
            'mdc-ripple-upgraded--background-focused': this.bgFocused,
            'mdc-ripple-upgraded--foreground-activation': this.fgActivation,
            'mdc-ripple-upgraded--foreground-deactivation': this.fgDeactivation,
            'mdc-ripple-upgraded--unbounded': this.unbounded,
            'mdc-ripple-surface--internal-use-state-layer-custom-properties': this.internalUseStateLayerCustomProperties
        };
        return p`
        <div class="mdc-ripple-surface mdc-ripple-upgraded ${o6(classes)}"
          style="${i7({
            '--mdc-ripple-fg-scale': this.fgScale,
            '--mdc-ripple-fg-size': this.fgSize,
            '--mdc-ripple-fg-translate-end': this.translateEnd,
            '--mdc-ripple-fg-translate-start': this.translateStart,
            '--mdc-ripple-left': this.leftPos,
            '--mdc-ripple-top': this.topPos
        })}"></div>`;
    }
}
__decorate([
    i6('.mdc-ripple-surface')
], RippleBase.prototype, "mdcRoot", void 0);
__decorate([
    e5({
        type: Boolean
    })
], RippleBase.prototype, "primary", void 0);
__decorate([
    e5({
        type: Boolean
    })
], RippleBase.prototype, "accent", void 0);
__decorate([
    e5({
        type: Boolean
    })
], RippleBase.prototype, "unbounded", void 0);
__decorate([
    e5({
        type: Boolean
    })
], RippleBase.prototype, "disabled", void 0);
__decorate([
    e5({
        type: Boolean
    })
], RippleBase.prototype, "activated", void 0);
__decorate([
    e5({
        type: Boolean
    })
], RippleBase.prototype, "selected", void 0);
__decorate([
    e5({
        type: Boolean
    })
], RippleBase.prototype, "internalUseStateLayerCustomProperties", void 0);
__decorate([
    t4()
], RippleBase.prototype, "hovering", void 0);
__decorate([
    t4()
], RippleBase.prototype, "bgFocused", void 0);
__decorate([
    t4()
], RippleBase.prototype, "fgActivation", void 0);
__decorate([
    t4()
], RippleBase.prototype, "fgDeactivation", void 0);
__decorate([
    t4()
], RippleBase.prototype, "fgScale", void 0);
__decorate([
    t4()
], RippleBase.prototype, "fgSize", void 0);
__decorate([
    t4()
], RippleBase.prototype, "translateStart", void 0);
__decorate([
    t4()
], RippleBase.prototype, "translateEnd", void 0);
__decorate([
    t4()
], RippleBase.prototype, "leftPos", void 0);
__decorate([
    t4()
], RippleBase.prototype, "topPos", void 0);
const styles = r`.mdc-ripple-surface{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0);will-change:transform,opacity;position:relative;outline:none;overflow:hidden}.mdc-ripple-surface::before,.mdc-ripple-surface::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-ripple-surface::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1;z-index:var(--mdc-ripple-z-index, 1)}.mdc-ripple-surface::after{z-index:0;z-index:var(--mdc-ripple-z-index, 0)}.mdc-ripple-surface.mdc-ripple-upgraded::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-ripple-surface.mdc-ripple-upgraded::after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-ripple-surface.mdc-ripple-upgraded--unbounded::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-activation::after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-deactivation::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-ripple-surface::before,.mdc-ripple-surface::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-ripple-surface.mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded],.mdc-ripple-upgraded--unbounded{overflow:visible}.mdc-ripple-surface[data-mdc-ripple-is-unbounded]::before,.mdc-ripple-surface[data-mdc-ripple-is-unbounded]::after,.mdc-ripple-upgraded--unbounded::before,.mdc-ripple-upgraded--unbounded::after{top:calc(50% - 50%);left:calc(50% - 50%);width:100%;height:100%}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded::before,.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded::after,.mdc-ripple-upgraded--unbounded.mdc-ripple-upgraded::before,.mdc-ripple-upgraded--unbounded.mdc-ripple-upgraded::after{top:var(--mdc-ripple-top, calc(50% - 50%));left:var(--mdc-ripple-left, calc(50% - 50%));width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded::after,.mdc-ripple-upgraded--unbounded.mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-ripple-surface::before,.mdc-ripple-surface::after{background-color:#000;background-color:var(--mdc-ripple-color, #000)}.mdc-ripple-surface:hover::before,.mdc-ripple-surface.mdc-ripple-surface--hover::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-ripple-surface.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-ripple-surface:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}:host{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;display:block}:host .mdc-ripple-surface{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;will-change:unset}.mdc-ripple-surface--primary::before,.mdc-ripple-surface--primary::after{background-color:#6200ee;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #6200ee))}.mdc-ripple-surface--primary:hover::before,.mdc-ripple-surface--primary.mdc-ripple-surface--hover::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-ripple-surface--primary.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface--primary.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface--primary--activated::before{opacity:0.12;opacity:var(--mdc-ripple-activated-opacity, 0.12)}.mdc-ripple-surface--primary--activated::before,.mdc-ripple-surface--primary--activated::after{background-color:#6200ee;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #6200ee))}.mdc-ripple-surface--primary--activated:hover::before,.mdc-ripple-surface--primary--activated.mdc-ripple-surface--hover::before{opacity:0.16;opacity:var(--mdc-ripple-hover-opacity, 0.16)}.mdc-ripple-surface--primary--activated.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--primary--activated:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-focus-opacity, 0.24)}.mdc-ripple-surface--primary--activated:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--primary--activated:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-press-opacity, 0.24)}.mdc-ripple-surface--primary--activated.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.24)}.mdc-ripple-surface--primary--selected::before{opacity:0.08;opacity:var(--mdc-ripple-selected-opacity, 0.08)}.mdc-ripple-surface--primary--selected::before,.mdc-ripple-surface--primary--selected::after{background-color:#6200ee;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #6200ee))}.mdc-ripple-surface--primary--selected:hover::before,.mdc-ripple-surface--primary--selected.mdc-ripple-surface--hover::before{opacity:0.12;opacity:var(--mdc-ripple-hover-opacity, 0.12)}.mdc-ripple-surface--primary--selected.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--primary--selected:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.2;opacity:var(--mdc-ripple-focus-opacity, 0.2)}.mdc-ripple-surface--primary--selected:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--primary--selected:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.2;opacity:var(--mdc-ripple-press-opacity, 0.2)}.mdc-ripple-surface--primary--selected.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.2)}.mdc-ripple-surface--accent::before,.mdc-ripple-surface--accent::after{background-color:#018786;background-color:var(--mdc-ripple-color, var(--mdc-theme-secondary, #018786))}.mdc-ripple-surface--accent:hover::before,.mdc-ripple-surface--accent.mdc-ripple-surface--hover::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-ripple-surface--accent.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface--accent.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface--accent--activated::before{opacity:0.12;opacity:var(--mdc-ripple-activated-opacity, 0.12)}.mdc-ripple-surface--accent--activated::before,.mdc-ripple-surface--accent--activated::after{background-color:#018786;background-color:var(--mdc-ripple-color, var(--mdc-theme-secondary, #018786))}.mdc-ripple-surface--accent--activated:hover::before,.mdc-ripple-surface--accent--activated.mdc-ripple-surface--hover::before{opacity:0.16;opacity:var(--mdc-ripple-hover-opacity, 0.16)}.mdc-ripple-surface--accent--activated.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--accent--activated:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-focus-opacity, 0.24)}.mdc-ripple-surface--accent--activated:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--accent--activated:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-press-opacity, 0.24)}.mdc-ripple-surface--accent--activated.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.24)}.mdc-ripple-surface--accent--selected::before{opacity:0.08;opacity:var(--mdc-ripple-selected-opacity, 0.08)}.mdc-ripple-surface--accent--selected::before,.mdc-ripple-surface--accent--selected::after{background-color:#018786;background-color:var(--mdc-ripple-color, var(--mdc-theme-secondary, #018786))}.mdc-ripple-surface--accent--selected:hover::before,.mdc-ripple-surface--accent--selected.mdc-ripple-surface--hover::before{opacity:0.12;opacity:var(--mdc-ripple-hover-opacity, 0.12)}.mdc-ripple-surface--accent--selected.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--accent--selected:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.2;opacity:var(--mdc-ripple-focus-opacity, 0.2)}.mdc-ripple-surface--accent--selected:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--accent--selected:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.2;opacity:var(--mdc-ripple-press-opacity, 0.2)}.mdc-ripple-surface--accent--selected.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.2)}.mdc-ripple-surface--disabled{opacity:0}.mdc-ripple-surface--internal-use-state-layer-custom-properties::before,.mdc-ripple-surface--internal-use-state-layer-custom-properties::after{background-color:#000;background-color:var(--mdc-ripple-hover-state-layer-color, #000)}.mdc-ripple-surface--internal-use-state-layer-custom-properties:hover::before,.mdc-ripple-surface--internal-use-state-layer-custom-properties.mdc-ripple-surface--hover::before{opacity:0.04;opacity:var(--mdc-ripple-hover-state-layer-opacity, 0.04)}.mdc-ripple-surface--internal-use-state-layer-custom-properties.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--internal-use-state-layer-custom-properties:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-state-layer-opacity, 0.12)}.mdc-ripple-surface--internal-use-state-layer-custom-properties:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--internal-use-state-layer-custom-properties:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-pressed-state-layer-opacity, 0.12)}.mdc-ripple-surface--internal-use-state-layer-custom-properties.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-pressed-state-layer-opacity, 0.12)}`;
let Ripple1 = class Ripple extends RippleBase {
};
Ripple1.styles = [
    styles
];
Ripple1 = __decorate([
    n4('mwc-ripple')
], Ripple1);
const observer = (observer)=>(proto, propName)=>{
        if (!proto.constructor._observers) {
            proto.constructor._observers = new Map();
            const userUpdated = proto.updated;
            proto.updated = function(changedProperties) {
                userUpdated.call(this, changedProperties);
                changedProperties.forEach((v, k)=>{
                    const observers = this.constructor._observers;
                    const observer = observers.get(k);
                    if (observer !== undefined) {
                        observer.call(this, this[k], v);
                    }
                });
            };
        } else if (!proto.constructor.hasOwnProperty('_observers')) {
            const observers = proto.constructor._observers;
            proto.constructor._observers = new Map();
            observers.forEach((v, k)=>proto.constructor._observers.set(k, v)
            );
        }
        proto.constructor._observers.set(propName, observer);
    }
;
class RippleHandlers {
    constructor(rippleFn){
        this.startPress = (ev)=>{
            rippleFn().then((r)=>{
                r && r.startPress(ev);
            });
        };
        this.endPress = ()=>{
            rippleFn().then((r)=>{
                r && r.endPress();
            });
        };
        this.startFocus = ()=>{
            rippleFn().then((r)=>{
                r && r.startFocus();
            });
        };
        this.endFocus = ()=>{
            rippleFn().then((r)=>{
                r && r.endFocus();
            });
        };
        this.startHover = ()=>{
            rippleFn().then((r)=>{
                r && r.startHover();
            });
        };
        this.endHover = ()=>{
            rippleFn().then((r)=>{
                r && r.endHover();
            });
        };
    }
}
class ListItemBase extends s3 {
    constructor(){
        super(...arguments);
        this.value = '';
        this.group = null;
        this.tabindex = -1;
        this.disabled = false;
        this.twoline = false;
        this.activated = false;
        this.graphic = null;
        this.multipleGraphics = false;
        this.hasMeta = false;
        this.noninteractive = false;
        this.selected = false;
        this.shouldRenderRipple = false;
        this._managingList = null;
        this.boundOnClick = this.onClick.bind(this);
        this._firstChanged = true;
        this._skipPropRequest = false;
        this.rippleHandlers = new RippleHandlers(()=>{
            this.shouldRenderRipple = true;
            return this.ripple;
        });
        this.listeners = [
            {
                target: this,
                eventNames: [
                    'click'
                ],
                cb: ()=>{
                    this.onClick();
                }
            },
            {
                target: this,
                eventNames: [
                    'mouseenter'
                ],
                cb: this.rippleHandlers.startHover
            },
            {
                target: this,
                eventNames: [
                    'mouseleave'
                ],
                cb: this.rippleHandlers.endHover
            },
            {
                target: this,
                eventNames: [
                    'focus'
                ],
                cb: this.rippleHandlers.startFocus
            },
            {
                target: this,
                eventNames: [
                    'blur'
                ],
                cb: this.rippleHandlers.endFocus
            },
            {
                target: this,
                eventNames: [
                    'mousedown',
                    'touchstart'
                ],
                cb: (e)=>{
                    const name = e.type;
                    this.onDown(name === 'mousedown' ? 'mouseup' : 'touchend', e);
                }
            }, 
        ];
    }
    get text() {
        const textContent = this.textContent;
        return textContent ? textContent.trim() : '';
    }
    render() {
        const text = this.renderText();
        const graphic = this.graphic ? this.renderGraphic() : p``;
        const meta = this.hasMeta ? this.renderMeta() : p``;
        return p`
      ${this.renderRipple()}
      ${graphic}
      ${text}
      ${meta}`;
    }
    renderRipple() {
        if (this.shouldRenderRipple) {
            return p`
      <mwc-ripple
        .activated=${this.activated}>
      </mwc-ripple>`;
        } else if (this.activated) {
            return p`<div class="fake-activated-ripple"></div>`;
        } else {
            return '';
        }
    }
    renderGraphic() {
        const graphicClasses = {
            multi: this.multipleGraphics
        };
        return p`
      <span class="mdc-deprecated-list-item__graphic material-icons ${o6(graphicClasses)}">
        <slot name="graphic"></slot>
      </span>`;
    }
    renderMeta() {
        return p`
      <span class="mdc-deprecated-list-item__meta material-icons">
        <slot name="meta"></slot>
      </span>`;
    }
    renderText() {
        const inner = this.twoline ? this.renderTwoline() : this.renderSingleLine();
        return p`
      <span class="mdc-deprecated-list-item__text">
        ${inner}
      </span>`;
    }
    renderSingleLine() {
        return p`<slot></slot>`;
    }
    renderTwoline() {
        return p`
      <span class="mdc-deprecated-list-item__primary-text">
        <slot></slot>
      </span>
      <span class="mdc-deprecated-list-item__secondary-text">
        <slot name="secondary"></slot>
      </span>
    `;
    }
    onClick() {
        this.fireRequestSelected(!this.selected, 'interaction');
    }
    onDown(upName, evt) {
        const onUp = ()=>{
            window.removeEventListener(upName, onUp);
            this.rippleHandlers.endPress();
        };
        window.addEventListener(upName, onUp);
        this.rippleHandlers.startPress(evt);
    }
    fireRequestSelected(selected, source) {
        if (this.noninteractive) {
            return;
        }
        const customEv = new CustomEvent('request-selected', {
            bubbles: true,
            composed: true,
            detail: {
                source,
                selected
            }
        });
        this.dispatchEvent(customEv);
    }
    connectedCallback() {
        super.connectedCallback();
        if (!this.noninteractive) {
            this.setAttribute('mwc-list-item', '');
        }
        for (const listener of this.listeners){
            for (const eventName of listener.eventNames){
                listener.target.addEventListener(eventName, listener.cb, {
                    passive: true
                });
            }
        }
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        for (const listener of this.listeners){
            for (const eventName of listener.eventNames){
                listener.target.removeEventListener(eventName, listener.cb);
            }
        }
        if (this._managingList) {
            this._managingList.debouncedLayout ? this._managingList.debouncedLayout(true) : this._managingList.layout(true);
        }
    }
    firstUpdated() {
        const ev = new Event('list-item-rendered', {
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(ev);
    }
}
__decorate([
    i6('slot')
], ListItemBase.prototype, "slotElement", void 0);
__decorate([
    e8('mwc-ripple')
], ListItemBase.prototype, "ripple", void 0);
__decorate([
    e5({
        type: String
    })
], ListItemBase.prototype, "value", void 0);
__decorate([
    e5({
        type: String,
        reflect: true
    })
], ListItemBase.prototype, "group", void 0);
__decorate([
    e5({
        type: Number,
        reflect: true
    })
], ListItemBase.prototype, "tabindex", void 0);
__decorate([
    e5({
        type: Boolean,
        reflect: true
    }),
    observer(function(value) {
        if (value) {
            this.setAttribute('aria-disabled', 'true');
        } else {
            this.setAttribute('aria-disabled', 'false');
        }
    })
], ListItemBase.prototype, "disabled", void 0);
__decorate([
    e5({
        type: Boolean,
        reflect: true
    })
], ListItemBase.prototype, "twoline", void 0);
__decorate([
    e5({
        type: Boolean,
        reflect: true
    })
], ListItemBase.prototype, "activated", void 0);
__decorate([
    e5({
        type: String,
        reflect: true
    })
], ListItemBase.prototype, "graphic", void 0);
__decorate([
    e5({
        type: Boolean
    })
], ListItemBase.prototype, "multipleGraphics", void 0);
__decorate([
    e5({
        type: Boolean
    })
], ListItemBase.prototype, "hasMeta", void 0);
__decorate([
    e5({
        type: Boolean,
        reflect: true
    }),
    observer(function(value) {
        if (value) {
            this.removeAttribute('aria-checked');
            this.removeAttribute('mwc-list-item');
            this.selected = false;
            this.activated = false;
            this.tabIndex = -1;
        } else {
            this.setAttribute('mwc-list-item', '');
        }
    })
], ListItemBase.prototype, "noninteractive", void 0);
__decorate([
    e5({
        type: Boolean,
        reflect: true
    }),
    observer(function(value) {
        const role = this.getAttribute('role');
        const isAriaSelectable = role === 'gridcell' || role === 'option' || role === 'row' || role === 'tab';
        if (isAriaSelectable && value) {
            this.setAttribute('aria-selected', 'true');
        } else if (isAriaSelectable) {
            this.setAttribute('aria-selected', 'false');
        }
        if (this._firstChanged) {
            this._firstChanged = false;
            return;
        }
        if (this._skipPropRequest) {
            return;
        }
        this.fireRequestSelected(value, 'property');
    })
], ListItemBase.prototype, "selected", void 0);
__decorate([
    t4()
], ListItemBase.prototype, "shouldRenderRipple", void 0);
__decorate([
    t4()
], ListItemBase.prototype, "_managingList", void 0);
const styles1 = r`:host{cursor:pointer;user-select:none;-webkit-tap-highlight-color:transparent;height:48px;display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;padding-left:var(--mdc-list-side-padding, 16px);padding-right:var(--mdc-list-side-padding, 16px);outline:none;height:48px;color:rgba(0,0,0,.87);color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87))}:host:focus{outline:none}:host([activated]){color:#6200ee;color:var(--mdc-theme-primary, #6200ee);--mdc-ripple-color: var( --mdc-theme-primary, #6200ee )}:host([activated]) .mdc-deprecated-list-item__graphic{color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}:host([activated]) .fake-activated-ripple::before{position:absolute;display:block;top:0;bottom:0;left:0;right:0;width:100%;height:100%;pointer-events:none;z-index:1;content:"";opacity:0.12;opacity:var(--mdc-ripple-activated-opacity, 0.12);background-color:#6200ee;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #6200ee))}.mdc-deprecated-list-item__graphic{flex-shrink:0;align-items:center;justify-content:center;fill:currentColor;display:inline-flex}.mdc-deprecated-list-item__graphic ::slotted(*){flex-shrink:0;align-items:center;justify-content:center;fill:currentColor;width:100%;height:100%;text-align:center}.mdc-deprecated-list-item__meta{width:var(--mdc-list-item-meta-size, 24px);height:var(--mdc-list-item-meta-size, 24px);margin-left:auto;margin-right:0;color:rgba(0, 0, 0, 0.38);color:var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.38))}.mdc-deprecated-list-item__meta.multi{width:auto}.mdc-deprecated-list-item__meta ::slotted(*){width:var(--mdc-list-item-meta-size, 24px);line-height:var(--mdc-list-item-meta-size, 24px)}.mdc-deprecated-list-item__meta ::slotted(.material-icons),.mdc-deprecated-list-item__meta ::slotted(mwc-icon){line-height:var(--mdc-list-item-meta-size, 24px) !important}.mdc-deprecated-list-item__meta ::slotted(:not(.material-icons):not(mwc-icon)){-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-caption-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.75rem;font-size:var(--mdc-typography-caption-font-size, 0.75rem);line-height:1.25rem;line-height:var(--mdc-typography-caption-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-caption-font-weight, 400);letter-spacing:0.0333333333em;letter-spacing:var(--mdc-typography-caption-letter-spacing, 0.0333333333em);text-decoration:inherit;text-decoration:var(--mdc-typography-caption-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-caption-text-transform, inherit)}[dir=rtl] .mdc-deprecated-list-item__meta,.mdc-deprecated-list-item__meta[dir=rtl]{margin-left:0;margin-right:auto}.mdc-deprecated-list-item__meta ::slotted(*){width:100%;height:100%}.mdc-deprecated-list-item__text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-deprecated-list-item__text ::slotted([for]),.mdc-deprecated-list-item__text[for]{pointer-events:none}.mdc-deprecated-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal;margin-bottom:-20px;display:block}.mdc-deprecated-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-deprecated-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-deprecated-list-item__secondary-text{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-body2-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-body2-font-size, 0.875rem);line-height:1.25rem;line-height:var(--mdc-typography-body2-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-body2-font-weight, 400);letter-spacing:0.0178571429em;letter-spacing:var(--mdc-typography-body2-letter-spacing, 0.0178571429em);text-decoration:inherit;text-decoration:var(--mdc-typography-body2-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-body2-text-transform, inherit);text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal;display:block}.mdc-deprecated-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:"";vertical-align:0}.mdc-deprecated-list--dense .mdc-deprecated-list-item__secondary-text{font-size:inherit}* ::slotted(a),a{color:inherit;text-decoration:none}:host([twoline]){height:72px}:host([twoline]) .mdc-deprecated-list-item__text{align-self:flex-start}:host([disabled]),:host([noninteractive]){cursor:default;pointer-events:none}:host([disabled]) .mdc-deprecated-list-item__text ::slotted(*){opacity:.38}:host([disabled]) .mdc-deprecated-list-item__text ::slotted(*),:host([disabled]) .mdc-deprecated-list-item__primary-text ::slotted(*),:host([disabled]) .mdc-deprecated-list-item__secondary-text ::slotted(*){color:#000;color:var(--mdc-theme-on-surface, #000)}.mdc-deprecated-list-item__secondary-text ::slotted(*){color:rgba(0, 0, 0, 0.54);color:var(--mdc-theme-text-secondary-on-background, rgba(0, 0, 0, 0.54))}.mdc-deprecated-list-item__graphic ::slotted(*){background-color:transparent;color:rgba(0, 0, 0, 0.38);color:var(--mdc-theme-text-icon-on-background, rgba(0, 0, 0, 0.38))}.mdc-deprecated-list-group__subheader ::slotted(*){color:rgba(0, 0, 0, 0.87);color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87))}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic{width:var(--mdc-list-item-graphic-size, 40px);height:var(--mdc-list-item-graphic-size, 40px)}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic.multi{width:auto}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic ::slotted(*){width:var(--mdc-list-item-graphic-size, 40px);line-height:var(--mdc-list-item-graphic-size, 40px)}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic ::slotted(.material-icons),:host([graphic=avatar]) .mdc-deprecated-list-item__graphic ::slotted(mwc-icon){line-height:var(--mdc-list-item-graphic-size, 40px) !important}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic ::slotted(*){border-radius:50%}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic,:host([graphic=medium]) .mdc-deprecated-list-item__graphic,:host([graphic=large]) .mdc-deprecated-list-item__graphic,:host([graphic=control]) .mdc-deprecated-list-item__graphic{margin-left:0;margin-right:var(--mdc-list-item-graphic-margin, 16px)}[dir=rtl] :host([graphic=avatar]) .mdc-deprecated-list-item__graphic,[dir=rtl] :host([graphic=medium]) .mdc-deprecated-list-item__graphic,[dir=rtl] :host([graphic=large]) .mdc-deprecated-list-item__graphic,[dir=rtl] :host([graphic=control]) .mdc-deprecated-list-item__graphic,:host([graphic=avatar]) .mdc-deprecated-list-item__graphic[dir=rtl],:host([graphic=medium]) .mdc-deprecated-list-item__graphic[dir=rtl],:host([graphic=large]) .mdc-deprecated-list-item__graphic[dir=rtl],:host([graphic=control]) .mdc-deprecated-list-item__graphic[dir=rtl]{margin-left:var(--mdc-list-item-graphic-margin, 16px);margin-right:0}:host([graphic=icon]) .mdc-deprecated-list-item__graphic{width:var(--mdc-list-item-graphic-size, 24px);height:var(--mdc-list-item-graphic-size, 24px);margin-left:0;margin-right:var(--mdc-list-item-graphic-margin, 32px)}:host([graphic=icon]) .mdc-deprecated-list-item__graphic.multi{width:auto}:host([graphic=icon]) .mdc-deprecated-list-item__graphic ::slotted(*){width:var(--mdc-list-item-graphic-size, 24px);line-height:var(--mdc-list-item-graphic-size, 24px)}:host([graphic=icon]) .mdc-deprecated-list-item__graphic ::slotted(.material-icons),:host([graphic=icon]) .mdc-deprecated-list-item__graphic ::slotted(mwc-icon){line-height:var(--mdc-list-item-graphic-size, 24px) !important}[dir=rtl] :host([graphic=icon]) .mdc-deprecated-list-item__graphic,:host([graphic=icon]) .mdc-deprecated-list-item__graphic[dir=rtl]{margin-left:var(--mdc-list-item-graphic-margin, 32px);margin-right:0}:host([graphic=avatar]:not([twoLine])),:host([graphic=icon]:not([twoLine])){height:56px}:host([graphic=medium]:not([twoLine])),:host([graphic=large]:not([twoLine])){height:72px}:host([graphic=medium]) .mdc-deprecated-list-item__graphic,:host([graphic=large]) .mdc-deprecated-list-item__graphic{width:var(--mdc-list-item-graphic-size, 56px);height:var(--mdc-list-item-graphic-size, 56px)}:host([graphic=medium]) .mdc-deprecated-list-item__graphic.multi,:host([graphic=large]) .mdc-deprecated-list-item__graphic.multi{width:auto}:host([graphic=medium]) .mdc-deprecated-list-item__graphic ::slotted(*),:host([graphic=large]) .mdc-deprecated-list-item__graphic ::slotted(*){width:var(--mdc-list-item-graphic-size, 56px);line-height:var(--mdc-list-item-graphic-size, 56px)}:host([graphic=medium]) .mdc-deprecated-list-item__graphic ::slotted(.material-icons),:host([graphic=medium]) .mdc-deprecated-list-item__graphic ::slotted(mwc-icon),:host([graphic=large]) .mdc-deprecated-list-item__graphic ::slotted(.material-icons),:host([graphic=large]) .mdc-deprecated-list-item__graphic ::slotted(mwc-icon){line-height:var(--mdc-list-item-graphic-size, 56px) !important}:host([graphic=large]){padding-left:0px}`;
let ListItem1 = class ListItem extends ListItemBase {
};
ListItem1.styles = [
    styles1
];
ListItem1 = __decorate([
    n4('mwc-list-item')
], ListItem1);
const l3 = (l)=>null != l ? l : T
;
var KEY = {
    UNKNOWN: 'Unknown',
    BACKSPACE: 'Backspace',
    ENTER: 'Enter',
    SPACEBAR: 'Spacebar',
    PAGE_UP: 'PageUp',
    PAGE_DOWN: 'PageDown',
    END: 'End',
    HOME: 'Home',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_UP: 'ArrowUp',
    ARROW_RIGHT: 'ArrowRight',
    ARROW_DOWN: 'ArrowDown',
    DELETE: 'Delete',
    ESCAPE: 'Escape',
    TAB: 'Tab'
};
var normalizedKeys = new Set();
normalizedKeys.add(KEY.BACKSPACE);
normalizedKeys.add(KEY.ENTER);
normalizedKeys.add(KEY.SPACEBAR);
normalizedKeys.add(KEY.PAGE_UP);
normalizedKeys.add(KEY.PAGE_DOWN);
normalizedKeys.add(KEY.END);
normalizedKeys.add(KEY.HOME);
normalizedKeys.add(KEY.ARROW_LEFT);
normalizedKeys.add(KEY.ARROW_UP);
normalizedKeys.add(KEY.ARROW_RIGHT);
normalizedKeys.add(KEY.ARROW_DOWN);
normalizedKeys.add(KEY.DELETE);
normalizedKeys.add(KEY.ESCAPE);
normalizedKeys.add(KEY.TAB);
var KEY_CODE = {
    BACKSPACE: 8,
    ENTER: 13,
    SPACEBAR: 32,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    END: 35,
    HOME: 36,
    ARROW_LEFT: 37,
    ARROW_UP: 38,
    ARROW_RIGHT: 39,
    ARROW_DOWN: 40,
    DELETE: 46,
    ESCAPE: 27,
    TAB: 9
};
var mappedKeyCodes = new Map();
mappedKeyCodes.set(KEY_CODE.BACKSPACE, KEY.BACKSPACE);
mappedKeyCodes.set(KEY_CODE.ENTER, KEY.ENTER);
mappedKeyCodes.set(KEY_CODE.SPACEBAR, KEY.SPACEBAR);
mappedKeyCodes.set(KEY_CODE.PAGE_UP, KEY.PAGE_UP);
mappedKeyCodes.set(KEY_CODE.PAGE_DOWN, KEY.PAGE_DOWN);
mappedKeyCodes.set(KEY_CODE.END, KEY.END);
mappedKeyCodes.set(KEY_CODE.HOME, KEY.HOME);
mappedKeyCodes.set(KEY_CODE.ARROW_LEFT, KEY.ARROW_LEFT);
mappedKeyCodes.set(KEY_CODE.ARROW_UP, KEY.ARROW_UP);
mappedKeyCodes.set(KEY_CODE.ARROW_RIGHT, KEY.ARROW_RIGHT);
mappedKeyCodes.set(KEY_CODE.ARROW_DOWN, KEY.ARROW_DOWN);
mappedKeyCodes.set(KEY_CODE.DELETE, KEY.DELETE);
mappedKeyCodes.set(KEY_CODE.ESCAPE, KEY.ESCAPE);
mappedKeyCodes.set(KEY_CODE.TAB, KEY.TAB);
var navigationKeys = new Set();
navigationKeys.add(KEY.PAGE_UP);
navigationKeys.add(KEY.PAGE_DOWN);
navigationKeys.add(KEY.END);
navigationKeys.add(KEY.HOME);
navigationKeys.add(KEY.ARROW_LEFT);
navigationKeys.add(KEY.ARROW_UP);
navigationKeys.add(KEY.ARROW_RIGHT);
navigationKeys.add(KEY.ARROW_DOWN);
function normalizeKey(evt) {
    var key = evt.key;
    if (normalizedKeys.has(key)) {
        return key;
    }
    var mappedKey = mappedKeyCodes.get(evt.keyCode);
    if (mappedKey) {
        return mappedKey;
    }
    return KEY.UNKNOWN;
}
var _a, _b;
var cssClasses1 = {
    LIST_ITEM_ACTIVATED_CLASS: 'mdc-list-item--activated',
    LIST_ITEM_CLASS: 'mdc-list-item',
    LIST_ITEM_DISABLED_CLASS: 'mdc-list-item--disabled',
    LIST_ITEM_SELECTED_CLASS: 'mdc-list-item--selected',
    LIST_ITEM_TEXT_CLASS: 'mdc-list-item__text',
    LIST_ITEM_PRIMARY_TEXT_CLASS: 'mdc-list-item__primary-text',
    ROOT: 'mdc-list'
};
_a = {
}, _a["" + cssClasses1.LIST_ITEM_ACTIVATED_CLASS] = 'mdc-list-item--activated', _a["" + cssClasses1.LIST_ITEM_CLASS] = 'mdc-list-item', _a["" + cssClasses1.LIST_ITEM_DISABLED_CLASS] = 'mdc-list-item--disabled', _a["" + cssClasses1.LIST_ITEM_SELECTED_CLASS] = 'mdc-list-item--selected', _a["" + cssClasses1.LIST_ITEM_PRIMARY_TEXT_CLASS] = 'mdc-list-item__primary-text', _a["" + cssClasses1.ROOT] = 'mdc-list', _a;
var deprecatedClassNameMap = (_b = {
}, _b["" + cssClasses1.LIST_ITEM_ACTIVATED_CLASS] = 'mdc-deprecated-list-item--activated', _b["" + cssClasses1.LIST_ITEM_CLASS] = 'mdc-deprecated-list-item', _b["" + cssClasses1.LIST_ITEM_DISABLED_CLASS] = 'mdc-deprecated-list-item--disabled', _b["" + cssClasses1.LIST_ITEM_SELECTED_CLASS] = 'mdc-deprecated-list-item--selected', _b["" + cssClasses1.LIST_ITEM_TEXT_CLASS] = 'mdc-deprecated-list-item__text', _b["" + cssClasses1.LIST_ITEM_PRIMARY_TEXT_CLASS] = 'mdc-deprecated-list-item__primary-text', _b["" + cssClasses1.ROOT] = 'mdc-deprecated-list', _b);
var strings1 = {
    ACTION_EVENT: 'MDCList:action',
    ARIA_CHECKED: 'aria-checked',
    ARIA_CHECKED_CHECKBOX_SELECTOR: '[role="checkbox"][aria-checked="true"]',
    ARIA_CHECKED_RADIO_SELECTOR: '[role="radio"][aria-checked="true"]',
    ARIA_CURRENT: 'aria-current',
    ARIA_DISABLED: 'aria-disabled',
    ARIA_ORIENTATION: 'aria-orientation',
    ARIA_ORIENTATION_HORIZONTAL: 'horizontal',
    ARIA_ROLE_CHECKBOX_SELECTOR: '[role="checkbox"]',
    ARIA_SELECTED: 'aria-selected',
    ARIA_INTERACTIVE_ROLES_SELECTOR: '[role="listbox"], [role="menu"]',
    ARIA_MULTI_SELECTABLE_SELECTOR: '[aria-multiselectable="true"]',
    CHECKBOX_RADIO_SELECTOR: 'input[type="checkbox"], input[type="radio"]',
    CHECKBOX_SELECTOR: 'input[type="checkbox"]',
    CHILD_ELEMENTS_TO_TOGGLE_TABINDEX: "\n    ." + cssClasses1.LIST_ITEM_CLASS + " button:not(:disabled),\n    ." + cssClasses1.LIST_ITEM_CLASS + " a,\n    ." + deprecatedClassNameMap[cssClasses1.LIST_ITEM_CLASS] + " button:not(:disabled),\n    ." + deprecatedClassNameMap[cssClasses1.LIST_ITEM_CLASS] + " a\n  ",
    DEPRECATED_SELECTOR: '.mdc-deprecated-list',
    FOCUSABLE_CHILD_ELEMENTS: "\n    ." + cssClasses1.LIST_ITEM_CLASS + " button:not(:disabled),\n    ." + cssClasses1.LIST_ITEM_CLASS + " a,\n    ." + cssClasses1.LIST_ITEM_CLASS + " input[type=\"radio\"]:not(:disabled),\n    ." + cssClasses1.LIST_ITEM_CLASS + " input[type=\"checkbox\"]:not(:disabled),\n    ." + deprecatedClassNameMap[cssClasses1.LIST_ITEM_CLASS] + " button:not(:disabled),\n    ." + deprecatedClassNameMap[cssClasses1.LIST_ITEM_CLASS] + " a,\n    ." + deprecatedClassNameMap[cssClasses1.LIST_ITEM_CLASS] + " input[type=\"radio\"]:not(:disabled),\n    ." + deprecatedClassNameMap[cssClasses1.LIST_ITEM_CLASS] + " input[type=\"checkbox\"]:not(:disabled)\n  ",
    RADIO_SELECTOR: 'input[type="radio"]',
    SELECTED_ITEM_SELECTOR: '[aria-selected="true"], [aria-current="true"]'
};
var numbers1 = {
    UNSET_INDEX: -1,
    TYPEAHEAD_BUFFER_CLEAR_TIMEOUT_MS: 300
};
const integerSort = (a, b)=>{
    return a - b;
};
const findIndexDiff = (oldSet, newSet)=>{
    const oldArr = Array.from(oldSet);
    const newArr = Array.from(newSet);
    const diff = {
        added: [],
        removed: []
    };
    const oldSorted = oldArr.sort(integerSort);
    const newSorted = newArr.sort(integerSort);
    let i = 0;
    let j = 0;
    while(i < oldSorted.length || j < newSorted.length){
        const oldVal = oldSorted[i];
        const newVal = newSorted[j];
        if (oldVal === newVal) {
            i++;
            j++;
            continue;
        }
        if (oldVal !== undefined && (newVal === undefined || oldVal < newVal)) {
            diff.removed.push(oldVal);
            i++;
            continue;
        }
        if (newVal !== undefined && (oldVal === undefined || newVal < oldVal)) {
            diff.added.push(newVal);
            j++;
            continue;
        }
    }
    return diff;
};
const ELEMENTS_KEY_ALLOWED_IN = [
    'input',
    'button',
    'textarea',
    'select'
];
function isIndexSet(selectedIndex) {
    return selectedIndex instanceof Set;
}
const createSetFromIndex = (index)=>{
    const entry = index === numbers1.UNSET_INDEX ? new Set() : index;
    return isIndexSet(entry) ? new Set(entry) : new Set([
        entry
    ]);
};
class MDCListFoundation extends MDCFoundation {
    constructor(adapter){
        super(Object.assign(Object.assign({
        }, MDCListFoundation.defaultAdapter), adapter));
        this.isMulti_ = false;
        this.wrapFocus_ = false;
        this.isVertical_ = true;
        this.selectedIndex_ = numbers1.UNSET_INDEX;
        this.focusedItemIndex_ = numbers1.UNSET_INDEX;
        this.useActivatedClass_ = false;
        this.ariaCurrentAttrValue_ = null;
    }
    static get strings() {
        return strings1;
    }
    static get numbers() {
        return numbers1;
    }
    static get defaultAdapter() {
        return {
            focusItemAtIndex: ()=>undefined
            ,
            getFocusedElementIndex: ()=>0
            ,
            getListItemCount: ()=>0
            ,
            isFocusInsideList: ()=>false
            ,
            isRootFocused: ()=>false
            ,
            notifyAction: ()=>undefined
            ,
            notifySelected: ()=>undefined
            ,
            getSelectedStateForElementIndex: ()=>false
            ,
            setDisabledStateForElementIndex: ()=>undefined
            ,
            getDisabledStateForElementIndex: ()=>false
            ,
            setSelectedStateForElementIndex: ()=>undefined
            ,
            setActivatedStateForElementIndex: ()=>undefined
            ,
            setTabIndexForElementIndex: ()=>undefined
            ,
            setAttributeForElementIndex: ()=>undefined
            ,
            getAttributeForElementIndex: ()=>null
        };
    }
    setWrapFocus(value) {
        this.wrapFocus_ = value;
    }
    setMulti(value) {
        this.isMulti_ = value;
        const currentIndex = this.selectedIndex_;
        if (value) {
            if (!isIndexSet(currentIndex)) {
                const isUnset = currentIndex === numbers1.UNSET_INDEX;
                this.selectedIndex_ = isUnset ? new Set() : new Set([
                    currentIndex
                ]);
            }
        } else {
            if (isIndexSet(currentIndex)) {
                if (currentIndex.size) {
                    const vals = Array.from(currentIndex).sort(integerSort);
                    this.selectedIndex_ = vals[0];
                } else {
                    this.selectedIndex_ = numbers1.UNSET_INDEX;
                }
            }
        }
    }
    setVerticalOrientation(value) {
        this.isVertical_ = value;
    }
    setUseActivatedClass(useActivated) {
        this.useActivatedClass_ = useActivated;
    }
    getSelectedIndex() {
        return this.selectedIndex_;
    }
    setSelectedIndex(index) {
        if (!this.isIndexValid_(index)) {
            return;
        }
        if (this.isMulti_) {
            this.setMultiSelectionAtIndex_(createSetFromIndex(index));
        } else {
            this.setSingleSelectionAtIndex_(index);
        }
    }
    handleFocusIn(_, listItemIndex) {
        if (listItemIndex >= 0) {
            this.adapter.setTabIndexForElementIndex(listItemIndex, 0);
        }
    }
    handleFocusOut(_, listItemIndex) {
        if (listItemIndex >= 0) {
            this.adapter.setTabIndexForElementIndex(listItemIndex, -1);
        }
        setTimeout(()=>{
            if (!this.adapter.isFocusInsideList()) {
                this.setTabindexToFirstSelectedItem_();
            }
        }, 0);
    }
    handleKeydown(event, isRootListItem, listItemIndex) {
        const isArrowLeft = normalizeKey(event) === 'ArrowLeft';
        const isArrowUp = normalizeKey(event) === 'ArrowUp';
        const isArrowRight = normalizeKey(event) === 'ArrowRight';
        const isArrowDown = normalizeKey(event) === 'ArrowDown';
        const isHome = normalizeKey(event) === 'Home';
        const isEnd = normalizeKey(event) === 'End';
        const isEnter = normalizeKey(event) === 'Enter';
        const isSpace = normalizeKey(event) === 'Spacebar';
        if (this.adapter.isRootFocused()) {
            if (isArrowUp || isEnd) {
                event.preventDefault();
                this.focusLastElement();
            } else if (isArrowDown || isHome) {
                event.preventDefault();
                this.focusFirstElement();
            }
            return;
        }
        let currentIndex = this.adapter.getFocusedElementIndex();
        if (currentIndex === -1) {
            currentIndex = listItemIndex;
            if (currentIndex < 0) {
                return;
            }
        }
        let nextIndex;
        if (this.isVertical_ && isArrowDown || !this.isVertical_ && isArrowRight) {
            this.preventDefaultEvent(event);
            nextIndex = this.focusNextElement(currentIndex);
        } else if (this.isVertical_ && isArrowUp || !this.isVertical_ && isArrowLeft) {
            this.preventDefaultEvent(event);
            nextIndex = this.focusPrevElement(currentIndex);
        } else if (isHome) {
            this.preventDefaultEvent(event);
            nextIndex = this.focusFirstElement();
        } else if (isEnd) {
            this.preventDefaultEvent(event);
            nextIndex = this.focusLastElement();
        } else if (isEnter || isSpace) {
            if (isRootListItem) {
                const target = event.target;
                if (target && target.tagName === 'A' && isEnter) {
                    return;
                }
                this.preventDefaultEvent(event);
                this.setSelectedIndexOnAction_(currentIndex, true);
            }
        }
        this.focusedItemIndex_ = currentIndex;
        if (nextIndex !== undefined) {
            this.setTabindexAtIndex_(nextIndex);
            this.focusedItemIndex_ = nextIndex;
        }
    }
    handleSingleSelection(index, isInteraction, force) {
        if (index === numbers1.UNSET_INDEX) {
            return;
        }
        this.setSelectedIndexOnAction_(index, isInteraction, force);
        this.setTabindexAtIndex_(index);
        this.focusedItemIndex_ = index;
    }
    focusNextElement(index) {
        const count = this.adapter.getListItemCount();
        let nextIndex = index + 1;
        if (nextIndex >= count) {
            if (this.wrapFocus_) {
                nextIndex = 0;
            } else {
                return index;
            }
        }
        this.adapter.focusItemAtIndex(nextIndex);
        return nextIndex;
    }
    focusPrevElement(index) {
        let prevIndex = index - 1;
        if (prevIndex < 0) {
            if (this.wrapFocus_) {
                prevIndex = this.adapter.getListItemCount() - 1;
            } else {
                return index;
            }
        }
        this.adapter.focusItemAtIndex(prevIndex);
        return prevIndex;
    }
    focusFirstElement() {
        this.adapter.focusItemAtIndex(0);
        return 0;
    }
    focusLastElement() {
        const lastIndex = this.adapter.getListItemCount() - 1;
        this.adapter.focusItemAtIndex(lastIndex);
        return lastIndex;
    }
    setEnabled(itemIndex, isEnabled) {
        if (!this.isIndexValid_(itemIndex)) {
            return;
        }
        this.adapter.setDisabledStateForElementIndex(itemIndex, !isEnabled);
    }
    preventDefaultEvent(evt) {
        const target = evt.target;
        const tagName = `${target.tagName}`.toLowerCase();
        if (ELEMENTS_KEY_ALLOWED_IN.indexOf(tagName) === -1) {
            evt.preventDefault();
        }
    }
    setSingleSelectionAtIndex_(index, isInteraction = true) {
        if (this.selectedIndex_ === index) {
            return;
        }
        if (this.selectedIndex_ !== numbers1.UNSET_INDEX) {
            this.adapter.setSelectedStateForElementIndex(this.selectedIndex_, false);
            if (this.useActivatedClass_) {
                this.adapter.setActivatedStateForElementIndex(this.selectedIndex_, false);
            }
        }
        if (isInteraction) {
            this.adapter.setSelectedStateForElementIndex(index, true);
        }
        if (this.useActivatedClass_) {
            this.adapter.setActivatedStateForElementIndex(index, true);
        }
        this.setAriaForSingleSelectionAtIndex_(index);
        this.selectedIndex_ = index;
        this.adapter.notifySelected(index);
    }
    setMultiSelectionAtIndex_(newIndex, isInteraction = true) {
        const oldIndex = createSetFromIndex(this.selectedIndex_);
        const diff = findIndexDiff(oldIndex, newIndex);
        if (!diff.removed.length && !diff.added.length) {
            return;
        }
        for (const removed of diff.removed){
            if (isInteraction) {
                this.adapter.setSelectedStateForElementIndex(removed, false);
            }
            if (this.useActivatedClass_) {
                this.adapter.setActivatedStateForElementIndex(removed, false);
            }
        }
        for (const added of diff.added){
            if (isInteraction) {
                this.adapter.setSelectedStateForElementIndex(added, true);
            }
            if (this.useActivatedClass_) {
                this.adapter.setActivatedStateForElementIndex(added, true);
            }
        }
        this.selectedIndex_ = newIndex;
        this.adapter.notifySelected(newIndex, diff);
    }
    setAriaForSingleSelectionAtIndex_(index) {
        if (this.selectedIndex_ === numbers1.UNSET_INDEX) {
            this.ariaCurrentAttrValue_ = this.adapter.getAttributeForElementIndex(index, strings1.ARIA_CURRENT);
        }
        const isAriaCurrent = this.ariaCurrentAttrValue_ !== null;
        const ariaAttribute = isAriaCurrent ? strings1.ARIA_CURRENT : strings1.ARIA_SELECTED;
        if (this.selectedIndex_ !== numbers1.UNSET_INDEX) {
            this.adapter.setAttributeForElementIndex(this.selectedIndex_, ariaAttribute, 'false');
        }
        const ariaAttributeValue = isAriaCurrent ? this.ariaCurrentAttrValue_ : 'true';
        this.adapter.setAttributeForElementIndex(index, ariaAttribute, ariaAttributeValue);
    }
    setTabindexAtIndex_(index) {
        if (this.focusedItemIndex_ === numbers1.UNSET_INDEX && index !== 0) {
            this.adapter.setTabIndexForElementIndex(0, -1);
        } else if (this.focusedItemIndex_ >= 0 && this.focusedItemIndex_ !== index) {
            this.adapter.setTabIndexForElementIndex(this.focusedItemIndex_, -1);
        }
        this.adapter.setTabIndexForElementIndex(index, 0);
    }
    setTabindexToFirstSelectedItem_() {
        let targetIndex = 0;
        if (typeof this.selectedIndex_ === 'number' && this.selectedIndex_ !== numbers1.UNSET_INDEX) {
            targetIndex = this.selectedIndex_;
        } else if (isIndexSet(this.selectedIndex_) && this.selectedIndex_.size > 0) {
            targetIndex = Math.min(...this.selectedIndex_);
        }
        this.setTabindexAtIndex_(targetIndex);
    }
    isIndexValid_(index) {
        if (index instanceof Set) {
            if (!this.isMulti_) {
                throw new Error('MDCListFoundation: Array of index is only supported for checkbox based list');
            }
            if (index.size === 0) {
                return true;
            } else {
                let isOneInRange = false;
                for (const entry of index){
                    isOneInRange = this.isIndexInRange_(entry);
                    if (isOneInRange) {
                        break;
                    }
                }
                return isOneInRange;
            }
        } else if (typeof index === 'number') {
            if (this.isMulti_) {
                throw new Error('MDCListFoundation: Expected array of index for checkbox based list but got number: ' + index);
            }
            return index === numbers1.UNSET_INDEX || this.isIndexInRange_(index);
        } else {
            return false;
        }
    }
    isIndexInRange_(index) {
        const listSize = this.adapter.getListItemCount();
        return index >= 0 && index < listSize;
    }
    setSelectedIndexOnAction_(index, isInteraction, force) {
        if (this.adapter.getDisabledStateForElementIndex(index)) {
            return;
        }
        let checkedIndex = index;
        if (this.isMulti_) {
            checkedIndex = new Set([
                index
            ]);
        }
        if (!this.isIndexValid_(checkedIndex)) {
            return;
        }
        if (this.isMulti_) {
            this.toggleMultiAtIndex(index, force, isInteraction);
        } else {
            if (isInteraction || force) {
                this.setSingleSelectionAtIndex_(index, isInteraction);
            } else {
                const isDeselection = this.selectedIndex_ === index;
                if (isDeselection) {
                    this.setSingleSelectionAtIndex_(numbers1.UNSET_INDEX);
                }
            }
        }
        if (isInteraction) {
            this.adapter.notifyAction(index);
        }
    }
    toggleMultiAtIndex(index, force, isInteraction = true) {
        let newSelectionValue = false;
        if (force === undefined) {
            newSelectionValue = !this.adapter.getSelectedStateForElementIndex(index);
        } else {
            newSelectionValue = force;
        }
        const newSet = createSetFromIndex(this.selectedIndex_);
        if (newSelectionValue) {
            newSet.add(index);
        } else {
            newSet.delete(index);
        }
        this.setMultiSelectionAtIndex_(newSet, isInteraction);
    }
}
function debounceLayout(callback, waitInMS = 50) {
    let timeoutId;
    return function(updateItems = true) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(()=>{
            callback(updateItems);
        }, waitInMS);
    };
}
const isListItem = (element)=>{
    return element.hasAttribute('mwc-list-item');
};
function clearAndCreateItemsReadyPromise() {
    const oldResolver = this.itemsReadyResolver;
    this.itemsReady = new Promise((res)=>{
        return this.itemsReadyResolver = res;
    });
    oldResolver();
}
class ListBase extends BaseElement {
    constructor(){
        super();
        this.mdcAdapter = null;
        this.mdcFoundationClass = MDCListFoundation;
        this.activatable = false;
        this.multi = false;
        this.wrapFocus = false;
        this.itemRoles = null;
        this.innerRole = null;
        this.innerAriaLabel = null;
        this.rootTabbable = false;
        this.previousTabindex = null;
        this.noninteractive = false;
        this.itemsReadyResolver = ()=>{
        };
        this.itemsReady = Promise.resolve([]);
        this.items_ = [];
        const debouncedFunction = debounceLayout(this.layout.bind(this));
        this.debouncedLayout = (updateItems = true)=>{
            clearAndCreateItemsReadyPromise.call(this);
            debouncedFunction(updateItems);
        };
    }
    async getUpdateComplete() {
        const result = await super.getUpdateComplete();
        await this.itemsReady;
        return result;
    }
    get items() {
        return this.items_;
    }
    updateItems() {
        var _a;
        const nodes = (_a = this.assignedElements) !== null && _a !== void 0 ? _a : [];
        const listItems = [];
        for (const node of nodes){
            if (isListItem(node)) {
                listItems.push(node);
                node._managingList = this;
            }
            if (node.hasAttribute('divider') && !node.hasAttribute('role')) {
                node.setAttribute('role', 'separator');
            }
        }
        this.items_ = listItems;
        const selectedIndices = new Set();
        this.items_.forEach((item, index)=>{
            if (this.itemRoles) {
                item.setAttribute('role', this.itemRoles);
            } else {
                item.removeAttribute('role');
            }
            if (item.selected) {
                selectedIndices.add(index);
            }
        });
        if (this.multi) {
            this.select(selectedIndices);
        } else {
            const index = selectedIndices.size ? selectedIndices.entries().next().value[1] : -1;
            this.select(index);
        }
        const itemsUpdatedEv = new Event('items-updated', {
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(itemsUpdatedEv);
    }
    get selected() {
        const index = this.index;
        if (!isIndexSet(index)) {
            if (index === -1) {
                return null;
            }
            return this.items[index];
        }
        const selected = [];
        for (const entry of index){
            selected.push(this.items[entry]);
        }
        return selected;
    }
    get index() {
        if (this.mdcFoundation) {
            return this.mdcFoundation.getSelectedIndex();
        }
        return -1;
    }
    render() {
        const role = this.innerRole === null ? undefined : this.innerRole;
        const ariaLabel = this.innerAriaLabel === null ? undefined : this.innerAriaLabel;
        const tabindex = this.rootTabbable ? '0' : '-1';
        return p`
      <!-- @ts-ignore -->
      <ul
          tabindex=${tabindex}
          role="${l3(role)}"
          aria-label="${l3(ariaLabel)}"
          class="mdc-deprecated-list"
          @keydown=${this.onKeydown}
          @focusin=${this.onFocusIn}
          @focusout=${this.onFocusOut}
          @request-selected=${this.onRequestSelected}
          @list-item-rendered=${this.onListItemConnected}>
        <slot></slot>
        ${this.renderPlaceholder()}
      </ul>
    `;
    }
    renderPlaceholder() {
        var _a;
        const nodes = (_a = this.assignedElements) !== null && _a !== void 0 ? _a : [];
        if (this.emptyMessage !== undefined && nodes.length === 0) {
            return p`
        <mwc-list-item noninteractive>${this.emptyMessage}</mwc-list-item>
      `;
        }
        return null;
    }
    firstUpdated() {
        super.firstUpdated();
        if (!this.items.length) {
            this.mdcFoundation.setMulti(this.multi);
            this.layout();
        }
    }
    onFocusIn(evt) {
        if (this.mdcFoundation && this.mdcRoot) {
            const index = this.getIndexOfTarget(evt);
            this.mdcFoundation.handleFocusIn(evt, index);
        }
    }
    onFocusOut(evt) {
        if (this.mdcFoundation && this.mdcRoot) {
            const index = this.getIndexOfTarget(evt);
            this.mdcFoundation.handleFocusOut(evt, index);
        }
    }
    onKeydown(evt) {
        if (this.mdcFoundation && this.mdcRoot) {
            const index = this.getIndexOfTarget(evt);
            const target = evt.target;
            const isRootListItem = isListItem(target);
            this.mdcFoundation.handleKeydown(evt, isRootListItem, index);
        }
    }
    onRequestSelected(evt) {
        if (this.mdcFoundation) {
            let index = this.getIndexOfTarget(evt);
            if (index === -1) {
                this.layout();
                index = this.getIndexOfTarget(evt);
                if (index === -1) {
                    return;
                }
            }
            const element = this.items[index];
            if (element.disabled) {
                return;
            }
            const selected = evt.detail.selected;
            const source = evt.detail.source;
            this.mdcFoundation.handleSingleSelection(index, source === 'interaction', selected);
            evt.stopPropagation();
        }
    }
    getIndexOfTarget(evt) {
        const elements = this.items;
        const path = evt.composedPath();
        for (const pathItem of path){
            let index = -1;
            if (isNodeElement(pathItem) && isListItem(pathItem)) {
                index = elements.indexOf(pathItem);
            }
            if (index !== -1) {
                return index;
            }
        }
        return -1;
    }
    createAdapter() {
        this.mdcAdapter = {
            getListItemCount: ()=>{
                if (this.mdcRoot) {
                    return this.items.length;
                }
                return 0;
            },
            getFocusedElementIndex: this.getFocusedItemIndex,
            getAttributeForElementIndex: (index, attr)=>{
                const listElement = this.mdcRoot;
                if (!listElement) {
                    return '';
                }
                const element = this.items[index];
                return element ? element.getAttribute(attr) : '';
            },
            setAttributeForElementIndex: (index, attr, val)=>{
                if (!this.mdcRoot) {
                    return;
                }
                const element = this.items[index];
                if (element) {
                    element.setAttribute(attr, val);
                }
            },
            focusItemAtIndex: (index)=>{
                const element = this.items[index];
                if (element) {
                    element.focus();
                }
            },
            setTabIndexForElementIndex: (index, value)=>{
                const item = this.items[index];
                if (item) {
                    item.tabindex = value;
                }
            },
            notifyAction: (index)=>{
                const init = {
                    bubbles: true,
                    composed: true
                };
                init.detail = {
                    index
                };
                const ev = new CustomEvent('action', init);
                this.dispatchEvent(ev);
            },
            notifySelected: (index, diff)=>{
                const init = {
                    bubbles: true,
                    composed: true
                };
                init.detail = {
                    index,
                    diff
                };
                const ev = new CustomEvent('selected', init);
                this.dispatchEvent(ev);
            },
            isFocusInsideList: ()=>{
                return doesElementContainFocus(this);
            },
            isRootFocused: ()=>{
                const mdcRoot = this.mdcRoot;
                const root = mdcRoot.getRootNode();
                return root.activeElement === mdcRoot;
            },
            setDisabledStateForElementIndex: (index, value)=>{
                const item = this.items[index];
                if (!item) {
                    return;
                }
                item.disabled = value;
            },
            getDisabledStateForElementIndex: (index)=>{
                const item = this.items[index];
                if (!item) {
                    return false;
                }
                return item.disabled;
            },
            setSelectedStateForElementIndex: (index, value)=>{
                const item = this.items[index];
                if (!item) {
                    return;
                }
                item.selected = value;
            },
            getSelectedStateForElementIndex: (index)=>{
                const item = this.items[index];
                if (!item) {
                    return false;
                }
                return item.selected;
            },
            setActivatedStateForElementIndex: (index, value)=>{
                const item = this.items[index];
                if (!item) {
                    return;
                }
                item.activated = value;
            }
        };
        return this.mdcAdapter;
    }
    selectUi(index, activate = false) {
        const item = this.items[index];
        if (item) {
            item.selected = true;
            item.activated = activate;
        }
    }
    deselectUi(index) {
        const item = this.items[index];
        if (item) {
            item.selected = false;
            item.activated = false;
        }
    }
    select(index) {
        if (!this.mdcFoundation) {
            return;
        }
        this.mdcFoundation.setSelectedIndex(index);
    }
    toggle(index, force) {
        if (this.multi) {
            this.mdcFoundation.toggleMultiAtIndex(index, force);
        }
    }
    onListItemConnected(e) {
        const target = e.target;
        this.layout(this.items.indexOf(target) === -1);
    }
    layout(updateItems = true) {
        if (updateItems) {
            this.updateItems();
        }
        const first = this.items[0];
        for (const item of this.items){
            item.tabindex = -1;
        }
        if (first) {
            if (this.noninteractive) {
                if (!this.previousTabindex) {
                    this.previousTabindex = first;
                }
            } else {
                first.tabindex = 0;
            }
        }
        this.itemsReadyResolver();
    }
    getFocusedItemIndex() {
        if (!this.mdcRoot) {
            return -1;
        }
        if (!this.items.length) {
            return -1;
        }
        const activeElementPath = deepActiveElementPath();
        if (!activeElementPath.length) {
            return -1;
        }
        for(let i = activeElementPath.length - 1; i >= 0; i--){
            const activeItem = activeElementPath[i];
            if (isListItem(activeItem)) {
                return this.items.indexOf(activeItem);
            }
        }
        return -1;
    }
    focusItemAtIndex(index) {
        for (const item of this.items){
            if (item.tabindex === 0) {
                item.tabindex = -1;
                break;
            }
        }
        this.items[index].tabindex = 0;
        this.items[index].focus();
    }
    focus() {
        const root = this.mdcRoot;
        if (root) {
            root.focus();
        }
    }
    blur() {
        const root = this.mdcRoot;
        if (root) {
            root.blur();
        }
    }
}
__decorate([
    e5({
        type: String
    })
], ListBase.prototype, "emptyMessage", void 0);
__decorate([
    i6('.mdc-deprecated-list')
], ListBase.prototype, "mdcRoot", void 0);
__decorate([
    o5('', true, '*')
], ListBase.prototype, "assignedElements", void 0);
__decorate([
    o5('', true, '[tabindex="0"]')
], ListBase.prototype, "tabbableElements", void 0);
__decorate([
    e5({
        type: Boolean
    }),
    observer(function(value) {
        if (this.mdcFoundation) {
            this.mdcFoundation.setUseActivatedClass(value);
        }
    })
], ListBase.prototype, "activatable", void 0);
__decorate([
    e5({
        type: Boolean
    }),
    observer(function(newValue, oldValue) {
        if (this.mdcFoundation) {
            this.mdcFoundation.setMulti(newValue);
        }
        if (oldValue !== undefined) {
            this.layout();
        }
    })
], ListBase.prototype, "multi", void 0);
__decorate([
    e5({
        type: Boolean
    }),
    observer(function(value) {
        if (this.mdcFoundation) {
            this.mdcFoundation.setWrapFocus(value);
        }
    })
], ListBase.prototype, "wrapFocus", void 0);
__decorate([
    e5({
        type: String
    }),
    observer(function(_newValue, oldValue) {
        if (oldValue !== undefined) {
            this.updateItems();
        }
    })
], ListBase.prototype, "itemRoles", void 0);
__decorate([
    e5({
        type: String
    })
], ListBase.prototype, "innerRole", void 0);
__decorate([
    e5({
        type: String
    })
], ListBase.prototype, "innerAriaLabel", void 0);
__decorate([
    e5({
        type: Boolean
    })
], ListBase.prototype, "rootTabbable", void 0);
__decorate([
    e5({
        type: Boolean,
        reflect: true
    }),
    observer(function(value) {
        var _a, _b;
        if (value) {
            const tabbable = (_b = (_a = this.tabbableElements) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : null;
            this.previousTabindex = tabbable;
            if (tabbable) {
                tabbable.setAttribute('tabindex', '-1');
            }
        } else if (!value && this.previousTabindex) {
            this.previousTabindex.setAttribute('tabindex', '0');
            this.previousTabindex = null;
        }
    })
], ListBase.prototype, "noninteractive", void 0);
const styles2 = r`@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}:host{display:block}.mdc-deprecated-list{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);line-height:1.75rem;line-height:var(--mdc-typography-subtitle1-line-height, 1.75rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);line-height:1.5rem;margin:0;padding:8px 0;list-style-type:none;color:rgba(0, 0, 0, 0.87);color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87));padding:var(--mdc-list-vertical-padding, 8px) 0}.mdc-deprecated-list:focus{outline:none}.mdc-deprecated-list-item{height:48px}.mdc-deprecated-list--dense{padding-top:4px;padding-bottom:4px;font-size:.812rem}.mdc-deprecated-list ::slotted([divider]){height:0;margin:0;border:none;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:rgba(0, 0, 0, 0.12)}.mdc-deprecated-list ::slotted([divider][padded]){margin:0 var(--mdc-list-side-padding, 16px)}.mdc-deprecated-list ::slotted([divider][inset]){margin-left:var(--mdc-list-inset-margin, 72px);margin-right:0;width:calc( 100% - var(--mdc-list-inset-margin, 72px) )}[dir=rtl] .mdc-deprecated-list ::slotted([divider][inset]),.mdc-deprecated-list ::slotted([divider][inset][dir=rtl]){margin-left:0;margin-right:var(--mdc-list-inset-margin, 72px)}.mdc-deprecated-list ::slotted([divider][inset][padded]){width:calc( 100% - var(--mdc-list-inset-margin, 72px) - var(--mdc-list-side-padding, 16px) )}.mdc-deprecated-list--dense ::slotted([mwc-list-item]){height:40px}.mdc-deprecated-list--dense ::slotted([mwc-list]){--mdc-list-item-graphic-size: 20px}.mdc-deprecated-list--two-line.mdc-deprecated-list--dense ::slotted([mwc-list-item]),.mdc-deprecated-list--avatar-list.mdc-deprecated-list--dense ::slotted([mwc-list-item]){height:60px}.mdc-deprecated-list--avatar-list.mdc-deprecated-list--dense ::slotted([mwc-list]){--mdc-list-item-graphic-size: 36px}:host([noninteractive]){pointer-events:none;cursor:default}.mdc-deprecated-list--dense ::slotted(.mdc-deprecated-list-item__primary-text){display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-deprecated-list--dense ::slotted(.mdc-deprecated-list-item__primary-text)::before{display:inline-block;width:0;height:24px;content:"";vertical-align:0}.mdc-deprecated-list--dense ::slotted(.mdc-deprecated-list-item__primary-text)::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}`;
let List1 = class List extends ListBase {
};
List1.styles = [
    styles2
];
List1 = __decorate([
    n4('mwc-list')
], List1);
(()=>{
    var _a, _b, _c;
    const _blockingElements = Symbol();
    const _alreadyInertElements = Symbol();
    const _topElParents = Symbol();
    const _siblingsToRestore = Symbol();
    const _parentMO = Symbol();
    const _topChanged = Symbol();
    const _swapInertedSibling = Symbol();
    const _inertSiblings = Symbol();
    const _restoreInertedSiblings = Symbol();
    const _getParents = Symbol();
    const _getDistributedChildren = Symbol();
    const _isInertable = Symbol();
    const _handleMutations = Symbol();
    class BlockingElementsImpl {
        constructor(){
            this[_a] = [];
            this[_b] = [];
            this[_c] = new Set();
        }
        destructor() {
            this[_restoreInertedSiblings](this[_topElParents]);
            const nullable = this;
            nullable[_blockingElements] = null;
            nullable[_topElParents] = null;
            nullable[_alreadyInertElements] = null;
        }
        get top() {
            const elems = this[_blockingElements];
            return elems[elems.length - 1] || null;
        }
        push(element) {
            if (!element || element === this.top) {
                return;
            }
            this.remove(element);
            this[_topChanged](element);
            this[_blockingElements].push(element);
        }
        remove(element) {
            const i = this[_blockingElements].indexOf(element);
            if (i === -1) {
                return false;
            }
            this[_blockingElements].splice(i, 1);
            if (i === this[_blockingElements].length) {
                this[_topChanged](this.top);
            }
            return true;
        }
        pop() {
            const top = this.top;
            top && this.remove(top);
            return top;
        }
        has(element) {
            return this[_blockingElements].indexOf(element) !== -1;
        }
        [(_a = _blockingElements, _b = _topElParents, _c = _alreadyInertElements, _topChanged)](newTop) {
            const toKeepInert = this[_alreadyInertElements];
            const oldParents = this[_topElParents];
            if (!newTop) {
                this[_restoreInertedSiblings](oldParents);
                toKeepInert.clear();
                this[_topElParents] = [];
                return;
            }
            const newParents = this[_getParents](newTop);
            if (newParents[newParents.length - 1].parentNode !== document.body) {
                throw Error('Non-connected element cannot be a blocking element');
            }
            this[_topElParents] = newParents;
            const toSkip = this[_getDistributedChildren](newTop);
            if (!oldParents.length) {
                this[_inertSiblings](newParents, toSkip, toKeepInert);
                return;
            }
            let i = oldParents.length - 1;
            let j = newParents.length - 1;
            while(i > 0 && j > 0 && oldParents[i] === newParents[j]){
                i--;
                j--;
            }
            if (oldParents[i] !== newParents[j]) {
                this[_swapInertedSibling](oldParents[i], newParents[j]);
            }
            i > 0 && this[_restoreInertedSiblings](oldParents.slice(0, i));
            j > 0 && this[_inertSiblings](newParents.slice(0, j), toSkip, null);
        }
        [_swapInertedSibling](oldInert, newInert) {
            const siblingsToRestore = oldInert[_siblingsToRestore];
            if (this[_isInertable](oldInert) && !oldInert.inert) {
                oldInert.inert = true;
                siblingsToRestore.add(oldInert);
            }
            if (siblingsToRestore.has(newInert)) {
                newInert.inert = false;
                siblingsToRestore.delete(newInert);
            }
            newInert[_parentMO] = oldInert[_parentMO];
            newInert[_siblingsToRestore] = siblingsToRestore;
            oldInert[_parentMO] = undefined;
            oldInert[_siblingsToRestore] = undefined;
        }
        [_restoreInertedSiblings](elements) {
            for (const element of elements){
                const mo = element[_parentMO];
                mo.disconnect();
                element[_parentMO] = undefined;
                const siblings = element[_siblingsToRestore];
                for (const sibling of siblings){
                    sibling.inert = false;
                }
                element[_siblingsToRestore] = undefined;
            }
        }
        [_inertSiblings](elements, toSkip, toKeepInert) {
            for (const element of elements){
                const parent = element.parentNode;
                const children = parent.children;
                const inertedSiblings = new Set();
                for(let j = 0; j < children.length; j++){
                    const sibling = children[j];
                    if (sibling === element || !this[_isInertable](sibling) || toSkip && toSkip.has(sibling)) {
                        continue;
                    }
                    if (toKeepInert && sibling.inert) {
                        toKeepInert.add(sibling);
                    } else {
                        sibling.inert = true;
                        inertedSiblings.add(sibling);
                    }
                }
                element[_siblingsToRestore] = inertedSiblings;
                const mo = new MutationObserver(this[_handleMutations].bind(this));
                element[_parentMO] = mo;
                let parentToObserve = parent;
                const maybeShadyRoot = parentToObserve;
                if (maybeShadyRoot.__shady && maybeShadyRoot.host) {
                    parentToObserve = maybeShadyRoot.host;
                }
                mo.observe(parentToObserve, {
                    childList: true
                });
            }
        }
        [_handleMutations](mutations) {
            const parents = this[_topElParents];
            const toKeepInert = this[_alreadyInertElements];
            for (const mutation of mutations){
                const target = mutation.target.host || mutation.target;
                const idx = target === document.body ? parents.length : parents.indexOf(target);
                const inertedChild = parents[idx - 1];
                const inertedSiblings = inertedChild[_siblingsToRestore];
                for(let i = 0; i < mutation.removedNodes.length; i++){
                    const sibling = mutation.removedNodes[i];
                    if (sibling === inertedChild) {
                        console.info('Detected removal of the top Blocking Element.');
                        this.pop();
                        return;
                    }
                    if (inertedSiblings.has(sibling)) {
                        sibling.inert = false;
                        inertedSiblings.delete(sibling);
                    }
                }
                for(let i8 = 0; i8 < mutation.addedNodes.length; i8++){
                    const sibling = mutation.addedNodes[i8];
                    if (!this[_isInertable](sibling)) {
                        continue;
                    }
                    if (toKeepInert && sibling.inert) {
                        toKeepInert.add(sibling);
                    } else {
                        sibling.inert = true;
                        inertedSiblings.add(sibling);
                    }
                }
            }
        }
        [_isInertable](element) {
            return false === /^(style|template|script)$/.test(element.localName);
        }
        [_getParents](element) {
            const parents = [];
            let current = element;
            while(current && current !== document.body){
                if (current.nodeType === Node.ELEMENT_NODE) {
                    parents.push(current);
                }
                if (current.assignedSlot) {
                    while(current = current.assignedSlot){
                        parents.push(current);
                    }
                    current = parents.pop();
                    continue;
                }
                current = current.parentNode || current.host;
            }
            return parents;
        }
        [_getDistributedChildren](element) {
            const shadowRoot = element.shadowRoot;
            if (!shadowRoot) {
                return null;
            }
            const result = new Set();
            let i;
            let j;
            let nodes;
            const slots = shadowRoot.querySelectorAll('slot');
            if (slots.length && slots[0].assignedNodes) {
                for(i = 0; i < slots.length; i++){
                    nodes = slots[i].assignedNodes({
                        flatten: true
                    });
                    for(j = 0; j < nodes.length; j++){
                        if (nodes[j].nodeType === Node.ELEMENT_NODE) {
                            result.add(nodes[j]);
                        }
                    }
                }
            }
            return result;
        }
    }
    document.$blockingElements = new BlockingElementsImpl();
})();
(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() : typeof define === 'function' && define.amd ? define('inert', factory) : factory();
})(this, function() {
    'use strict';
    var _createClass = function() {
        function defineProperties(target, props) {
            for(var i = 0; i < props.length; i++){
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function(Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }
    (function() {
        if (typeof window === 'undefined') {
            return;
        }
        var slice = Array.prototype.slice;
        var matches = Element.prototype.matches || Element.prototype.msMatchesSelector;
        var _focusableElementsString = [
            'a[href]',
            'area[href]',
            'input:not([disabled])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            'button:not([disabled])',
            'details',
            'summary',
            'iframe',
            'object',
            'embed',
            '[contenteditable]'
        ].join(',');
        var InertRoot = function() {
            function InertRoot(rootElement, inertManager) {
                _classCallCheck(this, InertRoot);
                this._inertManager = inertManager;
                this._rootElement = rootElement;
                this._managedNodes = new Set();
                if (this._rootElement.hasAttribute('aria-hidden')) {
                    this._savedAriaHidden = this._rootElement.getAttribute('aria-hidden');
                } else {
                    this._savedAriaHidden = null;
                }
                this._rootElement.setAttribute('aria-hidden', 'true');
                this._makeSubtreeUnfocusable(this._rootElement);
                this._observer = new MutationObserver(this._onMutation.bind(this));
                this._observer.observe(this._rootElement, {
                    attributes: true,
                    childList: true,
                    subtree: true
                });
            }
            _createClass(InertRoot, [
                {
                    key: 'destructor',
                    value: function destructor() {
                        this._observer.disconnect();
                        if (this._rootElement) {
                            if (this._savedAriaHidden !== null) {
                                this._rootElement.setAttribute('aria-hidden', this._savedAriaHidden);
                            } else {
                                this._rootElement.removeAttribute('aria-hidden');
                            }
                        }
                        this._managedNodes.forEach(function(inertNode) {
                            this._unmanageNode(inertNode.node);
                        }, this);
                        this._observer = null;
                        this._rootElement = null;
                        this._managedNodes = null;
                        this._inertManager = null;
                    }
                },
                {
                    key: '_makeSubtreeUnfocusable',
                    value: function _makeSubtreeUnfocusable(startNode) {
                        var _this2 = this;
                        composedTreeWalk(startNode, function(node) {
                            return _this2._visitNode(node);
                        });
                        var activeElement = document.activeElement;
                        if (!document.body.contains(startNode)) {
                            var node = startNode;
                            var root = undefined;
                            while(node){
                                if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
                                    root = node;
                                    break;
                                }
                                node = node.parentNode;
                            }
                            if (root) {
                                activeElement = root.activeElement;
                            }
                        }
                        if (startNode.contains(activeElement)) {
                            activeElement.blur();
                            if (activeElement === document.activeElement) {
                                document.body.focus();
                            }
                        }
                    }
                },
                {
                    key: '_visitNode',
                    value: function _visitNode(node) {
                        if (node.nodeType !== Node.ELEMENT_NODE) {
                            return;
                        }
                        var element = node;
                        if (element !== this._rootElement && element.hasAttribute('inert')) {
                            this._adoptInertRoot(element);
                        }
                        if (matches.call(element, _focusableElementsString) || element.hasAttribute('tabindex')) {
                            this._manageNode(element);
                        }
                    }
                },
                {
                    key: '_manageNode',
                    value: function _manageNode(node) {
                        var inertNode = this._inertManager.register(node, this);
                        this._managedNodes.add(inertNode);
                    }
                },
                {
                    key: '_unmanageNode',
                    value: function _unmanageNode(node) {
                        var inertNode = this._inertManager.deregister(node, this);
                        if (inertNode) {
                            this._managedNodes['delete'](inertNode);
                        }
                    }
                },
                {
                    key: '_unmanageSubtree',
                    value: function _unmanageSubtree(startNode) {
                        var _this3 = this;
                        composedTreeWalk(startNode, function(node) {
                            return _this3._unmanageNode(node);
                        });
                    }
                },
                {
                    key: '_adoptInertRoot',
                    value: function _adoptInertRoot(node) {
                        var inertSubroot = this._inertManager.getInertRoot(node);
                        if (!inertSubroot) {
                            this._inertManager.setInert(node, true);
                            inertSubroot = this._inertManager.getInertRoot(node);
                        }
                        inertSubroot.managedNodes.forEach(function(savedInertNode) {
                            this._manageNode(savedInertNode.node);
                        }, this);
                    }
                },
                {
                    key: '_onMutation',
                    value: function _onMutation(records, self) {
                        records.forEach(function(record) {
                            var target = record.target;
                            if (record.type === 'childList') {
                                slice.call(record.addedNodes).forEach(function(node) {
                                    this._makeSubtreeUnfocusable(node);
                                }, this);
                                slice.call(record.removedNodes).forEach(function(node) {
                                    this._unmanageSubtree(node);
                                }, this);
                            } else if (record.type === 'attributes') {
                                if (record.attributeName === 'tabindex') {
                                    this._manageNode(target);
                                } else if (target !== this._rootElement && record.attributeName === 'inert' && target.hasAttribute('inert')) {
                                    this._adoptInertRoot(target);
                                    var inertSubroot = this._inertManager.getInertRoot(target);
                                    this._managedNodes.forEach(function(managedNode) {
                                        if (target.contains(managedNode.node)) {
                                            inertSubroot._manageNode(managedNode.node);
                                        }
                                    });
                                }
                            }
                        }, this);
                    }
                },
                {
                    key: 'managedNodes',
                    get: function get() {
                        return new Set(this._managedNodes);
                    }
                },
                {
                    key: 'hasSavedAriaHidden',
                    get: function get() {
                        return this._savedAriaHidden !== null;
                    }
                },
                {
                    key: 'savedAriaHidden',
                    set: function set(ariaHidden) {
                        this._savedAriaHidden = ariaHidden;
                    },
                    get: function get() {
                        return this._savedAriaHidden;
                    }
                }
            ]);
            return InertRoot;
        }();
        var InertNode = function() {
            function InertNode(node, inertRoot) {
                _classCallCheck(this, InertNode);
                this._node = node;
                this._overrodeFocusMethod = false;
                this._inertRoots = new Set([
                    inertRoot
                ]);
                this._savedTabIndex = null;
                this._destroyed = false;
                this.ensureUntabbable();
            }
            _createClass(InertNode, [
                {
                    key: 'destructor',
                    value: function destructor() {
                        this._throwIfDestroyed();
                        if (this._node && this._node.nodeType === Node.ELEMENT_NODE) {
                            var element = this._node;
                            if (this._savedTabIndex !== null) {
                                element.setAttribute('tabindex', this._savedTabIndex);
                            } else {
                                element.removeAttribute('tabindex');
                            }
                            if (this._overrodeFocusMethod) {
                                delete element.focus;
                            }
                        }
                        this._node = null;
                        this._inertRoots = null;
                        this._destroyed = true;
                    }
                },
                {
                    key: '_throwIfDestroyed',
                    value: function _throwIfDestroyed() {
                        if (this.destroyed) {
                            throw new Error('Trying to access destroyed InertNode');
                        }
                    }
                },
                {
                    key: 'ensureUntabbable',
                    value: function ensureUntabbable() {
                        if (this.node.nodeType !== Node.ELEMENT_NODE) {
                            return;
                        }
                        var element = this.node;
                        if (matches.call(element, _focusableElementsString)) {
                            if (element.tabIndex === -1 && this.hasSavedTabIndex) {
                                return;
                            }
                            if (element.hasAttribute('tabindex')) {
                                this._savedTabIndex = element.tabIndex;
                            }
                            element.setAttribute('tabindex', '-1');
                            if (element.nodeType === Node.ELEMENT_NODE) {
                                element.focus = function() {
                                };
                                this._overrodeFocusMethod = true;
                            }
                        } else if (element.hasAttribute('tabindex')) {
                            this._savedTabIndex = element.tabIndex;
                            element.removeAttribute('tabindex');
                        }
                    }
                },
                {
                    key: 'addInertRoot',
                    value: function addInertRoot(inertRoot) {
                        this._throwIfDestroyed();
                        this._inertRoots.add(inertRoot);
                    }
                },
                {
                    key: 'removeInertRoot',
                    value: function removeInertRoot(inertRoot) {
                        this._throwIfDestroyed();
                        this._inertRoots['delete'](inertRoot);
                        if (this._inertRoots.size === 0) {
                            this.destructor();
                        }
                    }
                },
                {
                    key: 'destroyed',
                    get: function get() {
                        return this._destroyed;
                    }
                },
                {
                    key: 'hasSavedTabIndex',
                    get: function get() {
                        return this._savedTabIndex !== null;
                    }
                },
                {
                    key: 'node',
                    get: function get() {
                        this._throwIfDestroyed();
                        return this._node;
                    }
                },
                {
                    key: 'savedTabIndex',
                    set: function set(tabIndex) {
                        this._throwIfDestroyed();
                        this._savedTabIndex = tabIndex;
                    },
                    get: function get() {
                        this._throwIfDestroyed();
                        return this._savedTabIndex;
                    }
                }
            ]);
            return InertNode;
        }();
        var InertManager = function() {
            function InertManager(document) {
                _classCallCheck(this, InertManager);
                if (!document) {
                    throw new Error('Missing required argument; InertManager needs to wrap a document.');
                }
                this._document = document;
                this._managedNodes = new Map();
                this._inertRoots = new Map();
                this._observer = new MutationObserver(this._watchForInert.bind(this));
                addInertStyle(document.head || document.body || document.documentElement);
                if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', this._onDocumentLoaded.bind(this));
                } else {
                    this._onDocumentLoaded();
                }
            }
            _createClass(InertManager, [
                {
                    key: 'setInert',
                    value: function setInert(root, inert) {
                        if (inert) {
                            if (this._inertRoots.has(root)) {
                                return;
                            }
                            var inertRoot = new InertRoot(root, this);
                            root.setAttribute('inert', '');
                            this._inertRoots.set(root, inertRoot);
                            if (!this._document.body.contains(root)) {
                                var parent = root.parentNode;
                                while(parent){
                                    if (parent.nodeType === 11) {
                                        addInertStyle(parent);
                                    }
                                    parent = parent.parentNode;
                                }
                            }
                        } else {
                            if (!this._inertRoots.has(root)) {
                                return;
                            }
                            var _inertRoot = this._inertRoots.get(root);
                            _inertRoot.destructor();
                            this._inertRoots['delete'](root);
                            root.removeAttribute('inert');
                        }
                    }
                },
                {
                    key: 'getInertRoot',
                    value: function getInertRoot(element) {
                        return this._inertRoots.get(element);
                    }
                },
                {
                    key: 'register',
                    value: function register(node, inertRoot) {
                        var inertNode = this._managedNodes.get(node);
                        if (inertNode !== undefined) {
                            inertNode.addInertRoot(inertRoot);
                        } else {
                            inertNode = new InertNode(node, inertRoot);
                        }
                        this._managedNodes.set(node, inertNode);
                        return inertNode;
                    }
                },
                {
                    key: 'deregister',
                    value: function deregister(node, inertRoot) {
                        var inertNode = this._managedNodes.get(node);
                        if (!inertNode) {
                            return null;
                        }
                        inertNode.removeInertRoot(inertRoot);
                        if (inertNode.destroyed) {
                            this._managedNodes['delete'](node);
                        }
                        return inertNode;
                    }
                },
                {
                    key: '_onDocumentLoaded',
                    value: function _onDocumentLoaded() {
                        var inertElements = slice.call(this._document.querySelectorAll('[inert]'));
                        inertElements.forEach(function(inertElement) {
                            this.setInert(inertElement, true);
                        }, this);
                        this._observer.observe(this._document.body || this._document.documentElement, {
                            attributes: true,
                            subtree: true,
                            childList: true
                        });
                    }
                },
                {
                    key: '_watchForInert',
                    value: function _watchForInert(records, self) {
                        var _this = this;
                        records.forEach(function(record) {
                            switch(record.type){
                                case 'childList':
                                    slice.call(record.addedNodes).forEach(function(node) {
                                        if (node.nodeType !== Node.ELEMENT_NODE) {
                                            return;
                                        }
                                        var inertElements = slice.call(node.querySelectorAll('[inert]'));
                                        if (matches.call(node, '[inert]')) {
                                            inertElements.unshift(node);
                                        }
                                        inertElements.forEach(function(inertElement) {
                                            this.setInert(inertElement, true);
                                        }, _this);
                                    }, _this);
                                    break;
                                case 'attributes':
                                    if (record.attributeName !== 'inert') {
                                        return;
                                    }
                                    var target = record.target;
                                    var inert = target.hasAttribute('inert');
                                    _this.setInert(target, inert);
                                    break;
                            }
                        }, this);
                    }
                }
            ]);
            return InertManager;
        }();
        function composedTreeWalk(node, callback, shadowRootAncestor) {
            if (node.nodeType == Node.ELEMENT_NODE) {
                var element = node;
                if (callback) {
                    callback(element);
                }
                var shadowRoot = element.shadowRoot;
                if (shadowRoot) {
                    composedTreeWalk(shadowRoot, callback, shadowRoot);
                    return;
                }
                if (element.localName == 'content') {
                    var content = element;
                    var distributedNodes = content.getDistributedNodes ? content.getDistributedNodes() : [];
                    for(var i = 0; i < distributedNodes.length; i++){
                        composedTreeWalk(distributedNodes[i], callback, shadowRootAncestor);
                    }
                    return;
                }
                if (element.localName == 'slot') {
                    var slot = element;
                    var _distributedNodes = slot.assignedNodes ? slot.assignedNodes({
                        flatten: true
                    }) : [];
                    for(var _i = 0; _i < _distributedNodes.length; _i++){
                        composedTreeWalk(_distributedNodes[_i], callback, shadowRootAncestor);
                    }
                    return;
                }
            }
            var child = node.firstChild;
            while(child != null){
                composedTreeWalk(child, callback, shadowRootAncestor);
                child = child.nextSibling;
            }
        }
        function addInertStyle(node) {
            if (node.querySelector('style#inert-style, link#inert-style')) {
                return;
            }
            var style = document.createElement('style');
            style.setAttribute('id', 'inert-style');
            style.textContent = '\n' + '[inert] {\n' + '  pointer-events: none;\n' + '  cursor: default;\n' + '}\n' + '\n' + '[inert], [inert] * {\n' + '  -webkit-user-select: none;\n' + '  -moz-user-select: none;\n' + '  -ms-user-select: none;\n' + '  user-select: none;\n' + '}\n';
            node.appendChild(style);
        }
        if (!Element.prototype.hasOwnProperty('inert')) {
            var inertManager = new InertManager(document);
            Object.defineProperty(Element.prototype, 'inert', {
                enumerable: true,
                get: function get() {
                    return this.hasAttribute('inert');
                },
                set: function set(inert) {
                    inertManager.setInert(this, inert);
                }
            });
        }
    })();
});
var cssClasses2 = {
    ANIMATE: 'mdc-drawer--animate',
    CLOSING: 'mdc-drawer--closing',
    DISMISSIBLE: 'mdc-drawer--dismissible',
    MODAL: 'mdc-drawer--modal',
    OPEN: 'mdc-drawer--open',
    OPENING: 'mdc-drawer--opening',
    ROOT: 'mdc-drawer'
};
var strings2 = {
    APP_CONTENT_SELECTOR: '.mdc-drawer-app-content',
    CLOSE_EVENT: 'MDCDrawer:closed',
    OPEN_EVENT: 'MDCDrawer:opened',
    SCRIM_SELECTOR: '.mdc-drawer-scrim',
    LIST_SELECTOR: '.mdc-list,.mdc-deprecated-list',
    LIST_ITEM_ACTIVATED_SELECTOR: '.mdc-list-item--activated,.mdc-deprecated-list-item--activated'
};
var MDCDismissibleDrawerFoundation = function(_super) {
    __extends(MDCDismissibleDrawerFoundation, _super);
    function MDCDismissibleDrawerFoundation(adapter) {
        var _this = _super.call(this, __assign(__assign({
        }, MDCDismissibleDrawerFoundation.defaultAdapter), adapter)) || this;
        _this.animationFrame = 0;
        _this.animationTimer = 0;
        return _this;
    }
    Object.defineProperty(MDCDismissibleDrawerFoundation, "strings", {
        get: function() {
            return strings2;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCDismissibleDrawerFoundation, "cssClasses", {
        get: function() {
            return cssClasses2;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCDismissibleDrawerFoundation, "defaultAdapter", {
        get: function() {
            return {
                addClass: function() {
                    return undefined;
                },
                removeClass: function() {
                    return undefined;
                },
                hasClass: function() {
                    return false;
                },
                elementHasClass: function() {
                    return false;
                },
                notifyClose: function() {
                    return undefined;
                },
                notifyOpen: function() {
                    return undefined;
                },
                saveFocus: function() {
                    return undefined;
                },
                restoreFocus: function() {
                    return undefined;
                },
                focusActiveNavigationItem: function() {
                    return undefined;
                },
                trapFocus: function() {
                    return undefined;
                },
                releaseFocus: function() {
                    return undefined;
                }
            };
        },
        enumerable: false,
        configurable: true
    });
    MDCDismissibleDrawerFoundation.prototype.destroy = function() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        if (this.animationTimer) {
            clearTimeout(this.animationTimer);
        }
    };
    MDCDismissibleDrawerFoundation.prototype.open = function() {
        var _this = this;
        if (this.isOpen() || this.isOpening() || this.isClosing()) {
            return;
        }
        this.adapter.addClass(cssClasses2.OPEN);
        this.adapter.addClass(cssClasses2.ANIMATE);
        this.runNextAnimationFrame(function() {
            _this.adapter.addClass(cssClasses2.OPENING);
        });
        this.adapter.saveFocus();
    };
    MDCDismissibleDrawerFoundation.prototype.close = function() {
        if (!this.isOpen() || this.isOpening() || this.isClosing()) {
            return;
        }
        this.adapter.addClass(cssClasses2.CLOSING);
    };
    MDCDismissibleDrawerFoundation.prototype.isOpen = function() {
        return this.adapter.hasClass(cssClasses2.OPEN);
    };
    MDCDismissibleDrawerFoundation.prototype.isOpening = function() {
        return this.adapter.hasClass(cssClasses2.OPENING) || this.adapter.hasClass(cssClasses2.ANIMATE);
    };
    MDCDismissibleDrawerFoundation.prototype.isClosing = function() {
        return this.adapter.hasClass(cssClasses2.CLOSING);
    };
    MDCDismissibleDrawerFoundation.prototype.handleKeydown = function(evt) {
        var keyCode = evt.keyCode, key = evt.key;
        var isEscape = key === 'Escape' || keyCode === 27;
        if (isEscape) {
            this.close();
        }
    };
    MDCDismissibleDrawerFoundation.prototype.handleTransitionEnd = function(evt) {
        var OPENING = cssClasses2.OPENING, CLOSING = cssClasses2.CLOSING, OPEN = cssClasses2.OPEN, ANIMATE = cssClasses2.ANIMATE, ROOT = cssClasses2.ROOT;
        var isRootElement = this.isElement(evt.target) && this.adapter.elementHasClass(evt.target, ROOT);
        if (!isRootElement) {
            return;
        }
        if (this.isClosing()) {
            this.adapter.removeClass(OPEN);
            this.closed();
            this.adapter.restoreFocus();
            this.adapter.notifyClose();
        } else {
            this.adapter.focusActiveNavigationItem();
            this.opened();
            this.adapter.notifyOpen();
        }
        this.adapter.removeClass(ANIMATE);
        this.adapter.removeClass(OPENING);
        this.adapter.removeClass(CLOSING);
    };
    MDCDismissibleDrawerFoundation.prototype.opened = function() {
    };
    MDCDismissibleDrawerFoundation.prototype.closed = function() {
    };
    MDCDismissibleDrawerFoundation.prototype.runNextAnimationFrame = function(callback) {
        var _this = this;
        cancelAnimationFrame(this.animationFrame);
        this.animationFrame = requestAnimationFrame(function() {
            _this.animationFrame = 0;
            clearTimeout(_this.animationTimer);
            _this.animationTimer = setTimeout(callback, 0);
        });
    };
    MDCDismissibleDrawerFoundation.prototype.isElement = function(element) {
        return Boolean(element.classList);
    };
    return MDCDismissibleDrawerFoundation;
}(MDCFoundation);
var MDCModalDrawerFoundation = function(_super) {
    __extends(MDCModalDrawerFoundation, _super);
    function MDCModalDrawerFoundation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MDCModalDrawerFoundation.prototype.handleScrimClick = function() {
        this.close();
    };
    MDCModalDrawerFoundation.prototype.opened = function() {
        this.adapter.trapFocus();
    };
    MDCModalDrawerFoundation.prototype.closed = function() {
        this.adapter.releaseFocus();
    };
    return MDCModalDrawerFoundation;
}(MDCDismissibleDrawerFoundation);
const blockingElements = document.$blockingElements;
class DrawerBase extends BaseElement {
    constructor(){
        super(...arguments);
        this._previousFocus = null;
        this.open = false;
        this.hasHeader = false;
        this.type = '';
    }
    get mdcFoundationClass() {
        return this.type === 'modal' ? MDCModalDrawerFoundation : MDCDismissibleDrawerFoundation;
    }
    createAdapter() {
        return Object.assign(Object.assign({
        }, addHasRemoveClass(this.mdcRoot)), {
            elementHasClass: (element, className)=>element.classList.contains(className)
            ,
            saveFocus: ()=>{
                this._previousFocus = this.getRootNode().activeElement;
            },
            restoreFocus: ()=>{
                const previousFocus = this._previousFocus && this._previousFocus.focus;
                if (previousFocus) {
                    this._previousFocus.focus();
                }
            },
            notifyClose: ()=>{
                this.open = false;
                this.dispatchEvent(new Event(strings2.CLOSE_EVENT, {
                    bubbles: true,
                    cancelable: true
                }));
            },
            notifyOpen: ()=>{
                this.open = true;
                this.dispatchEvent(new Event(strings2.OPEN_EVENT, {
                    bubbles: true,
                    cancelable: true
                }));
            },
            focusActiveNavigationItem: ()=>{
            },
            trapFocus: ()=>{
                blockingElements.push(this);
                this.appContent.inert = true;
            },
            releaseFocus: ()=>{
                blockingElements.remove(this);
                this.appContent.inert = false;
            }
        });
    }
    _handleScrimClick() {
        if (this.mdcFoundation instanceof MDCModalDrawerFoundation) {
            this.mdcFoundation.handleScrimClick();
        }
    }
    render() {
        const dismissible = this.type === 'dismissible' || this.type === 'modal';
        const modal = this.type === 'modal';
        const header = this.hasHeader ? p`
      <div class="mdc-drawer__header">
        <h3 class="mdc-drawer__title"><slot name="title"></slot></h3>
        <h6 class="mdc-drawer__subtitle"><slot name="subtitle"></slot></h6>
        <slot name="header"></slot>
      </div>
      ` : '';
        const classes = {
            'mdc-drawer--dismissible': dismissible,
            'mdc-drawer--modal': modal
        };
        return p`
      <aside class="mdc-drawer ${o6(classes)}">
        ${header}
        <div class="mdc-drawer__content"><slot></slot></div>
      </aside>
      ${modal ? p`<div class="mdc-drawer-scrim"
                          @click="${this._handleScrimClick}"></div>` : ''}
      <div class="mdc-drawer-app-content">
        <slot name="appContent"></slot>
      </div>
      `;
    }
    firstUpdated() {
        this.mdcRoot.addEventListener('keydown', (e)=>this.mdcFoundation.handleKeydown(e)
        );
        this.mdcRoot.addEventListener('transitionend', (e)=>this.mdcFoundation.handleTransitionEnd(e)
        );
    }
    updated(changedProperties) {
        if (changedProperties.has('type')) {
            this.createFoundation();
        }
    }
}
__decorate([
    i6('.mdc-drawer')
], DrawerBase.prototype, "mdcRoot", void 0);
__decorate([
    i6('.mdc-drawer-app-content')
], DrawerBase.prototype, "appContent", void 0);
__decorate([
    observer(function(value) {
        if (this.type === '') {
            return;
        }
        if (value) {
            this.mdcFoundation.open();
        } else {
            this.mdcFoundation.close();
        }
    }),
    e5({
        type: Boolean,
        reflect: true
    })
], DrawerBase.prototype, "open", void 0);
__decorate([
    e5({
        type: Boolean
    })
], DrawerBase.prototype, "hasHeader", void 0);
__decorate([
    e5({
        reflect: true
    })
], DrawerBase.prototype, "type", void 0);
const styles3 = r`.mdc-drawer{border-color:rgba(0, 0, 0, 0.12);background-color:#fff;background-color:var(--mdc-theme-surface, #fff);border-top-left-radius:0;border-top-right-radius:0;border-top-right-radius:var(--mdc-shape-large, 0);border-bottom-right-radius:0;border-bottom-right-radius:var(--mdc-shape-large, 0);border-bottom-left-radius:0;z-index:6;width:256px;display:flex;flex-direction:column;flex-shrink:0;box-sizing:border-box;height:100%;border-right-width:1px;border-right-style:solid;overflow:hidden;transition-property:transform;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}.mdc-drawer .mdc-drawer__title{color:rgba(0, 0, 0, 0.87)}.mdc-drawer .mdc-deprecated-list-group__subheader{color:rgba(0, 0, 0, 0.6)}.mdc-drawer .mdc-drawer__subtitle{color:rgba(0, 0, 0, 0.6)}.mdc-drawer .mdc-deprecated-list-item__graphic{color:rgba(0, 0, 0, 0.6)}.mdc-drawer .mdc-deprecated-list-item{color:rgba(0, 0, 0, 0.87)}.mdc-drawer .mdc-deprecated-list-item--activated .mdc-deprecated-list-item__graphic{color:#6200ee}.mdc-drawer .mdc-deprecated-list-item--activated{color:rgba(98, 0, 238, 0.87)}[dir=rtl] .mdc-drawer,.mdc-drawer[dir=rtl]{border-top-left-radius:0;border-top-left-radius:var(--mdc-shape-large, 0);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:0;border-bottom-left-radius:var(--mdc-shape-large, 0)}.mdc-drawer .mdc-deprecated-list-item{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-drawer.mdc-drawer--open:not(.mdc-drawer--closing)+.mdc-drawer-app-content{margin-left:256px;margin-right:0}[dir=rtl] .mdc-drawer.mdc-drawer--open:not(.mdc-drawer--closing)+.mdc-drawer-app-content,.mdc-drawer.mdc-drawer--open:not(.mdc-drawer--closing)+.mdc-drawer-app-content[dir=rtl]{margin-left:0;margin-right:256px}[dir=rtl] .mdc-drawer,.mdc-drawer[dir=rtl]{border-right-width:0;border-left-width:1px;border-right-style:none;border-left-style:solid}.mdc-drawer .mdc-deprecated-list-item{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-subtitle2-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-subtitle2-font-size, 0.875rem);line-height:1.375rem;line-height:var(--mdc-typography-subtitle2-line-height, 1.375rem);font-weight:500;font-weight:var(--mdc-typography-subtitle2-font-weight, 500);letter-spacing:0.0071428571em;letter-spacing:var(--mdc-typography-subtitle2-letter-spacing, 0.0071428571em);text-decoration:inherit;text-decoration:var(--mdc-typography-subtitle2-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle2-text-transform, inherit);height:calc(48px - 2 * 4px);margin:8px 8px;padding:0 8px}.mdc-drawer .mdc-deprecated-list-item:nth-child(1){margin-top:2px}.mdc-drawer .mdc-deprecated-list-item:nth-last-child(1){margin-bottom:0}.mdc-drawer .mdc-deprecated-list-group__subheader{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-body2-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-body2-font-size, 0.875rem);line-height:1.25rem;line-height:var(--mdc-typography-body2-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-body2-font-weight, 400);letter-spacing:0.0178571429em;letter-spacing:var(--mdc-typography-body2-letter-spacing, 0.0178571429em);text-decoration:inherit;text-decoration:var(--mdc-typography-body2-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-body2-text-transform, inherit);display:block;margin-top:0;line-height:normal;margin:0;padding:0 16px}.mdc-drawer .mdc-deprecated-list-group__subheader::before{display:inline-block;width:0;height:24px;content:"";vertical-align:0}.mdc-drawer .mdc-deprecated-list-divider{margin:3px 0 4px}.mdc-drawer .mdc-deprecated-list-item__text,.mdc-drawer .mdc-deprecated-list-item__graphic{pointer-events:none}.mdc-drawer--animate{transform:translateX(-100%)}[dir=rtl] .mdc-drawer--animate,.mdc-drawer--animate[dir=rtl]{transform:translateX(100%)}.mdc-drawer--opening{transform:translateX(0);transition-duration:250ms}[dir=rtl] .mdc-drawer--opening,.mdc-drawer--opening[dir=rtl]{transform:translateX(0)}.mdc-drawer--closing{transform:translateX(-100%);transition-duration:200ms}[dir=rtl] .mdc-drawer--closing,.mdc-drawer--closing[dir=rtl]{transform:translateX(100%)}.mdc-drawer__header{flex-shrink:0;box-sizing:border-box;min-height:64px;padding:0 16px 4px}.mdc-drawer__title{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-headline6-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1.25rem;font-size:var(--mdc-typography-headline6-font-size, 1.25rem);line-height:2rem;line-height:var(--mdc-typography-headline6-line-height, 2rem);font-weight:500;font-weight:var(--mdc-typography-headline6-font-weight, 500);letter-spacing:0.0125em;letter-spacing:var(--mdc-typography-headline6-letter-spacing, 0.0125em);text-decoration:inherit;text-decoration:var(--mdc-typography-headline6-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-headline6-text-transform, inherit);display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-drawer__title::before{display:inline-block;width:0;height:36px;content:"";vertical-align:0}.mdc-drawer__title::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-drawer__subtitle{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-body2-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-body2-font-size, 0.875rem);line-height:1.25rem;line-height:var(--mdc-typography-body2-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-body2-font-weight, 400);letter-spacing:0.0178571429em;letter-spacing:var(--mdc-typography-body2-letter-spacing, 0.0178571429em);text-decoration:inherit;text-decoration:var(--mdc-typography-body2-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-body2-text-transform, inherit);display:block;margin-top:0;line-height:normal;margin-bottom:0}.mdc-drawer__subtitle::before{display:inline-block;width:0;height:20px;content:"";vertical-align:0}.mdc-drawer__content{height:100%;overflow-y:auto;-webkit-overflow-scrolling:touch}.mdc-drawer--dismissible{left:0;right:initial;display:none;position:absolute}[dir=rtl] .mdc-drawer--dismissible,.mdc-drawer--dismissible[dir=rtl]{left:initial;right:0}.mdc-drawer--dismissible.mdc-drawer--open{display:flex}.mdc-drawer-app-content{margin-left:0;margin-right:0;position:relative}[dir=rtl] .mdc-drawer-app-content,.mdc-drawer-app-content[dir=rtl]{margin-left:0;margin-right:0}.mdc-drawer--modal{box-shadow:0px 8px 10px -5px rgba(0, 0, 0, 0.2),0px 16px 24px 2px rgba(0, 0, 0, 0.14),0px 6px 30px 5px rgba(0,0,0,.12);left:0;right:initial;display:none;position:fixed}.mdc-drawer--modal+.mdc-drawer-scrim{background-color:rgba(0, 0, 0, 0.32)}[dir=rtl] .mdc-drawer--modal,.mdc-drawer--modal[dir=rtl]{left:initial;right:0}.mdc-drawer--modal.mdc-drawer--open{display:flex}.mdc-drawer-scrim{display:none;position:fixed;top:0;left:0;width:100%;height:100%;z-index:5;transition-property:opacity;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}.mdc-drawer--open+.mdc-drawer-scrim{display:block}.mdc-drawer--animate+.mdc-drawer-scrim{opacity:0}.mdc-drawer--opening+.mdc-drawer-scrim{transition-duration:250ms;opacity:1}.mdc-drawer--closing+.mdc-drawer-scrim{transition-duration:200ms;opacity:0}.mdc-drawer-app-content{overflow:auto;flex:1}:host{display:flex;height:100%}.mdc-drawer{width:256px;width:var(--mdc-drawer-width, 256px)}.mdc-drawer.mdc-drawer--open:not(.mdc-drawer--closing)+.mdc-drawer-app-content{margin-left:256px;margin-left:var(--mdc-drawer-width, 256px);margin-right:0}[dir=rtl] .mdc-drawer.mdc-drawer--open:not(.mdc-drawer--closing)+.mdc-drawer-app-content,.mdc-drawer.mdc-drawer--open:not(.mdc-drawer--closing)+.mdc-drawer-app-content[dir=rtl]{margin-left:0;margin-right:256px;margin-right:var(--mdc-drawer-width, 256px)}`;
let Drawer1 = class Drawer extends DrawerBase {
};
Drawer1.styles = [
    styles3
];
Drawer1 = __decorate([
    n4('mwc-drawer')
], Drawer1);
const styles4 = r`.mdc-top-app-bar{background-color:#6200ee;background-color:var(--mdc-theme-primary, #6200ee);color:white;display:flex;position:fixed;flex-direction:column;justify-content:space-between;box-sizing:border-box;width:100%;z-index:4}.mdc-top-app-bar .mdc-top-app-bar__action-item,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon{color:#fff;color:var(--mdc-theme-on-primary, #fff)}.mdc-top-app-bar .mdc-top-app-bar__action-item::before,.mdc-top-app-bar .mdc-top-app-bar__action-item::after,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon::before,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon::after{background-color:#fff;background-color:var(--mdc-ripple-color, var(--mdc-theme-on-primary, #fff))}.mdc-top-app-bar .mdc-top-app-bar__action-item:hover::before,.mdc-top-app-bar .mdc-top-app-bar__action-item.mdc-ripple-surface--hover::before,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon:hover::before,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon.mdc-ripple-surface--hover::before{opacity:0.08;opacity:var(--mdc-ripple-hover-opacity, 0.08)}.mdc-top-app-bar .mdc-top-app-bar__action-item.mdc-ripple-upgraded--background-focused::before,.mdc-top-app-bar .mdc-top-app-bar__action-item:not(.mdc-ripple-upgraded):focus::before,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon.mdc-ripple-upgraded--background-focused::before,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-focus-opacity, 0.24)}.mdc-top-app-bar .mdc-top-app-bar__action-item:not(.mdc-ripple-upgraded)::after,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-top-app-bar .mdc-top-app-bar__action-item:not(.mdc-ripple-upgraded):active::after,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-press-opacity, 0.24)}.mdc-top-app-bar .mdc-top-app-bar__action-item.mdc-ripple-upgraded,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.24)}.mdc-top-app-bar__row{display:flex;position:relative;box-sizing:border-box;width:100%;height:64px}.mdc-top-app-bar__section{display:inline-flex;flex:1 1 auto;align-items:center;min-width:0;padding:8px 12px;z-index:1}.mdc-top-app-bar__section--align-start{justify-content:flex-start;order:-1}.mdc-top-app-bar__section--align-end{justify-content:flex-end;order:1}.mdc-top-app-bar__title{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-headline6-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1.25rem;font-size:var(--mdc-typography-headline6-font-size, 1.25rem);line-height:2rem;line-height:var(--mdc-typography-headline6-line-height, 2rem);font-weight:500;font-weight:var(--mdc-typography-headline6-font-weight, 500);letter-spacing:0.0125em;letter-spacing:var(--mdc-typography-headline6-letter-spacing, 0.0125em);text-decoration:inherit;text-decoration:var(--mdc-typography-headline6-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-headline6-text-transform, inherit);padding-left:20px;padding-right:0;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;z-index:1}[dir=rtl] .mdc-top-app-bar__title,.mdc-top-app-bar__title[dir=rtl]{padding-left:0;padding-right:20px}.mdc-top-app-bar--short-collapsed{border-top-left-radius:0;border-top-right-radius:0;border-bottom-right-radius:24px;border-bottom-left-radius:0}[dir=rtl] .mdc-top-app-bar--short-collapsed,.mdc-top-app-bar--short-collapsed[dir=rtl]{border-top-left-radius:0;border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:24px}.mdc-top-app-bar--short{top:0;right:auto;left:0;width:100%;transition:width 250ms cubic-bezier(0.4, 0, 0.2, 1)}[dir=rtl] .mdc-top-app-bar--short,.mdc-top-app-bar--short[dir=rtl]{right:0;left:auto}.mdc-top-app-bar--short .mdc-top-app-bar__row{height:56px}.mdc-top-app-bar--short .mdc-top-app-bar__section{padding:4px}.mdc-top-app-bar--short .mdc-top-app-bar__title{transition:opacity 200ms cubic-bezier(0.4, 0, 0.2, 1);opacity:1}.mdc-top-app-bar--short-collapsed{box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0,0,0,.12);width:56px;transition:width 300ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-top-app-bar--short-collapsed .mdc-top-app-bar__title{display:none}.mdc-top-app-bar--short-collapsed .mdc-top-app-bar__action-item{transition:padding 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-top-app-bar--short-collapsed.mdc-top-app-bar--short-has-action-item{width:112px}.mdc-top-app-bar--short-collapsed.mdc-top-app-bar--short-has-action-item .mdc-top-app-bar__section--align-end{padding-left:0;padding-right:12px}[dir=rtl] .mdc-top-app-bar--short-collapsed.mdc-top-app-bar--short-has-action-item .mdc-top-app-bar__section--align-end,.mdc-top-app-bar--short-collapsed.mdc-top-app-bar--short-has-action-item .mdc-top-app-bar__section--align-end[dir=rtl]{padding-left:12px;padding-right:0}.mdc-top-app-bar--dense .mdc-top-app-bar__row{height:48px}.mdc-top-app-bar--dense .mdc-top-app-bar__section{padding:0 4px}.mdc-top-app-bar--dense .mdc-top-app-bar__title{padding-left:12px;padding-right:0}[dir=rtl] .mdc-top-app-bar--dense .mdc-top-app-bar__title,.mdc-top-app-bar--dense .mdc-top-app-bar__title[dir=rtl]{padding-left:0;padding-right:12px}.mdc-top-app-bar--prominent .mdc-top-app-bar__row{height:128px}.mdc-top-app-bar--prominent .mdc-top-app-bar__title{align-self:flex-end;padding-bottom:2px}.mdc-top-app-bar--prominent .mdc-top-app-bar__action-item,.mdc-top-app-bar--prominent .mdc-top-app-bar__navigation-icon{align-self:flex-start}.mdc-top-app-bar--fixed{transition:box-shadow 200ms linear}.mdc-top-app-bar--fixed-scrolled{box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0,0,0,.12);transition:box-shadow 200ms linear}.mdc-top-app-bar--dense.mdc-top-app-bar--prominent .mdc-top-app-bar__row{height:96px}.mdc-top-app-bar--dense.mdc-top-app-bar--prominent .mdc-top-app-bar__section{padding:0 12px}.mdc-top-app-bar--dense.mdc-top-app-bar--prominent .mdc-top-app-bar__title{padding-left:20px;padding-right:0;padding-bottom:9px}[dir=rtl] .mdc-top-app-bar--dense.mdc-top-app-bar--prominent .mdc-top-app-bar__title,.mdc-top-app-bar--dense.mdc-top-app-bar--prominent .mdc-top-app-bar__title[dir=rtl]{padding-left:0;padding-right:20px}.mdc-top-app-bar--fixed-adjust{padding-top:64px}.mdc-top-app-bar--dense-fixed-adjust{padding-top:48px}.mdc-top-app-bar--short-fixed-adjust{padding-top:56px}.mdc-top-app-bar--prominent-fixed-adjust{padding-top:128px}.mdc-top-app-bar--dense-prominent-fixed-adjust{padding-top:96px}@media(max-width: 599px){.mdc-top-app-bar__row{height:56px}.mdc-top-app-bar__section{padding:4px}.mdc-top-app-bar--short{transition:width 200ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-top-app-bar--short-collapsed{transition:width 250ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-top-app-bar--short-collapsed .mdc-top-app-bar__section--align-end{padding-left:0;padding-right:12px}[dir=rtl] .mdc-top-app-bar--short-collapsed .mdc-top-app-bar__section--align-end,.mdc-top-app-bar--short-collapsed .mdc-top-app-bar__section--align-end[dir=rtl]{padding-left:12px;padding-right:0}.mdc-top-app-bar--prominent .mdc-top-app-bar__title{padding-bottom:6px}.mdc-top-app-bar--fixed-adjust{padding-top:56px}}:host{display:block}.mdc-top-app-bar{color:#fff;color:var(--mdc-theme-on-primary, #fff);width:100%;width:var(--mdc-top-app-bar-width, 100%)}.mdc-top-app-bar--prominent #navigation ::slotted(*),.mdc-top-app-bar--prominent #actions ::slotted(*){align-self:flex-start}#navigation ::slotted(*),#actions ::slotted(*){--mdc-icon-button-ripple-opacity: 0.24}.mdc-top-app-bar--short-collapsed #actions ::slotted(*){transition:padding 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-top-app-bar__section--align-center{justify-content:center}.mdc-top-app-bar__section--align-center .mdc-top-app-bar__title{padding-left:0;padding-right:0}.center-title .mdc-top-app-bar__section--align-start,.center-title .mdc-top-app-bar__section--align-end{flex-basis:0}.mdc-top-app-bar--dense.mdc-top-app-bar--prominent .mdc-top-app-bar__section--align-center .mdc-top-app-bar__title{padding-left:0;padding-right:0}.mdc-top-app-bar--fixed-scrolled{box-shadow:var(--mdc-top-app-bar-fixed-box-shadow, 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12))}`;
var cssClasses3 = {
    FIXED_CLASS: 'mdc-top-app-bar--fixed',
    FIXED_SCROLLED_CLASS: 'mdc-top-app-bar--fixed-scrolled',
    SHORT_CLASS: 'mdc-top-app-bar--short',
    SHORT_COLLAPSED_CLASS: 'mdc-top-app-bar--short-collapsed',
    SHORT_HAS_ACTION_ITEM_CLASS: 'mdc-top-app-bar--short-has-action-item'
};
var numbers2 = {
    DEBOUNCE_THROTTLE_RESIZE_TIME_MS: 100,
    MAX_TOP_APP_BAR_HEIGHT: 128
};
var strings3 = {
    ACTION_ITEM_SELECTOR: '.mdc-top-app-bar__action-item',
    NAVIGATION_EVENT: 'MDCTopAppBar:nav',
    NAVIGATION_ICON_SELECTOR: '.mdc-top-app-bar__navigation-icon',
    ROOT_SELECTOR: '.mdc-top-app-bar',
    TITLE_SELECTOR: '.mdc-top-app-bar__title'
};
var MDCTopAppBarBaseFoundation = function(_super) {
    __extends(MDCTopAppBarBaseFoundation, _super);
    function MDCTopAppBarBaseFoundation(adapter) {
        return _super.call(this, __assign(__assign({
        }, MDCTopAppBarBaseFoundation.defaultAdapter), adapter)) || this;
    }
    Object.defineProperty(MDCTopAppBarBaseFoundation, "strings", {
        get: function() {
            return strings3;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTopAppBarBaseFoundation, "cssClasses", {
        get: function() {
            return cssClasses3;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTopAppBarBaseFoundation, "numbers", {
        get: function() {
            return numbers2;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTopAppBarBaseFoundation, "defaultAdapter", {
        get: function() {
            return {
                addClass: function() {
                    return undefined;
                },
                removeClass: function() {
                    return undefined;
                },
                hasClass: function() {
                    return false;
                },
                setStyle: function() {
                    return undefined;
                },
                getTopAppBarHeight: function() {
                    return 0;
                },
                notifyNavigationIconClicked: function() {
                    return undefined;
                },
                getViewportScrollY: function() {
                    return 0;
                },
                getTotalActionItems: function() {
                    return 0;
                }
            };
        },
        enumerable: false,
        configurable: true
    });
    MDCTopAppBarBaseFoundation.prototype.handleTargetScroll = function() {
    };
    MDCTopAppBarBaseFoundation.prototype.handleWindowResize = function() {
    };
    MDCTopAppBarBaseFoundation.prototype.handleNavigationClick = function() {
        this.adapter.notifyNavigationIconClicked();
    };
    return MDCTopAppBarBaseFoundation;
}(MDCFoundation);
var INITIAL_VALUE = 0;
var MDCTopAppBarFoundation = function(_super) {
    __extends(MDCTopAppBarFoundation, _super);
    function MDCTopAppBarFoundation(adapter) {
        var _this = _super.call(this, adapter) || this;
        _this.wasDocked = true;
        _this.isDockedShowing = true;
        _this.currentAppBarOffsetTop = 0;
        _this.isCurrentlyBeingResized = false;
        _this.resizeThrottleId = INITIAL_VALUE;
        _this.resizeDebounceId = INITIAL_VALUE;
        _this.lastScrollPosition = _this.adapter.getViewportScrollY();
        _this.topAppBarHeight = _this.adapter.getTopAppBarHeight();
        return _this;
    }
    MDCTopAppBarFoundation.prototype.destroy = function() {
        _super.prototype.destroy.call(this);
        this.adapter.setStyle('top', '');
    };
    MDCTopAppBarFoundation.prototype.handleTargetScroll = function() {
        var currentScrollPosition = Math.max(this.adapter.getViewportScrollY(), 0);
        var diff = currentScrollPosition - this.lastScrollPosition;
        this.lastScrollPosition = currentScrollPosition;
        if (!this.isCurrentlyBeingResized) {
            this.currentAppBarOffsetTop -= diff;
            if (this.currentAppBarOffsetTop > 0) {
                this.currentAppBarOffsetTop = 0;
            } else if (Math.abs(this.currentAppBarOffsetTop) > this.topAppBarHeight) {
                this.currentAppBarOffsetTop = -this.topAppBarHeight;
            }
            this.moveTopAppBar();
        }
    };
    MDCTopAppBarFoundation.prototype.handleWindowResize = function() {
        var _this = this;
        if (!this.resizeThrottleId) {
            this.resizeThrottleId = setTimeout(function() {
                _this.resizeThrottleId = INITIAL_VALUE;
                _this.throttledResizeHandler();
            }, numbers2.DEBOUNCE_THROTTLE_RESIZE_TIME_MS);
        }
        this.isCurrentlyBeingResized = true;
        if (this.resizeDebounceId) {
            clearTimeout(this.resizeDebounceId);
        }
        this.resizeDebounceId = setTimeout(function() {
            _this.handleTargetScroll();
            _this.isCurrentlyBeingResized = false;
            _this.resizeDebounceId = INITIAL_VALUE;
        }, numbers2.DEBOUNCE_THROTTLE_RESIZE_TIME_MS);
    };
    MDCTopAppBarFoundation.prototype.checkForUpdate = function() {
        var offscreenBoundaryTop = -this.topAppBarHeight;
        var hasAnyPixelsOffscreen = this.currentAppBarOffsetTop < 0;
        var hasAnyPixelsOnscreen = this.currentAppBarOffsetTop > offscreenBoundaryTop;
        var partiallyShowing = hasAnyPixelsOffscreen && hasAnyPixelsOnscreen;
        if (partiallyShowing) {
            this.wasDocked = false;
        } else {
            if (!this.wasDocked) {
                this.wasDocked = true;
                return true;
            } else if (this.isDockedShowing !== hasAnyPixelsOnscreen) {
                this.isDockedShowing = hasAnyPixelsOnscreen;
                return true;
            }
        }
        return partiallyShowing;
    };
    MDCTopAppBarFoundation.prototype.moveTopAppBar = function() {
        if (this.checkForUpdate()) {
            var offset = this.currentAppBarOffsetTop;
            if (Math.abs(offset) >= this.topAppBarHeight) {
                offset = -numbers2.MAX_TOP_APP_BAR_HEIGHT;
            }
            this.adapter.setStyle('top', offset + 'px');
        }
    };
    MDCTopAppBarFoundation.prototype.throttledResizeHandler = function() {
        var currentHeight = this.adapter.getTopAppBarHeight();
        if (this.topAppBarHeight !== currentHeight) {
            this.wasDocked = false;
            this.currentAppBarOffsetTop -= this.topAppBarHeight - currentHeight;
            this.topAppBarHeight = currentHeight;
        }
        this.handleTargetScroll();
    };
    return MDCTopAppBarFoundation;
}(MDCTopAppBarBaseFoundation);
const passiveEventOptionsIfSupported = supportsPassiveEventListener ? {
    passive: true
} : undefined;
class TopAppBarBaseBase extends BaseElement {
    constructor(){
        super(...arguments);
        this.centerTitle = false;
        this.handleTargetScroll = ()=>{
            this.mdcFoundation.handleTargetScroll();
        };
        this.handleNavigationClick = ()=>{
            this.mdcFoundation.handleNavigationClick();
        };
    }
    get scrollTarget() {
        return this._scrollTarget || window;
    }
    set scrollTarget(value) {
        this.unregisterScrollListener();
        const old = this.scrollTarget;
        this._scrollTarget = value;
        this.updateRootPosition();
        this.requestUpdate('scrollTarget', old);
        this.registerScrollListener();
    }
    updateRootPosition() {
        if (this.mdcRoot) {
            const windowScroller = this.scrollTarget === window;
            this.mdcRoot.style.position = windowScroller ? '' : 'absolute';
        }
    }
    render() {
        let title = p`<span class="mdc-top-app-bar__title"><slot name="title"></slot></span>`;
        if (this.centerTitle) {
            title = p`<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-center">${title}</section>`;
        }
        return p`
      <header class="mdc-top-app-bar ${o6(this.barClasses())}">
      <div class="mdc-top-app-bar__row">
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start" id="navigation">
          <slot name="navigationIcon"
            @click=${this.handleNavigationClick}></slot>
          ${this.centerTitle ? null : title}
        </section>
        ${this.centerTitle ? title : null}
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" id="actions" role="toolbar">
          <slot name="actionItems"></slot>
        </section>
      </div>
    </header>
    <div class="${o6(this.contentClasses())}">
      <slot></slot>
    </div>
    `;
    }
    createAdapter() {
        return Object.assign(Object.assign({
        }, addHasRemoveClass(this.mdcRoot)), {
            setStyle: (property, value)=>this.mdcRoot.style.setProperty(property, value)
            ,
            getTopAppBarHeight: ()=>this.mdcRoot.clientHeight
            ,
            notifyNavigationIconClicked: ()=>{
                this.dispatchEvent(new Event(strings3.NAVIGATION_EVENT, {
                    bubbles: true,
                    cancelable: true
                }));
            },
            getViewportScrollY: ()=>this.scrollTarget instanceof Window ? this.scrollTarget.pageYOffset : this.scrollTarget.scrollTop
            ,
            getTotalActionItems: ()=>this._actionItemsSlot.assignedNodes({
                    flatten: true
                }).length
        });
    }
    registerListeners() {
        this.registerScrollListener();
    }
    unregisterListeners() {
        this.unregisterScrollListener();
    }
    registerScrollListener() {
        this.scrollTarget.addEventListener('scroll', this.handleTargetScroll, passiveEventOptionsIfSupported);
    }
    unregisterScrollListener() {
        this.scrollTarget.removeEventListener('scroll', this.handleTargetScroll);
    }
    firstUpdated() {
        super.firstUpdated();
        this.updateRootPosition();
        this.registerListeners();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.unregisterListeners();
    }
}
__decorate([
    i6('.mdc-top-app-bar')
], TopAppBarBaseBase.prototype, "mdcRoot", void 0);
__decorate([
    i6('slot[name="actionItems"]')
], TopAppBarBaseBase.prototype, "_actionItemsSlot", void 0);
__decorate([
    e5({
        type: Boolean
    })
], TopAppBarBaseBase.prototype, "centerTitle", void 0);
__decorate([
    e5({
        type: Object
    })
], TopAppBarBaseBase.prototype, "scrollTarget", null);
class TopAppBarBase extends TopAppBarBaseBase {
    constructor(){
        super(...arguments);
        this.mdcFoundationClass = MDCTopAppBarFoundation;
        this.prominent = false;
        this.dense = false;
        this.handleResize = ()=>{
            this.mdcFoundation.handleWindowResize();
        };
    }
    barClasses() {
        return {
            'mdc-top-app-bar--dense': this.dense,
            'mdc-top-app-bar--prominent': this.prominent,
            'center-title': this.centerTitle
        };
    }
    contentClasses() {
        return {
            'mdc-top-app-bar--fixed-adjust': !this.dense && !this.prominent,
            'mdc-top-app-bar--dense-fixed-adjust': this.dense && !this.prominent,
            'mdc-top-app-bar--prominent-fixed-adjust': !this.dense && this.prominent,
            'mdc-top-app-bar--dense-prominent-fixed-adjust': this.dense && this.prominent
        };
    }
    registerListeners() {
        super.registerListeners();
        window.addEventListener('resize', this.handleResize, passiveEventOptionsIfSupported);
    }
    unregisterListeners() {
        super.unregisterListeners();
        window.removeEventListener('resize', this.handleResize);
    }
}
__decorate([
    e5({
        type: Boolean,
        reflect: true
    })
], TopAppBarBase.prototype, "prominent", void 0);
__decorate([
    e5({
        type: Boolean,
        reflect: true
    })
], TopAppBarBase.prototype, "dense", void 0);
var MDCFixedTopAppBarFoundation = function(_super) {
    __extends(MDCFixedTopAppBarFoundation, _super);
    function MDCFixedTopAppBarFoundation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.wasScrolled = false;
        return _this;
    }
    MDCFixedTopAppBarFoundation.prototype.handleTargetScroll = function() {
        var currentScroll = this.adapter.getViewportScrollY();
        if (currentScroll <= 0) {
            if (this.wasScrolled) {
                this.adapter.removeClass(cssClasses3.FIXED_SCROLLED_CLASS);
                this.wasScrolled = false;
            }
        } else {
            if (!this.wasScrolled) {
                this.adapter.addClass(cssClasses3.FIXED_SCROLLED_CLASS);
                this.wasScrolled = true;
            }
        }
    };
    return MDCFixedTopAppBarFoundation;
}(MDCTopAppBarFoundation);
class TopAppBarFixedBase extends TopAppBarBase {
    constructor(){
        super(...arguments);
        this.mdcFoundationClass = MDCFixedTopAppBarFoundation;
    }
    barClasses() {
        return Object.assign(Object.assign({
        }, super.barClasses()), {
            'mdc-top-app-bar--fixed': true
        });
    }
    registerListeners() {
        this.scrollTarget.addEventListener('scroll', this.handleTargetScroll, passiveEventOptionsIfSupported);
    }
    unregisterListeners() {
        this.scrollTarget.removeEventListener('scroll', this.handleTargetScroll);
    }
}
let TopAppBarFixed1 = class TopAppBarFixed extends TopAppBarFixedBase {
};
TopAppBarFixed1.styles = [
    styles4
];
TopAppBarFixed1 = __decorate([
    n4('mwc-top-app-bar-fixed')
], TopAppBarFixed1);
function tsDecorator(prototype, name, descriptor) {
    const constructor = prototype.constructor;
    if (!descriptor) {
        const litInternalPropertyKey = `__${name}`;
        descriptor = constructor.getPropertyDescriptor(name, litInternalPropertyKey);
        if (!descriptor) {
            throw new Error('@ariaProperty must be used after a @property decorator');
        }
    }
    const propDescriptor = descriptor;
    let attribute = '';
    if (!propDescriptor.set) {
        throw new Error(`@ariaProperty requires a setter for ${name}`);
    }
    if (prototype.dispatchWizEvent) {
        return descriptor;
    }
    const wrappedDescriptor = {
        configurable: true,
        enumerable: true,
        set (value) {
            if (attribute === '') {
                const options = constructor.getPropertyOptions(name);
                attribute = typeof options.attribute === 'string' ? options.attribute : name;
            }
            if (this.hasAttribute(attribute)) {
                this.removeAttribute(attribute);
            }
            propDescriptor.set.call(this, value);
        }
    };
    if (propDescriptor.get) {
        wrappedDescriptor.get = function() {
            return propDescriptor.get.call(this);
        };
    }
    return wrappedDescriptor;
}
function ariaProperty(protoOrDescriptor, name, descriptor) {
    if (name !== undefined) {
        return tsDecorator(protoOrDescriptor, name, descriptor);
    } else {
        throw new Error('@ariaProperty only supports TypeScript Decorators');
    }
}
class IconButtonBase extends s3 {
    constructor(){
        super(...arguments);
        this.disabled = false;
        this.icon = '';
        this.shouldRenderRipple = false;
        this.rippleHandlers = new RippleHandlers(()=>{
            this.shouldRenderRipple = true;
            return this.ripple;
        });
    }
    renderRipple() {
        return this.shouldRenderRipple ? p`
            <mwc-ripple
                .disabled="${this.disabled}"
                unbounded>
            </mwc-ripple>` : '';
    }
    focus() {
        const buttonElement = this.buttonElement;
        if (buttonElement) {
            this.rippleHandlers.startFocus();
            buttonElement.focus();
        }
    }
    blur() {
        const buttonElement = this.buttonElement;
        if (buttonElement) {
            this.rippleHandlers.endFocus();
            buttonElement.blur();
        }
    }
    render() {
        return p`<button
        class="mdc-icon-button mdc-icon-button--display-flex"
        aria-label="${this.ariaLabel || this.icon}"
        aria-haspopup="${l3(this.ariaHasPopup)}"
        ?disabled="${this.disabled}"
        @focus="${this.handleRippleFocus}"
        @blur="${this.handleRippleBlur}"
        @mousedown="${this.handleRippleMouseDown}"
        @mouseenter="${this.handleRippleMouseEnter}"
        @mouseleave="${this.handleRippleMouseLeave}"
        @touchstart="${this.handleRippleTouchStart}"
        @touchend="${this.handleRippleDeactivate}"
        @touchcancel="${this.handleRippleDeactivate}"
    >${this.renderRipple()}
    <i class="material-icons">${this.icon}</i>
    <span
      ><slot></slot
    ></span>
  </button>`;
    }
    handleRippleMouseDown(event) {
        const onUp = ()=>{
            window.removeEventListener('mouseup', onUp);
            this.handleRippleDeactivate();
        };
        window.addEventListener('mouseup', onUp);
        this.rippleHandlers.startPress(event);
    }
    handleRippleTouchStart(event) {
        this.rippleHandlers.startPress(event);
    }
    handleRippleDeactivate() {
        this.rippleHandlers.endPress();
    }
    handleRippleMouseEnter() {
        this.rippleHandlers.startHover();
    }
    handleRippleMouseLeave() {
        this.rippleHandlers.endHover();
    }
    handleRippleFocus() {
        this.rippleHandlers.startFocus();
    }
    handleRippleBlur() {
        this.rippleHandlers.endFocus();
    }
}
__decorate([
    e5({
        type: Boolean,
        reflect: true
    })
], IconButtonBase.prototype, "disabled", void 0);
__decorate([
    e5({
        type: String
    })
], IconButtonBase.prototype, "icon", void 0);
__decorate([
    ariaProperty,
    e5({
        type: String,
        attribute: 'aria-label'
    })
], IconButtonBase.prototype, "ariaLabel", void 0);
__decorate([
    ariaProperty,
    e5({
        type: String,
        attribute: 'aria-haspopup'
    })
], IconButtonBase.prototype, "ariaHasPopup", void 0);
__decorate([
    i6('button')
], IconButtonBase.prototype, "buttonElement", void 0);
__decorate([
    e8('mwc-ripple')
], IconButtonBase.prototype, "ripple", void 0);
__decorate([
    t4()
], IconButtonBase.prototype, "shouldRenderRipple", void 0);
__decorate([
    e6({
        passive: true
    })
], IconButtonBase.prototype, "handleRippleMouseDown", null);
__decorate([
    e6({
        passive: true
    })
], IconButtonBase.prototype, "handleRippleTouchStart", null);
const styles5 = r`.material-icons{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga"}.mdc-icon-button{font-size:24px;width:48px;height:48px;padding:12px}.mdc-icon-button.mdc-icon-button--reduced-size .mdc-icon-button__ripple{width:40px;height:40px;margin-top:4px;margin-bottom:4px;margin-right:4px;margin-left:4px}.mdc-icon-button .mdc-icon-button__touch{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}.mdc-icon-button:disabled{color:rgba(0, 0, 0, 0.38);color:var(--mdc-theme-text-disabled-on-light, rgba(0, 0, 0, 0.38))}.mdc-icon-button svg,.mdc-icon-button img{width:24px;height:24px}.mdc-icon-button{display:inline-block;position:relative;box-sizing:border-box;border:none;outline:none;background-color:transparent;fill:currentColor;color:inherit;text-decoration:none;cursor:pointer;user-select:none;z-index:0;overflow:visible}.mdc-icon-button .mdc-icon-button__touch{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}.mdc-icon-button:disabled{cursor:default;pointer-events:none}.mdc-icon-button--display-flex{align-items:center;display:inline-flex;justify-content:center}.mdc-icon-button__icon{display:inline-block}.mdc-icon-button__icon.mdc-icon-button__icon--on{display:none}.mdc-icon-button--on .mdc-icon-button__icon{display:none}.mdc-icon-button--on .mdc-icon-button__icon.mdc-icon-button__icon--on{display:inline-block}.mdc-icon-button{display:inline-block;position:relative;box-sizing:border-box;border:none;outline:none;background-color:transparent;fill:currentColor;color:inherit;text-decoration:none;cursor:pointer;user-select:none;z-index:0;overflow:visible}.mdc-icon-button .mdc-icon-button__touch{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}.mdc-icon-button:disabled{cursor:default;pointer-events:none}.mdc-icon-button--display-flex{align-items:center;display:inline-flex;justify-content:center}.mdc-icon-button__icon{display:inline-block}.mdc-icon-button__icon.mdc-icon-button__icon--on{display:none}.mdc-icon-button--on .mdc-icon-button__icon{display:none}.mdc-icon-button--on .mdc-icon-button__icon.mdc-icon-button__icon--on{display:inline-block}:host{display:inline-block;outline:none}:host([disabled]){pointer-events:none}.mdc-icon-button i,.mdc-icon-button svg,.mdc-icon-button img,.mdc-icon-button ::slotted(*){display:block}:host{--mdc-ripple-color: currentcolor;-webkit-tap-highlight-color:transparent}:host,.mdc-icon-button{vertical-align:top}.mdc-icon-button{width:var(--mdc-icon-button-size, 48px);height:var(--mdc-icon-button-size, 48px);padding:calc( (var(--mdc-icon-button-size, 48px) - var(--mdc-icon-size, 24px)) / 2 )}.mdc-icon-button i,.mdc-icon-button svg,.mdc-icon-button img,.mdc-icon-button ::slotted(*){display:block;width:var(--mdc-icon-size, 24px);height:var(--mdc-icon-size, 24px)}`;
let IconButton1 = class IconButton extends IconButtonBase {
};
IconButton1.styles = [
    styles5
];
IconButton1 = __decorate([
    n4('mwc-icon-button')
], IconButton1);
function t5(e) {
    return (t5 = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
        return t.__proto__ || Object.getPrototypeOf(t);
    })(e);
}
function e9(i, r, n) {
    return (e9 = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(e, i, r) {
        var n = function(e, i) {
            for(; !Object.prototype.hasOwnProperty.call(e, i) && null !== (e = t5(e)););
            return e;
        }(e, i);
        if (n) {
            var o = Object.getOwnPropertyDescriptor(n, i);
            return o.get ? o.get.call(r) : o.value;
        }
    })(i, r, n || i);
}
function i8(t) {
    return (function(t) {
        if (Array.isArray(t)) return t;
    })(t) || (function(t) {
        if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array.from(t);
    })(t) || (function(t, e) {
        if (!t) return;
        if ("string" == typeof t) return r3(t, e);
        var i = Object.prototype.toString.call(t).slice(8, -1);
        "Object" === i && t.constructor && (i = t.constructor.name);
        if ("Map" === i || "Set" === i) return Array.from(t);
        if ("Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)) return r3(t, e);
    })(t) || (function() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    })();
}
function r3(t, e) {
    (null == e || e > t.length) && (e = t.length);
    for(var i = 0, r = new Array(e); i < e; i++)r[i] = t[i];
    return r;
}
function n6(t) {
    var e = function(t, e) {
        if ("object" != typeof t || null === t) return t;
        var i = t[Symbol.toPrimitive];
        if (void 0 !== i) {
            var r = i.call(t, e || "default");
            if ("object" != typeof r) return r;
            throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return ("string" === e ? String : Number)(t);
    }(t, "string");
    return "symbol" == typeof e ? e : String(e);
}
function o7() {
    o7 = function() {
        return t;
    };
    var t = {
        elementsDefinitionOrder: [
            [
                "method"
            ],
            [
                "field"
            ]
        ],
        initializeInstanceElements: function(t, e) {
            [
                "method",
                "field"
            ].forEach(function(i) {
                e.forEach(function(e) {
                    e.kind === i && "own" === e.placement && this.defineClassElement(t, e);
                }, this);
            }, this);
        },
        initializeClassElements: function(t, e) {
            var i = t.prototype;
            [
                "method",
                "field"
            ].forEach(function(r) {
                e.forEach(function(e) {
                    var n = e.placement;
                    if (e.kind === r && ("static" === n || "prototype" === n)) {
                        var o = "static" === n ? t : i;
                        this.defineClassElement(o, e);
                    }
                }, this);
            }, this);
        },
        defineClassElement: function(t, e) {
            var i = e.descriptor;
            if ("field" === e.kind) {
                var r = e.initializer;
                i = {
                    enumerable: i.enumerable,
                    writable: i.writable,
                    configurable: i.configurable,
                    value: void 0 === r ? void 0 : r.call(t)
                };
            }
            Object.defineProperty(t, e.key, i);
        },
        decorateClass: function(t, e) {
            var i = [], r = [], n = {
                static: [],
                prototype: [],
                own: []
            };
            if (t.forEach(function(t) {
                this.addElementPlacement(t, n);
            }, this), t.forEach(function(t) {
                if (!a3(t)) return i.push(t);
                var e = this.decorateElement(t, n);
                i.push(e.element), i.push.apply(i, e.extras), r.push.apply(r, e.finishers);
            }, this), !e) return {
                elements: i,
                finishers: r
            };
            var o = this.decorateConstructor(i, e);
            return r.push.apply(r, o.finishers), o.finishers = r, o;
        },
        addElementPlacement: function(t, e, i) {
            var r = e[t.placement];
            if (!i && -1 !== r.indexOf(t.key)) throw new TypeError("Duplicated element (" + t.key + ")");
            r.push(t.key);
        },
        decorateElement: function(t, e) {
            for(var i = [], r = [], n = t.decorators, o = n.length - 1; o >= 0; o--){
                var s = e[t.placement];
                s.splice(s.indexOf(t.key), 1);
                var l = this.fromElementDescriptor(t), a = this.toElementFinisherExtras((0, n[o])(l) || l);
                t = a.element, this.addElementPlacement(t, e), a.finisher && r.push(a.finisher);
                var c = a.extras;
                if (c) {
                    for(var h = 0; h < c.length; h++)this.addElementPlacement(c[h], e);
                    i.push.apply(i, c);
                }
            }
            return {
                element: t,
                finishers: r,
                extras: i
            };
        },
        decorateConstructor: function(t, e) {
            for(var i = [], r = e.length - 1; r >= 0; r--){
                var n = this.fromClassDescriptor(t), o = this.toClassDescriptor((0, e[r])(n) || n);
                if (void 0 !== o.finisher && i.push(o.finisher), void 0 !== o.elements) {
                    t = o.elements;
                    for(var s = 0; s < t.length - 1; s++)for(var l = s + 1; l < t.length; l++)if (t[s].key === t[l].key && t[s].placement === t[l].placement) throw new TypeError("Duplicated element (" + t[s].key + ")");
                }
            }
            return {
                elements: t,
                finishers: i
            };
        },
        fromElementDescriptor: function(t) {
            var e = {
                kind: t.kind,
                key: t.key,
                placement: t.placement,
                descriptor: t.descriptor
            };
            return Object.defineProperty(e, Symbol.toStringTag, {
                value: "Descriptor",
                configurable: !0
            }), "field" === t.kind && (e.initializer = t.initializer), e;
        },
        toElementDescriptors: function(t) {
            if (void 0 !== t) return i8(t).map(function(t) {
                var e = this.toElementDescriptor(t);
                return this.disallowProperty(t, "finisher", "An element descriptor"), this.disallowProperty(t, "extras", "An element descriptor"), e;
            }, this);
        },
        toElementDescriptor: function(t) {
            var e = String(t.kind);
            if ("method" !== e && "field" !== e) throw new TypeError('An element descriptor\'s .kind property must be either "method" or "field", but a decorator created an element descriptor with .kind "' + e + '"');
            var i = n6(t.key), r = String(t.placement);
            if ("static" !== r && "prototype" !== r && "own" !== r) throw new TypeError('An element descriptor\'s .placement property must be one of "static", "prototype" or "own", but a decorator created an element descriptor with .placement "' + r + '"');
            var o = t.descriptor;
            this.disallowProperty(t, "elements", "An element descriptor");
            var s = {
                kind: e,
                key: i,
                placement: r,
                descriptor: Object.assign({
                }, o)
            };
            return "field" !== e ? this.disallowProperty(t, "initializer", "A method descriptor") : (this.disallowProperty(o, "get", "The property descriptor of a field descriptor"), this.disallowProperty(o, "set", "The property descriptor of a field descriptor"), this.disallowProperty(o, "value", "The property descriptor of a field descriptor"), s.initializer = t.initializer), s;
        },
        toElementFinisherExtras: function(t) {
            return {
                element: this.toElementDescriptor(t),
                finisher: h3(t, "finisher"),
                extras: this.toElementDescriptors(t.extras)
            };
        },
        fromClassDescriptor: function(t) {
            var e = {
                kind: "class",
                elements: t.map(this.fromElementDescriptor, this)
            };
            return Object.defineProperty(e, Symbol.toStringTag, {
                value: "Descriptor",
                configurable: !0
            }), e;
        },
        toClassDescriptor: function(t) {
            var e = String(t.kind);
            if ("class" !== e) throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator created a class descriptor with .kind "' + e + '"');
            this.disallowProperty(t, "key", "A class descriptor"), this.disallowProperty(t, "placement", "A class descriptor"), this.disallowProperty(t, "descriptor", "A class descriptor"), this.disallowProperty(t, "initializer", "A class descriptor"), this.disallowProperty(t, "extras", "A class descriptor");
            var i = h3(t, "finisher");
            return {
                elements: this.toElementDescriptors(t.elements),
                finisher: i
            };
        },
        runClassFinishers: function(t, e) {
            for(var i = 0; i < e.length; i++){
                var r = (0, e[i])(t);
                if (void 0 !== r) {
                    if ("function" != typeof r) throw new TypeError("Finishers must return a constructor.");
                    t = r;
                }
            }
            return t;
        },
        disallowProperty: function(t, e, i) {
            if (void 0 !== t[e]) throw new TypeError(i + " can't have a ." + e + " property.");
        }
    };
    return t;
}
function s7(t) {
    var e, i = n6(t.key);
    "method" === t.kind ? e = {
        value: t.value,
        writable: !0,
        configurable: !0,
        enumerable: !1
    } : "get" === t.kind ? e = {
        get: t.value,
        configurable: !0,
        enumerable: !1
    } : "set" === t.kind ? e = {
        set: t.value,
        configurable: !0,
        enumerable: !1
    } : "field" === t.kind && (e = {
        configurable: !0,
        writable: !0,
        enumerable: !0
    });
    var r = {
        kind: "field" === t.kind ? "field" : "method",
        key: i,
        placement: t.static ? "static" : "field" === t.kind ? "own" : "prototype",
        descriptor: e
    };
    return t.decorators && (r.decorators = t.decorators), "field" === t.kind && (r.initializer = t.value), r;
}
function l4(t, e) {
    void 0 !== t.descriptor.get ? e.descriptor.get = t.descriptor.get : e.descriptor.set = t.descriptor.set;
}
function a3(t) {
    return t.decorators && t.decorators.length;
}
function c3(t) {
    return void 0 !== t && !(void 0 === t.value && void 0 === t.writable);
}
function h3(t, e) {
    var i = t[e];
    if (void 0 !== i && "function" != typeof i) throw new TypeError("Expected '" + e + "' to be a function");
    return i;
}
const d1 = window.ShadowRoot && (void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, u3 = Symbol();
class p1 {
    constructor(t, e){
        if (e !== u3) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
        this.cssText = t;
    }
    get styleSheet() {
        return d1 && void 0 === this.t && (this.t = new CSSStyleSheet, this.t.replaceSync(this.cssText)), this.t;
    }
    toString() {
        return this.cssText;
    }
}
const f2 = new Map, v1 = (t)=>{
    let e = f2.get(t);
    return void 0 === e && f2.set(t, e = new p1(t, u3)), e;
}, m3 = d1 ? (t)=>t
 : (t)=>t instanceof CSSStyleSheet ? ((t)=>{
        let e = "";
        for (const i of t.cssRules)e += i.cssText;
        return ((t)=>v1("string" == typeof t ? t : t + "")
        )(e);
    })(t) : t
;
var y1, g1, b1, k1;
const w1 = {
    toAttribute (t, e) {
        switch(e){
            case Boolean:
                t = t ? "" : null;
                break;
            case Object:
            case Array:
                t = null == t ? t : JSON.stringify(t);
        }
        return t;
    },
    fromAttribute (t, e) {
        let i = t;
        switch(e){
            case Boolean:
                i = null !== t;
                break;
            case Number:
                i = null === t ? null : Number(t);
                break;
            case Object:
            case Array:
                try {
                    i = JSON.parse(t);
                } catch (t6) {
                    i = null;
                }
        }
        return i;
    }
}, S2 = (t, e)=>e !== t && (e == e || t == t)
, E1 = {
    attribute: !0,
    type: String,
    converter: w1,
    reflect: !1,
    hasChanged: S2
};
class P1 extends HTMLElement {
    constructor(){
        super(), this.Πi = new Map, this.Πo = void 0, this.Πl = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this.Πh = null, this.u();
    }
    static addInitializer(t) {
        var e;
        null !== (e = this.v) && void 0 !== e || (this.v = []), this.v.push(t);
    }
    static get observedAttributes() {
        this.finalize();
        const t = [];
        return this.elementProperties.forEach((e, i)=>{
            const r = this.Πp(i, e);
            void 0 !== r && (this.Πm.set(r, i), t.push(r));
        }), t;
    }
    static createProperty(t, e = E1) {
        if (e.state && (e.attribute = !1), this.finalize(), this.elementProperties.set(t, e), !e.noAccessor && !this.prototype.hasOwnProperty(t)) {
            const i = "symbol" == typeof t ? Symbol() : "__" + t, r = this.getPropertyDescriptor(t, i, e);
            void 0 !== r && Object.defineProperty(this.prototype, t, r);
        }
    }
    static getPropertyDescriptor(t, e, i) {
        return {
            get () {
                return this[e];
            },
            set (r) {
                const n = this[t];
                this[e] = r, this.requestUpdate(t, n, i);
            },
            configurable: !0,
            enumerable: !0
        };
    }
    static getPropertyOptions(t) {
        return this.elementProperties.get(t) || E1;
    }
    static finalize() {
        if (this.hasOwnProperty("finalized")) return !1;
        this.finalized = !0;
        const t = Object.getPrototypeOf(this);
        if (t.finalize(), this.elementProperties = new Map(t.elementProperties), this.Πm = new Map, this.hasOwnProperty("properties")) {
            const t = this.properties, e = [
                ...Object.getOwnPropertyNames(t),
                ...Object.getOwnPropertySymbols(t)
            ];
            for (const i of e)this.createProperty(i, t[i]);
        }
        return this.elementStyles = this.finalizeStyles(this.styles), !0;
    }
    static finalizeStyles(t) {
        const e = [];
        if (Array.isArray(t)) {
            const i = new Set(t.flat(1 / 0).reverse());
            for (const t6 of i)e.unshift(m3(t6));
        } else void 0 !== t && e.push(m3(t));
        return e;
    }
    static "Πp"(t, e) {
        const i = e.attribute;
        return !1 === i ? void 0 : "string" == typeof i ? i : "string" == typeof t ? t.toLowerCase() : void 0;
    }
    u() {
        var t;
        this.Πg = new Promise((t)=>this.enableUpdating = t
        ), this.L = new Map, this.Π_(), this.requestUpdate(), null === (t = this.constructor.v) || void 0 === t || t.forEach((t)=>t(this)
        );
    }
    addController(t) {
        var e, i;
        (null !== (e = this.ΠU) && void 0 !== e ? e : this.ΠU = []).push(t), void 0 !== this.renderRoot && this.isConnected && (null === (i = t.hostConnected) || void 0 === i || i.call(t));
    }
    removeController(t) {
        var e;
        null === (e = this.ΠU) || void 0 === e || e.splice(this.ΠU.indexOf(t) >>> 0, 1);
    }
    "Π_"() {
        this.constructor.elementProperties.forEach((t, e)=>{
            this.hasOwnProperty(e) && (this.Πi.set(e, this[e]), delete this[e]);
        });
    }
    createRenderRoot() {
        var t;
        const e = null !== (t = this.shadowRoot) && void 0 !== t ? t : this.attachShadow(this.constructor.shadowRootOptions);
        return ((t, e)=>{
            d1 ? t.adoptedStyleSheets = e.map((t)=>t instanceof CSSStyleSheet ? t : t.styleSheet
            ) : e.forEach((e)=>{
                const i = document.createElement("style");
                i.textContent = e.cssText, t.appendChild(i);
            });
        })(e, this.constructor.elementStyles), e;
    }
    connectedCallback() {
        var t;
        void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), null === (t = this.ΠU) || void 0 === t || t.forEach((t)=>{
            var e;
            return null === (e = t.hostConnected) || void 0 === e ? void 0 : e.call(t);
        }), this.Πl && (this.Πl(), this.Πo = this.Πl = void 0);
    }
    enableUpdating(t) {
    }
    disconnectedCallback() {
        var t;
        null === (t = this.ΠU) || void 0 === t || t.forEach((t)=>{
            var e;
            return null === (e = t.hostDisconnected) || void 0 === e ? void 0 : e.call(t);
        }), this.Πo = new Promise((t)=>this.Πl = t
        );
    }
    attributeChangedCallback(t, e, i) {
        this.K(t, i);
    }
    "Πj"(t, e, i = E1) {
        var r, n;
        const o = this.constructor.Πp(t, i);
        if (void 0 !== o && !0 === i.reflect) {
            const s = (null !== (n = null === (r = i.converter) || void 0 === r ? void 0 : r.toAttribute) && void 0 !== n ? n : w1.toAttribute)(e, i.type);
            this.Πh = t, null == s ? this.removeAttribute(o) : this.setAttribute(o, s), this.Πh = null;
        }
    }
    K(t, e) {
        var i, r, n;
        const o = this.constructor, s = o.Πm.get(t);
        if (void 0 !== s && this.Πh !== s) {
            const t = o.getPropertyOptions(s), l = t.converter, a = null !== (n = null !== (r = null === (i = l) || void 0 === i ? void 0 : i.fromAttribute) && void 0 !== r ? r : "function" == typeof l ? l : null) && void 0 !== n ? n : w1.fromAttribute;
            this.Πh = s, this[s] = a(e, t.type), this.Πh = null;
        }
    }
    requestUpdate(t, e, i) {
        let r = !0;
        void 0 !== t && (((i = i || this.constructor.getPropertyOptions(t)).hasChanged || S2)(this[t], e) ? (this.L.has(t) || this.L.set(t, e), !0 === i.reflect && this.Πh !== t && (void 0 === this.Πk && (this.Πk = new Map), this.Πk.set(t, i))) : r = !1), !this.isUpdatePending && r && (this.Πg = this.Πq());
    }
    async "Πq"() {
        this.isUpdatePending = !0;
        try {
            for(await this.Πg; this.Πo;)await this.Πo;
        } catch (t) {
            Promise.reject(t);
        }
        const t6 = this.performUpdate();
        return null != t6 && await t6, !this.isUpdatePending;
    }
    performUpdate() {
        var t;
        if (!this.isUpdatePending) return;
        this.hasUpdated, this.Πi && (this.Πi.forEach((t, e)=>this[e] = t
        ), this.Πi = void 0);
        let e = !1;
        const i = this.L;
        try {
            e = this.shouldUpdate(i), e ? (this.willUpdate(i), null === (t = this.ΠU) || void 0 === t || t.forEach((t)=>{
                var e;
                return null === (e = t.hostUpdate) || void 0 === e ? void 0 : e.call(t);
            }), this.update(i)) : this.Π$();
        } catch (t6) {
            throw e = !1, this.Π$(), t6;
        }
        e && this.E(i);
    }
    willUpdate(t) {
    }
    E(t) {
        var e;
        null === (e = this.ΠU) || void 0 === e || e.forEach((t)=>{
            var e;
            return null === (e = t.hostUpdated) || void 0 === e ? void 0 : e.call(t);
        }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
    }
    "Π$"() {
        this.L = new Map, this.isUpdatePending = !1;
    }
    get updateComplete() {
        return this.getUpdateComplete();
    }
    getUpdateComplete() {
        return this.Πg;
    }
    shouldUpdate(t) {
        return !0;
    }
    update(t) {
        void 0 !== this.Πk && (this.Πk.forEach((t, e)=>this.Πj(e, this[e], t)
        ), this.Πk = void 0), this.Π$();
    }
    updated(t) {
    }
    firstUpdated(t) {
    }
}
var x1, C1, A1, $1;
P1.finalized = !0, P1.elementProperties = new Map, P1.elementStyles = [], P1.shadowRootOptions = {
    mode: "open"
}, null === (g1 = (y1 = globalThis).reactiveElementPlatformSupport) || void 0 === g1 || g1.call(y1, {
    ReactiveElement: P1
}), (null !== (b1 = (k1 = globalThis).reactiveElementVersions) && void 0 !== b1 ? b1 : k1.reactiveElementVersions = []).push("1.0.0-rc.2");
const O = globalThis.trustedTypes, T1 = O ? O.createPolicy("lit-html", {
    createHTML: (t)=>t
}) : void 0, U = `lit$${(Math.random() + "").slice(9)}$`, j = "?" + U, N1 = `<${j}>`, H1 = document, R1 = (t = "")=>H1.createComment(t)
, z1 = (t)=>null === t || "object" != typeof t && "function" != typeof t
, D = Array.isArray, M1 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, I1 = /-->/g, L1 = />/g, _1 = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g, B = /'/g, V1 = /"/g, F = /^(?:script|style|textarea)$/i, W = ((t)=>(e, ...i)=>({
            _$litType$: t,
            strings: e,
            values: i
        })
)(1), q = Symbol.for("lit-noChange"), K = Symbol.for("lit-nothing"), J = new WeakMap, Z = H1.createTreeWalker(H1, 129, null, !1), G = (t, e)=>{
    const i = t.length - 1, r = [];
    let n, o = 2 === e ? "<svg>" : "", s = M1;
    for(let e10 = 0; e10 < i; e10++){
        const i = t[e10];
        let l, a, c = -1, h = 0;
        for(; h < i.length && (s.lastIndex = h, a = s.exec(i), null !== a);)h = s.lastIndex, s === M1 ? "!--" === a[1] ? s = I1 : void 0 !== a[1] ? s = L1 : void 0 !== a[2] ? (F.test(a[2]) && (n = RegExp("</" + a[2], "g")), s = _1) : void 0 !== a[3] && (s = _1) : s === _1 ? ">" === a[0] ? (s = null != n ? n : M1, c = -1) : void 0 === a[1] ? c = -2 : (c = s.lastIndex - a[2].length, l = a[1], s = void 0 === a[3] ? _1 : '"' === a[3] ? V1 : B) : s === V1 || s === B ? s = _1 : s === I1 || s === L1 ? s = M1 : (s = _1, n = void 0);
        const d = s === _1 && t[e10 + 1].startsWith("/>") ? " " : "";
        o += s === M1 ? i + N1 : c >= 0 ? (r.push(l), i.slice(0, c) + "$lit$" + i.slice(c) + U + d) : i + U + (-2 === c ? (r.push(void 0), e10) : d);
    }
    const l = o + (t[i] || "<?>") + (2 === e ? "</svg>" : "");
    return [
        void 0 !== T1 ? T1.createHTML(l) : l,
        r
    ];
};
class Q {
    constructor({ strings: t , _$litType$: e  }, i){
        let r;
        this.parts = [];
        let n = 0, o = 0;
        const s = t.length - 1, l = this.parts, [a, c] = G(t, e);
        if (this.el = Q.createElement(a, i), Z.currentNode = this.el.content, 2 === e) {
            const t = this.el.content, e = t.firstChild;
            e.remove(), t.append(...e.childNodes);
        }
        for(; null !== (r = Z.nextNode()) && l.length < s;){
            if (1 === r.nodeType) {
                if (r.hasAttributes()) {
                    const t = [];
                    for (const e of r.getAttributeNames())if (e.endsWith("$lit$") || e.startsWith(U)) {
                        const i = c[o++];
                        if (t.push(e), void 0 !== i) {
                            const t = r.getAttribute(i.toLowerCase() + "$lit$").split(U), e = /([.?@])?(.*)/.exec(i);
                            l.push({
                                type: 1,
                                index: n,
                                name: e[2],
                                strings: t,
                                ctor: "." === e[1] ? it : "?" === e[1] ? rt : "@" === e[1] ? nt : et
                            });
                        } else l.push({
                            type: 6,
                            index: n
                        });
                    }
                    for (const e1 of t)r.removeAttribute(e1);
                }
                if (F.test(r.tagName)) {
                    const t = r.textContent.split(U), e = t.length - 1;
                    if (e > 0) {
                        r.textContent = O ? O.emptyScript : "";
                        for(let i = 0; i < e; i++)r.append(t[i], R1()), Z.nextNode(), l.push({
                            type: 2,
                            index: ++n
                        });
                        r.append(t[e], R1());
                    }
                }
            } else if (8 === r.nodeType) if (r.data === j) l.push({
                type: 2,
                index: n
            });
            else {
                let t = -1;
                for(; -1 !== (t = r.data.indexOf(U, t + 1));)l.push({
                    type: 7,
                    index: n
                }), t += U.length - 1;
            }
            n++;
        }
    }
    static createElement(t, e) {
        const i = H1.createElement("template");
        return i.innerHTML = t, i;
    }
}
function X(t, e, i = t, r) {
    var n, o, s, l;
    if (e === q) return e;
    let a = void 0 !== r ? null === (n = i.Σi) || void 0 === n ? void 0 : n[r] : i.Σo;
    const c = z1(e) ? void 0 : e._$litDirective$;
    return (null == a ? void 0 : a.constructor) !== c && (null === (o = null == a ? void 0 : a.O) || void 0 === o || o.call(a, !1), void 0 === c ? a = void 0 : (a = new c(t), a.T(t, i, r)), void 0 !== r ? (null !== (s = (l = i).Σi) && void 0 !== s ? s : l.Σi = [])[r] = a : i.Σo = a), void 0 !== a && (e = X(t, a.S(t, e.values), a, r)), e;
}
class Y {
    constructor(t, e){
        this.l = [], this.N = void 0, this.D = t, this.M = e;
    }
    u(t) {
        var e;
        const { el: { content: i  } , parts: r  } = this.D, n = (null !== (e = null == t ? void 0 : t.creationScope) && void 0 !== e ? e : H1).importNode(i, !0);
        Z.currentNode = n;
        let o = Z.nextNode(), s = 0, l = 0, a = r[0];
        for(; void 0 !== a;){
            if (s === a.index) {
                let e;
                2 === a.type ? e = new tt(o, o.nextSibling, this, t) : 1 === a.type ? e = new a.ctor(o, a.name, a.strings, this, t) : 6 === a.type && (e = new ot(o, this, t)), this.l.push(e), a = r[++l];
            }
            s !== (null == a ? void 0 : a.index) && (o = Z.nextNode(), s++);
        }
        return n;
    }
    v(t) {
        let e = 0;
        for (const i of this.l)void 0 !== i && (void 0 !== i.strings ? (i.I(t, i, e), e += i.strings.length - 2) : i.I(t[e])), e++;
    }
}
class tt {
    constructor(t, e, i, r){
        this.type = 2, this.N = void 0, this.A = t, this.B = e, this.M = i, this.options = r;
    }
    setConnected(t) {
        var e;
        null === (e = this.P) || void 0 === e || e.call(this, t);
    }
    get parentNode() {
        return this.A.parentNode;
    }
    get startNode() {
        return this.A;
    }
    get endNode() {
        return this.B;
    }
    I(t, e = this) {
        t = X(this, t, e), z1(t) ? t === K || null == t || "" === t ? (this.H !== K && this.R(), this.H = K) : t !== this.H && t !== q && this.m(t) : void 0 !== t._$litType$ ? this._(t) : void 0 !== t.nodeType ? this.$(t) : ((t)=>{
            var e;
            return D(t) || "function" == typeof (null === (e = t) || void 0 === e ? void 0 : e[Symbol.iterator]);
        })(t) ? this.g(t) : this.m(t);
    }
    k(t, e = this.B) {
        return this.A.parentNode.insertBefore(t, e);
    }
    $(t) {
        this.H !== t && (this.R(), this.H = this.k(t));
    }
    m(t) {
        const e = this.A.nextSibling;
        null !== e && 3 === e.nodeType && (null === this.B ? null === e.nextSibling : e === this.B.previousSibling) ? e.data = t : this.$(H1.createTextNode(t)), this.H = t;
    }
    _(t) {
        var e;
        const { values: i , _$litType$: r  } = t, n = "number" == typeof r ? this.C(t) : (void 0 === r.el && (r.el = Q.createElement(r.h, this.options)), r);
        if ((null === (e = this.H) || void 0 === e ? void 0 : e.D) === n) this.H.v(i);
        else {
            const t = new Y(n, this), e = t.u(this.options);
            t.v(i), this.$(e), this.H = t;
        }
    }
    C(t) {
        let e = J.get(t.strings);
        return void 0 === e && J.set(t.strings, e = new Q(t)), e;
    }
    g(t) {
        D(this.H) || (this.H = [], this.R());
        const e = this.H;
        let i, r = 0;
        for (const n of t)r === e.length ? e.push(i = new tt(this.k(R1()), this.k(R1()), this, this.options)) : i = e[r], i.I(n), r++;
        r < e.length && (this.R(i && i.B.nextSibling, r), e.length = r);
    }
    R(t = this.A.nextSibling, e) {
        var i;
        for(null === (i = this.P) || void 0 === i || i.call(this, !1, !0, e); t && t !== this.B;){
            const e = t.nextSibling;
            t.remove(), t = e;
        }
    }
}
class et {
    constructor(t, e, i, r, n){
        this.type = 1, this.H = K, this.N = void 0, this.V = void 0, this.element = t, this.name = e, this.M = r, this.options = n, i.length > 2 || "" !== i[0] || "" !== i[1] ? (this.H = Array(i.length - 1).fill(K), this.strings = i) : this.H = K;
    }
    get tagName() {
        return this.element.tagName;
    }
    I(t, e = this, i, r) {
        const n = this.strings;
        let o = !1;
        if (void 0 === n) t = X(this, t, e, 0), o = !z1(t) || t !== this.H && t !== q, o && (this.H = t);
        else {
            const r = t;
            let s, l;
            for(t = n[0], s = 0; s < n.length - 1; s++)l = X(this, r[i + s], e, s), l === q && (l = this.H[s]), o || (o = !z1(l) || l !== this.H[s]), l === K ? t = K : t !== K && (t += (null != l ? l : "") + n[s + 1]), this.H[s] = l;
        }
        o && !r && this.W(t);
    }
    W(t) {
        t === K ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t ? t : "");
    }
}
class it extends et {
    constructor(){
        super(...arguments), this.type = 3;
    }
    W(t) {
        this.element[this.name] = t === K ? void 0 : t;
    }
}
class rt extends et {
    constructor(){
        super(...arguments), this.type = 4;
    }
    W(t) {
        t && t !== K ? this.element.setAttribute(this.name, "") : this.element.removeAttribute(this.name);
    }
}
class nt extends et {
    constructor(){
        super(...arguments), this.type = 5;
    }
    I(t, e = this) {
        var i;
        if ((t = null !== (i = X(this, t, e, 0)) && void 0 !== i ? i : K) === q) return;
        const r = this.H, n = t === K && r !== K || t.capture !== r.capture || t.once !== r.once || t.passive !== r.passive, o = t !== K && (r === K || n);
        n && this.element.removeEventListener(this.name, this, r), o && this.element.addEventListener(this.name, this, t), this.H = t;
    }
    handleEvent(t) {
        var e, i;
        "function" == typeof this.H ? this.H.call(null !== (i = null === (e = this.options) || void 0 === e ? void 0 : e.host) && void 0 !== i ? i : this.element, t) : this.H.handleEvent(t);
    }
}
class ot {
    constructor(t, e, i){
        this.element = t, this.type = 6, this.N = void 0, this.V = void 0, this.M = e, this.options = i;
    }
    I(t) {
        X(this, t);
    }
}
var st, lt, at, ct, ht, dt;
null === (C1 = (x1 = globalThis).litHtmlPlatformSupport) || void 0 === C1 || C1.call(x1, Q, tt), (null !== (A1 = ($1 = globalThis).litHtmlVersions) && void 0 !== A1 ? A1 : $1.litHtmlVersions = []).push("2.0.0-rc.3"), (null !== (st = (dt = globalThis).litElementVersions) && void 0 !== st ? st : dt.litElementVersions = []).push("3.0.0-rc.2");
class ut extends P1 {
    constructor(){
        super(...arguments), this.renderOptions = {
            host: this
        }, this.Φt = void 0;
    }
    createRenderRoot() {
        var t, e;
        const i = super.createRenderRoot();
        return null !== (t = (e = this.renderOptions).renderBefore) && void 0 !== t || (e.renderBefore = i.firstChild), i;
    }
    update(t) {
        const e = this.render();
        super.update(t), this.Φt = ((t, e, i)=>{
            var r, n;
            const o = null !== (r = null == i ? void 0 : i.renderBefore) && void 0 !== r ? r : e;
            let s = o._$litPart$;
            if (void 0 === s) {
                const t = null !== (n = null == i ? void 0 : i.renderBefore) && void 0 !== n ? n : null;
                o._$litPart$ = s = new tt(e.insertBefore(R1(), t), t, void 0, i);
            }
            return s.I(t), s;
        })(e, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
        var t;
        super.connectedCallback(), null === (t = this.Φt) || void 0 === t || t.setConnected(!0);
    }
    disconnectedCallback() {
        var t;
        super.disconnectedCallback(), null === (t = this.Φt) || void 0 === t || t.setConnected(!1);
    }
    render() {
        return q;
    }
}
ut.finalized = !0, ut._$litElement$ = !0, null === (at = (lt = globalThis).litElementHydrateSupport) || void 0 === at || at.call(lt, {
    LitElement: ut
}), null === (ht = (ct = globalThis).litElementPlatformSupport) || void 0 === ht || ht.call(ct, {
    LitElement: ut
});
const pt = (t, e)=>"method" === e.kind && e.descriptor && !("value" in e.descriptor) ? {
        ...e,
        finisher (i) {
            i.createProperty(e.key, t);
        }
    } : {
        kind: "field",
        key: Symbol(),
        placement: "own",
        descriptor: {
        },
        originalKey: e.key,
        initializer () {
            "function" == typeof e.initializer && (this[e.key] = e.initializer.call(this));
        },
        finisher (i) {
            i.createProperty(e.key, t);
        }
    }
;
function ft(t) {
    return (e, i)=>void 0 !== i ? ((t, e, i)=>{
            e.constructor.createProperty(i, t);
        })(t, e, i) : pt(t, e)
    ;
}
function vt(t) {
    return null === t ? "null" : Array.isArray(t) ? "array" : typeof t;
}
function mt(t) {
    return t !== Object(t);
}
function yt(t) {
    return !!t && !!t.nodeType;
}
function gt(t) {
    return mt(t) || yt(t);
}
function bt(t) {
    try {
        if ("string" == typeof t) return JSON.parse(t);
    } catch (t6) {
        console.error(t6);
    }
    return t;
}
function* kt(t) {
    const e = [
        [
            "",
            t,
            []
        ]
    ];
    for(; e.length;){
        const [t, i, r] = e.shift();
        if (t && (yield [
            i,
            t,
            r
        ]), !mt(i)) for (const [n, o] of Object.entries(i))e.push([
            `${t}${t ? "." : ""}${n}`,
            o,
            [
                ...r,
                t
            ]
        ]);
    }
}
const wt = (t, e)=>e instanceof RegExp ? !!t.match(e) : (function(t, e) {
        t = t.split("."), e = e.split(".");
        const i = (t)=>"*" === t
        , r = (t)=>"**" === t
        ;
        let n = 0, o = 0;
        for(; n < t.length;){
            const s = e[o];
            if (s === t[n] || i(s)) o++, n++;
            else {
                if (!r(s)) return !1;
                o++, n = t.length - (e.length - o);
            }
        }
        return o === e.length;
    })(t, e)
, St = (t, e)=>(i, r)=>{
        const n = {
        };
        if (t) for (const [i, o, s] of kt(r.data))wt(o, t) && (n[o] = e, s.forEach((t)=>n[t] = e
        ));
        return {
            expanded: n
        };
    }
, Et = (t)=>()=>({
            highlight: t
        })
, Pt = ((t, ...e)=>{
    const i = 1 === t.length ? t[0] : e.reduce((e, i, r)=>e + ((t)=>{
            if (t instanceof p1) return t.cssText;
            if ("number" == typeof t) return t;
            throw Error("Value passed to 'css' function must be a 'css' function result: " + t + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
        })(i) + t[r + 1]
    , t[0]);
    return v1(i);
})`:host{--background-color:#2a2f3a;--color:#f8f8f2;--string-color:#a3eea0;--number-color:#d19a66;--boolean-color:#4ba7ef;--null-color:#df9cf3;--property-color:#6fb3d2;--font-family:monaco,Consolas,'Lucida Console',monospace;--preview-color:rgba(222,175,143,0.9);--highlight-color:#7b0000;display:block;background-color:var(--background-color);color:var(--color);padding:.5rem;font-family:var(--font-family);font-size:1rem}.preview{color:var(--preview-color)}.null{color:var(--null-color,#df9cf3)}.key{color:var(--property-color,#f9857b);display:inline-block}.collapsable:before{display:inline-block;color:var(--color);padding-right:5px;padding-left:5px;font-size:.7rem;content:'▶';transition:transform 195ms ease-in;transform:rotate(90deg);color:var(--property-color)}.collapsable.collapsableCollapsed:before{transform:rotate(0)}.collapsable{cursor:pointer;user-select:none}.string{color:var(--string-color)}.number{color:var(--number-color)}.boolean{color:var(--boolean-color)}ul{padding:0;clear:both}ul,li{list-style:none;position:relative}li ul>li{position:relative;margin-left:1.5rem;padding-left:0}ul ul:before{content:'';border-left:1px solid #333;position:absolute;left:.5rem;top:.5rem;bottom:.5rem}ul ul:hover:before{border-left:1px solid #666}mark{background-color:var(--highlight-color)}`;
let xt, Ct, At, $t, Ot, Tt, Ut, jt = (t)=>t
;
!function(t, e, i, r) {
    var n = o7();
    if (r) for(var h = 0; h < r.length; h++)n = r[h](n);
    var d = e(function(t) {
        n.initializeInstanceElements(t, u.elements);
    }, i), u = n.decorateClass(function(t) {
        for(var e = [], i = function(t) {
            return "method" === t.kind && t.key === o.key && t.placement === o.placement;
        }, r = 0; r < t.length; r++){
            var n, o = t[r];
            if ("method" === o.kind && (n = e.find(i))) if (c3(o.descriptor) || c3(n.descriptor)) {
                if (a3(o) || a3(n)) throw new ReferenceError("Duplicated methods (" + o.key + ") can't be decorated.");
                n.descriptor = o.descriptor;
            } else {
                if (a3(o)) {
                    if (a3(n)) throw new ReferenceError("Decorators can't be placed on different accessors with for the same property (" + o.key + ").");
                    n.decorators = o.decorators;
                }
                l4(o, n);
            }
            else e.push(o);
        }
        return e;
    }(d.d.map(s7)), t);
    n.initializeClassElements(d.F, u.elements), n.runClassFinishers(d.F, u.finishers);
}([
    ((t)=>(e11)=>"function" == typeof e11 ? ((t, e)=>(window.customElements.define(t, e), e)
            )(t, e11) : ((t, e10)=>{
                const { kind: i , elements: r  } = e10;
                return {
                    kind: i,
                    elements: r,
                    finisher (e) {
                        window.customElements.define(t, e);
                    }
                };
            })(t, e11)
    )("json-viewer")
], function(i, r) {
    class n extends r {
        constructor(...t){
            super(...t), i(this);
        }
    }
    return {
        F: n,
        d: [
            {
                kind: "field",
                decorators: [
                    ft({
                        converter: bt,
                        type: Object
                    })
                ],
                key: "data",
                value: ()=>null
            },
            {
                kind: "field",
                decorators: [
                    ft({
                        state: !0
                    })
                ],
                key: "state",
                value: ()=>({
                        expanded: {
                        },
                        filtered: {
                        },
                        highlight: null
                    })
            },
            {
                kind: "get",
                static: !0,
                key: "styles",
                value: function() {
                    return [
                        Pt
                    ];
                }
            },
            {
                kind: "get",
                static: !0,
                key: "is",
                value: function() {
                    return "json-viewer";
                }
            },
            {
                kind: "method",
                key: "setState",
                value: async function(t, e) {
                    this.state = {
                        ...this.state,
                        ..."function" == typeof t ? t(this.state, this) : t
                    }, this.updateComplete.then(e);
                }
            },
            {
                kind: "method",
                key: "connectedCallback",
                value: function() {
                    this.hasAttribute("data") || this.setAttribute("data", this.innerText), e9(t5(n.prototype), "connectedCallback", this).call(this);
                }
            },
            {
                kind: "field",
                key: "handlePropertyClick",
                value () {
                    return (t)=>(e)=>{
                            e.preventDefault(), this.setState(((t, e)=>(i)=>({
                                        expanded: {
                                            ...i.expanded,
                                            [t]: void 0 === e ? !i.expanded[t] : !!e
                                        }
                                    })
                            )(t));
                        }
                    ;
                }
            },
            {
                kind: "method",
                key: "expand",
                value: function(t, e) {
                    this.setState(St(t, !0), e);
                }
            },
            {
                kind: "method",
                key: "expandAll",
                value: function() {
                    this.setState(St("**", !0));
                }
            },
            {
                kind: "method",
                key: "collapseAll",
                value: function() {
                    this.setState(St("**", !1));
                }
            },
            {
                kind: "method",
                key: "collapse",
                value: function(t) {
                    this.setState(St(t, !1));
                }
            },
            {
                kind: "method",
                key: "search",
                value: function*(t) {
                    for (const [e, i, r] of kt(this.data))gt(e) && String(e).includes(t) && (this.expand(i, ()=>{
                        const t = this.renderRoot.querySelector(`[data-path="${i}"]`);
                        t.scrollIntoView({
                            behavior: "smooth",
                            inline: "center",
                            block: "center"
                        }), t.focus();
                    }), this.setState(Et(i)), yield {
                        value: e,
                        path: i
                    });
                    this.setState(Et(null));
                }
            },
            {
                kind: "method",
                key: "filter",
                value: function(t) {
                    var e;
                    this.setState((e = t, (t, i)=>{
                        const r = {
                        };
                        if (e) for (const [t, n, o] of kt(i.data))wt(n, e) ? (r[n] = !1, o.forEach((t)=>r[t] = !1
                        )) : r[n] = !0;
                        return {
                            filtered: r
                        };
                    }));
                }
            },
            {
                kind: "method",
                key: "resetFilter",
                value: function() {
                    this.setState({
                        filtered: {
                        }
                    });
                }
            },
            {
                kind: "method",
                key: "renderObject",
                value: function(t, e) {
                    return W(xt || (xt = jt`<ul>${0}</ul>`), Object.keys(t).map((i)=>{
                        const r = t[i], n = e ? `${e}.${i}` : i, o = gt(r), s = this.state.expanded[n] || o;
                        return W(Ct || (Ct = jt`<li data-path="${0}" .hidden="${0}">${0} ${0}</li>`), n, this.state.filtered[n], this.renderPropertyKey({
                            isCollapsable: !o,
                            collapsed: !this.state.expanded[n],
                            key: i,
                            onClick: this.handlePropertyClick(n)
                        }), s ? this.renderNode(r, n) : this.renderNodePreview(r));
                    }));
                }
            },
            {
                kind: "method",
                key: "renderNode",
                value: function(t, e = "") {
                    return gt(t) ? this.renderValue(t, e) : this.renderObject(t, e);
                }
            },
            {
                kind: "method",
                key: "renderNodePreview",
                value: function(t) {
                    return W(At || (At = jt`<span class="preview">${0}</span>`), function(t, e) {
                        const { nodeCount: i , maxLength: r  } = {
                            nodeCount: 3,
                            maxLength: 15,
                            ...e
                        }, n = Array.isArray(t), o = Object.keys(t), s = o.slice(0, i), l = [
                            n ? "[ " : "{ "
                        ], a = [];
                        for (const e10 of s){
                            const i = [], o = t[e10], s = vt(o);
                            n || i.push(e10 + ": "), "object" === s ? i.push("{ ... }") : "array" === s ? i.push("[ ... ]") : "string" === s ? i.push(`"${o.substring(0, r)}${o.length > r ? "..." : ""}"`) : i.push(String(o)), a.push(i.join(""));
                        }
                        return o.length > i && a.push("..."), l.push(a.join(", ")), l.push(n ? " ]" : " }"), l.join("");
                    }(t));
                }
            },
            {
                kind: "method",
                key: "renderPropertyKey",
                value: function({ isCollapsable: t , collapsed: e , onClick: i , key: r  }) {
                    return W($t || ($t = jt`<span class="${0}" @click="${0}">${0}:</span>`), function(...t) {
                        return t.filter(Boolean).join(" ");
                    }(r && "key", t && "collapsable", e && "collapsableCollapsed"), t ? i : null, r);
                }
            },
            {
                kind: "method",
                key: "renderValue",
                value: function(t, e) {
                    const i = this.state.highlight, r = yt(t) ? t : W(Ot || (Ot = jt`<span tabindex="0" class="${0}">${0}</span>`), vt(t), JSON.stringify(t));
                    return null !== i && e === i ? W(Tt || (Tt = jt`<mark>${0}</mark>`), r) : r;
                }
            },
            {
                kind: "method",
                key: "render",
                value: function() {
                    return W(Ut || (Ut = jt`${0}`), this.renderNode(this.data));
                }
            }
        ]
    };
}, ut);
export { s3 as LitElement, r as css, p as html, c2 as repeat, s6 as initialState, h2 as Task };
