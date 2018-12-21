# aws-serverless-example

This is a purposefully over-engineered project to cover "ALL YOU SHOULD KNOW ABOUT serverless" in the simplest possible way. The intent is to learn and discuss a serverless software architecture on the cloud. So, if you have any questions, doubts or even suggestions, let's talk via [issues](https://github.com/leonardi-tutorials/aws-lambda-example/issues)!

#### Projects:

- **/front-end** is the static website, created with a cool stack: webpack, react and redux!
- **/middleware** built with Node.js, it handles the basic website back-end: routes, database, and websocket notifications.
- **/stamper-service** a Node.js specialist service, it deals with image manipulation, stamping the pictures! It's one of many specialist micro-services you'll have in your real-world application.
- **/terraform** is the code which creates and modify the infrastructure on the cloud, built with.. Terraform!

#### The cloud architecture:

![](https://github.com/leonardi-tutorials/aws-lambda-example/raw/master/image-architecture.png)

###### VPC and NAT Gateway, what is that? 🤔
- A **VPC** will isolate the RDS Database from public access to guarantee that only our /middlware service will have access to it.
- We can't close totally our VPC from "outside world" because /middleware needs access to the internet to respond the HTTP requests, and **NAT Gateway** will give us a public IP and forward data to the public internet!

###### API Gateway:

Since serverless lambdas isn't an instance, it can't be waiting all the time listening for requests, they can be only invoked.

API Gateway is a cool service which creates a HTTP route and when these routes are requested it invokes our lambdas with that HTTP request, awesome, isn't?

###### SQS queue:
While using micro-services architecture we need to establish communication amongst them. There are 2 known ways to do that:
- **Via HTTP:** It's a synchronous 1-1 way, a service which makes a request to another service will be idle waiting for the response.
- **Via Message Queue**: It's an asynchronous 1-N way, a service can write as many messages as want, and can do something else. Multiple instances of other services can read those messages, process and then respond (or not) to the service which created the message.

In our case /middlware create messages in SQS queue with pictures to be stamped. The /stamper-service will read from this queue, process stamping those pictures and then make a HTTP request to /middlware notifying that pictures are ready! As you can see you can combine both HTTP and Message Queue!

###### Pusher ([https://pusher.com](https://pusher.com)):

The major "problem" using lambda instead an instance, such an EC2 is because they can't be running all the time listening for requests, such as HTTP or websocket server, so we need 3rd party service to solve these problems.


###### Lambda
Lambda is just like instances however only can be invoked and isn't intended to be listening to something. Though it may sound limiting, actually you can use almost as an instance:
- We can use the filesystem: `/tmp` directory is available, it the /stamper-service we download the stamps pictures file to create the stamped picture.
- The invokation can be done in multiple ways: by a HTTP request, a message queue, a database trigger and more.

- If you need a listening server, you can use an instance such as EC2 instad Lambda to that specific job, or use 3rd party solutions, such as we used Pusher in this project.
