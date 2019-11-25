#!/bin/bash

if [ ! $1 ]; then
  echo "Error: you should pass version number"
else
  echo "[icons release]: creating version"
  yarn version --no-git-tag-version --new-version $1

  echo "[icons release]: build"
  yarn run build

  echo "[icons release]: commit"
  git add -A && git commit -m "v$1"

  echo "[icons release]: add tag"
  git tag -a "v$1" -m "v$1"

  echo "[icons release]: pushing updates"
  git push origin master

  echo "[icons release]: pushing new tag"
  git push origin "v$1"

  echo "[icons release]: publish to npm"
  yarn publish --non-interactive --access public
fi
