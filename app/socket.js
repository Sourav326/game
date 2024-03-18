'use client'
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
//------------user ID check out----------------//
import axios from "axios"
import { toast } from "sonner";

let socket = io('http://localhost:8002');
//----------------------Main Logic of Updated Number-----------------------//

const FlyingPlane = (isPlaneFlying) => {

    const plane = document.getElementById('plane');
    if (!plane) return;
    // console.log("error", document.getElementById('plane'))

    // console.log("error", plane)
    let posX = 0;
    let posY = 0;
    const speedX = 2;
    const speedY = 1;
    // const fastSpeedMultiplier = 10;
    // const initialPosY = start_plane.innerHeight - plane.offsetHeight;
    function updatePosition() {
        plane.style.transform = `translate(${posX}px, ${posY}px)`;
    }

    function flyPlane() {
        console.log("problem")
        const planeCashSound = document.getElementById("GameSound2");
        socket.on("false", () => {
            planeCashSound.play();
            posX += speedX * 10; // Increase the speed
            posY -= speedY * 5;


        });
        if (isPlaneFlying) {
            console.log("flying plane is true..", isPlaneFlying)
            posX += speedX;
            posY -= speedY;

        }
        else {
            console.log("flying plane is false..", isPlaneFlying)

        }

        // stop the plane and start again initially position and show in bottom?again
        updatePosition();
        // requestAnimationFrame(flyPlane);
        requestAnimationFrame(() => flyPlane(isPlaneFlying));
    }

    flyPlane(); // Start the animation

    // Cleanup function for unmounting
    return () => cancelAnimationFrame(flyPlane);
};


