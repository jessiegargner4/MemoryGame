import { useState, useRef } from 'react'
import Form from './components/Form'
import MemoryCard from './components/MemoryCard'

export default function App() {
    
    const [isGameOn, setIsGameOn] = useState(false)

    const [emojisData, setEmojisData] = useState([])
    
    const [flippedCards, setFlippedCards] = useState([])
    
    const [matchedCards, setMatchedCards] = useState([])
    
    const flipTimerRef = useRef(null)

    async function startGame(e) {
        e.preventDefault()
        setIsGameOn(true)
        try {
            const response = await fetch("https://emojihub.yurace.pro/api/all/category/animals-and-nature")
            if (!response.ok) {
                throw new Error("Failed to fetch emojis")
            }
            const data = await response.json()
            
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
    
    function turnCard(emojiData, cardIndex) {
        
        // Check if card is already flipped or matched
        if (flippedCards.includes(cardIndex) || matchedCards.includes(cardIndex)) {
            return; // Don't flip already flipped or matched cards
        }
        
        // Don't allow more than 2 cards to be flipped at once
        if (flippedCards.length >= 2) {
            return; // Exit if 2 cards are already flipped
        }
        
        // Clear any existing timer
        if (flipTimerRef.current) {
            clearTimeout(flipTimerRef.current)
            flipTimerRef.current = null
        }
        
        // Flip the card by adding its index to flippedCards
        const newFlippedCards = [...flippedCards, cardIndex]
        setFlippedCards(newFlippedCards)
        
        // Get the card data and name
        const clickedCardData = emojisData.find(emoji => emoji.htmlCode[0] === emojiData.htmlCode[0]);
        console.log("Clicked card data:", clickedCardData);
        console.log("Card name:", clickedCardData?.name);
        
        // Check if this is the second card flipped
        if (newFlippedCards.length === 2) {
            // Check for match
            const [firstIndex, secondIndex] = newFlippedCards
            const firstCard = emojisData[firstIndex]
            const secondCard = emojisData[secondIndex]
            
            if (firstCard.htmlCode[0] === secondCard.htmlCode[0]) {
                // Match found! Add to matched cards and clear flipped cards
                console.log("Match found!")
                setMatchedCards(prev => [...prev, firstIndex, secondIndex])
                setFlippedCards([])
            } else {
                // No match - flip cards back quickly
                console.log("No match - flipping cards back quickly")
                setTimeout(() => {
                    setFlippedCards([])
                }, 500) // Faster flip back - 0.5 seconds
            }
        }
    } 
    
    return (
        <main>
            <h1>Memory</h1>
            {!isGameOn && <Form handleSubmit={startGame} />}
            {isGameOn && <MemoryCard handleClick={turnCard} data={emojisData} flippedCards={flippedCards} matchedCards={matchedCards} />}
        </main>
    )
}
