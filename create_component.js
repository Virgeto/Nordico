const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Get the component name from command line arguments
const componentName = process.argv[2];

if (!componentName) {
  console.error('Component name is required!');
  process.exit(1);
}

// Define the correct path to the library (ensure it’s relative to your Nx workspace root)
const componentFolderPath = path.join('ui', 'src', 'lib', componentName);

// Ensure the folder exists before running the generator
if (!fs.existsSync(componentFolderPath)) {
  fs.mkdirSync(componentFolderPath, { recursive: true });
  console.log(`Created folder: ${componentFolderPath}`);
}

// Run the Nx generator with the component name and correct path
execSync(
  `nx g @nx/react:component ${componentFolderPath}/${componentName.toLowerCase()} --export=true --style=scss`,
  { stdio: 'inherit' }
);
