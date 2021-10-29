rm -rf dist
rm -rf landing/dist

npm version patch --no-git-tag-version

# Build main
npx webpack --mode production

# Build themes
for file in ./src/styles/themes/*; do
    fileName="${file##*/}"
    themeName="${fileName/.less/""}"

    if [ "$themeName" != "default" ]; then
        npx webpack --mode production --env theme=${themeName}
        mv -f dist-${themeName}/css/*.css dist/css/
        mv -f dist-${themeName}/*.html dist/
        rm -rf dist-${themeName}
    fi
done

node zip.js

# cd landing
# node screenshot.js
# cd ../

# npm run landing:build

# mkdir -p landing/dist/demos

# mv dist/* landing/dist/demos

rm -rf dist