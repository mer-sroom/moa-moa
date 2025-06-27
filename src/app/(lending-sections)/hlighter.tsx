'use client';

type Props = {
  text: string;
  keyword: string;
};

export default function Hlighter({ text, keyword }: Props) {
  const parts = text.split(new RegExp(`(${keyword})`, 'gi'));

  return (
    <p style={{ whiteSpace: 'pre-line', }}>
      {parts.map((part, index) =>
        part.toLowerCase() === keyword.toLowerCase() ? (
          <span
            key={index}
            style={{
              color: '',
              fontWeight: 'bold',
              backgroundColor: '',
              padding: '0 2px',
            }}
          >
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </p>
  );
}