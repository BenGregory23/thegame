<div align="center">
  <h1>🎴 theGamo</h1>
  <p><strong>The cooperative card game, now online!</strong></p>
  
  <p>
    <a href="https://thegamo.yourdomain.com">
      <img src="https://img.shields.io/website?url=https%3A%2F%2Fthegamo.app&up_message=online&up_color=brightgreen&down_message=offline&down_color=red&label=site%20status" alt="Website Status">
    </a>
    <img src="https://img.shields.io/badge/nuxt-4.0-00DC82?logo=nuxt.js" alt="Nuxt">
    <img src="https://img.shields.io/badge/vue-3.0-4FC08D?logo=vue.js" alt="Vue">
    <img src="https://img.shields.io/badge/typescript-5.0-3178C6?logo=typescript" alt="TypeScript">
  </p>

  <p>
    <a href="https://thegamo.yourdomain.com">🎮 Play Now</a> •
    <a href="#features">Features</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#deployment">Deployment</a>
  </p>

  <img src="screenshot.png" alt="theGamo Screenshot" width="800">
</div>

---

## 📖 About

**theGamo** is the online web version of the popular cooperative card game _The Game_. Work together with friends to play all 98 cards onto four piles in the correct order. Communication is limited, teamwork is essential!

Stack cards in ascending or descending order, use your special moves wisely, and beat the deck together. Can you and your friends achieve the perfect score?

🎯 **[Play theGamo Live →](https://thegamo.yourdomain.com)**

---

## ✨ Features

- 🎮 **Real-time Multiplayer** – Play with 2-4 friends simultaneously
- 🌐 **Browser-Based** – No downloads, no installation, just play
- 💬 **Built-in Chat** – Coordinate strategy (without revealing your cards!)
- 🎨 **Modern UI** – Clean, gaming-focused design with dark mode
- ⚡ **Fast & Smooth** – Built with Nuxt 4 and Vue 3 for optimal performance
- 🔒 **Private Rooms** – Create rooms with unique codes for your group
- 📊 **Score Tracking** – See how well you did at the end of each game

---

## 🎯 How to Play

1. **Create or join a room** with your friends using a 6-character code
2. **Each player gets 7 cards** numbered from 2 to 99
3. **Play at least 2 cards per turn** onto four piles:
   - 2 ascending piles (play higher numbers)
   - 2 descending piles (play lower numbers)
4. **Use the backwards trick** – Play exactly 10 lower on ascending piles or 10 higher on descending piles
5. **Win together** by playing all cards, or lose if anyone gets stuck!

> ⚠️ **Remember:** You cannot discuss specific card numbers!

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Docker
- Git

### Quick Start (Local Development)

```bash
# Clone the repository
git clone https://github.com/yourusername/theGamo.git
cd theGamo

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit http://localhost:3000 to play!

### Docker Deployment

```bash
# Build the Docker image
docker build -t thegamo .

# Run the container
docker run -d \
  --name thegamo \
  -p 3000:3000 \
  --restart=always \
  thegamo
```

Your game will be available at http://localhost:3000

---

## 🛠️ Tech Stack

- **Framework:** [Nuxt 4](https://nuxt.com/)
- **UI:** Vue 3 + TypeScript
- **Styling:** Tailwind CSS + shadcn-vue
- **Real-time:** Socket.IO
- **Font:** Space Grotesk
- **Deployment:** Docker

---

## 📦 Project Structure

```
theGamo/
├── components/        # Vue components
│   ├── ui/           # shadcn-vue components
│   └── game/         # Game-specific components
├── pages/            # Route pages
├── server/           # Backend logic
│   ├── socket/       # Socket.IO handlers
│   │   ├── handlers/ # Event handlers
│   │   ├── managers/ # Game state management
│   │   └── models/   # Game models
│   └── api/          # API endpoints
├── shared/           # Shared types & utilities
└── public/           # Static assets
```

## 🙏 Acknowledgments

- Based on the card game _The Game_ by Steffen Benndorf
- UI components from [shadcn-vue](https://www.shadcn-vue.com/)
- Icons from [Lucide](https://lucide.dev/)

---

<div align="center">
  <p>Made with ❤️ and ☕</p>
  <p>
    <a href="https://thegamo.yourdomain.com">Play Now</a> •
    <a href="https://github.com/yourusername/theGamo/issues">Report Bug</a> •
    <a href="https://github.com/yourusername/theGamo/issues">Request Feature</a>
  </p>
</div>
