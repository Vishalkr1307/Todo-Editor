import { HStack, Heading, Stack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import SideBar from "../component/SideBar";
import TaskStatus from "../component/TaskStatus";
import { useDispatch, useSelector } from "react-redux";
import { getProductData } from "../redux/app/action";

const Home = () => {
  const { loading, error, product, isGet } = useSelector((store) => store.app);
  const { token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (product.length >= 0 && token) {
      dispatch(getProductData(token));
    }
  }, [product, dispatch, token]);
  

  return (
    <HStack>
      <Stack display={{ base: "none", md: "flex" }} width={"20%"}>
        <SideBar product={product} />
      </Stack>
      <HStack>
        <Stack
          border={"2px solid red"}
          width={"25vw"}
          height={"80vh"}
          overflowY={"scroll"}
        >
          <TaskStatus task={product} taskStatus={"todo"} />
        </Stack>
        <Stack
          border={"2px solid red"}
          width={"25vw"}
          height={"80vh"}
          overflowY={"scroll"}
        >
          <TaskStatus task={product} taskStatus={"in-progress"} />
        </Stack>
        <Stack
          border={"2px solid red"}
          width={"25vw"}
          height={"80vh"}
          overflowY={"scroll"}
        >
          <TaskStatus task={product} taskStatus={"done"} />
        </Stack>
      </HStack>
    </HStack>
  );
};

export default Home;
