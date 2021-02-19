import React, { useState } from 'react';
import { Button, View, FlatList } from 'react-native';
import styles from './App.styles';
import GoalInput from './src/components/GoalInput';
import GoalItem from './src/components/GoalItem';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([] as { key: string; value: string }[]);
  const [showModal, setShowModal] = useState(false);

  const onAddPress = (enterdGoal: string) => {
    setCourseGoals((courseGoalsState) => [...courseGoalsState, { key: Math.random().toString(), value: enterdGoal }]);
    setShowModal(false);
  };

  const onDeleteItem = (index: string) => {
    setCourseGoals((courseGoalsState) => courseGoalsState.filter((course) => course.key !== index));
  };

  const onAddGoal = () => {
    setShowModal(true);
  };

  const onHide = () => {
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <Button title="Add new Goal" onPress={onAddGoal} />
      <GoalInput onHide={onHide} onAddPress={onAddPress} show={showModal} />

      {/* This way it will render entire list to the screen tho it will be scrollable but it will be memory hungry */}
      {/* <ScrollView style={styles.coursesGoal}>
        {courseGoals.map()}
      </ScrollView> */}
      {/* End of the ScrollView compoent */}

      {/* If we add flat list it will load the items those are only visible to screen that way will have performance boost */}
      <FlatList
        data={courseGoals}
        renderItem={(goal) => <GoalItem onDelete={onDeleteItem} index={goal.item.key} title={goal.item.value} />}
      />
      {/* End of the FlatList compoent */}
    </View>
  );
}
