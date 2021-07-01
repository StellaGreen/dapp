import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Spacer,
  Text,
  Button,

} from "@chakra-ui/react"
import { web3State } from "web3-hooks"
import { useDisclosure, useToast } from "@chakra-ui/react"
import { SmartStringContext } from "../App"
import { useState, useContext } from "react"
import { ethers } from "ethers";

const CreateNFT = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const SMS = useContext(SmartStringContext)
  const [inputValue, setInputValue] = useState('')
  const toast = useToast()
  const [loading, setLoading] = useState(false)

  const handleClickSetStorage = async () => {
    console.log("hello")
    const nft = {
      sentence: inputValue,
      title: inputValue.title,
      editBy: inputValue.editBy,
      linkUrl: inputValue.linkUrl,
      sentenceHash: ethers.utils.id(inputValue),
      timeStamp: new Date().getTime()
    }
    try {
      setLoading(true)
      let tx = await SMS.createNFT(nft, web3State.account)
      await tx.wait()
      toast({
        title: 'You have send your sentence',
        description: `storage is set wiht value: ${inputValue}\nTransaction hash: ${tx.hash}`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    } catch (e) {
      if (e.code === 4001) {
        toast({
          title: 'Transaction signature denied',
          description: e.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Text as="b" fontSize="30" marginTop="4rem" marginBottom="0.5rem">
        Write your sentence on the blockchain !
      </Text>
      <Spacer />

      <Button
        onClick={onOpen}
        isLoading={loading}
        loadingText="Submitting"
        colorScheme="teal"
        variant="solid"
        size="lg"
        mt="5"

      >Finish To Created</Button>


      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInTop"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Definite your CopyRight</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title of your nft</FormLabel>
              <Input
                value={inputValue.title}
                onChange={(e) => setInputValue({ ...inputValue, title: e.target.value })}
                placeholder="Cute Flower"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>How you are</FormLabel>
              <Input
                value={inputValue.editBy}
                onChange={(e) => setInputValue({ ...inputValue, editBy: e.target.value })}
                placeholder="Your Name"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Image url (optional)</FormLabel>
              <Input
                value={inputValue.linkUrl}
                onChange={(e) => setInputValue({ ...inputValue, linkUrl: e.target.value })}
                placeholder="https://www.google.com/your-image.gif"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>

            <Button
              isLoading={loading}
              loadingText="add New nft"
              bg="#553C9A"
              padding="2rem"
              onClick={handleClickSetStorage}
            >
              Create NFT
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateNFT
