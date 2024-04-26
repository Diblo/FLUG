@set "projectDir=%~dp0.."

@cd %projectDir%\src
CALL composer install
