import React, { useEffect, useState } from "react";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
import { useDispatch, useSelector } from "react-redux";
import { Entypo, AntDesign, MaterialIcons } from "react-native-vector-icons";
import { Text, View, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import {
  repeatSongAction,
  shuffleSongAction,
  currentSongAction,
} from "../redux/actions/musicActions";

export const AudioPlayer = ({ navigation }) => {
  const dispatch = useDispatch();

  const { repeatSong, allSongs, shuffleSong, currentSong } = useSelector(
    (state) => state.music
  );

  const [sound, setSound] = useState();
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (currentSong) {
      playSound(currentSong);
    } else {
      navigation.navigate("AudioList");
    }
  }, []);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    if (sound) {
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setPosition(status.positionMillis);
          setDuration(status.durationMillis);
          setSliderValue(status.positionMillis / status.durationMillis);
        }
      });
    }
  }, [sound]);

  const playSound = async (audioData) => {
    const { sound } = await Audio.Sound.createAsync(
      { uri: audioData.uri },
      { isLooping: repeatSong }
    );
    if (sound) {
      await sound.playAsync();
      setSound(sound);
      setIsPlaying(true);
    }
  };

  const resumeSound = async () => {
    if (sound && !isPlaying) {
      await sound.playAsync();
      setIsPlaying(true);
    }
  };
  const pauseSound = async () => {
    await sound.pauseAsync();
    setIsPlaying(false);
  };
  const formatTime = (timeMillis) => {
    const minutes = Math.floor(timeMillis / 60000);
    const seconds = ((timeMillis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleSliderChange = (value) => {
    if (sound) {
      const newPosition = value * duration;
      sound.setPositionAsync(newPosition);
      setPosition(newPosition);
      setSliderValue(value);
    }
  };

  const handleNext = () => {
    let total = allSongs.length;
    const random = Math.random();
    const scaledRandom = 0 + Math.floor(random * (total - 0 + 1));
    dispatch(currentSongAction(allSongs[scaledRandom]));
    playSound(allSongs[scaledRandom]);
  };

  return (
    <SafeAreaView style={styles.contanier}>
      <View style={styles.mainbar}>
        <AntDesign
          name="down"
          size={20}
          style={{ marginLeft: "5%" }}
          onPress={() => navigation.navigate("AudioList")}
        />
        <Text style={styles.now_playing_text}> Now Playing </Text>
        <Entypo
          name="dots-three-vertical"
          size={20}
          style={{ marginLeft: "30%" }}
        />
      </View>

      <View style={styles.music_logo_view}>
        {/* <Image
        source={require("./assets/logo.jpg")}
        style={styles.image_view}
      /> */}
      </View>

      <View style={styles.name_of_song_View}>
        <Text style={styles.name_of_song_Text1}>
          {currentSong ? currentSong.filename.slice(0, -4) : ""}
        </Text>
      </View>

      <View style={styles.slider_view}>
        <Text style={styles.slider_time}>{formatTime(position)}</Text>
        <Slider
          thumbTintColor="#e75480"
          style={styles.slider_style}
          minimumTrackTintColor="#e75480"
          maximumTrackTintColor="#d3d3d3"
          minimumValue={0}
          maximumValue={1}
          value={sliderValue}
          onValueChange={handleSliderChange}
        />
        <Text style={styles.slider_time}>{formatTime(duration)}</Text>
      </View>

      <View style={styles.functions_view}>
        <MaterialIcons
          size={24}
          color="#e75480"
          style={{ marginLeft: "9%" }}
          onPress={() => dispatch(shuffleSongAction())}
          name={shuffleSong ? "shuffle-on" : "shuffle"}
        />
        <Entypo
          size={24}
          color="#e75480"
          style={{ marginLeft: "12%" }}
          name="controller-fast-backward"
        />
        <AntDesign
          size={50}
          color="#e75480"
          style={{ marginLeft: "12%" }}
          name={isPlaying ? "pausecircle" : "caretright"}
          onPress={() => {
            if (isPlaying) {
              pauseSound();
            } else {
              resumeSound();
            }
          }}
        />
        <Entypo
          size={24}
          color="#e75480"
          name="controller-fast-forward"
          style={{ marginLeft: "12%" }}
          onPress={handleNext}
        />
        <MaterialIcons
          size={25}
          color="#e75480"
          style={{ marginLeft: "10%" }}
          name={repeatSong ? "repeat-one" : "repeat"}
          onPress={() => dispatch(repeatSongAction())}
        />
      </View>
    </SafeAreaView>
  );
};

const Dev_Width = Dimensions.get("window").width;
const Dev_Height = Dimensions.get("window").height;

const styles = StyleSheet.create({
  contanier: {
    height: Dev_Height,
    width: Dev_Width,
  },
  mainbar: {
    height: "10%",
    width: "100%",
    marginTop: "2%",
    flexDirection: "row",
    alignItems: "center",
  },
  now_playing_text: {
    fontSize: 19,
    marginLeft: "24%",
  },
  music_logo_view: {
    height: "30%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image_view: {
    height: "100%",
    width: "50%",
    borderRadius: 10,
  },
  name_of_song_View: {
    height: "15%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  name_of_song_Text1: {
    fontSize: 19,
    fontWeight: "500",
  },
  name_of_song_Text2: {
    color: "#808080",
    marginTop: "4%",
  },
  slider_view: {
    height: "10%",
    width: "100%",
    marginTop: "auto",
    alignItems: "center",
    flexDirection: "row",
  },
  slider_style: {
    height: "70%",
    width: "60%",
  },
  slider_time: {
    fontSize: 15,
    marginLeft: "6%",
    color: "#808080",
  },
  functions_view: {
    flexDirection: "row",
    height: "10%",
    width: "100%",
    alignItems: "center",
  },
});
