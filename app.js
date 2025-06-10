if (typeof ethers === "undefined") {
  alert("Ethers.js is not loaded. Please check the script tag.");
}



const connectWalletBtn = document.getElementById("connectWallet");
const walletAddressP = document.getElementById("walletAddress");
const buyTicketBtn = document.getElementById("buyTicketBtn");
const drawNumberBtn = document.getElementById("drawNumberBtn");
const ticketNumberInput = document.getElementById("ticketNumber");

const jackpotSpan = document.getElementById("jackpot");
const roundSpan = document.getElementById("round");
const timeUntilDrawSpan = document.getElementById("timeUntilDraw");
const ticketsCountSpan = document.getElementById("ticketsCount");

let provider;
let signer;
let contract;
let userAddress;

const contractAddress = "0xaE036c65C649172b43ef7156b009c6221B596B8b"; // แก้เป็นที่อยู่ contract ของคุณ
const contractABI = [
  [
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
]
];

async function connectWallet() {
  if (typeof window.ethereum === "undefined") {
    walletAddressP.textContent = "MetaMask is not installed";
    return;
  }

  try {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    userAddress = await signer.getAddress();

    walletAddressP.textContent = `Connected: ${userAddress}`;
    buyTicketBtn.disabled = false;
    drawNumberBtn.disabled = false; // ถ้าต้องการจำกัดสิทธิ์ ให้เพิ่มเช็ค

    contract = new ethers.Contract(contractAddress, contractABI, signer);

    updateUI();

    // ฟัง event จาก contract เพื่ออัปเดตข้อมูลทันที
    contract.on("TicketBought", (buyer, number) => {
      console.log(`Ticket bought by ${buyer} for number ${number}`);
      updateUI();
    });
    contract.on("NumberDrawn", (number) => {
      console.log(`Number drawn: ${number}`);
      updateUI();
    });
  } catch (err) {
    console.error(err);
    walletAddressP.textContent = "Wallet connection rejected";
  }
}

async function updateUI() {
  if (!contract) return;

  try {
    const jackpotWei = await contract.jackpot();
    const jackpotEth = ethers.utils.formatEther(jackpotWei);

    const round = await contract.round();
    const timeUntilDraw = await contract.timeUntilDraw();
    const ticketsCount = await contract.ticketsCount();

    jackpotSpan.textContent = jackpotEth;
    roundSpan.textContent = round.toString();
    timeUntilDrawSpan.textContent = timeUntilDraw.toString();
    ticketsCountSpan.textContent = ticketsCount.toString();
  } catch (err) {
    console.error("Error updating UI:", err);
  }
}

async function buyTicket() {
  if (!contract) return;
  const ticketNum = parseInt(ticketNumberInput.value);

  if (isNaN(ticketNum) || ticketNum < 0 || ticketNum > 99) {
    alert("Please enter a valid ticket number between 0 and 99");
    return;
  }

  try {
    // สมมติว่าแต่ละบัตรราคา 0.01 ETH (แก้ตามจริง)
    const price = ethers.utils.parseEther("0.01");

    const tx = await contract.buyTicket(ticketNum, { value: price });
    await tx.wait();

    alert("Ticket bought successfully!");
    ticketNumberInput.value = "";
  } catch (err) {
    console.error(err);
    alert("Failed to buy ticket: " + (err.data?.message || err.message));
  }
}

async function drawNumber() {
  if (!contract) return;

  try {
    const tx = await contract.drawNumber();
    await tx.wait();

    alert("Number drawn!");
  } catch (err) {
    console.error(err);
    alert("Failed to draw number: " + (err.data?.message || err.message));
  }
}

// Event listeners
connectWalletBtn.addEventListener("click", connectWallet);
buyTicketBtn.addEventListener("click", buyTicket);
drawNumberBtn.addEventListener("click", drawNumber);

// อัปเดต UI ทุก 10 วินาที (ถ้าต้องการ)
setInterval(updateUI, 10000);
