import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const { width } = Dimensions.get("window");

const images = [
  "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Replace with royalty-free image URLs
  "https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/794062/pexels-photo-794062.jpeg?auto=compress&cs=tinysrgb&w=600",
];

export const LoginScreen = () => {
  const scrollRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      scrollRef.current?.scrollTo({ x: width * currentIndex, animated: true });
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onMomentumScrollEnd={(event) => {
          const index = Math.floor(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        style={styles.carouselContainer}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            style={styles.carouselImage}
          />
        ))}
      </ScrollView>

      {/* Overlayed Login Box */}
      <View style={styles.loginBox}>
        {/* Gradient Text using maskElement */}
        <Text style={styles.gradientText}>
          Your AI companion is waiting for you
        </Text>

        {/* Social Login Buttons */}
        <TouchableOpacity style={[styles.loginButton, styles.googleButton]}>
          <Icon name="google" size={20} color="#EA4335" style={styles.icon} />
          <Text style={[styles.loginText, { color: "#EA4335" }]}>
            Continue with Google
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.loginButton, styles.facebookButton]}>
          <Icon name="facebook" size={20} color="#3b5998" style={styles.icon} />
          <Text style={[styles.loginText, { color: "#3b5998" }]}>
            Continue with Facebook
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.loginButton, styles.appleButton]}>
          <Icon name="apple" size={20} color="#000" style={styles.icon} />
          <Text style={[styles.loginText, { color: "#000" }]}>
            Continue with Apple
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  carouselContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  carouselImage: {
    width,
    height: "100%",
    opacity: 0.4,
  },
  loginBox: {
    position: "absolute",
    width: "80%",
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: "rgba(255, 255, 255, 0.58)",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    alignItems: "center",
  },
  titleContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 8,
    marginBottom: 20,
  },
  gradientTextContainer: {
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  gradientText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#464343", // Visible over the gradient background
  },
  loginButton: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 12,
    marginVertical: 8,
    borderRadius: 8,
    justifyContent: "center",
    borderWidth: 1,
  },
  googleButton: {
    backgroundColor: "rgba(234, 67, 53, 0.1)",
    borderColor: "#EA4335",
  },
  facebookButton: {
    backgroundColor: "rgba(59, 89, 152, 0.1)",
    borderColor: "#3b5998",
  },
  appleButton: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderColor: "#000",
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
  },
  icon: {
    marginRight: 8,
  },
});
