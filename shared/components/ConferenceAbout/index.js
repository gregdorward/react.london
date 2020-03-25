import React from 'react';
import PropTypes from 'prop-types';

const ConferenceAbout = ({ isAfterConference }) => (
  <section className="block ConferenceAbout">
    <div className="content">
      {isAfterConference ? (
        <div>
          <h2>Hi Red Badger QAs!</h2>
          <p>This is a sandbox designed to work on the branch testing process.</p>
        </div>
      ) : (
        <div>
          <h2>Let’s explore!</h2>
          <p>
            Red Badger is launching a new conference focused on React in London
            for 2017 – we’re calling it <strong>React London 2017.</strong>
          </p>
          <p>
            We’re bringing together some great speakers and events – get
            involved!
          </p>
        </div>
      )}
    </div>
  </section>
);

ConferenceAbout.propTypes = {
  isAfterConference: PropTypes.bool,
};

export default ConferenceAbout;
