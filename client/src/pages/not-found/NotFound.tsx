import { Button } from '@/components/ui/button';
import { PageRoute } from '@/types';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to={PageRoute.LANDING} className="w-fit m-auto">
        <Button>Go Back Home</Button>
      </Link>
    </div>
  );
}
