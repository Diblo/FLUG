@set "projectDir=%~dp0.."

start "API Service" cmd /k "php -S localhost:8888 -t %projectDir%/src/public"
