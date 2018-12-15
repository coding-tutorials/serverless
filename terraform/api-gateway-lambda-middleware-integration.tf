resource "aws_api_gateway_integration" "lambda_root" {
  depends_on = ["aws_api_gateway_method.root_method"]

  rest_api_id = "${aws_api_gateway_rest_api.example_api_gateway.id}"
  resource_id = "${aws_api_gateway_method.root_method.resource_id}"
  http_method = "${aws_api_gateway_method.root_method.http_method}"

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "${aws_lambda_function.lambda_middleware.invoke_arn}"
}

resource "aws_lambda_permission" "example_api_permission" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.lambda_middleware.arn}"
  principal     = "apigateway.amazonaws.com"
}
