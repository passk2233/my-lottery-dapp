// Ethereum Lottery DApp Application
// Contract configuration
const CONTRACT_ADDRESS = '0x6032290af8e9cdca42edb6105478ffc0809de98f';
const CONTRACT_ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "player",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256[]",
				"name": "numbers",
				"type": "uint256[]"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "round",
				"type": "uint256"
			}
		],
		"name": "BetPlaced",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "drawWinningNumber",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "emergencyWithdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "enum EthereumLottery.GameState",
				"name": "newState",
				"type": "uint8"
			}
		],
		"name": "GameStateChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "round",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "winningNumber",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "totalWinners",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "prizePerWinner",
				"type": "uint256"
			}
		],
		"name": "NumberDrawn",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "pauseGame",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "_numbers",
				"type": "uint256[]"
			}
		],
		"name": "placeBet",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "winner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "round",
				"type": "uint256"
			}
		],
		"name": "PrizeDistributed",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "resumeGame",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "round",
				"type": "uint256"
			}
		],
		"name": "RoundStarted",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "startNewRound",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawPrize",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [],
		"name": "currentRound",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "gameState",
		"outputs": [
			{
				"internalType": "enum EthereumLottery.GameState",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getContractBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCurrentRoundPlayers",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "playerAddress",
						"type": "address"
					},
					{
						"internalType": "uint256[]",
						"name": "selectedNumbers",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256",
						"name": "betAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "round",
						"type": "uint256"
					}
				],
				"internalType": "struct EthereumLottery.Player[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_player",
				"type": "address"
			}
		],
		"name": "getPendingWithdrawal",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPlayerCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_player",
				"type": "address"
			}
		],
		"name": "getPlayerNumbers",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_round",
				"type": "uint256"
			}
		],
		"name": "getRoundResult",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "winningNumber",
						"type": "uint256"
					},
					{
						"internalType": "address[]",
						"name": "winners",
						"type": "address[]"
					},
					{
						"internalType": "uint256",
						"name": "prizePerWinner",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					}
				],
				"internalType": "struct EthereumLottery.DrawResult",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MAX_NUMBER",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MIN_BET",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "pendingWithdrawals",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "roundPlayers",
		"outputs": [
			{
				"internalType": "address",
				"name": "playerAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "betAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "round",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "roundResults",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "winningNumber",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "prizePerWinner",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalPrizePool",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

// Global variables
let web3;
let contract;
let userAccount;
let selectedNumbers = [];
let isOwner = false;
let isAdminAuthenticated = false;
const ADMIN_PASSWORD = 'admin123A';

// Initialize the application
async function init() {
    try {
        // Check if Web3 is available
        if (typeof window.ethereum !== 'undefined') {
            console.log('MetaMask detected');
            web3 = new Web3(window.ethereum);
        } else {
            showMessage('กรุณาติดตั้ง MetaMask เพื่อใช้งานแอปพลิเคชั่น', 'error');
            return;
        }

        // Initialize contract
        contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        
        // Setup UI
        setupEventListeners();
        generateNumberGrid();
        
        // Set contract address in admin panel
        document.getElementById('contractAddress').textContent = CONTRACT_ADDRESS;
        
        console.log('Application initialized successfully');
    } catch (error) {
        console.error('Initialization error:', error);
        showMessage('ไม่สามารถเริ่มต้นแอปพลิเคชั่นได้', 'error');
    }
}

// Connect wallet
async function connectWallet() {
    try {
        // Check if we're on Holesky network
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        if (chainId !== '0x4268') { // 17000 in hex
            await switchToHolesky();
        }
        
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        });
        
        userAccount = accounts[0];
        await updateWalletInfo();
        await checkOwnerStatus();
        await loadGameData();
        
        showMessage('เชื่อมต่อ Wallet สำเร็จ', 'success');
        
    } catch (error) {
        console.error('Connection error:', error);
        showMessage('ไม่สามารถเชื่อมต่อ Wallet ได้: ' + error.message, 'error');
    }
}

// Switch to Holesky network
async function switchToHolesky() {
    try {
        // Try to switch to Holesky
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x4268' }], // 17000 in hex
        });
    } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask
        if (switchError.code === 4902) {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                        chainId: '0x4268',
                        chainName: 'Holesky Testnet',
                        nativeCurrency: {
                            name: 'Ethereum',
                            symbol: 'ETH',
                            decimals: 18,
                        },
                        rpcUrls: ['https://ethereum-holesky.publicnode.com'],
                        blockExplorerUrls: ['https://holesky.etherscan.io'],
                    }],
                });
                showMessage('เพิ่ม Holesky network สำเร็จ', 'success');
            } catch (addError) {
                showMessage('ไม่สามารถเพิ่ม Holesky network ได้', 'error');
                throw addError;
            }
        } else {
            throw switchError;
        }
    }
}

