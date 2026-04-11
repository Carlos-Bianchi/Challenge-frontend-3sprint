interface CardProps {
  title: string;
  value: number | string;
  description?: string;
}

export default function Card({ title, value, description }: CardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-medium text-gray-600">{title}</h3>
      <p className="text-4xl font-bold mt-2">{value}</p>
      {description && (
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      )}
    </div>
  );
}
