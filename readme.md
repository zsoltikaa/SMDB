# SMDB - Series & Movies Database

![SMDB Screenshot](screenshot-main.png)

## 🎬 Overview
A cinematic AngularJS web app for browsing movies/TV shows with:
- Dark theme UI with amber accents
- Interactive film reel preloader
- Real-time search & sorting
- Genre statistics visualization

## ✨ Key Features
| Feature | Description |
|---------|-------------|
| **Rich Catalog** | 128+ entries with posters, ratings & streaming links |
| **Dynamic Filtering** | Live search by title with startsWith matching |
| **Visual Analytics** | Genre distribution charts with percentage breakdowns |
| **Cinematic UX** | Projector-style preloader with animated film strips |

## 🛠 Tech Stack
**Frontend**  
![AngularJS](https://img.shields.io/badge/AngularJS-1.8.2-E23237?logo=angularjs)  
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.3.3-06B6D4?logo=tailwindcss)

**Backend**  
![PHP](https://img.shields.io/badge/PHP-8.1-777BB4?logo=php)  
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql)

## 📸 UI Showcase

### Preloader Animation
![Preloader](screenshot-preloader.png)  
*Film reel spins while random seats "light up"*

### Main Interface
![Main View](screenshot-main.png)  
*Card-based layout with IMDb ratings and streaming links*

### Mobile Responsive
![Mobile](screenshot-mobile.png)  
*Collapsible sidebar with touch-friendly controls*

## 🚀 Quick Start
```bash
# 1. Clone repo
git clone https://github.com/yourusername/SMDB.git

# 2. Import database (adjust credentials in connect.php)
mysql -u root -p SMDB < smdb.sql

# 3. Serve (PHP built-in server)
php -S localhost:8000
