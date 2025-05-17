(() => {
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

  // output/Data.Array/foreign.js
  var rangeImpl = function(start2, end) {
    var step2 = start2 > end ? -1 : 1;
    var result = new Array(step2 * (end - start2) + 1);
    var i = start2, n = 0;
    while (i !== end) {
      result[n++] = i;
      i += step2;
    }
    result[n] = i;
    return result;
  };
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

  // output/Data.Semigroup/foreign.js
  var concatArray = function(xs) {
    return function(ys) {
      if (xs.length === 0) return ys;
      if (ys.length === 0) return xs;
      return xs.concat(ys);
    };
  };

  // output/Data.Semigroup/index.js
  var semigroupArray = {
    append: concatArray
  };
  var append = function(dict) {
    return dict.append;
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
  var bind = function(dict) {
    return dict.bind;
  };
  var bindFlipped = function(dictBind) {
    return flip(bind(dictBind));
  };

  // output/Control.Monad/index.js
  var ap = function(dictMonad) {
    var bind3 = bind(dictMonad.Bind1());
    var pure3 = pure(dictMonad.Applicative0());
    return function(f) {
      return function(a) {
        return bind3(f)(function(f$prime) {
          return bind3(a)(function(a$prime) {
            return pure3(f$prime(a$prime));
          });
        });
      };
    };
  };

  // output/Data.Bounded/foreign.js
  var topChar = String.fromCharCode(65535);
  var bottomChar = String.fromCharCode(0);
  var topNumber = Number.POSITIVE_INFINITY;
  var bottomNumber = Number.NEGATIVE_INFINITY;

  // output/Data.Show/foreign.js
  var showIntImpl = function(n) {
    return n.toString();
  };

  // output/Data.Show/index.js
  var showInt = {
    show: showIntImpl
  };
  var show = function(dict) {
    return dict.show;
  };

  // output/Data.Maybe/index.js
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

  // output/Data.Monoid/index.js
  var monoidArray = {
    mempty: [],
    Semigroup0: function() {
      return semigroupArray;
    }
  };
  var mempty = function(dict) {
    return dict.mempty;
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

  // output/Effect/index.js
  var $runtime_lazy = function(name14, moduleName, init) {
    var state2 = 0;
    var val;
    return function(lineNumber) {
      if (state2 === 2) return val;
      if (state2 === 1) throw new ReferenceError(name14 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state2 = 1;
      val = init();
      state2 = 2;
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
  var $runtime_lazy2 = function(name14, moduleName, init) {
    var state2 = 0;
    var val;
    return function(lineNumber) {
      if (state2 === 2) return val;
      if (state2 === 1) throw new ReferenceError(name14 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state2 = 1;
      val = init();
      state2 = 2;
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

  // output/Unsafe.Coerce/foreign.js
  var unsafeCoerce2 = function(x) {
    return x;
  };

  // output/Data.Foldable/index.js
  var foldr = function(dict) {
    return dict.foldr;
  };
  var foldMapDefaultR = function(dictFoldable) {
    var foldr2 = foldr(dictFoldable);
    return function(dictMonoid) {
      var append3 = append(dictMonoid.Semigroup0());
      var mempty3 = mempty(dictMonoid);
      return function(f) {
        return foldr2(function(x) {
          return function(acc) {
            return append3(f(x))(acc);
          };
        })(mempty3);
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
  var foldMap = function(dict) {
    return dict.foldMap;
  };

  // output/Data.Function.Uncurried/foreign.js
  var runFn2 = function(fn) {
    return function(a) {
      return function(b) {
        return fn(a, b);
      };
    };
  };

  // output/Data.Array/index.js
  var foldMap1 = /* @__PURE__ */ foldMap(foldableArray);
  var range2 = /* @__PURE__ */ runFn2(rangeImpl);
  var foldMap2 = function(dictMonoid) {
    return foldMap1(dictMonoid);
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
  function filterVNodeOnlyProps(name14) {
    return !vnodeOnlyProps.includes(name14);
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
    var text5;
    var flattenedChildren;
    if (children && children.length === 1 && typeof children[0] === "string") {
      text5 = children[0];
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
      text: text5 === "" ? void 0 : text5,
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
  function replace(projector) {
    return function(el) {
      return function(render) {
        return function() {
          projector.replace(el, render);
        };
      };
    };
  }

  // output/Maquette/index.js
  var string = unsafeCoerce2;
  var h2 = _h;

  // output/Foreign.Object/foreign.js
  function _copyST(m) {
    return function() {
      var r = {};
      for (var k in m) {
        if (hasOwnProperty.call(m, k)) {
          r[k] = m[k];
        }
      }
      return r;
    };
  }
  var empty2 = {};
  function runST(f) {
    return f();
  }
  function _foldM(bind3) {
    return function(f) {
      return function(mz) {
        return function(m) {
          var acc = mz;
          function g(k2) {
            return function(z) {
              return f(z)(k2)(m[k2]);
            };
          }
          for (var k in m) {
            if (hasOwnProperty.call(m, k)) {
              acc = bind3(acc)(g(k));
            }
          }
          return acc;
        };
      };
    };
  }
  function toArrayWithKey(f) {
    return function(m) {
      var r = [];
      for (var k in m) {
        if (hasOwnProperty.call(m, k)) {
          r.push(f(k)(m[k]));
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
      return function(m) {
        return function() {
          m[k] = v;
          return m;
        };
      };
    };
  }

  // output/Foreign.Object/index.js
  var bindFlipped2 = /* @__PURE__ */ bindFlipped(bindST);
  var thawST = _copyST;
  var singleton2 = function(k) {
    return function(v) {
      return runST(bindFlipped2(poke2(k)(v))(newImpl));
    };
  };
  var mutate = function(f) {
    return function(m) {
      return runST(function __do() {
        var s = thawST(m)();
        f(s)();
        return s;
      });
    };
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
  var union = function(m) {
    return mutate(function(s) {
      return foldM1(function(s$prime) {
        return function(k) {
          return function(v) {
            return poke2(k)(v)(s$prime);
          };
        };
      })(s)(m);
    });
  };

  // output/Plum.View/index.js
  var show2 = /* @__PURE__ */ show(showInt);
  var append1 = /* @__PURE__ */ append(semigroupArray);
  var mempty2 = /* @__PURE__ */ mempty(monoidArray);
  var map2 = /* @__PURE__ */ map(functorArray);
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
  var semigroupSkin = {
    append: function(v) {
      return function(v1) {
        return union(v)(v1);
      };
    }
  };
  var append2 = /* @__PURE__ */ append(semigroupSkin);
  var semigroupMutation = {
    append: function(v) {
      return function(v1) {
        return {
          extraSkin: append2(v.extraSkin)(v1.extraSkin)
        };
      };
    }
  };
  var monoidSkin = {
    mempty: empty2,
    Semigroup0: function() {
      return semigroupSkin;
    }
  };
  var mempty1 = /* @__PURE__ */ mempty(monoidSkin);
  var foldMap3 = /* @__PURE__ */ foldMap2(monoidSkin);
  var monoidMutation = {
    mempty: {
      extraSkin: mempty1
    },
    Semigroup0: function() {
      return semigroupMutation;
    }
  };
  var mempty22 = /* @__PURE__ */ mempty(monoidMutation);
  var view = function(nerves) {
    return function(meat) {
      return function(bones) {
        return {
          nerves,
          meat,
          bones
        };
      };
    };
  };
  var sk = function(key) {
    return function(val) {
      return singleton2(key)(val);
    };
  };
  var length2 = function(v) {
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
    throw new Error("Failed pattern match at Plum.View (line 99, column 10 - line 102, column 17): " + [v.constructor.name]);
  };
  var skin = function(ctx) {
    return function(v) {
      if (v instanceof Spacing) {
        return sk("gap")(show2(v.value0) + ("px " + (show2(v.value1) + "px")));
      }
      ;
      if (v instanceof Explain) {
        return sk("border")("dashed magenta");
      }
      ;
      if (v instanceof Align) {
        if (ctx instanceof Generic) {
          return mempty1;
        }
        ;
        if (ctx instanceof Span) {
          return mempty1;
        }
        ;
        if (ctx instanceof Grid) {
          return sk(function() {
            if (v.value0 instanceof X) {
              return "justify-items";
            }
            ;
            if (v.value0 instanceof Y) {
              return "align-items";
            }
            ;
            throw new Error("Failed pattern match at Plum.View (line 70, column 9 - line 72, column 29): " + [v.value0.constructor.name]);
          }())(function() {
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
            throw new Error("Failed pattern match at Plum.View (line 74, column 9 - line 77, column 23): " + [v.value1.constructor.name]);
          }());
        }
        ;
        if (ctx instanceof Flexbox) {
          return sk(function() {
            var v1 = new Tuple(ctx.value0, v.value0);
            if (v1.value0 instanceof X && v1.value1 instanceof X) {
              return "justify-content";
            }
            ;
            if (v1.value0 instanceof X && v1.value1 instanceof Y) {
              return "align-items";
            }
            ;
            if (v1.value0 instanceof Y && v1.value1 instanceof X) {
              return "align-items";
            }
            ;
            if (v1.value0 instanceof Y && v1.value1 instanceof Y) {
              return "justify-content";
            }
            ;
            throw new Error("Failed pattern match at Plum.View (line 81, column 9 - line 85, column 38): " + [v1.constructor.name]);
          }())(function() {
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
            throw new Error("Failed pattern match at Plum.View (line 87, column 9 - line 90, column 28): " + [v.value1.constructor.name]);
          }());
        }
        ;
        throw new Error("Failed pattern match at Plum.View (line 66, column 26 - line 91, column 8): " + [ctx.constructor.name]);
      }
      ;
      if (v instanceof Width) {
        return sk("width")(length2(v.value0));
      }
      ;
      if (v instanceof Height) {
        return sk("height")(length2(v.value0));
      }
      ;
      if (v instanceof Wrapped) {
        if (ctx instanceof Flexbox) {
          return sk("flex-wrap")("wrap");
        }
        ;
        return mempty1;
      }
      ;
      throw new Error("Failed pattern match at Plum.View (line 63, column 12 - line 96, column 16): " + [v.constructor.name]);
    };
  };
  var h3 = function(el) {
    return function(v) {
      return function(children) {
        return h2(el)({
          styles: v
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
          return append2(foldMap3(skin(ctx))(append1(v1.meat)(append1(function() {
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
            throw new Error("Failed pattern match at Plum.View (line 128, column 16 - line 132, column 35): " + [ctx.constructor.name]);
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
            throw new Error("Failed pattern match at Plum.View (line 133, column 16 - line 137, column 37): " + [ctx.constructor.name]);
          }()))))(v.extraSkin);
        };
        if (v1.bones instanceof Text) {
          return h3("span")(skn(Span.value))([string(v1.bones.value0)]);
        }
        ;
        if (v1.bones instanceof Wrapper) {
          return h3("div")(append2(skn(new Flexbox(X.value)))(append2(sk("display")("flex"))(sk("flex-direction")("row"))))([growSkin(fire)(mempty22)(v1.bones.value0)]);
        }
        ;
        if (v1.bones instanceof Stack) {
          return h3("div")(append2(skn(Grid.value))(sk("display")("grid")))(map2(growSkin(fire)({
            extraSkin: append2(sk("grid-row")("1"))(sk("grid-column")("1"))
          }))(v1.bones.value0));
        }
        ;
        if (v1.bones instanceof Row) {
          return h3("div")(append2(skn(new Flexbox(X.value)))(append2(sk("display")("flex"))(sk("flex-direction")("row"))))(map2(growSkin(fire)(mempty22))(v1.bones.value0));
        }
        ;
        if (v1.bones instanceof Column) {
          return h3("div")(append2(skn(new Flexbox(Y.value)))(append2(sk("display")("flex"))(sk("flex-direction")("column"))))(map2(growSkin(fire)(mempty22))(v1.bones.value0));
        }
        ;
        throw new Error("Failed pattern match at Plum.View (line 140, column 5 - line 148, column 46): " + [v1.bones.constructor.name]);
      };
    };
  };
  var grow = function(fire) {
    return function(v) {
      return growSkin(fire)(mempty22)(v);
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
  var bind2 = /* @__PURE__ */ bind(bindEffect);
  var outerStyle = "html,body{height:100%;padding:0;margin:0;}";
  var run3 = function(id) {
    return function(plum2) {
      return function __do() {
        var modelRef = bind2(plum2.init)($$new)();
        var v = bind2(bind2(windowImpl)(document2))(function() {
          var $6 = getElementById(id);
          return function($7) {
            return $6(toNonElementParentNode($7));
          };
        }())();
        if (v instanceof Just) {
          var projector = createProjector();
          return replace(projector)(v.value0)(function __do2() {
            var model = read(modelRef)();
            var el = grow(function(msg) {
              return function __do3() {
                var m = read(modelRef)();
                var m_ = plum2.update(msg)(m)();
                return write(m_)(modelRef)();
              };
            })(plum2.view(model));
            return h2("div")({
              styles: {
                height: "100%",
                width: "100%"
              }
            })([el, h2("style")({})([string(outerStyle)])]);
          })();
        }
        ;
        if (v instanceof Nothing) {
          return unit;
        }
        ;
        throw new Error("Failed pattern match at Plum (line 25, column 92 - line 39, column 25): " + [v.constructor.name]);
      };
    };
  };

  // output/Main/index.js
  var pure2 = /* @__PURE__ */ pure(applicativeEffect);
  var map4 = /* @__PURE__ */ map(functorArray);
  var plum = {
    init: /* @__PURE__ */ pure2({
      text: "Test"
    }),
    view: function(model) {
      return view([])([Wrapped.value])(new Column(map4($$const(view([])([])(new Text("hello"))))(range2(1)(100))));
    },
    update: function(msg) {
      return function(model) {
        return pure2({
          text: "Button pressed"
        });
      };
    }
  };
  var main = /* @__PURE__ */ run3("plum")(plum);

  // <stdin>
  main();
})();
