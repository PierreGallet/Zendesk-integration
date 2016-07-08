/**
 * Created by badouralix on 29/06/16.
 */

var https = require('https');
var config = require('config');

var getListComments = function(json) {
    var obj = [];
        json.comments.forEach( function(e) {
            if (e.type == "Comment") {
                obj.push(e.body);
            }
        });
    return obj;
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
}

var computeProposals = function(list, resp) {
    var PythonShell = require('python-shell');
    
    var options = {
        mode: 'text',
        pythonOptions: ['-u'],
        args: list
    };
    
    PythonShell.run('machine_learning/main.py', options, function(err, message) {
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
            var listComments = getListComments(json);
            computeProposals(listComments, resp);
        });
    });
};

exports.newTicket = function (req, res) {
    getComments(req.body.id, res);
};
