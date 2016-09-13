const statusTypes = {
  PRE_RELEASE: {
    title: 'Tickets will go live on',
    subtitle: 'Date',
    buttonText: 'FREE TICKET AVAILABLE SOON',
  },
  TICKETS_LIVE: {
    title: 'Tickets live',
    subtitle: 'To get yours, go to',
    buttonText: 'Free Ticket',
  },
  WAITLIST: {
    title: 'Tickets now sold out',
    subtitle: 'Join the waiting list on',
    buttonText: 'Join Waitlist',
  },
  LIVE_STREAM: {
    title: 'Tickets now sold out',
    subtitle: 'Didn’t make it to the meetup? We got your back.',
    buttonText: 'Join Live Stream',
  },
  EVENT_ENDED: {
    title: 'This event has ended',
    subtitle: 'Tickets now sold out',
    buttonText: 'Watch Video',
  },
};

export function getTicketStatusOptions(event) {
  const ticketStatusOptions = statusTypes[event.status];
  if (ticketStatusOptions) {
    ticketStatusOptions.buttonLink = event.buttonLink;
    return ticketStatusOptions;
  }
  return {
    title: 'Tickets currently unavailable',
    subtitle: 'Please check back later for further details',
    buttonText: 'Tickets Unavailable',
  };
}
