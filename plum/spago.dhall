{ name = "my-project"
, dependencies =
  [ "arrays"
  , "console"
  , "debug"
  , "effect"
  , "foreign-object"
  , "maybe"
  , "numbers"
  , "prelude"
  , "refs"
  , "strings-extra"
  , "typelevel-prelude"
  , "unsafe-coerce"
  , "untagged-union"
  , "web-dom"
  , "web-html"
  ]
, packages = ../packages.dhall
, sources = [ "src/**/*.purs", "test/**/*.purs" ]
}
