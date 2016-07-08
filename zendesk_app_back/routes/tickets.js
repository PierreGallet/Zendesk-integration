/**
 * Created by badouralix on 29/06/16.
 */

var https = require('https');
var config = require('config');


var getBody = function(json) {
    var body_private = "",
        body_public = "";

    json.comments.forEach( function (item) {

        if (item.type == "Comment" && item.public == false) {
            body_private = body_private.concat(item.body).concat('\n');
        }
        else if (item.type == "Comment" && item.public == true) {
            body_public = body_public.concat(item.body).concat('\n');
        }
    });

    return {
        body_private: body_private,
        body_public: body_public
    };
};

var sendResult = function(res, message) {
    res.send(message);
};

var getConfig = function(id) {
    return {
        host: config.get('zendesk.host'),
        port: config.get('zendesk.port'),
        path: config.get('zendesk.api_path') + '/tickets/' + id + '/comments.json',
        auth: config.get('zendesk.auth')
    };
};

var computeProposals = function(json, resp) {
    var PythonShell = require('python-shell');

    var body = getBody(json);
    var args = ["chat", body.body_private, body.body_public];

    var options = {
        mode: 'text',
        pythonOptions: ['-u'],
        args: args
    };
    
    PythonShell.run('machine_learning/data_migration.py', options, function(err, message) {
        if (err) {console.log(err);}
        console.log(message);
        sendResult(resp, message);
    });
};

var getComments = function (id, resp) {

    var options = getConfig(id);

    var data = https.get(options, function (res) {
        var json = "";
        res.on('data', function (chunk) {
            json+=chunk;
        });
        res.on('end', function() {
            json = JSON.parse(json);
            computeProposals(json, resp);
        });
    });
};

exports.newTicket = function (req, res) {
    getComments(req.body.id, res);
};
