import { Box, styled, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { SendMessageIcon } from "src/assets/iconify";
import MUIAvatar from "src/components/mui/MUIAvatar";
import Page from "src/components/Page";
import Scrollbar from "src/components/Scrollbar";
import { SocketKeyName } from "src/Constant";
import useAuth from "src/hooks/useAuth";
import { SocketService } from "src/service/Socket";
import showMessage from "src/util/ShowMessage";
import { ChatObj, TSubscriber } from "./DataObject";

export default function ChatViewer() {
  const [Message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatObj[]>([]);
  const [socketError, setSocketError] = useState<ChatObj | null>(null);
  const [ShowTypingLoading, setShowTypingLoading] = useState<boolean>(false);
  const [SelectedSubscriber, setSelectedSubscriber] = useState<TSubscriber>(
    new TSubscriber()
  );
  const {
    user: {
      userInfo: { email, name, id, role },
    },
  } = useAuth();
  const theme = useTheme();

  const _Socket = new SocketService(
    {
      _id: id,
      email: email,
      name: name,
      role: role as any,
    },
    GetChatMessage,
    onUserTyping,
    GetChatError
  );

  useEffect(() => {
    if (SelectedSubscriber.email !== "" && email !== "") {
      const _ChatObj = new ChatObj();
      _ChatObj.key = email + SelectedSubscriber.email; // first admin email then subscriber email -- change email to id
      _Socket.joinRoom(_ChatObj);
    }
  }, [SelectedSubscriber]);

  useEffect(() => {
    if (socketError !== null) {
      showMessage(socketError.message, theme, () => {});
    }
  }, [socketError]);

  const GetChatObj = (message: string, key?: string): ChatObj => {
    const _ChatObj = new ChatObj();
    _ChatObj.date = new Date();
    _ChatObj.key = key ? key : email + SelectedSubscriber.email;
    _ChatObj.message = message;
    _ChatObj.senderDetail = {
      _id: id,
      email: email,
      name: name,
      profileImg: "",
    };

    return _ChatObj;
  };

  function GetChatMessage(msg: ChatObj) {
    let newChatObj = new ChatObj();
    newChatObj = { ...msg, date: msg.date };
    setChatMessages((prevMessages) => [...prevMessages, newChatObj]);
    setShowTypingLoading(false);
  }

  function GetChatError(err: ChatObj) {
    setSocketError(err);
  }

  function onUserTyping(msg: ChatObj) {
    if (!ShowTypingLoading) {
      setShowTypingLoading(true);
    }
    if (msg) {
    }
  }

  const SendMessage = () => {
    _Socket.sendChatMessageInRoom(
      SocketKeyName.SendMessage,
      GetChatObj(Message),
      (err) => {
        console.log(err);
      }
    );
  };

  const OnChangeMessage = (value: string) => {
    if (!ShowTypingLoading) {
      _Socket.sendChatMessageInRoom(
        SocketKeyName.TypingMessage,
        GetChatObj("user is typing")
      );
    }
    setMessage(value);
  };

  const OnSelectSubscriber = (subscriber: TSubscriber) => {
    setSelectedSubscriber(subscriber);
  };

  return (
    <Page title="Chat">
      <RootStyle>
        <SubscriberListWrapper>
          <SubscriberListHeaderWrapper>
            <SubscriberListHeader>Subscribers</SubscriberListHeader>
          </SubscriberListHeaderWrapper>
          <SubscriberList>
            <Scrollbar sx={{ height: "100%" }}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((val) => (
                <SubscriberDetailWrapper
                  key={val}
                  onClick={() =>
                    OnSelectSubscriber({
                      email: "subscriber" + val + "@example.com",
                      name: "Subscriber " + val,
                      profileImg: "",
                      _id: "123456",
                    })
                  }
                >
                  <MUIAvatar name={"Subscriber " + val} />
                  <UserContentWrapper>
                    <UserNameText>{"Subscriber " + val}</UserNameText>
                    <UserEmailText>
                      {"subscriber" + val + "@example.com"}
                    </UserEmailText>
                  </UserContentWrapper>
                </SubscriberDetailWrapper>
              ))}
            </Scrollbar>
          </SubscriberList>
        </SubscriberListWrapper>

        <MessageContentWrapper>
          <MessageListWrapper>
            <MessageContentHeader>
              <MUIAvatar
                sx={{ height: 30, width: 30 }}
                name={SelectedSubscriber.name}
                src={SelectedSubscriber.profileImg}
              />
              <SubscriberListHeader>
                {SelectedSubscriber?.name}
              </SubscriberListHeader>
            </MessageContentHeader>
            <Scrollbar>
              <div style={{ padding: "0px 10px 10px 10px" }}>
                {chatMessages.map((objChat, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent:
                        objChat.senderDetail.email === email
                          ? "flex-end"
                          : "flex-start",
                    }}
                  >
                    <MessageTextWrapper
                      sx={{
                        backgroundColor:
                          objChat.senderDetail.email === email
                            ? theme.palette.text.primary
                            : theme.palette.grey[50012],
                      }}
                    >
                      <MUIAvatar
                        name={objChat.senderDetail.name}
                        src={
                          objChat.senderDetail.profileImg !== ""
                            ? objChat.senderDetail.profileImg
                            : undefined
                        }
                      />
                      <MessageText>{objChat.message}</MessageText>
                      <MessageDate>{objChat.date as any}</MessageDate>
                    </MessageTextWrapper>
                  </Box>
                ))}
                {ShowTypingLoading && (
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <MessageTextWrapper
                      sx={{
                        backgroundColor: theme.palette.grey[50012],
                      }}
                    >
                      <MUIAvatar
                        name={SelectedSubscriber.name}
                        src={SelectedSubscriber.profileImg}
                      />
                      <MessageText>Typing....</MessageText>
                    </MessageTextWrapper>
                  </Box>
                )}
              </div>
            </Scrollbar>
          </MessageListWrapper>
          <MessageInputWrapper>
            <MessageInputField
              placeholder="Enter Your Message.."
              onChange={(e) => OnChangeMessage(e.target.value)}
            />
            <SendButtonWrapper onClick={SendMessage}>
              <SendMessageIcon
                height={25}
                width={25}
                IconColor={theme.themeColor}
              />
            </SendButtonWrapper>
          </MessageInputWrapper>
        </MessageContentWrapper>
      </RootStyle>
    </Page>
  );
}

