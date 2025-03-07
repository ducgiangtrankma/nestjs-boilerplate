#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_project_1 = require("./create-project");
const projectName = process.argv[2];
(0, create_project_1.createProject)(projectName).catch((error) => {
    console.error('Error:', error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map