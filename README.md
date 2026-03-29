# AWS Playwright Pipeline

![CI](https://github.com/Djones-qa/aws-playwright-pipeline/actions/workflows/aws-pipeline.yml/badge.svg)

Playwright E2E tests with automatic report upload to AWS S3 via GitHub Actions.

## Architecture
`
Push to GitHub
    ↓
GitHub Actions triggers
    ↓
Playwright tests run
    ↓
HTML report generated
    ↓
Report uploaded to AWS S3
`

## Tech Stack
- Playwright
- TypeScript
- AWS S3
- GitHub Actions CI
- AWS SDK v3

## Run Locally
`ash
npm test
`

## Author
Darrius Jones - github.com/Djones-qa