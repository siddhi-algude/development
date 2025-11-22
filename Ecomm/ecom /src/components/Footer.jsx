export default function Footer() {
  return (
    <footer className="mt-10 border-t bg-white">
      <div className="container-max py-6 text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} ShopLite</p>
        <div className="flex items-center gap-4">
          <a className="hover:underline" href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
          <a className="hover:underline" href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
          <a className="hover:underline" href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
