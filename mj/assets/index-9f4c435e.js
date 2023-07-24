var no = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
var oo = no((exports, module) => {
  (function () {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload")) return;
    for (const i of document.querySelectorAll('link[rel="modulepreload"]'))
      r(i);
    new MutationObserver((i) => {
      for (const g of i)
        if (g.type === "childList")
          for (const y of g.addedNodes)
            y.tagName === "LINK" && y.rel === "modulepreload" && r(y);
    }).observe(document, { childList: !0, subtree: !0 });
    function n(i) {
      const g = {};
      return (
        i.integrity && (g.integrity = i.integrity),
        i.referrerpolicy && (g.referrerPolicy = i.referrerpolicy),
        i.crossorigin === "use-credentials"
          ? (g.credentials = "include")
          : i.crossorigin === "anonymous"
          ? (g.credentials = "omit")
          : (g.credentials = "same-origin"),
        g
      );
    }
    function r(i) {
      if (i.ep) return;
      i.ep = !0;
      const g = n(i);
      fetch(i.href, g);
    }
  })();
  function makeMap(e, t) {
    const n = Object.create(null),
      r = e.split(",");
    for (let i = 0; i < r.length; i++) n[r[i]] = !0;
    return t ? (i) => !!n[i.toLowerCase()] : (i) => !!n[i];
  }
  function normalizeStyle(e) {
    if (isArray$3(e)) {
      const t = {};
      for (let n = 0; n < e.length; n++) {
        const r = e[n],
          i = isString$3(r) ? parseStringStyle(r) : normalizeStyle(r);
        if (i) for (const g in i) t[g] = i[g];
      }
      return t;
    } else {
      if (isString$3(e)) return e;
      if (isObject$3(e)) return e;
    }
  }
  const listDelimiterRE = /;(?![^(]*\))/g,
    propertyDelimiterRE = /:([^]+)/,
    styleCommentRE = /\/\*.*?\*\//gs;
  function parseStringStyle(e) {
    const t = {};
    return (
      e
        .replace(styleCommentRE, "")
        .split(listDelimiterRE)
        .forEach((n) => {
          if (n) {
            const r = n.split(propertyDelimiterRE);
            r.length > 1 && (t[r[0].trim()] = r[1].trim());
          }
        }),
      t
    );
  }
  function normalizeClass(e) {
    let t = "";
    if (isString$3(e)) t = e;
    else if (isArray$3(e))
      for (let n = 0; n < e.length; n++) {
        const r = normalizeClass(e[n]);
        r && (t += r + " ");
      }
    else if (isObject$3(e)) for (const n in e) e[n] && (t += n + " ");
    return t.trim();
  }
  const specialBooleanAttrs =
      "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
    isSpecialBooleanAttr = makeMap(specialBooleanAttrs);
  function includeBooleanAttr(e) {
    return !!e || e === "";
  }
  function looseCompareArrays(e, t) {
    if (e.length !== t.length) return !1;
    let n = !0;
    for (let r = 0; n && r < e.length; r++) n = looseEqual(e[r], t[r]);
    return n;
  }
  function looseEqual(e, t) {
    if (e === t) return !0;
    let n = isDate$1(e),
      r = isDate$1(t);
    if (n || r) return n && r ? e.getTime() === t.getTime() : !1;
    if (((n = isSymbol$1(e)), (r = isSymbol$1(t)), n || r)) return e === t;
    if (((n = isArray$3(e)), (r = isArray$3(t)), n || r))
      return n && r ? looseCompareArrays(e, t) : !1;
    if (((n = isObject$3(e)), (r = isObject$3(t)), n || r)) {
      if (!n || !r) return !1;
      const i = Object.keys(e).length,
        g = Object.keys(t).length;
      if (i !== g) return !1;
      for (const y in e) {
        const $ = e.hasOwnProperty(y),
          k = t.hasOwnProperty(y);
        if (($ && !k) || (!$ && k) || !looseEqual(e[y], t[y])) return !1;
      }
    }
    return String(e) === String(t);
  }
  function looseIndexOf(e, t) {
    return e.findIndex((n) => looseEqual(n, t));
  }
  const toDisplayString = (e) =>
      isString$3(e)
        ? e
        : e == null
        ? ""
        : isArray$3(e) ||
          (isObject$3(e) &&
            (e.toString === objectToString$1 || !isFunction$3(e.toString)))
        ? JSON.stringify(e, replacer, 2)
        : String(e),
    replacer = (e, t) =>
      t && t.__v_isRef
        ? replacer(e, t.value)
        : isMap(t)
        ? {
            [`Map(${t.size})`]: [...t.entries()].reduce(
              (n, [r, i]) => ((n[`${r} =>`] = i), n),
              {}
            ),
          }
        : isSet(t)
        ? { [`Set(${t.size})`]: [...t.values()] }
        : isObject$3(t) && !isArray$3(t) && !isPlainObject$1(t)
        ? String(t)
        : t,
    EMPTY_OBJ = {},
    EMPTY_ARR = [],
    NOOP = () => {},
    NO = () => !1,
    onRE = /^on[^a-z]/,
    isOn = (e) => onRE.test(e),
    isModelListener = (e) => e.startsWith("onUpdate:"),
    extend$1 = Object.assign,
    remove = (e, t) => {
      const n = e.indexOf(t);
      n > -1 && e.splice(n, 1);
    },
    hasOwnProperty$b = Object.prototype.hasOwnProperty,
    hasOwn = (e, t) => hasOwnProperty$b.call(e, t),
    isArray$3 = Array.isArray,
    isMap = (e) => toTypeString(e) === "[object Map]",
    isSet = (e) => toTypeString(e) === "[object Set]",
    isDate$1 = (e) => toTypeString(e) === "[object Date]",
    isFunction$3 = (e) => typeof e == "function",
    isString$3 = (e) => typeof e == "string",
    isSymbol$1 = (e) => typeof e == "symbol",
    isObject$3 = (e) => e !== null && typeof e == "object",
    isPromise = (e) =>
      isObject$3(e) && isFunction$3(e.then) && isFunction$3(e.catch),
    objectToString$1 = Object.prototype.toString,
    toTypeString = (e) => objectToString$1.call(e),
    toRawType = (e) => toTypeString(e).slice(8, -1),
    isPlainObject$1 = (e) => toTypeString(e) === "[object Object]",
    isIntegerKey = (e) =>
      isString$3(e) &&
      e !== "NaN" &&
      e[0] !== "-" &&
      "" + parseInt(e, 10) === e,
    isReservedProp = makeMap(
      ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
    ),
    cacheStringFunction = (e) => {
      const t = Object.create(null);
      return (n) => t[n] || (t[n] = e(n));
    },
    camelizeRE = /-(\w)/g,
    camelize = cacheStringFunction((e) =>
      e.replace(camelizeRE, (t, n) => (n ? n.toUpperCase() : ""))
    ),
    hyphenateRE = /\B([A-Z])/g,
    hyphenate = cacheStringFunction((e) =>
      e.replace(hyphenateRE, "-$1").toLowerCase()
    ),
    capitalize = cacheStringFunction(
      (e) => e.charAt(0).toUpperCase() + e.slice(1)
    ),
    toHandlerKey = cacheStringFunction((e) => (e ? `on${capitalize(e)}` : "")),
    hasChanged = (e, t) => !Object.is(e, t),
    invokeArrayFns = (e, t) => {
      for (let n = 0; n < e.length; n++) e[n](t);
    },
    def = (e, t, n) => {
      Object.defineProperty(e, t, {
        configurable: !0,
        enumerable: !1,
        value: n,
      });
    },
    toNumber$1 = (e) => {
      const t = parseFloat(e);
      return isNaN(t) ? e : t;
    };
  let _globalThis;
  const getGlobalThis = () =>
    _globalThis ||
    (_globalThis =
      typeof globalThis < "u"
        ? globalThis
        : typeof self < "u"
        ? self
        : typeof window < "u"
        ? window
        : typeof global < "u"
        ? global
        : {});
  let activeEffectScope;
  class EffectScope {
    constructor(t = !1) {
      (this.detached = t),
        (this.active = !0),
        (this.effects = []),
        (this.cleanups = []),
        (this.parent = activeEffectScope),
        !t &&
          activeEffectScope &&
          (this.index =
            (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
              this
            ) - 1);
    }
    run(t) {
      if (this.active) {
        const n = activeEffectScope;
        try {
          return (activeEffectScope = this), t();
        } finally {
          activeEffectScope = n;
        }
      }
    }
    on() {
      activeEffectScope = this;
    }
    off() {
      activeEffectScope = this.parent;
    }
    stop(t) {
      if (this.active) {
        let n, r;
        for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
        for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
        if (this.scopes)
          for (n = 0, r = this.scopes.length; n < r; n++)
            this.scopes[n].stop(!0);
        if (!this.detached && this.parent && !t) {
          const i = this.parent.scopes.pop();
          i &&
            i !== this &&
            ((this.parent.scopes[this.index] = i), (i.index = this.index));
        }
        (this.parent = void 0), (this.active = !1);
      }
    }
  }
  function recordEffectScope(e, t = activeEffectScope) {
    t && t.active && t.effects.push(e);
  }
  function getCurrentScope() {
    return activeEffectScope;
  }
  function onScopeDispose(e) {
    activeEffectScope && activeEffectScope.cleanups.push(e);
  }
  const createDep = (e) => {
      const t = new Set(e);
      return (t.w = 0), (t.n = 0), t;
    },
    wasTracked = (e) => (e.w & trackOpBit) > 0,
    newTracked = (e) => (e.n & trackOpBit) > 0,
    initDepMarkers = ({ deps: e }) => {
      if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= trackOpBit;
    },
    finalizeDepMarkers = (e) => {
      const { deps: t } = e;
      if (t.length) {
        let n = 0;
        for (let r = 0; r < t.length; r++) {
          const i = t[r];
          wasTracked(i) && !newTracked(i) ? i.delete(e) : (t[n++] = i),
            (i.w &= ~trackOpBit),
            (i.n &= ~trackOpBit);
        }
        t.length = n;
      }
    },
    targetMap = new WeakMap();
  let effectTrackDepth = 0,
    trackOpBit = 1;
  const maxMarkerBits = 30;
  let activeEffect;
  const ITERATE_KEY = Symbol(""),
    MAP_KEY_ITERATE_KEY = Symbol("");
  class ReactiveEffect {
    constructor(t, n = null, r) {
      (this.fn = t),
        (this.scheduler = n),
        (this.active = !0),
        (this.deps = []),
        (this.parent = void 0),
        recordEffectScope(this, r);
    }
    run() {
      if (!this.active) return this.fn();
      let t = activeEffect,
        n = shouldTrack;
      for (; t; ) {
        if (t === this) return;
        t = t.parent;
      }
      try {
        return (
          (this.parent = activeEffect),
          (activeEffect = this),
          (shouldTrack = !0),
          (trackOpBit = 1 << ++effectTrackDepth),
          effectTrackDepth <= maxMarkerBits
            ? initDepMarkers(this)
            : cleanupEffect(this),
          this.fn()
        );
      } finally {
        effectTrackDepth <= maxMarkerBits && finalizeDepMarkers(this),
          (trackOpBit = 1 << --effectTrackDepth),
          (activeEffect = this.parent),
          (shouldTrack = n),
          (this.parent = void 0),
          this.deferStop && this.stop();
      }
    }
    stop() {
      activeEffect === this
        ? (this.deferStop = !0)
        : this.active &&
          (cleanupEffect(this),
          this.onStop && this.onStop(),
          (this.active = !1));
    }
  }
  function cleanupEffect(e) {
    const { deps: t } = e;
    if (t.length) {
      for (let n = 0; n < t.length; n++) t[n].delete(e);
      t.length = 0;
    }
  }
  let shouldTrack = !0;
  const trackStack = [];
  function pauseTracking() {
    trackStack.push(shouldTrack), (shouldTrack = !1);
  }
  function resetTracking() {
    const e = trackStack.pop();
    shouldTrack = e === void 0 ? !0 : e;
  }
  function track(e, t, n) {
    if (shouldTrack && activeEffect) {
      let r = targetMap.get(e);
      r || targetMap.set(e, (r = new Map()));
      let i = r.get(n);
      i || r.set(n, (i = createDep())), trackEffects(i);
    }
  }
  function trackEffects(e, t) {
    let n = !1;
    effectTrackDepth <= maxMarkerBits
      ? newTracked(e) || ((e.n |= trackOpBit), (n = !wasTracked(e)))
      : (n = !e.has(activeEffect)),
      n && (e.add(activeEffect), activeEffect.deps.push(e));
  }
  function trigger(e, t, n, r, i, g) {
    const y = targetMap.get(e);
    if (!y) return;
    let $ = [];
    if (t === "clear") $ = [...y.values()];
    else if (n === "length" && isArray$3(e)) {
      const k = toNumber$1(r);
      y.forEach((V, L) => {
        (L === "length" || L >= k) && $.push(V);
      });
    } else
      switch ((n !== void 0 && $.push(y.get(n)), t)) {
        case "add":
          isArray$3(e)
            ? isIntegerKey(n) && $.push(y.get("length"))
            : ($.push(y.get(ITERATE_KEY)),
              isMap(e) && $.push(y.get(MAP_KEY_ITERATE_KEY)));
          break;
        case "delete":
          isArray$3(e) ||
            ($.push(y.get(ITERATE_KEY)),
            isMap(e) && $.push(y.get(MAP_KEY_ITERATE_KEY)));
          break;
        case "set":
          isMap(e) && $.push(y.get(ITERATE_KEY));
          break;
      }
    if ($.length === 1) $[0] && triggerEffects($[0]);
    else {
      const k = [];
      for (const V of $) V && k.push(...V);
      triggerEffects(createDep(k));
    }
  }
  function triggerEffects(e, t) {
    const n = isArray$3(e) ? e : [...e];
    for (const r of n) r.computed && triggerEffect(r);
    for (const r of n) r.computed || triggerEffect(r);
  }
  function triggerEffect(e, t) {
    (e !== activeEffect || e.allowRecurse) &&
      (e.scheduler ? e.scheduler() : e.run());
  }
  const isNonTrackableKeys = makeMap("__proto__,__v_isRef,__isVue"),
    builtInSymbols = new Set(
      Object.getOwnPropertyNames(Symbol)
        .filter((e) => e !== "arguments" && e !== "caller")
        .map((e) => Symbol[e])
        .filter(isSymbol$1)
    ),
    get$1 = createGetter(),
    shallowGet = createGetter(!1, !0),
    readonlyGet = createGetter(!0),
    arrayInstrumentations = createArrayInstrumentations();
  function createArrayInstrumentations() {
    const e = {};
    return (
      ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
        e[t] = function (...n) {
          const r = toRaw(this);
          for (let g = 0, y = this.length; g < y; g++) track(r, "get", g + "");
          const i = r[t](...n);
          return i === -1 || i === !1 ? r[t](...n.map(toRaw)) : i;
        };
      }),
      ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
        e[t] = function (...n) {
          pauseTracking();
          const r = toRaw(this)[t].apply(this, n);
          return resetTracking(), r;
        };
      }),
      e
    );
  }
  function createGetter(e = !1, t = !1) {
    return function (r, i, g) {
      if (i === "__v_isReactive") return !e;
      if (i === "__v_isReadonly") return e;
      if (i === "__v_isShallow") return t;
      if (
        i === "__v_raw" &&
        g ===
          (e
            ? t
              ? shallowReadonlyMap
              : readonlyMap
            : t
            ? shallowReactiveMap
            : reactiveMap
          ).get(r)
      )
        return r;
      const y = isArray$3(r);
      if (!e && y && hasOwn(arrayInstrumentations, i))
        return Reflect.get(arrayInstrumentations, i, g);
      const $ = Reflect.get(r, i, g);
      return (isSymbol$1(i) ? builtInSymbols.has(i) : isNonTrackableKeys(i)) ||
        (e || track(r, "get", i), t)
        ? $
        : isRef($)
        ? y && isIntegerKey(i)
          ? $
          : $.value
        : isObject$3($)
        ? e
          ? readonly($)
          : reactive($)
        : $;
    };
  }
  const set$1 = createSetter(),
    shallowSet = createSetter(!0);
  function createSetter(e = !1) {
    return function (n, r, i, g) {
      let y = n[r];
      if (isReadonly(y) && isRef(y) && !isRef(i)) return !1;
      if (
        !e &&
        (!isShallow(i) && !isReadonly(i) && ((y = toRaw(y)), (i = toRaw(i))),
        !isArray$3(n) && isRef(y) && !isRef(i))
      )
        return (y.value = i), !0;
      const $ =
          isArray$3(n) && isIntegerKey(r) ? Number(r) < n.length : hasOwn(n, r),
        k = Reflect.set(n, r, i, g);
      return (
        n === toRaw(g) &&
          ($
            ? hasChanged(i, y) && trigger(n, "set", r, i)
            : trigger(n, "add", r, i)),
        k
      );
    };
  }
  function deleteProperty(e, t) {
    const n = hasOwn(e, t);
    e[t];
    const r = Reflect.deleteProperty(e, t);
    return r && n && trigger(e, "delete", t, void 0), r;
  }
  function has(e, t) {
    const n = Reflect.has(e, t);
    return (!isSymbol$1(t) || !builtInSymbols.has(t)) && track(e, "has", t), n;
  }
  function ownKeys(e) {
    return (
      track(e, "iterate", isArray$3(e) ? "length" : ITERATE_KEY),
      Reflect.ownKeys(e)
    );
  }
  const mutableHandlers = {
      get: get$1,
      set: set$1,
      deleteProperty,
      has,
      ownKeys,
    },
    readonlyHandlers = {
      get: readonlyGet,
      set(e, t) {
        return !0;
      },
      deleteProperty(e, t) {
        return !0;
      },
    },
    shallowReactiveHandlers = extend$1({}, mutableHandlers, {
      get: shallowGet,
      set: shallowSet,
    }),
    toShallow = (e) => e,
    getProto = (e) => Reflect.getPrototypeOf(e);
  function get$1$1(e, t, n = !1, r = !1) {
    e = e.__v_raw;
    const i = toRaw(e),
      g = toRaw(t);
    n || (t !== g && track(i, "get", t), track(i, "get", g));
    const { has: y } = getProto(i),
      $ = r ? toShallow : n ? toReadonly : toReactive;
    if (y.call(i, t)) return $(e.get(t));
    if (y.call(i, g)) return $(e.get(g));
    e !== i && e.get(t);
  }
  function has$1(e, t = !1) {
    const n = this.__v_raw,
      r = toRaw(n),
      i = toRaw(e);
    return (
      t || (e !== i && track(r, "has", e), track(r, "has", i)),
      e === i ? n.has(e) : n.has(e) || n.has(i)
    );
  }
  function size(e, t = !1) {
    return (
      (e = e.__v_raw),
      !t && track(toRaw(e), "iterate", ITERATE_KEY),
      Reflect.get(e, "size", e)
    );
  }
  function add(e) {
    e = toRaw(e);
    const t = toRaw(this);
    return (
      getProto(t).has.call(t, e) || (t.add(e), trigger(t, "add", e, e)), this
    );
  }
  function set$1$1(e, t) {
    t = toRaw(t);
    const n = toRaw(this),
      { has: r, get: i } = getProto(n);
    let g = r.call(n, e);
    g || ((e = toRaw(e)), (g = r.call(n, e)));
    const y = i.call(n, e);
    return (
      n.set(e, t),
      g ? hasChanged(t, y) && trigger(n, "set", e, t) : trigger(n, "add", e, t),
      this
    );
  }
  function deleteEntry(e) {
    const t = toRaw(this),
      { has: n, get: r } = getProto(t);
    let i = n.call(t, e);
    i || ((e = toRaw(e)), (i = n.call(t, e))), r && r.call(t, e);
    const g = t.delete(e);
    return i && trigger(t, "delete", e, void 0), g;
  }
  function clear() {
    const e = toRaw(this),
      t = e.size !== 0,
      n = e.clear();
    return t && trigger(e, "clear", void 0, void 0), n;
  }
  function createForEach(e, t) {
    return function (r, i) {
      const g = this,
        y = g.__v_raw,
        $ = toRaw(y),
        k = t ? toShallow : e ? toReadonly : toReactive;
      return (
        !e && track($, "iterate", ITERATE_KEY),
        y.forEach((V, L) => r.call(i, k(V), k(L), g))
      );
    };
  }
  function createIterableMethod(e, t, n) {
    return function (...r) {
      const i = this.__v_raw,
        g = toRaw(i),
        y = isMap(g),
        $ = e === "entries" || (e === Symbol.iterator && y),
        k = e === "keys" && y,
        V = i[e](...r),
        L = n ? toShallow : t ? toReadonly : toReactive;
      return (
        !t && track(g, "iterate", k ? MAP_KEY_ITERATE_KEY : ITERATE_KEY),
        {
          next() {
            const { value: oe, done: j } = V.next();
            return j
              ? { value: oe, done: j }
              : { value: $ ? [L(oe[0]), L(oe[1])] : L(oe), done: j };
          },
          [Symbol.iterator]() {
            return this;
          },
        }
      );
    };
  }
  function createReadonlyMethod(e) {
    return function (...t) {
      return e === "delete" ? !1 : this;
    };
  }
  function createInstrumentations() {
    const e = {
        get(g) {
          return get$1$1(this, g);
        },
        get size() {
          return size(this);
        },
        has: has$1,
        add,
        set: set$1$1,
        delete: deleteEntry,
        clear,
        forEach: createForEach(!1, !1),
      },
      t = {
        get(g) {
          return get$1$1(this, g, !1, !0);
        },
        get size() {
          return size(this);
        },
        has: has$1,
        add,
        set: set$1$1,
        delete: deleteEntry,
        clear,
        forEach: createForEach(!1, !0),
      },
      n = {
        get(g) {
          return get$1$1(this, g, !0);
        },
        get size() {
          return size(this, !0);
        },
        has(g) {
          return has$1.call(this, g, !0);
        },
        add: createReadonlyMethod("add"),
        set: createReadonlyMethod("set"),
        delete: createReadonlyMethod("delete"),
        clear: createReadonlyMethod("clear"),
        forEach: createForEach(!0, !1),
      },
      r = {
        get(g) {
          return get$1$1(this, g, !0, !0);
        },
        get size() {
          return size(this, !0);
        },
        has(g) {
          return has$1.call(this, g, !0);
        },
        add: createReadonlyMethod("add"),
        set: createReadonlyMethod("set"),
        delete: createReadonlyMethod("delete"),
        clear: createReadonlyMethod("clear"),
        forEach: createForEach(!0, !0),
      };
    return (
      ["keys", "values", "entries", Symbol.iterator].forEach((g) => {
        (e[g] = createIterableMethod(g, !1, !1)),
          (n[g] = createIterableMethod(g, !0, !1)),
          (t[g] = createIterableMethod(g, !1, !0)),
          (r[g] = createIterableMethod(g, !0, !0));
      }),
      [e, n, t, r]
    );
  }
  const [
    mutableInstrumentations,
    readonlyInstrumentations,
    shallowInstrumentations,
    shallowReadonlyInstrumentations,
  ] = createInstrumentations();
  function createInstrumentationGetter(e, t) {
    const n = t
      ? e
        ? shallowReadonlyInstrumentations
        : shallowInstrumentations
      : e
      ? readonlyInstrumentations
      : mutableInstrumentations;
    return (r, i, g) =>
      i === "__v_isReactive"
        ? !e
        : i === "__v_isReadonly"
        ? e
        : i === "__v_raw"
        ? r
        : Reflect.get(hasOwn(n, i) && i in r ? n : r, i, g);
  }
  const mutableCollectionHandlers = {
      get: createInstrumentationGetter(!1, !1),
    },
    shallowCollectionHandlers = { get: createInstrumentationGetter(!1, !0) },
    readonlyCollectionHandlers = { get: createInstrumentationGetter(!0, !1) },
    reactiveMap = new WeakMap(),
    shallowReactiveMap = new WeakMap(),
    readonlyMap = new WeakMap(),
    shallowReadonlyMap = new WeakMap();
  function targetTypeMap(e) {
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
  function getTargetType(e) {
    return e.__v_skip || !Object.isExtensible(e)
      ? 0
      : targetTypeMap(toRawType(e));
  }
  function reactive(e) {
    return isReadonly(e)
      ? e
      : createReactiveObject(
          e,
          !1,
          mutableHandlers,
          mutableCollectionHandlers,
          reactiveMap
        );
  }
  function shallowReactive(e) {
    return createReactiveObject(
      e,
      !1,
      shallowReactiveHandlers,
      shallowCollectionHandlers,
      shallowReactiveMap
    );
  }
  function readonly(e) {
    return createReactiveObject(
      e,
      !0,
      readonlyHandlers,
      readonlyCollectionHandlers,
      readonlyMap
    );
  }
  function createReactiveObject(e, t, n, r, i) {
    if (!isObject$3(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
    const g = i.get(e);
    if (g) return g;
    const y = getTargetType(e);
    if (y === 0) return e;
    const $ = new Proxy(e, y === 2 ? r : n);
    return i.set(e, $), $;
  }
  function isReactive(e) {
    return isReadonly(e) ? isReactive(e.__v_raw) : !!(e && e.__v_isReactive);
  }
  function isReadonly(e) {
    return !!(e && e.__v_isReadonly);
  }
  function isShallow(e) {
    return !!(e && e.__v_isShallow);
  }
  function isProxy(e) {
    return isReactive(e) || isReadonly(e);
  }
  function toRaw(e) {
    const t = e && e.__v_raw;
    return t ? toRaw(t) : e;
  }
  function markRaw(e) {
    return def(e, "__v_skip", !0), e;
  }
  const toReactive = (e) => (isObject$3(e) ? reactive(e) : e),
    toReadonly = (e) => (isObject$3(e) ? readonly(e) : e);
  function trackRefValue(e) {
    shouldTrack &&
      activeEffect &&
      ((e = toRaw(e)), trackEffects(e.dep || (e.dep = createDep())));
  }
  function triggerRefValue(e, t) {
    (e = toRaw(e)), e.dep && triggerEffects(e.dep);
  }
  function isRef(e) {
    return !!(e && e.__v_isRef === !0);
  }
  function ref(e) {
    return createRef(e, !1);
  }
  function shallowRef(e) {
    return createRef(e, !0);
  }
  function createRef(e, t) {
    return isRef(e) ? e : new RefImpl(e, t);
  }
  class RefImpl {
    constructor(t, n) {
      (this.__v_isShallow = n),
        (this.dep = void 0),
        (this.__v_isRef = !0),
        (this._rawValue = n ? t : toRaw(t)),
        (this._value = n ? t : toReactive(t));
    }
    get value() {
      return trackRefValue(this), this._value;
    }
    set value(t) {
      const n = this.__v_isShallow || isShallow(t) || isReadonly(t);
      (t = n ? t : toRaw(t)),
        hasChanged(t, this._rawValue) &&
          ((this._rawValue = t),
          (this._value = n ? t : toReactive(t)),
          triggerRefValue(this));
    }
  }
  function triggerRef(e) {
    triggerRefValue(e);
  }
  function unref(e) {
    return isRef(e) ? e.value : e;
  }
  const shallowUnwrapHandlers = {
    get: (e, t, n) => unref(Reflect.get(e, t, n)),
    set: (e, t, n, r) => {
      const i = e[t];
      return isRef(i) && !isRef(n)
        ? ((i.value = n), !0)
        : Reflect.set(e, t, n, r);
    },
  };
  function proxyRefs(e) {
    return isReactive(e) ? e : new Proxy(e, shallowUnwrapHandlers);
  }
  function toRefs(e) {
    const t = isArray$3(e) ? new Array(e.length) : {};
    for (const n in e) t[n] = toRef(e, n);
    return t;
  }
  class ObjectRefImpl {
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
  }
  function toRef(e, t, n) {
    const r = e[t];
    return isRef(r) ? r : new ObjectRefImpl(e, t, n);
  }
  var _a$2;
  class ComputedRefImpl {
    constructor(t, n, r, i) {
      (this._setter = n),
        (this.dep = void 0),
        (this.__v_isRef = !0),
        (this[_a$2] = !1),
        (this._dirty = !0),
        (this.effect = new ReactiveEffect(t, () => {
          this._dirty || ((this._dirty = !0), triggerRefValue(this));
        })),
        (this.effect.computed = this),
        (this.effect.active = this._cacheable = !i),
        (this.__v_isReadonly = r);
    }
    get value() {
      const t = toRaw(this);
      return (
        trackRefValue(t),
        (t._dirty || !t._cacheable) &&
          ((t._dirty = !1), (t._value = t.effect.run())),
        t._value
      );
    }
    set value(t) {
      this._setter(t);
    }
  }
  _a$2 = "__v_isReadonly";
  function computed$1(e, t, n = !1) {
    let r, i;
    const g = isFunction$3(e);
    return (
      g ? ((r = e), (i = NOOP)) : ((r = e.get), (i = e.set)),
      new ComputedRefImpl(r, i, g || !i, n)
    );
  }
  function warn(e, ...t) {}
  function callWithErrorHandling(e, t, n, r) {
    let i;
    try {
      i = r ? e(...r) : e();
    } catch (g) {
      handleError(g, t, n);
    }
    return i;
  }
  function callWithAsyncErrorHandling(e, t, n, r) {
    if (isFunction$3(e)) {
      const g = callWithErrorHandling(e, t, n, r);
      return (
        g &&
          isPromise(g) &&
          g.catch((y) => {
            handleError(y, t, n);
          }),
        g
      );
    }
    const i = [];
    for (let g = 0; g < e.length; g++)
      i.push(callWithAsyncErrorHandling(e[g], t, n, r));
    return i;
  }
  function handleError(e, t, n, r = !0) {
    const i = t ? t.vnode : null;
    if (t) {
      let g = t.parent;
      const y = t.proxy,
        $ = n;
      for (; g; ) {
        const V = g.ec;
        if (V) {
          for (let L = 0; L < V.length; L++) if (V[L](e, y, $) === !1) return;
        }
        g = g.parent;
      }
      const k = t.appContext.config.errorHandler;
      if (k) {
        callWithErrorHandling(k, null, 10, [e, y, $]);
        return;
      }
    }
    logError(e, n, i, r);
  }
  function logError(e, t, n, r = !0) {
    console.error(e);
  }
  let isFlushing = !1,
    isFlushPending = !1;
  const queue = [];
  let flushIndex = 0;
  const pendingPostFlushCbs = [];
  let activePostFlushCbs = null,
    postFlushIndex = 0;
  const resolvedPromise = Promise.resolve();
  let currentFlushPromise = null;
  function nextTick(e) {
    const t = currentFlushPromise || resolvedPromise;
    return e ? t.then(this ? e.bind(this) : e) : t;
  }
  function findInsertionIndex(e) {
    let t = flushIndex + 1,
      n = queue.length;
    for (; t < n; ) {
      const r = (t + n) >>> 1;
      getId(queue[r]) < e ? (t = r + 1) : (n = r);
    }
    return t;
  }
  function queueJob(e) {
    (!queue.length ||
      !queue.includes(
        e,
        isFlushing && e.allowRecurse ? flushIndex + 1 : flushIndex
      )) &&
      (e.id == null
        ? queue.push(e)
        : queue.splice(findInsertionIndex(e.id), 0, e),
      queueFlush());
  }
  function queueFlush() {
    !isFlushing &&
      !isFlushPending &&
      ((isFlushPending = !0),
      (currentFlushPromise = resolvedPromise.then(flushJobs)));
  }
  function invalidateJob(e) {
    const t = queue.indexOf(e);
    t > flushIndex && queue.splice(t, 1);
  }
  function queuePostFlushCb(e) {
    isArray$3(e)
      ? pendingPostFlushCbs.push(...e)
      : (!activePostFlushCbs ||
          !activePostFlushCbs.includes(
            e,
            e.allowRecurse ? postFlushIndex + 1 : postFlushIndex
          )) &&
        pendingPostFlushCbs.push(e),
      queueFlush();
  }
  function flushPreFlushCbs(e, t = isFlushing ? flushIndex + 1 : 0) {
    for (; t < queue.length; t++) {
      const n = queue[t];
      n && n.pre && (queue.splice(t, 1), t--, n());
    }
  }
  function flushPostFlushCbs(e) {
    if (pendingPostFlushCbs.length) {
      const t = [...new Set(pendingPostFlushCbs)];
      if (((pendingPostFlushCbs.length = 0), activePostFlushCbs)) {
        activePostFlushCbs.push(...t);
        return;
      }
      for (
        activePostFlushCbs = t,
          activePostFlushCbs.sort((n, r) => getId(n) - getId(r)),
          postFlushIndex = 0;
        postFlushIndex < activePostFlushCbs.length;
        postFlushIndex++
      )
        activePostFlushCbs[postFlushIndex]();
      (activePostFlushCbs = null), (postFlushIndex = 0);
    }
  }
  const getId = (e) => (e.id == null ? 1 / 0 : e.id),
    comparator = (e, t) => {
      const n = getId(e) - getId(t);
      if (n === 0) {
        if (e.pre && !t.pre) return -1;
        if (t.pre && !e.pre) return 1;
      }
      return n;
    };
  function flushJobs(e) {
    (isFlushPending = !1), (isFlushing = !0), queue.sort(comparator);
    const t = NOOP;
    try {
      for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
        const n = queue[flushIndex];
        n && n.active !== !1 && callWithErrorHandling(n, null, 14);
      }
    } finally {
      (flushIndex = 0),
        (queue.length = 0),
        flushPostFlushCbs(),
        (isFlushing = !1),
        (currentFlushPromise = null),
        (queue.length || pendingPostFlushCbs.length) && flushJobs();
    }
  }
  function emit$1(e, t, ...n) {
    if (e.isUnmounted) return;
    const r = e.vnode.props || EMPTY_OBJ;
    let i = n;
    const g = t.startsWith("update:"),
      y = g && t.slice(7);
    if (y && y in r) {
      const L = `${y === "modelValue" ? "model" : y}Modifiers`,
        { number: oe, trim: j } = r[L] || EMPTY_OBJ;
      j && (i = n.map((ae) => (isString$3(ae) ? ae.trim() : ae))),
        oe && (i = n.map(toNumber$1));
    }
    let $,
      k = r[($ = toHandlerKey(t))] || r[($ = toHandlerKey(camelize(t)))];
    !k && g && (k = r[($ = toHandlerKey(hyphenate(t)))]),
      k && callWithAsyncErrorHandling(k, e, 6, i);
    const V = r[$ + "Once"];
    if (V) {
      if (!e.emitted) e.emitted = {};
      else if (e.emitted[$]) return;
      (e.emitted[$] = !0), callWithAsyncErrorHandling(V, e, 6, i);
    }
  }
  function normalizeEmitsOptions(e, t, n = !1) {
    const r = t.emitsCache,
      i = r.get(e);
    if (i !== void 0) return i;
    const g = e.emits;
    let y = {},
      $ = !1;
    if (!isFunction$3(e)) {
      const k = (V) => {
        const L = normalizeEmitsOptions(V, t, !0);
        L && (($ = !0), extend$1(y, L));
      };
      !n && t.mixins.length && t.mixins.forEach(k),
        e.extends && k(e.extends),
        e.mixins && e.mixins.forEach(k);
    }
    return !g && !$
      ? (isObject$3(e) && r.set(e, null), null)
      : (isArray$3(g) ? g.forEach((k) => (y[k] = null)) : extend$1(y, g),
        isObject$3(e) && r.set(e, y),
        y);
  }
  function isEmitListener(e, t) {
    return !e || !isOn(t)
      ? !1
      : ((t = t.slice(2).replace(/Once$/, "")),
        hasOwn(e, t[0].toLowerCase() + t.slice(1)) ||
          hasOwn(e, hyphenate(t)) ||
          hasOwn(e, t));
  }
  let currentRenderingInstance = null,
    currentScopeId = null;
  function setCurrentRenderingInstance(e) {
    const t = currentRenderingInstance;
    return (
      (currentRenderingInstance = e),
      (currentScopeId = (e && e.type.__scopeId) || null),
      t
    );
  }
  function pushScopeId(e) {
    currentScopeId = e;
  }
  function popScopeId() {
    currentScopeId = null;
  }
  function withCtx(e, t = currentRenderingInstance, n) {
    if (!t || e._n) return e;
    const r = (...i) => {
      r._d && setBlockTracking(-1);
      const g = setCurrentRenderingInstance(t);
      let y;
      try {
        y = e(...i);
      } finally {
        setCurrentRenderingInstance(g), r._d && setBlockTracking(1);
      }
      return y;
    };
    return (r._n = !0), (r._c = !0), (r._d = !0), r;
  }
  function markAttrsAccessed() {}
  function renderComponentRoot(e) {
    const {
      type: t,
      vnode: n,
      proxy: r,
      withProxy: i,
      props: g,
      propsOptions: [y],
      slots: $,
      attrs: k,
      emit: V,
      render: L,
      renderCache: oe,
      data: j,
      setupState: ae,
      ctx: z,
      inheritAttrs: re,
    } = e;
    let ie, le;
    const de = setCurrentRenderingInstance(e);
    try {
      if (n.shapeFlag & 4) {
        const pe = i || r;
        (ie = normalizeVNode(L.call(pe, pe, oe, g, ae, j, z))), (le = k);
      } else {
        const pe = t;
        (ie = normalizeVNode(
          pe.length > 1 ? pe(g, { attrs: k, slots: $, emit: V }) : pe(g, null)
        )),
          (le = t.props ? k : getFunctionalFallthrough(k));
      }
    } catch (pe) {
      (blockStack.length = 0),
        handleError(pe, e, 1),
        (ie = createVNode(Comment));
    }
    let ue = ie;
    if (le && re !== !1) {
      const pe = Object.keys(le),
        { shapeFlag: Ce } = ue;
      pe.length &&
        Ce & 7 &&
        (y && pe.some(isModelListener) && (le = filterModelListeners(le, y)),
        (ue = cloneVNode(ue, le)));
    }
    return (
      n.dirs &&
        ((ue = cloneVNode(ue)),
        (ue.dirs = ue.dirs ? ue.dirs.concat(n.dirs) : n.dirs)),
      n.transition && (ue.transition = n.transition),
      (ie = ue),
      setCurrentRenderingInstance(de),
      ie
    );
  }
  const getFunctionalFallthrough = (e) => {
      let t;
      for (const n in e)
        (n === "class" || n === "style" || isOn(n)) &&
          ((t || (t = {}))[n] = e[n]);
      return t;
    },
    filterModelListeners = (e, t) => {
      const n = {};
      for (const r in e)
        (!isModelListener(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
      return n;
    };
  function shouldUpdateComponent(e, t, n) {
    const { props: r, children: i, component: g } = e,
      { props: y, children: $, patchFlag: k } = t,
      V = g.emitsOptions;
    if (t.dirs || t.transition) return !0;
    if (n && k >= 0) {
      if (k & 1024) return !0;
      if (k & 16) return r ? hasPropsChanged(r, y, V) : !!y;
      if (k & 8) {
        const L = t.dynamicProps;
        for (let oe = 0; oe < L.length; oe++) {
          const j = L[oe];
          if (y[j] !== r[j] && !isEmitListener(V, j)) return !0;
        }
      }
    } else
      return (i || $) && (!$ || !$.$stable)
        ? !0
        : r === y
        ? !1
        : r
        ? y
          ? hasPropsChanged(r, y, V)
          : !0
        : !!y;
    return !1;
  }
  function hasPropsChanged(e, t, n) {
    const r = Object.keys(t);
    if (r.length !== Object.keys(e).length) return !0;
    for (let i = 0; i < r.length; i++) {
      const g = r[i];
      if (t[g] !== e[g] && !isEmitListener(n, g)) return !0;
    }
    return !1;
  }
  function updateHOCHostEl({ vnode: e, parent: t }, n) {
    for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
  }
  const isSuspense = (e) => e.__isSuspense;
  function queueEffectWithSuspense(e, t) {
    t && t.pendingBranch
      ? isArray$3(e)
        ? t.effects.push(...e)
        : t.effects.push(e)
      : queuePostFlushCb(e);
  }
  function provide(e, t) {
    if (currentInstance) {
      let n = currentInstance.provides;
      const r = currentInstance.parent && currentInstance.parent.provides;
      r === n && (n = currentInstance.provides = Object.create(r)), (n[e] = t);
    }
  }
  function inject(e, t, n = !1) {
    const r = currentInstance || currentRenderingInstance;
    if (r) {
      const i =
        r.parent == null
          ? r.vnode.appContext && r.vnode.appContext.provides
          : r.parent.provides;
      if (i && e in i) return i[e];
      if (arguments.length > 1)
        return n && isFunction$3(t) ? t.call(r.proxy) : t;
    }
  }
  function watchEffect(e, t) {
    return doWatch(e, null, t);
  }
  const INITIAL_WATCHER_VALUE = {};
  function watch(e, t, n) {
    return doWatch(e, t, n);
  }
  function doWatch(
    e,
    t,
    { immediate: n, deep: r, flush: i, onTrack: g, onTrigger: y } = EMPTY_OBJ
  ) {
    const $ = currentInstance;
    let k,
      V = !1,
      L = !1;
    if (
      (isRef(e)
        ? ((k = () => e.value), (V = isShallow(e)))
        : isReactive(e)
        ? ((k = () => e), (r = !0))
        : isArray$3(e)
        ? ((L = !0),
          (V = e.some((ue) => isReactive(ue) || isShallow(ue))),
          (k = () =>
            e.map((ue) => {
              if (isRef(ue)) return ue.value;
              if (isReactive(ue)) return traverse(ue);
              if (isFunction$3(ue)) return callWithErrorHandling(ue, $, 2);
            })))
        : isFunction$3(e)
        ? t
          ? (k = () => callWithErrorHandling(e, $, 2))
          : (k = () => {
              if (!($ && $.isUnmounted))
                return oe && oe(), callWithAsyncErrorHandling(e, $, 3, [j]);
            })
        : (k = NOOP),
      t && r)
    ) {
      const ue = k;
      k = () => traverse(ue());
    }
    let oe,
      j = (ue) => {
        oe = le.onStop = () => {
          callWithErrorHandling(ue, $, 4);
        };
      },
      ae;
    if (isInSSRComponentSetup)
      if (
        ((j = NOOP),
        t
          ? n && callWithAsyncErrorHandling(t, $, 3, [k(), L ? [] : void 0, j])
          : k(),
        i === "sync")
      ) {
        const ue = useSSRContext();
        ae = ue.__watcherHandles || (ue.__watcherHandles = []);
      } else return NOOP;
    let z = L
      ? new Array(e.length).fill(INITIAL_WATCHER_VALUE)
      : INITIAL_WATCHER_VALUE;
    const re = () => {
      if (le.active)
        if (t) {
          const ue = le.run();
          (r ||
            V ||
            (L
              ? ue.some((pe, Ce) => hasChanged(pe, z[Ce]))
              : hasChanged(ue, z))) &&
            (oe && oe(),
            callWithAsyncErrorHandling(t, $, 3, [
              ue,
              z === INITIAL_WATCHER_VALUE
                ? void 0
                : L && z[0] === INITIAL_WATCHER_VALUE
                ? []
                : z,
              j,
            ]),
            (z = ue));
        } else le.run();
    };
    re.allowRecurse = !!t;
    let ie;
    i === "sync"
      ? (ie = re)
      : i === "post"
      ? (ie = () => queuePostRenderEffect(re, $ && $.suspense))
      : ((re.pre = !0), $ && (re.id = $.uid), (ie = () => queueJob(re)));
    const le = new ReactiveEffect(k, ie);
    t
      ? n
        ? re()
        : (z = le.run())
      : i === "post"
      ? queuePostRenderEffect(le.run.bind(le), $ && $.suspense)
      : le.run();
    const de = () => {
      le.stop(), $ && $.scope && remove($.scope.effects, le);
    };
    return ae && ae.push(de), de;
  }
  function instanceWatch(e, t, n) {
    const r = this.proxy,
      i = isString$3(e)
        ? e.includes(".")
          ? createPathGetter(r, e)
          : () => r[e]
        : e.bind(r, r);
    let g;
    isFunction$3(t) ? (g = t) : ((g = t.handler), (n = t));
    const y = currentInstance;
    setCurrentInstance(this);
    const $ = doWatch(i, g.bind(r), n);
    return y ? setCurrentInstance(y) : unsetCurrentInstance(), $;
  }
  function createPathGetter(e, t) {
    const n = t.split(".");
    return () => {
      let r = e;
      for (let i = 0; i < n.length && r; i++) r = r[n[i]];
      return r;
    };
  }
  function traverse(e, t) {
    if (!isObject$3(e) || e.__v_skip || ((t = t || new Set()), t.has(e)))
      return e;
    if ((t.add(e), isRef(e))) traverse(e.value, t);
    else if (isArray$3(e)) for (let n = 0; n < e.length; n++) traverse(e[n], t);
    else if (isSet(e) || isMap(e))
      e.forEach((n) => {
        traverse(n, t);
      });
    else if (isPlainObject$1(e)) for (const n in e) traverse(e[n], t);
    return e;
  }
  function useTransitionState() {
    const e = {
      isMounted: !1,
      isLeaving: !1,
      isUnmounting: !1,
      leavingVNodes: new Map(),
    };
    return (
      onMounted(() => {
        e.isMounted = !0;
      }),
      onBeforeUnmount(() => {
        e.isUnmounting = !0;
      }),
      e
    );
  }
  const TransitionHookValidator = [Function, Array],
    BaseTransitionImpl = {
      name: "BaseTransition",
      props: {
        mode: String,
        appear: Boolean,
        persisted: Boolean,
        onBeforeEnter: TransitionHookValidator,
        onEnter: TransitionHookValidator,
        onAfterEnter: TransitionHookValidator,
        onEnterCancelled: TransitionHookValidator,
        onBeforeLeave: TransitionHookValidator,
        onLeave: TransitionHookValidator,
        onAfterLeave: TransitionHookValidator,
        onLeaveCancelled: TransitionHookValidator,
        onBeforeAppear: TransitionHookValidator,
        onAppear: TransitionHookValidator,
        onAfterAppear: TransitionHookValidator,
        onAppearCancelled: TransitionHookValidator,
      },
      setup(e, { slots: t }) {
        const n = getCurrentInstance(),
          r = useTransitionState();
        let i;
        return () => {
          const g = t.default && getTransitionRawChildren(t.default(), !0);
          if (!g || !g.length) return;
          let y = g[0];
          if (g.length > 1) {
            for (const re of g)
              if (re.type !== Comment) {
                y = re;
                break;
              }
          }
          const $ = toRaw(e),
            { mode: k } = $;
          if (r.isLeaving) return emptyPlaceholder(y);
          const V = getKeepAliveChild(y);
          if (!V) return emptyPlaceholder(y);
          const L = resolveTransitionHooks(V, $, r, n);
          setTransitionHooks(V, L);
          const oe = n.subTree,
            j = oe && getKeepAliveChild(oe);
          let ae = !1;
          const { getTransitionKey: z } = V.type;
          if (z) {
            const re = z();
            i === void 0 ? (i = re) : re !== i && ((i = re), (ae = !0));
          }
          if (j && j.type !== Comment && (!isSameVNodeType(V, j) || ae)) {
            const re = resolveTransitionHooks(j, $, r, n);
            if ((setTransitionHooks(j, re), k === "out-in"))
              return (
                (r.isLeaving = !0),
                (re.afterLeave = () => {
                  (r.isLeaving = !1), n.update.active !== !1 && n.update();
                }),
                emptyPlaceholder(y)
              );
            k === "in-out" &&
              V.type !== Comment &&
              (re.delayLeave = (ie, le, de) => {
                const ue = getLeavingNodesForType(r, j);
                (ue[String(j.key)] = j),
                  (ie._leaveCb = () => {
                    le(), (ie._leaveCb = void 0), delete L.delayedLeave;
                  }),
                  (L.delayedLeave = de);
              });
          }
          return y;
        };
      },
    },
    BaseTransition = BaseTransitionImpl;
  function getLeavingNodesForType(e, t) {
    const { leavingVNodes: n } = e;
    let r = n.get(t.type);
    return r || ((r = Object.create(null)), n.set(t.type, r)), r;
  }
  function resolveTransitionHooks(e, t, n, r) {
    const {
        appear: i,
        mode: g,
        persisted: y = !1,
        onBeforeEnter: $,
        onEnter: k,
        onAfterEnter: V,
        onEnterCancelled: L,
        onBeforeLeave: oe,
        onLeave: j,
        onAfterLeave: ae,
        onLeaveCancelled: z,
        onBeforeAppear: re,
        onAppear: ie,
        onAfterAppear: le,
        onAppearCancelled: de,
      } = t,
      ue = String(e.key),
      pe = getLeavingNodesForType(n, e),
      Ce = ($e, Ve) => {
        $e && callWithAsyncErrorHandling($e, r, 9, Ve);
      },
      Oe = ($e, Ve) => {
        const qe = Ve[1];
        Ce($e, Ve),
          isArray$3($e)
            ? $e.every((Cn) => Cn.length <= 1) && qe()
            : $e.length <= 1 && qe();
      },
      he = {
        mode: g,
        persisted: y,
        beforeEnter($e) {
          let Ve = $;
          if (!n.isMounted)
            if (i) Ve = re || $;
            else return;
          $e._leaveCb && $e._leaveCb(!0);
          const qe = pe[ue];
          qe && isSameVNodeType(e, qe) && qe.el._leaveCb && qe.el._leaveCb(),
            Ce(Ve, [$e]);
        },
        enter($e) {
          let Ve = k,
            qe = V,
            Cn = L;
          if (!n.isMounted)
            if (i) (Ve = ie || k), (qe = le || V), (Cn = de || L);
            else return;
          let Pt = !1;
          const kt = ($e._enterCb = (Fe) => {
            Pt ||
              ((Pt = !0),
              Fe ? Ce(Cn, [$e]) : Ce(qe, [$e]),
              he.delayedLeave && he.delayedLeave(),
              ($e._enterCb = void 0));
          });
          Ve ? Oe(Ve, [$e, kt]) : kt();
        },
        leave($e, Ve) {
          const qe = String(e.key);
          if (($e._enterCb && $e._enterCb(!0), n.isUnmounting)) return Ve();
          Ce(oe, [$e]);
          let Cn = !1;
          const Pt = ($e._leaveCb = (kt) => {
            Cn ||
              ((Cn = !0),
              Ve(),
              kt ? Ce(z, [$e]) : Ce(ae, [$e]),
              ($e._leaveCb = void 0),
              pe[qe] === e && delete pe[qe]);
          });
          (pe[qe] = e), j ? Oe(j, [$e, Pt]) : Pt();
        },
        clone($e) {
          return resolveTransitionHooks($e, t, n, r);
        },
      };
    return he;
  }
  function emptyPlaceholder(e) {
    if (isKeepAlive(e)) return (e = cloneVNode(e)), (e.children = null), e;
  }
  function getKeepAliveChild(e) {
    return isKeepAlive(e) ? (e.children ? e.children[0] : void 0) : e;
  }
  function setTransitionHooks(e, t) {
    e.shapeFlag & 6 && e.component
      ? setTransitionHooks(e.component.subTree, t)
      : e.shapeFlag & 128
      ? ((e.ssContent.transition = t.clone(e.ssContent)),
        (e.ssFallback.transition = t.clone(e.ssFallback)))
      : (e.transition = t);
  }
  function getTransitionRawChildren(e, t = !1, n) {
    let r = [],
      i = 0;
    for (let g = 0; g < e.length; g++) {
      let y = e[g];
      const $ =
        n == null ? y.key : String(n) + String(y.key != null ? y.key : g);
      y.type === Fragment
        ? (y.patchFlag & 128 && i++,
          (r = r.concat(getTransitionRawChildren(y.children, t, $))))
        : (t || y.type !== Comment) &&
          r.push($ != null ? cloneVNode(y, { key: $ }) : y);
    }
    if (i > 1) for (let g = 0; g < r.length; g++) r[g].patchFlag = -2;
    return r;
  }
  function defineComponent(e) {
    return isFunction$3(e) ? { setup: e, name: e.name } : e;
  }
  const isAsyncWrapper = (e) => !!e.type.__asyncLoader,
    isKeepAlive = (e) => e.type.__isKeepAlive;
  function onActivated(e, t) {
    registerKeepAliveHook(e, "a", t);
  }
  function onDeactivated(e, t) {
    registerKeepAliveHook(e, "da", t);
  }
  function registerKeepAliveHook(e, t, n = currentInstance) {
    const r =
      e.__wdc ||
      (e.__wdc = () => {
        let i = n;
        for (; i; ) {
          if (i.isDeactivated) return;
          i = i.parent;
        }
        return e();
      });
    if ((injectHook(t, r, n), n)) {
      let i = n.parent;
      for (; i && i.parent; )
        isKeepAlive(i.parent.vnode) && injectToKeepAliveRoot(r, t, n, i),
          (i = i.parent);
    }
  }
  function injectToKeepAliveRoot(e, t, n, r) {
    const i = injectHook(t, e, r, !0);
    onUnmounted(() => {
      remove(r[t], i);
    }, n);
  }
  function injectHook(e, t, n = currentInstance, r = !1) {
    if (n) {
      const i = n[e] || (n[e] = []),
        g =
          t.__weh ||
          (t.__weh = (...y) => {
            if (n.isUnmounted) return;
            pauseTracking(), setCurrentInstance(n);
            const $ = callWithAsyncErrorHandling(t, n, e, y);
            return unsetCurrentInstance(), resetTracking(), $;
          });
      return r ? i.unshift(g) : i.push(g), g;
    }
  }
  const createHook =
      (e) =>
      (t, n = currentInstance) =>
        (!isInSSRComponentSetup || e === "sp") &&
        injectHook(e, (...r) => t(...r), n),
    onBeforeMount = createHook("bm"),
    onMounted = createHook("m"),
    onBeforeUpdate = createHook("bu"),
    onUpdated = createHook("u"),
    onBeforeUnmount = createHook("bum"),
    onUnmounted = createHook("um"),
    onServerPrefetch = createHook("sp"),
    onRenderTriggered = createHook("rtg"),
    onRenderTracked = createHook("rtc");
  function onErrorCaptured(e, t = currentInstance) {
    injectHook("ec", e, t);
  }
  function withDirectives(e, t) {
    const n = currentRenderingInstance;
    if (n === null) return e;
    const r = getExposeProxy(n) || n.proxy,
      i = e.dirs || (e.dirs = []);
    for (let g = 0; g < t.length; g++) {
      let [y, $, k, V = EMPTY_OBJ] = t[g];
      y &&
        (isFunction$3(y) && (y = { mounted: y, updated: y }),
        y.deep && traverse($),
        i.push({
          dir: y,
          instance: r,
          value: $,
          oldValue: void 0,
          arg: k,
          modifiers: V,
        }));
    }
    return e;
  }
  function invokeDirectiveHook(e, t, n, r) {
    const i = e.dirs,
      g = t && t.dirs;
    for (let y = 0; y < i.length; y++) {
      const $ = i[y];
      g && ($.oldValue = g[y].value);
      let k = $.dir[r];
      k &&
        (pauseTracking(),
        callWithAsyncErrorHandling(k, n, 8, [e.el, $, e, t]),
        resetTracking());
    }
  }
  const COMPONENTS = "components",
    DIRECTIVES = "directives";
  function resolveComponent(e, t) {
    return resolveAsset(COMPONENTS, e, !0, t) || e;
  }
  const NULL_DYNAMIC_COMPONENT = Symbol();
  function resolveDynamicComponent(e) {
    return isString$3(e)
      ? resolveAsset(COMPONENTS, e, !1) || e
      : e || NULL_DYNAMIC_COMPONENT;
  }
  function resolveDirective(e) {
    return resolveAsset(DIRECTIVES, e);
  }
  function resolveAsset(e, t, n = !0, r = !1) {
    const i = currentRenderingInstance || currentInstance;
    if (i) {
      const g = i.type;
      if (e === COMPONENTS) {
        const $ = getComponentName(g, !1);
        if (
          $ &&
          ($ === t || $ === camelize(t) || $ === capitalize(camelize(t)))
        )
          return g;
      }
      const y = resolve(i[e] || g[e], t) || resolve(i.appContext[e], t);
      return !y && r ? g : y;
    }
  }
  function resolve(e, t) {
    return e && (e[t] || e[camelize(t)] || e[capitalize(camelize(t))]);
  }
  function renderList(e, t, n, r) {
    let i;
    const g = n && n[r];
    if (isArray$3(e) || isString$3(e)) {
      i = new Array(e.length);
      for (let y = 0, $ = e.length; y < $; y++)
        i[y] = t(e[y], y, void 0, g && g[y]);
    } else if (typeof e == "number") {
      i = new Array(e);
      for (let y = 0; y < e; y++) i[y] = t(y + 1, y, void 0, g && g[y]);
    } else if (isObject$3(e))
      if (e[Symbol.iterator])
        i = Array.from(e, (y, $) => t(y, $, void 0, g && g[$]));
      else {
        const y = Object.keys(e);
        i = new Array(y.length);
        for (let $ = 0, k = y.length; $ < k; $++) {
          const V = y[$];
          i[$] = t(e[V], V, $, g && g[$]);
        }
      }
    else i = [];
    return n && (n[r] = i), i;
  }
  function createSlots(e, t) {
    for (let n = 0; n < t.length; n++) {
      const r = t[n];
      if (isArray$3(r))
        for (let i = 0; i < r.length; i++) e[r[i].name] = r[i].fn;
      else
        r &&
          (e[r.name] = r.key
            ? (...i) => {
                const g = r.fn(...i);
                return g && (g.key = r.key), g;
              }
            : r.fn);
    }
    return e;
  }
  function renderSlot(e, t, n = {}, r, i) {
    if (
      currentRenderingInstance.isCE ||
      (currentRenderingInstance.parent &&
        isAsyncWrapper(currentRenderingInstance.parent) &&
        currentRenderingInstance.parent.isCE)
    )
      return t !== "default" && (n.name = t), createVNode("slot", n, r && r());
    let g = e[t];
    g && g._c && (g._d = !1), openBlock();
    const y = g && ensureValidVNode(g(n)),
      $ = createBlock(
        Fragment,
        { key: n.key || (y && y.key) || `_${t}` },
        y || (r ? r() : []),
        y && e._ === 1 ? 64 : -2
      );
    return (
      !i && $.scopeId && ($.slotScopeIds = [$.scopeId + "-s"]),
      g && g._c && (g._d = !0),
      $
    );
  }
  function ensureValidVNode(e) {
    return e.some((t) =>
      isVNode(t)
        ? !(
            t.type === Comment ||
            (t.type === Fragment && !ensureValidVNode(t.children))
          )
        : !0
    )
      ? e
      : null;
  }
  function toHandlers(e, t) {
    const n = {};
    for (const r in e)
      n[t && /[A-Z]/.test(r) ? `on:${r}` : toHandlerKey(r)] = e[r];
    return n;
  }
  const getPublicInstance = (e) =>
      e
        ? isStatefulComponent(e)
          ? getExposeProxy(e) || e.proxy
          : getPublicInstance(e.parent)
        : null,
    publicPropertiesMap = extend$1(Object.create(null), {
      $: (e) => e,
      $el: (e) => e.vnode.el,
      $data: (e) => e.data,
      $props: (e) => e.props,
      $attrs: (e) => e.attrs,
      $slots: (e) => e.slots,
      $refs: (e) => e.refs,
      $parent: (e) => getPublicInstance(e.parent),
      $root: (e) => getPublicInstance(e.root),
      $emit: (e) => e.emit,
      $options: (e) => resolveMergedOptions(e),
      $forceUpdate: (e) => e.f || (e.f = () => queueJob(e.update)),
      $nextTick: (e) => e.n || (e.n = nextTick.bind(e.proxy)),
      $watch: (e) => instanceWatch.bind(e),
    }),
    hasSetupBinding = (e, t) =>
      e !== EMPTY_OBJ && !e.__isScriptSetup && hasOwn(e, t),
    PublicInstanceProxyHandlers = {
      get({ _: e }, t) {
        const {
          ctx: n,
          setupState: r,
          data: i,
          props: g,
          accessCache: y,
          type: $,
          appContext: k,
        } = e;
        let V;
        if (t[0] !== "$") {
          const ae = y[t];
          if (ae !== void 0)
            switch (ae) {
              case 1:
                return r[t];
              case 2:
                return i[t];
              case 4:
                return n[t];
              case 3:
                return g[t];
            }
          else {
            if (hasSetupBinding(r, t)) return (y[t] = 1), r[t];
            if (i !== EMPTY_OBJ && hasOwn(i, t)) return (y[t] = 2), i[t];
            if ((V = e.propsOptions[0]) && hasOwn(V, t))
              return (y[t] = 3), g[t];
            if (n !== EMPTY_OBJ && hasOwn(n, t)) return (y[t] = 4), n[t];
            shouldCacheAccess && (y[t] = 0);
          }
        }
        const L = publicPropertiesMap[t];
        let oe, j;
        if (L) return t === "$attrs" && track(e, "get", t), L(e);
        if ((oe = $.__cssModules) && (oe = oe[t])) return oe;
        if (n !== EMPTY_OBJ && hasOwn(n, t)) return (y[t] = 4), n[t];
        if (((j = k.config.globalProperties), hasOwn(j, t))) return j[t];
      },
      set({ _: e }, t, n) {
        const { data: r, setupState: i, ctx: g } = e;
        return hasSetupBinding(i, t)
          ? ((i[t] = n), !0)
          : r !== EMPTY_OBJ && hasOwn(r, t)
          ? ((r[t] = n), !0)
          : hasOwn(e.props, t) || (t[0] === "$" && t.slice(1) in e)
          ? !1
          : ((g[t] = n), !0);
      },
      has(
        {
          _: {
            data: e,
            setupState: t,
            accessCache: n,
            ctx: r,
            appContext: i,
            propsOptions: g,
          },
        },
        y
      ) {
        let $;
        return (
          !!n[y] ||
          (e !== EMPTY_OBJ && hasOwn(e, y)) ||
          hasSetupBinding(t, y) ||
          (($ = g[0]) && hasOwn($, y)) ||
          hasOwn(r, y) ||
          hasOwn(publicPropertiesMap, y) ||
          hasOwn(i.config.globalProperties, y)
        );
      },
      defineProperty(e, t, n) {
        return (
          n.get != null
            ? (e._.accessCache[t] = 0)
            : hasOwn(n, "value") && this.set(e, t, n.value, null),
          Reflect.defineProperty(e, t, n)
        );
      },
    };
  let shouldCacheAccess = !0;
  function applyOptions(e) {
    const t = resolveMergedOptions(e),
      n = e.proxy,
      r = e.ctx;
    (shouldCacheAccess = !1),
      t.beforeCreate && callHook$1(t.beforeCreate, e, "bc");
    const {
      data: i,
      computed: g,
      methods: y,
      watch: $,
      provide: k,
      inject: V,
      created: L,
      beforeMount: oe,
      mounted: j,
      beforeUpdate: ae,
      updated: z,
      activated: re,
      deactivated: ie,
      beforeDestroy: le,
      beforeUnmount: de,
      destroyed: ue,
      unmounted: pe,
      render: Ce,
      renderTracked: Oe,
      renderTriggered: he,
      errorCaptured: $e,
      serverPrefetch: Ve,
      expose: qe,
      inheritAttrs: Cn,
      components: Pt,
      directives: kt,
      filters: Fe,
    } = t;
    if (
      (V &&
        resolveInjections(V, r, null, e.appContext.config.unwrapInjectedRef),
      y)
    )
      for (const At in y) {
        const Ue = y[At];
        isFunction$3(Ue) && (r[At] = Ue.bind(n));
      }
    if (i) {
      const At = i.call(n, n);
      isObject$3(At) && (e.data = reactive(At));
    }
    if (((shouldCacheAccess = !0), g))
      for (const At in g) {
        const Ue = g[At],
          ze = isFunction$3(Ue)
            ? Ue.bind(n, n)
            : isFunction$3(Ue.get)
            ? Ue.get.bind(n, n)
            : NOOP,
          Tn =
            !isFunction$3(Ue) && isFunction$3(Ue.set) ? Ue.set.bind(n) : NOOP,
          Nn = computed({ get: ze, set: Tn });
        Object.defineProperty(r, At, {
          enumerable: !0,
          configurable: !0,
          get: () => Nn.value,
          set: (xn) => (Nn.value = xn),
        });
      }
    if ($) for (const At in $) createWatcher($[At], r, n, At);
    if (k) {
      const At = isFunction$3(k) ? k.call(n) : k;
      Reflect.ownKeys(At).forEach((Ue) => {
        provide(Ue, At[Ue]);
      });
    }
    L && callHook$1(L, e, "c");
    function Lt(At, Ue) {
      isArray$3(Ue) ? Ue.forEach((ze) => At(ze.bind(n))) : Ue && At(Ue.bind(n));
    }
    if (
      (Lt(onBeforeMount, oe),
      Lt(onMounted, j),
      Lt(onBeforeUpdate, ae),
      Lt(onUpdated, z),
      Lt(onActivated, re),
      Lt(onDeactivated, ie),
      Lt(onErrorCaptured, $e),
      Lt(onRenderTracked, Oe),
      Lt(onRenderTriggered, he),
      Lt(onBeforeUnmount, de),
      Lt(onUnmounted, pe),
      Lt(onServerPrefetch, Ve),
      isArray$3(qe))
    )
      if (qe.length) {
        const At = e.exposed || (e.exposed = {});
        qe.forEach((Ue) => {
          Object.defineProperty(At, Ue, {
            get: () => n[Ue],
            set: (ze) => (n[Ue] = ze),
          });
        });
      } else e.exposed || (e.exposed = {});
    Ce && e.render === NOOP && (e.render = Ce),
      Cn != null && (e.inheritAttrs = Cn),
      Pt && (e.components = Pt),
      kt && (e.directives = kt);
  }
  function resolveInjections(e, t, n = NOOP, r = !1) {
    isArray$3(e) && (e = normalizeInject(e));
    for (const i in e) {
      const g = e[i];
      let y;
      isObject$3(g)
        ? "default" in g
          ? (y = inject(g.from || i, g.default, !0))
          : (y = inject(g.from || i))
        : (y = inject(g)),
        isRef(y) && r
          ? Object.defineProperty(t, i, {
              enumerable: !0,
              configurable: !0,
              get: () => y.value,
              set: ($) => (y.value = $),
            })
          : (t[i] = y);
    }
  }
  function callHook$1(e, t, n) {
    callWithAsyncErrorHandling(
      isArray$3(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy),
      t,
      n
    );
  }
  function createWatcher(e, t, n, r) {
    const i = r.includes(".") ? createPathGetter(n, r) : () => n[r];
    if (isString$3(e)) {
      const g = t[e];
      isFunction$3(g) && watch(i, g);
    } else if (isFunction$3(e)) watch(i, e.bind(n));
    else if (isObject$3(e))
      if (isArray$3(e)) e.forEach((g) => createWatcher(g, t, n, r));
      else {
        const g = isFunction$3(e.handler) ? e.handler.bind(n) : t[e.handler];
        isFunction$3(g) && watch(i, g, e);
      }
  }
  function resolveMergedOptions(e) {
    const t = e.type,
      { mixins: n, extends: r } = t,
      {
        mixins: i,
        optionsCache: g,
        config: { optionMergeStrategies: y },
      } = e.appContext,
      $ = g.get(t);
    let k;
    return (
      $
        ? (k = $)
        : !i.length && !n && !r
        ? (k = t)
        : ((k = {}),
          i.length && i.forEach((V) => mergeOptions$1(k, V, y, !0)),
          mergeOptions$1(k, t, y)),
      isObject$3(t) && g.set(t, k),
      k
    );
  }
  function mergeOptions$1(e, t, n, r = !1) {
    const { mixins: i, extends: g } = t;
    g && mergeOptions$1(e, g, n, !0),
      i && i.forEach((y) => mergeOptions$1(e, y, n, !0));
    for (const y in t)
      if (!(r && y === "expose")) {
        const $ = internalOptionMergeStrats[y] || (n && n[y]);
        e[y] = $ ? $(e[y], t[y]) : t[y];
      }
    return e;
  }
  const internalOptionMergeStrats = {
    data: mergeDataFn,
    props: mergeObjectOptions,
    emits: mergeObjectOptions,
    methods: mergeObjectOptions,
    computed: mergeObjectOptions,
    beforeCreate: mergeAsArray,
    created: mergeAsArray,
    beforeMount: mergeAsArray,
    mounted: mergeAsArray,
    beforeUpdate: mergeAsArray,
    updated: mergeAsArray,
    beforeDestroy: mergeAsArray,
    beforeUnmount: mergeAsArray,
    destroyed: mergeAsArray,
    unmounted: mergeAsArray,
    activated: mergeAsArray,
    deactivated: mergeAsArray,
    errorCaptured: mergeAsArray,
    serverPrefetch: mergeAsArray,
    components: mergeObjectOptions,
    directives: mergeObjectOptions,
    watch: mergeWatchOptions,
    provide: mergeDataFn,
    inject: mergeInject,
  };
  function mergeDataFn(e, t) {
    return t
      ? e
        ? function () {
            return extend$1(
              isFunction$3(e) ? e.call(this, this) : e,
              isFunction$3(t) ? t.call(this, this) : t
            );
          }
        : t
      : e;
  }
  function mergeInject(e, t) {
    return mergeObjectOptions(normalizeInject(e), normalizeInject(t));
  }
  function normalizeInject(e) {
    if (isArray$3(e)) {
      const t = {};
      for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
      return t;
    }
    return e;
  }
  function mergeAsArray(e, t) {
    return e ? [...new Set([].concat(e, t))] : t;
  }
  function mergeObjectOptions(e, t) {
    return e ? extend$1(extend$1(Object.create(null), e), t) : t;
  }
  function mergeWatchOptions(e, t) {
    if (!e) return t;
    if (!t) return e;
    const n = extend$1(Object.create(null), e);
    for (const r in t) n[r] = mergeAsArray(e[r], t[r]);
    return n;
  }
  function initProps(e, t, n, r = !1) {
    const i = {},
      g = {};
    def(g, InternalObjectKey, 1),
      (e.propsDefaults = Object.create(null)),
      setFullProps(e, t, i, g);
    for (const y in e.propsOptions[0]) y in i || (i[y] = void 0);
    n
      ? (e.props = r ? i : shallowReactive(i))
      : e.type.props
      ? (e.props = i)
      : (e.props = g),
      (e.attrs = g);
  }
  function updateProps(e, t, n, r) {
    const {
        props: i,
        attrs: g,
        vnode: { patchFlag: y },
      } = e,
      $ = toRaw(i),
      [k] = e.propsOptions;
    let V = !1;
    if ((r || y > 0) && !(y & 16)) {
      if (y & 8) {
        const L = e.vnode.dynamicProps;
        for (let oe = 0; oe < L.length; oe++) {
          let j = L[oe];
          if (isEmitListener(e.emitsOptions, j)) continue;
          const ae = t[j];
          if (k)
            if (hasOwn(g, j)) ae !== g[j] && ((g[j] = ae), (V = !0));
            else {
              const z = camelize(j);
              i[z] = resolvePropValue(k, $, z, ae, e, !1);
            }
          else ae !== g[j] && ((g[j] = ae), (V = !0));
        }
      }
    } else {
      setFullProps(e, t, i, g) && (V = !0);
      let L;
      for (const oe in $)
        (!t ||
          (!hasOwn(t, oe) && ((L = hyphenate(oe)) === oe || !hasOwn(t, L)))) &&
          (k
            ? n &&
              (n[oe] !== void 0 || n[L] !== void 0) &&
              (i[oe] = resolvePropValue(k, $, oe, void 0, e, !0))
            : delete i[oe]);
      if (g !== $)
        for (const oe in g) (!t || !hasOwn(t, oe)) && (delete g[oe], (V = !0));
    }
    V && trigger(e, "set", "$attrs");
  }
  function setFullProps(e, t, n, r) {
    const [i, g] = e.propsOptions;
    let y = !1,
      $;
    if (t)
      for (let k in t) {
        if (isReservedProp(k)) continue;
        const V = t[k];
        let L;
        i && hasOwn(i, (L = camelize(k)))
          ? !g || !g.includes(L)
            ? (n[L] = V)
            : (($ || ($ = {}))[L] = V)
          : isEmitListener(e.emitsOptions, k) ||
            ((!(k in r) || V !== r[k]) && ((r[k] = V), (y = !0)));
      }
    if (g) {
      const k = toRaw(n),
        V = $ || EMPTY_OBJ;
      for (let L = 0; L < g.length; L++) {
        const oe = g[L];
        n[oe] = resolvePropValue(i, k, oe, V[oe], e, !hasOwn(V, oe));
      }
    }
    return y;
  }
  function resolvePropValue(e, t, n, r, i, g) {
    const y = e[n];
    if (y != null) {
      const $ = hasOwn(y, "default");
      if ($ && r === void 0) {
        const k = y.default;
        if (y.type !== Function && isFunction$3(k)) {
          const { propsDefaults: V } = i;
          n in V
            ? (r = V[n])
            : (setCurrentInstance(i),
              (r = V[n] = k.call(null, t)),
              unsetCurrentInstance());
        } else r = k;
      }
      y[0] &&
        (g && !$
          ? (r = !1)
          : y[1] && (r === "" || r === hyphenate(n)) && (r = !0));
    }
    return r;
  }
  function normalizePropsOptions(e, t, n = !1) {
    const r = t.propsCache,
      i = r.get(e);
    if (i) return i;
    const g = e.props,
      y = {},
      $ = [];
    let k = !1;
    if (!isFunction$3(e)) {
      const L = (oe) => {
        k = !0;
        const [j, ae] = normalizePropsOptions(oe, t, !0);
        extend$1(y, j), ae && $.push(...ae);
      };
      !n && t.mixins.length && t.mixins.forEach(L),
        e.extends && L(e.extends),
        e.mixins && e.mixins.forEach(L);
    }
    if (!g && !k) return isObject$3(e) && r.set(e, EMPTY_ARR), EMPTY_ARR;
    if (isArray$3(g))
      for (let L = 0; L < g.length; L++) {
        const oe = camelize(g[L]);
        validatePropName(oe) && (y[oe] = EMPTY_OBJ);
      }
    else if (g)
      for (const L in g) {
        const oe = camelize(L);
        if (validatePropName(oe)) {
          const j = g[L],
            ae = (y[oe] =
              isArray$3(j) || isFunction$3(j)
                ? { type: j }
                : Object.assign({}, j));
          if (ae) {
            const z = getTypeIndex(Boolean, ae.type),
              re = getTypeIndex(String, ae.type);
            (ae[0] = z > -1),
              (ae[1] = re < 0 || z < re),
              (z > -1 || hasOwn(ae, "default")) && $.push(oe);
          }
        }
      }
    const V = [y, $];
    return isObject$3(e) && r.set(e, V), V;
  }
  function validatePropName(e) {
    return e[0] !== "$";
  }
  function getType(e) {
    const t = e && e.toString().match(/^\s*function (\w+)/);
    return t ? t[1] : e === null ? "null" : "";
  }
  function isSameType(e, t) {
    return getType(e) === getType(t);
  }
  function getTypeIndex(e, t) {
    return isArray$3(t)
      ? t.findIndex((n) => isSameType(n, e))
      : isFunction$3(t) && isSameType(t, e)
      ? 0
      : -1;
  }
  const isInternalKey = (e) => e[0] === "_" || e === "$stable",
    normalizeSlotValue = (e) =>
      isArray$3(e) ? e.map(normalizeVNode) : [normalizeVNode(e)],
    normalizeSlot = (e, t, n) => {
      if (t._n) return t;
      const r = withCtx((...i) => normalizeSlotValue(t(...i)), n);
      return (r._c = !1), r;
    },
    normalizeObjectSlots = (e, t, n) => {
      const r = e._ctx;
      for (const i in e) {
        if (isInternalKey(i)) continue;
        const g = e[i];
        if (isFunction$3(g)) t[i] = normalizeSlot(i, g, r);
        else if (g != null) {
          const y = normalizeSlotValue(g);
          t[i] = () => y;
        }
      }
    },
    normalizeVNodeSlots = (e, t) => {
      const n = normalizeSlotValue(t);
      e.slots.default = () => n;
    },
    initSlots = (e, t) => {
      if (e.vnode.shapeFlag & 32) {
        const n = t._;
        n
          ? ((e.slots = toRaw(t)), def(t, "_", n))
          : normalizeObjectSlots(t, (e.slots = {}));
      } else (e.slots = {}), t && normalizeVNodeSlots(e, t);
      def(e.slots, InternalObjectKey, 1);
    },
    updateSlots = (e, t, n) => {
      const { vnode: r, slots: i } = e;
      let g = !0,
        y = EMPTY_OBJ;
      if (r.shapeFlag & 32) {
        const $ = t._;
        $
          ? n && $ === 1
            ? (g = !1)
            : (extend$1(i, t), !n && $ === 1 && delete i._)
          : ((g = !t.$stable), normalizeObjectSlots(t, i)),
          (y = t);
      } else t && (normalizeVNodeSlots(e, t), (y = { default: 1 }));
      if (g) for (const $ in i) !isInternalKey($) && !($ in y) && delete i[$];
    };
  function createAppContext() {
    return {
      app: null,
      config: {
        isNativeTag: NO,
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
  let uid = 0;
  function createAppAPI(e, t) {
    return function (r, i = null) {
      isFunction$3(r) || (r = Object.assign({}, r)),
        i != null && !isObject$3(i) && (i = null);
      const g = createAppContext(),
        y = new Set();
      let $ = !1;
      const k = (g.app = {
        _uid: uid++,
        _component: r,
        _props: i,
        _container: null,
        _context: g,
        _instance: null,
        version,
        get config() {
          return g.config;
        },
        set config(V) {},
        use(V, ...L) {
          return (
            y.has(V) ||
              (V && isFunction$3(V.install)
                ? (y.add(V), V.install(k, ...L))
                : isFunction$3(V) && (y.add(V), V(k, ...L))),
            k
          );
        },
        mixin(V) {
          return g.mixins.includes(V) || g.mixins.push(V), k;
        },
        component(V, L) {
          return L ? ((g.components[V] = L), k) : g.components[V];
        },
        directive(V, L) {
          return L ? ((g.directives[V] = L), k) : g.directives[V];
        },
        mount(V, L, oe) {
          if (!$) {
            const j = createVNode(r, i);
            return (
              (j.appContext = g),
              L && t ? t(j, V) : e(j, V, oe),
              ($ = !0),
              (k._container = V),
              (V.__vue_app__ = k),
              getExposeProxy(j.component) || j.component.proxy
            );
          }
        },
        unmount() {
          $ && (e(null, k._container), delete k._container.__vue_app__);
        },
        provide(V, L) {
          return (g.provides[V] = L), k;
        },
      });
      return k;
    };
  }
  function setRef(e, t, n, r, i = !1) {
    if (isArray$3(e)) {
      e.forEach((j, ae) => setRef(j, t && (isArray$3(t) ? t[ae] : t), n, r, i));
      return;
    }
    if (isAsyncWrapper(r) && !i) return;
    const g =
        r.shapeFlag & 4
          ? getExposeProxy(r.component) || r.component.proxy
          : r.el,
      y = i ? null : g,
      { i: $, r: k } = e,
      V = t && t.r,
      L = $.refs === EMPTY_OBJ ? ($.refs = {}) : $.refs,
      oe = $.setupState;
    if (
      (V != null &&
        V !== k &&
        (isString$3(V)
          ? ((L[V] = null), hasOwn(oe, V) && (oe[V] = null))
          : isRef(V) && (V.value = null)),
      isFunction$3(k))
    )
      callWithErrorHandling(k, $, 12, [y, L]);
    else {
      const j = isString$3(k),
        ae = isRef(k);
      if (j || ae) {
        const z = () => {
          if (e.f) {
            const re = j ? (hasOwn(oe, k) ? oe[k] : L[k]) : k.value;
            i
              ? isArray$3(re) && remove(re, g)
              : isArray$3(re)
              ? re.includes(g) || re.push(g)
              : j
              ? ((L[k] = [g]), hasOwn(oe, k) && (oe[k] = L[k]))
              : ((k.value = [g]), e.k && (L[e.k] = k.value));
          } else
            j
              ? ((L[k] = y), hasOwn(oe, k) && (oe[k] = y))
              : ae && ((k.value = y), e.k && (L[e.k] = y));
        };
        y ? ((z.id = -1), queuePostRenderEffect(z, n)) : z();
      }
    }
  }
  const queuePostRenderEffect = queueEffectWithSuspense;
  function createRenderer(e) {
    return baseCreateRenderer(e);
  }
  function baseCreateRenderer(e, t) {
    const n = getGlobalThis();
    n.__VUE__ = !0;
    const {
        insert: r,
        remove: i,
        patchProp: g,
        createElement: y,
        createText: $,
        createComment: k,
        setText: V,
        setElementText: L,
        parentNode: oe,
        nextSibling: j,
        setScopeId: ae = NOOP,
        insertStaticContent: z,
      } = e,
      re = (
        _e,
        Ne,
        Dt,
        vn = null,
        hn = null,
        Sn = null,
        On = !1,
        _n = null,
        wn = !!Ne.dynamicChildren
      ) => {
        if (_e === Ne) return;
        _e &&
          !isSameVNodeType(_e, Ne) &&
          ((vn = jn(_e)), xn(_e, hn, Sn, !0), (_e = null)),
          Ne.patchFlag === -2 && ((wn = !1), (Ne.dynamicChildren = null));
        const { type: bn, ref: Et, shapeFlag: En } = Ne;
        switch (bn) {
          case Text:
            ie(_e, Ne, Dt, vn);
            break;
          case Comment:
            le(_e, Ne, Dt, vn);
            break;
          case Static:
            _e == null && de(Ne, Dt, vn, On);
            break;
          case Fragment:
            Pt(_e, Ne, Dt, vn, hn, Sn, On, _n, wn);
            break;
          default:
            En & 1
              ? Ce(_e, Ne, Dt, vn, hn, Sn, On, _n, wn)
              : En & 6
              ? kt(_e, Ne, Dt, vn, hn, Sn, On, _n, wn)
              : (En & 64 || En & 128) &&
                bn.process(_e, Ne, Dt, vn, hn, Sn, On, _n, wn, Hn);
        }
        Et != null && hn && setRef(Et, _e && _e.ref, Sn, Ne || _e, !Ne);
      },
      ie = (_e, Ne, Dt, vn) => {
        if (_e == null) r((Ne.el = $(Ne.children)), Dt, vn);
        else {
          const hn = (Ne.el = _e.el);
          Ne.children !== _e.children && V(hn, Ne.children);
        }
      },
      le = (_e, Ne, Dt, vn) => {
        _e == null
          ? r((Ne.el = k(Ne.children || "")), Dt, vn)
          : (Ne.el = _e.el);
      },
      de = (_e, Ne, Dt, vn) => {
        [_e.el, _e.anchor] = z(_e.children, Ne, Dt, vn, _e.el, _e.anchor);
      },
      ue = ({ el: _e, anchor: Ne }, Dt, vn) => {
        let hn;
        for (; _e && _e !== Ne; ) (hn = j(_e)), r(_e, Dt, vn), (_e = hn);
        r(Ne, Dt, vn);
      },
      pe = ({ el: _e, anchor: Ne }) => {
        let Dt;
        for (; _e && _e !== Ne; ) (Dt = j(_e)), i(_e), (_e = Dt);
        i(Ne);
      },
      Ce = (_e, Ne, Dt, vn, hn, Sn, On, _n, wn) => {
        (On = On || Ne.type === "svg"),
          _e == null
            ? Oe(Ne, Dt, vn, hn, Sn, On, _n, wn)
            : Ve(_e, Ne, hn, Sn, On, _n, wn);
      },
      Oe = (_e, Ne, Dt, vn, hn, Sn, On, _n) => {
        let wn, bn;
        const {
          type: Et,
          props: En,
          shapeFlag: kn,
          transition: In,
          dirs: Dn,
        } = _e;
        if (
          ((wn = _e.el = y(_e.type, Sn, En && En.is, En)),
          kn & 8
            ? L(wn, _e.children)
            : kn & 16 &&
              $e(
                _e.children,
                wn,
                null,
                vn,
                hn,
                Sn && Et !== "foreignObject",
                On,
                _n
              ),
          Dn && invokeDirectiveHook(_e, null, vn, "created"),
          En)
        ) {
          for (const Un in En)
            Un !== "value" &&
              !isReservedProp(Un) &&
              g(wn, Un, null, En[Un], Sn, _e.children, vn, hn, Ln);
          "value" in En && g(wn, "value", null, En.value),
            (bn = En.onVnodeBeforeMount) && invokeVNodeHook(bn, vn, _e);
        }
        he(wn, _e, _e.scopeId, On, vn),
          Dn && invokeDirectiveHook(_e, null, vn, "beforeMount");
        const Kn = (!hn || (hn && !hn.pendingBranch)) && In && !In.persisted;
        Kn && In.beforeEnter(wn),
          r(wn, Ne, Dt),
          ((bn = En && En.onVnodeMounted) || Kn || Dn) &&
            queuePostRenderEffect(() => {
              bn && invokeVNodeHook(bn, vn, _e),
                Kn && In.enter(wn),
                Dn && invokeDirectiveHook(_e, null, vn, "mounted");
            }, hn);
      },
      he = (_e, Ne, Dt, vn, hn) => {
        if ((Dt && ae(_e, Dt), vn))
          for (let Sn = 0; Sn < vn.length; Sn++) ae(_e, vn[Sn]);
        if (hn) {
          let Sn = hn.subTree;
          if (Ne === Sn) {
            const On = hn.vnode;
            he(_e, On, On.scopeId, On.slotScopeIds, hn.parent);
          }
        }
      },
      $e = (_e, Ne, Dt, vn, hn, Sn, On, _n, wn = 0) => {
        for (let bn = wn; bn < _e.length; bn++) {
          const Et = (_e[bn] = _n
            ? cloneIfMounted(_e[bn])
            : normalizeVNode(_e[bn]));
          re(null, Et, Ne, Dt, vn, hn, Sn, On, _n);
        }
      },
      Ve = (_e, Ne, Dt, vn, hn, Sn, On) => {
        const _n = (Ne.el = _e.el);
        let { patchFlag: wn, dynamicChildren: bn, dirs: Et } = Ne;
        wn |= _e.patchFlag & 16;
        const En = _e.props || EMPTY_OBJ,
          kn = Ne.props || EMPTY_OBJ;
        let In;
        Dt && toggleRecurse(Dt, !1),
          (In = kn.onVnodeBeforeUpdate) && invokeVNodeHook(In, Dt, Ne, _e),
          Et && invokeDirectiveHook(Ne, _e, Dt, "beforeUpdate"),
          Dt && toggleRecurse(Dt, !0);
        const Dn = hn && Ne.type !== "foreignObject";
        if (
          (bn
            ? qe(_e.dynamicChildren, bn, _n, Dt, vn, Dn, Sn)
            : On || Ue(_e, Ne, _n, null, Dt, vn, Dn, Sn, !1),
          wn > 0)
        ) {
          if (wn & 16) Cn(_n, Ne, En, kn, Dt, vn, hn);
          else if (
            (wn & 2 &&
              En.class !== kn.class &&
              g(_n, "class", null, kn.class, hn),
            wn & 4 && g(_n, "style", En.style, kn.style, hn),
            wn & 8)
          ) {
            const Kn = Ne.dynamicProps;
            for (let Un = 0; Un < Kn.length; Un++) {
              const $n = Kn[Un],
                An = En[$n],
                Vn = kn[$n];
              (Vn !== An || $n === "value") &&
                g(_n, $n, An, Vn, hn, _e.children, Dt, vn, Ln);
            }
          }
          wn & 1 && _e.children !== Ne.children && L(_n, Ne.children);
        } else !On && bn == null && Cn(_n, Ne, En, kn, Dt, vn, hn);
        ((In = kn.onVnodeUpdated) || Et) &&
          queuePostRenderEffect(() => {
            In && invokeVNodeHook(In, Dt, Ne, _e),
              Et && invokeDirectiveHook(Ne, _e, Dt, "updated");
          }, vn);
      },
      qe = (_e, Ne, Dt, vn, hn, Sn, On) => {
        for (let _n = 0; _n < Ne.length; _n++) {
          const wn = _e[_n],
            bn = Ne[_n],
            Et =
              wn.el &&
              (wn.type === Fragment ||
                !isSameVNodeType(wn, bn) ||
                wn.shapeFlag & 70)
                ? oe(wn.el)
                : Dt;
          re(wn, bn, Et, null, vn, hn, Sn, On, !0);
        }
      },
      Cn = (_e, Ne, Dt, vn, hn, Sn, On) => {
        if (Dt !== vn) {
          if (Dt !== EMPTY_OBJ)
            for (const _n in Dt)
              !isReservedProp(_n) &&
                !(_n in vn) &&
                g(_e, _n, Dt[_n], null, On, Ne.children, hn, Sn, Ln);
          for (const _n in vn) {
            if (isReservedProp(_n)) continue;
            const wn = vn[_n],
              bn = Dt[_n];
            wn !== bn &&
              _n !== "value" &&
              g(_e, _n, bn, wn, On, Ne.children, hn, Sn, Ln);
          }
          "value" in vn && g(_e, "value", Dt.value, vn.value);
        }
      },
      Pt = (_e, Ne, Dt, vn, hn, Sn, On, _n, wn) => {
        const bn = (Ne.el = _e ? _e.el : $("")),
          Et = (Ne.anchor = _e ? _e.anchor : $(""));
        let { patchFlag: En, dynamicChildren: kn, slotScopeIds: In } = Ne;
        In && (_n = _n ? _n.concat(In) : In),
          _e == null
            ? (r(bn, Dt, vn),
              r(Et, Dt, vn),
              $e(Ne.children, Dt, Et, hn, Sn, On, _n, wn))
            : En > 0 && En & 64 && kn && _e.dynamicChildren
            ? (qe(_e.dynamicChildren, kn, Dt, hn, Sn, On, _n),
              (Ne.key != null || (hn && Ne === hn.subTree)) &&
                traverseStaticChildren(_e, Ne, !0))
            : Ue(_e, Ne, Dt, Et, hn, Sn, On, _n, wn);
      },
      kt = (_e, Ne, Dt, vn, hn, Sn, On, _n, wn) => {
        (Ne.slotScopeIds = _n),
          _e == null
            ? Ne.shapeFlag & 512
              ? hn.ctx.activate(Ne, Dt, vn, On, wn)
              : Fe(Ne, Dt, vn, hn, Sn, On, wn)
            : xe(_e, Ne, wn);
      },
      Fe = (_e, Ne, Dt, vn, hn, Sn, On) => {
        const _n = (_e.component = createComponentInstance(_e, vn, hn));
        if (
          (isKeepAlive(_e) && (_n.ctx.renderer = Hn),
          setupComponent(_n),
          _n.asyncDep)
        ) {
          if ((hn && hn.registerDep(_n, Lt), !_e.el)) {
            const wn = (_n.subTree = createVNode(Comment));
            le(null, wn, Ne, Dt);
          }
          return;
        }
        Lt(_n, _e, Ne, Dt, hn, Sn, On);
      },
      xe = (_e, Ne, Dt) => {
        const vn = (Ne.component = _e.component);
        if (shouldUpdateComponent(_e, Ne, Dt))
          if (vn.asyncDep && !vn.asyncResolved) {
            At(vn, Ne, Dt);
            return;
          } else (vn.next = Ne), invalidateJob(vn.update), vn.update();
        else (Ne.el = _e.el), (vn.vnode = Ne);
      },
      Lt = (_e, Ne, Dt, vn, hn, Sn, On) => {
        const _n = () => {
            if (_e.isMounted) {
              let { next: Et, bu: En, u: kn, parent: In, vnode: Dn } = _e,
                Kn = Et,
                Un;
              toggleRecurse(_e, !1),
                Et ? ((Et.el = Dn.el), At(_e, Et, On)) : (Et = Dn),
                En && invokeArrayFns(En),
                (Un = Et.props && Et.props.onVnodeBeforeUpdate) &&
                  invokeVNodeHook(Un, In, Et, Dn),
                toggleRecurse(_e, !0);
              const $n = renderComponentRoot(_e),
                An = _e.subTree;
              (_e.subTree = $n),
                re(An, $n, oe(An.el), jn(An), _e, hn, Sn),
                (Et.el = $n.el),
                Kn === null && updateHOCHostEl(_e, $n.el),
                kn && queuePostRenderEffect(kn, hn),
                (Un = Et.props && Et.props.onVnodeUpdated) &&
                  queuePostRenderEffect(
                    () => invokeVNodeHook(Un, In, Et, Dn),
                    hn
                  );
            } else {
              let Et;
              const { el: En, props: kn } = Ne,
                { bm: In, m: Dn, parent: Kn } = _e,
                Un = isAsyncWrapper(Ne);
              if (
                (toggleRecurse(_e, !1),
                In && invokeArrayFns(In),
                !Un &&
                  (Et = kn && kn.onVnodeBeforeMount) &&
                  invokeVNodeHook(Et, Kn, Ne),
                toggleRecurse(_e, !0),
                En && Gn)
              ) {
                const $n = () => {
                  (_e.subTree = renderComponentRoot(_e)),
                    Gn(En, _e.subTree, _e, hn, null);
                };
                Un
                  ? Ne.type.__asyncLoader().then(() => !_e.isUnmounted && $n())
                  : $n();
              } else {
                const $n = (_e.subTree = renderComponentRoot(_e));
                re(null, $n, Dt, vn, _e, hn, Sn), (Ne.el = $n.el);
              }
              if (
                (Dn && queuePostRenderEffect(Dn, hn),
                !Un && (Et = kn && kn.onVnodeMounted))
              ) {
                const $n = Ne;
                queuePostRenderEffect(() => invokeVNodeHook(Et, Kn, $n), hn);
              }
              (Ne.shapeFlag & 256 ||
                (Kn && isAsyncWrapper(Kn.vnode) && Kn.vnode.shapeFlag & 256)) &&
                _e.a &&
                queuePostRenderEffect(_e.a, hn),
                (_e.isMounted = !0),
                (Ne = Dt = vn = null);
            }
          },
          wn = (_e.effect = new ReactiveEffect(
            _n,
            () => queueJob(bn),
            _e.scope
          )),
          bn = (_e.update = () => wn.run());
        (bn.id = _e.uid), toggleRecurse(_e, !0), bn();
      },
      At = (_e, Ne, Dt) => {
        Ne.component = _e;
        const vn = _e.vnode.props;
        (_e.vnode = Ne),
          (_e.next = null),
          updateProps(_e, Ne.props, vn, Dt),
          updateSlots(_e, Ne.children, Dt),
          pauseTracking(),
          flushPreFlushCbs(),
          resetTracking();
      },
      Ue = (_e, Ne, Dt, vn, hn, Sn, On, _n, wn = !1) => {
        const bn = _e && _e.children,
          Et = _e ? _e.shapeFlag : 0,
          En = Ne.children,
          { patchFlag: kn, shapeFlag: In } = Ne;
        if (kn > 0) {
          if (kn & 128) {
            Tn(bn, En, Dt, vn, hn, Sn, On, _n, wn);
            return;
          } else if (kn & 256) {
            ze(bn, En, Dt, vn, hn, Sn, On, _n, wn);
            return;
          }
        }
        In & 8
          ? (Et & 16 && Ln(bn, hn, Sn), En !== bn && L(Dt, En))
          : Et & 16
          ? In & 16
            ? Tn(bn, En, Dt, vn, hn, Sn, On, _n, wn)
            : Ln(bn, hn, Sn, !0)
          : (Et & 8 && L(Dt, ""),
            In & 16 && $e(En, Dt, vn, hn, Sn, On, _n, wn));
      },
      ze = (_e, Ne, Dt, vn, hn, Sn, On, _n, wn) => {
        (_e = _e || EMPTY_ARR), (Ne = Ne || EMPTY_ARR);
        const bn = _e.length,
          Et = Ne.length,
          En = Math.min(bn, Et);
        let kn;
        for (kn = 0; kn < En; kn++) {
          const In = (Ne[kn] = wn
            ? cloneIfMounted(Ne[kn])
            : normalizeVNode(Ne[kn]));
          re(_e[kn], In, Dt, null, hn, Sn, On, _n, wn);
        }
        bn > Et
          ? Ln(_e, hn, Sn, !0, !1, En)
          : $e(Ne, Dt, vn, hn, Sn, On, _n, wn, En);
      },
      Tn = (_e, Ne, Dt, vn, hn, Sn, On, _n, wn) => {
        let bn = 0;
        const Et = Ne.length;
        let En = _e.length - 1,
          kn = Et - 1;
        for (; bn <= En && bn <= kn; ) {
          const In = _e[bn],
            Dn = (Ne[bn] = wn
              ? cloneIfMounted(Ne[bn])
              : normalizeVNode(Ne[bn]));
          if (isSameVNodeType(In, Dn)) re(In, Dn, Dt, null, hn, Sn, On, _n, wn);
          else break;
          bn++;
        }
        for (; bn <= En && bn <= kn; ) {
          const In = _e[En],
            Dn = (Ne[kn] = wn
              ? cloneIfMounted(Ne[kn])
              : normalizeVNode(Ne[kn]));
          if (isSameVNodeType(In, Dn)) re(In, Dn, Dt, null, hn, Sn, On, _n, wn);
          else break;
          En--, kn--;
        }
        if (bn > En) {
          if (bn <= kn) {
            const In = kn + 1,
              Dn = In < Et ? Ne[In].el : vn;
            for (; bn <= kn; )
              re(
                null,
                (Ne[bn] = wn ? cloneIfMounted(Ne[bn]) : normalizeVNode(Ne[bn])),
                Dt,
                Dn,
                hn,
                Sn,
                On,
                _n,
                wn
              ),
                bn++;
          }
        } else if (bn > kn) for (; bn <= En; ) xn(_e[bn], hn, Sn, !0), bn++;
        else {
          const In = bn,
            Dn = bn,
            Kn = new Map();
          for (bn = Dn; bn <= kn; bn++) {
            const Pn = (Ne[bn] = wn
              ? cloneIfMounted(Ne[bn])
              : normalizeVNode(Ne[bn]));
            Pn.key != null && Kn.set(Pn.key, bn);
          }
          let Un,
            $n = 0;
          const An = kn - Dn + 1;
          let Vn = !1,
            Ie = 0;
          const jt = new Array(An);
          for (bn = 0; bn < An; bn++) jt[bn] = 0;
          for (bn = In; bn <= En; bn++) {
            const Pn = _e[bn];
            if ($n >= An) {
              xn(Pn, hn, Sn, !0);
              continue;
            }
            let Wn;
            if (Pn.key != null) Wn = Kn.get(Pn.key);
            else
              for (Un = Dn; Un <= kn; Un++)
                if (jt[Un - Dn] === 0 && isSameVNodeType(Pn, Ne[Un])) {
                  Wn = Un;
                  break;
                }
            Wn === void 0
              ? xn(Pn, hn, Sn, !0)
              : ((jt[Wn - Dn] = bn + 1),
                Wn >= Ie ? (Ie = Wn) : (Vn = !0),
                re(Pn, Ne[Wn], Dt, null, hn, Sn, On, _n, wn),
                $n++);
          }
          const Bn = Vn ? getSequence(jt) : EMPTY_ARR;
          for (Un = Bn.length - 1, bn = An - 1; bn >= 0; bn--) {
            const Pn = Dn + bn,
              Wn = Ne[Pn],
              Yn = Pn + 1 < Et ? Ne[Pn + 1].el : vn;
            jt[bn] === 0
              ? re(null, Wn, Dt, Yn, hn, Sn, On, _n, wn)
              : Vn && (Un < 0 || bn !== Bn[Un] ? Nn(Wn, Dt, Yn, 2) : Un--);
          }
        }
      },
      Nn = (_e, Ne, Dt, vn, hn = null) => {
        const {
          el: Sn,
          type: On,
          transition: _n,
          children: wn,
          shapeFlag: bn,
        } = _e;
        if (bn & 6) {
          Nn(_e.component.subTree, Ne, Dt, vn);
          return;
        }
        if (bn & 128) {
          _e.suspense.move(Ne, Dt, vn);
          return;
        }
        if (bn & 64) {
          On.move(_e, Ne, Dt, Hn);
          return;
        }
        if (On === Fragment) {
          r(Sn, Ne, Dt);
          for (let En = 0; En < wn.length; En++) Nn(wn[En], Ne, Dt, vn);
          r(_e.anchor, Ne, Dt);
          return;
        }
        if (On === Static) {
          ue(_e, Ne, Dt);
          return;
        }
        if (vn !== 2 && bn & 1 && _n)
          if (vn === 0)
            _n.beforeEnter(Sn),
              r(Sn, Ne, Dt),
              queuePostRenderEffect(() => _n.enter(Sn), hn);
          else {
            const { leave: En, delayLeave: kn, afterLeave: In } = _n,
              Dn = () => r(Sn, Ne, Dt),
              Kn = () => {
                En(Sn, () => {
                  Dn(), In && In();
                });
              };
            kn ? kn(Sn, Dn, Kn) : Kn();
          }
        else r(Sn, Ne, Dt);
      },
      xn = (_e, Ne, Dt, vn = !1, hn = !1) => {
        const {
          type: Sn,
          props: On,
          ref: _n,
          children: wn,
          dynamicChildren: bn,
          shapeFlag: Et,
          patchFlag: En,
          dirs: kn,
        } = _e;
        if ((_n != null && setRef(_n, null, Dt, _e, !0), Et & 256)) {
          Ne.ctx.deactivate(_e);
          return;
        }
        const In = Et & 1 && kn,
          Dn = !isAsyncWrapper(_e);
        let Kn;
        if (
          (Dn &&
            (Kn = On && On.onVnodeBeforeUnmount) &&
            invokeVNodeHook(Kn, Ne, _e),
          Et & 6)
        )
          Rn(_e.component, Dt, vn);
        else {
          if (Et & 128) {
            _e.suspense.unmount(Dt, vn);
            return;
          }
          In && invokeDirectiveHook(_e, null, Ne, "beforeUnmount"),
            Et & 64
              ? _e.type.remove(_e, Ne, Dt, hn, Hn, vn)
              : bn && (Sn !== Fragment || (En > 0 && En & 64))
              ? Ln(bn, Ne, Dt, !1, !0)
              : ((Sn === Fragment && En & 384) || (!hn && Et & 16)) &&
                Ln(wn, Ne, Dt),
            vn && Mn(_e);
        }
        ((Dn && (Kn = On && On.onVnodeUnmounted)) || In) &&
          queuePostRenderEffect(() => {
            Kn && invokeVNodeHook(Kn, Ne, _e),
              In && invokeDirectiveHook(_e, null, Ne, "unmounted");
          }, Dt);
      },
      Mn = (_e) => {
        const { type: Ne, el: Dt, anchor: vn, transition: hn } = _e;
        if (Ne === Fragment) {
          zn(Dt, vn);
          return;
        }
        if (Ne === Static) {
          pe(_e);
          return;
        }
        const Sn = () => {
          i(Dt), hn && !hn.persisted && hn.afterLeave && hn.afterLeave();
        };
        if (_e.shapeFlag & 1 && hn && !hn.persisted) {
          const { leave: On, delayLeave: _n } = hn,
            wn = () => On(Dt, Sn);
          _n ? _n(_e.el, Sn, wn) : wn();
        } else Sn();
      },
      zn = (_e, Ne) => {
        let Dt;
        for (; _e !== Ne; ) (Dt = j(_e)), i(_e), (_e = Dt);
        i(Ne);
      },
      Rn = (_e, Ne, Dt) => {
        const { bum: vn, scope: hn, update: Sn, subTree: On, um: _n } = _e;
        vn && invokeArrayFns(vn),
          hn.stop(),
          Sn && ((Sn.active = !1), xn(On, _e, Ne, Dt)),
          _n && queuePostRenderEffect(_n, Ne),
          queuePostRenderEffect(() => {
            _e.isUnmounted = !0;
          }, Ne),
          Ne &&
            Ne.pendingBranch &&
            !Ne.isUnmounted &&
            _e.asyncDep &&
            !_e.asyncResolved &&
            _e.suspenseId === Ne.pendingId &&
            (Ne.deps--, Ne.deps === 0 && Ne.resolve());
      },
      Ln = (_e, Ne, Dt, vn = !1, hn = !1, Sn = 0) => {
        for (let On = Sn; On < _e.length; On++) xn(_e[On], Ne, Dt, vn, hn);
      },
      jn = (_e) =>
        _e.shapeFlag & 6
          ? jn(_e.component.subTree)
          : _e.shapeFlag & 128
          ? _e.suspense.next()
          : j(_e.anchor || _e.el),
      Fn = (_e, Ne, Dt) => {
        _e == null
          ? Ne._vnode && xn(Ne._vnode, null, null, !0)
          : re(Ne._vnode || null, _e, Ne, null, null, null, Dt),
          flushPreFlushCbs(),
          flushPostFlushCbs(),
          (Ne._vnode = _e);
      },
      Hn = {
        p: re,
        um: xn,
        m: Nn,
        r: Mn,
        mt: Fe,
        mc: $e,
        pc: Ue,
        pbc: qe,
        n: jn,
        o: e,
      };
    let qn, Gn;
    return (
      t && ([qn, Gn] = t(Hn)),
      { render: Fn, hydrate: qn, createApp: createAppAPI(Fn, qn) }
    );
  }
  function toggleRecurse({ effect: e, update: t }, n) {
    e.allowRecurse = t.allowRecurse = n;
  }
  function traverseStaticChildren(e, t, n = !1) {
    const r = e.children,
      i = t.children;
    if (isArray$3(r) && isArray$3(i))
      for (let g = 0; g < r.length; g++) {
        const y = r[g];
        let $ = i[g];
        $.shapeFlag & 1 &&
          !$.dynamicChildren &&
          (($.patchFlag <= 0 || $.patchFlag === 32) &&
            (($ = i[g] = cloneIfMounted(i[g])), ($.el = y.el)),
          n || traverseStaticChildren(y, $)),
          $.type === Text && ($.el = y.el);
      }
  }
  function getSequence(e) {
    const t = e.slice(),
      n = [0];
    let r, i, g, y, $;
    const k = e.length;
    for (r = 0; r < k; r++) {
      const V = e[r];
      if (V !== 0) {
        if (((i = n[n.length - 1]), e[i] < V)) {
          (t[r] = i), n.push(r);
          continue;
        }
        for (g = 0, y = n.length - 1; g < y; )
          ($ = (g + y) >> 1), e[n[$]] < V ? (g = $ + 1) : (y = $);
        V < e[n[g]] && (g > 0 && (t[r] = n[g - 1]), (n[g] = r));
      }
    }
    for (g = n.length, y = n[g - 1]; g-- > 0; ) (n[g] = y), (y = t[y]);
    return n;
  }
  const isTeleport = (e) => e.__isTeleport,
    isTeleportDisabled = (e) => e && (e.disabled || e.disabled === ""),
    isTargetSVG = (e) => typeof SVGElement < "u" && e instanceof SVGElement,
    resolveTarget = (e, t) => {
      const n = e && e.to;
      return isString$3(n) ? (t ? t(n) : null) : n;
    },
    TeleportImpl = {
      __isTeleport: !0,
      process(e, t, n, r, i, g, y, $, k, V) {
        const {
            mc: L,
            pc: oe,
            pbc: j,
            o: {
              insert: ae,
              querySelector: z,
              createText: re,
              createComment: ie,
            },
          } = V,
          le = isTeleportDisabled(t.props);
        let { shapeFlag: de, children: ue, dynamicChildren: pe } = t;
        if (e == null) {
          const Ce = (t.el = re("")),
            Oe = (t.anchor = re(""));
          ae(Ce, n, r), ae(Oe, n, r);
          const he = (t.target = resolveTarget(t.props, z)),
            $e = (t.targetAnchor = re(""));
          he && (ae($e, he), (y = y || isTargetSVG(he)));
          const Ve = (qe, Cn) => {
            de & 16 && L(ue, qe, Cn, i, g, y, $, k);
          };
          le ? Ve(n, Oe) : he && Ve(he, $e);
        } else {
          t.el = e.el;
          const Ce = (t.anchor = e.anchor),
            Oe = (t.target = e.target),
            he = (t.targetAnchor = e.targetAnchor),
            $e = isTeleportDisabled(e.props),
            Ve = $e ? n : Oe,
            qe = $e ? Ce : he;
          if (
            ((y = y || isTargetSVG(Oe)),
            pe
              ? (j(e.dynamicChildren, pe, Ve, i, g, y, $),
                traverseStaticChildren(e, t, !0))
              : k || oe(e, t, Ve, qe, i, g, y, $, !1),
            le)
          )
            $e || moveTeleport(t, n, Ce, V, 1);
          else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
            const Cn = (t.target = resolveTarget(t.props, z));
            Cn && moveTeleport(t, Cn, null, V, 0);
          } else $e && moveTeleport(t, Oe, he, V, 1);
        }
        updateCssVars(t);
      },
      remove(e, t, n, r, { um: i, o: { remove: g } }, y) {
        const {
          shapeFlag: $,
          children: k,
          anchor: V,
          targetAnchor: L,
          target: oe,
          props: j,
        } = e;
        if ((oe && g(L), (y || !isTeleportDisabled(j)) && (g(V), $ & 16)))
          for (let ae = 0; ae < k.length; ae++) {
            const z = k[ae];
            i(z, t, n, !0, !!z.dynamicChildren);
          }
      },
      move: moveTeleport,
      hydrate: hydrateTeleport,
    };
  function moveTeleport(e, t, n, { o: { insert: r }, m: i }, g = 2) {
    g === 0 && r(e.targetAnchor, t, n);
    const { el: y, anchor: $, shapeFlag: k, children: V, props: L } = e,
      oe = g === 2;
    if ((oe && r(y, t, n), (!oe || isTeleportDisabled(L)) && k & 16))
      for (let j = 0; j < V.length; j++) i(V[j], t, n, 2);
    oe && r($, t, n);
  }
  function hydrateTeleport(
    e,
    t,
    n,
    r,
    i,
    g,
    { o: { nextSibling: y, parentNode: $, querySelector: k } },
    V
  ) {
    const L = (t.target = resolveTarget(t.props, k));
    if (L) {
      const oe = L._lpa || L.firstChild;
      if (t.shapeFlag & 16)
        if (isTeleportDisabled(t.props))
          (t.anchor = V(y(e), t, $(e), n, r, i, g)), (t.targetAnchor = oe);
        else {
          t.anchor = y(e);
          let j = oe;
          for (; j; )
            if (
              ((j = y(j)),
              j && j.nodeType === 8 && j.data === "teleport anchor")
            ) {
              (t.targetAnchor = j),
                (L._lpa = t.targetAnchor && y(t.targetAnchor));
              break;
            }
          V(oe, t, L, n, r, i, g);
        }
      updateCssVars(t);
    }
    return t.anchor && y(t.anchor);
  }
  const Teleport = TeleportImpl;
  function updateCssVars(e) {
    const t = e.ctx;
    if (t && t.ut) {
      let n = e.children[0].el;
      for (; n !== e.targetAnchor; )
        n.nodeType === 1 && n.setAttribute("data-v-owner", t.uid),
          (n = n.nextSibling);
      t.ut();
    }
  }
  const Fragment = Symbol(void 0),
    Text = Symbol(void 0),
    Comment = Symbol(void 0),
    Static = Symbol(void 0),
    blockStack = [];
  let currentBlock = null;
  function openBlock(e = !1) {
    blockStack.push((currentBlock = e ? null : []));
  }
  function closeBlock() {
    blockStack.pop(),
      (currentBlock = blockStack[blockStack.length - 1] || null);
  }
  let isBlockTreeEnabled = 1;
  function setBlockTracking(e) {
    isBlockTreeEnabled += e;
  }
  function setupBlock(e) {
    return (
      (e.dynamicChildren =
        isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null),
      closeBlock(),
      isBlockTreeEnabled > 0 && currentBlock && currentBlock.push(e),
      e
    );
  }
  function createElementBlock(e, t, n, r, i, g) {
    return setupBlock(createBaseVNode(e, t, n, r, i, g, !0));
  }
  function createBlock(e, t, n, r, i) {
    return setupBlock(createVNode(e, t, n, r, i, !0));
  }
  function isVNode(e) {
    return e ? e.__v_isVNode === !0 : !1;
  }
  function isSameVNodeType(e, t) {
    return e.type === t.type && e.key === t.key;
  }
  const InternalObjectKey = "__vInternal",
    normalizeKey = ({ key: e }) => e ?? null,
    normalizeRef = ({ ref: e, ref_key: t, ref_for: n }) =>
      e != null
        ? isString$3(e) || isRef(e) || isFunction$3(e)
          ? { i: currentRenderingInstance, r: e, k: t, f: !!n }
          : e
        : null;
  function createBaseVNode(
    e,
    t = null,
    n = null,
    r = 0,
    i = null,
    g = e === Fragment ? 0 : 1,
    y = !1,
    $ = !1
  ) {
    const k = {
      __v_isVNode: !0,
      __v_skip: !0,
      type: e,
      props: t,
      key: t && normalizeKey(t),
      ref: t && normalizeRef(t),
      scopeId: currentScopeId,
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
      shapeFlag: g,
      patchFlag: r,
      dynamicProps: i,
      dynamicChildren: null,
      appContext: null,
      ctx: currentRenderingInstance,
    };
    return (
      $
        ? (normalizeChildren(k, n), g & 128 && e.normalize(k))
        : n && (k.shapeFlag |= isString$3(n) ? 8 : 16),
      isBlockTreeEnabled > 0 &&
        !y &&
        currentBlock &&
        (k.patchFlag > 0 || g & 6) &&
        k.patchFlag !== 32 &&
        currentBlock.push(k),
      k
    );
  }
  const createVNode = _createVNode;
  function _createVNode(e, t = null, n = null, r = 0, i = null, g = !1) {
    if (((!e || e === NULL_DYNAMIC_COMPONENT) && (e = Comment), isVNode(e))) {
      const $ = cloneVNode(e, t, !0);
      return (
        n && normalizeChildren($, n),
        isBlockTreeEnabled > 0 &&
          !g &&
          currentBlock &&
          ($.shapeFlag & 6
            ? (currentBlock[currentBlock.indexOf(e)] = $)
            : currentBlock.push($)),
        ($.patchFlag |= -2),
        $
      );
    }
    if ((isClassComponent(e) && (e = e.__vccOpts), t)) {
      t = guardReactiveProps(t);
      let { class: $, style: k } = t;
      $ && !isString$3($) && (t.class = normalizeClass($)),
        isObject$3(k) &&
          (isProxy(k) && !isArray$3(k) && (k = extend$1({}, k)),
          (t.style = normalizeStyle(k)));
    }
    const y = isString$3(e)
      ? 1
      : isSuspense(e)
      ? 128
      : isTeleport(e)
      ? 64
      : isObject$3(e)
      ? 4
      : isFunction$3(e)
      ? 2
      : 0;
    return createBaseVNode(e, t, n, r, i, y, g, !0);
  }
  function guardReactiveProps(e) {
    return e
      ? isProxy(e) || InternalObjectKey in e
        ? extend$1({}, e)
        : e
      : null;
  }
  function cloneVNode(e, t, n = !1) {
    const { props: r, ref: i, patchFlag: g, children: y } = e,
      $ = t ? mergeProps(r || {}, t) : r;
    return {
      __v_isVNode: !0,
      __v_skip: !0,
      type: e.type,
      props: $,
      key: $ && normalizeKey($),
      ref:
        t && t.ref
          ? n && i
            ? isArray$3(i)
              ? i.concat(normalizeRef(t))
              : [i, normalizeRef(t)]
            : normalizeRef(t)
          : i,
      scopeId: e.scopeId,
      slotScopeIds: e.slotScopeIds,
      children: y,
      target: e.target,
      targetAnchor: e.targetAnchor,
      staticCount: e.staticCount,
      shapeFlag: e.shapeFlag,
      patchFlag: t && e.type !== Fragment ? (g === -1 ? 16 : g | 16) : g,
      dynamicProps: e.dynamicProps,
      dynamicChildren: e.dynamicChildren,
      appContext: e.appContext,
      dirs: e.dirs,
      transition: e.transition,
      component: e.component,
      suspense: e.suspense,
      ssContent: e.ssContent && cloneVNode(e.ssContent),
      ssFallback: e.ssFallback && cloneVNode(e.ssFallback),
      el: e.el,
      anchor: e.anchor,
      ctx: e.ctx,
    };
  }
  function createTextVNode(e = " ", t = 0) {
    return createVNode(Text, null, e, t);
  }
  function createCommentVNode(e = "", t = !1) {
    return t
      ? (openBlock(), createBlock(Comment, null, e))
      : createVNode(Comment, null, e);
  }
  function normalizeVNode(e) {
    return e == null || typeof e == "boolean"
      ? createVNode(Comment)
      : isArray$3(e)
      ? createVNode(Fragment, null, e.slice())
      : typeof e == "object"
      ? cloneIfMounted(e)
      : createVNode(Text, null, String(e));
  }
  function cloneIfMounted(e) {
    return (e.el === null && e.patchFlag !== -1) || e.memo ? e : cloneVNode(e);
  }
  function normalizeChildren(e, t) {
    let n = 0;
    const { shapeFlag: r } = e;
    if (t == null) t = null;
    else if (isArray$3(t)) n = 16;
    else if (typeof t == "object")
      if (r & 65) {
        const i = t.default;
        i &&
          (i._c && (i._d = !1), normalizeChildren(e, i()), i._c && (i._d = !0));
        return;
      } else {
        n = 32;
        const i = t._;
        !i && !(InternalObjectKey in t)
          ? (t._ctx = currentRenderingInstance)
          : i === 3 &&
            currentRenderingInstance &&
            (currentRenderingInstance.slots._ === 1
              ? (t._ = 1)
              : ((t._ = 2), (e.patchFlag |= 1024)));
      }
    else
      isFunction$3(t)
        ? ((t = { default: t, _ctx: currentRenderingInstance }), (n = 32))
        : ((t = String(t)),
          r & 64 ? ((n = 16), (t = [createTextVNode(t)])) : (n = 8));
    (e.children = t), (e.shapeFlag |= n);
  }
  function mergeProps(...e) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n];
      for (const i in r)
        if (i === "class")
          t.class !== r.class && (t.class = normalizeClass([t.class, r.class]));
        else if (i === "style") t.style = normalizeStyle([t.style, r.style]);
        else if (isOn(i)) {
          const g = t[i],
            y = r[i];
          y &&
            g !== y &&
            !(isArray$3(g) && g.includes(y)) &&
            (t[i] = g ? [].concat(g, y) : y);
        } else i !== "" && (t[i] = r[i]);
    }
    return t;
  }
  function invokeVNodeHook(e, t, n, r = null) {
    callWithAsyncErrorHandling(e, t, 7, [n, r]);
  }
  const emptyAppContext = createAppContext();
  let uid$1 = 0;
  function createComponentInstance(e, t, n) {
    const r = e.type,
      i = (t ? t.appContext : e.appContext) || emptyAppContext,
      g = {
        uid: uid$1++,
        vnode: e,
        type: r,
        parent: t,
        appContext: i,
        root: null,
        next: null,
        subTree: null,
        effect: null,
        update: null,
        scope: new EffectScope(!0),
        render: null,
        proxy: null,
        exposed: null,
        exposeProxy: null,
        withProxy: null,
        provides: t ? t.provides : Object.create(i.provides),
        accessCache: null,
        renderCache: [],
        components: null,
        directives: null,
        propsOptions: normalizePropsOptions(r, i),
        emitsOptions: normalizeEmitsOptions(r, i),
        emit: null,
        emitted: null,
        propsDefaults: EMPTY_OBJ,
        inheritAttrs: r.inheritAttrs,
        ctx: EMPTY_OBJ,
        data: EMPTY_OBJ,
        props: EMPTY_OBJ,
        attrs: EMPTY_OBJ,
        slots: EMPTY_OBJ,
        refs: EMPTY_OBJ,
        setupState: EMPTY_OBJ,
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
      (g.ctx = { _: g }),
      (g.root = t ? t.root : g),
      (g.emit = emit$1.bind(null, g)),
      e.ce && e.ce(g),
      g
    );
  }
  let currentInstance = null;
  const getCurrentInstance = () => currentInstance || currentRenderingInstance,
    setCurrentInstance = (e) => {
      (currentInstance = e), e.scope.on();
    },
    unsetCurrentInstance = () => {
      currentInstance && currentInstance.scope.off(), (currentInstance = null);
    };
  function isStatefulComponent(e) {
    return e.vnode.shapeFlag & 4;
  }
  let isInSSRComponentSetup = !1;
  function setupComponent(e, t = !1) {
    isInSSRComponentSetup = t;
    const { props: n, children: r } = e.vnode,
      i = isStatefulComponent(e);
    initProps(e, n, i, t), initSlots(e, r);
    const g = i ? setupStatefulComponent(e, t) : void 0;
    return (isInSSRComponentSetup = !1), g;
  }
  function setupStatefulComponent(e, t) {
    const n = e.type;
    (e.accessCache = Object.create(null)),
      (e.proxy = markRaw(new Proxy(e.ctx, PublicInstanceProxyHandlers)));
    const { setup: r } = n;
    if (r) {
      const i = (e.setupContext = r.length > 1 ? createSetupContext(e) : null);
      setCurrentInstance(e), pauseTracking();
      const g = callWithErrorHandling(r, e, 0, [e.props, i]);
      if ((resetTracking(), unsetCurrentInstance(), isPromise(g))) {
        if ((g.then(unsetCurrentInstance, unsetCurrentInstance), t))
          return g
            .then((y) => {
              handleSetupResult(e, y, t);
            })
            .catch((y) => {
              handleError(y, e, 0);
            });
        e.asyncDep = g;
      } else handleSetupResult(e, g, t);
    } else finishComponentSetup(e, t);
  }
  function handleSetupResult(e, t, n) {
    isFunction$3(t)
      ? e.type.__ssrInlineRender
        ? (e.ssrRender = t)
        : (e.render = t)
      : isObject$3(t) && (e.setupState = proxyRefs(t)),
      finishComponentSetup(e, n);
  }
  let compile;
  function finishComponentSetup(e, t, n) {
    const r = e.type;
    if (!e.render) {
      if (!t && compile && !r.render) {
        const i = r.template || resolveMergedOptions(e).template;
        if (i) {
          const { isCustomElement: g, compilerOptions: y } =
              e.appContext.config,
            { delimiters: $, compilerOptions: k } = r,
            V = extend$1(extend$1({ isCustomElement: g, delimiters: $ }, y), k);
          r.render = compile(i, V);
        }
      }
      e.render = r.render || NOOP;
    }
    setCurrentInstance(e),
      pauseTracking(),
      applyOptions(e),
      resetTracking(),
      unsetCurrentInstance();
  }
  function createAttrsProxy(e) {
    return new Proxy(e.attrs, {
      get(t, n) {
        return track(e, "get", "$attrs"), t[n];
      },
    });
  }
  function createSetupContext(e) {
    const t = (r) => {
      e.exposed = r || {};
    };
    let n;
    return {
      get attrs() {
        return n || (n = createAttrsProxy(e));
      },
      slots: e.slots,
      emit: e.emit,
      expose: t,
    };
  }
  function getExposeProxy(e) {
    if (e.exposed)
      return (
        e.exposeProxy ||
        (e.exposeProxy = new Proxy(proxyRefs(markRaw(e.exposed)), {
          get(t, n) {
            if (n in t) return t[n];
            if (n in publicPropertiesMap) return publicPropertiesMap[n](e);
          },
          has(t, n) {
            return n in t || n in publicPropertiesMap;
          },
        }))
      );
  }
  function getComponentName(e, t = !0) {
    return isFunction$3(e)
      ? e.displayName || e.name
      : e.name || (t && e.__name);
  }
  function isClassComponent(e) {
    return isFunction$3(e) && "__vccOpts" in e;
  }
  const computed = (e, t) => computed$1(e, t, isInSSRComponentSetup);
  function useSlots() {
    return getContext().slots;
  }
  function useAttrs$1() {
    return getContext().attrs;
  }
  function getContext() {
    const e = getCurrentInstance();
    return e.setupContext || (e.setupContext = createSetupContext(e));
  }
  function h$1(e, t, n) {
    const r = arguments.length;
    return r === 2
      ? isObject$3(t) && !isArray$3(t)
        ? isVNode(t)
          ? createVNode(e, null, [t])
          : createVNode(e, t)
        : createVNode(e, null, t)
      : (r > 3
          ? (n = Array.prototype.slice.call(arguments, 2))
          : r === 3 && isVNode(n) && (n = [n]),
        createVNode(e, t, n));
  }
  const ssrContextKey = Symbol(""),
    useSSRContext = () => inject(ssrContextKey),
    version = "3.2.45",
    svgNS = "http://www.w3.org/2000/svg",
    doc = typeof document < "u" ? document : null,
    templateContainer = doc && doc.createElement("template"),
    nodeOps = {
      insert: (e, t, n) => {
        t.insertBefore(e, n || null);
      },
      remove: (e) => {
        const t = e.parentNode;
        t && t.removeChild(e);
      },
      createElement: (e, t, n, r) => {
        const i = t
          ? doc.createElementNS(svgNS, e)
          : doc.createElement(e, n ? { is: n } : void 0);
        return (
          e === "select" &&
            r &&
            r.multiple != null &&
            i.setAttribute("multiple", r.multiple),
          i
        );
      },
      createText: (e) => doc.createTextNode(e),
      createComment: (e) => doc.createComment(e),
      setText: (e, t) => {
        e.nodeValue = t;
      },
      setElementText: (e, t) => {
        e.textContent = t;
      },
      parentNode: (e) => e.parentNode,
      nextSibling: (e) => e.nextSibling,
      querySelector: (e) => doc.querySelector(e),
      setScopeId(e, t) {
        e.setAttribute(t, "");
      },
      insertStaticContent(e, t, n, r, i, g) {
        const y = n ? n.previousSibling : t.lastChild;
        if (i && (i === g || i.nextSibling))
          for (
            ;
            t.insertBefore(i.cloneNode(!0), n),
              !(i === g || !(i = i.nextSibling));

          );
        else {
          templateContainer.innerHTML = r ? `<svg>${e}</svg>` : e;
          const $ = templateContainer.content;
          if (r) {
            const k = $.firstChild;
            for (; k.firstChild; ) $.appendChild(k.firstChild);
            $.removeChild(k);
          }
          t.insertBefore($, n);
        }
        return [
          y ? y.nextSibling : t.firstChild,
          n ? n.previousSibling : t.lastChild,
        ];
      },
    };
  function patchClass(e, t, n) {
    const r = e._vtc;
    r && (t = (t ? [t, ...r] : [...r]).join(" ")),
      t == null
        ? e.removeAttribute("class")
        : n
        ? e.setAttribute("class", t)
        : (e.className = t);
  }
  function patchStyle(e, t, n) {
    const r = e.style,
      i = isString$3(n);
    if (n && !i) {
      for (const g in n) setStyle(r, g, n[g]);
      if (t && !isString$3(t))
        for (const g in t) n[g] == null && setStyle(r, g, "");
    } else {
      const g = r.display;
      i ? t !== n && (r.cssText = n) : t && e.removeAttribute("style"),
        "_vod" in e && (r.display = g);
    }
  }
  const importantRE = /\s*!important$/;
  function setStyle(e, t, n) {
    if (isArray$3(n)) n.forEach((r) => setStyle(e, t, r));
    else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
    else {
      const r = autoPrefix(e, t);
      importantRE.test(n)
        ? e.setProperty(hyphenate(r), n.replace(importantRE, ""), "important")
        : (e[r] = n);
    }
  }
  const prefixes = ["Webkit", "Moz", "ms"],
    prefixCache = {};
  function autoPrefix(e, t) {
    const n = prefixCache[t];
    if (n) return n;
    let r = camelize(t);
    if (r !== "filter" && r in e) return (prefixCache[t] = r);
    r = capitalize(r);
    for (let i = 0; i < prefixes.length; i++) {
      const g = prefixes[i] + r;
      if (g in e) return (prefixCache[t] = g);
    }
    return t;
  }
  const xlinkNS = "http://www.w3.org/1999/xlink";
  function patchAttr(e, t, n, r, i) {
    if (r && t.startsWith("xlink:"))
      n == null
        ? e.removeAttributeNS(xlinkNS, t.slice(6, t.length))
        : e.setAttributeNS(xlinkNS, t, n);
    else {
      const g = isSpecialBooleanAttr(t);
      n == null || (g && !includeBooleanAttr(n))
        ? e.removeAttribute(t)
        : e.setAttribute(t, g ? "" : n);
    }
  }
  function patchDOMProp(e, t, n, r, i, g, y) {
    if (t === "innerHTML" || t === "textContent") {
      r && y(r, i, g), (e[t] = n ?? "");
      return;
    }
    if (t === "value" && e.tagName !== "PROGRESS" && !e.tagName.includes("-")) {
      e._value = n;
      const k = n ?? "";
      (e.value !== k || e.tagName === "OPTION") && (e.value = k),
        n == null && e.removeAttribute(t);
      return;
    }
    let $ = !1;
    if (n === "" || n == null) {
      const k = typeof e[t];
      k === "boolean"
        ? (n = includeBooleanAttr(n))
        : n == null && k === "string"
        ? ((n = ""), ($ = !0))
        : k === "number" && ((n = 0), ($ = !0));
    }
    try {
      e[t] = n;
    } catch {}
    $ && e.removeAttribute(t);
  }
  function addEventListener(e, t, n, r) {
    e.addEventListener(t, n, r);
  }
  function removeEventListener(e, t, n, r) {
    e.removeEventListener(t, n, r);
  }
  function patchEvent(e, t, n, r, i = null) {
    const g = e._vei || (e._vei = {}),
      y = g[t];
    if (r && y) y.value = r;
    else {
      const [$, k] = parseName(t);
      if (r) {
        const V = (g[t] = createInvoker(r, i));
        addEventListener(e, $, V, k);
      } else y && (removeEventListener(e, $, y, k), (g[t] = void 0));
    }
  }
  const optionsModifierRE = /(?:Once|Passive|Capture)$/;
  function parseName(e) {
    let t;
    if (optionsModifierRE.test(e)) {
      t = {};
      let r;
      for (; (r = e.match(optionsModifierRE)); )
        (e = e.slice(0, e.length - r[0].length)), (t[r[0].toLowerCase()] = !0);
    }
    return [e[2] === ":" ? e.slice(3) : hyphenate(e.slice(2)), t];
  }
  let cachedNow = 0;
  const p$1 = Promise.resolve(),
    getNow = () =>
      cachedNow || (p$1.then(() => (cachedNow = 0)), (cachedNow = Date.now()));
  function createInvoker(e, t) {
    const n = (r) => {
      if (!r._vts) r._vts = Date.now();
      else if (r._vts <= n.attached) return;
      callWithAsyncErrorHandling(
        patchStopImmediatePropagation(r, n.value),
        t,
        5,
        [r]
      );
    };
    return (n.value = e), (n.attached = getNow()), n;
  }
  function patchStopImmediatePropagation(e, t) {
    if (isArray$3(t)) {
      const n = e.stopImmediatePropagation;
      return (
        (e.stopImmediatePropagation = () => {
          n.call(e), (e._stopped = !0);
        }),
        t.map((r) => (i) => !i._stopped && r && r(i))
      );
    } else return t;
  }
  const nativeOnRE = /^on[a-z]/,
    patchProp = (e, t, n, r, i = !1, g, y, $, k) => {
      t === "class"
        ? patchClass(e, r, i)
        : t === "style"
        ? patchStyle(e, n, r)
        : isOn(t)
        ? isModelListener(t) || patchEvent(e, t, n, r, y)
        : (
            t[0] === "."
              ? ((t = t.slice(1)), !0)
              : t[0] === "^"
              ? ((t = t.slice(1)), !1)
              : shouldSetAsProp(e, t, r, i)
          )
        ? patchDOMProp(e, t, r, g, y, $, k)
        : (t === "true-value"
            ? (e._trueValue = r)
            : t === "false-value" && (e._falseValue = r),
          patchAttr(e, t, r, i));
    };
  function shouldSetAsProp(e, t, n, r) {
    return r
      ? !!(
          t === "innerHTML" ||
          t === "textContent" ||
          (t in e && nativeOnRE.test(t) && isFunction$3(n))
        )
      : t === "spellcheck" ||
        t === "draggable" ||
        t === "translate" ||
        t === "form" ||
        (t === "list" && e.tagName === "INPUT") ||
        (t === "type" && e.tagName === "TEXTAREA") ||
        (nativeOnRE.test(t) && isString$3(n))
      ? !1
      : t in e;
  }
  const TRANSITION = "transition",
    ANIMATION = "animation",
    Transition = (e, { slots: t }) =>
      h$1(BaseTransition, resolveTransitionProps(e), t);
  Transition.displayName = "Transition";
  const DOMTransitionPropsValidators = {
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
  };
  Transition.props = extend$1(
    {},
    BaseTransition.props,
    DOMTransitionPropsValidators
  );
  const callHook = (e, t = []) => {
      isArray$3(e) ? e.forEach((n) => n(...t)) : e && e(...t);
    },
    hasExplicitCallback = (e) =>
      e ? (isArray$3(e) ? e.some((t) => t.length > 1) : e.length > 1) : !1;
  function resolveTransitionProps(e) {
    const t = {};
    for (const Pt in e) Pt in DOMTransitionPropsValidators || (t[Pt] = e[Pt]);
    if (e.css === !1) return t;
    const {
        name: n = "v",
        type: r,
        duration: i,
        enterFromClass: g = `${n}-enter-from`,
        enterActiveClass: y = `${n}-enter-active`,
        enterToClass: $ = `${n}-enter-to`,
        appearFromClass: k = g,
        appearActiveClass: V = y,
        appearToClass: L = $,
        leaveFromClass: oe = `${n}-leave-from`,
        leaveActiveClass: j = `${n}-leave-active`,
        leaveToClass: ae = `${n}-leave-to`,
      } = e,
      z = normalizeDuration(i),
      re = z && z[0],
      ie = z && z[1],
      {
        onBeforeEnter: le,
        onEnter: de,
        onEnterCancelled: ue,
        onLeave: pe,
        onLeaveCancelled: Ce,
        onBeforeAppear: Oe = le,
        onAppear: he = de,
        onAppearCancelled: $e = ue,
      } = t,
      Ve = (Pt, kt, Fe) => {
        removeTransitionClass(Pt, kt ? L : $),
          removeTransitionClass(Pt, kt ? V : y),
          Fe && Fe();
      },
      qe = (Pt, kt) => {
        (Pt._isLeaving = !1),
          removeTransitionClass(Pt, oe),
          removeTransitionClass(Pt, ae),
          removeTransitionClass(Pt, j),
          kt && kt();
      },
      Cn = (Pt) => (kt, Fe) => {
        const xe = Pt ? he : de,
          Lt = () => Ve(kt, Pt, Fe);
        callHook(xe, [kt, Lt]),
          nextFrame(() => {
            removeTransitionClass(kt, Pt ? k : g),
              addTransitionClass(kt, Pt ? L : $),
              hasExplicitCallback(xe) || whenTransitionEnds(kt, r, re, Lt);
          });
      };
    return extend$1(t, {
      onBeforeEnter(Pt) {
        callHook(le, [Pt]),
          addTransitionClass(Pt, g),
          addTransitionClass(Pt, y);
      },
      onBeforeAppear(Pt) {
        callHook(Oe, [Pt]),
          addTransitionClass(Pt, k),
          addTransitionClass(Pt, V);
      },
      onEnter: Cn(!1),
      onAppear: Cn(!0),
      onLeave(Pt, kt) {
        Pt._isLeaving = !0;
        const Fe = () => qe(Pt, kt);
        addTransitionClass(Pt, oe),
          forceReflow(),
          addTransitionClass(Pt, j),
          nextFrame(() => {
            Pt._isLeaving &&
              (removeTransitionClass(Pt, oe),
              addTransitionClass(Pt, ae),
              hasExplicitCallback(pe) || whenTransitionEnds(Pt, r, ie, Fe));
          }),
          callHook(pe, [Pt, Fe]);
      },
      onEnterCancelled(Pt) {
        Ve(Pt, !1), callHook(ue, [Pt]);
      },
      onAppearCancelled(Pt) {
        Ve(Pt, !0), callHook($e, [Pt]);
      },
      onLeaveCancelled(Pt) {
        qe(Pt), callHook(Ce, [Pt]);
      },
    });
  }
  function normalizeDuration(e) {
    if (e == null) return null;
    if (isObject$3(e)) return [NumberOf(e.enter), NumberOf(e.leave)];
    {
      const t = NumberOf(e);
      return [t, t];
    }
  }
  function NumberOf(e) {
    return toNumber$1(e);
  }
  function addTransitionClass(e, t) {
    t.split(/\s+/).forEach((n) => n && e.classList.add(n)),
      (e._vtc || (e._vtc = new Set())).add(t);
  }
  function removeTransitionClass(e, t) {
    t.split(/\s+/).forEach((r) => r && e.classList.remove(r));
    const { _vtc: n } = e;
    n && (n.delete(t), n.size || (e._vtc = void 0));
  }
  function nextFrame(e) {
    requestAnimationFrame(() => {
      requestAnimationFrame(e);
    });
  }
  let endId = 0;
  function whenTransitionEnds(e, t, n, r) {
    const i = (e._endId = ++endId),
      g = () => {
        i === e._endId && r();
      };
    if (n) return setTimeout(g, n);
    const { type: y, timeout: $, propCount: k } = getTransitionInfo(e, t);
    if (!y) return r();
    const V = y + "end";
    let L = 0;
    const oe = () => {
        e.removeEventListener(V, j), g();
      },
      j = (ae) => {
        ae.target === e && ++L >= k && oe();
      };
    setTimeout(() => {
      L < k && oe();
    }, $ + 1),
      e.addEventListener(V, j);
  }
  function getTransitionInfo(e, t) {
    const n = window.getComputedStyle(e),
      r = (z) => (n[z] || "").split(", "),
      i = r(`${TRANSITION}Delay`),
      g = r(`${TRANSITION}Duration`),
      y = getTimeout(i, g),
      $ = r(`${ANIMATION}Delay`),
      k = r(`${ANIMATION}Duration`),
      V = getTimeout($, k);
    let L = null,
      oe = 0,
      j = 0;
    t === TRANSITION
      ? y > 0 && ((L = TRANSITION), (oe = y), (j = g.length))
      : t === ANIMATION
      ? V > 0 && ((L = ANIMATION), (oe = V), (j = k.length))
      : ((oe = Math.max(y, V)),
        (L = oe > 0 ? (y > V ? TRANSITION : ANIMATION) : null),
        (j = L ? (L === TRANSITION ? g.length : k.length) : 0));
    const ae =
      L === TRANSITION &&
      /\b(transform|all)(,|$)/.test(r(`${TRANSITION}Property`).toString());
    return { type: L, timeout: oe, propCount: j, hasTransform: ae };
  }
  function getTimeout(e, t) {
    for (; e.length < t.length; ) e = e.concat(e);
    return Math.max(...t.map((n, r) => toMs(n) + toMs(e[r])));
  }
  function toMs(e) {
    return Number(e.slice(0, -1).replace(",", ".")) * 1e3;
  }
  function forceReflow() {
    return document.body.offsetHeight;
  }
  const getModelAssigner = (e) => {
    const t = e.props["onUpdate:modelValue"] || !1;
    return isArray$3(t) ? (n) => invokeArrayFns(t, n) : t;
  };
  function onCompositionStart(e) {
    e.target.composing = !0;
  }
  function onCompositionEnd(e) {
    const t = e.target;
    t.composing && ((t.composing = !1), t.dispatchEvent(new Event("input")));
  }
  const vModelText = {
      created(e, { modifiers: { lazy: t, trim: n, number: r } }, i) {
        e._assign = getModelAssigner(i);
        const g = r || (i.props && i.props.type === "number");
        addEventListener(e, t ? "change" : "input", (y) => {
          if (y.target.composing) return;
          let $ = e.value;
          n && ($ = $.trim()), g && ($ = toNumber$1($)), e._assign($);
        }),
          n &&
            addEventListener(e, "change", () => {
              e.value = e.value.trim();
            }),
          t ||
            (addEventListener(e, "compositionstart", onCompositionStart),
            addEventListener(e, "compositionend", onCompositionEnd),
            addEventListener(e, "change", onCompositionEnd));
      },
      mounted(e, { value: t }) {
        e.value = t ?? "";
      },
      beforeUpdate(
        e,
        { value: t, modifiers: { lazy: n, trim: r, number: i } },
        g
      ) {
        if (
          ((e._assign = getModelAssigner(g)),
          e.composing ||
            (document.activeElement === e &&
              e.type !== "range" &&
              (n ||
                (r && e.value.trim() === t) ||
                ((i || e.type === "number") && toNumber$1(e.value) === t))))
        )
          return;
        const y = t ?? "";
        e.value !== y && (e.value = y);
      },
    },
    vModelCheckbox = {
      deep: !0,
      created(e, t, n) {
        (e._assign = getModelAssigner(n)),
          addEventListener(e, "change", () => {
            const r = e._modelValue,
              i = getValue$1(e),
              g = e.checked,
              y = e._assign;
            if (isArray$3(r)) {
              const $ = looseIndexOf(r, i),
                k = $ !== -1;
              if (g && !k) y(r.concat(i));
              else if (!g && k) {
                const V = [...r];
                V.splice($, 1), y(V);
              }
            } else if (isSet(r)) {
              const $ = new Set(r);
              g ? $.add(i) : $.delete(i), y($);
            } else y(getCheckboxValue(e, g));
          });
      },
      mounted: setChecked,
      beforeUpdate(e, t, n) {
        (e._assign = getModelAssigner(n)), setChecked(e, t, n);
      },
    };
  function setChecked(e, { value: t, oldValue: n }, r) {
    (e._modelValue = t),
      isArray$3(t)
        ? (e.checked = looseIndexOf(t, r.props.value) > -1)
        : isSet(t)
        ? (e.checked = t.has(r.props.value))
        : t !== n && (e.checked = looseEqual(t, getCheckboxValue(e, !0)));
  }
  function getValue$1(e) {
    return "_value" in e ? e._value : e.value;
  }
  function getCheckboxValue(e, t) {
    const n = t ? "_trueValue" : "_falseValue";
    return n in e ? e[n] : t;
  }
  const systemModifiers = ["ctrl", "shift", "alt", "meta"],
    modifierGuards = {
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
      exact: (e, t) =>
        systemModifiers.some((n) => e[`${n}Key`] && !t.includes(n)),
    },
    withModifiers =
      (e, t) =>
      (n, ...r) => {
        for (let i = 0; i < t.length; i++) {
          const g = modifierGuards[t[i]];
          if (g && g(n, t)) return;
        }
        return e(n, ...r);
      },
    keyNames = {
      esc: "escape",
      space: " ",
      up: "arrow-up",
      left: "arrow-left",
      right: "arrow-right",
      down: "arrow-down",
      delete: "backspace",
    },
    withKeys = (e, t) => (n) => {
      if (!("key" in n)) return;
      const r = hyphenate(n.key);
      if (t.some((i) => i === r || keyNames[i] === r)) return e(n);
    },
    vShow = {
      beforeMount(e, { value: t }, { transition: n }) {
        (e._vod = e.style.display === "none" ? "" : e.style.display),
          n && t ? n.beforeEnter(e) : setDisplay(e, t);
      },
      mounted(e, { value: t }, { transition: n }) {
        n && t && n.enter(e);
      },
      updated(e, { value: t, oldValue: n }, { transition: r }) {
        !t != !n &&
          (r
            ? t
              ? (r.beforeEnter(e), setDisplay(e, !0), r.enter(e))
              : r.leave(e, () => {
                  setDisplay(e, !1);
                })
            : setDisplay(e, t));
      },
      beforeUnmount(e, { value: t }) {
        setDisplay(e, t);
      },
    };
  function setDisplay(e, t) {
    e.style.display = t ? e._vod : "none";
  }
  const rendererOptions = extend$1({ patchProp }, nodeOps);
  let renderer;
  function ensureRenderer() {
    return renderer || (renderer = createRenderer(rendererOptions));
  }
  const render = (...e) => {
      ensureRenderer().render(...e);
    },
    createApp = (...e) => {
      const t = ensureRenderer().createApp(...e),
        { mount: n } = t;
      return (
        (t.mount = (r) => {
          const i = normalizeContainer(r);
          if (!i) return;
          const g = t._component;
          !isFunction$3(g) &&
            !g.render &&
            !g.template &&
            (g.template = i.innerHTML),
            (i.innerHTML = "");
          const y = n(i, !1, i instanceof SVGElement);
          return (
            i instanceof Element &&
              (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")),
            y
          );
        }),
        t
      );
    };
  function normalizeContainer(e) {
    return isString$3(e) ? document.querySelector(e) : e;
  }
  var freeGlobal =
    typeof global == "object" && global && global.Object === Object && global;
  const freeGlobal$1 = freeGlobal;
  var freeSelf =
      typeof self == "object" && self && self.Object === Object && self,
    root = freeGlobal$1 || freeSelf || Function("return this")();
  const root$1 = root;
  var Symbol$1 = root$1.Symbol;
  const Symbol$2 = Symbol$1;
  var objectProto$c = Object.prototype,
    hasOwnProperty$a = objectProto$c.hasOwnProperty,
    nativeObjectToString$1 = objectProto$c.toString,
    symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : void 0;
  function getRawTag(e) {
    var t = hasOwnProperty$a.call(e, symToStringTag$1),
      n = e[symToStringTag$1];
    try {
      e[symToStringTag$1] = void 0;
      var r = !0;
    } catch {}
    var i = nativeObjectToString$1.call(e);
    return r && (t ? (e[symToStringTag$1] = n) : delete e[symToStringTag$1]), i;
  }
  var objectProto$b = Object.prototype,
    nativeObjectToString = objectProto$b.toString;
  function objectToString(e) {
    return nativeObjectToString.call(e);
  }
  var nullTag = "[object Null]",
    undefinedTag = "[object Undefined]",
    symToStringTag = Symbol$2 ? Symbol$2.toStringTag : void 0;
  function baseGetTag(e) {
    return e == null
      ? e === void 0
        ? undefinedTag
        : nullTag
      : symToStringTag && symToStringTag in Object(e)
      ? getRawTag(e)
      : objectToString(e);
  }
  function isObjectLike(e) {
    return e != null && typeof e == "object";
  }
  var symbolTag$1 = "[object Symbol]";
  function isSymbol(e) {
    return (
      typeof e == "symbol" || (isObjectLike(e) && baseGetTag(e) == symbolTag$1)
    );
  }
  function arrayMap(e, t) {
    for (var n = -1, r = e == null ? 0 : e.length, i = Array(r); ++n < r; )
      i[n] = t(e[n], n, e);
    return i;
  }
  var isArray$1 = Array.isArray;
  const isArray$2 = isArray$1;
  var INFINITY$1 = 1 / 0,
    symbolProto$1 = Symbol$2 ? Symbol$2.prototype : void 0,
    symbolToString = symbolProto$1 ? symbolProto$1.toString : void 0;
  function baseToString(e) {
    if (typeof e == "string") return e;
    if (isArray$2(e)) return arrayMap(e, baseToString) + "";
    if (isSymbol(e)) return symbolToString ? symbolToString.call(e) : "";
    var t = e + "";
    return t == "0" && 1 / e == -INFINITY$1 ? "-0" : t;
  }
  var reWhitespace = /\s/;
  function trimmedEndIndex(e) {
    for (var t = e.length; t-- && reWhitespace.test(e.charAt(t)); );
    return t;
  }
  var reTrimStart = /^\s+/;
  function baseTrim(e) {
    return e && e.slice(0, trimmedEndIndex(e) + 1).replace(reTrimStart, "");
  }
  function isObject$2(e) {
    var t = typeof e;
    return e != null && (t == "object" || t == "function");
  }
  var NAN = 0 / 0,
    reIsBadHex = /^[-+]0x[0-9a-f]+$/i,
    reIsBinary = /^0b[01]+$/i,
    reIsOctal = /^0o[0-7]+$/i,
    freeParseInt = parseInt;
  function toNumber(e) {
    if (typeof e == "number") return e;
    if (isSymbol(e)) return NAN;
    if (isObject$2(e)) {
      var t = typeof e.valueOf == "function" ? e.valueOf() : e;
      e = isObject$2(t) ? t + "" : t;
    }
    if (typeof e != "string") return e === 0 ? e : +e;
    e = baseTrim(e);
    var n = reIsBinary.test(e);
    return n || reIsOctal.test(e)
      ? freeParseInt(e.slice(2), n ? 2 : 8)
      : reIsBadHex.test(e)
      ? NAN
      : +e;
  }
  function identity$2(e) {
    return e;
  }
  var asyncTag = "[object AsyncFunction]",
    funcTag$1 = "[object Function]",
    genTag = "[object GeneratorFunction]",
    proxyTag = "[object Proxy]";
  function isFunction$2(e) {
    if (!isObject$2(e)) return !1;
    var t = baseGetTag(e);
    return t == funcTag$1 || t == genTag || t == asyncTag || t == proxyTag;
  }
  var coreJsData = root$1["__core-js_shared__"];
  const coreJsData$1 = coreJsData;
  var maskSrcKey = (function () {
    var e = /[^.]+$/.exec(
      (coreJsData$1 && coreJsData$1.keys && coreJsData$1.keys.IE_PROTO) || ""
    );
    return e ? "Symbol(src)_1." + e : "";
  })();
  function isMasked(e) {
    return !!maskSrcKey && maskSrcKey in e;
  }
  var funcProto$1 = Function.prototype,
    funcToString$1 = funcProto$1.toString;
  function toSource(e) {
    if (e != null) {
      try {
        return funcToString$1.call(e);
      } catch {}
      try {
        return e + "";
      } catch {}
    }
    return "";
  }
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g,
    reIsHostCtor = /^\[object .+?Constructor\]$/,
    funcProto = Function.prototype,
    objectProto$a = Object.prototype,
    funcToString = funcProto.toString,
    hasOwnProperty$9 = objectProto$a.hasOwnProperty,
    reIsNative = RegExp(
      "^" +
        funcToString
          .call(hasOwnProperty$9)
          .replace(reRegExpChar, "\\$&")
          .replace(
            /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
            "$1.*?"
          ) +
        "$"
    );
  function baseIsNative(e) {
    if (!isObject$2(e) || isMasked(e)) return !1;
    var t = isFunction$2(e) ? reIsNative : reIsHostCtor;
    return t.test(toSource(e));
  }
  function getValue(e, t) {
    return e == null ? void 0 : e[t];
  }
  function getNative(e, t) {
    var n = getValue(e, t);
    return baseIsNative(n) ? n : void 0;
  }
  var WeakMap$1 = getNative(root$1, "WeakMap");
  const WeakMap$2 = WeakMap$1;
  function apply(e, t, n) {
    switch (n.length) {
      case 0:
        return e.call(t);
      case 1:
        return e.call(t, n[0]);
      case 2:
        return e.call(t, n[0], n[1]);
      case 3:
        return e.call(t, n[0], n[1], n[2]);
    }
    return e.apply(t, n);
  }
  var HOT_COUNT = 800,
    HOT_SPAN = 16,
    nativeNow = Date.now;
  function shortOut(e) {
    var t = 0,
      n = 0;
    return function () {
      var r = nativeNow(),
        i = HOT_SPAN - (r - n);
      if (((n = r), i > 0)) {
        if (++t >= HOT_COUNT) return arguments[0];
      } else t = 0;
      return e.apply(void 0, arguments);
    };
  }
  function constant(e) {
    return function () {
      return e;
    };
  }
  var defineProperty = (function () {
    try {
      var e = getNative(Object, "defineProperty");
      return e({}, "", {}), e;
    } catch {}
  })();
  const defineProperty$1 = defineProperty;
  var baseSetToString = defineProperty$1
    ? function (e, t) {
        return defineProperty$1(e, "toString", {
          configurable: !0,
          enumerable: !1,
          value: constant(t),
          writable: !0,
        });
      }
    : identity$2;
  const baseSetToString$1 = baseSetToString;
  var setToString = shortOut(baseSetToString$1);
  const setToString$1 = setToString;
  var MAX_SAFE_INTEGER$1 = 9007199254740991,
    reIsUint = /^(?:0|[1-9]\d*)$/;
  function isIndex(e, t) {
    var n = typeof e;
    return (
      (t = t ?? MAX_SAFE_INTEGER$1),
      !!t &&
        (n == "number" || (n != "symbol" && reIsUint.test(e))) &&
        e > -1 &&
        e % 1 == 0 &&
        e < t
    );
  }
  function baseAssignValue(e, t, n) {
    t == "__proto__" && defineProperty$1
      ? defineProperty$1(e, t, {
          configurable: !0,
          enumerable: !0,
          value: n,
          writable: !0,
        })
      : (e[t] = n);
  }
  function eq(e, t) {
    return e === t || (e !== e && t !== t);
  }
  var objectProto$9 = Object.prototype,
    hasOwnProperty$8 = objectProto$9.hasOwnProperty;
  function assignValue(e, t, n) {
    var r = e[t];
    (!(hasOwnProperty$8.call(e, t) && eq(r, n)) ||
      (n === void 0 && !(t in e))) &&
      baseAssignValue(e, t, n);
  }
  var nativeMax$1 = Math.max;
  function overRest(e, t, n) {
    return (
      (t = nativeMax$1(t === void 0 ? e.length - 1 : t, 0)),
      function () {
        for (
          var r = arguments,
            i = -1,
            g = nativeMax$1(r.length - t, 0),
            y = Array(g);
          ++i < g;

        )
          y[i] = r[t + i];
        i = -1;
        for (var $ = Array(t + 1); ++i < t; ) $[i] = r[i];
        return ($[t] = n(y)), apply(e, this, $);
      }
    );
  }
  var MAX_SAFE_INTEGER = 9007199254740991;
  function isLength(e) {
    return (
      typeof e == "number" && e > -1 && e % 1 == 0 && e <= MAX_SAFE_INTEGER
    );
  }
  function isArrayLike(e) {
    return e != null && isLength(e.length) && !isFunction$2(e);
  }
  var objectProto$8 = Object.prototype;
  function isPrototype(e) {
    var t = e && e.constructor,
      n = (typeof t == "function" && t.prototype) || objectProto$8;
    return e === n;
  }
  function baseTimes(e, t) {
    for (var n = -1, r = Array(e); ++n < e; ) r[n] = t(n);
    return r;
  }
  var argsTag$2 = "[object Arguments]";
  function baseIsArguments(e) {
    return isObjectLike(e) && baseGetTag(e) == argsTag$2;
  }
  var objectProto$7 = Object.prototype,
    hasOwnProperty$7 = objectProto$7.hasOwnProperty,
    propertyIsEnumerable$1 = objectProto$7.propertyIsEnumerable,
    isArguments = baseIsArguments(
      (function () {
        return arguments;
      })()
    )
      ? baseIsArguments
      : function (e) {
          return (
            isObjectLike(e) &&
            hasOwnProperty$7.call(e, "callee") &&
            !propertyIsEnumerable$1.call(e, "callee")
          );
        };
  const isArguments$1 = isArguments;
  function stubFalse() {
    return !1;
  }
  var freeExports$1 =
      typeof exports == "object" && exports && !exports.nodeType && exports,
    freeModule$1 =
      freeExports$1 &&
      typeof module == "object" &&
      module &&
      !module.nodeType &&
      module,
    moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1,
    Buffer$1 = moduleExports$1 ? root$1.Buffer : void 0,
    nativeIsBuffer = Buffer$1 ? Buffer$1.isBuffer : void 0,
    isBuffer$1 = nativeIsBuffer || stubFalse;
  const isBuffer$2 = isBuffer$1;
  var argsTag$1 = "[object Arguments]",
    arrayTag$1 = "[object Array]",
    boolTag$1 = "[object Boolean]",
    dateTag$1 = "[object Date]",
    errorTag$1 = "[object Error]",
    funcTag = "[object Function]",
    mapTag$2 = "[object Map]",
    numberTag$1 = "[object Number]",
    objectTag$2 = "[object Object]",
    regexpTag$1 = "[object RegExp]",
    setTag$2 = "[object Set]",
    stringTag$1 = "[object String]",
    weakMapTag$1 = "[object WeakMap]",
    arrayBufferTag$1 = "[object ArrayBuffer]",
    dataViewTag$2 = "[object DataView]",
    float32Tag = "[object Float32Array]",
    float64Tag = "[object Float64Array]",
    int8Tag = "[object Int8Array]",
    int16Tag = "[object Int16Array]",
    int32Tag = "[object Int32Array]",
    uint8Tag = "[object Uint8Array]",
    uint8ClampedTag = "[object Uint8ClampedArray]",
    uint16Tag = "[object Uint16Array]",
    uint32Tag = "[object Uint32Array]",
    typedArrayTags = {};
  typedArrayTags[float32Tag] =
    typedArrayTags[float64Tag] =
    typedArrayTags[int8Tag] =
    typedArrayTags[int16Tag] =
    typedArrayTags[int32Tag] =
    typedArrayTags[uint8Tag] =
    typedArrayTags[uint8ClampedTag] =
    typedArrayTags[uint16Tag] =
    typedArrayTags[uint32Tag] =
      !0;
  typedArrayTags[argsTag$1] =
    typedArrayTags[arrayTag$1] =
    typedArrayTags[arrayBufferTag$1] =
    typedArrayTags[boolTag$1] =
    typedArrayTags[dataViewTag$2] =
    typedArrayTags[dateTag$1] =
    typedArrayTags[errorTag$1] =
    typedArrayTags[funcTag] =
    typedArrayTags[mapTag$2] =
    typedArrayTags[numberTag$1] =
    typedArrayTags[objectTag$2] =
    typedArrayTags[regexpTag$1] =
    typedArrayTags[setTag$2] =
    typedArrayTags[stringTag$1] =
    typedArrayTags[weakMapTag$1] =
      !1;
  function baseIsTypedArray(e) {
    return (
      isObjectLike(e) && isLength(e.length) && !!typedArrayTags[baseGetTag(e)]
    );
  }
  function baseUnary(e) {
    return function (t) {
      return e(t);
    };
  }
  var freeExports =
      typeof exports == "object" && exports && !exports.nodeType && exports,
    freeModule =
      freeExports &&
      typeof module == "object" &&
      module &&
      !module.nodeType &&
      module,
    moduleExports = freeModule && freeModule.exports === freeExports,
    freeProcess = moduleExports && freeGlobal$1.process,
    nodeUtil = (function () {
      try {
        var e =
          freeModule && freeModule.require && freeModule.require("util").types;
        return (
          e ||
          (freeProcess && freeProcess.binding && freeProcess.binding("util"))
        );
      } catch {}
    })();
  const nodeUtil$1 = nodeUtil;
  var nodeIsTypedArray = nodeUtil$1 && nodeUtil$1.isTypedArray,
    isTypedArray$1 = nodeIsTypedArray
      ? baseUnary(nodeIsTypedArray)
      : baseIsTypedArray;
  const isTypedArray$2 = isTypedArray$1;
  var objectProto$6 = Object.prototype,
    hasOwnProperty$6 = objectProto$6.hasOwnProperty;
  function arrayLikeKeys(e, t) {
    var n = isArray$2(e),
      r = !n && isArguments$1(e),
      i = !n && !r && isBuffer$2(e),
      g = !n && !r && !i && isTypedArray$2(e),
      y = n || r || i || g,
      $ = y ? baseTimes(e.length, String) : [],
      k = $.length;
    for (var V in e)
      (t || hasOwnProperty$6.call(e, V)) &&
        !(
          y &&
          (V == "length" ||
            (i && (V == "offset" || V == "parent")) ||
            (g && (V == "buffer" || V == "byteLength" || V == "byteOffset")) ||
            isIndex(V, k))
        ) &&
        $.push(V);
    return $;
  }
  function overArg(e, t) {
    return function (n) {
      return e(t(n));
    };
  }
  var nativeKeys = overArg(Object.keys, Object);
  const nativeKeys$1 = nativeKeys;
  var objectProto$5 = Object.prototype,
    hasOwnProperty$5 = objectProto$5.hasOwnProperty;
  function baseKeys(e) {
    if (!isPrototype(e)) return nativeKeys$1(e);
    var t = [];
    for (var n in Object(e))
      hasOwnProperty$5.call(e, n) && n != "constructor" && t.push(n);
    return t;
  }
  function keys(e) {
    return isArrayLike(e) ? arrayLikeKeys(e) : baseKeys(e);
  }
  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;
  function isKey(e, t) {
    if (isArray$2(e)) return !1;
    var n = typeof e;
    return n == "number" ||
      n == "symbol" ||
      n == "boolean" ||
      e == null ||
      isSymbol(e)
      ? !0
      : reIsPlainProp.test(e) ||
          !reIsDeepProp.test(e) ||
          (t != null && e in Object(t));
  }
  var nativeCreate = getNative(Object, "create");
  const nativeCreate$1 = nativeCreate;
  function hashClear() {
    (this.__data__ = nativeCreate$1 ? nativeCreate$1(null) : {}),
      (this.size = 0);
  }
  function hashDelete(e) {
    var t = this.has(e) && delete this.__data__[e];
    return (this.size -= t ? 1 : 0), t;
  }
  var HASH_UNDEFINED$2 = "__lodash_hash_undefined__",
    objectProto$4 = Object.prototype,
    hasOwnProperty$4 = objectProto$4.hasOwnProperty;
  function hashGet(e) {
    var t = this.__data__;
    if (nativeCreate$1) {
      var n = t[e];
      return n === HASH_UNDEFINED$2 ? void 0 : n;
    }
    return hasOwnProperty$4.call(t, e) ? t[e] : void 0;
  }
  var objectProto$3 = Object.prototype,
    hasOwnProperty$3 = objectProto$3.hasOwnProperty;
  function hashHas(e) {
    var t = this.__data__;
    return nativeCreate$1 ? t[e] !== void 0 : hasOwnProperty$3.call(t, e);
  }
  var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
  function hashSet(e, t) {
    var n = this.__data__;
    return (
      (this.size += this.has(e) ? 0 : 1),
      (n[e] = nativeCreate$1 && t === void 0 ? HASH_UNDEFINED$1 : t),
      this
    );
  }
  function Hash(e) {
    var t = -1,
      n = e == null ? 0 : e.length;
    for (this.clear(); ++t < n; ) {
      var r = e[t];
      this.set(r[0], r[1]);
    }
  }
  Hash.prototype.clear = hashClear;
  Hash.prototype.delete = hashDelete;
  Hash.prototype.get = hashGet;
  Hash.prototype.has = hashHas;
  Hash.prototype.set = hashSet;
  function listCacheClear() {
    (this.__data__ = []), (this.size = 0);
  }
  function assocIndexOf(e, t) {
    for (var n = e.length; n--; ) if (eq(e[n][0], t)) return n;
    return -1;
  }
  var arrayProto = Array.prototype,
    splice = arrayProto.splice;
  function listCacheDelete(e) {
    var t = this.__data__,
      n = assocIndexOf(t, e);
    if (n < 0) return !1;
    var r = t.length - 1;
    return n == r ? t.pop() : splice.call(t, n, 1), --this.size, !0;
  }
  function listCacheGet(e) {
    var t = this.__data__,
      n = assocIndexOf(t, e);
    return n < 0 ? void 0 : t[n][1];
  }
  function listCacheHas(e) {
    return assocIndexOf(this.__data__, e) > -1;
  }
  function listCacheSet(e, t) {
    var n = this.__data__,
      r = assocIndexOf(n, e);
    return r < 0 ? (++this.size, n.push([e, t])) : (n[r][1] = t), this;
  }
  function ListCache(e) {
    var t = -1,
      n = e == null ? 0 : e.length;
    for (this.clear(); ++t < n; ) {
      var r = e[t];
      this.set(r[0], r[1]);
    }
  }
  ListCache.prototype.clear = listCacheClear;
  ListCache.prototype.delete = listCacheDelete;
  ListCache.prototype.get = listCacheGet;
  ListCache.prototype.has = listCacheHas;
  ListCache.prototype.set = listCacheSet;
  var Map$1 = getNative(root$1, "Map");
  const Map$2 = Map$1;
  function mapCacheClear() {
    (this.size = 0),
      (this.__data__ = {
        hash: new Hash(),
        map: new (Map$2 || ListCache)(),
        string: new Hash(),
      });
  }
  function isKeyable(e) {
    var t = typeof e;
    return t == "string" || t == "number" || t == "symbol" || t == "boolean"
      ? e !== "__proto__"
      : e === null;
  }
  function getMapData(e, t) {
    var n = e.__data__;
    return isKeyable(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
  }
  function mapCacheDelete(e) {
    var t = getMapData(this, e).delete(e);
    return (this.size -= t ? 1 : 0), t;
  }
  function mapCacheGet(e) {
    return getMapData(this, e).get(e);
  }
  function mapCacheHas(e) {
    return getMapData(this, e).has(e);
  }
  function mapCacheSet(e, t) {
    var n = getMapData(this, e),
      r = n.size;
    return n.set(e, t), (this.size += n.size == r ? 0 : 1), this;
  }
  function MapCache(e) {
    var t = -1,
      n = e == null ? 0 : e.length;
    for (this.clear(); ++t < n; ) {
      var r = e[t];
      this.set(r[0], r[1]);
    }
  }
  MapCache.prototype.clear = mapCacheClear;
  MapCache.prototype.delete = mapCacheDelete;
  MapCache.prototype.get = mapCacheGet;
  MapCache.prototype.has = mapCacheHas;
  MapCache.prototype.set = mapCacheSet;
  var FUNC_ERROR_TEXT$1 = "Expected a function";
  function memoize(e, t) {
    if (typeof e != "function" || (t != null && typeof t != "function"))
      throw new TypeError(FUNC_ERROR_TEXT$1);
    var n = function () {
      var r = arguments,
        i = t ? t.apply(this, r) : r[0],
        g = n.cache;
      if (g.has(i)) return g.get(i);
      var y = e.apply(this, r);
      return (n.cache = g.set(i, y) || g), y;
    };
    return (n.cache = new (memoize.Cache || MapCache)()), n;
  }
  memoize.Cache = MapCache;
  var MAX_MEMOIZE_SIZE = 500;
  function memoizeCapped(e) {
    var t = memoize(e, function (r) {
        return n.size === MAX_MEMOIZE_SIZE && n.clear(), r;
      }),
      n = t.cache;
    return t;
  }
  var rePropName =
      /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
    reEscapeChar = /\\(\\)?/g,
    stringToPath = memoizeCapped(function (e) {
      var t = [];
      return (
        e.charCodeAt(0) === 46 && t.push(""),
        e.replace(rePropName, function (n, r, i, g) {
          t.push(i ? g.replace(reEscapeChar, "$1") : r || n);
        }),
        t
      );
    });
  const stringToPath$1 = stringToPath;
  function toString$1(e) {
    return e == null ? "" : baseToString(e);
  }
  function castPath(e, t) {
    return isArray$2(e) ? e : isKey(e, t) ? [e] : stringToPath$1(toString$1(e));
  }
  var INFINITY = 1 / 0;
  function toKey(e) {
    if (typeof e == "string" || isSymbol(e)) return e;
    var t = e + "";
    return t == "0" && 1 / e == -INFINITY ? "-0" : t;
  }
  function baseGet(e, t) {
    t = castPath(t, e);
    for (var n = 0, r = t.length; e != null && n < r; ) e = e[toKey(t[n++])];
    return n && n == r ? e : void 0;
  }
  function get(e, t, n) {
    var r = e == null ? void 0 : baseGet(e, t);
    return r === void 0 ? n : r;
  }
  function arrayPush(e, t) {
    for (var n = -1, r = t.length, i = e.length; ++n < r; ) e[i + n] = t[n];
    return e;
  }
  var spreadableSymbol = Symbol$2 ? Symbol$2.isConcatSpreadable : void 0;
  function isFlattenable(e) {
    return (
      isArray$2(e) ||
      isArguments$1(e) ||
      !!(spreadableSymbol && e && e[spreadableSymbol])
    );
  }
  function baseFlatten(e, t, n, r, i) {
    var g = -1,
      y = e.length;
    for (n || (n = isFlattenable), i || (i = []); ++g < y; ) {
      var $ = e[g];
      t > 0 && n($)
        ? t > 1
          ? baseFlatten($, t - 1, n, r, i)
          : arrayPush(i, $)
        : r || (i[i.length] = $);
    }
    return i;
  }
  function flatten(e) {
    var t = e == null ? 0 : e.length;
    return t ? baseFlatten(e, 1) : [];
  }
  function flatRest(e) {
    return setToString$1(overRest(e, void 0, flatten), e + "");
  }
  function castArray() {
    if (!arguments.length) return [];
    var e = arguments[0];
    return isArray$2(e) ? e : [e];
  }
  function stackClear() {
    (this.__data__ = new ListCache()), (this.size = 0);
  }
  function stackDelete(e) {
    var t = this.__data__,
      n = t.delete(e);
    return (this.size = t.size), n;
  }
  function stackGet(e) {
    return this.__data__.get(e);
  }
  function stackHas(e) {
    return this.__data__.has(e);
  }
  var LARGE_ARRAY_SIZE = 200;
  function stackSet(e, t) {
    var n = this.__data__;
    if (n instanceof ListCache) {
      var r = n.__data__;
      if (!Map$2 || r.length < LARGE_ARRAY_SIZE - 1)
        return r.push([e, t]), (this.size = ++n.size), this;
      n = this.__data__ = new MapCache(r);
    }
    return n.set(e, t), (this.size = n.size), this;
  }
  function Stack(e) {
    var t = (this.__data__ = new ListCache(e));
    this.size = t.size;
  }
  Stack.prototype.clear = stackClear;
  Stack.prototype.delete = stackDelete;
  Stack.prototype.get = stackGet;
  Stack.prototype.has = stackHas;
  Stack.prototype.set = stackSet;
  function arrayFilter(e, t) {
    for (var n = -1, r = e == null ? 0 : e.length, i = 0, g = []; ++n < r; ) {
      var y = e[n];
      t(y, n, e) && (g[i++] = y);
    }
    return g;
  }
  function stubArray() {
    return [];
  }
  var objectProto$2 = Object.prototype,
    propertyIsEnumerable = objectProto$2.propertyIsEnumerable,
    nativeGetSymbols = Object.getOwnPropertySymbols,
    getSymbols = nativeGetSymbols
      ? function (e) {
          return e == null
            ? []
            : ((e = Object(e)),
              arrayFilter(nativeGetSymbols(e), function (t) {
                return propertyIsEnumerable.call(e, t);
              }));
        }
      : stubArray;
  const getSymbols$1 = getSymbols;
  function baseGetAllKeys(e, t, n) {
    var r = t(e);
    return isArray$2(e) ? r : arrayPush(r, n(e));
  }
  function getAllKeys(e) {
    return baseGetAllKeys(e, keys, getSymbols$1);
  }
  var DataView = getNative(root$1, "DataView");
  const DataView$1 = DataView;
  var Promise$1 = getNative(root$1, "Promise");
  const Promise$2 = Promise$1;
  var Set$1 = getNative(root$1, "Set");
  const Set$2 = Set$1;
  var mapTag$1 = "[object Map]",
    objectTag$1 = "[object Object]",
    promiseTag = "[object Promise]",
    setTag$1 = "[object Set]",
    weakMapTag = "[object WeakMap]",
    dataViewTag$1 = "[object DataView]",
    dataViewCtorString = toSource(DataView$1),
    mapCtorString = toSource(Map$2),
    promiseCtorString = toSource(Promise$2),
    setCtorString = toSource(Set$2),
    weakMapCtorString = toSource(WeakMap$2),
    getTag = baseGetTag;
  ((DataView$1 &&
    getTag(new DataView$1(new ArrayBuffer(1))) != dataViewTag$1) ||
    (Map$2 && getTag(new Map$2()) != mapTag$1) ||
    (Promise$2 && getTag(Promise$2.resolve()) != promiseTag) ||
    (Set$2 && getTag(new Set$2()) != setTag$1) ||
    (WeakMap$2 && getTag(new WeakMap$2()) != weakMapTag)) &&
    (getTag = function (e) {
      var t = baseGetTag(e),
        n = t == objectTag$1 ? e.constructor : void 0,
        r = n ? toSource(n) : "";
      if (r)
        switch (r) {
          case dataViewCtorString:
            return dataViewTag$1;
          case mapCtorString:
            return mapTag$1;
          case promiseCtorString:
            return promiseTag;
          case setCtorString:
            return setTag$1;
          case weakMapCtorString:
            return weakMapTag;
        }
      return t;
    });
  const getTag$1 = getTag;
  var Uint8Array$1 = root$1.Uint8Array;
  const Uint8Array$2 = Uint8Array$1;
  var HASH_UNDEFINED = "__lodash_hash_undefined__";
  function setCacheAdd(e) {
    return this.__data__.set(e, HASH_UNDEFINED), this;
  }
  function setCacheHas(e) {
    return this.__data__.has(e);
  }
  function SetCache(e) {
    var t = -1,
      n = e == null ? 0 : e.length;
    for (this.__data__ = new MapCache(); ++t < n; ) this.add(e[t]);
  }
  SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
  SetCache.prototype.has = setCacheHas;
  function arraySome(e, t) {
    for (var n = -1, r = e == null ? 0 : e.length; ++n < r; )
      if (t(e[n], n, e)) return !0;
    return !1;
  }
  function cacheHas(e, t) {
    return e.has(t);
  }
  var COMPARE_PARTIAL_FLAG$5 = 1,
    COMPARE_UNORDERED_FLAG$3 = 2;
  function equalArrays(e, t, n, r, i, g) {
    var y = n & COMPARE_PARTIAL_FLAG$5,
      $ = e.length,
      k = t.length;
    if ($ != k && !(y && k > $)) return !1;
    var V = g.get(e),
      L = g.get(t);
    if (V && L) return V == t && L == e;
    var oe = -1,
      j = !0,
      ae = n & COMPARE_UNORDERED_FLAG$3 ? new SetCache() : void 0;
    for (g.set(e, t), g.set(t, e); ++oe < $; ) {
      var z = e[oe],
        re = t[oe];
      if (r) var ie = y ? r(re, z, oe, t, e, g) : r(z, re, oe, e, t, g);
      if (ie !== void 0) {
        if (ie) continue;
        j = !1;
        break;
      }
      if (ae) {
        if (
          !arraySome(t, function (le, de) {
            if (!cacheHas(ae, de) && (z === le || i(z, le, n, r, g)))
              return ae.push(de);
          })
        ) {
          j = !1;
          break;
        }
      } else if (!(z === re || i(z, re, n, r, g))) {
        j = !1;
        break;
      }
    }
    return g.delete(e), g.delete(t), j;
  }
  function mapToArray(e) {
    var t = -1,
      n = Array(e.size);
    return (
      e.forEach(function (r, i) {
        n[++t] = [i, r];
      }),
      n
    );
  }
  function setToArray(e) {
    var t = -1,
      n = Array(e.size);
    return (
      e.forEach(function (r) {
        n[++t] = r;
      }),
      n
    );
  }
  var COMPARE_PARTIAL_FLAG$4 = 1,
    COMPARE_UNORDERED_FLAG$2 = 2,
    boolTag = "[object Boolean]",
    dateTag = "[object Date]",
    errorTag = "[object Error]",
    mapTag = "[object Map]",
    numberTag = "[object Number]",
    regexpTag = "[object RegExp]",
    setTag = "[object Set]",
    stringTag = "[object String]",
    symbolTag = "[object Symbol]",
    arrayBufferTag = "[object ArrayBuffer]",
    dataViewTag = "[object DataView]",
    symbolProto = Symbol$2 ? Symbol$2.prototype : void 0,
    symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
  function equalByTag(e, t, n, r, i, g, y) {
    switch (n) {
      case dataViewTag:
        if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
          return !1;
        (e = e.buffer), (t = t.buffer);
      case arrayBufferTag:
        return !(
          e.byteLength != t.byteLength ||
          !g(new Uint8Array$2(e), new Uint8Array$2(t))
        );
      case boolTag:
      case dateTag:
      case numberTag:
        return eq(+e, +t);
      case errorTag:
        return e.name == t.name && e.message == t.message;
      case regexpTag:
      case stringTag:
        return e == t + "";
      case mapTag:
        var $ = mapToArray;
      case setTag:
        var k = r & COMPARE_PARTIAL_FLAG$4;
        if (($ || ($ = setToArray), e.size != t.size && !k)) return !1;
        var V = y.get(e);
        if (V) return V == t;
        (r |= COMPARE_UNORDERED_FLAG$2), y.set(e, t);
        var L = equalArrays($(e), $(t), r, i, g, y);
        return y.delete(e), L;
      case symbolTag:
        if (symbolValueOf)
          return symbolValueOf.call(e) == symbolValueOf.call(t);
    }
    return !1;
  }
  var COMPARE_PARTIAL_FLAG$3 = 1,
    objectProto$1 = Object.prototype,
    hasOwnProperty$2 = objectProto$1.hasOwnProperty;
  function equalObjects(e, t, n, r, i, g) {
    var y = n & COMPARE_PARTIAL_FLAG$3,
      $ = getAllKeys(e),
      k = $.length,
      V = getAllKeys(t),
      L = V.length;
    if (k != L && !y) return !1;
    for (var oe = k; oe--; ) {
      var j = $[oe];
      if (!(y ? j in t : hasOwnProperty$2.call(t, j))) return !1;
    }
    var ae = g.get(e),
      z = g.get(t);
    if (ae && z) return ae == t && z == e;
    var re = !0;
    g.set(e, t), g.set(t, e);
    for (var ie = y; ++oe < k; ) {
      j = $[oe];
      var le = e[j],
        de = t[j];
      if (r) var ue = y ? r(de, le, j, t, e, g) : r(le, de, j, e, t, g);
      if (!(ue === void 0 ? le === de || i(le, de, n, r, g) : ue)) {
        re = !1;
        break;
      }
      ie || (ie = j == "constructor");
    }
    if (re && !ie) {
      var pe = e.constructor,
        Ce = t.constructor;
      pe != Ce &&
        "constructor" in e &&
        "constructor" in t &&
        !(
          typeof pe == "function" &&
          pe instanceof pe &&
          typeof Ce == "function" &&
          Ce instanceof Ce
        ) &&
        (re = !1);
    }
    return g.delete(e), g.delete(t), re;
  }
  var COMPARE_PARTIAL_FLAG$2 = 1,
    argsTag = "[object Arguments]",
    arrayTag = "[object Array]",
    objectTag = "[object Object]",
    objectProto = Object.prototype,
    hasOwnProperty$1 = objectProto.hasOwnProperty;
  function baseIsEqualDeep(e, t, n, r, i, g) {
    var y = isArray$2(e),
      $ = isArray$2(t),
      k = y ? arrayTag : getTag$1(e),
      V = $ ? arrayTag : getTag$1(t);
    (k = k == argsTag ? objectTag : k), (V = V == argsTag ? objectTag : V);
    var L = k == objectTag,
      oe = V == objectTag,
      j = k == V;
    if (j && isBuffer$2(e)) {
      if (!isBuffer$2(t)) return !1;
      (y = !0), (L = !1);
    }
    if (j && !L)
      return (
        g || (g = new Stack()),
        y || isTypedArray$2(e)
          ? equalArrays(e, t, n, r, i, g)
          : equalByTag(e, t, k, n, r, i, g)
      );
    if (!(n & COMPARE_PARTIAL_FLAG$2)) {
      var ae = L && hasOwnProperty$1.call(e, "__wrapped__"),
        z = oe && hasOwnProperty$1.call(t, "__wrapped__");
      if (ae || z) {
        var re = ae ? e.value() : e,
          ie = z ? t.value() : t;
        return g || (g = new Stack()), i(re, ie, n, r, g);
      }
    }
    return j ? (g || (g = new Stack()), equalObjects(e, t, n, r, i, g)) : !1;
  }
  function baseIsEqual(e, t, n, r, i) {
    return e === t
      ? !0
      : e == null || t == null || (!isObjectLike(e) && !isObjectLike(t))
      ? e !== e && t !== t
      : baseIsEqualDeep(e, t, n, r, baseIsEqual, i);
  }
  var COMPARE_PARTIAL_FLAG$1 = 1,
    COMPARE_UNORDERED_FLAG$1 = 2;
  function baseIsMatch(e, t, n, r) {
    var i = n.length,
      g = i,
      y = !r;
    if (e == null) return !g;
    for (e = Object(e); i--; ) {
      var $ = n[i];
      if (y && $[2] ? $[1] !== e[$[0]] : !($[0] in e)) return !1;
    }
    for (; ++i < g; ) {
      $ = n[i];
      var k = $[0],
        V = e[k],
        L = $[1];
      if (y && $[2]) {
        if (V === void 0 && !(k in e)) return !1;
      } else {
        var oe = new Stack();
        if (r) var j = r(V, L, k, e, t, oe);
        if (
          !(j === void 0
            ? baseIsEqual(
                L,
                V,
                COMPARE_PARTIAL_FLAG$1 | COMPARE_UNORDERED_FLAG$1,
                r,
                oe
              )
            : j)
        )
          return !1;
      }
    }
    return !0;
  }
  function isStrictComparable(e) {
    return e === e && !isObject$2(e);
  }
  function getMatchData(e) {
    for (var t = keys(e), n = t.length; n--; ) {
      var r = t[n],
        i = e[r];
      t[n] = [r, i, isStrictComparable(i)];
    }
    return t;
  }
  function matchesStrictComparable(e, t) {
    return function (n) {
      return n == null ? !1 : n[e] === t && (t !== void 0 || e in Object(n));
    };
  }
  function baseMatches(e) {
    var t = getMatchData(e);
    return t.length == 1 && t[0][2]
      ? matchesStrictComparable(t[0][0], t[0][1])
      : function (n) {
          return n === e || baseIsMatch(n, e, t);
        };
  }
  function baseHasIn(e, t) {
    return e != null && t in Object(e);
  }
  function hasPath(e, t, n) {
    t = castPath(t, e);
    for (var r = -1, i = t.length, g = !1; ++r < i; ) {
      var y = toKey(t[r]);
      if (!(g = e != null && n(e, y))) break;
      e = e[y];
    }
    return g || ++r != i
      ? g
      : ((i = e == null ? 0 : e.length),
        !!i &&
          isLength(i) &&
          isIndex(y, i) &&
          (isArray$2(e) || isArguments$1(e)));
  }
  function hasIn(e, t) {
    return e != null && hasPath(e, t, baseHasIn);
  }
  var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;
  function baseMatchesProperty(e, t) {
    return isKey(e) && isStrictComparable(t)
      ? matchesStrictComparable(toKey(e), t)
      : function (n) {
          var r = get(n, e);
          return r === void 0 && r === t
            ? hasIn(n, e)
            : baseIsEqual(t, r, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
        };
  }
  function baseProperty(e) {
    return function (t) {
      return t == null ? void 0 : t[e];
    };
  }
  function basePropertyDeep(e) {
    return function (t) {
      return baseGet(t, e);
    };
  }
  function property(e) {
    return isKey(e) ? baseProperty(toKey(e)) : basePropertyDeep(e);
  }
  function baseIteratee(e) {
    return typeof e == "function"
      ? e
      : e == null
      ? identity$2
      : typeof e == "object"
      ? isArray$2(e)
        ? baseMatchesProperty(e[0], e[1])
        : baseMatches(e)
      : property(e);
  }
  function createBaseFor(e) {
    return function (t, n, r) {
      for (var i = -1, g = Object(t), y = r(t), $ = y.length; $--; ) {
        var k = y[e ? $ : ++i];
        if (n(g[k], k, g) === !1) break;
      }
      return t;
    };
  }
  var baseFor = createBaseFor();
  const baseFor$1 = baseFor;
  function baseForOwn(e, t) {
    return e && baseFor$1(e, t, keys);
  }
  function createBaseEach(e, t) {
    return function (n, r) {
      if (n == null) return n;
      if (!isArrayLike(n)) return e(n, r);
      for (
        var i = n.length, g = t ? i : -1, y = Object(n);
        (t ? g-- : ++g < i) && r(y[g], g, y) !== !1;

      );
      return n;
    };
  }
  var baseEach = createBaseEach(baseForOwn);
  const baseEach$1 = baseEach;
  var now = function () {
    return root$1.Date.now();
  };
  const now$1 = now;
  var FUNC_ERROR_TEXT = "Expected a function",
    nativeMax = Math.max,
    nativeMin = Math.min;
  function debounce(e, t, n) {
    var r,
      i,
      g,
      y,
      $,
      k,
      V = 0,
      L = !1,
      oe = !1,
      j = !0;
    if (typeof e != "function") throw new TypeError(FUNC_ERROR_TEXT);
    (t = toNumber(t) || 0),
      isObject$2(n) &&
        ((L = !!n.leading),
        (oe = "maxWait" in n),
        (g = oe ? nativeMax(toNumber(n.maxWait) || 0, t) : g),
        (j = "trailing" in n ? !!n.trailing : j));
    function ae(Oe) {
      var he = r,
        $e = i;
      return (r = i = void 0), (V = Oe), (y = e.apply($e, he)), y;
    }
    function z(Oe) {
      return (V = Oe), ($ = setTimeout(le, t)), L ? ae(Oe) : y;
    }
    function re(Oe) {
      var he = Oe - k,
        $e = Oe - V,
        Ve = t - he;
      return oe ? nativeMin(Ve, g - $e) : Ve;
    }
    function ie(Oe) {
      var he = Oe - k,
        $e = Oe - V;
      return k === void 0 || he >= t || he < 0 || (oe && $e >= g);
    }
    function le() {
      var Oe = now$1();
      if (ie(Oe)) return de(Oe);
      $ = setTimeout(le, re(Oe));
    }
    function de(Oe) {
      return ($ = void 0), j && r ? ae(Oe) : ((r = i = void 0), y);
    }
    function ue() {
      $ !== void 0 && clearTimeout($), (V = 0), (r = k = i = $ = void 0);
    }
    function pe() {
      return $ === void 0 ? y : de(now$1());
    }
    function Ce() {
      var Oe = now$1(),
        he = ie(Oe);
      if (((r = arguments), (i = this), (k = Oe), he)) {
        if ($ === void 0) return z(k);
        if (oe) return clearTimeout($), ($ = setTimeout(le, t)), ae(k);
      }
      return $ === void 0 && ($ = setTimeout(le, t)), y;
    }
    return (Ce.cancel = ue), (Ce.flush = pe), Ce;
  }
  function baseMap(e, t) {
    var n = -1,
      r = isArrayLike(e) ? Array(e.length) : [];
    return (
      baseEach$1(e, function (i, g, y) {
        r[++n] = t(i, g, y);
      }),
      r
    );
  }
  function map(e, t) {
    var n = isArray$2(e) ? arrayMap : baseMap;
    return n(e, baseIteratee(t));
  }
  function flatMap(e, t) {
    return baseFlatten(map(e, t), 1);
  }
  function fromPairs(e) {
    for (var t = -1, n = e == null ? 0 : e.length, r = {}; ++t < n; ) {
      var i = e[t];
      r[i[0]] = i[1];
    }
    return r;
  }
  function isEqual(e, t) {
    return baseIsEqual(e, t);
  }
  function isNil(e) {
    return e == null;
  }
  function baseSet(e, t, n, r) {
    if (!isObject$2(e)) return e;
    t = castPath(t, e);
    for (var i = -1, g = t.length, y = g - 1, $ = e; $ != null && ++i < g; ) {
      var k = toKey(t[i]),
        V = n;
      if (k === "__proto__" || k === "constructor" || k === "prototype")
        return e;
      if (i != y) {
        var L = $[k];
        (V = r ? r(L, k, $) : void 0),
          V === void 0 && (V = isObject$2(L) ? L : isIndex(t[i + 1]) ? [] : {});
      }
      assignValue($, k, V), ($ = $[k]);
    }
    return e;
  }
  function basePickBy(e, t, n) {
    for (var r = -1, i = t.length, g = {}; ++r < i; ) {
      var y = t[r],
        $ = baseGet(e, y);
      n($, y) && baseSet(g, castPath(y, e), $);
    }
    return g;
  }
  function basePick(e, t) {
    return basePickBy(e, t, function (n, r) {
      return hasIn(e, r);
    });
  }
  var pick = flatRest(function (e, t) {
    return e == null ? {} : basePick(e, t);
  });
  const pick$1 = pick;
  function set(e, t, n) {
    return e == null ? e : baseSet(e, t, n);
  }
  const FOCUSABLE_ELEMENT_SELECTORS =
      'a[href],button:not([disabled]),button:not([hidden]),:not([tabindex="-1"]),input:not([disabled]),input:not([type="hidden"]),select:not([disabled]),textarea:not([disabled])',
    isVisible = (e) =>
      getComputedStyle(e).position === "fixed" ? !1 : e.offsetParent !== null,
    obtainAllFocusableElements$1 = (e) =>
      Array.from(e.querySelectorAll(FOCUSABLE_ELEMENT_SELECTORS)).filter(
        (t) => isFocusable(t) && isVisible(t)
      ),
    isFocusable = (e) => {
      if (
        e.tabIndex > 0 ||
        (e.tabIndex === 0 && e.getAttribute("tabIndex") !== null)
      )
        return !0;
      if (e.disabled) return !1;
      switch (e.nodeName) {
        case "A":
          return !!e.href && e.rel !== "ignore";
        case "INPUT":
          return !(e.type === "hidden" || e.type === "file");
        case "BUTTON":
        case "SELECT":
        case "TEXTAREA":
          return !0;
        default:
          return !1;
      }
    },
    composeEventHandlers =
      (e, t, { checkForDefaultPrevented: n = !0 } = {}) =>
      (i) => {
        const g = e == null ? void 0 : e(i);
        if (n === !1 || !g) return t == null ? void 0 : t(i);
      };
  var _a$1;
  const isClient$1 = typeof window < "u",
    isBoolean$1 = (e) => typeof e == "boolean",
    isNumber$1 = (e) => typeof e == "number",
    isString$2 = (e) => typeof e == "string",
    noop$2 = () => {};
  isClient$1 &&
    (_a$1 = window == null ? void 0 : window.navigator) != null &&
    _a$1.userAgent &&
    /iP(ad|hone|od)/.test(window.navigator.userAgent);
  function resolveUnref$1(e) {
    return typeof e == "function" ? e() : unref(e);
  }
  function identity$1(e) {
    return e;
  }
  function tryOnScopeDispose$1(e) {
    return getCurrentScope() ? (onScopeDispose(e), !0) : !1;
  }
  function tryOnMounted$1(e, t = !0) {
    getCurrentInstance() ? onMounted(e) : t ? e() : nextTick(e);
  }
  function useTimeoutFn(e, t, n = {}) {
    const { immediate: r = !0 } = n,
      i = ref(!1);
    let g = null;
    function y() {
      g && (clearTimeout(g), (g = null));
    }
    function $() {
      (i.value = !1), y();
    }
    function k(...V) {
      y(),
        (i.value = !0),
        (g = setTimeout(() => {
          (i.value = !1), (g = null), e(...V);
        }, resolveUnref$1(t)));
    }
    return (
      r && ((i.value = !0), isClient$1 && k()),
      tryOnScopeDispose$1($),
      { isPending: i, start: k, stop: $ }
    );
  }
  function unrefElement$1(e) {
    var t;
    const n = resolveUnref$1(e);
    return (t = n == null ? void 0 : n.$el) != null ? t : n;
  }
  const defaultWindow$1 = isClient$1 ? window : void 0;
  function useEventListener$1(...e) {
    let t, n, r, i;
    if (
      (isString$2(e[0]) || Array.isArray(e[0])
        ? (([n, r, i] = e), (t = defaultWindow$1))
        : ([t, n, r, i] = e),
      !t)
    )
      return noop$2;
    Array.isArray(n) || (n = [n]), Array.isArray(r) || (r = [r]);
    const g = [],
      y = () => {
        g.forEach((L) => L()), (g.length = 0);
      },
      $ = (L, oe, j) => (
        L.addEventListener(oe, j, i), () => L.removeEventListener(oe, j, i)
      ),
      k = watch(
        () => unrefElement$1(t),
        (L) => {
          y(), L && g.push(...n.flatMap((oe) => r.map((j) => $(L, oe, j))));
        },
        { immediate: !0, flush: "post" }
      ),
      V = () => {
        k(), y();
      };
    return tryOnScopeDispose$1(V), V;
  }
  function onClickOutside(e, t, n = {}) {
    const {
      window: r = defaultWindow$1,
      ignore: i = [],
      capture: g = !0,
      detectIframe: y = !1,
    } = n;
    if (!r) return;
    let $ = !0,
      k;
    const V = (ae) =>
        i.some((z) => {
          if (typeof z == "string")
            return Array.from(r.document.querySelectorAll(z)).some(
              (re) => re === ae.target || ae.composedPath().includes(re)
            );
          {
            const re = unrefElement$1(z);
            return re && (ae.target === re || ae.composedPath().includes(re));
          }
        }),
      L = (ae) => {
        r.clearTimeout(k);
        const z = unrefElement$1(e);
        if (!(!z || z === ae.target || ae.composedPath().includes(z))) {
          if ((ae.detail === 0 && ($ = !V(ae)), !$)) {
            $ = !0;
            return;
          }
          t(ae);
        }
      },
      oe = [
        useEventListener$1(r, "click", L, { passive: !0, capture: g }),
        useEventListener$1(
          r,
          "pointerdown",
          (ae) => {
            const z = unrefElement$1(e);
            z && ($ = !ae.composedPath().includes(z) && !V(ae));
          },
          { passive: !0 }
        ),
        useEventListener$1(
          r,
          "pointerup",
          (ae) => {
            if (ae.button === 0) {
              const z = ae.composedPath();
              (ae.composedPath = () => z), (k = r.setTimeout(() => L(ae), 50));
            }
          },
          { passive: !0 }
        ),
        y &&
          useEventListener$1(r, "blur", (ae) => {
            var z;
            const re = unrefElement$1(e);
            ((z = r.document.activeElement) == null ? void 0 : z.tagName) ===
              "IFRAME" &&
              !(re != null && re.contains(r.document.activeElement)) &&
              t(ae);
          }),
      ].filter(Boolean);
    return () => oe.forEach((ae) => ae());
  }
  function useSupported$1(e, t = !1) {
    const n = ref(),
      r = () => (n.value = Boolean(e()));
    return r(), tryOnMounted$1(r, t), n;
  }
  const _global$2 =
      typeof globalThis < "u"
        ? globalThis
        : typeof window < "u"
        ? window
        : typeof global < "u"
        ? global
        : typeof self < "u"
        ? self
        : {},
    globalKey$1 = "__vueuse_ssr_handlers__";
  _global$2[globalKey$1] = _global$2[globalKey$1] || {};
  _global$2[globalKey$1];
  var __getOwnPropSymbols$f = Object.getOwnPropertySymbols,
    __hasOwnProp$f = Object.prototype.hasOwnProperty,
    __propIsEnum$f = Object.prototype.propertyIsEnumerable,
    __objRest$2 = (e, t) => {
      var n = {};
      for (var r in e)
        __hasOwnProp$f.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
      if (e != null && __getOwnPropSymbols$f)
        for (var r of __getOwnPropSymbols$f(e))
          t.indexOf(r) < 0 && __propIsEnum$f.call(e, r) && (n[r] = e[r]);
      return n;
    };
  function useResizeObserver(e, t, n = {}) {
    const r = n,
      { window: i = defaultWindow$1 } = r,
      g = __objRest$2(r, ["window"]);
    let y;
    const $ = useSupported$1(() => i && "ResizeObserver" in i),
      k = () => {
        y && (y.disconnect(), (y = void 0));
      },
      V = watch(
        () => unrefElement$1(e),
        (oe) => {
          k(),
            $.value &&
              i &&
              oe &&
              ((y = new ResizeObserver(t)), y.observe(oe, g));
        },
        { immediate: !0, flush: "post" }
      ),
      L = () => {
        k(), V();
      };
    return tryOnScopeDispose$1(L), { isSupported: $, stop: L };
  }
  var SwipeDirection$1;
  (function (e) {
    (e.UP = "UP"),
      (e.RIGHT = "RIGHT"),
      (e.DOWN = "DOWN"),
      (e.LEFT = "LEFT"),
      (e.NONE = "NONE");
  })(SwipeDirection$1 || (SwipeDirection$1 = {}));
  var __defProp$1 = Object.defineProperty,
    __getOwnPropSymbols$1 = Object.getOwnPropertySymbols,
    __hasOwnProp$1 = Object.prototype.hasOwnProperty,
    __propIsEnum$1 = Object.prototype.propertyIsEnumerable,
    __defNormalProp$1 = (e, t, n) =>
      t in e
        ? __defProp$1(e, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: n,
          })
        : (e[t] = n),
    __spreadValues$1 = (e, t) => {
      for (var n in t || (t = {}))
        __hasOwnProp$1.call(t, n) && __defNormalProp$1(e, n, t[n]);
      if (__getOwnPropSymbols$1)
        for (var n of __getOwnPropSymbols$1(t))
          __propIsEnum$1.call(t, n) && __defNormalProp$1(e, n, t[n]);
      return e;
    };
  const _TransitionPresets$1 = {
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
  __spreadValues$1({ linear: identity$1 }, _TransitionPresets$1);
  const isUndefined$1 = (e) => e === void 0,
    isElement = (e) => (typeof Element > "u" ? !1 : e instanceof Element),
    isStringNumber = (e) => (isString$3(e) ? !Number.isNaN(Number(e)) : !1),
    escapeStringRegexp = (e = "") =>
      e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d"),
    keysOf = (e) => Object.keys(e),
    getProp = (e, t, n) => ({
      get value() {
        return get(e, t, n);
      },
      set value(r) {
        set(e, t, r);
      },
    });
  class ElementPlusError extends Error {
    constructor(t) {
      super(t), (this.name = "ElementPlusError");
    }
  }
  function throwError(e, t) {
    throw new ElementPlusError(`[${e}] ${t}`);
  }
  function debugWarn(e, t) {}
  const classNameToArray = (e = "") => e.split(" ").filter((t) => !!t.trim()),
    hasClass = (e, t) => {
      if (!e || !t) return !1;
      if (t.includes(" "))
        throw new Error("className should not contain space.");
      return e.classList.contains(t);
    },
    addClass = (e, t) => {
      !e || !t.trim() || e.classList.add(...classNameToArray(t));
    },
    removeClass = (e, t) => {
      !e || !t.trim() || e.classList.remove(...classNameToArray(t));
    },
    getStyle = (e, t) => {
      var n;
      if (!isClient$1 || !e || !t) return "";
      let r = camelize(t);
      r === "float" && (r = "cssFloat");
      try {
        const i = e.style[r];
        if (i) return i;
        const g =
          (n = document.defaultView) == null
            ? void 0
            : n.getComputedStyle(e, "");
        return g ? g[r] : "";
      } catch {
        return e.style[r];
      }
    };
  function addUnit(e, t = "px") {
    if (!e) return "";
    if (isNumber$1(e) || isStringNumber(e)) return `${e}${t}`;
    if (isString$3(e)) return e;
  }
  let scrollBarWidth;
  const getScrollBarWidth = (e) => {
    var t;
    if (!isClient$1) return 0;
    if (scrollBarWidth !== void 0) return scrollBarWidth;
    const n = document.createElement("div");
    (n.className = `${e}-scrollbar__wrap`),
      (n.style.visibility = "hidden"),
      (n.style.width = "100px"),
      (n.style.position = "absolute"),
      (n.style.top = "-9999px"),
      document.body.appendChild(n);
    const r = n.offsetWidth;
    n.style.overflow = "scroll";
    const i = document.createElement("div");
    (i.style.width = "100%"), n.appendChild(i);
    const g = i.offsetWidth;
    return (
      (t = n.parentNode) == null || t.removeChild(n),
      (scrollBarWidth = r - g),
      scrollBarWidth
    );
  };
  function scrollIntoView(e, t) {
    if (!isClient$1) return;
    if (!t) {
      e.scrollTop = 0;
      return;
    }
    const n = [];
    let r = t.offsetParent;
    for (; r !== null && e !== r && e.contains(r); )
      n.push(r), (r = r.offsetParent);
    const i = t.offsetTop + n.reduce((k, V) => k + V.offsetTop, 0),
      g = i + t.offsetHeight,
      y = e.scrollTop,
      $ = y + e.clientHeight;
    i < y ? (e.scrollTop = i) : g > $ && (e.scrollTop = g - e.clientHeight);
  }
  /*! Element Plus Icons Vue v2.0.10 */ var export_helper_default = (e, t) => {
      let n = e.__vccOpts || e;
      for (let [r, i] of t) n[r] = i;
      return n;
    },
    arrow_down_vue_vue_type_script_lang_default = { name: "ArrowDown" },
    _hoisted_16$1 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg",
    },
    _hoisted_26$1 = createBaseVNode(
      "path",
      {
        fill: "currentColor",
        d: "M831.872 340.864 512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z",
      },
      null,
      -1
    ),
    _hoisted_36$1 = [_hoisted_26$1];
  function _sfc_render6(e, t, n, r, i, g) {
    return openBlock(), createElementBlock("svg", _hoisted_16$1, _hoisted_36$1);
  }
  var arrow_down_default = export_helper_default(
      arrow_down_vue_vue_type_script_lang_default,
      [
        ["render", _sfc_render6],
        ["__file", "arrow-down.vue"],
      ]
    ),
    arrow_right_vue_vue_type_script_lang_default = { name: "ArrowRight" },
    _hoisted_110 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg",
    },
    _hoisted_210 = createBaseVNode(
      "path",
      {
        fill: "currentColor",
        d: "M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z",
      },
      null,
      -1
    ),
    _hoisted_310 = [_hoisted_210];
  function _sfc_render10(e, t, n, r, i, g) {
    return openBlock(), createElementBlock("svg", _hoisted_110, _hoisted_310);
  }
  var arrow_right_default = export_helper_default(
      arrow_right_vue_vue_type_script_lang_default,
      [
        ["render", _sfc_render10],
        ["__file", "arrow-right.vue"],
      ]
    ),
    arrow_up_vue_vue_type_script_lang_default = { name: "ArrowUp" },
    _hoisted_112 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg",
    },
    _hoisted_212 = createBaseVNode(
      "path",
      {
        fill: "currentColor",
        d: "m488.832 344.32-339.84 356.672a32 32 0 0 0 0 44.16l.384.384a29.44 29.44 0 0 0 42.688 0l320-335.872 319.872 335.872a29.44 29.44 0 0 0 42.688 0l.384-.384a32 32 0 0 0 0-44.16L535.168 344.32a32 32 0 0 0-46.336 0z",
      },
      null,
      -1
    ),
    _hoisted_312 = [_hoisted_212];
  function _sfc_render12(e, t, n, r, i, g) {
    return openBlock(), createElementBlock("svg", _hoisted_112, _hoisted_312);
  }
  var arrow_up_default = export_helper_default(
      arrow_up_vue_vue_type_script_lang_default,
      [
        ["render", _sfc_render12],
        ["__file", "arrow-up.vue"],
      ]
    ),
    circle_check_vue_vue_type_script_lang_default = { name: "CircleCheck" },
    _hoisted_149 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg",
    },
    _hoisted_249 = createBaseVNode(
      "path",
      {
        fill: "currentColor",
        d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z",
      },
      null,
      -1
    ),
    _hoisted_348 = createBaseVNode(
      "path",
      {
        fill: "currentColor",
        d: "M745.344 361.344a32 32 0 0 1 45.312 45.312l-288 288a32 32 0 0 1-45.312 0l-160-160a32 32 0 1 1 45.312-45.312L480 626.752l265.344-265.408z",
      },
      null,
      -1
    ),
    _hoisted_415 = [_hoisted_249, _hoisted_348];
  function _sfc_render49(e, t, n, r, i, g) {
    return openBlock(), createElementBlock("svg", _hoisted_149, _hoisted_415);
  }
  var circle_check_default = export_helper_default(
      circle_check_vue_vue_type_script_lang_default,
      [
        ["render", _sfc_render49],
        ["__file", "circle-check.vue"],
      ]
    ),
    circle_close_filled_vue_vue_type_script_lang_default = {
      name: "CircleCloseFilled",
    },
    _hoisted_150 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg",
    },
    _hoisted_250 = createBaseVNode(
      "path",
      {
        fill: "currentColor",
        d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z",
      },
      null,
      -1
    ),
    _hoisted_349 = [_hoisted_250];
  function _sfc_render50(e, t, n, r, i, g) {
    return openBlock(), createElementBlock("svg", _hoisted_150, _hoisted_349);
  }
  var circle_close_filled_default = export_helper_default(
      circle_close_filled_vue_vue_type_script_lang_default,
      [
        ["render", _sfc_render50],
        ["__file", "circle-close-filled.vue"],
      ]
    ),
    circle_close_vue_vue_type_script_lang_default = { name: "CircleClose" },
    _hoisted_151 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg",
    },
    _hoisted_251 = createBaseVNode(
      "path",
      {
        fill: "currentColor",
        d: "m466.752 512-90.496-90.496a32 32 0 0 1 45.248-45.248L512 466.752l90.496-90.496a32 32 0 1 1 45.248 45.248L557.248 512l90.496 90.496a32 32 0 1 1-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 0 1-45.248-45.248L466.752 512z",
      },
      null,
      -1
    ),
    _hoisted_350 = createBaseVNode(
      "path",
      {
        fill: "currentColor",
        d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z",
      },
      null,
      -1
    ),
    _hoisted_416 = [_hoisted_251, _hoisted_350];
  function _sfc_render51(e, t, n, r, i, g) {
    return openBlock(), createElementBlock("svg", _hoisted_151, _hoisted_416);
  }
  var circle_close_default = export_helper_default(
      circle_close_vue_vue_type_script_lang_default,
      [
        ["render", _sfc_render51],
        ["__file", "circle-close.vue"],
      ]
    ),
    close_vue_vue_type_script_lang_default = { name: "Close" },
    _hoisted_156 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg",
    },
    _hoisted_256 = createBaseVNode(
      "path",
      {
        fill: "currentColor",
        d: "M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z",
      },
      null,
      -1
    ),
    _hoisted_355 = [_hoisted_256];
  function _sfc_render56(e, t, n, r, i, g) {
    return openBlock(), createElementBlock("svg", _hoisted_156, _hoisted_355);
  }
  var close_default = export_helper_default(
      close_vue_vue_type_script_lang_default,
      [
        ["render", _sfc_render56],
        ["__file", "close.vue"],
      ]
    ),
    hide_vue_vue_type_script_lang_default = { name: "Hide" },
    _hoisted_1133 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg",
    },
    _hoisted_2133 = createBaseVNode(
      "path",
      {
        d: "M876.8 156.8c0-9.6-3.2-16-9.6-22.4-6.4-6.4-12.8-9.6-22.4-9.6-9.6 0-16 3.2-22.4 9.6L736 220.8c-64-32-137.6-51.2-224-60.8-160 16-288 73.6-377.6 176C44.8 438.4 0 496 0 512s48 73.6 134.4 176c22.4 25.6 44.8 48 73.6 67.2l-86.4 89.6c-6.4 6.4-9.6 12.8-9.6 22.4 0 9.6 3.2 16 9.6 22.4 6.4 6.4 12.8 9.6 22.4 9.6 9.6 0 16-3.2 22.4-9.6l704-710.4c3.2-6.4 6.4-12.8 6.4-22.4Zm-646.4 528c-76.8-70.4-128-128-153.6-172.8 28.8-48 80-105.6 153.6-172.8C304 272 400 230.4 512 224c64 3.2 124.8 19.2 176 44.8l-54.4 54.4C598.4 300.8 560 288 512 288c-64 0-115.2 22.4-160 64s-64 96-64 160c0 48 12.8 89.6 35.2 124.8L256 707.2c-9.6-6.4-19.2-16-25.6-22.4Zm140.8-96c-12.8-22.4-19.2-48-19.2-76.8 0-44.8 16-83.2 48-112 32-28.8 67.2-48 112-48 28.8 0 54.4 6.4 73.6 19.2L371.2 588.8ZM889.599 336c-12.8-16-28.8-28.8-41.6-41.6l-48 48c73.6 67.2 124.8 124.8 150.4 169.6-28.8 48-80 105.6-153.6 172.8-73.6 67.2-172.8 108.8-284.8 115.2-51.2-3.2-99.2-12.8-140.8-28.8l-48 48c57.6 22.4 118.4 38.4 188.8 44.8 160-16 288-73.6 377.6-176C979.199 585.6 1024 528 1024 512s-48.001-73.6-134.401-176Z",
        fill: "currentColor",
      },
      null,
      -1
    ),
    _hoisted_3132 = createBaseVNode(
      "path",
      {
        d: "M511.998 672c-12.8 0-25.6-3.2-38.4-6.4l-51.2 51.2c28.8 12.8 57.6 19.2 89.6 19.2 64 0 115.2-22.4 160-64 41.6-41.6 64-96 64-160 0-32-6.4-64-19.2-89.6l-51.2 51.2c3.2 12.8 6.4 25.6 6.4 38.4 0 44.8-16 83.2-48 112-32 28.8-67.2 48-112 48Z",
        fill: "currentColor",
      },
      null,
      -1
    ),
    _hoisted_438 = [_hoisted_2133, _hoisted_3132];
  function _sfc_render133(e, t, n, r, i, g) {
    return openBlock(), createElementBlock("svg", _hoisted_1133, _hoisted_438);
  }
  var hide_default = export_helper_default(
      hide_vue_vue_type_script_lang_default,
      [
        ["render", _sfc_render133],
        ["__file", "hide.vue"],
      ]
    ),
    info_filled_vue_vue_type_script_lang_default = { name: "InfoFilled" },
    _hoisted_1143 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg",
    },
    _hoisted_2143 = createBaseVNode(
      "path",
      {
        fill: "currentColor",
        d: "M512 64a448 448 0 1 1 0 896.064A448 448 0 0 1 512 64zm67.2 275.072c33.28 0 60.288-23.104 60.288-57.344s-27.072-57.344-60.288-57.344c-33.28 0-60.16 23.104-60.16 57.344s26.88 57.344 60.16 57.344zM590.912 699.2c0-6.848 2.368-24.64 1.024-34.752l-52.608 60.544c-10.88 11.456-24.512 19.392-30.912 17.28a12.992 12.992 0 0 1-8.256-14.72l87.68-276.992c7.168-35.136-12.544-67.2-54.336-71.296-44.096 0-108.992 44.736-148.48 101.504 0 6.784-1.28 23.68.064 33.792l52.544-60.608c10.88-11.328 23.552-19.328 29.952-17.152a12.8 12.8 0 0 1 7.808 16.128L388.48 728.576c-10.048 32.256 8.96 63.872 55.04 71.04 67.84 0 107.904-43.648 147.456-100.416z",
      },
      null,
      -1
    ),
    _hoisted_3142 = [_hoisted_2143];
  function _sfc_render143(e, t, n, r, i, g) {
    return openBlock(), createElementBlock("svg", _hoisted_1143, _hoisted_3142);
  }
  var info_filled_default = export_helper_default(
      info_filled_vue_vue_type_script_lang_default,
      [
        ["render", _sfc_render143],
        ["__file", "info-filled.vue"],
      ]
    ),
    loading_vue_vue_type_script_lang_default = { name: "Loading" },
    _hoisted_1150 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg",
    },
    _hoisted_2150 = createBaseVNode(
      "path",
      {
        fill: "currentColor",
        d: "M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z",
      },
      null,
      -1
    ),
    _hoisted_3149 = [_hoisted_2150];
  function _sfc_render150(e, t, n, r, i, g) {
    return openBlock(), createElementBlock("svg", _hoisted_1150, _hoisted_3149);
  }
  var loading_default = export_helper_default(
      loading_vue_vue_type_script_lang_default,
      [
        ["render", _sfc_render150],
        ["__file", "loading.vue"],
      ]
    ),
    success_filled_vue_vue_type_script_lang_default = { name: "SuccessFilled" },
    _hoisted_1249 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg",
    },
    _hoisted_2249 = createBaseVNode(
      "path",
      {
        fill: "currentColor",
        d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z",
      },
      null,
      -1
    ),
    _hoisted_3248 = [_hoisted_2249];
  function _sfc_render249(e, t, n, r, i, g) {
    return openBlock(), createElementBlock("svg", _hoisted_1249, _hoisted_3248);
  }
  var success_filled_default = export_helper_default(
      success_filled_vue_vue_type_script_lang_default,
      [
        ["render", _sfc_render249],
        ["__file", "success-filled.vue"],
      ]
    ),
    view_vue_vue_type_script_lang_default = { name: "View" },
    _hoisted_1283 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg",
    },
    _hoisted_2283 = createBaseVNode(
      "path",
      {
        fill: "currentColor",
        d: "M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z",
      },
      null,
      -1
    ),
    _hoisted_3282 = [_hoisted_2283];
  function _sfc_render283(e, t, n, r, i, g) {
    return openBlock(), createElementBlock("svg", _hoisted_1283, _hoisted_3282);
  }
  var view_default = export_helper_default(
      view_vue_vue_type_script_lang_default,
      [
        ["render", _sfc_render283],
        ["__file", "view.vue"],
      ]
    ),
    warning_filled_vue_vue_type_script_lang_default = { name: "WarningFilled" },
    _hoisted_1287 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg",
    },
    _hoisted_2287 = createBaseVNode(
      "path",
      {
        fill: "currentColor",
        d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 192a58.432 58.432 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.432 58.432 0 0 0 512 256zm0 512a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4z",
      },
      null,
      -1
    ),
    _hoisted_3286 = [_hoisted_2287];
  function _sfc_render287(e, t, n, r, i, g) {
    return openBlock(), createElementBlock("svg", _hoisted_1287, _hoisted_3286);
  }
  var warning_filled_default = export_helper_default(
    warning_filled_vue_vue_type_script_lang_default,
    [
      ["render", _sfc_render287],
      ["__file", "warning-filled.vue"],
    ]
  );
  const epPropKey = "__epPropKey",
    definePropType = (e) => e,
    isEpProp = (e) => isObject$3(e) && !!e[epPropKey],
    buildProp = (e, t) => {
      if (!isObject$3(e) || isEpProp(e)) return e;
      const { values: n, required: r, default: i, type: g, validator: y } = e,
        k = {
          type: g,
          required: !!r,
          validator:
            n || y
              ? (V) => {
                  let L = !1,
                    oe = [];
                  if (
                    (n &&
                      ((oe = Array.from(n)),
                      hasOwn(e, "default") && oe.push(i),
                      L || (L = oe.includes(V))),
                    y && (L || (L = y(V))),
                    !L && oe.length > 0)
                  ) {
                    const j = [...new Set(oe)]
                      .map((ae) => JSON.stringify(ae))
                      .join(", ");
                    warn(
                      `Invalid prop: validation failed${
                        t ? ` for prop "${t}"` : ""
                      }. Expected one of [${j}], got value ${JSON.stringify(
                        V
                      )}.`
                    );
                  }
                  return L;
                }
              : void 0,
          [epPropKey]: !0,
        };
      return hasOwn(e, "default") && (k.default = i), k;
    },
    buildProps = (e) =>
      fromPairs(Object.entries(e).map(([t, n]) => [t, buildProp(n, t)])),
    iconPropType = definePropType([String, Object, Function]),
    CloseComponents = { Close: close_default },
    TypeComponents = {
      Close: close_default,
      SuccessFilled: success_filled_default,
      InfoFilled: info_filled_default,
      WarningFilled: warning_filled_default,
      CircleCloseFilled: circle_close_filled_default,
    },
    TypeComponentsMap = {
      success: success_filled_default,
      warning: warning_filled_default,
      error: circle_close_filled_default,
      info: info_filled_default,
    },
    ValidateComponentsMap = {
      validating: loading_default,
      success: circle_check_default,
      error: circle_close_default,
    },
    withInstall = (e, t) => {
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
    withInstallFunction = (e, t) => (
      (e.install = (n) => {
        (e._context = n._context), (n.config.globalProperties[t] = e);
      }),
      e
    ),
    withNoopInstall = (e) => ((e.install = NOOP), e),
    composeRefs =
      (...e) =>
      (t) => {
        e.forEach((n) => {
          isFunction$3(n) ? n(t) : (n.value = t);
        });
      },
    EVENT_CODE = {
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
    UPDATE_MODEL_EVENT = "update:modelValue",
    CHANGE_EVENT = "change",
    INPUT_EVENT = "input",
    componentSizes = ["", "default", "small", "large"],
    componentSizeMap = { large: 40, default: 32, small: 24 },
    getComponentSize = (e) => componentSizeMap[e || "default"],
    isValidComponentSize = (e) => ["", ...componentSizes].includes(e);
  var PatchFlags = ((e) => (
    (e[(e.TEXT = 1)] = "TEXT"),
    (e[(e.CLASS = 2)] = "CLASS"),
    (e[(e.STYLE = 4)] = "STYLE"),
    (e[(e.PROPS = 8)] = "PROPS"),
    (e[(e.FULL_PROPS = 16)] = "FULL_PROPS"),
    (e[(e.HYDRATE_EVENTS = 32)] = "HYDRATE_EVENTS"),
    (e[(e.STABLE_FRAGMENT = 64)] = "STABLE_FRAGMENT"),
    (e[(e.KEYED_FRAGMENT = 128)] = "KEYED_FRAGMENT"),
    (e[(e.UNKEYED_FRAGMENT = 256)] = "UNKEYED_FRAGMENT"),
    (e[(e.NEED_PATCH = 512)] = "NEED_PATCH"),
    (e[(e.DYNAMIC_SLOTS = 1024)] = "DYNAMIC_SLOTS"),
    (e[(e.HOISTED = -1)] = "HOISTED"),
    (e[(e.BAIL = -2)] = "BAIL"),
    e
  ))(PatchFlags || {});
  const isKorean = (e) => /([(\uAC00-\uD7AF)|(\u3130-\u318F)])+/gi.test(e),
    generateId = () => Math.floor(Math.random() * 1e4),
    mutable = (e) => e,
    DEFAULT_EXCLUDE_KEYS = ["class", "style"],
    LISTENER_PREFIX = /^on[A-Z]/,
    useAttrs = (e = {}) => {
      const { excludeListeners: t = !1, excludeKeys: n } = e,
        r = computed(() =>
          ((n == null ? void 0 : n.value) || []).concat(DEFAULT_EXCLUDE_KEYS)
        ),
        i = getCurrentInstance();
      return computed(
        i
          ? () => {
              var g;
              return fromPairs(
                Object.entries(
                  (g = i.proxy) == null ? void 0 : g.$attrs
                ).filter(
                  ([y]) =>
                    !r.value.includes(y) && !(t && LISTENER_PREFIX.test(y))
                )
              );
            }
          : () => ({})
      );
    },
    buttonGroupContextKey = Symbol("buttonGroupContextKey"),
    checkboxGroupContextKey = Symbol("checkboxGroupContextKey"),
    collapseContextKey = Symbol("collapseContextKey"),
    configProviderContextKey = Symbol(),
    dialogInjectionKey = Symbol("dialogInjectionKey"),
    formContextKey = Symbol("formContextKey"),
    formItemContextKey = Symbol("formItemContextKey"),
    scrollbarContextKey = Symbol("scrollbarContextKey"),
    POPPER_INJECTION_KEY = Symbol("popper"),
    POPPER_CONTENT_INJECTION_KEY = Symbol("popperContent"),
    TOOLTIP_INJECTION_KEY = Symbol("elTooltip"),
    useProp = (e) => {
      const t = getCurrentInstance();
      return computed(() => {
        var n, r;
        return (r = ((n = t.proxy) == null ? void 0 : n.$props)[e]) != null
          ? r
          : void 0;
      });
    },
    globalConfig = ref();
  function useGlobalConfig(e, t = void 0) {
    const n = getCurrentInstance()
      ? inject(configProviderContextKey, globalConfig)
      : globalConfig;
    return e
      ? computed(() => {
          var r, i;
          return (i = (r = n.value) == null ? void 0 : r[e]) != null ? i : t;
        })
      : n;
  }
  const provideGlobalConfig = (e, t, n = !1) => {
      var r;
      const i = !!getCurrentInstance(),
        g = i ? useGlobalConfig() : void 0,
        y =
          (r = t == null ? void 0 : t.provide) != null
            ? r
            : i
            ? provide
            : void 0;
      if (!y) return;
      const $ = computed(() => {
        const k = unref(e);
        return g != null && g.value ? mergeConfig$1(g.value, k) : k;
      });
      return (
        y(configProviderContextKey, $),
        (n || !globalConfig.value) && (globalConfig.value = $.value),
        $
      );
    },
    mergeConfig$1 = (e, t) => {
      var n;
      const r = [...new Set([...keysOf(e), ...keysOf(t)])],
        i = {};
      for (const g of r) i[g] = (n = t[g]) != null ? n : e[g];
      return i;
    },
    useSizeProp = buildProp({
      type: String,
      values: componentSizes,
      required: !1,
    }),
    useSize = (e, t = {}) => {
      const n = ref(void 0),
        r = t.prop ? n : useProp("size"),
        i = t.global ? n : useGlobalConfig("size"),
        g = t.form ? { size: void 0 } : inject(formContextKey, void 0),
        y = t.formItem ? { size: void 0 } : inject(formItemContextKey, void 0);
      return computed(
        () =>
          r.value ||
          unref(e) ||
          (y == null ? void 0 : y.size) ||
          (g == null ? void 0 : g.size) ||
          i.value ||
          ""
      );
    },
    useDisabled = (e) => {
      const t = useProp("disabled"),
        n = inject(formContextKey, void 0);
      return computed(
        () => t.value || unref(e) || (n == null ? void 0 : n.disabled) || !1
      );
    },
    useDeprecated = (
      {
        from: e,
        replacement: t,
        scope: n,
        version: r,
        ref: i,
        type: g = "API",
      },
      y
    ) => {
      watch(
        () => unref(y),
        ($) => {},
        { immediate: !0 }
      );
    },
    useDraggable = (e, t, n) => {
      let r = { offsetX: 0, offsetY: 0 };
      const i = ($) => {
          const k = $.clientX,
            V = $.clientY,
            { offsetX: L, offsetY: oe } = r,
            j = e.value.getBoundingClientRect(),
            ae = j.left,
            z = j.top,
            re = j.width,
            ie = j.height,
            le = document.documentElement.clientWidth,
            de = document.documentElement.clientHeight,
            ue = -ae + L,
            pe = -z + oe,
            Ce = le - ae - re + L,
            Oe = de - z - ie + oe,
            he = (Ve) => {
              const qe = Math.min(Math.max(L + Ve.clientX - k, ue), Ce),
                Cn = Math.min(Math.max(oe + Ve.clientY - V, pe), Oe);
              (r = { offsetX: qe, offsetY: Cn }),
                (e.value.style.transform = `translate(${addUnit(qe)}, ${addUnit(
                  Cn
                )})`);
            },
            $e = () => {
              document.removeEventListener("mousemove", he),
                document.removeEventListener("mouseup", $e);
            };
          document.addEventListener("mousemove", he),
            document.addEventListener("mouseup", $e);
        },
        g = () => {
          t.value && e.value && t.value.addEventListener("mousedown", i);
        },
        y = () => {
          t.value && e.value && t.value.removeEventListener("mousedown", i);
        };
      onMounted(() => {
        watchEffect(() => {
          n.value ? g() : y();
        });
      }),
        onBeforeUnmount(() => {
          y();
        });
    },
    useFocus = (e) => ({
      focus: () => {
        var t, n;
        (n = (t = e.value) == null ? void 0 : t.focus) == null || n.call(t);
      },
    }),
    defaultNamespace = "el",
    statePrefix = "is-",
    _bem = (e, t, n, r, i) => {
      let g = `${e}-${t}`;
      return n && (g += `-${n}`), r && (g += `__${r}`), i && (g += `--${i}`), g;
    },
    useNamespace = (e) => {
      const t = useGlobalConfig("namespace", defaultNamespace);
      return {
        namespace: t,
        b: (z = "") => _bem(t.value, e, z, "", ""),
        e: (z) => (z ? _bem(t.value, e, "", z, "") : ""),
        m: (z) => (z ? _bem(t.value, e, "", "", z) : ""),
        be: (z, re) => (z && re ? _bem(t.value, e, z, re, "") : ""),
        em: (z, re) => (z && re ? _bem(t.value, e, "", z, re) : ""),
        bm: (z, re) => (z && re ? _bem(t.value, e, z, "", re) : ""),
        bem: (z, re, ie) => (z && re && ie ? _bem(t.value, e, z, re, ie) : ""),
        is: (z, ...re) => {
          const ie = re.length >= 1 ? re[0] : !0;
          return z && ie ? `${statePrefix}${z}` : "";
        },
        cssVar: (z) => {
          const re = {};
          for (const ie in z) z[ie] && (re[`--${t.value}-${ie}`] = z[ie]);
          return re;
        },
        cssVarName: (z) => `--${t.value}-${z}`,
        cssVarBlock: (z) => {
          const re = {};
          for (const ie in z) z[ie] && (re[`--${t.value}-${e}-${ie}`] = z[ie]);
          return re;
        },
        cssVarBlockName: (z) => `--${t.value}-${e}-${z}`,
      };
    },
    defaultIdInjection = {
      prefix: Math.floor(Math.random() * 1e4),
      current: 0,
    },
    ID_INJECTION_KEY = Symbol("elIdInjection"),
    useIdInjection = () =>
      getCurrentInstance()
        ? inject(ID_INJECTION_KEY, defaultIdInjection)
        : defaultIdInjection,
    useId = (e) => {
      const t = useIdInjection(),
        n = useGlobalConfig("namespace", defaultNamespace);
      return computed(
        () => unref(e) || `${n.value}-id-${t.prefix}-${t.current++}`
      );
    },
    useFormItem = () => {
      const e = inject(formContextKey, void 0),
        t = inject(formItemContextKey, void 0);
      return { form: e, formItem: t };
    },
    useFormItemInputId = (
      e,
      { formItemContext: t, disableIdGeneration: n, disableIdManagement: r }
    ) => {
      n || (n = ref(!1)), r || (r = ref(!1));
      const i = ref();
      let g;
      const y = computed(() => {
        var $;
        return !!(
          !e.label &&
          t &&
          t.inputIds &&
          (($ = t.inputIds) == null ? void 0 : $.length) <= 1
        );
      });
      return (
        onMounted(() => {
          g = watch(
            [toRef(e, "id"), n],
            ([$, k]) => {
              const V = $ ?? (k ? void 0 : useId().value);
              V !== i.value &&
                (t != null &&
                  t.removeInputId &&
                  (i.value && t.removeInputId(i.value),
                  !(r != null && r.value) && !k && V && t.addInputId(V)),
                (i.value = V));
            },
            { immediate: !0 }
          );
        }),
        onUnmounted(() => {
          g && g(),
            t != null && t.removeInputId && i.value && t.removeInputId(i.value);
        }),
        { isLabeledByFormItem: y, inputId: i }
      );
    };
  var English = {
    name: "en",
    el: {
      colorpicker: {
        confirm: "OK",
        clear: "Clear",
        defaultLabel: "color picker",
        description:
          "current color is {color}. press enter to select a new color.",
      },
      datepicker: {
        now: "Now",
        today: "Today",
        cancel: "Cancel",
        clear: "Clear",
        confirm: "OK",
        dateTablePrompt:
          "Use the arrow keys and enter to select the day of the month",
        monthTablePrompt: "Use the arrow keys and enter to select the month",
        yearTablePrompt: "Use the arrow keys and enter to select the year",
        selectedDate: "Selected date",
        selectDate: "Select date",
        selectTime: "Select time",
        startDate: "Start Date",
        startTime: "Start Time",
        endDate: "End Date",
        endTime: "End Time",
        prevYear: "Previous Year",
        nextYear: "Next Year",
        prevMonth: "Previous Month",
        nextMonth: "Next Month",
        year: "",
        month1: "January",
        month2: "February",
        month3: "March",
        month4: "April",
        month5: "May",
        month6: "June",
        month7: "July",
        month8: "August",
        month9: "September",
        month10: "October",
        month11: "November",
        month12: "December",
        week: "week",
        weeks: {
          sun: "Sun",
          mon: "Mon",
          tue: "Tue",
          wed: "Wed",
          thu: "Thu",
          fri: "Fri",
          sat: "Sat",
        },
        weeksFull: {
          sun: "Sunday",
          mon: "Monday",
          tue: "Tuesday",
          wed: "Wednesday",
          thu: "Thursday",
          fri: "Friday",
          sat: "Saturday",
        },
        months: {
          jan: "Jan",
          feb: "Feb",
          mar: "Mar",
          apr: "Apr",
          may: "May",
          jun: "Jun",
          jul: "Jul",
          aug: "Aug",
          sep: "Sep",
          oct: "Oct",
          nov: "Nov",
          dec: "Dec",
        },
      },
      inputNumber: { decrease: "decrease number", increase: "increase number" },
      select: {
        loading: "Loading",
        noMatch: "No matching data",
        noData: "No data",
        placeholder: "Select",
      },
      dropdown: { toggleDropdown: "Toggle Dropdown" },
      cascader: {
        noMatch: "No matching data",
        loading: "Loading",
        placeholder: "Select",
        noData: "No data",
      },
      pagination: {
        goto: "Go to",
        pagesize: "/page",
        total: "Total {total}",
        pageClassifier: "",
        deprecationWarning:
          "Deprecated usages detected, please refer to the el-pagination documentation for more details",
      },
      dialog: { close: "Close this dialog" },
      drawer: { close: "Close this dialog" },
      messagebox: {
        title: "Message",
        confirm: "OK",
        cancel: "Cancel",
        error: "Illegal input",
        close: "Close this dialog",
      },
      upload: {
        deleteTip: "press delete to remove",
        delete: "Delete",
        preview: "Preview",
        continue: "Continue",
      },
      slider: {
        defaultLabel: "slider between {min} and {max}",
        defaultRangeStartLabel: "pick start value",
        defaultRangeEndLabel: "pick end value",
      },
      table: {
        emptyText: "No Data",
        confirmFilter: "Confirm",
        resetFilter: "Reset",
        clearFilter: "All",
        sumText: "Sum",
      },
      tree: { emptyText: "No Data" },
      transfer: {
        noMatch: "No matching data",
        noData: "No data",
        titles: ["List 1", "List 2"],
        filterPlaceholder: "Enter keyword",
        noCheckedFormat: "{total} items",
        hasCheckedFormat: "{checked}/{total} checked",
      },
      image: { error: "FAILED" },
      pageHeader: { title: "Back" },
      popconfirm: { confirmButtonText: "Yes", cancelButtonText: "No" },
    },
  };
  const buildTranslator = (e) => (t, n) => translate(t, n, unref(e)),
    translate = (e, t, n) =>
      get(n, e, e).replace(/\{(\w+)\}/g, (r, i) => {
        var g;
        return `${(g = t == null ? void 0 : t[i]) != null ? g : `{${i}}`}`;
      }),
    buildLocaleContext = (e) => {
      const t = computed(() => unref(e).name),
        n = isRef(e) ? e : ref(e);
      return { lang: t, locale: n, t: buildTranslator(e) };
    },
    useLocale = () => {
      const e = useGlobalConfig("locale");
      return buildLocaleContext(computed(() => e.value || English));
    },
    useLockscreen = (e) => {
      isRef(e) ||
        throwError(
          "[useLockscreen]",
          "You need to pass a ref param to this function"
        );
      const t = useNamespace("popup"),
        n = computed$1(() => t.bm("parent", "hidden"));
      if (!isClient$1 || hasClass(document.body, n.value)) return;
      let r = 0,
        i = !1,
        g = "0";
      const y = () => {
        setTimeout(() => {
          removeClass(document.body, n.value),
            i && (document.body.style.width = g);
        }, 200);
      };
      watch(e, ($) => {
        if (!$) {
          y();
          return;
        }
        (i = !hasClass(document.body, n.value)),
          i && (g = document.body.style.width),
          (r = getScrollBarWidth(t.namespace.value));
        const k =
            document.documentElement.clientHeight < document.body.scrollHeight,
          V = getStyle(document.body, "overflowY");
        r > 0 &&
          (k || V === "scroll") &&
          i &&
          (document.body.style.width = `calc(100% - ${r}px)`),
          addClass(document.body, n.value);
      }),
        onScopeDispose(() => y());
    },
    _prop = buildProp({ type: definePropType(Boolean), default: null }),
    _event = buildProp({ type: definePropType(Function) }),
    createModelToggleComposable = (e) => {
      const t = `update:${e}`,
        n = `onUpdate:${e}`,
        r = [t],
        i = { [e]: _prop, [n]: _event };
      return {
        useModelToggle: ({
          indicator: y,
          toggleReason: $,
          shouldHideWhenRouteChanges: k,
          shouldProceed: V,
          onShow: L,
          onHide: oe,
        }) => {
          const j = getCurrentInstance(),
            { emit: ae } = j,
            z = j.props,
            re = computed(() => isFunction$3(z[n])),
            ie = computed(() => z[e] === null),
            le = (he) => {
              y.value !== !0 &&
                ((y.value = !0), $ && ($.value = he), isFunction$3(L) && L(he));
            },
            de = (he) => {
              y.value !== !1 &&
                ((y.value = !1),
                $ && ($.value = he),
                isFunction$3(oe) && oe(he));
            },
            ue = (he) => {
              if (z.disabled === !0 || (isFunction$3(V) && !V())) return;
              const $e = re.value && isClient$1;
              $e && ae(t, !0), (ie.value || !$e) && le(he);
            },
            pe = (he) => {
              if (z.disabled === !0 || !isClient$1) return;
              const $e = re.value && isClient$1;
              $e && ae(t, !1), (ie.value || !$e) && de(he);
            },
            Ce = (he) => {
              isBoolean$1(he) &&
                (z.disabled && he
                  ? re.value && ae(t, !1)
                  : y.value !== he && (he ? le() : de()));
            },
            Oe = () => {
              y.value ? pe() : ue();
            };
          return (
            watch(() => z[e], Ce),
            k &&
              j.appContext.config.globalProperties.$route !== void 0 &&
              watch(
                () => ({ ...j.proxy.$route }),
                () => {
                  k.value && y.value && pe();
                }
              ),
            onMounted(() => {
              Ce(z[e]);
            }),
            { hide: pe, show: ue, toggle: Oe, hasUpdateHandler: re }
          );
        },
        useModelToggleProps: i,
        useModelToggleEmits: r,
      };
    },
    useRestoreActive = (e, t) => {
      let n;
      watch(
        () => e.value,
        (r) => {
          var i, g;
          r
            ? ((n = document.activeElement),
              isRef(t) && ((g = (i = t.value).focus) == null || g.call(i)))
            : n.focus();
        }
      );
    },
    useSameTarget = (e) => {
      if (!e) return { onClick: NOOP, onMousedown: NOOP, onMouseup: NOOP };
      let t = !1,
        n = !1;
      return {
        onClick: (y) => {
          t && n && e(y), (t = n = !1);
        },
        onMousedown: (y) => {
          t = y.target === y.currentTarget;
        },
        onMouseup: (y) => {
          n = y.target === y.currentTarget;
        },
      };
    };
  function useTimeout() {
    let e;
    const t = (r, i) => {
        n(), (e = window.setTimeout(r, i));
      },
      n = () => window.clearTimeout(e);
    return (
      tryOnScopeDispose$1(() => n()), { registerTimeout: t, cancelTimeout: n }
    );
  }
  let registeredEscapeHandlers = [];
  const cachedHandler = (e) => {
      const t = e;
      t.key === EVENT_CODE.esc && registeredEscapeHandlers.forEach((n) => n(t));
    },
    useEscapeKeydown = (e) => {
      onMounted(() => {
        registeredEscapeHandlers.length === 0 &&
          document.addEventListener("keydown", cachedHandler),
          isClient$1 && registeredEscapeHandlers.push(e);
      }),
        onBeforeUnmount(() => {
          (registeredEscapeHandlers = registeredEscapeHandlers.filter(
            (t) => t !== e
          )),
            registeredEscapeHandlers.length === 0 &&
              isClient$1 &&
              document.removeEventListener("keydown", cachedHandler);
        });
    };
  let cachedContainer;
  const usePopperContainerId = () => {
      const e = useGlobalConfig("namespace", defaultNamespace),
        t = useIdInjection(),
        n = computed(() => `${e.value}-popper-container-${t.prefix}`),
        r = computed(() => `#${n.value}`);
      return { id: n, selector: r };
    },
    createContainer = (e) => {
      const t = document.createElement("div");
      return (t.id = e), document.body.appendChild(t), t;
    },
    usePopperContainer = () => {
      onBeforeMount(() => {
        if (!isClient$1) return;
        const { id: e, selector: t } = usePopperContainerId();
        !cachedContainer &&
          !document.body.querySelector(t.value) &&
          (cachedContainer = createContainer(e.value));
      });
    },
    useDelayedToggleProps = buildProps({
      showAfter: { type: Number, default: 0 },
      hideAfter: { type: Number, default: 200 },
    }),
    useDelayedToggle = ({ showAfter: e, hideAfter: t, open: n, close: r }) => {
      const { registerTimeout: i } = useTimeout();
      return {
        onOpen: ($) => {
          i(() => {
            n($);
          }, unref(e));
        },
        onClose: ($) => {
          i(() => {
            r($);
          }, unref(t));
        },
      };
    },
    FORWARD_REF_INJECTION_KEY = Symbol("elForwardRef"),
    useForwardRef = (e) => {
      provide(FORWARD_REF_INJECTION_KEY, {
        setForwardRef: (n) => {
          e.value = n;
        },
      });
    },
    useForwardRefDirective = (e) => ({
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
    zIndex = ref(0),
    useZIndex = () => {
      const e = useGlobalConfig("zIndex", 2e3),
        t = computed(() => e.value + zIndex.value);
      return {
        initialZIndex: e,
        currentZIndex: t,
        nextZIndex: () => (zIndex.value++, t.value),
      };
    };
  function useCursor(e) {
    const t = ref();
    function n() {
      if (e.value == null) return;
      const { selectionStart: i, selectionEnd: g, value: y } = e.value;
      if (i == null || g == null) return;
      const $ = y.slice(0, Math.max(0, i)),
        k = y.slice(Math.max(0, g));
      t.value = {
        selectionStart: i,
        selectionEnd: g,
        value: y,
        beforeTxt: $,
        afterTxt: k,
      };
    }
    function r() {
      if (e.value == null || t.value == null) return;
      const { value: i } = e.value,
        { beforeTxt: g, afterTxt: y, selectionStart: $ } = t.value;
      if (g == null || y == null || $ == null) return;
      let k = i.length;
      if (i.endsWith(y)) k = i.length - y.length;
      else if (i.startsWith(g)) k = g.length;
      else {
        const V = g[$ - 1],
          L = i.indexOf(V, $ - 1);
        L !== -1 && (k = L + 1);
      }
      e.value.setSelectionRange(k, k);
    }
    return [n, r];
  }
  var _export_sfc$1 = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [r, i] of t) n[r] = i;
    return n;
  };
  const iconProps = buildProps({
      size: { type: definePropType([Number, String]) },
      color: { type: String },
    }),
    __default__$n = defineComponent({ name: "ElIcon", inheritAttrs: !1 }),
    _sfc_main$z = defineComponent({
      ...__default__$n,
      props: iconProps,
      setup(e) {
        const t = e,
          n = useNamespace("icon"),
          r = computed(() => {
            const { size: i, color: g } = t;
            return !i && !g
              ? {}
              : {
                  fontSize: isUndefined$1(i) ? void 0 : addUnit(i),
                  "--color": g,
                };
          });
        return (i, g) => (
          openBlock(),
          createElementBlock(
            "i",
            mergeProps({ class: unref(n).b(), style: unref(r) }, i.$attrs),
            [renderSlot(i.$slots, "default")],
            16
          )
        );
      },
    });
  var Icon = _export_sfc$1(_sfc_main$z, [
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/icon/src/icon.vue",
    ],
  ]);
  const ElIcon = withInstall(Icon);
  let hiddenTextarea;
  const HIDDEN_STYLE = `
  height:0 !important;
  visibility:hidden !important;
  overflow:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important;
`,
    CONTEXT_STYLE = [
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
  function calculateNodeStyling(e) {
    const t = window.getComputedStyle(e),
      n = t.getPropertyValue("box-sizing"),
      r =
        Number.parseFloat(t.getPropertyValue("padding-bottom")) +
        Number.parseFloat(t.getPropertyValue("padding-top")),
      i =
        Number.parseFloat(t.getPropertyValue("border-bottom-width")) +
        Number.parseFloat(t.getPropertyValue("border-top-width"));
    return {
      contextStyle: CONTEXT_STYLE.map(
        (y) => `${y}:${t.getPropertyValue(y)}`
      ).join(";"),
      paddingSize: r,
      borderSize: i,
      boxSizing: n,
    };
  }
  function calcTextareaHeight(e, t = 1, n) {
    var r;
    hiddenTextarea ||
      ((hiddenTextarea = document.createElement("textarea")),
      document.body.appendChild(hiddenTextarea));
    const {
      paddingSize: i,
      borderSize: g,
      boxSizing: y,
      contextStyle: $,
    } = calculateNodeStyling(e);
    hiddenTextarea.setAttribute("style", `${$};${HIDDEN_STYLE}`),
      (hiddenTextarea.value = e.value || e.placeholder || "");
    let k = hiddenTextarea.scrollHeight;
    const V = {};
    y === "border-box" ? (k = k + g) : y === "content-box" && (k = k - i),
      (hiddenTextarea.value = "");
    const L = hiddenTextarea.scrollHeight - i;
    if (isNumber$1(t)) {
      let oe = L * t;
      y === "border-box" && (oe = oe + i + g),
        (k = Math.max(oe, k)),
        (V.minHeight = `${oe}px`);
    }
    if (isNumber$1(n)) {
      let oe = L * n;
      y === "border-box" && (oe = oe + i + g), (k = Math.min(oe, k));
    }
    return (
      (V.height = `${k}px`),
      (r = hiddenTextarea.parentNode) == null || r.removeChild(hiddenTextarea),
      (hiddenTextarea = void 0),
      V
    );
  }
  const inputProps = buildProps({
      id: { type: String, default: void 0 },
      size: useSizeProp,
      disabled: Boolean,
      modelValue: {
        type: definePropType([String, Number, Object]),
        default: "",
      },
      type: { type: String, default: "text" },
      resize: {
        type: String,
        values: ["none", "both", "horizontal", "vertical"],
      },
      autosize: { type: definePropType([Boolean, Object]), default: !1 },
      autocomplete: { type: String, default: "off" },
      formatter: { type: Function },
      parser: { type: Function },
      placeholder: { type: String },
      form: { type: String },
      readonly: { type: Boolean, default: !1 },
      clearable: { type: Boolean, default: !1 },
      showPassword: { type: Boolean, default: !1 },
      showWordLimit: { type: Boolean, default: !1 },
      suffixIcon: { type: iconPropType },
      prefixIcon: { type: iconPropType },
      containerRole: { type: String, default: void 0 },
      label: { type: String, default: void 0 },
      tabindex: { type: [String, Number], default: 0 },
      validateEvent: { type: Boolean, default: !0 },
      inputStyle: {
        type: definePropType([Object, Array, String]),
        default: () => mutable({}),
      },
    }),
    inputEmits = {
      [UPDATE_MODEL_EVENT]: (e) => isString$3(e),
      input: (e) => isString$3(e),
      change: (e) => isString$3(e),
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
    _hoisted_1$e = ["role"],
    _hoisted_2$c = [
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
    _hoisted_3$6 = [
      "id",
      "tabindex",
      "disabled",
      "readonly",
      "autocomplete",
      "aria-label",
      "placeholder",
      "form",
    ],
    __default__$m = defineComponent({ name: "ElInput", inheritAttrs: !1 }),
    _sfc_main$y = defineComponent({
      ...__default__$m,
      props: inputProps,
      emits: inputEmits,
      setup(e, { expose: t, emit: n }) {
        const r = e,
          i = useAttrs$1(),
          g = useSlots(),
          y = computed(() => {
            const Et = {};
            return (
              r.containerRole === "combobox" &&
                ((Et["aria-haspopup"] = i["aria-haspopup"]),
                (Et["aria-owns"] = i["aria-owns"]),
                (Et["aria-expanded"] = i["aria-expanded"])),
              Et
            );
          }),
          $ = computed(() => [
            r.type === "textarea" ? ie.b() : re.b(),
            re.m(ae.value),
            re.is("disabled", z.value),
            re.is("exceed", Nn.value),
            {
              [re.b("group")]: g.prepend || g.append,
              [re.bm("group", "append")]: g.append,
              [re.bm("group", "prepend")]: g.prepend,
              [re.m("prefix")]: g.prefix || r.prefixIcon,
              [re.m("suffix")]:
                g.suffix || r.suffixIcon || r.clearable || r.showPassword,
              [re.bm("suffix", "password-clear")]: At.value && Ue.value,
            },
            i.class,
          ]),
          k = computed(() => [re.e("wrapper"), re.is("focus", ue.value)]),
          V = useAttrs({ excludeKeys: computed(() => Object.keys(y.value)) }),
          { form: L, formItem: oe } = useFormItem(),
          { inputId: j } = useFormItemInputId(r, { formItemContext: oe }),
          ae = useSize(),
          z = useDisabled(),
          re = useNamespace("input"),
          ie = useNamespace("textarea"),
          le = shallowRef(),
          de = shallowRef(),
          ue = ref(!1),
          pe = ref(!1),
          Ce = ref(!1),
          Oe = ref(!1),
          he = ref(),
          $e = shallowRef(r.inputStyle),
          Ve = computed(() => le.value || de.value),
          qe = computed(() => {
            var Et;
            return (Et = L == null ? void 0 : L.statusIcon) != null ? Et : !1;
          }),
          Cn = computed(() => (oe == null ? void 0 : oe.validateState) || ""),
          Pt = computed(() => Cn.value && ValidateComponentsMap[Cn.value]),
          kt = computed(() => (Oe.value ? view_default : hide_default)),
          Fe = computed(() => [i.style, r.inputStyle]),
          xe = computed(() => [r.inputStyle, $e.value, { resize: r.resize }]),
          Lt = computed(() =>
            isNil(r.modelValue) ? "" : String(r.modelValue)
          ),
          At = computed(
            () =>
              r.clearable &&
              !z.value &&
              !r.readonly &&
              !!Lt.value &&
              (ue.value || pe.value)
          ),
          Ue = computed(
            () =>
              r.showPassword &&
              !z.value &&
              !r.readonly &&
              !!Lt.value &&
              (!!Lt.value || ue.value)
          ),
          ze = computed(
            () =>
              r.showWordLimit &&
              !!V.value.maxlength &&
              (r.type === "text" || r.type === "textarea") &&
              !z.value &&
              !r.readonly &&
              !r.showPassword
          ),
          Tn = computed(() => Array.from(Lt.value).length),
          Nn = computed(
            () => !!ze.value && Tn.value > Number(V.value.maxlength)
          ),
          xn = computed(
            () =>
              !!g.suffix ||
              !!r.suffixIcon ||
              At.value ||
              r.showPassword ||
              ze.value ||
              (!!Cn.value && qe.value)
          ),
          [Mn, zn] = useCursor(le);
        useResizeObserver(de, (Et) => {
          if (!ze.value || r.resize !== "both") return;
          const En = Et[0],
            { width: kn } = En.contentRect;
          he.value = { right: `calc(100% - ${kn + 15 + 6}px)` };
        });
        const Rn = () => {
            const { type: Et, autosize: En } = r;
            if (!(!isClient$1 || Et !== "textarea"))
              if (En) {
                const kn = isObject$3(En) ? En.minRows : void 0,
                  In = isObject$3(En) ? En.maxRows : void 0;
                $e.value = { ...calcTextareaHeight(de.value, kn, In) };
              } else
                $e.value = {
                  minHeight: calcTextareaHeight(de.value).minHeight,
                };
          },
          Ln = () => {
            const Et = Ve.value;
            !Et || Et.value === Lt.value || (Et.value = Lt.value);
          },
          jn = async (Et) => {
            Mn();
            let { value: En } = Et.target;
            if (
              (r.formatter &&
                ((En = r.parser ? r.parser(En) : En), (En = r.formatter(En))),
              !Ce.value)
            ) {
              if (En === Lt.value) {
                Ln();
                return;
              }
              n(UPDATE_MODEL_EVENT, En),
                n("input", En),
                await nextTick(),
                Ln(),
                zn();
            }
          },
          Fn = (Et) => {
            n("change", Et.target.value);
          },
          Hn = (Et) => {
            n("compositionstart", Et), (Ce.value = !0);
          },
          qn = (Et) => {
            var En;
            n("compositionupdate", Et);
            const kn = (En = Et.target) == null ? void 0 : En.value,
              In = kn[kn.length - 1] || "";
            Ce.value = !isKorean(In);
          },
          Gn = (Et) => {
            n("compositionend", Et), Ce.value && ((Ce.value = !1), jn(Et));
          },
          _e = () => {
            (Oe.value = !Oe.value), Ne();
          },
          Ne = async () => {
            var Et;
            await nextTick(), (Et = Ve.value) == null || Et.focus();
          },
          Dt = () => {
            var Et;
            return (Et = Ve.value) == null ? void 0 : Et.blur();
          },
          vn = (Et) => {
            (ue.value = !0), n("focus", Et);
          },
          hn = (Et) => {
            var En;
            (ue.value = !1),
              n("blur", Et),
              r.validateEvent &&
                ((En = oe == null ? void 0 : oe.validate) == null ||
                  En.call(oe, "blur").catch((kn) => void 0));
          },
          Sn = (Et) => {
            (pe.value = !1), n("mouseleave", Et);
          },
          On = (Et) => {
            (pe.value = !0), n("mouseenter", Et);
          },
          _n = (Et) => {
            n("keydown", Et);
          },
          wn = () => {
            var Et;
            (Et = Ve.value) == null || Et.select();
          },
          bn = () => {
            n(UPDATE_MODEL_EVENT, ""),
              n("change", ""),
              n("clear"),
              n("input", "");
          };
        return (
          watch(
            () => r.modelValue,
            () => {
              var Et;
              nextTick(() => Rn()),
                r.validateEvent &&
                  ((Et = oe == null ? void 0 : oe.validate) == null ||
                    Et.call(oe, "change").catch((En) => void 0));
            }
          ),
          watch(Lt, () => Ln()),
          watch(
            () => r.type,
            async () => {
              await nextTick(), Ln(), Rn();
            }
          ),
          onMounted(() => {
            !r.formatter && r.parser, Ln(), nextTick(Rn);
          }),
          t({
            input: le,
            textarea: de,
            ref: Ve,
            textareaStyle: xe,
            autosize: toRef(r, "autosize"),
            focus: Ne,
            blur: Dt,
            select: wn,
            clear: bn,
            resizeTextarea: Rn,
          }),
          (Et, En) =>
            withDirectives(
              (openBlock(),
              createElementBlock(
                "div",
                mergeProps(unref(y), {
                  class: unref($),
                  style: unref(Fe),
                  role: Et.containerRole,
                  onMouseenter: On,
                  onMouseleave: Sn,
                }),
                [
                  createCommentVNode(" input "),
                  Et.type !== "textarea"
                    ? (openBlock(),
                      createElementBlock(
                        Fragment,
                        { key: 0 },
                        [
                          createCommentVNode(" prepend slot "),
                          Et.$slots.prepend
                            ? (openBlock(),
                              createElementBlock(
                                "div",
                                {
                                  key: 0,
                                  class: normalizeClass(
                                    unref(re).be("group", "prepend")
                                  ),
                                },
                                [renderSlot(Et.$slots, "prepend")],
                                2
                              ))
                            : createCommentVNode("v-if", !0),
                          createBaseVNode(
                            "div",
                            { class: normalizeClass(unref(k)) },
                            [
                              createCommentVNode(" prefix slot "),
                              Et.$slots.prefix || Et.prefixIcon
                                ? (openBlock(),
                                  createElementBlock(
                                    "span",
                                    {
                                      key: 0,
                                      class: normalizeClass(
                                        unref(re).e("prefix")
                                      ),
                                    },
                                    [
                                      createBaseVNode(
                                        "span",
                                        {
                                          class: normalizeClass(
                                            unref(re).e("prefix-inner")
                                          ),
                                          onClick: Ne,
                                        },
                                        [
                                          renderSlot(Et.$slots, "prefix"),
                                          Et.prefixIcon
                                            ? (openBlock(),
                                              createBlock(
                                                unref(ElIcon),
                                                {
                                                  key: 0,
                                                  class: normalizeClass(
                                                    unref(re).e("icon")
                                                  ),
                                                },
                                                {
                                                  default: withCtx(() => [
                                                    (openBlock(),
                                                    createBlock(
                                                      resolveDynamicComponent(
                                                        Et.prefixIcon
                                                      )
                                                    )),
                                                  ]),
                                                  _: 1,
                                                },
                                                8,
                                                ["class"]
                                              ))
                                            : createCommentVNode("v-if", !0),
                                        ],
                                        2
                                      ),
                                    ],
                                    2
                                  ))
                                : createCommentVNode("v-if", !0),
                              createBaseVNode(
                                "input",
                                mergeProps(
                                  {
                                    id: unref(j),
                                    ref_key: "input",
                                    ref: le,
                                    class: unref(re).e("inner"),
                                  },
                                  unref(V),
                                  {
                                    type: Et.showPassword
                                      ? Oe.value
                                        ? "text"
                                        : "password"
                                      : Et.type,
                                    disabled: unref(z),
                                    formatter: Et.formatter,
                                    parser: Et.parser,
                                    readonly: Et.readonly,
                                    autocomplete: Et.autocomplete,
                                    tabindex: Et.tabindex,
                                    "aria-label": Et.label,
                                    placeholder: Et.placeholder,
                                    style: Et.inputStyle,
                                    form: r.form,
                                    onCompositionstart: Hn,
                                    onCompositionupdate: qn,
                                    onCompositionend: Gn,
                                    onInput: jn,
                                    onFocus: vn,
                                    onBlur: hn,
                                    onChange: Fn,
                                    onKeydown: _n,
                                  }
                                ),
                                null,
                                16,
                                _hoisted_2$c
                              ),
                              createCommentVNode(" suffix slot "),
                              unref(xn)
                                ? (openBlock(),
                                  createElementBlock(
                                    "span",
                                    {
                                      key: 1,
                                      class: normalizeClass(
                                        unref(re).e("suffix")
                                      ),
                                    },
                                    [
                                      createBaseVNode(
                                        "span",
                                        {
                                          class: normalizeClass(
                                            unref(re).e("suffix-inner")
                                          ),
                                          onClick: Ne,
                                        },
                                        [
                                          !unref(At) || !unref(Ue) || !unref(ze)
                                            ? (openBlock(),
                                              createElementBlock(
                                                Fragment,
                                                { key: 0 },
                                                [
                                                  renderSlot(
                                                    Et.$slots,
                                                    "suffix"
                                                  ),
                                                  Et.suffixIcon
                                                    ? (openBlock(),
                                                      createBlock(
                                                        unref(ElIcon),
                                                        {
                                                          key: 0,
                                                          class: normalizeClass(
                                                            unref(re).e("icon")
                                                          ),
                                                        },
                                                        {
                                                          default: withCtx(
                                                            () => [
                                                              (openBlock(),
                                                              createBlock(
                                                                resolveDynamicComponent(
                                                                  Et.suffixIcon
                                                                )
                                                              )),
                                                            ]
                                                          ),
                                                          _: 1,
                                                        },
                                                        8,
                                                        ["class"]
                                                      ))
                                                    : createCommentVNode(
                                                        "v-if",
                                                        !0
                                                      ),
                                                ],
                                                64
                                              ))
                                            : createCommentVNode("v-if", !0),
                                          unref(At)
                                            ? (openBlock(),
                                              createBlock(
                                                unref(ElIcon),
                                                {
                                                  key: 1,
                                                  class: normalizeClass([
                                                    unref(re).e("icon"),
                                                    unref(re).e("clear"),
                                                  ]),
                                                  onMousedown: withModifiers(
                                                    unref(NOOP),
                                                    ["prevent"]
                                                  ),
                                                  onClick: bn,
                                                },
                                                {
                                                  default: withCtx(() => [
                                                    createVNode(
                                                      unref(
                                                        circle_close_default
                                                      )
                                                    ),
                                                  ]),
                                                  _: 1,
                                                },
                                                8,
                                                ["class", "onMousedown"]
                                              ))
                                            : createCommentVNode("v-if", !0),
                                          unref(Ue)
                                            ? (openBlock(),
                                              createBlock(
                                                unref(ElIcon),
                                                {
                                                  key: 2,
                                                  class: normalizeClass([
                                                    unref(re).e("icon"),
                                                    unref(re).e("password"),
                                                  ]),
                                                  onClick: _e,
                                                },
                                                {
                                                  default: withCtx(() => [
                                                    (openBlock(),
                                                    createBlock(
                                                      resolveDynamicComponent(
                                                        unref(kt)
                                                      )
                                                    )),
                                                  ]),
                                                  _: 1,
                                                },
                                                8,
                                                ["class"]
                                              ))
                                            : createCommentVNode("v-if", !0),
                                          unref(ze)
                                            ? (openBlock(),
                                              createElementBlock(
                                                "span",
                                                {
                                                  key: 3,
                                                  class: normalizeClass(
                                                    unref(re).e("count")
                                                  ),
                                                },
                                                [
                                                  createBaseVNode(
                                                    "span",
                                                    {
                                                      class: normalizeClass(
                                                        unref(re).e(
                                                          "count-inner"
                                                        )
                                                      ),
                                                    },
                                                    toDisplayString(unref(Tn)) +
                                                      " / " +
                                                      toDisplayString(
                                                        unref(V).maxlength
                                                      ),
                                                    3
                                                  ),
                                                ],
                                                2
                                              ))
                                            : createCommentVNode("v-if", !0),
                                          unref(Cn) && unref(Pt) && unref(qe)
                                            ? (openBlock(),
                                              createBlock(
                                                unref(ElIcon),
                                                {
                                                  key: 4,
                                                  class: normalizeClass([
                                                    unref(re).e("icon"),
                                                    unref(re).e("validateIcon"),
                                                    unref(re).is(
                                                      "loading",
                                                      unref(Cn) === "validating"
                                                    ),
                                                  ]),
                                                },
                                                {
                                                  default: withCtx(() => [
                                                    (openBlock(),
                                                    createBlock(
                                                      resolveDynamicComponent(
                                                        unref(Pt)
                                                      )
                                                    )),
                                                  ]),
                                                  _: 1,
                                                },
                                                8,
                                                ["class"]
                                              ))
                                            : createCommentVNode("v-if", !0),
                                        ],
                                        2
                                      ),
                                    ],
                                    2
                                  ))
                                : createCommentVNode("v-if", !0),
                            ],
                            2
                          ),
                          createCommentVNode(" append slot "),
                          Et.$slots.append
                            ? (openBlock(),
                              createElementBlock(
                                "div",
                                {
                                  key: 1,
                                  class: normalizeClass(
                                    unref(re).be("group", "append")
                                  ),
                                },
                                [renderSlot(Et.$slots, "append")],
                                2
                              ))
                            : createCommentVNode("v-if", !0),
                        ],
                        64
                      ))
                    : (openBlock(),
                      createElementBlock(
                        Fragment,
                        { key: 1 },
                        [
                          createCommentVNode(" textarea "),
                          createBaseVNode(
                            "textarea",
                            mergeProps(
                              {
                                id: unref(j),
                                ref_key: "textarea",
                                ref: de,
                                class: unref(ie).e("inner"),
                              },
                              unref(V),
                              {
                                tabindex: Et.tabindex,
                                disabled: unref(z),
                                readonly: Et.readonly,
                                autocomplete: Et.autocomplete,
                                style: unref(xe),
                                "aria-label": Et.label,
                                placeholder: Et.placeholder,
                                form: r.form,
                                onCompositionstart: Hn,
                                onCompositionupdate: qn,
                                onCompositionend: Gn,
                                onInput: jn,
                                onFocus: vn,
                                onBlur: hn,
                                onChange: Fn,
                                onKeydown: _n,
                              }
                            ),
                            null,
                            16,
                            _hoisted_3$6
                          ),
                          unref(ze)
                            ? (openBlock(),
                              createElementBlock(
                                "span",
                                {
                                  key: 0,
                                  style: normalizeStyle(he.value),
                                  class: normalizeClass(unref(re).e("count")),
                                },
                                toDisplayString(unref(Tn)) +
                                  " / " +
                                  toDisplayString(unref(V).maxlength),
                                7
                              ))
                            : createCommentVNode("v-if", !0),
                        ],
                        64
                      )),
                ],
                16,
                _hoisted_1$e
              )),
              [[vShow, Et.type !== "hidden"]]
            )
        );
      },
    });
  var Input = _export_sfc$1(_sfc_main$y, [
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/input/src/input.vue",
    ],
  ]);
  const ElInput = withInstall(Input),
    GAP = 4,
    BAR_MAP = {
      vertical: {
        offset: "offsetHeight",
        scroll: "scrollTop",
        scrollSize: "scrollHeight",
        size: "height",
        key: "vertical",
        axis: "Y",
        client: "clientY",
        direction: "top",
      },
      horizontal: {
        offset: "offsetWidth",
        scroll: "scrollLeft",
        scrollSize: "scrollWidth",
        size: "width",
        key: "horizontal",
        axis: "X",
        client: "clientX",
        direction: "left",
      },
    },
    renderThumbStyle = ({ move: e, size: t, bar: n }) => ({
      [n.size]: t,
      transform: `translate${n.axis}(${e}%)`,
    }),
    thumbProps = buildProps({
      vertical: Boolean,
      size: String,
      move: Number,
      ratio: { type: Number, required: !0 },
      always: Boolean,
    }),
    COMPONENT_NAME$3 = "Thumb",
    _sfc_main$x = defineComponent({
      __name: "thumb",
      props: thumbProps,
      setup(e) {
        const t = e,
          n = inject(scrollbarContextKey),
          r = useNamespace("scrollbar");
        n || throwError(COMPONENT_NAME$3, "can not inject scrollbar context");
        const i = ref(),
          g = ref(),
          y = ref({}),
          $ = ref(!1);
        let k = !1,
          V = !1,
          L = isClient$1 ? document.onselectstart : null;
        const oe = computed(
            () => BAR_MAP[t.vertical ? "vertical" : "horizontal"]
          ),
          j = computed(() =>
            renderThumbStyle({ size: t.size, move: t.move, bar: oe.value })
          ),
          ae = computed(
            () =>
              i.value[oe.value.offset] ** 2 /
              n.wrapElement[oe.value.scrollSize] /
              t.ratio /
              g.value[oe.value.offset]
          ),
          z = (Oe) => {
            var he;
            if (
              (Oe.stopPropagation(), Oe.ctrlKey || [1, 2].includes(Oe.button))
            )
              return;
            (he = window.getSelection()) == null || he.removeAllRanges(),
              ie(Oe);
            const $e = Oe.currentTarget;
            $e &&
              (y.value[oe.value.axis] =
                $e[oe.value.offset] -
                (Oe[oe.value.client] -
                  $e.getBoundingClientRect()[oe.value.direction]));
          },
          re = (Oe) => {
            if (!g.value || !i.value || !n.wrapElement) return;
            const he = Math.abs(
                Oe.target.getBoundingClientRect()[oe.value.direction] -
                  Oe[oe.value.client]
              ),
              $e = g.value[oe.value.offset] / 2,
              Ve = ((he - $e) * 100 * ae.value) / i.value[oe.value.offset];
            n.wrapElement[oe.value.scroll] =
              (Ve * n.wrapElement[oe.value.scrollSize]) / 100;
          },
          ie = (Oe) => {
            Oe.stopImmediatePropagation(),
              (k = !0),
              document.addEventListener("mousemove", le),
              document.addEventListener("mouseup", de),
              (L = document.onselectstart),
              (document.onselectstart = () => !1);
          },
          le = (Oe) => {
            if (!i.value || !g.value || k === !1) return;
            const he = y.value[oe.value.axis];
            if (!he) return;
            const $e =
                (i.value.getBoundingClientRect()[oe.value.direction] -
                  Oe[oe.value.client]) *
                -1,
              Ve = g.value[oe.value.offset] - he,
              qe = (($e - Ve) * 100 * ae.value) / i.value[oe.value.offset];
            n.wrapElement[oe.value.scroll] =
              (qe * n.wrapElement[oe.value.scrollSize]) / 100;
          },
          de = () => {
            (k = !1),
              (y.value[oe.value.axis] = 0),
              document.removeEventListener("mousemove", le),
              document.removeEventListener("mouseup", de),
              Ce(),
              V && ($.value = !1);
          },
          ue = () => {
            (V = !1), ($.value = !!t.size);
          },
          pe = () => {
            (V = !0), ($.value = k);
          };
        onBeforeUnmount(() => {
          Ce(), document.removeEventListener("mouseup", de);
        });
        const Ce = () => {
          document.onselectstart !== L && (document.onselectstart = L);
        };
        return (
          useEventListener$1(toRef(n, "scrollbarElement"), "mousemove", ue),
          useEventListener$1(toRef(n, "scrollbarElement"), "mouseleave", pe),
          (Oe, he) => (
            openBlock(),
            createBlock(
              Transition,
              { name: unref(r).b("fade"), persisted: "" },
              {
                default: withCtx(() => [
                  withDirectives(
                    createBaseVNode(
                      "div",
                      {
                        ref_key: "instance",
                        ref: i,
                        class: normalizeClass([
                          unref(r).e("bar"),
                          unref(r).is(unref(oe).key),
                        ]),
                        onMousedown: re,
                      },
                      [
                        createBaseVNode(
                          "div",
                          {
                            ref_key: "thumb",
                            ref: g,
                            class: normalizeClass(unref(r).e("thumb")),
                            style: normalizeStyle(unref(j)),
                            onMousedown: z,
                          },
                          null,
                          38
                        ),
                      ],
                      34
                    ),
                    [[vShow, Oe.always || $.value]]
                  ),
                ]),
                _: 1,
              },
              8,
              ["name"]
            )
          )
        );
      },
    });
  var Thumb = _export_sfc$1(_sfc_main$x, [
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/scrollbar/src/thumb.vue",
    ],
  ]);
  const barProps = buildProps({
      always: { type: Boolean, default: !0 },
      width: String,
      height: String,
      ratioX: { type: Number, default: 1 },
      ratioY: { type: Number, default: 1 },
    }),
    _sfc_main$w = defineComponent({
      __name: "bar",
      props: barProps,
      setup(e, { expose: t }) {
        const n = e,
          r = ref(0),
          i = ref(0);
        return (
          t({
            handleScroll: (y) => {
              if (y) {
                const $ = y.offsetHeight - GAP,
                  k = y.offsetWidth - GAP;
                (i.value = ((y.scrollTop * 100) / $) * n.ratioY),
                  (r.value = ((y.scrollLeft * 100) / k) * n.ratioX);
              }
            },
          }),
          (y, $) => (
            openBlock(),
            createElementBlock(
              Fragment,
              null,
              [
                createVNode(
                  Thumb,
                  {
                    move: r.value,
                    ratio: y.ratioX,
                    size: y.width,
                    always: y.always,
                  },
                  null,
                  8,
                  ["move", "ratio", "size", "always"]
                ),
                createVNode(
                  Thumb,
                  {
                    move: i.value,
                    ratio: y.ratioY,
                    size: y.height,
                    vertical: "",
                    always: y.always,
                  },
                  null,
                  8,
                  ["move", "ratio", "size", "always"]
                ),
              ],
              64
            )
          )
        );
      },
    });
  var Bar = _export_sfc$1(_sfc_main$w, [
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/scrollbar/src/bar.vue",
    ],
  ]);
  const scrollbarProps = buildProps({
      height: { type: [String, Number], default: "" },
      maxHeight: { type: [String, Number], default: "" },
      native: { type: Boolean, default: !1 },
      wrapStyle: { type: definePropType([String, Object, Array]), default: "" },
      wrapClass: { type: [String, Array], default: "" },
      viewClass: { type: [String, Array], default: "" },
      viewStyle: { type: [String, Array, Object], default: "" },
      noresize: Boolean,
      tag: { type: String, default: "div" },
      always: Boolean,
      minSize: { type: Number, default: 20 },
    }),
    scrollbarEmits = {
      scroll: ({ scrollTop: e, scrollLeft: t }) => [e, t].every(isNumber$1),
    },
    COMPONENT_NAME$2 = "ElScrollbar",
    __default__$l = defineComponent({ name: COMPONENT_NAME$2 }),
    _sfc_main$v = defineComponent({
      ...__default__$l,
      props: scrollbarProps,
      emits: scrollbarEmits,
      setup(e, { expose: t, emit: n }) {
        const r = e,
          i = useNamespace("scrollbar");
        let g, y;
        const $ = ref(),
          k = ref(),
          V = ref(),
          L = ref("0"),
          oe = ref("0"),
          j = ref(),
          ae = ref(1),
          z = ref(1),
          re = computed(() => {
            const he = {};
            return (
              r.height && (he.height = addUnit(r.height)),
              r.maxHeight && (he.maxHeight = addUnit(r.maxHeight)),
              [r.wrapStyle, he]
            );
          }),
          ie = computed(() => [
            r.wrapClass,
            i.e("wrap"),
            { [i.em("wrap", "hidden-default")]: !r.native },
          ]),
          le = computed(() => [i.e("view"), r.viewClass]),
          de = () => {
            var he;
            k.value &&
              ((he = j.value) == null || he.handleScroll(k.value),
              n("scroll", {
                scrollTop: k.value.scrollTop,
                scrollLeft: k.value.scrollLeft,
              }));
          };
        function ue(he, $e) {
          isObject$3(he)
            ? k.value.scrollTo(he)
            : isNumber$1(he) && isNumber$1($e) && k.value.scrollTo(he, $e);
        }
        const pe = (he) => {
            isNumber$1(he) && (k.value.scrollTop = he);
          },
          Ce = (he) => {
            isNumber$1(he) && (k.value.scrollLeft = he);
          },
          Oe = () => {
            if (!k.value) return;
            const he = k.value.offsetHeight - GAP,
              $e = k.value.offsetWidth - GAP,
              Ve = he ** 2 / k.value.scrollHeight,
              qe = $e ** 2 / k.value.scrollWidth,
              Cn = Math.max(Ve, r.minSize),
              Pt = Math.max(qe, r.minSize);
            (ae.value = Ve / (he - Ve) / (Cn / (he - Cn))),
              (z.value = qe / ($e - qe) / (Pt / ($e - Pt))),
              (oe.value = Cn + GAP < he ? `${Cn}px` : ""),
              (L.value = Pt + GAP < $e ? `${Pt}px` : "");
          };
        return (
          watch(
            () => r.noresize,
            (he) => {
              he
                ? (g == null || g(), y == null || y())
                : (({ stop: g } = useResizeObserver(V, Oe)),
                  (y = useEventListener$1("resize", Oe)));
            },
            { immediate: !0 }
          ),
          watch(
            () => [r.maxHeight, r.height],
            () => {
              r.native ||
                nextTick(() => {
                  var he;
                  Oe(),
                    k.value &&
                      ((he = j.value) == null || he.handleScroll(k.value));
                });
            }
          ),
          provide(
            scrollbarContextKey,
            reactive({ scrollbarElement: $, wrapElement: k })
          ),
          onMounted(() => {
            r.native ||
              nextTick(() => {
                Oe();
              });
          }),
          onUpdated(() => Oe()),
          t({
            wrapRef: k,
            update: Oe,
            scrollTo: ue,
            setScrollTop: pe,
            setScrollLeft: Ce,
            handleScroll: de,
          }),
          (he, $e) => (
            openBlock(),
            createElementBlock(
              "div",
              {
                ref_key: "scrollbarRef",
                ref: $,
                class: normalizeClass(unref(i).b()),
              },
              [
                createBaseVNode(
                  "div",
                  {
                    ref_key: "wrapRef",
                    ref: k,
                    class: normalizeClass(unref(ie)),
                    style: normalizeStyle(unref(re)),
                    onScroll: de,
                  },
                  [
                    (openBlock(),
                    createBlock(
                      resolveDynamicComponent(he.tag),
                      {
                        ref_key: "resizeRef",
                        ref: V,
                        class: normalizeClass(unref(le)),
                        style: normalizeStyle(he.viewStyle),
                      },
                      {
                        default: withCtx(() => [
                          renderSlot(he.$slots, "default"),
                        ]),
                        _: 3,
                      },
                      8,
                      ["class", "style"]
                    )),
                  ],
                  38
                ),
                he.native
                  ? createCommentVNode("v-if", !0)
                  : (openBlock(),
                    createBlock(
                      Bar,
                      {
                        key: 0,
                        ref_key: "barRef",
                        ref: j,
                        height: oe.value,
                        width: L.value,
                        always: he.always,
                        "ratio-x": z.value,
                        "ratio-y": ae.value,
                      },
                      null,
                      8,
                      ["height", "width", "always", "ratio-x", "ratio-y"]
                    )),
              ],
              2
            )
          )
        );
      },
    });
  var Scrollbar = _export_sfc$1(_sfc_main$v, [
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/scrollbar/src/scrollbar.vue",
    ],
  ]);
  const ElScrollbar = withInstall(Scrollbar),
    roleTypes = [
      "dialog",
      "grid",
      "group",
      "listbox",
      "menu",
      "navigation",
      "tooltip",
      "tree",
    ],
    popperProps = buildProps({
      role: { type: String, values: roleTypes, default: "tooltip" },
    }),
    __default__$k = defineComponent({ name: "ElPopperRoot", inheritAttrs: !1 }),
    _sfc_main$u = defineComponent({
      ...__default__$k,
      props: popperProps,
      setup(e, { expose: t }) {
        const n = e,
          r = ref(),
          i = ref(),
          g = ref(),
          y = ref(),
          $ = computed(() => n.role),
          k = {
            triggerRef: r,
            popperInstanceRef: i,
            contentRef: g,
            referenceRef: y,
            role: $,
          };
        return (
          t(k),
          provide(POPPER_INJECTION_KEY, k),
          (V, L) => renderSlot(V.$slots, "default")
        );
      },
    });
  var Popper = _export_sfc$1(_sfc_main$u, [
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/popper/src/popper.vue",
    ],
  ]);
  const popperArrowProps = buildProps({
      arrowOffset: { type: Number, default: 5 },
    }),
    __default__$j = defineComponent({
      name: "ElPopperArrow",
      inheritAttrs: !1,
    }),
    _sfc_main$t = defineComponent({
      ...__default__$j,
      props: popperArrowProps,
      setup(e, { expose: t }) {
        const n = e,
          r = useNamespace("popper"),
          { arrowOffset: i, arrowRef: g } = inject(
            POPPER_CONTENT_INJECTION_KEY,
            void 0
          );
        return (
          watch(
            () => n.arrowOffset,
            (y) => {
              i.value = y;
            }
          ),
          onBeforeUnmount(() => {
            g.value = void 0;
          }),
          t({ arrowRef: g }),
          (y, $) => (
            openBlock(),
            createElementBlock(
              "span",
              {
                ref_key: "arrowRef",
                ref: g,
                class: normalizeClass(unref(r).e("arrow")),
                "data-popper-arrow": "",
              },
              null,
              2
            )
          )
        );
      },
    });
  var ElPopperArrow = _export_sfc$1(_sfc_main$t, [
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/popper/src/arrow.vue",
    ],
  ]);
  const NAME = "ElOnlyChild",
    OnlyChild = defineComponent({
      name: NAME,
      setup(e, { slots: t, attrs: n }) {
        var r;
        const i = inject(FORWARD_REF_INJECTION_KEY),
          g = useForwardRefDirective(
            (r = i == null ? void 0 : i.setForwardRef) != null ? r : NOOP
          );
        return () => {
          var y;
          const $ = (y = t.default) == null ? void 0 : y.call(t, n);
          if (!$ || $.length > 1) return null;
          const k = findFirstLegitChild($);
          return k ? withDirectives(cloneVNode(k, n), [[g]]) : null;
        };
      },
    });
  function findFirstLegitChild(e) {
    if (!e) return null;
    const t = e;
    for (const n of t) {
      if (isObject$3(n))
        switch (n.type) {
          case Comment:
            continue;
          case Text:
          case "svg":
            return wrapTextContent(n);
          case Fragment:
            return findFirstLegitChild(n.children);
          default:
            return n;
        }
      return wrapTextContent(n);
    }
    return null;
  }
  function wrapTextContent(e) {
    const t = useNamespace("only-child");
    return createVNode("span", { class: t.e("content") }, [e]);
  }
  const popperTriggerProps = buildProps({
      virtualRef: { type: definePropType(Object) },
      virtualTriggering: Boolean,
      onMouseenter: { type: definePropType(Function) },
      onMouseleave: { type: definePropType(Function) },
      onClick: { type: definePropType(Function) },
      onKeydown: { type: definePropType(Function) },
      onFocus: { type: definePropType(Function) },
      onBlur: { type: definePropType(Function) },
      onContextmenu: { type: definePropType(Function) },
      id: String,
      open: Boolean,
    }),
    __default__$i = defineComponent({
      name: "ElPopperTrigger",
      inheritAttrs: !1,
    }),
    _sfc_main$s = defineComponent({
      ...__default__$i,
      props: popperTriggerProps,
      setup(e, { expose: t }) {
        const n = e,
          { role: r, triggerRef: i } = inject(POPPER_INJECTION_KEY, void 0);
        useForwardRef(i);
        const g = computed(() => ($.value ? n.id : void 0)),
          y = computed(() => {
            if (r && r.value === "tooltip")
              return n.open && n.id ? n.id : void 0;
          }),
          $ = computed(() => {
            if (r && r.value !== "tooltip") return r.value;
          }),
          k = computed(() => ($.value ? `${n.open}` : void 0));
        let V;
        return (
          onMounted(() => {
            watch(
              () => n.virtualRef,
              (L) => {
                L && (i.value = unrefElement$1(L));
              },
              { immediate: !0 }
            ),
              watch(
                i,
                (L, oe) => {
                  V == null || V(),
                    (V = void 0),
                    isElement(L) &&
                      ([
                        "onMouseenter",
                        "onMouseleave",
                        "onClick",
                        "onKeydown",
                        "onFocus",
                        "onBlur",
                        "onContextmenu",
                      ].forEach((j) => {
                        var ae;
                        const z = n[j];
                        z &&
                          (L.addEventListener(j.slice(2).toLowerCase(), z),
                          (ae = oe == null ? void 0 : oe.removeEventListener) ==
                            null || ae.call(oe, j.slice(2).toLowerCase(), z));
                      }),
                      (V = watch(
                        [g, y, $, k],
                        (j) => {
                          [
                            "aria-controls",
                            "aria-describedby",
                            "aria-haspopup",
                            "aria-expanded",
                          ].forEach((ae, z) => {
                            isNil(j[z])
                              ? L.removeAttribute(ae)
                              : L.setAttribute(ae, j[z]);
                          });
                        },
                        { immediate: !0 }
                      ))),
                    isElement(oe) &&
                      [
                        "aria-controls",
                        "aria-describedby",
                        "aria-haspopup",
                        "aria-expanded",
                      ].forEach((j) => oe.removeAttribute(j));
                },
                { immediate: !0 }
              );
          }),
          onBeforeUnmount(() => {
            V == null || V(), (V = void 0);
          }),
          t({ triggerRef: i }),
          (L, oe) =>
            L.virtualTriggering
              ? createCommentVNode("v-if", !0)
              : (openBlock(),
                createBlock(
                  unref(OnlyChild),
                  mergeProps({ key: 0 }, L.$attrs, {
                    "aria-controls": unref(g),
                    "aria-describedby": unref(y),
                    "aria-expanded": unref(k),
                    "aria-haspopup": unref($),
                  }),
                  {
                    default: withCtx(() => [renderSlot(L.$slots, "default")]),
                    _: 3,
                  },
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
  var ElPopperTrigger = _export_sfc$1(_sfc_main$s, [
      [
        "__file",
        "/home/runner/work/element-plus/element-plus/packages/components/popper/src/trigger.vue",
      ],
    ]),
    E$1 = "top",
    R = "bottom",
    W = "right",
    P$1 = "left",
    me = "auto",
    G = [E$1, R, W, P$1],
    U$1 = "start",
    J = "end",
    Xe = "clippingParents",
    je = "viewport",
    K = "popper",
    Ye = "reference",
    De = G.reduce(function (e, t) {
      return e.concat([t + "-" + U$1, t + "-" + J]);
    }, []),
    Ee = [].concat(G, [me]).reduce(function (e, t) {
      return e.concat([t, t + "-" + U$1, t + "-" + J]);
    }, []),
    Ge = "beforeRead",
    Je = "read",
    Ke = "afterRead",
    Qe = "beforeMain",
    Ze = "main",
    et = "afterMain",
    tt = "beforeWrite",
    nt = "write",
    rt = "afterWrite",
    ot = [Ge, Je, Ke, Qe, Ze, et, tt, nt, rt];
  function C(e) {
    return e ? (e.nodeName || "").toLowerCase() : null;
  }
  function H(e) {
    if (e == null) return window;
    if (e.toString() !== "[object Window]") {
      var t = e.ownerDocument;
      return (t && t.defaultView) || window;
    }
    return e;
  }
  function Q(e) {
    var t = H(e).Element;
    return e instanceof t || e instanceof Element;
  }
  function B(e) {
    var t = H(e).HTMLElement;
    return e instanceof t || e instanceof HTMLElement;
  }
  function Pe(e) {
    if (typeof ShadowRoot > "u") return !1;
    var t = H(e).ShadowRoot;
    return e instanceof t || e instanceof ShadowRoot;
  }
  function Mt(e) {
    var t = e.state;
    Object.keys(t.elements).forEach(function (n) {
      var r = t.styles[n] || {},
        i = t.attributes[n] || {},
        g = t.elements[n];
      !B(g) ||
        !C(g) ||
        (Object.assign(g.style, r),
        Object.keys(i).forEach(function (y) {
          var $ = i[y];
          $ === !1
            ? g.removeAttribute(y)
            : g.setAttribute(y, $ === !0 ? "" : $);
        }));
    });
  }
  function Rt(e) {
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
          var i = t.elements[r],
            g = t.attributes[r] || {},
            y = Object.keys(t.styles.hasOwnProperty(r) ? t.styles[r] : n[r]),
            $ = y.reduce(function (k, V) {
              return (k[V] = ""), k;
            }, {});
          !B(i) ||
            !C(i) ||
            (Object.assign(i.style, $),
            Object.keys(g).forEach(function (k) {
              i.removeAttribute(k);
            }));
        });
      }
    );
  }
  var Ae = {
    name: "applyStyles",
    enabled: !0,
    phase: "write",
    fn: Mt,
    effect: Rt,
    requires: ["computeStyles"],
  };
  function q(e) {
    return e.split("-")[0];
  }
  var X$1 = Math.max,
    ve = Math.min,
    Z = Math.round;
  function ee(e, t) {
    t === void 0 && (t = !1);
    var n = e.getBoundingClientRect(),
      r = 1,
      i = 1;
    if (B(e) && t) {
      var g = e.offsetHeight,
        y = e.offsetWidth;
      y > 0 && (r = Z(n.width) / y || 1), g > 0 && (i = Z(n.height) / g || 1);
    }
    return {
      width: n.width / r,
      height: n.height / i,
      top: n.top / i,
      right: n.right / r,
      bottom: n.bottom / i,
      left: n.left / r,
      x: n.left / r,
      y: n.top / i,
    };
  }
  function ke(e) {
    var t = ee(e),
      n = e.offsetWidth,
      r = e.offsetHeight;
    return (
      Math.abs(t.width - n) <= 1 && (n = t.width),
      Math.abs(t.height - r) <= 1 && (r = t.height),
      { x: e.offsetLeft, y: e.offsetTop, width: n, height: r }
    );
  }
  function it(e, t) {
    var n = t.getRootNode && t.getRootNode();
    if (e.contains(t)) return !0;
    if (n && Pe(n)) {
      var r = t;
      do {
        if (r && e.isSameNode(r)) return !0;
        r = r.parentNode || r.host;
      } while (r);
    }
    return !1;
  }
  function N$1(e) {
    return H(e).getComputedStyle(e);
  }
  function Wt(e) {
    return ["table", "td", "th"].indexOf(C(e)) >= 0;
  }
  function I$1(e) {
    return ((Q(e) ? e.ownerDocument : e.document) || window.document)
      .documentElement;
  }
  function ge(e) {
    return C(e) === "html"
      ? e
      : e.assignedSlot || e.parentNode || (Pe(e) ? e.host : null) || I$1(e);
  }
  function at(e) {
    return !B(e) || N$1(e).position === "fixed" ? null : e.offsetParent;
  }
  function Bt(e) {
    var t = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1,
      n = navigator.userAgent.indexOf("Trident") !== -1;
    if (n && B(e)) {
      var r = N$1(e);
      if (r.position === "fixed") return null;
    }
    var i = ge(e);
    for (Pe(i) && (i = i.host); B(i) && ["html", "body"].indexOf(C(i)) < 0; ) {
      var g = N$1(i);
      if (
        g.transform !== "none" ||
        g.perspective !== "none" ||
        g.contain === "paint" ||
        ["transform", "perspective"].indexOf(g.willChange) !== -1 ||
        (t && g.willChange === "filter") ||
        (t && g.filter && g.filter !== "none")
      )
        return i;
      i = i.parentNode;
    }
    return null;
  }
  function se(e) {
    for (var t = H(e), n = at(e); n && Wt(n) && N$1(n).position === "static"; )
      n = at(n);
    return n &&
      (C(n) === "html" || (C(n) === "body" && N$1(n).position === "static"))
      ? t
      : n || Bt(e) || t;
  }
  function Le(e) {
    return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
  }
  function fe(e, t, n) {
    return X$1(e, ve(t, n));
  }
  function St(e, t, n) {
    var r = fe(e, t, n);
    return r > n ? n : r;
  }
  function st() {
    return { top: 0, right: 0, bottom: 0, left: 0 };
  }
  function ft(e) {
    return Object.assign({}, st(), e);
  }
  function ct(e, t) {
    return t.reduce(function (n, r) {
      return (n[r] = e), n;
    }, {});
  }
  var Tt = function (e, t) {
    return (
      (e =
        typeof e == "function"
          ? e(Object.assign({}, t.rects, { placement: t.placement }))
          : e),
      ft(typeof e != "number" ? e : ct(e, G))
    );
  };
  function Ht(e) {
    var t,
      n = e.state,
      r = e.name,
      i = e.options,
      g = n.elements.arrow,
      y = n.modifiersData.popperOffsets,
      $ = q(n.placement),
      k = Le($),
      V = [P$1, W].indexOf($) >= 0,
      L = V ? "height" : "width";
    if (!(!g || !y)) {
      var oe = Tt(i.padding, n),
        j = ke(g),
        ae = k === "y" ? E$1 : P$1,
        z = k === "y" ? R : W,
        re =
          n.rects.reference[L] +
          n.rects.reference[k] -
          y[k] -
          n.rects.popper[L],
        ie = y[k] - n.rects.reference[k],
        le = se(g),
        de = le ? (k === "y" ? le.clientHeight || 0 : le.clientWidth || 0) : 0,
        ue = re / 2 - ie / 2,
        pe = oe[ae],
        Ce = de - j[L] - oe[z],
        Oe = de / 2 - j[L] / 2 + ue,
        he = fe(pe, Oe, Ce),
        $e = k;
      n.modifiersData[r] =
        ((t = {}), (t[$e] = he), (t.centerOffset = he - Oe), t);
    }
  }
  function Ct(e) {
    var t = e.state,
      n = e.options,
      r = n.element,
      i = r === void 0 ? "[data-popper-arrow]" : r;
    i != null &&
      ((typeof i == "string" &&
        ((i = t.elements.popper.querySelector(i)), !i)) ||
        !it(t.elements.popper, i) ||
        (t.elements.arrow = i));
  }
  var pt = {
    name: "arrow",
    enabled: !0,
    phase: "main",
    fn: Ht,
    effect: Ct,
    requires: ["popperOffsets"],
    requiresIfExists: ["preventOverflow"],
  };
  function te(e) {
    return e.split("-")[1];
  }
  var qt = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
  function Vt(e) {
    var t = e.x,
      n = e.y,
      r = window,
      i = r.devicePixelRatio || 1;
    return { x: Z(t * i) / i || 0, y: Z(n * i) / i || 0 };
  }
  function ut(e) {
    var t,
      n = e.popper,
      r = e.popperRect,
      i = e.placement,
      g = e.variation,
      y = e.offsets,
      $ = e.position,
      k = e.gpuAcceleration,
      V = e.adaptive,
      L = e.roundOffsets,
      oe = e.isFixed,
      j = y.x,
      ae = j === void 0 ? 0 : j,
      z = y.y,
      re = z === void 0 ? 0 : z,
      ie = typeof L == "function" ? L({ x: ae, y: re }) : { x: ae, y: re };
    (ae = ie.x), (re = ie.y);
    var le = y.hasOwnProperty("x"),
      de = y.hasOwnProperty("y"),
      ue = P$1,
      pe = E$1,
      Ce = window;
    if (V) {
      var Oe = se(n),
        he = "clientHeight",
        $e = "clientWidth";
      if (
        (Oe === H(n) &&
          ((Oe = I$1(n)),
          N$1(Oe).position !== "static" &&
            $ === "absolute" &&
            ((he = "scrollHeight"), ($e = "scrollWidth"))),
        (Oe = Oe),
        i === E$1 || ((i === P$1 || i === W) && g === J))
      ) {
        pe = R;
        var Ve =
          oe && Oe === Ce && Ce.visualViewport
            ? Ce.visualViewport.height
            : Oe[he];
        (re -= Ve - r.height), (re *= k ? 1 : -1);
      }
      if (i === P$1 || ((i === E$1 || i === R) && g === J)) {
        ue = W;
        var qe =
          oe && Oe === Ce && Ce.visualViewport
            ? Ce.visualViewport.width
            : Oe[$e];
        (ae -= qe - r.width), (ae *= k ? 1 : -1);
      }
    }
    var Cn = Object.assign({ position: $ }, V && qt),
      Pt = L === !0 ? Vt({ x: ae, y: re }) : { x: ae, y: re };
    if (((ae = Pt.x), (re = Pt.y), k)) {
      var kt;
      return Object.assign(
        {},
        Cn,
        ((kt = {}),
        (kt[pe] = de ? "0" : ""),
        (kt[ue] = le ? "0" : ""),
        (kt.transform =
          (Ce.devicePixelRatio || 1) <= 1
            ? "translate(" + ae + "px, " + re + "px)"
            : "translate3d(" + ae + "px, " + re + "px, 0)"),
        kt)
      );
    }
    return Object.assign(
      {},
      Cn,
      ((t = {}),
      (t[pe] = de ? re + "px" : ""),
      (t[ue] = le ? ae + "px" : ""),
      (t.transform = ""),
      t)
    );
  }
  function Nt(e) {
    var t = e.state,
      n = e.options,
      r = n.gpuAcceleration,
      i = r === void 0 ? !0 : r,
      g = n.adaptive,
      y = g === void 0 ? !0 : g,
      $ = n.roundOffsets,
      k = $ === void 0 ? !0 : $,
      V = {
        placement: q(t.placement),
        variation: te(t.placement),
        popper: t.elements.popper,
        popperRect: t.rects.popper,
        gpuAcceleration: i,
        isFixed: t.options.strategy === "fixed",
      };
    t.modifiersData.popperOffsets != null &&
      (t.styles.popper = Object.assign(
        {},
        t.styles.popper,
        ut(
          Object.assign({}, V, {
            offsets: t.modifiersData.popperOffsets,
            position: t.options.strategy,
            adaptive: y,
            roundOffsets: k,
          })
        )
      )),
      t.modifiersData.arrow != null &&
        (t.styles.arrow = Object.assign(
          {},
          t.styles.arrow,
          ut(
            Object.assign({}, V, {
              offsets: t.modifiersData.arrow,
              position: "absolute",
              adaptive: !1,
              roundOffsets: k,
            })
          )
        )),
      (t.attributes.popper = Object.assign({}, t.attributes.popper, {
        "data-popper-placement": t.placement,
      }));
  }
  var Me = {
      name: "computeStyles",
      enabled: !0,
      phase: "beforeWrite",
      fn: Nt,
      data: {},
    },
    ye = { passive: !0 };
  function It(e) {
    var t = e.state,
      n = e.instance,
      r = e.options,
      i = r.scroll,
      g = i === void 0 ? !0 : i,
      y = r.resize,
      $ = y === void 0 ? !0 : y,
      k = H(t.elements.popper),
      V = [].concat(t.scrollParents.reference, t.scrollParents.popper);
    return (
      g &&
        V.forEach(function (L) {
          L.addEventListener("scroll", n.update, ye);
        }),
      $ && k.addEventListener("resize", n.update, ye),
      function () {
        g &&
          V.forEach(function (L) {
            L.removeEventListener("scroll", n.update, ye);
          }),
          $ && k.removeEventListener("resize", n.update, ye);
      }
    );
  }
  var Re = {
      name: "eventListeners",
      enabled: !0,
      phase: "write",
      fn: function () {},
      effect: It,
      data: {},
    },
    _t = { left: "right", right: "left", bottom: "top", top: "bottom" };
  function be(e) {
    return e.replace(/left|right|bottom|top/g, function (t) {
      return _t[t];
    });
  }
  var zt = { start: "end", end: "start" };
  function lt(e) {
    return e.replace(/start|end/g, function (t) {
      return zt[t];
    });
  }
  function We(e) {
    var t = H(e),
      n = t.pageXOffset,
      r = t.pageYOffset;
    return { scrollLeft: n, scrollTop: r };
  }
  function Be(e) {
    return ee(I$1(e)).left + We(e).scrollLeft;
  }
  function Ft(e) {
    var t = H(e),
      n = I$1(e),
      r = t.visualViewport,
      i = n.clientWidth,
      g = n.clientHeight,
      y = 0,
      $ = 0;
    return (
      r &&
        ((i = r.width),
        (g = r.height),
        /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ||
          ((y = r.offsetLeft), ($ = r.offsetTop))),
      { width: i, height: g, x: y + Be(e), y: $ }
    );
  }
  function Ut(e) {
    var t,
      n = I$1(e),
      r = We(e),
      i = (t = e.ownerDocument) == null ? void 0 : t.body,
      g = X$1(
        n.scrollWidth,
        n.clientWidth,
        i ? i.scrollWidth : 0,
        i ? i.clientWidth : 0
      ),
      y = X$1(
        n.scrollHeight,
        n.clientHeight,
        i ? i.scrollHeight : 0,
        i ? i.clientHeight : 0
      ),
      $ = -r.scrollLeft + Be(e),
      k = -r.scrollTop;
    return (
      N$1(i || n).direction === "rtl" &&
        ($ += X$1(n.clientWidth, i ? i.clientWidth : 0) - g),
      { width: g, height: y, x: $, y: k }
    );
  }
  function Se(e) {
    var t = N$1(e),
      n = t.overflow,
      r = t.overflowX,
      i = t.overflowY;
    return /auto|scroll|overlay|hidden/.test(n + i + r);
  }
  function dt(e) {
    return ["html", "body", "#document"].indexOf(C(e)) >= 0
      ? e.ownerDocument.body
      : B(e) && Se(e)
      ? e
      : dt(ge(e));
  }
  function ce(e, t) {
    var n;
    t === void 0 && (t = []);
    var r = dt(e),
      i = r === ((n = e.ownerDocument) == null ? void 0 : n.body),
      g = H(r),
      y = i ? [g].concat(g.visualViewport || [], Se(r) ? r : []) : r,
      $ = t.concat(y);
    return i ? $ : $.concat(ce(ge(y)));
  }
  function Te(e) {
    return Object.assign({}, e, {
      left: e.x,
      top: e.y,
      right: e.x + e.width,
      bottom: e.y + e.height,
    });
  }
  function Xt(e) {
    var t = ee(e);
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
  function ht(e, t) {
    return t === je ? Te(Ft(e)) : Q(t) ? Xt(t) : Te(Ut(I$1(e)));
  }
  function Yt(e) {
    var t = ce(ge(e)),
      n = ["absolute", "fixed"].indexOf(N$1(e).position) >= 0,
      r = n && B(e) ? se(e) : e;
    return Q(r)
      ? t.filter(function (i) {
          return Q(i) && it(i, r) && C(i) !== "body";
        })
      : [];
  }
  function Gt(e, t, n) {
    var r = t === "clippingParents" ? Yt(e) : [].concat(t),
      i = [].concat(r, [n]),
      g = i[0],
      y = i.reduce(function ($, k) {
        var V = ht(e, k);
        return (
          ($.top = X$1(V.top, $.top)),
          ($.right = ve(V.right, $.right)),
          ($.bottom = ve(V.bottom, $.bottom)),
          ($.left = X$1(V.left, $.left)),
          $
        );
      }, ht(e, g));
    return (
      (y.width = y.right - y.left),
      (y.height = y.bottom - y.top),
      (y.x = y.left),
      (y.y = y.top),
      y
    );
  }
  function mt(e) {
    var t = e.reference,
      n = e.element,
      r = e.placement,
      i = r ? q(r) : null,
      g = r ? te(r) : null,
      y = t.x + t.width / 2 - n.width / 2,
      $ = t.y + t.height / 2 - n.height / 2,
      k;
    switch (i) {
      case E$1:
        k = { x: y, y: t.y - n.height };
        break;
      case R:
        k = { x: y, y: t.y + t.height };
        break;
      case W:
        k = { x: t.x + t.width, y: $ };
        break;
      case P$1:
        k = { x: t.x - n.width, y: $ };
        break;
      default:
        k = { x: t.x, y: t.y };
    }
    var V = i ? Le(i) : null;
    if (V != null) {
      var L = V === "y" ? "height" : "width";
      switch (g) {
        case U$1:
          k[V] = k[V] - (t[L] / 2 - n[L] / 2);
          break;
        case J:
          k[V] = k[V] + (t[L] / 2 - n[L] / 2);
          break;
      }
    }
    return k;
  }
  function ne(e, t) {
    t === void 0 && (t = {});
    var n = t,
      r = n.placement,
      i = r === void 0 ? e.placement : r,
      g = n.boundary,
      y = g === void 0 ? Xe : g,
      $ = n.rootBoundary,
      k = $ === void 0 ? je : $,
      V = n.elementContext,
      L = V === void 0 ? K : V,
      oe = n.altBoundary,
      j = oe === void 0 ? !1 : oe,
      ae = n.padding,
      z = ae === void 0 ? 0 : ae,
      re = ft(typeof z != "number" ? z : ct(z, G)),
      ie = L === K ? Ye : K,
      le = e.rects.popper,
      de = e.elements[j ? ie : L],
      ue = Gt(Q(de) ? de : de.contextElement || I$1(e.elements.popper), y, k),
      pe = ee(e.elements.reference),
      Ce = mt({
        reference: pe,
        element: le,
        strategy: "absolute",
        placement: i,
      }),
      Oe = Te(Object.assign({}, le, Ce)),
      he = L === K ? Oe : pe,
      $e = {
        top: ue.top - he.top + re.top,
        bottom: he.bottom - ue.bottom + re.bottom,
        left: ue.left - he.left + re.left,
        right: he.right - ue.right + re.right,
      },
      Ve = e.modifiersData.offset;
    if (L === K && Ve) {
      var qe = Ve[i];
      Object.keys($e).forEach(function (Cn) {
        var Pt = [W, R].indexOf(Cn) >= 0 ? 1 : -1,
          kt = [E$1, R].indexOf(Cn) >= 0 ? "y" : "x";
        $e[Cn] += qe[kt] * Pt;
      });
    }
    return $e;
  }
  function Jt(e, t) {
    t === void 0 && (t = {});
    var n = t,
      r = n.placement,
      i = n.boundary,
      g = n.rootBoundary,
      y = n.padding,
      $ = n.flipVariations,
      k = n.allowedAutoPlacements,
      V = k === void 0 ? Ee : k,
      L = te(r),
      oe = L
        ? $
          ? De
          : De.filter(function (z) {
              return te(z) === L;
            })
        : G,
      j = oe.filter(function (z) {
        return V.indexOf(z) >= 0;
      });
    j.length === 0 && (j = oe);
    var ae = j.reduce(function (z, re) {
      return (
        (z[re] = ne(e, {
          placement: re,
          boundary: i,
          rootBoundary: g,
          padding: y,
        })[q(re)]),
        z
      );
    }, {});
    return Object.keys(ae).sort(function (z, re) {
      return ae[z] - ae[re];
    });
  }
  function Kt(e) {
    if (q(e) === me) return [];
    var t = be(e);
    return [lt(e), t, lt(t)];
  }
  function Qt(e) {
    var t = e.state,
      n = e.options,
      r = e.name;
    if (!t.modifiersData[r]._skip) {
      for (
        var i = n.mainAxis,
          g = i === void 0 ? !0 : i,
          y = n.altAxis,
          $ = y === void 0 ? !0 : y,
          k = n.fallbackPlacements,
          V = n.padding,
          L = n.boundary,
          oe = n.rootBoundary,
          j = n.altBoundary,
          ae = n.flipVariations,
          z = ae === void 0 ? !0 : ae,
          re = n.allowedAutoPlacements,
          ie = t.options.placement,
          le = q(ie),
          de = le === ie,
          ue = k || (de || !z ? [be(ie)] : Kt(ie)),
          pe = [ie].concat(ue).reduce(function (zn, Rn) {
            return zn.concat(
              q(Rn) === me
                ? Jt(t, {
                    placement: Rn,
                    boundary: L,
                    rootBoundary: oe,
                    padding: V,
                    flipVariations: z,
                    allowedAutoPlacements: re,
                  })
                : Rn
            );
          }, []),
          Ce = t.rects.reference,
          Oe = t.rects.popper,
          he = new Map(),
          $e = !0,
          Ve = pe[0],
          qe = 0;
        qe < pe.length;
        qe++
      ) {
        var Cn = pe[qe],
          Pt = q(Cn),
          kt = te(Cn) === U$1,
          Fe = [E$1, R].indexOf(Pt) >= 0,
          xe = Fe ? "width" : "height",
          Lt = ne(t, {
            placement: Cn,
            boundary: L,
            rootBoundary: oe,
            altBoundary: j,
            padding: V,
          }),
          At = Fe ? (kt ? W : P$1) : kt ? R : E$1;
        Ce[xe] > Oe[xe] && (At = be(At));
        var Ue = be(At),
          ze = [];
        if (
          (g && ze.push(Lt[Pt] <= 0),
          $ && ze.push(Lt[At] <= 0, Lt[Ue] <= 0),
          ze.every(function (zn) {
            return zn;
          }))
        ) {
          (Ve = Cn), ($e = !1);
          break;
        }
        he.set(Cn, ze);
      }
      if ($e)
        for (
          var Tn = z ? 3 : 1,
            Nn = function (zn) {
              var Rn = pe.find(function (Ln) {
                var jn = he.get(Ln);
                if (jn)
                  return jn.slice(0, zn).every(function (Fn) {
                    return Fn;
                  });
              });
              if (Rn) return (Ve = Rn), "break";
            },
            xn = Tn;
          xn > 0;
          xn--
        ) {
          var Mn = Nn(xn);
          if (Mn === "break") break;
        }
      t.placement !== Ve &&
        ((t.modifiersData[r]._skip = !0), (t.placement = Ve), (t.reset = !0));
    }
  }
  var vt = {
    name: "flip",
    enabled: !0,
    phase: "main",
    fn: Qt,
    requiresIfExists: ["offset"],
    data: { _skip: !1 },
  };
  function gt(e, t, n) {
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
  function yt(e) {
    return [E$1, W, R, P$1].some(function (t) {
      return e[t] >= 0;
    });
  }
  function Zt(e) {
    var t = e.state,
      n = e.name,
      r = t.rects.reference,
      i = t.rects.popper,
      g = t.modifiersData.preventOverflow,
      y = ne(t, { elementContext: "reference" }),
      $ = ne(t, { altBoundary: !0 }),
      k = gt(y, r),
      V = gt($, i, g),
      L = yt(k),
      oe = yt(V);
    (t.modifiersData[n] = {
      referenceClippingOffsets: k,
      popperEscapeOffsets: V,
      isReferenceHidden: L,
      hasPopperEscaped: oe,
    }),
      (t.attributes.popper = Object.assign({}, t.attributes.popper, {
        "data-popper-reference-hidden": L,
        "data-popper-escaped": oe,
      }));
  }
  var bt = {
    name: "hide",
    enabled: !0,
    phase: "main",
    requiresIfExists: ["preventOverflow"],
    fn: Zt,
  };
  function en(e, t, n) {
    var r = q(e),
      i = [P$1, E$1].indexOf(r) >= 0 ? -1 : 1,
      g =
        typeof n == "function" ? n(Object.assign({}, t, { placement: e })) : n,
      y = g[0],
      $ = g[1];
    return (
      (y = y || 0),
      ($ = ($ || 0) * i),
      [P$1, W].indexOf(r) >= 0 ? { x: $, y } : { x: y, y: $ }
    );
  }
  function tn(e) {
    var t = e.state,
      n = e.options,
      r = e.name,
      i = n.offset,
      g = i === void 0 ? [0, 0] : i,
      y = Ee.reduce(function (L, oe) {
        return (L[oe] = en(oe, t.rects, g)), L;
      }, {}),
      $ = y[t.placement],
      k = $.x,
      V = $.y;
    t.modifiersData.popperOffsets != null &&
      ((t.modifiersData.popperOffsets.x += k),
      (t.modifiersData.popperOffsets.y += V)),
      (t.modifiersData[r] = y);
  }
  var wt = {
    name: "offset",
    enabled: !0,
    phase: "main",
    requires: ["popperOffsets"],
    fn: tn,
  };
  function nn(e) {
    var t = e.state,
      n = e.name;
    t.modifiersData[n] = mt({
      reference: t.rects.reference,
      element: t.rects.popper,
      strategy: "absolute",
      placement: t.placement,
    });
  }
  var He = {
    name: "popperOffsets",
    enabled: !0,
    phase: "read",
    fn: nn,
    data: {},
  };
  function rn(e) {
    return e === "x" ? "y" : "x";
  }
  function on(e) {
    var t = e.state,
      n = e.options,
      r = e.name,
      i = n.mainAxis,
      g = i === void 0 ? !0 : i,
      y = n.altAxis,
      $ = y === void 0 ? !1 : y,
      k = n.boundary,
      V = n.rootBoundary,
      L = n.altBoundary,
      oe = n.padding,
      j = n.tether,
      ae = j === void 0 ? !0 : j,
      z = n.tetherOffset,
      re = z === void 0 ? 0 : z,
      ie = ne(t, { boundary: k, rootBoundary: V, padding: oe, altBoundary: L }),
      le = q(t.placement),
      de = te(t.placement),
      ue = !de,
      pe = Le(le),
      Ce = rn(pe),
      Oe = t.modifiersData.popperOffsets,
      he = t.rects.reference,
      $e = t.rects.popper,
      Ve =
        typeof re == "function"
          ? re(Object.assign({}, t.rects, { placement: t.placement }))
          : re,
      qe =
        typeof Ve == "number"
          ? { mainAxis: Ve, altAxis: Ve }
          : Object.assign({ mainAxis: 0, altAxis: 0 }, Ve),
      Cn = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
      Pt = { x: 0, y: 0 };
    if (Oe) {
      if (g) {
        var kt,
          Fe = pe === "y" ? E$1 : P$1,
          xe = pe === "y" ? R : W,
          Lt = pe === "y" ? "height" : "width",
          At = Oe[pe],
          Ue = At + ie[Fe],
          ze = At - ie[xe],
          Tn = ae ? -$e[Lt] / 2 : 0,
          Nn = de === U$1 ? he[Lt] : $e[Lt],
          xn = de === U$1 ? -$e[Lt] : -he[Lt],
          Mn = t.elements.arrow,
          zn = ae && Mn ? ke(Mn) : { width: 0, height: 0 },
          Rn = t.modifiersData["arrow#persistent"]
            ? t.modifiersData["arrow#persistent"].padding
            : st(),
          Ln = Rn[Fe],
          jn = Rn[xe],
          Fn = fe(0, he[Lt], zn[Lt]),
          Hn = ue
            ? he[Lt] / 2 - Tn - Fn - Ln - qe.mainAxis
            : Nn - Fn - Ln - qe.mainAxis,
          qn = ue
            ? -he[Lt] / 2 + Tn + Fn + jn + qe.mainAxis
            : xn + Fn + jn + qe.mainAxis,
          Gn = t.elements.arrow && se(t.elements.arrow),
          _e = Gn ? (pe === "y" ? Gn.clientTop || 0 : Gn.clientLeft || 0) : 0,
          Ne = (kt = Cn == null ? void 0 : Cn[pe]) != null ? kt : 0,
          Dt = At + Hn - Ne - _e,
          vn = At + qn - Ne,
          hn = fe(ae ? ve(Ue, Dt) : Ue, At, ae ? X$1(ze, vn) : ze);
        (Oe[pe] = hn), (Pt[pe] = hn - At);
      }
      if ($) {
        var Sn,
          On = pe === "x" ? E$1 : P$1,
          _n = pe === "x" ? R : W,
          wn = Oe[Ce],
          bn = Ce === "y" ? "height" : "width",
          Et = wn + ie[On],
          En = wn - ie[_n],
          kn = [E$1, P$1].indexOf(le) !== -1,
          In = (Sn = Cn == null ? void 0 : Cn[Ce]) != null ? Sn : 0,
          Dn = kn ? Et : wn - he[bn] - $e[bn] - In + qe.altAxis,
          Kn = kn ? wn + he[bn] + $e[bn] - In - qe.altAxis : En,
          Un = ae && kn ? St(Dn, wn, Kn) : fe(ae ? Dn : Et, wn, ae ? Kn : En);
        (Oe[Ce] = Un), (Pt[Ce] = Un - wn);
      }
      t.modifiersData[r] = Pt;
    }
  }
  var xt = {
    name: "preventOverflow",
    enabled: !0,
    phase: "main",
    fn: on,
    requiresIfExists: ["offset"],
  };
  function an(e) {
    return { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop };
  }
  function sn(e) {
    return e === H(e) || !B(e) ? We(e) : an(e);
  }
  function fn(e) {
    var t = e.getBoundingClientRect(),
      n = Z(t.width) / e.offsetWidth || 1,
      r = Z(t.height) / e.offsetHeight || 1;
    return n !== 1 || r !== 1;
  }
  function cn(e, t, n) {
    n === void 0 && (n = !1);
    var r = B(t),
      i = B(t) && fn(t),
      g = I$1(t),
      y = ee(e, i),
      $ = { scrollLeft: 0, scrollTop: 0 },
      k = { x: 0, y: 0 };
    return (
      (r || (!r && !n)) &&
        ((C(t) !== "body" || Se(g)) && ($ = sn(t)),
        B(t)
          ? ((k = ee(t, !0)), (k.x += t.clientLeft), (k.y += t.clientTop))
          : g && (k.x = Be(g))),
      {
        x: y.left + $.scrollLeft - k.x,
        y: y.top + $.scrollTop - k.y,
        width: y.width,
        height: y.height,
      }
    );
  }
  function pn(e) {
    var t = new Map(),
      n = new Set(),
      r = [];
    e.forEach(function (g) {
      t.set(g.name, g);
    });
    function i(g) {
      n.add(g.name);
      var y = [].concat(g.requires || [], g.requiresIfExists || []);
      y.forEach(function ($) {
        if (!n.has($)) {
          var k = t.get($);
          k && i(k);
        }
      }),
        r.push(g);
    }
    return (
      e.forEach(function (g) {
        n.has(g.name) || i(g);
      }),
      r
    );
  }
  function un(e) {
    var t = pn(e);
    return ot.reduce(function (n, r) {
      return n.concat(
        t.filter(function (i) {
          return i.phase === r;
        })
      );
    }, []);
  }
  function ln(e) {
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
  function dn(e) {
    var t = e.reduce(function (n, r) {
      var i = n[r.name];
      return (
        (n[r.name] = i
          ? Object.assign({}, i, r, {
              options: Object.assign({}, i.options, r.options),
              data: Object.assign({}, i.data, r.data),
            })
          : r),
        n
      );
    }, {});
    return Object.keys(t).map(function (n) {
      return t[n];
    });
  }
  var Ot = { placement: "bottom", modifiers: [], strategy: "absolute" };
  function $t() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n];
    return !t.some(function (r) {
      return !(r && typeof r.getBoundingClientRect == "function");
    });
  }
  function we(e) {
    e === void 0 && (e = {});
    var t = e,
      n = t.defaultModifiers,
      r = n === void 0 ? [] : n,
      i = t.defaultOptions,
      g = i === void 0 ? Ot : i;
    return function (y, $, k) {
      k === void 0 && (k = g);
      var V = {
          placement: "bottom",
          orderedModifiers: [],
          options: Object.assign({}, Ot, g),
          modifiersData: {},
          elements: { reference: y, popper: $ },
          attributes: {},
          styles: {},
        },
        L = [],
        oe = !1,
        j = {
          state: V,
          setOptions: function (re) {
            var ie = typeof re == "function" ? re(V.options) : re;
            z(),
              (V.options = Object.assign({}, g, V.options, ie)),
              (V.scrollParents = {
                reference: Q(y)
                  ? ce(y)
                  : y.contextElement
                  ? ce(y.contextElement)
                  : [],
                popper: ce($),
              });
            var le = un(dn([].concat(r, V.options.modifiers)));
            return (
              (V.orderedModifiers = le.filter(function (de) {
                return de.enabled;
              })),
              ae(),
              j.update()
            );
          },
          forceUpdate: function () {
            if (!oe) {
              var re = V.elements,
                ie = re.reference,
                le = re.popper;
              if ($t(ie, le)) {
                (V.rects = {
                  reference: cn(ie, se(le), V.options.strategy === "fixed"),
                  popper: ke(le),
                }),
                  (V.reset = !1),
                  (V.placement = V.options.placement),
                  V.orderedModifiers.forEach(function ($e) {
                    return (V.modifiersData[$e.name] = Object.assign(
                      {},
                      $e.data
                    ));
                  });
                for (var de = 0; de < V.orderedModifiers.length; de++) {
                  if (V.reset === !0) {
                    (V.reset = !1), (de = -1);
                    continue;
                  }
                  var ue = V.orderedModifiers[de],
                    pe = ue.fn,
                    Ce = ue.options,
                    Oe = Ce === void 0 ? {} : Ce,
                    he = ue.name;
                  typeof pe == "function" &&
                    (V =
                      pe({ state: V, options: Oe, name: he, instance: j }) ||
                      V);
                }
              }
            }
          },
          update: ln(function () {
            return new Promise(function (re) {
              j.forceUpdate(), re(V);
            });
          }),
          destroy: function () {
            z(), (oe = !0);
          },
        };
      if (!$t(y, $)) return j;
      j.setOptions(k).then(function (re) {
        !oe && k.onFirstUpdate && k.onFirstUpdate(re);
      });
      function ae() {
        V.orderedModifiers.forEach(function (re) {
          var ie = re.name,
            le = re.options,
            de = le === void 0 ? {} : le,
            ue = re.effect;
          if (typeof ue == "function") {
            var pe = ue({ state: V, name: ie, instance: j, options: de }),
              Ce = function () {};
            L.push(pe || Ce);
          }
        });
      }
      function z() {
        L.forEach(function (re) {
          return re();
        }),
          (L = []);
      }
      return j;
    };
  }
  we();
  var mn = [Re, He, Me, Ae];
  we({ defaultModifiers: mn });
  var gn = [Re, He, Me, Ae, wt, vt, xt, pt, bt],
    yn = we({ defaultModifiers: gn });
  const FOCUS_AFTER_TRAPPED = "focus-trap.focus-after-trapped",
    FOCUS_AFTER_RELEASED = "focus-trap.focus-after-released",
    FOCUSOUT_PREVENTED = "focus-trap.focusout-prevented",
    FOCUS_AFTER_TRAPPED_OPTS = { cancelable: !0, bubbles: !1 },
    FOCUSOUT_PREVENTED_OPTS = { cancelable: !0, bubbles: !1 },
    ON_TRAP_FOCUS_EVT = "focusAfterTrapped",
    ON_RELEASE_FOCUS_EVT = "focusAfterReleased",
    FOCUS_TRAP_INJECTION_KEY = Symbol("elFocusTrap"),
    focusReason = ref(),
    lastUserFocusTimestamp = ref(0),
    lastAutomatedFocusTimestamp = ref(0);
  let focusReasonUserCount = 0;
  const obtainAllFocusableElements = (e) => {
      const t = [],
        n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
          acceptNode: (r) => {
            const i = r.tagName === "INPUT" && r.type === "hidden";
            return r.disabled || r.hidden || i
              ? NodeFilter.FILTER_SKIP
              : r.tabIndex >= 0 || r === document.activeElement
              ? NodeFilter.FILTER_ACCEPT
              : NodeFilter.FILTER_SKIP;
          },
        });
      for (; n.nextNode(); ) t.push(n.currentNode);
      return t;
    },
    getVisibleElement = (e, t) => {
      for (const n of e) if (!isHidden(n, t)) return n;
    },
    isHidden = (e, t) => {
      if (getComputedStyle(e).visibility === "hidden") return !0;
      for (; e; ) {
        if (t && e === t) return !1;
        if (getComputedStyle(e).display === "none") return !0;
        e = e.parentElement;
      }
      return !1;
    },
    getEdges = (e) => {
      const t = obtainAllFocusableElements(e),
        n = getVisibleElement(t, e),
        r = getVisibleElement(t.reverse(), e);
      return [n, r];
    },
    isSelectable = (e) => e instanceof HTMLInputElement && "select" in e,
    tryFocus = (e, t) => {
      if (e && e.focus) {
        const n = document.activeElement;
        e.focus({ preventScroll: !0 }),
          (lastAutomatedFocusTimestamp.value = window.performance.now()),
          e !== n && isSelectable(e) && t && e.select();
      }
    };
  function removeFromStack(e, t) {
    const n = [...e],
      r = e.indexOf(t);
    return r !== -1 && n.splice(r, 1), n;
  }
  const createFocusableStack = () => {
      let e = [];
      return {
        push: (r) => {
          const i = e[0];
          i && r !== i && i.pause(), (e = removeFromStack(e, r)), e.unshift(r);
        },
        remove: (r) => {
          var i, g;
          (e = removeFromStack(e, r)),
            (g = (i = e[0]) == null ? void 0 : i.resume) == null || g.call(i);
        },
      };
    },
    focusFirstDescendant = (e, t = !1) => {
      const n = document.activeElement;
      for (const r of e)
        if ((tryFocus(r, t), document.activeElement !== n)) return;
    },
    focusableStack = createFocusableStack(),
    isFocusCausedByUserEvent = () =>
      lastUserFocusTimestamp.value > lastAutomatedFocusTimestamp.value,
    notifyFocusReasonPointer = () => {
      (focusReason.value = "pointer"),
        (lastUserFocusTimestamp.value = window.performance.now());
    },
    notifyFocusReasonKeydown = () => {
      (focusReason.value = "keyboard"),
        (lastUserFocusTimestamp.value = window.performance.now());
    },
    useFocusReason = () => (
      onMounted(() => {
        focusReasonUserCount === 0 &&
          (document.addEventListener("mousedown", notifyFocusReasonPointer),
          document.addEventListener("touchstart", notifyFocusReasonPointer),
          document.addEventListener("keydown", notifyFocusReasonKeydown)),
          focusReasonUserCount++;
      }),
      onBeforeUnmount(() => {
        focusReasonUserCount--,
          focusReasonUserCount <= 0 &&
            (document.removeEventListener(
              "mousedown",
              notifyFocusReasonPointer
            ),
            document.removeEventListener(
              "touchstart",
              notifyFocusReasonPointer
            ),
            document.removeEventListener("keydown", notifyFocusReasonKeydown));
      }),
      { focusReason, lastUserFocusTimestamp, lastAutomatedFocusTimestamp }
    ),
    createFocusOutPreventedEvent = (e) =>
      new CustomEvent(FOCUSOUT_PREVENTED, {
        ...FOCUSOUT_PREVENTED_OPTS,
        detail: e,
      }),
    _sfc_main$r = defineComponent({
      name: "ElFocusTrap",
      inheritAttrs: !1,
      props: {
        loop: Boolean,
        trapped: Boolean,
        focusTrapEl: Object,
        focusStartEl: { type: [Object, String], default: "first" },
      },
      emits: [
        ON_TRAP_FOCUS_EVT,
        ON_RELEASE_FOCUS_EVT,
        "focusin",
        "focusout",
        "focusout-prevented",
        "release-requested",
      ],
      setup(e, { emit: t }) {
        const n = ref();
        let r, i;
        const { focusReason: g } = useFocusReason();
        useEscapeKeydown((z) => {
          e.trapped && !y.paused && t("release-requested", z);
        });
        const y = {
            paused: !1,
            pause() {
              this.paused = !0;
            },
            resume() {
              this.paused = !1;
            },
          },
          $ = (z) => {
            if ((!e.loop && !e.trapped) || y.paused) return;
            const {
                key: re,
                altKey: ie,
                ctrlKey: le,
                metaKey: de,
                currentTarget: ue,
                shiftKey: pe,
              } = z,
              { loop: Ce } = e,
              Oe = re === EVENT_CODE.tab && !ie && !le && !de,
              he = document.activeElement;
            if (Oe && he) {
              const $e = ue,
                [Ve, qe] = getEdges($e);
              if (Ve && qe) {
                if (!pe && he === qe) {
                  const Pt = createFocusOutPreventedEvent({
                    focusReason: g.value,
                  });
                  t("focusout-prevented", Pt),
                    Pt.defaultPrevented ||
                      (z.preventDefault(), Ce && tryFocus(Ve, !0));
                } else if (pe && [Ve, $e].includes(he)) {
                  const Pt = createFocusOutPreventedEvent({
                    focusReason: g.value,
                  });
                  t("focusout-prevented", Pt),
                    Pt.defaultPrevented ||
                      (z.preventDefault(), Ce && tryFocus(qe, !0));
                }
              } else if (he === $e) {
                const Pt = createFocusOutPreventedEvent({
                  focusReason: g.value,
                });
                t("focusout-prevented", Pt),
                  Pt.defaultPrevented || z.preventDefault();
              }
            }
          };
        provide(FOCUS_TRAP_INJECTION_KEY, { focusTrapRef: n, onKeydown: $ }),
          watch(
            () => e.focusTrapEl,
            (z) => {
              z && (n.value = z);
            },
            { immediate: !0 }
          ),
          watch([n], ([z], [re]) => {
            z &&
              (z.addEventListener("keydown", $),
              z.addEventListener("focusin", L),
              z.addEventListener("focusout", oe)),
              re &&
                (re.removeEventListener("keydown", $),
                re.removeEventListener("focusin", L),
                re.removeEventListener("focusout", oe));
          });
        const k = (z) => {
            t(ON_TRAP_FOCUS_EVT, z);
          },
          V = (z) => t(ON_RELEASE_FOCUS_EVT, z),
          L = (z) => {
            const re = unref(n);
            if (!re) return;
            const ie = z.target,
              le = z.relatedTarget,
              de = ie && re.contains(ie);
            e.trapped || (le && re.contains(le)) || (r = le),
              de && t("focusin", z),
              !y.paused && e.trapped && (de ? (i = ie) : tryFocus(i, !0));
          },
          oe = (z) => {
            const re = unref(n);
            if (!(y.paused || !re))
              if (e.trapped) {
                const ie = z.relatedTarget;
                !isNil(ie) &&
                  !re.contains(ie) &&
                  setTimeout(() => {
                    if (!y.paused && e.trapped) {
                      const le = createFocusOutPreventedEvent({
                        focusReason: g.value,
                      });
                      t("focusout-prevented", le),
                        le.defaultPrevented || tryFocus(i, !0);
                    }
                  }, 0);
              } else {
                const ie = z.target;
                (ie && re.contains(ie)) || t("focusout", z);
              }
          };
        async function j() {
          await nextTick();
          const z = unref(n);
          if (z) {
            focusableStack.push(y);
            const re = z.contains(document.activeElement)
              ? r
              : document.activeElement;
            if (((r = re), !z.contains(re))) {
              const le = new Event(
                FOCUS_AFTER_TRAPPED,
                FOCUS_AFTER_TRAPPED_OPTS
              );
              z.addEventListener(FOCUS_AFTER_TRAPPED, k),
                z.dispatchEvent(le),
                le.defaultPrevented ||
                  nextTick(() => {
                    let de = e.focusStartEl;
                    isString$3(de) ||
                      (tryFocus(de),
                      document.activeElement !== de && (de = "first")),
                      de === "first" &&
                        focusFirstDescendant(obtainAllFocusableElements(z), !0),
                      (document.activeElement === re || de === "container") &&
                        tryFocus(z);
                  });
            }
          }
        }
        function ae() {
          const z = unref(n);
          if (z) {
            z.removeEventListener(FOCUS_AFTER_TRAPPED, k);
            const re = new CustomEvent(FOCUS_AFTER_RELEASED, {
              ...FOCUS_AFTER_TRAPPED_OPTS,
              detail: { focusReason: g.value },
            });
            z.addEventListener(FOCUS_AFTER_RELEASED, V),
              z.dispatchEvent(re),
              !re.defaultPrevented &&
                (g.value == "keyboard" || !isFocusCausedByUserEvent()) &&
                tryFocus(r ?? document.body),
              z.removeEventListener(FOCUS_AFTER_RELEASED, k),
              focusableStack.remove(y);
          }
        }
        return (
          onMounted(() => {
            e.trapped && j(),
              watch(
                () => e.trapped,
                (z) => {
                  z ? j() : ae();
                }
              );
          }),
          onBeforeUnmount(() => {
            e.trapped && ae();
          }),
          { onKeydown: $ }
        );
      },
    });
  function _sfc_render$7(e, t, n, r, i, g) {
    return renderSlot(e.$slots, "default", { handleKeydown: e.onKeydown });
  }
  var ElFocusTrap = _export_sfc$1(_sfc_main$r, [
    ["render", _sfc_render$7],
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/focus-trap/src/focus-trap.vue",
    ],
  ]);
  const POSITIONING_STRATEGIES = ["fixed", "absolute"],
    popperCoreConfigProps = buildProps({
      boundariesPadding: { type: Number, default: 0 },
      fallbackPlacements: { type: definePropType(Array), default: void 0 },
      gpuAcceleration: { type: Boolean, default: !0 },
      offset: { type: Number, default: 12 },
      placement: { type: String, values: Ee, default: "bottom" },
      popperOptions: { type: definePropType(Object), default: () => ({}) },
      strategy: {
        type: String,
        values: POSITIONING_STRATEGIES,
        default: "absolute",
      },
    }),
    popperContentProps = buildProps({
      ...popperCoreConfigProps,
      id: String,
      style: { type: definePropType([String, Array, Object]) },
      className: { type: definePropType([String, Array, Object]) },
      effect: { type: String, default: "dark" },
      visible: Boolean,
      enterable: { type: Boolean, default: !0 },
      pure: Boolean,
      focusOnShow: { type: Boolean, default: !1 },
      trapping: { type: Boolean, default: !1 },
      popperClass: { type: definePropType([String, Array, Object]) },
      popperStyle: { type: definePropType([String, Array, Object]) },
      referenceEl: { type: definePropType(Object) },
      triggerTargetEl: { type: definePropType(Object) },
      stopPopperMouseEvent: { type: Boolean, default: !0 },
      ariaLabel: { type: String, default: void 0 },
      virtualTriggering: Boolean,
      zIndex: Number,
    }),
    popperContentEmits = {
      mouseenter: (e) => e instanceof MouseEvent,
      mouseleave: (e) => e instanceof MouseEvent,
      focus: () => !0,
      blur: () => !0,
      close: () => !0,
    },
    buildPopperOptions = (e, t) => {
      const { placement: n, strategy: r, popperOptions: i } = e,
        g = { placement: n, strategy: r, ...i, modifiers: genModifiers(e) };
      return (
        attachArrow(g, t),
        deriveExtraModifiers(g, i == null ? void 0 : i.modifiers),
        g
      );
    },
    unwrapMeasurableEl = (e) => {
      if (isClient$1) return unrefElement$1(e);
    };
  function genModifiers(e) {
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
  function attachArrow(e, { arrowEl: t, arrowOffset: n }) {
    e.modifiers.push({
      name: "arrow",
      options: { element: t, padding: n ?? 5 },
    });
  }
  function deriveExtraModifiers(e, t) {
    t && (e.modifiers = [...e.modifiers, ...(t ?? [])]);
  }
  const __default__$h = defineComponent({ name: "ElPopperContent" }),
    _sfc_main$q = defineComponent({
      ...__default__$h,
      props: popperContentProps,
      emits: popperContentEmits,
      setup(e, { expose: t, emit: n }) {
        const r = e,
          {
            popperInstanceRef: i,
            contentRef: g,
            triggerRef: y,
            role: $,
          } = inject(POPPER_INJECTION_KEY, void 0),
          k = inject(formItemContextKey, void 0),
          { nextZIndex: V } = useZIndex(),
          L = useNamespace("popper"),
          oe = ref(),
          j = ref("first"),
          ae = ref(),
          z = ref();
        provide(POPPER_CONTENT_INJECTION_KEY, { arrowRef: ae, arrowOffset: z }),
          k &&
            (k.addInputId || k.removeInputId) &&
            provide(formItemContextKey, {
              ...k,
              addInputId: NOOP,
              removeInputId: NOOP,
            });
        const re = ref(r.zIndex || V()),
          ie = ref(!1);
        let le;
        const de = computed(
            () => unwrapMeasurableEl(r.referenceEl) || unref(y)
          ),
          ue = computed(() => [{ zIndex: unref(re) }, r.popperStyle]),
          pe = computed(() => [
            L.b(),
            L.is("pure", r.pure),
            L.is(r.effect),
            r.popperClass,
          ]),
          Ce = computed(() => ($ && $.value === "dialog" ? "false" : void 0)),
          Oe = ({ referenceEl: Fe, popperContentEl: xe, arrowEl: Lt }) => {
            const At = buildPopperOptions(r, {
              arrowEl: Lt,
              arrowOffset: unref(z),
            });
            return yn(Fe, xe, At);
          },
          he = (Fe = !0) => {
            var xe;
            (xe = unref(i)) == null || xe.update(),
              Fe && (re.value = r.zIndex || V());
          },
          $e = () => {
            var Fe, xe;
            const Lt = { name: "eventListeners", enabled: r.visible };
            (xe = (Fe = unref(i)) == null ? void 0 : Fe.setOptions) == null ||
              xe.call(Fe, (At) => ({
                ...At,
                modifiers: [...(At.modifiers || []), Lt],
              })),
              he(!1),
              r.visible && r.focusOnShow
                ? (ie.value = !0)
                : r.visible === !1 && (ie.value = !1);
          },
          Ve = () => {
            n("focus");
          },
          qe = (Fe) => {
            var xe;
            ((xe = Fe.detail) == null ? void 0 : xe.focusReason) !==
              "pointer" && ((j.value = "first"), n("blur"));
          },
          Cn = (Fe) => {
            r.visible &&
              !ie.value &&
              (Fe.target && (j.value = Fe.target), (ie.value = !0));
          },
          Pt = (Fe) => {
            r.trapping ||
              (Fe.detail.focusReason === "pointer" && Fe.preventDefault(),
              (ie.value = !1));
          },
          kt = () => {
            (ie.value = !1), n("close");
          };
        return (
          onMounted(() => {
            let Fe;
            watch(
              de,
              (xe) => {
                var Lt;
                Fe == null || Fe();
                const At = unref(i);
                if (
                  ((Lt = At == null ? void 0 : At.destroy) == null ||
                    Lt.call(At),
                  xe)
                ) {
                  const Ue = unref(oe);
                  (g.value = Ue),
                    (i.value = Oe({
                      referenceEl: xe,
                      popperContentEl: Ue,
                      arrowEl: unref(ae),
                    })),
                    (Fe = watch(
                      () => xe.getBoundingClientRect(),
                      () => he(),
                      { immediate: !0 }
                    ));
                } else i.value = void 0;
              },
              { immediate: !0 }
            ),
              watch(
                () => r.triggerTargetEl,
                (xe, Lt) => {
                  le == null || le(), (le = void 0);
                  const At = unref(xe || oe.value),
                    Ue = unref(Lt || oe.value);
                  isElement(At) &&
                    (le = watch(
                      [$, () => r.ariaLabel, Ce, () => r.id],
                      (ze) => {
                        ["role", "aria-label", "aria-modal", "id"].forEach(
                          (Tn, Nn) => {
                            isNil(ze[Nn])
                              ? At.removeAttribute(Tn)
                              : At.setAttribute(Tn, ze[Nn]);
                          }
                        );
                      },
                      { immediate: !0 }
                    )),
                    Ue !== At &&
                      isElement(Ue) &&
                      ["role", "aria-label", "aria-modal", "id"].forEach(
                        (ze) => {
                          Ue.removeAttribute(ze);
                        }
                      );
                },
                { immediate: !0 }
              ),
              watch(() => r.visible, $e, { immediate: !0 }),
              watch(
                () =>
                  buildPopperOptions(r, {
                    arrowEl: unref(ae),
                    arrowOffset: unref(z),
                  }),
                (xe) => {
                  var Lt;
                  return (Lt = i.value) == null ? void 0 : Lt.setOptions(xe);
                }
              );
          }),
          onBeforeUnmount(() => {
            le == null || le(), (le = void 0);
          }),
          t({
            popperContentRef: oe,
            popperInstanceRef: i,
            updatePopper: he,
            contentStyle: ue,
          }),
          (Fe, xe) => (
            openBlock(),
            createElementBlock(
              "div",
              {
                ref_key: "popperContentRef",
                ref: oe,
                style: normalizeStyle(unref(ue)),
                class: normalizeClass(unref(pe)),
                tabindex: "-1",
                onMouseenter:
                  xe[0] || (xe[0] = (Lt) => Fe.$emit("mouseenter", Lt)),
                onMouseleave:
                  xe[1] || (xe[1] = (Lt) => Fe.$emit("mouseleave", Lt)),
              },
              [
                createVNode(
                  unref(ElFocusTrap),
                  {
                    trapped: ie.value,
                    "trap-on-focus-in": !0,
                    "focus-trap-el": oe.value,
                    "focus-start-el": j.value,
                    onFocusAfterTrapped: Ve,
                    onFocusAfterReleased: qe,
                    onFocusin: Cn,
                    onFocusoutPrevented: Pt,
                    onReleaseRequested: kt,
                  },
                  {
                    default: withCtx(() => [renderSlot(Fe.$slots, "default")]),
                    _: 3,
                  },
                  8,
                  ["trapped", "focus-trap-el", "focus-start-el"]
                ),
              ],
              38
            )
          )
        );
      },
    });
  var ElPopperContent = _export_sfc$1(_sfc_main$q, [
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/popper/src/content.vue",
    ],
  ]);
  const ElPopper = withInstall(Popper),
    ns = useNamespace("tooltip"),
    useTooltipContentProps = buildProps({
      ...useDelayedToggleProps,
      ...popperContentProps,
      appendTo: { type: definePropType([String, Object]) },
      content: { type: String, default: "" },
      rawContent: { type: Boolean, default: !1 },
      persistent: Boolean,
      ariaLabel: String,
      visible: { type: definePropType(Boolean), default: null },
      transition: {
        type: String,
        default: `${ns.namespace.value}-fade-in-linear`,
      },
      teleported: { type: Boolean, default: !0 },
      disabled: { type: Boolean },
    }),
    useTooltipTriggerProps = buildProps({
      ...popperTriggerProps,
      disabled: Boolean,
      trigger: { type: definePropType([String, Array]), default: "hover" },
      triggerKeys: {
        type: definePropType(Array),
        default: () => [EVENT_CODE.enter, EVENT_CODE.space],
      },
    }),
    {
      useModelToggleProps: useTooltipModelToggleProps,
      useModelToggleEmits: useTooltipModelToggleEmits,
      useModelToggle: useTooltipModelToggle,
    } = createModelToggleComposable("visible"),
    useTooltipProps = buildProps({
      ...popperProps,
      ...useTooltipModelToggleProps,
      ...useTooltipContentProps,
      ...useTooltipTriggerProps,
      ...popperArrowProps,
      showArrow: { type: Boolean, default: !0 },
    }),
    tooltipEmits = [
      ...useTooltipModelToggleEmits,
      "before-show",
      "before-hide",
      "show",
      "hide",
      "open",
      "close",
    ],
    isTriggerType = (e, t) => (isArray$3(e) ? e.includes(t) : e === t),
    whenTrigger = (e, t, n) => (r) => {
      isTriggerType(unref(e), t) && n(r);
    },
    __default__$g = defineComponent({ name: "ElTooltipTrigger" }),
    _sfc_main$p = defineComponent({
      ...__default__$g,
      props: useTooltipTriggerProps,
      setup(e, { expose: t }) {
        const n = e,
          r = useNamespace("tooltip"),
          {
            controlled: i,
            id: g,
            open: y,
            onOpen: $,
            onClose: k,
            onToggle: V,
          } = inject(TOOLTIP_INJECTION_KEY, void 0),
          L = ref(null),
          oe = () => {
            if (unref(i) || n.disabled) return !0;
          },
          j = toRef(n, "trigger"),
          ae = composeEventHandlers(oe, whenTrigger(j, "hover", $)),
          z = composeEventHandlers(oe, whenTrigger(j, "hover", k)),
          re = composeEventHandlers(
            oe,
            whenTrigger(j, "click", (pe) => {
              pe.button === 0 && V(pe);
            })
          ),
          ie = composeEventHandlers(oe, whenTrigger(j, "focus", $)),
          le = composeEventHandlers(oe, whenTrigger(j, "focus", k)),
          de = composeEventHandlers(
            oe,
            whenTrigger(j, "contextmenu", (pe) => {
              pe.preventDefault(), V(pe);
            })
          ),
          ue = composeEventHandlers(oe, (pe) => {
            const { code: Ce } = pe;
            n.triggerKeys.includes(Ce) && (pe.preventDefault(), V(pe));
          });
        return (
          t({ triggerRef: L }),
          (pe, Ce) => (
            openBlock(),
            createBlock(
              unref(ElPopperTrigger),
              {
                id: unref(g),
                "virtual-ref": pe.virtualRef,
                open: unref(y),
                "virtual-triggering": pe.virtualTriggering,
                class: normalizeClass(unref(r).e("trigger")),
                onBlur: unref(le),
                onClick: unref(re),
                onContextmenu: unref(de),
                onFocus: unref(ie),
                onMouseenter: unref(ae),
                onMouseleave: unref(z),
                onKeydown: unref(ue),
              },
              {
                default: withCtx(() => [renderSlot(pe.$slots, "default")]),
                _: 3,
              },
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
  var ElTooltipTrigger = _export_sfc$1(_sfc_main$p, [
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/tooltip/src/trigger.vue",
    ],
  ]);
  const __default__$f = defineComponent({
      name: "ElTooltipContent",
      inheritAttrs: !1,
    }),
    _sfc_main$o = defineComponent({
      ...__default__$f,
      props: useTooltipContentProps,
      setup(e, { expose: t }) {
        const n = e,
          { selector: r } = usePopperContainerId(),
          i = ref(null),
          g = ref(!1),
          {
            controlled: y,
            id: $,
            open: k,
            trigger: V,
            onClose: L,
            onOpen: oe,
            onShow: j,
            onHide: ae,
            onBeforeShow: z,
            onBeforeHide: re,
          } = inject(TOOLTIP_INJECTION_KEY, void 0),
          ie = computed(() => n.persistent);
        onBeforeUnmount(() => {
          g.value = !0;
        });
        const le = computed(() => (unref(ie) ? !0 : unref(k))),
          de = computed(() => (n.disabled ? !1 : unref(k))),
          ue = computed(() => n.appendTo || r.value),
          pe = computed(() => {
            var xe;
            return (xe = n.style) != null ? xe : {};
          }),
          Ce = computed(() => !unref(k)),
          Oe = () => {
            ae();
          },
          he = () => {
            if (unref(y)) return !0;
          },
          $e = composeEventHandlers(he, () => {
            n.enterable && unref(V) === "hover" && oe();
          }),
          Ve = composeEventHandlers(he, () => {
            unref(V) === "hover" && L();
          }),
          qe = () => {
            var xe, Lt;
            (Lt = (xe = i.value) == null ? void 0 : xe.updatePopper) == null ||
              Lt.call(xe),
              z == null || z();
          },
          Cn = () => {
            re == null || re();
          },
          Pt = () => {
            j(),
              (Fe = onClickOutside(
                computed(() => {
                  var xe;
                  return (xe = i.value) == null ? void 0 : xe.popperContentRef;
                }),
                () => {
                  if (unref(y)) return;
                  unref(V) !== "hover" && L();
                }
              ));
          },
          kt = () => {
            n.virtualTriggering || L();
          };
        let Fe;
        return (
          watch(
            () => unref(k),
            (xe) => {
              xe || Fe == null || Fe();
            },
            { flush: "post" }
          ),
          watch(
            () => n.content,
            () => {
              var xe, Lt;
              (Lt = (xe = i.value) == null ? void 0 : xe.updatePopper) ==
                null || Lt.call(xe);
            }
          ),
          t({ contentRef: i }),
          (xe, Lt) => (
            openBlock(),
            createBlock(
              Teleport,
              { disabled: !xe.teleported, to: unref(ue) },
              [
                createVNode(
                  Transition,
                  {
                    name: xe.transition,
                    onAfterLeave: Oe,
                    onBeforeEnter: qe,
                    onAfterEnter: Pt,
                    onBeforeLeave: Cn,
                  },
                  {
                    default: withCtx(() => [
                      unref(le)
                        ? withDirectives(
                            (openBlock(),
                            createBlock(
                              unref(ElPopperContent),
                              mergeProps(
                                {
                                  key: 0,
                                  id: unref($),
                                  ref_key: "contentRef",
                                  ref: i,
                                },
                                xe.$attrs,
                                {
                                  "aria-label": xe.ariaLabel,
                                  "aria-hidden": unref(Ce),
                                  "boundaries-padding": xe.boundariesPadding,
                                  "fallback-placements": xe.fallbackPlacements,
                                  "gpu-acceleration": xe.gpuAcceleration,
                                  offset: xe.offset,
                                  placement: xe.placement,
                                  "popper-options": xe.popperOptions,
                                  strategy: xe.strategy,
                                  effect: xe.effect,
                                  enterable: xe.enterable,
                                  pure: xe.pure,
                                  "popper-class": xe.popperClass,
                                  "popper-style": [xe.popperStyle, unref(pe)],
                                  "reference-el": xe.referenceEl,
                                  "trigger-target-el": xe.triggerTargetEl,
                                  visible: unref(de),
                                  "z-index": xe.zIndex,
                                  onMouseenter: unref($e),
                                  onMouseleave: unref(Ve),
                                  onBlur: kt,
                                  onClose: unref(L),
                                }
                              ),
                              {
                                default: withCtx(() => [
                                  g.value
                                    ? createCommentVNode("v-if", !0)
                                    : renderSlot(xe.$slots, "default", {
                                        key: 0,
                                      }),
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
                            [[vShow, unref(de)]]
                          )
                        : createCommentVNode("v-if", !0),
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
  var ElTooltipContent = _export_sfc$1(_sfc_main$o, [
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/tooltip/src/content.vue",
    ],
  ]);
  const _hoisted_1$d = ["innerHTML"],
    _hoisted_2$b = { key: 1 },
    __default__$e = defineComponent({ name: "ElTooltip" }),
    _sfc_main$n = defineComponent({
      ...__default__$e,
      props: useTooltipProps,
      emits: tooltipEmits,
      setup(e, { expose: t, emit: n }) {
        const r = e;
        usePopperContainer();
        const i = useId(),
          g = ref(),
          y = ref(),
          $ = () => {
            var le;
            const de = unref(g);
            de && ((le = de.popperInstanceRef) == null || le.update());
          },
          k = ref(!1),
          V = ref(),
          {
            show: L,
            hide: oe,
            hasUpdateHandler: j,
          } = useTooltipModelToggle({ indicator: k, toggleReason: V }),
          { onOpen: ae, onClose: z } = useDelayedToggle({
            showAfter: toRef(r, "showAfter"),
            hideAfter: toRef(r, "hideAfter"),
            open: L,
            close: oe,
          }),
          re = computed(() => isBoolean$1(r.visible) && !j.value);
        provide(TOOLTIP_INJECTION_KEY, {
          controlled: re,
          id: i,
          open: readonly(k),
          trigger: toRef(r, "trigger"),
          onOpen: (le) => {
            ae(le);
          },
          onClose: (le) => {
            z(le);
          },
          onToggle: (le) => {
            unref(k) ? z(le) : ae(le);
          },
          onShow: () => {
            n("show", V.value);
          },
          onHide: () => {
            n("hide", V.value);
          },
          onBeforeShow: () => {
            n("before-show", V.value);
          },
          onBeforeHide: () => {
            n("before-hide", V.value);
          },
          updatePopper: $,
        }),
          watch(
            () => r.disabled,
            (le) => {
              le && k.value && (k.value = !1);
            }
          );
        const ie = () => {
          var le, de;
          const ue =
            (de = (le = y.value) == null ? void 0 : le.contentRef) == null
              ? void 0
              : de.popperContentRef;
          return ue && ue.contains(document.activeElement);
        };
        return (
          onDeactivated(() => k.value && oe()),
          t({
            popperRef: g,
            contentRef: y,
            isFocusInsideContent: ie,
            updatePopper: $,
            onOpen: ae,
            onClose: z,
            hide: oe,
          }),
          (le, de) => (
            openBlock(),
            createBlock(
              unref(ElPopper),
              { ref_key: "popperRef", ref: g, role: le.role },
              {
                default: withCtx(() => [
                  createVNode(
                    ElTooltipTrigger,
                    {
                      disabled: le.disabled,
                      trigger: le.trigger,
                      "trigger-keys": le.triggerKeys,
                      "virtual-ref": le.virtualRef,
                      "virtual-triggering": le.virtualTriggering,
                    },
                    {
                      default: withCtx(() => [
                        le.$slots.default
                          ? renderSlot(le.$slots, "default", { key: 0 })
                          : createCommentVNode("v-if", !0),
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
                  createVNode(
                    ElTooltipContent,
                    {
                      ref_key: "contentRef",
                      ref: y,
                      "aria-label": le.ariaLabel,
                      "boundaries-padding": le.boundariesPadding,
                      content: le.content,
                      disabled: le.disabled,
                      effect: le.effect,
                      enterable: le.enterable,
                      "fallback-placements": le.fallbackPlacements,
                      "hide-after": le.hideAfter,
                      "gpu-acceleration": le.gpuAcceleration,
                      offset: le.offset,
                      persistent: le.persistent,
                      "popper-class": le.popperClass,
                      "popper-style": le.popperStyle,
                      placement: le.placement,
                      "popper-options": le.popperOptions,
                      pure: le.pure,
                      "raw-content": le.rawContent,
                      "reference-el": le.referenceEl,
                      "trigger-target-el": le.triggerTargetEl,
                      "show-after": le.showAfter,
                      strategy: le.strategy,
                      teleported: le.teleported,
                      transition: le.transition,
                      "virtual-triggering": le.virtualTriggering,
                      "z-index": le.zIndex,
                      "append-to": le.appendTo,
                    },
                    {
                      default: withCtx(() => [
                        renderSlot(le.$slots, "content", {}, () => [
                          le.rawContent
                            ? (openBlock(),
                              createElementBlock(
                                "span",
                                { key: 0, innerHTML: le.content },
                                null,
                                8,
                                _hoisted_1$d
                              ))
                            : (openBlock(),
                              createElementBlock(
                                "span",
                                _hoisted_2$b,
                                toDisplayString(le.content),
                                1
                              )),
                        ]),
                        le.showArrow
                          ? (openBlock(),
                            createBlock(
                              unref(ElPopperArrow),
                              { key: 0, "arrow-offset": le.arrowOffset },
                              null,
                              8,
                              ["arrow-offset"]
                            ))
                          : createCommentVNode("v-if", !0),
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
  var Tooltip = _export_sfc$1(_sfc_main$n, [
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/tooltip/src/tooltip.vue",
    ],
  ]);
  const ElTooltip = withInstall(Tooltip),
    badgeProps = buildProps({
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
    _hoisted_1$c = ["textContent"],
    __default__$d = defineComponent({ name: "ElBadge" }),
    _sfc_main$m = defineComponent({
      ...__default__$d,
      props: badgeProps,
      setup(e, { expose: t }) {
        const n = e,
          r = useNamespace("badge"),
          i = computed(() =>
            n.isDot
              ? ""
              : isNumber$1(n.value) && isNumber$1(n.max)
              ? n.max < n.value
                ? `${n.max}+`
                : `${n.value}`
              : `${n.value}`
          );
        return (
          t({ content: i }),
          (g, y) => (
            openBlock(),
            createElementBlock(
              "div",
              { class: normalizeClass(unref(r).b()) },
              [
                renderSlot(g.$slots, "default"),
                createVNode(
                  Transition,
                  {
                    name: `${unref(r).namespace.value}-zoom-in-center`,
                    persisted: "",
                  },
                  {
                    default: withCtx(() => [
                      withDirectives(
                        createBaseVNode(
                          "sup",
                          {
                            class: normalizeClass([
                              unref(r).e("content"),
                              unref(r).em("content", g.type),
                              unref(r).is("fixed", !!g.$slots.default),
                              unref(r).is("dot", g.isDot),
                            ]),
                            textContent: toDisplayString(unref(i)),
                          },
                          null,
                          10,
                          _hoisted_1$c
                        ),
                        [[vShow, !g.hidden && (unref(i) || g.isDot)]]
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
  var Badge = _export_sfc$1(_sfc_main$m, [
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/badge/src/badge.vue",
    ],
  ]);
  const ElBadge = withInstall(Badge),
    useButton = (e, t) => {
      useDeprecated(
        {
          from: "type.text",
          replacement: "link",
          version: "3.0.0",
          scope: "props",
          ref: "https://element-plus.org/en-US/component/button.html#button-attributes",
        },
        computed(() => e.type === "text")
      );
      const n = inject(buttonGroupContextKey, void 0),
        r = useGlobalConfig("button"),
        { form: i } = useFormItem(),
        g = useSize(computed(() => (n == null ? void 0 : n.size))),
        y = useDisabled(),
        $ = ref(),
        k = useSlots(),
        V = computed(() => e.type || (n == null ? void 0 : n.type) || ""),
        L = computed(() => {
          var ae, z, re;
          return (re =
            (z = e.autoInsertSpace) != null
              ? z
              : (ae = r.value) == null
              ? void 0
              : ae.autoInsertSpace) != null
            ? re
            : !1;
        }),
        oe = computed(() => {
          var ae;
          const z = (ae = k.default) == null ? void 0 : ae.call(k);
          if (L.value && (z == null ? void 0 : z.length) === 1) {
            const re = z[0];
            if ((re == null ? void 0 : re.type) === Text) {
              const ie = re.children;
              return /^\p{Unified_Ideograph}{2}$/u.test(ie.trim());
            }
          }
          return !1;
        });
      return {
        _disabled: y,
        _size: g,
        _type: V,
        _ref: $,
        shouldAddSpace: oe,
        handleClick: (ae) => {
          e.nativeType === "reset" && (i == null || i.resetFields()),
            t("click", ae);
        },
      };
    },
    buttonTypes = [
      "default",
      "primary",
      "success",
      "warning",
      "info",
      "danger",
      "text",
      "",
    ],
    buttonNativeTypes = ["button", "submit", "reset"],
    buttonProps = buildProps({
      size: useSizeProp,
      disabled: Boolean,
      type: { type: String, values: buttonTypes, default: "" },
      icon: { type: iconPropType },
      nativeType: {
        type: String,
        values: buttonNativeTypes,
        default: "button",
      },
      loading: Boolean,
      loadingIcon: { type: iconPropType, default: () => loading_default },
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
    buttonEmits = { click: (e) => e instanceof MouseEvent };
  function bound01(e, t) {
    isOnePointZero(e) && (e = "100%");
    var n = isPercentage(e);
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
  function clamp01(e) {
    return Math.min(1, Math.max(0, e));
  }
  function isOnePointZero(e) {
    return typeof e == "string" && e.indexOf(".") !== -1 && parseFloat(e) === 1;
  }
  function isPercentage(e) {
    return typeof e == "string" && e.indexOf("%") !== -1;
  }
  function boundAlpha(e) {
    return (e = parseFloat(e)), (isNaN(e) || e < 0 || e > 1) && (e = 1), e;
  }
  function convertToPercentage(e) {
    return e <= 1 ? "".concat(Number(e) * 100, "%") : e;
  }
  function pad2(e) {
    return e.length === 1 ? "0" + e : String(e);
  }
  function rgbToRgb(e, t, n) {
    return {
      r: bound01(e, 255) * 255,
      g: bound01(t, 255) * 255,
      b: bound01(n, 255) * 255,
    };
  }
  function rgbToHsl(e, t, n) {
    (e = bound01(e, 255)), (t = bound01(t, 255)), (n = bound01(n, 255));
    var r = Math.max(e, t, n),
      i = Math.min(e, t, n),
      g = 0,
      y = 0,
      $ = (r + i) / 2;
    if (r === i) (y = 0), (g = 0);
    else {
      var k = r - i;
      switch (((y = $ > 0.5 ? k / (2 - r - i) : k / (r + i)), r)) {
        case e:
          g = (t - n) / k + (t < n ? 6 : 0);
          break;
        case t:
          g = (n - e) / k + 2;
          break;
        case n:
          g = (e - t) / k + 4;
          break;
      }
      g /= 6;
    }
    return { h: g, s: y, l: $ };
  }
  function hue2rgb(e, t, n) {
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
  function hslToRgb(e, t, n) {
    var r, i, g;
    if (
      ((e = bound01(e, 360)),
      (t = bound01(t, 100)),
      (n = bound01(n, 100)),
      t === 0)
    )
      (i = n), (g = n), (r = n);
    else {
      var y = n < 0.5 ? n * (1 + t) : n + t - n * t,
        $ = 2 * n - y;
      (r = hue2rgb($, y, e + 1 / 3)),
        (i = hue2rgb($, y, e)),
        (g = hue2rgb($, y, e - 1 / 3));
    }
    return { r: r * 255, g: i * 255, b: g * 255 };
  }
  function rgbToHsv(e, t, n) {
    (e = bound01(e, 255)), (t = bound01(t, 255)), (n = bound01(n, 255));
    var r = Math.max(e, t, n),
      i = Math.min(e, t, n),
      g = 0,
      y = r,
      $ = r - i,
      k = r === 0 ? 0 : $ / r;
    if (r === i) g = 0;
    else {
      switch (r) {
        case e:
          g = (t - n) / $ + (t < n ? 6 : 0);
          break;
        case t:
          g = (n - e) / $ + 2;
          break;
        case n:
          g = (e - t) / $ + 4;
          break;
      }
      g /= 6;
    }
    return { h: g, s: k, v: y };
  }
  function hsvToRgb(e, t, n) {
    (e = bound01(e, 360) * 6), (t = bound01(t, 100)), (n = bound01(n, 100));
    var r = Math.floor(e),
      i = e - r,
      g = n * (1 - t),
      y = n * (1 - i * t),
      $ = n * (1 - (1 - i) * t),
      k = r % 6,
      V = [n, y, g, g, $, n][k],
      L = [$, n, n, y, g, g][k],
      oe = [g, g, $, n, n, y][k];
    return { r: V * 255, g: L * 255, b: oe * 255 };
  }
  function rgbToHex(e, t, n, r) {
    var i = [
      pad2(Math.round(e).toString(16)),
      pad2(Math.round(t).toString(16)),
      pad2(Math.round(n).toString(16)),
    ];
    return r &&
      i[0].startsWith(i[0].charAt(1)) &&
      i[1].startsWith(i[1].charAt(1)) &&
      i[2].startsWith(i[2].charAt(1))
      ? i[0].charAt(0) + i[1].charAt(0) + i[2].charAt(0)
      : i.join("");
  }
  function rgbaToHex(e, t, n, r, i) {
    var g = [
      pad2(Math.round(e).toString(16)),
      pad2(Math.round(t).toString(16)),
      pad2(Math.round(n).toString(16)),
      pad2(convertDecimalToHex(r)),
    ];
    return i &&
      g[0].startsWith(g[0].charAt(1)) &&
      g[1].startsWith(g[1].charAt(1)) &&
      g[2].startsWith(g[2].charAt(1)) &&
      g[3].startsWith(g[3].charAt(1))
      ? g[0].charAt(0) + g[1].charAt(0) + g[2].charAt(0) + g[3].charAt(0)
      : g.join("");
  }
  function convertDecimalToHex(e) {
    return Math.round(parseFloat(e) * 255).toString(16);
  }
  function convertHexToDecimal(e) {
    return parseIntFromHex(e) / 255;
  }
  function parseIntFromHex(e) {
    return parseInt(e, 16);
  }
  function numberInputToObject(e) {
    return { r: e >> 16, g: (e & 65280) >> 8, b: e & 255 };
  }
  var names = {
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
  function inputToRGB(e) {
    var t = { r: 0, g: 0, b: 0 },
      n = 1,
      r = null,
      i = null,
      g = null,
      y = !1,
      $ = !1;
    return (
      typeof e == "string" && (e = stringInputToObject(e)),
      typeof e == "object" &&
        (isValidCSSUnit(e.r) && isValidCSSUnit(e.g) && isValidCSSUnit(e.b)
          ? ((t = rgbToRgb(e.r, e.g, e.b)),
            (y = !0),
            ($ = String(e.r).substr(-1) === "%" ? "prgb" : "rgb"))
          : isValidCSSUnit(e.h) && isValidCSSUnit(e.s) && isValidCSSUnit(e.v)
          ? ((r = convertToPercentage(e.s)),
            (i = convertToPercentage(e.v)),
            (t = hsvToRgb(e.h, r, i)),
            (y = !0),
            ($ = "hsv"))
          : isValidCSSUnit(e.h) &&
            isValidCSSUnit(e.s) &&
            isValidCSSUnit(e.l) &&
            ((r = convertToPercentage(e.s)),
            (g = convertToPercentage(e.l)),
            (t = hslToRgb(e.h, r, g)),
            (y = !0),
            ($ = "hsl")),
        Object.prototype.hasOwnProperty.call(e, "a") && (n = e.a)),
      (n = boundAlpha(n)),
      {
        ok: y,
        format: e.format || $,
        r: Math.min(255, Math.max(t.r, 0)),
        g: Math.min(255, Math.max(t.g, 0)),
        b: Math.min(255, Math.max(t.b, 0)),
        a: n,
      }
    );
  }
  var CSS_INTEGER = "[-\\+]?\\d+%?",
    CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?",
    CSS_UNIT = "(?:".concat(CSS_NUMBER, ")|(?:").concat(CSS_INTEGER, ")"),
    PERMISSIVE_MATCH3 = "[\\s|\\(]+("
      .concat(CSS_UNIT, ")[,|\\s]+(")
      .concat(CSS_UNIT, ")[,|\\s]+(")
      .concat(CSS_UNIT, ")\\s*\\)?"),
    PERMISSIVE_MATCH4 = "[\\s|\\(]+("
      .concat(CSS_UNIT, ")[,|\\s]+(")
      .concat(CSS_UNIT, ")[,|\\s]+(")
      .concat(CSS_UNIT, ")[,|\\s]+(")
      .concat(CSS_UNIT, ")\\s*\\)?"),
    matchers = {
      CSS_UNIT: new RegExp(CSS_UNIT),
      rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
      rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
      hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
      hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
      hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
      hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
      hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
      hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
      hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
      hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    };
  function stringInputToObject(e) {
    if (((e = e.trim().toLowerCase()), e.length === 0)) return !1;
    var t = !1;
    if (names[e]) (e = names[e]), (t = !0);
    else if (e === "transparent")
      return { r: 0, g: 0, b: 0, a: 0, format: "name" };
    var n = matchers.rgb.exec(e);
    return n
      ? { r: n[1], g: n[2], b: n[3] }
      : ((n = matchers.rgba.exec(e)),
        n
          ? { r: n[1], g: n[2], b: n[3], a: n[4] }
          : ((n = matchers.hsl.exec(e)),
            n
              ? { h: n[1], s: n[2], l: n[3] }
              : ((n = matchers.hsla.exec(e)),
                n
                  ? { h: n[1], s: n[2], l: n[3], a: n[4] }
                  : ((n = matchers.hsv.exec(e)),
                    n
                      ? { h: n[1], s: n[2], v: n[3] }
                      : ((n = matchers.hsva.exec(e)),
                        n
                          ? { h: n[1], s: n[2], v: n[3], a: n[4] }
                          : ((n = matchers.hex8.exec(e)),
                            n
                              ? {
                                  r: parseIntFromHex(n[1]),
                                  g: parseIntFromHex(n[2]),
                                  b: parseIntFromHex(n[3]),
                                  a: convertHexToDecimal(n[4]),
                                  format: t ? "name" : "hex8",
                                }
                              : ((n = matchers.hex6.exec(e)),
                                n
                                  ? {
                                      r: parseIntFromHex(n[1]),
                                      g: parseIntFromHex(n[2]),
                                      b: parseIntFromHex(n[3]),
                                      format: t ? "name" : "hex",
                                    }
                                  : ((n = matchers.hex4.exec(e)),
                                    n
                                      ? {
                                          r: parseIntFromHex(n[1] + n[1]),
                                          g: parseIntFromHex(n[2] + n[2]),
                                          b: parseIntFromHex(n[3] + n[3]),
                                          a: convertHexToDecimal(n[4] + n[4]),
                                          format: t ? "name" : "hex8",
                                        }
                                      : ((n = matchers.hex3.exec(e)),
                                        n
                                          ? {
                                              r: parseIntFromHex(n[1] + n[1]),
                                              g: parseIntFromHex(n[2] + n[2]),
                                              b: parseIntFromHex(n[3] + n[3]),
                                              format: t ? "name" : "hex",
                                            }
                                          : !1)))))))));
  }
  function isValidCSSUnit(e) {
    return Boolean(matchers.CSS_UNIT.exec(String(e)));
  }
  var TinyColor = (function () {
    function e(t, n) {
      t === void 0 && (t = ""), n === void 0 && (n = {});
      var r;
      if (t instanceof e) return t;
      typeof t == "number" && (t = numberInputToObject(t)),
        (this.originalInput = t);
      var i = inputToRGB(t);
      (this.originalInput = t),
        (this.r = i.r),
        (this.g = i.g),
        (this.b = i.b),
        (this.a = i.a),
        (this.roundA = Math.round(100 * this.a) / 100),
        (this.format = (r = n.format) !== null && r !== void 0 ? r : i.format),
        (this.gradientType = n.gradientType),
        this.r < 1 && (this.r = Math.round(this.r)),
        this.g < 1 && (this.g = Math.round(this.g)),
        this.b < 1 && (this.b = Math.round(this.b)),
        (this.isValid = i.ok);
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
          i,
          g = t.r / 255,
          y = t.g / 255,
          $ = t.b / 255;
        return (
          g <= 0.03928
            ? (n = g / 12.92)
            : (n = Math.pow((g + 0.055) / 1.055, 2.4)),
          y <= 0.03928
            ? (r = y / 12.92)
            : (r = Math.pow((y + 0.055) / 1.055, 2.4)),
          $ <= 0.03928
            ? (i = $ / 12.92)
            : (i = Math.pow(($ + 0.055) / 1.055, 2.4)),
          0.2126 * n + 0.7152 * r + 0.0722 * i
        );
      }),
      (e.prototype.getAlpha = function () {
        return this.a;
      }),
      (e.prototype.setAlpha = function (t) {
        return (
          (this.a = boundAlpha(t)),
          (this.roundA = Math.round(100 * this.a) / 100),
          this
        );
      }),
      (e.prototype.isMonochrome = function () {
        var t = this.toHsl().s;
        return t === 0;
      }),
      (e.prototype.toHsv = function () {
        var t = rgbToHsv(this.r, this.g, this.b);
        return { h: t.h * 360, s: t.s, v: t.v, a: this.a };
      }),
      (e.prototype.toHsvString = function () {
        var t = rgbToHsv(this.r, this.g, this.b),
          n = Math.round(t.h * 360),
          r = Math.round(t.s * 100),
          i = Math.round(t.v * 100);
        return this.a === 1
          ? "hsv(".concat(n, ", ").concat(r, "%, ").concat(i, "%)")
          : "hsva("
              .concat(n, ", ")
              .concat(r, "%, ")
              .concat(i, "%, ")
              .concat(this.roundA, ")");
      }),
      (e.prototype.toHsl = function () {
        var t = rgbToHsl(this.r, this.g, this.b);
        return { h: t.h * 360, s: t.s, l: t.l, a: this.a };
      }),
      (e.prototype.toHslString = function () {
        var t = rgbToHsl(this.r, this.g, this.b),
          n = Math.round(t.h * 360),
          r = Math.round(t.s * 100),
          i = Math.round(t.l * 100);
        return this.a === 1
          ? "hsl(".concat(n, ", ").concat(r, "%, ").concat(i, "%)")
          : "hsla("
              .concat(n, ", ")
              .concat(r, "%, ")
              .concat(i, "%, ")
              .concat(this.roundA, ")");
      }),
      (e.prototype.toHex = function (t) {
        return t === void 0 && (t = !1), rgbToHex(this.r, this.g, this.b, t);
      }),
      (e.prototype.toHexString = function (t) {
        return t === void 0 && (t = !1), "#" + this.toHex(t);
      }),
      (e.prototype.toHex8 = function (t) {
        return (
          t === void 0 && (t = !1), rgbaToHex(this.r, this.g, this.b, this.a, t)
        );
      }),
      (e.prototype.toHex8String = function (t) {
        return t === void 0 && (t = !1), "#" + this.toHex8(t);
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
          return "".concat(Math.round(bound01(n, 255) * 100), "%");
        };
        return { r: t(this.r), g: t(this.g), b: t(this.b), a: this.a };
      }),
      (e.prototype.toPercentageRgbString = function () {
        var t = function (n) {
          return Math.round(bound01(n, 255) * 100);
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
          var t = "#" + rgbToHex(this.r, this.g, this.b, !1),
            n = 0,
            r = Object.entries(names);
          n < r.length;
          n++
        ) {
          var i = r[n],
            g = i[0],
            y = i[1];
          if (t === y) return g;
        }
        return !1;
      }),
      (e.prototype.toString = function (t) {
        var n = Boolean(t);
        t = t ?? this.format;
        var r = !1,
          i = this.a < 1 && this.a >= 0,
          g = !n && i && (t.startsWith("hex") || t === "name");
        return g
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
        return (n.l += t / 100), (n.l = clamp01(n.l)), new e(n);
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
        return (n.l -= t / 100), (n.l = clamp01(n.l)), new e(n);
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
        return (n.s -= t / 100), (n.s = clamp01(n.s)), new e(n);
      }),
      (e.prototype.saturate = function (t) {
        t === void 0 && (t = 10);
        var n = this.toHsl();
        return (n.s += t / 100), (n.s = clamp01(n.s)), new e(n);
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
          i = new e(t).toRgb(),
          g = n / 100,
          y = {
            r: (i.r - r.r) * g + r.r,
            g: (i.g - r.g) * g + r.g,
            b: (i.b - r.b) * g + r.b,
            a: (i.a - r.a) * g + r.a,
          };
        return new e(y);
      }),
      (e.prototype.analogous = function (t, n) {
        t === void 0 && (t = 6), n === void 0 && (n = 30);
        var r = this.toHsl(),
          i = 360 / n,
          g = [this];
        for (r.h = (r.h - ((i * t) >> 1) + 720) % 360; --t; )
          (r.h = (r.h + i) % 360), g.push(new e(r));
        return g;
      }),
      (e.prototype.complement = function () {
        var t = this.toHsl();
        return (t.h = (t.h + 180) % 360), new e(t);
      }),
      (e.prototype.monochromatic = function (t) {
        t === void 0 && (t = 6);
        for (
          var n = this.toHsv(), r = n.h, i = n.s, g = n.v, y = [], $ = 1 / t;
          t--;

        )
          y.push(new e({ h: r, s: i, v: g })), (g = (g + $) % 1);
        return y;
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
          r = new e(t).toRgb();
        return new e({
          r: r.r + (n.r - r.r) * n.a,
          g: r.g + (n.g - r.g) * n.a,
          b: r.b + (n.b - r.b) * n.a,
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
          var n = this.toHsl(), r = n.h, i = [this], g = 360 / t, y = 1;
          y < t;
          y++
        )
          i.push(new e({ h: (r + y * g) % 360, s: n.s, l: n.l }));
        return i;
      }),
      (e.prototype.equals = function (t) {
        return this.toRgbString() === new e(t).toRgbString();
      }),
      e
    );
  })();
  function darken(e, t = 20) {
    return e.mix("#141414", t).toString();
  }
  function useButtonCustomStyle(e) {
    const t = useDisabled(),
      n = useNamespace("button");
    return computed(() => {
      let r = {};
      const i = e.color;
      if (i) {
        const g = new TinyColor(i),
          y = e.dark ? g.tint(20).toString() : darken(g, 20);
        if (e.plain)
          (r = n.cssVarBlock({
            "bg-color": e.dark ? darken(g, 90) : g.tint(90).toString(),
            "text-color": i,
            "border-color": e.dark ? darken(g, 50) : g.tint(50).toString(),
            "hover-text-color": `var(${n.cssVarName("color-white")})`,
            "hover-bg-color": i,
            "hover-border-color": i,
            "active-bg-color": y,
            "active-text-color": `var(${n.cssVarName("color-white")})`,
            "active-border-color": y,
          })),
            t.value &&
              ((r[n.cssVarBlockName("disabled-bg-color")] = e.dark
                ? darken(g, 90)
                : g.tint(90).toString()),
              (r[n.cssVarBlockName("disabled-text-color")] = e.dark
                ? darken(g, 50)
                : g.tint(50).toString()),
              (r[n.cssVarBlockName("disabled-border-color")] = e.dark
                ? darken(g, 80)
                : g.tint(80).toString()));
        else {
          const $ = e.dark ? darken(g, 30) : g.tint(30).toString(),
            k = g.isDark()
              ? `var(${n.cssVarName("color-white")})`
              : `var(${n.cssVarName("color-black")})`;
          if (
            ((r = n.cssVarBlock({
              "bg-color": i,
              "text-color": k,
              "border-color": i,
              "hover-bg-color": $,
              "hover-text-color": k,
              "hover-border-color": $,
              "active-bg-color": y,
              "active-border-color": y,
            })),
            t.value)
          ) {
            const V = e.dark ? darken(g, 50) : g.tint(50).toString();
            (r[n.cssVarBlockName("disabled-bg-color")] = V),
              (r[n.cssVarBlockName("disabled-text-color")] = e.dark
                ? "rgba(255, 255, 255, 0.5)"
                : `var(${n.cssVarName("color-white")})`),
              (r[n.cssVarBlockName("disabled-border-color")] = V);
          }
        }
      }
      return r;
    });
  }
  const _hoisted_1$b = ["aria-disabled", "disabled", "autofocus", "type"],
    __default__$c = defineComponent({ name: "ElButton" }),
    _sfc_main$l = defineComponent({
      ...__default__$c,
      props: buttonProps,
      emits: buttonEmits,
      setup(e, { expose: t, emit: n }) {
        const r = e,
          i = useButtonCustomStyle(r),
          g = useNamespace("button"),
          {
            _ref: y,
            _size: $,
            _type: k,
            _disabled: V,
            shouldAddSpace: L,
            handleClick: oe,
          } = useButton(r, n);
        return (
          t({ ref: y, size: $, type: k, disabled: V, shouldAddSpace: L }),
          (j, ae) => (
            openBlock(),
            createElementBlock(
              "button",
              {
                ref_key: "_ref",
                ref: y,
                class: normalizeClass([
                  unref(g).b(),
                  unref(g).m(unref(k)),
                  unref(g).m(unref($)),
                  unref(g).is("disabled", unref(V)),
                  unref(g).is("loading", j.loading),
                  unref(g).is("plain", j.plain),
                  unref(g).is("round", j.round),
                  unref(g).is("circle", j.circle),
                  unref(g).is("text", j.text),
                  unref(g).is("link", j.link),
                  unref(g).is("has-bg", j.bg),
                ]),
                "aria-disabled": unref(V) || j.loading,
                disabled: unref(V) || j.loading,
                autofocus: j.autofocus,
                type: j.nativeType,
                style: normalizeStyle(unref(i)),
                onClick:
                  ae[0] || (ae[0] = (...z) => unref(oe) && unref(oe)(...z)),
              },
              [
                j.loading
                  ? (openBlock(),
                    createElementBlock(
                      Fragment,
                      { key: 0 },
                      [
                        j.$slots.loading
                          ? renderSlot(j.$slots, "loading", { key: 0 })
                          : (openBlock(),
                            createBlock(
                              unref(ElIcon),
                              {
                                key: 1,
                                class: normalizeClass(unref(g).is("loading")),
                              },
                              {
                                default: withCtx(() => [
                                  (openBlock(),
                                  createBlock(
                                    resolveDynamicComponent(j.loadingIcon)
                                  )),
                                ]),
                                _: 1,
                              },
                              8,
                              ["class"]
                            )),
                      ],
                      64
                    ))
                  : j.icon || j.$slots.icon
                  ? (openBlock(),
                    createBlock(
                      unref(ElIcon),
                      { key: 1 },
                      {
                        default: withCtx(() => [
                          j.icon
                            ? (openBlock(),
                              createBlock(resolveDynamicComponent(j.icon), {
                                key: 0,
                              }))
                            : renderSlot(j.$slots, "icon", { key: 1 }),
                        ]),
                        _: 3,
                      }
                    ))
                  : createCommentVNode("v-if", !0),
                j.$slots.default
                  ? (openBlock(),
                    createElementBlock(
                      "span",
                      {
                        key: 2,
                        class: normalizeClass({
                          [unref(g).em("text", "expand")]: unref(L),
                        }),
                      },
                      [renderSlot(j.$slots, "default")],
                      2
                    ))
                  : createCommentVNode("v-if", !0),
              ],
              14,
              _hoisted_1$b
            )
          )
        );
      },
    });
  var Button = _export_sfc$1(_sfc_main$l, [
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/button/src/button.vue",
    ],
  ]);
  const buttonGroupProps = { size: buttonProps.size, type: buttonProps.type },
    __default__$b = defineComponent({ name: "ElButtonGroup" }),
    _sfc_main$k = defineComponent({
      ...__default__$b,
      props: buttonGroupProps,
      setup(e) {
        const t = e;
        provide(
          buttonGroupContextKey,
          reactive({ size: toRef(t, "size"), type: toRef(t, "type") })
        );
        const n = useNamespace("button");
        return (r, i) => (
          openBlock(),
          createElementBlock(
            "div",
            { class: normalizeClass(`${unref(n).b("group")}`) },
            [renderSlot(r.$slots, "default")],
            2
          )
        );
      },
    });
  var ButtonGroup = _export_sfc$1(_sfc_main$k, [
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/button/src/button-group.vue",
    ],
  ]);
  const ElButton = withInstall(Button, { ButtonGroup });
  withNoopInstall(ButtonGroup);
  var commonjsGlobal =
      typeof globalThis < "u"
        ? globalThis
        : typeof window < "u"
        ? window
        : typeof global < "u"
        ? global
        : typeof self < "u"
        ? self
        : {},
    dayjs_min = { exports: {} };
  (function (e, t) {
    (function (n, r) {
      e.exports = r();
    })(commonjsGlobal, function () {
      var n = 1e3,
        r = 6e4,
        i = 36e5,
        g = "millisecond",
        y = "second",
        $ = "minute",
        k = "hour",
        V = "day",
        L = "week",
        oe = "month",
        j = "quarter",
        ae = "year",
        z = "date",
        re = "Invalid Date",
        ie =
          /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
        le =
          /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
        de = {
          name: "en",
          weekdays:
            "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split(
              "_"
            ),
          months:
            "January_February_March_April_May_June_July_August_September_October_November_December".split(
              "_"
            ),
          ordinal: function (kt) {
            var Fe = ["th", "st", "nd", "rd"],
              xe = kt % 100;
            return "[" + kt + (Fe[(xe - 20) % 10] || Fe[xe] || Fe[0]) + "]";
          },
        },
        ue = function (kt, Fe, xe) {
          var Lt = String(kt);
          return !Lt || Lt.length >= Fe
            ? kt
            : "" + Array(Fe + 1 - Lt.length).join(xe) + kt;
        },
        pe = {
          s: ue,
          z: function (kt) {
            var Fe = -kt.utcOffset(),
              xe = Math.abs(Fe),
              Lt = Math.floor(xe / 60),
              At = xe % 60;
            return (
              (Fe <= 0 ? "+" : "-") + ue(Lt, 2, "0") + ":" + ue(At, 2, "0")
            );
          },
          m: function kt(Fe, xe) {
            if (Fe.date() < xe.date()) return -kt(xe, Fe);
            var Lt = 12 * (xe.year() - Fe.year()) + (xe.month() - Fe.month()),
              At = Fe.clone().add(Lt, oe),
              Ue = xe - At < 0,
              ze = Fe.clone().add(Lt + (Ue ? -1 : 1), oe);
            return +(-(Lt + (xe - At) / (Ue ? At - ze : ze - At)) || 0);
          },
          a: function (kt) {
            return kt < 0 ? Math.ceil(kt) || 0 : Math.floor(kt);
          },
          p: function (kt) {
            return (
              { M: oe, y: ae, w: L, d: V, D: z, h: k, m: $, s: y, ms: g, Q: j }[
                kt
              ] ||
              String(kt || "")
                .toLowerCase()
                .replace(/s$/, "")
            );
          },
          u: function (kt) {
            return kt === void 0;
          },
        },
        Ce = "en",
        Oe = {};
      Oe[Ce] = de;
      var he = function (kt) {
          return kt instanceof Cn;
        },
        $e = function kt(Fe, xe, Lt) {
          var At;
          if (!Fe) return Ce;
          if (typeof Fe == "string") {
            var Ue = Fe.toLowerCase();
            Oe[Ue] && (At = Ue), xe && ((Oe[Ue] = xe), (At = Ue));
            var ze = Fe.split("-");
            if (!At && ze.length > 1) return kt(ze[0]);
          } else {
            var Tn = Fe.name;
            (Oe[Tn] = Fe), (At = Tn);
          }
          return !Lt && At && (Ce = At), At || (!Lt && Ce);
        },
        Ve = function (kt, Fe) {
          if (he(kt)) return kt.clone();
          var xe = typeof Fe == "object" ? Fe : {};
          return (xe.date = kt), (xe.args = arguments), new Cn(xe);
        },
        qe = pe;
      (qe.l = $e),
        (qe.i = he),
        (qe.w = function (kt, Fe) {
          return Ve(kt, {
            locale: Fe.$L,
            utc: Fe.$u,
            x: Fe.$x,
            $offset: Fe.$offset,
          });
        });
      var Cn = (function () {
          function kt(xe) {
            (this.$L = $e(xe.locale, null, !0)), this.parse(xe);
          }
          var Fe = kt.prototype;
          return (
            (Fe.parse = function (xe) {
              (this.$d = (function (Lt) {
                var At = Lt.date,
                  Ue = Lt.utc;
                if (At === null) return new Date(NaN);
                if (qe.u(At)) return new Date();
                if (At instanceof Date) return new Date(At);
                if (typeof At == "string" && !/Z$/i.test(At)) {
                  var ze = At.match(ie);
                  if (ze) {
                    var Tn = ze[2] - 1 || 0,
                      Nn = (ze[7] || "0").substring(0, 3);
                    return Ue
                      ? new Date(
                          Date.UTC(
                            ze[1],
                            Tn,
                            ze[3] || 1,
                            ze[4] || 0,
                            ze[5] || 0,
                            ze[6] || 0,
                            Nn
                          )
                        )
                      : new Date(
                          ze[1],
                          Tn,
                          ze[3] || 1,
                          ze[4] || 0,
                          ze[5] || 0,
                          ze[6] || 0,
                          Nn
                        );
                  }
                }
                return new Date(At);
              })(xe)),
                (this.$x = xe.x || {}),
                this.init();
            }),
            (Fe.init = function () {
              var xe = this.$d;
              (this.$y = xe.getFullYear()),
                (this.$M = xe.getMonth()),
                (this.$D = xe.getDate()),
                (this.$W = xe.getDay()),
                (this.$H = xe.getHours()),
                (this.$m = xe.getMinutes()),
                (this.$s = xe.getSeconds()),
                (this.$ms = xe.getMilliseconds());
            }),
            (Fe.$utils = function () {
              return qe;
            }),
            (Fe.isValid = function () {
              return this.$d.toString() !== re;
            }),
            (Fe.isSame = function (xe, Lt) {
              var At = Ve(xe);
              return this.startOf(Lt) <= At && At <= this.endOf(Lt);
            }),
            (Fe.isAfter = function (xe, Lt) {
              return Ve(xe) < this.startOf(Lt);
            }),
            (Fe.isBefore = function (xe, Lt) {
              return this.endOf(Lt) < Ve(xe);
            }),
            (Fe.$g = function (xe, Lt, At) {
              return qe.u(xe) ? this[Lt] : this.set(At, xe);
            }),
            (Fe.unix = function () {
              return Math.floor(this.valueOf() / 1e3);
            }),
            (Fe.valueOf = function () {
              return this.$d.getTime();
            }),
            (Fe.startOf = function (xe, Lt) {
              var At = this,
                Ue = !!qe.u(Lt) || Lt,
                ze = qe.p(xe),
                Tn = function (Fn, Hn) {
                  var qn = qe.w(
                    At.$u ? Date.UTC(At.$y, Hn, Fn) : new Date(At.$y, Hn, Fn),
                    At
                  );
                  return Ue ? qn : qn.endOf(V);
                },
                Nn = function (Fn, Hn) {
                  return qe.w(
                    At.toDate()[Fn].apply(
                      At.toDate("s"),
                      (Ue ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(Hn)
                    ),
                    At
                  );
                },
                xn = this.$W,
                Mn = this.$M,
                zn = this.$D,
                Rn = "set" + (this.$u ? "UTC" : "");
              switch (ze) {
                case ae:
                  return Ue ? Tn(1, 0) : Tn(31, 11);
                case oe:
                  return Ue ? Tn(1, Mn) : Tn(0, Mn + 1);
                case L:
                  var Ln = this.$locale().weekStart || 0,
                    jn = (xn < Ln ? xn + 7 : xn) - Ln;
                  return Tn(Ue ? zn - jn : zn + (6 - jn), Mn);
                case V:
                case z:
                  return Nn(Rn + "Hours", 0);
                case k:
                  return Nn(Rn + "Minutes", 1);
                case $:
                  return Nn(Rn + "Seconds", 2);
                case y:
                  return Nn(Rn + "Milliseconds", 3);
                default:
                  return this.clone();
              }
            }),
            (Fe.endOf = function (xe) {
              return this.startOf(xe, !1);
            }),
            (Fe.$set = function (xe, Lt) {
              var At,
                Ue = qe.p(xe),
                ze = "set" + (this.$u ? "UTC" : ""),
                Tn = ((At = {}),
                (At[V] = ze + "Date"),
                (At[z] = ze + "Date"),
                (At[oe] = ze + "Month"),
                (At[ae] = ze + "FullYear"),
                (At[k] = ze + "Hours"),
                (At[$] = ze + "Minutes"),
                (At[y] = ze + "Seconds"),
                (At[g] = ze + "Milliseconds"),
                At)[Ue],
                Nn = Ue === V ? this.$D + (Lt - this.$W) : Lt;
              if (Ue === oe || Ue === ae) {
                var xn = this.clone().set(z, 1);
                xn.$d[Tn](Nn),
                  xn.init(),
                  (this.$d = xn.set(z, Math.min(this.$D, xn.daysInMonth())).$d);
              } else Tn && this.$d[Tn](Nn);
              return this.init(), this;
            }),
            (Fe.set = function (xe, Lt) {
              return this.clone().$set(xe, Lt);
            }),
            (Fe.get = function (xe) {
              return this[qe.p(xe)]();
            }),
            (Fe.add = function (xe, Lt) {
              var At,
                Ue = this;
              xe = Number(xe);
              var ze = qe.p(Lt),
                Tn = function (Mn) {
                  var zn = Ve(Ue);
                  return qe.w(zn.date(zn.date() + Math.round(Mn * xe)), Ue);
                };
              if (ze === oe) return this.set(oe, this.$M + xe);
              if (ze === ae) return this.set(ae, this.$y + xe);
              if (ze === V) return Tn(1);
              if (ze === L) return Tn(7);
              var Nn =
                  ((At = {}), (At[$] = r), (At[k] = i), (At[y] = n), At)[ze] ||
                  1,
                xn = this.$d.getTime() + xe * Nn;
              return qe.w(xn, this);
            }),
            (Fe.subtract = function (xe, Lt) {
              return this.add(-1 * xe, Lt);
            }),
            (Fe.format = function (xe) {
              var Lt = this,
                At = this.$locale();
              if (!this.isValid()) return At.invalidDate || re;
              var Ue = xe || "YYYY-MM-DDTHH:mm:ssZ",
                ze = qe.z(this),
                Tn = this.$H,
                Nn = this.$m,
                xn = this.$M,
                Mn = At.weekdays,
                zn = At.months,
                Rn = function (Hn, qn, Gn, _e) {
                  return (Hn && (Hn[qn] || Hn(Lt, Ue))) || Gn[qn].slice(0, _e);
                },
                Ln = function (Hn) {
                  return qe.s(Tn % 12 || 12, Hn, "0");
                },
                jn =
                  At.meridiem ||
                  function (Hn, qn, Gn) {
                    var _e = Hn < 12 ? "AM" : "PM";
                    return Gn ? _e.toLowerCase() : _e;
                  },
                Fn = {
                  YY: String(this.$y).slice(-2),
                  YYYY: this.$y,
                  M: xn + 1,
                  MM: qe.s(xn + 1, 2, "0"),
                  MMM: Rn(At.monthsShort, xn, zn, 3),
                  MMMM: Rn(zn, xn),
                  D: this.$D,
                  DD: qe.s(this.$D, 2, "0"),
                  d: String(this.$W),
                  dd: Rn(At.weekdaysMin, this.$W, Mn, 2),
                  ddd: Rn(At.weekdaysShort, this.$W, Mn, 3),
                  dddd: Mn[this.$W],
                  H: String(Tn),
                  HH: qe.s(Tn, 2, "0"),
                  h: Ln(1),
                  hh: Ln(2),
                  a: jn(Tn, Nn, !0),
                  A: jn(Tn, Nn, !1),
                  m: String(Nn),
                  mm: qe.s(Nn, 2, "0"),
                  s: String(this.$s),
                  ss: qe.s(this.$s, 2, "0"),
                  SSS: qe.s(this.$ms, 3, "0"),
                  Z: ze,
                };
              return Ue.replace(le, function (Hn, qn) {
                return qn || Fn[Hn] || ze.replace(":", "");
              });
            }),
            (Fe.utcOffset = function () {
              return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
            }),
            (Fe.diff = function (xe, Lt, At) {
              var Ue,
                ze = qe.p(Lt),
                Tn = Ve(xe),
                Nn = (Tn.utcOffset() - this.utcOffset()) * r,
                xn = this - Tn,
                Mn = qe.m(this, Tn);
              return (
                (Mn =
                  ((Ue = {}),
                  (Ue[ae] = Mn / 12),
                  (Ue[oe] = Mn),
                  (Ue[j] = Mn / 3),
                  (Ue[L] = (xn - Nn) / 6048e5),
                  (Ue[V] = (xn - Nn) / 864e5),
                  (Ue[k] = xn / i),
                  (Ue[$] = xn / r),
                  (Ue[y] = xn / n),
                  Ue)[ze] || xn),
                At ? Mn : qe.a(Mn)
              );
            }),
            (Fe.daysInMonth = function () {
              return this.endOf(oe).$D;
            }),
            (Fe.$locale = function () {
              return Oe[this.$L];
            }),
            (Fe.locale = function (xe, Lt) {
              if (!xe) return this.$L;
              var At = this.clone(),
                Ue = $e(xe, Lt, !0);
              return Ue && (At.$L = Ue), At;
            }),
            (Fe.clone = function () {
              return qe.w(this.$d, this);
            }),
            (Fe.toDate = function () {
              return new Date(this.valueOf());
            }),
            (Fe.toJSON = function () {
              return this.isValid() ? this.toISOString() : null;
            }),
            (Fe.toISOString = function () {
              return this.$d.toISOString();
            }),
            (Fe.toString = function () {
              return this.$d.toUTCString();
            }),
            kt
          );
        })(),
        Pt = Cn.prototype;
      return (
        (Ve.prototype = Pt),
        [
          ["$ms", g],
          ["$s", y],
          ["$m", $],
          ["$H", k],
          ["$W", V],
          ["$M", oe],
          ["$y", ae],
          ["$D", z],
        ].forEach(function (kt) {
          Pt[kt[1]] = function (Fe) {
            return this.$g(Fe, kt[0], kt[1]);
          };
        }),
        (Ve.extend = function (kt, Fe) {
          return kt.$i || (kt(Fe, Cn, Ve), (kt.$i = !0)), Ve;
        }),
        (Ve.locale = $e),
        (Ve.isDayjs = he),
        (Ve.unix = function (kt) {
          return Ve(1e3 * kt);
        }),
        (Ve.en = Oe[Ce]),
        (Ve.Ls = Oe),
        (Ve.p = {}),
        Ve
      );
    });
  })(dayjs_min);
  const dayjs = dayjs_min.exports,
    nodeList = new Map();
  let startClick;
  isClient$1 &&
    (document.addEventListener("mousedown", (e) => (startClick = e)),
    document.addEventListener("mouseup", (e) => {
      for (const t of nodeList.values())
        for (const { documentHandler: n } of t) n(e, startClick);
    }));
  function createDocumentHandler(e, t) {
    let n = [];
    return (
      Array.isArray(t.arg) ? (n = t.arg) : isElement(t.arg) && n.push(t.arg),
      function (r, i) {
        const g = t.instance.popperRef,
          y = r.target,
          $ = i == null ? void 0 : i.target,
          k = !t || !t.instance,
          V = !y || !$,
          L = e.contains(y) || e.contains($),
          oe = e === y,
          j =
            (n.length && n.some((z) => (z == null ? void 0 : z.contains(y)))) ||
            (n.length && n.includes($)),
          ae = g && (g.contains(y) || g.contains($));
        k || V || L || oe || j || ae || t.value(r, i);
      }
    );
  }
  const ClickOutside = {
      beforeMount(e, t) {
        nodeList.has(e) || nodeList.set(e, []),
          nodeList
            .get(e)
            .push({
              documentHandler: createDocumentHandler(e, t),
              bindingFn: t.value,
            });
      },
      updated(e, t) {
        nodeList.has(e) || nodeList.set(e, []);
        const n = nodeList.get(e),
          r = n.findIndex((g) => g.bindingFn === t.oldValue),
          i = {
            documentHandler: createDocumentHandler(e, t),
            bindingFn: t.value,
          };
        r >= 0 ? n.splice(r, 1, i) : n.push(i);
      },
      unmounted(e) {
        nodeList.delete(e);
      },
    },
    FOCUSABLE_CHILDREN = "_trap-focus-children",
    FOCUS_STACK = [],
    FOCUS_HANDLER = (e) => {
      if (FOCUS_STACK.length === 0) return;
      const t = FOCUS_STACK[FOCUS_STACK.length - 1][FOCUSABLE_CHILDREN];
      if (t.length > 0 && e.code === EVENT_CODE.tab) {
        if (t.length === 1) {
          e.preventDefault(), document.activeElement !== t[0] && t[0].focus();
          return;
        }
        const n = e.shiftKey,
          r = e.target === t[0],
          i = e.target === t[t.length - 1];
        r && n && (e.preventDefault(), t[t.length - 1].focus()),
          i && !n && (e.preventDefault(), t[0].focus());
      }
    },
    TrapFocus = {
      beforeMount(e) {
        (e[FOCUSABLE_CHILDREN] = obtainAllFocusableElements$1(e)),
          FOCUS_STACK.push(e),
          FOCUS_STACK.length <= 1 &&
            document.addEventListener("keydown", FOCUS_HANDLER);
      },
      updated(e) {
        nextTick(() => {
          e[FOCUSABLE_CHILDREN] = obtainAllFocusableElements$1(e);
        });
      },
      unmounted() {
        FOCUS_STACK.shift(),
          FOCUS_STACK.length === 0 &&
            document.removeEventListener("keydown", FOCUS_HANDLER);
      },
    };
  var v = !1,
    o,
    f,
    s,
    u,
    d,
    N,
    l,
    p,
    m,
    w,
    D,
    x,
    E,
    M,
    F;
  function a() {
    if (!v) {
      v = !0;
      var e = navigator.userAgent,
        t =
          /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(
            e
          ),
        n = /(Mac OS X)|(Windows)|(Linux)/.exec(e);
      if (
        ((x = /\b(iPhone|iP[ao]d)/.exec(e)),
        (E = /\b(iP[ao]d)/.exec(e)),
        (w = /Android/i.exec(e)),
        (M = /FBAN\/\w+;/i.exec(e)),
        (F = /Mobile/i.exec(e)),
        (D = !!/Win64/.exec(e)),
        t)
      ) {
        (o = t[1] ? parseFloat(t[1]) : t[5] ? parseFloat(t[5]) : NaN),
          o && document && document.documentMode && (o = document.documentMode);
        var r = /(?:Trident\/(\d+.\d+))/.exec(e);
        (N = r ? parseFloat(r[1]) + 4 : o),
          (f = t[2] ? parseFloat(t[2]) : NaN),
          (s = t[3] ? parseFloat(t[3]) : NaN),
          (u = t[4] ? parseFloat(t[4]) : NaN),
          u
            ? ((t = /(?:Chrome\/(\d+\.\d+))/.exec(e)),
              (d = t && t[1] ? parseFloat(t[1]) : NaN))
            : (d = NaN);
      } else o = f = s = d = u = NaN;
      if (n) {
        if (n[1]) {
          var i = /(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(e);
          l = i ? parseFloat(i[1].replace("_", ".")) : !0;
        } else l = !1;
        (p = !!n[2]), (m = !!n[3]);
      } else l = p = m = !1;
    }
  }
  var _ = {
      ie: function () {
        return a() || o;
      },
      ieCompatibilityMode: function () {
        return a() || N > o;
      },
      ie64: function () {
        return _.ie() && D;
      },
      firefox: function () {
        return a() || f;
      },
      opera: function () {
        return a() || s;
      },
      webkit: function () {
        return a() || u;
      },
      safari: function () {
        return _.webkit();
      },
      chrome: function () {
        return a() || d;
      },
      windows: function () {
        return a() || p;
      },
      osx: function () {
        return a() || l;
      },
      linux: function () {
        return a() || m;
      },
      iphone: function () {
        return a() || x;
      },
      mobile: function () {
        return a() || x || E || w || F;
      },
      nativeApp: function () {
        return a() || M;
      },
      android: function () {
        return a() || w;
      },
      ipad: function () {
        return a() || E;
      },
    },
    A = _,
    c = !!(
      typeof window < "u" &&
      window.document &&
      window.document.createElement
    ),
    U = {
      canUseDOM: c,
      canUseWorkers: typeof Worker < "u",
      canUseEventListeners:
        c && !!(window.addEventListener || window.attachEvent),
      canUseViewport: c && !!window.screen,
      isInWorker: !c,
    },
    h = U,
    X;
  h.canUseDOM &&
    (X =
      document.implementation &&
      document.implementation.hasFeature &&
      document.implementation.hasFeature("", "") !== !0);
  function S(e, t) {
    if (!h.canUseDOM || (t && !("addEventListener" in document))) return !1;
    var n = "on" + e,
      r = n in document;
    if (!r) {
      var i = document.createElement("div");
      i.setAttribute(n, "return;"), (r = typeof i[n] == "function");
    }
    return (
      !r &&
        X &&
        e === "wheel" &&
        (r = document.implementation.hasFeature("Events.wheel", "3.0")),
      r
    );
  }
  var b = S,
    O = 10,
    I = 40,
    P = 800;
  function T(e) {
    var t = 0,
      n = 0,
      r = 0,
      i = 0;
    return (
      "detail" in e && (n = e.detail),
      "wheelDelta" in e && (n = -e.wheelDelta / 120),
      "wheelDeltaY" in e && (n = -e.wheelDeltaY / 120),
      "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120),
      "axis" in e && e.axis === e.HORIZONTAL_AXIS && ((t = n), (n = 0)),
      (r = t * O),
      (i = n * O),
      "deltaY" in e && (i = e.deltaY),
      "deltaX" in e && (r = e.deltaX),
      (r || i) &&
        e.deltaMode &&
        (e.deltaMode == 1 ? ((r *= I), (i *= I)) : ((r *= P), (i *= P))),
      r && !t && (t = r < 1 ? -1 : 1),
      i && !n && (n = i < 1 ? -1 : 1),
      { spinX: t, spinY: n, pixelX: r, pixelY: i }
    );
  }
  T.getEventType = function () {
    return A.firefox() ? "DOMMouseScroll" : b("wheel") ? "wheel" : "mousewheel";
  };
  var Y = T;
  /**
   * Checks if an event is supported in the current execution environment.
   *
   * NOTE: This will not work correctly for non-generic events such as `change`,
   * `reset`, `load`, `error`, and `select`.
   *
   * Borrows from Modernizr.
   *
   * @param {string} eventNameSuffix Event name, e.g. "click".
   * @param {?boolean} capture Check if the capture phase is supported.
   * @return {boolean} True if the event is supported.
   * @internal
   * @license Modernizr 3.0.0pre (Custom Build) | MIT
   */ const mousewheel = function (e, t) {
      if (e && e.addEventListener) {
        const n = function (r) {
          const i = Y(r);
          t && Reflect.apply(t, this, [r, i]);
        };
        e.addEventListener("wheel", n, { passive: !0 });
      }
    },
    Mousewheel = {
      beforeMount(e, t) {
        mousewheel(e, t.value);
      },
    },
    checkboxProps = {
      modelValue: { type: [Number, String, Boolean], default: void 0 },
      label: { type: [String, Boolean, Number, Object] },
      indeterminate: Boolean,
      disabled: Boolean,
      checked: Boolean,
      name: { type: String, default: void 0 },
      trueLabel: { type: [String, Number], default: void 0 },
      falseLabel: { type: [String, Number], default: void 0 },
      id: { type: String, default: void 0 },
      controls: { type: String, default: void 0 },
      border: Boolean,
      size: useSizeProp,
      tabindex: [String, Number],
      validateEvent: { type: Boolean, default: !0 },
    },
    checkboxEmits = {
      [UPDATE_MODEL_EVENT]: (e) =>
        isString$3(e) || isNumber$1(e) || isBoolean$1(e),
      change: (e) => isString$3(e) || isNumber$1(e) || isBoolean$1(e),
    },
    useCheckboxDisabled = ({ model: e, isChecked: t }) => {
      const n = inject(checkboxGroupContextKey, void 0),
        r = computed(() => {
          var g, y;
          const $ = (g = n == null ? void 0 : n.max) == null ? void 0 : g.value,
            k = (y = n == null ? void 0 : n.min) == null ? void 0 : y.value;
          return (
            (!isUndefined$1($) && e.value.length >= $ && !t.value) ||
            (!isUndefined$1(k) && e.value.length <= k && t.value)
          );
        });
      return {
        isDisabled: useDisabled(
          computed(() => (n == null ? void 0 : n.disabled.value) || r.value)
        ),
        isLimitDisabled: r,
      };
    },
    useCheckboxEvent = (
      e,
      {
        model: t,
        isLimitExceeded: n,
        hasOwnLabel: r,
        isDisabled: i,
        isLabeledByFormItem: g,
      }
    ) => {
      const y = inject(checkboxGroupContextKey, void 0),
        { formItem: $ } = useFormItem(),
        { emit: k } = getCurrentInstance();
      function V(z) {
        var re, ie;
        return z === e.trueLabel || z === !0
          ? (re = e.trueLabel) != null
            ? re
            : !0
          : (ie = e.falseLabel) != null
          ? ie
          : !1;
      }
      function L(z, re) {
        k("change", V(z), re);
      }
      function oe(z) {
        if (n.value) return;
        const re = z.target;
        k("change", V(re.checked), z);
      }
      async function j(z) {
        n.value ||
          (!r.value &&
            !i.value &&
            g.value &&
            (z.composedPath().some((le) => le.tagName === "LABEL") ||
              ((t.value = V([!1, e.falseLabel].includes(t.value))),
              await nextTick(),
              L(t.value, z))));
      }
      const ae = computed(
        () => (y == null ? void 0 : y.validateEvent) || e.validateEvent
      );
      return (
        watch(
          () => e.modelValue,
          () => {
            ae.value &&
              ($ == null || $.validate("change").catch((z) => void 0));
          }
        ),
        { handleChange: oe, onClickRoot: j }
      );
    },
    useCheckboxModel = (e) => {
      const t = ref(!1),
        { emit: n } = getCurrentInstance(),
        r = inject(checkboxGroupContextKey, void 0),
        i = computed(() => isUndefined$1(r) === !1),
        g = ref(!1);
      return {
        model: computed({
          get() {
            var $, k;
            return i.value
              ? ($ = r == null ? void 0 : r.modelValue) == null
                ? void 0
                : $.value
              : (k = e.modelValue) != null
              ? k
              : t.value;
          },
          set($) {
            var k, V;
            i.value && isArray$3($)
              ? ((g.value =
                  ((k = r == null ? void 0 : r.max) == null
                    ? void 0
                    : k.value) !== void 0 &&
                  $.length > (r == null ? void 0 : r.max.value)),
                g.value === !1 &&
                  ((V = r == null ? void 0 : r.changeEvent) == null ||
                    V.call(r, $)))
              : (n(UPDATE_MODEL_EVENT, $), (t.value = $));
          },
        }),
        isGroup: i,
        isLimitExceeded: g,
      };
    },
    useCheckboxStatus = (e, t, { model: n }) => {
      const r = inject(checkboxGroupContextKey, void 0),
        i = ref(!1),
        g = computed(() => {
          const V = n.value;
          return isBoolean$1(V)
            ? V
            : isArray$3(V)
            ? isObject$3(e.label)
              ? V.map(toRaw).some((L) => isEqual(L, e.label))
              : V.map(toRaw).includes(e.label)
            : V != null
            ? V === e.trueLabel
            : !!V;
        }),
        y = useSize(
          computed(() => {
            var V;
            return (V = r == null ? void 0 : r.size) == null ? void 0 : V.value;
          }),
          { prop: !0 }
        ),
        $ = useSize(
          computed(() => {
            var V;
            return (V = r == null ? void 0 : r.size) == null ? void 0 : V.value;
          })
        ),
        k = computed(() => !!(t.default || e.label));
      return {
        checkboxButtonSize: y,
        isChecked: g,
        isFocused: i,
        checkboxSize: $,
        hasOwnLabel: k,
      };
    },
    setStoreValue = (e, { model: t }) => {
      function n() {
        isArray$3(t.value) && !t.value.includes(e.label)
          ? t.value.push(e.label)
          : (t.value = e.trueLabel || !0);
      }
      e.checked && n();
    },
    useCheckbox = (e, t) => {
      const { formItem: n } = useFormItem(),
        { model: r, isGroup: i, isLimitExceeded: g } = useCheckboxModel(e),
        {
          isFocused: y,
          isChecked: $,
          checkboxButtonSize: k,
          checkboxSize: V,
          hasOwnLabel: L,
        } = useCheckboxStatus(e, t, { model: r }),
        { isDisabled: oe } = useCheckboxDisabled({ model: r, isChecked: $ }),
        { inputId: j, isLabeledByFormItem: ae } = useFormItemInputId(e, {
          formItemContext: n,
          disableIdGeneration: L,
          disableIdManagement: i,
        }),
        { handleChange: z, onClickRoot: re } = useCheckboxEvent(e, {
          model: r,
          isLimitExceeded: g,
          hasOwnLabel: L,
          isDisabled: oe,
          isLabeledByFormItem: ae,
        });
      return (
        setStoreValue(e, { model: r }),
        {
          inputId: j,
          isLabeledByFormItem: ae,
          isChecked: $,
          isDisabled: oe,
          isFocused: y,
          checkboxButtonSize: k,
          checkboxSize: V,
          hasOwnLabel: L,
          model: r,
          handleChange: z,
          onClickRoot: re,
        }
      );
    },
    _hoisted_1$a = ["tabindex", "role", "aria-checked"],
    _hoisted_2$a = [
      "id",
      "aria-hidden",
      "name",
      "tabindex",
      "disabled",
      "true-value",
      "false-value",
    ],
    _hoisted_3$5 = [
      "id",
      "aria-hidden",
      "disabled",
      "value",
      "name",
      "tabindex",
    ],
    __default__$a = defineComponent({ name: "ElCheckbox" }),
    _sfc_main$j = defineComponent({
      ...__default__$a,
      props: checkboxProps,
      emits: checkboxEmits,
      setup(e) {
        const t = e,
          n = useSlots(),
          {
            inputId: r,
            isLabeledByFormItem: i,
            isChecked: g,
            isDisabled: y,
            isFocused: $,
            checkboxSize: k,
            hasOwnLabel: V,
            model: L,
            handleChange: oe,
            onClickRoot: j,
          } = useCheckbox(t, n),
          ae = useNamespace("checkbox"),
          z = computed(() => [
            ae.b(),
            ae.m(k.value),
            ae.is("disabled", y.value),
            ae.is("bordered", t.border),
            ae.is("checked", g.value),
          ]),
          re = computed(() => [
            ae.e("input"),
            ae.is("disabled", y.value),
            ae.is("checked", g.value),
            ae.is("indeterminate", t.indeterminate),
            ae.is("focus", $.value),
          ]);
        return (ie, le) => (
          openBlock(),
          createBlock(
            resolveDynamicComponent(!unref(V) && unref(i) ? "span" : "label"),
            {
              class: normalizeClass(unref(z)),
              "aria-controls": ie.indeterminate ? ie.controls : null,
              onClick: unref(j),
            },
            {
              default: withCtx(() => [
                createBaseVNode(
                  "span",
                  {
                    class: normalizeClass(unref(re)),
                    tabindex: ie.indeterminate ? 0 : void 0,
                    role: ie.indeterminate ? "checkbox" : void 0,
                    "aria-checked": ie.indeterminate ? "mixed" : void 0,
                  },
                  [
                    ie.trueLabel || ie.falseLabel
                      ? withDirectives(
                          (openBlock(),
                          createElementBlock(
                            "input",
                            {
                              key: 0,
                              id: unref(r),
                              "onUpdate:modelValue":
                                le[0] ||
                                (le[0] = (de) =>
                                  isRef(L) ? (L.value = de) : null),
                              class: normalizeClass(unref(ae).e("original")),
                              type: "checkbox",
                              "aria-hidden": ie.indeterminate
                                ? "true"
                                : "false",
                              name: ie.name,
                              tabindex: ie.tabindex,
                              disabled: unref(y),
                              "true-value": ie.trueLabel,
                              "false-value": ie.falseLabel,
                              onChange:
                                le[1] ||
                                (le[1] = (...de) =>
                                  unref(oe) && unref(oe)(...de)),
                              onFocus:
                                le[2] || (le[2] = (de) => ($.value = !0)),
                              onBlur: le[3] || (le[3] = (de) => ($.value = !1)),
                            },
                            null,
                            42,
                            _hoisted_2$a
                          )),
                          [[vModelCheckbox, unref(L)]]
                        )
                      : withDirectives(
                          (openBlock(),
                          createElementBlock(
                            "input",
                            {
                              key: 1,
                              id: unref(r),
                              "onUpdate:modelValue":
                                le[4] ||
                                (le[4] = (de) =>
                                  isRef(L) ? (L.value = de) : null),
                              class: normalizeClass(unref(ae).e("original")),
                              type: "checkbox",
                              "aria-hidden": ie.indeterminate
                                ? "true"
                                : "false",
                              disabled: unref(y),
                              value: ie.label,
                              name: ie.name,
                              tabindex: ie.tabindex,
                              onChange:
                                le[5] ||
                                (le[5] = (...de) =>
                                  unref(oe) && unref(oe)(...de)),
                              onFocus:
                                le[6] || (le[6] = (de) => ($.value = !0)),
                              onBlur: le[7] || (le[7] = (de) => ($.value = !1)),
                            },
                            null,
                            42,
                            _hoisted_3$5
                          )),
                          [[vModelCheckbox, unref(L)]]
                        ),
                    createBaseVNode(
                      "span",
                      { class: normalizeClass(unref(ae).e("inner")) },
                      null,
                      2
                    ),
                  ],
                  10,
                  _hoisted_1$a
                ),
                unref(V)
                  ? (openBlock(),
                    createElementBlock(
                      "span",
                      { key: 0, class: normalizeClass(unref(ae).e("label")) },
                      [
                        renderSlot(ie.$slots, "default"),
                        ie.$slots.default
                          ? createCommentVNode("v-if", !0)
                          : (openBlock(),
                            createElementBlock(
                              Fragment,
                              { key: 0 },
                              [createTextVNode(toDisplayString(ie.label), 1)],
                              64
                            )),
                      ],
                      2
                    ))
                  : createCommentVNode("v-if", !0),
              ]),
              _: 3,
            },
            8,
            ["class", "aria-controls", "onClick"]
          )
        );
      },
    });
  var Checkbox = _export_sfc$1(_sfc_main$j, [
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/checkbox/src/checkbox.vue",
    ],
  ]);
  const _hoisted_1$9 = [
      "name",
      "tabindex",
      "disabled",
      "true-value",
      "false-value",
    ],
    _hoisted_2$9 = ["name", "tabindex", "disabled", "value"],
    __default__$9 = defineComponent({ name: "ElCheckboxButton" }),
    _sfc_main$i = defineComponent({
      ...__default__$9,
      props: checkboxProps,
      emits: checkboxEmits,
      setup(e) {
        const t = e,
          n = useSlots(),
          {
            isFocused: r,
            isChecked: i,
            isDisabled: g,
            checkboxButtonSize: y,
            model: $,
            handleChange: k,
          } = useCheckbox(t, n),
          V = inject(checkboxGroupContextKey, void 0),
          L = useNamespace("checkbox"),
          oe = computed(() => {
            var ae, z, re, ie;
            const le =
              (z =
                (ae = V == null ? void 0 : V.fill) == null
                  ? void 0
                  : ae.value) != null
                ? z
                : "";
            return {
              backgroundColor: le,
              borderColor: le,
              color:
                (ie =
                  (re = V == null ? void 0 : V.textColor) == null
                    ? void 0
                    : re.value) != null
                  ? ie
                  : "",
              boxShadow: le ? `-1px 0 0 0 ${le}` : void 0,
            };
          }),
          j = computed(() => [
            L.b("button"),
            L.bm("button", y.value),
            L.is("disabled", g.value),
            L.is("checked", i.value),
            L.is("focus", r.value),
          ]);
        return (ae, z) => (
          openBlock(),
          createElementBlock(
            "label",
            { class: normalizeClass(unref(j)) },
            [
              ae.trueLabel || ae.falseLabel
                ? withDirectives(
                    (openBlock(),
                    createElementBlock(
                      "input",
                      {
                        key: 0,
                        "onUpdate:modelValue":
                          z[0] ||
                          (z[0] = (re) => (isRef($) ? ($.value = re) : null)),
                        class: normalizeClass(
                          unref(L).be("button", "original")
                        ),
                        type: "checkbox",
                        name: ae.name,
                        tabindex: ae.tabindex,
                        disabled: unref(g),
                        "true-value": ae.trueLabel,
                        "false-value": ae.falseLabel,
                        onChange:
                          z[1] ||
                          (z[1] = (...re) => unref(k) && unref(k)(...re)),
                        onFocus: z[2] || (z[2] = (re) => (r.value = !0)),
                        onBlur: z[3] || (z[3] = (re) => (r.value = !1)),
                      },
                      null,
                      42,
                      _hoisted_1$9
                    )),
                    [[vModelCheckbox, unref($)]]
                  )
                : withDirectives(
                    (openBlock(),
                    createElementBlock(
                      "input",
                      {
                        key: 1,
                        "onUpdate:modelValue":
                          z[4] ||
                          (z[4] = (re) => (isRef($) ? ($.value = re) : null)),
                        class: normalizeClass(
                          unref(L).be("button", "original")
                        ),
                        type: "checkbox",
                        name: ae.name,
                        tabindex: ae.tabindex,
                        disabled: unref(g),
                        value: ae.label,
                        onChange:
                          z[5] ||
                          (z[5] = (...re) => unref(k) && unref(k)(...re)),
                        onFocus: z[6] || (z[6] = (re) => (r.value = !0)),
                        onBlur: z[7] || (z[7] = (re) => (r.value = !1)),
                      },
                      null,
                      42,
                      _hoisted_2$9
                    )),
                    [[vModelCheckbox, unref($)]]
                  ),
              ae.$slots.default || ae.label
                ? (openBlock(),
                  createElementBlock(
                    "span",
                    {
                      key: 2,
                      class: normalizeClass(unref(L).be("button", "inner")),
                      style: normalizeStyle(unref(i) ? unref(oe) : void 0),
                    },
                    [
                      renderSlot(ae.$slots, "default", {}, () => [
                        createTextVNode(toDisplayString(ae.label), 1),
                      ]),
                    ],
                    6
                  ))
                : createCommentVNode("v-if", !0),
            ],
            2
          )
        );
      },
    });
  var CheckboxButton = _export_sfc$1(_sfc_main$i, [
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/checkbox/src/checkbox-button.vue",
    ],
  ]);
  const checkboxGroupProps = buildProps({
      modelValue: { type: definePropType(Array), default: () => [] },
      disabled: Boolean,
      min: Number,
      max: Number,
      size: useSizeProp,
      label: String,
      fill: String,
      textColor: String,
      tag: { type: String, default: "div" },
      validateEvent: { type: Boolean, default: !0 },
    }),
    checkboxGroupEmits = {
      [UPDATE_MODEL_EVENT]: (e) => isArray$3(e),
      change: (e) => isArray$3(e),
    },
    __default__$8 = defineComponent({ name: "ElCheckboxGroup" }),
    _sfc_main$h = defineComponent({
      ...__default__$8,
      props: checkboxGroupProps,
      emits: checkboxGroupEmits,
      setup(e, { emit: t }) {
        const n = e,
          r = useNamespace("checkbox"),
          { formItem: i } = useFormItem(),
          { inputId: g, isLabeledByFormItem: y } = useFormItemInputId(n, {
            formItemContext: i,
          }),
          $ = async (V) => {
            t(UPDATE_MODEL_EVENT, V), await nextTick(), t("change", V);
          },
          k = computed({
            get() {
              return n.modelValue;
            },
            set(V) {
              $(V);
            },
          });
        return (
          provide(checkboxGroupContextKey, {
            ...pick$1(toRefs(n), [
              "size",
              "min",
              "max",
              "disabled",
              "validateEvent",
              "fill",
              "textColor",
            ]),
            modelValue: k,
            changeEvent: $,
          }),
          watch(
            () => n.modelValue,
            () => {
              n.validateEvent &&
                (i == null || i.validate("change").catch((V) => void 0));
            }
          ),
          (V, L) => {
            var oe;
            return (
              openBlock(),
              createBlock(
                resolveDynamicComponent(V.tag),
                {
                  id: unref(g),
                  class: normalizeClass(unref(r).b("group")),
                  role: "group",
                  "aria-label": unref(y) ? void 0 : V.label || "checkbox-group",
                  "aria-labelledby": unref(y)
                    ? (oe = unref(i)) == null
                      ? void 0
                      : oe.labelId
                    : void 0,
                },
                {
                  default: withCtx(() => [renderSlot(V.$slots, "default")]),
                  _: 3,
                },
                8,
                ["id", "class", "aria-label", "aria-labelledby"]
              )
            );
          }
        );
      },
    });
  var CheckboxGroup = _export_sfc$1(_sfc_main$h, [
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/checkbox/src/checkbox-group.vue",
    ],
  ]);
  const ElCheckbox = withInstall(Checkbox, { CheckboxButton, CheckboxGroup });
  withNoopInstall(CheckboxButton);
  withNoopInstall(CheckboxGroup);
  const tagProps = buildProps({
      closable: Boolean,
      type: {
        type: String,
        values: ["success", "info", "warning", "danger", ""],
        default: "",
      },
      hit: Boolean,
      disableTransitions: Boolean,
      color: { type: String, default: "" },
      size: { type: String, values: componentSizes, default: "" },
      effect: {
        type: String,
        values: ["dark", "light", "plain"],
        default: "light",
      },
      round: Boolean,
    }),
    tagEmits = {
      close: (e) => e instanceof MouseEvent,
      click: (e) => e instanceof MouseEvent,
    },
    __default__$7 = defineComponent({ name: "ElTag" }),
    _sfc_main$g = defineComponent({
      ...__default__$7,
      props: tagProps,
      emits: tagEmits,
      setup(e, { emit: t }) {
        const n = e,
          r = useSize(),
          i = useNamespace("tag"),
          g = computed(() => {
            const { type: k, hit: V, effect: L, closable: oe, round: j } = n;
            return [
              i.b(),
              i.is("closable", oe),
              i.m(k),
              i.m(r.value),
              i.m(L),
              i.is("hit", V),
              i.is("round", j),
            ];
          }),
          y = (k) => {
            t("close", k);
          },
          $ = (k) => {
            t("click", k);
          };
        return (k, V) =>
          k.disableTransitions
            ? (openBlock(),
              createElementBlock(
                "span",
                {
                  key: 0,
                  class: normalizeClass(unref(g)),
                  style: normalizeStyle({ backgroundColor: k.color }),
                  onClick: $,
                },
                [
                  createBaseVNode(
                    "span",
                    { class: normalizeClass(unref(i).e("content")) },
                    [renderSlot(k.$slots, "default")],
                    2
                  ),
                  k.closable
                    ? (openBlock(),
                      createBlock(
                        unref(ElIcon),
                        {
                          key: 0,
                          class: normalizeClass(unref(i).e("close")),
                          onClick: withModifiers(y, ["stop"]),
                        },
                        {
                          default: withCtx(() => [
                            createVNode(unref(close_default)),
                          ]),
                          _: 1,
                        },
                        8,
                        ["class", "onClick"]
                      ))
                    : createCommentVNode("v-if", !0),
                ],
                6
              ))
            : (openBlock(),
              createBlock(
                Transition,
                {
                  key: 1,
                  name: `${unref(i).namespace.value}-zoom-in-center`,
                  appear: "",
                },
                {
                  default: withCtx(() => [
                    createBaseVNode(
                      "span",
                      {
                        class: normalizeClass(unref(g)),
                        style: normalizeStyle({ backgroundColor: k.color }),
                        onClick: $,
                      },
                      [
                        createBaseVNode(
                          "span",
                          { class: normalizeClass(unref(i).e("content")) },
                          [renderSlot(k.$slots, "default")],
                          2
                        ),
                        k.closable
                          ? (openBlock(),
                            createBlock(
                              unref(ElIcon),
                              {
                                key: 0,
                                class: normalizeClass(unref(i).e("close")),
                                onClick: withModifiers(y, ["stop"]),
                              },
                              {
                                default: withCtx(() => [
                                  createVNode(unref(close_default)),
                                ]),
                                _: 1,
                              },
                              8,
                              ["class", "onClick"]
                            ))
                          : createCommentVNode("v-if", !0),
                      ],
                      6
                    ),
                  ]),
                  _: 3,
                },
                8,
                ["name"]
              ));
      },
    });
  var Tag = _export_sfc$1(_sfc_main$g, [
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/tag/src/tag.vue",
    ],
  ]);
  const ElTag = withInstall(Tag),
    emitChangeFn = (e) => typeof isNumber$1(e),
    collapseProps = buildProps({
      accordion: Boolean,
      modelValue: {
        type: definePropType([Array, String, Number]),
        default: () => mutable([]),
      },
    }),
    collapseEmits = {
      [UPDATE_MODEL_EVENT]: emitChangeFn,
      [CHANGE_EVENT]: emitChangeFn,
    },
    useCollapse = (e, t) => {
      const n = ref(castArray(e.modelValue)),
        r = (g) => {
          n.value = g;
          const y = e.accordion ? n.value[0] : n.value;
          t(UPDATE_MODEL_EVENT, y), t(CHANGE_EVENT, y);
        },
        i = (g) => {
          if (e.accordion) r([n.value[0] === g ? "" : g]);
          else {
            const y = [...n.value],
              $ = y.indexOf(g);
            $ > -1 ? y.splice($, 1) : y.push(g), r(y);
          }
        };
      return (
        watch(
          () => e.modelValue,
          () => (n.value = castArray(e.modelValue)),
          { deep: !0 }
        ),
        provide(collapseContextKey, { activeNames: n, handleItemClick: i }),
        { activeNames: n, setActiveNames: r }
      );
    },
    useCollapseDOM = () => {
      const e = useNamespace("collapse");
      return { rootKls: computed(() => e.b()) };
    },
    __default__$6 = defineComponent({ name: "ElCollapse" }),
    _sfc_main$f = defineComponent({
      ...__default__$6,
      props: collapseProps,
      emits: collapseEmits,
      setup(e, { expose: t, emit: n }) {
        const r = e,
          { activeNames: i, setActiveNames: g } = useCollapse(r, n),
          { rootKls: y } = useCollapseDOM();
        return (
          t({ activeNames: i, setActiveNames: g }),
          ($, k) => (
            openBlock(),
            createElementBlock(
              "div",
              {
                class: normalizeClass(unref(y)),
                role: "tablist",
                "aria-multiselectable": "true",
              },
              [renderSlot($.$slots, "default")],
              2
            )
          )
        );
      },
    });
  var Collapse = _export_sfc$1(_sfc_main$f, [
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/collapse/src/collapse.vue",
    ],
  ]);
  const __default__$5 = defineComponent({ name: "ElCollapseTransition" }),
    _sfc_main$e = defineComponent({
      ...__default__$5,
      setup(e) {
        const t = useNamespace("collapse-transition"),
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
        return (r, i) => (
          openBlock(),
          createBlock(
            Transition,
            mergeProps({ name: unref(t).b() }, toHandlers(n)),
            { default: withCtx(() => [renderSlot(r.$slots, "default")]), _: 3 },
            16,
            ["name"]
          )
        );
      },
    });
  var CollapseTransition = _export_sfc$1(_sfc_main$e, [
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/collapse-transition/src/collapse-transition.vue",
    ],
  ]);
  CollapseTransition.install = (e) => {
    e.component(CollapseTransition.name, CollapseTransition);
  };
  const _CollapseTransition = CollapseTransition,
    collapseItemProps = buildProps({
      title: { type: String, default: "" },
      name: {
        type: definePropType([String, Number]),
        default: () => generateId(),
      },
      disabled: Boolean,
    }),
    useCollapseItem = (e) => {
      const t = inject(collapseContextKey),
        n = ref(!1),
        r = ref(!1),
        i = ref(generateId()),
        g = computed(() =>
          t == null ? void 0 : t.activeNames.value.includes(e.name)
        );
      return {
        focusing: n,
        id: i,
        isActive: g,
        handleFocus: () => {
          setTimeout(() => {
            r.value ? (r.value = !1) : (n.value = !0);
          }, 50);
        },
        handleHeaderClick: () => {
          e.disabled ||
            (t == null || t.handleItemClick(e.name),
            (n.value = !1),
            (r.value = !0));
        },
        handleEnterClick: () => {
          t == null || t.handleItemClick(e.name);
        },
      };
    },
    useCollapseItemDOM = (e, { focusing: t, isActive: n, id: r }) => {
      const i = useNamespace("collapse"),
        g = computed(() => [
          i.b("item"),
          i.is("active", unref(n)),
          i.is("disabled", e.disabled),
        ]),
        y = computed(() => [
          i.be("item", "header"),
          i.is("active", unref(n)),
          { focusing: unref(t) && !e.disabled },
        ]),
        $ = computed(() => [i.be("item", "arrow"), i.is("active", unref(n))]),
        k = computed(() => i.be("item", "wrap")),
        V = computed(() => i.be("item", "content")),
        L = computed(() => i.b(`content-${unref(r)}`)),
        oe = computed(() => i.b(`head-${unref(r)}`));
      return {
        arrowKls: $,
        headKls: y,
        rootKls: g,
        itemWrapperKls: k,
        itemContentKls: V,
        scopedContentId: L,
        scopedHeadId: oe,
      };
    },
    _hoisted_1$8 = ["aria-expanded", "aria-controls", "aria-describedby"],
    _hoisted_2$8 = ["id", "tabindex"],
    _hoisted_3$4 = ["id", "aria-hidden", "aria-labelledby"],
    __default__$4 = defineComponent({ name: "ElCollapseItem" }),
    _sfc_main$d = defineComponent({
      ...__default__$4,
      props: collapseItemProps,
      setup(e, { expose: t }) {
        const n = e,
          {
            focusing: r,
            id: i,
            isActive: g,
            handleFocus: y,
            handleHeaderClick: $,
            handleEnterClick: k,
          } = useCollapseItem(n),
          {
            arrowKls: V,
            headKls: L,
            rootKls: oe,
            itemWrapperKls: j,
            itemContentKls: ae,
            scopedContentId: z,
            scopedHeadId: re,
          } = useCollapseItemDOM(n, { focusing: r, isActive: g, id: i });
        return (
          t({ isActive: g }),
          (ie, le) => (
            openBlock(),
            createElementBlock(
              "div",
              { class: normalizeClass(unref(oe)) },
              [
                createBaseVNode(
                  "div",
                  {
                    role: "tab",
                    "aria-expanded": unref(g),
                    "aria-controls": unref(z),
                    "aria-describedby": unref(z),
                  },
                  [
                    createBaseVNode(
                      "div",
                      {
                        id: unref(re),
                        class: normalizeClass(unref(L)),
                        role: "button",
                        tabindex: ie.disabled ? -1 : 0,
                        onClick:
                          le[0] ||
                          (le[0] = (...de) => unref($) && unref($)(...de)),
                        onKeypress:
                          le[1] ||
                          (le[1] = withKeys(
                            withModifiers(
                              (...de) => unref(k) && unref(k)(...de),
                              ["stop", "prevent"]
                            ),
                            ["space", "enter"]
                          )),
                        onFocus:
                          le[2] ||
                          (le[2] = (...de) => unref(y) && unref(y)(...de)),
                        onBlur: le[3] || (le[3] = (de) => (r.value = !1)),
                      },
                      [
                        renderSlot(ie.$slots, "title", {}, () => [
                          createTextVNode(toDisplayString(ie.title), 1),
                        ]),
                        createVNode(
                          unref(ElIcon),
                          { class: normalizeClass(unref(V)) },
                          {
                            default: withCtx(() => [
                              createVNode(unref(arrow_right_default)),
                            ]),
                            _: 1,
                          },
                          8,
                          ["class"]
                        ),
                      ],
                      42,
                      _hoisted_2$8
                    ),
                  ],
                  8,
                  _hoisted_1$8
                ),
                createVNode(unref(_CollapseTransition), null, {
                  default: withCtx(() => [
                    withDirectives(
                      createBaseVNode(
                        "div",
                        {
                          id: unref(z),
                          class: normalizeClass(unref(j)),
                          role: "tabpanel",
                          "aria-hidden": !unref(g),
                          "aria-labelledby": unref(re),
                        },
                        [
                          createBaseVNode(
                            "div",
                            { class: normalizeClass(unref(ae)) },
                            [renderSlot(ie.$slots, "default")],
                            2
                          ),
                        ],
                        10,
                        _hoisted_3$4
                      ),
                      [[vShow, unref(g)]]
                    ),
                  ]),
                  _: 3,
                }),
              ],
              2
            )
          )
        );
      },
    });
  var CollapseItem = _export_sfc$1(_sfc_main$d, [
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/collapse/src/collapse-item.vue",
    ],
  ]);
  const ElCollapse = withInstall(Collapse, { CollapseItem }),
    ElCollapseItem = withNoopInstall(CollapseItem),
    messageConfig = {},
    configProviderProps = buildProps({
      a11y: { type: Boolean, default: !0 },
      locale: { type: definePropType(Object) },
      size: useSizeProp,
      button: { type: definePropType(Object) },
      experimentalFeatures: { type: definePropType(Object) },
      keyboardNavigation: { type: Boolean, default: !0 },
      message: { type: definePropType(Object) },
      zIndex: Number,
      namespace: { type: String, default: "el" },
    });
  defineComponent({
    name: "ElConfigProvider",
    props: configProviderProps,
    setup(e, { slots: t }) {
      watch(
        () => e.message,
        (r) => {
          Object.assign(messageConfig, r ?? {});
        },
        { immediate: !0, deep: !0 }
      );
      const n = provideGlobalConfig(e);
      return () =>
        renderSlot(t, "default", { config: n == null ? void 0 : n.value });
    },
  });
  const overlayProps = buildProps({
      mask: { type: Boolean, default: !0 },
      customMaskEvent: { type: Boolean, default: !1 },
      overlayClass: { type: definePropType([String, Array, Object]) },
      zIndex: { type: definePropType([String, Number]) },
    }),
    overlayEmits = { click: (e) => e instanceof MouseEvent };
  var Overlay = defineComponent({
    name: "ElOverlay",
    props: overlayProps,
    emits: overlayEmits,
    setup(e, { slots: t, emit: n }) {
      const r = useNamespace("overlay"),
        i = (k) => {
          n("click", k);
        },
        {
          onClick: g,
          onMousedown: y,
          onMouseup: $,
        } = useSameTarget(e.customMaskEvent ? void 0 : i);
      return () =>
        e.mask
          ? createVNode(
              "div",
              {
                class: [r.b(), e.overlayClass],
                style: { zIndex: e.zIndex },
                onClick: g,
                onMousedown: y,
                onMouseup: $,
              },
              [renderSlot(t, "default")],
              PatchFlags.STYLE | PatchFlags.CLASS | PatchFlags.PROPS,
              ["onClick", "onMouseup", "onMousedown"]
            )
          : h$1(
              "div",
              {
                class: e.overlayClass,
                style: {
                  zIndex: e.zIndex,
                  position: "fixed",
                  top: "0px",
                  right: "0px",
                  bottom: "0px",
                  left: "0px",
                },
              },
              [renderSlot(t, "default")]
            );
    },
  });
  const ElOverlay = Overlay,
    dialogContentProps = buildProps({
      center: { type: Boolean, default: !1 },
      alignCenter: { type: Boolean, default: !1 },
      closeIcon: { type: iconPropType },
      customClass: { type: String, default: "" },
      draggable: { type: Boolean, default: !1 },
      fullscreen: { type: Boolean, default: !1 },
      showClose: { type: Boolean, default: !0 },
      title: { type: String, default: "" },
    }),
    dialogContentEmits = { close: () => !0 },
    _hoisted_1$7 = ["aria-label"],
    _hoisted_2$7 = ["id"],
    __default__$3 = defineComponent({ name: "ElDialogContent" }),
    _sfc_main$c = defineComponent({
      ...__default__$3,
      props: dialogContentProps,
      emits: dialogContentEmits,
      setup(e) {
        const t = e,
          { t: n } = useLocale(),
          { Close: r } = CloseComponents,
          {
            dialogRef: i,
            headerRef: g,
            bodyId: y,
            ns: $,
            style: k,
          } = inject(dialogInjectionKey),
          { focusTrapRef: V } = inject(FOCUS_TRAP_INJECTION_KEY),
          L = composeRefs(V, i),
          oe = computed(() => t.draggable);
        return (
          useDraggable(i, g, oe),
          (j, ae) => (
            openBlock(),
            createElementBlock(
              "div",
              {
                ref: unref(L),
                class: normalizeClass([
                  unref($).b(),
                  unref($).is("fullscreen", j.fullscreen),
                  unref($).is("draggable", unref(oe)),
                  unref($).is("align-center", j.alignCenter),
                  { [unref($).m("center")]: j.center },
                  j.customClass,
                ]),
                style: normalizeStyle(unref(k)),
                tabindex: "-1",
              },
              [
                createBaseVNode(
                  "header",
                  {
                    ref_key: "headerRef",
                    ref: g,
                    class: normalizeClass(unref($).e("header")),
                  },
                  [
                    renderSlot(j.$slots, "header", {}, () => [
                      createBaseVNode(
                        "span",
                        {
                          role: "heading",
                          class: normalizeClass(unref($).e("title")),
                        },
                        toDisplayString(j.title),
                        3
                      ),
                    ]),
                    j.showClose
                      ? (openBlock(),
                        createElementBlock(
                          "button",
                          {
                            key: 0,
                            "aria-label": unref(n)("el.dialog.close"),
                            class: normalizeClass(unref($).e("headerbtn")),
                            type: "button",
                            onClick: ae[0] || (ae[0] = (z) => j.$emit("close")),
                          },
                          [
                            createVNode(
                              unref(ElIcon),
                              { class: normalizeClass(unref($).e("close")) },
                              {
                                default: withCtx(() => [
                                  (openBlock(),
                                  createBlock(
                                    resolveDynamicComponent(
                                      j.closeIcon || unref(r)
                                    )
                                  )),
                                ]),
                                _: 1,
                              },
                              8,
                              ["class"]
                            ),
                          ],
                          10,
                          _hoisted_1$7
                        ))
                      : createCommentVNode("v-if", !0),
                  ],
                  2
                ),
                createBaseVNode(
                  "div",
                  { id: unref(y), class: normalizeClass(unref($).e("body")) },
                  [renderSlot(j.$slots, "default")],
                  10,
                  _hoisted_2$7
                ),
                j.$slots.footer
                  ? (openBlock(),
                    createElementBlock(
                      "footer",
                      { key: 0, class: normalizeClass(unref($).e("footer")) },
                      [renderSlot(j.$slots, "footer")],
                      2
                    ))
                  : createCommentVNode("v-if", !0),
              ],
              6
            )
          )
        );
      },
    });
  var ElDialogContent = _export_sfc$1(_sfc_main$c, [
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/dialog/src/dialog-content.vue",
    ],
  ]);
  const dialogProps = buildProps({
      ...dialogContentProps,
      appendToBody: { type: Boolean, default: !1 },
      beforeClose: { type: definePropType(Function) },
      destroyOnClose: { type: Boolean, default: !1 },
      closeOnClickModal: { type: Boolean, default: !0 },
      closeOnPressEscape: { type: Boolean, default: !0 },
      lockScroll: { type: Boolean, default: !0 },
      modal: { type: Boolean, default: !0 },
      openDelay: { type: Number, default: 0 },
      closeDelay: { type: Number, default: 0 },
      top: { type: String },
      modelValue: { type: Boolean, default: !1 },
      modalClass: String,
      width: { type: [String, Number] },
      zIndex: { type: Number },
      trapFocus: { type: Boolean, default: !1 },
    }),
    dialogEmits = {
      open: () => !0,
      opened: () => !0,
      close: () => !0,
      closed: () => !0,
      [UPDATE_MODEL_EVENT]: (e) => isBoolean$1(e),
      openAutoFocus: () => !0,
      closeAutoFocus: () => !0,
    },
    useDialog = (e, t) => {
      const r = getCurrentInstance().emit,
        { nextZIndex: i } = useZIndex();
      let g = "";
      const y = useId(),
        $ = useId(),
        k = ref(!1),
        V = ref(!1),
        L = ref(!1),
        oe = ref(e.zIndex || i());
      let j, ae;
      const z = useGlobalConfig("namespace", defaultNamespace),
        re = computed(() => {
          const Fe = {},
            xe = `--${z.value}-dialog`;
          return (
            e.fullscreen ||
              (e.top && (Fe[`${xe}-margin-top`] = e.top),
              e.width && (Fe[`${xe}-width`] = addUnit(e.width))),
            Fe
          );
        }),
        ie = computed(() => (e.alignCenter ? { display: "flex" } : {}));
      function le() {
        r("opened");
      }
      function de() {
        r("closed"),
          r(UPDATE_MODEL_EVENT, !1),
          e.destroyOnClose && (L.value = !1);
      }
      function ue() {
        r("close");
      }
      function pe() {
        ae == null || ae(),
          j == null || j(),
          e.openDelay && e.openDelay > 0
            ? ({ stop: j } = useTimeoutFn(() => $e(), e.openDelay))
            : $e();
      }
      function Ce() {
        j == null || j(),
          ae == null || ae(),
          e.closeDelay && e.closeDelay > 0
            ? ({ stop: ae } = useTimeoutFn(() => Ve(), e.closeDelay))
            : Ve();
      }
      function Oe() {
        function Fe(xe) {
          xe || ((V.value = !0), (k.value = !1));
        }
        e.beforeClose ? e.beforeClose(Fe) : Ce();
      }
      function he() {
        e.closeOnClickModal && Oe();
      }
      function $e() {
        isClient$1 && (k.value = !0);
      }
      function Ve() {
        k.value = !1;
      }
      function qe() {
        r("openAutoFocus");
      }
      function Cn() {
        r("closeAutoFocus");
      }
      function Pt(Fe) {
        var xe;
        ((xe = Fe.detail) == null ? void 0 : xe.focusReason) === "pointer" &&
          Fe.preventDefault();
      }
      e.lockScroll && useLockscreen(k);
      function kt() {
        e.closeOnPressEscape && Oe();
      }
      return (
        watch(
          () => e.modelValue,
          (Fe) => {
            Fe
              ? ((V.value = !1),
                pe(),
                (L.value = !0),
                (oe.value = e.zIndex ? oe.value++ : i()),
                nextTick(() => {
                  r("open"), t.value && (t.value.scrollTop = 0);
                }))
              : k.value && Ce();
          }
        ),
        watch(
          () => e.fullscreen,
          (Fe) => {
            t.value &&
              (Fe
                ? ((g = t.value.style.transform),
                  (t.value.style.transform = ""))
                : (t.value.style.transform = g));
          }
        ),
        onMounted(() => {
          e.modelValue && ((k.value = !0), (L.value = !0), pe());
        }),
        {
          afterEnter: le,
          afterLeave: de,
          beforeLeave: ue,
          handleClose: Oe,
          onModalClick: he,
          close: Ce,
          doClose: Ve,
          onOpenAutoFocus: qe,
          onCloseAutoFocus: Cn,
          onCloseRequested: kt,
          onFocusoutPrevented: Pt,
          titleId: y,
          bodyId: $,
          closed: V,
          style: re,
          overlayDialogStyle: ie,
          rendered: L,
          visible: k,
          zIndex: oe,
        }
      );
    },
    _hoisted_1$6 = ["aria-label", "aria-labelledby", "aria-describedby"],
    __default__$2 = defineComponent({ name: "ElDialog", inheritAttrs: !1 }),
    _sfc_main$b = defineComponent({
      ...__default__$2,
      props: dialogProps,
      emits: dialogEmits,
      setup(e, { expose: t }) {
        const n = e,
          r = useSlots();
        useDeprecated(
          {
            scope: "el-dialog",
            from: "the title slot",
            replacement: "the header slot",
            version: "3.0.0",
            ref: "https://element-plus.org/en-US/component/dialog.html#slots",
          },
          computed(() => !!r.title)
        ),
          useDeprecated(
            {
              scope: "el-dialog",
              from: "custom-class",
              replacement: "class",
              version: "2.3.0",
              ref: "https://element-plus.org/en-US/component/dialog.html#attributes",
              type: "Attribute",
            },
            computed(() => !!n.customClass)
          );
        const i = useNamespace("dialog"),
          g = ref(),
          y = ref(),
          $ = ref(),
          {
            visible: k,
            titleId: V,
            bodyId: L,
            style: oe,
            overlayDialogStyle: j,
            rendered: ae,
            zIndex: z,
            afterEnter: re,
            afterLeave: ie,
            beforeLeave: le,
            handleClose: de,
            onModalClick: ue,
            onOpenAutoFocus: pe,
            onCloseAutoFocus: Ce,
            onCloseRequested: Oe,
            onFocusoutPrevented: he,
          } = useDialog(n, g);
        provide(dialogInjectionKey, {
          dialogRef: g,
          headerRef: y,
          bodyId: L,
          ns: i,
          rendered: ae,
          style: oe,
        });
        const $e = useSameTarget(ue),
          Ve = computed(() => n.draggable && !n.fullscreen);
        return (
          t({ visible: k, dialogContentRef: $ }),
          (qe, Cn) => (
            openBlock(),
            createBlock(
              Teleport,
              { to: "body", disabled: !qe.appendToBody },
              [
                createVNode(
                  Transition,
                  {
                    name: "dialog-fade",
                    onAfterEnter: unref(re),
                    onAfterLeave: unref(ie),
                    onBeforeLeave: unref(le),
                    persisted: "",
                  },
                  {
                    default: withCtx(() => [
                      withDirectives(
                        createVNode(
                          unref(ElOverlay),
                          {
                            "custom-mask-event": "",
                            mask: qe.modal,
                            "overlay-class": qe.modalClass,
                            "z-index": unref(z),
                          },
                          {
                            default: withCtx(() => [
                              createBaseVNode(
                                "div",
                                {
                                  role: "dialog",
                                  "aria-modal": "true",
                                  "aria-label": qe.title || void 0,
                                  "aria-labelledby": qe.title
                                    ? void 0
                                    : unref(V),
                                  "aria-describedby": unref(L),
                                  class: normalizeClass(
                                    `${unref(i).namespace.value}-overlay-dialog`
                                  ),
                                  style: normalizeStyle(unref(j)),
                                  onClick:
                                    Cn[0] ||
                                    (Cn[0] = (...Pt) =>
                                      unref($e).onClick &&
                                      unref($e).onClick(...Pt)),
                                  onMousedown:
                                    Cn[1] ||
                                    (Cn[1] = (...Pt) =>
                                      unref($e).onMousedown &&
                                      unref($e).onMousedown(...Pt)),
                                  onMouseup:
                                    Cn[2] ||
                                    (Cn[2] = (...Pt) =>
                                      unref($e).onMouseup &&
                                      unref($e).onMouseup(...Pt)),
                                },
                                [
                                  createVNode(
                                    unref(ElFocusTrap),
                                    {
                                      loop: "",
                                      trapped: unref(k),
                                      "focus-start-el": "container",
                                      onFocusAfterTrapped: unref(pe),
                                      onFocusAfterReleased: unref(Ce),
                                      onFocusoutPrevented: unref(he),
                                      onReleaseRequested: unref(Oe),
                                    },
                                    {
                                      default: withCtx(() => [
                                        unref(ae)
                                          ? (openBlock(),
                                            createBlock(
                                              ElDialogContent,
                                              mergeProps(
                                                {
                                                  key: 0,
                                                  ref_key: "dialogContentRef",
                                                  ref: $,
                                                },
                                                qe.$attrs,
                                                {
                                                  "custom-class":
                                                    qe.customClass,
                                                  center: qe.center,
                                                  "align-center":
                                                    qe.alignCenter,
                                                  "close-icon": qe.closeIcon,
                                                  draggable: unref(Ve),
                                                  fullscreen: qe.fullscreen,
                                                  "show-close": qe.showClose,
                                                  title: qe.title,
                                                  onClose: unref(de),
                                                }
                                              ),
                                              createSlots(
                                                {
                                                  header: withCtx(() => [
                                                    qe.$slots.title
                                                      ? renderSlot(
                                                          qe.$slots,
                                                          "title",
                                                          { key: 1 }
                                                        )
                                                      : renderSlot(
                                                          qe.$slots,
                                                          "header",
                                                          {
                                                            key: 0,
                                                            close: unref(de),
                                                            titleId: unref(V),
                                                            titleClass:
                                                              unref(i).e(
                                                                "title"
                                                              ),
                                                          }
                                                        ),
                                                  ]),
                                                  default: withCtx(() => [
                                                    renderSlot(
                                                      qe.$slots,
                                                      "default"
                                                    ),
                                                  ]),
                                                  _: 2,
                                                },
                                                [
                                                  qe.$slots.footer
                                                    ? {
                                                        name: "footer",
                                                        fn: withCtx(() => [
                                                          renderSlot(
                                                            qe.$slots,
                                                            "footer"
                                                          ),
                                                        ]),
                                                      }
                                                    : void 0,
                                                ]
                                              ),
                                              1040,
                                              [
                                                "custom-class",
                                                "center",
                                                "align-center",
                                                "close-icon",
                                                "draggable",
                                                "fullscreen",
                                                "show-close",
                                                "title",
                                                "onClose",
                                              ]
                                            ))
                                          : createCommentVNode("v-if", !0),
                                      ]),
                                      _: 3,
                                    },
                                    8,
                                    [
                                      "trapped",
                                      "onFocusAfterTrapped",
                                      "onFocusAfterReleased",
                                      "onFocusoutPrevented",
                                      "onReleaseRequested",
                                    ]
                                  ),
                                ],
                                46,
                                _hoisted_1$6
                              ),
                            ]),
                            _: 3,
                          },
                          8,
                          ["mask", "overlay-class", "z-index"]
                        ),
                        [[vShow, unref(k)]]
                      ),
                    ]),
                    _: 3,
                  },
                  8,
                  ["onAfterEnter", "onAfterLeave", "onBeforeLeave"]
                ),
              ],
              8,
              ["disabled"]
            )
          )
        );
      },
    });
  var Dialog = _export_sfc$1(_sfc_main$b, [
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/dialog/src/dialog.vue",
    ],
  ]);
  const ElDialog = withInstall(Dialog),
    selectGroupKey = "ElSelectGroup",
    selectKey = "ElSelect";
  function useOption(e, t) {
    const n = inject(selectKey),
      r = inject(selectGroupKey, { disabled: !1 }),
      i = computed(
        () =>
          Object.prototype.toString.call(e.value).toLowerCase() ===
          "[object object]"
      ),
      g = computed(() =>
        n.props.multiple
          ? oe(n.props.modelValue, e.value)
          : j(e.value, n.props.modelValue)
      ),
      y = computed(() => {
        if (n.props.multiple) {
          const re = n.props.modelValue || [];
          return (
            !g.value &&
            re.length >= n.props.multipleLimit &&
            n.props.multipleLimit > 0
          );
        } else return !1;
      }),
      $ = computed(() => e.label || (i.value ? "" : e.value)),
      k = computed(() => e.value || e.label || ""),
      V = computed(() => e.disabled || t.groupDisabled || y.value),
      L = getCurrentInstance(),
      oe = (re = [], ie) => {
        if (i.value) {
          const le = n.props.valueKey;
          return re && re.some((de) => toRaw(get(de, le)) === get(ie, le));
        } else return re && re.includes(ie);
      },
      j = (re, ie) => {
        if (i.value) {
          const { valueKey: le } = n.props;
          return get(re, le) === get(ie, le);
        } else return re === ie;
      },
      ae = () => {
        !e.disabled &&
          !r.disabled &&
          (n.hoverIndex = n.optionsArray.indexOf(L.proxy));
      };
    watch(
      () => $.value,
      () => {
        !e.created && !n.props.remote && n.setSelected();
      }
    ),
      watch(
        () => e.value,
        (re, ie) => {
          const { remote: le, valueKey: de } = n.props;
          if (
            (Object.is(re, ie) ||
              (n.onOptionDestroy(ie, L.proxy), n.onOptionCreate(L.proxy)),
            !e.created && !le)
          ) {
            if (
              de &&
              typeof re == "object" &&
              typeof ie == "object" &&
              re[de] === ie[de]
            )
              return;
            n.setSelected();
          }
        }
      ),
      watch(
        () => r.disabled,
        () => {
          t.groupDisabled = r.disabled;
        },
        { immediate: !0 }
      );
    const { queryChange: z } = toRaw(n);
    return (
      watch(z, (re) => {
        const { query: ie } = unref(re),
          le = new RegExp(escapeStringRegexp(ie), "i");
        (t.visible = le.test($.value) || e.created),
          t.visible || n.filteredOptionsCount--;
      }),
      {
        select: n,
        currentLabel: $,
        currentValue: k,
        itemSelected: g,
        isDisabled: V,
        hoverItem: ae,
      }
    );
  }
  const _sfc_main$a = defineComponent({
    name: "ElOption",
    componentName: "ElOption",
    props: {
      value: { required: !0, type: [String, Number, Boolean, Object] },
      label: [String, Number],
      created: Boolean,
      disabled: { type: Boolean, default: !1 },
    },
    setup(e) {
      const t = useNamespace("select"),
        n = reactive({
          index: -1,
          groupDisabled: !1,
          visible: !0,
          hitState: !1,
          hover: !1,
        }),
        {
          currentLabel: r,
          itemSelected: i,
          isDisabled: g,
          select: y,
          hoverItem: $,
        } = useOption(e, n),
        { visible: k, hover: V } = toRefs(n),
        L = getCurrentInstance().proxy;
      y.onOptionCreate(L),
        onBeforeUnmount(() => {
          const j = L.value,
            { selected: ae } = y,
            re = (y.props.multiple ? ae : [ae]).some(
              (ie) => ie.value === L.value
            );
          nextTick(() => {
            y.cachedOptions.get(j) === L && !re && y.cachedOptions.delete(j);
          }),
            y.onOptionDestroy(j, L);
        });
      function oe() {
        e.disabled !== !0 &&
          n.groupDisabled !== !0 &&
          y.handleOptionSelect(L, !0);
      }
      return {
        ns: t,
        currentLabel: r,
        itemSelected: i,
        isDisabled: g,
        select: y,
        hoverItem: $,
        visible: k,
        hover: V,
        selectOptionClick: oe,
        states: n,
      };
    },
  });
  function _sfc_render$6(e, t, n, r, i, g) {
    return withDirectives(
      (openBlock(),
      createElementBlock(
        "li",
        {
          class: normalizeClass([
            e.ns.be("dropdown", "item"),
            e.ns.is("disabled", e.isDisabled),
            { selected: e.itemSelected, hover: e.hover },
          ]),
          onMouseenter:
            t[0] || (t[0] = (...y) => e.hoverItem && e.hoverItem(...y)),
          onClick:
            t[1] ||
            (t[1] = withModifiers(
              (...y) => e.selectOptionClick && e.selectOptionClick(...y),
              ["stop"]
            )),
        },
        [
          renderSlot(e.$slots, "default", {}, () => [
            createBaseVNode("span", null, toDisplayString(e.currentLabel), 1),
          ]),
        ],
        34
      )),
      [[vShow, e.visible]]
    );
  }
  var Option = _export_sfc$1(_sfc_main$a, [
    ["render", _sfc_render$6],
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/select/src/option.vue",
    ],
  ]);
  const _sfc_main$9 = defineComponent({
    name: "ElSelectDropdown",
    componentName: "ElSelectDropdown",
    setup() {
      const e = inject(selectKey),
        t = useNamespace("select"),
        n = computed(() => e.props.popperClass),
        r = computed(() => e.props.multiple),
        i = computed(() => e.props.fitInputWidth),
        g = ref("");
      function y() {
        var $;
        g.value = `${($ = e.selectWrapper) == null ? void 0 : $.offsetWidth}px`;
      }
      return (
        onMounted(() => {
          y(), useResizeObserver(e.selectWrapper, y);
        }),
        {
          ns: t,
          minWidth: g,
          popperClass: n,
          isMultiple: r,
          isFitInputWidth: i,
        }
      );
    },
  });
  function _sfc_render$5(e, t, n, r, i, g) {
    return (
      openBlock(),
      createElementBlock(
        "div",
        {
          class: normalizeClass([
            e.ns.b("dropdown"),
            e.ns.is("multiple", e.isMultiple),
            e.popperClass,
          ]),
          style: normalizeStyle({
            [e.isFitInputWidth ? "width" : "minWidth"]: e.minWidth,
          }),
        },
        [renderSlot(e.$slots, "default")],
        6
      )
    );
  }
  var ElSelectMenu = _export_sfc$1(_sfc_main$9, [
    ["render", _sfc_render$5],
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/select/src/select-dropdown.vue",
    ],
  ]);
  function useSelectStates(e) {
    const { t } = useLocale();
    return reactive({
      options: new Map(),
      cachedOptions: new Map(),
      createdLabel: null,
      createdSelected: !1,
      selected: e.multiple ? [] : {},
      inputLength: 20,
      inputWidth: 0,
      optionsCount: 0,
      filteredOptionsCount: 0,
      visible: !1,
      softFocus: !1,
      selectedLabel: "",
      hoverIndex: -1,
      query: "",
      previousQuery: null,
      inputHovering: !1,
      cachedPlaceHolder: "",
      currentPlaceholder: t("el.select.placeholder"),
      menuVisibleOnFocus: !1,
      isOnComposition: !1,
      isSilentBlur: !1,
      prefixWidth: 11,
      tagInMultiLine: !1,
      mouseEnter: !1,
    });
  }
  const useSelect = (e, t, n) => {
      const { t: r } = useLocale(),
        i = useNamespace("select");
      useDeprecated(
        {
          from: "suffixTransition",
          replacement: "override style scheme",
          version: "2.3.0",
          scope: "props",
          ref: "https://element-plus.org/en-US/component/select.html#select-attributes",
        },
        computed(() => e.suffixTransition === !1)
      );
      const g = ref(null),
        y = ref(null),
        $ = ref(null),
        k = ref(null),
        V = ref(null),
        L = ref(null),
        oe = ref(-1),
        j = shallowRef({ query: "" }),
        ae = shallowRef(""),
        { form: z, formItem: re } = useFormItem(),
        ie = computed(() => !e.filterable || e.multiple || !t.visible),
        le = computed(() => e.disabled || (z == null ? void 0 : z.disabled)),
        de = computed(() => {
          const Ie = e.multiple
            ? Array.isArray(e.modelValue) && e.modelValue.length > 0
            : e.modelValue !== void 0 &&
              e.modelValue !== null &&
              e.modelValue !== "";
          return e.clearable && !le.value && t.inputHovering && Ie;
        }),
        ue = computed(() =>
          e.remote && e.filterable && !e.remoteShowSuffix ? "" : e.suffixIcon
        ),
        pe = computed(() =>
          i.is("reverse", ue.value && t.visible && e.suffixTransition)
        ),
        Ce = computed(() => (e.remote ? 300 : 0)),
        Oe = computed(() =>
          e.loading
            ? e.loadingText || r("el.select.loading")
            : e.remote && t.query === "" && t.options.size === 0
            ? !1
            : e.filterable &&
              t.query &&
              t.options.size > 0 &&
              t.filteredOptionsCount === 0
            ? e.noMatchText || r("el.select.noMatch")
            : t.options.size === 0
            ? e.noDataText || r("el.select.noData")
            : null
        ),
        he = computed(() => Array.from(t.options.values())),
        $e = computed(() => Array.from(t.cachedOptions.values())),
        Ve = computed(() => {
          const Ie = he.value
            .filter((jt) => !jt.created)
            .some((jt) => jt.currentLabel === t.query);
          return e.filterable && e.allowCreate && t.query !== "" && !Ie;
        }),
        qe = useSize(),
        Cn = computed(() =>
          ["small"].includes(qe.value) ? "small" : "default"
        ),
        Pt = computed({
          get() {
            return t.visible && Oe.value !== !1;
          },
          set(Ie) {
            t.visible = Ie;
          },
        });
      watch(
        [() => le.value, () => qe.value, () => (z == null ? void 0 : z.size)],
        () => {
          nextTick(() => {
            kt();
          });
        }
      ),
        watch(
          () => e.placeholder,
          (Ie) => {
            t.cachedPlaceHolder = t.currentPlaceholder = Ie;
          }
        ),
        watch(
          () => e.modelValue,
          (Ie, jt) => {
            e.multiple &&
              (kt(),
              (Ie && Ie.length > 0) || (y.value && t.query !== "")
                ? (t.currentPlaceholder = "")
                : (t.currentPlaceholder = t.cachedPlaceHolder),
              e.filterable &&
                !e.reserveKeyword &&
                ((t.query = ""), Fe(t.query))),
              At(),
              e.filterable && !e.multiple && (t.inputLength = 20),
              !isEqual(Ie, jt) &&
                e.validateEvent &&
                (re == null || re.validate("change").catch((Bn) => void 0));
          },
          { flush: "post", deep: !0 }
        ),
        watch(
          () => t.visible,
          (Ie) => {
            var jt, Bn, Pn;
            Ie
              ? ((Bn = (jt = $.value) == null ? void 0 : jt.updatePopper) ==
                  null || Bn.call(jt),
                e.filterable &&
                  ((t.filteredOptionsCount = t.optionsCount),
                  (t.query = e.remote ? "" : t.selectedLabel),
                  e.multiple
                    ? (Pn = y.value) == null || Pn.focus()
                    : t.selectedLabel &&
                      ((t.currentPlaceholder = `${t.selectedLabel}`),
                      (t.selectedLabel = "")),
                  Fe(t.query),
                  !e.multiple &&
                    !e.remote &&
                    ((j.value.query = ""), triggerRef(j), triggerRef(ae))))
              : (e.filterable &&
                  (isFunction$3(e.filterMethod) && e.filterMethod(""),
                  isFunction$3(e.remoteMethod) && e.remoteMethod("")),
                y.value && y.value.blur(),
                (t.query = ""),
                (t.previousQuery = null),
                (t.selectedLabel = ""),
                (t.inputLength = 20),
                (t.menuVisibleOnFocus = !1),
                ze(),
                nextTick(() => {
                  y.value &&
                    y.value.value === "" &&
                    t.selected.length === 0 &&
                    (t.currentPlaceholder = t.cachedPlaceHolder);
                }),
                e.multiple ||
                  (t.selected &&
                    (e.filterable &&
                    e.allowCreate &&
                    t.createdSelected &&
                    t.createdLabel
                      ? (t.selectedLabel = t.createdLabel)
                      : (t.selectedLabel = t.selected.currentLabel),
                    e.filterable && (t.query = t.selectedLabel)),
                  e.filterable &&
                    (t.currentPlaceholder = t.cachedPlaceHolder))),
              n.emit("visible-change", Ie);
          }
        ),
        watch(
          () => t.options.entries(),
          () => {
            var Ie, jt, Bn;
            if (!isClient$1) return;
            (jt = (Ie = $.value) == null ? void 0 : Ie.updatePopper) == null ||
              jt.call(Ie),
              e.multiple && kt();
            const Pn =
              ((Bn = V.value) == null
                ? void 0
                : Bn.querySelectorAll("input")) || [];
            Array.from(Pn).includes(document.activeElement) || At(),
              e.defaultFirstOption &&
                (e.filterable || e.remote) &&
                t.filteredOptionsCount &&
                Lt();
          },
          { flush: "post" }
        ),
        watch(
          () => t.hoverIndex,
          (Ie) => {
            isNumber$1(Ie) && Ie > -1
              ? (oe.value = he.value[Ie] || {})
              : (oe.value = {}),
              he.value.forEach((jt) => {
                jt.hover = oe.value === jt;
              });
          }
        );
      const kt = () => {
          (e.collapseTags && !e.filterable) ||
            nextTick(() => {
              var Ie, jt;
              if (!g.value) return;
              const Bn = g.value.$el.querySelector("input"),
                Pn = k.value,
                Wn = getComponentSize(
                  qe.value || (z == null ? void 0 : z.size)
                );
              (Bn.style.height = `${
                (t.selected.length === 0
                  ? Wn
                  : Math.max(
                      Pn ? Pn.clientHeight + (Pn.clientHeight > Wn ? 6 : 0) : 0,
                      Wn
                    )) - 2
              }px`),
                (t.tagInMultiLine = Number.parseFloat(Bn.style.height) >= Wn),
                t.visible &&
                  Oe.value !== !1 &&
                  ((jt = (Ie = $.value) == null ? void 0 : Ie.updatePopper) ==
                    null ||
                    jt.call(Ie));
            });
        },
        Fe = async (Ie) => {
          if (!(t.previousQuery === Ie || t.isOnComposition)) {
            if (
              t.previousQuery === null &&
              (isFunction$3(e.filterMethod) || isFunction$3(e.remoteMethod))
            ) {
              t.previousQuery = Ie;
              return;
            }
            (t.previousQuery = Ie),
              nextTick(() => {
                var jt, Bn;
                t.visible &&
                  ((Bn = (jt = $.value) == null ? void 0 : jt.updatePopper) ==
                    null ||
                    Bn.call(jt));
              }),
              (t.hoverIndex = -1),
              e.multiple &&
                e.filterable &&
                nextTick(() => {
                  const jt = y.value.value.length * 15 + 20;
                  (t.inputLength = e.collapseTags ? Math.min(50, jt) : jt),
                    xe(),
                    kt();
                }),
              e.remote && isFunction$3(e.remoteMethod)
                ? ((t.hoverIndex = -1), e.remoteMethod(Ie))
                : isFunction$3(e.filterMethod)
                ? (e.filterMethod(Ie), triggerRef(ae))
                : ((t.filteredOptionsCount = t.optionsCount),
                  (j.value.query = Ie),
                  triggerRef(j),
                  triggerRef(ae)),
              e.defaultFirstOption &&
                (e.filterable || e.remote) &&
                t.filteredOptionsCount &&
                (await nextTick(), Lt());
          }
        },
        xe = () => {
          t.currentPlaceholder !== "" &&
            (t.currentPlaceholder = y.value.value ? "" : t.cachedPlaceHolder);
        },
        Lt = () => {
          const Ie = he.value.filter(
              (Pn) => Pn.visible && !Pn.disabled && !Pn.states.groupDisabled
            ),
            jt = Ie.find((Pn) => Pn.created),
            Bn = Ie[0];
          t.hoverIndex = qn(he.value, jt || Bn);
        },
        At = () => {
          var Ie;
          if (e.multiple) t.selectedLabel = "";
          else {
            const Bn = Ue(e.modelValue);
            (Ie = Bn.props) != null && Ie.created
              ? ((t.createdLabel = Bn.props.value), (t.createdSelected = !0))
              : (t.createdSelected = !1),
              (t.selectedLabel = Bn.currentLabel),
              (t.selected = Bn),
              e.filterable && (t.query = t.selectedLabel);
            return;
          }
          const jt = [];
          Array.isArray(e.modelValue) &&
            e.modelValue.forEach((Bn) => {
              jt.push(Ue(Bn));
            }),
            (t.selected = jt),
            nextTick(() => {
              kt();
            });
        },
        Ue = (Ie) => {
          let jt;
          const Bn = toRawType(Ie).toLowerCase() === "object",
            Pn = toRawType(Ie).toLowerCase() === "null",
            Wn = toRawType(Ie).toLowerCase() === "undefined";
          for (let Qn = t.cachedOptions.size - 1; Qn >= 0; Qn--) {
            const Jn = $e.value[Qn];
            if (
              Bn
                ? get(Jn.value, e.valueKey) === get(Ie, e.valueKey)
                : Jn.value === Ie
            ) {
              jt = {
                value: Ie,
                currentLabel: Jn.currentLabel,
                isDisabled: Jn.isDisabled,
              };
              break;
            }
          }
          if (jt) return jt;
          const Yn = Bn ? Ie.label : !Pn && !Wn ? Ie : "",
            Zn = { value: Ie, currentLabel: Yn };
          return e.multiple && (Zn.hitState = !1), Zn;
        },
        ze = () => {
          setTimeout(() => {
            const Ie = e.valueKey;
            e.multiple
              ? t.selected.length > 0
                ? (t.hoverIndex = Math.min.apply(
                    null,
                    t.selected.map((jt) =>
                      he.value.findIndex((Bn) => get(Bn, Ie) === get(jt, Ie))
                    )
                  ))
                : (t.hoverIndex = -1)
              : (t.hoverIndex = he.value.findIndex(
                  (jt) => Kn(jt) === Kn(t.selected)
                ));
          }, 300);
        },
        Tn = () => {
          var Ie, jt;
          Nn(),
            (jt = (Ie = $.value) == null ? void 0 : Ie.updatePopper) == null ||
              jt.call(Ie),
            e.multiple && !e.filterable && kt();
        },
        Nn = () => {
          var Ie;
          t.inputWidth =
            (Ie = g.value) == null
              ? void 0
              : Ie.$el.getBoundingClientRect().width;
        },
        xn = () => {
          e.filterable &&
            t.query !== t.selectedLabel &&
            ((t.query = t.selectedLabel), Fe(t.query));
        },
        Mn = debounce(() => {
          xn();
        }, Ce.value),
        zn = debounce((Ie) => {
          Fe(Ie.target.value);
        }, Ce.value),
        Rn = (Ie) => {
          isEqual(e.modelValue, Ie) || n.emit(CHANGE_EVENT, Ie);
        },
        Ln = (Ie) => {
          if (Ie.target.value.length <= 0 && !hn()) {
            const jt = e.modelValue.slice();
            jt.pop(), n.emit(UPDATE_MODEL_EVENT, jt), Rn(jt);
          }
          Ie.target.value.length === 1 &&
            e.modelValue.length === 0 &&
            (t.currentPlaceholder = t.cachedPlaceHolder);
        },
        jn = (Ie, jt) => {
          const Bn = t.selected.indexOf(jt);
          if (Bn > -1 && !le.value) {
            const Pn = e.modelValue.slice();
            Pn.splice(Bn, 1),
              n.emit(UPDATE_MODEL_EVENT, Pn),
              Rn(Pn),
              n.emit("remove-tag", jt.value);
          }
          Ie.stopPropagation();
        },
        Fn = (Ie) => {
          Ie.stopPropagation();
          const jt = e.multiple ? [] : "";
          if (!isString$3(jt))
            for (const Bn of t.selected) Bn.isDisabled && jt.push(Bn.value);
          n.emit(UPDATE_MODEL_EVENT, jt),
            Rn(jt),
            (t.hoverIndex = -1),
            (t.visible = !1),
            n.emit("clear");
        },
        Hn = (Ie, jt) => {
          var Bn;
          if (e.multiple) {
            const Pn = (e.modelValue || []).slice(),
              Wn = qn(Pn, Ie.value);
            Wn > -1
              ? Pn.splice(Wn, 1)
              : (e.multipleLimit <= 0 || Pn.length < e.multipleLimit) &&
                Pn.push(Ie.value),
              n.emit(UPDATE_MODEL_EVENT, Pn),
              Rn(Pn),
              Ie.created && ((t.query = ""), Fe(""), (t.inputLength = 20)),
              e.filterable && ((Bn = y.value) == null || Bn.focus());
          } else
            n.emit(UPDATE_MODEL_EVENT, Ie.value),
              Rn(Ie.value),
              (t.visible = !1);
          (t.isSilentBlur = jt),
            Gn(),
            !t.visible &&
              nextTick(() => {
                _e(Ie);
              });
        },
        qn = (Ie = [], jt) => {
          if (!isObject$3(jt)) return Ie.indexOf(jt);
          const Bn = e.valueKey;
          let Pn = -1;
          return (
            Ie.some((Wn, Yn) =>
              toRaw(get(Wn, Bn)) === get(jt, Bn) ? ((Pn = Yn), !0) : !1
            ),
            Pn
          );
        },
        Gn = () => {
          t.softFocus = !0;
          const Ie = y.value || g.value;
          Ie && (Ie == null || Ie.focus());
        },
        _e = (Ie) => {
          var jt, Bn, Pn, Wn, Yn;
          const Zn = Array.isArray(Ie) ? Ie[0] : Ie;
          let Qn = null;
          if (Zn != null && Zn.value) {
            const Jn = he.value.filter((eo) => eo.value === Zn.value);
            Jn.length > 0 && (Qn = Jn[0].$el);
          }
          if ($.value && Qn) {
            const Jn =
              (Wn =
                (Pn =
                  (Bn = (jt = $.value) == null ? void 0 : jt.popperRef) == null
                    ? void 0
                    : Bn.contentRef) == null
                  ? void 0
                  : Pn.querySelector) == null
                ? void 0
                : Wn.call(Pn, `.${i.be("dropdown", "wrap")}`);
            Jn && scrollIntoView(Jn, Qn);
          }
          (Yn = L.value) == null || Yn.handleScroll();
        },
        Ne = (Ie) => {
          t.optionsCount++,
            t.filteredOptionsCount++,
            t.options.set(Ie.value, Ie),
            t.cachedOptions.set(Ie.value, Ie);
        },
        Dt = (Ie, jt) => {
          t.options.get(Ie) === jt &&
            (t.optionsCount--, t.filteredOptionsCount--, t.options.delete(Ie));
        },
        vn = (Ie) => {
          Ie.code !== EVENT_CODE.backspace && hn(!1),
            (t.inputLength = y.value.value.length * 15 + 20),
            kt();
        },
        hn = (Ie) => {
          if (!Array.isArray(t.selected)) return;
          const jt = t.selected[t.selected.length - 1];
          if (jt)
            return Ie === !0 || Ie === !1
              ? ((jt.hitState = Ie), Ie)
              : ((jt.hitState = !jt.hitState), jt.hitState);
        },
        Sn = (Ie) => {
          const jt = Ie.target.value;
          if (Ie.type === "compositionend")
            (t.isOnComposition = !1), nextTick(() => Fe(jt));
          else {
            const Bn = jt[jt.length - 1] || "";
            t.isOnComposition = !isKorean(Bn);
          }
        },
        On = () => {
          nextTick(() => _e(t.selected));
        },
        _n = (Ie) => {
          t.softFocus
            ? (t.softFocus = !1)
            : ((e.automaticDropdown || e.filterable) &&
                (e.filterable && !t.visible && (t.menuVisibleOnFocus = !0),
                (t.visible = !0)),
              n.emit("focus", Ie));
        },
        wn = () => {
          var Ie;
          (t.visible = !1), (Ie = g.value) == null || Ie.blur();
        },
        bn = (Ie) => {
          nextTick(() => {
            t.isSilentBlur ? (t.isSilentBlur = !1) : n.emit("blur", Ie);
          }),
            (t.softFocus = !1);
        },
        Et = (Ie) => {
          Fn(Ie);
        },
        En = () => {
          t.visible = !1;
        },
        kn = (Ie) => {
          t.visible &&
            (Ie.preventDefault(), Ie.stopPropagation(), (t.visible = !1));
        },
        In = (Ie) => {
          var jt;
          (Ie && !t.mouseEnter) ||
            le.value ||
            (t.menuVisibleOnFocus
              ? (t.menuVisibleOnFocus = !1)
              : (!$.value || !$.value.isFocusInsideContent()) &&
                (t.visible = !t.visible),
            t.visible && ((jt = y.value || g.value) == null || jt.focus()));
        },
        Dn = () => {
          t.visible
            ? he.value[t.hoverIndex] && Hn(he.value[t.hoverIndex], void 0)
            : In();
        },
        Kn = (Ie) =>
          isObject$3(Ie.value) ? get(Ie.value, e.valueKey) : Ie.value,
        Un = computed(() =>
          he.value.filter((Ie) => Ie.visible).every((Ie) => Ie.disabled)
        ),
        $n = (Ie) => {
          if (!t.visible) {
            t.visible = !0;
            return;
          }
          if (
            !(t.options.size === 0 || t.filteredOptionsCount === 0) &&
            !t.isOnComposition &&
            !Un.value
          ) {
            Ie === "next"
              ? (t.hoverIndex++,
                t.hoverIndex === t.options.size && (t.hoverIndex = 0))
              : Ie === "prev" &&
                (t.hoverIndex--,
                t.hoverIndex < 0 && (t.hoverIndex = t.options.size - 1));
            const jt = he.value[t.hoverIndex];
            (jt.disabled === !0 ||
              jt.states.groupDisabled === !0 ||
              !jt.visible) &&
              $n(Ie),
              nextTick(() => _e(oe.value));
          }
        };
      return {
        optionsArray: he,
        selectSize: qe,
        handleResize: Tn,
        debouncedOnInputChange: Mn,
        debouncedQueryChange: zn,
        deletePrevTag: Ln,
        deleteTag: jn,
        deleteSelected: Fn,
        handleOptionSelect: Hn,
        scrollToOption: _e,
        readonly: ie,
        resetInputHeight: kt,
        showClose: de,
        iconComponent: ue,
        iconReverse: pe,
        showNewOption: Ve,
        collapseTagSize: Cn,
        setSelected: At,
        managePlaceholder: xe,
        selectDisabled: le,
        emptyText: Oe,
        toggleLastOptionHitState: hn,
        resetInputState: vn,
        handleComposition: Sn,
        onOptionCreate: Ne,
        onOptionDestroy: Dt,
        handleMenuEnter: On,
        handleFocus: _n,
        blur: wn,
        handleBlur: bn,
        handleClearClick: Et,
        handleClose: En,
        handleKeydownEscape: kn,
        toggleMenu: In,
        selectOption: Dn,
        getValueKey: Kn,
        navigateOptions: $n,
        dropMenuVisible: Pt,
        queryChange: j,
        groupQueryChange: ae,
        reference: g,
        input: y,
        tooltipRef: $,
        tags: k,
        selectWrapper: V,
        scrollbar: L,
        handleMouseEnter: () => {
          t.mouseEnter = !0;
        },
        handleMouseLeave: () => {
          t.mouseEnter = !1;
        },
      };
    },
    COMPONENT_NAME$1 = "ElSelect",
    _sfc_main$8 = defineComponent({
      name: COMPONENT_NAME$1,
      componentName: COMPONENT_NAME$1,
      components: {
        ElInput,
        ElSelectMenu,
        ElOption: Option,
        ElTag,
        ElScrollbar,
        ElTooltip,
        ElIcon,
      },
      directives: { ClickOutside },
      props: {
        name: String,
        id: String,
        modelValue: {
          type: [Array, String, Number, Boolean, Object],
          default: void 0,
        },
        autocomplete: { type: String, default: "off" },
        automaticDropdown: Boolean,
        size: { type: String, validator: isValidComponentSize },
        effect: { type: String, default: "light" },
        disabled: Boolean,
        clearable: Boolean,
        filterable: Boolean,
        allowCreate: Boolean,
        loading: Boolean,
        popperClass: { type: String, default: "" },
        remote: Boolean,
        loadingText: String,
        noMatchText: String,
        noDataText: String,
        remoteMethod: Function,
        filterMethod: Function,
        multiple: Boolean,
        multipleLimit: { type: Number, default: 0 },
        placeholder: { type: String },
        defaultFirstOption: Boolean,
        reserveKeyword: { type: Boolean, default: !0 },
        valueKey: { type: String, default: "value" },
        collapseTags: Boolean,
        collapseTagsTooltip: { type: Boolean, default: !1 },
        teleported: useTooltipContentProps.teleported,
        persistent: { type: Boolean, default: !0 },
        clearIcon: { type: iconPropType, default: circle_close_default },
        fitInputWidth: { type: Boolean, default: !1 },
        suffixIcon: { type: iconPropType, default: arrow_down_default },
        tagType: { ...tagProps.type, default: "info" },
        validateEvent: { type: Boolean, default: !0 },
        remoteShowSuffix: { type: Boolean, default: !1 },
        suffixTransition: { type: Boolean, default: !0 },
        placement: { type: String, values: Ee, default: "bottom-start" },
      },
      emits: [
        UPDATE_MODEL_EVENT,
        CHANGE_EVENT,
        "remove-tag",
        "clear",
        "visible-change",
        "focus",
        "blur",
      ],
      setup(e, t) {
        const n = useNamespace("select"),
          r = useNamespace("input"),
          { t: i } = useLocale(),
          g = useSelectStates(e),
          {
            optionsArray: y,
            selectSize: $,
            readonly: k,
            handleResize: V,
            collapseTagSize: L,
            debouncedOnInputChange: oe,
            debouncedQueryChange: j,
            deletePrevTag: ae,
            deleteTag: z,
            deleteSelected: re,
            handleOptionSelect: ie,
            scrollToOption: le,
            setSelected: de,
            resetInputHeight: ue,
            managePlaceholder: pe,
            showClose: Ce,
            selectDisabled: Oe,
            iconComponent: he,
            iconReverse: $e,
            showNewOption: Ve,
            emptyText: qe,
            toggleLastOptionHitState: Cn,
            resetInputState: Pt,
            handleComposition: kt,
            onOptionCreate: Fe,
            onOptionDestroy: xe,
            handleMenuEnter: Lt,
            handleFocus: At,
            blur: Ue,
            handleBlur: ze,
            handleClearClick: Tn,
            handleClose: Nn,
            handleKeydownEscape: xn,
            toggleMenu: Mn,
            selectOption: zn,
            getValueKey: Rn,
            navigateOptions: Ln,
            dropMenuVisible: jn,
            reference: Fn,
            input: Hn,
            tooltipRef: qn,
            tags: Gn,
            selectWrapper: _e,
            scrollbar: Ne,
            queryChange: Dt,
            groupQueryChange: vn,
            handleMouseEnter: hn,
            handleMouseLeave: Sn,
          } = useSelect(e, g, t),
          { focus: On } = useFocus(Fn),
          {
            inputWidth: _n,
            selected: wn,
            inputLength: bn,
            filteredOptionsCount: Et,
            visible: En,
            softFocus: kn,
            selectedLabel: In,
            hoverIndex: Dn,
            query: Kn,
            inputHovering: Un,
            currentPlaceholder: $n,
            menuVisibleOnFocus: An,
            isOnComposition: Vn,
            isSilentBlur: Ie,
            options: jt,
            cachedOptions: Bn,
            optionsCount: Pn,
            prefixWidth: Wn,
            tagInMultiLine: Yn,
          } = toRefs(g),
          Zn = computed(() => {
            const Xn = [n.b()],
              to = unref($);
            return (
              to && Xn.push(n.m(to)), e.disabled && Xn.push(n.m("disabled")), Xn
            );
          }),
          Qn = computed(() => ({
            maxWidth: `${unref(_n) - 32}px`,
            width: "100%",
          })),
          Jn = computed(() => ({
            maxWidth: `${unref(_n) > 123 ? unref(_n) - 123 : unref(_n) - 75}px`,
          }));
        provide(
          selectKey,
          reactive({
            props: e,
            options: jt,
            optionsArray: y,
            cachedOptions: Bn,
            optionsCount: Pn,
            filteredOptionsCount: Et,
            hoverIndex: Dn,
            handleOptionSelect: ie,
            onOptionCreate: Fe,
            onOptionDestroy: xe,
            selectWrapper: _e,
            selected: wn,
            setSelected: de,
            queryChange: Dt,
            groupQueryChange: vn,
          })
        ),
          onMounted(() => {
            (g.cachedPlaceHolder = $n.value =
              e.placeholder || i("el.select.placeholder")),
              e.multiple &&
                Array.isArray(e.modelValue) &&
                e.modelValue.length > 0 &&
                ($n.value = ""),
              useResizeObserver(_e, V),
              e.remote && e.multiple && ue(),
              nextTick(() => {
                const Xn = Fn.value && Fn.value.$el;
                if (
                  Xn &&
                  ((_n.value = Xn.getBoundingClientRect().width),
                  t.slots.prefix)
                ) {
                  const to = Xn.querySelector(`.${r.e("prefix")}`);
                  Wn.value = Math.max(to.getBoundingClientRect().width + 5, 30);
                }
              }),
              de();
          }),
          e.multiple &&
            !Array.isArray(e.modelValue) &&
            t.emit(UPDATE_MODEL_EVENT, []),
          !e.multiple &&
            Array.isArray(e.modelValue) &&
            t.emit(UPDATE_MODEL_EVENT, "");
        const eo = computed(() => {
          var Xn, to;
          return (to = (Xn = qn.value) == null ? void 0 : Xn.popperRef) == null
            ? void 0
            : to.contentRef;
        });
        return {
          tagInMultiLine: Yn,
          prefixWidth: Wn,
          selectSize: $,
          readonly: k,
          handleResize: V,
          collapseTagSize: L,
          debouncedOnInputChange: oe,
          debouncedQueryChange: j,
          deletePrevTag: ae,
          deleteTag: z,
          deleteSelected: re,
          handleOptionSelect: ie,
          scrollToOption: le,
          inputWidth: _n,
          selected: wn,
          inputLength: bn,
          filteredOptionsCount: Et,
          visible: En,
          softFocus: kn,
          selectedLabel: In,
          hoverIndex: Dn,
          query: Kn,
          inputHovering: Un,
          currentPlaceholder: $n,
          menuVisibleOnFocus: An,
          isOnComposition: Vn,
          isSilentBlur: Ie,
          options: jt,
          resetInputHeight: ue,
          managePlaceholder: pe,
          showClose: Ce,
          selectDisabled: Oe,
          iconComponent: he,
          iconReverse: $e,
          showNewOption: Ve,
          emptyText: qe,
          toggleLastOptionHitState: Cn,
          resetInputState: Pt,
          handleComposition: kt,
          handleMenuEnter: Lt,
          handleFocus: At,
          blur: Ue,
          handleBlur: ze,
          handleClearClick: Tn,
          handleClose: Nn,
          handleKeydownEscape: xn,
          toggleMenu: Mn,
          selectOption: zn,
          getValueKey: Rn,
          navigateOptions: Ln,
          dropMenuVisible: jn,
          focus: On,
          reference: Fn,
          input: Hn,
          tooltipRef: qn,
          popperPaneRef: eo,
          tags: Gn,
          selectWrapper: _e,
          scrollbar: Ne,
          wrapperKls: Zn,
          selectTagsStyle: Qn,
          nsSelect: n,
          tagTextStyle: Jn,
          handleMouseEnter: hn,
          handleMouseLeave: Sn,
        };
      },
    }),
    _hoisted_1$5 = ["disabled", "autocomplete"],
    _hoisted_2$6 = {
      style: {
        height: "100%",
        display: "flex",
        "justify-content": "center",
        "align-items": "center",
      },
    };
  function _sfc_render$4(e, t, n, r, i, g) {
    const y = resolveComponent("el-tag"),
      $ = resolveComponent("el-tooltip"),
      k = resolveComponent("el-icon"),
      V = resolveComponent("el-input"),
      L = resolveComponent("el-option"),
      oe = resolveComponent("el-scrollbar"),
      j = resolveComponent("el-select-menu"),
      ae = resolveDirective("click-outside");
    return withDirectives(
      (openBlock(),
      createElementBlock(
        "div",
        {
          ref: "selectWrapper",
          class: normalizeClass(e.wrapperKls),
          onMouseenter:
            t[22] ||
            (t[22] = (...z) => e.handleMouseEnter && e.handleMouseEnter(...z)),
          onMouseleave:
            t[23] ||
            (t[23] = (...z) => e.handleMouseLeave && e.handleMouseLeave(...z)),
          onClick:
            t[24] ||
            (t[24] = withModifiers(
              (...z) => e.toggleMenu && e.toggleMenu(...z),
              ["stop"]
            )),
        },
        [
          createVNode(
            $,
            {
              ref: "tooltipRef",
              visible: e.dropMenuVisible,
              placement: e.placement,
              teleported: e.teleported,
              "popper-class": [e.nsSelect.e("popper"), e.popperClass],
              "fallback-placements": [
                "bottom-start",
                "top-start",
                "right",
                "left",
              ],
              effect: e.effect,
              pure: "",
              trigger: "click",
              transition: `${e.nsSelect.namespace.value}-zoom-in-top`,
              "stop-popper-mouse-event": !1,
              "gpu-acceleration": !1,
              persistent: e.persistent,
              onShow: e.handleMenuEnter,
            },
            {
              default: withCtx(() => [
                createBaseVNode(
                  "div",
                  {
                    class: "select-trigger",
                    onMouseenter:
                      t[20] || (t[20] = (z) => (e.inputHovering = !0)),
                    onMouseleave:
                      t[21] || (t[21] = (z) => (e.inputHovering = !1)),
                  },
                  [
                    e.multiple
                      ? (openBlock(),
                        createElementBlock(
                          "div",
                          {
                            key: 0,
                            ref: "tags",
                            class: normalizeClass(e.nsSelect.e("tags")),
                            style: normalizeStyle(e.selectTagsStyle),
                          },
                          [
                            e.collapseTags && e.selected.length
                              ? (openBlock(),
                                createElementBlock(
                                  "span",
                                  {
                                    key: 0,
                                    class: normalizeClass([
                                      e.nsSelect.b("tags-wrapper"),
                                      {
                                        "has-prefix":
                                          e.prefixWidth && e.selected.length,
                                      },
                                    ]),
                                  },
                                  [
                                    createVNode(
                                      y,
                                      {
                                        closable:
                                          !e.selectDisabled &&
                                          !e.selected[0].isDisabled,
                                        size: e.collapseTagSize,
                                        hit: e.selected[0].hitState,
                                        type: e.tagType,
                                        "disable-transitions": "",
                                        onClose:
                                          t[0] ||
                                          (t[0] = (z) =>
                                            e.deleteTag(z, e.selected[0])),
                                      },
                                      {
                                        default: withCtx(() => [
                                          createBaseVNode(
                                            "span",
                                            {
                                              class: normalizeClass(
                                                e.nsSelect.e("tags-text")
                                              ),
                                              style: normalizeStyle(
                                                e.tagTextStyle
                                              ),
                                            },
                                            toDisplayString(
                                              e.selected[0].currentLabel
                                            ),
                                            7
                                          ),
                                        ]),
                                        _: 1,
                                      },
                                      8,
                                      ["closable", "size", "hit", "type"]
                                    ),
                                    e.selected.length > 1
                                      ? (openBlock(),
                                        createBlock(
                                          y,
                                          {
                                            key: 0,
                                            closable: !1,
                                            size: e.collapseTagSize,
                                            type: e.tagType,
                                            "disable-transitions": "",
                                          },
                                          {
                                            default: withCtx(() => [
                                              e.collapseTagsTooltip
                                                ? (openBlock(),
                                                  createBlock(
                                                    $,
                                                    {
                                                      key: 0,
                                                      disabled:
                                                        e.dropMenuVisible,
                                                      "fallback-placements": [
                                                        "bottom",
                                                        "top",
                                                        "right",
                                                        "left",
                                                      ],
                                                      effect: e.effect,
                                                      placement: "bottom",
                                                      teleported: e.teleported,
                                                    },
                                                    {
                                                      default: withCtx(() => [
                                                        createBaseVNode(
                                                          "span",
                                                          {
                                                            class:
                                                              normalizeClass(
                                                                e.nsSelect.e(
                                                                  "tags-text"
                                                                )
                                                              ),
                                                          },
                                                          "+ " +
                                                            toDisplayString(
                                                              e.selected
                                                                .length - 1
                                                            ),
                                                          3
                                                        ),
                                                      ]),
                                                      content: withCtx(() => [
                                                        createBaseVNode(
                                                          "div",
                                                          {
                                                            class:
                                                              normalizeClass(
                                                                e.nsSelect.e(
                                                                  "collapse-tags"
                                                                )
                                                              ),
                                                          },
                                                          [
                                                            (openBlock(!0),
                                                            createElementBlock(
                                                              Fragment,
                                                              null,
                                                              renderList(
                                                                e.selected.slice(
                                                                  1
                                                                ),
                                                                (z, re) => (
                                                                  openBlock(),
                                                                  createElementBlock(
                                                                    "div",
                                                                    {
                                                                      key: re,
                                                                      class:
                                                                        normalizeClass(
                                                                          e.nsSelect.e(
                                                                            "collapse-tag"
                                                                          )
                                                                        ),
                                                                    },
                                                                    [
                                                                      (openBlock(),
                                                                      createBlock(
                                                                        y,
                                                                        {
                                                                          key: e.getValueKey(
                                                                            z
                                                                          ),
                                                                          class:
                                                                            "in-tooltip",
                                                                          closable:
                                                                            !e.selectDisabled &&
                                                                            !z.isDisabled,
                                                                          size: e.collapseTagSize,
                                                                          hit: z.hitState,
                                                                          type: e.tagType,
                                                                          "disable-transitions":
                                                                            "",
                                                                          style:
                                                                            {
                                                                              margin:
                                                                                "2px",
                                                                            },
                                                                          onClose:
                                                                            (
                                                                              ie
                                                                            ) =>
                                                                              e.deleteTag(
                                                                                ie,
                                                                                z
                                                                              ),
                                                                        },
                                                                        {
                                                                          default:
                                                                            withCtx(
                                                                              () => [
                                                                                createBaseVNode(
                                                                                  "span",
                                                                                  {
                                                                                    class:
                                                                                      normalizeClass(
                                                                                        e.nsSelect.e(
                                                                                          "tags-text"
                                                                                        )
                                                                                      ),
                                                                                    style:
                                                                                      normalizeStyle(
                                                                                        {
                                                                                          maxWidth:
                                                                                            e.inputWidth -
                                                                                            75 +
                                                                                            "px",
                                                                                        }
                                                                                      ),
                                                                                  },
                                                                                  toDisplayString(
                                                                                    z.currentLabel
                                                                                  ),
                                                                                  7
                                                                                ),
                                                                              ]
                                                                            ),
                                                                          _: 2,
                                                                        },
                                                                        1032,
                                                                        [
                                                                          "closable",
                                                                          "size",
                                                                          "hit",
                                                                          "type",
                                                                          "onClose",
                                                                        ]
                                                                      )),
                                                                    ],
                                                                    2
                                                                  )
                                                                )
                                                              ),
                                                              128
                                                            )),
                                                          ],
                                                          2
                                                        ),
                                                      ]),
                                                      _: 1,
                                                    },
                                                    8,
                                                    [
                                                      "disabled",
                                                      "effect",
                                                      "teleported",
                                                    ]
                                                  ))
                                                : (openBlock(),
                                                  createElementBlock(
                                                    "span",
                                                    {
                                                      key: 1,
                                                      class: normalizeClass(
                                                        e.nsSelect.e(
                                                          "tags-text"
                                                        )
                                                      ),
                                                    },
                                                    "+ " +
                                                      toDisplayString(
                                                        e.selected.length - 1
                                                      ),
                                                    3
                                                  )),
                                            ]),
                                            _: 1,
                                          },
                                          8,
                                          ["size", "type"]
                                        ))
                                      : createCommentVNode("v-if", !0),
                                  ],
                                  2
                                ))
                              : createCommentVNode("v-if", !0),
                            createCommentVNode(" <div> "),
                            e.collapseTags
                              ? createCommentVNode("v-if", !0)
                              : (openBlock(),
                                createBlock(
                                  Transition,
                                  { key: 1, onAfterLeave: e.resetInputHeight },
                                  {
                                    default: withCtx(() => [
                                      createBaseVNode(
                                        "span",
                                        {
                                          class: normalizeClass([
                                            e.nsSelect.b("tags-wrapper"),
                                            {
                                              "has-prefix":
                                                e.prefixWidth &&
                                                e.selected.length,
                                            },
                                          ]),
                                        },
                                        [
                                          (openBlock(!0),
                                          createElementBlock(
                                            Fragment,
                                            null,
                                            renderList(
                                              e.selected,
                                              (z) => (
                                                openBlock(),
                                                createBlock(
                                                  y,
                                                  {
                                                    key: e.getValueKey(z),
                                                    closable:
                                                      !e.selectDisabled &&
                                                      !z.isDisabled,
                                                    size: e.collapseTagSize,
                                                    hit: z.hitState,
                                                    type: e.tagType,
                                                    "disable-transitions": "",
                                                    onClose: (re) =>
                                                      e.deleteTag(re, z),
                                                  },
                                                  {
                                                    default: withCtx(() => [
                                                      createBaseVNode(
                                                        "span",
                                                        {
                                                          class: normalizeClass(
                                                            e.nsSelect.e(
                                                              "tags-text"
                                                            )
                                                          ),
                                                          style: normalizeStyle(
                                                            {
                                                              maxWidth:
                                                                e.inputWidth -
                                                                75 +
                                                                "px",
                                                            }
                                                          ),
                                                        },
                                                        toDisplayString(
                                                          z.currentLabel
                                                        ),
                                                        7
                                                      ),
                                                    ]),
                                                    _: 2,
                                                  },
                                                  1032,
                                                  [
                                                    "closable",
                                                    "size",
                                                    "hit",
                                                    "type",
                                                    "onClose",
                                                  ]
                                                )
                                              )
                                            ),
                                            128
                                          )),
                                        ],
                                        2
                                      ),
                                    ]),
                                    _: 1,
                                  },
                                  8,
                                  ["onAfterLeave"]
                                )),
                            createCommentVNode(" </div> "),
                            e.filterable
                              ? withDirectives(
                                  (openBlock(),
                                  createElementBlock(
                                    "input",
                                    {
                                      key: 2,
                                      ref: "input",
                                      "onUpdate:modelValue":
                                        t[1] || (t[1] = (z) => (e.query = z)),
                                      type: "text",
                                      class: normalizeClass([
                                        e.nsSelect.e("input"),
                                        e.nsSelect.is(e.selectSize),
                                      ]),
                                      disabled: e.selectDisabled,
                                      autocomplete: e.autocomplete,
                                      style: normalizeStyle({
                                        marginLeft:
                                          (e.prefixWidth &&
                                            !e.selected.length) ||
                                          e.tagInMultiLine
                                            ? `${e.prefixWidth}px`
                                            : "",
                                        flexGrow: 1,
                                        width: `${
                                          e.inputLength / (e.inputWidth - 32)
                                        }%`,
                                        maxWidth: `${e.inputWidth - 42}px`,
                                      }),
                                      onFocus:
                                        t[2] ||
                                        (t[2] = (...z) =>
                                          e.handleFocus && e.handleFocus(...z)),
                                      onBlur:
                                        t[3] ||
                                        (t[3] = (...z) =>
                                          e.handleBlur && e.handleBlur(...z)),
                                      onKeyup:
                                        t[4] ||
                                        (t[4] = (...z) =>
                                          e.managePlaceholder &&
                                          e.managePlaceholder(...z)),
                                      onKeydown: [
                                        t[5] ||
                                          (t[5] = (...z) =>
                                            e.resetInputState &&
                                            e.resetInputState(...z)),
                                        t[6] ||
                                          (t[6] = withKeys(
                                            withModifiers(
                                              (z) => e.navigateOptions("next"),
                                              ["prevent"]
                                            ),
                                            ["down"]
                                          )),
                                        t[7] ||
                                          (t[7] = withKeys(
                                            withModifiers(
                                              (z) => e.navigateOptions("prev"),
                                              ["prevent"]
                                            ),
                                            ["up"]
                                          )),
                                        t[8] ||
                                          (t[8] = withKeys(
                                            (...z) =>
                                              e.handleKeydownEscape &&
                                              e.handleKeydownEscape(...z),
                                            ["esc"]
                                          )),
                                        t[9] ||
                                          (t[9] = withKeys(
                                            withModifiers(
                                              (...z) =>
                                                e.selectOption &&
                                                e.selectOption(...z),
                                              ["stop", "prevent"]
                                            ),
                                            ["enter"]
                                          )),
                                        t[10] ||
                                          (t[10] = withKeys(
                                            (...z) =>
                                              e.deletePrevTag &&
                                              e.deletePrevTag(...z),
                                            ["delete"]
                                          )),
                                        t[11] ||
                                          (t[11] = withKeys(
                                            (z) => (e.visible = !1),
                                            ["tab"]
                                          )),
                                      ],
                                      onCompositionstart:
                                        t[12] ||
                                        (t[12] = (...z) =>
                                          e.handleComposition &&
                                          e.handleComposition(...z)),
                                      onCompositionupdate:
                                        t[13] ||
                                        (t[13] = (...z) =>
                                          e.handleComposition &&
                                          e.handleComposition(...z)),
                                      onCompositionend:
                                        t[14] ||
                                        (t[14] = (...z) =>
                                          e.handleComposition &&
                                          e.handleComposition(...z)),
                                      onInput:
                                        t[15] ||
                                        (t[15] = (...z) =>
                                          e.debouncedQueryChange &&
                                          e.debouncedQueryChange(...z)),
                                    },
                                    null,
                                    46,
                                    _hoisted_1$5
                                  )),
                                  [[vModelText, e.query]]
                                )
                              : createCommentVNode("v-if", !0),
                          ],
                          6
                        ))
                      : createCommentVNode("v-if", !0),
                    createVNode(
                      V,
                      {
                        id: e.id,
                        ref: "reference",
                        modelValue: e.selectedLabel,
                        "onUpdate:modelValue":
                          t[16] || (t[16] = (z) => (e.selectedLabel = z)),
                        type: "text",
                        placeholder: e.currentPlaceholder,
                        name: e.name,
                        autocomplete: e.autocomplete,
                        size: e.selectSize,
                        disabled: e.selectDisabled,
                        readonly: e.readonly,
                        "validate-event": !1,
                        class: normalizeClass([
                          e.nsSelect.is("focus", e.visible),
                        ]),
                        tabindex: e.multiple && e.filterable ? -1 : void 0,
                        onFocus: e.handleFocus,
                        onBlur: e.handleBlur,
                        onInput: e.debouncedOnInputChange,
                        onPaste: e.debouncedOnInputChange,
                        onCompositionstart: e.handleComposition,
                        onCompositionupdate: e.handleComposition,
                        onCompositionend: e.handleComposition,
                        onKeydown: [
                          t[17] ||
                            (t[17] = withKeys(
                              withModifiers(
                                (z) => e.navigateOptions("next"),
                                ["stop", "prevent"]
                              ),
                              ["down"]
                            )),
                          t[18] ||
                            (t[18] = withKeys(
                              withModifiers(
                                (z) => e.navigateOptions("prev"),
                                ["stop", "prevent"]
                              ),
                              ["up"]
                            )),
                          withKeys(
                            withModifiers(e.selectOption, ["stop", "prevent"]),
                            ["enter"]
                          ),
                          withKeys(e.handleKeydownEscape, ["esc"]),
                          t[19] ||
                            (t[19] = withKeys(
                              (z) => (e.visible = !1),
                              ["tab"]
                            )),
                        ],
                      },
                      createSlots(
                        {
                          suffix: withCtx(() => [
                            e.iconComponent && !e.showClose
                              ? (openBlock(),
                                createBlock(
                                  k,
                                  {
                                    key: 0,
                                    class: normalizeClass([
                                      e.nsSelect.e("caret"),
                                      e.nsSelect.e("icon"),
                                      e.iconReverse,
                                    ]),
                                  },
                                  {
                                    default: withCtx(() => [
                                      (openBlock(),
                                      createBlock(
                                        resolveDynamicComponent(e.iconComponent)
                                      )),
                                    ]),
                                    _: 1,
                                  },
                                  8,
                                  ["class"]
                                ))
                              : createCommentVNode("v-if", !0),
                            e.showClose && e.clearIcon
                              ? (openBlock(),
                                createBlock(
                                  k,
                                  {
                                    key: 1,
                                    class: normalizeClass([
                                      e.nsSelect.e("caret"),
                                      e.nsSelect.e("icon"),
                                    ]),
                                    onClick: e.handleClearClick,
                                  },
                                  {
                                    default: withCtx(() => [
                                      (openBlock(),
                                      createBlock(
                                        resolveDynamicComponent(e.clearIcon)
                                      )),
                                    ]),
                                    _: 1,
                                  },
                                  8,
                                  ["class", "onClick"]
                                ))
                              : createCommentVNode("v-if", !0),
                          ]),
                          _: 2,
                        },
                        [
                          e.$slots.prefix
                            ? {
                                name: "prefix",
                                fn: withCtx(() => [
                                  createBaseVNode("div", _hoisted_2$6, [
                                    renderSlot(e.$slots, "prefix"),
                                  ]),
                                ]),
                              }
                            : void 0,
                        ]
                      ),
                      1032,
                      [
                        "id",
                        "modelValue",
                        "placeholder",
                        "name",
                        "autocomplete",
                        "size",
                        "disabled",
                        "readonly",
                        "class",
                        "tabindex",
                        "onFocus",
                        "onBlur",
                        "onInput",
                        "onPaste",
                        "onCompositionstart",
                        "onCompositionupdate",
                        "onCompositionend",
                        "onKeydown",
                      ]
                    ),
                  ],
                  32
                ),
              ]),
              content: withCtx(() => [
                createVNode(j, null, {
                  default: withCtx(() => [
                    withDirectives(
                      createVNode(
                        oe,
                        {
                          ref: "scrollbar",
                          tag: "ul",
                          "wrap-class": e.nsSelect.be("dropdown", "wrap"),
                          "view-class": e.nsSelect.be("dropdown", "list"),
                          class: normalizeClass([
                            e.nsSelect.is(
                              "empty",
                              !e.allowCreate &&
                                Boolean(e.query) &&
                                e.filteredOptionsCount === 0
                            ),
                          ]),
                        },
                        {
                          default: withCtx(() => [
                            e.showNewOption
                              ? (openBlock(),
                                createBlock(
                                  L,
                                  { key: 0, value: e.query, created: !0 },
                                  null,
                                  8,
                                  ["value"]
                                ))
                              : createCommentVNode("v-if", !0),
                            renderSlot(e.$slots, "default"),
                          ]),
                          _: 3,
                        },
                        8,
                        ["wrap-class", "view-class", "class"]
                      ),
                      [[vShow, e.options.size > 0 && !e.loading]]
                    ),
                    e.emptyText &&
                    (!e.allowCreate ||
                      e.loading ||
                      (e.allowCreate && e.options.size === 0))
                      ? (openBlock(),
                        createElementBlock(
                          Fragment,
                          { key: 0 },
                          [
                            e.$slots.empty
                              ? renderSlot(e.$slots, "empty", { key: 0 })
                              : (openBlock(),
                                createElementBlock(
                                  "p",
                                  {
                                    key: 1,
                                    class: normalizeClass(
                                      e.nsSelect.be("dropdown", "empty")
                                    ),
                                  },
                                  toDisplayString(e.emptyText),
                                  3
                                )),
                          ],
                          64
                        ))
                      : createCommentVNode("v-if", !0),
                  ]),
                  _: 3,
                }),
              ]),
              _: 3,
            },
            8,
            [
              "visible",
              "placement",
              "teleported",
              "popper-class",
              "effect",
              "transition",
              "persistent",
              "onShow",
            ]
          ),
        ],
        34
      )),
      [[ae, e.handleClose, e.popperPaneRef]]
    );
  }
  var Select = _export_sfc$1(_sfc_main$8, [
    ["render", _sfc_render$4],
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/select/src/select.vue",
    ],
  ]);
  const _sfc_main$7 = defineComponent({
    name: "ElOptionGroup",
    componentName: "ElOptionGroup",
    props: { label: String, disabled: { type: Boolean, default: !1 } },
    setup(e) {
      const t = useNamespace("select"),
        n = ref(!0),
        r = getCurrentInstance(),
        i = ref([]);
      provide(selectGroupKey, reactive({ ...toRefs(e) }));
      const g = inject(selectKey);
      onMounted(() => {
        i.value = y(r.subTree);
      });
      const y = (k) => {
          const V = [];
          return (
            Array.isArray(k.children) &&
              k.children.forEach((L) => {
                var oe;
                L.type &&
                L.type.name === "ElOption" &&
                L.component &&
                L.component.proxy
                  ? V.push(L.component.proxy)
                  : (oe = L.children) != null && oe.length && V.push(...y(L));
              }),
            V
          );
        },
        { groupQueryChange: $ } = toRaw(g);
      return (
        watch(
          $,
          () => {
            n.value = i.value.some((k) => k.visible === !0);
          },
          { flush: "post" }
        ),
        { visible: n, ns: t }
      );
    },
  });
  function _sfc_render$3(e, t, n, r, i, g) {
    return withDirectives(
      (openBlock(),
      createElementBlock(
        "ul",
        { class: normalizeClass(e.ns.be("group", "wrap")) },
        [
          createBaseVNode(
            "li",
            { class: normalizeClass(e.ns.be("group", "title")) },
            toDisplayString(e.label),
            3
          ),
          createBaseVNode("li", null, [
            createBaseVNode(
              "ul",
              { class: normalizeClass(e.ns.b("group")) },
              [renderSlot(e.$slots, "default")],
              2
            ),
          ]),
        ],
        2
      )),
      [[vShow, e.visible]]
    );
  }
  var OptionGroup = _export_sfc$1(_sfc_main$7, [
    ["render", _sfc_render$3],
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/select/src/option-group.vue",
    ],
  ]);
  const ElSelect = withInstall(Select, { Option, OptionGroup }),
    ElOption = withNoopInstall(Option);
  withNoopInstall(OptionGroup);
  const switchProps = buildProps({
      modelValue: { type: [Boolean, String, Number], default: !1 },
      value: { type: [Boolean, String, Number], default: !1 },
      disabled: { type: Boolean, default: !1 },
      width: { type: [String, Number], default: "" },
      inlinePrompt: { type: Boolean, default: !1 },
      activeIcon: { type: iconPropType },
      inactiveIcon: { type: iconPropType },
      activeText: { type: String, default: "" },
      inactiveText: { type: String, default: "" },
      activeColor: { type: String, default: "" },
      inactiveColor: { type: String, default: "" },
      borderColor: { type: String, default: "" },
      activeValue: { type: [Boolean, String, Number], default: !0 },
      inactiveValue: { type: [Boolean, String, Number], default: !1 },
      name: { type: String, default: "" },
      validateEvent: { type: Boolean, default: !0 },
      id: String,
      loading: { type: Boolean, default: !1 },
      beforeChange: { type: definePropType(Function) },
      size: { type: String, validator: isValidComponentSize },
      tabindex: { type: [String, Number] },
    }),
    switchEmits = {
      [UPDATE_MODEL_EVENT]: (e) =>
        isBoolean$1(e) || isString$3(e) || isNumber$1(e),
      [CHANGE_EVENT]: (e) => isBoolean$1(e) || isString$3(e) || isNumber$1(e),
      [INPUT_EVENT]: (e) => isBoolean$1(e) || isString$3(e) || isNumber$1(e),
    },
    _hoisted_1$4 = ["onClick"],
    _hoisted_2$5 = [
      "id",
      "aria-checked",
      "aria-disabled",
      "name",
      "true-value",
      "false-value",
      "disabled",
      "tabindex",
      "onKeydown",
    ],
    _hoisted_3$3 = ["aria-hidden"],
    _hoisted_4$1 = ["aria-hidden"],
    _hoisted_5$1 = ["aria-hidden"],
    COMPONENT_NAME = "ElSwitch",
    __default__$1 = defineComponent({ name: COMPONENT_NAME }),
    _sfc_main$6 = defineComponent({
      ...__default__$1,
      props: switchProps,
      emits: switchEmits,
      setup(e, { expose: t, emit: n }) {
        const r = e,
          i = getCurrentInstance(),
          { formItem: g } = useFormItem(),
          y = useSize(),
          $ = useNamespace("switch");
        useDeprecated(
          {
            from: '"value"',
            replacement: '"model-value" or "v-model"',
            scope: COMPONENT_NAME,
            version: "2.3.0",
            ref: "https://element-plus.org/en-US/component/switch.html#attributes",
            type: "Attribute",
          },
          computed(() => {
            var Ce;
            return !!((Ce = i.vnode.props) != null && Ce.value);
          })
        );
        const { inputId: k } = useFormItemInputId(r, { formItemContext: g }),
          V = useDisabled(computed(() => r.loading)),
          L = ref(r.modelValue !== !1),
          oe = ref(),
          j = ref(),
          ae = computed(() => [
            $.b(),
            $.m(y.value),
            $.is("disabled", V.value),
            $.is("checked", ie.value),
          ]),
          z = computed(() => ({ width: addUnit(r.width) }));
        watch(
          () => r.modelValue,
          () => {
            L.value = !0;
          }
        ),
          watch(
            () => r.value,
            () => {
              L.value = !1;
            }
          );
        const re = computed(() => (L.value ? r.modelValue : r.value)),
          ie = computed(() => re.value === r.activeValue);
        [r.activeValue, r.inactiveValue].includes(re.value) ||
          (n(UPDATE_MODEL_EVENT, r.inactiveValue),
          n(CHANGE_EVENT, r.inactiveValue),
          n(INPUT_EVENT, r.inactiveValue)),
          watch(ie, (Ce) => {
            var Oe;
            (oe.value.checked = Ce),
              r.validateEvent &&
                ((Oe = g == null ? void 0 : g.validate) == null ||
                  Oe.call(g, "change").catch((he) => void 0));
          });
        const le = () => {
            const Ce = ie.value ? r.inactiveValue : r.activeValue;
            n(UPDATE_MODEL_EVENT, Ce),
              n(CHANGE_EVENT, Ce),
              n(INPUT_EVENT, Ce),
              nextTick(() => {
                oe.value.checked = ie.value;
              });
          },
          de = () => {
            if (V.value) return;
            const { beforeChange: Ce } = r;
            if (!Ce) {
              le();
              return;
            }
            const Oe = Ce();
            [isPromise(Oe), isBoolean$1(Oe)].includes(!0) ||
              throwError(
                COMPONENT_NAME,
                "beforeChange must return type `Promise<boolean>` or `boolean`"
              ),
              isPromise(Oe)
                ? Oe.then(($e) => {
                    $e && le();
                  }).catch(($e) => {})
                : Oe && le();
          },
          ue = computed(() =>
            $.cssVarBlock({
              ...(r.activeColor ? { "on-color": r.activeColor } : null),
              ...(r.inactiveColor ? { "off-color": r.inactiveColor } : null),
              ...(r.borderColor ? { "border-color": r.borderColor } : null),
            })
          ),
          pe = () => {
            var Ce, Oe;
            (Oe = (Ce = oe.value) == null ? void 0 : Ce.focus) == null ||
              Oe.call(Ce);
          };
        return (
          onMounted(() => {
            oe.value.checked = ie.value;
          }),
          t({ focus: pe, checked: ie }),
          (Ce, Oe) => (
            openBlock(),
            createElementBlock(
              "div",
              {
                class: normalizeClass(unref(ae)),
                style: normalizeStyle(unref(ue)),
                onClick: withModifiers(de, ["prevent"]),
              },
              [
                createBaseVNode(
                  "input",
                  {
                    id: unref(k),
                    ref_key: "input",
                    ref: oe,
                    class: normalizeClass(unref($).e("input")),
                    type: "checkbox",
                    role: "switch",
                    "aria-checked": unref(ie),
                    "aria-disabled": unref(V),
                    name: Ce.name,
                    "true-value": Ce.activeValue,
                    "false-value": Ce.inactiveValue,
                    disabled: unref(V),
                    tabindex: Ce.tabindex,
                    onChange: le,
                    onKeydown: withKeys(de, ["enter"]),
                  },
                  null,
                  42,
                  _hoisted_2$5
                ),
                !Ce.inlinePrompt && (Ce.inactiveIcon || Ce.inactiveText)
                  ? (openBlock(),
                    createElementBlock(
                      "span",
                      {
                        key: 0,
                        class: normalizeClass([
                          unref($).e("label"),
                          unref($).em("label", "left"),
                          unref($).is("active", !unref(ie)),
                        ]),
                      },
                      [
                        Ce.inactiveIcon
                          ? (openBlock(),
                            createBlock(
                              unref(ElIcon),
                              { key: 0 },
                              {
                                default: withCtx(() => [
                                  (openBlock(),
                                  createBlock(
                                    resolveDynamicComponent(Ce.inactiveIcon)
                                  )),
                                ]),
                                _: 1,
                              }
                            ))
                          : createCommentVNode("v-if", !0),
                        !Ce.inactiveIcon && Ce.inactiveText
                          ? (openBlock(),
                            createElementBlock(
                              "span",
                              { key: 1, "aria-hidden": unref(ie) },
                              toDisplayString(Ce.inactiveText),
                              9,
                              _hoisted_3$3
                            ))
                          : createCommentVNode("v-if", !0),
                      ],
                      2
                    ))
                  : createCommentVNode("v-if", !0),
                createBaseVNode(
                  "span",
                  {
                    ref_key: "core",
                    ref: j,
                    class: normalizeClass(unref($).e("core")),
                    style: normalizeStyle(unref(z)),
                  },
                  [
                    Ce.inlinePrompt
                      ? (openBlock(),
                        createElementBlock(
                          "div",
                          {
                            key: 0,
                            class: normalizeClass(unref($).e("inner")),
                          },
                          [
                            Ce.activeIcon || Ce.inactiveIcon
                              ? (openBlock(),
                                createBlock(
                                  unref(ElIcon),
                                  {
                                    key: 0,
                                    class: normalizeClass(unref($).is("icon")),
                                  },
                                  {
                                    default: withCtx(() => [
                                      (openBlock(),
                                      createBlock(
                                        resolveDynamicComponent(
                                          unref(ie)
                                            ? Ce.activeIcon
                                            : Ce.inactiveIcon
                                        )
                                      )),
                                    ]),
                                    _: 1,
                                  },
                                  8,
                                  ["class"]
                                ))
                              : Ce.activeText || Ce.inactiveText
                              ? (openBlock(),
                                createElementBlock(
                                  "span",
                                  {
                                    key: 1,
                                    class: normalizeClass(unref($).is("text")),
                                    "aria-hidden": !unref(ie),
                                  },
                                  toDisplayString(
                                    unref(ie) ? Ce.activeText : Ce.inactiveText
                                  ),
                                  11,
                                  _hoisted_4$1
                                ))
                              : createCommentVNode("v-if", !0),
                          ],
                          2
                        ))
                      : createCommentVNode("v-if", !0),
                    createBaseVNode(
                      "div",
                      { class: normalizeClass(unref($).e("action")) },
                      [
                        Ce.loading
                          ? (openBlock(),
                            createBlock(
                              unref(ElIcon),
                              {
                                key: 0,
                                class: normalizeClass(unref($).is("loading")),
                              },
                              {
                                default: withCtx(() => [
                                  createVNode(unref(loading_default)),
                                ]),
                                _: 1,
                              },
                              8,
                              ["class"]
                            ))
                          : createCommentVNode("v-if", !0),
                      ],
                      2
                    ),
                  ],
                  6
                ),
                !Ce.inlinePrompt && (Ce.activeIcon || Ce.activeText)
                  ? (openBlock(),
                    createElementBlock(
                      "span",
                      {
                        key: 1,
                        class: normalizeClass([
                          unref($).e("label"),
                          unref($).em("label", "right"),
                          unref($).is("active", unref(ie)),
                        ]),
                      },
                      [
                        Ce.activeIcon
                          ? (openBlock(),
                            createBlock(
                              unref(ElIcon),
                              { key: 0 },
                              {
                                default: withCtx(() => [
                                  (openBlock(),
                                  createBlock(
                                    resolveDynamicComponent(Ce.activeIcon)
                                  )),
                                ]),
                                _: 1,
                              }
                            ))
                          : createCommentVNode("v-if", !0),
                        !Ce.activeIcon && Ce.activeText
                          ? (openBlock(),
                            createElementBlock(
                              "span",
                              { key: 1, "aria-hidden": !unref(ie) },
                              toDisplayString(Ce.activeText),
                              9,
                              _hoisted_5$1
                            ))
                          : createCommentVNode("v-if", !0),
                      ],
                      2
                    ))
                  : createCommentVNode("v-if", !0),
              ],
              14,
              _hoisted_1$4
            )
          )
        );
      },
    });
  var Switch = _export_sfc$1(_sfc_main$6, [
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/switch/src/switch.vue",
    ],
  ]);
  const ElSwitch = withInstall(Switch);
  /*!
   * escape-html
   * Copyright(c) 2012-2013 TJ Holowaychuk
   * Copyright(c) 2015 Andreas Lubbe
   * Copyright(c) 2015 Tiancheng "Timothy" Gu
   * MIT Licensed
   */ var matchHtmlRegExp = /["'&<>]/,
    escapeHtml_1 = escapeHtml;
  function escapeHtml(e) {
    var t = "" + e,
      n = matchHtmlRegExp.exec(t);
    if (!n) return t;
    var r,
      i = "",
      g = 0,
      y = 0;
    for (g = n.index; g < t.length; g++) {
      switch (t.charCodeAt(g)) {
        case 34:
          r = "&quot;";
          break;
        case 38:
          r = "&amp;";
          break;
        case 39:
          r = "&#39;";
          break;
        case 60:
          r = "&lt;";
          break;
        case 62:
          r = "&gt;";
          break;
        default:
          continue;
      }
      y !== g && (i += t.substring(y, g)), (y = g + 1), (i += r);
    }
    return y !== g ? i + t.substring(y, g) : i;
  }
  const getCell = function (e) {
      var t;
      return (t = e.target) == null ? void 0 : t.closest("td");
    },
    isObject$1 = function (e) {
      return e !== null && typeof e == "object";
    },
    orderBy = function (e, t, n, r, i) {
      if (!t && !r && (!i || (Array.isArray(i) && !i.length))) return e;
      typeof n == "string"
        ? (n = n === "descending" ? -1 : 1)
        : (n = n && n < 0 ? -1 : 1);
      const g = r
          ? null
          : function ($, k) {
              return i
                ? (Array.isArray(i) || (i = [i]),
                  i.map((V) => (typeof V == "string" ? get($, V) : V($, k, e))))
                : (t !== "$key" &&
                    isObject$1($) &&
                    "$value" in $ &&
                    ($ = $.$value),
                  [isObject$1($) ? get($, t) : $]);
            },
        y = function ($, k) {
          if (r) return r($.value, k.value);
          for (let V = 0, L = $.key.length; V < L; V++) {
            if ($.key[V] < k.key[V]) return -1;
            if ($.key[V] > k.key[V]) return 1;
          }
          return 0;
        };
      return e
        .map(($, k) => ({ value: $, index: k, key: g ? g($, k) : null }))
        .sort(($, k) => {
          let V = y($, k);
          return V || (V = $.index - k.index), V * +n;
        })
        .map(($) => $.value);
    },
    getColumnById = function (e, t) {
      let n = null;
      return (
        e.columns.forEach((r) => {
          r.id === t && (n = r);
        }),
        n
      );
    },
    getColumnByKey = function (e, t) {
      let n = null;
      for (let r = 0; r < e.columns.length; r++) {
        const i = e.columns[r];
        if (i.columnKey === t) {
          n = i;
          break;
        }
      }
      return (
        n || throwError("ElTable", `No column matching with column-key: ${t}`),
        n
      );
    },
    getColumnByCell = function (e, t, n) {
      const r = (t.className || "").match(
        new RegExp(`${n}-table_[^\\s]+`, "gm")
      );
      return r ? getColumnById(e, r[0]) : null;
    },
    getRowIdentity = (e, t) => {
      if (!e) throw new Error("Row is required when get row identity");
      if (typeof t == "string") {
        if (!t.includes(".")) return `${e[t]}`;
        const n = t.split(".");
        let r = e;
        for (const i of n) r = r[i];
        return `${r}`;
      } else if (typeof t == "function") return t.call(null, e);
    },
    getKeysMap = function (e, t) {
      const n = {};
      return (
        (e || []).forEach((r, i) => {
          n[getRowIdentity(r, t)] = { row: r, index: i };
        }),
        n
      );
    };
  function mergeOptions(e, t) {
    const n = {};
    let r;
    for (r in e) n[r] = e[r];
    for (r in t)
      if (hasOwn(t, r)) {
        const i = t[r];
        typeof i < "u" && (n[r] = i);
      }
    return n;
  }
  function parseWidth(e) {
    return (
      e === "" ||
        (e !== void 0 &&
          ((e = Number.parseInt(e, 10)), Number.isNaN(e) && (e = ""))),
      e
    );
  }
  function parseMinWidth(e) {
    return (
      e === "" ||
        (e !== void 0 && ((e = parseWidth(e)), Number.isNaN(e) && (e = 80))),
      e
    );
  }
  function parseHeight(e) {
    return typeof e == "number"
      ? e
      : typeof e == "string"
      ? /^\d+(?:px)?$/.test(e)
        ? Number.parseInt(e, 10)
        : e
      : null;
  }
  function compose(...e) {
    return e.length === 0
      ? (t) => t
      : e.length === 1
      ? e[0]
      : e.reduce(
          (t, n) =>
            (...r) =>
              t(n(...r))
        );
  }
  function toggleRowStatus(e, t, n) {
    let r = !1;
    const i = e.indexOf(t),
      g = i !== -1,
      y = ($) => {
        $ === "add" ? e.push(t) : e.splice(i, 1),
          (r = !0),
          isArray$3(t.children) &&
            t.children.forEach((k) => {
              toggleRowStatus(e, k, n ?? !g);
            });
      };
    return (
      isBoolean$1(n)
        ? n && !g
          ? y("add")
          : !n && g && y("remove")
        : y(g ? "remove" : "add"),
      r
    );
  }
  function walkTreeNode(e, t, n = "children", r = "hasChildren") {
    const i = (y) => !(Array.isArray(y) && y.length);
    function g(y, $, k) {
      t(y, $, k),
        $.forEach((V) => {
          if (V[r]) {
            t(V, null, k + 1);
            return;
          }
          const L = V[n];
          i(L) || g(V, L, k + 1);
        });
    }
    e.forEach((y) => {
      if (y[r]) {
        t(y, null, 0);
        return;
      }
      const $ = y[n];
      i($) || g(y, $, 0);
    });
  }
  let removePopper;
  function createTablePopper(e, t, n, r, i) {
    const { nextZIndex: g } = useZIndex(),
      y = e == null ? void 0 : e.dataset.prefix,
      $ = e == null ? void 0 : e.querySelector(`.${y}-scrollbar__wrap`);
    function k() {
      const z = i === "light",
        re = document.createElement("div");
      return (
        (re.className = `${y}-popper ${z ? "is-light" : "is-dark"}`),
        (n = escapeHtml_1(n)),
        (re.innerHTML = n),
        (re.style.zIndex = String(g())),
        e == null || e.appendChild(re),
        re
      );
    }
    function V() {
      const z = document.createElement("div");
      return (z.className = `${y}-popper__arrow`), z;
    }
    function L() {
      oe && oe.update();
    }
    removePopper == null || removePopper(),
      (removePopper = () => {
        try {
          oe && oe.destroy(),
            j && (e == null || e.removeChild(j)),
            t.removeEventListener("mouseenter", L),
            t.removeEventListener("mouseleave", removePopper),
            $ == null || $.removeEventListener("scroll", removePopper),
            (removePopper = void 0);
        } catch {}
      });
    let oe = null;
    const j = k(),
      ae = V();
    return (
      j.appendChild(ae),
      (oe = yn(t, j, {
        strategy: "absolute",
        modifiers: [
          { name: "offset", options: { offset: [0, 8] } },
          { name: "arrow", options: { element: ae, padding: 10 } },
        ],
        ...r,
      })),
      t.addEventListener("mouseenter", L),
      t.addEventListener("mouseleave", removePopper),
      $ == null || $.addEventListener("scroll", removePopper),
      oe
    );
  }
  function getCurrentColumns(e) {
    return e.children ? flatMap(e.children, getCurrentColumns) : [e];
  }
  function getColSpan(e, t) {
    return e + t.colSpan;
  }
  const isFixedColumn = (e, t, n, r) => {
      let i = 0,
        g = e;
      const y = n.states.columns.value;
      if (r) {
        const k = getCurrentColumns(r[e]);
        (i = y.slice(0, y.indexOf(k[0])).reduce(getColSpan, 0)),
          (g = i + k.reduce(getColSpan, 0) - 1);
      } else i = e;
      let $;
      switch (t) {
        case "left":
          g < n.states.fixedLeafColumnsLength.value && ($ = "left");
          break;
        case "right":
          i >= y.length - n.states.rightFixedLeafColumnsLength.value &&
            ($ = "right");
          break;
        default:
          g < n.states.fixedLeafColumnsLength.value
            ? ($ = "left")
            : i >= y.length - n.states.rightFixedLeafColumnsLength.value &&
              ($ = "right");
      }
      return $ ? { direction: $, start: i, after: g } : {};
    },
    getFixedColumnsClass = (e, t, n, r, i, g = 0) => {
      const y = [],
        { direction: $, start: k, after: V } = isFixedColumn(t, n, r, i);
      if ($) {
        const L = $ === "left";
        y.push(`${e}-fixed-column--${$}`),
          L && V + g === r.states.fixedLeafColumnsLength.value - 1
            ? y.push("is-last-column")
            : !L &&
              k - g ===
                r.states.columns.value.length -
                  r.states.rightFixedLeafColumnsLength.value &&
              y.push("is-first-column");
      }
      return y;
    };
  function getOffset(e, t) {
    return (
      e +
      (t.realWidth === null || Number.isNaN(t.realWidth)
        ? Number(t.width)
        : t.realWidth)
    );
  }
  const getFixedColumnOffset = (e, t, n, r) => {
      const {
        direction: i,
        start: g = 0,
        after: y = 0,
      } = isFixedColumn(e, t, n, r);
      if (!i) return;
      const $ = {},
        k = i === "left",
        V = n.states.columns.value;
      return (
        k
          ? ($.left = V.slice(0, g).reduce(getOffset, 0))
          : ($.right = V.slice(y + 1)
              .reverse()
              .reduce(getOffset, 0)),
        $
      );
    },
    ensurePosition = (e, t) => {
      e && (Number.isNaN(e[t]) || (e[t] = `${e[t]}px`));
    };
  function useExpand(e) {
    const t = getCurrentInstance(),
      n = ref(!1),
      r = ref([]);
    return {
      updateExpandRows: () => {
        const k = e.data.value || [],
          V = e.rowKey.value;
        if (n.value) r.value = k.slice();
        else if (V) {
          const L = getKeysMap(r.value, V);
          r.value = k.reduce((oe, j) => {
            const ae = getRowIdentity(j, V);
            return L[ae] && oe.push(j), oe;
          }, []);
        } else r.value = [];
      },
      toggleRowExpansion: (k, V) => {
        toggleRowStatus(r.value, k, V) &&
          t.emit("expand-change", k, r.value.slice());
      },
      setExpandRowKeys: (k) => {
        t.store.assertRowKey();
        const V = e.data.value || [],
          L = e.rowKey.value,
          oe = getKeysMap(V, L);
        r.value = k.reduce((j, ae) => {
          const z = oe[ae];
          return z && j.push(z.row), j;
        }, []);
      },
      isRowExpanded: (k) => {
        const V = e.rowKey.value;
        return V
          ? !!getKeysMap(r.value, V)[getRowIdentity(k, V)]
          : r.value.includes(k);
      },
      states: { expandRows: r, defaultExpandAll: n },
    };
  }
  function useCurrent(e) {
    const t = getCurrentInstance(),
      n = ref(null),
      r = ref(null),
      i = (V) => {
        t.store.assertRowKey(), (n.value = V), y(V);
      },
      g = () => {
        n.value = null;
      },
      y = (V) => {
        const { data: L, rowKey: oe } = e;
        let j = null;
        oe.value &&
          (j = (unref(L) || []).find(
            (ae) => getRowIdentity(ae, oe.value) === V
          )),
          (r.value = j),
          t.emit("current-change", r.value, null);
      };
    return {
      setCurrentRowKey: i,
      restoreCurrentRowKey: g,
      setCurrentRowByKey: y,
      updateCurrentRow: (V) => {
        const L = r.value;
        if (V && V !== L) {
          (r.value = V), t.emit("current-change", r.value, L);
          return;
        }
        !V && L && ((r.value = null), t.emit("current-change", null, L));
      },
      updateCurrentRowData: () => {
        const V = e.rowKey.value,
          L = e.data.value || [],
          oe = r.value;
        if (!L.includes(oe) && oe) {
          if (V) {
            const j = getRowIdentity(oe, V);
            y(j);
          } else r.value = null;
          r.value === null && t.emit("current-change", null, oe);
        } else n.value && (y(n.value), g());
      },
      states: { _currentRowKey: n, currentRow: r },
    };
  }
  function useTree(e) {
    const t = ref([]),
      n = ref({}),
      r = ref(16),
      i = ref(!1),
      g = ref({}),
      y = ref("hasChildren"),
      $ = ref("children"),
      k = getCurrentInstance(),
      V = computed(() => {
        if (!e.rowKey.value) return {};
        const le = e.data.value || [];
        return oe(le);
      }),
      L = computed(() => {
        const le = e.rowKey.value,
          de = Object.keys(g.value),
          ue = {};
        return (
          de.length &&
            de.forEach((pe) => {
              if (g.value[pe].length) {
                const Ce = { children: [] };
                g.value[pe].forEach((Oe) => {
                  const he = getRowIdentity(Oe, le);
                  Ce.children.push(he),
                    Oe[y.value] && !ue[he] && (ue[he] = { children: [] });
                }),
                  (ue[pe] = Ce);
              }
            }),
          ue
        );
      }),
      oe = (le) => {
        const de = e.rowKey.value,
          ue = {};
        return (
          walkTreeNode(
            le,
            (pe, Ce, Oe) => {
              const he = getRowIdentity(pe, de);
              Array.isArray(Ce)
                ? (ue[he] = {
                    children: Ce.map(($e) => getRowIdentity($e, de)),
                    level: Oe,
                  })
                : i.value && (ue[he] = { children: [], lazy: !0, level: Oe });
            },
            $.value,
            y.value
          ),
          ue
        );
      },
      j = (
        le = !1,
        de = ((ue) =>
          (ue = k.store) == null ? void 0 : ue.states.defaultExpandAll.value)()
      ) => {
        var ue;
        const pe = V.value,
          Ce = L.value,
          Oe = Object.keys(pe),
          he = {};
        if (Oe.length) {
          const $e = unref(n),
            Ve = [],
            qe = (Pt, kt) => {
              if (le)
                return t.value
                  ? de || t.value.includes(kt)
                  : !!(de || (Pt != null && Pt.expanded));
              {
                const Fe = de || (t.value && t.value.includes(kt));
                return !!((Pt != null && Pt.expanded) || Fe);
              }
            };
          Oe.forEach((Pt) => {
            const kt = $e[Pt],
              Fe = { ...pe[Pt] };
            if (((Fe.expanded = qe(kt, Pt)), Fe.lazy)) {
              const { loaded: xe = !1, loading: Lt = !1 } = kt || {};
              (Fe.loaded = !!xe), (Fe.loading = !!Lt), Ve.push(Pt);
            }
            he[Pt] = Fe;
          });
          const Cn = Object.keys(Ce);
          i.value &&
            Cn.length &&
            Ve.length &&
            Cn.forEach((Pt) => {
              const kt = $e[Pt],
                Fe = Ce[Pt].children;
              if (Ve.includes(Pt)) {
                if (he[Pt].children.length !== 0)
                  throw new Error("[ElTable]children must be an empty array.");
                he[Pt].children = Fe;
              } else {
                const { loaded: xe = !1, loading: Lt = !1 } = kt || {};
                he[Pt] = {
                  lazy: !0,
                  loaded: !!xe,
                  loading: !!Lt,
                  expanded: qe(kt, Pt),
                  children: Fe,
                  level: "",
                };
              }
            });
        }
        (n.value = he), (ue = k.store) == null || ue.updateTableScrollY();
      };
    watch(
      () => t.value,
      () => {
        j(!0);
      }
    ),
      watch(
        () => V.value,
        () => {
          j();
        }
      ),
      watch(
        () => L.value,
        () => {
          j();
        }
      );
    const ae = (le) => {
        (t.value = le), j();
      },
      z = (le, de) => {
        k.store.assertRowKey();
        const ue = e.rowKey.value,
          pe = getRowIdentity(le, ue),
          Ce = pe && n.value[pe];
        if (pe && Ce && "expanded" in Ce) {
          const Oe = Ce.expanded;
          (de = typeof de > "u" ? !Ce.expanded : de),
            (n.value[pe].expanded = de),
            Oe !== de && k.emit("expand-change", le, de),
            k.store.updateTableScrollY();
        }
      },
      re = (le) => {
        k.store.assertRowKey();
        const de = e.rowKey.value,
          ue = getRowIdentity(le, de),
          pe = n.value[ue];
        i.value && pe && "loaded" in pe && !pe.loaded
          ? ie(le, ue, pe)
          : z(le, void 0);
      },
      ie = (le, de, ue) => {
        const { load: pe } = k.props;
        pe &&
          !n.value[de].loaded &&
          ((n.value[de].loading = !0),
          pe(le, ue, (Ce) => {
            if (!Array.isArray(Ce))
              throw new TypeError("[ElTable] data must be an array");
            (n.value[de].loading = !1),
              (n.value[de].loaded = !0),
              (n.value[de].expanded = !0),
              Ce.length && (g.value[de] = Ce),
              k.emit("expand-change", le, !0);
          }));
      };
    return {
      loadData: ie,
      loadOrToggle: re,
      toggleTreeExpansion: z,
      updateTreeExpandKeys: ae,
      updateTreeData: j,
      normalize: oe,
      states: {
        expandRowKeys: t,
        treeData: n,
        indent: r,
        lazy: i,
        lazyTreeNodeMap: g,
        lazyColumnIdentifier: y,
        childrenColumnName: $,
      },
    };
  }
  const sortData = (e, t) => {
      const n = t.sortingColumn;
      return !n || typeof n.sortable == "string"
        ? e
        : orderBy(e, t.sortProp, t.sortOrder, n.sortMethod, n.sortBy);
    },
    doFlattenColumns = (e) => {
      const t = [];
      return (
        e.forEach((n) => {
          n.children
            ? t.push.apply(t, doFlattenColumns(n.children))
            : t.push(n);
        }),
        t
      );
    };
  function useWatcher$1() {
    var e;
    const t = getCurrentInstance(),
      { size: n } = toRefs((e = t.proxy) == null ? void 0 : e.$props),
      r = ref(null),
      i = ref([]),
      g = ref([]),
      y = ref(!1),
      $ = ref([]),
      k = ref([]),
      V = ref([]),
      L = ref([]),
      oe = ref([]),
      j = ref([]),
      ae = ref([]),
      z = ref([]),
      re = ref(0),
      ie = ref(0),
      le = ref(0),
      de = ref(!1),
      ue = ref([]),
      pe = ref(!1),
      Ce = ref(!1),
      Oe = ref(null),
      he = ref({}),
      $e = ref(null),
      Ve = ref(null),
      qe = ref(null),
      Cn = ref(null),
      Pt = ref(null);
    watch(i, () => t.state && Lt(!1), { deep: !0 });
    const kt = () => {
        if (!r.value) throw new Error("[ElTable] prop row-key is required");
      },
      Fe = ($n) => {
        var An;
        (An = $n.children) == null ||
          An.forEach((Vn) => {
            (Vn.fixed = $n.fixed), Fe(Vn);
          });
      },
      xe = () => {
        $.value.forEach((jt) => {
          Fe(jt);
        }),
          (L.value = $.value.filter(
            (jt) => jt.fixed === !0 || jt.fixed === "left"
          )),
          (oe.value = $.value.filter((jt) => jt.fixed === "right")),
          L.value.length > 0 &&
            $.value[0] &&
            $.value[0].type === "selection" &&
            !$.value[0].fixed &&
            (($.value[0].fixed = !0), L.value.unshift($.value[0]));
        const $n = $.value.filter((jt) => !jt.fixed);
        k.value = [].concat(L.value).concat($n).concat(oe.value);
        const An = doFlattenColumns($n),
          Vn = doFlattenColumns(L.value),
          Ie = doFlattenColumns(oe.value);
        (re.value = An.length),
          (ie.value = Vn.length),
          (le.value = Ie.length),
          (V.value = [].concat(Vn).concat(An).concat(Ie)),
          (y.value = L.value.length > 0 || oe.value.length > 0);
      },
      Lt = ($n, An = !1) => {
        $n && xe(), An ? t.state.doLayout() : t.state.debouncedUpdateLayout();
      },
      At = ($n) => ue.value.includes($n),
      Ue = () => {
        (de.value = !1),
          ue.value.length && ((ue.value = []), t.emit("selection-change", []));
      },
      ze = () => {
        let $n;
        if (r.value) {
          $n = [];
          const An = getKeysMap(ue.value, r.value),
            Vn = getKeysMap(i.value, r.value);
          for (const Ie in An) hasOwn(An, Ie) && !Vn[Ie] && $n.push(An[Ie].row);
        } else $n = ue.value.filter((An) => !i.value.includes(An));
        if ($n.length) {
          const An = ue.value.filter((Vn) => !$n.includes(Vn));
          (ue.value = An), t.emit("selection-change", An.slice());
        }
      },
      Tn = () => (ue.value || []).slice(),
      Nn = ($n, An = void 0, Vn = !0) => {
        if (toggleRowStatus(ue.value, $n, An)) {
          const jt = (ue.value || []).slice();
          Vn && t.emit("select", jt, $n), t.emit("selection-change", jt);
        }
      },
      xn = () => {
        var $n, An;
        const Vn = Ce.value ? !de.value : !(de.value || ue.value.length);
        de.value = Vn;
        let Ie = !1,
          jt = 0;
        const Bn =
          (An =
            ($n = t == null ? void 0 : t.store) == null ? void 0 : $n.states) ==
          null
            ? void 0
            : An.rowKey.value;
        i.value.forEach((Pn, Wn) => {
          const Yn = Wn + jt;
          Oe.value
            ? Oe.value.call(null, Pn, Yn) &&
              toggleRowStatus(ue.value, Pn, Vn) &&
              (Ie = !0)
            : toggleRowStatus(ue.value, Pn, Vn) && (Ie = !0),
            (jt += Rn(getRowIdentity(Pn, Bn)));
        }),
          Ie && t.emit("selection-change", ue.value ? ue.value.slice() : []),
          t.emit("select-all", ue.value);
      },
      Mn = () => {
        const $n = getKeysMap(ue.value, r.value);
        i.value.forEach((An) => {
          const Vn = getRowIdentity(An, r.value),
            Ie = $n[Vn];
          Ie && (ue.value[Ie.index] = An);
        });
      },
      zn = () => {
        var $n, An, Vn;
        if ((($n = i.value) == null ? void 0 : $n.length) === 0) {
          de.value = !1;
          return;
        }
        let Ie;
        r.value && (Ie = getKeysMap(ue.value, r.value));
        const jt = function (Yn) {
          return Ie ? !!Ie[getRowIdentity(Yn, r.value)] : ue.value.includes(Yn);
        };
        let Bn = !0,
          Pn = 0,
          Wn = 0;
        for (let Yn = 0, Zn = (i.value || []).length; Yn < Zn; Yn++) {
          const Qn =
              (Vn =
                (An = t == null ? void 0 : t.store) == null
                  ? void 0
                  : An.states) == null
                ? void 0
                : Vn.rowKey.value,
            Jn = Yn + Wn,
            eo = i.value[Yn],
            Xn = Oe.value && Oe.value.call(null, eo, Jn);
          if (jt(eo)) Pn++;
          else if (!Oe.value || Xn) {
            Bn = !1;
            break;
          }
          Wn += Rn(getRowIdentity(eo, Qn));
        }
        Pn === 0 && (Bn = !1), (de.value = Bn);
      },
      Rn = ($n) => {
        var An;
        if (!t || !t.store) return 0;
        const { treeData: Vn } = t.store.states;
        let Ie = 0;
        const jt = (An = Vn.value[$n]) == null ? void 0 : An.children;
        return (
          jt &&
            ((Ie += jt.length),
            jt.forEach((Bn) => {
              Ie += Rn(Bn);
            })),
          Ie
        );
      },
      Ln = ($n, An) => {
        Array.isArray($n) || ($n = [$n]);
        const Vn = {};
        return (
          $n.forEach((Ie) => {
            (he.value[Ie.id] = An), (Vn[Ie.columnKey || Ie.id] = An);
          }),
          Vn
        );
      },
      jn = ($n, An, Vn) => {
        Ve.value && Ve.value !== $n && (Ve.value.order = null),
          (Ve.value = $n),
          (qe.value = An),
          (Cn.value = Vn);
      },
      Fn = () => {
        let $n = unref(g);
        Object.keys(he.value).forEach((An) => {
          const Vn = he.value[An];
          if (!Vn || Vn.length === 0) return;
          const Ie = getColumnById({ columns: V.value }, An);
          Ie &&
            Ie.filterMethod &&
            ($n = $n.filter((jt) =>
              Vn.some((Bn) => Ie.filterMethod.call(null, Bn, jt, Ie))
            ));
        }),
          ($e.value = $n);
      },
      Hn = () => {
        i.value = sortData($e.value, {
          sortingColumn: Ve.value,
          sortProp: qe.value,
          sortOrder: Cn.value,
        });
      },
      qn = ($n = void 0) => {
        ($n && $n.filter) || Fn(), Hn();
      },
      Gn = ($n) => {
        const { tableHeaderRef: An } = t.refs;
        if (!An) return;
        const Vn = Object.assign({}, An.filterPanels),
          Ie = Object.keys(Vn);
        if (Ie.length)
          if ((typeof $n == "string" && ($n = [$n]), Array.isArray($n))) {
            const jt = $n.map((Bn) => getColumnByKey({ columns: V.value }, Bn));
            Ie.forEach((Bn) => {
              const Pn = jt.find((Wn) => Wn.id === Bn);
              Pn && (Pn.filteredValue = []);
            }),
              t.store.commit("filterChange", {
                column: jt,
                values: [],
                silent: !0,
                multi: !0,
              });
          } else
            Ie.forEach((jt) => {
              const Bn = V.value.find((Pn) => Pn.id === jt);
              Bn && (Bn.filteredValue = []);
            }),
              (he.value = {}),
              t.store.commit("filterChange", {
                column: {},
                values: [],
                silent: !0,
              });
      },
      _e = () => {
        Ve.value &&
          (jn(null, null, null),
          t.store.commit("changeSortCondition", { silent: !0 }));
      },
      {
        setExpandRowKeys: Ne,
        toggleRowExpansion: Dt,
        updateExpandRows: vn,
        states: hn,
        isRowExpanded: Sn,
      } = useExpand({ data: i, rowKey: r }),
      {
        updateTreeExpandKeys: On,
        toggleTreeExpansion: _n,
        updateTreeData: wn,
        loadOrToggle: bn,
        states: Et,
      } = useTree({ data: i, rowKey: r }),
      {
        updateCurrentRowData: En,
        updateCurrentRow: kn,
        setCurrentRowKey: In,
        states: Dn,
      } = useCurrent({ data: i, rowKey: r });
    return {
      assertRowKey: kt,
      updateColumns: xe,
      scheduleLayout: Lt,
      isSelected: At,
      clearSelection: Ue,
      cleanSelection: ze,
      getSelectionRows: Tn,
      toggleRowSelection: Nn,
      _toggleAllSelection: xn,
      toggleAllSelection: null,
      updateSelectionByRowKey: Mn,
      updateAllSelected: zn,
      updateFilters: Ln,
      updateCurrentRow: kn,
      updateSort: jn,
      execFilter: Fn,
      execSort: Hn,
      execQuery: qn,
      clearFilter: Gn,
      clearSort: _e,
      toggleRowExpansion: Dt,
      setExpandRowKeysAdapter: ($n) => {
        Ne($n), On($n);
      },
      setCurrentRowKey: In,
      toggleRowExpansionAdapter: ($n, An) => {
        V.value.some(({ type: Ie }) => Ie === "expand")
          ? Dt($n, An)
          : _n($n, An);
      },
      isRowExpanded: Sn,
      updateExpandRows: vn,
      updateCurrentRowData: En,
      loadOrToggle: bn,
      updateTreeData: wn,
      states: {
        tableSize: n,
        rowKey: r,
        data: i,
        _data: g,
        isComplex: y,
        _columns: $,
        originColumns: k,
        columns: V,
        fixedColumns: L,
        rightFixedColumns: oe,
        leafColumns: j,
        fixedLeafColumns: ae,
        rightFixedLeafColumns: z,
        leafColumnsLength: re,
        fixedLeafColumnsLength: ie,
        rightFixedLeafColumnsLength: le,
        isAllSelected: de,
        selection: ue,
        reserveSelection: pe,
        selectOnIndeterminate: Ce,
        selectable: Oe,
        filters: he,
        filteredData: $e,
        sortingColumn: Ve,
        sortProp: qe,
        sortOrder: Cn,
        hoverRow: Pt,
        ...hn,
        ...Et,
        ...Dn,
      },
    };
  }
  function replaceColumn(e, t) {
    return e.map((n) => {
      var r;
      return n.id === t.id
        ? t
        : ((r = n.children) != null &&
            r.length &&
            (n.children = replaceColumn(n.children, t)),
          n);
    });
  }
  function sortColumn(e) {
    e.forEach((t) => {
      var n, r;
      (t.no = (n = t.getColumnIndex) == null ? void 0 : n.call(t)),
        (r = t.children) != null && r.length && sortColumn(t.children);
    }),
      e.sort((t, n) => t.no - n.no);
  }
  function useStore() {
    const e = getCurrentInstance(),
      t = useWatcher$1();
    return {
      ns: useNamespace("table"),
      ...t,
      mutations: {
        setData(y, $) {
          const k = unref(y._data) !== $;
          (y.data.value = $),
            (y._data.value = $),
            e.store.execQuery(),
            e.store.updateCurrentRowData(),
            e.store.updateExpandRows(),
            e.store.updateTreeData(e.store.states.defaultExpandAll.value),
            unref(y.reserveSelection)
              ? (e.store.assertRowKey(), e.store.updateSelectionByRowKey())
              : k
              ? e.store.clearSelection()
              : e.store.cleanSelection(),
            e.store.updateAllSelected(),
            e.$ready && e.store.scheduleLayout();
        },
        insertColumn(y, $, k) {
          const V = unref(y._columns);
          let L = [];
          k
            ? (k && !k.children && (k.children = []),
              k.children.push($),
              (L = replaceColumn(V, k)))
            : (V.push($), (L = V)),
            sortColumn(L),
            (y._columns.value = L),
            $.type === "selection" &&
              ((y.selectable.value = $.selectable),
              (y.reserveSelection.value = $.reserveSelection)),
            e.$ready && (e.store.updateColumns(), e.store.scheduleLayout());
        },
        removeColumn(y, $, k) {
          const V = unref(y._columns) || [];
          if (k)
            k.children.splice(
              k.children.findIndex((L) => L.id === $.id),
              1
            ),
              nextTick(() => {
                var L;
                ((L = k.children) == null ? void 0 : L.length) === 0 &&
                  delete k.children;
              }),
              (y._columns.value = replaceColumn(V, k));
          else {
            const L = V.indexOf($);
            L > -1 && (V.splice(L, 1), (y._columns.value = V));
          }
          e.$ready && (e.store.updateColumns(), e.store.scheduleLayout());
        },
        sort(y, $) {
          const { prop: k, order: V, init: L } = $;
          if (k) {
            const oe = unref(y.columns).find((j) => j.property === k);
            oe &&
              ((oe.order = V),
              e.store.updateSort(oe, k, V),
              e.store.commit("changeSortCondition", { init: L }));
          }
        },
        changeSortCondition(y, $) {
          const { sortingColumn: k, sortProp: V, sortOrder: L } = y,
            oe = unref(k),
            j = unref(V),
            ae = unref(L);
          ae === null &&
            ((y.sortingColumn.value = null), (y.sortProp.value = null));
          const z = { filter: !0 };
          e.store.execQuery(z),
            (!$ || !($.silent || $.init)) &&
              e.emit("sort-change", { column: oe, prop: j, order: ae }),
            e.store.updateTableScrollY();
        },
        filterChange(y, $) {
          const { column: k, values: V, silent: L } = $,
            oe = e.store.updateFilters(k, V);
          e.store.execQuery(),
            L || e.emit("filter-change", oe),
            e.store.updateTableScrollY();
        },
        toggleAllSelection() {
          e.store.toggleAllSelection();
        },
        rowSelectedChanged(y, $) {
          e.store.toggleRowSelection($), e.store.updateAllSelected();
        },
        setHoverRow(y, $) {
          y.hoverRow.value = $;
        },
        setCurrentRow(y, $) {
          e.store.updateCurrentRow($);
        },
      },
      commit: function (y, ...$) {
        const k = e.store.mutations;
        if (k[y]) k[y].apply(e, [e.store.states].concat($));
        else throw new Error(`Action not found: ${y}`);
      },
      updateTableScrollY: function () {
        nextTick(() => e.layout.updateScrollY.apply(e.layout));
      },
    };
  }
  const InitialStateMap = {
    rowKey: "rowKey",
    defaultExpandAll: "defaultExpandAll",
    selectOnIndeterminate: "selectOnIndeterminate",
    indent: "indent",
    lazy: "lazy",
    data: "data",
    ["treeProps.hasChildren"]: {
      key: "lazyColumnIdentifier",
      default: "hasChildren",
    },
    ["treeProps.children"]: { key: "childrenColumnName", default: "children" },
  };
  function createStore(e, t) {
    if (!e) throw new Error("Table is required.");
    const n = useStore();
    return (
      (n.toggleAllSelection = debounce(n._toggleAllSelection, 10)),
      Object.keys(InitialStateMap).forEach((r) => {
        handleValue(getArrKeysValue(t, r), r, n);
      }),
      proxyTableProps(n, t),
      n
    );
  }
  function proxyTableProps(e, t) {
    Object.keys(InitialStateMap).forEach((n) => {
      watch(
        () => getArrKeysValue(t, n),
        (r) => {
          handleValue(r, n, e);
        }
      );
    });
  }
  function handleValue(e, t, n) {
    let r = e,
      i = InitialStateMap[t];
    typeof InitialStateMap[t] == "object" &&
      ((i = i.key), (r = r || InitialStateMap[t].default)),
      (n.states[i].value = r);
  }
  function getArrKeysValue(e, t) {
    if (t.includes(".")) {
      const n = t.split(".");
      let r = e;
      return (
        n.forEach((i) => {
          r = r[i];
        }),
        r
      );
    } else return e[t];
  }
  class TableLayout {
    constructor(t) {
      (this.observers = []),
        (this.table = null),
        (this.store = null),
        (this.columns = []),
        (this.fit = !0),
        (this.showHeader = !0),
        (this.height = ref(null)),
        (this.scrollX = ref(!1)),
        (this.scrollY = ref(!1)),
        (this.bodyWidth = ref(null)),
        (this.fixedWidth = ref(null)),
        (this.rightFixedWidth = ref(null)),
        (this.gutterWidth = 0);
      for (const n in t)
        hasOwn(t, n) &&
          (isRef(this[n]) ? (this[n].value = t[n]) : (this[n] = t[n]));
      if (!this.table) throw new Error("Table is required for Table Layout");
      if (!this.store) throw new Error("Store is required for Table Layout");
    }
    updateScrollY() {
      if (this.height.value === null) return !1;
      const n = this.table.refs.scrollBarRef;
      if (this.table.vnode.el && n) {
        let r = !0;
        const i = this.scrollY.value;
        return (
          (r = n.wrapRef.scrollHeight > n.wrapRef.clientHeight),
          (this.scrollY.value = r),
          i !== r
        );
      }
      return !1;
    }
    setHeight(t, n = "height") {
      if (!isClient$1) return;
      const r = this.table.vnode.el;
      if (
        ((t = parseHeight(t)),
        (this.height.value = Number(t)),
        !r && (t || t === 0))
      )
        return nextTick(() => this.setHeight(t, n));
      typeof t == "number"
        ? ((r.style[n] = `${t}px`), this.updateElsHeight())
        : typeof t == "string" && ((r.style[n] = t), this.updateElsHeight());
    }
    setMaxHeight(t) {
      this.setHeight(t, "max-height");
    }
    getFlattenColumns() {
      const t = [];
      return (
        this.table.store.states.columns.value.forEach((r) => {
          r.isColumnGroup ? t.push.apply(t, r.columns) : t.push(r);
        }),
        t
      );
    }
    updateElsHeight() {
      this.updateScrollY(), this.notifyObservers("scrollable");
    }
    headerDisplayNone(t) {
      if (!t) return !0;
      let n = t;
      for (; n.tagName !== "DIV"; ) {
        if (getComputedStyle(n).display === "none") return !0;
        n = n.parentElement;
      }
      return !1;
    }
    updateColumnsWidth() {
      if (!isClient$1) return;
      const t = this.fit,
        n = this.table.vnode.el.clientWidth;
      let r = 0;
      const i = this.getFlattenColumns(),
        g = i.filter((k) => typeof k.width != "number");
      if (
        (i.forEach((k) => {
          typeof k.width == "number" && k.realWidth && (k.realWidth = null);
        }),
        g.length > 0 && t)
      ) {
        if (
          (i.forEach((k) => {
            r += Number(k.width || k.minWidth || 80);
          }),
          r <= n)
        ) {
          this.scrollX.value = !1;
          const k = n - r;
          if (g.length === 1) g[0].realWidth = Number(g[0].minWidth || 80) + k;
          else {
            const V = g.reduce((j, ae) => j + Number(ae.minWidth || 80), 0),
              L = k / V;
            let oe = 0;
            g.forEach((j, ae) => {
              if (ae === 0) return;
              const z = Math.floor(Number(j.minWidth || 80) * L);
              (oe += z), (j.realWidth = Number(j.minWidth || 80) + z);
            }),
              (g[0].realWidth = Number(g[0].minWidth || 80) + k - oe);
          }
        } else
          (this.scrollX.value = !0),
            g.forEach((k) => {
              k.realWidth = Number(k.minWidth);
            });
        (this.bodyWidth.value = Math.max(r, n)),
          (this.table.state.resizeState.value.width = this.bodyWidth.value);
      } else
        i.forEach((k) => {
          !k.width && !k.minWidth
            ? (k.realWidth = 80)
            : (k.realWidth = Number(k.width || k.minWidth)),
            (r += k.realWidth);
        }),
          (this.scrollX.value = r > n),
          (this.bodyWidth.value = r);
      const y = this.store.states.fixedColumns.value;
      if (y.length > 0) {
        let k = 0;
        y.forEach((V) => {
          k += Number(V.realWidth || V.width);
        }),
          (this.fixedWidth.value = k);
      }
      const $ = this.store.states.rightFixedColumns.value;
      if ($.length > 0) {
        let k = 0;
        $.forEach((V) => {
          k += Number(V.realWidth || V.width);
        }),
          (this.rightFixedWidth.value = k);
      }
      this.notifyObservers("columns");
    }
    addObserver(t) {
      this.observers.push(t);
    }
    removeObserver(t) {
      const n = this.observers.indexOf(t);
      n !== -1 && this.observers.splice(n, 1);
    }
    notifyObservers(t) {
      this.observers.forEach((r) => {
        var i, g;
        switch (t) {
          case "columns":
            (i = r.state) == null || i.onColumnsChange(this);
            break;
          case "scrollable":
            (g = r.state) == null || g.onScrollableChange(this);
            break;
          default:
            throw new Error(`Table Layout don't have event ${t}.`);
        }
      });
    }
  }
  const { CheckboxGroup: ElCheckboxGroup } = ElCheckbox,
    _sfc_main$5 = defineComponent({
      name: "ElTableFilterPanel",
      components: {
        ElCheckbox,
        ElCheckboxGroup,
        ElScrollbar,
        ElTooltip,
        ElIcon,
        ArrowDown: arrow_down_default,
        ArrowUp: arrow_up_default,
      },
      directives: { ClickOutside },
      props: {
        placement: { type: String, default: "bottom-start" },
        store: { type: Object },
        column: { type: Object },
        upDataColumn: { type: Function },
      },
      setup(e) {
        const t = getCurrentInstance(),
          { t: n } = useLocale(),
          r = useNamespace("table-filter"),
          i = t == null ? void 0 : t.parent;
        i.filterPanels.value[e.column.id] ||
          (i.filterPanels.value[e.column.id] = t);
        const g = ref(!1),
          y = ref(null),
          $ = computed(() => e.column && e.column.filters),
          k = computed({
            get: () => {
              var pe;
              return (((pe = e.column) == null ? void 0 : pe.filteredValue) ||
                [])[0];
            },
            set: (pe) => {
              V.value &&
                (typeof pe < "u" && pe !== null
                  ? V.value.splice(0, 1, pe)
                  : V.value.splice(0, 1));
            },
          }),
          V = computed({
            get() {
              return e.column ? e.column.filteredValue || [] : [];
            },
            set(pe) {
              e.column && e.upDataColumn("filteredValue", pe);
            },
          }),
          L = computed(() => (e.column ? e.column.filterMultiple : !0)),
          oe = (pe) => pe.value === k.value,
          j = () => {
            g.value = !1;
          },
          ae = (pe) => {
            pe.stopPropagation(), (g.value = !g.value);
          },
          z = () => {
            g.value = !1;
          },
          re = () => {
            de(V.value), j();
          },
          ie = () => {
            (V.value = []), de(V.value), j();
          },
          le = (pe) => {
            (k.value = pe),
              de(typeof pe < "u" && pe !== null ? V.value : []),
              j();
          },
          de = (pe) => {
            e.store.commit("filterChange", { column: e.column, values: pe }),
              e.store.updateAllSelected();
          };
        watch(
          g,
          (pe) => {
            e.column && e.upDataColumn("filterOpened", pe);
          },
          { immediate: !0 }
        );
        const ue = computed(() => {
          var pe, Ce;
          return (Ce = (pe = y.value) == null ? void 0 : pe.popperRef) == null
            ? void 0
            : Ce.contentRef;
        });
        return {
          tooltipVisible: g,
          multiple: L,
          filteredValue: V,
          filterValue: k,
          filters: $,
          handleConfirm: re,
          handleReset: ie,
          handleSelect: le,
          isActive: oe,
          t: n,
          ns: r,
          showFilterPanel: ae,
          hideFilterPanel: z,
          popperPaneRef: ue,
          tooltip: y,
        };
      },
    }),
    _hoisted_1$3 = { key: 0 },
    _hoisted_2$4 = ["disabled"],
    _hoisted_3$2 = ["label", "onClick"];
  function _sfc_render$2(e, t, n, r, i, g) {
    const y = resolveComponent("el-checkbox"),
      $ = resolveComponent("el-checkbox-group"),
      k = resolveComponent("el-scrollbar"),
      V = resolveComponent("arrow-up"),
      L = resolveComponent("arrow-down"),
      oe = resolveComponent("el-icon"),
      j = resolveComponent("el-tooltip"),
      ae = resolveDirective("click-outside");
    return (
      openBlock(),
      createBlock(
        j,
        {
          ref: "tooltip",
          visible: e.tooltipVisible,
          offset: 0,
          placement: e.placement,
          "show-arrow": !1,
          "stop-popper-mouse-event": !1,
          teleported: "",
          effect: "light",
          pure: "",
          "popper-class": e.ns.b(),
          persistent: "",
        },
        {
          content: withCtx(() => [
            e.multiple
              ? (openBlock(),
                createElementBlock("div", _hoisted_1$3, [
                  createBaseVNode(
                    "div",
                    { class: normalizeClass(e.ns.e("content")) },
                    [
                      createVNode(
                        k,
                        { "wrap-class": e.ns.e("wrap") },
                        {
                          default: withCtx(() => [
                            createVNode(
                              $,
                              {
                                modelValue: e.filteredValue,
                                "onUpdate:modelValue":
                                  t[0] || (t[0] = (z) => (e.filteredValue = z)),
                                class: normalizeClass(e.ns.e("checkbox-group")),
                              },
                              {
                                default: withCtx(() => [
                                  (openBlock(!0),
                                  createElementBlock(
                                    Fragment,
                                    null,
                                    renderList(
                                      e.filters,
                                      (z) => (
                                        openBlock(),
                                        createBlock(
                                          y,
                                          { key: z.value, label: z.value },
                                          {
                                            default: withCtx(() => [
                                              createTextVNode(
                                                toDisplayString(z.text),
                                                1
                                              ),
                                            ]),
                                            _: 2,
                                          },
                                          1032,
                                          ["label"]
                                        )
                                      )
                                    ),
                                    128
                                  )),
                                ]),
                                _: 1,
                              },
                              8,
                              ["modelValue", "class"]
                            ),
                          ]),
                          _: 1,
                        },
                        8,
                        ["wrap-class"]
                      ),
                    ],
                    2
                  ),
                  createBaseVNode(
                    "div",
                    { class: normalizeClass(e.ns.e("bottom")) },
                    [
                      createBaseVNode(
                        "button",
                        {
                          class: normalizeClass({
                            [e.ns.is("disabled")]: e.filteredValue.length === 0,
                          }),
                          disabled: e.filteredValue.length === 0,
                          type: "button",
                          onClick:
                            t[1] ||
                            (t[1] = (...z) =>
                              e.handleConfirm && e.handleConfirm(...z)),
                        },
                        toDisplayString(e.t("el.table.confirmFilter")),
                        11,
                        _hoisted_2$4
                      ),
                      createBaseVNode(
                        "button",
                        {
                          type: "button",
                          onClick:
                            t[2] ||
                            (t[2] = (...z) =>
                              e.handleReset && e.handleReset(...z)),
                        },
                        toDisplayString(e.t("el.table.resetFilter")),
                        1
                      ),
                    ],
                    2
                  ),
                ]))
              : (openBlock(),
                createElementBlock(
                  "ul",
                  { key: 1, class: normalizeClass(e.ns.e("list")) },
                  [
                    createBaseVNode(
                      "li",
                      {
                        class: normalizeClass([
                          e.ns.e("list-item"),
                          {
                            [e.ns.is("active")]:
                              e.filterValue === void 0 ||
                              e.filterValue === null,
                          },
                        ]),
                        onClick: t[3] || (t[3] = (z) => e.handleSelect(null)),
                      },
                      toDisplayString(e.t("el.table.clearFilter")),
                      3
                    ),
                    (openBlock(!0),
                    createElementBlock(
                      Fragment,
                      null,
                      renderList(
                        e.filters,
                        (z) => (
                          openBlock(),
                          createElementBlock(
                            "li",
                            {
                              key: z.value,
                              class: normalizeClass([
                                e.ns.e("list-item"),
                                e.ns.is("active", e.isActive(z)),
                              ]),
                              label: z.value,
                              onClick: (re) => e.handleSelect(z.value),
                            },
                            toDisplayString(z.text),
                            11,
                            _hoisted_3$2
                          )
                        )
                      ),
                      128
                    )),
                  ],
                  2
                )),
          ]),
          default: withCtx(() => [
            withDirectives(
              (openBlock(),
              createElementBlock(
                "span",
                {
                  class: normalizeClass([
                    `${e.ns.namespace.value}-table__column-filter-trigger`,
                    `${e.ns.namespace.value}-none-outline`,
                  ]),
                  onClick:
                    t[4] ||
                    (t[4] = (...z) =>
                      e.showFilterPanel && e.showFilterPanel(...z)),
                },
                [
                  createVNode(oe, null, {
                    default: withCtx(() => [
                      e.column.filterOpened
                        ? (openBlock(), createBlock(V, { key: 0 }))
                        : (openBlock(), createBlock(L, { key: 1 })),
                    ]),
                    _: 1,
                  }),
                ],
                2
              )),
              [[ae, e.hideFilterPanel, e.popperPaneRef]]
            ),
          ]),
          _: 1,
        },
        8,
        ["visible", "placement", "popper-class"]
      )
    );
  }
  var FilterPanel = _export_sfc$1(_sfc_main$5, [
    ["render", _sfc_render$2],
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/table/src/filter-panel.vue",
    ],
  ]);
  function useLayoutObserver(e) {
    const t = getCurrentInstance();
    onBeforeMount(() => {
      n.value.addObserver(t);
    }),
      onMounted(() => {
        r(n.value), i(n.value);
      }),
      onUpdated(() => {
        r(n.value), i(n.value);
      }),
      onUnmounted(() => {
        n.value.removeObserver(t);
      });
    const n = computed(() => {
        const g = e.layout;
        if (!g) throw new Error("Can not find table layout.");
        return g;
      }),
      r = (g) => {
        var y;
        const $ =
          ((y = e.vnode.el) == null
            ? void 0
            : y.querySelectorAll("colgroup > col")) || [];
        if (!$.length) return;
        const k = g.getFlattenColumns(),
          V = {};
        k.forEach((L) => {
          V[L.id] = L;
        });
        for (let L = 0, oe = $.length; L < oe; L++) {
          const j = $[L],
            ae = j.getAttribute("name"),
            z = V[ae];
          z && j.setAttribute("width", z.realWidth || z.width);
        }
      },
      i = (g) => {
        var y, $;
        const k =
          ((y = e.vnode.el) == null
            ? void 0
            : y.querySelectorAll("colgroup > col[name=gutter]")) || [];
        for (let L = 0, oe = k.length; L < oe; L++)
          k[L].setAttribute("width", g.scrollY.value ? g.gutterWidth : "0");
        const V =
          (($ = e.vnode.el) == null
            ? void 0
            : $.querySelectorAll("th.gutter")) || [];
        for (let L = 0, oe = V.length; L < oe; L++) {
          const j = V[L];
          (j.style.width = g.scrollY.value ? `${g.gutterWidth}px` : "0"),
            (j.style.display = g.scrollY.value ? "" : "none");
        }
      };
    return { tableLayout: n.value, onColumnsChange: r, onScrollableChange: i };
  }
  const TABLE_INJECTION_KEY = Symbol("ElTable");
  function useEvent(e, t) {
    const n = getCurrentInstance(),
      r = inject(TABLE_INJECTION_KEY),
      i = (re) => {
        re.stopPropagation();
      },
      g = (re, ie) => {
        !ie.filters && ie.sortable
          ? z(re, ie, !1)
          : ie.filterable && !ie.sortable && i(re),
          r == null || r.emit("header-click", ie, re);
      },
      y = (re, ie) => {
        r == null || r.emit("header-contextmenu", ie, re);
      },
      $ = ref(null),
      k = ref(!1),
      V = ref({}),
      L = (re, ie) => {
        if (
          isClient$1 &&
          !(ie.children && ie.children.length > 0) &&
          $.value &&
          e.border
        ) {
          k.value = !0;
          const le = r;
          t("set-drag-visible", !0);
          const ue = (le == null ? void 0 : le.vnode.el).getBoundingClientRect()
              .left,
            pe = n.vnode.el.querySelector(`th.${ie.id}`),
            Ce = pe.getBoundingClientRect(),
            Oe = Ce.left - ue + 30;
          addClass(pe, "noclick"),
            (V.value = {
              startMouseLeft: re.clientX,
              startLeft: Ce.right - ue,
              startColumnLeft: Ce.left - ue,
              tableLeft: ue,
            });
          const he = le == null ? void 0 : le.refs.resizeProxy;
          (he.style.left = `${V.value.startLeft}px`),
            (document.onselectstart = function () {
              return !1;
            }),
            (document.ondragstart = function () {
              return !1;
            });
          const $e = (qe) => {
              const Cn = qe.clientX - V.value.startMouseLeft,
                Pt = V.value.startLeft + Cn;
              he.style.left = `${Math.max(Oe, Pt)}px`;
            },
            Ve = () => {
              if (k.value) {
                const { startColumnLeft: qe, startLeft: Cn } = V.value,
                  kt = Number.parseInt(he.style.left, 10) - qe;
                (ie.width = ie.realWidth = kt),
                  le == null ||
                    le.emit("header-dragend", ie.width, Cn - qe, ie, re),
                  requestAnimationFrame(() => {
                    e.store.scheduleLayout(!1, !0);
                  }),
                  (document.body.style.cursor = ""),
                  (k.value = !1),
                  ($.value = null),
                  (V.value = {}),
                  t("set-drag-visible", !1);
              }
              document.removeEventListener("mousemove", $e),
                document.removeEventListener("mouseup", Ve),
                (document.onselectstart = null),
                (document.ondragstart = null),
                setTimeout(() => {
                  removeClass(pe, "noclick");
                }, 0);
            };
          document.addEventListener("mousemove", $e),
            document.addEventListener("mouseup", Ve);
        }
      },
      oe = (re, ie) => {
        var le;
        if (ie.children && ie.children.length > 0) return;
        const de = (le = re.target) == null ? void 0 : le.closest("th");
        if (!(!ie || !ie.resizable) && !k.value && e.border) {
          const ue = de.getBoundingClientRect(),
            pe = document.body.style;
          ue.width > 12 && ue.right - re.pageX < 8
            ? ((pe.cursor = "col-resize"),
              hasClass(de, "is-sortable") && (de.style.cursor = "col-resize"),
              ($.value = ie))
            : k.value ||
              ((pe.cursor = ""),
              hasClass(de, "is-sortable") && (de.style.cursor = "pointer"),
              ($.value = null));
        }
      },
      j = () => {
        isClient$1 && (document.body.style.cursor = "");
      },
      ae = ({ order: re, sortOrders: ie }) => {
        if (re === "") return ie[0];
        const le = ie.indexOf(re || null);
        return ie[le > ie.length - 2 ? 0 : le + 1];
      },
      z = (re, ie, le) => {
        var de;
        re.stopPropagation();
        const ue = ie.order === le ? null : le || ae(ie),
          pe = (de = re.target) == null ? void 0 : de.closest("th");
        if (pe && hasClass(pe, "noclick")) {
          removeClass(pe, "noclick");
          return;
        }
        if (!ie.sortable) return;
        const Ce = e.store.states;
        let Oe = Ce.sortProp.value,
          he;
        const $e = Ce.sortingColumn.value;
        ($e !== ie || ($e === ie && $e.order === null)) &&
          ($e && ($e.order = null),
          (Ce.sortingColumn.value = ie),
          (Oe = ie.property)),
          ue ? (he = ie.order = ue) : (he = ie.order = null),
          (Ce.sortProp.value = Oe),
          (Ce.sortOrder.value = he),
          r == null || r.store.commit("changeSortCondition");
      };
    return {
      handleHeaderClick: g,
      handleHeaderContextMenu: y,
      handleMouseDown: L,
      handleMouseMove: oe,
      handleMouseOut: j,
      handleSortClick: z,
      handleFilterClick: i,
    };
  }
  function useStyle$2(e) {
    const t = inject(TABLE_INJECTION_KEY),
      n = useNamespace("table");
    return {
      getHeaderRowStyle: ($) => {
        const k = t == null ? void 0 : t.props.headerRowStyle;
        return typeof k == "function" ? k.call(null, { rowIndex: $ }) : k;
      },
      getHeaderRowClass: ($) => {
        const k = [],
          V = t == null ? void 0 : t.props.headerRowClassName;
        return (
          typeof V == "string"
            ? k.push(V)
            : typeof V == "function" && k.push(V.call(null, { rowIndex: $ })),
          k.join(" ")
        );
      },
      getHeaderCellStyle: ($, k, V, L) => {
        var oe;
        let j =
          (oe = t == null ? void 0 : t.props.headerCellStyle) != null ? oe : {};
        typeof j == "function" &&
          (j = j.call(null, {
            rowIndex: $,
            columnIndex: k,
            row: V,
            column: L,
          }));
        const ae = getFixedColumnOffset(k, L.fixed, e.store, V);
        return (
          ensurePosition(ae, "left"),
          ensurePosition(ae, "right"),
          Object.assign({}, j, ae)
        );
      },
      getHeaderCellClass: ($, k, V, L) => {
        const oe = getFixedColumnsClass(n.b(), k, L.fixed, e.store, V),
          j = [
            L.id,
            L.order,
            L.headerAlign,
            L.className,
            L.labelClassName,
            ...oe,
          ];
        L.children || j.push("is-leaf"), L.sortable && j.push("is-sortable");
        const ae = t == null ? void 0 : t.props.headerCellClassName;
        return (
          typeof ae == "string"
            ? j.push(ae)
            : typeof ae == "function" &&
              j.push(
                ae.call(null, {
                  rowIndex: $,
                  columnIndex: k,
                  row: V,
                  column: L,
                })
              ),
          j.push(n.e("cell")),
          j.filter((z) => Boolean(z)).join(" ")
        );
      },
    };
  }
  const getAllColumns = (e) => {
      const t = [];
      return (
        e.forEach((n) => {
          n.children
            ? (t.push(n), t.push.apply(t, getAllColumns(n.children)))
            : t.push(n);
        }),
        t
      );
    },
    convertToRows = (e) => {
      let t = 1;
      const n = (g, y) => {
        if (
          (y && ((g.level = y.level + 1), t < g.level && (t = g.level)),
          g.children)
        ) {
          let $ = 0;
          g.children.forEach((k) => {
            n(k, g), ($ += k.colSpan);
          }),
            (g.colSpan = $);
        } else g.colSpan = 1;
      };
      e.forEach((g) => {
        (g.level = 1), n(g, void 0);
      });
      const r = [];
      for (let g = 0; g < t; g++) r.push([]);
      return (
        getAllColumns(e).forEach((g) => {
          g.children
            ? ((g.rowSpan = 1), g.children.forEach((y) => (y.isSubColumn = !0)))
            : (g.rowSpan = t - g.level + 1),
            r[g.level - 1].push(g);
        }),
        r
      );
    };
  function useUtils$1(e) {
    const t = inject(TABLE_INJECTION_KEY),
      n = computed(() => convertToRows(e.store.states.originColumns.value));
    return {
      isGroup: computed(() => {
        const g = n.value.length > 1;
        return g && t && (t.state.isGroup.value = !0), g;
      }),
      toggleAllSelection: (g) => {
        g.stopPropagation(), t == null || t.store.commit("toggleAllSelection");
      },
      columnRows: n,
    };
  }
  var TableHeader = defineComponent({
    name: "ElTableHeader",
    components: { ElCheckbox },
    props: {
      fixed: { type: String, default: "" },
      store: { required: !0, type: Object },
      border: Boolean,
      defaultSort: { type: Object, default: () => ({ prop: "", order: "" }) },
    },
    setup(e, { emit: t }) {
      const n = getCurrentInstance(),
        r = inject(TABLE_INJECTION_KEY),
        i = useNamespace("table"),
        g = ref({}),
        { onColumnsChange: y, onScrollableChange: $ } = useLayoutObserver(r);
      onMounted(async () => {
        await nextTick(), await nextTick();
        const { prop: Oe, order: he } = e.defaultSort;
        r == null || r.store.commit("sort", { prop: Oe, order: he, init: !0 });
      });
      const {
          handleHeaderClick: k,
          handleHeaderContextMenu: V,
          handleMouseDown: L,
          handleMouseMove: oe,
          handleMouseOut: j,
          handleSortClick: ae,
          handleFilterClick: z,
        } = useEvent(e, t),
        {
          getHeaderRowStyle: re,
          getHeaderRowClass: ie,
          getHeaderCellStyle: le,
          getHeaderCellClass: de,
        } = useStyle$2(e),
        { isGroup: ue, toggleAllSelection: pe, columnRows: Ce } = useUtils$1(e);
      return (
        (n.state = { onColumnsChange: y, onScrollableChange: $ }),
        (n.filterPanels = g),
        {
          ns: i,
          filterPanels: g,
          onColumnsChange: y,
          onScrollableChange: $,
          columnRows: Ce,
          getHeaderRowClass: ie,
          getHeaderRowStyle: re,
          getHeaderCellClass: de,
          getHeaderCellStyle: le,
          handleHeaderClick: k,
          handleHeaderContextMenu: V,
          handleMouseDown: L,
          handleMouseMove: oe,
          handleMouseOut: j,
          handleSortClick: ae,
          handleFilterClick: z,
          isGroup: ue,
          toggleAllSelection: pe,
        }
      );
    },
    render() {
      const {
        ns: e,
        isGroup: t,
        columnRows: n,
        getHeaderCellStyle: r,
        getHeaderCellClass: i,
        getHeaderRowClass: g,
        getHeaderRowStyle: y,
        handleHeaderClick: $,
        handleHeaderContextMenu: k,
        handleMouseDown: V,
        handleMouseMove: L,
        handleSortClick: oe,
        handleMouseOut: j,
        store: ae,
        $parent: z,
      } = this;
      let re = 1;
      return h$1(
        "thead",
        { class: { [e.is("group")]: t } },
        n.map((ie, le) =>
          h$1(
            "tr",
            { class: g(le), key: le, style: y(le) },
            ie.map(
              (de, ue) => (
                de.rowSpan > re && (re = de.rowSpan),
                h$1(
                  "th",
                  {
                    class: i(le, ue, ie, de),
                    colspan: de.colSpan,
                    key: `${de.id}-thead`,
                    rowspan: de.rowSpan,
                    style: r(le, ue, ie, de),
                    onClick: (pe) => $(pe, de),
                    onContextmenu: (pe) => k(pe, de),
                    onMousedown: (pe) => V(pe, de),
                    onMousemove: (pe) => L(pe, de),
                    onMouseout: j,
                  },
                  [
                    h$1(
                      "div",
                      {
                        class: [
                          "cell",
                          de.filteredValue && de.filteredValue.length > 0
                            ? "highlight"
                            : "",
                        ],
                      },
                      [
                        de.renderHeader
                          ? de.renderHeader({
                              column: de,
                              $index: ue,
                              store: ae,
                              _self: z,
                            })
                          : de.label,
                        de.sortable &&
                          h$1(
                            "span",
                            {
                              onClick: (pe) => oe(pe, de),
                              class: "caret-wrapper",
                            },
                            [
                              h$1("i", {
                                onClick: (pe) => oe(pe, de, "ascending"),
                                class: "sort-caret ascending",
                              }),
                              h$1("i", {
                                onClick: (pe) => oe(pe, de, "descending"),
                                class: "sort-caret descending",
                              }),
                            ]
                          ),
                        de.filterable &&
                          h$1(FilterPanel, {
                            store: ae,
                            placement: de.filterPlacement || "bottom-start",
                            column: de,
                            upDataColumn: (pe, Ce) => {
                              de[pe] = Ce;
                            },
                          }),
                      ]
                    ),
                  ]
                )
              )
            )
          )
        )
      );
    },
  });
  function useEvents(e) {
    const t = inject(TABLE_INJECTION_KEY),
      n = ref(""),
      r = ref(h$1("div")),
      i = (j, ae, z) => {
        var re;
        const ie = t,
          le = getCell(j);
        let de;
        const ue =
          (re = ie == null ? void 0 : ie.vnode.el) == null
            ? void 0
            : re.dataset.prefix;
        le &&
          ((de = getColumnByCell(
            { columns: e.store.states.columns.value },
            le,
            ue
          )),
          de && (ie == null || ie.emit(`cell-${z}`, ae, de, le, j))),
          ie == null || ie.emit(`row-${z}`, ae, de, j);
      },
      g = (j, ae) => {
        i(j, ae, "dblclick");
      },
      y = (j, ae) => {
        e.store.commit("setCurrentRow", ae), i(j, ae, "click");
      },
      $ = (j, ae) => {
        i(j, ae, "contextmenu");
      },
      k = debounce((j) => {
        e.store.commit("setHoverRow", j);
      }, 30),
      V = debounce(() => {
        e.store.commit("setHoverRow", null);
      }, 30);
    return {
      handleDoubleClick: g,
      handleClick: y,
      handleContextMenu: $,
      handleMouseEnter: k,
      handleMouseLeave: V,
      handleCellMouseEnter: (j, ae, z) => {
        var re;
        const ie = t,
          le = getCell(j),
          de =
            (re = ie == null ? void 0 : ie.vnode.el) == null
              ? void 0
              : re.dataset.prefix;
        if (le) {
          const he = getColumnByCell(
              { columns: e.store.states.columns.value },
              le,
              de
            ),
            $e = (ie.hoverState = { cell: le, column: he, row: ae });
          ie == null ||
            ie.emit("cell-mouse-enter", $e.row, $e.column, $e.cell, j);
        }
        const ue = j.target.querySelector(".cell");
        if (!(hasClass(ue, `${de}-tooltip`) && ue.childNodes.length)) return;
        const pe = document.createRange();
        pe.setStart(ue, 0), pe.setEnd(ue, ue.childNodes.length);
        const Ce = Math.round(pe.getBoundingClientRect().width),
          Oe =
            (Number.parseInt(getStyle(ue, "paddingLeft"), 10) || 0) +
            (Number.parseInt(getStyle(ue, "paddingRight"), 10) || 0);
        (Ce + Oe > ue.offsetWidth || ue.scrollWidth > ue.offsetWidth) &&
          createTablePopper(
            t == null ? void 0 : t.refs.tableWrapper,
            le,
            le.innerText || le.textContent,
            { placement: "top", strategy: "fixed" },
            z
          );
      },
      handleCellMouseLeave: (j) => {
        if (!getCell(j)) return;
        const z = t == null ? void 0 : t.hoverState;
        t == null ||
          t.emit(
            "cell-mouse-leave",
            z == null ? void 0 : z.row,
            z == null ? void 0 : z.column,
            z == null ? void 0 : z.cell,
            j
          );
      },
      tooltipContent: n,
      tooltipTrigger: r,
    };
  }
  function useStyles(e) {
    const t = inject(TABLE_INJECTION_KEY),
      n = useNamespace("table");
    return {
      getRowStyle: (V, L) => {
        const oe = t == null ? void 0 : t.props.rowStyle;
        return typeof oe == "function"
          ? oe.call(null, { row: V, rowIndex: L })
          : oe || null;
      },
      getRowClass: (V, L) => {
        const oe = [n.e("row")];
        t != null &&
          t.props.highlightCurrentRow &&
          V === e.store.states.currentRow.value &&
          oe.push("current-row"),
          e.stripe && L % 2 === 1 && oe.push(n.em("row", "striped"));
        const j = t == null ? void 0 : t.props.rowClassName;
        return (
          typeof j == "string"
            ? oe.push(j)
            : typeof j == "function" &&
              oe.push(j.call(null, { row: V, rowIndex: L })),
          oe
        );
      },
      getCellStyle: (V, L, oe, j) => {
        const ae = t == null ? void 0 : t.props.cellStyle;
        let z = ae ?? {};
        typeof ae == "function" &&
          (z = ae.call(null, {
            rowIndex: V,
            columnIndex: L,
            row: oe,
            column: j,
          }));
        const re = getFixedColumnOffset(
          L,
          e == null ? void 0 : e.fixed,
          e.store
        );
        return (
          ensurePosition(re, "left"),
          ensurePosition(re, "right"),
          Object.assign({}, z, re)
        );
      },
      getCellClass: (V, L, oe, j, ae) => {
        const z = getFixedColumnsClass(
            n.b(),
            L,
            e == null ? void 0 : e.fixed,
            e.store,
            void 0,
            ae
          ),
          re = [j.id, j.align, j.className, ...z],
          ie = t == null ? void 0 : t.props.cellClassName;
        return (
          typeof ie == "string"
            ? re.push(ie)
            : typeof ie == "function" &&
              re.push(
                ie.call(null, {
                  rowIndex: V,
                  columnIndex: L,
                  row: oe,
                  column: j,
                })
              ),
          re.push(n.e("cell")),
          re.filter((le) => Boolean(le)).join(" ")
        );
      },
      getSpan: (V, L, oe, j) => {
        let ae = 1,
          z = 1;
        const re = t == null ? void 0 : t.props.spanMethod;
        if (typeof re == "function") {
          const ie = re({ row: V, column: L, rowIndex: oe, columnIndex: j });
          Array.isArray(ie)
            ? ((ae = ie[0]), (z = ie[1]))
            : typeof ie == "object" && ((ae = ie.rowspan), (z = ie.colspan));
        }
        return { rowspan: ae, colspan: z };
      },
      getColspanRealWidth: (V, L, oe) => {
        if (L < 1) return V[oe].realWidth;
        const j = V.map(({ realWidth: ae, width: z }) => ae || z).slice(
          oe,
          oe + L
        );
        return Number(j.reduce((ae, z) => Number(ae) + Number(z), -1));
      },
    };
  }
  function useRender$1(e) {
    const t = inject(TABLE_INJECTION_KEY),
      n = useNamespace("table"),
      {
        handleDoubleClick: r,
        handleClick: i,
        handleContextMenu: g,
        handleMouseEnter: y,
        handleMouseLeave: $,
        handleCellMouseEnter: k,
        handleCellMouseLeave: V,
        tooltipContent: L,
        tooltipTrigger: oe,
      } = useEvents(e),
      {
        getRowStyle: j,
        getRowClass: ae,
        getCellStyle: z,
        getCellClass: re,
        getSpan: ie,
        getColspanRealWidth: le,
      } = useStyles(e),
      de = computed(() =>
        e.store.states.columns.value.findIndex(
          ({ type: he }) => he === "default"
        )
      ),
      ue = (he, $e) => {
        const Ve = t.props.rowKey;
        return Ve ? getRowIdentity(he, Ve) : $e;
      },
      pe = (he, $e, Ve, qe = !1) => {
        const { tooltipEffect: Cn, store: Pt } = e,
          { indent: kt, columns: Fe } = Pt.states,
          xe = ae(he, $e);
        let Lt = !0;
        return (
          Ve && (xe.push(n.em("row", `level-${Ve.level}`)), (Lt = Ve.display)),
          h$1(
            "tr",
            {
              style: [Lt ? null : { display: "none" }, j(he, $e)],
              class: xe,
              key: ue(he, $e),
              onDblclick: (Ue) => r(Ue, he),
              onClick: (Ue) => i(Ue, he),
              onContextmenu: (Ue) => g(Ue, he),
              onMouseenter: () => y($e),
              onMouseleave: $,
            },
            Fe.value.map((Ue, ze) => {
              const { rowspan: Tn, colspan: Nn } = ie(he, Ue, $e, ze);
              if (!Tn || !Nn) return null;
              const xn = { ...Ue };
              xn.realWidth = le(Fe.value, Nn, ze);
              const Mn = {
                store: e.store,
                _self: e.context || t,
                column: xn,
                row: he,
                $index: $e,
                cellIndex: ze,
                expanded: qe,
              };
              ze === de.value &&
                Ve &&
                ((Mn.treeNode = {
                  indent: Ve.level * kt.value,
                  level: Ve.level,
                }),
                typeof Ve.expanded == "boolean" &&
                  ((Mn.treeNode.expanded = Ve.expanded),
                  "loading" in Ve && (Mn.treeNode.loading = Ve.loading),
                  "noLazyChildren" in Ve &&
                    (Mn.treeNode.noLazyChildren = Ve.noLazyChildren)));
              const zn = `${$e},${ze}`,
                Rn = xn.columnKey || xn.rawColumnKey || "",
                Ln = Ce(ze, Ue, Mn);
              return h$1(
                "td",
                {
                  style: z($e, ze, he, Ue),
                  class: re($e, ze, he, Ue, Nn - 1),
                  key: `${Rn}${zn}`,
                  rowspan: Tn,
                  colspan: Nn,
                  onMouseenter: (jn) => k(jn, he, Cn),
                  onMouseleave: V,
                },
                [Ln]
              );
            })
          )
        );
      },
      Ce = (he, $e, Ve) => $e.renderCell(Ve);
    return {
      wrappedRowRender: (he, $e) => {
        const Ve = e.store,
          { isRowExpanded: qe, assertRowKey: Cn } = Ve,
          {
            treeData: Pt,
            lazyTreeNodeMap: kt,
            childrenColumnName: Fe,
            rowKey: xe,
          } = Ve.states,
          Lt = Ve.states.columns.value;
        if (Lt.some(({ type: Ue }) => Ue === "expand")) {
          const Ue = qe(he),
            ze = pe(he, $e, void 0, Ue),
            Tn = t.renderExpanded;
          return Ue
            ? Tn
              ? [
                  [
                    ze,
                    h$1("tr", { key: `expanded-row__${ze.key}` }, [
                      h$1(
                        "td",
                        {
                          colspan: Lt.length,
                          class: `${n.e("cell")} ${n.e("expanded-cell")}`,
                        },
                        [Tn({ row: he, $index: $e, store: Ve, expanded: Ue })]
                      ),
                    ]),
                  ],
                ]
              : (console.error("[Element Error]renderExpanded is required."),
                ze)
            : [[ze]];
        } else if (Object.keys(Pt.value).length) {
          Cn();
          const Ue = getRowIdentity(he, xe.value);
          let ze = Pt.value[Ue],
            Tn = null;
          ze &&
            ((Tn = { expanded: ze.expanded, level: ze.level, display: !0 }),
            typeof ze.lazy == "boolean" &&
              (typeof ze.loaded == "boolean" &&
                ze.loaded &&
                (Tn.noLazyChildren = !(ze.children && ze.children.length)),
              (Tn.loading = ze.loading)));
          const Nn = [pe(he, $e, Tn)];
          if (ze) {
            let xn = 0;
            const Mn = (Rn, Ln) => {
              Rn &&
                Rn.length &&
                Ln &&
                Rn.forEach((jn) => {
                  const Fn = {
                      display: Ln.display && Ln.expanded,
                      level: Ln.level + 1,
                      expanded: !1,
                      noLazyChildren: !1,
                      loading: !1,
                    },
                    Hn = getRowIdentity(jn, xe.value);
                  if (Hn == null)
                    throw new Error(
                      "For nested data item, row-key is required."
                    );
                  if (
                    ((ze = { ...Pt.value[Hn] }),
                    ze &&
                      ((Fn.expanded = ze.expanded),
                      (ze.level = ze.level || Fn.level),
                      (ze.display = !!(ze.expanded && Fn.display)),
                      typeof ze.lazy == "boolean" &&
                        (typeof ze.loaded == "boolean" &&
                          ze.loaded &&
                          (Fn.noLazyChildren = !(
                            ze.children && ze.children.length
                          )),
                        (Fn.loading = ze.loading))),
                    xn++,
                    Nn.push(pe(jn, $e + xn, Fn)),
                    ze)
                  ) {
                    const qn = kt.value[Hn] || jn[Fe.value];
                    Mn(qn, ze);
                  }
                });
            };
            ze.display = !0;
            const zn = kt.value[Ue] || he[Fe.value];
            Mn(zn, ze);
          }
          return Nn;
        } else return pe(he, $e, void 0);
      },
      tooltipContent: L,
      tooltipTrigger: oe,
    };
  }
  const defaultProps$2 = {
    store: { required: !0, type: Object },
    stripe: Boolean,
    tooltipEffect: String,
    context: { default: () => ({}), type: Object },
    rowClassName: [String, Function],
    rowStyle: [Object, Function],
    fixed: { type: String, default: "" },
    highlight: Boolean,
  };
  var TableBody = defineComponent({
    name: "ElTableBody",
    props: defaultProps$2,
    setup(e) {
      const t = getCurrentInstance(),
        n = inject(TABLE_INJECTION_KEY),
        r = useNamespace("table"),
        {
          wrappedRowRender: i,
          tooltipContent: g,
          tooltipTrigger: y,
        } = useRender$1(e),
        { onColumnsChange: $, onScrollableChange: k } = useLayoutObserver(n);
      return (
        watch(e.store.states.hoverRow, (V, L) => {
          if (!e.store.states.isComplex.value || !isClient$1) return;
          let oe = window.requestAnimationFrame;
          oe || (oe = (j) => window.setTimeout(j, 16)),
            oe(() => {
              const j = t == null ? void 0 : t.vnode.el,
                ae = Array.from((j == null ? void 0 : j.children) || []).filter(
                  (ie) =>
                    ie == null ? void 0 : ie.classList.contains(`${r.e("row")}`)
                ),
                z = ae[L],
                re = ae[V];
              z && removeClass(z, "hover-row"), re && addClass(re, "hover-row");
            });
        }),
        onUnmounted(() => {
          var V;
          (V = removePopper) == null || V();
        }),
        {
          ns: r,
          onColumnsChange: $,
          onScrollableChange: k,
          wrappedRowRender: i,
          tooltipContent: g,
          tooltipTrigger: y,
        }
      );
    },
    render() {
      const { wrappedRowRender: e, store: t } = this,
        n = t.states.data.value || [];
      return h$1("tbody", {}, [
        n.reduce((r, i) => r.concat(e(i, r.length)), []),
      ]);
    },
  });
  function hColgroup(e) {
    const t = e.tableLayout === "auto";
    let n = e.columns || [];
    t && n.every((i) => i.width === void 0) && (n = []);
    const r = (i) => {
      const g = { key: `${e.tableLayout}_${i.id}`, style: {}, name: void 0 };
      return t ? (g.style = { width: `${i.width}px` }) : (g.name = i.id), g;
    };
    return h$1(
      "colgroup",
      {},
      n.map((i) => h$1("col", r(i)))
    );
  }
  hColgroup.props = ["columns", "tableLayout"];
  function useMapState() {
    const e = inject(TABLE_INJECTION_KEY),
      t = e == null ? void 0 : e.store,
      n = computed(() => t.states.fixedLeafColumnsLength.value),
      r = computed(() => t.states.rightFixedColumns.value.length),
      i = computed(() => t.states.columns.value.length),
      g = computed(() => t.states.fixedColumns.value.length),
      y = computed(() => t.states.rightFixedColumns.value.length);
    return {
      leftFixedLeafCount: n,
      rightFixedLeafCount: r,
      columnsCount: i,
      leftFixedCount: g,
      rightFixedCount: y,
      columns: t.states.columns,
    };
  }
  function useStyle$1(e) {
    const { columns: t } = useMapState(),
      n = useNamespace("table");
    return {
      getCellClasses: (g, y) => {
        const $ = g[y],
          k = [
            n.e("cell"),
            $.id,
            $.align,
            $.labelClassName,
            ...getFixedColumnsClass(n.b(), y, $.fixed, e.store),
          ];
        return (
          $.className && k.push($.className),
          $.children || k.push(n.is("leaf")),
          k
        );
      },
      getCellStyles: (g, y) => {
        const $ = getFixedColumnOffset(y, g.fixed, e.store);
        return ensurePosition($, "left"), ensurePosition($, "right"), $;
      },
      columns: t,
    };
  }
  var TableFooter = defineComponent({
    name: "ElTableFooter",
    props: {
      fixed: { type: String, default: "" },
      store: { required: !0, type: Object },
      summaryMethod: Function,
      sumText: String,
      border: Boolean,
      defaultSort: { type: Object, default: () => ({ prop: "", order: "" }) },
    },
    setup(e) {
      const { getCellClasses: t, getCellStyles: n, columns: r } = useStyle$1(e);
      return {
        ns: useNamespace("table"),
        getCellClasses: t,
        getCellStyles: n,
        columns: r,
      };
    },
    render() {
      const {
          columns: e,
          getCellStyles: t,
          getCellClasses: n,
          summaryMethod: r,
          sumText: i,
          ns: g,
        } = this,
        y = this.store.states.data.value;
      let $ = [];
      return (
        r
          ? ($ = r({ columns: e, data: y }))
          : e.forEach((k, V) => {
              if (V === 0) {
                $[V] = i;
                return;
              }
              const L = y.map((z) => Number(z[k.property])),
                oe = [];
              let j = !0;
              L.forEach((z) => {
                if (!Number.isNaN(+z)) {
                  j = !1;
                  const re = `${z}`.split(".")[1];
                  oe.push(re ? re.length : 0);
                }
              });
              const ae = Math.max.apply(null, oe);
              j
                ? ($[V] = "")
                : ($[V] = L.reduce((z, re) => {
                    const ie = Number(re);
                    return Number.isNaN(+ie)
                      ? z
                      : Number.parseFloat((z + re).toFixed(Math.min(ae, 20)));
                  }, 0));
            }),
        h$1(
          "table",
          {
            class: g.e("footer"),
            cellspacing: "0",
            cellpadding: "0",
            border: "0",
          },
          [
            hColgroup({ columns: e }),
            h$1("tbody", [
              h$1("tr", {}, [
                ...e.map((k, V) =>
                  h$1(
                    "td",
                    {
                      key: V,
                      colspan: k.colSpan,
                      rowspan: k.rowSpan,
                      class: n(e, V),
                      style: t(k, V),
                    },
                    [h$1("div", { class: ["cell", k.labelClassName] }, [$[V]])]
                  )
                ),
              ]),
            ]),
          ]
        )
      );
    },
  });
  function useUtils(e) {
    return {
      setCurrentRow: (L) => {
        e.commit("setCurrentRow", L);
      },
      getSelectionRows: () => e.getSelectionRows(),
      toggleRowSelection: (L, oe) => {
        e.toggleRowSelection(L, oe, !1), e.updateAllSelected();
      },
      clearSelection: () => {
        e.clearSelection();
      },
      clearFilter: (L) => {
        e.clearFilter(L);
      },
      toggleAllSelection: () => {
        e.commit("toggleAllSelection");
      },
      toggleRowExpansion: (L, oe) => {
        e.toggleRowExpansionAdapter(L, oe);
      },
      clearSort: () => {
        e.clearSort();
      },
      sort: (L, oe) => {
        e.commit("sort", { prop: L, order: oe });
      },
    };
  }
  function useStyle(e, t, n, r) {
    const i = ref(!1),
      g = ref(null),
      y = ref(!1),
      $ = (Ue) => {
        y.value = Ue;
      },
      k = ref({ width: null, height: null, headerHeight: null }),
      V = ref(!1),
      L = { display: "inline-block", verticalAlign: "middle" },
      oe = ref(),
      j = ref(0),
      ae = ref(0),
      z = ref(0),
      re = ref(0);
    watchEffect(() => {
      t.setHeight(e.height);
    }),
      watchEffect(() => {
        t.setMaxHeight(e.maxHeight);
      }),
      watch(
        () => [e.currentRowKey, n.states.rowKey],
        ([Ue, ze]) => {
          !unref(ze) || !unref(Ue) || n.setCurrentRowKey(`${Ue}`);
        },
        { immediate: !0 }
      ),
      watch(
        () => e.data,
        (Ue) => {
          r.store.commit("setData", Ue);
        },
        { immediate: !0, deep: !0 }
      ),
      watchEffect(() => {
        e.expandRowKeys && n.setExpandRowKeysAdapter(e.expandRowKeys);
      });
    const ie = () => {
        r.store.commit("setHoverRow", null),
          r.hoverState && (r.hoverState = null);
      },
      le = (Ue, ze) => {
        const { pixelX: Tn, pixelY: Nn } = ze;
        Math.abs(Tn) >= Math.abs(Nn) &&
          (r.refs.bodyWrapper.scrollLeft += ze.pixelX / 5);
      },
      de = computed(
        () =>
          e.height ||
          e.maxHeight ||
          n.states.fixedColumns.value.length > 0 ||
          n.states.rightFixedColumns.value.length > 0
      ),
      ue = computed(() => ({
        width: t.bodyWidth.value ? `${t.bodyWidth.value}px` : "",
      })),
      pe = () => {
        de.value && t.updateElsHeight(),
          t.updateColumnsWidth(),
          requestAnimationFrame($e);
      };
    onMounted(async () => {
      await nextTick(), n.updateColumns(), Ve(), requestAnimationFrame(pe);
      const Ue = r.vnode.el,
        ze = r.refs.headerWrapper;
      e.flexible &&
        Ue &&
        Ue.parentElement &&
        (Ue.parentElement.style.minWidth = "0"),
        (k.value = {
          width: (oe.value = Ue.offsetWidth),
          height: Ue.offsetHeight,
          headerHeight: e.showHeader && ze ? ze.offsetHeight : null,
        }),
        n.states.columns.value.forEach((Tn) => {
          Tn.filteredValue &&
            Tn.filteredValue.length &&
            r.store.commit("filterChange", {
              column: Tn,
              values: Tn.filteredValue,
              silent: !0,
            });
        }),
        (r.$ready = !0);
    });
    const Ce = (Ue, ze) => {
        if (!Ue) return;
        const Tn = Array.from(Ue.classList).filter(
          (Nn) => !Nn.startsWith("is-scrolling-")
        );
        Tn.push(t.scrollX.value ? ze : "is-scrolling-none"),
          (Ue.className = Tn.join(" "));
      },
      Oe = (Ue) => {
        const { tableWrapper: ze } = r.refs;
        Ce(ze, Ue);
      },
      he = (Ue) => {
        const { tableWrapper: ze } = r.refs;
        return !!(ze && ze.classList.contains(Ue));
      },
      $e = function () {
        if (!r.refs.scrollBarRef) return;
        if (!t.scrollX.value) {
          const Rn = "is-scrolling-none";
          he(Rn) || Oe(Rn);
          return;
        }
        const Ue = r.refs.scrollBarRef.wrapRef;
        if (!Ue) return;
        const { scrollLeft: ze, offsetWidth: Tn, scrollWidth: Nn } = Ue,
          { headerWrapper: xn, footerWrapper: Mn } = r.refs;
        xn && (xn.scrollLeft = ze), Mn && (Mn.scrollLeft = ze);
        const zn = Nn - Tn - 1;
        ze >= zn
          ? Oe("is-scrolling-right")
          : Oe(ze === 0 ? "is-scrolling-left" : "is-scrolling-middle");
      },
      Ve = () => {
        r.refs.scrollBarRef &&
          (r.refs.scrollBarRef.wrapRef &&
            useEventListener$1(r.refs.scrollBarRef.wrapRef, "scroll", $e, {
              passive: !0,
            }),
          e.fit
            ? useResizeObserver(r.vnode.el, qe)
            : useEventListener$1(window, "resize", qe),
          useResizeObserver(r.refs.bodyWrapper, () => {
            var Ue, ze;
            qe(),
              (ze = (Ue = r.refs) == null ? void 0 : Ue.scrollBarRef) == null ||
                ze.update();
          }));
      },
      qe = () => {
        var Ue, ze, Tn;
        const Nn = r.vnode.el;
        if (!r.$ready || !Nn) return;
        let xn = !1;
        const { width: Mn, height: zn, headerHeight: Rn } = k.value,
          Ln = (oe.value = Nn.offsetWidth);
        Mn !== Ln && (xn = !0);
        const jn = Nn.offsetHeight;
        (e.height || de.value) && zn !== jn && (xn = !0);
        const Fn =
          e.tableLayout === "fixed"
            ? r.refs.headerWrapper
            : (Ue = r.refs.tableHeaderRef) == null
            ? void 0
            : Ue.$el;
        e.showHeader &&
          (Fn == null ? void 0 : Fn.offsetHeight) !== Rn &&
          (xn = !0),
          (j.value =
            ((ze = r.refs.tableWrapper) == null ? void 0 : ze.scrollHeight) ||
            0),
          (z.value = (Fn == null ? void 0 : Fn.scrollHeight) || 0),
          (re.value =
            ((Tn = r.refs.footerWrapper) == null ? void 0 : Tn.offsetHeight) ||
            0),
          (ae.value = j.value - z.value - re.value),
          xn &&
            ((k.value = {
              width: Ln,
              height: jn,
              headerHeight:
                (e.showHeader && (Fn == null ? void 0 : Fn.offsetHeight)) || 0,
            }),
            pe());
      },
      Cn = useSize(),
      Pt = computed(() => {
        const { bodyWidth: Ue, scrollY: ze, gutterWidth: Tn } = t;
        return Ue.value ? `${Ue.value - (ze.value ? Tn : 0)}px` : "";
      }),
      kt = computed(() => (e.maxHeight ? "fixed" : e.tableLayout)),
      Fe = computed(() => {
        if (e.data && e.data.length) return null;
        let Ue = "100%";
        e.height && ae.value && (Ue = `${ae.value}px`);
        const ze = oe.value;
        return { width: ze ? `${ze}px` : "", height: Ue };
      }),
      xe = computed(() =>
        e.height
          ? {
              height: Number.isNaN(Number(e.height))
                ? e.height
                : `${e.height}px`,
            }
          : e.maxHeight
          ? {
              maxHeight: Number.isNaN(Number(e.maxHeight))
                ? e.maxHeight
                : `${e.maxHeight}px`,
            }
          : {}
      ),
      Lt = computed(() => {
        if (e.height) return { height: "100%" };
        if (e.maxHeight) {
          if (Number.isNaN(Number(e.maxHeight)))
            return {
              maxHeight: `calc(${e.maxHeight} - ${z.value + re.value}px)`,
            };
          {
            const Ue = e.maxHeight;
            if (j.value >= Number(Ue))
              return { maxHeight: `${j.value - z.value - re.value}px` };
          }
        }
        return {};
      });
    return {
      isHidden: i,
      renderExpanded: g,
      setDragVisible: $,
      isGroup: V,
      handleMouseLeave: ie,
      handleHeaderFooterMousewheel: le,
      tableSize: Cn,
      emptyBlockStyle: Fe,
      handleFixedMousewheel: (Ue, ze) => {
        const Tn = r.refs.bodyWrapper;
        if (Math.abs(ze.spinY) > 0) {
          const Nn = Tn.scrollTop;
          ze.pixelY < 0 && Nn !== 0 && Ue.preventDefault(),
            ze.pixelY > 0 &&
              Tn.scrollHeight - Tn.clientHeight > Nn &&
              Ue.preventDefault(),
            (Tn.scrollTop += Math.ceil(ze.pixelY / 5));
        } else Tn.scrollLeft += Math.ceil(ze.pixelX / 5);
      },
      resizeProxyVisible: y,
      bodyWidth: Pt,
      resizeState: k,
      doLayout: pe,
      tableBodyStyles: ue,
      tableLayout: kt,
      scrollbarViewStyle: L,
      tableInnerStyle: xe,
      scrollbarStyle: Lt,
    };
  }
  var defaultProps$1 = {
    data: { type: Array, default: () => [] },
    size: String,
    width: [String, Number],
    height: [String, Number],
    maxHeight: [String, Number],
    fit: { type: Boolean, default: !0 },
    stripe: Boolean,
    border: Boolean,
    rowKey: [String, Function],
    showHeader: { type: Boolean, default: !0 },
    showSummary: Boolean,
    sumText: String,
    summaryMethod: Function,
    rowClassName: [String, Function],
    rowStyle: [Object, Function],
    cellClassName: [String, Function],
    cellStyle: [Object, Function],
    headerRowClassName: [String, Function],
    headerRowStyle: [Object, Function],
    headerCellClassName: [String, Function],
    headerCellStyle: [Object, Function],
    highlightCurrentRow: Boolean,
    currentRowKey: [String, Number],
    emptyText: String,
    expandRowKeys: Array,
    defaultExpandAll: Boolean,
    defaultSort: Object,
    tooltipEffect: String,
    spanMethod: Function,
    selectOnIndeterminate: { type: Boolean, default: !0 },
    indent: { type: Number, default: 16 },
    treeProps: {
      type: Object,
      default: () => ({ hasChildren: "hasChildren", children: "children" }),
    },
    lazy: Boolean,
    load: Function,
    style: { type: Object, default: () => ({}) },
    className: { type: String, default: "" },
    tableLayout: { type: String, default: "fixed" },
    scrollbarAlwaysOn: { type: Boolean, default: !1 },
    flexible: Boolean,
  };
  const useScrollbar = () => {
    const e = ref(),
      t = (g, y) => {
        const $ = e.value;
        $ && $.scrollTo(g, y);
      },
      n = (g, y) => {
        const $ = e.value;
        $ &&
          isNumber$1(y) &&
          ["Top", "Left"].includes(g) &&
          $[`setScroll${g}`](y);
      };
    return {
      scrollBarRef: e,
      scrollTo: t,
      setScrollTop: (g) => n("Top", g),
      setScrollLeft: (g) => n("Left", g),
    };
  };
  let tableIdSeed = 1;
  const _sfc_main$4 = defineComponent({
      name: "ElTable",
      directives: { Mousewheel },
      components: {
        TableHeader,
        TableBody,
        TableFooter,
        ElScrollbar,
        hColgroup,
      },
      props: defaultProps$1,
      emits: [
        "select",
        "select-all",
        "selection-change",
        "cell-mouse-enter",
        "cell-mouse-leave",
        "cell-contextmenu",
        "cell-click",
        "cell-dblclick",
        "row-click",
        "row-contextmenu",
        "row-dblclick",
        "header-click",
        "header-contextmenu",
        "sort-change",
        "filter-change",
        "current-change",
        "header-dragend",
        "expand-change",
      ],
      setup(e) {
        const { t } = useLocale(),
          n = useNamespace("table"),
          r = getCurrentInstance();
        provide(TABLE_INJECTION_KEY, r);
        const i = createStore(r, e);
        r.store = i;
        const g = new TableLayout({
          store: r.store,
          table: r,
          fit: e.fit,
          showHeader: e.showHeader,
        });
        r.layout = g;
        const y = computed(() => (i.states.data.value || []).length === 0),
          {
            setCurrentRow: $,
            getSelectionRows: k,
            toggleRowSelection: V,
            clearSelection: L,
            clearFilter: oe,
            toggleAllSelection: j,
            toggleRowExpansion: ae,
            clearSort: z,
            sort: re,
          } = useUtils(i),
          {
            isHidden: ie,
            renderExpanded: le,
            setDragVisible: de,
            isGroup: ue,
            handleMouseLeave: pe,
            handleHeaderFooterMousewheel: Ce,
            tableSize: Oe,
            emptyBlockStyle: he,
            handleFixedMousewheel: $e,
            resizeProxyVisible: Ve,
            bodyWidth: qe,
            resizeState: Cn,
            doLayout: Pt,
            tableBodyStyles: kt,
            tableLayout: Fe,
            scrollbarViewStyle: xe,
            tableInnerStyle: Lt,
            scrollbarStyle: At,
          } = useStyle(e, g, i, r),
          {
            scrollBarRef: Ue,
            scrollTo: ze,
            setScrollLeft: Tn,
            setScrollTop: Nn,
          } = useScrollbar(),
          xn = debounce(Pt, 50),
          Mn = `${n.namespace.value}-table_${tableIdSeed++}`;
        (r.tableId = Mn),
          (r.state = {
            isGroup: ue,
            resizeState: Cn,
            doLayout: Pt,
            debouncedUpdateLayout: xn,
          });
        const zn = computed(() => e.sumText || t("el.table.sumText")),
          Rn = computed(() => e.emptyText || t("el.table.emptyText"));
        return {
          ns: n,
          layout: g,
          store: i,
          handleHeaderFooterMousewheel: Ce,
          handleMouseLeave: pe,
          tableId: Mn,
          tableSize: Oe,
          isHidden: ie,
          isEmpty: y,
          renderExpanded: le,
          resizeProxyVisible: Ve,
          resizeState: Cn,
          isGroup: ue,
          bodyWidth: qe,
          tableBodyStyles: kt,
          emptyBlockStyle: he,
          debouncedUpdateLayout: xn,
          handleFixedMousewheel: $e,
          setCurrentRow: $,
          getSelectionRows: k,
          toggleRowSelection: V,
          clearSelection: L,
          clearFilter: oe,
          toggleAllSelection: j,
          toggleRowExpansion: ae,
          clearSort: z,
          doLayout: Pt,
          sort: re,
          t,
          setDragVisible: de,
          context: r,
          computedSumText: zn,
          computedEmptyText: Rn,
          tableLayout: Fe,
          scrollbarViewStyle: xe,
          tableInnerStyle: Lt,
          scrollbarStyle: At,
          scrollBarRef: Ue,
          scrollTo: ze,
          setScrollLeft: Tn,
          setScrollTop: Nn,
        };
      },
    }),
    _hoisted_1$2 = ["data-prefix"],
    _hoisted_2$3 = { ref: "hiddenColumns", class: "hidden-columns" };
  function _sfc_render$1(e, t, n, r, i, g) {
    const y = resolveComponent("hColgroup"),
      $ = resolveComponent("table-header"),
      k = resolveComponent("table-body"),
      V = resolveComponent("el-scrollbar"),
      L = resolveComponent("table-footer"),
      oe = resolveDirective("mousewheel");
    return (
      openBlock(),
      createElementBlock(
        "div",
        {
          ref: "tableWrapper",
          class: normalizeClass([
            {
              [e.ns.m("fit")]: e.fit,
              [e.ns.m("striped")]: e.stripe,
              [e.ns.m("border")]: e.border || e.isGroup,
              [e.ns.m("hidden")]: e.isHidden,
              [e.ns.m("group")]: e.isGroup,
              [e.ns.m("fluid-height")]: e.maxHeight,
              [e.ns.m("scrollable-x")]: e.layout.scrollX.value,
              [e.ns.m("scrollable-y")]: e.layout.scrollY.value,
              [e.ns.m("enable-row-hover")]: !e.store.states.isComplex.value,
              [e.ns.m("enable-row-transition")]:
                (e.store.states.data.value || []).length !== 0 &&
                (e.store.states.data.value || []).length < 100,
              "has-footer": e.showSummary,
            },
            e.ns.m(e.tableSize),
            e.className,
            e.ns.b(),
            e.ns.m(`layout-${e.tableLayout}`),
          ]),
          style: normalizeStyle(e.style),
          "data-prefix": e.ns.namespace.value,
          onMouseleave: t[0] || (t[0] = (j) => e.handleMouseLeave()),
        },
        [
          createBaseVNode(
            "div",
            {
              class: normalizeClass(e.ns.e("inner-wrapper")),
              style: normalizeStyle(e.tableInnerStyle),
            },
            [
              createBaseVNode(
                "div",
                _hoisted_2$3,
                [renderSlot(e.$slots, "default")],
                512
              ),
              e.showHeader && e.tableLayout === "fixed"
                ? withDirectives(
                    (openBlock(),
                    createElementBlock(
                      "div",
                      {
                        key: 0,
                        ref: "headerWrapper",
                        class: normalizeClass(e.ns.e("header-wrapper")),
                      },
                      [
                        createBaseVNode(
                          "table",
                          {
                            ref: "tableHeader",
                            class: normalizeClass(e.ns.e("header")),
                            style: normalizeStyle(e.tableBodyStyles),
                            border: "0",
                            cellpadding: "0",
                            cellspacing: "0",
                          },
                          [
                            createVNode(
                              y,
                              {
                                columns: e.store.states.columns.value,
                                "table-layout": e.tableLayout,
                              },
                              null,
                              8,
                              ["columns", "table-layout"]
                            ),
                            createVNode(
                              $,
                              {
                                ref: "tableHeaderRef",
                                border: e.border,
                                "default-sort": e.defaultSort,
                                store: e.store,
                                onSetDragVisible: e.setDragVisible,
                              },
                              null,
                              8,
                              [
                                "border",
                                "default-sort",
                                "store",
                                "onSetDragVisible",
                              ]
                            ),
                          ],
                          6
                        ),
                      ],
                      2
                    )),
                    [[oe, e.handleHeaderFooterMousewheel]]
                  )
                : createCommentVNode("v-if", !0),
              createBaseVNode(
                "div",
                {
                  ref: "bodyWrapper",
                  class: normalizeClass(e.ns.e("body-wrapper")),
                },
                [
                  createVNode(
                    V,
                    {
                      ref: "scrollBarRef",
                      "view-style": e.scrollbarViewStyle,
                      "wrap-style": e.scrollbarStyle,
                      always: e.scrollbarAlwaysOn,
                    },
                    {
                      default: withCtx(() => [
                        createBaseVNode(
                          "table",
                          {
                            ref: "tableBody",
                            class: normalizeClass(e.ns.e("body")),
                            cellspacing: "0",
                            cellpadding: "0",
                            border: "0",
                            style: normalizeStyle({
                              width: e.bodyWidth,
                              tableLayout: e.tableLayout,
                            }),
                          },
                          [
                            createVNode(
                              y,
                              {
                                columns: e.store.states.columns.value,
                                "table-layout": e.tableLayout,
                              },
                              null,
                              8,
                              ["columns", "table-layout"]
                            ),
                            e.showHeader && e.tableLayout === "auto"
                              ? (openBlock(),
                                createBlock(
                                  $,
                                  {
                                    key: 0,
                                    ref: "tableHeaderRef",
                                    border: e.border,
                                    "default-sort": e.defaultSort,
                                    store: e.store,
                                    onSetDragVisible: e.setDragVisible,
                                  },
                                  null,
                                  8,
                                  [
                                    "border",
                                    "default-sort",
                                    "store",
                                    "onSetDragVisible",
                                  ]
                                ))
                              : createCommentVNode("v-if", !0),
                            createVNode(
                              k,
                              {
                                context: e.context,
                                highlight: e.highlightCurrentRow,
                                "row-class-name": e.rowClassName,
                                "tooltip-effect": e.tooltipEffect,
                                "row-style": e.rowStyle,
                                store: e.store,
                                stripe: e.stripe,
                              },
                              null,
                              8,
                              [
                                "context",
                                "highlight",
                                "row-class-name",
                                "tooltip-effect",
                                "row-style",
                                "store",
                                "stripe",
                              ]
                            ),
                          ],
                          6
                        ),
                        e.isEmpty
                          ? (openBlock(),
                            createElementBlock(
                              "div",
                              {
                                key: 0,
                                ref: "emptyBlock",
                                style: normalizeStyle(e.emptyBlockStyle),
                                class: normalizeClass(e.ns.e("empty-block")),
                              },
                              [
                                createBaseVNode(
                                  "span",
                                  {
                                    class: normalizeClass(e.ns.e("empty-text")),
                                  },
                                  [
                                    renderSlot(e.$slots, "empty", {}, () => [
                                      createTextVNode(
                                        toDisplayString(e.computedEmptyText),
                                        1
                                      ),
                                    ]),
                                  ],
                                  2
                                ),
                              ],
                              6
                            ))
                          : createCommentVNode("v-if", !0),
                        e.$slots.append
                          ? (openBlock(),
                            createElementBlock(
                              "div",
                              {
                                key: 1,
                                ref: "appendWrapper",
                                class: normalizeClass(e.ns.e("append-wrapper")),
                              },
                              [renderSlot(e.$slots, "append")],
                              2
                            ))
                          : createCommentVNode("v-if", !0),
                      ]),
                      _: 3,
                    },
                    8,
                    ["view-style", "wrap-style", "always"]
                  ),
                ],
                2
              ),
              e.showSummary
                ? withDirectives(
                    (openBlock(),
                    createElementBlock(
                      "div",
                      {
                        key: 1,
                        ref: "footerWrapper",
                        class: normalizeClass(e.ns.e("footer-wrapper")),
                      },
                      [
                        createVNode(
                          L,
                          {
                            border: e.border,
                            "default-sort": e.defaultSort,
                            store: e.store,
                            style: normalizeStyle(e.tableBodyStyles),
                            "sum-text": e.computedSumText,
                            "summary-method": e.summaryMethod,
                          },
                          null,
                          8,
                          [
                            "border",
                            "default-sort",
                            "store",
                            "style",
                            "sum-text",
                            "summary-method",
                          ]
                        ),
                      ],
                      2
                    )),
                    [
                      [vShow, !e.isEmpty],
                      [oe, e.handleHeaderFooterMousewheel],
                    ]
                  )
                : createCommentVNode("v-if", !0),
              e.border || e.isGroup
                ? (openBlock(),
                  createElementBlock(
                    "div",
                    {
                      key: 2,
                      class: normalizeClass(e.ns.e("border-left-patch")),
                    },
                    null,
                    2
                  ))
                : createCommentVNode("v-if", !0),
            ],
            6
          ),
          withDirectives(
            createBaseVNode(
              "div",
              {
                ref: "resizeProxy",
                class: normalizeClass(e.ns.e("column-resize-proxy")),
              },
              null,
              2
            ),
            [[vShow, e.resizeProxyVisible]]
          ),
        ],
        46,
        _hoisted_1$2
      )
    );
  }
  var Table = _export_sfc$1(_sfc_main$4, [
    ["render", _sfc_render$1],
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/table/src/table.vue",
    ],
  ]);
  const defaultClassNames = {
      selection: "table-column--selection",
      expand: "table__expand-column",
    },
    cellStarts = {
      default: { order: "" },
      selection: { width: 48, minWidth: 48, realWidth: 48, order: "" },
      expand: { width: 48, minWidth: 48, realWidth: 48, order: "" },
      index: { width: 48, minWidth: 48, realWidth: 48, order: "" },
    },
    getDefaultClassName = (e) => defaultClassNames[e] || "",
    cellForced = {
      selection: {
        renderHeader({ store: e }) {
          function t() {
            return e.states.data.value && e.states.data.value.length === 0;
          }
          return h$1(ElCheckbox, {
            disabled: t(),
            size: e.states.tableSize.value,
            indeterminate:
              e.states.selection.value.length > 0 &&
              !e.states.isAllSelected.value,
            "onUpdate:modelValue": e.toggleAllSelection,
            modelValue: e.states.isAllSelected.value,
          });
        },
        renderCell({ row: e, column: t, store: n, $index: r }) {
          return h$1(ElCheckbox, {
            disabled: t.selectable ? !t.selectable.call(null, e, r) : !1,
            size: n.states.tableSize.value,
            onChange: () => {
              n.commit("rowSelectedChanged", e);
            },
            onClick: (i) => i.stopPropagation(),
            modelValue: n.isSelected(e),
          });
        },
        sortable: !1,
        resizable: !1,
      },
      index: {
        renderHeader({ column: e }) {
          return e.label || "#";
        },
        renderCell({ column: e, $index: t }) {
          let n = t + 1;
          const r = e.index;
          return (
            typeof r == "number"
              ? (n = t + r)
              : typeof r == "function" && (n = r(t)),
            h$1("div", {}, [n])
          );
        },
        sortable: !1,
      },
      expand: {
        renderHeader({ column: e }) {
          return e.label || "";
        },
        renderCell({ row: e, store: t, expanded: n }) {
          const { ns: r } = t,
            i = [r.e("expand-icon")];
          return (
            n && i.push(r.em("expand-icon", "expanded")),
            h$1(
              "div",
              {
                class: i,
                onClick: function (y) {
                  y.stopPropagation(), t.toggleRowExpansion(e);
                },
              },
              {
                default: () => [
                  h$1(ElIcon, null, {
                    default: () => [h$1(arrow_right_default)],
                  }),
                ],
              }
            )
          );
        },
        sortable: !1,
        resizable: !1,
      },
    };
  function defaultRenderCell({ row: e, column: t, $index: n }) {
    var r;
    const i = t.property,
      g = i && getProp(e, i).value;
    return t && t.formatter
      ? t.formatter(e, t, g, n)
      : ((r = g == null ? void 0 : g.toString) == null ? void 0 : r.call(g)) ||
          "";
  }
  function treeCellPrefix({ row: e, treeNode: t, store: n }, r = !1) {
    const { ns: i } = n;
    if (!t) return r ? [h$1("span", { class: i.e("placeholder") })] : null;
    const g = [],
      y = function ($) {
        $.stopPropagation(), !t.loading && n.loadOrToggle(e);
      };
    if (
      (t.indent &&
        g.push(
          h$1("span", {
            class: i.e("indent"),
            style: { "padding-left": `${t.indent}px` },
          })
        ),
      typeof t.expanded == "boolean" && !t.noLazyChildren)
    ) {
      const $ = [
        i.e("expand-icon"),
        t.expanded ? i.em("expand-icon", "expanded") : "",
      ];
      let k = arrow_right_default;
      t.loading && (k = loading_default),
        g.push(
          h$1(
            "div",
            { class: $, onClick: y },
            {
              default: () => [
                h$1(
                  ElIcon,
                  { class: { [i.is("loading")]: t.loading } },
                  { default: () => [h$1(k)] }
                ),
              ],
            }
          )
        );
    } else g.push(h$1("span", { class: i.e("placeholder") }));
    return g;
  }
  function getAllAliases(e, t) {
    return e.reduce((n, r) => ((n[r] = r), n), t);
  }
  function useWatcher(e, t) {
    const n = getCurrentInstance();
    return {
      registerComplexWatchers: () => {
        const g = ["fixed"],
          y = { realWidth: "width", realMinWidth: "minWidth" },
          $ = getAllAliases(g, y);
        Object.keys($).forEach((k) => {
          const V = y[k];
          hasOwn(t, V) &&
            watch(
              () => t[V],
              (L) => {
                let oe = L;
                V === "width" && k === "realWidth" && (oe = parseWidth(L)),
                  V === "minWidth" &&
                    k === "realMinWidth" &&
                    (oe = parseMinWidth(L)),
                  (n.columnConfig.value[V] = oe),
                  (n.columnConfig.value[k] = oe);
                const j = V === "fixed";
                e.value.store.scheduleLayout(j);
              }
            );
        });
      },
      registerNormalWatchers: () => {
        const g = [
            "label",
            "filters",
            "filterMultiple",
            "sortable",
            "index",
            "formatter",
            "className",
            "labelClassName",
            "showOverflowTooltip",
          ],
          y = {
            property: "prop",
            align: "realAlign",
            headerAlign: "realHeaderAlign",
          },
          $ = getAllAliases(g, y);
        Object.keys($).forEach((k) => {
          const V = y[k];
          hasOwn(t, V) &&
            watch(
              () => t[V],
              (L) => {
                n.columnConfig.value[k] = L;
              }
            );
        });
      },
    };
  }
  function useRender(e, t, n) {
    const r = getCurrentInstance(),
      i = ref(""),
      g = ref(!1),
      y = ref(),
      $ = ref(),
      k = useNamespace("table");
    watchEffect(() => {
      (y.value = e.align ? `is-${e.align}` : null), y.value;
    }),
      watchEffect(() => {
        ($.value = e.headerAlign ? `is-${e.headerAlign}` : y.value), $.value;
      });
    const V = computed(() => {
        let ue = r.vnode.vParent || r.parent;
        for (; ue && !ue.tableId && !ue.columnId; )
          ue = ue.vnode.vParent || ue.parent;
        return ue;
      }),
      L = computed(() => {
        const { store: ue } = r.parent;
        if (!ue) return !1;
        const { treeData: pe } = ue.states,
          Ce = pe.value;
        return Ce && Object.keys(Ce).length > 0;
      }),
      oe = ref(parseWidth(e.width)),
      j = ref(parseMinWidth(e.minWidth)),
      ae = (ue) => (
        oe.value && (ue.width = oe.value),
        j.value && (ue.minWidth = j.value),
        !oe.value && j.value && (ue.width = void 0),
        ue.minWidth || (ue.minWidth = 80),
        (ue.realWidth = Number(ue.width === void 0 ? ue.minWidth : ue.width)),
        ue
      ),
      z = (ue) => {
        const pe = ue.type,
          Ce = cellForced[pe] || {};
        Object.keys(Ce).forEach((he) => {
          const $e = Ce[he];
          he !== "className" && $e !== void 0 && (ue[he] = $e);
        });
        const Oe = getDefaultClassName(pe);
        if (Oe) {
          const he = `${unref(k.namespace)}-${Oe}`;
          ue.className = ue.className ? `${ue.className} ${he}` : he;
        }
        return ue;
      },
      re = (ue) => {
        Array.isArray(ue) ? ue.forEach((Ce) => pe(Ce)) : pe(ue);
        function pe(Ce) {
          var Oe;
          ((Oe = Ce == null ? void 0 : Ce.type) == null ? void 0 : Oe.name) ===
            "ElTableColumn" && (Ce.vParent = r);
        }
      };
    return {
      columnId: i,
      realAlign: y,
      isSubColumn: g,
      realHeaderAlign: $,
      columnOrTableParent: V,
      setColumnWidth: ae,
      setColumnForcedProps: z,
      setColumnRenders: (ue) => {
        e.renderHeader ||
          (ue.type !== "selection" &&
            (ue.renderHeader = (Ce) => {
              r.columnConfig.value.label;
              const Oe = t.header;
              return Oe ? Oe(Ce) : ue.label;
            }));
        let pe = ue.renderCell;
        return (
          ue.type === "expand"
            ? ((ue.renderCell = (Ce) =>
                h$1("div", { class: "cell" }, [pe(Ce)])),
              (n.value.renderExpanded = (Ce) =>
                t.default ? t.default(Ce) : t.default))
            : ((pe = pe || defaultRenderCell),
              (ue.renderCell = (Ce) => {
                let Oe = null;
                if (t.default) {
                  const qe = t.default(Ce);
                  Oe = qe.some((Cn) => Cn.type !== Comment) ? qe : pe(Ce);
                } else Oe = pe(Ce);
                const he =
                    L.value &&
                    Ce.cellIndex === 0 &&
                    Ce.column.type !== "selection",
                  $e = treeCellPrefix(Ce, he),
                  Ve = { class: "cell", style: {} };
                return (
                  ue.showOverflowTooltip &&
                    ((Ve.class = `${Ve.class} ${unref(k.namespace)}-tooltip`),
                    (Ve.style = {
                      width: `${
                        (Ce.column.realWidth || Number(Ce.column.width)) - 1
                      }px`,
                    })),
                  re(Oe),
                  h$1("div", Ve, [$e, Oe])
                );
              })),
          ue
        );
      },
      getPropsData: (...ue) =>
        ue.reduce(
          (pe, Ce) => (
            Array.isArray(Ce) &&
              Ce.forEach((Oe) => {
                pe[Oe] = e[Oe];
              }),
            pe
          ),
          {}
        ),
      getColumnElIndex: (ue, pe) => Array.prototype.indexOf.call(ue, pe),
    };
  }
  var defaultProps = {
    type: { type: String, default: "default" },
    label: String,
    className: String,
    labelClassName: String,
    property: String,
    prop: String,
    width: { type: [String, Number], default: "" },
    minWidth: { type: [String, Number], default: "" },
    renderHeader: Function,
    sortable: { type: [Boolean, String], default: !1 },
    sortMethod: Function,
    sortBy: [String, Function, Array],
    resizable: { type: Boolean, default: !0 },
    columnKey: String,
    align: String,
    headerAlign: String,
    showTooltipWhenOverflow: Boolean,
    showOverflowTooltip: Boolean,
    fixed: [Boolean, String],
    formatter: Function,
    selectable: Function,
    reserveSelection: Boolean,
    filterMethod: Function,
    filteredValue: Array,
    filters: Array,
    filterPlacement: String,
    filterMultiple: { type: Boolean, default: !0 },
    index: [Number, Function],
    sortOrders: {
      type: Array,
      default: () => ["ascending", "descending", null],
      validator: (e) =>
        e.every((t) => ["ascending", "descending", null].includes(t)),
    },
  };
  let columnIdSeed = 1;
  var ElTableColumn$1 = defineComponent({
    name: "ElTableColumn",
    components: { ElCheckbox },
    props: defaultProps,
    setup(e, { slots: t }) {
      const n = getCurrentInstance(),
        r = ref({}),
        i = computed(() => {
          let de = n.parent;
          for (; de && !de.tableId; ) de = de.parent;
          return de;
        }),
        { registerNormalWatchers: g, registerComplexWatchers: y } = useWatcher(
          i,
          e
        ),
        {
          columnId: $,
          isSubColumn: k,
          realHeaderAlign: V,
          columnOrTableParent: L,
          setColumnWidth: oe,
          setColumnForcedProps: j,
          setColumnRenders: ae,
          getPropsData: z,
          getColumnElIndex: re,
          realAlign: ie,
        } = useRender(e, t, i),
        le = L.value;
      ($.value = `${le.tableId || le.columnId}_column_${columnIdSeed++}`),
        onBeforeMount(() => {
          k.value = i.value !== le;
          const de = e.type || "default",
            ue = e.sortable === "" ? !0 : e.sortable,
            pe = {
              ...cellStarts[de],
              id: $.value,
              type: de,
              property: e.prop || e.property,
              align: ie,
              headerAlign: V,
              showOverflowTooltip:
                e.showOverflowTooltip || e.showTooltipWhenOverflow,
              filterable: e.filters || e.filterMethod,
              filteredValue: [],
              filterPlacement: "",
              isColumnGroup: !1,
              isSubColumn: !1,
              filterOpened: !1,
              sortable: ue,
              index: e.index,
              rawColumnKey: n.vnode.key,
            };
          let Ve = z(
            [
              "columnKey",
              "label",
              "className",
              "labelClassName",
              "type",
              "renderHeader",
              "formatter",
              "fixed",
              "resizable",
            ],
            ["sortMethod", "sortBy", "sortOrders"],
            ["selectable", "reserveSelection"],
            [
              "filterMethod",
              "filters",
              "filterMultiple",
              "filterOpened",
              "filteredValue",
              "filterPlacement",
            ]
          );
          (Ve = mergeOptions(pe, Ve)),
            (Ve = compose(ae, oe, j)(Ve)),
            (r.value = Ve),
            g(),
            y();
        }),
        onMounted(() => {
          var de;
          const ue = L.value,
            pe = k.value
              ? ue.vnode.el.children
              : (de = ue.refs.hiddenColumns) == null
              ? void 0
              : de.children,
            Ce = () => re(pe || [], n.vnode.el);
          (r.value.getColumnIndex = Ce),
            Ce() > -1 &&
              i.value.store.commit(
                "insertColumn",
                r.value,
                k.value ? ue.columnConfig.value : null
              );
        }),
        onBeforeUnmount(() => {
          i.value.store.commit(
            "removeColumn",
            r.value,
            k.value ? le.columnConfig.value : null
          );
        }),
        (n.columnId = $.value),
        (n.columnConfig = r);
    },
    render() {
      var e, t, n;
      try {
        const r =
            (t = (e = this.$slots).default) == null
              ? void 0
              : t.call(e, { row: {}, column: {}, $index: -1 }),
          i = [];
        if (Array.isArray(r))
          for (const y of r)
            ((n = y.type) == null ? void 0 : n.name) === "ElTableColumn" ||
            y.shapeFlag & 2
              ? i.push(y)
              : y.type === Fragment &&
                Array.isArray(y.children) &&
                y.children.forEach(($) => {
                  ($ == null ? void 0 : $.patchFlag) !== 1024 &&
                    !isString$3($ == null ? void 0 : $.children) &&
                    i.push($);
                });
        return h$1("div", i);
      } catch {
        return h$1("div", []);
      }
    },
  });
  const ElTable = withInstall(Table, { TableColumn: ElTableColumn$1 }),
    ElTableColumn = withNoopInstall(ElTableColumn$1),
    messageTypes = ["success", "info", "warning", "error"],
    messageDefaults = mutable({
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
      appendTo: isClient$1 ? document.body : void 0,
    }),
    messageProps = buildProps({
      customClass: { type: String, default: messageDefaults.customClass },
      center: { type: Boolean, default: messageDefaults.center },
      dangerouslyUseHTMLString: {
        type: Boolean,
        default: messageDefaults.dangerouslyUseHTMLString,
      },
      duration: { type: Number, default: messageDefaults.duration },
      icon: { type: iconPropType, default: messageDefaults.icon },
      id: { type: String, default: messageDefaults.id },
      message: {
        type: definePropType([String, Object, Function]),
        default: messageDefaults.message,
      },
      onClose: { type: definePropType(Function), required: !1 },
      showClose: { type: Boolean, default: messageDefaults.showClose },
      type: {
        type: String,
        values: messageTypes,
        default: messageDefaults.type,
      },
      offset: { type: Number, default: messageDefaults.offset },
      zIndex: { type: Number, default: messageDefaults.zIndex },
      grouping: { type: Boolean, default: messageDefaults.grouping },
      repeatNum: { type: Number, default: messageDefaults.repeatNum },
    }),
    messageEmits = { destroy: () => !0 },
    instances = shallowReactive([]),
    getInstance = (e) => {
      const t = instances.findIndex((i) => i.id === e),
        n = instances[t];
      let r;
      return t > 0 && (r = instances[t - 1]), { current: n, prev: r };
    },
    getLastOffset = (e) => {
      const { prev: t } = getInstance(e);
      return t ? t.vm.exposed.bottom.value : 0;
    },
    _hoisted_1$1 = ["id"],
    _hoisted_2$2 = ["innerHTML"],
    __default__ = defineComponent({ name: "ElMessage" }),
    _sfc_main$3 = defineComponent({
      ...__default__,
      props: messageProps,
      emits: messageEmits,
      setup(e, { expose: t }) {
        const n = e,
          { Close: r } = TypeComponents,
          i = useNamespace("message"),
          g = ref(),
          y = ref(!1),
          $ = ref(0);
        let k;
        const V = computed(() =>
            n.type ? (n.type === "error" ? "danger" : n.type) : "info"
          ),
          L = computed(() => {
            const pe = n.type;
            return { [i.bm("icon", pe)]: pe && TypeComponentsMap[pe] };
          }),
          oe = computed(() => n.icon || TypeComponentsMap[n.type] || ""),
          j = computed(() => getLastOffset(n.id)),
          ae = computed(() => n.offset + j.value),
          z = computed(() => $.value + ae.value),
          re = computed(() => ({ top: `${ae.value}px`, zIndex: n.zIndex }));
        function ie() {
          n.duration !== 0 &&
            ({ stop: k } = useTimeoutFn(() => {
              de();
            }, n.duration));
        }
        function le() {
          k == null || k();
        }
        function de() {
          y.value = !1;
        }
        function ue({ code: pe }) {
          pe === EVENT_CODE.esc && de();
        }
        return (
          onMounted(() => {
            ie(), (y.value = !0);
          }),
          watch(
            () => n.repeatNum,
            () => {
              le(), ie();
            }
          ),
          useEventListener$1(document, "keydown", ue),
          useResizeObserver(g, () => {
            $.value = g.value.getBoundingClientRect().height;
          }),
          t({ visible: y, bottom: z, close: de }),
          (pe, Ce) => (
            openBlock(),
            createBlock(
              Transition,
              {
                name: unref(i).b("fade"),
                onBeforeLeave: pe.onClose,
                onAfterLeave: Ce[0] || (Ce[0] = (Oe) => pe.$emit("destroy")),
                persisted: "",
              },
              {
                default: withCtx(() => [
                  withDirectives(
                    createBaseVNode(
                      "div",
                      {
                        id: pe.id,
                        ref_key: "messageRef",
                        ref: g,
                        class: normalizeClass([
                          unref(i).b(),
                          { [unref(i).m(pe.type)]: pe.type && !pe.icon },
                          unref(i).is("center", pe.center),
                          unref(i).is("closable", pe.showClose),
                          pe.customClass,
                        ]),
                        style: normalizeStyle(unref(re)),
                        role: "alert",
                        onMouseenter: le,
                        onMouseleave: ie,
                      },
                      [
                        pe.repeatNum > 1
                          ? (openBlock(),
                            createBlock(
                              unref(ElBadge),
                              {
                                key: 0,
                                value: pe.repeatNum,
                                type: unref(V),
                                class: normalizeClass(unref(i).e("badge")),
                              },
                              null,
                              8,
                              ["value", "type", "class"]
                            ))
                          : createCommentVNode("v-if", !0),
                        unref(oe)
                          ? (openBlock(),
                            createBlock(
                              unref(ElIcon),
                              {
                                key: 1,
                                class: normalizeClass([
                                  unref(i).e("icon"),
                                  unref(L),
                                ]),
                              },
                              {
                                default: withCtx(() => [
                                  (openBlock(),
                                  createBlock(
                                    resolveDynamicComponent(unref(oe))
                                  )),
                                ]),
                                _: 1,
                              },
                              8,
                              ["class"]
                            ))
                          : createCommentVNode("v-if", !0),
                        renderSlot(pe.$slots, "default", {}, () => [
                          pe.dangerouslyUseHTMLString
                            ? (openBlock(),
                              createElementBlock(
                                Fragment,
                                { key: 1 },
                                [
                                  createCommentVNode(
                                    " Caution here, message could've been compromised, never use user's input as message "
                                  ),
                                  createBaseVNode(
                                    "p",
                                    {
                                      class: normalizeClass(
                                        unref(i).e("content")
                                      ),
                                      innerHTML: pe.message,
                                    },
                                    null,
                                    10,
                                    _hoisted_2$2
                                  ),
                                ],
                                2112
                              ))
                            : (openBlock(),
                              createElementBlock(
                                "p",
                                {
                                  key: 0,
                                  class: normalizeClass(unref(i).e("content")),
                                },
                                toDisplayString(pe.message),
                                3
                              )),
                        ]),
                        pe.showClose
                          ? (openBlock(),
                            createBlock(
                              unref(ElIcon),
                              {
                                key: 2,
                                class: normalizeClass(unref(i).e("closeBtn")),
                                onClick: withModifiers(de, ["stop"]),
                              },
                              {
                                default: withCtx(() => [createVNode(unref(r))]),
                                _: 1,
                              },
                              8,
                              ["class", "onClick"]
                            ))
                          : createCommentVNode("v-if", !0),
                      ],
                      46,
                      _hoisted_1$1
                    ),
                    [[vShow, y.value]]
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
  var MessageConstructor = _export_sfc$1(_sfc_main$3, [
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/message/src/message.vue",
    ],
  ]);
  let seed = 1;
  const normalizeOptions = (e) => {
      const t =
          !e || isString$3(e) || isVNode(e) || isFunction$3(e)
            ? { message: e }
            : e,
        n = { ...messageDefaults, ...t };
      if (!n.appendTo) n.appendTo = document.body;
      else if (isString$3(n.appendTo)) {
        let r = document.querySelector(n.appendTo);
        isElement(r) || (r = document.body), (n.appendTo = r);
      }
      return n;
    },
    closeMessage = (e) => {
      const t = instances.indexOf(e);
      if (t === -1) return;
      instances.splice(t, 1);
      const { handler: n } = e;
      n.close();
    },
    createMessage = ({ appendTo: e, ...t }, n) => {
      const { nextZIndex: r } = useZIndex(),
        i = `message_${seed++}`,
        g = t.onClose,
        y = document.createElement("div"),
        $ = {
          ...t,
          zIndex: r() + t.zIndex,
          id: i,
          onClose: () => {
            g == null || g(), closeMessage(oe);
          },
          onDestroy: () => {
            render(null, y);
          },
        },
        k = createVNode(
          MessageConstructor,
          $,
          isFunction$3($.message) || isVNode($.message)
            ? { default: isFunction$3($.message) ? $.message : () => $.message }
            : null
        );
      (k.appContext = n || message._context),
        render(k, y),
        e.appendChild(y.firstElementChild);
      const V = k.component,
        oe = {
          id: i,
          vnode: k,
          vm: V,
          handler: {
            close: () => {
              V.exposed.visible.value = !1;
            },
          },
          props: k.component.props,
        };
      return oe;
    },
    message = (e = {}, t) => {
      if (!isClient$1) return { close: () => {} };
      if (
        isNumber$1(messageConfig.max) &&
        instances.length >= messageConfig.max
      )
        return { close: () => {} };
      const n = normalizeOptions(e);
      if (n.grouping && instances.length) {
        const i = instances.find(({ vnode: g }) => {
          var y;
          return ((y = g.props) == null ? void 0 : y.message) === n.message;
        });
        if (i)
          return (i.props.repeatNum += 1), (i.props.type = n.type), i.handler;
      }
      const r = createMessage(n, t);
      return instances.push(r), r.handler;
    };
  messageTypes.forEach((e) => {
    message[e] = (t = {}, n) => {
      const r = normalizeOptions(t);
      return message({ ...r, type: e }, n);
    };
  });
  function closeAll(e) {
    for (const t of instances) (!e || e === t.props.type) && t.handler.close();
  }
  message.closeAll = closeAll;
  message._context = null;
  const ElMessage = withInstallFunction(message, "$message"),
    _sfc_main$2 = defineComponent({
      name: "ElMessageBox",
      directives: { TrapFocus },
      components: {
        ElButton,
        ElFocusTrap,
        ElInput,
        ElOverlay,
        ElIcon,
        ...TypeComponents,
      },
      inheritAttrs: !1,
      props: {
        buttonSize: { type: String, validator: isValidComponentSize },
        modal: { type: Boolean, default: !0 },
        lockScroll: { type: Boolean, default: !0 },
        showClose: { type: Boolean, default: !0 },
        closeOnClickModal: { type: Boolean, default: !0 },
        closeOnPressEscape: { type: Boolean, default: !0 },
        closeOnHashChange: { type: Boolean, default: !0 },
        center: Boolean,
        draggable: Boolean,
        roundButton: { default: !1, type: Boolean },
        container: { type: String, default: "body" },
        boxType: { type: String, default: "" },
      },
      emits: ["vanish", "action"],
      setup(e, { emit: t }) {
        const { t: n } = useLocale(),
          r = useNamespace("message-box"),
          i = ref(!1),
          { nextZIndex: g } = useZIndex(),
          y = reactive({
            autofocus: !0,
            beforeClose: null,
            callback: null,
            cancelButtonText: "",
            cancelButtonClass: "",
            confirmButtonText: "",
            confirmButtonClass: "",
            customClass: "",
            customStyle: {},
            dangerouslyUseHTMLString: !1,
            distinguishCancelAndClose: !1,
            icon: "",
            inputPattern: null,
            inputPlaceholder: "",
            inputType: "text",
            inputValue: null,
            inputValidator: null,
            inputErrorMessage: "",
            message: null,
            modalFade: !0,
            modalClass: "",
            showCancelButton: !1,
            showConfirmButton: !0,
            type: "",
            title: void 0,
            showInput: !1,
            action: "",
            confirmButtonLoading: !1,
            cancelButtonLoading: !1,
            confirmButtonDisabled: !1,
            editorErrorMessage: "",
            validateError: !1,
            zIndex: g(),
          }),
          $ = computed(() => {
            const kt = y.type;
            return { [r.bm("icon", kt)]: kt && TypeComponentsMap[kt] };
          }),
          k = useId(),
          V = useId(),
          L = useSize(
            computed(() => e.buttonSize),
            { prop: !0, form: !0, formItem: !0 }
          ),
          oe = computed(() => y.icon || TypeComponentsMap[y.type] || ""),
          j = computed(() => !!y.message),
          ae = ref(),
          z = ref(),
          re = ref(),
          ie = ref(),
          le = ref(),
          de = computed(() => y.confirmButtonClass);
        watch(
          () => y.inputValue,
          async (kt) => {
            await nextTick(), e.boxType === "prompt" && kt !== null && Ve();
          },
          { immediate: !0 }
        ),
          watch(
            () => i.value,
            (kt) => {
              var Fe, xe;
              kt &&
                (e.boxType !== "prompt" &&
                  (y.autofocus
                    ? (re.value =
                        (xe = (Fe = le.value) == null ? void 0 : Fe.$el) != null
                          ? xe
                          : ae.value)
                    : (re.value = ae.value)),
                (y.zIndex = g())),
                e.boxType === "prompt" &&
                  (kt
                    ? nextTick().then(() => {
                        var Lt;
                        ie.value &&
                          ie.value.$el &&
                          (y.autofocus
                            ? (re.value = (Lt = qe()) != null ? Lt : ae.value)
                            : (re.value = ae.value));
                      })
                    : ((y.editorErrorMessage = ""), (y.validateError = !1)));
            }
          );
        const ue = computed(() => e.draggable);
        useDraggable(ae, z, ue),
          onMounted(async () => {
            await nextTick(),
              e.closeOnHashChange && window.addEventListener("hashchange", pe);
          }),
          onBeforeUnmount(() => {
            e.closeOnHashChange && window.removeEventListener("hashchange", pe);
          });
        function pe() {
          i.value &&
            ((i.value = !1),
            nextTick(() => {
              y.action && t("action", y.action);
            }));
        }
        const Ce = () => {
            e.closeOnClickModal &&
              $e(y.distinguishCancelAndClose ? "close" : "cancel");
          },
          Oe = useSameTarget(Ce),
          he = (kt) => {
            if (y.inputType !== "textarea")
              return kt.preventDefault(), $e("confirm");
          },
          $e = (kt) => {
            var Fe;
            (e.boxType === "prompt" && kt === "confirm" && !Ve()) ||
              ((y.action = kt),
              y.beforeClose
                ? (Fe = y.beforeClose) == null || Fe.call(y, kt, y, pe)
                : pe());
          },
          Ve = () => {
            if (e.boxType === "prompt") {
              const kt = y.inputPattern;
              if (kt && !kt.test(y.inputValue || ""))
                return (
                  (y.editorErrorMessage =
                    y.inputErrorMessage || n("el.messagebox.error")),
                  (y.validateError = !0),
                  !1
                );
              const Fe = y.inputValidator;
              if (typeof Fe == "function") {
                const xe = Fe(y.inputValue);
                if (xe === !1)
                  return (
                    (y.editorErrorMessage =
                      y.inputErrorMessage || n("el.messagebox.error")),
                    (y.validateError = !0),
                    !1
                  );
                if (typeof xe == "string")
                  return (
                    (y.editorErrorMessage = xe), (y.validateError = !0), !1
                  );
              }
            }
            return (y.editorErrorMessage = ""), (y.validateError = !1), !0;
          },
          qe = () => {
            const kt = ie.value.$refs;
            return kt.input || kt.textarea;
          },
          Cn = () => {
            $e("close");
          },
          Pt = () => {
            e.closeOnPressEscape && Cn();
          };
        return (
          e.lockScroll && useLockscreen(i),
          useRestoreActive(i),
          {
            ...toRefs(y),
            ns: r,
            overlayEvent: Oe,
            visible: i,
            hasMessage: j,
            typeClass: $,
            contentId: k,
            inputId: V,
            btnSize: L,
            iconComponent: oe,
            confirmButtonClasses: de,
            rootRef: ae,
            focusStartRef: re,
            headerRef: z,
            inputRef: ie,
            confirmRef: le,
            doClose: pe,
            handleClose: Cn,
            onCloseRequested: Pt,
            handleWrapperClick: Ce,
            handleInputEnter: he,
            handleAction: $e,
            t: n,
          }
        );
      },
    }),
    _hoisted_1 = ["aria-label", "aria-describedby"],
    _hoisted_2$1 = ["aria-label"],
    _hoisted_3$1 = ["id"];
  function _sfc_render(e, t, n, r, i, g) {
    const y = resolveComponent("el-icon"),
      $ = resolveComponent("close"),
      k = resolveComponent("el-input"),
      V = resolveComponent("el-button"),
      L = resolveComponent("el-focus-trap"),
      oe = resolveComponent("el-overlay");
    return (
      openBlock(),
      createBlock(
        Transition,
        {
          name: "fade-in-linear",
          onAfterLeave: t[11] || (t[11] = (j) => e.$emit("vanish")),
          persisted: "",
        },
        {
          default: withCtx(() => [
            withDirectives(
              createVNode(
                oe,
                {
                  "z-index": e.zIndex,
                  "overlay-class": [e.ns.is("message-box"), e.modalClass],
                  mask: e.modal,
                },
                {
                  default: withCtx(() => [
                    createBaseVNode(
                      "div",
                      {
                        role: "dialog",
                        "aria-label": e.title,
                        "aria-modal": "true",
                        "aria-describedby": e.showInput ? void 0 : e.contentId,
                        class: normalizeClass(
                          `${e.ns.namespace.value}-overlay-message-box`
                        ),
                        onClick:
                          t[8] ||
                          (t[8] = (...j) =>
                            e.overlayEvent.onClick &&
                            e.overlayEvent.onClick(...j)),
                        onMousedown:
                          t[9] ||
                          (t[9] = (...j) =>
                            e.overlayEvent.onMousedown &&
                            e.overlayEvent.onMousedown(...j)),
                        onMouseup:
                          t[10] ||
                          (t[10] = (...j) =>
                            e.overlayEvent.onMouseup &&
                            e.overlayEvent.onMouseup(...j)),
                      },
                      [
                        createVNode(
                          L,
                          {
                            loop: "",
                            trapped: e.visible,
                            "focus-trap-el": e.rootRef,
                            "focus-start-el": e.focusStartRef,
                            onReleaseRequested: e.onCloseRequested,
                          },
                          {
                            default: withCtx(() => [
                              createBaseVNode(
                                "div",
                                {
                                  ref: "rootRef",
                                  class: normalizeClass([
                                    e.ns.b(),
                                    e.customClass,
                                    e.ns.is("draggable", e.draggable),
                                    { [e.ns.m("center")]: e.center },
                                  ]),
                                  style: normalizeStyle(e.customStyle),
                                  tabindex: "-1",
                                  onClick:
                                    t[7] ||
                                    (t[7] = withModifiers(() => {}, ["stop"])),
                                },
                                [
                                  e.title !== null && e.title !== void 0
                                    ? (openBlock(),
                                      createElementBlock(
                                        "div",
                                        {
                                          key: 0,
                                          ref: "headerRef",
                                          class: normalizeClass(
                                            e.ns.e("header")
                                          ),
                                        },
                                        [
                                          createBaseVNode(
                                            "div",
                                            {
                                              class: normalizeClass(
                                                e.ns.e("title")
                                              ),
                                            },
                                            [
                                              e.iconComponent && e.center
                                                ? (openBlock(),
                                                  createBlock(
                                                    y,
                                                    {
                                                      key: 0,
                                                      class: normalizeClass([
                                                        e.ns.e("status"),
                                                        e.typeClass,
                                                      ]),
                                                    },
                                                    {
                                                      default: withCtx(() => [
                                                        (openBlock(),
                                                        createBlock(
                                                          resolveDynamicComponent(
                                                            e.iconComponent
                                                          )
                                                        )),
                                                      ]),
                                                      _: 1,
                                                    },
                                                    8,
                                                    ["class"]
                                                  ))
                                                : createCommentVNode(
                                                    "v-if",
                                                    !0
                                                  ),
                                              createBaseVNode(
                                                "span",
                                                null,
                                                toDisplayString(e.title),
                                                1
                                              ),
                                            ],
                                            2
                                          ),
                                          e.showClose
                                            ? (openBlock(),
                                              createElementBlock(
                                                "button",
                                                {
                                                  key: 0,
                                                  type: "button",
                                                  class: normalizeClass(
                                                    e.ns.e("headerbtn")
                                                  ),
                                                  "aria-label": e.t(
                                                    "el.messagebox.close"
                                                  ),
                                                  onClick:
                                                    t[0] ||
                                                    (t[0] = (j) =>
                                                      e.handleAction(
                                                        e.distinguishCancelAndClose
                                                          ? "close"
                                                          : "cancel"
                                                      )),
                                                  onKeydown:
                                                    t[1] ||
                                                    (t[1] = withKeys(
                                                      withModifiers(
                                                        (j) =>
                                                          e.handleAction(
                                                            e.distinguishCancelAndClose
                                                              ? "close"
                                                              : "cancel"
                                                          ),
                                                        ["prevent"]
                                                      ),
                                                      ["enter"]
                                                    )),
                                                },
                                                [
                                                  createVNode(
                                                    y,
                                                    {
                                                      class: normalizeClass(
                                                        e.ns.e("close")
                                                      ),
                                                    },
                                                    {
                                                      default: withCtx(() => [
                                                        createVNode($),
                                                      ]),
                                                      _: 1,
                                                    },
                                                    8,
                                                    ["class"]
                                                  ),
                                                ],
                                                42,
                                                _hoisted_2$1
                                              ))
                                            : createCommentVNode("v-if", !0),
                                        ],
                                        2
                                      ))
                                    : createCommentVNode("v-if", !0),
                                  createBaseVNode(
                                    "div",
                                    {
                                      id: e.contentId,
                                      class: normalizeClass(e.ns.e("content")),
                                    },
                                    [
                                      createBaseVNode(
                                        "div",
                                        {
                                          class: normalizeClass(
                                            e.ns.e("container")
                                          ),
                                        },
                                        [
                                          e.iconComponent &&
                                          !e.center &&
                                          e.hasMessage
                                            ? (openBlock(),
                                              createBlock(
                                                y,
                                                {
                                                  key: 0,
                                                  class: normalizeClass([
                                                    e.ns.e("status"),
                                                    e.typeClass,
                                                  ]),
                                                },
                                                {
                                                  default: withCtx(() => [
                                                    (openBlock(),
                                                    createBlock(
                                                      resolveDynamicComponent(
                                                        e.iconComponent
                                                      )
                                                    )),
                                                  ]),
                                                  _: 1,
                                                },
                                                8,
                                                ["class"]
                                              ))
                                            : createCommentVNode("v-if", !0),
                                          e.hasMessage
                                            ? (openBlock(),
                                              createElementBlock(
                                                "div",
                                                {
                                                  key: 1,
                                                  class: normalizeClass(
                                                    e.ns.e("message")
                                                  ),
                                                },
                                                [
                                                  renderSlot(
                                                    e.$slots,
                                                    "default",
                                                    {},
                                                    () => [
                                                      e.dangerouslyUseHTMLString
                                                        ? (openBlock(),
                                                          createBlock(
                                                            resolveDynamicComponent(
                                                              e.showInput
                                                                ? "label"
                                                                : "p"
                                                            ),
                                                            {
                                                              key: 1,
                                                              for: e.showInput
                                                                ? e.inputId
                                                                : void 0,
                                                              innerHTML:
                                                                e.message,
                                                            },
                                                            null,
                                                            8,
                                                            ["for", "innerHTML"]
                                                          ))
                                                        : (openBlock(),
                                                          createBlock(
                                                            resolveDynamicComponent(
                                                              e.showInput
                                                                ? "label"
                                                                : "p"
                                                            ),
                                                            {
                                                              key: 0,
                                                              for: e.showInput
                                                                ? e.inputId
                                                                : void 0,
                                                            },
                                                            {
                                                              default: withCtx(
                                                                () => [
                                                                  createTextVNode(
                                                                    toDisplayString(
                                                                      e.dangerouslyUseHTMLString
                                                                        ? ""
                                                                        : e.message
                                                                    ),
                                                                    1
                                                                  ),
                                                                ]
                                                              ),
                                                              _: 1,
                                                            },
                                                            8,
                                                            ["for"]
                                                          )),
                                                    ]
                                                  ),
                                                ],
                                                2
                                              ))
                                            : createCommentVNode("v-if", !0),
                                        ],
                                        2
                                      ),
                                      withDirectives(
                                        createBaseVNode(
                                          "div",
                                          {
                                            class: normalizeClass(
                                              e.ns.e("input")
                                            ),
                                          },
                                          [
                                            createVNode(
                                              k,
                                              {
                                                id: e.inputId,
                                                ref: "inputRef",
                                                modelValue: e.inputValue,
                                                "onUpdate:modelValue":
                                                  t[2] ||
                                                  (t[2] = (j) =>
                                                    (e.inputValue = j)),
                                                type: e.inputType,
                                                placeholder: e.inputPlaceholder,
                                                "aria-invalid": e.validateError,
                                                class: normalizeClass({
                                                  invalid: e.validateError,
                                                }),
                                                onKeydown: withKeys(
                                                  e.handleInputEnter,
                                                  ["enter"]
                                                ),
                                              },
                                              null,
                                              8,
                                              [
                                                "id",
                                                "modelValue",
                                                "type",
                                                "placeholder",
                                                "aria-invalid",
                                                "class",
                                                "onKeydown",
                                              ]
                                            ),
                                            createBaseVNode(
                                              "div",
                                              {
                                                class: normalizeClass(
                                                  e.ns.e("errormsg")
                                                ),
                                                style: normalizeStyle({
                                                  visibility:
                                                    e.editorErrorMessage
                                                      ? "visible"
                                                      : "hidden",
                                                }),
                                              },
                                              toDisplayString(
                                                e.editorErrorMessage
                                              ),
                                              7
                                            ),
                                          ],
                                          2
                                        ),
                                        [[vShow, e.showInput]]
                                      ),
                                    ],
                                    10,
                                    _hoisted_3$1
                                  ),
                                  createBaseVNode(
                                    "div",
                                    { class: normalizeClass(e.ns.e("btns")) },
                                    [
                                      e.showCancelButton
                                        ? (openBlock(),
                                          createBlock(
                                            V,
                                            {
                                              key: 0,
                                              loading: e.cancelButtonLoading,
                                              class: normalizeClass([
                                                e.cancelButtonClass,
                                              ]),
                                              round: e.roundButton,
                                              size: e.btnSize,
                                              onClick:
                                                t[3] ||
                                                (t[3] = (j) =>
                                                  e.handleAction("cancel")),
                                              onKeydown:
                                                t[4] ||
                                                (t[4] = withKeys(
                                                  withModifiers(
                                                    (j) =>
                                                      e.handleAction("cancel"),
                                                    ["prevent"]
                                                  ),
                                                  ["enter"]
                                                )),
                                            },
                                            {
                                              default: withCtx(() => [
                                                createTextVNode(
                                                  toDisplayString(
                                                    e.cancelButtonText ||
                                                      e.t(
                                                        "el.messagebox.cancel"
                                                      )
                                                  ),
                                                  1
                                                ),
                                              ]),
                                              _: 1,
                                            },
                                            8,
                                            [
                                              "loading",
                                              "class",
                                              "round",
                                              "size",
                                            ]
                                          ))
                                        : createCommentVNode("v-if", !0),
                                      withDirectives(
                                        createVNode(
                                          V,
                                          {
                                            ref: "confirmRef",
                                            type: "primary",
                                            loading: e.confirmButtonLoading,
                                            class: normalizeClass([
                                              e.confirmButtonClasses,
                                            ]),
                                            round: e.roundButton,
                                            disabled: e.confirmButtonDisabled,
                                            size: e.btnSize,
                                            onClick:
                                              t[5] ||
                                              (t[5] = (j) =>
                                                e.handleAction("confirm")),
                                            onKeydown:
                                              t[6] ||
                                              (t[6] = withKeys(
                                                withModifiers(
                                                  (j) =>
                                                    e.handleAction("confirm"),
                                                  ["prevent"]
                                                ),
                                                ["enter"]
                                              )),
                                          },
                                          {
                                            default: withCtx(() => [
                                              createTextVNode(
                                                toDisplayString(
                                                  e.confirmButtonText ||
                                                    e.t("el.messagebox.confirm")
                                                ),
                                                1
                                              ),
                                            ]),
                                            _: 1,
                                          },
                                          8,
                                          [
                                            "loading",
                                            "class",
                                            "round",
                                            "disabled",
                                            "size",
                                          ]
                                        ),
                                        [[vShow, e.showConfirmButton]]
                                      ),
                                    ],
                                    2
                                  ),
                                ],
                                6
                              ),
                            ]),
                            _: 3,
                          },
                          8,
                          [
                            "trapped",
                            "focus-trap-el",
                            "focus-start-el",
                            "onReleaseRequested",
                          ]
                        ),
                      ],
                      42,
                      _hoisted_1
                    ),
                  ]),
                  _: 3,
                },
                8,
                ["z-index", "overlay-class", "mask"]
              ),
              [[vShow, e.visible]]
            ),
          ]),
          _: 3,
        }
      )
    );
  }
  var MessageBoxConstructor = _export_sfc$1(_sfc_main$2, [
    ["render", _sfc_render],
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/message-box/src/index.vue",
    ],
  ]);
  const messageInstance = new Map(),
    getAppendToElement = (e) => {
      let t = document.body;
      return (
        e.appendTo &&
          (isString$3(e.appendTo) && (t = document.querySelector(e.appendTo)),
          isElement(e.appendTo) && (t = e.appendTo),
          isElement(t) || (t = document.body)),
        t
      );
    },
    initInstance = (e, t, n = null) => {
      const r = createVNode(
        MessageBoxConstructor,
        e,
        isFunction$3(e.message) || isVNode(e.message)
          ? { default: isFunction$3(e.message) ? e.message : () => e.message }
          : null
      );
      return (
        (r.appContext = n),
        render(r, t),
        getAppendToElement(e).appendChild(t.firstElementChild),
        r.component
      );
    },
    genContainer = () => document.createElement("div"),
    showMessage = (e, t) => {
      const n = genContainer();
      (e.onVanish = () => {
        render(null, n), messageInstance.delete(i);
      }),
        (e.onAction = (g) => {
          const y = messageInstance.get(i);
          let $;
          e.showInput ? ($ = { value: i.inputValue, action: g }) : ($ = g),
            e.callback
              ? e.callback($, r.proxy)
              : g === "cancel" || g === "close"
              ? e.distinguishCancelAndClose && g !== "cancel"
                ? y.reject("close")
                : y.reject("cancel")
              : y.resolve($);
        });
      const r = initInstance(e, n, t),
        i = r.proxy;
      for (const g in e) hasOwn(e, g) && !hasOwn(i.$props, g) && (i[g] = e[g]);
      return (i.visible = !0), i;
    };
  function MessageBox(e, t = null) {
    if (!isClient$1) return Promise.reject();
    let n;
    return (
      isString$3(e) || isVNode(e) ? (e = { message: e }) : (n = e.callback),
      new Promise((r, i) => {
        const g = showMessage(e, t ?? MessageBox._context);
        messageInstance.set(g, {
          options: e,
          callback: n,
          resolve: r,
          reject: i,
        });
      })
    );
  }
  const MESSAGE_BOX_VARIANTS = ["alert", "confirm", "prompt"],
    MESSAGE_BOX_DEFAULT_OPTS = {
      alert: { closeOnPressEscape: !1, closeOnClickModal: !1 },
      confirm: { showCancelButton: !0 },
      prompt: { showCancelButton: !0, showInput: !0 },
    };
  MESSAGE_BOX_VARIANTS.forEach((e) => {
    MessageBox[e] = messageBoxFactory(e);
  });
  function messageBoxFactory(e) {
    return (t, n, r, i) => {
      let g = "";
      return (
        isObject$3(n)
          ? ((r = n), (g = ""))
          : isUndefined$1(n)
          ? (g = "")
          : (g = n),
        MessageBox(
          Object.assign(
            { title: g, message: t, type: "", ...MESSAGE_BOX_DEFAULT_OPTS[e] },
            r,
            { boxType: e }
          ),
          i
        )
      );
    };
  }
  MessageBox.close = () => {
    messageInstance.forEach((e, t) => {
      t.doClose();
    }),
      messageInstance.clear();
  };
  MessageBox._context = null;
  const _MessageBox = MessageBox;
  _MessageBox.install = (e) => {
    (_MessageBox._context = e._context),
      (e.config.globalProperties.$msgbox = _MessageBox),
      (e.config.globalProperties.$messageBox = _MessageBox),
      (e.config.globalProperties.$alert = _MessageBox.alert),
      (e.config.globalProperties.$confirm = _MessageBox.confirm),
      (e.config.globalProperties.$prompt = _MessageBox.prompt);
  };
  const ElMessageBox = _MessageBox,
    base = "",
    elDialog = "",
    elOverlay = "",
    elCollapse = "",
    elCollapseItem = "",
    elInput = "",
    elTag = "",
    elOption = "",
    elOptionGroup = "",
    elScrollbar = "",
    elPopper = "",
    elSelect = "",
    elButton = "",
    elTable = "",
    elCheckbox = "",
    elTooltip = "",
    elTableColumn = "",
    elSwitch = "",
    elBadge = "",
    elMessage = "",
    elMessageBox = "";
  var _a;
  const isClient = typeof window < "u",
    isFunction$1 = (e) => typeof e == "function",
    isString$1 = (e) => typeof e == "string",
    noop$1 = () => {};
  isClient &&
    (_a = window == null ? void 0 : window.navigator) != null &&
    _a.userAgent &&
    /iP(ad|hone|od)/.test(window.navigator.userAgent);
  function resolveUnref(e) {
    return typeof e == "function" ? e() : unref(e);
  }
  function createFilterWrapper(e, t) {
    function n(...r) {
      return new Promise((i, g) => {
        Promise.resolve(
          e(() => t.apply(this, r), { fn: t, thisArg: this, args: r })
        )
          .then(i)
          .catch(g);
      });
    }
    return n;
  }
  const bypassFilter = (e) => e();
  function pausableFilter(e = bypassFilter) {
    const t = ref(!0);
    function n() {
      t.value = !1;
    }
    function r() {
      t.value = !0;
    }
    return {
      isActive: t,
      pause: n,
      resume: r,
      eventFilter: (...g) => {
        t.value && e(...g);
      },
    };
  }
  function identity(e) {
    return e;
  }
  function tryOnScopeDispose(e) {
    return getCurrentScope() ? (onScopeDispose(e), !0) : !1;
  }
  function resolveRef(e) {
    return typeof e == "function" ? computed(e) : ref(e);
  }
  function tryOnMounted(e, t = !0) {
    getCurrentInstance() ? onMounted(e) : t ? e() : nextTick(e);
  }
  function useToggle(e = !1, t = {}) {
    const { truthyValue: n = !0, falsyValue: r = !1 } = t,
      i = isRef(e),
      g = ref(e);
    function y($) {
      if (arguments.length) return (g.value = $), g.value;
      {
        const k = resolveUnref(n);
        return (g.value = g.value === k ? resolveUnref(r) : k), g.value;
      }
    }
    return i ? y : [g, y];
  }
  var __getOwnPropSymbols$6 = Object.getOwnPropertySymbols,
    __hasOwnProp$6 = Object.prototype.hasOwnProperty,
    __propIsEnum$6 = Object.prototype.propertyIsEnumerable,
    __objRest$5 = (e, t) => {
      var n = {};
      for (var r in e)
        __hasOwnProp$6.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
      if (e != null && __getOwnPropSymbols$6)
        for (var r of __getOwnPropSymbols$6(e))
          t.indexOf(r) < 0 && __propIsEnum$6.call(e, r) && (n[r] = e[r]);
      return n;
    };
  function watchWithFilter(e, t, n = {}) {
    const r = n,
      { eventFilter: i = bypassFilter } = r,
      g = __objRest$5(r, ["eventFilter"]);
    return watch(e, createFilterWrapper(i, t), g);
  }
  var __defProp$2 = Object.defineProperty,
    __defProps$2 = Object.defineProperties,
    __getOwnPropDescs$2 = Object.getOwnPropertyDescriptors,
    __getOwnPropSymbols$2 = Object.getOwnPropertySymbols,
    __hasOwnProp$2 = Object.prototype.hasOwnProperty,
    __propIsEnum$2 = Object.prototype.propertyIsEnumerable,
    __defNormalProp$2 = (e, t, n) =>
      t in e
        ? __defProp$2(e, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: n,
          })
        : (e[t] = n),
    __spreadValues$2 = (e, t) => {
      for (var n in t || (t = {}))
        __hasOwnProp$2.call(t, n) && __defNormalProp$2(e, n, t[n]);
      if (__getOwnPropSymbols$2)
        for (var n of __getOwnPropSymbols$2(t))
          __propIsEnum$2.call(t, n) && __defNormalProp$2(e, n, t[n]);
      return e;
    },
    __spreadProps$2 = (e, t) => __defProps$2(e, __getOwnPropDescs$2(t)),
    __objRest$1 = (e, t) => {
      var n = {};
      for (var r in e)
        __hasOwnProp$2.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
      if (e != null && __getOwnPropSymbols$2)
        for (var r of __getOwnPropSymbols$2(e))
          t.indexOf(r) < 0 && __propIsEnum$2.call(e, r) && (n[r] = e[r]);
      return n;
    };
  function watchPausable(e, t, n = {}) {
    const r = n,
      { eventFilter: i } = r,
      g = __objRest$1(r, ["eventFilter"]),
      { eventFilter: y, pause: $, resume: k, isActive: V } = pausableFilter(i);
    return {
      stop: watchWithFilter(
        e,
        t,
        __spreadProps$2(__spreadValues$2({}, g), { eventFilter: y })
      ),
      pause: $,
      resume: k,
      isActive: V,
    };
  }
  function unrefElement(e) {
    var t;
    const n = resolveUnref(e);
    return (t = n == null ? void 0 : n.$el) != null ? t : n;
  }
  const defaultWindow = isClient ? window : void 0,
    defaultDocument = isClient ? window.document : void 0;
  function useEventListener(...e) {
    let t, n, r, i;
    if (
      (isString$1(e[0]) || Array.isArray(e[0])
        ? (([n, r, i] = e), (t = defaultWindow))
        : ([t, n, r, i] = e),
      !t)
    )
      return noop$1;
    Array.isArray(n) || (n = [n]), Array.isArray(r) || (r = [r]);
    const g = [],
      y = () => {
        g.forEach((L) => L()), (g.length = 0);
      },
      $ = (L, oe, j) => (
        L.addEventListener(oe, j, i), () => L.removeEventListener(oe, j, i)
      ),
      k = watch(
        () => unrefElement(t),
        (L) => {
          y(), L && g.push(...n.flatMap((oe) => r.map((j) => $(L, oe, j))));
        },
        { immediate: !0, flush: "post" }
      ),
      V = () => {
        k(), y();
      };
    return tryOnScopeDispose(V), V;
  }
  function useSupported(e, t = !1) {
    const n = ref(),
      r = () => (n.value = Boolean(e()));
    return r(), tryOnMounted(r, t), n;
  }
  function useMediaQuery(e, t = {}) {
    const { window: n = defaultWindow } = t,
      r = useSupported(
        () => n && "matchMedia" in n && typeof n.matchMedia == "function"
      );
    let i;
    const g = ref(!1),
      y = () => {
        i &&
          ("removeEventListener" in i
            ? i.removeEventListener("change", $)
            : i.removeListener($));
      },
      $ = () => {
        r.value &&
          (y(),
          (i = n.matchMedia(resolveRef(e).value)),
          (g.value = i.matches),
          "addEventListener" in i
            ? i.addEventListener("change", $)
            : i.addListener($));
      };
    return watchEffect($), tryOnScopeDispose(() => y()), g;
  }
  const _global$1 =
      typeof globalThis < "u"
        ? globalThis
        : typeof window < "u"
        ? window
        : typeof global < "u"
        ? global
        : typeof self < "u"
        ? self
        : {},
    globalKey = "__vueuse_ssr_handlers__";
  _global$1[globalKey] = _global$1[globalKey] || {};
  const handlers = _global$1[globalKey];
  function getSSRHandler(e, t) {
    return handlers[e] || t;
  }
  function guessSerializerType(e) {
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
  var __defProp$j = Object.defineProperty,
    __getOwnPropSymbols$l = Object.getOwnPropertySymbols,
    __hasOwnProp$l = Object.prototype.hasOwnProperty,
    __propIsEnum$l = Object.prototype.propertyIsEnumerable,
    __defNormalProp$j = (e, t, n) =>
      t in e
        ? __defProp$j(e, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: n,
          })
        : (e[t] = n),
    __spreadValues$j = (e, t) => {
      for (var n in t || (t = {}))
        __hasOwnProp$l.call(t, n) && __defNormalProp$j(e, n, t[n]);
      if (__getOwnPropSymbols$l)
        for (var n of __getOwnPropSymbols$l(t))
          __propIsEnum$l.call(t, n) && __defNormalProp$j(e, n, t[n]);
      return e;
    };
  const StorageSerializers = {
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
  };
  function useStorage(e, t, n, r = {}) {
    var i;
    const {
        flush: g = "pre",
        deep: y = !0,
        listenToStorageChanges: $ = !0,
        writeDefaults: k = !0,
        mergeDefaults: V = !1,
        shallow: L,
        window: oe = defaultWindow,
        eventFilter: j,
        onError: ae = (he) => {
          console.error(he);
        },
      } = r,
      z = (L ? shallowRef : ref)(t);
    if (!n)
      try {
        n = getSSRHandler("getDefaultStorage", () => {
          var he;
          return (he = defaultWindow) == null ? void 0 : he.localStorage;
        })();
      } catch (he) {
        ae(he);
      }
    if (!n) return z;
    const re = resolveUnref(t),
      ie = guessSerializerType(re),
      le = (i = r.serializer) != null ? i : StorageSerializers[ie],
      { pause: de, resume: ue } = watchPausable(z, () => pe(z.value), {
        flush: g,
        deep: y,
        eventFilter: j,
      });
    return oe && $ && useEventListener(oe, "storage", Oe), Oe(), z;
    function pe(he) {
      try {
        if (he == null) n.removeItem(e);
        else {
          const $e = le.write(he),
            Ve = n.getItem(e);
          Ve !== $e &&
            (n.setItem(e, $e),
            oe &&
              (oe == null ||
                oe.dispatchEvent(
                  new StorageEvent("storage", {
                    key: e,
                    oldValue: Ve,
                    newValue: $e,
                    storageArea: n,
                  })
                )));
        }
      } catch ($e) {
        ae($e);
      }
    }
    function Ce(he) {
      const $e = he ? he.newValue : n.getItem(e);
      if ($e == null) return k && re !== null && n.setItem(e, le.write(re)), re;
      if (!he && V) {
        const Ve = le.read($e);
        return isFunction$1(V)
          ? V(Ve, re)
          : ie === "object" && !Array.isArray(Ve)
          ? __spreadValues$j(__spreadValues$j({}, re), Ve)
          : Ve;
      } else return typeof $e != "string" ? $e : le.read($e);
    }
    function Oe(he) {
      if (!(he && he.storageArea !== n)) {
        if (he && he.key == null) {
          z.value = re;
          return;
        }
        if (!(he && he.key !== e)) {
          de();
          try {
            z.value = Ce(he);
          } catch ($e) {
            ae($e);
          } finally {
            he ? nextTick(ue) : ue();
          }
        }
      }
    }
  }
  function usePreferredDark(e) {
    return useMediaQuery("(prefers-color-scheme: dark)", e);
  }
  var __defProp$i = Object.defineProperty,
    __getOwnPropSymbols$k = Object.getOwnPropertySymbols,
    __hasOwnProp$k = Object.prototype.hasOwnProperty,
    __propIsEnum$k = Object.prototype.propertyIsEnumerable,
    __defNormalProp$i = (e, t, n) =>
      t in e
        ? __defProp$i(e, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: n,
          })
        : (e[t] = n),
    __spreadValues$i = (e, t) => {
      for (var n in t || (t = {}))
        __hasOwnProp$k.call(t, n) && __defNormalProp$i(e, n, t[n]);
      if (__getOwnPropSymbols$k)
        for (var n of __getOwnPropSymbols$k(t))
          __propIsEnum$k.call(t, n) && __defNormalProp$i(e, n, t[n]);
      return e;
    };
  function useColorMode(e = {}) {
    const {
        selector: t = "html",
        attribute: n = "class",
        initialValue: r = "auto",
        window: i = defaultWindow,
        storage: g,
        storageKey: y = "vueuse-color-scheme",
        listenToStorageChanges: $ = !0,
        storageRef: k,
        emitAuto: V,
      } = e,
      L = __spreadValues$i(
        { auto: "", light: "light", dark: "dark" },
        e.modes || {}
      ),
      oe = usePreferredDark({ window: i }),
      j = computed(() => (oe.value ? "dark" : "light")),
      ae =
        k ||
        (y == null
          ? ref(r)
          : useStorage(y, r, g, { window: i, listenToStorageChanges: $ })),
      z = computed({
        get() {
          return ae.value === "auto" && !V ? j.value : ae.value;
        },
        set(de) {
          ae.value = de;
        },
      }),
      re = getSSRHandler("updateHTMLAttrs", (de, ue, pe) => {
        const Ce = i == null ? void 0 : i.document.querySelector(de);
        if (Ce)
          if (ue === "class") {
            const Oe = pe.split(/\s/g);
            Object.values(L)
              .flatMap((he) => (he || "").split(/\s/g))
              .filter(Boolean)
              .forEach((he) => {
                Oe.includes(he)
                  ? Ce.classList.add(he)
                  : Ce.classList.remove(he);
              });
          } else Ce.setAttribute(ue, pe);
      });
    function ie(de) {
      var ue;
      const pe = de === "auto" ? j.value : de;
      re(t, n, (ue = L[pe]) != null ? ue : pe);
    }
    function le(de) {
      e.onChanged ? e.onChanged(de, ie) : ie(de);
    }
    return (
      watch(z, le, { flush: "post", immediate: !0 }),
      V && watch(j, () => le(z.value), { flush: "post" }),
      tryOnMounted(() => le(z.value)),
      z
    );
  }
  var __defProp$h = Object.defineProperty,
    __defProps$7 = Object.defineProperties,
    __getOwnPropDescs$7 = Object.getOwnPropertyDescriptors,
    __getOwnPropSymbols$j = Object.getOwnPropertySymbols,
    __hasOwnProp$j = Object.prototype.hasOwnProperty,
    __propIsEnum$j = Object.prototype.propertyIsEnumerable,
    __defNormalProp$h = (e, t, n) =>
      t in e
        ? __defProp$h(e, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: n,
          })
        : (e[t] = n),
    __spreadValues$h = (e, t) => {
      for (var n in t || (t = {}))
        __hasOwnProp$j.call(t, n) && __defNormalProp$h(e, n, t[n]);
      if (__getOwnPropSymbols$j)
        for (var n of __getOwnPropSymbols$j(t))
          __propIsEnum$j.call(t, n) && __defNormalProp$h(e, n, t[n]);
      return e;
    },
    __spreadProps$7 = (e, t) => __defProps$7(e, __getOwnPropDescs$7(t));
  function useDark(e = {}) {
    const {
        valueDark: t = "dark",
        valueLight: n = "",
        window: r = defaultWindow,
      } = e,
      i = useColorMode(
        __spreadProps$7(__spreadValues$h({}, e), {
          onChanged: ($, k) => {
            var V;
            e.onChanged
              ? (V = e.onChanged) == null || V.call(e, $ === "dark")
              : k($);
          },
          modes: { dark: t, light: n },
        })
      ),
      g = usePreferredDark({ window: r });
    return computed({
      get() {
        return i.value === "dark";
      },
      set($) {
        $ === g.value ? (i.value = "auto") : (i.value = $ ? "dark" : "light");
      },
    });
  }
  function useDocumentVisibility({ document: e = defaultDocument } = {}) {
    if (!e) return ref("visible");
    const t = ref(e.visibilityState);
    return (
      useEventListener(e, "visibilitychange", () => {
        t.value = e.visibilityState;
      }),
      t
    );
  }
  var SwipeDirection;
  (function (e) {
    (e.UP = "UP"),
      (e.RIGHT = "RIGHT"),
      (e.DOWN = "DOWN"),
      (e.LEFT = "LEFT"),
      (e.NONE = "NONE");
  })(SwipeDirection || (SwipeDirection = {}));
  var __defProp = Object.defineProperty,
    __getOwnPropSymbols = Object.getOwnPropertySymbols,
    __hasOwnProp = Object.prototype.hasOwnProperty,
    __propIsEnum = Object.prototype.propertyIsEnumerable,
    __defNormalProp = (e, t, n) =>
      t in e
        ? __defProp(e, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: n,
          })
        : (e[t] = n),
    __spreadValues = (e, t) => {
      for (var n in t || (t = {}))
        __hasOwnProp.call(t, n) && __defNormalProp(e, n, t[n]);
      if (__getOwnPropSymbols)
        for (var n of __getOwnPropSymbols(t))
          __propIsEnum.call(t, n) && __defNormalProp(e, n, t[n]);
      return e;
    };
  const _TransitionPresets = {
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
  __spreadValues({ linear: identity }, _TransitionPresets);
  function bind(e, t) {
    return function () {
      return e.apply(t, arguments);
    };
  }
  const { toString } = Object.prototype,
    { getPrototypeOf } = Object,
    kindOf = ((e) => (t) => {
      const n = toString.call(t);
      return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
    })(Object.create(null)),
    kindOfTest = (e) => ((e = e.toLowerCase()), (t) => kindOf(t) === e),
    typeOfTest = (e) => (t) => typeof t === e,
    { isArray } = Array,
    isUndefined = typeOfTest("undefined");
  function isBuffer(e) {
    return (
      e !== null &&
      !isUndefined(e) &&
      e.constructor !== null &&
      !isUndefined(e.constructor) &&
      isFunction(e.constructor.isBuffer) &&
      e.constructor.isBuffer(e)
    );
  }
  const isArrayBuffer = kindOfTest("ArrayBuffer");
  function isArrayBufferView(e) {
    let t;
    return (
      typeof ArrayBuffer < "u" && ArrayBuffer.isView
        ? (t = ArrayBuffer.isView(e))
        : (t = e && e.buffer && isArrayBuffer(e.buffer)),
      t
    );
  }
  const isString = typeOfTest("string"),
    isFunction = typeOfTest("function"),
    isNumber = typeOfTest("number"),
    isObject = (e) => e !== null && typeof e == "object",
    isBoolean = (e) => e === !0 || e === !1,
    isPlainObject = (e) => {
      if (kindOf(e) !== "object") return !1;
      const t = getPrototypeOf(e);
      return (
        (t === null ||
          t === Object.prototype ||
          Object.getPrototypeOf(t) === null) &&
        !(Symbol.toStringTag in e) &&
        !(Symbol.iterator in e)
      );
    },
    isDate = kindOfTest("Date"),
    isFile = kindOfTest("File"),
    isBlob = kindOfTest("Blob"),
    isFileList = kindOfTest("FileList"),
    isStream = (e) => isObject(e) && isFunction(e.pipe),
    isFormData = (e) => {
      const t = "[object FormData]";
      return (
        e &&
        ((typeof FormData == "function" && e instanceof FormData) ||
          toString.call(e) === t ||
          (isFunction(e.toString) && e.toString() === t))
      );
    },
    isURLSearchParams = kindOfTest("URLSearchParams"),
    trim = (e) =>
      e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
  function forEach(e, t, { allOwnKeys: n = !1 } = {}) {
    if (e === null || typeof e > "u") return;
    let r, i;
    if ((typeof e != "object" && (e = [e]), isArray(e)))
      for (r = 0, i = e.length; r < i; r++) t.call(null, e[r], r, e);
    else {
      const g = n ? Object.getOwnPropertyNames(e) : Object.keys(e),
        y = g.length;
      let $;
      for (r = 0; r < y; r++) ($ = g[r]), t.call(null, e[$], $, e);
    }
  }
  function findKey(e, t) {
    t = t.toLowerCase();
    const n = Object.keys(e);
    let r = n.length,
      i;
    for (; r-- > 0; ) if (((i = n[r]), t === i.toLowerCase())) return i;
    return null;
  }
  const _global =
      typeof self > "u" ? (typeof global > "u" ? globalThis : global) : self,
    isContextDefined = (e) => !isUndefined(e) && e !== _global;
  function merge() {
    const { caseless: e } = (isContextDefined(this) && this) || {},
      t = {},
      n = (r, i) => {
        const g = (e && findKey(t, i)) || i;
        isPlainObject(t[g]) && isPlainObject(r)
          ? (t[g] = merge(t[g], r))
          : isPlainObject(r)
          ? (t[g] = merge({}, r))
          : isArray(r)
          ? (t[g] = r.slice())
          : (t[g] = r);
      };
    for (let r = 0, i = arguments.length; r < i; r++)
      arguments[r] && forEach(arguments[r], n);
    return t;
  }
  const extend = (e, t, n, { allOwnKeys: r } = {}) => (
      forEach(
        t,
        (i, g) => {
          n && isFunction(i) ? (e[g] = bind(i, n)) : (e[g] = i);
        },
        { allOwnKeys: r }
      ),
      e
    ),
    stripBOM = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e),
    inherits = (e, t, n, r) => {
      (e.prototype = Object.create(t.prototype, r)),
        (e.prototype.constructor = e),
        Object.defineProperty(e, "super", { value: t.prototype }),
        n && Object.assign(e.prototype, n);
    },
    toFlatObject = (e, t, n, r) => {
      let i, g, y;
      const $ = {};
      if (((t = t || {}), e == null)) return t;
      do {
        for (i = Object.getOwnPropertyNames(e), g = i.length; g-- > 0; )
          (y = i[g]),
            (!r || r(y, e, t)) && !$[y] && ((t[y] = e[y]), ($[y] = !0));
        e = n !== !1 && getPrototypeOf(e);
      } while (e && (!n || n(e, t)) && e !== Object.prototype);
      return t;
    },
    endsWith = (e, t, n) => {
      (e = String(e)),
        (n === void 0 || n > e.length) && (n = e.length),
        (n -= t.length);
      const r = e.indexOf(t, n);
      return r !== -1 && r === n;
    },
    toArray = (e) => {
      if (!e) return null;
      if (isArray(e)) return e;
      let t = e.length;
      if (!isNumber(t)) return null;
      const n = new Array(t);
      for (; t-- > 0; ) n[t] = e[t];
      return n;
    },
    isTypedArray = (
      (e) => (t) =>
        e && t instanceof e
    )(typeof Uint8Array < "u" && getPrototypeOf(Uint8Array)),
    forEachEntry = (e, t) => {
      const r = (e && e[Symbol.iterator]).call(e);
      let i;
      for (; (i = r.next()) && !i.done; ) {
        const g = i.value;
        t.call(e, g[0], g[1]);
      }
    },
    matchAll = (e, t) => {
      let n;
      const r = [];
      for (; (n = e.exec(t)) !== null; ) r.push(n);
      return r;
    },
    isHTMLForm = kindOfTest("HTMLFormElement"),
    toCamelCase = (e) =>
      e.toLowerCase().replace(/[_-\s]([a-z\d])(\w*)/g, function (n, r, i) {
        return r.toUpperCase() + i;
      }),
    hasOwnProperty = (
      ({ hasOwnProperty: e }) =>
      (t, n) =>
        e.call(t, n)
    )(Object.prototype),
    isRegExp = kindOfTest("RegExp"),
    reduceDescriptors = (e, t) => {
      const n = Object.getOwnPropertyDescriptors(e),
        r = {};
      forEach(n, (i, g) => {
        t(i, g, e) !== !1 && (r[g] = i);
      }),
        Object.defineProperties(e, r);
    },
    freezeMethods = (e) => {
      reduceDescriptors(e, (t, n) => {
        if (
          isFunction(e) &&
          ["arguments", "caller", "callee"].indexOf(n) !== -1
        )
          return !1;
        const r = e[n];
        if (isFunction(r)) {
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
    toObjectSet = (e, t) => {
      const n = {},
        r = (i) => {
          i.forEach((g) => {
            n[g] = !0;
          });
        };
      return isArray(e) ? r(e) : r(String(e).split(t)), n;
    },
    noop = () => {},
    toFiniteNumber = (e, t) => ((e = +e), Number.isFinite(e) ? e : t),
    toJSONObject = (e) => {
      const t = new Array(10),
        n = (r, i) => {
          if (isObject(r)) {
            if (t.indexOf(r) >= 0) return;
            if (!("toJSON" in r)) {
              t[i] = r;
              const g = isArray(r) ? [] : {};
              return (
                forEach(r, (y, $) => {
                  const k = n(y, i + 1);
                  !isUndefined(k) && (g[$] = k);
                }),
                (t[i] = void 0),
                g
              );
            }
          }
          return r;
        };
      return n(e, 0);
    },
    utils = {
      isArray,
      isArrayBuffer,
      isBuffer,
      isFormData,
      isArrayBufferView,
      isString,
      isNumber,
      isBoolean,
      isObject,
      isPlainObject,
      isUndefined,
      isDate,
      isFile,
      isBlob,
      isRegExp,
      isFunction,
      isStream,
      isURLSearchParams,
      isTypedArray,
      isFileList,
      forEach,
      merge,
      extend,
      trim,
      stripBOM,
      inherits,
      toFlatObject,
      kindOf,
      kindOfTest,
      endsWith,
      toArray,
      forEachEntry,
      matchAll,
      isHTMLForm,
      hasOwnProperty,
      hasOwnProp: hasOwnProperty,
      reduceDescriptors,
      freezeMethods,
      toObjectSet,
      toCamelCase,
      noop,
      toFiniteNumber,
      findKey,
      global: _global,
      isContextDefined,
      toJSONObject,
    };
  function AxiosError(e, t, n, r, i) {
    Error.call(this),
      Error.captureStackTrace
        ? Error.captureStackTrace(this, this.constructor)
        : (this.stack = new Error().stack),
      (this.message = e),
      (this.name = "AxiosError"),
      t && (this.code = t),
      n && (this.config = n),
      r && (this.request = r),
      i && (this.response = i);
  }
  utils.inherits(AxiosError, Error, {
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
        config: utils.toJSONObject(this.config),
        code: this.code,
        status:
          this.response && this.response.status ? this.response.status : null,
      };
    },
  });
  const prototype$1 = AxiosError.prototype,
    descriptors = {};
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
    descriptors[e] = { value: e };
  });
  Object.defineProperties(AxiosError, descriptors);
  Object.defineProperty(prototype$1, "isAxiosError", { value: !0 });
  AxiosError.from = (e, t, n, r, i, g) => {
    const y = Object.create(prototype$1);
    return (
      utils.toFlatObject(
        e,
        y,
        function (k) {
          return k !== Error.prototype;
        },
        ($) => $ !== "isAxiosError"
      ),
      AxiosError.call(y, e.message, t, n, r, i),
      (y.cause = e),
      (y.name = e.name),
      g && Object.assign(y, g),
      y
    );
  };
  var browser = typeof self == "object" ? self.FormData : window.FormData;
  const FormData$2 = browser;
  function isVisitable(e) {
    return utils.isPlainObject(e) || utils.isArray(e);
  }
  function removeBrackets(e) {
    return utils.endsWith(e, "[]") ? e.slice(0, -2) : e;
  }
  function renderKey(e, t, n) {
    return e
      ? e
          .concat(t)
          .map(function (i, g) {
            return (i = removeBrackets(i)), !n && g ? "[" + i + "]" : i;
          })
          .join(n ? "." : "")
      : t;
  }
  function isFlatArray(e) {
    return utils.isArray(e) && !e.some(isVisitable);
  }
  const predicates = utils.toFlatObject(utils, {}, null, function (t) {
    return /^is[A-Z]/.test(t);
  });
  function isSpecCompliant(e) {
    return (
      e &&
      utils.isFunction(e.append) &&
      e[Symbol.toStringTag] === "FormData" &&
      e[Symbol.iterator]
    );
  }
  function toFormData(e, t, n) {
    if (!utils.isObject(e)) throw new TypeError("target must be an object");
    (t = t || new (FormData$2 || FormData)()),
      (n = utils.toFlatObject(
        n,
        { metaTokens: !0, dots: !1, indexes: !1 },
        !1,
        function (re, ie) {
          return !utils.isUndefined(ie[re]);
        }
      ));
    const r = n.metaTokens,
      i = n.visitor || L,
      g = n.dots,
      y = n.indexes,
      k = (n.Blob || (typeof Blob < "u" && Blob)) && isSpecCompliant(t);
    if (!utils.isFunction(i)) throw new TypeError("visitor must be a function");
    function V(z) {
      if (z === null) return "";
      if (utils.isDate(z)) return z.toISOString();
      if (!k && utils.isBlob(z))
        throw new AxiosError("Blob is not supported. Use a Buffer instead.");
      return utils.isArrayBuffer(z) || utils.isTypedArray(z)
        ? k && typeof Blob == "function"
          ? new Blob([z])
          : Buffer.from(z)
        : z;
    }
    function L(z, re, ie) {
      let le = z;
      if (z && !ie && typeof z == "object") {
        if (utils.endsWith(re, "{}"))
          (re = r ? re : re.slice(0, -2)), (z = JSON.stringify(z));
        else if (
          (utils.isArray(z) && isFlatArray(z)) ||
          utils.isFileList(z) ||
          (utils.endsWith(re, "[]") && (le = utils.toArray(z)))
        )
          return (
            (re = removeBrackets(re)),
            le.forEach(function (ue, pe) {
              !(utils.isUndefined(ue) || ue === null) &&
                t.append(
                  y === !0
                    ? renderKey([re], pe, g)
                    : y === null
                    ? re
                    : re + "[]",
                  V(ue)
                );
            }),
            !1
          );
      }
      return isVisitable(z) ? !0 : (t.append(renderKey(ie, re, g), V(z)), !1);
    }
    const oe = [],
      j = Object.assign(predicates, {
        defaultVisitor: L,
        convertValue: V,
        isVisitable,
      });
    function ae(z, re) {
      if (!utils.isUndefined(z)) {
        if (oe.indexOf(z) !== -1)
          throw Error("Circular reference detected in " + re.join("."));
        oe.push(z),
          utils.forEach(z, function (le, de) {
            (!(utils.isUndefined(le) || le === null) &&
              i.call(t, le, utils.isString(de) ? de.trim() : de, re, j)) ===
              !0 && ae(le, re ? re.concat(de) : [de]);
          }),
          oe.pop();
      }
    }
    if (!utils.isObject(e)) throw new TypeError("data must be an object");
    return ae(e), t;
  }
  function encode$1(e) {
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
  function AxiosURLSearchParams(e, t) {
    (this._pairs = []), e && toFormData(e, this, t);
  }
  const prototype = AxiosURLSearchParams.prototype;
  prototype.append = function (t, n) {
    this._pairs.push([t, n]);
  };
  prototype.toString = function (t) {
    const n = t
      ? function (r) {
          return t.call(this, r, encode$1);
        }
      : encode$1;
    return this._pairs
      .map(function (i) {
        return n(i[0]) + "=" + n(i[1]);
      }, "")
      .join("&");
  };
  function encode(e) {
    return encodeURIComponent(e)
      .replace(/%3A/gi, ":")
      .replace(/%24/g, "$")
      .replace(/%2C/gi, ",")
      .replace(/%20/g, "+")
      .replace(/%5B/gi, "[")
      .replace(/%5D/gi, "]");
  }
  function buildURL(e, t, n) {
    if (!t) return e;
    const r = (n && n.encode) || encode,
      i = n && n.serialize;
    let g;
    if (
      (i
        ? (g = i(t, n))
        : (g = utils.isURLSearchParams(t)
            ? t.toString()
            : new AxiosURLSearchParams(t, n).toString(r)),
      g)
    ) {
      const y = e.indexOf("#");
      y !== -1 && (e = e.slice(0, y)),
        (e += (e.indexOf("?") === -1 ? "?" : "&") + g);
    }
    return e;
  }
  class InterceptorManager {
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
      utils.forEach(this.handlers, function (r) {
        r !== null && t(r);
      });
    }
  }
  const InterceptorManager$1 = InterceptorManager,
    transitionalDefaults = {
      silentJSONParsing: !0,
      forcedJSONParsing: !0,
      clarifyTimeoutError: !1,
    },
    URLSearchParams$1 =
      typeof URLSearchParams < "u" ? URLSearchParams : AxiosURLSearchParams,
    FormData$1 = FormData,
    isStandardBrowserEnv = (() => {
      let e;
      return typeof navigator < "u" &&
        ((e = navigator.product) === "ReactNative" ||
          e === "NativeScript" ||
          e === "NS")
        ? !1
        : typeof window < "u" && typeof document < "u";
    })(),
    isStandardBrowserWebWorkerEnv = (() =>
      typeof WorkerGlobalScope < "u" &&
      self instanceof WorkerGlobalScope &&
      typeof self.importScripts == "function")(),
    platform = {
      isBrowser: !0,
      classes: {
        URLSearchParams: URLSearchParams$1,
        FormData: FormData$1,
        Blob,
      },
      isStandardBrowserEnv,
      isStandardBrowserWebWorkerEnv,
      protocols: ["http", "https", "file", "blob", "url", "data"],
    };
  function toURLEncodedForm(e, t) {
    return toFormData(
      e,
      new platform.classes.URLSearchParams(),
      Object.assign(
        {
          visitor: function (n, r, i, g) {
            return platform.isNode && utils.isBuffer(n)
              ? (this.append(r, n.toString("base64")), !1)
              : g.defaultVisitor.apply(this, arguments);
          },
        },
        t
      )
    );
  }
  function parsePropPath(e) {
    return utils
      .matchAll(/\w+|\[(\w*)]/g, e)
      .map((t) => (t[0] === "[]" ? "" : t[1] || t[0]));
  }
  function arrayToObject(e) {
    const t = {},
      n = Object.keys(e);
    let r;
    const i = n.length;
    let g;
    for (r = 0; r < i; r++) (g = n[r]), (t[g] = e[g]);
    return t;
  }
  function formDataToJSON(e) {
    function t(n, r, i, g) {
      let y = n[g++];
      const $ = Number.isFinite(+y),
        k = g >= n.length;
      return (
        (y = !y && utils.isArray(i) ? i.length : y),
        k
          ? (utils.hasOwnProp(i, y) ? (i[y] = [i[y], r]) : (i[y] = r), !$)
          : ((!i[y] || !utils.isObject(i[y])) && (i[y] = []),
            t(n, r, i[y], g) &&
              utils.isArray(i[y]) &&
              (i[y] = arrayToObject(i[y])),
            !$)
      );
    }
    if (utils.isFormData(e) && utils.isFunction(e.entries)) {
      const n = {};
      return (
        utils.forEachEntry(e, (r, i) => {
          t(parsePropPath(r), i, n, 0);
        }),
        n
      );
    }
    return null;
  }
  const DEFAULT_CONTENT_TYPE = { "Content-Type": void 0 };
  function stringifySafely(e, t, n) {
    if (utils.isString(e))
      try {
        return (t || JSON.parse)(e), utils.trim(e);
      } catch (r) {
        if (r.name !== "SyntaxError") throw r;
      }
    return (n || JSON.stringify)(e);
  }
  const defaults = {
    transitional: transitionalDefaults,
    adapter: ["xhr", "http"],
    transformRequest: [
      function (t, n) {
        const r = n.getContentType() || "",
          i = r.indexOf("application/json") > -1,
          g = utils.isObject(t);
        if (
          (g && utils.isHTMLForm(t) && (t = new FormData(t)),
          utils.isFormData(t))
        )
          return i && i ? JSON.stringify(formDataToJSON(t)) : t;
        if (
          utils.isArrayBuffer(t) ||
          utils.isBuffer(t) ||
          utils.isStream(t) ||
          utils.isFile(t) ||
          utils.isBlob(t)
        )
          return t;
        if (utils.isArrayBufferView(t)) return t.buffer;
        if (utils.isURLSearchParams(t))
          return (
            n.setContentType(
              "application/x-www-form-urlencoded;charset=utf-8",
              !1
            ),
            t.toString()
          );
        let $;
        if (g) {
          if (r.indexOf("application/x-www-form-urlencoded") > -1)
            return toURLEncodedForm(t, this.formSerializer).toString();
          if (
            ($ = utils.isFileList(t)) ||
            r.indexOf("multipart/form-data") > -1
          ) {
            const k = this.env && this.env.FormData;
            return toFormData(
              $ ? { "files[]": t } : t,
              k && new k(),
              this.formSerializer
            );
          }
        }
        return g || i
          ? (n.setContentType("application/json", !1), stringifySafely(t))
          : t;
      },
    ],
    transformResponse: [
      function (t) {
        const n = this.transitional || defaults.transitional,
          r = n && n.forcedJSONParsing,
          i = this.responseType === "json";
        if (t && utils.isString(t) && ((r && !this.responseType) || i)) {
          const y = !(n && n.silentJSONParsing) && i;
          try {
            return JSON.parse(t);
          } catch ($) {
            if (y)
              throw $.name === "SyntaxError"
                ? AxiosError.from(
                    $,
                    AxiosError.ERR_BAD_RESPONSE,
                    this,
                    null,
                    this.response
                  )
                : $;
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
    env: { FormData: platform.classes.FormData, Blob: platform.classes.Blob },
    validateStatus: function (t) {
      return t >= 200 && t < 300;
    },
    headers: { common: { Accept: "application/json, text/plain, */*" } },
  };
  utils.forEach(["delete", "get", "head"], function (t) {
    defaults.headers[t] = {};
  });
  utils.forEach(["post", "put", "patch"], function (t) {
    defaults.headers[t] = utils.merge(DEFAULT_CONTENT_TYPE);
  });
  const defaults$1 = defaults,
    ignoreDuplicateOf = utils.toObjectSet([
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
    parseHeaders = (e) => {
      const t = {};
      let n, r, i;
      return (
        e &&
          e
            .split(
              `
`
            )
            .forEach(function (y) {
              (i = y.indexOf(":")),
                (n = y.substring(0, i).trim().toLowerCase()),
                (r = y.substring(i + 1).trim()),
                !(!n || (t[n] && ignoreDuplicateOf[n])) &&
                  (n === "set-cookie"
                    ? t[n]
                      ? t[n].push(r)
                      : (t[n] = [r])
                    : (t[n] = t[n] ? t[n] + ", " + r : r));
            }),
        t
      );
    },
    $internals = Symbol("internals");
  function normalizeHeader(e) {
    return e && String(e).trim().toLowerCase();
  }
  function normalizeValue(e) {
    return e === !1 || e == null
      ? e
      : utils.isArray(e)
      ? e.map(normalizeValue)
      : String(e);
  }
  function parseTokens(e) {
    const t = Object.create(null),
      n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
    let r;
    for (; (r = n.exec(e)); ) t[r[1]] = r[2];
    return t;
  }
  function isValidHeaderName(e) {
    return /^[-_a-zA-Z]+$/.test(e.trim());
  }
  function matchHeaderValue(e, t, n, r) {
    if (utils.isFunction(r)) return r.call(this, t, n);
    if (utils.isString(t)) {
      if (utils.isString(r)) return t.indexOf(r) !== -1;
      if (utils.isRegExp(r)) return r.test(t);
    }
  }
  function formatHeader(e) {
    return e
      .trim()
      .toLowerCase()
      .replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
  }
  function buildAccessors(e, t) {
    const n = utils.toCamelCase(" " + t);
    ["get", "set", "has"].forEach((r) => {
      Object.defineProperty(e, r + n, {
        value: function (i, g, y) {
          return this[r].call(this, t, i, g, y);
        },
        configurable: !0,
      });
    });
  }
  class AxiosHeaders {
    constructor(t) {
      t && this.set(t);
    }
    set(t, n, r) {
      const i = this;
      function g($, k, V) {
        const L = normalizeHeader(k);
        if (!L) throw new Error("header name must be a non-empty string");
        const oe = utils.findKey(i, L);
        (!oe ||
          i[oe] === void 0 ||
          V === !0 ||
          (V === void 0 && i[oe] !== !1)) &&
          (i[oe || k] = normalizeValue($));
      }
      const y = ($, k) => utils.forEach($, (V, L) => g(V, L, k));
      return (
        utils.isPlainObject(t) || t instanceof this.constructor
          ? y(t, n)
          : utils.isString(t) && (t = t.trim()) && !isValidHeaderName(t)
          ? y(parseHeaders(t), n)
          : t != null && g(n, t, r),
        this
      );
    }
    get(t, n) {
      if (((t = normalizeHeader(t)), t)) {
        const r = utils.findKey(this, t);
        if (r) {
          const i = this[r];
          if (!n) return i;
          if (n === !0) return parseTokens(i);
          if (utils.isFunction(n)) return n.call(this, i, r);
          if (utils.isRegExp(n)) return n.exec(i);
          throw new TypeError("parser must be boolean|regexp|function");
        }
      }
    }
    has(t, n) {
      if (((t = normalizeHeader(t)), t)) {
        const r = utils.findKey(this, t);
        return !!(r && (!n || matchHeaderValue(this, this[r], r, n)));
      }
      return !1;
    }
    delete(t, n) {
      const r = this;
      let i = !1;
      function g(y) {
        if (((y = normalizeHeader(y)), y)) {
          const $ = utils.findKey(r, y);
          $ &&
            (!n || matchHeaderValue(r, r[$], $, n)) &&
            (delete r[$], (i = !0));
        }
      }
      return utils.isArray(t) ? t.forEach(g) : g(t), i;
    }
    clear() {
      return Object.keys(this).forEach(this.delete.bind(this));
    }
    normalize(t) {
      const n = this,
        r = {};
      return (
        utils.forEach(this, (i, g) => {
          const y = utils.findKey(r, g);
          if (y) {
            (n[y] = normalizeValue(i)), delete n[g];
            return;
          }
          const $ = t ? formatHeader(g) : String(g).trim();
          $ !== g && delete n[g], (n[$] = normalizeValue(i)), (r[$] = !0);
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
        utils.forEach(this, (r, i) => {
          r != null &&
            r !== !1 &&
            (n[i] = t && utils.isArray(r) ? r.join(", ") : r);
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
      return n.forEach((i) => r.set(i)), r;
    }
    static accessor(t) {
      const r = (this[$internals] = this[$internals] = { accessors: {} })
          .accessors,
        i = this.prototype;
      function g(y) {
        const $ = normalizeHeader(y);
        r[$] || (buildAccessors(i, y), (r[$] = !0));
      }
      return utils.isArray(t) ? t.forEach(g) : g(t), this;
    }
  }
  AxiosHeaders.accessor([
    "Content-Type",
    "Content-Length",
    "Accept",
    "Accept-Encoding",
    "User-Agent",
  ]);
  utils.freezeMethods(AxiosHeaders.prototype);
  utils.freezeMethods(AxiosHeaders);
  const AxiosHeaders$1 = AxiosHeaders;
  function transformData(e, t) {
    const n = this || defaults$1,
      r = t || n,
      i = AxiosHeaders$1.from(r.headers);
    let g = r.data;
    return (
      utils.forEach(e, function ($) {
        g = $.call(n, g, i.normalize(), t ? t.status : void 0);
      }),
      i.normalize(),
      g
    );
  }
  function isCancel(e) {
    return !!(e && e.__CANCEL__);
  }
  function CanceledError(e, t, n) {
    AxiosError.call(this, e ?? "canceled", AxiosError.ERR_CANCELED, t, n),
      (this.name = "CanceledError");
  }
  utils.inherits(CanceledError, AxiosError, { __CANCEL__: !0 });
  const httpAdapter = null;
  function settle(e, t, n) {
    const r = n.config.validateStatus;
    !n.status || !r || r(n.status)
      ? e(n)
      : t(
          new AxiosError(
            "Request failed with status code " + n.status,
            [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][
              Math.floor(n.status / 100) - 4
            ],
            n.config,
            n.request,
            n
          )
        );
  }
  const cookies = platform.isStandardBrowserEnv
    ? (function () {
        return {
          write: function (n, r, i, g, y, $) {
            const k = [];
            k.push(n + "=" + encodeURIComponent(r)),
              utils.isNumber(i) &&
                k.push("expires=" + new Date(i).toGMTString()),
              utils.isString(g) && k.push("path=" + g),
              utils.isString(y) && k.push("domain=" + y),
              $ === !0 && k.push("secure"),
              (document.cookie = k.join("; "));
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
  function isAbsoluteURL(e) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
  }
  function combineURLs(e, t) {
    return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
  }
  function buildFullPath(e, t) {
    return e && !isAbsoluteURL(t) ? combineURLs(e, t) : t;
  }
  const isURLSameOrigin = platform.isStandardBrowserEnv
    ? (function () {
        const t = /(msie|trident)/i.test(navigator.userAgent),
          n = document.createElement("a");
        let r;
        function i(g) {
          let y = g;
          return (
            t && (n.setAttribute("href", y), (y = n.href)),
            n.setAttribute("href", y),
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
          (r = i(window.location.href)),
          function (y) {
            const $ = utils.isString(y) ? i(y) : y;
            return $.protocol === r.protocol && $.host === r.host;
          }
        );
      })()
    : (function () {
        return function () {
          return !0;
        };
      })();
  function parseProtocol(e) {
    const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
    return (t && t[1]) || "";
  }
  function speedometer(e, t) {
    e = e || 10;
    const n = new Array(e),
      r = new Array(e);
    let i = 0,
      g = 0,
      y;
    return (
      (t = t !== void 0 ? t : 1e3),
      function (k) {
        const V = Date.now(),
          L = r[g];
        y || (y = V), (n[i] = k), (r[i] = V);
        let oe = g,
          j = 0;
        for (; oe !== i; ) (j += n[oe++]), (oe = oe % e);
        if (((i = (i + 1) % e), i === g && (g = (g + 1) % e), V - y < t))
          return;
        const ae = L && V - L;
        return ae ? Math.round((j * 1e3) / ae) : void 0;
      }
    );
  }
  function progressEventReducer(e, t) {
    let n = 0;
    const r = speedometer(50, 250);
    return (i) => {
      const g = i.loaded,
        y = i.lengthComputable ? i.total : void 0,
        $ = g - n,
        k = r($),
        V = g <= y;
      n = g;
      const L = {
        loaded: g,
        total: y,
        progress: y ? g / y : void 0,
        bytes: $,
        rate: k || void 0,
        estimated: k && y && V ? (y - g) / k : void 0,
        event: i,
      };
      (L[t ? "download" : "upload"] = !0), e(L);
    };
  }
  const isXHRAdapterSupported = typeof XMLHttpRequest < "u",
    xhrAdapter =
      isXHRAdapterSupported &&
      function (e) {
        return new Promise(function (n, r) {
          let i = e.data;
          const g = AxiosHeaders$1.from(e.headers).normalize(),
            y = e.responseType;
          let $;
          function k() {
            e.cancelToken && e.cancelToken.unsubscribe($),
              e.signal && e.signal.removeEventListener("abort", $);
          }
          utils.isFormData(i) &&
            (platform.isStandardBrowserEnv ||
              platform.isStandardBrowserWebWorkerEnv) &&
            g.setContentType(!1);
          let V = new XMLHttpRequest();
          if (e.auth) {
            const ae = e.auth.username || "",
              z = e.auth.password
                ? unescape(encodeURIComponent(e.auth.password))
                : "";
            g.set("Authorization", "Basic " + btoa(ae + ":" + z));
          }
          const L = buildFullPath(e.baseURL, e.url);
          V.open(
            e.method.toUpperCase(),
            buildURL(L, e.params, e.paramsSerializer),
            !0
          ),
            (V.timeout = e.timeout);
          function oe() {
            if (!V) return;
            const ae = AxiosHeaders$1.from(
                "getAllResponseHeaders" in V && V.getAllResponseHeaders()
              ),
              re = {
                data:
                  !y || y === "text" || y === "json"
                    ? V.responseText
                    : V.response,
                status: V.status,
                statusText: V.statusText,
                headers: ae,
                config: e,
                request: V,
              };
            settle(
              function (le) {
                n(le), k();
              },
              function (le) {
                r(le), k();
              },
              re
            ),
              (V = null);
          }
          if (
            ("onloadend" in V
              ? (V.onloadend = oe)
              : (V.onreadystatechange = function () {
                  !V ||
                    V.readyState !== 4 ||
                    (V.status === 0 &&
                      !(
                        V.responseURL && V.responseURL.indexOf("file:") === 0
                      )) ||
                    setTimeout(oe);
                }),
            (V.onabort = function () {
              V &&
                (r(
                  new AxiosError(
                    "Request aborted",
                    AxiosError.ECONNABORTED,
                    e,
                    V
                  )
                ),
                (V = null));
            }),
            (V.onerror = function () {
              r(new AxiosError("Network Error", AxiosError.ERR_NETWORK, e, V)),
                (V = null);
            }),
            (V.ontimeout = function () {
              let z = e.timeout
                ? "timeout of " + e.timeout + "ms exceeded"
                : "timeout exceeded";
              const re = e.transitional || transitionalDefaults;
              e.timeoutErrorMessage && (z = e.timeoutErrorMessage),
                r(
                  new AxiosError(
                    z,
                    re.clarifyTimeoutError
                      ? AxiosError.ETIMEDOUT
                      : AxiosError.ECONNABORTED,
                    e,
                    V
                  )
                ),
                (V = null);
            }),
            platform.isStandardBrowserEnv)
          ) {
            const ae =
              (e.withCredentials || isURLSameOrigin(L)) &&
              e.xsrfCookieName &&
              cookies.read(e.xsrfCookieName);
            ae && g.set(e.xsrfHeaderName, ae);
          }
          i === void 0 && g.setContentType(null),
            "setRequestHeader" in V &&
              utils.forEach(g.toJSON(), function (z, re) {
                V.setRequestHeader(re, z);
              }),
            utils.isUndefined(e.withCredentials) ||
              (V.withCredentials = !!e.withCredentials),
            y && y !== "json" && (V.responseType = e.responseType),
            typeof e.onDownloadProgress == "function" &&
              V.addEventListener(
                "progress",
                progressEventReducer(e.onDownloadProgress, !0)
              ),
            typeof e.onUploadProgress == "function" &&
              V.upload &&
              V.upload.addEventListener(
                "progress",
                progressEventReducer(e.onUploadProgress)
              ),
            (e.cancelToken || e.signal) &&
              (($ = (ae) => {
                V &&
                  (r(!ae || ae.type ? new CanceledError(null, e, V) : ae),
                  V.abort(),
                  (V = null));
              }),
              e.cancelToken && e.cancelToken.subscribe($),
              e.signal &&
                (e.signal.aborted
                  ? $()
                  : e.signal.addEventListener("abort", $)));
          const j = parseProtocol(L);
          if (j && platform.protocols.indexOf(j) === -1) {
            r(
              new AxiosError(
                "Unsupported protocol " + j + ":",
                AxiosError.ERR_BAD_REQUEST,
                e
              )
            );
            return;
          }
          V.send(i || null);
        });
      },
    knownAdapters = { http: httpAdapter, xhr: xhrAdapter };
  utils.forEach(knownAdapters, (e, t) => {
    if (e) {
      try {
        Object.defineProperty(e, "name", { value: t });
      } catch {}
      Object.defineProperty(e, "adapterName", { value: t });
    }
  });
  const adapters = {
    getAdapter: (e) => {
      e = utils.isArray(e) ? e : [e];
      const { length: t } = e;
      let n, r;
      for (
        let i = 0;
        i < t &&
        ((n = e[i]),
        !(r = utils.isString(n) ? knownAdapters[n.toLowerCase()] : n));
        i++
      );
      if (!r)
        throw r === !1
          ? new AxiosError(
              `Adapter ${n} is not supported by the environment`,
              "ERR_NOT_SUPPORT"
            )
          : new Error(
              utils.hasOwnProp(knownAdapters, n)
                ? `Adapter '${n}' is not available in the build`
                : `Unknown adapter '${n}'`
            );
      if (!utils.isFunction(r))
        throw new TypeError("adapter is not a function");
      return r;
    },
    adapters: knownAdapters,
  };
  function throwIfCancellationRequested(e) {
    if (
      (e.cancelToken && e.cancelToken.throwIfRequested(),
      e.signal && e.signal.aborted)
    )
      throw new CanceledError(null, e);
  }
  function dispatchRequest(e) {
    return (
      throwIfCancellationRequested(e),
      (e.headers = AxiosHeaders$1.from(e.headers)),
      (e.data = transformData.call(e, e.transformRequest)),
      ["post", "put", "patch"].indexOf(e.method) !== -1 &&
        e.headers.setContentType("application/x-www-form-urlencoded", !1),
      adapters
        .getAdapter(e.adapter || defaults$1.adapter)(e)
        .then(
          function (r) {
            return (
              throwIfCancellationRequested(e),
              (r.data = transformData.call(e, e.transformResponse, r)),
              (r.headers = AxiosHeaders$1.from(r.headers)),
              r
            );
          },
          function (r) {
            return (
              isCancel(r) ||
                (throwIfCancellationRequested(e),
                r &&
                  r.response &&
                  ((r.response.data = transformData.call(
                    e,
                    e.transformResponse,
                    r.response
                  )),
                  (r.response.headers = AxiosHeaders$1.from(
                    r.response.headers
                  )))),
              Promise.reject(r)
            );
          }
        )
    );
  }
  const headersToObject = (e) => (e instanceof AxiosHeaders$1 ? e.toJSON() : e);
  function mergeConfig(e, t) {
    t = t || {};
    const n = {};
    function r(V, L, oe) {
      return utils.isPlainObject(V) && utils.isPlainObject(L)
        ? utils.merge.call({ caseless: oe }, V, L)
        : utils.isPlainObject(L)
        ? utils.merge({}, L)
        : utils.isArray(L)
        ? L.slice()
        : L;
    }
    function i(V, L, oe) {
      if (utils.isUndefined(L)) {
        if (!utils.isUndefined(V)) return r(void 0, V, oe);
      } else return r(V, L, oe);
    }
    function g(V, L) {
      if (!utils.isUndefined(L)) return r(void 0, L);
    }
    function y(V, L) {
      if (utils.isUndefined(L)) {
        if (!utils.isUndefined(V)) return r(void 0, V);
      } else return r(void 0, L);
    }
    function $(V, L, oe) {
      if (oe in t) return r(V, L);
      if (oe in e) return r(void 0, V);
    }
    const k = {
      url: g,
      method: g,
      data: g,
      baseURL: y,
      transformRequest: y,
      transformResponse: y,
      paramsSerializer: y,
      timeout: y,
      timeoutMessage: y,
      withCredentials: y,
      adapter: y,
      responseType: y,
      xsrfCookieName: y,
      xsrfHeaderName: y,
      onUploadProgress: y,
      onDownloadProgress: y,
      decompress: y,
      maxContentLength: y,
      maxBodyLength: y,
      beforeRedirect: y,
      transport: y,
      httpAgent: y,
      httpsAgent: y,
      cancelToken: y,
      socketPath: y,
      responseEncoding: y,
      validateStatus: $,
      headers: (V, L) => i(headersToObject(V), headersToObject(L), !0),
    };
    return (
      utils.forEach(Object.keys(e).concat(Object.keys(t)), function (L) {
        const oe = k[L] || i,
          j = oe(e[L], t[L], L);
        (utils.isUndefined(j) && oe !== $) || (n[L] = j);
      }),
      n
    );
  }
  const VERSION = "1.2.1",
    validators$1 = {};
  ["object", "boolean", "number", "function", "string", "symbol"].forEach(
    (e, t) => {
      validators$1[e] = function (r) {
        return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
      };
    }
  );
  const deprecatedWarnings = {};
  validators$1.transitional = function (t, n, r) {
    function i(g, y) {
      return (
        "[Axios v" +
        VERSION +
        "] Transitional option '" +
        g +
        "'" +
        y +
        (r ? ". " + r : "")
      );
    }
    return (g, y, $) => {
      if (t === !1)
        throw new AxiosError(
          i(y, " has been removed" + (n ? " in " + n : "")),
          AxiosError.ERR_DEPRECATED
        );
      return (
        n &&
          !deprecatedWarnings[y] &&
          ((deprecatedWarnings[y] = !0),
          console.warn(
            i(
              y,
              " has been deprecated since v" +
                n +
                " and will be removed in the near future"
            )
          )),
        t ? t(g, y, $) : !0
      );
    };
  };
  function assertOptions(e, t, n) {
    if (typeof e != "object")
      throw new AxiosError(
        "options must be an object",
        AxiosError.ERR_BAD_OPTION_VALUE
      );
    const r = Object.keys(e);
    let i = r.length;
    for (; i-- > 0; ) {
      const g = r[i],
        y = t[g];
      if (y) {
        const $ = e[g],
          k = $ === void 0 || y($, g, e);
        if (k !== !0)
          throw new AxiosError(
            "option " + g + " must be " + k,
            AxiosError.ERR_BAD_OPTION_VALUE
          );
        continue;
      }
      if (n !== !0)
        throw new AxiosError("Unknown option " + g, AxiosError.ERR_BAD_OPTION);
    }
  }
  const validator = { assertOptions, validators: validators$1 },
    validators = validator.validators;
  class Axios {
    constructor(t) {
      (this.defaults = t),
        (this.interceptors = {
          request: new InterceptorManager$1(),
          response: new InterceptorManager$1(),
        });
    }
    request(t, n) {
      typeof t == "string" ? ((n = n || {}), (n.url = t)) : (n = t || {}),
        (n = mergeConfig(this.defaults, n));
      const { transitional: r, paramsSerializer: i, headers: g } = n;
      r !== void 0 &&
        validator.assertOptions(
          r,
          {
            silentJSONParsing: validators.transitional(validators.boolean),
            forcedJSONParsing: validators.transitional(validators.boolean),
            clarifyTimeoutError: validators.transitional(validators.boolean),
          },
          !1
        ),
        i !== void 0 &&
          validator.assertOptions(
            i,
            { encode: validators.function, serialize: validators.function },
            !0
          ),
        (n.method = (n.method || this.defaults.method || "get").toLowerCase());
      let y;
      (y = g && utils.merge(g.common, g[n.method])),
        y &&
          utils.forEach(
            ["delete", "get", "head", "post", "put", "patch", "common"],
            (z) => {
              delete g[z];
            }
          ),
        (n.headers = AxiosHeaders$1.concat(y, g));
      const $ = [];
      let k = !0;
      this.interceptors.request.forEach(function (re) {
        (typeof re.runWhen == "function" && re.runWhen(n) === !1) ||
          ((k = k && re.synchronous), $.unshift(re.fulfilled, re.rejected));
      });
      const V = [];
      this.interceptors.response.forEach(function (re) {
        V.push(re.fulfilled, re.rejected);
      });
      let L,
        oe = 0,
        j;
      if (!k) {
        const z = [dispatchRequest.bind(this), void 0];
        for (
          z.unshift.apply(z, $),
            z.push.apply(z, V),
            j = z.length,
            L = Promise.resolve(n);
          oe < j;

        )
          L = L.then(z[oe++], z[oe++]);
        return L;
      }
      j = $.length;
      let ae = n;
      for (oe = 0; oe < j; ) {
        const z = $[oe++],
          re = $[oe++];
        try {
          ae = z(ae);
        } catch (ie) {
          re.call(this, ie);
          break;
        }
      }
      try {
        L = dispatchRequest.call(this, ae);
      } catch (z) {
        return Promise.reject(z);
      }
      for (oe = 0, j = V.length; oe < j; ) L = L.then(V[oe++], V[oe++]);
      return L;
    }
    getUri(t) {
      t = mergeConfig(this.defaults, t);
      const n = buildFullPath(t.baseURL, t.url);
      return buildURL(n, t.params, t.paramsSerializer);
    }
  }
  utils.forEach(["delete", "get", "head", "options"], function (t) {
    Axios.prototype[t] = function (n, r) {
      return this.request(
        mergeConfig(r || {}, { method: t, url: n, data: (r || {}).data })
      );
    };
  });
  utils.forEach(["post", "put", "patch"], function (t) {
    function n(r) {
      return function (g, y, $) {
        return this.request(
          mergeConfig($ || {}, {
            method: t,
            headers: r ? { "Content-Type": "multipart/form-data" } : {},
            url: g,
            data: y,
          })
        );
      };
    }
    (Axios.prototype[t] = n()), (Axios.prototype[t + "Form"] = n(!0));
  });
  const Axios$1 = Axios;
  class CancelToken {
    constructor(t) {
      if (typeof t != "function")
        throw new TypeError("executor must be a function.");
      let n;
      this.promise = new Promise(function (g) {
        n = g;
      });
      const r = this;
      this.promise.then((i) => {
        if (!r._listeners) return;
        let g = r._listeners.length;
        for (; g-- > 0; ) r._listeners[g](i);
        r._listeners = null;
      }),
        (this.promise.then = (i) => {
          let g;
          const y = new Promise(($) => {
            r.subscribe($), (g = $);
          }).then(i);
          return (
            (y.cancel = function () {
              r.unsubscribe(g);
            }),
            y
          );
        }),
        t(function (g, y, $) {
          r.reason || ((r.reason = new CanceledError(g, y, $)), n(r.reason));
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
        token: new CancelToken(function (i) {
          t = i;
        }),
        cancel: t,
      };
    }
  }
  const CancelToken$1 = CancelToken;
  function spread(e) {
    return function (n) {
      return e.apply(null, n);
    };
  }
  function isAxiosError(e) {
    return utils.isObject(e) && e.isAxiosError === !0;
  }
  function createInstance(e) {
    const t = new Axios$1(e),
      n = bind(Axios$1.prototype.request, t);
    return (
      utils.extend(n, Axios$1.prototype, t, { allOwnKeys: !0 }),
      utils.extend(n, t, null, { allOwnKeys: !0 }),
      (n.create = function (i) {
        return createInstance(mergeConfig(e, i));
      }),
      n
    );
  }
  const axios = createInstance(defaults$1);
  axios.Axios = Axios$1;
  axios.CanceledError = CanceledError;
  axios.CancelToken = CancelToken$1;
  axios.isCancel = isCancel;
  axios.VERSION = VERSION;
  axios.toFormData = toFormData;
  axios.AxiosError = AxiosError;
  axios.Cancel = axios.CanceledError;
  axios.all = function (t) {
    return Promise.all(t);
  };
  axios.spread = spread;
  axios.isAxiosError = isAxiosError;
  axios.mergeConfig = mergeConfig;
  axios.AxiosHeaders = AxiosHeaders$1;
  axios.formToJSON = (e) =>
    formDataToJSON(utils.isHTMLForm(e) ? new FormData(e) : e);
  axios.default = axios;
  const axios$1 = axios,
    HelloWorld_vue_vue_type_style_index_0_scoped_31a1aca3_lang = "",
    _export_sfc = (e, t) => {
      const n = e.__vccOpts || e;
      for (const [r, i] of t) n[r] = i;
      return n;
    },
    _withScopeId = (e) => (
      pushScopeId("data-v-31a1aca3"), (e = e()), popScopeId(), e
    ),
    _hoisted_2 = { class: "main" },
    _hoisted_3 = { key: 0 },
    _hoisted_4 = _withScopeId(() => createBaseVNode("br", null, null, -1)),
    _hoisted_5 = { key: 1 },
    _hoisted_6 = { class: "operation" },
    _hoisted_7 = { class: "toggle" },
    _hoisted_8 = _withScopeId(() => createBaseVNode("code", null, "总计", -1)),
    _hoisted_9 = { class: "total" },
    _hoisted_10 = _withScopeId(() =>
      createBaseVNode("div", { class: "info" }, null, -1)
    ),
    _hoisted_11 = _withScopeId(() =>
      createBaseVNode(
        "div",
        { class: "version" },
        "版本号：v3.3.3（2023年1月19日3:3:3）",
        -1
      )
    ),
    _hoisted_12 = { class: "buttons" },
    _hoisted_13 = { class: "moreF" },
    _hoisted_14 = { class: "switchRoom" },
    _hoisted_15 = ["onClick"],
    _hoisted_16 = { key: 0, class: "latelyRecord" },
    _hoisted_17 = {
      class: "title",
      style: {
        display: "flex",
        "justify-content": "space-between",
        "align-items": "center",
      },
    },
    _hoisted_18 = _withScopeId(() => createBaseVNode("div", null, null, -1)),
    _hoisted_19 = _withScopeId(() => createBaseVNode("br", null, null, -1)),
    _hoisted_20 = _withScopeId(() => createBaseVNode("br", null, null, -1)),
    _hoisted_21 = { key: 0, class: "showMore" },
    _hoisted_22 = _withScopeId(() =>
      createBaseVNode(
        "div",
        null,
        [
          createTextVNode(" 1.输入金额后，点击添加，即可添加一条记录（"),
          createBaseVNode(
            "b",
            null,
            "输入到最后一个数据时，点击输入框即可自动计算"
          ),
          createTextVNode("） "),
        ],
        -1
      )
    ),
    _hoisted_23 = _withScopeId(() => createBaseVNode("br", null, null, -1)),
    _hoisted_24 = _withScopeId(() => createBaseVNode("br", null, null, -1)),
    _hoisted_25 = _withScopeId(() => createBaseVNode("br", null, null, -1)),
    _hoisted_26 = _withScopeId(() => createBaseVNode("br", null, null, -1)),
    _hoisted_27 = _withScopeId(() => createBaseVNode("br", null, null, -1)),
    _hoisted_28 = _withScopeId(() => createBaseVNode("br", null, null, -1)),
    _hoisted_29 = _withScopeId(() =>
      createBaseVNode(
        "b",
        null,
        "3.0.0 版本已经实现 用户创建房间，房间内多人同时使用√（目前是所有人共用一个房间×）",
        -1
      )
    ),
    _hoisted_30 = _withScopeId(() => createBaseVNode("br", null, null, -1)),
    _hoisted_31 = { key: 0 },
    _hoisted_32 = _withScopeId(() =>
      createBaseVNode("b", null, "点击右上角三个点，选择浮窗", -1)
    ),
    _hoisted_33 = {
      style: { display: "flex", "justify-content": "space-between" },
    },
    _hoisted_34 = _withScopeId(() => createBaseVNode("br", null, null, -1)),
    _hoisted_35 = { style: { "margin-top": "20px" } },
    _hoisted_36 = { style: { "font-size": "14px", "text-align": "center" } },
    _hoisted_37 = _withScopeId(() => createBaseVNode("br", null, null, -1)),
    _hoisted_38 = { class: "detailRecord" },
    _hoisted_39 = { type: "primary", size: "default" },
    _hoisted_40 = { class: "card1" },
    _hoisted_41 = { class: "total" },
    _hoisted_42 = { style: { "font-size": "14px", "text-align": "center" } },
    _hoisted_43 = _withScopeId(() => createBaseVNode("br", null, null, -1)),
    _hoisted_44 = { style: { "font-size": "14px", "text-align": "center" } },
    _hoisted_45 = _withScopeId(() => createBaseVNode("br", null, null, -1)),
    _hoisted_46 = { style: { "font-size": "14px", "text-align": "center" } },
    _hoisted_47 = _withScopeId(() => createBaseVNode("br", null, null, -1)),
    _hoisted_48 = { style: { "font-size": "14px", "text-align": "center" } },
    _hoisted_49 = _withScopeId(() => createBaseVNode("br", null, null, -1)),
    _hoisted_50 = {
      style: { display: "flex", "justify-content": "space-between" },
    },
    _hoisted_51 = _withScopeId(() => createBaseVNode("br", null, null, -1)),
    _hoisted_52 = { style: { "margin-top": "20px" } },
    _hoisted_53 = { style: { "font-size": "14px", "text-align": "center" } },
    _hoisted_54 = _withScopeId(() => createBaseVNode("br", null, null, -1)),
    _hoisted_55 = { class: "table" },
    _hoisted_56 = { style: { border: "none" } },
    _hoisted_57 = { type: "primary", size: "default" },
    _hoisted_58 = { class: "card1" },
    _hoisted_59 = { class: "total" },
    _hoisted_60 = { style: { "font-size": "14px", "text-align": "center" } },
    _hoisted_61 = _withScopeId(() => createBaseVNode("br", null, null, -1)),
    _hoisted_62 = { style: { "font-size": "14px", "text-align": "center" } },
    _hoisted_63 = _withScopeId(() => createBaseVNode("br", null, null, -1)),
    _hoisted_64 = { style: { "font-size": "14px", "text-align": "center" } },
    _hoisted_65 = _withScopeId(() => createBaseVNode("br", null, null, -1)),
    _hoisted_66 = { style: { "font-size": "14px", "text-align": "center" } },
    _hoisted_67 = _withScopeId(() => createBaseVNode("br", null, null, -1)),
    _sfc_main$1 = {
      __name: "HelloWorld",
      setup(__props) {
        const isDark = useDark(),
          toggleDark = useToggle(isDark),
          url = "https://api.fy99.eu.org/mj/api";
        let mahjongData = reactive({
            data: [],
            activeName: "",
            isLoading: !1,
            showTotal: !0,
          }),
          latelyData = reactive({
            data: [],
            showMore: !1,
            showDetail: !1,
            detailData: {},
          }),
          tableData = computed(() => {
            let e = [],
              t = mahjongData.data.length;
            if (t === 0) return [];
            let n = mahjongData.data[0].mahjongRecord.length,
              r = {};
            for (let i = 0; i < t; i++) {
              let g = mahjongData.data[i];
              r[i] =
                `胜率
` +
                (getWinningProbability(g) + " " + getWinningText(g));
            }
            e.push(r), (r = {});
            for (let i = 0; i < t; i++) {
              let g = mahjongData.data[i];
              r[i] = getContestStreak(g);
            }
            e.push(r);
            for (let i = 0; i < n; i++) {
              let g = {};
              for (let y = 0; y < t; y++)
                g[y] = mahjongData.data[y].mahjongRecord[i];
              e.push(g);
            }
            return e;
          }),
          tableHeaders = computed(() => {
            let e = [];
            for (let t = 0; t < mahjongData.data.length; t++) {
              let n = mahjongData.data[t];
              e.push(n.name);
            }
            return e;
          });
        const tableRowClassName = ({ row: e, rowIndex: t }) => {
            e.index = t;
          },
          roomNumber = useStorage("roomNumber", "000000"),
          getRoomNumberList = async () => {
            let data = { type: "getRoomNumberList" };
            try {
              let res = await axios$1.post(url, data);
              roomNumberList = eval(res.data.roomNumberList);
            } catch (e) {
              ElMessage({
                message: "获取房间名列表失败，请检查网络连接" + e,
                type: "error",
              });
            }
          };
        let roomNumberList = reactive([]);
        const getDateByIndex = (e) =>
            dayjs(new Date(latelyData.data[e].date)).format("YYYY-MM-DD HH:mm"),
          getDateByTime = (e) => dayjs(new Date(e)).format("YYYY-MM-DD HH:mm");
        let sumData = reactive({ showDetail: !1, detailData: {} });
        const uploadData = async () => {
            let e = {
              mahjongData: mahjongData.data,
              latelyData: latelyData.data,
              type: "upload",
              roomNumber: roomNumber.value,
            };
            try {
              let t = await axios$1.post(url, e);
            } catch (t) {
              ElMessage({
                message: "上传数据失败，请检查网络连接" + t,
                type: "error",
              });
            }
          },
          switchRooms = async (e) => {
            if (roomNumber === e)
              return ElMessage({
                message: "已经在该房间了，无需切换",
                type: "success",
              });
            if (((roomNumber.value = e), (await downloadData()) !== "error")) {
              if (
                (ElMessage({ message: `切换${e}房间成功`, type: "success" }),
                getRoomNumberList(),
                mahjongData.data.length === 0)
              )
                return ElMessage({
                  message: "房间为空请先添加玩家",
                  type: "warning",
                });
              mahjongData.activeName = "";
            }
          },
          createRoom = async () => {
            ElMessageBox.prompt("请输入房间名", "创建房间", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
            })
              .then(async ({ value: e }) => {
                e = e.replace(/\s+/g, "");
                let t = { type: "createRoom", roomNumber: e };
                try {
                  (await axios$1.post(url, t)).data === "success"
                    ? (ElMessage({
                        message: `创建${e}房间成功`,
                        type: "success",
                      }),
                      switchRooms(e))
                    : ElMessage({ message: `创建${e}房间失败`, type: "error" });
                } catch (n) {
                  ElMessage({
                    message: "创建房间失败，请检查网络连接" + n,
                    type: "error",
                  });
                }
              })
              .catch(() => {});
          },
          deleteRoom = async () => {
            ElMessageBox.confirm(
              `此操作将永久删除${roomNumber.value}, 是否继续?`,
              "提示",
              {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
              }
            )
              .then(async () => {
                if (latelyData.data.length !== 0)
                  ElMessageBox.confirm(
                    "当前房间有最近记录，请确定结余后清空，删除房间后数据无法恢复!!!",
                    "提示",
                    {
                      confirmButtonText: "确定",
                      cancelButtonText: "取消",
                      type: "warning",
                    }
                  )
                    .then(async () => {
                      let e = {
                        type: "deleteRoom",
                        roomNumber: roomNumber.value,
                      };
                      try {
                        (await axios$1.post(url, e)).data === "success"
                          ? (ElMessage({
                              message: `删除${roomNumber.value}房间成功`,
                              type: "success",
                            }),
                            switchRooms("000000"))
                          : ElMessage({
                              message: `删除${roomNumber.value}房间失败`,
                              type: "error",
                            });
                      } catch (t) {
                        ElMessage({
                          message: "删除最近记录失败，请检查网络连接" + t,
                          type: "error",
                        });
                      }
                    })
                    .catch(() => {});
                else {
                  console.log("else");
                  let e = { type: "deleteRoom", roomNumber: roomNumber.value };
                  try {
                    (await axios$1.post(url, e)).data === "success"
                      ? (ElMessage({
                          message: `删除${roomNumber.value}房间成功`,
                          type: "success",
                        }),
                        (roomNumber.value = "000000"),
                        switchRooms(roomNumber.value))
                      : ElMessage({
                          message: `删除${roomNumber.value}房间失败`,
                          type: "error",
                        });
                  } catch (t) {
                    ElMessage({
                      message: "删除房间失败，请检查网络连接" + t,
                      type: "error",
                    });
                  }
                }
              })
              .catch(() => {});
          },
          downloadData = async () => {
            let e = { type: "download", roomNumber: roomNumber.value };
            try {
              let n = (await axios$1.post(url, e)).data;
              return (
                JSON.stringify(n.mahjongData) !=
                  JSON.stringify(mahjongData.data) &&
                  (mahjongData.data = n.mahjongData),
                JSON.stringify(n.latelyData) !=
                  JSON.stringify(latelyData.data) &&
                  (latelyData.data = n.latelyData),
                n
              );
            } catch (t) {
              return (
                ElMessage({
                  message: "下载数据失败，请检查网络连接" + t,
                  type: "error",
                }),
                "error"
              );
            }
          },
          updateData = () => {
            for (let e = 0; e < mahjongData.data.length; e++)
              if (mahjongData.data[e].thisMoney !== "") {
                ElMessage({
                  message: "当前还有未结算的数据，请结算后再更新",
                  type: "warning",
                });
                return;
              }
            downloadData();
          },
          clearCloudData = async () => {
            let e = { type: "clear", roomNumber: roomNumber.value };
            await axios$1.post(url, e), downloadData();
          },
          showCol = (e) => {
            (document.querySelector(".operation").style.zIndex = -100),
              e === "" &&
                setTimeout(() => {
                  document.querySelector(".operation").style.zIndex = 100;
                }, 300);
          };
        onMounted(() => {
          (mahjongData.isLoading = !0),
            downloadData(),
            (mahjongData.isLoading = !1),
            getRoomNumberList(),
            (mahjongData.activeName = ["2"]);
          let e = document.querySelector(".version");
          clickEvent(e, null, cleanCache);
        });
        const visibility = useDocumentVisibility();
        watch(visibility, (e) => {
          e === "visible" && downloadData();
        });
        const dealNum = (e, t) => {
            if (t === "blur") {
              (document.querySelector(".operation").style.backgroundColor = ""),
                (document.querySelector(".operation").style.zIndex = -1e3);
              return;
            }
            (mahjongData.activeName = ""),
              (document.querySelector(".operation").style.zIndex = 100),
              (document.querySelector(".operation").style.backgroundColor =
                "rgba(181, 178, 178, 0.19)");
            let n = document.querySelectorAll(".thisMoney input"),
              r = Array.from(n),
              i = 0;
            if (
              (n.forEach((y) => {
                if (y.value === "" || isNaN(y.value) || y === e.target)
                  return !1;
                i++;
              }),
              i < n.length - 1)
            )
              return;
            let g = 0;
            r.forEach((y) => {
              y !== e.target && y.value && (g += Number(y.value));
            }),
              (mahjongData.data[r.indexOf(e.target)].thisMoney = -g);
          },
          addI = () => {
            if (mahjongData.data.length === 0) {
              ElMessage({ message: "请先添加玩家", type: "warning" });
              return;
            }
            let e = document.querySelectorAll(".thisMoney input"),
              t = Array.from(e),
              n = !0;
            if (
              (e.forEach((i, g) => {
                if (i.value === "" || isNaN(i.value))
                  return (
                    ElMessage({
                      message: `"${mahjongData.data[g].name}"数据填写有误`,
                      type: "warning",
                    }),
                    (n = !1),
                    !1
                  );
              }),
              !n)
            )
              return;
            let r = 0;
            if (
              (t.forEach((i) => {
                r += Number(i.value);
              }),
              r !== 0 &&
                (ElMessage({ message: "合计不为0", type: "warning" }),
                (n = !1)),
              !!n)
            ) {
              for (let i = 0; i < t.length; i++)
                (mahjongData.data[i].thisMoney = Number(t[i].value)),
                  mahjongData.data[i].thisMoney >= 0
                    ? (mahjongData.data[i].numberOfVictories++,
                      (mahjongData.data[i].moneyOfVictories +=
                        mahjongData.data[i].thisMoney))
                    : (mahjongData.data[i].numberOfDefeats++,
                      (mahjongData.data[i].moneyOfDefeats +=
                        mahjongData.data[i].thisMoney)),
                  (mahjongData.data[i].moneyOfTotal +=
                    mahjongData.data[i].thisMoney),
                  (mahjongData.data[i].winningProbability = (
                    mahjongData.data[i].numberOfVictories /
                    (mahjongData.data[i].numberOfVictories +
                      mahjongData.data[i].numberOfDefeats)
                  ).toFixed(4)),
                  mahjongData.data[i].mahjongRecord.push(
                    mahjongData.data[i].thisMoney
                  ),
                  (mahjongData.data[i].thisMoney = "");
              uploadData(), ElMessage({ message: "添加成功", type: "success" });
            }
          },
          deleteI = (e) => {
            (isNaN(e) && ((e = e.index - 2), e < 0)) ||
              ElMessageBox.confirm(
                "此操作将永久删除该记录, 是否继续?",
                "提示",
                {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning",
                }
              )
                .then(() => {
                  console.log("删除"),
                    mahjongData.data.forEach((t) => {
                      t.mahjongRecord[e] >= 0
                        ? (t.numberOfVictories--,
                          (t.moneyOfVictories -= t.mahjongRecord[e]))
                        : (t.numberOfDefeats--,
                          (t.moneyOfDefeats -= t.mahjongRecord[e])),
                        (t.moneyOfTotal -= t.mahjongRecord[e]),
                        (t.winningProbability = (
                          t.numberOfVictories /
                          (t.numberOfVictories + t.numberOfDefeats)
                        ).toFixed(4)),
                        t.mahjongRecord.splice(e, 1);
                    }),
                    uploadData();
                })
                .catch(() => {});
          },
          deleteH = (e) => {
            let t = latelyData.data.findIndex((n) => n.mahjongData === e);
            ElMessageBox.confirm("此操作将永久删除该记录, 是否继续?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
              .then(() => {
                latelyData.data.splice(t, 1),
                  uploadData(),
                  (latelyData.showDetail = !1),
                  ElMessage({ message: "删除成功", type: "success" });
              })
              .catch(() => {});
          },
          showDetail = (e) => {
            (latelyData.detailData = latelyData.data[e].mahjongData),
              (latelyData.detailData.index = e),
              (latelyData.showDetail = !0);
          },
          showSummaryInformation = (e) => {
            if (e.label !== void 0) {
              let r = e.label;
              mahjongData.data.forEach((i) => {
                i.name === r && (e = i);
              });
            }
            let t = {
                id: e.id,
                name: e.name,
                winningProbability: 0,
                numberOfVictories: 0,
                numberOfDefeats: 0,
                moneyOfVictories: 0,
                moneyOfDefeats: 0,
                moneyOfTotal: 0,
                mahjongRecord: [],
                thisMoney: "",
              },
              n = mahjongData.data.findIndex((r) => r.name === e.name);
            latelyData.data.forEach((r) => {
              r.mahjongData[n] !== void 0 &&
                r.mahjongData[n].id === e.id &&
                r.mahjongData[n].name === e.name &&
                ((t.numberOfVictories += r.mahjongData[n].numberOfVictories),
                (t.numberOfDefeats += r.mahjongData[n].numberOfDefeats),
                (t.moneyOfVictories += r.mahjongData[n].moneyOfVictories),
                (t.moneyOfDefeats += r.mahjongData[n].moneyOfDefeats),
                (t.moneyOfTotal += r.mahjongData[n].moneyOfTotal),
                (t.mahjongRecord = r.mahjongData[n].mahjongRecord.concat(
                  t.mahjongRecord
                )));
            }),
              mahjongData.data[n] !== void 0 &&
                ((t.numberOfVictories += mahjongData.data[n].numberOfVictories),
                (t.numberOfDefeats += mahjongData.data[n].numberOfDefeats),
                (t.moneyOfVictories += mahjongData.data[n].moneyOfVictories),
                (t.moneyOfDefeats += mahjongData.data[n].moneyOfDefeats),
                (t.moneyOfTotal += mahjongData.data[n].moneyOfTotal),
                (t.mahjongRecord = t.mahjongRecord.concat(
                  mahjongData.data[n].mahjongRecord
                ))),
              (t.winningProbability = (
                t.numberOfVictories /
                (t.numberOfVictories + t.numberOfDefeats)
              ).toFixed(4)),
              (sumData.detailData = [t]),
              (sumData.showDetail = !0);
          },
          clearI = () => {
            if (mahjongData.data.length === 0) {
              ElMessage({ message: "请先添加玩家", type: "warning" });
              return;
            }
            if (mahjongData.data[0].mahjongRecord.length === 0) {
              ElMessage({ message: "无数据", type: "warning" });
              return;
            }
            ElMessageBox.confirm(
              "此操作将永久删除所有记录, 是否继续?",
              "提示",
              {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
              }
            )
              .then(() => {
                latelyData.data.unshift({
                  date: new Date().getTime(),
                  mahjongData: JSON.parse(JSON.stringify(mahjongData.data)),
                }),
                  mahjongData.data.forEach((e) => {
                    (e.thisMoney = ""),
                      (e.mahjongRecord = []),
                      (e.numberOfDefeats = 0),
                      (e.numberOfVictories = 0),
                      (e.moneyOfDefeats = 0),
                      (e.moneyOfVictories = 0),
                      (e.moneyOfTotal = 0),
                      (e.winningProbability = 0),
                      (e.highestSingleVictory = 0),
                      (e.highestSingleDefeat = 0);
                  }),
                  uploadData();
              })
              .catch(() => {});
          },
          toPercent = (e) => {
            let t = Number(e * 100).toFixed(2);
            return (t += "%"), t;
          },
          getWinningProbability = (e) =>
            e.numberOfDefeats + e.numberOfVictories === 0
              ? "0%"
              : `${toPercent(e.winningProbability)}`,
          getWinningText = (e) =>
            e.numberOfDefeats + e.numberOfVictories === 0
              ? ""
              : `${e.numberOfVictories}胜${e.numberOfDefeats}跪`,
          getHighestSingleVictory = (e) => {
            let t = 0;
            return (
              e.forEach((n) => {
                n > t && (t = n);
              }),
              t
            );
          },
          getHighestSingleDefeat = (e) => {
            let t = 0;
            return (
              e.forEach((n) => {
                n < t && (t = n);
              }),
              t
            );
          },
          getContestStreak = (e) => {
            if (e.mahjongRecord.length === 0) return "";
            let t = 1,
              n = "";
            for (
              let r = e.mahjongRecord.length - 1;
              r > 0 && e.mahjongRecord[r] * e.mahjongRecord[r - 1] > 0;
              r--
            )
              t++;
            return (
              t > 0 &&
                (e.mahjongRecord[e.mahjongRecord.length - 1] > 0
                  ? (n = "胜")
                  : (n = "跪")),
              `${t}${n}中`
            );
          },
          getHighestVictoryStreak = (e) => {
            if (e.mahjongRecord.length === 0) return "";
            let t = 0,
              n = [];
            for (let r = e.mahjongRecord.length - 1; r > 0; r--)
              e.mahjongRecord[r] > 0 ? t++ : (n.push(t), (t = 0));
            return n.push(t), Math.max(...n);
          },
          getHighestDefeatStreak = (e) => {
            if (e.mahjongRecord.length === 0) return "";
            let t = 0,
              n = [];
            for (let r = e.mahjongRecord.length - 1; r > 0; r--)
              e.mahjongRecord[r] < 0 ? t++ : (n.push(t), (t = 0));
            return n.push(t), Math.max(...n);
          },
          totalColor = (e) =>
            e.toString().indexOf("胜率") != -1
              ? "color:black"
              : e.toString().indexOf("跪中") != -1 || e < 0
              ? "color:red"
              : isDark.value
              ? "color:white"
              : "color:blue",
          isWx = () =>
            window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) ==
            "micromessenger",
          clickEvent = (e, t, n) => {
            var r = 0;
            e.addEventListener(
              "click",
              function (i) {
                var g = new Date().getTime();
                if (g - r <= 300) clearTimeout(y), n && n(i);
                else
                  var y = setTimeout(function () {
                    t && t(i);
                  }, 300);
                r = g;
              },
              !1
            );
          },
          cleanCache = () => {
            console.log("清空全部数据"),
              ElMessageBox.confirm("此操作将清空全部数据, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
              })
                .then(() => {
                  localStorage.clear(), clearCloudData();
                })
                .catch(() => {});
          },
          exportData = () => {
            ElMessageBox.confirm("此操作将导出数据, 是否继续?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
              .then(() => {
                let e = `{"mahjongData":${JSON.stringify(
                  mahjongData.data
                )},"latelyData":${JSON.stringify(latelyData.data)}}`;
                (e = e.replace(/[\u4e00-\u9fa5]/g, function (r) {
                  return (
                    "\\u" + ("000" + r.charCodeAt(0).toString(16)).slice(-4)
                  );
                })),
                  copyData(e);
                let t = new Blob([e], { type: "text/plain" }),
                  n = document.createElement("a");
                (n.href = URL.createObjectURL(t)),
                  (n.download = "userData.json"),
                  n.click();
              })
              .catch(() => {});
          },
          addPlayer = () => {
            if (
              mahjongData.data.length &&
              mahjongData.data[0].mahjongRecord.length
            ) {
              ElMessageBox.alert("请先结余清空本圈数据再添加新玩家", "提示", {
                confirmButtonText: "确定",
              });
              return;
            }
            ElMessageBox.prompt(
              "请输入玩家名称,支持批量输入,用逗号或者句号隔开",
              "添加提示",
              {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                inputPattern: /^[\u4e00-\u9fa5_a-zA-Z0-9,，。\.]+$/,
                inputErrorMessage: "玩家名称只能包含中文、英文、数字和下划线",
              }
            )
              .then(({ value: e }) => {
                e = e
                  .replace(/，/g, ",")
                  .replace(/。/g, ",")
                  .replace(/\./g, ",");
                let t = e.split(",");
                t = [...new Set(t)];
                for (e of t) {
                  if (!e) continue;
                  if (mahjongData.data.some((r) => r.name === e)) {
                    ElMessageBox.alert("玩家名称不能重复", "提示", {
                      confirmButtonText: "确定",
                    });
                    continue;
                  }
                  let n = {
                    id: mahjongData.data.length,
                    name: e,
                    winningProbability: 0,
                    numberOfVictories: 0,
                    numberOfDefeats: 0,
                    moneyOfVictories: 0,
                    moneyOfDefeats: 0,
                    moneyOfTotal: 0,
                    mahjongRecord: [],
                    thisMoney: "",
                  };
                  mahjongData.data.push(n), uploadData();
                }
              })
              .catch(() => {});
          },
          deletePlayer = () => {
            if (
              mahjongData.data.length &&
              mahjongData.data[0].mahjongRecord.length
            ) {
              ElMessageBox.alert("请先结余清空本圈数据再删除玩家", "提示", {
                confirmButtonText: "确定",
              });
              return;
            }
            ElMessageBox.prompt(
              "请输入玩家名称,支持批量输入,用逗号或者句号隔开",
              "删除提示",
              {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                inputPattern: /^[\u4e00-\u9fa5_a-zA-Z0-9，,。\.]+$/,
                inputErrorMessage: "玩家名称只能包含中文、英文、数字和下划线",
              }
            )
              .then(({ value: e }) => {
                e = e
                  .replace(/，/g, ",")
                  .replace(/。/g, ",")
                  .replace(/\./g, ",");
                let t = e.split(",");
                t = [...new Set(t)];
                for (let n = 0; n < t.length; n++)
                  t[n] &&
                    ElMessageBox.confirm(`确定删除${t[n]}吗？`, "提示", {
                      confirmButtonText: "确定",
                      cancelButtonText: "取消",
                      type: "warning",
                    })
                      .then(() => {
                        let r = -1;
                        for (let i = 0; i < mahjongData.data.length; i++)
                          if (mahjongData.data[i].name === t[n]) {
                            r = i;
                            break;
                          }
                        if (r === -1) {
                          ElMessageBox.alert("未找到该玩家", "提示", {
                            confirmButtonText: "确定",
                          });
                          return;
                        }
                        mahjongData.data.splice(r, 1), uploadData();
                      })
                      .catch(() => {});
              })
              .catch(() => {});
          },
          mahjongRecord2String = (e, t) => {
            e = JSON.parse(JSON.stringify(e));
            let n = "";
            for (let r = 0; r < e.length; r++)
              n += e[r].name.trim().toString().padEnd(8, " ");
            if (
              ((n += `
`),
              t)
            )
              for (let r = 0; r < e[0].mahjongRecord.length; r++) {
                for (let i = 0; i < e.length; i++) {
                  let g = e[i].mahjongRecord[r];
                  g > 0 ? (g = "+" + g) : g === 0 && (g = " 0"),
                    (n += g.toString().padEnd(8, " "));
                }
                n += `
`;
              }
            n +=
              "合计：".toString().padEnd(8, " ") +
              `
`;
            for (let r = 0; r < e.length; r++)
              n += e[r].moneyOfTotal.toString().padEnd(8, " ") + " ";
            (n += `
`),
              (n +=
                "胜率：".toString().padEnd(8, " ") +
                `
`);
            for (let r = 0; r < e.length; r++)
              n +=
                (getWinningProbability(e[r]) + " " + getWinningText(e[r]))
                  .toString()
                  .padEnd(8, " ") +
                `
`;
            (n += `
`),
              (n +=
                "最高连胜：".toString().padEnd(8, " ") +
                `
`);
            for (let r = 0; r < e.length; r++)
              n +=
                getHighestVictoryStreak(e[r]).toString().padEnd(8, " ") + " ";
            (n += `
`),
              (n +=
                "最高连跪：".toString().padEnd(8, " ") +
                `
`);
            for (let r = 0; r < e.length; r++)
              n += getHighestDefeatStreak(e[r]).toString().padEnd(8, " ") + " ";
            (n += `
`),
              (n +=
                "最高单局胜利：".toString().padEnd(8, " ") +
                `
`);
            for (let r = 0; r < e.length; r++) {
              let i = getHighestSingleVictory(e[r].mahjongRecord);
              i > 0 ? (i = "+" + i) : i === 0 && (i = " 0"),
                (n += i.toString().padEnd(8, " ") + " ");
            }
            (n += `
`),
              (n +=
                "最高单局失败：".toString().padEnd(8, " ") +
                `
`);
            for (let r = 0; r < e.length; r++) {
              let i = getHighestSingleDefeat(e[r].mahjongRecord);
              n += i.toString().padEnd(8, " ") + " ";
            }
            return (
              (n += `
`),
              n
            );
          },
          copyData = (e) => {
            let t = document.createElement("textarea");
            t.setAttribute("id", "textarea"),
              t.setAttribute(
                "style",
                "position:fixed;top:0;left:0;width:0;height:0;"
              ),
              (t.value = e),
              document.body.appendChild(t),
              t.select(),
              document.execCommand("copy"),
              document.body.removeChild(t),
              ElMessage.success("复制成功");
          };
        return (e, t) => {
          const n = ElSwitch,
            r = ElTableColumn,
            i = ElTable,
            g = ElInput,
            y = ElButton,
            $ = ElOption,
            k = ElSelect,
            V = ElCollapseItem,
            L = ElCollapse,
            oe = ElDialog;
          return (
            openBlock(),
            createElementBlock(
              Fragment,
              null,
              [
                createCommentVNode("", !0),
                createBaseVNode("div", _hoisted_2, [
                  createBaseVNode(
                    "h2",
                    {
                      style: { "text-align": "center", margin: "0" },
                      onClick:
                        t[2] ||
                        (t[2] = withModifiers(
                          (j) => unref(toggleDark)(),
                          ["stop"]
                        )),
                    },
                    " 麻将麻将计分!!! "
                  ),
                  createVNode(
                    i,
                    {
                      "row-class-name": tableRowClassName,
                      data: unref(tableData),
                      style: { width: "100%" },
                      "show-header": !0,
                      "max-height": "55vh",
                      border: "",
                      stripe: "",
                      onRowClick: deleteI,
                      onHeaderClick: showSummaryInformation,
                    },
                    {
                      default: withCtx(() => [
                        (openBlock(!0),
                        createElementBlock(
                          Fragment,
                          null,
                          renderList(
                            unref(tableHeaders),
                            (j, ae) => (
                              openBlock(),
                              createBlock(
                                r,
                                { "header-align": "center", label: j },
                                {
                                  default: withCtx((z) => [
                                    createBaseVNode(
                                      "div",
                                      {
                                        style: normalizeStyle(
                                          totalColor(z.row[ae]) +
                                            ";font-size:16px;text-align:center;"
                                        ),
                                      },
                                      [
                                        z.row[ae].toString().indexOf(`
`) !== -1
                                          ? (openBlock(),
                                            createElementBlock(
                                              "div",
                                              _hoisted_3,
                                              [
                                                createTextVNode(
                                                  toDisplayString(
                                                    z.row[ae].toString().split(`
`)[0]
                                                  ),
                                                  1
                                                ),
                                                _hoisted_4,
                                                createTextVNode(
                                                  " " +
                                                    toDisplayString(
                                                      z.row[ae].toString()
                                                        .split(`
`)[1]
                                                    ),
                                                  1
                                                ),
                                              ]
                                            ))
                                          : (openBlock(),
                                            createElementBlock(
                                              "div",
                                              _hoisted_5,
                                              toDisplayString(
                                                z.row[ae] > 0
                                                  ? "+" + z.row[ae]
                                                  : z.row[ae]
                                              ),
                                              1
                                            )),
                                      ],
                                      4
                                    ),
                                  ]),
                                  _: 2,
                                },
                                1032,
                                ["label"]
                              )
                            )
                          ),
                          256
                        )),
                      ]),
                      _: 1,
                    },
                    8,
                    ["data"]
                  ),
                  createBaseVNode("div", _hoisted_6, [
                    createBaseVNode("div", _hoisted_7, [
                      _hoisted_8,
                      createVNode(
                        n,
                        {
                          modelValue: unref(mahjongData).showTotal,
                          "onUpdate:modelValue":
                            t[3] ||
                            (t[3] = (j) => (unref(mahjongData).showTotal = j)),
                        },
                        null,
                        8,
                        ["modelValue"]
                      ),
                    ]),
                    createBaseVNode("tr", _hoisted_9, [
                      (openBlock(!0),
                      createElementBlock(
                        Fragment,
                        null,
                        renderList(unref(mahjongData).data, (j) =>
                          withDirectives(
                            (openBlock(),
                            createElementBlock(
                              "td",
                              {
                                onClick: updateData,
                                style: normalizeStyle(
                                  totalColor(j.moneyOfTotal) +
                                    ";font-size: 30px;font-weight: bold"
                                ),
                              },
                              toDisplayString(j.moneyOfTotal > 0 ? "+" : "") +
                                toDisplayString(j.moneyOfTotal),
                              5
                            )),
                            [[vShow, unref(mahjongData).showTotal]]
                          )
                        ),
                        256
                      )),
                    ]),
                    createBaseVNode("tr", null, [
                      (openBlock(!0),
                      createElementBlock(
                        Fragment,
                        null,
                        renderList(
                          unref(mahjongData).data,
                          (j) => (
                            openBlock(),
                            createElementBlock(
                              "td",
                              { key: j.id, style: { border: "none" } },
                              [
                                createVNode(
                                  g,
                                  {
                                    modelValue: j.thisMoney,
                                    "onUpdate:modelValue": (ae) =>
                                      (j.thisMoney = ae),
                                    onFocus:
                                      t[4] ||
                                      (t[4] = (ae) => dealNum(ae, "focus")),
                                    onBlur:
                                      t[5] ||
                                      (t[5] = (ae) => dealNum(ae, "blur")),
                                    class: "thisMoney",
                                    type: "number",
                                  },
                                  null,
                                  8,
                                  ["modelValue", "onUpdate:modelValue"]
                                ),
                              ]
                            )
                          )
                        ),
                        128
                      )),
                    ]),
                    _hoisted_10,
                    _hoisted_11,
                    createBaseVNode("div", _hoisted_12, [
                      createVNode(
                        y,
                        { type: "primary", size: "large", onClick: clearI },
                        {
                          default: withCtx(() => [
                            createTextVNode("结余清空 "),
                          ]),
                          _: 1,
                        }
                      ),
                      createVNode(
                        y,
                        { type: "primary", size: "large", onClick: addI },
                        {
                          default: withCtx(() => [
                            createTextVNode("添加记录 "),
                          ]),
                          _: 1,
                        }
                      ),
                    ]),
                  ]),
                  createVNode(
                    L,
                    {
                      modelValue: unref(mahjongData).activeName,
                      "onUpdate:modelValue":
                        t[12] ||
                        (t[12] = (j) => (unref(mahjongData).activeName = j)),
                      onChange:
                        t[13] ||
                        (t[13] = (j) => showCol(unref(mahjongData).activeName)),
                    },
                    {
                      default: withCtx(() => [
                        createVNode(
                          V,
                          { title: "更多功能", name: "2" },
                          {
                            default: withCtx(() => [
                              createBaseVNode("div", _hoisted_13, [
                                createBaseVNode("div", _hoisted_14, [
                                  createVNode(
                                    k,
                                    {
                                      modelValue: unref(roomNumber),
                                      "onUpdate:modelValue":
                                        t[6] ||
                                        (t[6] = (j) =>
                                          isRef(roomNumber)
                                            ? (roomNumber.value = j)
                                            : null),
                                      placeholder: "选择房间或者创建房间",
                                      style: { width: "32%" },
                                      type: "number",
                                      onChange:
                                        t[7] ||
                                        (t[7] = (j) =>
                                          switchRooms(unref(roomNumber))),
                                      onFocus: getRoomNumberList,
                                    },
                                    {
                                      default: withCtx(() => [
                                        (openBlock(!0),
                                        createElementBlock(
                                          Fragment,
                                          null,
                                          renderList(
                                            unref(roomNumberList),
                                            (j) => (
                                              openBlock(),
                                              createBlock(
                                                $,
                                                { key: j, label: j, value: j },
                                                null,
                                                8,
                                                ["label", "value"]
                                              )
                                            )
                                          ),
                                          128
                                        )),
                                      ]),
                                      _: 1,
                                    },
                                    8,
                                    ["modelValue"]
                                  ),
                                  createVNode(
                                    y,
                                    {
                                      text: "",
                                      type: "primary",
                                      size: "large",
                                      onClick:
                                        t[8] || (t[8] = (j) => createRoom()),
                                    },
                                    {
                                      default: withCtx(() => [
                                        createTextVNode("创建房间 "),
                                      ]),
                                      _: 1,
                                    }
                                  ),
                                  createVNode(
                                    y,
                                    {
                                      text: "",
                                      type: "danger",
                                      size: "large",
                                      onClick:
                                        t[9] || (t[9] = (j) => deleteRoom()),
                                    },
                                    {
                                      default: withCtx(() => [
                                        createTextVNode("删除房间 "),
                                      ]),
                                      _: 1,
                                    }
                                  ),
                                  createBaseVNode("div", null, [
                                    createTextVNode(" 当前房间名"),
                                    createBaseVNode(
                                      "code",
                                      {
                                        onClick: t[10] || (t[10] = () => {}),
                                        class: "roomNumber",
                                      },
                                      toDisplayString(unref(roomNumber)),
                                      1
                                    ),
                                  ]),
                                ]),
                                createVNode(
                                  y,
                                  {
                                    text: "",
                                    type: "primary",
                                    size: "large",
                                    onClick: exportData,
                                    style: { margin: "0 auto" },
                                  },
                                  {
                                    default: withCtx(() => [
                                      createTextVNode("导出数据 "),
                                    ]),
                                    _: 1,
                                  }
                                ),
                                createVNode(
                                  y,
                                  {
                                    text: "",
                                    type: "primary",
                                    size: "large",
                                    onClick: addPlayer,
                                    style: { margin: "0 auto" },
                                  },
                                  {
                                    default: withCtx(() => [
                                      createTextVNode("新增玩家 "),
                                    ]),
                                    _: 1,
                                  }
                                ),
                                createVNode(
                                  y,
                                  {
                                    text: "",
                                    type: "danger",
                                    size: "large",
                                    onClick: deletePlayer,
                                    style: { margin: "0 auto" },
                                  },
                                  {
                                    default: withCtx(() => [
                                      createTextVNode("删除玩家 "),
                                    ]),
                                    _: 1,
                                  }
                                ),
                              ]),
                              createVNode(
                                V,
                                { title: "最近记录", name: "0" },
                                {
                                  default: withCtx(() => [
                                    (openBlock(!0),
                                    createElementBlock(
                                      Fragment,
                                      null,
                                      renderList(
                                        unref(latelyData).data,
                                        (j, ae) => (
                                          openBlock(),
                                          createElementBlock(
                                            "div",
                                            {
                                              class: "lately",
                                              key: j.date,
                                              onClick: (z) => showDetail(ae),
                                            },
                                            [
                                              ae <= 2 ||
                                              unref(latelyData).showMore
                                                ? (openBlock(),
                                                  createElementBlock(
                                                    "div",
                                                    _hoisted_16,
                                                    [
                                                      createBaseVNode(
                                                        "div",
                                                        _hoisted_17,
                                                        [
                                                          createBaseVNode(
                                                            "b",
                                                            null,
                                                            toDisplayString(
                                                              getDateByTime(
                                                                j.date
                                                              )
                                                            ),
                                                            1
                                                          ),
                                                          createVNode(
                                                            y,
                                                            {
                                                              text: "",
                                                              onClick:
                                                                withModifiers(
                                                                  (z) =>
                                                                    copyData(
                                                                      getDateByTime(
                                                                        j.date
                                                                      ) +
                                                                        `
` +
                                                                        mahjongRecord2String(
                                                                          unref(
                                                                            latelyData
                                                                          )
                                                                            .data[
                                                                            ae
                                                                          ]
                                                                            .mahjongData,
                                                                          !1
                                                                        )
                                                                    ),
                                                                  ["stop"]
                                                                ),
                                                            },
                                                            {
                                                              default: withCtx(
                                                                () => [
                                                                  createTextVNode(
                                                                    "复制不含战绩数据 "
                                                                  ),
                                                                ]
                                                              ),
                                                              _: 2,
                                                            },
                                                            1032,
                                                            ["onClick"]
                                                          ),
                                                        ]
                                                      ),
                                                      (openBlock(!0),
                                                      createElementBlock(
                                                        Fragment,
                                                        null,
                                                        renderList(
                                                          j.mahjongData,
                                                          (z) => (
                                                            openBlock(),
                                                            createElementBlock(
                                                              "div",
                                                              {
                                                                class: "card2",
                                                                key: z.id,
                                                              },
                                                              [
                                                                _hoisted_18,
                                                                createBaseVNode(
                                                                  "code",
                                                                  null,
                                                                  [
                                                                    createTextVNode(
                                                                      toDisplayString(
                                                                        z.name
                                                                      ) +
                                                                        " 胜率：" +
                                                                        toDisplayString(
                                                                          getWinningProbability(
                                                                            z
                                                                          )
                                                                        ),
                                                                      1
                                                                    ),
                                                                    _hoisted_19,
                                                                    createTextVNode(
                                                                      toDisplayString(
                                                                        getWinningText(
                                                                          z
                                                                        )
                                                                      ),
                                                                      1
                                                                    ),
                                                                    _hoisted_20,
                                                                    createTextVNode(
                                                                      "合计: "
                                                                    ),
                                                                    createBaseVNode(
                                                                      "span",
                                                                      {
                                                                        style:
                                                                          normalizeStyle(
                                                                            totalColor(
                                                                              z.moneyOfTotal
                                                                            )
                                                                          ),
                                                                      },
                                                                      toDisplayString(
                                                                        z.moneyOfTotal >
                                                                          0
                                                                          ? "+"
                                                                          : ""
                                                                      ) +
                                                                        toDisplayString(
                                                                          z.moneyOfTotal
                                                                        ),
                                                                      5
                                                                    ),
                                                                  ]
                                                                ),
                                                              ]
                                                            )
                                                          )
                                                        ),
                                                        128
                                                      )),
                                                    ]
                                                  ))
                                                : createCommentVNode("", !0),
                                            ],
                                            8,
                                            _hoisted_15
                                          )
                                        )
                                      ),
                                      128
                                    )),
                                    unref(latelyData).data.length > 3
                                      ? (openBlock(),
                                        createElementBlock("div", _hoisted_21, [
                                          createVNode(
                                            y,
                                            {
                                              text: "",
                                              type: "primary",
                                              onClick:
                                                t[11] ||
                                                (t[11] = (j) =>
                                                  (unref(latelyData).showMore =
                                                    !unref(latelyData)
                                                      .showMore)),
                                            },
                                            {
                                              default: withCtx(() => [
                                                createTextVNode(
                                                  toDisplayString(
                                                    unref(latelyData).showMore
                                                      ? "收起"
                                                      : "展开"
                                                  ) +
                                                    " " +
                                                    toDisplayString(
                                                      unref(latelyData).data
                                                        .length - 3
                                                    ) +
                                                    " 条记录 ",
                                                  1
                                                ),
                                              ]),
                                              _: 1,
                                            }
                                          ),
                                        ]))
                                      : createCommentVNode("", !0),
                                  ]),
                                  _: 1,
                                }
                              ),
                              createVNode(
                                V,
                                { title: "使用说明", name: "1" },
                                {
                                  default: withCtx(() => [
                                    createBaseVNode("code", null, [
                                      _hoisted_22,
                                      createTextVNode(
                                        " 2.点击记录，即可删除该条记录"
                                      ),
                                      _hoisted_23,
                                      createTextVNode(
                                        " 3.点击结余清空，即可保存本圈记录，并重新开始新一圈的记录"
                                      ),
                                      _hoisted_24,
                                      createTextVNode(
                                        " 4.点击标题，即可切换暗黑/日间模式"
                                      ),
                                      _hoisted_25,
                                      createTextVNode(
                                        " 5.双击版本号可以清除缓存，并刷新页面"
                                      ),
                                      _hoisted_26,
                                      createTextVNode(
                                        " 6.点击玩家昵称，可以显示用户汇总数据"
                                      ),
                                      _hoisted_27,
                                      createTextVNode(
                                        " 7.点击主页合计数据，可以用云端同步数据"
                                      ),
                                      _hoisted_28,
                                      _hoisted_29,
                                      _hoisted_30,
                                      isWx()
                                        ? (openBlock(),
                                          createElementBlock(
                                            "div",
                                            _hoisted_31,
                                            [
                                              createTextVNode(
                                                " 微信端可以用浮窗模式，"
                                              ),
                                              _hoisted_32,
                                              createTextVNode(
                                                "，下次可以直接在主页左滑打开 "
                                              ),
                                            ]
                                          ))
                                        : createCommentVNode("", !0),
                                    ]),
                                  ]),
                                  _: 1,
                                }
                              ),
                            ]),
                            _: 1,
                          }
                        ),
                      ]),
                      _: 1,
                    },
                    8,
                    ["modelValue"]
                  ),
                ]),
                createVNode(
                  oe,
                  {
                    center: "",
                    modelValue: unref(latelyData).showDetail,
                    "onUpdate:modelValue":
                      t[16] ||
                      (t[16] = (j) => (unref(latelyData).showDetail = j)),
                    title: "详细数据",
                    style: { width: "90%", "max-width": "450px" },
                  },
                  {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_33, [
                        createVNode(
                          y,
                          {
                            text: "",
                            type: "success",
                            size: "default",
                            onClick:
                              t[14] ||
                              (t[14] = (j) =>
                                copyData(
                                  getDateByIndex(
                                    unref(latelyData).detailData.index
                                  ) +
                                    `
` +
                                    mahjongRecord2String(
                                      unref(latelyData).detailData,
                                      !0
                                    )
                                )),
                            style: { margin: "0 auto" },
                          },
                          {
                            default: withCtx(() => [
                              createTextVNode("复制完整数据 "),
                            ]),
                            _: 1,
                          }
                        ),
                        createVNode(
                          y,
                          {
                            text: "",
                            type: "danger",
                            size: "default",
                            onClick:
                              t[15] ||
                              (t[15] = (j) =>
                                deleteH(unref(latelyData).detailData)),
                            style: { margin: "0 auto" },
                          },
                          {
                            default: withCtx(() => [
                              createTextVNode("删除数据 "),
                            ]),
                            _: 1,
                          }
                        ),
                      ]),
                      createBaseVNode("table", null, [
                        createBaseVNode("tbody", null, [
                          (openBlock(!0),
                          createElementBlock(
                            Fragment,
                            null,
                            renderList(
                              unref(latelyData).detailData,
                              (j) => (
                                openBlock(),
                                createElementBlock("th", null, [
                                  createTextVNode(
                                    toDisplayString(j.name) + " ",
                                    1
                                  ),
                                  _hoisted_34,
                                ])
                              )
                            ),
                            256
                          )),
                          createBaseVNode("tr", _hoisted_35, [
                            (openBlock(!0),
                            createElementBlock(
                              Fragment,
                              null,
                              renderList(
                                unref(latelyData).detailData,
                                (j) => (
                                  openBlock(),
                                  createElementBlock("td", _hoisted_36, [
                                    createTextVNode(
                                      " 胜率：" +
                                        toDisplayString(
                                          getWinningProbability(j)
                                        ),
                                      1
                                    ),
                                    _hoisted_37,
                                    createTextVNode(
                                      toDisplayString(getWinningText(j)),
                                      1
                                    ),
                                  ])
                                )
                              ),
                              256
                            )),
                          ]),
                          createBaseVNode("tr", null, [
                            (openBlock(!0),
                            createElementBlock(
                              Fragment,
                              null,
                              renderList(
                                unref(latelyData).detailData,
                                (j) => (
                                  openBlock(),
                                  createElementBlock("td", _hoisted_38, [
                                    (openBlock(!0),
                                    createElementBlock(
                                      Fragment,
                                      null,
                                      renderList(
                                        j.mahjongRecord,
                                        (ae, z) => (
                                          openBlock(),
                                          createElementBlock(
                                            "div",
                                            _hoisted_39,
                                            [
                                              createBaseVNode(
                                                "div",
                                                _hoisted_40,
                                                [
                                                  createBaseVNode(
                                                    "code",
                                                    {
                                                      style: normalizeStyle(
                                                        totalColor(ae)
                                                      ),
                                                    },
                                                    toDisplayString(
                                                      ae > 0 ? "+" : ""
                                                    ) + toDisplayString(ae),
                                                    5
                                                  ),
                                                ]
                                              ),
                                            ]
                                          )
                                        )
                                      ),
                                      256
                                    )),
                                  ])
                                )
                              ),
                              256
                            )),
                          ]),
                          createBaseVNode("tr", _hoisted_41, [
                            (openBlock(!0),
                            createElementBlock(
                              Fragment,
                              null,
                              renderList(
                                unref(latelyData).detailData,
                                (j) => (
                                  openBlock(),
                                  createElementBlock(
                                    "td",
                                    {
                                      style: normalizeStyle(
                                        totalColor(j.moneyOfTotal) +
                                          ";font-size: 30px;font-weight: bold"
                                      ),
                                    },
                                    toDisplayString(j.moneyOfTotal),
                                    5
                                  )
                                )
                              ),
                              256
                            )),
                          ]),
                          createBaseVNode("tr", null, [
                            (openBlock(!0),
                            createElementBlock(
                              Fragment,
                              null,
                              renderList(
                                unref(latelyData).detailData,
                                (j) => (
                                  openBlock(),
                                  createElementBlock("td", _hoisted_42, [
                                    createTextVNode(" 最高连胜："),
                                    _hoisted_43,
                                    createTextVNode(
                                      toDisplayString(
                                        getHighestVictoryStreak(j)
                                      ),
                                      1
                                    ),
                                  ])
                                )
                              ),
                              256
                            )),
                          ]),
                          createBaseVNode("tr", null, [
                            (openBlock(!0),
                            createElementBlock(
                              Fragment,
                              null,
                              renderList(
                                unref(latelyData).detailData,
                                (j) => (
                                  openBlock(),
                                  createElementBlock("td", _hoisted_44, [
                                    createTextVNode(" 最高连败："),
                                    _hoisted_45,
                                    createTextVNode(
                                      toDisplayString(
                                        getHighestDefeatStreak(j)
                                      ),
                                      1
                                    ),
                                  ])
                                )
                              ),
                              256
                            )),
                          ]),
                          createBaseVNode("tr", null, [
                            (openBlock(!0),
                            createElementBlock(
                              Fragment,
                              null,
                              renderList(
                                unref(latelyData).detailData,
                                (j) => (
                                  openBlock(),
                                  createElementBlock("td", _hoisted_46, [
                                    createTextVNode(" 最高单局胜利："),
                                    _hoisted_47,
                                    createTextVNode(
                                      toDisplayString(
                                        getHighestSingleVictory(j.mahjongRecord)
                                      ),
                                      1
                                    ),
                                  ])
                                )
                              ),
                              256
                            )),
                          ]),
                          createBaseVNode("tr", null, [
                            (openBlock(!0),
                            createElementBlock(
                              Fragment,
                              null,
                              renderList(
                                unref(latelyData).detailData,
                                (j) => (
                                  openBlock(),
                                  createElementBlock("td", _hoisted_48, [
                                    createTextVNode(" 最高单局失败："),
                                    _hoisted_49,
                                    createTextVNode(
                                      toDisplayString(
                                        getHighestSingleDefeat(j.mahjongRecord)
                                      ),
                                      1
                                    ),
                                  ])
                                )
                              ),
                              256
                            )),
                          ]),
                        ]),
                      ]),
                    ]),
                    _: 1,
                  },
                  8,
                  ["modelValue"]
                ),
                createVNode(
                  oe,
                  {
                    center: "",
                    modelValue: unref(sumData).showDetail,
                    "onUpdate:modelValue":
                      t[19] || (t[19] = (j) => (unref(sumData).showDetail = j)),
                    title: "历史战绩",
                    style: { width: "90%", "max-width": "450px" },
                  },
                  {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_50, [
                        createVNode(
                          y,
                          {
                            text: "",
                            type: "success",
                            size: "default",
                            onClick:
                              t[17] ||
                              (t[17] = (j) =>
                                copyData(
                                  mahjongRecord2String(
                                    unref(sumData).detailData,
                                    !1
                                  )
                                )),
                            style: { margin: "0 auto" },
                          },
                          {
                            default: withCtx(() => [
                              createTextVNode("复制不含战绩数据 "),
                            ]),
                            _: 1,
                          }
                        ),
                        createVNode(
                          y,
                          {
                            text: "",
                            type: "success",
                            size: "default",
                            onClick:
                              t[18] ||
                              (t[18] = (j) =>
                                copyData(
                                  mahjongRecord2String(
                                    unref(sumData).detailData,
                                    !0
                                  )
                                )),
                            style: { margin: "0 auto" },
                          },
                          {
                            default: withCtx(() => [
                              createTextVNode("复制完整数据 "),
                            ]),
                            _: 1,
                          }
                        ),
                      ]),
                      createBaseVNode("table", null, [
                        createBaseVNode("tbody", null, [
                          (openBlock(!0),
                          createElementBlock(
                            Fragment,
                            null,
                            renderList(
                              unref(sumData).detailData,
                              (j) => (
                                openBlock(),
                                createElementBlock("th", null, [
                                  createTextVNode(
                                    toDisplayString(j.name) + " ",
                                    1
                                  ),
                                  _hoisted_51,
                                ])
                              )
                            ),
                            256
                          )),
                          createBaseVNode("tr", _hoisted_52, [
                            (openBlock(!0),
                            createElementBlock(
                              Fragment,
                              null,
                              renderList(
                                unref(sumData).detailData,
                                (j) => (
                                  openBlock(),
                                  createElementBlock("td", _hoisted_53, [
                                    createTextVNode(
                                      " 胜率：" +
                                        toDisplayString(
                                          getWinningProbability(j)
                                        ),
                                      1
                                    ),
                                    _hoisted_54,
                                    createTextVNode(
                                      toDisplayString(getWinningText(j)),
                                      1
                                    ),
                                  ])
                                )
                              ),
                              256
                            )),
                          ]),
                          createBaseVNode("div", _hoisted_55, [
                            createBaseVNode("tr", null, [
                              (openBlock(!0),
                              createElementBlock(
                                Fragment,
                                null,
                                renderList(
                                  unref(sumData).detailData,
                                  (j) => (
                                    openBlock(),
                                    createElementBlock("td", _hoisted_56, [
                                      (openBlock(!0),
                                      createElementBlock(
                                        Fragment,
                                        null,
                                        renderList(
                                          j.mahjongRecord,
                                          (ae, z) => (
                                            openBlock(),
                                            createElementBlock(
                                              "div",
                                              _hoisted_57,
                                              [
                                                createBaseVNode(
                                                  "div",
                                                  _hoisted_58,
                                                  [
                                                    createBaseVNode(
                                                      "code",
                                                      {
                                                        style: normalizeStyle(
                                                          totalColor(ae)
                                                        ),
                                                      },
                                                      toDisplayString(
                                                        ae > 0 ? "+" : ""
                                                      ) + toDisplayString(ae),
                                                      5
                                                    ),
                                                  ]
                                                ),
                                              ]
                                            )
                                          )
                                        ),
                                        256
                                      )),
                                    ])
                                  )
                                ),
                                256
                              )),
                            ]),
                          ]),
                          createBaseVNode("tr", _hoisted_59, [
                            (openBlock(!0),
                            createElementBlock(
                              Fragment,
                              null,
                              renderList(
                                unref(sumData).detailData,
                                (j) => (
                                  openBlock(),
                                  createElementBlock(
                                    "td",
                                    {
                                      style: normalizeStyle(
                                        totalColor(j.moneyOfTotal) +
                                          ";font-size: 30px;font-weight: bold"
                                      ),
                                    },
                                    toDisplayString(j.moneyOfTotal),
                                    5
                                  )
                                )
                              ),
                              256
                            )),
                          ]),
                          createBaseVNode("tr", null, [
                            (openBlock(!0),
                            createElementBlock(
                              Fragment,
                              null,
                              renderList(
                                unref(sumData).detailData,
                                (j) => (
                                  openBlock(),
                                  createElementBlock("td", _hoisted_60, [
                                    createTextVNode(" 最高连胜："),
                                    _hoisted_61,
                                    createTextVNode(
                                      toDisplayString(
                                        getHighestVictoryStreak(j)
                                      ),
                                      1
                                    ),
                                  ])
                                )
                              ),
                              256
                            )),
                          ]),
                          createBaseVNode("tr", null, [
                            (openBlock(!0),
                            createElementBlock(
                              Fragment,
                              null,
                              renderList(
                                unref(sumData).detailData,
                                (j) => (
                                  openBlock(),
                                  createElementBlock("td", _hoisted_62, [
                                    createTextVNode(" 最高连败："),
                                    _hoisted_63,
                                    createTextVNode(
                                      toDisplayString(
                                        getHighestDefeatStreak(j)
                                      ),
                                      1
                                    ),
                                  ])
                                )
                              ),
                              256
                            )),
                          ]),
                          createBaseVNode("tr", null, [
                            (openBlock(!0),
                            createElementBlock(
                              Fragment,
                              null,
                              renderList(
                                unref(sumData).detailData,
                                (j) => (
                                  openBlock(),
                                  createElementBlock("td", _hoisted_64, [
                                    createTextVNode(" 最高单局胜利："),
                                    _hoisted_65,
                                    createTextVNode(
                                      toDisplayString(
                                        getHighestSingleVictory(j.mahjongRecord)
                                      ),
                                      1
                                    ),
                                  ])
                                )
                              ),
                              256
                            )),
                          ]),
                          createBaseVNode("tr", null, [
                            (openBlock(!0),
                            createElementBlock(
                              Fragment,
                              null,
                              renderList(
                                unref(sumData).detailData,
                                (j) => (
                                  openBlock(),
                                  createElementBlock("td", _hoisted_66, [
                                    createTextVNode(" 最高单局失败："),
                                    _hoisted_67,
                                    createTextVNode(
                                      toDisplayString(
                                        getHighestSingleDefeat(j.mahjongRecord)
                                      ),
                                      1
                                    ),
                                  ])
                                )
                              ),
                              256
                            )),
                          ]),
                        ]),
                      ]),
                    ]),
                    _: 1,
                  },
                  8,
                  ["modelValue"]
                ),
              ],
              64
            )
          );
        };
      },
    },
    HelloWorld = _export_sfc(_sfc_main$1, [["__scopeId", "data-v-31a1aca3"]]),
    App_vue_vue_type_style_index_0_lang = "",
    _sfc_main = {
      __name: "App",
      setup(e) {
        return (t, n) => (
          openBlock(),
          createElementBlock("div", null, [createVNode(HelloWorld)])
        );
      },
    },
    cssVars = "",
    app = createApp(_sfc_main);
  app.mount("#app");
});
export default oo();
