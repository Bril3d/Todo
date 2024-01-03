
import React from "react";
import { HStack, Checkbox, Text, IconButton, Icon } from "native-base";
import { Entypo } from "@expo/vector-icons";

const TaskItem = ({ item, index, handleStatusChange, handleEdit, handleDelete }) => {
  return (
    <HStack
      w="100%"
      justifyContent="space-between"
      alignItems="center"
      key={item.title + index.toString()}
    >
      <Checkbox
        isChecked={item.isCompleted}
        onChange={() => handleStatusChange(itemI)}
        value={item.title}
        aria-label="Task"
      ></Checkbox>
      <Text
        width="100%"
        flexShrink={1}
        textAlign="left"
        mx="2"
        strikeThrough={item.isCompleted}
        _light={{
          color: item.isCompleted ? "gray.400" : "coolGray.800"
        }}
        _dark={{
          color: item.isCompleted ? "gray.400" : "coolGray.50"
        }}
        onPress={() => handleStatusChange(itemI)}
      >
        {item.title}
      </Text>
      <IconButton
        size="sm"
        colorScheme="trueGray"
        icon={<Icon as={Entypo} name="edit" size="xs" color="trueGray.400" aria-label="Edit Task" />}
        onPress={() => handleEdit(index)}
        aria-label="Edit Task"
      />
      <IconButton
        size="sm"
        colorScheme="trueGray"
        icon={<Icon as={Entypo} name="minus" size="xs" color="trueGray.400" aria-label="Delete Task" />}
        onPress={() => handleDelete(index)}
        aria-label="Delete Task"
      />
    </HStack>
  );
};

export default TaskItem;
