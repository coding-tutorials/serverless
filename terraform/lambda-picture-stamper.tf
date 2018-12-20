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

  # vpc_config {
  #   subnet_ids = ["${aws_subnet.example_subnet_a.id}", "${aws_subnet.example_subnet_b.id}"]
  #   security_group_ids = ["${aws_security_group.example_security_group.id}"]
  # }
}

resource "aws_lambda_event_source_mapping" "example" {
  event_source_arn = "${aws_sqs_queue.pictures_queue.arn}"
  function_name    = "${aws_lambda_function.lambda_picture_stamper.arn}"
}
