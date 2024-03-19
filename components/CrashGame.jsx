// Importing required modules
'use client'
import { useEffect, useState } from 'react';
import * as d3 from 'd3';

const CrashGame = () => {
    // State variables to manage the graph data and animation
    const [currentValue, setCurrentValue] = useState(0); // State variable for current value of animation
    const [fetchedValue, setFetchedValue] = useState(0); // State variable for fetched random value
    const [winningPercentage, setWinningPercentage] = useState(null); // State variable for winning percentage
    const [reachedMax, setReachedMax] = useState(false); // State variable indicating if maximum value is reached
    const [countdown, setCountdown] = useState(10); // State variable for countdown
    const [adminValue, setAdminValue] = useState(); // State for adminValue


    // Function to reset state variables to their initial values
    const resetState = () => {
        setCurrentValue(0);
        setWinningPercentage(null);
        setReachedMax(false);
        setCountdown(10);
        fetchRandomValue(); // Fetch a new random value
    };

    // Function to fetch a random value
    const fetchRandomValue = () => {
        // Check if adminValue is provided
        if (typeof adminValue !== 'undefined') {
            setFetchedValue(adminValue);
        } else {
            const randomValue = Math.random() * 10;
            setFetchedValue(randomValue);
        };
    }
    // Effect to fetch a random value when component mounts
    useEffect(() => {
        fetchRandomValue();
    }, []);

    // Effect to update the graph animation based on the fetched value
    useEffect(() => {
        const interval = setInterval(() => {
            if (currentValue < fetchedValue && !winningPercentage) {
                setCurrentValue((prev) => Math.min(prev + 0.02, fetchedValue));
            } else if (currentValue === fetchedValue && !winningPercentage && !reachedMax) {
                setTimeout(() => {
                    setReachedMax(true);
                }, 5000);
                setWinningPercentage(fetchedValue);
            } else if (reachedMax && currentValue < 12) {
                setCurrentValue((prev) => Math.min(prev + 0.05, 12));
            }
        }, 10);

        return () => clearInterval(interval);
    }, [currentValue, fetchedValue, winningPercentage, reachedMax]);

    // Effect to update the countdown when the timeout is taking place
    useEffect(() => {
        let timeoutInterval;
        if (reachedMax) {
            timeoutInterval = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
            if (countdown === 0) {
                clearInterval(timeoutInterval);
                resetState(); // Reset state when countdown reaches 0
            }
        }

        return () => clearInterval(timeoutInterval);
    }, [reachedMax, countdown]);

    // Effect to update the D3 graph
    useEffect(() => {
        const svg = d3.select('#graph-svg'); // Selecting the SVG element
        const xScale = d3.scaleLinear().domain([0, 10]).range([50, window.innerWidth - 50]); // Setting x-axis scale
        const yScale = d3.scaleLinear().domain([0, 10]).range([window.innerHeight - 50, 50]); // Setting y-axis scale
        const duration = 1; // Duration for animation

        // Function to update the graph
        const updateGraph = () => {
            svg.selectAll('*').remove(); // Removing existing elements from SVG

            // Function to calculate the projectile motion curve
            const projectileMotion = (x) => {
                const g = 9.81; // gravitational acceleration (m/s^2)
                const initialVelocity = 10; // initial velocity (m/s)
                const angle = Math.PI / 4; // angle of projection (45 degrees in radians)
                return (g * x * x) / (2 * initialVelocity * initialVelocity * Math.pow(Math.cos(angle), 2));
            };

            // Generating data for the projectile motion curve
            const data = [];
            for (let i = 0; i <= currentValue; i += 0.1) {
                data.push({ x: i, y: projectileMotion(i) });
            }

            // Appending the projectile motion curve
            svg.append("path")
                .datum(data)
                .attr("class", "area")
                .attr("d", d3.area()
                    .x(d => xScale(d.x))
                    .y0(d => yScale(0))
                    .y1(d => yScale(d.y)))
                .attr("fill", "rgba(255, 0, 0, 0.3)") // Semi-transparent light red color
                .transition()
                .duration(duration)

            // Appending the blue line representing the projectile motion
            svg.append('path')
                .datum(data)
                .attr('class', 'blue-line')
                .attr('d', d3.line()
                    .x(d => xScale(d.x))
                    .y(d => yScale(d.y)))
                .attr('stroke', 'red')
                .attr('stroke-width', 5)
                .attr('fill', 'none')
                .transition()
                .duration(duration);

            // Appending the airplane image
            svg.append('image')
                .attr('class', 'plane')
                .attr('x', xScale(currentValue) - 30)
                .attr('y', yScale(projectileMotion(currentValue)) - 30)
                .attr('width', 60)
                .attr('height', 60)
                .attr('href', '/p.gif')
                .transition()
                .duration(duration)
                .attr('x', xScale(currentValue) - 30)
                .attr('y', yScale(projectileMotion(currentValue)) - 30);

            // Appending the axis labels
            for (let i = 0; i <= 10; i++) {
                svg.append('text')
                    .attr('x', xScale(i))
                    .attr('y', window.innerHeight - 30)
                    .attr('text-anchor', 'middle')
                    .attr('fill', 'yellow')
                    .text(i);

                if (i !== 0) {
                    svg.append('text')
                        .attr('x', 50)
                        .attr('y', yScale(i))
                        .attr('text-anchor', 'end')
                        .attr('fill', 'yellow')
                        .text(i);
                }
            }

            // Update the current-value display
            d3.select('#current-value')
                .text(winningPercentage !== null ? winningPercentage.toFixed(2) : currentValue.toFixed(2))
                .style('font-weight', reachedMax ? 'bold' : 'bold')
                .style('color', winningPercentage !== null ? 'red' : 'white')
                .style('position', 'absolute')
                .style('left', '50%') // Position in the middle horizontally
                .style('top', '15%') // Position in the vertically
                .style('transform', 'translate(-50%, -50%)') // Center the text
                .style('fontSize', '125%')
                .style('animation', 'popInOut 1s infinite');

            // Updating the countdown display
            if (reachedMax) {
                d3.select('#countdown')
                    .text(`New Game Begins in : ${countdown}`)
                    .style('position', 'absolute')
                    .style('left', '50%') // Position in the middle horizontally
                    .style('top', '5%') // Position in the vertically
                    .style('transform', 'translate(-50%, -50%)')
                    .style('fontSize', '200%')
                    .style('fontWeight', 'bold')
                    .style('color', 'green');
            }
        };

        // Calling the updateGraph function
        updateGraph();

        // Cleanup function to remove all elements from the SVG
        return () => svg.selectAll('*').remove();
    }, [currentValue, winningPercentage, reachedMax, countdown]);

    // Return the JSX for the graph
    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>

            <svg id="graph-svg" width="100%" height="100%" style={{ backgroundColor: "black", backgroundSize: 'cover' }}></svg>
            <div id="current-value" style={{ textAlign: 'center', fontSize: '200%', zIndex: 1 }}></div>
            {reachedMax && <div id="countdown" style={{ zIndex: 1 }}></div>}
            {reachedMax && <img src="/loading.gif" style={{ position: 'absolute', left: '50%', top: '25%', transform: 'translateX(-50%)', width: '320px', height: '180px' }} alt="Loading" />}
        </div>
    );
};

export default CrashGame;
