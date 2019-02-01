import React from 'react';
import { Link } from 'react-router-dom';

import './Page404.css';
import '../navbar.css';

export class Page404 extends React.Component {
  render() {
    return (
      <div className="page404">
        <header>
          <h1>404 Error</h1>
        </header>
        <main className="page404-container">
          <div className="text-container">
            <h2>
              Oh no. Not even we could help you find what you're looking for!
            </h2>
            <Link to="/lists" className="button button--primary">
              Back to Home
            </Link>
          </div>
        </main>
      </div>
    );
  }
}

export default Page404;
