interface ProfileCardProps {
  name: string
  rm: string
  turma: string
  photo?: string
  linkedin: string
  github: string
}

export default function ProfileCard({ name, rm, turma, photo, linkedin, github }: ProfileCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
      {/* Foto / Avatar */}
      <div className="w-24 h-24 rounded-full bg-[#1E7E34] flex items-center justify-center mb-4 overflow-hidden">
        {photo ? (
          <img src={photo} alt={`Foto de ${name}`} className="w-full h-full object-cover" />
        ) : (
          <span className="text-4xl text-white">👤</span>
        )}
      </div>

      {/* Nome */}
      <h3 className="text-lg font-bold text-gray-800 mb-3">{name}</h3>

      {/* Badges */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        <span className="bg-green-100 text-[#1E7E34] text-xs font-semibold px-3 py-1 rounded-full">
          🪪 RM: {rm}
        </span>
        <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">
          🎓 {turma}
        </span>
      </div>

      {/* Links */}
      <div className="flex gap-4 mt-auto pt-2">
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`LinkedIn de ${name}`}
          className="text-blue-600 hover:text-blue-800 transition-colors font-semibold text-sm flex items-center gap-1"
        >
          in LinkedIn
        </a>
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`GitHub de ${name}`}
          className="text-gray-700 hover:text-gray-900 transition-colors font-semibold text-sm flex items-center gap-1"
        >
          ⌥ GitHub
        </a>
      </div>
    </div>
  )
}
