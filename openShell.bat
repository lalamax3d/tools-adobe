@Echo off
:: ENABLING CONDA PYPIN ENV
SET FILEPATH=%~dp0


:: setlocal
:: cd /d %~dp0
cmd /k "cd /d %FILEPATH% & code ."
