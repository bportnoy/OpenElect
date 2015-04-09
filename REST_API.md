# Open Elect API Reference
Open Elect's API is organized around REST.

___

# Admin Login
##### Definition
###### Login - Generate SSL key and certificate
    GET https://www.skillfulcactus.com/api/v1/admin

___

# Elections
## Election object
##### Example Response
    [
      {
        pollName: 'Federal',
        questions: [
          {
            question: 'Who should be the next president?',
            instructions: 'Vote for only one.',
            options: [
                {name: 'Barack Obama', party: 'Democratic', statement:'The change we need.'},
                {name: 'John McCain', party: 'Republican', statement: 'I'm a maverick.'}
            ]
          },
          {
            question: 'Who should represent California's 8th Congressional District?',
            instructions: 'Vote for only one.',
            options: [
                {name: 'Nancy Pelosi', party: 'Democratic', statement: 'I have been doing this forever.'},
                {name: 'Cindy Sheehan', party: 'Independent', statement: 'It's worth a shot.'},
                {name: 'Dana Walsh', party: 'Republican', statement: 'I don't have a chance.'}
            ]
          }
        ]
      },
      {
        pollName: 'Municipal',
        questions: [
          {
            question: 'Who should represent the Board of Supervisors for District 11?',
            instructions: 'Vote for only one.',
            options: [
              {name: 'John Avalos', party: 'Democratic', statement: 'I won.'},
              {name: 'Asha Safai', party: 'Democratic', statement: 'I came close!'}
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

## Retrieve Election
##### Definition
    GET https://www.skilfullcactus.com/api/v1/elections/{ ELECTION_ID }
##### Example Request
    curl https://www.skilfullcactus.com/api/v1/elections/{ ELECTION_ID } \
      -u { USER_TOKEN }:

## Update Election
##### Definition
    POST https://www.skilfullcactus.com/api/v1/elections/{ ELECTION_ID }
##### Example Request
    curl https://www.skilfullcactus.com/api/v1/elections/{ ELECTION_ID } \
      -u { USER_TOKEN }: \
      -d owner_id="" \
      -d name="" \
      -d description="" \
      -d start="" \
      -d end="" \
      -d timed="" \
      -d accepting_votes="" \
      -d locked="" \
      -d privacy_strategy="" \
      -d url_handle="" \
      -d randomize_answer_order="" \
      -d two_factor_auth="" \
      -d force_two_factor_auth=""

## Delete Election
##### Definition
    DELETE https://www.skilfullcactus.com/api/v1/elections/{ ELECTION_ID }
##### Example Request
    curl https://www.skilfullcactus.com/api/v1/elections/{ ELECTION_ID } \
      -u { USER_TOKEN }: \
      -X DELETE

## List Elections
##### Definition
    GET https://www.skilfullcactus.com/api/v1/elections
##### Example Request
    curl https://www.skilfullcactus.com/api/v1/elections?limit=10 \
      -u { USER_TOKEN }:

___

# Polls
## Poll object
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

# Ballots
## Ballot object
###### Example Response
    {
      election_id=3902340,
      user_id=438572936,
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

## Create Ballot
##### Definition
    POST https://www.skillfulcactus.com/api/v1/ballots/create
##### Example Request
    curl https://www.skillfulcactus.com/api/v1/ballots/create \
      -u { USER_TOKEN }: \
      -d election_id=8952374 \
      -d user_id=20394820
##### Example Response
###### Returns 201 status and JSON Object
    {
      ballot: {
        id: 98342654,
        election_id: 28934237,
        user_id: 05467235,
        url: '/ballot/98342654'
        created_at: 'Date Created'
      }
    }

## Retrieve Ballot
##### Definition
    GET https://www.skillfulcactus.com/api/v1/ballots/{ BALLOT_ID }
##### Example Request
    curl https://www.skillfulcactus.com/api/v1/ballots/{ BALLOT_ID } \
      -u { USER_TOKEN }:
##### Example Response
    {
      election_id: 3902340,
      user_id: 438572936,
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

## Update Ballot
##### Definition
    POST https://www.skillfulcactus.com/api/v1/ballots/{ BALLOT_ID }
##### Example Request
###### Returns 201 status and JSON Object
    curl https://www.skillfulcactus.com/api/v1/ballots/{ BALLOT_ID } \
      -u { USER_TOKEN }: \
      -d election_id=8952374 \
      -d user_id=20394820 \
      -d choices[1]='01315'
##### Example Response
###### Returns 201 status and JSON Object
    {
      election_id: 3902340,
      user_id: 438572936,
      response: {
        items: [
          {
            selection: 01311
          },
          {
            selection: 01315
          }
        ]
      }
    }

## Delete Ballot
##### Definition
    DELETE https://www.skillfulcactus.com/api/v1/ballots/{ BALLOT_ID }
##### Example Request
    curl https://www.skillfulcactus.com/api/v1/ballots/{ BALLOT_ID } \
      -u { USER_TOKEN }: \
      -X DELETE

## List Ballots
##### Definition
    GET https://www.skillfulcactus.com/api/v1/ballots
##### Example Request
    curl https://www.skillfulcactus.com/api/v1/ballots?limit=10 \
      -u { USER_TOKEN }:

___

# Questions
## Question object
##### Example Response

## Create Question
##### Definition
    POST https://www.skillfulcactus.com/api/v1/questions/create
##### Example Request
    curl https://www.skillfulcactus.com/api/v1/questions/create \
      -u { USER_TOKEN }: \
      -d KEY1=VAL1 \
      -d KEY2=VAL2
##### Example Response
###### Returns 201 Status and JSON Object
    {}

## Retrieve Question
##### Definition
    GET https://www.skillfulcactus.com/api/v1/questions/{ QUESTION_ID }
##### Example Request
    curl https://www.skillfulcactus.com/api/v1/questions/{ QUESTION_ID } \
      -u { USER_TOKEN }:
##### Example Response
    {}

## Update Question
##### Definition
    POST https://www.skillfulcactus.com/api/v1/questions/{ QUESTION_ID }
##### Example Request
    curl https://www.skillfulcactus.com/api/v1/questions/{ QUESTION_ID } \
      -u { USER_TOKEN }: \
      -d KEY1=VAL1 \
      -d KEY2=VAL2
##### Example Response
    {}

## Delete Question
##### Definition
    DELETE https://www.skillfulcactus.com/api/v1/questions/{ QUESTION_ID }
##### Example Request
    curl https://www.skillfulcactus.com/api/v1/questions/{ QUESTION_ID } \
      -u { USER_TOKEN }: \
      -X DELETE

## List Questions
##### Definition
    GET https://www.skillfulcactus.com/api/v1/questions
##### Example Request
    curl https://www.skillfulcactus.com/api/v1/questions?limit=10
      -u { USER_TOKEN }: \

___

# Groups
## Group object
## Create Group
##### Definition
##### Example Request
##### Example Response
## Retrieve Group
##### Definition
##### Example Request
##### Example Response
## Update Group
##### Definition
##### Example Request
##### Example Response
## Delete Group
##### Definition
##### Example Request
##### Example Response
## List Groups
##### Definition
##### Example Request
##### Example Response

___

# Users
## User object
## Create User
##### Definition
##### Example Request
##### Example Response
## Retrieve User
##### Definition
##### Example Request
##### Example Response
## Update User
##### Definition
##### Example Request
##### Example Response
## Delete User
##### Definition
##### Example Request
##### Example Response
## List Users
##### Definition
##### Example Request
##### Example Response

___

# User Groups
## User Groups object
## List User Groups
##### Definition
##### Example Request
##### Example Response

____

# User Elections
## User Elections object
## List User Elections##### Definition
##### Example Request
##### Example Response
