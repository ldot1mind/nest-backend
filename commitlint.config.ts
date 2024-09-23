import type { UserConfig } from '@commitlint/types';

/**
 * Commitlint Configuration
 *
 * This configuration defines the rules and settings for commit message linting using
 * the Commitlint library. It enforces a conventional commit message format, ensuring
 * that commit messages are consistent and meaningful.
 *
 * The configuration extends from the conventional commit style and includes a custom
 * parser preset and formatter.
 *
 * Rules:
 * - `type-enum`: Specifies the allowed types of commits:
 *   - `feat`: New feature
 *   - `fix`: Bug fix
 *   - `docs`: Documentation changes
 *   - `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc.)
 *   - `refactor`: Code changes that neither fix a bug nor add a feature
 *   - `perf`: Performance improvement
 *   - `test`: Adding missing tests or correcting existing tests
 *   - `build`: Changes affecting the build system or external dependencies
 *   - `ci`: Changes to CI configuration files and scripts
 *   - `chore`: Other changes that don't modify src or test files
 *   - `revert`: Reverts a previous commit
 *
 * - `scope-enum`: Specifies the allowed scopes for commits, helping to categorize changes:
 *   - `setup`: Project setup
 *   - `config`: Configuration files
 *   - `deps`: Dependency updates
 *   - `feature`: Feature-specific changes
 *   - `bug`: Bug fixes
 *   - `docs`: Documentation
 *   - `style`: Code style/formatting
 *   - `refactor`: Code refactoring
 *   - `test`: Tests
 *   - `build`: Build scripts or configuration
 *   - `ci`: Continuous integration
 *   - `release`: Release related changes
 *   - `other`: Other changes
 *
 * Usage:
 * To use this configuration, ensure that you have Commitlint set up in your project.
 * Here’s an example of a valid commit message that would pass this configuration:
 *
 * - `feat(config): add support for new environment variables`
 * - `fix(docs): correct typo in installation instructions`
 * - `chore(deps): update dependency version`
 */

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: 'conventional-changelog-atom',
  formatter: '@commitlint/format',
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert'
      ]
    ],
    'scope-enum': [
      2,
      'always',
      [
        'setup',
        'config',
        'deps',
        'feature',
        'bug',
        'docs',
        'style',
        'refactor',
        'test',
        'build',
        'ci',
        'release',
        'other'
      ]
    ]
  }
};

export default Configuration;
