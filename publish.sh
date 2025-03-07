#!/bin/bash

# Màu sắc cho output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Starting publish process...${NC}"

# Tăng version
echo -e "${YELLOW}📦 Updating version...${NC}"
npm version patch

# Copy files vào template
echo -e "${YELLOW}📋 Copying files to template directory...${NC}"
rm -rf template/* # Xóa nội dung cũ của template
cp -r src test template/
cp tsconfig.json tsconfig.build.json nest-cli.json .env.sample .gitignore .prettierrc .eslintrc.js README.md LICENSE template/

# Build CLI
echo -e "${YELLOW}🔨 Building CLI...${NC}"
cd cli
yarn build
cd ..

# Publish
echo -e "${YELLOW}📤 Publishing to npm...${NC}"
npm publish

echo -e "${GREEN}✅ Publish completed successfully!${NC}"
echo -e "${YELLOW}You can test the new version with:${NC}"
echo -e "npx nestjs-boilerplate-cli@latest test1" 