module.exports.authorizer = async(event) => {
    console.log('event', event)

    const token = event['authorizationToken']

    console.log('token', token);

    // let id = event.pathParameters?.id;

    // console.log('id 2023', id);
    
    
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
                                            //   `arn:aws:execute-api:us-east-1:150441806096:ymumz18hhl/dev/GET/competitions/${id}`,
                                              "arn:aws:execute-api:us-east-1:150441806096:ymumz18hhl/dev/GET/competitions/",
                                              "arn:aws:execute-api:us-east-1:150441806096:ymumz18hhl/dev/GET/competitions"
                                            ], 
                                "Effect": `${permission}`
                            }
                        ]
            }
        
    }
    return authResponse;
};