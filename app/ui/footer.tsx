export default function Footer() {
    return (
      <footer className=" bottom-0  w-full bg-white backdrop-blur-sm  py-4">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-sm text-gray-600">
            © {new Date().getFullYear()} Dashboard CRM.
          </p>
        </div>
      </footer>
    );
  }