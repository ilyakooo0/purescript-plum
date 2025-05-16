module Plum (Plum, run) where

import Prelude

import Data.Maybe (Maybe(..))
import Effect (Effect)
import Effect.Ref as Ref
import Maquette as Maquette
import Plum.View (View, unView)
import Web.DOM.NonElementParentNode (getElementById) as Web
import Web.HTML (window) as Web
import Web.HTML.HTMLDocument (toNonElementParentNode) as Web
import Web.HTML.Window (document) as Web

type Plum msg model =
  { init :: Effect model
  , update :: msg -> model -> Effect model
  , view :: model -> View msg
  }

run :: forall msg model. String -> Plum msg model -> Effect Unit
run id plum = do
  modelRef <- plum.init >>= Ref.new
  Web.window >>= Web.document >>= Web.getElementById id <<< Web.toNonElementParentNode >>= case _ of
    Just element -> do
      projector <- Maquette.createProjector
      Maquette.replace projector element do
        model <- Ref.read modelRef
        pure $ unView (plum.view model)
          ( \msg -> do
              m <- Ref.read modelRef
              m_ <- plum.update msg m
              Ref.write m_ modelRef
          )

    Nothing -> pure unit
