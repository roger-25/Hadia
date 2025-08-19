resource "aws_db_subnet_group" "hadia_db_subnet_group" {
  name       = "hadai-db-subnets"
  subnet_ids = var.private_subnet_ids
}

resource "aws_db_instance" "hadia_db" {
  allocated_storage         = 20
  engine                    = "mysql"
  engine_version            = "8.0"
  instance_class            = "db.t3.micro"
  db_name                   = "hadaidb"
  username                  = var.username_db
  password                  = var.password_db
  db_subnet_group_name      = aws_db_subnet_group.hadia_db_subnet_group.name
  skip_final_snapshot       = false
  final_snapshot_identifier = "hadai-db-final-${timestamp()}"
  snapshot_identifier       = var.restore_from_snapshot ? var.snapshot_id : null
}

output "db_endpoint" {
  value = aws_db_instance.hadia_db.address
}

output "db_username" {
  value = aws_db_instance.hadia_db.username
}

output "db_password" {
  value     = var.password_db
  sensitive = true
}
