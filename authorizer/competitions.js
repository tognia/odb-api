module.exports.authorizer = async(event) => {
    console.log('event', event)

    const token = event['authorizationToken']

    console.log('token', token);

  
    let permission = "Deny";
    if(token === "my-secret-token") {
    	permission = "Allow"
    }
    const authResponse = { 
        "principalId": "abc123", 
        "policyDocument": 
            { 
                "Version": "2012-10-17", 
                "Statement": 
                        [
                            {
                                "Action": "execute-api:Invoke", 
                                "Resource": [
                                              "arn:aws:execute-api:us-east-1:150441806096:23x0jag7rg/dev/GET/competitions/*",
                                              "arn:aws:execute-api:us-east-1:150441806096:23x0jag7rg/dev/GET/competitions"
                                            ], 
                                "Effect": `${permission}`
                            }
                        ]
            }
        
    }
    console.log("Permission", permission) ;

    return authResponse;
};