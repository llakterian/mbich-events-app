export const EventManagementABI = [
  {
    inputs: [],
    name: "getUserTickets",
    outputs: [
      {
        components: [
          { name: "ticketId", type: "uint256" },
          { name: "eventId", type: "uint256" },
          { name: "uniqueHash", type: "string" },
          { name: "isValid", type: "bool" }
        ],
        internalType: "struct EventManagement.Ticket[]",
        name: "",
        type: "tuple[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  "function createEvent(string memory _name, uint256 _date, uint256 _price, uint256 _ticketCount) public",
  "function getEvent(uint256 _eventId) public view returns (string memory name, uint256 date, uint256 price, uint256 ticketsRemaining)",
  "function purchaseTicket(uint256 _eventId) public payable",
  "event TicketPurchased(uint256 indexed eventId, address indexed buyer, uint256 price)"
];
