# Open Elect API Reference
Open Elect's API is organized around REST.

___

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> e6bc989... update elections, polls, admin login
# Admin Login
##### Definition
###### Login - Generate SSL key and certificate
    GET https://www.skillfulcactus.com/api/v1/admin

___

<<<<<<< HEAD
=======
>>>>>>> 010386a... set up election API endpoints and JSON
=======
>>>>>>> e6bc989... update elections, polls, admin login
# Elections
## Election object
##### Example Response
    [
<<<<<<< HEAD
<<<<<<< HEAD
      {
        pollName: 'Federal',
        questions: [
          {
            question: 'Who should be the next president?',
=======
      { pollName: 'Federal',
        questions: [
          { question: 'Who should be the next president?',
>>>>>>> 010386a... set up election API endpoints and JSON
=======
      {
        pollName: 'Federal',
        questions: [
          {
            question: 'Who should be the next president?',
>>>>>>> e6bc989... update elections, polls, admin login
            instructions: 'Vote for only one.',
            options: [
                {name: 'Hillary Clinton', party: 'Democratic', statement:'I must be president.'},
                {name: 'Anyone But Hillary Clinton', party: 'Republican', statement: 'Her again?'}
            ]
          },
<<<<<<< HEAD
<<<<<<< HEAD
          {
            question: 'What should I have for dinner?',
=======
          { question: 'What should I have for dinner?',
>>>>>>> 010386a... set up election API endpoints and JSON
=======
          {
            question: 'What should I have for dinner?',
>>>>>>> e6bc989... update elections, polls, admin login
            instructions: 'Eat all the things.',
            options: [
                {name: 'Pizza', party: 'Oven', statement: 'Cheesy goodness.'},
                {name: 'Jelly Beans', party: 'Candy Jar', statement: 'So many different feels.'},
                {name: 'Ice Cream', party: 'Freezer', statement: 'You know I\'m your favorite.'}
            ]
          }
        ]
      },
<<<<<<< HEAD
<<<<<<< HEAD
      {
        pollName: 'HR25',
        questions: [
          {
            question: 'Who is the most confident?',
=======
      { pollName: 'HR25',
        questions: [
          { question: 'Who is the most confident?',
>>>>>>> 010386a... set up election API endpoints and JSON
=======
      {
        pollName: 'HR25',
        questions: [
          {
            question: 'Who is the most confident?',
>>>>>>> e6bc989... update elections, polls, admin login
            instructions: 'Vote for only one.',
            options: [
              {name: 'Tony', party: 'Meditative', statement: 'Obviously I am the most confident.'},
              {name: 'Allen', party: 'Arkansan', statement: 'I will teach you confident.'}
            ]
          }
        ]
      }
    ];

## Create Election
##### Definition
    POST https://www.skillfulcactus.com/api/v1/elections/create
##### Example Request
    curl https://www.skillfulcactus.com/api/v1/elections/create \
      -u { USER_TOKEN }: \
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
      -d owner_id="" \
      -d name="" \
      -d description=""
##### Example Response
###### Returns 201 and JSON Object
    {
      election: {
        id: 90152848,
        url: '/elections/90152848',
        name: 'Election Name',
        created_at: 'Date Created'
      }
    }
<<<<<<< HEAD
=======
      -d KEY1=VALUE1 \
      -d KEY2=VALUE2 \
      -d KEY3=VALUE3
>>>>>>> Revert "update curl data properties"

## Retrieve Election
##### Definition
    GET https://www.skilfullcactus.com/api/v1/elections/{ ELECTION_ID }
##### Example Request
    curl https://www.skilfullcactus.com/api/v1/elections/{ ELECTION_ID } \
=======
      -d KEY1=VALUE1 \
      -d KEY2=VALUE2 \
      -d KEY3=VALUE3
=======
      -d owner_id="" \
      -d name="" \
      -d description=""
>>>>>>> 19f030b... update curl data properties
=======
      -d KEY1=VALUE1 \
      -d KEY2=VALUE2 \
      -d KEY3=VALUE3
>>>>>>> 76540bd... Revert "update curl data properties"
=======
>>>>>>> e6bc989... update elections, polls, admin login

## Retrieve Election
##### Definition
    GET https://www.skilfullcactus.com/api/v1/elections/{ ELECTION_ID }
##### Example Request
<<<<<<< HEAD
    curl https://www.skilfullcactus.com/api/v1/elections/{ ELECTION_ID }/get \
>>>>>>> 010386a... set up election API endpoints and JSON
=======
    curl https://www.skilfullcactus.com/api/v1/elections/{ ELECTION_ID } \
>>>>>>> e6bc989... update elections, polls, admin login
      -u { USER_TOKEN }:

## Update Election
##### Definition
<<<<<<< HEAD
<<<<<<< HEAD
    POST https://www.skilfullcactus.com/api/v1/elections/{ ELECTION_ID }
##### Example Request
    curl https://www.skilfullcactus.com/api/v1/elections/{ ELECTION_ID } \
=======
    POST https://www.skilfullcactus.com/api/v1/elections/{ ELECTION_ID }/update
##### Example Request
    curl https://www.skilfullcactus.com/api/v1/elections/{ ELECTION_ID }/update \
>>>>>>> 010386a... set up election API endpoints and JSON
=======
    POST https://www.skilfullcactus.com/api/v1/elections/{ ELECTION_ID }
##### Example Request
    curl https://www.skilfullcactus.com/api/v1/elections/{ ELECTION_ID } \
>>>>>>> e6bc989... update elections, polls, admin login
      -u { USER_TOKEN }: \
      -d KEY1=VALUE1 \
      -d KEY2=VALUE2 \
      -d KEY3=VALUE3

## Delete Election
##### Definition
<<<<<<< HEAD
<<<<<<< HEAD
    DELETE https://www.skilfullcactus.com/api/v1/elections/{ ELECTION_ID }
##### Example Request
    curl https://www.skilfullcactus.com/api/v1/elections/{ ELECTION_ID } \
=======
    DELETE https://www.skilfullcactus.com/api/v1/elections/{ ELECTION_ID }/delete
##### Example Request
    curl https://www.skilfullcactus.com/api/v1/elections/{ ELECTION_ID }/delete \
>>>>>>> 010386a... set up election API endpoints and JSON
=======
    DELETE https://www.skilfullcactus.com/api/v1/elections/{ ELECTION_ID }
##### Example Request
    curl https://www.skilfullcactus.com/api/v1/elections/{ ELECTION_ID } \
>>>>>>> e6bc989... update elections, polls, admin login
      -u { USER_TOKEN }: \
      -X DELETE

## List Elections
##### Definition
<<<<<<< HEAD
<<<<<<< HEAD
    GET https://www.skilfullcactus.com/api/v1/elections
##### Example Request
    curl https://www.skilfullcactus.com/api/v1/elections?limit=10 \
=======
    GET https://www.skilfullcactus.com/api/v1/elections/list
##### Example Request
    curl https://www.skilfullcactus.com/api/v1/elections?limit=10/list \
>>>>>>> 010386a... set up election API endpoints and JSON
=======
    GET https://www.skilfullcactus.com/api/v1/elections
##### Example Request
    curl https://www.skilfullcactus.com/api/v1/elections?limit=10 \
>>>>>>> e6bc989... update elections, polls, admin login
      -u { USER_TOKEN }:

___

# Polls
## Poll object
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
##### Example Response
    {
      poll: {
        name: 'Poll Name',
        description: 'Poll Description'
      },
      questions: [
        {
          name: 'Poll Question Name',
          description: 'Poll Question Description',
          options: [
            {
              name: 'Option Name',
              description: 'Option Description'
            }
          ]
        }
      ]
    }


=======
>>>>>>> Revert "update curl data properties"
## Create Poll
##### Definition
    POST https://www.skillfulcactus.com/api/v1/polls/create
##### Example Request
    curl https://www.skillfulcactus.com/api/v1/polls/create \
      -u { USER_TOKEN }: \
      -d name="" \
      -d description="" \
##### Example Response
###### Returns 201 status and JSON Object
    {
      poll: {
        id: 09341213,
        url: '/polls/09341213'
        name: 'Poll Name',
        created_at: 'Date Created'
      }
    }

## Retrieve Poll
##### Definition
    GET https://www.skilfullcactus.com/api/v1/polls/{ POLL_ID }
##### Example Request
    curl https://www.skilfullcactus.com/api/v1/polls/{ POLL_ID } \
      -u { USER_TOKEN }:
##### Example Response
    {
      poll: {
        name: 'Poll Name',
        description: 'Poll Description'
      },
      questions: [
        {
          name: 'Poll Question Name',
          description: 'Poll Question Description',
          options: [
            {
              name: 'Option Name',
              description: 'Option Description'
            }
          ]
        }
      ]
    }

## Update Poll
##### Definition
    POST https://www.skilfullcactus.com/api/v1/polls/{ POLL_ID }
##### Example Request
###### Returns 201 status and JSON Object
    curl https://www.skilfullcactus.com/api/v1/polls/{ POLL_ID } \
      -u { USER_TOKEN }: \
      -d name="" \
      -d description="" \
##### Example Response
    {
      response: {
        items: [
          {
            selection: 01311
          },
          {
            selection: 01312
          }
        ]
      }
    }


## Delete Poll
##### Definition
    DELETE https://www.skillfulcactus.com/api/v1/polls/{ POLL_ID }
##### Example Request
    curl https://www.skilfullcactus.com/api/v1/polls/{ POLL_ID } \
      -u { USER_TOKEN }: \
      -X DELETE

## List Polls
##### Definition
    GET https://www.skillfulcactus.com/api/v1/polls
##### Example Request
    curl https://www.skilfullcactus.com/api/v1/polls?limit=10 \
      -u { USER_TOKEN }:

___
=======
=======
##### Example Response
    {
      poll: {
        name: 'Poll Name',
        description: 'Poll Description'
      },
      questions: [
        {
          name: 'Poll Question Name',
          description: 'Poll Question Description',
          options: [
            {
              name: 'Option Name',
              description: 'Option Description'
            }
          ]
        }
      ]
    }


>>>>>>> 19f030b... update curl data properties
=======
>>>>>>> 76540bd... Revert "update curl data properties"
## Create Poll
##### Definition
    POST https://www.skillfulcactus.com/api/v1/polls/create
##### Example Request
    curl https://www.skillfulcactus.com/api/v1/polls/create \
      -u { USER_TOKEN }: \
      -d name="" \
      -d description="" \
##### Example Response
###### Returns 201 status and JSON Object
    {
      poll: {
        id: 09341213,
        url: '/polls/09341213'
        name: 'Poll Name',
        created_at: 'Date Created'
      }
    }

## Retrieve Poll
##### Definition
    GET https://www.skilfullcactus.com/api/v1/polls/{ POLL_ID }
##### Example Request
    curl https://www.skilfullcactus.com/api/v1/polls/{ POLL_ID } \
      -u { USER_TOKEN }:
##### Example Response
    {
      poll: {
        name: 'Poll Name',
        description: 'Poll Description'
      },
      questions: [
        {
          name: 'Poll Question Name',
          description: 'Poll Question Description',
          options: [
            {
              name: 'Option Name',
              description: 'Option Description'
            }
          ]
        }
      ]
    }

## Update Poll
##### Definition
    POST https://www.skilfullcactus.com/api/v1/polls/{ POLL_ID }
##### Example Request
###### Returns 201 status and JSON Object
    curl https://www.skilfullcactus.com/api/v1/polls/{ POLL_ID } \
      -u { USER_TOKEN }: \
      -d name="" \
      -d description="" \
##### Example Response
    {
      response: {
        items: [
          {
            selection: 01311
          },
          {
            selection: 01312
          }
        ]
      }
    }


## Delete Poll
##### Definition
    DELETE https://www.skillfulcactus.com/api/v1/polls/{ POLL_ID }
##### Example Request
    curl https://www.skilfullcactus.com/api/v1/polls/{ POLL_ID } \
      -u { USER_TOKEN }: \
      -X DELETE

## List Polls
<<<<<<< HEAD
>>>>>>> 010386a... set up election API endpoints and JSON
=======
##### Definition
    GET https://www.skillfulcactus.com/api/v1/polls
##### Example Request
    curl https://www.skilfullcactus.com/api/v1/polls?limit=10 \
      -u { USER_TOKEN }:

___
>>>>>>> e6bc989... update elections, polls, admin login

# Ballots
## Ballot object
## Create Ballot
## Retrieve Ballot
## Update Ballot
## Delete Ballot
## List Ballots

# Questions
## Question object
## Create Question
## Retrieve Question
## Update Question
## Delete Question
## List Questions

# Groups
## Group object
## Create Group
## Retrieve Group
## Update Group
## Delete Group
## List Groups

# Users
## User object
## Create User
## Retrieve User
## Update User
## Delete User
## List Users

# User Groups
## User Groups object
## List User Groups

# User Elections
## User Elections object
## List User Elections
