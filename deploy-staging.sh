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
eb init -r us-west-1 -e openelect-staging -q OpenElect

#Deploy directory to staging.
echo "Beginning deployment"
eb deploy openelect-production

echo "Deployment complete, have a prickly day!!"