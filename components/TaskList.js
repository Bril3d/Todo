import React from "react";
import { VStack, ScrollView } from "native-base";
import TaskItem from "./TaskItem";

const TaskList = ({ list, handleStatusChange, handleEdit, handleDelete }) => {
  return (
    <ScrollView h="210">
      <VStack space={2}>
        {list.map((item, index) => (
          <TaskItem
            key={item.title + index.toString()}
            item={item}
            index={index}
            handleStatusChange={handleStatusChange}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </VStack>
    </ScrollView>
  );
};

export default TaskList;
