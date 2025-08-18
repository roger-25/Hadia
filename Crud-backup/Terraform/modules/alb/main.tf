variable "public_subnets" { type = list(string) }
variable "target_group_arn" {}

resource "aws_lb" "alb" {
  name               = "hadai-alb"
  load_balancer_type = "application"
  subnets            = var.public_subnets
}

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.alb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = var.target_group_arn
  }
}

output "alb_dns_name" {
  value = aws_lb.alb.dns_name
}

output "alb_zone_id" {
  value = aws_lb.alb.zone_id
}
