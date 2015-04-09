###SkillfulCactus AWS Deployment Script
grunt build
sudo pip install awsebcli
git checkout master
cd dist
eb init -r us-west-1 SkillfulCactus
eb deploy skillfulcactus-staging