resource "aws_lambda_function" "lambda_middleware" {
  function_name = "lambda-middleware"

  filename = "${var.lambda_middleware_path}/lambda-middleware.zip"
  handler = "index.handler"
  runtime = "nodejs8.10"

  role = "${aws_iam_role.example-role.arn}"

  environment {
    variables = {
      NODE_ENV = "production",
      DATABASE_URL = "${aws_db_instance.example-database.endpoint}",
      DATABASE_USER = "${aws_db_instance.example-database.username}",
      DATABASE_PASSWORD = "${aws_db_instance.example-database.password}",
      # AWS credentials needed to create messages into SQS
      TF_VAR_aws_access_key = "${var.aws_access_key}"
      TF_VAR_aws_secret_key = "${var.aws_secret_key}"
    }
  }
}