// Update wallet information
async function updateWalletInfo() {
    if (!userAccount) return;
    
    document.getElementById('walletAddress').textContent = 
        `${userAccount.substring(0, 6)}...${userAccount.substring(38)}`;
    
    const balance = await web3.eth.getBalance(userAccount);
    const balanceInEth = web3.utils.fromWei(balance, 'ether');
    document.getElementById('walletBalance').textContent = parseFloat(balanceInEth).toFixed(4);
    
    document.getElementById('connectWallet').style.display = 'none';
    document.getElementById('walletInfo').style.display = 'block';
}

// Check if user is contract owner
async function checkOwnerStatus() {
    try {
        const owner = await contract.methods.owner().call();
        isOwner = userAccount.toLowerCase() === owner.toLowerCase();
        
        if (isOwner) {
            showMessage('คุณคือผู้ดูแลระบบ', 'info');
        }
    } catch (error) {
        console.error('Error checking owner status:', error);
    }
}

// Load game data
async function loadGameData() {
    try {
        // Get game state
        const gameState = await contract.methods.gameState().call();
        const currentRound = await contract.methods.currentRound().call();
        const totalPrizePool = await contract.methods.totalPrizePool().call();
        const playerCount = await contract.methods.getPlayerCount().call();
        const contractBalance = await contract.methods.getContractBalance().call();
        
        // Update UI
        document.getElementById('totalPrize').textContent = 
            `${web3.utils.fromWei(totalPrizePool, 'ether')} ETH`;
        document.getElementById('totalPlayers').textContent = playerCount;
        document.getElementById('contractBalance').textContent = 
            `${web3.utils.fromWei(contractBalance, 'ether')} ETH`;
        
        // Update game status
        const statusMap = { '0': 'เปิดรับเดิมพัน', '1': 'ปิดรับเดิมพัน', '2': 'กำลังออกรางวัล' };
        document.getElementById('gameStatus').textContent = statusMap[gameState] || 'ไม่ทราบสถานะ';
        
        // Get last winning number
        try {
            const lastRoundResult = await contract.methods.getRoundResult(currentRound - 1).call();
            if (lastRoundResult.winningNumber !== '0' || currentRound > 1) {
                document.getElementById('lastWinningNumber').textContent = lastRoundResult.winningNumber;
            }
        } catch (error) {
            // No previous round or error getting result
        }
        
        // Load participants
        await loadParticipants();
        
        // Check pending prize
        await checkPendingPrize();
        
    } catch (error) {
        console.error('Error loading game data:', error);
        showMessage('ไม่สามารถโหลดข้อมูลเกมได้', 'error');
    }
}

// Generate number grid (0-99)
function generateNumberGrid() {
    const numberGrid = document.getElementById('numberGrid');
    numberGrid.innerHTML = '';
    
    for (let i = 0; i <= 99; i++) {
        const numberBtn = document.createElement('button');
        numberBtn.className = 'number-btn';
        numberBtn.textContent = i.toString().padStart(2, '0');
        numberBtn.onclick = () => toggleNumber(i);
        numberGrid.appendChild(numberBtn);
    }
}

// Toggle number selection
function toggleNumber(number) {
    const index = selectedNumbers.indexOf(number);
    const btn = document.querySelector(`.number-btn:nth-child(${number + 1})`);
    
    if (index > -1) {
        // Remove number
        selectedNumbers.splice(index, 1);
        btn.classList.remove('selected');
    } else {
        // Add number (max 10)
        if (selectedNumbers.length < 10) {
            selectedNumbers.push(number);
            btn.classList.add('selected');
        } else {
            showMessage('เลือกได้สูงสุด 10 หมายเลข', 'warning');
        }
    }
    
    updateSelectedNumbers();
}

// Update selected numbers display
function updateSelectedNumbers() {
    const display = selectedNumbers.length > 0 
        ? selectedNumbers.sort((a, b) => a - b).map(n => n.toString().padStart(2, '0')).join(', ')
        : 'ยังไม่ได้เลือก';
    
    document.getElementById('selectedNumbers').textContent = display;
    
    // Enable/disable bet button
    const betAmount = parseFloat(document.getElementById('betAmount').value);
    document.getElementById('placeBet').disabled = 
        selectedNumbers.length === 0 || !betAmount || betAmount < 0.01;
}

