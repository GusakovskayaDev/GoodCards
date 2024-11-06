import { Box } from "@chakra-ui/react"
import CreatePage from './pages/CreatePage'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
   <Box minH={"100vh"} bg={{ base: "gray.100", _dark: "gray.900" }}>
		<Navbar/>
		<Routes>
			<Route path="/" element={<HomePage/>}/>
			<Route path="/create" element={<CreatePage/>}/>
		</Routes>
	 </Box>
  )
}

export default App
