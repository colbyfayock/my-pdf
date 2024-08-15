import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

import { cn } from '@/lib/utils';
import { AVAILABLE_STATUSES } from '@/data/invoices';

import { Badge } from '@/components/ui/Badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import Container from '@/components/Container';

const INVOICES_PER_PAGE = 5;

export default async function Dashboard() {
  const invoices = [{
    id: 1,
    name: 'Sample Invoice',
    dateCreated: Date.now(),
    value: 1234,
    description: 'This is a sample invoice.',
    status: 'open',
    customer: {
      name: 'John Smith',
      email: 'john@smith.com'
    }
  }];

  return (
    <Container>
      <div className="flex justify-between items-center w-full mb-6">
        <h2 className="text-3xl font-semibold">
          Invoices
        </h2>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="hidden sm:table-cell">Status</TableHead>
            <TableHead className="text-right">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices?.map(invoice => {
            const status = AVAILABLE_STATUSES.find(status => status.id === invoice.status);
            return (
              <TableRow key={invoice.id}>
                <TableCell className="hidden md:table-cell p-0">
                  <Link href={`/invoices/${invoice.id}`} className="block p-4">
                    { new Date(invoice.dateCreated).toLocaleDateString() }
                  </Link>
                </TableCell>
                <TableCell className="p-0">
                  <Link href={`/invoices/${invoice.id}`} className="block p-4">
                    <p className="font-medium">
                      { invoice.customer.name }
                    </p>
                  </Link>
                </TableCell>
                <TableCell className="p-0">
                  <Link href={`/invoices/${invoice.id}`} className="block p-4">
                    <p className="text-muted-foreground">
                      { invoice.customer.email }
                    </p>
                  </Link>
                </TableCell>
                <TableCell className="hidden sm:table-cell p-0">
                  <Link href={`/invoices/${invoice.id}`} className="block p-4">
                    <Badge
                      className={cn(
                        "text-xs",
                        status?.id === 'open' && 'bg-blue-600',
                        status?.id === 'paid' && 'bg-green-600',
                        status?.id === 'void' && 'bg-zinc-700',
                        status?.id === 'uncollectible' && 'bg-red-600',
                      )}
                    >
                      { status?.label || 'Unknown' }
                    </Badge>
                  </Link>
                </TableCell>
                <TableCell className="text-right p-0">
                  <Link href={`/invoices/${invoice.id}`} className="block p-4">
                    ${ invoice.value / 100 }
                  </Link>
                </TableCell>
              </TableRow>
            )
          })}
          {invoices && invoices.length % INVOICES_PER_PAGE !== 0 && [...new Array(INVOICES_PER_PAGE - invoices.length)].map((_, index) => {
            return (
              <TableRow key={index} className="border-transparent bg-transparent hover:bg-transparent" aria-hidden>
                <TableCell className="hidden md:table-cell p-0">&nbsp;</TableCell>
                <TableCell className="p-4">&nbsp; </TableCell>
                <TableCell className="p-4">&nbsp;</TableCell>
                <TableCell className="hidden sm:table-cell p-4">
                  <Badge className={"text-xs invisible"}>&nbsp;</Badge>
                </TableCell>
                <TableCell className="text-right p-4">&nbsp;</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Container>
  );
}
