import * as fs from 'fs-extra';
import * as path from 'path';
import { promisify } from 'util';
import { exec } from 'child_process';
import chalk from 'chalk';
import ora from 'ora';
import prompts from 'prompts';

const execAsync = promisify(exec);

export async function createProject(projectName?: string) {
  const spinner = ora('Creating new NestJS project...').start();

  try {
    // Get project name from user if not provided
    if (!projectName) {
      const response = await prompts({
        type: 'text',
        name: 'projectName',
        message: 'What is your project name?',
        validate: (value: string) => (value.length > 0 ? true : 'Project name is required'),
      });
      projectName = response.projectName as string;
    }

    // Create project directory
    const projectDir = path.resolve(process.cwd(), projectName);
    await fs.ensureDir(projectDir);

    // Get the package root directory using require.resolve
    const packageRoot = path.dirname(require.resolve('nestjs-boilerplate-cli/package.json'));
    console.log('Package root directory:', packageRoot);
    console.log('Project directory:', projectDir);

    // Copy all files from template directory
    const templateDir = path.join(packageRoot, 'template');
    console.log('Template directory:', templateDir);
    
    // List all files in package root
    const rootFiles = await fs.readdir(packageRoot);
    console.log('Files in package root:', rootFiles);

    if (await fs.pathExists(templateDir)) {
      // List all files in template directory
      const templateFiles = await fs.readdir(templateDir);
      console.log('Files in template directory:', templateFiles);
      
      await fs.copy(templateDir, projectDir);
      console.log('Successfully copied template directory');
    } else {
      console.log('Warning: template directory not found at:', templateDir);
      console.log('Current working directory:', process.cwd());
      console.log('__dirname:', __dirname);
    }

    // Create package.json
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

    // Install dependencies
    spinner.text = 'Installing dependencies...';
    await execAsync('yarn install', { cwd: projectDir });

    spinner.succeed(chalk.green('Project created successfully!'));
    console.log('\nNext steps:');
    console.log(chalk.cyan(`  cd ${projectName}`));
    console.log(chalk.cyan('  yarn start:dev'));
  } catch (error) {
    spinner.fail(chalk.red('Failed to create project'));
    throw error;
  }
} 