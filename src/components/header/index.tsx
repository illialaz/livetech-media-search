import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from 'next/link';
import { ReactComponent as Lifetech } from 'public/lifetech.svg';
import { ReactComponent as Star } from 'public/star.svg';

export default function Header() {
  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        bgcolor: 'white',
        zIndex: 100,
        borderBottom: '1px solid',
        borderBottomColor: 'grey.500',
      }}
    >
      <Link href="/" passHref legacyBehavior>
        <Button
          variant="text"
          color="primary"
          href="/"
          sx={{ svg: { height: 20, pr: 1 } }}
        >
          <Lifetech />
          lifetech
        </Button>
      </Link>
      <Link href="/favourites" passHref legacyBehavior>
        <Button
          variant="text"
          color="primary"
          href="/favourites"
          sx={{ svg: { height: 25 } }}
        >
          <Star />
        </Button>
      </Link>
    </Container>
  );
}
