resource "aws_route53_zone" "main" {
  name = var.root_domain
}


resource "aws_route53_record" "frontend" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "${var.frontend_subdomain}.${var.root_domain}"
  type    = "CNAME"
  ttl     = 300
  records = ["${var.frontend_subdomain}.${var.root_domain}.amplifyapp.com"]
}

resource "aws_route53_record" "backend" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "${var.backend_subdomain}.${var.root_domain}"
  type    = "A"
  alias {
    name                   = var.alb_dns_name
    zone_id                = var.alb_zone_id
    evaluate_target_health = true
  }
}
