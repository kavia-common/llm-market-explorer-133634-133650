#!/bin/bash
cd /home/kavia/workspace/code-generation/llm-market-explorer-133634-133650/llm_backend
npm run lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi

