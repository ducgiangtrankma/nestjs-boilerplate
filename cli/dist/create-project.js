"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProject = createProject;
const fs = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
const util_1 = require("util");
const child_process_1 = require("child_process");
const chalk_1 = __importDefault(require("chalk"));
const ora_1 = __importDefault(require("ora"));
const prompts_1 = __importDefault(require("prompts"));
const execAsync = (0, util_1.promisify)(child_process_1.exec);
async function createProject(projectName) {
    const spinner = (0, ora_1.default)('Creating new NestJS project...').start();
    try {
        if (!projectName) {
            const response = await (0, prompts_1.default)({
                type: 'text',
                name: 'projectName',
                message: 'What is your project name?',
                validate: (value) => (value.length > 0 ? true : 'Project name is required'),
            });
            projectName = response.projectName;
        }
        const projectDir = path.resolve(process.cwd(), projectName);
        await fs.ensureDir(projectDir);
        const packageRoot = path.dirname(require.resolve('nestjs-boilerplate-cli/package.json'));
        console.log('Package root directory:', packageRoot);
        console.log('Project directory:', projectDir);
        const templateDir = path.join(packageRoot, 'template');
        console.log('Template directory:', templateDir);
        const rootFiles = await fs.readdir(packageRoot);
        console.log('Files in package root:', rootFiles);
        if (await fs.pathExists(templateDir)) {
            const templateFiles = await fs.readdir(templateDir);
            console.log('Files in template directory:', templateFiles);
            await fs.copy(templateDir, projectDir);
            console.log('Successfully copied template directory');
        }
        else {
            console.log('Warning: template directory not found at:', templateDir);
            console.log('Current working directory:', process.cwd());
            console.log('__dirname:', __dirname);
        }
        const packageJson = {
            name: projectName,
            version: '0.0.1',
            description: '',
            author: '',
            private: true,
            license: 'MIT',
            scripts: {
                build: 'nest build',
                format: 'prettier --write \"src/**/*.ts\" \"test/**/*.ts\"',
                start: 'nest start',
                dev: 'NODE_ENV=development nest start --watch',
                'start:dev': 'nest start --watch',
                'start:debug': 'nest start --debug --watch',
                'start:prod': 'node dist/main',
                lint: 'eslint \"{src,apps,libs,test}/**/*.ts\" --fix',
                test: 'jest',
                'test:watch': 'jest --watch',
                'test:cov': 'jest --coverage',
                'test:debug': 'node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand',
                'test:e2e': 'jest --config ./test/jest-e2e.json'
            },
            dependencies: {
                '@aws-sdk/client-s3': '^3.744.0',
                '@nestjs/common': '^10.0.0',
                '@nestjs/config': '^4.0.0',
                '@nestjs/core': '^10.0.0',
                '@nestjs/jwt': '^11.0.0',
                '@nestjs/mapped-types': '*',
                '@nestjs/microservices': '^11.0.8',
                '@nestjs/mongoose': '^11.0.1',
                '@nestjs/passport': '^11.0.5',
                '@nestjs/platform-express': '^10.0.0',
                '@nestjs/swagger': '^11.0.3',
                'amqp-connection-manager': '^4.1.14',
                'amqplib': '^0.10.5',
                'class-transformer': '^0.5.1',
                'class-validator': '^0.14.1',
                'compression': '^1.7.5',
                'helmet': '^8.0.0',
                'ioredis': '^5.5.0',
                'mongoose': '^8.10.0',
                'nestjs-i18n': '^10.5.0',
                'passport': '^0.7.0',
                'passport-jwt': '^4.0.1',
                'passport-local': '^1.0.0',
                'reflect-metadata': '^0.2.0',
                'rxjs': '^7.8.1'
            },
            devDependencies: {
                '@nestjs/cli': '^11.0.2',
                '@nestjs/schematics': '^10.0.0',
                '@nestjs/testing': '^10.0.0',
                '@types/compression': '^1.7.5',
                '@types/express': '^5.0.0',
                '@types/jest': '^29.5.2',
                '@types/node': '^20.3.1',
                '@types/supertest': '^6.0.0',
                '@typescript-eslint/eslint-plugin': '^8.0.0',
                '@typescript-eslint/parser': '^8.0.0',
                'eslint': '^8.0.0',
                'eslint-config-prettier': '^9.0.0',
                'eslint-plugin-prettier': '^5.0.0',
                'jest': '^29.5.0',
                'prettier': '^3.0.0',
                'source-map-support': '^0.5.21',
                'supertest': '^7.0.0',
                'ts-jest': '^29.1.0',
                'ts-loader': '^9.4.3',
                'ts-node': '^10.9.1',
                'tsconfig-paths': '^4.2.0',
                'typescript': '^5.1.3'
            }
        };
        await fs.writeJson(path.join(projectDir, 'package.json'), packageJson, { spaces: 2 });
        spinner.text = 'Installing dependencies...';
        await execAsync('yarn install', { cwd: projectDir });
        spinner.succeed(chalk_1.default.green('Project created successfully!'));
        console.log('\nNext steps:');
        console.log(chalk_1.default.cyan(`  cd ${projectName}`));
        console.log(chalk_1.default.cyan('  yarn start:dev'));
    }
    catch (error) {
        spinner.fail(chalk_1.default.red('Failed to create project'));
        throw error;
    }
}
//# sourceMappingURL=create-project.js.map