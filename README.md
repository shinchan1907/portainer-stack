# Homelab Server Infrastructure

This repository contains the Portainer GitOps stack configurations for a production-grade homelab running on OpenMediaVault (OMV). The architecture is designed to be highly reliable, lightweight, and managed entirely through Portainer Stacks connected to this GitHub repository.

## System Architecture

- **OS:** OpenMediaVault (OMV) with Docker & Portainer
- **Hardware:** Intel i3 (3rd Gen), 16GB RAM, NVIDIA GT 730 GPU
- **Storage:** 256GB NVMe (Docker/Appdata), 256GB SSD (OS), 1TB HDD (Media/Files)
- **Networking:** Handled directly by Cloudflare Tunnels (No Nginx/Traefik).

## Services Included

1. **[Immich](./stacks/immich):** Photo and Video Backup platform (Port 2283).
2. **[Jellyfin](./stacks/jellyfin):** Hardware-accelerated (NVIDIA) Media Server (Port 8096).
3. **[Web FileManager](./stacks/filemanager):** Professional Web-based Filebrowser with an anonymous upload button (Port 8080).
4. **[Monitoring](./stacks/monitoring):** Full-stack observability with Grafana, Prometheus, Node Exporter, and cAdvisor (Port 3000).
5. **[Optional Tools](./stacks/optional):** Uptime Kuma for status monitoring and Watchtower for automated updates.

## Storage Layout

The system follows a strict layout across your storage drives:
```text
/srv/docker/appdata   -> Docker Configuration and Databases (NVMe)
/srv/media/movies     -> Media Files (1TB HDD)
/srv/media/tv         -> Media Files (1TB HDD)
/srv/media/anime      -> Media Files (1TB HDD)
/srv/media/music      -> Media Files (1TB HDD)
/srv/photos           -> Immich Library (1TB HDD)
/srv/uploads          -> File Manager Dropzone (1TB HDD)
/srv/downloads        -> General Downloads (1TB HDD)
```

## Setup & Deployment

Please read the **[Deployment Guide](deployment-guide.md)** for detailed, step-by-step instructions on configuring OpenMediaVault, setting up the file systems, and deploying these stacks via Portainer.
