import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/common/Card'
import Button from '../components/common/Button'

export default function ServerError() {
  return (
    <div className="bb-center-screen">
      <Card
        title="500 - Internal Server Error"
        className="text-center"
      >
        <div className="py-3">

          <h1
            className="display-1 fw-bold"
            style={{ color: 'var(--danger)' }}
          >
            500
          </h1>

          <h4 className="mb-3">
            Oops! Something went wrong.
          </h4>

          <p className="text-muted mb-4">
            Our server encountered an unexpected error.
            Please try again in a few moments.
          </p>

          <div className="d-flex justify-content-center gap-3 flex-wrap">

            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>

            <Link to="/">
              <Button variant="outline">
                Back to Home
              </Button>
            </Link>

          </div>

        </div>
      </Card>
    </div>
  )
}