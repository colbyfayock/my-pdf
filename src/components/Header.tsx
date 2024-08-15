import Link from 'next/link';

import Container from '@/components/Container';

const Header = () => {
  return (
    <header className="mt-8 mb-12">
      <Container className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <p className="font-bold">
            <Link href="/dashboard">
              Invoicipedia
            </Link>
          </p>
        </div>
        <div className="h-8 flex items-center gap-4"></div>
      </Container>
    </header>
  )
}

export default Header;