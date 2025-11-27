#!/usr/bin/env node

/**
 * Generates a manifest of component source files
 * Reads all component directories and creates a JSON file with their source code
 * Runs before build to bundle component sources
 */

const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src/app');
const outputDir = path.join(__dirname, '../public');
const outputFile = path.join(outputDir, 'component-manifest.json');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const manifest = {};

/**
 * Recursively scan directories for component files
 * Component key is the folder path relative to src/app (e.g. michael/bingo)
 */
function scanDirectory(dir, relativePath = '') {
  try {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        // Skip node_modules and hidden folders
        if (file === 'node_modules' || file.startsWith('.')) {
          continue;
        }

        const newRelativePath = relativePath ? `${relativePath}/${file}` : file;
        scanDirectory(filePath, newRelativePath);
      } else if (stat.isFile()) {
        // Only look for .ts, .html, .css files (exclude .spec.ts)
        if (
          (file.endsWith('.ts') || file.endsWith('.html') || file.endsWith('.css')) &&
          !file.endsWith('.spec.ts')
        ) {
          // Skip if no relative path (files at root of src/app/)
          if (!relativePath) {
            continue;
          }

          // Use the folder path as the component key
          const componentPath = relativePath;

          // Initialize component entry if it doesn't exist
          if (!manifest[componentPath]) {
            manifest[componentPath] = {};
          }

          // Read file content
          try {
            const content = fs.readFileSync(filePath, 'utf8');
            // Store with the actual filename
            manifest[componentPath][file] = content;
          } catch (err) {
            console.error(`Error reading file ${filePath}:`, err.message);
          }
        }
      }
    }
  } catch (err) {
    console.error(`Error scanning directory ${dir}:`, err.message);
  }
}

// Generate manifest
console.log('📦 Generating component manifest...');
scanDirectory(srcDir);

// Write manifest file
try {
  fs.writeFileSync(outputFile, JSON.stringify(manifest, null, 2));
  console.log(`✓ Generated manifest with ${Object.keys(manifest).length} components`);
  console.log(`✓ Saved to: ${outputFile}`);
} catch (err) {
  console.error(`✗ Error writing manifest file:`, err.message);
  process.exit(1);
}
