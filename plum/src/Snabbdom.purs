module Snabbdom (h, VNode, init) where

import Prelude

import Data.Function.Uncurried (Fn4, runFn4)
import Effect (Effect)
import Effect.Uncurried (EffectFn2, runEffectFn2)
import Foreign.Object (Object)
import Literals.Undefined (Undefined)
import Untagged.Union (type (|+|))
import Web.DOM (Element)
import Web.Event.Event (Event)

foreign import data VNode :: Type

foreign import initWithModules :: Effect (EffectFn2 Element VNode VNode)

init :: Effect (Element -> VNode -> Effect VNode)
init = initWithModules <#> runEffectFn2

foreign import vnode :: forall props. Fn4 String (Record props) (Array VNode) (String |+| Undefined) VNode

h
  :: String
  -> { attrs :: Object String
     , on :: Object (Event -> Effect Unit)
     , style :: Object String
     }
  -> Array VNode
  -> (String |+| Undefined)
  -> VNode
h = runFn4 vnode
