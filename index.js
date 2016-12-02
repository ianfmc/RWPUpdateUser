var AWS = require('aws-sdk');

exports.handler = function(event, context, callback) {
    var docClient = new AWS.DynamoDB.DocumentClient();
    
    if (event.email == null) {
        callback(new Error('No User'));
    }
    if (event.teams == null) {
        callback(new Error('No Teams'));
    }
    var params = {
        TableName : "User",
        Key : { 
          "email" : event.email.toString(),
        },
        UpdateExpression: "set team = :a",
        ExpressionAttributeValues:{
            ":a" : event.teams
        },
        ReturnValues: "UPDATED_NEW"
    };
    docClient.update(params, function(err, data) {
        if (err) {
            callback(new Error('DynamoDB Error'));
        }
        else {
            callback(null, 'Success');
        }
    });
};

