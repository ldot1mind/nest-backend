import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';

/**
 * Defines the path to the 'src' directory located in the current module's directory.
 *
 * The `__dirname` variable contains the absolute path to the directory that
 * contains the currently executing script. By using `path.join`, we create a
 * cross-platform compatible path that points to the 'src' subdirectory.
 *
 * This path will be used later in the script to search for TypeScript files
 * that may contain the `@deprecated` tag.
 */
const directoryPath: string = path.join(__dirname, 'src');

/**
 * This module scans a specified directory for TypeScript files that contain
 * the `@deprecated` tag and logs their paths to the console.
 *
 * Dependencies:
 * - fs: Node.js file system module to interact with the file system.
 * - path: Node.js module to handle and transform file paths.
 * - chalk: A library for styling console output, allowing colored messages.
 *
 * The `findDeprecatedFiles` function recursively traverses the specified directory
 * and its subdirectories. For each TypeScript (.ts) file found, it reads the file
 * content to check for the presence of the `@deprecated` tag. If found, it logs
 * the file name and path in yellow color to indicate it is deprecated.
 *
 * The directory to start the search is defined by joining the current
 * directory path with 'src'.
 *
 * Usage:
 * - This script can be used as part of a maintenance routine to identify
 * deprecated files within a project, helping developers to keep track of
 * outdated code.
 *
 * Example:
 * ```
 * node path/to/this/script.js
 * ```
 * Running this script will output the paths of all TypeScript files containing
 * the `@deprecated` tag in the 'src' directory and its subdirectories.
 */
function findDeprecatedFiles(dir: string): void {
  // Reads the contents of the directory and returns an array of file names
  const files: string[] = fs.readdirSync(dir);

  // Iterates over each file in the directory
  files.forEach((file) => {
    // Constructs the full path to the file
    const filePath: string = path.join(dir, file);
    // Retrieves file statistics to determine if it's a directory or a file
    const stat: fs.Stats = fs.statSync(filePath);

    // Recursively calls the function if the current item is a directory
    if (stat.isDirectory()) {
      findDeprecatedFiles(filePath);
    }
    // Checks if the file is a TypeScript file
    else if (file.endsWith('.ts')) {
      // Reads the content of the TypeScript file
      const content: string = fs.readFileSync(filePath, 'utf8');
      // Checks for the presence of the @deprecated tag in the file content
      if (content.includes('@deprecated')) {
        // Logs the deprecated file name and path to the console in yellow color
        console.log(chalk.yellow(`Deprecated: [${file}] '${filePath}'`));
      }
    }
  });
}

// Initiates the search for deprecated files starting from the defined directory path
findDeprecatedFiles(directoryPath);
