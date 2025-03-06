// sample.js
//
// This file demonstrates two potential vulnerabilities in JavaScript:
// 1) Reflected XSS (Cross-Site Scripting)
// 2) Command Injection

const express = require('express');
const app = express();
const { exec } = require('child_process');

// 1) Reflected XSS Vulnerability
//    - The user's 'name' parameter is directly injected into HTML without sanitization.
app.get('/xss', (req, res) => {
  const userInput = req.query.name;
  // Vulnerable: Echoing user input directly can allow XSS attacks
  res.send(`Hello, ${userInput}`);
});

// 2) Command Injection Vulnerability
//    - The user's 'cmd' parameter is passed directly to exec without validation.
app.get('/exec', (req, res) => {
  const command = req.query.cmd;

  // Vulnerable: An attacker can craft a malicious command, e.g. "?cmd=rm -rf /"
  exec(command, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).send(`Error: ${error.message}`);
    }
    res.send(`Command output: ${stdout}`);
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
