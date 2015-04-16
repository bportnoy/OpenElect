'use strict';

var Mailgun = require('mailgun');
var Promise = require('bluebird');
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

    console.log(fromName);
    if (!fromName){
      from = 'OpenElect.org <' + from + '>';
    } else {
      from = fromName + ' <' + from + '>';
    }
    console.log(from);

    tag = tag ? {'X-Mailgun-Tag': tag} : undefined;


    return mg.sendTextAsync(from, recipient, subject, message, tag).then(function(){
      return true;
    }).catch(function(err){
      console.error(err);
      return false;
    });

  }

};

module.exports = Mailer;