@echo off
setlocal

set "batchFilePath=%~dp0"

if "%1"=="r" (
  start "React Native Web App" cmd /k "cd %batchFilePath%\web && npm start"
) else if "%1"=="m" (
  start "Dummy API" cmd /k "cd %batchFilePath%\mockup-api && npm start"
) else if "%1"=="-h" (
  echo Usage: start.bat [r^|m^|-h]
) else if "%1"=="--help" (
  echo Usage: start.bat [r^|m^|-h]
) else if "%1"=="\?" (
  echo Usage: start.bat [r^|m^|-h]
) else if "%1"=="\h" (
  echo Usage: start.bat [r^|m^|-h]
) else (
  start "Dummy API" cmd /k "cd %batchFilePath%\mockup-api && npm start"
  start "React Native Web App" cmd /k "cd %batchFilePath%\web && npm start"
)