import React from "react";

export const HomeCarousel = () => {
return (
    <Carousel fade className="carousel">
{/* //voting */}
 <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://private-user-images.githubusercontent.com/95265085/508472626-7cc3f8c3-dd5c-4dd3-87c0-c61a47d57a25.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjE5NTc3MzYsIm5iZiI6MTc2MTk1NzQzNiwicGF0aCI6Ii85NTI2NTA4NS81MDg0NzI2MjYtN2NjM2Y4YzMtZGQ1Yy00ZGQzLTg3YzAtYzYxYTQ3ZDU3YTI1LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTExMDElMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUxMTAxVDAwMzcxNlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWM3ZmQzMWU1MmZlODk0ZWNmMmE5YmE4OWUzYjRmNDEwMWE0MDEzYmVlOWVhNGJiZWYyN2EwODU0ZDUwNGNjODImWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.N5RsKDtqXL1KTUgwPq09oqSF-_3hUWI4sNOf4gQfczM"
          alt="Vote for contestants"
        />
        <Carousel.Caption>
          <h3>Vote for Your Favorite Contestants</h3>
          <p>Engage in real-time and support your favorite islanders with one click!</p>
        </Carousel.Caption>
      </Carousel.Item>
</Carousel>
);};
