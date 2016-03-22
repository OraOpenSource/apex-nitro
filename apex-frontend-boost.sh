#!/bin/bash

# Find location of script
# Taken from: https://github.com/OraOpenSource/OXAR/blob/master/build.sh
OOS_SOURCE="${BASH_SOURCE[0]}"
while [ -h "$OOS_SOURCE" ]; do # resolve $OOS_SOURCE until the file is no longer a symlink
  OOS_SOURCE_DIR="$( cd -P "$( dirname "$OOS_SOURCE" )" && pwd )"
  OOS_SOURCE="$(readlink "$OOS_SOURCE")"
  [[ $OOS_SOURCE != /* ]] && OOS_SOURCE="$OOS_SOURCE_DIR/$OOS_SOURCE" # if $OOS_SOURCE was a relative symlink, we need to resolve it relative to the path where the symlink file was located
done
OOS_SOURCE_DIR="$( cd -P "$( dirname "$OOS_SOURCE" )" && pwd )"

PROMPT_TEXT="Enter project: "

while true; do

echo $PROMPT_TEXT
read PROJECT_NAME

if ! [ -z "$PROJECT_NAME" ]; then
  echo "Launching APEX Front-End Boost for project: $PROJECT_NAME"
  cd $OOS_SOURCE_DIR
  npm start -- --project=$PROJECT_NAME
  break;
else
  echo "Need to specify a project name, try again."
fi

done
