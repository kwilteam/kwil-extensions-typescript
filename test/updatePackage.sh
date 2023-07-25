#!/bin/bash
# this is a comment. the first line, or 'shebang', tells the system this is a bash script

# navigate to the project directory (replace with your actual directory)
cd ..

# run your command line tasks (replace with your actual tasks)
npm run build
git add .
git commit -m 'prepare for package update'
npm version patch
npm publish

# navigate back to this script's directory
cd test
npm uninstall @lukelamey/extensions-typescript
npm i @lukelamey/extensions-typescript
