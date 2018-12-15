resource "aws_subnet" "default_subnet" {
  vpc_id = "${aws_vpc.example_vpc.id}"
  availability_zone = "${var.aws_region}a"
  cidr_block = "10.0.3.0/24" #/24 means that last 3 blocks of ip will be variable
  tags {
    Name = "default-subnet"
  }
}

# I only create this due a requirement for RDS subnet groups:
# "Subnet groups must contain at least two subnets in two different Availability Zones in the same region"
# https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbsubnet-group.html
resource "aws_subnet" "secondary_subnet" {
 vpc_id = "${aws_vpc.example_vpc.id}"
 availability_zone = "${var.aws_region}b"
 cidr_block = "10.0.4.0/24" #/24 means that last 3 blocks of ip will be variable
 tags {
   Name = "secondary-subnet"
 }
}
