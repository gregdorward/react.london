import moment from 'moment';

export function getActionLink(externalLinks, type) {
  if (!externalLinks) return undefined;

  return externalLinks.find((link) => {
    return link.type === type;
  });
}

/*
 * isTicketPreRelease
 * This function will return the correct values if the tickets are still to be released.
 * This is calculated by finding whether the currentTime is before the ticket release date
 */
export function isTicketPreRelease({ currentTime, ticketReleaseDate }) {
  if (currentTime.isBefore(ticketReleaseDate)) {
    return {
      buttonText: 'Free Ticket',
      linkType: '',
      statusHeader: 'TICKETS WILL GO LIVE ON',
      statusSubHeader: 'Monday, 11 July 2016 at 12:00',
    };
  }
}

/*
 * isTicketRelease
 * This function will return the correct values if the tickets are released.
 * This is calculated by finding whether the currentTime is after the ticket release date
 * and whether there are actually any tickets availiable.
 */
export function isTicketRelease({ currentTime, ticketReleaseDate, ticketsAvailiable }) {
  if (currentTime.isAfter(ticketReleaseDate) && ticketsAvailiable) {
    return {
      buttonText: 'Free Ticket',
      linkType: 'EVENT',
      statusHeader: 'TICKETS LIVE',
      statusSubHeader: 'Go to {Eventbrite} to get yours',
    };
  }
}

/*
 * isWaitlist
 * This function will return the correct values if the waiting list is open.
 * This is calculated by finding whether the waiting list is indeed open,
 * whether the current time is after the ticket release date
 * and whether there are no more tickets availiable.
 * The !ticketsAvailiable and time check aren't really necessary but they enable
 * all these functions to be run in any order and they serve as a data validator.
 */
export function isWaitlist({
  currentTime,
  ticketsAvailiable,
  waitingListOpen,
  ticketReleaseDate,
}) {
  if (waitingListOpen && !ticketsAvailiable && (currentTime.isAfter(ticketReleaseDate))) {
    return {
      buttonText: 'Join Waitlist',
      linkType: 'EVENT',
      statusHeader: 'TICKETS NOW SOLD OUT',
      statusSubHeader: 'Join the waiting list on {eventbrite}',
    };
  }
}

/*
 * isStreaming
 * This function will return the correct values if the event is streaming.
 * This is calculated by finding whether the currentTime is after the ticket release date
 * and whether the waiting list is closed and there are no tickets availiable.
 */
export function isStreaming({
  currentTime,
  ticketReleaseDate,
  ticketsAvailiable,
  waitingListOpen,
  endDateTime,
}) {
  if (
    currentTime.isAfter(ticketReleaseDate)
    && !waitingListOpen
    && !ticketsAvailiable
    && currentTime.isBefore(endDateTime)
  ) {
    return {
      buttonText: 'Join Live Stream',
      linkType: 'STREAM',
      statusHeader: 'TICKETS NOW SOLD OUT',
      statusSubHeader: 'Couldn’t get a ticket? We got your back.',
    };
  }
}

/*
 * isEnded
 * This function will return the correct values if the event is completed.
 * This is calculated by finding whether the currentTime is after the event endDateTime
 */
export function isEnded({ currentTime, endDateTime }) {
  if (currentTime.isAfter(endDateTime)) {
    return {
      buttonText: 'Watch',
      linkType: 'STREAM',
      statusHeader: 'This event has ended',
      statusSubHeader: 'Couldn’t get a ticket? We got your back.',
    };
  }
}

export function getTicketStatusOptions(options) {
  const parameters = { ...options, currentTime: moment() };
  const checks = [isTicketPreRelease, isTicketRelease, isWaitlist, isStreaming, isEnded];
  let result;

  checks.some((check) => {
    result = check(parameters);
    return result;
  });

  return Object.assign({}, result, {
    link: getActionLink(options.externalLinks, result.linkType),
  });
}
