# tpgen

tpgen is a versatile Command Line Interface (CLI) tool that empowers developers to effortlessly generate custom folder and file structures based on their specific requirements. With tpgen, you can define a directory structure pattern in the configuration file and swiftly create that layout in your project with a single command.

No more tedious manual setup of repetitive folder structures for various projects. Whether you seek consistency in organizing your team's projects or simply want to expedite your project's initialization, tpgen has you covered. Its configuration file enables you to tailor the structure pattern, leaving you more time to focus on your development tasks.

#### Key Features:

- Rapid and automated generation of folder and file structures.
- Configuration file for customizable structure patterns.
- Intuitive command-line interface for seamless interactions.
- Versatility to support projects of all scales and technologies.
- Facilitates team collaboration with standardized organization across projects.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![GitHub license](https://img.shields.io/github/license/oclif/hello-world)](https://github.com/oclif/hello-world/blob/main/LICENSE)

<!-- toc -->

- [tpgen](#tpgen)
- [Usage](#usage)
- [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g tpgen
$ tpgen COMMAND
running command...
$ tpgen (--version)
tpgen/1.0.0 linux-x64 node-v16.20.1
$ tpgen --help [COMMAND]
USAGE
  $ tpgen COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`tpgen help [COMMANDS]`](#tpgen-help-commands)
- [`tpgen plugins`](#tpgen-plugins)
- [`tpgen plugins:install PLUGIN...`](#tpgen-pluginsinstall-plugin)
- [`tpgen plugins:inspect PLUGIN...`](#tpgen-pluginsinspect-plugin)
- [`tpgen plugins:install PLUGIN...`](#tpgen-pluginsinstall-plugin-1)
- [`tpgen plugins:link PLUGIN`](#tpgen-pluginslink-plugin)
- [`tpgen plugins:uninstall PLUGIN...`](#tpgen-pluginsuninstall-plugin)
- [`tpgen plugins:uninstall PLUGIN...`](#tpgen-pluginsuninstall-plugin-1)
- [`tpgen plugins:uninstall PLUGIN...`](#tpgen-pluginsuninstall-plugin-2)
- [`tpgen plugins update`](#tpgen-plugins-update)

## `tpgen help [COMMANDS]`

Display help for tpgen.

```
USAGE
  $ tpgen help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for tpgen.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.11/src/commands/help.ts)_

## `tpgen plugins`

List installed plugins.

```
USAGE
  $ tpgen plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ tpgen plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.7/src/commands/plugins/index.ts)_

## `tpgen plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ tpgen plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ tpgen plugins add

EXAMPLES
  $ tpgen plugins:install myplugin

  $ tpgen plugins:install https://github.com/someuser/someplugin

  $ tpgen plugins:install someuser/someplugin
```

## `tpgen plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ tpgen plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ tpgen plugins:inspect myplugin
```

## `tpgen plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ tpgen plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ tpgen plugins add

EXAMPLES
  $ tpgen plugins:install myplugin

  $ tpgen plugins:install https://github.com/someuser/someplugin

  $ tpgen plugins:install someuser/someplugin
```

## `tpgen plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ tpgen plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ tpgen plugins:link myplugin
```

## `tpgen plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ tpgen plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ tpgen plugins unlink
  $ tpgen plugins remove
```

## `tpgen plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ tpgen plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ tpgen plugins unlink
  $ tpgen plugins remove
```

## `tpgen plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ tpgen plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ tpgen plugins unlink
  $ tpgen plugins remove
```

## `tpgen plugins update`

Update installed plugins.

```
USAGE
  $ tpgen plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

<!-- commandsstop -->
