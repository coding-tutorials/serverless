resource "aws_subnet" "public_subnet" {
  vpc_id = "${aws_vpc.example_vpc.id}"
  availability_zone = "${var.aws_region}a"
  cidr_block = "10.0.1.0/24"
  tags {
    Name = "public-subnet"
  }
}

resource "aws_subnet" "private_subnet_a" {
 vpc_id = "${aws_vpc.example_vpc.id}"
 availability_zone = "${var.aws_region}b"
 cidr_block = "10.0.2.0/24"
 tags {
   Name = "private-subnet-1"
 }
}

resource "aws_subnet" "private_subnet_b" {
 vpc_id = "${aws_vpc.example_vpc.id}"
 availability_zone = "${var.aws_region}c"
 cidr_block = "10.0.3.0/24"
 tags {
   Name = "private-subnet-2"
 }
}
