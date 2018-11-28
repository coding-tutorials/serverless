variable "aws_access_key" {}
variable "aws_secret_key" {}
variable "aws_rds_password" {}
variable "pusher_key" {}
variable "pusher_secret" {}


provider "aws" {
  access_key = "${var.aws_access_key}"
  secret_key = "${var.aws_secret_key}"
  region     = "us-west-2"
}


# IAM role which dictates what other AWS services the Lambda function may access.
resource "aws_iam_role" "example-role" {
  name = "terraform-lambda-role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    },
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "apigateway.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "example-role" {
    name = "ApiCloudwatchPolicy"
    role = "${aws_iam_role.example-role.id}"

    policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:DescribeLogGroups",
        "logs:DescribeLogStreams",
        "logs:PutLogEvents",
        "logs:GetLogEvents",
        "logs:FilterLogEvents"
      ],
      "Resource": "*"
    }
  ]
}
EOF
}

resource "aws_lambda_function" "example-lambda-middleware" {
  function_name = "lambda-middleware"

  filename = "./lambda-middleware.zip"
  handler = "index.handler"
  runtime = "nodejs8.10"

  role = "${aws_iam_role.example-role.arn}"

  environment {
    variables = {
      NODE_ENV = "production",
      TR_VAR_aws_rds_password = "${var.aws_rds_password}",
      TF_VAR_aws_access_key = "${var.aws_access_key}"
      TF_VAR_aws_secret_key = "${var.aws_secret_key}"
    }
  }
}

resource "aws_api_gateway_rest_api" "example-api-gateway" {
  name = "ExampleApi"
  description = "For aws-lambda-example application"
}

resource "aws_api_gateway_resource" "example-app" {
  rest_api_id = "${aws_api_gateway_rest_api.example-api-gateway.id}"
  parent_id   = "${aws_api_gateway_rest_api.example-api-gateway.root_resource_id}"
  path_part   = "{proxy+}"
}

resource "aws_api_gateway_method" "proxy_root" {
  rest_api_id   = "${aws_api_gateway_rest_api.example-api-gateway.id}"
  resource_id   = "${aws_api_gateway_resource.example-app.id}"
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "lambda_root" {
  rest_api_id = "${aws_api_gateway_rest_api.example-api-gateway.id}"
  resource_id = "${aws_api_gateway_method.proxy_root.resource_id}"
  http_method = "${aws_api_gateway_method.proxy_root.http_method}"

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "${aws_lambda_function.example-lambda-middleware.invoke_arn}"
}


resource "aws_api_gateway_method_response" "200" {
  rest_api_id = "${aws_api_gateway_rest_api.example-api-gateway.id}"
  resource_id = "${aws_api_gateway_method.proxy_root.resource_id}"
  http_method = "${aws_api_gateway_method.proxy_root.http_method}"
  status_code = "200"
  response_parameters {
      "method.response.header.Access-Control-Allow-Headers" = true,
      "method.response.header.Access-Control-Allow-Methods" = true,
      "method.response.header.Access-Control-Allow-Origin" = true
  }
}

resource "aws_api_gateway_integration_response" "options_integration_response" {
    rest_api_id = "${aws_api_gateway_rest_api.example-api-gateway.id}"
    resource_id = "${aws_api_gateway_method.proxy_root.resource_id}"
    http_method = "${aws_api_gateway_method.proxy_root.http_method}"
    status_code   = "${aws_api_gateway_method_response.200.status_code}"
    response_parameters = {
        "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
        "method.response.header.Access-Control-Allow-Methods" = "'GET,OPTIONS,POST,PUT'",
        "method.response.header.Access-Control-Allow-Origin" = "'*'"
    }
    depends_on = ["aws_api_gateway_method_response.200"]
}


# resource "aws_api_gateway_method" "example-app-method1" {
#   rest_api_id   = "${aws_api_gateway_rest_api.example-api-gateway.id}"
#   resource_id   = "${aws_api_gateway_resource.example-app.id}"
#   http_method   = "ANY"
#   authorization = "NONE"
# }
#
# resource "aws_api_gateway_integration" "lambda-integration" {
#   rest_api_id = "${aws_api_gateway_rest_api.example-api-gateway.id}"
#   resource_id = "${aws_api_gateway_method.example-app-method1.resource_id}"
#   http_method = "${aws_api_gateway_method.example-app-method1.http_method}"
#
#   integration_http_method = "POST"
#   type                    = "AWS_PROXY"
#   uri                     = "${aws_lambda_function.example-lambda-middleware.invoke_arn}"
# }





resource "aws_api_gateway_deployment" "example-api-deployment" {
  depends_on = [
    "aws_api_gateway_integration.lambda_root"
  ]

  rest_api_id = "${aws_api_gateway_rest_api.example-api-gateway.id}"
  stage_name  = "prod"
}

resource "aws_api_gateway_method_settings" "example-app-method1-settings" {
  rest_api_id   = "${aws_api_gateway_rest_api.example-api-gateway.id}"
  stage_name  = "${aws_api_gateway_deployment.example-api-deployment.stage_name}"
  method_path = "*/*"
  settings {
    logging_level = "INFO"
    data_trace_enabled = true
    metrics_enabled = true
  }
}


resource "aws_lambda_permission" "example-api-permission" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.example-lambda-middleware.arn}"
  principal     = "apigateway.amazonaws.com"

  # The /*/* portion grants access from any method on any resource
  # within the API Gateway "REST API".
  //source_arn = "${aws_api_gateway_deployment.example-api-deployment.execution_arn}/*/*"
}

 output "base_url" {
   value = "${aws_api_gateway_deployment.example-api-deployment.invoke_url}"
 }

resource "aws_s3_bucket" "log-bucket" {
  bucket = "mamamylogbucket"
  acl    = "log-delivery-write"
}

resource "aws_s3_bucket" "front-end-bucket" {
  bucket = "awslambdaexample2000"
  acl    = "public-read"
  policy = <<POLICY
{
    "Version":"2012-10-17",
    "Statement":[
      {
        "Sid":"PublicReadGetObject",
        "Effect":"Allow",
        "Principal": "*",
        "Action":["s3:GetObject"],
        "Resource":["arn:aws:s3:::awslambdaexample2000/*"]
      }
    ]
}
POLICY

  website {
    index_document = "index.html"
  }

  versioning {
    enabled = true
  }

  logging {
   target_bucket = "${aws_s3_bucket.log-bucket.id}"
   target_prefix = "log/"
 }
}

resource "aws_s3_bucket_object" "index" {
  bucket = "${aws_s3_bucket.front-end-bucket.bucket}"
  key    = "index.html"
  source = "./front-end/dist/index.html"
  content_type = "text/html"
  //etag   = "${md5(file("path/to/file"))}"
}

resource "aws_s3_bucket_object" "indexhtml" {
  bucket = "${aws_s3_bucket.front-end-bucket.bucket}"
  key    = "bundle.js"
  source = "./front-end/dist/bundle.js"
}

output "site_url" {
  value = "${aws_s3_bucket.front-end-bucket.bucket_domain_name}"
}

resource "aws_db_instance" "default" {
  allocated_storage    = 20
  storage_type         = "gp2"
  engine               = "postgres"
  engine_version       = "10.4"
  instance_class       = "db.t2.micro"
  name                 = "stamper"
  username             = "terraform"
  password             = "${var.aws_rds_password}"
  publicly_accessible = true
}


resource "aws_sqs_queue" "terraform_queue" {
  name                      = "aws-example-queue"
}
