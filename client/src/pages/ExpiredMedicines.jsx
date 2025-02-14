import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { ArrowUpDown, Search } from 'lucide-react'

// Mock data for expired medicines
const expiredMedicines = [
  { id: 1, name: "Aspirin", batchId: "ASP001", quantity: 100, expirationDate: "2023-05-15", price: 5.99 },
  { id: 2, name: "Ibuprofen", batchId: "IBU002", quantity: 50, expirationDate: "2023-06-20", price: 7.99 },
  { id: 3, name: "Amoxicillin", batchId: "AMO003", quantity: 75, expirationDate: "2023-04-30", price: 12.99 },
  { id: 4, name: "Lisinopril", batchId: "LIS004", quantity: 30, expirationDate: "2023-07-10", price: 15.99 },
  { id: 5, name: "Metformin", batchId: "MET005", quantity: 60, expirationDate: "2023-05-25", price: 9.99 },
]

export default function ExpiredMedicines() {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [sortColumn, setSortColumn] = React.useState('')
  const [sortOrder, setSortOrder] = React.useState('asc')
  const [currentPage, setCurrentPage] = React.useState(1)
  const itemsPerPage = 5

  const filteredMedicines = expiredMedicines.filter(
    (medicine) =>
      medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.batchId.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedMedicines = [...filteredMedicines].sort((a, b) => {
    if (sortColumn) {
      if (a[sortColumn] < b[sortColumn]) return sortOrder === 'asc' ? -1 : 1
      if (a[sortColumn] > b[sortColumn]) return sortOrder === 'asc' ? 1 : -1
    }
    return 0
  })

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentMedicines = sortedMedicines.slice(indexOfFirstItem, indexOfLastItem)

  const pageCount = Math.ceil(sortedMedicines.length / itemsPerPage)

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortOrder('asc')
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Expired Medicines</h1>
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Search medicines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Search className="text-gray-400" />
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="lastMonth">Expired Last Month</SelectItem>
            <SelectItem value="lastWeek">Expired Last Week</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => handleSort('name')} className="cursor-pointer">
              Drug Name <ArrowUpDown className="inline ml-2" />
            </TableHead>
            <TableHead onClick={() => handleSort('batchId')} className="cursor-pointer">
              Batch ID <ArrowUpDown className="inline ml-2" />
            </TableHead>
            <TableHead onClick={() => handleSort('quantity')} className="cursor-pointer">
              Quantity <ArrowUpDown className="inline ml-2" />
            </TableHead>
            <TableHead onClick={() => handleSort('expirationDate')} className="cursor-pointer">
              Expiration Date <ArrowUpDown className="inline ml-2" />
            </TableHead>
            <TableHead onClick={() => handleSort('price')} className="cursor-pointer">
              Price <ArrowUpDown className="inline ml-2" />
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentMedicines.map((medicine) => (
            <TableRow key={medicine.id}>
              <TableCell>{medicine.name}</TableCell>
              <TableCell>{medicine.batchId}</TableCell>
              <TableCell>{medicine.quantity}</TableCell>
              <TableCell>{medicine.expirationDate}</TableCell>
              <TableCell>${medicine.price.toFixed(2)}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2">
                  Return
                </Button>
                <Button variant="destructive" size="sm">
                  Discard
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination className="mt-6">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            />
          </PaginationItem>
          {[...Array(pageCount)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink 
                onClick={() => setCurrentPage(index + 1)}
                isActive={currentPage === index + 1}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
              disabled={currentPage === pageCount}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}