resource "aws_vpc" "example_vpc" {
  cidr_block = "10.0.0.0/16" #/16 means that last 2 blocks of ip will be variable
  enable_dns_hostnames = true # to rds have a public address

  tags {
    Name = "example-vpc"
  }
}

# this provices internet access for subnets (via route table)
resource "aws_internet_gateway" "example_internet_gateway" {
  vpc_id = "${aws_vpc.example_vpc.id}"
}

resource "aws_eip" "example_eip" {
  vpc = true
}

resource "aws_nat_gateway" "example_nat_gateway" {
  allocation_id = "${aws_eip.example_eip.id}"
  subnet_id     = "${aws_subnet.default_subnet.id}"
}
