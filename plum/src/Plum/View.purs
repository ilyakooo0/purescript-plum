module Plum.View
  ( View
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

import Control.Monad.Writer (Writer, runWriter, tell)
import Data.Array as Array
import Data.Int as Int
import Data.Maybe (Maybe(..))
import Data.Maybe as Maybe
import Data.Traversable (traverse)
import Data.Tuple.Nested (type (/\), (/\))
import Effect (Effect)
import Foreign.Object (Object)
import Foreign.Object as Object
import Maquette (VNode, string)
import Maquette as Maquette
import Record.Unsafe.Union as Record
import Web.HTML (ClassName)

type GenericUIView children msg =
  { nerves :: Array (Nerve msg)
  , meat :: Array Meat
  , hover :: Array Meat
  , down :: Array Meat
  , children :: children
  }

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
column (UI { nerves, meat, hover, down, children } a) =
  UI (mempty :: UIView msg) { children = [ { meat, nerves, hover, down } /\ Column children ] } a

row :: forall msg a. UI msg a -> UI msg a
row (UI { nerves, meat, hover, down, children } a) =
  UI (mempty :: UIView msg) { children = [ { meat, nerves, hover, down } /\ Row children ] } a

stack :: forall msg a. UI msg a -> UI msg a
stack (UI { nerves, meat, hover, down, children } a) =
  UI (mempty :: UIView msg) { children = [ { meat, nerves, hover, down } /\ Stack children ] } a

text :: forall msg. String -> GenericUI Unit msg Unit -> UI msg Unit
text s (UI { nerves, meat, hover, down } a) = UI (mempty :: UIView msg) { children = [ { meat, nerves, hover, down } /\ Text s ] } a

link :: forall msg a. String -> UI msg a -> UI msg a
link url (UI { nerves, meat, hover, down, children } a) = UI
  (mempty :: UIView msg)
    { children =
        [ { meat
          , nerves
          , hover
          , down
          } /\ Link url { newTab: false } (Maybe.fromMaybe none $ Array.head children)
        ]
    }
  a

el :: forall msg a. UI msg a -> UI msg a
el (UI { nerves, meat, down, hover, children } a) = UI
  (mempty :: UIView msg)
    { children =
        [ { meat
          , nerves
          , hover
          , down
          } /\ Wrapper (Maybe.fromMaybe none $ Array.head children)
        ]
    }
  a

newTabLink :: forall msg a. String -> UI msg a -> UI msg a
newTabLink url (UI { nerves, meat, hover, down, children } a) = UI
  (mempty :: UIView msg)
    { children =
        [ { meat
          , nerves
          , hover
          , down
          } /\ Link url { newTab: true } (Maybe.fromMaybe none $ Array.head children)
        ]
    }
  a

download :: forall msg a. String -> UI msg a -> UI msg a
download url (UI { nerves, meat, children, down, hover } a) = UI
  (mempty :: UIView msg)
    { children =
        [ { meat
          , nerves
          , down
          , hover
          } /\ Download url { filename: Nothing } (Maybe.fromMaybe none $ Array.head children)
        ]
    }
  a

downloadAs :: forall msg a. String -> { filename :: String } -> UI msg a -> UI msg a
downloadAs url { filename } (UI { nerves, meat, hover, down, children } a) = UI
  (mempty :: UIView msg)
    { children =
        [ { meat
          , nerves
          , hover
          , down
          } /\ Download url { filename: Just filename } (Maybe.fromMaybe none $ Array.head children)
        ]
    }
  a

image :: forall msg a. String -> { description :: String } -> GenericUI Unit msg a -> UI msg a
image url description (UI { nerves, meat, hover, down } a) =
  UI (mempty :: UIView msg) { children = [ { meat, nerves, hover, down } /\ Image url description ] } a

h :: String -> Classes -> Array VNode -> VNode
h elem classes children = Maquette.h elem { class: Array.intercalate " " classes } children

hWith :: forall props. String -> Record props -> Classes -> Array VNode -> VNode
hWith elem props classes children = Maquette.h elem (Record.unsafeUnion props { class: Array.intercalate " " classes }) children

data Length = Px Int | Fill | Fit | Max Int Length | Min Int Length

data Alignment = Start | Center | End

data Direction = X | Y

m :: forall ch msg a. Monoid ch => Monoid a => Meat -> GenericUI ch msg a
m meat = UI (mempty :: GenericUIView ch msg) { meat = [ meat ] } mempty

spacing :: forall ch msg a. Monoid ch => Monoid a => { x :: Int, y :: Int } -> GenericUI ch msg a
spacing { x, y } = m $ Spacing x y

explain :: forall ch msg a. Monoid ch => Monoid a => GenericUI ch msg a
explain = m Explain

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

type View msg = { nerves :: Array (Nerve msg), meat :: Array Meat, hover :: Array Meat, down :: Array Meat } /\ Bones msg

none :: forall msg. View msg
none = mempty /\ None

newtype Skin = Skin (Object String)

sk :: String -> String -> String -> Writer SkinGrowth Classes
sk cName key value = do
  tell $ SkinGrowth $ Object.singleton cName { key, value }
  pure [ cName ]

instance Semigroup Skin where
  append (Skin x) (Skin y) = Skin $ Object.union x y

instance Monoid Skin where
  mempty = Skin Object.empty

data Context = Grid | Flexbox Direction | Generic | Span

skin :: Context -> Meat -> Writer SkinGrowth Classes
skin ctx = case _ of
  Spacing x y -> sk ("spacing-" <> show x <> "-" <> show y) "gap" (show x <> "px " <> show y <> "px")
  Explain -> sk "explain" "border" "dashed magenta"
  Align dir alignment -> case ctx of
    Generic -> mempty
    Span -> mempty
    Grid ->
      let
        k =
          ( case dir of
              X -> "justify-items"
              Y -> "align-items"
          )
        v =
          ( case alignment of
              Start -> "start"
              Center -> "center"
              End -> "end"
          )
      in
        sk ("align-grid-" <> k <> "-" <> v) k v

    Flexbox flexDir ->
      let
        k =
          ( case flexDir /\ dir of
              X /\ X -> "justify-content"
              X /\ Y -> "align-items"
              Y /\ X -> "align-items"
              Y /\ Y -> "justify-content"
          )

        v =
          ( case alignment of
              Start -> "flex-start"
              Center -> "center"
              End -> "flex-end"
          )
      in
        sk ("align-flexbox-" <> k <> "-" <> v) k v
  Width l -> sk ("width-" <> renderKey l) "width" (render l)
  Height l -> sk ("width-" <> renderKey l) "height" (render l)
  Wrapped -> case ctx of
    Flexbox _ -> sk "wrapped" "flex-wrap" "wrap"
    _ -> pure []
  BackgroundColor color -> sk ("bg-color-" <> renderKey color) "background-color" (render color)
  Padding { top, right, bottom, left } ->
    sk
      ("padding-" <> show top <> "-" <> show right <> "-" <> show bottom <> "-" <> show left)
      "padding"
      (show top <> "px " <> show right <> "px " <> show bottom <> "px " <> show left <> "px")
  Spread -> case ctx of
    Flexbox _ -> sk "spread" "justify-content" "space-between"
    _ -> pure []
  Opacity o -> sk ("opacity-" <> show o) "opacity" (show o)
  Pointer -> sk "pointer" "cursor" "pointer"
  Move { x, y } -> sk ("move-" <> show x <> "-" <> show y) "transform" ("translate(" <> show x <> "px, " <> show y <> "px)")
  Clip X -> sk "clip-x" "overflow-x" "hidden"
  Clip Y -> sk "clip-y" "overflow-y" "hidden"

class Renderable x where
  render :: x -> String
  renderKey :: x -> String

instance Renderable Length where
  render = case _ of
    Px px -> show px <> "px"
    Fit -> "fit-content"
    Fill -> "100%"
    Max px l -> "max(" <> show px <> "px," <> render l <> ")"
    Min px l -> "min(" <> show px <> "px," <> render l <> ")"
  renderKey = case _ of
    Px px -> show px
    Fit -> "fit-content"
    Fill -> "fill"
    Max px l -> "max-" <> show px <> "-" <> renderKey l
    Min px l -> "min-" <> show px <> "-" <> renderKey l

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
  renderKey (Color { r, g, b, a }) = show r <> "-" <> show g <> "-" <> show b <> "-" <> show a

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

type Classes = Array String

newtype Mutation = Mutation { extraSkin :: Classes }

instance Semigroup Mutation where
  append (Mutation x) (Mutation y) = Mutation { extraSkin: x.extraSkin <> y.extraSkin }

instance Monoid Mutation where
  mempty = Mutation { extraSkin: mempty }

newtype SkinGrowth = SkinGrowth (Object { key :: String, value :: String })

styleSkinGrowth :: SkinGrowth -> String
styleSkinGrowth (SkinGrowth o) =
  Object.foldMap (\className { key, value } -> "." <> className <> "{" <> key <> ":" <> value <> ";}") o

instance Semigroup SkinGrowth where
  append (SkinGrowth x) (SkinGrowth y) = SkinGrowth $ Object.union x y

instance Monoid SkinGrowth where
  mempty = SkinGrowth Object.empty

growSkin :: forall msg. (msg -> Effect Unit) -> Mutation -> View msg -> Writer SkinGrowth VNode
growSkin fire (Mutation mutation) ({ meat, hover, down, nerves } /\ bones) = do
  let
    alignCenter = [ Align X Center, Align Y Center ]
    widthFill = [ Width Fill, Height Fill ]
    skn ctx =
      ((_ <> mutation.extraSkin) <<< Array.concat) <$> traverse (skin ctx)
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
        )

  case bones of
    Text t -> (\c -> h "span" c [ string t ]) <$> (skn Span)
    Wrapper x -> do
      classes <- (skn (Flexbox X) <> sk "display-flex" "display" "flex" <> sk "flex-direction-row" "flex-direction" "row")
      x' <- growSkin fire mempty x
      pure $ h "div" classes [ x' ]
    Stack children -> do
      classes <- (skn Grid <> sk "display-grid" "display" "grid")
      extraSkin <- sk "grid-row-1" "grid-row" "1" <> sk "grid-column-1" "grid-column" "1"
      children' <- (traverse (growSkin fire $ Mutation { extraSkin }) children)
      pure $ h "div" classes children'

    Row children -> do
      classes <- (skn (Flexbox X) <> sk "display-flex" "display" "flex" <> sk "flex-direction-row" "flex-direction" "row")
      children' <- traverse (growSkin fire mempty) children
      pure $ h "div" classes children'
    Column children -> do
      classes <- (skn (Flexbox Y) <> sk "display-flex" "display" "flex" <> sk "flex-direction-column" "flex-direction" "column")
      children' <- traverse (growSkin fire mempty) children
      pure $ h "div" classes children'
    Link href { newTab } child -> do
      classes <- (skn (Flexbox X) <> sk "display-flex" "display" "flex" <> sk "flex-direction-row" "flex-direction" "row")
      child' <- growSkin fire mempty child
      pure $ hWith "a"
        { href
        , rel: "noopener noreferrer"
        , target: if newTab then "_blank" else "_self"
        }
        classes
        [ child' ]

    Download href { filename } child -> do
      classes <- (skn (Flexbox X) <> sk "display-flex" "display" "flex" <> sk "flex-direction-row" "flex-direction" "row")
      child' <- growSkin fire mempty child
      pure $ hWith "a"
        { href
        , download: Maybe.fromMaybe "" filename
        }
        classes
        [ child' ]
    Image src { description } -> (\c -> hWith "img" { src, alt: description } c []) <$> (skn Generic)
    None -> pure $ h "div" mempty []

grow :: forall msg. (msg -> Effect Unit) -> View msg -> { node :: VNode, style :: String }
grow fire v =
  let
    node /\ skinGrowth = runWriter (growSkin fire mempty v)
  in
    { node, style: styleSkinGrowth skinGrowth }
