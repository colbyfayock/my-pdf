import Invoice from './Invoice';

export default async function InvoicePage() {
  const invoice = {
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
  };
  return <Invoice invoice={invoice} />
}