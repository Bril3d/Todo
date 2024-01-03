import React, { useState, useEffect } from "react";
import { ScrollView, Input, IconButton, Checkbox, Text, Box, VStack, HStack, Heading, Icon, Center, useToast, Select, Button, View } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather, Entypo, MaterialIcons } from "@expo/vector-icons";
import { LogBox } from 'react-native';
import Header from "../components/header";
import TaskList from "../components/TaskList";
import TagFilter from "../components/TagFilter";


const Todo = () => {
  const dayjs = require('dayjs')
  const initialState = [];
  const [list, setList] = useState(initialState);
  const [inputValue, setInputValue] = useState("");
  const [tagValue, setTagValue] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
  const [tags, setTags] = useState([]);
  const toast = useToast();

  LogBox.ignoreLogs(['In React 18, SSRProvider is not necessary and is a noop.']);

  useEffect(() => {
    loadTodoList();
    setTags(getUniqueTags(list));
  }, []);

  useEffect(() => {
    saveTodoList();
    setTags(getUniqueTags(list));
  }, [list]);

  const loadTodoList = async () => {
    try {
      const storedList = await AsyncStorage.getItem("todoList");
      if (storedList !== null) {
        setList(JSON.parse(storedList));
      }
    } catch (error) {
      console.error("Error loading todo list from AsyncStorage:", error);
    }
  };

  const saveTodoList = async () => {
    try {
      await AsyncStorage.setItem("todoList", JSON.stringify(list));
    } catch (error) {
      console.error("Error saving todo list to AsyncStorage:", error);
    }
  };
  const addItem = (title, tags) => {
    if (title === "") {
      toast.show({
        title: "Please Enter A Task",
        status: "warning"
      });
      return;
    }

    setList(prevList => {
      let newList = [...prevList];

      if (selectedTaskIndex !== null) {

        newList[selectedTaskIndex] = {
          title: title,
          isCompleted: newList[selectedTaskIndex].isCompleted,
          tags: tags.length > 0 ? tags : undefined,
        };
        toast.show({
          title: "Task Updated",
          status: "success"
        });
      } else {

        newList = [...prevList, {
          title: title,
          isCompleted: false,
          tags: tags.length > 0 ? tags : undefined,
        }];
        toast.show({
          title: "Task Added",
          status: "success"
        });
      }

      clearInputs();
      return newList;
    });
  };


  const clearInputs = () => {
    setInputValue("");
    setTagValue("");
    setSelectedTaskIndex(null);
  };

  const handleEdit = (filteredIndex) => {
    const originalIndex = list.findIndex(item => item === filteredList[filteredIndex]);
    setInputValue(list[originalIndex].title);
    setTagValue((list[originalIndex].tags || []).join(', '));
    setSelectedTaskIndex(originalIndex);
  };

  const handleDelete = (filteredIndex) => {
    const originalIndex = list.findIndex(item => item === filteredList[filteredIndex]);
    setList(prevList => {
      const temp = prevList.filter((_, itemI) => itemI !== originalIndex);
      return temp;
    });
    toast.show({
      title: "Task Deleted",
      status: "success"
    });
  };


  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      setList([]);
      toast.show({
        title: "Tasks Cleared",
        status: "success"
      });
    } catch (error) {
      console.error("Error clearing Tasks:", error);
      toast.show({
        title: "Error clearing Tasks",
        status: "error"
      });
    }
  };

  const handleStatusChange = (filteredIndex) => {
    const originalIndex = list.findIndex(item => item === filteredList[filteredIndex]);
    setList(prevList => {
      const newList = [...prevList];
      newList[originalIndex].isCompleted = !newList[originalIndex].isCompleted;
      return newList;
    });
  };


  const handleTagChange = tag => {
    setSelectedTag(tag);
  };

  const filteredList = selectedTag
    ? list.filter(item => item.tags && item.tags.includes(selectedTag))
    : list;

  const getUniqueTags = (tasks) => {
    return Array.from(new Set(tasks.flatMap(item => item.tags || []).filter(tag => tag.trim() !== '')));
  };


  return (
    <>
      <Header title="Todo App" />
      <Center flex="1">
        <Box maxW="300" w="100%">
          <Heading mb="2" size="md">
            {dayjs().format('MMMM D, YYYY')}
          </Heading>
          <VStack space={4}>

            <HStack space={2}>
              <Input
                flex={1}
                onChangeText={v => setInputValue(v)}
                value={inputValue}
                placeholder="Add Task"
              />
              <Input
                flex={1}
                onChangeText={v => setTagValue(v)}
                value={tagValue}
                placeholder="Add Tags (comma-separated)"
              />
              <IconButton
                borderRadius="sm"
                variant="solid"
                icon={<Icon as={Feather} name="plus" size="sm" color="warmGray.50" />}
                onPress={() => {
                  const tags = tagValue.split(',').map(tag => tag.trim());
                  addItem(inputValue, tags);
                  setInputValue("");
                  setTagValue("");
                }}
                aria-label="Add Task"
              />
            </HStack>

            <TagFilter selectedTag={selectedTag} handleTagChange={handleTagChange} tags={tags} />

            <TaskList
              list={filteredList}
              handleStatusChange={handleStatusChange}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />

            {list.length > 0 && (
              <Button onPress={clearAsyncStorage} size="sm" colorScheme="danger" mt={2}>
                Clear All Tasks
              </Button>
            )}
          </VStack>
        </Box>
      </Center>
    </>
  );
};

export default Todo;
