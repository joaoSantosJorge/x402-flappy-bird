// Leaderboard using Firebase Firestore
// This file will handle monthly resetting leaderboards

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCprQvJl7-ZC-6QK4ct5tBngJzOgF33MpM",
    authDomain: "flappy-bird-leaderboard-463e0.firebaseapp.com",
    projectId: "flappy-bird-leaderboard-463e0",
    storageBucket: "flappy-bird-leaderboard-463e0.firebasestorage.app",
    messagingSenderId: "344067272312",
    appId: "1:344067272312:web:5d4fc513df1df38a87c78d",
    measurementId: "G-YM6Z2TPHG8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Connect to Firestore emulator if running locally
if (location.hostname === "localhost") {
    db.useEmulator("localhost", 8080);
    console.log("Using Firestore emulator at localhost:8080");
}

// Get current month key
function getCurrentMonthKey() {
    const now = new Date();
    return `${now.getFullYear()}-${now.getMonth() + 1}`;
}

// Submit score
// If walletAddress is not provided, use a random guest ID for local testing
async function submitScore(walletAddress, score) {
    // Basic validation - prevent obviously fake scores
    if (typeof score !== 'number' || score < 0 || score > 10000 || !Number.isInteger(score)) {
        console.error('Invalid score:', score);
        return;
    }
    
    let userId = walletAddress;
    if (!userId) {
        // Use a random guest ID for local testing
        userId = 'guest-' + Math.random().toString(36).substring(2, 10);
    }
    
    // Save to 'scores' collection (used by cycleManager)
    const docRef = db.collection('scores').doc(userId);

    try {
        const currentData = await docRef.get();
        const currentScore = currentData.exists ? currentData.data().score : 0;
        
        // Only update if new score is higher
        if (score > currentScore) {
            await docRef.set({
                walletAddress: userId,
                score: score,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                playerName: userId.startsWith('0x') ? userId.slice(0, 6) + '...' + userId.slice(-4) : userId
            });
            console.log('Score submitted:', score);
        } else {
            console.log('Score not updated (current score is higher):', currentScore);
        }
    } catch (error) {
        console.error('Error submitting score:', error);
    }
}

// Get leaderboard
async function getLeaderboard() {
    const querySnapshot = await db.collection('scores')
        .orderBy('score', 'desc')
        .limit(10)
        .get();

    const leaderboardList = document.getElementById('leaderboard-list');
    leaderboardList.innerHTML = '';

    if (querySnapshot.empty) {
        leaderboardList.innerHTML = '<li>No scores yet</li>';
        return;
    }

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const li = document.createElement('li');
        const displayName = data.playerName || doc.id;
        li.textContent = `${displayName}: ${data.score}`;
        leaderboardList.appendChild(li);
    });
}

// Load leaderboard on page load
window.addEventListener('load', getLeaderboard);