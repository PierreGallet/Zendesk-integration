/**
 * Created by badouralix on 29/06/16.
 */

var https = require('https');
var config = require('config');

var getListComments = function(json) {
    var i = 1;
    var text = "";
    var obj = [];
        json.comments.forEach(function(e){
            if (e.type == "Comment") {
                obj.push(e.body);
                i++;
            }
        });
    return obj;
};

var computeProposals = function(list) {
    var PythonShell = require('python-shell');
    
    var options = {
        mode: 'text',
        pythonOptions: ['-u'],
        args: list
    };
    
    PythonShell.run('../machine_learning/main.py', options, function(err, message) {
        if (err) {console.log(err);}
        console.log(message);
        return message;
    });
    
/*    var proposals = {};
    var i = 1;
    pyShell.on('message', function(message) {
        proposals['Comment'+i] = message;
        console.log(message);
        i++;
        if (i===3) {
            pyShell.end(function(err) {console.log(err);});
            return proposals;
        }
    }); */
};

var getComments = function (id, resp) {
    var options = {
        host: config.get('zendesk.host'),
        port: config.get('zendesk.port'),
        path: config.get('zendesk.api_path') + '/tickets/' + id + '/comments.json',
        auth: config.get('zendesk.auth')
    };

    var data = https.get(options, function (res) {
        var json = "";
        res.on('data', function (chunk) {
            json+=chunk;
        });
        res.on('end', function() {
            json = JSON.parse(json);
            var listComments = getListComments(json);
            var text = computeProposals(listComments);
            console.log(text);
            resp.send(text);
        });
    });
};

exports.newTicket = function (req, res) {
    getComments(req.body.id, res);
};
