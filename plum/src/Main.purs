module Main where

import Prelude

import Data.Array as Array
import Effect (Effect)
import Plum as Plum
import Plum.View

main :: Effect Unit
main = do
  Plum.run "plum" plum

type Model = { text :: String }

plum :: Plum.Plum Unit Model
plum =
  { init: pure { text: "Test" }
  , view: \model -> do
      column $ do
        text "hi" mempty
        text "hello" mempty
  , update: \msg model -> case msg of
      _ -> pure { text: "Button pressed" }
  }
