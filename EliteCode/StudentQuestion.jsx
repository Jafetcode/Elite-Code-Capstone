import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

export default function StudentQuestion() {
  useEffect(() => {
    console.log("StudentQuestion screen mounted");
  }, []);

  return (
    <View>
      <Text>Student Question Screen</Text>
    </View>
  );
}