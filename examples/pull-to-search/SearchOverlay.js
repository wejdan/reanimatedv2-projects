import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import React from 'react';

const SearchOverlay = ({IsVisible, onRequestClose}) => {
  return (
    <TouchableWithoutFeedback onPress={onRequestClose}>
      <View
        pointerEvents={IsVisible ? 'auto' : 'none'}
        style={{
          ...StyleSheet.absoluteFill,
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          opacity: IsVisible ? 1 : 0,
        }}>
        {IsVisible && (
          <View
            style={{
              backgroundColor: '#fdfcff',
              marginTop: 64,
              marginHorizontal: 32,
              padding: 16,
              borderRadius: 16,

              paddingHorizontal: 20,
              paddingVertical: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 20,
              }}>
              <TextInput
                placeholder="Quick Find"
                style={{
                  backgroundColor: '#e6e5ea',
                  flex: 1,
                  borderRadius: 8,
                  height: 32,
                  padding: 4,
                  marginRight: 8,
                }}
              />
              <TouchableOpacity
                style={{
                  borderRadius: 8,
                  height: 32,
                  justifyContent: 'center',
                  padding: 4,
                  paddingHorizontal: 8,
                }}>
                <Text style={{color: 'black'}}>Cancel</Text>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 32}}>
              <Text>Quickly switch lists, find to-dos, search for tags...</Text>
            </View>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SearchOverlay;

const styles = StyleSheet.create({});
