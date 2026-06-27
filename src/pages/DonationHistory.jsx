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

const donationRecords = [
  { id: 1, name: 'Lata Sharma', bloodGroup: 'O+', email: 'lata@example.com', phone: '9876542001', status: 'Completed', location: 'Delhi', date: '2025-03-12' },
  { id: 2, name: 'Nitin Das', bloodGroup: 'A+', email: 'nitin@example.com', phone: '9123452002', status: 'Pending', location: 'Mumbai', date: '2025-02-15' },
  { id: 3, name: 'Ananya Iyer', bloodGroup: 'B-', email: 'ananya@example.com', phone: '9988772003', status: 'Completed', location: 'Bengaluru', date: '2025-01-23' },
  { id: 4, name: 'Sameer Rao', bloodGroup: 'AB+', email: 'sameer@example.com', phone: '9871122004', status: 'Completed', location: 'Hyderabad', date: '2025-04-04' },
  { id: 5, name: 'Pallavi Singh', bloodGroup: 'O-', email: 'pallavi@example.com', phone: '9990012005', status: 'Pending', location: 'Chennai', date: '2025-03-29' },
  { id: 6, name: 'Gaurav Sen', bloodGroup: 'A-', email: 'gaurav@example.com', phone: '9765432006', status: 'Completed', location: 'Kolkata', date: '2025-04-21' },
  { id: 7, name: 'Ritika Chauhan', bloodGroup: 'B+', email: 'ritika@example.com', phone: '9812342007', status: 'Pending', location: 'Pune', date: '2025-02-10' },
  { id: 8, name: 'Omkar Pillai', bloodGroup: 'AB-', email: 'omkar@example.com', phone: '9654322008', status: 'Completed', location: 'Jaipur', date: '2025-05-03' },
  { id: 9, name: 'Neha Goyal', bloodGroup: 'A+', email: 'neha@example.com', phone: '9001122009', status: 'Completed', location: 'Ahmedabad', date: '2025-01-17' },
  { id: 10, name: 'Raghav Bhat', bloodGroup: 'O+', email: 'raghav@example.com', phone: '9111222010', status: 'Pending', location: 'Lucknow', date: '2025-03-07' },
  { id: 11, name: 'Kriti Kapoor', bloodGroup: 'B+', email: 'kriti@example.com', phone: '9054322011', status: 'Completed', location: 'Noida', date: '2025-04-12' },
  { id: 12, name: 'Aditya Rao', bloodGroup: 'A-', email: 'aditya@example.com', phone: '9823452012', status: 'Pending', location: 'Kochi', date: '2025-02-22' }
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

export default function DonationHistory() {
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
      return donationRecords
    }

    return donationRecords.filter((record) =>
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
          <Topbar onToggleSidebar={toggleSidebar} title="Donation History" />

          <div className="container-fluid px-0" data-theme={theme}>
            <div className="row">
              <div className="col-12">
                <h2 className="mb-3">Donation History</h2>
                <Card title="Donation History Overview">
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
