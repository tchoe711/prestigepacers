import { useState } from 'react'
import './Rating.css'

function Rating() {
  const [selectedPerson, setSelectedPerson] = useState(null)

  // Sample data - in a real app, this would come from an API
  const people = [
    { id: 1, name: 'John Doe', title: 'Software Engineer', company: 'Tech Corp' },
    { id: 2, name: 'Jane Smith', title: 'Product Manager', company: 'Innovate Inc' },
    { id: 3, name: 'Bob Johnson', title: 'Designer', company: 'Creative Studio' },
  ]

  return (
    <div className="rating">
      <div className="rating-container">
        <h1>Rate People</h1>
        <p className="rating-subtitle">
          Compare professionals and rate them against each other
        </p>
        
        <div className="rating-content">
          <div className="people-list">
            <h2>Select People to Compare</h2>
            <div className="people-grid">
              {people.map((person) => (
                <div
                  key={person.id}
                  className={`person-card ${selectedPerson === person.id ? 'selected' : ''}`}
                  onClick={() => setSelectedPerson(person.id)}
                >
                  <div className="person-avatar">
                    {person.name.charAt(0)}
                  </div>
                  <h3>{person.name}</h3>
                  <p className="person-title">{person.title}</p>
                  <p className="person-company">{person.company}</p>
                </div>
              ))}
            </div>
          </div>

          {selectedPerson && (
            <div className="rating-panel">
              <h2>Rate Selected Person</h2>
              <div className="rating-form">
                <div className="rating-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} className="star-button">
                      ★
                    </button>
                  ))}
                </div>
                <textarea
                  placeholder="Add your rating comment..."
                  className="rating-comment"
                  rows="4"
                />
                <button className="submit-rating">Submit Rating</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Rating

