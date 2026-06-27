// Professional 404 Page
import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/common/Card'
import Button from '../components/common/Button'

export default function NotFound() {
  return (
    <div className="bb-center-screen">
      <Card
        title="404 - Page Not Found"
        className="text-center"
      >
        <div className="py-3">

          <h1
            className="display-1 fw-bold"
            style={{ color: 'var(--primary)' }}
          >
            404
          </h1>

          <h4 className="mb-3">
            Oops! We couldn't find that page.
          </h4>

          <p className="text-muted mb-4">
            The page you're looking for may have been moved,
            deleted, or the URL might be incorrect.
          </p>

          <Link to="/">
            <Button>
              Back to Home
            </Button>
          </Link>

        </div>
      </Card>
    </div>
  )
}