import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <a className="navbar-brand" href="#">
            [Konjo]---&gt;
          </a>
          <div>
            <Link href="/register">
              <button className="btn btn-register me-2">Register</button>
            </Link>
            <Link href="/login">
              <button className="btn btn-login">Login</button>
            </Link>
          </div>
        </div>
      </nav>
      
    </div>
  );
}
