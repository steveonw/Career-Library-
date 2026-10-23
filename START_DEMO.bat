@echo off
setlocal
cd /d "%~dp0"

rem Run the demo from its own folder so JS modules and JSON load correctly.
where py >nul 2>nul
if not errorlevel 1 (
    set "PYTHON=py"
) else (
    where python >nul 2>nul
    if not errorlevel 1 (
        set "PYTHON=python"
    ) else (
        echo Python was not found.
        echo Install Python, or open a terminal here and run: py -m http.server 8000
        pause
        exit /b 1
    )
)

echo.
echo Career Library P0 - local demo
echo Open http://localhost:8000/ if the browser does not open automatically.
echo Keep this window running while browsing. Press Ctrl+C to stop.
echo.
start "" "http://localhost:8000/"
%PYTHON% -m http.server 8000 --bind 127.0.0.1

echo.
echo The demo server has stopped.
pause
