# Flappy Bird Prize Pool - System Diagrams

## 1. System Interaction Diagram (Component Architecture)

```mermaid
flowchart TB
    subgraph Frontend["🖥️ Frontend (HTML/JS)"]
        UI[Game UI]
        Wallet[Wallet Connection]
        GameJS[game.js]
        PaymentsJS[payments.js]
        LeaderboardJS[leaderboard.js]
    end

    subgraph Firebase["☁️ Firebase Cloud Functions"]
        IndexJS[index.js]
        CycleManager[cycleManager.js]
        subgraph AdminFunctions["Admin Functions"]
            UpdateCycle[updateCycleDuration]
            UpdateWinners[updateNumberOfWinners]
            UpdateFee[updateFeePercentage]
            GetConfig[getAdminConfig]
        end
        subgraph UserFunctions["User Functions"]
            SubmitScore[submitScore]
            RecordPayment[recordPayment]
            GetProfile[getUserProfile]
            GetLeaderboard[getLeaderboard]
        end
        subgraph CycleFunctions["Cycle Functions"]
            CheckCycle[checkCycleScheduled]
            ForceAllocate[forceAllocate]
            AllocateFunds[allocateFundsToWinners]
        end
    end

    subgraph Firestore["🗃️ Firestore Database"]
        Scores[(scores)]
        UserProfiles[(userProfiles)]
        CycleState[(cycleState)]
        Config[(config)]
        CycleMetadata[(cycleMetadata)]
        Archives[(archived scores)]
    end

    subgraph Blockchain["⛓️ Base Sepolia"]
        Contract[FlappyBirdPrizePool.sol]
        USDC[USDC Token]
    end

    subgraph ExternalWallet["👛 User Wallet"]
        MetaMask[MetaMask]
        Phantom[Phantom]
        WC[WalletConnect]
    end

    %% Frontend to Wallet
    UI --> Wallet
    Wallet --> MetaMask
    Wallet --> Phantom
    Wallet --> WC

    %% Frontend to Firebase Functions
    GameJS -->|POST /submitScore| SubmitScore
    PaymentsJS -->|POST /recordPayment| RecordPayment
    LeaderboardJS -->|GET /getLeaderboard| GetLeaderboard
    LeaderboardJS -->|GET /getArchivedLeaderboards| CycleMetadata

    %% Frontend to Blockchain
    PaymentsJS -->|payToPlay(), donate()| Contract
    PaymentsJS -->|claimReward()| Contract
    PaymentsJS -->|rewards(), totalPool()| Contract

    %% Firebase to Firestore
    SubmitScore --> Scores
    SubmitScore --> UserProfiles
    RecordPayment --> UserProfiles
    GetLeaderboard --> Scores
    GetConfig --> Config
    GetConfig --> CycleState
    CheckCycle --> CycleState
    ForceAllocate --> CycleState
    AllocateFunds --> CycleMetadata
    AllocateFunds --> Archives

    %% Firebase to Blockchain
    AllocateFunds -->|allocateFunds()| Contract
    CycleManager -->|fundsAllocated(), totalPool()| Contract

    %% Contract to Token
    Contract <-->|transferFrom, transfer| USDC

    %% Wallet to Blockchain
    MetaMask --> Contract
    Phantom --> Contract
    WC --> Contract
```

---

## 2. Behavior Diagram (Sequence Diagram)

### 2.1 Player Payment & Game Flow

```mermaid
sequenceDiagram
    participant U as 👤 User
    participant F as 🖥️ Frontend
    participant W as 👛 Wallet
    participant C as 📜 Contract
    participant FF as ☁️ Firebase Functions
    participant DB as 🗃️ Firestore

    Note over U,DB: Payment Flow
    U->>F: Click "Pay to Play"
    F->>W: Request USDC Approval
    W->>U: Confirm Transaction
    U->>W: Approve
    W->>C: approve(contract, 0.02 USDC)
    C-->>W: Success
    F->>W: Call payToPlay()
    W->>C: payToPlay()
    C->>C: totalPool += 0.02 USDC
    C-->>W: PlayerPaid Event
    W-->>F: Transaction Success
    F->>FF: POST /recordPayment
    FF->>DB: Update userProfiles
    DB-->>FF: OK
    FF-->>F: Payment Recorded
    F->>U: "10 tries granted!"

    Note over U,DB: Gameplay Flow
    U->>F: Play Game
    F->>F: Track Score
    U->>F: Game Over (score: 42)
    F->>FF: POST /submitScore
    FF->>DB: Check existing score
    alt New High Score
        FF->>DB: Update scores collection
        FF->>DB: Update userProfiles
        FF-->>F: "New high score!"
    else Not a High Score
        FF-->>F: "Score saved"
    end
    F->>U: Show Result
```

### 2.2 Cycle End & Prize Allocation Flow

