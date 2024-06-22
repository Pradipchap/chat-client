export interface FriendBoxInterface {
  username: string;
  latestMessage?: string;
  time?: Date;
  isActive?: boolean;
  _id: string;
  email: string;
  phone?: "";
  image: string;
  isNewMessage?: false;
  dateofbirth: Date;
  seen: boolean;
}

export interface MessageInterface {
  message: string;
  isReceiver: boolean;
  time: Date;
  id: string;
}
export interface ChatsDataInterface {
  page: number;
  seen: boolean;
  messages: { message: string; sender: string; _id: string; datetime: Date }[];
}

export interface ChatterInterface {
  _id: string;
  chatterID: string;
  isFriend?: boolean;
  gotRequest?: boolean;
  sentRequest?: boolean;
  message?: string;
  whoMessaged?: string;
  datetime?: string;
}

export interface ChatterDetailsInterface {
  _id: string;
  combinedID: string;
  latestMessage?: {
    message: string;
    sender: string;
    _id: string;
    datetime: string;
  };
  isActive: boolean;
  seen: boolean;
  participantDetails: {
    image: string;
    _id: string;
    email: string;
    username: string;
    websocketId: string;
    __v: number;
  };
}

export interface UserFetchResults {
  users: FriendBoxInterface[];
  noOfUser: number;
}

export interface LoginResult {
  accessToken: string;
  email: string;
  username: string;
  userID: string;
  websocketId: string;
}

export interface DetailsObjectInterface {
  type:
    | "newUser"
    | "message"
    | "callGoi"
    | "callInc"
    | "callEnd"
    | "callReq"
    | "callRej"
    | "callAcc"
    | "callTmo"
    | "getMess"
    | "msgSeen";
  sender: string;
  receiver: string;
}
