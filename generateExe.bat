@echo off

REM Creating the bin directory if not exists
echo "Creating dist directory .. "
if not exist "dist" mkdir "dist"

echo "Copying required Files ... "
xcopy bin dist\ /E /Y

REM Building binaries
echo "Building Binaries ... "
pkg . --target node20-win-x64 --output dist\MyService.exe
exit