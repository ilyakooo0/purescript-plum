module Maquette
  ( Projector
  , createProjector
  , string
  , VNode
  , h
  , replace
  , scheduleRender
  ) where

import Prelude

import Effect (Effect)
import Unsafe.Coerce (unsafeCoerce)
import Web.DOM (Element)

foreign import data Projector :: Type

foreign import createProjector :: Effect Projector

foreign import data VNode :: Type

foreign import _h :: forall props. String -> { | props } -> Array VNode -> VNode

h :: forall props. String -> Record props -> Array VNode -> VNode
h = _h

string :: String -> VNode
string = unsafeCoerce

foreign import scheduleRender :: Projector -> Effect Unit

foreign import replace :: Projector -> Element -> Effect VNode -> Effect Unit
