module Main where

import Plum.View (Bones(..), view)
import Prelude

import Data.Array as Array
import Effect (Effect)
import Plum as Plum

main :: Effect Unit
main = do
  Plum.run "plum" plum

type Model = { text :: String }

plum :: Plum.Plum Unit Model
plum =
  { init: pure { text: "Test" }
  , view: \model ->
      view [] [] (Column $ Array.range 1 100 # map (const $ view [] [] (Text "hello")))
  , update: \msg model -> case msg of
      _ -> pure { text: "Button pressed" }
  }
