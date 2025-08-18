
resource "aws_amplify_app" "app" {
  name          = "hadai-frontend"
  repository    = var.git_repo
  access_token  = var.git_token
  build_spec    = null
}

resource "aws_amplify_branch" "main" {
  app_id          = aws_amplify_app.app.id
  branch_name     = "main"
  enable_auto_build = true
}

output "app_id" {
  value = aws_amplify_app.app.id
}

output "amplify_url" {
  value = aws_amplify_app.app.default_domain
}
