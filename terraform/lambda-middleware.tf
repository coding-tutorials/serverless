resource "aws_lambda_function" "lambda_middleware" {
  function_name = "lambda-middleware"
  filename = "${var.lambda_middleware_path}/lambda-middleware.zip"
  handler = "iAWS_QUEUE_URLndex.handler"
  runtime = "nodejs8.10"

  role = "${aws_iam_role.example-role.arn}"

  environment {
    variables = {
      NODE_ENV = "production",

      DATABASE_URL = "${aws_db_instance.example-database.endpoint}",
      DATABASE_NAME = "${aws_db_instance.example-database.name}",
      DATABASE_USER = "${aws_db_instance.example-database.username}",
      DATABASE_PASSWORD = "${aws_db_instance.example-database.password}",

      AWS_QUEUE_URL = "${aws_sqs_queue.pictures_queue.id}",

      PUSHER_APP_ID = "${var.pusher_app_id}",
      PUSHER_KEY = "${var.pusher_key}",
      PUSHER_SECRET = "${var.pusher_secret}",

      # AWS credentials needed for SQS create message
      AWS_KEY = "${var.aws_access_key}",
      AWS_SECRET = "${var.aws_secret_key}"
    }
  }
}
