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

const inventoryRecords = [
  { id: 1, name: 'Blood Unit 101', bloodGroup: 'O+', email: 'inventory1@example.com', phone: '9876543001', status: 'In Stock', location: 'Delhi', date: '2025-03-13' },
  { id: 2, name: 'Blood Unit 102', bloodGroup: 'A+', email: 'inventory2@example.com', phone: '9123453002', status: 'Reserved', location: 'Mumbai', date: '2025-02-16' },
  { id: 3, name: 'Blood Unit 103', bloodGroup: 'B-', email: 'inventory3@example.com', phone: '9988773003', status: 'In Stock', location: 'Bengaluru', date: '2025-01-25' },
  { id: 4, name: 'Blood Unit 104', bloodGroup: 'AB+', email: 'inventory4@example.com', phone: '9871123004', status: 'Expired', location: 'Hyderabad', date: '2025-04-05' },
  { id: 5, name: 'Blood Unit 105', bloodGroup: 'O-', email: 'inventory5@example.com', phone: '9990013005', status: 'In Stock', location: 'Chennai', date: '2025-03-30' },
  { id: 6, name: 'Blood Unit 106', bloodGroup: 'A-', email: 'inventory6@example.com', phone: '9765433006', status: 'Reserved', location: 'Kolkata', date: '2025-04-22' },
  { id: 7, name: 'Blood Unit 107', bloodGroup: 'B+', email: 'inventory7@example.com', phone: '9812343007', status: 'In Stock', location: 'Pune', date: '2025-02-11' },
  { id: 8, name: 'Blood Unit 108', bloodGroup: 'AB-', email: 'inventory8@example.com', phone: '9654323008', status: 'Expired', location: 'Jaipur', date: '2025-05-04' },
  { id: 9, name: 'Blood Unit 109', bloodGroup: 'A+', email: 'inventory9@example.com', phone: '9001123009', status: 'In Stock', location: 'Ahmedabad', date: '2025-01-18' },
  { id: 10, name: 'Blood Unit 110', bloodGroup: 'O+', email: 'inventory10@example.com', phone: '9111223010', status: 'Reserved', location: 'Lucknow', date: '2025-03-08' },
  { id: 11, name: 'Blood Unit 111', bloodGroup: 'B+', email: 'inventory11@example.com', phone: '9054323011', status: 'In Stock', location: 'Noida', date: '2025-04-13' },
  { id: 12, name: 'Blood Unit 112', bloodGroup: 'A-', email: 'inventory12@example.com', phone: '9823453012', status: 'Reserved', location: 'Kochi', date: '2025-02-23' }
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

export default function InventoryHistory() {
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
      return inventoryRecords
    }

    return inventoryRecords.filter((record) =>
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
          <Topbar onToggleSidebar={toggleSidebar} title="Inventory History" />

          <div className="container-fluid px-0" data-theme={theme}>
            <div className="row">
              <div className="col-12">
                <h2 className="mb-3">Inventory History</h2>
                <Card title="Inventory History Overview">
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
