# SEED GAMES

1. Flappy Bird
2. Tetris
3. Snake
4. Pong (2v2 possible?)
5. minesweeper
6. breakout
7. space invaders
8. asteroids
9. platformer (mario style)

## Logic
Each game deploys a smart contract that handles micropayments and leaderboard management. Players pay a small fee to play (0.02USDC for 20 credits - 20 atemps), which goes into a prize pool. The smart contract tracks high scores and distributes rewards to top players at regular intervals.

### Contract Notes
Owner controls:
1. fee percentage
2. cycle time
3. winner allocation (1-10 winners)

Happy path:
1. cycle time ends (back-end function),
2. Back-end sends request to contract with list of winners and percentage alocation.
3. allocates funds for claim
4. back-end resets database

Conditions on claims:
1. winners have 7 days to claim funds. After that, funds are returned to the prize pool for the next cycle.

Additional features:
1. It is possible to send funds directly to the contract to increase the prize pool.
2. Block address from participating (in case of cheating).

### Storage:
1. Firebase

### Website Design
1. Retro design (only black and white - maybe gray)
2. Initial page with title (Seed Games - seed games - SEED GAMES), games displayed in a square, name of the game, connect wallet symbol, cycle time end in days, hours, minutes
3. tab with rules
4. tab with leaderboard per game
5. tab with wallet history accomplishments
6. user permissions and window. Admin, user. Users have a tab to check their history.

### Further Additions
1. Admin has an additional window to set cycle time and winner number and fee
2. Users have an additional page to check their history
3. Past learderboards archive
4. Multiplayer modes


run command:
python3 -m http.server 8000


### Base Sepolia contract:
https://sepolia.basescan.org/address/0xdd0bbf48f85f5314c3754cd63103be927b55986c
address: 0xdd0bbf48f85f5314c3754cd63103be927b55986c


Order of deployment:
1. smart-contract
2. change flappyBirdContractAddress in payments.js
3. deploy database and game


### TODO:
1. deploy dev in render
2. deploy front end in firebase
3. test
4. iterate
5. readme with correct instructions

WHAT YOU PRACTICE IN DEV, YOU WILL DO IN PROD.


### File Structure

```
x402-flappy-bird/                   # MONOREPO (everything together)
│
├── 📁 contracts/                   # Smart Contracts Layer
│   ├── FlappyBirdPrizePool.sol
│   └── interfaces/
│
├── 📁 functions/                   # Backend Layer (Firebase Cloud Functions)
│   ├── index.js                    # Entry point
│   ├── cycleManager.js             # Cycle management logic
│   ├── package.json
│   ├── .env                        # Production config (not committed)
│   └── .env.local                  # Local config (not committed)
│
├── 📁 frontend/                    # Frontend Layer (Firebase Hosting)
│   ├── index.html
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── game.js                 # Game logic
│   │   ├── leaderboard.js          # Leaderboard display
│   │   └── payments.js             # Wallet & USDC payments
│   └── assets/                     # Images, sounds, etc.
│
├── 📁 script/                      # Deployment Scripts
│   └── Deploy.s.sol                # Foundry deployment
│
├── 📁 test/                        # Tests (all layers)
│   ├── FlappyBirdPrizePool.t.sol   # Contract tests
│   ├── MockUSDC.sol                # Test helpers
│   └── cycleManager.test.js        # Backend tests
│
├── 📁 docs/                        # Documentation
│   ├── FIREBASE_SETUP.md
│   ├── FIREBASE_CYCLE_MANAGER_DEPLOYMENT.md
│   └── SECRET_KEY_MANAGEMENT.md
│
├── 📄 firebase.json                # Firebase config
├── 📄 firestore.rules              # Database security rules
├── 📄 firestore.indexes.json       # Database indexes
├── 📄 foundry.toml                 # Contract framework config
├── 📄 .env                         # Root env (for contract deployment)
├── 📄 .gitignore                   # Git ignore (protects secrets)
├── 📄 package.json                 # Root dependencies
└── 📄 README.md                    # This file
```

**Architecture**: Monorepo with clear separation of concerns
- Each folder is independent but shares configs
- Single deployment pipeline via Firebase
- Contract deployed separately via Foundry