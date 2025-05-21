module Plum (Plum, run) where

import Prelude

import Data.Array ((:))
import Data.Maybe (Maybe(..))
import Effect (Effect)
import Effect.Ref as Ref
import Maquette as Maquette
import Plum.View (UI, UIWith(..), grow)
import Web.DOM.NonElementParentNode (getElementById) as Web
import Web.HTML (window) as Web
import Web.HTML.HTMLDocument (toNonElementParentNode) as Web
import Web.HTML.Window (document) as Web

type Plum msg model =
  { init :: Effect model
  , update :: msg -> model -> Effect model
  , view :: model -> UI msg Unit
  }

run :: forall msg model. String -> Plum msg model -> Effect Unit
run id plum = do
  modelRef <- plum.init >>= Ref.new
  Web.window >>= Web.document >>= Web.getElementById id <<< Web.toNonElementParentNode >>= case _ of
    Just element -> do
      projector <- Maquette.createProjector
      Maquette.replace projector element do
        model <- Ref.read modelRef
        let
          el = map
            ( grow
                ( \msg -> do
                    m <- Ref.read modelRef
                    m_ <- plum.update msg m
                    Ref.write m_ modelRef
                    Maquette.scheduleRender projector
                )
            )
            (let UI { children } _ = plum.view model in children)
        pure $ Maquette.h
          "div"
          { styles: { height: "100%", width: "100%" } }
          (Maquette.h "style" {} [ Maquette.string outerStyle ] : el)
    Nothing -> pure unit

outerStyle :: String
outerStyle = "html,body{height:100%;padding:0;margin:0;}"
