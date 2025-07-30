# CI/CD Pipeline Setup Guide

This guide explains how to set up and use the automated CI/CD pipeline for building, testing, scanning, and deploying Docker images with GitHub Actions.

## 🚀 Overview

The CI/CD pipeline includes:
- **Build & Test**: Node.js application building and testing
- **Security Scanning**: Trivy vulnerability scanning for both code and Docker images
- **Docker Build & Push**: Building and pushing images to Private Docker Registry
- **Discord Notifications**: Real-time notifications for deployment status

## 📋 Prerequisites

1. **GitHub Repository**: Your code must be in a GitHub repository
2. **GitHub Actions**: Enabled in your repository settings
3. **Private Docker Registry**: Access to a private Docker registry
4. **Discord Webhook**: For notifications (optional but recommended)

## 🔧 Setup Instructions

### 1. Repository Configuration

The pipeline is configured to use a private Docker registry. You need to set up the required secrets in your GitHub repository settings.

### 2. GitHub Secrets Setup

Navigate to your repository → Settings → Secrets and variables → Actions, then add the following secrets:

#### Required Secrets:
- `GITHUB_TOKEN` (automatically provided by GitHub)
- `DOCKER_REGISTRY`: Your private registry URL
- `DOCKER_USERNAME`: Registry username
- `DOCKER_PASSWORD`: Registry password/token
- `DOCKER_IMAGE_NAME`: The image name in your registry

#### Optional Secrets:
- `DISCORD_WEBHOOK_URL`: Discord webhook URL for notifications

### 3. Discord Webhook Setup (Optional)

1. Go to your Discord server
2. Navigate to Server Settings → Integrations → Webhooks
3. Create a new webhook
4. Copy the webhook URL
5. Add it as `DISCORD_WEBHOOK_URL` secret in GitHub

## 🔄 Workflow Triggers

The pipeline runs on:
- **Push to main/develop branches**: Full CI/CD pipeline
- **Push with version tags (v*)**: Full CI/CD pipeline with release notifications
- **Pull requests**: Security scanning only

## 📊 Pipeline Jobs

### 1. Build and Test (`build-and-test`)
- Sets up Node.js environment
- Installs dependencies
- Runs tests (if configured)

### 2. Security Scan (`security-scan`)
- Runs Trivy vulnerability scanner
- Scans for OS and library vulnerabilities
- Uploads results to GitHub Security tab

### 3. Build and Push (`build-and-push`)
- Builds Docker image using multi-stage build
- Runs Trivy scan on the built image
- Pushes to Private Docker Registry
- Only runs on main branch and version tags

### 4. Discord Notification (`notify-discord`)
- Sends success/failure notifications to Discord
- Includes deployment details and image information

## 🐳 Docker Image Tags

The pipeline automatically creates the following tags:
- `latest`: Latest build from main branch
- `{branch}-{sha}`: Branch-specific builds
- `v{version}`: Semantic version tags
- `{major}.{minor}`: Major.minor version tags

## 🔍 Security Scanning

### Trivy Scanner Features:
- **Filesystem scanning**: Detects vulnerabilities in your code
- **Dependency scanning**: Checks npm dependencies
- **Docker image scanning**: Scans built Docker images
- **Secret detection**: Finds hardcoded secrets
- **Configuration scanning**: Checks for misconfigurations

### Scan Results:
- Results are uploaded to GitHub Security tab
- PR comments include scan summaries
- Pipeline fails on critical/high severity vulnerabilities

## 📝 Customization

### Using Custom Docker Registry

Update the workflow file to use your private registry:

#### Docker Hub
```yaml
# GitHub Secrets:
DOCKER_REGISTRY: docker.io
DOCKER_USERNAME: yourusername
DOCKER_PASSWORD: yourpassword
DOCKER_IMAGE_NAME: yourusername/yourapp
```

### Adding Custom Tests

Update the `package.json` scripts and the workflow:

```json
{
  "scripts": {
    "test": "jest",
    "test:coverage": "jest --coverage"
  }
}
```

### Custom Security Rules

Modify Trivy scan parameters in the workflow:

```yaml
- name: Run Trivy vulnerability scanner
  uses: aquasecurity/trivy-action@master
  with:
    severity: 'CRITICAL,HIGH,MEDIUM'  # Add MEDIUM if needed
    ignore-unfixed: false  # Include unfixed vulnerabilities
```

## 🚨 Troubleshooting

### Common Issues:

1. **Permission Denied**: Ensure GitHub Actions has write permissions to packages
2. **Docker Build Fails**: Check Dockerfile syntax and dependencies
3. **Trivy Scan Fails**: Verify image exists and is accessible
4. **Registry Authentication Fails**: Check registry credentials and permissions
5. **Discord Notifications Not Working**: Check webhook URL and permissions

### Debug Steps:

1. Check GitHub Actions logs for detailed error messages
2. Verify all required secrets are set correctly
3. Test Docker build locally: `docker build -t test-image .`
4. Test registry login locally: `docker login your-registry.com`
5. Test Trivy locally: `trivy image test-image`

## 📈 Monitoring

### GitHub Security Tab:
- View all security scan results
- Track vulnerability trends
- Configure security policies

### Discord Notifications:
- Real-time deployment status
- Build success/failure alerts
- Image information for deployment

## 🔒 Security Best Practices

1. **Regular Updates**: Keep dependencies updated
2. **Image Scanning**: Always scan Docker images before deployment
3. **Secret Management**: Use GitHub secrets for sensitive data
4. **Access Control**: Limit registry access to necessary users
5. **Monitoring**: Set up alerts for security issues

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Trivy Documentation](https://aquasecurity.github.io/trivy/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Docker Hub Documentation](https://docs.docker.com/docker-hub/)