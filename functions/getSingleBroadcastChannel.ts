const channelInstances: { [key: string]: BroadcastChannel } = {};

export default function getSingleBroadcastChannel(name: string) {
  if (channelInstances[name]) {
    return channelInstances[name];
  } else {
    channelInstances[name] = new BroadcastChannel(name);
  }
}
