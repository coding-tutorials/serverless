resource "aws_s3_bucket" "example-log-bucket" {
  bucket = "logbucket-201812111701"
  acl    = "log-delivery-write"
}

resource "aws_s3_bucket" "example_front_end_bucket" {
  bucket = "example-front-end-bucket-201812111701"
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
        "Resource":["arn:aws:s3:::example-front-end-bucket-201812111701/*"]
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
   target_bucket = "${aws_s3_bucket.example-log-bucket.id}"
   target_prefix = "log/"
 }
}

resource "aws_s3_bucket_object" "index" {
  bucket = "${aws_s3_bucket.example_front_end_bucket.bucket}"
  key    = "index.html"
  source = "${var.front_end_path}/index.html"
  content_type = "text/html"
  //etag   = "${md5(file("path/to/file"))}"
}

resource "aws_s3_bucket_object" "indexhtml" {
  bucket = "${aws_s3_bucket.example_front_end_bucket.bucket}"
  key    = "bundle.js"
  source = "${var.front_end_path}/bundle.js"
}
