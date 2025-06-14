module Main where

import Plum.View
import Prelude

import Effect (Effect)
import Plum as Plum

main :: Effect Unit
main = do
  Plum.run "plum" plum

type Model = { text :: String }

plum :: Plum.Plum Unit Model
plum =
  { init: pure { text: "Test" }
  , view: \model -> do
      stack do
        align Y End
        height Fit
        row do
          align Y End
          column do
            bgColor $ rgb 0.0 0.0 0.0
            height (Px 10)
          column mempty
          pure unit
        column do
          font "sans-serif"
          column do
            height (Px 100)
            width Fit
          align Y Start
          width Fill
          column $ do
            width Fill
            width Fit
            height Fit
            text "PureStack" do
              fontSize 72
              fontWeight 1000
            column do
              bgColor $ rgb 0.0 0.0 0.0
              height (Px 10)
              width Fill
        column do
          width Fill

  -- text "hi" do
  --   onHover do
  --     bgColor $ rgb 1.0 0.0 0.0
  --   onMouseDown $ do
  --     bgColor $ rgb 0.0 1.0 0.0
  -- text "hello" mempty
  , update: \msg model -> case msg of
      _ -> pure { text: "Button pressed" }
  }
