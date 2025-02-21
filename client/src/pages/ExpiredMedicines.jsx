import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data for expired medicines
const mockExpiredMedicines = [
  { id: 1, name: 'Aspirin', batchNumber: 'A001', expiryDate: '2023-05-15', quantity: 100 },
  { id: 2, name: 'Ibuprofen', batchNumber: 'I002', expiryDate: '2023-06-20', quantity: 50 },
  { id: 3, name: 'Paracetamol', batchNumber: 'P003', expiryDate: '2023-07-10', quantity: 75 },
  { id: 4, name: 'Amoxicillin', batchNumber: 'AM004', expiryDate: '2023-08-05', quantity: 30 },
  { id: 5, name: 'Omeprazole', batchNumber: 'O005', expiryDate: '2023-09-01', quantity: 60 },
]

export default function ExpiredMedicines() {
  const [searchTerm, setSearchTerm] = useState('')
  const [expiredMedicines, setExpiredMedicines] = useState(mockExpiredMedicines)

  const handleSearch = (e) => {
    e.preventDefault()
    const filteredMedicines = mockExpiredMedicines.filter(medicine => 
      medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.batchNumber.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setExpiredMedicines(filteredMedicines)
  }

  return (
    <div className="container mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Expired Medicines</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="text"
              placeholder="Search by name or batch number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit">Search</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Batch Number</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Quantity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expiredMedicines.map((medicine) => (
                <TableRow key={medicine.id}>
                  <TableCell>{medicine.name}</TableCell>
                  <TableCell>{medicine.batchNumber}</TableCell>
                  <TableCell>{medicine.expiryDate}</TableCell>
                  <TableCell>{medicine.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}