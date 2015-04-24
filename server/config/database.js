/**
 * Database Configuration
 */

'use strict';
var settings = require('./env/default');
var path = require('path');
var fs = require('fs');

var knex = require('knex')({
  client: 'postgres',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    charset: 'utf8',
    port: process.env.DB_PORT
  }, debug: false
});

var db = require('bookshelf')(knex);

db.plugin('registry'); // registry plugin handles node circular dependency issues
db.plugin('visibility'); //can't be sending user secrets all over the place!
db.plugin('virtuals'); //may as well go for the full set.

db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (users) {
      users.uuid('id').primary();
      users.string('email').unique();
      users.string('password');
      users.string('first_name');
      users.string('last_name');
      users.text('public_key');
      users.text('private_key');
      users.string('key_status'); //can be 'waiting' (key has not yet been generated),
                                    //'site' (we automatically generated a keypair),
                                    //'user' (the user supplied an OpenPGP keypair)
      users.integer('admin_level');
      users.boolean('must_change_pass');
      users.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('groups_users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('groups_users', function (users_groups) {
      users_groups.increments('id').primary();
      users_groups.uuid('user_id').references('id').inTable('users');
      users_groups.uuid('group_id').references('id').inTable('groups');
      users_groups.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('groups').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('groups', function (groups) {
      groups.uuid('id').primary();
      groups.uuid('owner_id').references('id').inTable('users');
      groups.uuid('parent_id');
      groups.json('children');
      groups.string('name');
      groups.boolean('pending_adds').defaultTo(false); //are we in the process of adding users?
      groups.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('polls').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('polls', function (polls) {
      polls.uuid('id').primary();
      polls.uuid('election_id').references('id').inTable('elections');
      polls.uuid('group_id').references('id').inTable('groups');
      polls.string('name');
      polls.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('questions').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('questions', function (questions) {
      questions.uuid('id').primary();
      questions.uuid('poll_id').references('id').inTable('polls');
      questions.string('name');
      questions.text('description');
      questions.json('options');
      questions.text('count_strategy');
      questions.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('elections').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('elections', function (elections) {
      elections.uuid('id').primary();
      elections.uuid('owner_id').references('id').inTable('users');
      elections.string('name');
      elections.text('description').defaultTo('No description');
      elections.dateTime('start');
      elections.dateTime('end');
      elections.boolean('timed').defaultTo(false);
      elections.boolean('accepting_votes').defaultTo(false);
      elections.boolean('locked').defaultTo(false);
      elections.string('privacy_strategy').defaultTo('secret');
      elections.string('url_handle');
      elections.boolean('randomize_answer_order').defaultTo(true);
      elections.boolean('two_factor_auth').defaultTo(false);
      elections.boolean('force_two_factor_auth').defaultTo(false);
      elections.boolean('archived').defaultTo(false);
      elections.text('public_key'); //the key that will be used to encrypt this election
      elections.json('results');
      elections.text('user_time_zone').defaultTo('utc'); // this doesn't affect how the date/time is stored, only how it's displayed
      elections.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('ballots').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('ballots', function (ballots) {
      ballots.uuid('id').primary();
      ballots.uuid('election_id').references('id').inTable('elections');
      ballots.uuid('user_id').references('id').inTable('users');
      ballots.json('choices');
      ballots.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('elections_users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('elections_users', function (users_elections) {
      users_elections.increments('id').primary();
      users_elections.uuid('user_id').references('id').inTable('users');
      users_elections.uuid('election_id').references('id').inTable('elections');
      users_elections.boolean('participated');
      users_elections.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('sessions').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('sessions', function (session) {
    session.increments('id').primary();
    session.string('sid').unique();
    session.string('data');
    session.timestamps();
  }).then(function (table) {
    console.log('Created Table', table);
    });
  }
});

// To do - 2fa

module.exports = db;
