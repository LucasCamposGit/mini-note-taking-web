import { MiniNotesPageProvider } from "./context";

export default function MiniNotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MiniNotesPageProvider>{children}</MiniNotesPageProvider>;
}
