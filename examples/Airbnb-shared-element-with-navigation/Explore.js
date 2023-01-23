import {StyleSheet, View, ScrollView, Pressable, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Input, Text, Card, Chip} from '@rneui/themed';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SharedElement} from 'react-navigation-shared-element';
const listings = [
  {
    id: 'tiny-home',
    title: 'Tiny Home',
    subtitle: 'Entire Flat · 1 Bed',
    picture:
      'https://github.com/wcandillon/can-it-be-done-in-react-native/blob/master/season3/src/Airbnb/assets/tiny-home.jpg?raw=true',
    rating: 4.93,
    ratingCount: 861,
  },
  {
    id: 'cook-house',
    title: 'Cook House',
    subtitle: 'Entire Flat · 1 Bed',
    picture:
      'https://github.com/wcandillon/can-it-be-done-in-react-native/blob/master/season3/src/Airbnb/assets/cook-house.jpg?raw=true',
    rating: 4.93,
    ratingCount: 861,
  },
];
const CARD_WIDTH = 360;
const CARD_HEIGHT = 300;
const Explore = ({navigation}) => {
  const [selectedItem, setSelectedItem] = useState(null);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setSelectedItem(null);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={{flex: 1, paddingHorizontal: 15}}>
      <Input
        containerStyle={{
          marginTop: 10,
          paddingHorizontal: 0,

          padding: 0,
          margin: 0,
          height: 50,
        }}
        labelStyle={{margin: 0}}
        inputContainerStyle={{
          borderBottomWidth: 0,
          elevation: 4,
          borderRadius: 8,
        }}
        placeholder="Anywhere"
        leftIcon={
          <Ionicons
            style={{marginLeft: 10}}
            name="ios-arrow-back"
            size={24}
            color="black"
          />
        }
      />
      <View style={{flexDirection: 'row', marginTop: 15}}>
        <Chip
          title="Dates"
          type="outline"
          titleStyle={{color: 'black'}}
          buttonStyle={{
            borderColor: 'black',
            borderWidth: 1,
          }}
        />
        <Chip
          title="Guests"
          type="outline"
          titleStyle={{color: 'black'}}
          buttonStyle={{
            borderColor: 'black',
            borderWidth: 1,
            marginHorizontal: 5,
          }}
        />
        <Chip
          title="Filters"
          type="outline"
          titleStyle={{color: 'black'}}
          buttonStyle={{borderColor: 'black', borderWidth: 1}}
        />
      </View>
      <View style={{marginVertical: 20}}>
        <Text h4>300+ places to stay</Text>
      </View>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        {listings.map((item, i) => {
          return (
            <Pressable
              key={i}
              onPress={() => {
                setSelectedItem(item.id);
                navigation.navigate('Listing', {
                  post: item,
                });
              }}>
              <View
                style={{
                  width: CARD_WIDTH,
                  marginBottom: 20,
                  backgroundColor: 'white',
                  //  overflow: 'hidden',

                  elevation: 1,
                }}>
                <SharedElement id={item.id}>
                  <Image
                    resizeMode="stretch"
                    source={{uri: item.picture}}
                    style={{
                      width: '100%',
                      height: 150,
                      opacity: item.id == selectedItem ? 0 : 1,
                    }}
                  />
                </SharedElement>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '90%',
                    paddingHorizontal: 4,
                    justifyContent: 'space-between',
                    marginVertical: 10,
                    alignItems: 'center',
                  }}>
                  <Chip
                    title="SUPERHOST"
                    type="outline"
                    titleStyle={{color: 'black', fontSize: 10}}
                    buttonStyle={{
                      borderColor: 'black',
                      borderWidth: 1,
                      paddingVertical: 5,
                      paddingHorizontal: 3,
                    }}
                  />
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Ionicons name="star" size={12} color="#ff2e56" />
                    <Text
                      style={{
                        fontSize: 12,
                        marginHorizontal: 3,
                      }}>
                      {item.rating}
                    </Text>
                    <Text style={{fontSize: 12}}>({item.ratingCount})</Text>
                  </View>
                </View>
                <View style={{paddingBottom: 10, paddingHorizontal: 5}}>
                  <Text h4>{item.title}</Text>
                  <Text h6>{item.subtitle}</Text>
                </View>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Explore;

const styles = StyleSheet.create({});
