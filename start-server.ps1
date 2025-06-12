# Data Dashboard Local Server
# Starts a local HTTP server to test the dashboard

Write-Host "Starting Data Analysis Dashboard..." -ForegroundColor Green
Write-Host "Dashboard will be available at: http://localhost:8080" -ForegroundColor Yellow
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Cyan
Write-Host ""

# Try Python first
try {
    python -m http.server 8080
} catch {
    Write-Host "Python not found, trying alternative methods..." -ForegroundColor Yellow
    
    # Try Node.js http-server if available
    try {
        npx http-server -p 8080
    } catch {
        Write-Host "Node.js not found either. Please install Python or Node.js to run a local server." -ForegroundColor Red
        Write-Host "Alternatively, open index.html directly in your browser." -ForegroundColor Yellow
    }
}

