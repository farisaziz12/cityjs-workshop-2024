#!/bin/bash

rm -f performance_report.md

# Path to the JSON file
file_path="./.reassure/current.perf"

# Check if the JSON file exists
if [[ ! -f "$file_path" ]]; then
  echo "Error: File $file_path does not exist."
  exit 1
fi

# Read JSON content from the file
json_content=$(cat "$file_path")

# Parse metadata
creation_date=$(echo "$json_content" | jq -r '.metadata.creationDate' | sed 's/null//g')
branch=$(echo "$json_content" | jq -r '.metadata.branch' | sed 's/null//g')
commit_hash=$(echo "$json_content" | jq -r '.metadata.commitHash' | sed 's/null//g')

# Parse test details
test_name=$(echo "$json_content" | jq -r '.name' | sed 's/null//g')
test_type=$(echo "$json_content" | jq -r '.type' | sed 's/null//g')
runs=$(echo "$json_content" | jq -r '.runs' | sed 's/null//g')
mean_duration=$(echo "$json_content" | jq -r '.meanDuration' | sed 's/null//g')
stdev_duration=$(echo "$json_content" | jq -r '.stdevDuration' | sed 's/null//g')
durations=$(echo "$json_content" | jq -r '.durations | join(", ")' | sed 's/null//g')
mean_count=$(echo "$json_content" | jq -r '.meanCount' | sed 's/null//g')
stdev_count=$(echo "$json_content" | jq -r '.stdevCount' | sed 's/null//g')
counts=$(echo "$json_content" | jq -r '.counts | join(", ")' | sed 's/null//g')

# Create a markdown file
output_file="performance_report.md"

{
  echo "# Performance Report"
  echo ""
  echo "## Metadata"
  echo "- **Creation Date:** $creation_date"
  echo "- **Branch:** $branch"
  echo "- **Commit Hash:** $commit_hash"
  echo ""
  echo "## Test Details"
  echo "- **Test Name:** $test_name"
  echo "- **Test Type:** $test_type"
  echo "- **Number of Runs:** $runs"
  echo "- **Mean Duration:** $mean_duration ms"
  echo "- **Standard Deviation of Duration:** $stdev_duration ms"
  echo "- **Durations:** $durations"
  echo "- **Mean Count:** $mean_count"
  echo "- **Standard Deviation of Count:** $stdev_count"
  echo "- **Counts:** $counts"
} > "$output_file"

echo "Markdown report generated at $output_file"
