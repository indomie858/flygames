import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Spinner from "../Components/Spinner";

export const StyledCarousel = styled.div`
    max-width: 1280px;
    margin: 0 auto;
    position: relative;
    .carousel-flex {
        flex-flow: row nowrap;
        display: flex; 
        transition: all 0.75s ease-in;
    }

    .button-styled {
        z-index: 1;
        top: 50%;
        position: absolute;
    }
    .button-left {
        left: 20px;
    }
    .button-right {
        right: 20px;
    }
`

const Carousel = (props) => {
    const [selectedScreenIndex, setSelectedScreenIndex] = useState(0)
    const [loading, setLoading] = useState(true)
    const numScreenshots = props.screenshots.length

    const getScreenShot720p = (imageURL) => {
        const regex = /t_thumb/;
        let originalImageURL = imageURL;
        let newImageURL = originalImageURL.replace(regex, "t_720p");
        return newImageURL;
    }

    function mod(x, y) {
        return ((x % y) + y) % y;
    }

    function nextScreen() {
        setSelectedScreenIndex((selectedScreenIndex + 1) % numScreenshots)
    }

    function prevScreen() {
        setSelectedScreenIndex(
            mod(selectedScreenIndex - 1, numScreenshots)
        )
    }
    

    // This useeffect runs once (similar to componentdidmount)
    useEffect(() => {
        // Preload screenshots as image objects.
        // This forces the browser to load all images and cache them
        // Before user interaction.
        props.screenshots.forEach((screenshot) => {
            const img = new Image();
            img.src = screenshot.url
        })

        // Release the loading spinner
        setLoading(false)
    },[])
        

    return loading ? <Spinner /> : <StyledCarousel>
        <button class="button-styled button-left" onClick={prevScreen}>
            &lt;
        </button>
        <div className="carousel-flex"
            style= { {
                transform: `translate(${-selectedScreenIndex * 1280}px, 0px)`
                }
            }>
            {props.screenshots.map((screenshot) =>
                <img src={getScreenShot720p(screenshot.url)} />)
            }
        </div>
        <button class="button-styled button-right" onClick={nextScreen}>
            &gt;
        </button>
    </StyledCarousel>
}


export default Carousel