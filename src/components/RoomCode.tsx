import copyImg from "../assets/images/copy.svg"

import "../style/room-code.scss"

type RoomcodeProps = {
    code: string;
}

export function RoomCode(props: RoomcodeProps){

    function copyRoomCodeToClipboard(){
        navigator.clipboard.writeText(props.code)
    }

    return (
        <button className="room-code" onClick={copyRoomCodeToClipboard}>
            <div>
                <img src={copyImg} alt="Copy room code" />
            </div>
            <span>
                Sala #{props.code}
            </span>
        </button>
    )
}