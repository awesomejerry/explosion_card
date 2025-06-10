import { useState } from 'react'
import './GiftPage.css'

const sampleData = [
  { text: 'Happy Birthday!', image: 'https://via.placeholder.com/300x200?text=Image+1' },
  { text: 'Wishing you joy!', image: 'https://via.placeholder.com/300x200?text=Image+2' },
  { text: 'Many happy returns!', image: 'https://via.placeholder.com/300x200?text=Image+3' },
]

export default function GiftPage() {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  const next = () => setIndex((i) => (i + 1) % sampleData.length)
  const prev = () => setIndex((i) => (i - 1 + sampleData.length) % sampleData.length)

  const handleTouch = {
    startX: 0,
    onTouchStart(e) {
      this.startX = e.touches[0].clientX
    },
    onTouchEnd(e) {
      const endX = e.changedTouches[0].clientX
      if (endX - this.startX > 50) prev()
      else if (this.startX - endX > 50) next()
    },
  }

  return (
    <div className="gift-page" {...handleTouch}>
      {!open ? (
        <div className="gift-box" onClick={() => setOpen(true)}>
          <div className="lid" />
          <div className="box" />
        </div>
      ) : (
        <div className="content">
          <img src={sampleData[index].image} alt={sampleData[index].text} />
          <p>{sampleData[index].text}</p>
          <div className="nav">
            <button onClick={prev}>Prev</button>
            <button onClick={next}>Next</button>
          </div>
        </div>
      )}
    </div>
  )
}
