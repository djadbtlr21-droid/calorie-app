export default function PageContainer({ children, className = '' }) {
  return (
    <div className={`max-w-lg mx-auto w-full px-4 pt-4 pb-4 ${className}`}>
      {children}
    </div>
  );
}
