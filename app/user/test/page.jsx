"use client"


import { useEffect } from 'react';

const FlyingPlane = () => {
  useEffect(() => {
    const plane = document.getElementById('plane');
    const startingLine = document.getElementById('starting-line');

    // Initial positions
    let posX = 0;
    let posY = startingLine.getBoundingClientRect().bottom; // Start from the bottom line

    // Function to update the plane position
    function updatePosition() {
      plane.style.transform = `translate(${posX}px, ${posY}px)`;
    }

    // Function to animate the plane
    function flyPlane() {
      // Update positions
      posX += 2; // Adjust the horizontal speed as needed
      posY -= 1; // Move upwards by decrementing posY
      updatePosition();

      // Request the next frame
      requestAnimationFrame(flyPlane);
    }

    // Start the animation
    flyPlane();
  }, []);

  return (
    <div className="container">
      <style jsx>{`
        .container {
          position: relative;
          width: 100%;
          height: 100vh;
        }

        #plane {
          position: absolute;
          transition: transform 6s linear;
          width: 150px;
        }

        #starting-line {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 2px;
          background-color: red;
        }
      `}</style>
      <img id="plane" src="https://img.freepik.com/free-vector/3d-plane-flight-isolated-mockup-realistic-jet_107791-20516.jpg?w=2000&t=st=1708429223~exp=1708429823~hmac=86f55895540af997c870057e08836efc65c0b7a6949733ff6b77219f8d5d4c96" alt="Flying Plane" />
      <div id="starting-line"></div>
    </div>
  );
};

export default FlyingPlane;