// Place bet
async function placeBet() {
    try {
        if (!userAccount) {
            showMessage('กรุณาเชื่อมต่อ Wallet ก่อน', 'warning');
            return;
        }
        
        if (selectedNumbers.length === 0) {
            showMessage('กรุณาเลือกหมายเลข', 'warning');
            return;
        }
        
        const betAmount = parseFloat(document.getElementById('betAmount').value);
        if (!betAmount || betAmount < 0.01) {
            showMessage('จำนวนเงินเดิมพันขั้นต่ำ 0.01 ETH', 'warning');
            return;
        }
        
        const betAmountWei = web3.utils.toWei(betAmount.toString(), 'ether');
        
        showMessage('กำลังส่งธุรกรรม...', 'info');
        
        const tx = await contract.methods.placeBet(selectedNumbers).send({
            from: userAccount,
            value: betAmountWei,
            gas: 300000
        });
        
        console.log('Transaction hash:', tx.transactionHash);
        showMessage('วางเดิมพันสำเร็จ!', 'success');
        
        // Reset selection
        selectedNumbers = [];
        document.querySelectorAll('.number-btn').forEach(btn => btn.classList.remove('selected'));
        document.getElementById('betAmount').value = '';
        updateSelectedNumbers();
        
        // Reload game data
        await loadGameData();
        
    } catch (error) {
        console.error('Bet error:', error);
        showMessage('ไม่สามารถวางเดิมพันได้: ' + error.message, 'error');
    }
}

// Check pending prize
async function checkPendingPrize() {
    try {
        if (!userAccount) return;
        
        const pendingAmount = await contract.methods.getPendingWithdrawal(userAccount).call();
        const amountInEth = web3.utils.fromWei(pendingAmount, 'ether');
        
        if (parseFloat(amountInEth) > 0) {
            document.getElementById('pendingPrizeInfo').innerHTML = 
                `🎉 คุณมีรางวัลรอถอน: <strong>${amountInEth} ETH</strong>`;
            document.getElementById('pendingPrizeInfo').style.display = 'block';
            document.getElementById('withdrawPrize').style.display = 'inline-block';
        } else {
            document.getElementById('pendingPrizeInfo').style.display = 'none';
            document.getElementById('withdrawPrize').style.display = 'none';
        }
    } catch (error) {
        console.error('Error checking pending prize:', error);
    }
}

// Withdraw prize
async function withdrawPrize() {
    try {
        showMessage('กำลังถอนรางวัล...', 'info');
        
        const tx = await contract.methods.withdrawPrize().send({
            from: userAccount,
            gas: 100000
        });
        
        console.log('Withdraw transaction hash:', tx.transactionHash);
        showMessage('ถอนรางวัลสำเร็จ!', 'success');
        
        await updateWalletInfo();
        await checkPendingPrize();
        
    } catch (error) {
        console.error('Withdraw error:', error);
        showMessage('ไม่สามารถถอนรางวัลได้: ' + error.message, 'error');
    }
}

// Load participants
async function loadParticipants() {
    try {
        const players = await contract.methods.getCurrentRoundPlayers().call();
        
        const userList = document.getElementById('participantsList');
        const adminList = document.getElementById('adminParticipantsList');
        
        if (players.length === 0) {
            userList.innerHTML = '<p>ยังไม่มีผู้เล่น</p>';
            adminList.innerHTML = '<p>ยังไม่มีผู้เล่น</p>';
            return;
        }
        
        let userHtml = '';
        let adminHtml = '';
        
        players.forEach((player, index) => {
            const address = `${player.playerAddress.substring(0, 6)}...${player.playerAddress.substring(38)}`;
            const amount = web3.utils.fromWei(player.betAmount, 'ether');
            const numbers = player.selectedNumbers.join(', ');
            
            userHtml += `
                <div class="participant">
                    <strong>ผู้เล่น ${index + 1}:</strong> ${address} 
                    <span class="bet-amount">(${amount} ETH)</span>
                </div>
            `;
            
            adminHtml += `
                <div class="participant">
                    <strong>ผู้เล่น ${index + 1}:</strong> ${address}<br>
                    <strong>เลขที่เลือก:</strong> ${numbers}<br>
                    <strong>เงินเดิมพัน:</strong> ${amount} ETH
                </div>
            `;
        });
        
        userList.innerHTML = userHtml;
        adminList.innerHTML = adminHtml;
        
    } catch (error) {
        console.error('Error loading participants:', error);
    }
}

// Admin Functions
async function drawNumber() {
    try {
        if (!isOwner) {
            showMessage('คุณไม่ใช่ผู้ดูแลระบบ', 'error');
            return;
        }
        
        showMessage('กำลังสุ่มเลขและประกาศผล...', 'info');
        
        const tx = await contract.methods.drawWinningNumber().send({
            from: userAccount,
            gas: 500000
        });
        
        console.log('Draw transaction hash:', tx.transactionHash);
        showMessage('สุ่มเลขและประกาศผลสำเร็จ!', 'success');
        
        // Show results
        setTimeout(async () => {
            await showDrawResults();
            await loadGameData();
        }, 2000);
        
    } catch (error) {
        console.error('Draw error:', error);
        showMessage('ไม่สามารถสุ่มเลขได้: ' + error.message, 'error');
    }
}

