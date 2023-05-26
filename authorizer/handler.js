module.exports.authorizer = async(event) => {
    console.log('event', event)

    const token = event['authorizationToken']

    console.log('token', token)
    
    
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
                                "Resource": ["arn:aws:execute-api:us-east-1:150441806096:eemqoozgtl/dev/GET/getcompetitions"], 
                                "Effect": `${permission}`
                            }
                        ]
            }
        
    }
    return authResponse;
};