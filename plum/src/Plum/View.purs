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
  , Color(..)
  , rgb255
  , rgba255
  , rgb
  , rgba
  , UI
  , GenericUI(..)
  , GenericUIView
  , column
  , row
  , stack
  , text
  , link
  , newTabLink
  , el
  , download
  , downloadAs
  , image
  , spacing
  , explain
  ) where

import Prelude

import Data.Array as Array
import Data.Int as Int
import Data.Maybe (Maybe(..))
import Data.Maybe as Maybe
import Data.Tuple.Nested ((/\))
import Effect (Effect)
import Foreign.Object (Object)
import Foreign.Object as Object
import Maquette (VNode, string)
import Maquette as Maquette
import Record as Record
import Record.Unsafe.Union as Record

type GenericUIView children msg = { nerves :: Array (Nerve msg), meat :: Array Meat, children :: children }

type UIView msg = GenericUIView (Array (View msg)) msg

data GenericUI children msg a = UI (GenericUIView children msg) a

instance (Semigroup children, Semigroup a) => Semigroup (GenericUI children msg a) where
  append (UI v a) (UI v' a') = UI (v <> v') (a <> a')

instance (Monoid children, Monoid a) => Monoid (GenericUI children msg a) where
  mempty = UI mempty mempty

type UI msg a = GenericUI (Array (View msg)) msg a

instance Functor (GenericUI children msg) where
  map f (UI v a) = UI v $ f a

instance Monoid children => Apply (GenericUI children msg) where
  apply (UI views f) (UI views' a) = UI (views <> views') (f a)

instance Monoid children => Applicative (GenericUI children msg) where
  pure = UI mempty

