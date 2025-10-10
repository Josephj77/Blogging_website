import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="transparent-header">
        <div className="container header-content">
          <div className="logo">
            <span role="img" aria-label="pen">✨</span> Blogging Website
          </div>
          <nav>
            <ul>
              <li><a href="#home">Home</a></li>
            </ul>
          </nav>
          <div className="auth-buttons">
            <button className="btn btn-login">Login</button>
          </div>
        </div>
      </header>

      <main className="container">
        <section className="hero" id="home">
          <div className="hero-content">
            <h1 className="hero-title">
              Welcome to <span className="highlight">Bloggging Website</span>
            </h1>
            <p className="hero-subtitle">
              Where Ideas Meet Innovation and Stories Come to Life
            </p>
            <p className="hero-description">
              Join our community of passionate writers and readers. Share your thoughts, 
              discover new perspectives, and connect with like-minded individuals from around the world.
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary btn-large">Start Reading</button>
              <button className="btn btn-secondary btn-large">Join Community</button>
            </div>
          </div>
        </section>


        <section className="stats">
          <div className="stats-container">
            <div className="stat-item">
              <div className="stat-number">0</div>
              <div className="stat-label">Active Writers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">0</div>
              <div className="stat-label">Blog Posts</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">0</div>
              <div className="stat-label">Monthly Readers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">0%</div>
              <div className="stat-label">Uptime</div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-content">
          <div className="footer-section">
            <div className="logo">Bloggging Website</div>
            <p>Transforming the way we share and consume content</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; This is My Mini project "Blogging Website"</p>
        </div>
      </footer>
    </div>
  );
}

export default App;