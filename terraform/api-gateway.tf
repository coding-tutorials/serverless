resource "aws_api_gateway_rest_api" "example_api_gateway" {
  name = "example-api-gateway"
  description = "middlware api application"
}

resource "aws_api_gateway_resource" "example_gateway_resource" {
  rest_api_id = "${aws_api_gateway_rest_api.example_api_gateway.id}"
  parent_id   = "${aws_api_gateway_rest_api.example_api_gateway.root_resource_id}"
  path_part   = "{proxy+}"
}

resource "aws_api_gateway_method" "root_method" {
  rest_api_id   = "${aws_api_gateway_rest_api.example_api_gateway.id}"
  resource_id   = "${aws_api_gateway_resource.example_gateway_resource.id}"
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_deployment" "example_api_deployment" {
  depends_on = ["aws_api_gateway_integration.lambda_root"]
  
  rest_api_id = "${aws_api_gateway_rest_api.example_api_gateway.id}"
  stage_name  = "prod"
}

resource "aws_api_gateway_method_settings" "example_gateway_resource-method1-settings" {
  rest_api_id   = "${aws_api_gateway_rest_api.example_api_gateway.id}"
  stage_name  = "${aws_api_gateway_deployment.example_api_deployment.stage_name}"
  method_path = "*/*"
  settings {
    logging_level = "INFO"
    data_trace_enabled = true
    metrics_enabled = true
  }
}
