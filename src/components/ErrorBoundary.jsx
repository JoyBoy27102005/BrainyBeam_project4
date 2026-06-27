import React from 'react'
import Button from './common/Button'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false
    }
  }

  static getDerivedStateFromError() {
    return {
      hasError: true
    }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Application Error:', error)
    console.error(errorInfo)
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{
            minHeight: '100vh',
            padding: '2rem',
            textAlign: 'center'
          }}
        >
          <h1>Something went wrong.</h1>

          <p className="text-muted mb-4">
            An unexpected error occurred while rendering this page.
          </p>

          <Button onClick={this.handleReload}>
            Reload Application
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}