const RootStyle = styled(Box)(() => ({
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "row",
  paddingTop: "0.5rem",
  // border: `1px dashed ${theme.palette.divider}`,
  borderRadius: "10px",
}));

const MessageContentWrapper = styled(Box)(() => ({
  height: "100%",
  width: "100%",
}));

const MessageContentHeader = styled(Box)(({ theme }) => ({
  padding: "0px 10px 10px 10px",
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  borderBottom: `1px solid ${theme.palette.divider}`,
  height: 40,
}));

const MessageInputWrapper = styled(Box)(({ theme }) => ({
  height: "10%",
  width: "100%",
  display: "flex",
  alignItems: "center",
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const MessageInputField = styled("input")(() => ({
  height: "100%",
  width: "90%",
  padding: "0px 10px",
  fontSize: "0.9rem",
  backgroundColor: "transparent",
  border: "none",
  outline: "none",
}));

const SendButtonWrapper = styled(Box)(({ theme }) => ({
  height: "100%",
  width: "10%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  borderLeft: `1px solid ${theme.palette.divider}`,
}));

const MessageTextWrapper = styled(Box)(() => ({
  minHeight: 20,
  padding: "10px",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  borderRadius: "15px",
  maxWidth: "80%",
  textWrap: "wrap",

  gap: "10px",
  minWidth: "25%",
  position: "relative",
  marginTop: "10px",
  overflow: "hidden",
}));

const MessageText = styled(Typography)(({ theme }) => ({
  fontSize: "0.85rem",
  color: theme.palette.mode === "dark" ? "black" : "white",
  width: "100%",
  textWrap: "wrap",
}));

const MessageListWrapper = styled(Box)(() => ({
  display: "flex",
  height: "90%",
  maxHeight: "90%",
  width: "100%",
  flexDirection: "column",
  justifyContent: "flex-end",
}));

const MessageDate = styled(Typography)(({ theme }) => ({
  fontSize: "0.75rem",
  color: theme.palette.color.rose.main,
  marginLeft: "auto",
  position: "absolute",
  bottom: 5,
  right: 10,
  fontStyle: "italic",
  fontWeight: 700,
}));

const SubscriberListWrapper = styled(Box)(({ theme }) => ({
  height: "100%",
  width: "30%",
  borderRight: `1px solid ${theme.palette.divider}`,
  maxHeight: "100%",
}));

const SubscriberListHeaderWrapper = styled(Box)(({ theme }) => ({
  padding: "0px 10px 10px 10px",
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  borderBottom: `1px solid ${theme.palette.divider}`,
  height: 40,
  justifyContent: "center",
}));

const SubscriberListHeader = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: "1rem",
  textAlign: "center",
}));

const SubscriberList = styled(Box)(() => ({
  height: "calc(100% - 38px)",
  overflowY: "auto",
  maxHeight: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
}));

const SubscriberDetailWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: "10px",
  cursor: "pointer",
  gap: "10px",
  borderBottom: `1px solid ${theme.palette.divider}`,
  "&:hover": {
    backgroundColor: theme.palette.background.neutral,
  },
}));

const UserContentWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}));

const UserNameText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: "1rem",
  textAlign: "left",
}));

const UserEmailText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "0.85rem",
  textAlign: "left",
}));
