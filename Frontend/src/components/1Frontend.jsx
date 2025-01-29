/*************************************
 * server.js
 *************************************/

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');        // for making requests to Flask
const FormData = require('form-data');      // to send file as multipart form data

// Solana imports
const {
  Connection,
  Keypair,
  PublicKey,
  clusterApiUrl,
  Transaction,
  sendAndConfirmTransaction,
} = require('@solana/web3.js');

const {
  TOKEN_PROGRAM_ID,
  getOrCreateAssociatedTokenAccount,
  createMintToInstruction,
} = require('@solana/spl-token');


/*************************************
 * 1. Express App Setup
 *************************************/
const app = express();
app.use(cors()); 
app.use(express.json());

// Multer: set up file uploading to 'uploads' folder
const upload = multer({ dest: path.join(__dirname, 'uploads/') });

/*************************************
 * 2. Solana Connection & Admin Key
 *************************************/
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

// Load admin keypair
const adminKeypairPath = path.join(__dirname, 'admin-keypair.json');
if (!fs.existsSync(adminKeypairPath)) {
  throw new Error('admin-keypair.json not found.');
}
const adminSecretKey = new Uint8Array(
  JSON.parse(fs.readFileSync(adminKeypairPath, 'utf-8'))
);
const adminKeypair = Keypair.fromSecretKey(adminSecretKey);

// Mint address for your SPL token
const TOKEN_MINT_ADDRESS = new PublicKey('YOUR_TOKEN_MINT_ADDRESS');

/*************************************
 * 3. Function to call Flask AI Server
 *************************************/

async function getSmileScoreFromFlask(filePath) {
  // The URL of your Flask endpoint
  const flaskUrl = 'http://localhost:5000/score-image';
  // or 'http://YOUR_FLASK_SERVER/score-image'

  // We'll send the file as multipart/form-data using FormData
  const formData = new FormData();
  // We'll attach a file stream from Node’s filesystem
  formData.append('photo', fs.createReadStream(filePath), {
    filename: path.basename(filePath), 
  });

  // Make the POST request to Flask
  const response = await fetch(flaskUrl, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Flask server error: ${response.statusText}`);
  }

  const data = await response.json();

  // data should be something like { smile_score: 0.85 }
  if (data.error) {
    throw new Error('Flask server returned an error: ' + data.error);
  }

  return data.smile_score; // Return the numeric score
}

/*************************************
 * 4. Minting Logic (unchanged)
 *************************************/
async function mintTokensToUser(userWalletString, amount) {
  const userWallet = new PublicKey(userWalletString);

  // 4.1 Ensure user has an associated token account
  const userTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    adminKeypair,
    TOKEN_MINT_ADDRESS,
    userWallet
  );

  // 4.2 Create the instruction
  const mintIx = createMintToInstruction(
    TOKEN_MINT_ADDRESS,
    userTokenAccount.address,
    adminKeypair.publicKey,
    amount
  );

  // 4.3 Send the transaction
  const transaction = new Transaction().add(mintIx);
  const txSignature = await sendAndConfirmTransaction(
    connection,
    transaction,
    [adminKeypair]
  );

  console.log('Tokens minted! Tx signature:', txSignature);
  return txSignature;
}

/*************************************
 * 5. Express Route: /upload-smile
 *************************************/
app.post('/upload-smile', upload.single('photo'), async (req, res) => {
  try {
    // 5.1 Validate inputs
    if (!req.file) {
      return res.status(400).json({ error: 'No photo file uploaded.' });
    }

    const userWalletString = req.body.userWallet;
    if (!userWalletString) {
      return res.status(400).json({ error: 'Missing user wallet address.' });
    }

    // 5.2 We have the file on disk at req.file.path
    const filePath = req.file.path;

    // 5.3 Send file to the Flask AI server
    const smileScore = await getSmileScoreFromFlask(filePath);

    console.log('Smile Score from Flask:', smileScore);

    // 5.4 Decide how many tokens to mint (assuming 9 decimals)
    // e.g., up to 10 tokens if smileScore=1
    const tokensToMint = Math.floor(smileScore * 10 * 1e9);

    // 5.5 Mint the tokens
    const txSignature = await mintTokensToUser(userWalletString, tokensToMint);

    // 5.6 Return JSON response
    return res.json({
      success: true,
      smileScore,
      tokensMinted: tokensToMint,
      txSignature
    });
  } catch (error) {
    console.error('Error in /upload-smile:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

/*************************************
 * 6. Start the Server
 *************************************/
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Node server listening on port ${PORT}`);
});
