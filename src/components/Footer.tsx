import Container from '@/components/Container';

const Footer = () => {
  return (
    <footer className="mt-6 mb-8">
      <Container className="flex justify-between gap-4">
        <p className="text-sm">
          Invoicipedia &copy; {new Date().getFullYear()}
        </p>
        <p className="text-sm">
          Created with Next.js, Clerk, & Xata by Colby Fayock
        </p>
      </Container>
    </footer>
  );
}

export default Footer;