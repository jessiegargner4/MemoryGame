import { useState } from 'react'
import Form from './components/Form'
import MemoryCard from './components/MemoryCard'

export default function App() {
    
    const [isGameOn, setIsGameOn] = useState(false)

    const [emojisData, setEmojisData] = useState([])

     /**
     * Challenge 1:
     * 1) Turn startGame into an async function.
     * 2) Use the try...catch syntax and make a fetch request to the emoji API, using this url:         "https://emojihub.yurace.pro/api/all/category/animals-and-nature". Store the response in a      const "response".
     * 3) Check if the response is ok.
     *      a) If yes, store the fetched data in a const "data". Log the data to the console.               Call setIsGameOn(true).
     *      b) If no, throw an error with a custom error message, and inside the catch block, log           the error message to the console.
     * 💡 Hint: Remember the await keyword!
     * ⚠️ Warning: The emojis rendered will still be those from the hardcoded array.
     */

     /**
     * Challenge 2:
     * 1) Create a new state variable, "emojisData", with a corresponding setter function, and initialize it as an empty array.
     * 2) Inside the try block of the startGame function, create a new variable, "dataSample", and set it equal to the first 5 elements from "data".
     * 3) Store the "dataSample" as "emojisData" in state.
     * 4) Log "emojisData" to the console.
     * 
     * 💡 Hint: In step 2, use the JavaScript .slice() method to get the data sample.
     * ⚠️ Warning: We're still rendering our hardcoded emojis.
     */

     /**
     * Challenge 3.1:
     * 1) Pass the "emojisData" as the value of a prop "data" to the MemoryCard component.
     */

     /**
     * Challenge 4:
     * Step 1: Get random emojis from API
     * Step 2: Duplicate unique emojis
     * Step 3: Shuffle emojis data
    */

    console.log("emoji data", emojisData)

    async function startGame(e) {
        e.preventDefault()
        setIsGameOn(true)
        try {
            const response = await fetch("https://emojihub.yurace.pro/api/all/category/animals-and-nature")
            if (!response.ok) {
                throw new Error("Failed to fetch emojis")
            }
            const data = await response.json()
            console.log("Fetched data:", data)
            
            const randomIndices = getRandomIndices(data)
            const dataSample = randomIndices.map(index => data[index])

            const dupSample = [...dataSample, ...dataSample]
            const shuffledEmojis = dupSample.sort(() => Math.random() - 0.5)
            
            setEmojisData(shuffledEmojis)
            setIsGameOn(true)

        } catch (error) {
            console.error(error.message)
        }
    }

    function getRandomIndices(data) {
        const randomIndicesArr = []

        for(let index = 0; index < 5; index++) {
            const randomNum = Math.floor(Math.random() * data.length)
            if(!randomIndicesArr.includes(randomNum)) {
                randomIndicesArr.push(randomNum)
            } else {
                index--;
            }
        }
        return randomIndicesArr;
    }
    
    function turnCard() {
        console.log("Memory card clicked")
    }
    
    return (
        <main>
            <h1>Memory</h1>
            {!isGameOn && <Form handleSubmit={startGame} />}
            {isGameOn && <MemoryCard handleClick={turnCard} data={emojisData}/>}
        </main>
    )
}