export const UpdateNumberComponent = () => {
    const [updateNumber, setUpdateNumber] = useState(0);
    const [isPlaneFlying, setIsPlaneFlying] = useState(false);
    const [waitingForNext, setWaitingForNext] = useState(false);
   

    useEffect(() => {
        const backGroundSound = document.getElementById("GameSound1");

        socket.on('updateNumber', (number) => {
            setUpdateNumber(number);
            setWaitingForNext(false);

            if (number === 0) {
                setIsPlaneFlying(false);
            } else {
                setIsPlaneFlying(true);

            }

            backGroundSound.play();

        });
        //when the plane is not flying logic.....
        socket.on("false", () => {
           
            setTimeout(() => {
                // planeCashSound.play();
                setIsPlaneFlying(false);
                setUpdateNumber(0);
                console.log("the plane is STOP....", updateNumber)
                FlyingPlane(isPlaneFlying);
            }, 2000)

            setTimeout(() => {
                console.log("the plane is waiting....")
                // setIsPlaneFlying(false);
                setWaitingForNext(true);
            }, 5000);
            backGroundSound.pause();
        });


        return () => {
            // Cleanup function
            backGroundSound.pause();
            // console.log("Component Unmounted");
        };
    }, []);

    useEffect(() => {
        if (isPlaneFlying) {
            FlyingPlane(isPlaneFlying); // Start or restart the flying animation
        }
    }, [isPlaneFlying]);



    return (
        <>
            <div className="border rounded-xl h-64 md:h-[36rem] w-full bg-[#2e2e2eab] overflow-hidden relative">
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

                {isPlaneFlying ?
                    <img id="plane" src="/p.png" className="absolute bottom-3 left-0 z-10 w-24 md:w-36" />
                    :
                    <img src="/p.png" className="absolute bottom-3 left-0 z-10 w-24 md:w-36" />
                }
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="text-white text-center font-bold">
                        {isPlaneFlying ? (
                            <h1 className="text-7xl">{updateNumber}x</h1>
                        ) : (
                            <>
                                {waitingForNext ? (
                                    <>
                                        <div className='flex flex-col justify-center items-center gap-2'>
                                            <img src="/loader.webp" className='animate-spin relative z-10 w-[100px]' />
                                            <h1 className='text-white text-3xl font-bold uppercase relative z-20'>Waiting for next Round</h1>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <h1 className='text-2xl uppercase'>Flew Away!</h1>
                                        <h1 className="text-7xl text-red-500">{updateNumber}x</h1>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>
                <img src="/bg-rotate-old.svg" className="absolute h-[1000px] max-w-[1000px] md:h-[3000px] md:max-w-[3000px] -left-[129%] -top-[94%] md:-top-[161%] animate-spin-slow z-1" />
            </div>
            <div className="rounded-xl h-48 flex gap-3">
                <div className="rounded-xl border w-full h-full">
                    <div className='h-full flex justify-center items-center'>
                        {isPlaneFlying ? (
                            <BetInput />
                            // <button className='text-white bg-[#ffa900] py-4 px-10 rounded' onClick={handleUseClientClickUpdate}>CASHOUT</button>
                        ) : (
                                <button className='text-white bg-[#28a909] py-4 px-10 rounded' onClick={handleUseClientClick}>BET</button>
                        )}
                    </div>
                </div>
                <div className="rounded-xl border h-full w-full">
                    <div className='h-full flex justify-center items-center'>
                        <button className='text-white bg-[#28a909] py-4 px-10 rounded'>BET</button>
                    </div>
                </div>
            </div>
            <audio id="GameSound1" src="/background.mp3" preload="auto" loop></audio>
            <audio id="GameSound2" src="/plane-crash.mp3" preload="auto"></audio>
        </>
    );
};



// export const UpdateNumberComponent = () => {
//     const [updateNumber, setUpdateNumber] = useState(0);
//     const [isPlaneFlying, setIsPlaneFlying] = useState(false);
//     const [waitingForNext, setWaitingForNext] = useState(false);
//     const planeRef = useRef(null); // Creating a ref for the plane element

//     useEffect(() => {
//         const socket = io('http://localhost:8002');

//         const backGroundSound = document.getElementById("GameSound1");
//         const planeCashSound = document.getElementById("GameSound2");

//         socket.on('updateNumber', (number) => {
//             setWaitingForNext(false);
//             setUpdateNumber(number);
//             setIsPlaneFlying(true);
//             backGroundSound.play();

//             if (number === 0) {
//                 console.log("Waiting...");
//             }

//             if (number > 0) {
//                 console.log("Flying..", number);
//             }
//         });

//         socket.on("false", () => {
//             planeCashSound.play();
//             setIsPlaneFlying(false);
//             setTimeout(() => {
//                 setWaitingForNext(true);
//             }, 5000);
//             backGroundSound.pause();
//         });

//         return () => {
//             backGroundSound.pause();
//             console.log("Component Unmounted");
//         };
//     }, []);


//     useEffect(() => {
//         const plane = planeRef.current; // Accessing the DOM element using the ref
//         if (plane) {
//             flyPlane();
//         }
//     }, [isPlaneFlying]);

//     function flyPlane() {
//         let posX = 0;
//         let posY = 0;
//         const speedX = 2;
//         const speedY = 1;

//         function updatePosition() {
//             const plane = planeRef.current;
//             if (plane) {
//                 plane.style.transform = `translate(${posX}px, ${posY}px)`;
//             }
//         }

//         function animate() {
//             if (isPlaneFlying) {
//                 posX += speedX;
//                 posY -= speedY;
//             } else {
//                 posX += speedX * 20;
//                 posY -= speedY * 10;
//             }
//             updatePosition();
//             requestAnimationFrame(animate);
//         }

//         animate();
//     }

//     return (
//         <>
//             <div className="border rounded-xl h-64 md:h-[36rem] w-full bg-[#2e2e2eab] overflow-hidden relative">
//                 <style jsx>{`
//                     .container {
//                         position: relative;
//                         width: 100%;
//                         height: 100vh;
//                     }

//                     #plane {
//                         position: absolute;
//                         transition: transform 6s linear;
//                         width: 150px;
//                     }

//                     #starting-line {
//                         position: absolute;
//                         bottom: 0;
//                         width: 100%;
//                         height: 2px;
//                         background-color: red;
//                     }
//                 `}</style>

//                 {isPlaneFlying ?
//                     <img ref={planeRef} id="plane" src="/p.png" className="absolute bottom-3 left-0 z-10 w-24 md:w-36" />
//                     :
//                     <img src="/p.png" className="absolute bottom-3 left-0 z-10 w-24 md:w-36" />
//                 }
//                 <div className="absolute inset-0 flex items-center justify-center z-10">
//                     <div className="text-white text-center font-bold">
//                         {isPlaneFlying ? (
//                             <h1 className="text-7xl">{updateNumber}x</h1>
//                         ) : (
//                             <>
//                                 {waitingForNext ? (
//                                     <>
//                                         <div className='flex flex-col justify-center items-center gap-2'>
//                                             <img src="/loader.webp" className='animate-spin relative z-10 w-[100px]' />
//                                             <h1 className='text-white text-3xl font-bold uppercase relative z-20'>Waiting for next Round</h1>
//                                         </div>
//                                     </>
//                                 ) : (
//                                     <>
//                                         <h1 className='text-2xl uppercase'>Flew Away!</h1>
//                                         <h1 className="text-7xl text-red-500">{updateNumber}x</h1>
//                                     </>
//                                 )}
//                             </>
//                         )}
//                     </div>
//                 </div>
//                 <img src="/bg-rotate-old.svg" className="absolute h-[1000px] max-w-[1000px] md:h-[3000px] md:max-w-[3000px] -left-[129%] -top-[94%] md:-top-[161%] animate-spin-slow z-1" />
//             </div>
//             <div className="rounded-xl h-48 flex gap-3">
//                 <div className="rounded-xl border w-full h-full">
//                     <div className='h-full flex justify-center items-center'>
//                         {isPlaneFlying ? (
//                             <button className='text-white bg-[#ffa900] py-4 px-10 rounded'>CASHOUT</button>
//                         ) : (
//                             <button className='text-white bg-[#28a909] py-4 px-10 rounded'>BET</button>
//                         )}
//                     </div>
//                 </div>
//                 <div className="rounded-xl border h-full w-full">
//                     <div className='h-full flex justify-center items-center'>
//                         <button className='text-white bg-[#28a909] py-4 px-10 rounded'>BET</button>
//                     </div>
//                 </div>
//             </div>
//             <audio id="GameSound1" src="/background.mp3" preload="auto" loop></audio>
//             <audio id="GameSound2" src="/plane-crash.mp3" preload="auto"></audio>
//         </>
//     );
// };



//----------------------------------END------------------------------------//

//-----------------------UserList Logic -----------------------------------//

export const AllUserList = () => {
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        const socket = io('http://localhost:8002');

        // Fetch user data when the component mounts
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("JWTtoken")
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                const response = await axios.get(process.env.NEXT_PUBLIC_API_HOST + '/user/profile');
                const data = await response.data;
                if (data?.success == true) {
                    const user = data.data;
                    console.log(user.wallet);
                    socket.emit('userData', { userId: user._id, userName: user.name, userWallet: user.wallet });
                } else {
                    toast.error(data?.message);
                }
            } catch (error) {
                toast.warning(error?.message);
            }
        };

        fetchUserData();

        // Listen for userList and userDisconnected events
        socket.on('userList', (list) => {
            setUserList(list);
            // console.log(list)
        });

        socket.on('userDisconnected', (userId) => {
            setUserList(prevList => prevList.filter(user => user.userId !== userId));
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div className="text-red-500 text-center decoration-8">
            <ul className='flex flex-col gap-[1px] h-screen overflow-scroll'>
                {userList.map((user, index) => (
                    <li className='rounded-3xl bg-neutral-900 text-white text-sm py-[5px]' key={index}>{user.userName} - {user.userWallet}</li>
                ))}
            </ul>
        </div>
    );
};

//-------------------------------------END -----------------------------------//

//------------------------ API for deduction amount---------------------------//
 const BetInput = () => {
    const [betAmount, setBetAmount] = useState(""); 

    // Function to handle input change
    const handleInputChange = (event) => {
        setBetAmount(event.target.value);
    };

    return (
        <div>
            <input
                type="number"
                value={betAmount}
                onChange={handleInputChange}
                placeholder="Enter bet amount"
            />
            <button className='text-white bg-[#28a909] py-4 px-10 rounded' onClick={() => handleUseClientClick(betAmount)}>BET</button>
        </div>
    );
};
// Function to handle the API call for bet
export const handleUseClientClick = async (betAmount) => {
    try {
        const response = await makeAPICall(betAmount);
        const data = response.data;
        if (data.success) {
            toast.success("Amount deducted successfully.");
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        toast.warning(error.message);
    }
};

const makeAPICall = async (amount) => {
    const token = localStorage.getItem("JWTtoken");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  // Replace 
    const gameID = "999";

    // Make the API call
    return await axios.post(process.env.NEXT_PUBLIC_API_HOST + '/bettings', {
      
        gameID,
        amount
    });
};

// Function to handle the API call for cancel
export const handleUseClientClickUpdate = async () => {
    try {
        const response = await makeAPICallUpdate();
        const data = response.data;
        if (data.success) {
            toast.success("Amount updated successfully.");
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        toast.warning(error.message);
    }
};

const makeAPICallUpdate = async () => {
    const token = localStorage.getItem("JWTtoken");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // Replace 
    const id = '65d349da6dbb94bc1a7d88e9'

    const winAmount = 100;

    // Make the API call
    return await axios.put(process.env.NEXT_PUBLIC_API_HOST + `/bettings/${id}`, {
        winAmount
    });
};
//----------------------------------- END-------------------------------------//