```mermaid
sequenceDiagram
    participant S as ⏰ Scheduler
    participant CM as 🔄 CycleManager
    participant DB as 🗃️ Firestore
    participant C as 📜 Contract
    participant W as 👤 Winners

    Note over S,W: Scheduled Cycle Check (Every 5 min)
    S->>CM: checkCycleScheduled()
    CM->>DB: Get cycleState
    DB-->>CM: {startTime, endTime}
    
    alt Cycle Has Ended
        CM->>DB: Get top N scores
        DB-->>CM: Winners List
        CM->>CM: Calculate percentages
        CM->>C: fundsAllocated()?
        C-->>CM: false
        CM->>C: totalPool()?
        C-->>CM: Pool Amount
        CM->>C: allocateFunds(fee, winners, percentages)
        C->>C: Calculate rewards
        C->>C: rewards[winner] += amount
        C->>C: fundsAllocated = true
        C-->>CM: FundsAllocated Event
        
        Note over CM,DB: Database Reset
        CM->>DB: Archive scores to new collection
        CM->>DB: Save cycle metadata
        CM->>DB: Clear scores collection
        CM->>DB: Update cycleState (new cycle)
        
        CM-->>S: "Allocation Complete"
    else Cycle Active
        CM-->>S: "No action needed"
    end

    Note over W,C: Winners Claim Rewards
    W->>C: rewards(myAddress)
    C-->>W: Reward Amount
    W->>C: claimReward()
    C->>C: rewards[sender] = 0
    C->>W: Transfer USDC
```

---

## 3. State Diagram (Cycle States)

```mermaid
stateDiagram-v2
    [*] --> CycleActive: Initialize System

    state CycleActive {
        [*] --> AcceptingPlayers
        AcceptingPlayers --> AcceptingPlayers: payToPlay()
        AcceptingPlayers --> AcceptingPlayers: submitScore()
        AcceptingPlayers --> AcceptingPlayers: donate()
    }

    CycleActive --> CycleEnded: endTime reached

    state CycleEnded {
        [*] --> PendingAllocation
        PendingAllocation --> AllocatingPrizes: checkCycleScheduled()
        AllocatingPrizes --> PrizesAllocated: allocateFunds() success
        PrizesAllocated --> ArchivingData: Archive scores
        ArchivingData --> ResettingLeaderboard: Clear scores
    }

    CycleEnded --> CycleActive: New cycle started

    state ClaimPeriod {
        [*] --> ClaimsOpen
        ClaimsOpen --> ClaimsOpen: claimReward()
        ClaimsOpen --> SweepUnclaimed: 7+ days passed
    }

    CycleEnded --> ClaimPeriod: fundsAllocated = true
    ClaimPeriod --> CycleActive: sweepUnclaimed()

    note right of CycleActive
        fundsAllocated = false
        totalPool accumulating
        Leaderboard active
    end note

    note right of CycleEnded
        fundsAllocated = true
        Rewards assigned
        Winners can claim
    end note

    note right of ClaimPeriod
        Winners: 7 days to claim
        After: owner can sweep
    end note
```

---

## 4. Activity Diagram (Full System Flow)

```mermaid
flowchart TD
    Start([🎮 User Visits Site]) --> ConnectWallet{Connect Wallet?}
    
    ConnectWallet -->|No| ViewOnly[View Leaderboard Only]
    ConnectWallet -->|Yes| SelectWallet{Select Wallet}
    
    SelectWallet --> MetaMask[MetaMask]
    SelectWallet --> Phantom[Phantom]
    SelectWallet --> WalletConnect[WalletConnect]
    
    MetaMask --> CheckNetwork{On Base Sepolia?}
    Phantom --> CheckNetwork
    WalletConnect --> CheckNetwork
    
    CheckNetwork -->|No| SwitchNetwork[Switch Network]
    SwitchNetwork --> CheckNetwork
    CheckNetwork -->|Yes| WalletConnected[✅ Wallet Connected]
    
    WalletConnected --> UserChoice{User Action}
    
    UserChoice --> PayToPlay[💰 Pay to Play]
    UserChoice --> Donate[🎁 Donate]
    UserChoice --> ViewLeaderboard[📊 View Leaderboard]
    UserChoice --> ClaimReward[🏆 Claim Reward]
    UserChoice --> ViewProfile[👤 View Profile]
    
    %% Pay to Play Flow
    PayToPlay --> ApproveUSDC[Approve USDC Spend]
    ApproveUSDC --> ConfirmPayment[Confirm Payment TX]
    ConfirmPayment --> PaymentSuccess{Success?}
    PaymentSuccess -->|Yes| Grant10Tries[Grant 10 Tries]
    PaymentSuccess -->|No| PaymentFailed[❌ Payment Failed]
    PaymentFailed --> UserChoice
    
    Grant10Tries --> RecordPayment[Record in Firebase]
    RecordPayment --> PlayGame[🎮 Play Game]
    
    %% Game Flow
    PlayGame --> GameOver[Game Over]
    GameOver --> SubmitScore[Submit Score]
    SubmitScore --> CheckHighScore{New High Score?}
    CheckHighScore -->|Yes| UpdateLeaderboard[Update Leaderboard]
    CheckHighScore -->|No| JustRecord[Record Game Played]
    UpdateLeaderboard --> DecrementTries[Tries - 1]
    JustRecord --> DecrementTries
    
    DecrementTries --> TriesLeft{Tries > 0?}
    TriesLeft -->|Yes| PlayAgain{Play Again?}
    TriesLeft -->|No| NeedMoreTries[Need More Tries]
    NeedMoreTries --> UserChoice
    PlayAgain -->|Yes| PlayGame
    PlayAgain -->|No| UserChoice
    
    %% Donate Flow
    Donate --> EnterAmount[Enter Donation Amount]
    EnterAmount --> ApproveDonation[Approve USDC]
    ApproveDonation --> ConfirmDonation[Confirm Donation TX]
    ConfirmDonation --> DonationSuccess{Success?}
    DonationSuccess -->|Yes| UpdatePool[Pool Increased]
    DonationSuccess -->|No| DonationFailed[❌ Donation Failed]
    UpdatePool --> UserChoice
    DonationFailed --> UserChoice
    
    %% Claim Flow
    ClaimReward --> CheckReward{Has Reward?}
    CheckReward -->|Yes| ConfirmClaim[Confirm Claim TX]
    CheckReward -->|No| NoReward[No Reward Available]
    ConfirmClaim --> ClaimSuccess{Success?}
    ClaimSuccess -->|Yes| USDCReceived[💵 USDC Received!]
    ClaimSuccess -->|No| ClaimFailed[❌ Claim Failed]
    USDCReceived --> UserChoice
    NoReward --> UserChoice
    ClaimFailed --> UserChoice
    
    %% View Actions
    ViewLeaderboard --> ShowLeaderboard[Display Current Rankings]
    ShowLeaderboard --> UserChoice
    ViewProfile --> ShowProfile[Display User Stats]
    ShowProfile --> UserChoice
    ViewOnly --> ShowLeaderboard
```

