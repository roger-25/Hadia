terraform {
  required_version = ">= 1.3.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.0"
    }
  }
}

  backend "s3" {
    bucket         = "hadia"
    key            = "crud/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-locks"
  }

provider "aws" {
  region = var.vpc_region
}

module "vpc" {
  source          = "./modules/vpc"
  vpc_cidr        = var.vpc_cidr
  public_subnets  = var.public_subnets
  private_subnets = var.private_subnets
}

module "rds" {
  source               = "./modules/rds"
  vpc_id               = module.vpc.vpc_id
  private_subnet_ids   = module.vpc.private_subnet_ids
  username_db          = var.username_db
  password_db          = var.password_db
  restore_from_snapshot = var.restore_from_snapshot
  snapshot_id          = var.snapshot_id
}

module "backend" {
  source      = "./modules/backend-ec2"
  subnet_ids  = module.vpc.private_subnet_ids
  vpc_id      = module.vpc.vpc_id

  # pass RDS connection info
  db_endpoint = module.rds.db_endpoint
  db_user     = var.username_db
  db_pass     = var.password_db
}


module "alb" {
  source           = "./modules/alb"
  public_subnets   = module.vpc.public_subnet_ids
  target_group_arn = module.backend.target_group_arn
}

module "amplify" {
  source            = "./modules/frontend-amplify"
  git_token         = var.git_token
  git_repo          = var.git_repo
  root_domain       = var.root_domain
  frontend_subdomain = var.frontend_subdomain
}

module "route53" {
  source             = "./modules/route53"
  root_domain        = var.root_domain
  frontend_subdomain = var.frontend_subdomain
  backend_subdomain  = var.backend_subdomain
  amplify_app_id     = module.amplify.app_id
  alb_dns_name       = module.alb.alb_dns_name
  alb_zone_id        = module.alb.alb_zone_id
}
