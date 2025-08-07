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

if [ ! $NO_BUILD ]; then
  yarn install --cwd "$FROSTY_CLI_ROOT"
  SCRIPT="npx webpack -c "$FROSTY_CLI_ROOT/webpack.mjs""
  if [ $DEBUG_MODE ]; then
    SCRIPT="$SCRIPT --mode development"
  else
    SCRIPT="$SCRIPT --mode production"
  fi
  if [ $CONFIG_FILE ]; then
    SCRIPT="$SCRIPT --env CONFIG_FILE="$CONFIG_FILE""
  fi
  if [ $SRCROOT ]; then
    SCRIPT="$SCRIPT --env SRCROOT="$SRCROOT""
  fi
  if [ $OUTPUT_DIR ]; then
    SCRIPT="$SCRIPT --env OUTPUT_DIR="$OUTPUT_DIR""
  fi
  if [ $WATCH ]; then
    SCRIPT="$SCRIPT --watch"
  fi
  exec $SCRIPT
fi

if [ ! $BUILD_ONLY ]; then
fi
