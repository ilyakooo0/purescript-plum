module Plum.View
  ( View
  , unView
  , Attribute
  , spacing
  , row
  , wrappedRow
  , column
  , wrappedColumn
  , v
  , s
  , button
  ) where

import Prelude

import Data.Array as Array
import Effect (Effect)
import Foreign.Object (Object)
import Foreign.Object as Object
import Maquette (VNode, h, string)
import Type.Row.Homogeneous (class Homogeneous)
import Unsafe.Coerce (unsafeCoerce)

newtype View :: Type -> Type
newtype View msg = View ((msg -> Effect Unit) -> VNode)

unView :: forall msg. View msg -> (msg -> Effect Unit) -> VNode
unView (View node) = node

data Attribute msg =
  Spacing Int Int

spacing :: forall msg. Int -> Attribute msg
spacing x = Spacing x x

data Context = Flexbox

newtype RenderedAttribute = RenderedAttribute { styles :: Object String }

instance Semigroup RenderedAttribute where
  append (RenderedAttribute x) (RenderedAttribute y) =
    RenderedAttribute { styles: Object.union x.styles y.styles }

instance Monoid RenderedAttribute where
  mempty = RenderedAttribute $ { styles: Object.empty }

renderAttribute :: forall msg. Context -> Attribute msg -> RenderedAttribute
renderAttribute _ctx attr = RenderedAttribute $ case attr of
  Spacing x y -> { styles: Object.insert "gap" (show x <> "px " <> show y <> "px") Object.empty }

renderWithStyles :: forall styles msg. Homogeneous styles String => Context -> Array (Attribute msg) -> { | styles } -> RenderedAttribute
renderWithStyles ctx attrs styles = withStyles (renderAttributes ctx attrs) styles

withStyles :: forall styles. Homogeneous styles String => RenderedAttribute -> { | styles } -> RenderedAttribute
withStyles (RenderedAttribute x) styles =
  RenderedAttribute $ { styles: Object.union x.styles (Object.fromHomogeneous styles) }

renderAttributes :: forall msg. Context -> Array (Attribute msg) -> RenderedAttribute
renderAttributes ctx = Array.foldMap (renderAttribute ctx)

v :: forall msg. Array (Attribute msg) -> View msg -> View msg
v _ (View child) = View $ \fire -> h "div" {} [ child fire ]

row :: forall msg. Array (Attribute msg) -> Array (View msg) -> View msg
row attrs children =
  _v "div"
    ( renderWithStyles Flexbox attrs
        { display: "flex"
        , "flex-direction": "row"
        }
    )
    children

wrappedRow :: forall msg. Array (Attribute msg) -> Array (View msg) -> View msg
wrappedRow attrs children =
  _v "div"
    ( renderWithStyles Flexbox attrs
        { display: "flex"
        , "flex-direction": "row"
        , "flex-wrap": "wrap"
        }
    )
    children

column :: forall msg. Array (Attribute msg) -> Array (View msg) -> View msg
column attrs children =
  _v "div"
    ( renderWithStyles Flexbox attrs
        { display: "flex"
        , "flex-direction": "column"
        }
    )
    children

wrappedColumn :: forall msg. Array (Attribute msg) -> Array (View msg) -> View msg
wrappedColumn attrs children =
  _v "div"
    ( renderWithStyles Flexbox attrs
        { display: "flex"
        , "flex-direction": "column"
        , "flex-wrap": "wrap"
        }
    )
    children

button :: forall msg. Array (Attribute msg) -> { onPress :: msg, view :: View msg } -> View msg
button _ { onPress, view } = View $ \fire -> h "div" { onclick: fire onPress } [ unView view fire ]

s :: forall msg. String -> View msg
s x = View $ \_ -> string x

_v :: forall msg. String -> RenderedAttribute -> Array (View msg) -> View msg
_v el attr children = View $ \fire -> h el (unsafeCoerce attr) (map (\(View f) -> f fire) children)