instance Monoid children => Bind (GenericUI children msg) where
  bind (UI views a) f =
    let
      UI views' b = f a
    in
      UI (views <> views') b

instance Monoid children => Monad (GenericUI children msg)

column :: forall msg a. UI msg a -> UI msg a
column (UI { nerves, meat, children } a) =
  UI (mempty :: UIView msg) { children = [ { meat, nerves, bones: Column children } ] } a

row :: forall msg a. UI msg a -> UI msg a
row (UI { nerves, meat, children } a) =
  UI (mempty :: UIView msg) { children = [ { meat, nerves, bones: Row children } ] } a

stack :: forall msg a. UI msg a -> UI msg a
stack (UI { nerves, meat, children } a) =
  UI (mempty :: UIView msg) { children = [ { meat, nerves, bones: Stack children } ] } a

text :: forall msg. String -> GenericUI Unit msg Unit -> UI msg Unit
text s (UI { nerves, meat } a) = UI (mempty :: UIView msg) { children = [ { meat, nerves, bones: Text s } ] } a

link :: forall msg a. String -> UI msg a -> UI msg a
link url (UI { nerves, meat, children } a) = UI
  (mempty :: UIView msg)
    { children =
        [ { meat
          , nerves
          , bones: Link url { newTab: false } (Maybe.fromMaybe none $ Array.head children)
          }
        ]
    }
  a

el :: forall msg a. UI msg a -> UI msg a
el (UI { nerves, meat, children } a) = UI
  (mempty :: UIView msg)
    { children =
        [ { meat
          , nerves
          , bones: Wrapper (Maybe.fromMaybe none $ Array.head children)
          }
        ]
    }
  a

newTabLink :: forall msg a. String -> UI msg a -> UI msg a
newTabLink url (UI { nerves, meat, children } a) = UI
  (mempty :: UIView msg)
    { children =
        [ { meat
          , nerves
          , bones: Link url { newTab: true } (Maybe.fromMaybe none $ Array.head children)
          }
        ]
    }
  a

download :: forall msg a. String -> UI msg a -> UI msg a
download url (UI { nerves, meat, children } a) = UI
  (mempty :: UIView msg)
    { children =
        [ { meat
          , nerves
          , bones: Download url { filename: Nothing } (Maybe.fromMaybe none $ Array.head children)
          }
        ]
    }
  a

downloadAs :: forall msg a. String -> { filename :: String } -> UI msg a -> UI msg a
downloadAs url { filename } (UI { nerves, meat, children } a) = UI
  (mempty :: UIView msg)
    { children =
        [ { meat
          , nerves
          , bones: Download url { filename: Just filename } (Maybe.fromMaybe none $ Array.head children)
          }
        ]
    }
  a

image :: forall msg a. String -> { description :: String } -> GenericUI Unit msg a -> UI msg a
image url description (UI { nerves, meat } a) =
  UI (mempty :: UIView msg) { children = [ { meat, nerves, bones: Image url description } ] } a

h :: String -> Skin -> Array VNode -> VNode
h elem (Skin styles) children = Maquette.h elem { styles } children

hWith :: forall props. String -> Record props -> Skin -> Array VNode -> VNode
hWith elem props (Skin styles) children = Maquette.h elem (Record.unsafeUnion props { styles }) children

data Length = Px Int | Fill | Fit | Max Int Length | Min Int Length

data Alignment = Start | Center | End

data Direction = X | Y

meat :: forall ch msg a. Monoid ch => Monoid a => Meat -> GenericUI ch msg a
meat m = UI (mempty :: GenericUIView ch msg) { meat = [ m ] } mempty

spacing :: forall ch msg a. Monoid ch => Monoid a => { x :: Int, y :: Int } -> GenericUI ch msg a
spacing { x, y } = meat $ Spacing x y

explain :: forall ch msg a. Monoid ch => Monoid a => GenericUI ch msg a
explain = meat Explain

data Meat
  = Spacing Int Int
  | Explain
  | Align Direction Alignment
  | Width Length
  | Height Length
  | Wrapped
  | BackgroundColor Color
  | Padding { top :: Int, right :: Int, bottom :: Int, left :: Int }
  | Spread
  | Opacity Number
  | Pointer
  | Move { x :: Int, y :: Int }
  | Clip Direction

data Nerve msg = OnClick msg

type View msg = { nerves :: Array (Nerve msg), meat :: Array Meat, bones :: Bones msg }

none :: forall msg. View msg
none = { nerves: [], meat: [], bones: None }

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
  Width l -> sk "width" (render l)
  Height l -> sk "height" (render l)
  Wrapped -> case ctx of
    Flexbox _ -> sk "flex-wrap" "wrap"
    _ -> mempty
  BackgroundColor color -> sk "background-color" (render color)
  Padding { top, right, bottom, left } ->
    sk "padding" (show top <> "px " <> show right <> "px " <> show bottom <> "px " <> show left <> "px")
  Spread -> case ctx of
    Flexbox _ -> sk "justify-content" "space-between"
    _ -> mempty
  Opacity o -> sk "opacity" (show o)
  Pointer -> sk "cursor" "pointer"
  Move { x, y } -> sk "transform" ("translate(" <> show x <> "px, " <> show y <> ")")
  Clip X -> sk "overflow-x" "hidden"
  Clip Y -> sk "overflow-y" "hidden"

class Renderable x where
  render :: x -> String

instance Renderable Length where
  render = case _ of
    Px px -> show px <> "px"
    Fit -> "fit-content"
    Fill -> "100%"
    Max px l -> "max(" <> show px <> "px," <> render l <> ")"
    Min px l -> "min(" <> show px <> "px," <> render l <> ")"

newtype Color = Color { r :: Int, g :: Int, b :: Int, a :: Number }

rgb255 :: Int -> Int -> Int -> Color
rgb255 r g b = Color { r, g, b, a: 1.0 }

rgba255 :: Int -> Int -> Int -> Number -> Color
rgba255 r g b a = Color { r, g, b, a }

rgb :: Number -> Number -> Number -> Color
rgb r g b = Color { r: Int.round (r * 255.0), g: Int.round (g * 255.0), b: Int.round (b * 255.0), a: 1.0 }

rgba :: Number -> Number -> Number -> Number -> Color
rgba r g b a = Color { r: Int.round (r * 255.0), g: Int.round (g * 255.0), b: Int.round (b * 255.0), a }

instance Renderable Color where
  render (Color { r, g, b, a }) = "rgba(" <> show r <> "," <> show g <> "," <> show b <> "," <> show a <> ")"

data Bones :: Type -> Type
data Bones msg
  = Column (Array (View msg))
  | Row (Array (View msg))
  | Stack (Array (View msg))
  | Wrapper (View msg)
  | Text String
  | Link String { newTab :: Boolean } (View msg)
  | Download String { filename :: Maybe String } (View msg)
  | Image String { description :: String }
  | None

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
      Link href { newTab } child -> hWith "a"
        { href
        , rel: "noopener noreferrer"
        , target: if newTab then "_blank" else "_self"
        }
        (skn (Flexbox X) <> sk "display" "flex" <> sk "flex-direction" "row")
        [ growSkin fire mempty child ]

      Download href { filename } child -> hWith "a"
        { href
        , download: Maybe.fromMaybe "" filename
        }
        (skn (Flexbox X) <> sk "display" "flex" <> sk "flex-direction" "row")
        [ growSkin fire mempty child ]
      Image src { description } -> hWith "img" { src, alt: description } (skn Generic) []
      None -> h "div" mempty []

grow :: forall msg. (msg -> Effect Unit) -> View msg -> VNode
grow fire v = growSkin fire mempty v
