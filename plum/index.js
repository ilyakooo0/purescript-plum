(() => {
  // output/Control.Semigroupoid/index.js
  var semigroupoidFn = {
    compose: function(f) {
      return function(g2) {
        return function(x2) {
          return f(g2(x2));
        };
      };
    }
  };

  // output/Control.Category/index.js
  var identity = function(dict) {
    return dict.identity;
  };
  var categoryFn = {
    identity: function(x2) {
      return x2;
    },
    Semigroupoid0: function() {
      return semigroupoidFn;
    }
  };

  // output/Data.Boolean/index.js
  var otherwise = true;

  // output/Data.Function/index.js
  var flip = function(f) {
    return function(b2) {
      return function(a2) {
        return f(a2)(b2);
      };
    };
  };
  var $$const = function(a2) {
    return function(v2) {
      return a2;
    };
  };
  var applyFlipped = function(x2) {
    return function(f) {
      return f(x2);
    };
  };

  // output/Data.Functor/foreign.js
  var arrayMap = function(f) {
    return function(arr) {
      var l2 = arr.length;
      var result = new Array(l2);
      for (var i2 = 0; i2 < l2; i2++) {
        result[i2] = f(arr[i2]);
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
  var mapFlipped = function(dictFunctor) {
    var map12 = map(dictFunctor);
    return function(fa) {
      return function(f) {
        return map12(f)(fa);
      };
    };
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
      return function(a2) {
        return function(b2) {
          return apply1(map4(f)(a2))(b2);
        };
      };
    };
  };

  // output/Control.Applicative/index.js
  var pure = function(dict) {
    return dict.pure;
  };
  var liftA1 = function(dictApplicative) {
    var apply3 = apply(dictApplicative.Apply0());
    var pure12 = pure(dictApplicative);
    return function(f) {
      return function(a2) {
        return apply3(pure12(f))(a2);
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
      var l2 = arr.length;
      for (var i2 = 0; i2 < l2; i2++) {
        var xs = f(arr[i2]);
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
    append: function(v2) {
      return function(v1) {
        return unit;
      };
    }
  };
  var semigroupString = {
    append: concatString
  };
  var semigroupRecordNil = {
    appendRecord: function(v2) {
      return function(v1) {
        return function(v22) {
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
            appendRecord: function(v2) {
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
    memptyRecord: function(v2) {
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
            memptyRecord: function(v2) {
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
  var pureE = function(a2) {
    return function() {
      return a2;
    };
  };
  var bindE = function(a2) {
    return function(f) {
      return function() {
        return f(a2())();
      };
    };
  };

  // output/Control.Monad/index.js
  var ap = function(dictMonad) {
    var bind4 = bind(dictMonad.Bind1());
    var pure5 = pure(dictMonad.Applicative0());
    return function(f) {
      return function(a2) {
        return bind4(f)(function(f$prime) {
          return bind4(a2)(function(a$prime) {
            return pure5(f$prime(a$prime));
          });
        });
      };
    };
  };

  // output/Effect/index.js
  var $runtime_lazy = function(name15, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2) return val;
      if (state3 === 1) throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
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
    var n2 = 0;
    for (var i2 = 0; i2 < count; i2++) {
      result[n2++] = value12;
    }
    return result;
  };
  var replicateImpl = typeof Array.prototype.fill === "function" ? replicateFill : replicatePolyfill;
  var unconsImpl = function(empty3, next, xs) {
    return xs.length === 0 ? empty3({}) : next(xs[0])(xs.slice(1));
  };
  var concat = function(xss) {
    if (xss.length <= 1e4) {
      return Array.prototype.concat.apply([], xss);
    }
    var result = [];
    for (var i2 = 0, l2 = xss.length; i2 < l2; i2++) {
      var xs = xss[i2];
      for (var j = 0, m3 = xs.length; j < m3; j++) {
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
        return function(x2) {
          return function(y) {
            return x2 < y ? lt : x2 === y ? eq2 : gt;
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
  var showIntImpl = function(n2) {
    return n2.toString();
  };
  var showNumberImpl = function(n2) {
    var str = n2.toString();
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
  var maybe = function(v2) {
    return function(v1) {
      return function(v22) {
        if (v22 instanceof Nothing) {
          return v2;
        }
        ;
        if (v22 instanceof Just) {
          return v1(v22.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 237, column 1 - line 237, column 51): " + [v2.constructor.name, v1.constructor.name, v22.constructor.name]);
      };
    };
  };
  var fromMaybe = function(a2) {
    return maybe(a2)(identity2);
  };

  // output/Data.Identity/index.js
  var Identity = function(x2) {
    return x2;
  };
  var functorIdentity = {
    map: function(f) {
      return function(m3) {
        return f(m3);
      };
    }
  };
  var applyIdentity = {
    apply: function(v2) {
      return function(v1) {
        return v2(v1);
      };
    },
    Functor0: function() {
      return functorIdentity;
    }
  };
  var bindIdentity = {
    bind: function(v2) {
      return function(f) {
        return f(v2);
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
    return function(a2) {
      return function() {
        return f(a2());
      };
    };
  };
  var pure_ = function(a2) {
    return function() {
      return a2;
    };
  };
  var bind_ = function(a2) {
    return function(f) {
      return function() {
        return f(a2())();
      };
    };
  };

  // output/Control.Monad.ST.Internal/index.js
  var $runtime_lazy2 = function(name15, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2) return val;
      if (state3 === 1) throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
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
    return function(init3) {
      return function(xs) {
        var acc = init3;
        var len = xs.length;
        for (var i2 = len - 1; i2 >= 0; i2--) {
          acc = f(xs[i2])(acc);
        }
        return acc;
      };
    };
  };
  var foldlArray = function(f) {
    return function(init3) {
      return function(xs) {
        var acc = init3;
        var len = xs.length;
        for (var i2 = 0; i2 < len; i2++) {
          acc = f(acc)(xs[i2]);
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
    return function(v2) {
      return f(v2.value0)(v2.value1);
    };
  };

  // output/Unsafe.Coerce/foreign.js
  var unsafeCoerce2 = function(x2) {
    return x2;
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
          var go2 = function(v2) {
            return function(v1) {
              if (v2.init) {
                return {
                  init: false,
                  acc: v1
                };
              }
              ;
              return {
                init: false,
                acc: append3(v2.acc)(append3(sep)(v1))
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
        return foldr22(function(x2) {
          return function(acc) {
            return append3(f(x2))(acc);
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
  var runFn3 = function(fn) {
    return function(a2) {
      return function(b2) {
        return function(c) {
          return fn(a2, b2, c);
        };
      };
    };
  };
  var runFn4 = function(fn) {
    return function(a2) {
      return function(b2) {
        return function(c) {
          return function(d) {
            return fn(a2, b2, c, d);
          };
        };
      };
    };
  };

  // output/Data.Traversable/foreign.js
  var traverseArrayImpl = /* @__PURE__ */ function() {
    function array1(a2) {
      return [a2];
    }
    function array2(a2) {
      return function(b2) {
        return [a2, b2];
      };
    }
    function array3(a2) {
      return function(b2) {
        return function(c) {
          return [a2, b2, c];
        };
      };
    }
    function concat2(xs) {
      return function(ys) {
        return xs.concat(ys);
      };
    }
    return function(apply3) {
      return function(map4) {
        return function(pure5) {
          return function(f) {
            return function(array) {
              function go2(bot, top3) {
                switch (top3 - bot) {
                  case 0:
                    return pure5([]);
                  case 1:
                    return map4(array1)(f(array[bot]));
                  case 2:
                    return apply3(map4(array2)(f(array[bot])))(f(array[bot + 1]));
                  case 3:
                    return apply3(apply3(map4(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                  default:
                    var pivot = bot + Math.floor((top3 - bot) / 4) * 2;
                    return apply3(map4(concat2)(go2(bot, pivot)))(go2(pivot, top3));
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
  var uncons = /* @__PURE__ */ function() {
    return runFn3(unconsImpl)($$const(Nothing.value))(function(x2) {
      return function(xs) {
        return new Just({
          head: x2,
          tail: xs
        });
      };
    });
  }();
  var intercalate2 = function(dictMonoid) {
    return intercalate1(dictMonoid);
  };

  // output/Foreign.Object/foreign.js
  function _copyST(m3) {
    return function() {
      var r2 = {};
      for (var k in m3) {
        if (hasOwnProperty.call(m3, k)) {
          r2[k] = m3[k];
        }
      }
      return r2;
    };
  }
  var empty2 = {};
  function runST(f) {
    return f();
  }
  function _fmapObject(m0, f) {
    var m3 = {};
    for (var k in m0) {
      if (hasOwnProperty.call(m0, k)) {
        m3[k] = f(m0[k]);
      }
    }
    return m3;
  }
  function _mapWithKey(m0, f) {
    var m3 = {};
    for (var k in m0) {
      if (hasOwnProperty.call(m0, k)) {
        m3[k] = f(k)(m0[k]);
      }
    }
    return m3;
  }
  function _foldM(bind4) {
    return function(f) {
      return function(mz) {
        return function(m3) {
          var acc = mz;
          function g2(k2) {
            return function(z) {
              return f(z)(k2)(m3[k2]);
            };
          }
          for (var k in m3) {
            if (hasOwnProperty.call(m3, k)) {
              acc = bind4(acc)(g2(k));
            }
          }
          return acc;
        };
      };
    };
  }
  function _lookup(no, yes, k, m3) {
    return k in m3 ? yes(m3[k]) : no;
  }
  function toArrayWithKey(f) {
    return function(m3) {
      var r2 = [];
      for (var k in m3) {
        if (hasOwnProperty.call(m3, k)) {
          r2.push(f(k)(m3[k]));
        }
      }
      return r2;
    };
  }
  var keys = Object.keys || toArrayWithKey(function(k) {
    return function() {
      return k;
    };
  });

  // output/Data.TraversableWithIndex/index.js
  var traverseWithIndex = function(dict) {
    return dict.traverseWithIndex;
  };

  // output/Foreign.Object.ST/foreign.js
  var newImpl = function() {
    return {};
  };
  function poke2(k) {
    return function(v2) {
      return function(m3) {
        return function() {
          m3[k] = v2;
          return m3;
        };
      };
    };
  }

  // output/Foreign.Object/index.js
  var bindFlipped2 = /* @__PURE__ */ bindFlipped(bindST);
  var foldr2 = /* @__PURE__ */ foldr(foldableArray);
  var identity4 = /* @__PURE__ */ identity(categoryFn);
  var values = /* @__PURE__ */ toArrayWithKey(function(v2) {
    return function(v1) {
      return v1;
    };
  });
  var thawST = _copyST;
  var singleton2 = function(k) {
    return function(v2) {
      return runST(bindFlipped2(poke2(k)(v2))(newImpl));
    };
  };
  var mutate = function(f) {
    return function(m3) {
      return runST(function __do() {
        var s2 = thawST(m3)();
        f(s2)();
        return s2;
      });
    };
  };
  var mapWithKey = function(f) {
    return function(m3) {
      return _mapWithKey(m3, f);
    };
  };
  var insert = function(k) {
    return function(v2) {
      return mutate(poke2(k)(v2));
    };
  };
  var functorObject = {
    map: function(f) {
      return function(m3) {
        return _fmapObject(m3, f);
      };
    }
  };
  var functorWithIndexObject = {
    mapWithIndex: mapWithKey,
    Functor0: function() {
      return functorObject;
    }
  };
  var fromHomogeneous = function() {
    return unsafeCoerce2;
  };
  var foldM = function(dictMonad) {
    var bind1 = bind(dictMonad.Bind1());
    var pure12 = pure(dictMonad.Applicative0());
    return function(f) {
      return function(z) {
        return _foldM(bind1)(f)(pure12(z));
      };
    };
  };
  var foldM1 = /* @__PURE__ */ foldM(monadST);
  var union = function(m3) {
    return mutate(function(s2) {
      return foldM1(function(s$prime) {
        return function(k) {
          return function(v2) {
            return poke2(k)(v2)(s$prime);
          };
        };
      })(s2)(m3);
    });
  };
  var unionWith = function(f) {
    return function(m1) {
      return function(m22) {
        return mutate(function(s1) {
          return foldM1(function(s2) {
            return function(k) {
              return function(v1) {
                return poke2(k)(_lookup(v1, function(v2) {
                  return f(v1)(v2);
                }, k, m22))(s2);
              };
            };
          })(s1)(m1);
        })(m22);
      };
    };
  };
  var semigroupObject = function(dictSemigroup) {
    return {
      append: unionWith(append(dictSemigroup))
    };
  };
  var monoidObject = function(dictSemigroup) {
    var semigroupObject1 = semigroupObject(dictSemigroup);
    return {
      mempty: empty2,
      Semigroup0: function() {
        return semigroupObject1;
      }
    };
  };
  var fold2 = /* @__PURE__ */ _foldM(applyFlipped);
  var foldMap2 = function(dictMonoid) {
    var append1 = append(dictMonoid.Semigroup0());
    var mempty6 = mempty(dictMonoid);
    return function(f) {
      return fold2(function(acc) {
        return function(k) {
          return function(v2) {
            return append1(acc)(f(k)(v2));
          };
        };
      })(mempty6);
    };
  };
  var foldableObject = {
    foldl: function(f) {
      return fold2(function(z) {
        return function(v2) {
          return f(z);
        };
      });
    },
    foldr: function(f) {
      return function(z) {
        return function(m3) {
          return foldr2(f)(z)(values(m3));
        };
      };
    },
    foldMap: function(dictMonoid) {
      var foldMap12 = foldMap2(dictMonoid);
      return function(f) {
        return foldMap12($$const(f));
      };
    }
  };
  var foldableWithIndexObject = {
    foldlWithIndex: function(f) {
      return fold2(flip(f));
    },
    foldrWithIndex: function(f) {
      return function(z) {
        return function(m3) {
          return foldr2(uncurry(f))(z)(toArrayWithKey(Tuple.create)(m3));
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
      var apply3 = apply(Apply0);
      var map4 = map(Apply0.Functor0());
      var pure12 = pure(dictApplicative);
      return function(f) {
        return function(ms) {
          return fold2(function(acc) {
            return function(k) {
              return function(v2) {
                return apply3(map4(flip(insert(k)))(acc))(f(k)(v2));
              };
            };
          })(pure12(empty2))(ms);
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

  // output/Literals.Undefined/foreign.js
  var _undefined = void 0;

  // output/Literals.Undefined/index.js
  var $$undefined = _undefined;

  // output/Control.Monad.Writer.Class/index.js
  var tell = function(dict) {
    return dict.tell;
  };

  // output/Control.Monad.Writer.Trans/index.js
  var WriterT = function(x2) {
    return x2;
  };
  var runWriterT = function(v2) {
    return v2;
  };
  var mapWriterT = function(f) {
    return function(v2) {
      return f(v2);
    };
  };
  var functorWriterT = function(dictFunctor) {
    var map4 = map(dictFunctor);
    return {
      map: function(f) {
        return mapWriterT(map4(function(v2) {
          return new Tuple(f(v2.value0), v2.value1);
        }));
      }
    };
  };
  var applyWriterT = function(dictSemigroup) {
    var append3 = append(dictSemigroup);
    return function(dictApply) {
      var apply3 = apply(dictApply);
      var Functor0 = dictApply.Functor0();
      var map4 = map(Functor0);
      var functorWriterT1 = functorWriterT(Functor0);
      return {
        apply: function(v2) {
          return function(v1) {
            var k = function(v3) {
              return function(v4) {
                return new Tuple(v3.value0(v4.value0), append3(v3.value1)(v4.value1));
              };
            };
            return apply3(map4(k)(v2))(v1);
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
        bind: function(v2) {
          return function(k) {
            return bind4(v2)(function(v1) {
              var v22 = k(v1.value0);
              return map4(function(v3) {
                return new Tuple(v3.value0, append3(v1.value1)(v3.value1));
              })(v22);
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
      var pure5 = pure(dictApplicative);
      var applyWriterT2 = applyWriterT1(dictApplicative.Apply0());
      return {
        pure: function(a2) {
          return pure5(new Tuple(a2, mempty6));
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
      var pure5 = pure(applicativeWriterT(dictMonoid)(dictApplicative));
      var semigroupWriterT2 = semigroupWriterT1(dictMonoid.Semigroup0());
      return function(dictMonoid1) {
        var semigroupWriterT3 = semigroupWriterT2(dictMonoid1.Semigroup0());
        return {
          mempty: pure5(mempty(dictMonoid1)),
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
      return function(n2) {
        return (n2 | 0) === n2 ? just(n2) : nothing;
      };
    };
  };
  var toNumber = function(n2) {
    return n2;
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
  var unsafeClamp = function(x2) {
    if (!isFiniteImpl(x2)) {
      return 0;
    }
    ;
    if (x2 >= toNumber(top2)) {
      return top2;
    }
    ;
    if (x2 <= toNumber(bottom2)) {
      return bottom2;
    }
    ;
    if (otherwise) {
      return fromMaybe(0)(fromNumber(x2));
    }
    ;
    throw new Error("Failed pattern match at Data.Int (line 72, column 1 - line 72, column 29): " + [x2.constructor.name]);
  };
  var round2 = function($37) {
    return unsafeClamp(round($37));
  };

  // output/Data.String.Common/foreign.js
  var replaceAll = function(s1) {
    return function(s2) {
      return function(s3) {
        return s3.replace(new RegExp(s1.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), "g"), s2);
      };
    };
  };

  // output/Snabbdom/foreign.js
  function h(z, J) {
    let P, G = J.elm, X2 = z.data.attrs, $ = J.data.attrs;
    if (!X2 && !$) return;
    if (X2 === $) return;
    X2 = X2 || {}, $ = $ || {};
    for (P in $) {
      let U = $[P];
      if (X2[P] !== U) if (U === true) G.setAttribute(P, "");
      else if (U === false) G.removeAttribute(P);
      else if (P.charCodeAt(0) !== 120) G.setAttribute(P, U);
      else if (P.charCodeAt(3) === 58) G.setAttributeNS("http://www.w3.org/XML/1998/namespace", P, U);
      else if (P.charCodeAt(5) === 58) P.charCodeAt(1) === 109 ? G.setAttributeNS("http://www.w3.org/2000/xmlns/", P, U) : G.setAttributeNS("http://www.w3.org/1999/xlink", P, U);
      else G.setAttribute(P, U);
    }
    for (P in X2) if (!(P in $)) G.removeAttribute(P);
  }
  var v = { create: h, update: h };
  function i(z, J, P) {
    if (typeof z === "function") z.call(J, P, J);
    else if (typeof z === "object") for (let G = 0; G < z.length; G++) i(z[G], J, P);
  }
  function e(z, J) {
    let P = z.type, G = J.data.on;
    if (G && G[P]) i(G[P], J, z);
  }
  function zz() {
    return function z(J) {
      e(J, z.vnode);
    };
  }
  function E(z, J) {
    let P = z.data.on, G = z.listener, X2 = z.elm, $ = J && J.data.on, U = J && J.elm, L;
    if (P === $) return;
    if (P && G) {
      if (!$) for (L in P) X2.removeEventListener(L, G, false);
      else for (L in P) if (!$[L]) X2.removeEventListener(L, G, false);
    }
    if ($) {
      let F = J.listener = z.listener || zz();
      if (F.vnode = J, !P) for (L in $) U.addEventListener(L, F, false);
      else for (L in $) if (!P[L]) U.addEventListener(L, F, false);
    }
  }
  var m = { create: E, update: E, destroy: E };
  function C(z, J, P, G, X2) {
    let $ = J === void 0 ? void 0 : J.key;
    return { sel: z, data: J, children: P, text: G, elm: X2, key: $ };
  }
  var w = Array.isArray;
  function s(z) {
    return typeof z === "string" || typeof z === "number" || z instanceof String || z instanceof Number;
  }
  function Jz(z, J) {
    return document.createElement(z, J);
  }
  function Pz(z, J, P) {
    return document.createElementNS(z, J, P);
  }
  function Wz() {
    return g(document.createDocumentFragment());
  }
  function Xz(z) {
    return document.createTextNode(z);
  }
  function Yz(z) {
    return document.createComment(z);
  }
  function Zz(z, J, P) {
    if (b(z)) {
      let G = z;
      while (G && b(G)) G = g(G).parent;
      z = G !== null && G !== void 0 ? G : z;
    }
    if (b(J)) J = g(J, z);
    if (P && b(P)) P = g(P).firstChildNode;
    z.insertBefore(J, P);
  }
  function $z(z, J) {
    z.removeChild(J);
  }
  function Bz(z, J) {
    if (b(J)) J = g(J, z);
    z.appendChild(J);
  }
  function r(z) {
    if (b(z)) {
      while (z && b(z)) z = g(z).parent;
      return z !== null && z !== void 0 ? z : null;
    }
    return z.parentNode;
  }
  function qz(z) {
    var J;
    if (b(z)) {
      let P = g(z), G = r(P);
      if (G && P.lastChildNode) {
        let X2 = Array.from(G.childNodes), $ = X2.indexOf(P.lastChildNode);
        return (J = X2[$ + 1]) !== null && J !== void 0 ? J : null;
      }
      return null;
    }
    return z.nextSibling;
  }
  function Kz(z) {
    return z.tagName;
  }
  function Uz(z, J) {
    z.textContent = J;
  }
  function Hz(z) {
    return z.textContent;
  }
  function Oz(z) {
    return z.nodeType === 1;
  }
  function Rz(z) {
    return z.nodeType === 3;
  }
  function Az(z) {
    return z.nodeType === 8;
  }
  function b(z) {
    return z.nodeType === 11;
  }
  function g(z, J) {
    var P, G, X2;
    let $ = z;
    return (P = $.parent) !== null && P !== void 0 || ($.parent = J !== null && J !== void 0 ? J : null), (G = $.firstChildNode) !== null && G !== void 0 || ($.firstChildNode = z.firstChild), (X2 = $.lastChildNode) !== null && X2 !== void 0 || ($.lastChildNode = z.lastChild), $;
  }
  var l = { createElement: Jz, createElementNS: Pz, createTextNode: Xz, createDocumentFragment: Wz, createComment: Yz, insertBefore: Zz, removeChild: $z, appendChild: Bz, parentNode: r, nextSibling: qz, tagName: Kz, setTextContent: Uz, getTextContent: Hz, isElement: Oz, isText: Rz, isComment: Az, isDocumentFragment: b };
  var x = C("", {}, [], void 0, void 0);
  function I(z, J) {
    var P, G;
    let X2 = z.key === J.key, $ = ((P = z.data) === null || P === void 0 ? void 0 : P.is) === ((G = J.data) === null || G === void 0 ? void 0 : G.is), U = z.sel === J.sel, L = !z.sel && z.sel === J.sel ? typeof z.text === typeof J.text : true;
    return U && X2 && $ && L;
  }
  function Mz() {
    throw new Error("The document fragment is not supported on this platform.");
  }
  function Tz(z, J) {
    return z.isElement(J);
  }
  function Lz(z, J) {
    return z.isDocumentFragment(J);
  }
  function Dz(z, J, P) {
    var G;
    let X2 = {};
    for (let $ = J; $ <= P; ++$) {
      let U = (G = z[$]) === null || G === void 0 ? void 0 : G.key;
      if (U !== void 0) X2[U] = $;
    }
    return X2;
  }
  var jz = ["create", "update", "remove", "destroy", "pre", "post"];
  function a(z, J, P) {
    let G = { create: [], update: [], remove: [], destroy: [], pre: [], post: [] }, X2 = J !== void 0 ? J : l;
    for (let W of jz) for (let Y2 of z) {
      let q = Y2[W];
      if (q !== void 0) G[W].push(q);
    }
    function $(W) {
      let Y2 = W.id ? "#" + W.id : "", q = W.getAttribute("class"), B = q ? "." + q.split(" ").join(".") : "";
      return C(X2.tagName(W).toLowerCase() + Y2 + B, {}, [], void 0, W);
    }
    function U(W) {
      return C(void 0, {}, [], void 0, W);
    }
    function L(W, Y2) {
      return function q() {
        if (--Y2 === 0) {
          let B = X2.parentNode(W);
          if (B !== null) X2.removeChild(B, W);
        }
      };
    }
    function F(W, Y2) {
      var q, B, K, O, M;
      let Z, R = W.data, T = R === null || R === void 0 ? void 0 : R.hook;
      (q = T === null || T === void 0 ? void 0 : T.init) === null || q === void 0 || q.call(T, W);
      let { children: A, sel: H } = W;
      if (H === "!") (B = W.text) !== null && B !== void 0 || (W.text = ""), W.elm = X2.createComment(W.text);
      else if (H === "") W.elm = X2.createTextNode(W.text);
      else if (H !== void 0) {
        let D = H.indexOf("#"), j = H.indexOf(".", D), Q = D > 0 ? D : H.length, f = j > 0 ? j : H.length, c = D !== -1 || j !== -1 ? H.slice(0, Math.min(Q, f)) : H, V = R === null || R === void 0 ? void 0 : R.ns, S = V === void 0 ? X2.createElement(c, R) : X2.createElementNS(V, c, R);
        if (W.elm = S, Q < f) S.setAttribute("id", H.slice(Q + 1, f));
        if (j > 0) S.setAttribute("class", H.slice(f + 1).replace(/\./g, " "));
        for (Z = 0; Z < G.create.length; ++Z) G.create[Z](x, W);
        if (s(W.text) && (!w(A) || A.length === 0)) X2.appendChild(S, X2.createTextNode(W.text));
        if (w(A)) for (Z = 0; Z < A.length; ++Z) {
          let p = A[Z];
          if (p != null) X2.appendChild(S, F(p, Y2));
        }
        if (T !== void 0) {
          if ((K = T.create) === null || K === void 0 || K.call(T, x, W), T.insert !== void 0) Y2.push(W);
        }
      } else if (((O = P === null || P === void 0 ? void 0 : P.experimental) === null || O === void 0 ? void 0 : O.fragments) && W.children) {
        W.elm = ((M = X2.createDocumentFragment) !== null && M !== void 0 ? M : Mz)();
        for (Z = 0; Z < G.create.length; ++Z) G.create[Z](x, W);
        for (Z = 0; Z < W.children.length; ++Z) {
          let D = W.children[Z];
          if (D != null) X2.appendChild(W.elm, F(D, Y2));
        }
      } else W.elm = X2.createTextNode(W.text);
      return W.elm;
    }
    function _(W, Y2, q, B, K, O) {
      for (; B <= K; ++B) {
        let M = q[B];
        if (M != null) X2.insertBefore(W, F(M, O), Y2);
      }
    }
    function N(W) {
      var Y2, q;
      let B = W.data;
      if (B !== void 0) {
        (q = (Y2 = B === null || B === void 0 ? void 0 : B.hook) === null || Y2 === void 0 ? void 0 : Y2.destroy) === null || q === void 0 || q.call(Y2, W);
        for (let K = 0; K < G.destroy.length; ++K) G.destroy[K](W);
        if (W.children !== void 0) for (let K = 0; K < W.children.length; ++K) {
          let O = W.children[K];
          if (O != null && typeof O !== "string") N(O);
        }
      }
    }
    function k(W, Y2, q, B) {
      var K, O;
      for (; q <= B; ++q) {
        let M, Z = Y2[q];
        if (Z != null) if (Z.sel !== void 0) {
          N(Z), M = G.remove.length + 1;
          let R = L(Z.elm, M);
          for (let A = 0; A < G.remove.length; ++A) G.remove[A](Z, R);
          let T = (O = (K = Z === null || Z === void 0 ? void 0 : Z.data) === null || K === void 0 ? void 0 : K.hook) === null || O === void 0 ? void 0 : O.remove;
          if (T !== void 0) T(Z, R);
          else R();
        } else if (Z.children) N(Z), k(W, Z.children, 0, Z.children.length - 1);
        else X2.removeChild(W, Z.elm);
      }
    }
    function d(W, Y2, q, B) {
      let K = 0, O = 0, M = Y2.length - 1, Z = Y2[0], R = Y2[M], T = q.length - 1, A = q[0], H = q[T], D, j, Q, f;
      while (K <= M && O <= T) if (Z == null) Z = Y2[++K];
      else if (R == null) R = Y2[--M];
      else if (A == null) A = q[++O];
      else if (H == null) H = q[--T];
      else if (I(Z, A)) y(Z, A, B), Z = Y2[++K], A = q[++O];
      else if (I(R, H)) y(R, H, B), R = Y2[--M], H = q[--T];
      else if (I(Z, H)) y(Z, H, B), X2.insertBefore(W, Z.elm, X2.nextSibling(R.elm)), Z = Y2[++K], H = q[--T];
      else if (I(R, A)) y(R, A, B), X2.insertBefore(W, R.elm, Z.elm), R = Y2[--M], A = q[++O];
      else {
        if (D === void 0) D = Dz(Y2, K, M);
        if (j = D[A.key], j === void 0) X2.insertBefore(W, F(A, B), Z.elm), A = q[++O];
        else if (D[H.key] === void 0) X2.insertBefore(W, F(H, B), X2.nextSibling(R.elm)), H = q[--T];
        else {
          if (Q = Y2[j], Q.sel !== A.sel) X2.insertBefore(W, F(A, B), Z.elm);
          else y(Q, A, B), Y2[j] = void 0, X2.insertBefore(W, Q.elm, Z.elm);
          A = q[++O];
        }
      }
      if (O <= T) f = q[T + 1] == null ? null : q[T + 1].elm, _(W, f, q, O, T, B);
      if (K <= M) k(W, Y2, K, M);
    }
    function y(W, Y2, q) {
      var B, K, O, M, Z, R, T, A;
      let H = (B = Y2.data) === null || B === void 0 ? void 0 : B.hook;
      (K = H === null || H === void 0 ? void 0 : H.prepatch) === null || K === void 0 || K.call(H, W, Y2);
      let D = Y2.elm = W.elm;
      if (W === Y2) return;
      if (Y2.data !== void 0 || Y2.text !== void 0 && Y2.text !== W.text) {
        (O = Y2.data) !== null && O !== void 0 || (Y2.data = {}), (M = W.data) !== null && M !== void 0 || (W.data = {});
        for (let f = 0; f < G.update.length; ++f) G.update[f](W, Y2);
        (T = (R = (Z = Y2.data) === null || Z === void 0 ? void 0 : Z.hook) === null || R === void 0 ? void 0 : R.update) === null || T === void 0 || T.call(R, W, Y2);
      }
      let j = W.children, Q = Y2.children;
      if (Y2.text === void 0) {
        if (j !== void 0 && Q !== void 0) {
          if (j !== Q) d(D, j, Q, q);
        } else if (Q !== void 0) {
          if (W.text !== void 0) X2.setTextContent(D, "");
          _(D, null, Q, 0, Q.length - 1, q);
        } else if (j !== void 0) k(D, j, 0, j.length - 1);
        else if (W.text !== void 0) X2.setTextContent(D, "");
      } else if (W.text !== Y2.text) {
        if (j !== void 0) k(D, j, 0, j.length - 1);
        X2.setTextContent(D, Y2.text);
      }
      (A = H === null || H === void 0 ? void 0 : H.postpatch) === null || A === void 0 || A.call(H, W, Y2);
    }
    return function W(Y2, q) {
      let B, K, O, M = [];
      for (B = 0; B < G.pre.length; ++B) G.pre[B]();
      if (Tz(X2, Y2)) Y2 = $(Y2);
      else if (Lz(X2, Y2)) Y2 = U(Y2);
      if (I(Y2, q)) y(Y2, q, M);
      else if (K = Y2.elm, O = X2.parentNode(K), F(q, M), O !== null) X2.insertBefore(O, q.elm, X2.nextSibling(K)), k(O, [Y2], 0, 0);
      for (B = 0; B < M.length; ++B) M[B].data.hook.insert(M[B]);
      for (B = 0; B < G.post.length; ++B) G.post[B]();
      return q;
    };
  }
  var t = typeof (window === null || window === void 0 ? void 0 : window.requestAnimationFrame) === "function" ? window.requestAnimationFrame.bind(window) : setTimeout;
  var Fz = (z) => {
    t(() => {
      t(z);
    });
  };
  var u = false;
  function Qz(z, J, P) {
    Fz(() => {
      z[J] = P;
    });
  }
  function o(z, J) {
    let P, G, X2 = J.elm, $ = z.data.style, U = J.data.style;
    if (!$ && !U) return;
    if ($ === U) return;
    $ = $ || {}, U = U || {};
    let L = "delayed" in $;
    for (G in $) if (!(G in U)) if (G[0] === "-" && G[1] === "-") X2.style.removeProperty(G);
    else X2.style[G] = "";
    for (G in U) if (P = U[G], G === "delayed" && U.delayed) {
      for (let F in U.delayed) if (P = U.delayed[F], !L || P !== $.delayed[F]) Qz(X2.style, F, P);
    } else if (G !== "remove" && P !== $[G]) if (G[0] === "-" && G[1] === "-") X2.style.setProperty(G, P);
    else X2.style[G] = P;
  }
  function fz(z) {
    let J, P, G = z.elm, X2 = z.data.style;
    if (!X2 || !(J = X2.destroy)) return;
    for (P in J) G.style[P] = J[P];
  }
  function bz(z, J) {
    let P = z.data.style;
    if (!P || !P.remove) {
      J();
      return;
    }
    if (!u) z.elm.offsetLeft, u = true;
    let G, X2 = z.elm, $ = 0, U = P.remove, L = 0, F = [];
    for (G in U) F.push(G), X2.style[G] = U[G];
    let N = getComputedStyle(X2)["transition-property"].split(", ");
    for (; $ < N.length; ++$) if (F.indexOf(N[$]) !== -1) L++;
    X2.addEventListener("transitionend", (k) => {
      if (k.target === X2) --L;
      if (L === 0) J();
    });
  }
  function kz() {
    u = false;
  }
  var n = { pre: kz, create: o, update: o, destroy: fz, remove: bz };
  function Vz() {
    return a([v, m, n]);
  }

  // output/Effect.Uncurried/foreign.js
  var runEffectFn2 = function runEffectFn22(fn) {
    return function(a2) {
      return function(b2) {
        return function() {
          return fn(a2, b2);
        };
      };
    };
  };

  // output/Snabbdom/index.js
  var init = /* @__PURE__ */ mapFlipped(functorEffect)(Vz)(runEffectFn2);
  var h2 = /* @__PURE__ */ runFn4(C);

  // output/Foreign/foreign.js
  var isArray = Array.isArray || function(value12) {
    return Object.prototype.toString.call(value12) === "[object Array]";
  };

  // output/Untagged.Castable/index.js
  var cast = function() {
    return unsafeCoerce2;
  };

  // output/Untagged.Union/index.js
  var cast2 = /* @__PURE__ */ cast();
  var asOneOf = function() {
    return cast2;
  };

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
  var monoidRecord2 = /* @__PURE__ */ monoidRecord();
  var monoidRecordCons2 = /* @__PURE__ */ monoidRecordCons(downIsSymbol);
  var monoidObject2 = /* @__PURE__ */ monoidObject(/* @__PURE__ */ semigroupRecord3(/* @__PURE__ */ semigroupRecordCons({
    reflectSymbol: function() {
      return "key";
    }
  })()(/* @__PURE__ */ semigroupRecordCons({
    reflectSymbol: function() {
      return "value";
    }
  })()(semigroupRecordNil)(semigroupString))(semigroupString)));
  var monoidRecordCons1 = /* @__PURE__ */ monoidRecordCons(hoverIsSymbol);
  var monoidRecordCons22 = /* @__PURE__ */ monoidRecordCons(meatIsSymbol);
  var mempty2 = /* @__PURE__ */ mempty(monoidArray);
  var monoidRecordCons3 = /* @__PURE__ */ monoidRecordCons(childrenIsSymbol);
  var monoidRecordCons4 = /* @__PURE__ */ monoidRecordCons2(monoidArray)()(/* @__PURE__ */ monoidRecordCons1(monoidArray)()(/* @__PURE__ */ monoidRecordCons22(monoidArray)()(/* @__PURE__ */ monoidRecordCons(nervesIsSymbol)(monoidArray)()(monoidRecordNil))));
  var mempty1 = /* @__PURE__ */ mempty(/* @__PURE__ */ monoidRecord2(/* @__PURE__ */ monoidRecordCons3(monoidArray)()(monoidRecordCons4)));
  var foldMap4 = /* @__PURE__ */ foldMap2(monoidString);
  var intercalate3 = /* @__PURE__ */ intercalate2(monoidString);
  var asOneOf2 = /* @__PURE__ */ asOneOf();
  var show1 = /* @__PURE__ */ show(showNumber);
  var mempty22 = /* @__PURE__ */ mempty(monoidUnit);
  var fromHomogeneous2 = /* @__PURE__ */ fromHomogeneous();
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
  var TopLeft = /* @__PURE__ */ function() {
    function TopLeft2() {
    }
    ;
    TopLeft2.value = new TopLeft2();
    return TopLeft2;
  }();
  var TopRight = /* @__PURE__ */ function() {
    function TopRight2() {
    }
    ;
    TopRight2.value = new TopRight2();
    return TopRight2;
  }();
  var BottomRight = /* @__PURE__ */ function() {
    function BottomRight2() {
    }
    ;
    BottomRight2.value = new BottomRight2();
    return BottomRight2;
  }();
  var BottomLeft = /* @__PURE__ */ function() {
    function BottomLeft2() {
    }
    ;
    BottomLeft2.value = new BottomLeft2();
    return BottomLeft2;
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
  var Solid = /* @__PURE__ */ function() {
    function Solid2() {
    }
    ;
    Solid2.value = new Solid2();
    return Solid2;
  }();
  var Dashed = /* @__PURE__ */ function() {
    function Dashed2() {
    }
    ;
    Dashed2.value = new Dashed2();
    return Dashed2;
  }();
  var Dotted = /* @__PURE__ */ function() {
    function Dotted2() {
    }
    ;
    Dotted2.value = new Dotted2();
    return Dotted2;
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
  var BorderWidth = /* @__PURE__ */ function() {
    function BorderWidth2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    BorderWidth2.create = function(value0) {
      return function(value1) {
        return new BorderWidth2(value0, value1);
      };
    };
    return BorderWidth2;
  }();
  var BorderStyle = /* @__PURE__ */ function() {
    function BorderStyle2(value0) {
      this.value0 = value0;
    }
    ;
    BorderStyle2.create = function(value0) {
      return new BorderStyle2(value0);
    };
    return BorderStyle2;
  }();
  var Round = /* @__PURE__ */ function() {
    function Round2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Round2.create = function(value0) {
      return function(value1) {
        return new Round2(value0, value1);
      };
    };
    return Round2;
  }();
  var Shadow = /* @__PURE__ */ function() {
    function Shadow2(value0) {
      this.value0 = value0;
    }
    ;
    Shadow2.create = function(value0) {
      return new Shadow2(value0);
    };
    return Shadow2;
  }();
  var InnerShadow = /* @__PURE__ */ function() {
    function InnerShadow2(value0) {
      this.value0 = value0;
    }
    ;
    InnerShadow2.create = function(value0) {
      return new InnerShadow2(value0);
    };
    return InnerShadow2;
  }();
  var FontColor = /* @__PURE__ */ function() {
    function FontColor2(value0) {
      this.value0 = value0;
    }
    ;
    FontColor2.create = function(value0) {
      return new FontColor2(value0);
    };
    return FontColor2;
  }();
  var FontWeight = /* @__PURE__ */ function() {
    function FontWeight2(value0) {
      this.value0 = value0;
    }
    ;
    FontWeight2.create = function(value0) {
      return new FontWeight2(value0);
    };
    return FontWeight2;
  }();
  var FontSize = /* @__PURE__ */ function() {
    function FontSize2(value0) {
      this.value0 = value0;
    }
    ;
    FontSize2.create = function(value0) {
      return new FontSize2(value0);
    };
    return FontSize2;
  }();
  var Font = /* @__PURE__ */ function() {
    function Font2(value0) {
      this.value0 = value0;
    }
    ;
    Font2.create = function(value0) {
      return new Font2(value0);
    };
    return Font2;
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
    append: function(v2) {
      return function(v1) {
        return {
          meat: union(v2.meat)(v1.meat),
          hover: union(v2.hover)(v1.hover),
          down: union(v2.down)(v1.down)
        };
      };
    }
  };
  var bindWriterT2 = /* @__PURE__ */ bindWriterT(semigroupSkinGrowth)(bindIdentity);
  var discard2 = /* @__PURE__ */ discard(discardUnit)(bindWriterT2);
  var bind2 = /* @__PURE__ */ bind(bindWriterT2);
  var append22 = /* @__PURE__ */ append(/* @__PURE__ */ semigroupWriterT(applyIdentity)(semigroupSkinGrowth)(semigroupArray));
  var semigroupMutation = {
    append: function(v2) {
      return function(v1) {
        return {
          extraSkin: append2(v2.extraSkin)(v1.extraSkin)
        };
      };
    }
  };
  var semigroupGenericUI = function(dictSemigroup) {
    var append3 = append(semigroupRecord3(semigroupRecordCons2(dictSemigroup)));
    return function(dictSemigroup1) {
      var append4 = append(dictSemigroup1);
      return {
        append: function(v2) {
          return function(v1) {
            return new UI(append3(v2.value0)(v1.value0), append4(v2.value1)(v1.value1));
          };
        }
      };
    };
  };
  var renderableSide = {
    render: function(v2) {
      if (v2 instanceof Top) {
        return "top";
      }
      ;
      if (v2 instanceof Right2) {
        return "right";
      }
      ;
      if (v2 instanceof Bottom) {
        return "bottom";
      }
      ;
      if (v2 instanceof Left2) {
        return "left";
      }
      ;
      throw new Error("Failed pattern match at Plum.View (line 383, column 12 - line 387, column 19): " + [v2.constructor.name]);
    },
    renderKey: function(v2) {
      if (v2 instanceof Top) {
        return "top";
      }
      ;
      if (v2 instanceof Right2) {
        return "right";
      }
      ;
      if (v2 instanceof Bottom) {
        return "bottom";
      }
      ;
      if (v2 instanceof Left2) {
        return "left";
      }
      ;
      throw new Error("Failed pattern match at Plum.View (line 388, column 15 - line 392, column 19): " + [v2.constructor.name]);
    }
  };
  var renderableCorner = {
    render: function(v2) {
      if (v2 instanceof TopLeft) {
        return "top-left";
      }
      ;
      if (v2 instanceof TopRight) {
        return "top-right";
      }
      ;
      if (v2 instanceof BottomRight) {
        return "bottom-right";
      }
      ;
      if (v2 instanceof BottomLeft) {
        return "bottom-left";
      }
      ;
      throw new Error("Failed pattern match at Plum.View (line 357, column 12 - line 361, column 32): " + [v2.constructor.name]);
    },
    renderKey: function(v2) {
      if (v2 instanceof TopLeft) {
        return "top-left";
      }
      ;
      if (v2 instanceof TopRight) {
        return "top-right";
      }
      ;
      if (v2 instanceof BottomRight) {
        return "bottom-right";
      }
      ;
      if (v2 instanceof BottomLeft) {
        return "bottom-left";
      }
      ;
      throw new Error("Failed pattern match at Plum.View (line 362, column 15 - line 366, column 32): " + [v2.constructor.name]);
    }
  };
  var renderableColor = {
    render: function(v2) {
      return "rgb(" + (show2(v2.r) + ("," + (show2(v2.g) + ("," + (show2(v2.b) + ("," + (show2(v2.a) + "%)")))))));
    },
    renderKey: function(v2) {
      return show2(v2.r) + ("-" + (show2(v2.g) + ("-" + (show2(v2.b) + ("-" + show2(v2.a))))));
    }
  };
  var renderableBorderStyle = {
    render: function(v2) {
      if (v2 instanceof Solid) {
        return "solid";
      }
      ;
      if (v2 instanceof Dashed) {
        return "dashed";
      }
      ;
      if (v2 instanceof Dotted) {
        return "dotted";
      }
      ;
      throw new Error("Failed pattern match at Plum.View (line 371, column 12 - line 374, column 23): " + [v2.constructor.name]);
    },
    renderKey: function(v2) {
      if (v2 instanceof Solid) {
        return "solid";
      }
      ;
      if (v2 instanceof Dashed) {
        return "dashed";
      }
      ;
      if (v2 instanceof Dotted) {
        return "dotted";
      }
      ;
      throw new Error("Failed pattern match at Plum.View (line 375, column 15 - line 378, column 23): " + [v2.constructor.name]);
    }
  };
  var monoidSkinGrowth = {
    mempty: /* @__PURE__ */ mempty(/* @__PURE__ */ monoidRecord2(/* @__PURE__ */ monoidRecordCons2(monoidObject2)()(/* @__PURE__ */ monoidRecordCons1(monoidObject2)()(/* @__PURE__ */ monoidRecordCons22(monoidObject2)()(monoidRecordNil))))),
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
    var mempty52 = mempty(monoidRecord2(monoidRecordCons3(dictMonoid)()(monoidRecordCons4)));
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
      return function(v2) {
        return new UI(v2.value0, f(v2.value1));
      };
    }
  };
  var applyGenericUI = function(dictMonoid) {
    var append3 = append(semigroupRecord3(semigroupRecordCons2(dictMonoid.Semigroup0())));
    return {
      apply: function(v2) {
        return function(v1) {
          return new UI(append3(v2.value0)(v1.value0), v2.value1(v1.value1));
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
      bind: function(v2) {
        return function(f) {
          var v1 = f(v2.value1);
          return new UI(append3(v2.value0)(v1.value0), v1.value1);
        };
      },
      Apply0: function() {
        return applyGenericUI1;
      }
    };
  };
  var applicativeGenericUI = function(dictMonoid) {
    var applyGenericUI1 = applyGenericUI(dictMonoid);
    return {
      pure: UI.create(mempty(monoidRecord2(monoidRecordCons3(dictMonoid)()(monoidRecordCons4)))),
      Apply0: function() {
        return applyGenericUI1;
      }
    };
  };
  var text = function(s2) {
    return function(v2) {
      return new UI({
        nerves: mempty1.nerves,
        meat: mempty1.meat,
        hover: mempty1.hover,
        down: mempty1.down,
        children: [new Tuple({
          meat: v2.value0.meat,
          nerves: v2.value0.nerves,
          hover: v2.value0.hover,
          down: v2.value0.down
        }, new Text(s2))]
      }, v2.value1);
    };
  };
  var styleSkinGrowth = function(v2) {
    return foldMap4(function(className) {
      return function(v1) {
        return "." + (className + ("{" + (v1.key + (":" + (v1.value + ";}")))));
      };
    })(v2.meat) + (foldMap4(function(className) {
      return function(v1) {
        return "." + (className + ("{" + (v1.key + (":" + (v1.value + ";}")))));
      };
    })(v2.hover) + foldMap4(function(className) {
      return function(v1) {
        return "." + (className + ("{" + (v1.key + (":" + (v1.value + ";}")))));
      };
    })(v2.down));
  };
  var string = function(elem2) {
    return function(classes) {
      return function(string1) {
        return h2(elem2)({
          attrs: singleton2("class")(intercalate3(" ")(classes)),
          on: empty2,
          style: empty2
        })([])(asOneOf2(string1));
      };
    };
  };
  var stack = function(v2) {
    return new UI({
      nerves: mempty1.nerves,
      meat: mempty1.meat,
      hover: mempty1.hover,
      down: mempty1.down,
      children: [new Tuple({
        meat: v2.value0.meat,
        nerves: v2.value0.nerves,
        hover: v2.value0.hover,
        down: v2.value0.down
      }, new Stack(v2.value0.children))]
    }, v2.value1);
  };
  var sk = function(cName) {
    return function(key) {
      return function(value12) {
        return discard2(tell2({
          meat: singleton2(cName)({
            key,
            value: value12
          }),
          hover: empty2,
          down: empty2
        }))(function() {
          return pure2([cName]);
        });
      };
    };
  };
  var row = function(v2) {
    return new UI({
      nerves: mempty1.nerves,
      meat: mempty1.meat,
      hover: mempty1.hover,
      down: mempty1.down,
      children: [new Tuple({
        meat: v2.value0.meat,
        nerves: v2.value0.nerves,
        hover: v2.value0.hover,
        down: v2.value0.down
      }, new Row(v2.value0.children))]
    }, v2.value1);
  };
  var rgb = function(r2) {
    return function(g2) {
      return function(b2) {
        return {
          r: round2(r2 * 255),
          g: round2(g2 * 255),
          b: round2(b2 * 255),
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
  var renderKey3 = /* @__PURE__ */ renderKey(renderableBorderStyle);
  var renderKey4 = /* @__PURE__ */ renderKey(renderableCorner);
  var render = function(dict) {
    return dict.render;
  };
  var render1 = /* @__PURE__ */ render(renderableColor);
  var render2 = /* @__PURE__ */ render(renderableSide);
  var render3 = /* @__PURE__ */ render(renderableBorderStyle);
  var render4 = /* @__PURE__ */ render(renderableCorner);
  var renderableLength = {
    render: function(v2) {
      if (v2 instanceof Px) {
        return show2(v2.value0) + "px";
      }
      ;
      if (v2 instanceof Fit) {
        return "fit-content";
      }
      ;
      if (v2 instanceof Fill) {
        return "100%";
      }
      ;
      if (v2 instanceof Max2) {
        return "max(" + (show2(v2.value0) + ("px," + (render(renderableLength)(v2.value1) + ")")));
      }
      ;
      if (v2 instanceof Min2) {
        return "min(" + (show2(v2.value0) + ("px," + (render(renderableLength)(v2.value1) + ")")));
      }
      ;
      throw new Error("Failed pattern match at Plum.View (line 494, column 12 - line 499, column 62): " + [v2.constructor.name]);
    },
    renderKey: function(v2) {
      if (v2 instanceof Px) {
        return show2(v2.value0);
      }
      ;
      if (v2 instanceof Fit) {
        return "fit-content";
      }
      ;
      if (v2 instanceof Fill) {
        return "fill";
      }
      ;
      if (v2 instanceof Max2) {
        return "max-" + (show2(v2.value0) + ("-" + renderKey(renderableLength)(v2.value1)));
      }
      ;
      if (v2 instanceof Min2) {
        return "min-" + (show2(v2.value0) + ("-" + renderKey(renderableLength)(v2.value1)));
      }
      ;
      throw new Error("Failed pattern match at Plum.View (line 500, column 15 - line 505, column 56): " + [v2.constructor.name]);
    }
  };
  var renderKey5 = /* @__PURE__ */ renderKey(renderableLength);
  var render5 = /* @__PURE__ */ render(renderableLength);
  var renderableShadow = {
    render: function(v2) {
      return show2(v2.offset.x) + ("px " + (show2(v2.offset.y) + ("px " + (show1(v2.blur) + ("px " + (show1(v2.size) + ("px " + render1(v2.color))))))));
    },
    renderKey: function(v2) {
      return show2(v2.offset.x) + ("-" + (show2(v2.offset.y) + ("-" + (show1(v2.blur) + ("-" + (show1(v2.size) + ("-" + renderKey1(v2.color))))))));
    }
  };
  var renderKey6 = /* @__PURE__ */ renderKey(renderableShadow);
  var render6 = /* @__PURE__ */ render(renderableShadow);
  var removeSpaces = /* @__PURE__ */ replaceAll(" ")("-");
  var skin = function(ctx) {
    return function(v2) {
      if (v2 instanceof Spacing) {
        return sk("spacing-" + (show2(v2.value0) + ("-" + show2(v2.value1))))("gap")(show2(v2.value0) + ("px " + (show2(v2.value1) + "px")));
      }
      ;
      if (v2 instanceof Explain) {
        return sk("explain")("border")("dashed magenta");
      }
      ;
      if (v2 instanceof Align) {
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
            if (v2.value1 instanceof Start) {
              return "start";
            }
            ;
            if (v2.value1 instanceof Center) {
              return "center";
            }
            ;
            if (v2.value1 instanceof End) {
              return "end";
            }
            ;
            throw new Error("Failed pattern match at Plum.View (line 431, column 13 - line 434, column 27): " + [v2.value1.constructor.name]);
          }();
          var k = function() {
            if (v2.value0 instanceof X) {
              return "justify-items";
            }
            ;
            if (v2.value0 instanceof Y) {
              return "align-items";
            }
            ;
            throw new Error("Failed pattern match at Plum.View (line 426, column 13 - line 428, column 33): " + [v2.value0.constructor.name]);
          }();
          return sk("align-grid-" + (k + ("-" + v1)))(k)(v1);
        }
        ;
        if (ctx instanceof Flexbox) {
          var v1 = function() {
            if (v2.value1 instanceof Start) {
              return "flex-start";
            }
            ;
            if (v2.value1 instanceof Center) {
              return "center";
            }
            ;
            if (v2.value1 instanceof End) {
              return "flex-end";
            }
            ;
            throw new Error("Failed pattern match at Plum.View (line 450, column 13 - line 453, column 32): " + [v2.value1.constructor.name]);
          }();
          var k = function() {
            var v22 = new Tuple(ctx.value0, v2.value0);
            if (v22.value0 instanceof X && v22.value1 instanceof X) {
              return "justify-content";
            }
            ;
            if (v22.value0 instanceof X && v22.value1 instanceof Y) {
              return "align-items";
            }
            ;
            if (v22.value0 instanceof Y && v22.value1 instanceof X) {
              return "align-items";
            }
            ;
            if (v22.value0 instanceof Y && v22.value1 instanceof Y) {
              return "justify-content";
            }
            ;
            throw new Error("Failed pattern match at Plum.View (line 442, column 13 - line 446, column 42): " + [v22.constructor.name]);
          }();
          return sk("align-flexbox-" + (k + ("-" + v1)))(k)(v1);
        }
        ;
        throw new Error("Failed pattern match at Plum.View (line 420, column 26 - line 456, column 51): " + [ctx.constructor.name]);
      }
      ;
      if (v2 instanceof Width) {
        return sk("width-" + renderKey5(v2.value0))("width")(render5(v2.value0));
      }
      ;
      if (v2 instanceof Height) {
        return sk("height-" + renderKey5(v2.value0))("height")(render5(v2.value0));
      }
      ;
      if (v2 instanceof Wrapped) {
        if (ctx instanceof Flexbox) {
          return sk("wrapped")("flex-wrap")("wrap");
        }
        ;
        return pure2([]);
      }
      ;
      if (v2 instanceof BackgroundColor) {
        return sk("bg-color-" + renderKey1(v2.value0))("background-color")(render1(v2.value0));
      }
      ;
      if (v2 instanceof Padding) {
        return sk("padding-" + (renderKey2(v2.value0) + ("-" + show2(v2.value1))))("padding-" + render2(v2.value0))(show2(v2.value1) + "px");
      }
      ;
      if (v2 instanceof Spread) {
        if (ctx instanceof Flexbox) {
          return sk("spread")("justify-content")("space-between");
        }
        ;
        return pure2([]);
      }
      ;
      if (v2 instanceof Opacity) {
        return sk("opacity-" + show1(v2.value0))("opacity")(show1(v2.value0));
      }
      ;
      if (v2 instanceof Pointer) {
        return sk("pointer")("cursor")("pointer");
      }
      ;
      if (v2 instanceof Move) {
        return sk("move-" + (show2(v2.value0.x) + ("-" + show2(v2.value0.y))))("transform")("translate(" + (show2(v2.value0.x) + ("px, " + (show2(v2.value0.y) + "px)"))));
      }
      ;
      if (v2 instanceof Clip && v2.value0 instanceof X) {
        return sk("clip-x")("overflow-x")("hidden");
      }
      ;
      if (v2 instanceof Clip && v2.value0 instanceof Y) {
        return sk("clip-y")("overflow-y")("hidden");
      }
      ;
      if (v2 instanceof BorderWidth) {
        return sk("border-width-" + (renderKey2(v2.value0) + ("-" + show2(v2.value1))))("border-" + (render2(v2.value0) + "-width"))(show2(v2.value1) + "px");
      }
      ;
      if (v2 instanceof BorderStyle) {
        return sk("border-style-" + renderKey3(v2.value0))("border-style")(render3(v2.value0));
      }
      ;
      if (v2 instanceof Round) {
        return sk("round-" + (renderKey4(v2.value0) + ("-" + show2(v2.value1))))("border-" + (render4(v2.value0) + "-radius"))(show2(v2.value1) + "px");
      }
      ;
      if (v2 instanceof Shadow) {
        return sk("shadow-" + renderKey6(v2.value0))("box-shadow")(render6(v2.value0));
      }
      ;
      if (v2 instanceof InnerShadow) {
        return sk("inner-shadow-" + renderKey6(v2.value0))("box-shadow")(render6(v2.value0) + " inset");
      }
      ;
      if (v2 instanceof FontColor) {
        return sk("font-color-" + renderKey1(v2.value0))("color")(render1(v2.value0));
      }
      ;
      if (v2 instanceof FontSize) {
        return sk("font-size-" + show2(v2.value0))("font-size")(show2(v2.value0) + "px");
      }
      ;
      if (v2 instanceof Font) {
        return sk("font-" + removeSpaces(v2.value0))("font-family")(v2.value0);
      }
      ;
      if (v2 instanceof FontWeight) {
        return sk("font-weight-" + show2(v2.value0))("font-weight")(show2(v2.value0));
      }
      ;
      throw new Error("Failed pattern match at Plum.View (line 417, column 12 - line 484, column 71): " + [v2.constructor.name]);
    };
  };
  var m2 = function(dictMonoid) {
    var mempty52 = mempty(monoidRecord2(monoidRecordCons3(dictMonoid)()(monoidRecordCons4)));
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
  var width = function(dictMonoid) {
    var m1 = m2(dictMonoid);
    return function(l2) {
      return m1(new Width(l2));
    };
  };
  var height = function(dictMonoid) {
    var m1 = m2(dictMonoid);
    return function(l2) {
      return m1(new Height(l2));
    };
  };
  var hWith = function() {
    return function(elem2) {
      return function(props) {
        return function(classes) {
          return function(children) {
            return h2(elem2)({
              attrs: union(fromHomogeneous2(props))(singleton2("class")(intercalate3(" ")(classes))),
              on: empty2,
              style: empty2
            })(children)(asOneOf2($$undefined));
          };
        };
      };
    };
  };
  var hWith1 = /* @__PURE__ */ hWith();
  var h3 = function(elem2) {
    return function(classes) {
      return function(children) {
        return h2(elem2)({
          attrs: singleton2("class")(intercalate3(" ")(classes)),
          on: empty2,
          style: empty2
        })(children)(asOneOf2($$undefined));
      };
    };
  };
  var growSkin = function(fire) {
    return function(v2) {
      return function(v1) {
        var widthFill = [new Width(Fill.value), new Height(Fill.value)];
        var alignCenter = [new Align(X.value, Center.value), new Align(Y.value, Center.value)];
        var skn = function(ctx) {
          return bind2(map2(function($574) {
            return function(v22) {
              return append2(v22)(v2.extraSkin);
            }(concat($574));
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
            throw new Error("Failed pattern match at Plum.View (line 577, column 16 - line 581, column 35): " + [ctx.constructor.name]);
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
            throw new Error("Failed pattern match at Plum.View (line 582, column 16 - line 586, column 37): " + [ctx.constructor.name]);
          }())))))(function(meatClasses) {
            var v22 = runWriter(traverse2(skin(ctx))(v1.value0.hover));
            return bind2(traverseWithIndex2(function(key) {
              return function(val) {
                return tell2({
                  meat: empty2,
                  hover: singleton2(key + "-hover:hover")(val),
                  down: empty2
                });
              };
            })(v22.value1.meat))(function() {
              var v3 = runWriter(traverse2(skin(ctx))(v1.value0.down));
              return bind2(traverseWithIndex2(function(key) {
                return function(val) {
                  return tell2({
                    meat: empty2,
                    hover: empty2,
                    down: singleton2(key + "-down:active")(val)
                  });
                };
              })(v3.value1.meat))(function() {
                return pure2(append2(meatClasses)(append2(map1(function(v4) {
                  return v4 + "-hover";
                })(concat(v22.value0)))(map1(function(v4) {
                  return v4 + "-down";
                })(concat(v3.value0)))));
              });
            });
          });
        };
        if (v1.value1 instanceof Text) {
          return map2(function(c) {
            return string("span")(c)(v1.value1.value0);
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
              return pure2(hWith1("a")({
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
              return pure2(hWith1("a")({
                href: v1.value1.value0,
                download: fromMaybe("")(v1.value1.value1.filename)
              })(classes)([child$prime]));
            });
          });
        }
        ;
        if (v1.value1 instanceof Image2) {
          return map2(function(c) {
            return hWith1("img")({
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
        throw new Error("Failed pattern match at Plum.View (line 609, column 3 - line 650, column 37): " + [v1.value1.constructor.name]);
      };
    };
  };
  var grow = function(fire) {
    return function(v2) {
      var v1 = runWriter(growSkin(fire)(mempty4)(v2));
      return {
        node: v1.value0,
        style: styleSkinGrowth(v1.value1)
      };
    };
  };
  var fontWeight = function(dictMonoid) {
    var m1 = m2(dictMonoid);
    return function(f) {
      return m1(new FontWeight(f));
    };
  };
  var fontSize = function(dictMonoid) {
    var m1 = m2(dictMonoid);
    return function(f) {
      return m1(new FontSize(f));
    };
  };
  var font = function(dictMonoid) {
    var m1 = m2(dictMonoid);
    return function(f) {
      return m1(new Font(f));
    };
  };
  var column = function(v2) {
    return new UI({
      nerves: mempty1.nerves,
      meat: mempty1.meat,
      hover: mempty1.hover,
      down: mempty1.down,
      children: [new Tuple({
        meat: v2.value0.meat,
        nerves: v2.value0.nerves,
        hover: v2.value0.hover,
        down: v2.value0.down
      }, new Column(v2.value0.children))]
    }, unit);
  };
  var bgColor = function(dictMonoid) {
    var m1 = m2(dictMonoid);
    return function(c) {
      return m1(new BackgroundColor(c));
    };
  };
  var align = function(dictMonoid) {
    var m1 = m2(dictMonoid);
    return function(dir2) {
      return function(al) {
        return m1(new Align(dir2, al));
      };
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
  function nullable(a2, r2, f) {
    return a2 == null ? r2 : f(a2);
  }

  // output/Data.Nullable/index.js
  var toMaybe = function(n2) {
    return nullable(n2, Nothing.value, Just.create);
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
  var pure3 = /* @__PURE__ */ pure(applicativeEffect);
  var asOneOf3 = /* @__PURE__ */ asOneOf();
  var outerStyle = "html,body{height:100%;padding:0;margin:0;}";
  var run3 = function(id) {
    return function(plum2) {
      return function __do() {
        var initModel = plum2.init();
        var modelRef = $$new(initModel)();
        var v2 = bind3(bind3(windowImpl)(document2))(function() {
          var $23 = getElementById(id);
          return function($24) {
            return $23(toNonElementParentNode($24));
          };
        }())();
        if (v2 instanceof Just) {
          var patch = init();
          var view = function(model) {
            var v1 = plum2.view(model);
            var v22 = uncons(v1.value0.children);
            if (v22 instanceof Just) {
              var v3 = grow(function(msg) {
                return function __do2() {
                  var m3 = read(modelRef)();
                  var m_ = plum2.update(msg)(m3)();
                  write(m_)(modelRef)();
                  var node2 = view(m_)();
                  patch(v2.value0)(node2)();
                  return unit;
                };
              })(v22.value0.head);
              return pure3(h2("div")({
                attrs: empty2,
                on: empty2,
                style: empty2
              })([h2("style")({
                attrs: empty2,
                on: empty2,
                style: empty2
              })([])(asOneOf3(outerStyle + v3.style)), v3.node])(asOneOf3($$undefined)));
            }
            ;
            if (v22 instanceof Nothing) {
              return pure3(h2("div")({
                attrs: empty2,
                on: empty2,
                style: empty2
              })([])(asOneOf3($$undefined)));
            }
            ;
            throw new Error("Failed pattern match at Plum (line 38, column 11 - line 74, column 36): " + [v22.constructor.name]);
          };
          var node = view(initModel)();
          patch(v2.value0)(node)();
          return unit;
        }
        ;
        if (v2 instanceof Nothing) {
          return unit;
        }
        ;
        throw new Error("Failed pattern match at Plum (line 32, column 92 - line 79, column 25): " + [v2.constructor.name]);
      };
    };
  };

  // output/Main/index.js
  var pure4 = /* @__PURE__ */ pure(applicativeEffect);
  var discard3 = /* @__PURE__ */ discard(discardUnit);
  var discard1 = /* @__PURE__ */ discard3(/* @__PURE__ */ bindGenericUI(monoidArray));
  var align2 = /* @__PURE__ */ align(monoidArray);
  var height9 = /* @__PURE__ */ height(monoidArray);
  var bgColor2 = /* @__PURE__ */ bgColor(monoidArray);
  var mempty5 = /* @__PURE__ */ mempty(/* @__PURE__ */ monoidGenericUI(monoidArray)(monoidUnit));
  var pure1 = /* @__PURE__ */ pure(/* @__PURE__ */ applicativeGenericUI(monoidArray));
  var font2 = /* @__PURE__ */ font(monoidArray);
  var width9 = /* @__PURE__ */ width(monoidArray);
  var discard22 = /* @__PURE__ */ discard3(/* @__PURE__ */ bindGenericUI(monoidUnit));
  var fontSize2 = /* @__PURE__ */ fontSize(monoidUnit);
  var fontWeight2 = /* @__PURE__ */ fontWeight(monoidUnit);
  var plum = {
    init: /* @__PURE__ */ pure4({
      text: "Test"
    }),
    view: function(model) {
      return stack(discard1(align2(Y.value)(End.value))(function() {
        return discard1(height9(Fit.value))(function() {
          return discard1(row(discard1(align2(Y.value)(End.value))(function() {
            return discard1(column(discard1(bgColor2(rgb(0)(0)(0)))(function() {
              return height9(new Px(10));
            })))(function() {
              return discard1(column(mempty5))(function() {
                return pure1(unit);
              });
            });
          })))(function() {
            return discard1(column(discard1(font2("sans-serif"))(function() {
              return discard1(column(discard1(height9(new Px(100)))(function() {
                return width9(Fit.value);
              })))(function() {
                return discard1(align2(Y.value)(Start.value))(function() {
                  return discard1(width9(Fill.value))(function() {
                    return column(discard1(width9(Fill.value))(function() {
                      return discard1(width9(Fit.value))(function() {
                        return discard1(height9(Fit.value))(function() {
                          return discard1(text("PureStack")(discard22(fontSize2(72))(function() {
                            return fontWeight2(1e3);
                          })))(function() {
                            return column(discard1(bgColor2(rgb(0)(0)(0)))(function() {
                              return discard1(height9(new Px(10)))(function() {
                                return width9(Fill.value);
                              });
                            }));
                          });
                        });
                      });
                    }));
                  });
                });
              });
            })))(function() {
              return column(width9(Fill.value));
            });
          });
        });
      }));
    },
    update: function(msg) {
      return function(model) {
        return pure4({
          text: "Button pressed"
        });
      };
    }
  };
  var main = /* @__PURE__ */ run3("plum")(plum);

  // <stdin>
  main();
})();
