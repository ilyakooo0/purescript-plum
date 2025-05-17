module Plum.View
  ( View
  , view
  , Nerve(..)
  , Meat(..)
  , Bones(..)
  , grow
  , Direction(..)
  , Alignment(..)
  , Length(..)
  ) where

import Prelude

import Data.Array as Array
import Data.Tuple.Nested ((/\))
import Effect (Effect)
import Foreign.Object (Object)
import Foreign.Object as Object
import Maquette (VNode, string)
import Maquette as Maquette

h :: String -> Skin -> Array VNode -> VNode
h el (Skin styles) children = Maquette.h el { styles } children

data Length = Px Int | Fill | Fit

data Alignment = Start | Center | End

data Direction = X | Y

data Meat
  = Spacing Int Int
  | Explain
  | Align Direction Alignment
  | Width Length
  | Height Length
  | Wrapped

data Nerve msg = OnClick msg

type View msg = { nerves :: Array (Nerve msg), meat :: Array Meat, bones :: Bones msg }

view :: forall msg. Array (Nerve msg) -> Array Meat -> Bones msg -> View msg
view nerves meat bones = { nerves, meat, bones }

newtype Skin = Skin (Object String)

sk :: String -> String -> Skin
sk key val = Skin $ Object.singleton key val

instance Semigroup Skin where
  append (Skin x) (Skin y) = Skin $ Object.union x y

instance Monoid Skin where
  mempty = Skin Object.empty

data Context = Grid | Flexbox Direction | Generic | Span

skin :: Context -> Meat -> Skin
skin ctx = case _ of
  Spacing x y -> sk "gap" (show x <> "px " <> show y <> "px")
  Explain -> sk "border" "dashed magenta"
  Align dir alignment -> case ctx of
    Generic -> mempty
    Span -> mempty
    Grid -> sk
      ( case dir of
          X -> "justify-items"
          Y -> "align-items"
      )
      ( case alignment of
          Start -> "start"
          Center -> "center"
          End -> "end"
      )

    Flexbox flexDir -> sk
      ( case flexDir /\ dir of
          X /\ X -> "justify-content"
          X /\ Y -> "align-items"
          Y /\ X -> "align-items"
          Y /\ Y -> "justify-content"
      )
      ( case alignment of
          Start -> "flex-start"
          Center -> "center"
          End -> "flex-end"
      )
  Width l -> sk "width" (length l)
  Height l -> sk "height" (length l)
  Wrapped -> case ctx of
    Flexbox _ -> sk "flex-wrap" "wrap"
    _ -> mempty

length :: Length -> String
length = case _ of
  Px px -> show px <> "px"
  Fit -> "fit-content"
  Fill -> "100%"

data Bones :: Type -> Type
data Bones msg
  = Column (Array (View msg))
  | Row (Array (View msg))
  | Stack (Array (View msg))
  | Wrapper (View msg)
  | Text String

newtype Mutation = Mutation { extraSkin :: Skin }

instance Semigroup Mutation where
  append (Mutation x) (Mutation y) = Mutation { extraSkin: x.extraSkin <> y.extraSkin }

instance Monoid Mutation where
  mempty = Mutation { extraSkin: mempty }

growSkin :: forall msg. (msg -> Effect Unit) -> Mutation -> View msg -> VNode
growSkin fire (Mutation mutation) { meat, bones } =
  let
    alignCenter = [ Align X Center, Align Y Center ]
    widthFill = [ Width Fill, Height Fill ]
    skn ctx =
      Array.foldMap (skin ctx)
        ( meat
            <> case ctx of
              Span -> mempty
              Grid -> widthFill
              Flexbox _ -> widthFill
              Generic -> widthFill
            <> case ctx of
              Grid -> alignCenter
              Flexbox _ -> alignCenter
              Span -> mempty
              Generic -> alignCenter
        ) <> mutation.extraSkin
  in
    case bones of
      Text t -> h "span" (skn Span) [ string t ]
      Wrapper x -> h "div" (skn (Flexbox X) <> sk "display" "flex" <> sk "flex-direction" "row") [ growSkin fire mempty x ]
      Stack children -> h "div" (skn Grid <> sk "display" "grid")
        (map (growSkin fire $ Mutation { extraSkin: sk "grid-row" "1" <> sk "grid-column" "1" }) children)
      Row children -> h "div" (skn (Flexbox X) <> sk "display" "flex" <> sk "flex-direction" "row")
        (map (growSkin fire mempty) children)
      Column children -> h "div" (skn (Flexbox Y) <> sk "display" "flex" <> sk "flex-direction" "column")
        (map (growSkin fire mempty) children)

grow :: forall msg. (msg -> Effect Unit) -> View msg -> VNode
grow fire v = growSkin fire mempty v
