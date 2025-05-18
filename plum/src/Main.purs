module Main where

import Prelude

import Data.Array as Array
import Effect (Effect)
import Plum as Plum
import Plum.View (Bones(..), Meat(..), rgb, view)

main :: Effect Unit
main = do
  Plum.run "plum" plum

type Model = { text :: String }

plum :: Plum.Plum Unit Model
plum =
  { init: pure { text: "Test" }
  , view: \model ->
      view [] []
        ( Column
            [ view [] [] (Link "https://iko.soy" { newTab: false } $ view [] [] (Text "my website"))
            , view [] [] (Row $ Array.range 1 100 # map (const $ view [] [ BackgroundColor (rgb 1.0 0.0 0.0) ] (Text "hello")))
            ]
        )
  , update: \msg model -> case msg of
      _ -> pure { text: "Button pressed" }
  }
