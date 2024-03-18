// Importing required modules
'use client'
import { useEffect, useState } from 'react';
import * as d3 from 'd3';

const Graph = () => {
    // State variables to manage the graph data and animation
    const [currentValue, setCurrentValue] = useState(0); // State variable for current value of animation
    const [fetchedValue, setFetchedValue] = useState(0); // State variable for fetched random value
    const [winningPercentage, setWinningPercentage] = useState(null); // State variable for winning percentage
    const [reachedMax, setReachedMax] = useState(false); // State variable indicating if maximum value is reached
    const [countdown, setCountdown] = useState(10); // State variable for countdown

    // Effect to fetch a random value when component mounts
    useEffect(() => {
        const fetchRandomValue = async () => {
            const randomValue = Math.random() * 10;
            setFetchedValue(randomValue);
        };
        fetchRandomValue();
    }, []);

    // Effect to update the graph animation based on the fetched value
    useEffect(() => {
        const interval = setInterval(() => {
            if (currentValue < fetchedValue && !winningPercentage) {
                setCurrentValue((prev) => Math.min(prev + 0.01, fetchedValue));
            } else if (currentValue === fetchedValue && !winningPercentage && !reachedMax) {
                setTimeout(() => {
                    setReachedMax(true);
                    setCountdown(10); // Reset the countdown
                }, 10);
                setWinningPercentage(fetchedValue);
            } else if (reachedMax && currentValue < 10) {
                setCurrentValue((prev) => Math.min(prev + 0.05, 10));
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
                window.location.reload(); // Reload the page once countdown reaches 0
            }
        }

        return () => clearInterval(timeoutInterval);
    }, [reachedMax, countdown]);

    // Effect to update the D3 graph
    useEffect(() => {
        const svg = d3.select('#graph-svg'); // Selecting the SVG element
        const xScale = d3.scaleLinear().domain([0, 10]).range([50, 550]); // Setting x-axis scale
        const yScale = d3.scaleLinear().domain([0, 10]).range([550, 50]); // Setting y-axis scale
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
                .on('end', () => {
                    if (reachedMax) {
                        // Reload the page after 10 seconds
                        setTimeout(() => {
                            window.location.reload();
                        }, 10000);
                    }
                });

            // Appending the blue line representing the projectile motion
            svg.append('path')
                .datum(data)
                .attr('class', 'blue-line')
                .attr('d', d3.line()
                    .x(d => xScale(d.x))
                    .y(d => yScale(d.y)))
                .attr('stroke', 'blue')
                .attr('stroke-width', 5)
                .attr('fill', 'none')
                .transition()
                .duration(duration);

            // Appending the orange dot representing the current value
            svg.append('circle')
                .attr('class', 'orange-dot')
                .attr('cx', xScale(currentValue))
                .attr('cy', yScale(projectileMotion(currentValue)))
                .attr('r', 5)
                .attr('fill', 'orange')
                .transition()
                .duration(duration)
                .attr('cx', reachedMax ? xScale(fetchedValue) : xScale(currentValue))
                .attr('cy', reachedMax ? yScale(projectileMotion(fetchedValue)) : yScale(projectileMotion(currentValue)));

            // Appending the airplane image
            svg.append('image')
                .attr('class', 'plane')
                .attr('x', xScale(currentValue) - 30)
                .attr('y', yScale(projectileMotion(currentValue)) - 30)
                .attr('width', 60)
                .attr('height', 60)
                .attr('href', '/p.png')
                .transition()
                .duration(duration)
                .attr('x', xScale(currentValue) - 30)
                .attr('y', yScale(projectileMotion(currentValue)) - 30);

            // Appending the axis labels
            for (let i = 0; i <= 10; i++) {
                svg.append('text')
                    .attr('x', xScale(i))
                    .attr('y', 570)
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

            // Updating the current value display
            d3.select('#current-value')
                .text(winningPercentage !== null ? winningPercentage.toFixed(2) : currentValue.toFixed(2))
                .style('font-weight', reachedMax ? 'bold' : 'bold')
                .style('color', winningPercentage !== null ? 'red' : 'white')
                .style('position', 'absolute')
                .style('left', `${xScale(5)}px`)
                .style('top', `${yScale(8)}px`)
                .style('fontSize', '125%')
                .style('animation', 'popInOut 1s infinite');

            // Updating the countdown display
            if (reachedMax) {
                d3.select('#countdown')
                    .text(`New Game Begins in : ${countdown}`)
                    .style('position', 'absolute')
                    .style('left', `${xScale(5)}px`)
                    .style('top', `${yScale(6)}px`)
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
        <div style={{ position: 'relative' }}>
            <svg id="graph-svg" width="600" height="600" style={{ backgroundImage: 'url(/Background.gif)', backgroundSize: 'cover' }}></svg>
            <div id="current-value" style={{ textAlign: 'center', fontSize: '200%', zIndex: 1 }}></div>
            {reachedMax && <div id="countdown" style={{ zIndex: 1 }}></div>}
        </div>
    );
};

export default Graph;