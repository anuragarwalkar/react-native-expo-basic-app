import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function GoalItem(props: { title: string; onDelete: (id: string) => void; index: string }) {
  return (
    <TouchableOpacity onPress={() => props.onDelete(props.index)}>
      <View style={styles.listItem}>
        <Text>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listItem: {
    margin: 10,
    padding: 10,
    backgroundColor: '#ccc',
    borderColor: 'black',
    borderWidth: 1,
  },
});
