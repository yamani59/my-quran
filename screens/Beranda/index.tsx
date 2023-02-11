import { Text, View } from "../../components/Themed";
import { SecondThemeDark, ThemeDark } from "../../constants/Colors";
import { RootTabScreenProps } from "../../types";
import Images from "../../assets/images";
import Icons from "../../assets/icons";
import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, Image, FlatList } from "react-native";
import QuranKemenag from "quran-kemenag";

export default function Beranda({ navigation }: RootTabScreenProps<"Beranda">) {
  const Quran = new QuranKemenag();
  const [surahList, setSurahList] = useState<any[]>([]);
  const [surah, setSurah] = useState({
    name: "Al Fatiah",
    no: 1,
  });

  useEffect(() => {
    Quran.getListSurah().then((resp) => {
      console.log(resp);
      setSurahList(resp);
    });
  }, []);

  return (
    <ScrollView style={[Style.Content]}>
      <Text style={{ color: "#535d8e", fontSize: 18 }}>Assalamualikum</Text>
      <Text style={{ color: "white", fontSize: 26 }}>
        Ahd. Yuda Zaki Yamani
      </Text>
      <View
        style={{
          borderRadius: 15,
          marginTop: 20,
          position: "relative",
          height: 120,
        }}
      >
        <View
          style={{
            position: "absolute",
            zIndex: 1,
            padding: 15,
            bottom: 5,
            left: 5,
            backgroundColor: "transparent",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {surah.name}
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 14,
            }}
          >
            {"Ayat no. " + surah.no}
          </Text>
        </View>
        <Image
          source={Images.beranda_header}
          style={{
            width: "100%",
            position: "absolute",
            height: 120,
            borderRadius: 15,
            overflow: "hidden",
          }}
        />
      </View>
      <View style={{ marginTop: 10,flexDirection: "row", backgroundColor: "transparent" }}>
        <Text style={{ flex: 1, color: 'white', textAlign: 'center', borderBottomColor: SecondThemeDark, borderBottomWidth: 5, borderBottomEndRadius: 20, paddingVertical: 15 }}>Surah</Text>
        <Text style={{ flex: 1, color: '#535d83', textAlign: 'center', borderBottomColor: '#535d83', borderBottomWidth: 5, paddingVertical: 15 }}>Para</Text>
        <Text style={{ flex: 1, color: '#535d83', textAlign: 'center', borderBottomColor: '#535d83', borderBottomWidth: 5, paddingVertical: 15 }}>Page</Text>
        <Text style={{ flex: 1, color: '#535d83', textAlign: 'center', borderBottomColor: '#535d83', borderBottomWidth: 5, paddingVertical: 15 }}>Hijb</Text>
      </View>
      <FlatList
        style={{
          marginTop: 10,
        }}
        data={surahList}
        keyExtractor={(item) => item.surah_id}
        renderItem={({ item }) => (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              position: "relative",
              backgroundColor: "transparent",
              borderBottomColor: "#535d8e",
              borderBottomWidth: 1,
              paddingVertical: 20,
            }}
          >
            <View
              style={{
                flex: 1,
                position: "relative",
                backgroundColor: "transparent",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  alignSelf: "center",
                  position: "absolute",
                  textAlign: "center",
                  width: 40,
                  left: 0,
                  zIndex: 2,
                }}
              >
                {item.surah_id}
              </Text>
              <Image source={Images.num_bg} style={{ width: 40, height: 40 }} />
            </View>
            <View
              style={{
                backgroundColor: "transparent",
                flex: 4,
              }}
            >
              <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
                {item.surah_name}
              </Text>
              <Text style={{ color: "#535d8e" }}>
                {item.surah_name_bahasa +
                  " | " +
                  item.surah_verse_count +
                  " ayat"}
              </Text>
            </View>
            <View
              style={{
                flex: 2,
                backgroundColor: "transparent",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Text
                style={{
                  color: SecondThemeDark,
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                {item.surah_name_arabic}
              </Text>
            </View>
          </View>
        )}
      ></FlatList>
    </ScrollView>
  );
}

const Style = StyleSheet.create({
  Content: {
    flex: 1,
    padding: 20,
    backgroundColor: ThemeDark,
  },
});
