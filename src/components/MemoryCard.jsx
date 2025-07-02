import { decodeEntity } from 'html-entities'

export default function MemoryCard({ handleClick , data}) {

    /**
     * Challenge 3.2:
     * 2) Use the "data" that you're receiving as a prop to render the emojis fetch from the API. Remember that "data" is an array of emoji objects. Log the data to the console to see what property on this object you should render as the button content.
     * 💡 Hint: You know how to decode HTML entities!
     */
    
    const emojiEl = data.map((emoji, index) =>
        <li key={index} className="card-item">
            <button
                className="btn btn--emoji"
                onClick={handleClick}
            >
                {decodeEntity(emoji.htmlCode[0])}
            </button>
        </li>
    )
    
    return <ul className="card-container">{emojiEl}</ul>
}