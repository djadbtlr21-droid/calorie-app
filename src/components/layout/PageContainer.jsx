export default function PageContainer({ children, className = '' }) {
  return (
    <div className={`max-w-[430px] mx-auto w-full px-5 pt-5 pb-4 ${className}`}>
      {children}
    </div>
  );
}
