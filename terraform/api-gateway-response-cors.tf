# these responses are made only to work with cross-domain origin (CORS)

resource "aws_api_gateway_method_response" "200" {
  rest_api_id = "${aws_api_gateway_rest_api.example_api_gateway.id}"
  resource_id = "${aws_api_gateway_method.root_method.resource_id}"
  http_method = "${aws_api_gateway_method.root_method.http_method}"
  status_code = "200"
  response_parameters {
      "method.response.header.Access-Control-Allow-Headers" = true,
      "method.response.header.Access-Control-Allow-Methods" = true,
      "method.response.header.Access-Control-Allow-Origin" = true
  }
}

resource "aws_api_gateway_integration_response" "options_integration_response" {
    rest_api_id = "${aws_api_gateway_rest_api.example_api_gateway.id}"
    resource_id = "${aws_api_gateway_method.root_method.resource_id}"
    http_method = "${aws_api_gateway_method.root_method.http_method}"
    status_code   = "${aws_api_gateway_method_response.200.status_code}"
    response_parameters = {
        "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
        "method.response.header.Access-Control-Allow-Methods" = "'GET,OPTIONS,POST,PUT'",
        "method.response.header.Access-Control-Allow-Origin" = "'*'"
    }
    depends_on = ["aws_api_gateway_method_response.200"]
}
