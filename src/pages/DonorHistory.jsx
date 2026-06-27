import React, { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import SearchBar from '../components/common/SearchBar'
import DataTable from '../components/common/DataTable'
import Pagination from '../components/common/Pagination'
import { useTheme } from '../context/ThemeContext'

const donorRecords = [
  { id: 1, name: 'Aarav Sharma', bloodGroup: 'O+', email: 'aarav@example.com', phone: '9876543210', status: 'Available', location: 'Delhi', date: '2025-03-10' },
  { id: 2, name: 'Meera Patel', bloodGroup: 'A+', email: 'meera@example.com', phone: '9123456780', status: 'Completed', location: 'Mumbai', date: '2025-02-14' },
  { id: 3, name: 'Rohan Verma', bloodGroup: 'B-', email: 'rohan@example.com', phone: '9988776655', status: 'Available', location: 'Bengaluru', date: '2025-01-22' },
  { id: 4, name: 'Nisha Rao', bloodGroup: 'AB+', email: 'nisha@example.com', phone: '9871122334', status: 'Pending', location: 'Hyderabad', date: '2025-04-02' },
  { id: 5, name: 'Kabir Singh', bloodGroup: 'O-', email: 'kabir@example.com', phone: '9990011223', status: 'Available', location: 'Chennai', date: '2025-03-27' },
  { id: 6, name: 'Priya Das', bloodGroup: 'A-', email: 'priya@example.com', phone: '9765432109', status: 'Completed', location: 'Kolkata', date: '2025-04-18' },
  { id: 7, name: 'Vikram Joshi', bloodGroup: 'B+', email: 'vikram@example.com', phone: '9812345678', status: 'Pending', location: 'Pune', date: '2025-02-08' },
  { id: 8, name: 'Anjali Menon', bloodGroup: 'AB-', email: 'anjali@example.com', phone: '9654321098', status: 'Available', location: 'Jaipur', date: '2025-05-01' },
  { id: 9, name: 'Sahil Khan', bloodGroup: 'A+', email: 'sahil@example.com', phone: '9001122334', status: 'Completed', location: 'Ahmedabad', date: '2025-01-15' },
  { id: 10, name: 'Divya Iyer', bloodGroup: 'O+', email: 'divya@example.com', phone: '9111223344', status: 'Available', location: 'Lucknow', date: '2025-03-05' },
  { id: 11, name: 'Harsh Gupta', bloodGroup: 'B+', email: 'harsh@example.com', phone: '9054321678', status: 'Pending', location: 'Noida', date: '2025-04-10' },
  { id: 12, name: 'Sneha Nair', bloodGroup: 'A-', email: 'sneha@example.com', phone: '9823456710', status: 'Completed', location: 'Kochi', date: '2025-02-20' }
]

const columns = [
  { title: 'Name', accessor: 'name' },
  { title: 'Blood Group', accessor: 'bloodGroup' },
  { title: 'Email', accessor: 'email' },
  { title: 'Phone', accessor: 'phone' },
  { title: 'Status', accessor: 'status' },
  { title: 'Location', accessor: 'location' },
  { title: 'Date', accessor: 'date' }
]

export default function DonorHistory() {
  const [showSidebar, setShowSidebar] = useState(false)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortKey, setSortKey] = useState('date')
  const [sortDirection, setSortDirection] = useState('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const { theme } = useTheme()

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 400)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, sortKey, sortDirection])

  function toggleSidebar() {
    setShowSidebar((value) => !value)
  }

  function handleSort(key) {
    if (sortKey === key) {
      setSortDirection((value) => (value === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDirection('asc')
    }
  }

  const filteredRecords = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    if (!query) {
      return donorRecords
    }

    return donorRecords.filter((record) =>
      [record.name, record.bloodGroup, record.email, record.phone, record.status, record.location]
        .some((value) => String(value).toLowerCase().includes(query))
    )
  }, [searchTerm])

  const sortedRecords = useMemo(() => {
    const nextRecords = [...filteredRecords]
    nextRecords.sort((first, second) => {
      let comparison = 0
      if (sortKey === 'date') {
        comparison = new Date(first.date) - new Date(second.date)
      } else {
        comparison = String(first[sortKey]).localeCompare(String(second[sortKey]))
      }

      return sortDirection === 'asc' ? comparison : -comparison
    })

    return nextRecords
  }, [filteredRecords, sortDirection, sortKey])

  const totalPages = Math.max(1, Math.ceil(sortedRecords.length / 10))

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * 10
    return sortedRecords.slice(start, start + 10)
  }, [currentPage, sortedRecords])

  return (
    <div className="dashboard-page">
      <Navbar />
      <div className="dashboard-container">
        <aside className="sidebar d-none d-md-block p-3">
          <Sidebar />
        </aside>

        <aside className={`sidebar d-md-none p-3${showSidebar ? ' show' : ''}`}>
          <Sidebar onClose={() => setShowSidebar(false)} />
        </aside>

        <main className="content-area">
          <Topbar onToggleSidebar={toggleSidebar} title="Donor History" />

          <div className="container-fluid px-0" data-theme={theme}>
            <div className="row">
              <div className="col-12">
                <h2 className="mb-3">Donor History</h2>
                <Card title="Donor History Overview">
                  <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3 mb-3">
                    <SearchBar
                      placeholder="Search by name, blood group, email, phone, status or location"
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value)}
                      className="flex-grow-1"
                    />
                    <div className="d-flex flex-wrap gap-2">
                      <Button variant={sortKey === 'name' ? 'primary' : 'outline'} onClick={() => handleSort('name')}>
                        Sort Name {sortKey === 'name' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
                      </Button>
                      <Button variant={sortKey === 'bloodGroup' ? 'primary' : 'outline'} onClick={() => handleSort('bloodGroup')}>
                        Sort Blood Group {sortKey === 'bloodGroup' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
                      </Button>
                      <Button variant={sortKey === 'date' ? 'primary' : 'outline'} onClick={() => handleSort('date')}>
                        Sort Date {sortKey === 'date' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
                      </Button>
                    </div>
                  </div>

                  <DataTable columns={columns} data={paginatedRecords} loading={loading} emptyMessage="No matching records found." />
                  <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
