export interface Event {
    id: number;
    name: string;
    date: Date;
    price: string;
    available: number;
  }
  
  export interface Ticket {
    eventId: number;
    ticketId: number;
    uniqueHash?: string;
  }
  