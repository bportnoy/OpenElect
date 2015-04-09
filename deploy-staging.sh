#!/bin/bash
#SkillfulCactus AWS Deployment Script

echo "Beginning deployment procedure."

#Install Elastic Beanstalk command line tools.
sudo pip install awsebcli

#Ensure we're in the master directory
git checkout master

# Build distribution directory
grunt build

#Move to distribution directory
cd dist
echo "Now in:"
pwd
echo "Preparing to upload to Elastic Beanstalk."

#Initialize eb instance to our app.
eb init -r us-west-1 OpenElect

#Deploy directory to staging.
eb deploy openelect-staging

echo "Deployment complete, have a prickly day!"