resource "aws_db_subnet_group" "example_subnet_group" {
  name = "main"
  subnet_ids = ["${aws_subnet.default_subnet.id}", "${aws_subnet.secondary_subnet.id}"]
  tags = { Name = "Example subnet group" }
}

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
  availability_zone = "${aws_subnet.default_subnet.availability_zone}"

  vpc_security_group_ids = ["${aws_security_group.rds_security_group.id}"]
  db_subnet_group_name = "${aws_db_subnet_group.example_subnet_group.name}"
}
