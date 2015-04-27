'use strict';

var Mailgun = require('mailgun');
var Promise = require('bluebird');
var Moment = require('moment');
// var MailComposer = require('mailcomposer');

var mg = Promise.promisifyAll(new Mailgun.Mailgun(process.env.MAILGUN_API_KEY));

var Mailer = {

  /**
   * A generic handler for sending plain text e-mail.
   * @param  {string} recipient To whom the e-mail will be addressed.
   * @param {string} subject The subject line.
   * @param  {string} message The full content of the e-mail.
   * @param {string} recipientName Optional: the user's name, which will be paired with their e-mail address for a better user experience upon receiving.
   * @param  {string} tag Optional: a string tag that will be used for tracking in Mailgun.
   * @param  {string} from Optional: if present, '@openelect.org' will be appended and used as the sender. If not present, no-reply@openelect.org will be used.
   * @param {string} fromName Optional: if present, the name that will be prepended to the sender.
   * @return {Promise} Returns a promise that resolves to true if the request is successful, or false if there is an error.
   */
  sendPlaintextEmail: function(recipient, subject, message, recipientName, tag, from, fromName){

    //support null in function invocation
    if (tag === null) tag = undefined;
    if (from === null) from = undefined;
    if (fromName === null) fromName = undefined;
    
    if (recipientName) recipient = recipientName + ' <' + recipient + '>';

    from = from ? from + '@openelect.org' : 'no-reply@openelect.org';

    if (!fromName){
      from = 'OpenElect.org <' + from + '>';
    } else {
      from = fromName + ' <' + from + '>';
    }

    tag = tag ? {'X-Mailgun-Tag': tag} : undefined;


    return mg.sendTextAsync(from, recipient, subject, message, tag).then(function(){
      return true;
    }).catch(function(err){
      console.error(err);
      return false;
    });

  },

  sendInvitation: function(email, firstName, lastName, groupName, resetCode){

    var loginLink = 'https://openelect.org/#/dashboard/user/reset/' + resetCode;

    var message = 'Dear ' + firstName + ',\nYou have been added to the group "'
                    + groupName + '" on OpenElect, a secure platform for holding elections.'
                    + '\nPlease click the following link to login and choose a password:\n\n'
                    + loginLink + '\n\nThanks,\nThe OpenElect Team';

    var name = firstName + ' ' + lastName;

    var subject = 'Welcome to OpenElect';

    this.sendPlaintextEmail(email, subject, message, name, 'invite');
  },

  resetPassword: function(user, resetCode){

    var resetLink = 'https://openelect.org/#/dashboard/user/reset/' + resetCode;

    var message = 'Dear ' + user.get('first_name') + ',\nA password reset has been requested for '
                    + 'the user with your e-mail address at OpenElect.org. To reset your password and login, '
                    + 'visit this link:\n\n' + resetLink +'\n\nThe link will expire in 24 hours. If you have '
                    + 'received this message in error, '
                    + 'there is no need to take action.\nThanks,\nThe OpenElect Team';

    var subject = 'Password Reset';

    var name = user.get('first_name') + ' ' + user.get('last_name');

    this.sendPlaintextEmail(user.get('email'), subject, message, name, 'passwordreset');
  },

  inviteToVote: function(user, election){

    var votelink = 'https://openelect.org/#/vote/' + election.get('id');

    var endtext = election.get('timed') ? 'The election ends at ' + Moment(election.get('end')).format("dddd, MMMM Do YYYY, h:mm:ss a")
              + '.\n\n' : '';

    var message = 'Dear ' + user.get('first_name') + ',\nThe election ' + election.get('name')
                    + ' is now open for voting. To cast your ballot, visit this link (you\'ll need to login):\n\n'
                    + votelink + '\n\n' + endtext + 'Thanks, The OpenElect Team';

    var name = user.get('first_name') + ' ' + user.get('last_name');

    var subject = election.get('name') + ' is Open for Voting';

    this.sendPlaintextEmail(user.get('email'), subject, message, name, 'voteopen');
  }

};

module.exports = Mailer;