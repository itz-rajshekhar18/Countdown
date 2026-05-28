import { useState, useEffect, useRef } from 'react'
import './App.css'
import pstImage from './assests/pst.webp'

interface FlipCardProps {
  value: string
  index: number
}

const FlipCard = ({ value, index }: FlipCardProps) => {
  const [currentValue, setCurrentValue] = useState(value)
  const [nextValue, setNextValue] = useState(value)
  const [isFlipping, setIsFlipping] = useState(false)
  const prevValueRef = useRef(value)

  useEffect(() => {
    if (value !== prevValueRef.current) {
      setNextValue(value)
      setIsFlipping(true)
      
      setTimeout(() => {
        setCurrentValue(value)
        setIsFlipping(false)
        prevValueRef.current = value
      }, 600)
    }
  }, [value])

  return (
    <div 
      className="flip-card"
      style={{
        animationDelay: `${index * 0.1}s`
      }}
    >
      <div className="flip-card-top">
        <span>{currentValue}</span>
      </div>
      
      <div className="flip-card-bottom">
        <span>{currentValue}</span>
      </div>

      {isFlipping && (
        <div className="flip-card-top-flip">
          <span>{currentValue}</span>
        </div>
      )}

      {isFlipping && (
        <div className="flip-card-bottom-flip">
          <span>{nextValue}</span>
        </div>
      )}
    </div>
  )
}

function App() {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  })

  useEffect(() => {
    // Set target date to May 29, 2026 at 1:00 PM
    const targetDate = new Date('2026-05-29T13:00:00')

    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance < 0) {
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' })
        return
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0')
      })
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="countdown-container">
      <div className="logo-container">
        <img src={pstImage} alt="Logo" className="logo-image" />
      </div>

      <div className="countdown-display">
        <div className="time-section" style={{ animationDelay: '0s' }}>
          <div className="flip-group">
            <FlipCard value={timeLeft.days[0]} index={0} />
            <FlipCard value={timeLeft.days[1]} index={1} />
          </div>
          <div className="time-label">Days</div>
        </div>

        <div className="time-separator" style={{ animationDelay: '0.2s' }}>:</div>

        <div className="time-section" style={{ animationDelay: '0.4s' }}>
          <div className="flip-group">
            <FlipCard value={timeLeft.hours[0]} index={2} />
            <FlipCard value={timeLeft.hours[1]} index={3} />
          </div>
          <div className="time-label">Hours</div>
        </div>

        <div className="time-separator" style={{ animationDelay: '0.6s' }}>:</div>

        <div className="time-section" style={{ animationDelay: '0.8s' }}>
          <div className="flip-group">
            <FlipCard value={timeLeft.minutes[0]} index={4} />
            <FlipCard value={timeLeft.minutes[1]} index={5} />
          </div>
          <div className="time-label">Minutes</div>
        </div>

        <div className="time-separator" style={{ animationDelay: '1.0s' }}>:</div>

        <div className="time-section" style={{ animationDelay: '1.2s' }}>
          <div className="flip-group">
            <FlipCard value={timeLeft.seconds[0]} index={6} />
            <FlipCard value={timeLeft.seconds[1]} index={7} />
          </div>
          <div className="time-label">Seconds</div>
        </div>
      </div>

      <div className="surprise-message">
        <p>Join us in cafeteria for a surprise tomorrow</p>
      </div>

      {/* Floating particles */}
      <div className="particles-container">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default App
