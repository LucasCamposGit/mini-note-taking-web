import { MiniNotesPageProvider } from "@/context/MiniNotesPageContext";

export default function MiniNotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MiniNotesPageProvider>{children}</MiniNotesPageProvider>;
}
