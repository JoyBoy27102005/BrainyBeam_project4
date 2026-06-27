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

const patientRecords = [
  { id: 1, name: 'Kavya Menon', bloodGroup: 'A+', email: 'kavya@example.com', phone: '9876541001', status: 'Recovered', location: 'Delhi', date: '2025-03-11' },
  { id: 2, name: 'Arjun Rao', bloodGroup: 'B+', email: 'arjun@example.com', phone: '9123451002', status: 'In Treatment', location: 'Mumbai', date: '2025-02-17' },
  { id: 3, name: 'Sana Malik', bloodGroup: 'O+', email: 'sana@example.com', phone: '9988771003', status: 'Recovered', location: 'Bengaluru', date: '2025-01-24' },
  { id: 4, name: 'Deepak Kumar', bloodGroup: 'AB+', email: 'deepak@example.com', phone: '9871121004', status: 'Pending', location: 'Hyderabad', date: '2025-04-03' },
  { id: 5, name: 'Ishita Bose', bloodGroup: 'O-', email: 'ishita@example.com', phone: '9990011005', status: 'Recovered', location: 'Chennai', date: '2025-03-28' },
  { id: 6, name: 'Rajat Bhatia', bloodGroup: 'A-', email: 'rajat@example.com', phone: '9765431006', status: 'In Treatment', location: 'Kolkata', date: '2025-04-20' },
  { id: 7, name: 'Mira Shah', bloodGroup: 'B-', email: 'mira@example.com', phone: '9812341007', status: 'Pending', location: 'Pune', date: '2025-02-09' },
  { id: 8, name: 'Tushar Jain', bloodGroup: 'AB-', email: 'tushar@example.com', phone: '9654321008', status: 'Recovered', location: 'Jaipur', date: '2025-05-02' },
  { id: 9, name: 'Pooja Nanda', bloodGroup: 'A+', email: 'pooja@example.com', phone: '9001121009', status: 'In Treatment', location: 'Ahmedabad', date: '2025-01-16' },
  { id: 10, name: 'Aman Thakur', bloodGroup: 'O+', email: 'aman@example.com', phone: '9111221010', status: 'Recovered', location: 'Lucknow', date: '2025-03-06' },
  { id: 11, name: 'Naina Kapoor', bloodGroup: 'B+', email: 'naina@example.com', phone: '9054321011', status: 'Pending', location: 'Noida', date: '2025-04-11' },
  { id: 12, name: 'Vivek Dutta', bloodGroup: 'A-', email: 'vivek@example.com', phone: '9823451012', status: 'Recovered', location: 'Kochi', date: '2025-02-21' }
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

export default function PatientHistory() {
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
      return patientRecords
    }

    return patientRecords.filter((record) =>
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
          <Topbar onToggleSidebar={toggleSidebar} title="Patient History" />

          <div className="container-fluid px-0" data-theme={theme}>
            <div className="row">
              <div className="col-12">
                <h2 className="mb-3">Patient History</h2>
                <Card title="Patient History Overview">
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
