[![Circle CI](https://circleci.com/gh/SkillfulCactus/OpenElect/tree/master.svg?style=svg)](https://circleci.com/gh/SkillfulCactus/OpenElect/tree/master) [![Stories in Ready](https://badge.waffle.io/skillfulcactus/openelect.png?label=ready&title=Ready)](https://waffle.io/skillfulcactus/skillfulcactus)
=========

# OpenElect

> OpenElect is an open source voting platform which helps government, enterprise, and small organization to hold online elections. The key tenets of OpenElect are **security**, **simplicity**, and **verifiability**. OpenElect utilizes the most advanced cryptography technology and strive to create a plaform where engineers around the world can contribute to make OpenElect better and safer.

## Table of Contents

1. [Team](#team)
1. [Usage](#Usage)
1. [Technology Stack](#technology-stack)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Roadmap](#roadmap)
1. [Contributing](#contributing)

## Team

  - __Product Owner__: [Ryan Carey] (https://github.com/ryyann)
  - __Technical Lead__: [Bradley Portnoy] (https://github.com/bportnoy)
  - __Scrum Master__: [Brian Hsu] (https://github.com/brianpchsu)
  - __Project Manager__: [Rebekah Kwon] (https://github.com/rebekahkwon)

## Usage

> Use the [link](http://openelect.org/) to create an account, start an election, and vote.
> Or clone this repo to develop and extend the original voting system. To run the service: grunt serve

## Technology Stack

###BackEnd
- *Server Environment*: **NodeJS**
- *Web Framework*:  **ExpressJS**
- *Database*:  **PostgreSQL**
- *Task Runner*:  **Grunt**

###FrontEnd
- *Architecture*: **React & Flux**
- *User Interface*: **HTML5/SCSS**

###Testing
- *Continuous Integration*: **CircleCI**
- *Test Runner*: **Grunt**
- *Test Framework*: **Mocha**
- *Assertion Library*: **Chai**
- *Plugin(s)*: **Sinon**

###Deployment
- *Application Management*: **AWS Elastic Beanstalk**


## Requirements

- Node 0.12.x
- PostgreSQL 9.x
- Bower

## Development

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
sudo npm install -g nodemon
npm install
bower install
grunt serve
```

### Tasks

From within the root directory:

```sh
grunt test
```

> grunt tasks:
- grunt test

### Roadmap

View the project roadmap [here](https://github.com/SkillfulCactus/OpenElect/issues)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

