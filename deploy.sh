#!/bin/bash

echo "🚀 Deploying Veyya Mobile App to Vercel..."
echo ""
echo "Step 1: Login to Vercel (if not already logged in)"
vercel login

echo ""
echo "Step 2: Deploy to production"
vercel --prod --name veyya

echo ""
echo "✅ Deployment complete!"
echo "Your app should be available at: https://veyya.vercel.app"
