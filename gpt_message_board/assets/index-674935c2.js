var Eg = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
var O4 = Eg((Ot, Tt) => {
  (function () {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload")) return;
    for (const o of document.querySelectorAll('link[rel="modulepreload"]'))
      r(o);
    new MutationObserver((o) => {
      for (const s of o)
        if (s.type === "childList")
          for (const i of s.addedNodes)
            i.tagName === "LINK" && i.rel === "modulepreload" && r(i);
    }).observe(document, { childList: !0, subtree: !0 });
    function n(o) {
      const s = {};
      return (
        o.integrity && (s.integrity = o.integrity),
        o.referrerPolicy && (s.referrerPolicy = o.referrerPolicy),
        o.crossOrigin === "use-credentials"
          ? (s.credentials = "include")
          : o.crossOrigin === "anonymous"
          ? (s.credentials = "omit")
          : (s.credentials = "same-origin"),
        s
      );
    }
    function r(o) {
      if (o.ep) return;
      o.ep = !0;
      const s = n(o);
      fetch(o.href, s);
    }
  })();
  function Ia(e, t) {
    const n = Object.create(null),
      r = e.split(",");
    for (let o = 0; o < r.length; o++) n[r[o]] = !0;
    return t ? (o) => !!n[o.toLowerCase()] : (o) => !!n[o];
  }
  function rn(e) {
    if (pe(e)) {
      const t = {};
      for (let n = 0; n < e.length; n++) {
        const r = e[n],
          o = Ee(r) ? $g(r) : rn(r);
        if (o) for (const s in o) t[s] = o[s];
      }
      return t;
    } else {
      if (Ee(e)) return e;
      if (Me(e)) return e;
    }
  }
  const Sg = /;(?![^(]*\))/g,
    Og = /:([^]+)/,
    Tg = /\/\*.*?\*\//gs;
  function $g(e) {
    const t = {};
    return (
      e
        .replace(Tg, "")
        .split(Sg)
        .forEach((n) => {
          if (n) {
            const r = n.split(Og);
            r.length > 1 && (t[r[0].trim()] = r[1].trim());
          }
        }),
      t
    );
  }
  function _e(e) {
    let t = "";
    if (Ee(e)) t = e;
    else if (pe(e))
      for (let n = 0; n < e.length; n++) {
        const r = _e(e[n]);
        r && (t += r + " ");
      }
    else if (Me(e)) for (const n in e) e[n] && (t += n + " ");
    return t.trim();
  }
  const Cg =
      "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
    Ag = Ia(Cg);
  function Nf(e) {
    return !!e || e === "";
  }
  const lt = (e) =>
      Ee(e)
        ? e
        : e == null
        ? ""
        : pe(e) || (Me(e) && (e.toString === Df || !he(e.toString)))
        ? JSON.stringify(e, Lf, 2)
        : String(e),
    Lf = (e, t) =>
      t && t.__v_isRef
        ? Lf(e, t.value)
        : Or(t)
        ? {
            [`Map(${t.size})`]: [...t.entries()].reduce(
              (n, [r, o]) => ((n[`${r} =>`] = o), n),
              {}
            ),
          }
        : jf(t)
        ? { [`Set(${t.size})`]: [...t.values()] }
        : Me(t) && !pe(t) && !zf(t)
        ? String(t)
        : t,
    Ve = {},
    Sr = [],
    ut = () => {},
    kg = () => !1,
    Pg = /^on[^a-z]/,
    zs = (e) => Pg.test(e),
    Fa = (e) => e.startsWith("onUpdate:"),
    tt = Object.assign,
    Na = (e, t) => {
      const n = e.indexOf(t);
      n > -1 && e.splice(n, 1);
    },
    Rg = Object.prototype.hasOwnProperty,
    Ce = (e, t) => Rg.call(e, t),
    pe = Array.isArray,
    Or = (e) => Hs(e) === "[object Map]",
    jf = (e) => Hs(e) === "[object Set]",
    he = (e) => typeof e == "function",
    Ee = (e) => typeof e == "string",
    La = (e) => typeof e == "symbol",
    Me = (e) => e !== null && typeof e == "object",
    Bf = (e) => Me(e) && he(e.then) && he(e.catch),
    Df = Object.prototype.toString,
    Hs = (e) => Df.call(e),
    Mg = (e) => Hs(e).slice(8, -1),
    zf = (e) => Hs(e) === "[object Object]",
    ja = (e) =>
      Ee(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
    ps = Ia(
      ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
    ),
    Us = (e) => {
      const t = Object.create(null);
      return (n) => t[n] || (t[n] = e(n));
    },
    Ig = /-(\w)/g,
    Ut = Us((e) => e.replace(Ig, (t, n) => (n ? n.toUpperCase() : ""))),
    Fg = /\B([A-Z])/g,
    lr = Us((e) => e.replace(Fg, "-$1").toLowerCase()),
    qs = Us((e) => e.charAt(0).toUpperCase() + e.slice(1)),
    hs = Us((e) => (e ? `on${qs(e)}` : "")),
    Eo = (e, t) => !Object.is(e, t),
    vi = (e, t) => {
      for (let n = 0; n < e.length; n++) e[n](t);
    },
    $s = (e, t, n) => {
      Object.defineProperty(e, t, {
        configurable: !0,
        enumerable: !1,
        value: n,
      });
    },
    Ng = (e) => {
      const t = parseFloat(e);
      return isNaN(t) ? e : t;
    },
    Lg = (e) => {
      const t = Ee(e) ? Number(e) : NaN;
      return isNaN(t) ? e : t;
    };
  let Xl;
  const jg = () =>
    Xl ||
    (Xl =
      typeof globalThis < "u"
        ? globalThis
        : typeof self < "u"
        ? self
        : typeof window < "u"
        ? window
        : typeof global < "u"
        ? global
        : {});
  let Et;
  class Hf {
    constructor(t = !1) {
      (this.detached = t),
        (this._active = !0),
        (this.effects = []),
        (this.cleanups = []),
        (this.parent = Et),
        !t &&
          Et &&
          (this.index = (Et.scopes || (Et.scopes = [])).push(this) - 1);
    }
    get active() {
      return this._active;
    }
    run(t) {
      if (this._active) {
        const n = Et;
        try {
          return (Et = this), t();
        } finally {
          Et = n;
        }
      }
    }
    on() {
      Et = this;
    }
    off() {
      Et = this.parent;
    }
    stop(t) {
      if (this._active) {
        let n, r;
        for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
        for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
        if (this.scopes)
          for (n = 0, r = this.scopes.length; n < r; n++)
            this.scopes[n].stop(!0);
        if (!this.detached && this.parent && !t) {
          const o = this.parent.scopes.pop();
          o &&
            o !== this &&
            ((this.parent.scopes[this.index] = o), (o.index = this.index));
        }
        (this.parent = void 0), (this._active = !1);
      }
    }
  }
  function Bg(e) {
    return new Hf(e);
  }
  function Dg(e, t = Et) {
    t && t.active && t.effects.push(e);
  }
  function Uf() {
    return Et;
  }
  function zg(e) {
    Et && Et.cleanups.push(e);
  }
  const Ba = (e) => {
      const t = new Set(e);
      return (t.w = 0), (t.n = 0), t;
    },
    qf = (e) => (e.w & Nn) > 0,
    Vf = (e) => (e.n & Nn) > 0,
    Hg = ({ deps: e }) => {
      if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= Nn;
    },
    Ug = (e) => {
      const { deps: t } = e;
      if (t.length) {
        let n = 0;
        for (let r = 0; r < t.length; r++) {
          const o = t[r];
          qf(o) && !Vf(o) ? o.delete(e) : (t[n++] = o),
            (o.w &= ~Nn),
            (o.n &= ~Nn);
        }
        t.length = n;
      }
    },
    Cs = new WeakMap();
  let co = 0,
    Nn = 1;
  const qi = 30;
  let Bt;
  const tr = Symbol(""),
    Vi = Symbol("");
  class Da {
    constructor(t, n = null, r) {
      (this.fn = t),
        (this.scheduler = n),
        (this.active = !0),
        (this.deps = []),
        (this.parent = void 0),
        Dg(this, r);
    }
    run() {
      if (!this.active) return this.fn();
      let t = Bt,
        n = In;
      for (; t; ) {
        if (t === this) return;
        t = t.parent;
      }
      try {
        return (
          (this.parent = Bt),
          (Bt = this),
          (In = !0),
          (Nn = 1 << ++co),
          co <= qi ? Hg(this) : eu(this),
          this.fn()
        );
      } finally {
        co <= qi && Ug(this),
          (Nn = 1 << --co),
          (Bt = this.parent),
          (In = n),
          (this.parent = void 0),
          this.deferStop && this.stop();
      }
    }
    stop() {
      Bt === this
        ? (this.deferStop = !0)
        : this.active &&
          (eu(this), this.onStop && this.onStop(), (this.active = !1));
    }
  }
  function eu(e) {
    const { deps: t } = e;
    if (t.length) {
      for (let n = 0; n < t.length; n++) t[n].delete(e);
      t.length = 0;
    }
  }
  let In = !0;
  const Wf = [];
  function qr() {
    Wf.push(In), (In = !1);
  }
  function Vr() {
    const e = Wf.pop();
    In = e === void 0 ? !0 : e;
  }
  function yt(e, t, n) {
    if (In && Bt) {
      let r = Cs.get(e);
      r || Cs.set(e, (r = new Map()));
      let o = r.get(n);
      o || r.set(n, (o = Ba())), Kf(o);
    }
  }
  function Kf(e, t) {
    let n = !1;
    co <= qi ? Vf(e) || ((e.n |= Nn), (n = !qf(e))) : (n = !e.has(Bt)),
      n && (e.add(Bt), Bt.deps.push(e));
  }
  function hn(e, t, n, r, o, s) {
    const i = Cs.get(e);
    if (!i) return;
    let a = [];
    if (t === "clear") a = [...i.values()];
    else if (n === "length" && pe(e)) {
      const l = Number(r);
      i.forEach((u, c) => {
        (c === "length" || c >= l) && a.push(u);
      });
    } else
      switch ((n !== void 0 && a.push(i.get(n)), t)) {
        case "add":
          pe(e)
            ? ja(n) && a.push(i.get("length"))
            : (a.push(i.get(tr)), Or(e) && a.push(i.get(Vi)));
          break;
        case "delete":
          pe(e) || (a.push(i.get(tr)), Or(e) && a.push(i.get(Vi)));
          break;
        case "set":
          Or(e) && a.push(i.get(tr));
          break;
      }
    if (a.length === 1) a[0] && Wi(a[0]);
    else {
      const l = [];
      for (const u of a) u && l.push(...u);
      Wi(Ba(l));
    }
  }
  function Wi(e, t) {
    const n = pe(e) ? e : [...e];
    for (const r of n) r.computed && tu(r);
    for (const r of n) r.computed || tu(r);
  }
  function tu(e, t) {
    (e !== Bt || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
  }
  function qg(e, t) {
    var n;
    return (n = Cs.get(e)) === null || n === void 0 ? void 0 : n.get(t);
  }
  const Vg = Ia("__proto__,__v_isRef,__isVue"),
    Gf = new Set(
      Object.getOwnPropertyNames(Symbol)
        .filter((e) => e !== "arguments" && e !== "caller")
        .map((e) => Symbol[e])
        .filter(La)
    ),
    Wg = za(),
    Kg = za(!1, !0),
    Gg = za(!0),
    nu = Jg();
  function Jg() {
    const e = {};
    return (
      ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
        e[t] = function (...n) {
          const r = ke(this);
          for (let s = 0, i = this.length; s < i; s++) yt(r, "get", s + "");
          const o = r[t](...n);
          return o === -1 || o === !1 ? r[t](...n.map(ke)) : o;
        };
      }),
      ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
        e[t] = function (...n) {
          qr();
          const r = ke(this)[t].apply(this, n);
          return Vr(), r;
        };
      }),
      e
    );
  }
  function Zg(e) {
    const t = ke(this);
    return yt(t, "has", e), t.hasOwnProperty(e);
  }
  function za(e = !1, t = !1) {
    return function (r, o, s) {
      if (o === "__v_isReactive") return !e;
      if (o === "__v_isReadonly") return e;
      if (o === "__v_isShallow") return t;
      if (o === "__v_raw" && s === (e ? (t ? dm : Xf) : t ? Qf : Yf).get(r))
        return r;
      const i = pe(r);
      if (!e) {
        if (i && Ce(nu, o)) return Reflect.get(nu, o, s);
        if (o === "hasOwnProperty") return Zg;
      }
      const a = Reflect.get(r, o, s);
      return (La(o) ? Gf.has(o) : Vg(o)) || (e || yt(r, "get", o), t)
        ? a
        : et(a)
        ? i && ja(o)
          ? a
          : a.value
        : Me(a)
        ? e
          ? zo(a)
          : ft(a)
        : a;
    };
  }
  const Yg = Jf(),
    Qg = Jf(!0);
  function Jf(e = !1) {
    return function (n, r, o, s) {
      let i = n[r];
      if (kr(i) && et(i) && !et(o)) return !1;
      if (
        !e &&
        (!As(o) && !kr(o) && ((i = ke(i)), (o = ke(o))),
        !pe(n) && et(i) && !et(o))
      )
        return (i.value = o), !0;
      const a = pe(n) && ja(r) ? Number(r) < n.length : Ce(n, r),
        l = Reflect.set(n, r, o, s);
      return (
        n === ke(s) &&
          (a ? Eo(o, i) && hn(n, "set", r, o) : hn(n, "add", r, o)),
        l
      );
    };
  }
  function Xg(e, t) {
    const n = Ce(e, t);
    e[t];
    const r = Reflect.deleteProperty(e, t);
    return r && n && hn(e, "delete", t, void 0), r;
  }
  function em(e, t) {
    const n = Reflect.has(e, t);
    return (!La(t) || !Gf.has(t)) && yt(e, "has", t), n;
  }
  function tm(e) {
    return yt(e, "iterate", pe(e) ? "length" : tr), Reflect.ownKeys(e);
  }
  const Zf = { get: Wg, set: Yg, deleteProperty: Xg, has: em, ownKeys: tm },
    nm = {
      get: Gg,
      set(e, t) {
        return !0;
      },
      deleteProperty(e, t) {
        return !0;
      },
    },
    rm = tt({}, Zf, { get: Kg, set: Qg }),
    Ha = (e) => e,
    Vs = (e) => Reflect.getPrototypeOf(e);
  function Jo(e, t, n = !1, r = !1) {
    e = e.__v_raw;
    const o = ke(e),
      s = ke(t);
    n || (t !== s && yt(o, "get", t), yt(o, "get", s));
    const { has: i } = Vs(o),
      a = r ? Ha : n ? Va : So;
    if (i.call(o, t)) return a(e.get(t));
    if (i.call(o, s)) return a(e.get(s));
    e !== o && e.get(t);
  }
  function Zo(e, t = !1) {
    const n = this.__v_raw,
      r = ke(n),
      o = ke(e);
    return (
      t || (e !== o && yt(r, "has", e), yt(r, "has", o)),
      e === o ? n.has(e) : n.has(e) || n.has(o)
    );
  }
  function Yo(e, t = !1) {
    return (
      (e = e.__v_raw), !t && yt(ke(e), "iterate", tr), Reflect.get(e, "size", e)
    );
  }
  function ru(e) {
    e = ke(e);
    const t = ke(this);
    return Vs(t).has.call(t, e) || (t.add(e), hn(t, "add", e, e)), this;
  }
  function ou(e, t) {
    t = ke(t);
    const n = ke(this),
      { has: r, get: o } = Vs(n);
    let s = r.call(n, e);
    s || ((e = ke(e)), (s = r.call(n, e)));
    const i = o.call(n, e);
    return (
      n.set(e, t), s ? Eo(t, i) && hn(n, "set", e, t) : hn(n, "add", e, t), this
    );
  }
  function su(e) {
    const t = ke(this),
      { has: n, get: r } = Vs(t);
    let o = n.call(t, e);
    o || ((e = ke(e)), (o = n.call(t, e))), r && r.call(t, e);
    const s = t.delete(e);
    return o && hn(t, "delete", e, void 0), s;
  }
  function iu() {
    const e = ke(this),
      t = e.size !== 0,
      n = e.clear();
    return t && hn(e, "clear", void 0, void 0), n;
  }
  function Qo(e, t) {
    return function (r, o) {
      const s = this,
        i = s.__v_raw,
        a = ke(i),
        l = t ? Ha : e ? Va : So;
      return (
        !e && yt(a, "iterate", tr),
        i.forEach((u, c) => r.call(o, l(u), l(c), s))
      );
    };
  }
  function Xo(e, t, n) {
    return function (...r) {
      const o = this.__v_raw,
        s = ke(o),
        i = Or(s),
        a = e === "entries" || (e === Symbol.iterator && i),
        l = e === "keys" && i,
        u = o[e](...r),
        c = n ? Ha : t ? Va : So;
      return (
        !t && yt(s, "iterate", l ? Vi : tr),
        {
          next() {
            const { value: f, done: d } = u.next();
            return d
              ? { value: f, done: d }
              : { value: a ? [c(f[0]), c(f[1])] : c(f), done: d };
          },
          [Symbol.iterator]() {
            return this;
          },
        }
      );
    };
  }
  function xn(e) {
    return function (...t) {
      return e === "delete" ? !1 : this;
    };
  }
  function om() {
    const e = {
        get(s) {
          return Jo(this, s);
        },
        get size() {
          return Yo(this);
        },
        has: Zo,
        add: ru,
        set: ou,
        delete: su,
        clear: iu,
        forEach: Qo(!1, !1),
      },
      t = {
        get(s) {
          return Jo(this, s, !1, !0);
        },
        get size() {
          return Yo(this);
        },
        has: Zo,
        add: ru,
        set: ou,
        delete: su,
        clear: iu,
        forEach: Qo(!1, !0),
      },
      n = {
        get(s) {
          return Jo(this, s, !0);
        },
        get size() {
          return Yo(this, !0);
        },
        has(s) {
          return Zo.call(this, s, !0);
        },
        add: xn("add"),
        set: xn("set"),
        delete: xn("delete"),
        clear: xn("clear"),
        forEach: Qo(!0, !1),
      },
      r = {
        get(s) {
          return Jo(this, s, !0, !0);
        },
        get size() {
          return Yo(this, !0);
        },
        has(s) {
          return Zo.call(this, s, !0);
        },
        add: xn("add"),
        set: xn("set"),
        delete: xn("delete"),
        clear: xn("clear"),
        forEach: Qo(!0, !0),
      };
    return (
      ["keys", "values", "entries", Symbol.iterator].forEach((s) => {
        (e[s] = Xo(s, !1, !1)),
          (n[s] = Xo(s, !0, !1)),
          (t[s] = Xo(s, !1, !0)),
          (r[s] = Xo(s, !0, !0));
      }),
      [e, n, t, r]
    );
  }
  const [sm, im, am, lm] = om();
  function Ua(e, t) {
    const n = t ? (e ? lm : am) : e ? im : sm;
    return (r, o, s) =>
      o === "__v_isReactive"
        ? !e
        : o === "__v_isReadonly"
        ? e
        : o === "__v_raw"
        ? r
        : Reflect.get(Ce(n, o) && o in r ? n : r, o, s);
  }
  const um = { get: Ua(!1, !1) },
    cm = { get: Ua(!1, !0) },
    fm = { get: Ua(!0, !1) },
    Yf = new WeakMap(),
    Qf = new WeakMap(),
    Xf = new WeakMap(),
    dm = new WeakMap();
  function pm(e) {
    switch (e) {
      case "Object":
      case "Array":
        return 1;
      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2;
      default:
        return 0;
    }
  }
  function hm(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : pm(Mg(e));
  }
  function ft(e) {
    return kr(e) ? e : qa(e, !1, Zf, um, Yf);
  }
  function ed(e) {
    return qa(e, !1, rm, cm, Qf);
  }
  function zo(e) {
    return qa(e, !0, nm, fm, Xf);
  }
  function qa(e, t, n, r, o) {
    if (!Me(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
    const s = o.get(e);
    if (s) return s;
    const i = hm(e);
    if (i === 0) return e;
    const a = new Proxy(e, i === 2 ? r : n);
    return o.set(e, a), a;
  }
  function Tr(e) {
    return kr(e) ? Tr(e.__v_raw) : !!(e && e.__v_isReactive);
  }
  function kr(e) {
    return !!(e && e.__v_isReadonly);
  }
  function As(e) {
    return !!(e && e.__v_isShallow);
  }
  function td(e) {
    return Tr(e) || kr(e);
  }
  function ke(e) {
    const t = e && e.__v_raw;
    return t ? ke(t) : e;
  }
  function nd(e) {
    return $s(e, "__v_skip", !0), e;
  }
  const So = (e) => (Me(e) ? ft(e) : e),
    Va = (e) => (Me(e) ? zo(e) : e);
  function rd(e) {
    In && Bt && ((e = ke(e)), Kf(e.dep || (e.dep = Ba())));
  }
  function od(e, t) {
    e = ke(e);
    const n = e.dep;
    n && Wi(n);
  }
  function et(e) {
    return !!(e && e.__v_isRef === !0);
  }
  function re(e) {
    return sd(e, !1);
  }
  function $r(e) {
    return sd(e, !0);
  }
  function sd(e, t) {
    return et(e) ? e : new gm(e, t);
  }
  class gm {
    constructor(t, n) {
      (this.__v_isShallow = n),
        (this.dep = void 0),
        (this.__v_isRef = !0),
        (this._rawValue = n ? t : ke(t)),
        (this._value = n ? t : So(t));
    }
    get value() {
      return rd(this), this._value;
    }
    set value(t) {
      const n = this.__v_isShallow || As(t) || kr(t);
      (t = n ? t : ke(t)),
        Eo(t, this._rawValue) &&
          ((this._rawValue = t), (this._value = n ? t : So(t)), od(this));
    }
  }
  function y(e) {
    return et(e) ? e.value : e;
  }
  const mm = {
    get: (e, t, n) => y(Reflect.get(e, t, n)),
    set: (e, t, n, r) => {
      const o = e[t];
      return et(o) && !et(n) ? ((o.value = n), !0) : Reflect.set(e, t, n, r);
    },
  };
  function id(e) {
    return Tr(e) ? e : new Proxy(e, mm);
  }
  function Wa(e) {
    const t = pe(e) ? new Array(e.length) : {};
    for (const n in e) t[n] = Xt(e, n);
    return t;
  }
  class vm {
    constructor(t, n, r) {
      (this._object = t),
        (this._key = n),
        (this._defaultValue = r),
        (this.__v_isRef = !0);
    }
    get value() {
      const t = this._object[this._key];
      return t === void 0 ? this._defaultValue : t;
    }
    set value(t) {
      this._object[this._key] = t;
    }
    get dep() {
      return qg(ke(this._object), this._key);
    }
  }
  function Xt(e, t, n) {
    const r = e[t];
    return et(r) ? r : new vm(e, t, n);
  }
  var ad;
  class ym {
    constructor(t, n, r, o) {
      (this._setter = n),
        (this.dep = void 0),
        (this.__v_isRef = !0),
        (this[ad] = !1),
        (this._dirty = !0),
        (this.effect = new Da(t, () => {
          this._dirty || ((this._dirty = !0), od(this));
        })),
        (this.effect.computed = this),
        (this.effect.active = this._cacheable = !o),
        (this.__v_isReadonly = r);
    }
    get value() {
      const t = ke(this);
      return (
        rd(t),
        (t._dirty || !t._cacheable) &&
          ((t._dirty = !1), (t._value = t.effect.run())),
        t._value
      );
    }
    set value(t) {
      this._setter(t);
    }
  }
  ad = "__v_isReadonly";
  function bm(e, t, n = !1) {
    let r, o;
    const s = he(e);
    return (
      s ? ((r = e), (o = ut)) : ((r = e.get), (o = e.set)),
      new ym(r, o, s || !o, n)
    );
  }
  function _m(e, ...t) {}
  function Fn(e, t, n, r) {
    let o;
    try {
      o = r ? e(...r) : e();
    } catch (s) {
      Ws(s, t, n);
    }
    return o;
  }
  function Rt(e, t, n, r) {
    if (he(e)) {
      const s = Fn(e, t, n, r);
      return (
        s &&
          Bf(s) &&
          s.catch((i) => {
            Ws(i, t, n);
          }),
        s
      );
    }
    const o = [];
    for (let s = 0; s < e.length; s++) o.push(Rt(e[s], t, n, r));
    return o;
  }
  function Ws(e, t, n, r = !0) {
    const o = t ? t.vnode : null;
    if (t) {
      let s = t.parent;
      const i = t.proxy,
        a = n;
      for (; s; ) {
        const u = s.ec;
        if (u) {
          for (let c = 0; c < u.length; c++) if (u[c](e, i, a) === !1) return;
        }
        s = s.parent;
      }
      const l = t.appContext.config.errorHandler;
      if (l) {
        Fn(l, null, 10, [e, i, a]);
        return;
      }
    }
    wm(e, n, o, r);
  }
  function wm(e, t, n, r = !0) {
    console.error(e);
  }
  let Oo = !1,
    Ki = !1;
  const it = [];
  let Yt = 0;
  const Cr = [];
  let cn = null,
    Jn = 0;
  const ld = Promise.resolve();
  let Ka = null;
  function at(e) {
    const t = Ka || ld;
    return e ? t.then(this ? e.bind(this) : e) : t;
  }
  function xm(e) {
    let t = Yt + 1,
      n = it.length;
    for (; t < n; ) {
      const r = (t + n) >>> 1;
      To(it[r]) < e ? (t = r + 1) : (n = r);
    }
    return t;
  }
  function Ga(e) {
    (!it.length || !it.includes(e, Oo && e.allowRecurse ? Yt + 1 : Yt)) &&
      (e.id == null ? it.push(e) : it.splice(xm(e.id), 0, e), ud());
  }
  function ud() {
    !Oo && !Ki && ((Ki = !0), (Ka = ld.then(fd)));
  }
  function Em(e) {
    const t = it.indexOf(e);
    t > Yt && it.splice(t, 1);
  }
  function Sm(e) {
    pe(e)
      ? Cr.push(...e)
      : (!cn || !cn.includes(e, e.allowRecurse ? Jn + 1 : Jn)) && Cr.push(e),
      ud();
  }
  function au(e, t = Oo ? Yt + 1 : 0) {
    for (; t < it.length; t++) {
      const n = it[t];
      n && n.pre && (it.splice(t, 1), t--, n());
    }
  }
  function cd(e) {
    if (Cr.length) {
      const t = [...new Set(Cr)];
      if (((Cr.length = 0), cn)) {
        cn.push(...t);
        return;
      }
      for (
        cn = t, cn.sort((n, r) => To(n) - To(r)), Jn = 0;
        Jn < cn.length;
        Jn++
      )
        cn[Jn]();
      (cn = null), (Jn = 0);
    }
  }
  const To = (e) => (e.id == null ? 1 / 0 : e.id),
    Om = (e, t) => {
      const n = To(e) - To(t);
      if (n === 0) {
        if (e.pre && !t.pre) return -1;
        if (t.pre && !e.pre) return 1;
      }
      return n;
    };
  function fd(e) {
    (Ki = !1), (Oo = !0), it.sort(Om);
    const t = ut;
    try {
      for (Yt = 0; Yt < it.length; Yt++) {
        const n = it[Yt];
        n && n.active !== !1 && Fn(n, null, 14);
      }
    } finally {
      (Yt = 0),
        (it.length = 0),
        cd(),
        (Oo = !1),
        (Ka = null),
        (it.length || Cr.length) && fd();
    }
  }
  function Tm(e, t, ...n) {
    if (e.isUnmounted) return;
    const r = e.vnode.props || Ve;
    let o = n;
    const s = t.startsWith("update:"),
      i = s && t.slice(7);
    if (i && i in r) {
      const c = `${i === "modelValue" ? "model" : i}Modifiers`,
        { number: f, trim: d } = r[c] || Ve;
      d && (o = n.map((p) => (Ee(p) ? p.trim() : p))), f && (o = n.map(Ng));
    }
    let a,
      l = r[(a = hs(t))] || r[(a = hs(Ut(t)))];
    !l && s && (l = r[(a = hs(lr(t)))]), l && Rt(l, e, 6, o);
    const u = r[a + "Once"];
    if (u) {
      if (!e.emitted) e.emitted = {};
      else if (e.emitted[a]) return;
      (e.emitted[a] = !0), Rt(u, e, 6, o);
    }
  }
  function dd(e, t, n = !1) {
    const r = t.emitsCache,
      o = r.get(e);
    if (o !== void 0) return o;
    const s = e.emits;
    let i = {},
      a = !1;
    if (!he(e)) {
      const l = (u) => {
        const c = dd(u, t, !0);
        c && ((a = !0), tt(i, c));
      };
      !n && t.mixins.length && t.mixins.forEach(l),
        e.extends && l(e.extends),
        e.mixins && e.mixins.forEach(l);
    }
    return !s && !a
      ? (Me(e) && r.set(e, null), null)
      : (pe(s) ? s.forEach((l) => (i[l] = null)) : tt(i, s),
        Me(e) && r.set(e, i),
        i);
  }
  function Ks(e, t) {
    return !e || !zs(t)
      ? !1
      : ((t = t.slice(2).replace(/Once$/, "")),
        Ce(e, t[0].toLowerCase() + t.slice(1)) || Ce(e, lr(t)) || Ce(e, t));
  }
  let rt = null,
    pd = null;
  function ks(e) {
    const t = rt;
    return (rt = e), (pd = (e && e.type.__scopeId) || null), t;
  }
  function we(e, t = rt, n) {
    if (!t || e._n) return e;
    const r = (...o) => {
      r._d && yu(-1);
      const s = ks(t);
      let i;
      try {
        i = e(...o);
      } finally {
        ks(s), r._d && yu(1);
      }
      return i;
    };
    return (r._n = !0), (r._c = !0), (r._d = !0), r;
  }
  function yi(e) {
    const {
      type: t,
      vnode: n,
      proxy: r,
      withProxy: o,
      props: s,
      propsOptions: [i],
      slots: a,
      attrs: l,
      emit: u,
      render: c,
      renderCache: f,
      data: d,
      setupState: p,
      ctx: h,
      inheritAttrs: g,
    } = e;
    let _, m;
    const w = ks(e);
    try {
      if (n.shapeFlag & 4) {
        const E = o || r;
        (_ = Zt(c.call(E, E, f, s, p, d, h))), (m = l);
      } else {
        const E = t;
        (_ = Zt(
          E.length > 1 ? E(s, { attrs: l, slots: a, emit: u }) : E(s, null)
        )),
          (m = t.props ? l : $m(l));
      }
    } catch (E) {
      (mo.length = 0), Ws(E, e, 1), (_ = ve($t));
    }
    let x = _;
    if (m && g !== !1) {
      const E = Object.keys(m),
        { shapeFlag: I } = x;
      E.length && I & 7 && (i && E.some(Fa) && (m = Cm(m, i)), (x = gn(x, m)));
    }
    return (
      n.dirs &&
        ((x = gn(x)), (x.dirs = x.dirs ? x.dirs.concat(n.dirs) : n.dirs)),
      n.transition && (x.transition = n.transition),
      (_ = x),
      ks(w),
      _
    );
  }
  const $m = (e) => {
      let t;
      for (const n in e)
        (n === "class" || n === "style" || zs(n)) &&
          ((t || (t = {}))[n] = e[n]);
      return t;
    },
    Cm = (e, t) => {
      const n = {};
      for (const r in e) (!Fa(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
      return n;
    };
  function Am(e, t, n) {
    const { props: r, children: o, component: s } = e,
      { props: i, children: a, patchFlag: l } = t,
      u = s.emitsOptions;
    if (t.dirs || t.transition) return !0;
    if (n && l >= 0) {
      if (l & 1024) return !0;
      if (l & 16) return r ? lu(r, i, u) : !!i;
      if (l & 8) {
        const c = t.dynamicProps;
        for (let f = 0; f < c.length; f++) {
          const d = c[f];
          if (i[d] !== r[d] && !Ks(u, d)) return !0;
        }
      }
    } else
      return (o || a) && (!a || !a.$stable)
        ? !0
        : r === i
        ? !1
        : r
        ? i
          ? lu(r, i, u)
          : !0
        : !!i;
    return !1;
  }
  function lu(e, t, n) {
    const r = Object.keys(t);
    if (r.length !== Object.keys(e).length) return !0;
    for (let o = 0; o < r.length; o++) {
      const s = r[o];
      if (t[s] !== e[s] && !Ks(n, s)) return !0;
    }
    return !1;
  }
  function km({ vnode: e, parent: t }, n) {
    for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
  }
  const Pm = (e) => e.__isSuspense;
  function Rm(e, t) {
    t && t.pendingBranch
      ? pe(e)
        ? t.effects.push(...e)
        : t.effects.push(e)
      : Sm(e);
  }
  function ot(e, t) {
    if (Ke) {
      let n = Ke.provides;
      const r = Ke.parent && Ke.parent.provides;
      r === n && (n = Ke.provides = Object.create(r)), (n[e] = t);
    }
  }
  function Pe(e, t, n = !1) {
    const r = Ke || rt;
    if (r) {
      const o =
        r.parent == null
          ? r.vnode.appContext && r.vnode.appContext.provides
          : r.parent.provides;
      if (o && e in o) return o[e];
      if (arguments.length > 1) return n && he(t) ? t.call(r.proxy) : t;
    }
  }
  function Mm(e, t) {
    return Ja(e, null, t);
  }
  const es = {};
  function xe(e, t, n) {
    return Ja(e, t, n);
  }
  function Ja(
    e,
    t,
    { immediate: n, deep: r, flush: o, onTrack: s, onTrigger: i } = Ve
  ) {
    const a = Uf() === (Ke == null ? void 0 : Ke.scope) ? Ke : null;
    let l,
      u = !1,
      c = !1;
    if (
      (et(e)
        ? ((l = () => e.value), (u = As(e)))
        : Tr(e)
        ? ((l = () => e), (r = !0))
        : pe(e)
        ? ((c = !0),
          (u = e.some((x) => Tr(x) || As(x))),
          (l = () =>
            e.map((x) => {
              if (et(x)) return x.value;
              if (Tr(x)) return Qn(x);
              if (he(x)) return Fn(x, a, 2);
            })))
        : he(e)
        ? t
          ? (l = () => Fn(e, a, 2))
          : (l = () => {
              if (!(a && a.isUnmounted)) return f && f(), Rt(e, a, 3, [d]);
            })
        : (l = ut),
      t && r)
    ) {
      const x = l;
      l = () => Qn(x());
    }
    let f,
      d = (x) => {
        f = m.onStop = () => {
          Fn(x, a, 4);
        };
      },
      p;
    if (ko)
      if (
        ((d = ut),
        t ? n && Rt(t, a, 3, [l(), c ? [] : void 0, d]) : l(),
        o === "sync")
      ) {
        const x = Sv();
        p = x.__watcherHandles || (x.__watcherHandles = []);
      } else return ut;
    let h = c ? new Array(e.length).fill(es) : es;
    const g = () => {
      if (m.active)
        if (t) {
          const x = m.run();
          (r || u || (c ? x.some((E, I) => Eo(E, h[I])) : Eo(x, h))) &&
            (f && f(),
            Rt(t, a, 3, [x, h === es ? void 0 : c && h[0] === es ? [] : h, d]),
            (h = x));
        } else m.run();
    };
    g.allowRecurse = !!t;
    let _;
    o === "sync"
      ? (_ = g)
      : o === "post"
      ? (_ = () => gt(g, a && a.suspense))
      : ((g.pre = !0), a && (g.id = a.uid), (_ = () => Ga(g)));
    const m = new Da(l, _);
    t
      ? n
        ? g()
        : (h = m.run())
      : o === "post"
      ? gt(m.run.bind(m), a && a.suspense)
      : m.run();
    const w = () => {
      m.stop(), a && a.scope && Na(a.scope.effects, m);
    };
    return p && p.push(w), w;
  }
  function Im(e, t, n) {
    const r = this.proxy,
      o = Ee(e) ? (e.includes(".") ? hd(r, e) : () => r[e]) : e.bind(r, r);
    let s;
    he(t) ? (s = t) : ((s = t.handler), (n = t));
    const i = Ke;
    Pr(this);
    const a = Ja(o, s.bind(r), n);
    return i ? Pr(i) : nr(), a;
  }
  function hd(e, t) {
    const n = t.split(".");
    return () => {
      let r = e;
      for (let o = 0; o < n.length && r; o++) r = r[n[o]];
      return r;
    };
  }
  function Qn(e, t) {
    if (!Me(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
    if ((t.add(e), et(e))) Qn(e.value, t);
    else if (pe(e)) for (let n = 0; n < e.length; n++) Qn(e[n], t);
    else if (jf(e) || Or(e))
      e.forEach((n) => {
        Qn(n, t);
      });
    else if (zf(e)) for (const n in e) Qn(e[n], t);
    return e;
  }
  function gd() {
    const e = {
      isMounted: !1,
      isLeaving: !1,
      isUnmounting: !1,
      leavingVNodes: new Map(),
    };
    return (
      Ge(() => {
        e.isMounted = !0;
      }),
      bt(() => {
        e.isUnmounting = !0;
      }),
      e
    );
  }
  const kt = [Function, Array],
    Fm = {
      name: "BaseTransition",
      props: {
        mode: String,
        appear: Boolean,
        persisted: Boolean,
        onBeforeEnter: kt,
        onEnter: kt,
        onAfterEnter: kt,
        onEnterCancelled: kt,
        onBeforeLeave: kt,
        onLeave: kt,
        onAfterLeave: kt,
        onLeaveCancelled: kt,
        onBeforeAppear: kt,
        onAppear: kt,
        onAfterAppear: kt,
        onAppearCancelled: kt,
      },
      setup(e, { slots: t }) {
        const n = Ct(),
          r = gd();
        let o;
        return () => {
          const s = t.default && Za(t.default(), !0);
          if (!s || !s.length) return;
          let i = s[0];
          if (s.length > 1) {
            for (const g of s)
              if (g.type !== $t) {
                i = g;
                break;
              }
          }
          const a = ke(e),
            { mode: l } = a;
          if (r.isLeaving) return bi(i);
          const u = uu(i);
          if (!u) return bi(i);
          const c = $o(u, a, r, n);
          Co(u, c);
          const f = n.subTree,
            d = f && uu(f);
          let p = !1;
          const { getTransitionKey: h } = u.type;
          if (h) {
            const g = h();
            o === void 0 ? (o = g) : g !== o && ((o = g), (p = !0));
          }
          if (d && d.type !== $t && (!Zn(u, d) || p)) {
            const g = $o(d, a, r, n);
            if ((Co(d, g), l === "out-in"))
              return (
                (r.isLeaving = !0),
                (g.afterLeave = () => {
                  (r.isLeaving = !1), n.update.active !== !1 && n.update();
                }),
                bi(i)
              );
            l === "in-out" &&
              u.type !== $t &&
              (g.delayLeave = (_, m, w) => {
                const x = vd(r, d);
                (x[String(d.key)] = d),
                  (_._leaveCb = () => {
                    m(), (_._leaveCb = void 0), delete c.delayedLeave;
                  }),
                  (c.delayedLeave = w);
              });
          }
          return i;
        };
      },
    },
    md = Fm;
  function vd(e, t) {
    const { leavingVNodes: n } = e;
    let r = n.get(t.type);
    return r || ((r = Object.create(null)), n.set(t.type, r)), r;
  }
  function $o(e, t, n, r) {
    const {
        appear: o,
        mode: s,
        persisted: i = !1,
        onBeforeEnter: a,
        onEnter: l,
        onAfterEnter: u,
        onEnterCancelled: c,
        onBeforeLeave: f,
        onLeave: d,
        onAfterLeave: p,
        onLeaveCancelled: h,
        onBeforeAppear: g,
        onAppear: _,
        onAfterAppear: m,
        onAppearCancelled: w,
      } = t,
      x = String(e.key),
      E = vd(n, e),
      I = (T, H) => {
        T && Rt(T, r, 9, H);
      },
      N = (T, H) => {
        const S = H[1];
        I(T, H),
          pe(T) ? T.every((U) => U.length <= 1) && S() : T.length <= 1 && S();
      },
      D = {
        mode: s,
        persisted: i,
        beforeEnter(T) {
          let H = a;
          if (!n.isMounted)
            if (o) H = g || a;
            else return;
          T._leaveCb && T._leaveCb(!0);
          const S = E[x];
          S && Zn(e, S) && S.el._leaveCb && S.el._leaveCb(), I(H, [T]);
        },
        enter(T) {
          let H = l,
            S = u,
            U = c;
          if (!n.isMounted)
            if (o) (H = _ || l), (S = m || u), (U = w || c);
            else return;
          let $ = !1;
          const F = (T._enterCb = (L) => {
            $ ||
              (($ = !0),
              L ? I(U, [T]) : I(S, [T]),
              D.delayedLeave && D.delayedLeave(),
              (T._enterCb = void 0));
          });
          H ? N(H, [T, F]) : F();
        },
        leave(T, H) {
          const S = String(e.key);
          if ((T._enterCb && T._enterCb(!0), n.isUnmounting)) return H();
          I(f, [T]);
          let U = !1;
          const $ = (T._leaveCb = (F) => {
            U ||
              ((U = !0),
              H(),
              F ? I(h, [T]) : I(p, [T]),
              (T._leaveCb = void 0),
              E[S] === e && delete E[S]);
          });
          (E[S] = e), d ? N(d, [T, $]) : $();
        },
        clone(T) {
          return $o(T, t, n, r);
        },
      };
    return D;
  }
  function bi(e) {
    if (Gs(e)) return (e = gn(e)), (e.children = null), e;
  }
  function uu(e) {
    return Gs(e) ? (e.children ? e.children[0] : void 0) : e;
  }
  function Co(e, t) {
    e.shapeFlag & 6 && e.component
      ? Co(e.component.subTree, t)
      : e.shapeFlag & 128
      ? ((e.ssContent.transition = t.clone(e.ssContent)),
        (e.ssFallback.transition = t.clone(e.ssFallback)))
      : (e.transition = t);
  }
  function Za(e, t = !1, n) {
    let r = [],
      o = 0;
    for (let s = 0; s < e.length; s++) {
      let i = e[s];
      const a =
        n == null ? i.key : String(n) + String(i.key != null ? i.key : s);
      i.type === We
        ? (i.patchFlag & 128 && o++, (r = r.concat(Za(i.children, t, a))))
        : (t || i.type !== $t) && r.push(a != null ? gn(i, { key: a }) : i);
    }
    if (o > 1) for (let s = 0; s < r.length; s++) r[s].patchFlag = -2;
    return r;
  }
  function be(e) {
    return he(e) ? { setup: e, name: e.name } : e;
  }
  const po = (e) => !!e.type.__asyncLoader,
    Gs = (e) => e.type.__isKeepAlive;
  function Nm(e, t) {
    bd(e, "a", t);
  }
  function yd(e, t) {
    bd(e, "da", t);
  }
  function bd(e, t, n = Ke) {
    const r =
      e.__wdc ||
      (e.__wdc = () => {
        let o = n;
        for (; o; ) {
          if (o.isDeactivated) return;
          o = o.parent;
        }
        return e();
      });
    if ((Js(t, r, n), n)) {
      let o = n.parent;
      for (; o && o.parent; )
        Gs(o.parent.vnode) && Lm(r, t, n, o), (o = o.parent);
    }
  }
  function Lm(e, t, n, r) {
    const o = Js(t, e, r, !0);
    Qa(() => {
      Na(r[t], o);
    }, n);
  }
  function Js(e, t, n = Ke, r = !1) {
    if (n) {
      const o = n[e] || (n[e] = []),
        s =
          t.__weh ||
          (t.__weh = (...i) => {
            if (n.isUnmounted) return;
            qr(), Pr(n);
            const a = Rt(t, n, e, i);
            return nr(), Vr(), a;
          });
      return r ? o.unshift(s) : o.push(s), s;
    }
  }
  const yn =
      (e) =>
      (t, n = Ke) =>
        (!ko || e === "sp") && Js(e, (...r) => t(...r), n),
    _d = yn("bm"),
    Ge = yn("m"),
    jm = yn("bu"),
    Ya = yn("u"),
    bt = yn("bum"),
    Qa = yn("um"),
    Bm = yn("sp"),
    Dm = yn("rtg"),
    zm = yn("rtc");
  function Hm(e, t = Ke) {
    Js("ec", e, t);
  }
  function ur(e, t) {
    const n = rt;
    if (n === null) return e;
    const r = Ys(n) || n.proxy,
      o = e.dirs || (e.dirs = []);
    for (let s = 0; s < t.length; s++) {
      let [i, a, l, u = Ve] = t[s];
      i &&
        (he(i) && (i = { mounted: i, updated: i }),
        i.deep && Qn(a),
        o.push({
          dir: i,
          instance: r,
          value: a,
          oldValue: void 0,
          arg: l,
          modifiers: u,
        }));
    }
    return e;
  }
  function Un(e, t, n, r) {
    const o = e.dirs,
      s = t && t.dirs;
    for (let i = 0; i < o.length; i++) {
      const a = o[i];
      s && (a.oldValue = s[i].value);
      let l = a.dir[r];
      l && (qr(), Rt(l, n, 8, [e.el, a, e, t]), Vr());
    }
  }
  const Xa = "components";
  function Gi(e, t) {
    return xd(Xa, e, !0, t) || e;
  }
  const wd = Symbol();
  function Pn(e) {
    return Ee(e) ? xd(Xa, e, !1) || e : e || wd;
  }
  function xd(e, t, n = !0, r = !1) {
    const o = rt || Ke;
    if (o) {
      const s = o.type;
      if (e === Xa) {
        const a = _v(s, !1);
        if (a && (a === t || a === Ut(t) || a === qs(Ut(t)))) return s;
      }
      const i = cu(o[e] || s[e], t) || cu(o.appContext[e], t);
      return !i && r ? s : i;
    }
  }
  function cu(e, t) {
    return e && (e[t] || e[Ut(t)] || e[qs(Ut(t))]);
  }
  function Um(e, t, n, r) {
    let o;
    const s = n && n[r];
    if (pe(e) || Ee(e)) {
      o = new Array(e.length);
      for (let i = 0, a = e.length; i < a; i++)
        o[i] = t(e[i], i, void 0, s && s[i]);
    } else if (typeof e == "number") {
      o = new Array(e);
      for (let i = 0; i < e; i++) o[i] = t(i + 1, i, void 0, s && s[i]);
    } else if (Me(e))
      if (e[Symbol.iterator])
        o = Array.from(e, (i, a) => t(i, a, void 0, s && s[a]));
      else {
        const i = Object.keys(e);
        o = new Array(i.length);
        for (let a = 0, l = i.length; a < l; a++) {
          const u = i[a];
          o[a] = t(e[u], u, a, s && s[a]);
        }
      }
    else o = [];
    return n && (n[r] = o), o;
  }
  function Ae(e, t, n = {}, r, o) {
    if (rt.isCE || (rt.parent && po(rt.parent) && rt.parent.isCE))
      return t !== "default" && (n.name = t), ve("slot", n, r && r());
    let s = e[t];
    s && s._c && (s._d = !1), ee();
    const i = s && Ed(s(n)),
      a = Ne(
        We,
        { key: n.key || (i && i.key) || `_${t}` },
        i || (r ? r() : []),
        i && e._ === 1 ? 64 : -2
      );
    return (
      !o && a.scopeId && (a.slotScopeIds = [a.scopeId + "-s"]),
      s && s._c && (s._d = !0),
      a
    );
  }
  function Ed(e) {
    return e.some((t) =>
      Ln(t) ? !(t.type === $t || (t.type === We && !Ed(t.children))) : !0
    )
      ? e
      : null;
  }
  function qm(e, t) {
    const n = {};
    for (const r in e) n[t && /[A-Z]/.test(r) ? `on:${r}` : hs(r)] = e[r];
    return n;
  }
  const Ji = (e) => (e ? (Id(e) ? Ys(e) || e.proxy : Ji(e.parent)) : null),
    ho = tt(Object.create(null), {
      $: (e) => e,
      $el: (e) => e.vnode.el,
      $data: (e) => e.data,
      $props: (e) => e.props,
      $attrs: (e) => e.attrs,
      $slots: (e) => e.slots,
      $refs: (e) => e.refs,
      $parent: (e) => Ji(e.parent),
      $root: (e) => Ji(e.root),
      $emit: (e) => e.emit,
      $options: (e) => el(e),
      $forceUpdate: (e) => e.f || (e.f = () => Ga(e.update)),
      $nextTick: (e) => e.n || (e.n = at.bind(e.proxy)),
      $watch: (e) => Im.bind(e),
    }),
    _i = (e, t) => e !== Ve && !e.__isScriptSetup && Ce(e, t),
    Vm = {
      get({ _: e }, t) {
        const {
          ctx: n,
          setupState: r,
          data: o,
          props: s,
          accessCache: i,
          type: a,
          appContext: l,
        } = e;
        let u;
        if (t[0] !== "$") {
          const p = i[t];
          if (p !== void 0)
            switch (p) {
              case 1:
                return r[t];
              case 2:
                return o[t];
              case 4:
                return n[t];
              case 3:
                return s[t];
            }
          else {
            if (_i(r, t)) return (i[t] = 1), r[t];
            if (o !== Ve && Ce(o, t)) return (i[t] = 2), o[t];
            if ((u = e.propsOptions[0]) && Ce(u, t)) return (i[t] = 3), s[t];
            if (n !== Ve && Ce(n, t)) return (i[t] = 4), n[t];
            Zi && (i[t] = 0);
          }
        }
        const c = ho[t];
        let f, d;
        if (c) return t === "$attrs" && yt(e, "get", t), c(e);
        if ((f = a.__cssModules) && (f = f[t])) return f;
        if (n !== Ve && Ce(n, t)) return (i[t] = 4), n[t];
        if (((d = l.config.globalProperties), Ce(d, t))) return d[t];
      },
      set({ _: e }, t, n) {
        const { data: r, setupState: o, ctx: s } = e;
        return _i(o, t)
          ? ((o[t] = n), !0)
          : r !== Ve && Ce(r, t)
          ? ((r[t] = n), !0)
          : Ce(e.props, t) || (t[0] === "$" && t.slice(1) in e)
          ? !1
          : ((s[t] = n), !0);
      },
      has(
        {
          _: {
            data: e,
            setupState: t,
            accessCache: n,
            ctx: r,
            appContext: o,
            propsOptions: s,
          },
        },
        i
      ) {
        let a;
        return (
          !!n[i] ||
          (e !== Ve && Ce(e, i)) ||
          _i(t, i) ||
          ((a = s[0]) && Ce(a, i)) ||
          Ce(r, i) ||
          Ce(ho, i) ||
          Ce(o.config.globalProperties, i)
        );
      },
      defineProperty(e, t, n) {
        return (
          n.get != null
            ? (e._.accessCache[t] = 0)
            : Ce(n, "value") && this.set(e, t, n.value, null),
          Reflect.defineProperty(e, t, n)
        );
      },
    };
  let Zi = !0;
  function Wm(e) {
    const t = el(e),
      n = e.proxy,
      r = e.ctx;
    (Zi = !1), t.beforeCreate && fu(t.beforeCreate, e, "bc");
    const {
      data: o,
      computed: s,
      methods: i,
      watch: a,
      provide: l,
      inject: u,
      created: c,
      beforeMount: f,
      mounted: d,
      beforeUpdate: p,
      updated: h,
      activated: g,
      deactivated: _,
      beforeDestroy: m,
      beforeUnmount: w,
      destroyed: x,
      unmounted: E,
      render: I,
      renderTracked: N,
      renderTriggered: D,
      errorCaptured: T,
      serverPrefetch: H,
      expose: S,
      inheritAttrs: U,
      components: $,
      directives: F,
      filters: L,
    } = t;
    if ((u && Km(u, r, null, e.appContext.config.unwrapInjectedRef), i))
      for (const k in i) {
        const G = i[k];
        he(G) && (r[k] = G.bind(n));
      }
    if (o) {
      const k = o.call(n, n);
      Me(k) && (e.data = ft(k));
    }
    if (((Zi = !0), s))
      for (const k in s) {
        const G = s[k],
          W = he(G) ? G.bind(n, n) : he(G.get) ? G.get.bind(n, n) : ut,
          oe = !he(G) && he(G.set) ? G.set.bind(n) : ut,
          le = M({ get: W, set: oe });
        Object.defineProperty(r, k, {
          enumerable: !0,
          configurable: !0,
          get: () => le.value,
          set: (fe) => (le.value = fe),
        });
      }
    if (a) for (const k in a) Sd(a[k], r, n, k);
    if (l) {
      const k = he(l) ? l.call(n) : l;
      Reflect.ownKeys(k).forEach((G) => {
        ot(G, k[G]);
      });
    }
    c && fu(c, e, "c");
    function z(k, G) {
      pe(G) ? G.forEach((W) => k(W.bind(n))) : G && k(G.bind(n));
    }
    if (
      (z(_d, f),
      z(Ge, d),
      z(jm, p),
      z(Ya, h),
      z(Nm, g),
      z(yd, _),
      z(Hm, T),
      z(zm, N),
      z(Dm, D),
      z(bt, w),
      z(Qa, E),
      z(Bm, H),
      pe(S))
    )
      if (S.length) {
        const k = e.exposed || (e.exposed = {});
        S.forEach((G) => {
          Object.defineProperty(k, G, {
            get: () => n[G],
            set: (W) => (n[G] = W),
          });
        });
      } else e.exposed || (e.exposed = {});
    I && e.render === ut && (e.render = I),
      U != null && (e.inheritAttrs = U),
      $ && (e.components = $),
      F && (e.directives = F);
  }
  function Km(e, t, n = ut, r = !1) {
    pe(e) && (e = Yi(e));
    for (const o in e) {
      const s = e[o];
      let i;
      Me(s)
        ? "default" in s
          ? (i = Pe(s.from || o, s.default, !0))
          : (i = Pe(s.from || o))
        : (i = Pe(s)),
        et(i) && r
          ? Object.defineProperty(t, o, {
              enumerable: !0,
              configurable: !0,
              get: () => i.value,
              set: (a) => (i.value = a),
            })
          : (t[o] = i);
    }
  }
  function fu(e, t, n) {
    Rt(pe(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, n);
  }
  function Sd(e, t, n, r) {
    const o = r.includes(".") ? hd(n, r) : () => n[r];
    if (Ee(e)) {
      const s = t[e];
      he(s) && xe(o, s);
    } else if (he(e)) xe(o, e.bind(n));
    else if (Me(e))
      if (pe(e)) e.forEach((s) => Sd(s, t, n, r));
      else {
        const s = he(e.handler) ? e.handler.bind(n) : t[e.handler];
        he(s) && xe(o, s, e);
      }
  }
  function el(e) {
    const t = e.type,
      { mixins: n, extends: r } = t,
      {
        mixins: o,
        optionsCache: s,
        config: { optionMergeStrategies: i },
      } = e.appContext,
      a = s.get(t);
    let l;
    return (
      a
        ? (l = a)
        : !o.length && !n && !r
        ? (l = t)
        : ((l = {}),
          o.length && o.forEach((u) => Ps(l, u, i, !0)),
          Ps(l, t, i)),
      Me(t) && s.set(t, l),
      l
    );
  }
  function Ps(e, t, n, r = !1) {
    const { mixins: o, extends: s } = t;
    s && Ps(e, s, n, !0), o && o.forEach((i) => Ps(e, i, n, !0));
    for (const i in t)
      if (!(r && i === "expose")) {
        const a = Gm[i] || (n && n[i]);
        e[i] = a ? a(e[i], t[i]) : t[i];
      }
    return e;
  }
  const Gm = {
    data: du,
    props: Kn,
    emits: Kn,
    methods: Kn,
    computed: Kn,
    beforeCreate: dt,
    created: dt,
    beforeMount: dt,
    mounted: dt,
    beforeUpdate: dt,
    updated: dt,
    beforeDestroy: dt,
    beforeUnmount: dt,
    destroyed: dt,
    unmounted: dt,
    activated: dt,
    deactivated: dt,
    errorCaptured: dt,
    serverPrefetch: dt,
    components: Kn,
    directives: Kn,
    watch: Zm,
    provide: du,
    inject: Jm,
  };
  function du(e, t) {
    return t
      ? e
        ? function () {
            return tt(
              he(e) ? e.call(this, this) : e,
              he(t) ? t.call(this, this) : t
            );
          }
        : t
      : e;
  }
  function Jm(e, t) {
    return Kn(Yi(e), Yi(t));
  }
  function Yi(e) {
    if (pe(e)) {
      const t = {};
      for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
      return t;
    }
    return e;
  }
  function dt(e, t) {
    return e ? [...new Set([].concat(e, t))] : t;
  }
  function Kn(e, t) {
    return e ? tt(tt(Object.create(null), e), t) : t;
  }
  function Zm(e, t) {
    if (!e) return t;
    if (!t) return e;
    const n = tt(Object.create(null), e);
    for (const r in t) n[r] = dt(e[r], t[r]);
    return n;
  }
  function Ym(e, t, n, r = !1) {
    const o = {},
      s = {};
    $s(s, Zs, 1), (e.propsDefaults = Object.create(null)), Od(e, t, o, s);
    for (const i in e.propsOptions[0]) i in o || (o[i] = void 0);
    n
      ? (e.props = r ? o : ed(o))
      : e.type.props
      ? (e.props = o)
      : (e.props = s),
      (e.attrs = s);
  }
  function Qm(e, t, n, r) {
    const {
        props: o,
        attrs: s,
        vnode: { patchFlag: i },
      } = e,
      a = ke(o),
      [l] = e.propsOptions;
    let u = !1;
    if ((r || i > 0) && !(i & 16)) {
      if (i & 8) {
        const c = e.vnode.dynamicProps;
        for (let f = 0; f < c.length; f++) {
          let d = c[f];
          if (Ks(e.emitsOptions, d)) continue;
          const p = t[d];
          if (l)
            if (Ce(s, d)) p !== s[d] && ((s[d] = p), (u = !0));
            else {
              const h = Ut(d);
              o[h] = Qi(l, a, h, p, e, !1);
            }
          else p !== s[d] && ((s[d] = p), (u = !0));
        }
      }
    } else {
      Od(e, t, o, s) && (u = !0);
      let c;
      for (const f in a)
        (!t || (!Ce(t, f) && ((c = lr(f)) === f || !Ce(t, c)))) &&
          (l
            ? n &&
              (n[f] !== void 0 || n[c] !== void 0) &&
              (o[f] = Qi(l, a, f, void 0, e, !0))
            : delete o[f]);
      if (s !== a)
        for (const f in s) (!t || !Ce(t, f)) && (delete s[f], (u = !0));
    }
    u && hn(e, "set", "$attrs");
  }
  function Od(e, t, n, r) {
    const [o, s] = e.propsOptions;
    let i = !1,
      a;
    if (t)
      for (let l in t) {
        if (ps(l)) continue;
        const u = t[l];
        let c;
        o && Ce(o, (c = Ut(l)))
          ? !s || !s.includes(c)
            ? (n[c] = u)
            : ((a || (a = {}))[c] = u)
          : Ks(e.emitsOptions, l) ||
            ((!(l in r) || u !== r[l]) && ((r[l] = u), (i = !0)));
      }
    if (s) {
      const l = ke(n),
        u = a || Ve;
      for (let c = 0; c < s.length; c++) {
        const f = s[c];
        n[f] = Qi(o, l, f, u[f], e, !Ce(u, f));
      }
    }
    return i;
  }
  function Qi(e, t, n, r, o, s) {
    const i = e[n];
    if (i != null) {
      const a = Ce(i, "default");
      if (a && r === void 0) {
        const l = i.default;
        if (i.type !== Function && he(l)) {
          const { propsDefaults: u } = o;
          n in u ? (r = u[n]) : (Pr(o), (r = u[n] = l.call(null, t)), nr());
        } else r = l;
      }
      i[0] &&
        (s && !a ? (r = !1) : i[1] && (r === "" || r === lr(n)) && (r = !0));
    }
    return r;
  }
  function Td(e, t, n = !1) {
    const r = t.propsCache,
      o = r.get(e);
    if (o) return o;
    const s = e.props,
      i = {},
      a = [];
    let l = !1;
    if (!he(e)) {
      const c = (f) => {
        l = !0;
        const [d, p] = Td(f, t, !0);
        tt(i, d), p && a.push(...p);
      };
      !n && t.mixins.length && t.mixins.forEach(c),
        e.extends && c(e.extends),
        e.mixins && e.mixins.forEach(c);
    }
    if (!s && !l) return Me(e) && r.set(e, Sr), Sr;
    if (pe(s))
      for (let c = 0; c < s.length; c++) {
        const f = Ut(s[c]);
        pu(f) && (i[f] = Ve);
      }
    else if (s)
      for (const c in s) {
        const f = Ut(c);
        if (pu(f)) {
          const d = s[c],
            p = (i[f] = pe(d) || he(d) ? { type: d } : Object.assign({}, d));
          if (p) {
            const h = mu(Boolean, p.type),
              g = mu(String, p.type);
            (p[0] = h > -1),
              (p[1] = g < 0 || h < g),
              (h > -1 || Ce(p, "default")) && a.push(f);
          }
        }
      }
    const u = [i, a];
    return Me(e) && r.set(e, u), u;
  }
  function pu(e) {
    return e[0] !== "$";
  }
  function hu(e) {
    const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
    return t ? t[2] : e === null ? "null" : "";
  }
  function gu(e, t) {
    return hu(e) === hu(t);
  }
  function mu(e, t) {
    return pe(t) ? t.findIndex((n) => gu(n, e)) : he(t) && gu(t, e) ? 0 : -1;
  }
  const $d = (e) => e[0] === "_" || e === "$stable",
    tl = (e) => (pe(e) ? e.map(Zt) : [Zt(e)]),
    Xm = (e, t, n) => {
      if (t._n) return t;
      const r = we((...o) => tl(t(...o)), n);
      return (r._c = !1), r;
    },
    Cd = (e, t, n) => {
      const r = e._ctx;
      for (const o in e) {
        if ($d(o)) continue;
        const s = e[o];
        if (he(s)) t[o] = Xm(o, s, r);
        else if (s != null) {
          const i = tl(s);
          t[o] = () => i;
        }
      }
    },
    Ad = (e, t) => {
      const n = tl(t);
      e.slots.default = () => n;
    },
    ev = (e, t) => {
      if (e.vnode.shapeFlag & 32) {
        const n = t._;
        n ? ((e.slots = ke(t)), $s(t, "_", n)) : Cd(t, (e.slots = {}));
      } else (e.slots = {}), t && Ad(e, t);
      $s(e.slots, Zs, 1);
    },
    tv = (e, t, n) => {
      const { vnode: r, slots: o } = e;
      let s = !0,
        i = Ve;
      if (r.shapeFlag & 32) {
        const a = t._;
        a
          ? n && a === 1
            ? (s = !1)
            : (tt(o, t), !n && a === 1 && delete o._)
          : ((s = !t.$stable), Cd(t, o)),
          (i = t);
      } else t && (Ad(e, t), (i = { default: 1 }));
      if (s) for (const a in o) !$d(a) && !(a in i) && delete o[a];
    };
  function kd() {
    return {
      app: null,
      config: {
        isNativeTag: kg,
        performance: !1,
        globalProperties: {},
        optionMergeStrategies: {},
        errorHandler: void 0,
        warnHandler: void 0,
        compilerOptions: {},
      },
      mixins: [],
      components: {},
      directives: {},
      provides: Object.create(null),
      optionsCache: new WeakMap(),
      propsCache: new WeakMap(),
      emitsCache: new WeakMap(),
    };
  }
  let nv = 0;
  function rv(e, t) {
    return function (r, o = null) {
      he(r) || (r = Object.assign({}, r)), o != null && !Me(o) && (o = null);
      const s = kd(),
        i = new Set();
      let a = !1;
      const l = (s.app = {
        _uid: nv++,
        _component: r,
        _props: o,
        _container: null,
        _context: s,
        _instance: null,
        version: Ov,
        get config() {
          return s.config;
        },
        set config(u) {},
        use(u, ...c) {
          return (
            i.has(u) ||
              (u && he(u.install)
                ? (i.add(u), u.install(l, ...c))
                : he(u) && (i.add(u), u(l, ...c))),
            l
          );
        },
        mixin(u) {
          return s.mixins.includes(u) || s.mixins.push(u), l;
        },
        component(u, c) {
          return c ? ((s.components[u] = c), l) : s.components[u];
        },
        directive(u, c) {
          return c ? ((s.directives[u] = c), l) : s.directives[u];
        },
        mount(u, c, f) {
          if (!a) {
            const d = ve(r, o);
            return (
              (d.appContext = s),
              c && t ? t(d, u) : e(d, u, f),
              (a = !0),
              (l._container = u),
              (u.__vue_app__ = l),
              Ys(d.component) || d.component.proxy
            );
          }
        },
        unmount() {
          a && (e(null, l._container), delete l._container.__vue_app__);
        },
        provide(u, c) {
          return (s.provides[u] = c), l;
        },
      });
      return l;
    };
  }
  function Xi(e, t, n, r, o = !1) {
    if (pe(e)) {
      e.forEach((d, p) => Xi(d, t && (pe(t) ? t[p] : t), n, r, o));
      return;
    }
    if (po(r) && !o) return;
    const s = r.shapeFlag & 4 ? Ys(r.component) || r.component.proxy : r.el,
      i = o ? null : s,
      { i: a, r: l } = e,
      u = t && t.r,
      c = a.refs === Ve ? (a.refs = {}) : a.refs,
      f = a.setupState;
    if (
      (u != null &&
        u !== l &&
        (Ee(u)
          ? ((c[u] = null), Ce(f, u) && (f[u] = null))
          : et(u) && (u.value = null)),
      he(l))
    )
      Fn(l, a, 12, [i, c]);
    else {
      const d = Ee(l),
        p = et(l);
      if (d || p) {
        const h = () => {
          if (e.f) {
            const g = d ? (Ce(f, l) ? f[l] : c[l]) : l.value;
            o
              ? pe(g) && Na(g, s)
              : pe(g)
              ? g.includes(s) || g.push(s)
              : d
              ? ((c[l] = [s]), Ce(f, l) && (f[l] = c[l]))
              : ((l.value = [s]), e.k && (c[e.k] = l.value));
          } else
            d
              ? ((c[l] = i), Ce(f, l) && (f[l] = i))
              : p && ((l.value = i), e.k && (c[e.k] = i));
        };
        i ? ((h.id = -1), gt(h, n)) : h();
      }
    }
  }
  const gt = Rm;
  function ov(e) {
    return sv(e);
  }
  function sv(e, t) {
    const n = jg();
    n.__VUE__ = !0;
    const {
        insert: r,
        remove: o,
        patchProp: s,
        createElement: i,
        createText: a,
        createComment: l,
        setText: u,
        setElementText: c,
        parentNode: f,
        nextSibling: d,
        setScopeId: p = ut,
        insertStaticContent: h,
      } = e,
      g = (
        v,
        b,
        R,
        j = null,
        q = null,
        Q = null,
        te = !1,
        J = null,
        X = !!b.dynamicChildren
      ) => {
        if (v === b) return;
        v && !Zn(v, b) && ((j = A(v)), fe(v, q, Q, !0), (v = null)),
          b.patchFlag === -2 && ((X = !1), (b.dynamicChildren = null));
        const { type: V, ref: C, shapeFlag: Y } = b;
        switch (V) {
          case Wr:
            _(v, b, R, j);
            break;
          case $t:
            m(v, b, R, j);
            break;
          case wi:
            v == null && w(b, R, j, te);
            break;
          case We:
            $(v, b, R, j, q, Q, te, J, X);
            break;
          default:
            Y & 1
              ? I(v, b, R, j, q, Q, te, J, X)
              : Y & 6
              ? F(v, b, R, j, q, Q, te, J, X)
              : (Y & 64 || Y & 128) &&
                V.process(v, b, R, j, q, Q, te, J, X, ne);
        }
        C != null && q && Xi(C, v && v.ref, Q, b || v, !b);
      },
      _ = (v, b, R, j) => {
        if (v == null) r((b.el = a(b.children)), R, j);
        else {
          const q = (b.el = v.el);
          b.children !== v.children && u(q, b.children);
        }
      },
      m = (v, b, R, j) => {
        v == null ? r((b.el = l(b.children || "")), R, j) : (b.el = v.el);
      },
      w = (v, b, R, j) => {
        [v.el, v.anchor] = h(v.children, b, R, j, v.el, v.anchor);
      },
      x = ({ el: v, anchor: b }, R, j) => {
        let q;
        for (; v && v !== b; ) (q = d(v)), r(v, R, j), (v = q);
        r(b, R, j);
      },
      E = ({ el: v, anchor: b }) => {
        let R;
        for (; v && v !== b; ) (R = d(v)), o(v), (v = R);
        o(b);
      },
      I = (v, b, R, j, q, Q, te, J, X) => {
        (te = te || b.type === "svg"),
          v == null ? N(b, R, j, q, Q, te, J, X) : H(v, b, q, Q, te, J, X);
      },
      N = (v, b, R, j, q, Q, te, J) => {
        let X, V;
        const {
          type: C,
          props: Y,
          shapeFlag: ie,
          transition: de,
          dirs: Te,
        } = v;
        if (
          ((X = v.el = i(v.type, Q, Y && Y.is, Y)),
          ie & 8
            ? c(X, v.children)
            : ie & 16 &&
              T(v.children, X, null, j, q, Q && C !== "foreignObject", te, J),
          Te && Un(v, null, j, "created"),
          D(X, v, v.scopeId, te, j),
          Y)
        ) {
          for (const Fe in Y)
            Fe !== "value" &&
              !ps(Fe) &&
              s(X, Fe, null, Y[Fe], Q, v.children, j, q, Z);
          "value" in Y && s(X, "value", null, Y.value),
            (V = Y.onVnodeBeforeMount) && Jt(V, j, v);
        }
        Te && Un(v, null, j, "beforeMount");
        const je = (!q || (q && !q.pendingBranch)) && de && !de.persisted;
        je && de.beforeEnter(X),
          r(X, b, R),
          ((V = Y && Y.onVnodeMounted) || je || Te) &&
            gt(() => {
              V && Jt(V, j, v),
                je && de.enter(X),
                Te && Un(v, null, j, "mounted");
            }, q);
      },
      D = (v, b, R, j, q) => {
        if ((R && p(v, R), j)) for (let Q = 0; Q < j.length; Q++) p(v, j[Q]);
        if (q) {
          let Q = q.subTree;
          if (b === Q) {
            const te = q.vnode;
            D(v, te, te.scopeId, te.slotScopeIds, q.parent);
          }
        }
      },
      T = (v, b, R, j, q, Q, te, J, X = 0) => {
        for (let V = X; V < v.length; V++) {
          const C = (v[V] = J ? An(v[V]) : Zt(v[V]));
          g(null, C, b, R, j, q, Q, te, J);
        }
      },
      H = (v, b, R, j, q, Q, te) => {
        const J = (b.el = v.el);
        let { patchFlag: X, dynamicChildren: V, dirs: C } = b;
        X |= v.patchFlag & 16;
        const Y = v.props || Ve,
          ie = b.props || Ve;
        let de;
        R && qn(R, !1),
          (de = ie.onVnodeBeforeUpdate) && Jt(de, R, b, v),
          C && Un(b, v, R, "beforeUpdate"),
          R && qn(R, !0);
        const Te = q && b.type !== "foreignObject";
        if (
          (V
            ? S(v.dynamicChildren, V, J, R, j, Te, Q)
            : te || G(v, b, J, null, R, j, Te, Q, !1),
          X > 0)
        ) {
          if (X & 16) U(J, b, Y, ie, R, j, q);
          else if (
            (X & 2 && Y.class !== ie.class && s(J, "class", null, ie.class, q),
            X & 4 && s(J, "style", Y.style, ie.style, q),
            X & 8)
          ) {
            const je = b.dynamicProps;
            for (let Fe = 0; Fe < je.length; Fe++) {
              const Ye = je[Fe],
                Nt = Y[Ye],
                gr = ie[Ye];
              (gr !== Nt || Ye === "value") &&
                s(J, Ye, Nt, gr, q, v.children, R, j, Z);
            }
          }
          X & 1 && v.children !== b.children && c(J, b.children);
        } else !te && V == null && U(J, b, Y, ie, R, j, q);
        ((de = ie.onVnodeUpdated) || C) &&
          gt(() => {
            de && Jt(de, R, b, v), C && Un(b, v, R, "updated");
          }, j);
      },
      S = (v, b, R, j, q, Q, te) => {
        for (let J = 0; J < b.length; J++) {
          const X = v[J],
            V = b[J],
            C =
              X.el && (X.type === We || !Zn(X, V) || X.shapeFlag & 70)
                ? f(X.el)
                : R;
          g(X, V, C, null, j, q, Q, te, !0);
        }
      },
      U = (v, b, R, j, q, Q, te) => {
        if (R !== j) {
          if (R !== Ve)
            for (const J in R)
              !ps(J) &&
                !(J in j) &&
                s(v, J, R[J], null, te, b.children, q, Q, Z);
          for (const J in j) {
            if (ps(J)) continue;
            const X = j[J],
              V = R[J];
            X !== V && J !== "value" && s(v, J, V, X, te, b.children, q, Q, Z);
          }
          "value" in j && s(v, "value", R.value, j.value);
        }
      },
      $ = (v, b, R, j, q, Q, te, J, X) => {
        const V = (b.el = v ? v.el : a("")),
          C = (b.anchor = v ? v.anchor : a(""));
        let { patchFlag: Y, dynamicChildren: ie, slotScopeIds: de } = b;
        de && (J = J ? J.concat(de) : de),
          v == null
            ? (r(V, R, j), r(C, R, j), T(b.children, R, C, q, Q, te, J, X))
            : Y > 0 && Y & 64 && ie && v.dynamicChildren
            ? (S(v.dynamicChildren, ie, R, q, Q, te, J),
              (b.key != null || (q && b === q.subTree)) && nl(v, b, !0))
            : G(v, b, R, C, q, Q, te, J, X);
      },
      F = (v, b, R, j, q, Q, te, J, X) => {
        (b.slotScopeIds = J),
          v == null
            ? b.shapeFlag & 512
              ? q.ctx.activate(b, R, j, te, X)
              : L(b, R, j, q, Q, te, X)
            : O(v, b, X);
      },
      L = (v, b, R, j, q, Q, te) => {
        const J = (v.component = mv(v, j, q));
        if ((Gs(v) && (J.ctx.renderer = ne), vv(J), J.asyncDep)) {
          if ((q && q.registerDep(J, z), !v.el)) {
            const X = (J.subTree = ve($t));
            m(null, X, b, R);
          }
          return;
        }
        z(J, v, b, R, q, Q, te);
      },
      O = (v, b, R) => {
        const j = (b.component = v.component);
        if (Am(v, b, R))
          if (j.asyncDep && !j.asyncResolved) {
            k(j, b, R);
            return;
          } else (j.next = b), Em(j.update), j.update();
        else (b.el = v.el), (j.vnode = b);
      },
      z = (v, b, R, j, q, Q, te) => {
        const J = () => {
            if (v.isMounted) {
              let { next: C, bu: Y, u: ie, parent: de, vnode: Te } = v,
                je = C,
                Fe;
              qn(v, !1),
                C ? ((C.el = Te.el), k(v, C, te)) : (C = Te),
                Y && vi(Y),
                (Fe = C.props && C.props.onVnodeBeforeUpdate) &&
                  Jt(Fe, de, C, Te),
                qn(v, !0);
              const Ye = yi(v),
                Nt = v.subTree;
              (v.subTree = Ye),
                g(Nt, Ye, f(Nt.el), A(Nt), v, q, Q),
                (C.el = Ye.el),
                je === null && km(v, Ye.el),
                ie && gt(ie, q),
                (Fe = C.props && C.props.onVnodeUpdated) &&
                  gt(() => Jt(Fe, de, C, Te), q);
            } else {
              let C;
              const { el: Y, props: ie } = b,
                { bm: de, m: Te, parent: je } = v,
                Fe = po(b);
              if (
                (qn(v, !1),
                de && vi(de),
                !Fe && (C = ie && ie.onVnodeBeforeMount) && Jt(C, je, b),
                qn(v, !0),
                Y && ae)
              ) {
                const Ye = () => {
                  (v.subTree = yi(v)), ae(Y, v.subTree, v, q, null);
                };
                Fe
                  ? b.type.__asyncLoader().then(() => !v.isUnmounted && Ye())
                  : Ye();
              } else {
                const Ye = (v.subTree = yi(v));
                g(null, Ye, R, j, v, q, Q), (b.el = Ye.el);
              }
              if ((Te && gt(Te, q), !Fe && (C = ie && ie.onVnodeMounted))) {
                const Ye = b;
                gt(() => Jt(C, je, Ye), q);
              }
              (b.shapeFlag & 256 ||
                (je && po(je.vnode) && je.vnode.shapeFlag & 256)) &&
                v.a &&
                gt(v.a, q),
                (v.isMounted = !0),
                (b = R = j = null);
            }
          },
          X = (v.effect = new Da(J, () => Ga(V), v.scope)),
          V = (v.update = () => X.run());
        (V.id = v.uid), qn(v, !0), V();
      },
      k = (v, b, R) => {
        b.component = v;
        const j = v.vnode.props;
        (v.vnode = b),
          (v.next = null),
          Qm(v, b.props, j, R),
          tv(v, b.children, R),
          qr(),
          au(),
          Vr();
      },
      G = (v, b, R, j, q, Q, te, J, X = !1) => {
        const V = v && v.children,
          C = v ? v.shapeFlag : 0,
          Y = b.children,
          { patchFlag: ie, shapeFlag: de } = b;
        if (ie > 0) {
          if (ie & 128) {
            oe(V, Y, R, j, q, Q, te, J, X);
            return;
          } else if (ie & 256) {
            W(V, Y, R, j, q, Q, te, J, X);
            return;
          }
        }
        de & 8
          ? (C & 16 && Z(V, q, Q), Y !== V && c(R, Y))
          : C & 16
          ? de & 16
            ? oe(V, Y, R, j, q, Q, te, J, X)
            : Z(V, q, Q, !0)
          : (C & 8 && c(R, ""), de & 16 && T(Y, R, j, q, Q, te, J, X));
      },
      W = (v, b, R, j, q, Q, te, J, X) => {
        (v = v || Sr), (b = b || Sr);
        const V = v.length,
          C = b.length,
          Y = Math.min(V, C);
        let ie;
        for (ie = 0; ie < Y; ie++) {
          const de = (b[ie] = X ? An(b[ie]) : Zt(b[ie]));
          g(v[ie], de, R, null, q, Q, te, J, X);
        }
        V > C ? Z(v, q, Q, !0, !1, Y) : T(b, R, j, q, Q, te, J, X, Y);
      },
      oe = (v, b, R, j, q, Q, te, J, X) => {
        let V = 0;
        const C = b.length;
        let Y = v.length - 1,
          ie = C - 1;
        for (; V <= Y && V <= ie; ) {
          const de = v[V],
            Te = (b[V] = X ? An(b[V]) : Zt(b[V]));
          if (Zn(de, Te)) g(de, Te, R, null, q, Q, te, J, X);
          else break;
          V++;
        }
        for (; V <= Y && V <= ie; ) {
          const de = v[Y],
            Te = (b[ie] = X ? An(b[ie]) : Zt(b[ie]));
          if (Zn(de, Te)) g(de, Te, R, null, q, Q, te, J, X);
          else break;
          Y--, ie--;
        }
        if (V > Y) {
          if (V <= ie) {
            const de = ie + 1,
              Te = de < C ? b[de].el : j;
            for (; V <= ie; )
              g(null, (b[V] = X ? An(b[V]) : Zt(b[V])), R, Te, q, Q, te, J, X),
                V++;
          }
        } else if (V > ie) for (; V <= Y; ) fe(v[V], q, Q, !0), V++;
        else {
          const de = V,
            Te = V,
            je = new Map();
          for (V = Te; V <= ie; V++) {
            const wt = (b[V] = X ? An(b[V]) : Zt(b[V]));
            wt.key != null && je.set(wt.key, V);
          }
          let Fe,
            Ye = 0;
          const Nt = ie - Te + 1;
          let gr = !1,
            Zl = 0;
          const to = new Array(Nt);
          for (V = 0; V < Nt; V++) to[V] = 0;
          for (V = de; V <= Y; V++) {
            const wt = v[V];
            if (Ye >= Nt) {
              fe(wt, q, Q, !0);
              continue;
            }
            let Gt;
            if (wt.key != null) Gt = je.get(wt.key);
            else
              for (Fe = Te; Fe <= ie; Fe++)
                if (to[Fe - Te] === 0 && Zn(wt, b[Fe])) {
                  Gt = Fe;
                  break;
                }
            Gt === void 0
              ? fe(wt, q, Q, !0)
              : ((to[Gt - Te] = V + 1),
                Gt >= Zl ? (Zl = Gt) : (gr = !0),
                g(wt, b[Gt], R, null, q, Q, te, J, X),
                Ye++);
          }
          const Yl = gr ? iv(to) : Sr;
          for (Fe = Yl.length - 1, V = Nt - 1; V >= 0; V--) {
            const wt = Te + V,
              Gt = b[wt],
              Ql = wt + 1 < C ? b[wt + 1].el : j;
            to[V] === 0
              ? g(null, Gt, R, Ql, q, Q, te, J, X)
              : gr && (Fe < 0 || V !== Yl[Fe] ? le(Gt, R, Ql, 2) : Fe--);
          }
        }
      },
      le = (v, b, R, j, q = null) => {
        const { el: Q, type: te, transition: J, children: X, shapeFlag: V } = v;
        if (V & 6) {
          le(v.component.subTree, b, R, j);
          return;
        }
        if (V & 128) {
          v.suspense.move(b, R, j);
          return;
        }
        if (V & 64) {
          te.move(v, b, R, ne);
          return;
        }
        if (te === We) {
          r(Q, b, R);
          for (let Y = 0; Y < X.length; Y++) le(X[Y], b, R, j);
          r(v.anchor, b, R);
          return;
        }
        if (te === wi) {
          x(v, b, R);
          return;
        }
        if (j !== 2 && V & 1 && J)
          if (j === 0) J.beforeEnter(Q), r(Q, b, R), gt(() => J.enter(Q), q);
          else {
            const { leave: Y, delayLeave: ie, afterLeave: de } = J,
              Te = () => r(Q, b, R),
              je = () => {
                Y(Q, () => {
                  Te(), de && de();
                });
              };
            ie ? ie(Q, Te, je) : je();
          }
        else r(Q, b, R);
      },
      fe = (v, b, R, j = !1, q = !1) => {
        const {
          type: Q,
          props: te,
          ref: J,
          children: X,
          dynamicChildren: V,
          shapeFlag: C,
          patchFlag: Y,
          dirs: ie,
        } = v;
        if ((J != null && Xi(J, null, R, v, !0), C & 256)) {
          b.ctx.deactivate(v);
          return;
        }
        const de = C & 1 && ie,
          Te = !po(v);
        let je;
        if ((Te && (je = te && te.onVnodeBeforeUnmount) && Jt(je, b, v), C & 6))
          P(v.component, R, j);
        else {
          if (C & 128) {
            v.suspense.unmount(R, j);
            return;
          }
          de && Un(v, null, b, "beforeUnmount"),
            C & 64
              ? v.type.remove(v, b, R, q, ne, j)
              : V && (Q !== We || (Y > 0 && Y & 64))
              ? Z(V, b, R, !1, !0)
              : ((Q === We && Y & 384) || (!q && C & 16)) && Z(X, b, R),
            j && Oe(v);
        }
        ((Te && (je = te && te.onVnodeUnmounted)) || de) &&
          gt(() => {
            je && Jt(je, b, v), de && Un(v, null, b, "unmounted");
          }, R);
      },
      Oe = (v) => {
        const { type: b, el: R, anchor: j, transition: q } = v;
        if (b === We) {
          Le(R, j);
          return;
        }
        if (b === wi) {
          E(v);
          return;
        }
        const Q = () => {
          o(R), q && !q.persisted && q.afterLeave && q.afterLeave();
        };
        if (v.shapeFlag & 1 && q && !q.persisted) {
          const { leave: te, delayLeave: J } = q,
            X = () => te(R, Q);
          J ? J(v.el, Q, X) : X();
        } else Q();
      },
      Le = (v, b) => {
        let R;
        for (; v !== b; ) (R = d(v)), o(v), (v = R);
        o(b);
      },
      P = (v, b, R) => {
        const { bum: j, scope: q, update: Q, subTree: te, um: J } = v;
        j && vi(j),
          q.stop(),
          Q && ((Q.active = !1), fe(te, v, b, R)),
          J && gt(J, b),
          gt(() => {
            v.isUnmounted = !0;
          }, b),
          b &&
            b.pendingBranch &&
            !b.isUnmounted &&
            v.asyncDep &&
            !v.asyncResolved &&
            v.suspenseId === b.pendingId &&
            (b.deps--, b.deps === 0 && b.resolve());
      },
      Z = (v, b, R, j = !1, q = !1, Q = 0) => {
        for (let te = Q; te < v.length; te++) fe(v[te], b, R, j, q);
      },
      A = (v) =>
        v.shapeFlag & 6
          ? A(v.component.subTree)
          : v.shapeFlag & 128
          ? v.suspense.next()
          : d(v.anchor || v.el),
      K = (v, b, R) => {
        v == null
          ? b._vnode && fe(b._vnode, null, null, !0)
          : g(b._vnode || null, v, b, null, null, null, R),
          au(),
          cd(),
          (b._vnode = v);
      },
      ne = {
        p: g,
        um: fe,
        m: le,
        r: Oe,
        mt: L,
        mc: T,
        pc: G,
        pbc: S,
        n: A,
        o: e,
      };
    let ue, ae;
    return (
      t && ([ue, ae] = t(ne)), { render: K, hydrate: ue, createApp: rv(K, ue) }
    );
  }
  function qn({ effect: e, update: t }, n) {
    e.allowRecurse = t.allowRecurse = n;
  }
  function nl(e, t, n = !1) {
    const r = e.children,
      o = t.children;
    if (pe(r) && pe(o))
      for (let s = 0; s < r.length; s++) {
        const i = r[s];
        let a = o[s];
        a.shapeFlag & 1 &&
          !a.dynamicChildren &&
          ((a.patchFlag <= 0 || a.patchFlag === 32) &&
            ((a = o[s] = An(o[s])), (a.el = i.el)),
          n || nl(i, a)),
          a.type === Wr && (a.el = i.el);
      }
  }
  function iv(e) {
    const t = e.slice(),
      n = [0];
    let r, o, s, i, a;
    const l = e.length;
    for (r = 0; r < l; r++) {
      const u = e[r];
      if (u !== 0) {
        if (((o = n[n.length - 1]), e[o] < u)) {
          (t[r] = o), n.push(r);
          continue;
        }
        for (s = 0, i = n.length - 1; s < i; )
          (a = (s + i) >> 1), e[n[a]] < u ? (s = a + 1) : (i = a);
        u < e[n[s]] && (s > 0 && (t[r] = n[s - 1]), (n[s] = r));
      }
    }
    for (s = n.length, i = n[s - 1]; s-- > 0; ) (n[s] = i), (i = t[i]);
    return n;
  }
  const av = (e) => e.__isTeleport,
    go = (e) => e && (e.disabled || e.disabled === ""),
    vu = (e) => typeof SVGElement < "u" && e instanceof SVGElement,
    ea = (e, t) => {
      const n = e && e.to;
      return Ee(n) ? (t ? t(n) : null) : n;
    },
    lv = {
      __isTeleport: !0,
      process(e, t, n, r, o, s, i, a, l, u) {
        const {
            mc: c,
            pc: f,
            pbc: d,
            o: { insert: p, querySelector: h, createText: g, createComment: _ },
          } = u,
          m = go(t.props);
        let { shapeFlag: w, children: x, dynamicChildren: E } = t;
        if (e == null) {
          const I = (t.el = g("")),
            N = (t.anchor = g(""));
          p(I, n, r), p(N, n, r);
          const D = (t.target = ea(t.props, h)),
            T = (t.targetAnchor = g(""));
          D && (p(T, D), (i = i || vu(D)));
          const H = (S, U) => {
            w & 16 && c(x, S, U, o, s, i, a, l);
          };
          m ? H(n, N) : D && H(D, T);
        } else {
          t.el = e.el;
          const I = (t.anchor = e.anchor),
            N = (t.target = e.target),
            D = (t.targetAnchor = e.targetAnchor),
            T = go(e.props),
            H = T ? n : N,
            S = T ? I : D;
          if (
            ((i = i || vu(N)),
            E
              ? (d(e.dynamicChildren, E, H, o, s, i, a), nl(e, t, !0))
              : l || f(e, t, H, S, o, s, i, a, !1),
            m)
          )
            T || ts(t, n, I, u, 1);
          else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
            const U = (t.target = ea(t.props, h));
            U && ts(t, U, null, u, 0);
          } else T && ts(t, N, D, u, 1);
        }
        Pd(t);
      },
      remove(e, t, n, r, { um: o, o: { remove: s } }, i) {
        const {
          shapeFlag: a,
          children: l,
          anchor: u,
          targetAnchor: c,
          target: f,
          props: d,
        } = e;
        if ((f && s(c), (i || !go(d)) && (s(u), a & 16)))
          for (let p = 0; p < l.length; p++) {
            const h = l[p];
            o(h, t, n, !0, !!h.dynamicChildren);
          }
      },
      move: ts,
      hydrate: uv,
    };
  function ts(e, t, n, { o: { insert: r }, m: o }, s = 2) {
    s === 0 && r(e.targetAnchor, t, n);
    const { el: i, anchor: a, shapeFlag: l, children: u, props: c } = e,
      f = s === 2;
    if ((f && r(i, t, n), (!f || go(c)) && l & 16))
      for (let d = 0; d < u.length; d++) o(u[d], t, n, 2);
    f && r(a, t, n);
  }
  function uv(
    e,
    t,
    n,
    r,
    o,
    s,
    { o: { nextSibling: i, parentNode: a, querySelector: l } },
    u
  ) {
    const c = (t.target = ea(t.props, l));
    if (c) {
      const f = c._lpa || c.firstChild;
      if (t.shapeFlag & 16)
        if (go(t.props))
          (t.anchor = u(i(e), t, a(e), n, r, o, s)), (t.targetAnchor = f);
        else {
          t.anchor = i(e);
          let d = f;
          for (; d; )
            if (
              ((d = i(d)),
              d && d.nodeType === 8 && d.data === "teleport anchor")
            ) {
              (t.targetAnchor = d),
                (c._lpa = t.targetAnchor && i(t.targetAnchor));
              break;
            }
          u(f, t, c, n, r, o, s);
        }
      Pd(t);
    }
    return t.anchor && i(t.anchor);
  }
  const cv = lv;
  function Pd(e) {
    const t = e.ctx;
    if (t && t.ut) {
      let n = e.children[0].el;
      for (; n !== e.targetAnchor; )
        n.nodeType === 1 && n.setAttribute("data-v-owner", t.uid),
          (n = n.nextSibling);
      t.ut();
    }
  }
  const We = Symbol(void 0),
    Wr = Symbol(void 0),
    $t = Symbol(void 0),
    wi = Symbol(void 0),
    mo = [];
  let zt = null;
  function ee(e = !1) {
    mo.push((zt = e ? null : []));
  }
  function fv() {
    mo.pop(), (zt = mo[mo.length - 1] || null);
  }
  let Ao = 1;
  function yu(e) {
    Ao += e;
  }
  function Rd(e) {
    return (
      (e.dynamicChildren = Ao > 0 ? zt || Sr : null),
      fv(),
      Ao > 0 && zt && zt.push(e),
      e
    );
  }
  function me(e, t, n, r, o, s) {
    return Rd(ye(e, t, n, r, o, s, !0));
  }
  function Ne(e, t, n, r, o) {
    return Rd(ve(e, t, n, r, o, !0));
  }
  function Ln(e) {
    return e ? e.__v_isVNode === !0 : !1;
  }
  function Zn(e, t) {
    return e.type === t.type && e.key === t.key;
  }
  const Zs = "__vInternal",
    Md = ({ key: e }) => e ?? null,
    gs = ({ ref: e, ref_key: t, ref_for: n }) =>
      e != null
        ? Ee(e) || et(e) || he(e)
          ? { i: rt, r: e, k: t, f: !!n }
          : e
        : null;
  function ye(
    e,
    t = null,
    n = null,
    r = 0,
    o = null,
    s = e === We ? 0 : 1,
    i = !1,
    a = !1
  ) {
    const l = {
      __v_isVNode: !0,
      __v_skip: !0,
      type: e,
      props: t,
      key: t && Md(t),
      ref: t && gs(t),
      scopeId: pd,
      slotScopeIds: null,
      children: n,
      component: null,
      suspense: null,
      ssContent: null,
      ssFallback: null,
      dirs: null,
      transition: null,
      el: null,
      anchor: null,
      target: null,
      targetAnchor: null,
      staticCount: 0,
      shapeFlag: s,
      patchFlag: r,
      dynamicProps: o,
      dynamicChildren: null,
      appContext: null,
      ctx: rt,
    };
    return (
      a
        ? (rl(l, n), s & 128 && e.normalize(l))
        : n && (l.shapeFlag |= Ee(n) ? 8 : 16),
      Ao > 0 &&
        !i &&
        zt &&
        (l.patchFlag > 0 || s & 6) &&
        l.patchFlag !== 32 &&
        zt.push(l),
      l
    );
  }
  const ve = dv;
  function dv(e, t = null, n = null, r = 0, o = null, s = !1) {
    if (((!e || e === wd) && (e = $t), Ln(e))) {
      const a = gn(e, t, !0);
      return (
        n && rl(a, n),
        Ao > 0 &&
          !s &&
          zt &&
          (a.shapeFlag & 6 ? (zt[zt.indexOf(e)] = a) : zt.push(a)),
        (a.patchFlag |= -2),
        a
      );
    }
    if ((wv(e) && (e = e.__vccOpts), t)) {
      t = pv(t);
      let { class: a, style: l } = t;
      a && !Ee(a) && (t.class = _e(a)),
        Me(l) && (td(l) && !pe(l) && (l = tt({}, l)), (t.style = rn(l)));
    }
    const i = Ee(e) ? 1 : Pm(e) ? 128 : av(e) ? 64 : Me(e) ? 4 : he(e) ? 2 : 0;
    return ye(e, t, n, r, o, i, s, !0);
  }
  function pv(e) {
    return e ? (td(e) || Zs in e ? tt({}, e) : e) : null;
  }
  function gn(e, t, n = !1) {
    const { props: r, ref: o, patchFlag: s, children: i } = e,
      a = t ? en(r || {}, t) : r;
    return {
      __v_isVNode: !0,
      __v_skip: !0,
      type: e.type,
      props: a,
      key: a && Md(a),
      ref:
        t && t.ref
          ? n && o
            ? pe(o)
              ? o.concat(gs(t))
              : [o, gs(t)]
            : gs(t)
          : o,
      scopeId: e.scopeId,
      slotScopeIds: e.slotScopeIds,
      children: i,
      target: e.target,
      targetAnchor: e.targetAnchor,
      staticCount: e.staticCount,
      shapeFlag: e.shapeFlag,
      patchFlag: t && e.type !== We ? (s === -1 ? 16 : s | 16) : s,
      dynamicProps: e.dynamicProps,
      dynamicChildren: e.dynamicChildren,
      appContext: e.appContext,
      dirs: e.dirs,
      transition: e.transition,
      component: e.component,
      suspense: e.suspense,
      ssContent: e.ssContent && gn(e.ssContent),
      ssFallback: e.ssFallback && gn(e.ssFallback),
      el: e.el,
      anchor: e.anchor,
      ctx: e.ctx,
      ce: e.ce,
    };
  }
  function Pt(e = " ", t = 0) {
    return ve(Wr, null, e, t);
  }
  function Ie(e = "", t = !1) {
    return t ? (ee(), Ne($t, null, e)) : ve($t, null, e);
  }
  function Zt(e) {
    return e == null || typeof e == "boolean"
      ? ve($t)
      : pe(e)
      ? ve(We, null, e.slice())
      : typeof e == "object"
      ? An(e)
      : ve(Wr, null, String(e));
  }
  function An(e) {
    return (e.el === null && e.patchFlag !== -1) || e.memo ? e : gn(e);
  }
  function rl(e, t) {
    let n = 0;
    const { shapeFlag: r } = e;
    if (t == null) t = null;
    else if (pe(t)) n = 16;
    else if (typeof t == "object")
      if (r & 65) {
        const o = t.default;
        o && (o._c && (o._d = !1), rl(e, o()), o._c && (o._d = !0));
        return;
      } else {
        n = 32;
        const o = t._;
        !o && !(Zs in t)
          ? (t._ctx = rt)
          : o === 3 &&
            rt &&
            (rt.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
      }
    else
      he(t)
        ? ((t = { default: t, _ctx: rt }), (n = 32))
        : ((t = String(t)), r & 64 ? ((n = 16), (t = [Pt(t)])) : (n = 8));
    (e.children = t), (e.shapeFlag |= n);
  }
  function en(...e) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n];
      for (const o in r)
        if (o === "class")
          t.class !== r.class && (t.class = _e([t.class, r.class]));
        else if (o === "style") t.style = rn([t.style, r.style]);
        else if (zs(o)) {
          const s = t[o],
            i = r[o];
          i &&
            s !== i &&
            !(pe(s) && s.includes(i)) &&
            (t[o] = s ? [].concat(s, i) : i);
        } else o !== "" && (t[o] = r[o]);
    }
    return t;
  }
  function Jt(e, t, n, r = null) {
    Rt(e, t, 7, [n, r]);
  }
  const hv = kd();
  let gv = 0;
  function mv(e, t, n) {
    const r = e.type,
      o = (t ? t.appContext : e.appContext) || hv,
      s = {
        uid: gv++,
        vnode: e,
        type: r,
        parent: t,
        appContext: o,
        root: null,
        next: null,
        subTree: null,
        effect: null,
        update: null,
        scope: new Hf(!0),
        render: null,
        proxy: null,
        exposed: null,
        exposeProxy: null,
        withProxy: null,
        provides: t ? t.provides : Object.create(o.provides),
        accessCache: null,
        renderCache: [],
        components: null,
        directives: null,
        propsOptions: Td(r, o),
        emitsOptions: dd(r, o),
        emit: null,
        emitted: null,
        propsDefaults: Ve,
        inheritAttrs: r.inheritAttrs,
        ctx: Ve,
        data: Ve,
        props: Ve,
        attrs: Ve,
        slots: Ve,
        refs: Ve,
        setupState: Ve,
        setupContext: null,
        suspense: n,
        suspenseId: n ? n.pendingId : 0,
        asyncDep: null,
        asyncResolved: !1,
        isMounted: !1,
        isUnmounted: !1,
        isDeactivated: !1,
        bc: null,
        c: null,
        bm: null,
        m: null,
        bu: null,
        u: null,
        um: null,
        bum: null,
        da: null,
        a: null,
        rtg: null,
        rtc: null,
        ec: null,
        sp: null,
      };
    return (
      (s.ctx = { _: s }),
      (s.root = t ? t.root : s),
      (s.emit = Tm.bind(null, s)),
      e.ce && e.ce(s),
      s
    );
  }
  let Ke = null;
  const Ct = () => Ke || rt,
    Pr = (e) => {
      (Ke = e), e.scope.on();
    },
    nr = () => {
      Ke && Ke.scope.off(), (Ke = null);
    };
  function Id(e) {
    return e.vnode.shapeFlag & 4;
  }
  let ko = !1;
  function vv(e, t = !1) {
    ko = t;
    const { props: n, children: r } = e.vnode,
      o = Id(e);
    Ym(e, n, o, t), ev(e, r);
    const s = o ? yv(e, t) : void 0;
    return (ko = !1), s;
  }
  function yv(e, t) {
    const n = e.type;
    (e.accessCache = Object.create(null)), (e.proxy = nd(new Proxy(e.ctx, Vm)));
    const { setup: r } = n;
    if (r) {
      const o = (e.setupContext = r.length > 1 ? Nd(e) : null);
      Pr(e), qr();
      const s = Fn(r, e, 0, [e.props, o]);
      if ((Vr(), nr(), Bf(s))) {
        if ((s.then(nr, nr), t))
          return s
            .then((i) => {
              bu(e, i, t);
            })
            .catch((i) => {
              Ws(i, e, 0);
            });
        e.asyncDep = s;
      } else bu(e, s, t);
    } else Fd(e, t);
  }
  function bu(e, t, n) {
    he(t)
      ? e.type.__ssrInlineRender
        ? (e.ssrRender = t)
        : (e.render = t)
      : Me(t) && (e.setupState = id(t)),
      Fd(e, n);
  }
  let _u;
  function Fd(e, t, n) {
    const r = e.type;
    if (!e.render) {
      if (!t && _u && !r.render) {
        const o = r.template || el(e).template;
        if (o) {
          const { isCustomElement: s, compilerOptions: i } =
              e.appContext.config,
            { delimiters: a, compilerOptions: l } = r,
            u = tt(tt({ isCustomElement: s, delimiters: a }, i), l);
          r.render = _u(o, u);
        }
      }
      e.render = r.render || ut;
    }
    Pr(e), qr(), Wm(e), Vr(), nr();
  }
  function bv(e) {
    return new Proxy(e.attrs, {
      get(t, n) {
        return yt(e, "get", "$attrs"), t[n];
      },
    });
  }
  function Nd(e) {
    const t = (r) => {
      e.exposed = r || {};
    };
    let n;
    return {
      get attrs() {
        return n || (n = bv(e));
      },
      slots: e.slots,
      emit: e.emit,
      expose: t,
    };
  }
  function Ys(e) {
    if (e.exposed)
      return (
        e.exposeProxy ||
        (e.exposeProxy = new Proxy(id(nd(e.exposed)), {
          get(t, n) {
            if (n in t) return t[n];
            if (n in ho) return ho[n](e);
          },
          has(t, n) {
            return n in t || n in ho;
          },
        }))
      );
  }
  function _v(e, t = !0) {
    return he(e) ? e.displayName || e.name : e.name || (t && e.__name);
  }
  function wv(e) {
    return he(e) && "__vccOpts" in e;
  }
  const M = (e, t) => bm(e, t, ko);
  function ol() {
    return Ld().slots;
  }
  function xv() {
    return Ld().attrs;
  }
  function Ld() {
    const e = Ct();
    return e.setupContext || (e.setupContext = Nd(e));
  }
  function qe(e, t, n) {
    const r = arguments.length;
    return r === 2
      ? Me(t) && !pe(t)
        ? Ln(t)
          ? ve(e, null, [t])
          : ve(e, t)
        : ve(e, null, t)
      : (r > 3
          ? (n = Array.prototype.slice.call(arguments, 2))
          : r === 3 && Ln(n) && (n = [n]),
        ve(e, t, n));
  }
  const Ev = Symbol(""),
    Sv = () => Pe(Ev),
    Ov = "3.2.47",
    Tv = "http://www.w3.org/2000/svg",
    Yn = typeof document < "u" ? document : null,
    wu = Yn && Yn.createElement("template"),
    $v = {
      insert: (e, t, n) => {
        t.insertBefore(e, n || null);
      },
      remove: (e) => {
        const t = e.parentNode;
        t && t.removeChild(e);
      },
      createElement: (e, t, n, r) => {
        const o = t
          ? Yn.createElementNS(Tv, e)
          : Yn.createElement(e, n ? { is: n } : void 0);
        return (
          e === "select" &&
            r &&
            r.multiple != null &&
            o.setAttribute("multiple", r.multiple),
          o
        );
      },
      createText: (e) => Yn.createTextNode(e),
      createComment: (e) => Yn.createComment(e),
      setText: (e, t) => {
        e.nodeValue = t;
      },
      setElementText: (e, t) => {
        e.textContent = t;
      },
      parentNode: (e) => e.parentNode,
      nextSibling: (e) => e.nextSibling,
      querySelector: (e) => Yn.querySelector(e),
      setScopeId(e, t) {
        e.setAttribute(t, "");
      },
      insertStaticContent(e, t, n, r, o, s) {
        const i = n ? n.previousSibling : t.lastChild;
        if (o && (o === s || o.nextSibling))
          for (
            ;
            t.insertBefore(o.cloneNode(!0), n),
              !(o === s || !(o = o.nextSibling));

          );
        else {
          wu.innerHTML = r ? `<svg>${e}</svg>` : e;
          const a = wu.content;
          if (r) {
            const l = a.firstChild;
            for (; l.firstChild; ) a.appendChild(l.firstChild);
            a.removeChild(l);
          }
          t.insertBefore(a, n);
        }
        return [
          i ? i.nextSibling : t.firstChild,
          n ? n.previousSibling : t.lastChild,
        ];
      },
    };
  function Cv(e, t, n) {
    const r = e._vtc;
    r && (t = (t ? [t, ...r] : [...r]).join(" ")),
      t == null
        ? e.removeAttribute("class")
        : n
        ? e.setAttribute("class", t)
        : (e.className = t);
  }
  function Av(e, t, n) {
    const r = e.style,
      o = Ee(n);
    if (n && !o) {
      if (t && !Ee(t)) for (const s in t) n[s] == null && ta(r, s, "");
      for (const s in n) ta(r, s, n[s]);
    } else {
      const s = r.display;
      o ? t !== n && (r.cssText = n) : t && e.removeAttribute("style"),
        "_vod" in e && (r.display = s);
    }
  }
  const xu = /\s*!important$/;
  function ta(e, t, n) {
    if (pe(n)) n.forEach((r) => ta(e, t, r));
    else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
    else {
      const r = kv(e, t);
      xu.test(n)
        ? e.setProperty(lr(r), n.replace(xu, ""), "important")
        : (e[r] = n);
    }
  }
  const Eu = ["Webkit", "Moz", "ms"],
    xi = {};
  function kv(e, t) {
    const n = xi[t];
    if (n) return n;
    let r = Ut(t);
    if (r !== "filter" && r in e) return (xi[t] = r);
    r = qs(r);
    for (let o = 0; o < Eu.length; o++) {
      const s = Eu[o] + r;
      if (s in e) return (xi[t] = s);
    }
    return t;
  }
  const Su = "http://www.w3.org/1999/xlink";
  function Pv(e, t, n, r, o) {
    if (r && t.startsWith("xlink:"))
      n == null
        ? e.removeAttributeNS(Su, t.slice(6, t.length))
        : e.setAttributeNS(Su, t, n);
    else {
      const s = Ag(t);
      n == null || (s && !Nf(n))
        ? e.removeAttribute(t)
        : e.setAttribute(t, s ? "" : n);
    }
  }
  function Rv(e, t, n, r, o, s, i) {
    if (t === "innerHTML" || t === "textContent") {
      r && i(r, o, s), (e[t] = n ?? "");
      return;
    }
    if (t === "value" && e.tagName !== "PROGRESS" && !e.tagName.includes("-")) {
      e._value = n;
      const l = n ?? "";
      (e.value !== l || e.tagName === "OPTION") && (e.value = l),
        n == null && e.removeAttribute(t);
      return;
    }
    let a = !1;
    if (n === "" || n == null) {
      const l = typeof e[t];
      l === "boolean"
        ? (n = Nf(n))
        : n == null && l === "string"
        ? ((n = ""), (a = !0))
        : l === "number" && ((n = 0), (a = !0));
    }
    try {
      e[t] = n;
    } catch {}
    a && e.removeAttribute(t);
  }
  function Mv(e, t, n, r) {
    e.addEventListener(t, n, r);
  }
  function Iv(e, t, n, r) {
    e.removeEventListener(t, n, r);
  }
  function Fv(e, t, n, r, o = null) {
    const s = e._vei || (e._vei = {}),
      i = s[t];
    if (r && i) i.value = r;
    else {
      const [a, l] = Nv(t);
      if (r) {
        const u = (s[t] = Bv(r, o));
        Mv(e, a, u, l);
      } else i && (Iv(e, a, i, l), (s[t] = void 0));
    }
  }
  const Ou = /(?:Once|Passive|Capture)$/;
  function Nv(e) {
    let t;
    if (Ou.test(e)) {
      t = {};
      let r;
      for (; (r = e.match(Ou)); )
        (e = e.slice(0, e.length - r[0].length)), (t[r[0].toLowerCase()] = !0);
    }
    return [e[2] === ":" ? e.slice(3) : lr(e.slice(2)), t];
  }
  let Ei = 0;
  const Lv = Promise.resolve(),
    jv = () => Ei || (Lv.then(() => (Ei = 0)), (Ei = Date.now()));
  function Bv(e, t) {
    const n = (r) => {
      if (!r._vts) r._vts = Date.now();
      else if (r._vts <= n.attached) return;
      Rt(Dv(r, n.value), t, 5, [r]);
    };
    return (n.value = e), (n.attached = jv()), n;
  }
  function Dv(e, t) {
    if (pe(t)) {
      const n = e.stopImmediatePropagation;
      return (
        (e.stopImmediatePropagation = () => {
          n.call(e), (e._stopped = !0);
        }),
        t.map((r) => (o) => !o._stopped && r && r(o))
      );
    } else return t;
  }
  const Tu = /^on[a-z]/,
    zv = (e, t, n, r, o = !1, s, i, a, l) => {
      t === "class"
        ? Cv(e, r, o)
        : t === "style"
        ? Av(e, n, r)
        : zs(t)
        ? Fa(t) || Fv(e, t, n, r, i)
        : (
            t[0] === "."
              ? ((t = t.slice(1)), !0)
              : t[0] === "^"
              ? ((t = t.slice(1)), !1)
              : Hv(e, t, r, o)
          )
        ? Rv(e, t, r, s, i, a, l)
        : (t === "true-value"
            ? (e._trueValue = r)
            : t === "false-value" && (e._falseValue = r),
          Pv(e, t, r, o));
    };
  function Hv(e, t, n, r) {
    return r
      ? !!(
          t === "innerHTML" ||
          t === "textContent" ||
          (t in e && Tu.test(t) && he(n))
        )
      : t === "spellcheck" ||
        t === "draggable" ||
        t === "translate" ||
        t === "form" ||
        (t === "list" && e.tagName === "INPUT") ||
        (t === "type" && e.tagName === "TEXTAREA") ||
        (Tu.test(t) && Ee(n))
      ? !1
      : t in e;
  }
  const En = "transition",
    no = "animation",
    Dn = (e, { slots: t }) => qe(md, Bd(e), t);
  Dn.displayName = "Transition";
  const jd = {
      name: String,
      type: String,
      css: { type: Boolean, default: !0 },
      duration: [String, Number, Object],
      enterFromClass: String,
      enterActiveClass: String,
      enterToClass: String,
      appearFromClass: String,
      appearActiveClass: String,
      appearToClass: String,
      leaveFromClass: String,
      leaveActiveClass: String,
      leaveToClass: String,
    },
    Uv = (Dn.props = tt({}, md.props, jd)),
    Vn = (e, t = []) => {
      pe(e) ? e.forEach((n) => n(...t)) : e && e(...t);
    },
    $u = (e) => (e ? (pe(e) ? e.some((t) => t.length > 1) : e.length > 1) : !1);
  function Bd(e) {
    const t = {};
    for (const $ in e) $ in jd || (t[$] = e[$]);
    if (e.css === !1) return t;
    const {
        name: n = "v",
        type: r,
        duration: o,
        enterFromClass: s = `${n}-enter-from`,
        enterActiveClass: i = `${n}-enter-active`,
        enterToClass: a = `${n}-enter-to`,
        appearFromClass: l = s,
        appearActiveClass: u = i,
        appearToClass: c = a,
        leaveFromClass: f = `${n}-leave-from`,
        leaveActiveClass: d = `${n}-leave-active`,
        leaveToClass: p = `${n}-leave-to`,
      } = e,
      h = qv(o),
      g = h && h[0],
      _ = h && h[1],
      {
        onBeforeEnter: m,
        onEnter: w,
        onEnterCancelled: x,
        onLeave: E,
        onLeaveCancelled: I,
        onBeforeAppear: N = m,
        onAppear: D = w,
        onAppearCancelled: T = x,
      } = t,
      H = ($, F, L) => {
        $n($, F ? c : a), $n($, F ? u : i), L && L();
      },
      S = ($, F) => {
        ($._isLeaving = !1), $n($, f), $n($, p), $n($, d), F && F();
      },
      U = ($) => (F, L) => {
        const O = $ ? D : w,
          z = () => H(F, $, L);
        Vn(O, [F, z]),
          Cu(() => {
            $n(F, $ ? l : s), un(F, $ ? c : a), $u(O) || Au(F, r, g, z);
          });
      };
    return tt(t, {
      onBeforeEnter($) {
        Vn(m, [$]), un($, s), un($, i);
      },
      onBeforeAppear($) {
        Vn(N, [$]), un($, l), un($, u);
      },
      onEnter: U(!1),
      onAppear: U(!0),
      onLeave($, F) {
        $._isLeaving = !0;
        const L = () => S($, F);
        un($, f),
          zd(),
          un($, d),
          Cu(() => {
            $._isLeaving && ($n($, f), un($, p), $u(E) || Au($, r, _, L));
          }),
          Vn(E, [$, L]);
      },
      onEnterCancelled($) {
        H($, !1), Vn(x, [$]);
      },
      onAppearCancelled($) {
        H($, !0), Vn(T, [$]);
      },
      onLeaveCancelled($) {
        S($), Vn(I, [$]);
      },
    });
  }
  function qv(e) {
    if (e == null) return null;
    if (Me(e)) return [Si(e.enter), Si(e.leave)];
    {
      const t = Si(e);
      return [t, t];
    }
  }
  function Si(e) {
    return Lg(e);
  }
  function un(e, t) {
    t.split(/\s+/).forEach((n) => n && e.classList.add(n)),
      (e._vtc || (e._vtc = new Set())).add(t);
  }
  function $n(e, t) {
    t.split(/\s+/).forEach((r) => r && e.classList.remove(r));
    const { _vtc: n } = e;
    n && (n.delete(t), n.size || (e._vtc = void 0));
  }
  function Cu(e) {
    requestAnimationFrame(() => {
      requestAnimationFrame(e);
    });
  }
  let Vv = 0;
  function Au(e, t, n, r) {
    const o = (e._endId = ++Vv),
      s = () => {
        o === e._endId && r();
      };
    if (n) return setTimeout(s, n);
    const { type: i, timeout: a, propCount: l } = Dd(e, t);
    if (!i) return r();
    const u = i + "end";
    let c = 0;
    const f = () => {
        e.removeEventListener(u, d), s();
      },
      d = (p) => {
        p.target === e && ++c >= l && f();
      };
    setTimeout(() => {
      c < l && f();
    }, a + 1),
      e.addEventListener(u, d);
  }
  function Dd(e, t) {
    const n = window.getComputedStyle(e),
      r = (h) => (n[h] || "").split(", "),
      o = r(`${En}Delay`),
      s = r(`${En}Duration`),
      i = ku(o, s),
      a = r(`${no}Delay`),
      l = r(`${no}Duration`),
      u = ku(a, l);
    let c = null,
      f = 0,
      d = 0;
    t === En
      ? i > 0 && ((c = En), (f = i), (d = s.length))
      : t === no
      ? u > 0 && ((c = no), (f = u), (d = l.length))
      : ((f = Math.max(i, u)),
        (c = f > 0 ? (i > u ? En : no) : null),
        (d = c ? (c === En ? s.length : l.length) : 0));
    const p =
      c === En && /\b(transform|all)(,|$)/.test(r(`${En}Property`).toString());
    return { type: c, timeout: f, propCount: d, hasTransform: p };
  }
  function ku(e, t) {
    for (; e.length < t.length; ) e = e.concat(e);
    return Math.max(...t.map((n, r) => Pu(n) + Pu(e[r])));
  }
  function Pu(e) {
    return Number(e.slice(0, -1).replace(",", ".")) * 1e3;
  }
  function zd() {
    return document.body.offsetHeight;
  }
  const Hd = new WeakMap(),
    Ud = new WeakMap(),
    qd = {
      name: "TransitionGroup",
      props: tt({}, Uv, { tag: String, moveClass: String }),
      setup(e, { slots: t }) {
        const n = Ct(),
          r = gd();
        let o, s;
        return (
          Ya(() => {
            if (!o.length) return;
            const i = e.moveClass || `${e.name || "v"}-move`;
            if (!Yv(o[0].el, n.vnode.el, i)) return;
            o.forEach(Gv), o.forEach(Jv);
            const a = o.filter(Zv);
            zd(),
              a.forEach((l) => {
                const u = l.el,
                  c = u.style;
                un(u, i),
                  (c.transform = c.webkitTransform = c.transitionDuration = "");
                const f = (u._moveCb = (d) => {
                  (d && d.target !== u) ||
                    ((!d || /transform$/.test(d.propertyName)) &&
                      (u.removeEventListener("transitionend", f),
                      (u._moveCb = null),
                      $n(u, i)));
                });
                u.addEventListener("transitionend", f);
              });
          }),
          () => {
            const i = ke(e),
              a = Bd(i);
            let l = i.tag || We;
            (o = s), (s = t.default ? Za(t.default()) : []);
            for (let u = 0; u < s.length; u++) {
              const c = s[u];
              c.key != null && Co(c, $o(c, a, r, n));
            }
            if (o)
              for (let u = 0; u < o.length; u++) {
                const c = o[u];
                Co(c, $o(c, a, r, n)), Hd.set(c, c.el.getBoundingClientRect());
              }
            return ve(l, null, s);
          }
        );
      },
    },
    Wv = (e) => delete e.mode;
  qd.props;
  const Kv = qd;
  function Gv(e) {
    const t = e.el;
    t._moveCb && t._moveCb(), t._enterCb && t._enterCb();
  }
  function Jv(e) {
    Ud.set(e, e.el.getBoundingClientRect());
  }
  function Zv(e) {
    const t = Hd.get(e),
      n = Ud.get(e),
      r = t.left - n.left,
      o = t.top - n.top;
    if (r || o) {
      const s = e.el.style;
      return (
        (s.transform = s.webkitTransform = `translate(${r}px,${o}px)`),
        (s.transitionDuration = "0s"),
        e
      );
    }
  }
  function Yv(e, t, n) {
    const r = e.cloneNode();
    e._vtc &&
      e._vtc.forEach((i) => {
        i.split(/\s+/).forEach((a) => a && r.classList.remove(a));
      }),
      n.split(/\s+/).forEach((i) => i && r.classList.add(i)),
      (r.style.display = "none");
    const o = t.nodeType === 1 ? t : t.parentNode;
    o.appendChild(r);
    const { hasTransform: s } = Dd(r);
    return o.removeChild(r), s;
  }
  const Qv = ["ctrl", "shift", "alt", "meta"],
    Xv = {
      stop: (e) => e.stopPropagation(),
      prevent: (e) => e.preventDefault(),
      self: (e) => e.target !== e.currentTarget,
      ctrl: (e) => !e.ctrlKey,
      shift: (e) => !e.shiftKey,
      alt: (e) => !e.altKey,
      meta: (e) => !e.metaKey,
      left: (e) => "button" in e && e.button !== 0,
      middle: (e) => "button" in e && e.button !== 1,
      right: (e) => "button" in e && e.button !== 2,
      exact: (e, t) => Qv.some((n) => e[`${n}Key`] && !t.includes(n)),
    },
    Vd =
      (e, t) =>
      (n, ...r) => {
        for (let o = 0; o < t.length; o++) {
          const s = Xv[t[o]];
          if (s && s(n, t)) return;
        }
        return e(n, ...r);
      },
    Kr = {
      beforeMount(e, { value: t }, { transition: n }) {
        (e._vod = e.style.display === "none" ? "" : e.style.display),
          n && t ? n.beforeEnter(e) : ro(e, t);
      },
      mounted(e, { value: t }, { transition: n }) {
        n && t && n.enter(e);
      },
      updated(e, { value: t, oldValue: n }, { transition: r }) {
        !t != !n &&
          (r
            ? t
              ? (r.beforeEnter(e), ro(e, !0), r.enter(e))
              : r.leave(e, () => {
                  ro(e, !1);
                })
            : ro(e, t));
      },
      beforeUnmount(e, { value: t }) {
        ro(e, t);
      },
    };
  function ro(e, t) {
    e.style.display = t ? e._vod : "none";
  }
  const e0 = tt({ patchProp: zv }, $v);
  let Ru;
  function Wd() {
    return Ru || (Ru = ov(e0));
  }
  const Mu = (...e) => {
      Wd().render(...e);
    },
    Kd = (...e) => {
      const t = Wd().createApp(...e),
        { mount: n } = t;
      return (
        (t.mount = (r) => {
          const o = t0(r);
          if (!o) return;
          const s = t._component;
          !he(s) && !s.render && !s.template && (s.template = o.innerHTML),
            (o.innerHTML = "");
          const i = n(o, !1, o instanceof SVGElement);
          return (
            o instanceof Element &&
              (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")),
            i
          );
        }),
        t
      );
    };
  function t0(e) {
    return Ee(e) ? document.querySelector(e) : e;
  }
  var n0 =
    typeof global == "object" && global && global.Object === Object && global;
  const Gd = n0;
  var r0 = typeof self == "object" && self && self.Object === Object && self,
    o0 = Gd || r0 || Function("return this")();
  const sn = o0;
  var s0 = sn.Symbol;
  const jn = s0;
  var Jd = Object.prototype,
    i0 = Jd.hasOwnProperty,
    a0 = Jd.toString,
    oo = jn ? jn.toStringTag : void 0;
  function l0(e) {
    var t = i0.call(e, oo),
      n = e[oo];
    try {
      e[oo] = void 0;
      var r = !0;
    } catch {}
    var o = a0.call(e);
    return r && (t ? (e[oo] = n) : delete e[oo]), o;
  }
  var u0 = Object.prototype,
    c0 = u0.toString;
  function f0(e) {
    return c0.call(e);
  }
  var d0 = "[object Null]",
    p0 = "[object Undefined]",
    Iu = jn ? jn.toStringTag : void 0;
  function Gr(e) {
    return e == null
      ? e === void 0
        ? p0
        : d0
      : Iu && Iu in Object(e)
      ? l0(e)
      : f0(e);
  }
  function Jr(e) {
    return e != null && typeof e == "object";
  }
  var h0 = "[object Symbol]";
  function sl(e) {
    return typeof e == "symbol" || (Jr(e) && Gr(e) == h0);
  }
  function g0(e, t) {
    for (var n = -1, r = e == null ? 0 : e.length, o = Array(r); ++n < r; )
      o[n] = t(e[n], n, e);
    return o;
  }
  var m0 = Array.isArray;
  const cr = m0;
  var v0 = 1 / 0,
    Fu = jn ? jn.prototype : void 0,
    Nu = Fu ? Fu.toString : void 0;
  function Zd(e) {
    if (typeof e == "string") return e;
    if (cr(e)) return g0(e, Zd) + "";
    if (sl(e)) return Nu ? Nu.call(e) : "";
    var t = e + "";
    return t == "0" && 1 / e == -v0 ? "-0" : t;
  }
  function sr(e) {
    var t = typeof e;
    return e != null && (t == "object" || t == "function");
  }
  var y0 = "[object AsyncFunction]",
    b0 = "[object Function]",
    _0 = "[object GeneratorFunction]",
    w0 = "[object Proxy]";
  function Yd(e) {
    if (!sr(e)) return !1;
    var t = Gr(e);
    return t == b0 || t == _0 || t == y0 || t == w0;
  }
  var x0 = sn["__core-js_shared__"];
  const Oi = x0;
  var Lu = (function () {
    var e = /[^.]+$/.exec((Oi && Oi.keys && Oi.keys.IE_PROTO) || "");
    return e ? "Symbol(src)_1." + e : "";
  })();
  function E0(e) {
    return !!Lu && Lu in e;
  }
  var S0 = Function.prototype,
    O0 = S0.toString;
  function fr(e) {
    if (e != null) {
      try {
        return O0.call(e);
      } catch {}
      try {
        return e + "";
      } catch {}
    }
    return "";
  }
  var T0 = /[\\^$.*+?()[\]{}|]/g,
    $0 = /^\[object .+?Constructor\]$/,
    C0 = Function.prototype,
    A0 = Object.prototype,
    k0 = C0.toString,
    P0 = A0.hasOwnProperty,
    R0 = RegExp(
      "^" +
        k0
          .call(P0)
          .replace(T0, "\\$&")
          .replace(
            /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
            "$1.*?"
          ) +
        "$"
    );
  function M0(e) {
    if (!sr(e) || E0(e)) return !1;
    var t = Yd(e) ? R0 : $0;
    return t.test(fr(e));
  }
  function I0(e, t) {
    return e == null ? void 0 : e[t];
  }
  function dr(e, t) {
    var n = I0(e, t);
    return M0(n) ? n : void 0;
  }
  var F0 = dr(sn, "WeakMap");
  const na = F0;
  var ju = Object.create,
    N0 = (function () {
      function e() {}
      return function (t) {
        if (!sr(t)) return {};
        if (ju) return ju(t);
        e.prototype = t;
        var n = new e();
        return (e.prototype = void 0), n;
      };
    })();
  const L0 = N0;
  function j0(e, t) {
    var n = -1,
      r = e.length;
    for (t || (t = Array(r)); ++n < r; ) t[n] = e[n];
    return t;
  }
  var B0 = (function () {
    try {
      var e = dr(Object, "defineProperty");
      return e({}, "", {}), e;
    } catch {}
  })();
  const Bu = B0;
  function D0(e, t) {
    for (
      var n = -1, r = e == null ? 0 : e.length;
      ++n < r && t(e[n], n, e) !== !1;

    );
    return e;
  }
  var z0 = 9007199254740991,
    H0 = /^(?:0|[1-9]\d*)$/;
  function Qd(e, t) {
    var n = typeof e;
    return (
      (t = t ?? z0),
      !!t &&
        (n == "number" || (n != "symbol" && H0.test(e))) &&
        e > -1 &&
        e % 1 == 0 &&
        e < t
    );
  }
  function Xd(e, t, n) {
    t == "__proto__" && Bu
      ? Bu(e, t, { configurable: !0, enumerable: !0, value: n, writable: !0 })
      : (e[t] = n);
  }
  function ep(e, t) {
    return e === t || (e !== e && t !== t);
  }
  var U0 = Object.prototype,
    q0 = U0.hasOwnProperty;
  function il(e, t, n) {
    var r = e[t];
    (!(q0.call(e, t) && ep(r, n)) || (n === void 0 && !(t in e))) &&
      Xd(e, t, n);
  }
  function Qs(e, t, n, r) {
    var o = !n;
    n || (n = {});
    for (var s = -1, i = t.length; ++s < i; ) {
      var a = t[s],
        l = r ? r(n[a], e[a], a, n, e) : void 0;
      l === void 0 && (l = e[a]), o ? Xd(n, a, l) : il(n, a, l);
    }
    return n;
  }
  var V0 = 9007199254740991;
  function tp(e) {
    return typeof e == "number" && e > -1 && e % 1 == 0 && e <= V0;
  }
  function np(e) {
    return e != null && tp(e.length) && !Yd(e);
  }
  var W0 = Object.prototype;
  function al(e) {
    var t = e && e.constructor,
      n = (typeof t == "function" && t.prototype) || W0;
    return e === n;
  }
  function K0(e, t) {
    for (var n = -1, r = Array(e); ++n < e; ) r[n] = t(n);
    return r;
  }
  var G0 = "[object Arguments]";
  function Du(e) {
    return Jr(e) && Gr(e) == G0;
  }
  var rp = Object.prototype,
    J0 = rp.hasOwnProperty,
    Z0 = rp.propertyIsEnumerable,
    Y0 = Du(
      (function () {
        return arguments;
      })()
    )
      ? Du
      : function (e) {
          return Jr(e) && J0.call(e, "callee") && !Z0.call(e, "callee");
        };
  const Q0 = Y0;
  function X0() {
    return !1;
  }
  var op = typeof Ot == "object" && Ot && !Ot.nodeType && Ot,
    zu = op && typeof Tt == "object" && Tt && !Tt.nodeType && Tt,
    ey = zu && zu.exports === op,
    Hu = ey ? sn.Buffer : void 0,
    ty = Hu ? Hu.isBuffer : void 0,
    ny = ty || X0;
  const sp = ny;
  var ry = "[object Arguments]",
    oy = "[object Array]",
    sy = "[object Boolean]",
    iy = "[object Date]",
    ay = "[object Error]",
    ly = "[object Function]",
    uy = "[object Map]",
    cy = "[object Number]",
    fy = "[object Object]",
    dy = "[object RegExp]",
    py = "[object Set]",
    hy = "[object String]",
    gy = "[object WeakMap]",
    my = "[object ArrayBuffer]",
    vy = "[object DataView]",
    yy = "[object Float32Array]",
    by = "[object Float64Array]",
    _y = "[object Int8Array]",
    wy = "[object Int16Array]",
    xy = "[object Int32Array]",
    Ey = "[object Uint8Array]",
    Sy = "[object Uint8ClampedArray]",
    Oy = "[object Uint16Array]",
    Ty = "[object Uint32Array]",
    Ue = {};
  Ue[yy] =
    Ue[by] =
    Ue[_y] =
    Ue[wy] =
    Ue[xy] =
    Ue[Ey] =
    Ue[Sy] =
    Ue[Oy] =
    Ue[Ty] =
      !0;
  Ue[ry] =
    Ue[oy] =
    Ue[my] =
    Ue[sy] =
    Ue[vy] =
    Ue[iy] =
    Ue[ay] =
    Ue[ly] =
    Ue[uy] =
    Ue[cy] =
    Ue[fy] =
    Ue[dy] =
    Ue[py] =
    Ue[hy] =
    Ue[gy] =
      !1;
  function $y(e) {
    return Jr(e) && tp(e.length) && !!Ue[Gr(e)];
  }
  function ll(e) {
    return function (t) {
      return e(t);
    };
  }
  var ip = typeof Ot == "object" && Ot && !Ot.nodeType && Ot,
    vo = ip && typeof Tt == "object" && Tt && !Tt.nodeType && Tt,
    Cy = vo && vo.exports === ip,
    Ti = Cy && Gd.process,
    Ay = (function () {
      try {
        var e = vo && vo.require && vo.require("util").types;
        return e || (Ti && Ti.binding && Ti.binding("util"));
      } catch {}
    })();
  const Rr = Ay;
  var Uu = Rr && Rr.isTypedArray,
    ky = Uu ? ll(Uu) : $y;
  const Py = ky;
  var Ry = Object.prototype,
    My = Ry.hasOwnProperty;
  function ap(e, t) {
    var n = cr(e),
      r = !n && Q0(e),
      o = !n && !r && sp(e),
      s = !n && !r && !o && Py(e),
      i = n || r || o || s,
      a = i ? K0(e.length, String) : [],
      l = a.length;
    for (var u in e)
      (t || My.call(e, u)) &&
        !(
          i &&
          (u == "length" ||
            (o && (u == "offset" || u == "parent")) ||
            (s && (u == "buffer" || u == "byteLength" || u == "byteOffset")) ||
            Qd(u, l))
        ) &&
        a.push(u);
    return a;
  }
  function lp(e, t) {
    return function (n) {
      return e(t(n));
    };
  }
  var Iy = lp(Object.keys, Object);
  const Fy = Iy;
  var Ny = Object.prototype,
    Ly = Ny.hasOwnProperty;
  function jy(e) {
    if (!al(e)) return Fy(e);
    var t = [];
    for (var n in Object(e)) Ly.call(e, n) && n != "constructor" && t.push(n);
    return t;
  }
  function ul(e) {
    return np(e) ? ap(e) : jy(e);
  }
  function By(e) {
    var t = [];
    if (e != null) for (var n in Object(e)) t.push(n);
    return t;
  }
  var Dy = Object.prototype,
    zy = Dy.hasOwnProperty;
  function Hy(e) {
    if (!sr(e)) return By(e);
    var t = al(e),
      n = [];
    for (var r in e) (r == "constructor" && (t || !zy.call(e, r))) || n.push(r);
    return n;
  }
  function cl(e) {
    return np(e) ? ap(e, !0) : Hy(e);
  }
  var Uy = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    qy = /^\w*$/;
  function Vy(e, t) {
    if (cr(e)) return !1;
    var n = typeof e;
    return n == "number" ||
      n == "symbol" ||
      n == "boolean" ||
      e == null ||
      sl(e)
      ? !0
      : qy.test(e) || !Uy.test(e) || (t != null && e in Object(t));
  }
  var Wy = dr(Object, "create");
  const Po = Wy;
  function Ky() {
    (this.__data__ = Po ? Po(null) : {}), (this.size = 0);
  }
  function Gy(e) {
    var t = this.has(e) && delete this.__data__[e];
    return (this.size -= t ? 1 : 0), t;
  }
  var Jy = "__lodash_hash_undefined__",
    Zy = Object.prototype,
    Yy = Zy.hasOwnProperty;
  function Qy(e) {
    var t = this.__data__;
    if (Po) {
      var n = t[e];
      return n === Jy ? void 0 : n;
    }
    return Yy.call(t, e) ? t[e] : void 0;
  }
  var Xy = Object.prototype,
    eb = Xy.hasOwnProperty;
  function tb(e) {
    var t = this.__data__;
    return Po ? t[e] !== void 0 : eb.call(t, e);
  }
  var nb = "__lodash_hash_undefined__";
  function rb(e, t) {
    var n = this.__data__;
    return (
      (this.size += this.has(e) ? 0 : 1),
      (n[e] = Po && t === void 0 ? nb : t),
      this
    );
  }
  function ir(e) {
    var t = -1,
      n = e == null ? 0 : e.length;
    for (this.clear(); ++t < n; ) {
      var r = e[t];
      this.set(r[0], r[1]);
    }
  }
  ir.prototype.clear = Ky;
  ir.prototype.delete = Gy;
  ir.prototype.get = Qy;
  ir.prototype.has = tb;
  ir.prototype.set = rb;
  function ob() {
    (this.__data__ = []), (this.size = 0);
  }
  function Xs(e, t) {
    for (var n = e.length; n--; ) if (ep(e[n][0], t)) return n;
    return -1;
  }
  var sb = Array.prototype,
    ib = sb.splice;
  function ab(e) {
    var t = this.__data__,
      n = Xs(t, e);
    if (n < 0) return !1;
    var r = t.length - 1;
    return n == r ? t.pop() : ib.call(t, n, 1), --this.size, !0;
  }
  function lb(e) {
    var t = this.__data__,
      n = Xs(t, e);
    return n < 0 ? void 0 : t[n][1];
  }
  function ub(e) {
    return Xs(this.__data__, e) > -1;
  }
  function cb(e, t) {
    var n = this.__data__,
      r = Xs(n, e);
    return r < 0 ? (++this.size, n.push([e, t])) : (n[r][1] = t), this;
  }
  function bn(e) {
    var t = -1,
      n = e == null ? 0 : e.length;
    for (this.clear(); ++t < n; ) {
      var r = e[t];
      this.set(r[0], r[1]);
    }
  }
  bn.prototype.clear = ob;
  bn.prototype.delete = ab;
  bn.prototype.get = lb;
  bn.prototype.has = ub;
  bn.prototype.set = cb;
  var fb = dr(sn, "Map");
  const Ro = fb;
  function db() {
    (this.size = 0),
      (this.__data__ = {
        hash: new ir(),
        map: new (Ro || bn)(),
        string: new ir(),
      });
  }
  function pb(e) {
    var t = typeof e;
    return t == "string" || t == "number" || t == "symbol" || t == "boolean"
      ? e !== "__proto__"
      : e === null;
  }
  function ei(e, t) {
    var n = e.__data__;
    return pb(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
  }
  function hb(e) {
    var t = ei(this, e).delete(e);
    return (this.size -= t ? 1 : 0), t;
  }
  function gb(e) {
    return ei(this, e).get(e);
  }
  function mb(e) {
    return ei(this, e).has(e);
  }
  function vb(e, t) {
    var n = ei(this, e),
      r = n.size;
    return n.set(e, t), (this.size += n.size == r ? 0 : 1), this;
  }
  function zn(e) {
    var t = -1,
      n = e == null ? 0 : e.length;
    for (this.clear(); ++t < n; ) {
      var r = e[t];
      this.set(r[0], r[1]);
    }
  }
  zn.prototype.clear = db;
  zn.prototype.delete = hb;
  zn.prototype.get = gb;
  zn.prototype.has = mb;
  zn.prototype.set = vb;
  var yb = "Expected a function";
  function fl(e, t) {
    if (typeof e != "function" || (t != null && typeof t != "function"))
      throw new TypeError(yb);
    var n = function () {
      var r = arguments,
        o = t ? t.apply(this, r) : r[0],
        s = n.cache;
      if (s.has(o)) return s.get(o);
      var i = e.apply(this, r);
      return (n.cache = s.set(o, i) || s), i;
    };
    return (n.cache = new (fl.Cache || zn)()), n;
  }
  fl.Cache = zn;
  var bb = 500;
  function _b(e) {
    var t = fl(e, function (r) {
        return n.size === bb && n.clear(), r;
      }),
      n = t.cache;
    return t;
  }
  var wb =
      /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
    xb = /\\(\\)?/g,
    Eb = _b(function (e) {
      var t = [];
      return (
        e.charCodeAt(0) === 46 && t.push(""),
        e.replace(wb, function (n, r, o, s) {
          t.push(o ? s.replace(xb, "$1") : r || n);
        }),
        t
      );
    });
  const Sb = Eb;
  function Ob(e) {
    return e == null ? "" : Zd(e);
  }
  function up(e, t) {
    return cr(e) ? e : Vy(e, t) ? [e] : Sb(Ob(e));
  }
  var Tb = 1 / 0;
  function cp(e) {
    if (typeof e == "string" || sl(e)) return e;
    var t = e + "";
    return t == "0" && 1 / e == -Tb ? "-0" : t;
  }
  function $b(e, t) {
    t = up(t, e);
    for (var n = 0, r = t.length; e != null && n < r; ) e = e[cp(t[n++])];
    return n && n == r ? e : void 0;
  }
  function Cb(e, t, n) {
    var r = e == null ? void 0 : $b(e, t);
    return r === void 0 ? n : r;
  }
  function fp(e, t) {
    for (var n = -1, r = t.length, o = e.length; ++n < r; ) e[o + n] = t[n];
    return e;
  }
  var Ab = lp(Object.getPrototypeOf, Object);
  const dp = Ab;
  function ra() {
    if (!arguments.length) return [];
    var e = arguments[0];
    return cr(e) ? e : [e];
  }
  function kb() {
    (this.__data__ = new bn()), (this.size = 0);
  }
  function Pb(e) {
    var t = this.__data__,
      n = t.delete(e);
    return (this.size = t.size), n;
  }
  function Rb(e) {
    return this.__data__.get(e);
  }
  function Mb(e) {
    return this.__data__.has(e);
  }
  var Ib = 200;
  function Fb(e, t) {
    var n = this.__data__;
    if (n instanceof bn) {
      var r = n.__data__;
      if (!Ro || r.length < Ib - 1)
        return r.push([e, t]), (this.size = ++n.size), this;
      n = this.__data__ = new zn(r);
    }
    return n.set(e, t), (this.size = n.size), this;
  }
  function Zr(e) {
    var t = (this.__data__ = new bn(e));
    this.size = t.size;
  }
  Zr.prototype.clear = kb;
  Zr.prototype.delete = Pb;
  Zr.prototype.get = Rb;
  Zr.prototype.has = Mb;
  Zr.prototype.set = Fb;
  function Nb(e, t) {
    return e && Qs(t, ul(t), e);
  }
  function Lb(e, t) {
    return e && Qs(t, cl(t), e);
  }
  var pp = typeof Ot == "object" && Ot && !Ot.nodeType && Ot,
    qu = pp && typeof Tt == "object" && Tt && !Tt.nodeType && Tt,
    jb = qu && qu.exports === pp,
    Vu = jb ? sn.Buffer : void 0,
    Wu = Vu ? Vu.allocUnsafe : void 0;
  function Bb(e, t) {
    if (t) return e.slice();
    var n = e.length,
      r = Wu ? Wu(n) : new e.constructor(n);
    return e.copy(r), r;
  }
  function Db(e, t) {
    for (var n = -1, r = e == null ? 0 : e.length, o = 0, s = []; ++n < r; ) {
      var i = e[n];
      t(i, n, e) && (s[o++] = i);
    }
    return s;
  }
  function hp() {
    return [];
  }
  var zb = Object.prototype,
    Hb = zb.propertyIsEnumerable,
    Ku = Object.getOwnPropertySymbols,
    Ub = Ku
      ? function (e) {
          return e == null
            ? []
            : ((e = Object(e)),
              Db(Ku(e), function (t) {
                return Hb.call(e, t);
              }));
        }
      : hp;
  const dl = Ub;
  function qb(e, t) {
    return Qs(e, dl(e), t);
  }
  var Vb = Object.getOwnPropertySymbols,
    Wb = Vb
      ? function (e) {
          for (var t = []; e; ) fp(t, dl(e)), (e = dp(e));
          return t;
        }
      : hp;
  const gp = Wb;
  function Kb(e, t) {
    return Qs(e, gp(e), t);
  }
  function mp(e, t, n) {
    var r = t(e);
    return cr(e) ? r : fp(r, n(e));
  }
  function Gb(e) {
    return mp(e, ul, dl);
  }
  function Jb(e) {
    return mp(e, cl, gp);
  }
  var Zb = dr(sn, "DataView");
  const oa = Zb;
  var Yb = dr(sn, "Promise");
  const sa = Yb;
  var Qb = dr(sn, "Set");
  const ia = Qb;
  var Gu = "[object Map]",
    Xb = "[object Object]",
    Ju = "[object Promise]",
    Zu = "[object Set]",
    Yu = "[object WeakMap]",
    Qu = "[object DataView]",
    e_ = fr(oa),
    t_ = fr(Ro),
    n_ = fr(sa),
    r_ = fr(ia),
    o_ = fr(na),
    Gn = Gr;
  ((oa && Gn(new oa(new ArrayBuffer(1))) != Qu) ||
    (Ro && Gn(new Ro()) != Gu) ||
    (sa && Gn(sa.resolve()) != Ju) ||
    (ia && Gn(new ia()) != Zu) ||
    (na && Gn(new na()) != Yu)) &&
    (Gn = function (e) {
      var t = Gr(e),
        n = t == Xb ? e.constructor : void 0,
        r = n ? fr(n) : "";
      if (r)
        switch (r) {
          case e_:
            return Qu;
          case t_:
            return Gu;
          case n_:
            return Ju;
          case r_:
            return Zu;
          case o_:
            return Yu;
        }
      return t;
    });
  const pl = Gn;
  var s_ = Object.prototype,
    i_ = s_.hasOwnProperty;
  function a_(e) {
    var t = e.length,
      n = new e.constructor(t);
    return (
      t &&
        typeof e[0] == "string" &&
        i_.call(e, "index") &&
        ((n.index = e.index), (n.input = e.input)),
      n
    );
  }
  var l_ = sn.Uint8Array;
  const Xu = l_;
  function hl(e) {
    var t = new e.constructor(e.byteLength);
    return new Xu(t).set(new Xu(e)), t;
  }
  function u_(e, t) {
    var n = t ? hl(e.buffer) : e.buffer;
    return new e.constructor(n, e.byteOffset, e.byteLength);
  }
  var c_ = /\w*$/;
  function f_(e) {
    var t = new e.constructor(e.source, c_.exec(e));
    return (t.lastIndex = e.lastIndex), t;
  }
  var ec = jn ? jn.prototype : void 0,
    tc = ec ? ec.valueOf : void 0;
  function d_(e) {
    return tc ? Object(tc.call(e)) : {};
  }
  function p_(e, t) {
    var n = t ? hl(e.buffer) : e.buffer;
    return new e.constructor(n, e.byteOffset, e.length);
  }
  var h_ = "[object Boolean]",
    g_ = "[object Date]",
    m_ = "[object Map]",
    v_ = "[object Number]",
    y_ = "[object RegExp]",
    b_ = "[object Set]",
    __ = "[object String]",
    w_ = "[object Symbol]",
    x_ = "[object ArrayBuffer]",
    E_ = "[object DataView]",
    S_ = "[object Float32Array]",
    O_ = "[object Float64Array]",
    T_ = "[object Int8Array]",
    $_ = "[object Int16Array]",
    C_ = "[object Int32Array]",
    A_ = "[object Uint8Array]",
    k_ = "[object Uint8ClampedArray]",
    P_ = "[object Uint16Array]",
    R_ = "[object Uint32Array]";
  function M_(e, t, n) {
    var r = e.constructor;
    switch (t) {
      case x_:
        return hl(e);
      case h_:
      case g_:
        return new r(+e);
      case E_:
        return u_(e, n);
      case S_:
      case O_:
      case T_:
      case $_:
      case C_:
      case A_:
      case k_:
      case P_:
      case R_:
        return p_(e, n);
      case m_:
        return new r();
      case v_:
      case __:
        return new r(e);
      case y_:
        return f_(e);
      case b_:
        return new r();
      case w_:
        return d_(e);
    }
  }
  function I_(e) {
    return typeof e.constructor == "function" && !al(e) ? L0(dp(e)) : {};
  }
  var F_ = "[object Map]";
  function N_(e) {
    return Jr(e) && pl(e) == F_;
  }
  var nc = Rr && Rr.isMap,
    L_ = nc ? ll(nc) : N_;
  const j_ = L_;
  var B_ = "[object Set]";
  function D_(e) {
    return Jr(e) && pl(e) == B_;
  }
  var rc = Rr && Rr.isSet,
    z_ = rc ? ll(rc) : D_;
  const H_ = z_;
  var U_ = 1,
    q_ = 2,
    V_ = 4,
    vp = "[object Arguments]",
    W_ = "[object Array]",
    K_ = "[object Boolean]",
    G_ = "[object Date]",
    J_ = "[object Error]",
    yp = "[object Function]",
    Z_ = "[object GeneratorFunction]",
    Y_ = "[object Map]",
    Q_ = "[object Number]",
    bp = "[object Object]",
    X_ = "[object RegExp]",
    e1 = "[object Set]",
    t1 = "[object String]",
    n1 = "[object Symbol]",
    r1 = "[object WeakMap]",
    o1 = "[object ArrayBuffer]",
    s1 = "[object DataView]",
    i1 = "[object Float32Array]",
    a1 = "[object Float64Array]",
    l1 = "[object Int8Array]",
    u1 = "[object Int16Array]",
    c1 = "[object Int32Array]",
    f1 = "[object Uint8Array]",
    d1 = "[object Uint8ClampedArray]",
    p1 = "[object Uint16Array]",
    h1 = "[object Uint32Array]",
    He = {};
  He[vp] =
    He[W_] =
    He[o1] =
    He[s1] =
    He[K_] =
    He[G_] =
    He[i1] =
    He[a1] =
    He[l1] =
    He[u1] =
    He[c1] =
    He[Y_] =
    He[Q_] =
    He[bp] =
    He[X_] =
    He[e1] =
    He[t1] =
    He[n1] =
    He[f1] =
    He[d1] =
    He[p1] =
    He[h1] =
      !0;
  He[J_] = He[yp] = He[r1] = !1;
  function ms(e, t, n, r, o, s) {
    var i,
      a = t & U_,
      l = t & q_,
      u = t & V_;
    if ((n && (i = o ? n(e, r, o, s) : n(e)), i !== void 0)) return i;
    if (!sr(e)) return e;
    var c = cr(e);
    if (c) {
      if (((i = a_(e)), !a)) return j0(e, i);
    } else {
      var f = pl(e),
        d = f == yp || f == Z_;
      if (sp(e)) return Bb(e, a);
      if (f == bp || f == vp || (d && !o)) {
        if (((i = l || d ? {} : I_(e)), !a))
          return l ? Kb(e, Lb(i, e)) : qb(e, Nb(i, e));
      } else {
        if (!He[f]) return o ? e : {};
        i = M_(e, f, a);
      }
    }
    s || (s = new Zr());
    var p = s.get(e);
    if (p) return p;
    s.set(e, i),
      H_(e)
        ? e.forEach(function (_) {
            i.add(ms(_, t, n, _, e, s));
          })
        : j_(e) &&
          e.forEach(function (_, m) {
            i.set(m, ms(_, t, n, m, e, s));
          });
    var h = u ? (l ? Jb : Gb) : l ? cl : ul,
      g = c ? void 0 : h(e);
    return (
      D0(g || e, function (_, m) {
        g && ((m = _), (_ = e[m])), il(i, m, ms(_, t, n, m, e, s));
      }),
      i
    );
  }
  var g1 = 4;
  function oc(e) {
    return ms(e, g1);
  }
  function Rs(e) {
    for (var t = -1, n = e == null ? 0 : e.length, r = {}; ++t < n; ) {
      var o = e[t];
      r[o[0]] = o[1];
    }
    return r;
  }
  function ti(e) {
    return e == null;
  }
  function m1(e) {
    return e === void 0;
  }
  function v1(e, t, n, r) {
    if (!sr(e)) return e;
    t = up(t, e);
    for (var o = -1, s = t.length, i = s - 1, a = e; a != null && ++o < s; ) {
      var l = cp(t[o]),
        u = n;
      if (l === "__proto__" || l === "constructor" || l === "prototype")
        return e;
      if (o != i) {
        var c = a[l];
        (u = r ? r(c, l, a) : void 0),
          u === void 0 && (u = sr(c) ? c : Qd(t[o + 1]) ? [] : {});
      }
      il(a, l, u), (a = a[l]);
    }
    return e;
  }
  function y1(e, t, n) {
    return e == null ? e : v1(e, t, n);
  }
  const vs = function (e, t, ...n) {
      let r;
      t.includes("mouse") || t.includes("click")
        ? (r = "MouseEvents")
        : t.includes("key")
        ? (r = "KeyboardEvent")
        : (r = "HTMLEvents");
      const o = document.createEvent(r);
      return o.initEvent(t, ...n), e.dispatchEvent(o), e;
    },
    fn =
      (e, t, { checkForDefaultPrevented: n = !0 } = {}) =>
      (o) => {
        const s = e == null ? void 0 : e(o);
        if (n === !1 || !s) return t == null ? void 0 : t(o);
      };
  var sc;
  const ct = typeof window < "u",
    ni = (e) => typeof e == "boolean",
    b1 = (e) => typeof e == "function",
    Mr = (e) => typeof e == "number",
    _1 = (e) => typeof e == "string",
    Ms = () => {},
    w1 =
      ct &&
      ((sc = window == null ? void 0 : window.navigator) == null
        ? void 0
        : sc.userAgent) &&
      /iP(ad|hone|od)/.test(window.navigator.userAgent);
  function Ir(e) {
    return typeof e == "function" ? e() : y(e);
  }
  function _p(e, t) {
    function n(...r) {
      return new Promise((o, s) => {
        Promise.resolve(
          e(() => t.apply(this, r), { fn: t, thisArg: this, args: r })
        )
          .then(o)
          .catch(s);
      });
    }
    return n;
  }
  const wp = (e) => e();
  function x1(e, t = {}) {
    let n,
      r,
      o = Ms;
    const s = (a) => {
      clearTimeout(a), o(), (o = Ms);
    };
    return (a) => {
      const l = Ir(e),
        u = Ir(t.maxWait);
      return (
        n && s(n),
        l <= 0 || (u !== void 0 && u <= 0)
          ? (r && (s(r), (r = null)), Promise.resolve(a()))
          : new Promise((c, f) => {
              (o = t.rejectOnCancel ? f : c),
                u &&
                  !r &&
                  (r = setTimeout(() => {
                    n && s(n), (r = null), c(a());
                  }, u)),
                (n = setTimeout(() => {
                  r && s(r), (r = null), c(a());
                }, l));
            })
      );
    };
  }
  function E1(e = wp) {
    const t = re(!0);
    function n() {
      t.value = !1;
    }
    function r() {
      t.value = !0;
    }
    const o = (...s) => {
      t.value && e(...s);
    };
    return { isActive: zo(t), pause: n, resume: r, eventFilter: o };
  }
  function S1(e) {
    return e;
  }
  function ri(e) {
    return Uf() ? (zg(e), !0) : !1;
  }
  function O1(e, t = 200, n = {}) {
    return _p(x1(t, n), e);
  }
  function T1(e, t = 200, n = {}) {
    const r = re(e.value),
      o = O1(
        () => {
          r.value = e.value;
        },
        t,
        n
      );
    return xe(e, () => o()), r;
  }
  function $1(e, t = !0) {
    Ct() ? Ge(e) : t ? e() : at(e);
  }
  function aa(e, t, n = {}) {
    const { immediate: r = !0 } = n,
      o = re(!1);
    let s = null;
    function i() {
      s && (clearTimeout(s), (s = null));
    }
    function a() {
      (o.value = !1), i();
    }
    function l(...u) {
      i(),
        (o.value = !0),
        (s = setTimeout(() => {
          (o.value = !1), (s = null), e(...u);
        }, Ir(t)));
    }
    return (
      r && ((o.value = !0), ct && l()),
      ri(a),
      { isPending: zo(o), start: l, stop: a }
    );
  }
  var ic = Object.getOwnPropertySymbols,
    C1 = Object.prototype.hasOwnProperty,
    A1 = Object.prototype.propertyIsEnumerable,
    k1 = (e, t) => {
      var n = {};
      for (var r in e) C1.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
      if (e != null && ic)
        for (var r of ic(e)) t.indexOf(r) < 0 && A1.call(e, r) && (n[r] = e[r]);
      return n;
    };
  function P1(e, t, n = {}) {
    const r = n,
      { eventFilter: o = wp } = r,
      s = k1(r, ["eventFilter"]);
    return xe(e, _p(o, t), s);
  }
  var R1 = Object.defineProperty,
    M1 = Object.defineProperties,
    I1 = Object.getOwnPropertyDescriptors,
    Is = Object.getOwnPropertySymbols,
    xp = Object.prototype.hasOwnProperty,
    Ep = Object.prototype.propertyIsEnumerable,
    ac = (e, t, n) =>
      t in e
        ? R1(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
        : (e[t] = n),
    F1 = (e, t) => {
      for (var n in t || (t = {})) xp.call(t, n) && ac(e, n, t[n]);
      if (Is) for (var n of Is(t)) Ep.call(t, n) && ac(e, n, t[n]);
      return e;
    },
    N1 = (e, t) => M1(e, I1(t)),
    L1 = (e, t) => {
      var n = {};
      for (var r in e) xp.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
      if (e != null && Is)
        for (var r of Is(e)) t.indexOf(r) < 0 && Ep.call(e, r) && (n[r] = e[r]);
      return n;
    };
  function j1(e, t, n = {}) {
    const r = n,
      { eventFilter: o } = r,
      s = L1(r, ["eventFilter"]),
      { eventFilter: i, pause: a, resume: l, isActive: u } = E1(o);
    return {
      stop: P1(e, t, N1(F1({}, s), { eventFilter: i })),
      pause: a,
      resume: l,
      isActive: u,
    };
  }
  function Rn(e) {
    var t;
    const n = Ir(e);
    return (t = n == null ? void 0 : n.$el) != null ? t : n;
  }
  const Mo = ct ? window : void 0;
  function Ar(...e) {
    let t, n, r, o;
    if (
      (_1(e[0]) || Array.isArray(e[0])
        ? (([n, r, o] = e), (t = Mo))
        : ([t, n, r, o] = e),
      !t)
    )
      return Ms;
    Array.isArray(n) || (n = [n]), Array.isArray(r) || (r = [r]);
    const s = [],
      i = () => {
        s.forEach((c) => c()), (s.length = 0);
      },
      a = (c, f, d, p) => (
        c.addEventListener(f, d, p), () => c.removeEventListener(f, d, p)
      ),
      l = xe(
        () => [Rn(t), Ir(o)],
        ([c, f]) => {
          i(), c && s.push(...n.flatMap((d) => r.map((p) => a(c, d, p, f))));
        },
        { immediate: !0, flush: "post" }
      ),
      u = () => {
        l(), i();
      };
    return ri(u), u;
  }
  let lc = !1;
  function B1(e, t, n = {}) {
    const {
      window: r = Mo,
      ignore: o = [],
      capture: s = !0,
      detectIframe: i = !1,
    } = n;
    if (!r) return;
    w1 &&
      !lc &&
      ((lc = !0),
      Array.from(r.document.body.children).forEach((d) =>
        d.addEventListener("click", Ms)
      ));
    let a = !0;
    const l = (d) =>
        o.some((p) => {
          if (typeof p == "string")
            return Array.from(r.document.querySelectorAll(p)).some(
              (h) => h === d.target || d.composedPath().includes(h)
            );
          {
            const h = Rn(p);
            return h && (d.target === h || d.composedPath().includes(h));
          }
        }),
      c = [
        Ar(
          r,
          "click",
          (d) => {
            const p = Rn(e);
            if (!(!p || p === d.target || d.composedPath().includes(p))) {
              if ((d.detail === 0 && (a = !l(d)), !a)) {
                a = !0;
                return;
              }
              t(d);
            }
          },
          { passive: !0, capture: s }
        ),
        Ar(
          r,
          "pointerdown",
          (d) => {
            const p = Rn(e);
            p && (a = !d.composedPath().includes(p) && !l(d));
          },
          { passive: !0 }
        ),
        i &&
          Ar(r, "blur", (d) => {
            var p;
            const h = Rn(e);
            ((p = r.document.activeElement) == null ? void 0 : p.tagName) ===
              "IFRAME" &&
              !(h != null && h.contains(r.document.activeElement)) &&
              t(d);
          }),
      ].filter(Boolean);
    return () => c.forEach((d) => d());
  }
  function D1(e, t = !1) {
    const n = re(),
      r = () => (n.value = Boolean(e()));
    return r(), $1(r, t), n;
  }
  const la =
      typeof globalThis < "u"
        ? globalThis
        : typeof window < "u"
        ? window
        : typeof global < "u"
        ? global
        : typeof self < "u"
        ? self
        : {},
    ua = "__vueuse_ssr_handlers__";
  la[ua] = la[ua] || {};
  const z1 = la[ua];
  function H1(e, t) {
    return z1[e] || t;
  }
  function U1(e) {
    return e == null
      ? "any"
      : e instanceof Set
      ? "set"
      : e instanceof Map
      ? "map"
      : e instanceof Date
      ? "date"
      : typeof e == "boolean"
      ? "boolean"
      : typeof e == "string"
      ? "string"
      : typeof e == "object"
      ? "object"
      : Number.isNaN(e)
      ? "any"
      : "number";
  }
  var q1 = Object.defineProperty,
    uc = Object.getOwnPropertySymbols,
    V1 = Object.prototype.hasOwnProperty,
    W1 = Object.prototype.propertyIsEnumerable,
    cc = (e, t, n) =>
      t in e
        ? q1(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
        : (e[t] = n),
    fc = (e, t) => {
      for (var n in t || (t = {})) V1.call(t, n) && cc(e, n, t[n]);
      if (uc) for (var n of uc(t)) W1.call(t, n) && cc(e, n, t[n]);
      return e;
    };
  const K1 = {
      boolean: { read: (e) => e === "true", write: (e) => String(e) },
      object: { read: (e) => JSON.parse(e), write: (e) => JSON.stringify(e) },
      number: { read: (e) => Number.parseFloat(e), write: (e) => String(e) },
      any: { read: (e) => e, write: (e) => String(e) },
      string: { read: (e) => e, write: (e) => String(e) },
      map: {
        read: (e) => new Map(JSON.parse(e)),
        write: (e) => JSON.stringify(Array.from(e.entries())),
      },
      set: {
        read: (e) => new Set(JSON.parse(e)),
        write: (e) => JSON.stringify(Array.from(e)),
      },
      date: { read: (e) => new Date(e), write: (e) => e.toISOString() },
    },
    dc = "vueuse-storage";
  function gl(e, t, n, r = {}) {
    var o;
    const {
        flush: s = "pre",
        deep: i = !0,
        listenToStorageChanges: a = !0,
        writeDefaults: l = !0,
        mergeDefaults: u = !1,
        shallow: c,
        window: f = Mo,
        eventFilter: d,
        onError: p = (T) => {
          console.error(T);
        },
      } = r,
      h = (c ? $r : re)(t);
    if (!n)
      try {
        n = H1("getDefaultStorage", () => {
          var T;
          return (T = Mo) == null ? void 0 : T.localStorage;
        })();
      } catch (T) {
        p(T);
      }
    if (!n) return h;
    const g = Ir(t),
      _ = U1(g),
      m = (o = r.serializer) != null ? o : K1[_],
      { pause: w, resume: x } = j1(h, () => E(h.value), {
        flush: s,
        deep: i,
        eventFilter: d,
      });
    return f && a && (Ar(f, "storage", D), Ar(f, dc, N)), D(), h;
    function E(T) {
      try {
        if (T == null) n.removeItem(e);
        else {
          const H = m.write(T),
            S = n.getItem(e);
          S !== H &&
            (n.setItem(e, H),
            f &&
              f.dispatchEvent(
                new CustomEvent(dc, {
                  detail: { key: e, oldValue: S, newValue: H, storageArea: n },
                })
              ));
        }
      } catch (H) {
        p(H);
      }
    }
    function I(T) {
      const H = T ? T.newValue : n.getItem(e);
      if (H == null) return l && g !== null && n.setItem(e, m.write(g)), g;
      if (!T && u) {
        const S = m.read(H);
        return b1(u)
          ? u(S, g)
          : _ === "object" && !Array.isArray(S)
          ? fc(fc({}, g), S)
          : S;
      } else return typeof H != "string" ? H : m.read(H);
    }
    function N(T) {
      D(T.detail);
    }
    function D(T) {
      if (!(T && T.storageArea !== n)) {
        if (T && T.key == null) {
          h.value = g;
          return;
        }
        if (!(T && T.key !== e)) {
          w();
          try {
            h.value = I(T);
          } catch (H) {
            p(H);
          } finally {
            T ? at(x) : x();
          }
        }
      }
    }
  }
  var pc = Object.getOwnPropertySymbols,
    G1 = Object.prototype.hasOwnProperty,
    J1 = Object.prototype.propertyIsEnumerable,
    Z1 = (e, t) => {
      var n = {};
      for (var r in e) G1.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
      if (e != null && pc)
        for (var r of pc(e)) t.indexOf(r) < 0 && J1.call(e, r) && (n[r] = e[r]);
      return n;
    };
  function oi(e, t, n = {}) {
    const r = n,
      { window: o = Mo } = r,
      s = Z1(r, ["window"]);
    let i;
    const a = D1(() => o && "ResizeObserver" in o),
      l = () => {
        i && (i.disconnect(), (i = void 0));
      },
      u = xe(
        () => Rn(e),
        (f) => {
          l(),
            a.value && o && f && ((i = new ResizeObserver(t)), i.observe(f, s));
        },
        { immediate: !0, flush: "post" }
      ),
      c = () => {
        l(), u();
      };
    return ri(c), { isSupported: a, stop: c };
  }
  var hc;
  (function (e) {
    (e.UP = "UP"),
      (e.RIGHT = "RIGHT"),
      (e.DOWN = "DOWN"),
      (e.LEFT = "LEFT"),
      (e.NONE = "NONE");
  })(hc || (hc = {}));
  var Y1 = Object.defineProperty,
    gc = Object.getOwnPropertySymbols,
    Q1 = Object.prototype.hasOwnProperty,
    X1 = Object.prototype.propertyIsEnumerable,
    mc = (e, t, n) =>
      t in e
        ? Y1(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
        : (e[t] = n),
    ew = (e, t) => {
      for (var n in t || (t = {})) Q1.call(t, n) && mc(e, n, t[n]);
      if (gc) for (var n of gc(t)) X1.call(t, n) && mc(e, n, t[n]);
      return e;
    };
  const tw = {
    easeInSine: [0.12, 0, 0.39, 0],
    easeOutSine: [0.61, 1, 0.88, 1],
    easeInOutSine: [0.37, 0, 0.63, 1],
    easeInQuad: [0.11, 0, 0.5, 0],
    easeOutQuad: [0.5, 1, 0.89, 1],
    easeInOutQuad: [0.45, 0, 0.55, 1],
    easeInCubic: [0.32, 0, 0.67, 0],
    easeOutCubic: [0.33, 1, 0.68, 1],
    easeInOutCubic: [0.65, 0, 0.35, 1],
    easeInQuart: [0.5, 0, 0.75, 0],
    easeOutQuart: [0.25, 1, 0.5, 1],
    easeInOutQuart: [0.76, 0, 0.24, 1],
    easeInQuint: [0.64, 0, 0.78, 0],
    easeOutQuint: [0.22, 1, 0.36, 1],
    easeInOutQuint: [0.83, 0, 0.17, 1],
    easeInExpo: [0.7, 0, 0.84, 0],
    easeOutExpo: [0.16, 1, 0.3, 1],
    easeInOutExpo: [0.87, 0, 0.13, 1],
    easeInCirc: [0.55, 0, 1, 0.45],
    easeOutCirc: [0, 0.55, 0.45, 1],
    easeInOutCirc: [0.85, 0, 0.15, 1],
    easeInBack: [0.36, 0, 0.66, -0.56],
    easeOutBack: [0.34, 1.56, 0.64, 1],
    easeInOutBack: [0.68, -0.6, 0.32, 1.6],
  };
  ew({ linear: S1 }, tw);
  const nw = (e) => e === void 0,
    Io = (e) => (typeof Element > "u" ? !1 : e instanceof Element),
    rw = (e) => (Ee(e) ? !Number.isNaN(Number(e)) : !1),
    vc = (e) => Object.keys(e),
    $i = (e, t, n) => ({
      get value() {
        return Cb(e, t, n);
      },
      set value(r) {
        y1(e, t, r);
      },
    });
  class ow extends Error {
    constructor(t) {
      super(t), (this.name = "ElementPlusError");
    }
  }
  function Fo(e, t) {
    throw new ow(`[${e}] ${t}`);
  }
  const Sp = (e = "") => e.split(" ").filter((t) => !!t.trim()),
    sw = (e, t) => {
      if (!e || !t) return !1;
      if (t.includes(" "))
        throw new Error("className should not contain space.");
      return e.classList.contains(t);
    },
    Er = (e, t) => {
      !e || !t.trim() || e.classList.add(...Sp(t));
    },
    rr = (e, t) => {
      !e || !t.trim() || e.classList.remove(...Sp(t));
    },
    so = (e, t) => {
      var n;
      if (!ct || !e || !t) return "";
      let r = Ut(t);
      r === "float" && (r = "cssFloat");
      try {
        const o = e.style[r];
        if (o) return o;
        const s =
          (n = document.defaultView) == null
            ? void 0
            : n.getComputedStyle(e, "");
        return s ? s[r] : "";
      } catch {
        return e.style[r];
      }
    };
  function ca(e, t = "px") {
    if (!e) return "";
    if (Mr(e) || rw(e)) return `${e}${t}`;
    if (Ee(e)) return e;
  }
  /*! Element Plus Icons Vue v2.0.10 */ var At = (e, t) => {
      let n = e.__vccOpts || e;
      for (let [r, o] of t) n[r] = o;
      return n;
    },
    iw = { name: "ArrowDown" },
    aw = { viewBox: "0 0 1024 1024", xmlns: "http://www.w3.org/2000/svg" },
    lw = ye(
      "path",
      {
        fill: "currentColor",
        d: "M831.872 340.864 512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z",
      },
      null,
      -1
    ),
    uw = [lw];
  function cw(e, t, n, r, o, s) {
    return ee(), me("svg", aw, uw);
  }
  var fw = At(iw, [
      ["render", cw],
      ["__file", "arrow-down.vue"],
    ]),
    dw = { name: "ArrowRight" },
    pw = { viewBox: "0 0 1024 1024", xmlns: "http://www.w3.org/2000/svg" },
    hw = ye(
      "path",
      {
        fill: "currentColor",
        d: "M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z",
      },
      null,
      -1
    ),
    gw = [hw];
  function mw(e, t, n, r, o, s) {
    return ee(), me("svg", pw, gw);
  }
  var vw = At(dw, [
      ["render", mw],
      ["__file", "arrow-right.vue"],
    ]),
    yw = { name: "CircleCheck" },
    bw = { viewBox: "0 0 1024 1024", xmlns: "http://www.w3.org/2000/svg" },
    _w = ye(
      "path",
      {
        fill: "currentColor",
        d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z",
      },
      null,
      -1
    ),
    ww = ye(
      "path",
      {
        fill: "currentColor",
        d: "M745.344 361.344a32 32 0 0 1 45.312 45.312l-288 288a32 32 0 0 1-45.312 0l-160-160a32 32 0 1 1 45.312-45.312L480 626.752l265.344-265.408z",
      },
      null,
      -1
    ),
    xw = [_w, ww];
  function Ew(e, t, n, r, o, s) {
    return ee(), me("svg", bw, xw);
  }
  var Sw = At(yw, [
      ["render", Ew],
      ["__file", "circle-check.vue"],
    ]),
    Ow = { name: "CircleCloseFilled" },
    Tw = { viewBox: "0 0 1024 1024", xmlns: "http://www.w3.org/2000/svg" },
    $w = ye(
      "path",
      {
        fill: "currentColor",
        d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z",
      },
      null,
      -1
    ),
    Cw = [$w];
  function Aw(e, t, n, r, o, s) {
    return ee(), me("svg", Tw, Cw);
  }
  var Op = At(Ow, [
      ["render", Aw],
      ["__file", "circle-close-filled.vue"],
    ]),
    kw = { name: "CircleClose" },
    Pw = { viewBox: "0 0 1024 1024", xmlns: "http://www.w3.org/2000/svg" },
    Rw = ye(
      "path",
      {
        fill: "currentColor",
        d: "m466.752 512-90.496-90.496a32 32 0 0 1 45.248-45.248L512 466.752l90.496-90.496a32 32 0 1 1 45.248 45.248L557.248 512l90.496 90.496a32 32 0 1 1-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 0 1-45.248-45.248L466.752 512z",
      },
      null,
      -1
    ),
    Mw = ye(
      "path",
      {
        fill: "currentColor",
        d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z",
      },
      null,
      -1
    ),
    Iw = [Rw, Mw];
  function Fw(e, t, n, r, o, s) {
    return ee(), me("svg", Pw, Iw);
  }
  var Tp = At(kw, [
      ["render", Fw],
      ["__file", "circle-close.vue"],
    ]),
    Nw = { name: "Close" },
    Lw = { viewBox: "0 0 1024 1024", xmlns: "http://www.w3.org/2000/svg" },
    jw = ye(
      "path",
      {
        fill: "currentColor",
        d: "M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z",
      },
      null,
      -1
    ),
    Bw = [jw];
  function Dw(e, t, n, r, o, s) {
    return ee(), me("svg", Lw, Bw);
  }
  var zw = At(Nw, [
      ["render", Dw],
      ["__file", "close.vue"],
    ]),
    Hw = { name: "Hide" },
    Uw = { viewBox: "0 0 1024 1024", xmlns: "http://www.w3.org/2000/svg" },
    qw = ye(
      "path",
      {
        d: "M876.8 156.8c0-9.6-3.2-16-9.6-22.4-6.4-6.4-12.8-9.6-22.4-9.6-9.6 0-16 3.2-22.4 9.6L736 220.8c-64-32-137.6-51.2-224-60.8-160 16-288 73.6-377.6 176C44.8 438.4 0 496 0 512s48 73.6 134.4 176c22.4 25.6 44.8 48 73.6 67.2l-86.4 89.6c-6.4 6.4-9.6 12.8-9.6 22.4 0 9.6 3.2 16 9.6 22.4 6.4 6.4 12.8 9.6 22.4 9.6 9.6 0 16-3.2 22.4-9.6l704-710.4c3.2-6.4 6.4-12.8 6.4-22.4Zm-646.4 528c-76.8-70.4-128-128-153.6-172.8 28.8-48 80-105.6 153.6-172.8C304 272 400 230.4 512 224c64 3.2 124.8 19.2 176 44.8l-54.4 54.4C598.4 300.8 560 288 512 288c-64 0-115.2 22.4-160 64s-64 96-64 160c0 48 12.8 89.6 35.2 124.8L256 707.2c-9.6-6.4-19.2-16-25.6-22.4Zm140.8-96c-12.8-22.4-19.2-48-19.2-76.8 0-44.8 16-83.2 48-112 32-28.8 67.2-48 112-48 28.8 0 54.4 6.4 73.6 19.2L371.2 588.8ZM889.599 336c-12.8-16-28.8-28.8-41.6-41.6l-48 48c73.6 67.2 124.8 124.8 150.4 169.6-28.8 48-80 105.6-153.6 172.8-73.6 67.2-172.8 108.8-284.8 115.2-51.2-3.2-99.2-12.8-140.8-28.8l-48 48c57.6 22.4 118.4 38.4 188.8 44.8 160-16 288-73.6 377.6-176C979.199 585.6 1024 528 1024 512s-48.001-73.6-134.401-176Z",
        fill: "currentColor",
      },
      null,
      -1
    ),
    Vw = ye(
      "path",
      {
        d: "M511.998 672c-12.8 0-25.6-3.2-38.4-6.4l-51.2 51.2c28.8 12.8 57.6 19.2 89.6 19.2 64 0 115.2-22.4 160-64 41.6-41.6 64-96 64-160 0-32-6.4-64-19.2-89.6l-51.2 51.2c3.2 12.8 6.4 25.6 6.4 38.4 0 44.8-16 83.2-48 112-32 28.8-67.2 48-112 48Z",
        fill: "currentColor",
      },
      null,
      -1
    ),
    Ww = [qw, Vw];
  function Kw(e, t, n, r, o, s) {
    return ee(), me("svg", Uw, Ww);
  }
  var Gw = At(Hw, [
      ["render", Kw],
      ["__file", "hide.vue"],
    ]),
    Jw = { name: "InfoFilled" },
    Zw = { viewBox: "0 0 1024 1024", xmlns: "http://www.w3.org/2000/svg" },
    Yw = ye(
      "path",
      {
        fill: "currentColor",
        d: "M512 64a448 448 0 1 1 0 896.064A448 448 0 0 1 512 64zm67.2 275.072c33.28 0 60.288-23.104 60.288-57.344s-27.072-57.344-60.288-57.344c-33.28 0-60.16 23.104-60.16 57.344s26.88 57.344 60.16 57.344zM590.912 699.2c0-6.848 2.368-24.64 1.024-34.752l-52.608 60.544c-10.88 11.456-24.512 19.392-30.912 17.28a12.992 12.992 0 0 1-8.256-14.72l87.68-276.992c7.168-35.136-12.544-67.2-54.336-71.296-44.096 0-108.992 44.736-148.48 101.504 0 6.784-1.28 23.68.064 33.792l52.544-60.608c10.88-11.328 23.552-19.328 29.952-17.152a12.8 12.8 0 0 1 7.808 16.128L388.48 728.576c-10.048 32.256 8.96 63.872 55.04 71.04 67.84 0 107.904-43.648 147.456-100.416z",
      },
      null,
      -1
    ),
    Qw = [Yw];
  function Xw(e, t, n, r, o, s) {
    return ee(), me("svg", Zw, Qw);
  }
  var $p = At(Jw, [
      ["render", Xw],
      ["__file", "info-filled.vue"],
    ]),
    ex = { name: "Loading" },
    tx = { viewBox: "0 0 1024 1024", xmlns: "http://www.w3.org/2000/svg" },
    nx = ye(
      "path",
      {
        fill: "currentColor",
        d: "M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z",
      },
      null,
      -1
    ),
    rx = [nx];
  function ox(e, t, n, r, o, s) {
    return ee(), me("svg", tx, rx);
  }
  var Cp = At(ex, [
      ["render", ox],
      ["__file", "loading.vue"],
    ]),
    sx = { name: "More" },
    ix = { viewBox: "0 0 1024 1024", xmlns: "http://www.w3.org/2000/svg" },
    ax = ye(
      "path",
      {
        fill: "currentColor",
        d: "M176 416a112 112 0 1 0 0 224 112 112 0 0 0 0-224m0 64a48 48 0 1 1 0 96 48 48 0 0 1 0-96zm336-64a112 112 0 1 1 0 224 112 112 0 0 1 0-224zm0 64a48 48 0 1 0 0 96 48 48 0 0 0 0-96zm336-64a112 112 0 1 1 0 224 112 112 0 0 1 0-224zm0 64a48 48 0 1 0 0 96 48 48 0 0 0 0-96z",
      },
      null,
      -1
    ),
    lx = [ax];
  function ux(e, t, n, r, o, s) {
    return ee(), me("svg", ix, lx);
  }
  var cx = At(sx, [
      ["render", ux],
      ["__file", "more.vue"],
    ]),
    fx = { name: "SuccessFilled" },
    dx = { viewBox: "0 0 1024 1024", xmlns: "http://www.w3.org/2000/svg" },
    px = ye(
      "path",
      {
        fill: "currentColor",
        d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z",
      },
      null,
      -1
    ),
    hx = [px];
  function gx(e, t, n, r, o, s) {
    return ee(), me("svg", dx, hx);
  }
  var Ap = At(fx, [
      ["render", gx],
      ["__file", "success-filled.vue"],
    ]),
    mx = { name: "View" },
    vx = { viewBox: "0 0 1024 1024", xmlns: "http://www.w3.org/2000/svg" },
    yx = ye(
      "path",
      {
        fill: "currentColor",
        d: "M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z",
      },
      null,
      -1
    ),
    bx = [yx];
  function _x(e, t, n, r, o, s) {
    return ee(), me("svg", vx, bx);
  }
  var wx = At(mx, [
      ["render", _x],
      ["__file", "view.vue"],
    ]),
    xx = { name: "WarningFilled" },
    Ex = { viewBox: "0 0 1024 1024", xmlns: "http://www.w3.org/2000/svg" },
    Sx = ye(
      "path",
      {
        fill: "currentColor",
        d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 192a58.432 58.432 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.432 58.432 0 0 0 512 256zm0 512a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4z",
      },
      null,
      -1
    ),
    Ox = [Sx];
  function Tx(e, t, n, r, o, s) {
    return ee(), me("svg", Ex, Ox);
  }
  var kp = At(xx, [
    ["render", Tx],
    ["__file", "warning-filled.vue"],
  ]);
  const Pp = "__epPropKey",
    Se = (e) => e,
    $x = (e) => Me(e) && !!e[Pp],
    si = (e, t) => {
      if (!Me(e) || $x(e)) return e;
      const { values: n, required: r, default: o, type: s, validator: i } = e,
        l = {
          type: s,
          required: !!r,
          validator:
            n || i
              ? (u) => {
                  let c = !1,
                    f = [];
                  if (
                    (n &&
                      ((f = Array.from(n)),
                      Ce(e, "default") && f.push(o),
                      c || (c = f.includes(u))),
                    i && (c || (c = i(u))),
                    !c && f.length > 0)
                  ) {
                    const d = [...new Set(f)]
                      .map((p) => JSON.stringify(p))
                      .join(", ");
                    _m(
                      `Invalid prop: validation failed${
                        t ? ` for prop "${t}"` : ""
                      }. Expected one of [${d}], got value ${JSON.stringify(
                        u
                      )}.`
                    );
                  }
                  return c;
                }
              : void 0,
          [Pp]: !0,
        };
      return Ce(e, "default") && (l.default = o), l;
    },
    Je = (e) => Rs(Object.entries(e).map(([t, n]) => [t, si(n, t)])),
    dn = Se([String, Object, Function]),
    Cx = {
      Close: zw,
      SuccessFilled: Ap,
      InfoFilled: $p,
      WarningFilled: kp,
      CircleCloseFilled: Op,
    },
    yc = { success: Ap, warning: kp, error: Op, info: $p },
    Ax = { validating: Cp, success: Sw, error: Tp },
    _n = (e, t) => {
      if (
        ((e.install = (n) => {
          for (const r of [e, ...Object.values(t ?? {})])
            n.component(r.name, r);
        }),
        t)
      )
        for (const [n, r] of Object.entries(t)) e[n] = r;
      return e;
    },
    kx = (e, t) => (
      (e.install = (n) => {
        (e._context = n._context), (n.config.globalProperties[t] = e);
      }),
      e
    ),
    Ho = (e) => ((e.install = ut), e),
    pt = {
      tab: "Tab",
      enter: "Enter",
      space: "Space",
      left: "ArrowLeft",
      up: "ArrowUp",
      right: "ArrowRight",
      down: "ArrowDown",
      esc: "Escape",
      delete: "Delete",
      backspace: "Backspace",
      numpadEnter: "NumpadEnter",
      pageUp: "PageUp",
      pageDown: "PageDown",
      home: "Home",
      end: "End",
    },
    fa = "update:modelValue",
    ml = ["", "default", "small", "large"],
    ys = (e) => {
      const t = pe(e) ? e : [e],
        n = [];
      return (
        t.forEach((r) => {
          var o;
          pe(r)
            ? n.push(...ys(r))
            : Ln(r) && pe(r.children)
            ? n.push(...ys(r.children))
            : (n.push(r),
              Ln(r) &&
                (o = r.component) != null &&
                o.subTree &&
                n.push(...ys(r.component.subTree)));
        }),
        n
      );
    },
    Px = () => ct && /firefox/i.test(window.navigator.userAgent),
    Rx = (e) => /([(\uAC00-\uD7AF)|(\u3130-\u318F)])+/gi.test(e),
    vl = (e) => e,
    Mx = ["class", "style"],
    Ix = /^on[A-Z]/,
    Fx = (e = {}) => {
      const { excludeListeners: t = !1, excludeKeys: n } = e,
        r = M(() => ((n == null ? void 0 : n.value) || []).concat(Mx)),
        o = Ct();
      return M(
        o
          ? () => {
              var s;
              return Rs(
                Object.entries(
                  (s = o.proxy) == null ? void 0 : s.$attrs
                ).filter(([i]) => !r.value.includes(i) && !(t && Ix.test(i)))
              );
            }
          : () => ({})
      );
    },
    Rp = Symbol("buttonGroupContextKey"),
    Mp = Symbol(),
    Yr = Symbol("formContextKey"),
    ar = Symbol("formItemContextKey"),
    yl = Symbol("popper"),
    Ip = Symbol("popperContent"),
    bl = Symbol("elTooltip"),
    Fp = (e) => {
      const t = Ct();
      return M(() => {
        var n, r;
        return (r = ((n = t.proxy) == null ? void 0 : n.$props)[e]) != null
          ? r
          : void 0;
      });
    },
    Fs = re();
  function pr(e, t = void 0) {
    const n = Ct() ? Pe(Mp, Fs) : Fs;
    return e
      ? M(() => {
          var r, o;
          return (o = (r = n.value) == null ? void 0 : r[e]) != null ? o : t;
        })
      : n;
  }
  const Nx = (e, t, n = !1) => {
      var r;
      const o = !!Ct(),
        s = o ? pr() : void 0,
        i = (r = t == null ? void 0 : t.provide) != null ? r : o ? ot : void 0;
      if (!i) return;
      const a = M(() => {
        const l = y(e);
        return s != null && s.value ? Lx(s.value, l) : l;
      });
      return i(Mp, a), (n || !Fs.value) && (Fs.value = a.value), a;
    },
    Lx = (e, t) => {
      var n;
      const r = [...new Set([...vc(e), ...vc(t)])],
        o = {};
      for (const s of r) o[s] = (n = t[s]) != null ? n : e[s];
      return o;
    },
    _l = si({ type: String, values: ml, required: !1 }),
    ii = (e, t = {}) => {
      const n = re(void 0),
        r = t.prop ? n : Fp("size"),
        o = t.global ? n : pr("size"),
        s = t.form ? { size: void 0 } : Pe(Yr, void 0),
        i = t.formItem ? { size: void 0 } : Pe(ar, void 0);
      return M(
        () =>
          r.value ||
          y(e) ||
          (i == null ? void 0 : i.size) ||
          (s == null ? void 0 : s.size) ||
          o.value ||
          ""
      );
    },
    wl = (e) => {
      const t = Fp("disabled"),
        n = Pe(Yr, void 0);
      return M(
        () => t.value || y(e) || (n == null ? void 0 : n.disabled) || !1
      );
    },
    Np = (
      {
        from: e,
        replacement: t,
        scope: n,
        version: r,
        ref: o,
        type: s = "API",
      },
      i
    ) => {
      xe(
        () => y(i),
        (a) => {},
        { immediate: !0 }
      );
    },
    xl = "el",
    jx = "is-",
    Wn = (e, t, n, r, o) => {
      let s = `${e}-${t}`;
      return n && (s += `-${n}`), r && (s += `__${r}`), o && (s += `--${o}`), s;
    },
    De = (e) => {
      const t = pr("namespace", xl);
      return {
        namespace: t,
        b: (h = "") => Wn(t.value, e, h, "", ""),
        e: (h) => (h ? Wn(t.value, e, "", h, "") : ""),
        m: (h) => (h ? Wn(t.value, e, "", "", h) : ""),
        be: (h, g) => (h && g ? Wn(t.value, e, h, g, "") : ""),
        em: (h, g) => (h && g ? Wn(t.value, e, "", h, g) : ""),
        bm: (h, g) => (h && g ? Wn(t.value, e, h, "", g) : ""),
        bem: (h, g, _) => (h && g && _ ? Wn(t.value, e, h, g, _) : ""),
        is: (h, ...g) => {
          const _ = g.length >= 1 ? g[0] : !0;
          return h && _ ? `${jx}${h}` : "";
        },
        cssVar: (h) => {
          const g = {};
          for (const _ in h) h[_] && (g[`--${t.value}-${_}`] = h[_]);
          return g;
        },
        cssVarName: (h) => `--${t.value}-${h}`,
        cssVarBlock: (h) => {
          const g = {};
          for (const _ in h) h[_] && (g[`--${t.value}-${e}-${_}`] = h[_]);
          return g;
        },
        cssVarBlockName: (h) => `--${t.value}-${e}-${h}`,
      };
    },
    bc = { prefix: Math.floor(Math.random() * 1e4), current: 0 },
    Bx = Symbol("elIdInjection"),
    Lp = () => (Ct() ? Pe(Bx, bc) : bc),
    El = (e) => {
      const t = Lp(),
        n = pr("namespace", xl);
      return M(() => y(e) || `${n.value}-id-${t.prefix}-${t.current++}`);
    },
    jp = () => {
      const e = Pe(Yr, void 0),
        t = Pe(ar, void 0);
      return { form: e, formItem: t };
    },
    Dx = (
      e,
      { formItemContext: t, disableIdGeneration: n, disableIdManagement: r }
    ) => {
      n || (n = re(!1)), r || (r = re(!1));
      const o = re();
      let s;
      const i = M(() => {
        var a;
        return !!(
          !e.label &&
          t &&
          t.inputIds &&
          ((a = t.inputIds) == null ? void 0 : a.length) <= 1
        );
      });
      return (
        Ge(() => {
          s = xe(
            [Xt(e, "id"), n],
            ([a, l]) => {
              const u = a ?? (l ? void 0 : El().value);
              u !== o.value &&
                (t != null &&
                  t.removeInputId &&
                  (o.value && t.removeInputId(o.value),
                  !(r != null && r.value) && !l && u && t.addInputId(u)),
                (o.value = u));
            },
            { immediate: !0 }
          );
        }),
        Qa(() => {
          s && s(),
            t != null && t.removeInputId && o.value && t.removeInputId(o.value);
        }),
        { isLabeledByFormItem: i, inputId: o }
      );
    },
    zx = si({ type: Se(Boolean), default: null }),
    Hx = si({ type: Se(Function) }),
    Bp = (e) => {
      const t = `update:${e}`,
        n = `onUpdate:${e}`,
        r = [t],
        o = { [e]: zx, [n]: Hx };
      return {
        useModelToggle: ({
          indicator: i,
          toggleReason: a,
          shouldHideWhenRouteChanges: l,
          shouldProceed: u,
          onShow: c,
          onHide: f,
        }) => {
          const d = Ct(),
            { emit: p } = d,
            h = d.props,
            g = M(() => he(h[n])),
            _ = M(() => h[e] === null),
            m = (D) => {
              i.value !== !0 &&
                ((i.value = !0), a && (a.value = D), he(c) && c(D));
            },
            w = (D) => {
              i.value !== !1 &&
                ((i.value = !1), a && (a.value = D), he(f) && f(D));
            },
            x = (D) => {
              if (h.disabled === !0 || (he(u) && !u())) return;
              const T = g.value && ct;
              T && p(t, !0), (_.value || !T) && m(D);
            },
            E = (D) => {
              if (h.disabled === !0 || !ct) return;
              const T = g.value && ct;
              T && p(t, !1), (_.value || !T) && w(D);
            },
            I = (D) => {
              ni(D) &&
                (h.disabled && D
                  ? g.value && p(t, !1)
                  : i.value !== D && (D ? m() : w()));
            },
            N = () => {
              i.value ? E() : x();
            };
          return (
            xe(() => h[e], I),
            l &&
              d.appContext.config.globalProperties.$route !== void 0 &&
              xe(
                () => ({ ...d.proxy.$route }),
                () => {
                  l.value && i.value && E();
                }
              ),
            Ge(() => {
              I(h[e]);
            }),
            { hide: E, show: x, toggle: N, hasUpdateHandler: g }
          );
        },
        useModelToggleProps: o,
        useModelToggleEmits: r,
      };
    };
  Bp("modelValue");
  var mt = "top",
    It = "bottom",
    Ft = "right",
    vt = "left",
    Sl = "auto",
    Uo = [mt, It, Ft, vt],
    Fr = "start",
    No = "end",
    Ux = "clippingParents",
    Dp = "viewport",
    io = "popper",
    qx = "reference",
    _c = Uo.reduce(function (e, t) {
      return e.concat([t + "-" + Fr, t + "-" + No]);
    }, []),
    Ol = [].concat(Uo, [Sl]).reduce(function (e, t) {
      return e.concat([t, t + "-" + Fr, t + "-" + No]);
    }, []),
    Vx = "beforeRead",
    Wx = "read",
    Kx = "afterRead",
    Gx = "beforeMain",
    Jx = "main",
    Zx = "afterMain",
    Yx = "beforeWrite",
    Qx = "write",
    Xx = "afterWrite",
    e2 = [Vx, Wx, Kx, Gx, Jx, Zx, Yx, Qx, Xx];
  function on(e) {
    return e ? (e.nodeName || "").toLowerCase() : null;
  }
  function Vt(e) {
    if (e == null) return window;
    if (e.toString() !== "[object Window]") {
      var t = e.ownerDocument;
      return (t && t.defaultView) || window;
    }
    return e;
  }
  function Nr(e) {
    var t = Vt(e).Element;
    return e instanceof t || e instanceof Element;
  }
  function Mt(e) {
    var t = Vt(e).HTMLElement;
    return e instanceof t || e instanceof HTMLElement;
  }
  function Tl(e) {
    if (typeof ShadowRoot > "u") return !1;
    var t = Vt(e).ShadowRoot;
    return e instanceof t || e instanceof ShadowRoot;
  }
  function t2(e) {
    var t = e.state;
    Object.keys(t.elements).forEach(function (n) {
      var r = t.styles[n] || {},
        o = t.attributes[n] || {},
        s = t.elements[n];
      !Mt(s) ||
        !on(s) ||
        (Object.assign(s.style, r),
        Object.keys(o).forEach(function (i) {
          var a = o[i];
          a === !1
            ? s.removeAttribute(i)
            : s.setAttribute(i, a === !0 ? "" : a);
        }));
    });
  }
  function n2(e) {
    var t = e.state,
      n = {
        popper: {
          position: t.options.strategy,
          left: "0",
          top: "0",
          margin: "0",
        },
        arrow: { position: "absolute" },
        reference: {},
      };
    return (
      Object.assign(t.elements.popper.style, n.popper),
      (t.styles = n),
      t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow),
      function () {
        Object.keys(t.elements).forEach(function (r) {
          var o = t.elements[r],
            s = t.attributes[r] || {},
            i = Object.keys(t.styles.hasOwnProperty(r) ? t.styles[r] : n[r]),
            a = i.reduce(function (l, u) {
              return (l[u] = ""), l;
            }, {});
          !Mt(o) ||
            !on(o) ||
            (Object.assign(o.style, a),
            Object.keys(s).forEach(function (l) {
              o.removeAttribute(l);
            }));
        });
      }
    );
  }
  var zp = {
    name: "applyStyles",
    enabled: !0,
    phase: "write",
    fn: t2,
    effect: n2,
    requires: ["computeStyles"],
  };
  function tn(e) {
    return e.split("-")[0];
  }
  var or = Math.max,
    Ns = Math.min,
    Lr = Math.round;
  function jr(e, t) {
    t === void 0 && (t = !1);
    var n = e.getBoundingClientRect(),
      r = 1,
      o = 1;
    if (Mt(e) && t) {
      var s = e.offsetHeight,
        i = e.offsetWidth;
      i > 0 && (r = Lr(n.width) / i || 1), s > 0 && (o = Lr(n.height) / s || 1);
    }
    return {
      width: n.width / r,
      height: n.height / o,
      top: n.top / o,
      right: n.right / r,
      bottom: n.bottom / o,
      left: n.left / r,
      x: n.left / r,
      y: n.top / o,
    };
  }
  function $l(e) {
    var t = jr(e),
      n = e.offsetWidth,
      r = e.offsetHeight;
    return (
      Math.abs(t.width - n) <= 1 && (n = t.width),
      Math.abs(t.height - r) <= 1 && (r = t.height),
      { x: e.offsetLeft, y: e.offsetTop, width: n, height: r }
    );
  }
  function Hp(e, t) {
    var n = t.getRootNode && t.getRootNode();
    if (e.contains(t)) return !0;
    if (n && Tl(n)) {
      var r = t;
      do {
        if (r && e.isSameNode(r)) return !0;
        r = r.parentNode || r.host;
      } while (r);
    }
    return !1;
  }
  function mn(e) {
    return Vt(e).getComputedStyle(e);
  }
  function r2(e) {
    return ["table", "td", "th"].indexOf(on(e)) >= 0;
  }
  function Hn(e) {
    return ((Nr(e) ? e.ownerDocument : e.document) || window.document)
      .documentElement;
  }
  function ai(e) {
    return on(e) === "html"
      ? e
      : e.assignedSlot || e.parentNode || (Tl(e) ? e.host : null) || Hn(e);
  }
  function wc(e) {
    return !Mt(e) || mn(e).position === "fixed" ? null : e.offsetParent;
  }
  function o2(e) {
    var t = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1,
      n = navigator.userAgent.indexOf("Trident") !== -1;
    if (n && Mt(e)) {
      var r = mn(e);
      if (r.position === "fixed") return null;
    }
    var o = ai(e);
    for (
      Tl(o) && (o = o.host);
      Mt(o) && ["html", "body"].indexOf(on(o)) < 0;

    ) {
      var s = mn(o);
      if (
        s.transform !== "none" ||
        s.perspective !== "none" ||
        s.contain === "paint" ||
        ["transform", "perspective"].indexOf(s.willChange) !== -1 ||
        (t && s.willChange === "filter") ||
        (t && s.filter && s.filter !== "none")
      )
        return o;
      o = o.parentNode;
    }
    return null;
  }
  function qo(e) {
    for (var t = Vt(e), n = wc(e); n && r2(n) && mn(n).position === "static"; )
      n = wc(n);
    return n &&
      (on(n) === "html" || (on(n) === "body" && mn(n).position === "static"))
      ? t
      : n || o2(e) || t;
  }
  function Cl(e) {
    return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
  }
  function yo(e, t, n) {
    return or(e, Ns(t, n));
  }
  function s2(e, t, n) {
    var r = yo(e, t, n);
    return r > n ? n : r;
  }
  function Up() {
    return { top: 0, right: 0, bottom: 0, left: 0 };
  }
  function qp(e) {
    return Object.assign({}, Up(), e);
  }
  function Vp(e, t) {
    return t.reduce(function (n, r) {
      return (n[r] = e), n;
    }, {});
  }
  var i2 = function (e, t) {
    return (
      (e =
        typeof e == "function"
          ? e(Object.assign({}, t.rects, { placement: t.placement }))
          : e),
      qp(typeof e != "number" ? e : Vp(e, Uo))
    );
  };
  function a2(e) {
    var t,
      n = e.state,
      r = e.name,
      o = e.options,
      s = n.elements.arrow,
      i = n.modifiersData.popperOffsets,
      a = tn(n.placement),
      l = Cl(a),
      u = [vt, Ft].indexOf(a) >= 0,
      c = u ? "height" : "width";
    if (!(!s || !i)) {
      var f = i2(o.padding, n),
        d = $l(s),
        p = l === "y" ? mt : vt,
        h = l === "y" ? It : Ft,
        g =
          n.rects.reference[c] +
          n.rects.reference[l] -
          i[l] -
          n.rects.popper[c],
        _ = i[l] - n.rects.reference[l],
        m = qo(s),
        w = m ? (l === "y" ? m.clientHeight || 0 : m.clientWidth || 0) : 0,
        x = g / 2 - _ / 2,
        E = f[p],
        I = w - d[c] - f[h],
        N = w / 2 - d[c] / 2 + x,
        D = yo(E, N, I),
        T = l;
      n.modifiersData[r] = ((t = {}), (t[T] = D), (t.centerOffset = D - N), t);
    }
  }
  function l2(e) {
    var t = e.state,
      n = e.options,
      r = n.element,
      o = r === void 0 ? "[data-popper-arrow]" : r;
    o != null &&
      ((typeof o == "string" &&
        ((o = t.elements.popper.querySelector(o)), !o)) ||
        !Hp(t.elements.popper, o) ||
        (t.elements.arrow = o));
  }
  var u2 = {
    name: "arrow",
    enabled: !0,
    phase: "main",
    fn: a2,
    effect: l2,
    requires: ["popperOffsets"],
    requiresIfExists: ["preventOverflow"],
  };
  function Br(e) {
    return e.split("-")[1];
  }
  var c2 = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
  function f2(e) {
    var t = e.x,
      n = e.y,
      r = window,
      o = r.devicePixelRatio || 1;
    return { x: Lr(t * o) / o || 0, y: Lr(n * o) / o || 0 };
  }
  function xc(e) {
    var t,
      n = e.popper,
      r = e.popperRect,
      o = e.placement,
      s = e.variation,
      i = e.offsets,
      a = e.position,
      l = e.gpuAcceleration,
      u = e.adaptive,
      c = e.roundOffsets,
      f = e.isFixed,
      d = i.x,
      p = d === void 0 ? 0 : d,
      h = i.y,
      g = h === void 0 ? 0 : h,
      _ = typeof c == "function" ? c({ x: p, y: g }) : { x: p, y: g };
    (p = _.x), (g = _.y);
    var m = i.hasOwnProperty("x"),
      w = i.hasOwnProperty("y"),
      x = vt,
      E = mt,
      I = window;
    if (u) {
      var N = qo(n),
        D = "clientHeight",
        T = "clientWidth";
      if (
        (N === Vt(n) &&
          ((N = Hn(n)),
          mn(N).position !== "static" &&
            a === "absolute" &&
            ((D = "scrollHeight"), (T = "scrollWidth"))),
        (N = N),
        o === mt || ((o === vt || o === Ft) && s === No))
      ) {
        E = It;
        var H =
          f && N === I && I.visualViewport ? I.visualViewport.height : N[D];
        (g -= H - r.height), (g *= l ? 1 : -1);
      }
      if (o === vt || ((o === mt || o === It) && s === No)) {
        x = Ft;
        var S =
          f && N === I && I.visualViewport ? I.visualViewport.width : N[T];
        (p -= S - r.width), (p *= l ? 1 : -1);
      }
    }
    var U = Object.assign({ position: a }, u && c2),
      $ = c === !0 ? f2({ x: p, y: g }) : { x: p, y: g };
    if (((p = $.x), (g = $.y), l)) {
      var F;
      return Object.assign(
        {},
        U,
        ((F = {}),
        (F[E] = w ? "0" : ""),
        (F[x] = m ? "0" : ""),
        (F.transform =
          (I.devicePixelRatio || 1) <= 1
            ? "translate(" + p + "px, " + g + "px)"
            : "translate3d(" + p + "px, " + g + "px, 0)"),
        F)
      );
    }
    return Object.assign(
      {},
      U,
      ((t = {}),
      (t[E] = w ? g + "px" : ""),
      (t[x] = m ? p + "px" : ""),
      (t.transform = ""),
      t)
    );
  }
  function d2(e) {
    var t = e.state,
      n = e.options,
      r = n.gpuAcceleration,
      o = r === void 0 ? !0 : r,
      s = n.adaptive,
      i = s === void 0 ? !0 : s,
      a = n.roundOffsets,
      l = a === void 0 ? !0 : a,
      u = {
        placement: tn(t.placement),
        variation: Br(t.placement),
        popper: t.elements.popper,
        popperRect: t.rects.popper,
        gpuAcceleration: o,
        isFixed: t.options.strategy === "fixed",
      };
    t.modifiersData.popperOffsets != null &&
      (t.styles.popper = Object.assign(
        {},
        t.styles.popper,
        xc(
          Object.assign({}, u, {
            offsets: t.modifiersData.popperOffsets,
            position: t.options.strategy,
            adaptive: i,
            roundOffsets: l,
          })
        )
      )),
      t.modifiersData.arrow != null &&
        (t.styles.arrow = Object.assign(
          {},
          t.styles.arrow,
          xc(
            Object.assign({}, u, {
              offsets: t.modifiersData.arrow,
              position: "absolute",
              adaptive: !1,
              roundOffsets: l,
            })
          )
        )),
      (t.attributes.popper = Object.assign({}, t.attributes.popper, {
        "data-popper-placement": t.placement,
      }));
  }
  var Wp = {
      name: "computeStyles",
      enabled: !0,
      phase: "beforeWrite",
      fn: d2,
      data: {},
    },
    ns = { passive: !0 };
  function p2(e) {
    var t = e.state,
      n = e.instance,
      r = e.options,
      o = r.scroll,
      s = o === void 0 ? !0 : o,
      i = r.resize,
      a = i === void 0 ? !0 : i,
      l = Vt(t.elements.popper),
      u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
    return (
      s &&
        u.forEach(function (c) {
          c.addEventListener("scroll", n.update, ns);
        }),
      a && l.addEventListener("resize", n.update, ns),
      function () {
        s &&
          u.forEach(function (c) {
            c.removeEventListener("scroll", n.update, ns);
          }),
          a && l.removeEventListener("resize", n.update, ns);
      }
    );
  }
  var Kp = {
      name: "eventListeners",
      enabled: !0,
      phase: "write",
      fn: function () {},
      effect: p2,
      data: {},
    },
    h2 = { left: "right", right: "left", bottom: "top", top: "bottom" };
  function bs(e) {
    return e.replace(/left|right|bottom|top/g, function (t) {
      return h2[t];
    });
  }
  var g2 = { start: "end", end: "start" };
  function Ec(e) {
    return e.replace(/start|end/g, function (t) {
      return g2[t];
    });
  }
  function Al(e) {
    var t = Vt(e),
      n = t.pageXOffset,
      r = t.pageYOffset;
    return { scrollLeft: n, scrollTop: r };
  }
  function kl(e) {
    return jr(Hn(e)).left + Al(e).scrollLeft;
  }
  function m2(e) {
    var t = Vt(e),
      n = Hn(e),
      r = t.visualViewport,
      o = n.clientWidth,
      s = n.clientHeight,
      i = 0,
      a = 0;
    return (
      r &&
        ((o = r.width),
        (s = r.height),
        /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ||
          ((i = r.offsetLeft), (a = r.offsetTop))),
      { width: o, height: s, x: i + kl(e), y: a }
    );
  }
  function v2(e) {
    var t,
      n = Hn(e),
      r = Al(e),
      o = (t = e.ownerDocument) == null ? void 0 : t.body,
      s = or(
        n.scrollWidth,
        n.clientWidth,
        o ? o.scrollWidth : 0,
        o ? o.clientWidth : 0
      ),
      i = or(
        n.scrollHeight,
        n.clientHeight,
        o ? o.scrollHeight : 0,
        o ? o.clientHeight : 0
      ),
      a = -r.scrollLeft + kl(e),
      l = -r.scrollTop;
    return (
      mn(o || n).direction === "rtl" &&
        (a += or(n.clientWidth, o ? o.clientWidth : 0) - s),
      { width: s, height: i, x: a, y: l }
    );
  }
  function Pl(e) {
    var t = mn(e),
      n = t.overflow,
      r = t.overflowX,
      o = t.overflowY;
    return /auto|scroll|overlay|hidden/.test(n + o + r);
  }
  function Gp(e) {
    return ["html", "body", "#document"].indexOf(on(e)) >= 0
      ? e.ownerDocument.body
      : Mt(e) && Pl(e)
      ? e
      : Gp(ai(e));
  }
  function bo(e, t) {
    var n;
    t === void 0 && (t = []);
    var r = Gp(e),
      o = r === ((n = e.ownerDocument) == null ? void 0 : n.body),
      s = Vt(r),
      i = o ? [s].concat(s.visualViewport || [], Pl(r) ? r : []) : r,
      a = t.concat(i);
    return o ? a : a.concat(bo(ai(i)));
  }
  function da(e) {
    return Object.assign({}, e, {
      left: e.x,
      top: e.y,
      right: e.x + e.width,
      bottom: e.y + e.height,
    });
  }
  function y2(e) {
    var t = jr(e);
    return (
      (t.top = t.top + e.clientTop),
      (t.left = t.left + e.clientLeft),
      (t.bottom = t.top + e.clientHeight),
      (t.right = t.left + e.clientWidth),
      (t.width = e.clientWidth),
      (t.height = e.clientHeight),
      (t.x = t.left),
      (t.y = t.top),
      t
    );
  }
  function Sc(e, t) {
    return t === Dp ? da(m2(e)) : Nr(t) ? y2(t) : da(v2(Hn(e)));
  }
  function b2(e) {
    var t = bo(ai(e)),
      n = ["absolute", "fixed"].indexOf(mn(e).position) >= 0,
      r = n && Mt(e) ? qo(e) : e;
    return Nr(r)
      ? t.filter(function (o) {
          return Nr(o) && Hp(o, r) && on(o) !== "body";
        })
      : [];
  }
  function _2(e, t, n) {
    var r = t === "clippingParents" ? b2(e) : [].concat(t),
      o = [].concat(r, [n]),
      s = o[0],
      i = o.reduce(function (a, l) {
        var u = Sc(e, l);
        return (
          (a.top = or(u.top, a.top)),
          (a.right = Ns(u.right, a.right)),
          (a.bottom = Ns(u.bottom, a.bottom)),
          (a.left = or(u.left, a.left)),
          a
        );
      }, Sc(e, s));
    return (
      (i.width = i.right - i.left),
      (i.height = i.bottom - i.top),
      (i.x = i.left),
      (i.y = i.top),
      i
    );
  }
  function Jp(e) {
    var t = e.reference,
      n = e.element,
      r = e.placement,
      o = r ? tn(r) : null,
      s = r ? Br(r) : null,
      i = t.x + t.width / 2 - n.width / 2,
      a = t.y + t.height / 2 - n.height / 2,
      l;
    switch (o) {
      case mt:
        l = { x: i, y: t.y - n.height };
        break;
      case It:
        l = { x: i, y: t.y + t.height };
        break;
      case Ft:
        l = { x: t.x + t.width, y: a };
        break;
      case vt:
        l = { x: t.x - n.width, y: a };
        break;
      default:
        l = { x: t.x, y: t.y };
    }
    var u = o ? Cl(o) : null;
    if (u != null) {
      var c = u === "y" ? "height" : "width";
      switch (s) {
        case Fr:
          l[u] = l[u] - (t[c] / 2 - n[c] / 2);
          break;
        case No:
          l[u] = l[u] + (t[c] / 2 - n[c] / 2);
          break;
      }
    }
    return l;
  }
  function Lo(e, t) {
    t === void 0 && (t = {});
    var n = t,
      r = n.placement,
      o = r === void 0 ? e.placement : r,
      s = n.boundary,
      i = s === void 0 ? Ux : s,
      a = n.rootBoundary,
      l = a === void 0 ? Dp : a,
      u = n.elementContext,
      c = u === void 0 ? io : u,
      f = n.altBoundary,
      d = f === void 0 ? !1 : f,
      p = n.padding,
      h = p === void 0 ? 0 : p,
      g = qp(typeof h != "number" ? h : Vp(h, Uo)),
      _ = c === io ? qx : io,
      m = e.rects.popper,
      w = e.elements[d ? _ : c],
      x = _2(Nr(w) ? w : w.contextElement || Hn(e.elements.popper), i, l),
      E = jr(e.elements.reference),
      I = Jp({ reference: E, element: m, strategy: "absolute", placement: o }),
      N = da(Object.assign({}, m, I)),
      D = c === io ? N : E,
      T = {
        top: x.top - D.top + g.top,
        bottom: D.bottom - x.bottom + g.bottom,
        left: x.left - D.left + g.left,
        right: D.right - x.right + g.right,
      },
      H = e.modifiersData.offset;
    if (c === io && H) {
      var S = H[o];
      Object.keys(T).forEach(function (U) {
        var $ = [Ft, It].indexOf(U) >= 0 ? 1 : -1,
          F = [mt, It].indexOf(U) >= 0 ? "y" : "x";
        T[U] += S[F] * $;
      });
    }
    return T;
  }
  function w2(e, t) {
    t === void 0 && (t = {});
    var n = t,
      r = n.placement,
      o = n.boundary,
      s = n.rootBoundary,
      i = n.padding,
      a = n.flipVariations,
      l = n.allowedAutoPlacements,
      u = l === void 0 ? Ol : l,
      c = Br(r),
      f = c
        ? a
          ? _c
          : _c.filter(function (h) {
              return Br(h) === c;
            })
        : Uo,
      d = f.filter(function (h) {
        return u.indexOf(h) >= 0;
      });
    d.length === 0 && (d = f);
    var p = d.reduce(function (h, g) {
      return (
        (h[g] = Lo(e, {
          placement: g,
          boundary: o,
          rootBoundary: s,
          padding: i,
        })[tn(g)]),
        h
      );
    }, {});
    return Object.keys(p).sort(function (h, g) {
      return p[h] - p[g];
    });
  }
  function x2(e) {
    if (tn(e) === Sl) return [];
    var t = bs(e);
    return [Ec(e), t, Ec(t)];
  }
  function E2(e) {
    var t = e.state,
      n = e.options,
      r = e.name;
    if (!t.modifiersData[r]._skip) {
      for (
        var o = n.mainAxis,
          s = o === void 0 ? !0 : o,
          i = n.altAxis,
          a = i === void 0 ? !0 : i,
          l = n.fallbackPlacements,
          u = n.padding,
          c = n.boundary,
          f = n.rootBoundary,
          d = n.altBoundary,
          p = n.flipVariations,
          h = p === void 0 ? !0 : p,
          g = n.allowedAutoPlacements,
          _ = t.options.placement,
          m = tn(_),
          w = m === _,
          x = l || (w || !h ? [bs(_)] : x2(_)),
          E = [_].concat(x).reduce(function (Le, P) {
            return Le.concat(
              tn(P) === Sl
                ? w2(t, {
                    placement: P,
                    boundary: c,
                    rootBoundary: f,
                    padding: u,
                    flipVariations: h,
                    allowedAutoPlacements: g,
                  })
                : P
            );
          }, []),
          I = t.rects.reference,
          N = t.rects.popper,
          D = new Map(),
          T = !0,
          H = E[0],
          S = 0;
        S < E.length;
        S++
      ) {
        var U = E[S],
          $ = tn(U),
          F = Br(U) === Fr,
          L = [mt, It].indexOf($) >= 0,
          O = L ? "width" : "height",
          z = Lo(t, {
            placement: U,
            boundary: c,
            rootBoundary: f,
            altBoundary: d,
            padding: u,
          }),
          k = L ? (F ? Ft : vt) : F ? It : mt;
        I[O] > N[O] && (k = bs(k));
        var G = bs(k),
          W = [];
        if (
          (s && W.push(z[$] <= 0),
          a && W.push(z[k] <= 0, z[G] <= 0),
          W.every(function (Le) {
            return Le;
          }))
        ) {
          (H = U), (T = !1);
          break;
        }
        D.set(U, W);
      }
      if (T)
        for (
          var oe = h ? 3 : 1,
            le = function (Le) {
              var P = E.find(function (Z) {
                var A = D.get(Z);
                if (A)
                  return A.slice(0, Le).every(function (K) {
                    return K;
                  });
              });
              if (P) return (H = P), "break";
            },
            fe = oe;
          fe > 0;
          fe--
        ) {
          var Oe = le(fe);
          if (Oe === "break") break;
        }
      t.placement !== H &&
        ((t.modifiersData[r]._skip = !0), (t.placement = H), (t.reset = !0));
    }
  }
  var S2 = {
    name: "flip",
    enabled: !0,
    phase: "main",
    fn: E2,
    requiresIfExists: ["offset"],
    data: { _skip: !1 },
  };
  function Oc(e, t, n) {
    return (
      n === void 0 && (n = { x: 0, y: 0 }),
      {
        top: e.top - t.height - n.y,
        right: e.right - t.width + n.x,
        bottom: e.bottom - t.height + n.y,
        left: e.left - t.width - n.x,
      }
    );
  }
  function Tc(e) {
    return [mt, Ft, It, vt].some(function (t) {
      return e[t] >= 0;
    });
  }
  function O2(e) {
    var t = e.state,
      n = e.name,
      r = t.rects.reference,
      o = t.rects.popper,
      s = t.modifiersData.preventOverflow,
      i = Lo(t, { elementContext: "reference" }),
      a = Lo(t, { altBoundary: !0 }),
      l = Oc(i, r),
      u = Oc(a, o, s),
      c = Tc(l),
      f = Tc(u);
    (t.modifiersData[n] = {
      referenceClippingOffsets: l,
      popperEscapeOffsets: u,
      isReferenceHidden: c,
      hasPopperEscaped: f,
    }),
      (t.attributes.popper = Object.assign({}, t.attributes.popper, {
        "data-popper-reference-hidden": c,
        "data-popper-escaped": f,
      }));
  }
  var T2 = {
    name: "hide",
    enabled: !0,
    phase: "main",
    requiresIfExists: ["preventOverflow"],
    fn: O2,
  };
  function $2(e, t, n) {
    var r = tn(e),
      o = [vt, mt].indexOf(r) >= 0 ? -1 : 1,
      s =
        typeof n == "function" ? n(Object.assign({}, t, { placement: e })) : n,
      i = s[0],
      a = s[1];
    return (
      (i = i || 0),
      (a = (a || 0) * o),
      [vt, Ft].indexOf(r) >= 0 ? { x: a, y: i } : { x: i, y: a }
    );
  }
  function C2(e) {
    var t = e.state,
      n = e.options,
      r = e.name,
      o = n.offset,
      s = o === void 0 ? [0, 0] : o,
      i = Ol.reduce(function (c, f) {
        return (c[f] = $2(f, t.rects, s)), c;
      }, {}),
      a = i[t.placement],
      l = a.x,
      u = a.y;
    t.modifiersData.popperOffsets != null &&
      ((t.modifiersData.popperOffsets.x += l),
      (t.modifiersData.popperOffsets.y += u)),
      (t.modifiersData[r] = i);
  }
  var A2 = {
    name: "offset",
    enabled: !0,
    phase: "main",
    requires: ["popperOffsets"],
    fn: C2,
  };
  function k2(e) {
    var t = e.state,
      n = e.name;
    t.modifiersData[n] = Jp({
      reference: t.rects.reference,
      element: t.rects.popper,
      strategy: "absolute",
      placement: t.placement,
    });
  }
  var Zp = {
    name: "popperOffsets",
    enabled: !0,
    phase: "read",
    fn: k2,
    data: {},
  };
  function P2(e) {
    return e === "x" ? "y" : "x";
  }
  function R2(e) {
    var t = e.state,
      n = e.options,
      r = e.name,
      o = n.mainAxis,
      s = o === void 0 ? !0 : o,
      i = n.altAxis,
      a = i === void 0 ? !1 : i,
      l = n.boundary,
      u = n.rootBoundary,
      c = n.altBoundary,
      f = n.padding,
      d = n.tether,
      p = d === void 0 ? !0 : d,
      h = n.tetherOffset,
      g = h === void 0 ? 0 : h,
      _ = Lo(t, { boundary: l, rootBoundary: u, padding: f, altBoundary: c }),
      m = tn(t.placement),
      w = Br(t.placement),
      x = !w,
      E = Cl(m),
      I = P2(E),
      N = t.modifiersData.popperOffsets,
      D = t.rects.reference,
      T = t.rects.popper,
      H =
        typeof g == "function"
          ? g(Object.assign({}, t.rects, { placement: t.placement }))
          : g,
      S =
        typeof H == "number"
          ? { mainAxis: H, altAxis: H }
          : Object.assign({ mainAxis: 0, altAxis: 0 }, H),
      U = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
      $ = { x: 0, y: 0 };
    if (N) {
      if (s) {
        var F,
          L = E === "y" ? mt : vt,
          O = E === "y" ? It : Ft,
          z = E === "y" ? "height" : "width",
          k = N[E],
          G = k + _[L],
          W = k - _[O],
          oe = p ? -T[z] / 2 : 0,
          le = w === Fr ? D[z] : T[z],
          fe = w === Fr ? -T[z] : -D[z],
          Oe = t.elements.arrow,
          Le = p && Oe ? $l(Oe) : { width: 0, height: 0 },
          P = t.modifiersData["arrow#persistent"]
            ? t.modifiersData["arrow#persistent"].padding
            : Up(),
          Z = P[L],
          A = P[O],
          K = yo(0, D[z], Le[z]),
          ne = x ? D[z] / 2 - oe - K - Z - S.mainAxis : le - K - Z - S.mainAxis,
          ue = x
            ? -D[z] / 2 + oe + K + A + S.mainAxis
            : fe + K + A + S.mainAxis,
          ae = t.elements.arrow && qo(t.elements.arrow),
          v = ae ? (E === "y" ? ae.clientTop || 0 : ae.clientLeft || 0) : 0,
          b = (F = U == null ? void 0 : U[E]) != null ? F : 0,
          R = k + ne - b - v,
          j = k + ue - b,
          q = yo(p ? Ns(G, R) : G, k, p ? or(W, j) : W);
        (N[E] = q), ($[E] = q - k);
      }
      if (a) {
        var Q,
          te = E === "x" ? mt : vt,
          J = E === "x" ? It : Ft,
          X = N[I],
          V = I === "y" ? "height" : "width",
          C = X + _[te],
          Y = X - _[J],
          ie = [mt, vt].indexOf(m) !== -1,
          de = (Q = U == null ? void 0 : U[I]) != null ? Q : 0,
          Te = ie ? C : X - D[V] - T[V] - de + S.altAxis,
          je = ie ? X + D[V] + T[V] - de - S.altAxis : Y,
          Fe = p && ie ? s2(Te, X, je) : yo(p ? Te : C, X, p ? je : Y);
        (N[I] = Fe), ($[I] = Fe - X);
      }
      t.modifiersData[r] = $;
    }
  }
  var M2 = {
    name: "preventOverflow",
    enabled: !0,
    phase: "main",
    fn: R2,
    requiresIfExists: ["offset"],
  };
  function I2(e) {
    return { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop };
  }
  function F2(e) {
    return e === Vt(e) || !Mt(e) ? Al(e) : I2(e);
  }
  function N2(e) {
    var t = e.getBoundingClientRect(),
      n = Lr(t.width) / e.offsetWidth || 1,
      r = Lr(t.height) / e.offsetHeight || 1;
    return n !== 1 || r !== 1;
  }
  function L2(e, t, n) {
    n === void 0 && (n = !1);
    var r = Mt(t),
      o = Mt(t) && N2(t),
      s = Hn(t),
      i = jr(e, o),
      a = { scrollLeft: 0, scrollTop: 0 },
      l = { x: 0, y: 0 };
    return (
      (r || (!r && !n)) &&
        ((on(t) !== "body" || Pl(s)) && (a = F2(t)),
        Mt(t)
          ? ((l = jr(t, !0)), (l.x += t.clientLeft), (l.y += t.clientTop))
          : s && (l.x = kl(s))),
      {
        x: i.left + a.scrollLeft - l.x,
        y: i.top + a.scrollTop - l.y,
        width: i.width,
        height: i.height,
      }
    );
  }
  function j2(e) {
    var t = new Map(),
      n = new Set(),
      r = [];
    e.forEach(function (s) {
      t.set(s.name, s);
    });
    function o(s) {
      n.add(s.name);
      var i = [].concat(s.requires || [], s.requiresIfExists || []);
      i.forEach(function (a) {
        if (!n.has(a)) {
          var l = t.get(a);
          l && o(l);
        }
      }),
        r.push(s);
    }
    return (
      e.forEach(function (s) {
        n.has(s.name) || o(s);
      }),
      r
    );
  }
  function B2(e) {
    var t = j2(e);
    return e2.reduce(function (n, r) {
      return n.concat(
        t.filter(function (o) {
          return o.phase === r;
        })
      );
    }, []);
  }
  function D2(e) {
    var t;
    return function () {
      return (
        t ||
          (t = new Promise(function (n) {
            Promise.resolve().then(function () {
              (t = void 0), n(e());
            });
          })),
        t
      );
    };
  }
  function z2(e) {
    var t = e.reduce(function (n, r) {
      var o = n[r.name];
      return (
        (n[r.name] = o
          ? Object.assign({}, o, r, {
              options: Object.assign({}, o.options, r.options),
              data: Object.assign({}, o.data, r.data),
            })
          : r),
        n
      );
    }, {});
    return Object.keys(t).map(function (n) {
      return t[n];
    });
  }
  var $c = { placement: "bottom", modifiers: [], strategy: "absolute" };
  function Cc() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n];
    return !t.some(function (r) {
      return !(r && typeof r.getBoundingClientRect == "function");
    });
  }
  function Rl(e) {
    e === void 0 && (e = {});
    var t = e,
      n = t.defaultModifiers,
      r = n === void 0 ? [] : n,
      o = t.defaultOptions,
      s = o === void 0 ? $c : o;
    return function (i, a, l) {
      l === void 0 && (l = s);
      var u = {
          placement: "bottom",
          orderedModifiers: [],
          options: Object.assign({}, $c, s),
          modifiersData: {},
          elements: { reference: i, popper: a },
          attributes: {},
          styles: {},
        },
        c = [],
        f = !1,
        d = {
          state: u,
          setOptions: function (g) {
            var _ = typeof g == "function" ? g(u.options) : g;
            h(),
              (u.options = Object.assign({}, s, u.options, _)),
              (u.scrollParents = {
                reference: Nr(i)
                  ? bo(i)
                  : i.contextElement
                  ? bo(i.contextElement)
                  : [],
                popper: bo(a),
              });
            var m = B2(z2([].concat(r, u.options.modifiers)));
            return (
              (u.orderedModifiers = m.filter(function (w) {
                return w.enabled;
              })),
              p(),
              d.update()
            );
          },
          forceUpdate: function () {
            if (!f) {
              var g = u.elements,
                _ = g.reference,
                m = g.popper;
              if (Cc(_, m)) {
                (u.rects = {
                  reference: L2(_, qo(m), u.options.strategy === "fixed"),
                  popper: $l(m),
                }),
                  (u.reset = !1),
                  (u.placement = u.options.placement),
                  u.orderedModifiers.forEach(function (T) {
                    return (u.modifiersData[T.name] = Object.assign(
                      {},
                      T.data
                    ));
                  });
                for (var w = 0; w < u.orderedModifiers.length; w++) {
                  if (u.reset === !0) {
                    (u.reset = !1), (w = -1);
                    continue;
                  }
                  var x = u.orderedModifiers[w],
                    E = x.fn,
                    I = x.options,
                    N = I === void 0 ? {} : I,
                    D = x.name;
                  typeof E == "function" &&
                    (u =
                      E({ state: u, options: N, name: D, instance: d }) || u);
                }
              }
            }
          },
          update: D2(function () {
            return new Promise(function (g) {
              d.forceUpdate(), g(u);
            });
          }),
          destroy: function () {
            h(), (f = !0);
          },
        };
      if (!Cc(i, a)) return d;
      d.setOptions(l).then(function (g) {
        !f && l.onFirstUpdate && l.onFirstUpdate(g);
      });
      function p() {
        u.orderedModifiers.forEach(function (g) {
          var _ = g.name,
            m = g.options,
            w = m === void 0 ? {} : m,
            x = g.effect;
          if (typeof x == "function") {
            var E = x({ state: u, name: _, instance: d, options: w }),
              I = function () {};
            c.push(E || I);
          }
        });
      }
      function h() {
        c.forEach(function (g) {
          return g();
        }),
          (c = []);
      }
      return d;
    };
  }
  Rl();
  var H2 = [Kp, Zp, Wp, zp];
  Rl({ defaultModifiers: H2 });
  var U2 = [Kp, Zp, Wp, zp, A2, S2, M2, u2, T2],
    q2 = Rl({ defaultModifiers: U2 });
  const V2 = (e, t, n = {}) => {
    const r = {
        name: "updateState",
        enabled: !0,
        phase: "write",
        fn: ({ state: l }) => {
          const u = W2(l);
          Object.assign(i.value, u);
        },
        requires: ["computeStyles"],
      },
      o = M(() => {
        const {
          onFirstUpdate: l,
          placement: u,
          strategy: c,
          modifiers: f,
        } = y(n);
        return {
          onFirstUpdate: l,
          placement: u || "bottom",
          strategy: c || "absolute",
          modifiers: [...(f || []), r, { name: "applyStyles", enabled: !1 }],
        };
      }),
      s = $r(),
      i = re({
        styles: {
          popper: { position: y(o).strategy, left: "0", right: "0" },
          arrow: { position: "absolute" },
        },
        attributes: {},
      }),
      a = () => {
        s.value && (s.value.destroy(), (s.value = void 0));
      };
    return (
      xe(
        o,
        (l) => {
          const u = y(s);
          u && u.setOptions(l);
        },
        { deep: !0 }
      ),
      xe([e, t], ([l, u]) => {
        a(), !(!l || !u) && (s.value = q2(l, u, y(o)));
      }),
      bt(() => {
        a();
      }),
      {
        state: M(() => {
          var l;
          return { ...(((l = y(s)) == null ? void 0 : l.state) || {}) };
        }),
        styles: M(() => y(i).styles),
        attributes: M(() => y(i).attributes),
        update: () => {
          var l;
          return (l = y(s)) == null ? void 0 : l.update();
        },
        forceUpdate: () => {
          var l;
          return (l = y(s)) == null ? void 0 : l.forceUpdate();
        },
        instanceRef: M(() => y(s)),
      }
    );
  };
  function W2(e) {
    const t = Object.keys(e.elements),
      n = Rs(t.map((o) => [o, e.styles[o] || {}])),
      r = Rs(t.map((o) => [o, e.attributes[o]]));
    return { styles: n, attributes: r };
  }
  function K2() {
    let e;
    const t = (r, o) => {
        n(), (e = window.setTimeout(r, o));
      },
      n = () => window.clearTimeout(e);
    return ri(() => n()), { registerTimeout: t, cancelTimeout: n };
  }
  let wr = [];
  const Ac = (e) => {
      const t = e;
      t.key === pt.esc && wr.forEach((n) => n(t));
    },
    G2 = (e) => {
      Ge(() => {
        wr.length === 0 && document.addEventListener("keydown", Ac),
          ct && wr.push(e);
      }),
        bt(() => {
          (wr = wr.filter((t) => t !== e)),
            wr.length === 0 &&
              ct &&
              document.removeEventListener("keydown", Ac);
        });
    };
  let kc;
  const Yp = () => {
      const e = pr("namespace", xl),
        t = Lp(),
        n = M(() => `${e.value}-popper-container-${t.prefix}`),
        r = M(() => `#${n.value}`);
      return { id: n, selector: r };
    },
    J2 = (e) => {
      const t = document.createElement("div");
      return (t.id = e), document.body.appendChild(t), t;
    },
    Z2 = () => {
      _d(() => {
        if (!ct) return;
        const { id: e, selector: t } = Yp();
        !kc && !document.body.querySelector(t.value) && (kc = J2(e.value));
      });
    },
    Y2 = Je({
      showAfter: { type: Number, default: 0 },
      hideAfter: { type: Number, default: 200 },
    }),
    Q2 = ({ showAfter: e, hideAfter: t, open: n, close: r }) => {
      const { registerTimeout: o } = K2();
      return {
        onOpen: (a) => {
          o(() => {
            n(a);
          }, y(e));
        },
        onClose: (a) => {
          o(() => {
            r(a);
          }, y(t));
        },
      };
    },
    Qp = Symbol("elForwardRef"),
    X2 = (e) => {
      ot(Qp, {
        setForwardRef: (n) => {
          e.value = n;
        },
      });
    },
    eE = (e) => ({
      mounted(t) {
        e(t);
      },
      updated(t) {
        e(t);
      },
      unmounted() {
        e(null);
      },
    }),
    Pc = re(0),
    Ml = () => {
      const e = pr("zIndex", 2e3),
        t = M(() => e.value + Pc.value);
      return {
        initialZIndex: e,
        currentZIndex: t,
        nextZIndex: () => (Pc.value++, t.value),
      };
    };
  function tE(e) {
    const t = re();
    function n() {
      if (e.value == null) return;
      const { selectionStart: o, selectionEnd: s, value: i } = e.value;
      if (o == null || s == null) return;
      const a = i.slice(0, Math.max(0, o)),
        l = i.slice(Math.max(0, s));
      t.value = {
        selectionStart: o,
        selectionEnd: s,
        value: i,
        beforeTxt: a,
        afterTxt: l,
      };
    }
    function r() {
      if (e.value == null || t.value == null) return;
      const { value: o } = e.value,
        { beforeTxt: s, afterTxt: i, selectionStart: a } = t.value;
      if (s == null || i == null || a == null) return;
      let l = o.length;
      if (o.endsWith(i)) l = o.length - i.length;
      else if (o.startsWith(s)) l = s.length;
      else {
        const u = s[a - 1],
          c = o.indexOf(u, a - 1);
        c !== -1 && (l = c + 1);
      }
      e.value.setSelectionRange(l, l);
    }
    return [n, r];
  }
  var Ze = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [r, o] of t) n[r] = o;
    return n;
  };
  const nE = Je({
      size: { type: Se([Number, String]) },
      color: { type: String },
    }),
    rE = be({ name: "ElIcon", inheritAttrs: !1 }),
    oE = be({
      ...rE,
      props: nE,
      setup(e) {
        const t = e,
          n = De("icon"),
          r = M(() => {
            const { size: o, color: s } = t;
            return !o && !s
              ? {}
              : { fontSize: nw(o) ? void 0 : ca(o), "--color": s };
          });
        return (o, s) => (
          ee(),
          me(
            "i",
            en({ class: y(n).b(), style: y(r) }, o.$attrs),
            [Ae(o.$slots, "default")],
            16
          )
        );
      },
    });
  var sE = Ze(oE, [
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/icon/src/icon.vue",
    ],
  ]);
  const Dt = _n(sE);
  let Lt;
  const iE = `
  height:0 !important;
  visibility:hidden !important;
  ${Px() ? "" : "overflow:hidden !important;"}
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important;
`,
    aE = [
      "letter-spacing",
      "line-height",
      "padding-top",
      "padding-bottom",
      "font-family",
      "font-weight",
      "font-size",
      "text-rendering",
      "text-transform",
      "width",
      "text-indent",
      "padding-left",
      "padding-right",
      "border-width",
      "box-sizing",
    ];
  function lE(e) {
    const t = window.getComputedStyle(e),
      n = t.getPropertyValue("box-sizing"),
      r =
        Number.parseFloat(t.getPropertyValue("padding-bottom")) +
        Number.parseFloat(t.getPropertyValue("padding-top")),
      o =
        Number.parseFloat(t.getPropertyValue("border-bottom-width")) +
        Number.parseFloat(t.getPropertyValue("border-top-width"));
    return {
      contextStyle: aE.map((i) => `${i}:${t.getPropertyValue(i)}`).join(";"),
      paddingSize: r,
      borderSize: o,
      boxSizing: n,
    };
  }
  function Rc(e, t = 1, n) {
    var r;
    Lt ||
      ((Lt = document.createElement("textarea")),
      document.body.appendChild(Lt));
    const {
      paddingSize: o,
      borderSize: s,
      boxSizing: i,
      contextStyle: a,
    } = lE(e);
    Lt.setAttribute("style", `${a};${iE}`),
      (Lt.value = e.value || e.placeholder || "");
    let l = Lt.scrollHeight;
    const u = {};
    i === "border-box" ? (l = l + s) : i === "content-box" && (l = l - o),
      (Lt.value = "");
    const c = Lt.scrollHeight - o;
    if (Mr(t)) {
      let f = c * t;
      i === "border-box" && (f = f + o + s),
        (l = Math.max(f, l)),
        (u.minHeight = `${f}px`);
    }
    if (Mr(n)) {
      let f = c * n;
      i === "border-box" && (f = f + o + s), (l = Math.min(f, l));
    }
    return (
      (u.height = `${l}px`),
      (r = Lt.parentNode) == null || r.removeChild(Lt),
      (Lt = void 0),
      u
    );
  }
  const uE = Je({
      id: { type: String, default: void 0 },
      size: _l,
      disabled: Boolean,
      modelValue: { type: Se([String, Number, Object]), default: "" },
      type: { type: String, default: "text" },
      resize: {
        type: String,
        values: ["none", "both", "horizontal", "vertical"],
      },
      autosize: { type: Se([Boolean, Object]), default: !1 },
      autocomplete: { type: String, default: "off" },
      formatter: { type: Function },
      parser: { type: Function },
      placeholder: { type: String },
      form: { type: String },
      readonly: { type: Boolean, default: !1 },
      clearable: { type: Boolean, default: !1 },
      showPassword: { type: Boolean, default: !1 },
      showWordLimit: { type: Boolean, default: !1 },
      suffixIcon: { type: dn },
      prefixIcon: { type: dn },
      containerRole: { type: String, default: void 0 },
      label: { type: String, default: void 0 },
      tabindex: { type: [String, Number], default: 0 },
      validateEvent: { type: Boolean, default: !0 },
      inputStyle: { type: Se([Object, Array, String]), default: () => vl({}) },
    }),
    cE = {
      [fa]: (e) => Ee(e),
      input: (e) => Ee(e),
      change: (e) => Ee(e),
      focus: (e) => e instanceof FocusEvent,
      blur: (e) => e instanceof FocusEvent,
      clear: () => !0,
      mouseleave: (e) => e instanceof MouseEvent,
      mouseenter: (e) => e instanceof MouseEvent,
      keydown: (e) => e instanceof Event,
      compositionstart: (e) => e instanceof CompositionEvent,
      compositionupdate: (e) => e instanceof CompositionEvent,
      compositionend: (e) => e instanceof CompositionEvent,
    },
    fE = ["role"],
    dE = [
      "id",
      "type",
      "disabled",
      "formatter",
      "parser",
      "readonly",
      "autocomplete",
      "tabindex",
      "aria-label",
      "placeholder",
      "form",
    ],
    pE = [
      "id",
      "tabindex",
      "disabled",
      "readonly",
      "autocomplete",
      "aria-label",
      "placeholder",
      "form",
    ],
    hE = be({ name: "ElInput", inheritAttrs: !1 }),
    gE = be({
      ...hE,
      props: uE,
      emits: cE,
      setup(e, { expose: t, emit: n }) {
        const r = e,
          o = xv(),
          s = ol(),
          i = M(() => {
            const C = {};
            return (
              r.containerRole === "combobox" &&
                ((C["aria-haspopup"] = o["aria-haspopup"]),
                (C["aria-owns"] = o["aria-owns"]),
                (C["aria-expanded"] = o["aria-expanded"])),
              C
            );
          }),
          a = M(() => [
            r.type === "textarea" ? _.b() : g.b(),
            g.m(p.value),
            g.is("disabled", h.value),
            g.is("exceed", le.value),
            {
              [g.b("group")]: s.prepend || s.append,
              [g.bm("group", "append")]: s.append,
              [g.bm("group", "prepend")]: s.prepend,
              [g.m("prefix")]: s.prefix || r.prefixIcon,
              [g.m("suffix")]:
                s.suffix || r.suffixIcon || r.clearable || r.showPassword,
              [g.bm("suffix", "password-clear")]: k.value && G.value,
            },
            o.class,
          ]),
          l = M(() => [g.e("wrapper"), g.is("focus", x.value)]),
          u = Fx({ excludeKeys: M(() => Object.keys(i.value)) }),
          { form: c, formItem: f } = jp(),
          { inputId: d } = Dx(r, { formItemContext: f }),
          p = ii(),
          h = wl(),
          g = De("input"),
          _ = De("textarea"),
          m = $r(),
          w = $r(),
          x = re(!1),
          E = re(!1),
          I = re(!1),
          N = re(!1),
          D = re(),
          T = $r(r.inputStyle),
          H = M(() => m.value || w.value),
          S = M(() => {
            var C;
            return (C = c == null ? void 0 : c.statusIcon) != null ? C : !1;
          }),
          U = M(() => (f == null ? void 0 : f.validateState) || ""),
          $ = M(() => U.value && Ax[U.value]),
          F = M(() => (N.value ? wx : Gw)),
          L = M(() => [o.style, r.inputStyle]),
          O = M(() => [r.inputStyle, T.value, { resize: r.resize }]),
          z = M(() => (ti(r.modelValue) ? "" : String(r.modelValue))),
          k = M(
            () =>
              r.clearable &&
              !h.value &&
              !r.readonly &&
              !!z.value &&
              (x.value || E.value)
          ),
          G = M(
            () =>
              r.showPassword &&
              !h.value &&
              !r.readonly &&
              !!z.value &&
              (!!z.value || x.value)
          ),
          W = M(
            () =>
              r.showWordLimit &&
              !!u.value.maxlength &&
              (r.type === "text" || r.type === "textarea") &&
              !h.value &&
              !r.readonly &&
              !r.showPassword
          ),
          oe = M(() => Array.from(z.value).length),
          le = M(() => !!W.value && oe.value > Number(u.value.maxlength)),
          fe = M(
            () =>
              !!s.suffix ||
              !!r.suffixIcon ||
              k.value ||
              r.showPassword ||
              W.value ||
              (!!U.value && S.value)
          ),
          [Oe, Le] = tE(m);
        oi(w, (C) => {
          if (!W.value || r.resize !== "both") return;
          const Y = C[0],
            { width: ie } = Y.contentRect;
          D.value = { right: `calc(100% - ${ie + 15 + 6}px)` };
        });
        const P = () => {
            const { type: C, autosize: Y } = r;
            if (!(!ct || C !== "textarea" || !w.value))
              if (Y) {
                const ie = Me(Y) ? Y.minRows : void 0,
                  de = Me(Y) ? Y.maxRows : void 0;
                T.value = { ...Rc(w.value, ie, de) };
              } else T.value = { minHeight: Rc(w.value).minHeight };
          },
          Z = () => {
            const C = H.value;
            !C || C.value === z.value || (C.value = z.value);
          },
          A = async (C) => {
            Oe();
            let { value: Y } = C.target;
            if (
              (r.formatter &&
                ((Y = r.parser ? r.parser(Y) : Y), (Y = r.formatter(Y))),
              !I.value)
            ) {
              if (Y === z.value) {
                Z();
                return;
              }
              n(fa, Y), n("input", Y), await at(), Z(), Le();
            }
          },
          K = (C) => {
            n("change", C.target.value);
          },
          ne = (C) => {
            n("compositionstart", C), (I.value = !0);
          },
          ue = (C) => {
            var Y;
            n("compositionupdate", C);
            const ie = (Y = C.target) == null ? void 0 : Y.value,
              de = ie[ie.length - 1] || "";
            I.value = !Rx(de);
          },
          ae = (C) => {
            n("compositionend", C), I.value && ((I.value = !1), A(C));
          },
          v = () => {
            (N.value = !N.value), b();
          },
          b = async () => {
            var C;
            await at(), (C = H.value) == null || C.focus();
          },
          R = () => {
            var C;
            return (C = H.value) == null ? void 0 : C.blur();
          },
          j = (C) => {
            (x.value = !0), n("focus", C);
          },
          q = (C) => {
            var Y;
            (x.value = !1),
              n("blur", C),
              r.validateEvent &&
                ((Y = f == null ? void 0 : f.validate) == null ||
                  Y.call(f, "blur").catch((ie) => void 0));
          },
          Q = (C) => {
            (E.value = !1), n("mouseleave", C);
          },
          te = (C) => {
            (E.value = !0), n("mouseenter", C);
          },
          J = (C) => {
            n("keydown", C);
          },
          X = () => {
            var C;
            (C = H.value) == null || C.select();
          },
          V = () => {
            n(fa, ""), n("change", ""), n("clear"), n("input", "");
          };
        return (
          xe(
            () => r.modelValue,
            () => {
              var C;
              at(() => P()),
                r.validateEvent &&
                  ((C = f == null ? void 0 : f.validate) == null ||
                    C.call(f, "change").catch((Y) => void 0));
            }
          ),
          xe(z, () => Z()),
          xe(
            () => r.type,
            async () => {
              await at(), Z(), P();
            }
          ),
          Ge(() => {
            !r.formatter && r.parser, Z(), at(P);
          }),
          t({
            input: m,
            textarea: w,
            ref: H,
            textareaStyle: O,
            autosize: Xt(r, "autosize"),
            focus: b,
            blur: R,
            select: X,
            clear: V,
            resizeTextarea: P,
          }),
          (C, Y) =>
            ur(
              (ee(),
              me(
                "div",
                en(y(i), {
                  class: y(a),
                  style: y(L),
                  role: C.containerRole,
                  onMouseenter: te,
                  onMouseleave: Q,
                }),
                [
                  Ie(" input "),
                  C.type !== "textarea"
                    ? (ee(),
                      me(
                        We,
                        { key: 0 },
                        [
                          Ie(" prepend slot "),
                          C.$slots.prepend
                            ? (ee(),
                              me(
                                "div",
                                {
                                  key: 0,
                                  class: _e(y(g).be("group", "prepend")),
                                },
                                [Ae(C.$slots, "prepend")],
                                2
                              ))
                            : Ie("v-if", !0),
                          ye(
                            "div",
                            { class: _e(y(l)) },
                            [
                              Ie(" prefix slot "),
                              C.$slots.prefix || C.prefixIcon
                                ? (ee(),
                                  me(
                                    "span",
                                    { key: 0, class: _e(y(g).e("prefix")) },
                                    [
                                      ye(
                                        "span",
                                        {
                                          class: _e(y(g).e("prefix-inner")),
                                          onClick: b,
                                        },
                                        [
                                          Ae(C.$slots, "prefix"),
                                          C.prefixIcon
                                            ? (ee(),
                                              Ne(
                                                y(Dt),
                                                {
                                                  key: 0,
                                                  class: _e(y(g).e("icon")),
                                                },
                                                {
                                                  default: we(() => [
                                                    (ee(),
                                                    Ne(Pn(C.prefixIcon))),
                                                  ]),
                                                  _: 1,
                                                },
                                                8,
                                                ["class"]
                                              ))
                                            : Ie("v-if", !0),
                                        ],
                                        2
                                      ),
                                    ],
                                    2
                                  ))
                                : Ie("v-if", !0),
                              ye(
                                "input",
                                en(
                                  {
                                    id: y(d),
                                    ref_key: "input",
                                    ref: m,
                                    class: y(g).e("inner"),
                                  },
                                  y(u),
                                  {
                                    type: C.showPassword
                                      ? N.value
                                        ? "text"
                                        : "password"
                                      : C.type,
                                    disabled: y(h),
                                    formatter: C.formatter,
                                    parser: C.parser,
                                    readonly: C.readonly,
                                    autocomplete: C.autocomplete,
                                    tabindex: C.tabindex,
                                    "aria-label": C.label,
                                    placeholder: C.placeholder,
                                    style: C.inputStyle,
                                    form: r.form,
                                    onCompositionstart: ne,
                                    onCompositionupdate: ue,
                                    onCompositionend: ae,
                                    onInput: A,
                                    onFocus: j,
                                    onBlur: q,
                                    onChange: K,
                                    onKeydown: J,
                                  }
                                ),
                                null,
                                16,
                                dE
                              ),
                              Ie(" suffix slot "),
                              y(fe)
                                ? (ee(),
                                  me(
                                    "span",
                                    { key: 1, class: _e(y(g).e("suffix")) },
                                    [
                                      ye(
                                        "span",
                                        {
                                          class: _e(y(g).e("suffix-inner")),
                                          onClick: b,
                                        },
                                        [
                                          !y(k) || !y(G) || !y(W)
                                            ? (ee(),
                                              me(
                                                We,
                                                { key: 0 },
                                                [
                                                  Ae(C.$slots, "suffix"),
                                                  C.suffixIcon
                                                    ? (ee(),
                                                      Ne(
                                                        y(Dt),
                                                        {
                                                          key: 0,
                                                          class: _e(
                                                            y(g).e("icon")
                                                          ),
                                                        },
                                                        {
                                                          default: we(() => [
                                                            (ee(),
                                                            Ne(
                                                              Pn(C.suffixIcon)
                                                            )),
                                                          ]),
                                                          _: 1,
                                                        },
                                                        8,
                                                        ["class"]
                                                      ))
                                                    : Ie("v-if", !0),
                                                ],
                                                64
                                              ))
                                            : Ie("v-if", !0),
                                          y(k)
                                            ? (ee(),
                                              Ne(
                                                y(Dt),
                                                {
                                                  key: 1,
                                                  class: _e([
                                                    y(g).e("icon"),
                                                    y(g).e("clear"),
                                                  ]),
                                                  onMousedown: Vd(y(ut), [
                                                    "prevent",
                                                  ]),
                                                  onClick: V,
                                                },
                                                {
                                                  default: we(() => [
                                                    ve(y(Tp)),
                                                  ]),
                                                  _: 1,
                                                },
                                                8,
                                                ["class", "onMousedown"]
                                              ))
                                            : Ie("v-if", !0),
                                          y(G)
                                            ? (ee(),
                                              Ne(
                                                y(Dt),
                                                {
                                                  key: 2,
                                                  class: _e([
                                                    y(g).e("icon"),
                                                    y(g).e("password"),
                                                  ]),
                                                  onClick: v,
                                                },
                                                {
                                                  default: we(() => [
                                                    (ee(), Ne(Pn(y(F)))),
                                                  ]),
                                                  _: 1,
                                                },
                                                8,
                                                ["class"]
                                              ))
                                            : Ie("v-if", !0),
                                          y(W)
                                            ? (ee(),
                                              me(
                                                "span",
                                                {
                                                  key: 3,
                                                  class: _e(y(g).e("count")),
                                                },
                                                [
                                                  ye(
                                                    "span",
                                                    {
                                                      class: _e(
                                                        y(g).e("count-inner")
                                                      ),
                                                    },
                                                    lt(y(oe)) +
                                                      " / " +
                                                      lt(y(u).maxlength),
                                                    3
                                                  ),
                                                ],
                                                2
                                              ))
                                            : Ie("v-if", !0),
                                          y(U) && y($) && y(S)
                                            ? (ee(),
                                              Ne(
                                                y(Dt),
                                                {
                                                  key: 4,
                                                  class: _e([
                                                    y(g).e("icon"),
                                                    y(g).e("validateIcon"),
                                                    y(g).is(
                                                      "loading",
                                                      y(U) === "validating"
                                                    ),
                                                  ]),
                                                },
                                                {
                                                  default: we(() => [
                                                    (ee(), Ne(Pn(y($)))),
                                                  ]),
                                                  _: 1,
                                                },
                                                8,
                                                ["class"]
                                              ))
                                            : Ie("v-if", !0),
                                        ],
                                        2
                                      ),
                                    ],
                                    2
                                  ))
                                : Ie("v-if", !0),
                            ],
                            2
                          ),
                          Ie(" append slot "),
                          C.$slots.append
                            ? (ee(),
                              me(
                                "div",
                                {
                                  key: 1,
                                  class: _e(y(g).be("group", "append")),
                                },
                                [Ae(C.$slots, "append")],
                                2
                              ))
                            : Ie("v-if", !0),
                        ],
                        64
                      ))
                    : (ee(),
                      me(
                        We,
                        { key: 1 },
                        [
                          Ie(" textarea "),
                          ye(
                            "textarea",
                            en(
                              {
                                id: y(d),
                                ref_key: "textarea",
                                ref: w,
                                class: y(_).e("inner"),
                              },
                              y(u),
                              {
                                tabindex: C.tabindex,
                                disabled: y(h),
                                readonly: C.readonly,
                                autocomplete: C.autocomplete,
                                style: y(O),
                                "aria-label": C.label,
                                placeholder: C.placeholder,
                                form: r.form,
                                onCompositionstart: ne,
                                onCompositionupdate: ue,
                                onCompositionend: ae,
                                onInput: A,
                                onFocus: j,
                                onBlur: q,
                                onChange: K,
                                onKeydown: J,
                              }
                            ),
                            null,
                            16,
                            pE
                          ),
                          y(W)
                            ? (ee(),
                              me(
                                "span",
                                {
                                  key: 0,
                                  style: rn(D.value),
                                  class: _e(y(g).e("count")),
                                },
                                lt(y(oe)) + " / " + lt(y(u).maxlength),
                                7
                              ))
                            : Ie("v-if", !0),
                        ],
                        64
                      )),
                ],
                16,
                fE
              )),
              [[Kr, C.type !== "hidden"]]
            )
        );
      },
    });
  var mE = Ze(gE, [
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/input/src/input.vue",
    ],
  ]);
  const Xp = _n(mE),
    vE = [
      "dialog",
      "grid",
      "group",
      "listbox",
      "menu",
      "navigation",
      "tooltip",
      "tree",
    ],
    eh = Je({ role: { type: String, values: vE, default: "tooltip" } }),
    yE = be({ name: "ElPopper", inheritAttrs: !1 }),
    bE = be({
      ...yE,
      props: eh,
      setup(e, { expose: t }) {
        const n = e,
          r = re(),
          o = re(),
          s = re(),
          i = re(),
          a = M(() => n.role),
          l = {
            triggerRef: r,
            popperInstanceRef: o,
            contentRef: s,
            referenceRef: i,
            role: a,
          };
        return t(l), ot(yl, l), (u, c) => Ae(u.$slots, "default");
      },
    });
  var _E = Ze(bE, [
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/popper/src/popper.vue",
    ],
  ]);
  const th = Je({ arrowOffset: { type: Number, default: 5 } }),
    wE = be({ name: "ElPopperArrow", inheritAttrs: !1 }),
    xE = be({
      ...wE,
      props: th,
      setup(e, { expose: t }) {
        const n = e,
          r = De("popper"),
          { arrowOffset: o, arrowRef: s, arrowStyle: i } = Pe(Ip, void 0);
        return (
          xe(
            () => n.arrowOffset,
            (a) => {
              o.value = a;
            }
          ),
          bt(() => {
            s.value = void 0;
          }),
          t({ arrowRef: s }),
          (a, l) => (
            ee(),
            me(
              "span",
              {
                ref_key: "arrowRef",
                ref: s,
                class: _e(y(r).e("arrow")),
                style: rn(y(i)),
                "data-popper-arrow": "",
              },
              null,
              6
            )
          )
        );
      },
    });
  var EE = Ze(xE, [
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/popper/src/arrow.vue",
    ],
  ]);
  const SE = "ElOnlyChild",
    OE = be({
      name: SE,
      setup(e, { slots: t, attrs: n }) {
        var r;
        const o = Pe(Qp),
          s = eE((r = o == null ? void 0 : o.setForwardRef) != null ? r : ut);
        return () => {
          var i;
          const a = (i = t.default) == null ? void 0 : i.call(t, n);
          if (!a || a.length > 1) return null;
          const l = nh(a);
          return l ? ur(gn(l, n), [[s]]) : null;
        };
      },
    });
  function nh(e) {
    if (!e) return null;
    const t = e;
    for (const n of t) {
      if (Me(n))
        switch (n.type) {
          case $t:
            continue;
          case Wr:
          case "svg":
            return Mc(n);
          case We:
            return nh(n.children);
          default:
            return n;
        }
      return Mc(n);
    }
    return null;
  }
  function Mc(e) {
    const t = De("only-child");
    return ve("span", { class: t.e("content") }, [e]);
  }
  const rh = Je({
      virtualRef: { type: Se(Object) },
      virtualTriggering: Boolean,
      onMouseenter: { type: Se(Function) },
      onMouseleave: { type: Se(Function) },
      onClick: { type: Se(Function) },
      onKeydown: { type: Se(Function) },
      onFocus: { type: Se(Function) },
      onBlur: { type: Se(Function) },
      onContextmenu: { type: Se(Function) },
      id: String,
      open: Boolean,
    }),
    TE = be({ name: "ElPopperTrigger", inheritAttrs: !1 }),
    $E = be({
      ...TE,
      props: rh,
      setup(e, { expose: t }) {
        const n = e,
          { role: r, triggerRef: o } = Pe(yl, void 0);
        X2(o);
        const s = M(() => (a.value ? n.id : void 0)),
          i = M(() => {
            if (r && r.value === "tooltip")
              return n.open && n.id ? n.id : void 0;
          }),
          a = M(() => {
            if (r && r.value !== "tooltip") return r.value;
          }),
          l = M(() => (a.value ? `${n.open}` : void 0));
        let u;
        return (
          Ge(() => {
            xe(
              () => n.virtualRef,
              (c) => {
                c && (o.value = Rn(c));
              },
              { immediate: !0 }
            ),
              xe(
                o,
                (c, f) => {
                  u == null || u(),
                    (u = void 0),
                    Io(c) &&
                      ([
                        "onMouseenter",
                        "onMouseleave",
                        "onClick",
                        "onKeydown",
                        "onFocus",
                        "onBlur",
                        "onContextmenu",
                      ].forEach((d) => {
                        var p;
                        const h = n[d];
                        h &&
                          (c.addEventListener(d.slice(2).toLowerCase(), h),
                          (p = f == null ? void 0 : f.removeEventListener) ==
                            null || p.call(f, d.slice(2).toLowerCase(), h));
                      }),
                      (u = xe(
                        [s, i, a, l],
                        (d) => {
                          [
                            "aria-controls",
                            "aria-describedby",
                            "aria-haspopup",
                            "aria-expanded",
                          ].forEach((p, h) => {
                            ti(d[h])
                              ? c.removeAttribute(p)
                              : c.setAttribute(p, d[h]);
                          });
                        },
                        { immediate: !0 }
                      ))),
                    Io(f) &&
                      [
                        "aria-controls",
                        "aria-describedby",
                        "aria-haspopup",
                        "aria-expanded",
                      ].forEach((d) => f.removeAttribute(d));
                },
                { immediate: !0 }
              );
          }),
          bt(() => {
            u == null || u(), (u = void 0);
          }),
          t({ triggerRef: o }),
          (c, f) =>
            c.virtualTriggering
              ? Ie("v-if", !0)
              : (ee(),
                Ne(
                  y(OE),
                  en({ key: 0 }, c.$attrs, {
                    "aria-controls": y(s),
                    "aria-describedby": y(i),
                    "aria-expanded": y(l),
                    "aria-haspopup": y(a),
                  }),
                  { default: we(() => [Ae(c.$slots, "default")]), _: 3 },
                  16,
                  [
                    "aria-controls",
                    "aria-describedby",
                    "aria-expanded",
                    "aria-haspopup",
                  ]
                ))
        );
      },
    });
  var CE = Ze($E, [
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/popper/src/trigger.vue",
    ],
  ]);
  const Ci = "focus-trap.focus-after-trapped",
    Ai = "focus-trap.focus-after-released",
    AE = "focus-trap.focusout-prevented",
    Ic = { cancelable: !0, bubbles: !1 },
    kE = { cancelable: !0, bubbles: !1 },
    Fc = "focusAfterTrapped",
    Nc = "focusAfterReleased",
    PE = Symbol("elFocusTrap"),
    Il = re(),
    li = re(0),
    Fl = re(0);
  let rs = 0;
  const oh = (e) => {
      const t = [],
        n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
          acceptNode: (r) => {
            const o = r.tagName === "INPUT" && r.type === "hidden";
            return r.disabled || r.hidden || o
              ? NodeFilter.FILTER_SKIP
              : r.tabIndex >= 0 || r === document.activeElement
              ? NodeFilter.FILTER_ACCEPT
              : NodeFilter.FILTER_SKIP;
          },
        });
      for (; n.nextNode(); ) t.push(n.currentNode);
      return t;
    },
    Lc = (e, t) => {
      for (const n of e) if (!RE(n, t)) return n;
    },
    RE = (e, t) => {
      if (getComputedStyle(e).visibility === "hidden") return !0;
      for (; e; ) {
        if (t && e === t) return !1;
        if (getComputedStyle(e).display === "none") return !0;
        e = e.parentElement;
      }
      return !1;
    },
    ME = (e) => {
      const t = oh(e),
        n = Lc(t, e),
        r = Lc(t.reverse(), e);
      return [n, r];
    },
    IE = (e) => e instanceof HTMLInputElement && "select" in e,
    Cn = (e, t) => {
      if (e && e.focus) {
        const n = document.activeElement;
        e.focus({ preventScroll: !0 }),
          (Fl.value = window.performance.now()),
          e !== n && IE(e) && t && e.select();
      }
    };
  function jc(e, t) {
    const n = [...e],
      r = e.indexOf(t);
    return r !== -1 && n.splice(r, 1), n;
  }
  const FE = () => {
      let e = [];
      return {
        push: (r) => {
          const o = e[0];
          o && r !== o && o.pause(), (e = jc(e, r)), e.unshift(r);
        },
        remove: (r) => {
          var o, s;
          (e = jc(e, r)),
            (s = (o = e[0]) == null ? void 0 : o.resume) == null || s.call(o);
        },
      };
    },
    NE = (e, t = !1) => {
      const n = document.activeElement;
      for (const r of e) if ((Cn(r, t), document.activeElement !== n)) return;
    },
    Bc = FE(),
    LE = () => li.value > Fl.value,
    os = () => {
      (Il.value = "pointer"), (li.value = window.performance.now());
    },
    Dc = () => {
      (Il.value = "keyboard"), (li.value = window.performance.now());
    },
    jE = () => (
      Ge(() => {
        rs === 0 &&
          (document.addEventListener("mousedown", os),
          document.addEventListener("touchstart", os),
          document.addEventListener("keydown", Dc)),
          rs++;
      }),
      bt(() => {
        rs--,
          rs <= 0 &&
            (document.removeEventListener("mousedown", os),
            document.removeEventListener("touchstart", os),
            document.removeEventListener("keydown", Dc));
      }),
      {
        focusReason: Il,
        lastUserFocusTimestamp: li,
        lastAutomatedFocusTimestamp: Fl,
      }
    ),
    ss = (e) => new CustomEvent(AE, { ...kE, detail: e }),
    BE = be({
      name: "ElFocusTrap",
      inheritAttrs: !1,
      props: {
        loop: Boolean,
        trapped: Boolean,
        focusTrapEl: Object,
        focusStartEl: { type: [Object, String], default: "first" },
      },
      emits: [
        Fc,
        Nc,
        "focusin",
        "focusout",
        "focusout-prevented",
        "release-requested",
      ],
      setup(e, { emit: t }) {
        const n = re();
        let r, o;
        const { focusReason: s } = jE();
        G2((h) => {
          e.trapped && !i.paused && t("release-requested", h);
        });
        const i = {
            paused: !1,
            pause() {
              this.paused = !0;
            },
            resume() {
              this.paused = !1;
            },
          },
          a = (h) => {
            if ((!e.loop && !e.trapped) || i.paused) return;
            const {
                key: g,
                altKey: _,
                ctrlKey: m,
                metaKey: w,
                currentTarget: x,
                shiftKey: E,
              } = h,
              { loop: I } = e,
              N = g === pt.tab && !_ && !m && !w,
              D = document.activeElement;
            if (N && D) {
              const T = x,
                [H, S] = ME(T);
              if (H && S) {
                if (!E && D === S) {
                  const $ = ss({ focusReason: s.value });
                  t("focusout-prevented", $),
                    $.defaultPrevented || (h.preventDefault(), I && Cn(H, !0));
                } else if (E && [H, T].includes(D)) {
                  const $ = ss({ focusReason: s.value });
                  t("focusout-prevented", $),
                    $.defaultPrevented || (h.preventDefault(), I && Cn(S, !0));
                }
              } else if (D === T) {
                const $ = ss({ focusReason: s.value });
                t("focusout-prevented", $),
                  $.defaultPrevented || h.preventDefault();
              }
            }
          };
        ot(PE, { focusTrapRef: n, onKeydown: a }),
          xe(
            () => e.focusTrapEl,
            (h) => {
              h && (n.value = h);
            },
            { immediate: !0 }
          ),
          xe([n], ([h], [g]) => {
            h &&
              (h.addEventListener("keydown", a),
              h.addEventListener("focusin", c),
              h.addEventListener("focusout", f)),
              g &&
                (g.removeEventListener("keydown", a),
                g.removeEventListener("focusin", c),
                g.removeEventListener("focusout", f));
          });
        const l = (h) => {
            t(Fc, h);
          },
          u = (h) => t(Nc, h),
          c = (h) => {
            const g = y(n);
            if (!g) return;
            const _ = h.target,
              m = h.relatedTarget,
              w = _ && g.contains(_);
            e.trapped || (m && g.contains(m)) || (r = m),
              w && t("focusin", h),
              !i.paused && e.trapped && (w ? (o = _) : Cn(o, !0));
          },
          f = (h) => {
            const g = y(n);
            if (!(i.paused || !g))
              if (e.trapped) {
                const _ = h.relatedTarget;
                !ti(_) &&
                  !g.contains(_) &&
                  setTimeout(() => {
                    if (!i.paused && e.trapped) {
                      const m = ss({ focusReason: s.value });
                      t("focusout-prevented", m),
                        m.defaultPrevented || Cn(o, !0);
                    }
                  }, 0);
              } else {
                const _ = h.target;
                (_ && g.contains(_)) || t("focusout", h);
              }
          };
        async function d() {
          await at();
          const h = y(n);
          if (h) {
            Bc.push(i);
            const g = h.contains(document.activeElement)
              ? r
              : document.activeElement;
            if (((r = g), !h.contains(g))) {
              const m = new Event(Ci, Ic);
              h.addEventListener(Ci, l),
                h.dispatchEvent(m),
                m.defaultPrevented ||
                  at(() => {
                    let w = e.focusStartEl;
                    Ee(w) ||
                      (Cn(w), document.activeElement !== w && (w = "first")),
                      w === "first" && NE(oh(h), !0),
                      (document.activeElement === g || w === "container") &&
                        Cn(h);
                  });
            }
          }
        }
        function p() {
          const h = y(n);
          if (h) {
            h.removeEventListener(Ci, l);
            const g = new CustomEvent(Ai, {
              ...Ic,
              detail: { focusReason: s.value },
            });
            h.addEventListener(Ai, u),
              h.dispatchEvent(g),
              !g.defaultPrevented &&
                (s.value == "keyboard" ||
                  !LE() ||
                  h.contains(document.activeElement)) &&
                Cn(r ?? document.body),
              h.removeEventListener(Ai, l),
              Bc.remove(i);
          }
        }
        return (
          Ge(() => {
            e.trapped && d(),
              xe(
                () => e.trapped,
                (h) => {
                  h ? d() : p();
                }
              );
          }),
          bt(() => {
            e.trapped && p();
          }),
          { onKeydown: a }
        );
      },
    });
  function DE(e, t, n, r, o, s) {
    return Ae(e.$slots, "default", { handleKeydown: e.onKeydown });
  }
  var zE = Ze(BE, [
    ["render", DE],
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/focus-trap/src/focus-trap.vue",
    ],
  ]);
  const HE = ["fixed", "absolute"],
    UE = Je({
      boundariesPadding: { type: Number, default: 0 },
      fallbackPlacements: { type: Se(Array), default: void 0 },
      gpuAcceleration: { type: Boolean, default: !0 },
      offset: { type: Number, default: 12 },
      placement: { type: String, values: Ol, default: "bottom" },
      popperOptions: { type: Se(Object), default: () => ({}) },
      strategy: { type: String, values: HE, default: "absolute" },
    }),
    sh = Je({
      ...UE,
      id: String,
      style: { type: Se([String, Array, Object]) },
      className: { type: Se([String, Array, Object]) },
      effect: { type: String, default: "dark" },
      visible: Boolean,
      enterable: { type: Boolean, default: !0 },
      pure: Boolean,
      focusOnShow: { type: Boolean, default: !1 },
      trapping: { type: Boolean, default: !1 },
      popperClass: { type: Se([String, Array, Object]) },
      popperStyle: { type: Se([String, Array, Object]) },
      referenceEl: { type: Se(Object) },
      triggerTargetEl: { type: Se(Object) },
      stopPopperMouseEvent: { type: Boolean, default: !0 },
      ariaLabel: { type: String, default: void 0 },
      virtualTriggering: Boolean,
      zIndex: Number,
    }),
    qE = {
      mouseenter: (e) => e instanceof MouseEvent,
      mouseleave: (e) => e instanceof MouseEvent,
      focus: () => !0,
      blur: () => !0,
      close: () => !0,
    },
    VE = (e, t = []) => {
      const { placement: n, strategy: r, popperOptions: o } = e,
        s = { placement: n, strategy: r, ...o, modifiers: [...KE(e), ...t] };
      return GE(s, o == null ? void 0 : o.modifiers), s;
    },
    WE = (e) => {
      if (ct) return Rn(e);
    };
  function KE(e) {
    const { offset: t, gpuAcceleration: n, fallbackPlacements: r } = e;
    return [
      { name: "offset", options: { offset: [0, t ?? 12] } },
      {
        name: "preventOverflow",
        options: { padding: { top: 2, bottom: 2, left: 5, right: 5 } },
      },
      { name: "flip", options: { padding: 5, fallbackPlacements: r } },
      { name: "computeStyles", options: { gpuAcceleration: n } },
    ];
  }
  function GE(e, t) {
    t && (e.modifiers = [...e.modifiers, ...(t ?? [])]);
  }
  const JE = 0,
    ZE = (e) => {
      const {
          popperInstanceRef: t,
          contentRef: n,
          triggerRef: r,
          role: o,
        } = Pe(yl, void 0),
        s = re(),
        i = re(),
        a = M(() => ({ name: "eventListeners", enabled: !!e.visible })),
        l = M(() => {
          var m;
          const w = y(s),
            x = (m = y(i)) != null ? m : JE;
          return {
            name: "arrow",
            enabled: !m1(w),
            options: { element: w, padding: x },
          };
        }),
        u = M(() => ({
          onFirstUpdate: () => {
            h();
          },
          ...VE(e, [y(l), y(a)]),
        })),
        c = M(() => WE(e.referenceEl) || y(r)),
        {
          attributes: f,
          state: d,
          styles: p,
          update: h,
          forceUpdate: g,
          instanceRef: _,
        } = V2(c, n, u);
      return (
        xe(_, (m) => (t.value = m)),
        Ge(() => {
          xe(
            () => {
              var m;
              return (m = y(c)) == null ? void 0 : m.getBoundingClientRect();
            },
            () => {
              h();
            }
          );
        }),
        {
          attributes: f,
          arrowRef: s,
          contentRef: n,
          instanceRef: _,
          state: d,
          styles: p,
          role: o,
          forceUpdate: g,
          update: h,
        }
      );
    },
    YE = (e, { attributes: t, styles: n, role: r }) => {
      const { nextZIndex: o } = Ml(),
        s = De("popper"),
        i = M(() => y(t).popper),
        a = re(e.zIndex || o()),
        l = M(() => [
          s.b(),
          s.is("pure", e.pure),
          s.is(e.effect),
          e.popperClass,
        ]),
        u = M(() => [{ zIndex: y(a) }, e.popperStyle || {}, y(n).popper]),
        c = M(() => (r.value === "dialog" ? "false" : void 0)),
        f = M(() => y(n).arrow || {});
      return {
        ariaModal: c,
        arrowStyle: f,
        contentAttrs: i,
        contentClass: l,
        contentStyle: u,
        contentZIndex: a,
        updateZIndex: () => {
          a.value = e.zIndex || o();
        },
      };
    },
    QE = (e, t) => {
      const n = re(!1),
        r = re();
      return {
        focusStartRef: r,
        trapped: n,
        onFocusAfterReleased: (u) => {
          var c;
          ((c = u.detail) == null ? void 0 : c.focusReason) !== "pointer" &&
            ((r.value = "first"), t("blur"));
        },
        onFocusAfterTrapped: () => {
          t("focus");
        },
        onFocusInTrap: (u) => {
          e.visible &&
            !n.value &&
            (u.target && (r.value = u.target), (n.value = !0));
        },
        onFocusoutPrevented: (u) => {
          e.trapping ||
            (u.detail.focusReason === "pointer" && u.preventDefault(),
            (n.value = !1));
        },
        onReleaseRequested: () => {
          (n.value = !1), t("close");
        },
      };
    },
    XE = be({ name: "ElPopperContent" }),
    eS = be({
      ...XE,
      props: sh,
      emits: qE,
      setup(e, { expose: t, emit: n }) {
        const r = e,
          {
            focusStartRef: o,
            trapped: s,
            onFocusAfterReleased: i,
            onFocusAfterTrapped: a,
            onFocusInTrap: l,
            onFocusoutPrevented: u,
            onReleaseRequested: c,
          } = QE(r, n),
          {
            attributes: f,
            arrowRef: d,
            contentRef: p,
            styles: h,
            instanceRef: g,
            role: _,
            update: m,
          } = ZE(r),
          {
            ariaModal: w,
            arrowStyle: x,
            contentAttrs: E,
            contentClass: I,
            contentStyle: N,
            updateZIndex: D,
          } = YE(r, { styles: h, attributes: f, role: _ }),
          T = Pe(ar, void 0),
          H = re();
        ot(Ip, { arrowStyle: x, arrowRef: d, arrowOffset: H }),
          T &&
            (T.addInputId || T.removeInputId) &&
            ot(ar, { ...T, addInputId: ut, removeInputId: ut });
        let S;
        const U = (F = !0) => {
            m(), F && D();
          },
          $ = () => {
            U(!1),
              r.visible && r.focusOnShow
                ? (s.value = !0)
                : r.visible === !1 && (s.value = !1);
          };
        return (
          Ge(() => {
            xe(
              () => r.triggerTargetEl,
              (F, L) => {
                S == null || S(), (S = void 0);
                const O = y(F || p.value),
                  z = y(L || p.value);
                Io(O) &&
                  (S = xe(
                    [_, () => r.ariaLabel, w, () => r.id],
                    (k) => {
                      ["role", "aria-label", "aria-modal", "id"].forEach(
                        (G, W) => {
                          ti(k[W])
                            ? O.removeAttribute(G)
                            : O.setAttribute(G, k[W]);
                        }
                      );
                    },
                    { immediate: !0 }
                  )),
                  z !== O &&
                    Io(z) &&
                    ["role", "aria-label", "aria-modal", "id"].forEach((k) => {
                      z.removeAttribute(k);
                    });
              },
              { immediate: !0 }
            ),
              xe(() => r.visible, $, { immediate: !0 });
          }),
          bt(() => {
            S == null || S(), (S = void 0);
          }),
          t({
            popperContentRef: p,
            popperInstanceRef: g,
            updatePopper: U,
            contentStyle: N,
          }),
          (F, L) => (
            ee(),
            me(
              "div",
              en({ ref_key: "contentRef", ref: p }, y(E), {
                style: y(N),
                class: y(I),
                tabindex: "-1",
                onMouseenter: L[0] || (L[0] = (O) => F.$emit("mouseenter", O)),
                onMouseleave: L[1] || (L[1] = (O) => F.$emit("mouseleave", O)),
              }),
              [
                ve(
                  y(zE),
                  {
                    trapped: y(s),
                    "trap-on-focus-in": !0,
                    "focus-trap-el": y(p),
                    "focus-start-el": y(o),
                    onFocusAfterTrapped: y(a),
                    onFocusAfterReleased: y(i),
                    onFocusin: y(l),
                    onFocusoutPrevented: y(u),
                    onReleaseRequested: y(c),
                  },
                  { default: we(() => [Ae(F.$slots, "default")]), _: 3 },
                  8,
                  [
                    "trapped",
                    "focus-trap-el",
                    "focus-start-el",
                    "onFocusAfterTrapped",
                    "onFocusAfterReleased",
                    "onFocusin",
                    "onFocusoutPrevented",
                    "onReleaseRequested",
                  ]
                ),
              ],
              16
            )
          )
        );
      },
    });
  var tS = Ze(eS, [
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/popper/src/content.vue",
    ],
  ]);
  const nS = _n(_E),
    rS = De("tooltip"),
    ih = Je({
      ...Y2,
      ...sh,
      appendTo: { type: Se([String, Object]) },
      content: { type: String, default: "" },
      rawContent: { type: Boolean, default: !1 },
      persistent: Boolean,
      ariaLabel: String,
      visible: { type: Se(Boolean), default: null },
      transition: {
        type: String,
        default: `${rS.namespace.value}-fade-in-linear`,
      },
      teleported: { type: Boolean, default: !0 },
      disabled: { type: Boolean },
    }),
    ah = Je({
      ...rh,
      disabled: Boolean,
      trigger: { type: Se([String, Array]), default: "hover" },
      triggerKeys: { type: Se(Array), default: () => [pt.enter, pt.space] },
    }),
    {
      useModelToggleProps: oS,
      useModelToggleEmits: sS,
      useModelToggle: iS,
    } = Bp("visible"),
    aS = Je({
      ...eh,
      ...oS,
      ...ih,
      ...ah,
      ...th,
      showArrow: { type: Boolean, default: !0 },
    }),
    lS = [...sS, "before-show", "before-hide", "show", "hide", "open", "close"],
    uS = (e, t) => (pe(e) ? e.includes(t) : e === t),
    mr = (e, t, n) => (r) => {
      uS(y(e), t) && n(r);
    },
    cS = be({ name: "ElTooltipTrigger" }),
    fS = be({
      ...cS,
      props: ah,
      setup(e, { expose: t }) {
        const n = e,
          r = De("tooltip"),
          {
            controlled: o,
            id: s,
            open: i,
            onOpen: a,
            onClose: l,
            onToggle: u,
          } = Pe(bl, void 0),
          c = re(null),
          f = () => {
            if (y(o) || n.disabled) return !0;
          },
          d = Xt(n, "trigger"),
          p = fn(f, mr(d, "hover", a)),
          h = fn(f, mr(d, "hover", l)),
          g = fn(
            f,
            mr(d, "click", (E) => {
              E.button === 0 && u(E);
            })
          ),
          _ = fn(f, mr(d, "focus", a)),
          m = fn(f, mr(d, "focus", l)),
          w = fn(
            f,
            mr(d, "contextmenu", (E) => {
              E.preventDefault(), u(E);
            })
          ),
          x = fn(f, (E) => {
            const { code: I } = E;
            n.triggerKeys.includes(I) && (E.preventDefault(), u(E));
          });
        return (
          t({ triggerRef: c }),
          (E, I) => (
            ee(),
            Ne(
              y(CE),
              {
                id: y(s),
                "virtual-ref": E.virtualRef,
                open: y(i),
                "virtual-triggering": E.virtualTriggering,
                class: _e(y(r).e("trigger")),
                onBlur: y(m),
                onClick: y(g),
                onContextmenu: y(w),
                onFocus: y(_),
                onMouseenter: y(p),
                onMouseleave: y(h),
                onKeydown: y(x),
              },
              { default: we(() => [Ae(E.$slots, "default")]), _: 3 },
              8,
              [
                "id",
                "virtual-ref",
                "open",
                "virtual-triggering",
                "class",
                "onBlur",
                "onClick",
                "onContextmenu",
                "onFocus",
                "onMouseenter",
                "onMouseleave",
                "onKeydown",
              ]
            )
          )
        );
      },
    });
  var dS = Ze(fS, [
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/tooltip/src/trigger.vue",
    ],
  ]);
  const pS = be({ name: "ElTooltipContent", inheritAttrs: !1 }),
    hS = be({
      ...pS,
      props: ih,
      setup(e, { expose: t }) {
        const n = e,
          { selector: r } = Yp(),
          o = re(null),
          s = re(!1),
          {
            controlled: i,
            id: a,
            open: l,
            trigger: u,
            onClose: c,
            onOpen: f,
            onShow: d,
            onHide: p,
            onBeforeShow: h,
            onBeforeHide: g,
          } = Pe(bl, void 0),
          _ = M(() => n.persistent);
        bt(() => {
          s.value = !0;
        });
        const m = M(() => (y(_) ? !0 : y(l))),
          w = M(() => (n.disabled ? !1 : y(l))),
          x = M(() => n.appendTo || r.value),
          E = M(() => {
            var O;
            return (O = n.style) != null ? O : {};
          }),
          I = M(() => !y(l)),
          N = () => {
            p();
          },
          D = () => {
            if (y(i)) return !0;
          },
          T = fn(D, () => {
            n.enterable && y(u) === "hover" && f();
          }),
          H = fn(D, () => {
            y(u) === "hover" && c();
          }),
          S = () => {
            var O, z;
            (z = (O = o.value) == null ? void 0 : O.updatePopper) == null ||
              z.call(O),
              h == null || h();
          },
          U = () => {
            g == null || g();
          },
          $ = () => {
            d(),
              (L = B1(
                M(() => {
                  var O;
                  return (O = o.value) == null ? void 0 : O.popperContentRef;
                }),
                () => {
                  if (y(i)) return;
                  y(u) !== "hover" && c();
                }
              ));
          },
          F = () => {
            n.virtualTriggering || c();
          };
        let L;
        return (
          xe(
            () => y(l),
            (O) => {
              O || L == null || L();
            },
            { flush: "post" }
          ),
          xe(
            () => n.content,
            () => {
              var O, z;
              (z = (O = o.value) == null ? void 0 : O.updatePopper) == null ||
                z.call(O);
            }
          ),
          t({ contentRef: o }),
          (O, z) => (
            ee(),
            Ne(
              cv,
              { disabled: !O.teleported, to: y(x) },
              [
                ve(
                  Dn,
                  {
                    name: O.transition,
                    onAfterLeave: N,
                    onBeforeEnter: S,
                    onAfterEnter: $,
                    onBeforeLeave: U,
                  },
                  {
                    default: we(() => [
                      y(m)
                        ? ur(
                            (ee(),
                            Ne(
                              y(tS),
                              en(
                                {
                                  key: 0,
                                  id: y(a),
                                  ref_key: "contentRef",
                                  ref: o,
                                },
                                O.$attrs,
                                {
                                  "aria-label": O.ariaLabel,
                                  "aria-hidden": y(I),
                                  "boundaries-padding": O.boundariesPadding,
                                  "fallback-placements": O.fallbackPlacements,
                                  "gpu-acceleration": O.gpuAcceleration,
                                  offset: O.offset,
                                  placement: O.placement,
                                  "popper-options": O.popperOptions,
                                  strategy: O.strategy,
                                  effect: O.effect,
                                  enterable: O.enterable,
                                  pure: O.pure,
                                  "popper-class": O.popperClass,
                                  "popper-style": [O.popperStyle, y(E)],
                                  "reference-el": O.referenceEl,
                                  "trigger-target-el": O.triggerTargetEl,
                                  visible: y(w),
                                  "z-index": O.zIndex,
                                  onMouseenter: y(T),
                                  onMouseleave: y(H),
                                  onBlur: F,
                                  onClose: y(c),
                                }
                              ),
                              {
                                default: we(() => [
                                  s.value
                                    ? Ie("v-if", !0)
                                    : Ae(O.$slots, "default", { key: 0 }),
                                ]),
                                _: 3,
                              },
                              16,
                              [
                                "id",
                                "aria-label",
                                "aria-hidden",
                                "boundaries-padding",
                                "fallback-placements",
                                "gpu-acceleration",
                                "offset",
                                "placement",
                                "popper-options",
                                "strategy",
                                "effect",
                                "enterable",
                                "pure",
                                "popper-class",
                                "popper-style",
                                "reference-el",
                                "trigger-target-el",
                                "visible",
                                "z-index",
                                "onMouseenter",
                                "onMouseleave",
                                "onClose",
                              ]
                            )),
                            [[Kr, y(w)]]
                          )
                        : Ie("v-if", !0),
                    ]),
                    _: 3,
                  },
                  8,
                  ["name"]
                ),
              ],
              8,
              ["disabled", "to"]
            )
          )
        );
      },
    });
  var gS = Ze(hS, [
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/tooltip/src/content.vue",
    ],
  ]);
  const mS = ["innerHTML"],
    vS = { key: 1 },
    yS = be({ name: "ElTooltip" }),
    bS = be({
      ...yS,
      props: aS,
      emits: lS,
      setup(e, { expose: t, emit: n }) {
        const r = e;
        Z2();
        const o = El(),
          s = re(),
          i = re(),
          a = () => {
            var m;
            const w = y(s);
            w && ((m = w.popperInstanceRef) == null || m.update());
          },
          l = re(!1),
          u = re(),
          {
            show: c,
            hide: f,
            hasUpdateHandler: d,
          } = iS({ indicator: l, toggleReason: u }),
          { onOpen: p, onClose: h } = Q2({
            showAfter: Xt(r, "showAfter"),
            hideAfter: Xt(r, "hideAfter"),
            open: c,
            close: f,
          }),
          g = M(() => ni(r.visible) && !d.value);
        ot(bl, {
          controlled: g,
          id: o,
          open: zo(l),
          trigger: Xt(r, "trigger"),
          onOpen: (m) => {
            p(m);
          },
          onClose: (m) => {
            h(m);
          },
          onToggle: (m) => {
            y(l) ? h(m) : p(m);
          },
          onShow: () => {
            n("show", u.value);
          },
          onHide: () => {
            n("hide", u.value);
          },
          onBeforeShow: () => {
            n("before-show", u.value);
          },
          onBeforeHide: () => {
            n("before-hide", u.value);
          },
          updatePopper: a,
        }),
          xe(
            () => r.disabled,
            (m) => {
              m && l.value && (l.value = !1);
            }
          );
        const _ = () => {
          var m, w;
          const x =
            (w = (m = i.value) == null ? void 0 : m.contentRef) == null
              ? void 0
              : w.popperContentRef;
          return x && x.contains(document.activeElement);
        };
        return (
          yd(() => l.value && f()),
          t({
            popperRef: s,
            contentRef: i,
            isFocusInsideContent: _,
            updatePopper: a,
            onOpen: p,
            onClose: h,
            hide: f,
          }),
          (m, w) => (
            ee(),
            Ne(
              y(nS),
              { ref_key: "popperRef", ref: s, role: m.role },
              {
                default: we(() => [
                  ve(
                    dS,
                    {
                      disabled: m.disabled,
                      trigger: m.trigger,
                      "trigger-keys": m.triggerKeys,
                      "virtual-ref": m.virtualRef,
                      "virtual-triggering": m.virtualTriggering,
                    },
                    {
                      default: we(() => [
                        m.$slots.default
                          ? Ae(m.$slots, "default", { key: 0 })
                          : Ie("v-if", !0),
                      ]),
                      _: 3,
                    },
                    8,
                    [
                      "disabled",
                      "trigger",
                      "trigger-keys",
                      "virtual-ref",
                      "virtual-triggering",
                    ]
                  ),
                  ve(
                    gS,
                    {
                      ref_key: "contentRef",
                      ref: i,
                      "aria-label": m.ariaLabel,
                      "boundaries-padding": m.boundariesPadding,
                      content: m.content,
                      disabled: m.disabled,
                      effect: m.effect,
                      enterable: m.enterable,
                      "fallback-placements": m.fallbackPlacements,
                      "hide-after": m.hideAfter,
                      "gpu-acceleration": m.gpuAcceleration,
                      offset: m.offset,
                      persistent: m.persistent,
                      "popper-class": m.popperClass,
                      "popper-style": m.popperStyle,
                      placement: m.placement,
                      "popper-options": m.popperOptions,
                      pure: m.pure,
                      "raw-content": m.rawContent,
                      "reference-el": m.referenceEl,
                      "trigger-target-el": m.triggerTargetEl,
                      "show-after": m.showAfter,
                      strategy: m.strategy,
                      teleported: m.teleported,
                      transition: m.transition,
                      "virtual-triggering": m.virtualTriggering,
                      "z-index": m.zIndex,
                      "append-to": m.appendTo,
                    },
                    {
                      default: we(() => [
                        Ae(m.$slots, "content", {}, () => [
                          m.rawContent
                            ? (ee(),
                              me(
                                "span",
                                { key: 0, innerHTML: m.content },
                                null,
                                8,
                                mS
                              ))
                            : (ee(), me("span", vS, lt(m.content), 1)),
                        ]),
                        m.showArrow
                          ? (ee(),
                            Ne(
                              y(EE),
                              { key: 0, "arrow-offset": m.arrowOffset },
                              null,
                              8,
                              ["arrow-offset"]
                            ))
                          : Ie("v-if", !0),
                      ]),
                      _: 3,
                    },
                    8,
                    [
                      "aria-label",
                      "boundaries-padding",
                      "content",
                      "disabled",
                      "effect",
                      "enterable",
                      "fallback-placements",
                      "hide-after",
                      "gpu-acceleration",
                      "offset",
                      "persistent",
                      "popper-class",
                      "popper-style",
                      "placement",
                      "popper-options",
                      "pure",
                      "raw-content",
                      "reference-el",
                      "trigger-target-el",
                      "show-after",
                      "strategy",
                      "teleported",
                      "transition",
                      "virtual-triggering",
                      "z-index",
                      "append-to",
                    ]
                  ),
                ]),
                _: 3,
              },
              8,
              ["role"]
            )
          )
        );
      },
    });
  var _S = Ze(bS, [
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/tooltip/src/tooltip.vue",
    ],
  ]);
  const lh = _n(_S),
    wS = Je({
      value: { type: [String, Number], default: "" },
      max: { type: Number, default: 99 },
      isDot: Boolean,
      hidden: Boolean,
      type: {
        type: String,
        values: ["primary", "success", "warning", "info", "danger"],
        default: "danger",
      },
    }),
    xS = ["textContent"],
    ES = be({ name: "ElBadge" }),
    SS = be({
      ...ES,
      props: wS,
      setup(e, { expose: t }) {
        const n = e,
          r = De("badge"),
          o = M(() =>
            n.isDot
              ? ""
              : Mr(n.value) && Mr(n.max)
              ? n.max < n.value
                ? `${n.max}+`
                : `${n.value}`
              : `${n.value}`
          );
        return (
          t({ content: o }),
          (s, i) => (
            ee(),
            me(
              "div",
              { class: _e(y(r).b()) },
              [
                Ae(s.$slots, "default"),
                ve(
                  Dn,
                  {
                    name: `${y(r).namespace.value}-zoom-in-center`,
                    persisted: "",
                  },
                  {
                    default: we(() => [
                      ur(
                        ye(
                          "sup",
                          {
                            class: _e([
                              y(r).e("content"),
                              y(r).em("content", s.type),
                              y(r).is("fixed", !!s.$slots.default),
                              y(r).is("dot", s.isDot),
                            ]),
                            textContent: lt(y(o)),
                          },
                          null,
                          10,
                          xS
                        ),
                        [[Kr, !s.hidden && (y(o) || s.isDot)]]
                      ),
                    ]),
                    _: 1,
                  },
                  8,
                  ["name"]
                ),
              ],
              2
            )
          )
        );
      },
    });
  var OS = Ze(SS, [
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/badge/src/badge.vue",
    ],
  ]);
  const TS = _n(OS),
    $S = (e, t) => {
      Np(
        {
          from: "type.text",
          replacement: "link",
          version: "3.0.0",
          scope: "props",
          ref: "https://element-plus.org/en-US/component/button.html#button-attributes",
        },
        M(() => e.type === "text")
      );
      const n = Pe(Rp, void 0),
        r = pr("button"),
        { form: o } = jp(),
        s = ii(M(() => (n == null ? void 0 : n.size))),
        i = wl(),
        a = re(),
        l = ol(),
        u = M(() => e.type || (n == null ? void 0 : n.type) || ""),
        c = M(() => {
          var p, h, g;
          return (g =
            (h = e.autoInsertSpace) != null
              ? h
              : (p = r.value) == null
              ? void 0
              : p.autoInsertSpace) != null
            ? g
            : !1;
        }),
        f = M(() => {
          var p;
          const h = (p = l.default) == null ? void 0 : p.call(l);
          if (c.value && (h == null ? void 0 : h.length) === 1) {
            const g = h[0];
            if ((g == null ? void 0 : g.type) === Wr) {
              const _ = g.children;
              return /^\p{Unified_Ideograph}{2}$/u.test(_.trim());
            }
          }
          return !1;
        });
      return {
        _disabled: i,
        _size: s,
        _type: u,
        _ref: a,
        shouldAddSpace: f,
        handleClick: (p) => {
          e.nativeType === "reset" && (o == null || o.resetFields()),
            t("click", p);
        },
      };
    },
    CS = [
      "default",
      "primary",
      "success",
      "warning",
      "info",
      "danger",
      "text",
      "",
    ],
    AS = ["button", "submit", "reset"],
    pa = Je({
      size: _l,
      disabled: Boolean,
      type: { type: String, values: CS, default: "" },
      icon: { type: dn },
      nativeType: { type: String, values: AS, default: "button" },
      loading: Boolean,
      loadingIcon: { type: dn, default: () => Cp },
      plain: Boolean,
      text: Boolean,
      link: Boolean,
      bg: Boolean,
      autofocus: Boolean,
      round: Boolean,
      circle: Boolean,
      color: String,
      dark: Boolean,
      autoInsertSpace: { type: Boolean, default: void 0 },
    }),
    kS = { click: (e) => e instanceof MouseEvent };
  function st(e, t) {
    PS(e) && (e = "100%");
    var n = RS(e);
    return (
      (e = t === 360 ? e : Math.min(t, Math.max(0, parseFloat(e)))),
      n && (e = parseInt(String(e * t), 10) / 100),
      Math.abs(e - t) < 1e-6
        ? 1
        : (t === 360
            ? (e = (e < 0 ? (e % t) + t : e % t) / parseFloat(String(t)))
            : (e = (e % t) / parseFloat(String(t))),
          e)
    );
  }
  function is(e) {
    return Math.min(1, Math.max(0, e));
  }
  function PS(e) {
    return typeof e == "string" && e.indexOf(".") !== -1 && parseFloat(e) === 1;
  }
  function RS(e) {
    return typeof e == "string" && e.indexOf("%") !== -1;
  }
  function uh(e) {
    return (e = parseFloat(e)), (isNaN(e) || e < 0 || e > 1) && (e = 1), e;
  }
  function as(e) {
    return e <= 1 ? "".concat(Number(e) * 100, "%") : e;
  }
  function Xn(e) {
    return e.length === 1 ? "0" + e : String(e);
  }
  function MS(e, t, n) {
    return { r: st(e, 255) * 255, g: st(t, 255) * 255, b: st(n, 255) * 255 };
  }
  function zc(e, t, n) {
    (e = st(e, 255)), (t = st(t, 255)), (n = st(n, 255));
    var r = Math.max(e, t, n),
      o = Math.min(e, t, n),
      s = 0,
      i = 0,
      a = (r + o) / 2;
    if (r === o) (i = 0), (s = 0);
    else {
      var l = r - o;
      switch (((i = a > 0.5 ? l / (2 - r - o) : l / (r + o)), r)) {
        case e:
          s = (t - n) / l + (t < n ? 6 : 0);
          break;
        case t:
          s = (n - e) / l + 2;
          break;
        case n:
          s = (e - t) / l + 4;
          break;
      }
      s /= 6;
    }
    return { h: s, s: i, l: a };
  }
  function ki(e, t, n) {
    return (
      n < 0 && (n += 1),
      n > 1 && (n -= 1),
      n < 1 / 6
        ? e + (t - e) * (6 * n)
        : n < 1 / 2
        ? t
        : n < 2 / 3
        ? e + (t - e) * (2 / 3 - n) * 6
        : e
    );
  }
  function IS(e, t, n) {
    var r, o, s;
    if (((e = st(e, 360)), (t = st(t, 100)), (n = st(n, 100)), t === 0))
      (o = n), (s = n), (r = n);
    else {
      var i = n < 0.5 ? n * (1 + t) : n + t - n * t,
        a = 2 * n - i;
      (r = ki(a, i, e + 1 / 3)), (o = ki(a, i, e)), (s = ki(a, i, e - 1 / 3));
    }
    return { r: r * 255, g: o * 255, b: s * 255 };
  }
  function Hc(e, t, n) {
    (e = st(e, 255)), (t = st(t, 255)), (n = st(n, 255));
    var r = Math.max(e, t, n),
      o = Math.min(e, t, n),
      s = 0,
      i = r,
      a = r - o,
      l = r === 0 ? 0 : a / r;
    if (r === o) s = 0;
    else {
      switch (r) {
        case e:
          s = (t - n) / a + (t < n ? 6 : 0);
          break;
        case t:
          s = (n - e) / a + 2;
          break;
        case n:
          s = (e - t) / a + 4;
          break;
      }
      s /= 6;
    }
    return { h: s, s: l, v: i };
  }
  function FS(e, t, n) {
    (e = st(e, 360) * 6), (t = st(t, 100)), (n = st(n, 100));
    var r = Math.floor(e),
      o = e - r,
      s = n * (1 - t),
      i = n * (1 - o * t),
      a = n * (1 - (1 - o) * t),
      l = r % 6,
      u = [n, i, s, s, a, n][l],
      c = [a, n, n, i, s, s][l],
      f = [s, s, a, n, n, i][l];
    return { r: u * 255, g: c * 255, b: f * 255 };
  }
  function Uc(e, t, n, r) {
    var o = [
      Xn(Math.round(e).toString(16)),
      Xn(Math.round(t).toString(16)),
      Xn(Math.round(n).toString(16)),
    ];
    return r &&
      o[0].startsWith(o[0].charAt(1)) &&
      o[1].startsWith(o[1].charAt(1)) &&
      o[2].startsWith(o[2].charAt(1))
      ? o[0].charAt(0) + o[1].charAt(0) + o[2].charAt(0)
      : o.join("");
  }
  function NS(e, t, n, r, o) {
    var s = [
      Xn(Math.round(e).toString(16)),
      Xn(Math.round(t).toString(16)),
      Xn(Math.round(n).toString(16)),
      Xn(LS(r)),
    ];
    return o &&
      s[0].startsWith(s[0].charAt(1)) &&
      s[1].startsWith(s[1].charAt(1)) &&
      s[2].startsWith(s[2].charAt(1)) &&
      s[3].startsWith(s[3].charAt(1))
      ? s[0].charAt(0) + s[1].charAt(0) + s[2].charAt(0) + s[3].charAt(0)
      : s.join("");
  }
  function LS(e) {
    return Math.round(parseFloat(e) * 255).toString(16);
  }
  function qc(e) {
    return xt(e) / 255;
  }
  function xt(e) {
    return parseInt(e, 16);
  }
  function jS(e) {
    return { r: e >> 16, g: (e & 65280) >> 8, b: e & 255 };
  }
  var ha = {
    aliceblue: "#f0f8ff",
    antiquewhite: "#faebd7",
    aqua: "#00ffff",
    aquamarine: "#7fffd4",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    bisque: "#ffe4c4",
    black: "#000000",
    blanchedalmond: "#ffebcd",
    blue: "#0000ff",
    blueviolet: "#8a2be2",
    brown: "#a52a2a",
    burlywood: "#deb887",
    cadetblue: "#5f9ea0",
    chartreuse: "#7fff00",
    chocolate: "#d2691e",
    coral: "#ff7f50",
    cornflowerblue: "#6495ed",
    cornsilk: "#fff8dc",
    crimson: "#dc143c",
    cyan: "#00ffff",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgoldenrod: "#b8860b",
    darkgray: "#a9a9a9",
    darkgreen: "#006400",
    darkgrey: "#a9a9a9",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkseagreen: "#8fbc8f",
    darkslateblue: "#483d8b",
    darkslategray: "#2f4f4f",
    darkslategrey: "#2f4f4f",
    darkturquoise: "#00ced1",
    darkviolet: "#9400d3",
    deeppink: "#ff1493",
    deepskyblue: "#00bfff",
    dimgray: "#696969",
    dimgrey: "#696969",
    dodgerblue: "#1e90ff",
    firebrick: "#b22222",
    floralwhite: "#fffaf0",
    forestgreen: "#228b22",
    fuchsia: "#ff00ff",
    gainsboro: "#dcdcdc",
    ghostwhite: "#f8f8ff",
    goldenrod: "#daa520",
    gold: "#ffd700",
    gray: "#808080",
    green: "#008000",
    greenyellow: "#adff2f",
    grey: "#808080",
    honeydew: "#f0fff0",
    hotpink: "#ff69b4",
    indianred: "#cd5c5c",
    indigo: "#4b0082",
    ivory: "#fffff0",
    khaki: "#f0e68c",
    lavenderblush: "#fff0f5",
    lavender: "#e6e6fa",
    lawngreen: "#7cfc00",
    lemonchiffon: "#fffacd",
    lightblue: "#add8e6",
    lightcoral: "#f08080",
    lightcyan: "#e0ffff",
    lightgoldenrodyellow: "#fafad2",
    lightgray: "#d3d3d3",
    lightgreen: "#90ee90",
    lightgrey: "#d3d3d3",
    lightpink: "#ffb6c1",
    lightsalmon: "#ffa07a",
    lightseagreen: "#20b2aa",
    lightskyblue: "#87cefa",
    lightslategray: "#778899",
    lightslategrey: "#778899",
    lightsteelblue: "#b0c4de",
    lightyellow: "#ffffe0",
    lime: "#00ff00",
    limegreen: "#32cd32",
    linen: "#faf0e6",
    magenta: "#ff00ff",
    maroon: "#800000",
    mediumaquamarine: "#66cdaa",
    mediumblue: "#0000cd",
    mediumorchid: "#ba55d3",
    mediumpurple: "#9370db",
    mediumseagreen: "#3cb371",
    mediumslateblue: "#7b68ee",
    mediumspringgreen: "#00fa9a",
    mediumturquoise: "#48d1cc",
    mediumvioletred: "#c71585",
    midnightblue: "#191970",
    mintcream: "#f5fffa",
    mistyrose: "#ffe4e1",
    moccasin: "#ffe4b5",
    navajowhite: "#ffdead",
    navy: "#000080",
    oldlace: "#fdf5e6",
    olive: "#808000",
    olivedrab: "#6b8e23",
    orange: "#ffa500",
    orangered: "#ff4500",
    orchid: "#da70d6",
    palegoldenrod: "#eee8aa",
    palegreen: "#98fb98",
    paleturquoise: "#afeeee",
    palevioletred: "#db7093",
    papayawhip: "#ffefd5",
    peachpuff: "#ffdab9",
    peru: "#cd853f",
    pink: "#ffc0cb",
    plum: "#dda0dd",
    powderblue: "#b0e0e6",
    purple: "#800080",
    rebeccapurple: "#663399",
    red: "#ff0000",
    rosybrown: "#bc8f8f",
    royalblue: "#4169e1",
    saddlebrown: "#8b4513",
    salmon: "#fa8072",
    sandybrown: "#f4a460",
    seagreen: "#2e8b57",
    seashell: "#fff5ee",
    sienna: "#a0522d",
    silver: "#c0c0c0",
    skyblue: "#87ceeb",
    slateblue: "#6a5acd",
    slategray: "#708090",
    slategrey: "#708090",
    snow: "#fffafa",
    springgreen: "#00ff7f",
    steelblue: "#4682b4",
    tan: "#d2b48c",
    teal: "#008080",
    thistle: "#d8bfd8",
    tomato: "#ff6347",
    turquoise: "#40e0d0",
    violet: "#ee82ee",
    wheat: "#f5deb3",
    white: "#ffffff",
    whitesmoke: "#f5f5f5",
    yellow: "#ffff00",
    yellowgreen: "#9acd32",
  };
  function BS(e) {
    var t = { r: 0, g: 0, b: 0 },
      n = 1,
      r = null,
      o = null,
      s = null,
      i = !1,
      a = !1;
    return (
      typeof e == "string" && (e = HS(e)),
      typeof e == "object" &&
        (an(e.r) && an(e.g) && an(e.b)
          ? ((t = MS(e.r, e.g, e.b)),
            (i = !0),
            (a = String(e.r).substr(-1) === "%" ? "prgb" : "rgb"))
          : an(e.h) && an(e.s) && an(e.v)
          ? ((r = as(e.s)),
            (o = as(e.v)),
            (t = FS(e.h, r, o)),
            (i = !0),
            (a = "hsv"))
          : an(e.h) &&
            an(e.s) &&
            an(e.l) &&
            ((r = as(e.s)),
            (s = as(e.l)),
            (t = IS(e.h, r, s)),
            (i = !0),
            (a = "hsl")),
        Object.prototype.hasOwnProperty.call(e, "a") && (n = e.a)),
      (n = uh(n)),
      {
        ok: i,
        format: e.format || a,
        r: Math.min(255, Math.max(t.r, 0)),
        g: Math.min(255, Math.max(t.g, 0)),
        b: Math.min(255, Math.max(t.b, 0)),
        a: n,
      }
    );
  }
  var DS = "[-\\+]?\\d+%?",
    zS = "[-\\+]?\\d*\\.\\d+%?",
    Mn = "(?:".concat(zS, ")|(?:").concat(DS, ")"),
    Pi = "[\\s|\\(]+("
      .concat(Mn, ")[,|\\s]+(")
      .concat(Mn, ")[,|\\s]+(")
      .concat(Mn, ")\\s*\\)?"),
    Ri = "[\\s|\\(]+("
      .concat(Mn, ")[,|\\s]+(")
      .concat(Mn, ")[,|\\s]+(")
      .concat(Mn, ")[,|\\s]+(")
      .concat(Mn, ")\\s*\\)?"),
    jt = {
      CSS_UNIT: new RegExp(Mn),
      rgb: new RegExp("rgb" + Pi),
      rgba: new RegExp("rgba" + Ri),
      hsl: new RegExp("hsl" + Pi),
      hsla: new RegExp("hsla" + Ri),
      hsv: new RegExp("hsv" + Pi),
      hsva: new RegExp("hsva" + Ri),
      hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
      hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
      hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
      hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    };
  function HS(e) {
    if (((e = e.trim().toLowerCase()), e.length === 0)) return !1;
    var t = !1;
    if (ha[e]) (e = ha[e]), (t = !0);
    else if (e === "transparent")
      return { r: 0, g: 0, b: 0, a: 0, format: "name" };
    var n = jt.rgb.exec(e);
    return n
      ? { r: n[1], g: n[2], b: n[3] }
      : ((n = jt.rgba.exec(e)),
        n
          ? { r: n[1], g: n[2], b: n[3], a: n[4] }
          : ((n = jt.hsl.exec(e)),
            n
              ? { h: n[1], s: n[2], l: n[3] }
              : ((n = jt.hsla.exec(e)),
                n
                  ? { h: n[1], s: n[2], l: n[3], a: n[4] }
                  : ((n = jt.hsv.exec(e)),
                    n
                      ? { h: n[1], s: n[2], v: n[3] }
                      : ((n = jt.hsva.exec(e)),
                        n
                          ? { h: n[1], s: n[2], v: n[3], a: n[4] }
                          : ((n = jt.hex8.exec(e)),
                            n
                              ? {
                                  r: xt(n[1]),
                                  g: xt(n[2]),
                                  b: xt(n[3]),
                                  a: qc(n[4]),
                                  format: t ? "name" : "hex8",
                                }
                              : ((n = jt.hex6.exec(e)),
                                n
                                  ? {
                                      r: xt(n[1]),
                                      g: xt(n[2]),
                                      b: xt(n[3]),
                                      format: t ? "name" : "hex",
                                    }
                                  : ((n = jt.hex4.exec(e)),
                                    n
                                      ? {
                                          r: xt(n[1] + n[1]),
                                          g: xt(n[2] + n[2]),
                                          b: xt(n[3] + n[3]),
                                          a: qc(n[4] + n[4]),
                                          format: t ? "name" : "hex8",
                                        }
                                      : ((n = jt.hex3.exec(e)),
                                        n
                                          ? {
                                              r: xt(n[1] + n[1]),
                                              g: xt(n[2] + n[2]),
                                              b: xt(n[3] + n[3]),
                                              format: t ? "name" : "hex",
                                            }
                                          : !1)))))))));
  }
  function an(e) {
    return Boolean(jt.CSS_UNIT.exec(String(e)));
  }
  var ch = (function () {
    function e(t, n) {
      t === void 0 && (t = ""), n === void 0 && (n = {});
      var r;
      if (t instanceof e) return t;
      typeof t == "number" && (t = jS(t)), (this.originalInput = t);
      var o = BS(t);
      (this.originalInput = t),
        (this.r = o.r),
        (this.g = o.g),
        (this.b = o.b),
        (this.a = o.a),
        (this.roundA = Math.round(100 * this.a) / 100),
        (this.format = (r = n.format) !== null && r !== void 0 ? r : o.format),
        (this.gradientType = n.gradientType),
        this.r < 1 && (this.r = Math.round(this.r)),
        this.g < 1 && (this.g = Math.round(this.g)),
        this.b < 1 && (this.b = Math.round(this.b)),
        (this.isValid = o.ok);
    }
    return (
      (e.prototype.isDark = function () {
        return this.getBrightness() < 128;
      }),
      (e.prototype.isLight = function () {
        return !this.isDark();
      }),
      (e.prototype.getBrightness = function () {
        var t = this.toRgb();
        return (t.r * 299 + t.g * 587 + t.b * 114) / 1e3;
      }),
      (e.prototype.getLuminance = function () {
        var t = this.toRgb(),
          n,
          r,
          o,
          s = t.r / 255,
          i = t.g / 255,
          a = t.b / 255;
        return (
          s <= 0.03928
            ? (n = s / 12.92)
            : (n = Math.pow((s + 0.055) / 1.055, 2.4)),
          i <= 0.03928
            ? (r = i / 12.92)
            : (r = Math.pow((i + 0.055) / 1.055, 2.4)),
          a <= 0.03928
            ? (o = a / 12.92)
            : (o = Math.pow((a + 0.055) / 1.055, 2.4)),
          0.2126 * n + 0.7152 * r + 0.0722 * o
        );
      }),
      (e.prototype.getAlpha = function () {
        return this.a;
      }),
      (e.prototype.setAlpha = function (t) {
        return (
          (this.a = uh(t)), (this.roundA = Math.round(100 * this.a) / 100), this
        );
      }),
      (e.prototype.isMonochrome = function () {
        var t = this.toHsl().s;
        return t === 0;
      }),
      (e.prototype.toHsv = function () {
        var t = Hc(this.r, this.g, this.b);
        return { h: t.h * 360, s: t.s, v: t.v, a: this.a };
      }),
      (e.prototype.toHsvString = function () {
        var t = Hc(this.r, this.g, this.b),
          n = Math.round(t.h * 360),
          r = Math.round(t.s * 100),
          o = Math.round(t.v * 100);
        return this.a === 1
          ? "hsv(".concat(n, ", ").concat(r, "%, ").concat(o, "%)")
          : "hsva("
              .concat(n, ", ")
              .concat(r, "%, ")
              .concat(o, "%, ")
              .concat(this.roundA, ")");
      }),
      (e.prototype.toHsl = function () {
        var t = zc(this.r, this.g, this.b);
        return { h: t.h * 360, s: t.s, l: t.l, a: this.a };
      }),
      (e.prototype.toHslString = function () {
        var t = zc(this.r, this.g, this.b),
          n = Math.round(t.h * 360),
          r = Math.round(t.s * 100),
          o = Math.round(t.l * 100);
        return this.a === 1
          ? "hsl(".concat(n, ", ").concat(r, "%, ").concat(o, "%)")
          : "hsla("
              .concat(n, ", ")
              .concat(r, "%, ")
              .concat(o, "%, ")
              .concat(this.roundA, ")");
      }),
      (e.prototype.toHex = function (t) {
        return t === void 0 && (t = !1), Uc(this.r, this.g, this.b, t);
      }),
      (e.prototype.toHexString = function (t) {
        return t === void 0 && (t = !1), "#" + this.toHex(t);
      }),
      (e.prototype.toHex8 = function (t) {
        return t === void 0 && (t = !1), NS(this.r, this.g, this.b, this.a, t);
      }),
      (e.prototype.toHex8String = function (t) {
        return t === void 0 && (t = !1), "#" + this.toHex8(t);
      }),
      (e.prototype.toHexShortString = function (t) {
        return (
          t === void 0 && (t = !1),
          this.a === 1 ? this.toHexString(t) : this.toHex8String(t)
        );
      }),
      (e.prototype.toRgb = function () {
        return {
          r: Math.round(this.r),
          g: Math.round(this.g),
          b: Math.round(this.b),
          a: this.a,
        };
      }),
      (e.prototype.toRgbString = function () {
        var t = Math.round(this.r),
          n = Math.round(this.g),
          r = Math.round(this.b);
        return this.a === 1
          ? "rgb(".concat(t, ", ").concat(n, ", ").concat(r, ")")
          : "rgba("
              .concat(t, ", ")
              .concat(n, ", ")
              .concat(r, ", ")
              .concat(this.roundA, ")");
      }),
      (e.prototype.toPercentageRgb = function () {
        var t = function (n) {
          return "".concat(Math.round(st(n, 255) * 100), "%");
        };
        return { r: t(this.r), g: t(this.g), b: t(this.b), a: this.a };
      }),
      (e.prototype.toPercentageRgbString = function () {
        var t = function (n) {
          return Math.round(st(n, 255) * 100);
        };
        return this.a === 1
          ? "rgb("
              .concat(t(this.r), "%, ")
              .concat(t(this.g), "%, ")
              .concat(t(this.b), "%)")
          : "rgba("
              .concat(t(this.r), "%, ")
              .concat(t(this.g), "%, ")
              .concat(t(this.b), "%, ")
              .concat(this.roundA, ")");
      }),
      (e.prototype.toName = function () {
        if (this.a === 0) return "transparent";
        if (this.a < 1) return !1;
        for (
          var t = "#" + Uc(this.r, this.g, this.b, !1),
            n = 0,
            r = Object.entries(ha);
          n < r.length;
          n++
        ) {
          var o = r[n],
            s = o[0],
            i = o[1];
          if (t === i) return s;
        }
        return !1;
      }),
      (e.prototype.toString = function (t) {
        var n = Boolean(t);
        t = t ?? this.format;
        var r = !1,
          o = this.a < 1 && this.a >= 0,
          s = !n && o && (t.startsWith("hex") || t === "name");
        return s
          ? t === "name" && this.a === 0
            ? this.toName()
            : this.toRgbString()
          : (t === "rgb" && (r = this.toRgbString()),
            t === "prgb" && (r = this.toPercentageRgbString()),
            (t === "hex" || t === "hex6") && (r = this.toHexString()),
            t === "hex3" && (r = this.toHexString(!0)),
            t === "hex4" && (r = this.toHex8String(!0)),
            t === "hex8" && (r = this.toHex8String()),
            t === "name" && (r = this.toName()),
            t === "hsl" && (r = this.toHslString()),
            t === "hsv" && (r = this.toHsvString()),
            r || this.toHexString());
      }),
      (e.prototype.toNumber = function () {
        return (
          (Math.round(this.r) << 16) +
          (Math.round(this.g) << 8) +
          Math.round(this.b)
        );
      }),
      (e.prototype.clone = function () {
        return new e(this.toString());
      }),
      (e.prototype.lighten = function (t) {
        t === void 0 && (t = 10);
        var n = this.toHsl();
        return (n.l += t / 100), (n.l = is(n.l)), new e(n);
      }),
      (e.prototype.brighten = function (t) {
        t === void 0 && (t = 10);
        var n = this.toRgb();
        return (
          (n.r = Math.max(
            0,
            Math.min(255, n.r - Math.round(255 * -(t / 100)))
          )),
          (n.g = Math.max(
            0,
            Math.min(255, n.g - Math.round(255 * -(t / 100)))
          )),
          (n.b = Math.max(
            0,
            Math.min(255, n.b - Math.round(255 * -(t / 100)))
          )),
          new e(n)
        );
      }),
      (e.prototype.darken = function (t) {
        t === void 0 && (t = 10);
        var n = this.toHsl();
        return (n.l -= t / 100), (n.l = is(n.l)), new e(n);
      }),
      (e.prototype.tint = function (t) {
        return t === void 0 && (t = 10), this.mix("white", t);
      }),
      (e.prototype.shade = function (t) {
        return t === void 0 && (t = 10), this.mix("black", t);
      }),
      (e.prototype.desaturate = function (t) {
        t === void 0 && (t = 10);
        var n = this.toHsl();
        return (n.s -= t / 100), (n.s = is(n.s)), new e(n);
      }),
      (e.prototype.saturate = function (t) {
        t === void 0 && (t = 10);
        var n = this.toHsl();
        return (n.s += t / 100), (n.s = is(n.s)), new e(n);
      }),
      (e.prototype.greyscale = function () {
        return this.desaturate(100);
      }),
      (e.prototype.spin = function (t) {
        var n = this.toHsl(),
          r = (n.h + t) % 360;
        return (n.h = r < 0 ? 360 + r : r), new e(n);
      }),
      (e.prototype.mix = function (t, n) {
        n === void 0 && (n = 50);
        var r = this.toRgb(),
          o = new e(t).toRgb(),
          s = n / 100,
          i = {
            r: (o.r - r.r) * s + r.r,
            g: (o.g - r.g) * s + r.g,
            b: (o.b - r.b) * s + r.b,
            a: (o.a - r.a) * s + r.a,
          };
        return new e(i);
      }),
      (e.prototype.analogous = function (t, n) {
        t === void 0 && (t = 6), n === void 0 && (n = 30);
        var r = this.toHsl(),
          o = 360 / n,
          s = [this];
        for (r.h = (r.h - ((o * t) >> 1) + 720) % 360; --t; )
          (r.h = (r.h + o) % 360), s.push(new e(r));
        return s;
      }),
      (e.prototype.complement = function () {
        var t = this.toHsl();
        return (t.h = (t.h + 180) % 360), new e(t);
      }),
      (e.prototype.monochromatic = function (t) {
        t === void 0 && (t = 6);
        for (
          var n = this.toHsv(), r = n.h, o = n.s, s = n.v, i = [], a = 1 / t;
          t--;

        )
          i.push(new e({ h: r, s: o, v: s })), (s = (s + a) % 1);
        return i;
      }),
      (e.prototype.splitcomplement = function () {
        var t = this.toHsl(),
          n = t.h;
        return [
          this,
          new e({ h: (n + 72) % 360, s: t.s, l: t.l }),
          new e({ h: (n + 216) % 360, s: t.s, l: t.l }),
        ];
      }),
      (e.prototype.onBackground = function (t) {
        var n = this.toRgb(),
          r = new e(t).toRgb(),
          o = n.a + r.a * (1 - n.a);
        return new e({
          r: (n.r * n.a + r.r * r.a * (1 - n.a)) / o,
          g: (n.g * n.a + r.g * r.a * (1 - n.a)) / o,
          b: (n.b * n.a + r.b * r.a * (1 - n.a)) / o,
          a: o,
        });
      }),
      (e.prototype.triad = function () {
        return this.polyad(3);
      }),
      (e.prototype.tetrad = function () {
        return this.polyad(4);
      }),
      (e.prototype.polyad = function (t) {
        for (
          var n = this.toHsl(), r = n.h, o = [this], s = 360 / t, i = 1;
          i < t;
          i++
        )
          o.push(new e({ h: (r + i * s) % 360, s: n.s, l: n.l }));
        return o;
      }),
      (e.prototype.equals = function (t) {
        return this.toRgbString() === new e(t).toRgbString();
      }),
      e
    );
  })();
  function Sn(e, t = 20) {
    return e.mix("#141414", t).toString();
  }
  function US(e) {
    const t = wl(),
      n = De("button");
    return M(() => {
      let r = {};
      const o = e.color;
      if (o) {
        const s = new ch(o),
          i = e.dark ? s.tint(20).toString() : Sn(s, 20);
        if (e.plain)
          (r = n.cssVarBlock({
            "bg-color": e.dark ? Sn(s, 90) : s.tint(90).toString(),
            "text-color": o,
            "border-color": e.dark ? Sn(s, 50) : s.tint(50).toString(),
            "hover-text-color": `var(${n.cssVarName("color-white")})`,
            "hover-bg-color": o,
            "hover-border-color": o,
            "active-bg-color": i,
            "active-text-color": `var(${n.cssVarName("color-white")})`,
            "active-border-color": i,
          })),
            t.value &&
              ((r[n.cssVarBlockName("disabled-bg-color")] = e.dark
                ? Sn(s, 90)
                : s.tint(90).toString()),
              (r[n.cssVarBlockName("disabled-text-color")] = e.dark
                ? Sn(s, 50)
                : s.tint(50).toString()),
              (r[n.cssVarBlockName("disabled-border-color")] = e.dark
                ? Sn(s, 80)
                : s.tint(80).toString()));
        else {
          const a = e.dark ? Sn(s, 30) : s.tint(30).toString(),
            l = s.isDark()
              ? `var(${n.cssVarName("color-white")})`
              : `var(${n.cssVarName("color-black")})`;
          if (
            ((r = n.cssVarBlock({
              "bg-color": o,
              "text-color": l,
              "border-color": o,
              "hover-bg-color": a,
              "hover-text-color": l,
              "hover-border-color": a,
              "active-bg-color": i,
              "active-border-color": i,
            })),
            t.value)
          ) {
            const u = e.dark ? Sn(s, 50) : s.tint(50).toString();
            (r[n.cssVarBlockName("disabled-bg-color")] = u),
              (r[n.cssVarBlockName("disabled-text-color")] = e.dark
                ? "rgba(255, 255, 255, 0.5)"
                : `var(${n.cssVarName("color-white")})`),
              (r[n.cssVarBlockName("disabled-border-color")] = u);
          }
        }
      }
      return r;
    });
  }
  const qS = ["aria-disabled", "disabled", "autofocus", "type"],
    VS = be({ name: "ElButton" }),
    WS = be({
      ...VS,
      props: pa,
      emits: kS,
      setup(e, { expose: t, emit: n }) {
        const r = e,
          o = US(r),
          s = De("button"),
          {
            _ref: i,
            _size: a,
            _type: l,
            _disabled: u,
            shouldAddSpace: c,
            handleClick: f,
          } = $S(r, n);
        return (
          t({ ref: i, size: a, type: l, disabled: u, shouldAddSpace: c }),
          (d, p) => (
            ee(),
            me(
              "button",
              {
                ref_key: "_ref",
                ref: i,
                class: _e([
                  y(s).b(),
                  y(s).m(y(l)),
                  y(s).m(y(a)),
                  y(s).is("disabled", y(u)),
                  y(s).is("loading", d.loading),
                  y(s).is("plain", d.plain),
                  y(s).is("round", d.round),
                  y(s).is("circle", d.circle),
                  y(s).is("text", d.text),
                  y(s).is("link", d.link),
                  y(s).is("has-bg", d.bg),
                ]),
                "aria-disabled": y(u) || d.loading,
                disabled: y(u) || d.loading,
                autofocus: d.autofocus,
                type: d.nativeType,
                style: rn(y(o)),
                onClick: p[0] || (p[0] = (...h) => y(f) && y(f)(...h)),
              },
              [
                d.loading
                  ? (ee(),
                    me(
                      We,
                      { key: 0 },
                      [
                        d.$slots.loading
                          ? Ae(d.$slots, "loading", { key: 0 })
                          : (ee(),
                            Ne(
                              y(Dt),
                              { key: 1, class: _e(y(s).is("loading")) },
                              {
                                default: we(() => [
                                  (ee(), Ne(Pn(d.loadingIcon))),
                                ]),
                                _: 1,
                              },
                              8,
                              ["class"]
                            )),
                      ],
                      64
                    ))
                  : d.icon || d.$slots.icon
                  ? (ee(),
                    Ne(
                      y(Dt),
                      { key: 1 },
                      {
                        default: we(() => [
                          d.icon
                            ? (ee(), Ne(Pn(d.icon), { key: 0 }))
                            : Ae(d.$slots, "icon", { key: 1 }),
                        ]),
                        _: 3,
                      }
                    ))
                  : Ie("v-if", !0),
                d.$slots.default
                  ? (ee(),
                    me(
                      "span",
                      {
                        key: 2,
                        class: _e({ [y(s).em("text", "expand")]: y(c) }),
                      },
                      [Ae(d.$slots, "default")],
                      2
                    ))
                  : Ie("v-if", !0),
              ],
              14,
              qS
            )
          )
        );
      },
    });
  var KS = Ze(WS, [
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/button/src/button.vue",
    ],
  ]);
  const GS = { size: pa.size, type: pa.type },
    JS = be({ name: "ElButtonGroup" }),
    ZS = be({
      ...JS,
      props: GS,
      setup(e) {
        const t = e;
        ot(Rp, ft({ size: Xt(t, "size"), type: Xt(t, "type") }));
        const n = De("button");
        return (r, o) => (
          ee(),
          me(
            "div",
            { class: _e(`${y(n).b("group")}`) },
            [Ae(r.$slots, "default")],
            2
          )
        );
      },
    });
  var fh = Ze(ZS, [
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/button/src/button-group.vue",
    ],
  ]);
  const dh = _n(KS, { ButtonGroup: fh });
  Ho(fh);
  var YS =
      typeof globalThis < "u"
        ? globalThis
        : typeof window < "u"
        ? window
        : typeof global < "u"
        ? global
        : typeof self < "u"
        ? self
        : {},
    ga = {},
    QS = {
      get exports() {
        return ga;
      },
      set exports(e) {
        ga = e;
      },
    };
  (function (e, t) {
    (function (n, r) {
      e.exports = r();
    })(YS, function () {
      var n = 1e3,
        r = 6e4,
        o = 36e5,
        s = "millisecond",
        i = "second",
        a = "minute",
        l = "hour",
        u = "day",
        c = "week",
        f = "month",
        d = "quarter",
        p = "year",
        h = "date",
        g = "Invalid Date",
        _ =
          /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
        m =
          /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
        w = {
          name: "en",
          weekdays:
            "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split(
              "_"
            ),
          months:
            "January_February_March_April_May_June_July_August_September_October_November_December".split(
              "_"
            ),
          ordinal: function (F) {
            var L = ["th", "st", "nd", "rd"],
              O = F % 100;
            return "[" + F + (L[(O - 20) % 10] || L[O] || L[0]) + "]";
          },
        },
        x = function (F, L, O) {
          var z = String(F);
          return !z || z.length >= L
            ? F
            : "" + Array(L + 1 - z.length).join(O) + F;
        },
        E = {
          s: x,
          z: function (F) {
            var L = -F.utcOffset(),
              O = Math.abs(L),
              z = Math.floor(O / 60),
              k = O % 60;
            return (L <= 0 ? "+" : "-") + x(z, 2, "0") + ":" + x(k, 2, "0");
          },
          m: function F(L, O) {
            if (L.date() < O.date()) return -F(O, L);
            var z = 12 * (O.year() - L.year()) + (O.month() - L.month()),
              k = L.clone().add(z, f),
              G = O - k < 0,
              W = L.clone().add(z + (G ? -1 : 1), f);
            return +(-(z + (O - k) / (G ? k - W : W - k)) || 0);
          },
          a: function (F) {
            return F < 0 ? Math.ceil(F) || 0 : Math.floor(F);
          },
          p: function (F) {
            return (
              { M: f, y: p, w: c, d: u, D: h, h: l, m: a, s: i, ms: s, Q: d }[
                F
              ] ||
              String(F || "")
                .toLowerCase()
                .replace(/s$/, "")
            );
          },
          u: function (F) {
            return F === void 0;
          },
        },
        I = "en",
        N = {};
      N[I] = w;
      var D = function (F) {
          return F instanceof U;
        },
        T = function F(L, O, z) {
          var k;
          if (!L) return I;
          if (typeof L == "string") {
            var G = L.toLowerCase();
            N[G] && (k = G), O && ((N[G] = O), (k = G));
            var W = L.split("-");
            if (!k && W.length > 1) return F(W[0]);
          } else {
            var oe = L.name;
            (N[oe] = L), (k = oe);
          }
          return !z && k && (I = k), k || (!z && I);
        },
        H = function (F, L) {
          if (D(F)) return F.clone();
          var O = typeof L == "object" ? L : {};
          return (O.date = F), (O.args = arguments), new U(O);
        },
        S = E;
      (S.l = T),
        (S.i = D),
        (S.w = function (F, L) {
          return H(F, { locale: L.$L, utc: L.$u, x: L.$x, $offset: L.$offset });
        });
      var U = (function () {
          function F(O) {
            (this.$L = T(O.locale, null, !0)), this.parse(O);
          }
          var L = F.prototype;
          return (
            (L.parse = function (O) {
              (this.$d = (function (z) {
                var k = z.date,
                  G = z.utc;
                if (k === null) return new Date(NaN);
                if (S.u(k)) return new Date();
                if (k instanceof Date) return new Date(k);
                if (typeof k == "string" && !/Z$/i.test(k)) {
                  var W = k.match(_);
                  if (W) {
                    var oe = W[2] - 1 || 0,
                      le = (W[7] || "0").substring(0, 3);
                    return G
                      ? new Date(
                          Date.UTC(
                            W[1],
                            oe,
                            W[3] || 1,
                            W[4] || 0,
                            W[5] || 0,
                            W[6] || 0,
                            le
                          )
                        )
                      : new Date(
                          W[1],
                          oe,
                          W[3] || 1,
                          W[4] || 0,
                          W[5] || 0,
                          W[6] || 0,
                          le
                        );
                  }
                }
                return new Date(k);
              })(O)),
                (this.$x = O.x || {}),
                this.init();
            }),
            (L.init = function () {
              var O = this.$d;
              (this.$y = O.getFullYear()),
                (this.$M = O.getMonth()),
                (this.$D = O.getDate()),
                (this.$W = O.getDay()),
                (this.$H = O.getHours()),
                (this.$m = O.getMinutes()),
                (this.$s = O.getSeconds()),
                (this.$ms = O.getMilliseconds());
            }),
            (L.$utils = function () {
              return S;
            }),
            (L.isValid = function () {
              return this.$d.toString() !== g;
            }),
            (L.isSame = function (O, z) {
              var k = H(O);
              return this.startOf(z) <= k && k <= this.endOf(z);
            }),
            (L.isAfter = function (O, z) {
              return H(O) < this.startOf(z);
            }),
            (L.isBefore = function (O, z) {
              return this.endOf(z) < H(O);
            }),
            (L.$g = function (O, z, k) {
              return S.u(O) ? this[z] : this.set(k, O);
            }),
            (L.unix = function () {
              return Math.floor(this.valueOf() / 1e3);
            }),
            (L.valueOf = function () {
              return this.$d.getTime();
            }),
            (L.startOf = function (O, z) {
              var k = this,
                G = !!S.u(z) || z,
                W = S.p(O),
                oe = function (K, ne) {
                  var ue = S.w(
                    k.$u ? Date.UTC(k.$y, ne, K) : new Date(k.$y, ne, K),
                    k
                  );
                  return G ? ue : ue.endOf(u);
                },
                le = function (K, ne) {
                  return S.w(
                    k
                      .toDate()
                      [K].apply(
                        k.toDate("s"),
                        (G ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(ne)
                      ),
                    k
                  );
                },
                fe = this.$W,
                Oe = this.$M,
                Le = this.$D,
                P = "set" + (this.$u ? "UTC" : "");
              switch (W) {
                case p:
                  return G ? oe(1, 0) : oe(31, 11);
                case f:
                  return G ? oe(1, Oe) : oe(0, Oe + 1);
                case c:
                  var Z = this.$locale().weekStart || 0,
                    A = (fe < Z ? fe + 7 : fe) - Z;
                  return oe(G ? Le - A : Le + (6 - A), Oe);
                case u:
                case h:
                  return le(P + "Hours", 0);
                case l:
                  return le(P + "Minutes", 1);
                case a:
                  return le(P + "Seconds", 2);
                case i:
                  return le(P + "Milliseconds", 3);
                default:
                  return this.clone();
              }
            }),
            (L.endOf = function (O) {
              return this.startOf(O, !1);
            }),
            (L.$set = function (O, z) {
              var k,
                G = S.p(O),
                W = "set" + (this.$u ? "UTC" : ""),
                oe = ((k = {}),
                (k[u] = W + "Date"),
                (k[h] = W + "Date"),
                (k[f] = W + "Month"),
                (k[p] = W + "FullYear"),
                (k[l] = W + "Hours"),
                (k[a] = W + "Minutes"),
                (k[i] = W + "Seconds"),
                (k[s] = W + "Milliseconds"),
                k)[G],
                le = G === u ? this.$D + (z - this.$W) : z;
              if (G === f || G === p) {
                var fe = this.clone().set(h, 1);
                fe.$d[oe](le),
                  fe.init(),
                  (this.$d = fe.set(h, Math.min(this.$D, fe.daysInMonth())).$d);
              } else oe && this.$d[oe](le);
              return this.init(), this;
            }),
            (L.set = function (O, z) {
              return this.clone().$set(O, z);
            }),
            (L.get = function (O) {
              return this[S.p(O)]();
            }),
            (L.add = function (O, z) {
              var k,
                G = this;
              O = Number(O);
              var W = S.p(z),
                oe = function (Oe) {
                  var Le = H(G);
                  return S.w(Le.date(Le.date() + Math.round(Oe * O)), G);
                };
              if (W === f) return this.set(f, this.$M + O);
              if (W === p) return this.set(p, this.$y + O);
              if (W === u) return oe(1);
              if (W === c) return oe(7);
              var le =
                  ((k = {}), (k[a] = r), (k[l] = o), (k[i] = n), k)[W] || 1,
                fe = this.$d.getTime() + O * le;
              return S.w(fe, this);
            }),
            (L.subtract = function (O, z) {
              return this.add(-1 * O, z);
            }),
            (L.format = function (O) {
              var z = this,
                k = this.$locale();
              if (!this.isValid()) return k.invalidDate || g;
              var G = O || "YYYY-MM-DDTHH:mm:ssZ",
                W = S.z(this),
                oe = this.$H,
                le = this.$m,
                fe = this.$M,
                Oe = k.weekdays,
                Le = k.months,
                P = function (ne, ue, ae, v) {
                  return (ne && (ne[ue] || ne(z, G))) || ae[ue].slice(0, v);
                },
                Z = function (ne) {
                  return S.s(oe % 12 || 12, ne, "0");
                },
                A =
                  k.meridiem ||
                  function (ne, ue, ae) {
                    var v = ne < 12 ? "AM" : "PM";
                    return ae ? v.toLowerCase() : v;
                  },
                K = {
                  YY: String(this.$y).slice(-2),
                  YYYY: this.$y,
                  M: fe + 1,
                  MM: S.s(fe + 1, 2, "0"),
                  MMM: P(k.monthsShort, fe, Le, 3),
                  MMMM: P(Le, fe),
                  D: this.$D,
                  DD: S.s(this.$D, 2, "0"),
                  d: String(this.$W),
                  dd: P(k.weekdaysMin, this.$W, Oe, 2),
                  ddd: P(k.weekdaysShort, this.$W, Oe, 3),
                  dddd: Oe[this.$W],
                  H: String(oe),
                  HH: S.s(oe, 2, "0"),
                  h: Z(1),
                  hh: Z(2),
                  a: A(oe, le, !0),
                  A: A(oe, le, !1),
                  m: String(le),
                  mm: S.s(le, 2, "0"),
                  s: String(this.$s),
                  ss: S.s(this.$s, 2, "0"),
                  SSS: S.s(this.$ms, 3, "0"),
                  Z: W,
                };
              return G.replace(m, function (ne, ue) {
                return ue || K[ne] || W.replace(":", "");
              });
            }),
            (L.utcOffset = function () {
              return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
            }),
            (L.diff = function (O, z, k) {
              var G,
                W = S.p(z),
                oe = H(O),
                le = (oe.utcOffset() - this.utcOffset()) * r,
                fe = this - oe,
                Oe = S.m(this, oe);
              return (
                (Oe =
                  ((G = {}),
                  (G[p] = Oe / 12),
                  (G[f] = Oe),
                  (G[d] = Oe / 3),
                  (G[c] = (fe - le) / 6048e5),
                  (G[u] = (fe - le) / 864e5),
                  (G[l] = fe / o),
                  (G[a] = fe / r),
                  (G[i] = fe / n),
                  G)[W] || fe),
                k ? Oe : S.a(Oe)
              );
            }),
            (L.daysInMonth = function () {
              return this.endOf(f).$D;
            }),
            (L.$locale = function () {
              return N[this.$L];
            }),
            (L.locale = function (O, z) {
              if (!O) return this.$L;
              var k = this.clone(),
                G = T(O, z, !0);
              return G && (k.$L = G), k;
            }),
            (L.clone = function () {
              return S.w(this.$d, this);
            }),
            (L.toDate = function () {
              return new Date(this.valueOf());
            }),
            (L.toJSON = function () {
              return this.isValid() ? this.toISOString() : null;
            }),
            (L.toISOString = function () {
              return this.$d.toISOString();
            }),
            (L.toString = function () {
              return this.$d.toUTCString();
            }),
            F
          );
        })(),
        $ = U.prototype;
      return (
        (H.prototype = $),
        [
          ["$ms", s],
          ["$s", i],
          ["$m", a],
          ["$H", l],
          ["$W", u],
          ["$M", f],
          ["$y", p],
          ["$D", h],
        ].forEach(function (F) {
          $[F[1]] = function (L) {
            return this.$g(L, F[0], F[1]);
          };
        }),
        (H.extend = function (F, L) {
          return F.$i || (F(L, U, H), (F.$i = !0)), H;
        }),
        (H.locale = T),
        (H.isDayjs = D),
        (H.unix = function (F) {
          return H(1e3 * F);
        }),
        (H.en = N[I]),
        (H.Ls = N),
        (H.p = {}),
        H
      );
    });
  })(QS);
  const XS = ga,
    eO = Je({
      header: { type: String, default: "" },
      bodyStyle: { type: Se([String, Object, Array]), default: "" },
      shadow: {
        type: String,
        values: ["always", "hover", "never"],
        default: "always",
      },
    }),
    tO = be({ name: "ElCard" }),
    nO = be({
      ...tO,
      props: eO,
      setup(e) {
        const t = De("card");
        return (n, r) => (
          ee(),
          me(
            "div",
            { class: _e([y(t).b(), y(t).is(`${n.shadow}-shadow`)]) },
            [
              n.$slots.header || n.header
                ? (ee(),
                  me(
                    "div",
                    { key: 0, class: _e(y(t).e("header")) },
                    [Ae(n.$slots, "header", {}, () => [Pt(lt(n.header), 1)])],
                    2
                  ))
                : Ie("v-if", !0),
              ye(
                "div",
                { class: _e(y(t).e("body")), style: rn(n.bodyStyle) },
                [Ae(n.$slots, "default")],
                6
              ),
            ],
            2
          )
        );
      },
    });
  var rO = Ze(nO, [
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/card/src/card.vue",
    ],
  ]);
  const oO = _n(rO),
    sO = be({ name: "ElCollapseTransition" }),
    iO = be({
      ...sO,
      setup(e) {
        const t = De("collapse-transition"),
          n = {
            beforeEnter(r) {
              r.dataset || (r.dataset = {}),
                (r.dataset.oldPaddingTop = r.style.paddingTop),
                (r.dataset.oldPaddingBottom = r.style.paddingBottom),
                (r.style.maxHeight = 0),
                (r.style.paddingTop = 0),
                (r.style.paddingBottom = 0);
            },
            enter(r) {
              (r.dataset.oldOverflow = r.style.overflow),
                r.scrollHeight !== 0
                  ? ((r.style.maxHeight = `${r.scrollHeight}px`),
                    (r.style.paddingTop = r.dataset.oldPaddingTop),
                    (r.style.paddingBottom = r.dataset.oldPaddingBottom))
                  : ((r.style.maxHeight = 0),
                    (r.style.paddingTop = r.dataset.oldPaddingTop),
                    (r.style.paddingBottom = r.dataset.oldPaddingBottom)),
                (r.style.overflow = "hidden");
            },
            afterEnter(r) {
              (r.style.maxHeight = ""),
                (r.style.overflow = r.dataset.oldOverflow);
            },
            beforeLeave(r) {
              r.dataset || (r.dataset = {}),
                (r.dataset.oldPaddingTop = r.style.paddingTop),
                (r.dataset.oldPaddingBottom = r.style.paddingBottom),
                (r.dataset.oldOverflow = r.style.overflow),
                (r.style.maxHeight = `${r.scrollHeight}px`),
                (r.style.overflow = "hidden");
            },
            leave(r) {
              r.scrollHeight !== 0 &&
                ((r.style.maxHeight = 0),
                (r.style.paddingTop = 0),
                (r.style.paddingBottom = 0));
            },
            afterLeave(r) {
              (r.style.maxHeight = ""),
                (r.style.overflow = r.dataset.oldOverflow),
                (r.style.paddingTop = r.dataset.oldPaddingTop),
                (r.style.paddingBottom = r.dataset.oldPaddingBottom);
            },
          };
        return (r, o) => (
          ee(),
          Ne(
            Dn,
            en({ name: y(t).b() }, qm(n)),
            { default: we(() => [Ae(r.$slots, "default")]), _: 3 },
            16,
            ["name"]
          )
        );
      },
    });
  var _s = Ze(iO, [
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/collapse-transition/src/collapse-transition.vue",
    ],
  ]);
  _s.install = (e) => {
    e.component(_s.name, _s);
  };
  const aO = _s,
    ma = {},
    lO = Je({
      a11y: { type: Boolean, default: !0 },
      locale: { type: Se(Object) },
      size: _l,
      button: { type: Se(Object) },
      experimentalFeatures: { type: Se(Object) },
      keyboardNavigation: { type: Boolean, default: !0 },
      message: { type: Se(Object) },
      zIndex: Number,
      namespace: { type: String, default: "el" },
    });
  be({
    name: "ElConfigProvider",
    props: lO,
    setup(e, { slots: t }) {
      xe(
        () => e.message,
        (r) => {
          Object.assign(ma, r ?? {});
        },
        { immediate: !0, deep: !0 }
      );
      const n = Nx(e);
      return () => Ae(t, "default", { config: n == null ? void 0 : n.value });
    },
  });
  const uO = Je({
      model: Object,
      rules: { type: Se(Object) },
      labelPosition: {
        type: String,
        values: ["left", "right", "top"],
        default: "right",
      },
      requireAsteriskPosition: {
        type: String,
        values: ["left", "right"],
        default: "left",
      },
      labelWidth: { type: [String, Number], default: "" },
      labelSuffix: { type: String, default: "" },
      inline: Boolean,
      inlineMessage: Boolean,
      statusIcon: Boolean,
      showMessage: { type: Boolean, default: !0 },
      size: { type: String, values: ml },
      disabled: Boolean,
      validateOnRuleChange: { type: Boolean, default: !0 },
      hideRequiredAsterisk: { type: Boolean, default: !1 },
      scrollToError: Boolean,
    }),
    cO = { validate: (e, t, n) => (pe(e) || Ee(e)) && ni(t) && Ee(n) };
  function fO() {
    const e = re([]),
      t = M(() => {
        if (!e.value.length) return "0";
        const s = Math.max(...e.value);
        return s ? `${s}px` : "";
      });
    function n(s) {
      const i = e.value.indexOf(s);
      return i === -1 && t.value, i;
    }
    function r(s, i) {
      if (s && i) {
        const a = n(i);
        e.value.splice(a, 1, s);
      } else s && e.value.push(s);
    }
    function o(s) {
      const i = n(s);
      i > -1 && e.value.splice(i, 1);
    }
    return {
      autoLabelWidth: t,
      registerLabelWidth: r,
      deregisterLabelWidth: o,
    };
  }
  const ls = (e, t) => {
      const n = ra(t);
      return n.length > 0 ? e.filter((r) => r.prop && n.includes(r.prop)) : e;
    },
    dO = "ElForm",
    pO = be({ name: dO }),
    hO = be({
      ...pO,
      props: uO,
      emits: cO,
      setup(e, { expose: t, emit: n }) {
        const r = e,
          o = [],
          s = ii(),
          i = De("form"),
          a = M(() => {
            const { labelPosition: w, inline: x } = r;
            return [
              i.b(),
              i.m(s.value || "default"),
              { [i.m(`label-${w}`)]: w, [i.m("inline")]: x },
            ];
          }),
          l = (w) => {
            o.push(w);
          },
          u = (w) => {
            w.prop && o.splice(o.indexOf(w), 1);
          },
          c = (w = []) => {
            r.model && ls(o, w).forEach((x) => x.resetField());
          },
          f = (w = []) => {
            ls(o, w).forEach((x) => x.clearValidate());
          },
          d = M(() => !!r.model),
          p = (w) => {
            if (o.length === 0) return [];
            const x = ls(o, w);
            return x.length ? x : [];
          },
          h = async (w) => _(void 0, w),
          g = async (w = []) => {
            if (!d.value) return !1;
            const x = p(w);
            if (x.length === 0) return !0;
            let E = {};
            for (const I of x)
              try {
                await I.validate("");
              } catch (N) {
                E = { ...E, ...N };
              }
            return Object.keys(E).length === 0 ? !0 : Promise.reject(E);
          },
          _ = async (w = [], x) => {
            const E = !he(x);
            try {
              const I = await g(w);
              return I === !0 && (x == null || x(I)), I;
            } catch (I) {
              if (I instanceof Error) throw I;
              const N = I;
              return (
                r.scrollToError && m(Object.keys(N)[0]),
                x == null || x(!1, N),
                E && Promise.reject(N)
              );
            }
          },
          m = (w) => {
            var x;
            const E = ls(o, w)[0];
            E && ((x = E.$el) == null || x.scrollIntoView());
          };
        return (
          xe(
            () => r.rules,
            () => {
              r.validateOnRuleChange && h().catch((w) => void 0);
            },
            { deep: !0 }
          ),
          ot(
            Yr,
            ft({
              ...Wa(r),
              emit: n,
              resetFields: c,
              clearValidate: f,
              validateField: _,
              addField: l,
              removeField: u,
              ...fO(),
            })
          ),
          t({
            validate: h,
            validateField: _,
            resetFields: c,
            clearValidate: f,
            scrollToField: m,
          }),
          (w, x) => (
            ee(), me("form", { class: _e(y(a)) }, [Ae(w.$slots, "default")], 2)
          )
        );
      },
    });
  var gO = Ze(hO, [
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/form/src/form.vue",
    ],
  ]);
  function er() {
    return (
      (er = Object.assign
        ? Object.assign.bind()
        : function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
            }
            return e;
          }),
      er.apply(this, arguments)
    );
  }
  function mO(e, t) {
    (e.prototype = Object.create(t.prototype)),
      (e.prototype.constructor = e),
      jo(e, t);
  }
  function va(e) {
    return (
      (va = Object.setPrototypeOf
        ? Object.getPrototypeOf.bind()
        : function (n) {
            return n.__proto__ || Object.getPrototypeOf(n);
          }),
      va(e)
    );
  }
  function jo(e, t) {
    return (
      (jo = Object.setPrototypeOf
        ? Object.setPrototypeOf.bind()
        : function (r, o) {
            return (r.__proto__ = o), r;
          }),
      jo(e, t)
    );
  }
  function vO() {
    if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
      return !1;
    if (typeof Proxy == "function") return !0;
    try {
      return (
        Boolean.prototype.valueOf.call(
          Reflect.construct(Boolean, [], function () {})
        ),
        !0
      );
    } catch {
      return !1;
    }
  }
  function ws(e, t, n) {
    return (
      vO()
        ? (ws = Reflect.construct.bind())
        : (ws = function (o, s, i) {
            var a = [null];
            a.push.apply(a, s);
            var l = Function.bind.apply(o, a),
              u = new l();
            return i && jo(u, i.prototype), u;
          }),
      ws.apply(null, arguments)
    );
  }
  function yO(e) {
    return Function.toString.call(e).indexOf("[native code]") !== -1;
  }
  function ya(e) {
    var t = typeof Map == "function" ? new Map() : void 0;
    return (
      (ya = function (r) {
        if (r === null || !yO(r)) return r;
        if (typeof r != "function")
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        if (typeof t < "u") {
          if (t.has(r)) return t.get(r);
          t.set(r, o);
        }
        function o() {
          return ws(r, arguments, va(this).constructor);
        }
        return (
          (o.prototype = Object.create(r.prototype, {
            constructor: {
              value: o,
              enumerable: !1,
              writable: !0,
              configurable: !0,
            },
          })),
          jo(o, r)
        );
      }),
      ya(e)
    );
  }
  var bO = /%[sdj%]/g,
    _O = function () {};
  typeof process < "u" && process.env;
  function ba(e) {
    if (!e || !e.length) return null;
    var t = {};
    return (
      e.forEach(function (n) {
        var r = n.field;
        (t[r] = t[r] || []), t[r].push(n);
      }),
      t
    );
  }
  function St(e) {
    for (
      var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
      r < t;
      r++
    )
      n[r - 1] = arguments[r];
    var o = 0,
      s = n.length;
    if (typeof e == "function") return e.apply(null, n);
    if (typeof e == "string") {
      var i = e.replace(bO, function (a) {
        if (a === "%%") return "%";
        if (o >= s) return a;
        switch (a) {
          case "%s":
            return String(n[o++]);
          case "%d":
            return Number(n[o++]);
          case "%j":
            try {
              return JSON.stringify(n[o++]);
            } catch {
              return "[Circular]";
            }
            break;
          default:
            return a;
        }
      });
      return i;
    }
    return e;
  }
  function wO(e) {
    return (
      e === "string" ||
      e === "url" ||
      e === "hex" ||
      e === "email" ||
      e === "date" ||
      e === "pattern"
    );
  }
  function Qe(e, t) {
    return !!(
      e == null ||
      (t === "array" && Array.isArray(e) && !e.length) ||
      (wO(t) && typeof e == "string" && !e)
    );
  }
  function xO(e, t, n) {
    var r = [],
      o = 0,
      s = e.length;
    function i(a) {
      r.push.apply(r, a || []), o++, o === s && n(r);
    }
    e.forEach(function (a) {
      t(a, i);
    });
  }
  function Vc(e, t, n) {
    var r = 0,
      o = e.length;
    function s(i) {
      if (i && i.length) {
        n(i);
        return;
      }
      var a = r;
      (r = r + 1), a < o ? t(e[a], s) : n([]);
    }
    s([]);
  }
  function EO(e) {
    var t = [];
    return (
      Object.keys(e).forEach(function (n) {
        t.push.apply(t, e[n] || []);
      }),
      t
    );
  }
  var Wc = (function (e) {
    mO(t, e);
    function t(n, r) {
      var o;
      return (
        (o = e.call(this, "Async Validation Error") || this),
        (o.errors = n),
        (o.fields = r),
        o
      );
    }
    return t;
  })(ya(Error));
  function SO(e, t, n, r, o) {
    if (t.first) {
      var s = new Promise(function (d, p) {
        var h = function (m) {
            return r(m), m.length ? p(new Wc(m, ba(m))) : d(o);
          },
          g = EO(e);
        Vc(g, n, h);
      });
      return (
        s.catch(function (d) {
          return d;
        }),
        s
      );
    }
    var i = t.firstFields === !0 ? Object.keys(e) : t.firstFields || [],
      a = Object.keys(e),
      l = a.length,
      u = 0,
      c = [],
      f = new Promise(function (d, p) {
        var h = function (_) {
          if ((c.push.apply(c, _), u++, u === l))
            return r(c), c.length ? p(new Wc(c, ba(c))) : d(o);
        };
        a.length || (r(c), d(o)),
          a.forEach(function (g) {
            var _ = e[g];
            i.indexOf(g) !== -1 ? Vc(_, n, h) : xO(_, n, h);
          });
      });
    return (
      f.catch(function (d) {
        return d;
      }),
      f
    );
  }
  function OO(e) {
    return !!(e && e.message !== void 0);
  }
  function TO(e, t) {
    for (var n = e, r = 0; r < t.length; r++) {
      if (n == null) return n;
      n = n[t[r]];
    }
    return n;
  }
  function Kc(e, t) {
    return function (n) {
      var r;
      return (
        e.fullFields
          ? (r = TO(t, e.fullFields))
          : (r = t[n.field || e.fullField]),
        OO(n)
          ? ((n.field = n.field || e.fullField), (n.fieldValue = r), n)
          : {
              message: typeof n == "function" ? n() : n,
              fieldValue: r,
              field: n.field || e.fullField,
            }
      );
    };
  }
  function Gc(e, t) {
    if (t) {
      for (var n in t)
        if (t.hasOwnProperty(n)) {
          var r = t[n];
          typeof r == "object" && typeof e[n] == "object"
            ? (e[n] = er({}, e[n], r))
            : (e[n] = r);
        }
    }
    return e;
  }
  var ph = function (t, n, r, o, s, i) {
      t.required &&
        (!r.hasOwnProperty(t.field) || Qe(n, i || t.type)) &&
        o.push(St(s.messages.required, t.fullField));
    },
    $O = function (t, n, r, o, s) {
      (/^\s+$/.test(n) || n === "") &&
        o.push(St(s.messages.whitespace, t.fullField));
    },
    us,
    CO = function () {
      if (us) return us;
      var e = "[a-fA-F\\d:]",
        t = function (E) {
          return E && E.includeBoundaries
            ? "(?:(?<=\\s|^)(?=" + e + ")|(?<=" + e + ")(?=\\s|$))"
            : "";
        },
        n =
          "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}",
        r = "[a-fA-F\\d]{1,4}",
        o = (
          `
(?:
(?:` +
          r +
          ":){7}(?:" +
          r +
          `|:)|                                    // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8
(?:` +
          r +
          ":){6}(?:" +
          n +
          "|:" +
          r +
          `|:)|                             // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4
(?:` +
          r +
          ":){5}(?::" +
          n +
          "|(?::" +
          r +
          `){1,2}|:)|                   // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4
(?:` +
          r +
          ":){4}(?:(?::" +
          r +
          "){0,1}:" +
          n +
          "|(?::" +
          r +
          `){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4
(?:` +
          r +
          ":){3}(?:(?::" +
          r +
          "){0,2}:" +
          n +
          "|(?::" +
          r +
          `){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4
(?:` +
          r +
          ":){2}(?:(?::" +
          r +
          "){0,3}:" +
          n +
          "|(?::" +
          r +
          `){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4
(?:` +
          r +
          ":){1}(?:(?::" +
          r +
          "){0,4}:" +
          n +
          "|(?::" +
          r +
          `){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4
(?::(?:(?::` +
          r +
          "){0,5}:" +
          n +
          "|(?::" +
          r +
          `){1,7}|:))             // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4
)(?:%[0-9a-zA-Z]{1,})?                                             // %eth0            %1
`
        )
          .replace(/\s*\/\/.*$/gm, "")
          .replace(/\n/g, "")
          .trim(),
        s = new RegExp("(?:^" + n + "$)|(?:^" + o + "$)"),
        i = new RegExp("^" + n + "$"),
        a = new RegExp("^" + o + "$"),
        l = function (E) {
          return E && E.exact
            ? s
            : new RegExp(
                "(?:" + t(E) + n + t(E) + ")|(?:" + t(E) + o + t(E) + ")",
                "g"
              );
        };
      (l.v4 = function (x) {
        return x && x.exact ? i : new RegExp("" + t(x) + n + t(x), "g");
      }),
        (l.v6 = function (x) {
          return x && x.exact ? a : new RegExp("" + t(x) + o + t(x), "g");
        });
      var u = "(?:(?:[a-z]+:)?//)",
        c = "(?:\\S+(?::\\S*)?@)?",
        f = l.v4().source,
        d = l.v6().source,
        p = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)",
        h = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*",
        g = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))",
        _ = "(?::\\d{2,5})?",
        m = '(?:[/?#][^\\s"]*)?',
        w =
          "(?:" +
          u +
          "|www\\.)" +
          c +
          "(?:localhost|" +
          f +
          "|" +
          d +
          "|" +
          p +
          h +
          g +
          ")" +
          _ +
          m;
      return (us = new RegExp("(?:^" + w + "$)", "i")), us;
    },
    Jc = {
      email:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
      hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i,
    },
    fo = {
      integer: function (t) {
        return fo.number(t) && parseInt(t, 10) === t;
      },
      float: function (t) {
        return fo.number(t) && !fo.integer(t);
      },
      array: function (t) {
        return Array.isArray(t);
      },
      regexp: function (t) {
        if (t instanceof RegExp) return !0;
        try {
          return !!new RegExp(t);
        } catch {
          return !1;
        }
      },
      date: function (t) {
        return (
          typeof t.getTime == "function" &&
          typeof t.getMonth == "function" &&
          typeof t.getYear == "function" &&
          !isNaN(t.getTime())
        );
      },
      number: function (t) {
        return isNaN(t) ? !1 : typeof t == "number";
      },
      object: function (t) {
        return typeof t == "object" && !fo.array(t);
      },
      method: function (t) {
        return typeof t == "function";
      },
      email: function (t) {
        return typeof t == "string" && t.length <= 320 && !!t.match(Jc.email);
      },
      url: function (t) {
        return typeof t == "string" && t.length <= 2048 && !!t.match(CO());
      },
      hex: function (t) {
        return typeof t == "string" && !!t.match(Jc.hex);
      },
    },
    AO = function (t, n, r, o, s) {
      if (t.required && n === void 0) {
        ph(t, n, r, o, s);
        return;
      }
      var i = [
          "integer",
          "float",
          "array",
          "regexp",
          "object",
          "method",
          "email",
          "number",
          "date",
          "url",
          "hex",
        ],
        a = t.type;
      i.indexOf(a) > -1
        ? fo[a](n) || o.push(St(s.messages.types[a], t.fullField, t.type))
        : a &&
          typeof n !== t.type &&
          o.push(St(s.messages.types[a], t.fullField, t.type));
    },
    kO = function (t, n, r, o, s) {
      var i = typeof t.len == "number",
        a = typeof t.min == "number",
        l = typeof t.max == "number",
        u = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
        c = n,
        f = null,
        d = typeof n == "number",
        p = typeof n == "string",
        h = Array.isArray(n);
      if ((d ? (f = "number") : p ? (f = "string") : h && (f = "array"), !f))
        return !1;
      h && (c = n.length),
        p && (c = n.replace(u, "_").length),
        i
          ? c !== t.len && o.push(St(s.messages[f].len, t.fullField, t.len))
          : a && !l && c < t.min
          ? o.push(St(s.messages[f].min, t.fullField, t.min))
          : l && !a && c > t.max
          ? o.push(St(s.messages[f].max, t.fullField, t.max))
          : a &&
            l &&
            (c < t.min || c > t.max) &&
            o.push(St(s.messages[f].range, t.fullField, t.min, t.max));
    },
    vr = "enum",
    PO = function (t, n, r, o, s) {
      (t[vr] = Array.isArray(t[vr]) ? t[vr] : []),
        t[vr].indexOf(n) === -1 &&
          o.push(St(s.messages[vr], t.fullField, t[vr].join(", ")));
    },
    RO = function (t, n, r, o, s) {
      if (t.pattern) {
        if (t.pattern instanceof RegExp)
          (t.pattern.lastIndex = 0),
            t.pattern.test(n) ||
              o.push(
                St(s.messages.pattern.mismatch, t.fullField, n, t.pattern)
              );
        else if (typeof t.pattern == "string") {
          var i = new RegExp(t.pattern);
          i.test(n) ||
            o.push(St(s.messages.pattern.mismatch, t.fullField, n, t.pattern));
        }
      }
    },
    $e = {
      required: ph,
      whitespace: $O,
      type: AO,
      range: kO,
      enum: PO,
      pattern: RO,
    },
    MO = function (t, n, r, o, s) {
      var i = [],
        a = t.required || (!t.required && o.hasOwnProperty(t.field));
      if (a) {
        if (Qe(n, "string") && !t.required) return r();
        $e.required(t, n, o, i, s, "string"),
          Qe(n, "string") ||
            ($e.type(t, n, o, i, s),
            $e.range(t, n, o, i, s),
            $e.pattern(t, n, o, i, s),
            t.whitespace === !0 && $e.whitespace(t, n, o, i, s));
      }
      r(i);
    },
    IO = function (t, n, r, o, s) {
      var i = [],
        a = t.required || (!t.required && o.hasOwnProperty(t.field));
      if (a) {
        if (Qe(n) && !t.required) return r();
        $e.required(t, n, o, i, s), n !== void 0 && $e.type(t, n, o, i, s);
      }
      r(i);
    },
    FO = function (t, n, r, o, s) {
      var i = [],
        a = t.required || (!t.required && o.hasOwnProperty(t.field));
      if (a) {
        if ((n === "" && (n = void 0), Qe(n) && !t.required)) return r();
        $e.required(t, n, o, i, s),
          n !== void 0 && ($e.type(t, n, o, i, s), $e.range(t, n, o, i, s));
      }
      r(i);
    },
    NO = function (t, n, r, o, s) {
      var i = [],
        a = t.required || (!t.required && o.hasOwnProperty(t.field));
      if (a) {
        if (Qe(n) && !t.required) return r();
        $e.required(t, n, o, i, s), n !== void 0 && $e.type(t, n, o, i, s);
      }
      r(i);
    },
    LO = function (t, n, r, o, s) {
      var i = [],
        a = t.required || (!t.required && o.hasOwnProperty(t.field));
      if (a) {
        if (Qe(n) && !t.required) return r();
        $e.required(t, n, o, i, s), Qe(n) || $e.type(t, n, o, i, s);
      }
      r(i);
    },
    jO = function (t, n, r, o, s) {
      var i = [],
        a = t.required || (!t.required && o.hasOwnProperty(t.field));
      if (a) {
        if (Qe(n) && !t.required) return r();
        $e.required(t, n, o, i, s),
          n !== void 0 && ($e.type(t, n, o, i, s), $e.range(t, n, o, i, s));
      }
      r(i);
    },
    BO = function (t, n, r, o, s) {
      var i = [],
        a = t.required || (!t.required && o.hasOwnProperty(t.field));
      if (a) {
        if (Qe(n) && !t.required) return r();
        $e.required(t, n, o, i, s),
          n !== void 0 && ($e.type(t, n, o, i, s), $e.range(t, n, o, i, s));
      }
      r(i);
    },
    DO = function (t, n, r, o, s) {
      var i = [],
        a = t.required || (!t.required && o.hasOwnProperty(t.field));
      if (a) {
        if (n == null && !t.required) return r();
        $e.required(t, n, o, i, s, "array"),
          n != null && ($e.type(t, n, o, i, s), $e.range(t, n, o, i, s));
      }
      r(i);
    },
    zO = function (t, n, r, o, s) {
      var i = [],
        a = t.required || (!t.required && o.hasOwnProperty(t.field));
      if (a) {
        if (Qe(n) && !t.required) return r();
        $e.required(t, n, o, i, s), n !== void 0 && $e.type(t, n, o, i, s);
      }
      r(i);
    },
    HO = "enum",
    UO = function (t, n, r, o, s) {
      var i = [],
        a = t.required || (!t.required && o.hasOwnProperty(t.field));
      if (a) {
        if (Qe(n) && !t.required) return r();
        $e.required(t, n, o, i, s), n !== void 0 && $e[HO](t, n, o, i, s);
      }
      r(i);
    },
    qO = function (t, n, r, o, s) {
      var i = [],
        a = t.required || (!t.required && o.hasOwnProperty(t.field));
      if (a) {
        if (Qe(n, "string") && !t.required) return r();
        $e.required(t, n, o, i, s),
          Qe(n, "string") || $e.pattern(t, n, o, i, s);
      }
      r(i);
    },
    VO = function (t, n, r, o, s) {
      var i = [],
        a = t.required || (!t.required && o.hasOwnProperty(t.field));
      if (a) {
        if (Qe(n, "date") && !t.required) return r();
        if (($e.required(t, n, o, i, s), !Qe(n, "date"))) {
          var l;
          n instanceof Date ? (l = n) : (l = new Date(n)),
            $e.type(t, l, o, i, s),
            l && $e.range(t, l.getTime(), o, i, s);
        }
      }
      r(i);
    },
    WO = function (t, n, r, o, s) {
      var i = [],
        a = Array.isArray(n) ? "array" : typeof n;
      $e.required(t, n, o, i, s, a), r(i);
    },
    Mi = function (t, n, r, o, s) {
      var i = t.type,
        a = [],
        l = t.required || (!t.required && o.hasOwnProperty(t.field));
      if (l) {
        if (Qe(n, i) && !t.required) return r();
        $e.required(t, n, o, a, s, i), Qe(n, i) || $e.type(t, n, o, a, s);
      }
      r(a);
    },
    KO = function (t, n, r, o, s) {
      var i = [],
        a = t.required || (!t.required && o.hasOwnProperty(t.field));
      if (a) {
        if (Qe(n) && !t.required) return r();
        $e.required(t, n, o, i, s);
      }
      r(i);
    },
    _o = {
      string: MO,
      method: IO,
      number: FO,
      boolean: NO,
      regexp: LO,
      integer: jO,
      float: BO,
      array: DO,
      object: zO,
      enum: UO,
      pattern: qO,
      date: VO,
      url: Mi,
      hex: Mi,
      email: Mi,
      required: WO,
      any: KO,
    };
  function _a() {
    return {
      default: "Validation error on field %s",
      required: "%s is required",
      enum: "%s must be one of %s",
      whitespace: "%s cannot be empty",
      date: {
        format: "%s date %s is invalid for format %s",
        parse: "%s date could not be parsed, %s is invalid ",
        invalid: "%s date %s is invalid",
      },
      types: {
        string: "%s is not a %s",
        method: "%s is not a %s (function)",
        array: "%s is not an %s",
        object: "%s is not an %s",
        number: "%s is not a %s",
        date: "%s is not a %s",
        boolean: "%s is not a %s",
        integer: "%s is not an %s",
        float: "%s is not a %s",
        regexp: "%s is not a valid %s",
        email: "%s is not a valid %s",
        url: "%s is not a valid %s",
        hex: "%s is not a valid %s",
      },
      string: {
        len: "%s must be exactly %s characters",
        min: "%s must be at least %s characters",
        max: "%s cannot be longer than %s characters",
        range: "%s must be between %s and %s characters",
      },
      number: {
        len: "%s must equal %s",
        min: "%s cannot be less than %s",
        max: "%s cannot be greater than %s",
        range: "%s must be between %s and %s",
      },
      array: {
        len: "%s must be exactly %s in length",
        min: "%s cannot be less than %s in length",
        max: "%s cannot be greater than %s in length",
        range: "%s must be between %s and %s in length",
      },
      pattern: { mismatch: "%s value %s does not match pattern %s" },
      clone: function () {
        var t = JSON.parse(JSON.stringify(this));
        return (t.clone = this.clone), t;
      },
    };
  }
  var wa = _a(),
    Vo = (function () {
      function e(n) {
        (this.rules = null), (this._messages = wa), this.define(n);
      }
      var t = e.prototype;
      return (
        (t.define = function (r) {
          var o = this;
          if (!r) throw new Error("Cannot configure a schema with no rules");
          if (typeof r != "object" || Array.isArray(r))
            throw new Error("Rules must be an object");
          (this.rules = {}),
            Object.keys(r).forEach(function (s) {
              var i = r[s];
              o.rules[s] = Array.isArray(i) ? i : [i];
            });
        }),
        (t.messages = function (r) {
          return r && (this._messages = Gc(_a(), r)), this._messages;
        }),
        (t.validate = function (r, o, s) {
          var i = this;
          o === void 0 && (o = {}), s === void 0 && (s = function () {});
          var a = r,
            l = o,
            u = s;
          if (
            (typeof l == "function" && ((u = l), (l = {})),
            !this.rules || Object.keys(this.rules).length === 0)
          )
            return u && u(null, a), Promise.resolve(a);
          function c(g) {
            var _ = [],
              m = {};
            function w(E) {
              if (Array.isArray(E)) {
                var I;
                _ = (I = _).concat.apply(I, E);
              } else _.push(E);
            }
            for (var x = 0; x < g.length; x++) w(g[x]);
            _.length ? ((m = ba(_)), u(_, m)) : u(null, a);
          }
          if (l.messages) {
            var f = this.messages();
            f === wa && (f = _a()), Gc(f, l.messages), (l.messages = f);
          } else l.messages = this.messages();
          var d = {},
            p = l.keys || Object.keys(this.rules);
          p.forEach(function (g) {
            var _ = i.rules[g],
              m = a[g];
            _.forEach(function (w) {
              var x = w;
              typeof x.transform == "function" &&
                (a === r && (a = er({}, a)), (m = a[g] = x.transform(m))),
                typeof x == "function"
                  ? (x = { validator: x })
                  : (x = er({}, x)),
                (x.validator = i.getValidationMethod(x)),
                x.validator &&
                  ((x.field = g),
                  (x.fullField = x.fullField || g),
                  (x.type = i.getType(x)),
                  (d[g] = d[g] || []),
                  d[g].push({ rule: x, value: m, source: a, field: g }));
            });
          });
          var h = {};
          return SO(
            d,
            l,
            function (g, _) {
              var m = g.rule,
                w =
                  (m.type === "object" || m.type === "array") &&
                  (typeof m.fields == "object" ||
                    typeof m.defaultField == "object");
              (w = w && (m.required || (!m.required && g.value))),
                (m.field = g.field);
              function x(N, D) {
                return er({}, D, {
                  fullField: m.fullField + "." + N,
                  fullFields: m.fullFields ? [].concat(m.fullFields, [N]) : [N],
                });
              }
              function E(N) {
                N === void 0 && (N = []);
                var D = Array.isArray(N) ? N : [N];
                !l.suppressWarning &&
                  D.length &&
                  e.warning("async-validator:", D),
                  D.length &&
                    m.message !== void 0 &&
                    (D = [].concat(m.message));
                var T = D.map(Kc(m, a));
                if (l.first && T.length) return (h[m.field] = 1), _(T);
                if (!w) _(T);
                else {
                  if (m.required && !g.value)
                    return (
                      m.message !== void 0
                        ? (T = [].concat(m.message).map(Kc(m, a)))
                        : l.error &&
                          (T = [l.error(m, St(l.messages.required, m.field))]),
                      _(T)
                    );
                  var H = {};
                  m.defaultField &&
                    Object.keys(g.value).map(function ($) {
                      H[$] = m.defaultField;
                    }),
                    (H = er({}, H, g.rule.fields));
                  var S = {};
                  Object.keys(H).forEach(function ($) {
                    var F = H[$],
                      L = Array.isArray(F) ? F : [F];
                    S[$] = L.map(x.bind(null, $));
                  });
                  var U = new e(S);
                  U.messages(l.messages),
                    g.rule.options &&
                      ((g.rule.options.messages = l.messages),
                      (g.rule.options.error = l.error)),
                    U.validate(g.value, g.rule.options || l, function ($) {
                      var F = [];
                      T && T.length && F.push.apply(F, T),
                        $ && $.length && F.push.apply(F, $),
                        _(F.length ? F : null);
                    });
                }
              }
              var I;
              if (m.asyncValidator)
                I = m.asyncValidator(m, g.value, E, g.source, l);
              else if (m.validator) {
                try {
                  I = m.validator(m, g.value, E, g.source, l);
                } catch (N) {
                  console.error == null || console.error(N),
                    l.suppressValidatorError ||
                      setTimeout(function () {
                        throw N;
                      }, 0),
                    E(N.message);
                }
                I === !0
                  ? E()
                  : I === !1
                  ? E(
                      typeof m.message == "function"
                        ? m.message(m.fullField || m.field)
                        : m.message || (m.fullField || m.field) + " fails"
                    )
                  : I instanceof Array
                  ? E(I)
                  : I instanceof Error && E(I.message);
              }
              I &&
                I.then &&
                I.then(
                  function () {
                    return E();
                  },
                  function (N) {
                    return E(N);
                  }
                );
            },
            function (g) {
              c(g);
            },
            a
          );
        }),
        (t.getType = function (r) {
          if (
            (r.type === void 0 &&
              r.pattern instanceof RegExp &&
              (r.type = "pattern"),
            typeof r.validator != "function" &&
              r.type &&
              !_o.hasOwnProperty(r.type))
          )
            throw new Error(St("Unknown rule type %s", r.type));
          return r.type || "string";
        }),
        (t.getValidationMethod = function (r) {
          if (typeof r.validator == "function") return r.validator;
          var o = Object.keys(r),
            s = o.indexOf("message");
          return (
            s !== -1 && o.splice(s, 1),
            o.length === 1 && o[0] === "required"
              ? _o.required
              : _o[this.getType(r)] || void 0
          );
        }),
        e
      );
    })();
  Vo.register = function (t, n) {
    if (typeof n != "function")
      throw new Error(
        "Cannot register a validator by type, validator is not a function"
      );
    _o[t] = n;
  };
  Vo.warning = _O;
  Vo.messages = wa;
  Vo.validators = _o;
  const GO = ["", "error", "validating", "success"],
    JO = Je({
      label: String,
      labelWidth: { type: [String, Number], default: "" },
      prop: { type: Se([String, Array]) },
      required: { type: Boolean, default: void 0 },
      rules: { type: Se([Object, Array]) },
      error: String,
      validateStatus: { type: String, values: GO },
      for: String,
      inlineMessage: { type: [String, Boolean], default: "" },
      showMessage: { type: Boolean, default: !0 },
      size: { type: String, values: ml },
    }),
    Zc = "ElLabelWrap";
  var ZO = be({
    name: Zc,
    props: { isAutoWidth: Boolean, updateAll: Boolean },
    setup(e, { slots: t }) {
      const n = Pe(Yr, void 0),
        r = Pe(ar);
      r || Fo(Zc, "usage: <el-form-item><label-wrap /></el-form-item>");
      const o = De("form"),
        s = re(),
        i = re(0),
        a = () => {
          var c;
          if ((c = s.value) != null && c.firstElementChild) {
            const f = window.getComputedStyle(s.value.firstElementChild).width;
            return Math.ceil(Number.parseFloat(f));
          } else return 0;
        },
        l = (c = "update") => {
          at(() => {
            t.default &&
              e.isAutoWidth &&
              (c === "update"
                ? (i.value = a())
                : c === "remove" &&
                  (n == null || n.deregisterLabelWidth(i.value)));
          });
        },
        u = () => l("update");
      return (
        Ge(() => {
          u();
        }),
        bt(() => {
          l("remove");
        }),
        Ya(() => u()),
        xe(i, (c, f) => {
          e.updateAll && (n == null || n.registerLabelWidth(c, f));
        }),
        oi(
          M(() => {
            var c, f;
            return (f = (c = s.value) == null ? void 0 : c.firstElementChild) !=
              null
              ? f
              : null;
          }),
          u
        ),
        () => {
          var c, f;
          if (!t) return null;
          const { isAutoWidth: d } = e;
          if (d) {
            const p = n == null ? void 0 : n.autoLabelWidth,
              h = r == null ? void 0 : r.hasLabel,
              g = {};
            if (h && p && p !== "auto") {
              const _ = Math.max(0, Number.parseInt(p, 10) - i.value),
                m = n.labelPosition === "left" ? "marginRight" : "marginLeft";
              _ && (g[m] = `${_}px`);
            }
            return ve(
              "div",
              { ref: s, class: [o.be("item", "label-wrap")], style: g },
              [(c = t.default) == null ? void 0 : c.call(t)]
            );
          } else
            return ve(We, { ref: s }, [
              (f = t.default) == null ? void 0 : f.call(t),
            ]);
        }
      );
    },
  });
  const YO = ["role", "aria-labelledby"],
    QO = be({ name: "ElFormItem" }),
    XO = be({
      ...QO,
      props: JO,
      setup(e, { expose: t }) {
        const n = e,
          r = ol(),
          o = Pe(Yr, void 0),
          s = Pe(ar, void 0),
          i = ii(void 0, { formItem: !1 }),
          a = De("form-item"),
          l = El().value,
          u = re([]),
          c = re(""),
          f = T1(c, 100),
          d = re(""),
          p = re();
        let h,
          g = !1;
        const _ = M(() => {
            if ((o == null ? void 0 : o.labelPosition) === "top") return {};
            const A = ca(
              n.labelWidth || (o == null ? void 0 : o.labelWidth) || ""
            );
            return A ? { width: A } : {};
          }),
          m = M(() => {
            if (
              (o == null ? void 0 : o.labelPosition) === "top" ||
              (o != null && o.inline)
            )
              return {};
            if (!n.label && !n.labelWidth && H) return {};
            const A = ca(
              n.labelWidth || (o == null ? void 0 : o.labelWidth) || ""
            );
            return !n.label && !r.label ? { marginLeft: A } : {};
          }),
          w = M(() => [
            a.b(),
            a.m(i.value),
            a.is("error", c.value === "error"),
            a.is("validating", c.value === "validating"),
            a.is("success", c.value === "success"),
            a.is("required", L.value || n.required),
            a.is("no-asterisk", o == null ? void 0 : o.hideRequiredAsterisk),
            (o == null ? void 0 : o.requireAsteriskPosition) === "right"
              ? "asterisk-right"
              : "asterisk-left",
            { [a.m("feedback")]: o == null ? void 0 : o.statusIcon },
          ]),
          x = M(() =>
            ni(n.inlineMessage)
              ? n.inlineMessage
              : (o == null ? void 0 : o.inlineMessage) || !1
          ),
          E = M(() => [a.e("error"), { [a.em("error", "inline")]: x.value }]),
          I = M(() => (n.prop ? (Ee(n.prop) ? n.prop : n.prop.join(".")) : "")),
          N = M(() => !!(n.label || r.label)),
          D = M(() => (n.for || u.value.length === 1 ? u.value[0] : void 0)),
          T = M(() => !D.value && N.value),
          H = !!s,
          S = M(() => {
            const A = o == null ? void 0 : o.model;
            if (!(!A || !n.prop)) return $i(A, n.prop).value;
          }),
          U = M(() => {
            const { required: A } = n,
              K = [];
            n.rules && K.push(...ra(n.rules));
            const ne = o == null ? void 0 : o.rules;
            if (ne && n.prop) {
              const ue = $i(ne, n.prop).value;
              ue && K.push(...ra(ue));
            }
            if (A !== void 0) {
              const ue = K.map((ae, v) => [ae, v]).filter(([ae]) =>
                Object.keys(ae).includes("required")
              );
              if (ue.length > 0)
                for (const [ae, v] of ue)
                  ae.required !== A && (K[v] = { ...ae, required: A });
              else K.push({ required: A });
            }
            return K;
          }),
          $ = M(() => U.value.length > 0),
          F = (A) =>
            U.value
              .filter((ne) =>
                !ne.trigger || !A
                  ? !0
                  : Array.isArray(ne.trigger)
                  ? ne.trigger.includes(A)
                  : ne.trigger === A
              )
              .map(({ trigger: ne, ...ue }) => ue),
          L = M(() => U.value.some((A) => A.required)),
          O = M(() => {
            var A;
            return (
              f.value === "error" &&
              n.showMessage &&
              ((A = o == null ? void 0 : o.showMessage) != null ? A : !0)
            );
          }),
          z = M(
            () =>
              `${n.label || ""}${(o == null ? void 0 : o.labelSuffix) || ""}`
          ),
          k = (A) => {
            c.value = A;
          },
          G = (A) => {
            var K, ne;
            const { errors: ue, fields: ae } = A;
            (!ue || !ae) && console.error(A),
              k("error"),
              (d.value = ue
                ? (ne =
                    (K = ue == null ? void 0 : ue[0]) == null
                      ? void 0
                      : K.message) != null
                  ? ne
                  : `${n.prop} is required`
                : ""),
              o == null || o.emit("validate", n.prop, !1, d.value);
          },
          W = () => {
            k("success"), o == null || o.emit("validate", n.prop, !0, "");
          },
          oe = async (A) => {
            const K = I.value;
            return new Vo({ [K]: A })
              .validate({ [K]: S.value }, { firstFields: !0 })
              .then(() => (W(), !0))
              .catch((ue) => (G(ue), Promise.reject(ue)));
          },
          le = async (A, K) => {
            if (g || !n.prop) return !1;
            const ne = he(K);
            if (!$.value) return K == null || K(!1), !1;
            const ue = F(A);
            return ue.length === 0
              ? (K == null || K(!0), !0)
              : (k("validating"),
                oe(ue)
                  .then(() => (K == null || K(!0), !0))
                  .catch((ae) => {
                    const { fields: v } = ae;
                    return K == null || K(!1, v), ne ? !1 : Promise.reject(v);
                  }));
          },
          fe = () => {
            k(""), (d.value = ""), (g = !1);
          },
          Oe = async () => {
            const A = o == null ? void 0 : o.model;
            if (!A || !n.prop) return;
            const K = $i(A, n.prop);
            (g = !0), (K.value = oc(h)), await at(), fe(), (g = !1);
          },
          Le = (A) => {
            u.value.includes(A) || u.value.push(A);
          },
          P = (A) => {
            u.value = u.value.filter((K) => K !== A);
          };
        xe(
          () => n.error,
          (A) => {
            (d.value = A || ""), k(A ? "error" : "");
          },
          { immediate: !0 }
        ),
          xe(
            () => n.validateStatus,
            (A) => k(A || "")
          );
        const Z = ft({
          ...Wa(n),
          $el: p,
          size: i,
          validateState: c,
          labelId: l,
          inputIds: u,
          isGroup: T,
          hasLabel: N,
          addInputId: Le,
          removeInputId: P,
          resetField: Oe,
          clearValidate: fe,
          validate: le,
        });
        return (
          ot(ar, Z),
          Ge(() => {
            n.prop && (o == null || o.addField(Z), (h = oc(S.value)));
          }),
          bt(() => {
            o == null || o.removeField(Z);
          }),
          t({
            size: i,
            validateMessage: d,
            validateState: c,
            validate: le,
            clearValidate: fe,
            resetField: Oe,
          }),
          (A, K) => {
            var ne;
            return (
              ee(),
              me(
                "div",
                {
                  ref_key: "formItemRef",
                  ref: p,
                  class: _e(y(w)),
                  role: y(T) ? "group" : void 0,
                  "aria-labelledby": y(T) ? y(l) : void 0,
                },
                [
                  ve(
                    y(ZO),
                    {
                      "is-auto-width": y(_).width === "auto",
                      "update-all":
                        ((ne = y(o)) == null ? void 0 : ne.labelWidth) ===
                        "auto",
                    },
                    {
                      default: we(() => [
                        y(N)
                          ? (ee(),
                            Ne(
                              Pn(y(D) ? "label" : "div"),
                              {
                                key: 0,
                                id: y(l),
                                for: y(D),
                                class: _e(y(a).e("label")),
                                style: rn(y(_)),
                              },
                              {
                                default: we(() => [
                                  Ae(A.$slots, "label", { label: y(z) }, () => [
                                    Pt(lt(y(z)), 1),
                                  ]),
                                ]),
                                _: 3,
                              },
                              8,
                              ["id", "for", "class", "style"]
                            ))
                          : Ie("v-if", !0),
                      ]),
                      _: 3,
                    },
                    8,
                    ["is-auto-width", "update-all"]
                  ),
                  ye(
                    "div",
                    { class: _e(y(a).e("content")), style: rn(y(m)) },
                    [
                      Ae(A.$slots, "default"),
                      ve(
                        Kv,
                        { name: `${y(a).namespace.value}-zoom-in-top` },
                        {
                          default: we(() => [
                            y(O)
                              ? Ae(
                                  A.$slots,
                                  "error",
                                  { key: 0, error: d.value },
                                  () => [
                                    ye(
                                      "div",
                                      { class: _e(y(E)) },
                                      lt(d.value),
                                      3
                                    ),
                                  ]
                                )
                              : Ie("v-if", !0),
                          ]),
                          _: 3,
                        },
                        8,
                        ["name"]
                      ),
                    ],
                    6
                  ),
                ],
                10,
                YO
              )
            );
          }
        );
      },
    });
  var hh = Ze(XO, [
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/form/src/form-item.vue",
    ],
  ]);
  const gh = _n(gO, { FormItem: hh }),
    mh = Ho(hh);
  let eT = class {
      constructor(t, n) {
        (this.parent = t),
          (this.domNode = n),
          (this.subIndex = 0),
          (this.subIndex = 0),
          this.init();
      }
      init() {
        (this.subMenuItems = this.domNode.querySelectorAll("li")),
          this.addListeners();
      }
      gotoSubIndex(t) {
        t === this.subMenuItems.length
          ? (t = 0)
          : t < 0 && (t = this.subMenuItems.length - 1),
          this.subMenuItems[t].focus(),
          (this.subIndex = t);
      }
      addListeners() {
        const t = this.parent.domNode;
        Array.prototype.forEach.call(this.subMenuItems, (n) => {
          n.addEventListener("keydown", (r) => {
            let o = !1;
            switch (r.code) {
              case pt.down: {
                this.gotoSubIndex(this.subIndex + 1), (o = !0);
                break;
              }
              case pt.up: {
                this.gotoSubIndex(this.subIndex - 1), (o = !0);
                break;
              }
              case pt.tab: {
                vs(t, "mouseleave");
                break;
              }
              case pt.enter:
              case pt.space: {
                (o = !0), r.currentTarget.click();
                break;
              }
            }
            return o && (r.preventDefault(), r.stopPropagation()), !1;
          });
        });
      }
    },
    tT = class {
      constructor(t, n) {
        (this.domNode = t),
          (this.submenu = null),
          (this.submenu = null),
          this.init(n);
      }
      init(t) {
        this.domNode.setAttribute("tabindex", "0");
        const n = this.domNode.querySelector(`.${t}-menu`);
        n && (this.submenu = new eT(this, n)), this.addListeners();
      }
      addListeners() {
        this.domNode.addEventListener("keydown", (t) => {
          let n = !1;
          switch (t.code) {
            case pt.down: {
              vs(t.currentTarget, "mouseenter"),
                this.submenu && this.submenu.gotoSubIndex(0),
                (n = !0);
              break;
            }
            case pt.up: {
              vs(t.currentTarget, "mouseenter"),
                this.submenu &&
                  this.submenu.gotoSubIndex(
                    this.submenu.subMenuItems.length - 1
                  ),
                (n = !0);
              break;
            }
            case pt.tab: {
              vs(t.currentTarget, "mouseleave");
              break;
            }
            case pt.enter:
            case pt.space: {
              (n = !0), t.currentTarget.click();
              break;
            }
          }
          n && t.preventDefault();
        });
      }
    },
    nT = class {
      constructor(t, n) {
        (this.domNode = t), this.init(n);
      }
      init(t) {
        const n = this.domNode.childNodes;
        Array.from(n).forEach((r) => {
          r.nodeType === 1 && new tT(r, t);
        });
      }
    };
  const rT = be({
    name: "ElMenuCollapseTransition",
    setup() {
      const e = De("menu");
      return {
        listeners: {
          onBeforeEnter: (n) => (n.style.opacity = "0.2"),
          onEnter(n, r) {
            Er(n, `${e.namespace.value}-opacity-transition`),
              (n.style.opacity = "1"),
              r();
          },
          onAfterEnter(n) {
            rr(n, `${e.namespace.value}-opacity-transition`),
              (n.style.opacity = "");
          },
          onBeforeLeave(n) {
            n.dataset || (n.dataset = {}),
              sw(n, e.m("collapse"))
                ? (rr(n, e.m("collapse")),
                  (n.dataset.oldOverflow = n.style.overflow),
                  (n.dataset.scrollWidth = n.clientWidth.toString()),
                  Er(n, e.m("collapse")))
                : (Er(n, e.m("collapse")),
                  (n.dataset.oldOverflow = n.style.overflow),
                  (n.dataset.scrollWidth = n.clientWidth.toString()),
                  rr(n, e.m("collapse"))),
              (n.style.width = `${n.scrollWidth}px`),
              (n.style.overflow = "hidden");
          },
          onLeave(n) {
            Er(n, "horizontal-collapse-transition"),
              (n.style.width = `${n.dataset.scrollWidth}px`);
          },
        },
      };
    },
  });
  function oT(e, t, n, r, o, s) {
    return (
      ee(),
      Ne(
        Dn,
        en({ mode: "out-in" }, e.listeners),
        { default: we(() => [Ae(e.$slots, "default")]), _: 3 },
        16
      )
    );
  }
  var sT = Ze(rT, [
    ["render", oT],
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/menu/src/menu-collapse-transition.vue",
    ],
  ]);
  function vh(e, t) {
    const n = M(() => {
      let o = e.parent;
      const s = [t.value];
      for (; o.type.name !== "ElMenu"; )
        o.props.index && s.unshift(o.props.index), (o = o.parent);
      return s;
    });
    return {
      parentMenu: M(() => {
        let o = e.parent;
        for (; o && !["ElMenu", "ElSubMenu"].includes(o.type.name); )
          o = o.parent;
        return o;
      }),
      indexPath: n,
    };
  }
  function iT(e) {
    return M(() => {
      const n = e.backgroundColor;
      return n ? new ch(n).shade(20).toString() : "";
    });
  }
  const yh = (e, t) => {
      const n = De("menu");
      return M(() =>
        n.cssVarBlock({
          "text-color": e.textColor || "",
          "hover-text-color": e.textColor || "",
          "bg-color": e.backgroundColor || "",
          "hover-bg-color": iT(e).value || "",
          "active-color": e.activeTextColor || "",
          level: `${t}`,
        })
      );
    },
    aT = Je({
      index: { type: String, required: !0 },
      showTimeout: { type: Number, default: 300 },
      hideTimeout: { type: Number, default: 300 },
      popperClass: String,
      disabled: Boolean,
      popperAppendToBody: { type: Boolean, default: void 0 },
      teleported: { type: Boolean, default: void 0 },
      popperOffset: { type: Number, default: 6 },
      expandCloseIcon: { type: dn },
      expandOpenIcon: { type: dn },
      collapseCloseIcon: { type: dn },
      collapseOpenIcon: { type: dn },
    }),
    cs = "ElSubMenu";
  var Nl = be({
    name: cs,
    props: aT,
    setup(e, { slots: t, expose: n }) {
      Np(
        {
          from: "popper-append-to-body",
          replacement: "teleported",
          scope: cs,
          version: "2.3.0",
          ref: "https://element-plus.org/en-US/component/menu.html#submenu-attributes",
        },
        M(() => e.popperAppendToBody !== void 0)
      );
      const r = Ct(),
        { indexPath: o, parentMenu: s } = vh(
          r,
          M(() => e.index)
        ),
        i = De("menu"),
        a = De("sub-menu"),
        l = Pe("rootMenu");
      l || Fo(cs, "can not inject root menu");
      const u = Pe(`subMenu:${s.value.uid}`);
      u || Fo(cs, "can not inject sub menu");
      const c = re({}),
        f = re({});
      let d;
      const p = re(!1),
        h = re(),
        g = re(null),
        _ = M(() =>
          U.value === "horizontal" && w.value ? "bottom-start" : "right-start"
        ),
        m = M(() =>
          (U.value === "horizontal" && w.value) ||
          (U.value === "vertical" && !l.props.collapse)
            ? e.expandCloseIcon && e.expandOpenIcon
              ? N.value
                ? e.expandOpenIcon
                : e.expandCloseIcon
              : fw
            : e.collapseCloseIcon && e.collapseOpenIcon
            ? N.value
              ? e.collapseOpenIcon
              : e.collapseCloseIcon
            : vw
        ),
        w = M(() => u.level === 0),
        x = M(() => {
          var W;
          const oe = (W = e.teleported) != null ? W : e.popperAppendToBody;
          return oe === void 0 ? w.value : oe;
        }),
        E = M(() =>
          l.props.collapse
            ? `${i.namespace.value}-zoom-in-left`
            : `${i.namespace.value}-zoom-in-top`
        ),
        I = M(() =>
          U.value === "horizontal" && w.value
            ? [
                "bottom-start",
                "bottom-end",
                "top-start",
                "top-end",
                "right-start",
                "left-start",
              ]
            : [
                "right-start",
                "left-start",
                "bottom-start",
                "bottom-end",
                "top-start",
                "top-end",
              ]
        ),
        N = M(() => l.openedMenus.includes(e.index)),
        D = M(() => {
          let W = !1;
          return (
            Object.values(c.value).forEach((oe) => {
              oe.active && (W = !0);
            }),
            Object.values(f.value).forEach((oe) => {
              oe.active && (W = !0);
            }),
            W
          );
        }),
        T = M(() => l.props.backgroundColor || ""),
        H = M(() => l.props.activeTextColor || ""),
        S = M(() => l.props.textColor || ""),
        U = M(() => l.props.mode),
        $ = ft({ index: e.index, indexPath: o, active: D }),
        F = M(() =>
          U.value !== "horizontal"
            ? { color: S.value }
            : {
                borderBottomColor: D.value
                  ? l.props.activeTextColor
                    ? H.value
                    : ""
                  : "transparent",
                color: D.value ? H.value : S.value,
              }
        ),
        L = () => {
          var W, oe, le;
          return (le =
            (oe = (W = g.value) == null ? void 0 : W.popperRef) == null
              ? void 0
              : oe.popperInstanceRef) == null
            ? void 0
            : le.destroy();
        },
        O = (W) => {
          W || L();
        },
        z = () => {
          (l.props.menuTrigger === "hover" && l.props.mode === "horizontal") ||
            (l.props.collapse && l.props.mode === "vertical") ||
            e.disabled ||
            l.handleSubMenuClick({
              index: e.index,
              indexPath: o.value,
              active: D.value,
            });
        },
        k = (W, oe = e.showTimeout) => {
          var le;
          W.type !== "focus" &&
            ((l.props.menuTrigger === "click" &&
              l.props.mode === "horizontal") ||
              (!l.props.collapse && l.props.mode === "vertical") ||
              e.disabled ||
              ((u.mouseInChild.value = !0),
              d == null || d(),
              ({ stop: d } = aa(() => {
                l.openMenu(e.index, o.value);
              }, oe)),
              x.value &&
                ((le = s.value.vnode.el) == null ||
                  le.dispatchEvent(new MouseEvent("mouseenter")))));
        },
        G = (W = !1) => {
          var oe, le;
          (l.props.menuTrigger === "click" && l.props.mode === "horizontal") ||
            (!l.props.collapse && l.props.mode === "vertical") ||
            (d == null || d(),
            (u.mouseInChild.value = !1),
            ({ stop: d } = aa(
              () => !p.value && l.closeMenu(e.index, o.value),
              e.hideTimeout
            )),
            x.value &&
              W &&
              ((oe = r.parent) == null ? void 0 : oe.type.name) ===
                "ElSubMenu" &&
              ((le = u.handleMouseleave) == null || le.call(u, !0)));
        };
      xe(
        () => l.props.collapse,
        (W) => O(Boolean(W))
      );
      {
        const W = (le) => {
            f.value[le.index] = le;
          },
          oe = (le) => {
            delete f.value[le.index];
          };
        ot(`subMenu:${r.uid}`, {
          addSubMenu: W,
          removeSubMenu: oe,
          handleMouseleave: G,
          mouseInChild: p,
          level: u.level + 1,
        });
      }
      return (
        n({ opened: N }),
        Ge(() => {
          l.addSubMenu($), u.addSubMenu($);
        }),
        bt(() => {
          u.removeSubMenu($), l.removeSubMenu($);
        }),
        () => {
          var W;
          const oe = [
              (W = t.title) == null ? void 0 : W.call(t),
              qe(
                Dt,
                {
                  class: a.e("icon-arrow"),
                  style: {
                    transform: N.value
                      ? (e.expandCloseIcon && e.expandOpenIcon) ||
                        (e.collapseCloseIcon &&
                          e.collapseOpenIcon &&
                          l.props.collapse)
                        ? "none"
                        : "rotateZ(180deg)"
                      : "none",
                  },
                },
                {
                  default: () =>
                    Ee(m.value)
                      ? qe(r.appContext.components[m.value])
                      : qe(m.value),
                }
              ),
            ],
            le = yh(l.props, u.level + 1),
            fe = l.isMenuPopup
              ? qe(
                  lh,
                  {
                    ref: g,
                    visible: N.value,
                    effect: "light",
                    pure: !0,
                    offset: e.popperOffset,
                    showArrow: !1,
                    persistent: !0,
                    popperClass: e.popperClass,
                    placement: _.value,
                    teleported: x.value,
                    fallbackPlacements: I.value,
                    transition: E.value,
                    gpuAcceleration: !1,
                  },
                  {
                    content: () => {
                      var Oe;
                      return qe(
                        "div",
                        {
                          class: [
                            i.m(U.value),
                            i.m("popup-container"),
                            e.popperClass,
                          ],
                          onMouseenter: (Le) => k(Le, 100),
                          onMouseleave: () => G(!0),
                          onFocus: (Le) => k(Le, 100),
                        },
                        [
                          qe(
                            "ul",
                            {
                              class: [
                                i.b(),
                                i.m("popup"),
                                i.m(`popup-${_.value}`),
                              ],
                              style: le.value,
                            },
                            [(Oe = t.default) == null ? void 0 : Oe.call(t)]
                          ),
                        ]
                      );
                    },
                    default: () =>
                      qe(
                        "div",
                        {
                          class: a.e("title"),
                          style: [F.value, { backgroundColor: T.value }],
                          onClick: z,
                        },
                        oe
                      ),
                  }
                )
              : qe(We, {}, [
                  qe(
                    "div",
                    {
                      class: a.e("title"),
                      style: [F.value, { backgroundColor: T.value }],
                      ref: h,
                      onClick: z,
                    },
                    oe
                  ),
                  qe(
                    aO,
                    {},
                    {
                      default: () => {
                        var Oe;
                        return ur(
                          qe(
                            "ul",
                            {
                              role: "menu",
                              class: [i.b(), i.m("inline")],
                              style: le.value,
                            },
                            [(Oe = t.default) == null ? void 0 : Oe.call(t)]
                          ),
                          [[Kr, N.value]]
                        );
                      },
                    }
                  ),
                ]);
          return qe(
            "li",
            {
              class: [
                a.b(),
                a.is("active", D.value),
                a.is("opened", N.value),
                a.is("disabled", e.disabled),
              ],
              role: "menuitem",
              ariaHaspopup: !0,
              ariaExpanded: N.value,
              onMouseenter: k,
              onMouseleave: () => G(!0),
              onFocus: k,
            },
            [fe]
          );
        }
      );
    },
  });
  const lT = Je({
      mode: {
        type: String,
        values: ["horizontal", "vertical"],
        default: "vertical",
      },
      defaultActive: { type: String, default: "" },
      defaultOpeneds: { type: Se(Array), default: () => vl([]) },
      uniqueOpened: Boolean,
      router: Boolean,
      menuTrigger: {
        type: String,
        values: ["hover", "click"],
        default: "hover",
      },
      collapse: Boolean,
      backgroundColor: String,
      textColor: String,
      activeTextColor: String,
      collapseTransition: { type: Boolean, default: !0 },
      ellipsis: { type: Boolean, default: !0 },
      popperEffect: {
        type: String,
        values: ["dark", "light"],
        default: "dark",
      },
    }),
    Ii = (e) => Array.isArray(e) && e.every((t) => Ee(t)),
    uT = {
      close: (e, t) => Ee(e) && Ii(t),
      open: (e, t) => Ee(e) && Ii(t),
      select: (e, t, n, r) =>
        Ee(e) && Ii(t) && Me(n) && (r === void 0 || r instanceof Promise),
    };
  var cT = be({
    name: "ElMenu",
    props: lT,
    emits: uT,
    setup(e, { emit: t, slots: n, expose: r }) {
      const o = Ct(),
        s = o.appContext.config.globalProperties.$router,
        i = re(),
        a = De("menu"),
        l = De("sub-menu"),
        u = re(-1),
        c = re(
          e.defaultOpeneds && !e.collapse ? e.defaultOpeneds.slice(0) : []
        ),
        f = re(e.defaultActive),
        d = re({}),
        p = re({}),
        h = M(
          () => e.mode === "horizontal" || (e.mode === "vertical" && e.collapse)
        ),
        g = () => {
          const S = f.value && d.value[f.value];
          if (!S || e.mode === "horizontal" || e.collapse) return;
          S.indexPath.forEach(($) => {
            const F = p.value[$];
            F && _($, F.indexPath);
          });
        },
        _ = (S, U) => {
          c.value.includes(S) ||
            (e.uniqueOpened && (c.value = c.value.filter(($) => U.includes($))),
            c.value.push(S),
            t("open", S, U));
        },
        m = (S, U) => {
          const $ = c.value.indexOf(S);
          $ !== -1 && c.value.splice($, 1), t("close", S, U);
        },
        w = ({ index: S, indexPath: U }) => {
          c.value.includes(S) ? m(S, U) : _(S, U);
        },
        x = (S) => {
          (e.mode === "horizontal" || e.collapse) && (c.value = []);
          const { index: U, indexPath: $ } = S;
          if (!(U === void 0 || $ === void 0))
            if (e.router && s) {
              const F = S.route || U,
                L = s.push(F).then((O) => (O || (f.value = U), O));
              t("select", U, $, { index: U, indexPath: $, route: F }, L);
            } else (f.value = U), t("select", U, $, { index: U, indexPath: $ });
        },
        E = (S) => {
          const U = d.value,
            $ = U[S] || (f.value && U[f.value]) || U[e.defaultActive];
          $ ? (f.value = $.index) : (f.value = S);
        },
        I = () => {
          var S, U;
          if (!i.value) return -1;
          const $ = Array.from(
              (U = (S = i.value) == null ? void 0 : S.childNodes) != null
                ? U
                : []
            ).filter((W) => W.nodeName !== "#text" || W.nodeValue),
            F = 64,
            L = Number.parseInt(getComputedStyle(i.value).paddingLeft, 10),
            O = Number.parseInt(getComputedStyle(i.value).paddingRight, 10),
            z = i.value.clientWidth - L - O;
          let k = 0,
            G = 0;
          return (
            $.forEach((W, oe) => {
              (k += W.offsetWidth || 0), k <= z - F && (G = oe + 1);
            }),
            G === $.length ? -1 : G
          );
        },
        N = (S, U = 33.34) => {
          let $;
          return () => {
            $ && clearTimeout($),
              ($ = setTimeout(() => {
                S();
              }, U));
          };
        };
      let D = !0;
      const T = () => {
        const S = () => {
          (u.value = -1),
            at(() => {
              u.value = I();
            });
        };
        D ? S() : N(S)(), (D = !1);
      };
      xe(
        () => e.defaultActive,
        (S) => {
          d.value[S] || (f.value = ""), E(S);
        }
      ),
        xe(
          () => e.collapse,
          (S) => {
            S && (c.value = []);
          }
        ),
        xe(d.value, g);
      let H;
      Mm(() => {
        e.mode === "horizontal" && e.ellipsis
          ? (H = oi(i, T).stop)
          : H == null || H();
      });
      {
        const S = (L) => {
            p.value[L.index] = L;
          },
          U = (L) => {
            delete p.value[L.index];
          };
        ot(
          "rootMenu",
          ft({
            props: e,
            openedMenus: c,
            items: d,
            subMenus: p,
            activeIndex: f,
            isMenuPopup: h,
            addMenuItem: (L) => {
              d.value[L.index] = L;
            },
            removeMenuItem: (L) => {
              delete d.value[L.index];
            },
            addSubMenu: S,
            removeSubMenu: U,
            openMenu: _,
            closeMenu: m,
            handleMenuItemClick: x,
            handleSubMenuClick: w,
          })
        ),
          ot(`subMenu:${o.uid}`, {
            addSubMenu: S,
            removeSubMenu: U,
            mouseInChild: re(!1),
            level: 0,
          });
      }
      return (
        Ge(() => {
          e.mode === "horizontal" && new nT(o.vnode.el, a.namespace.value);
        }),
        r({
          open: (U) => {
            const { indexPath: $ } = p.value[U];
            $.forEach((F) => _(F, $));
          },
          close: m,
          handleResize: T,
        }),
        () => {
          var S, U;
          let $ =
            (U = (S = n.default) == null ? void 0 : S.call(n)) != null ? U : [];
          const F = [];
          if (e.mode === "horizontal" && i.value) {
            const z = ys($),
              k = u.value === -1 ? z : z.slice(0, u.value),
              G = u.value === -1 ? [] : z.slice(u.value);
            G != null &&
              G.length &&
              e.ellipsis &&
              (($ = k),
              F.push(
                qe(
                  Nl,
                  { index: "sub-menu-more", class: l.e("hide-arrow") },
                  {
                    title: () =>
                      qe(
                        Dt,
                        { class: l.e("icon-more") },
                        { default: () => qe(cx) }
                      ),
                    default: () => G,
                  }
                )
              ));
          }
          const L = yh(e, 0),
            O = qe(
              "ul",
              {
                key: String(e.collapse),
                role: "menubar",
                ref: i,
                style: L.value,
                class: {
                  [a.b()]: !0,
                  [a.m(e.mode)]: !0,
                  [a.m("collapse")]: e.collapse,
                },
              },
              [...$, ...F]
            );
          return e.collapseTransition && e.mode === "vertical"
            ? qe(sT, () => O)
            : O;
        }
      );
    },
  });
  const fT = Je({
      index: { type: Se([String, null]), default: null },
      route: { type: Se([String, Object]) },
      disabled: Boolean,
    }),
    dT = { click: (e) => Ee(e.index) && Array.isArray(e.indexPath) },
    Fi = "ElMenuItem",
    pT = be({
      name: Fi,
      components: { ElTooltip: lh },
      props: fT,
      emits: dT,
      setup(e, { emit: t }) {
        const n = Ct(),
          r = Pe("rootMenu"),
          o = De("menu"),
          s = De("menu-item");
        r || Fo(Fi, "can not inject root menu");
        const { parentMenu: i, indexPath: a } = vh(n, Xt(e, "index")),
          l = Pe(`subMenu:${i.value.uid}`);
        l || Fo(Fi, "can not inject sub menu");
        const u = M(() => e.index === r.activeIndex),
          c = ft({ index: e.index, indexPath: a, active: u }),
          f = () => {
            e.disabled ||
              (r.handleMenuItemClick({
                index: e.index,
                indexPath: a.value,
                route: e.route,
              }),
              t("click", c));
          };
        return (
          Ge(() => {
            l.addSubMenu(c), r.addMenuItem(c);
          }),
          bt(() => {
            l.removeSubMenu(c), r.removeMenuItem(c);
          }),
          {
            parentMenu: i,
            rootMenu: r,
            active: u,
            nsMenu: o,
            nsMenuItem: s,
            handleClick: f,
          }
        );
      },
    });
  function hT(e, t, n, r, o, s) {
    const i = Gi("el-tooltip");
    return (
      ee(),
      me(
        "li",
        {
          class: _e([
            e.nsMenuItem.b(),
            e.nsMenuItem.is("active", e.active),
            e.nsMenuItem.is("disabled", e.disabled),
          ]),
          role: "menuitem",
          tabindex: "-1",
          onClick:
            t[0] || (t[0] = (...a) => e.handleClick && e.handleClick(...a)),
        },
        [
          e.parentMenu.type.name === "ElMenu" &&
          e.rootMenu.props.collapse &&
          e.$slots.title
            ? (ee(),
              Ne(
                i,
                {
                  key: 0,
                  effect: e.rootMenu.props.popperEffect,
                  placement: "right",
                  "fallback-placements": ["left"],
                  persistent: "",
                },
                {
                  content: we(() => [Ae(e.$slots, "title")]),
                  default: we(() => [
                    ye(
                      "div",
                      { class: _e(e.nsMenu.be("tooltip", "trigger")) },
                      [Ae(e.$slots, "default")],
                      2
                    ),
                  ]),
                  _: 3,
                },
                8,
                ["effect"]
              ))
            : (ee(),
              me(
                We,
                { key: 1 },
                [Ae(e.$slots, "default"), Ae(e.$slots, "title")],
                64
              )),
        ],
        2
      )
    );
  }
  var bh = Ze(pT, [
    ["render", hT],
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/menu/src/menu-item.vue",
    ],
  ]);
  const gT = { title: String },
    mT = "ElMenuItemGroup",
    vT = be({
      name: mT,
      props: gT,
      setup() {
        return { ns: De("menu-item-group") };
      },
    });
  function yT(e, t, n, r, o, s) {
    return (
      ee(),
      me(
        "li",
        { class: _e(e.ns.b()) },
        [
          ye(
            "div",
            { class: _e(e.ns.e("title")) },
            [
              e.$slots.title
                ? Ae(e.$slots, "title", { key: 1 })
                : (ee(), me(We, { key: 0 }, [Pt(lt(e.title), 1)], 64)),
            ],
            2
          ),
          ye("ul", null, [Ae(e.$slots, "default")]),
        ],
        2
      )
    );
  }
  var _h = Ze(vT, [
    ["render", yT],
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/menu/src/menu-item-group.vue",
    ],
  ]);
  const bT = _n(cT, { MenuItem: bh, MenuItemGroup: _h, SubMenu: Nl }),
    _T = Ho(bh);
  Ho(_h);
  Ho(Nl);
  function wT(e) {
    let t;
    const n = De("loading"),
      r = re(!1),
      o = ft({ ...e, originalPosition: "", originalOverflow: "", visible: !1 });
    function s(p) {
      o.text = p;
    }
    function i() {
      const p = o.parent;
      if (!p.vLoadingAddClassList) {
        let h = p.getAttribute("loading-number");
        (h = Number.parseInt(h) - 1),
          h
            ? p.setAttribute("loading-number", h.toString())
            : (rr(p, n.bm("parent", "relative")),
              p.removeAttribute("loading-number")),
          rr(p, n.bm("parent", "hidden"));
      }
      a(), f.unmount();
    }
    function a() {
      var p, h;
      (h = (p = d.$el) == null ? void 0 : p.parentNode) == null ||
        h.removeChild(d.$el);
    }
    function l() {
      var p;
      (e.beforeClose && !e.beforeClose()) ||
        ((r.value = !0),
        clearTimeout(t),
        (t = window.setTimeout(u, 400)),
        (o.visible = !1),
        (p = e.closed) == null || p.call(e));
    }
    function u() {
      if (!r.value) return;
      const p = o.parent;
      (r.value = !1), (p.vLoadingAddClassList = void 0), i();
    }
    const f = Kd({
        name: "ElLoading",
        setup() {
          return () => {
            const p = o.spinner || o.svg,
              h = qe(
                "svg",
                {
                  class: "circular",
                  viewBox: o.svgViewBox ? o.svgViewBox : "0 0 50 50",
                  ...(p ? { innerHTML: p } : {}),
                },
                [
                  qe("circle", {
                    class: "path",
                    cx: "25",
                    cy: "25",
                    r: "20",
                    fill: "none",
                  }),
                ]
              ),
              g = o.text ? qe("p", { class: n.b("text") }, [o.text]) : void 0;
            return qe(
              Dn,
              { name: n.b("fade"), onAfterLeave: u },
              {
                default: we(() => [
                  ur(
                    ve(
                      "div",
                      {
                        style: { backgroundColor: o.background || "" },
                        class: [
                          n.b("mask"),
                          o.customClass,
                          o.fullscreen ? "is-fullscreen" : "",
                        ],
                      },
                      [qe("div", { class: n.b("spinner") }, [h, g])]
                    ),
                    [[Kr, o.visible]]
                  ),
                ]),
              }
            );
          };
        },
      }),
      d = f.mount(document.createElement("div"));
    return {
      ...Wa(o),
      setText: s,
      removeElLoadingChild: a,
      close: l,
      handleAfterLeave: u,
      vm: d,
      get $el() {
        return d.$el;
      },
    };
  }
  let fs;
  const xa = function (e = {}) {
      if (!ct) return;
      const t = xT(e);
      if (t.fullscreen && fs) return fs;
      const n = wT({
        ...t,
        closed: () => {
          var o;
          (o = t.closed) == null || o.call(t), t.fullscreen && (fs = void 0);
        },
      });
      ET(t, t.parent, n),
        Yc(t, t.parent, n),
        (t.parent.vLoadingAddClassList = () => Yc(t, t.parent, n));
      let r = t.parent.getAttribute("loading-number");
      return (
        r ? (r = `${Number.parseInt(r) + 1}`) : (r = "1"),
        t.parent.setAttribute("loading-number", r),
        t.parent.appendChild(n.$el),
        at(() => (n.visible.value = t.visible)),
        t.fullscreen && (fs = n),
        n
      );
    },
    xT = (e) => {
      var t, n, r, o;
      let s;
      return (
        Ee(e.target)
          ? (s =
              (t = document.querySelector(e.target)) != null
                ? t
                : document.body)
          : (s = e.target || document.body),
        {
          parent: s === document.body || e.body ? document.body : s,
          background: e.background || "",
          svg: e.svg || "",
          svgViewBox: e.svgViewBox || "",
          spinner: e.spinner || !1,
          text: e.text || "",
          fullscreen:
            s === document.body && ((n = e.fullscreen) != null ? n : !0),
          lock: (r = e.lock) != null ? r : !1,
          customClass: e.customClass || "",
          visible: (o = e.visible) != null ? o : !0,
          target: s,
        }
      );
    },
    ET = async (e, t, n) => {
      const { nextZIndex: r } = Ml(),
        o = {};
      if (e.fullscreen)
        (n.originalPosition.value = so(document.body, "position")),
          (n.originalOverflow.value = so(document.body, "overflow")),
          (o.zIndex = r());
      else if (e.parent === document.body) {
        (n.originalPosition.value = so(document.body, "position")), await at();
        for (const s of ["top", "left"]) {
          const i = s === "top" ? "scrollTop" : "scrollLeft";
          o[s] = `${
            e.target.getBoundingClientRect()[s] +
            document.body[i] +
            document.documentElement[i] -
            Number.parseInt(so(document.body, `margin-${s}`), 10)
          }px`;
        }
        for (const s of ["height", "width"])
          o[s] = `${e.target.getBoundingClientRect()[s]}px`;
      } else n.originalPosition.value = so(t, "position");
      for (const [s, i] of Object.entries(o)) n.$el.style[s] = i;
    },
    Yc = (e, t, n) => {
      const r = De("loading");
      ["absolute", "fixed", "sticky"].includes(n.originalPosition.value)
        ? rr(t, r.bm("parent", "relative"))
        : Er(t, r.bm("parent", "relative")),
        e.fullscreen && e.lock
          ? Er(t, r.bm("parent", "hidden"))
          : rr(t, r.bm("parent", "hidden"));
    },
    Ea = Symbol("ElLoading"),
    Qc = (e, t) => {
      var n, r, o, s;
      const i = t.instance,
        a = (d) => (Me(t.value) ? t.value[d] : void 0),
        l = (d) => {
          const p = (Ee(d) && (i == null ? void 0 : i[d])) || d;
          return p && re(p);
        },
        u = (d) => l(a(d) || e.getAttribute(`element-loading-${lr(d)}`)),
        c = (n = a("fullscreen")) != null ? n : t.modifiers.fullscreen,
        f = {
          text: u("text"),
          svg: u("svg"),
          svgViewBox: u("svgViewBox"),
          spinner: u("spinner"),
          background: u("background"),
          customClass: u("customClass"),
          fullscreen: c,
          target: (r = a("target")) != null ? r : c ? void 0 : e,
          body: (o = a("body")) != null ? o : t.modifiers.body,
          lock: (s = a("lock")) != null ? s : t.modifiers.lock,
        };
      e[Ea] = { options: f, instance: xa(f) };
    },
    ST = (e, t) => {
      for (const n of Object.keys(t)) et(t[n]) && (t[n].value = e[n]);
    },
    Xc = {
      mounted(e, t) {
        t.value && Qc(e, t);
      },
      updated(e, t) {
        const n = e[Ea];
        t.oldValue !== t.value &&
          (t.value && !t.oldValue
            ? Qc(e, t)
            : t.value && t.oldValue
            ? Me(t.value) && ST(t.value, n.options)
            : n == null || n.instance.close());
      },
      unmounted(e) {
        var t;
        (t = e[Ea]) == null || t.instance.close();
      },
    },
    OT = {
      install(e) {
        e.directive("loading", Xc), (e.config.globalProperties.$loading = xa);
      },
      directive: Xc,
      service: xa,
    },
    wh = ["success", "info", "warning", "error"],
    ht = vl({
      customClass: "",
      center: !1,
      dangerouslyUseHTMLString: !1,
      duration: 3e3,
      icon: void 0,
      id: "",
      message: "",
      onClose: void 0,
      showClose: !1,
      type: "info",
      offset: 16,
      zIndex: 0,
      grouping: !1,
      repeatNum: 1,
      appendTo: ct ? document.body : void 0,
    }),
    TT = Je({
      customClass: { type: String, default: ht.customClass },
      center: { type: Boolean, default: ht.center },
      dangerouslyUseHTMLString: {
        type: Boolean,
        default: ht.dangerouslyUseHTMLString,
      },
      duration: { type: Number, default: ht.duration },
      icon: { type: dn, default: ht.icon },
      id: { type: String, default: ht.id },
      message: { type: Se([String, Object, Function]), default: ht.message },
      onClose: { type: Se(Function), required: !1 },
      showClose: { type: Boolean, default: ht.showClose },
      type: { type: String, values: wh, default: ht.type },
      offset: { type: Number, default: ht.offset },
      zIndex: { type: Number, default: ht.zIndex },
      grouping: { type: Boolean, default: ht.grouping },
      repeatNum: { type: Number, default: ht.repeatNum },
    }),
    $T = { destroy: () => !0 },
    Ht = ed([]),
    CT = (e) => {
      const t = Ht.findIndex((o) => o.id === e),
        n = Ht[t];
      let r;
      return t > 0 && (r = Ht[t - 1]), { current: n, prev: r };
    },
    AT = (e) => {
      const { prev: t } = CT(e);
      return t ? t.vm.exposed.bottom.value : 0;
    },
    kT = (e, t) => (Ht.findIndex((r) => r.id === e) > 0 ? 20 : t),
    PT = ["id"],
    RT = ["innerHTML"],
    MT = be({ name: "ElMessage" }),
    IT = be({
      ...MT,
      props: TT,
      emits: $T,
      setup(e, { expose: t }) {
        const n = e,
          { Close: r } = Cx,
          o = De("message"),
          s = re(),
          i = re(!1),
          a = re(0);
        let l;
        const u = M(() =>
            n.type ? (n.type === "error" ? "danger" : n.type) : "info"
          ),
          c = M(() => {
            const E = n.type;
            return { [o.bm("icon", E)]: E && yc[E] };
          }),
          f = M(() => n.icon || yc[n.type] || ""),
          d = M(() => AT(n.id)),
          p = M(() => kT(n.id, n.offset) + d.value),
          h = M(() => a.value + p.value),
          g = M(() => ({ top: `${p.value}px`, zIndex: n.zIndex }));
        function _() {
          n.duration !== 0 &&
            ({ stop: l } = aa(() => {
              w();
            }, n.duration));
        }
        function m() {
          l == null || l();
        }
        function w() {
          i.value = !1;
        }
        function x({ code: E }) {
          E === pt.esc && w();
        }
        return (
          Ge(() => {
            _(), (i.value = !0);
          }),
          xe(
            () => n.repeatNum,
            () => {
              m(), _();
            }
          ),
          Ar(document, "keydown", x),
          oi(s, () => {
            a.value = s.value.getBoundingClientRect().height;
          }),
          t({ visible: i, bottom: h, close: w }),
          (E, I) => (
            ee(),
            Ne(
              Dn,
              {
                name: y(o).b("fade"),
                onBeforeLeave: E.onClose,
                onAfterLeave: I[0] || (I[0] = (N) => E.$emit("destroy")),
                persisted: "",
              },
              {
                default: we(() => [
                  ur(
                    ye(
                      "div",
                      {
                        id: E.id,
                        ref_key: "messageRef",
                        ref: s,
                        class: _e([
                          y(o).b(),
                          { [y(o).m(E.type)]: E.type && !E.icon },
                          y(o).is("center", E.center),
                          y(o).is("closable", E.showClose),
                          E.customClass,
                        ]),
                        style: rn(y(g)),
                        role: "alert",
                        onMouseenter: m,
                        onMouseleave: _,
                      },
                      [
                        E.repeatNum > 1
                          ? (ee(),
                            Ne(
                              y(TS),
                              {
                                key: 0,
                                value: E.repeatNum,
                                type: y(u),
                                class: _e(y(o).e("badge")),
                              },
                              null,
                              8,
                              ["value", "type", "class"]
                            ))
                          : Ie("v-if", !0),
                        y(f)
                          ? (ee(),
                            Ne(
                              y(Dt),
                              { key: 1, class: _e([y(o).e("icon"), y(c)]) },
                              {
                                default: we(() => [(ee(), Ne(Pn(y(f))))]),
                                _: 1,
                              },
                              8,
                              ["class"]
                            ))
                          : Ie("v-if", !0),
                        Ae(E.$slots, "default", {}, () => [
                          E.dangerouslyUseHTMLString
                            ? (ee(),
                              me(
                                We,
                                { key: 1 },
                                [
                                  Ie(
                                    " Caution here, message could've been compromised, never use user's input as message "
                                  ),
                                  ye(
                                    "p",
                                    {
                                      class: _e(y(o).e("content")),
                                      innerHTML: E.message,
                                    },
                                    null,
                                    10,
                                    RT
                                  ),
                                ],
                                2112
                              ))
                            : (ee(),
                              me(
                                "p",
                                { key: 0, class: _e(y(o).e("content")) },
                                lt(E.message),
                                3
                              )),
                        ]),
                        E.showClose
                          ? (ee(),
                            Ne(
                              y(Dt),
                              {
                                key: 2,
                                class: _e(y(o).e("closeBtn")),
                                onClick: Vd(w, ["stop"]),
                              },
                              { default: we(() => [ve(y(r))]), _: 1 },
                              8,
                              ["class", "onClick"]
                            ))
                          : Ie("v-if", !0),
                      ],
                      46,
                      PT
                    ),
                    [[Kr, i.value]]
                  ),
                ]),
                _: 3,
              },
              8,
              ["name", "onBeforeLeave"]
            )
          )
        );
      },
    });
  var FT = Ze(IT, [
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/message/src/message.vue",
    ],
  ]);
  let NT = 1;
  const xh = (e) => {
      const t = !e || Ee(e) || Ln(e) || he(e) ? { message: e } : e,
        n = { ...ht, ...t };
      if (!n.appendTo) n.appendTo = document.body;
      else if (Ee(n.appendTo)) {
        let r = document.querySelector(n.appendTo);
        Io(r) || (r = document.body), (n.appendTo = r);
      }
      return n;
    },
    LT = (e) => {
      const t = Ht.indexOf(e);
      if (t === -1) return;
      Ht.splice(t, 1);
      const { handler: n } = e;
      n.close();
    },
    jT = ({ appendTo: e, ...t }, n) => {
      const { nextZIndex: r } = Ml(),
        o = `message_${NT++}`,
        s = t.onClose,
        i = document.createElement("div"),
        a = {
          ...t,
          zIndex: r() + t.zIndex,
          id: o,
          onClose: () => {
            s == null || s(), LT(f);
          },
          onDestroy: () => {
            Mu(null, i);
          },
        },
        l = ve(
          FT,
          a,
          he(a.message) || Ln(a.message)
            ? { default: he(a.message) ? a.message : () => a.message }
            : null
        );
      (l.appContext = n || Dr._context),
        Mu(l, i),
        e.appendChild(i.firstElementChild);
      const u = l.component,
        f = {
          id: o,
          vnode: l,
          vm: u,
          handler: {
            close: () => {
              u.exposed.visible.value = !1;
            },
          },
          props: l.component.props,
        };
      return f;
    },
    Dr = (e = {}, t) => {
      if (!ct) return { close: () => {} };
      if (Mr(ma.max) && Ht.length >= ma.max) return { close: () => {} };
      const n = xh(e);
      if (n.grouping && Ht.length) {
        const o = Ht.find(({ vnode: s }) => {
          var i;
          return ((i = s.props) == null ? void 0 : i.message) === n.message;
        });
        if (o)
          return (o.props.repeatNum += 1), (o.props.type = n.type), o.handler;
      }
      const r = jT(n, t);
      return Ht.push(r), r.handler;
    };
  wh.forEach((e) => {
    Dr[e] = (t = {}, n) => {
      const r = xh(t);
      return Dr({ ...r, type: e }, n);
    };
  });
  function BT(e) {
    for (const t of Ht) (!e || e === t.props.type) && t.handler.close();
  }
  Dr.closeAll = BT;
  Dr._context = null;
  const ao = kx(Dr, "$message");
  function DT() {
    return Eh().__VUE_DEVTOOLS_GLOBAL_HOOK__;
  }
  function Eh() {
    return typeof navigator < "u" && typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : {};
  }
  const zT = typeof Proxy == "function",
    HT = "devtools-plugin:setup",
    UT = "plugin:settings:set";
  let yr, Sa;
  function qT() {
    var e;
    return (
      yr !== void 0 ||
        (typeof window < "u" && window.performance
          ? ((yr = !0), (Sa = window.performance))
          : typeof global < "u" &&
            !((e = global.perf_hooks) === null || e === void 0) &&
            e.performance
          ? ((yr = !0), (Sa = global.perf_hooks.performance))
          : (yr = !1)),
      yr
    );
  }
  function VT() {
    return qT() ? Sa.now() : Date.now();
  }
  class WT {
    constructor(t, n) {
      (this.target = null),
        (this.targetQueue = []),
        (this.onQueue = []),
        (this.plugin = t),
        (this.hook = n);
      const r = {};
      if (t.settings)
        for (const i in t.settings) {
          const a = t.settings[i];
          r[i] = a.defaultValue;
        }
      const o = `__vue-devtools-plugin-settings__${t.id}`;
      let s = Object.assign({}, r);
      try {
        const i = localStorage.getItem(o),
          a = JSON.parse(i);
        Object.assign(s, a);
      } catch {}
      (this.fallbacks = {
        getSettings() {
          return s;
        },
        setSettings(i) {
          try {
            localStorage.setItem(o, JSON.stringify(i));
          } catch {}
          s = i;
        },
        now() {
          return VT();
        },
      }),
        n &&
          n.on(UT, (i, a) => {
            i === this.plugin.id && this.fallbacks.setSettings(a);
          }),
        (this.proxiedOn = new Proxy(
          {},
          {
            get: (i, a) =>
              this.target
                ? this.target.on[a]
                : (...l) => {
                    this.onQueue.push({ method: a, args: l });
                  },
          }
        )),
        (this.proxiedTarget = new Proxy(
          {},
          {
            get: (i, a) =>
              this.target
                ? this.target[a]
                : a === "on"
                ? this.proxiedOn
                : Object.keys(this.fallbacks).includes(a)
                ? (...l) => (
                    this.targetQueue.push({
                      method: a,
                      args: l,
                      resolve: () => {},
                    }),
                    this.fallbacks[a](...l)
                  )
                : (...l) =>
                    new Promise((u) => {
                      this.targetQueue.push({ method: a, args: l, resolve: u });
                    }),
          }
        ));
    }
    async setRealTarget(t) {
      this.target = t;
      for (const n of this.onQueue) this.target.on[n.method](...n.args);
      for (const n of this.targetQueue)
        n.resolve(await this.target[n.method](...n.args));
    }
  }
  function KT(e, t) {
    const n = e,
      r = Eh(),
      o = DT(),
      s = zT && n.enableEarlyProxy;
    if (o && (r.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !s)) o.emit(HT, e, t);
    else {
      const i = s ? new WT(n, o) : null;
      (r.__VUE_DEVTOOLS_PLUGINS__ = r.__VUE_DEVTOOLS_PLUGINS__ || []).push({
        pluginDescriptor: n,
        setupFn: t,
        proxy: i,
      }),
        i && t(i.proxiedTarget);
    }
  }
  /*!
   * vuex v4.1.0
   * (c) 2022 Evan You
   * @license MIT
   */ var Sh = "store";
  function GT(e) {
    return e === void 0 && (e = null), Pe(e !== null ? e : Sh);
  }
  function Qr(e, t) {
    Object.keys(e).forEach(function (n) {
      return t(e[n], n);
    });
  }
  function JT(e) {
    return e !== null && typeof e == "object";
  }
  function ZT(e) {
    return e && typeof e.then == "function";
  }
  function YT(e, t) {
    return function () {
      return e(t);
    };
  }
  function Oh(e, t, n) {
    return (
      t.indexOf(e) < 0 && (n && n.prepend ? t.unshift(e) : t.push(e)),
      function () {
        var r = t.indexOf(e);
        r > -1 && t.splice(r, 1);
      }
    );
  }
  function Th(e, t) {
    (e._actions = Object.create(null)),
      (e._mutations = Object.create(null)),
      (e._wrappedGetters = Object.create(null)),
      (e._modulesNamespaceMap = Object.create(null));
    var n = e.state;
    ui(e, n, [], e._modules.root, !0), Ll(e, n, t);
  }
  function Ll(e, t, n) {
    var r = e._state,
      o = e._scope;
    (e.getters = {}), (e._makeLocalGettersCache = Object.create(null));
    var s = e._wrappedGetters,
      i = {},
      a = {},
      l = Bg(!0);
    l.run(function () {
      Qr(s, function (u, c) {
        (i[c] = YT(u, e)),
          (a[c] = M(function () {
            return i[c]();
          })),
          Object.defineProperty(e.getters, c, {
            get: function () {
              return a[c].value;
            },
            enumerable: !0,
          });
      });
    }),
      (e._state = ft({ data: t })),
      (e._scope = l),
      e.strict && n$(e),
      r &&
        n &&
        e._withCommit(function () {
          r.data = null;
        }),
      o && o.stop();
  }
  function ui(e, t, n, r, o) {
    var s = !n.length,
      i = e._modules.getNamespace(n);
    if (
      (r.namespaced &&
        (e._modulesNamespaceMap[i], (e._modulesNamespaceMap[i] = r)),
      !s && !o)
    ) {
      var a = jl(t, n.slice(0, -1)),
        l = n[n.length - 1];
      e._withCommit(function () {
        a[l] = r.state;
      });
    }
    var u = (r.context = QT(e, i, n));
    r.forEachMutation(function (c, f) {
      var d = i + f;
      XT(e, d, c, u);
    }),
      r.forEachAction(function (c, f) {
        var d = c.root ? f : i + f,
          p = c.handler || c;
        e$(e, d, p, u);
      }),
      r.forEachGetter(function (c, f) {
        var d = i + f;
        t$(e, d, c, u);
      }),
      r.forEachChild(function (c, f) {
        ui(e, t, n.concat(f), c, o);
      });
  }
  function QT(e, t, n) {
    var r = t === "",
      o = {
        dispatch: r
          ? e.dispatch
          : function (s, i, a) {
              var l = Ls(s, i, a),
                u = l.payload,
                c = l.options,
                f = l.type;
              return (!c || !c.root) && (f = t + f), e.dispatch(f, u);
            },
        commit: r
          ? e.commit
          : function (s, i, a) {
              var l = Ls(s, i, a),
                u = l.payload,
                c = l.options,
                f = l.type;
              (!c || !c.root) && (f = t + f), e.commit(f, u, c);
            },
      };
    return (
      Object.defineProperties(o, {
        getters: {
          get: r
            ? function () {
                return e.getters;
              }
            : function () {
                return $h(e, t);
              },
        },
        state: {
          get: function () {
            return jl(e.state, n);
          },
        },
      }),
      o
    );
  }
  function $h(e, t) {
    if (!e._makeLocalGettersCache[t]) {
      var n = {},
        r = t.length;
      Object.keys(e.getters).forEach(function (o) {
        if (o.slice(0, r) === t) {
          var s = o.slice(r);
          Object.defineProperty(n, s, {
            get: function () {
              return e.getters[o];
            },
            enumerable: !0,
          });
        }
      }),
        (e._makeLocalGettersCache[t] = n);
    }
    return e._makeLocalGettersCache[t];
  }
  function XT(e, t, n, r) {
    var o = e._mutations[t] || (e._mutations[t] = []);
    o.push(function (i) {
      n.call(e, r.state, i);
    });
  }
  function e$(e, t, n, r) {
    var o = e._actions[t] || (e._actions[t] = []);
    o.push(function (i) {
      var a = n.call(
        e,
        {
          dispatch: r.dispatch,
          commit: r.commit,
          getters: r.getters,
          state: r.state,
          rootGetters: e.getters,
          rootState: e.state,
        },
        i
      );
      return (
        ZT(a) || (a = Promise.resolve(a)),
        e._devtoolHook
          ? a.catch(function (l) {
              throw (e._devtoolHook.emit("vuex:error", l), l);
            })
          : a
      );
    });
  }
  function t$(e, t, n, r) {
    e._wrappedGetters[t] ||
      (e._wrappedGetters[t] = function (s) {
        return n(r.state, r.getters, s.state, s.getters);
      });
  }
  function n$(e) {
    xe(
      function () {
        return e._state.data;
      },
      function () {},
      { deep: !0, flush: "sync" }
    );
  }
  function jl(e, t) {
    return t.reduce(function (n, r) {
      return n[r];
    }, e);
  }
  function Ls(e, t, n) {
    return (
      JT(e) && e.type && ((n = t), (t = e), (e = e.type)),
      { type: e, payload: t, options: n }
    );
  }
  var r$ = "vuex bindings",
    ef = "vuex:mutations",
    Ni = "vuex:actions",
    br = "vuex",
    o$ = 0;
  function s$(e, t) {
    KT(
      {
        id: "org.vuejs.vuex",
        app: e,
        label: "Vuex",
        homepage: "https://next.vuex.vuejs.org/",
        logo: "https://vuejs.org/images/icons/favicon-96x96.png",
        packageName: "vuex",
        componentStateTypes: [r$],
      },
      function (n) {
        n.addTimelineLayer({ id: ef, label: "Vuex Mutations", color: tf }),
          n.addTimelineLayer({ id: Ni, label: "Vuex Actions", color: tf }),
          n.addInspector({
            id: br,
            label: "Vuex",
            icon: "storage",
            treeFilterPlaceholder: "Filter stores...",
          }),
          n.on.getInspectorTree(function (r) {
            if (r.app === e && r.inspectorId === br)
              if (r.filter) {
                var o = [];
                Ph(o, t._modules.root, r.filter, ""), (r.rootNodes = o);
              } else r.rootNodes = [kh(t._modules.root, "")];
          }),
          n.on.getInspectorState(function (r) {
            if (r.app === e && r.inspectorId === br) {
              var o = r.nodeId;
              $h(t, o),
                (r.state = l$(
                  c$(t._modules, o),
                  o === "root" ? t.getters : t._makeLocalGettersCache,
                  o
                ));
            }
          }),
          n.on.editInspectorState(function (r) {
            if (r.app === e && r.inspectorId === br) {
              var o = r.nodeId,
                s = r.path;
              o !== "root" && (s = o.split("/").filter(Boolean).concat(s)),
                t._withCommit(function () {
                  r.set(t._state.data, s, r.state.value);
                });
            }
          }),
          t.subscribe(function (r, o) {
            var s = {};
            r.payload && (s.payload = r.payload),
              (s.state = o),
              n.notifyComponentUpdate(),
              n.sendInspectorTree(br),
              n.sendInspectorState(br),
              n.addTimelineEvent({
                layerId: ef,
                event: { time: Date.now(), title: r.type, data: s },
              });
          }),
          t.subscribeAction({
            before: function (r, o) {
              var s = {};
              r.payload && (s.payload = r.payload),
                (r._id = o$++),
                (r._time = Date.now()),
                (s.state = o),
                n.addTimelineEvent({
                  layerId: Ni,
                  event: {
                    time: r._time,
                    title: r.type,
                    groupId: r._id,
                    subtitle: "start",
                    data: s,
                  },
                });
            },
            after: function (r, o) {
              var s = {},
                i = Date.now() - r._time;
              (s.duration = {
                _custom: {
                  type: "duration",
                  display: i + "ms",
                  tooltip: "Action duration",
                  value: i,
                },
              }),
                r.payload && (s.payload = r.payload),
                (s.state = o),
                n.addTimelineEvent({
                  layerId: Ni,
                  event: {
                    time: Date.now(),
                    title: r.type,
                    groupId: r._id,
                    subtitle: "end",
                    data: s,
                  },
                });
            },
          });
      }
    );
  }
  var tf = 8702998,
    i$ = 6710886,
    a$ = 16777215,
    Ch = { label: "namespaced", textColor: a$, backgroundColor: i$ };
  function Ah(e) {
    return e && e !== "root" ? e.split("/").slice(-2, -1)[0] : "Root";
  }
  function kh(e, t) {
    return {
      id: t || "root",
      label: Ah(t),
      tags: e.namespaced ? [Ch] : [],
      children: Object.keys(e._children).map(function (n) {
        return kh(e._children[n], t + n + "/");
      }),
    };
  }
  function Ph(e, t, n, r) {
    r.includes(n) &&
      e.push({
        id: r || "root",
        label: r.endsWith("/") ? r.slice(0, r.length - 1) : r || "Root",
        tags: t.namespaced ? [Ch] : [],
      }),
      Object.keys(t._children).forEach(function (o) {
        Ph(e, t._children[o], n, r + o + "/");
      });
  }
  function l$(e, t, n) {
    t = n === "root" ? t : t[n];
    var r = Object.keys(t),
      o = {
        state: Object.keys(e.state).map(function (i) {
          return { key: i, editable: !0, value: e.state[i] };
        }),
      };
    if (r.length) {
      var s = u$(t);
      o.getters = Object.keys(s).map(function (i) {
        return {
          key: i.endsWith("/") ? Ah(i) : i,
          editable: !1,
          value: Oa(function () {
            return s[i];
          }),
        };
      });
    }
    return o;
  }
  function u$(e) {
    var t = {};
    return (
      Object.keys(e).forEach(function (n) {
        var r = n.split("/");
        if (r.length > 1) {
          var o = t,
            s = r.pop();
          r.forEach(function (i) {
            o[i] ||
              (o[i] = {
                _custom: {
                  value: {},
                  display: i,
                  tooltip: "Module",
                  abstract: !0,
                },
              }),
              (o = o[i]._custom.value);
          }),
            (o[s] = Oa(function () {
              return e[n];
            }));
        } else
          t[n] = Oa(function () {
            return e[n];
          });
      }),
      t
    );
  }
  function c$(e, t) {
    var n = t.split("/").filter(function (r) {
      return r;
    });
    return n.reduce(
      function (r, o, s) {
        var i = r[o];
        if (!i)
          throw new Error('Missing module "' + o + '" for path "' + t + '".');
        return s === n.length - 1 ? i : i._children;
      },
      t === "root" ? e : e.root._children
    );
  }
  function Oa(e) {
    try {
      return e();
    } catch (t) {
      return t;
    }
  }
  var Wt = function (t, n) {
      (this.runtime = n),
        (this._children = Object.create(null)),
        (this._rawModule = t);
      var r = t.state;
      this.state = (typeof r == "function" ? r() : r) || {};
    },
    Rh = { namespaced: { configurable: !0 } };
  Rh.namespaced.get = function () {
    return !!this._rawModule.namespaced;
  };
  Wt.prototype.addChild = function (t, n) {
    this._children[t] = n;
  };
  Wt.prototype.removeChild = function (t) {
    delete this._children[t];
  };
  Wt.prototype.getChild = function (t) {
    return this._children[t];
  };
  Wt.prototype.hasChild = function (t) {
    return t in this._children;
  };
  Wt.prototype.update = function (t) {
    (this._rawModule.namespaced = t.namespaced),
      t.actions && (this._rawModule.actions = t.actions),
      t.mutations && (this._rawModule.mutations = t.mutations),
      t.getters && (this._rawModule.getters = t.getters);
  };
  Wt.prototype.forEachChild = function (t) {
    Qr(this._children, t);
  };
  Wt.prototype.forEachGetter = function (t) {
    this._rawModule.getters && Qr(this._rawModule.getters, t);
  };
  Wt.prototype.forEachAction = function (t) {
    this._rawModule.actions && Qr(this._rawModule.actions, t);
  };
  Wt.prototype.forEachMutation = function (t) {
    this._rawModule.mutations && Qr(this._rawModule.mutations, t);
  };
  Object.defineProperties(Wt.prototype, Rh);
  var hr = function (t) {
    this.register([], t, !1);
  };
  hr.prototype.get = function (t) {
    return t.reduce(function (n, r) {
      return n.getChild(r);
    }, this.root);
  };
  hr.prototype.getNamespace = function (t) {
    var n = this.root;
    return t.reduce(function (r, o) {
      return (n = n.getChild(o)), r + (n.namespaced ? o + "/" : "");
    }, "");
  };
  hr.prototype.update = function (t) {
    Mh([], this.root, t);
  };
  hr.prototype.register = function (t, n, r) {
    var o = this;
    r === void 0 && (r = !0);
    var s = new Wt(n, r);
    if (t.length === 0) this.root = s;
    else {
      var i = this.get(t.slice(0, -1));
      i.addChild(t[t.length - 1], s);
    }
    n.modules &&
      Qr(n.modules, function (a, l) {
        o.register(t.concat(l), a, r);
      });
  };
  hr.prototype.unregister = function (t) {
    var n = this.get(t.slice(0, -1)),
      r = t[t.length - 1],
      o = n.getChild(r);
    o && o.runtime && n.removeChild(r);
  };
  hr.prototype.isRegistered = function (t) {
    var n = this.get(t.slice(0, -1)),
      r = t[t.length - 1];
    return n ? n.hasChild(r) : !1;
  };
  function Mh(e, t, n) {
    if ((t.update(n), n.modules))
      for (var r in n.modules) {
        if (!t.getChild(r)) return;
        Mh(e.concat(r), t.getChild(r), n.modules[r]);
      }
  }
  function f$(e) {
    return new _t(e);
  }
  var _t = function (t) {
      var n = this;
      t === void 0 && (t = {});
      var r = t.plugins;
      r === void 0 && (r = []);
      var o = t.strict;
      o === void 0 && (o = !1);
      var s = t.devtools;
      (this._committing = !1),
        (this._actions = Object.create(null)),
        (this._actionSubscribers = []),
        (this._mutations = Object.create(null)),
        (this._wrappedGetters = Object.create(null)),
        (this._modules = new hr(t)),
        (this._modulesNamespaceMap = Object.create(null)),
        (this._subscribers = []),
        (this._makeLocalGettersCache = Object.create(null)),
        (this._scope = null),
        (this._devtools = s);
      var i = this,
        a = this,
        l = a.dispatch,
        u = a.commit;
      (this.dispatch = function (d, p) {
        return l.call(i, d, p);
      }),
        (this.commit = function (d, p, h) {
          return u.call(i, d, p, h);
        }),
        (this.strict = o);
      var c = this._modules.root.state;
      ui(this, c, [], this._modules.root),
        Ll(this, c),
        r.forEach(function (f) {
          return f(n);
        });
    },
    Bl = { state: { configurable: !0 } };
  _t.prototype.install = function (t, n) {
    t.provide(n || Sh, this), (t.config.globalProperties.$store = this);
    var r = this._devtools !== void 0 ? this._devtools : !1;
    r && s$(t, this);
  };
  Bl.state.get = function () {
    return this._state.data;
  };
  Bl.state.set = function (e) {};
  _t.prototype.commit = function (t, n, r) {
    var o = this,
      s = Ls(t, n, r),
      i = s.type,
      a = s.payload,
      l = { type: i, payload: a },
      u = this._mutations[i];
    u &&
      (this._withCommit(function () {
        u.forEach(function (f) {
          f(a);
        });
      }),
      this._subscribers.slice().forEach(function (c) {
        return c(l, o.state);
      }));
  };
  _t.prototype.dispatch = function (t, n) {
    var r = this,
      o = Ls(t, n),
      s = o.type,
      i = o.payload,
      a = { type: s, payload: i },
      l = this._actions[s];
    if (l) {
      try {
        this._actionSubscribers
          .slice()
          .filter(function (c) {
            return c.before;
          })
          .forEach(function (c) {
            return c.before(a, r.state);
          });
      } catch {}
      var u =
        l.length > 1
          ? Promise.all(
              l.map(function (c) {
                return c(i);
              })
            )
          : l[0](i);
      return new Promise(function (c, f) {
        u.then(
          function (d) {
            try {
              r._actionSubscribers
                .filter(function (p) {
                  return p.after;
                })
                .forEach(function (p) {
                  return p.after(a, r.state);
                });
            } catch {}
            c(d);
          },
          function (d) {
            try {
              r._actionSubscribers
                .filter(function (p) {
                  return p.error;
                })
                .forEach(function (p) {
                  return p.error(a, r.state, d);
                });
            } catch {}
            f(d);
          }
        );
      });
    }
  };
  _t.prototype.subscribe = function (t, n) {
    return Oh(t, this._subscribers, n);
  };
  _t.prototype.subscribeAction = function (t, n) {
    var r = typeof t == "function" ? { before: t } : t;
    return Oh(r, this._actionSubscribers, n);
  };
  _t.prototype.watch = function (t, n, r) {
    var o = this;
    return xe(
      function () {
        return t(o.state, o.getters);
      },
      n,
      Object.assign({}, r)
    );
  };
  _t.prototype.replaceState = function (t) {
    var n = this;
    this._withCommit(function () {
      n._state.data = t;
    });
  };
  _t.prototype.registerModule = function (t, n, r) {
    r === void 0 && (r = {}),
      typeof t == "string" && (t = [t]),
      this._modules.register(t, n),
      ui(this, this.state, t, this._modules.get(t), r.preserveState),
      Ll(this, this.state);
  };
  _t.prototype.unregisterModule = function (t) {
    var n = this;
    typeof t == "string" && (t = [t]),
      this._modules.unregister(t),
      this._withCommit(function () {
        var r = jl(n.state, t.slice(0, -1));
        delete r[t[t.length - 1]];
      }),
      Th(this);
  };
  _t.prototype.hasModule = function (t) {
    return typeof t == "string" && (t = [t]), this._modules.isRegistered(t);
  };
  _t.prototype.hotUpdate = function (t) {
    this._modules.update(t), Th(this, !0);
  };
  _t.prototype._withCommit = function (t) {
    var n = this._committing;
    (this._committing = !0), t(), (this._committing = n);
  };
  Object.defineProperties(_t.prototype, Bl);
  /*!
   * vue-router v4.1.6
   * (c) 2022 Eduardo San Martin Morote
   * @license MIT
   */ const xr = typeof window < "u";
  function d$(e) {
    return e.__esModule || e[Symbol.toStringTag] === "Module";
  }
  const Be = Object.assign;
  function Li(e, t) {
    const n = {};
    for (const r in t) {
      const o = t[r];
      n[r] = qt(o) ? o.map(e) : e(o);
    }
    return n;
  }
  const wo = () => {},
    qt = Array.isArray,
    p$ = /\/$/,
    h$ = (e) => e.replace(p$, "");
  function ji(e, t, n = "/") {
    let r,
      o = {},
      s = "",
      i = "";
    const a = t.indexOf("#");
    let l = t.indexOf("?");
    return (
      a < l && a >= 0 && (l = -1),
      l > -1 &&
        ((r = t.slice(0, l)),
        (s = t.slice(l + 1, a > -1 ? a : t.length)),
        (o = e(s))),
      a > -1 && ((r = r || t.slice(0, a)), (i = t.slice(a, t.length))),
      (r = y$(r ?? t, n)),
      { fullPath: r + (s && "?") + s + i, path: r, query: o, hash: i }
    );
  }
  function g$(e, t) {
    const n = t.query ? e(t.query) : "";
    return t.path + (n && "?") + n + (t.hash || "");
  }
  function nf(e, t) {
    return !t || !e.toLowerCase().startsWith(t.toLowerCase())
      ? e
      : e.slice(t.length) || "/";
  }
  function m$(e, t, n) {
    const r = t.matched.length - 1,
      o = n.matched.length - 1;
    return (
      r > -1 &&
      r === o &&
      zr(t.matched[r], n.matched[o]) &&
      Ih(t.params, n.params) &&
      e(t.query) === e(n.query) &&
      t.hash === n.hash
    );
  }
  function zr(e, t) {
    return (e.aliasOf || e) === (t.aliasOf || t);
  }
  function Ih(e, t) {
    if (Object.keys(e).length !== Object.keys(t).length) return !1;
    for (const n in e) if (!v$(e[n], t[n])) return !1;
    return !0;
  }
  function v$(e, t) {
    return qt(e) ? rf(e, t) : qt(t) ? rf(t, e) : e === t;
  }
  function rf(e, t) {
    return qt(t)
      ? e.length === t.length && e.every((n, r) => n === t[r])
      : e.length === 1 && e[0] === t;
  }
  function y$(e, t) {
    if (e.startsWith("/")) return e;
    if (!e) return t;
    const n = t.split("/"),
      r = e.split("/");
    let o = n.length - 1,
      s,
      i;
    for (s = 0; s < r.length; s++)
      if (((i = r[s]), i !== "."))
        if (i === "..") o > 1 && o--;
        else break;
    return (
      n.slice(0, o).join("/") +
      "/" +
      r.slice(s - (s === r.length ? 1 : 0)).join("/")
    );
  }
  var Bo;
  (function (e) {
    (e.pop = "pop"), (e.push = "push");
  })(Bo || (Bo = {}));
  var xo;
  (function (e) {
    (e.back = "back"), (e.forward = "forward"), (e.unknown = "");
  })(xo || (xo = {}));
  function b$(e) {
    if (!e)
      if (xr) {
        const t = document.querySelector("base");
        (e = (t && t.getAttribute("href")) || "/"),
          (e = e.replace(/^\w+:\/\/[^\/]+/, ""));
      } else e = "/";
    return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), h$(e);
  }
  const _$ = /^[^#]+#/;
  function w$(e, t) {
    return e.replace(_$, "#") + t;
  }
  function x$(e, t) {
    const n = document.documentElement.getBoundingClientRect(),
      r = e.getBoundingClientRect();
    return {
      behavior: t.behavior,
      left: r.left - n.left - (t.left || 0),
      top: r.top - n.top - (t.top || 0),
    };
  }
  const ci = () => ({ left: window.pageXOffset, top: window.pageYOffset });
  function E$(e) {
    let t;
    if ("el" in e) {
      const n = e.el,
        r = typeof n == "string" && n.startsWith("#"),
        o =
          typeof n == "string"
            ? r
              ? document.getElementById(n.slice(1))
              : document.querySelector(n)
            : n;
      if (!o) return;
      t = x$(o, e);
    } else t = e;
    "scrollBehavior" in document.documentElement.style
      ? window.scrollTo(t)
      : window.scrollTo(
          t.left != null ? t.left : window.pageXOffset,
          t.top != null ? t.top : window.pageYOffset
        );
  }
  function of(e, t) {
    return (history.state ? history.state.position - t : -1) + e;
  }
  const Ta = new Map();
  function S$(e, t) {
    Ta.set(e, t);
  }
  function O$(e) {
    const t = Ta.get(e);
    return Ta.delete(e), t;
  }
  let T$ = () => location.protocol + "//" + location.host;
  function Fh(e, t) {
    const { pathname: n, search: r, hash: o } = t,
      s = e.indexOf("#");
    if (s > -1) {
      let a = o.includes(e.slice(s)) ? e.slice(s).length : 1,
        l = o.slice(a);
      return l[0] !== "/" && (l = "/" + l), nf(l, "");
    }
    return nf(n, e) + r + o;
  }
  function $$(e, t, n, r) {
    let o = [],
      s = [],
      i = null;
    const a = ({ state: d }) => {
      const p = Fh(e, location),
        h = n.value,
        g = t.value;
      let _ = 0;
      if (d) {
        if (((n.value = p), (t.value = d), i && i === h)) {
          i = null;
          return;
        }
        _ = g ? d.position - g.position : 0;
      } else r(p);
      o.forEach((m) => {
        m(n.value, h, {
          delta: _,
          type: Bo.pop,
          direction: _ ? (_ > 0 ? xo.forward : xo.back) : xo.unknown,
        });
      });
    };
    function l() {
      i = n.value;
    }
    function u(d) {
      o.push(d);
      const p = () => {
        const h = o.indexOf(d);
        h > -1 && o.splice(h, 1);
      };
      return s.push(p), p;
    }
    function c() {
      const { history: d } = window;
      d.state && d.replaceState(Be({}, d.state, { scroll: ci() }), "");
    }
    function f() {
      for (const d of s) d();
      (s = []),
        window.removeEventListener("popstate", a),
        window.removeEventListener("beforeunload", c);
    }
    return (
      window.addEventListener("popstate", a),
      window.addEventListener("beforeunload", c),
      { pauseListeners: l, listen: u, destroy: f }
    );
  }
  function sf(e, t, n, r = !1, o = !1) {
    return {
      back: e,
      current: t,
      forward: n,
      replaced: r,
      position: window.history.length,
      scroll: o ? ci() : null,
    };
  }
  function C$(e) {
    const { history: t, location: n } = window,
      r = { value: Fh(e, n) },
      o = { value: t.state };
    o.value ||
      s(
        r.value,
        {
          back: null,
          current: r.value,
          forward: null,
          position: t.length - 1,
          replaced: !0,
          scroll: null,
        },
        !0
      );
    function s(l, u, c) {
      const f = e.indexOf("#"),
        d =
          f > -1
            ? (n.host && document.querySelector("base") ? e : e.slice(f)) + l
            : T$() + e + l;
      try {
        t[c ? "replaceState" : "pushState"](u, "", d), (o.value = u);
      } catch (p) {
        console.error(p), n[c ? "replace" : "assign"](d);
      }
    }
    function i(l, u) {
      const c = Be({}, t.state, sf(o.value.back, l, o.value.forward, !0), u, {
        position: o.value.position,
      });
      s(l, c, !0), (r.value = l);
    }
    function a(l, u) {
      const c = Be({}, o.value, t.state, { forward: l, scroll: ci() });
      s(c.current, c, !0);
      const f = Be({}, sf(r.value, l, null), { position: c.position + 1 }, u);
      s(l, f, !1), (r.value = l);
    }
    return { location: r, state: o, push: a, replace: i };
  }
  function A$(e) {
    e = b$(e);
    const t = C$(e),
      n = $$(e, t.state, t.location, t.replace);
    function r(s, i = !0) {
      i || n.pauseListeners(), history.go(s);
    }
    const o = Be(
      { location: "", base: e, go: r, createHref: w$.bind(null, e) },
      t,
      n
    );
    return (
      Object.defineProperty(o, "location", {
        enumerable: !0,
        get: () => t.location.value,
      }),
      Object.defineProperty(o, "state", {
        enumerable: !0,
        get: () => t.state.value,
      }),
      o
    );
  }
  function k$(e) {
    return (
      (e = location.host ? e || location.pathname + location.search : ""),
      e.includes("#") || (e += "#"),
      A$(e)
    );
  }
  function P$(e) {
    return typeof e == "string" || (e && typeof e == "object");
  }
  function Nh(e) {
    return typeof e == "string" || typeof e == "symbol";
  }
  const On = {
      path: "/",
      name: void 0,
      params: {},
      query: {},
      hash: "",
      fullPath: "/",
      matched: [],
      meta: {},
      redirectedFrom: void 0,
    },
    Lh = Symbol("");
  var af;
  (function (e) {
    (e[(e.aborted = 4)] = "aborted"),
      (e[(e.cancelled = 8)] = "cancelled"),
      (e[(e.duplicated = 16)] = "duplicated");
  })(af || (af = {}));
  function Hr(e, t) {
    return Be(new Error(), { type: e, [Lh]: !0 }, t);
  }
  function ln(e, t) {
    return e instanceof Error && Lh in e && (t == null || !!(e.type & t));
  }
  const lf = "[^/]+?",
    R$ = { sensitive: !1, strict: !1, start: !0, end: !0 },
    M$ = /[.+*?^${}()[\]/\\]/g;
  function I$(e, t) {
    const n = Be({}, R$, t),
      r = [];
    let o = n.start ? "^" : "";
    const s = [];
    for (const u of e) {
      const c = u.length ? [] : [90];
      n.strict && !u.length && (o += "/");
      for (let f = 0; f < u.length; f++) {
        const d = u[f];
        let p = 40 + (n.sensitive ? 0.25 : 0);
        if (d.type === 0)
          f || (o += "/"), (o += d.value.replace(M$, "\\$&")), (p += 40);
        else if (d.type === 1) {
          const { value: h, repeatable: g, optional: _, regexp: m } = d;
          s.push({ name: h, repeatable: g, optional: _ });
          const w = m || lf;
          if (w !== lf) {
            p += 10;
            try {
              new RegExp(`(${w})`);
            } catch (E) {
              throw new Error(
                `Invalid custom RegExp for param "${h}" (${w}): ` + E.message
              );
            }
          }
          let x = g ? `((?:${w})(?:/(?:${w}))*)` : `(${w})`;
          f || (x = _ && u.length < 2 ? `(?:/${x})` : "/" + x),
            _ && (x += "?"),
            (o += x),
            (p += 20),
            _ && (p += -8),
            g && (p += -20),
            w === ".*" && (p += -50);
        }
        c.push(p);
      }
      r.push(c);
    }
    if (n.strict && n.end) {
      const u = r.length - 1;
      r[u][r[u].length - 1] += 0.7000000000000001;
    }
    n.strict || (o += "/?"), n.end ? (o += "$") : n.strict && (o += "(?:/|$)");
    const i = new RegExp(o, n.sensitive ? "" : "i");
    function a(u) {
      const c = u.match(i),
        f = {};
      if (!c) return null;
      for (let d = 1; d < c.length; d++) {
        const p = c[d] || "",
          h = s[d - 1];
        f[h.name] = p && h.repeatable ? p.split("/") : p;
      }
      return f;
    }
    function l(u) {
      let c = "",
        f = !1;
      for (const d of e) {
        (!f || !c.endsWith("/")) && (c += "/"), (f = !1);
        for (const p of d)
          if (p.type === 0) c += p.value;
          else if (p.type === 1) {
            const { value: h, repeatable: g, optional: _ } = p,
              m = h in u ? u[h] : "";
            if (qt(m) && !g)
              throw new Error(
                `Provided param "${h}" is an array but it is not repeatable (* or + modifiers)`
              );
            const w = qt(m) ? m.join("/") : m;
            if (!w)
              if (_)
                d.length < 2 &&
                  (c.endsWith("/") ? (c = c.slice(0, -1)) : (f = !0));
              else throw new Error(`Missing required param "${h}"`);
            c += w;
          }
      }
      return c || "/";
    }
    return { re: i, score: r, keys: s, parse: a, stringify: l };
  }
  function F$(e, t) {
    let n = 0;
    for (; n < e.length && n < t.length; ) {
      const r = t[n] - e[n];
      if (r) return r;
      n++;
    }
    return e.length < t.length
      ? e.length === 1 && e[0] === 40 + 40
        ? -1
        : 1
      : e.length > t.length
      ? t.length === 1 && t[0] === 40 + 40
        ? 1
        : -1
      : 0;
  }
  function N$(e, t) {
    let n = 0;
    const r = e.score,
      o = t.score;
    for (; n < r.length && n < o.length; ) {
      const s = F$(r[n], o[n]);
      if (s) return s;
      n++;
    }
    if (Math.abs(o.length - r.length) === 1) {
      if (uf(r)) return 1;
      if (uf(o)) return -1;
    }
    return o.length - r.length;
  }
  function uf(e) {
    const t = e[e.length - 1];
    return e.length > 0 && t[t.length - 1] < 0;
  }
  const L$ = { type: 0, value: "" },
    j$ = /[a-zA-Z0-9_]/;
  function B$(e) {
    if (!e) return [[]];
    if (e === "/") return [[L$]];
    if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
    function t(p) {
      throw new Error(`ERR (${n})/"${u}": ${p}`);
    }
    let n = 0,
      r = n;
    const o = [];
    let s;
    function i() {
      s && o.push(s), (s = []);
    }
    let a = 0,
      l,
      u = "",
      c = "";
    function f() {
      u &&
        (n === 0
          ? s.push({ type: 0, value: u })
          : n === 1 || n === 2 || n === 3
          ? (s.length > 1 &&
              (l === "*" || l === "+") &&
              t(
                `A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`
              ),
            s.push({
              type: 1,
              value: u,
              regexp: c,
              repeatable: l === "*" || l === "+",
              optional: l === "*" || l === "?",
            }))
          : t("Invalid state to consume buffer"),
        (u = ""));
    }
    function d() {
      u += l;
    }
    for (; a < e.length; ) {
      if (((l = e[a++]), l === "\\" && n !== 2)) {
        (r = n), (n = 4);
        continue;
      }
      switch (n) {
        case 0:
          l === "/" ? (u && f(), i()) : l === ":" ? (f(), (n = 1)) : d();
          break;
        case 4:
          d(), (n = r);
          break;
        case 1:
          l === "("
            ? (n = 2)
            : j$.test(l)
            ? d()
            : (f(), (n = 0), l !== "*" && l !== "?" && l !== "+" && a--);
          break;
        case 2:
          l === ")"
            ? c[c.length - 1] == "\\"
              ? (c = c.slice(0, -1) + l)
              : (n = 3)
            : (c += l);
          break;
        case 3:
          f(), (n = 0), l !== "*" && l !== "?" && l !== "+" && a--, (c = "");
          break;
        default:
          t("Unknown state");
          break;
      }
    }
    return (
      n === 2 && t(`Unfinished custom RegExp for param "${u}"`), f(), i(), o
    );
  }
  function D$(e, t, n) {
    const r = I$(B$(e.path), n),
      o = Be(r, { record: e, parent: t, children: [], alias: [] });
    return t && !o.record.aliasOf == !t.record.aliasOf && t.children.push(o), o;
  }
  function z$(e, t) {
    const n = [],
      r = new Map();
    t = df({ strict: !1, end: !0, sensitive: !1 }, t);
    function o(c) {
      return r.get(c);
    }
    function s(c, f, d) {
      const p = !d,
        h = H$(c);
      h.aliasOf = d && d.record;
      const g = df(t, c),
        _ = [h];
      if ("alias" in c) {
        const x = typeof c.alias == "string" ? [c.alias] : c.alias;
        for (const E of x)
          _.push(
            Be({}, h, {
              components: d ? d.record.components : h.components,
              path: E,
              aliasOf: d ? d.record : h,
            })
          );
      }
      let m, w;
      for (const x of _) {
        const { path: E } = x;
        if (f && E[0] !== "/") {
          const I = f.record.path,
            N = I[I.length - 1] === "/" ? "" : "/";
          x.path = f.record.path + (E && N + E);
        }
        if (
          ((m = D$(x, f, g)),
          d
            ? d.alias.push(m)
            : ((w = w || m),
              w !== m && w.alias.push(m),
              p && c.name && !ff(m) && i(c.name)),
          h.children)
        ) {
          const I = h.children;
          for (let N = 0; N < I.length; N++) s(I[N], m, d && d.children[N]);
        }
        (d = d || m),
          ((m.record.components && Object.keys(m.record.components).length) ||
            m.record.name ||
            m.record.redirect) &&
            l(m);
      }
      return w
        ? () => {
            i(w);
          }
        : wo;
    }
    function i(c) {
      if (Nh(c)) {
        const f = r.get(c);
        f &&
          (r.delete(c),
          n.splice(n.indexOf(f), 1),
          f.children.forEach(i),
          f.alias.forEach(i));
      } else {
        const f = n.indexOf(c);
        f > -1 &&
          (n.splice(f, 1),
          c.record.name && r.delete(c.record.name),
          c.children.forEach(i),
          c.alias.forEach(i));
      }
    }
    function a() {
      return n;
    }
    function l(c) {
      let f = 0;
      for (
        ;
        f < n.length &&
        N$(c, n[f]) >= 0 &&
        (c.record.path !== n[f].record.path || !jh(c, n[f]));

      )
        f++;
      n.splice(f, 0, c), c.record.name && !ff(c) && r.set(c.record.name, c);
    }
    function u(c, f) {
      let d,
        p = {},
        h,
        g;
      if ("name" in c && c.name) {
        if (((d = r.get(c.name)), !d)) throw Hr(1, { location: c });
        (g = d.record.name),
          (p = Be(
            cf(
              f.params,
              d.keys.filter((w) => !w.optional).map((w) => w.name)
            ),
            c.params &&
              cf(
                c.params,
                d.keys.map((w) => w.name)
              )
          )),
          (h = d.stringify(p));
      } else if ("path" in c)
        (h = c.path),
          (d = n.find((w) => w.re.test(h))),
          d && ((p = d.parse(h)), (g = d.record.name));
      else {
        if (
          ((d = f.name ? r.get(f.name) : n.find((w) => w.re.test(f.path))), !d)
        )
          throw Hr(1, { location: c, currentLocation: f });
        (g = d.record.name),
          (p = Be({}, f.params, c.params)),
          (h = d.stringify(p));
      }
      const _ = [];
      let m = d;
      for (; m; ) _.unshift(m.record), (m = m.parent);
      return { name: g, path: h, params: p, matched: _, meta: q$(_) };
    }
    return (
      e.forEach((c) => s(c)),
      {
        addRoute: s,
        resolve: u,
        removeRoute: i,
        getRoutes: a,
        getRecordMatcher: o,
      }
    );
  }
  function cf(e, t) {
    const n = {};
    for (const r of t) r in e && (n[r] = e[r]);
    return n;
  }
  function H$(e) {
    return {
      path: e.path,
      redirect: e.redirect,
      name: e.name,
      meta: e.meta || {},
      aliasOf: void 0,
      beforeEnter: e.beforeEnter,
      props: U$(e),
      children: e.children || [],
      instances: {},
      leaveGuards: new Set(),
      updateGuards: new Set(),
      enterCallbacks: {},
      components:
        "components" in e
          ? e.components || null
          : e.component && { default: e.component },
    };
  }
  function U$(e) {
    const t = {},
      n = e.props || !1;
    if ("component" in e) t.default = n;
    else for (const r in e.components) t[r] = typeof n == "boolean" ? n : n[r];
    return t;
  }
  function ff(e) {
    for (; e; ) {
      if (e.record.aliasOf) return !0;
      e = e.parent;
    }
    return !1;
  }
  function q$(e) {
    return e.reduce((t, n) => Be(t, n.meta), {});
  }
  function df(e, t) {
    const n = {};
    for (const r in e) n[r] = r in t ? t[r] : e[r];
    return n;
  }
  function jh(e, t) {
    return t.children.some((n) => n === e || jh(e, n));
  }
  const Bh = /#/g,
    V$ = /&/g,
    W$ = /\//g,
    K$ = /=/g,
    G$ = /\?/g,
    Dh = /\+/g,
    J$ = /%5B/g,
    Z$ = /%5D/g,
    zh = /%5E/g,
    Y$ = /%60/g,
    Hh = /%7B/g,
    Q$ = /%7C/g,
    Uh = /%7D/g,
    X$ = /%20/g;
  function Dl(e) {
    return encodeURI("" + e)
      .replace(Q$, "|")
      .replace(J$, "[")
      .replace(Z$, "]");
  }
  function eC(e) {
    return Dl(e).replace(Hh, "{").replace(Uh, "}").replace(zh, "^");
  }
  function $a(e) {
    return Dl(e)
      .replace(Dh, "%2B")
      .replace(X$, "+")
      .replace(Bh, "%23")
      .replace(V$, "%26")
      .replace(Y$, "`")
      .replace(Hh, "{")
      .replace(Uh, "}")
      .replace(zh, "^");
  }
  function tC(e) {
    return $a(e).replace(K$, "%3D");
  }
  function nC(e) {
    return Dl(e).replace(Bh, "%23").replace(G$, "%3F");
  }
  function rC(e) {
    return e == null ? "" : nC(e).replace(W$, "%2F");
  }
  function js(e) {
    try {
      return decodeURIComponent("" + e);
    } catch {}
    return "" + e;
  }
  function oC(e) {
    const t = {};
    if (e === "" || e === "?") return t;
    const r = (e[0] === "?" ? e.slice(1) : e).split("&");
    for (let o = 0; o < r.length; ++o) {
      const s = r[o].replace(Dh, " "),
        i = s.indexOf("="),
        a = js(i < 0 ? s : s.slice(0, i)),
        l = i < 0 ? null : js(s.slice(i + 1));
      if (a in t) {
        let u = t[a];
        qt(u) || (u = t[a] = [u]), u.push(l);
      } else t[a] = l;
    }
    return t;
  }
  function pf(e) {
    let t = "";
    for (let n in e) {
      const r = e[n];
      if (((n = tC(n)), r == null)) {
        r !== void 0 && (t += (t.length ? "&" : "") + n);
        continue;
      }
      (qt(r) ? r.map((s) => s && $a(s)) : [r && $a(r)]).forEach((s) => {
        s !== void 0 &&
          ((t += (t.length ? "&" : "") + n), s != null && (t += "=" + s));
      });
    }
    return t;
  }
  function sC(e) {
    const t = {};
    for (const n in e) {
      const r = e[n];
      r !== void 0 &&
        (t[n] = qt(r)
          ? r.map((o) => (o == null ? null : "" + o))
          : r == null
          ? r
          : "" + r);
    }
    return t;
  }
  const iC = Symbol(""),
    hf = Symbol(""),
    fi = Symbol(""),
    qh = Symbol(""),
    Ca = Symbol("");
  function lo() {
    let e = [];
    function t(r) {
      return (
        e.push(r),
        () => {
          const o = e.indexOf(r);
          o > -1 && e.splice(o, 1);
        }
      );
    }
    function n() {
      e = [];
    }
    return { add: t, list: () => e, reset: n };
  }
  function kn(e, t, n, r, o) {
    const s = r && (r.enterCallbacks[o] = r.enterCallbacks[o] || []);
    return () =>
      new Promise((i, a) => {
        const l = (f) => {
            f === !1
              ? a(Hr(4, { from: n, to: t }))
              : f instanceof Error
              ? a(f)
              : P$(f)
              ? a(Hr(2, { from: t, to: f }))
              : (s &&
                  r.enterCallbacks[o] === s &&
                  typeof f == "function" &&
                  s.push(f),
                i());
          },
          u = e.call(r && r.instances[o], t, n, l);
        let c = Promise.resolve(u);
        e.length < 3 && (c = c.then(l)), c.catch((f) => a(f));
      });
  }
  function Bi(e, t, n, r) {
    const o = [];
    for (const s of e)
      for (const i in s.components) {
        let a = s.components[i];
        if (!(t !== "beforeRouteEnter" && !s.instances[i]))
          if (aC(a)) {
            const u = (a.__vccOpts || a)[t];
            u && o.push(kn(u, n, r, s, i));
          } else {
            let l = a();
            o.push(() =>
              l.then((u) => {
                if (!u)
                  return Promise.reject(
                    new Error(
                      `Couldn't resolve component "${i}" at "${s.path}"`
                    )
                  );
                const c = d$(u) ? u.default : u;
                s.components[i] = c;
                const d = (c.__vccOpts || c)[t];
                return d && kn(d, n, r, s, i)();
              })
            );
          }
      }
    return o;
  }
  function aC(e) {
    return (
      typeof e == "object" ||
      "displayName" in e ||
      "props" in e ||
      "__vccOpts" in e
    );
  }
  function gf(e) {
    const t = Pe(fi),
      n = Pe(qh),
      r = M(() => t.resolve(y(e.to))),
      o = M(() => {
        const { matched: l } = r.value,
          { length: u } = l,
          c = l[u - 1],
          f = n.matched;
        if (!c || !f.length) return -1;
        const d = f.findIndex(zr.bind(null, c));
        if (d > -1) return d;
        const p = mf(l[u - 2]);
        return u > 1 && mf(c) === p && f[f.length - 1].path !== p
          ? f.findIndex(zr.bind(null, l[u - 2]))
          : d;
      }),
      s = M(() => o.value > -1 && fC(n.params, r.value.params)),
      i = M(
        () =>
          o.value > -1 &&
          o.value === n.matched.length - 1 &&
          Ih(n.params, r.value.params)
      );
    function a(l = {}) {
      return cC(l)
        ? t[y(e.replace) ? "replace" : "push"](y(e.to)).catch(wo)
        : Promise.resolve();
    }
    return {
      route: r,
      href: M(() => r.value.href),
      isActive: s,
      isExactActive: i,
      navigate: a,
    };
  }
  const lC = be({
      name: "RouterLink",
      compatConfig: { MODE: 3 },
      props: {
        to: { type: [String, Object], required: !0 },
        replace: Boolean,
        activeClass: String,
        exactActiveClass: String,
        custom: Boolean,
        ariaCurrentValue: { type: String, default: "page" },
      },
      useLink: gf,
      setup(e, { slots: t }) {
        const n = ft(gf(e)),
          { options: r } = Pe(fi),
          o = M(() => ({
            [vf(e.activeClass, r.linkActiveClass, "router-link-active")]:
              n.isActive,
            [vf(
              e.exactActiveClass,
              r.linkExactActiveClass,
              "router-link-exact-active"
            )]: n.isExactActive,
          }));
        return () => {
          const s = t.default && t.default(n);
          return e.custom
            ? s
            : qe(
                "a",
                {
                  "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
                  href: n.href,
                  onClick: n.navigate,
                  class: o.value,
                },
                s
              );
        };
      },
    }),
    uC = lC;
  function cC(e) {
    if (
      !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
      !e.defaultPrevented &&
      !(e.button !== void 0 && e.button !== 0)
    ) {
      if (e.currentTarget && e.currentTarget.getAttribute) {
        const t = e.currentTarget.getAttribute("target");
        if (/\b_blank\b/i.test(t)) return;
      }
      return e.preventDefault && e.preventDefault(), !0;
    }
  }
  function fC(e, t) {
    for (const n in t) {
      const r = t[n],
        o = e[n];
      if (typeof r == "string") {
        if (r !== o) return !1;
      } else if (
        !qt(o) ||
        o.length !== r.length ||
        r.some((s, i) => s !== o[i])
      )
        return !1;
    }
    return !0;
  }
  function mf(e) {
    return e ? (e.aliasOf ? e.aliasOf.path : e.path) : "";
  }
  const vf = (e, t, n) => e ?? t ?? n,
    dC = be({
      name: "RouterView",
      inheritAttrs: !1,
      props: { name: { type: String, default: "default" }, route: Object },
      compatConfig: { MODE: 3 },
      setup(e, { attrs: t, slots: n }) {
        const r = Pe(Ca),
          o = M(() => e.route || r.value),
          s = Pe(hf, 0),
          i = M(() => {
            let u = y(s);
            const { matched: c } = o.value;
            let f;
            for (; (f = c[u]) && !f.components; ) u++;
            return u;
          }),
          a = M(() => o.value.matched[i.value]);
        ot(
          hf,
          M(() => i.value + 1)
        ),
          ot(iC, a),
          ot(Ca, o);
        const l = re();
        return (
          xe(
            () => [l.value, a.value, e.name],
            ([u, c, f], [d, p, h]) => {
              c &&
                ((c.instances[f] = u),
                p &&
                  p !== c &&
                  u &&
                  u === d &&
                  (c.leaveGuards.size || (c.leaveGuards = p.leaveGuards),
                  c.updateGuards.size || (c.updateGuards = p.updateGuards))),
                u &&
                  c &&
                  (!p || !zr(c, p) || !d) &&
                  (c.enterCallbacks[f] || []).forEach((g) => g(u));
            },
            { flush: "post" }
          ),
          () => {
            const u = o.value,
              c = e.name,
              f = a.value,
              d = f && f.components[c];
            if (!d) return yf(n.default, { Component: d, route: u });
            const p = f.props[c],
              h = p
                ? p === !0
                  ? u.params
                  : typeof p == "function"
                  ? p(u)
                  : p
                : null,
              _ = qe(
                d,
                Be({}, h, t, {
                  onVnodeUnmounted: (m) => {
                    m.component.isUnmounted && (f.instances[c] = null);
                  },
                  ref: l,
                })
              );
            return yf(n.default, { Component: _, route: u }) || _;
          }
        );
      },
    });
  function yf(e, t) {
    if (!e) return null;
    const n = e(t);
    return n.length === 1 ? n[0] : n;
  }
  const pC = dC;
  function hC(e) {
    const t = z$(e.routes, e),
      n = e.parseQuery || oC,
      r = e.stringifyQuery || pf,
      o = e.history,
      s = lo(),
      i = lo(),
      a = lo(),
      l = $r(On);
    let u = On;
    xr &&
      e.scrollBehavior &&
      "scrollRestoration" in history &&
      (history.scrollRestoration = "manual");
    const c = Li.bind(null, (P) => "" + P),
      f = Li.bind(null, rC),
      d = Li.bind(null, js);
    function p(P, Z) {
      let A, K;
      return (
        Nh(P) ? ((A = t.getRecordMatcher(P)), (K = Z)) : (K = P),
        t.addRoute(K, A)
      );
    }
    function h(P) {
      const Z = t.getRecordMatcher(P);
      Z && t.removeRoute(Z);
    }
    function g() {
      return t.getRoutes().map((P) => P.record);
    }
    function _(P) {
      return !!t.getRecordMatcher(P);
    }
    function m(P, Z) {
      if (((Z = Be({}, Z || l.value)), typeof P == "string")) {
        const v = ji(n, P, Z.path),
          b = t.resolve({ path: v.path }, Z),
          R = o.createHref(v.fullPath);
        return Be(v, b, {
          params: d(b.params),
          hash: js(v.hash),
          redirectedFrom: void 0,
          href: R,
        });
      }
      let A;
      if ("path" in P) A = Be({}, P, { path: ji(n, P.path, Z.path).path });
      else {
        const v = Be({}, P.params);
        for (const b in v) v[b] == null && delete v[b];
        (A = Be({}, P, { params: f(P.params) })), (Z.params = f(Z.params));
      }
      const K = t.resolve(A, Z),
        ne = P.hash || "";
      K.params = c(d(K.params));
      const ue = g$(r, Be({}, P, { hash: eC(ne), path: K.path })),
        ae = o.createHref(ue);
      return Be(
        {
          fullPath: ue,
          hash: ne,
          query: r === pf ? sC(P.query) : P.query || {},
        },
        K,
        { redirectedFrom: void 0, href: ae }
      );
    }
    function w(P) {
      return typeof P == "string" ? ji(n, P, l.value.path) : Be({}, P);
    }
    function x(P, Z) {
      if (u !== P) return Hr(8, { from: Z, to: P });
    }
    function E(P) {
      return D(P);
    }
    function I(P) {
      return E(Be(w(P), { replace: !0 }));
    }
    function N(P) {
      const Z = P.matched[P.matched.length - 1];
      if (Z && Z.redirect) {
        const { redirect: A } = Z;
        let K = typeof A == "function" ? A(P) : A;
        return (
          typeof K == "string" &&
            ((K =
              K.includes("?") || K.includes("#") ? (K = w(K)) : { path: K }),
            (K.params = {})),
          Be(
            {
              query: P.query,
              hash: P.hash,
              params: "path" in K ? {} : P.params,
            },
            K
          )
        );
      }
    }
    function D(P, Z) {
      const A = (u = m(P)),
        K = l.value,
        ne = P.state,
        ue = P.force,
        ae = P.replace === !0,
        v = N(A);
      if (v)
        return D(
          Be(w(v), {
            state: typeof v == "object" ? Be({}, ne, v.state) : ne,
            force: ue,
            replace: ae,
          }),
          Z || A
        );
      const b = A;
      b.redirectedFrom = Z;
      let R;
      return (
        !ue &&
          m$(r, K, A) &&
          ((R = Hr(16, { to: b, from: K })), oe(K, K, !0, !1)),
        (R ? Promise.resolve(R) : H(b, K))
          .catch((j) => (ln(j) ? (ln(j, 2) ? j : W(j)) : k(j, b, K)))
          .then((j) => {
            if (j) {
              if (ln(j, 2))
                return D(
                  Be({ replace: ae }, w(j.to), {
                    state:
                      typeof j.to == "object" ? Be({}, ne, j.to.state) : ne,
                    force: ue,
                  }),
                  Z || b
                );
            } else j = U(b, K, !0, ae, ne);
            return S(b, K, j), j;
          })
      );
    }
    function T(P, Z) {
      const A = x(P, Z);
      return A ? Promise.reject(A) : Promise.resolve();
    }
    function H(P, Z) {
      let A;
      const [K, ne, ue] = gC(P, Z);
      A = Bi(K.reverse(), "beforeRouteLeave", P, Z);
      for (const v of K)
        v.leaveGuards.forEach((b) => {
          A.push(kn(b, P, Z));
        });
      const ae = T.bind(null, P, Z);
      return (
        A.push(ae),
        _r(A)
          .then(() => {
            A = [];
            for (const v of s.list()) A.push(kn(v, P, Z));
            return A.push(ae), _r(A);
          })
          .then(() => {
            A = Bi(ne, "beforeRouteUpdate", P, Z);
            for (const v of ne)
              v.updateGuards.forEach((b) => {
                A.push(kn(b, P, Z));
              });
            return A.push(ae), _r(A);
          })
          .then(() => {
            A = [];
            for (const v of P.matched)
              if (v.beforeEnter && !Z.matched.includes(v))
                if (qt(v.beforeEnter))
                  for (const b of v.beforeEnter) A.push(kn(b, P, Z));
                else A.push(kn(v.beforeEnter, P, Z));
            return A.push(ae), _r(A);
          })
          .then(
            () => (
              P.matched.forEach((v) => (v.enterCallbacks = {})),
              (A = Bi(ue, "beforeRouteEnter", P, Z)),
              A.push(ae),
              _r(A)
            )
          )
          .then(() => {
            A = [];
            for (const v of i.list()) A.push(kn(v, P, Z));
            return A.push(ae), _r(A);
          })
          .catch((v) => (ln(v, 8) ? v : Promise.reject(v)))
      );
    }
    function S(P, Z, A) {
      for (const K of a.list()) K(P, Z, A);
    }
    function U(P, Z, A, K, ne) {
      const ue = x(P, Z);
      if (ue) return ue;
      const ae = Z === On,
        v = xr ? history.state : {};
      A &&
        (K || ae
          ? o.replace(P.fullPath, Be({ scroll: ae && v && v.scroll }, ne))
          : o.push(P.fullPath, ne)),
        (l.value = P),
        oe(P, Z, A, ae),
        W();
    }
    let $;
    function F() {
      $ ||
        ($ = o.listen((P, Z, A) => {
          if (!Le.listening) return;
          const K = m(P),
            ne = N(K);
          if (ne) {
            D(Be(ne, { replace: !0 }), K).catch(wo);
            return;
          }
          u = K;
          const ue = l.value;
          xr && S$(of(ue.fullPath, A.delta), ci()),
            H(K, ue)
              .catch((ae) =>
                ln(ae, 12)
                  ? ae
                  : ln(ae, 2)
                  ? (D(ae.to, K)
                      .then((v) => {
                        ln(v, 20) &&
                          !A.delta &&
                          A.type === Bo.pop &&
                          o.go(-1, !1);
                      })
                      .catch(wo),
                    Promise.reject())
                  : (A.delta && o.go(-A.delta, !1), k(ae, K, ue))
              )
              .then((ae) => {
                (ae = ae || U(K, ue, !1)),
                  ae &&
                    (A.delta && !ln(ae, 8)
                      ? o.go(-A.delta, !1)
                      : A.type === Bo.pop && ln(ae, 20) && o.go(-1, !1)),
                  S(K, ue, ae);
              })
              .catch(wo);
        }));
    }
    let L = lo(),
      O = lo(),
      z;
    function k(P, Z, A) {
      W(P);
      const K = O.list();
      return (
        K.length ? K.forEach((ne) => ne(P, Z, A)) : console.error(P),
        Promise.reject(P)
      );
    }
    function G() {
      return z && l.value !== On
        ? Promise.resolve()
        : new Promise((P, Z) => {
            L.add([P, Z]);
          });
    }
    function W(P) {
      return (
        z ||
          ((z = !P),
          F(),
          L.list().forEach(([Z, A]) => (P ? A(P) : Z())),
          L.reset()),
        P
      );
    }
    function oe(P, Z, A, K) {
      const { scrollBehavior: ne } = e;
      if (!xr || !ne) return Promise.resolve();
      const ue =
        (!A && O$(of(P.fullPath, 0))) ||
        ((K || !A) && history.state && history.state.scroll) ||
        null;
      return at()
        .then(() => ne(P, Z, ue))
        .then((ae) => ae && E$(ae))
        .catch((ae) => k(ae, P, Z));
    }
    const le = (P) => o.go(P);
    let fe;
    const Oe = new Set(),
      Le = {
        currentRoute: l,
        listening: !0,
        addRoute: p,
        removeRoute: h,
        hasRoute: _,
        getRoutes: g,
        resolve: m,
        options: e,
        push: E,
        replace: I,
        go: le,
        back: () => le(-1),
        forward: () => le(1),
        beforeEach: s.add,
        beforeResolve: i.add,
        afterEach: a.add,
        onError: O.add,
        isReady: G,
        install(P) {
          const Z = this;
          P.component("RouterLink", uC),
            P.component("RouterView", pC),
            (P.config.globalProperties.$router = Z),
            Object.defineProperty(P.config.globalProperties, "$route", {
              enumerable: !0,
              get: () => y(l),
            }),
            xr &&
              !fe &&
              l.value === On &&
              ((fe = !0), E(o.location).catch((ne) => {}));
          const A = {};
          for (const ne in On) A[ne] = M(() => l.value[ne]);
          P.provide(fi, Z), P.provide(qh, ft(A)), P.provide(Ca, l);
          const K = P.unmount;
          Oe.add(P),
            (P.unmount = function () {
              Oe.delete(P),
                Oe.size < 1 &&
                  ((u = On),
                  $ && $(),
                  ($ = null),
                  (l.value = On),
                  (fe = !1),
                  (z = !1)),
                K();
            });
        },
      };
    return Le;
  }
  function _r(e) {
    return e.reduce((t, n) => t.then(() => n()), Promise.resolve());
  }
  function gC(e, t) {
    const n = [],
      r = [],
      o = [],
      s = Math.max(t.matched.length, e.matched.length);
    for (let i = 0; i < s; i++) {
      const a = t.matched[i];
      a && (e.matched.find((u) => zr(u, a)) ? r.push(a) : n.push(a));
      const l = e.matched[i];
      l && (t.matched.find((u) => zr(u, l)) || o.push(l));
    }
    return [n, r, o];
  }
  function mC() {
    return Pe(fi);
  }
  const Wo = (e, t) => {
      const n = e.__vccOpts || e;
      for (const [r, o] of t) n[r] = o;
      return n;
    },
    vC = {
      name: "Welcome",
      props: { username: { type: String, required: !0 } },
    },
    yC = { class: "welcome-container" },
    bC = { class: "welcome-text" };
  function _C(e, t, n, r, o, s) {
    return (
      ee(),
      me("div", yC, [ye("span", bC, lt(n.username ? n.username : "游客"), 1)])
    );
  }
  const wC = Wo(vC, [["render", _C]]),
    xC = {
      name: "App",
      components: { Welcome: wC },
      setup() {
        const e = mC(),
          t = re(!0),
          n = re("horizontal"),
          r = re(!1),
          o = M(() =>
            r.value && i !== "undefined" ? JSON.parse(i.value).username : ""
          );
        Ge(() => {
          s(),
            i &&
              i.value !== void 0 &&
              i.value !== "undefined" &&
              (r.value = !0),
            window.addEventListener("resize", s),
            document.querySelector("h1").addEventListener("click", () => {
              window.location.href = "./";
            });
        });
        const s = () => {
            window.innerWidth <= 350
              ? ((t.value = !0), (n.value = "vertical"))
              : ((t.value = !1), (n.value = "horizontal"));
          },
          i = gl("user"),
          a = () => {
            (i.value = "undefined"), (r.value = !1), e.push("/");
          };
        return {
          isCollapse: t,
          menuMode: n,
          isLoggedIn: r,
          user: i,
          logout: a,
          logInOrOut: () => {
            r.value ? a() : e.push("/login");
          },
          goToMessageBoard: () => {
            e.push("/message-board");
          },
          goToAbout: () => {
            e.push("/about");
          },
          welcomeName: o,
        };
      },
    },
    EC = { class: "app" },
    SC = { class: "header" },
    OC = ye("h1", null, "ChatGPT留言板", -1),
    TC = ye("b", null, "一个由ChatGPT生成前后端+MongoDB数据库操作的留言板", -1),
    $C = { class: "main" },
    CC = { style: { width: "100%", height: "300px" } };
  function AC(e, t, n, r, o, s) {
    const i = Gi("Welcome"),
      a = _T,
      l = bT,
      u = Gi("router-view");
    return (
      ee(),
      me("div", EC, [
        ye("div", SC, [
          OC,
          TC,
          ve(i, { username: r.welcomeName }, null, 8, ["username"]),
        ]),
        ye("div", $C, [
          ve(
            l,
            { collapse: r.isCollapse, mode: r.menuMode },
            {
              default: we(() => [
                ve(
                  a,
                  { index: "/", onClick: r.goToMessageBoard },
                  { default: we(() => [Pt(" 留言板 ")]), _: 1 },
                  8,
                  ["onClick"]
                ),
                ve(
                  a,
                  { index: "/login", onClick: r.logInOrOut },
                  {
                    default: we(() => [
                      Pt(lt(r.isLoggedIn ? "退出登录" : "登录"), 1),
                    ]),
                    _: 1,
                  },
                  8,
                  ["onClick"]
                ),
                ve(
                  a,
                  { index: "/about", onClick: r.goToAbout },
                  { default: we(() => [Pt(" 关于 ")]), _: 1 },
                  8,
                  ["onClick"]
                ),
              ]),
              _: 1,
            },
            8,
            ["collapse", "mode"]
          ),
          ye("div", CC, [ve(u, { class: "router-view" })]),
        ]),
      ])
    );
  }
  const kC = Wo(xC, [["render", AC]]);
  function Vh(e, t) {
    return function () {
      return e.apply(t, arguments);
    };
  }
  const { toString: Wh } = Object.prototype,
    { getPrototypeOf: zl } = Object,
    Hl = ((e) => (t) => {
      const n = Wh.call(t);
      return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
    })(Object.create(null)),
    wn = (e) => ((e = e.toLowerCase()), (t) => Hl(t) === e),
    di = (e) => (t) => typeof t === e,
    { isArray: Xr } = Array,
    Do = di("undefined");
  function PC(e) {
    return (
      e !== null &&
      !Do(e) &&
      e.constructor !== null &&
      !Do(e.constructor) &&
      Bn(e.constructor.isBuffer) &&
      e.constructor.isBuffer(e)
    );
  }
  const Kh = wn("ArrayBuffer");
  function RC(e) {
    let t;
    return (
      typeof ArrayBuffer < "u" && ArrayBuffer.isView
        ? (t = ArrayBuffer.isView(e))
        : (t = e && e.buffer && Kh(e.buffer)),
      t
    );
  }
  const MC = di("string"),
    Bn = di("function"),
    Gh = di("number"),
    Ul = (e) => e !== null && typeof e == "object",
    IC = (e) => e === !0 || e === !1,
    xs = (e) => {
      if (Hl(e) !== "object") return !1;
      const t = zl(e);
      return (
        (t === null ||
          t === Object.prototype ||
          Object.getPrototypeOf(t) === null) &&
        !(Symbol.toStringTag in e) &&
        !(Symbol.iterator in e)
      );
    },
    FC = wn("Date"),
    NC = wn("File"),
    LC = wn("Blob"),
    jC = wn("FileList"),
    BC = (e) => Ul(e) && Bn(e.pipe),
    DC = (e) => {
      const t = "[object FormData]";
      return (
        e &&
        ((typeof FormData == "function" && e instanceof FormData) ||
          Wh.call(e) === t ||
          (Bn(e.toString) && e.toString() === t))
      );
    },
    zC = wn("URLSearchParams"),
    HC = (e) =>
      e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
  function Ko(e, t, { allOwnKeys: n = !1 } = {}) {
    if (e === null || typeof e > "u") return;
    let r, o;
    if ((typeof e != "object" && (e = [e]), Xr(e)))
      for (r = 0, o = e.length; r < o; r++) t.call(null, e[r], r, e);
    else {
      const s = n ? Object.getOwnPropertyNames(e) : Object.keys(e),
        i = s.length;
      let a;
      for (r = 0; r < i; r++) (a = s[r]), t.call(null, e[a], a, e);
    }
  }
  function Jh(e, t) {
    t = t.toLowerCase();
    const n = Object.keys(e);
    let r = n.length,
      o;
    for (; r-- > 0; ) if (((o = n[r]), t === o.toLowerCase())) return o;
    return null;
  }
  const Zh = (() =>
      typeof globalThis < "u"
        ? globalThis
        : typeof self < "u"
        ? self
        : typeof window < "u"
        ? window
        : global)(),
    Yh = (e) => !Do(e) && e !== Zh;
  function Aa() {
    const { caseless: e } = (Yh(this) && this) || {},
      t = {},
      n = (r, o) => {
        const s = (e && Jh(t, o)) || o;
        xs(t[s]) && xs(r)
          ? (t[s] = Aa(t[s], r))
          : xs(r)
          ? (t[s] = Aa({}, r))
          : Xr(r)
          ? (t[s] = r.slice())
          : (t[s] = r);
      };
    for (let r = 0, o = arguments.length; r < o; r++)
      arguments[r] && Ko(arguments[r], n);
    return t;
  }
  const UC = (e, t, n, { allOwnKeys: r } = {}) => (
      Ko(
        t,
        (o, s) => {
          n && Bn(o) ? (e[s] = Vh(o, n)) : (e[s] = o);
        },
        { allOwnKeys: r }
      ),
      e
    ),
    qC = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e),
    VC = (e, t, n, r) => {
      (e.prototype = Object.create(t.prototype, r)),
        (e.prototype.constructor = e),
        Object.defineProperty(e, "super", { value: t.prototype }),
        n && Object.assign(e.prototype, n);
    },
    WC = (e, t, n, r) => {
      let o, s, i;
      const a = {};
      if (((t = t || {}), e == null)) return t;
      do {
        for (o = Object.getOwnPropertyNames(e), s = o.length; s-- > 0; )
          (i = o[s]),
            (!r || r(i, e, t)) && !a[i] && ((t[i] = e[i]), (a[i] = !0));
        e = n !== !1 && zl(e);
      } while (e && (!n || n(e, t)) && e !== Object.prototype);
      return t;
    },
    KC = (e, t, n) => {
      (e = String(e)),
        (n === void 0 || n > e.length) && (n = e.length),
        (n -= t.length);
      const r = e.indexOf(t, n);
      return r !== -1 && r === n;
    },
    GC = (e) => {
      if (!e) return null;
      if (Xr(e)) return e;
      let t = e.length;
      if (!Gh(t)) return null;
      const n = new Array(t);
      for (; t-- > 0; ) n[t] = e[t];
      return n;
    },
    JC = (
      (e) => (t) =>
        e && t instanceof e
    )(typeof Uint8Array < "u" && zl(Uint8Array)),
    ZC = (e, t) => {
      const r = (e && e[Symbol.iterator]).call(e);
      let o;
      for (; (o = r.next()) && !o.done; ) {
        const s = o.value;
        t.call(e, s[0], s[1]);
      }
    },
    YC = (e, t) => {
      let n;
      const r = [];
      for (; (n = e.exec(t)) !== null; ) r.push(n);
      return r;
    },
    QC = wn("HTMLFormElement"),
    XC = (e) =>
      e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (n, r, o) {
        return r.toUpperCase() + o;
      }),
    bf = (
      ({ hasOwnProperty: e }) =>
      (t, n) =>
        e.call(t, n)
    )(Object.prototype),
    eA = wn("RegExp"),
    Qh = (e, t) => {
      const n = Object.getOwnPropertyDescriptors(e),
        r = {};
      Ko(n, (o, s) => {
        t(o, s, e) !== !1 && (r[s] = o);
      }),
        Object.defineProperties(e, r);
    },
    tA = (e) => {
      Qh(e, (t, n) => {
        if (Bn(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
          return !1;
        const r = e[n];
        if (Bn(r)) {
          if (((t.enumerable = !1), "writable" in t)) {
            t.writable = !1;
            return;
          }
          t.set ||
            (t.set = () => {
              throw Error("Can not rewrite read-only method '" + n + "'");
            });
        }
      });
    },
    nA = (e, t) => {
      const n = {},
        r = (o) => {
          o.forEach((s) => {
            n[s] = !0;
          });
        };
      return Xr(e) ? r(e) : r(String(e).split(t)), n;
    },
    rA = () => {},
    oA = (e, t) => ((e = +e), Number.isFinite(e) ? e : t),
    Di = "abcdefghijklmnopqrstuvwxyz",
    _f = "0123456789",
    Xh = { DIGIT: _f, ALPHA: Di, ALPHA_DIGIT: Di + Di.toUpperCase() + _f },
    sA = (e = 16, t = Xh.ALPHA_DIGIT) => {
      let n = "";
      const { length: r } = t;
      for (; e--; ) n += t[(Math.random() * r) | 0];
      return n;
    };
  function iA(e) {
    return !!(
      e &&
      Bn(e.append) &&
      e[Symbol.toStringTag] === "FormData" &&
      e[Symbol.iterator]
    );
  }
  const aA = (e) => {
      const t = new Array(10),
        n = (r, o) => {
          if (Ul(r)) {
            if (t.indexOf(r) >= 0) return;
            if (!("toJSON" in r)) {
              t[o] = r;
              const s = Xr(r) ? [] : {};
              return (
                Ko(r, (i, a) => {
                  const l = n(i, o + 1);
                  !Do(l) && (s[a] = l);
                }),
                (t[o] = void 0),
                s
              );
            }
          }
          return r;
        };
      return n(e, 0);
    },
    B = {
      isArray: Xr,
      isArrayBuffer: Kh,
      isBuffer: PC,
      isFormData: DC,
      isArrayBufferView: RC,
      isString: MC,
      isNumber: Gh,
      isBoolean: IC,
      isObject: Ul,
      isPlainObject: xs,
      isUndefined: Do,
      isDate: FC,
      isFile: NC,
      isBlob: LC,
      isRegExp: eA,
      isFunction: Bn,
      isStream: BC,
      isURLSearchParams: zC,
      isTypedArray: JC,
      isFileList: jC,
      forEach: Ko,
      merge: Aa,
      extend: UC,
      trim: HC,
      stripBOM: qC,
      inherits: VC,
      toFlatObject: WC,
      kindOf: Hl,
      kindOfTest: wn,
      endsWith: KC,
      toArray: GC,
      forEachEntry: ZC,
      matchAll: YC,
      isHTMLForm: QC,
      hasOwnProperty: bf,
      hasOwnProp: bf,
      reduceDescriptors: Qh,
      freezeMethods: tA,
      toObjectSet: nA,
      toCamelCase: XC,
      noop: rA,
      toFiniteNumber: oA,
      findKey: Jh,
      global: Zh,
      isContextDefined: Yh,
      ALPHABET: Xh,
      generateString: sA,
      isSpecCompliantForm: iA,
      toJSONObject: aA,
    };
  function Re(e, t, n, r, o) {
    Error.call(this),
      Error.captureStackTrace
        ? Error.captureStackTrace(this, this.constructor)
        : (this.stack = new Error().stack),
      (this.message = e),
      (this.name = "AxiosError"),
      t && (this.code = t),
      n && (this.config = n),
      r && (this.request = r),
      o && (this.response = o);
  }
  B.inherits(Re, Error, {
    toJSON: function () {
      return {
        message: this.message,
        name: this.name,
        description: this.description,
        number: this.number,
        fileName: this.fileName,
        lineNumber: this.lineNumber,
        columnNumber: this.columnNumber,
        stack: this.stack,
        config: B.toJSONObject(this.config),
        code: this.code,
        status:
          this.response && this.response.status ? this.response.status : null,
      };
    },
  });
  const eg = Re.prototype,
    tg = {};
  [
    "ERR_BAD_OPTION_VALUE",
    "ERR_BAD_OPTION",
    "ECONNABORTED",
    "ETIMEDOUT",
    "ERR_NETWORK",
    "ERR_FR_TOO_MANY_REDIRECTS",
    "ERR_DEPRECATED",
    "ERR_BAD_RESPONSE",
    "ERR_BAD_REQUEST",
    "ERR_CANCELED",
    "ERR_NOT_SUPPORT",
    "ERR_INVALID_URL",
  ].forEach((e) => {
    tg[e] = { value: e };
  });
  Object.defineProperties(Re, tg);
  Object.defineProperty(eg, "isAxiosError", { value: !0 });
  Re.from = (e, t, n, r, o, s) => {
    const i = Object.create(eg);
    return (
      B.toFlatObject(
        e,
        i,
        function (l) {
          return l !== Error.prototype;
        },
        (a) => a !== "isAxiosError"
      ),
      Re.call(i, e.message, t, n, r, o),
      (i.cause = e),
      (i.name = e.name),
      s && Object.assign(i, s),
      i
    );
  };
  const lA = null;
  function ka(e) {
    return B.isPlainObject(e) || B.isArray(e);
  }
  function ng(e) {
    return B.endsWith(e, "[]") ? e.slice(0, -2) : e;
  }
  function wf(e, t, n) {
    return e
      ? e
          .concat(t)
          .map(function (o, s) {
            return (o = ng(o)), !n && s ? "[" + o + "]" : o;
          })
          .join(n ? "." : "")
      : t;
  }
  function uA(e) {
    return B.isArray(e) && !e.some(ka);
  }
  const cA = B.toFlatObject(B, {}, null, function (t) {
    return /^is[A-Z]/.test(t);
  });
  function pi(e, t, n) {
    if (!B.isObject(e)) throw new TypeError("target must be an object");
    (t = t || new FormData()),
      (n = B.toFlatObject(
        n,
        { metaTokens: !0, dots: !1, indexes: !1 },
        !1,
        function (g, _) {
          return !B.isUndefined(_[g]);
        }
      ));
    const r = n.metaTokens,
      o = n.visitor || c,
      s = n.dots,
      i = n.indexes,
      l = (n.Blob || (typeof Blob < "u" && Blob)) && B.isSpecCompliantForm(t);
    if (!B.isFunction(o)) throw new TypeError("visitor must be a function");
    function u(h) {
      if (h === null) return "";
      if (B.isDate(h)) return h.toISOString();
      if (!l && B.isBlob(h))
        throw new Re("Blob is not supported. Use a Buffer instead.");
      return B.isArrayBuffer(h) || B.isTypedArray(h)
        ? l && typeof Blob == "function"
          ? new Blob([h])
          : Buffer.from(h)
        : h;
    }
    function c(h, g, _) {
      let m = h;
      if (h && !_ && typeof h == "object") {
        if (B.endsWith(g, "{}"))
          (g = r ? g : g.slice(0, -2)), (h = JSON.stringify(h));
        else if (
          (B.isArray(h) && uA(h)) ||
          ((B.isFileList(h) || B.endsWith(g, "[]")) && (m = B.toArray(h)))
        )
          return (
            (g = ng(g)),
            m.forEach(function (x, E) {
              !(B.isUndefined(x) || x === null) &&
                t.append(
                  i === !0 ? wf([g], E, s) : i === null ? g : g + "[]",
                  u(x)
                );
            }),
            !1
          );
      }
      return ka(h) ? !0 : (t.append(wf(_, g, s), u(h)), !1);
    }
    const f = [],
      d = Object.assign(cA, {
        defaultVisitor: c,
        convertValue: u,
        isVisitable: ka,
      });
    function p(h, g) {
      if (!B.isUndefined(h)) {
        if (f.indexOf(h) !== -1)
          throw Error("Circular reference detected in " + g.join("."));
        f.push(h),
          B.forEach(h, function (m, w) {
            (!(B.isUndefined(m) || m === null) &&
              o.call(t, m, B.isString(w) ? w.trim() : w, g, d)) === !0 &&
              p(m, g ? g.concat(w) : [w]);
          }),
          f.pop();
      }
    }
    if (!B.isObject(e)) throw new TypeError("data must be an object");
    return p(e), t;
  }
  function xf(e) {
    const t = {
      "!": "%21",
      "'": "%27",
      "(": "%28",
      ")": "%29",
      "~": "%7E",
      "%20": "+",
      "%00": "\0",
    };
    return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (r) {
      return t[r];
    });
  }
  function ql(e, t) {
    (this._pairs = []), e && pi(e, this, t);
  }
  const rg = ql.prototype;
  rg.append = function (t, n) {
    this._pairs.push([t, n]);
  };
  rg.toString = function (t) {
    const n = t
      ? function (r) {
          return t.call(this, r, xf);
        }
      : xf;
    return this._pairs
      .map(function (o) {
        return n(o[0]) + "=" + n(o[1]);
      }, "")
      .join("&");
  };
  function fA(e) {
    return encodeURIComponent(e)
      .replace(/%3A/gi, ":")
      .replace(/%24/g, "$")
      .replace(/%2C/gi, ",")
      .replace(/%20/g, "+")
      .replace(/%5B/gi, "[")
      .replace(/%5D/gi, "]");
  }
  function og(e, t, n) {
    if (!t) return e;
    const r = (n && n.encode) || fA,
      o = n && n.serialize;
    let s;
    if (
      (o
        ? (s = o(t, n))
        : (s = B.isURLSearchParams(t)
            ? t.toString()
            : new ql(t, n).toString(r)),
      s)
    ) {
      const i = e.indexOf("#");
      i !== -1 && (e = e.slice(0, i)),
        (e += (e.indexOf("?") === -1 ? "?" : "&") + s);
    }
    return e;
  }
  class dA {
    constructor() {
      this.handlers = [];
    }
    use(t, n, r) {
      return (
        this.handlers.push({
          fulfilled: t,
          rejected: n,
          synchronous: r ? r.synchronous : !1,
          runWhen: r ? r.runWhen : null,
        }),
        this.handlers.length - 1
      );
    }
    eject(t) {
      this.handlers[t] && (this.handlers[t] = null);
    }
    clear() {
      this.handlers && (this.handlers = []);
    }
    forEach(t) {
      B.forEach(this.handlers, function (r) {
        r !== null && t(r);
      });
    }
  }
  const Ef = dA,
    sg = {
      silentJSONParsing: !0,
      forcedJSONParsing: !0,
      clarifyTimeoutError: !1,
    },
    pA = typeof URLSearchParams < "u" ? URLSearchParams : ql,
    hA = typeof FormData < "u" ? FormData : null,
    gA = typeof Blob < "u" ? Blob : null,
    mA = (() => {
      let e;
      return typeof navigator < "u" &&
        ((e = navigator.product) === "ReactNative" ||
          e === "NativeScript" ||
          e === "NS")
        ? !1
        : typeof window < "u" && typeof document < "u";
    })(),
    vA = (() =>
      typeof WorkerGlobalScope < "u" &&
      self instanceof WorkerGlobalScope &&
      typeof self.importScripts == "function")(),
    Qt = {
      isBrowser: !0,
      classes: { URLSearchParams: pA, FormData: hA, Blob: gA },
      isStandardBrowserEnv: mA,
      isStandardBrowserWebWorkerEnv: vA,
      protocols: ["http", "https", "file", "blob", "url", "data"],
    };
  function yA(e, t) {
    return pi(
      e,
      new Qt.classes.URLSearchParams(),
      Object.assign(
        {
          visitor: function (n, r, o, s) {
            return Qt.isNode && B.isBuffer(n)
              ? (this.append(r, n.toString("base64")), !1)
              : s.defaultVisitor.apply(this, arguments);
          },
        },
        t
      )
    );
  }
  function bA(e) {
    return B.matchAll(/\w+|\[(\w*)]/g, e).map((t) =>
      t[0] === "[]" ? "" : t[1] || t[0]
    );
  }
  function _A(e) {
    const t = {},
      n = Object.keys(e);
    let r;
    const o = n.length;
    let s;
    for (r = 0; r < o; r++) (s = n[r]), (t[s] = e[s]);
    return t;
  }
  function ig(e) {
    function t(n, r, o, s) {
      let i = n[s++];
      const a = Number.isFinite(+i),
        l = s >= n.length;
      return (
        (i = !i && B.isArray(o) ? o.length : i),
        l
          ? (B.hasOwnProp(o, i) ? (o[i] = [o[i], r]) : (o[i] = r), !a)
          : ((!o[i] || !B.isObject(o[i])) && (o[i] = []),
            t(n, r, o[i], s) && B.isArray(o[i]) && (o[i] = _A(o[i])),
            !a)
      );
    }
    if (B.isFormData(e) && B.isFunction(e.entries)) {
      const n = {};
      return (
        B.forEachEntry(e, (r, o) => {
          t(bA(r), o, n, 0);
        }),
        n
      );
    }
    return null;
  }
  const wA = { "Content-Type": void 0 };
  function xA(e, t, n) {
    if (B.isString(e))
      try {
        return (t || JSON.parse)(e), B.trim(e);
      } catch (r) {
        if (r.name !== "SyntaxError") throw r;
      }
    return (n || JSON.stringify)(e);
  }
  const hi = {
    transitional: sg,
    adapter: ["xhr", "http"],
    transformRequest: [
      function (t, n) {
        const r = n.getContentType() || "",
          o = r.indexOf("application/json") > -1,
          s = B.isObject(t);
        if ((s && B.isHTMLForm(t) && (t = new FormData(t)), B.isFormData(t)))
          return o && o ? JSON.stringify(ig(t)) : t;
        if (
          B.isArrayBuffer(t) ||
          B.isBuffer(t) ||
          B.isStream(t) ||
          B.isFile(t) ||
          B.isBlob(t)
        )
          return t;
        if (B.isArrayBufferView(t)) return t.buffer;
        if (B.isURLSearchParams(t))
          return (
            n.setContentType(
              "application/x-www-form-urlencoded;charset=utf-8",
              !1
            ),
            t.toString()
          );
        let a;
        if (s) {
          if (r.indexOf("application/x-www-form-urlencoded") > -1)
            return yA(t, this.formSerializer).toString();
          if ((a = B.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
            const l = this.env && this.env.FormData;
            return pi(
              a ? { "files[]": t } : t,
              l && new l(),
              this.formSerializer
            );
          }
        }
        return s || o ? (n.setContentType("application/json", !1), xA(t)) : t;
      },
    ],
    transformResponse: [
      function (t) {
        const n = this.transitional || hi.transitional,
          r = n && n.forcedJSONParsing,
          o = this.responseType === "json";
        if (t && B.isString(t) && ((r && !this.responseType) || o)) {
          const i = !(n && n.silentJSONParsing) && o;
          try {
            return JSON.parse(t);
          } catch (a) {
            if (i)
              throw a.name === "SyntaxError"
                ? Re.from(a, Re.ERR_BAD_RESPONSE, this, null, this.response)
                : a;
          }
        }
        return t;
      },
    ],
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    env: { FormData: Qt.classes.FormData, Blob: Qt.classes.Blob },
    validateStatus: function (t) {
      return t >= 200 && t < 300;
    },
    headers: { common: { Accept: "application/json, text/plain, */*" } },
  };
  B.forEach(["delete", "get", "head"], function (t) {
    hi.headers[t] = {};
  });
  B.forEach(["post", "put", "patch"], function (t) {
    hi.headers[t] = B.merge(wA);
  });
  const Vl = hi,
    EA = B.toObjectSet([
      "age",
      "authorization",
      "content-length",
      "content-type",
      "etag",
      "expires",
      "from",
      "host",
      "if-modified-since",
      "if-unmodified-since",
      "last-modified",
      "location",
      "max-forwards",
      "proxy-authorization",
      "referer",
      "retry-after",
      "user-agent",
    ]),
    SA = (e) => {
      const t = {};
      let n, r, o;
      return (
        e &&
          e
            .split(
              `
`
            )
            .forEach(function (i) {
              (o = i.indexOf(":")),
                (n = i.substring(0, o).trim().toLowerCase()),
                (r = i.substring(o + 1).trim()),
                !(!n || (t[n] && EA[n])) &&
                  (n === "set-cookie"
                    ? t[n]
                      ? t[n].push(r)
                      : (t[n] = [r])
                    : (t[n] = t[n] ? t[n] + ", " + r : r));
            }),
        t
      );
    },
    Sf = Symbol("internals");
  function uo(e) {
    return e && String(e).trim().toLowerCase();
  }
  function Es(e) {
    return e === !1 || e == null ? e : B.isArray(e) ? e.map(Es) : String(e);
  }
  function OA(e) {
    const t = Object.create(null),
      n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
    let r;
    for (; (r = n.exec(e)); ) t[r[1]] = r[2];
    return t;
  }
  function TA(e) {
    return /^[-_a-zA-Z]+$/.test(e.trim());
  }
  function zi(e, t, n, r, o) {
    if (B.isFunction(r)) return r.call(this, t, n);
    if ((o && (t = n), !!B.isString(t))) {
      if (B.isString(r)) return t.indexOf(r) !== -1;
      if (B.isRegExp(r)) return r.test(t);
    }
  }
  function $A(e) {
    return e
      .trim()
      .toLowerCase()
      .replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
  }
  function CA(e, t) {
    const n = B.toCamelCase(" " + t);
    ["get", "set", "has"].forEach((r) => {
      Object.defineProperty(e, r + n, {
        value: function (o, s, i) {
          return this[r].call(this, t, o, s, i);
        },
        configurable: !0,
      });
    });
  }
  class gi {
    constructor(t) {
      t && this.set(t);
    }
    set(t, n, r) {
      const o = this;
      function s(a, l, u) {
        const c = uo(l);
        if (!c) throw new Error("header name must be a non-empty string");
        const f = B.findKey(o, c);
        (!f || o[f] === void 0 || u === !0 || (u === void 0 && o[f] !== !1)) &&
          (o[f || l] = Es(a));
      }
      const i = (a, l) => B.forEach(a, (u, c) => s(u, c, l));
      return (
        B.isPlainObject(t) || t instanceof this.constructor
          ? i(t, n)
          : B.isString(t) && (t = t.trim()) && !TA(t)
          ? i(SA(t), n)
          : t != null && s(n, t, r),
        this
      );
    }
    get(t, n) {
      if (((t = uo(t)), t)) {
        const r = B.findKey(this, t);
        if (r) {
          const o = this[r];
          if (!n) return o;
          if (n === !0) return OA(o);
          if (B.isFunction(n)) return n.call(this, o, r);
          if (B.isRegExp(n)) return n.exec(o);
          throw new TypeError("parser must be boolean|regexp|function");
        }
      }
    }
    has(t, n) {
      if (((t = uo(t)), t)) {
        const r = B.findKey(this, t);
        return !!(r && this[r] !== void 0 && (!n || zi(this, this[r], r, n)));
      }
      return !1;
    }
    delete(t, n) {
      const r = this;
      let o = !1;
      function s(i) {
        if (((i = uo(i)), i)) {
          const a = B.findKey(r, i);
          a && (!n || zi(r, r[a], a, n)) && (delete r[a], (o = !0));
        }
      }
      return B.isArray(t) ? t.forEach(s) : s(t), o;
    }
    clear(t) {
      const n = Object.keys(this);
      let r = n.length,
        o = !1;
      for (; r--; ) {
        const s = n[r];
        (!t || zi(this, this[s], s, t, !0)) && (delete this[s], (o = !0));
      }
      return o;
    }
    normalize(t) {
      const n = this,
        r = {};
      return (
        B.forEach(this, (o, s) => {
          const i = B.findKey(r, s);
          if (i) {
            (n[i] = Es(o)), delete n[s];
            return;
          }
          const a = t ? $A(s) : String(s).trim();
          a !== s && delete n[s], (n[a] = Es(o)), (r[a] = !0);
        }),
        this
      );
    }
    concat(...t) {
      return this.constructor.concat(this, ...t);
    }
    toJSON(t) {
      const n = Object.create(null);
      return (
        B.forEach(this, (r, o) => {
          r != null &&
            r !== !1 &&
            (n[o] = t && B.isArray(r) ? r.join(", ") : r);
        }),
        n
      );
    }
    [Symbol.iterator]() {
      return Object.entries(this.toJSON())[Symbol.iterator]();
    }
    toString() {
      return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`);
    }
    get [Symbol.toStringTag]() {
      return "AxiosHeaders";
    }
    static from(t) {
      return t instanceof this ? t : new this(t);
    }
    static concat(t, ...n) {
      const r = new this(t);
      return n.forEach((o) => r.set(o)), r;
    }
    static accessor(t) {
      const r = (this[Sf] = this[Sf] = { accessors: {} }).accessors,
        o = this.prototype;
      function s(i) {
        const a = uo(i);
        r[a] || (CA(o, i), (r[a] = !0));
      }
      return B.isArray(t) ? t.forEach(s) : s(t), this;
    }
  }
  gi.accessor([
    "Content-Type",
    "Content-Length",
    "Accept",
    "Accept-Encoding",
    "User-Agent",
    "Authorization",
  ]);
  B.freezeMethods(gi.prototype);
  B.freezeMethods(gi);
  const pn = gi;
  function Hi(e, t) {
    const n = this || Vl,
      r = t || n,
      o = pn.from(r.headers);
    let s = r.data;
    return (
      B.forEach(e, function (a) {
        s = a.call(n, s, o.normalize(), t ? t.status : void 0);
      }),
      o.normalize(),
      s
    );
  }
  function ag(e) {
    return !!(e && e.__CANCEL__);
  }
  function Go(e, t, n) {
    Re.call(this, e ?? "canceled", Re.ERR_CANCELED, t, n),
      (this.name = "CanceledError");
  }
  B.inherits(Go, Re, { __CANCEL__: !0 });
  function AA(e, t, n) {
    const r = n.config.validateStatus;
    !n.status || !r || r(n.status)
      ? e(n)
      : t(
          new Re(
            "Request failed with status code " + n.status,
            [Re.ERR_BAD_REQUEST, Re.ERR_BAD_RESPONSE][
              Math.floor(n.status / 100) - 4
            ],
            n.config,
            n.request,
            n
          )
        );
  }
  const kA = Qt.isStandardBrowserEnv
    ? (function () {
        return {
          write: function (n, r, o, s, i, a) {
            const l = [];
            l.push(n + "=" + encodeURIComponent(r)),
              B.isNumber(o) && l.push("expires=" + new Date(o).toGMTString()),
              B.isString(s) && l.push("path=" + s),
              B.isString(i) && l.push("domain=" + i),
              a === !0 && l.push("secure"),
              (document.cookie = l.join("; "));
          },
          read: function (n) {
            const r = document.cookie.match(
              new RegExp("(^|;\\s*)(" + n + ")=([^;]*)")
            );
            return r ? decodeURIComponent(r[3]) : null;
          },
          remove: function (n) {
            this.write(n, "", Date.now() - 864e5);
          },
        };
      })()
    : (function () {
        return {
          write: function () {},
          read: function () {
            return null;
          },
          remove: function () {},
        };
      })();
  function PA(e) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
  }
  function RA(e, t) {
    return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
  }
  function lg(e, t) {
    return e && !PA(t) ? RA(e, t) : t;
  }
  const MA = Qt.isStandardBrowserEnv
    ? (function () {
        const t = /(msie|trident)/i.test(navigator.userAgent),
          n = document.createElement("a");
        let r;
        function o(s) {
          let i = s;
          return (
            t && (n.setAttribute("href", i), (i = n.href)),
            n.setAttribute("href", i),
            {
              href: n.href,
              protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
              host: n.host,
              search: n.search ? n.search.replace(/^\?/, "") : "",
              hash: n.hash ? n.hash.replace(/^#/, "") : "",
              hostname: n.hostname,
              port: n.port,
              pathname:
                n.pathname.charAt(0) === "/" ? n.pathname : "/" + n.pathname,
            }
          );
        }
        return (
          (r = o(window.location.href)),
          function (i) {
            const a = B.isString(i) ? o(i) : i;
            return a.protocol === r.protocol && a.host === r.host;
          }
        );
      })()
    : (function () {
        return function () {
          return !0;
        };
      })();
  function IA(e) {
    const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
    return (t && t[1]) || "";
  }
  function FA(e, t) {
    e = e || 10;
    const n = new Array(e),
      r = new Array(e);
    let o = 0,
      s = 0,
      i;
    return (
      (t = t !== void 0 ? t : 1e3),
      function (l) {
        const u = Date.now(),
          c = r[s];
        i || (i = u), (n[o] = l), (r[o] = u);
        let f = s,
          d = 0;
        for (; f !== o; ) (d += n[f++]), (f = f % e);
        if (((o = (o + 1) % e), o === s && (s = (s + 1) % e), u - i < t))
          return;
        const p = c && u - c;
        return p ? Math.round((d * 1e3) / p) : void 0;
      }
    );
  }
  function Of(e, t) {
    let n = 0;
    const r = FA(50, 250);
    return (o) => {
      const s = o.loaded,
        i = o.lengthComputable ? o.total : void 0,
        a = s - n,
        l = r(a),
        u = s <= i;
      n = s;
      const c = {
        loaded: s,
        total: i,
        progress: i ? s / i : void 0,
        bytes: a,
        rate: l || void 0,
        estimated: l && i && u ? (i - s) / l : void 0,
        event: o,
      };
      (c[t ? "download" : "upload"] = !0), e(c);
    };
  }
  const NA = typeof XMLHttpRequest < "u",
    LA =
      NA &&
      function (e) {
        return new Promise(function (n, r) {
          let o = e.data;
          const s = pn.from(e.headers).normalize(),
            i = e.responseType;
          let a;
          function l() {
            e.cancelToken && e.cancelToken.unsubscribe(a),
              e.signal && e.signal.removeEventListener("abort", a);
          }
          B.isFormData(o) &&
            (Qt.isStandardBrowserEnv || Qt.isStandardBrowserWebWorkerEnv) &&
            s.setContentType(!1);
          let u = new XMLHttpRequest();
          if (e.auth) {
            const p = e.auth.username || "",
              h = e.auth.password
                ? unescape(encodeURIComponent(e.auth.password))
                : "";
            s.set("Authorization", "Basic " + btoa(p + ":" + h));
          }
          const c = lg(e.baseURL, e.url);
          u.open(
            e.method.toUpperCase(),
            og(c, e.params, e.paramsSerializer),
            !0
          ),
            (u.timeout = e.timeout);
          function f() {
            if (!u) return;
            const p = pn.from(
                "getAllResponseHeaders" in u && u.getAllResponseHeaders()
              ),
              g = {
                data:
                  !i || i === "text" || i === "json"
                    ? u.responseText
                    : u.response,
                status: u.status,
                statusText: u.statusText,
                headers: p,
                config: e,
                request: u,
              };
            AA(
              function (m) {
                n(m), l();
              },
              function (m) {
                r(m), l();
              },
              g
            ),
              (u = null);
          }
          if (
            ("onloadend" in u
              ? (u.onloadend = f)
              : (u.onreadystatechange = function () {
                  !u ||
                    u.readyState !== 4 ||
                    (u.status === 0 &&
                      !(
                        u.responseURL && u.responseURL.indexOf("file:") === 0
                      )) ||
                    setTimeout(f);
                }),
            (u.onabort = function () {
              u &&
                (r(new Re("Request aborted", Re.ECONNABORTED, e, u)),
                (u = null));
            }),
            (u.onerror = function () {
              r(new Re("Network Error", Re.ERR_NETWORK, e, u)), (u = null);
            }),
            (u.ontimeout = function () {
              let h = e.timeout
                ? "timeout of " + e.timeout + "ms exceeded"
                : "timeout exceeded";
              const g = e.transitional || sg;
              e.timeoutErrorMessage && (h = e.timeoutErrorMessage),
                r(
                  new Re(
                    h,
                    g.clarifyTimeoutError ? Re.ETIMEDOUT : Re.ECONNABORTED,
                    e,
                    u
                  )
                ),
                (u = null);
            }),
            Qt.isStandardBrowserEnv)
          ) {
            const p =
              (e.withCredentials || MA(c)) &&
              e.xsrfCookieName &&
              kA.read(e.xsrfCookieName);
            p && s.set(e.xsrfHeaderName, p);
          }
          o === void 0 && s.setContentType(null),
            "setRequestHeader" in u &&
              B.forEach(s.toJSON(), function (h, g) {
                u.setRequestHeader(g, h);
              }),
            B.isUndefined(e.withCredentials) ||
              (u.withCredentials = !!e.withCredentials),
            i && i !== "json" && (u.responseType = e.responseType),
            typeof e.onDownloadProgress == "function" &&
              u.addEventListener("progress", Of(e.onDownloadProgress, !0)),
            typeof e.onUploadProgress == "function" &&
              u.upload &&
              u.upload.addEventListener("progress", Of(e.onUploadProgress)),
            (e.cancelToken || e.signal) &&
              ((a = (p) => {
                u &&
                  (r(!p || p.type ? new Go(null, e, u) : p),
                  u.abort(),
                  (u = null));
              }),
              e.cancelToken && e.cancelToken.subscribe(a),
              e.signal &&
                (e.signal.aborted
                  ? a()
                  : e.signal.addEventListener("abort", a)));
          const d = IA(c);
          if (d && Qt.protocols.indexOf(d) === -1) {
            r(new Re("Unsupported protocol " + d + ":", Re.ERR_BAD_REQUEST, e));
            return;
          }
          u.send(o || null);
        });
      },
    Ss = { http: lA, xhr: LA };
  B.forEach(Ss, (e, t) => {
    if (e) {
      try {
        Object.defineProperty(e, "name", { value: t });
      } catch {}
      Object.defineProperty(e, "adapterName", { value: t });
    }
  });
  const jA = {
    getAdapter: (e) => {
      e = B.isArray(e) ? e : [e];
      const { length: t } = e;
      let n, r;
      for (
        let o = 0;
        o < t && ((n = e[o]), !(r = B.isString(n) ? Ss[n.toLowerCase()] : n));
        o++
      );
      if (!r)
        throw r === !1
          ? new Re(
              `Adapter ${n} is not supported by the environment`,
              "ERR_NOT_SUPPORT"
            )
          : new Error(
              B.hasOwnProp(Ss, n)
                ? `Adapter '${n}' is not available in the build`
                : `Unknown adapter '${n}'`
            );
      if (!B.isFunction(r)) throw new TypeError("adapter is not a function");
      return r;
    },
    adapters: Ss,
  };
  function Ui(e) {
    if (
      (e.cancelToken && e.cancelToken.throwIfRequested(),
      e.signal && e.signal.aborted)
    )
      throw new Go(null, e);
  }
  function Tf(e) {
    return (
      Ui(e),
      (e.headers = pn.from(e.headers)),
      (e.data = Hi.call(e, e.transformRequest)),
      ["post", "put", "patch"].indexOf(e.method) !== -1 &&
        e.headers.setContentType("application/x-www-form-urlencoded", !1),
      jA
        .getAdapter(e.adapter || Vl.adapter)(e)
        .then(
          function (r) {
            return (
              Ui(e),
              (r.data = Hi.call(e, e.transformResponse, r)),
              (r.headers = pn.from(r.headers)),
              r
            );
          },
          function (r) {
            return (
              ag(r) ||
                (Ui(e),
                r &&
                  r.response &&
                  ((r.response.data = Hi.call(
                    e,
                    e.transformResponse,
                    r.response
                  )),
                  (r.response.headers = pn.from(r.response.headers)))),
              Promise.reject(r)
            );
          }
        )
    );
  }
  const $f = (e) => (e instanceof pn ? e.toJSON() : e);
  function Ur(e, t) {
    t = t || {};
    const n = {};
    function r(u, c, f) {
      return B.isPlainObject(u) && B.isPlainObject(c)
        ? B.merge.call({ caseless: f }, u, c)
        : B.isPlainObject(c)
        ? B.merge({}, c)
        : B.isArray(c)
        ? c.slice()
        : c;
    }
    function o(u, c, f) {
      if (B.isUndefined(c)) {
        if (!B.isUndefined(u)) return r(void 0, u, f);
      } else return r(u, c, f);
    }
    function s(u, c) {
      if (!B.isUndefined(c)) return r(void 0, c);
    }
    function i(u, c) {
      if (B.isUndefined(c)) {
        if (!B.isUndefined(u)) return r(void 0, u);
      } else return r(void 0, c);
    }
    function a(u, c, f) {
      if (f in t) return r(u, c);
      if (f in e) return r(void 0, u);
    }
    const l = {
      url: s,
      method: s,
      data: s,
      baseURL: i,
      transformRequest: i,
      transformResponse: i,
      paramsSerializer: i,
      timeout: i,
      timeoutMessage: i,
      withCredentials: i,
      adapter: i,
      responseType: i,
      xsrfCookieName: i,
      xsrfHeaderName: i,
      onUploadProgress: i,
      onDownloadProgress: i,
      decompress: i,
      maxContentLength: i,
      maxBodyLength: i,
      beforeRedirect: i,
      transport: i,
      httpAgent: i,
      httpsAgent: i,
      cancelToken: i,
      socketPath: i,
      responseEncoding: i,
      validateStatus: a,
      headers: (u, c) => o($f(u), $f(c), !0),
    };
    return (
      B.forEach(Object.keys(e).concat(Object.keys(t)), function (c) {
        const f = l[c] || o,
          d = f(e[c], t[c], c);
        (B.isUndefined(d) && f !== a) || (n[c] = d);
      }),
      n
    );
  }
  const ug = "1.3.4",
    Wl = {};
  ["object", "boolean", "number", "function", "string", "symbol"].forEach(
    (e, t) => {
      Wl[e] = function (r) {
        return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
      };
    }
  );
  const Cf = {};
  Wl.transitional = function (t, n, r) {
    function o(s, i) {
      return (
        "[Axios v" +
        ug +
        "] Transitional option '" +
        s +
        "'" +
        i +
        (r ? ". " + r : "")
      );
    }
    return (s, i, a) => {
      if (t === !1)
        throw new Re(
          o(i, " has been removed" + (n ? " in " + n : "")),
          Re.ERR_DEPRECATED
        );
      return (
        n &&
          !Cf[i] &&
          ((Cf[i] = !0),
          console.warn(
            o(
              i,
              " has been deprecated since v" +
                n +
                " and will be removed in the near future"
            )
          )),
        t ? t(s, i, a) : !0
      );
    };
  };
  function BA(e, t, n) {
    if (typeof e != "object")
      throw new Re("options must be an object", Re.ERR_BAD_OPTION_VALUE);
    const r = Object.keys(e);
    let o = r.length;
    for (; o-- > 0; ) {
      const s = r[o],
        i = t[s];
      if (i) {
        const a = e[s],
          l = a === void 0 || i(a, s, e);
        if (l !== !0)
          throw new Re(
            "option " + s + " must be " + l,
            Re.ERR_BAD_OPTION_VALUE
          );
        continue;
      }
      if (n !== !0) throw new Re("Unknown option " + s, Re.ERR_BAD_OPTION);
    }
  }
  const Pa = { assertOptions: BA, validators: Wl },
    Tn = Pa.validators;
  class Bs {
    constructor(t) {
      (this.defaults = t),
        (this.interceptors = { request: new Ef(), response: new Ef() });
    }
    request(t, n) {
      typeof t == "string" ? ((n = n || {}), (n.url = t)) : (n = t || {}),
        (n = Ur(this.defaults, n));
      const { transitional: r, paramsSerializer: o, headers: s } = n;
      r !== void 0 &&
        Pa.assertOptions(
          r,
          {
            silentJSONParsing: Tn.transitional(Tn.boolean),
            forcedJSONParsing: Tn.transitional(Tn.boolean),
            clarifyTimeoutError: Tn.transitional(Tn.boolean),
          },
          !1
        ),
        o !== void 0 &&
          Pa.assertOptions(
            o,
            { encode: Tn.function, serialize: Tn.function },
            !0
          ),
        (n.method = (n.method || this.defaults.method || "get").toLowerCase());
      let i;
      (i = s && B.merge(s.common, s[n.method])),
        i &&
          B.forEach(
            ["delete", "get", "head", "post", "put", "patch", "common"],
            (h) => {
              delete s[h];
            }
          ),
        (n.headers = pn.concat(i, s));
      const a = [];
      let l = !0;
      this.interceptors.request.forEach(function (g) {
        (typeof g.runWhen == "function" && g.runWhen(n) === !1) ||
          ((l = l && g.synchronous), a.unshift(g.fulfilled, g.rejected));
      });
      const u = [];
      this.interceptors.response.forEach(function (g) {
        u.push(g.fulfilled, g.rejected);
      });
      let c,
        f = 0,
        d;
      if (!l) {
        const h = [Tf.bind(this), void 0];
        for (
          h.unshift.apply(h, a),
            h.push.apply(h, u),
            d = h.length,
            c = Promise.resolve(n);
          f < d;

        )
          c = c.then(h[f++], h[f++]);
        return c;
      }
      d = a.length;
      let p = n;
      for (f = 0; f < d; ) {
        const h = a[f++],
          g = a[f++];
        try {
          p = h(p);
        } catch (_) {
          g.call(this, _);
          break;
        }
      }
      try {
        c = Tf.call(this, p);
      } catch (h) {
        return Promise.reject(h);
      }
      for (f = 0, d = u.length; f < d; ) c = c.then(u[f++], u[f++]);
      return c;
    }
    getUri(t) {
      t = Ur(this.defaults, t);
      const n = lg(t.baseURL, t.url);
      return og(n, t.params, t.paramsSerializer);
    }
  }
  B.forEach(["delete", "get", "head", "options"], function (t) {
    Bs.prototype[t] = function (n, r) {
      return this.request(
        Ur(r || {}, { method: t, url: n, data: (r || {}).data })
      );
    };
  });
  B.forEach(["post", "put", "patch"], function (t) {
    function n(r) {
      return function (s, i, a) {
        return this.request(
          Ur(a || {}, {
            method: t,
            headers: r ? { "Content-Type": "multipart/form-data" } : {},
            url: s,
            data: i,
          })
        );
      };
    }
    (Bs.prototype[t] = n()), (Bs.prototype[t + "Form"] = n(!0));
  });
  const Os = Bs;
  class Kl {
    constructor(t) {
      if (typeof t != "function")
        throw new TypeError("executor must be a function.");
      let n;
      this.promise = new Promise(function (s) {
        n = s;
      });
      const r = this;
      this.promise.then((o) => {
        if (!r._listeners) return;
        let s = r._listeners.length;
        for (; s-- > 0; ) r._listeners[s](o);
        r._listeners = null;
      }),
        (this.promise.then = (o) => {
          let s;
          const i = new Promise((a) => {
            r.subscribe(a), (s = a);
          }).then(o);
          return (
            (i.cancel = function () {
              r.unsubscribe(s);
            }),
            i
          );
        }),
        t(function (s, i, a) {
          r.reason || ((r.reason = new Go(s, i, a)), n(r.reason));
        });
    }
    throwIfRequested() {
      if (this.reason) throw this.reason;
    }
    subscribe(t) {
      if (this.reason) {
        t(this.reason);
        return;
      }
      this._listeners ? this._listeners.push(t) : (this._listeners = [t]);
    }
    unsubscribe(t) {
      if (!this._listeners) return;
      const n = this._listeners.indexOf(t);
      n !== -1 && this._listeners.splice(n, 1);
    }
    static source() {
      let t;
      return {
        token: new Kl(function (o) {
          t = o;
        }),
        cancel: t,
      };
    }
  }
  const DA = Kl;
  function zA(e) {
    return function (n) {
      return e.apply(null, n);
    };
  }
  function HA(e) {
    return B.isObject(e) && e.isAxiosError === !0;
  }
  const Ra = {
    Continue: 100,
    SwitchingProtocols: 101,
    Processing: 102,
    EarlyHints: 103,
    Ok: 200,
    Created: 201,
    Accepted: 202,
    NonAuthoritativeInformation: 203,
    NoContent: 204,
    ResetContent: 205,
    PartialContent: 206,
    MultiStatus: 207,
    AlreadyReported: 208,
    ImUsed: 226,
    MultipleChoices: 300,
    MovedPermanently: 301,
    Found: 302,
    SeeOther: 303,
    NotModified: 304,
    UseProxy: 305,
    Unused: 306,
    TemporaryRedirect: 307,
    PermanentRedirect: 308,
    BadRequest: 400,
    Unauthorized: 401,
    PaymentRequired: 402,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    ProxyAuthenticationRequired: 407,
    RequestTimeout: 408,
    Conflict: 409,
    Gone: 410,
    LengthRequired: 411,
    PreconditionFailed: 412,
    PayloadTooLarge: 413,
    UriTooLong: 414,
    UnsupportedMediaType: 415,
    RangeNotSatisfiable: 416,
    ExpectationFailed: 417,
    ImATeapot: 418,
    MisdirectedRequest: 421,
    UnprocessableEntity: 422,
    Locked: 423,
    FailedDependency: 424,
    TooEarly: 425,
    UpgradeRequired: 426,
    PreconditionRequired: 428,
    TooManyRequests: 429,
    RequestHeaderFieldsTooLarge: 431,
    UnavailableForLegalReasons: 451,
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavailable: 503,
    GatewayTimeout: 504,
    HttpVersionNotSupported: 505,
    VariantAlsoNegotiates: 506,
    InsufficientStorage: 507,
    LoopDetected: 508,
    NotExtended: 510,
    NetworkAuthenticationRequired: 511,
  };
  Object.entries(Ra).forEach(([e, t]) => {
    Ra[t] = e;
  });
  const UA = Ra;
  function cg(e) {
    const t = new Os(e),
      n = Vh(Os.prototype.request, t);
    return (
      B.extend(n, Os.prototype, t, { allOwnKeys: !0 }),
      B.extend(n, t, null, { allOwnKeys: !0 }),
      (n.create = function (o) {
        return cg(Ur(e, o));
      }),
      n
    );
  }
  const Xe = cg(Vl);
  Xe.Axios = Os;
  Xe.CanceledError = Go;
  Xe.CancelToken = DA;
  Xe.isCancel = ag;
  Xe.VERSION = ug;
  Xe.toFormData = pi;
  Xe.AxiosError = Re;
  Xe.Cancel = Xe.CanceledError;
  Xe.all = function (t) {
    return Promise.all(t);
  };
  Xe.spread = zA;
  Xe.isAxiosError = HA;
  Xe.mergeConfig = Ur;
  Xe.AxiosHeaders = pn;
  Xe.formToJSON = (e) => ig(B.isHTMLForm(e) ? new FormData(e) : e);
  Xe.HttpStatusCode = UA;
  Xe.default = Xe;
  const fg = Xe,
    mi = fg.create({
      baseURL: "http://47.113.228.237:9528/gpt_message_board/api",
      timeout: 3e3,
    }),
    dg = (e, t) => mi.post("/login", { username: e, password: t }),
    pg = () => mi.get("/messages"),
    hg = (e, t) => mi.post("/new_message", { username: e, content: t }),
    gg = (e) => mi.post("/delete_message", { _id: e }),
    qA = () =>
      fg.get(
        "https://ghproxy.com/https://raw.githubusercontent.com/fangyuan99/gpt_message_borad/gpt1.1.0/README.md"
      ),
    VA = {
      name: "Login",
      setup() {
        const e = gl("user");
        Ge(() => {
          e.value !== "undefined" &&
            (console.log("已登录", e.value), Ma.push("/"));
        });
        const t = GT(),
          n = ft({ username: "", password: "" });
        return {
          loginForm: n,
          rules: {
            username: [
              { required: !0, message: "请输入用户名", trigger: "blur" },
            ],
            password: [
              { required: !0, message: "请输入密码", trigger: "blur" },
            ],
          },
          login: async () => {
            try {
              const { data: s } = await dg(n.username, n.password);
              t.commit("setUser", {
                username: n.username,
                password: n.password,
              }),
                (e.value = JSON.stringify({
                  username: n.username,
                  password: n.password,
                })),
                Ma.push("/"),
                window.location.reload();
            } catch (s) {
              console.log(s), alert("登录失败，请检查用户名和密码");
            }
          },
        };
      },
    },
    WA = { class: "login-container" };
  function KA(e, t, n, r, o, s) {
    const i = Xp,
      a = mh,
      l = dh,
      u = gh;
    return (
      ee(),
      me("div", WA, [
        ve(
          u,
          {
            ref: "loginFormRef",
            rules: r.rules,
            model: r.loginForm,
            "label-width": "80px",
          },
          {
            default: we(() => [
              ve(
                a,
                { label: "用户名", prop: "username" },
                {
                  default: we(() => [
                    ve(
                      i,
                      {
                        modelValue: r.loginForm.username,
                        "onUpdate:modelValue":
                          t[0] || (t[0] = (c) => (r.loginForm.username = c)),
                        modelModifiers: { trim: !0 },
                        autocomplete: "off",
                      },
                      null,
                      8,
                      ["modelValue"]
                    ),
                  ]),
                  _: 1,
                }
              ),
              ve(
                a,
                { label: "密码", prop: "password" },
                {
                  default: we(() => [
                    ve(
                      i,
                      {
                        modelValue: r.loginForm.password,
                        "onUpdate:modelValue":
                          t[1] || (t[1] = (c) => (r.loginForm.password = c)),
                        modelModifiers: { trim: !0 },
                        autocomplete: "off",
                        "show-password": "",
                      },
                      null,
                      8,
                      ["modelValue"]
                    ),
                  ]),
                  _: 1,
                }
              ),
              ve(a, null, {
                default: we(() => [
                  ve(
                    l,
                    { type: "primary", onClick: r.login },
                    { default: we(() => [Pt("登录")]), _: 1 },
                    8,
                    ["onClick"]
                  ),
                ]),
                _: 1,
              }),
            ]),
            _: 1,
          },
          8,
          ["rules", "model"]
        ),
      ])
    );
  }
  const GA = Wo(VA, [
      ["render", KA],
      ["__scopeId", "data-v-807c8ff8"],
    ]),
    JA = {
      name: "MessageBoard",
      setup() {
        const e = ft({ content: "" }),
          t = re(null),
          n = ft({
            content: [
              { required: !0, message: "留言不能为空", trigger: "blur" },
            ],
          }),
          r = re([]);
        let o = M(() => {
          const d = gl("user");
          return (d == null ? void 0 : d.value) !== "undefined"
            ? JSON.parse(d.value).username
            : "游客";
        });
        const s = () =>
            new Promise((d, p) => {
              t.value.validate((h) => {
                h ? d(!0) : p(!1);
              });
            }),
          i = async () => {
            try {
              const { data: d } = await pg();
              r.value = d;
            } catch (d) {
              ao.error({
                message:
                  `获取留言失败
` + d,
                type: "error",
              });
            }
          },
          a = async () => {
            if (await s())
              try {
                await hg(o.value, e.content),
                  ao.success({ message: "发布留言成功", type: "success" }),
                  (e.content = ""),
                  await i();
              } catch (p) {
                ao.error({
                  message:
                    `发布留言失败
` + p,
                  type: "error",
                });
              }
            else return !1;
          },
          l = async (d) => {
            const { _id: p } = r.value[d];
            try {
              await gg(p), ao.success("删除留言成功"), await i();
            } catch (h) {
              console.log("error", typeof h),
                ao.error({
                  message:
                    `删除留言失败
` + h,
                  type: "error",
                });
            }
          },
          u = async () => {
            await i();
          },
          c = () => {
            user.value = "undefined";
          },
          f = (d) => XS(d).format("YYYY-MM-DD HH:mm:ss");
        return (
          Ge(async () => {
            await i();
          }),
          {
            messageForm: e,
            rules: n,
            messages: r,
            username: o,
            getMessages: i,
            submitMessage: a,
            deleteMessage: l,
            refreshMessages: u,
            logout: c,
            formatDate: f,
            messageFormRef: t,
          }
        );
      },
    },
    ZA = { class: "message-board-container" },
    YA = { class: "message-delete", style: { width: "100%" } },
    QA = { class: "message-list" },
    XA = { class: "message-user" },
    e4 = { class: "message-time" },
    t4 = { class: "message-content" },
    n4 = { class: "message-delete" };
  function r4(e, t, n, r, o, s) {
    const i = Xp,
      a = mh,
      l = dh,
      u = gh,
      c = oO;
    return (
      ee(),
      me("div", ZA, [
        ve(
          u,
          { rules: r.rules, model: r.messageForm, ref: "messageFormRef" },
          {
            default: we(() => [
              ve(
                a,
                { prop: "content" },
                {
                  default: we(() => [
                    ve(
                      i,
                      {
                        autosize: "",
                        type: "textarea",
                        modelValue: r.messageForm.content,
                        "onUpdate:modelValue":
                          t[0] || (t[0] = (f) => (r.messageForm.content = f)),
                        placeholder: "请输入留言内容",
                      },
                      null,
                      8,
                      ["modelValue"]
                    ),
                  ]),
                  _: 1,
                }
              ),
              ve(a, null, {
                default: we(() => [
                  ye("div", YA, [
                    ve(
                      l,
                      { type: "primary", onClick: r.getMessages, plain: "" },
                      { default: we(() => [Pt(" 刷新留言 ")]), _: 1 },
                      8,
                      ["onClick"]
                    ),
                    ve(
                      l,
                      { type: "primary", onClick: r.submitMessage, plain: "" },
                      { default: we(() => [Pt(" 发布留言 ")]), _: 1 },
                      8,
                      ["onClick"]
                    ),
                  ]),
                ]),
                _: 1,
              }),
            ]),
            _: 1,
          },
          8,
          ["rules", "model"]
        ),
        ye("div", QA, [
          (ee(!0),
          me(
            We,
            null,
            Um(
              r.messages,
              (f, d) => (
                ee(),
                Ne(
                  c,
                  { key: f._id, class: "message-card" },
                  {
                    default: we(() => [
                      ye("div", XA, [
                        Pt(lt(f.username ? f.username : "游客") + " ", 1),
                        ye("div", e4, lt(r.formatDate(f.created_at * 1e3)), 1),
                      ]),
                      ye("div", t4, lt(f.content), 1),
                      ye("div", n4, [
                        ve(
                          l,
                          {
                            type: "danger",
                            size: "small",
                            onClick: (p) => r.deleteMessage(d),
                          },
                          { default: we(() => [Pt(" 删除 ")]), _: 2 },
                          1032,
                          ["onClick"]
                        ),
                      ]),
                    ]),
                    _: 2,
                  },
                  1024
                )
              )
            ),
            128
          )),
        ]),
      ])
    );
  }
  const Af = Wo(JA, [["render", r4]]);
  function mg() {
    return {
      async: !1,
      baseUrl: null,
      breaks: !1,
      extensions: null,
      gfm: !0,
      headerIds: !0,
      headerPrefix: "",
      highlight: null,
      langPrefix: "language-",
      mangle: !0,
      pedantic: !1,
      renderer: null,
      sanitize: !1,
      sanitizer: null,
      silent: !1,
      smartypants: !1,
      tokenizer: null,
      walkTokens: null,
      xhtml: !1,
    };
  }
  let eo = mg();
  function o4(e) {
    eo = e;
  }
  const vg = /[&<>"']/,
    s4 = new RegExp(vg.source, "g"),
    yg = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
    i4 = new RegExp(yg.source, "g"),
    a4 = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    },
    kf = (e) => a4[e];
  function nt(e, t) {
    if (t) {
      if (vg.test(e)) return e.replace(s4, kf);
    } else if (yg.test(e)) return e.replace(i4, kf);
    return e;
  }
  const l4 = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;
  function bg(e) {
    return e.replace(
      l4,
      (t, n) => (
        (n = n.toLowerCase()),
        n === "colon"
          ? ":"
          : n.charAt(0) === "#"
          ? n.charAt(1) === "x"
            ? String.fromCharCode(parseInt(n.substring(2), 16))
            : String.fromCharCode(+n.substring(1))
          : ""
      )
    );
  }
  const u4 = /(^|[^\[])\^/g;
  function ze(e, t) {
    (e = typeof e == "string" ? e : e.source), (t = t || "");
    const n = {
      replace: (r, o) => (
        (o = o.source || o), (o = o.replace(u4, "$1")), (e = e.replace(r, o)), n
      ),
      getRegex: () => new RegExp(e, t),
    };
    return n;
  }
  const c4 = /[^\w:]/g,
    f4 = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
  function Pf(e, t, n) {
    if (e) {
      let r;
      try {
        r = decodeURIComponent(bg(n)).replace(c4, "").toLowerCase();
      } catch {
        return null;
      }
      if (
        r.indexOf("javascript:") === 0 ||
        r.indexOf("vbscript:") === 0 ||
        r.indexOf("data:") === 0
      )
        return null;
    }
    t && !f4.test(n) && (n = g4(t, n));
    try {
      n = encodeURI(n).replace(/%25/g, "%");
    } catch {
      return null;
    }
    return n;
  }
  const ds = {},
    d4 = /^[^:]+:\/*[^/]*$/,
    p4 = /^([^:]+:)[\s\S]*$/,
    h4 = /^([^:]+:\/*[^/]*)[\s\S]*$/;
  function g4(e, t) {
    ds[" " + e] ||
      (d4.test(e) ? (ds[" " + e] = e + "/") : (ds[" " + e] = Ts(e, "/", !0))),
      (e = ds[" " + e]);
    const n = e.indexOf(":") === -1;
    return t.substring(0, 2) === "//"
      ? n
        ? t
        : e.replace(p4, "$1") + t
      : t.charAt(0) === "/"
      ? n
        ? t
        : e.replace(h4, "$1") + t
      : e + t;
  }
  const Ds = { exec: function () {} };
  function Kt(e) {
    let t = 1,
      n,
      r;
    for (; t < arguments.length; t++) {
      n = arguments[t];
      for (r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }
  function Rf(e, t) {
    const n = e.replace(/\|/g, (s, i, a) => {
        let l = !1,
          u = i;
        for (; --u >= 0 && a[u] === "\\"; ) l = !l;
        return l ? "|" : " |";
      }),
      r = n.split(/ \|/);
    let o = 0;
    if (
      (r[0].trim() || r.shift(),
      r.length > 0 && !r[r.length - 1].trim() && r.pop(),
      r.length > t)
    )
      r.splice(t);
    else for (; r.length < t; ) r.push("");
    for (; o < r.length; o++) r[o] = r[o].trim().replace(/\\\|/g, "|");
    return r;
  }
  function Ts(e, t, n) {
    const r = e.length;
    if (r === 0) return "";
    let o = 0;
    for (; o < r; ) {
      const s = e.charAt(r - o - 1);
      if (s === t && !n) o++;
      else if (s !== t && n) o++;
      else break;
    }
    return e.slice(0, r - o);
  }
  function m4(e, t) {
    if (e.indexOf(t[1]) === -1) return -1;
    const n = e.length;
    let r = 0,
      o = 0;
    for (; o < n; o++)
      if (e[o] === "\\") o++;
      else if (e[o] === t[0]) r++;
      else if (e[o] === t[1] && (r--, r < 0)) return o;
    return -1;
  }
  function _g(e) {
    e &&
      e.sanitize &&
      !e.silent &&
      console.warn(
        "marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options"
      );
  }
  function Mf(e, t) {
    if (t < 1) return "";
    let n = "";
    for (; t > 1; ) t & 1 && (n += e), (t >>= 1), (e += e);
    return n + e;
  }
  function If(e, t, n, r) {
    const o = t.href,
      s = t.title ? nt(t.title) : null,
      i = e[1].replace(/\\([\[\]])/g, "$1");
    if (e[0].charAt(0) !== "!") {
      r.state.inLink = !0;
      const a = {
        type: "link",
        raw: n,
        href: o,
        title: s,
        text: i,
        tokens: r.inlineTokens(i),
      };
      return (r.state.inLink = !1), a;
    }
    return { type: "image", raw: n, href: o, title: s, text: nt(i) };
  }
  function v4(e, t) {
    const n = e.match(/^(\s+)(?:```)/);
    if (n === null) return t;
    const r = n[1];
    return t
      .split(
        `
`
      )
      .map((o) => {
        const s = o.match(/^\s+/);
        if (s === null) return o;
        const [i] = s;
        return i.length >= r.length ? o.slice(r.length) : o;
      }).join(`
`);
  }
  class Gl {
    constructor(t) {
      this.options = t || eo;
    }
    space(t) {
      const n = this.rules.block.newline.exec(t);
      if (n && n[0].length > 0) return { type: "space", raw: n[0] };
    }
    code(t) {
      const n = this.rules.block.code.exec(t);
      if (n) {
        const r = n[0].replace(/^ {1,4}/gm, "");
        return {
          type: "code",
          raw: n[0],
          codeBlockStyle: "indented",
          text: this.options.pedantic
            ? r
            : Ts(
                r,
                `
`
              ),
        };
      }
    }
    fences(t) {
      const n = this.rules.block.fences.exec(t);
      if (n) {
        const r = n[0],
          o = v4(r, n[3] || "");
        return {
          type: "code",
          raw: r,
          lang: n[2]
            ? n[2].trim().replace(this.rules.inline._escapes, "$1")
            : n[2],
          text: o,
        };
      }
    }
    heading(t) {
      const n = this.rules.block.heading.exec(t);
      if (n) {
        let r = n[2].trim();
        if (/#$/.test(r)) {
          const o = Ts(r, "#");
          (this.options.pedantic || !o || / $/.test(o)) && (r = o.trim());
        }
        return {
          type: "heading",
          raw: n[0],
          depth: n[1].length,
          text: r,
          tokens: this.lexer.inline(r),
        };
      }
    }
    hr(t) {
      const n = this.rules.block.hr.exec(t);
      if (n) return { type: "hr", raw: n[0] };
    }
    blockquote(t) {
      const n = this.rules.block.blockquote.exec(t);
      if (n) {
        const r = n[0].replace(/^ *>[ \t]?/gm, ""),
          o = this.lexer.state.top;
        this.lexer.state.top = !0;
        const s = this.lexer.blockTokens(r);
        return (
          (this.lexer.state.top = o),
          { type: "blockquote", raw: n[0], tokens: s, text: r }
        );
      }
    }
    list(t) {
      let n = this.rules.block.list.exec(t);
      if (n) {
        let r,
          o,
          s,
          i,
          a,
          l,
          u,
          c,
          f,
          d,
          p,
          h,
          g = n[1].trim();
        const _ = g.length > 1,
          m = {
            type: "list",
            raw: "",
            ordered: _,
            start: _ ? +g.slice(0, -1) : "",
            loose: !1,
            items: [],
          };
        (g = _ ? `\\d{1,9}\\${g.slice(-1)}` : `\\${g}`),
          this.options.pedantic && (g = _ ? g : "[*+-]");
        const w = new RegExp(`^( {0,3}${g})((?:[	 ][^\\n]*)?(?:\\n|$))`);
        for (
          ;
          t && ((h = !1), !(!(n = w.exec(t)) || this.rules.block.hr.test(t)));

        ) {
          if (
            ((r = n[0]),
            (t = t.substring(r.length)),
            (c = n[2]
              .split(
                `
`,
                1
              )[0]
              .replace(/^\t+/, (E) => " ".repeat(3 * E.length))),
            (f = t.split(
              `
`,
              1
            )[0]),
            this.options.pedantic
              ? ((i = 2), (p = c.trimLeft()))
              : ((i = n[2].search(/[^ ]/)),
                (i = i > 4 ? 1 : i),
                (p = c.slice(i)),
                (i += n[1].length)),
            (l = !1),
            !c &&
              /^ *$/.test(f) &&
              ((r +=
                f +
                `
`),
              (t = t.substring(f.length + 1)),
              (h = !0)),
            !h)
          ) {
            const E = new RegExp(
                `^ {0,${Math.min(
                  3,
                  i - 1
                )}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`
              ),
              I = new RegExp(
                `^ {0,${Math.min(
                  3,
                  i - 1
                )}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`
              ),
              N = new RegExp(`^ {0,${Math.min(3, i - 1)}}(?:\`\`\`|~~~)`),
              D = new RegExp(`^ {0,${Math.min(3, i - 1)}}#`);
            for (
              ;
              t &&
              ((d = t.split(
                `
`,
                1
              )[0]),
              (f = d),
              this.options.pedantic &&
                (f = f.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ")),
              !(N.test(f) || D.test(f) || E.test(f) || I.test(t)));

            ) {
              if (f.search(/[^ ]/) >= i || !f.trim())
                p +=
                  `
` + f.slice(i);
              else {
                if (
                  l ||
                  c.search(/[^ ]/) >= 4 ||
                  N.test(c) ||
                  D.test(c) ||
                  I.test(c)
                )
                  break;
                p +=
                  `
` + f;
              }
              !l && !f.trim() && (l = !0),
                (r +=
                  d +
                  `
`),
                (t = t.substring(d.length + 1)),
                (c = f.slice(i));
            }
          }
          m.loose || (u ? (m.loose = !0) : /\n *\n *$/.test(r) && (u = !0)),
            this.options.gfm &&
              ((o = /^\[[ xX]\] /.exec(p)),
              o &&
                ((s = o[0] !== "[ ] "), (p = p.replace(/^\[[ xX]\] +/, "")))),
            m.items.push({
              type: "list_item",
              raw: r,
              task: !!o,
              checked: s,
              loose: !1,
              text: p,
            }),
            (m.raw += r);
        }
        (m.items[m.items.length - 1].raw = r.trimRight()),
          (m.items[m.items.length - 1].text = p.trimRight()),
          (m.raw = m.raw.trimRight());
        const x = m.items.length;
        for (a = 0; a < x; a++)
          if (
            ((this.lexer.state.top = !1),
            (m.items[a].tokens = this.lexer.blockTokens(m.items[a].text, [])),
            !m.loose)
          ) {
            const E = m.items[a].tokens.filter((N) => N.type === "space"),
              I = E.length > 0 && E.some((N) => /\n.*\n/.test(N.raw));
            m.loose = I;
          }
        if (m.loose) for (a = 0; a < x; a++) m.items[a].loose = !0;
        return m;
      }
    }
    html(t) {
      const n = this.rules.block.html.exec(t);
      if (n) {
        const r = {
          type: "html",
          raw: n[0],
          pre:
            !this.options.sanitizer &&
            (n[1] === "pre" || n[1] === "script" || n[1] === "style"),
          text: n[0],
        };
        if (this.options.sanitize) {
          const o = this.options.sanitizer
            ? this.options.sanitizer(n[0])
            : nt(n[0]);
          (r.type = "paragraph"),
            (r.text = o),
            (r.tokens = this.lexer.inline(o));
        }
        return r;
      }
    }
    def(t) {
      const n = this.rules.block.def.exec(t);
      if (n) {
        const r = n[1].toLowerCase().replace(/\s+/g, " "),
          o = n[2]
            ? n[2]
                .replace(/^<(.*)>$/, "$1")
                .replace(this.rules.inline._escapes, "$1")
            : "",
          s = n[3]
            ? n[3]
                .substring(1, n[3].length - 1)
                .replace(this.rules.inline._escapes, "$1")
            : n[3];
        return { type: "def", tag: r, raw: n[0], href: o, title: s };
      }
    }
    table(t) {
      const n = this.rules.block.table.exec(t);
      if (n) {
        const r = {
          type: "table",
          header: Rf(n[1]).map((o) => ({ text: o })),
          align: n[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
          rows:
            n[3] && n[3].trim()
              ? n[3].replace(/\n[ \t]*$/, "").split(`
`)
              : [],
        };
        if (r.header.length === r.align.length) {
          r.raw = n[0];
          let o = r.align.length,
            s,
            i,
            a,
            l;
          for (s = 0; s < o; s++)
            /^ *-+: *$/.test(r.align[s])
              ? (r.align[s] = "right")
              : /^ *:-+: *$/.test(r.align[s])
              ? (r.align[s] = "center")
              : /^ *:-+ *$/.test(r.align[s])
              ? (r.align[s] = "left")
              : (r.align[s] = null);
          for (o = r.rows.length, s = 0; s < o; s++)
            r.rows[s] = Rf(r.rows[s], r.header.length).map((u) => ({
              text: u,
            }));
          for (o = r.header.length, i = 0; i < o; i++)
            r.header[i].tokens = this.lexer.inline(r.header[i].text);
          for (o = r.rows.length, i = 0; i < o; i++)
            for (l = r.rows[i], a = 0; a < l.length; a++)
              l[a].tokens = this.lexer.inline(l[a].text);
          return r;
        }
      }
    }
    lheading(t) {
      const n = this.rules.block.lheading.exec(t);
      if (n)
        return {
          type: "heading",
          raw: n[0],
          depth: n[2].charAt(0) === "=" ? 1 : 2,
          text: n[1],
          tokens: this.lexer.inline(n[1]),
        };
    }
    paragraph(t) {
      const n = this.rules.block.paragraph.exec(t);
      if (n) {
        const r =
          n[1].charAt(n[1].length - 1) ===
          `
`
            ? n[1].slice(0, -1)
            : n[1];
        return {
          type: "paragraph",
          raw: n[0],
          text: r,
          tokens: this.lexer.inline(r),
        };
      }
    }
    text(t) {
      const n = this.rules.block.text.exec(t);
      if (n)
        return {
          type: "text",
          raw: n[0],
          text: n[0],
          tokens: this.lexer.inline(n[0]),
        };
    }
    escape(t) {
      const n = this.rules.inline.escape.exec(t);
      if (n) return { type: "escape", raw: n[0], text: nt(n[1]) };
    }
    tag(t) {
      const n = this.rules.inline.tag.exec(t);
      if (n)
        return (
          !this.lexer.state.inLink && /^<a /i.test(n[0])
            ? (this.lexer.state.inLink = !0)
            : this.lexer.state.inLink &&
              /^<\/a>/i.test(n[0]) &&
              (this.lexer.state.inLink = !1),
          !this.lexer.state.inRawBlock &&
          /^<(pre|code|kbd|script)(\s|>)/i.test(n[0])
            ? (this.lexer.state.inRawBlock = !0)
            : this.lexer.state.inRawBlock &&
              /^<\/(pre|code|kbd|script)(\s|>)/i.test(n[0]) &&
              (this.lexer.state.inRawBlock = !1),
          {
            type: this.options.sanitize ? "text" : "html",
            raw: n[0],
            inLink: this.lexer.state.inLink,
            inRawBlock: this.lexer.state.inRawBlock,
            text: this.options.sanitize
              ? this.options.sanitizer
                ? this.options.sanitizer(n[0])
                : nt(n[0])
              : n[0],
          }
        );
    }
    link(t) {
      const n = this.rules.inline.link.exec(t);
      if (n) {
        const r = n[2].trim();
        if (!this.options.pedantic && /^</.test(r)) {
          if (!/>$/.test(r)) return;
          const i = Ts(r.slice(0, -1), "\\");
          if ((r.length - i.length) % 2 === 0) return;
        } else {
          const i = m4(n[2], "()");
          if (i > -1) {
            const l = (n[0].indexOf("!") === 0 ? 5 : 4) + n[1].length + i;
            (n[2] = n[2].substring(0, i)),
              (n[0] = n[0].substring(0, l).trim()),
              (n[3] = "");
          }
        }
        let o = n[2],
          s = "";
        if (this.options.pedantic) {
          const i = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(o);
          i && ((o = i[1]), (s = i[3]));
        } else s = n[3] ? n[3].slice(1, -1) : "";
        return (
          (o = o.trim()),
          /^</.test(o) &&
            (this.options.pedantic && !/>$/.test(r)
              ? (o = o.slice(1))
              : (o = o.slice(1, -1))),
          If(
            n,
            {
              href: o && o.replace(this.rules.inline._escapes, "$1"),
              title: s && s.replace(this.rules.inline._escapes, "$1"),
            },
            n[0],
            this.lexer
          )
        );
      }
    }
    reflink(t, n) {
      let r;
      if (
        (r = this.rules.inline.reflink.exec(t)) ||
        (r = this.rules.inline.nolink.exec(t))
      ) {
        let o = (r[2] || r[1]).replace(/\s+/g, " ");
        if (((o = n[o.toLowerCase()]), !o)) {
          const s = r[0].charAt(0);
          return { type: "text", raw: s, text: s };
        }
        return If(r, o, r[0], this.lexer);
      }
    }
    emStrong(t, n, r = "") {
      let o = this.rules.inline.emStrong.lDelim.exec(t);
      if (!o || (o[3] && r.match(/[\p{L}\p{N}]/u))) return;
      const s = o[1] || o[2] || "";
      if (!s || (s && (r === "" || this.rules.inline.punctuation.exec(r)))) {
        const i = o[0].length - 1;
        let a,
          l,
          u = i,
          c = 0;
        const f =
          o[0][0] === "*"
            ? this.rules.inline.emStrong.rDelimAst
            : this.rules.inline.emStrong.rDelimUnd;
        for (
          f.lastIndex = 0, n = n.slice(-1 * t.length + i);
          (o = f.exec(n)) != null;

        ) {
          if (((a = o[1] || o[2] || o[3] || o[4] || o[5] || o[6]), !a))
            continue;
          if (((l = a.length), o[3] || o[4])) {
            u += l;
            continue;
          } else if ((o[5] || o[6]) && i % 3 && !((i + l) % 3)) {
            c += l;
            continue;
          }
          if (((u -= l), u > 0)) continue;
          l = Math.min(l, l + u + c);
          const d = t.slice(0, i + o.index + (o[0].length - a.length) + l);
          if (Math.min(i, l) % 2) {
            const h = d.slice(1, -1);
            return {
              type: "em",
              raw: d,
              text: h,
              tokens: this.lexer.inlineTokens(h),
            };
          }
          const p = d.slice(2, -2);
          return {
            type: "strong",
            raw: d,
            text: p,
            tokens: this.lexer.inlineTokens(p),
          };
        }
      }
    }
    codespan(t) {
      const n = this.rules.inline.code.exec(t);
      if (n) {
        let r = n[2].replace(/\n/g, " ");
        const o = /[^ ]/.test(r),
          s = /^ /.test(r) && / $/.test(r);
        return (
          o && s && (r = r.substring(1, r.length - 1)),
          (r = nt(r, !0)),
          { type: "codespan", raw: n[0], text: r }
        );
      }
    }
    br(t) {
      const n = this.rules.inline.br.exec(t);
      if (n) return { type: "br", raw: n[0] };
    }
    del(t) {
      const n = this.rules.inline.del.exec(t);
      if (n)
        return {
          type: "del",
          raw: n[0],
          text: n[2],
          tokens: this.lexer.inlineTokens(n[2]),
        };
    }
    autolink(t, n) {
      const r = this.rules.inline.autolink.exec(t);
      if (r) {
        let o, s;
        return (
          r[2] === "@"
            ? ((o = nt(this.options.mangle ? n(r[1]) : r[1])),
              (s = "mailto:" + o))
            : ((o = nt(r[1])), (s = o)),
          {
            type: "link",
            raw: r[0],
            text: o,
            href: s,
            tokens: [{ type: "text", raw: o, text: o }],
          }
        );
      }
    }
    url(t, n) {
      let r;
      if ((r = this.rules.inline.url.exec(t))) {
        let o, s;
        if (r[2] === "@")
          (o = nt(this.options.mangle ? n(r[0]) : r[0])), (s = "mailto:" + o);
        else {
          let i;
          do (i = r[0]), (r[0] = this.rules.inline._backpedal.exec(r[0])[0]);
          while (i !== r[0]);
          (o = nt(r[0])), r[1] === "www." ? (s = "http://" + r[0]) : (s = r[0]);
        }
        return {
          type: "link",
          raw: r[0],
          text: o,
          href: s,
          tokens: [{ type: "text", raw: o, text: o }],
        };
      }
    }
    inlineText(t, n) {
      const r = this.rules.inline.text.exec(t);
      if (r) {
        let o;
        return (
          this.lexer.state.inRawBlock
            ? (o = this.options.sanitize
                ? this.options.sanitizer
                  ? this.options.sanitizer(r[0])
                  : nt(r[0])
                : r[0])
            : (o = nt(this.options.smartypants ? n(r[0]) : r[0])),
          { type: "text", raw: r[0], text: o }
        );
      }
    }
  }
  const ce = {
    newline: /^(?: *(?:\n|$))+/,
    code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
    fences:
      /^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
    hr: /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
    heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
    blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
    list: /^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,
    html: "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",
    def: /^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,
    table: Ds,
    lheading: /^((?:.|\n(?!\n))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
    _paragraph:
      /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
    text: /^[^\n]+/,
  };
  ce._label = /(?!\s*\])(?:\\.|[^\[\]\\])+/;
  ce._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
  ce.def = ze(ce.def)
    .replace("label", ce._label)
    .replace("title", ce._title)
    .getRegex();
  ce.bullet = /(?:[*+-]|\d{1,9}[.)])/;
  ce.listItemStart = ze(/^( *)(bull) */)
    .replace("bull", ce.bullet)
    .getRegex();
  ce.list = ze(ce.list)
    .replace(/bull/g, ce.bullet)
    .replace(
      "hr",
      "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))"
    )
    .replace("def", "\\n+(?=" + ce.def.source + ")")
    .getRegex();
  ce._tag =
    "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
  ce._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/;
  ce.html = ze(ce.html, "i")
    .replace("comment", ce._comment)
    .replace("tag", ce._tag)
    .replace(
      "attribute",
      / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/
    )
    .getRegex();
  ce.paragraph = ze(ce._paragraph)
    .replace("hr", ce.hr)
    .replace("heading", " {0,3}#{1,6} ")
    .replace("|lheading", "")
    .replace("|table", "")
    .replace("blockquote", " {0,3}>")
    .replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
    .replace("list", " {0,3}(?:[*+-]|1[.)]) ")
    .replace(
      "html",
      "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)"
    )
    .replace("tag", ce._tag)
    .getRegex();
  ce.blockquote = ze(ce.blockquote)
    .replace("paragraph", ce.paragraph)
    .getRegex();
  ce.normal = Kt({}, ce);
  ce.gfm = Kt({}, ce.normal, {
    table:
      "^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)",
  });
  ce.gfm.table = ze(ce.gfm.table)
    .replace("hr", ce.hr)
    .replace("heading", " {0,3}#{1,6} ")
    .replace("blockquote", " {0,3}>")
    .replace("code", " {4}[^\\n]")
    .replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
    .replace("list", " {0,3}(?:[*+-]|1[.)]) ")
    .replace(
      "html",
      "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)"
    )
    .replace("tag", ce._tag)
    .getRegex();
  ce.gfm.paragraph = ze(ce._paragraph)
    .replace("hr", ce.hr)
    .replace("heading", " {0,3}#{1,6} ")
    .replace("|lheading", "")
    .replace("table", ce.gfm.table)
    .replace("blockquote", " {0,3}>")
    .replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
    .replace("list", " {0,3}(?:[*+-]|1[.)]) ")
    .replace(
      "html",
      "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)"
    )
    .replace("tag", ce._tag)
    .getRegex();
  ce.pedantic = Kt({}, ce.normal, {
    html: ze(
      `^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`
    )
      .replace("comment", ce._comment)
      .replace(
        /tag/g,
        "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b"
      )
      .getRegex(),
    def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
    heading: /^(#{1,6})(.*)(?:\n+|$)/,
    fences: Ds,
    lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
    paragraph: ze(ce.normal._paragraph)
      .replace("hr", ce.hr)
      .replace(
        "heading",
        ` *#{1,6} *[^
]`
      )
      .replace("lheading", ce.lheading)
      .replace("blockquote", " {0,3}>")
      .replace("|fences", "")
      .replace("|list", "")
      .replace("|html", "")
      .getRegex(),
  });
  const se = {
    escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
    autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
    url: Ds,
    tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
    link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
    reflink: /^!?\[(label)\]\[(ref)\]/,
    nolink: /^!?\[(ref)\](?:\[\])?/,
    reflinkSearch: "reflink|nolink(?!\\()",
    emStrong: {
      lDelim: /^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,
      rDelimAst:
        /^(?:[^_*\\]|\\.)*?\_\_(?:[^_*\\]|\\.)*?\*(?:[^_*\\]|\\.)*?(?=\_\_)|(?:[^*\\]|\\.)+(?=[^*])|[punct_](\*+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|(?:[^punct*_\s\\]|\\.)(\*+)(?=[^punct*_\s])/,
      rDelimUnd:
        /^(?:[^_*\\]|\\.)*?\*\*(?:[^_*\\]|\\.)*?\_(?:[^_*\\]|\\.)*?(?=\*\*)|(?:[^_\\]|\\.)+(?=[^_])|[punct*](\_+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/,
    },
    code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
    br: /^( {2,}|\\)\n(?!\s*$)/,
    del: Ds,
    text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
    punctuation: /^([\spunctuation])/,
  };
  se._punctuation = "!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~";
  se.punctuation = ze(se.punctuation)
    .replace(/punctuation/g, se._punctuation)
    .getRegex();
  se.blockSkip = /\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g;
  se.escapedEmSt = /(?:^|[^\\])(?:\\\\)*\\[*_]/g;
  se._comment = ze(ce._comment).replace("(?:-->|$)", "-->").getRegex();
  se.emStrong.lDelim = ze(se.emStrong.lDelim)
    .replace(/punct/g, se._punctuation)
    .getRegex();
  se.emStrong.rDelimAst = ze(se.emStrong.rDelimAst, "g")
    .replace(/punct/g, se._punctuation)
    .getRegex();
  se.emStrong.rDelimUnd = ze(se.emStrong.rDelimUnd, "g")
    .replace(/punct/g, se._punctuation)
    .getRegex();
  se._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;
  se._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
  se._email =
    /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
  se.autolink = ze(se.autolink)
    .replace("scheme", se._scheme)
    .replace("email", se._email)
    .getRegex();
  se._attribute =
    /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;
  se.tag = ze(se.tag)
    .replace("comment", se._comment)
    .replace("attribute", se._attribute)
    .getRegex();
  se._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
  se._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/;
  se._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;
  se.link = ze(se.link)
    .replace("label", se._label)
    .replace("href", se._href)
    .replace("title", se._title)
    .getRegex();
  se.reflink = ze(se.reflink)
    .replace("label", se._label)
    .replace("ref", ce._label)
    .getRegex();
  se.nolink = ze(se.nolink).replace("ref", ce._label).getRegex();
  se.reflinkSearch = ze(se.reflinkSearch, "g")
    .replace("reflink", se.reflink)
    .replace("nolink", se.nolink)
    .getRegex();
  se.normal = Kt({}, se);
  se.pedantic = Kt({}, se.normal, {
    strong: {
      start: /^__|\*\*/,
      middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
      endAst: /\*\*(?!\*)/g,
      endUnd: /__(?!_)/g,
    },
    em: {
      start: /^_|\*/,
      middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
      endAst: /\*(?!\*)/g,
      endUnd: /_(?!_)/g,
    },
    link: ze(/^!?\[(label)\]\((.*?)\)/)
      .replace("label", se._label)
      .getRegex(),
    reflink: ze(/^!?\[(label)\]\s*\[([^\]]*)\]/)
      .replace("label", se._label)
      .getRegex(),
  });
  se.gfm = Kt({}, se.normal, {
    escape: ze(se.escape).replace("])", "~|])").getRegex(),
    _extended_email:
      /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
    url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
    _backpedal:
      /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
    del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
    text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/,
  });
  se.gfm.url = ze(se.gfm.url, "i")
    .replace("email", se.gfm._extended_email)
    .getRegex();
  se.breaks = Kt({}, se.gfm, {
    br: ze(se.br).replace("{2,}", "*").getRegex(),
    text: ze(se.gfm.text)
      .replace("\\b_", "\\b_| {2,}\\n")
      .replace(/\{2,\}/g, "*")
      .getRegex(),
  });
  function y4(e) {
    return e
      .replace(/---/g, "—")
      .replace(/--/g, "–")
      .replace(/(^|[-\u2014/(\[{"\s])'/g, "$1‘")
      .replace(/'/g, "’")
      .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1“")
      .replace(/"/g, "”")
      .replace(/\.{3}/g, "…");
  }
  function Ff(e) {
    let t = "",
      n,
      r;
    const o = e.length;
    for (n = 0; n < o; n++)
      (r = e.charCodeAt(n)),
        Math.random() > 0.5 && (r = "x" + r.toString(16)),
        (t += "&#" + r + ";");
    return t;
  }
  class vn {
    constructor(t) {
      (this.tokens = []),
        (this.tokens.links = Object.create(null)),
        (this.options = t || eo),
        (this.options.tokenizer = this.options.tokenizer || new Gl()),
        (this.tokenizer = this.options.tokenizer),
        (this.tokenizer.options = this.options),
        (this.tokenizer.lexer = this),
        (this.inlineQueue = []),
        (this.state = { inLink: !1, inRawBlock: !1, top: !0 });
      const n = { block: ce.normal, inline: se.normal };
      this.options.pedantic
        ? ((n.block = ce.pedantic), (n.inline = se.pedantic))
        : this.options.gfm &&
          ((n.block = ce.gfm),
          this.options.breaks ? (n.inline = se.breaks) : (n.inline = se.gfm)),
        (this.tokenizer.rules = n);
    }
    static get rules() {
      return { block: ce, inline: se };
    }
    static lex(t, n) {
      return new vn(n).lex(t);
    }
    static lexInline(t, n) {
      return new vn(n).inlineTokens(t);
    }
    lex(t) {
      (t = t.replace(
        /\r\n|\r/g,
        `
`
      )),
        this.blockTokens(t, this.tokens);
      let n;
      for (; (n = this.inlineQueue.shift()); )
        this.inlineTokens(n.src, n.tokens);
      return this.tokens;
    }
    blockTokens(t, n = []) {
      this.options.pedantic
        ? (t = t.replace(/\t/g, "    ").replace(/^ +$/gm, ""))
        : (t = t.replace(
            /^( *)(\t+)/gm,
            (a, l, u) => l + "    ".repeat(u.length)
          ));
      let r, o, s, i;
      for (; t; )
        if (
          !(
            this.options.extensions &&
            this.options.extensions.block &&
            this.options.extensions.block.some((a) =>
              (r = a.call({ lexer: this }, t, n))
                ? ((t = t.substring(r.raw.length)), n.push(r), !0)
                : !1
            )
          )
        ) {
          if ((r = this.tokenizer.space(t))) {
            (t = t.substring(r.raw.length)),
              r.raw.length === 1 && n.length > 0
                ? (n[n.length - 1].raw += `
`)
                : n.push(r);
            continue;
          }
          if ((r = this.tokenizer.code(t))) {
            (t = t.substring(r.raw.length)),
              (o = n[n.length - 1]),
              o && (o.type === "paragraph" || o.type === "text")
                ? ((o.raw +=
                    `
` + r.raw),
                  (o.text +=
                    `
` + r.text),
                  (this.inlineQueue[this.inlineQueue.length - 1].src = o.text))
                : n.push(r);
            continue;
          }
          if ((r = this.tokenizer.fences(t))) {
            (t = t.substring(r.raw.length)), n.push(r);
            continue;
          }
          if ((r = this.tokenizer.heading(t))) {
            (t = t.substring(r.raw.length)), n.push(r);
            continue;
          }
          if ((r = this.tokenizer.hr(t))) {
            (t = t.substring(r.raw.length)), n.push(r);
            continue;
          }
          if ((r = this.tokenizer.blockquote(t))) {
            (t = t.substring(r.raw.length)), n.push(r);
            continue;
          }
          if ((r = this.tokenizer.list(t))) {
            (t = t.substring(r.raw.length)), n.push(r);
            continue;
          }
          if ((r = this.tokenizer.html(t))) {
            (t = t.substring(r.raw.length)), n.push(r);
            continue;
          }
          if ((r = this.tokenizer.def(t))) {
            (t = t.substring(r.raw.length)),
              (o = n[n.length - 1]),
              o && (o.type === "paragraph" || o.type === "text")
                ? ((o.raw +=
                    `
` + r.raw),
                  (o.text +=
                    `
` + r.raw),
                  (this.inlineQueue[this.inlineQueue.length - 1].src = o.text))
                : this.tokens.links[r.tag] ||
                  (this.tokens.links[r.tag] = { href: r.href, title: r.title });
            continue;
          }
          if ((r = this.tokenizer.table(t))) {
            (t = t.substring(r.raw.length)), n.push(r);
            continue;
          }
          if ((r = this.tokenizer.lheading(t))) {
            (t = t.substring(r.raw.length)), n.push(r);
            continue;
          }
          if (
            ((s = t),
            this.options.extensions && this.options.extensions.startBlock)
          ) {
            let a = 1 / 0;
            const l = t.slice(1);
            let u;
            this.options.extensions.startBlock.forEach(function (c) {
              (u = c.call({ lexer: this }, l)),
                typeof u == "number" && u >= 0 && (a = Math.min(a, u));
            }),
              a < 1 / 0 && a >= 0 && (s = t.substring(0, a + 1));
          }
          if (this.state.top && (r = this.tokenizer.paragraph(s))) {
            (o = n[n.length - 1]),
              i && o.type === "paragraph"
                ? ((o.raw +=
                    `
` + r.raw),
                  (o.text +=
                    `
` + r.text),
                  this.inlineQueue.pop(),
                  (this.inlineQueue[this.inlineQueue.length - 1].src = o.text))
                : n.push(r),
              (i = s.length !== t.length),
              (t = t.substring(r.raw.length));
            continue;
          }
          if ((r = this.tokenizer.text(t))) {
            (t = t.substring(r.raw.length)),
              (o = n[n.length - 1]),
              o && o.type === "text"
                ? ((o.raw +=
                    `
` + r.raw),
                  (o.text +=
                    `
` + r.text),
                  this.inlineQueue.pop(),
                  (this.inlineQueue[this.inlineQueue.length - 1].src = o.text))
                : n.push(r);
            continue;
          }
          if (t) {
            const a = "Infinite loop on byte: " + t.charCodeAt(0);
            if (this.options.silent) {
              console.error(a);
              break;
            } else throw new Error(a);
          }
        }
      return (this.state.top = !0), n;
    }
    inline(t, n = []) {
      return this.inlineQueue.push({ src: t, tokens: n }), n;
    }
    inlineTokens(t, n = []) {
      let r,
        o,
        s,
        i = t,
        a,
        l,
        u;
      if (this.tokens.links) {
        const c = Object.keys(this.tokens.links);
        if (c.length > 0)
          for (
            ;
            (a = this.tokenizer.rules.inline.reflinkSearch.exec(i)) != null;

          )
            c.includes(a[0].slice(a[0].lastIndexOf("[") + 1, -1)) &&
              (i =
                i.slice(0, a.index) +
                "[" +
                Mf("a", a[0].length - 2) +
                "]" +
                i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
      }
      for (; (a = this.tokenizer.rules.inline.blockSkip.exec(i)) != null; )
        i =
          i.slice(0, a.index) +
          "[" +
          Mf("a", a[0].length - 2) +
          "]" +
          i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
      for (; (a = this.tokenizer.rules.inline.escapedEmSt.exec(i)) != null; )
        (i =
          i.slice(0, a.index + a[0].length - 2) +
          "++" +
          i.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex)),
          this.tokenizer.rules.inline.escapedEmSt.lastIndex--;
      for (; t; )
        if (
          (l || (u = ""),
          (l = !1),
          !(
            this.options.extensions &&
            this.options.extensions.inline &&
            this.options.extensions.inline.some((c) =>
              (r = c.call({ lexer: this }, t, n))
                ? ((t = t.substring(r.raw.length)), n.push(r), !0)
                : !1
            )
          ))
        ) {
          if ((r = this.tokenizer.escape(t))) {
            (t = t.substring(r.raw.length)), n.push(r);
            continue;
          }
          if ((r = this.tokenizer.tag(t))) {
            (t = t.substring(r.raw.length)),
              (o = n[n.length - 1]),
              o && r.type === "text" && o.type === "text"
                ? ((o.raw += r.raw), (o.text += r.text))
                : n.push(r);
            continue;
          }
          if ((r = this.tokenizer.link(t))) {
            (t = t.substring(r.raw.length)), n.push(r);
            continue;
          }
          if ((r = this.tokenizer.reflink(t, this.tokens.links))) {
            (t = t.substring(r.raw.length)),
              (o = n[n.length - 1]),
              o && r.type === "text" && o.type === "text"
                ? ((o.raw += r.raw), (o.text += r.text))
                : n.push(r);
            continue;
          }
          if ((r = this.tokenizer.emStrong(t, i, u))) {
            (t = t.substring(r.raw.length)), n.push(r);
            continue;
          }
          if ((r = this.tokenizer.codespan(t))) {
            (t = t.substring(r.raw.length)), n.push(r);
            continue;
          }
          if ((r = this.tokenizer.br(t))) {
            (t = t.substring(r.raw.length)), n.push(r);
            continue;
          }
          if ((r = this.tokenizer.del(t))) {
            (t = t.substring(r.raw.length)), n.push(r);
            continue;
          }
          if ((r = this.tokenizer.autolink(t, Ff))) {
            (t = t.substring(r.raw.length)), n.push(r);
            continue;
          }
          if (!this.state.inLink && (r = this.tokenizer.url(t, Ff))) {
            (t = t.substring(r.raw.length)), n.push(r);
            continue;
          }
          if (
            ((s = t),
            this.options.extensions && this.options.extensions.startInline)
          ) {
            let c = 1 / 0;
            const f = t.slice(1);
            let d;
            this.options.extensions.startInline.forEach(function (p) {
              (d = p.call({ lexer: this }, f)),
                typeof d == "number" && d >= 0 && (c = Math.min(c, d));
            }),
              c < 1 / 0 && c >= 0 && (s = t.substring(0, c + 1));
          }
          if ((r = this.tokenizer.inlineText(s, y4))) {
            (t = t.substring(r.raw.length)),
              r.raw.slice(-1) !== "_" && (u = r.raw.slice(-1)),
              (l = !0),
              (o = n[n.length - 1]),
              o && o.type === "text"
                ? ((o.raw += r.raw), (o.text += r.text))
                : n.push(r);
            continue;
          }
          if (t) {
            const c = "Infinite loop on byte: " + t.charCodeAt(0);
            if (this.options.silent) {
              console.error(c);
              break;
            } else throw new Error(c);
          }
        }
      return n;
    }
  }
  class Jl {
    constructor(t) {
      this.options = t || eo;
    }
    code(t, n, r) {
      const o = (n || "").match(/\S*/)[0];
      if (this.options.highlight) {
        const s = this.options.highlight(t, o);
        s != null && s !== t && ((r = !0), (t = s));
      }
      return (
        (t =
          t.replace(/\n$/, "") +
          `
`),
        o
          ? '<pre><code class="' +
            this.options.langPrefix +
            nt(o) +
            '">' +
            (r ? t : nt(t, !0)) +
            `</code></pre>
`
          : "<pre><code>" +
            (r ? t : nt(t, !0)) +
            `</code></pre>
`
      );
    }
    blockquote(t) {
      return `<blockquote>
${t}</blockquote>
`;
    }
    html(t) {
      return t;
    }
    heading(t, n, r, o) {
      if (this.options.headerIds) {
        const s = this.options.headerPrefix + o.slug(r);
        return `<h${n} id="${s}">${t}</h${n}>
`;
      }
      return `<h${n}>${t}</h${n}>
`;
    }
    hr() {
      return this.options.xhtml
        ? `<hr/>
`
        : `<hr>
`;
    }
    list(t, n, r) {
      const o = n ? "ol" : "ul",
        s = n && r !== 1 ? ' start="' + r + '"' : "";
      return (
        "<" +
        o +
        s +
        `>
` +
        t +
        "</" +
        o +
        `>
`
      );
    }
    listitem(t) {
      return `<li>${t}</li>
`;
    }
    checkbox(t) {
      return (
        "<input " +
        (t ? 'checked="" ' : "") +
        'disabled="" type="checkbox"' +
        (this.options.xhtml ? " /" : "") +
        "> "
      );
    }
    paragraph(t) {
      return `<p>${t}</p>
`;
    }
    table(t, n) {
      return (
        n && (n = `<tbody>${n}</tbody>`),
        `<table>
<thead>
` +
          t +
          `</thead>
` +
          n +
          `</table>
`
      );
    }
    tablerow(t) {
      return `<tr>
${t}</tr>
`;
    }
    tablecell(t, n) {
      const r = n.header ? "th" : "td";
      return (
        (n.align ? `<${r} align="${n.align}">` : `<${r}>`) +
        t +
        `</${r}>
`
      );
    }
    strong(t) {
      return `<strong>${t}</strong>`;
    }
    em(t) {
      return `<em>${t}</em>`;
    }
    codespan(t) {
      return `<code>${t}</code>`;
    }
    br() {
      return this.options.xhtml ? "<br/>" : "<br>";
    }
    del(t) {
      return `<del>${t}</del>`;
    }
    link(t, n, r) {
      if (
        ((t = Pf(this.options.sanitize, this.options.baseUrl, t)), t === null)
      )
        return r;
      let o = '<a href="' + t + '"';
      return n && (o += ' title="' + n + '"'), (o += ">" + r + "</a>"), o;
    }
    image(t, n, r) {
      if (
        ((t = Pf(this.options.sanitize, this.options.baseUrl, t)), t === null)
      )
        return r;
      let o = `<img src="${t}" alt="${r}"`;
      return (
        n && (o += ` title="${n}"`), (o += this.options.xhtml ? "/>" : ">"), o
      );
    }
    text(t) {
      return t;
    }
  }
  class wg {
    strong(t) {
      return t;
    }
    em(t) {
      return t;
    }
    codespan(t) {
      return t;
    }
    del(t) {
      return t;
    }
    html(t) {
      return t;
    }
    text(t) {
      return t;
    }
    link(t, n, r) {
      return "" + r;
    }
    image(t, n, r) {
      return "" + r;
    }
    br() {
      return "";
    }
  }
  class xg {
    constructor() {
      this.seen = {};
    }
    serialize(t) {
      return t
        .toLowerCase()
        .trim()
        .replace(/<[!\/a-z].*?>/gi, "")
        .replace(
          /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,
          ""
        )
        .replace(/\s/g, "-");
    }
    getNextSafeSlug(t, n) {
      let r = t,
        o = 0;
      if (this.seen.hasOwnProperty(r)) {
        o = this.seen[t];
        do o++, (r = t + "-" + o);
        while (this.seen.hasOwnProperty(r));
      }
      return n || ((this.seen[t] = o), (this.seen[r] = 0)), r;
    }
    slug(t, n = {}) {
      const r = this.serialize(t);
      return this.getNextSafeSlug(r, n.dryrun);
    }
  }
  class nn {
    constructor(t) {
      (this.options = t || eo),
        (this.options.renderer = this.options.renderer || new Jl()),
        (this.renderer = this.options.renderer),
        (this.renderer.options = this.options),
        (this.textRenderer = new wg()),
        (this.slugger = new xg());
    }
    static parse(t, n) {
      return new nn(n).parse(t);
    }
    static parseInline(t, n) {
      return new nn(n).parseInline(t);
    }
    parse(t, n = !0) {
      let r = "",
        o,
        s,
        i,
        a,
        l,
        u,
        c,
        f,
        d,
        p,
        h,
        g,
        _,
        m,
        w,
        x,
        E,
        I,
        N;
      const D = t.length;
      for (o = 0; o < D; o++) {
        if (
          ((p = t[o]),
          this.options.extensions &&
            this.options.extensions.renderers &&
            this.options.extensions.renderers[p.type] &&
            ((N = this.options.extensions.renderers[p.type].call(
              { parser: this },
              p
            )),
            N !== !1 ||
              ![
                "space",
                "hr",
                "heading",
                "code",
                "table",
                "blockquote",
                "list",
                "html",
                "paragraph",
                "text",
              ].includes(p.type)))
        ) {
          r += N || "";
          continue;
        }
        switch (p.type) {
          case "space":
            continue;
          case "hr": {
            r += this.renderer.hr();
            continue;
          }
          case "heading": {
            r += this.renderer.heading(
              this.parseInline(p.tokens),
              p.depth,
              bg(this.parseInline(p.tokens, this.textRenderer)),
              this.slugger
            );
            continue;
          }
          case "code": {
            r += this.renderer.code(p.text, p.lang, p.escaped);
            continue;
          }
          case "table": {
            for (f = "", c = "", a = p.header.length, s = 0; s < a; s++)
              c += this.renderer.tablecell(
                this.parseInline(p.header[s].tokens),
                { header: !0, align: p.align[s] }
              );
            for (
              f += this.renderer.tablerow(c), d = "", a = p.rows.length, s = 0;
              s < a;
              s++
            ) {
              for (u = p.rows[s], c = "", l = u.length, i = 0; i < l; i++)
                c += this.renderer.tablecell(this.parseInline(u[i].tokens), {
                  header: !1,
                  align: p.align[i],
                });
              d += this.renderer.tablerow(c);
            }
            r += this.renderer.table(f, d);
            continue;
          }
          case "blockquote": {
            (d = this.parse(p.tokens)), (r += this.renderer.blockquote(d));
            continue;
          }
          case "list": {
            for (
              h = p.ordered,
                g = p.start,
                _ = p.loose,
                a = p.items.length,
                d = "",
                s = 0;
              s < a;
              s++
            )
              (w = p.items[s]),
                (x = w.checked),
                (E = w.task),
                (m = ""),
                w.task &&
                  ((I = this.renderer.checkbox(x)),
                  _
                    ? w.tokens.length > 0 && w.tokens[0].type === "paragraph"
                      ? ((w.tokens[0].text = I + " " + w.tokens[0].text),
                        w.tokens[0].tokens &&
                          w.tokens[0].tokens.length > 0 &&
                          w.tokens[0].tokens[0].type === "text" &&
                          (w.tokens[0].tokens[0].text =
                            I + " " + w.tokens[0].tokens[0].text))
                      : w.tokens.unshift({ type: "text", text: I })
                    : (m += I)),
                (m += this.parse(w.tokens, _)),
                (d += this.renderer.listitem(m, E, x));
            r += this.renderer.list(d, h, g);
            continue;
          }
          case "html": {
            r += this.renderer.html(p.text);
            continue;
          }
          case "paragraph": {
            r += this.renderer.paragraph(this.parseInline(p.tokens));
            continue;
          }
          case "text": {
            for (
              d = p.tokens ? this.parseInline(p.tokens) : p.text;
              o + 1 < D && t[o + 1].type === "text";

            )
              (p = t[++o]),
                (d +=
                  `
` + (p.tokens ? this.parseInline(p.tokens) : p.text));
            r += n ? this.renderer.paragraph(d) : d;
            continue;
          }
          default: {
            const T = 'Token with "' + p.type + '" type was not found.';
            if (this.options.silent) {
              console.error(T);
              return;
            } else throw new Error(T);
          }
        }
      }
      return r;
    }
    parseInline(t, n) {
      n = n || this.renderer;
      let r = "",
        o,
        s,
        i;
      const a = t.length;
      for (o = 0; o < a; o++) {
        if (
          ((s = t[o]),
          this.options.extensions &&
            this.options.extensions.renderers &&
            this.options.extensions.renderers[s.type] &&
            ((i = this.options.extensions.renderers[s.type].call(
              { parser: this },
              s
            )),
            i !== !1 ||
              ![
                "escape",
                "html",
                "link",
                "image",
                "strong",
                "em",
                "codespan",
                "br",
                "del",
                "text",
              ].includes(s.type)))
        ) {
          r += i || "";
          continue;
        }
        switch (s.type) {
          case "escape": {
            r += n.text(s.text);
            break;
          }
          case "html": {
            r += n.html(s.text);
            break;
          }
          case "link": {
            r += n.link(s.href, s.title, this.parseInline(s.tokens, n));
            break;
          }
          case "image": {
            r += n.image(s.href, s.title, s.text);
            break;
          }
          case "strong": {
            r += n.strong(this.parseInline(s.tokens, n));
            break;
          }
          case "em": {
            r += n.em(this.parseInline(s.tokens, n));
            break;
          }
          case "codespan": {
            r += n.codespan(s.text);
            break;
          }
          case "br": {
            r += n.br();
            break;
          }
          case "del": {
            r += n.del(this.parseInline(s.tokens, n));
            break;
          }
          case "text": {
            r += n.text(s.text);
            break;
          }
          default: {
            const l = 'Token with "' + s.type + '" type was not found.';
            if (this.options.silent) {
              console.error(l);
              return;
            } else throw new Error(l);
          }
        }
      }
      return r;
    }
  }
  function ge(e, t, n) {
    if (typeof e > "u" || e === null)
      throw new Error("marked(): input parameter is undefined or null");
    if (typeof e != "string")
      throw new Error(
        "marked(): input parameter is of type " +
          Object.prototype.toString.call(e) +
          ", string expected"
      );
    if (
      (typeof t == "function" && ((n = t), (t = null)),
      (t = Kt({}, ge.defaults, t || {})),
      _g(t),
      n)
    ) {
      const o = t.highlight;
      let s;
      try {
        s = vn.lex(e, t);
      } catch (l) {
        return n(l);
      }
      const i = function (l) {
        let u;
        if (!l)
          try {
            t.walkTokens && ge.walkTokens(s, t.walkTokens),
              (u = nn.parse(s, t));
          } catch (c) {
            l = c;
          }
        return (t.highlight = o), l ? n(l) : n(null, u);
      };
      if (!o || o.length < 3 || (delete t.highlight, !s.length)) return i();
      let a = 0;
      ge.walkTokens(s, function (l) {
        l.type === "code" &&
          (a++,
          setTimeout(() => {
            o(l.text, l.lang, function (u, c) {
              if (u) return i(u);
              c != null && c !== l.text && ((l.text = c), (l.escaped = !0)),
                a--,
                a === 0 && i();
            });
          }, 0));
      }),
        a === 0 && i();
      return;
    }
    function r(o) {
      if (
        ((o.message += `
Please report this to https://github.com/markedjs/marked.`),
        t.silent)
      )
        return (
          "<p>An error occurred:</p><pre>" + nt(o.message + "", !0) + "</pre>"
        );
      throw o;
    }
    try {
      const o = vn.lex(e, t);
      if (t.walkTokens) {
        if (t.async)
          return Promise.all(ge.walkTokens(o, t.walkTokens))
            .then(() => nn.parse(o, t))
            .catch(r);
        ge.walkTokens(o, t.walkTokens);
      }
      return nn.parse(o, t);
    } catch (o) {
      r(o);
    }
  }
  ge.options = ge.setOptions = function (e) {
    return Kt(ge.defaults, e), o4(ge.defaults), ge;
  };
  ge.getDefaults = mg;
  ge.defaults = eo;
  ge.use = function (...e) {
    const t = ge.defaults.extensions || { renderers: {}, childTokens: {} };
    e.forEach((n) => {
      const r = Kt({}, n);
      if (
        ((r.async = ge.defaults.async || r.async),
        n.extensions &&
          (n.extensions.forEach((o) => {
            if (!o.name) throw new Error("extension name required");
            if (o.renderer) {
              const s = t.renderers[o.name];
              s
                ? (t.renderers[o.name] = function (...i) {
                    let a = o.renderer.apply(this, i);
                    return a === !1 && (a = s.apply(this, i)), a;
                  })
                : (t.renderers[o.name] = o.renderer);
            }
            if (o.tokenizer) {
              if (!o.level || (o.level !== "block" && o.level !== "inline"))
                throw new Error("extension level must be 'block' or 'inline'");
              t[o.level]
                ? t[o.level].unshift(o.tokenizer)
                : (t[o.level] = [o.tokenizer]),
                o.start &&
                  (o.level === "block"
                    ? t.startBlock
                      ? t.startBlock.push(o.start)
                      : (t.startBlock = [o.start])
                    : o.level === "inline" &&
                      (t.startInline
                        ? t.startInline.push(o.start)
                        : (t.startInline = [o.start])));
            }
            o.childTokens && (t.childTokens[o.name] = o.childTokens);
          }),
          (r.extensions = t)),
        n.renderer)
      ) {
        const o = ge.defaults.renderer || new Jl();
        for (const s in n.renderer) {
          const i = o[s];
          o[s] = (...a) => {
            let l = n.renderer[s].apply(o, a);
            return l === !1 && (l = i.apply(o, a)), l;
          };
        }
        r.renderer = o;
      }
      if (n.tokenizer) {
        const o = ge.defaults.tokenizer || new Gl();
        for (const s in n.tokenizer) {
          const i = o[s];
          o[s] = (...a) => {
            let l = n.tokenizer[s].apply(o, a);
            return l === !1 && (l = i.apply(o, a)), l;
          };
        }
        r.tokenizer = o;
      }
      if (n.walkTokens) {
        const o = ge.defaults.walkTokens;
        r.walkTokens = function (s) {
          let i = [];
          return (
            i.push(n.walkTokens.call(this, s)),
            o && (i = i.concat(o.call(this, s))),
            i
          );
        };
      }
      ge.setOptions(r);
    });
  };
  ge.walkTokens = function (e, t) {
    let n = [];
    for (const r of e)
      switch (((n = n.concat(t.call(ge, r))), r.type)) {
        case "table": {
          for (const o of r.header) n = n.concat(ge.walkTokens(o.tokens, t));
          for (const o of r.rows)
            for (const s of o) n = n.concat(ge.walkTokens(s.tokens, t));
          break;
        }
        case "list": {
          n = n.concat(ge.walkTokens(r.items, t));
          break;
        }
        default:
          ge.defaults.extensions &&
          ge.defaults.extensions.childTokens &&
          ge.defaults.extensions.childTokens[r.type]
            ? ge.defaults.extensions.childTokens[r.type].forEach(function (o) {
                n = n.concat(ge.walkTokens(r[o], t));
              })
            : r.tokens && (n = n.concat(ge.walkTokens(r.tokens, t)));
      }
    return n;
  };
  ge.parseInline = function (e, t) {
    if (typeof e > "u" || e === null)
      throw new Error(
        "marked.parseInline(): input parameter is undefined or null"
      );
    if (typeof e != "string")
      throw new Error(
        "marked.parseInline(): input parameter is of type " +
          Object.prototype.toString.call(e) +
          ", string expected"
      );
    (t = Kt({}, ge.defaults, t || {})), _g(t);
    try {
      const n = vn.lexInline(e, t);
      return (
        t.walkTokens && ge.walkTokens(n, t.walkTokens), nn.parseInline(n, t)
      );
    } catch (n) {
      if (
        ((n.message += `
Please report this to https://github.com/markedjs/marked.`),
        t.silent)
      )
        return (
          "<p>An error occurred:</p><pre>" + nt(n.message + "", !0) + "</pre>"
        );
      throw n;
    }
  };
  ge.Parser = nn;
  ge.parser = nn.parse;
  ge.Renderer = Jl;
  ge.TextRenderer = wg;
  ge.Lexer = vn;
  ge.lexer = vn.lex;
  ge.Tokenizer = Gl;
  ge.Slugger = xg;
  ge.parse = ge;
  ge.options;
  ge.setOptions;
  ge.use;
  ge.walkTokens;
  ge.parseInline;
  nn.parse;
  vn.lex;
  const b4 = {
      data() {
        return { markdown: "" };
      },
      mounted() {
        this.getReadme();
      },
      methods: {
        async getReadme() {
          const e = OT.service({
            lock: !0,
            text: "Loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          try {
            const t = await (await qA()).data;
            this.markdown = ge(t);
          } catch {
            alert("网络出错");
          }
          e.close();
        },
      },
    },
    _4 = ["innerHTML"];
  function w4(e, t, n, r, o, s) {
    return (
      ee(),
      me("div", { innerHTML: o.markdown, class: "markdown-body" }, null, 8, _4)
    );
  }
  const x4 = Wo(b4, [["render", w4]]),
    E4 = [
      { path: "/", name: "Welcome", component: Af },
      { path: "/login", name: "Login", component: GA },
      { path: "/message-board", name: "MessageBoard", component: Af },
      { path: "/about", name: "About", component: x4 },
    ],
    Ma = hC({ history: k$(), routes: E4 }),
    S4 = f$({
      state: { user: null, messageList: [] },
      mutations: {
        setUser(e, t) {
          e.user = t;
        },
        setMessageList(e, t) {
          e.messageList = t;
        },
        addMessage(e, t) {
          e.messageList.push(t);
        },
        deleteMessage(e, t) {
          e.messageList = e.messageList.filter((n) => n._id !== t);
        },
      },
      actions: {
        async login({ commit: e }, { username: t, password: n }) {
          try {
            const r = await dg(t, n),
              { data: o } = r;
            return o;
          } catch (r) {
            return Promise.reject(r);
          }
        },
        async getMessageList({ commit: e }) {
          try {
            const t = await pg(),
              { data: n } = t;
            return e("setMessageList", n.messageList), n;
          } catch (t) {
            return Promise.reject(t);
          }
        },
        async addMessage({ commit: e }, { content: t, author: n }) {
          try {
            const r = await hg(t, n),
              { data: o } = r;
            return e("addMessage", o.message), o;
          } catch (r) {
            return Promise.reject(r);
          }
        },
        async deleteMessage({ commit: e }, t) {
          try {
            const n = await gg(t),
              { data: r } = n;
            return e("deleteMessage", t), r;
          } catch (n) {
            return Promise.reject(n);
          }
        },
      },
      getters: { isLoggedIn: (e) => e.user !== null },
    });
  Kd(kC).use(S4).use(Ma).mount("#app");
});
export default O4();
