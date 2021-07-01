import "./App.css";
import React from "react";
import Dapp from "./Dapp";
import { useContract } from "web3-hooks";
import { SmartStringAddress, SmartStringAbi } from "./contracts/SmartString";
import { Box } from "@chakra-ui/react";

export const SmartStringContext = React.createContext(null);

function App() {
  const SMS = useContract(SmartStringAddress, SmartStringAbi);

  return (
    <SmartStringContext.Provider value={SMS}>
      <Box position="fixed" top="0" w="100%" minHeight="100vh" bg="#2A4365" m={0}>
        <Dapp />
        </Box>
    </SmartStringContext.Provider>
  );
}

export default App;