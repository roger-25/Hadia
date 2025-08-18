output "vpc_id" {
  value = module.vpc.vpc_id
}

output "rds_endpoint" {
  value = module.rds.db_endpoint
}

output "backend_alb_dns" {
  value = module.alb.alb_dns_name
}

output "frontend_app_url" {
  value = module.amplify.amplify_url
}
