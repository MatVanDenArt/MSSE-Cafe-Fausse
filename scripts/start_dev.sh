#!/bin/bash

echo "Starting Café Fausse Development Environment..."

echo ""
echo "Starting Flask Backend Server..."
gnome-terminal -- bash -c "cd backend && python app.py; exec bash" &

echo ""
echo "Waiting 3 seconds for backend to start..."
sleep 3

echo ""
echo "Starting React Frontend Server..."
gnome-terminal -- bash -c "cd frontend && npm start; exec bash" &

echo ""
echo "Development servers are starting..."
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop all servers"
