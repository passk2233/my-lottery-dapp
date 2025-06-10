let provider;
let signer;
let contract;

const contractAddress = "0x1d55b93d43ddf448b77bc2b3d555ee075cc7d0d9";
const contractABI = [
	{
		"inputs": [],
		"name": "autoDrawNumber",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_number",
				"type": "uint256"
			}
		],
		"name": "buyTicket",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "drawNumber",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_ticketPrice",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newAmount",
				"type": "uint256"
			}
		],
		"name": "JackpotIncreased",
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
			}
		],
		"name": "NewRoundStarted",
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
				"internalType": "uint256[]",
				"name": "winningNumbers",
				"type": "uint256[]"
			}
		],
		"name": "NumberDrawn",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_newPrice",
				"type": "uint256"
			}
		],
		"name": "setTicketPrice",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
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
				"internalType": "uint256",
				"name": "number",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "round",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "ticketPrice",
				"type": "uint256"
			}
		],
		"name": "TicketPurchased",
		"type": "event"
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
		"name": "WinnerPaid",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "withdrawOwnerFees",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "DRAW_INTERVAL",
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
		"name": "getContractInfo",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "currentJackpot",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "currentRound",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "currentTicketPrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "timeUntilDraw",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "ticketsInCurrentRound",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCurrentRoundTickets",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "player",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "number",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "round",
						"type": "uint256"
					}
				],
				"internalType": "struct Lottery.Ticket[]",
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
		"name": "getPlayerTickets",
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
		"name": "getRoundInfo",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "ticketCount",
				"type": "uint256"
			},
			{
				"internalType": "uint256[]",
				"name": "winningNums",
				"type": "uint256[]"
			},
			{
				"internalType": "address[]",
				"name": "winners",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTimeUntilDraw",
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
		"name": "jackpot",
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
		"name": "lastDrawTime",
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
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "playerTickets",
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
		"name": "roundNumber",
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
		"name": "roundTickets",
		"outputs": [
			{
				"internalType": "address",
				"name": "player",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "number",
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
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "roundWinners",
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
		"inputs": [],
		"name": "ticketPrice",
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
		"name": "winningNumbers",
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
]; // แทนที่ด้วย ABI JSON ของคุณ

// Elements
const connectWalletBtn = document.getElementById("connectWallet");
const walletAddressP = document.getElementById("walletAddress");
const buyTicketBtn = document.getElementById("buyTicketBtn");
const ticketNumberInput = document.getElementById("ticketNumber");
const drawNumberBtn = document.getElementById("drawNumberBtn");

const jackpotSpan = document.getElementById("jackpot");
const roundSpan = document.getElementById("round");
const timeUntilDrawSpan = document.getElementById("timeUntilDraw");
const ticketsCountSpan = document.getElementById("ticketsCount");

// เริ่มต้นปิดปุ่มซื้อและจับรางวัลก่อนเชื่อมต่อ
buyTicketBtn.disabled = true;
drawNumberBtn.disabled = true;

async function connectWallet() {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      const address = await signer.getAddress();
      walletAddressP.textContent = "Connected: " + address;

      contract = new ethers.Contract(contractAddress, contractABI, signer);

      // เปิดปุ่มเมื่อเชื่อมต่อสำเร็จ
      buyTicketBtn.disabled = false;
      drawNumberBtn.disabled = false;

      await updateLotteryInfo();
    } catch (error) {
      alert("User rejected connection");
    }
  } else {
    alert("Please install MetaMask!");
  }
}

async function buyTicket() {
  const number = parseInt(ticketNumberInput.value);
  if (isNaN(number) || number < 0 || number > 99) {
    alert("Please enter a number between 0 and 99");
    return;
  }

  try {
    const ticketPrice = await contract.ticketPrice();
    const tx = await contract.buyTicket(number, { value: ticketPrice });
    await tx.wait();
    alert("Ticket purchased!");
    await updateLotteryInfo();
  } catch (error) {
    alert("Transaction failed or rejected");
    console.error(error);
  }
}

async function drawNumber() {
  try {
    const tx = await contract.drawNumber();
    await tx.wait();
    alert("Number drawn!");
    await updateLotteryInfo();
  } catch (error) {
    alert("Draw failed or rejected");
    console.error(error);
  }
}

async function updateLotteryInfo() {
  try {
    const info = await contract.getContractInfo();
    jackpotSpan.textContent = ethers.utils.formatEther(info.currentJackpot);
    roundSpan.textContent = info.currentRound.toString();
    timeUntilDrawSpan.textContent = info.timeUntilDraw.toString();
    ticketsCountSpan.textContent = info.ticketsInCurrentRound.toString();
  } catch (error) {
    console.error("Failed to fetch contract info:", error);
  }
}

connectWalletBtn.onclick = connectWallet;
buyTicketBtn.onclick = buyTicket;
drawNumberBtn.onclick = drawNumber;
