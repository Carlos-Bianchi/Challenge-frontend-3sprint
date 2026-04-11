export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-6 text-center">
        <p className="text-sm md:text-base">
          Desenvolvido com ❤️ para transformar sorrisos
        </p>
        <p className="text-xs text-blue-300 mt-1">
          © {new Date().getFullYear()} SmileMatch — Challenge Frontend Sprint 03
        </p>
      </div>
    </footer>
  )
}
