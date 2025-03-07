#!/usr/bin/env node

import { createProject } from './create-project';

const projectName = process.argv[2];

createProject(projectName).catch((error) => {
  console.error('Error:', error);
  process.exit(1);
}); 