const channelInstances: { [key: string]: BroadcastChannel } = {};

const getSingletonChannel = (name: string): BroadcastChannel => {
  if (!channelInstances[name]) {
    channelInstances[name] = new BroadcastChannel(name);
  }
  return channelInstances[name];
};

export default getSingletonChannel;
