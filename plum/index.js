(() => {
  // output/Control.Semigroupoid/index.js
  var semigroupoidFn = {
    compose: function(f) {
      return function(g) {
        return function(x) {
          return f(g(x));
        };
      };
    }
  };

  // output/Control.Category/index.js
  var identity = function(dict) {
    return dict.identity;
  };
  var categoryFn = {
    identity: function(x) {
      return x;
    },
    Semigroupoid0: function() {
      return semigroupoidFn;
    }
  };

  // output/Data.Boolean/index.js
  var otherwise = true;

  // output/Data.Function/index.js
  var flip = function(f) {
    return function(b) {
      return function(a) {
        return f(a)(b);
      };
    };
  };
  var $$const = function(a) {
    return function(v) {
      return a;
    };
  };
  var applyFlipped = function(x) {
    return function(f) {
      return f(x);
    };
  };

  // output/Data.Functor/foreign.js
  var arrayMap = function(f) {
    return function(arr) {
      var l = arr.length;
      var result = new Array(l);
      for (var i = 0; i < l; i++) {
        result[i] = f(arr[i]);
      }
      return result;
    };
  };

  // output/Data.Unit/foreign.js
  var unit = void 0;

  // output/Type.Proxy/index.js
  var $$Proxy = /* @__PURE__ */ function() {
    function $$Proxy2() {
    }
    ;
    $$Proxy2.value = new $$Proxy2();
    return $$Proxy2;
  }();

  // output/Data.Functor/index.js
  var map = function(dict) {
    return dict.map;
  };
  var functorArray = {
    map: arrayMap
  };

  // output/Control.Apply/index.js
  var apply = function(dict) {
    return dict.apply;
  };
  var lift2 = function(dictApply) {
    var apply1 = apply(dictApply);
    var map4 = map(dictApply.Functor0());
    return function(f) {
      return function(a) {
        return function(b) {
          return apply1(map4(f)(a))(b);
        };
      };
    };
  };

  // output/Control.Applicative/index.js
  var pure = function(dict) {
    return dict.pure;
  };
  var liftA1 = function(dictApplicative) {
    var apply2 = apply(dictApplicative.Apply0());
    var pure1 = pure(dictApplicative);
    return function(f) {
      return function(a) {
        return apply2(pure1(f))(a);
      };
    };
  };

  // output/Control.Bind/foreign.js
  var arrayBind = typeof Array.prototype.flatMap === "function" ? function(arr) {
    return function(f) {
      return arr.flatMap(f);
    };
  } : function(arr) {
    return function(f) {
      var result = [];
      var l = arr.length;
      for (var i = 0; i < l; i++) {
        var xs = f(arr[i]);
        var k = xs.length;
        for (var j = 0; j < k; j++) {
          result.push(xs[j]);
        }
      }
      return result;
    };
  };

  // output/Control.Bind/index.js
  var discard = function(dict) {
    return dict.discard;
  };
  var bind = function(dict) {
    return dict.bind;
  };
  var bindFlipped = function(dictBind) {
    return flip(bind(dictBind));
  };
  var discardUnit = {
    discard: function(dictBind) {
      return bind(dictBind);
    }
  };

  // output/Data.Symbol/index.js
  var reflectSymbol = function(dict) {
    return dict.reflectSymbol;
  };

  // output/Record.Unsafe/foreign.js
  var unsafeGet = function(label4) {
    return function(rec) {
      return rec[label4];
    };
  };
  var unsafeSet = function(label4) {
    return function(value12) {
      return function(rec) {
        var copy = {};
        for (var key in rec) {
          if ({}.hasOwnProperty.call(rec, key)) {
            copy[key] = rec[key];
          }
        }
        copy[label4] = value12;
        return copy;
      };
    };
  };

  // output/Data.Eq/foreign.js
  var refEq = function(r1) {
    return function(r2) {
      return r1 === r2;
    };
  };
  var eqIntImpl = refEq;

  // output/Data.Eq/index.js
  var eqInt = {
    eq: eqIntImpl
  };

  // output/Data.Ordering/index.js
  var LT = /* @__PURE__ */ function() {
    function LT2() {
    }
    ;
    LT2.value = new LT2();
    return LT2;
  }();
  var GT = /* @__PURE__ */ function() {
    function GT2() {
    }
    ;
    GT2.value = new GT2();
    return GT2;
  }();
  var EQ = /* @__PURE__ */ function() {
    function EQ2() {
    }
    ;
    EQ2.value = new EQ2();
    return EQ2;
  }();

  // output/Data.Semigroup/foreign.js
  var concatString = function(s1) {
    return function(s2) {
      return s1 + s2;
    };
  };
  var concatArray = function(xs) {
    return function(ys) {
      if (xs.length === 0) return ys;
      if (ys.length === 0) return xs;
      return xs.concat(ys);
    };
  };

  // output/Data.Semigroup/index.js
  var semigroupUnit = {
    append: function(v) {
      return function(v1) {
        return unit;
      };
    }
  };
  var semigroupString = {
    append: concatString
  };
  var semigroupRecordNil = {
    appendRecord: function(v) {
      return function(v1) {
        return function(v2) {
          return {};
        };
      };
    }
  };
  var semigroupArray = {
    append: concatArray
  };
  var appendRecord = function(dict) {
    return dict.appendRecord;
  };
  var semigroupRecord = function() {
    return function(dictSemigroupRecord) {
      return {
        append: appendRecord(dictSemigroupRecord)($$Proxy.value)
      };
    };
  };
  var append = function(dict) {
    return dict.append;
  };
  var semigroupRecordCons = function(dictIsSymbol) {
    var reflectSymbol2 = reflectSymbol(dictIsSymbol);
    return function() {
      return function(dictSemigroupRecord) {
        var appendRecord1 = appendRecord(dictSemigroupRecord);
        return function(dictSemigroup) {
          var append1 = append(dictSemigroup);
          return {
            appendRecord: function(v) {
              return function(ra) {
                return function(rb) {
                  var tail = appendRecord1($$Proxy.value)(ra)(rb);
                  var key = reflectSymbol2($$Proxy.value);
                  var insert2 = unsafeSet(key);
                  var get = unsafeGet(key);
                  return insert2(append1(get(ra))(get(rb)))(tail);
                };
              };
            }
          };
        };
      };
    };
  };

  // output/Data.Monoid/index.js
  var semigroupRecord2 = /* @__PURE__ */ semigroupRecord();
  var monoidUnit = {
    mempty: unit,
    Semigroup0: function() {
      return semigroupUnit;
    }
  };
  var monoidString = {
    mempty: "",
    Semigroup0: function() {
      return semigroupString;
    }
  };
  var monoidRecordNil = {
    memptyRecord: function(v) {
      return {};
    },
    SemigroupRecord0: function() {
      return semigroupRecordNil;
    }
  };
  var monoidArray = {
    mempty: [],
    Semigroup0: function() {
      return semigroupArray;
    }
  };
  var memptyRecord = function(dict) {
    return dict.memptyRecord;
  };
  var monoidRecord = function() {
    return function(dictMonoidRecord) {
      var semigroupRecord1 = semigroupRecord2(dictMonoidRecord.SemigroupRecord0());
      return {
        mempty: memptyRecord(dictMonoidRecord)($$Proxy.value),
        Semigroup0: function() {
          return semigroupRecord1;
        }
      };
    };
  };
  var mempty = function(dict) {
    return dict.mempty;
  };
  var monoidRecordCons = function(dictIsSymbol) {
    var reflectSymbol2 = reflectSymbol(dictIsSymbol);
    var semigroupRecordCons3 = semigroupRecordCons(dictIsSymbol)();
    return function(dictMonoid) {
      var mempty12 = mempty(dictMonoid);
      var Semigroup0 = dictMonoid.Semigroup0();
      return function() {
        return function(dictMonoidRecord) {
          var memptyRecord1 = memptyRecord(dictMonoidRecord);
          var semigroupRecordCons1 = semigroupRecordCons3(dictMonoidRecord.SemigroupRecord0())(Semigroup0);
          return {
            memptyRecord: function(v) {
              var tail = memptyRecord1($$Proxy.value);
              var key = reflectSymbol2($$Proxy.value);
              var insert2 = unsafeSet(key);
              return insert2(mempty12)(tail);
            },
            SemigroupRecord0: function() {
              return semigroupRecordCons1;
            }
          };
        };
      };
    };
  };

  // output/Effect/foreign.js
  var pureE = function(a) {
    return function() {
      return a;
    };
  };
  var bindE = function(a) {
    return function(f) {
      return function() {
        return f(a())();
      };
    };
  };

  // output/Control.Monad/index.js
  var ap = function(dictMonad) {
    var bind4 = bind(dictMonad.Bind1());
    var pure4 = pure(dictMonad.Applicative0());
    return function(f) {
      return function(a) {
        return bind4(f)(function(f$prime) {
          return bind4(a)(function(a$prime) {
            return pure4(f$prime(a$prime));
          });
        });
      };
    };
  };

  // output/Effect/index.js
  var $runtime_lazy = function(name15, moduleName, init) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2) return val;
      if (state3 === 1) throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init();
      state3 = 2;
      return val;
    };
  };
  var monadEffect = {
    Applicative0: function() {
      return applicativeEffect;
    },
    Bind1: function() {
      return bindEffect;
    }
  };
  var bindEffect = {
    bind: bindE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var applicativeEffect = {
    pure: pureE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var $lazy_functorEffect = /* @__PURE__ */ $runtime_lazy("functorEffect", "Effect", function() {
    return {
      map: liftA1(applicativeEffect)
    };
  });
  var $lazy_applyEffect = /* @__PURE__ */ $runtime_lazy("applyEffect", "Effect", function() {
    return {
      apply: ap(monadEffect),
      Functor0: function() {
        return $lazy_functorEffect(0);
      }
    };
  });
  var functorEffect = /* @__PURE__ */ $lazy_functorEffect(20);

  // output/Data.Array/foreign.js
  var replicateFill = function(count, value12) {
    if (count < 1) {
      return [];
    }
    var result = new Array(count);
    return result.fill(value12);
  };
  var replicatePolyfill = function(count, value12) {
    var result = [];
    var n = 0;
    for (var i = 0; i < count; i++) {
      result[n++] = value12;
    }
    return result;
  };
  var replicateImpl = typeof Array.prototype.fill === "function" ? replicateFill : replicatePolyfill;
  var indexImpl = function(just, nothing, xs, i) {
    return i < 0 || i >= xs.length ? nothing : just(xs[i]);
  };
  var concat = function(xss) {
    if (xss.length <= 1e4) {
      return Array.prototype.concat.apply([], xss);
    }
    var result = [];
    for (var i = 0, l = xss.length; i < l; i++) {
      var xs = xss[i];
      for (var j = 0, m2 = xs.length; j < m2; j++) {
        result.push(xs[j]);
      }
    }
    return result;
  };

  // output/Data.Bounded/foreign.js
  var topInt = 2147483647;
  var bottomInt = -2147483648;
  var topChar = String.fromCharCode(65535);
  var bottomChar = String.fromCharCode(0);
  var topNumber = Number.POSITIVE_INFINITY;
  var bottomNumber = Number.NEGATIVE_INFINITY;

  // output/Data.Ord/foreign.js
  var unsafeCompareImpl = function(lt) {
    return function(eq2) {
      return function(gt) {
        return function(x) {
          return function(y) {
            return x < y ? lt : x === y ? eq2 : gt;
          };
        };
      };
    };
  };
  var ordIntImpl = unsafeCompareImpl;

  // output/Data.Ord/index.js
  var ordInt = /* @__PURE__ */ function() {
    return {
      compare: ordIntImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqInt;
      }
    };
  }();

  // output/Data.Bounded/index.js
  var top = function(dict) {
    return dict.top;
  };
  var boundedInt = {
    top: topInt,
    bottom: bottomInt,
    Ord0: function() {
      return ordInt;
    }
  };
  var bottom = function(dict) {
    return dict.bottom;
  };

  // output/Data.Show/foreign.js
  var showIntImpl = function(n) {
    return n.toString();
  };
  var showNumberImpl = function(n) {
    var str = n.toString();
    return isNaN(str + ".0") ? str : str + ".0";
  };

  // output/Data.Show/index.js
  var showNumber = {
    show: showNumberImpl
  };
  var showInt = {
    show: showIntImpl
  };
  var show = function(dict) {
    return dict.show;
  };

  // output/Data.Maybe/index.js
  var identity2 = /* @__PURE__ */ identity(categoryFn);
  var Nothing = /* @__PURE__ */ function() {
    function Nothing2() {
    }
    ;
    Nothing2.value = new Nothing2();
    return Nothing2;
  }();
  var Just = /* @__PURE__ */ function() {
    function Just2(value0) {
      this.value0 = value0;
    }
    ;
    Just2.create = function(value0) {
      return new Just2(value0);
    };
    return Just2;
  }();
  var maybe = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2 instanceof Nothing) {
          return v;
        }
        ;
        if (v2 instanceof Just) {
          return v1(v2.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 237, column 1 - line 237, column 51): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  };
  var fromMaybe = function(a) {
    return maybe(a)(identity2);
  };

  // output/Data.Identity/index.js
  var Identity = function(x) {
    return x;
  };
  var functorIdentity = {
    map: function(f) {
      return function(m2) {
        return f(m2);
      };
    }
  };
  var applyIdentity = {
    apply: function(v) {
      return function(v1) {
        return v(v1);
      };
    },
    Functor0: function() {
      return functorIdentity;
    }
  };
  var bindIdentity = {
    bind: function(v) {
      return function(f) {
        return f(v);
      };
    },
    Apply0: function() {
      return applyIdentity;
    }
  };
  var applicativeIdentity = {
    pure: Identity,
    Apply0: function() {
      return applyIdentity;
    }
  };
  var monadIdentity = {
    Applicative0: function() {
      return applicativeIdentity;
    },
    Bind1: function() {
      return bindIdentity;
    }
  };

  // output/Effect.Ref/foreign.js
  var _new = function(val) {
    return function() {
      return { value: val };
    };
  };
  var read = function(ref) {
    return function() {
      return ref.value;
    };
  };
  var write = function(val) {
    return function(ref) {
      return function() {
        ref.value = val;
      };
    };
  };

  // output/Effect.Ref/index.js
  var $$new = _new;

  // output/Control.Monad.ST.Internal/foreign.js
  var map_ = function(f) {
    return function(a) {
      return function() {
        return f(a());
      };
    };
  };
  var pure_ = function(a) {
    return function() {
      return a;
    };
  };
  var bind_ = function(a) {
    return function(f) {
      return function() {
        return f(a())();
      };
    };
  };

  // output/Control.Monad.ST.Internal/index.js
  var $runtime_lazy2 = function(name15, moduleName, init) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2) return val;
      if (state3 === 1) throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init();
      state3 = 2;
      return val;
    };
  };
  var functorST = {
    map: map_
  };
  var monadST = {
    Applicative0: function() {
      return applicativeST;
    },
    Bind1: function() {
      return bindST;
    }
  };
  var bindST = {
    bind: bind_,
    Apply0: function() {
      return $lazy_applyST(0);
    }
  };
  var applicativeST = {
    pure: pure_,
    Apply0: function() {
      return $lazy_applyST(0);
    }
  };
  var $lazy_applyST = /* @__PURE__ */ $runtime_lazy2("applyST", "Control.Monad.ST.Internal", function() {
    return {
      apply: ap(monadST),
      Functor0: function() {
        return functorST;
      }
    };
  });

  // output/Data.Foldable/foreign.js
  var foldrArray = function(f) {
    return function(init) {
      return function(xs) {
        var acc = init;
        var len = xs.length;
        for (var i = len - 1; i >= 0; i--) {
          acc = f(xs[i])(acc);
        }
        return acc;
      };
    };
  };
  var foldlArray = function(f) {
    return function(init) {
      return function(xs) {
        var acc = init;
        var len = xs.length;
        for (var i = 0; i < len; i++) {
          acc = f(acc)(xs[i]);
        }
        return acc;
      };
    };
  };

  // output/Data.Tuple/index.js
  var Tuple = /* @__PURE__ */ function() {
    function Tuple2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Tuple2.create = function(value0) {
      return function(value1) {
        return new Tuple2(value0, value1);
      };
    };
    return Tuple2;
  }();
  var uncurry = function(f) {
    return function(v) {
      return f(v.value0)(v.value1);
    };
  };

  // output/Unsafe.Coerce/foreign.js
  var unsafeCoerce2 = function(x) {
    return x;
  };

  // output/Safe.Coerce/index.js
  var coerce = function() {
    return unsafeCoerce2;
  };

  // output/Data.Newtype/index.js
  var coerce2 = /* @__PURE__ */ coerce();
  var unwrap = function() {
    return coerce2;
  };

  // output/Data.Foldable/index.js
  var foldr = function(dict) {
    return dict.foldr;
  };
  var foldl = function(dict) {
    return dict.foldl;
  };
  var intercalate = function(dictFoldable) {
    var foldl2 = foldl(dictFoldable);
    return function(dictMonoid) {
      var append3 = append(dictMonoid.Semigroup0());
      var mempty6 = mempty(dictMonoid);
      return function(sep) {
        return function(xs) {
          var go2 = function(v) {
            return function(v1) {
              if (v.init) {
                return {
                  init: false,
                  acc: v1
                };
              }
              ;
              return {
                init: false,
                acc: append3(v.acc)(append3(sep)(v1))
              };
            };
          };
          return foldl2(go2)({
            init: true,
            acc: mempty6
          })(xs).acc;
        };
      };
    };
  };
  var foldMapDefaultR = function(dictFoldable) {
    var foldr22 = foldr(dictFoldable);
    return function(dictMonoid) {
      var append3 = append(dictMonoid.Semigroup0());
      var mempty6 = mempty(dictMonoid);
      return function(f) {
        return foldr22(function(x) {
          return function(acc) {
            return append3(f(x))(acc);
          };
        })(mempty6);
      };
    };
  };
  var foldableArray = {
    foldr: foldrArray,
    foldl: foldlArray,
    foldMap: function(dictMonoid) {
      return foldMapDefaultR(foldableArray)(dictMonoid);
    }
  };

  // output/Data.Function.Uncurried/foreign.js
  var runFn2 = function(fn) {
    return function(a) {
      return function(b) {
        return fn(a, b);
      };
    };
  };
  var runFn4 = function(fn) {
    return function(a) {
      return function(b) {
        return function(c) {
          return function(d) {
            return fn(a, b, c, d);
          };
        };
      };
    };
  };

  // output/Data.Traversable/foreign.js
  var traverseArrayImpl = /* @__PURE__ */ function() {
    function array1(a) {
      return [a];
    }
    function array2(a) {
      return function(b) {
        return [a, b];
      };
    }
    function array3(a) {
      return function(b) {
        return function(c) {
          return [a, b, c];
        };
      };
    }
    function concat2(xs) {
      return function(ys) {
        return xs.concat(ys);
      };
    }
    return function(apply2) {
      return function(map4) {
        return function(pure4) {
          return function(f) {
            return function(array) {
              function go2(bot, top3) {
                switch (top3 - bot) {
                  case 0:
                    return pure4([]);
                  case 1:
                    return map4(array1)(f(array[bot]));
                  case 2:
                    return apply2(map4(array2)(f(array[bot])))(f(array[bot + 1]));
                  case 3:
                    return apply2(apply2(map4(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                  default:
                    var pivot = bot + Math.floor((top3 - bot) / 4) * 2;
                    return apply2(map4(concat2)(go2(bot, pivot)))(go2(pivot, top3));
                }
              }
              return go2(0, array.length);
            };
          };
        };
      };
    };
  }();

  // output/Data.Traversable/index.js
  var identity3 = /* @__PURE__ */ identity(categoryFn);
  var traverse = function(dict) {
    return dict.traverse;
  };
  var sequenceDefault = function(dictTraversable) {
    var traverse22 = traverse(dictTraversable);
    return function(dictApplicative) {
      return traverse22(dictApplicative)(identity3);
    };
  };
  var traversableArray = {
    traverse: function(dictApplicative) {
      var Apply0 = dictApplicative.Apply0();
      return traverseArrayImpl(apply(Apply0))(map(Apply0.Functor0()))(pure(dictApplicative));
    },
    sequence: function(dictApplicative) {
      return sequenceDefault(traversableArray)(dictApplicative);
    },
    Functor0: function() {
      return functorArray;
    },
    Foldable1: function() {
      return foldableArray;
    }
  };

  // output/Data.Array/index.js
  var intercalate1 = /* @__PURE__ */ intercalate(foldableArray);
  var intercalate2 = function(dictMonoid) {
    return intercalate1(dictMonoid);
  };
  var index = /* @__PURE__ */ function() {
    return runFn4(indexImpl)(Just.create)(Nothing.value);
  }();
  var head = function(xs) {
    return index(xs)(0);
  };

  // output/Maquette/foreign.js
  var NAMESPACE_W3 = "http://www.w3.org/";
  var NAMESPACE_SVG = NAMESPACE_W3 + "2000/svg";
  var NAMESPACE_XLINK = NAMESPACE_W3 + "1999/xlink";
  var emptyArray = [];
  var extend2 = function(base, overrides) {
    var result = {};
    Object.keys(base).forEach(function(key) {
      result[key] = base[key];
    });
    if (overrides) {
      Object.keys(overrides).forEach(function(key) {
        result[key] = overrides[key];
      });
    }
    return result;
  };
  var same = function(vnode1, vnode2) {
    if (vnode1.vnodeSelector !== vnode2.vnodeSelector) {
      return false;
    }
    if (vnode1.properties && vnode2.properties) {
      if (vnode1.properties.key !== vnode2.properties.key) {
        return false;
      }
      return vnode1.properties.bind === vnode2.properties.bind;
    }
    return !vnode1.properties && !vnode2.properties;
  };
  var checkStyleValue = function(styleValue) {
    if (typeof styleValue !== "string") {
      throw new Error("Style values must be strings");
    }
  };
  var findIndexOfChild = function(children, sameAs, start2) {
    if (sameAs.vnodeSelector !== "") {
      for (var i = start2; i < children.length; i++) {
        if (same(children[i], sameAs)) {
          return i;
        }
      }
    }
    return -1;
  };
  var checkDistinguishable = function(childNodes, indexToCheck, parentVNode, operation) {
    var childNode = childNodes[indexToCheck];
    if (childNode.vnodeSelector === "") {
      return;
    }
    var properties = childNode.properties;
    var key = properties ? properties.key === void 0 ? properties.bind : properties.key : void 0;
    if (!key) {
      for (var i = 0; i < childNodes.length; i++) {
        if (i !== indexToCheck) {
          var node = childNodes[i];
          if (same(node, childNode)) {
            throw {
              error: new Error(parentVNode.vnodeSelector + " had a " + childNode.vnodeSelector + " child " + (operation === "added" ? operation : "removed") + ", but there is now more than one. You must add unique key properties to make them distinguishable."),
              parentNode: parentVNode,
              childNode
            };
          }
        }
      }
    }
  };
  var nodeAdded = function(vNode) {
    if (vNode.properties) {
      var enterAnimation = vNode.properties.enterAnimation;
      if (enterAnimation) {
        enterAnimation(vNode.domNode, vNode.properties);
      }
    }
  };
  var removedNodes = [];
  var requestedIdleCallback = false;
  var visitRemovedNode = function(node) {
    (node.children || []).forEach(visitRemovedNode);
    if (node.properties && node.properties.afterRemoved) {
      node.properties.afterRemoved.apply(node.properties.bind || node.properties, [
        node.domNode
      ]);
    }
  };
  var processPendingNodeRemovals = function() {
    requestedIdleCallback = false;
    removedNodes.forEach(visitRemovedNode);
    removedNodes.length = 0;
  };
  var scheduleNodeRemoval = function(vNode) {
    removedNodes.push(vNode);
    if (!requestedIdleCallback) {
      requestedIdleCallback = true;
      if (typeof window !== "undefined" && "requestIdleCallback" in window) {
        window.requestIdleCallback(processPendingNodeRemovals, { timeout: 16 });
      } else {
        setTimeout(processPendingNodeRemovals, 16);
      }
    }
  };
  var nodeToRemove = function(vNode) {
    var domNode = vNode.domNode;
    if (vNode.properties) {
      var exitAnimation = vNode.properties.exitAnimation;
      if (exitAnimation) {
        domNode.style.pointerEvents = "none";
        var removeDomNode = function() {
          if (domNode.parentNode) {
            domNode.parentNode.removeChild(domNode);
            scheduleNodeRemoval(vNode);
          }
        };
        exitAnimation(domNode, removeDomNode, vNode.properties);
        return;
      }
    }
    if (domNode.parentNode) {
      domNode.parentNode.removeChild(domNode);
      scheduleNodeRemoval(vNode);
    }
  };
  var vnodeOnlyProps = [
    "afterCreate",
    "afterUpdate",
    "afterRemoved",
    "enterAnimation",
    "exitAnimation",
    "updateAnimation"
  ];
  function filterVNodeOnlyProps(name15) {
    return !vnodeOnlyProps.includes(name15);
  }
  var setProperties = function(domNode, properties, projectionOptions) {
    if (!properties) {
      return;
    }
    var eventHandlerInterceptor = projectionOptions.eventHandlerInterceptor;
    var propNames = Object.keys(properties).filter(filterVNodeOnlyProps);
    var propCount = propNames.length;
    for (var i = 0; i < propCount; i++) {
      var propName = propNames[i];
      var propValue = properties[propName];
      if (propName === "className") {
        throw new Error('Property "className" is not supported, use "class".');
      } else if (propName === "class") {
        toggleClasses(domNode, propValue, true);
      } else if (propName === "classes") {
        var classNames = Object.keys(propValue);
        var classNameCount = classNames.length;
        for (var j = 0; j < classNameCount; j++) {
          var className = classNames[j];
          if (propValue[className]) {
            domNode.classList.add(className);
          }
        }
      } else if (propName === "styles") {
        var styleNames = Object.keys(propValue);
        var styleCount = styleNames.length;
        for (var j = 0; j < styleCount; j++) {
          var styleName = styleNames[j];
          var styleValue = propValue[styleName];
          if (styleValue) {
            checkStyleValue(styleValue);
            projectionOptions.styleApplyer(domNode, styleName, styleValue);
          }
        }
      } else if (propName === "on" && propValue) {
        for (var _i = 0, _a = Object.entries(properties.on); _i < _a.length; _i++) {
          var _b = _a[_i], key = _b[0], handler = _b[1];
          var listener = typeof handler === "function" ? handler : handler.listener;
          if (eventHandlerInterceptor) {
            listener = eventHandlerInterceptor(key, listener, domNode, properties);
          }
          if (listener) {
            domNode.addEventListener(key, listener, typeof handler === "function" ? void 0 : handler.options);
          }
        }
      } else if (propName !== "key" && propValue !== null && propValue !== void 0) {
        var type = typeof propValue;
        if (type === "function") {
          if (propName.lastIndexOf("on", 0) === 0) {
            if (eventHandlerInterceptor) {
              propValue = eventHandlerInterceptor(propName, propValue, domNode, properties);
            }
          }
          domNode[propName] = propValue;
        } else if (projectionOptions.namespace === NAMESPACE_SVG) {
          if (propName === "href") {
            domNode.setAttributeNS(NAMESPACE_XLINK, propName, propValue);
          } else {
            domNode.setAttribute(propName, propValue);
          }
        } else if (type === "string" && propName !== "value" && propName !== "innerHTML") {
          domNode.setAttribute(propName, propValue);
        } else {
          domNode[propName] = propValue;
        }
      }
    }
  };
  var addChildren = function(domNode, children, projectionOptions) {
    if (!children) {
      return;
    }
    for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
      var child = children_1[_i];
      createDom(child, domNode, void 0, projectionOptions);
    }
  };
  var initPropertiesAndChildren = function(domNode, vnode, projectionOptions) {
    addChildren(domNode, vnode.children, projectionOptions);
    if (vnode.text) {
      domNode.textContent = vnode.text;
    }
    setProperties(domNode, vnode.properties, projectionOptions);
    if (vnode.properties && vnode.properties.afterCreate) {
      vnode.properties.afterCreate.apply(vnode.properties.bind || vnode.properties, [
        domNode,
        projectionOptions,
        vnode.vnodeSelector,
        vnode.properties,
        vnode.children
      ]);
    }
  };
  var createDom = function(vnode, parentNode, insertBefore, projectionOptions) {
    var _a;
    var domNode;
    var start2 = 0;
    var vnodeSelector = vnode.vnodeSelector;
    var doc = parentNode.ownerDocument;
    if (vnodeSelector === "") {
      if (vnode.domNode) {
        vnode.domNode.nodeValue = vnode.text;
      } else {
        domNode = vnode.domNode = doc.createTextNode(vnode.text);
        if (insertBefore !== void 0) {
          parentNode.insertBefore(domNode, insertBefore);
        } else {
          parentNode.appendChild(domNode);
        }
      }
    } else {
      for (var i = 0; i <= vnodeSelector.length; ++i) {
        var c = vnodeSelector.charAt(i);
        if (i === vnodeSelector.length || c === "." || c === "#") {
          var type = vnodeSelector.charAt(start2 - 1);
          var found = vnodeSelector.slice(start2, i);
          if (type === ".") {
            domNode.classList.add(found);
          } else if (type === "#") {
            domNode.id = found;
          } else {
            if (found === "svg") {
              projectionOptions = extend2(projectionOptions, {
                namespace: NAMESPACE_SVG
              });
            }
            if (projectionOptions.namespace !== void 0) {
              domNode = vnode.domNode = doc.createElementNS(projectionOptions.namespace, found);
            } else {
              domNode = vnode.domNode = vnode.domNode || (((_a = vnode.properties) === null || _a === void 0 ? void 0 : _a.is) ? doc.createElement(found, { is: vnode.properties.is }) : doc.createElement(found));
              if (found === "input" && vnode.properties && vnode.properties.type !== void 0) {
                domNode.setAttribute("type", vnode.properties.type);
              }
            }
            if (insertBefore !== void 0) {
              parentNode.insertBefore(domNode, insertBefore);
            } else if (domNode.parentNode !== parentNode) {
              parentNode.appendChild(domNode);
            }
          }
          start2 = i + 1;
        }
      }
      initPropertiesAndChildren(domNode, vnode, projectionOptions);
    }
  };
  var updateDom;
  var toggleClasses = function(domNode, classes, on2) {
    if (!classes) {
      return;
    }
    classes.split(" ").forEach(function(classToToggle) {
      if (classToToggle) {
        domNode.classList.toggle(classToToggle, on2);
      }
    });
  };
  var updateProperties = function(domNode, previousProperties, properties, projectionOptions) {
    if (!properties) {
      return;
    }
    var propertiesUpdated = false;
    var propNames = Object.keys(properties).filter(filterVNodeOnlyProps);
    var propCount = propNames.length;
    for (var i = 0; i < propCount; i++) {
      var propName = propNames[i];
      var propValue = properties[propName];
      var previousValue = previousProperties[propName];
      if (propName === "class") {
        if (previousValue !== propValue) {
          toggleClasses(domNode, previousValue, false);
          toggleClasses(domNode, propValue, true);
        }
      } else if (propName === "classes") {
        var classList = domNode.classList;
        var classNames = Object.keys(propValue);
        var classNameCount = classNames.length;
        for (var j = 0; j < classNameCount; j++) {
          var className = classNames[j];
          var on2 = !!propValue[className];
          var previousOn = !!previousValue[className];
          if (on2 === previousOn) {
            continue;
          }
          propertiesUpdated = true;
          if (on2) {
            classList.add(className);
          } else {
            classList.remove(className);
          }
        }
      } else if (propName === "styles") {
        var styleNames = Object.keys(propValue);
        var styleCount = styleNames.length;
        for (var j = 0; j < styleCount; j++) {
          var styleName = styleNames[j];
          var newStyleValue = propValue[styleName];
          var oldStyleValue = previousValue[styleName];
          if (newStyleValue === oldStyleValue) {
            continue;
          }
          propertiesUpdated = true;
          if (newStyleValue) {
            checkStyleValue(newStyleValue);
            projectionOptions.styleApplyer(domNode, styleName, newStyleValue);
          } else {
            projectionOptions.styleApplyer(domNode, styleName, "");
          }
        }
      } else {
        if (!propValue && typeof previousValue === "string") {
          propValue = "";
        }
        if (propName === "value") {
          var domValue = domNode[propName];
          if (domValue !== propValue && // The 'value' in the DOM tree !== newValue
          propValue !== previousValue) {
            domNode[propName] = propValue;
          }
          if (propValue !== previousValue) {
            propertiesUpdated = true;
          }
        } else if (propValue !== previousValue) {
          var type = typeof propValue;
          if (type !== "function" || !projectionOptions.eventHandlerInterceptor) {
            if (projectionOptions.namespace === NAMESPACE_SVG) {
              if (propName === "href") {
                domNode.setAttributeNS(NAMESPACE_XLINK, propName, propValue);
              } else {
                domNode.setAttribute(propName, propValue);
              }
            } else if (type === "string" && propName !== "innerHTML") {
              if (propName === "role" && propValue === "") {
                domNode.removeAttribute(propName);
              } else {
                domNode.setAttribute(propName, propValue);
              }
            } else if (domNode[propName] !== propValue) {
              domNode[propName] = propValue;
            }
            propertiesUpdated = true;
          }
        }
      }
    }
    return propertiesUpdated;
  };
  var updateChildren = function(vnode, domNode, oldChildren, newChildren, projectionOptions) {
    if (oldChildren === newChildren) {
      return false;
    }
    oldChildren = oldChildren || emptyArray;
    newChildren = newChildren || emptyArray;
    var oldChildrenLength = oldChildren.length;
    var newChildrenLength = newChildren.length;
    var oldIndex = 0;
    var newIndex = 0;
    var i;
    var textUpdated = false;
    while (newIndex < newChildrenLength) {
      var oldChild = oldIndex < oldChildrenLength ? oldChildren[oldIndex] : void 0;
      var newChild = newChildren[newIndex];
      if (oldChild !== void 0 && same(oldChild, newChild)) {
        textUpdated = updateDom(oldChild, newChild, projectionOptions, domNode, oldChildren) || textUpdated;
        oldIndex++;
      } else {
        var findOldIndex = findIndexOfChild(oldChildren, newChild, oldIndex + 1);
        if (findOldIndex >= 0) {
          for (i = oldIndex; i < findOldIndex; i++) {
            nodeToRemove(oldChildren[i]);
            checkDistinguishable(oldChildren, i, vnode, "removed");
          }
          textUpdated = updateDom(oldChildren[findOldIndex], newChild, projectionOptions, domNode, oldChildren) || textUpdated;
          oldIndex = findOldIndex + 1;
        } else {
          createDom(newChild, domNode, oldIndex < oldChildrenLength ? oldChildren[oldIndex].domNode : void 0, projectionOptions);
          nodeAdded(newChild);
          checkDistinguishable(newChildren, newIndex, vnode, "added");
        }
      }
      newIndex++;
    }
    if (oldChildrenLength > oldIndex) {
      for (i = oldIndex; i < oldChildrenLength; i++) {
        nodeToRemove(oldChildren[i]);
        checkDistinguishable(oldChildren, i, vnode, "removed");
      }
    }
    return textUpdated;
  };
  updateDom = function(previous, vnode, projectionOptions, parentNode, oldChildren) {
    var domNode = previous.domNode;
    var textUpdated = false;
    if (previous === vnode) {
      return false;
    }
    var updated = false;
    if (vnode.vnodeSelector === "") {
      if (vnode.text !== previous.text) {
        var newTextNode = domNode.ownerDocument.createTextNode(vnode.text);
        try {
          parentNode.replaceChild(newTextNode, domNode);
        } catch (e) {
          parentNode.replaceChild(newTextNode, parentNode.childNodes[oldChildren.indexOf(previous)]);
        }
        vnode.domNode = newTextNode;
        textUpdated = true;
        return textUpdated;
      }
      vnode.domNode = domNode;
    } else {
      if (vnode.vnodeSelector.lastIndexOf("svg", 0) === 0) {
        projectionOptions = extend2(projectionOptions, {
          namespace: NAMESPACE_SVG
        });
      }
      if (previous.text !== vnode.text) {
        updated = true;
        if (vnode.text === void 0) {
          domNode.removeChild(domNode.firstChild);
        } else {
          domNode.textContent = vnode.text;
        }
      }
      vnode.domNode = domNode;
      updated = updateChildren(vnode, domNode, previous.children, vnode.children, projectionOptions) || updated;
      updated = updateProperties(domNode, previous.properties, vnode.properties, projectionOptions) || updated;
      if (vnode.properties && vnode.properties.afterUpdate) {
        vnode.properties.afterUpdate.apply(vnode.properties.bind || vnode.properties, [
          domNode,
          projectionOptions,
          vnode.vnodeSelector,
          vnode.properties,
          vnode.children
        ]);
      }
    }
    if (updated && vnode.properties && vnode.properties.updateAnimation) {
      vnode.properties.updateAnimation(domNode, vnode.properties, previous.properties);
    }
    return textUpdated;
  };
  var createProjection = function(vnode, projectionOptions) {
    return {
      getLastRender: function() {
        return vnode;
      },
      update: function(updatedVnode) {
        if (vnode.vnodeSelector !== updatedVnode.vnodeSelector) {
          throw new Error("The selector for the root VNode may not be changed. (consider using dom.merge and add one extra level to the virtual DOM)");
        }
        var previousVNode = vnode;
        vnode = updatedVnode;
        updateDom(previousVNode, updatedVnode, projectionOptions, previousVNode.domNode.parentNode, [previousVNode]);
      },
      domNode: vnode.domNode
    };
  };
  var DEFAULT_PROJECTION_OPTIONS = {
    namespace: void 0,
    performanceLogger: function() {
      return void 0;
    },
    eventHandlerInterceptor: void 0,
    styleApplyer: function(domNode, styleName, value12) {
      if (styleName.charAt(0) === "-") {
        domNode.style.setProperty(styleName, value12);
      } else {
        domNode.style[styleName] = value12;
      }
    }
  };
  var applyDefaultProjectionOptions = function(projectorOptions) {
    return extend2(DEFAULT_PROJECTION_OPTIONS, projectorOptions);
  };
  var dom = {
    /**
     * Creates a real DOM tree from `vnode`. The [[Projection]] object returned will contain the resulting DOM Node in
     * its [[Projection.domNode|domNode]] property.
     * This is a low-level method. Users will typically use a [[Projector]] instead.
     * @param vnode - The root of the virtual DOM tree that was created using the [[h]] function. NOTE: [[VNode]]
     * objects may only be rendered once.
     * @param projectionOptions - Options to be used to create and update the projection.
     * @returns The [[Projection]] which also contains the DOM Node that was created.
     */
    create: function(vnode, projectionOptions) {
      projectionOptions = applyDefaultProjectionOptions(projectionOptions);
      createDom(vnode, document.createElement("div"), void 0, projectionOptions);
      return createProjection(vnode, projectionOptions);
    },
    /**
     * Appends a new child node to the DOM which is generated from a [[VNode]].
     * This is a low-level method. Users will typically use a [[Projector]] instead.
     * @param parentNode - The parent node for the new child node.
     * @param vnode - The root of the virtual DOM tree that was created using the [[h]] function. NOTE: [[VNode]]
     * objects may only be rendered once.
     * @param projectionOptions - Options to be used to create and update the [[Projection]].
     * @returns The [[Projection]] that was created.
     */
    append: function(parentNode, vnode, projectionOptions) {
      projectionOptions = applyDefaultProjectionOptions(projectionOptions);
      createDom(vnode, parentNode, void 0, projectionOptions);
      return createProjection(vnode, projectionOptions);
    },
    /**
     * Inserts a new DOM node which is generated from a [[VNode]].
     * This is a low-level method. Users wil typically use a [[Projector]] instead.
     * @param beforeNode - The node that the DOM Node is inserted before.
     * @param vnode - The root of the virtual DOM tree that was created using the [[h]] function.
     * NOTE: [[VNode]] objects may only be rendered once.
     * @param projectionOptions - Options to be used to create and update the projection, see [[createProjector]].
     * @returns The [[Projection]] that was created.
     */
    insertBefore: function(beforeNode, vnode, projectionOptions) {
      projectionOptions = applyDefaultProjectionOptions(projectionOptions);
      createDom(vnode, beforeNode.parentNode, beforeNode, projectionOptions);
      return createProjection(vnode, projectionOptions);
    },
    /**
     * Merges a new DOM node which is generated from a [[VNode]] with an existing DOM Node.
     * This means that the virtual DOM and the real DOM will have one overlapping element.
     * Therefore the selector for the root [[VNode]] will be ignored, but its properties and children will be applied to the Element provided.
     * This is a low-level method. Users wil typically use a [[Projector]] instead.
     * @param element - The existing element to adopt as the root of the new virtual DOM. Existing attributes and child nodes are preserved.
     * @param vnode - The root of the virtual DOM tree that was created using the [[h]] function. NOTE: [[VNode]] objects
     * may only be rendered once.
     * @param projectionOptions - Options to be used to create and update the projection, see [[createProjector]].
     * @returns The [[Projection]] that was created.
     */
    merge: function(element, vnode, projectionOptions) {
      projectionOptions = applyDefaultProjectionOptions(projectionOptions);
      vnode.domNode = element;
      initPropertiesAndChildren(element, vnode, projectionOptions);
      return createProjection(vnode, projectionOptions);
    },
    /**
     * Replaces an existing DOM node with a node generated from a [[VNode]].
     * This is a low-level method. Users will typically use a [[Projector]] instead.
     * @param element - The node for the [[VNode]] to replace.
     * @param vnode - The root of the virtual DOM tree that was created using the [[h]] function. NOTE: [[VNode]]
     * objects may only be rendered once.
     * @param projectionOptions - Options to be used to create and update the [[Projection]].
     * @returns The [[Projection]] that was created.
     */
    replace: function(element, vnode, projectionOptions) {
      projectionOptions = applyDefaultProjectionOptions(projectionOptions);
      createDom(vnode, element.parentNode, element, projectionOptions);
      element.parentNode.removeChild(element);
      return createProjection(vnode, projectionOptions);
    }
  };
  var toTextVNode = function(data) {
    return {
      vnodeSelector: "",
      properties: void 0,
      children: void 0,
      text: data.toString(),
      domNode: null
    };
  };
  var appendChildren = function(parentSelector, insertions, main2) {
    for (var i = 0, length_1 = insertions.length; i < length_1; i++) {
      var item = insertions[i];
      if (Array.isArray(item)) {
        appendChildren(parentSelector, item, main2);
      } else {
        if (item !== null && item !== void 0 && item !== false) {
          if (typeof item === "string") {
            item = toTextVNode(item);
          }
          main2.push(item);
        }
      }
    }
  };
  function h(selector, properties, children) {
    if (Array.isArray(properties)) {
      children = properties;
      properties = void 0;
    } else if (properties && (typeof properties === "string" || properties.vnodeSelector) || children && (typeof children === "string" || children.vnodeSelector)) {
      throw new Error("h called with invalid arguments");
    }
    var text6;
    var flattenedChildren;
    if (children && children.length === 1 && typeof children[0] === "string") {
      text6 = children[0];
    } else if (children) {
      flattenedChildren = [];
      appendChildren(selector, children, flattenedChildren);
      if (flattenedChildren.length === 0) {
        flattenedChildren = void 0;
      }
    }
    return {
      vnodeSelector: selector,
      properties,
      children: flattenedChildren,
      text: text6 === "" ? void 0 : text6,
      domNode: null
    };
  }
  var createParentNodePath = function(node, rootNode) {
    var parentNodePath = [];
    while (node && node !== rootNode) {
      parentNodePath.push(node);
      node = node.parentNode;
    }
    return parentNodePath;
  };
  var find2;
  if (Array.prototype.find) {
    find2 = function(items, predicate) {
      return items.find(predicate);
    };
  } else {
    find2 = function(items, predicate) {
      return items.filter(predicate)[0];
    };
  }
  var findVNodeByParentNodePath = function(vnode, parentNodePath) {
    var result = vnode;
    parentNodePath.forEach(function(node) {
      result = result && result.children ? find2(result.children, function(child) {
        return child.domNode === node;
      }) : void 0;
    });
    return result;
  };
  var createEventHandlerInterceptor = function(projector, getProjection, performanceLogger) {
    return function(propertyName, eventHandler, domNode, properties) {
      return modifiedEventHandler;
    };
    function modifiedEventHandler(evt) {
      var _a, _b;
      performanceLogger("domEvent", evt);
      var projection = getProjection();
      var parentNodePath = createParentNodePath(evt.currentTarget, projection.domNode);
      parentNodePath.reverse();
      var matchingVNode = findVNodeByParentNodePath(projection.getLastRender(), parentNodePath);
      projector.scheduleRender();
      var result;
      if (matchingVNode) {
        var listener = (_b = (_a = matchingVNode.properties["on" + evt.type]) !== null && _a !== void 0 ? _a : matchingVNode.properties.on[evt.type].listener) !== null && _b !== void 0 ? _b : matchingVNode.properties.on[evt.type];
        result = listener.apply(matchingVNode.properties.bind || this, arguments);
      }
      performanceLogger("domEventProcessed", evt);
      return result;
    }
  };
  var createProjector = function(projectorOptions) {
    var projector;
    var projectionOptions = applyDefaultProjectionOptions(projectorOptions);
    var performanceLogger = projectionOptions.performanceLogger;
    var renderCompleted = true;
    var scheduled;
    var stopped = false;
    var projections = [];
    var renderFunctions = [];
    var addProjection = function(domFunction, node, renderFunction) {
      var projection;
      var getProjection = function() {
        return projection;
      };
      projectionOptions.eventHandlerInterceptor = createEventHandlerInterceptor(projector, getProjection, performanceLogger);
      projection = domFunction(node, renderFunction(), projectionOptions);
      projections.push(projection);
      renderFunctions.push(renderFunction);
    };
    var doRender = function() {
      scheduled = void 0;
      if (!renderCompleted) {
        return;
      }
      renderCompleted = false;
      performanceLogger("renderStart", void 0);
      for (var i = 0; i < projections.length; i++) {
        var updatedVnode = renderFunctions[i]();
        performanceLogger("rendered", void 0);
        projections[i].update(updatedVnode);
        performanceLogger("patched", void 0);
      }
      performanceLogger("renderDone", void 0);
      renderCompleted = true;
    };
    projector = {
      renderNow: doRender,
      scheduleRender: function() {
        if (!scheduled && !stopped) {
          scheduled = requestAnimationFrame(doRender);
        }
      },
      stop: function() {
        if (scheduled) {
          cancelAnimationFrame(scheduled);
          scheduled = void 0;
        }
        stopped = true;
      },
      resume: function() {
        stopped = false;
        renderCompleted = true;
        projector.scheduleRender();
      },
      append: function(parentNode, renderFunction) {
        addProjection(dom.append, parentNode, renderFunction);
      },
      insertBefore: function(beforeNode, renderFunction) {
        addProjection(dom.insertBefore, beforeNode, renderFunction);
      },
      merge: function(domNode, renderFunction) {
        addProjection(dom.merge, domNode, renderFunction);
      },
      replace: function(domNode, renderFunction) {
        addProjection(dom.replace, domNode, renderFunction);
      },
      detach: function(renderFunction) {
        for (var i = 0; i < renderFunctions.length; i++) {
          if (renderFunctions[i] === renderFunction) {
            renderFunctions.splice(i, 1);
            return projections.splice(i, 1)[0];
          }
        }
        throw new Error("renderFunction was not found");
      }
    };
    return projector;
  };
  function _h(selector) {
    return function(properties) {
      return function(children) {
        return h(selector, properties, children);
      };
    };
  }
  function scheduleRender(projector) {
    return function() {
      projector.scheduleRender();
    };
  }
  function replace(projector) {
    return function(el) {
      return function(render4) {
        return function() {
          projector.replace(el, render4);
        };
      };
    };
  }

  // output/Maquette/index.js
  var string = unsafeCoerce2;
  var h2 = _h;

  // output/Control.Monad.Writer.Class/index.js
  var tell = function(dict) {
    return dict.tell;
  };

  // output/Control.Monad.Writer.Trans/index.js
  var WriterT = function(x) {
    return x;
  };
  var runWriterT = function(v) {
    return v;
  };
  var mapWriterT = function(f) {
    return function(v) {
      return f(v);
    };
  };
  var functorWriterT = function(dictFunctor) {
    var map4 = map(dictFunctor);
    return {
      map: function(f) {
        return mapWriterT(map4(function(v) {
          return new Tuple(f(v.value0), v.value1);
        }));
      }
    };
  };
  var applyWriterT = function(dictSemigroup) {
    var append3 = append(dictSemigroup);
    return function(dictApply) {
      var apply2 = apply(dictApply);
      var Functor0 = dictApply.Functor0();
      var map4 = map(Functor0);
      var functorWriterT1 = functorWriterT(Functor0);
      return {
        apply: function(v) {
          return function(v1) {
            var k = function(v3) {
              return function(v4) {
                return new Tuple(v3.value0(v4.value0), append3(v3.value1)(v4.value1));
              };
            };
            return apply2(map4(k)(v))(v1);
          };
        },
        Functor0: function() {
          return functorWriterT1;
        }
      };
    };
  };
  var bindWriterT = function(dictSemigroup) {
    var append3 = append(dictSemigroup);
    var applyWriterT1 = applyWriterT(dictSemigroup);
    return function(dictBind) {
      var bind4 = bind(dictBind);
      var Apply0 = dictBind.Apply0();
      var map4 = map(Apply0.Functor0());
      var applyWriterT2 = applyWriterT1(Apply0);
      return {
        bind: function(v) {
          return function(k) {
            return bind4(v)(function(v1) {
              var v2 = k(v1.value0);
              return map4(function(v3) {
                return new Tuple(v3.value0, append3(v1.value1)(v3.value1));
              })(v2);
            });
          };
        },
        Apply0: function() {
          return applyWriterT2;
        }
      };
    };
  };
  var semigroupWriterT = function(dictApply) {
    return function(dictSemigroup) {
      var lift22 = lift2(applyWriterT(dictSemigroup)(dictApply));
      return function(dictSemigroup1) {
        return {
          append: lift22(append(dictSemigroup1))
        };
      };
    };
  };
  var applicativeWriterT = function(dictMonoid) {
    var mempty6 = mempty(dictMonoid);
    var applyWriterT1 = applyWriterT(dictMonoid.Semigroup0());
    return function(dictApplicative) {
      var pure4 = pure(dictApplicative);
      var applyWriterT2 = applyWriterT1(dictApplicative.Apply0());
      return {
        pure: function(a) {
          return pure4(new Tuple(a, mempty6));
        },
        Apply0: function() {
          return applyWriterT2;
        }
      };
    };
  };
  var monadWriterT = function(dictMonoid) {
    var applicativeWriterT1 = applicativeWriterT(dictMonoid);
    var bindWriterT1 = bindWriterT(dictMonoid.Semigroup0());
    return function(dictMonad) {
      var applicativeWriterT22 = applicativeWriterT1(dictMonad.Applicative0());
      var bindWriterT22 = bindWriterT1(dictMonad.Bind1());
      return {
        Applicative0: function() {
          return applicativeWriterT22;
        },
        Bind1: function() {
          return bindWriterT22;
        }
      };
    };
  };
  var monadTellWriterT = function(dictMonoid) {
    var Semigroup0 = dictMonoid.Semigroup0();
    var monadWriterT1 = monadWriterT(dictMonoid);
    return function(dictMonad) {
      var monadWriterT2 = monadWriterT1(dictMonad);
      return {
        tell: function() {
          var $262 = pure(dictMonad.Applicative0());
          var $263 = Tuple.create(unit);
          return function($264) {
            return WriterT($262($263($264)));
          };
        }(),
        Semigroup0: function() {
          return Semigroup0;
        },
        Monad1: function() {
          return monadWriterT2;
        }
      };
    };
  };
  var monoidWriterT = function(dictApplicative) {
    var semigroupWriterT1 = semigroupWriterT(dictApplicative.Apply0());
    return function(dictMonoid) {
      var pure4 = pure(applicativeWriterT(dictMonoid)(dictApplicative));
      var semigroupWriterT2 = semigroupWriterT1(dictMonoid.Semigroup0());
      return function(dictMonoid1) {
        var semigroupWriterT3 = semigroupWriterT2(dictMonoid1.Semigroup0());
        return {
          mempty: pure4(mempty(dictMonoid1)),
          Semigroup0: function() {
            return semigroupWriterT3;
          }
        };
      };
    };
  };

  // output/Control.Monad.Writer/index.js
  var unwrap2 = /* @__PURE__ */ unwrap();
  var runWriter = function($5) {
    return unwrap2(runWriterT($5));
  };

  // output/Data.Int/foreign.js
  var fromNumberImpl = function(just) {
    return function(nothing) {
      return function(n) {
        return (n | 0) === n ? just(n) : nothing;
      };
    };
  };
  var toNumber = function(n) {
    return n;
  };

  // output/Data.Number/foreign.js
  var isFiniteImpl = isFinite;
  var round = Math.round;

  // output/Data.Int/index.js
  var top2 = /* @__PURE__ */ top(boundedInt);
  var bottom2 = /* @__PURE__ */ bottom(boundedInt);
  var fromNumber = /* @__PURE__ */ function() {
    return fromNumberImpl(Just.create)(Nothing.value);
  }();
  var unsafeClamp = function(x) {
    if (!isFiniteImpl(x)) {
      return 0;
    }
    ;
    if (x >= toNumber(top2)) {
      return top2;
    }
    ;
    if (x <= toNumber(bottom2)) {
      return bottom2;
    }
    ;
    if (otherwise) {
      return fromMaybe(0)(fromNumber(x));
    }
    ;
    throw new Error("Failed pattern match at Data.Int (line 72, column 1 - line 72, column 29): " + [x.constructor.name]);
  };
  var round2 = function($37) {
    return unsafeClamp(round($37));
  };

  // output/Data.TraversableWithIndex/index.js
  var traverseWithIndex = function(dict) {
    return dict.traverseWithIndex;
  };

  // output/Foreign.Object/foreign.js
  function _copyST(m2) {
    return function() {
      var r = {};
      for (var k in m2) {
        if (hasOwnProperty.call(m2, k)) {
          r[k] = m2[k];
        }
      }
      return r;
    };
  }
  var empty2 = {};
  function runST(f) {
    return f();
  }
  function _fmapObject(m0, f) {
    var m2 = {};
    for (var k in m0) {
      if (hasOwnProperty.call(m0, k)) {
        m2[k] = f(m0[k]);
      }
    }
    return m2;
  }
  function _mapWithKey(m0, f) {
    var m2 = {};
    for (var k in m0) {
      if (hasOwnProperty.call(m0, k)) {
        m2[k] = f(k)(m0[k]);
      }
    }
    return m2;
  }
  function _foldM(bind4) {
    return function(f) {
      return function(mz) {
        return function(m2) {
          var acc = mz;
          function g(k2) {
            return function(z) {
              return f(z)(k2)(m2[k2]);
            };
          }
          for (var k in m2) {
            if (hasOwnProperty.call(m2, k)) {
              acc = bind4(acc)(g(k));
            }
          }
          return acc;
        };
      };
    };
  }
  function toArrayWithKey(f) {
    return function(m2) {
      var r = [];
      for (var k in m2) {
        if (hasOwnProperty.call(m2, k)) {
          r.push(f(k)(m2[k]));
        }
      }
      return r;
    };
  }
  var keys = Object.keys || toArrayWithKey(function(k) {
    return function() {
      return k;
    };
  });

  // output/Foreign.Object.ST/foreign.js
  var newImpl = function() {
    return {};
  };
  function poke2(k) {
    return function(v) {
      return function(m2) {
        return function() {
          m2[k] = v;
          return m2;
        };
      };
    };
  }

  // output/Foreign.Object/index.js
  var bindFlipped2 = /* @__PURE__ */ bindFlipped(bindST);
  var foldr2 = /* @__PURE__ */ foldr(foldableArray);
  var identity4 = /* @__PURE__ */ identity(categoryFn);
  var values = /* @__PURE__ */ toArrayWithKey(function(v) {
    return function(v1) {
      return v1;
    };
  });
  var thawST = _copyST;
  var singleton2 = function(k) {
    return function(v) {
      return runST(bindFlipped2(poke2(k)(v))(newImpl));
    };
  };
  var mutate = function(f) {
    return function(m2) {
      return runST(function __do() {
        var s = thawST(m2)();
        f(s)();
        return s;
      });
    };
  };
  var mapWithKey = function(f) {
    return function(m2) {
      return _mapWithKey(m2, f);
    };
  };
  var insert = function(k) {
    return function(v) {
      return mutate(poke2(k)(v));
    };
  };
  var functorObject = {
    map: function(f) {
      return function(m2) {
        return _fmapObject(m2, f);
      };
    }
  };
  var functorWithIndexObject = {
    mapWithIndex: mapWithKey,
    Functor0: function() {
      return functorObject;
    }
  };
  var foldM = function(dictMonad) {
    var bind1 = bind(dictMonad.Bind1());
    var pure1 = pure(dictMonad.Applicative0());
    return function(f) {
      return function(z) {
        return _foldM(bind1)(f)(pure1(z));
      };
    };
  };
  var foldM1 = /* @__PURE__ */ foldM(monadST);
  var union = function(m2) {
    return mutate(function(s) {
      return foldM1(function(s$prime) {
        return function(k) {
          return function(v) {
            return poke2(k)(v)(s$prime);
          };
        };
      })(s)(m2);
    });
  };
  var fold2 = /* @__PURE__ */ _foldM(applyFlipped);
  var foldMap2 = function(dictMonoid) {
    var append1 = append(dictMonoid.Semigroup0());
    var mempty6 = mempty(dictMonoid);
    return function(f) {
      return fold2(function(acc) {
        return function(k) {
          return function(v) {
            return append1(acc)(f(k)(v));
          };
        };
      })(mempty6);
    };
  };
  var foldableObject = {
    foldl: function(f) {
      return fold2(function(z) {
        return function(v) {
          return f(z);
        };
      });
    },
    foldr: function(f) {
      return function(z) {
        return function(m2) {
          return foldr2(f)(z)(values(m2));
        };
      };
    },
    foldMap: function(dictMonoid) {
      var foldMap1 = foldMap2(dictMonoid);
      return function(f) {
        return foldMap1($$const(f));
      };
    }
  };
  var foldableWithIndexObject = {
    foldlWithIndex: function(f) {
      return fold2(flip(f));
    },
    foldrWithIndex: function(f) {
      return function(z) {
        return function(m2) {
          return foldr2(uncurry(f))(z)(toArrayWithKey(Tuple.create)(m2));
        };
      };
    },
    foldMapWithIndex: function(dictMonoid) {
      return foldMap2(dictMonoid);
    },
    Foldable0: function() {
      return foldableObject;
    }
  };
  var traversableWithIndexObject = {
    traverseWithIndex: function(dictApplicative) {
      var Apply0 = dictApplicative.Apply0();
      var apply2 = apply(Apply0);
      var map4 = map(Apply0.Functor0());
      var pure1 = pure(dictApplicative);
      return function(f) {
        return function(ms) {
          return fold2(function(acc) {
            return function(k) {
              return function(v) {
                return apply2(map4(flip(insert(k)))(acc))(f(k)(v));
              };
            };
          })(pure1(empty2))(ms);
        };
      };
    },
    FunctorWithIndex0: function() {
      return functorWithIndexObject;
    },
    FoldableWithIndex1: function() {
      return foldableWithIndexObject;
    },
    Traversable2: function() {
      return traversableObject;
    }
  };
  var traversableObject = {
    traverse: function(dictApplicative) {
      var $96 = traverseWithIndex(traversableWithIndexObject)(dictApplicative);
      return function($97) {
        return $96($$const($97));
      };
    },
    sequence: function(dictApplicative) {
      return traverse(traversableObject)(dictApplicative)(identity4);
    },
    Functor0: function() {
      return functorObject;
    },
    Foldable1: function() {
      return foldableObject;
    }
  };

  // output/Record.Unsafe.Union/foreign.js
  function unsafeUnionFn(r1, r2) {
    var copy = {};
    for (var k1 in r2) {
      if ({}.hasOwnProperty.call(r2, k1)) {
        copy[k1] = r2[k1];
      }
    }
    for (var k2 in r1) {
      if ({}.hasOwnProperty.call(r1, k2)) {
        copy[k2] = r1[k2];
      }
    }
    return copy;
  }

  // output/Record.Unsafe.Union/index.js
  var unsafeUnion = /* @__PURE__ */ runFn2(unsafeUnionFn);

  // output/Plum.View/index.js
  var append2 = /* @__PURE__ */ append(semigroupArray);
  var semigroupRecord3 = /* @__PURE__ */ semigroupRecord();
  var childrenIsSymbol = {
    reflectSymbol: function() {
      return "children";
    }
  };
  var downIsSymbol = {
    reflectSymbol: function() {
      return "down";
    }
  };
  var hoverIsSymbol = {
    reflectSymbol: function() {
      return "hover";
    }
  };
  var meatIsSymbol = {
    reflectSymbol: function() {
      return "meat";
    }
  };
  var nervesIsSymbol = {
    reflectSymbol: function() {
      return "nerves";
    }
  };
  var semigroupRecordCons2 = /* @__PURE__ */ semigroupRecordCons(childrenIsSymbol)()(/* @__PURE__ */ semigroupRecordCons(downIsSymbol)()(/* @__PURE__ */ semigroupRecordCons(hoverIsSymbol)()(/* @__PURE__ */ semigroupRecordCons(meatIsSymbol)()(/* @__PURE__ */ semigroupRecordCons(nervesIsSymbol)()(semigroupRecordNil)(semigroupArray))(semigroupArray))(semigroupArray))(semigroupArray));
  var show2 = /* @__PURE__ */ show(showInt);
  var mempty2 = /* @__PURE__ */ mempty(monoidArray);
  var monoidRecord2 = /* @__PURE__ */ monoidRecord();
  var monoidRecordCons2 = /* @__PURE__ */ monoidRecordCons(childrenIsSymbol);
  var monoidRecordCons1 = /* @__PURE__ */ monoidRecordCons(downIsSymbol)(monoidArray)()(/* @__PURE__ */ monoidRecordCons(hoverIsSymbol)(monoidArray)()(/* @__PURE__ */ monoidRecordCons(meatIsSymbol)(monoidArray)()(/* @__PURE__ */ monoidRecordCons(nervesIsSymbol)(monoidArray)()(monoidRecordNil))));
  var mempty1 = /* @__PURE__ */ mempty(/* @__PURE__ */ monoidRecord2(/* @__PURE__ */ monoidRecordCons2(monoidArray)()(monoidRecordCons1)));
  var foldMap3 = /* @__PURE__ */ foldMap2(monoidString);
  var show1 = /* @__PURE__ */ show(showNumber);
  var mempty22 = /* @__PURE__ */ mempty(monoidUnit);
  var intercalate3 = /* @__PURE__ */ intercalate2(monoidString);
  var map2 = /* @__PURE__ */ map(/* @__PURE__ */ functorWriterT(functorIdentity));
  var map1 = /* @__PURE__ */ map(functorArray);
  var Top = /* @__PURE__ */ function() {
    function Top2() {
    }
    ;
    Top2.value = new Top2();
    return Top2;
  }();
  var Right2 = /* @__PURE__ */ function() {
    function Right3() {
    }
    ;
    Right3.value = new Right3();
    return Right3;
  }();
  var Bottom = /* @__PURE__ */ function() {
    function Bottom2() {
    }
    ;
    Bottom2.value = new Bottom2();
    return Bottom2;
  }();
  var Left2 = /* @__PURE__ */ function() {
    function Left3() {
    }
    ;
    Left3.value = new Left3();
    return Left3;
  }();
  var Px = /* @__PURE__ */ function() {
    function Px2(value0) {
      this.value0 = value0;
    }
    ;
    Px2.create = function(value0) {
      return new Px2(value0);
    };
    return Px2;
  }();
  var Fill = /* @__PURE__ */ function() {
    function Fill2() {
    }
    ;
    Fill2.value = new Fill2();
    return Fill2;
  }();
  var Fit = /* @__PURE__ */ function() {
    function Fit2() {
    }
    ;
    Fit2.value = new Fit2();
    return Fit2;
  }();
  var Max2 = /* @__PURE__ */ function() {
    function Max3(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Max3.create = function(value0) {
      return function(value1) {
        return new Max3(value0, value1);
      };
    };
    return Max3;
  }();
  var Min2 = /* @__PURE__ */ function() {
    function Min3(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Min3.create = function(value0) {
      return function(value1) {
        return new Min3(value0, value1);
      };
    };
    return Min3;
  }();
  var X = /* @__PURE__ */ function() {
    function X2() {
    }
    ;
    X2.value = new X2();
    return X2;
  }();
  var Y = /* @__PURE__ */ function() {
    function Y2() {
    }
    ;
    Y2.value = new Y2();
    return Y2;
  }();
  var Grid = /* @__PURE__ */ function() {
    function Grid2() {
    }
    ;
    Grid2.value = new Grid2();
    return Grid2;
  }();
  var Flexbox = /* @__PURE__ */ function() {
    function Flexbox2(value0) {
      this.value0 = value0;
    }
    ;
    Flexbox2.create = function(value0) {
      return new Flexbox2(value0);
    };
    return Flexbox2;
  }();
  var Generic = /* @__PURE__ */ function() {
    function Generic2() {
    }
    ;
    Generic2.value = new Generic2();
    return Generic2;
  }();
  var Span = /* @__PURE__ */ function() {
    function Span2() {
    }
    ;
    Span2.value = new Span2();
    return Span2;
  }();
  var Start = /* @__PURE__ */ function() {
    function Start2() {
    }
    ;
    Start2.value = new Start2();
    return Start2;
  }();
  var Center = /* @__PURE__ */ function() {
    function Center2() {
    }
    ;
    Center2.value = new Center2();
    return Center2;
  }();
  var End = /* @__PURE__ */ function() {
    function End2() {
    }
    ;
    End2.value = new End2();
    return End2;
  }();
  var Spacing = /* @__PURE__ */ function() {
    function Spacing2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Spacing2.create = function(value0) {
      return function(value1) {
        return new Spacing2(value0, value1);
      };
    };
    return Spacing2;
  }();
  var Explain = /* @__PURE__ */ function() {
    function Explain2() {
    }
    ;
    Explain2.value = new Explain2();
    return Explain2;
  }();
  var Align = /* @__PURE__ */ function() {
    function Align2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Align2.create = function(value0) {
      return function(value1) {
        return new Align2(value0, value1);
      };
    };
    return Align2;
  }();
  var Width = /* @__PURE__ */ function() {
    function Width2(value0) {
      this.value0 = value0;
    }
    ;
    Width2.create = function(value0) {
      return new Width2(value0);
    };
    return Width2;
  }();
  var Height = /* @__PURE__ */ function() {
    function Height2(value0) {
      this.value0 = value0;
    }
    ;
    Height2.create = function(value0) {
      return new Height2(value0);
    };
    return Height2;
  }();
  var Wrapped = /* @__PURE__ */ function() {
    function Wrapped2() {
    }
    ;
    Wrapped2.value = new Wrapped2();
    return Wrapped2;
  }();
  var BackgroundColor = /* @__PURE__ */ function() {
    function BackgroundColor2(value0) {
      this.value0 = value0;
    }
    ;
    BackgroundColor2.create = function(value0) {
      return new BackgroundColor2(value0);
    };
    return BackgroundColor2;
  }();
  var Padding = /* @__PURE__ */ function() {
    function Padding2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Padding2.create = function(value0) {
      return function(value1) {
        return new Padding2(value0, value1);
      };
    };
    return Padding2;
  }();
  var Spread = /* @__PURE__ */ function() {
    function Spread2() {
    }
    ;
    Spread2.value = new Spread2();
    return Spread2;
  }();
  var Opacity = /* @__PURE__ */ function() {
    function Opacity2(value0) {
      this.value0 = value0;
    }
    ;
    Opacity2.create = function(value0) {
      return new Opacity2(value0);
    };
    return Opacity2;
  }();
  var Pointer = /* @__PURE__ */ function() {
    function Pointer2() {
    }
    ;
    Pointer2.value = new Pointer2();
    return Pointer2;
  }();
  var Move = /* @__PURE__ */ function() {
    function Move2(value0) {
      this.value0 = value0;
    }
    ;
    Move2.create = function(value0) {
      return new Move2(value0);
    };
    return Move2;
  }();
  var Clip = /* @__PURE__ */ function() {
    function Clip2(value0) {
      this.value0 = value0;
    }
    ;
    Clip2.create = function(value0) {
      return new Clip2(value0);
    };
    return Clip2;
  }();
  var UI = /* @__PURE__ */ function() {
    function UI2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    UI2.create = function(value0) {
      return function(value1) {
        return new UI2(value0, value1);
      };
    };
    return UI2;
  }();
  var Column = /* @__PURE__ */ function() {
    function Column2(value0) {
      this.value0 = value0;
    }
    ;
    Column2.create = function(value0) {
      return new Column2(value0);
    };
    return Column2;
  }();
  var Row = /* @__PURE__ */ function() {
    function Row2(value0) {
      this.value0 = value0;
    }
    ;
    Row2.create = function(value0) {
      return new Row2(value0);
    };
    return Row2;
  }();
  var Stack = /* @__PURE__ */ function() {
    function Stack2(value0) {
      this.value0 = value0;
    }
    ;
    Stack2.create = function(value0) {
      return new Stack2(value0);
    };
    return Stack2;
  }();
  var Wrapper = /* @__PURE__ */ function() {
    function Wrapper2(value0) {
      this.value0 = value0;
    }
    ;
    Wrapper2.create = function(value0) {
      return new Wrapper2(value0);
    };
    return Wrapper2;
  }();
  var Text = /* @__PURE__ */ function() {
    function Text2(value0) {
      this.value0 = value0;
    }
    ;
    Text2.create = function(value0) {
      return new Text2(value0);
    };
    return Text2;
  }();
  var Link = /* @__PURE__ */ function() {
    function Link2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    Link2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new Link2(value0, value1, value22);
        };
      };
    };
    return Link2;
  }();
  var Download = /* @__PURE__ */ function() {
    function Download2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    Download2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new Download2(value0, value1, value22);
        };
      };
    };
    return Download2;
  }();
  var Image2 = /* @__PURE__ */ function() {
    function Image3(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Image3.create = function(value0) {
      return function(value1) {
        return new Image3(value0, value1);
      };
    };
    return Image3;
  }();
  var None = /* @__PURE__ */ function() {
    function None3() {
    }
    ;
    None3.value = new None3();
    return None3;
  }();
  var semigroupSkinGrowth = {
    append: function(v) {
      return function(v1) {
        return union(v)(v1);
      };
    }
  };
  var bindWriterT2 = /* @__PURE__ */ bindWriterT(semigroupSkinGrowth)(bindIdentity);
  var discard2 = /* @__PURE__ */ discard(discardUnit)(bindWriterT2);
  var bind2 = /* @__PURE__ */ bind(bindWriterT2);
  var append22 = /* @__PURE__ */ append(/* @__PURE__ */ semigroupWriterT(applyIdentity)(semigroupSkinGrowth)(semigroupArray));
  var semigroupMutation = {
    append: function(v) {
      return function(v1) {
        return {
          extraSkin: append2(v.extraSkin)(v1.extraSkin)
        };
      };
    }
  };
  var semigroupGenericUI = function(dictSemigroup) {
    var append3 = append(semigroupRecord3(semigroupRecordCons2(dictSemigroup)));
    return function(dictSemigroup1) {
      var append4 = append(dictSemigroup1);
      return {
        append: function(v) {
          return function(v1) {
            return new UI(append3(v.value0)(v1.value0), append4(v.value1)(v1.value1));
          };
        }
      };
    };
  };
  var renderableSide = {
    render: function(v) {
      if (v instanceof Top) {
        return "top";
      }
      ;
      if (v instanceof Right2) {
        return "right";
      }
      ;
      if (v instanceof Bottom) {
        return "bottom";
      }
      ;
      if (v instanceof Left2) {
        return "left";
      }
      ;
      throw new Error("Failed pattern match at Plum.View (line 263, column 12 - line 267, column 19): " + [v.constructor.name]);
    },
    renderKey: function(v) {
      if (v instanceof Top) {
        return "top";
      }
      ;
      if (v instanceof Right2) {
        return "right";
      }
      ;
      if (v instanceof Bottom) {
        return "bottom";
      }
      ;
      if (v instanceof Left2) {
        return "left";
      }
      ;
      throw new Error("Failed pattern match at Plum.View (line 268, column 15 - line 272, column 19): " + [v.constructor.name]);
    }
  };
  var renderableColor = {
    render: function(v) {
      return "rgb(" + (show2(v.r) + ("," + (show2(v.g) + ("," + (show2(v.b) + ("," + (show2(v.a) + "%)")))))));
    },
    renderKey: function(v) {
      return show2(v.r) + ("-" + (show2(v.g) + ("-" + (show2(v.b) + ("-" + show2(v.a))))));
    }
  };
  var monoidSkinGrowth = {
    mempty: empty2,
    Semigroup0: function() {
      return semigroupSkinGrowth;
    }
  };
  var tell2 = /* @__PURE__ */ tell(/* @__PURE__ */ monadTellWriterT(monoidSkinGrowth)(monadIdentity));
  var applicativeWriterT2 = /* @__PURE__ */ applicativeWriterT(monoidSkinGrowth)(applicativeIdentity);
  var pure2 = /* @__PURE__ */ pure(applicativeWriterT2);
  var mempty3 = /* @__PURE__ */ mempty(/* @__PURE__ */ monoidWriterT(applicativeIdentity)(monoidSkinGrowth)(monoidArray));
  var traverse2 = /* @__PURE__ */ traverse(traversableArray)(applicativeWriterT2);
  var traverseWithIndex2 = /* @__PURE__ */ traverseWithIndex(traversableWithIndexObject)(applicativeWriterT2);
  var monoidMutation = {
    mempty: {
      extraSkin: mempty2
    },
    Semigroup0: function() {
      return semigroupMutation;
    }
  };
  var mempty4 = /* @__PURE__ */ mempty(monoidMutation);
  var monoidGenericUI = function(dictMonoid) {
    var mempty52 = mempty(monoidRecord2(monoidRecordCons2(dictMonoid)()(monoidRecordCons1)));
    var semigroupGenericUI1 = semigroupGenericUI(dictMonoid.Semigroup0());
    return function(dictMonoid1) {
      var semigroupGenericUI2 = semigroupGenericUI1(dictMonoid1.Semigroup0());
      return {
        mempty: new UI(mempty52, mempty(dictMonoid1)),
        Semigroup0: function() {
          return semigroupGenericUI2;
        }
      };
    };
  };
  var functorGenericUI = {
    map: function(f) {
      return function(v) {
        return new UI(v.value0, f(v.value1));
      };
    }
  };
  var applyGenericUI = function(dictMonoid) {
    var append3 = append(semigroupRecord3(semigroupRecordCons2(dictMonoid.Semigroup0())));
    return {
      apply: function(v) {
        return function(v1) {
          return new UI(append3(v.value0)(v1.value0), v.value1(v1.value1));
        };
      },
      Functor0: function() {
        return functorGenericUI;
      }
    };
  };
  var bindGenericUI = function(dictMonoid) {
    var append3 = append(semigroupRecord3(semigroupRecordCons2(dictMonoid.Semigroup0())));
    var applyGenericUI1 = applyGenericUI(dictMonoid);
    return {
      bind: function(v) {
        return function(f) {
          var v1 = f(v.value1);
          return new UI(append3(v.value0)(v1.value0), v1.value1);
        };
      },
      Apply0: function() {
        return applyGenericUI1;
      }
    };
  };
  var text = function(s) {
    return function(v) {
      return new UI({
        nerves: mempty1.nerves,
        meat: mempty1.meat,
        hover: mempty1.hover,
        down: mempty1.down,
        children: [new Tuple({
          meat: v.value0.meat,
          nerves: v.value0.nerves,
          hover: v.value0.hover,
          down: v.value0.down
        }, new Text(s))]
      }, v.value1);
    };
  };
  var styleSkinGrowth = function(v) {
    return foldMap3(function(className) {
      return function(v1) {
        return "." + (className + ("{" + (v1.key + (":" + (v1.value + ";}")))));
      };
    })(v);
  };
  var sk = function(cName) {
    return function(key) {
      return function(value12) {
        return discard2(tell2(singleton2(cName)({
          key,
          value: value12
        })))(function() {
          return pure2([cName]);
        });
      };
    };
  };
  var rgb = function(r) {
    return function(g) {
      return function(b) {
        return {
          r: round2(r * 255),
          g: round2(g * 255),
          b: round2(b * 255),
          a: 100
        };
      };
    };
  };
  var renderKey = function(dict) {
    return dict.renderKey;
  };
  var renderKey1 = /* @__PURE__ */ renderKey(renderableColor);
  var renderKey2 = /* @__PURE__ */ renderKey(renderableSide);
  var render = function(dict) {
    return dict.render;
  };
  var render1 = /* @__PURE__ */ render(renderableColor);
  var render2 = /* @__PURE__ */ render(renderableSide);
  var renderableLength = {
    render: function(v) {
      if (v instanceof Px) {
        return show2(v.value0) + "px";
      }
      ;
      if (v instanceof Fit) {
        return "fit-content";
      }
      ;
      if (v instanceof Fill) {
        return "100%";
      }
      ;
      if (v instanceof Max2) {
        return "max(" + (show2(v.value0) + ("px," + (render(renderableLength)(v.value1) + ")")));
      }
      ;
      if (v instanceof Min2) {
        return "min(" + (show2(v.value0) + ("px," + (render(renderableLength)(v.value1) + ")")));
      }
      ;
      throw new Error("Failed pattern match at Plum.View (line 362, column 12 - line 367, column 62): " + [v.constructor.name]);
    },
    renderKey: function(v) {
      if (v instanceof Px) {
        return show2(v.value0);
      }
      ;
      if (v instanceof Fit) {
        return "fit-content";
      }
      ;
      if (v instanceof Fill) {
        return "fill";
      }
      ;
      if (v instanceof Max2) {
        return "max-" + (show2(v.value0) + ("-" + renderKey(renderableLength)(v.value1)));
      }
      ;
      if (v instanceof Min2) {
        return "min-" + (show2(v.value0) + ("-" + renderKey(renderableLength)(v.value1)));
      }
      ;
      throw new Error("Failed pattern match at Plum.View (line 368, column 15 - line 373, column 56): " + [v.constructor.name]);
    }
  };
  var renderKey3 = /* @__PURE__ */ renderKey(renderableLength);
  var render3 = /* @__PURE__ */ render(renderableLength);
  var skin = function(ctx) {
    return function(v) {
      if (v instanceof Spacing) {
        return sk("spacing-" + (show2(v.value0) + ("-" + show2(v.value1))))("gap")(show2(v.value0) + ("px " + (show2(v.value1) + "px")));
      }
      ;
      if (v instanceof Explain) {
        return sk("explain")("border")("dashed magenta");
      }
      ;
      if (v instanceof Align) {
        if (ctx instanceof Generic) {
          return mempty3;
        }
        ;
        if (ctx instanceof Span) {
          return mempty3;
        }
        ;
        if (ctx instanceof Grid) {
          var v1 = function() {
            if (v.value1 instanceof Start) {
              return "start";
            }
            ;
            if (v.value1 instanceof Center) {
              return "center";
            }
            ;
            if (v.value1 instanceof End) {
              return "end";
            }
            ;
            throw new Error("Failed pattern match at Plum.View (line 311, column 13 - line 314, column 27): " + [v.value1.constructor.name]);
          }();
          var k = function() {
            if (v.value0 instanceof X) {
              return "justify-items";
            }
            ;
            if (v.value0 instanceof Y) {
              return "align-items";
            }
            ;
            throw new Error("Failed pattern match at Plum.View (line 306, column 13 - line 308, column 33): " + [v.value0.constructor.name]);
          }();
          return sk("align-grid-" + (k + ("-" + v1)))(k)(v1);
        }
        ;
        if (ctx instanceof Flexbox) {
          var v1 = function() {
            if (v.value1 instanceof Start) {
              return "flex-start";
            }
            ;
            if (v.value1 instanceof Center) {
              return "center";
            }
            ;
            if (v.value1 instanceof End) {
              return "flex-end";
            }
            ;
            throw new Error("Failed pattern match at Plum.View (line 330, column 13 - line 333, column 32): " + [v.value1.constructor.name]);
          }();
          var k = function() {
            var v2 = new Tuple(ctx.value0, v.value0);
            if (v2.value0 instanceof X && v2.value1 instanceof X) {
              return "justify-content";
            }
            ;
            if (v2.value0 instanceof X && v2.value1 instanceof Y) {
              return "align-items";
            }
            ;
            if (v2.value0 instanceof Y && v2.value1 instanceof X) {
              return "align-items";
            }
            ;
            if (v2.value0 instanceof Y && v2.value1 instanceof Y) {
              return "justify-content";
            }
            ;
            throw new Error("Failed pattern match at Plum.View (line 322, column 13 - line 326, column 42): " + [v2.constructor.name]);
          }();
          return sk("align-flexbox-" + (k + ("-" + v1)))(k)(v1);
        }
        ;
        throw new Error("Failed pattern match at Plum.View (line 300, column 26 - line 336, column 51): " + [ctx.constructor.name]);
      }
      ;
      if (v instanceof Width) {
        return sk("width-" + renderKey3(v.value0))("width")(render3(v.value0));
      }
      ;
      if (v instanceof Height) {
        return sk("height-" + renderKey3(v.value0))("height")(render3(v.value0));
      }
      ;
      if (v instanceof Wrapped) {
        if (ctx instanceof Flexbox) {
          return sk("wrapped")("flex-wrap")("wrap");
        }
        ;
        return pure2([]);
      }
      ;
      if (v instanceof BackgroundColor) {
        return sk("bg-color-" + renderKey1(v.value0))("background-color")(render1(v.value0));
      }
      ;
      if (v instanceof Padding) {
        return sk("padding-" + (renderKey2(v.value0) + ("-" + show2(v.value1))))("padding-" + render2(v.value0))(show2(v.value1) + "px");
      }
      ;
      if (v instanceof Spread) {
        if (ctx instanceof Flexbox) {
          return sk("spread")("justify-content")("space-between");
        }
        ;
        return pure2([]);
      }
      ;
      if (v instanceof Opacity) {
        return sk("opacity-" + show1(v.value0))("opacity")(show1(v.value0));
      }
      ;
      if (v instanceof Pointer) {
        return sk("pointer")("cursor")("pointer");
      }
      ;
      if (v instanceof Move) {
        return sk("move-" + (show2(v.value0.x) + ("-" + show2(v.value0.y))))("transform")("translate(" + (show2(v.value0.x) + ("px, " + (show2(v.value0.y) + "px)"))));
      }
      ;
      if (v instanceof Clip && v.value0 instanceof X) {
        return sk("clip-x")("overflow-x")("hidden");
      }
      ;
      if (v instanceof Clip && v.value0 instanceof Y) {
        return sk("clip-y")("overflow-y")("hidden");
      }
      ;
      throw new Error("Failed pattern match at Plum.View (line 297, column 12 - line 355, column 46): " + [v.constructor.name]);
    };
  };
  var onMouseDown = function(dictMonoid) {
    var mempty52 = mempty(monoidRecord2(monoidRecordCons2(dictMonoid)()(monoidRecordCons1)));
    return function(v) {
      return new UI({
        nerves: mempty52.nerves,
        meat: mempty52.meat,
        hover: mempty52.hover,
        children: mempty52.children,
        down: v.value0.meat
      }, v.value1);
    };
  };
  var onHover = function(dictMonoid) {
    var mempty52 = mempty(monoidRecord2(monoidRecordCons2(dictMonoid)()(monoidRecordCons1)));
    return function(v) {
      return new UI({
        nerves: mempty52.nerves,
        meat: mempty52.meat,
        down: mempty52.down,
        children: mempty52.children,
        hover: v.value0.meat
      }, v.value1);
    };
  };
  var m = function(dictMonoid) {
    var mempty52 = mempty(monoidRecord2(monoidRecordCons2(dictMonoid)()(monoidRecordCons1)));
    return function(meat) {
      return new UI({
        nerves: mempty52.nerves,
        hover: mempty52.hover,
        down: mempty52.down,
        children: mempty52.children,
        meat: [meat]
      }, mempty22);
    };
  };
  var hWith = function(elem2) {
    return function(props) {
      return function(classes) {
        return function(children) {
          return h2(elem2)(unsafeUnion(props)({
            "class": intercalate3(" ")(classes)
          }))(children);
        };
      };
    };
  };
  var h3 = function(elem2) {
    return function(classes) {
      return function(children) {
        return h2(elem2)({
          "class": intercalate3(" ")(classes)
        })(children);
      };
    };
  };
  var growSkin = function(fire) {
    return function(v) {
      return function(v1) {
        var widthFill = [new Width(Fill.value), new Height(Fill.value)];
        var alignCenter = [new Align(X.value, Center.value), new Align(Y.value, Center.value)];
        var skn = function(ctx) {
          return bind2(map2(function($482) {
            return function(v2) {
              return append2(v2)(v.extraSkin);
            }(concat($482));
          })(traverse2(skin(ctx))(append2(v1.value0.meat)(append2(function() {
            if (ctx instanceof Span) {
              return mempty2;
            }
            ;
            if (ctx instanceof Grid) {
              return widthFill;
            }
            ;
            if (ctx instanceof Flexbox) {
              return widthFill;
            }
            ;
            if (ctx instanceof Generic) {
              return widthFill;
            }
            ;
            throw new Error("Failed pattern match at Plum.View (line 435, column 16 - line 439, column 35): " + [ctx.constructor.name]);
          }())(function() {
            if (ctx instanceof Grid) {
              return alignCenter;
            }
            ;
            if (ctx instanceof Flexbox) {
              return alignCenter;
            }
            ;
            if (ctx instanceof Span) {
              return mempty2;
            }
            ;
            if (ctx instanceof Generic) {
              return alignCenter;
            }
            ;
            throw new Error("Failed pattern match at Plum.View (line 440, column 16 - line 444, column 37): " + [ctx.constructor.name]);
          }())))))(function(meatClasses) {
            var v2 = runWriter(traverse2(skin(ctx))(v1.value0.hover));
            return bind2(traverseWithIndex2(function(key) {
              return function(val) {
                return tell2(singleton2(key + "-hover:hover")(val));
              };
            })(v2.value1))(function() {
              var v3 = runWriter(traverse2(skin(ctx))(v1.value0.down));
              return bind2(traverseWithIndex2(function(key) {
                return function(val) {
                  return tell2(singleton2(key + "-down:active")(val));
                };
              })(v3.value1))(function() {
                return pure2(append2(meatClasses)(append2(map1(function(v4) {
                  return v4 + "-hover";
                })(concat(v2.value0)))(map1(function(v4) {
                  return v4 + "-down";
                })(concat(v3.value0)))));
              });
            });
          });
        };
        if (v1.value1 instanceof Text) {
          return map2(function(c) {
            return h3("span")(c)([string(v1.value1.value0)]);
          })(skn(Span.value));
        }
        ;
        if (v1.value1 instanceof Wrapper) {
          return bind2(append22(skn(new Flexbox(X.value)))(append22(sk("display-flex")("display")("flex"))(sk("flex-direction-row")("flex-direction")("row"))))(function(classes) {
            return bind2(growSkin(fire)(mempty4)(v1.value1.value0))(function(x$prime) {
              return pure2(h3("div")(classes)([x$prime]));
            });
          });
        }
        ;
        if (v1.value1 instanceof Stack) {
          return bind2(append22(skn(Grid.value))(sk("display-grid")("display")("grid")))(function(classes) {
            return bind2(append22(sk("grid-row-1")("grid-row")("1"))(sk("grid-column-1")("grid-column")("1")))(function(extraSkin) {
              return bind2(traverse2(growSkin(fire)({
                extraSkin
              }))(v1.value1.value0))(function(children$prime) {
                return pure2(h3("div")(classes)(children$prime));
              });
            });
          });
        }
        ;
        if (v1.value1 instanceof Row) {
          return bind2(append22(skn(new Flexbox(X.value)))(append22(sk("display-flex")("display")("flex"))(sk("flex-direction-row")("flex-direction")("row"))))(function(classes) {
            return bind2(traverse2(growSkin(fire)(mempty4))(v1.value1.value0))(function(children$prime) {
              return pure2(h3("div")(classes)(children$prime));
            });
          });
        }
        ;
        if (v1.value1 instanceof Column) {
          return bind2(append22(skn(new Flexbox(Y.value)))(append22(sk("display-flex")("display")("flex"))(sk("flex-direction-column")("flex-direction")("column"))))(function(classes) {
            return bind2(traverse2(growSkin(fire)(mempty4))(v1.value1.value0))(function(children$prime) {
              return pure2(h3("div")(classes)(children$prime));
            });
          });
        }
        ;
        if (v1.value1 instanceof Link) {
          return bind2(append22(skn(new Flexbox(X.value)))(append22(sk("display-flex")("display")("flex"))(sk("flex-direction-row")("flex-direction")("row"))))(function(classes) {
            return bind2(growSkin(fire)(mempty4)(v1.value1.value2))(function(child$prime) {
              return pure2(hWith("a")({
                href: v1.value1.value0,
                rel: "noopener noreferrer",
                target: function() {
                  if (v1.value1.value1.newTab) {
                    return "_blank";
                  }
                  ;
                  return "_self";
                }()
              })(classes)([child$prime]));
            });
          });
        }
        ;
        if (v1.value1 instanceof Download) {
          return bind2(append22(skn(new Flexbox(X.value)))(append22(sk("display-flex")("display")("flex"))(sk("flex-direction-row")("flex-direction")("row"))))(function(classes) {
            return bind2(growSkin(fire)(mempty4)(v1.value1.value2))(function(child$prime) {
              return pure2(hWith("a")({
                href: v1.value1.value0,
                download: fromMaybe("")(v1.value1.value1.filename)
              })(classes)([child$prime]));
            });
          });
        }
        ;
        if (v1.value1 instanceof Image2) {
          return map2(function(c) {
            return hWith("img")({
              src: v1.value1.value0,
              alt: v1.value1.value1.description
            })(c)([]);
          })(skn(Generic.value));
        }
        ;
        if (v1.value1 instanceof None) {
          return pure2(h3("div")(mempty2)([]));
        }
        ;
        throw new Error("Failed pattern match at Plum.View (line 453, column 3 - line 494, column 37): " + [v1.value1.constructor.name]);
      };
    };
  };
  var grow = function(fire) {
    return function(v) {
      var v1 = runWriter(growSkin(fire)(mempty4)(v));
      return {
        node: v1.value0,
        style: styleSkinGrowth(v1.value1)
      };
    };
  };
  var column = function(v) {
    return new UI({
      nerves: mempty1.nerves,
      meat: mempty1.meat,
      hover: mempty1.hover,
      down: mempty1.down,
      children: [new Tuple({
        meat: v.value0.meat,
        nerves: v.value0.nerves,
        hover: v.value0.hover,
        down: v.value0.down
      }, new Column(v.value0.children))]
    }, v.value1);
  };
  var bgColor = function(dictMonoid) {
    var m1 = m(dictMonoid);
    return function(c) {
      return m1(new BackgroundColor(c));
    };
  };

  // output/Web.DOM.NonElementParentNode/foreign.js
  function _getElementById(id) {
    return function(node) {
      return function() {
        return node.getElementById(id);
      };
    };
  }

  // output/Data.Nullable/foreign.js
  function nullable(a, r, f) {
    return a == null ? r : f(a);
  }

  // output/Data.Nullable/index.js
  var toMaybe = function(n) {
    return nullable(n, Nothing.value, Just.create);
  };

  // output/Web.DOM.NonElementParentNode/index.js
  var map3 = /* @__PURE__ */ map(functorEffect);
  var getElementById = function(eid) {
    var $2 = map3(toMaybe);
    var $3 = _getElementById(eid);
    return function($4) {
      return $2($3($4));
    };
  };

  // output/Web.HTML/foreign.js
  var windowImpl = function() {
    return window;
  };

  // output/Web.HTML.HTMLDocument/index.js
  var toNonElementParentNode = unsafeCoerce2;

  // output/Web.HTML.Window/foreign.js
  function document2(window2) {
    return function() {
      return window2.document;
    };
  }

  // output/Plum/index.js
  var bind3 = /* @__PURE__ */ bind(bindEffect);
  var outerStyle = "html,body{height:100%;padding:0;margin:0;}";
  var run3 = function(id) {
    return function(plum2) {
      return function __do() {
        var modelRef = bind3(plum2.init)($$new)();
        var v = bind3(bind3(windowImpl)(document2))(function() {
          var $21 = getElementById(id);
          return function($22) {
            return $21(toNonElementParentNode($22));
          };
        }())();
        if (v instanceof Just) {
          var projector = createProjector();
          return replace(projector)(v.value0)(function __do2() {
            var model = read(modelRef)();
            var v1 = plum2.view(model);
            var v2 = head(v1.value0.children);
            if (v2 instanceof Nothing) {
              return h2("div")({})([]);
            }
            ;
            if (v2 instanceof Just) {
              var v3 = grow(function(msg) {
                return function __do3() {
                  var m2 = read(modelRef)();
                  var m_ = plum2.update(msg)(m2)();
                  write(m_)(modelRef)();
                  return scheduleRender(projector)();
                };
              })(v2.value0);
              return h2("div")({
                styles: {
                  height: "100%",
                  width: "100%"
                }
              })([h2("style")({})([string(outerStyle + v3.style)]), v3.node]);
            }
            ;
            throw new Error("Failed pattern match at Plum (line 35, column 20 - line 52, column 94): " + [v2.constructor.name]);
          })();
        }
        ;
        if (v instanceof Nothing) {
          return unit;
        }
        ;
        throw new Error("Failed pattern match at Plum (line 26, column 92 - line 54, column 25): " + [v.constructor.name]);
      };
    };
  };

  // output/Main/index.js
  var pure3 = /* @__PURE__ */ pure(applicativeEffect);
  var discard3 = /* @__PURE__ */ discard(discardUnit);
  var discard1 = /* @__PURE__ */ discard3(/* @__PURE__ */ bindGenericUI(monoidArray));
  var discard22 = /* @__PURE__ */ discard3(/* @__PURE__ */ bindGenericUI(monoidUnit));
  var onHover2 = /* @__PURE__ */ onHover(monoidUnit);
  var bgColor2 = /* @__PURE__ */ bgColor(monoidUnit);
  var onMouseDown2 = /* @__PURE__ */ onMouseDown(monoidUnit);
  var mempty5 = /* @__PURE__ */ mempty(/* @__PURE__ */ monoidGenericUI(monoidUnit)(monoidUnit));
  var plum = {
    init: /* @__PURE__ */ pure3({
      text: "Test"
    }),
    view: function(model) {
      return column(discard1(text("hi")(discard22(onHover2(bgColor2(rgb(1)(0)(0))))(function() {
        return onMouseDown2(bgColor2(rgb(0)(1)(0)));
      })))(function() {
        return text("hello")(mempty5);
      }));
    },
    update: function(msg) {
      return function(model) {
        return pure3({
          text: "Button pressed"
        });
      };
    }
  };
  var main = /* @__PURE__ */ run3("plum")(plum);

  // <stdin>
  main();
})();
