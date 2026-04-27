#!/usr/bin/env node
// Build wrapper to bypass PowerShell execution policy
const { spawn } = require('child_process');
const path = require('path');
const projectRoot = path.join(__dirname, '..');

console.log('Starting Next.js build...');
const child = spawn('npx', ['next', 'build'], {
  cwd: projectRoot,
  stdio: 'inherit',
  shell: true
});
child.on('exit', code => process.exit(code));
