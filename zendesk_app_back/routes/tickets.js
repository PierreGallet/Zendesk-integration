/**
 * Created by badouralix on 29/06/16.
 */

var https = require('https');
var config = require('config');

var getListComments = function(json) {
    var i = 1;
    var text = "";
    var obj = {};
        json.comments.forEach(function(e){
            if (e.type == "Comment") {
                obj["Comment"+i]= e.body;
                i++;
            }
        });
    return obj;
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
            var text = getListComments(json);
            console.log(text);
            resp.send(text);
        });
    });
};

exports.newTicket = function (req, res) {
    getComments(req.body.id, res);
};
