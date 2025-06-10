let provider, signer, contract, userAddress;
const contractAddress = "0xaE036c65C649172b43ef7156b009c6221B596B8b";

const connectWalletBtn = document.getElementById("connectWallet");
const walletAddressP = document.getElementById("walletAddress");
const buyTicketBtn = document.getElementById("buyTicketBtn");
const drawNumberBtn = document.getElementById("drawNumberBtn");
const ticketNumberInput = document.getElementById("ticketNumber");

const jackpotSpan = document.getElementById("jackpot");
const roundSpan = document.getElementById("round");
const timeUntilDrawSpan = document.getElementById("timeUntilDraw");
const ticketsCountSpan = document.getElementById("ticketsCount");

connectWalletBtn.addEventListener("click", connectWallet);
buyTicketBtn.addEventListener("click", buyTicket);
drawNumberBtn.addEventListener("click", drawNumber);

async function connectWallet() {
  if (!window.ethereum) {
    walletAddressP.textContent = "MetaMask is not installed.";
    return;
  }

  const res = await fetch("abi.json");
  const abi = await res.json();

  await window.ethereum.request({ method: "eth_requestAccounts" });
  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();
  userAddress = await signer.getAddress();
  contract = new ethers.Contract(contractAddress, abi, signer);

  walletAddressP.textContent = `Connected: ${userAddress}`;
  buyTicketBtn.disabled = false;
  drawNumberBtn.disabled = false;

  updateUI();
}

async function updateUI() {
  try {
    const info = await contract.getContractInfo();
    jackpotSpan.textContent = ethers.utils.formatEther(info.currentJackpot);
    roundSpan.textContent = info.currentRound.toString();
    timeUntilDrawSpan.textContent = info.timeUntilDraw.toString();
    ticketsCountSpan.textContent = info.ticketsInCurrentRound.toString();
  } catch (err) {
    console.error("Error updating UI:", err);
  }
}

async function buyTicket() {
  const number = parseInt(ticketNumberInput.value);
  if (isNaN(number)) {
    alert("Please enter a valid number.");
    return;
  }

  const info = await contract.getContractInfo();
  const ticketPrice = info.currentTicketPrice;

  const tx = await contract.buyTicket(number, {
    value: ticketPrice
  });

  await tx.wait();
  alert("Ticket purchased!");
  updateUI();
}

async function drawNumber() {
  const tx = await contract.autoDrawNumber(); // or drawNumber()
  await tx.wait();
  alert("Draw complete!");
  updateUI();
}
