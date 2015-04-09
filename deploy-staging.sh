#!/bin/bash
#SkillfulCactus AWS Deployment Script

#Install Elastic Beanstalk command line tools.
sudo pip install awsebcli

#Ensure we're in the master directory
git checkout master

# Build distribution directory
grunt build

#Move to distribution directory
cd dist

#Initialize eb instance to our app.
eb init -r us-west-1 SkillfulCactus

#Deploy directory to staging.
eb deploy skillfulcactus-staging