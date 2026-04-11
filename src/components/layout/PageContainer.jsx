export default function PageContainer({ children, className = '' }) {
  return (
    <div className={`flex-1 overflow-y-auto max-w-lg mx-auto w-full px-4 pb-20 pt-4 ${className}`}>
      {children}
    </div>
  );
}
