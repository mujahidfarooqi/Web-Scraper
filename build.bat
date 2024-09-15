@echo off
echo "Building Binaries ..."

REM Install dependencies (needed for building and running)
npm install --production

REM Use pkg to bundle the application, excluding Puppeteer and Tesseract.js binaries
pkg server/app.js --target node20-win-x64 --output dist/MyService.exe

echo "Build complete. Executable created at dist\MyService.exe"
exit