---

## 5. Contract State Transitions

```mermaid
stateDiagram-v2
    direction LR
    
    state Contract {
        [*] --> Ready: Deploy
        
        state Ready {
            state "fundsAllocated = false" as FA_False
            state "totalPool accumulating" as Pool_Growing
        }
        
        Ready --> Allocated: allocateFunds()
        
        state Allocated {
            state "fundsAllocated = true" as FA_True
            state "rewards[] populated" as Rewards_Set
        }
        
        Allocated --> Ready: sweepUnclaimed()
    }

    state "User Actions" as UserActions {
        payToPlay: payToPlay()
        donate: donate()
        claim: claimReward()
    }

    state "Owner Actions" as OwnerActions {
        allocate: allocateFunds()
        sweep: sweepUnclaimed()
    }
```

---

## 6. Data Flow Diagram

```mermaid
flowchart LR
    subgraph Input["📥 Inputs"]
        Payment[0.02 USDC Payment]
        Donation[USDC Donation]
        Score[Game Score]
        AdminConfig[Admin Configuration]
    end

    subgraph Processing["⚙️ Processing"]
        subgraph Contract["Smart Contract"]
            PoolCalc[Pool Accumulation]
            RewardCalc[Reward Calculation]
            Transfer[Token Transfers]
        end
        subgraph Functions["Cloud Functions"]
            ScoreProc[Score Processing]
            CycleProc[Cycle Management]
            ProfileProc[Profile Updates]
        end
    end

    subgraph Storage["💾 Storage"]
        TotalPool[(totalPool)]
        Rewards[(rewards mapping)]
        Scores[(Firestore scores)]
        Profiles[(userProfiles)]
        Metadata[(cycleMetadata)]
    end

    subgraph Output["📤 Outputs"]
        LeaderboardDisplay[Leaderboard]
        RewardClaim[Claimed USDC]
        UserStats[User Statistics]
        PoolDisplay[Prize Pool Display]
    end

    Payment --> PoolCalc
    Donation --> PoolCalc
    PoolCalc --> TotalPool
    TotalPool --> PoolDisplay

    Score --> ScoreProc
    ScoreProc --> Scores
    ScoreProc --> Profiles
    Scores --> LeaderboardDisplay

    AdminConfig --> CycleProc
    CycleProc --> Metadata

    TotalPool --> RewardCalc
    Scores --> RewardCalc
    RewardCalc --> Rewards
    
    Rewards --> Transfer
    Transfer --> RewardClaim

    Profiles --> UserStats
```

---

## Legend

| Symbol | Meaning |
|--------|---------|
| 🖥️ | Frontend/UI |
| ☁️ | Cloud Functions |
| 🗃️ | Database |
| 📜 | Smart Contract |
| 👛 | Wallet |
| 👤 | User |
| ⏰ | Scheduled Task |
| 💰 | Payment |
| 🏆 | Prize/Reward |

---

## Key Flows Summary

1. **Payment Flow**: User → Wallet → USDC Approve → Contract payToPlay() → Firebase recordPayment
2. **Score Flow**: Game → Firebase submitScore → Firestore scores → Leaderboard
3. **Allocation Flow**: Scheduler → CycleManager → Contract allocateFunds() → Archive → Reset
4. **Claim Flow**: User → Contract claimReward() → USDC Transfer
5. **Config Flow**: Admin → Firebase Functions → Firestore config
