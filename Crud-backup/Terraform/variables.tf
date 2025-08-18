variable "vpc_cidr" {}
variable "vpc_region" {}
variable "public_subnets" { type = list(string) }
variable "private_subnets" { type = list(string) }

variable "git_token" { sensitive = true }
variable "git_repo" {}
variable "s3_bucket" {}
variable "username_db" {}
variable "password_db" { sensitive = true }

variable "root_domain" {}
variable "frontend_subdomain" {}
variable "backend_subdomain" {}
variable "restore_from_snapshot" { default = false }
variable "snapshot_id" { default = "" }
