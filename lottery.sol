// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

contract Lottery {
    address public owner;
    uint256 public ticketPrice;
    uint256 public jackpot;
    uint256 public roundNumber;
    uint256 public lastDrawTime;
    uint256 public constant DRAW_INTERVAL = 5 minutes;
    uint256 public constant MAX_NUMBER = 99; // เปลี่ยนเป็นเลข 2 ตัว (0-99)

    struct Ticket {
        address player;
        uint256 number;
        uint256 round;
    }

    mapping(uint256 => Ticket[]) public roundTickets;
    mapping(address => uint256[]) public playerTickets;
    mapping(uint256 => uint256[]) public winningNumbers;
    mapping(uint256 => address[]) public roundWinners;

    event TicketPurchased(address indexed player, uint256 number, uint256 round, uint256 ticketPrice);
    event NumberDrawn(uint256 round, uint256[] winningNumbers);
    event WinnerPaid(address indexed winner, uint256 amount, uint256 round);
    event JackpotIncreased(uint256 newAmount);
    event NewRoundStarted(uint256 round);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier validNumber(uint256 _number) {
        require(_number <= MAX_NUMBER, "Number must be between 0 and 99");
        _;
    }

    constructor(uint256 _ticketPrice) {
        owner = msg.sender;
        ticketPrice = _ticketPrice;
        roundNumber = 1;
        lastDrawTime = block.timestamp;
    }

    function buyTicket(uint256 _number) external payable validNumber(_number) {
        require(msg.value == ticketPrice, "Incorrect ticket price");
        require(block.timestamp < lastDrawTime + DRAW_INTERVAL, "Round has ended, waiting for draw");

        Ticket memory newTicket = Ticket({
            player: msg.sender,
            number: _number,
            round: roundNumber
        });

        roundTickets[roundNumber].push(newTicket);
        playerTickets[msg.sender].push(_number);

        uint256 jackpotAmount = (msg.value * 90) / 100;
        jackpot += jackpotAmount;

        emit TicketPurchased(msg.sender, _number, roundNumber, msg.value);
        emit JackpotIncreased(jackpot);
    }

    function drawNumber() public onlyOwner {
        require(block.timestamp >= lastDrawTime + DRAW_INTERVAL, "Draw interval not yet reached");
        require(roundTickets[roundNumber].length > 0, "No tickets sold for this round");

        uint256 winnersCount = 2;
        uint256[] memory winnersNumbers = new uint256[](winnersCount);

        for (uint256 i = 0; i < winnersCount; i++) {
            uint256 winningNum;
            bool unique;
            do {
                winningNum = uint256(keccak256(abi.encodePacked(
                    block.timestamp,
                    block.prevrandao,
                    msg.sender,
                    roundNumber,
                    i
                ))) % (MAX_NUMBER + 1);
                unique = true;
                for (uint256 j = 0; j < i; j++) {
                    if (winnersNumbers[j] == winningNum) {
                        unique = false;
                        break;
                    }
                }
            } while (!unique);
            winnersNumbers[i] = winningNum;
        }

        winningNumbers[roundNumber] = winnersNumbers;

        // Clear previous winners for safety
        delete roundWinners[roundNumber];

        for (uint256 i = 0; i < winnersCount; i++) {
            for (uint256 j = 0; j < roundTickets[roundNumber].length; j++) {
                if (roundTickets[roundNumber][j].number == winnersNumbers[i]) {
                    roundWinners[roundNumber].push(roundTickets[roundNumber][j].player);
                }
            }
        }

        uint256 winnersLength = roundWinners[roundNumber].length;
        if (winnersLength > 0) {
            uint256 prize = jackpot / winnersLength;
            jackpot = 0;
            for (uint256 i = 0; i < winnersLength; i++) {
                (bool success, ) = payable(roundWinners[roundNumber][i]).call{value: prize}("");
                require(success, "Transfer failed");
                emit WinnerPaid(roundWinners[roundNumber][i], prize, roundNumber);
            }
        }

        emit NumberDrawn(roundNumber, winnersNumbers);

        roundNumber++;
        lastDrawTime = block.timestamp;
        emit NewRoundStarted(roundNumber);
    }

    // จำกัดให้เฉพาะเจ้าของเรียก autoDraw
    function autoDrawNumber() external onlyOwner {
        if (block.timestamp >= lastDrawTime + DRAW_INTERVAL && roundTickets[roundNumber].length > 0) {
            drawNumber();
        }
    }

    function getCurrentRoundTickets() external view returns (Ticket[] memory) {
        return roundTickets[roundNumber];
    }

    function getPlayerTickets(address _player) external view returns (uint256[] memory) {
        return playerTickets[_player];
    }

    function getTimeUntilDraw() external view returns (uint256) {
        if (block.timestamp >= lastDrawTime + DRAW_INTERVAL) {
            return 0;
        }
        return (lastDrawTime + DRAW_INTERVAL) - block.timestamp;
    }

    function getRoundInfo(uint256 _round) external view returns (
        uint256 ticketCount,
        uint256[] memory winningNums,
        address[] memory winners
    ) {
        return (
            roundTickets[_round].length,
            winningNumbers[_round],
            roundWinners[_round]
        );
    }

    function withdrawOwnerFees() external onlyOwner {
        uint256 balance = address(this).balance - jackpot;
        require(balance > 0, "No fees to withdraw");
        payable(owner).transfer(balance);
    }

    function setTicketPrice(uint256 _newPrice) external onlyOwner {
        ticketPrice = _newPrice;
    }

    function getContractInfo() external view returns (
        uint256 currentJackpot,
        uint256 currentRound,
        uint256 currentTicketPrice,
        uint256 timeUntilDraw,
        uint256 ticketsInCurrentRound
    ) {
        uint256 timeLeft = 0;
        if (block.timestamp < lastDrawTime + DRAW_INTERVAL) {
            timeLeft = (lastDrawTime + DRAW_INTERVAL) - block.timestamp;
        }

        return (
            jackpot,
            roundNumber,
            ticketPrice,
            timeLeft,
            roundTickets[roundNumber].length
        );
    }
}
