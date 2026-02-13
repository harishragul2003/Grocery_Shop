#!/bin/bash

# NatureCart Frontend Deployment Script
echo "🚀 Starting NatureCart deployment..."

# Build the project
echo "📦 Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Build files are in the 'dist' directory"
    echo "🌐 Ready for deployment to Vercel"
else
    echo "❌ Build failed!"
    exit 1
fi

echo "🎉 Deployment preparation complete!"
echo ""
echo "Next steps:"
echo "1. Push changes to GitHub: git add . && git commit -m 'Fix Vercel deployment' && git push"
echo "2. Vercel will automatically redeploy from GitHub"
echo "3. Or run: vercel --prod (if you have Vercel CLI)"