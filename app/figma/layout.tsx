import Room from "./Room";

export default function FigmaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-primary-grey-200">
      <Room>{children}</Room>
    </main>
  );
}
