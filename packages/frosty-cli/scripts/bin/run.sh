#!/bin/sh
#
#  run.sh
#
#  The MIT License
#  Copyright (c) 2021 - 2025 O2ter Limited. All rights reserved.
#
#  Permission is hereby granted, free of charge, to any person obtaining a copy
#  of this software and associated documentation files (the "Software"), to deal
#  in the Software without restriction, including without limitation the rights
#  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
#  copies of the Software, and to permit persons to whom the Software is
#  furnished to do so, subject to the following conditions:
#
#  The above copyright notice and this permission notice shall be included in
#  all copies or substantial portions of the Software.
#
#  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
#  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
#  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
#  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
#  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
#  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
#  THE SOFTWARE.
#

set -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

export FROSTY_CLI_ROOT="$( realpath "$SCRIPT_DIR/../.." )"
export PROJECT_ROOT="${PROJECT_ROOT:-$( realpath "$INIT_CWD" )}"

cd "$PROJECT_ROOT"

print_usage() {
  echo "Usage: frosty run [options] [input-file]"
  echo ""
  echo "Options:"
  echo "  -w, --watch                Enable watch mode (rebuild on file changes)"
  echo "  -d, --debug                Enable debug mode (development build)"
  echo "  -b, --build-only           Only build, do not run the server"
  echo "  -B, --no-build             Skip build step"
  echo "  -p, --port <port>          Specify port for the server (default: 8080)"
  echo "  -c, --configuration <file> Specify configuration file to use (default: server.config.js)"
  echo "  -s, --src <dir>            Specify source root directory"
  echo "  -o, --output <dir>         Specify output directory for build artifacts"
  echo "  -h, --help                 Show this help message and exit"
  echo ""
  echo "Arguments:"
  echo "  input-file                 Optional input file to process"
  echo ""
  echo "Examples:"
  echo "  frosty run app.js"
}

POSITIONAL_ARGS=()
while [ $# -gt 0 ]; do
  case "$1" in
    -w|--watch) WATCH_MODE=true; shift ;;
    -d|--debug) DEBUG_MODE=true; shift ;;
    -b|--build-only) BUILD_ONLY=true; shift ;;
    -B|--no-build) NO_BUILD=true; shift ;;
    -p|--port) PORT="$2"; shift 2 ;;
    -c|--configuration) CONFIG_FILE="$2"; shift 2 ;;
    -s|--src) SRCROOT="$2"; shift 2 ;;
    -o|--output) OUTPUT_DIR="$2"; shift 2 ;;
    -h|--help) print_usage; exit 0 ;;
    --) shift; break ;;
    -*) echo "Unknown option $1"; print_usage; exit 1 ;;
    *) POSITIONAL_ARGS+=("$1"); shift ;;
  esac
done

# Restore positional parameters
set -- "${POSITIONAL_ARGS[@]}"

if [ $# -gt 0 ]; then
  INPUT_FILE="$1"; shift ;
fi

CONFIG_FILE="${CONFIG_FILE:-"$PROJECT_ROOT/server.config.js"}"

# Get output dir from config if not set
if [ -f "$CONFIG_FILE" ] && [ -z "$OUTPUT_DIR" ]; then
  OUTPUT_DIR="$(node -pe "(() => { 
    try { 
      const config = require('$CONFIG_FILE'); 
      return typeof config === 'function' ? config().output : config.output;
    } catch {
      return '';
    } 
  })()")"
fi

OUTPUT_DIR="${OUTPUT_DIR:-"$FROSTY_CLI_ROOT/dist"}"

if [ "$NO_BUILD" != "true" ]; then
  rm -rf "$OUTPUT_DIR"
fi

if [ "$BUILD_ONLY" != "true" ] && [ "$WATCH_MODE" = "true" ]; then
  until [ -f "$OUTPUT_DIR/server.js" ]; do sleep 1; done && npx nodemon --watch "$OUTPUT_DIR" "$OUTPUT_DIR/server.js" $@ &
fi

if [ "$NO_BUILD" != "true" ]; then
  yarn install --cwd "$FROSTY_CLI_ROOT"
  BUILD_OPTS="-c "$FROSTY_CLI_ROOT/webpack.mjs" --env CONFIG_FILE="$CONFIG_FILE" --env OUTPUT_DIR="$OUTPUT_DIR""
  if [ "$DEBUG_MODE" = "true" ]; then
    BUILD_OPTS="$BUILD_OPTS --mode development"
  else
    BUILD_OPTS="$BUILD_OPTS --mode production"
  fi
  [ -n "$INPUT_FILE" ] && BUILD_OPTS="$BUILD_OPTS --env INPUT_FILE="$INPUT_FILE""
  [ -n "$SRCROOT" ] && BUILD_OPTS="$BUILD_OPTS --env SRCROOT="$SRCROOT""
  [ -n "$PORT" ] && BUILD_OPTS="$BUILD_OPTS --env PORT="$PORT""
  if [ "$WATCH_MODE" = "true" ]; then
    npx webpack-cli $BUILD_OPTS --watch &
  else
    npx webpack-cli $BUILD_OPTS
  fi
fi

if [ "$WATCH_MODE" = "true" ]; then
  wait
elif [ ! $BUILD_ONLY ]; then
  node "$OUTPUT_DIR/server.js" $@
fi
