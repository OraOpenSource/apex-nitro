@echo off

set /P vProject=Enter project: 

start "APEX Front-End Boost - %vProject%" npm start -- --project=%vProject%
