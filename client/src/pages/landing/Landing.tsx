import { Button } from '@/components/ui/button';
import { PageRoute } from '@/types';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="landing-page">
      <h1>Welcome to the Landing Page</h1>
      <p>This is the starting point of our application.</p>
      <Link to={PageRoute.LOGIN} className="w-fit m-auto">
        <Button>Go to other page</Button>
      </Link>
    </div>
  );
}
