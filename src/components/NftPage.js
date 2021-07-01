import {
    Container,
    Textarea,
    Heading
  } from "@chakra-ui/react"
  import { useState } from "react"
  import CreateHandle from "./CreateNFT"
  
  const NftPage = () => {
    let [inputValue, setValue] = useState({content: "", title: "", editBy: "", linkUrl: ""})
  
    let handleInputChange = (e) => {
      let inputValue = e.target.value
      setValue({...inputValue, content: inputValue})
    }
  
    return (
    <Container centerContent="true" maxW="75%" id="NFT">
        <Heading pb="10">CREATE A COPYRIGHT NFT !</Heading>
          <Textarea 
            value={inputValue.content}
            onChange={handleInputChange}
            placeholder="Here is a sample placeholder"
            size="lg"
            type="flushed"
            height="50vh"
          />
          <CreateHandle value={inputValue} setValue={setValue}/>
    </Container>
    )
  }
  
  export default NftPage
  