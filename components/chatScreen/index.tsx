import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Icon library for arrow-down icon
import { chatHistory } from "@/constants/chats";

export function ChatScreen() {
  const [messages, setMessages] = useState([...chatHistory]);
  const [newMessage, setNewMessage] = useState("");
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const flatListRef = useRef<FlatList>(null);

  console.log("===keyboardOffset here", keyboardOffset);

  const handleSend = () => {
    if (newMessage.trim()) {
      const newMessageObject = {
        name: "Alice",
        text: newMessage,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        sender: true,
      };
      setMessages((prevMessages) => [...prevMessages, newMessageObject]);
      setNewMessage("");
      setTimeout(
        () => flatListRef.current?.scrollToEnd({ animated: true }),
        100
      );
    }
  };

  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isScrolledUp =
      contentOffset.y < contentSize.height - layoutMeasurement.height - 100;
    setShowScrollButton(isScrolledUp);
  };

  const scrollToBottom = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
    setShowScrollButton(false);
  };

  const renderItem = ({ item }: any) => {
    if (!item.sender) {
      return (
        <View style={styles.senderContainer}>
          <Image
            source={require("../../assets/images/imgTest.jpg")}
            style={styles.profilePicture}
          />
          <View
            style={[
              styles.messageContainer,
              item.sender ? styles.messageRight : styles.messageLeft,
            ]}
          >
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.messageTime}>{item.time}</Text>
          </View>
        </View>
      );
    }

    return (
      <View
        style={[
          styles.messageContainer,
          item.sender ? styles.messageRight : styles.messageLeft,
        ]}
      >
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.messageTime}>{item.time}</Text>
      </View>
    );
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        setKeyboardOffset(event.endCoordinates.height);
      }
    );
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardOffset(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        {
          paddingBottom: keyboardOffset,
        },
      ]}
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.messagesList}
        onScroll={handleScroll}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
      />
      <View
        style={[
          styles.inputContainer,
          {
            alignItems: Platform.OS === "ios" ? "flex-start" : "center",
            height: Platform.OS === "ios" ? 100 : 75,
          },
        ]}
      >
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message..."
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
      {showScrollButton && (
        <TouchableOpacity onPress={scrollToBottom} style={styles.scrollButton}>
          <Ionicons name="arrow-down" size={24} color="#fff" />
        </TouchableOpacity>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f8",
  },
  messagesList: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  senderContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  messageContainer: {
    maxWidth: "80%",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  messageLeft: {
    alignSelf: "flex-start",
    backgroundColor: "#7eac2b",
  },
  messageRight: {
    alignSelf: "flex-end",
    backgroundColor: "#007AFF",
  },
  messageText: {
    color: "#fff",
  },
  messageTime: {
    fontSize: 10,
    color: "#fff",
    textAlign: "right",
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#ffffff",
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 20,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  scrollButton: {
    position: "absolute",
    bottom: 110,
    right: 20,
    backgroundColor: "#e06433",
    padding: 10,
    borderRadius: 25,
    elevation: 5,
  },
});
