#!/bin/bash

if [ -z "$PORT" ]; then
  PORT=8088
fi
if [ -z "$LOGLEVEL" ]; then
  LOGLEVEL=trace
fi
if [ -z "$PACKAGE" ]; then
  PACKAGE=log.com.tripco
fi
printf "java -Dorg.slf4j.simpleLogger.$PACKAGE=$LOGLEVEL -jar target/server-*.jar $PORT\n\n"
java -Dorg.slf4j.simpleLogger.$PACKAGE=$LOGLEVEL -jar target/server-*.jar $PORT