// Small topbar inside dashboard for quick actions
import React, { useState } from 'react'
import Button from './common/Button'
import Input from './common/Input'

export default function Topbar({ onToggleSidebar, title = 'Dashboard' }) {
  const [search, setSearch] = useState('')

  return (
    <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between mb-3 gap-3">
      <div className="d-flex align-items-center gap-2">
        <Button variant="outline" className="d-md-none" onClick={onToggleSidebar} ariaLabel="Toggle sidebar">☰</Button>
        <h5 className="mb-0">{title}</h5>
      </div>
      <Input
        className="bb-topbar-search mb-0"
        placeholder="Search..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        ariaLabel="Search"
      />
    </div>
  )
}
