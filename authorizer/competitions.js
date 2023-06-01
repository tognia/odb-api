module.exports.authorizer = async(event) => {
    console.log('event', event)

    const token = event['authorizationToken'];
    const stage = process.env?.STAGE;
    // const apiId = process.env?.API_ID;
    //  console.log("Current stage and apiId: ", stage);

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
                                "Resource": (stage!== undefined && stage.toString()==="v1")?[
                                                                "arn:aws:execute-api:us-east-1:150441806096:23x0jag7rg/v1/GET/competitions/*",
                                                                "arn:aws:execute-api:us-east-1:150441806096:23x0jag7rg/v1/GET/competitions"
                                                        ]:
                                                        [
                                                                "arn:aws:execute-api:us-east-1:150441806096:ymumz18hhl/dev/GET/competitions/*",
                                                                "arn:aws:execute-api:us-east-1:150441806096:ymumz18hhl/dev/GET/competitions"
                                                        ]
                                            , 
                                "Effect": `${permission}`
                            }
                        ]
            }
        
    }
    return authResponse;
};