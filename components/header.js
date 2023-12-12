import { Box, Heading } from "native-base"

const Header = ({ title }) => {
  return (
    <Box bg="blue.500" p={4}>
      <Heading color="white">{title}</Heading>
    </Box>
  )
}

export default Header