resource "aws_db_instance" "example-database" {
  allocated_storage    = 20
  storage_type         = "gp2"
  engine               = "postgres"
  engine_version       = "10.4"
  instance_class       = "db.t2.micro"
  name                 = "stamper"
  username             = "terraform"
  password             = "${var.aws_rds_password}"
  publicly_accessible = true
}
