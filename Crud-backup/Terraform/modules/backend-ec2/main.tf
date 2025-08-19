resource "aws_security_group" "backend_sg" {
  name   = "backend-sg"
  vpc_id = var.vpc_id
}

data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }
}

resource "aws_instance" "backend" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.micro"
  subnet_id     = var.subnet_ids[0]
  vpc_security_group_ids = [aws_security_group.backend_sg.id]

  user_data = <<-EOF
              #!/bin/bash
              sudo apt update -y
              curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
              sudo apt install -y nodejs git
              sudo npm install -g pm2

              cd /home/ubuntu
              git clone https://github.com/roger-25/Hadia.git
              cd hadiya-backend
              npm install

              # Copy environment file and replace values using Terraform-provided RDS details
              cp .env.development .env
              sed -i "s|DB_CONNECTION_STRING=.*|DB_CONNECTION_STRING=mysql://${var.db_user}:${var.db_pass}@${var.db_endpoint}:3306/hadiya_db|" .env
              sed -i "s|PORT=.*|PORT=3000|" .env

              npm run pm2start
              EOF

  tags = { 
    Name = "hadai-backend" 
  }
}




resource "aws_lb_target_group" "tg" {
  name     = "backend-tg"
  port     = 80
  protocol = "HTTP"
  vpc_id   = var.vpc_id
}

resource "aws_lb_target_group_attachment" "attach" {
  target_group_arn = aws_lb_target_group.tg.arn
  target_id        = aws_instance.backend.id
  port             = 80
}

output "target_group_arn" {
  value = aws_lb_target_group.tg.arn
}
