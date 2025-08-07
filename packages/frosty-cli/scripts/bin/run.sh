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

while [[ $# -gt 0 ]]; do
  case $1 in
    -w|--watch)
      WATCH_MODE=true
      shift
      ;;
    -d|--debug)
      DEBUG_MODE=true
      shift
      ;;
    -b|--build-only)
      BUILD_ONLY=true
      shift
      ;;
    -B|--no-build)
      NO_BUILD=true
      shift
      ;;
    -p|--port)
      PORT="$2"
      shift 2
      ;;
    -c|--configuration)
      CONFIG_FILE="$2"
      shift 2
      ;;
    -s|--src)
      SRCROOT="$2"
      shift 2
      ;;
    -o|--output)
      OUTPUT_DIR="$2"
      shift 2
      ;;
    -h|--help)
      print_usage
      exit 0
      ;;
    -*)
      echo "Unknown option $1"
      print_usage
      exit 1
      ;;
    *)
      POSITIONAL_ARGS+=("$1") # save positional arg
      shift # past argument
      ;;
  esac
done

set -- "${POSITIONAL_ARGS[@]}" # restore positional parameters

if [ $# -gt 0 ]; then
  INPUT_FILE="$1"
fi

CONFIG_FILE="${CONFIG_FILE:-"$PROJECT_ROOT/server.config.js"}"

OUTPUT_DIR="${OUTPUT_DIR:-"$( node -pe "(() => { 
  try { 
    const config = require('$CONFIG_FILE'); 
    return typeof config === 'function' ? config().output : config.output;
  } catch {
    return '';
  } 
})()" )"}"

OUTPUT_DIR="${OUTPUT_DIR:-"$FROSTY_CLI_ROOT/dist"}"

if [ ! $BUILD_ONLY ] && [ $WATCH ]; then
  until [ -f "$OUTPUT_DIR/server.js" ]; do sleep 1; done && npx nodemon --watch "$OUTPUT_DIR" "$OUTPUT_DIR/server.js" &
fi

if [ ! $NO_BUILD ]; then
  yarn install --cwd "$FROSTY_CLI_ROOT"
  BUILD_SCRIPT="npx webpack -c "$FROSTY_CLI_ROOT/webpack.mjs" --env CONFIG_FILE="$CONFIG_FILE" --env OUTPUT_DIR="$OUTPUT_DIR""
  if [ $DEBUG_MODE ]; then
    BUILD_SCRIPT="$BUILD_SCRIPT --mode development"
  else
    BUILD_SCRIPT="$BUILD_SCRIPT --mode production"
  fi
  if [ $INPUT_FILE ]; then
    BUILD_SCRIPT="$BUILD_SCRIPT --env INPUT_FILE="$INPUT_FILE""
  fi
  if [ $SRCROOT ]; then
    BUILD_SCRIPT="$BUILD_SCRIPT --env SRCROOT="$SRCROOT""
  fi
  if [ $PORT ]; then
    BUILD_SCRIPT="$BUILD_SCRIPT --env PORT="$PORT""
  fi
  if [ $WATCH ]; then
    exec $BUILD_SCRIPT --watch &
  else
    exec $BUILD_SCRIPT
  fi
fi

if [ $WATCH ]; then
  wait
elif [ ! $BUILD_ONLY ]; then
  node "$OUTPUT_DIR/server.js"
fi
