variable "aws_access_key" {}
variable "aws_secret_key" {}
variable "aws_region" {
  default = "us-west-2"
}
variable "front_end_path" {
  default = "../front-end/dist"
}
variable "lambda_middleware_path" {
  default = "../lambda-middleware"
}
variable "lambda_picture_stamper_path" {
  default = "../lambda-picture-stamper"
}
variable "aws_rds_password" {}
variable "pusher_app_id" {}
variable "pusher_key" {}
variable "pusher_secret" {}
