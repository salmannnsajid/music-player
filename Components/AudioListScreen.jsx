import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { useSongs } from "../hooks/useSongs";
import { currentSongAction } from "../redux/actions/musicActions";

export const AudioListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { songsList, isPermissionGranted } = useSongs();

  const [searchQuery, setSearchQuery] = useState("");

  const playSong = (item) => {
    dispatch(currentSongAction(item));
    navigation.navigate("AudioDetail");
  };
  const ListItem = React.memo(({ item }) => {
    return (
      <TouchableOpacity style={styles.audioItem} onPress={() => playSong(item)}>
        <Text style={styles.audioText}>{item.filename}</Text>
      </TouchableOpacity>
    );
  });
  return (
    <View style={styles.container}>
      {isPermissionGranted ? (
        <>
          <TextInput
            value={searchQuery}
            style={styles.input}
            placeholder="Search..."
            onChangeText={(text) => setSearchQuery(text)}
            clearButtonMode="always"
          />
          <FlatList
            data={songsList
              .filter((item) =>
                item.filename.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((item) => item)}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ListItem item={item} />}
          />
        </>
      ) : (
        <Text>Permission to access audio not granted.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  audioItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  audioText: {
    fontSize: 16,
    color: "#333",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
