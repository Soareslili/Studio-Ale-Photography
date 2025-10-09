import About from "./components/About"
import { Header } from "./components/Header"
import Hero from "./components/Hero"
import Portfolio from "./components/Portfolio"
import Service from "./components/Service"
import Testimonials from "./components/Testimonials"


function App() {

  return (
    <>
      <Header />
      <Hero />
      <About/>
      <Service/>
      <Portfolio/>
      <Testimonials/>
    </>

  )
}

export default App
