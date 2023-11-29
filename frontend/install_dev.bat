@echo off

set "batchFilePath=%~dp0"

echo Install Mockup API Dependencies
call npm install "%batchFilePath%\mockup-api" && (
    echo Finished installing Mockup API Dependencies
) || (
    echo Failed to install Mockup API Dependencies
)

Remove-Item -Path "%batchFilePath%\mockup-api\src\images"
New-Item -ItemType SymbolicLink -Path "%batchFilePath%\mockup-api\images" -Target "%batchFilePath%\web\public\images"

echo.
echo Install React Native Web App Dependencies
call npm install "%batchFilePath%\web" && (
    echo Finished installing React Native Web App Dependencies
) || (
    echo Failed to install React Native Web App Dependencies
)
