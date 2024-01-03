import { authOptions } from "@/auth";
import { chatMembersCollectionGroupRef } from "@/lib/converters/ChatsMembers";
import { getServerSession } from "next-auth";
import ChatListRows from "./ChatListRows";
import { getDocs } from "firebase/firestore";

async function ChatList() {
	const session = await getServerSession(authOptions);

	const chatsSnapshot = await getDocs(
		chatMembersCollectionGroupRef(session?.user.id!)
	);

	const initialChats = chatsSnapshot.docs.map((doc) => ({
		...doc.data(),
		timestamp: null,
	}));

	return <ChatListRows initialChats={initialChats} />;
}

export default ChatList;