async function showDrawResults() {
    try {
        const currentRound = await contract.methods.currentRound().call();
        const result = await contract.methods.getRoundResult(currentRound).call();
        
        document.getElementById('drawnNumber').textContent = result.winningNumber;
        document.getElementById('resultSection').style.display = 'block';
        
        if (result.winners.length > 0) {
            let winnersHtml = '<h4>🎉 ผู้ชนะ:</h4>';
            result.winners.forEach((winner, index) => {
                const address = `${winner.substring(0, 6)}...${winner.substring(38)}`;
                const prize = web3.utils.fromWei(result.prizePerWinner, 'ether');
                winnersHtml += `<p>ผู้ชนะ ${index + 1}: ${address} - รางวัล ${prize} ETH</p>`;
            });
            document.getElementById('winnersList').innerHTML = winnersHtml;
        } else {
            document.getElementById('winnersList').innerHTML = '<p>ไม่มีผู้ชนะในรอบนี้</p>';
        }
        
    } catch (error) {
        console.error('Error showing results:', error);
    }
}

async function startNewRound() {
    try {
        if (!isOwner) {
            showMessage('คุณไม่ใช่ผู้ดูแลระบบ', 'error');
            return;
        }
        
        const tx = await contract.methods.startNewRound().send({
            from: userAccount,
            gas: 100000
        });
        
        showMessage('เริ่มรอบใหม่สำเร็จ!', 'success');
        document.getElementById('resultSection').style.display = 'none';
        await loadGameData();
        
    } catch (error) {
        console.error('Start new round error:', error);
        showMessage('ไม่สามารถเริ่มรอบใหม่ได้: ' + error.message, 'error');
    }
}

async function pauseGame() {
    try {
        if (!isOwner) return;
        
        const tx = await contract.methods.pauseGame().send({
            from: userAccount,
            gas: 100000
        });
        
        showMessage('หยุดเกมแล้ว', 'info');
        await loadGameData();
        
    } catch (error) {
        console.error('Pause game error:', error);
        showMessage('ไม่สามารถหยุดเกมได้: ' + error.message, 'error');
    }
}

async function resumeGame() {
    try {
        if (!isOwner) return;
        
        const tx = await contract.methods.resumeGame().send({
            from: userAccount,
            gas: 100000
        });
        
        showMessage('เปิดเกมแล้ว', 'info');
        await loadGameData();
        
    } catch (error) {
        console.error('Resume game error:', error);
        showMessage('ไม่สามารถเปิดเกมได้: ' + error.message, 'error');
    }
}

// Tab switching with admin password protection
function switchTab(tab) {
    if (tab === 'admin' && !isAdminAuthenticated) {
        const password = prompt('กรุณาใส่รหัสผ่านผู้ดูแล:');
        if (password !== ADMIN_PASSWORD) {
            showMessage('รหัสผ่านไม่ถูกต้อง', 'error');
            return;
        }
        isAdminAuthenticated = true;
        showMessage('เข้าสู่โหมดผู้ดูแลสำเร็จ', 'success');
    }
    
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
    
    document.querySelector(`[onclick="switchTab('${tab}')"]`).classList.add('active');
    document.getElementById(`${tab}Tab`).classList.add('active');
}

// Utility function to show messages
function showMessage(message, type = 'info') {
    const messagesDiv = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    messagesDiv.appendChild(messageDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Setup event listeners
function setupEventListeners() {
    // Wallet connection
    document.getElementById('connectWallet').addEventListener('click', connectWallet);
    
    // User actions
    document.getElementById('placeBet').addEventListener('click', placeBet);
    document.getElementById('checkPendingPrize').addEventListener('click', checkPendingPrize);
    document.getElementById('withdrawPrize').addEventListener('click', withdrawPrize);
    
    // Admin actions
    document.getElementById('drawNumber').addEventListener('click', drawNumber);
    document.getElementById('startNewRound').addEventListener('click', startNewRound);
    document.getElementById('pauseGame').addEventListener('click', pauseGame);
    document.getElementById('resumeGame').addEventListener('click', resumeGame);
    
    // Bet amount input
    document.getElementById('betAmount').addEventListener('input', updateSelectedNumbers);
    
    // Account change detection
    if (window.ethereum) {
        window.ethereum.on('accountsChanged', (accounts) => {
            if (accounts.length === 0) {
                location.reload();
            } else {
                userAccount = accounts[0];
                updateWalletInfo();
                checkOwnerStatus();
                loadGameData();
            }
        });
        
        window.ethereum.on('chainChanged', () => {
            window.location.reload();
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Auto refresh game data every 30 seconds
setInterval(() => {
    if (userAccount) {
        loadGameData();
    }
}, 30000);