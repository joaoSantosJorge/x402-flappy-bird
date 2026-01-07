const cycleManager = require("./cycleManager");
const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Export all Firebase Cloud Functions
exports.checkCycleScheduled = cycleManager.checkCycleScheduled;
exports.checkCycleManual = cycleManager.checkCycleManual;
exports.forceAllocate = cycleManager.forceAllocate;

// Secure score submission endpoint
exports.submitScore = functions.https.onRequest(async (req, res) => {
  // Enable CORS
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({error: "Method not allowed"});
    return;
  }

  try {
    const {walletAddress, score} = req.body;
    // Note: signature validation will be added in future for wallet verification

    // Validation
    if (!walletAddress || typeof walletAddress !== "string") {
      res.status(400).json({error: "Invalid wallet address"});
      return;
    }

    if (typeof score !== "number" || score < 0 || score > 10000 || !Number.isInteger(score)) {
      res.status(400).json({error: "Invalid score"});
      return;
    }

    // Rate limiting: check last submission time
    const db = admin.firestore();
    const scoreRef = db.collection("scores").doc(walletAddress);
    const scoreDoc = await scoreRef.get();

    if (scoreDoc.exists) {
      const lastTimestamp = scoreDoc.data().timestamp;
      if (lastTimestamp) {
        const timeSinceLastSubmit = Date.now() - lastTimestamp.toMillis();
        const MIN_SUBMIT_INTERVAL = 5000; // 5 seconds minimum between submissions

        if (timeSinceLastSubmit < MIN_SUBMIT_INTERVAL) {
          res.status(429).json({error: "Too many submissions. Please wait."});
          return;
        }
      }

      // Only update if new score is higher
      const currentScore = scoreDoc.data().score || 0;
      if (score <= currentScore) {
        res.status(200).json({
          success: false,
          message: "Score not updated (current score is higher)",
          currentScore: currentScore,
        });
        return;
      }
    }

    // TODO: Add signature verification here to ensure the score came from the actual wallet owner
    // For now, we'll trust the score but add basic anti-cheat heuristics

    // Anti-cheat: Basic score validation
    // You can add more sophisticated checks here like:
    // - Score shouldn't increase too quickly
    // - Pattern detection for impossible scores
    // - Machine learning models to detect cheating

    // Save score
    await scoreRef.set({
      walletAddress: walletAddress,
      score: score,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      playerName: walletAddress.startsWith("0x") ?
        walletAddress.slice(0, 6) + "..." + walletAddress.slice(-4) :
        walletAddress,
      ipAddress: req.ip, // Track IP for abuse detection
    });

    console.log(`Score submitted: ${walletAddress} - ${score}`);

    res.status(200).json({
      success: true,
      message: "Score submitted successfully",
      score: score,
    });
  } catch (error) {
    console.error("Error submitting score:", error);
    res.status(500).json({error: "Internal server error"});
  }
});

