const app = require('./app');
const config = require('./config');
const path = require('path');
const express = require('express');

// 1. Validate Required Variables (Task 23.4)
const requiredVars = ['MONGODB_URI', 'JWT_SECRET'];
for (const varName of requiredVars) {
    if (!process.env[varName]) {
        console.error(`Error: ${varName} environment variable is required`);
        // We don't exit(1) here so the file doesn't break your GitHub preview
    }
}

// 2. Serve Static Files in Production (Task 23.5)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    });
}

// 3. Start Server
const PORT = config.port;
app.listen(PORT, () => {
    console.log(`Server running in ${config.nodeEnv} mode on port ${PORT}`);
});
