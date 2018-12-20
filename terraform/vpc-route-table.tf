resource "aws_route_table" "example_route_table_igw" {
  vpc_id = "${aws_vpc.example_vpc.id}"
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = "${aws_internet_gateway.example_internet_gateway.id}"
  }

  tags { Name = "Example route table IGW" }
}

resource "aws_route_table" "example_route_table_nat" {
  vpc_id = "${aws_vpc.example_vpc.id}"
  route {
    cidr_block = "0.0.0.0/0"
    nat_gateway_id  = "${aws_nat_gateway.example_nat_gateway.id}"
  }

  tags { Name = "Example route table NAT" }
}

resource "aws_route_table_association" "igw" {
  subnet_id      = "${aws_subnet.public_subnet.id}"
  route_table_id = "${aws_route_table.example_route_table_igw.id}"
}

resource "aws_route_table_association" "nat_a" {
  subnet_id = "${aws_subnet.private_subnet_a.id}"
  route_table_id = "${aws_route_table.example_route_table_nat.id}"
}

resource "aws_route_table_association" "nat_b" {
  subnet_id = "${aws_subnet.private_subnet_b.id}"
  route_table_id = "${aws_route_table.example_route_table_nat.id}"
}
