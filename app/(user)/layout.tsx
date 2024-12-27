// app/(user)/chat/layout.tsx
import LanguageSelectionDialog from "@/components/LanguageSelectionDialog";

export default function ChatLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex-1">
			{children}
			<LanguageSelectionDialog />
		</div>
	);
}
