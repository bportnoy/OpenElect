#!/bin/bash
# AWS Elastic Beanstalk build and run script
## First, install grunt & grunt-cli
npm install -g grunt
npm install -g grunt-cli

## now, build the app
grunt build:prod

## run the server
npm start