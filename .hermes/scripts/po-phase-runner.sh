#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const scriptPath = '/home/pi/workspace/da-ga/.hermes/scripts/po-phase-runner.js';
const progressFile = '/home/pi/workspace/da-ga/.hermes/cron/po-progress.json';

console.log('Starting PO Phase Runner...');

try {
  // Check if script exists
  if (!fs.existsSync(scriptPath)) {
    console.log('Script not found:', scriptPath);
    process.exit(1);
  }

  // Run the script with node
  const output = execSync(`node ${scriptPath} 2>&1`, { encoding: 'utf-8', timeout: 180000 });
  
  console.log('Script output:', output);
  
  // Read progress
  try {
    const progress = JSON.parse(fs.readFileSync(progressFile, 'utf-8'));
    console.log('Current progress:', progress);
  } catch (e) {
    console.log('No progress file yet');
  }
  
} catch (error) {
  console.error('Error running script:', error.message);
  process.exit(1);
}
