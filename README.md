#bigCommerce-PayPal App

Application built for use on the bigCommerce dashboard.

- Setup
- ToDo
- Documentation
- License

##Setup

Git Fork or Clone the Repo

Requires Node & NPM

Make sure `localhost.paypal.com` is added to your hosts file

`$ npm install`

`$ npm start`

Go to the bigCommerce site and login to PayPals testbed `https://login.bigcommerce.com/login` 

Ping Matt Linville-Engler, Tejas Gadiraju, or Mahendran Kumarapandian for login credentials

Login to a test site and find the dashboard.

Find the PayPal app in My Apps -> Draft Apps.

Install or launch the application and login to a PayPal business account.

Ping Matt Linville-Engler, Tejas Gadiraju, or Mahendran Kumarapandian for a test business account.

Launch the store website through the dashboard to view banners, offers, etc.. 

##ToDo

- Add method on uninstall to remove PYPL banners/offers
- Add partner.js and signup.js to main page
- Add Tests
- Add Input Validation
- Add Error Checks
- Add Try Catch in API
- Code Cleanup 
- Integrate more functionality, visuals, and automaion for the end user experience. 
- Add Documentation - specifically for the OAuth process with bigCommerce and the ISU process with PayPal



Documentation
-------------

###BC app creation process
	
- Login to the bC developer portal
- Create an application and fill out various details (name, snapshots, etc.) 
- These can be updated later
- Fill out scopes that the app will need access too - products, categories, etc..
- Add an auth url -this is the url the bC will request when a user starts the install process - eg https://localhost:3000/auth
- Add a load url -this is the url the bC will request after the auth process for install and opening of the app- eg https://localhost:3000/load


###BC install process

- Utilize the bc - node module on npm
- Add your bC client and secret variables to the config
- Set up Auth and Load routes.
- The Auth URL will return an OAuth token specific to the merchant - you will need to store this to use the api later
- The load url will need to return the application view (html, react, etc…)

#####Auth 

```javascript
function auth(req, res) {
    var bigCommerce = new BigCommerce({
        clientId: ‘CLIENTID’,
        secret: ‘SECRET’,
        callback: 'https://localhost.paypal.com:3000/auth',  ????
        responseType: 'json'
    });
    bigCommerce.authorise(req.query, function (err, data) {
            //save data
    //start ISU
    })
};
```
#####Load

```javascript
function load(req, res) {
    var bigCommerce = new BigCommerce({
            clientId: 'CLIENTID',
            secret: 'SECRET',
            responseType: 'json'
    });
    bigCommerce.callback(req.query['signed_payload'], function (err, data) {
    //respond with application view
        });
}
```

	You can also set up an uninstall route to take actions if the user uninstalls the app
		

###BC API Process
	
- Utilize the bc - node module on npm
- Add your bC client and secret variables to the config along with the auth token stored earlier
- Review bC api documentation to achieve application goals 

###ISU Process

- Create an app with paypal 
- Document the clientID & client secret
- Whitelist the client id with PayPal

#####Set up request to ISU

```javascript		
function GetISUAuth(user, initialResponse) {
    console.log("getting ISU Auth");
    request({
        url: 'https://api.sandbox.paypal.com/v1/oauth2/token',
        method: 'POST',
        headers: {
            //We can define headers too
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        },
        auth: {
            user: ‘PAYPAL CLIENTID’,
            pass: ‘PAYPAL SECRET’
        },
        form: {
            'grant_type': 'client_credentials'
        }
    }, function (err, res) {
       //proceed to second step
        var json = JSON.parse(res.body);
        GetISULink(user, json.access_token, initialResponse);
    });
}
```

#####Request a user link 

```javascript
function GetISULink(user, token, initialResponse) {
    var post_data = {
        'requested_capabilities': [
            { 'capability': 'CONTEXTUAL_MARKETING_CONSENT' }
        ],
        'web_experience_preference': {
            'partner_logo_url': ‘URL TO LOGO’,
            "return_url": “RETURN/CALLBACK URL
        },
        'collected_consents': [
            {
                'type': 'SHARE_DATA_CONSENT',
                "granted": true
            }
        ],
    };
    request({
        url: 'https://api.sandbox.paypal.com/v1/customer/partner-referrals',
        method: 'POST',
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + ACCESS TOKEN,
        },
        body: post_data
    }, function (err, res) {
        var json = res.body;
       //PROCESS LINK AND SEND TO USER
        });
    });
}

```
- Set up second request & pass in a callback url for when the ISU Login process is finished
- Receive a login link from this second request
- Place second request in front end for the user to click on to start the sign in process
- User will start the process in a minibrowser/ aka new window
- User completes sign on and the callback url is sent - sending the merchant/payerid with it.

#####Callback that is passed in to ISU

```javascript
function isuFinal(req, res) { 
    console.log('ISU HIT')
    merchantId: req.param('merchantIdInPayPal'),
    //Handle ISU Merchant ID - SAVE to user
    //respond with a script that closes the ism window.
};
```

###Tech Stack

	Kraken, Node, Express, React

##License

MIT


