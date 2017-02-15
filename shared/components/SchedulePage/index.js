/* eslint-disable max-len */

import React from 'react';
import Helmet from 'react-helmet';

import MailingList from '../MailingList';
import SchedulePageOverview from '../SchedulePageOverview';
import Schedule from '../Schedule';

const SchedulePage = (props) => {
  const description = 'Single track, talks, panel event, food, fun and friends with the React community.';
  const metaImage = 'https://react.london/img/JPG/OG_React_Schedule.jpg';
  const title = 'One day React conference in London';
  return (
    <div>
      <Helmet
        meta={[
           { property: 'twitter:card', content: 'summary_large_image' },
           { property: 'twitter:site', content: '@ReactLondon_' },
           { property: 'twitter:title', content: title },
           { property: 'twitter:description', content: description },
           { property: 'twitter:image', content: metaImage },
           { property: 'og:url', content: 'https://react.london/schedule' },
           { property: 'og:title', content: title },
           { property: 'og:image', content: metaImage },
           { property: 'og:description', content: description },
        ]}
      />
      <SchedulePageOverview {...props} />
      <Schedule />
      <MailingList
        mailingListTitle="Stay tuned"
        mailingListSummary="Get ticket reminders and event information about the conference."
        page="conference"
      />
    </div>
  );
};

export default SchedulePage;
