# 🚀 Blockchain-Based Photo Upload and Ranking Platform

Welcome to our **Blockchain-Based Photo Upload and Ranking Platform**! 🎉 This project integrates blockchain technology with an engaging user experience, allowing users to earn tokens based on photo uploads while competing for rankings in a decentralized ecosystem. 🌐💡

---

## 🌟 **Overview**

Our project is a **Web 3.0 application** that provides users with:

1. **Photo Upload Feature** 📸
   - Users can securely upload photos to the platform.
2. **Token Rewards System** 🪙
   - Earn blockchain-based tokens for every uploaded photo.
   - **Bonus Tokens** for uploading smiling face photos! 😊
3. **Decentralized Ranking System** 📊
   - Rankings are dynamically calculated based on the number of tokens earned by users.

This project showcases the power of blockchain for transparency, security, and reward distribution, combined with a playful and competitive environment for users.

---

## 🛠️ **Tech Stack**

Our platform utilizes the following technologies:

### **Frontend**
- **React.js**: Interactive and responsive user interface.
- **HTML5** & **CSS3**: Visual and layout design.
- **JavaScript**: Adding dynamic functionality.

### **Backend**
- **Node.js**: Server-side operations.
- **Express.js**: Lightweight web application framework.
- **IPFS (InterPlanetary File System)**: For decentralized photo storage.

### **Blockchain**
- **Solana**: For implementing smart contracts and managing tokens
- **Rust**: To write the smart contracts on Solana.
- **Phantom Wallet**: For wallet integration.
- **Solana Command Line Interface (CLI):**: For deploying programs, managing accounts, and performing on-chain operations.
---

## ✨ **Features**

### **1. Photo Upload** 📸
- Users can upload photos securely.
- Photos are stored on IPFS for decentralized and immutable storage.
- **Smile Detection**: The platform uses AI to detect smiling faces. 😊

### **2. Token Rewards** 🪙
- Each valid photo upload generates tokens for the user.
- **Bonus Tokens for Smiling Faces**: Users earn additional tokens when their uploaded photos include smiling faces, promoting positivity and engagement.
- Tokens are managed using Ethereum-based smart contracts.

### **3. Decentralized Rankings** 📊
- Users compete for the top rankings based on their token count.
- Rankings are updated dynamically and stored on the blockchain.

### **4. Photo Gallery** 🖼️
- Users can view a gallery of their uploaded photos.
- Option to make photos public or keep them private.

### **5. Analytics Dashboard** 📈
- A personalized dashboard to track:
  - Total tokens earned.
  - Number of uploaded photos.
  - Ranking position.

---

## 🌐 **How It Works**

1. **User Onboarding**
   - **Connect Your Wallet via Phantom**: Users connect their Solana wallet through Phantom Wallet for seamless authentication and transaction management.
   - **Create a profile**: Users provide minimal details to create a decentralized profile linked to their wallet address.

2. **Photo Upload**
   - Upload a photo directly through the platform.
   - The photo is stored on IPFS, and its hash is recorded on the blockchain.

3. **Smile Detection and Token Rewards**
   - AI algorithms detect smiling faces in photos.
   - **Base Tokens**: Awarded for each photo uploaded.
     **Bonus Tokens**: Extra rewards for photos with verified smiles.
     

4. **Ranking System**
   - Users are ranked based on their token count.
   - Rankings are updated dynamically and stored on the blockchain.

5. **Gallery and Analytics**
   - Users can manage their uploaded photos and track their progress on a personalized dashboard.

---

## 📚 **How to Use**

### **Step 1: Clone the Repository**
```bash
git clone https://github.com/your-username/blockchain-photo-platform.git
cd blockchain-photo-platform
```

### **Step 2: Install Dependencies**
#### For the Backend:
```bash
cd backend
npm install
```
#### For the Frontend:
```bash
cd frontend
npm install
```

### **Step 3: Start the Application**
#### Start the Backend Server:
```bash
cd backend
npm start
```

#### Start the Frontend Development Server:
```bash
cd frontend
npm start
```

### **Step 4: Open the Application**
Visit `http://localhost:3000` in your browser to access the app.

---

## 🔗 **Smart Contracts**

Our smart contracts are deployed on the Ethereum testnet. Contract details:
- **Contract Name**: PhotoToken
- **Contract Address**: `0xYourContractAddressHere`
- **Functions**:
  - `uploadPhoto(string ipfsHash)`: Stores the IPFS hash and mints tokens.
  - `detectSmile(string ipfsHash)`: Verifies smiling faces for bonus tokens.
  - `getRankings()`: Fetches the current rankings from the blockchain.

---

## 🤝 **Contributing**

We welcome contributions to enhance the platform! Here's how you can help:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

---

## 📜 **License**

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and share this project.

---

## 💬 **Contact**

Have questions or feedback? Reach out to us:
- **Email**: your-email@example.com
- **GitHub**: [Your GitHub Profile](https://github.com/your-username)

---

## 🌈 **Acknowledgments**

- Special thanks to the **hackathon organizers** for providing this exciting platform! 🙌
- Our team members for their incredible collaboration and hard work. 🤝

---

## 🎉 **Let’s Build the Future Together!**

Join us on our journey to explore blockchain technology and create a fun, secure, and engaging platform for users! 🚀✨
