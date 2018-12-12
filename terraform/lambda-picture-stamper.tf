resource "aws_lambda_function" "lambda_picture_stamper" {
  function_name = "lambda-picture-stamper"

  filename = "${var.lambda_picture_stamper_path}/lambda-picture-stamper.zip"
  handler = "index.handler"
  runtime = "nodejs8.10"

  role = "${aws_iam_role.example-role.arn}"

  environment {
    variables = {
      NODE_ENV = "production",
      MIDDLEWARE_API_URL = "${aws_api_gateway_deployment.example_api_deployment.invoke_url}"
    }
  }
}
