import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, View, FlatList,Image,TouchableOpacity ,PixelRatio} from 'react-native';
import { SearchBar } from 'react-native-elements';

const App = () => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    fetch('https://beer-glasses.eu/wp-json/wp/v2/posts?per_page=50')
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const searchFilterFunction = (text) => {

    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.title.rendered
          ? item.title.rendered.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };
 
    const ItemView = ({ item }) => {
    return (
      // Flat List Item
	  <View style={styles.containerImage}>
	   <TouchableOpacity
        style={styles.button}
        onPress={() => getItem(item)}
      >
	  <Image
        style={styles.searchImage}
        source={item.fimg_url}
      />
	  <Text style={styles.itemStyle} onPress={() => getItem(item)}>
        {item.title.rendered.toUpperCase()}
      </Text>
	  </TouchableOpacity>
	  </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = (item) => {
    // Function for click on an item
    alert('Id : ' + item.id + ' Title : ' + item.title);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <SearchBar
          round
          searchIcon={{ size: 24 }}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          placeholder="Type Here..."
          value={search}
        />
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
		  numColumns={3}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
	flex:1,
    backgroundColor: '#000',
  },
  itemStyle: {
    padding: 10,
	backgroundColor:'#000',
	color:'#fff',
	alignItems: "center",
  },
   containerImage: {
	flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
	width:'100%',
	height:440,
	margin:1,
  },
   searchImage: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
  },
});

export default App;
