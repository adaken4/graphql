#!/bin/bash
# Usage: ./pushnewbranch.sh <branch-name>
# Pushes a new branch to both origin and github with upstream tracking

if [ -z "$1" ]; then
  echo "Usage: $0 <branch-name>"
  exit 1
fi

branch=$1

# Push to origin and set upstream
git push -u origin "$branch"

# Push to github (no -u needed, we only need one upstream)
git push github "$branch"