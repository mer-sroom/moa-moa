import LetterModalProvider from "@/contexts/LetterModalContext";

export default function Layout({ children }) {
  return (
    <div>
      <LetterModalProvider>
        <main>{children}</main>
      </LetterModalProvider>
    </div>
  );
}
