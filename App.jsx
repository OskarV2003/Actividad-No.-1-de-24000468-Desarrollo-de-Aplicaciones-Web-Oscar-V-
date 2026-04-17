import React, { useState } from 'react';

const ReactLogo = () => (
  <svg className="logo" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="10" fill="currentColor" />
    <ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(0 50 50)" />
    <ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(60 50 50)" />
    <ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(120 50 50)" />
  </svg>
);

const HamburgerIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goals, setGoals] = useState([
    {
      id: 1,
      name: 'Proyecto de Curso desarrollo web',
      description: 'Elaborar una aplicación web responsiva en la que se pueda llevar control de mis metas y tareas personales',
      dueDate: '31/05/2024'
    },
    {
      id: 2,
      name: 'Terminar de leer libro',
      description: 'Finalizar el libro de react',
      dueDate: '21/05/2024'
    },
    {
      id: 3,
      name: 'Laboratorio #1',
      description: 'Responder al test en el GES correspondiente a la actividad 1',
      dueDate: '20/05/2024'
    },
    {
      id: 4,
      name: 'Examen Parcial #1',
      description: 'Ingresar al GES y responder el test referente a la unidad 1',
      dueDate: '21/05/2024'
    }
  ]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className="app">
      <header className="header">
        <div className="header-left">
          <ReactLogo />
          <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <a href="#" className="nav-link">Tasks</a>
            <a href="#" className="nav-link">Goals</a>
          </nav>
        </div>
        <button className="hamburger" onClick={toggleMenu}>
          <HamburgerIcon />
        </button>
      </header>

      <main className="main-container">
        {/* Mobile Add Button */}
        <button className="mobile-add-btn" onClick={toggleModal}>
          ADD GOAL
        </button>

        {/* Form Section (Desktop or Modal) */}
        <section className={`form-section ${isModalOpen ? 'active' : ''}`}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" placeholder="" />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea placeholder=""></textarea>
          </div>
          <div className="form-group">
            <label>Due Date</label>
            <input type="text" placeholder="" />
          </div>
          <button className="btn-add" onClick={() => isModalOpen && setIsModalOpen(false)}>
            ADD GOAL
          </button>
        </section>

        {/* Modal Overlay for Mobile */}
        {isModalOpen && <div className="modal-overlay" onClick={toggleModal}></div>}

        {/* List Section */}
        <section className="list-section">
          {goals.map((goal) => (
            <div key={goal.id} className="goal-card">
              <div className="card-content">
                <span className="label">Name</span>
                <h3>{goal.name}</h3>
                
                <span className="label">Description</span>
                <p>{goal.description}</p>
                
                <div className="due-date">Due Date: {goal.dueDate}</div>
              </div>
              <button className="btn-remove">Remove</button>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
