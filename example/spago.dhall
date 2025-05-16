{ name = "my-project"
, dependencies = [ "console", "effect", "prelude", "plum" ]
, packages = ../packages.dhall
, sources = [ "src/**/*.purs", "test/**/*.purs" ]
}
