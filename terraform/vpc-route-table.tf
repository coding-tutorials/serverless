resource "aws_route_table" "example_route_table" {
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

resource "aws_route_table_association" "igw1" {
  subnet_id      = "${aws_subnet.default_subnet.id}"
  route_table_id = "${aws_route_table.example_route_table.id}"
}

resource "aws_route_table_association" "nat1" {
  subnet_id = "${aws_subnet.secondary_subnet.id}"
  route_table_id = "${aws_route_table.example_route_table_nat.id}"
}
