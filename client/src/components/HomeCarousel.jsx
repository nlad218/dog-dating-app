import mainPagePortrait1 from "../assets/mainPagePortrait.jpg";
import mainPagePortrait2 from "../assets/mainPagePortrait2.jpg"
import chatPageScreenShot from "../assets/chatPageScreenShot.jpg"
import profilePage from "../assets/profilePage.jpg"
export default function HomeCarousel() {
    
    return (
        <>
        <div className="carousel h-96">
  <div id="slide1" className="carousel-item relative w-full flex justify-center">
    <img src={mainPagePortrait1} className="w-auto" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide4" className="btn btn-circle">❮</a> 
      <a href="#slide2" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide2" className="carousel-item relative w-full flex justify-center">
    <img src={mainPagePortrait2} className="w-auto" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide1" className="btn btn-circle">❮</a> 
      <a href="#slide3" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide3" className="carousel-item relative w-full flex justify-center">
    <img src= {chatPageScreenShot} className="w-auto" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide2" className="btn btn-circle">❮</a> 
      <a href="#slide4" className="btn btn-circle">❯</a>
    </div>
  </div>
  <div id="slide4" className="carousel-item relative w-full flex justify-center">
    <img src= {profilePage} className="w-auto" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide3" className="btn btn-circle">❮</a> 
      <a href="#slide1" className="btn btn-circle">❯</a>
    </div>
  </div>  
</div>
</>
    )
}