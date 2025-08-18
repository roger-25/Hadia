variable "vpc_id" {}
variable "private_subnet_ids" { type = list(string) }
variable "username_db" {}
variable "password_db" { sensitive = true }
variable "restore_from_snapshot" {}
variable "snapshot_id" {}