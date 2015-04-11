var Election = require('../../database/models/election');

var elections = {

  create: function(req, res) {
    if ( req.body.election ) {
      var data = req.body.election;
      console.log(data);
      var election = new Election({
        name: data.name,
        description: data.description || 'no description',
        start: data.start_date,
        end: data.end_date,
        timed: data.is_timed,
        privacy_strategy: data.privacy_strategy,
        randomize_answer_order: data.randomize_questions,
        two_factor_auth: data.allow_2_auth,
        force_two_factor_auth: data.force_2_auth
      }).save()
      .then(function(model){
        res.status(201);
        res.json({
          id: model.get('id'),
          url: model.get('url_handle') || 'not yet supported', // todo: implement election short-urls
          name: model.get('name'),
          created_at: model.get('created_at')
        });
        res.end();
      }).error(function(error){
        res.status(500);
        console.error(error);
        res.end();
      });
    } else {
      res.status(400);
      res.end('Bad request');
    }
  },
  getById: function(id, req, res) {
    var election = new Election({id: id});
    election.fetch()
      .then(function(model){
        if ( model ) {
          res.json({name: model.get('name')}); // todo: replace this with an actual object
        } else {
          res.status(404);
          res.end('Election object not found');
        }
      });
  },
  updateById: function(id, req, res) {
    // todo: write this
  }

}

module.exports = elections;