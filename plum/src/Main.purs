module Main where

import Prelude
import Web.HTML

import Data.Maybe (Maybe(..))
import Effect (Effect)
import Effect.Console (log)
import Maquette (createProjector, h, replace, scheduleRender, string)
import Plum as Plum
import Plum.View (button, s)
import Plum.View as V
import Web.DOM.NonElementParentNode as Web
import Web.HTML as Web
import Web.HTML.HTMLDocument as Web
import Web.HTML.Window as Web

main :: Effect Unit
main = do
  Plum.run "plum" plum

type Model = { text :: String }

plum :: Plum.Plum Unit Model
plum =
  { init: pure { text: "Test" }
  , view: \model ->
      V.row [ V.spacing 16 ]
        [ s model.text
        , button [] { onPress: unit, view: s "Button" }
        ]
  , update: \msg model -> case msg of
      _ -> pure { text: "Button pressed" }
  }
