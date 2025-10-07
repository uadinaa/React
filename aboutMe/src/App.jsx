import {Fragment} from "react";
import FlippingCard from "./FlippingCard.jsx";
import "./Flipping.css"
import "./index.css"
import me from "./assets/me.JPG";
import travel from "./assets/travel.JPG";
import travelMe from "./assets/travelMe.JPG";
import friends from "./assets/friends.JPG";
import girlfriends from "./assets/girlfriends.JPG";


function App() {
    return (
        <div className="about-container">
            <h1>hallo, this is page about me</h1>
            <ul className="team">
                <FlippingCard
                    name="Who am I?"
                    description="My name is Dina, i am 20 y.o., I am from Almaty, graduating from KBTU in 2026. Just trying to do my best"
                    frontImg={me}
                    backImg="https://i.pinimg.com/1200x/86/c6/ab/86c6ab817287f478107fb3b22c867f51.jpg"
                    badgeImg="https://static.vecteezy.com/system/resources/previews/021/916/529/non_2x/pink-flower-isolated-on-a-transparent-background-png.png"
                />
                <FlippingCard
                    name="What i love to do?"
                    description="i love going to concerts, traveling, and of course an ice cream :) This year i was at Weekends and Taylors concerts, that was a boom of emotions and memories for life"
                    frontImg={travel}
                    backImg={travelMe}
                    badgeImg="https://static.vecteezy.com/system/resources/previews/021/916/529/non_2x/pink-flower-isolated-on-a-transparent-background-png.png"
                />
                <FlippingCard
                    name="What do i want?"
                    description="I wanna have a good carrier, rich and educated. To be healthy, wanna do sport more, wanna have a good time w/ my good friends"
                    frontImg={friends}
                    backImg={girlfriends}
                    badgeImg="https://static.vecteezy.com/system/resources/previews/021/916/529/non_2x/pink-flower-isolated-on-a-transparent-background-png.png"
                />
            </ul>
        </div>
    );
}

export default App
