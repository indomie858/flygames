import styled from "styled-components";

const Rating = (props) => {
    let color = ""
    if (props.rating < 50) {
        color = "red";
    } else if (props.rating < 80) {
        color = "yellow";
    } else {
        color = "green";
    }

    const StyledRating = styled.div`
    border: 4px solid ${color};
    font-weight: bold;
    font-size: 20px;
    width: 100px;
    height: 100px;
    margin: 0 auto;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    `

    
    return <>
        <StyledRating>
            {props.rating}
            <div>/ 100</div>
        </StyledRating>
       <p className="text-center">Aggregated Critic and IMDB Rating</p>
    </>
}


export default Rating;