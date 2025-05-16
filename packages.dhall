let upstream =
      https://github.com/purescript/package-sets/releases/download/psc-0.15.15-20250506/packages.dhall
        sha256:6334d33a0be43ed68478323e8210bd64437acbd824bf270c2f9f6cb232bf782a

in  upstream
  with plum = ./plum/spago.dhall as Location
