const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const authRoutes = require('./routes/auth');
require('dotenv').config();
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

// Routes
app.use('/api/auth', authRoutes);

// Serve HTML pages - Order matters!
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'signin.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});

app.get('/roadmaps', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'roadmaps.html'));
});

app.get('/dsa-sheet', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'dsa-sheet.html'));
});

// Add this route before the 404 handler
app.get('/dsa-sheet/string-basics', (req, res) => {
    try {
        console.log('Serving string-basics page'); // Debug log
        res.sendFile(path.join(__dirname, 'views', 'string-basics.html'));
    } catch (error) {
        console.error('Error serving string-basics.html:', error);
        res.status(500).send('Error loading String Basics page');
    }
});

// Add this route before your 404 handler
app.get('/roadmaps/backend', (req, res) => {
    try {
        console.log('Serving backend roadmap page'); // Debug log
        res.sendFile(path.join(__dirname, 'views', 'backend-roadmap.html'));
    } catch (error) {
        console.error('Error serving backend-roadmap.html:', error);
        res.status(500).send('Error loading backend roadmap page');
    }
});

// Update this route handler for array-basics


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Handle 404 errors - This should be the last route
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('MongoDB Connection Error:', err));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});