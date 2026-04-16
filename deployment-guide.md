# Deployment Guide

This guide details exactly how to deploy the homelab architecture to your OpenMediaVault server using Portainer and GitOps.

## 1. Directory Structure Preparation

Before deploying any stacks, log into your server via SSH and verify your directory structure. Ensure your drives are correctly mounted at `/srv`.

Run the following commands to create the necessary directories:

```bash
sudo mkdir -p /srv/docker/appdata/{immich,jellyfin,filemanager,grafana,prometheus,uptime-kuma}
sudo mkdir -p /srv/media/{movies,tv,anime,music}
sudo mkdir -p /srv/photos
sudo mkdir -p /srv/uploads
sudo mkdir -p /srv/downloads
```

Make sure the Docker daemon has read/write permissions to these folders.

## 2. NVIDIA GPU Preparation (For Jellyfin)

To utilize the GT 730 for Jellyfin transcoding, you must install the NVIDIA Container Toolkit on OpenMediaVault.
```bash
# Add the package repositories
curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg
curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list | \
  sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | \
  sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list

# Install Toolkit
sudo apt-get update
sudo apt-get install -y nvidia-container-toolkit
sudo nvidia-ctk runtime configure --runtime=docker
sudo systemctl restart docker
```

## 3. Deploying Stacks in Portainer

For each service in the `stacks/` directory, perform the following in Portainer:

1. Go to **Stacks** -> **Add stack**.
2. Select **Repository** (GitOps).
3. Enter your GitHub repository URL.
4. Provide the correct path to the Compose file (e.g., `stacks/jellyfin/docker-compose.yml`).
5. Enable **Automatic updates** to ensure Polling updates your services when you push changes to GitHub.
6. For services requiring `.env` files (like Immich), copy the variables from `.env.example` into the **Environment variables** section in Portainer.

## 4. Specific Service Instructions

### Web File Manager (Anonymous Upload Button)
To achieve the non-authenticated upload button on the login screen:
1. Deploy the `filemanager` stack.
2. Log into the Filebrowser UI on `files.sunnygupta.me` (Default: `admin` / `admin`).
3. Navigate to `/srv/uploads` and click the "Share" button.
4. Create a public Share Link and allow "Upload" permissions. Copy the `/share/xxxxxx` link.
5. Edit `stacks/filemanager/branding/custom.js` in this Git repository, and paste the share link URL where indicated.
6. Push the change to Git. Portainer will pull it.
7. In Filebrowser Settings -> Global Settings, set "Branding directory path" to `/branding` and apply. This activates the custom upload button on your login page.

### Monitoring
Grafana is pre-configured to connect to Prometheus.
1. Access Grafana at `grafana.sunnygupta.me` (Default: `admin` / `admin`).
2. Add Prometheus as a Data Source via HTTP URL: `http://prometheus:9090`.
3. Import Community Dashboards such as Node Exporter Full (ID: 1860) and cAdvisor (ID: 14282) directly into Grafana to instantly view resource metrics without further setup.

## 5. Migrating to RAID1 Later
When you install your second 1TB HDD:
1. Use OMV Admin UI to wipe the new drive.
2. Stop all Docker containers.
3. Use `rsync` or the `mdadm` tool via OMV RAID management to build the RAID1 mirror.
4. Remount the RAID1 array at `/srv/media` and update `/etc/fstab`.
5. Restart Docker. Cloudflare routing and Portainer Stacks will remain entirely unaffected.
