import { config } from './config';
import { confluence } from './modules';
import {
    RtmClient, MemoryDataStore,
    CLIENT_EVENTS, RTM_EVENTS
} from '@slack/client';

const token = process.env.SLACK_APITOKEN || '';
const rtm = new RtmClient(token, {
    dataStore: new MemoryDataStore()
});

const handleMessage = msg => {
  const words = msg.text
    .trim()
    .toLowerCase()
    .replace(/[^0-9a-z ?]/g, '')
    .split(' ');

  if (words.length > 0) {
    if (words[0] === '?' || words[0] === 'find') {
      return confluence.search(words.slice(1)).then(results => results);
    }
  }
  return Promise.reject();
};

rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, data => {
    console.log(`logged in as "${data.self.name}" on team "${data.team.name}".`);
});

rtm.on(RTM_EVENTS.MESSAGE, message => {
  // Listens to all `message` events from the team
  const user = rtm.dataStore.getUserById(message.user);
  handleMessage(message)
    .then(result => { rtm.sendMessage(result, message.channel); })
    .catch(error => { rtm.sendMessage(`I'm sorry, I didn't understand "${message.text}"`, message.channel); });

  rtm.on(RTM_EVENTS.CHANNEL_CREATED, message => {
    // Listens to all `channel_created` events from the team
    console.log('CHANNEL_CREATED', message);
  });
});

rtm.start();