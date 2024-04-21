import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const Timer = ({ loginData }) => {
  const expireTime = new Date(loginData.expiredOtp).getTime(); // Convert to milliseconds
  const currentTime = Date.now();
  const difference = expireTime - currentTime;
  
  // Calculate time left only if the expiration time is in the future
  const timeLeft = difference > 0 ? Math.floor(difference / 1000) : 0;

  const [time, setTime] = useState(timeLeft);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            clearInterval(timer);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  return (
    <Box>
      {timeLeft > 0 ? (
        <Text color="red.400">OTP expires in: {time} seconds</Text>
      ) : (
        <Text color="red.400">OTP expired</Text>
      )}
    </Box>
  );
};

export default Timer;
