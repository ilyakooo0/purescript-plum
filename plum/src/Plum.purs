module Plum (Plum, run) where

import Prelude

import Data.Array ((:))
import Data.Array as Array
import Data.Function.Uncurried (runFn2)
import Data.Maybe (Maybe(..))
import Effect (Effect)
import Effect.Console (log)
import Effect.Ref as Ref
import Foreign.Object as Object
import Literals.Undefined (undefined)
import Plum.View (GenericUI(..), UI, grow)
import Snabbdom as Snabbdom
import Untagged.Union (asOneOf)
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
  initModel <- plum.init
  modelRef <- Ref.new initModel
  Web.window >>= Web.document >>= Web.getElementById id <<< Web.toNonElementParentNode >>= case _ of
    Just element -> do
      patch <- Snabbdom.init
      let
        view model = do
          let UI { children } _ = plum.view model
          case Array.uncons children of
            Just { head: child } -> do
              let
                { node, style } = grow
                  ( \msg -> do
                      m <- Ref.read modelRef
                      m_ <- plum.update msg m
                      Ref.write m_ modelRef
                      node <- view m_
                      _ <- patch element node
                      pure unit
                  )
                  child
              pure $
                Snabbdom.h "div"
                  { attrs: Object.empty
                  , on: Object.empty
                  , style: Object.empty
                  }
                  [ Snabbdom.h "style"
                      { attrs: Object.empty
                      , on: Object.empty
                      , style: Object.empty
                      }
                      []
                      (asOneOf $ outerStyle <> style)
                  , node
                  ]
                  (asOneOf undefined)
            Nothing -> pure $
              Snabbdom.h "div"
                { attrs: Object.empty
                , on: Object.empty
                , style: Object.empty
                }
                []
                (asOneOf undefined)
      node <- view initModel
      _ <- patch element node

      pure unit
    Nothing -> pure unit

outerStyle :: String
outerStyle = "html,body{height:100%;padding:0;margin:0;}"
