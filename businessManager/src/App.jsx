
import { useEffect } from "react"
import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import About from "./components/About"
import AddCard from "./components/AddCard"
import Cards from "./components/Cards"
import EditMyCard from "./components/EditMyCard"
import ErrorPage from "./components/ErrorPage"
import Footer from "./components/Footer"
import Home from "./components/Home"
import Loader from "./components/Loader"
import Login from "./components/Login"
import { MyCards } from "./components/MyCards"
import NavBar from "./components/NavBar"
import SignUp from "./components/SignUp"
import ShowMobileNavContext from "./contexts/showMobileNavContext"
import SpinnerContext from "./contexts/spinnerContext"
import UserContext from "./contexts/userContext"
import { getUser } from "./data/data"




function App() {
  //state variables for context
  const [spinner, setSpinner] = useState(false)
  const [user, setUser] = useState({
    userName: 'Guest',
    isBusinessAccount: false
  })
  const [showMobileNav, setShowMobileNav] = useState(false)
  //when the app is being app the first time (or when the user is refreshing the page) understand if the user is logged in and if he is a business account and change the user context
  useEffect(() => {
    getUser().then(res => {
      if (res.ok) {
        return res.json()
      }
    }).then(loggedInUser => {
      setUser({ ...user, userName: loggedInUser.name, isBusinessAccount: loggedInUser.isBusinessAccount })
    })

  }, [])

  return (<>
    <UserContext.Provider value={[user, setUser]}>
      <SpinnerContext.Provider value={[spinner, setSpinner]}>
        <ShowMobileNavContext.Provider value={[showMobileNav, setShowMobileNav]}>

          <BrowserRouter>
            <div id="fixedHeading">

              <h1 id="userGreeting">Hello, {user.userName}!</h1>
              <NavBar />
            </div>
            <Routes>
              <Route path="/">
                <Route index element={<Home />}></Route>
                <Route path="about" element={<About />}></Route>
                <Route path="login" element={<Login />}></Route>
                <Route path="signup/:status" element={<SignUp />}></Route>
                <Route path="cards" element={<Cards />}></Route>
                <Route path="addNewCard" element={<AddCard />}></Route>
                <Route path="myCards" element={<MyCards />}></Route>
                <Route path="editmycard/:id" element={<EditMyCard />}></Route>
                <Route path="*" element={<ErrorPage />}></Route>
              </Route>
            </Routes>
            <Footer />
          </BrowserRouter>
        </ShowMobileNavContext.Provider>
      </SpinnerContext.Provider>
    </UserContext.Provider>
  </>)

}

export default App
