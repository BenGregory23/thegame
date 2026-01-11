import { socket } from "~/components/socket";
import { Events } from "~/lib/events";

export const useRoom = () => {
    const room = useState<string>('room', () => "");

    function joinRoom(r: string, username: string): void {
        const payload: IPayload = {
            roomID: r,
            content: {
                username: username,
            }
        }
        socket.emit(Events.ROOM_JOIN, payload);
    }

    function leaveRoom(): void {
        const { username } = useUser();
        const router = useRouter();
        const payload: IPayload = {
            roomID: room.value,
            content: {
                username: username.value,
            }
        }
        socket.emit(Events.ROOM_LEAVE, payload);
        router.push("/create")
    }

    return {
        joinRoom,
        leaveRoom,
    }
}