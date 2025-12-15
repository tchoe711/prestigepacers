import { useState, useEffect } from 'react'
import './Rating.css'

function Rating() {
  const [person1, setPerson1] = useState(null)
  const [person2, setPerson2] = useState(null)
  const [selectedPerson, setSelectedPerson] = useState(null)
  const [comparisonsCount, setComparisonsCount] = useState(0)

  // Sample data - in a real app, this would come from an API
  const allPeople = [
    { id: 1, name: 'John Doe', title: 'Software Engineer', company: 'Tech Corp', experience: '5 years' },
    { id: 2, name: 'Jane Smith', title: 'Product Manager', company: 'Innovate Inc', experience: '7 years' },
    { id: 3, name: 'Bob Johnson', title: 'Designer', company: 'Creative Studio', experience: '4 years' },
    { id: 4, name: 'Alice Williams', title: 'Data Scientist', company: 'Analytics Pro', experience: '6 years' },
    { id: 5, name: 'Charlie Brown', title: 'Marketing Director', company: 'Brand Co', experience: '8 years' },
    { id: 6, name: 'Diana Prince', title: 'UX Researcher', company: 'Design Lab', experience: '5 years' },
  ]

  // Function to get two random different people
  const getRandomPair = () => {
    const shuffled = [...allPeople].sort(() => 0.5 - Math.random())
    return [shuffled[0], shuffled[1]]
  }

  // Initialize with a random pair
  useEffect(() => {
    const [p1, p2] = getRandomPair()
    setPerson1(p1)
    setPerson2(p2)
    setSelectedPerson(null)
  }, [comparisonsCount])

  const handleSelectPerson = (personId) => {
    if (selectedPerson) return // Already selected
    
    setSelectedPerson(personId)
    
    // In a real app, this would save the comparison to a backend
    setTimeout(() => {
      setComparisonsCount(prev => prev + 1)
    }, 1500) // Show selection for 1.5 seconds before loading next pair
  }

  const handleSkip = () => {
    setComparisonsCount(prev => prev + 1)
  }

  return (
    <div className="rating">
      <div className="rating-container">
        <h1>Compare People</h1>
        <p className="rating-subtitle">
          Select which professional you think is better
        </p>
        
        {person1 && person2 && (
          <div className="comparison-container">
            <div className="comparison-stats">
              <span>Comparisons made: {comparisonsCount}</span>
            </div>

            <div className="comparison-cards">
              <div
                className={`person-comparison-card ${selectedPerson === person1.id ? 'selected winner' : selectedPerson ? 'not-selected' : ''}`}
                onClick={() => handleSelectPerson(person1.id)}
              >
                <div className="person-avatar-large">
                  {person1.name.charAt(0)}
                </div>
                <h2>{person1.name}</h2>
                <p className="person-title">{person1.title}</p>
                <p className="person-company">{person1.company}</p>
                <p className="person-experience">{person1.experience} experience</p>
                {selectedPerson === person1.id && (
                  <div className="selection-badge">✓ Selected</div>
                )}
              </div>

              <div className="vs-divider">
                <span>VS</span>
              </div>

              <div
                className={`person-comparison-card ${selectedPerson === person2.id ? 'selected winner' : selectedPerson ? 'not-selected' : ''}`}
                onClick={() => handleSelectPerson(person2.id)}
              >
                <div className="person-avatar-large">
                  {person2.name.charAt(0)}
                </div>
                <h2>{person2.name}</h2>
                <p className="person-title">{person2.title}</p>
                <p className="person-company">{person2.company}</p>
                <p className="person-experience">{person2.experience} experience</p>
                {selectedPerson === person2.id && (
                  <div className="selection-badge">✓ Selected</div>
                )}
              </div>
            </div>

            {!selectedPerson && (
              <div className="comparison-actions">
                <button className="skip-button" onClick={handleSkip}>
                  Skip this comparison
                </button>
              </div>
            )}

            {selectedPerson && (
              <div className="selection-feedback">
                <p>Thanks for your selection! Loading next comparison...</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Rating

