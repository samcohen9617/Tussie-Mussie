#!/bin/bash
# Script for running the application in local development mode
# This runs the backend and frontend separately

# Set environment variables
export NODE_ENV=development

# Print helper information
echo "======================================================"
echo "🚀 Starting Tussie Mussie in local development mode"
echo "Backend will run on: http://localhost:5000"
echo "Frontend will run on: http://localhost:5173"
echo "======================================================"
echo

echo "📝 To develop locally, make sure you:"
echo "1. Copy .env.local.example to .env.local"
echo "2. Set VITE_API_BASE_URL=http://localhost:5000 in .env.local"
echo

# Start in parallel using npx
echo "🔄 Starting backend and frontend servers..."
echo

# Start the backend server
echo "🚀 Starting backend API server..."
npx tsx server/local-dev.ts &
BACKEND_PID=$!

# Start the frontend development server
echo "🚀 Starting frontend development server..."
npx vite &
FRONTEND_PID=$!

# Handle Ctrl+C to stop both processes
trap "kill $BACKEND_PID $FRONTEND_PID; exit" SIGINT

# Wait for both processes
wait