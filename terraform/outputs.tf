output "middleware_api_url" {
  value = "${aws_api_gateway_deployment.example_api_deployment.invoke_url}"
}

output "s3_front_end_url" {
  value = "${aws_s3_bucket.example_front_end_bucket.bucket_domain_name}"
}
