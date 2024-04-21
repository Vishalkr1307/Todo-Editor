import {
  Heading,
  Stack,
  HStack,
  FormControl,
  Input,
  FormLabel,
  Button,
  RadioGroup,
  Radio,
  Checkbox,
  CheckboxGroup,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import React, { useEffect, useState, Alert, AlertIcon } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { singleProductData, updateProductData } from "../redux/app/action";

const EditTask = () => {
  const { id } = useParams();
  const { token } = useSelector((store) => store.auth);
  const { singleProduct, error, loading } = useSelector((store) => store.app);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [tags, setTags] = useState([]);
  const [price, setPrice] = useState("");
  const [subTasks, setSubTasks] = useState([]);
  const [subTasksTitle, setSubTasksTitle] = useState("");
  const [checkBox, setCheckBox] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (id && token) {
      dispatch(singleProductData(id, token));
    }
  }, [id, token, dispatch]);

  useEffect(() => {
    if (singleProduct) {
      setTitle(singleProduct.title);
      setPrice(singleProduct.price);
      setDescription(singleProduct.description);
      setTaskStatus(singleProduct.taskStatus);
      setTags(singleProduct.tags);
      setSubTasks(singleProduct.subTasks);
      let data = singleProduct?.subTasks
        ?.filter((item) => item.status)
        .map((item) => item.subTasksTitle);
      setCheckBox(data);
    }
  }, [singleProduct]);
  

  const handleUpdate = (type, value) => {
    if (type === "title") {
      const data = {
        title,
        description,
        price,
      };
      if (id && data && token) {
        dispatch(updateProductData(id, data, token));
      }
    } else if (type === "taskStatus") {
      const data = {
        taskStatus: value,
      };
      dispatch(updateProductData(id, data, token));
    } else if (type === "tags") {
      const data = {
        tags: value,
      };
      dispatch(updateProductData(id, data, token));
    } else if (type === "subTasks") {
      let newSubTasks = [
        ...subTasks,
        { subTasksTitle: subTasksTitle, status: false },
      ];
      dispatch(updateProductData(id, { subTasks: newSubTasks }, token));
    } else if (type === "checkbox") {
      let updateData = subTasks.map((item) => {
        if (value.includes(item.subTasksTitle)) {
          return { ...item, status: true };
        } else {
          return { ...item, status: false };
        }
      });
      dispatch(updateProductData(id, { subTasks: updateData }, token));
    }
    else if(type==="delete"){
        let newAry=subTasks.filter((item)=>item.subTasksTitle!==value)
        dispatch(updateProductData(id, { subTasks: newAry }, token));

    }
  };

  return (
    <Stack justify={"center"} align={"center"}>
      <HStack width={"80%"}>
        <Stack
          border={"1px solid red"}
          width={"40%"}
          height={"100vh"}
          px={6}
          py={4}
        >
          <Stack>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                defaultValue={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                defaultValue={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Price</FormLabel>
              <Input
                type="text"
                defaultValue={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </FormControl>
            <Button colorScheme="teal" onClick={() => handleUpdate("title")}>
              Update Date
            </Button>
            <FormControl>
              <FormLabel>Task Status</FormLabel>
              <RadioGroup
                value={taskStatus}
                onChange={(val) => handleUpdate("taskStatus", val)}
              >
                <Stack>
                  <Radio value="todo">Todo</Radio>
                  <Radio value="in-progress">In-Progress</Radio>
                  <Radio value="done">Done</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Tags</FormLabel>
              <CheckboxGroup
                value={tags}
                onChange={(val) => handleUpdate("tags", val)}
              >
                <Stack>
                  <Checkbox value={"personal"}>Personal</Checkbox>
                  <Checkbox value={"offical"}>Offical</Checkbox>
                  <Checkbox value={"other"}>Other</Checkbox>
                </Stack>
              </CheckboxGroup>
            </FormControl>
          </Stack>
        </Stack>
        <Stack border={"1px solid red"} width={"40%"} height={"100vh"}>
          <Stack spacing={4} px={6} py={4}>
            <FormControl>
              <FormLabel>Add SubTask</FormLabel>
              <Input
                type="text"
                onChange={(e) => setSubTasksTitle(e.target.value)}
              />
            </FormControl>
            <Button colorScheme="teal" onClick={() => handleUpdate("subTasks")}>
              Add-SubTask
            </Button>
            <CheckboxGroup
              value={checkBox}
              onChange={(val) => handleUpdate("checkbox", val)}
            >
              <Stack>
                {loading && (
                  <Alert>
                    <AlertIcon />
                    loading.......
                  </Alert>
                )}
                {subTasks?.length > 0 &&
                  subTasks?.map((item, ind) => (
                    <HStack key={ind} justify={"space-between"}>
                      <Checkbox value={item.subTasksTitle}>
                        {item.subTasksTitle}
                      </Checkbox>
                      <IconButton
                        icon={<DeleteIcon />}
                        onClick={() =>
                          handleUpdate("delete", item.subTasksTitle)
                        }
                      />
                    </HStack>
                  ))}
              </Stack>
            </CheckboxGroup>
          </Stack>
        </Stack>
      </HStack>
    </Stack>
  );
};

export default EditTask;
