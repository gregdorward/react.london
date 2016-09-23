/* eslint-disable max-len */

import React from 'react';
import SpeakersList from '.';
import { shallow } from 'enzyme';

const speakers = [
  {
    id: 'V8cFyioAACsAd0yt',
    name: 'Christopher Chedeau',
    company: 'Facebook',
    twitterHandle: 'Vjeux',
    githubHandle: 'Vjeux',
    blogURL: 'http://blog.vjeux.com/',
    imageURL: '',
    bio: [
      {
        type: 'paragraph',
        text: 'With two paragraphs',
      },
      {
        type: 'paragraph',
        text: 'Full description',
      },
    ],
  },
  {
    id: 'V6IbaywAACsAN-X7',
    name: 'Luca Mezzalira',
    company: 'Massive Interactive',
    twitterHandle: 'lucamezzalira',
    githubHandle: 'lucamezzalira',
    blogURL: null,
    imageURL: '//res.cloudinary.com/red-badger-assets/image/upload/v1470318218/speaker3_zkq7nl.png',
    bio: null,
  },
];

describe('SpeakersList component', () => {
  it('can render', () => {
    shallow(<SpeakersList speakers={speakers} />);
  });

  it('returns null if no speakers are provided', () => {
    const wrapper = shallow(<SpeakersList />);
    expect(wrapper.text()).to.equal('');
  });
});