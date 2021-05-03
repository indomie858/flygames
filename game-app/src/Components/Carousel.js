import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Spinner from "../Components/Spinner";

export const StyledCarousel = styled.div`
    max-width: 1280px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    .carousel-flex {
        flex-flow: row nowrap;
        display: flex; 
        transition: all 0.75s ease-in;
        justify-content: center;
    }

    img {
        max-width: 100%;
    }

    .button-styled {
        z-index: 1;
        top: calc(50% - 26px);
        position: absolute;
        box-sizing: border-box;
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
    const numScreenshots = props.screenshots != null ? props.screenshots.length : 0
    
    function initializeXPositions(screenshotWidths) {
        let positions = new Array(props.screenshots.length)
        positions[0] = 0
        for (let i = 1; i < props.screenshots.length; i++) {
            positions[i] = positions[i - 1] + screenshotWidths[i - 1]
        }
        console.log(positions)
        console.log(props.screenshots)
        return positions
    }

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
        // This also sets screenshot widths into an array,
        // so that we can calculate carousel positions.
        let screenshotWidths = props.screenshots == undefined ? 0 : props.screenshots.map(function (screenshot) {
            const img = new Image()
            img.src = getScreenShot720p(screenshot.url)
            return img.width
            }
        )

        // Release the loading spinner
        setLoading(false)
    },[])
        
    //not found image is a public domain placeholder
    return loading ? <Spinner /> : <StyledCarousel>
        <button class="button-styled button-left" onClick={prevScreen}>
            &lt;
        </button>
        <div className="carousel-flex">
            <img src={props.screenshots == undefined ? "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg" : getScreenShot720p(props.screenshots[selectedScreenIndex].url)} />
        </div>
        <button class="button-styled button-right" onClick={nextScreen}>
            &gt;
        </button>
    </StyledCarousel>
}

export default Carousel