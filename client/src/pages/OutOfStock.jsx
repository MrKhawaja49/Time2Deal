import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function OutOfStock() {
  // Sample data - replace with your actual data
  const medicines = [
    {
      drugName: "Amoxicillin",
      batchId: "AMX001",
      quantity: 0,
      supplier: "PharmaCorp",
    },
    {
      drugName: "Lisinopril",
      batchId: "LSP002",
      quantity: 0,
      supplier: "MedSupply Inc.",
    },
    {
      drugName: "Metformin",
      batchId: "MTF003",
      quantity: 0,
      supplier: "HealthDrugs Ltd.",
    },
    {
      drugName: "Ibuprofen",
      batchId: "IBU004",
      quantity: 0,
      supplier: "PainRelief Co.",
    },
    {
      drugName: "Omeprazole",
      batchId: "OMP005",
      quantity: 0,
      supplier: "GastroHealth Inc.",
    },
  ]

  return (
    <div className="p-6">
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Out of Stock Medicines</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="font-semibold">Drug Name</TableHead>
                <TableHead className="font-semibold">Batch ID</TableHead>
                <TableHead className="font-semibold">Quantity</TableHead>
                <TableHead className="font-semibold">Supplier</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {medicines.map((medicine, index) => (
                <TableRow key={index} className="border-b">
                  <TableCell>{medicine.drugName}</TableCell>
                  <TableCell>{medicine.batchId}</TableCell>
                  <TableCell className="text-red-500 font-medium">{medicine.quantity}</TableCell>
                  <TableCell>{medicine.supplier}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

