/**
 * Created by badouralix on 05/07/16.
 */

'use strict';

module.exports = function (app) {
    // ROUTES FOR OUR API
    // =============================================================================
    var router = require('express').Router();              // get an instance of the express Router
    var tickets = require('./routes/tickets');

    // test route to make sure everything is working (accessed at GET http://localhost:8080/api/v1)
    router.get('/', function(req, res) {
        res.json({ message: 'hooray! welcome to our api!' });
    });

    // more routes for our API will happen here
    router.post('/tickets', tickets.newTicket);

    // REGISTER OUR ROUTES -------------------------------
    // all of our routes will be prefixed with /api/v1
    app.use('/api/v1', router);
};
