// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract EventManagement {
    struct Event {
        string name;
        uint256 date;
        uint256 price;
        uint256 ticketCount;
        uint256 ticketsRemaining;
        address organizer;
    }

    struct Ticket {
        uint256 ticketId;
        uint256 eventId;
        string uniqueHash;
        bool isValid;
    }

    mapping(uint256 => Event) public events;
    mapping(address => Ticket[]) public userTickets;
    uint256 public nextEventId = 1;
    uint256 public nextTicketId = 1;

    event TicketPurchased(uint256 indexed eventId, address indexed buyer, uint256 price);

    function createEvent(string memory _name, uint256 _date, uint256 _price, uint256 _ticketCount) public {
        events[nextEventId] = Event(_name, _date, _price, _ticketCount, _ticketCount, msg.sender);
        nextEventId++;
    }

    function getEvent(uint256 _eventId) public view returns (string memory, uint256, uint256, uint256) {
        Event storage e = events[_eventId];
        return (e.name, e.date, e.price, e.ticketsRemaining);
    }

    function purchaseTicket(uint256 _eventId) public payable {
        Event storage e = events[_eventId];
        require(e.organizer != address(0), "Event does not exist");
        require(block.timestamp < e.date, "Event has expired");
        require(e.ticketsRemaining > 0, "No tickets available");
        require(msg.value >= e.price, "Insufficient payment");

        string memory ticketHash = generateTicketHash(msg.sender, _eventId, nextTicketId);
        
        userTickets[msg.sender].push(Ticket(
            nextTicketId,
            _eventId,
            ticketHash,
            true
        ));

        e.ticketsRemaining--;
        nextTicketId++;

        payable(e.organizer).transfer(e.price);
        if (msg.value > e.price) {
            payable(msg.sender).transfer(msg.value - e.price);
        }

        emit TicketPurchased(_eventId, msg.sender, e.price);
    }

    function generateTicketHash(address _owner, uint256 _eventId, uint256 _ticketId) internal pure returns (string memory) {
        return string(abi.encodePacked(_owner, _eventId, _ticketId));
    }

    function getUserTickets() public view returns (Ticket[] memory) {
        return userTickets[msg.sender];
    }
}
