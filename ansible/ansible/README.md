# Ansible Documentation

This directory contains Ansible automation code for managing infrastructure and application deployment.

## Project Structure

```
ansible/
├── inventory.ini          # Inventory file containing target hosts
├── requirements.yml       # Ansible collection requirements
├── site.yml              # Main playbook
├── group_vars/           # Group-specific variables
└── roles/               # Ansible roles
    └── docker/          # Role for Docker installation and configuration
```

## Prerequisites

- Ansible installed on your control machine
- SSH access to target hosts
- Required Ansible collections (installed via requirements.yml)

## Required Collections

The project uses the following Ansible collections:
- community.docker
- ansible.posix

To install the required collections, run:
```bash
ansible-galaxy collection install -r requirements.yml
```

## Inventory

The `inventory.ini` file contains the target hosts configuration:
- EC2 instance with Ubuntu
- SSH access configured with private key

## Usage

1. Install required collections:
```bash
ansible-galaxy collection install -r requirements.yml
```

2. Run the main playbook:
```bash
ansible-playbook -i inventory.ini site.yml
```

## Playbooks

### site.yml
The main playbook that orchestrates the deployment process:
- Installs Docker on EC2 instances
- Uses the docker role for configuration

## Roles

### docker
Role responsible for Docker installation and configuration on target hosts.

## Variables

Group-specific variables can be found in the `group_vars/` directory.

## Security Notes

- The inventory file contains sensitive information (SSH keys)
- Ensure proper file permissions are set
- Consider using Ansible Vault for sensitive data

## Best Practices

1. Always use version control
2. Keep sensitive data encrypted
3. Use roles for reusable components
4. Document all variables and their purposes
5. Test playbooks in a staging environment first

## Troubleshooting

If you encounter issues:
1. Check SSH connectivity to target hosts
2. Verify Ansible collection installation
3. Ensure proper permissions on SSH keys
4. Check Ansible logs for detailed error messages 