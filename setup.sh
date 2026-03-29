#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "🚀 Starting Fabian Salts Plumbing Environment Setup..."

# 1. Install NVM (Node Version Manager)
echo "📦 Installing NVM (Node Version Manager)..."
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Load NVM into the current shell session
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# 2. Install Node.js LTS (Long Term Support)
echo "🟢 Installing Node.js (LTS)..."
nvm install --lts
nvm use --lts

echo "✅ Node version installed: $(node -v)"
echo "✅ NPM version installed: $(npm -v)"

# 3. Scaffold the Next.js Project (App Router, Tailwind, TypeScript)
PROJECT_NAME="fabian-salts"
echo "🏗️ Scaffolding Next.js project: $PROJECT_NAME..."
npx create-next-app@latest $PROJECT_NAME \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir false \
  --import-alias "@/*" \
  --use-npm \
  --yes

# 4. Navigate into the project directory
cd $PROJECT_NAME

# 5. Install extra project dependencies
echo "🎨 Installing UI and Server dependencies (Lucide, Framer Motion, Resend)..."
npm install lucide-react framer-motion clsx tailwind-merge resend

# 6. Initialize Git (create-next-app does this, but just to be sure we are ready for a clean commit)
echo "🐙 Setting up Git..."
git add .
git commit -m "chore: initial Next.js setup with project dependencies" || echo "Git already up to date."

echo "🎉 Setup Complete!"
echo "➡️ Next steps:"
echo "1. cd $PROJECT_NAME"
echo "2. npm run dev"
echo "3. Open http://localhost:3000 in your Windows browser."
