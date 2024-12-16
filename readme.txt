<Guided tutorial for beginners>
This file shows CRUD operations in postgres database with SAP BTP and nodejs
SAP BTP has cloud foundry which is runtime environment for this application
Backend is postgres database which is also available in SAP BTP cloud.
We use nodejs to create REST apis to create table, insert data into table and get data from postgres database.

Testing APIs - Insomnia
Browsing database- DBeaver
Pre-requisites- install nodejs,vscode

Step1- Copy the customer repository in your local machine
Step2- Add new .env file to the repository-
        #pg service key information
        PostgresUser = 
        PostgresHost = 
        PostgresDatabase = 
        PostgresPassword = 
        PostgresPort =

        PostgresLocalhost = localhost
        PostgresLocalPort = 63306            #default port to local access postgres cloud db

        localport = 5002 

        //Go to BTP Subaccount> Service Market Place> Postgres> create (This will create postgres database instance , it may take some time to complete the create)
        //create service key in postgres and then view the key (this key has the information you can add to the .env file in repository)

Step3- Deploy it to the runtime environment.
        Eg. for SAP BTP Cloud Foundry-
        //First install cf8 in your machine
        //Open vscode terminal in customer directory, run below-
            >cf8 login
            Enter BTP API Endpoint (From BTP Subaccount >Overview)
            Enter email
            Enter Password (Password is combination of password and otp)
            >cf8 push customer
            This will deploy the application to cloud foundry

Step4- To Test-
    (1) CloudFoundry- 
        1. Go to SAP BTP Subaccount> spaces> Open customer application> copy the application route eg.  <customer*.hana.ondemand.com
        this is the url to access your application
        <application url>/get/customer 
        this will display the customer details from customer table

    Note the browser is only for testing GET requests
    For POST request, you need to use a third party testing tool such as postman or insomnia etc.


    (2) Open Insomnia or postman for api testing> 
            >create a get request and copy the <applicationurl>/get/customer and send
             this will return the rows from your table
            >create a post request and access <applicationurl>/create/table and send
            this will create customer table if it doesnot exists
            >create a post request and access <applicationurl>/add/customer , in the body pass the table data you want to send-
             eg.       {
	                    "customerID" : "001",
	                    "name" : "custname",
	                    "phoneno" : "0123456789",
	                    "email" : "email@domain.com"
                    }

            this will add entries in customer table

    (3) To test locally, change the postgres.js file
        comment lines 6,10 and uncomment 7,11 to test on localhost 

            

