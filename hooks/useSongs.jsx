import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as MediaLibrary from "expo-media-library";
import { allSongsAction } from "../redux/actions/musicActions";

export const useSongs = () => {
  const dispatch = useDispatch();

  const [songsList, setSongsList] = useState([]);
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);

  useEffect(() => {
    const fetchAudioSongs = async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        setIsPermissionGranted(true);

        const mediaAssets = await MediaLibrary.getAssetsAsync({
          mediaType: "audio",
          first: 1000,
        });

        setSongsList(mediaAssets.assets);
        dispatch(allSongsAction(mediaAssets.assets));
      } else {
        setIsPermissionGranted(false);
      }
    };

    fetchAudioSongs();
  }, []);

  return { songsList, isPermissionGranted };
};
